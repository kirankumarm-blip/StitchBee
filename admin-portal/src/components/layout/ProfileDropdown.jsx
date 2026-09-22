import React, { useState, useRef, useEffect } from 'react';
import { User, Shield, LogOut, Settings, CheckCircle2, ChevronDown } from 'lucide-react';
import { ADMIN_USER } from '../../data/adminMockData';

export default function ProfileDropdown({ onNavigateTab, onLogout, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentUser = user || ADMIN_USER;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 6px',
          borderRadius: 'var(--sb-radius-md)'
        }}
      >
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          backgroundColor: 'var(--sb-primary)',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--sb-shadow-xs)'
        }}>
          {currentUser.avatar || 'SB'}
        </div>

        <div style={{ textAlign: 'left', display: 'none' }} className="admin-profile-desktop-info">
          <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--sb-text-title)', lineHeight: 1.2 }}>
            {currentUser.name}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', lineHeight: 1.1 }}>
            {currentUser.role}
          </div>
        </div>

        <ChevronDown size={14} color="var(--sb-text-muted)" />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '46px',
          right: 0,
          width: '240px',
          backgroundColor: 'var(--sb-bg-surface)',
          border: '1px solid var(--sb-border-default)',
          borderRadius: 'var(--sb-radius-lg)',
          boxShadow: 'var(--sb-shadow-dropdown)',
          zIndex: 1060,
          padding: '8px',
          animation: 'sbFadeIn 0.2s ease-out'
        }}>
          {/* User Details */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--sb-border-subtle)', marginBottom: '6px' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>
              {currentUser.email}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '0.72rem', fontWeight: 600, color: 'var(--sb-primary)', background: 'var(--sb-primary-light)', padding: '2px 8px', borderRadius: 'var(--sb-radius-full)' }}>
              <Shield size={12} />
              <span>{currentUser.role}</span>
            </div>
          </div>

          <div
            onClick={() => { if (onNavigateTab) onNavigateTab('settings'); setIsOpen(false); }}
            style={{
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: 'var(--sb-text-body)',
              cursor: 'pointer',
              borderRadius: 'var(--sb-radius-sm)',
              transition: 'background var(--sb-transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--sb-bg-surface-hover)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Settings size={15} color="var(--sb-text-muted)" />
            <span>Platform Settings</span>
          </div>

          <div
            onClick={() => {
              setIsOpen(false);
              if (onLogout) onLogout();
            }}
            style={{
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: 'var(--sb-status-failed)',
              cursor: 'pointer',
              borderRadius: 'var(--sb-radius-sm)',
              transition: 'background var(--sb-transition-fast)'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--sb-status-failed-bg)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={15} />
            <span>Logout Session</span>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .admin-profile-desktop-info {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
