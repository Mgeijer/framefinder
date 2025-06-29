/**
 * Face detection accuracy monitoring and testing utilities
 */

import { AnalysisResult } from '@/types';

export interface AccuracyTestCase {
  id: string;
  imageUrl: string;
  expectedShape: string;
  expectedConfidence?: number;
  metadata?: {
    age?: number;
    gender?: string;
    ethnicity?: string;
    lighting?: 'good' | 'poor' | 'challenging';
    angle?: 'frontal' | 'slight' | 'challenging';
    quality?: 'high' | 'medium' | 'low';
  };
}

export interface AccuracyResult {
  testCase: AccuracyTestCase;
  result?: AnalysisResult;
  error?: string;
  correct: boolean;
  confidence: number;
  processingTime: number;
  timestamp: Date;
}

export interface AccuracyMetrics {
  totalTests: number;
  correctPredictions: number;
  accuracy: number;
  errorRate: number;
  averageConfidence: number;
  averageProcessingTime: number;
  confusionMatrix: Record<string, Record<string, number>>;
  byDemographic: Record<string, AccuracyMetrics>;
}

/**
 * Face detection accuracy tester
 */
export class AccuracyTester {
  private testResults: AccuracyResult[] = [];

  /**
   * Run a single accuracy test
   */
  async runSingleTest(
    testCase: AccuracyTestCase,
    faceDetectionService: any
  ): Promise<AccuracyResult> {
    const startTime = performance.now();
    
    try {
      // Convert image URL to File object for testing
      const response = await fetch(testCase.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'test-image.jpg', { type: 'image/jpeg' });
      
      const result = await faceDetectionService.analyzeFaceFromFile(file);
      const processingTime = performance.now() - startTime;
      
      const correct = result.faceShape.name === testCase.expectedShape;
      
      const accuracyResult: AccuracyResult = {
        testCase,
        result,
        correct,
        confidence: result.confidence,
        processingTime,
        timestamp: new Date(),
      };
      
      this.testResults.push(accuracyResult);
      return accuracyResult;
      
    } catch (error) {
      const processingTime = performance.now() - startTime;
      
      const accuracyResult: AccuracyResult = {
        testCase,
        error: error instanceof Error ? error.message : 'Unknown error',
        correct: false,
        confidence: 0,
        processingTime,
        timestamp: new Date(),
      };
      
      this.testResults.push(accuracyResult);
      return accuracyResult;
    }
  }

  /**
   * Run accuracy test suite
   */
  async runTestSuite(
    testCases: AccuracyTestCase[],
    faceDetectionService: any,
    onProgress?: (completed: number, total: number) => void
  ): Promise<AccuracyResult[]> {
    const results: AccuracyResult[] = [];
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const result = await this.runSingleTest(testCase, faceDetectionService);
      results.push(result);
      
      if (onProgress) {
        onProgress(i + 1, testCases.length);
      }
      
      // Add small delay to prevent overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results;
  }

  /**
   * Calculate accuracy metrics
   */
  calculateMetrics(results: AccuracyResult[] = this.testResults): AccuracyMetrics {
    const total = results.length;
    const correct = results.filter(r => r.correct).length;
    const errors = results.filter(r => r.error).length;
    const successful = results.filter(r => r.result);
    
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    const errorRate = total > 0 ? (errors / total) * 100 : 0;
    const avgConfidence = successful.length > 0 
      ? successful.reduce((sum, r) => sum + r.confidence, 0) / successful.length 
      : 0;
    const avgProcessingTime = results.length > 0
      ? results.reduce((sum, r) => sum + r.processingTime, 0) / results.length
      : 0;

    // Build confusion matrix
    const confusionMatrix: Record<string, Record<string, number>> = {};
    const faceShapes = ['oval', 'round', 'square', 'heart', 'diamond', 'triangle'];
    
    // Initialize matrix
    faceShapes.forEach(actual => {
      confusionMatrix[actual] = {};
      faceShapes.forEach(predicted => {
        confusionMatrix[actual][predicted] = 0;
      });
    });
    
    // Fill confusion matrix
    successful.forEach(result => {
      const actual = result.testCase.expectedShape;
      const predicted = result.result!.faceShape.name;
      confusionMatrix[actual][predicted]++;
    });

    // Calculate demographic breakdowns
    const byDemographic: Record<string, AccuracyMetrics> = {};
    
    const groupBy = (key: string) => {
      const groups: Record<string, AccuracyResult[]> = {};
      results.forEach(result => {
        const value = (result.testCase.metadata as any)?.[key] || 'unknown';
        if (!groups[value]) groups[value] = [];
        groups[value].push(result);
      });
      return groups;
    };

    // Group by key demographics
    const genderGroups = groupBy('gender');
    const ageGroups = groupBy('age');
    const qualityGroups = groupBy('quality');

    Object.entries(genderGroups).forEach(([gender, groupResults]) => {
      byDemographic[`gender_${gender}`] = this.calculateMetrics(groupResults);
    });

    Object.entries(qualityGroups).forEach(([quality, groupResults]) => {
      byDemographic[`quality_${quality}`] = this.calculateMetrics(groupResults);
    });

    return {
      totalTests: total,
      correctPredictions: correct,
      accuracy: Math.round(accuracy * 100) / 100,
      errorRate: Math.round(errorRate * 100) / 100,
      averageConfidence: Math.round(avgConfidence * 100) / 100,
      averageProcessingTime: Math.round(avgProcessingTime),
      confusionMatrix,
      byDemographic,
    };
  }

