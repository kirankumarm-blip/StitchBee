import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function EarningsChart({ data, summary, theme }) {
  const [activeTimeframe, setActiveTimeframe] = useState('This Month');

  const currentChartData = data?.[activeTimeframe] || data?.['This Month'] || [];

  const axisColor = theme === 'dark' ? '#98A2B3' : '#667085';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#E6EAF0';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: theme === 'dark' ? '#141126' : '#FFFFFF',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E6EAF0',
          borderRadius: '8px',
          padding: '10px 14px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          fontSize: '12px'
        }}>
          <div style={{ fontWeight: 700, color: theme === 'dark' ? '#FFFFFF' : '#101828', marginBottom: '4px' }}>{label}</div>
          <div style={{ color: '#F72585', fontWeight: 700 }}>
            Earnings: ₹{payload[0].value.toLocaleString()}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="sb-dashboard-card" style={{ height: '100%' }}>
      <div className="card-header-row">
        <div>
          <h3 className="card-heading">Earnings Overview</h3>
          <span className="card-subtext">Real-time revenue growth trajectory</span>
        </div>

        {/* Time Filter Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--sb-bg-light)', padding: '3px', borderRadius: '8px', border: '1px solid var(--sb-border)' }}>
          {['Today', '7 Days', '30 Days', 'This Month', 'This Year'].map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                background: activeTimeframe === tf ? '#F72585' : 'transparent',
                color: activeTimeframe === tf ? '#ffffff' : 'var(--sb-text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Metrics Row */}
      <div className="earnings-summary-grid">
        <div className="earnings-summary-item">
          <label>Total Earnings</label>
          <strong style={{ color: '#F72585' }}>{summary?.totalEarnings || '₹48,200'}</strong>
        </div>
        <div className="earnings-summary-item">
          <label>Completed Orders</label>
          <strong>{summary?.completedOrders || 23}</strong>
        </div>
        <div className="earnings-summary-item">
          <label>Avg Order Value</label>
          <strong>{summary?.avgOrderValue || '₹18,550'}</strong>
        </div>
        <div className="earnings-summary-item">
          <label>Commission</label>
          <strong style={{ color: '#8B12C8' }}>{summary?.commission || '₹2,850'}</strong>
        </div>
      </div>

      {/* REAL Interactive Recharts AreaChart */}
      <div style={{ width: '100%', height: '250px', marginTop: '6px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsPinkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F72585" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F72585" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} opacity={0.6} />
            <XAxis dataKey="date" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `₹${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="earnings" 
              stroke="#F72585" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#earningsPinkGrad)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
