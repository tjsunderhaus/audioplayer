'use client';

import { Play, Pause, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PlayerState } from '@/types/audio';

interface PlayButtonProps {
  state: PlayerState;
  onToggle: () => void;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function PlayButton({ state, onToggle, size = 'icon' }: PlayButtonProps) {
  const isLoading = state === 'loading' || state === 'buffering';
  const isPlaying = state === 'playing';

  return (
    <Button
      variant="default"
      size={size}
      onClick={onToggle}
      disabled={isLoading || state === 'error'}
      aria-label={isPlaying ? 'Pause' : 'Play'}
      aria-pressed={isPlaying}
      className="transition-transform hover:scale-105"
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
      ) : isPlaying ? (
        <Pause className="h-6 w-6" aria-hidden="true" />
      ) : (
        <Play className="h-6 w-6" aria-hidden="true" />
      )}
    </Button>
  );
}
