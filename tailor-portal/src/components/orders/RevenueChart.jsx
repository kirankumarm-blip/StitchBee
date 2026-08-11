import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function RevenueChart({ revenueData, totalRevenue, pctChange, timeRange, setTimeRange, theme }) {
  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0 2px 8px rgba(16,24,40,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Revenue from Orders</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
            <strong style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>₹{totalRevenue.toLocaleString()}</strong>
            <span style={{ fontSize: '11px', color: '#12B76A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <ArrowUpRight size={12} /> ↑ {pctChange}%
            </span>
          </div>
        </div>
        
        <select 
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
          className="form-select" 
          style={{ width: '100px', padding: '4px 8px', fontSize: '11px', borderRadius: '6px' }}
        >
          <option>Today</option>
          <option>7 Days</option>
          <option>30 Days</option>
        </select>
      </div>

      <div style={{ width: '100%', height: '160px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.6} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
            <Tooltip 
              formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']}
              contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid var(--border-color)', background: theme === 'dark' ? '#141126' : '#fff' }} 
            />
            <Line type="monotone" dataKey="amount" stroke="#12B76A" strokeWidth={3} dot={{ r: 4, fill: '#12B76A' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
