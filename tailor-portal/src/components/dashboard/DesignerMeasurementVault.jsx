import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Box, Ruler, Target, Search, Filter, ChevronDown, 
  Download, Eye, Edit3, MoreVertical, CheckCircle2, Clock, Calendar, 
  Sparkles, ArrowUpRight, ArrowDownRight, Plus, Check, X, Info, Layers,
  ShieldCheck, RefreshCw, FileText, Camera, Upload, ExternalLink, HelpCircle
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import '../../styles/dashboard.css';

export default function DesignerMeasurementVault({ 
  theme = 'light',
  onNavigateTab
}) {
  const isDark = theme === 'dark';

  // Brand Colors
  const primaryPink = '#EC167F';
  const secondaryPurple = '#7B2CFF';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const pageBg = isDark ? '#0D0A1A' : '#F7F8FA';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E7EAF0';
  const textColor = isDark ? '#F9FAFB' : '#172033';
  const secTextColor = isDark ? '#A0AEC0' : '#667085';
  const mutedTextColor = isDark ? '#718096' : '#98A2B3';
  const itemHoverBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#F8FAFC';
  const inputBg = isDark ? '#231D34' : '#FFFFFF';

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeasurementType, setSelectedMeasurementType] = useState('All');
  const [selectedDesignerFilter, setSelectedDesignerFilter] = useState('All Designers');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 30 Days');
  const [selectedCustomerId, setSelectedCustomerId] = useState('CUST-1024');
  const [activeProfileTab, setActiveProfileTab] = useState('Overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState('manual'); // 'manual' | '3d' | 'import'
  const [lastSyncedSec, setLastSyncedSec] = useState(12);

  // Simulated Seconds Counter for Live Strip
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSyncedSec(prev => (prev >= 59 ? 3 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Customer Profiles Database List
  const [customersList, setCustomersList] = useState([
    {
      id: 'CUST-1024',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      location: 'Delhi, India',
      is3DScan: true,
      isVerified: true,
      avatar: '/images/customers/priya sharma.jpg',
      bust: '36"',
      waist: '30"',
      hips: '39"',
      shoulder: '14.5"',
      armLength: '22.5"',
      topLength: '15"',
      inseam: '28"',
      height: "5'5\"",
      totalCount: 24,
      type: 'Full Body',
      typeBadgeBg: isDark ? 'rgba(123,44,255,0.2)' : '#F4F0FF',
      typeBadgeColor: '#7B2CFF',
      lastUpdatedDate: '22 May 2026',
      lastUpdatedTime: '10:30 AM',
      source: '3D Body Scan',
      measuredBy: 'Ananya Roy',
      accuracy: '98.7%',
      notes: 'Customer prefers a slightly looser armhole for lehenga blouse movement.'
    },
    {
      id: 'CUST-1088',
      name: 'Ananya Roy',
      phone: '+91 91234 56789',
      email: 'ananya.roy@email.com',
      location: 'Kolkata, India',
      is3DScan: false,
      isVerified: true,
      avatar: '/images/customers/Ananya Roy.jpg',
      bust: '34"',
      waist: '28"',
      hips: '37"',
      shoulder: '14.0"',
      armLength: '21.5"',
      topLength: '14.5"',
      inseam: '27.5"',
      height: "5'4\"",
      totalCount: 22,
      type: 'Full Body',
      typeBadgeBg: isDark ? 'rgba(123,44,255,0.2)' : '#F4F0FF',
      typeBadgeColor: '#7B2CFF',
      lastUpdatedDate: '21 May 2026',
      lastUpdatedTime: '03:15 PM',
      source: 'Manual Tape Measure',
      measuredBy: 'Ananya Roy',
      accuracy: '96.5%',
      notes: 'Anarkali suit length set for 3-inch heels.'
    },
    {
      id: 'CUST-2041',
      name: 'Neha Verma',
      phone: '+91 99876 54321',
      email: 'neha.v@email.com',
      location: 'Mumbai, India',
      is3DScan: true,
      isVerified: true,
      avatar: '/images/customers/neha verma.jpg',
      bust: '40"',
      waist: '34"',
      hips: '42"',
      shoulder: '15.0"',
      armLength: '23.0"',
      topLength: '16"',
      inseam: '29"',
      height: "5'7\"",
      totalCount: 26,
      type: '3D Body Scan',
      typeBadgeBg: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF',
      typeBadgeColor: '#3B82F6',
      lastUpdatedDate: '20 May 2026',
      lastUpdatedTime: '11:20 AM',
      source: '3D Body Scan App',
      measuredBy: 'System AI',
      accuracy: '99.1%',
      notes: 'Full 3D avatar generated with exact torso curvature.'
    },
    {
      id: 'CUST-3045',
      name: 'Kavya Iyer',
      phone: '+91 90909 11223',
      email: 'kavya.i@email.com',
      location: 'Chennai, India',
      is3DScan: false,
      isVerified: false,
      avatar: '/images/customers/kavya iyer.jpg',
      bust: '32"',
      waist: '26"',
      hips: '35"',
      shoulder: '13.5"',
      armLength: '21.0"',
      topLength: '14"',
      inseam: '27"',
      height: "5'3\"",
      totalCount: 20,
      type: 'Upper Body',
      typeBadgeBg: isDark ? 'rgba(247,144,9,0.2)' : '#FFF7ED',
      typeBadgeColor: '#F79009',
      lastUpdatedDate: '19 May 2026',
      lastUpdatedTime: '09:45 AM',
      source: 'Manual Verification',
      measuredBy: 'Pooja Singh',
      accuracy: '95.0%',
      notes: 'Pending final waistline fitting verification.'
    },
    {
      id: 'CUST-4050',
      name: 'Ritika Singh',
      phone: '+91 80808 33445',
      email: 'ritika.s@email.com',
      location: 'Bengaluru, India',
      is3DScan: true,
      isVerified: true,
      avatar: '/images/customers/ritik malhotra.jpg',
      bust: '38"',
      waist: '32"',
      hips: '41"',
      shoulder: '14.5"',
      armLength: '22.0"',
      topLength: '15.5"',
      inseam: '28.5"',
      height: "5'6\"",
      totalCount: 25,
      type: '3D Body Scan',
      typeBadgeBg: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF',
      typeBadgeColor: '#3B82F6',
      lastUpdatedDate: '18 May 2026',
      lastUpdatedTime: '06:30 PM',
      source: '3D Body Scan',
      measuredBy: 'System AI',
      accuracy: '98.9%',
      notes: 'High precision scan verified for heavy bridal gown.'
    }
  ]);

  const activeCustomer = customersList.find(c => c.id === selectedCustomerId) || customersList[0];

  // Donut Chart Data — Measurement Types
  const donutTypesData = [
    { name: 'Full Body', count: 48, percentage: '37.5%', value: 48, color: '#7B2CFF' },
    { name: '3D Body Scan', count: 42, percentage: '32.8%', value: 42, color: '#3B82F6' },
    { name: 'Upper Body', count: 22, percentage: '17.2%', value: 22, color: '#F79009' },
    { name: 'Lower Body', count: 16, percentage: '12.5%', value: 16, color: '#D0D5DD' }
  ];

  // Line Chart Data — Measurements Over Time
  const overTimeData = [
    { date: '22 Apr', profiles: 20 },
    { date: '29 Apr', profiles: 35 },
    { date: '06 May', profiles: 58 },
    { date: '13 May', profiles: 84 },
    { date: '20 May', profiles: 128 }
  ];

  // Line Chart Data — Accuracy Trend
  const accuracyTrendData = [
    { date: '22 Apr', accuracy: 94.2 },
    { date: '29 Apr', accuracy: 95.8 },
    { date: '06 May', accuracy: 96.5 },
    { date: '13 May', accuracy: 97.6 },
    { date: '20 May', accuracy: 98.7 }
  ];

  // Filtered Customer Database List
  const filteredCustomers = customersList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedMeasurementType === 'All' || c.type.toLowerCase().includes(selectedMeasurementType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div 
      className="vault-workspace-padding"
      style={{
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: pageBg,
        color: textColor,
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        boxSizing: 'border-box',
        padding: '24px 32px'
      }}
    >
      <style>{`
        .vault-kpi-5col-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          width: 100%;
        }

        .vault-main-grid {
          display: grid;
          grid-template-columns: 68% 32%;
          gap: 20px;
          width: 100%;
          align-items: flex-start;
        }

        .vault-analytics-3col-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
        }

        @media (max-width: 1280px) {
          .vault-kpi-5col-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .vault-main-grid {
            grid-template-columns: 60% 40%;
          }
        }

        @media (max-width: 1024px) {
          .vault-workspace-padding {
            padding: 16px !important;
          }
          .vault-kpi-5col-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .vault-main-grid {
            grid-template-columns: 1fr !important;
          }
          .vault-analytics-3col-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .vault-workspace-padding {
            padding: 12px !important;
          }
          .vault-kpi-5col-grid {
            grid-template-columns: 1fr !important;
          }
          .vault-analytics-3col-grid {
            grid-template-columns: 1fr !important;
          }
          .vault-search-wrapper {
            width: 100% !important;
            flex: 1 1 100% !important;
          }
          .vault-header-buttons {
            width: 100% !important;
          }
          .vault-header-buttons button {
            flex: 1 !important;
            justify-content: center !important;
          }
        }
      `}</style>

      {/* Container (100% Full Width Edge-to-Edge) */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* ==================================================================== */}
        {/* 1. PAGE HEADER (Designer Measurement Vault ✦ & Action Buttons)      */}
        {/* ==================================================================== */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, lineHeight: '32px', color: textColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
              Designer Measurement Vault <span style={{ color: primaryPink }}>✦</span>
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: secTextColor, fontWeight: 400 }}>
              Store, manage and analyze all customer measurements in one place
            </p>
          </div>

          <div className="vault-header-buttons" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            
            {/* Secondary Button — View AI 3D Body Scans */}
            <button 
              onClick={() => alert("Opening 3D AI Body Scan Vault...")}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '40px',
                padding: '0 16px',
                borderRadius: '9px',
                border: `1px solid ${borderColor}`,
                background: cardBg,
                fontSize: '13px',
                fontWeight: 600,
                color: textColor,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(16,24,40,0.02)'
              }}
            >
              <Sparkles size={15} color={secondaryPurple} />
              <span>View AI 3D Body Scans</span>
            </button>

            {/* Primary Button — Add Measurements (With Dropdown Arrow) */}
            <button 
              onClick={() => setIsAddModalOpen(true)}
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
              <Plus size={16} color="#FFFFFF" /> 
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Add Measurements</span>
              <ChevronDown size={14} color="#FFFFFF" />
            </button>

          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. REAL-TIME LIVE STATUS BAR (Thin Information Strip)               */}
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
            <strong style={{ color: '#12B76A', fontWeight: 600 }}>Live Measurement Data</strong>
            <span style={{ color: mutedTextColor }}>•</span>
            <span style={{ color: secTextColor }}>Last synced {lastSyncedSec} seconds ago</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: textColor, fontWeight: 600, flexWrap: 'wrap' }}>
            <span><strong style={{ color: primaryPink }}>128</strong> Profiles</span>
            <span style={{ color: mutedTextColor }}>•</span>
            <span><strong style={{ color: '#3B82F6' }}>42</strong> 3D Scans</span>
            <span style={{ color: mutedTextColor }}>•</span>
            <span><strong style={{ color: '#F79009' }}>14</strong> Added This Week</span>
            <span style={{ color: mutedTextColor }}>•</span>
            <span><strong style={{ color: '#12B76A' }}>98.7%</strong> Measurement Accuracy</span>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 3. KPI ANALYTICS SECTION (5 EQUAL DESKTOP CARDS WITH SPARKLINES)    */}
        {/* ==================================================================== */}
        <div className="vault-kpi-5col-grid">
          
          {/* KPI 1 — Total Profiles */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 18px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Total Profiles</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>128</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(123,44,255,0.2)' : '#F4F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} color={secondaryPurple} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +18.4% <span style={{ color: secTextColor, fontWeight: 400 }}>from last month</span>
              </span>
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 14L12 10L22 15L32 6L46 2" stroke="#7B2CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* KPI 2 — New This Week */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 18px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>New This Week</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>14</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(247,144,9,0.2)' : '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserPlus size={20} color="#F79009" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +8.6% <span style={{ color: secTextColor, fontWeight: 400 }}>from last week</span>
              </span>
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 16L12 12L22 14L32 6L46 3" stroke="#F79009" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* KPI 3 — 3D Scans */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 18px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>3D Scans</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>42</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box size={20} color="#3B82F6" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +22.1% <span style={{ color: secTextColor, fontWeight: 400 }}>from last month</span>
              </span>
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 15L14 11L24 13L34 5L46 2" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* KPI 4 — Avg. Measurements */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 18px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Avg. Measurements</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>24.6</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ruler size={20} color="#12B76A" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +6.3% <span style={{ color: secTextColor, fontWeight: 400 }}>per profile</span>
              </span>
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 16L12 10L22 14L32 4L46 2" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* KPI 5 — Measurement Accuracy */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 18px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: secTextColor, display: 'block' }}>Measurement Accuracy</span>
                <strong style={{ fontSize: '28px', fontWeight: 700, color: textColor, lineHeight: 1.2, marginTop: '4px', display: 'block' }}>98.7%</strong>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={20} color={primaryPink} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#12B76A', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <ArrowUpRight size={13} /> +2.4% <span style={{ color: secTextColor, fontWeight: 400 }}>from last month</span>
              </span>
              <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                <path d="M2 14L14 12L24 15L34 7L46 4" stroke={primaryPink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 4. MAIN WORKSPACE (70% LEFT COLUMN / 30% RIGHT PROFILE PANEL)        */}
        {/* ==================================================================== */}
        <div className="vault-main-grid">
          
          {/* LEFT 70% COLUMN (DATABASE TABLE + MEASUREMENT ANALYTICS UNDERNEATH) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
            
            {/* 1. CUSTOMER MEASUREMENT DATABASE TABLE */}
            <div style={{
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(16,24,40,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              
              {/* Search + Filter Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                
                {/* Search Field */}
                <div 
                  className="vault-search-wrapper"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0 14px',
                    height: '40px',
                    borderRadius: '9px',
                    border: `1px solid ${borderColor}`,
                    background: inputBg,
                    flex: '1 1 240px',
                    minWidth: '180px',
                    maxWidth: '100%'
                  }}
                >
                  <Search size={16} color={mutedTextColor} />
                  <input 
                    type="text" 
                    placeholder="Search customers by name, phone or ID..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: textColor, width: '100%' }}
                  />
                </div>

                {/* Filter Dropdowns */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <select 
                    value={selectedDesignerFilter}
                    onChange={e => setSelectedDesignerFilter(e.target.value)}
                    style={{ height: '40px', padding: '0 12px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                  >
                    <option value="All Designers">All Designers</option>
                    <option value="Current Designer">Current Designer (Ananya)</option>
                    <option value="Other Designers">Other Designers</option>
                  </select>

                  <select 
                    value={selectedMeasurementType}
                    onChange={e => setSelectedMeasurementType(e.target.value)}
                    style={{ height: '40px', padding: '0 12px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                  >
                    <option value="All">Measurement Type: All</option>
                    <option value="Full Body">Full Body</option>
                    <option value="3D Body Scan">3D Body Scan</option>
                    <option value="Upper Body">Upper Body</option>
                    <option value="Manual">Manual</option>
                  </select>

                  <select 
                    value={selectedTimeframe}
                    onChange={e => setSelectedTimeframe(e.target.value)}
                    style={{ height: '40px', padding: '0 12px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                  >
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Last 3 Months">Last 3 Months</option>
                  </select>

                  <button style={{ height: '40px', padding: '0 14px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Filter size={14} color={textColor} /> More Filters
                  </button>
                </div>

              </div>

              {/* Customer Data Table */}
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${borderColor}`, fontSize: '11px', fontWeight: 600, color: secTextColor, letterSpacing: '0.04em' }}>
                      <th style={{ padding: '12px 16px', width: '30%' }}>CUSTOMER</th>
                      <th style={{ padding: '12px 16px', width: '28%' }}>MEASUREMENT SUMMARY</th>
                      <th style={{ padding: '12px 16px', width: '15%' }}>TYPE</th>
                      <th style={{ padding: '12px 16px', width: '15%' }}>LAST UPDATED</th>
                      <th style={{ padding: '12px 16px', width: '12%', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCustomers.map(cust => {
                      const isSelected = selectedCustomerId === cust.id;
                      return (
                        <tr 
                          key={cust.id}
                          onClick={() => setSelectedCustomerId(cust.id)}
                          style={{
                            borderBottom: `1px solid ${borderColor}`,
                            background: isSelected ? (isDark ? 'rgba(236,22,127,0.12)' : '#FFF0F7') : 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          
                          {/* Col 1 — Customer Info & Avatar */}
                          <td style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <img src={cust.avatar} alt={cust.name} style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <strong style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>{cust.name}</strong>
                                  <span style={{ fontSize: '10px', color: primaryPink, fontWeight: 700 }}>ID: {cust.id}</span>
                                </div>
                                <span style={{ fontSize: '11px', color: secTextColor, display: 'block', marginTop: '2px' }}>{cust.phone}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                  {cust.is3DScan && (
                                    <span style={{ fontSize: '10px', fontWeight: 600, background: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', color: '#3B82F6', padding: '1px 6px', borderRadius: '4px' }}>
                                      3D Scan
                                    </span>
                                  )}
                                  {cust.isVerified && (
                                    <span style={{ fontSize: '10px', fontWeight: 600, background: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3', color: '#12B76A', padding: '1px 6px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                                      <Check size={10} /> Verified
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Col 2 — Inline Measurement Summary */}
                          <td style={{ padding: '16px' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: textColor, fontWeight: 600 }}>
                                <span>Bust <strong>{cust.bust}</strong></span>
                                <span>Waist <strong>{cust.waist}</strong></span>
                                <span>Hips <strong>{cust.hips}</strong></span>
                              </div>
                              <span style={{ fontSize: '11px', color: secTextColor, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                <Ruler size={12} color={secTextColor} /> {cust.totalCount} Measurements
                              </span>
                            </div>
                          </td>

                          {/* Col 3 — Measurement Type Pill */}
                          <td style={{ padding: '16px' }}>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '4px 10px',
                              borderRadius: '6px',
                              background: cust.typeBadgeBg,
                              color: cust.typeBadgeColor,
                              display: 'inline-block'
                            }}>
                              {cust.type}
                            </span>
                          </td>

                          {/* Col 4 — Last Updated Date/Time */}
                          <td style={{ padding: '16px' }}>
                            <div>
                              <strong style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block' }}>{cust.lastUpdatedDate}</strong>
                              <span style={{ fontSize: '11px', color: secTextColor }}>{cust.lastUpdatedTime}</span>
                            </div>
                          </td>

                          {/* Col 5 — Action Circular Icon Buttons (36x36px) */}
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setSelectedCustomerId(cust.id); }}
                                title="View Customer Profile"
                                style={{ width: '36px', height: '36px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: cardBg, color: textColor, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <Eye size={15} color={textColor} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setIsAddModalOpen(true); }}
                                title="Edit Measurements"
                                style={{ width: '36px', height: '36px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: cardBg, color: textColor, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <Edit3 size={15} color={textColor} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); alert(`Downloading PDF for ${cust.name}...`); }}
                                title="Download PDF"
                                style={{ width: '36px', height: '36px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: cardBg, color: textColor, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <MoreVertical size={15} color={textColor} />
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${borderColor}`, paddingTop: '16px', fontSize: '12px', color: secTextColor }}>
                <span>Showing 1 to {filteredCustomers.length} of 128 profiles</span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button style={{ padding: '4px 10px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer', height: '32px' }}>Previous</button>
                  <button style={{ padding: '4px 10px', borderRadius: '6px', border: `1px solid ${primaryPink}`, background: '#FFF0F7', color: primaryPink, fontWeight: 700, cursor: 'pointer', height: '32px' }}>1</button>
                  <button style={{ padding: '4px 10px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer', height: '32px' }}>2</button>
                  <button style={{ padding: '4px 10px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer', height: '32px' }}>3</button>
                  <span>...</span>
                  <button style={{ padding: '4px 10px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer', height: '32px' }}>26</button>
                  <button style={{ padding: '4px 10px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer', height: '32px' }}>Next</button>
                </div>
              </div>

            </div>

            {/* 2. MEASUREMENT ANALYTICS SECTION (PLACED DIRECTLY UNDERNEATH TABLE INSIDE LEFT 70% COLUMN - MATCHING IMAGE 1) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: textColor }}>Measurement Analytics</h3>
                
                <select 
                  value={selectedTimeframe}
                  onChange={e => setSelectedTimeframe(e.target.value)}
                  style={{ height: '36px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: cardBg, color: textColor, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 3 Months">Last 3 Months</option>
                </select>
              </div>

              <div className="vault-analytics-3col-grid">
                
                {/* Card 1 — Measurement Types Donut Chart */}
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', boxShadow: '0 4px 18px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 600, color: textColor }}>Measurement Types</h4>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={donutTypesData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={3} dataKey="value">
                            {donutTypesData.map((entry, idx) => (
                              <Cell key={`c-${idx}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <strong style={{ fontSize: '16px', fontWeight: 700, color: textColor, display: 'block', lineHeight: 1 }}>128</strong>
                        <span style={{ fontSize: '9px', color: secTextColor }}>Profiles</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                      {donutTypesData.map(item => (
                        <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.color }} />
                            <span style={{ color: textColor, fontWeight: 500 }}>{item.name}</span>
                          </div>
                          <span style={{ color: secTextColor, fontWeight: 600 }}>{item.count} <span style={{ color: mutedTextColor }}>({item.percentage})</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2 — Measurements Over Time Line Chart */}
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', boxShadow: '0 4px 18px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: textColor }}>Measurements Over Time</h4>
                    <span style={{ fontSize: '10px', color: secTextColor }}>Number of profiles created</span>
                  </div>

                  <div style={{ width: '100%', height: '130px', marginTop: '8px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={overTimeData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorProfiles" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={primaryPink} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={primaryPink} stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#EEF0F4'} vertical={false} />
                        <XAxis dataKey="date" stroke={mutedTextColor} fontSize={9} tickLine={false} />
                        <YAxis stroke={mutedTextColor} fontSize={9} tickLine={false} />
                        <Tooltip contentStyle={{ background: isDark ? '#1F1B2E' : '#172033', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                        <Area type="monotone" dataKey="profiles" stroke={primaryPink} strokeWidth={2.5} fillOpacity={1} fill="url(#colorProfiles)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Card 3 — Accuracy Trend Line Chart */}
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '16px', boxShadow: '0 4px 18px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: textColor }}>Accuracy Trend</h4>
                    <span style={{ fontSize: '10px', color: '#12B76A', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <ArrowUpRight size={12} /> +2.4% <span style={{ color: secTextColor, fontWeight: 400 }}>from last month</span>
                    </span>
                  </div>

                  <div style={{ width: '100%', height: '130px', marginTop: '8px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={accuracyTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={secondaryPurple} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={secondaryPurple} stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#EEF0F4'} vertical={false} />
                        <XAxis dataKey="date" stroke={mutedTextColor} fontSize={9} tickLine={false} />
                        <YAxis domain={[90, 100]} stroke={mutedTextColor} fontSize={9} tickLine={false} tickFormatter={(v) => `${v}%`} />
                        <Tooltip contentStyle={{ background: isDark ? '#1F1B2E' : '#172033', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }} formatter={(val) => [`${val}%`, 'Accuracy']} />
                        <Area type="monotone" dataKey="accuracy" stroke={secondaryPurple} strokeWidth={2.5} fillOpacity={1} fill="url(#colorAcc)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT 30% — SELECTED CUSTOMER PROFILE PANEL */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(16,24,40,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            height: '100%'
          }}>
            
            {/* Customer Avatar & Header */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', borderBottom: `1px solid ${borderColor}`, paddingBottom: '16px' }}>
              <img src={activeCustomer.avatar} alt={activeCustomer.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textColor }}>{activeCustomer.name}</h3>
                  <span style={{ fontSize: '10px', fontWeight: 600, background: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3', color: '#12B76A', padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    <Check size={10} /> Verified
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: primaryPink, fontWeight: 700 }}>ID: {activeCustomer.id}</span>
                <div style={{ fontSize: '11px', color: secTextColor, display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                  <span>📞 {activeCustomer.phone}</span>
                  <span>✉️ {activeCustomer.email}</span>
                  <span>📍 {activeCustomer.location}</span>
                </div>
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div style={{ display: 'flex', gap: '14px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '8px' }}>
              {['Overview', 'Measurements', '3D Scan', 'History'].map(t => {
                const isActive = activeProfileTab === t;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveProfileTab(t)}
                    style={{
                      border: 'none',
                      borderBottom: isActive ? `2px solid ${primaryPink}` : '2px solid transparent',
                      background: 'transparent',
                      color: isActive ? primaryPink : secTextColor,
                      fontSize: '12px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      paddingBottom: '6px'
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Measurement Summary & Fashion Fitting Vector Visualization */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: textColor }}>Measurement Summary</h4>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  style={{ fontSize: '11px', color: primaryPink, border: `1px solid ${borderColor}`, background: cardBg, padding: '3px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                >
                  ✏️ Edit
                </button>
              </div>

              {/* Minimal Fashion Fitting Diagram Graphic + Key Values Column */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', alignItems: 'center', background: itemHoverBg, padding: '12px', borderRadius: '12px', border: `1px solid ${borderColor}` }}>
                
                {/* High-Resolution Transparent 3D Mannequin Image */}
                <div style={{ textAlign: 'center', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '230px' }}>
                  <img 
                    src="/images/mannequin_3d.png" 
                    alt="3D Body Fitting Mannequin" 
                    style={{ 
                      maxHeight: '220px', 
                      maxWidth: '100%', 
                      objectFit: 'contain',
                      filter: isDark ? 'drop-shadow(0 4px 12px rgba(236,22,127,0.3))' : 'none'
                    }} 
                  />
                </div>

                {/* Measurements Value Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${borderColor}`, paddingBottom: '3px' }}>
                    <span style={{ color: secTextColor }}>Bust / Chest</span>
                    <strong style={{ color: textColor, fontWeight: 700 }}>{activeCustomer.bust}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${borderColor}`, paddingBottom: '3px' }}>
                    <span style={{ color: secTextColor }}>Waist</span>
                    <strong style={{ color: textColor, fontWeight: 700 }}>{activeCustomer.waist}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${borderColor}`, paddingBottom: '3px' }}>
                    <span style={{ color: secTextColor }}>Hips</span>
                    <strong style={{ color: textColor, fontWeight: 700 }}>{activeCustomer.hips}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${borderColor}`, paddingBottom: '3px' }}>
                    <span style={{ color: secTextColor }}>Shoulder</span>
                    <strong style={{ color: textColor, fontWeight: 700 }}>{activeCustomer.shoulder}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${borderColor}`, paddingBottom: '3px' }}>
                    <span style={{ color: secTextColor }}>Arm Length</span>
                    <strong style={{ color: textColor, fontWeight: 700 }}>{activeCustomer.armLength}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${borderColor}`, paddingBottom: '3px' }}>
                    <span style={{ color: secTextColor }}>Top Length</span>
                    <strong style={{ color: textColor, fontWeight: 700 }}>{activeCustomer.topLength}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${borderColor}`, paddingBottom: '3px' }}>
                    <span style={{ color: secTextColor }}>Inseam</span>
                    <strong style={{ color: textColor, fontWeight: 700 }}>{activeCustomer.inseam}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${borderColor}`, paddingBottom: '3px' }}>
                    <span style={{ color: secTextColor }}>Height</span>
                    <strong style={{ color: textColor, fontWeight: 700 }}>{activeCustomer.height}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
                    <span style={{ color: secTextColor }}>Total Records</span>
                    <strong style={{ color: primaryPink, fontWeight: 700 }}>{activeCustomer.totalCount}</strong>
                  </div>
                </div>

              </div>
            </div>

            {/* Measurement Info Card */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: textColor }}>Measurement Info</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
                <div>
                  <span style={{ color: secTextColor, display: 'block' }}>Type</span>
                  <strong style={{ color: textColor, fontWeight: 600, fontSize: '12px' }}>{activeCustomer.type}</strong>
                </div>
                <div>
                  <span style={{ color: secTextColor, display: 'block' }}>Source</span>
                  <strong style={{ color: textColor, fontWeight: 600, fontSize: '12px' }}>{activeCustomer.source}</strong>
                </div>
                <div>
                  <span style={{ color: secTextColor, display: 'block' }}>Measured On</span>
                  <strong style={{ color: textColor, fontWeight: 600, fontSize: '12px' }}>{activeCustomer.lastUpdatedDate} · {activeCustomer.lastUpdatedTime}</strong>
                </div>
                <div>
                  <span style={{ color: secTextColor, display: 'block' }}>Measured By</span>
                  <strong style={{ color: textColor, fontWeight: 600, fontSize: '12px' }}>{activeCustomer.measuredBy}</strong>
                </div>
              </div>

              <div style={{ fontSize: '11px', marginTop: '4px' }}>
                <span style={{ color: secTextColor, display: 'block' }}>Notes</span>
                <span style={{ color: textColor }}>{activeCustomer.notes}</span>
              </div>
            </div>

            {/* Profile Action CTA Button */}
            <button style={{
              width: '100%',
              height: '42px',
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
              gap: '6px',
              marginTop: 'auto',
              boxShadow: '0 4px 14px rgba(236,22,127,0.22)'
            }}>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>View Full Profile →</span>
            </button>

          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 6. ADD MEASUREMENTS MODAL (MANUAL / 3D BODY SCAN / FILE IMPORT)      */}
      {/* ==================================================================== */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
            maxWidth: '560px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: `1px solid ${borderColor}` }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: textColor }}>Add Customer Measurements</h3>
                <span style={{ fontSize: '12px', color: secTextColor }}>Select entry method and save customer fitting profile.</span>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'transparent', border: 'none', color: secTextColor, cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Mode Selector */}
            <div style={{ display: 'flex', padding: '16px 20px 0 20px', gap: '10px' }}>
              {[
                { id: 'manual', label: 'Manual Input', icon: <Ruler size={14} /> },
                { id: '3d', label: '3D Body Scan', icon: <Box size={14} /> },
                { id: 'import', label: 'Import File', icon: <Upload size={14} /> }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setAddMode(m.id)}
                  style={{
                    flex: 1,
                    height: '38px',
                    borderRadius: '8px',
                    border: addMode === m.id ? `1.5px solid ${primaryPink}` : `1px solid ${borderColor}`,
                    background: addMode === m.id ? (isDark ? 'rgba(236,22,127,0.15)' : '#FFF0F7') : inputBg,
                    color: addMode === m.id ? primaryPink : textColor,
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {/* Modal Form Content */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '420px', overflowY: 'auto' }}>
              
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Customer Name</label>
                <input type="text" placeholder="e.g. Priya Sharma" style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Bust / Chest (in)</label>
                  <input type="text" placeholder='e.g. 36"' style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Waist (in)</label>
                  <input type="text" placeholder='e.g. 30"' style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Hips (in)</label>
                  <input type="text" placeholder='e.g. 39"' style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Shoulder (in)</label>
                  <input type="text" placeholder='e.g. 14.5"' style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Fitting Notes</label>
                <textarea rows="2" placeholder="Add specific fitting instructions..." style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none', resize: 'none' }} />
              </div>

            </div>

            {/* Modal Actions */}
            <div style={{ padding: '16px 20px', borderTop: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setIsAddModalOpen(false)} style={{ height: '38px', padding: '0 16px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: cardBg, color: textColor, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button 
                onClick={() => {
                  alert("Successfully saved customer measurement profile!");
                  setIsAddModalOpen(false);
                }}
                style={{ height: '38px', padding: '0 18px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(236,22,127,0.22)' }}
              >
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Save Profile</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
