import React from 'react';
import { X } from 'lucide-react';

export function DetailsDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = '560px'
}) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(3px)',
        zIndex: 1050,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.25s ease'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: width,
          height: '100%',
          backgroundColor: 'var(--sb-bg-surface)',
          borderLeft: '1px solid var(--sb-border-default)',
          boxShadow: 'var(--sb-shadow-dropdown)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'sbSlideInRight 0.25s ease-out',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--sb-border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--sb-bg-surface)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--sb-text-title)', margin: 0 }}>
              {title}
            </h3>
            {subtitle && (
              <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="sb-btn sb-btn-ghost sb-btn-sm"
            style={{ padding: '6px', borderRadius: '50%' }}
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body with scroll */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default DetailsDrawer;
