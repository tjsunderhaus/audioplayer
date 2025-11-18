'use client';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useStreamMetadata } from '@/hooks/useStreamMetadata';
import { useStreamHealth } from '@/hooks/useStreamHealth';
import { PlayButton } from './PlayButton';
import { VolumeControl } from './VolumeControl';
import { MetadataDisplay } from './MetadataDisplay';
import { StreamIndicator } from './StreamIndicator';
import { ErrorDisplay } from './ErrorDisplay';
import type { StreamConfig } from '@/types/audio';

interface AudioPlayerProps {
  stream: StreamConfig;
  className?: string;
  showMetadata?: boolean;
  autoplay?: boolean;
}

export function AudioPlayer({
  stream,
  className = '',
  showMetadata = true,
  autoplay = false,
}: AudioPlayerProps) {
  const { status, togglePlay, toggleMute, changeVolume, streamManager } = useAudioPlayer(stream, {
    autoplay,
  });

  const { metadata, loading: metadataLoading } = useStreamMetadata(
    stream.metadataUrl,
    showMetadata
  );

  const health = useStreamHealth(streamManager);

  return (
    <div
      className={`glass-morphism rounded-2xl p-4 md:p-6 shadow-xl ${className}`}
      role="region"
      aria-label="Audio Player"
    >
      {/* Error State */}
      {status.state === 'error' && (
        <div className="mb-4">
          <ErrorDisplay message={health.lastError?.message} />
        </div>
      )}

      {/* Main Player Controls */}
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <PlayButton state={status.state} onToggle={togglePlay} size="lg" />

        {/* Metadata Display */}
        {showMetadata && (
          <MetadataDisplay metadata={metadata} loading={metadataLoading} />
        )}

        {/* Stream Indicator */}
        <div className="flex-shrink-0">
          <StreamIndicator state={status.state} />
        </div>
      </div>

      {/* Volume Controls */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <VolumeControl
          volume={status.volume}
          muted={status.muted}
          onVolumeChange={changeVolume}
          onToggleMute={toggleMute}
        />
      </div>

      {/* Stream Info (optional) */}
      {stream.description && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">{stream.description}</p>
        </div>
      )}

      {/* Connection Health (dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
          <div className="grid grid-cols-2 gap-2">
            <div>Connected: {health.connected ? 'Yes' : 'No'}</div>
            <div>Retries: {health.retries}</div>
          </div>
        </div>
      )}
    </div>
  );
}
