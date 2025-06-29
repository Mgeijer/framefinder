# Performance Benchmarking Guide

## Performance Targets & Budgets

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: ≤ 2.5s (Good), ≤ 4.0s (Needs Improvement)
- **First Input Delay (FID)**: ≤ 100ms (Good), ≤ 300ms (Needs Improvement)  
- **Cumulative Layout Shift (CLS)**: ≤ 0.1 (Good), ≤ 0.25 (Needs Improvement)
- **First Contentful Paint (FCP)**: ≤ 1.8s (Good), ≤ 3.0s (Needs Improvement)
- **Time to First Byte (TTFB)**: ≤ 800ms (Good), ≤ 1.8s (Needs Improvement)

### FrameFinder Custom Metrics
- **Face Analysis Time**: ≤ 3.0s (Target), ≤ 5.0s (Acceptable)
- **Model Load Time**: ≤ 2.0s (Target), ≤ 4.0s (Acceptable)
- **Image Processing Time**: ≤ 1.0s (Target), ≤ 2.0s (Acceptable)

### Resource Budgets
- **JavaScript Bundle**: ≤ 250KB (compressed)
- **CSS Bundle**: ≤ 50KB (compressed)
- **Image Assets**: ≤ 1MB per image
- **Font Files**: ≤ 100KB per font
- **Total Page Weight**: ≤ 2MB

### Performance Scoring
- **Excellent**: 90-100 points
- **Good**: 70-89 points  
- **Needs Improvement**: 50-69 points
- **Poor**: 0-49 points

## Benchmarking Test Scenarios

### 1. Initial Page Load Performance

#### Test Environment Setup
```javascript
// Performance testing setup
const performanceTest = {
  iterations: 5,
  warmupRuns: 2,
  cooldownTime: 5000, // 5 seconds between tests
  networkConditions: ['fast-3g', 'slow-3g', 'fast-4g'],
  devices: ['mobile', 'tablet', 'desktop']
};
```

#### Baseline Performance Test
- **URL**: Homepage (/)
- **Network**: Fast 3G simulation
- **Device**: Mid-range mobile device
- **Metrics to Track**:
  - Time to Interactive (TTI)
  - Speed Index
  - Total Blocking Time (TBT)
  - Resource load times

#### Performance Test Script
```javascript
async function runPerformanceTest() {
  const startTime = performance.now();
  
  // Mark critical milestones
  performance.mark('navigation-start');
  
  // Wait for LCP
  await waitForLCP();
  performance.mark('lcp-complete');
  
  // Wait for page interactive
  await waitForInteractive();
  performance.mark('page-interactive');
  
  // Calculate metrics
  const metrics = {
    lcp: getLCPTime(),
    fcp: getFCPTime(),
    tti: getTTITime(),
    totalLoadTime: performance.now() - startTime
  };
  
  return metrics;
}
```

### 2. Face Analysis Performance

#### AI Model Loading Test
```javascript
async function benchmarkModelLoading() {
  const tests = [];
  
  for (let i = 0; i < 5; i++) {
    const startTime = performance.now();
    
    // Clear model cache
    if ('caches' in window) {
      await caches.delete('ai-models');
    }
    
    // Load face detection model
    performance.mark('model-load-start');
    await faceDetectionService.initialize();
    performance.mark('model-load-end');
    
    const loadTime = performance.now() - startTime;
    tests.push(loadTime);
    
    // Cooldown
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return {
    average: tests.reduce((a, b) => a + b) / tests.length,
    min: Math.min(...tests),
    max: Math.max(...tests),
    median: tests.sort()[Math.floor(tests.length / 2)]
  };
}
```

#### Face Analysis Performance Test
```javascript
async function benchmarkFaceAnalysis() {
  const testImages = [
    { url: '/test-images/high-quality-640x480.jpg', size: '640x480' },
    { url: '/test-images/medium-quality-1280x720.jpg', size: '1280x720' },
    { url: '/test-images/high-quality-1920x1080.jpg', size: '1920x1080' }
  ];
  
  const results = [];
  
  for (const testImage of testImages) {
    const analysisResults = [];
    
    for (let i = 0; i < 10; i++) {
      const startTime = performance.now();
      
      // Load and analyze image
      const response = await fetch(testImage.url);
      const blob = await response.blob();
      const file = new File([blob], 'test.jpg', { type: 'image/jpeg' });
      
      performance.mark('analysis-start');
      const result = await faceDetectionService.analyzeFaceFromFile(file);
      performance.mark('analysis-end');
      
      const analysisTime = performance.now() - startTime;
      analysisResults.push({
        totalTime: analysisTime,
        confidence: result.confidence,
        success: !!result.faceShape
      });
    }
    
    results.push({
      imageSize: testImage.size,
      averageTime: analysisResults.reduce((a, b) => a + b.totalTime, 0) / analysisResults.length,
      successRate: analysisResults.filter(r => r.success).length / analysisResults.length,
      averageConfidence: analysisResults.reduce((a, b) => a + b.confidence, 0) / analysisResults.length
    });
  }
  
  return results;
}
```

