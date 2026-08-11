import React from 'react';

export default function LiveOrderActivity({ activityLog, isLive, theme }) {
  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      boxShadow: '0 2px 8px rgba(16,24,40,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Live Order Activity</h4>
        <span style={{ fontSize: '10px', color: isLive ? '#12B76A' : 'var(--text-muted)', background: isLive ? 'rgba(18,183,106,0.1)' : 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '8px', fontWeight: 600 }}>
          {isLive ? '● Live' : 'Offline'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {activityLog.map(act => (
          <div key={act.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '11px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F72585', marginTop: '6px', flexShrink: 0 }}></span>
            <div style={{ flex: 1 }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{act.customer}</strong>
              <span style={{ color: 'var(--text-secondary)' }}>{act.text}</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '10px', flexShrink: 0 }}>{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
