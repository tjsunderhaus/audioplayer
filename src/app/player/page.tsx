'use client';

import { useState } from 'react';
import { AudioPlayer } from '@/components/player/AudioPlayer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import type { StreamConfig } from '@/types/audio';

export default function PlayerPage() {
  const [streamUrl, setStreamUrl] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_STREAM_URL || 'http://yourserver.com:8000/stream'
  );
  const [inputUrl, setInputUrl] = useState(streamUrl);
  const [showSettings, setShowSettings] = useState(false);

  const streamConfig: StreamConfig = {
    url: streamUrl,
    codec: 'mp3',
    name: 'Custom Stream',
    description: 'Your custom audio stream',
  };

  const handleUpdateStream = () => {
    if (inputUrl.trim()) {
      setStreamUrl(inputUrl.trim());
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Audio Player</h1>
        <p className="text-slate-300">Stream your favorite Icecast radio station</p>
      </div>

      {/* Audio Player */}
      <div className="mb-8">
        <AudioPlayer stream={streamConfig} showMetadata={true} />
      </div>

      {/* Settings Toggle */}
      <div className="text-center mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 mx-auto"
        >
          <Settings className="w-4 h-4" />
          {showSettings ? 'Hide' : 'Show'} Settings
        </Button>
      </div>

      {/* Stream Settings */}
      {showSettings && (
        <div className="glass-morphism p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-4">Stream Settings</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="stream-url-input" className="block text-sm font-medium text-white mb-2">
                Stream URL
              </label>
              <div className="flex gap-2">
                <Input
                  id="stream-url-input"
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="http://yourserver.com:8000/stream"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateStream();
                    }
                  }}
                />
                <Button onClick={handleUpdateStream}>Update</Button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Enter your Icecast stream URL and click Update to change the stream
              </p>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <h3 className="text-sm font-semibold text-white mb-2">Current Stream</h3>
              <p className="text-sm text-slate-300 break-all">{streamUrl}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
