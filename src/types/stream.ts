export interface IcecastStatus {
  online: boolean;
  listeners?: number;
  peak_listeners?: number;
  bitrate?: number;
  server_name?: string;
  server_description?: string;
  server_url?: string;
  stream_start?: string;
}

export interface StreamHealth {
  connected: boolean;
  latency: number;
  retries: number;
  lastError?: Error;
  lastSuccess?: Date;
}

export interface ConnectionEvent {
  type: 'connected' | 'disconnected' | 'error' | 'buffering' | 'playing';
  timestamp: Date;
  details?: unknown;
}
