import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

export default function ProjectProgress({ progressItems, weeklyChart }) {
  return (
    <div className="sb-dashboard-card" style={{ height: '100%' }}>
      <div className="card-header-row">
        <div>
          <h3 className="card-heading">Project Progress</h3>
          <span className="card-subtext">Active milestone completion status</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {progressItems && progressItems.map((item, idx) => (
          <div key={idx} className="progress-list-item">
            <div className="progress-item-title-row">
              <strong style={{ color: 'var(--sb-navy)', fontSize: '13px' }}>{item.name}</strong>
              <strong style={{ color: item.color, fontSize: '12px' }}>{item.progress}%</strong>
            </div>

            {/* REAL HTML/CSS Progress Bar Track & Fill */}
            <div className="real-bar-track">
              <div 
                className="real-bar-fill" 
                style={{ 
                  width: `${item.progress}%`,
                  background: item.color 
                }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--sb-text-secondary)' }}>
              <span>{item.status}</span>
              <span>Due: {item.deadline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Weekly Performance Recharts Bar Chart */}
      <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--sb-border)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--sb-text-secondary)' }}>Weekly Deliveries</span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#12B76A' }}>39 Outfits</span>
        </div>
        <div style={{ width: '100%', height: '50px', maxHeight: '50px', overflow: 'hidden', position: 'relative' }}>
          <ResponsiveContainer width="100%" height={50}>
            <BarChart data={weeklyChart} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
              <XAxis dataKey="day" stroke="var(--sb-text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
              <Bar dataKey="completed" fill="#F72585" radius={[3, 3, 0, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
