// Knob — a small rotary control. Drag vertically to change; double-click to reset.
// Used for the 3-band EQ and the DJ filter. Ported from the desktop EQKnob, with the
// Tailwind classes swapped for plain CSS.

import { useCallback, useRef } from 'react';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  defaultValue?: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}

export default function Knob({
  label,
  value,
  min,
  max,
  defaultValue = 0,
  onChange,
  format,
}: Props) {
  const dragRef = useRef<{ startY: number; startValue: number } | null>(null);

  // Map value → -135°..+135° sweep.
  const rotation = ((value - min) / (max - min)) * 270 - 135;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      dragRef.current = { startY: e.clientY, startValue: value };
      const range = max - min;

      const move = (ev: PointerEvent) => {
        if (!dragRef.current) return;
        const deltaY = dragRef.current.startY - ev.clientY;
        const next = dragRef.current.startValue + (deltaY * range) / 150; // 150px = full sweep
        onChange(Math.max(min, Math.min(max, Math.round(next * 10) / 10)));
      };
      const up = () => {
        dragRef.current = null;
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    },
    [value, min, max, onChange],
  );

  return (
    <div className="knob">
      <span className="knob-label">{label}</span>
      <div
        className="knob-body"
        onPointerDown={handlePointerDown}
        onDoubleClick={() => onChange(defaultValue)}
      >
        <div className="knob-dial" style={{ transform: `rotate(${rotation}deg)` }}>
          <div className="knob-tick" />
        </div>
      </div>
      <span className="knob-value">{format ? format(value) : value.toFixed(1)}</span>
    </div>
  );
}
