import React, { useState, useEffect } from 'react';
import { Plus, FileText, Upload, Users, Calendar, Sparkles, RefreshCw } from 'lucide-react';
import { initialDashboardData } from '../../data/dashboardData';
import StatCard from './StatCard';
import EarningsChart from './EarningsChart';
import ProjectStatusDonut from './ProjectStatusDonut';
import UpcomingAppointments from './UpcomingAppointments';
import ActiveProjects from './ActiveProjects';
import TopDesignsChart from './TopDesignsChart';
import RecentClients from './RecentClients';
import ActivityTimeline from './ActivityTimeline';
import '../../styles/dashboard.css';

export default function DesignerDashboard({ onNavigateTab }) {
  // Driven from central data state for easy REST/WebSocket API integration
  const [data, setData] = useState(initialDashboardData);
  const [lastUpdatedTime, setLastUpdatedTime] = useState('Just now');
  const [isUpdating, setIsUpdating] = useState(false);

  // Simulated Real-Time Updates (polling simulation every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      
      setData((prevData) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastUpdatedTime(`Updated at ${timeStr}`);

        // Slightly nudge progress or data to simulate real-time activity
        const updatedProjects = prevData.activeProjects.map((p) => {
          if (p.progress < 100 && Math.random() > 0.6) {
            return { ...p, progress: Math.min(100, p.progress + 5) };
          }
          return p;
        });

        return {
          ...prevData,
          activeProjects: updatedProjects
        };
      });

      setTimeout(() => setIsUpdating(false), 800);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsUpdating(true);
    const now = new Date();
    setLastUpdatedTime(`Updated at ${now.toLocaleTimeString()}`);
    setTimeout(() => setIsUpdating(false), 500);
  };

  return (
    <div className="designer-dashboard-wrapper">
      
      {/* ==================================================================== */}
      {/* 1. PAGE INTRO / WELCOME SECTION                                      */}
      {/* ==================================================================== */}
      <section className="dashboard-intro-card">
        <div className="intro-text-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1>Welcome back, Ananya! 👋</h1>
            <div className="live-status-pill">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              ● Live — {lastUpdatedTime}
            </div>
            <button 
              onClick={handleManualRefresh}
              title="Refresh Data"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--sb-text-secondary)', padding: 0 }}
            >
              <RefreshCw size={14} className={isUpdating ? 'spin' : ''} />
            </button>
          </div>
          <p>Here's what's happening with your design studio today.</p>
        </div>

        {/* Quick Actions Bar */}
        <div className="intro-actions-group">
          <button 
            onClick={() => onNavigateTab && onNavigateTab('studio', 'create')}
            className="btn-primary-gradient"
          >
            <Plus size={15} /> + Create Design
          </button>
          <button 
            onClick={() => onNavigateTab && onNavigateTab('studio', 'requests')}
            className="btn-secondary-white"
          >
            <FileText size={15} color="#7B1FE8" /> New Design Request (6)
          </button>
          <button 
            onClick={() => onNavigateTab && onNavigateTab('studio')}
            className="btn-secondary-white"
          >
            <Upload size={15} /> Upload Sketch
          </button>
          <button 
            onClick={() => onNavigateTab && onNavigateTab('customers')}
            className="btn-secondary-white"
          >
            <Users size={15} /> Add Customer
          </button>
          <button 
            onClick={() => onNavigateTab && onNavigateTab('calendar')}
            className="btn-secondary-white"
          >
            <Calendar size={15} /> Schedule Appointment
          </button>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. KPI / PERFORMANCE CARDS (5 Cards with Recharts mini sparklines)  */}
      {/* ==================================================================== */}
      <section className="kpi-cards-grid">
        {data.stats && data.stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      {/* ==================================================================== */}
      {/* 3. MAIN ANALYTICS SECTION (Earnings AreaChart & Project DonutChart)  */}
      {/* ==================================================================== */}
      <section className="dashboard-grid-two-col">
        <EarningsChart 
          data={data.earningsOverview.chartData} 
          summary={data.earningsOverview.summary} 
        />
        <ProjectStatusDonut 
          data={data.projectStatusData} 
        />
      </section>

      {/* ==================================================================== */}
      {/* 5. ACTIVE DESIGN PROJECTS + TOP DESIGNS & RECENT CLIENTS STACK        */}
      {/* ==================================================================== */}
      <section className="dashboard-grid-two-col">
        {/* Left Column: Active Projects List */}
        <ActiveProjects 
          projects={data.activeProjects} 
          onViewAll={() => onNavigateTab && onNavigateTab('studio')} 
        />

        {/* Right Column Stack: Top Designs Horizontal BarChart + Recent Clients */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TopDesignsChart data={data.topDesigns} />
          <RecentClients 
            clients={data.recentClients} 
            onViewAll={() => onNavigateTab && onNavigateTab('customers')} 
          />
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. RECENT ACTIVITY TIMELINE + UPCOMING APPOINTMENTS                   */}
      {/* ==================================================================== */}
      <section className="dashboard-grid-two-col">
        <ActivityTimeline activities={data.activities} />
        <UpcomingAppointments 
          appointments={data.appointments} 
          onViewCalendar={() => onNavigateTab && onNavigateTab('calendar')} 
        />
      </section>

    </div>
  );
}
