export type AudioCodec = 'mp3' | 'aac' | 'aac+';

export interface StreamConfig {
  url: string;
  codec?: AudioCodec;
  name: string;
  description?: string;
  artwork?: string;
  metadataUrl?: string;
}

export interface StreamMetadata {
  artist?: string;
  title?: string;
  album?: string;
  artwork?: string;
  timestamp?: number;
}

export type PlayerState = 'idle' | 'loading' | 'playing' | 'paused' | 'error' | 'buffering';

export interface PlayerStatus {
  state: PlayerState;
  volume: number;
  muted: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
}

export interface StreamError {
  code: string;
  message: string;
  timestamp: number;
}

export interface AudioPlayerConfig {
  autoplay?: boolean;
  volume?: number;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  bufferSize?: number;
}
