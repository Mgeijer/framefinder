#!/bin/bash

echo "🚀 FrameFinder Quick Test Deployment"
echo "====================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📦 Adding project files..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "FrameFinder: AI-powered face shape analysis ready for deployment

Features:
- TensorFlow.js face detection with MediaPipe
- 6 face shape classifications with recommendations  
- Real-time camera capture and photo upload
- Comprehensive analytics with PostHog
- Ad monetization infrastructure ready
- Mobile-responsive Supabase theme design
- Production build tested and optimized

Ready for Vercel deployment with full functionality."

echo ""
echo "✅ Repository ready for deployment!"
echo ""
echo "🔗 Next steps:"
echo "1. Create repository on GitHub"
echo "2. git remote add origin https://github.com/yourusername/framefinder.git"
echo "3. git push -u origin main"
echo "4. Connect to Vercel for instant deployment"
echo ""
echo "📱 Or test functional demo locally:"
echo "   Open: functional-demo.html in your browser"
echo ""
echo "🌟 Your FrameFinder app is ready to help people find perfect eyeglass styles!"