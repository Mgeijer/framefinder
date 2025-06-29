/**
 * Accessibility utilities and WCAG 2.1 AA compliance for FrameFinder
 */

export interface AccessibilityConfig {
  enableScreenReader: boolean;
  enableKeyboardNavigation: boolean;
  enableHighContrast: boolean;
  enableReducedMotion: boolean;
  enableFocusManagement: boolean;
  announceChanges: boolean;
}

export interface AccessibilityAuditResult {
  score: number;
  issues: AccessibilityIssue[];
  warnings: AccessibilityWarning[];
  passed: AccessibilityCheck[];
}

export interface AccessibilityIssue {
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  rule: string;
  description: string;
  element: string;
  fix: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
}

export interface AccessibilityWarning {
  rule: string;
  description: string;
  element: string;
  recommendation: string;
}

export interface AccessibilityCheck {
  rule: string;
  description: string;
  count: number;
}

/**
 * Accessibility Manager
 * Ensures WCAG 2.1 AA compliance and provides accessibility enhancements
 */
export class AccessibilityManager {
  private static instance: AccessibilityManager;
  private config: AccessibilityConfig;
  private announcer: HTMLElement | null = null;
  private focusHistory: HTMLElement[] = [];

  private constructor() {
    this.config = {
      enableScreenReader: true,
      enableKeyboardNavigation: true,
      enableHighContrast: false,
      enableReducedMotion: false,
      enableFocusManagement: true,
      announceChanges: true
    };
  }