### 3. Memory Usage Benchmarks

#### Memory Leak Detection
```javascript
async function benchmarkMemoryUsage() {
  const initialMemory = performance.memory?.usedJSHeapSize || 0;
  const memorySnapshots = [];
  
  // Perform 50 face analyses
  for (let i = 0; i < 50; i++) {
    // Analyze a test image
    await performFaceAnalysis();
    
    // Take memory snapshot every 10 iterations
    if (i % 10 === 0) {
      const currentMemory = performance.memory?.usedJSHeapSize || 0;
      memorySnapshots.push({
        iteration: i,
        memoryUsage: currentMemory,
        memoryIncrease: currentMemory - initialMemory
      });
    }
    
    // Brief pause
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return {
    initialMemory,
    finalMemory: performance.memory?.usedJSHeapSize || 0,
    memoryGrowth: memorySnapshots[memorySnapshots.length - 1].memoryIncrease,
    snapshots: memorySnapshots
  };
}
```

### 4. Network Performance Tests

#### Different Connection Speeds
```javascript
const networkConditions = {
  'fast-4g': { download: 4000, upload: 3000, latency: 20 },
  'slow-3g': { download: 500, upload: 500, latency: 400 },
  'fast-3g': { download: 1500, upload: 750, latency: 150 },
  'offline': { download: 0, upload: 0, latency: 0 }
};

async function benchmarkNetworkConditions() {
  const results = {};
  
  for (const [condition, settings] of Object.entries(networkConditions)) {
    // Simulate network condition (requires DevTools Protocol)
    await setNetworkCondition(settings);
    
    const startTime = performance.now();
    
    // Test initial page load
    location.reload();
    await waitForPageLoad();
    
    const loadTime = performance.now() - startTime;
    
    results[condition] = {
      pageLoadTime: loadTime,
      resourceCount: performance.getEntriesByType('resource').length,
      totalTransferSize: getTotalTransferSize()
    };
  }
  
  return results;
}
```

### 5. Cross-Browser Performance

#### Browser-Specific Benchmarks
```javascript
const browserTests = {
  chrome: {
    name: 'Chrome',
    expectedPerformance: 'high',
    webglSupport: true,
    wasmSupport: true
  },
  safari: {
    name: 'Safari',
    expectedPerformance: 'high',
    webglSupport: true,
    wasmSupport: true
  },
  firefox: {
    name: 'Firefox',
    expectedPerformance: 'medium',
    webglSupport: true,
    wasmSupport: true
  },
  edge: {
    name: 'Edge',
    expectedPerformance: 'high',
    webglSupport: true,
    wasmSupport: true
  }
};

function detectBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'safari';
  if (userAgent.includes('Firefox')) return 'firefox';
  if (userAgent.includes('Edge')) return 'edge';
  return 'unknown';
}
```

### 6. Mobile Device Performance

#### Device Categories
```javascript
const deviceCategories = {
  highEnd: {
    description: 'High-end mobile devices',
    examples: ['iPhone 14 Pro', 'Samsung Galaxy S23', 'Pixel 7 Pro'],
    expectedAnalysisTime: 1500, // 1.5s
    memoryLimit: '6GB+'
  },
  midRange: {
    description: 'Mid-range mobile devices',
    examples: ['iPhone 12', 'Samsung Galaxy A54', 'Pixel 6a'],
    expectedAnalysisTime: 2500, // 2.5s
    memoryLimit: '4-6GB'
  },
  lowEnd: {
    description: 'Low-end mobile devices',
    examples: ['iPhone SE', 'Samsung Galaxy A24', 'Budget Android'],
    expectedAnalysisTime: 4000, // 4s
    memoryLimit: '2-4GB'
  }
};
```

#### Device Performance Classification
```javascript
function classifyDevicePerformance() {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  const pixelRatio = window.devicePixelRatio || 1;
  
  if (cores >= 8 && memory >= 6) {
    return 'highEnd';
  } else if (cores >= 4 && memory >= 4) {
    return 'midRange';
  } else {
    return 'lowEnd';
  }
}
```

## Benchmark Automation

