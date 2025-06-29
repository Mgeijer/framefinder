/**
 * Performance monitoring and real-time tracking for FrameFinder
 * Integrates with Core Web Vitals, custom metrics, and performance alerts
 */

export interface PerformanceConfig {
  enableRealTimeMonitoring: boolean;
  enableCoreWebVitals: boolean;
  enableCustomMetrics: boolean;
  enablePerformanceAlerts: boolean;
  sampleRate: number;
  alertThresholds: AlertThresholds;
}

export interface AlertThresholds {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  faceAnalysisTime: number;
  memoryUsage: number;
  errorRate: number;
}

export interface PerformanceEntry {
  id: string;
  timestamp: Date;
  sessionId: string;
  pageUrl: string;
  metrics: PerformanceMetrics;
  device: DeviceInfo;
  connection: ConnectionInfo;
}

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  
  // Custom FrameFinder metrics
  faceAnalysisTime?: number;
  modelLoadTime?: number;
  imageProcessingTime?: number;
  confidenceScore?: number;
  
  // Technical metrics
  memoryUsage?: number;
  cpuUsage?: number;
  networkLatency?: number;
  bundleLoadTime?: number;
  
  // User experience metrics
  timeToInteractive?: number;
  totalBlockingTime?: number;
  speedIndex?: number;
}

export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  memory?: number;
  cores?: number;
  pixelRatio: number;
  viewport: string;
  userAgent: string;
}

export interface ConnectionInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export interface PerformanceAlert {
  id: string;
  timestamp: Date;
  metric: string;
  value: number;
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  context: Record<string, any>;
}

/**
 * Performance Monitoring Manager
 * Real-time performance tracking and alerting
 */
export class PerformanceMonitoringManager {
  private static instance: PerformanceMonitoringManager;
  private config: PerformanceConfig;
  private observers: Map<string, PerformanceObserver> = new Map();
  private metrics: Map<string, number> = new Map();
  private alerts: PerformanceAlert[] = [];
  private sessionId: string;
  private monitoringStartTime: number;

  private constructor() {
    this.config = {
      enableRealTimeMonitoring: true,
      enableCoreWebVitals: true,
      enableCustomMetrics: true,
      enablePerformanceAlerts: true,
      sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      alertThresholds: {
        lcp: 2500, // 2.5s
        fid: 100, // 100ms
        cls: 0.1,
        faceAnalysisTime: 3000, // 3s
        memoryUsage: 100 * 1024 * 1024, // 100MB
        errorRate: 0.05 // 5%
      }
    };
    
    this.sessionId = this.generateSessionId();
    this.monitoringStartTime = performance.now();
  }

  static getInstance(): PerformanceMonitoringManager {
    if (!PerformanceMonitoringManager.instance) {
      PerformanceMonitoringManager.instance = new PerformanceMonitoringManager();
    }
    return PerformanceMonitoringManager.instance;
  }

  /**
   * Initialize performance monitoring
   */
  init(): void {
    if (typeof window === 'undefined') return;

    // Sample based on configuration
    if (Math.random() > this.config.sampleRate) {
      return;
    }

    if (this.config.enableCoreWebVitals) {
      this.setupCoreWebVitalsMonitoring();
    }

    if (this.config.enableCustomMetrics) {
      this.setupCustomMetricsMonitoring();
    }

    if (this.config.enableRealTimeMonitoring) {
      this.setupRealTimeMonitoring();
    }

    // Setup periodic reporting
    this.setupPeriodicReporting();
  }

