/**
 * Data protection and security measures for FrameFinder
 */

export interface SecurityConfig {
  encryptionEnabled: boolean;
  dataMinimization: boolean;
  anonymization: boolean;
  accessControls: boolean;
  auditLogging: boolean;
}

export interface DataProtectionMetrics {
  dataProcessedLocally: number;
  dataTransmittedToServers: number;
  anonymizedRecords: number;
  securityIncidents: number;
  gdprRequestsProcessed: number;
}

export interface SecurityIncident {
  id: string;
  type: 'data_breach' | 'unauthorized_access' | 'system_compromise' | 'privacy_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedData: string[];
  detectedAt: Date;
  resolvedAt?: Date;
  notificationsSent: boolean;
  mitigationSteps: string[];
}

/**
 * Data Protection Manager
 * Implements privacy by design and data protection by default
 */
export class DataProtectionManager {
  private static instance: DataProtectionManager;
  private securityConfig: SecurityConfig;
  private incidents: SecurityIncident[] = [];

  private constructor() {
    this.securityConfig = {
      encryptionEnabled: true,
      dataMinimization: true,
      anonymization: true,
      accessControls: true,
      auditLogging: true
    };
  }

  static getInstance(): DataProtectionManager {
    if (!DataProtectionManager.instance) {
      DataProtectionManager.instance = new DataProtectionManager();
    }
    return DataProtectionManager.instance;
  }

  /**
   * Anonymize user data for analytics
   */
  anonymizeData(data: Record<string, any>): Record<string, any> {
    const anonymized = { ...data };
    
    // Remove or hash personally identifiable information
    const piiFields = ['email', 'ip', 'userAgent', 'deviceId'];
    
    piiFields.forEach(field => {
      if (anonymized[field]) {
        // Replace with hashed version for analytics while preserving uniqueness
        anonymized[field] = this.hashPII(anonymized[field]);
      }
    });

    // Remove precise timestamps, keep only date
    if (anonymized.timestamp) {
      const date = new Date(anonymized.timestamp);
      anonymized.timestamp = date.toISOString().split('T')[0]; // Keep only date part
    }

    // Remove sensitive facial measurements, keep only final classification
    if (anonymized.faceAnalysis) {
      anonymized.faceAnalysis = {
        shape: anonymized.faceAnalysis.shape,
        confidence: Math.round(anonymized.faceAnalysis.confidence * 10) / 10 // Round to 1 decimal
        // Remove detailed measurements and landmark data
      };
    }

    return anonymized;
  }

  /**
   * Validate data before processing
   */
  validateDataProcessing(data: any, purpose: string): {
    isValid: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check for excessive data collection
    if (data && typeof data === 'object') {
      const dataFields = Object.keys(data);
      
      if (dataFields.length > 20) {
        issues.push('Excessive data collection detected');
        recommendations.push('Implement data minimization principles');
      }

      // Check for sensitive data
      const sensitiveFields = ['ssn', 'creditCard', 'password', 'medicalInfo'];
      const foundSensitive = dataFields.filter(field => 
        sensitiveFields.some(sensitive => field.toLowerCase().includes(sensitive))
      );
      
      if (foundSensitive.length > 0) {
        issues.push(`Sensitive data detected: ${foundSensitive.join(', ')}`);
        recommendations.push('Remove or encrypt sensitive data before processing');
      }
    }

    // Validate purpose limitation
    const allowedPurposes = ['face_analysis', 'service_improvement', 'analytics', 'security'];
    if (!allowedPurposes.includes(purpose)) {
      issues.push(`Invalid processing purpose: ${purpose}`);
      recommendations.push('Ensure processing purpose aligns with privacy policy');
    }

    return {
      isValid: issues.length === 0,
      issues,
      recommendations
    };
  }

  /**
   * Implement data retention policy
   */
  applyRetentionPolicy(dataType: string, createdAt: Date): {
    shouldRetain: boolean;
    action: 'keep' | 'anonymize' | 'delete';
    reason: string;
  } {
    const now = new Date();
    const ageInDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

    const retentionPolicies = {
      face_images: { days: 0, action: 'delete' as const }, // Never stored
      analysis_results: { days: 730, action: 'anonymize' as const }, // 2 years, then anonymize
      analytics_data: { days: 780, action: 'delete' as const }, // 26 months
      performance_data: { days: 365, action: 'delete' as const }, // 1 year
      error_logs: { days: 90, action: 'delete' as const }, // 3 months
      contact_data: { days: 1095, action: 'delete' as const }, // 3 years
      consent_records: { days: 2555, action: 'keep' as const } // 7 years (legal requirement)
    };

    const policy = retentionPolicies[dataType as keyof typeof retentionPolicies];
    
    if (!policy) {
      return {
        shouldRetain: false,
        action: 'delete',
        reason: 'Unknown data type - default to deletion'
      };
    }

    if (ageInDays > policy.days) {
      return {
        shouldRetain: policy.action === 'keep',
        action: policy.action,
        reason: `Data exceeds retention period of ${policy.days} days`
      };
    }

    return {
      shouldRetain: true,
      action: 'keep',
      reason: `Data within retention period (${ageInDays}/${policy.days} days)`
    };
  }

