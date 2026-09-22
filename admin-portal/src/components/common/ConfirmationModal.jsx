import React, { useState } from 'react';
import { AlertCircle, X, Check, AlertTriangle } from 'lucide-react';

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
  requireReason = false,
  reasonPlaceholder = 'Please enter a detailed reason for this action...'
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (requireReason && !reason.trim()) {
      setError('A reason is mandatory for this decision.');
      return;
    }
    onConfirm(reason);
    setReason('');
    setError('');
    onClose();
  };

  return (
    <div className="sb-modal-backdrop" onClick={onClose}>
      <div className="sb-modal-box" onClick={e => e.stopPropagation()}>
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--sb-border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--sb-radius-md)',
              background: isDestructive ? 'var(--sb-status-failed-bg)' : 'var(--sb-primary-light)',
              color: isDestructive ? 'var(--sb-status-failed)' : 'var(--sb-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {isDestructive ? <AlertTriangle size={18} /> : <AlertCircle size={18} />}
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
              {title}
            </h3>
          </div>
          <button onClick={onClose} className="sb-btn sb-btn-ghost sb-btn-sm" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          {description && (
            <p style={{ fontSize: '0.88rem', color: 'var(--sb-text-body)', lineHeight: 1.5, marginBottom: requireReason ? '16px' : '0' }}>
              {description}
            </p>
          )}

          {requireReason && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--sb-text-title)', marginBottom: '6px' }}>
                Reason / Justification <span style={{ color: 'var(--sb-status-failed)' }}>*</span>
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={e => { setReason(e.target.value); setError(''); }}
                placeholder={reasonPlaceholder}
                className="sb-input"
                style={{ width: '100%', resize: 'vertical' }}
              />
              {error && (
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-status-failed)', marginTop: '4px', display: 'block' }}>
                  {error}
                </span>
              )}
            </div>
          )}
        </div>

        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--sb-border-default)',
          background: 'var(--sb-bg-surface-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px'
        }}>
          <button onClick={onClose} className="sb-btn sb-btn-secondary">
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`sb-btn ${isDestructive ? 'sb-btn-danger' : 'sb-btn-primary'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
