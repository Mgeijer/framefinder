/**
 * Responsive design validation utilities
 * Helps ensure mobile-first design principles are followed
 */

export interface ResponsiveCheckResult {
  isValid: boolean;
  issues: string[];
  recommendations: string[];
}

/**
 * Validate viewport configuration
 */
export function validateViewport(): ResponsiveCheckResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  if (typeof document === 'undefined') {
    return { isValid: true, issues, recommendations };
  }

  // Check for viewport meta tag
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    issues.push('Missing viewport meta tag');
    recommendations.push('Add <meta name="viewport" content="width=device-width, initial-scale=1.0">');
  } else {
    const content = viewportMeta.getAttribute('content') || '';
    
    if (!content.includes('width=device-width')) {
      issues.push('Viewport meta tag missing width=device-width');
      recommendations.push('Include width=device-width in viewport meta tag');
    }
    
    if (!content.includes('initial-scale=1')) {
      issues.push('Viewport meta tag missing initial-scale=1');
      recommendations.push('Include initial-scale=1 in viewport meta tag');
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
    recommendations,
  };
}

/**
 * Check for horizontal scrolling issues
 */
export function checkHorizontalScrolling(): ResponsiveCheckResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  if (typeof window === 'undefined') {
    return { isValid: true, issues, recommendations };
  }

  const documentWidth = document.documentElement.scrollWidth;
  const windowWidth = window.innerWidth;

  if (documentWidth > windowWidth) {
    issues.push(`Horizontal scrolling detected (document: ${documentWidth}px, viewport: ${windowWidth}px)`);
    recommendations.push('Check for elements wider than viewport, use max-width or overflow-x: hidden');
  }

  return {
    isValid: issues.length === 0,
    issues,
    recommendations,
  };
}

/**
 * Validate touch target sizes
 */
export function validateTouchTargets(): ResponsiveCheckResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  if (typeof document === 'undefined') {
    return { isValid: true, issues, recommendations };
  }

  const minTouchSize = 44; // iOS guideline
  const interactiveElements = document.querySelectorAll('button, a, input, [role="button"], [tabindex]');

  interactiveElements.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    
    if (rect.width < minTouchSize || rect.height < minTouchSize) {
      const elementDesc = element.tagName.toLowerCase() + 
        (element.id ? `#${element.id}` : '') +
        (element.className ? `.${element.className.split(' ')[0]}` : '');
      
      issues.push(`Touch target too small: ${elementDesc} (${Math.round(rect.width)}x${Math.round(rect.height)}px)`);
      recommendations.push(`Increase touch target size to at least ${minTouchSize}x${minTouchSize}px`);
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
    recommendations,
  };
}

/**
 * Check text readability
 */
export function validateTextReadability(): ResponsiveCheckResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  if (typeof window === 'undefined') {
    return { isValid: true, issues, recommendations };
  }

  const minFontSize = 16; // Minimum for mobile readability
  const textElements = document.querySelectorAll('p, span, div, li, td, th, label, input, textarea, button');

  textElements.forEach((element) => {
    const computedStyle = window.getComputedStyle(element);
    const fontSize = parseFloat(computedStyle.fontSize);
    
    if (fontSize < minFontSize && element.textContent?.trim()) {
      const elementDesc = element.tagName.toLowerCase() + 
        (element.id ? `#${element.id}` : '') +
        (element.className ? `.${element.className.split(' ')[0]}` : '');
      
      issues.push(`Text too small: ${elementDesc} (${fontSize}px)`);
      recommendations.push(`Increase font size to at least ${minFontSize}px for mobile readability`);
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
    recommendations,
  };
}

/**
 * Validate image responsiveness
 */
export function validateImageResponsiveness(): ResponsiveCheckResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  if (typeof document === 'undefined') {
    return { isValid: true, issues, recommendations };
  }

  const images = document.querySelectorAll('img');

  images.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    const containerRect = img.parentElement?.getBoundingClientRect();
    
    // Check if image overflows its container
    if (containerRect && rect.width > containerRect.width) {
      issues.push(`Image ${index + 1} overflows container (${Math.round(rect.width)}px > ${Math.round(containerRect.width)}px)`);
      recommendations.push('Add max-width: 100% and height: auto to images');
    }
    
    // Check for missing alt text
    if (!img.alt) {
      issues.push(`Image ${index + 1} missing alt attribute`);
      recommendations.push('Add descriptive alt text to all images');
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
    recommendations,
  };
}

