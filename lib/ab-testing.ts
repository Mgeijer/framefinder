/**
 * A/B Testing framework for FrameFinder
 * Enables feature testing and optimization experiments
 */

export interface ExperimentConfig {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  trafficAllocation: number; // 0-1 (percentage of users)
  variants: ExperimentVariant[];
  targeting: TargetingConfig;
  metrics: ExperimentMetric[];
  startDate?: Date;
  endDate?: Date;
  confidenceLevel: number; // 0.95 for 95% confidence
  minSampleSize: number;
}

export interface ExperimentVariant {
  id: string;
  name: string;
  description: string;
  allocation: number; // 0-1 (percentage within experiment)
  isControl: boolean;
  config: Record<string, any>;
}

export interface TargetingConfig {
  includeRules: TargetingRule[];
  excludeRules: TargetingRule[];
  geolocation?: string[];
  deviceTypes?: ('mobile' | 'tablet' | 'desktop')[];
  browsers?: string[];
  newUsersOnly?: boolean;
  returningUsersOnly?: boolean;
}

export interface TargetingRule {
  type: 'url' | 'utm_source' | 'referrer' | 'custom_attribute';
  operator: 'equals' | 'contains' | 'starts_with' | 'regex';
  value: string;
}

export interface ExperimentMetric {
  id: string;
  name: string;
  type: 'conversion' | 'revenue' | 'engagement' | 'performance';
  event: string;
  aggregation: 'count' | 'sum' | 'average' | 'unique';
  isPrimary: boolean;
}

export interface ExperimentAssignment {
  userId: string;
  experimentId: string;
  variantId: string;
  timestamp: Date;
  sessionId: string;
}

export interface ExperimentResult {
  experimentId: string;
  variantId: string;
  metric: string;
  value: number;
  timestamp: Date;
  userId: string;
  sessionId: string;
  context: Record<string, any>;
}

export interface ExperimentAnalysis {
  experimentId: string;
  generatedAt: Date;
  totalParticipants: number;
  variants: VariantAnalysis[];
  statisticalSignificance: boolean;
  confidenceLevel: number;
  winner?: string;
  recommendation: string;
}

export interface VariantAnalysis {
  variantId: string;
  name: string;
  participants: number;
  metrics: MetricAnalysis[];
  conversionRate?: number;
  improvement?: number;
  pValue?: number;
}

export interface MetricAnalysis {
  metricId: string;
  name: string;
  value: number;
  standardError: number;
  confidenceInterval: [number, number];
  improvement: number;
  pValue: number;
  isSignificant: boolean;
}

/**
 * A/B Testing Manager
 * Handles experiment creation, assignment, and analysis
 */
export class ABTestingManager {
  private static instance: ABTestingManager;
  private experiments: Map<string, ExperimentConfig> = new Map();
  private assignments: Map<string, ExperimentAssignment[]> = new Map();
  private results: ExperimentResult[] = [];
  private userId: string;
  private sessionId: string;

  private constructor() {
    this.userId = this.generateUserId();
    this.sessionId = this.generateSessionId();
    this.loadExperiments();
    this.loadAssignments();
  }

  static getInstance(): ABTestingManager {
    if (!ABTestingManager.instance) {
      ABTestingManager.instance = new ABTestingManager();
    }
    return ABTestingManager.instance;
  }

  /**
   * Initialize A/B testing framework
   */
  init(): void {
    if (typeof window === 'undefined') return;

    // Load active experiments
    this.loadActiveExperiments();

    // Setup event tracking
    this.setupEventTracking();

    // Process user for active experiments
    this.processActiveExperiments();
  }

  /**
   * Create a new experiment
   */
  createExperiment(config: ExperimentConfig): void {
    // Validate experiment config
    this.validateExperimentConfig(config);

    // Store experiment
    this.experiments.set(config.id, config);

    // Save to storage
    this.saveExperiments();

    console.log(`Experiment created: ${config.name} (${config.id})`);
  }

