'use client';

import { useEffect } from 'react';

// Remove duplicate global declaration - it conflicts with PostHog types

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    const trackWebVitals = (metric: WebVitalsMetric) => {
      // Log to console for development
      if (process.env.NODE_ENV === 'development') {
        console.log(`${metric.name}:`, metric.value, `(${metric.rating})`);
      }

      // Send to analytics
      if ((window as any).posthog) {
        (window as any).posthog.capture('web_vitals', {
          metric_name: metric.name,
          value: metric.value,
          rating: metric.rating,
          page: window.location.pathname,
        });
      }
    };

    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            startTime: number;
          };

          if (lastEntry) {
            const value = lastEntry.startTime;
            const rating = value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
            
            trackWebVitals({
              id: 'LCP',
              name: 'LCP',
              value,
              delta: value,
              rating,
            });
          }
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const value = entry.processingStart - entry.startTime;
            const rating = value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
            
            trackWebVitals({
              id: 'FID',
              name: 'FID',
              value,
              delta: value,
              rating,
            });
          });
        });

        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });

        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Track CLS on page visibility change
        const trackCLS = () => {
          const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
          
          trackWebVitals({
            id: 'CLS',
            name: 'CLS',
            value: clsValue,
            delta: clsValue,
            rating,
          });
        };

        document.addEventListener('visibilitychange', trackCLS);
        window.addEventListener('beforeunload', trackCLS);

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
          document.removeEventListener('visibilitychange', trackCLS);
          window.removeEventListener('beforeunload', trackCLS);
        };
      } catch (error) {
        console.warn('Failed to initialize performance monitoring:', error);
      }
    }

    // Track page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domContentLoadedTime = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        const firstByteTime = navigation.responseStart - navigation.fetchStart;

        if ((window as any).posthog) {
          (window as any).posthog.capture('page_performance', {
            page_load_time: pageLoadTime,
            dom_content_loaded_time: domContentLoadedTime,
            first_byte_time: firstByteTime,
            page: window.location.pathname,
          });
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('Page Performance:', {
            pageLoadTime: `${pageLoadTime}ms`,
            domContentLoadedTime: `${domContentLoadedTime}ms`,
            firstByteTime: `${firstByteTime}ms`,
          });
        }
      }
    });
  }, []);

  // This component doesn't render anything
  return null;
}