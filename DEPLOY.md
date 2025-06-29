# Quick Deployment Guide

## Deploy to Vercel (5 minutes)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial FrameFinder deployment"
   git branch -M main
   # Create repo on GitHub, then:
   git remote add origin https://github.com/yourusername/framefinder.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to vercel.com
   - Click "Import Project"
   - Connect your GitHub repo
   - Deploy automatically

3. **Set Environment Variables in Vercel:**
   - NEXT_PUBLIC_POSTHOG_KEY=demo_key
   - NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

## Alternative: Deploy to Netlify

1. **Build static version:**
   ```bash
   npm run build
   npm run export
   ```

2. **Drag `out` folder to netlify.com/drop**