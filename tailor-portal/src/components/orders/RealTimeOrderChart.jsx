import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function RealTimeOrderChart({ trendData, timeRange, setTimeRange, lastUpdatedSeconds, onRefresh, theme }) {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Real-time Order Progress</h4>
          <span style={{ fontSize: '11px', color: '#12B76A', background: 'rgba(18,183,106,0.1)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>● Live</span>
        </div>

        <div style={{ display: 'flex', gap: '4px', background: theme === 'dark' ? '#0b0914' : '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
          {['Today', '7 Days', '30 Days'].map(t => (
            <button 
              key={t}
              onClick={() => setTimeRange(t)}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                border: 'none',
                borderRadius: '6px',
                background: timeRange === t ? (theme === 'dark' ? '#141126' : '#fff') : 'transparent',
                color: timeRange === t ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                boxShadow: timeRange === t ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Real Recharts LineChart */}
      <div style={{ width: '100%', height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.6} />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
            <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid var(--border-color)', background: theme === 'dark' ? '#141126' : '#fff' }} />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Line type="monotone" dataKey="inProgress" name="In Progress" stroke="#F72585" strokeWidth={3} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="stitching" name="Stitching" stroke="#8B2CF5" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="cutting" name="Cutting" stroke="#F79009" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="ready" name="Ready" stroke="#2E90FA" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right' }}>
        Data updates every 30 seconds
      </div>
    </div>
  );
}
