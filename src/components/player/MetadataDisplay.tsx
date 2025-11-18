'use client';

import { Music } from 'lucide-react';
import type { ParsedMetadata } from '@/types/metadata';
import { formatMetadata } from '@/lib/audio/metadata-parser';

interface MetadataDisplayProps {
  metadata: ParsedMetadata | null;
  loading?: boolean;
}

export function MetadataDisplay({ metadata, loading }: MetadataDisplayProps) {
  const displayText = formatMetadata(metadata);

  return (
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div
        className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center"
        aria-hidden="true"
      >
        <Music className="w-6 h-6 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
            <div className="h-3 bg-secondary rounded animate-pulse w-1/2" />
          </div>
        ) : (
          <>
            {metadata?.artist ? (
              <>
                <div className="font-semibold truncate text-sm md:text-base" title={metadata.title}>
                  {metadata.title}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground truncate" title={metadata.artist}>
                  {metadata.artist}
                </div>
              </>
            ) : (
              <div className="font-semibold text-sm md:text-base truncate" title={displayText}>
                {displayText}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
