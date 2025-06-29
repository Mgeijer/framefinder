/**
 * Error monitoring and reporting for FrameFinder
 * Integrates with Sentry and provides comprehensive error tracking
 */

export interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  type: 'javascript' | 'network' | 'face_analysis' | 'user_action' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  context: ErrorContext;
  timestamp: Date;
  fingerprint: string;
  user?: UserInfo;
}

export interface ErrorContext {
  url: string;
  userAgent: string;
  viewport: string;
  component?: string;
  action?: string;
  faceAnalysisState?: string;
  imageInfo?: {
    size: number;
    type: string;
    dimensions?: string;
  };
  performance?: {
    memory: number;
    timing: any;
  };
  sessionInfo?: {
    id: string;
    duration: number;
    pageViews: number;
  };
}

export interface UserInfo {
  id?: string;
  email?: string;
  preferences?: Record<string, any>;
  isAnonymous: boolean;
}

export interface ErrorMetrics {
  totalErrors: number;
  errorRate: number;
  criticalErrors: number;
  userAffected: number;
  topErrors: Array<{
    message: string;
    count: number;
    lastSeen: Date;
  }>;
  errorsByType: Record<string, number>;
  errorsByPage: Record<string, number>;
}

/**
 * Error Monitoring Manager
 * Handles error collection, reporting, and analysis
 */
export class ErrorMonitoringManager {
  private static instance: ErrorMonitoringManager;
  private sentryInitialized = false;
  private errorQueue: ErrorReport[] = [];
  private sessionErrors: Map<string, number> = new Map();
  private lastErrorTime = 0;
  private errorThreshold = 10; // Max errors per minute

  private constructor() {
    this.initializeSentry();
    this.setupGlobalErrorHandlers();
    this.setupUnhandledRejectionHandler();
    this.setupCustomErrorHandlers();
  }

  static getInstance(): ErrorMonitoringManager {
    if (!ErrorMonitoringManager.instance) {
      ErrorMonitoringManager.instance = new ErrorMonitoringManager();
    }
    return ErrorMonitoringManager.instance;
  }

  /**
   * Initialize Sentry error monitoring
   */
  private initializeSentry(): void {
    if (typeof window === 'undefined') return;

    try {
      // Dynamic import for Sentry to avoid blocking initial load
      import('@sentry/browser').then(({ init, getCurrentScope }) => {
        init({
          dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
          environment: process.env.NODE_ENV,
          release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
          integrations: [
            // Browser integrations
          ],
          tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
          beforeSend: (event) => this.filterSentryEvent(event),
          beforeBreadcrumb: (breadcrumb) => this.filterSentryBreadcrumb(breadcrumb)
        });

        const scope = getCurrentScope();
        scope.setTag('component', 'face-analysis');
        scope.setContext('browser', {
          name: this.getBrowserName(),
          version: this.getBrowserVersion(),
          mobile: this.isMobile()
        });

        this.sentryInitialized = true;
        this.flushErrorQueue();
      }).catch(error => {
        console.warn('Failed to initialize Sentry:', error);
      });
    } catch (error) {
      console.warn('Sentry initialization error:', error);
    }
  }

