# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with the web-based Icecast audio player project using the Claude Sub-Agent Spec Workflow System.

## Project Overview
**Basic Web-Based Icecast Audio Player** - A lightweight, responsive, and embeddable audio player that streams live audio via Icecast. Built with modern web standards, this player provides a simple yet powerful solution for radio stations and web admins to deliver high-quality streaming audio with metadata display, playback controls, and cross-browser compatibility.

**Target Audience:**
- Radio stations using Icecast for streaming
- Web admins seeking to embed live streams on their websites
- Listeners who access streams via web browsers
- Developers integrating audio streaming into web applications

## Critical Project Requirements (NON-NEGOTIABLE)

### ✅ Audio Streaming & Playback Requirements
- **Icecast Compatibility**: Support for standard Icecast streaming endpoints
- **Audio Codecs**: MP3 (mandatory), AAC/AAC+ (nice-to-have)
- **Playback Controls**: Play/Pause toggle, Volume control, Mute/Unmute
- **Metadata Display**: Show current track info (Artist, Title) when available
- **Connection Handling**: Graceful error handling, stream offline detection
- **Auto-Reconnect**: Implement reconnection logic on stream interruption
- **Buffer Management**: Stream buffering within 2-3 seconds

### ✅ Production-Grade Quality Standards
- **Zero Build Errors**: Must pass `npm run build` without warnings/errors
- **TypeScript Strict**: All code must pass strict TypeScript compilation
- **ESLint/Prettier**: Code formatting and linting compliance
- **Test Coverage**: Minimum 80% test coverage requirement
- **Error Handling**: Comprehensive error boundaries and stream error handling
- **Loading States**: Proper loading and buffering states for audio playback
- **Accessibility**: WCAG 2.1 AA compliance with screen reader support
- **Security**: HTTPS streaming support, XSS protection, secure headers
- **Performance**: <1 second initial load, <500 KB total package size

### ✅ UI/UX Requirements
- **Dark Mode Default**: Dark theme as primary with light mode toggle option
- **Responsive Design**: Mobile-first approach (iOS Safari, Android Chrome, desktop browsers)
- **Browser Support**: Chrome, Firefox, Safari, Edge, modern mobile browsers (90%+ compatibility)
- **Touch Targets**: Minimum 44px touch targets for mobile
- **Keyboard Navigation**: Full keyboard navigable controls
- **ARIA Support**: Screen reader compatible with proper ARIA labels
- **Minimal Design**: Clean, modern UI with optional basic branding
- **Embedding Support**: iframe and JavaScript snippet embedding

### ✅ SEO & Technical SEO Requirements
- **Meta Tags**: Complete Open Graph, Twitter Cards, and standard meta tags
- **Sitemap**: Dynamic XML sitemap generation
- **robots.txt**: Proper search engine directives
- **Core Web Vitals**: Optimize for LCP, FID, CLS metrics
- **Schema Markup**: MusicEvent, BroadcastEvent, RadioStation schemas
- **Canonical URLs**: Prevent duplicate content issues
- **Semantic HTML**: Proper heading hierarchy (h1-h6)
- **Performance**: <2s load time, 90+ Lighthouse score

## Project Documentation Conventions (Critical)
Documentation Files: All new documentation or task files must be saved under the docs/ folder in this repository.

**Directory Structure:**
- Tasks & TODOs: Save in `docs/{YYYY_MM_DD}/tasks/` (e.g., `docs/2025_11_18/tasks/ImplementationTodo.md`)
- Requirements/Specs: Save in `docs/{YYYY_MM_DD}/specs/` (e.g., `docs/2025_11_18/specs/AudioPlayerRequirements.md`)
- Design Docs: Save in `docs/{YYYY_MM_DD}/design/` (e.g., `docs/2025_11_18/design/PlayerUISystem.md`)
- Code Files: Follow the established project structure in `src/`
- Tests: Mirror code structure under `tests/` directory

**⚠️ Important**: When creating a new file, ensure the directory exists or create it. Never default to the root directory for documentation files.

## Technical Architecture Requirements

