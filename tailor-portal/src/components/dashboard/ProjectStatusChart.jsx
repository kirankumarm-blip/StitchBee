import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function ProjectStatusChart({ data }) {
  const totalCount = data ? data.reduce((acc, c) => acc + c.value, 0) : 14;

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
    <div className="sb-dashboard-card" style={{ height: '100%' }}>
      <div className="card-header-row">
        <h3 className="card-heading">Project Status</h3>
        <span className="card-subtext" style={{ fontWeight: 600 }}>{totalCount} Total</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        
        {/* REAL Recharts PieChart Donut */}
        <div style={{ position: 'relative', width: '100%', height: '170px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={75}
                paddingAngle={3}
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
            <strong style={{ fontSize: '22px', fontWeight: 800, display: 'block', lineHeight: 1, color: 'var(--sb-navy)' }}>
              {totalCount}
            </strong>
            <span style={{ fontSize: '10px', color: 'var(--sb-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
              Projects
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
          {data && data.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, overflow: 'hidden' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <span style={{ color: 'var(--sb-navy)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
              </div>
              <strong style={{ fontSize: '12px', color: 'var(--sb-navy)', flexShrink: 0 }}>
                {item.value} <span style={{ color: 'var(--sb-text-secondary)', fontWeight: 400, fontSize: '11px' }}>({item.percentage})</span>
              </strong>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
