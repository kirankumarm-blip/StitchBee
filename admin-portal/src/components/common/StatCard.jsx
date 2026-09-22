import React from 'react';
import * as Icons from 'lucide-react';

function Sparkline({ data, color = '#2563eb' }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 28;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function StatCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  comparison, 
  iconName, 
  sparkline, 
  isAccent, 
  isAlert,
  onClick 
}) {
  const IconComponent = Icons[iconName] || Icons.Activity;
  const sparklineColor = isAlert ? '#ef4444' : isAccent ? '#f59e0b' : '#2563eb';

  return (
    <div 
      className={`sb-card sb-card-interactive ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={{
        borderLeft: isAccent 
          ? '4px solid var(--sb-accent)' 
          : isAlert 
            ? '4px solid var(--sb-status-failed)' 
            : '4px solid var(--sb-primary)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--sb-text-muted)', letterSpacing: '0.01em' }}>
          {title}
        </span>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: 'var(--sb-radius-md)',
          background: isAccent 
            ? 'var(--sb-accent-light)' 
            : isAlert 
              ? 'var(--sb-status-failed-bg)' 
              : 'var(--sb-primary-light)',
          color: isAccent 
            ? 'var(--sb-accent)' 
            : isAlert 
              ? 'var(--sb-status-failed)' 
              : 'var(--sb-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconComponent size={18} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <div style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--sb-text-title)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {value}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
            {change && (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: isPositive === true 
                  ? 'var(--sb-status-success)' 
                  : isPositive === false 
                    ? 'var(--sb-status-failed)' 
                    : isAlert 
                      ? 'var(--sb-status-failed)' 
                      : 'var(--sb-accent)'
              }}>
                {change}
              </span>
            )}
            {comparison && (
              <span style={{ fontSize: '0.73rem', color: 'var(--sb-text-subtle)' }}>
                {comparison}
              </span>
            )}
          </div>
        </div>

        {sparkline && (
          <div style={{ paddingBottom: '4px' }}>
            <Sparkline data={sparkline} color={sparklineColor} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
