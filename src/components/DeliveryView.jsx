import React, { useState } from 'react';
import { 
  Home, ShoppingBag, Map, DollarSign, MessageSquare, User, 
  Phone, AlertTriangle, CheckCircle, Navigation, Send, Calendar, 
  Clock, Check, ChevronRight, Info, LogOut, Shield, Compass, Sparkles, Sun, Moon, Scissors
} from 'lucide-react';

export default function DeliveryView({ theme, setTheme, currentUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'orders' | 'navigation' | 'earnings' | 'support' | 'profile'
  const [isOnline, setIsOnline] = useState(true);
  const [ordersSubTab, setOrdersSubTab] = useState('active'); // 'active' | 'upcoming' | 'completed' | 'cancelled' | 'returned'
  const [earningsPeriod, setEarningsPeriod] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [selectedOrder, setSelectedOrder] = useState(null); // Detailed order modal/view
  const [typedMessage, setTypedMessage] = useState('');
  const [supportContact, setSupportContact] = useState('customer'); // 'customer' | 'tailor' | 'admin' | 'ai'
  
  // Wallet state
  const [walletBalance, setWalletBalance] = useState(8500);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  // Quick support replies
  const quickReplies = [
    "Running Late due to traffic",
    "Reached the location",
    "Picked Up the order",
    "5 Minutes Away",
    "Delivered successfully!"
  ];

  // Theme styling definitions
  const bgCard = theme === 'dark' ? '#120f26' : '#ffffff';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0';
  const colorTextPrimary = theme === 'dark' ? '#f3f4f6' : '#0f172a';
  const colorTextSecondary = theme === 'dark' ? '#9ca3af' : '#475569';
  const colorTextMuted = theme === 'dark' ? '#6b7280' : '#94a3b8';
  const isDark = theme === 'dark';

  // Mock Active Order for Nav
  const activeOrder = {
    id: '#SB-1024',
    pickup: 'Vogue Craft Tailors',
    pickupAddress: 'Shop 4, Lane 2, Sector 5, HSR Layout, Bengaluru',
    deliverTo: 'Priya Sharma',
    deliveryAddress: 'Flat 402, Pinecrest Apartments, Sector 3, HSR Layout, Bengaluru',
    distance: '3.4 km',
    eta: '14 mins',
    item: 'Lehenga & Blouse',
    price: 850,
    earnings: 120,
    phone: '+91 98765 43210',
    tailorPhone: '+91 99887 76655',
    pickupOtp: '4091',
    deliveryOtp: '8821'
  };

  // Mock Orders list
  const [ordersList, setOrdersList] = useState([
    { id: '#SB-1024', pickup: 'Vogue Craft Tailors', deliverTo: 'Priya Sharma', item: 'Lehenga', fee: '₹120', distance: '3.2 KM', status: 'active' },
    { id: '#SB-0998', pickup: 'Elite Threads', deliverTo: 'Amit Verma', item: 'Sherwani', fee: '₹150', distance: '4.8 KM', status: 'upcoming' },
    { id: '#SB-0987', pickup: 'Rose Boutique', deliverTo: 'Sneha Iyer', item: 'Anarkali Suit', fee: '₹100', distance: '2.5 KM', status: 'upcoming' },
    { id: '#SB-0950', pickup: 'Vogue Craft Tailors', deliverTo: 'Neha Kapoor', item: 'Kurtis', fee: '₹95', distance: '3.0 KM', status: 'completed' },
    { id: '#SB-0921', pickup: 'Vogue Craft Tailors', deliverTo: 'Rahul Mehta', item: 'Suit Pant', fee: '₹110', distance: '3.5 KM', status: 'cancelled' }
  ]);

  // Support messages timeline
  const [chatHistory, setChatHistory] = useState({
    customer: [
      { sender: 'customer', text: 'Hi, are you near the location yet?', time: '11:45 AM' },
      { sender: 'rider', text: 'Yes, just 5 minutes away. Please keep the delivery OTP ready.', time: '11:47 AM' }
    ],
    tailor: [
      { sender: 'tailor', text: 'Please collect the matching border bag with the Lehenga.', time: '10:30 AM' },
      { sender: 'rider', text: 'Sure, will make sure to check and pick it up.', time: '10:32 AM' }
    ],
    admin: [
      { sender: 'admin', text: 'Your incentive payout for completing 10 deliveries has been credited.', time: 'Yesterday' }
    ],
    ai: [
      { sender: 'ai', text: 'Hello! I am your AI delivery route planner. Ask me for traffic alerts or destination updates.', time: 'Today' }
    ]
  });

  const handleSendMessage = () => {
    if (!typedMessage) return;
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    const newMsg = { sender: 'rider', text: typedMessage, time: timeStr };
    
    setChatHistory(prev => ({
      ...prev,
      [supportContact]: [...prev[supportContact], newMsg]
    }));
    setTypedMessage('');

    // Simulated reply
    setTimeout(() => {
      let replyText = "Received! Working on it.";
      if (supportContact === 'ai') {
        replyText = "The shortest route has moderate traffic. Expected delay: 2 minutes.";
      }
      const replyMsg = { sender: supportContact, text: replyText, time: timeStr };
      setChatHistory(prev => ({
        ...prev,
        [supportContact]: [...prev[supportContact], replyMsg]
      }));
    }, 1500);
  };

  const handleWithdraw = () => {
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0 || amt > walletBalance) {
      alert("Please enter a valid withdrawal amount");
      return;
    }
    setWalletBalance(prev => prev - amt);
    setWithdrawAmount('');
    alert(`Withdrawal request of ₹${amt} submitted to your linked bank account!`);
  };

  return (
    <div 
      style={{ 
        background: isDark ? '#0b0914' : '#f8fafc', 
        color: colorTextPrimary, 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <header 
        style={{ 
          background: bgCard, 
          borderBottom: `1px solid ${borderColor}`, 
          position: 'sticky', 
          top: 0, 
          zIndex: 100,
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}
      >
        {/* Logo and Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'var(--primary)', color: '#fff', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <Scissors size={18} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.2rem', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StitchBee</span>
          <span style={{ fontSize: '0.65rem', background: '#3b82f6', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>RIDER PORTAL</span>
        </div>

        {/* Desktop Tabs Header Menu */}
        <nav className="desktop-header-nav" style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'home', label: 'Home', icon: <Home size={15} /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingBag size={15} /> },
            { id: 'navigation', label: 'Navigation', icon: <Compass size={15} /> },
            { id: 'earnings', label: 'Earnings', icon: <DollarSign size={15} /> },
            { id: 'support', label: 'Support', icon: <MessageSquare size={15} /> },
            { id: 'profile', label: 'Profile', icon: <User size={15} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '0.8rem',
                fontWeight: '700',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : colorTextSecondary,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Info: Online status, Theme selector, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Online Toggle Pill */}
          <div 
            onClick={() => setIsOnline(!isOnline)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 12px', 
              borderRadius: '20px', 
              background: isOnline ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)', 
              color: isOnline ? '#10b981' : '#6b7280', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.72rem',
              border: `1px solid ${isOnline ? '#10b981' : '#6b7280'}`
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#10b981' : '#6b7280' }}></span>
            {isOnline ? 'Online' : 'Offline'}
          </div>

          {/* Theme toggle */}
          <button 
            className="btn btn-ghost" 
            style={{ padding: '8px', borderRadius: '50%', color: colorTextSecondary }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Profile Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: `2px solid var(--primary)` }}>
              <img src="/tailor_hero_4.jpg" alt="Rider" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.7rem' }}>
              <strong style={{ color: colorTextPrimary }}>Rajesh Rider</strong>
              <span style={{ color: colorTextMuted }}>Rider Partner</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content body */}
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto', paddingBottom: '90px' }}>
        
        {/* MODULE 1: HOME (DASHBOARD) */}
        {activeTab === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px' }} className="delivery-home-grid">
            
            {/* Left Column Dashboard */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Header Greeting */}
              <div className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Good Morning 👋 Rajesh</h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: colorTextSecondary }}>Ready for today's deliveries? Stay safe on the road!</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>SYSTEM STATUS:</span>
                  <span style={{ fontSize: '0.8rem', background: '#10b981', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>ACTIVE</span>
                </div>
              </div>

              {/* Today's KPI Metrics Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                {[
                  { label: "Today's Earnings", val: "₹1,820", sub: "+₹150 Incentives", color: '#fbbf24' },
                  { label: "Today's Orders", val: "16", sub: "Goal: 20", color: 'var(--primary)' },
                  { label: "Completed", val: "11", sub: "80% Success Rate", color: '#10b981' },
                  { label: "Pending", val: "5", sub: "Route Planned", color: '#3b82f6' },
                  { label: "Wallet Balance", val: `₹${walletBalance}`, sub: "Instantly Withdraw", color: '#a78bfa' },
                  { label: "Rider Rating", val: "⭐ 4.9", sub: "Top Tier Rider", color: '#f59e0b' }
                ].map((kpi, idx) => (
                  <div key={idx} className="glass-card-no-hover" style={{ padding: '16px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '12px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: colorTextSecondary, fontWeight: '700', textTransform: 'uppercase' }}>{kpi.label}</span>
                    <h2 style={{ margin: '6px 0', fontSize: '1.4rem', fontWeight: '800', color: kpi.color }}>{kpi.val}</h2>
                    <span style={{ fontSize: '0.62rem', color: colorTextMuted }}>{kpi.sub}</span>
                  </div>
                ))}
              </div>

              {/* Start Delivery: Current Active Order */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--primary)' }}>⚡ ACTIVE ORDER IN PROGRESS</span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{activeOrder.id}</span>
                </div>

                {/* Delivery Flow Map Visual representation */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-around', padding: '10px 0', position: 'relative' }}>
                  {/* Pickup */}
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(114,9,183,0.1)', color: '#7209b7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', fontWeight: 'bold' }}>🏪</div>
                    <strong style={{ fontSize: '0.78rem', display: 'block' }}>Pickup</strong>
                    <span style={{ fontSize: '0.7rem', color: colorTextSecondary }}>{activeOrder.pickup}</span>
                  </div>

                  {/* Connect arrow */}
                  <div style={{ fontSize: '1.2rem', color: 'var(--primary)', flexShrink: 0 }}>➡️</div>

                  {/* Deliver */}
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', fontWeight: 'bold' }}>🏠</div>
                    <strong style={{ fontSize: '0.78rem', display: 'block' }}>Destination</strong>
                    <span style={{ fontSize: '0.7rem', color: colorTextSecondary }}>{activeOrder.deliverTo}</span>
                  </div>

                  {/* Details stats */}
                  <div style={{ borderLeft: `1px solid ${borderColor}`, paddingLeft: '20px', flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: colorTextSecondary, marginBottom: '4px' }}>🗺️ Distance: <strong>{activeOrder.distance}</strong></div>
                    <div style={{ fontSize: '0.75rem', color: colorTextSecondary, marginBottom: '4px' }}>⏱️ ETA: <strong>{activeOrder.eta}</strong></div>
                    <div style={{ fontSize: '0.75rem', color: colorTextSecondary }}>📦 Item: <strong>{activeOrder.item}</strong></div>
                  </div>
                </div>

                {/* Footer Active actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
                  <button className="btn btn-primary" style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => setActiveTab('navigation')}>
                    <Navigation size={14} /> Navigate on Map
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => alert(`Calling Customer ${activeOrder.deliverTo} at ${activeOrder.phone}`)}>
                    <Phone size={14} /> Call Customer
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => { setActiveTab('support'); setSupportContact('customer'); }}>
                    <MessageSquare size={14} /> Chat
                  </button>
                </div>
              </div>

              {/* Upcoming Deliveries Section */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: '800' }}>Upcoming Scheduled Deliveries</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)', cursor: 'pointer' }} onClick={() => { setActiveTab('orders'); setOrdersSubTab('upcoming'); }}>View Route List</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {ordersList.filter(o => o.status === 'upcoming').map((order, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.01)' : '#f8fafc' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '0.78rem', color: colorTextPrimary }}>{order.id}</strong>
                          <span style={{ fontSize: '0.62rem', background: '#3b82f6', color: '#fff', padding: '1px 6px', borderRadius: '4px' }}>Queued</span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: colorTextSecondary, display: 'block', marginTop: '2px' }}>🏪 {order.pickup} ➡️ 🏠 {order.deliverTo}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', display: 'block' }}>Payout: {order.fee}</span>
                        <span style={{ fontSize: '0.62rem', color: colorTextMuted }}>{order.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column Dashboard: Performance and Notifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Today's Performance Card */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '0.98rem', fontWeight: '800' }}>Today's Performance</h4>
                
                {/* SVG Performance Graph */}
                <div style={{ height: '110px', width: '100%', background: isDark ? 'rgba(0,0,0,0.1)' : '#f8fafc', border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.65rem', color: colorTextSecondary, fontWeight: 'bold' }}>DELIVERIES HOURLY PROGRESS</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '10px 0' }}>
                    {[20, 45, 30, 80, 55, 90, 70, 95].map((height, idx) => (
                      <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '100%', height: `${height}%`, background: 'linear-gradient(0deg, #7209b7 0%, #f72585 100%)', borderRadius: '4px 4px 0 0' }}></div>
                        <span style={{ fontSize: '0.55rem', color: colorTextMuted }}>{idx + 9}h</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accuracy Metrics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px' }}>
                      <span>Acceptance Rate</span>
                      <span style={{ color: '#10b981' }}>98%</span>
                    </div>
                    <div style={{ height: '6px', background: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '98%', height: '100%', background: '#10b981' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px' }}>
                      <span>On-Time Rate</span>
                      <span style={{ color: 'var(--primary)' }}>96%</span>
                    </div>
                    <div style={{ height: '6px', background: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '96%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Swiggy-like Recent Alerts and Notifications */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '0.98rem', fontWeight: '800' }}>Recent Notifications</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { title: "New Order Assigned!", text: "Order #SB-1024 ready for HSR Layout delivery.", time: "2m ago", type: "order" },
                    { title: "Tailor Updated Order", text: "Vogue Craft Tailors marked #SB-1024 complete.", time: "10m ago", type: "tailor" },
                    { title: "Incentive Reward Earned", text: "₹50 credited for early morning weekend delivery.", time: "1h ago", type: "incentive" },
                    { title: "Route Adjusted", text: "Avoid Outer Ring Road due to flooding water logging.", time: "2h ago", type: "traffic" }
                  ].map((notif, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', padding: '10px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: isDark ? 'rgba(255,255,255,0.01)' : '#f8fafc' }}>
                      <span style={{ fontSize: '1.1rem' }}>
                        {notif.type === 'order' ? '🔔' : (notif.type === 'tailor' ? '🏪' : (notif.type === 'incentive' ? '💰' : '🚨'))}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                          <strong style={{ fontSize: '0.75rem', color: colorTextPrimary }}>{notif.title}</strong>
                          <span style={{ fontSize: '0.58rem', color: colorTextMuted }}>{notif.time}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.68rem', color: colorTextSecondary, overflow: 'hidden', textOverflow: 'ellipsis' }}>{notif.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* MODULE 2: ORDERS LIST */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: '6px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px', overflowX: 'auto' }}>
              {[
                { id: 'active', label: 'Active Tasks' },
                { id: 'upcoming', label: 'Upcoming queued' },
                { id: 'completed', label: 'Completed logs' },
                { id: 'cancelled', label: 'Cancelled tasks' },
                { id: 'returned', label: 'Returned packages' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setOrdersSubTab(tab.id)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    borderRadius: '16px',
                    border: 'none',
                    background: ordersSubTab === tab.id ? 'var(--primary)' : (isDark ? 'rgba(255,255,255,0.03)' : '#f1f5f9'),
                    color: ordersSubTab === tab.id ? '#ffffff' : colorTextSecondary,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List panel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {ordersList.filter(o => o.status === ordersSubTab).map((order, idx) => (
                <div key={idx} className="glass-card-no-hover" style={{ padding: '16px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', position: 'relative' }}>
                  
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px', marginBottom: '10px' }}>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{order.id}</strong>
                    <span style={{ fontSize: '0.62rem', background: '#10b981', color: '#fff', padding: '1px 6px', borderRadius: '4px' }}>Ready</span>
                  </div>

                  {/* Flow info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: colorTextSecondary }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ background: '#7209b7', color: '#fff', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem' }}>P</span>
                      <span>Pickup: <strong>{order.pickup}</strong></span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: colorTextMuted, paddingLeft: '8px' }}>↓</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ background: 'var(--primary)', color: '#fff', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem' }}>D</span>
                      <span>Deliver: <strong>{order.deliverTo}</strong></span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 0 10px 0', borderTop: `1px solid ${borderColor}`, paddingTop: '10px', fontSize: '0.75rem', color: colorTextMuted }}>
                    <span>📦 Item: {order.item}</span>
                    <span>🗺️ Distance: {order.distance}</span>
                  </div>

                  {/* Interactive Button row */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    {order.status === 'active' ? (
                      <>
                        <button className="btn btn-primary" style={{ flex: 1.5, fontSize: '0.72rem', padding: '6px' }} onClick={() => setSelectedOrder(activeOrder)}>
                          Inspect Details
                        </button>
                        <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.72rem', padding: '6px' }} onClick={() => setActiveTab('navigation')}>
                          Navigate
                        </button>
                        <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.72rem', padding: '6px' }} onClick={() => { setActiveTab('support'); setSupportContact('customer'); }}>
                          Chat
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-ghost" style={{ width: '100%', fontSize: '0.72rem', color: 'var(--primary)', border: `1.5px dashed var(--primary)` }} onClick={() => {
                        const updated = ordersList.map(o => o.id === order.id ? { ...o, status: 'active' } : o);
                        setOrdersList(updated);
                        alert(`Order ${order.id} accepted! Navigate to Pickup.`);
                      }}>
                        Swipe Right or Tap to Accept task
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>

            {/* Detailed Order popup sheet */}
            {selectedOrder && (
              <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110 }}>
                <div className="glass-card-no-hover" style={{ padding: '24px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '20px', maxWidth: '440px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                  
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '14px', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Order Details {selectedOrder.id}</h3>
                    <button className="btn btn-ghost" style={{ padding: '4px' }} onClick={() => setSelectedOrder(null)}>✕</button>
                  </div>

                  {/* Customer summary */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden' }}>
                      <img src="/why_join_1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.88rem' }}>{selectedOrder.deliverTo}</strong>
                      <span style={{ fontSize: '0.72rem', color: colorTextSecondary }}>Phone: {selectedOrder.phone}</span>
                    </div>
                  </div>

                  {/* Pickup section */}
                  <div style={{ border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '12px', marginBottom: '12px', background: isDark ? 'rgba(255,255,255,0.01)' : '#f8fafc' }}>
                    <strong style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>🏪 PICKUP FROM TAILOR</strong>
                    <h5 style={{ margin: '2px 0', fontSize: '0.8rem', fontWeight: 'bold' }}>{selectedOrder.pickup}</h5>
                    <p style={{ margin: '4px 0', fontSize: '0.72rem', color: colorTextSecondary }}>📍 Address: {selectedOrder.pickupAddress}</p>
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 'bold' }}>🔑 Pickup OTP: {selectedOrder.pickupOtp}</span>
                  </div>

                  {/* Deliver details */}
                  <div style={{ border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '12px', marginBottom: '12px', background: isDark ? 'rgba(255,255,255,0.01)' : '#f8fafc' }}>
                    <strong style={{ fontSize: '0.75rem', color: '#10b981', display: 'block', marginBottom: '4px' }}>🏠 DELIVER TO CUSTOMER</strong>
                    <h5 style={{ margin: '2px 0', fontSize: '0.8rem', fontWeight: 'bold' }}>{selectedOrder.deliverTo}</h5>
                    <p style={{ margin: '4px 0', fontSize: '0.72rem', color: colorTextSecondary }}>📍 Address: {selectedOrder.deliveryAddress}</p>
                    <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 'bold' }}>🔑 Delivery OTP: {selectedOrder.deliveryOtp}</span>
                  </div>

                  {/* Items list */}
                  <div style={{ border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
                    <strong style={{ fontSize: '0.75rem', color: colorTextMuted, display: 'block', marginBottom: '6px' }}>📦 INCLUDED ITEMS</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem', color: colorTextSecondary }}>
                      <span>• 1 Bridal Lehenga (Peach)</span>
                      <span>• 2 Designer Blouses</span>
                      <span>• Fabric Sizing Bag</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.78rem' }} onClick={() => {
                        alert("Verification Photo uploaded successfully!");
                      }}>
                        📷 Upload Photo
                      </button>
                      <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.78rem' }} onClick={() => {
                        const code = prompt("Enter customer delivery OTP code to verify:");
                        if (code === selectedOrder.deliveryOtp) {
                          alert("OTP verified! Delivery marked completed.");
                          const updated = ordersList.map(o => o.id === selectedOrder.id ? { ...o, status: 'completed' } : o);
                          setOrdersList(updated);
                          setSelectedOrder(null);
                        } else {
                          alert("Incorrect OTP code. Verification failed.");
                        }
                      }}>
                        Mark Delivered
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* MODULE 3: NAVIGATION & LIVE ROUTE PLANNER */}
        {activeTab === 'navigation' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', height: 'calc(100vh - 160px)' }} className="delivery-nav-grid">
            
            {/* Map Simulator */}
            <div style={{ background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              
              {/* Interactive Vector map canvas */}
              <div style={{ flex: 1, background: isDark ? '#14142b' : '#e2e8f0', position: 'relative' }}>
                <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%' }}>
                  {/* Grid Lines representing streets */}
                  <line x1="50" y1="0" x2="50" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="150" y1="0" x2="150" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="300" y1="0" x2="300" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="500" y1="0" x2="500" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="700" y1="0" x2="700" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  
                  <line x1="0" y1="100" x2="800" y2="100" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="0" y1="250" x2="800" y2="250" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="0" y1="400" x2="800" y2="400" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="0" y1="520" x2="800" y2="520" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />

                  {/* Route line */}
                  <path d="M 150 250 L 300 250 L 300 400 L 500 400" fill="none" stroke="var(--primary)" strokeWidth="6" strokeDasharray="6 4" />

                  {/* Pickup Pin */}
                  <circle cx="150" cy="250" r="14" fill="#7209b7" />
                  <text x="150" y="254" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🏪</text>

                  {/* Rider Dot */}
                  <circle cx="300" cy="250" r="10" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                  
                  {/* Delivery Destination Pin */}
                  <circle cx="500" cy="400" r="14" fill="var(--primary)" />
                  <text x="500" y="404" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🏠</text>
                </svg>

                {/* Floating GPS HUD overlay */}
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', background: bgCard, border: `1px solid ${borderColor}`, padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <div>
                    <span style={{ fontSize: '0.62rem', color: colorTextMuted, textTransform: 'uppercase', fontWeight: 'bold' }}>CURRENT ACTIVE ROUTE</span>
                    <h5 style={{ margin: '2px 0 0 0', fontSize: '0.88rem', fontWeight: '800' }}>To {activeOrder.deliverTo}</h5>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', textAlign: 'center', fontSize: '0.78rem' }}>
                    <div>
                      <span style={{ display: 'block', color: colorTextSecondary }}>Distance</span>
                      <strong style={{ color: 'var(--primary)' }}>3.8 KM</strong>
                    </div>
                    <div style={{ borderLeft: `1px solid ${borderColor}`, paddingLeft: '14px' }}>
                      <span style={{ display: 'block', color: colorTextSecondary }}>ETA</span>
                      <strong style={{ color: '#10b981' }}>12 mins</strong>
                    </div>
                    <div style={{ borderLeft: `1px solid ${borderColor}`, paddingLeft: '14px' }}>
                      <span style={{ display: 'block', color: colorTextSecondary }}>Traffic</span>
                      <strong style={{ color: '#fbbf24' }}>Moderate</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick actions bar */}
              <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', borderTop: `1px solid ${borderColor}` }}>
                <button className="btn btn-primary" style={{ flex: 1.5, fontSize: '0.75rem' }} onClick={() => alert("Simulated GPS directions initialized...")}>
                  Start Route
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.75rem' }} onClick={() => alert("SOS Alert dispatched to operations center!")}>
                  ⚠️ SOS
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.75rem' }} onClick={() => alert(`Calling Tailor Shop ${activeOrder.pickup} at ${activeOrder.tailorPhone}`)}>
                  Call Tailor
                </button>
              </div>

            </div>

            {/* Route Planner sidebar */}
            <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800' }}>Amazon Flex Route Planner</h4>
                <span style={{ fontSize: '0.65rem', color: colorTextMuted }}>Sequence of pickups and drop-offs</span>
              </div>

              {/* Path timeline */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '12px', borderLeft: `2px dashed ${borderColor}`, marginLeft: '10px', position: 'relative' }}>
                {[
                  { num: 1, title: 'Pickup from Vogue Tailors', subText: 'Order #SB-1024' },
                  { num: 2, title: 'Deliver to Priya Sharma', subText: 'Flat 402, Pinecrest Apts' },
                  { num: 3, title: 'Pickup from Elite Threads', subText: 'Order #SB-0998' },
                  { num: 4, title: 'Deliver to Amit Verma', subText: 'Lane 5, Phase 2, Pune Road' },
                  { num: 5, title: 'Deliver to Sneha Iyer', subText: 'Rose Boutique collection drop-off' }
                ].map((step, idx) => (
                  <div key={idx} style={{ position: 'relative', fontSize: '0.78rem' }}>
                    <div 
                      style={{ 
                        position: 'absolute', 
                        left: '-22px', 
                        top: '1px', 
                        width: '18px', 
                        height: '18px', 
                        borderRadius: '50%', 
                        background: step.title.includes('Pickup') ? '#7209b7' : 'var(--primary)',
                        color: '#fff', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.62rem', 
                        fontWeight: 'bold' 
                      }}
                    >
                      {step.num}
                    </div>
                    <strong style={{ display: 'block', color: colorTextPrimary }}>{step.title}</strong>
                    <span style={{ fontSize: '0.68rem', color: colorTextSecondary }}>{step.subText}</span>
                  </div>
                ))}
              </div>

              {/* Optimize Button */}
              <button className="btn btn-secondary" style={{ width: '100%', marginTop: '16px', fontWeight: 'bold', fontSize: '0.78rem' }} onClick={() => alert("Re-ordered route timeline to avoid major congestion areas!")}>
                Optimize Route
              </button>

            </div>

          </div>
        )}

        {/* MODULE 4: EARNINGS AND WALLET */}
        {activeTab === 'earnings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Quick Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              {[
                { title: "Today's Payout", val: "₹1,850", info: "Incentives: ₹120", sub: "Withdraw Available" },
                { title: "Weekly Payout", val: "₹11,250", info: "12 Hours Active", sub: "Cleared Friday" },
                { title: "Monthly Payout", val: "₹48,600", info: "98% Completion", sub: "June Cycle" },
                { title: "Bonus & Incentives", val: "₹4,000", info: "Weekend Rush rewards", sub: "Paid instantly" }
              ].map((card, idx) => (
                <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                  <span style={{ fontSize: '0.72rem', color: colorTextSecondary, textTransform: 'uppercase', fontWeight: 'bold' }}>{card.title}</span>
                  <h2 style={{ margin: '8px 0', fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary)' }}>{card.val}</h2>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: colorTextMuted }}>
                    <span>{card.info}</span>
                    <span>{card.sub}</span>
                  </div>
                </div>
              ))}

              {/* Instant withdraw card */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: colorTextSecondary, textTransform: 'uppercase', fontWeight: 'bold' }}>Available Balance</span>
                  <h2 style={{ margin: '4px 0', fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>₹{walletBalance}</h2>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  <input 
                    type="number" 
                    placeholder="Amt" 
                    className="form-input" 
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem', height: '32px' }}
                  />
                  <button className="btn btn-primary" style={{ padding: '0 10px', fontSize: '0.72rem', height: '32px' }} onClick={handleWithdraw}>
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Graph & Transaction History split */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }} className="earnings-bottom-layout">
              
              {/* Native SVG Spline Spline wave graph representation */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800' }}>Weekly Revenue trends</h4>
                  <select className="form-select" style={{ width: '100px', fontSize: '0.7rem', padding: '4px 8px', height: '24px' }}>
                    <option>June 2026</option>
                    <option>May 2026</option>
                  </select>
                </div>

                <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                  <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Horizontal helper lines */}
                    <line x1="0" y1="40" x2="400" y2="40" stroke={borderColor} strokeWidth="0.5" />
                    <line x1="0" y1="90" x2="400" y2="90" stroke={borderColor} strokeWidth="0.5" />
                    <line x1="0" y1="140" x2="400" y2="140" stroke={borderColor} strokeWidth="0.5" />
                    
                    {/* Graph Spline wave */}
                    <path d="M 0 170 C 50 140, 100 130, 150 90 C 200 50, 250 80, 300 40 C 350 0, 400 30, 400 30 L 400 200 L 0 200 Z" fill="url(#gradientGreen)" />
                    <path d="M 0 170 C 50 140, 100 130, 150 90 C 200 50, 250 80, 300 40 C 350 0, 400 30, 400 30" fill="none" stroke="#10b981" strokeWidth="3" />

                    {/* Nodes */}
                    <circle cx="150" cy="90" r="5" fill="#10b981" />
                    <circle cx="300" cy="40" r="5" fill="#10b981" />

                    {/* Labels */}
                    <text x="150" y="80" fontSize="8" fill={colorTextPrimary} fontWeight="bold">₹1,850</text>
                    <text x="300" y="30" fontSize="8" fill={colorTextPrimary} fontWeight="bold">₹2,400</text>
                  </svg>
                </div>
              </div>

              {/* Transactions logs table widget */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '0.92rem', fontWeight: '800' }}>Recent Account Statements</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { title: "Delivery Commission payout #SB-1024", date: "June 21, 2026", amt: "+₹120", type: "credit" },
                    { title: "Weekend Surge Incentive bonus", date: "June 21, 2026", amt: "+₹50", type: "credit" },
                    { title: "Instant Wallet Payout withdrawal request", date: "June 20, 2026", amt: "-₹2,000", type: "debit" },
                    { title: "Delivery Commission payout #SB-0950", date: "June 19, 2026", amt: "+₹95", type: "credit" }
                  ].map((tx, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.01)' : '#f8fafc' }}>
                      <div>
                        <strong style={{ fontSize: '0.75rem', color: colorTextPrimary, display: 'block' }}>{tx.title}</strong>
                        <span style={{ fontSize: '0.62rem', color: colorTextMuted }}>{tx.date}</span>
                      </div>
                      <strong style={{ fontSize: '0.82rem', color: tx.type === 'credit' ? '#10b981' : 'var(--primary)' }}>
                        {tx.amt}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* MODULE 5: SUPPORT AND LIVE CHAT CENTER */}
        {activeTab === 'support' && (
          <div className="glass-card-no-hover" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', height: '480px', padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
            
            {/* Left Channel selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderRight: `1px solid ${borderColor}`, paddingRight: '16px' }}>
              {[
                { id: 'customer', label: 'Customer Chat', desc: activeOrder.deliverTo },
                { id: 'tailor', label: 'Tailor Partner', desc: activeOrder.pickup },
                { id: 'admin', label: 'StitchBee Admin', desc: 'Platform Help' },
                { id: 'ai', label: 'AI Route Assistant', desc: 'Instant suggestion' }
              ].map(ch => (
                <div 
                  key={ch.id}
                  onClick={() => setSupportContact(ch.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: supportContact === ch.id ? 'var(--primary)' : 'transparent',
                    color: supportContact === ch.id ? '#ffffff' : colorTextPrimary,
                    transition: 'all 0.2s'
                  }}
                >
                  <strong style={{ fontSize: '0.78rem', display: 'block' }}>{ch.label}</strong>
                  <span style={{ fontSize: '0.62rem', color: supportContact === ch.id ? 'rgba(255,255,255,0.7)' : colorTextSecondary }}>{ch.desc}</span>
                </div>
              ))}
            </div>

            {/* Right Chat feed */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              
              {/* Header Contact Info */}
              <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.88rem' }}>Active Support thread: {supportContact.toUpperCase()}</strong>
                <span style={{ fontSize: '0.68rem', color: '#10b981' }}>● Online</span>
              </div>

              {/* Messages timeline */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(chatHistory[supportContact] || []).map((msg, idx) => (
                  <div key={idx} style={{ alignSelf: msg.sender === 'rider' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                    <div 
                      style={{ 
                        padding: '10px 14px', 
                        borderRadius: '12px', 
                        fontSize: '0.8rem',
                        background: msg.sender === 'rider' ? 'var(--primary)' : (isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9'),
                        color: msg.sender === 'rider' ? '#ffffff' : colorTextPrimary,
                        border: `1px solid ${borderColor}`
                      }}
                    >
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '0.6rem', color: colorTextMuted, marginTop: '2px', display: 'block', textAlign: msg.sender === 'rider' ? 'right' : 'left' }}>
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Composer input */}
              <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '10px' }}>
                {/* Quick actions buttons */}
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
                  {quickReplies.map((reply, idx) => (
                    <button 
                      key={idx} 
                      className="btn btn-secondary" 
                      style={{ fontSize: '0.65rem', padding: '4px 10px', whiteSpace: 'nowrap' }}
                      onClick={() => setTypedMessage(reply)}
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Type message..." 
                    className="form-input" 
                    value={typedMessage} 
                    onChange={e => setTypedMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    style={{ flex: 1, padding: '10px', fontSize: '0.8rem' }}
                  />
                  <button className="btn btn-primary" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center' }} onClick={handleSendMessage}>
                    <Send size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* MODULE 6: PROFILE, DOCUMENTS & RATINGS */}
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }} className="delivery-profile-grid">
            
            {/* Left sidebar profile cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Avatar Summary card */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 10px auto', border: `3.5px solid var(--primary)` }}>
                  <img src="/tailor_hero_4.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ margin: '4px 0', fontSize: '0.98rem', fontWeight: '800' }}>Rajesh Rider</h4>
                <span style={{ fontSize: '0.7rem', color: colorTextSecondary, display: 'block', marginBottom: '8px' }}>Rider ID: RIDER-99210</span>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '0.72rem' }}>
                  <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Active Shift</span>
                  <span style={{ background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Bike Delivery</span>
                </div>
              </div>

              {/* Core Profile Parameters details */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem' }}>
                <h5 style={{ margin: '0 0 4px 0', fontSize: '0.82rem', fontWeight: '800', borderBottom: `1px solid ${borderColor}`, paddingBottom: '6px' }}>Rider Information</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Vehicle</span> <strong>Bajaj Pulsar 150 (KA-05-EX-4902)</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Driving License</span> <strong>DL-409823908920</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Insurance Policy</span> <strong>IND-INS-8890-ACTIVE</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Emergency Contact</span> <strong>+91 99887 76655 (Father)</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Preferred Hours</span> <strong>08:00 AM - 05:00 PM</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Language</span> <strong>English, Kannada, Hindi</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Linked Bank</span> <strong>HDFC Account (•••4021)</strong></div>
              </div>

              {/* Logout button */}
              <button className="btn btn-ghost" style={{ width: '100%', color: 'var(--primary)', border: `1.5px solid var(--primary)`, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={onLogout}>
                <LogOut size={14} /> Log Out Account
              </button>

            </div>

            {/* Right sidebar details: Calendar Schedule & Ratings reviews */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Calendar Scheduler */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800' }}>Google Calendar Shift Scheduler</h4>
                  <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '4px 10px' }} onClick={() => alert("Calendar block dates selected")}>Modify Schedule</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', fontSize: '0.7rem' }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <div key={idx} style={{ padding: '8px 4px', border: `1px solid ${borderColor}`, borderRadius: '6px', background: idx >= 5 ? 'rgba(247,37,133,0.05)' : 'rgba(16,185,129,0.05)' }}>
                      <span style={{ display: 'block', color: colorTextMuted, fontSize: '0.6rem' }}>{day}</span>
                      <strong style={{ display: 'block', margin: '4px 0', color: colorTextPrimary }}>{idx + 10}</strong>
                      <span style={{ fontSize: '0.55rem', color: idx >= 5 ? 'var(--primary)' : '#10b981', fontWeight: 'bold' }}>{idx >= 5 ? 'Holiday' : 'Shift'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ratings and reviews */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '0.92rem', fontWeight: '800' }}>Ratings breakdown & feedback</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', border: `1px solid ${borderColor}`, borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.62rem', color: colorTextMuted, display: 'block' }}>CUSTOMER</span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>⭐ 4.8</strong>
                  </div>
                  <div style={{ padding: '10px', border: `1px solid ${borderColor}`, borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.62rem', color: colorTextMuted, display: 'block' }}>TAILOR</span>
                    <strong style={{ fontSize: '1.2rem', color: '#10b981' }}>⭐ 5.0</strong>
                  </div>
                  <div style={{ padding: '10px', border: `1px solid ${borderColor}`, borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.62rem', color: colorTextMuted, display: 'block' }}>ADMIN</span>
                    <strong style={{ fontSize: '1.2rem', color: '#3b82f6' }}>⭐ 4.9</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.72rem', color: colorTextSecondary }}>
                  <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '6px' }}>
                    <strong>Priya Sharma:</strong> "Arrived exactly on time, very polite rider!" (5★)
                  </div>
                  <div>
                    <strong>Amit Verma:</strong> "Protected fabric box from rain perfectly." (5★)
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* 2. BOTTOM MOBILE NAVIGATION BAR */}
      <footer 
        className="mobile-bottom-nav" 
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: bgCard, 
          borderTop: `1px solid ${borderColor}`, 
          display: 'flex', 
          justifyContent: 'space-around', 
          padding: '8px 0',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
          zIndex: 100
        }}
      >
        {[
          { id: 'home', label: 'Home', icon: <Home size={20} /> },
          { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
          { id: 'navigation', label: 'Route', icon: <Compass size={20} /> },
          { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
          { id: 'profile', label: 'Profile', icon: <User size={20} /> }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.62rem',
              fontWeight: 'bold',
              color: activeTab === item.id ? 'var(--primary)' : colorTextMuted,
              cursor: 'pointer'
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </footer>

    </div>
  );
}
