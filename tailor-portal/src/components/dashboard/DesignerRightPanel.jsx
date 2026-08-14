import React from 'react';
import AIDesignAssistant from './AIDesignAssistant';
import UpcomingAppointments from './UpcomingAppointments';
import RecentClients from './RecentClients';

export default function DesignerRightPanel({ theme, appointments, clients, onViewCalendar, onViewClients, onOpenAI }) {
  return (
    <aside style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      minWidth: 0,
      width: '100%'
    }}>
      
      {/* 14. AI Design Assistant Card */}
      <AIDesignAssistant theme={theme} onOpenAssistant={onOpenAI} />

      {/* 9. Upcoming Appointments */}
      <UpcomingAppointments 
        appointments={appointments} 
        onViewCalendar={onViewCalendar} 
      />

      {/* 12. Recent Clients */}
      <RecentClients 
        clients={clients} 
        onViewAll={onViewClients} 
      />

    </aside>
  );
}
