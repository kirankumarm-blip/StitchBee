import React from 'react';
import { Palette, FileText, DollarSign, Clock, Star, TrendingUp } from 'lucide-react';

// Pure SVG Sparkline Wave Curve Generator (100% reliable, zero rendering container bugs, crystal clear curves)
function renderSvgSparkline(data, color, id) {
  if (!data || data.length < 2) return null;
  
  const width = 90;
  const height = 36;
  const padding = 5;

  const vals = data.map(d => Number(d.val) || 0);
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

  const areaD = `${lineD} L ${points[points.length - 1].x} ${height - 2} L ${points[0].x} ${height - 2} Z`;

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`} 
      style={{ overflow: 'visible', display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`svgGrad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0.0} />
        </linearGradient>
      </defs>

      {/* Area Fill Under Line */}
      <path d={areaD} fill={`url(#svgGrad-${id})`} opacity={0.8} />

      {/* Smooth Sparkline Trend Line */}
      <path 
        d={lineD} 
        fill="none" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* End Point Glow Dot */}
      <circle 
        cx={points[points.length - 1].x} 
        cy={points[points.length - 1].y} 
        r="3" 
        fill={color} 
        stroke="#ffffff" 
        strokeWidth="1.5" 
      />
    </svg>
  );
}

export default function KpiCards({ stats }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Palette': return <Palette size={16} />;
      case 'FileText': return <FileText size={16} />;
      case 'DollarSign': return <DollarSign size={16} />;
      case 'Clock': return <Clock size={16} />;
      case 'Star': return <Star size={16} />;
      default: return <TrendingUp size={16} />;
    }
  };

  return (
    <section className="kpi-row-grid">
      {stats && stats.map((stat) => (
        <div key={stat.id} className="kpi-card-box">
          <div className="kpi-top">
            <span className="kpi-title-label">{stat.label}</span>
            <div 
              className="kpi-icon-wrapper" 
              style={{ 
                backgroundColor: stat.badgeBg, 
                color: stat.accentColor 
              }}
            >
              {getIcon(stat.icon)}
            </div>
          </div>

          <h2 className="kpi-main-val">{stat.value}</h2>

          <div className="kpi-bottom-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '10px', gap: '8px' }}>
            <span 
              className="kpi-trend-text"
              style={{ 
                color: stat.trend === 'warning' ? '#F79009' : (stat.trend === 'up' ? '#12B76A' : 'var(--sb-text-secondary)'),
                fontSize: '11px',
                fontWeight: 600
              }}
            >
              {stat.subtext}
            </span>

            {/* Pure SVG Sparkline Wave Curve - Always 100% visible inside card */}
            {stat.sparkline && renderSvgSparkline(stat.sparkline, stat.accentColor, stat.id)}
          </div>
        </div>
      ))}
    </section>
  );
}