### Continuous Performance Testing
```javascript
class PerformanceBenchmarkSuite {
  constructor() {
    this.results = [];
    this.config = {
      iterations: 5,
      warmupRuns: 2,
      cooldownTime: 3000
    };
  }
  
  async runFullSuite() {
    console.log('Starting Performance Benchmark Suite...');
    
    // Page Load Performance
    const pageLoadResults = await this.benchmarkPageLoad();
    this.results.push({ test: 'pageLoad', results: pageLoadResults });
    
    // Face Analysis Performance  
    const analysisResults = await this.benchmarkFaceAnalysis();
    this.results.push({ test: 'faceAnalysis', results: analysisResults });
    
    // Memory Usage
    const memoryResults = await this.benchmarkMemoryUsage();
    this.results.push({ test: 'memoryUsage', results: memoryResults });
    
    // Generate report
    return this.generateReport();
  }
  
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      environment: this.getEnvironmentInfo(),
      results: this.results,
      summary: this.calculateSummary(),
      recommendations: this.generateRecommendations()
    };
    
    return report;
  }
  
  getEnvironmentInfo() {
    return {
      userAgent: navigator.userAgent,
      deviceMemory: (navigator as any).deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency,
      connection: (navigator as any).connection?.effectiveType,
      pixelRatio: window.devicePixelRatio,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    };
  }
}
```

### Performance Regression Detection
```javascript
class PerformanceRegression {
  constructor(historicalData) {
    this.baseline = historicalData;
    this.thresholds = {
      pageLoad: 0.15, // 15% regression threshold
      faceAnalysis: 0.20, // 20% regression threshold
      memory: 0.25 // 25% memory increase threshold
    };
  }
  
  detectRegression(currentResults) {
    const regressions = [];
    
    for (const [metric, threshold] of Object.entries(this.thresholds)) {
      const baseline = this.baseline[metric];
      const current = currentResults[metric];
      
      if (current && baseline) {
        const change = (current - baseline) / baseline;
        
        if (change > threshold) {
          regressions.push({
            metric,
            baseline,
            current,
            change: change * 100,
            severity: this.getSeverity(change, threshold)
          });
        }
      }
    }
    
    return regressions;
  }
  
  getSeverity(change, threshold) {
    if (change > threshold * 2) return 'critical';
    if (change > threshold * 1.5) return 'high';
    return 'medium';
  }
}
```

## Performance Monitoring Integration

### Real-time Performance Alerts
```javascript
function setupPerformanceAlerts() {
  // Monitor Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        if (entry.startTime > 4000) { // 4s threshold
          sendPerformanceAlert('LCP_SLOW', entry.startTime);
        }
      }
    });
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
}

function sendPerformanceAlert(type, value) {
  // Send to monitoring system
  fetch('/api/performance-alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      value,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: location.href
    })
  });
}
```

### Performance Budget Enforcement
```javascript
const performanceBudget = {
  lcp: 2500,
  fid: 100,
  cls: 0.1,
  faceAnalysisTime: 3000,
  bundleSize: 250 * 1024,
  imageSize: 1024 * 1024
};

function enforcePerformanceBudget(metrics) {
  const violations = [];
  
  for (const [metric, budget] of Object.entries(performanceBudget)) {
    if (metrics[metric] && metrics[metric] > budget) {
      violations.push({
        metric,
        budget,
        actual: metrics[metric],
        excess: metrics[metric] - budget
      });
    }
  }
  
  if (violations.length > 0) {
    console.warn('Performance Budget Violations:', violations);
    // Trigger CI/CD pipeline failure or alerts
    throw new Error(`Performance budget exceeded: ${violations.map(v => v.metric).join(', ')}`);
  }
}
```

---

## Benchmark Execution Schedule

- **Development**: Run basic benchmarks on every build
- **Staging**: Full benchmark suite on every deployment
- **Production**: Continuous monitoring with weekly detailed reports
- **Regression Testing**: Compare against baseline after significant changes

## Tools Integration

- **Lighthouse CI**: Automated Core Web Vitals testing
- **WebPageTest**: Real-world performance testing
- **Chrome DevTools**: Local development benchmarking
- **PostHog**: Real-user monitoring and analytics
- **Custom Dashboard**: Centralized performance metrics

## Expected Benchmarks by Device Category

| Metric | High-End Mobile | Mid-Range Mobile | Low-End Mobile | Desktop |
|--------|----------------|------------------|----------------|---------|
| LCP | ≤ 1.8s | ≤ 2.5s | ≤ 3.5s | ≤ 1.5s |
| FID | ≤ 50ms | ≤ 100ms | ≤ 200ms | ≤ 50ms |
| Face Analysis | ≤ 1.5s | ≤ 2.5s | ≤ 4.0s | ≤ 1.0s |
| Model Load | ≤ 1.0s | ≤ 2.0s | ≤ 3.0s | ≤ 0.8s |

Target: 90%+ of users achieve "Good" Core Web Vitals scores