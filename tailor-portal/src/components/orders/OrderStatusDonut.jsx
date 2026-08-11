import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function OrderStatusDonut({ orders, theme, timeRange, setTimeRange }) {
  const totalOrders = orders.length;

  const inProgressCount = orders.filter(o => o.status === 'In Progress').length;
  const stitchingCount = orders.filter(o => o.status === 'Stitching').length;
  const cuttingCount = orders.filter(o => o.status === 'Cutting').length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const readyCount = orders.filter(o => o.status === 'Ready').length;
  const completedCount = orders.filter(o => o.status === 'Completed').length;

  const data = [
    { name: 'In Progress', value: inProgressCount, color: '#F72585' },
    { name: 'Stitching', value: stitchingCount, color: '#8B2CF5' },
    { name: 'Cutting', value: cuttingCount, color: '#F79009' },
    { name: 'Pending', value: pendingCount, color: '#98A2B3' },
    { name: 'Ready', value: readyCount, color: '#2E90FA' },
    { name: 'Completed', value: completedCount, color: '#12B76A' }
  ].filter(d => d.value > 0);

  const getPct = (cnt) => (totalOrders ? Math.round((cnt / totalOrders) * 100) : 0);

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
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Order Status</h4>
        <select 
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
          className="form-select" 
          style={{ width: '100px', padding: '4px 8px', fontSize: '11px', borderRadius: '6px' }}
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '100%' }}>
        {/* Real Recharts PieChart Donut */}
        <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={52}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(val, name) => [`${val} (${getPct(val)}%)`, name]}
                contentStyle={{ fontSize: '11px', borderRadius: '6px', padding: '6px 10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <strong style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1', display: 'block' }}>{totalOrders}</strong>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 400 }}>Total</span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F72585' }}></span> In Progress
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>{inProgressCount} · {getPct(inProgressCount)}%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8B2CF5' }}></span> Stitching
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>{stitchingCount} · {getPct(stitchingCount)}%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#12B76A' }}></span> Completed
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>{completedCount} · {getPct(completedCount)}%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F79009' }}></span> Pending / Cutting
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>{pendingCount + cuttingCount} · {getPct(pendingCount + cuttingCount)}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
