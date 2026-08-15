import React, { useState } from 'react';
import { 
  Truck, Package, Clock, CheckCircle2, AlertTriangle, MapPin, Phone, User, 
  Search, Filter, ChevronDown, Download, Plus, RefreshCw, Navigation, ShieldCheck,
  Calendar, Zap, ArrowUpRight, ArrowDownRight, Info, ExternalLink, MessageSquare, Check, X
} from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DesignerDeliveryPartnerWorkspace({ theme = 'light' }) {
  const isDark = theme === 'dark';
  
  // Theme Color Tokens
  const pageBg = isDark ? '#0D0A1A' : '#F7F8FA';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#172033';
  const secTextColor = isDark ? '#98A2B3' : '#667085';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB';
  const softBorderColor = isDark ? 'rgba(255,255,255,0.05)' : '#F2F4F7';
  const itemBg = isDark ? '#231E3B' : '#FAFBFC';
  const primaryPink = '#EC167F';
  const pinkBorder = isDark ? 'rgba(236,22,127,0.3)' : '#F7B6D5';

  // Filters State
  const [activeTabFilter, setActiveTabFilter] = useState('all'); // 'all' | 'out-for-delivery' | 'pickup-scheduled' | 'in-transit' | 'delivered'
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('Today');
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Mock Logistics Sparkline Data
  const sparklineActive = [12, 14, 15, 14, 16, 18];
  const sparklineOnTime = [98, 98.5, 98.8, 99, 99.1, 99.2];
  const sparklinePending = [8, 7, 9, 5, 6, 6];
  const sparklineAvgTime = [3.2, 3.0, 2.8, 2.6, 2.5, 2.4];

  // Daily Dispatch Analytics Chart Data
  const dispatchTrendData = [
    { time: '09:00 AM', outForDelivery: 4, inTransit: 2, delivered: 1 },
    { time: '11:00 AM', outForDelivery: 8, inTransit: 4, delivered: 3 },
    { time: '01:00 PM', outForDelivery: 12, inTransit: 6, delivered: 7 },
    { time: '03:00 PM', outForDelivery: 15, inTransit: 5, delivered: 11 },
    { time: '05:00 PM', outForDelivery: 18, inTransit: 3, delivered: 15 },
    { time: '07:00 PM', outForDelivery: 14, inTransit: 2, delivered: 18 }
  ];

  // Delivery Partner Distribution Donut Data
  const partnerDistributionData = [
    { name: 'StitchBee Express', value: 48, color: '#EC167F' },
    { name: 'BlueDart Air', value: 24, color: '#3B82F6' },
    { name: 'DTDC Priority', value: 16, color: '#7C3AED' },
    { name: 'Doorstep Pickup', value: 12, color: '#16A36A' }
  ];

  // Shipments Master Dataset
  const [shipments, setShipments] = useState([
    {
      id: 'STITCH-DLV-8821',
      orderId: 'ORD-9901',
      customer: 'Priya Sharma',
      customerPhone: '+91 98765 43210',
      outfit: 'Royal Bridal Lehenga',
      courier: 'StitchBee Express',
      driver: 'Ramesh Kumar',
      driverPhone: '+91 98111 22334',
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      pickupLocation: 'Indiranagar Studio, Blr',
      deliveryAddress: 'Flat 402, Prestige Ferns, Koramangala, Blr',
      estimatedTime: 'Today, 4:30 PM',
      status: 'Out for Delivery',
      statusType: 'out-for-delivery',
      progress: 80,
      trackingUrl: '#'
    },
    {
      id: 'STITCH-DLV-8822',
      orderId: 'ORD-9904',
      customer: 'Ananya Roy',
      customerPhone: '+91 98123 45678',
      outfit: 'Zardozi Silk Anarkali',
      courier: 'BlueDart Air',
      driver: 'Vikram Singh',
      driverPhone: '+91 98222 33445',
      driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      pickupLocation: 'Indiranagar Studio, Blr',
      deliveryAddress: '12th Main, HSR Layout Sector 1, Blr',
      estimatedTime: 'Today, 6:00 PM',
      status: 'In Transit',
      statusType: 'in-transit',
      progress: 45,
      trackingUrl: '#'
    },
    {
      id: 'STITCH-DLV-8823',
      orderId: 'ORD-9908',
      customer: 'Kavita Patel',
      customerPhone: '+91 99887 66554',
      outfit: 'Silk Saree & Embroidered Blouse',
      courier: 'StitchBee Express',
      driver: 'Suresh Patel',
      driverPhone: '+91 98333 44556',
      driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      pickupLocation: 'Indiranagar Studio, Blr',
      deliveryAddress: 'UB City Towers, Vittal Mallya Rd, Blr',
      estimatedTime: 'Tomorrow, 11:30 AM',
      status: 'Pickup Scheduled',
      statusType: 'pickup-scheduled',
      progress: 15,
      trackingUrl: '#'
    },
    {
      id: 'STITCH-DLV-8824',
      orderId: 'ORD-9889',
      customer: 'Meera Deshmukh',
      customerPhone: '+91 97654 32109',
      outfit: 'Indo-Western Crop Top Set',
      courier: 'Doorstep Pickup',
      driver: 'Anita Rao',
      driverPhone: '+91 98444 55667',
      driverAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      pickupLocation: 'Whitefield Studio, Blr',
      deliveryAddress: 'Palm Meadows, Whitefield, Blr',
      estimatedTime: 'Delivered (2:15 PM)',
      status: 'Delivered',
      statusType: 'delivered',
      progress: 100,
      trackingUrl: '#'
    },
    {
      id: 'STITCH-DLV-8825',
      orderId: 'ORD-9870',
      customer: 'Rohan Malhotra',
      customerPhone: '+91 98989 12121',
      outfit: 'Velvet Sherwani & Dupatta',
      courier: 'DTDC Priority',
      driver: 'Manish Kumar',
      driverPhone: '+91 98555 66778',
      driverAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
      pickupLocation: 'Indiranagar Studio, Blr',
      deliveryAddress: 'Sadashivanagar, Blr',
      estimatedTime: 'Today, 5:15 PM',
      status: 'Out for Delivery',
      statusType: 'out-for-delivery',
      progress: 85,
      trackingUrl: '#'
    }
  ]);

  // Filtered Shipments
  const filteredShipments = shipments.filter(item => {
    const matchesTab = activeTabFilter === 'all' || item.statusType === activeTabFilter;
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.outfit.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.driver.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // SVG Sparkline Renderer
  const renderSparkline = (dataPoints, strokeColor, fillColor) => {
    const width = 120;
    const height = 36;
    const maxVal = Math.max(...dataPoints);
    const minVal = Math.min(...dataPoints);
    const range = maxVal - minVal || 1;

    const points = dataPoints.map((val, idx) => {
      const x = (idx / (dataPoints.length - 1)) * width;
      const y = height - ((val - minVal) / range) * (height - 8) - 4;
      return `${x},${y}`;
    });

    const pathD = `M ${points.join(' L ')}`;
    const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

    return (
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`grad-${strokeColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor || strokeColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor={fillColor || strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${strokeColor.replace('#', '')})`} />
        <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {dataPoints.map((val, idx) => {
          const x = (idx / (dataPoints.length - 1)) * width;
          const y = height - ((val - minVal) / range) * (height - 8) - 4;
          if (idx === dataPoints.length - 1) {
            return (
              <circle key={idx} cx={x} cy={y} r="4" fill={strokeColor} stroke="#FFFFFF" strokeWidth="2" />
            );
          }
          return null;
        })}
      </svg>
    );
  };

  return (
    <div style={{ background: pageBg, minHeight: '100vh', padding: '24px 0 40px 0', fontFamily: "'Inter', sans-serif", color: textColor }}>
      
      {/* 100% Full Width Workspace Container */}
      <div style={{ width: '100%', padding: '0 32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* ==================================================================== */}
        {/* 1. PAGE HEADER & ACTIONS BAR                                         */}
        {/* ==================================================================== */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', color: textColor }}>
                Delivery Partner & Logistics Command Center ✦
              </h1>
              <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(236,22,127,0.1)', color: primaryPink, padding: '3px 10px', borderRadius: '12px' }}>
                LIVE DISPATCH
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: secTextColor }}>
              Track real-time garment dispatches, courier partners, doorstep sample pickups, and client delivery SLAs.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Timeframe Selector */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: secTextColor }}>
              <Calendar size={14} color={primaryPink} />
              <span>{timeframe} (15 May 2026)</span>
            </div>

            {/* Export Manifest Button */}
            <button 
              onClick={() => alert("Exporting Daily Delivery Manifest PDF...")}
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '9px 16px',
                fontSize: '12px',
                fontWeight: 600,
                color: textColor,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <Download size={14} />
              Export Manifest
            </button>

            {/* Assign Dispatch Primary Button */}
            <button 
              onClick={() => alert("Opening Dispatch Assignment Modal...")}
              style={{
                background: primaryPink,
                border: 'none',
                borderRadius: '8px',
                padding: '9px 18px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(236,22,127,0.3)',
                transition: 'all 0.2s'
              }}
            >
              <Plus size={15} />
              + Assign Delivery Partner
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. TOP 4 LOGISTICS KPI METRICS CARDS                                  */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          width: '100%'
        }}>
          
          {/* Card 1 — Active Deliveries */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(16,24,40,0.03)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: secTextColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active Shipments</span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 800, color: textColor, letterSpacing: '-0.02em' }}>18 Orders</h2>
              </div>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={20} color="#3B82F6" />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#16A36A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <ArrowUpRight size={13} /> 6 Out for Delivery
                </span>
                <span style={{ fontSize: '10px', color: secTextColor, marginTop: '2px', display: 'block' }}>12 in transit / scheduled</span>
              </div>
              <div>{renderSparkline(sparklineActive, '#3B82F6')}</div>
            </div>
          </div>

          {/* Card 2 — On-Time Delivery SLA */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(16,24,40,0.03)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: secTextColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>On-Time Delivery SLA</span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 800, color: textColor, letterSpacing: '-0.02em' }}>99.2%</h2>
              </div>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: isDark ? 'rgba(22,163,106,0.2)' : '#ECFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} color="#16A36A" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#16A36A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <ArrowUpRight size={13} /> +0.5% vs Apr 2026
                </span>
                <span style={{ fontSize: '10px', color: secTextColor, marginTop: '2px', display: 'block' }}>Zero delayed shipments</span>
              </div>
              <div>{renderSparkline(sparklineOnTime, '#16A36A')}</div>
            </div>
          </div>

          {/* Card 3 — Pending Pickups */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(16,24,40,0.03)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: secTextColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pending Studio Pickups</span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 800, color: textColor, letterSpacing: '-0.02em' }}>6 Pickups</h2>
              </div>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: isDark ? 'rgba(245,158,11,0.2)' : '#FFF7E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={20} color="#F59E0B" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 700 }}>
                  Ready at Indiranagar
                </span>
                <span style={{ fontSize: '10px', color: secTextColor, marginTop: '2px', display: 'block' }}>Assigned courier en-route</span>
              </div>
              <div>{renderSparkline(sparklinePending, '#F59E0B')}</div>
            </div>
          </div>

          {/* Card 4 — Avg Transit Time */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '18px 20px', boxShadow: '0 2px 8px rgba(16,24,40,0.03)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: secTextColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Avg Transit Time</span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 800, color: textColor, letterSpacing: '-0.02em' }}>2.4 Hours</h2>
              </div>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: isDark ? 'rgba(124,58,237,0.2)' : '#F4EEFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={20} color="#7C3AED" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 700 }}>
                  Same-City Express SLA
                </span>
                <span style={{ fontSize: '10px', color: secTextColor, marginTop: '2px', display: 'block' }}>Real-time GPS tracked</span>
              </div>
              <div>{renderSparkline(sparklineAvgTime, '#7C3AED')}</div>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 3. LOGISTICS ANALYTICS SECTION (60% DISPATCH TREND | 40% COURIER DONUT)*/}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          gap: '16px',
          width: '100%',
          alignItems: 'stretch'
        }}>
          
          {/* 60% LEFT — DAILY DISPATCH TREND CHART */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(16,24,40,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textColor }}>Daily Dispatch & Delivery Performance</h3>
                <span style={{ fontSize: '11px', color: secTextColor, marginTop: '2px', display: 'block' }}>Hourly tracking of orders out for delivery vs completed deliveries</span>
              </div>

              {/* Timeframe Pill Filters */}
              <div style={{ display: 'flex', background: itemBg, padding: '3px', borderRadius: '8px', border: `1px solid ${borderColor}` }}>
                {['Today', 'This Week', 'This Month'].map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      border: 'none',
                      background: timeframe === tf ? primaryPink : 'transparent',
                      color: timeframe === tf ? '#FFFFFF' : secTextColor,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div style={{ width: '100%', height: '230px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dispatchTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={primaryPink} stopOpacity={0.35}/>
                      <stop offset="95%" stopColor={primaryPink} stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A36A" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#16A36A" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={softBorderColor} vertical={false} />
                  <XAxis dataKey="time" stroke={secTextColor} fontSize={11} tickLine={false} />
                  <YAxis stroke={secTextColor} fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: cardBg, borderColor: borderColor, borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: textColor, fontWeight: 700 }}
                  />
                  <Area type="monotone" dataKey="outForDelivery" stroke={primaryPink} strokeWidth={2.5} fillOpacity={1} fill="url(#colorOut)" name="Out For Delivery" />
                  <Area type="monotone" dataKey="delivered" stroke="#16A36A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDelivered)" name="Completed Deliveries" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 40% RIGHT — COURIER PARTNER DISTRIBUTION DONUT */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(16,24,40,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: textColor }}>Delivery Partner Distribution</h3>
            <span style={{ fontSize: '11px', color: secTextColor }}>Breakdown by active logistics courier providers</span>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', margin: '12px 0' }}>
              
              {/* Donut Chart with Center Text */}
              <div style={{ width: '180px', height: '180px', position: 'relative', flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={partnerDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={78}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {partnerDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500, display: 'block' }}>Active Dispatches</span>
                  <strong style={{ fontSize: '18px', fontWeight: 800, color: primaryPink, display: 'block', marginTop: '1px' }}>18 Orders</strong>
                </div>
              </div>

              {/* Partner Breakdown List */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {partnerDistributionData.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, display: 'inline-block' }} />
                      <span style={{ color: secTextColor, fontWeight: 500 }}>{p.name}</span>
                    </div>
                    <strong style={{ color: textColor, fontWeight: 700 }}>{p.value}%</strong>
                  </div>
                ))}
              </div>

            </div>

            {/* Courier Service Guarantee Banner */}
            <div style={{ background: isDark ? 'rgba(236,22,127,0.1)' : '#FFF8FC', border: `1px solid ${pinkBorder}`, borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color={primaryPink} />
              <span style={{ fontSize: '11px', color: secTextColor }}>All StitchBee courier partners provide 100% garment insurance & live OTP verification upon doorstep delivery.</span>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 4. LIVE SHIPMENTS & DISPATCH MANAGEMENT TABLE                        */}
        {/* ==================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(16,24,40,0.03)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Table Header & Search Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            
            {/* Status Tabs */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
              {[
                { id: 'all', label: 'All Shipments', count: 18 },
                { id: 'out-for-delivery', label: 'Out for Delivery', count: 6 },
                { id: 'in-transit', label: 'In Transit', count: 5 },
                { id: 'pickup-scheduled', label: 'Pickup Scheduled', count: 4 },
                { id: 'delivered', label: 'Delivered', count: 3 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabFilter(tab.id)}
                  style={{
                    padding: '7px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '20px',
                    border: 'none',
                    background: activeTabFilter === tab.id ? primaryPink : itemBg,
                    color: activeTabFilter === tab.id ? '#FFFFFF' : secTextColor,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{tab.label}</span>
                  <span style={{ fontSize: '10px', background: activeTabFilter === tab.id ? 'rgba(255,255,255,0.25)' : borderColor, color: activeTabFilter === tab.id ? '#FFFFFF' : textColor, padding: '1px 6px', borderRadius: '10px' }}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div style={{ position: 'relative', minWidth: '240px' }}>
              <Search size={15} color={secTextColor} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search tracking ID, client, driver..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  background: itemBg,
                  color: textColor,
                  fontSize: '12px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

          </div>

          {/* Master Logistics Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}`, color: secTextColor, background: itemBg }}>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Tracking ID</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Client & Outfit</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Delivery Partner</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Route (Pickup → Destination)</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Estimated Delivery</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((ship, idx) => (
                  <tr key={ship.id} style={{ borderBottom: `1px solid ${softBorderColor}`, transition: 'background 0.2s' }}>
                    
                    {/* Tracking ID */}
                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: primaryPink, fontWeight: 700, display: 'block' }}>{ship.id}</strong>
                      <span style={{ fontSize: '10px', color: secTextColor }}>Order: {ship.orderId}</span>
                    </td>

                    {/* Client & Outfit */}
                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: textColor, fontWeight: 600, display: 'block' }}>{ship.customer}</strong>
                      <span style={{ fontSize: '11px', color: secTextColor, marginTop: '2px', display: 'block' }}>👗 {ship.outfit}</span>
                    </td>

                    {/* Delivery Partner */}
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={ship.driverAvatar} alt={ship.driver} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <strong style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block' }}>{ship.driver}</strong>
                          <span style={{ fontSize: '10px', color: secTextColor }}>{ship.courier}</span>
                        </div>
                      </div>
                    </td>

                    {/* Route */}
                    <td style={{ padding: '12px', maxWidth: '220px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: textColor, fontWeight: 500 }}>
                        <MapPin size={12} color={primaryPink} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ship.pickupLocation}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: secTextColor, marginTop: '2px', paddingLeft: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        ➔ {ship.deliveryAddress}
                      </div>
                    </td>

                    {/* Estimated Time */}
                    <td style={{ padding: '12px' }}>
                      <strong style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block' }}>{ship.estimatedTime}</strong>
                      <div style={{ width: '100px', height: '4px', background: softBorderColor, borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${ship.progress}%`, height: '100%', background: ship.progress === 100 ? '#16A36A' : primaryPink, borderRadius: '2px' }} />
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '12px' }}>
                      {ship.statusType === 'out-for-delivery' && (
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', color: '#3B82F6', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          🚚 Out for Delivery
                        </span>
                      )}
                      {ship.statusType === 'in-transit' && (
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: isDark ? 'rgba(124,58,237,0.2)' : '#F4EEFF', color: '#7C3AED', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          ⚡ In Transit
                        </span>
                      )}
                      {ship.statusType === 'pickup-scheduled' && (
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: isDark ? 'rgba(245,158,11,0.2)' : '#FFF7E6', color: '#F59E0B', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          ⏳ Pickup Scheduled
                        </span>
                      )}
                      {ship.statusType === 'delivered' && (
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: isDark ? 'rgba(22,163,106,0.2)' : '#ECFDF3', color: '#16A36A', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          ✓ Delivered
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button 
                          onClick={() => setSelectedShipment(ship)}
                          style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: 600, color: textColor, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Navigation size={12} color={primaryPink} /> Live Track
                        </button>
                        <a 
                          href={`tel:${ship.driverPhone}`}
                          style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '6px', padding: '5px 8px', color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          title="Call Driver"
                        >
                          <Phone size={13} color="#16A36A" />
                        </a>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Live Track Modal Simulation */}
      {selectedShipment && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative' }}>
            
            <button onClick={() => setSelectedShipment(null)} style={{ position: 'absolute', right: '16px', top: '16px', border: 'none', background: 'transparent', cursor: 'pointer', color: secTextColor }}>
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(236,22,127,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={22} color={primaryPink} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textColor }}>Live GPS Tracking — {selectedShipment.id}</h3>
                <span style={{ fontSize: '11px', color: secTextColor }}>Order: {selectedShipment.outfit}</span>
              </div>
            </div>

            <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img src={selectedShipment.driverAvatar} alt={selectedShipment.driver} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <strong style={{ fontSize: '14px', fontWeight: 700, color: textColor, display: 'block' }}>{selectedShipment.driver}</strong>
                  <span style={{ fontSize: '11px', color: secTextColor }}>{selectedShipment.courier} • Driver ID #DRV-901</span>
                </div>
              </div>
              <a href={`tel:${selectedShipment.driverPhone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: primaryPink, color: '#FFFFFF', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>
                <Phone size={14} /> Call Driver ({selectedShipment.driverPhone})
              </a>
            </div>

            {/* Tracking Milestones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <CheckCircle2 size={16} color="#16A36A" />
                <div>
                  <strong style={{ color: textColor }}>Garment Picked Up from Studio</strong>
                  <span style={{ fontSize: '10px', color: secTextColor, display: 'block' }}>Indiranagar Studio • 11:30 AM</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Truck size={16} color={primaryPink} />
                <div>
                  <strong style={{ color: textColor }}>Out for Doorstep Delivery</strong>
                  <span style={{ fontSize: '10px', color: primaryPink, display: 'block', fontWeight: 600 }}>Driver Ramesh is 1.8 km away</span>
                </div>
              </div>
            </div>

            <button onClick={() => setSelectedShipment(null)} style={{ width: '100%', padding: '10px', background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: textColor, cursor: 'pointer', marginTop: '20px' }}>
              Close Live Map
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
