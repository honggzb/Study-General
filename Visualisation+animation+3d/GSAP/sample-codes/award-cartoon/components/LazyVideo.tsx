"use client";

/**
 * Uses IntersectionObserver to only load videos when they're about to enter the viewport
 * Sets preload="none" to prevent early network requests
 * Uses playsInline for better mobile compatibility
 * Configurable rootMargin (default 200px) for preloading before visible
 */

import React, { useRef, useState, useEffect } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  poster?: string;
  id?: string;
  onLoadedData?: () => void;
  rootMargin?: string;
  threshold?: number;
}

const LazyVideo = ({
  src,
  className = '',
  loop = true,
  muted = true,
  autoPlay = true,
  poster,
  id,
  onLoadedData,
  rootMargin = '200px',
  threshold = 0.1,
}: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible || isLoaded) return;

    // Set the source when visible
    video.src = src;
    video.load();

    const handleLoadedData = () => {
      setIsLoaded(true);
      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay might be blocked, ignore the error
        });
      }
      onLoadedData?.();
    };

    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isVisible, src, autoPlay, onLoadedData, isLoaded]);

  return (
    <video
      ref={videoRef}
      className={className}
      loop={loop}
      muted={muted}
      playsInline
      poster={poster}
      id={id}
      preload="none"
    />
  );
};

export default LazyVideo;
