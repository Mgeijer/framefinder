'use client';

import React, { useState, useEffect } from 'react';
import { cookieConsent, CookiePreferences } from '@/lib/cookie-consent';

interface CookieBannerProps {
  className?: string;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    performance: true,
    marketing: false
  });

  useEffect(() => {
    // Check if banner should be shown
    setIsVisible(cookieConsent.shouldShowBanner());
    
    // Load current preferences
    setPreferences(cookieConsent.getPreferences());
  }, []);

  const handleAcceptAll = () => {
    cookieConsent.acceptAll();
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    cookieConsent.acceptEssential();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    cookieConsent.setConsent(preferences);
    setIsVisible(false);
  };

  const handlePreferenceChange = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'essential') return; // Essential can't be disabled
    
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        {!showDetails ? (
          // Simple banner
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-sm text-gray-600">
              <p>
                We use cookies to improve your experience and analyze site usage. 
                Your face analysis data is processed locally and never stored on our servers.{' '}
                <a 
                  href="/privacy-policy.html" 
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Customize
              </button>
              <button
                onClick={handleAcceptEssential}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Detailed preferences
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Cookie Preferences</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close preferences"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-sm text-gray-600">
              Manage your cookie preferences below. Essential cookies are required for the site to function.
            </p>

            <div className="grid gap-4 max-h-60 overflow-y-auto">
              {/* Essential Cookies */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Essential Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Required for basic website functionality, security, and face analysis processing.
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      Always Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Help us understand how you use the site to improve your experience. No personal data is collected.
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={preferences.analytics}
                        onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Performance Cookies */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Performance Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Monitor site performance and loading times to ensure optimal experience.
                    </p>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={preferences.performance}
                        onChange={(e) => handlePreferenceChange('performance', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="p-4 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600">
                      Used for targeted advertising and marketing campaigns. (Currently not used)
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      Not Used
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleAcceptEssential}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Accept All
              </button>
            </div>

            <div className="text-xs text-gray-500 pt-2">
              <p>
                You can change these preferences at any time. For more information, see our{' '}
                <a 
                  href="/privacy-policy.html" 
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};