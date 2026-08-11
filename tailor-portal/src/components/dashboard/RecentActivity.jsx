import React from 'react';

export default function RecentActivity({ activities }) {
  return (
    <div className="sb-dashboard-card" style={{ height: '100%' }}>
      <div className="card-header-row">
        <div>
          <h3 className="card-heading">Recent Activity</h3>
          <span className="card-subtext">Real-time studio audit log</span>
        </div>
        <span style={{ fontSize: '11px', color: '#12B76A', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          ● Live Feed
        </span>
      </div>

      <div className="activity-feed-list">
        {activities && activities.map((act) => (
          <div key={act.id} className="activity-feed-item">
            <span className="activity-feed-dot" style={{ backgroundColor: act.color || '#F72585' }} />
            <strong style={{ fontSize: '12px', fontWeight: 700, color: 'var(--sb-navy)' }}>
              {act.text}
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--sb-text-secondary)' }}>
              {act.subtext}
            </span>
            <span style={{ fontSize: '10px', color: act.color || '#F72585', fontWeight: 600, marginTop: '1px' }}>
              {act.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
