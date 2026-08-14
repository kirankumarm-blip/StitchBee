import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Clock, CheckCircle2, Wallet, TrendingUp, Sparkles, Search, Filter, 
  ArrowUpDown, Download, Eye, Edit3, MessageSquare, MoreVertical, Calendar, ArrowUpRight, 
  ArrowDownRight, Check, X, ShieldAlert, AlertCircle, ChevronRight, Sliders, RefreshCw, 
  Phone, Mail, MapPin, User, ChevronDown, CheckCircle, Info, Layers, Tag
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import '../../styles/dashboard.css';

export default function DesignerOrdersWorkspace({ 
  theme = 'light',
  onNavigateTab
}) {
  const isDark = theme === 'dark';

  // Exact Brand Color Tokens from Specification
  const primaryPink = '#EC167F';
  const purpleAccent = '#7B2CFF';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const pageBg = isDark ? '#0D0A1A' : '#F7F8FA';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E7EAF0';
  const textColor = isDark ? '#F9FAFB' : '#172033';
  const secTextColor = isDark ? '#A0AEC0' : '#667085';
  const mutedTextColor = isDark ? '#718096' : '#98A2B3';
  const itemHoverBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#F8FAFC';
  const inputBg = isDark ? '#231D34' : '#FFFFFF';

  // State Management
  const [selectedDateRange, setSelectedDateRange] = useState('18 May – 24 May 2026');
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null); // Drawer control
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [lastUpdatedSec, setLastUpdatedSec] = useState(12);
  const [sortOrder, setSortOrder] = useState('latest');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Simulated Real-Time Seconds Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdatedSec(prev => (prev >= 59 ? 2 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Initial Sample Orders Data List
  const [ordersList, setOrdersList] = useState([
    {
      id: 'DES-101',
      orderNo: 'SB12548',
      name: 'Royal Bridal Lehenga',
      customer: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya.sharma@example.com',
      placedDate: '18 May 2026 · 10:30 AM',
      status: 'Design Pending',
      statusBg: isDark ? 'rgba(37,99,235,0.2)' : '#EFF6FF',
      statusColor: '#2563EB',
      progress: 25,
      price: 18500,
      item: 'Bridal Lehenga',
      deliveryDate: '28 May 2026',
      daysLeft: '3 days left',
      deliveryStatus: 'safe', // safe | approaching | overdue
      priority: 'High',
      image: '/images/designs/royal bridal lehenga.jpg',
      category: 'Bridal Wear',
      measurements: { bust: '34 in', waist: '28 in', hips: '38 in', shoulder: '14 in', blouseLength: '15 in', skirtLength: '42 in' },
      notes: 'Customer requested extra latkan tassels on lehenga drawstring and heavy gold zari border on dupatta.'
    },
    {
      id: 'DES-102',
      orderNo: 'SB12547',
      name: 'Zardozi Silk Anarkali',
      customer: 'Ananya Roy',
      phone: '+91 98123 45678',
      email: 'ananya.roy@example.com',
      placedDate: '17 May 2026 · 03:15 PM',
      status: 'Stitching',
      statusBg: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7',
      statusColor: '#EC167F',
      progress: 60,
      price: 14200,
      item: 'Silk Anarkali Suit',
      deliveryDate: '02 Jun 2026',
      daysLeft: '8 days left',
      deliveryStatus: 'safe',
      priority: 'Medium',
      image: '/images/designs/zardoni silk anarkali.jpg',
      category: 'Anarkali Suits',
      measurements: { bust: '36 in', waist: '30 in', hips: '40 in', shoulder: '14.5 in', suitLength: '52 in' },
      notes: 'Emerald green fabric with hand-carved pearl embroidery on sleeves.'
    },
    {
      id: 'DES-103',
      orderNo: 'SB12546',
      name: 'Embroidered Velvet Sherwani',
      customer: 'Amit Verma',
      phone: '+91 99887 76655',
      email: 'amit.verma@example.com',
      placedDate: '16 May 2026 · 11:45 AM',
      status: 'Active',
      statusBg: isDark ? 'rgba(247,144,9,0.2)' : '#FFF7ED',
      statusColor: '#F79009',
      progress: 40,
      price: 22000,
      item: 'Velvet Sherwani',
      deliveryDate: '10 Jun 2026',
      daysLeft: '16 days left',
      deliveryStatus: 'safe',
      priority: 'High',
      image: '/images/designs/velvet shervani.jpg',
      category: 'Groomswear',
      measurements: { chest: '40 in', waist: '34 in', shoulder: '18 in', jacketLength: '40 in', sleeveLength: '25 in' },
      notes: 'Royal navy velvet sherwani with handcrafted zardozi buttons.'
    },
    {
      id: 'DES-104',
      orderNo: 'SB12545',
      name: 'Chanderi Silk Saree',
      customer: 'Sneha Iyer',
      phone: '+91 97654 32109',
      email: 'sneha.iyer@example.com',
      placedDate: '15 May 2026 · 04:20 PM',
      status: 'Ready',
      statusBg: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3',
      statusColor: '#12B76A',
      progress: 90,
      price: 8900,
      item: 'Chanderi Saree & Blouse',
      deliveryDate: '25 May 2026',
      daysLeft: 'Due tomorrow',
      deliveryStatus: 'approaching',
      priority: 'High',
      image: '/images/designs/chanderi silk saree.jpg',
      category: 'Ethnic Sarees',
      measurements: { bust: '32 in', waist: '26 in', shoulder: '13.5 in', blouseLength: '14 in' },
      notes: 'Custom padded blouse with boat neck & elbow-length sleeves.'
    },
    {
      id: 'DES-105',
      orderNo: 'SB12544',
      name: 'Reception Gown',
      customer: 'Riya Kapoor',
      phone: '+91 96543 21098',
      email: 'riya.kapoor@example.com',
      placedDate: '14 May 2026 · 01:10 PM',
      status: 'Completed',
      statusBg: isDark ? 'rgba(22,163,74,0.2)' : '#F0FDF4',
      statusColor: '#16A34A',
      progress: 100,
      price: 16500,
      item: 'Indo-Western Gown',
      deliveryDate: '20 May 2026',
      daysLeft: 'Delivered',
      deliveryStatus: 'safe',
      priority: 'Medium',
      image: '/images/designs/reception gown.jpg',
      category: 'Indo-Western',
      measurements: { bust: '35 in', waist: '29 in', hips: '39 in', height: '5 ft 6 in' },
      notes: 'Delivered and approved during client trial fitting.'
    },
    {
      id: 'DES-106',
      orderNo: 'SB12543',
      name: 'Pastel Lehenga',
      customer: 'Meera Joshi',
      phone: '+91 95432 10987',
      email: 'meera.joshi@example.com',
      placedDate: '12 May 2026 · 09:50 AM',
      status: 'New Requests',
      statusBg: isDark ? 'rgba(123,44,255,0.2)' : '#F4F0FF',
      statusColor: '#7B2CFF',
      progress: 10,
      price: 13900,
      item: 'Pastel Silk Lehenga',
      deliveryDate: '01 Jun 2026',
      daysLeft: '7 days left',
      deliveryStatus: 'safe',
      priority: 'Low',
      image: '/images/designs/pastel lehenga.jpg',
      category: 'Bridal Wear',
      measurements: { bust: '33 in', waist: '27 in', hips: '37 in', shoulder: '14 in' },
      notes: 'Initial request received via StitchBee Customer App.'
    },
    {
      id: 'DES-107',
      orderNo: 'SB12542',
      name: 'Embroidered Kurta Set',
      customer: 'Karan Malhotra',
      phone: '+91 94321 09876',
      email: 'karan.m@example.com',
      placedDate: '10 May 2026 · 05:30 PM',
      status: 'Stitching',
      statusBg: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7',
      statusColor: '#EC167F',
      progress: 75,
      price: 11500,
      item: 'Silk Kurta Pajama',
      deliveryDate: '22 May 2026',
      daysLeft: 'Overdue by 2 days',
      deliveryStatus: 'overdue',
      priority: 'High',
      image: '/images/designs/men kurta set.jpg',
      category: 'Menswear',
      measurements: { chest: '38 in', waist: '32 in', shoulder: '17.5 in' },
      notes: 'Urgent order for wedding event.'
    },
    {
      id: 'DES-108',
      orderNo: 'SB12541',
      name: 'Kids Party Dress',
      customer: 'Pooja Singh',
      phone: '+91 93210 98765',
      email: 'pooja.s@example.com',
      placedDate: '08 May 2026 · 11:00 AM',
      status: 'Completed',
      statusBg: isDark ? 'rgba(22,163,74,0.2)' : '#F0FDF4',
      statusColor: '#16A34A',
      progress: 100,
      price: 4200,
      item: 'Tulle Party Gown',
      deliveryDate: '15 May 2026',
      daysLeft: 'Delivered',
      deliveryStatus: 'safe',
      priority: 'Low',
      image: '/images/designs/kids party wear.jpg',
      category: 'Kids Wear',
      measurements: { chest: '24 in', waist: '22 in', length: '28 in' },
      notes: 'Delivered smoothly.'
    }
  ]);

  // Recharts Real-Time Data Setup
  const lineChartData = [
    { day: '18 May', total: 10, completed: 4 },
    { day: '19 May', total: 15, completed: 5 },
    { day: '20 May', total: 22, completed: 7 },
    { day: '21 May', total: 28, completed: 8 },
    { day: '22 May', total: 45, completed: 18 },
    { day: '23 May', total: 38, completed: 12 },
    { day: '24 May', total: 35, completed: 6 }
  ];

  const donutChartData = [
    { name: 'New Requests', value: 7, count: 7, percentage: '29%', color: '#7B2CFF' },
    { name: 'Active', value: 8, count: 8, percentage: '33%', color: '#F79009' },
    { name: 'Design Pending', value: 4, count: 4, percentage: '17%', color: '#3B82F6' },
    { name: 'Stitching', value: 3, count: 3, percentage: '13%', color: '#EC167F' },
    { name: 'Ready', value: 2, count: 2, percentage: '8%', color: '#12B76A' }
  ];

  const barChartData = [
    { day: '18 May', revenue: 18500, orders: 3, avg: 6166 },
    { day: '19 May', revenue: 24000, orders: 4, avg: 6000 },
    { day: '20 May', revenue: 19800, orders: 3, avg: 6600 },
    { day: '21 May', revenue: 29500, orders: 5, avg: 5900 },
    { day: '22 May', revenue: 32450, orders: 5, avg: 6490 },
    { day: '23 May', revenue: 41000, orders: 6, avg: 6833 },
    { day: '24 May', revenue: 28500, orders: 4, avg: 7125 }
  ];

  // Filter & Search Logic
  const filteredOrders = ordersList.filter(ord => {
    const matchesTab = activeTab === 'All Orders' || ord.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = ord.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ord.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ord.orderNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || ord.priority.toLowerCase() === selectedPriority.toLowerCase();
    return matchesTab && matchesSearch && matchesPriority;
  });

  return (
    <div style={{
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: pageBg,
      color: textColor,
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      boxSizing: 'border-box',
      padding: '20px 24px'
    }}>
      
      {/* 100% Full Width Screen Container */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* ==================================================================== */}
        {/* 1. PAGE HEADER (Designer Orders ✦ & Export Report)                   */}
        {/* ==================================================================== */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, lineHeight: '32px', color: textColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
              Designer Orders <span style={{ color: primaryPink }}>✦</span>
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: secTextColor, fontWeight: 400 }}>
              Manage and track all designer orders in real-time
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            
            {/* Date Range Selector Dropdown */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              height: '40px',
              padding: '0 14px',
              borderRadius: '9px',
              border: `1px solid ${borderColor}`,
              background: cardBg,
              fontSize: '13px',
              fontWeight: 600,
              color: textColor,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(16,24,40,0.02)'
            }}>
              <Calendar size={15} color={secTextColor} />
              <span>{selectedDateRange}</span>
              <ChevronDown size={14} color={secTextColor} />
            </div>

            {/* Primary Export Report Button */}
            <button 
              onClick={() => alert("Exporting real-time orders report (PDF/CSV)...")}
              style={{
                height: '40px',
                padding: '0 18px',
                background: primaryPink,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(236,22,127,0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              <Download size={15} color="#FFFFFF" /> <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Export Report</span>
            </button>

          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. REAL-TIME OPERATIONAL STATUS BAR (Slim Strip)                     */}
        {/* ==================================================================== */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 2px 8px rgba(16,24,40,0.03)',
          fontSize: '12px',
          fontWeight: 500
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#12B76A',
              display: 'inline-block',
              boxShadow: '0 0 0 3px rgba(18,183,106,0.25)'
            }} />
            <strong style={{ color: '#12B76A', fontWeight: 600 }}>Live Data</strong>
            <span style={{ color: mutedTextColor }}>•</span>
            <span style={{ color: secTextColor }}>Last updated {lastUpdatedSec} seconds ago</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: textColor, fontWeight: 600, flexWrap: 'wrap' }}>
            <span><strong style={{ color: primaryPink }}>24</strong> total orders</span>
            <span style={{ color: mutedTextColor }}>•</span>
            <span><strong style={{ color: '#F79009' }}>8</strong> active</span>
            <span style={{ color: mutedTextColor }}>•</span>
            <span><strong style={{ color: primaryPink }}>3</strong> currently stitching</span>
            <span style={{ color: mutedTextColor }}>•</span>
            <span><strong style={{ color: '#3B82F6' }}>2</strong> ready for fitting</span>
            <span style={{ color: mutedTextColor }}>•</span>
            <span><strong style={{ color: '#12B76A' }}>3</strong> deliveries today</span>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 3. KPI SECTION (5 EQUAL COLUMNS DESKTOP CARDS WITH SPARK LINES)     */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          width: '100%'
        }}>
          
          {/* KPI 1 — Total Orders */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Total Orders</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>24</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(123,44,255,0.2)' : '#F4F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={20} color={purpleAccent} />
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +16.7% <span style={{ color: secTextColor, fontWeight: 400 }}>from last week</span>
              </span>
              
              {/* Mini Sparkline SVG */}
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 14L10 10L20 15L30 6L46 2" stroke="#7B2CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* KPI 2 — Active Orders */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Active Orders</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>8</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(247,144,9,0.2)' : '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={20} color="#F79009" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +33.3% <span style={{ color: secTextColor, fontWeight: 400 }}>from last week</span>
              </span>
              
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 16L12 12L22 14L32 6L46 3" stroke="#F79009" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* KPI 3 — Completed Orders */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Completed Orders</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>12</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={20} color="#12B76A" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +20% <span style={{ color: secTextColor, fontWeight: 400 }}>from last week</span>
              </span>
              
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 15L14 11L24 13L34 5L46 2" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* KPI 4 — Total Revenue */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Total Revenue</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>₹1,48,700</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={20} color="#3B82F6" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +18.4% <span style={{ color: secTextColor, fontWeight: 400 }}>from last week</span>
              </span>
              
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 16L12 10L22 14L32 4L46 2" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* KPI 5 — Average Order Value */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Avg. Order Value</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>₹6,195</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(123,44,255,0.2)' : '#F4F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={20} color={purpleAccent} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +8.5% <span style={{ color: secTextColor, fontWeight: 400 }}>from last week</span>
              </span>
              
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 14L14 12L24 15L34 7L46 4" stroke="#7B2CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 4. PRIMARY ANALYTICS SECTION (40% / 30% / 30% GRID DESKTOP)          */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '40% 30% 30%',
          gap: '20px',
          width: '100%',
          alignItems: 'stretch'
        }}>
          
          {/* Chart 1 — Orders Overview (Line/Area Chart) */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Orders Overview <Info size={14} color={mutedTextColor} />
                </h3>
                <span style={{ fontSize: '12px', color: secTextColor }}>Order activity over the selected period</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: secTextColor, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: primaryPink }} /> Total Orders
                </span>
                <span style={{ fontSize: '11px', color: secTextColor, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: purpleAccent }} /> Completed
                </span>
              </div>
            </div>

            <div style={{ width: '100%', height: '230px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={primaryPink} stopOpacity={0.25}/>
                      <stop offset="95%" stopColor={primaryPink} stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={purpleAccent} stopOpacity={0.25}/>
                      <stop offset="95%" stopColor={purpleAccent} stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#EEF0F4'} vertical={false} />
                  <XAxis dataKey="day" stroke={mutedTextColor} fontSize={11} tickLine={false} />
                  <YAxis stroke={mutedTextColor} fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{
                      background: isDark ? '#1F1B2E' : '#172033',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                    }}
                    itemStyle={{ color: '#FFFFFF' }}
                  />
                  <Area type="monotone" dataKey="total" stroke={primaryPink} strokeWidth={2.5} fillOpacity={1} fill="url(#colorTotal)" />
                  <Area type="monotone" dataKey="completed" stroke={purpleAccent} strokeWidth={2.5} fillOpacity={1} fill="url(#colorCompleted)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 — Order Status Distribution (Donut Chart) */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600, color: textColor }}>
              Order Status Distribution
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              
              {/* Donut Chart with Center Label */}
              <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={62}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {donutChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}>
                  <strong style={{ fontSize: '20px', fontWeight: 700, color: textColor, display: 'block', lineHeight: 1 }}>24</strong>
                  <span style={{ fontSize: '10px', color: secTextColor }}>Total</span>
                </div>
              </div>

              {/* Status Counts & Percentages Legend List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                {donutChartData.map(item => (
                  <div 
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      cursor: 'pointer',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                      <span style={{ color: textColor, fontWeight: 500 }}>{item.name}</span>
                    </div>
                    <span style={{ color: secTextColor, fontWeight: 600 }}>{item.count} <span style={{ color: mutedTextColor, fontWeight: 400 }}>({item.percentage})</span></span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Chart 3 — Revenue Overview (Bar Chart) */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: textColor }}>Revenue Overview</h3>
                <span style={{ fontSize: '11px', color: '#12B76A', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <ArrowUpRight size={13} /> +18.4%
                </span>
              </div>
              <strong style={{ fontSize: '22px', fontWeight: 700, color: textColor, display: 'block', marginTop: '4px' }}>₹1,48,700</strong>
            </div>

            <div style={{ width: '100%', height: '170px', marginTop: '10px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#EEF0F4'} vertical={false} />
                  <XAxis dataKey="day" stroke={mutedTextColor} fontSize={10} tickLine={false} />
                  <YAxis stroke={mutedTextColor} fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{
                      background: isDark ? '#1F1B2E' : '#172033',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                    }}
                    formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill={primaryPink} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 5. SECONDARY ANALYTICS ROW (COMPLETION RATE, AVG TIME, ON-TIME)    */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          width: '100%'
        }}>
          
          {/* Secondary 1 — Completion Rate */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '12px', color: secTextColor, fontWeight: 500 }}>Completion Rate</span>
              <strong style={{ fontSize: '24px', fontWeight: 700, color: textColor, display: 'block', marginTop: '2px' }}>82%</strong>
              <span style={{ fontSize: '11px', color: '#12B76A', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                <ArrowUpRight size={13} /> +6.4% <span style={{ color: secTextColor, fontWeight: 400 }}>vs last week</span>
              </span>
            </div>
            
            {/* SVG Progress Ring */}
            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" stroke={isDark ? 'rgba(255,255,255,0.1)' : '#EAEFF5'} strokeWidth="5" fill="none" />
                <circle cx="28" cy="28" r="22" stroke="#12B76A" strokeWidth="5" fill="none" strokeDasharray="138" strokeDashoffset="25" strokeLinecap="round" transform="rotate(-90 28 28)" />
              </svg>
            </div>
          </div>

          {/* Secondary 2 — Average Completion Time */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '12px', color: secTextColor, fontWeight: 500 }}>Average Completion Time</span>
              <strong style={{ fontSize: '24px', fontWeight: 700, color: textColor, display: 'block', marginTop: '2px' }}>6.2 Days</strong>
              <span style={{ fontSize: '11px', color: '#12B76A', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                <ArrowDownRight size={13} /> ↓ 5% <span style={{ color: secTextColor, fontWeight: 400 }}>faster completion</span>
              </span>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={22} color="#12B76A" />
            </div>
          </div>

          {/* Secondary 3 — On-Time Delivery */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '12px', color: secTextColor, fontWeight: 500 }}>On-Time Delivery</span>
              <strong style={{ fontSize: '24px', fontWeight: 700, color: textColor, display: 'block', marginTop: '2px' }}>94%</strong>
              <span style={{ fontSize: '11px', color: '#12B76A', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                <ArrowUpRight size={13} /> +3.2% <span style={{ color: secTextColor, fontWeight: 400 }}>this month</span>
              </span>
            </div>

            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="22" stroke={isDark ? 'rgba(255,255,255,0.1)' : '#EAEFF5'} strokeWidth="5" fill="none" />
                <circle cx="28" cy="28" r="22" stroke={primaryPink} strokeWidth="5" fill="none" strokeDasharray="138" strokeDashoffset="8" strokeLinecap="round" transform="rotate(-90 28 28)" />
              </svg>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 6. ORDER MANAGEMENT SECTION (STATUS TABS, SEARCH, FILTER, TABLE)    */}
        {/* ==================================================================== */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          
          {/* Row A — Status Tabs & Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '4px' }}>
            
            {/* Status Filter Tabs */}
            <div style={{ display: 'flex', gap: '18px', overflowX: 'auto' }}>
              {[
                { id: 'All Orders', label: 'All Orders', count: ordersList.length },
                { id: 'New Requests', label: 'New Requests', count: 7, badgeBg: '#7B2CFF' },
                { id: 'Active', label: 'Active', count: 8, badgeBg: '#F79009' },
                { id: 'Design Pending', label: 'Design Pending', count: 4, badgeBg: '#3B82F6' },
                { id: 'Stitching', label: 'Stitching', count: 3, badgeBg: primaryPink },
                { id: 'Ready', label: 'Ready', count: 2, badgeBg: '#12B76A' },
                { id: 'Completed', label: 'Completed', count: 12, badgeBg: '#16A34A' },
                { id: 'Cancelled', label: 'Cancelled', count: 0, badgeBg: '#F04438' }
              ].map(tab => {
                const isActive = activeTab.toLowerCase() === tab.id.toLowerCase();
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      height: '42px',
                      padding: '0 4px 12px 4px',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 500,
                      border: 'none',
                      borderBottom: isActive ? `2px solid ${primaryPink}` : '2px solid transparent',
                      background: 'transparent',
                      color: isActive ? primaryPink : secTextColor,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '2px 7px',
                        borderRadius: '10px',
                        background: isActive ? '#FFF0F7' : (isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9'),
                        color: isActive ? primaryPink : secTextColor
                      }}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search Field & Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              
              {/* Search Field (280px width, 40px height) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 14px',
                height: '40px',
                borderRadius: '9px',
                border: `1px solid ${borderColor}`,
                background: inputBg,
                width: '280px'
              }}>
                <Search size={15} color={mutedTextColor} />
                <input 
                  type="text"
                  placeholder="Search order ID, customer or item..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: textColor, width: '100%' }}
                />
              </div>

              {/* Filter Button */}
              <button 
                onClick={() => setIsFilterDrawerOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  height: '40px',
                  padding: '0 14px',
                  borderRadius: '9px',
                  border: `1px solid ${borderColor}`,
                  background: inputBg,
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Filter size={14} color={textColor} /> Filter
              </button>

              {/* Sort Button */}
              <button 
                onClick={() => setSortOrder(sortOrder === 'latest' ? 'oldest' : 'latest')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  height: '40px',
                  padding: '0 14px',
                  borderRadius: '9px',
                  border: `1px solid ${borderColor}`,
                  background: inputBg,
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ArrowUpDown size={14} color={textColor} /> Sort
              </button>

            </div>

          </div>

          {/* Row B — COMPACT PREMIUM ORDER TABLE */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${borderColor}`, fontSize: '11px', fontWeight: 600, color: secTextColor, letterSpacing: '0.04em' }}>
                  <th style={{ padding: '12px 16px', width: '28%' }}>ORDER DETAILS</th>
                  <th style={{ padding: '12px 16px', width: '26%' }}>STATUS & PROGRESS</th>
                  <th style={{ padding: '12px 16px', width: '18%' }}>ITEM & PRICE</th>
                  <th style={{ padding: '12px 16px', width: '16%' }}>DELIVERY</th>
                  <th style={{ padding: '12px 16px', width: '12%', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <ShoppingBag size={32} color={mutedTextColor} />
                        <strong style={{ fontSize: '14px', color: textColor }}>No orders found</strong>
                        <span style={{ fontSize: '12px', color: secTextColor }}>Try changing your search query or filter selection.</span>
                        <button 
                          onClick={() => { setActiveTab('All Orders'); setSearchQuery(''); setSelectedPriority('all'); }}
                          style={{ marginTop: '8px', padding: '6px 14px', borderRadius: '8px', background: primaryPink, color: '#fff', border: 'none', fontSize: '12px', cursor: 'pointer' }}
                        >
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(ord => (
                    <tr 
                      key={ord.id} 
                      style={{ borderBottom: `1px solid ${borderColor}`, transition: 'background 0.15s ease' }}
                      className="order-table-row-hover"
                    >
                      
                      {/* Col 1 — Order Details */}
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img src={ord.image} alt={ord.name} style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                          <div>
                            <strong style={{ fontSize: '14px', fontWeight: 600, color: textColor, display: 'block', lineHeight: 1.3 }}>{ord.name}</strong>
                            <span style={{ fontSize: '12px', color: secTextColor, display: 'block', marginTop: '2px' }}>Order #{ord.orderNo} • <span style={{ fontWeight: 600, color: textColor }}>{ord.customer}</span></span>
                            <span style={{ fontSize: '11px', color: mutedTextColor, marginTop: '3px', display: 'block' }}>Placed on {ord.placedDate}</span>
                          </div>
                        </div>
                      </td>

                      {/* Col 2 — Status & Workflow Progress */}
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          
                          {/* Status Badge */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              background: ord.statusBg,
                              color: ord.statusColor,
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '3px 10px',
                              borderRadius: '6px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              ● {ord.status}
                            </span>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: primaryPink }}>{ord.progress}%</span>
                          </div>

                          {/* 4-Stage Horizontal Workflow Indicator */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: secTextColor }}>
                            <span style={{ color: ord.progress >= 25 ? '#12B76A' : secTextColor, fontWeight: ord.progress >= 25 ? 600 : 400 }}>Design</span>
                            <span style={{ width: '16px', height: '2px', background: ord.progress >= 50 ? '#12B76A' : borderColor }} />
                            <span style={{ color: ord.progress >= 50 ? '#12B76A' : secTextColor, fontWeight: ord.progress >= 50 ? 600 : 400 }}>Stitching</span>
                            <span style={{ width: '16px', height: '2px', background: ord.progress >= 75 ? '#12B76A' : borderColor }} />
                            <span style={{ color: ord.progress >= 75 ? '#12B76A' : secTextColor, fontWeight: ord.progress >= 75 ? 600 : 400 }}>Finishing</span>
                            <span style={{ width: '16px', height: '2px', background: ord.progress >= 100 ? '#12B76A' : borderColor }} />
                            <span style={{ color: ord.progress >= 100 ? '#12B76A' : secTextColor, fontWeight: ord.progress >= 100 ? 600 : 400 }}>Delivery</span>
                          </div>

                        </div>
                      </td>

                      {/* Col 3 — Item & Price */}
                      <td style={{ padding: '16px' }}>
                        <div>
                          <span style={{ fontSize: '12px', color: secTextColor, display: 'block' }}>{ord.item}</span>
                          <strong style={{ fontSize: '16px', fontWeight: 700, color: primaryPink, display: 'block', marginTop: '2px' }}>
                            ₹{ord.price.toLocaleString()}
                          </strong>
                          <span 
                            onClick={() => setSelectedOrder(ord)}
                            style={{ fontSize: '11px', color: primaryPink, fontWeight: 600, cursor: 'pointer', display: 'inline-block', marginTop: '3px', textDecoration: 'none' }}
                          >
                            View Details
                          </span>
                        </div>
                      </td>

                      {/* Col 4 — Delivery Date & Status */}
                      <td style={{ padding: '16px' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: secTextColor, display: 'block' }}>Delivery by</span>
                          <strong style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block', marginTop: '1px' }}>
                            {ord.deliveryDate}
                          </strong>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: ord.deliveryStatus === 'overdue' ? '#F04438' : (ord.deliveryStatus === 'approaching' ? '#F79009' : '#12B76A'),
                            marginTop: '2px',
                            display: 'block'
                          }}>
                            {ord.daysLeft}
                          </span>
                        </div>
                      </td>

                      {/* Col 5 — Action Circular Icon Buttons (36x36px) */}
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <button 
                            onClick={() => setSelectedOrder(ord)}
                            title="View Details"
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              border: `1px solid ${borderColor}`,
                              background: cardBg,
                              color: textColor,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <Eye size={15} color={textColor} />
                          </button>
                          <button 
                            onClick={() => alert(`Edit Order #${ord.orderNo}`)}
                            title="Edit Order"
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              border: `1px solid ${borderColor}`,
                              background: cardBg,
                              color: textColor,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <Edit3 size={15} color={textColor} />
                          </button>
                          <button 
                            onClick={() => setSelectedOrder(ord)}
                            title="More Options"
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              border: `1px solid ${borderColor}`,
                              background: cardBg,
                              color: textColor,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <MoreVertical size={15} color={textColor} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 7. BOTTOM ROW: WEEKLY PERFORMANCE SUMMARY + PERFORMANCE INSIGHT CARD */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '70% 30%',
          gap: '20px',
          width: '100%',
          alignItems: 'stretch'
        }}>
          
          {/* Col 1 — Weekly Performance Summary Card */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: textColor }}>This Week Summary</h3>
              <span style={{ fontSize: '12px', color: secTextColor }}>18 May – 24 May 2026</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: secTextColor, display: 'block' }}>Orders Completed</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <strong style={{ fontSize: '22px', fontWeight: 700, color: textColor }}>12</strong>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    <ArrowUpRight size={13} /> 20%
                  </span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: secTextColor, display: 'block' }}>Revenue Earned</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <strong style={{ fontSize: '22px', fontWeight: 700, color: textColor }}>₹1,48,700</strong>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    <ArrowUpRight size={13} /> 18.4%
                  </span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: secTextColor, display: 'block' }}>Avg. Completion Time</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <strong style={{ fontSize: '22px', fontWeight: 700, color: textColor }}>6.2 Days</strong>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    <ArrowDownRight size={13} /> 5%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2 — Visually Distinct Pink Performance Insight Card */}
          <div style={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(236,22,127,0.18) 0%, rgba(123,44,255,0.18) 100%)' 
              : 'linear-gradient(135deg, #FFF0F7 0%, #F7F0FF 100%)',
            border: isDark ? '1px solid rgba(236,22,127,0.3)' : '1px solid rgba(236,22,127,0.15)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 18px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
                Keep up the great work! ✨
              </h4>
              <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: secTextColor, lineHeight: 1.4 }}>
                You're doing <strong style={{ color: primaryPink, fontWeight: 700 }}>18.4%</strong> better than last week.
              </p>
            </div>

            {/* Sparkline curve visualization */}
            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
                <path d="M2 28C20 28 30 18 50 20C70 22 80 8 118 4" stroke={primaryPink} strokeWidth="3" strokeLinecap="round" />
              </svg>

              <button style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: primaryPink,
                color: '#FFFFFF',
                border: 'none',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(236,22,127,0.25)'
              }}>
                View Performance
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 8. RIGHT-SIDE ORDER DETAIL DRAWER (480px Slide-Over Panel)          */}
      {/* ==================================================================== */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '480px',
          background: cardBg,
          boxShadow: '-8px 0 32px rgba(15,23,42,0.18)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          padding: '24px',
          gap: '20px',
          borderLeft: `1px solid ${borderColor}`
        }}>
          
          {/* Drawer Top Row: Header & Close */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', color: primaryPink, fontWeight: 700 }}>ORDER #{selectedOrder.orderNo}</span>
              <h2 style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: 700, color: textColor }}>{selectedOrder.name}</h2>
            </div>
            <button 
              onClick={() => setSelectedOrder(null)}
              style={{ background: 'transparent', border: 'none', color: secTextColor, cursor: 'pointer', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Product Thumbnail & Price Header */}
          <div style={{ display: 'flex', gap: '16px', background: itemHoverBg, padding: '14px', borderRadius: '12px', border: `1px solid ${borderColor}` }}>
            <img src={selectedOrder.image} alt={selectedOrder.name} style={{ width: '80px', height: '100px', borderRadius: '10px', objectFit: 'cover' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '14px', color: textColor, display: 'block' }}>{selectedOrder.item}</strong>
                <span style={{ fontSize: '12px', color: secTextColor }}>Category: {selectedOrder.category}</span>
              </div>
              <div>
                <strong style={{ fontSize: '20px', color: primaryPink, fontWeight: 700 }}>₹{selectedOrder.price.toLocaleString()}</strong>
                <div style={{ fontSize: '11px', color: '#12B76A', fontWeight: 600, marginTop: '2px' }}>
                  ● {selectedOrder.status} ({selectedOrder.progress}%)
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info Card */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} color={primaryPink} /> Customer Information
            </h4>
            <div style={{ fontSize: '12px', color: textColor, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>Name:</strong> {selectedOrder.customer}</div>
              <div><strong>Phone:</strong> {selectedOrder.phone}</div>
              <div><strong>Email:</strong> {selectedOrder.email}</div>
              <div><strong>Delivery Target:</strong> {selectedOrder.deliveryDate} ({selectedOrder.daysLeft})</div>
            </div>
          </div>

          {/* Workflow Progress Timeline */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} color={primaryPink} /> Workflow Timeline
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#12B76A' }}>
                <CheckCircle size={15} /> <span>Order Placed — {selectedOrder.placedDate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#12B76A' }}>
                <CheckCircle size={15} /> <span>Design Approved by Customer</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: primaryPink, fontWeight: 600 }}>
                <Clock size={15} /> <span>Stitching at Atelier ({selectedOrder.progress}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: mutedTextColor }}>
                <span style={{ width: '15px', height: '15px', borderRadius: '50%', border: `2px solid ${borderColor}`, display: 'inline-block' }} /> <span>Fitting & Trial Session</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: mutedTextColor }}>
                <span style={{ width: '15px', height: '15px', borderRadius: '50%', border: `2px solid ${borderColor}`, display: 'inline-block' }} /> <span>Final Dispatch & Delivery</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto', paddingTop: '10px' }}>
            <button 
              onClick={() => alert(`Messaging ${selectedOrder.customer}...`)}
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '9px',
                border: 'none',
                background: primaryPink,
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <MessageSquare size={16} color="#FFFFFF" /> Message Customer
            </button>
            
            <button 
              onClick={() => setSelectedOrder(null)}
              style={{
                width: '100%',
                height: '38px',
                borderRadius: '9px',
                border: `1px solid ${borderColor}`,
                background: cardBg,
                color: textColor,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Close Panel
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
