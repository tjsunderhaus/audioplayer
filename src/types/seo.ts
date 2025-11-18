export interface RadioStationSchema {
  '@context': 'https://schema.org';
  '@type': 'RadioStation';
  name: string;
  description?: string;
  url: string;
  logo?: string;
  broadcastFrequency?: string;
}

export interface BroadcastEventSchema {
  '@context': 'https://schema.org';
  '@type': 'BroadcastEvent';
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isLiveBroadcast: boolean;
  publishedOn?: {
    '@type': 'RadioStation';
    name: string;
  };
}

export interface MusicEventSchema {
  '@context': 'https://schema.org';
  '@type': 'MusicEvent';
  name: string;
  description?: string;
  startDate: string;
  performer?: {
    '@type': 'Person' | 'MusicGroup';
    name: string;
  };
}

export type StructuredDataSchema = RadioStationSchema | BroadcastEventSchema | MusicEventSchema;