  /**
   * Monitor for security incidents
   */
  detectSecurityIncident(event: any): SecurityIncident | null {
    // Detect suspicious patterns
    const suspiciousPatterns = [
      { pattern: 'excessive_requests', threshold: 100, timeWindow: 60000 }, // 100 requests per minute
      { pattern: 'failed_uploads', threshold: 50, timeWindow: 300000 }, // 50 failed uploads in 5 minutes
      { pattern: 'invalid_data', threshold: 20, timeWindow: 60000 } // 20 validation failures per minute
    ];

    // Check for data exposure risks
    if (event.type === 'data_access' && !event.authorized) {
      return {
        id: this.generateIncidentId(),
        type: 'unauthorized_access',
        severity: 'high',
        description: 'Unauthorized data access attempt detected',
        affectedData: event.dataTypes || ['unknown'],
        detectedAt: new Date(),
        notificationsSent: false,
        mitigationSteps: [
          'Block suspicious IP address',
          'Review access logs',
          'Notify data protection officer'
        ]
      };
    }

    // Check for potential data breaches
    if (event.type === 'data_transmission' && !event.encrypted) {
      return {
        id: this.generateIncidentId(),
        type: 'data_breach',
        severity: 'critical',
        description: 'Unencrypted data transmission detected',
        affectedData: event.dataTypes || ['personal_data'],
        detectedAt: new Date(),
        notificationsSent: false,
        mitigationSteps: [
          'Stop data transmission',
          'Enable encryption',
          'Assess data exposure',
          'Report to supervisory authority if required'
        ]
      };
    }

    return null;
  }

  /**
   * Handle security incident
   */
  handleSecurityIncident(incident: SecurityIncident): void {
    this.incidents.push(incident);
    
    // Immediate response based on severity
    switch (incident.severity) {
      case 'critical':
        this.triggerCriticalResponse(incident);
        break;
      case 'high':
        this.triggerHighSeverityResponse(incident);
        break;
      case 'medium':
        this.triggerMediumSeverityResponse(incident);
        break;
      case 'low':
        this.logIncident(incident);
        break;
    }
  }

  /**
   * Generate data protection impact assessment
   */
  generateDPIA(processingActivity: string): any {
    return {
      assessmentDate: new Date().toISOString(),
      processingActivity,
      dataTypes: this.getDataTypesForActivity(processingActivity),
      riskAssessment: {
        privacyRisks: this.assessPrivacyRisks(processingActivity),
        technicalRisks: this.assessTechnicalRisks(processingActivity),
        organizationalRisks: this.assessOrganizationalRisks(processingActivity)
      },
      mitigationMeasures: this.getMitigationMeasures(processingActivity),
      residualRisk: this.calculateResidualRisk(processingActivity),
      conclusion: this.getDPIAConclusion(processingActivity),
      reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
    };
  }

  /**
   * Audit data processing activities
   */
  auditProcessingActivities(): {
    compliant: boolean;
    findings: string[];
    recommendations: string[];
  } {
    const findings: string[] = [];
    const recommendations: string[] = [];

    // Check encryption implementation
    if (!this.securityConfig.encryptionEnabled) {
      findings.push('Data transmission not encrypted');
      recommendations.push('Implement HTTPS/TLS encryption for all data transmission');
    }

    // Check data minimization
    if (!this.securityConfig.dataMinimization) {
      findings.push('Data minimization principles not implemented');
      recommendations.push('Review data collection to ensure only necessary data is processed');
    }

    // Check anonymization
    if (!this.securityConfig.anonymization) {
      findings.push('Personal data not anonymized for analytics');
      recommendations.push('Implement anonymization for non-essential data processing');
    }

    // Check access controls
    if (!this.securityConfig.accessControls) {
      findings.push('Insufficient access controls');
      recommendations.push('Implement role-based access controls and authentication');
    }

    // Check audit logging
    if (!this.securityConfig.auditLogging) {
      findings.push('Audit logging not enabled');
      recommendations.push('Enable comprehensive audit logging for compliance monitoring');
    }

    return {
      compliant: findings.length === 0,
      findings,
      recommendations
    };
  }

