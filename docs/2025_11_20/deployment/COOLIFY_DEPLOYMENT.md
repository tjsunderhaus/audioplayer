# Coolify Deployment Guide
## Delhi Public Radio - Audio Player

This guide will walk you through deploying the Icecast Audio Player to your Coolify server at `data.delhipublicradio.net`.

---

## Prerequisites

- ✅ Coolify instance running at `data.delhipublicradio.net`
- ✅ Git repository access (GitHub, GitLab, or Gitea)
- ✅ Domain/subdomain for the audio player (e.g., `player.delhipublicradio.net`)
- ✅ Icecast stream URL ready

---

## Step 1: Prepare Your Git Repository

### Option A: Push to GitHub/GitLab
```bash
# If you haven't already initialized git
cd /root/audioplayer
git add .
git commit -m "Prepare for Coolify deployment"

# Add your remote repository
git remote add origin https://github.com/yourusername/audioplayer.git
git push -u origin main
```

### Option B: Use Local Repository
Coolify can also deploy from a local git repository or Docker registry.

---

## Step 2: Access Your Coolify Dashboard

1. Navigate to `https://data.delhipublicradio.net`
2. Log in with your Coolify credentials
3. Go to **Projects** or **Applications**

---

## Step 3: Create New Application

### 3.1 Click "New Resource" or "+ Add Application"

### 3.2 Select Source Type
- Choose **Git Repository** (recommended)
- Or **Docker Image** if you prefer to build locally and push to a registry

### 3.3 Configure Git Repository
If using Git:
- **Repository URL**: `https://github.com/yourusername/audioplayer.git`
- **Branch**: `main` (or your preferred branch)
- **Build Pack**: Select **Dockerfile** (Coolify will auto-detect the Dockerfile)

---

## Step 4: Configure Application Settings

### 4.1 Basic Settings
- **Application Name**: `delhi-public-radio-player`
- **Port**: `3000` (automatically exposed from Dockerfile)
- **Build Directory**: `.` (root of repository)

