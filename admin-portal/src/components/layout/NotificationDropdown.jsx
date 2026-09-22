import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, ShieldAlert, AlertTriangle, IndianRupee, Sparkles } from 'lucide-react';
import { ADMIN_ALERTS, RECENT_ACTIVITIES } from '../../data/adminMockData';

export default function NotificationDropdown({ onNavigateTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(ADMIN_ALERTS.length);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAlertClick = (targetTab) => {
    if (onNavigateTab && targetTab) {
      onNavigateTab(targetTab);
    }
    setIsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sb-btn sb-btn-ghost"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--sb-radius-md)',
          padding: 0,
          position: 'relative',
          color: 'var(--sb-text-title)'
        }}
        title="Platform Notifications"
        aria-label="Notifications"
      >
        <Bell size={19} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--sb-accent)',
            boxShadow: '0 0 0 2px var(--sb-bg-surface)'
          }} />
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '46px',
          right: 0,
          width: '360px',
          backgroundColor: 'var(--sb-bg-surface)',
          border: '1px solid var(--sb-border-default)',
          borderRadius: 'var(--sb-radius-lg)',
          boxShadow: 'var(--sb-shadow-dropdown)',
          zIndex: 1060,
          animation: 'sbFadeIn 0.2s ease-out'
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--sb-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--sb-text-title)', margin: 0 }}>
                Notifications & Alerts
              </h4>
              <span style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>
                {unreadCount} actionable platform alerts
              </span>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.74rem',
                  color: 'var(--sb-primary)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Alerts List */}
          <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '8px 0' }}>
            {ADMIN_ALERTS.map(alert => (
              <div
                key={alert.id}
                onClick={() => handleAlertClick(alert.targetTab)}
                style={{
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--sb-border-subtle)',
                  transition: 'background var(--sb-transition-fast)'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--sb-bg-surface-hover)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--sb-radius-md)',
                  background: alert.level === 'danger' ? 'var(--sb-status-failed-bg)' : 'var(--sb-accent-light)',
                  color: alert.level === 'danger' ? 'var(--sb-status-failed)' : 'var(--sb-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {alert.level === 'danger' ? <AlertTriangle size={16} /> : <ShieldAlert size={16} />}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
                      {alert.title}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: 'var(--sb-accent-light)',
                      color: 'var(--sb-accent)',
                      padding: '1px 6px',
                      borderRadius: 'var(--sb-radius-full)'
                    }}>
                      {alert.count}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                    {alert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            padding: '10px 18px',
            borderTop: '1px solid var(--sb-border-default)',
            textAlign: 'center',
            background: 'var(--sb-bg-surface-subtle)'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>
              Real-time webhook sync enabled
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
