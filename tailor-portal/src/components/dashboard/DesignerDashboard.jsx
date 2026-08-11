import React, { useState, useEffect } from 'react';
import { initialDashboardData } from '../../data/dashboardData';
import WelcomeSection from './WelcomeSection';
import KpiCards from './KpiCards';
import EarningsChart from './EarningsChart';
import ProjectStatusChart from './ProjectStatusChart';
import ProjectProgress from './ProjectProgress';
import ActiveProjects from './ActiveProjects';
import UpcomingAppointments from './UpcomingAppointments';
import RecentActivity from './RecentActivity';
import '../../styles/dashboard.css';

export default function DesignerDashboard({ theme, onNavigateTab }) {
  // Driven from central data state for API integration
  const [data, setData] = useState(initialDashboardData);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      {/* SECTION 1 — Welcome + Quick Actions (Full-Width Card across dashboard)*/}
      {/* ==================================================================== */}
      <WelcomeSection 
        liveStatus={data.liveStatus}
        onRefresh={handleManualRefresh}
        onNavigateAction={onNavigateTab}
        isRefreshing={isRefreshing}
      />

      {/* ==================================================================== */}
      {/* SECTION 2 — KPI + Analytics                                         */}
      {/* ==================================================================== */}
      {/* First Row: 5 Full-Width KPI Cards with Recharts mini sparklines */}
      <KpiCards stats={data.kpiStats} />

      {/* Second Row: 3-Column Analytics Layout (~50% / ~25% / ~25%) */}
      <div className="three-column-grid">
        {/* Column 1 (~50% width): Earnings Overview with Recharts AreaChart */}
        <EarningsChart 
          theme={theme}
          data={data.earningsOverview.timeframeData} 
          summary={data.earningsOverview.summary} 
        />

        {/* Column 2 (~25% width): Project Status Donut Chart */}
        <ProjectStatusChart 
          theme={theme}
          data={data.projectStatus} 
        />

        {/* Column 3 (~25% width): Project Progress Bars & Weekly Performance */}
        <ProjectProgress 
          theme={theme}
          progressItems={data.projectProgressItems} 
          weeklyChart={data.weeklyPerformanceChart} 
        />
      </div>

      {/* ==================================================================== */}
      {/* SECTION 3 — Operational Dashboard (3-Column Layout ~50% / ~25% / ~25%)*/}
      {/* ==================================================================== */}
      <div className="three-column-grid">
        {/* Column 1 (~50% width): Active Design Projects List/Table with Search, Filter & Pagination */}
        <ActiveProjects 
          projects={data.activeProjects} 
          onViewAll={() => onNavigateTab && onNavigateTab('studio')} 
        />

        {/* Column 2 (~25% width): Upcoming Appointments */}
        <UpcomingAppointments 
          appointments={data.appointments} 
          onViewCalendar={() => onNavigateTab && onNavigateTab('calendar')} 
        />

        {/* Column 3 (~25% width): Recent Activity Feed */}
        <RecentActivity 
          activities={data.activities} 
        />
      </div>

    </div>
  );
}
