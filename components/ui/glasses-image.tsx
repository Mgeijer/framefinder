'use client';

import React, { useState } from 'react';
import { OptimizedImage } from './optimized-image';
import { getOptimizedImageUrl, imageDimensions, responsiveSizes } from '@/lib/image-optimization';
import { cn } from '@/lib/utils';

interface GlassesImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: keyof typeof imageDimensions;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function GlassesImage({
  src,
  alt,
  className,
  size = 'card',
  priority = false,
  onLoad,
  onError,
}: GlassesImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dimensions = imageDimensions[size];
  const optimizedSrc = getOptimizedImageUrl(src, {
    width: dimensions.width,
    height: dimensions.height,
    quality: 85,
    format: 'webp',
  });

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  // Fallback for broken images
  if (imageError) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-muted rounded-lg border-2 border-dashed border-border',
          className
        )}
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <div className="text-center text-muted-foreground">
          <div className="text-2xl mb-1">👓</div>
          <div className="text-xs">Image unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className={cn(
            'absolute inset-0 flex items-center justify-center bg-muted rounded-lg animate-pulse',
            className
          )}
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          <div className="text-muted-foreground">
            <div className="animate-spin h-6 w-6 border-2 border-current border-t-transparent rounded-full"></div>
          </div>
        </div>
      )}
      
      <OptimizedImage
        src={optimizedSrc}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className={cn(
          'rounded-lg object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        sizes={responsiveSizes.half}
        priority={priority}
        quality={85}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

// Preset components for common use cases
export function GlassesCardImage(props: Omit<GlassesImageProps, 'size'>) {
  return <GlassesImage {...props} size="card" />;
}

export function GlassesThumbnail(props: Omit<GlassesImageProps, 'size'>) {
  return <GlassesImage {...props} size="thumbnail" />;
}

export function GlassesGalleryImage(props: Omit<GlassesImageProps, 'size'>) {
  return <GlassesImage {...props} size="gallery" />;
}