### Core Technology Stack (MANDATORY)
```json
{
  "frontend": {
    "framework": "Next.js 15+ (App Router)",
    "runtime": "React 19+ with TypeScript 5+",
    "styling": "Tailwind CSS with custom dark theme",
    "components": "Shadcn/ui + Radix UI primitives",
    "audio": "HTML5 Audio API with custom controls",
    "icons": "Lucide React",
    "state": "React built-in state management"
  },
  "audio_streaming": {
    "protocol": "Icecast HTTP/HTTPS streaming",
    "codecs": ["MP3 (mandatory)", "AAC/AAC+ (optional)"],
    "metadata": "ICY metadata parsing / JSON service",
    "buffer_management": "HTML5 Audio buffering",
    "reconnection": "Custom retry logic with exponential backoff"
  },
  "seo": {
    "framework": "Next.js built-in SEO features",
    "structured_data": "JSON-LD (MusicEvent, BroadcastEvent, RadioStation)",
    "sitemap": "Dynamic XML generation",
    "meta": "next-seo package for comprehensive meta tags"
  },
  "embedding": {
    "methods": ["iframe embed", "JavaScript snippet"],
    "customization": "URL parameters and CSS variables",
    "integration": "Self-hosted or CDN delivery"
  },
  "production": {
    "deployment": "Vercel / Netlify / PM2 + nginx",
    "monitoring": "Real-time stream monitoring",
    "logging": "Error tracking and stream analytics",
    "ssl": "Let's Encrypt or CloudFlare SSL"
  }
}
```

### Required Directory Structure
```
src/
├── app/                          # Next.js App Router
│   ├── player/                   # Audio player pages
│   │   ├── page.tsx             # Main player page
│   │   ├── embed/               # Embeddable player
│   │   └── demo/                # Demo page with examples
│   ├── api/                     # API routes
│   │   ├── stream/              # Stream proxy endpoints
│   │   ├── metadata/            # Metadata fetching
│   │   └── health/              # Stream health check
│   ├── sitemap.xml/             # Dynamic sitemap
│   ├── robots.txt/              # SEO directives
│   ├── globals.css              # Global styles + dark theme
│   ├── layout.tsx               # Root layout with SEO
│   └── page.tsx                 # Landing page
├── components/                   # React components
│   ├── player/                  # Audio player components
│   │   ├── AudioPlayer.tsx     # Main player component
│   │   ├── PlayButton.tsx      # Play/Pause control
│   │   ├── VolumeControl.tsx   # Volume slider
│   │   ├── MetadataDisplay.tsx # Track info display
│   │   ├── StreamIndicator.tsx # Live/buffering indicator
│   │   └── ErrorDisplay.tsx    # Error states
│   ├── embed/                   # Embed utilities
│   │   ├── EmbedCode.tsx       # Embed code generator
│   │   └── IframePlayer.tsx    # iframe wrapper
│   ├── seo/                     # SEO components
│   │   ├── StructuredData.tsx  # JSON-LD schemas
│   │   └── MetaTags.tsx        # Meta tag manager
│   └── ui/                      # Shadcn/ui components
├── lib/                         # Services and utilities
│   ├── audio/                   # Audio utilities
│   │   ├── stream-manager.ts   # Stream connection handling
│   │   ├── metadata-parser.ts  # ICY metadata parsing
│   │   ├── reconnection.ts     # Auto-reconnect logic
│   │   └── buffer-manager.ts   # Buffer monitoring
│   ├── seo/                     # SEO utilities
│   │   ├── schemas.ts          # Structured data schemas
│   │   └── meta-generator.ts   # Meta tag generation
│   └── utils.ts                 # General utilities
├── hooks/                       # Custom React hooks
│   ├── useAudioPlayer.ts       # Audio player state
│   ├── useStreamMetadata.ts    # Metadata fetching
│   └── useStreamHealth.ts      # Connection monitoring
└── types/                       # TypeScript definitions
    ├── audio.ts                 # Audio player types
    ├── stream.ts                # Stream types
    ├── metadata.ts              # Metadata types
    └── seo.ts                   # SEO schema types
```

## Product Requirements (from audioplayer.md PRD)

### Functional Requirements

#### 1.1 Audio Streaming Support
- Support live audio streaming via Icecast URL
- Supported codecs: MP3 (mandatory), AAC/AAC+ (nice-to-have)

