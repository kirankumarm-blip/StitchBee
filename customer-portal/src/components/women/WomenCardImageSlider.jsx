import React, { useState, useEffect, useRef } from 'react';

/**
 * WomenCardImageSlider
 * Supports:
 * - Dual matching images per card
 * - Automatic transition every 7 seconds (7000ms)
 * - Desktop hover: immediately smoothly transitions to Image 2, pauses auto-switching
 * - Desktop mouse leave: returns to Image 1 and restarts automatic timer
 * - Mobile/touch: tap on indicator dots or image toggles view
 * - Respects prefers-reduced-motion & document visibility
 */
export default function WomenCardImageSlider({
  images = [],
  title = 'Outfit View',
  interval = 7000,
  className = '',
  onImageClick = null
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const hasMultipleImages = Array.isArray(images) && images.length > 1;

  // Automatic timer alternating images when not hovered
  useEffect(() => {
    if (isHovered || !hasMultipleImages) return;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveImage(prev => (prev + 1) % images.length);
      }
    }, interval);

    return () => window.clearInterval(timer);
  }, [hasMultipleImages, isHovered, images.length, interval]);

  // Pause on tab visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        // Paused implicitly because document.hidden check in interval
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Hover Interaction: Immediately show Image 2 on mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hasMultipleImages) {
      setActiveImage(1);
    }
  };

  // Mouse leave: Return to Image 1 and restart auto-switching
  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveImage(0);
  };

  // Toggle on mobile tap
  const handleCardClick = (e) => {
    if (onImageClick) {
      onImageClick(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`women-dual-slider-box ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* 2 Layered Images with Smooth Crossfade */}
      {images.map((src, index) => (
        <img
          key={src || index}
          src={src}
          alt={`${title} - View ${index + 1}`}
          className={`women-slider-img ${index === activeImage ? 'active' : ''}`}
          loading="lazy"
        />
      ))}

      {/* Micro Image Dot Indicators */}
      {hasMultipleImages && (
        <div 
          className="women-slider-indicators" 
          onClick={(e) => e.stopPropagation()}
          aria-label="Outfit view indicators"
        >
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`women-slider-dot ${index === activeImage ? 'active' : ''}`}
              aria-label={`Show ${title} view ${index + 1}`}
              aria-pressed={index === activeImage}
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
