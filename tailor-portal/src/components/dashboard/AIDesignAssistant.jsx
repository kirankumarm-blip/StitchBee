import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AIDesignAssistant({ theme, onOpenAssistant }) {
  const textColor = theme === 'dark' ? '#F9FAFB' : '#111827';
  const secTextColor = theme === 'dark' ? '#98A2B3' : '#64748B';

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(236, 22, 140, 0.08) 100%)',
      border: '1px solid rgba(124, 58, 237, 0.25)',
      borderRadius: '16px',
      padding: '18px',
      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.08)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(124, 58, 237, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Sparkles size={16} color="#7C3AED" />
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>
            AI Design Assistant
          </h4>
          <span style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 600 }}>StitchBee Studio AI</span>
        </div>
      </div>

      <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: secTextColor, lineHeight: 1.5 }}>
        Get AI suggestions for colors, fabrics, patterns and design improvements based on client preferences.
      </p>

      <button 
        onClick={onOpenAssistant} 
        style={{
          width: '100%',
          padding: '9px 14px',
          borderRadius: '9px',
          border: 'none',
          background: 'linear-gradient(135deg, #7C3AED 0%, #EC168C 100%)',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
        }}
      >
        Open Assistant <ArrowRight size={14} />
      </button>
    </div>
  );
}
