import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER RESTORATION",
  title,
  subtitle,
  aspectRatio = "16/9",
  className = ""
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className={`before-after-wrapper ${className}`} style={{ width: '100%', margin: '2rem 0' }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
          {title && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={18} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {title}
              </h3>
            </div>
          )}
          {subtitle && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, maxWidth: '600px', marginInline: 'auto' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspectRatio,
          maxHeight: '520px',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'ew-resize',
          userSelect: 'none',
          boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
          border: '1px solid var(--border-color)',
          background: '#090812'
        }}
      >
        {/* AFTER IMAGE (Bottom Layer - Full Width) */}
        <img
          src={afterImage}
          alt={afterLabel}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
        />

        {/* AFTER BADGE */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'rgba(16, 185, 129, 0.9)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            padding: '6px 12px',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 2,
            textTransform: 'uppercase'
          }}
        >
          {afterLabel}
        </div>

        {/* BEFORE IMAGE (Top Layer - Clipped) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            pointerEvents: 'none'
          }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {/* BEFORE BADGE */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'rgba(239, 68, 68, 0.88)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              padding: '6px 12px',
              borderRadius: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              textTransform: 'uppercase'
            }}
          >
            {beforeLabel}
          </div>
        </div>

        {/* DIVIDER LINE */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '3px',
            background: '#ffffff',
            boxShadow: '0 0 12px rgba(247,37,133,0.8), 0 0 24px rgba(0,0,0,0.6)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          {/* DRAG HANDLE */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--grad-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(247,37,133,0.6), 0 4px 12px rgba(0,0,0,0.5)',
              border: '3px solid #ffffff',
              cursor: 'grab',
              pointerEvents: 'auto',
              transition: 'transform 0.15s ease'
            }}
          >
            <ChevronsLeftRight size={20} />
          </div>
        </div>

        {/* INTERACTION HINT PILL */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.72rem',
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.15)',
            pointerEvents: 'none',
            zIndex: 5
          }}
        >
          Drag horizontally to compare
        </div>
      </div>
    </div>
  );
}