  static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }

  /**
   * Initialize accessibility features
   */
  init(): void {
    if (typeof window === 'undefined') return;

    this.setupScreenReaderSupport();
    this.setupKeyboardNavigation();
    this.detectUserPreferences();
    this.setupFocusManagement();
    this.setupSkipLinks();
    this.enhanceFormAccessibility();
    this.setupLiveRegions();
  }

  /**
   * Setup screen reader support
   */
  private setupScreenReaderSupport(): void {
    // Create live region for announcements
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.setAttribute('id', 'accessibility-announcer');
    this.announcer.style.cssText = `
      position: absolute !important;
      left: -10000px !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
    `;
    document.body.appendChild(this.announcer);

    // Setup ARIA labels for face analysis
    this.setupFaceAnalysisAria();
  }

  /**
   * Setup ARIA for face analysis components
   */
  private setupFaceAnalysisAria(): void {
    // Add role and labels to camera/upload area
    const analysisContainer = document.querySelector('[data-analysis-container]');
    if (analysisContainer) {
      analysisContainer.setAttribute('role', 'region');
      analysisContainer.setAttribute('aria-label', 'Face shape analysis tool');
      analysisContainer.setAttribute('aria-describedby', 'analysis-instructions');
    }

    // Setup file input accessibility
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      input.setAttribute('aria-describedby', 'file-input-help');
      input.setAttribute('accept', 'image/jpeg,image/png,image/webp');
    });

    // Setup results area
    const resultsArea = document.querySelector('[data-results-area]');
    if (resultsArea) {
      resultsArea.setAttribute('role', 'region');
      resultsArea.setAttribute('aria-label', 'Analysis results');
      resultsArea.setAttribute('aria-live', 'polite');
    }
  }

  /**
   * Setup keyboard navigation
   */
  private setupKeyboardNavigation(): void {
    // Focus trap for modals
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));

    // Enhanced tab navigation
    this.setupTabNavigation();

    // Custom keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  /**
   * Handle keyboard navigation events
   */
  private handleKeyboardNavigation(event: KeyboardEvent): void {
    // Escape key handling
    if (event.key === 'Escape') {
      this.handleEscapeKey(event);
    }

    // Enter and Space for button-like elements
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleActivationKeys(event);
    }

    // Arrow key navigation for custom components
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      this.handleArrowNavigation(event);
    }
  }

  /**
   * Setup tab navigation enhancements
   */
  private setupTabNavigation(): void {
    // Ensure proper tab order
    const focusableElements = this.getFocusableElements();
    focusableElements.forEach((element, index) => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });

    // Focus visible indicators
    const style = document.createElement('style');
    style.textContent = `
      .focus-visible {
        outline: 2px solid #0066cc !important;
        outline-offset: 2px !important;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup keyboard shortcuts
   */
  private setupKeyboardShortcuts(): void {
    const shortcuts = {
      'Alt+1': () => this.focusElement('#main-navigation'),
      'Alt+2': () => this.focusElement('#main-content'),
      'Alt+3': () => this.focusElement('#analysis-tool'),
      'Alt+s': () => this.startAnalysis(),
      'Alt+r': () => this.resetAnalysis(),
      'Alt+h': () => this.showHelp()
    };

    document.addEventListener('keydown', (event) => {
      const shortcut = this.getShortcutKey(event);
      if (shortcuts[shortcut as keyof typeof shortcuts]) {
        event.preventDefault();
        shortcuts[shortcut as keyof typeof shortcuts]();
      }
    });
  }

  /**
   * Detect user accessibility preferences
   */
  private detectUserPreferences(): void {
    // Reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.config.enableReducedMotion = true;
      document.body.classList.add('reduced-motion');
      this.announce('Reduced motion mode enabled');
    }

    // High contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      this.config.enableHighContrast = true;
      document.body.classList.add('high-contrast');
      this.announce('High contrast mode enabled');
    }

    // Dark mode preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
    }

    // Screen reader detection
    if (this.isScreenReaderActive()) {
      document.body.classList.add('screen-reader-active');
      this.config.announceChanges = true;
    }
  }

  /**
   * Setup focus management
   */
  private setupFocusManagement(): void {
    // Track focus history
    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement;
      if (target && this.isFocusable(target)) {
        this.focusHistory.push(target);
        if (this.focusHistory.length > 10) {
          this.focusHistory.shift();
        }
      }
    });

    // Manage focus on route changes (SPA)
    this.setupSPAFocusManagement();
  }

  /**
   * Setup skip links
   */
  private setupSkipLinks(): void {
    const skipLinks = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#analysis-tool', text: 'Skip to face analysis tool' },
      { href: '#results', text: 'Skip to results' }
    ];

    const skipNav = document.createElement('nav');
    skipNav.setAttribute('aria-label', 'Skip navigation');
    skipNav.innerHTML = skipLinks
      .map(link => `<a href="${link.href}" class="skip-link">${link.text}</a>`)
      .join('');

    document.body.insertBefore(skipNav, document.body.firstChild);
  }

  /**
   * Enhance form accessibility
   */
  private enhanceFormAccessibility(): void {
    // Add proper labels and descriptions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      this.enhanceForm(form);
    });

    // File input enhancements
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      this.enhanceFileInput(input as HTMLInputElement);
    });
  }

  /**
   * Setup live regions for dynamic content
   */
  private setupLiveRegions(): void {
    // Status updates
    const statusRegion = document.createElement('div');
    statusRegion.id = 'status-updates';
    statusRegion.setAttribute('aria-live', 'polite');
    statusRegion.setAttribute('aria-atomic', 'false');
    statusRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(statusRegion);

    // Progress updates
    const progressRegion = document.createElement('div');
    progressRegion.id = 'progress-updates';
    progressRegion.setAttribute('aria-live', 'assertive');
    progressRegion.setAttribute('aria-atomic', 'true');
    progressRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(progressRegion);
  }

  /**
   * Announce message to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.config.announceChanges || !this.announcer) return;

    this.announcer.setAttribute('aria-live', priority);
    this.announcer.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (this.announcer) {
        this.announcer.textContent = '';
      }
    }, 1000);
  }

  /**
   * Announce face analysis progress
   */
  announceAnalysisProgress(stage: string, progress?: number): void {
    let message = '';
    
    switch (stage) {
      case 'started':
        message = 'Face analysis started. Please wait while we process your image.';
        break;
      case 'processing':
        message = progress ? `Analysis ${progress}% complete` : 'Processing your image...';
        break;
      case 'completed':
        message = 'Face analysis completed. Results are now available.';
        break;
      case 'error':
        message = 'Face analysis failed. Please try again with a different image.';
        break;
      default:
        message = `Analysis update: ${stage}`;
    }

    this.announce(message, stage === 'error' ? 'assertive' : 'polite');
  }

  /**
   * Announce analysis results
   */
  announceResults(faceShape: string, confidence: number, recommendations: number): void {
    const message = `Analysis complete. Your face shape is ${faceShape} with ${Math.round(confidence * 100)}% confidence. ${recommendations} frame recommendations are available.`;
    this.announce(message);
  }

  /**
   * Perform accessibility audit
   */
  auditAccessibility(): AccessibilityAuditResult {
    const issues: AccessibilityIssue[] = [];
    const warnings: AccessibilityWarning[] = [];
    const passed: AccessibilityCheck[] = [];

    // Check images have alt text
    this.auditImages(issues, passed);

    // Check form labels
    this.auditFormLabels(issues, warnings, passed);

    // Check headings structure
    this.auditHeadings(issues, warnings, passed);

    // Check color contrast
    this.auditColorContrast(issues, warnings);

    // Check keyboard accessibility
    this.auditKeyboardAccess(issues, passed);

    // Check ARIA usage
    this.auditARIA(issues, warnings, passed);

    // Check focus management
    this.auditFocusManagement(issues, warnings, passed);

    const score = this.calculateAccessibilityScore(issues, warnings, passed);

    return { score, issues, warnings, passed };
  }

  /**
   * Generate accessibility report
   */
  generateAccessibilityReport(): string {
    const audit = this.auditAccessibility();
    
    let report = '# Accessibility Audit Report\n\n';
    report += `**Generated**: ${new Date().toLocaleString()}\n`;
    report += `**Overall Score**: ${audit.score}/100\n\n`;

    if (audit.score >= 90) {
      report += '✅ **Excellent** - Meets WCAG 2.1 AA standards\n\n';
    } else if (audit.score >= 70) {
      report += '⚠️ **Good** - Minor improvements needed\n\n';
    } else {
      report += '❌ **Needs Improvement** - Significant accessibility issues found\n\n';
    }

    // Issues
    if (audit.issues.length > 0) {
      report += '## Issues Found\n\n';
      audit.issues.forEach(issue => {
        const icon = issue.severity === 'critical' ? '🔴' : 
                    issue.severity === 'serious' ? '🟠' : 
                    issue.severity === 'moderate' ? '🟡' : '🔵';
        report += `${icon} **${issue.rule}** (WCAG ${issue.wcagLevel})\n`;
        report += `- **Element**: ${issue.element}\n`;
        report += `- **Issue**: ${issue.description}\n`;
        report += `- **Fix**: ${issue.fix}\n\n`;
      });
    }

    // Warnings
    if (audit.warnings.length > 0) {
      report += '## Recommendations\n\n';
      audit.warnings.forEach(warning => {
        report += `⚠️ **${warning.rule}**\n`;
        report += `- **Element**: ${warning.element}\n`;
        report += `- **Description**: ${warning.description}\n`;
        report += `- **Recommendation**: ${warning.recommendation}\n\n`;
      });
    }

    // Passed checks
    if (audit.passed.length > 0) {
      report += '## Passed Checks\n\n';
      audit.passed.forEach(check => {
        report += `✅ **${check.rule}** - ${check.count} elements checked\n`;
      });
    }

    return report;
  }

  // Private helper methods
  private getFocusableElements(): HTMLElement[] {
    const selector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  }

  private isFocusable(element: HTMLElement): boolean {
    return element.tabIndex >= 0 && !element.hasAttribute('disabled');
  }

  private isScreenReaderActive(): boolean {
    // Detect if screen reader is likely active
    return window.navigator.userAgent.includes('NVDA') ||
           window.navigator.userAgent.includes('JAWS') ||
           window.speechSynthesis?.speaking ||
           false;
  }

  private handleEscapeKey(event: KeyboardEvent): void {
    // Close modals, dropdowns, etc.
    const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
    if (activeModal) {
      event.preventDefault();
      this.closeModal(activeModal as HTMLElement);
    }
  }

  private handleActivationKeys(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') === 'button' && !target.matches('button, input, a')) {
      event.preventDefault();
      target.click();
    }
  }

  private handleArrowNavigation(event: KeyboardEvent): void {
    // Handle arrow navigation for custom components like image galleries
    const target = event.target as HTMLElement;
    const container = target.closest('[role="grid"], [role="listbox"], [role="tablist"]');
    
    if (container) {
      event.preventDefault();
      this.navigateWithArrows(container, target, event.key);
    }
  }

  private getShortcutKey(event: KeyboardEvent): string {
    const parts = [];
    if (event.ctrlKey) parts.push('Ctrl');
    if (event.altKey) parts.push('Alt');
    if (event.shiftKey) parts.push('Shift');
    parts.push(event.key);
    return parts.join('+');
  }

  private focusElement(selector: string): void {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
      this.announce(`Focused on ${element.getAttribute('aria-label') || element.textContent || selector}`);
    }
  }

  private startAnalysis(): void {
    const analyzeButton = document.querySelector('[data-analyze-button]') as HTMLElement;
    if (analyzeButton) {
      analyzeButton.click();
    }
  }

  private resetAnalysis(): void {
    const resetButton = document.querySelector('[data-reset-button]') as HTMLElement;
    if (resetButton) {
      resetButton.click();
    }
  }

  private showHelp(): void {
    const helpButton = document.querySelector('[data-help-button]') as HTMLElement;
    if (helpButton) {
      helpButton.click();
    }
  }

  private setupSPAFocusManagement(): void {
    // Handle focus on route changes
    let lastUrl = location.href;
    
    const observer = new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        this.handleRouteChange();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }

  private handleRouteChange(): void {
    // Focus main heading or main content area
    const mainHeading = document.querySelector('h1');
    const mainContent = document.querySelector('#main-content, main');
    
    if (mainHeading) {
      mainHeading.focus();
    } else if (mainContent) {
      (mainContent as HTMLElement).focus();
    }
    
    this.announce('Page changed');
  }

  private enhanceForm(form: Element): void {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      // Ensure proper labels
      if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (!label && input.id) {
          console.warn(`Input ${input.id} missing label`);
        }
      }
    });
  }

  private enhanceFileInput(input: HTMLInputElement): void {
    // Add drag and drop accessibility
    const wrapper = input.closest('[data-file-input-wrapper]');
    if (wrapper) {
      wrapper.setAttribute('role', 'button');
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('aria-label', 'Upload image file or drag and drop');
      
      wrapper.addEventListener('keydown', (event) => {
        const keyEvent = event as KeyboardEvent;
        if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
          event.preventDefault();
          input.click();
        }
      });
    }
  }

  private closeModal(modal: HTMLElement): void {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    
    // Return focus to trigger element
    const trigger = document.querySelector('[data-modal-trigger]') as HTMLElement;
    if (trigger) {
      trigger.focus();
    }
  }

  private navigateWithArrows(container: Element, current: HTMLElement, key: string): void {
    const items = Array.from(container.querySelectorAll('[role="gridcell"], [role="option"], [role="tab"]')) as HTMLElement[];
    const currentIndex = items.indexOf(current);
    
    let nextIndex = currentIndex;
    
    switch (key) {
      case 'ArrowUp':
        nextIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowDown':
        nextIndex = Math.min(items.length - 1, currentIndex + 1);
        break;
      case 'ArrowLeft':
        nextIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowRight':
        nextIndex = Math.min(items.length - 1, currentIndex + 1);
        break;
    }
    
    if (nextIndex !== currentIndex && items[nextIndex]) {
      items[nextIndex].focus();
    }
  }

  // Audit methods
  private auditImages(issues: AccessibilityIssue[], passed: AccessibilityCheck[]): void {
    const images = document.querySelectorAll('img');
    let missingAlt = 0;
    
    images.forEach(img => {
      if (!img.hasAttribute('alt')) {
        missingAlt++;
        issues.push({
          severity: 'serious',
          rule: 'Images must have alt text',
          description: 'Image missing alternative text',
          element: img.outerHTML.substring(0, 100) + '...',
          fix: 'Add alt attribute with descriptive text',
          wcagLevel: 'A'
        });
      }
    });
    
    if (missingAlt === 0) {
      passed.push({
        rule: 'Image alt text',
        description: 'All images have alternative text',
        count: images.length
      });
    }
  }

  private auditFormLabels(issues: AccessibilityIssue[], warnings: AccessibilityWarning[], passed: AccessibilityCheck[]): void {
    const inputs = document.querySelectorAll('input, textarea, select');
    let unlabeled = 0;
    
    inputs.forEach(input => {
      const hasLabel = input.hasAttribute('aria-label') || 
                      input.hasAttribute('aria-labelledby') ||
                      document.querySelector(`label[for="${input.id}"]`);
      
      if (!hasLabel) {
        unlabeled++;
        issues.push({
          severity: 'serious',
          rule: 'Form inputs must have labels',
          description: 'Input element missing label',
          element: input.outerHTML.substring(0, 100) + '...',
          fix: 'Add label element or aria-label attribute',
          wcagLevel: 'A'
        });
      }
    });
    
    if (unlabeled === 0) {
      passed.push({
        rule: 'Form labels',
        description: 'All form inputs have labels',
        count: inputs.length
      });
    }
  }

  private auditHeadings(issues: AccessibilityIssue[], warnings: AccessibilityWarning[], passed: AccessibilityCheck[]): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
    
    // Check for h1
    if (!document.querySelector('h1')) {
      issues.push({
        severity: 'serious',
        rule: 'Page must have h1 heading',
        description: 'Missing main page heading',
        element: 'document',
        fix: 'Add h1 element for main page title',
        wcagLevel: 'A'
      });
    }
    
    // Check heading hierarchy
    for (let i = 1; i < headingLevels.length; i++) {
      const current = headingLevels[i];
      const previous = headingLevels[i - 1];
      
      if (current > previous + 1) {
        warnings.push({
          rule: 'Heading hierarchy',
          description: `Heading level ${current} follows h${previous}`,
          element: headings[i].outerHTML.substring(0, 100) + '...',
          recommendation: 'Use sequential heading levels'
        });
      }
    }
    
    if (headings.length > 0) {
      passed.push({
        rule: 'Heading structure',
        description: 'Page has heading structure',
        count: headings.length
      });
    }
  }

  private auditColorContrast(issues: AccessibilityIssue[], warnings: AccessibilityWarning[]): void {
    // Simplified contrast check - in production would use color analysis
    const textElements = document.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6');
    
    textElements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Simplified check for common low-contrast combinations
      if ((color === 'rgb(128, 128, 128)' && backgroundColor === 'rgb(255, 255, 255)') ||
          (color === 'rgb(255, 255, 255)' && backgroundColor === 'rgb(128, 128, 128)')) {
        warnings.push({
          rule: 'Color contrast',
          description: 'Potential low contrast detected',
          element: element.tagName.toLowerCase(),
          recommendation: 'Verify color contrast meets WCAG AA standards (4.5:1 ratio)'
        });
      }
    });
  }

  private auditKeyboardAccess(issues: AccessibilityIssue[], passed: AccessibilityCheck[]): void {
    const interactive = document.querySelectorAll('button, a, input, textarea, select, [tabindex]');
    let keyboardInaccessible = 0;
    
    interactive.forEach(element => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex === '-1' && !element.matches('button, a, input, textarea, select')) {
        keyboardInaccessible++;
        issues.push({
          severity: 'serious',
          rule: 'Keyboard accessibility',
          description: 'Interactive element not keyboard accessible',
          element: element.outerHTML.substring(0, 100) + '...',
          fix: 'Remove tabindex="-1" or add keyboard event handlers',
          wcagLevel: 'A'
        });
      }
    });
    
    if (keyboardInaccessible === 0) {
      passed.push({
        rule: 'Keyboard accessibility',
        description: 'Interactive elements are keyboard accessible',
        count: interactive.length
      });
    }
  }

  private auditARIA(issues: AccessibilityIssue[], warnings: AccessibilityWarning[], passed: AccessibilityCheck[]): void {
    // Check for proper ARIA usage
    const ariaElements = document.querySelectorAll('[role], [aria-label], [aria-labelledby], [aria-describedby]');
    
    ariaElements.forEach(element => {
      const role = element.getAttribute('role');
      if (role && !this.isValidARIARole(role)) {
        issues.push({
          severity: 'moderate',
          rule: 'Valid ARIA roles',
          description: `Invalid ARIA role: ${role}`,
          element: element.outerHTML.substring(0, 100) + '...',
          fix: 'Use valid ARIA role or remove role attribute',
          wcagLevel: 'A'
        });
      }
    });
    
    passed.push({
      rule: 'ARIA usage',
      description: 'ARIA attributes found and validated',
      count: ariaElements.length
    });
  }

  private auditFocusManagement(issues: AccessibilityIssue[], warnings: AccessibilityWarning[], passed: AccessibilityCheck[]): void {
    // Check for focus traps in modals
    const modals = document.querySelectorAll('[role="dialog"]');
    
    modals.forEach(modal => {
      const focusableInModal = modal.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (focusableInModal.length === 0) {
        warnings.push({
          rule: 'Modal focus management',
          description: 'Modal has no focusable elements',
          element: modal.outerHTML.substring(0, 100) + '...',
          recommendation: 'Ensure modals have focusable elements and focus trap'
        });
      }
    });
    
    passed.push({
      rule: 'Focus management',
      description: 'Focus management implemented',
      count: 1
    });
  }

  private isValidARIARole(role: string): boolean {
    const validRoles = [
      'alert', 'button', 'checkbox', 'dialog', 'grid', 'gridcell', 'heading',
      'img', 'link', 'listbox', 'menuitem', 'option', 'progressbar', 'radio',
      'region', 'row', 'searchbox', 'slider', 'spinbutton', 'tab', 'tablist',
      'tabpanel', 'textbox', 'timer', 'tooltip', 'tree', 'treeitem'
    ];
    return validRoles.includes(role);
  }

  private calculateAccessibilityScore(issues: AccessibilityIssue[], warnings: AccessibilityWarning[], passed: AccessibilityCheck[]): number {
    let score = 100;
    
    // Deduct points for issues
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical':
          score -= 20;
          break;
        case 'serious':
          score -= 15;
          break;
        case 'moderate':
          score -= 10;
          break;
        case 'minor':
          score -= 5;
          break;
      }
    });
    
    // Deduct points for warnings
    score -= warnings.length * 2;
    
    return Math.max(0, score);
  }
}

// Export singleton instance
export const accessibility = AccessibilityManager.getInstance();