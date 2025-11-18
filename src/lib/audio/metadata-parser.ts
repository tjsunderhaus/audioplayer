import type { ICYMetadata, ParsedMetadata } from '@/types/metadata';

/**
 * Parse ICY metadata from stream
 */
export function parseICYMetadata(metadata: ICYMetadata): ParsedMetadata | null {
  const streamTitle = metadata.StreamTitle;

  if (!streamTitle) {
    return null;
  }

  // Common patterns: "Artist - Title" or "Title"
  const dashSplit = streamTitle.split(' - ');

  if (dashSplit.length >= 2) {
    return {
      artist: dashSplit[0].trim(),
      title: dashSplit.slice(1).join(' - ').trim(),
      raw: streamTitle,
    };
  }

  // No artist info, just title
  return {
    artist: '',
    title: streamTitle.trim(),
    raw: streamTitle,
  };
}

/**
 * Format metadata for display
 */
export function formatMetadata(metadata: ParsedMetadata | null): string {
  if (!metadata) {
    return 'Live Stream';
  }

  if (metadata.artist && metadata.title) {
    return `${metadata.artist} - ${metadata.title}`;
  }

  return metadata.title || 'Live Stream';
}

/**
 * Check if metadata has changed
 */
export function hasMetadataChanged(
  current: ParsedMetadata | null,
  previous: ParsedMetadata | null
): boolean {
  if (!current && !previous) return false;
  if (!current || !previous) return true;

  return current.raw !== previous.raw;
}
