import React from 'react';
import { Plus, Upload, Ruler, MessageSquare } from 'lucide-react';

export default function QuickActions({ onAction, theme }) {
  const actions = [
    { label: 'New Request', icon: <Plus size={16} />, isPrimary: true },
    { label: 'Upload Design', icon: <Upload size={16} />, isPrimary: false },
    { label: 'Measurement', icon: <Ruler size={16} />, isPrimary: false },
    { label: 'Message Client', icon: <MessageSquare size={16} />, isPrimary: false }
  ];

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
      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Quick Actions</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {actions.map((act, idx) => (
          <button 
            key={idx}
            onClick={() => onAction(act.label)}
            style={{
              background: act.isPrimary ? 'rgba(247,37,133,0.08)' : (theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#F7F8FA'),
              border: act.isPrimary ? '1px solid #F72585' : '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ color: act.isPrimary ? '#F72585' : 'var(--text-secondary)', display: 'flex' }}>{act.icon}</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: act.isPrimary ? '#F72585' : 'var(--text-primary)' }}>{act.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
