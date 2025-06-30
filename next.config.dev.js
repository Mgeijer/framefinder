/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core configuration
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '1.0.0',
    NEXT_PUBLIC_BUILD_ID: 'local-dev',
  },
  
  // Add alias for easier imports
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;