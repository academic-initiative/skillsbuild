import { useCallback, useEffect, useState } from 'react';
import { el } from '@elemaudio/core';
import { initAudio, getRuntime } from './audio';
import { buildDeckSignal } from './deck';
import { useDeck } from './useDeck';
import DeckPanel from './components/DeckPanel';
import DeckControls from './components/DeckControls';
import Mixer from './components/Mixer';

// P3 — two decks + a crossfader + master volume: the actual mixer.
//
// Each deck builds its own stereo signal (deck.ts); App combines them here with an
// equal-power crossfade (matching the desktop graph) and a master gain, then renders
// the single output. One render effect owns the whole graph, so Elementary diffs the
// combined tree on every state change and only nudges the consts that moved.

export default function App() {
  const [audioReady, setAudioReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deckA = useDeck('A', audioReady);
  const deckB = useDeck('B', audioReady);

  const [crossfader, setCrossfader] = useState(0); // -1 full A .. +1 full B
  const [masterVolume, setMasterVolume] = useState(0.8);

  // Boots the AudioContext + WebRenderer once, on the first deck's load gesture.
  const ensureAudio = useCallback(async () => {
    await initAudio();
    setAudioReady(true);
  }, []);

  // The whole graph: (A·gainA + B·gainB)·master, per channel.
  useEffect(() => {
    if (!audioReady) return;
    const rt = getRuntime();
    if (!rt) return;

    const silence = el.const({ value: 0 });
    const a = buildDeckSignal(deckA.state);
    const b = buildDeckSignal(deckB.state);
    const aL = a?.left ?? silence;
    const aR = a?.right ?? silence;
    const bL = b?.left ?? silence;
    const bR = b?.right ?? silence;

    // Equal-power crossfade: at center both decks sit at ~0.707 (constant power).
    const t = (crossfader + 1) / 2;
    const gainA = el.const({ key: 'xfade_a', value: Math.cos(t * Math.PI * 0.5) });
    const gainB = el.const({ key: 'xfade_b', value: Math.sin(t * Math.PI * 0.5) });
    const master = el.const({ key: 'master_vol', value: masterVolume });

    const outL = el.mul(el.add(el.mul(aL, gainA), el.mul(bL, gainB)), master);
    const outR = el.mul(el.add(el.mul(aR, gainA), el.mul(bR, gainB)), master);

    rt.core.render(outL, outR).catch((e) => setError(String(e)));
  }, [audioReady, deckA.state, deckB.state, crossfader, masterVolume]);

  return (
    <main className="app">
      <header className="topbar">
        <h1>DeckFlow Web</h1>
        <span className="subtitle">Browser-only teaching build · Web Audio + Elementary (WASM)</span>
      </header>

      <div className="decks">
        <DeckPanel deck={deckA} label="Deck A" ensureAudio={ensureAudio} />
        <DeckPanel deck={deckB} label="Deck B" ensureAudio={ensureAudio} />
      </div>

      <div className="console">
        <DeckControls deck={deckA} />
        <Mixer
          crossfader={crossfader}
          setCrossfader={setCrossfader}
          masterVolume={masterVolume}
          setMasterVolume={setMasterVolume}
        />
        <DeckControls deck={deckB} />
      </div>

      {error && <p className="error">{error}</p>}
    </main>
  );
}
