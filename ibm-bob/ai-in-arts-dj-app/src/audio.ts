// audio.ts — the single Web Audio + Elementary entry point.
//
// In the desktop DeckFlow, a native C++ runtime executed the Elementary graph and
// drove PortAudio. In the browser we use @elemaudio/web-renderer, which runs the
// exact same graph inside a WebAudio AudioWorklet compiled to WASM. The graph code
// (built with `el.*` from @elemaudio/core) is identical to the desktop app — only
// the *renderer* and the *output sink* change.

import WebRenderer from '@elemaudio/web-renderer';

export interface AudioRuntime {
  ctx: AudioContext;
  core: WebRenderer;
}

let runtime: AudioRuntime | null = null;

/**
 * Boots the AudioContext + Elementary WebRenderer. Must be called from a user
 * gesture (click/tap) — browsers refuse to start an AudioContext otherwise.
 * Safe to call repeatedly; it initializes once and resumes a suspended context.
 */
export async function initAudio(): Promise<AudioRuntime> {
  if (runtime) {
    if (runtime.ctx.state === 'suspended') await runtime.ctx.resume();
    return runtime;
  }

  const ctx = new AudioContext();
  const core = new WebRenderer();

  // The renderer resolves to a WebAudio node that contains the WASM runtime.
  // The third arg is the event-poll interval (ms): how often the worklet flushes
  // meter/snapshot events to the main thread. 50ms (20Hz) is plenty for a playhead
  // and meters, and keeps the worklet→main message rate low enough that a busy main
  // thread can't let the queue back up.
  const node = await core.initialize(
    ctx,
    {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2], // stereo out — the browser gives us one stereo bus
    },
    50,
  );

  node.connect(ctx.destination);

  if (ctx.state === 'suspended') await ctx.resume();

  runtime = { ctx, core };
  return runtime;
}

export function getRuntime(): AudioRuntime | null {
  return runtime;
}