/**
 * Check responsive breakpoints
 */
export function validateBreakpoints(): ResponsiveCheckResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  if (typeof window === 'undefined') {
    return { isValid: true, issues, recommendations };
  }

  const commonBreakpoints = [320, 375, 414, 768, 1024, 1280, 1536];
  const currentWidth = window.innerWidth;

  // Test layout at different breakpoints
  const testWidths = commonBreakpoints.filter(width => 
    width !== currentWidth && (width < currentWidth + 100 && width > currentWidth - 100)
  );

  if (testWidths.length === 0) {
    recommendations.push('Test the layout at common breakpoints: 320px, 375px, 414px, 768px, 1024px, 1280px');
  }

  return {
    isValid: issues.length === 0,
    issues,
    recommendations,
  };
}

/**
 * Run comprehensive responsive validation
 */
export function validateResponsiveDesign(): {
  overall: boolean;
  results: Record<string, ResponsiveCheckResult>;
} {
  const results = {
    viewport: validateViewport(),
    horizontalScrolling: checkHorizontalScrolling(),
    touchTargets: validateTouchTargets(),
    textReadability: validateTextReadability(),
    imageResponsiveness: validateImageResponsiveness(),
    breakpoints: validateBreakpoints(),
  };

  const overall = Object.values(results).every(result => result.isValid);

  return { overall, results };
}

/**
 * Generate responsive design report
 */
export function generateResponsiveReport(): string {
  const validation = validateResponsiveDesign();
  
  let report = '# Responsive Design Validation Report\n\n';
  report += `**Overall Status**: ${validation.overall ? '✅ PASSED' : '❌ ISSUES FOUND'}\n\n`;

  Object.entries(validation.results).forEach(([category, result]) => {
    report += `## ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
    report += `**Status**: ${result.isValid ? '✅ PASSED' : '❌ FAILED'}\n\n`;

    if (result.issues.length > 0) {
      report += '**Issues Found**:\n';
      result.issues.forEach(issue => {
        report += `- ${issue}\n`;
      });
      report += '\n';
    }

    if (result.recommendations.length > 0) {
      report += '**Recommendations**:\n';
      result.recommendations.forEach(rec => {
        report += `- ${rec}\n`;
      });
      report += '\n';
    }
  });

  return report;
}

/**
 * Auto-fix common responsive issues
 */
export function autoFixResponsiveIssues(): void {
  if (typeof document === 'undefined') return;

  // Add responsive image styles if missing
  const images = document.querySelectorAll('img:not([style*="max-width"])');
  images.forEach(img => {
    (img as HTMLImageElement).style.maxWidth = '100%';
    (img as HTMLImageElement).style.height = 'auto';
  });

  // Add viewport meta tag if missing
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(viewport);
  }
}

/**
 * Monitor responsive design in development
 */
export function initResponsiveMonitoring(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  let debounceTimer: NodeJS.Timeout;

  const checkResponsive = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const validation = validateResponsiveDesign();
      
      if (!validation.overall) {
        console.group('🔍 Responsive Design Issues Detected');
        Object.entries(validation.results).forEach(([category, result]) => {
          if (!result.isValid) {
            console.warn(`${category}:`, result.issues);
          }
        });
        console.groupEnd();
      }
    }, 500);
  };

  // Check on window resize
  window.addEventListener('resize', checkResponsive);
  
  // Check on orientation change
  window.addEventListener('orientationchange', checkResponsive);
  
  // Initial check
  setTimeout(checkResponsive, 1000);
}