import React from 'react';

export default function ProgressBar({ value, color = '#EC168C', height = 6 }) {
  const clampedValue = Math.min(100, Math.max(0, value || 0));

  return (
    <div className="real-progress-container" style={{ height: `${height}px` }}>
      <div 
        className="real-progress-fill" 
        style={{ 
          width: `${clampedValue}%`,
          backgroundColor: color 
        }} 
      />
    </div>
  );
}
