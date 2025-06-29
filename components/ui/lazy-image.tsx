'use client';

import React, { useEffect, useRef, useState } from 'react';
import { OptimizedImage } from './optimized-image';
import { createLazyImageObserver } from '@/lib/image-optimization';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  placeholder,
  threshold = 0.1,
  rootMargin = '50px',
  sizes,
  quality = 85,
  priority = false,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsIntersecting(true);
      return;
    }

    const element = imgRef.current;
    if (!element) return;

    const observer = createLazyImageObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [priority, threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    onError?.();
  };

  const defaultPlaceholder = (
    <div 
      className={cn(
        'flex items-center justify-center bg-muted animate-pulse rounded-lg',
        className
      )}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      <div className="text-muted-foreground text-sm">Loading...</div>
    </div>
  );

  return (
    <div ref={imgRef} className="relative">
      {!isIntersecting && (placeholder || defaultPlaceholder)}
      
      {isIntersecting && (
        <>
          {!isLoaded && (placeholder || defaultPlaceholder)}
          <OptimizedImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
              className
            )}
            sizes={sizes}
            quality={quality}
            priority={priority}
            onLoad={handleLoad}
            onError={handleError}
          />
        </>
      )}
    </div>
  );
}

// Specialized lazy loading component for hero images
export function LazyHeroImage(props: Omit<LazyImageProps, 'priority'>) {
  return <LazyImage {...props} priority={true} />;
}

// Specialized lazy loading component for below-the-fold content
export function LazyContentImage(props: LazyImageProps) {
  return (
    <LazyImage
      {...props}
      rootMargin="100px"
      threshold={0.1}
      priority={false}
    />
  );
}