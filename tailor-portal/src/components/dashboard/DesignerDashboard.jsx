import React, { useState, useEffect } from 'react';
import { initialDashboardData } from '../../data/dashboardData';
import DesignerSidebar from './DesignerSidebar';
import DesignerRightPanel from './DesignerRightPanel';
import WelcomeSection from './WelcomeSection';
import KpiCards from './KpiCards';
import EarningsChart from './EarningsChart';
import ProjectStatusChart from './ProjectStatusChart';
import ActiveProjects from './ActiveProjects';
import TopDesignsChart from './TopDesignsChart';
import RecentActivity from './RecentActivity';
import '../../styles/dashboard.css';

export default function DesignerDashboard({ theme, onNavigateTab }) {
  const [data, setData] = useState(initialDashboardData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sidebarNavTab, setSidebarNavTab] = useState('my-designs');

  // Simulated Real-Time Data Updates (polls/updates state every 30 seconds without page reload)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      
      setData((prev) => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        // Dynamic state nudge for live behavior
        const updatedProjects = prev.activeProjects.map((p) => {
          if (p.progress < 100 && Math.random() > 0.6) {
            return { ...p, progress: Math.min(100, p.progress + 4) };
          }
          return p;
        });

        return {
          ...prev,
          liveStatus: {
            ...prev.liveStatus,
            lastUpdatedText: `Updated at ${timeString}`
          },
          activeProjects: updatedProjects
        };
      });

      setTimeout(() => setIsRefreshing(false), 700);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    setData((prev) => ({
      ...prev,
      liveStatus: {
        ...prev.liveStatus,
        lastUpdatedText: `Updated at ${timeString}`
      }
    }));

    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className={`designer-dashboard-fullwidth ${theme === 'dark' ? 'dark-mode' : ''}`}>
      
      {/* ==================================================================== */}
      {/* MAIN 3-COLUMN STUDIO LAYOUT                                         */}
      {/* Left Sidebar (230px) -> Center Workspace -> Right Panel (320px)      */}
      {/* ==================================================================== */}
      <div className="studio-three-column-layout">

        {/* 1. LEFT SIDEBAR CONTAINER */}
        <DesignerSidebar 
          activeTab={sidebarNavTab} 
          onSelectNav={(tabId) => {
            setSidebarNavTab(tabId);
            if (tabId === 'create' || tabId === 'requests') {
              if (onNavigateTab) onNavigateTab('studio', tabId);
            }
          }}
        />

        {/* 2. CENTER MAIN WORKSPACE */}
        <main className="center-workspace-stack">

          {/* Section 5: Welcome Header + Live Badge */}
          <WelcomeSection 
            liveStatus={data.liveStatus}
            onRefresh={handleManualRefresh}
            isRefreshing={isRefreshing}
          />

          {/* Section 6: 5 KPI Cards in Horizontal Row */}
          <KpiCards stats={data.kpiStats} />

          {/* Section 7 & 8: Main Analytics (65% Earnings AreaChart / 35% Project Status Donut) */}
          <section className="analytics-two-column-grid">
            <EarningsChart 
              theme={theme}
              data={data.earningsOverview.timeframeData} 
              summary={data.earningsOverview.summary} 
            />
            <ProjectStatusChart 
              theme={theme}
              data={data.projectStatus} 
            />
          </section>

          {/* Section 10: Active Design Projects Table */}
          <ActiveProjects 
            projects={data.activeProjects} 
            onViewAll={() => onNavigateTab && onNavigateTab('studio')} 
          />

          {/* Section 11: Top Performing Designs Horizontal Bar Chart */}
          <TopDesignsChart data={data.topDesigns} />

          {/* Section 13: Recent Activity Timeline */}
          <RecentActivity activities={data.activities} />

        </main>

        {/* 3. RIGHT PANEL CONTAINER */}
        <DesignerRightPanel 
          appointments={data.appointments} 
          clients={data.recentClients} 
          onViewCalendar={() => onNavigateTab && onNavigateTab('calendar')} 
          onViewClients={() => onNavigateTab && onNavigateTab('customers')} 
          onOpenAI={() => onNavigateTab && onNavigateTab('support')} 
        />

      </div>

    </div>
  );
}