#### 1.2 Playback Controls
- Play / Pause toggle button
- Volume control (slider)
- Mute / Unmute toggle
- Autoplay option (with browser restriction handling)

#### 1.3 Metadata Display
- Display current track information (Artist, Title) if available
- Fallback message if metadata unavailable ("Live Stream")

#### 1.4 UI / Embedding
- Responsive design (mobile-friendly)
- Embeddable via iframe or JavaScript snippet
- Minimal and clean UI design
- Basic branding capability (optional)

#### 1.5 Browser Support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Android Chrome)

#### 1.6 Connection Handling
- Graceful stream error handling
- Auto-reconnect on disconnection
- Stream offline detection

#### 1.7 Accessibility
- ARIA support for screen readers
- Keyboard navigable controls

### Non-Functional Requirements

#### 2.1 Performance
- Player loads in <1 second
- Stream buffers within 2-3 seconds
- Total package size <500 KB

#### 2.2 Security
- HTTPS-capable streaming
- Fallback for HTTP streams with warnings
- XSS protection

#### 2.3 Hosting
- Self-hosted or CDN delivery
- Lightweight footprint

## User Stories

1. **As a visitor**, I want to click play and listen to the radio station audio
2. **As an admin**, I want to embed the audio player on my site easily
3. **As a listener**, I want to see what's currently playing if metadata is available
4. **As a developer**, I want to customize some aspects of the player via URL or configuration
5. **As a mobile user**, I want the player to work seamlessly on my phone
6. **As a station owner**, I want to know if my stream is online and functioning

## Acceptance Criteria

- ✅ Player loads with supplied Icecast stream URL
- ✅ User can play/pause stream
- ✅ Volume can be adjusted or muted
- ✅ Metadata is visible (if available)
- ✅ Responsive across desktop and mobile
- ✅ Works on 90%+ of modern user browsers
- ✅ Stream errors are handled gracefully
- ✅ Embed code is easily generated and implemented
- ✅ Accessibility requirements are met
- ✅ Performance targets are achieved

## Agent Workflow System

### Multi-Phase Development Process

#### Phase 1: Planning & Analysis (25% of project time)
1. **spec-analyst**: Requirements analysis with audio streaming considerations
2. **spec-architect**: System architecture for audio player and streaming infrastructure
3. **spec-planner**: Task breakdown with quality checkpoints
4. **Quality Gate 1**: 95% compliance threshold

#### Phase 2: Development & Implementation (65% of project time)
1. **spec-developer**: Implementation of audio player components
2. **senior-frontend-architect**: React architecture and state management
3. **WebAccessibilityAgent**: ARIA and keyboard navigation implementation
4. **spec-tester**: Comprehensive test suite for audio functionality
5. **Quality Gate 2**: 80% compliance threshold (includes build verification)

#### Phase 3: Validation & Production Readiness (15% of project time)
1. **spec-reviewer**: Code review and best practices validation
2. **performance-expert**: Performance optimization and Core Web Vitals
3. **cwv-optimizer**: LCP, INP, CLS optimization
4. **technical-seo-auditor**: SEO validation
5. **spec-validator**: Final production readiness assessment
6. **Quality Gate 3**: 85% compliance threshold

### Specialized Agents (Required for This Project)

#### Core Workflow Agents
- **spec-orchestrator**: Workflow coordination and quality gate management
- **spec-analyst**: Requirements analysis with audio streaming and accessibility
- **spec-architect**: System architecture for audio player and embedding
- **spec-developer**: Implementation of audio components
- **spec-tester**: Testing expert with audio playback coverage
- **spec-validator**: Final validation and deployment readiness

#### Domain Specialists
- **nextjs-expert**: Next.js best practices and App Router optimization
- **tailwind-expert**: Dark mode theming and responsive design
- **ui-ux-master**: Accessibility and user experience optimization
- **WebAccessibilityAgent**: WCAG 2.1 AA compliance validation
- **senior-frontend-architect**: Frontend architecture and React patterns

#### SEO & Performance Agents
- **cwv-optimizer**: Core Web Vitals optimization
- **technical-seo-auditor**: Technical SEO auditing
- **schema-optimizer**: Structured data for audio/radio content
- **performance-expert**: Lighthouse optimization

