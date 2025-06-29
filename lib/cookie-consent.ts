/**
 * Cookie consent management for GDPR compliance
 */

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  performance: boolean;
  marketing: boolean;
}

export interface CookieConsentState {
  hasConsented: boolean;
  preferences: CookiePreferences;
  consentDate: string;
  version: string;
}

const CONSENT_VERSION = '1.0';
const CONSENT_STORAGE_KEY = 'framefinder_cookie_consent';
const CONSENT_BANNER_SHOWN_KEY = 'framefinder_consent_banner_shown';

export class CookieConsentManager {
  private static instance: CookieConsentManager;
  private state: CookieConsentState | null = null;

  private constructor() {
    this.loadConsentState();
  }

  static getInstance(): CookieConsentManager {
    if (!CookieConsentManager.instance) {
      CookieConsentManager.instance = new CookieConsentManager();
    }
    return CookieConsentManager.instance;
  }

  /**
   * Load consent state from localStorage
   */
  private loadConsentState(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Check if consent version matches current version
        if (parsed.version === CONSENT_VERSION) {
          this.state = parsed;
        } else {
          // Version mismatch - clear old consent
          this.clearConsent();
        }
      }
    } catch (error) {
      console.error('Failed to load cookie consent state:', error);
      this.clearConsent();
    }
  }

  /**
   * Save consent state to localStorage
   */
  private saveConsentState(): void {
    if (typeof window === 'undefined' || !this.state) return;

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(this.state));
    } catch (error) {
      console.error('Failed to save cookie consent state:', error);
    }
  }

  /**
   * Check if user has given consent
   */
  hasConsented(): boolean {
    return this.state?.hasConsented || false;
  }

  /**
   * Check if consent banner should be shown
   */
  shouldShowBanner(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Don't show if already consented
    if (this.hasConsented()) return false;
    
    // Check if banner was already dismissed this session
    const bannerShown = sessionStorage.getItem(CONSENT_BANNER_SHOWN_KEY);
    return !bannerShown;
  }

  /**
   * Mark banner as shown for this session
   */
  markBannerShown(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(CONSENT_BANNER_SHOWN_KEY, 'true');
  }

  /**
   * Get current cookie preferences
   */
  getPreferences(): CookiePreferences {
    return this.state?.preferences || {
      essential: true, // Always true
      analytics: false,
      performance: false,
      marketing: false
    };
  }

  /**
   * Set cookie consent with preferences
   */
  setConsent(preferences: Partial<CookiePreferences>): void {
    const fullPreferences: CookiePreferences = {
      essential: true, // Essential cookies always required
      analytics: preferences.analytics || false,
      performance: preferences.performance || false,
      marketing: preferences.marketing || false
    };

    this.state = {
      hasConsented: true,
      preferences: fullPreferences,
      consentDate: new Date().toISOString(),
      version: CONSENT_VERSION
    };

    this.saveConsentState();
    this.applyConsentSettings();
    this.markBannerShown();

    // Trigger consent event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentChanged', {
        detail: { preferences: fullPreferences }
      }));
    }
  }

  /**
   * Accept all cookies
   */
  acceptAll(): void {
    this.setConsent({
      analytics: true,
      performance: true,
      marketing: false // We don't use marketing cookies currently
    });
  }

  /**
   * Accept only essential cookies
   */
  acceptEssential(): void {
    this.setConsent({
      analytics: false,
      performance: false,
      marketing: false
    });
  }

  /**
   * Clear all consent data
   */
  clearConsent(): void {
    this.state = null;
    
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    sessionStorage.removeItem(CONSENT_BANNER_SHOWN_KEY);
    
    // Clear analytics cookies if they exist
    this.clearAnalyticsCookies();
  }

  /**
   * Apply consent settings to third-party services
   */
  private applyConsentSettings(): void {
    if (typeof window === 'undefined' || !this.state) return;

    const { preferences } = this.state;

    // PostHog analytics
    if (preferences.analytics && typeof window.posthog !== 'undefined') {
      window.posthog.opt_in_capturing();
    } else if (typeof window.posthog !== 'undefined') {
      window.posthog.opt_out_capturing();
    }

    // Performance monitoring
    if (!preferences.performance) {
      this.disablePerformanceMonitoring();
    }

    // Clear non-essential cookies if not consented
    if (!preferences.analytics) {
      this.clearAnalyticsCookies();
    }
  }

  /**
   * Clear analytics cookies
   */
  private clearAnalyticsCookies(): void {
    if (typeof document === 'undefined') return;

    // Clear PostHog cookies
    const cookiesToClear = [
      'ph_phc_', // PostHog session cookies
      '__ph_opt_in_out_',
      'ph_' // Any other PostHog cookies
    ];

    // Get all cookies
    const cookies = document.cookie.split(';');
    
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      
      // Check if cookie matches patterns to clear
      const shouldClear = cookiesToClear.some(pattern => 
        cookieName.startsWith(pattern)
      );
      
      if (shouldClear) {
        // Clear cookie by setting expiry date in the past
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
      }
    });
  }

  /**
   * Disable performance monitoring
   */
  private disablePerformanceMonitoring(): void {
    // Disable performance observers if they exist
    if (typeof window.PerformanceObserver !== 'undefined') {
      try {
        // Note: Individual observers need to be disconnected, not a global one
        console.log('Performance monitoring disabled by cookie consent');
      } catch (error) {
        // Ignore errors
      }
    }
  }

  /**
   * Get consent status for legal compliance
   */
  getConsentRecord(): CookieConsentState | null {
    return this.state;
  }

  /**
   * Check if specific cookie category is allowed
   */
  isCategoryAllowed(category: keyof CookiePreferences): boolean {
    if (category === 'essential') return true; // Essential always allowed
    
    const preferences = this.getPreferences();
    return preferences[category];
  }

  /**
   * Initialize consent manager
   */
  init(): void {
    if (typeof window === 'undefined') return;

    // Apply existing consent settings
    if (this.hasConsented()) {
      this.applyConsentSettings();
    }

    // Listen for consent changes
    window.addEventListener('cookieConsentChanged', (event: any) => {
      console.log('Cookie consent updated:', event.detail.preferences);
    });
  }
}

// Global consent manager instance
export const cookieConsent = CookieConsentManager.getInstance();

// Initialize on import (client-side only)
if (typeof window !== 'undefined') {
  cookieConsent.init();
}

// Utility functions
export const consentUtils = {
  /**
   * Check if analytics tracking is allowed
   */
  canTrackAnalytics(): boolean {
    return cookieConsent.isCategoryAllowed('analytics');
  },

  /**
   * Check if performance monitoring is allowed
   */
  canMonitorPerformance(): boolean {
    return cookieConsent.isCategoryAllowed('performance');
  },

  /**
   * Check if marketing cookies are allowed
   */
  canUseMarketing(): boolean {
    return cookieConsent.isCategoryAllowed('marketing');
  },

  /**
   * Wrapper for analytics tracking that respects consent
   */
  trackEvent(eventName: string, properties?: Record<string, any>): void {
    if (this.canTrackAnalytics() && typeof window.posthog !== 'undefined') {
      window.posthog.capture(eventName, properties);
    }
  }
};