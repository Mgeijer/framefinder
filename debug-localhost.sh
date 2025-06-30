#!/bin/bash

echo "=== FrameFinder Localhost Debug ==="
echo

echo "1. Checking Node.js and npm versions:"
node --version
npm --version
echo

echo "2. Checking current directory:"
pwd
echo

echo "3. Checking if Next.js is installed:"
npm list next 2>/dev/null || echo "Next.js not found in dependencies"
echo

echo "4. Killing any existing processes on port 3000:"
lsof -ti :3000 | xargs kill -9 2>/dev/null || echo "No processes found on port 3000"
echo

echo "5. Checking available ports:"
lsof -i :3000-3010 | head -10
echo

echo "6. Testing basic HTTP server (port 3001):"
curl -s http://localhost:3001 | head -2 || echo "Test server not accessible"
echo

echo "7. Attempting to start Next.js dev server:"
echo "Run: npm run dev"
echo "Then try: http://localhost:3000"
echo

echo "If localhost:3000 still doesn't work, try:"
echo "- npm run dev:simple"
echo "- Check browser console for errors"
echo "- Try 127.0.0.1:3000 instead of localhost:3000"
echo "- Check if macOS firewall is blocking connections"