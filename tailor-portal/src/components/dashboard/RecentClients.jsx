import React from 'react';

export default function RecentClients({ clients, onViewAll }) {
  return (
    <div className="dashboard-card" style={{ height: '100%' }}>
      <div className="card-title-row">
        <h3 className="card-title">Recent Clients</h3>
        <button onClick={onViewAll} className="card-link">
          View All →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {clients && clients.map((c) => (
          <div key={c.id} className="client-row-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={c.avatar} alt={c.name} className="client-avatar-thumb" />
              <div>
                <strong style={{ fontSize: '13px', fontWeight: 700, display: 'block', color: 'var(--sb-navy)' }}>
                  {c.name}
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--sb-text-secondary)' }}>
                  {c.ordersCount} Orders • {c.designsCount} Designs
                </span>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: '#EC168C', fontWeight: 600 }}>
              {c.lastOrderTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
