import React from 'react';
import { PackageOpen, Plus } from 'lucide-react';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No records found',
  description = 'There are currently no items to display in this view.',
  actionText,
  onAction
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      background: 'var(--sb-bg-surface)',
      borderRadius: 'var(--sb-radius-lg)',
      border: '1px dashed var(--sb-border-default)',
      margin: '16px 0'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'var(--sb-primary-light)',
        color: 'var(--sb-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        <Icon size={26} />
      </div>

      <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--sb-text-title)', marginBottom: '6px' }}>
        {title}
      </h4>

      <p style={{ fontSize: '0.85rem', color: 'var(--sb-text-muted)', maxWidth: '420px', lineHeight: 1.5, marginBottom: actionText ? '20px' : '0' }}>
        {description}
      </p>

      {actionText && onAction && (
        <button onClick={onAction} className="sb-btn sb-btn-primary">
          <Plus size={16} />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
