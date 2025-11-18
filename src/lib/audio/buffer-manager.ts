/**
 * Calculate buffer percentage
 */
export function getBufferPercentage(audio: HTMLAudioElement): number {
  if (!audio.buffered.length) return 0;

  const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
  const duration = audio.duration;

  if (!isFinite(duration) || duration === 0) return 0;

  return (bufferedEnd / duration) * 100;
}

/**
 * Check if enough buffer is available
 */
export function hasEnoughBuffer(audio: HTMLAudioElement, threshold = 0.1): boolean {
  if (!audio.buffered.length) return false;

  const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
  const currentTime = audio.currentTime;

  return bufferedEnd - currentTime >= threshold;
}

/**
 * Get buffered time ranges
 */
export function getBufferedRanges(audio: HTMLAudioElement): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = [];

  for (let i = 0; i < audio.buffered.length; i++) {
    ranges.push({
      start: audio.buffered.start(i),
      end: audio.buffered.end(i),
    });
  }

  return ranges;
}
