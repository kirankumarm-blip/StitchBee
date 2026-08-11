import React from 'react';

export default function UpcomingAppointments({ appointments, onViewCalendar }) {
  return (
    <div className="dashboard-card">
      <div className="card-title-row">
        <h3 className="card-title">Upcoming Appointments</h3>
        <button onClick={onViewCalendar} className="card-link">
          View Calendar →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {appointments && appointments.map((app) => (
          <div 
            key={app.id} 
            className="appointment-item"
            style={{ borderLeftColor: app.color || '#EC168C' }}
          >
            <div className="appointment-item-header">
              <strong className="appointment-title" style={{ color: app.color }}>
                {app.title}
              </strong>
              <span className="appointment-time">{app.time}</span>
            </div>
            <p className="appointment-detail">
              <strong>{app.client}</strong> — {app.outfit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
