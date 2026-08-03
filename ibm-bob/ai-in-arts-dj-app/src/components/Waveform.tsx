// Waveform — canvas waveform with playhead, click-to-seek, and scroll-to-zoom.
//
// Performance matters here: the playhead moves ~20x/sec, so redrawing the full
// thousands-of-segments waveform every tick would jank the main thread (and, paired
// with the audio worklet's event stream, can spiral into a crash). Instead we render
// the peaks ONCE to an offscreen bitmap, normalized to fill the height, and each frame
// just blit the visible slice of that bitmap and stroke one playhead line.
//
// Zoom: the mouse wheel shrinks/grows the visible fraction of the track; when zoomed
// in, the view follows the playhead (centered, clamped at the ends) — like the
// desktop app's scrolling waveform.

import { useCallback, useEffect, useRef, useState } from 'react';
import type { TrackPeaks } from '../track';

interface Props {
  peaks: TrackPeaks | null;
  position: number; // normalized 0..1
  onSeek: (norm: number) => void;
}

const CACHE_HEIGHT = 256; // offscreen bitmap height; scaled to the canvas at blit time
const MIN_WINDOW = 0.02; // closest zoom: 2% of the track visible

export default function Waveform({ peaks, position, onSeek }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cacheRef = useRef<HTMLCanvasElement | null>(null);
  const [windowFrac, setWindowFrac] = useState(1); // fraction of track visible (1 = all)

  // Reset to the full-track view whenever a new track loads.
  useEffect(() => {
    setWindowFrac(1);
  }, [peaks]);

  // Render the peaks to an offscreen bitmap, normalized so the loudest peak fills the
  // height. Rebuilt only when the peaks change — not per frame.
  useEffect(() => {
    if (!peaks) {
      cacheRef.current = null;
      return;
    }
    const w = peaks.buckets;
    let off = cacheRef.current;
    if (!off) {
      off = document.createElement('canvas');
      cacheRef.current = off;
    }
    off.width = w;
    off.height = CACHE_HEIGHT;
    const c = off.getContext('2d');
    if (!c) return;

    let peak = 0;
    for (let i = 0; i < w; i++) {
      const m = Math.max(Math.abs(peaks.min[i]), Math.abs(peaks.max[i]));
      if (m > peak) peak = m;
    }
    const norm = peak > 0 ? 1 / peak : 1;
    const mid = CACHE_HEIGHT / 2;

    c.clearRect(0, 0, w, CACHE_HEIGHT);
    c.strokeStyle = '#4cc2ff';
    c.beginPath();
    for (let x = 0; x < w; x++) {
      c.moveTo(x + 0.5, mid - peaks.min[x] * norm * mid);
      c.lineTo(x + 0.5, mid - peaks.max[x] * norm * mid);
    }
    c.stroke();
  }, [peaks]);

  // The visible bucket window, centered on the playhead and clamped to the track.
  const windowFor = useCallback(
    (totalBuckets: number) => {
      const win = Math.max(1, Math.round(totalBuckets * windowFrac));
      const center = position * totalBuckets;
      const start = Math.max(0, Math.min(totalBuckets - win, center - win / 2));
      return { start, win };
    },
    [position, windowFrac],
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (cssW === 0 || cssH === 0) return;

    const bw = Math.round(cssW * dpr);
    const bh = Math.round(cssH * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const cache = cacheRef.current;
    if (!cache) {
      ctx.strokeStyle = '#2b303d';
      ctx.beginPath();
      ctx.moveTo(0, cssH / 2);
      ctx.lineTo(cssW, cssH / 2);
      ctx.stroke();
      return;
    }

    const total = cache.width;
    const { start, win } = windowFor(total);

    // Blit just the visible slice, scaled to the canvas.
    ctx.drawImage(cache, start, 0, win, cache.height, 0, 0, cssW, cssH);

    // Playhead at its true position within the visible window.
    const playX = ((position * total - start) / win) * cssW;
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(playX, 0);
    ctx.lineTo(playX, cssH);
    ctx.stroke();
  }, [position, windowFor]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw]);

  // Wheel zoom — attached natively so we can preventDefault (React's onWheel is passive).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1.2 : 1 / 1.2;
      setWindowFrac((f) => Math.max(MIN_WINDOW, Math.min(1, f * factor)));
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const cache = cacheRef.current;
    if (!cache) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    const total = cache.width;
    const { start, win } = windowFor(total);
    onSeek((start + frac * win) / total);
  };

  return <canvas ref={canvasRef} className="waveform" onClick={handleClick} />;
}