#### Code Quality Agents
- **spec-reviewer**: Code review and best practices
- **code-refactorer-agent**: Code quality improvement

## Common Development Commands

### Workflow Execution
```bash
# Execute complete development workflow
/agent-workflow "Create an Icecast audio player with metadata display, playback controls, and embed support"

# Start workflow with orchestrator
Use spec-orchestrator: Create a web-based Icecast audio player with full accessibility and embedding capabilities

# Phase-specific execution
Use spec-analyst: Analyze audio player requirements including streaming, metadata, and accessibility
Use spec-architect: Design audio player architecture with stream management and embedding
Use spec-developer: Implement audio player with all specifications
```

### Quality Validation Commands
```bash
# Performance optimization
Use cwv-optimizer: Optimize Core Web Vitals for audio player
Use performance-expert: Optimize load time and bundle size

# Accessibility audit
Use WebAccessibilityAgent: Ensure WCAG 2.1 AA compliance

# SEO validation
Use technical-seo-auditor: Audit technical SEO implementation
Use schema-optimizer: Implement radio/music structured data

# Code quality
Use spec-reviewer: Review audio player code for best practices
```

### Build and Testing Commands
```bash
# Verify production build
npm run build && npm run start

# Test all quality gates
npm run lint && npm run type-check && npm run test

# Performance audit
npm run lighthouse

# Audio player testing
npm run test:player
```

## Required Package Configuration

### package.json Scripts (Mandatory)
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:player": "jest --testPathPattern=player",
    "test:e2e": "playwright test",
    "lighthouse": "lighthouse http://localhost:3000 --output json --output html",
    "bundle-analyze": "ANALYZE=true npm run build"
  }
}
```

### Required Dependencies
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "shadcn/ui": "latest",
    "@radix-ui/react-slider": "latest",
    "@radix-ui/react-tooltip": "latest",
    "lucide-react": "^0.263.1",
    "next-seo": "^6.4.0",
    "framer-motion": "^10.16.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "@playwright/test": "^1.40.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "lighthouse": "^11.0.0",
    "@next/bundle-analyzer": "^15.0.0"
  }
}
```

## Audio Player Implementation Requirements

### Stream Configuration
```typescript
// Example Icecast stream configuration
export interface StreamConfig {
  url: string;              // http://yourserver.com:8000/stream
  codec: 'mp3' | 'aac';    // Audio codec
  name: string;             // Station name
  description?: string;     // Station description
  artwork?: string;         // Station logo/artwork URL
  metadataUrl?: string;     // Optional JSON metadata endpoint
}
```

### Metadata Display
```typescript
// Metadata interface
export interface StreamMetadata {
  artist?: string;
  title?: string;
  album?: string;
  artwork?: string;
  timestamp?: number;
}
```

### Embed Code Examples
```html
<!-- iframe embed -->
<iframe
  src="https://yourplayer.com/embed?stream=STREAM_URL"
  width="100%"
  height="200"
  frameborder="0"
></iframe>

<!-- JavaScript embed -->
<div id="audio-player"></div>
<script src="https://yourplayer.com/embed.js"></script>
<script>
  AudioPlayer.init({
    container: '#audio-player',
    stream: 'http://yourserver.com:8000/stream',
    theme: 'dark'
  });
</script>
```

## SEO Implementation for Audio Player

### Structured Data (JSON-LD)
```typescript
// Required schemas for audio player pages
export const audioPlayerSchemas = {
  radioStation: 'RadioStation',
  broadcastEvent: 'BroadcastEvent',
  musicEvent: 'MusicEvent',
  webPage: 'WebPage',
  organization: 'Organization'
};
```

### Meta Tags Template
```typescript
export const audioPlayerSEO = {
  titleTemplate: '%s | Live Radio Stream',
  defaultTitle: 'Web-Based Audio Player - Live Radio Streaming',
  description: 'Listen to live radio streaming powered by Icecast. High-quality audio player with metadata display, playback controls, and cross-browser compatibility.',
  openGraph: {
    type: 'music.radio_station',
    locale: 'en_US',
    url: 'https://yourplayer.com',
    siteName: 'Audio Player',
    images: [
      {
        url: '/og-player.jpg',
        width: 1200,
        height: 630,
        alt: 'Audio Player'
      }
    ]
  },
  twitter: {
    cardType: 'player',
    site: '@yourstation'
  }
};
```

