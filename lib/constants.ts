// Application Configuration
export const APP_CONFIG = {
  name: 'FrameFinder',
  description: 'Discover your perfect eyeglass frames with AI-powered face shape analysis',
  version: '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@framefinder.com',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxImageWidth: 800,
  analysisTimeout: 30000, // 30 seconds
  cacheTTL: 3600, // 1 hour
} as const;

// Face Detection Configuration
export const FACE_DETECTION_CONFIG = {
  modelPath: 'https://tfhub.dev/mediapipe/tfjs-model/face_landmarks_detection/1/default/1',
  confidenceThreshold: 0.5,
  maxFaces: 1,
  enableLandmarks: true,
  enableMesh: false,
  refineLandmarks: true,
} as const;

// Recommendation Engine Configuration
export const RECOMMENDATION_CONFIG = {
  algorithm: 'hybrid' as const,
  weights: {
    faceShape: 0.6,
    preferences: 0.2,
    popularity: 0.1,
    style: 0.1,
  },
  maxRecommendations: 6,
  minConfidence: 0.7,
} as const;

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_test',
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  enableDebug: process.env.NODE_ENV === 'development',
  trackPerformance: true,
  trackErrors: true,
  trackUserJourney: true,
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  redisUrl: process.env.UPSTASH_REDIS_REST_URL,
  redisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
  defaultTTL: 3600, // 1 hour
  analysisTTL: 86400, // 24 hours
  userPreferencesTTL: 604800, // 7 days
} as const;

// Error Monitoring Configuration
export const ERROR_MONITORING_CONFIG = {
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  enablePerformanceMonitoring: true,
  enableSessionReplay: false,
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  enableCameraCapture: true,
  enableVirtualTryOn: false,
  enableSocialSharing: true,
  enableNewsletterSignup: true,
  enableContactForm: true,
  enableABTesting: false,
  enableOfflineMode: false,
  enablePWA: false,
} as const;

// UI Configuration
export const UI_CONFIG = {
  theme: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#10B981',
    destructive: '#EF4444',
    warning: '#F59E0B',
    info: '#06B6D4',
  },
  animation: {
    duration: 300,
    easing: 'ease-in-out',
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
} as const;

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: 'FrameFinder - AI-Powered Eyeglass Frame Recommendations',
  defaultDescription: 'Discover your perfect eyeglass frames with our AI-powered face shape analysis. Get personalized recommendations based on your unique facial features.',
  defaultKeywords: [
    'eyeglass frames',
    'face shape analysis',
    'glasses recommendations',
    'AI face detection',
    'personalized eyewear',
    'frame finder',
    'optical style',
    'face shape guide'
  ],
  defaultImage: '/images/og-image.jpg',
  twitterHandle: '@framefinder',
  siteName: 'FrameFinder',
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
  retries: 3,
  endpoints: {
    analyzeFace: '/analyze-face',
    recommendations: '/recommendations',
    analytics: '/analytics',
    contact: '/contact',
    newsletter: '/newsletter',
  },
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  maxLoadTime: 3000, // 3 seconds
  maxAnalysisTime: 10000, // 10 seconds
  maxRenderTime: 1000, // 1 second
  enableLazyLoading: true,
  enableImageOptimization: true,
  enableBundleSplitting: true,
} as const;

// Security Configuration
export const SECURITY_CONFIG = {
  enableCSP: true,
  enableHSTS: true,
  enableXSSProtection: true,
  enableContentTypeSniffing: false,
  maxFileUploads: 1,
  allowedOrigins: [
    'https://framefinder.com',
    'https://www.framefinder.com',
    'http://localhost:3000',
  ],
} as const;

// Localization Configuration
export const LOCALE_CONFIG = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'es', 'fr', 'de'],
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'HH:mm',
  currency: 'USD',
} as const;

// Export all configurations
export const CONFIG = {
  app: APP_CONFIG,
  faceDetection: FACE_DETECTION_CONFIG,
  recommendation: RECOMMENDATION_CONFIG,
  analytics: ANALYTICS_CONFIG,
  cache: CACHE_CONFIG,
  errorMonitoring: ERROR_MONITORING_CONFIG,
  featureFlags: FEATURE_FLAGS,
  ui: UI_CONFIG,
  seo: SEO_CONFIG,
  api: API_CONFIG,
  performance: PERFORMANCE_CONFIG,
  security: SECURITY_CONFIG,
  locale: LOCALE_CONFIG,
} as const; 