  /**
   * Get variant for a user in an experiment
   */
  getVariant(experimentId: string, userId?: string): ExperimentVariant | null {
    const experiment = this.experiments.get(experimentId);
    if (!experiment || experiment.status !== 'active') {
      return null;
    }

    const targetUserId = userId || this.userId;

    // Check if user is already assigned
    const existingAssignment = this.getUserAssignment(experimentId, targetUserId);
    if (existingAssignment) {
      return experiment.variants.find(v => v.id === existingAssignment.variantId) || null;
    }

    // Check if user qualifies for experiment
    if (!this.isUserEligible(experiment, targetUserId)) {
      return null;
    }

    // Check traffic allocation
    if (Math.random() > experiment.trafficAllocation) {
      return null;
    }

    // Assign user to variant
    const variant = this.assignUserToVariant(experiment, targetUserId);
    if (variant) {
      this.recordAssignment(experimentId, variant.id, targetUserId);
    }

    return variant;
  }

  /**
   * Check if a feature flag is enabled for the user
   */
  isFeatureEnabled(featureName: string, userId?: string): boolean {
    const targetUserId = userId || this.userId;
    
    // Look for experiments that control this feature
    for (const experiment of Array.from(this.experiments.values())) {
      if (experiment.status === 'active') {
        const variant = this.getVariant(experiment.id, targetUserId);
        if (variant && variant.config[featureName] !== undefined) {
          return variant.config[featureName] === true;
        }
      }
    }

    // Default behavior if no experiment controls this feature
    return false;
  }

  /**
   * Get configuration value for a user
   */
  getConfig<T = any>(configKey: string, defaultValue: T, userId?: string): T {
    const targetUserId = userId || this.userId;
    
    // Look for experiments that control this config
    for (const experiment of Array.from(this.experiments.values())) {
      if (experiment.status === 'active') {
        const variant = this.getVariant(experiment.id, targetUserId);
        if (variant && variant.config[configKey] !== undefined) {
          return variant.config[configKey] as T;
        }
      }
    }

    return defaultValue;
  }

  /**
   * Track an experiment event/conversion
   */
  trackEvent(event: string, value?: number, context?: Record<string, any>): void {
    // Find experiments this user is participating in
    const userAssignments = this.getUserAssignments(this.userId);
    
    userAssignments.forEach(assignment => {
      const experiment = this.experiments.get(assignment.experimentId);
      if (!experiment) return;

      // Check if this event is tracked for this experiment
      const metric = experiment.metrics.find(m => m.event === event);
      if (!metric) return;

      // Record the result
      const result: ExperimentResult = {
        experimentId: assignment.experimentId,
        variantId: assignment.variantId,
        metric: metric.id,
        value: value || 1,
        timestamp: new Date(),
        userId: this.userId,
        sessionId: this.sessionId,
        context: context || {}
      };

      this.results.push(result);
      this.saveResults();

      // Send to analytics
      this.sendEventToAnalytics(result);
    });
  }

  /**
   * Analyze experiment results
   */
  analyzeExperiment(experimentId: string): ExperimentAnalysis | null {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) return null;

    const participantCounts = this.getParticipantCounts(experimentId);
    const totalParticipants = Object.values(participantCounts).reduce((sum, count) => sum + count, 0);

    // Analyze each variant
    const variants: VariantAnalysis[] = experiment.variants.map(variant => {
      const participants = participantCounts[variant.id] || 0;
      const variantResults = this.results.filter(r => 
        r.experimentId === experimentId && r.variantId === variant.id
      );

      // Analyze each metric
      const metrics: MetricAnalysis[] = experiment.metrics.map(metric => {
        const metricResults = variantResults.filter(r => r.metric === metric.id);
        return this.analyzeMetric(metric, metricResults, participants);
      });

      // Calculate overall conversion rate if applicable
      const conversionMetric = experiment.metrics.find(m => m.type === 'conversion' && m.isPrimary);
      let conversionRate: number | undefined;
      if (conversionMetric) {
        const conversions = variantResults.filter(r => r.metric === conversionMetric.id).length;
        conversionRate = participants > 0 ? conversions / participants : 0;
      }

      return {
        variantId: variant.id,
        name: variant.name,
        participants,
        metrics,
        conversionRate
      };
    });

    // Determine statistical significance and winner
    const analysis = this.performStatisticalAnalysis(experiment, variants);

