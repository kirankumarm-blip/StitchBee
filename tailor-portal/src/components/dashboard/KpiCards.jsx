import React from 'react';
import { Palette, FileText, DollarSign, Clock, Star, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

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

          <div className="kpi-bottom-row">
            <span 
              className="kpi-trend-text"
              style={{ 
                color: stat.trend === 'warning' ? '#F79009' : (stat.trend === 'up' ? '#12B76A' : 'var(--sb-text-secondary)')
              }}
            >
              {stat.subtext}
            </span>

            {/* REAL Recharts Sparkline */}
            {stat.sparkline && (
              <div style={{ width: '64px', height: '28px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stat.sparkline}>
                    <Line 
                      type="monotone" 
                      dataKey="val" 
                      stroke={stat.accentColor} 
                      strokeWidth={2} 
                      dot={false} 
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
