'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export function VolumeControl({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
}: VolumeControlProps) {
  const displayVolume = muted ? 0 : volume;
  const volumePercentage = Math.round(displayVolume * 100);

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Volume controls">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              aria-pressed={muted}
            >
              {muted || volume === 0 ? (
                <VolumeX className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Volume2 className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{muted ? 'Unmute' : 'Mute'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="w-24 md:w-32">
        <Slider
          value={[displayVolume * 100]}
          onValueChange={(value) => onVolumeChange(value[0] / 100)}
          max={100}
          step={1}
          aria-label={`Volume: ${volumePercentage}%`}
          className="cursor-pointer"
        />
      </div>

      <span className="text-xs text-muted-foreground w-10 text-right" aria-live="polite">
        {volumePercentage}%
      </span>
    </div>
  );
}