  /**
   * Generate accuracy report
   */
  generateReport(results: AccuracyResult[] = this.testResults): string {
    const metrics = this.calculateMetrics(results);
    
    let report = '# Face Detection Accuracy Report\n\n';
    report += `**Generated**: ${new Date().toLocaleString()}\n`;
    report += `**Test Cases**: ${metrics.totalTests}\n\n`;

    // Overall metrics
    report += '## Overall Performance\n\n';
    report += `- **Accuracy**: ${metrics.accuracy}%\n`;
    report += `- **Error Rate**: ${metrics.errorRate}%\n`;
    report += `- **Average Confidence**: ${metrics.averageConfidence}%\n`;
    report += `- **Average Processing Time**: ${metrics.averageProcessingTime}ms\n\n`;

    // Performance status
    const status = metrics.accuracy >= 85 ? '✅ PASSED' : '❌ FAILED';
    const confidenceStatus = metrics.averageConfidence >= 70 ? '✅ GOOD' : '⚠️ LOW';
    const speedStatus = metrics.averageProcessingTime <= 3000 ? '✅ FAST' : '⚠️ SLOW';

    report += '## Performance Status\n\n';
    report += `- **Accuracy Target (≥85%)**: ${status}\n`;
    report += `- **Confidence Target (≥70%)**: ${confidenceStatus}\n`;
    report += `- **Speed Target (≤3s)**: ${speedStatus}\n\n`;

    // Confusion matrix
    report += '## Confusion Matrix\n\n';
    report += 'Actual vs Predicted:\n\n';
    report += '|        | Oval | Round | Square | Heart | Diamond | Triangle |\n';
    report += '|--------|------|-------|--------|-------|---------|----------|\n';
    
    const shapes = ['oval', 'round', 'square', 'heart', 'diamond', 'triangle'];
    shapes.forEach(actual => {
      const row = shapes.map(predicted => {
        const count = metrics.confusionMatrix[actual]?.[predicted] || 0;
        const total = Object.values(metrics.confusionMatrix[actual] || {}).reduce((sum, val) => sum + val, 0);
        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
        return `${percentage}%`;
      });
      report += `| ${actual.padEnd(6)} | ${row.join(' | ')} |\n`;
    });

    // Error analysis
    const errorResults = results.filter(r => r.error);
    if (errorResults.length > 0) {
      report += '\n## Error Analysis\n\n';
      const errorTypes: Record<string, number> = {};
      errorResults.forEach(result => {
        const errorType = result.error || 'Unknown';
        errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
      });
      
      Object.entries(errorTypes).forEach(([error, count]) => {
        report += `- **${error}**: ${count} cases\n`;
      });
    }

    // Recommendations
    report += '\n## Recommendations\n\n';
    
    if (metrics.accuracy < 85) {
      report += '- 🔴 **Critical**: Accuracy below target (85%). Review model parameters and training data.\n';
    }
    
    if (metrics.averageConfidence < 70) {
      report += '- 🟡 **Warning**: Low average confidence. Consider confidence threshold adjustments.\n';
    }
    
    if (metrics.averageProcessingTime > 3000) {
      report += '- 🟡 **Performance**: Processing time exceeds target (3s). Optimize model or hardware.\n';
    }
    
    if (metrics.errorRate > 10) {
      report += '- 🟡 **Stability**: High error rate. Improve error handling and input validation.\n';
    }

    return report;
  }

  /**
   * Export results to JSON
   */
  exportResults(): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      results: this.testResults,
      metrics: this.calculateMetrics(),
    }, null, 2);
  }

  /**
   * Clear test results
   */
  clearResults(): void {
    this.testResults = [];
  }
}

/**
 * Sample test cases for development
 */
export const sampleTestCases: AccuracyTestCase[] = [
  {
    id: 'oval_001',
    imageUrl: '/test-images/oval-face-sample.jpg',
    expectedShape: 'oval',
    expectedConfidence: 0.85,
    metadata: {
      age: 25,
      gender: 'female',
      ethnicity: 'caucasian',
      lighting: 'good',
      angle: 'frontal',
      quality: 'high'
    }
  },
  {
    id: 'round_001',
    imageUrl: '/test-images/round-face-sample.jpg',
    expectedShape: 'round',
    expectedConfidence: 0.80,
    metadata: {
      age: 30,
      gender: 'male',
      ethnicity: 'asian',
      lighting: 'good',
      angle: 'frontal',
      quality: 'high'
    }
  },
  // Add more test cases as needed
];

/**
 * Real-time accuracy monitoring
 */
export class AccuracyMonitor {
  private recentResults: AccuracyResult[] = [];
  private maxResults = 100;

  /**
   * Record a result for monitoring
   */
  recordResult(result: AccuracyResult): void {
    this.recentResults.push(result);
    
    // Keep only recent results
    if (this.recentResults.length > this.maxResults) {
      this.recentResults = this.recentResults.slice(-this.maxResults);
    }
  }

  /**
   * Get recent accuracy metrics
   */
  getRecentMetrics(): AccuracyMetrics {
    const tester = new AccuracyTester();
    return tester.calculateMetrics(this.recentResults);
  }

  /**
   * Check if accuracy is degrading
   */
  isAccuracyDegrading(): boolean {
    if (this.recentResults.length < 20) return false;
    
    const recent = this.recentResults.slice(-10);
    const older = this.recentResults.slice(-20, -10);
    
    const recentAccuracy = recent.filter(r => r.correct).length / recent.length;
    const olderAccuracy = older.filter(r => r.correct).length / older.length;
    
    return recentAccuracy < olderAccuracy - 0.1; // 10% degradation threshold
  }
}

// Global accuracy monitor instance
export const accuracyMonitor = new AccuracyMonitor();