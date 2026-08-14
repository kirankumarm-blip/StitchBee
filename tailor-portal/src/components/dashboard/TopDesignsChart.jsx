import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function TopDesignsChart({ data }) {
  const [filter, setFilter] = useState('This Month');

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
          <strong style={{ color: 'var(--sb-navy)' }}>{item.name}</strong>
          <div style={{ color: '#7B1FE8', fontWeight: 700, marginTop: '2px' }}>
            Revenue: ₹{item.revenue.toLocaleString()}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-card" style={{ height: '100%' }}>
      <div className="card-title-row">
        <h3 className="card-title">Top Performing Designs</h3>
        <select 
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            padding: '4px 10px',
            fontSize: '11px',
            borderRadius: '6px',
            border: '1px solid var(--sb-border)',
            background: 'var(--sb-bg-light)',
            color: 'var(--sb-navy)',
            fontWeight: 600,
            outline: 'none'
          }}
        >
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      {/* Real Horizontal Recharts Bar Chart */}
      <div style={{ width: '100%', height: '240px', marginTop: '8px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--sb-border)" horizontal={false} opacity={0.6} />
            <XAxis type="number" stroke="var(--sb-text-secondary)" fontSize={11} tickFormatter={v => `₹${v/1000}k`} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="name" stroke="var(--sb-navy)" fontSize={11} tickLine={false} axisLine={false} width={130} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#7B1FE8" radius={[0, 6, 6, 0]} barSize={14} isAnimationActive={true} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
