/**
 * Browser support detection utilities
 * Ensures graceful degradation for unsupported features
 */

export interface BrowserCapabilities {
  webgl: boolean;
  mediaDevices: boolean;
  intersectionObserver: boolean;
  performanceObserver: boolean;
  webp: boolean;
  avif: boolean;
  css: {
    grid: boolean;
    flexbox: boolean;
    customProperties: boolean;
    aspectRatio: boolean;
  };
  js: {
    asyncAwait: boolean;
    optionalChaining: boolean;
    nullishCoalescing: boolean;
    modules: boolean;
  };
}

/**
 * Detect WebGL support for TensorFlow.js
 */
export function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}

/**
 * Detect camera/media devices support
 */
export function detectMediaDevices(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  return !!(
    navigator.mediaDevices && 
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    window.MediaStream
  );
}

/**
 * Detect Intersection Observer support
 */
export function detectIntersectionObserver(): boolean {
  if (typeof window === 'undefined') return false;
  return 'IntersectionObserver' in window;
}

/**
 * Detect Performance Observer support
 */
export function detectPerformanceObserver(): boolean {
  if (typeof window === 'undefined') return false;
  return 'PerformanceObserver' in window;
}

/**
 * Detect image format support
 */
export function detectImageFormat(format: 'webp' | 'avif'): Promise<boolean> {
  return new Promise((resolve) => {
    const testImages = {
      webp: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
      avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
    };

    const img = new Image();
    img.onload = () => resolve(img.width === 1 && img.height === 1);
    img.onerror = () => resolve(false);
    img.src = testImages[format];
  });
}

/**
 * Detect CSS feature support
 */
export function detectCSSFeature(property: string, value?: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const element = document.createElement('div');
  const style = element.style;
  
  try {
    if (value) {
      (style as any)[property] = value;
      return (style as any)[property] === value;
    } else {
      return property in style;
    }
  } catch (e) {
    return false;
  }
}

/**
 * Detect JavaScript feature support
 */
export function detectJSFeatures(): BrowserCapabilities['js'] {
  const features = {
    asyncAwait: false,
    optionalChaining: false,
    nullishCoalescing: false,
    modules: false,
  };

  try {
    // Test async/await
    eval('(async () => {})');
    features.asyncAwait = true;
  } catch (e) {
    // Async/await not supported
  }

  try {
    // Test optional chaining
    eval('({})?.test');
    features.optionalChaining = true;
  } catch (e) {
    // Optional chaining not supported
  }

  try {
    // Test nullish coalescing
    eval('null ?? "test"');
    features.nullishCoalescing = true;
  } catch (e) {
    // Nullish coalescing not supported
  }

  // Test ES modules
  features.modules = 'noModule' in document.createElement('script');

  return features;
}

/**
 * Get comprehensive browser capabilities
 */
export async function getBrowserCapabilities(): Promise<BrowserCapabilities> {
  const [webpSupport, avifSupport] = await Promise.all([
    detectImageFormat('webp'),
    detectImageFormat('avif'),
  ]);

  return {
    webgl: detectWebGL(),
    mediaDevices: detectMediaDevices(),
    intersectionObserver: detectIntersectionObserver(),
    performanceObserver: detectPerformanceObserver(),
    webp: webpSupport,
    avif: avifSupport,
    css: {
      grid: detectCSSFeature('display', 'grid'),
      flexbox: detectCSSFeature('display', 'flex'),
      customProperties: detectCSSFeature('--test', 'test'),
      aspectRatio: detectCSSFeature('aspectRatio'),
    },
    js: detectJSFeatures(),
  };
}

/**
 * Check if browser meets minimum requirements
 */
export function checkMinimumRequirements(capabilities: BrowserCapabilities): {
  supported: boolean;
  missing: string[];
} {
  const requirements = [
    { key: 'webgl', name: 'WebGL support for AI face detection' },
    { key: 'css.grid', name: 'CSS Grid layout support' },
    { key: 'css.flexbox', name: 'CSS Flexbox support' },
    { key: 'js.asyncAwait', name: 'Modern JavaScript (async/await)' },
  ];

  const missing: string[] = [];

  requirements.forEach(req => {
    const supported = req.key.split('.').reduce((obj, key) => obj?.[key], capabilities as any);
    if (!supported) {
      missing.push(req.name);
    }
  });

  return {
    supported: missing.length === 0,
    missing,
  };
}

/**
 * Display browser compatibility warning
 */
export function showCompatibilityWarning(missing: string[]): void {
  if (typeof document === 'undefined') return;

  const warningDiv = document.createElement('div');
  warningDiv.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ef4444;
      color: white;
      padding: 12px;
      text-align: center;
      z-index: 9999;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
    ">
      <strong>Browser Compatibility Warning:</strong> 
      Your browser may not support some features. Missing: ${missing.join(', ')}
      <br>
      <small>For the best experience, please use a modern browser like Chrome, Safari, Firefox, or Edge.</small>
    </div>
  `;

  document.body.insertBefore(warningDiv, document.body.firstChild);

  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (warningDiv.parentNode) {
      warningDiv.parentNode.removeChild(warningDiv);
    }
  }, 10000);
}

/**
 * Initialize browser compatibility checking
 */
export async function initBrowserCheck(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const capabilities = await getBrowserCapabilities();
    const requirements = checkMinimumRequirements(capabilities);

    // Log capabilities for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Browser Capabilities:', capabilities);
      console.log('Requirements Check:', requirements);
    }

    // Show warning if requirements not met
    if (!requirements.supported) {
      showCompatibilityWarning(requirements.missing);
    }

    // Store capabilities globally for other components to use
    (window as any).__browserCapabilities = capabilities;

  } catch (error) {
    console.warn('Failed to check browser compatibility:', error);
  }
}

/**
 * Get stored browser capabilities
 */
export function getBrowserCapabilitiesSync(): BrowserCapabilities | null {
  if (typeof window === 'undefined') return null;
  return (window as any).__browserCapabilities || null;
}