  /**
   * Setup Core Web Vitals monitoring
   */
  private setupCoreWebVitalsMonitoring(): void {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        this.recordMetric('lcp', lastEntry.startTime);
        this.checkAlert('lcp', lastEntry.startTime);
        this.sendMetricToAnalytics('lcp', lastEntry.startTime);
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.set('lcp', lcpObserver);
      } catch (error) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          this.recordMetric('fid', fid);
          this.checkAlert('fid', fid);
          this.sendMetricToAnalytics('fid', fid);
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.set('fid', fidObserver);
      } catch (error) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.recordMetric('cls', clsValue);
            this.checkAlert('cls', clsValue);
            this.sendMetricToAnalytics('cls', clsValue);
          }
        });
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.set('cls', clsObserver);
      } catch (error) {
        console.warn('CLS observer not supported');
      }

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric('fcp', entry.startTime);
            this.sendMetricToAnalytics('fcp', entry.startTime);
          }
        });
      });
      
      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.set('fcp', fcpObserver);
      } catch (error) {
        console.warn('Paint observer not supported');
      }
    }

    // Navigation timing for TTFB
    window.addEventListener('load', () => {
      const navTiming = performance.getEntriesByType('navigation')[0] as any;
      if (navTiming) {
        const ttfb = navTiming.responseStart - navTiming.requestStart;
        this.recordMetric('ttfb', ttfb);
        this.sendMetricToAnalytics('ttfb', ttfb);
      }
    });
  }

  /**
   * Setup custom metrics monitoring
   */
  private setupCustomMetricsMonitoring(): void {
    // Face analysis performance tracking
    window.addEventListener('faceAnalysisStart', () => {
      performance.mark('face-analysis-start');
    });

    window.addEventListener('faceAnalysisEnd', (event: any) => {
      performance.mark('face-analysis-end');
      performance.measure('face-analysis', 'face-analysis-start', 'face-analysis-end');
      
      const measure = performance.getEntriesByName('face-analysis')[0];
      if (measure) {
        const analysisTime = measure.duration;
        this.recordMetric('faceAnalysisTime', analysisTime);
        this.checkAlert('faceAnalysisTime', analysisTime);
        this.sendMetricToAnalytics('faceAnalysisTime', analysisTime, {
          confidence: event.detail?.confidence,
          faceShape: event.detail?.faceShape,
          imageSize: event.detail?.imageSize
        });
      }
    });

    // Model loading performance
    window.addEventListener('modelLoadStart', () => {
      performance.mark('model-load-start');
    });

    window.addEventListener('modelLoadEnd', () => {
      performance.mark('model-load-end');
      performance.measure('model-load', 'model-load-start', 'model-load-end');
      
      const measure = performance.getEntriesByName('model-load')[0];
      if (measure) {
        this.recordMetric('modelLoadTime', measure.duration);
        this.sendMetricToAnalytics('modelLoadTime', measure.duration);
      }
    });

    // Memory usage monitoring
    if ('memory' in performance) {
      setInterval(() => {
        const memoryInfo = (performance as any).memory;
        if (memoryInfo) {
          const memoryUsage = memoryInfo.usedJSHeapSize;
          this.recordMetric('memoryUsage', memoryUsage);
          this.checkAlert('memoryUsage', memoryUsage);
          
          // Only send memory metrics periodically to avoid spam
          if (Date.now() % 30000 < 1000) { // Every 30 seconds
            this.sendMetricToAnalytics('memoryUsage', memoryUsage);
          }
        }
      }, 5000); // Check every 5 seconds
    }

    // Network performance
    this.monitorNetworkPerformance();
  }

  /**
   * Setup real-time monitoring
   */
  private setupRealTimeMonitoring(): void {
    // Resource loading monitoring
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.analyzeResourcePerformance(entry);
        });
      });
      
      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.set('resource', resourceObserver);
      } catch (error) {
        console.warn('Resource observer not supported');
      }
    }

    // Long task monitoring
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordMetric('longTask', entry.duration);
          this.sendMetricToAnalytics('longTask', entry.duration, {
            attribution: entry.attribution?.[0]?.name
          });
        });
      });
      
      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.set('longtask', longTaskObserver);
      } catch (error) {
        console.warn('Long task observer not supported');
      }
    }

    // User interaction monitoring
    this.setupUserInteractionMonitoring();
  }

  /**
   * Setup periodic reporting
   */
  private setupPeriodicReporting(): void {
    // Send performance summary every 30 seconds
    setInterval(() => {
      this.sendPerformanceSummary();
    }, 30000);

    // Send detailed report every 5 minutes
    setInterval(() => {
      this.sendDetailedReport();
    }, 300000);

    // Page unload reporting
    window.addEventListener('beforeunload', () => {
      this.sendFinalReport();
    });

    // Visibility change reporting
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.sendSessionReport();
      }
    });
  }

  /**
   * Monitor network performance
   */
  private monitorNetworkPerformance(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const connectionInfo: ConnectionInfo = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };

      this.sendMetricToAnalytics('networkInfo', 0, connectionInfo);

      // Monitor connection changes
      connection.addEventListener('change', () => {
        this.sendMetricToAnalytics('networkChange', 0, {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        });
      });
    }
  }

  /**
   * Setup user interaction monitoring
   */
  private setupUserInteractionMonitoring(): void {
    let interactionCount = 0;
    let lastInteractionTime = performance.now();

    const trackInteraction = (type: string) => {
      const now = performance.now();
      const timeSinceLastInteraction = now - lastInteractionTime;
      
      interactionCount++;
      lastInteractionTime = now;

      // Track engagement patterns
      if (interactionCount % 10 === 0) { // Every 10 interactions
        this.sendMetricToAnalytics('userEngagement', interactionCount, {
          interactionType: type,
          timeSinceLastInteraction,
          sessionDuration: now - this.monitoringStartTime
        });
      }
    };

    ['click', 'keydown', 'touchstart', 'scroll'].forEach(eventType => {
      document.addEventListener(eventType, () => trackInteraction(eventType), { passive: true });
    });
  }

  /**
   * Analyze resource performance
   */
  private analyzeResourcePerformance(entry: any): void {
    const resourceType = this.getResourceType(entry.name);
    const loadTime = entry.responseEnd - entry.startTime;
    const transferSize = entry.transferSize || 0;

    // Alert on slow resources
    if (loadTime > 2000) { // 2 seconds
      this.createAlert('slowResource', loadTime, 2000, 'medium', 
        `Slow ${resourceType} resource: ${entry.name}`, {
          resourceType,
          transferSize,
          url: entry.name
        });
    }

    // Alert on large resources
    if (transferSize > 1024 * 1024) { // 1MB
      this.createAlert('largeResource', transferSize, 1024 * 1024, 'low',
        `Large ${resourceType} resource: ${transferSize} bytes`, {
          resourceType,
          loadTime,
          url: entry.name
        });
    }

    // Periodic resource metrics
    if (Math.random() < 0.1) { // Sample 10% of resources
      this.sendMetricToAnalytics('resourcePerformance', loadTime, {
        resourceType,
        transferSize,
        url: entry.name.substring(0, 100) // Truncate URL
      });
    }
  }

  /**
   * Record metric value
   */
  private recordMetric(name: string, value: number): void {
    this.metrics.set(name, value);
    this.metrics.set(`${name}_timestamp`, Date.now());
  }

  /**
   * Check if metric triggers alert
   */
  private checkAlert(metric: string, value: number): void {
    const threshold = this.config.alertThresholds[metric as keyof AlertThresholds];
    if (threshold && value > threshold) {
      const severity = this.getAlertSeverity(metric, value, threshold);
      this.createAlert(metric, value, threshold, severity, 
        `${metric} exceeded threshold: ${value} > ${threshold}`);
    }
  }

  /**
   * Create performance alert
   */
  private createAlert(
    metric: string, 
    value: number, 
    threshold: number, 
    severity: 'low' | 'medium' | 'high' | 'critical',
    description: string,
    context: Record<string, any> = {}
  ): void {
    const alert: PerformanceAlert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date(),
      metric,
      value,
      threshold,
      severity,
      description,
      context: {
        ...context,
        sessionId: this.sessionId,
        url: window.location.href,
        userAgent: navigator.userAgent
      }
    };

    this.alerts.push(alert);

    // Send to monitoring service
    this.sendAlert(alert);

    // Log locally for development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Performance Alert:', alert);
    }
  }

  /**
   * Send metric to analytics
   */
  private sendMetricToAnalytics(
    metric: string, 
    value: number, 
    context: Record<string, any> = {}
  ): void {
    if (typeof window.posthog !== 'undefined') {
      window.posthog.capture('performance_metric', {
        metric_name: metric,
        metric_value: value,
        session_id: this.sessionId,
        device_type: this.getDeviceType(),
        connection_type: this.getConnectionType(),
        ...context
      });
    }
  }

  /**
   * Send performance alert
   */
  private sendAlert(alert: PerformanceAlert): void {
    if (typeof window.posthog !== 'undefined') {
      window.posthog.capture('performance_alert', {
        alert_id: alert.id,
        metric: alert.metric,
        value: alert.value,
        threshold: alert.threshold,
        severity: alert.severity,
        description: alert.description,
        context: alert.context
      });
    }

    // Trigger custom event for UI handling
    window.dispatchEvent(new CustomEvent('performanceAlert', {
      detail: alert
    }));
  }

  /**
   * Send performance summary
   */
  private sendPerformanceSummary(): void {
    const summary = {
      sessionId: this.sessionId,
      sessionDuration: performance.now() - this.monitoringStartTime,
      metricCount: this.metrics.size,
      alertCount: this.alerts.length,
      currentMetrics: Object.fromEntries(this.metrics),
      deviceInfo: this.getDeviceInfo(),
      connectionInfo: this.getConnectionInfo()
    };

    this.sendMetricToAnalytics('performanceSummary', 0, summary);
  }

  /**
   * Send detailed performance report
   */
  private sendDetailedReport(): void {
    const report = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      metrics: Object.fromEntries(this.metrics),
      alerts: this.alerts.slice(-10), // Last 10 alerts
      memoryInfo: this.getMemoryInfo(),
      timingInfo: this.getTimingInfo(),
      userInteractions: this.getUserInteractionSummary()
    };

    this.sendMetricToAnalytics('detailedPerformanceReport', 0, report);
  }

  /**
   * Send final report on page unload
   */
  private sendFinalReport(): void {
    const finalMetrics = {
      sessionId: this.sessionId,
      totalSessionTime: performance.now() - this.monitoringStartTime,
      finalMetrics: Object.fromEntries(this.metrics),
      totalAlerts: this.alerts.length,
      pageUrl: window.location.href
    };

    // Use sendBeacon for reliable delivery
    if (navigator.sendBeacon && typeof window.posthog !== 'undefined') {
      const data = JSON.stringify({
        event: 'performance_session_end',
        properties: finalMetrics
      });
      
      navigator.sendBeacon('/api/analytics', data);
    }
  }

  /**
   * Send session report
   */
  private sendSessionReport(): void {
    this.sendMetricToAnalytics('sessionReport', 0, {
      sessionId: this.sessionId,
      visibilityState: document.visibilityState,
      sessionDuration: performance.now() - this.monitoringStartTime,
      currentMetrics: Object.fromEntries(this.metrics)
    });
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return {
      lcp: this.metrics.get('lcp'),
      fid: this.metrics.get('fid'),
      cls: this.metrics.get('cls'),
      fcp: this.metrics.get('fcp'),
      ttfb: this.metrics.get('ttfb'),
      faceAnalysisTime: this.metrics.get('faceAnalysisTime'),
      modelLoadTime: this.metrics.get('modelLoadTime'),
      memoryUsage: this.metrics.get('memoryUsage')
    };
  }

  /**
   * Get performance alerts
   */
  getAlerts(timeRange: number = 3600000): PerformanceAlert[] {
    const cutoff = Date.now() - timeRange;
    return this.alerts.filter(alert => alert.timestamp.getTime() > cutoff);
  }

  /**
   * Dispose monitoring
   */
  dispose(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  // Helper methods
  private generateSessionId(): string {
    return `perf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    if (['js'].includes(extension || '')) return 'script';
    if (['css'].includes(extension || '')) return 'stylesheet';
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension || '')) return 'image';
    if (['woff', 'woff2', 'ttf', 'otf'].includes(extension || '')) return 'font';
    return 'other';
  }

  private getAlertSeverity(
    metric: string, 
    value: number, 
    threshold: number
  ): 'low' | 'medium' | 'high' | 'critical' {
    const ratio = value / threshold;
    
    if (ratio > 3) return 'critical';
    if (ratio > 2) return 'high';
    if (ratio > 1.5) return 'medium';
    return 'low';
  }

  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getConnectionType(): string {
    if ('connection' in navigator) {
      return (navigator as any).connection?.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  private getDeviceInfo(): DeviceInfo {
    return {
      type: this.getDeviceType() as 'mobile' | 'tablet' | 'desktop',
      memory: (navigator as any).deviceMemory,
      cores: navigator.hardwareConcurrency,
      pixelRatio: window.devicePixelRatio,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      userAgent: navigator.userAgent
    };
  }

  private getConnectionInfo(): ConnectionInfo {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData
      };
    }
    return {};
  }

  private getMemoryInfo(): any {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  private getTimingInfo(): any {
    const timing = performance.timing;
    return {
      navigationStart: timing.navigationStart,
      loadEventEnd: timing.loadEventEnd,
      domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
      responseEnd: timing.responseEnd
    };
  }

  private getUserInteractionSummary(): any {
    // This would track user interactions over time
    return {
      totalInteractions: 0, // Would be tracked
      averageTimeBeforeFirstInteraction: 0,
      bounceRate: 0
    };
  }
}

// Export singleton instance
export const performanceMonitoring = PerformanceMonitoringManager.getInstance();