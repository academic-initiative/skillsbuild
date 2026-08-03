// DeckControls — the per-deck mixer strip: 3-band EQ, DJ filter, and volume + meter.
// Driven entirely by a UseDeck instance, so it drops straight into a second deck in P3.

import type { UseDeck } from '../useDeck';
import Knob from './Knob';
import Fader from './Fader';

const dB = (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(0)}`;

function filterLabel(v: number): string {
  if (Math.abs(v) < 0.02) return 'OFF';
  return v < 0 ? `LP ${Math.round(-v * 100)}` : `HP ${Math.round(v * 100)}`;
}

export default function DeckControls({ deck }: { deck: UseDeck }) {
  const { state, level } = deck;

  return (
    <div className="deck-controls">
      <div className="eq-group">
        <Knob label="HIGH" value={state.eqHigh} min={-12} max={12} onChange={(v) => deck.setEq('eqHigh', v)} format={dB} />
        <Knob label="MID" value={state.eqMid} min={-12} max={12} onChange={(v) => deck.setEq('eqMid', v)} format={dB} />
        <Knob label="LOW" value={state.eqLow} min={-12} max={12} onChange={(v) => deck.setEq('eqLow', v)} format={dB} />
      </div>
      <Knob
        label="FILTER"
        value={state.filterCutoff}
        min={-1}
        max={1}
        onChange={deck.setFilter}
        format={filterLabel}
      />
      <Fader value={state.volume} level={level} onChange={deck.setVolume} />
    </div>
  );
}
