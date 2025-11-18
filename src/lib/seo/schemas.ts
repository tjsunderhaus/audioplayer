import type {
  RadioStationSchema,
  BroadcastEventSchema,
  MusicEventSchema,
} from '@/types/seo';

export function createRadioStationSchema(data: {
  name: string;
  description?: string;
  url: string;
  logo?: string;
}): RadioStationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'RadioStation',
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo,
  };
}

export function createBroadcastEventSchema(data: {
  name: string;
  description?: string;
  stationName: string;
}): BroadcastEventSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BroadcastEvent',
    name: data.name,
    description: data.description,
    startDate: new Date().toISOString(),
    isLiveBroadcast: true,
    publishedOn: {
      '@type': 'RadioStation',
      name: data.stationName,
    },
  };
}

export function createMusicEventSchema(data: {
  name: string;
  description?: string;
  performer?: string;
}): MusicEventSchema {
  const schema: MusicEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: data.name,
    description: data.description,
    startDate: new Date().toISOString(),
  };

  if (data.performer) {
    schema.performer = {
      '@type': 'MusicGroup',
      name: data.performer,
    };
  }

  return schema;
}
