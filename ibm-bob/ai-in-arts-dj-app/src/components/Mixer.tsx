// Mixer — the crossfader between deck A and B, plus master volume.
// The actual gain math (equal-power crossfade) lives in App's render effect; this is
// just the control surface.

import Knob from './Knob';

interface Props {
  crossfader: number; // -1 (full A) .. +1 (full B)
  setCrossfader: (v: number) => void;
  masterVolume: number; // 0..1
  setMasterVolume: (v: number) => void;
}

export default function Mixer({ crossfader, setCrossfader, masterVolume, setMasterVolume }: Props) {
  return (
    <section className="mixer">
      <Knob
        label="MASTER"
        value={masterVolume}
        min={0}
        max={1}
        defaultValue={0.8}
        onChange={setMasterVolume}
        format={(v) => `${Math.round(v * 100)}`}
      />
      <div className="xfader">
        <input
          className="xfader-input"
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={crossfader}
          onChange={(e) => setCrossfader(parseFloat(e.target.value))}
          onDoubleClick={() => setCrossfader(0)}
          title="Double-click to center"
        />
        <div className="xfader-ends">
          <span>A</span>
          <span>B</span>
        </div>
      </div>
    </section>
  );
}
