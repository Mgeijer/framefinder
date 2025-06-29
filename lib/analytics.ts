import posthog from 'posthog-js';
import { AnalyticsEvent, UserSession, PerformanceMetrics } from '../types';

// Initialize PostHog
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_test', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
    autocapture: false,
    disable_session_recording: true,
    opt_out_capturing_by_default: false,
    capture_pageview: false // We'll handle this manually
  });
}

class AnalyticsService {
  private sessionId: string;
  private userId?: string;
  private sessionStartTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = Date.now();
    this.loadUserFromStorage();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadUserFromStorage(): void {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('framefinder_user_id');
      if (storedUserId) {
        this.userId = storedUserId;
        posthog.identify(this.userId);
      }
    }
  }

  private saveUserToStorage(): void {
    if (typeof window !== 'undefined' && this.userId) {
      localStorage.setItem('framefinder_user_id', this.userId);
    }
  }

  // Core tracking methods
  trackEvent(event: string, properties?: Record<string, any>): void {
    if (typeof window === 'undefined') return;

    const eventData: AnalyticsEvent = {
      event,
      properties: {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        ...properties
      },
      userId: this.userId,
      sessionId: this.sessionId
    };

    posthog.capture(event, eventData.properties);
  }

  trackPageView(pageName: string, properties?: Record<string, any>): void {
    this.trackEvent('page_view', {
      page_name: pageName,
      ...properties
    });
  }

  // User journey tracking
  trackUserJourney(step: string, properties?: Record<string, any>): void {
    this.trackEvent('user_journey_step', {
      step,
      journey_progress: this.getJourneyProgress(),
      ...properties
    });
  }

  private getJourneyProgress(): number {
    const journeySteps = [
      'landing_page_view',
      'analysis_started',
      'photo_uploaded',
      'analysis_completed',
      'recommendations_viewed',
      'results_shared'
    ];
    
    // This would be tracked in session storage or state
    const completedSteps = parseInt(localStorage.getItem('journey_progress') || '0');
    return (completedSteps / journeySteps.length) * 100;
  }

  // Face analysis tracking
  trackAnalysisStart(): void {
    this.trackEvent('face_analysis_started', {
      timestamp: Date.now()
    });
  }

  trackPhotoUpload(fileSize: number, fileType: string): void {
    this.trackEvent('photo_uploaded', {
      file_size: fileSize,
      file_type: fileType,
      upload_method: 'file_upload'
    });
  }

  trackCameraCapture(): void {
    this.trackEvent('photo_uploaded', {
      upload_method: 'camera_capture'
    });
  }

  trackAnalysisSuccess(faceShape: string, confidence: number, analysisTime: number): void {
    this.trackEvent('face_analysis_success', {
      face_shape: faceShape,
      confidence: confidence,
      analysis_time: analysisTime,
      timestamp: Date.now()
    });
  }

  trackAnalysisFailure(error: string, analysisTime?: number): void {
    this.trackEvent('face_analysis_failed', {
      error: error,
      analysis_time: analysisTime,
      timestamp: Date.now()
    });
  }

  // Recommendation tracking
  trackRecommendationView(faceShape: string, frameId: string, frameCategory: string): void {
    this.trackEvent('frame_recommendation_viewed', {
      face_shape: faceShape,
      frame_id: frameId,
      frame_category: frameCategory,
      timestamp: Date.now()
    });
  }

  trackRecommendationClick(faceShape: string, frameId: string, frameCategory: string): void {
    this.trackEvent('frame_recommendation_clicked', {
      face_shape: faceShape,
      frame_id: frameId,
      frame_category: frameCategory,
      timestamp: Date.now()
    });
  }

  // User engagement tracking
  trackEngagement(action: string, details?: Record<string, any>): void {
    this.trackEvent('user_engagement', {
      action,
      session_duration: Date.now() - this.sessionStartTime,
      ...details
    });
  }

  trackCTAClick(ctaType: string, location: string): void {
    this.trackEvent('cta_clicked', {
      cta_type: ctaType,
      location: location,
      timestamp: Date.now()
    });
  }

  // Guide and content tracking
  trackGuideView(faceShape?: string): void {
    this.trackEvent('guide_viewed', {
      face_shape: faceShape || 'all',
      timestamp: Date.now()
    });
  }

  trackStyleTipView(tipId: string, category: string): void {
    this.trackEvent('style_tip_viewed', {
      tip_id: tipId,
      category: category,
      timestamp: Date.now()
    });
  }

  // Social sharing tracking
  trackSocialShare(platform: string, faceShape: string): void {
    this.trackEvent('social_share', {
      platform: platform,
      face_shape: faceShape,
      timestamp: Date.now()
    });
  }

  // Performance tracking
  trackPerformance(metrics: PerformanceMetrics): void {
    this.trackEvent('performance_metrics', {
      load_time: metrics.loadTime,
      analysis_time: metrics.analysisTime,
      render_time: metrics.renderTime,
      memory_usage: metrics.memoryUsage,
      error_count: metrics.errors.length,
      timestamp: Date.now()
    });
  }

  // Error tracking
  trackError(error: Error, context: Record<string, any>): void {
    this.trackEvent('error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      context: context,
      timestamp: Date.now()
    });
  }

  // User identification
  identify(userId: string, properties?: Record<string, any>): void {
    this.userId = userId;
    this.saveUserToStorage();
    
    if (typeof window !== 'undefined') {
      posthog.identify(userId, properties);
    }
  }

  // Session management
  startNewSession(): void {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = Date.now();
    
    this.trackEvent('session_started', {
      session_id: this.sessionId,
      timestamp: Date.now()
    });
  }

  endSession(): void {
    const sessionDuration = Date.now() - this.sessionStartTime;
    
    this.trackEvent('session_ended', {
      session_id: this.sessionId,
      session_duration: sessionDuration,
      timestamp: Date.now()
    });
  }

  // A/B testing
  trackExperiment(experimentId: string, variant: string): void {
    this.trackEvent('experiment_viewed', {
      experiment_id: experimentId,
      variant: variant,
      timestamp: Date.now()
    });
  }

  // Conversion tracking
  trackConversion(conversionType: string, value?: number): void {
    this.trackEvent('conversion', {
      conversion_type: conversionType,
      value: value,
      timestamp: Date.now()
    });
  }

  // Newsletter subscription
  trackNewsletterSignup(email: string, preferences: Record<string, boolean>): void {
    this.trackEvent('newsletter_signup', {
      email: email,
      preferences: preferences,
      timestamp: Date.now()
    });
  }

  // Contact form submission
  trackContactSubmission(formType: string): void {
    this.trackEvent('contact_form_submitted', {
      form_type: formType,
      timestamp: Date.now()
    });
  }

  // Reset user (for logout)
  reset(): void {
    this.userId = undefined;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('framefinder_user_id');
      posthog.reset();
    }
  }

  // Get current session info
  getSessionInfo(): UserSession {
    return {
      id: this.sessionId,
      userId: this.userId,
      startTime: this.sessionStartTime,
      lastActivity: Date.now(),
      pageViews: [], // This would be tracked separately
      actions: [], // This would be tracked separately
      preferences: {} // This would be loaded from storage
    };
  }
}

// Export singleton instance
export const analytics = new AnalyticsService(); 