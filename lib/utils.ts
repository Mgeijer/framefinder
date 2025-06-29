import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFaceShapeName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Please upload a JPEG, PNG, or WebP image.' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'Image size must be less than 10MB.' };
  }

  return { isValid: true };
}

export function resizeImage(file: File, maxWidth: number = 800): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      let newWidth = width;
      let newHeight = height;

      if (width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (height * maxWidth) / width;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/jpeg', 0.8);
    };

    img.src = URL.createObjectURL(file);
  });
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function calculateConfidence(measurements: any, targetRanges: any): number {
  let confidence = 0;
  let totalChecks = 0;

  Object.keys(measurements).forEach(key => {
    if (targetRanges[key]) {
      const value = measurements[key];
      const [min, max] = targetRanges[key];
      
      if (value >= min && value <= max) {
        confidence += 1;
      }
      totalChecks += 1;
    }
  });

  return totalChecks > 0 ? confidence / totalChecks : 0;
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
} 