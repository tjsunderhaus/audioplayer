'use client';

import { useState, useEffect } from 'react';
import type { ParsedMetadata } from '@/types/metadata';

export function useStreamMetadata(metadataUrl?: string, enabled = true) {
  const [metadata, setMetadata] = useState<ParsedMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !metadataUrl) return;

    const fetchMetadata = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(metadataUrl);
        if (!response.ok) throw new Error('Failed to fetch metadata');

        const data = await response.json();

        // Parse JSON metadata (structure depends on Icecast setup)
        if (data.icestats?.source) {
          const source = Array.isArray(data.icestats.source)
            ? data.icestats.source[0]
            : data.icestats.source;

          const title = source.title || source.server_name || '';
          const parts = title.split(' - ');

          setMetadata({
            artist: parts.length > 1 ? parts[0].trim() : '',
            title: parts.length > 1 ? parts.slice(1).join(' - ').trim() : title.trim(),
            raw: title,
          });
        }
      } catch (err) {
        setError(err as Error);
        console.error('Metadata fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchMetadata();

    // Poll every 10 seconds
    const interval = setInterval(fetchMetadata, 10000);

    return () => clearInterval(interval);
  }, [metadataUrl, enabled]);

  return { metadata, loading, error };
}
