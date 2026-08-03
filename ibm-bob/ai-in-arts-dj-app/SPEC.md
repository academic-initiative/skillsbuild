# DeckFlow Web — Project Spec & Plan

A browser-only, stripped-down teaching variant of **DeckFlow** (a desktop DJ application
built with Electron, React, a native C++ audio engine, and Elementary Audio). This
document is the plan we worked from: the goals, the scope decisions and their rationale,
the architecture, the phase-by-phase delivery, and the notable technical decisions.

It's meant to be readable on its own — by a student, a collaborator, or anyone deciding
whether to build something similar.

---

## 1. Purpose

Teach the **audio-graph and app-architecture ideas** behind a two-deck DJ mixer in the
browser, without the native C++ engine, Electron, or hardware dependencies that make the
desktop app hard to clone and run.

Success looks like: a student clones one small repo, runs `npm install && npm run dev`,
and has a working two-deck mixer they can read end to end in an afternoon.

Non-goals: production fidelity, low-latency club use, format/codec completeness, or
feature parity with the desktop app.

---

## 2. Scope decisions

Each decision trades fidelity for clarity and reach. The right-hand column is *why*.

| Area | Decision | Rationale |
|------|----------|-----------|
| **Tempo / pitch** | **Varispeed only** — tempo and pitch move together | Avoids a WASM time-stretch (WSOLA / signalsmith) rabbit hole; teaches mixing/EQ without the hardest DSP |
| **Analysis** | **BPM only, in a Web Worker**; no key/phrase detection | One readable DSP pipeline off the main thread; key/phrase add cost without teaching much new |
| **UI & state** | **Keep React + reducer-based state** | This is half the lesson; the desktop's component/state shape ports almost directly |
| **MIDI** | **Dropped** | Hardware + Web MIDI is orthogonal to the core audio lesson |
| **Persistence** | **None** — in-memory, session-only | No IndexedDB/SQLite; keeps the data layer to nearly nothing |
| **Cue / headphone** | **In-mix cue point only**, no headphone bus | The browser realistically gives one stereo output; split monitoring needs multi-channel hardware |
| **Waveform** | **Hand-drawn canvas**, not a library | Small, readable, and keeps the audio graph as the single source of truth for position |

---

## 3. Why this port is tractable (the key insight)

The desktop app's split made this unusually clean:

- The **entire mixer signal graph** (EQ, DJ filter, volume, metering, crossfader) was
  already written in **portable JavaScript** using `@elemaudio/core`. That code is
  renderer-agnostic.
- The **native C++ addon** only added four things the graph *runs on or consumes*:
  1. file decode (dr_libs),
  2. offline analysis (BPM / key / phrase, FFT-heavy),
  3. WSOLA time-stretching feeding the graph's inputs, and
  4. PortAudio I/O plus the *native* Elementary runtime that executed the graph.

Elementary already ships the browser target: **`@elemaudio/web-renderer`** runs the
*same* `el.*` graph inside a Web Audio `AudioWorklet` compiled to WASM. So the port is
not a rewrite — it's **replacing those four native responsibilities with browser
equivalents** and changing how decks feed the graph.

---

## 4. Desktop → browser mapping

| Desktop (native / Electron) | Browser-only replacement | Difficulty |
|---|---|---|
| Native Elementary runtime + PortAudio | `@elemaudio/web-renderer` → `AudioContext.destination` | Trivial |
| Mixer graph (`el.*`) | Same code, `WebRenderer` instead of native `Renderer` | Trivial |
| `dr_libs` decode | `AudioContext.decodeAudioData()` (WAV/MP3/FLAC) | Easy |
| File dialog + fs | `<input type=file>` / drag-drop | Easy |
| WSOLA time-stretch feeding `el.in()` | `el.table` reads of the decoded buffer, driven by a phasor/accum transport (varispeed) | Medium |
| `getDeckPosition()` polling | `el.snapshot` on a metro → renderer event | Easy (reuses the meter event path) |
| C++ BPM/key/phrase | BPM only, in a JS Web Worker (+ tap-tempo) | Medium |
| `better-sqlite3` library | In-memory session list | Easy |
| Hardware MIDI | — (dropped) | — |
| Multi-channel cue/headphone | Single stereo output | (feature dropped) |

---

## 5. What we deliberately drop (the honest fidelity gaps)

- **Real time-stretch** — varispeed changes pitch with tempo. True tempo-independent
  pitch would mean compiling `signalsmith-stretch` to WASM in the worklet.
- **Key & phrase detection** — only BPM is estimated.
- **Cue / split-headphone monitoring** — one stereo bus only.
- **Output device selection, exclusive-mode / low latency** — browser defaults only.
- **Beat-phase sync** — SYNC matches *tempo*, not beat alignment (see §9).

---

## 6. The deck audio model (the core idea)

Each deck *is* Elementary nodes reading the track buffer directly. The transport phase
is built from `el.accum`:

```
position = base + accum(increment, seekGen)
```

- **increment** — normalized progress per output sample: `0` when paused,
  `tempo / (frames − 1)` when playing. Scaling it by `tempo` *is* the varispeed.
- **accum** — integrates the increment at **audio rate** (control-rate JS updates would
  zipper the audio). It resets to `0` whenever its reset input *changes by > 0.5*, so a
  monotonic `seekGen` counter triggers exactly one reset — that's a **seek**.
- **base** — the normalized position of the last seek.

Two consequences worth knowing:

- **Stereo from a mono primitive.** `el.table` reads channel 0 only and maps `[0,1]`
  across the buffer, so a stereo track is stored as **two mono virtual-file-system (VFS)
  entries** (`A:L` / `A:R`) read with the *same* position signal.
