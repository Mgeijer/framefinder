// Feature flags for controlling app functionality
export const features = {
  // Advertisement configuration
  ads: {
    enabled: true,
    sidebarAd: true,
    bottomAd: true,
  },
  
  // Analytics configuration
  analytics: {
    enabled: true,
    posthog: true,
  },
  
  // Social features
  social: {
    sharing: true,
    downloadResults: true,
  },
  
  // Debug features (only in development)
  debug: {
    showDebugInfo: process.env.NODE_ENV === 'development',
    verboseLogging: process.env.NODE_ENV === 'development',
  }
} as const;

// Helper function to check if feature is enabled
export function isFeatureEnabled(feature: string): boolean {
  const path = feature.split('.');
  let current: any = features;
  
  for (const key of path) {
    if (current[key] === undefined) return false;
    current = current[key];
  }
  
  return Boolean(current);
}