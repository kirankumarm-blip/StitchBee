import React from 'react';

export default function OrderProgressBar({ progress }) {
  const isComplete = progress === 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
      <div style={{ flex: 1, height: '6px', minWidth: '60px', background: 'rgba(0,0,0,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.min(100, Math.max(0, progress))}%`,
            background: isComplete ? '#12B76A' : '#F72585',
            borderRadius: '10px',
            transition: 'width 0.4s ease-in-out'
          }}
        />
      </div>
      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', minWidth: '28px', textAlign: 'right' }}>
        {progress}%
      </span>
    </div>
  );
}
