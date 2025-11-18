import type { StreamConfig } from '@/types/audio';
import type { StreamHealth, ConnectionEvent } from '@/types/stream';

export class StreamManager {
  private audio: HTMLAudioElement | null = null;
  private config: StreamConfig;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectDelay = 2000;
  private health: StreamHealth = {
    connected: false,
    latency: 0,
    retries: 0,
  };
  private events: ConnectionEvent[] = [];

  constructor(config: StreamConfig) {
    this.config = config;
  }

  /**
   * Initialize audio element
   */
  initialize(): HTMLAudioElement {
    if (this.audio) {
      return this.audio;
    }

    this.audio = new Audio();
    this.audio.src = this.config.url;
    this.audio.preload = 'auto'; // Changed from 'none' to 'auto' for live streams
    this.audio.crossOrigin = 'anonymous';

    this.setupEventListeners();

    // Load the stream to establish connection
    this.audio.load();

    return this.audio;
  }

  /**
   * Setup audio event listeners
   */
  private setupEventListeners(): void {
    if (!this.audio) return;

    this.audio.addEventListener('loadstart', () => {
      this.addEvent('buffering', 'Stream loading started');
    });

    this.audio.addEventListener('loadeddata', () => {
      this.health.connected = true;
      this.health.lastSuccess = new Date();
      this.reconnectAttempts = 0;
      this.addEvent('connected', 'Stream loaded successfully');
    });

    this.audio.addEventListener('playing', () => {
      this.addEvent('playing', 'Stream is playing');
    });

    this.audio.addEventListener('error', () => {
      const error = this.audio?.error;
      if (error) {
        this.handleError(error);
        this.addEvent('error', `Stream error: ${error.message || 'Unknown error'}`);
      }
    });

    this.audio.addEventListener('stalled', () => {
      this.addEvent('buffering', 'Stream stalled, buffering...');
    });

    this.audio.addEventListener('waiting', () => {
      this.addEvent('buffering', 'Waiting for data...');
    });

    this.audio.addEventListener('ended', () => {
      this.addEvent('disconnected', 'Stream ended');
      this.attemptReconnect();
    });
  }

  /**
   * Handle audio errors
   */
  private handleError(error: MediaError | null): void {
    if (!error) return;

    this.health.connected = false;
    this.health.lastError = new Error(this.getErrorMessage(error));
    this.health.retries = this.reconnectAttempts;

    // Attempt reconnection for network errors
    if (error.code === MediaError.MEDIA_ERR_NETWORK) {
      this.attemptReconnect();
    }
  }

  /**
   * Get human-readable error message
   */
  private getErrorMessage(error: MediaError): string {
    switch (error.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        return 'Stream playback aborted';
      case MediaError.MEDIA_ERR_NETWORK:
        return 'Network error while loading stream';
      case MediaError.MEDIA_ERR_DECODE:
        return 'Stream decoding error';
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return 'Stream format not supported';
      default:
        return 'Unknown playback error';
    }
  }

  /**
   * Attempt to reconnect to stream
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.addEvent('error', 'Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    this.health.retries = this.reconnectAttempts;

    setTimeout(() => {
      if (this.audio) {
        this.audio.load();
        this.audio.play().catch(() => {
          // Silent catch - will retry
        });
        this.addEvent('buffering', `Reconnection attempt ${this.reconnectAttempts}`);
      }
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  /**
   * Add connection event
   */
  private addEvent(type: ConnectionEvent['type'], details?: unknown): void {
    this.events.push({
      type,
      timestamp: new Date(),
      details,
    });

    // Keep only last 50 events
    if (this.events.length > 50) {
      this.events.shift();
    }
  }

  /**
   * Get current stream health
   */
  getHealth(): StreamHealth {
    return { ...this.health };
  }

  /**
   * Get connection events
   */
  getEvents(): ConnectionEvent[] {
    return [...this.events];
  }

  /**
   * Update stream URL
   */
  updateStream(url: string): void {
    if (this.audio) {
      const wasPlaying = !this.audio.paused;
      this.audio.src = url;
      this.config.url = url;

      if (wasPlaying) {
        this.audio.play().catch(() => {
          // Silent catch
        });
      }
    }
  }

  /**
   * Destroy stream manager
   */
  destroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
    this.events = [];
  }
}
