// deck.ts — the deck's audio graph and state shape.
//
// This is the heart of the browser port. Desktop DeckFlow fed already-stretched PCM
// into the Elementary graph via el.in(); here the deck *is* Elementary nodes, reading
// the track buffer directly with a phasor-style transport built from el.accum:
//
//     position = base + accum(increment, seekGen)
//
//   - increment : normalized progress per output sample. 0 when paused, tempo/(N-1)
//                 when playing — so scaling it later gives varispeed (P4).
//   - accum     : integrates increment at audio rate (control-rate JS updates would
//                 zipper the audio). It resets to 0 whenever its reset input *changes*
//                 by > 0.5, so a monotonic `seekGen` counter triggers exactly one reset.
//   - base      : the normalized position we jumped to on the last seek.
//
// el.table maps position [0,1] across the whole buffer, reading channel 0 — so we read
// the two mono VFS entries with the same position to get stereo.
//
// P2 adds the per-channel mixer chain — 3-band EQ, a DJ LPF/HPF filter, and volume —
// ported from the desktop app's Elementary graph, plus a level meter. Control values
// live on keyed const nodes shared across the L/R chains (Elementary dedups them), so
// re-rendering only nudges a value; the filter/stateful nodes keep their state.

import { el, type NodeRepr_t } from '@elemaudio/core';
import type { TrackData } from './track';

export interface DeckState {
  id: string;
  track: TrackData | null;
  playing: boolean;
  baseNorm: number; // normalized position of the last seek (0..1)
  seekGen: number; // bump to force the transport accumulator to reset
  tempo: number; // playback rate ratio; 1.0 in P1 (varispeed arrives in P4)
  volume: number; // 0..1
  eqLow: number; // dB, -12..12
  eqMid: number; // dB, -12..12
  eqHigh: number; // dB, -12..12
  filterCutoff: number; // -1 (LPF down to 100Hz) .. 0 (bypass) .. 1 (HPF up to 10kHz)
}

export function initialDeckState(id: string): DeckState {
  return {
    id,
    track: null,
    playing: false,
    baseNorm: 0,
    seekGen: 0,
    tempo: 1,
    volume: 1,
    eqLow: 0,
    eqMid: 0,
    eqHigh: 0,
    filterCutoff: 0,
  };
}

export interface DeckSignal {
  left: NodeRepr_t;
  right: NodeRepr_t;
}

// Suffixes for this deck's analysis events, so the UI can route them by `source`.
export const POS_EVENT_SUFFIX = '_pos';
export const METER_EVENT_SUFFIX = '_meter';

// DJ filter knob → cutoff frequencies. Center (0) bypasses (LPF 20kHz, HPF 20Hz);
// left sweeps the LPF down to 100Hz, right sweeps the HPF up to 10kHz.
export function filterCutoffs(cutoff: number): { lpf: number; hpf: number } {
  const lpf = cutoff < 0 ? 20000 * Math.pow(100 / 20000, Math.abs(cutoff)) : 20000;
  const hpf = cutoff > 0 ? 20 * Math.pow(10000 / 20, cutoff) : 20;
  return { lpf, hpf };
}

// One channel's chain: 3-band EQ → DJ filter → volume. The keyed consts are shared
// between the L and R chains (same key + value → one node), so a deck has one set of
// controls driving both channels.
function channelChain(sig: NodeRepr_t, s: DeckState): NodeRepr_t {
  const id = s.id;
  const fc = filterCutoffs(s.filterCutoff);

  let x = el.lowshelf(
    el.const({ value: 200 }),
    el.const({ value: 0.707 }),
    el.const({ key: `${id}_eqLow`, value: s.eqLow }),
    sig,
  );
  x = el.peak(
    el.const({ value: 1000 }),
    el.const({ value: 0.707 }),
    el.const({ key: `${id}_eqMid`, value: s.eqMid }),
    x,
  );
  x = el.highshelf(
    el.const({ value: 5000 }),
    el.const({ value: 0.707 }),
    el.const({ key: `${id}_eqHigh`, value: s.eqHigh }),
    x,
  );
  // Smoothed cutoffs so knob moves don't zipper.
  x = el.lowpass(
    el.smooth(el.tau2pole(0.02), el.const({ key: `${id}_lpf`, value: fc.lpf })),
    el.const({ value: 1.2 }),
    x,
  );
  x = el.highpass(
    el.smooth(el.tau2pole(0.02), el.const({ key: `${id}_hpf`, value: fc.hpf })),
    el.const({ value: 1.2 }),
    x,
  );
  return el.mul(x, el.const({ key: `${id}_vol`, value: s.volume }));
}

/**
 * Builds the deck's stereo signal from its current state, or null if no track is
 * loaded. Const nodes carry stable `key`s so re-rendering only nudges their values
 * (no graph rebuild, no clicks).
 */
export function buildDeckSignal(s: DeckState): DeckSignal | null {
  if (!s.track) return null;

  const { pathL, pathR, totalFrames } = s.track;
  const incPerSample = s.tempo / Math.max(1, totalFrames - 1);

  const inc = el.const({ key: `${s.id}_inc`, value: s.playing ? incPerSample : 0 });
  const seekTrig = el.const({ key: `${s.id}_seek`, value: s.seekGen });
  const base = el.const({ key: `${s.id}_base`, value: s.baseNorm });

  const position = el.add(base, el.accum(inc, seekTrig));

  const leftRaw = el.table({ key: `${s.id}_tblL`, path: pathL }, position);
  const rightRaw = el.table({ key: `${s.id}_tblR`, path: pathR }, position);

  let left = channelChain(leftRaw, s);
  const right = channelChain(rightRaw, s);

  // Level meter on the post-fader left channel; passes audio through unchanged.
  left = el.meter({ key: `${s.id}_metertap`, name: `${s.id}${METER_EVENT_SUFFIX}` }, left);

  // Report the playhead position back to JS on a ~30Hz metro. snapshot outputs the
  // sampled value (not audio), so we fold it into the left channel multiplied by zero
  // — this keeps the node in the render tree without affecting what we hear.
  const posTap = el.snapshot(
    { key: `${s.id}_postap`, name: `${s.id}${POS_EVENT_SUFFIX}` },
    el.metro({ key: `${s.id}_posmetro`, interval: 33 }),
    position,
  );
  left = el.add(left, el.mul(el.const({ value: 0 }), posTap));

  return { left, right };
}
