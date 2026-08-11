import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function OrderPerformanceChart({ performanceData, timeRange, setTimeRange, theme }) {
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
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Order Performance</h4>
        <select 
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
          className="form-select" 
          style={{ width: '110px', padding: '4px 8px', fontSize: '11px', borderRadius: '6px' }}
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div style={{ width: '100%', height: '180px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.6} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
            <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid var(--border-color)', background: theme === 'dark' ? '#141126' : '#fff' }} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="received" name="Orders Received" fill="#F72585" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" name="Orders Completed" fill="#12B76A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
