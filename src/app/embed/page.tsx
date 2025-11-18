'use client';

import { useState } from 'react';
import { AudioPlayer } from '@/components/player/AudioPlayer';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { StreamConfig } from '@/types/audio';

export default function EmbedPage() {
  const [streamUrl, setStreamUrl] = useState('http://yourserver.com:8000/stream');
  const [copied, setCopied] = useState(false);

  const streamConfig: StreamConfig = {
    url: streamUrl,
    codec: 'mp3',
    name: 'Embedded Stream',
    description: 'Embeddable audio player',
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const embedUrl = `${siteUrl}/embed?stream=${encodeURIComponent(streamUrl)}`;

  const iframeCode = `<iframe
  src="${embedUrl}"
  width="100%"
  height="200"
  frameborder="0"
  allow="autoplay"
  title="Audio Player"
></iframe>`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Embed Audio Player</h1>
      <p className="text-slate-300 mb-8">
        Easily embed the audio player on your website with a simple iframe
      </p>

      {/* Stream URL Input */}
      <div className="glass-morphism p-6 rounded-xl mb-8">
        <label htmlFor="stream-url" className="block text-sm font-medium text-white mb-2">
          Stream URL
        </label>
        <input
          id="stream-url"
          type="text"
          value={streamUrl}
          onChange={(e) => setStreamUrl(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="http://yourserver.com:8000/stream"
        />
      </div>

      {/* Preview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Preview</h2>
        <AudioPlayer stream={streamConfig} showMetadata={true} />
      </div>

      {/* Embed Code */}
      <div className="glass-morphism p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Embed Code</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm text-slate-300 border border-slate-700">
          <code>{iframeCode}</code>
        </pre>
      </div>

      {/* Instructions */}
      <div className="mt-8 glass-morphism p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-3">How to Use</h3>
        <ol className="space-y-2 text-slate-300 text-sm list-decimal list-inside">
          <li>Enter your Icecast stream URL in the input field above</li>
          <li>Preview how the player will look and function</li>
          <li>Copy the embed code using the Copy button</li>
          <li>Paste the code into your website's HTML where you want the player to appear</li>
          <li>The player will automatically load and be ready to use</li>
        </ol>
      </div>
    </main>
  );
}
