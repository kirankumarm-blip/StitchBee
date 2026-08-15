import React from 'react';
import { Palette, FileText, DollarSign, Clock, Star, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';

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

          <div className="kpi-bottom-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '10px' }}>
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

            {/* REAL Beautiful Sparkline Chart strictly contained inside card */}
            {stat.sparkline && (
              <div style={{ width: '85px', height: '34px', minWidth: '85px', minHeight: '34px', overflow: 'hidden', position: 'relative', flexShrink: 0, borderRadius: '6px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stat.sparkline} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                    <defs>
                      <linearGradient id={`grad-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={stat.accentColor} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={stat.accentColor} stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <YAxis domain={['auto', 'auto']} hide />
                    <Area 
                      type="monotone" 
                      dataKey="val" 
                      stroke={stat.accentColor} 
                      strokeWidth={2.5} 
                      fill={`url(#grad-${stat.id})`}
                      fillOpacity={1}
                      isAnimationActive={true}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
