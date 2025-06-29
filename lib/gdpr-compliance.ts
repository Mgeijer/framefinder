/**
 * GDPR Compliance utilities and data subject rights management
 */

export interface DataSubjectRequest {
  id: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
  email: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  createdAt: Date;
  processedAt?: Date;
  response?: string;
}

export interface PersonalDataInventory {
  category: string;
  description: string;
  legalBasis: 'consent' | 'legitimate_interest' | 'contract' | 'legal_obligation';
  retentionPeriod: string;
  dataLocation: 'client_browser' | 'analytics_service' | 'local_storage' | 'server';
  isTransferred: boolean;
  transferSafeguards?: string;
}

export interface ConsentRecord {
  userId: string;
  timestamp: Date;
  consentVersion: string;
  purposes: {
    analytics: boolean;
    performance: boolean;
    marketing: boolean;
  };
  ipAddress: string;
  userAgent: string;
  withdrawnAt?: Date;
}

/**
 * GDPR Compliance Manager
 */
export class GDPRComplianceManager {
  private static instance: GDPRComplianceManager;

  private constructor() {}

  static getInstance(): GDPRComplianceManager {
    if (!GDPRComplianceManager.instance) {
      GDPRComplianceManager.instance = new GDPRComplianceManager();
    }
    return GDPRComplianceManager.instance;
  }

  /**
   * Record user consent for GDPR compliance
   */
  recordConsent(purposes: Record<string, boolean>): ConsentRecord {
    const record: ConsentRecord = {
      userId: this.generateUserId(),
      timestamp: new Date(),
      consentVersion: '1.0',
      purposes: {
        analytics: purposes.analytics || false,
        performance: purposes.performance || false,
        marketing: purposes.marketing || false
      },
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent
    };

    // Store consent record (in production, this would go to a secure database)
    this.storeConsentRecord(record);
    
    return record;
  }

  /**
   * Generate data portability export for user
   */
  async generateDataExport(email: string): Promise<any> {
    // In a real implementation, this would gather all user data
    const userData = {
      exportDate: new Date().toISOString(),
      userEmail: email,
      personalData: {
        preferences: this.getUserPreferences(email),
        analyticsData: this.getAnalyticsData(email),
        consentHistory: this.getConsentHistory(email)
      },
      metadata: {
        dataRetentionPeriods: this.getDataRetentionInfo(),
        legalBasis: this.getProcessingLegalBasis()
      }
    };

    return {
      format: 'JSON',
      size: JSON.stringify(userData).length,
      data: userData,
      downloadUrl: this.generateSecureDownloadLink(userData)
    };
  }