## Quality Gate Requirements

### Quality Gate 1: Planning (95% threshold)
- ✅ Complete audio player requirements with streaming specifications
- ✅ System architecture includes stream management and metadata
- ✅ Embedding strategy defined (iframe + JavaScript)
- ✅ SEO strategy for audio content
- ✅ Accessibility requirements for media player
- ✅ Performance targets (<1s load, <500KB bundle)

### Quality Gate 2: Development (80% threshold)
- ✅ TypeScript compilation passes without errors
- ✅ ESLint and Prettier compliance
- ✅ Audio playback functionality working
- ✅ Metadata display implemented
- ✅ Volume controls and mute functional
- ✅ Error handling for stream issues
- ✅ Dark mode theme complete
- ✅ Responsive design across devices
- ✅ SEO meta tags and structured data
- ✅ Basic test coverage >60%

### Quality Gate 3: Production (85% threshold)
- ✅ Production build succeeds without warnings
- ✅ All tests pass (unit, integration, e2e)
- ✅ Lighthouse score >90 (Performance, SEO, Accessibility)
- ✅ Bundle size <500KB
- ✅ Stream connection handling robust
- ✅ ARIA and keyboard navigation complete
- ✅ Cross-browser testing passed (90%+ compatibility)
- ✅ Embed code tested and documented

## Project Timeline

### Phase 1: MVP Version (Week 1)
- ✅ Basic audio player with Play/Pause
- ✅ Icecast streaming support (MP3)
- ✅ Manual URL configuration
- ✅ Basic responsive design
- ✅ Dark mode UI

### Phase 2: Enhancements (Week 2)
- ✅ Metadata display from stream
- ✅ Volume controls
- ✅ Error handling and fallback messages
- ✅ Embed code generator
- ✅ Accessibility features

### Phase 3: Advanced Features (Future)
- ✅ Theme customization
- ✅ Playlist or schedule integration
- ✅ Advanced analytics/logging
- ✅ Multi-channel support
- ✅ HLS/Shoutcast support

## Testing Requirements

### Audio Player Testing Checklist
- [ ] Play/Pause functionality works correctly
- [ ] Volume control adjusts audio level
- [ ] Mute/unmute toggles properly
- [ ] Metadata displays when available
- [ ] Fallback message shows when no metadata
- [ ] Stream errors are caught and displayed
- [ ] Reconnection logic works on disconnection
- [ ] Loading states display during buffering
- [ ] Responsive design on mobile devices
- [ ] Keyboard navigation functional
- [ ] Screen reader announces player state
- [ ] Cross-browser compatibility verified
- [ ] Embed iframe works correctly
- [ ] JavaScript embed initializes properly

## Troubleshooting & Support

### Common Issues and Solutions
1. **Autoplay Blocked**: Modern browsers block autoplay - require user interaction
2. **CORS Issues**: Ensure Icecast server has proper CORS headers
3. **HTTPS Mixed Content**: HTTP streams won't work on HTTPS sites
4. **Metadata Not Showing**: Verify Icecast metadata is enabled
5. **Mobile Playback Issues**: iOS requires user interaction to play
6. **Stream Buffering**: Check network conditions and buffer settings

### Debug Commands
```bash
# Check stream connectivity
curl -I http://yourserver.com:8000/stream

# Test metadata endpoint
curl http://yourserver.com:8000/status-json.xsl

# Bundle size analysis
npm run bundle-analyze

# Lighthouse audit
npm run lighthouse
```

## Open Questions
1. Will player be used across multiple stations? (multi-channel support)
2. Is SEO important for player embed page? **YES - implement full SEO**
3. Will we allow customization via CSS/themes? **YES - CSS variables**
4. Future support for Shoutcast or HLS streams? **Phase 3**

## Notes
- Autoplay blocked by browsers - require user interaction
- Consider MediaSession API for media keys and notifications
- Progressive Web App (PWA) capabilities for installable player
- Consider background playback on mobile devices

---

This CLAUDE.md file ensures the audio player project meets production-ready standards with comprehensive streaming capabilities, accessibility, SEO optimization, and cross-browser compatibility.
