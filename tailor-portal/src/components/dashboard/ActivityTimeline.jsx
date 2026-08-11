import React from 'react';
import { FileText, Ruler, CheckCircle2, DollarSign, Calendar } from 'lucide-react';

export default function ActivityTimeline({ activities }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'FileText': return <FileText size={10} />;
      case 'Ruler': return <Ruler size={10} />;
      case 'CheckCircle2': return <CheckCircle2 size={10} />;
      case 'DollarSign': return <DollarSign size={10} />;
      case 'Calendar': return <Calendar size={10} />;
      default: return <CheckCircle2 size={10} />;
    }
  };

  return (
    <div className="dashboard-card">
      <div className="card-title-row">
        <div>
          <h3 className="card-title">Recent Activity</h3>
          <span style={{ fontSize: '12px', color: 'var(--sb-text-secondary)' }}>Real-time atelier audit trail & event log</span>
        </div>
      </div>

      <div className="timeline-list">
        {activities && activities.map((act) => (
          <div key={act.id} className="timeline-item">
            <div className="timeline-dot" style={{ backgroundColor: act.color || '#EC168C' }}>
              {getIcon(act.icon)}
            </div>
            
            <div>
              <strong style={{ fontSize: '13px', fontWeight: 700, color: 'var(--sb-navy)', display: 'block' }}>
                {act.title}
              </strong>
              <span style={{ fontSize: '12px', color: 'var(--sb-text-secondary)' }}>
                {act.desc}
              </span>
            </div>

            <span style={{ fontSize: '11px', color: 'var(--sb-text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {act.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
