'use client';

import { useState, useEffect } from 'react';
import type { StreamHealth } from '@/types/stream';
import type { StreamManager } from '@/lib/audio/stream-manager';

export function useStreamHealth(streamManager: StreamManager | null) {
  const [health, setHealth] = useState<StreamHealth>({
    connected: false,
    latency: 0,
    retries: 0,
  });

  useEffect(() => {
    if (!streamManager) return;

    const updateHealth = () => {
      setHealth(streamManager.getHealth());
    };

    // Update health every 2 seconds
    const interval = setInterval(updateHealth, 2000);

    // Initial update
    updateHealth();

    return () => clearInterval(interval);
  }, [streamManager]);

  return health;
}
