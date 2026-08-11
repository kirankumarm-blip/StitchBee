import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function EarningsChart({ data, summary }) {
  const [timeframe, setTimeframe] = useState('This Month');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      return (
        <div style={{
          background: 'var(--sb-card-bg)',
          border: '1px solid var(--sb-border)',
          borderRadius: '8px',
          padding: '10px 14px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          fontSize: '12px'
        }}>
          <div style={{ fontWeight: 700, color: 'var(--sb-navy)', marginBottom: '4px' }}>{label}</div>
          <div style={{ color: '#EC168C', fontWeight: 700 }}>
            Earnings: ₹{payload[0].value.toLocaleString()}
          </div>
          <div style={{ color: '#10B981', fontSize: '11px', fontWeight: 600, marginTop: '2px' }}>
            Change: {dataItem.change || '+15%'}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-card" style={{ height: '100%' }}>
      <div className="card-title-row">
        <div>
          <h3 className="card-title">Earnings Overview</h3>
          <span style={{ fontSize: '12px', color: 'var(--sb-text-secondary)' }}>Real-time revenue growth trajectory</span>
        </div>

        {/* Timeframe Controls */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--sb-bg-light)', padding: '3px', borderRadius: '8px', border: '1px solid var(--sb-border)' }}>
          {['Today', '7 Days', '30 Days', 'This Month', 'This Year'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                background: timeframe === tf ? '#EC168C' : 'transparent',
                color: timeframe === tf ? '#ffffff' : 'var(--sb-text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Metrics Above Chart */}
      <div className="earnings-metrics-header">
        <div className="metric-item">
          <label>Total Earnings</label>
          <strong style={{ color: '#EC168C' }}>{summary?.totalEarnings || '₹48,200'}</strong>
        </div>
        <div className="metric-item">
          <label>Completed Orders</label>
          <strong>{summary?.completedOrders || 23}</strong>
        </div>
        <div className="metric-item">
          <label>Avg Order Value</label>
          <strong>{summary?.avgOrderValue || '₹18,550'}</strong>
        </div>
        <div className="metric-item">
          <label>Commission</label>
          <strong style={{ color: '#7B1FE8' }}>{summary?.commission || '₹2,850'}</strong>
        </div>
      </div>

      {/* Real Recharts Area Chart */}
      <div style={{ width: '100%', height: '260px', marginTop: '8px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC168C" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#EC168C" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--sb-border)" vertical={false} opacity={0.6} />
            <XAxis dataKey="date" stroke="var(--sb-text-secondary)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--sb-text-secondary)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={val => `₹${val / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="earnings" 
              stroke="#EC168C" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#earningsGradient)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
