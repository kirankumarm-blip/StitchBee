import React from 'react';
import { Palette, FileText, DollarSign, Clock, Star, TrendingUp, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export default function StatCard({ stat }) {
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
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-label">{stat.label}</span>
        <div 
          className="kpi-icon-box" 
          style={{ 
            backgroundColor: stat.badgeBg, 
            color: stat.accentColor 
          }}
        >
          {getIcon(stat.icon)}
        </div>
      </div>

      <div className="kpi-body">
        <div>
          <h2 className="kpi-value">{stat.value}</h2>
          <span 
            className="kpi-subtext"
            style={{ 
              color: stat.trend === 'warning' ? '#F59E0B' : (stat.trend === 'up' ? '#10B981' : 'var(--sb-text-secondary)')
            }}
          >
            {stat.subtext}
          </span>
        </div>

        {/* Real-time Recharts Sparkline */}
        {stat.sparkline && (
          <div className="kpi-sparkline">
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
  );
}
