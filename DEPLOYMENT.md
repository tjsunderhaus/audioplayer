# Quick Deployment Guide - Coolify

## 🚀 Deploy to Coolify in 5 Minutes

### Prerequisites
- Coolify server: `data.delhipublicradio.net` ✅
- Git repository with this code
- Domain: `player.delhipublicradio.net` (or your preferred subdomain)

---

## Quick Steps

### 1. Push to Git Repository
```bash
git add .
git commit -m "Ready for Coolify deployment"
git push origin main
```

### 2. In Coolify Dashboard (`data.delhipublicradio.net`)
1. **New Resource** → **Application**
2. **Source**: Select your Git repository
3. **Branch**: `main`
4. **Build Pack**: Dockerfile (auto-detected)
5. **Domain**: `player.delhipublicradio.net`
6. Enable **HTTPS/SSL** ✅

### 3. Add Environment Variables
```bash
NEXT_PUBLIC_SITE_URL=https://player.delhipublicradio.net
NEXT_PUBLIC_SITE_NAME=Delhi Public Radio - Audio Player
NEXT_PUBLIC_DEFAULT_STREAM_URL=https://stream.delhipublicradio.net:8000/stream
NEXT_PUBLIC_ENABLE_METADATA=true
NEXT_PUBLIC_ENABLE_EMBED=true
NODE_ENV=production
```

**Important**: Update `NEXT_PUBLIC_DEFAULT_STREAM_URL` with your actual Icecast stream URL!

### 4. Deploy
Click **Deploy** and wait 2-5 minutes.

### 5. Verify
- Health: `https://player.delhipublicradio.net/api/health`
- Player: `https://player.delhipublicradio.net`
- Embed: `https://player.delhipublicradio.net/embed`

---

## What's Included

✅ **Dockerfile** - Multi-stage optimized build
✅ **.dockerignore** - Excludes unnecessary files
✅ **Health Check** - `/api/health` endpoint
✅ **Security Headers** - Configured in `next.config.js`
✅ **Standalone Output** - Optimized for Docker
✅ **Auto-restart** - Container restarts on failure

---

## Files Created for Deployment

```
/root/audioplayer/
├── Dockerfile                              # Multi-stage Docker build
├── .dockerignore                           # Build optimization
├── .env.production.example                 # Environment template
├── next.config.js                          # Updated with standalone output
├── src/app/api/health/route.ts            # Health check endpoint
└── docs/2025_11_20/deployment/
    └── COOLIFY_DEPLOYMENT.md              # Full deployment guide
```

---

## Test Locally First (Optional)

```bash
# Build Docker image
docker build -t audioplayer:test .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_DEFAULT_STREAM_URL=http://your-stream:8000/stream \
  audioplayer:test

# Test in browser
open http://localhost:3000
```

---

## Troubleshooting

### Build Fails
- Check Coolify build logs
- Verify all dependencies in `package.json`
- Test locally: `npm run build`

### Player Not Loading
- Check environment variables in Coolify
- Verify domain DNS points to Coolify server
- Check SSL certificate status

### Audio Not Playing
- Verify stream URL is correct and accessible
- Check CORS headers on Icecast server
- Test stream URL directly in browser

---

## Full Documentation

📚 **Complete Guide**: `docs/2025_11_20/deployment/COOLIFY_DEPLOYMENT.md`

Includes:
- Detailed step-by-step instructions
- Troubleshooting guide
- Monitoring setup
- Security checklist
- Scaling considerations
- Rollback procedures

---

## Quick Commands

```bash
# Check build locally
npm run build

# Type check
npm run type-check

# Run development server
npm run dev

# View git status
git status

# Commit changes
git add . && git commit -m "Update" && git push
```

---

## Need Help?

1. Check health endpoint: `/api/health`
2. Review Coolify application logs
3. See full deployment guide: `docs/2025_11_20/deployment/COOLIFY_DEPLOYMENT.md`

---

**Ready to Deploy!** 🎵📻

Updated: 2025-11-20
Server: data.delhipublicradio.net