  /**
   * Get data protection metrics
   */
  getProtectionMetrics(): DataProtectionMetrics {
    return {
      dataProcessedLocally: this.getLocalProcessingCount(),
      dataTransmittedToServers: this.getServerTransmissionCount(),
      anonymizedRecords: this.getAnonymizedRecordCount(),
      securityIncidents: this.incidents.length,
      gdprRequestsProcessed: this.getGDPRRequestCount()
    };
  }

  // Private helper methods
  private hashPII(value: string): string {
    // Simple hash for demo - use proper cryptographic hash in production
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      const char = value.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `hashed_${Math.abs(hash).toString(36)}`;
  }

  private generateIncidentId(): string {
    return `inc_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  }

  private triggerCriticalResponse(incident: SecurityIncident): void {
    console.error('CRITICAL SECURITY INCIDENT:', incident);
    // In production: immediate notification to security team, DPO, and management
  }

  private triggerHighSeverityResponse(incident: SecurityIncident): void {
    console.warn('HIGH SEVERITY INCIDENT:', incident);
    // In production: notification to security team and DPO within 1 hour
  }

  private triggerMediumSeverityResponse(incident: SecurityIncident): void {
    console.warn('MEDIUM SEVERITY INCIDENT:', incident);
    // In production: notification to security team within 24 hours
  }

  private logIncident(incident: SecurityIncident): void {
    console.log('Security incident logged:', incident);
    // In production: log to security monitoring system
  }

  private getDataTypesForActivity(activity: string): string[] {
    const dataTypeMap: Record<string, string[]> = {
      face_analysis: ['facial_images', 'facial_landmarks', 'measurements'],
      analytics: ['usage_data', 'performance_metrics', 'user_interactions'],
      service_improvement: ['anonymized_results', 'error_logs', 'feedback']
    };
    return dataTypeMap[activity] || ['unknown'];
  }

  private assessPrivacyRisks(activity: string): any {
    // Simplified risk assessment
    return {
      identificationRisk: activity === 'face_analysis' ? 'high' : 'low',
      sensitiveDataRisk: activity === 'face_analysis' ? 'medium' : 'low',
      profilingRisk: activity === 'analytics' ? 'medium' : 'low'
    };
  }

  private assessTechnicalRisks(activity: string): any {
    return {
      dataBreachRisk: 'low', // Client-side processing
      systemAvailabilityRisk: 'medium',
      dataIntegrityRisk: 'low'
    };
  }

  private assessOrganizationalRisks(activity: string): any {
    return {
      complianceRisk: 'low',
      reputationalRisk: 'medium',
      operationalRisk: 'low'
    };
  }

  private getMitigationMeasures(activity: string): string[] {
    return [
      'Client-side processing to minimize data exposure',
      'HTTPS encryption for all data transmission',
      'Data anonymization for analytics',
      'Regular security assessments',
      'GDPR compliance measures',
      'Incident response procedures'
    ];
  }

  private calculateResidualRisk(activity: string): string {
    // Simplified calculation
    return 'low';
  }

  private getDPIAConclusion(activity: string): string {
    return 'Processing can proceed with implemented safeguards. Risk level is acceptable.';
  }

  private getLocalProcessingCount(): number {
    // In production: track actual metrics
    return 0;
  }

  private getServerTransmissionCount(): number {
    // In production: track actual metrics
    return 0;
  }

  private getAnonymizedRecordCount(): number {
    // In production: track actual metrics
    return 0;
  }

  private getGDPRRequestCount(): number {
    // In production: track actual metrics
    return 0;
  }
}

// Export singleton instance
export const dataProtection = DataProtectionManager.getInstance();

// Utility functions for data protection
export const dataProtectionUtils = {
  /**
   * Sanitize user input to prevent injection attacks
   */
  sanitizeInput(input: string): string {
    return input
      .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
      .trim()
      .substring(0, 1000); // Limit length
  },

  /**
   * Validate file upload for security
   */
  validateFileUpload(file: File): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      issues.push('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      issues.push('File size too large. Maximum size is 10MB.');
    }
    
    // Check for suspicious file names
    if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
      issues.push('Invalid file name.');
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  },

  /**
   * Check if processing requires explicit consent
   */
  requiresExplicitConsent(dataType: string, purpose: string): boolean {
    const sensitiveData = ['biometric', 'health', 'genetic', 'facial'];
    const sensitivePurposes = ['profiling', 'automated_decision_making', 'marketing'];
    
    return sensitiveData.some(type => dataType.includes(type)) ||
           sensitivePurposes.includes(purpose);
  }
};