'use client';

import React, { useState, useEffect } from 'react';
import { accessibility } from '@/lib/accessibility';

interface AccessibilityToolbarProps {
  className?: string;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false
  });

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem('accessibility-preferences');
    if (saved) {
      const preferences = JSON.parse(saved);
      setSettings(preferences);
      applySettings(preferences);
    }

    // Detect system preferences
    detectSystemPreferences();
  }, []);

  const detectSystemPreferences = () => {
    const updates: any = {};

    // High contrast
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      updates.highContrast = true;
    }

    // Reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      updates.reducedMotion = true;
    }

    if (Object.keys(updates).length > 0) {
      setSettings(prev => ({ ...prev, ...updates }));
      applySettings({ ...settings, ...updates });
    }
  };

  const applySettings = (newSettings: typeof settings) => {
    // High contrast
    if (newSettings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    // Reduced motion
    if (newSettings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }

    // Large text
    if (newSettings.largeText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }

    // Screen reader optimizations
    if (newSettings.screenReader) {
      document.body.classList.add('screen-reader-optimized');
    } else {
      document.body.classList.remove('screen-reader-optimized');
    }

    // Save preferences
    localStorage.setItem('accessibility-preferences', JSON.stringify(newSettings));
  };

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);

    // Announce change
    const settingNames = {
      highContrast: 'High contrast',
      reducedMotion: 'Reduced motion',
      largeText: 'Large text',
      screenReader: 'Screen reader optimizations'
    };

    accessibility.announce(
      `${settingNames[key]} ${value ? 'enabled' : 'disabled'}`,
      'polite'
    );
  };

  const resetSettings = () => {
    const defaultSettings = {
      highContrast: false,
      reducedMotion: false,
      largeText: false,
      screenReader: false
    };
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    accessibility.announce('Accessibility settings reset to defaults');
  };

  const runAccessibilityAudit = async () => {
    accessibility.announce('Running accessibility audit...', 'assertive');
    
    // Small delay to let announcement play
    setTimeout(() => {
      const report = accessibility.generateAccessibilityReport();
      console.log('Accessibility Audit Report:\n', report);
      
      // Create and download report
      const blob = new Blob([report], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'accessibility-audit-report.md';
      a.click();
      URL.revokeObjectURL(url);
      
      accessibility.announce('Accessibility audit completed. Report downloaded.');
    }, 1000);
  };

  return (
    <>
      {/* Accessibility toolbar toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`${isVisible ? 'Close' : 'Open'} accessibility toolbar`}
        aria-expanded={isVisible}
        aria-controls="accessibility-toolbar"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" 
          />
        </svg>
      </button>

      {/* Accessibility toolbar panel */}
      {isVisible && (
        <div
          id="accessibility-toolbar"
          className={`fixed top-20 right-4 bg-white border border-gray-200 rounded-lg shadow-xl z-40 w-80 max-h-96 overflow-y-auto ${className}`}
          role="dialog"
          aria-label="Accessibility settings"
          aria-modal="false"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Accessibility Settings
              </h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Close accessibility toolbar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <label htmlFor="high-contrast" className="text-sm font-medium text-gray-700">
                  High Contrast
                </label>
                <button
                  id="high-contrast"
                  role="switch"
                  aria-checked={settings.highContrast}
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.highContrast ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <label htmlFor="reduced-motion" className="text-sm font-medium text-gray-700">
                  Reduced Motion
                </label>
                <button
                  id="reduced-motion"
                  role="switch"
                  aria-checked={settings.reducedMotion}
                  onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.reducedMotion ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between">
                <label htmlFor="large-text" className="text-sm font-medium text-gray-700">
                  Large Text
                </label>
                <button
                  id="large-text"
                  role="switch"
                  aria-checked={settings.largeText}
                  onClick={() => updateSetting('largeText', !settings.largeText)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.largeText ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.largeText ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Screen Reader Optimizations */}
              <div className="flex items-center justify-between">
                <label htmlFor="screen-reader" className="text-sm font-medium text-gray-700">
                  Screen Reader Mode
                </label>
                <button
                  id="screen-reader"
                  role="switch"
                  aria-checked={settings.screenReader}
                  onClick={() => updateSetting('screenReader', !settings.screenReader)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.screenReader ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.screenReader ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 space-y-2">
              <button
                onClick={resetSettings}
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Reset to Defaults
              </button>
              
              <button
                onClick={runAccessibilityAudit}
                className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Run Accessibility Audit
              </button>
            </div>

            {/* Keyboard shortcuts info */}
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Keyboard Shortcuts
              </h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div><kbd className="px-1 bg-white border rounded">Alt+1</kbd> Main navigation</div>
                <div><kbd className="px-1 bg-white border rounded">Alt+2</kbd> Main content</div>
                <div><kbd className="px-1 bg-white border rounded">Alt+3</kbd> Analysis tool</div>
                <div><kbd className="px-1 bg-white border rounded">Alt+S</kbd> Start analysis</div>
                <div><kbd className="px-1 bg-white border rounded">Alt+R</kbd> Reset analysis</div>
                <div><kbd className="px-1 bg-white border rounded">Alt+H</kbd> Show help</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility styles */}
      <style jsx global>{`
        /* High contrast mode */
        .high-contrast {
          filter: contrast(150%) brightness(120%);
        }
        
        .high-contrast * {
          border-color: #000 !important;
        }
        
        .high-contrast a {
          text-decoration: underline !important;
        }
        
        /* Reduced motion */
        .reduced-motion *,
        .reduced-motion *:before,
        .reduced-motion *:after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        /* Large text */
        .large-text {
          font-size: 120% !important;
        }
        
        .large-text h1 { font-size: 2.5rem !important; }
        .large-text h2 { font-size: 2rem !important; }
        .large-text h3 { font-size: 1.75rem !important; }
        .large-text p, .large-text div, .large-text span {
          font-size: 1.2rem !important;
          line-height: 1.6 !important;
        }
        
        /* Screen reader optimizations */
        .screen-reader-optimized {
          --focus-ring-width: 3px;
        }
        
        .screen-reader-optimized *:focus {
          outline: var(--focus-ring-width) solid #0066cc !important;
          outline-offset: 2px !important;
        }
        
        .screen-reader-optimized .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }
        
        /* Focus visible improvements */
        .focus-visible {
          outline: 2px solid #0066cc !important;
          outline-offset: 2px !important;
        }
        
        /* Skip links */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #000;
          color: #fff;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 10000;
        }
        
        .skip-link:focus {
          top: 6px;
        }
        
        /* Ensure sufficient color contrast */
        @media (prefers-contrast: high) {
          * {
            border-color: #000 !important;
          }
          
          a {
            text-decoration: underline !important;
          }
          
          button {
            border: 2px solid #000 !important;
          }
        }
        
        /* Motion sensitivity */
        @media (prefers-reduced-motion: reduce) {
          *,
          *:before,
          *:after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
};