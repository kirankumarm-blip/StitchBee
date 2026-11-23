import React, { useState, useEffect, useRef } from 'react';

/**
 * BridalCardImageSlider
 * Automatically alternates between 2 images every 7 seconds (configurable 5-10s)
 * with smooth crossfade, hover pause, tab visibility check, and dot indicators.
 */
export default function BridalCardImageSlider({
  images = [],
  altText = 'Bridal Style',
  interval = 7000,
  className = '',
  onImageClick = null
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Fallback if images array is empty or has only 1 image
  const hasMultipleImages = Array.isArray(images) && images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages || isPaused) return;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) {
      return; // Respect reduced motion: no auto-slide
    }

    const timer = setInterval(() => {
      if (!document.hidden) {
        setActiveIndex(prev => (prev + 1) % images.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [hasMultipleImages, isPaused, images.length, interval]);

  // Pause when document tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`bridal-card-slider-box ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      onClick={(e) => {
        if (onImageClick) {
          onImageClick(e);
        }
      }}
    >
      {/* Image Layers with Smooth Crossfade */}
      {images.map((src, index) => (
        <img
          key={src || index}
          src={src}
          alt={`${altText} - View ${index + 1}`}
          className={`bridal-slider-img ${index === activeIndex ? 'active' : ''}`}
          loading="lazy"
        />
      ))}

      {/* Micro Indicator Dots */}
      {hasMultipleImages && (
        <div 
          className="bridal-slider-indicators" 
          onClick={(e) => e.stopPropagation()}
          aria-label="Image view indicators"
        >
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`bridal-slider-dot ${index === activeIndex ? 'active' : ''}`}
              aria-label={`Show ${altText} view ${index + 1}`}
              aria-pressed={index === activeIndex}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
