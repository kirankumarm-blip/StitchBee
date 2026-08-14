import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AIDesignAssistant({ onOpenAssistant }) {
  return (
    <div className="ai-assistant-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div className="ai-icon-circle">
          <Sparkles size={16} color="#7C3AED" />
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--sb-navy)' }}>
            AI Design Assistant
          </h4>
          <span style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 600 }}>StitchBee Studio AI</span>
        </div>
      </div>

      <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: 'var(--sb-text-secondary)', lineHeight: 1.5 }}>
        Get AI suggestions for colors, fabrics, patterns and design improvements based on client preferences.
      </p>

      <button onClick={onOpenAssistant} className="ai-open-btn">
        Open Assistant <ArrowRight size={14} />
      </button>
    </div>
  );
}
