import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Clock, Users, Truck, AlertCircle, Plus, ChevronLeft, 
  ChevronRight, Filter, RefreshCw, CheckCircle2, ChevronDown, Info, Search, X
} from 'lucide-react';
import '../../styles/dashboard.css';

export default function DesignerCalendarWorkspace({
  theme = 'light',
  onNavigateTab
}) {
  const isDark = theme === 'dark';

  // Brand Color Tokens
  const primaryPink = '#EC167F';
  const primaryPinkHover = '#D91472';
  const lightPink = '#FFF0F7';
  const pinkBorder = '#F8B5D5';
  
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const pageBg = isDark ? '#0D0A1A' : '#F7F8FA';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E5E7EB';
  const softBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#EEF0F3';
  const textColor = isDark ? '#F9FAFB' : '#172033';
  const secTextColor = isDark ? '#A0AEC0' : '#667085';
  const mutedTextColor = isDark ? '#718096' : '#98A2B3';
  const inputBg = isDark ? '#231D34' : '#FFFFFF';

  // States
  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [viewType, setViewType] = useState('Month');
  const [selectedDesigner, setSelectedDesigner] = useState('Ananya Roy');
  const [eventTypeFilter, setEventTypeFilter] = useState('All Event Types');
  const [designerFilter, setDesignerFilter] = useState('All Designers');
  const [dateRange, setDateRange] = useState('01 Jun 2025 – 30 Jun 2025');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCustomer, setNewEventCustomer] = useState('');
  const [newEventType, setNewEventType] = useState('Design Deadline');
  const [newEventDate, setNewEventDate] = useState('2025-06-10');
  const [newEventTime, setNewEventTime] = useState('10:00 AM');

  // Designers List Data
  const designers = [
    { name: 'Ananya Roy', role: 'Expert Designer', status: 'Online', statusColor: '#16A36A', avatar: '/images/customers/Ananya Roy.jpg' },
    { name: 'Rohit Sharma', role: 'Senior Designer', status: 'Online', statusColor: '#16A36A', avatar: '/images/customers/Amit Verma.jpg' },
    { name: 'Neha Iyer', role: 'Designer', status: 'Busy', statusColor: '#F59E0B', avatar: '/images/customers/neha verma.jpg' },
    { name: 'Vikram Menon', role: 'Designer', status: 'Offline', statusColor: '#98A2B3', avatar: '/images/customers/ritik malhotra.jpg' },
  ];

  // Calendar Event Categories Style Config
  const eventStyles = {
    'Design Deadline': {
      bg: isDark ? 'rgba(236,22,127,0.18)' : '#FFF0F7',
      border: isDark ? 'rgba(236,22,127,0.4)' : '#F8B5D5',
      color: '#EC167F',
      dotColor: '#EC167F',
      badgeBg: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7',
      badgeText: '#EC167F'
    },
    'Client Appointment': {
      bg: isDark ? 'rgba(124,58,237,0.18)' : '#F4EEFF',
      border: isDark ? 'rgba(124,58,237,0.4)' : '#DDD0FF',
      color: '#7C3AED',
      dotColor: '#7C3AED',
      badgeBg: isDark ? 'rgba(124,58,237,0.2)' : '#F4EEFF',
      badgeText: '#7C3AED'
    },
    'Trial/Measurement': {
      bg: isDark ? 'rgba(59,130,246,0.18)' : '#EFF6FF',
      border: isDark ? 'rgba(59,130,246,0.4)' : '#C7DFFF',
      color: '#3B82F6',
      dotColor: '#3B82F6',
      badgeBg: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF',
      badgeText: '#3B82F6'
    },
    'Client Delivery': {
      bg: isDark ? 'rgba(22,163,106,0.18)' : '#ECFDF3',
      border: isDark ? 'rgba(22,163,106,0.4)' : '#B7E8CF',
      color: '#16A36A',
      dotColor: '#16A36A',
      badgeBg: isDark ? 'rgba(22,163,106,0.2)' : '#ECFDF3',
      badgeText: '#16A36A'
    },
    'Overdue': {
      bg: isDark ? 'rgba(245,158,11,0.18)' : '#FFF7E6',
      border: isDark ? 'rgba(245,158,11,0.4)' : '#FAD89B',
      color: '#F59E0B',
      dotColor: '#F59E0B',
      badgeBg: isDark ? 'rgba(245,158,11,0.2)' : '#FFF7E6',
      badgeText: '#F59E0B'
    }
  };

  // Calendar Days Grid Data (June 2025 — 35 cells matching exact image layout)
  const calendarGrid = [
    // Week 1 (May 25 - May 31)
    { dayNum: 25, isOtherMonth: true, events: [{ label: '2 Deliveries', type: 'Client Delivery' }, { label: '+1 more', isMore: true }] },
    { dayNum: 26, isOtherMonth: true, events: [{ label: 'Client: Priya S.', type: 'Client Appointment' }, { label: 'Measurement', type: 'Trial/Measurement' }, { label: '+1 more', isMore: true }] },
    { dayNum: 27, isOtherMonth: true, events: [{ label: 'Design Deadline', type: 'Design Deadline' }, { label: '+1 more', isMore: true }] },
    { dayNum: 28, isOtherMonth: true, events: [{ label: 'Trial Fitting', type: 'Trial/Measurement' }, { label: '+1 more', isMore: true }] },
    { dayNum: 29, isOtherMonth: true, events: [] },
    { dayNum: 30, isOtherMonth: true, events: [{ label: 'Client: Neha K.', type: 'Client Appointment' }] },
    { dayNum: 31, isOtherMonth: true, events: [{ label: 'Delivery Due', type: 'Client Delivery' }] },

    // Week 2 (Jun 1 - Jun 7)
    { dayNum: 1, isOtherMonth: false, events: [] },
    { dayNum: 2, isOtherMonth: false, events: [] },
    { dayNum: 3, isOtherMonth: false, events: [] },
    { dayNum: 4, isOtherMonth: false, events: [] },
    { dayNum: 5, isOtherMonth: false, events: [] },
    { dayNum: 6, isOtherMonth: false, events: [] },
    { dayNum: 7, isOtherMonth: false, events: [] },

    // Week 3 (Jun 8 - Jun 14)
    { dayNum: 8, isOtherMonth: false, events: [] },
    { dayNum: 9, isOtherMonth: false, events: [{ label: 'Measurement', type: 'Trial/Measurement' }, { label: 'Client: Arjun M.', type: 'Client Appointment' }] },
    { dayNum: 10, isOtherMonth: false, isToday: true, events: [{ label: 'Design Deadline', type: 'Design Deadline' }, { label: 'Trial Fitting', type: 'Trial/Measurement' }, { label: '+1 more', isMore: true }] },
    { dayNum: 11, isOtherMonth: false, events: [{ label: 'Client: Sneha R.', type: 'Client Appointment' }] },
    { dayNum: 12, isOtherMonth: false, events: [{ label: 'Measurement', type: 'Trial/Measurement' }] },
    { dayNum: 13, isOtherMonth: false, events: [] },
    { dayNum: 14, isOtherMonth: false, events: [{ label: 'Delivery Due', type: 'Client Delivery' }, { label: '+1 more', isMore: true }] },

    // Week 4 (Jun 15 - Jun 21)
    { dayNum: 15, isOtherMonth: false, events: [{ label: 'Design Deadline', type: 'Design Deadline' }] },
    { dayNum: 16, isOtherMonth: false, events: [{ label: 'Trial Fitting', type: 'Trial/Measurement' }, { label: '+1 more', isMore: true }] },
    { dayNum: 17, isOtherMonth: false, events: [] },
    { dayNum: 18, isOtherMonth: false, events: [{ label: 'Client: Kiran S.', type: 'Client Appointment' }] },
    { dayNum: 19, isOtherMonth: false, events: [{ label: 'Measurement', type: 'Trial/Measurement' }, { label: 'Design Deadline', type: 'Design Deadline' }] },
    { dayNum: 20, isOtherMonth: false, events: [] },
    { dayNum: 21, isOtherMonth: false, events: [{ label: 'Delivery Due', type: 'Client Delivery' }] },

    // Week 5 (Jun 22 - Jun 28)
    { dayNum: 22, isOtherMonth: false, events: [] },
    { dayNum: 23, isOtherMonth: false, events: [{ label: 'Measurement', type: 'Trial/Measurement' }, { label: '+1 more', isMore: true }] },
    { dayNum: 24, isOtherMonth: false, events: [{ label: 'Client: Divya P.', type: 'Client Appointment' }] },
    { dayNum: 25, isOtherMonth: false, events: [{ label: 'Trial Fitting', type: 'Trial/Measurement' }] },
    { dayNum: 26, isOtherMonth: false, events: [] },
    { dayNum: 27, isOtherMonth: false, events: [{ label: 'Design Deadline', type: 'Design Deadline' }, { label: '+1 more', isMore: true }] },
    { dayNum: 28, isOtherMonth: false, events: [] },

    // Week 6 (Jun 29 - Jul 5)
    { dayNum: 29, isOtherMonth: false, events: [{ label: 'Delivery Due', type: 'Client Delivery' }, { label: '+1 more', isMore: true }] },
    { dayNum: 30, isOtherMonth: false, events: [{ label: 'Measurement', type: 'Trial/Measurement' }] },
    { dayNum: 1, isOtherMonth: true, events: [] },
    { dayNum: 2, isOtherMonth: true, events: [] },
    { dayNum: 3, isOtherMonth: true, events: [] },
    { dayNum: 4, isOtherMonth: true, events: [] },
    { dayNum: 5, isOtherMonth: true, events: [] }
  ];

  // Upcoming Events Panel Data
  const upcomingEvents = [
    {
      group: 'Today · Tue, 10 Jun 2025',
      items: [
        { time: '09:30 AM', title: 'Design Discussion', client: 'Priya Sharma', type: 'Design Deadline' },
        { time: '11:00 AM', title: 'Trial Fitting', client: 'Rahul Verma', type: 'Trial/Measurement' },
        { time: '01:30 PM', title: 'Client Appointment', client: 'Neha Kapoor', type: 'Client Appointment' },
        { time: '04:00 PM', title: 'Design Deadline', client: 'Wedding Lehenga', type: 'Design Deadline' }
      ]
    },
    {
      group: 'Tomorrow · Wed, 11 Jun 2025',
      items: [
        { time: '10:00 AM', title: 'Client Appointment', client: 'Sneha Reddy', type: 'Client Appointment' },
        { time: '02:00 PM', title: 'Measurement Session', client: 'Arjun Mehta', type: 'Trial/Measurement' }
      ]
    }
  ];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: pageBg,
      color: textColor,
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      boxSizing: 'border-box',
      padding: '28px 32px'
    }}>
      
      {/* Edge-to-Edge Container */}
      <div style={{ width: '100%', maxWidth: '1500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ==================================================================== */}
        {/* 1. PAGE HEADER & ACTIONS                                              */}
        {/* ==================================================================== */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, lineHeight: '34px', color: textColor }}>
              Designer Calendar & Deadlines
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: secTextColor, fontWeight: 400, lineHeight: '20px' }}>
              Color-coded schedule for client appointments, measurement trials, and atelier delivery deadlines.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Today Button */}
            <button 
              onClick={() => alert("Navigated to Today's schedule")}
              style={{
                height: '40px',
                padding: '0 16px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                background: cardBg,
                fontSize: '13px',
                fontWeight: 600,
                color: textColor,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <CalendarIcon size={15} color={secTextColor} />
              <span>Today</span>
            </button>

            {/* Month Selector */}
            <select 
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              style={{
                height: '40px',
                padding: '0 14px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                background: cardBg,
                fontSize: '13px',
                fontWeight: 600,
                color: textColor,
                cursor: 'pointer',
                outline: 'none',
                minWidth: '130px'
              }}
            >
              <option value="May 2025">May 2025</option>
              <option value="June 2025">June 2025</option>
              <option value="July 2025">July 2025</option>
            </select>

            {/* Primary Button — + Add Event */}
            <button 
              onClick={() => setIsAddModalOpen(true)}
              style={{
                height: '40px',
                padding: '0 18px',
                background: primaryPink,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(236,22,127,0.25)'
              }}
            >
              <Plus size={16} color="#FFFFFF" />
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>+ Add Event</span>
            </button>

          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. EVENT LEGEND ROW                                                  */}
        {/* ==================================================================== */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap', fontSize: '12px', fontWeight: 500, color: secTextColor }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EC167F' }} />
            <span>Fitting/Design Deadline</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#7C3AED' }} />
            <span>Client Appointment</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#3B82F6' }} />
            <span>Trial/Measurement</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#16A36A' }} />
            <span>Client Delivery</span>
          </span>
        </div>

        {/* ==================================================================== */}
        {/* 3. KPI SUMMARY (5 Equal Cards in 1 Horizontal Row)                  */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          width: '100%'
        }}>
          
          {/* Card 1 — Today's Schedule */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '118px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarIcon size={18} color={primaryPink} />
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Today's Schedule</span>
                <strong style={{ fontSize: '26px', fontWeight: 700, color: textColor, lineHeight: 1.1, marginTop: '2px', display: 'block' }}>8</strong>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{ color: secTextColor }}>Events</span>
              <button onClick={() => alert("Viewing today's schedule")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View today →</button>
            </div>
          </div>

          {/* Card 2 — Client Appointments */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '118px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? 'rgba(124,58,237,0.2)' : '#F4EEFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="#7C3AED" />
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Client Appointments</span>
                <strong style={{ fontSize: '26px', fontWeight: 700, color: textColor, lineHeight: 1.1, marginTop: '2px', display: 'block' }}>5</strong>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{ color: secTextColor }}>Upcoming</span>
              <button onClick={() => alert("Viewing upcoming client appointments")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View all →</button>
            </div>
          </div>

          {/* Card 3 — Trials / Measurements */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '118px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} color="#3B82F6" />
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Trials / Measurements</span>
                <strong style={{ fontSize: '26px', fontWeight: 700, color: textColor, lineHeight: 1.1, marginTop: '2px', display: 'block' }}>7</strong>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{ color: secTextColor }}>Upcoming</span>
              <button onClick={() => alert("Viewing trials & measurements")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View all →</button>
            </div>
          </div>

          {/* Card 4 — Deliveries Due */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '118px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? 'rgba(22,163,106,0.2)' : '#ECFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={18} color="#16A36A" />
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Deliveries Due</span>
                <strong style={{ fontSize: '26px', fontWeight: 700, color: textColor, lineHeight: 1.1, marginTop: '2px', display: 'block' }}>6</strong>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{ color: secTextColor }}>Upcoming</span>
              <button onClick={() => alert("Viewing deliveries due")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View all →</button>
            </div>
          </div>

          {/* Card 5 — Overdue */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '118px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? 'rgba(245,158,11,0.2)' : '#FFF7E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={18} color="#F59E0B" />
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Overdue</span>
                <strong style={{ fontSize: '26px', fontWeight: 700, color: textColor, lineHeight: 1.1, marginTop: '2px', display: 'block' }}>2</strong>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{ color: secTextColor }}>Events</span>
              <button onClick={() => alert("Viewing overdue deadlines")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View details →</button>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 4. MAIN CONTENT GRID (Left Filter Panel | Calendar | Upcoming)      */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '270px 1fr 340px',
          gap: '16px',
          width: '100%',
          alignItems: 'flex-start'
        }}>
          
          {/* ================================================================== */}
          {/* COLUMN 1: LEFT SIDEBAR (Filter Events & Designer List)             */}
          {/* ================================================================== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Filter Events Card */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor }}>Filter Events</h3>
              
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: secTextColor, display: 'block', marginBottom: '4px' }}>Event Type</label>
                <select 
                  value={eventTypeFilter}
                  onChange={e => setEventTypeFilter(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="All Event Types">All Event Types</option>
                  <option value="Fitting/Design Deadline">Design Deadline</option>
                  <option value="Client Appointment">Client Appointment</option>
                  <option value="Trial/Measurement">Trial/Measurement</option>
                  <option value="Client Delivery">Client Delivery</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: secTextColor, display: 'block', marginBottom: '4px' }}>Designer</label>
                <select 
                  value={designerFilter}
                  onChange={e => setDesignerFilter(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="All Designers">All Designers</option>
                  <option value="Ananya Roy">Ananya Roy</option>
                  <option value="Rohit Sharma">Rohit Sharma</option>
                  <option value="Neha Iyer">Neha Iyer</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: secTextColor, display: 'block', marginBottom: '4px' }}>Date Range</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, fontSize: '11px', color: textColor }}>
                  <span>{dateRange}</span>
                  <CalendarIcon size={14} color={secTextColor} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <button 
                  onClick={() => alert("Filters applied successfully!")}
                  style={{
                    flex: 1,
                    height: '38px',
                    borderRadius: '8px',
                    border: `1px solid ${primaryPink}`,
                    background: cardBg,
                    color: primaryPink,
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Apply Filters
                </button>
                <button 
                  onClick={() => {
                    setEventTypeFilter('All Event Types');
                    setDesignerFilter('All Designers');
                  }}
                  style={{
                    height: '38px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: primaryPink,
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Designer List Card */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor }}>Designer List</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {designers.map(d => {
                  const isSelected = selectedDesigner === d.name;
                  return (
                    <div 
                      key={d.name}
                      onClick={() => setSelectedDesigner(d.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        background: isSelected ? (isDark ? 'rgba(236,22,127,0.12)' : '#FFF5FA') : 'transparent',
                        borderLeft: isSelected ? `3px solid ${primaryPink}` : '3px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={d.avatar} alt={d.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <strong style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', lineHeight: 1.2 }}>{d.name}</strong>
                          <span style={{ fontSize: '10px', color: secTextColor }}>{d.role}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: d.statusColor, fontWeight: 600 }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: d.statusColor }} />
                        <span>{d.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => alert("Viewing all studio designers...")}
                style={{
                  width: '100%',
                  height: '36px',
                  borderRadius: '8px',
                  border: `1px solid ${pinkBorder}`,
                  background: cardBg,
                  color: primaryPink,
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                View All Designers
              </button>
            </div>

          </div>

          {/* ================================================================== */}
          {/* COLUMN 2: CENTER MAIN CALENDAR (~58% Width)                         */}
          {/* ================================================================== */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Calendar Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: `1px solid ${borderColor}` }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: textColor }}>
                {selectedMonth}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${borderColor}`, borderRadius: '7px', overflow: 'hidden' }}>
                  <button style={{ width: '32px', height: '32px', border: 'none', background: cardBg, color: secTextColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={16} />
                  </button>
                  <button style={{ width: '32px', height: '32px', border: 'none', borderLeft: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <select 
                  value={viewType}
                  onChange={e => setViewType(e.target.value)}
                  style={{ height: '32px', padding: '0 10px', borderRadius: '7px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  <option value="Month">Month</option>
                  <option value="Week">Week</option>
                  <option value="Day">Day</option>
                </select>
              </div>
            </div>

            {/* Calendar 7-Column Day Header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', borderBottom: `1px solid ${softBorderColor}`, paddingBottom: '8px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <span key={day} style={{ fontSize: '12px', fontWeight: 600, color: secTextColor }}>
                  {day}
                </span>
              ))}
            </div>

            {/* 35 Calendar Cells Matrix Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: softBorderColor, borderRadius: '8px', overflow: 'hidden' }}>
              {calendarGrid.map((cell, idx) => {
                return (
                  <div
                    key={idx}
                    style={{
                      background: cell.isToday ? (isDark ? 'rgba(236,22,127,0.1)' : '#FFF9FC') : cardBg,
                      minHeight: '108px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Date Number Badge */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '2px' }}>
                      {cell.isToday ? (
                        <span style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: primaryPink,
                          color: '#FFFFFF',
                          fontSize: '12px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(236,22,127,0.3)'
                        }}>
                          {cell.dayNum}
                        </span>
                      ) : (
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: cell.isOtherMonth ? mutedTextColor : textColor,
                          paddingLeft: '4px'
                        }}>
                          {cell.dayNum}
                        </span>
                      )}
                    </div>

                    {/* Events List inside Cell */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {cell.events.map((ev, evIdx) => {
                        if (ev.isMore) {
                          return (
                            <span key={evIdx} style={{ fontSize: '10px', color: mutedTextColor, fontWeight: 500, paddingLeft: '4px', marginTop: '1px' }}>
                              {ev.label}
                            </span>
                          );
                        }

                        const styleConfig = eventStyles[ev.type] || eventStyles['Design Deadline'];

                        return (
                          <div 
                            key={evIdx}
                            style={{
                              background: styleConfig.bg,
                              border: `1px solid ${styleConfig.border}`,
                              borderRadius: '5px',
                              padding: '2px 6px',
                              fontSize: '10px',
                              fontWeight: 500,
                              color: styleConfig.color,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: styleConfig.dotColor, flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Statement Footer */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '11px', color: secTextColor, paddingTop: '8px' }}>
              <span>Showing May 25 – July 5, 2025 Schedule · All times are in IST</span>
              <Info size={13} color={secTextColor} />
            </div>

          </div>

          {/* ================================================================== */}
          {/* COLUMN 3: RIGHT UPCOMING EVENTS PANEL (~23% Width)                 */}
          {/* ================================================================== */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor }}>Upcoming Events</h3>
              <button onClick={() => alert("Viewing all upcoming events")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                View All
              </button>
            </div>

            {/* Events Grouped by Day */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {upcomingEvents.map((grp, grpIdx) => (
                <div key={grpIdx} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: primaryPink }}>
                    {grp.group}
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {grp.items.map((item, itemIdx) => {
                      const styleConfig = eventStyles[item.type] || eventStyles['Design Deadline'];

                      return (
                        <div 
                          key={itemIdx}
                          style={{
                            borderLeft: `3px solid ${styleConfig.color}`,
                            paddingLeft: '10px',
                            display: 'flex',
                            justify: 'space-between',
                            alignItems: 'flex-start',
                            gap: '8px'
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '10px', color: secTextColor, display: 'block' }}>{item.time}</span>
                            <strong style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block', marginTop: '1px' }}>{item.title}</strong>
                            <span style={{ fontSize: '11px', color: secTextColor, display: 'block', marginTop: '1px' }}>{item.client}</span>
                          </div>

                          <span style={{
                            fontSize: '9px',
                            fontWeight: 600,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: styleConfig.badgeBg,
                            color: styleConfig.badgeText,
                            whiteSpace: 'nowrap'
                          }}>
                            {item.type}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Sync Calendar Button */}
            <button 
              onClick={() => alert("Calendar synced with Atelier schedule!")}
              style={{
                width: '100%',
                height: '38px',
                borderRadius: '8px',
                border: `1px solid ${pinkBorder}`,
                background: cardBg,
                color: primaryPink,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: 'auto'
              }}
            >
              <RefreshCw size={14} color={primaryPink} />
              <span>Sync Calendar</span>
            </button>

          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 5. ADD EVENT MODAL (WIDTH 500px)                                     */}
      {/* ==================================================================== */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: cardBg,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(16,24,40,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: `1px solid ${borderColor}` }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: textColor }}>Add Calendar Event</h3>
                <span style={{ fontSize: '12px', color: secTextColor }}>Schedule client appointment or delivery deadline.</span>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'transparent', border: 'none', color: secTextColor, cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Event Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Design Discussion / Trial Fitting" 
                  value={newEventTitle}
                  onChange={e => setNewEventTitle(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Customer Name / Order *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Priya Sharma" 
                  value={newEventCustomer}
                  onChange={e => setNewEventCustomer(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Event Type</label>
                  <select 
                    value={newEventType}
                    onChange={e => setNewEventType(e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }}
                  >
                    <option value="Design Deadline">Fitting / Design Deadline</option>
                    <option value="Client Appointment">Client Appointment</option>
                    <option value="Trial/Measurement">Trial / Measurement</option>
                    <option value="Client Delivery">Client Delivery</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Time</label>
                  <input 
                    type="text" 
                    value={newEventTime}
                    onChange={e => setNewEventTime(e.target.value)}
                    placeholder="10:00 AM" 
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Date</label>
                <input 
                  type="date" 
                  value={newEventDate}
                  onChange={e => setNewEventDate(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} 
                />
              </div>
            </div>

            <div style={{ padding: '16px 20px', borderTop: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setIsAddModalOpen(false)} style={{ height: '38px', padding: '0 16px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: cardBg, color: textColor, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button 
                onClick={() => {
                  alert(`Successfully created event "${newEventTitle || 'New Event'}" on ${newEventDate}!`);
                  setIsAddModalOpen(false);
                }}
                style={{ height: '38px', padding: '0 18px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(236,22,127,0.25)' }}
              >
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Create Event</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
