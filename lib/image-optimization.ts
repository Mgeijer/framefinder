/**
 * Image optimization utilities for better Core Web Vitals
 */

// Generate optimized image URLs with proper sizing and format
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpg' | 'png';
  } = {}
): string {
  const { width, height, quality = 85, format = 'webp' } = options;

  // Handle Unsplash images
  if (src.includes('unsplash.com')) {
    let optimizedUrl = src;
    
    // Add query parameters for optimization
    const params = new URLSearchParams();
    
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    params.set('fm', format);
    params.set('fit', 'crop');
    params.set('crop', 'faces,center');
    
    const separator = src.includes('?') ? '&' : '?';
    optimizedUrl = `${src}${separator}${params.toString()}`;
    
    return optimizedUrl;
  }

  // For other external images, return as-is
  // Next.js Image component will handle optimization
  return src;
}

// Generate blur placeholder for better loading experience
export function generateBlurDataUrl(width = 8, height = 8): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a subtle gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}

// Responsive image sizes for different breakpoints
export const responsiveSizes = {
  full: '100vw',
  half: '(max-width: 768px) 100vw, 50vw',
  third: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quarter: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  thumbnail: '(max-width: 768px) 100px, 150px',
  hero: '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px',
} as const;

// Common image dimensions for consistent sizing
export const imageDimensions = {
  thumbnail: { width: 150, height: 150 },
  card: { width: 400, height: 300 },
  hero: { width: 1200, height: 630 },
  avatar: { width: 100, height: 100 },
  gallery: { width: 600, height: 400 },
  banner: { width: 800, height: 200 },
} as const;

// Preload critical images for better LCP
export function preloadCriticalImage(src: string, sizes?: string): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  
  if (sizes) {
    link.setAttribute('imagesizes', sizes);
  }
  
  document.head.appendChild(link);
}

// Lazy load images with intersection observer
export function createLazyImageObserver(callback: (entries: IntersectionObserverEntry[]) => void): IntersectionObserver {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
  });
}

// Optimize image file before upload
export async function optimizeImageFile(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'jpeg' | 'webp';
  } = {}
): Promise<File> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8, format = 'jpeg' } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const optimizedFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, `.${format}`),
              { type: `image/${format}` }
            );
            resolve(optimizedFile);
          } else {
            reject(new Error('Failed to optimize image'));
          }
        },
        `image/${format}`,
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}