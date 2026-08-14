import React from 'react';
import AIDesignAssistant from './AIDesignAssistant';
import UpcomingAppointments from './UpcomingAppointments';
import RecentClients from './RecentClients';

export default function DesignerRightPanel({ appointments, clients, onViewCalendar, onViewClients, onOpenAI }) {
  return (
    <aside className="designer-right-panel-container">
      
      {/* 14. AI Design Assistant Card */}
      <AIDesignAssistant onOpenAssistant={onOpenAI} />

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
