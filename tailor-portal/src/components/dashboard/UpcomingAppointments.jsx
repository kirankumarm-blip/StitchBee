import React from 'react';

export default function UpcomingAppointments({ appointments, onViewCalendar }) {
  return (
    <div className="sb-dashboard-card" style={{ height: '100%' }}>
      <div className="card-header-row">
        <h3 className="card-heading">Upcoming Appointments</h3>
        <button onClick={onViewCalendar} className="card-action-link">
          View Calendar →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {appointments && appointments.map((app) => (
          <div 
            key={app.id} 
            className="appointment-card-item"
            style={{ borderLeftColor: app.color || '#F72585' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '13px', fontWeight: 700, color: app.color }}>
                {app.type}
              </strong>
              <span 
                style={{ 
                  fontSize: '10px', 
                  fontWeight: 700, 
                  padding: '2px 7px', 
                  borderRadius: '10px', 
                  background: app.status === 'Confirmed' ? 'rgba(18,183,106,0.1)' : (app.status === 'Scheduled' ? 'rgba(139,18,200,0.1)' : 'rgba(247,144,9,0.1)'), 
                  color: app.status === 'Confirmed' ? '#12B76A' : (app.status === 'Scheduled' ? '#8B12C8' : '#F79009') 
                }}
              >
                {app.status}
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '12px', color: 'var(--sb-navy)', fontWeight: 600 }}>
              {app.customer} — <span style={{ color: 'var(--sb-text-secondary)', fontWeight: 400 }}>{app.outfit}</span>
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--sb-text-secondary)', fontWeight: 500, marginTop: '2px' }}>
              <span>📅 {app.date}</span>
              <span>⏰ {app.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
