import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function EarningsChart({ data, summary, theme }) {
  const [activeTimeframe, setActiveTimeframe] = useState('This Month');

  const currentChartData = data?.[activeTimeframe] || data?.['This Month'] || [];

  const isDark = theme === 'dark';
  const axisColor = isDark ? '#A0AEC0' : '#667085';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : '#EEF0F4';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#E7EAF0';
  const textColor = isDark ? '#F9FAFB' : '#172033';
  const secTextColor = isDark ? '#A0AEC0' : '#667085';
  const itemBg = isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: isDark ? '#1F1B2E' : '#172033',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 14px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          fontSize: '12px',
          color: '#FFFFFF'
        }}>
          <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>{label}</div>
          <div style={{ color: '#EC167F', fontWeight: 700, fontSize: '14px' }}>
            Earnings: ₹{payload[0].value.toLocaleString()}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      background: cardBg,
      border: `1px solid ${borderColor}`,
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    }}>
      
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
            Earnings Overview <Sparkles size={15} color="#EC167F" />
          </h3>
          <span style={{ fontSize: '12px', color: secTextColor, fontWeight: 400 }}>Real-time revenue growth trajectory</span>
        </div>

        {/* Time Filter Pills (White Text on Active Pill By Default) */}
        <div style={{
          display: 'flex',
          gap: '3px',
          background: isDark ? '#231D34' : '#F1F5F9',
          padding: '3px',
          borderRadius: '10px',
          border: `1px solid ${borderColor}`
        }}>
          {['Today', '7 Days', '30 Days', 'This Month', 'This Year'].map((tf) => {
            const isActive = activeTimeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                style={{
                  padding: '5px 11px',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: '7px',
                  border: 'none',
                  background: isActive ? '#EC167F' : 'transparent',
                  color: isActive ? '#FFFFFF' : (isDark ? '#A0AEC0' : '#475467'),
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(236,22,127,0.35)' : 'none'
                }}
              >
                <span style={{ color: isActive ? '#FFFFFF' : (isDark ? '#A0AEC0' : '#475467'), fontWeight: 600 }}>
                  {tf}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Premium Summary Metrics Row */}
      <div className="earnings-summary-grid" style={{ margin: '16px 0 10px 0' }}>
        <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '10px 12px' }}>
          <span style={{ fontSize: '11px', color: secTextColor, display: 'block', fontWeight: 500 }}>Total Earnings</span>
          <strong style={{ fontSize: '18px', fontWeight: 700, color: '#EC167F', marginTop: '2px', display: 'block' }}>
            {summary?.totalEarnings || '₹48,200'}
          </strong>
        </div>
        <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '10px 12px' }}>
          <span style={{ fontSize: '11px', color: secTextColor, display: 'block', fontWeight: 500 }}>Completed Orders</span>
          <strong style={{ fontSize: '18px', fontWeight: 700, color: textColor, marginTop: '2px', display: 'block' }}>
            {summary?.completedOrders || 23}
          </strong>
        </div>
        <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '10px 12px' }}>
          <span style={{ fontSize: '11px', color: secTextColor, display: 'block', fontWeight: 500 }}>Avg Order Value</span>
          <strong style={{ fontSize: '18px', fontWeight: 700, color: textColor, marginTop: '2px', display: 'block' }}>
            {summary?.avgOrderValue || '₹18,550'}
          </strong>
        </div>
        <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '10px 12px' }}>
          <span style={{ fontSize: '11px', color: secTextColor, display: 'block', fontWeight: 500 }}>Commission</span>
          <strong style={{ fontSize: '18px', fontWeight: 700, color: '#7B2CFF', marginTop: '2px', display: 'block' }}>
            {summary?.commission || '₹2,850'}
          </strong>
        </div>
      </div>

      {/* Interactive Recharts AreaChart with Pink-Purple Gradient */}
      <div style={{ width: '100%', height: '220px', minHeight: '180px', overflow: 'hidden' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsPinkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC167F" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7B2CFF" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} opacity={0.8} />
            <XAxis dataKey="date" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `₹${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="earnings" 
              stroke="#EC167F" 
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
