import { AudioPlayer } from '@/components/player/AudioPlayer';
import { StructuredData } from '@/components/seo/StructuredData';
import { createRadioStationSchema, createBroadcastEventSchema } from '@/lib/seo/schemas';
import { Music2, Radio, Waves } from 'lucide-react';
import type { StreamConfig } from '@/types/audio';

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Example stream configuration
  const streamConfig: StreamConfig = {
    url: process.env.NEXT_PUBLIC_DEFAULT_STREAM_URL || 'http://yourserver.com:8000/stream',
    codec: 'mp3',
    name: 'Live Radio Stream',
    description: 'High-quality live audio streaming powered by Icecast',
    artwork: '/og-image.jpg',
  };

  const radioStationSchema = createRadioStationSchema({
    name: streamConfig.name,
    description: streamConfig.description,
    url: siteUrl,
    logo: streamConfig.artwork,
  });

  const broadcastEventSchema = createBroadcastEventSchema({
    name: 'Live Broadcast',
    description: 'Live streaming audio broadcast',
    stationName: streamConfig.name,
  });

  return (
    <>
      <StructuredData data={radioStationSchema} />
      <StructuredData data={broadcastEventSchema} />

      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Radio className="w-16 h-16 md:w-20 md:h-20 text-primary" />
              <Waves className="w-8 h-8 text-primary/60 absolute -right-2 -top-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Icecast Audio Player
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            High-quality live streaming with metadata display and playback controls
          </p>
        </div>

        {/* Audio Player */}
        <div className="max-w-2xl mx-auto mb-16">
          <AudioPlayer stream={streamConfig} showMetadata={true} />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="glass-morphism p-6 rounded-xl text-center">
            <Music2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">High Quality Audio</h3>
            <p className="text-sm text-slate-300">
              Crystal clear audio streaming with support for MP3 and AAC codecs
            </p>
          </div>

          <div className="glass-morphism p-6 rounded-xl text-center">
            <Radio className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Live Metadata</h3>
            <p className="text-sm text-slate-300">
              See what is playing in real-time with automatic metadata updates
            </p>
          </div>

          <div className="glass-morphism p-6 rounded-xl text-center">
            <Waves className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Cross-Browser Support</h3>
            <p className="text-sm text-slate-300">
              Works seamlessly on all modern browsers and mobile devices
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Professional Audio Streaming
          </h2>
          <p className="text-slate-300 mb-6">
            Built with modern web technologies, this audio player provides a seamless listening
            experience with automatic reconnection, buffer management, and full accessibility
            support.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Icecast Compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>WCAG 2.1 AA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>Mobile Optimized</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Icecast Audio Player. Built with Next.js.</p>
        </div>
      </footer>
    </>
  );
}
