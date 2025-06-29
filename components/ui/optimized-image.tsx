'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  // If it's a blob URL or data URL, use regular img tag
  if (src.startsWith('blob:') || src.startsWith('data:')) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(className)}
        onLoad={onLoad}
        onError={onError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
        }}
      />
    );
  }

  // Use Next.js Image for external URLs
  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={cn(className)}
      priority={priority}
      quality={quality}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onLoad={onLoad}
      onError={onError}
      style={{
        objectFit: 'cover',
      }}
    />
  );
}

// Preset for common image sizes
export const ImagePresets = {
  thumbnail: {
    width: 150,
    height: 150,
    sizes: '(max-width: 768px) 100vw, 150px',
  },
  card: {
    width: 400,
    height: 300,
    sizes: '(max-width: 768px) 100vw, 400px',
  },
  hero: {
    width: 1200,
    height: 630,
    sizes: '(max-width: 768px) 100vw, 1200px',
    priority: true,
  },
  gallery: {
    width: 600,
    height: 400,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  },
} as const;