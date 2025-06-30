# Development Guide

## Getting localhost working

### Quick Start
```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
# OR for simplified config (if having issues)
npm run dev:simple
```

### Available URLs
- **Development**: http://localhost:3000
- **Network**: http://192.168.1.23:3000 (accessible from other devices)

### Common Issues & Solutions

#### Issue 1: Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Then restart
npm run dev
```

#### Issue 2: Complex config causing issues
```bash
# Use simplified development config
npm run dev:simple
```

#### Issue 3: HTTPS issues with camera
- Camera requires HTTPS or localhost
- localhost:3000 should work for camera access
- For network access (192.168.1.23:3000), camera may not work due to HTTPS requirement

#### Issue 4: Clearing cache/build issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Development Workflow
1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Make changes to files
4. Hot reload will update automatically
5. Test changes locally before committing
6. Build test: `npm run build`
7. Commit and push when ready

### Environment Files
- `.env.local` - Local development variables
- `next.config.dev.js` - Simplified development config
- `next.config.js` - Production config (more security headers)

### Testing Camera Locally
- Use http://localhost:3000/face-analysis
- Camera should work with HTTPS or localhost
- Test both mobile and desktop interfaces
- Upload functionality should work on both

### Debugging
- Check browser console for errors
- Check terminal for server errors
- Use simplified config if having complex issues
- Ensure no other processes using port 3000