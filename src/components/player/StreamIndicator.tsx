'use client';

import { Radio, AlertCircle, Loader2 } from 'lucide-react';
import type { PlayerState } from '@/types/audio';

interface StreamIndicatorProps {
  state: PlayerState;
}

export function StreamIndicator({ state }: StreamIndicatorProps) {
  const getIndicator = () => {
    switch (state) {
      case 'playing':
        return (
          <div className="flex items-center gap-2 text-green-500">
            <Radio className="w-4 h-4 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-medium">LIVE</span>
          </div>
        );
      case 'loading':
      case 'buffering':
        return (
          <div className="flex items-center gap-2 text-yellow-500">
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span className="text-xs font-medium">
              {state === 'loading' ? 'LOADING' : 'BUFFERING'}
            </span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs font-medium">ERROR</span>
          </div>
        );
      case 'paused':
        return (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Radio className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs font-medium">PAUSED</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div role="status" aria-live="polite">
      {getIndicator()}
    </div>
  );
}
