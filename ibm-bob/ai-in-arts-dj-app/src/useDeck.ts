// useDeck — React state + transport for a single deck.
//
// Owns the reducer-backed DeckState (the serializable transport + mixer controls) plus
// two pieces of live, high-rate state that must NOT live in the reducer (they update
// ~30x/sec and would otherwise trigger graph re-renders): the playhead position and
// the meter level. Both arrive asynchronously from the audio graph's analysis events.

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { getRuntime } from './audio';
import { loadTrackToVFS } from './track';
import {
  DeckState,
  initialDeckState,
  METER_EVENT_SUFFIX,
  POS_EVENT_SUFFIX,
} from './deck';

type EqBand = 'eqLow' | 'eqMid' | 'eqHigh';

type Action =
  | { type: 'LOAD'; track: DeckState['track'] }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SEEK'; norm: number }
  | { type: 'END' }
  | { type: 'SET_VOLUME'; value: number }
  | { type: 'SET_EQ'; band: EqBand; value: number }
  | { type: 'SET_FILTER'; value: number };

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function reducer(s: DeckState, a: Action): DeckState {
  switch (a.type) {
    case 'LOAD':
      // New track: stop, rewind, and bump seekGen so the transport accumulator resets.
      return { ...s, track: a.track, playing: false, baseNorm: 0, seekGen: s.seekGen + 1, tempo: 1 };
    case 'PLAY':
      return s.track ? { ...s, playing: true } : s;
    case 'PAUSE':
      return { ...s, playing: false };
    case 'SEEK':
      return s.track ? { ...s, baseNorm: clamp01(a.norm), seekGen: s.seekGen + 1 } : s;
    case 'END':
      // Reached the end: stop and rewind to the start.
      return { ...s, playing: false, baseNorm: 0, seekGen: s.seekGen + 1 };
    case 'SET_VOLUME':
      return { ...s, volume: clamp01(a.value) };
    case 'SET_EQ':
      return { ...s, [a.band]: a.value };
    case 'SET_FILTER':
      return { ...s, filterCutoff: Math.max(-1, Math.min(1, a.value)) };
    default:
      return s;
  }
}

export interface UseDeck {
  state: DeckState;
  position: number; // live normalized playhead 0..1
  level: number; // live meter level 0..1
  load: (file: File) => Promise<void>;
  togglePlay: () => void;
  seek: (norm: number) => void;
  setVolume: (value: number) => void;
  setEq: (band: EqBand, value: number) => void;
  setFilter: (value: number) => void;
}

export function useDeck(id: string, audioReady: boolean): UseDeck {
  const [state, dispatch] = useReducer(reducer, id, initialDeckState);
  const [position, setPosition] = useState(0);
  const [level, setLevel] = useState(0);

  // Ref so the snapshot handler reads current `playing` without re-subscribing.
  const playingRef = useRef(state.playing);
  playingRef.current = state.playing;

  // Route this deck's analysis events (playhead + meter) into local state.
  useEffect(() => {
    if (!audioReady) return;
    const rt = getRuntime();
    if (!rt) return;

    const posSource = `${id}${POS_EVENT_SUFFIX}`;
    const meterSource = `${id}${METER_EVENT_SUFFIX}`;

    const onSnapshot = (e: { source?: string; data: number }) => {
      if (e.source !== posSource) return;
      const p = clamp01(e.data);
      setPosition(p);
      if (p >= 0.9999 && playingRef.current) dispatch({ type: 'END' });
    };

    const onMeter = (e: { source?: string; min: number; max: number }) => {
      if (e.source !== meterSource) return;
      setLevel(clamp01(Math.max(Math.abs(e.min), Math.abs(e.max))));
    };

    rt.core.on('snapshot', onSnapshot);
    rt.core.on('meter', onMeter);
    return () => {
      rt.core.off('snapshot', onSnapshot);
      rt.core.off('meter', onMeter);
    };
  }, [id, audioReady]);

  const load = useCallback(
    async (file: File) => {
      const rt = getRuntime();
      if (!rt) return;
      const track = await loadTrackToVFS(rt, id, file);
      setPosition(0);
      dispatch({ type: 'LOAD', track });
    },
    [id],
  );

  const togglePlay = useCallback(() => {
    dispatch(playingRef.current ? { type: 'PAUSE' } : { type: 'PLAY' });
  }, []);

  const seek = useCallback((norm: number) => {
    setPosition(clamp01(norm));
    dispatch({ type: 'SEEK', norm });
  }, []);

  const setVolume = useCallback((value: number) => dispatch({ type: 'SET_VOLUME', value }), []);
  const setEq = useCallback((band: EqBand, value: number) => dispatch({ type: 'SET_EQ', band, value }), []);
  const setFilter = useCallback((value: number) => dispatch({ type: 'SET_FILTER', value }), []);

  return { state, position, level, load, togglePlay, seek, setVolume, setEq, setFilter };
}
