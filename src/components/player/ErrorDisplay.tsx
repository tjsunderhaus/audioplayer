'use client';

import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message?: string;
}

export function ErrorDisplay({ message = 'Failed to load stream' }: ErrorDisplayProps) {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-lg border border-destructive/50 bg-destructive/10"
      role="alert"
    >
      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-destructive">Stream Error</p>
        <p className="text-xs text-muted-foreground mt-1">{message}</p>
      </div>
    </div>
  );
}
