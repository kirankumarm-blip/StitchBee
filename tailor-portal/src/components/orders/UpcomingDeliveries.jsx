import React from 'react';
import { Calendar } from 'lucide-react';

export default function UpcomingDeliveries({ orders, onViewCalendar, theme }) {
  const upcoming = orders
    .filter(o => !['Completed', 'Cancelled'].includes(o.status))
    .slice(0, 3);

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
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Upcoming Deliveries</h4>
        <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 600, cursor: 'pointer' }} onClick={onViewCalendar}>
          View Calendar →
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {upcoming.map((deliv, idx) => {
          const isUrgent = deliv.daysLeft.includes('3 days') || deliv.daysLeft.includes('1 day') || deliv.daysLeft.includes('Today');
          const color = isUrgent ? '#F72585' : deliv.daysLeft.includes('6 days') ? '#F79009' : '#2E90FA';
          
          return (
            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '11px', borderBottom: idx < upcoming.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: idx < upcoming.length - 1 ? '10px' : '0' }}>
              <div style={{ padding: '6px', borderRadius: '6px', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 600 }}>{deliv.date}</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 400 }}>{deliv.customer} · {deliv.outfit}</span>
              </div>
              <span style={{ fontSize: '11px', color: isUrgent ? '#F04438' : 'var(--text-muted)', fontWeight: 600 }}>{deliv.daysLeft}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
