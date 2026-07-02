import React, { useState, useRef } from 'react';
import { 
  Scissors, ShoppingBag, TrendingUp, Check, Play, Award, Ruler, ArrowRight, Save, Plus, 
  Trash2, Clock, Send, MessageSquare, ShieldAlert, Calendar, ShieldCheck, Database, 
  Bell, Sun, Moon, Sparkles, Star, Edit, Upload, User, Video, MapPin, Map, CreditCard, 
  ChevronDown, ChevronRight, ChevronLeft, X, Info, Heart, List, HelpCircle, Activity, FileText, Filter, Users, Eye,
  Layers, Sliders, Truck, Search
} from 'lucide-react';

export default function TailorView({ 
  tailors, setTailors, orders, updateOrderStatus, theme, setTheme, currentUser, onLogout 
}) {
  // Simulating logged-in tailor: Vogue Craft Tailors (id: 't1')
  const [selectedStoreId, setSelectedStoreId] = useState('t1');
  const tailorProfile = tailors.find(t => t.id === selectedStoreId) || tailors[0];

  // Primary active tabs: dashboard, orders, measurements, inventory, calendar, earnings, chat, reviews, profile, notifications, portfolio, material-requests, team
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Orders tab sub-filtering: 'new' | 'active' | 'completed' | 'cancelled'
  const [ordersSubTab, setOrdersSubTab] = useState('active');

  // Chat center tabs: 'customer' | 'admin' | 'delivery'
  const [chatSubTab, setChatSubTab] = useState('customer');

  // Search queries
  const [measurementSearch, setMeasurementSearch] = useState('');
  const [inventorySearch, setInventorySearch] = useState('');

  // Redesigned Measurements page states
  const [customersList, setCustomersList] = useState([
    {
      name: 'Priya Sharma',
      id: 'CUST-1024',
      cat: 'Women',
      phone: '98765 43210',
      email: 'priya.sharma@email.com',
      image: '/bridal 5.jpg',
      chest: 34,
      waist: 28,
      hip: 36,
      shoulder: 14.5,
      sleeve: 18,
      upperArm: 10.5,
      neck: 13.5,
      fullLength: 56,
      notes: 'Customer prefers slim fit. Extra margin added for comfort.',
      source: 'AI Scan',
      updated: '22 May 2026, 10:30 AM',
      history: [
        { date: '22 May 2026, 10:30 AM', source: 'AI Scan' },
        { date: '20 Feb 2026, 04:15 PM', source: 'Manual' },
        { date: '10 Nov 2025, 11:20 AM', source: 'Existing Dress' }
      ]
    },
    {
      name: 'Amit Verma',
      id: 'CUST-1023',
      cat: 'Men',
      phone: '98765 43211',
      email: 'amit.verma@email.com',
      image: '/men1.jpg',
      chest: 38,
      waist: 32,
      hip: 38,
      shoulder: 17,
      sleeve: 24,
      upperArm: 13.5,
      neck: 15.5,
      fullLength: 29,
      notes: 'Prefers slightly loose fit around shoulder.',
      source: 'Manual',
      updated: '20 May 2026, 04:15 PM',
      history: [
        { date: '20 May 2026, 04:15 PM', source: 'Manual' }
      ]
    },
    {
      name: 'Megha Reddy',
      id: 'CUST-1022',
      cat: 'Women',
      phone: '98765 43212',
      email: 'megha.reddy@email.com',
      image: '/bridal2.jpg',
      chest: 36,
      waist: 34,
      hip: 38,
      shoulder: 15,
      sleeve: 19,
      upperArm: 11,
      neck: 14,
      fullLength: 42,
      notes: 'Anarkali custom border fits.',
      source: 'Existing Dress',
      updated: '18 May 2026, 11:20 AM',
      history: [
        { date: '18 May 2026, 11:20 AM', source: 'Existing Dress' }
      ]
    },
    {
      name: 'Rahul Nair',
      id: 'CUST-1021',
      cat: 'Men',
      phone: '98765 43213',
      email: 'rahul.nair@email.com',
      image: '/men2.jpg',
      chest: 40,
      waist: 34,
      hip: 40,
      shoulder: 18,
      sleeve: 25,
      upperArm: 14,
      neck: 16,
      fullLength: 30,
      notes: 'Formal shirt standard fit.',
      source: 'AI Scan',
      updated: '17 May 2026, 09:15 AM',
      history: [
        { date: '17 May 2026, 09:15 AM', source: 'AI Scan' }
      ]
    },
    {
      name: 'Neha Singh',
      id: 'CUST-1019',
      cat: 'Women',
      phone: '98765 43214',
      email: 'neha.singh@email.com',
      image: '/bridal3.jpg',
      chest: 32,
      waist: 26,
      hip: 34,
      shoulder: 13.5,
      sleeve: 17,
      upperArm: 9.5,
      neck: 12.5,
      fullLength: 54,
      notes: 'Regular designer fit.',
      source: 'AI Scan',
      updated: '15 May 2026, 02:30 PM',
      history: [
        { date: '15 May 2026, 02:30 PM', source: 'AI Scan' }
      ]
    },
    {
      name: 'Sanjay Mehta',
      id: 'CUST-1018',
      cat: 'Men',
      phone: '98765 43215',
      email: 'sanjay.mehta@email.com',
      image: '/men1.jpg',
      chest: 42,
      waist: 36,
      hip: 42,
      shoulder: 19,
      sleeve: 26,
      upperArm: 14.5,
      neck: 16.5,
      fullLength: 31,
      notes: 'Wants premium finish.',
      source: 'Manual',
      updated: '12 May 2026, 10:15 AM',
      history: [
        { date: '12 May 2026, 10:15 AM', source: 'Manual' }
      ]
    },
    {
      name: 'Kavya Patel',
      id: 'CUST-1017',
      cat: 'Women',
      phone: '98765 43216',
      email: 'kavya.patel@email.com',
      image: '/bridal4.jpg',
      chest: 35,
      waist: 29,
      hip: 37,
      shoulder: 14,
      sleeve: 18,
      upperArm: 10,
      neck: 13,
      fullLength: 55,
      notes: 'Bridesmaid lehenga dress.',
      source: 'Existing Dress',
      updated: '10 May 2026, 11:00 AM',
      history: [
        { date: '10 May 2026, 11:00 AM', source: 'Existing Dress' }
      ]
    }
  ]);

  const [selectedCustomerId, setSelectedCustomerId] = useState('CUST-1024');
  const [measurementUnit, setMeasurementUnit] = useState('inch'); // 'inch' | 'cm'
  const [measurementsSubTab, setMeasurementsSubTab] = useState('body'); // 'body' | 'chart' | '3d'
  const [hoveredMeasurementRow, setHoveredMeasurementRow] = useState(null); // 'chest' | 'waist' | 'hip' | etc.

  // Calendar redesign states
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 5, 1)); // Default June 2026
  const [calendarViewMode, setCalendarViewMode] = useState('month'); // 'month' | 'week' | 'day'
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date(2026, 5, 2)); // Default June 2, 2026 (matching mockup active date)
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, date: new Date(2026, 5, 2), time: '02:00 PM', type: 'Stitching Deadline', customer: 'Priya Sharma', details: 'Lehenga stitching completion' },
    { id: 2, date: new Date(2026, 5, 10), time: '11:00 AM', type: 'Stitching Deadline', customer: 'Amit Verma', details: 'Custom Suit stitching completion' },
    { id: 3, date: new Date(2026, 5, 15), time: '04:00 PM', type: 'Stitching Deadline', customer: 'Megha Reddy', details: 'Anarkali stitching completion' },
    { id: 4, date: new Date(2026, 5, 20), time: '10:30 AM', type: 'Pick up & Delivery', customer: 'Rahul Nair', details: 'Sherwani home delivery' },
    { id: 5, date: new Date(2026, 5, 22), time: '01:00 PM', type: 'Stitching Deadline', customer: 'Neha Singh', details: 'Salwar Suit stitching completion' },
    { id: 6, date: new Date(2026, 5, 25), time: '03:00 PM', type: 'Pick up & Delivery', customer: 'Sanjay Mehta', details: 'Kurta home delivery' }
  ]);
  const [calendarFilters, setCalendarFilters] = useState(['Stitching Deadline', 'Pick up & Delivery', 'Appointment', 'Holiday', 'Blocked Date']);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showBlockDatesModal, setShowBlockDatesModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // New Event Form State
  const [newEventCust, setNewEventCust] = useState('');
  const [newEventTime, setNewEventTime] = useState('12:00 PM');
  const [newEventDate, setNewEventDate] = useState('2026-06-02');
  const [newEventType, setNewEventType] = useState('Stitching Deadline');
  const [newEventDetails, setNewEventDetails] = useState('');

  // Block Dates Form State
  const [blockStartDate, setBlockStartDate] = useState('2026-06-12');
  const [blockEndDate, setBlockEndDate] = useState('2026-06-14');

  // Editable Profile fields
  const [shopName, setShopName] = useState(tailorProfile?.name || 'Vogue Craft Tailors');
  const [ownerName, setOwnerName] = useState(tailorProfile?.owner || 'Master Rajesh Kumar');
  const [shopSpecialty, setShopSpecialty] = useState(tailorProfile?.specialty || 'Premium Bridal & Suits');
  const [shopAddress, setShopAddress] = useState(tailorProfile?.address || 'HSR Layout, Bengaluru');
  const [shopHours, setShopHours] = useState('09:00 AM - 09:00 PM');
  const [shopRadius, setShopRadius] = useState('15');
  const [workingDays, setWorkingDays] = useState('Mon - Sat');
  const [stitchingCapacity, setStitchingCapacity] = useState('30');
  const [kycStatus, setKycStatus] = useState('Verified');
  const [bankAccount, setBankAccount] = useState('HDFC Bank •••• 9821');

  // Interactive Stitching Queue progress state
  const [stitchingQueue, setStitchingQueue] = useState([
    { id: 'ORD-1024', customer: 'Priya Sharma', image: '/bridal 5.jpg', outfit: 'Bridal Lehenga', fabric: 'Net Fabric', date: '22 May 2026', daysLeft: '3 days left', progress: 65, status: 'In Progress' },
    { id: 'ORD-1023', customer: 'Amit Verma', image: '/men1.jpg', outfit: 'Sherwani', fabric: 'Silk Fabric', date: '25 May 2026', daysLeft: '6 days left', progress: 30, status: 'Stitching' },
    { id: 'ORD-1022', customer: 'Megha Reddy', image: '/bridal2.jpg', outfit: 'Anarkali Suit', fabric: 'Georgette', date: '28 May 2026', daysLeft: '9 days left', progress: 10, status: 'Cutting' },
    { id: 'ORD-1021', customer: 'Rahul Nair', image: '/men2.jpg', outfit: 'Formal Shirt', fabric: 'Cotton', date: '29 May 2026', daysLeft: '10 days left', progress: 0, status: 'Pending' }
  ]);

  // Incoming Booking Requests
  const [bookingRequests, setBookingRequests] = useState([
    { id: 'REQ-901', customer: 'Ananya Goel', outfit: 'Designer Blouse', fabric: 'Chanderi Silk', distance: '1.2 km', estPrice: '₹1,200', date: 'Just now' },
    { id: 'REQ-902', customer: 'Vikram Seth', outfit: 'Linen Kurta Suit', fabric: 'Premium Linen', distance: '2.5 km', estPrice: '₹3,500', date: '10m ago' }
  ]);

  // Inventory Stock list
  const [inventoryStock, setInventoryStock] = useState([
    { id: 'inv-1', category: 'Thread Spools', name: 'Premium Polyester Thread', quantity: 350, unit: 'spools', status: 'Good', icon: <Database size={18} /> },
    { id: 'inv-2', category: 'Fabric Rolls', name: 'Cotton Silk Blend Fabric', quantity: 45, unit: 'meters', status: 'Good', icon: <Layers size={18} /> },
    { id: 'inv-3', category: 'Accessories', name: 'High-Strength Metal Zippers', quantity: 120, unit: 'pieces', status: 'Low Stock', icon: <Sliders size={18} /> },
    { id: 'inv-4', category: 'Accessories', name: 'Designer Pearl Buttons', quantity: 850, unit: 'pieces', status: 'Good', icon: <Award size={18} /> }
  ]);

  // New stock add
  const [newStockCategory, setNewStockCategory] = useState('Fabric Rolls');
  const [newStockName, setNewStockName] = useState('');
  const [newStockQty, setNewStockQty] = useState('');
  const [newStockUnit, setNewStockUnit] = useState('meters');

  // Material purchase requests from admin
  const [materialRequests, setMaterialRequests] = useState([
    { id: 'REQ-MAT-01', material: 'Golden Zari Border Rolls', qty: '10 rolls', status: 'Pending Approval', date: '28 Jun 2026' },
    { id: 'REQ-MAT-02', material: 'Velvet Base Fabric (Deep Red)', qty: '25 meters', status: 'Approved & Dispatched', date: '25 Jun 2026' }
  ]);
  const [newReqMaterialName, setNewReqMaterialName] = useState('');
  const [newReqMaterialQty, setNewReqMaterialQty] = useState('');

  // Team members list
  const [teamMembers, setTeamMembers] = useState([
    { id: 'tm-1', name: 'Ramesh Sen', role: 'Master Cutting Specialist', status: 'Active', tasks: 'ORD-1022 (Cutting)' },
    { id: 'tm-2', name: 'Suhail Khan', role: 'Senior Embroidery Artist', status: 'Active', tasks: 'ORD-1024 (Embroidery)' },
    { id: 'tm-3', name: 'Savita Devi', role: 'Junior Stitching Assistant', status: 'Active', tasks: 'ORD-1023 (Base Stitching)' }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Stitching Assistant');

  // Calendar scheduler schedule
  const [selectedDay, setSelectedDay] = useState(20);
  const [todaySchedule, setTodaySchedule] = useState([
    { time: '10:00 AM', title: 'Pick up: Silk Fabric', type: 'pickup', desc: 'Customer: Priya Sharma' },
    { time: '04:00 PM', title: 'Delivery: Lehenga', type: 'delivery', desc: 'Customer: Priya Sharma' },
    { time: '06:00 PM', title: 'Appointment', type: 'appointment', desc: 'Customer: Amit Verma' }
  ]);

  // Earnings filter
  const [earningsFilter, setEarningsFilter] = useState('this_week');

  // Chat window state
  const [typedMessage, setTypedMessage] = useState('');
  const [activeChatLogs, setActiveChatLogs] = useState({
    customer: [
      { sender: 'customer', text: 'Hi, is my suit stitching ready?', time: '14:24' },
      { sender: 'tailor', text: 'Stitching is in progress, our student agent will deliver it soon.', time: '14:26' }
    ],
    admin: [
      { sender: 'admin', text: 'Please verify your Aadhaar card details.', time: '10:00' },
      { sender: 'tailor', text: 'Documents uploaded, please approve shop.', time: '10:05' }
    ],
    delivery: [
      { sender: 'delivery', text: 'Arrived at the shop to pick up Order #ORD-1023.', time: '11:15' },
      { sender: 'tailor', text: 'Great, here is the package and customer invoice.', time: '11:17' }
    ]
  });

  // Notifications
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, type: 'new_order', text: 'New order booking request received from Ananya Goel', time: 'Just now', unread: true },
    { id: 2, type: 'message', text: 'Priya Sharma sent a message: "When will my lehenga be ready?"', time: '2m ago', unread: true },
    { id: 3, type: 'low_inventory', text: 'Alert: Zippers count is below threshold (120 remaining)', time: '45m ago', unread: true },
    { id: 4, type: 'payment', text: 'Payment of ₹12,350 for Completed Order #ORD-1019 released', time: '3h ago', unread: false }
  ]);

  // Mock Reviews
  const [reviewsList, setReviewsList] = useState([
    { id: 1, author: 'Priya Sharma', rating: 5, date: '1 week ago', text: 'Rajesh did an outstanding job on my wedding lehenga! The fit is perfect, and the zari work is extremely premium.' },
    { id: 2, author: 'Amit Verma', rating: 4, date: '2 weeks ago', text: 'Great sherwani stitching, fits very well. Deliver was delayed by a couple of hours but overall very good service.' }
  ]);

  // Handle stitching queue updates
  const handleUpdateProgress = (orderId, amount) => {
    setStitchingQueue(stitchingQueue.map(item => {
      if (item.id === orderId) {
        const nextProgress = Math.min(100, Math.max(0, item.progress + amount));
        let nextStatus = item.status;
        if (nextProgress === 0) nextStatus = 'Pending';
        else if (nextProgress < 30) nextStatus = 'Cutting';
        else if (nextProgress < 90) nextStatus = 'Stitching';
        else if (nextProgress < 100) nextStatus = 'QC';
        else nextStatus = 'Ready';
        return { ...item, progress: nextProgress, status: nextStatus };
      }
      return item;
    }));
  };

  const handleStartStitching = (orderId) => {
    setStitchingQueue(stitchingQueue.map(item => {
      if (item.id === orderId) {
        return { ...item, progress: 10, status: 'Cutting' };
      }
      return item;
    }));
  };

  // Add stock item
  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newStockName || !newStockQty) return;
    const newStock = {
      id: 'inv-' + Math.floor(Math.random() * 10000),
      category: newStockCategory,
      name: newStockName,
      quantity: parseInt(newStockQty),
      unit: newStockUnit,
      status: parseInt(newStockQty) < 50 ? 'Low Stock' : 'Good',
      icon: newStockCategory === 'Fabric Rolls' ? <Layers size={18} /> : newStockCategory === 'Thread Spools' ? <Database size={18} /> : <Sliders size={18} />
    };
    setInventoryStock([...inventoryStock, newStock]);
    setNewStockName('');
    setNewStockQty('');
    alert('Stock updated successfully!');
  };

  // Trigger material requests
  const handleRequestMaterial = (e) => {
    e.preventDefault();
    if (!newReqMaterialName || !newReqMaterialQty) return;
    const newReq = {
      id: 'REQ-MAT-' + Math.floor(Math.random() * 100),
      material: newReqMaterialName,
      qty: newReqMaterialQty,
      status: 'Pending Approval',
      date: '28 Jun 2026'
    };
    setMaterialRequests([newReq, ...materialRequests]);
    setNewReqMaterialName('');
    setNewReqMaterialQty('');
    alert('Request submitted to admin for purchase approval!');
  };

  // Add worker
  const handleAddWorker = (e) => {
    e.preventDefault();
    if (!newMemberName) return;
    const newMember = {
      id: 'tm-' + Math.floor(Math.random() * 100),
      name: newMemberName,
      role: newMemberRole,
      status: 'Active',
      tasks: 'None assigned'
    };
    setTeamMembers([...teamMembers, newMember]);
    setNewMemberName('');
    alert('Team member registered successfully!');
  };

  // Send message
  const handleSendMessage = () => {
    if (!typedMessage) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newMsg = { sender: 'tailor', text: typedMessage, time: timeStr };

    setActiveChatLogs({
      ...activeChatLogs,
      [chatSubTab]: [...activeChatLogs[chatSubTab], newMsg]
    });
    setTypedMessage('');
  };

  return (
    <div style={{
      background: theme === 'dark' ? '#0b0914' : '#f8fafc',
      color: theme === 'dark' ? '#f3f4f6' : '#0f172a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* 1. TOP HEADER BANNER NAVIGATION */}
      <header className="top-nav">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="logo" 
          style={{ cursor: 'pointer' }}
        >
          <Scissors size={24} style={{ color: 'var(--primary)', transform: 'rotate(-45deg)' }} />
          <span className="logo-text">StitchBee</span>
        </div>

        <div className="role-switcher">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'orders', label: 'Orders' },
            { id: 'measurements', label: 'Measurements' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'earnings', label: 'Earnings' },
            { id: 'chat', label: 'Chat Center' },
            { id: 'reviews', label: 'Reviews' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`role-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Side Quick Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '6px' }}
          >
            {theme === 'dark' ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: 'var(--primary)' }} />}
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileDropdown(false);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '6px', display: 'flex' }}
            >
              <Bell size={18} />
              {notificationsList.filter(n => n.unread).length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: '14px',
                  height: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {notificationsList.filter(n => n.unread).length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                width: '320px',
                background: theme === 'dark' ? '#141126' : '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                padding: '16px',
                zIndex: 1100
              }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Notifications 
                  <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setNotificationsList(notificationsList.map(n => ({...n, unread: false})))}>Mark all read</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
                  {notificationsList.map(notif => (
                    <div key={notif.id} style={{
                      padding: '8px',
                      borderRadius: '6px',
                      background: notif.unread ? (theme === 'dark' ? 'rgba(247,37,133,0.08)' : 'rgba(247,37,133,0.03)') : 'transparent',
                      fontSize: '0.75rem',
                      borderBottom: '1px solid var(--border-color)'
                    }}>
                      <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: notif.unread ? 'bold' : 'normal' }}>{notif.text}</p>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Online/Offline Toggle */}
          <button 
            onClick={() => setIsOnline(!isOnline)}
            style={{
              background: isOnline ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              border: `1px solid ${isOnline ? '#10b981' : '#ef4444'}`,
              color: isOnline ? '#10b981' : '#ef4444',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#10b981' : '#ef4444' }}></span>
            {isOnline ? 'Online' : 'Offline'}
          </button>

          {/* User profile dropdown */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifications(false);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                <img src="/bridal 5.jpg" alt="Tailor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Master Rajesh</span>
                <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 'bold' }}>TAILOR</span>
              </div>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <ul className="nav-dropdown-menu show" style={{ right: 0, top: '40px', width: '180px' }}>
                <li className="dropdown-item" onClick={() => { setActiveTab('profile'); setShowProfileDropdown(false); }}>
                  <User size={14} style={{ marginRight: '8px' }} /> Profile & Settings
                </li>
                <li className="dropdown-item" onClick={() => { setActiveTab('dashboard'); setShowProfileDropdown(false); }}>
                  <TrendingUp size={14} style={{ marginRight: '8px' }} /> Dashboard
                </li>
                <li className="dropdown-item" onClick={() => { if (onLogout) onLogout(); }} style={{ color: 'var(--danger)', borderTop: '1px solid var(--border-color)' }}>
                  <X size={14} style={{ marginRight: '8px' }} /> Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* 2. BODY CONTAINER FOR SELECTED TABS */}
      <main style={{ flex: 1, padding: '24px', width: '100%' }}>
        
        {/* SANDBOX CONTROLLER PILL */}
        <div style={{ 
          background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#ffffff', 
          padding: '12px 20px', 
          borderRadius: '12px', 
          marginBottom: '20px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '12px',
          alignItems: 'center',
          fontSize: '0.8rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Storefront:</span>
            <strong style={{ fontWeight: '800', marginLeft: '4px' }}>Vogue Craft Tailors</strong>
            <a href="#" style={{ color: 'var(--primary)', marginLeft: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 'bold' }} onClick={(e) => { e.preventDefault(); alert("Opening store public storefront view..."); }}>
              View Store <ArrowRight size={12} />
            </a>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
              <Database size={14} style={{ color: '#fbbf24' }} /> Credits Balance: <strong style={{ color: 'var(--text-primary)' }}>₹150</strong>
            </span>
            <strong style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
              ✓ VERIFIED PARTNER
            </strong>
          </div>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Welcome banner */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: theme === 'dark' ? 'rgba(247,37,133,0.04)' : 'rgba(247,37,133,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden' }}>
                <img src="/bridal 5.jpg" alt="Rajesh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Welcome back, Master Rajesh Kumar 👋</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Here's what is happening with your store today.</p>
              </div>
            </div>

            {/* Performance Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Today\'s Orders', value: '8', change: '↑ 2 from yesterday', color: '#f72585', bg: 'rgba(247,37,133,0.08)' },
                { label: 'In Progress', value: '14', change: 'View details →', color: '#7209b7', bg: 'rgba(114,9,183,0.08)', action: () => setActiveTab('orders') },
                { label: 'Completed Orders', value: '24', change: '↑ 12% this week', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
                { label: 'Today\'s Earnings', value: '₹4,500', change: '↑ 8% from yesterday', color: '#fbbf24', bg: 'rgba(245,158,11,0.08)' },
                { label: 'Store Rating', value: '4.8', change: '★★★★★ (120 reviews)', color: '#4cc9f0', bg: 'rgba(76,201,240,0.08)', action: () => setActiveTab('reviews') },
                { label: 'Pending Payments', value: '₹12,350', change: 'View details →', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', action: () => setActiveTab('earnings') }
              ].map((card, idx) => (
                <div 
                  key={idx} 
                  onClick={card.action}
                  style={{
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    cursor: card.action ? 'pointer' : 'default',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{card.label}</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: card.color }}>{card.value}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{card.change}</span>
                </div>
              ))}
            </div>

            {/* Active Queue & Schedule */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* Left Column: Active Stitching Queue */}
              <div className="glass-card-no-hover" style={{ padding: '20px', flex: '2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>Active Stitching Queue</h4>
                  <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>View All Orders →</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                        <th style={{ padding: '8px' }}>Customer</th>
                        <th style={{ padding: '8px' }}>Outfit & Fabric</th>
                        <th style={{ padding: '8px' }}>Delivery Date</th>
                        <th style={{ padding: '8px' }}>Progress</th>
                        <th style={{ padding: '8px' }}>Status</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stitchingQueue.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '10px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden' }}>
                              <img src={item.image} alt={item.customer} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold' }}>{item.customer}</div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>#{item.id}</span>
                            </div>
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <div>{item.outfit}</div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.fabric}</span>
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <div>{item.date}</div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 'bold' }}>{item.daysLeft}</span>
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{ flex: 1, height: '4px', width: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${item.progress}%`, background: item.progress === 100 ? '#10b981' : 'var(--primary)' }}></div>
                              </div>
                              <span>{item.progress}%</span>
                            </div>
                          </td>
                          <td style={{ padding: '10px 8px' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '0.7rem',
                              background: item.status === 'Ready' ? 'rgba(16,185,129,0.1)' : item.status === 'Pending' ? 'rgba(255,255,255,0.05)' : 'rgba(247,37,133,0.1)',
                              color: item.status === 'Ready' ? '#10b981' : item.status === 'Pending' ? 'var(--text-muted)' : 'var(--primary)'
                            }}>{item.status}</span>
                          </td>
                          <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                            {item.progress < 100 ? (
                              <button 
                                className="btn btn-primary" 
                                style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                                onClick={() => handleUpdateProgress(item.id, 15)}
                              >
                                Update
                              </button>
                            ) : (
                              <button 
                                className="btn btn-secondary" 
                                style={{ padding: '4px 8px', fontSize: '0.7rem', borderColor: '#10b981', color: '#10b981' }}
                                onClick={() => alert(`${item.customer}'s order marked ready for delivery Handover!`)}
                              >
                                Handover
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Today's Schedule Carousel */}
              <div className="glass-card-no-hover" style={{ padding: '20px', flex: '1', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>Today's Schedule</h4>
                  <button onClick={() => setActiveTab('calendar')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>View Calendar →</button>
                </div>

                {/* Day selector carousel */}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  {[
                    { d: 'Mon', num: 19 },
                    { d: 'Tue', num: 20, active: true },
                    { d: 'Wed', num: 21 },
                    { d: 'Thu', num: 22 },
                    { d: 'Fri', num: 23 },
                    { d: 'Sat', num: 24 },
                    { d: 'Sun', num: 25 }
                  ].map((day, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedDay(day.num)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: day.active ? 'var(--primary)' : 'transparent',
                        color: day.active ? '#fff' : 'var(--text-secondary)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      <span style={{ fontSize: '0.65rem', display: 'block' }}>{day.d}</span>
                      <strong style={{ fontSize: '0.85rem' }}>{day.num}</strong>
                    </div>
                  ))}
                </div>

                {/* Schedule list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {todaySchedule.map((sched, idx) => (
                    <div key={idx} style={{
                      padding: '12px',
                      borderRadius: '8px',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                      borderLeft: `4px solid ${sched.type === 'pickup' ? '#fbbf24' : sched.type === 'delivery' ? '#10b981' : '#4cc9f0'}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block' }}>{sched.title}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{sched.desc}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>{sched.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: New Bookings & Inventory Snapshot & Messages */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {/* New Booking Requests */}
              <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>New Booking Requests</h4>
                {bookingRequests.length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No pending requests.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {bookingRequests.map(req => (
                      <div key={req.id} style={{
                        padding: '12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'transparent'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          <span>{req.customer}</span>
                          <span style={{ color: 'var(--primary)' }}>{req.estPrice}</span>
                        </div>
                        <p style={{ margin: '4px 0', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Outfit: {req.outfit} • Fabric: {req.fabric}</p>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>📍 Distance: {req.distance} • {req.date}</span>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                          <button 
                            className="btn btn-primary" 
                            style={{ flex: 1, padding: '4px', fontSize: '0.7rem' }}
                            onClick={() => {
                              alert(`Booking request accepted! Added to active stitch queue.`);
                              setBookingRequests(bookingRequests.filter(b => b.id !== req.id));
                            }}
                          >
                            Accept
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{ flex: 1, padding: '4px', fontSize: '0.7rem' }}
                            onClick={() => setBookingRequests(bookingRequests.filter(b => b.id !== req.id))}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Inventory Snapshot */}
              <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>Inventory Snapshot</h4>
                  <button onClick={() => setActiveTab('inventory')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>View stock</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {inventoryStock.map(item => (
                    <div key={item.id} style={{
                      padding: '10px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      background: item.status === 'Low Stock' ? 'rgba(239,68,68,0.05)' : 'transparent'
                    }}>
                      <div style={{ color: item.status === 'Low Stock' ? '#ef4444' : 'var(--primary)', marginBottom: '4px', display: 'flex', justifyContent: 'center' }}>
                        {item.icon}
                      </div>
                      <strong style={{ fontSize: '0.85rem', display: 'block' }}>{item.quantity} {item.unit === 'meters' ? 'm' : ''}</strong>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{item.category}</span>
                      {item.status === 'Low Stock' && (
                        <span style={{ fontSize: '0.6rem', color: '#ef4444', display: 'block', fontWeight: 'bold', marginTop: '2px' }}>Low Stock</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Unread Chats Preview */}
              <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>Recent Messages</h4>
                  <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>Chat Center</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { name: 'Priya Sharma', text: 'When will my lehenga be ready?', time: '2m ago', avatar: '/bridal 5.jpg', count: 2 },
                    { name: 'Amit Verma', text: 'Thank you! I will share measurements.', time: '15m ago', avatar: '/men1.jpg', count: 1 },
                    { name: 'Admin Support', text: 'Payment of order #ORD-1023 received.', time: '45m ago', avatar: '/stany.4f315ea9.jpg' }
                  ].map((chat, idx) => (
                    <div key={idx} onClick={() => setActiveTab('chat')} style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src={chat.avatar} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          <span>{chat.name}</span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{chat.time}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '180px' }}>{chat.text}</p>
                      </div>
                      {chat.count && (
                        <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.6rem', fontWeight: 'bold', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {chat.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Goal Progress bar */}
            <div className="glass-card-no-hover" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Monthly Goal Progress</strong>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Complete 10 more orders this month to unlock Gold Partner Badge and extra commissions!</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>20 / 30 Orders</span>
                <div style={{ width: '150px', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '66%', height: '100%', background: 'var(--primary)' }}></div>
                </div>
                <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }} onClick={() => alert("Unlocking benefits: Free express fabric pickup & 5% higher payouts!")}>View Benefits</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === 'orders' && (() => {
          const allOrdersList = [
            { id: 'ORD-1024', customer: 'Priya Sharma', image: '/bridal 5.jpg', outfit: 'Bridal Lehenga', fabric: 'Net Fabric', date: '22 May 2026', daysLeft: '3 days left', progress: 65, status: 'In Progress', amount: '₹8,500' },
            { id: 'ORD-1023', customer: 'Amit Verma', image: '/men1.jpg', outfit: 'Sherwani', fabric: 'Silk Fabric', date: '25 May 2026', daysLeft: '6 days left', progress: 30, status: 'Stitching', amount: '₹12,350' },
            { id: 'ORD-1022', customer: 'Megha Reddy', image: '/bridal2.jpg', outfit: 'Anarkali Suit', fabric: 'Georgette', date: '28 May 2026', daysLeft: '9 days left', progress: 10, status: 'Cutting', amount: '₹6,750' },
            { id: 'ORD-1021', customer: 'Rahul Nair', image: '/men2.jpg', outfit: 'Formal Shirt', fabric: 'Cotton', date: '29 May 2026', daysLeft: '10 days left', progress: 0, status: 'Pending', amount: '₹2,150' },
            { id: 'ORD-1019', customer: 'Neha Singh', image: '/bridal 5.jpg', outfit: 'Saree Blouse', fabric: 'Silk', date: '31 May 2026', daysLeft: '12 days left', progress: 50, status: 'In Progress', amount: '₹1,850' },
            { id: 'ORD-1018', customer: 'Karan Johar', image: '/men2.jpg', outfit: 'Bandhgala Suit', fabric: 'Velvet', date: '15 May 2026', daysLeft: 'Completed', progress: 100, status: 'Completed', amount: '₹15,000' },
            { id: 'ORD-1017', customer: 'Sita Ram', image: '/bridal2.jpg', outfit: 'Salwar Kameez', fabric: 'Cotton silk', date: '10 May 2026', daysLeft: 'Completed', progress: 100, status: 'Completed', amount: '₹3,200' },
            { id: 'ORD-1016', customer: 'Vijay Devar', image: '/men1.jpg', outfit: 'Kurta Pyjama', fabric: 'Linen', date: '05 May 2026', daysLeft: 'Cancelled', progress: 0, status: 'Cancelled', amount: '₹2,500' }
          ];

          const filteredOrders = allOrdersList.filter(order => {
            if (ordersSubTab === 'new') return order.status === 'Pending';
            if (ordersSubTab === 'active') return ['In Progress', 'Stitching', 'Cutting'].includes(order.status);
            if (ordersSubTab === 'completed') return order.status === 'Completed';
            if (ordersSubTab === 'cancelled') return order.status === 'Cancelled';
            return true;
          });

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Page Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>Orders</h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Manage and track all stitching orders</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', width: '260px' }}>
                    <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      placeholder="Search by order ID, customer or outfit..." 
                      className="form-input" 
                      style={{ paddingLeft: '34px', width: '100%', height: '38px', borderRadius: '8px' }}
                    />
                  </div>
                  <button style={{
                    background: theme === 'dark' ? '#1c1830' : '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}>
                    <Sliders size={16} />
                  </button>
                  <button className="btn btn-primary" style={{ height: '38px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', fontWeight: 'bold' }} onClick={() => alert("Creating new customer request...")}>
                    <Plus size={16} /> New Request
                  </button>
                </div>
              </div>

              {/* Category / Status Tabs */}
              <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {[
                  { id: 'new', label: 'New Requests', count: 4 },
                  { id: 'active', label: 'Active Stitching', count: 12 },
                  { id: 'completed', label: 'Completed', count: 48 },
                  { id: 'cancelled', label: 'Cancelled', count: 3 }
                ].map(sub => {
                  const isActive = ordersSubTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setOrdersSubTab(sub.id)}
                      className={`filter-capsule ${isActive ? 'active' : ''}`}
                    >
                      {sub.label}
                      <span className="filter-count">{sub.count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Split Workspace */}
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '24px' }}>
                
                {/* Left Column: Active Orders Table & Cards */}
                <div style={{ flex: '2', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Analytics Cards row (Aligned inside left column) */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {[
                      { label: 'Active Orders', value: '12', change: '↑ 2 from yesterday', color: '#f72585', bg: 'rgba(247,37,133,0.08)', icon: <ShoppingBag size={20} /> },
                      { label: 'In Progress', value: '8', change: '↑ 3 from yesterday', color: '#7209b7', bg: 'rgba(114,9,183,0.08)', icon: <Scissors size={20} /> },
                      { label: 'Cutting / Stitching', value: '4', change: '↓ 1 from yesterday', color: '#fbbf24', bg: 'rgba(245,158,11,0.08)', icon: <Scissors size={20} /> },
                      { label: 'Ready for Delivery', value: '0', change: '- No change', color: '#4cc9f0', bg: 'rgba(76,201,240,0.08)', icon: <ShoppingBag size={20} /> }
                    ].map((card, idx) => (
                      <div 
                        key={idx} 
                        style={{
                          background: theme === 'dark' ? '#141126' : '#ffffff',
                          border: '1px solid var(--border-color)',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          display: 'flex',
                          gap: '16px',
                          alignItems: 'center',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                        }}
                      >
                        <div style={{ padding: '10px', borderRadius: '8px', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {card.icon}
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', fontWeight: '600' }}>{card.label}</span>
                          <strong style={{ fontSize: '1.4rem', fontWeight: '800', color: theme === 'dark' ? '#fff' : '#0f172a' }}>{card.value}</strong>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>{card.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Table Box */}
                  <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', flex: '1' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>
                      {ordersSubTab === 'new' ? 'New Booking Requests' : ordersSubTab === 'completed' ? 'Completed Orders' : ordersSubTab === 'cancelled' ? 'Cancelled Orders' : 'Active Orders'} ({filteredOrders.length})
                    </h3>
                    
                    {/* Table */}
                    <div style={{ overflowX: 'auto', flex: '1' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                            <th style={{ padding: '12px 10px' }}>Customer</th>
                            <th style={{ padding: '12px 10px' }}>Outfit & Fabric</th>
                            <th style={{ padding: '12px 10px' }}>Delivery Date</th>
                            <th style={{ padding: '12px 10px' }}>Progress</th>
                            <th style={{ padding: '12px 10px' }}>Status</th>
                            <th style={{ padding: '12px 10px' }}>Amount</th>
                            <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.length === 0 ? (
                            <tr>
                              <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                No orders found in this status category.
                              </td>
                            </tr>
                          ) : (
                            filteredOrders.map(row => (
                              <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '12px 10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden' }}>
                                    <img src={row.image} alt={row.customer} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  </div>
                                  <div>
                                    <strong style={{ display: 'block', color: theme === 'dark' ? '#fff' : '#0f172a' }}>{row.customer}</strong>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>#{row.id}</span>
                                  </div>
                                </td>
                                <td style={{ padding: '12px 10px' }}>
                                  <div style={{ fontWeight: '500' }}>{row.outfit}</div>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{row.fabric}</span>
                                </td>
                                <td style={{ padding: '12px 10px' }}>
                                  <div>{row.date}</div>
                                  <span style={{ fontSize: '0.7rem', color: row.daysLeft.includes('Completed') ? '#10b981' : 'var(--danger)', fontWeight: 'bold' }}>{row.daysLeft}</span>
                                </td>
                                <td style={{ padding: '12px 10px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ flex: 1, height: '4px', width: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                                      <div style={{ height: '100%', width: `${row.progress}%`, background: row.progress === 100 ? '#10b981' : 'var(--primary)' }}></div>
                                    </div>
                                    <span>{row.progress}%</span>
                                  </div>
                                </td>
                                <td style={{ padding: '12px 10px' }}>
                                  <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '0.7rem',
                                    background: row.status === 'In Progress' || row.status === 'Completed' ? 'rgba(16,185,129,0.1)' : row.status === 'Stitching' ? 'rgba(245,158,11,0.1)' : row.status === 'Cutting' ? 'rgba(76,201,240,0.1)' : 'rgba(255,255,255,0.05)',
                                    color: row.status === 'In Progress' || row.status === 'Completed' ? '#10b981' : row.status === 'Stitching' ? '#f59e0b' : row.status === 'Cutting' ? '#4cc9f0' : 'var(--text-secondary)'
                                  }}>{row.status}</span>
                                </td>
                                <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{row.amount}</td>
                                <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <button className="btn btn-secondary" style={{ padding: '6px', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setActiveTab('chat')}>
                                      <MessageSquare size={12} />
                                    </button>
                                    <button className="btn btn-secondary" style={{ padding: '6px', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => handleUpdateProgress(row.id, 10)}>
                                      <Edit size={12} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '10px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Showing 1 to {filteredOrders.length} of {filteredOrders.length} orders</span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>‹</button>
                        <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.75rem', background: 'var(--primary)', color: '#fff', border: 'none' }}>1</button>
                        <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>2</button>
                        <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>3</button>
                        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>›</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Widgets */}
                <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Donut chart (Order Summary) */}
                  <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>Order Summary</h4>
                      <select className="form-select" style={{ width: '110px', padding: '4px', fontSize: '0.75rem' }}>
                        <option>This Week</option>
                        <option>This Month</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', background: 'conic-gradient(#10b981 0% 67%, #fbbf24 67% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: theme === 'dark' ? '#141126' : '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <strong style={{ fontSize: '1.25rem', fontWeight: '800' }}>12</strong>
                          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Total</span>
                        </div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> In Progress</span>
                          <strong>8 (67%)</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }}></span> Stitching</span>
                          <strong>4 (33%)</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4cc9f0' }}></span> Ready</span>
                          <strong>0 (0%)</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Deliveries */}
                  <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>Upcoming Deliveries</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveTab('calendar')}>View Calendar →</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { date: '22 May 2026', label: 'Priya Sharma - Bridal Lehenga', days: '3 days left', color: 'var(--primary)' },
                        { date: '25 May 2026', label: 'Amit Verma - Sherwani', days: '6 days left', color: '#fbbf24' },
                        { date: '28 May 2026', label: 'Megha Reddy - Anarkali Suit', days: '9 days left', color: '#4cc9f0' }
                      ].map((deliv, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.75rem' }}>
                          <div style={{ padding: '8px', borderRadius: '8px', background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', color: deliv.color }}>
                            <Calendar size={16} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <strong style={{ display: 'block' }}>{deliv.date}</strong>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{deliv.label}</span>
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 'bold' }}>{deliv.days}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800' }}>Quick Actions</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {[
                        { label: 'New Request', icon: <Plus size={16} />, color: 'var(--primary)', bg: 'rgba(247,37,133,0.08)' },
                        { label: 'Upload Design', icon: <Upload size={16} />, color: '#7209b7', bg: 'rgba(114,9,183,0.08)' },
                        { label: 'Measurement', icon: <Ruler size={16} />, color: '#fbbf24', bg: 'rgba(245,158,11,0.08)' },
                        { label: 'Message Client', icon: <MessageSquare size={16} />, color: '#4cc9f0', bg: 'rgba(76,201,240,0.08)' }
                      ].map((act, idx) => (
                        <button 
                          key={idx}
                          onClick={() => alert(`Executing: ${act.label}...`)}
                          style={{
                            background: theme === 'dark' ? '#1c1830' : '#f8fafc',
                            border: '1px solid var(--border-color)',
                            borderRadius: '10px',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = act.color}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                        >
                          <span style={{ color: act.color, display: 'flex', padding: '6px', borderRadius: '50%', background: act.bg }}>{act.icon}</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

        {/* TAB 3: MEASUREMENTS */}
        {activeTab === 'measurements' && (() => {
          // Dynamic Active Customer lookup
          const activeCust = customersList.find(c => c.id === selectedCustomerId) || customersList[0];

          // Filter lists based on search
          const filteredCustomers = customersList.filter(c => 
            c.name.toLowerCase().includes(measurementSearch.toLowerCase()) ||
            c.id.toLowerCase().includes(measurementSearch.toLowerCase()) ||
            c.cat.toLowerCase().includes(measurementSearch.toLowerCase())
          );

          // Update active customer values in state
          const handleValueChange = (field, rawVal) => {
            const num = parseFloat(rawVal) || 0;
            // If in CM, convert back to inches for base storage
            const inchVal = measurementUnit === 'cm' ? (num / 2.54) : num;
            
            setCustomersList(customersList.map(c => {
              if (c.id === activeCust.id) {
                return { ...c, [field]: parseFloat(inchVal.toFixed(2)) };
              }
              return c;
            }));
          };

          // Render value according to unit
          const formatValue = (inches) => {
            if (measurementUnit === 'cm') {
              return (inches * 2.54).toFixed(1);
            }
            return inches.toString();
          };

          // Hotspot pulsing dots configurations
          const hotspots = {
            chest: { top: '28%', left: '49%' },
            waist: { top: '39%', left: '49%' },
            hip: { top: '48%', left: '49%' },
            shoulder: { top: '20%', left: '33%' },
            sleeve: { top: '36%', left: '26%' },
            upperArm: { top: '30%', left: '27%' },
            neck: { top: '13%', left: '49%' },
            fullLength: { top: '60%', left: '49%' }
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* HEADER THEME GRADIENT BANNER */}
              <div style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, #1f1a3a 0%, #0f0c1b 100%)' 
                  : 'linear-gradient(135deg, rgba(247,37,133,0.06) 0%, rgba(114,9,183,0.06) 100%)',
                padding: '24px',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '24px',
                color: theme === 'dark' ? '#ffffff' : 'var(--text-primary)',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(247,37,133,0.12)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(247,37,133,0.1)', 
                    padding: '12px', 
                    borderRadius: '50%', 
                    color: 'var(--primary)' 
                  }}>
                    <Ruler size={30} />
                  </div>
                  <div>
                    <h2 style={{ 
                      margin: 0, 
                      fontSize: '1.8rem', 
                      fontWeight: '800', 
                      color: theme === 'dark' ? '#fff' : 'var(--text-primary)' 
                    }}>Measurements</h2>
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      fontSize: '0.85rem', 
                      color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' 
                    }}>Manage all customer body measurements</p>
                  </div>
                </div>

                {/* Stat cards in header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '12px',
                  width: '100%',
                  maxWidth: '740px'
                }}>
                  {[
                    { label: 'Total Customers', val: '128', footer: '↑ 8 this month', icon: <Users size={16} /> },
                    { label: 'Total Measurements', val: '236', footer: '↑ 12 this month', icon: <FileText size={16} /> },
                    { label: 'AI Scan Measurements', val: '98', footer: '42% of total', icon: <Sparkles size={16} /> },
                    { label: 'Manual Measurements', val: '138', footer: '58% of total', icon: <Ruler size={16} /> }
                  ].map((card, idx) => (
                    <div key={idx} style={{
                      background: theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.8)',
                      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      boxShadow: theme === 'dark' ? 'none' : '0 2px 4px rgba(0,0,0,0.02)'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        fontSize: '0.7rem', 
                        color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)' 
                      }}>
                        <span>{card.label}</span>
                        <span style={{ color: 'var(--primary)' }}>{card.icon}</span>
                      </div>
                      <strong style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '800', 
                        color: theme === 'dark' ? '#fff' : 'var(--text-primary)' 
                      }}>{card.val}</strong>
                      <span style={{ 
                        fontSize: '0.65rem', 
                        color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : 'var(--text-muted)' 
                      }}>{card.footer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* THREE-COLUMN DYNAMIC INTERACTIVE ROW */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch' }}>
                
                {/* 1. LEFT SIDEBAR: CUSTOMERS */}
                <div style={{ 
                  flex: '1', 
                  minWidth: '260px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px',
                  padding: '20px'
                }} className="glass-card-no-hover measurements-sidebar">
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', display: 'block', letterSpacing: '0.05em' }}>CUSTOMERS</span>
                  
                  {/* Search and filter */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        placeholder="Search customer..." 
                        className="form-input" 
                        value={measurementSearch}
                        onChange={(e) => setMeasurementSearch(e.target.value)}
                        style={{ paddingLeft: '32px', width: '100%', height: '36px', fontSize: '0.8rem' }}
                      />
                    </div>
                    <button style={{
                      background: theme === 'dark' ? '#1c1830' : '#ffffff',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}>
                      <Sliders size={14} />
                    </button>
                  </div>

                  {/* Customer Scroll List */}
                  <div className="customer-scroll-list" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px', 
                    overflowY: 'auto', 
                    flex: 1, 
                    paddingRight: '4px' 
                  }}>
                    {filteredCustomers.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>No customers found</div>
                    ) : (
                      filteredCustomers.map(cust => {
                        const isSelected = selectedCustomerId === cust.id;
                        return (
                          <div 
                            key={cust.id}
                            onClick={() => setSelectedCustomerId(cust.id)}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '10px',
                              border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                              background: isSelected ? (theme === 'dark' ? 'rgba(247,37,133,0.08)' : 'rgba(247,37,133,0.03)') : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden' }}>
                                <img src={cust.image} alt={cust.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div>
                                <strong style={{ display: 'block', fontSize: '0.85rem', color: theme === 'dark' ? '#fff' : '#0f172a' }}>{cust.name}</strong>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{cust.id}</span>
                              </div>
                            </div>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '0.65rem',
                              fontWeight: '700',
                              background: cust.cat === 'Women' ? 'rgba(247,37,133,0.1)' : 'rgba(76,201,240,0.1)',
                              color: cust.cat === 'Women' ? 'var(--primary)' : 'var(--accent)'
                            }}>{cust.cat}</span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Add Customer button */}
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => alert("Launching Add New Customer wizard...")}
                    style={{
                      width: '100%',
                      borderColor: 'var(--primary)',
                      color: 'var(--primary)',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: theme === 'dark' ? 'rgba(247,37,133,0.08)' : 'rgba(247,37,133,0.04)',
                      transition: 'all 0.2s ease',
                      marginTop: 'auto'
                    }}
                  >
                    <Plus size={14} /> Add New Customer
                  </button>
                </div>

                {/* 2. CENTER PANEL: ACTIVE CUSTOMER DETAIL */}
                <div style={{ 
                  flex: '3', 
                  minWidth: '320px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '20px',
                  padding: '24px'
                }} className="glass-card-no-hover measurements-main-panel">
                  
                  {/* Active Customer Summary Banner */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                        <img src={activeCust.image} alt={activeCust.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>{activeCust.name}</h4>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.65rem',
                            fontWeight: 'bold',
                            background: activeCust.cat === 'Women' ? 'rgba(247,37,133,0.1)' : 'rgba(76,201,240,0.1)',
                            color: activeCust.cat === 'Women' ? 'var(--primary)' : 'var(--accent)'
                          }}>{activeCust.cat}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          📞 {activeCust.phone} &nbsp;•&nbsp; ✉ {activeCust.email}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)', alignItems: 'center' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>Profile ID</span>
                        <strong>{activeCust.id}</strong>
                      </div>
                      <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '16px' }}>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>Last Updated</span>
                        <strong>{activeCust.updated}</strong>
                      </div>
                      <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', height: '30px' }} onClick={() => alert("Edit customer details...")}>
                        <Edit size={12} style={{ marginRight: '4px' }} /> Edit Info
                      </button>
                    </div>
                  </div>

                  {/* Inner sub-tabs switcher */}
                  <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                    {[
                      { id: 'body', label: 'Body Measurements', icon: <Ruler size={14} /> },
                      { id: 'chart', label: 'Measurement Chart', icon: <FileText size={14} /> },
                      { id: '3d', label: '3D View (Coming Soon)', icon: <Eye size={14} /> }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          if (tab.id !== '3d') setMeasurementsSubTab(tab.id);
                          else alert("3D Mannequin fitting telemetry coming in StitchBee 2.0!");
                        }}
                        className={`role-btn ${measurementsSubTab === tab.id ? 'active' : ''}`}
                        style={{
                          opacity: tab.id === '3d' ? 0.5 : 1,
                          cursor: tab.id === '3d' ? 'not-allowed' : 'pointer',
                          fontSize: '0.75rem',
                          padding: '6px 12px'
                        }}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Body Measurements tab panel */}
                  {measurementsSubTab === 'body' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, minHeight: 0 }}>
                      
                      {/* Unit switcher row */}
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ 
                          display: 'flex', 
                          background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', 
                          borderRadius: '8px', 
                          padding: '3px' 
                        }}>
                          <button
                            onClick={() => setMeasurementUnit('inch')}
                            style={{
                              background: measurementUnit === 'inch' ? (theme === 'dark' ? '#1c1830' : '#ffffff') : 'transparent',
                              border: 'none',
                              color: measurementUnit === 'inch' ? 'var(--primary)' : 'var(--text-secondary)',
                              fontWeight: 'bold',
                              fontSize: '0.75rem',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              boxShadow: measurementUnit === 'inch' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                            }}
                          >
                            Inches
                          </button>
                          <button
                            onClick={() => setMeasurementUnit('cm')}
                            style={{
                              background: measurementUnit === 'cm' ? (theme === 'dark' ? '#1c1830' : '#ffffff') : 'transparent',
                              border: 'none',
                              color: measurementUnit === 'cm' ? 'var(--primary)' : 'var(--text-secondary)',
                              fontWeight: 'bold',
                              fontSize: '0.75rem',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              boxShadow: measurementUnit === 'cm' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                            }}
                          >
                            CM
                          </button>
                        </div>
                      </div>

                      {/* Split visual & table workspace */}
                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', flex: 1, minHeight: 0 }}>
                        
                        {/* Mannequin visual (left) */}
                        <div style={{ flex: '1.2', minWidth: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            position: 'relative', 
                            width: '100%',
                            maxWidth: '280px', 
                            background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            overflow: 'hidden',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                            {/* Dynamically resolve male vs female mannequin from copy targets */}
                            <img 
                              src={activeCust.cat === 'Men' ? '/mannequin_male.png' : '/mannequin_female.png'} 
                              alt="Mannequin Guide" 
                              style={{ width: '100%', height: 'auto', maxHeight: '340px', display: 'block', objectFit: 'contain' }} 
                            />
                            
                            {/* Hotspot indicator overlay */}
                            {hoveredMeasurementRow && hotspots[hoveredMeasurementRow] && (
                              <div 
                                className="hotspot-dot active" 
                                style={{ 
                                  top: hotspots[hoveredMeasurementRow].top, 
                                  left: hotspots[hoveredMeasurementRow].left 
                                }} 
                              />
                            )}
                          </div>
                          <span 
                            style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                            onClick={() => alert("Interactive measurement hotspots overlay automatically highlights points during hover.")}
                          >
                            <Info size={12} /> View Measurement Guide
                          </span>
                        </div>

                        {/* Key measurements table (right) */}
                        <div style={{ flex: '2', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', display: 'block' }}>Key Measurements</span>
                          
                          <div style={{ overflowX: 'auto', flex: 1 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                              <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                                  <th style={{ padding: '8px 4px' }}>Measurement</th>
                                  <th style={{ padding: '8px 4px', textAlign: 'center' }}>Size</th>
                                  <th style={{ padding: '8px 4px' }}>Notes</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { id: 1, key: 'chest', label: 'Chest', val: activeCust.chest, note: '—' },
                                  { id: 2, key: 'waist', label: 'Waist', val: activeCust.waist, note: 'Natural Waist' },
                                  { id: 3, key: 'hip', label: 'Hip', val: activeCust.hip, note: 'Fullest Part' },
                                  { id: 4, key: 'shoulder', label: 'Shoulder', val: activeCust.shoulder, note: '—' },
                                  { id: 5, key: 'sleeve', label: 'Sleeve Length', val: activeCust.sleeve, note: 'From Shoulder' },
                                  { id: 6, key: 'upperArm', label: 'Upper Arm', val: activeCust.upperArm, note: '—' },
                                  { id: 7, key: 'neck', label: 'Neck', val: activeCust.neck, note: '—' },
                                  { id: 8, key: 'fullLength', label: 'Full Length', val: activeCust.fullLength, note: 'From Shoulder' }
                                ].map(row => (
                                  <tr 
                                    key={row.key} 
                                    onMouseEnter={() => setHoveredMeasurementRow(row.key)}
                                    onMouseLeave={() => setHoveredMeasurementRow(null)}
                                    style={{ 
                                      borderBottom: '1px solid var(--border-color)',
                                      background: hoveredMeasurementRow === row.key ? (theme === 'dark' ? 'rgba(247,37,133,0.06)' : 'rgba(247,37,133,0.03)') : 'transparent',
                                      transition: 'background 0.2s'
                                    }}
                                  >
                                    <td style={{ padding: '8px 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        border: hoveredMeasurementRow === row.key ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.65rem',
                                        fontWeight: 'bold',
                                        color: hoveredMeasurementRow === row.key ? 'var(--primary)' : 'var(--text-muted)',
                                        background: hoveredMeasurementRow === row.key ? 'rgba(247,37,133,0.1)' : 'transparent',
                                        transition: 'all 0.2s'
                                      }}>{row.id}</span>
                                      <span style={{ 
                                        fontWeight: '600',
                                        color: hoveredMeasurementRow === row.key ? 'var(--primary)' : 'var(--text-primary)',
                                        transition: 'color 0.2s'
                                      }}>{row.label}</span>
                                    </td>
                                    <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                                        <input 
                                          type="number"
                                          step="0.1"
                                          value={formatValue(row.val)}
                                          onChange={(e) => handleValueChange(row.key, e.target.value)}
                                          style={{
                                            border: 'none',
                                            borderBottom: '1px dashed var(--border-color)',
                                            background: 'transparent',
                                            color: hoveredMeasurementRow === row.key ? 'var(--primary)' : (theme === 'dark' ? '#fff' : '#0f172a'),
                                            textAlign: 'center',
                                            width: '50px',
                                            fontWeight: '800',
                                            fontSize: '0.8rem',
                                            outline: 'none',
                                            transition: 'color 0.2s ease'
                                          }}
                                        />
                                        <span style={{ fontSize: '0.75rem', color: hoveredMeasurementRow === row.key ? 'var(--primary)' : 'var(--text-muted)' }}>
                                          {measurementUnit === 'inch' ? '"' : ' cm'}
                                        </span>
                                      </div>
                                    </td>
                                    <td style={{ padding: '8px 4px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{row.note}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Footer Action buttons (Moved outside split container) */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        flexWrap: 'wrap', 
                        gap: '12px', 
                        marginTop: 'auto',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-color)'
                      }}>
                        <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', padding: '8px 16px' }} onClick={() => alert("Generating size PDF sheet...")}>
                          <Upload size={14} /> Download PDF
                        </button>
                        <button className="btn btn-primary" style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '8px 24px' }} onClick={() => {
                          alert(`Sizes for ${activeCust.name} updated successfully!`);
                        }}>
                          Update Measurements
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Measurement Chart Sub-tab */}
                  {measurementsSubTab === 'chart' && (
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
                      <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', display: 'block' }}>Size Scaling Analysis</span>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                        <TrendingUp size={36} style={{ color: 'var(--primary)', marginBottom: '10px' }} />
                        <h5 style={{ margin: '0 0 6px 0', fontSize: '0.9rem', fontWeight: 'bold' }}>Historical Size Deviation Tracker</h5>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mannequin scan telemetry indicates fit parameters have stayed 98% consistent since first capture.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. RIGHT SIDEBAR: NOTES, HISTORY & QUICK STATS (Unified unified card container) */}
                <div className="glass-card-no-hover measurements-sidebar" style={{ 
                  flex: '1', 
                  minWidth: '260px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '20px',
                  gap: '16px'
                }}>
                  
                  {/* Measurement Notes box */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 auto', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                      <FileText size={16} style={{ color: 'var(--primary)' }} />
                      <span>Measurement Notes</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', overflowY: 'auto', maxHeight: '70px', paddingRight: '4px' }}>
                      {activeCust.notes}
                    </p>
                    <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', height: '28px', padding: '4px 8px', marginTop: 'auto' }} onClick={() => {
                      const note = prompt("Enter customer notes:", activeCust.notes);
                      if (note !== null) {
                        setCustomersList(customersList.map(c => {
                          if (c.id === activeCust.id) return { ...c, notes: note };
                          return c;
                        }));
                      }
                    }}>
                      Edit Notes
                    </button>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }} />

                  {/* Measurement History box */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 auto' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                      <Clock size={16} style={{ color: 'var(--primary)' }} />
                      <span>Measurement History</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '4px 0', overflowY: 'auto', maxHeight: '75px', paddingRight: '4px' }}>
                      {activeCust.history.map((hist, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
                          <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{hist.date}</span>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.65rem',
                            fontWeight: 'bold',
                            background: hist.source === 'AI Scan' ? 'rgba(247,37,133,0.1)' : hist.source === 'Manual' ? 'rgba(76,201,240,0.1)' : 'rgba(245,158,11,0.1)',
                            color: hist.source === 'AI Scan' ? 'var(--primary)' : hist.source === 'Manual' ? 'var(--accent)' : '#f59e0b'
                          }}>{hist.source}</span>
                        </div>
                      ))}
                    </div>

                    <button className="btn btn-secondary" style={{ width: '100%', fontSize: '0.75rem', height: '28px', padding: '4px 8px', marginTop: 'auto' }} onClick={() => alert("Showing history logs...")}>
                      View All History
                    </button>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }} />

                  {/* Quick Stats box */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 auto' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                      <Activity size={16} style={{ color: 'var(--primary)' }} />
                      <span>Quick Stats</span>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', textAlign: 'center' }}>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>Total Scans</span>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{activeCust.history.length}</strong>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>Avg Updates</span>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>2.1/cust</strong>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>AI Scan</span>
                        <strong style={{ fontSize: '0.9rem', color: '#10b981' }}>
                          {activeCust.history.filter(h => h.source === 'AI Scan').length}
                        </strong>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>Manual</span>
                        <strong style={{ fontSize: '0.9rem', color: '#f59e0b' }}>
                          {activeCust.history.filter(h => h.source === 'Manual').length}
                        </strong>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* RECENT MEASUREMENTS FOOTER SECTION */}
              <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Recent Measurements</h4>
                  <button className="btn btn-ghost" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }} onClick={() => alert("Viewing all customer registry...")}>
                    View all <ArrowRight size={14} />
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                        <th style={{ padding: '12px 10px' }}>Customer</th>
                        <th style={{ padding: '12px 10px' }}>Category</th>
                        <th style={{ padding: '12px 10px' }}>Source</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center' }}>Chest</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center' }}>Waist</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center' }}>Hip</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center' }}>Length</th>
                        <th style={{ padding: '12px 10px' }}>Last Updated</th>
                        <th style={{ padding: '12px 10px', textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((cust, idx) => (
                        <tr key={cust.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '12px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden' }}>
                              <img src={cust.image} alt={cust.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                              <strong style={{ display: 'block', color: theme === 'dark' ? '#fff' : '#0f172a' }}>{cust.name}</strong>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{cust.id}</span>
                            </div>
                          </td>
                          <td style={{ padding: '12px 10px' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '0.65rem',
                              fontWeight: '700',
                              background: cust.cat === 'Women' ? 'rgba(247,37,133,0.1)' : 'rgba(76,201,240,0.1)',
                              color: cust.cat === 'Women' ? 'var(--primary)' : 'var(--accent)'
                            }}>{cust.cat}</span>
                          </td>
                          <td style={{ padding: '12px 10px' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              background: cust.source === 'AI Scan' ? 'rgba(247,37,133,0.1)' : cust.source === 'Manual' ? 'rgba(76,201,240,0.1)' : 'rgba(245,158,11,0.1)',
                              color: cust.source === 'AI Scan' ? 'var(--primary)' : cust.source === 'Manual' ? 'var(--accent)' : '#f59e0b'
                            }}>{cust.source}</span>
                          </td>
                          <td style={{ padding: '12px 10px', textAlign: 'center', fontWeight: '500' }}>{formatValue(cust.chest)}{measurementUnit === 'inch' ? '"' : ' cm'}</td>
                          <td style={{ padding: '12px 10px', textAlign: 'center', fontWeight: '500' }}>{formatValue(cust.waist)}{measurementUnit === 'inch' ? '"' : ' cm'}</td>
                          <td style={{ padding: '12px 10px', textAlign: 'center', fontWeight: '500' }}>{formatValue(cust.hip)}{measurementUnit === 'inch' ? '"' : ' cm'}</td>
                          <td style={{ padding: '12px 10px', textAlign: 'center', fontWeight: '500' }}>{formatValue(cust.fullLength)}{measurementUnit === 'inch' ? '"' : ' cm'}</td>
                          <td style={{ padding: '12px 10px' }}>{cust.updated}</td>
                          <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button className="btn btn-secondary" style={{ padding: '6px', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {
                                setSelectedCustomerId(cust.id);
                                setMeasurementsSubTab('body');
                                alert(`Loaded sizes for ${cust.name}`);
                              }}>
                                <Eye size={12} />
                              </button>
                              <button className="btn btn-secondary" style={{ padding: '6px', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {
                                setSelectedCustomerId(cust.id);
                                setMeasurementsSubTab('body');
                              }}>
                                <Edit size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          );
        })()}

        {/* TAB 4: INVENTORY */}
        {activeTab === 'inventory' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Inventory Stock Manager</h3>
              <button className="btn btn-primary" onClick={() => setActiveTab('material-requests')}>Request Material from Admin</button>
            </div>

            {/* Inventory cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {inventoryStock.map(stock => (
                <div key={stock.id} className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--primary)' }}>{stock.icon}</span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      background: stock.status === 'Low Stock' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                      color: stock.status === 'Low Stock' ? '#ef4444' : '#10b981'
                    }}>{stock.status}</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.2rem', display: 'block', color: 'var(--text-primary)' }}>{stock.quantity} {stock.unit}</strong>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{stock.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>Category: {stock.category}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button className="btn btn-secondary" style={{ flex: 1, padding: '4px', fontSize: '0.7rem' }} onClick={() => {
                      setInventoryStock(inventoryStock.map(i => i.id === stock.id ? {...i, quantity: i.quantity + 20, status: 'Good'} : i));
                    }}>+ 20</button>
                    <button className="btn btn-secondary" style={{ flex: 1, padding: '4px', fontSize: '0.7rem' }} onClick={() => {
                      setInventoryStock(inventoryStock.map(i => i.id === stock.id ? {...i, quantity: Math.max(0, i.quantity - 10), status: i.quantity - 10 < 50 ? 'Low Stock' : 'Good'} : i));
                    }}>- 10</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Stock Form */}
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', fontWeight: '800' }}>Add Stock Entry</h4>
              <form onSubmit={handleAddStock} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', alignItems: 'end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Category</label>
                  <select className="form-select" value={newStockCategory} onChange={e => setNewStockCategory(e.target.value)}>
                    <option value="Fabric Rolls">Fabric Rolls</option>
                    <option value="Thread Spools">Thread Spools</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Material Name</label>
                  <input type="text" className="form-input" placeholder="e.g. Red Silk Velvet" value={newStockName} onChange={e => setNewStockName(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Quantity</label>
                  <input type="number" className="form-input" placeholder="e.g. 50" value={newStockQty} onChange={e => setNewStockQty(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Entry</button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: CALENDAR */}
        {activeTab === 'calendar' && (() => {
          const activeYear = calendarDate.getFullYear();
          const activeMonth = calendarDate.getMonth();
          const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
          const firstDayIndex = new Date(activeYear, activeMonth, 1).getDay();
          const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Align Mon-Sun

          // Generate cells array
          const cells = [];
          
          // Previous month padding cells
          const prevMonthDate = new Date(activeYear, activeMonth, 0);
          const prevMonthDays = prevMonthDate.getDate();
          for (let i = startOffset - 1; i >= 0; i--) {
            const d = prevMonthDays - i;
            cells.push({
              day: d,
              date: new Date(activeYear, activeMonth - 1, d),
              isCurrentMonth: false
            });
          }
          
          // Current month cells
          for (let d = 1; d <= daysInMonth; d++) {
            cells.push({
              day: d,
              date: new Date(activeYear, activeMonth, d),
              isCurrentMonth: true
            });
          }
          
          // Next month padding cells
          const totalGridCells = Math.ceil(cells.length / 7) * 7;
          const nextMonthDaysNeeded = totalGridCells - cells.length;
          for (let d = 1; d <= nextMonthDaysNeeded; d++) {
            cells.push({
              day: d,
              date: new Date(activeYear, activeMonth + 1, d),
              isCurrentMonth: false
            });
          }

          // Active month name
          const activeMonthName = calendarDate.toLocaleString('default', { month: 'long' });

          // Event type colors resolver
          const getEventColors = (type) => {
            switch (type) {
              case 'Stitching Deadline':
                return { bg: 'rgba(247,37,133,0.08)', border: '1px solid rgba(247,37,133,0.18)', text: 'var(--primary)' };
              case 'Pick up & Delivery':
                return { bg: 'rgba(114,9,183,0.08)', border: '1px solid rgba(114,9,183,0.18)', text: 'var(--secondary)' };
              case 'Appointment':
                return { bg: 'rgba(76,201,240,0.08)', border: '1px solid rgba(76,201,240,0.18)', text: '#06b6d4' };
              case 'Holiday':
                return { bg: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)', text: '#d97706' };
              case 'Blocked Date':
                return { bg: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.04)', border: '1px solid var(--border-color)', text: 'var(--text-muted)' };
              default:
                return { bg: 'rgba(15,23,42,0.03)', border: '1px solid var(--border-color)', text: 'var(--text-secondary)' };
            }
          };

          // Filtered list of all events matching selected month
          const filteredMonthEvents = calendarEvents.filter(e => 
            e.date.getFullYear() === activeYear && 
            e.date.getMonth() === activeMonth &&
            calendarFilters.includes(e.type)
          );

          // Events on selected day
          const selectedDayEvents = calendarEvents.filter(e => 
            selectedCalendarDate &&
            e.date.getFullYear() === selectedCalendarDate.getFullYear() &&
            e.date.getMonth() === selectedCalendarDate.getMonth() &&
            e.date.getDate() === selectedCalendarDate.getDate() &&
            calendarFilters.includes(e.type)
          );

          // Month Overview counts
          const totalEventsCount = filteredMonthEvents.length;
          const deadlinesCount = filteredMonthEvents.filter(e => e.type === 'Stitching Deadline').length;
          const deliveriesCount = filteredMonthEvents.filter(e => e.type === 'Pick up & Delivery').length;

          // Event type colors mapping for mini calendar dots
          const getDotColor = (type) => {
            if (type === 'Stitching Deadline') return 'var(--primary)';
            if (type === 'Pick up & Delivery') return 'var(--secondary)';
            if (type === 'Appointment') return '#06b6d4';
            if (type === 'Holiday') return '#f59e0b';
            return 'var(--text-muted)';
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* HEADER VIEW CONTROL BAR */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800' }}>Deliveries & Appointments Calendar</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Manage your stitching deadlines and customer appointments</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  
                  {/* Month Switcher Controls */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '4px 10px',
                    gap: '12px'
                  }}>
                    <strong style={{ fontSize: '0.85rem', minWidth: '85px', textAlign: 'center' }}>
                      {activeMonthName} {activeYear}
                    </strong>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button 
                        onClick={() => setCalendarDate(new Date(activeYear, activeMonth - 1, 1))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', padding: '4px' }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => setCalendarDate(new Date(activeYear, activeMonth + 1, 1))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', padding: '4px' }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => {
                    const today = new Date();
                    setCalendarDate(new Date(2026, 5, 1));
                    setSelectedCalendarDate(new Date(2026, 5, 2));
                  }}>
                    Today
                  </button>

                  {/* Filter Switcher Button */}
                  <div style={{ position: 'relative' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    >
                      <Filter size={14} /> Filter
                    </button>
                    
                    {showFilterDropdown && (
                      <div style={{
                        position: 'absolute',
                        top: '42px',
                        right: '0',
                        width: '210px',
                        background: theme === 'dark' ? '#141126' : '#ffffff',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '16px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>FILTER BY TYPE</span>
                        {['Stitching Deadline', 'Pick up & Delivery', 'Appointment', 'Holiday', 'Blocked Date'].map(type => {
                          const isChecked = calendarFilters.includes(type);
                          const col = getEventColors(type).text;
                          return (
                            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', cursor: 'pointer' }}>
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) setCalendarFilters(calendarFilters.filter(f => f !== type));
                                  else setCalendarFilters([...calendarFilters, type]);
                                }}
                                style={{ accentColor: 'var(--primary)' }}
                              />
                              <span style={{ color: isChecked ? col : 'var(--text-secondary)', fontWeight: isChecked ? 'bold' : 'normal' }}>{type}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <button className="btn btn-secondary" style={{ color: 'var(--primary)', borderColor: 'var(--primary)', padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setShowAddEventModal(true)}>
                    <Plus size={14} /> Add Event
                  </button>
                  
                  <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem', fontWeight: 'bold' }} onClick={() => setShowBlockDatesModal(true)}>
                    Block Dates
                  </button>
                </div>
              </div>

              {/* TWO COLUMN CONTENT LAYOUT */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch' }}>
                
                {/* LEFT COLUMN: CALENDAR GRID (2/3 width) */}
                <div style={{ flex: '2', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Grid Calendar Card */}
                  <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    
                    {/* View mode sub-tabs */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <div style={{ 
                        display: 'flex', 
                        background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', 
                        borderRadius: '8px', 
                        padding: '3px' 
                      }}>
                        {['month', 'week', 'day'].map(mode => (
                          <button
                            key={mode}
                            onClick={() => setCalendarViewMode(mode)}
                            style={{
                              background: calendarViewMode === mode 
                                ? (theme === 'dark' ? 'rgba(247,37,133,0.2)' : 'rgba(247,37,133,0.1)') 
                                : 'transparent',
                              border: 'none',
                              color: calendarViewMode === mode ? 'var(--primary)' : 'var(--text-secondary)',
                              fontWeight: 'bold',
                              fontSize: '0.75rem',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              textTransform: 'capitalize',
                              transition: 'all 0.2s ease',
                              boxShadow: calendarViewMode === mode ? '0 1px 2px rgba(247,37,133,0.05)' : 'none'
                            }}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* MONTH VIEW CALENDAR GRID */}
                    {calendarViewMode === 'month' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border-color)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                        
                        {/* Weekday Labels Header */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: theme === 'dark' ? '#121020' : '#f8fafc' }}>
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} style={{ padding: '10px', textAlign: 'center', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)' }}>{day}</div>
                          ))}
                        </div>

                        {/* Cells Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--border-color)', gap: '1px' }}>
                          {cells.map((cell, idx) => {
                            const isSelected = selectedCalendarDate && 
                              selectedCalendarDate.getFullYear() === cell.date.getFullYear() && 
                              selectedCalendarDate.getMonth() === cell.date.getMonth() && 
                              selectedCalendarDate.getDate() === cell.date.getDate();
                            
                            const cellEvents = calendarEvents.filter(e => 
                              e.date.getFullYear() === cell.date.getFullYear() &&
                              e.date.getMonth() === cell.date.getMonth() &&
                              e.date.getDate() === cell.date.getDate() &&
                              calendarFilters.includes(e.type)
                            );

                            const isBlocked = cellEvents.some(e => e.type === 'Blocked Date');

                            return (
                              <div
                                key={idx}
                                onClick={() => setSelectedCalendarDate(cell.date)}
                                style={{
                                  minHeight: '90px',
                                  padding: '6px',
                                  background: isBlocked 
                                    ? (theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)')
                                    : (isSelected 
                                      ? (theme === 'dark' ? '#1c152a' : '#fff3f8') 
                                      : (theme === 'dark' ? '#141126' : '#ffffff')),
                                  border: isSelected ? '1px solid var(--primary)' : 'none',
                                  position: 'relative',
                                  cursor: 'pointer',
                                  opacity: cell.isCurrentMonth ? 1 : 0.45,
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <span style={{ 
                                  fontSize: '0.75rem', 
                                  fontWeight: 'bold', 
                                  color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '50%',
                                  width: '20px',
                                  height: '20px',
                                  background: isSelected ? 'rgba(247,37,133,0.1)' : 'transparent'
                                }}>
                                  {cell.day}
                                </span>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
                                  {cellEvents.map(evt => {
                                    const col = getEventColors(evt.type);
                                    return (
                                      <div 
                                        key={evt.id} 
                                        style={{
                                          padding: '2px 6px',
                                          borderRadius: '4px',
                                          background: col.bg,
                                          border: col.border,
                                          color: col.text,
                                          fontSize: '0.62rem',
                                          fontWeight: 'bold',
                                          textOverflow: 'ellipsis',
                                          overflow: 'hidden',
                                          whiteSpace: 'nowrap'
                                        }}
                                        title={`${evt.type}: ${evt.customer}`}
                                      >
                                        {evt.type === 'Blocked Date' ? 'Blocked' : evt.customer}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    )}

                    {/* WEEK VIEW TIMELINE */}
                    {calendarViewMode === 'week' && (() => {
                      const startOfWeek = new Date(selectedCalendarDate || new Date());
                      const dayOfWeek = startOfWeek.getDay();
                      const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
                      startOfWeek.setDate(startOfWeek.getDate() + distanceToMonday);
                      
                      const weekDays = [];
                      for (let i = 0; i < 7; i++) {
                        const d = new Date(startOfWeek);
                        d.setDate(d.getDate() + i);
                        weekDays.push(d);
                      }

                      return (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
                          {weekDays.map((wDate, idx) => {
                            const isSelected = selectedCalendarDate && selectedCalendarDate.getDate() === wDate.getDate();
                            const wEvents = calendarEvents.filter(e => 
                              e.date.getDate() === wDate.getDate() &&
                              e.date.getMonth() === wDate.getMonth() &&
                              calendarFilters.includes(e.type)
                            );
                            return (
                              <div 
                                key={idx} 
                                onClick={() => setSelectedCalendarDate(wDate)}
                                style={{
                                  padding: '12px',
                                  borderRadius: '12px',
                                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                                  background: isSelected ? (theme === 'dark' ? '#1c152a' : '#fff3f8') : (theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'),
                                  cursor: 'pointer',
                                  minHeight: '220px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '8px'
                                }}
                              >
                                <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', fontWeight: 'bold' }}>
                                    {wDate.toLocaleString('default', { weekday: 'short' })}
                                  </span>
                                  <strong style={{ fontSize: '1.1rem', color: isSelected ? 'var(--primary)' : 'var(--text-primary)' }}>
                                    {wDate.getDate()}
                                  </strong>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
                                  {wEvents.map(evt => (
                                    <div 
                                      key={evt.id} 
                                      style={{
                                        padding: '4px 6px',
                                        borderRadius: '6px',
                                        background: getEventColors(evt.type).bg,
                                        border: getEventColors(evt.type).border,
                                        color: getEventColors(evt.type).text,
                                        fontSize: '0.65rem',
                                        fontWeight: '700'
                                      }}
                                    >
                                      <span style={{ display: 'block', fontSize: '0.55rem', opacity: 0.85 }}>{evt.time}</span>
                                      {evt.customer}
                                    </div>
                                  ))}
                                  {wEvents.length === 0 && (
                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>No events</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}

                    {/* DAY VIEW DETAIL PANEL */}
                    {calendarViewMode === 'day' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '0.95rem' }}>
                            Schedule for {selectedCalendarDate ? selectedCalendarDate.toLocaleDateString('default', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Selected Day'}
                          </strong>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                            {selectedDayEvents.length} Events Scheduled
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {selectedDayEvents.map(evt => (
                            <div 
                              key={evt.id} 
                              style={{ 
                                display: 'flex', 
                                gap: '12px', 
                                padding: '12px', 
                                borderRadius: '10px', 
                                background: getEventColors(evt.type).bg,
                                border: getEventColors(evt.type).border
                              }}
                            >
                              <div style={{ borderRight: '2px solid var(--border-color)', paddingRight: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <strong style={{ fontSize: '0.85rem', color: getEventColors(evt.type).text }}>{evt.time}</strong>
                              </div>
                              <div>
                                <span style={{ fontSize: '0.7rem', color: getEventColors(evt.type).text, fontWeight: '800', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{evt.type}</span>
                                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{evt.customer}</strong>
                                <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{evt.details}</p>
                              </div>
                            </div>
                          ))}
                          {selectedDayEvents.length === 0 && (
                            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                              <Clock size={28} style={{ color: 'var(--text-muted)', marginBottom: '10px', opacity: 0.6 }} />
                              <h5 style={{ margin: '0 0 4px 0', fontSize: '0.85rem' }}>No events scheduled</h5>
                              <p style={{ margin: 0, fontSize: '0.75rem' }}>Add new appointments or stitching deadlines to display them here.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Legend of Event Types */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '16px', 
                      borderTop: '1px solid var(--border-color)', 
                      paddingTop: '12px', 
                      flexWrap: 'wrap',
                      fontSize: '0.75rem',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>Event Types</span>
                      {[
                        { label: 'Stitching Deadline', color: 'var(--primary)' },
                        { label: 'Pick up & Delivery', color: 'var(--secondary)' },
                        { label: 'Appointment', color: '#06b6d4' },
                        { label: 'Holiday', color: '#f59e0b' },
                        { label: 'Blocked Date', color: 'var(--text-muted)' }
                      ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></span>
                          <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* RIGHT COLUMN: MINI CALENDAR & LISTS (1/3 width) */}
                <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Small mini calendar overview card */}
                  <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{activeMonthName} {activeYear}</strong>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button 
                          onClick={() => setCalendarDate(new Date(activeYear, activeMonth - 1, 1))}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', padding: '2px' }}
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button 
                          onClick={() => setCalendarDate(new Date(activeYear, activeMonth + 1, 1))}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', padding: '2px' }}
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', fontSize: '0.7rem' }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((wDay, idx) => (
                        <span key={idx} style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>{wDay}</span>
                      ))}
                      
                      {cells.map((cell, idx) => {
                        const isSelected = selectedCalendarDate && 
                          selectedCalendarDate.getDate() === cell.date.getDate() && 
                          selectedCalendarDate.getMonth() === cell.date.getMonth();
                        
                        const hasEvt = calendarEvents.some(e => 
                          e.date.getDate() === cell.date.getDate() &&
                          e.date.getMonth() === cell.date.getMonth() &&
                          calendarFilters.includes(e.type)
                        );

                        const mainEvtType = calendarEvents.find(e => 
                          e.date.getDate() === cell.date.getDate() &&
                          e.date.getMonth() === cell.date.getMonth() &&
                          calendarFilters.includes(e.type)
                        )?.type;

                        return (
                          <div 
                            key={idx}
                            onClick={() => setSelectedCalendarDate(cell.date)}
                            style={{
                              position: 'relative',
                              padding: '4px 0',
                              borderRadius: '50%',
                              cursor: 'pointer',
                              background: isSelected ? 'var(--primary)' : 'transparent',
                              color: isSelected ? '#ffffff' : (cell.isCurrentMonth ? 'var(--text-primary)' : 'var(--text-muted)'),
                              fontWeight: isSelected ? 'bold' : '500',
                              opacity: cell.isCurrentMonth ? 1 : 0.4,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '24px',
                              width: '24px',
                              margin: '0 auto',
                              fontSize: '0.75rem',
                              transition: 'all 0.15s'
                            }}
                          >
                            <span>{cell.day}</span>
                            {hasEvt && !isSelected && (
                              <span style={{ 
                                position: 'absolute', 
                                bottom: '2px', 
                                width: '3px', 
                                height: '3px', 
                                borderRadius: '50%', 
                                background: getDotColor(mainEvtType)
                              }}></span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Upcoming events list */}
                  <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Upcoming Events</strong>
                      <span 
                        style={{ fontSize: '0.7rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => setSelectedCalendarDate(null)}
                      >
                        View All
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                      {/* If a date is selected, show events for selected day, otherwise show all active month events */}
                      {(selectedCalendarDate ? selectedDayEvents : filteredMonthEvents).map(evt => {
                        const col = getEventColors(evt.type);
                        return (
                          <div 
                            key={evt.id} 
                            style={{ 
                              padding: '8px 12px', 
                              borderRadius: '8px', 
                              border: col.border, 
                              background: col.bg,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '0.75rem'
                            }}
                          >
                            <div>
                              <span style={{ display: 'block', fontSize: '0.62rem', fontWeight: '800', color: col.text, textTransform: 'uppercase' }}>{evt.type}</span>
                              <strong style={{ color: 'var(--text-primary)' }}>{evt.customer}</strong>
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                              <div>{evt.date.toLocaleDateString('default', { day: 'numeric', month: 'short' })}</div>
                              <div style={{ fontWeight: '500' }}>{evt.time}</div>
                            </div>
                          </div>
                        );
                      })}

                      {(selectedCalendarDate ? selectedDayEvents : filteredMonthEvents).length === 0 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>No upcoming events</span>
                      )}
                    </div>
                  </div>

                  {/* Monthly statistics overview */}
                  <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>This Month Overview</strong>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>Total Events</span>
                        <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{totalEventsCount}</strong>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>Deadlines</span>
                        <strong style={{ fontSize: '1rem', color: 'var(--primary)' }}>{deadlinesCount}</strong>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block' }}>Deliveries</span>
                        <strong style={{ fontSize: '1rem', color: 'var(--secondary)' }}>{deliveriesCount}</strong>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* DYNAMIC DIALOG MODAL: ADD EVENT */}
              {showAddEventModal && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2000
                }}>
                  <div className="glass-card-no-hover" style={{ 
                    width: '100%', 
                    maxWidth: '420px', 
                    padding: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Create Calendar Event</h4>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowAddEventModal(false)}>
                        <X size={18} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Customer Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Priya Sharma" 
                          className="form-input" 
                          value={newEventCust} 
                          onChange={e => setNewEventCust(e.target.value)} 
                          style={{ width: '100%' }}
                        />
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Date</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={newEventDate} 
                            onChange={e => setNewEventDate(e.target.value)} 
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Time</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 02:00 PM" 
                            className="form-input" 
                            value={newEventTime} 
                            onChange={e => setNewEventTime(e.target.value)} 
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Event Type</label>
                        <select 
                          className="form-select" 
                          value={newEventType} 
                          onChange={e => setNewEventType(e.target.value)} 
                          style={{ width: '100%' }}
                        >
                          <option value="Stitching Deadline">Stitching Deadline</option>
                          <option value="Pick up & Delivery">Pick up & Delivery</option>
                          <option value="Appointment">Appointment</option>
                          <option value="Holiday">Holiday</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Event Details</label>
                        <textarea 
                          placeholder="Details or notes about this appointment..." 
                          className="form-input" 
                          rows="2"
                          value={newEventDetails} 
                          onChange={e => setNewEventDetails(e.target.value)} 
                          style={{ width: '100%', resize: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                      <button className="btn btn-secondary" onClick={() => setShowAddEventModal(false)}>Cancel</button>
                      <button className="btn btn-primary" style={{ fontWeight: 'bold' }} onClick={() => {
                        const parsedDate = new Date(newEventDate + 'T00:00:00');
                        if (isNaN(parsedDate.getTime())) {
                          alert("Please enter a valid date");
                          return;
                        }
                        const newEv = {
                          id: Date.now(),
                          date: parsedDate,
                          time: newEventTime,
                          type: newEventType,
                          customer: newEventCust || 'Walk-in Client',
                          details: newEventDetails || 'No details provided'
                        };
                        setCalendarEvents([...calendarEvents, newEv]);
                        setShowAddEventModal(false);
                        setNewEventCust('');
                        setNewEventDetails('');
                        alert("Event added successfully!");
                      }}>
                        Add Event
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC DIALOG MODAL: BLOCK DATES */}
              {showBlockDatesModal && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2000
                }}>
                  <div className="glass-card-no-hover" style={{ 
                    width: '100%', 
                    maxWidth: '400px', 
                    padding: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Block Shop Calendar Dates</h4>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowBlockDatesModal(false)}>
                        <X size={18} />
                      </button>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Block custom ranges from customer order scheduling. Selected days will show up as blocked/grayed out in the calendar registry.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Start Date</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={blockStartDate} 
                            onChange={e => setBlockStartDate(e.target.value)} 
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>End Date</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={blockEndDate} 
                            onChange={e => setBlockEndDate(e.target.value)} 
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                      <button className="btn btn-secondary" onClick={() => setShowBlockDatesModal(false)}>Cancel</button>
                      <button className="btn btn-primary" style={{ fontWeight: 'bold' }} onClick={() => {
                        const start = new Date(blockStartDate + 'T00:00:00');
                        const end = new Date(blockEndDate + 'T00:00:00');
                        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
                          alert("Please enter a valid date range");
                          return;
                        }

                        const blockedArr = [];
                        let current = new Date(start);
                        while (current <= end) {
                          blockedArr.push({
                            id: Math.random(),
                            date: new Date(current),
                            time: 'All Day',
                            type: 'Blocked Date',
                            customer: 'Shop Blocked',
                            details: 'Storefront appointments blocked'
                          });
                          current.setDate(current.getDate() + 1);
                        }

                        setCalendarEvents([...calendarEvents, ...blockedArr]);
                        setShowBlockDatesModal(false);
                        alert("Selected range blocked successfully!");
                      }}>
                        Block Dates
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })()}

        {/* TAB 6: EARNINGS */}
        {activeTab === 'earnings' && (() => {
          
          // Helper for transaction type styling
          const getTxStyle = (type) => {
            switch (type) {
              case 'Earning':
                return { bg: 'rgba(16,185,129,0.1)', text: '#10b981' };
              case 'Commission':
                return { bg: 'rgba(247,37,133,0.1)', text: 'var(--primary)' };
              case 'Payout':
                return { bg: 'rgba(114,9,183,0.1)', text: 'var(--secondary)' };
              default:
                return { bg: 'rgba(100,116,139,0.1)', text: 'var(--text-muted)' };
            }
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              

              {/* TITLE SECTION WITH CONTROLS */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800' }}>Earnings Overview</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Track your income, payouts and performance all in one place.</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {/* Date range button */}
                  <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.8rem' }}>
                    <Calendar size={14} /> 2 Jun – 8 Jun 2026 <ChevronDown size={14} />
                  </button>
                  {/* Export button */}
                  <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => alert("Exporting weekly ledger sheet...")}>
                    <Upload size={14} style={{ transform: 'rotate(180deg)' }} /> Export Report
                  </button>
                  {/* Top Request Payout button */}
                  <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '0.8rem', fontWeight: 'bold' }} onClick={() => alert("Payout request submitted successfully")}>
                    <CreditCard size={14} /> Request Payout
                  </button>
                </div>
              </div>

              {/* 3-COLUMN MAIN LAYOUT SPLIT */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch' }}>
                
                {/* LEFT MAIN AREA (2/3 width) */}
                <div className="earnings-main-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Row 1: KPI Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
                    
                    {/* KPI 1: Total Earnings */}
                    <div className="glass-card-no-hover" style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '16px' }}>
                      <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(247,37,133,0.08)', color: 'var(--primary)', display: 'flex' }}>
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold', display: 'block' }}>Total Earnings</span>
                        <strong style={{ fontSize: '1.45rem', fontWeight: '800', display: 'block', margin: '2px 0' }}>₹18,750</strong>
                        <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold', display: 'block' }}>↑ 12% last week</span>
                      </div>
                    </div>

                    {/* KPI 2: Pending Payouts */}
                    <div className="glass-card-no-hover" style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '16px' }}>
                      <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(114,9,183,0.08)', color: 'var(--secondary)', display: 'flex' }}>
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold', display: 'block' }}>Pending Payouts</span>
                        <strong style={{ fontSize: '1.45rem', fontWeight: '800', display: 'block', margin: '2px 0' }}>₹12,350</strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Releases 30 Jun</span>
                      </div>
                    </div>

                    {/* KPI 3: Commission */}
                    <div className="glass-card-no-hover" style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '16px' }}>
                      <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(245,158,11,0.08)', color: '#d97706', display: 'flex' }}>
                        <Scissors size={20} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold', display: 'block' }}>Commission (5%)</span>
                        <strong style={{ fontSize: '1.45rem', fontWeight: '800', display: 'block', margin: '2px 0' }}>₹937</strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Paid to platform</span>
                      </div>
                    </div>

                    {/* KPI 4: Net Earnings */}
                    <div className="glass-card-no-hover" style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '16px' }}>
                      <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(76,201,240,0.08)', color: '#06b6d4', display: 'flex' }}>
                        <ShoppingBag size={20} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold', display: 'block' }}>Net Earnings</span>
                        <strong style={{ fontSize: '1.45rem', fontWeight: '800', color: '#10b981', display: 'block', margin: '2px 0' }}>₹17,813</strong>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>After fee deduction</span>
                      </div>
                    </div>

                  </div>

                  {/* Row 2: Trend Chart (Left) & Category Breakdown (Right) */}
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    
                    {/* Earnings Trend spline chart */}
                    <div className="glass-card-no-hover" style={{ flex: '2', minWidth: '300px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '800' }}>Earnings Trend</h4>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Daily earnings for this week</span>
                        </div>
                        <select className="form-select" style={{ width: '90px', fontSize: '0.75rem', padding: '4px 8px' }} defaultValue="daily">
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                        </select>
                      </div>

                      {/* SVG Spline Wave Chart */}
                      <div style={{ width: '100%', height: '260px', position: 'relative' }}>
                        <svg viewBox="0 0 500 240" width="100%" height="100%">
                          <defs>
                            <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.00" />
                            </linearGradient>
                          </defs>
                          
                          {/* Y-axis Labels */}
                          <text x="15" y="23" fontSize="8" fontWeight="bold" fill="var(--text-muted)">₹6,000</text>
                          <text x="15" y="83" fontSize="8" fontWeight="bold" fill="var(--text-muted)">₹4,000</text>
                          <text x="15" y="143" fontSize="8" fontWeight="bold" fill="var(--text-muted)">₹2,000</text>
                          <text x="15" y="203" fontSize="8" fontWeight="bold" fill="var(--text-muted)">₹0</text>

                          {/* Grid lines */}
                          <line x1="50" y1="20" x2="490" y2="20" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4 4" />
                          <line x1="50" y1="80" x2="490" y2="80" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4 4" />
                          <line x1="50" y1="140" x2="490" y2="140" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4 4" />
                          <line x1="50" y1="200" x2="490" y2="200" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4 4" />
                          
                          {/* Shaded Area */}
                          <path 
                            d="M 55 162.5 C 91.25 162.5, 91.25 54.5, 127.5 54.5 C 163.75 54.5, 163.75 102.5, 200 102.5 C 236.25 102.5, 236.25 137.0, 272.5 137.0 C 308.75 137.0, 308.75 37.4, 345 37.4 C 381.25 37.4, 381.25 157.1, 417.5 157.1 C 453.75 157.1, 453.75 126.5, 490 126.5 L 490 200 L 55 200 Z" 
                            fill="url(#chart-grad)"
                          />

                          {/* Spline Path */}
                          <path 
                            d="M 55 162.5 C 91.25 162.5, 91.25 54.5, 127.5 54.5 C 163.75 54.5, 163.75 102.5, 200 102.5 C 236.25 102.5, 236.25 137.0, 272.5 137.0 C 308.75 137.0, 308.75 37.4, 345 37.4 C 381.25 37.4, 381.25 157.1, 417.5 157.1 C 453.75 157.1, 453.75 126.5, 490 126.5" 
                            fill="none" 
                            stroke="var(--primary)" 
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />

                          {/* Markers */}
                          {[
                            { x: 55, y: 162.5, label: '₹1,250' },
                            { x: 127.5, y: 54.5, label: '₹4,850' },
                            { x: 200.0, y: 102.5, label: '₹3,250' },
                            { x: 272.5, y: 137.0, label: '₹2,100' },
                            { x: 345.0, y: 37.4, label: '₹5,420', active: true },
                            { x: 417.5, y: 157.1, label: '₹1,430' },
                            { x: 490.0, y: 126.5, label: '₹2,450' }
                          ].map((m, idx) => (
                            <g key={idx}>
                              <circle cx={m.x} cy={m.y} r={m.active ? 6 : 4} fill={m.active ? '#ffffff' : 'var(--primary)'} stroke="var(--primary)" strokeWidth="2.5" />
                              {m.active && <circle cx={m.x} cy={m.y} r={10} fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.4" className="pulse-slow" />}
                              <text x={m.x} y={m.y - 12} fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-primary)">{m.label}</text>
                            </g>
                          ))}

                          {/* X Axis Labels inside SVG */}
                          <text x="55" y="224" fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-secondary)">Mon</text>
                          <text x="127.5" y="224" fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-secondary)">Tue</text>
                          <text x="200.0" y="224" fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-secondary)">Wed</text>
                          <text x="272.5" y="224" fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-secondary)">Thu</text>
                          <text x="345.0" y="224" fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-secondary)">Fri</text>
                          <text x="417.5" y="224" fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-secondary)">Sat</text>
                          <text x="490.0" y="224" fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-secondary)">Sun</text>
                        </svg>
                      </div>

                      {/* Highest earning alert banner */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        background: 'rgba(247,37,133,0.05)', 
                        border: '1px solid rgba(247,37,133,0.12)', 
                        borderRadius: '8px', 
                        padding: '10px 14px', 
                        fontSize: '0.75rem',
                        color: 'var(--primary)',
                        marginTop: '6px',
                        fontWeight: '500'
                      }}>
                        <Info size={14} /> Friday is your highest earning day with ₹5,420
                      </div>
                    </div>

                    {/* Earnings by Category Doughnut card */}
                    <div className="glass-card-no-hover" style={{ flex: '1.2', minWidth: '240px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Earnings by Category</strong>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
                        {/* Doughnut graph (left) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{
                            width: '160px',
                            height: '160px',
                            borderRadius: '50%',
                            background: `conic-gradient(
                              var(--primary) 0% 66%, 
                              var(--secondary) 66% 83%, 
                              #f59e0b 83% 94%, 
                              #06b6d4 94% 100%
                            )`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                          }}>
                            <div style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '50%',
                              background: theme === 'dark' ? '#141126' : '#ffffff',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>₹18,750</span>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Total</span>
                            </div>
                          </div>
                        </div>

                        {/* Legend details (right) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1', minWidth: '130px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', marginTop: '4px' }}></span>
                            <div>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', fontWeight: '500' }}>Stitching Orders</span>
                              <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>₹12,450 (66%)</strong>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', marginTop: '4px' }}></span>
                            <div>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', fontWeight: '500' }}>Alterations</span>
                              <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>₹3,250 (17%)</strong>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', marginTop: '4px' }}></span>
                            <div>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', fontWeight: '500' }}>Pick & Delivery</span>
                              <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>₹2,100 (11%)</strong>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4', marginTop: '4px' }}></span>
                            <div>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', fontWeight: '500' }}>Other Services</span>
                              <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>₹950 (6%)</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Row 3: Transactions (Left) & Earnings Goal (Right) */}
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    
                    {/* Recent Transactions Card */}
                    <div className="glass-card-no-hover" style={{ flex: '2', minWidth: '300px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '800' }}>Recent Transactions</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => alert("Showing all historical transactions...")}>
                          View All
                        </span>
                      </div>

                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                              <th style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>Date & Time</th>
                              <th style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>Description</th>
                              <th style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>Order ID</th>
                              <th style={{ padding: '8px 4px', color: 'var(--text-muted)', textAlign: 'right' }}>Amount</th>
                              <th style={{ padding: '8px 4px', color: 'var(--text-muted)', textAlign: 'center' }}>Type</th>
                              <th style={{ padding: '8px 4px', color: 'var(--text-muted)', textAlign: 'center' }}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { date: '08 Jun 2026, 06:30 PM', desc: 'Order Payment - Priya Sharma', order: '#ORD-1024', val: '₹2,850', type: 'Earning', status: 'Completed' },
                              { date: '08 Jun 2026, 03:15 PM', desc: 'Order Payment - Amit Verma', order: '#ORD-1023', val: '₹1,950', type: 'Earning', status: 'Completed' },
                              { date: '07 Jun 2026, 07:45 PM', desc: 'Order Payment - Megha Reddy', order: '#ORD-1022', val: '₹3,250', type: 'Earning', status: 'Completed' },
                              { date: '07 Jun 2026, 02:30 PM', desc: 'Commission Deducted (5%)', order: '-', val: '-₹362', type: 'Commission', status: 'Completed', isNegative: true },
                              { date: '07 Jun 2026, 11:10 AM', desc: 'Payout Initiated', order: 'PAYOUT-1012', val: '₹5,000', type: 'Payout', status: 'Processing' }
                            ].map((tx, idx) => {
                              const badge = getTxStyle(tx.type);
                              return (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                  <td style={{ padding: '10px 4px', color: 'var(--text-secondary)' }}>{tx.date}</td>
                                  <td style={{ padding: '10px 4px', fontWeight: 'bold' }}>{tx.desc}</td>
                                  <td style={{ padding: '10px 4px', color: 'var(--text-muted)' }}>{tx.order}</td>
                                  <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: '800', color: tx.isNegative ? 'var(--danger)' : 'var(--text-primary)' }}>{tx.val}</td>
                                  <td style={{ padding: '10px 4px', textAlign: 'center' }}>
                                    <span style={{ 
                                      padding: '1px 6px', 
                                      borderRadius: '10px', 
                                      fontSize: '0.6rem', 
                                      fontWeight: 'bold',
                                      background: badge.bg,
                                      color: badge.text
                                    }}>{tx.type}</span>
                                  </td>
                                  <td style={{ padding: '10px 4px', textAlign: 'center' }}>
                                    <span style={{ 
                                      padding: '3px 8px', 
                                      borderRadius: '6px', 
                                      fontSize: '0.65rem', 
                                      fontWeight: '800',
                                      background: tx.status === 'Completed' 
                                        ? 'rgba(16,185,129,0.12)' 
                                        : tx.status === 'Processing' || tx.status === 'Pending'
                                        ? 'rgba(245,158,11,0.12)' 
                                        : 'rgba(239,68,68,0.12)',
                                      color: tx.status === 'Completed' 
                                        ? '#10b981' 
                                        : tx.status === 'Processing' || tx.status === 'Pending'
                                        ? '#f59e0b' 
                                        : '#ef4444'
                                    }}>{tx.status}</span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Earnings Goal card */}
                    <div className="glass-card-no-hover" style={{ flex: '1.2', minWidth: '240px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Earnings Goal</strong>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        {/* Target board graphic (left, no arrow!) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="42" height="42" viewBox="0 0 44 44" fill="none">
                            <circle cx="22" cy="22" r="20" stroke="var(--primary)" strokeWidth="2.5" opacity="0.15" />
                            <circle cx="22" cy="22" r="14" stroke="var(--primary)" strokeWidth="2.5" opacity="0.4" />
                            <circle cx="22" cy="22" r="8" stroke="var(--primary)" strokeWidth="2.5" />
                            <circle cx="22" cy="22" r="3" fill="var(--primary)" />
                          </svg>
                        </div>

                        {/* Radial progress middle (enlarged!) */}
                        <div style={{ position: 'relative', width: '95px', height: '95px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg viewBox="0 0 36 36" width="95" height="95">
                            <path fill="none" stroke="var(--border-color)" strokeWidth="3.5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path fill="none" stroke="var(--primary)" strokeWidth="3.5" strokeDasharray="62, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          </svg>
                          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>62%</span>
                            <span style={{ fontSize: '0.52rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Done</span>
                          </div>
                        </div>

                        {/* Text (right) */}
                        <div style={{ flex: 1, minWidth: '95px' }}>
                          <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>This Month Goal</span>
                          <strong style={{ fontSize: '1.15rem', color: 'var(--text-primary)', display: 'block', margin: '2px 0' }}>₹50,000</strong>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>₹31,000 / ₹50,000</span>
                        </div>
                      </div>
                      
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', textAlign: 'center', fontWeight: '500', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                        You're doing great! Keep going 💪
                      </span>
                    </div>

                  </div>

                </div>

                {/* RIGHT SIDEBAR AREA (1/3 width) */}
                <div className="earnings-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Next Payout Card */}
                  <div className="glass-card-no-hover" style={{ 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-md)'
                  }}>
                    {/* Top Header Section (Gradient) */}
                    <div style={{
                      padding: '16px 20px', 
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 'bold', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Next Payout</span>
                        <Calendar size={14} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800' }}>₹12,350</h3>
                        <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>Estimated on 30 Jun 2026</span>
                      </div>
                    </div>

                    {/* Bottom Content Section (White/Card Theme) */}
                    <div style={{
                      padding: '16px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : '#ffffff'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <Database size={13} style={{ color: 'var(--primary)' }} /> Total Payouts
                          </span>
                          <strong style={{ fontWeight: '800', color: 'var(--text-primary)' }}>₹1,25,000</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <Award size={13} style={{ color: '#10b981' }} /> Successful Payouts
                          </span>
                          <strong style={{ fontWeight: '800', color: 'var(--text-primary)' }}>₹1,18,650</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <ShieldAlert size={13} style={{ color: 'var(--danger)' }} /> Failed Payouts
                          </span>
                          <strong style={{ fontWeight: '800', color: 'var(--text-primary)' }}>₹6,350</strong>
                        </div>
                      </div>

                      <button className="btn" style={{ 
                        background: 'transparent', 
                        border: '1px solid var(--primary)', 
                        color: 'var(--primary)', 
                        fontSize: '0.75rem', 
                        padding: '8px 12px', 
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginTop: '20px',
                        width: '100%',
                        transition: 'all 0.2s'
                      }} onClick={() => alert("Loading full payouts timeline registry...")}>
                        View Payout History
                      </button>
                    </div>
                  </div>

                  {/* Top Performing Days Card */}
                  <div className="glass-card-no-hover" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Top Performing Days</strong>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.75rem' }}>
                      {[
                        { rank: 1, day: 'Friday', val: '₹5,420', bg: '#f59e0b' },
                        { rank: 2, day: 'Tuesday', val: '₹4,850', bg: '#94a3b8' },
                        { rank: 3, day: 'Wednesday', val: '₹3,250', bg: '#b45309' }
                      ].map(d => (
                        <div key={d.rank} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ 
                              width: '18px', 
                              height: '18px', 
                              borderRadius: '50%', 
                              background: d.bg, 
                              color: '#fff', 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              fontSize: '0.62rem',
                              fontWeight: 'bold'
                            }}>
                              {d.rank}
                            </span>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{d.day}</span>
                          </div>
                          <strong style={{ color: 'var(--text-secondary)' }}>{d.val}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insights card */}
                  <div className="glass-card-no-hover" style={{ 
                    padding: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px', 
                    position: 'relative',
                    overflow: 'hidden',
                    background: theme === 'dark' ? 'rgba(114,9,183,0.06)' : 'rgba(114,9,183,0.025)',
                    border: '1px solid rgba(114,9,183,0.12)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={16} style={{ color: 'var(--secondary)' }} />
                      <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--secondary)' }}>Insights</strong>
                    </div>
                    
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', zIndex: 2 }}>
                      Your earnings are 18% higher than last week. Keep up the excellent work!
                    </p>

                    <button className="btn" style={{ 
                      width: 'fit-content', 
                      fontSize: '0.72rem', 
                      padding: '6px 12px', 
                      background: 'transparent',
                      border: '1px solid var(--secondary)',
                      color: 'var(--secondary)',
                      fontWeight: 'bold',
                      borderRadius: '6px',
                      zIndex: 2 
                    }} onClick={() => alert("Generating full analytical predictions...")}>
                      View Full Insights
                    </button>

                    {/* Upward background arrow graphic */}
                    <div style={{
                      position: 'absolute',
                      right: '-10px',
                      bottom: '-15px',
                      fontSize: '6rem',
                      color: 'var(--primary)',
                      opacity: 0.04,
                      pointerEvents: 'none',
                      transform: 'rotate(-10deg)',
                      fontWeight: 'bold'
                    }}>
                      ↑
                    </div>
                  </div>

                </div>
              </div>

              {/* BOTTOM ACTIONS AND TIPS BAR */}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'stretch', marginTop: '8px' }}>
                
                {/* Quick actions box */}
                <div className="glass-card-no-hover" style={{ 
                  flex: '1.5', 
                  minWidth: '300px', 
                  padding: '16px 20px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#ffffff',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  borderRadius: '16px'
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>QUICK ACTIONS</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '8px 14px' }} onClick={() => alert("Payout request submitted successfully")}>Request Payout</button>
                    <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '8px 14px' }} onClick={() => alert("Statement compiled. Check your downloads directory.")}>Download Statement</button>
                    <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '8px 14px' }} onClick={() => alert("Opening general financial reports...")}>View Reports</button>
                    <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '8px 14px' }} onClick={() => alert("Set monthly goal dialog opened")}>Set Earnings Goal</button>
                  </div>
                </div>

                {/* Pro tip box */}
                <div className="glass-card-no-hover" style={{ flex: '1', minWidth: '240px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '8px', borderRadius: '50%', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'flex' }}>
                    <Sparkles size={16} />
                  </div>
                  <div style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                    <strong style={{ display: 'block', color: '#f59e0b', fontSize: '0.7rem', textTransform: 'uppercase' }}>PRO TIP</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>Complete more orders and maintain 5★ rating to increase your visibility and income.</span>
                    <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold', marginLeft: '6px' }} onClick={(e) => { e.preventDefault(); alert("Opening guidelines tips manual..."); }}>Learn More</a>
                  </div>
                </div>

              </div>

            </div>
          );
        })()}

        {/* TAB 7: CHAT CENTER */}
        {activeTab === 'chat' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>StitchBee Tailor Chat Center</h3>
            <div className="glass-card-no-hover" style={{ padding: '20px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px', height: '480px' }}>
              {/* Chat Categories sidebar */}
              <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { id: 'customer', label: 'Customer Chats', icon: <User size={16} /> },
                  { id: 'admin', label: 'Admin Support', icon: <ShieldAlert size={16} /> },
                  { id: 'delivery', label: 'Delivery Partner', icon: <Truck size={16} /> }
                ].map(sub => (
                  <button
                    key={sub.id}
                    className={`btn ${chatSubTab === sub.id ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ padding: '10px', fontSize: '0.8rem', width: '100%', justifyContent: 'flex-start', gap: '8px' }}
                    onClick={() => setChatSubTab(sub.id)}
                  >
                    {sub.icon}
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* Chat logs feed */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '14px', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
                  {activeChatLogs[chatSubTab].map((msg, idx) => (
                    <div key={idx} style={{ alignSelf: msg.sender === 'tailor' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                      <div 
                        style={{
                          padding: '10px 14px', borderRadius: '12px', fontSize: '0.8rem',
                          background: msg.sender === 'tailor' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                          color: '#fff'
                        }}
                      >
                        {msg.text}
                      </div>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block', textAlign: msg.sender === 'tailor' ? 'right' : 'left' }}>
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Message input */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Type message..." 
                    className="form-input" 
                    value={typedMessage} 
                    onChange={e => setTypedMessage(e.target.value)} 
                    style={{ padding: '10px' }}
                  />
                  <button className="btn btn-primary" style={{ padding: '10px 20px' }} onClick={handleSendMessage}>
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: REVIEWS */}
        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Ratings & Customer Feedback</h3>

            {/* Overall summary */}
            <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>4.8</h4>
                <div style={{ color: '#fbbf24', margin: '4px 0' }}>★★★★★</div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>120 Total Reviews</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { star: '5 Stars', pct: '85%' },
                  { star: '4 Stars', pct: '12%' },
                  { star: '3 Stars', pct: '3%' },
                  { star: '2 Stars', pct: '0%' },
                  { star: '1 Star', pct: '0%' }
                ].map((r, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem' }}>
                    <span style={{ width: '50px' }}>{r.star}</span>
                    <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: r.pct, height: '100%', background: '#fbbf24' }}></div>
                    </div>
                    <span style={{ width: '30px', textAlign: 'right' }}>{r.pct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reviewsList.map(review => (
                <div key={review.id} className="glass-card-no-hover" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <strong style={{ fontSize: '0.85rem' }}>{review.author}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '10px' }}>{review.date}</span>
                    </div>
                    <span style={{ color: '#fbbf24' }}>{'★'.repeat(review.rating)}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: PROFILE & SETTINGS */}
        {activeTab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Profile & Shop Settings</h3>

            {/* Shop info form */}
            <div className="glass-card-no-hover" style={{ padding: '24px' }}>
              <form onSubmit={e => { e.preventDefault(); alert("Profile settings saved successfully!"); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Shop Name</label>
                    <input type="text" className="form-input" value={shopName} onChange={e => setShopName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Master Owner</label>
                    <input type="text" className="form-input" value={ownerName} onChange={e => setOwnerName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Specialty Specialization</label>
                    <input type="text" className="form-input" value={shopSpecialty} onChange={e => setShopSpecialty(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Working Hours</label>
                    <input type="text" className="form-input" value={shopHours} onChange={e => setShopHours(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stitching Capacity (monthly)</label>
                    <input type="text" className="form-input" value={stitchingCapacity} onChange={e => setStitchingCapacity(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">KYC Verification Status</label>
                    <input type="text" className="form-input" value={kycStatus} disabled style={{ opacity: 0.6 }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Shop Address</label>
                  <input type="text" className="form-input" value={shopAddress} onChange={e => setShopAddress(e.target.value)} />
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>Save Profile Changes</button>
                </div>
              </form>
            </div>

            {/* Subpages: Team, Material Requests */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* Team Management */}
              <div className="glass-card-no-hover" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> Team Management</h4>
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => setActiveTab('team')}>Manage</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {teamMembers.map(member => (
                    <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                      <div>
                        <strong>{member.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{member.role}</span>
                      </div>
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>{member.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material Purchase Requests */}
              <div className="glass-card-no-hover" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}><Database size={16} /> Material Requests</h4>
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => setActiveTab('material-requests')}>Create Request</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {materialRequests.slice(0, 2).map(req => (
                    <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                      <div>
                        <strong>{req.material}</strong>
                        <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Quantity: {req.qty}</span>
                      </div>
                      <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>{req.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: TEAM MANAGEMENT */}
        {activeTab === 'team' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Team Management & Worker Allocation</h3>
            
            {/* Team listing */}
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Worker Name</th>
                    <th style={{ padding: '10px' }}>Role</th>
                    <th style={{ padding: '10px' }}>Assigned Task</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{member.name}</td>
                      <td style={{ padding: '12px 10px' }}>{member.role}</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span className="badge badge-primary">{member.tasks}</span>
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <span className="badge badge-success">{member.status}</span>
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                        <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => alert(`Assign task to ${member.name}`)}>
                          Reassign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Team Member form */}
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', fontWeight: '800' }}>Register New Worker</h4>
              <form onSubmit={handleAddWorker} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', alignItems: 'end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Full Name</label>
                  <input type="text" className="form-input" placeholder="e.g. Anand Sharma" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Role</label>
                  <select className="form-select" value={newMemberRole} onChange={e => setNewMemberRole(e.target.value)}>
                    <option value="Stitching Assistant">Stitching Assistant</option>
                    <option value="Cutting Specialist">Cutting Specialist</option>
                    <option value="Embroidery Artist">Embroidery Artist</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Register Worker</button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 11: MATERIAL REQUESTS */}
        {activeTab === 'material-requests' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Material Purchase Requests</h3>
            
            {/* Requests listing */}
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Request ID</th>
                    <th style={{ padding: '10px' }}>Material Requested</th>
                    <th style={{ padding: '10px' }}>Quantity</th>
                    <th style={{ padding: '10px' }}>Date</th>
                    <th style={{ padding: '10px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRequests.map(req => (
                    <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{req.id}</td>
                      <td style={{ padding: '12px 10px' }}>{req.material}</td>
                      <td style={{ padding: '12px 10px' }}>{req.qty}</td>
                      <td style={{ padding: '12px 10px' }}>{req.date}</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span className="badge badge-secondary">{req.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Create Purchase Request Form */}
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', fontWeight: '800' }}>Create Material Purchase Request</h4>
              <form onSubmit={handleRequestMaterial} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', alignItems: 'end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Material Description</label>
                  <input type="text" className="form-input" placeholder="e.g. Silver Beads & Threads" value={newReqMaterialName} onChange={e => setNewReqMaterialName(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Quantity</label>
                  <input type="text" className="form-input" placeholder="e.g. 5 boxes" value={newReqMaterialQty} onChange={e => setNewReqMaterialQty(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit Request</button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
