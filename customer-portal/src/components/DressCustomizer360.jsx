import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Move, Sparkles } from 'lucide-react';

export default function DressCustomizer360({ minimal = false }) {
  const [activeDressIdx, setActiveDressIdx] = useState(0); // selected dress index
  const [angle, setAngle] = useState(0); // rotation angle 0 to 360
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const angleStart = useRef(0);

  // The 3 premium dresses with 360° frames (Front, Side, Back, and flipped side)
  const dresses = [
    {
      id: 'dress1',
      title: 'Midnight Onyx Gown',
      desc: 'Hand-beaded leaf embroidery, high thigh slit, and a flowing sheer cape.',
      badge: 'Signature Design',
      frames: {
        front: '/dress1.jpg',
        side: '/dress1_side.png',
        back: '/dress1_back.png'
      }
    },
    {
      id: 'dress2',
      title: 'Aurelia Gold Gown',
      desc: 'Striking asymmetric silhouette blending sleek black satin with liquid gold silk mermaid trail.',
      badge: 'Trending Design',
      frames: {
        front: '/dress2.jpg',
        side: '/dress2_side.png',
        back: '/dress2_back.png'
      }
    },
    {
      id: 'dress3',
      title: 'Crimson Ombre Gown',
      desc: 'Pleated crimson chiffon transitioning into a structured dark corset bodice with a shoulder drape.',
      badge: 'Premium Edition',
      frames: {
        front: '/dress3.jpg',
        side: '/dress3_side.png',
        back: '/dress3_back.png'
      }
    }
  ];

  const currentDress = dresses[activeDressIdx];

  // 1. Determine active image frame and horizontal scale mirroring based on angle
  const getActiveFrame = () => {
    const normAngle = ((angle % 360) + 360) % 360;
    
    if (normAngle >= 315 || normAngle < 45) {
      return { src: currentDress.frames.front, scaleX: 1, label: 'Front View' };
    } else if (normAngle >= 45 && normAngle < 135) {
      return { src: currentDress.frames.side, scaleX: 1, label: 'Right Side' };
    } else if (normAngle >= 135 && normAngle < 225) {
      return { src: currentDress.frames.back, scaleX: 1, label: 'Back View' };
    } else {
      return { src: currentDress.frames.side, scaleX: -1, label: 'Left Side' };
    }
  };

  const activeFrame = getActiveFrame();

  const handleStart = (clientX) => {
    setIsDragging(true);
    dragStart.current = clientX;
    angleStart.current = angle;
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStart.current;
    const newAngle = angleStart.current - deltaX;
    setAngle(((newAngle % 360) + 360) % 360);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Calculate 3D tilt physics (swings continuously between -45 and 45 depending on visual turn)
  const normAngle = ((angle % 360) + 360) % 360;
  const cardTilt = ((normAngle + 45) % 90) - 45;

  return (
    <div 
      className={minimal ? "" : "glass-card-no-hover"} 
      style={{ 
        padding: minimal ? '12px 16px' : '24px', 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: minimal ? '10px' : '20px', 
        height: '100%',
        justifyContent: 'space-between',
        background: minimal ? 'transparent' : undefined,
        border: minimal ? 'none' : undefined,
        boxShadow: minimal ? 'none' : undefined
      }}
    >
      
      {/* Header Info */}
      <div className="flex-row-between">
        <div>
          <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem' }}>
            <Move size={10} /> 360° Drag Rotate
          </span>
          {!minimal && <h4 style={{ fontSize: '1.1rem', marginTop: '6px', color: '#fff' }}>Interactive 3D Apparel Showcase</h4>}
        </div>
        <button 
          onClick={() => { setAngle(0); setActiveDressIdx(0); }} 
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
          title="Reset Customizer"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Catalog Selectors */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Select a design to interact:</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {dresses.map((dress, idx) => (
            <button
              key={dress.id}
              onClick={() => { setActiveDressIdx(idx); setAngle(0); }}
              style={{
                flex: 1,
                padding: '6px 10px',
                borderRadius: '8px',
                border: activeDressIdx === idx ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: activeDressIdx === idx ? 'rgba(247, 37, 133, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                color: activeDressIdx === idx ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: activeDressIdx === idx ? '600' : '400',
                boxShadow: activeDressIdx === idx ? '0 0 10px rgba(247,37,133,0.2)' : 'none'
              }}
            >
              {dress.title.split(' ')[0]} Gown
            </button>
          ))}
        </div>
      </div>

      {/* 360° Rotation Stage */}
      <div 
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        style={{
          height: minimal ? '210px' : '290px', 
          background: 'radial-gradient(circle, rgba(255,255,255,0.01) 0%, rgba(0,0,0,0.3) 100%)',
          borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          cursor: isDragging ? 'grabbing' : 'grab', perspective: '1000px', userSelect: 'none',
          border: '1px solid rgba(255,255,255,0.04)',
          transition: 'height 0.3s ease'
        }}
      >
        <div style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          {activeFrame.label} ({Math.round(angle)}°)
        </div>

        <div style={{ position: 'absolute', bottom: '8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '20px' }}>
          <Move size={10} /> Swipe left/right to rotate
        </div>

        {/* 3D Rotating Card Container */}
        <div 
          style={{
            width: '180px', height: minimal ? '190px' : '260px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `rotateY(${cardTilt}deg)`, transformStyle: 'preserve-3d', transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <img 
            src={activeFrame.src} 
            alt={currentDress.title} 
            style={{
              maxHeight: minimal ? '180px' : '240px', objectFit: 'contain', pointerEvents: 'none',
              transform: `scaleX(${activeFrame.scaleX})`,
              borderRadius: '8px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
            }}
          />
        </div>
      </div>

      {/* active Dress Details Card */}
      <div 
        className="glass-card-no-hover"
        style={{ 
          padding: '10px 14px', 
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          minHeight: '68px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '2px' }}>
          <Sparkles size={11} style={{ color: 'var(--primary)' }} />
          <h5 style={{ margin: 0, fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>
            {currentDress.title} <span className="badge badge-primary" style={{ fontSize: '0.55rem', padding: '2px 6px', marginLeft: '6px' }}>{currentDress.badge}</span>
          </h5>
        </div>
        <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: '1.25' }}>
          {currentDress.desc}
        </p>
      </div>

      {/* Angle Slider input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <input 
          type="range" 
          min="0" 
          max="359" 
          value={angle} 
          onChange={(e) => setAngle(parseInt(e.target.value))}
          style={{
            width: '100%', accentColor: 'var(--primary)', cursor: 'pointer', background: 'rgba(255,255,255,0.08)', height: '4px', borderRadius: '2px'
          }}
          title="Drag slider to spin"
        />
      </div>

    </div>
  );
}
