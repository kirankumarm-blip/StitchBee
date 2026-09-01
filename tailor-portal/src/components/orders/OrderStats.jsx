import React from 'react';
import { ShoppingBag, Clock, Scissors, Truck, Check } from 'lucide-react';

// Pure SVG Sparkline Wave Curve Generator (100% reliable, zero rendering container bugs, crystal clear curves)
function renderSvgSparkline(data, color, id) {
  if (!data || data.length < 2) return null;
  
  const width = 64;
  const height = 24;
  const padding = 3;

  const vals = data.map(d => Number(d.v ?? d.val) || 0);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = (max - min) || 1;

  const points = vals.map((v, i) => {
    const x = padding + (i / (vals.length - 1)) * (width - 2 * padding);
    const y = (height - padding) - ((v - min) / range) * (height - 2 * padding);
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });

  // Build smooth cubic Bezier curve path
  let lineD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cpX = Number(((curr.x + next.x) / 2).toFixed(1));
    lineD += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
  }

  const areaD = `${lineD} L ${points[points.length - 1].x} ${height - 1} L ${points[0].x} ${height - 1} Z`;

  return (
    <div style={{ width: `${width}px`, height: `${height}px`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden', flexShrink: 0 }}>
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        style={{ overflow: 'hidden', display: 'block', flexShrink: 0 }}
      >
        <defs>
          <linearGradient id={`orderSparkGrad-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Area Fill Under Line */}
        <path d={areaD} fill={`url(#orderSparkGrad-${id})`} />

        {/* Smooth Sparkline Trend Line */}
        <path 
          d={lineD} 
          fill="none" 
          stroke={color} 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* End Point Dot */}
        <circle 
          cx={points[points.length - 1].x} 
          cy={points[points.length - 1].y} 
          r="2.5" 
          fill={color} 
          stroke="#ffffff" 
          strokeWidth="1.2" 
        />
      </svg>
    </div>
  );
}

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
    { label: 'ACTIVE ORDERS', value: activeOrdersCount, change: '↑ 2 from yesterday', color: '#F72585', icon: <ShoppingBag size={18} />, spark: sparkData[0], id: 'active' },
    { label: 'IN PROGRESS', value: inProgressCount, change: '↑ 3 from yesterday', color: '#8B2CF5', icon: <Clock size={18} />, spark: sparkData[1], id: 'progress' },
    { label: 'CUTTING / STITCHING', value: cuttingStitchingCount, change: '↑ 1 from yesterday', color: '#F79009', icon: <Scissors size={18} />, spark: sparkData[2], id: 'cutting' },
    { label: 'READY FOR DELIVERY', value: readyCount, change: 'No change', color: '#2E90FA', icon: <Truck size={18} />, spark: sparkData[3], id: 'ready' },
    { label: 'COMPLETED TODAY', value: completedTodayCount, change: '↑ 2 today', color: '#12B76A', icon: <Check size={18} />, spark: sparkData[4], id: 'completed' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
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
            height: '98px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.02em' }}>{kpi.label}</span>
            <div style={{ color: kpi.color, display: 'flex', alignItems: 'center' }}>{kpi.icon}</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px', gap: '8px' }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <strong style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1' }}>{kpi.value}</strong>
              <span style={{ fontSize: '10px', color: kpi.change.includes('↑') ? '#12B76A' : 'var(--text-muted)', display: 'block', marginTop: '3px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                {kpi.change}
              </span>
            </div>
            
            {/* Pure SVG Sparkline */}
            {renderSvgSparkline(kpi.spark, kpi.color, kpi.id)}
          </div>
        </div>
      ))}
    </div>
  );
}
