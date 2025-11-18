'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { PlayerState, PlayerStatus, StreamConfig, AudioPlayerConfig } from '@/types/audio';
import { StreamManager } from '@/lib/audio/stream-manager';

export function useAudioPlayer(stream: StreamConfig, config?: AudioPlayerConfig) {
  const [state, setState] = useState<PlayerState>('idle');
  const [volume, setVolume] = useState(config?.volume ?? 0.7);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamManagerRef = useRef<StreamManager | null>(null);

  // Initialize stream manager
  useEffect(() => {
    streamManagerRef.current = new StreamManager(stream);
    const audio = streamManagerRef.current.initialize();
    audioRef.current = audio;

    // Set initial volume and mute state
    const initialVolume = config?.volume ?? 0.7;
    const initialMuted = config?.autoplay ? false : muted;
    audio.volume = initialVolume;
    audio.muted = initialMuted;

    // Event listeners
    const handleLoadStart = () => setState('loading');
    const handleCanPlay = () => {
      if (state === 'loading') setState('paused');
    };
    const handlePlaying = () => setState('playing');
    const handlePause = () => setState('paused');
    const handleWaiting = () => setState('buffering');
    const handleError = () => setState('error');
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        setBuffered(bufferedEnd);
      }
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('progress', handleProgress);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('progress', handleProgress);

      streamManagerRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream.url]); // Only re-initialize if stream URL changes

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update muted state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const play = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      setState('loading');
      await audioRef.current.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setState('error');
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (state === 'playing') {
      pause();
    } else {
      play();
    }
  }, [state, play, pause]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }, []);

  const status: PlayerStatus = {
    state,
    volume,
    muted,
    currentTime,
    duration,
    buffered,
  };

  return {
    status,
    play,
    pause,
    togglePlay,
    toggleMute,
    changeVolume,
    audioElement: audioRef.current,
    streamManager: streamManagerRef.current,
  };
}
