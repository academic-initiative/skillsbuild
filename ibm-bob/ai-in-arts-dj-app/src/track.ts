// track.ts — turn a user-selected audio file into something the audio graph can play.
//
// Desktop DeckFlow did this in native C++ (dr_libs decode → raw PCM, plus peak
// extraction). In the browser the platform hands us both for free:
//   - decodeAudioData() decodes WAV/MP3/FLAC and resamples to the AudioContext rate
//   - we downsample the PCM ourselves to draw a waveform
//
// One Elementary quirk shapes the data model: el.table reads *channel 0 only* of a
// buffer. So a stereo track becomes two mono virtual-file-system (VFS) entries — one
// per channel — that the deck graph reads with a shared position signal.

import type { AudioRuntime } from './audio';

export interface TrackPeaks {
  min: Float32Array;
  max: Float32Array;
  buckets: number;
}

export interface TrackData {
  name: string;
  duration: number; // seconds
  totalFrames: number; // frames at the AudioContext sample rate
  sampleRate: number;
  peaks: TrackPeaks;
  pathL: string; // VFS key for the left channel
  pathR: string; // VFS key for the right channel
}

// Higher than the pixel width so a zoomed-in view still has detail to draw.
const PEAK_BUCKETS = 6000;

function computePeaks(channel: Float32Array, buckets: number): TrackPeaks {
  const min = new Float32Array(buckets);
  const max = new Float32Array(buckets);
  const bucketSize = channel.length / buckets;

  for (let b = 0; b < buckets; b++) {
    const start = Math.floor(b * bucketSize);
    const end = Math.min(channel.length, Math.floor((b + 1) * bucketSize));
    let mn = 0;
    let mx = 0;
    for (let i = start; i < end; i++) {
      const v = channel[i];
      if (v < mn) mn = v;
      if (v > mx) mx = v;
    }
    min[b] = mn;
    max[b] = mx;
  }

  return { min, max, buckets };
}

/**
 * Decodes `file`, loads its channels into the Elementary VFS under `${deckId}:L` /
 * `${deckId}:R`, and returns the metadata + waveform peaks the UI needs.
 */
export async function loadTrackToVFS(
  rt: AudioRuntime,
  deckId: string,
  file: File,
): Promise<TrackData> {
  const arrayBuffer = await file.arrayBuffer();
  // decodeAudioData resamples to rt.ctx.sampleRate, so frame counts below are already
  // in the engine's sample rate — no resampling factor needed in the transport math.
  const audioBuffer = await rt.ctx.decodeAudioData(arrayBuffer);

  const ch0 = audioBuffer.getChannelData(0);
  const ch1 = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : ch0;

  // Copy into standalone Float32Arrays; getChannelData returns views onto the
  // AudioBuffer that we don't want the VFS to alias.
  const left = new Float32Array(ch0);
  const right = new Float32Array(ch1);

  const pathL = `${deckId}:L`;
  const pathR = `${deckId}:R`;

  // Must complete before any render references these paths, or the table node
  // rejects the path as an invalid resource.
  await rt.core.updateVirtualFileSystem({ [pathL]: left, [pathR]: right });

  return {
    name: file.name,
    duration: audioBuffer.duration,
    totalFrames: audioBuffer.length,
    sampleRate: audioBuffer.sampleRate,
    peaks: computePeaks(ch0, PEAK_BUCKETS),
    pathL,
    pathR,
  };
}
