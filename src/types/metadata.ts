export interface ICYMetadata {
  StreamTitle?: string;
  StreamUrl?: string;
}

export interface ParsedMetadata {
  artist: string;
  title: string;
  raw: string;
}

export interface MetadataUpdate {
  metadata: ParsedMetadata;
  timestamp: number;
  source: 'icy' | 'json' | 'manual';
}