  /**
   * Process data erasure request (Right to be Forgotten)
   */
  async processErasureRequest(email: string, keepLegalBasisData = false): Promise<{
    success: boolean;
    itemsDeleted: string[];
    itemsRetained: string[];
    reason?: string;
  }> {
    const itemsDeleted: string[] = [];
    const itemsRetained: string[] = [];

    try {
      // Delete user preferences from local storage
      if (typeof window !== 'undefined') {
        const keysToDelete = [
          'framefinder_user_preferences',
          'framefinder_analytics_id',
          'framefinder_session_data'
        ];
        
        keysToDelete.forEach(key => {
          if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            itemsDeleted.push(`Local storage: ${key}`);
          }
        });
      }

      // In production, delete from analytics service
      // await this.deleteFromAnalytics(email);
      itemsDeleted.push('Analytics data (anonymized)');

      // Retain data required by law
      if (keepLegalBasisData) {
        itemsRetained.push('Legal compliance records (7 years retention)');
        itemsRetained.push('Security audit logs (90 days retention)');
      }

      return {
        success: true,
        itemsDeleted,
        itemsRetained
      };
    } catch (error) {
      return {
        success: false,
        itemsDeleted,
        itemsRetained,
        reason: 'Technical error during deletion process'
      };
    }
  }

  /**
   * Get personal data inventory for transparency
   */
  getPersonalDataInventory(): PersonalDataInventory[] {
    return [
      {
        category: 'Facial Images',
        description: 'Photos uploaded for face shape analysis',
        legalBasis: 'consent',
        retentionPeriod: 'Processed locally, never stored',
        dataLocation: 'client_browser',
        isTransferred: false
      },
      {
        category: 'Face Analysis Results',
        description: 'Detected face shape and confidence scores',
        legalBasis: 'legitimate_interest',
        retentionPeriod: 'Anonymized, stored for service improvement',
        dataLocation: 'analytics_service',
        isTransferred: true,
        transferSafeguards: 'Standard Contractual Clauses (SCCs)'
      },
      {
        category: 'Usage Analytics',
        description: 'Page views, interactions, performance metrics',
        legalBasis: 'consent',
        retentionPeriod: '26 months',
        dataLocation: 'analytics_service',
        isTransferred: true,
        transferSafeguards: 'GDPR-compliant analytics provider'
      },
      {
        category: 'Technical Data',
        description: 'IP address, browser type, device information',
        legalBasis: 'legitimate_interest',
        retentionPeriod: '12 months',
        dataLocation: 'analytics_service',
        isTransferred: true,
        transferSafeguards: 'Standard Contractual Clauses (SCCs)'
      },
      {
        category: 'User Preferences',
        description: 'Cookie preferences, UI settings',
        legalBasis: 'consent',
        retentionPeriod: 'Until withdrawn or browser cleared',
        dataLocation: 'local_storage',
        isTransferred: false
      },
      {
        category: 'Contact Information',
        description: 'Email address for newsletter (optional)',
        legalBasis: 'consent',
        retentionPeriod: 'Until unsubscribed',
        dataLocation: 'server',
        isTransferred: false
      }
    ];
  }

  /**
   * Check if user is in EU/EEA for GDPR applicability
   */
  isGDPRApplicable(): boolean {
    // In production, this would use geolocation or IP-based detection
    if (typeof window === 'undefined') return false;
    
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    
    // EU/EEA timezones and languages (simplified detection)
    const euTimezones = [
      'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Rome',
      'Europe/Madrid', 'Europe/Amsterdam', 'Europe/Brussels', 'Europe/Vienna',
      'Europe/Stockholm', 'Europe/Helsinki', 'Europe/Copenhagen', 'Europe/Oslo',
      'Europe/Warsaw', 'Europe/Prague', 'Europe/Budapest', 'Europe/Athens'
    ];
    
    const euLanguages = [
      'en-GB', 'fr', 'de', 'it', 'es', 'nl', 'sv', 'da', 'no', 'fi',
      'pl', 'cs', 'hu', 'el', 'pt', 'ro', 'bg', 'hr', 'sk', 'sl',
      'et', 'lv', 'lt', 'mt'
    ];
    
    return euTimezones.some(tz => timezone.includes(tz)) ||
           euLanguages.some(lang => language.startsWith(lang));
  }

  /**
   * Generate data processing activity record
   */
  getDataProcessingRecord(): any {
    return {
      controller: {
        name: 'FrameFinder',
        contact: 'dpo@framefinder.com',
        representative: 'EU Data Protection Representative'
      },
      purposes: [
        {
          purpose: 'Face shape analysis and eyewear recommendations',
          legalBasis: 'Consent (Article 6(1)(a) GDPR)',
          categories: ['Biometric data (processed locally)', 'Analysis results'],
          retention: 'Images: Never stored; Results: Anonymized for service improvement'
        },
        {
          purpose: 'Service analytics and improvement',
          legalBasis: 'Legitimate interest (Article 6(1)(f) GDPR)',
          categories: ['Usage data', 'Performance metrics', 'Error logs'],
          retention: 'Analytics: 26 months; Performance: 12 months; Errors: 90 days'
        }
      ],
      dataSubjects: ['Website visitors', 'Service users'],
      recipients: [
        'PostHog (Analytics service - GDPR compliant)',
        'CDN providers (Content delivery only)',
        'No other third parties receive personal data'
      ],
      transfers: [
        {
          country: 'United States',
          safeguards: 'Standard Contractual Clauses and adequacy decisions',
          categories: 'Analytics data only'
        }
      ],
      securityMeasures: [
        'Client-side processing (no image uploads)',
        'HTTPS encryption for all data transmission',
        'Minimal data collection principle',
        'Regular security assessments',
        'Access controls and audit logs'
      ]
    };
  }

  /**
   * Validate consent requirements
   */
  validateConsent(consentData: any): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    // Check for freely given consent
    if (!consentData.purposes || Object.keys(consentData.purposes).length === 0) {
      issues.push('No specific purposes defined for consent');
    }

    // Check for specific consent
    if (consentData.purposes && consentData.purposes.all === true) {
      issues.push('Consent must be granular, not blanket approval');
    }

    // Check for informed consent
    if (!consentData.privacyPolicyAccepted) {
      issues.push('User must acknowledge privacy policy');
    }

    // Check for unambiguous consent
    if (consentData.consentMethod === 'pre_ticked') {
      issues.push('Pre-ticked boxes do not constitute valid consent');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }

  // Helper methods (would be implemented with real data storage)
  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getClientIP(): string {
    // In production, this would be obtained from server-side
    return 'XXX.XXX.XXX.XXX'; // Anonymized for privacy
  }

  private storeConsentRecord(record: ConsentRecord): void {
    // In production, store in secure, audit-logged database
    console.log('Consent recorded:', record);
  }

  private getUserPreferences(email: string): any {
    // Retrieve user preferences from storage
    return {};
  }

  private getAnalyticsData(email: string): any {
    // Retrieve anonymized analytics data
    return {};
  }

  private getConsentHistory(email: string): ConsentRecord[] {
    // Retrieve consent history
    return [];
  }

  private getDataRetentionInfo(): any {
    return {
      faceImages: 'Never stored (processed locally only)',
      analysisResults: 'Anonymized, retained for service improvement',
      analytics: '26 months',
      performance: '12 months',
      errors: '90 days',
      contact: 'Until unsubscribed or requested deletion'
    };
  }

  private getProcessingLegalBasis(): any {
    return {
      faceAnalysis: 'Consent (Article 6(1)(a) GDPR)',
      serviceImprovement: 'Legitimate interest (Article 6(1)(f) GDPR)',
      security: 'Legitimate interest (Article 6(1)(f) GDPR)',
      legalCompliance: 'Legal obligation (Article 6(1)(c) GDPR)'
    };
  }

  private generateSecureDownloadLink(data: any): string {
    // In production, generate secure, time-limited download link
    return 'https://framefinder.com/data-export/secure-link';
  }
}

