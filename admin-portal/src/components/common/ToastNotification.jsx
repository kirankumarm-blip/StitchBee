import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastNotification({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration || 3500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 2000,
      background: 'var(--sb-bg-surface)',
      border: `1px solid ${isError ? 'var(--sb-status-failed-border)' : isWarning ? 'var(--sb-status-pending-border)' : 'var(--sb-status-success-border)'}`,
      borderRadius: 'var(--sb-radius-lg)',
      boxShadow: 'var(--sb-shadow-dropdown)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '420px',
      animation: 'sbFadeIn 0.25s ease-out'
    }}>
      <div style={{
        color: isError ? 'var(--sb-status-failed)' : isWarning ? 'var(--sb-accent)' : 'var(--sb-status-success)',
        display: 'flex',
        alignItems: 'center'
      }}>
        {isError ? <AlertTriangle size={20} /> : isWarning ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
      </div>

      <div style={{ flex: 1 }}>
        {toast.title && (
          <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
            {toast.title}
          </div>
        )}
        <div style={{ fontSize: '0.8rem', color: 'var(--sb-text-body)', marginTop: toast.title ? '2px' : 0 }}>
          {toast.message}
        </div>
      </div>

      <button
        onClick={onDismiss}
        className="sb-btn sb-btn-ghost sb-btn-sm"
        style={{ padding: '4px', color: 'var(--sb-text-muted)' }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
