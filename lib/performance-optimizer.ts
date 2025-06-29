/**
 * Performance optimization utilities for FrameFinder
 * Handles Core Web Vitals, resource optimization, and performance monitoring
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  
  // Custom metrics
  faceAnalysisTime: number;
  modelLoadTime: number;
  imageProcessingTime: number;
  
  // Resource metrics
  bundleSize: number;
  imageOptimization: number;
  cacheHitRate: number;
}

export interface OptimizationConfig {
  enableImageOptimization: boolean;
  enableCodeSplitting: boolean;
  enableCaching: boolean;
  enablePreloading: boolean;
  enableServiceWorker: boolean;
  compressionLevel: 'low' | 'medium' | 'high';
}

export interface PerformanceBudget {
  maxLCP: number; // 2.5s
  maxFID: number; // 100ms
  maxCLS: number; // 0.1
  maxBundleSize: number; // 250KB
  maxImageSize: number; // 1MB
  maxAnalysisTime: number; // 3000ms
}

/**
 * Performance Optimizer
 * Manages performance monitoring and optimization strategies
 */
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private metrics: Partial<PerformanceMetrics> = {};
  private budget: PerformanceBudget;
  private config: OptimizationConfig;
  private observers: Map<string, PerformanceObserver> = new Map();

  private constructor() {
    this.budget = {
      maxLCP: 2500,
      maxFID: 100,
      maxCLS: 0.1,
      maxBundleSize: 250 * 1024, // 250KB
      maxImageSize: 1024 * 1024, // 1MB
      maxAnalysisTime: 3000
    };

    this.config = {
      enableImageOptimization: true,
      enableCodeSplitting: true,
      enableCaching: true,
      enablePreloading: true,
      enableServiceWorker: true,
      compressionLevel: 'medium'
    };
  }

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  /**
   * Initialize performance monitoring
   */
  init(): void {
    if (typeof window === 'undefined') return;

    this.setupCoreWebVitalsMonitoring();
    this.setupCustomMetricsMonitoring();
    this.setupResourceMonitoring();
    this.optimizeInitialLoad();
  }

  /**
   * Setup Core Web Vitals monitoring
   */
  private setupCoreWebVitalsMonitoring(): void {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.startTime;
        this.evaluateMetric('lcp', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.evaluateMetric('fid', this.metrics.fid);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
            this.evaluateMetric('cls', clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            this.evaluateMetric('fcp', entry.startTime);
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.set('fcp', fcpObserver);
    }

    // Navigation timing for TTFB
    window.addEventListener('load', () => {
      const navTiming = performance.getEntriesByType('navigation')[0] as any;
      if (navTiming) {
        this.metrics.ttfb = navTiming.responseStart - navTiming.requestStart;
        this.evaluateMetric('ttfb', this.metrics.ttfb);
      }
    });
  }

  /**
   * Setup custom metrics monitoring
   */
  private setupCustomMetricsMonitoring(): void {
    // Monitor face analysis performance
    window.addEventListener('faceAnalysisStart', () => {
      performance.mark('face-analysis-start');
    });

    window.addEventListener('faceAnalysisEnd', () => {
      performance.mark('face-analysis-end');
      performance.measure('face-analysis', 'face-analysis-start', 'face-analysis-end');
      
      const measure = performance.getEntriesByName('face-analysis')[0];
      if (measure) {
        this.metrics.faceAnalysisTime = measure.duration;
        this.evaluateMetric('faceAnalysisTime', measure.duration);
      }
    });

    // Monitor model loading
    window.addEventListener('modelLoadStart', () => {
      performance.mark('model-load-start');
    });

    window.addEventListener('modelLoadEnd', () => {
      performance.mark('model-load-end');
      performance.measure('model-load', 'model-load-start', 'model-load-end');
      
      const measure = performance.getEntriesByName('model-load')[0];
      if (measure) {
        this.metrics.modelLoadTime = measure.duration;
        this.evaluateMetric('modelLoadTime', measure.duration);
      }
    });
  }

  /**
   * Setup resource monitoring
   */
  private setupResourceMonitoring(): void {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.analyzeResourcePerformance(entry);
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', resourceObserver);
    }
  }

  /**
   * Optimize initial page load
   */
  private optimizeInitialLoad(): void {
    // Preload critical resources
    if (this.config.enablePreloading) {
      this.preloadCriticalResources();
    }

    // Setup service worker for caching
    if (this.config.enableServiceWorker && 'serviceWorker' in navigator) {
      this.setupServiceWorker();
    }

    // Optimize images
    if (this.config.enableImageOptimization) {
      this.optimizeImages();
    }

    // Setup lazy loading
    this.setupLazyLoading();
  }

  /**
   * Preload critical resources
   */
  private preloadCriticalResources(): void {
    const criticalResources = [
      { href: '/models/face-detection-model.json', as: 'fetch' },
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      document.head.appendChild(link);
    });
  }

  /**
   * Setup service worker for caching
   */
  private async setupServiceWorker(): Promise<void> {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  /**
   * Optimize images with lazy loading and responsive sizing
   */
  private optimizeImages(): void {
    // Setup intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            this.loadImage(img);
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Setup lazy loading for non-critical content
   */
  private setupLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.add('loaded');
            lazyObserver.unobserve(element);
          }
        });
      }, {
        rootMargin: '100px'
      });

      document.querySelectorAll('.lazy-load').forEach(el => {
        lazyObserver.observe(el);
      });
    }
  }

  /**
   * Load image with optimization
   */
  private loadImage(img: HTMLImageElement): void {
    const src = img.dataset.src;
    if (src) {
      const optimizedSrc = this.getOptimizedImageSrc(src, img);
      
      img.onload = () => {
        img.classList.add('loaded');
        performance.mark(`image-loaded-${src}`);
      };
      
      img.onerror = () => {
        console.error('Failed to load image:', src);
        img.classList.add('error');
      };
      
      img.src = optimizedSrc;
    }
  }

  /**
   * Get optimized image source based on device capabilities
   */
  private getOptimizedImageSrc(src: string, img: HTMLImageElement): string {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const targetWidth = img.clientWidth * devicePixelRatio;
    
    // Add responsive parameters (would integrate with image optimization service)
    const params = new URLSearchParams({
      w: Math.round(targetWidth).toString(),
      q: this.getImageQuality().toString(),
      f: this.getSupportedImageFormat()
    });
    
    return `${src}?${params.toString()}`;
  }

  /**
   * Get optimal image quality based on connection
   */
  private getImageQuality(): number {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        return 50; // Low quality for slow connections
      } else if (connection.effectiveType === '3g') {
        return 75; // Medium quality
      }
    }
    return 85; // High quality for good connections
  }

  /**
   * Get supported image format
   */
  private getSupportedImageFormat(): string {
    // Check for WebP support
    const canvas = document.createElement('canvas');
    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    if (webpSupported) return 'webp';
    return 'jpg';
  }

  /**
   * Analyze resource performance
   */
  private analyzeResourcePerformance(entry: any): void {
    const resourceType = this.getResourceType(entry.name);
    const loadTime = entry.responseEnd - entry.startTime;
    
    // Log slow resources
    if (loadTime > 1000) { // 1 second
      console.warn(`Slow ${resourceType} resource:`, {
        name: entry.name,
        loadTime: Math.round(loadTime),
        size: entry.transferSize
      });
    }

    // Check for large resources
    if (entry.transferSize > this.budget.maxImageSize && resourceType === 'image') {
      console.warn(`Large image resource:`, {
        name: entry.name,
        size: Math.round(entry.transferSize / 1024) + 'KB'
      });
    }
  }

  /**
   * Get resource type from URL
   */
  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension || '')) return 'image';
    if (['js'].includes(extension || '')) return 'script';
    if (['css'].includes(extension || '')) return 'stylesheet';
    if (['woff', 'woff2', 'ttf', 'otf'].includes(extension || '')) return 'font';
    
    return 'other';
  }

  /**
   * Evaluate metric against budget
   */
  private evaluateMetric(metric: string, value: number): void {
    const budgetKey = `max${metric.charAt(0).toUpperCase() + metric.slice(1)}` as keyof PerformanceBudget;
    const budgetValue = this.budget[budgetKey];
    
    if (budgetValue && value > budgetValue) {
      console.warn(`Performance budget exceeded for ${metric}:`, {
        actual: Math.round(value),
        budget: budgetValue,
        excess: Math.round(value - budgetValue)
      });
      
      this.triggerPerformanceAlert(metric, value, budgetValue);
    }
  }

  /**
   * Trigger performance alert
   */
  private triggerPerformanceAlert(metric: string, actual: number, budget: number): void {
    // Send to analytics
    if (typeof window.posthog !== 'undefined') {
      window.posthog.capture('performance_budget_exceeded', {
        metric,
        actual_value: actual,
        budget_value: budget,
        excess_percentage: ((actual - budget) / budget) * 100
      });
    }

    // Trigger custom event
    window.dispatchEvent(new CustomEvent('performanceAlert', {
      detail: { metric, actual, budget }
    }));
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * Get performance score
   */
  getPerformanceScore(): {
    overall: number;
    coreWebVitals: number;
    custom: number;
    breakdown: Record<string, number>;
  } {
    const breakdown: Record<string, number> = {};
    
    // Core Web Vitals scoring
    let cwvScore = 0;
    let cwvCount = 0;
    
    if (this.metrics.lcp !== undefined) {
      breakdown.lcp = this.scoreMetric('lcp', this.metrics.lcp, 2500, 4000);
      cwvScore += breakdown.lcp;
      cwvCount++;
    }
    
    if (this.metrics.fid !== undefined) {
      breakdown.fid = this.scoreMetric('fid', this.metrics.fid, 100, 300);
      cwvScore += breakdown.fid;
      cwvCount++;
    }
    
    if (this.metrics.cls !== undefined) {
      breakdown.cls = this.scoreMetric('cls', this.metrics.cls, 0.1, 0.25);
      cwvScore += breakdown.cls;
      cwvCount++;
    }
    
    const coreWebVitals = cwvCount > 0 ? cwvScore / cwvCount : 0;
    
    // Custom metrics scoring
    let customScore = 0;
    let customCount = 0;
    
    if (this.metrics.faceAnalysisTime !== undefined) {
      breakdown.faceAnalysisTime = this.scoreMetric('faceAnalysisTime', this.metrics.faceAnalysisTime, 3000, 5000);
      customScore += breakdown.faceAnalysisTime;
      customCount++;
    }
    
    if (this.metrics.modelLoadTime !== undefined) {
      breakdown.modelLoadTime = this.scoreMetric('modelLoadTime', this.metrics.modelLoadTime, 2000, 4000);
      customScore += breakdown.modelLoadTime;
      customCount++;
    }
    
    const custom = customCount > 0 ? customScore / customCount : 0;
    
    // Overall score (weighted)
    const overall = (coreWebVitals * 0.7) + (custom * 0.3);
    
    return {
      overall: Math.round(overall),
      coreWebVitals: Math.round(coreWebVitals),
      custom: Math.round(custom),
      breakdown
    };
  }

  /**
   * Score individual metric (0-100)
   */
  private scoreMetric(metric: string, value: number, good: number, poor: number): number {
    if (value <= good) return 100;
    if (value >= poor) return 0;
    
    // Linear interpolation between good and poor
    const ratio = (value - good) / (poor - good);
    return Math.round((1 - ratio) * 100);
  }

  /**
   * Generate performance report
   */
  generateReport(): any {
    const score = this.getPerformanceScore();
    const metrics = this.getMetrics();
    
    return {
      timestamp: new Date().toISOString(),
      score,
      metrics,
      budget: this.budget,
      recommendations: this.getRecommendations(score, metrics)
    };
  }

  /**
   * Get performance recommendations
   */
  private getRecommendations(score: any, metrics: Partial<PerformanceMetrics>): string[] {
    const recommendations: string[] = [];
    
    if (score.overall < 70) {
      recommendations.push('Overall performance needs improvement');
    }
    
    if (metrics.lcp && metrics.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint by reducing image sizes and improving server response times');
    }
    
    if (metrics.fid && metrics.fid > 100) {
      recommendations.push('Reduce First Input Delay by optimizing JavaScript execution and reducing main thread blocking');
    }
    
    if (metrics.cls && metrics.cls > 0.1) {
      recommendations.push('Minimize Cumulative Layout Shift by defining image dimensions and avoiding dynamic content insertion');
    }
    
    if (metrics.faceAnalysisTime && metrics.faceAnalysisTime > 3000) {
      recommendations.push('Optimize face analysis performance by implementing model optimization or progressive loading');
    }
    
    return recommendations;
  }

  /**
   * Clean up observers
   */
  dispose(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Export singleton instance
export const performanceOptimizer = PerformanceOptimizer.getInstance();