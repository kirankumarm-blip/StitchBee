import React from 'react';
import { ShoppingBag, Clock, Scissors, Truck, Check } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export default function OrderStats({ orders, theme }) {
  const activeOrdersCount = orders.filter(o => !['Completed', 'Cancelled'].includes(o.status)).length;
  const inProgressCount = orders.filter(o => o.status === 'In Progress').length;
  const cuttingStitchingCount = orders.filter(o => ['Cutting', 'Stitching'].includes(o.status)).length;
  const readyCount = orders.filter(o => o.status === 'Ready').length;
  const completedTodayCount = orders.filter(o => o.status === 'Completed').length;

  const sparkData = [
    [ { v: 4 }, { v: 8 }, { v: 6 }, { v: 10 }, { v: activeOrdersCount } ],
    [ { v: 3 }, { v: 5 }, { v: 4 }, { v: 7 }, { v: inProgressCount } ],
    [ { v: 2 }, { v: 4 }, { v: 3 }, { v: 5 }, { v: cuttingStitchingCount } ],
    [ { v: 0 }, { v: 1 }, { v: 0 }, { v: 0 }, { v: readyCount } ],
    [ { v: 1 }, { v: 3 }, { v: 2 }, { v: 4 }, { v: completedTodayCount } ]
  ];

  const kpis = [
    { label: 'ACTIVE ORDERS', value: activeOrdersCount, change: '↑ 2 from yesterday', color: '#F72585', icon: <ShoppingBag size={18} />, spark: sparkData[0] },
    { label: 'IN PROGRESS', value: inProgressCount, change: '↑ 3 from yesterday', color: '#8B2CF5', icon: <Clock size={18} />, spark: sparkData[1] },
    { label: 'CUTTING / STITCHING', value: cuttingStitchingCount, change: '↑ 1 from yesterday', color: '#F79009', icon: <Scissors size={18} />, spark: sparkData[2] },
    { label: 'READY FOR DELIVERY', value: readyCount, change: 'No change', color: '#2E90FA', icon: <Truck size={18} />, spark: sparkData[3] },
    { label: 'COMPLETED TODAY', value: completedTodayCount, change: '↑ 2 today', color: '#12B76A', icon: <Check size={18} />, spark: sparkData[4] }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
      {kpis.map((kpi, idx) => (
        <div 
          key={idx} 
          style={{
            background: theme === 'dark' ? '#141126' : '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(16,24,40,0.04)',
            height: '94px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>{kpi.label}</span>
            <div style={{ color: kpi.color }}>{kpi.icon}</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px' }}>
            <div>
              <strong style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1' }}>{kpi.value}</strong>
              <span style={{ fontSize: '10px', color: kpi.change.includes('↑') ? '#12B76A' : 'var(--text-muted)', display: 'block', marginTop: '2px', fontWeight: 500 }}>
                {kpi.change}
              </span>
            </div>
            
            {/* Real Recharts LineChart Sparkline */}
            <div style={{ width: '60px', height: '24px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpi.spark}>
                  <Line type="monotone" dataKey="v" stroke={kpi.color} strokeWidth={2.5} dot={false} isAnimationActive={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
