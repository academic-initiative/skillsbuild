// DeckPanel — everything for one deck: load button, track name, waveform, the mixer
// strip (DeckControls), and transport. Driven by a UseDeck, so deck A and deck B are
// the same component with different state.

import { useRef, useState } from 'react';
import type { UseDeck } from '../useDeck';
import Waveform from './Waveform';

interface Props {
  deck: UseDeck;
  label: string;
  ensureAudio: () => Promise<void>; // boots the AudioContext on first user gesture
}

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function DeckPanel({ deck, label, ensureAudio }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setLoading(true);
    try {
      await ensureAudio();
      await deck.load(file);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const { track } = deck.state;

  return (
    <section className="deck">
      <header className="deck-head">
        <span className="deck-label">{label}</span>
        <button className="btn ghost" onClick={() => fileInputRef.current?.click()} disabled={loading}>
          {loading ? 'Loading…' : 'Load track'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*,.wav,.mp3,.flac,.aiff,.aif"
          onChange={onPickFile}
          hidden
        />
      </header>

      <div className="track-name">{track ? track.name : 'No track loaded'}</div>

      <div className="waveform-wrap">
        <Waveform peaks={track?.peaks ?? null} position={deck.position} onSeek={deck.seek} />
      </div>

      <div className="transport">
        <button
          className={`btn ${deck.state.playing ? 'stop' : 'start'}`}
          onClick={deck.togglePlay}
          disabled={!track}
        >
          {deck.state.playing ? '◼ Pause' : '▶ Play'}
        </button>
        <span className="time">
          {track ? `${fmt(deck.position * track.duration)} / ${fmt(track.duration)}` : '0:00 / 0:00'}
        </span>
      </div>

      {error && <p className="error">{error}</p>}
    </section>
  );
}