    return {
      experimentId,
      generatedAt: new Date(),
      totalParticipants,
      variants,
      statisticalSignificance: analysis.isSignificant,
      confidenceLevel: experiment.confidenceLevel,
      winner: analysis.winner,
      recommendation: analysis.recommendation
    };
  }

  /**
   * Generate experiment report
   */
  generateReport(experimentId: string): string {
    const analysis = this.analyzeExperiment(experimentId);
    if (!analysis) return 'Experiment not found';

    const experiment = this.experiments.get(experimentId);
    if (!experiment) return 'Experiment not found';

    let report = `# A/B Test Report: ${experiment.name}\n\n`;
    report += `**Experiment ID**: ${experimentId}\n`;
    report += `**Generated**: ${analysis.generatedAt.toLocaleString()}\n`;
    report += `**Status**: ${experiment.status}\n`;
    report += `**Total Participants**: ${analysis.totalParticipants}\n\n`;

    // Summary
    report += `## Summary\n\n`;
    if (analysis.statisticalSignificance) {
      report += `✅ **Statistically Significant Results**\n`;
      if (analysis.winner) {
        const winner = analysis.variants.find(v => v.variantId === analysis.winner);
        report += `🏆 **Winner**: ${winner?.name}\n`;
      }
    } else {
      report += `⚠️ **No Statistically Significant Results**\n`;
    }
    report += `📊 **Confidence Level**: ${(experiment.confidenceLevel * 100).toFixed(1)}%\n\n`;
    report += `**Recommendation**: ${analysis.recommendation}\n\n`;

    // Variant Performance
    report += `## Variant Performance\n\n`;
    analysis.variants.forEach(variant => {
      report += `### ${variant.name}\n`;
      report += `- **Participants**: ${variant.participants}\n`;
      if (variant.conversionRate !== undefined) {
        report += `- **Conversion Rate**: ${(variant.conversionRate * 100).toFixed(2)}%\n`;
      }
      if (variant.improvement !== undefined) {
        const sign = variant.improvement > 0 ? '+' : '';
        report += `- **Improvement**: ${sign}${(variant.improvement * 100).toFixed(2)}%\n`;
      }

      // Metric details
      variant.metrics.forEach(metric => {
        const significance = metric.isSignificant ? '✅' : '❌';
        report += `  - **${metric.name}**: ${metric.value.toFixed(2)} ${significance}\n`;
        report += `    - Improvement: ${metric.improvement > 0 ? '+' : ''}${(metric.improvement * 100).toFixed(1)}%\n`;
        report += `    - P-value: ${metric.pValue.toFixed(4)}\n`;
      });
      report += '\n';
    });

    // Statistical Details
    report += `## Statistical Analysis\n\n`;
    report += `- **Minimum Sample Size**: ${experiment.minSampleSize}\n`;
    report += `- **Sample Size Achieved**: ${analysis.totalParticipants >= experiment.minSampleSize ? '✅' : '❌'}\n`;
    report += `- **Statistical Power**: ${this.calculateStatisticalPower(analysis)}%\n\n`;

    return report;
  }

  // Sample experiments for FrameFinder
  setupFrameFinderExperiments(): void {
    // Face analysis UI experiment
    this.createExperiment({
      id: 'face_analysis_ui_v1',
      name: 'Face Analysis UI Optimization',
      description: 'Test different UI layouts for the face analysis interface',
      status: 'active',
      trafficAllocation: 0.5, // 50% of users
      variants: [
        {
          id: 'control',
          name: 'Current UI',
          description: 'Existing face analysis interface',
          allocation: 0.5,
          isControl: true,
          config: {
            showProgressBar: true,
            showConfidenceScore: true,
            enablePreview: false
          }
        },
        {
          id: 'enhanced',
          name: 'Enhanced UI',
          description: 'Enhanced interface with preview and tips',
          allocation: 0.5,
          isControl: false,
          config: {
            showProgressBar: true,
            showConfidenceScore: true,
            enablePreview: true,
            showAnalysisTips: true,
            enhancedVisuals: true
          }
        }
      ],
      targeting: {
        includeRules: [],
        excludeRules: [],
        deviceTypes: ['mobile', 'tablet', 'desktop']
      },
      metrics: [
        {
          id: 'analysis_completion',
          name: 'Analysis Completion Rate',
          type: 'conversion',
          event: 'face_analysis_completed',
          aggregation: 'count',
          isPrimary: true
        },
        {
          id: 'user_satisfaction',
          name: 'User Satisfaction',
          type: 'engagement',
          event: 'satisfaction_rating',
          aggregation: 'average',
          isPrimary: false
        }
      ],
      confidenceLevel: 0.95,
      minSampleSize: 1000
    });

    // Results display experiment
    this.createExperiment({
      id: 'results_display_v1',
      name: 'Results Display Optimization',
      description: 'Test different ways to present face shape analysis results',
      status: 'active',
      trafficAllocation: 0.3, // 30% of users
      variants: [
        {
          id: 'standard',
          name: 'Standard Results',
          description: 'Current results display',
          allocation: 0.5,
          isControl: true,
          config: {
            showRecommendations: true,
            showConfidence: true,
            enableSharing: false
          }
        },
        {
          id: 'interactive',
          name: 'Interactive Results',
          description: 'Interactive results with animations and sharing',
          allocation: 0.5,
          isControl: false,
          config: {
            showRecommendations: true,
            showConfidence: true,
            enableSharing: true,
            enableAnimations: true,
            showComparison: true
          }
        }
      ],
      targeting: {
        includeRules: [],
        excludeRules: []
      },
      metrics: [
        {
          id: 'social_share',
          name: 'Social Sharing Rate',
          type: 'conversion',
          event: 'result_shared',
          aggregation: 'count',
          isPrimary: true
        },
        {
          id: 'time_on_results',
          name: 'Time on Results Page',
          type: 'engagement',
          event: 'results_page_time',
          aggregation: 'average',
          isPrimary: false
        }
      ],
      confidenceLevel: 0.95,
      minSampleSize: 500
    });
  }

  // Private helper methods
  private loadExperiments(): void {
    try {
      const stored = localStorage.getItem('framefinder_experiments');
      if (stored) {
        const experiments = JSON.parse(stored);
        Object.entries(experiments).forEach(([id, config]) => {
          this.experiments.set(id, config as ExperimentConfig);
        });
      }
    } catch (error) {
      console.warn('Failed to load experiments:', error);
    }
  }

  private saveExperiments(): void {
    try {
      const experimentsObj = Object.fromEntries(this.experiments);
      localStorage.setItem('framefinder_experiments', JSON.stringify(experimentsObj));
    } catch (error) {
      console.warn('Failed to save experiments:', error);
    }
  }

  private loadAssignments(): void {
    try {
      const stored = localStorage.getItem('framefinder_assignments');
      if (stored) {
        const assignments = JSON.parse(stored);
        Object.entries(assignments).forEach(([userId, userAssignments]) => {
          this.assignments.set(userId, userAssignments as ExperimentAssignment[]);
        });
      }
    } catch (error) {
      console.warn('Failed to load assignments:', error);
    }
  }

  private saveAssignments(): void {
    try {
      const assignmentsObj = Object.fromEntries(this.assignments);
      localStorage.setItem('framefinder_assignments', JSON.stringify(assignmentsObj));
    } catch (error) {
      console.warn('Failed to save assignments:', error);
    }
  }

  private saveResults(): void {
    try {
      localStorage.setItem('framefinder_experiment_results', JSON.stringify(this.results));
    } catch (error) {
      console.warn('Failed to save results:', error);
    }
  }

  private loadActiveExperiments(): void {
    // In production, this would fetch from a remote service
    this.setupFrameFinderExperiments();
  }

  private setupEventTracking(): void {
    // Track common events
    window.addEventListener('faceAnalysisCompleted', () => {
      this.trackEvent('face_analysis_completed');
    });

    window.addEventListener('resultShared', (event: any) => {
      this.trackEvent('result_shared', 1, {
        platform: event.detail?.platform
      });
    });
  }

  private processActiveExperiments(): void {
    // Process user for all active experiments
    for (const experiment of Array.from(this.experiments.values())) {
      if (experiment.status === 'active') {
        this.getVariant(experiment.id);
      }
    }
  }

  private validateExperimentConfig(config: ExperimentConfig): void {
    if (!config.id || !config.name) {
      throw new Error('Experiment must have id and name');
    }

    if (config.variants.length < 2) {
      throw new Error('Experiment must have at least 2 variants');
    }

    const totalAllocation = config.variants.reduce((sum, v) => sum + v.allocation, 0);
    if (Math.abs(totalAllocation - 1) > 0.01) {
      throw new Error('Variant allocations must sum to 1');
    }

    const controlVariants = config.variants.filter(v => v.isControl);
    if (controlVariants.length !== 1) {
      throw new Error('Experiment must have exactly one control variant');
    }
  }

  private isUserEligible(experiment: ExperimentConfig, userId: string): boolean {
    // Check targeting rules
    const targeting = experiment.targeting;

    // Device type check
    if (targeting.deviceTypes && targeting.deviceTypes.length > 0) {
      const currentDeviceType = this.getDeviceType();
      if (!targeting.deviceTypes.includes(currentDeviceType)) {
        return false;
      }
    }

    // Browser check
    if (targeting.browsers && targeting.browsers.length > 0) {
      const currentBrowser = this.getBrowserName();
      if (!targeting.browsers.includes(currentBrowser)) {
        return false;
      }
    }

    // URL rules
    if (targeting.includeRules.length > 0) {
      const matchesInclude = targeting.includeRules.some(rule => 
        this.evaluateTargetingRule(rule)
      );
      if (!matchesInclude) return false;
    }

    if (targeting.excludeRules.length > 0) {
      const matchesExclude = targeting.excludeRules.some(rule => 
        this.evaluateTargetingRule(rule)
      );
      if (matchesExclude) return false;
    }

    return true;
  }

  private assignUserToVariant(experiment: ExperimentConfig, userId: string): ExperimentVariant | null {
    // Use consistent hashing for stable assignment
    const hash = this.hashUserId(userId + experiment.id);
    let cumulative = 0;

    for (const variant of experiment.variants) {
      cumulative += variant.allocation;
      if (hash < cumulative) {
        return variant;
      }
    }

    return experiment.variants[experiment.variants.length - 1];
  }

  private recordAssignment(experimentId: string, variantId: string, userId: string): void {
    const assignment: ExperimentAssignment = {
      userId,
      experimentId,
      variantId,
      timestamp: new Date(),
      sessionId: this.sessionId
    };

    if (!this.assignments.has(userId)) {
      this.assignments.set(userId, []);
    }

    this.assignments.get(userId)!.push(assignment);
    this.saveAssignments();
  }

  private getUserAssignment(experimentId: string, userId: string): ExperimentAssignment | null {
    const userAssignments = this.assignments.get(userId) || [];
    return userAssignments.find(a => a.experimentId === experimentId) || null;
  }

  private getUserAssignments(userId: string): ExperimentAssignment[] {
    return this.assignments.get(userId) || [];
  }

  private sendEventToAnalytics(result: ExperimentResult): void {
    if (typeof window.posthog !== 'undefined') {
      window.posthog.capture('ab_test_event', {
        experiment_id: result.experimentId,
        variant_id: result.variantId,
        metric: result.metric,
        value: result.value,
        user_id: result.userId,
        session_id: result.sessionId,
        context: result.context
      });
    }
  }

  private getParticipantCounts(experimentId: string): Record<string, number> {
    const counts: Record<string, number> = {};
    
    for (const assignments of Array.from(this.assignments.values())) {
      assignments
        .filter(a => a.experimentId === experimentId)
        .forEach(a => {
          counts[a.variantId] = (counts[a.variantId] || 0) + 1;
        });
    }

    return counts;
  }

  private analyzeMetric(
    metric: ExperimentMetric, 
    results: ExperimentResult[], 
    participants: number
  ): MetricAnalysis {
    let value = 0;
    let standardError = 0;

    switch (metric.aggregation) {
      case 'count':
        value = results.length;
        break;
      case 'sum':
        value = results.reduce((sum, r) => sum + r.value, 0);
        break;
      case 'average':
        value = results.length > 0 ? 
          results.reduce((sum, r) => sum + r.value, 0) / results.length : 0;
        break;
      case 'unique':
        const uniqueUsers = new Set(results.map(r => r.userId));
        value = uniqueUsers.size;
        break;
    }

    // Calculate standard error (simplified)
    if (metric.type === 'conversion') {
      const p = participants > 0 ? results.length / participants : 0;
      standardError = Math.sqrt(p * (1 - p) / participants);
    } else {
      // For continuous metrics, use sample standard deviation
      const mean = value;
      const variance = results.reduce((sum, r) => sum + Math.pow(r.value - mean, 2), 0) / Math.max(results.length - 1, 1);
      standardError = Math.sqrt(variance / results.length);
    }

    // 95% confidence interval
    const marginOfError = 1.96 * standardError;
    const confidenceInterval: [number, number] = [
      value - marginOfError,
      value + marginOfError
    ];

    return {
      metricId: metric.id,
      name: metric.name,
      value,
      standardError,
      confidenceInterval,
      improvement: 0, // Will be calculated in comparison
      pValue: 0.5, // Will be calculated in comparison
      isSignificant: false // Will be determined in comparison
    };
  }

  private performStatisticalAnalysis(
    experiment: ExperimentConfig, 
    variants: VariantAnalysis[]
  ): { isSignificant: boolean; winner?: string; recommendation: string } {
    const control = variants.find(v => experiment.variants.find(ev => ev.id === v.variantId)?.isControl);
    if (!control) {
      return { isSignificant: false, recommendation: 'No control variant found' };
    }

    let hasSignificantResults = false;
    let bestVariant = control;
    let bestImprovement = 0;

    // Compare each variant to control
    variants.forEach(variant => {
      if (variant.variantId === control.variantId) return;

      // Compare primary conversion metric
      const primaryMetric = experiment.metrics.find(m => m.isPrimary);
      if (primaryMetric && control.conversionRate !== undefined && variant.conversionRate !== undefined) {
        const improvement = (variant.conversionRate - control.conversionRate) / control.conversionRate;
        const pValue = this.calculatePValue(control, variant, primaryMetric.id);
        
        variant.improvement = improvement;
        variant.pValue = pValue;

        if (pValue < (1 - experiment.confidenceLevel) && improvement > bestImprovement) {
          hasSignificantResults = true;
          bestVariant = variant;
          bestImprovement = improvement;
        }
      }
    });

    let recommendation = '';
    if (hasSignificantResults) {
      recommendation = `Implement ${bestVariant.name} - shows ${(bestImprovement * 100).toFixed(1)}% improvement`;
    } else {
      recommendation = 'Continue testing - no statistically significant results yet';
    }

    return {
      isSignificant: hasSignificantResults,
      winner: hasSignificantResults ? bestVariant.variantId : undefined,
      recommendation
    };
  }

  private calculatePValue(control: VariantAnalysis, variant: VariantAnalysis, metricId: string): number {
    // Simplified p-value calculation for conversion rates
    // In production, use proper statistical libraries
    
    const controlMetric = control.metrics.find(m => m.metricId === metricId);
    const variantMetric = variant.metrics.find(m => m.metricId === metricId);
    
    if (!controlMetric || !variantMetric) return 1;

    const controlRate = control.conversionRate || 0;
    const variantRate = variant.conversionRate || 0;
    
    // Use z-test for proportions (simplified)
    const pooledRate = (controlRate * control.participants + variantRate * variant.participants) / 
                      (control.participants + variant.participants);
    
    const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * 
                          (1/control.participants + 1/variant.participants));
    
    const zScore = Math.abs(variantRate - controlRate) / standardError;
    
    // Convert z-score to p-value (simplified)
    return Math.max(0.001, 2 * (1 - this.normalCDF(Math.abs(zScore))));
  }

  private calculateStatisticalPower(analysis: ExperimentAnalysis): number {
    // Simplified power calculation
    // In production, use proper statistical libraries
    return Math.min(100, (analysis.totalParticipants / 1000) * 80);
  }

  private normalCDF(x: number): number {
    // Simplified normal CDF approximation
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)));
  }

  private erf(x: number): number {
    // Error function approximation
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  private hashUserId(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) / 2147483647; // Normalize to 0-1
  }

  private evaluateTargetingRule(rule: TargetingRule): boolean {
    let value = '';
    
    switch (rule.type) {
      case 'url':
        value = window.location.href;
        break;
      case 'referrer':
        value = document.referrer;
        break;
      case 'utm_source':
        const urlParams = new URLSearchParams(window.location.search);
        value = urlParams.get('utm_source') || '';
        break;
      default:
        return false;
    }

    switch (rule.operator) {
      case 'equals':
        return value === rule.value;
      case 'contains':
        return value.includes(rule.value);
      case 'starts_with':
        return value.startsWith(rule.value);
      case 'regex':
        try {
          return new RegExp(rule.value).test(value);
        } catch {
          return false;
        }
      default:
        return false;
    }
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getBrowserName(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  }

  private generateUserId(): string {
    let userId = localStorage.getItem('framefinder_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('framefinder_user_id', userId);
    }
    return userId;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const abTesting = ABTestingManager.getInstance();