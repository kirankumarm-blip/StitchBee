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

  // DYNAMIC CALENDAR DATE ENGINE STATE (Defaults to June 2025 for initial view, can navigate to any date)
  const [viewDate, setViewDate] = useState(new Date(2025, 5, 10)); // Year 2025, Month June (0-indexed 5), Day 10
  const [viewType, setViewType] = useState('Month'); // 'Month' | 'Week' | 'Day'
  const [selectedDesigner, setSelectedDesigner] = useState('Ananya Roy');
  const [eventTypeFilter, setEventTypeFilter] = useState('All Event Types');
  const [designerFilter, setDesignerFilter] = useState('All Designers');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCustomer, setNewEventCustomer] = useState('');
  const [newEventType, setNewEventType] = useState('Design Deadline');
  const [newEventDate, setNewEventDate] = useState('2025-06-10');
  const [newEventTime, setNewEventTime] = useState('10:00 AM');
  const [newEventDesigner, setNewEventDesigner] = useState('Ananya Roy');

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

  // DYNAMIC EVENTS STATE DATABASE
  const [eventsList, setEventsList] = useState([
    { id: 1, date: '2025-05-25', title: '2 Deliveries', type: 'Client Delivery', time: '11:00 AM', customer: 'Atelier Dispatch', designer: 'Ananya Roy' },
    { id: 2, date: '2025-05-26', title: 'Client: Priya S.', type: 'Client Appointment', time: '02:00 PM', customer: 'Priya Sharma', designer: 'Ananya Roy' },
    { id: 3, date: '2025-05-26', title: 'Measurement', type: 'Trial/Measurement', time: '04:30 PM', customer: 'Priya Sharma', designer: 'Ananya Roy' },
    { id: 4, date: '2025-05-27', title: 'Design Deadline', type: 'Design Deadline', time: '05:00 PM', customer: 'Royal Bridal Lehenga', designer: 'Ananya Roy' },
    { id: 5, date: '2025-05-28', title: 'Trial Fitting', type: 'Trial/Measurement', time: '10:30 AM', customer: 'Amit Verma', designer: 'Rohit Sharma' },
    { id: 6, date: '2025-05-30', title: 'Client: Neha K.', type: 'Client Appointment', time: '01:00 PM', customer: 'Neha Kapoor', designer: 'Neha Iyer' },
    { id: 7, date: '2025-05-31', title: 'Delivery Due', type: 'Client Delivery', time: '06:00 PM', customer: 'Zardozi Sherwani', designer: 'Ananya Roy' },

    { id: 8, date: '2025-06-09', title: 'Measurement', type: 'Trial/Measurement', time: '11:00 AM', customer: 'Arjun Mehta', designer: 'Ananya Roy' },
    { id: 9, date: '2025-06-09', title: 'Client: Arjun M.', type: 'Client Appointment', time: '03:00 PM', customer: 'Arjun Mehta', designer: 'Ananya Roy' },

    { id: 10, date: '2025-06-10', title: 'Design Discussion', type: 'Design Deadline', time: '09:30 AM', customer: 'Priya Sharma', designer: 'Ananya Roy' },
    { id: 11, date: '2025-06-10', title: 'Trial Fitting', type: 'Trial/Measurement', time: '11:00 AM', customer: 'Rahul Verma', designer: 'Ananya Roy' },
    { id: 12, date: '2025-06-10', title: 'Client Appointment', type: 'Client Appointment', time: '01:30 PM', customer: 'Neha Kapoor', designer: 'Ananya Roy' },
    { id: 13, date: '2025-06-10', title: 'Design Deadline', type: 'Design Deadline', time: '04:00 PM', customer: 'Wedding Lehenga', designer: 'Ananya Roy' },

    { id: 14, date: '2025-06-11', title: 'Client: Sneha R.', type: 'Client Appointment', time: '10:00 AM', customer: 'Sneha Reddy', designer: 'Ananya Roy' },
    { id: 15, date: '2025-06-11', title: 'Measurement Session', type: 'Trial/Measurement', time: '02:00 PM', customer: 'Arjun Mehta', designer: 'Ananya Roy' },

    { id: 16, date: '2025-06-12', title: 'Measurement', type: 'Trial/Measurement', time: '11:30 AM', customer: 'Kavya Iyer', designer: 'Neha Iyer' },
    { id: 17, date: '2025-06-14', title: 'Delivery Due', type: 'Client Delivery', time: '05:00 PM', customer: 'Silk Anarkali', designer: 'Ananya Roy' },

    { id: 18, date: '2025-06-15', title: 'Design Deadline', type: 'Design Deadline', time: '06:00 PM', customer: 'Chanderi Saree', designer: 'Rohit Sharma' },
    { id: 19, date: '2025-06-16', title: 'Trial Fitting', type: 'Trial/Measurement', time: '01:00 PM', customer: 'Ritika Singh', designer: 'Ananya Roy' },
    { id: 20, date: '2025-06-18', title: 'Client: Kiran S.', type: 'Client Appointment', time: '04:00 PM', customer: 'Kiran Sharma', designer: 'Ananya Roy' },
    { id: 21, date: '2025-06-19', title: 'Measurement', type: 'Trial/Measurement', time: '10:30 AM', customer: 'Divya Patel', designer: 'Ananya Roy' },
    { id: 22, date: '2025-06-19', title: 'Design Deadline', type: 'Design Deadline', time: '03:30 PM', customer: 'Reception Gown', designer: 'Ananya Roy' },
    { id: 23, date: '2025-06-21', title: 'Delivery Due', type: 'Client Delivery', time: '05:30 PM', customer: 'Pastel Lehenga', designer: 'Ananya Roy' },

    { id: 24, date: '2025-06-23', title: 'Measurement', type: 'Trial/Measurement', time: '02:30 PM', customer: 'Meera Kapoor', designer: 'Rohit Sharma' },
    { id: 25, date: '2025-06-24', title: 'Client: Divya P.', type: 'Client Appointment', time: '11:00 AM', customer: 'Divya Patel', designer: 'Ananya Roy' },
    { id: 26, date: '2025-06-25', title: 'Trial Fitting', type: 'Trial/Measurement', time: '04:00 PM', customer: 'Ananya Roy', designer: 'Ananya Roy' },
    { id: 27, date: '2025-06-27', title: 'Design Deadline', type: 'Design Deadline', time: '05:00 PM', customer: 'Velvet Sherwani', designer: 'Ananya Roy' },

    { id: 28, date: '2025-06-29', title: 'Delivery Due', type: 'Client Delivery', time: '06:00 PM', customer: 'Emerald Gown', designer: 'Ananya Roy' },
    { id: 29, date: '2025-06-30', title: 'Measurement', type: 'Trial/Measurement', time: '12:00 PM', customer: 'Ritik Malhotra', designer: 'Ananya Roy' },

    // August 2026 Live Dates
    { id: 30, date: '2026-08-15', title: 'Design Discussion', type: 'Design Deadline', time: '10:00 AM', customer: 'Priya Sharma', designer: 'Ananya Roy' },
    { id: 31, date: '2026-08-15', title: 'Trial Fitting', type: 'Trial/Measurement', time: '02:30 PM', customer: 'Amit Verma', designer: 'Ananya Roy' },
    { id: 32, date: '2026-08-20', title: 'Client Appointment', type: 'Client Appointment', time: '04:00 PM', customer: 'Neha Verma', designer: 'Ananya Roy' },
    { id: 33, date: '2026-08-28', title: 'Delivery Due', type: 'Client Delivery', time: '05:00 PM', customer: 'Royal Bridal Lehenga', designer: 'Ananya Roy' }
  ]);

  // DYNAMIC CALENDAR MATRIX GENERATOR
  const currYear = viewDate.getFullYear();
  const currMonth = viewDate.getMonth(); // 0 to 11

  // Month Title string (e.g. "June 2025", "August 2026")
  const monthTitle = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Navigation handlers
  const handlePrevMonth = () => {
    setViewDate(new Date(currYear, currMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currYear, currMonth + 1, 1));
  };

  const handleToday = () => {
    setViewDate(new Date()); // Navigates dynamically to current real-time today
  };

  // Helper to format Date object into YYYY-MM-DD
  const formatYMD = (year, monthZeroIdx, dayNum) => {
    const y = year;
    const m = String(monthZeroIdx + 1).padStart(2, '0');
    const d = String(dayNum).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Generate dynamic day grid cells (35 or 42 cells)
  const generateDynamicCalendarGrid = () => {
    const firstDayIndex = new Date(currYear, currMonth, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const daysInCurrentMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currYear, currMonth, 0).getDate();

    const todayNow = new Date();
    const todayY = todayNow.getFullYear();
    const todayM = todayNow.getMonth();
    const todayD = todayNow.getDate();

    const grid = [];

    // Trailing days from Previous Month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevM = currMonth === 0 ? 11 : currMonth - 1;
      const prevY = currMonth === 0 ? currYear - 1 : currYear;
      const ymd = formatYMD(prevY, prevM, dayNum);

      grid.push({
        dayNum,
        isOtherMonth: true,
        ymd,
        isToday: false
      });
    }

    // Days for Current Month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const ymd = formatYMD(currYear, currMonth, i);
      const isToday = (i === todayD && currMonth === todayM && currYear === todayY);

      grid.push({
        dayNum: i,
        isOtherMonth: false,
        ymd,
        isToday
      });
    }

    // Leading days for Next Month to complete 35 or 42 grid cells
    const totalCells = grid.length > 35 ? 42 : 35;
    const remainingCells = totalCells - grid.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextM = currMonth === 11 ? 0 : currMonth + 1;
      const nextY = currMonth === 11 ? currYear + 1 : currYear;
      const ymd = formatYMD(nextY, nextM, i);

      grid.push({
        dayNum: i,
        isOtherMonth: true,
        ymd,
        isToday: false
      });
    }

    return grid;
  };

  const dynamicGridCells = generateDynamicCalendarGrid();

  // Filtered Events
  const getEventsForDate = (ymdString) => {
    return eventsList.filter(ev => {
      const matchesDate = ev.date === ymdString;
      const matchesType = eventTypeFilter === 'All Event Types' || ev.type === eventTypeFilter;
      const matchesDesigner = designerFilter === 'All Designers' || ev.designer === designerFilter;
      return matchesDate && matchesType && matchesDesigner;
    });
  };

  // Add New Event Handler
  const handleCreateNewEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle || !newEventCustomer) {
      alert("Please fill in event title and customer name!");
      return;
    }

    const newEv = {
      id: Date.now(),
      date: newEventDate,
      title: newEventTitle,
      type: newEventType,
      time: newEventTime,
      customer: newEventCustomer,
      designer: newEventDesigner
    };

    setEventsList(prev => [...prev, newEv]);

    // Automatically navigate view date to newly added event's month
    const [y, m] = newEventDate.split('-').map(Number);
    setViewDate(new Date(y, m - 1, 1));

    setIsAddModalOpen(false);
    setNewEventTitle('');
    setNewEventCustomer('');
    alert(`Successfully added event "${newEventTitle}" on ${newEventDate}!`);
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: pageBg,
      color: textColor,
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      boxSizing: 'border-box',
      padding: '24px 28px'
    }}>
      
      {/* 100% Dynamic Screen Width Container (No side gaps) */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ==================================================================== */}
        {/* 1. PAGE HEADER & DYNAMIC CONTROLS                                    */}
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
              onClick={handleToday}
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

            {/* Dynamic Month Selector */}
            <select 
              value={`${currYear}-${String(currMonth + 1).padStart(2, '0')}`}
              onChange={e => {
                const [y, m] = e.target.value.split('-').map(Number);
                setViewDate(new Date(y, m - 1, 1));
              }}
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
                minWidth: '150px'
              }}
            >
              <option value="2025-05">May 2025</option>
              <option value="2025-06">June 2025</option>
              <option value="2025-07">July 2025</option>
              <option value="2026-08">August 2026 (Live)</option>
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
              <button onClick={handleToday} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View today →</button>
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
              <button onClick={() => setEventTypeFilter('Client Appointment')} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View all →</button>
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
              <button onClick={() => setEventTypeFilter('Trial/Measurement')} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View all →</button>
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
              <button onClick={() => setEventTypeFilter('Client Delivery')} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View all →</button>
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
              <button onClick={() => setEventTypeFilter('Overdue')} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View details →</button>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 4. MAIN CONTENT GRID (Left Filter Panel | Calendar | Upcoming)      */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr 320px',
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
                  <option value="Design Deadline">Fitting/Design Deadline</option>
                  <option value="Client Appointment">Client Appointment</option>
                  <option value="Trial/Measurement">Trial/Measurement</option>
                  <option value="Client Delivery">Client Delivery</option>
                  <option value="Overdue">Overdue</option>
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
                  <option value="Vikram Menon">Vikram Menon</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: secTextColor, display: 'block', marginBottom: '4px' }}>Active Month View</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, fontSize: '11px', color: textColor, fontWeight: 600 }}>
                  <span>{monthTitle}</span>
                  <CalendarIcon size={14} color={secTextColor} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <button 
                  onClick={() => alert(`Filters applied: ${eventTypeFilter} • ${designerFilter}`)}
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
                      onClick={() => {
                        setSelectedDesigner(d.name);
                        setDesignerFilter(d.name);
                      }}
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
                onClick={() => setDesignerFilter('All Designers')}
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
                Show All Designers
              </button>
            </div>

          </div>

          {/* ================================================================== */}
          {/* COLUMN 2: CENTER DYNAMIC CALENDAR GRID                              */}
          {/* ================================================================== */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            
            {/* Dynamic Calendar Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: `1px solid ${borderColor}` }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: textColor }}>
                {monthTitle}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${borderColor}`, borderRadius: '7px', overflow: 'hidden' }}>
                  <button 
                    onClick={handlePrevMonth}
                    title="Previous Month"
                    style={{ width: '32px', height: '32px', border: 'none', background: cardBg, color: textColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={handleNextMonth}
                    title="Next Month"
                    style={{ width: '32px', height: '32px', border: 'none', borderLeft: `1px solid ${borderColor}`, background: cardBg, color: textColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
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

            {/* DYNAMIC CALENDAR CELLS MATRIX GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: softBorderColor, borderRadius: '8px', overflow: 'hidden' }}>
              {dynamicGridCells.map((cell, idx) => {
                const cellEvents = getEventsForDate(cell.ymd);
                const displayEvents = cellEvents.slice(0, 2);
                const overflowCount = cellEvents.length - 2;

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
                      boxSizing: 'border-box',
                      transition: 'background 0.15s ease'
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
                      {displayEvents.map(ev => {
                        const styleConfig = eventStyles[ev.type] || eventStyles['Design Deadline'];

                        return (
                          <div 
                            key={ev.id}
                            title={`${ev.time} - ${ev.title} (${ev.customer})`}
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
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</span>
                          </div>
                        );
                      })}

                      {overflowCount > 0 && (
                        <span style={{ fontSize: '10px', color: mutedTextColor, fontWeight: 500, paddingLeft: '4px', marginTop: '1px' }}>
                          +{overflowCount} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Statement Footer */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '11px', color: secTextColor, paddingTop: '8px' }}>
              <span>Showing {monthTitle} Schedule · All times are in IST</span>
              <Info size={13} color={secTextColor} />
            </div>

          </div>

          {/* ================================================================== */}
          {/* COLUMN 3: RIGHT UPCOMING EVENTS PANEL                              */}
          {/* ================================================================== */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor }}>Upcoming Events</h3>
              <button onClick={() => alert("Viewing all upcoming events")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                View All
              </button>
            </div>

            {/* Events List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: primaryPink }}>
                  Dynamic Feed · {monthTitle}
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {eventsList.slice(0, 6).map((item) => {
                    const styleConfig = eventStyles[item.type] || eventStyles['Design Deadline'];

                    return (
                      <div 
                        key={item.id}
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
                          <span style={{ fontSize: '10px', color: secTextColor, display: 'block' }}>{item.time} ({item.date.split('-')[2]} {monthTitle.split(' ')[0]})</span>
                          <strong style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block', marginTop: '1px' }}>{item.title}</strong>
                          <span style={{ fontSize: '11px', color: secTextColor, display: 'block', marginTop: '1px' }}>{item.customer}</span>
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
            </div>

            {/* Sync Calendar Button */}
            <button 
              onClick={() => alert("Calendar synced with Atelier live schedule!")}
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
      {/* 5. ADD EVENT MODAL (DYNAMICS LIVE INJECTION)                         */}
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

            <form onSubmit={handleCreateNewEvent} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Event Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Design Discussion / Trial Fitting" 
                  value={newEventTitle}
                  onChange={e => setNewEventTitle(e.target.value)}
                  required
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
                  required
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Date</label>
                  <input 
                    type="date" 
                    value={newEventDate}
                    onChange={e => setNewEventDate(e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Assigned Designer</label>
                  <select 
                    value={newEventDesigner}
                    onChange={e => setNewEventDesigner(e.target.value)}
                    style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }}
                  >
                    <option value="Ananya Roy">Ananya Roy</option>
                    <option value="Rohit Sharma">Rohit Sharma</option>
                    <option value="Neha Iyer">Neha Iyer</option>
                    <option value="Vikram Menon">Vikram Menon</option>
                  </select>
                </div>
              </div>

              <div style={{ padding: '16px 0 0 0', borderTop: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ height: '38px', padding: '0 16px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: cardBg, color: textColor, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button 
                  type="submit"
                  style={{ height: '38px', padding: '0 18px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(236,22,127,0.25)' }}
                >
                  <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Create Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
