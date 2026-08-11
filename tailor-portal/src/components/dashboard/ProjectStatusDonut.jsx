import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function ProjectStatusDonut({ data }) {
  const totalProjects = data ? data.reduce((acc, curr) => acc + curr.value, 0) : 14;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div style={{
          background: 'var(--sb-card-bg)',
          border: '1px solid var(--sb-border)',
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          fontSize: '12px'
        }}>
          <strong style={{ color: item.color }}>{item.name}</strong>
          <div style={{ color: 'var(--sb-navy)', fontWeight: 700 }}>
            {item.value} Projects ({item.percentage})
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-card" style={{ height: '100%' }}>
      <div className="card-title-row">
        <h3 className="card-title">Projects Status</h3>
        <span style={{ fontSize: '11px', color: 'var(--sb-text-secondary)', fontWeight: 600 }}>14 Total</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'center', minHeight: '260px' }}>
        
        {/* Recharts PieChart Donut with Center Count */}
        <div style={{ position: 'relative', width: '100%', height: '220px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                isAnimationActive={true}
              >
                {data && data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Donut Center Overlay Text */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <strong style={{ fontSize: '24px', fontWeight: 800, display: 'block', lineHeight: 1 }}>{totalProjects}</strong>
            <span style={{ fontSize: '10px', color: 'var(--sb-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Projects</span>
          </div>
        </div>

        {/* Legend Right List */}
        <div className="donut-legend-list">
          {data && data.map((item, index) => (
            <div key={index} className="donut-legend-item">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="legend-color-dot" style={{ backgroundColor: item.color }} />
                <span style={{ color: 'var(--sb-navy)', fontWeight: 600 }}>{item.name}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '12px', color: 'var(--sb-navy)' }}>
                {item.value} <span style={{ color: 'var(--sb-text-secondary)', fontWeight: 400, fontSize: '11px' }}>({item.percentage})</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