### 4.2 Domain Configuration
- **Add Domain**: `player.delhipublicradio.net`
- Enable **HTTPS/SSL** (Coolify handles Let's Encrypt automatically)
- Optional: Enable **WWW redirect** if needed

### 4.3 Environment Variables
Click on **Environment Variables** and add the following:

```bash
# Required Variables
NEXT_PUBLIC_SITE_URL=https://player.delhipublicradio.net
NEXT_PUBLIC_SITE_NAME=Delhi Public Radio - Audio Player
NEXT_PUBLIC_DEFAULT_STREAM_URL=https://stream.delhipublicradio.net:8000/stream

# Optional Variables
NEXT_PUBLIC_ENABLE_METADATA=true
NEXT_PUBLIC_ENABLE_EMBED=true
NODE_ENV=production
```

**Important Notes:**
- Replace `NEXT_PUBLIC_DEFAULT_STREAM_URL` with your actual Icecast stream URL
- If using HTTP streams (not HTTPS), ensure your domain also uses HTTP or configure mixed content properly

---

## Step 5: Configure Build Settings

### 5.1 Docker Build Configuration
Coolify will automatically detect the `Dockerfile` in your repository.

**Build Arguments** (if needed):
- None required for this application

**Build Context**: `.` (root directory)

### 5.2 Resource Limits (Recommended)
- **CPU Limit**: 1.0 (adjust based on traffic)
- **Memory Limit**: 512MB (Next.js typically needs 256-512MB)
- **Restart Policy**: `always`

---

## Step 6: Deploy the Application

1. Click **Deploy** or **Save & Deploy**
2. Coolify will:
   - Clone your repository
   - Build the Docker image using the multi-stage Dockerfile
   - Create and start the container
   - Configure SSL certificate (if HTTPS enabled)
   - Set up health checks

### Monitor Deployment
- Watch the **Build Logs** in real-time
- Deployment typically takes 2-5 minutes
- Look for "✓ Ready" or "Application started successfully"

---

## Step 7: Verify Deployment

### 7.1 Health Check
Visit: `https://player.delhipublicradio.net/api/health`

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-20T...",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

### 7.2 Test the Player
1. Visit: `https://player.delhipublicradio.net`
2. Click the **Play** button
3. Verify audio playback starts
4. Check metadata display (if available from stream)
5. Test volume controls and mute functionality

### 7.3 Test Embed Functionality
Visit: `https://player.delhipublicradio.net/embed`

---

## Step 8: Configure DNS (if not done)

If you haven't pointed your domain to Coolify yet:

### DNS Configuration
Add an **A Record** or **CNAME**:
- **Type**: `A` or `CNAME`
- **Name**: `player` (for player.delhipublicradio.net)
- **Value**: Your Coolify server IP or `data.delhipublicradio.net`
- **TTL**: 300 (or default)

Wait for DNS propagation (usually 5-30 minutes).

---

## Step 9: Set Up Monitoring (Optional but Recommended)

### 9.1 Coolify Built-in Monitoring
Coolify provides:
- Container health status
- CPU/Memory usage graphs
- Application logs
- Automatic restarts on failure

### 9.2 Custom Monitoring
Add health check monitoring:
- **Health Check URL**: `/api/health`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3

---

## Troubleshooting

### Build Fails
**Check build logs for errors:**
1. Navigate to application in Coolify
2. Click **Deployments** → Latest deployment → **Logs**
3. Common issues:
   - Missing dependencies: Run `npm install` locally and commit package-lock.json
   - TypeScript errors: Run `npm run type-check` locally
   - Build timeout: Increase build timeout in Coolify settings

### Application Won't Start
**Check container logs:**
```bash
# In Coolify's application logs tab
# Look for error messages during startup
```

Common issues:
- Port conflict: Ensure port 3000 is not in use
- Environment variables: Verify all required vars are set
- Memory issues: Increase memory limit

### HTTPS/SSL Issues
- Ensure domain DNS is pointing to Coolify server
- Check SSL certificate status in Coolify
- Verify port 443 is open on firewall

### Audio Stream Not Playing
1. **Check stream URL**: Verify Icecast URL is correct and accessible
2. **CORS Issues**: Ensure Icecast server has CORS headers enabled
3. **HTTP/HTTPS Mix**: If stream is HTTP and site is HTTPS, browsers may block
4. **Firewall**: Ensure Icecast port (usually 8000) is accessible

### Metadata Not Showing
- Verify Icecast has metadata enabled in config
- Check stream URL includes metadata endpoint
- Ensure `NEXT_PUBLIC_ENABLE_METADATA=true`

---

## Updating the Application

### Method 1: Git Push (Recommended)
```bash
# Make changes to code
git add .
git commit -m "Update audio player"
git push origin main

# In Coolify dashboard:
# 1. Go to your application
# 2. Click "Redeploy" or enable "Auto Deploy on Push"
```

### Method 2: Manual Redeploy
1. Go to application in Coolify
2. Click **Redeploy**
3. Coolify will pull latest code and rebuild

### Method 3: Automatic Deployment (Webhook)
Enable **Auto Deploy** in Coolify:
1. Go to application settings
2. Enable **Auto Deploy on Git Push**
3. Add webhook URL to your Git repository

---

## Rollback Procedure

If deployment fails or has issues:

1. Go to **Deployments** in Coolify
2. Find the last working deployment
3. Click **Rollback** or **Redeploy this version**

---

## Performance Optimization

### Enable Caching
Already configured in `next.config.js`:
- Image optimization enabled
- Compression enabled
- Static file caching

### CDN (Optional)
For better global performance:
- Add Cloudflare in front of Coolify
- Configure caching rules for static assets

### Database Caching (Future)
If you add database features later:
- Use Redis for session caching
- Enable Supabase connection pooling

---

## Security Checklist

- ✅ HTTPS enabled via Let's Encrypt
- ✅ Security headers configured in `next.config.js`
- ✅ Non-root user in Docker container
- ✅ Health checks enabled
- ✅ Environment variables secured in Coolify
- ✅ No sensitive data in git repository
- ✅ CORS properly configured for stream

---

## Backup Strategy

### Application Code
- Git repository serves as backup
- Regular commits and pushes recommended

### Environment Variables
- Export from Coolify dashboard
- Store securely (password manager, vault)

### Container Volumes (if any)
- Coolify handles automatic backups
- Check backup settings in application config

---

## Scaling Considerations

### Current Setup
- Single container deployment
- Suitable for up to 1,000 concurrent listeners

### Future Scaling (if needed)
1. **Horizontal Scaling**: Add more container instances
2. **Load Balancer**: Coolify can handle load balancing
3. **CDN**: Offload static assets to CDN
4. **Stream CDN**: Consider stream CDN for audio delivery

---

## Support and Resources

### Coolify Documentation
- https://coolify.io/docs

### Application Health
- Health endpoint: `/api/health`
- Logs: Coolify dashboard → Application → Logs

### Issues or Questions
- Check application logs in Coolify
- Review Docker container status
- Test locally with `docker build` and `docker run`

---

## Quick Reference Commands

### Local Docker Testing
```bash
# Build Docker image locally
docker build -t audioplayer:test .

# Run container locally
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -e NEXT_PUBLIC_DEFAULT_STREAM_URL=your_stream_url \
  audioplayer:test

# Test health check
curl http://localhost:3000/api/health
```

### Git Commands
```bash
# Commit and push changes
git add .
git commit -m "Your changes"
git push origin main

# Check git status
git status

# View git log
git log --oneline -10
```

---

## Next Steps After Deployment

1. ✅ Test all player functionality
2. ✅ Configure analytics (Google Analytics if needed)
3. ✅ Set up monitoring alerts in Coolify
4. ✅ Add custom branding/styling if desired
5. ✅ Create embed documentation for your team
6. ✅ Test on multiple browsers and devices
7. ✅ Set up automated backups
8. ✅ Configure CDN if expecting high traffic

---

## Maintenance Schedule

### Daily
- Monitor application health
- Check error logs

### Weekly
- Review performance metrics
- Update dependencies if needed

### Monthly
- Review and update environment variables
- Check SSL certificate renewal
- Perform load testing (if high traffic)

### Quarterly
- Update Next.js and dependencies
- Security audit
- Performance optimization review

---

**Deployment Date**: 2025-11-20
**Version**: 1.0.0
**Maintained By**: Delhi Public Radio
**Coolify Server**: data.delhipublicradio.net

---

## Contact

For deployment assistance or issues:
- Check Coolify logs and health endpoint first
- Review this documentation
- Contact your system administrator

**Happy Streaming! 🎵📻**
