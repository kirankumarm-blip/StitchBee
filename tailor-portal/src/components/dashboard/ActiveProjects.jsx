import React from 'react';
import { MoreVertical } from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function ActiveProjects({ projects, onViewAll }) {
  return (
    <div className="dashboard-card" style={{ height: '100%' }}>
      <div className="card-title-row">
        <div>
          <h3 className="card-title">Active Design Projects</h3>
          <span style={{ fontSize: '12px', color: 'var(--sb-text-secondary)' }}>Manage ongoing client outfits & versioning</span>
        </div>
        <button onClick={onViewAll} className="card-link">
          View All Projects →
        </button>
      </div>

      <div className="projects-table-list">
        {projects && projects.map((p) => (
          <div key={p.id} className="project-row-item">
            
            {/* Meta Thumbnail & Name */}
            <div className="project-meta-info">
              <img src={p.image} alt={p.name} className="project-thumb" />
              <div>
                <strong style={{ fontSize: '14px', fontWeight: 700, display: 'block', color: 'var(--sb-navy)' }}>
                  {p.name}
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--sb-text-secondary)' }}>
                  Client: {p.client} • {p.version}
                </span>
              </div>
            </div>

            {/* REAL HTML/CSS Progress Bar Indicator */}
            <div className="project-progress-col">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--sb-text-secondary)', marginBottom: '3px' }}>
                <span>Milestone Progress</span>
                <span style={{ color: p.statusColor, fontWeight: 700 }}>{p.progress}%</span>
              </div>
              <ProgressBar value={p.progress} color={p.statusColor} height={6} />
            </div>

            {/* Status Badge Pill */}
            <div className="project-status-col">
              <span 
                className="status-badge-pill"
                style={{ 
                  background: p.statusBg, 
                  color: p.statusColor 
                }}
              >
                {p.status}
              </span>
            </div>

            {/* Price & Action */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <strong style={{ fontSize: '15px', fontWeight: 700, color: '#EC168C' }}>
                {p.amount}
              </strong>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--sb-text-secondary)', cursor: 'pointer', padding: 0 }}>
                <MoreVertical size={16} />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