- **Looping** wraps the phase into `[loopIn, loopOut)` with a **floored modulo**
  (`x − len·floor(x/len)`), because `el.mod` is `fmod` and keeps the dividend's sign.
  Built structurally from a JS flag, so toggling the loop reshapes the graph while the
  accumulator keeps its state. Loop *exit* re-bases the transport in JS so playback
  continues from the current spot rather than the run-on phase.
- **Playhead & meter** come back via `el.snapshot` (on a ~30 Hz metro) and `el.meter`
  events — the same event channel for both, kept in refs/low-rate state so they never
  trigger a graph re-render.

---

## 7. Phased delivery plan

Each phase is a self-contained, runnable lesson. Status as of this writing:

| Phase | Deliverable | Status |
|------|-------------|--------|
| **P0** | WASM audio boots; plays a test tone on a user gesture | ✅ |
| **P1** | One deck: load → `decodeAudioData` → VFS → phasor/accum `el.table` playback; play/pause; click-to-seek; canvas waveform + snapshot playhead | ✅ |
| **P2** | Per-deck signal chain: 3-band EQ + DJ LPF/HPF filter + volume + level meter (true stereo; control consts shared across L/R) | ✅ |
| **P3** | Two decks + equal-power crossfader + master volume; one render effect owns the combined graph | ✅ |
| **P4** | Varispeed tempo, manual loops (floored-mod wrap), in-mix cue point; cue/loop markers on the waveform | ✅ |
| **P5** | BPM detection in a Web Worker (energy-onset → autocorrelation); beat-grid overlay; tap-tempo; tempo-match SYNC | ✅ |
| **P6** | Session library panel + drag-to-deck (in-memory) | ⬜ planned |

**Suggested teaching arc:** P0–P3 alone is a complete, satisfying two-deck mixer. P4–P5
add the "DJ feel" (beatmatching, loops, cue). P6 is the app-shell/data-flow lesson.

---

## 8. Key technical decisions

The non-obvious choices a future maintainer (or student) should understand:

- **One render effect owns the whole graph.** `App` rebuilds the combined
  `(A·gainA + B·gainB)·master` graph on any control change; Elementary diffs against the
  previous graph, so unchanged nodes keep state and only moved consts update — no clicks.
- **Equal-power crossfade** — `gainA = cos(t·π/2)`, `gainB = sin(t·π/2)`,
  `t = (x+1)/2`. Constant perceived loudness across the sweep (matches the desktop).
- **High-frequency state stays out of the reducer.** Playhead position and meter level
  arrive ~20–30×/sec; they live in refs + light state, never in the graph-driving
  reducer.
- **Cached waveform bitmap.** Peaks are rendered once to a normalized offscreen canvas;
  each frame is one `drawImage(visible slice)` + a playhead line. This (plus a 50 ms
  renderer event-poll interval) was the fix for an early jank→message-backlog→crash
  spiral. Lesson: don't redraw thousands of segments on every audio event.
- **Amplitude-normalized waveform** so quiet tracks fill the height.
- **Shared zoom.** A single `windowFrac` in `App` drives both waveforms, so zooming
  either scales both — which is what makes visual beat-alignment between decks possible.
- **BPM pipeline** (`bpmWorker.ts`): short-time energy-flux onset envelope →
  autocorrelation (peak lag = period) → octave-fold into 80–160 BPM → beat-phase from the
  best-fitting pulse train. Simple and readable over accurate; **tap-tempo is the
  fallback** for material it misreads.
- **Worker race-guard.** A `loadGen` counter discards a stale BPM result if another track
  loaded while analysis was running.

---

## 9. Known limitations & possible extensions

- **AIFF import.** Works in Safari (`decodeAudioData` supports it); generally fails in
  Chrome/Firefox. A self-contained `decodeAiff.ts` fallback (parse FORM/COMM/SSND,
  big-endian PCM, 80-bit extended sample rate, linear resample to the context rate) would
  add cross-browser support with no new dependencies. Scoped to uncompressed PCM.
- **Beat-phase sync.** SYNC currently matches effective tempo (`bpm·tempo`) only; nudging
  the playhead so downbeats align is the natural next increment.
- **Real time-stretch.** Compile `signalsmith-stretch` (vendored in the desktop tree) to
  WASM in the worklet for tempo-independent pitch — the biggest single fidelity upgrade.
- **Persistence.** Promote the session library to IndexedDB if it should survive reloads.

---

## 10. Tech stack & layout

**Stack:** Vite · React 18 · TypeScript (strict) · `@elemaudio/core` + `@elemaudio/web-renderer` (4.x). No audio/DSP libraries beyond Elementary; no backend.

```
src/
  audio.ts                 AudioContext + WebRenderer boot (50ms event poll)
  track.ts                 decode → VFS (L/R mono entries) + peaks + mono downmix
  deck.ts                  DeckState + buildDeckSignal (transport, EQ/filter/vol/meter, loop)
  useDeck.ts               per-deck hook: reducer state, transport, playhead/meter, BPM, tap
  bpm.ts / bpmWorker.ts    off-thread BPM + beat-phase estimation
  App.tsx                  composition: two decks, combined render graph, crossfader, sync, shared zoom
  components/
    Waveform.tsx           cached canvas: peaks + beat grid + cue/loop markers + zoom
    DeckPanel.tsx          deck lane: load, waveform, transport, cue/loop/tap/sync
    DeckControls.tsx       mixer strip: EQ + filter + tempo + volume/meter
    Knob.tsx / Fader.tsx   controls
    Mixer.tsx              crossfader + master (console center column)
```

**Run:** `npm install` then `npm run dev`; open the URL and click **Load track** (audio
needs a user gesture). Build/typecheck: `npm run build`.
