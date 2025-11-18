Product Requirements Document (PRD)

Title: Basic Web-Based Icecast Audio Player

Author: [Your Name]
Date: [Insert Date]
Version: 1.0
Status: Draft

Overview:

This document outlines the product requirements for a basic web-based audio player that streams audio via Icecast. The player will support core functionalities such as playback, basic UI controls, metadata display (if available), and browser compatibility. The purpose is to provide a lightweight, embeddable audio player for streaming online radio or music via Icecast.

Objective:

To deliver a simple, responsive, and reliable web audio player capable of playing audio streams from an Icecast server.

Target Audience:

Radio stations using Icecast for streaming
Web admins seeking to embed a live stream on their websites
Listeners who access streams via web browsers
Functional Requirements:
1.1 Audio Streaming Support:

The audio player must support live audio streaming via an Icecast URL.
Supported streaming codecs: MP3 (mandatory), AAC/AAC+ (nice-to-have)
1.2 Playback Controls:

Play / Pause toggle button
Volume control (slider or +/- buttons)
Mute / Unmute toggle
Autoplay option (optional due to browser restrictions)
1.3 Metadata Display:

If the Icecast stream sends metadata, display current track information (Artist, Title).
Fallback message if metadata is unavailable (“Live Stream” or similar).
1.4 UI / Embedding:

Player should be responsive (mobile-friendly)
Embeddable via iframe or JavaScript snippet
Minimal and clean UI design (basic branding capability optional)
1.5 Browser Support:

Must work on modern browsers:
Chrome
Firefox
Safari
Edge
Mobile browsers (iOS Safari, Android Chrome)
1.6 Connection Handling:

Graceful handling of stream errors (e.g., stream not found, offline)
Auto-reconnect on disconnection (optional/nice-to-have)
1.7 Accessibility:

Basic ARIA support for screen readers
Keyboard navigable controls
Non-Functional Requirements:
2.1 Performance:

Player should load quickly (<1 second initial load)
Stream should buffer and begin playback within 2–3 seconds if available
2.2 Security:

All streaming should be done over HTTPS-capable URLs (if the site is HTTPS)
Create fallback logic or browser warnings for insecure (HTTP) streams
2.3 Hosting:

The player assets should be self-hosted or available via CDN
Lightweight footprint (<500 KB total package size)
Technical Requirements:
3.1 Frontend Stack:

HTML5 <audio> element for playback
JavaScript (Vanilla JS or small framework like Vue/React – optional)
CSS3 for styling / mobile responsiveness
3.2 Icecast Compatibility:

Player must read from standard Icecast streaming endpoints
Metadata retrieval may use ICY metadata (within audio stream) or JSON service (where available)
3.3 Embedding Implementation:

Provide JavaScript or iframe embed code example:
Example:
User Stories:
4.1 As a visitor, I want to click play and listen to the radio station audio.
4.2 As an admin, I want to embed the audio player on my site easily.
4.3 As a listener, I want to see what’s currently playing if metadata is available.
4.4 As a developer, I want to customize some aspects of the player via URL or configuration.

Acceptance Criteria:
Player loads with supplied Icecast stream URL
User can play/pause stream
Volume can be adjusted or muted
Metadata is visible (if available)
Responsive across desktop and mobile
Works on at least 90% of modern user browsers
Timeline:
Phase 1: MVP Version (1 week)

Implement basic audio player with Play/Pause and specified UI
Support Icecast streaming (MP3)
Manual URL configuration
Basic responsive design
Phase 2: Enhancements (2nd Week)

Metadata display from stream
Volume controls
Error handling and fallback message
Embed code generator
Optional Phase 3: Advanced Features (Future)

Theme customization
Playlist or schedule integration
Advanced analytics/logging
Dependencies:
Icecast stream links (provided by station)
Public or locally hosted metadata endpoint (optional)
CDN or hosting for player assets
Open Questions:
Will player be used across multiple stations? (multi-channel support)
Is SEO important for player embed page?
Will we allow customization via CSS/themes?
Notes:
Autoplay may be blocked by some browsers. Consider user interaction to initiate playback.
Consider future support for Shoutcast or HLS streams based on demand.
Appendix:

Example Icecast Stream URL:

http://yourserver.com:8000/stream
https://radio.example.com/live.mp3
—

End of Document.