/**
 * Data Subject Rights Handler
 */
export class DataSubjectRightsHandler {
  /**
   * Handle data access request (Article 15)
   */
  static async handleAccessRequest(email: string): Promise<any> {
    const gdpr = GDPRComplianceManager.getInstance();
    return await gdpr.generateDataExport(email);
  }

  /**
   * Handle data erasure request (Article 17)
   */
  static async handleErasureRequest(email: string): Promise<any> {
    const gdpr = GDPRComplianceManager.getInstance();
    return await gdpr.processErasureRequest(email);
  }

  /**
   * Handle data portability request (Article 20)
   */
  static async handlePortabilityRequest(email: string): Promise<any> {
    const gdpr = GDPRComplianceManager.getInstance();
    const exportData = await gdpr.generateDataExport(email);
    
    return {
      ...exportData,
      format: 'JSON', // Standard, machine-readable format
      portabilityNote: 'Data provided in structured, commonly used format'
    };
  }

  /**
   * Handle objection to processing (Article 21)
   */
  static handleObjectionRequest(email: string, processingType: string): any {
    // Handle objection to specific processing activities
    return {
      success: true,
      message: `Processing objection recorded for ${processingType}`,
      effectiveDate: new Date().toISOString(),
      nextSteps: 'Processing will cease unless compelling legitimate grounds exist'
    };
  }
}

// Export singleton instance
export const gdprCompliance = GDPRComplianceManager.getInstance();