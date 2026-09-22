import React from 'react';

export default function LoadingSkeleton({ rows = 4, type = 'card' }) {
  if (type === 'table') {
    return (
      <div className="sb-card" style={{ padding: '20px' }}>
        <div style={{ height: '28px', width: '200px', background: 'var(--sb-bg-surface-subtle)', borderRadius: 'var(--sb-radius-sm)', marginBottom: '16px' }}></div>
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} style={{
            height: '42px',
            background: 'var(--sb-bg-surface-subtle)',
            borderRadius: 'var(--sb-radius-sm)',
            marginBottom: '8px',
            opacity: 1 - (idx * 0.15)
          }}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="sb-grid-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="sb-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ height: '16px', width: '100px', background: 'var(--sb-bg-surface-subtle)', borderRadius: 'var(--sb-radius-sm)' }}></div>
            <div style={{ width: '36px', height: '36px', background: 'var(--sb-bg-surface-subtle)', borderRadius: 'var(--sb-radius-md)' }}></div>
          </div>
          <div style={{ height: '32px', width: '120px', background: 'var(--sb-bg-surface-subtle)', borderRadius: 'var(--sb-radius-sm)', marginBottom: '10px' }}></div>
          <div style={{ height: '14px', width: '80px', background: 'var(--sb-bg-surface-subtle)', borderRadius: 'var(--sb-radius-sm)' }}></div>
        </div>
      ))}
    </div>
  );
}
