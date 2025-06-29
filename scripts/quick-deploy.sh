#!/bin/bash

# FrameFinder Quick Deployment Script
# Run this after getting your API keys

echo "🚀 FrameFinder Quick Deploy to Vercel"
echo "======================================"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔑 IMPORTANT: Make sure you have these ready:"
echo "• NEXT_PUBLIC_POSTHOG_KEY (from posthog.com)"
echo "• NEXT_PUBLIC_SENTRY_DSN (from sentry.io)"
echo ""

read -p "Press Enter when you have your API keys ready..."

echo "🏗️ Building for production..."
npm run build

echo "🚀 Deploying to Vercel..."
echo "💡 When prompted, add your environment variables:"
echo "   NEXT_PUBLIC_POSTHOG_KEY"
echo "   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com"
echo "   NEXT_PUBLIC_SENTRY_DSN"

vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app is now live on Vercel's global CDN"
echo "📊 Don't forget to enable analytics in your Vercel dashboard"