  /**
   * Setup global error handlers
   */
  private setupGlobalErrorHandlers(): void {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
        type: 'javascript',
        severity: this.determineSeverity(event.error),
        context: {
          ...this.getBaseContext(),
          component: 'global',
          action: 'script_error'
        } as any
      });
    });

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        const target = event.target as HTMLElement;
        this.captureError({
          message: `Failed to load resource: ${target.tagName}`,
          type: 'network',
          severity: 'medium',
          context: {
            ...this.getBaseContext(),
            component: 'resource_loader',
            action: 'resource_load_failed'
          } as any
        });
      }
    }, true);
  }

  /**
   * Setup unhandled promise rejection handler
   */
  private setupUnhandledRejectionHandler(): void {
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        type: 'javascript',
        severity: 'high',
        context: {
          ...this.getBaseContext(),
          component: 'promise',
          action: 'unhandled_rejection'
        } as any
      });
    });
  }

  /**
   * Setup custom error handlers for specific components
   */
  private setupCustomErrorHandlers(): void {
    // Face analysis errors
    window.addEventListener('faceAnalysisError', (event: any) => {
      this.captureFaceAnalysisError(event.detail);
    });

    // Network errors
    window.addEventListener('networkError', (event: any) => {
      this.captureNetworkError(event.detail);
    });

    // User action errors
    window.addEventListener('userActionError', (event: any) => {
      this.captureUserActionError(event.detail);
    });
  }

  /**
   * Capture and report an error
   */
  captureError(errorData: Partial<ErrorReport>): void {
    // Rate limiting
    if (this.isRateLimited()) {
      return;
    }

    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      message: errorData.message || 'Unknown error',
      stack: errorData.stack,
      type: errorData.type || 'javascript',
      severity: errorData.severity || 'medium',
      context: {
        ...this.getBaseContext(),
        ...errorData.context
      } as any,
      timestamp: new Date(),
      fingerprint: this.generateFingerprint(errorData),
      user: this.getUserInfo()
    };

    // Add to session tracking
    this.trackSessionError(errorReport);

    // Queue for processing
    this.errorQueue.push(errorReport);

    // Send to monitoring services
    this.sendToSentry(errorReport);
    this.sendToAnalytics(errorReport);

    // Local logging for development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error captured:', errorReport);
    }

    // Trigger error event for UI handling
    this.triggerErrorEvent(errorReport);
  }

  /**
   * Capture face analysis specific errors
   */
  captureFaceAnalysisError(details: any): void {
    this.captureError({
      message: `Face analysis failed: ${details.error}`,
      type: 'face_analysis',
      severity: this.getFaceAnalysisSeverity(details.errorType),
      context: {
        component: 'face_analysis',
        action: 'analyze_face'
      } as any
    });
  }

  /**
   * Capture network errors
   */
  captureNetworkError(details: any): void {
    this.captureError({
      message: `Network error: ${details.message}`,
      type: 'network',
      severity: this.getNetworkSeverity(details.status),
      context: {
        component: 'network',
        action: details.action
      } as any
    });
  }

  /**
   * Capture user action errors
   */
  captureUserActionError(details: any): void {
    this.captureError({
      message: `User action failed: ${details.action}`,
      type: 'user_action',
      severity: 'low',
      context: {
        component: details.component,
        action: details.action
      } as any
    });
  }

  /**
   * Capture security-related errors
   */
  captureSecurityError(details: any): void {
    this.captureError({
      message: `Security issue: ${details.message}`,
      type: 'security',
      severity: 'critical',
      context: {
        component: 'security',
        action: details.action
      } as any
    });
  }

  /**
   * Get error metrics and analytics
   */
  getErrorMetrics(timeRange: '1h' | '24h' | '7d' | '30d' = '24h'): ErrorMetrics {
    const now = new Date();
    const timeRangeMs = this.getTimeRangeMs(timeRange);
    const cutoff = new Date(now.getTime() - timeRangeMs);

    const recentErrors = this.errorQueue.filter(error => error.timestamp >= cutoff);

    // Group errors by message
    const errorGroups = new Map<string, ErrorReport[]>();
    recentErrors.forEach(error => {
      const key = error.fingerprint;
      if (!errorGroups.has(key)) {
        errorGroups.set(key, []);
      }
      errorGroups.get(key)!.push(error);
    });

    // Calculate metrics
    const totalErrors = recentErrors.length;
    const criticalErrors = recentErrors.filter(e => e.severity === 'critical').length;
    const uniqueUsers = new Set(recentErrors.map(e => e.user?.id || 'anonymous')).size;

    // Top errors
    const topErrors = Array.from(errorGroups.entries())
      .map(([fingerprint, errors]) => ({
        message: errors[0].message,
        count: errors.length,
        lastSeen: errors.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0].timestamp
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Errors by type
    const errorsByType: Record<string, number> = {};
    recentErrors.forEach(error => {
      errorsByType[error.type] = (errorsByType[error.type] || 0) + 1;
    });

    // Errors by page
    const errorsByPage: Record<string, number> = {};
    recentErrors.forEach(error => {
      const page = this.getPageFromUrl(error.context.url);
      errorsByPage[page] = (errorsByPage[page] || 0) + 1;
    });

    return {
      totalErrors,
      errorRate: totalErrors / Math.max(uniqueUsers, 1),
      criticalErrors,
      userAffected: uniqueUsers,
      topErrors,
      errorsByType,
      errorsByPage
    };
  }

  /**
   * Generate error report for dashboard
   */
  generateErrorReport(timeRange: '1h' | '24h' | '7d' | '30d' = '24h'): string {
    const metrics = this.getErrorMetrics(timeRange);
    
    let report = `# Error Monitoring Report (${timeRange})\n\n`;
    report += `**Generated**: ${new Date().toLocaleString()}\n`;
    report += `**Time Range**: ${timeRange}\n\n`;

    // Summary
    report += `## Summary\n\n`;
    report += `- **Total Errors**: ${metrics.totalErrors}\n`;
    report += `- **Critical Errors**: ${metrics.criticalErrors}\n`;
    report += `- **Users Affected**: ${metrics.userAffected}\n`;
    report += `- **Error Rate**: ${metrics.errorRate.toFixed(2)} errors/user\n\n`;

    // Error status
    let status = 'Good';
    if (metrics.criticalErrors > 0) status = 'Critical';
    else if (metrics.errorRate > 5) status = 'High';
    else if (metrics.errorRate > 1) status = 'Medium';

    report += `**Status**: ${status}\n\n`;

    // Top errors
    if (metrics.topErrors.length > 0) {
      report += `## Top Errors\n\n`;
      metrics.topErrors.forEach((error, index) => {
        report += `${index + 1}. **${error.message}** (${error.count} occurrences)\n`;
        report += `   - Last seen: ${error.lastSeen.toLocaleString()}\n\n`;
      });
    }

    // Errors by type
    report += `## Errors by Type\n\n`;
    Object.entries(metrics.errorsByType).forEach(([type, count]) => {
      report += `- **${type}**: ${count}\n`;
    });

    // Errors by page
    if (Object.keys(metrics.errorsByPage).length > 0) {
      report += `\n## Errors by Page\n\n`;
      Object.entries(metrics.errorsByPage)
        .sort(([,a], [,b]) => b - a)
        .forEach(([page, count]) => {
          report += `- **${page}**: ${count}\n`;
        });
    }

    return report;
  }

  // Private helper methods
  private getBaseContext(): Partial<ErrorContext> {
    return {
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      performance: {
        memory: (performance as any).memory?.usedJSHeapSize || 0,
        timing: performance.timing
      },
      sessionInfo: {
        id: this.getSessionId(),
        duration: Date.now() - this.getSessionStartTime(),
        pageViews: this.getPageViewCount()
      }
    };
  }

  private getUserInfo(): UserInfo {
    return {
      isAnonymous: true,
      preferences: this.getUserPreferences()
    };
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  }

  private generateFingerprint(errorData: Partial<ErrorReport>): string {
    const key = `${errorData.type}_${errorData.message}_${errorData.context?.component}`;
    return btoa(key).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  }

  private determineSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
    if (!error) return 'low';
    
    const message = error.message.toLowerCase();
    
    if (message.includes('security') || message.includes('cors')) {
      return 'critical';
    }
    
    if (message.includes('network') || message.includes('failed to fetch')) {
      return 'high';
    }
    
    if (message.includes('permission') || message.includes('access')) {
      return 'medium';
    }
    
    return 'low';
  }

  private getFaceAnalysisSeverity(errorType: string): 'low' | 'medium' | 'high' | 'critical' {
    switch (errorType) {
      case 'model_load_failed':
        return 'critical';
      case 'no_face_detected':
        return 'low';
      case 'analysis_timeout':
        return 'medium';
      case 'invalid_image':
        return 'low';
      default:
        return 'medium';
    }
  }

  private getNetworkSeverity(status: number): 'low' | 'medium' | 'high' | 'critical' {
    if (status >= 500) return 'critical';
    if (status >= 400) return 'high';
    if (status >= 300) return 'medium';
    return 'low';
  }

  private isRateLimited(): boolean {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    
    if (now - this.lastErrorTime > oneMinute) {
      this.sessionErrors.clear();
      this.lastErrorTime = now;
    }
    
    const currentMinute = Math.floor(now / oneMinute);
    const errorCount = this.sessionErrors.get(currentMinute.toString()) || 0;
    
    if (errorCount >= this.errorThreshold) {
      return true;
    }
    
    this.sessionErrors.set(currentMinute.toString(), errorCount + 1);
    return false;
  }

  private trackSessionError(error: ErrorReport): void {
    // Track errors for this session
    const sessionId = this.getSessionId();
    const sessionKey = `session_${sessionId}`;
    const sessionErrors = parseInt(localStorage.getItem(sessionKey) || '0');
    localStorage.setItem(sessionKey, (sessionErrors + 1).toString());
  }

  private sendToSentry(error: ErrorReport): void {
    if (!this.sentryInitialized) {
      return;
    }

    try {
      import('@sentry/browser').then(({ captureException, withScope }) => {
        withScope((scope) => {
          scope.setTag('error_type', error.type);
          scope.setLevel(this.mapSeverityToSentryLevel(error.severity));
          scope.setContext('error_context', error.context as any);
          scope.setFingerprint([error.fingerprint]);
          
          if (error.user) {
            scope.setUser(error.user);
          }
          
          const exception = new Error(error.message);
          if (error.stack) {
            exception.stack = error.stack;
          }
          
          captureException(exception);
        });
      });
    } catch (err) {
      console.warn('Failed to send error to Sentry:', err);
    }
  }

  private sendToAnalytics(error: ErrorReport): void {
    if (typeof window.posthog !== 'undefined') {
      window.posthog.capture('error_occurred', {
        error_type: error.type,
        error_severity: error.severity,
        error_message: error.message,
        error_fingerprint: error.fingerprint,
        component: error.context.component,
        action: error.context.action
      });
    }
  }

  private triggerErrorEvent(error: ErrorReport): void {
    window.dispatchEvent(new CustomEvent('errorCaptured', {
      detail: error
    }));
  }

  private flushErrorQueue(): void {
    this.errorQueue.forEach(error => {
      this.sendToSentry(error);
    });
  }

  private filterSentryEvent(event: any): any {
    // Filter out noise and PII
    if (event.exception?.values?.[0]?.value?.includes('Script error')) {
      return null; // Filter out generic script errors
    }
    
    return event;
  }

  private filterSentryBreadcrumb(breadcrumb: any): any {
    // Filter sensitive breadcrumbs
    if (breadcrumb.category === 'console' && breadcrumb.level === 'log') {
      return null;
    }
    
    return breadcrumb;
  }

  private mapSeverityToSentryLevel(severity: string): any {
    switch (severity) {
      case 'critical': return 'fatal';
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'error';
    }
  }

  private getBrowserName(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private getBrowserVersion(): string {
    const userAgent = navigator.userAgent;
    const match = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
    return match ? match[2] : 'Unknown';
  }

  private isMobile(): boolean {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private getTimeRangeMs(timeRange: string): number {
    switch (timeRange) {
      case '1h': return 60 * 60 * 1000;
      case '24h': return 24 * 60 * 60 * 1000;
      case '7d': return 7 * 24 * 60 * 60 * 1000;
      case '30d': return 30 * 24 * 60 * 60 * 1000;
      default: return 24 * 60 * 60 * 1000;
    }
  }

  private getPageFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      return 'unknown';
    }
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('framefinder_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('framefinder_session_id', sessionId);
    }
    return sessionId;
  }

  private getSessionStartTime(): number {
    const startTime = sessionStorage.getItem('framefinder_session_start');
    if (startTime) {
      return parseInt(startTime);
    }
    const now = Date.now();
    sessionStorage.setItem('framefinder_session_start', now.toString());
    return now;
  }

  private getPageViewCount(): number {
    const count = sessionStorage.getItem('framefinder_page_views');
    return count ? parseInt(count) : 1;
  }

  private getUserPreferences(): Record<string, any> {
    try {
      const prefs = localStorage.getItem('framefinder_user_preferences');
      return prefs ? JSON.parse(prefs) : {};
    } catch {
      return {};
    }
  }
}

// Export singleton instance
export const errorMonitoring = ErrorMonitoringManager.getInstance();

// Utility functions for error reporting
export const errorUtils = {
  /**
   * Report a user action error
   */
  reportUserActionError(component: string, action: string, details: any): void {
    window.dispatchEvent(new CustomEvent('userActionError', {
      detail: {
        component,
        action,
        ...details
      }
    }));
  },

  /**
   * Report a face analysis error
   */
  reportFaceAnalysisError(errorType: string, details: any): void {
    window.dispatchEvent(new CustomEvent('faceAnalysisError', {
      detail: {
        errorType,
        error: details.message || 'Face analysis failed',
        ...details
      }
    }));
  },

  /**
   * Report a network error
   */
  reportNetworkError(url: string, method: string, status: number, details: any): void {
    window.dispatchEvent(new CustomEvent('networkError', {
      detail: {
        url,
        method,
        status,
        action: 'network_request',
        message: `${method} ${url} failed with status ${status}`,
        ...details
      }
    }));
  }
};