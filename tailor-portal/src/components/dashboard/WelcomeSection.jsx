import React from 'react';
import { RefreshCw } from 'lucide-react';
import QuickActions from './QuickActions';

export default function WelcomeSection({ liveStatus, onRefresh, onNavigateAction, isRefreshing }) {
  return (
    <section className="section-welcome-card">
      <div className="welcome-header-row">
        <div>
          <h1 className="welcome-header-title">Welcome back, Ananya! 👋</h1>
          <p className="welcome-header-subtitle">Here's what's happening with your design studio today.</p>
        </div>

        <div className="live-badge-box">
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#12B76A' }} />
          ● Live — {liveStatus?.lastUpdatedText || 'Updated just now'}
          <button 
            onClick={onRefresh} 
            className="btn-refresh-icon" 
            title="Refresh Dashboard Data"
          >
            <RefreshCw size={14} className={isRefreshing ? 'spin' : ''} />
          </button>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <QuickActions onNavigateAction={onNavigateAction} />
    </section>
  );
}
