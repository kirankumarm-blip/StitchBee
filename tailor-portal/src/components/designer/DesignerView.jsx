import React, { useState } from 'react';
import { 
  Home, Palette, ShoppingBag, Ruler, Users, Calendar, DollarSign, HelpCircle,
  Plus, Search, Filter, Bell, Sun, Moon, CheckCircle2, Clock, AlertCircle,
  FileText, Upload, Sparkles, Download, ArrowUpRight, ArrowDownRight, ChevronRight,
  TrendingUp, Scissors, ChevronDown, Check, X, Shield, Lock, Info, MessageSquare,
  Eye, RefreshCw, Layers, Award
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import HeaderProfileModal from '../HeaderProfileModal';

export default function DesignerView({ theme, setTheme, currentUser, onLogout, onSwitchToTailor }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'studio' | 'orders' | 'measurements' | 'customers' | 'calendar' | 'earnings' | 'support'
  const [isOnline, setIsOnline] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Subsections State for Design Studio
  const [studioSubTab, setStudioSubTab] = useState('my-designs'); // 'my-designs' | 'create' | 'requests' | 'drafts' | 'published' | 'archived'
  
  // Orders Tab Filter
  const [orderFilter, setOrderFilter] = useState('active');

  // Customer Search & Selection Modal
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Support AI Assistant Suggested Questions State
  const [activeSupportSubTab, setActiveSupportSubTab] = useState('ai-assistant');
  const [aiChatMessages, setAiChatMessages] = useState([
    { sender: 'ai', text: 'Hello! I am StitchBee Designer AI Assistant. How can I assist you with your designs, measurements, or payouts today?' }
  ]);

  // Recharts Mock Data for Earnings
  const earningsTrendData = [
    { month: 'Jan', earnings: 28000, payout: 24000 },
    { month: 'Feb', earnings: 34000, payout: 30000 },
    { month: 'Mar', earnings: 31000, payout: 29000 },
    { month: 'Apr', earnings: 42000, payout: 38000 },
    { month: 'May', earnings: 45000, payout: 40000 },
    { month: 'Jun', earnings: 48200, payout: 35850 }
  ];

  const categoryEarningsData = [
    { category: 'Bridal Wear', amount: 24500 },
    { category: 'Anarkali', amount: 11200 },
    { category: 'Sherwani', amount: 8500 },
    { category: 'Indo-Western', amount: 4000 }
  ];

  // Sample Designs List
  const [designs, setDesigns] = useState([
    {
      id: 'DES-101',
      name: 'Royal Bridal Lehenga',
      category: 'Bridal Wear',
      outfitType: 'Lehenga Choli',
      fabric: 'Silk & Velvet',
      color: 'Ruby Red & Gold Zari',
      customer: 'Priya Sharma',
      version: 'v3.0',
      estimatedPrice: 18500,
      deadline: '28 May 2026',
      status: 'In Progress',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'DES-102',
      name: 'Zardozi Silk Anarkali',
      category: 'Anarkali Suits',
      outfitType: 'Floor Length Suit',
      fabric: 'Chanderi Silk',
      color: 'Emerald Green',
      customer: 'Ananya Roy',
      version: 'v2.1',
      estimatedPrice: 14200,
      deadline: '02 Jun 2026',
      status: 'Approved',
      progress: 90,
      image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'DES-103',
      name: 'Embroidered Velvet Sherwani',
      category: 'Sherwani & Grooms',
      outfitType: 'Royal Groom Wear',
      fabric: 'Italian Velvet',
      color: 'Midnight Blue & Silver',
      customer: 'Amit Verma',
      version: 'v1.0',
      estimatedPrice: 22000,
      deadline: '10 Jun 2026',
      status: 'Stitching',
      progress: 50,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400'
    }
  ]);

  // Create Design Form State
  const [newDesignName, setNewDesignName] = useState('');
  const [newCategory, setNewCategory] = useState('Bridal Wear');
  const [newOutfitType, setNewOutfitType] = useState('Lehenga Choli');
  const [newFabric, setNewFabric] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newCustomer, setNewCustomer] = useState('Priya Sharma');
  const [newPrice, setNewPrice] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  const handleCreateDesign = (e) => {
    e.preventDefault();
    if (!newDesignName || !newPrice) return;
    const created = {
      id: `DES-${100 + designs.length + 1}`,
      name: newDesignName,
      category: newCategory,
      outfitType: newOutfitType,
      fabric: newFabric || 'Silk Blend',
      color: newColor || 'Custom Shade',
      customer: newCustomer,
      version: 'v1.0',
      estimatedPrice: parseInt(newPrice, 10),
      deadline: '15 Jun 2026',
      status: 'In Progress',
      progress: 25,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400'
    };
    setDesigns([created, ...designs]);
    setNewDesignName('');
    setNewPrice('');
    setStudioSubTab('my-designs');
    alert(`Successfully created design "${created.name}" for ${created.customer}!`);
  };

  const handleAiQuestionClick = (question) => {
    const userMsg = { sender: 'user', text: question };
    let aiReplyText = "StitchBee AI: Here is how you can perform this task. Please check the step-by-step documentation in the Help Center.";
    
    if (question.includes("create a design")) {
      aiReplyText = "To create a design: Go to 'Design Studio' tab → Click 'Create New Design' → Fill outfit details, fabric, estimated price, and stitching notes → Click 'Save & Publish'.";
    } else if (question.includes("update measurements")) {
      aiReplyText = "To update measurements: Go to 'Measurements' tab → Search customer name → Click 'Update Measurements' or upload an AI 3D Body Scan.";
    } else if (question.includes("payout")) {
      aiReplyText = "StitchBee payouts are processed automatically every Tuesday directly to your registered UPI/Bank Account. View status under 'Earnings' tab.";
    }

    setAiChatMessages(prev => [...prev, userMsg, { sender: 'ai', text: aiReplyText }]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'dark' ? '#0F0C1B' : '#F7F8FA',
      color: theme === 'dark' ? '#ffffff' : '#172033',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }}>
      
      {/* ==================================================================== */}
      {/* 1. RECOMMENDED DESIGNER TOP HEADER NAVIGATION BAR                     */}
      {/* ==================================================================== */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: '64px',
        background: theme === 'dark' ? 'rgba(15,12,27,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.png" alt="StitchBee" style={{ height: '42px', width: '120px', objectFit: 'contain' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, background: 'linear-gradient(135deg, #F72585, #8B12C9)', color: '#ffffff', padding: '2px 8px', borderRadius: '12px' }}>
            DESIGNER STUDIO
          </span>
        </div>

        {/* 8 Primary Tabs: Dashboard → Design Studio → Orders → Measurements → Customers → Calendar → Earnings → Support */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-header-nav">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Home size={15} /> },
            { id: 'studio', label: 'Design Studio', icon: <Palette size={15} /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingBag size={15} /> },
            { id: 'measurements', label: 'Measurements', icon: <Ruler size={15} /> },
            { id: 'customers', label: 'Customers', icon: <Users size={15} /> },
            { id: 'calendar', label: 'Calendar', icon: <Calendar size={15} /> },
            { id: 'earnings', label: 'Earnings', icon: <DollarSign size={15} /> },
            { id: 'support', label: 'Support', icon: <HelpCircle size={15} /> }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '24px',
                  border: isActive ? '2px solid #F72585' : '2px solid transparent',
                  background: isActive 
                    ? (theme === 'dark' ? 'rgba(247,37,133,0.12)' : '#FFF0F6') 
                    : 'transparent',
                  color: isActive 
                    ? '#F72585' 
                    : (theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#475467'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(247,37,133,0.15)' : 'none'
                }}
              >
                {React.cloneElement(tab.icon, { color: isActive ? '#F72585' : 'currentColor' })}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Info: Notifications, Online Toggle, Theme Switcher, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Notifications Bell */}
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            style={{ position: 'relative', background: 'transparent', border: 'none', color: theme === 'dark' ? '#ffffff' : '#172033', cursor: 'pointer' }}
          >
            <Bell size={18} />
            <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: '#F72585' }} />
          </button>

          {/* Online Toggle Pill */}
          <div
            onClick={() => setIsOnline(!isOnline)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              background: isOnline ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)',
              color: isOnline ? '#10B981' : '#6B7280',
              cursor: 'pointer',
              border: `1px solid ${isOnline ? '#10B981' : '#6B7280'}`
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isOnline ? '#10B981' : '#6B7280' }} />
            {isOnline ? 'Online' : 'Offline'}
          </div>

          {/* Theme Selector */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{ background: 'transparent', border: 'none', color: theme === 'dark' ? '#ffffff' : '#172033', cursor: 'pointer' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile Dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => {
                setActiveTab('profile');
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #F72585' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Designer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="desktop-header-user-info" style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>Ananya Roy</span>
                <span style={{ fontSize: '10px', color: '#F72585', fontWeight: 700 }}>SENIOR DESIGNER</span>
              </div>
              <ChevronDown size={14} className="desktop-header-user-info" />
            </div>

            {profileDropdownOpen && (
              <HeaderProfileModal
                userRole="designer"
                userName="Ananya Roy"
                userAvatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                theme={theme}
                setTheme={setTheme}
                onViewProfile={() => setActiveTab('profile')}
                onSwitchPortal={() => { if (onSwitchToTailor) onSwitchToTailor(); }}
                onLogout={onLogout}
                onClose={() => setProfileDropdownOpen(false)}
              />
            )}
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* ==================================================================== */}
        {/* TAB 1: 🏠 DASHBOARD (DESIGNER OVERVIEW)                               */}
        {/* ==================================================================== */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header Title */}
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>Designer Master Overview</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Welcome back, Ananya! Track your active design projects, client requests, and stitching workflows.
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div style={{
              background: theme === 'dark' ? '#141126' : '#ffffff',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, marginRight: '4px' }}>Quick Actions:</span>
              <button
                onClick={() => { setActiveTab('studio'); setStudioSubTab('create'); }}
                className="btn-text-white-force"
                style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', background: 'linear-gradient(135deg, #F72585, #8B12C9)', color: '#ffffff', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={15} /> Create Design
              </button>
              <button
                onClick={() => { setActiveTab('studio'); setStudioSubTab('requests'); }}
                style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E5E7EB', background: 'transparent', color: theme === 'dark' ? '#ffffff' : '#172033', cursor: 'pointer' }}
              >
                New Design Request (6)
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E5E7EB', background: 'transparent', color: theme === 'dark' ? '#ffffff' : '#172033', cursor: 'pointer' }}
              >
                Add Customer
              </button>
              <button
                onClick={() => setActiveTab('studio')}
                style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E5E7EB', background: 'transparent', color: theme === 'dark' ? '#ffffff' : '#172033', cursor: 'pointer' }}
              >
                Upload Design Sketch
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E5E7EB', background: 'transparent', color: theme === 'dark' ? '#ffffff' : '#172033', cursor: 'pointer' }}
              >
                Schedule Appointment
              </button>
            </div>

            {/* KPI Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              
              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Active Projects</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(247,37,133,0.1)', color: '#F72585', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Palette size={16} />
                  </div>
                </div>
                <strong style={{ fontSize: '24px', fontWeight: 700, display: 'block', marginTop: '8px' }}>14 Projects</strong>
                <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                  <ArrowUpRight size={12} /> +3 this week
                </span>
              </div>

              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>New Requests</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(139,18,201,0.1)', color: '#8B12C9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={16} />
                  </div>
                </div>
                <strong style={{ fontSize: '24px', fontWeight: 700, display: 'block', marginTop: '8px' }}>6 Requests</strong>
                <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                  ● Action Required
                </span>
              </div>

              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Total Earnings</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={16} />
                  </div>
                </div>
                <strong style={{ fontSize: '24px', fontWeight: 700, display: 'block', marginTop: '8px' }}>₹48,200</strong>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, display: 'block', marginTop: '4px' }}>
                  ₹12,350 Pending Payout
                </span>
              </div>

              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Design Rating</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={16} />
                  </div>
                </div>
                <strong style={{ fontSize: '24px', fontWeight: 700, display: 'block', marginTop: '8px' }}>4.9 ★</strong>
                <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600, display: 'block', marginTop: '4px' }}>
                  96% Satisfaction Rate
                </span>
              </div>

            </div>

            {/* Active Design Projects & Upcoming Appointments Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              
              {/* Active Projects List */}
              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Active Design Projects</h3>
                  <button onClick={() => setActiveTab('studio')} style={{ fontSize: '12px', color: '#F72585', fontWeight: 600, background: 'transparent', border: 'none', cursor: 'pointer' }}>View All →</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {designs.map(d => (
                    <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '12px', background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid #F1F5F9' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={d.image} alt={d.name} style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover' }} />
                        <div>
                          <strong style={{ fontSize: '14px', fontWeight: 700, display: 'block' }}>{d.name}</strong>
                          <span style={{ fontSize: '12px', color: '#64748B' }}>Client: {d.customer} • {d.version}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#F72585', display: 'block' }}>₹{d.estimatedPrice.toLocaleString()}</span>
                        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>{d.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Deadlines & Appointments */}
              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Upcoming Appointments</h3>
                  <button onClick={() => setActiveTab('calendar')} style={{ fontSize: '12px', color: '#F72585', fontWeight: 600, background: 'transparent', border: 'none', cursor: 'pointer' }}>Calendar →</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '12px', borderRadius: '10px', borderLeft: '4px solid #F72585', background: theme === 'dark' ? 'rgba(247,37,133,0.08)' : '#FFF0F6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '13px', color: '#F72585' }}>🌸 Bridal Fitting Appointment</strong>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B' }}>Today, 03:00 PM</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Priya Sharma — Royal Bridal Lehenga Final Trial</p>
                  </div>

                  <div style={{ padding: '12px', borderRadius: '10px', borderLeft: '4px solid #8B12C9', background: theme === 'dark' ? 'rgba(139,18,201,0.08)' : '#F3E8FF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '13px', color: '#8B12C9' }}>🟣 Custom Measurement Session</strong>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B' }}>Tomorrow, 11:30 AM</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Amit Verma — Velvet Sherwani 3D Scan</p>
                  </div>

                  <div style={{ padding: '12px', borderRadius: '10px', borderLeft: '4px solid #10B981', background: theme === 'dark' ? 'rgba(16,185,129,0.08)' : '#ECFDF5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '13px', color: '#10B981' }}>🟢 Final Atelier Delivery</strong>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B' }}>28 May 2026</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Ananya Roy — Chanderi Silk Anarkali Suit</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: 🎨 DESIGN STUDIO — MOST IMPORTANT PRIMARY WORKSPACE            */}
        {/* ==================================================================== */}
        {activeTab === 'studio' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header & Subsection Tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>Design Studio Workspace</h1>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                  Create, review, and manage custom outfit sketches, references, and stitching specifications.
                </p>
              </div>

              <button
                onClick={() => setStudioSubTab('create')}
                className="btn-text-white-force"
                style={{ padding: '10px 20px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', background: 'linear-gradient(135deg, #F72585, #8B12C9)', color: '#ffffff', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={16} /> Create New Design
              </button>
            </div>

            {/* Subsections Navigation Pills */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', paddingBottom: '12px', overflowX: 'auto' }}>
              {[
                { id: 'my-designs', label: 'My Designs (14)' },
                { id: 'create', label: 'Create New Design' },
                { id: 'requests', label: 'Design Requests (6)' },
                { id: 'drafts', label: 'Drafts (4)' },
                { id: 'published', label: 'Published Designs (18)' },
                { id: 'archived', label: 'Archived Designs (2)' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setStudioSubTab(sub.id)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '20px',
                    border: 'none',
                    background: studioSubTab === sub.id ? '#F72585' : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#E2E8F0'),
                    color: studioSubTab === sub.id ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467'),
                    cursor: 'pointer'
                  }}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* CREATE NEW DESIGN FORM SUBSECTION */}
            {studioSubTab === 'create' && (
              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 700 }}>Create New Outfit Design</h3>

                <form onSubmit={handleCreateDesign} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600 }}>Design Name</label>
                    <input type="text" placeholder="e.g. Royal Zardozi Bridal Lehenga" value={newDesignName} onChange={e => setNewDesignName(e.target.value)} required style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600 }}>Category</label>
                    <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}>
                      <option value="Bridal Wear">Bridal Wear</option>
                      <option value="Lehenga Choli">Lehenga Choli</option>
                      <option value="Anarkali Suits">Anarkali Suits</option>
                      <option value="Sherwani & Grooms">Sherwani & Grooms</option>
                      <option value="Indo-Western">Indo-Western</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600' }}>Outfit Type</label>
                    <input type="text" placeholder="e.g. Heavy Bridal Lehenga" value={newOutfitType} onChange={e => setNewOutfitType(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600 }}>Fabric Specifications</label>
                    <input type="text" placeholder="e.g. Italian Silk & Velvet" value={newFabric} onChange={e => setNewFabric(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600 }}>Color Palette</label>
                    <input type="text" placeholder="e.g. Ruby Red & Antique Gold" value={newColor} onChange={e => setNewColor(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600 }}>Client Name</label>
                    <select value={newCustomer} onChange={e => setNewCustomer(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}>
                      <option value="Priya Sharma">Priya Sharma</option>
                      <option value="Ananya Roy">Ananya Roy</option>
                      <option value="Amit Verma">Amit Verma</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600 }}>Estimated Price (₹)</label>
                    <input type="number" placeholder="e.g. 18500" value={newPrice} onChange={e => setNewPrice(e.target.value)} required style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600 }}>Stitching & Embroidery Notes</label>
                    <textarea rows={3} placeholder="Add detailed handwork, zari embroidery specs, and seam notes..." value={newInstructions} onChange={e => setNewInstructions(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }} />
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button type="submit" className="btn-text-white-force" style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', background: 'linear-gradient(135deg, #F72585, #8B12C9)', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                      Save & Publish Design
                    </button>
                    <button type="button" onClick={() => setStudioSubTab('my-designs')} style={{ padding: '10px 20px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', border: '1px solid #E5E7EB', background: 'transparent', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* MY DESIGNS CARDS GRID */}
            {studioSubTab !== 'create' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {designs.map(d => (
                  <div key={d.id} style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', height: '200px' }}>
                      <img src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#ffffff', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '12px' }}>
                        {d.version}
                      </span>
                      <span style={{ position: 'absolute', bottom: '12px', left: '12px', background: '#F72585', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
                        {d.status}
                      </span>
                    </div>

                    <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{d.name}</h3>
                          <strong style={{ fontSize: '16px', color: '#F72585' }}>₹{d.estimatedPrice.toLocaleString()}</strong>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>Category: {d.category} • {d.outfitType}</p>
                      </div>

                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFC', padding: '10px', borderRadius: '8px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div><strong>Client:</strong> {d.customer}</div>
                        <div><strong>Fabric:</strong> {d.fabric} ({d.color})</div>
                        <div><strong>Deadline:</strong> {d.deadline}</div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <button onClick={() => alert(`Opening details modal for ${d.name}...`)} style={{ flex: 1, padding: '8px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', border: '1px solid #F72585', background: 'transparent', color: '#F72585', cursor: 'pointer' }}>
                          View Details & Notes
                        </button>
                        <button onClick={() => alert(`Sending ${d.name} to StitchBee Atelier`)} className="btn-text-white-force" style={{ flex: 1, padding: '8px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', background: 'linear-gradient(135deg, #F72585, #8B12C9)', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                          Send to Atelier
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: 📦 ORDERS (DESIGNER-SPECIFIC ORDER MANAGEMENT)                 */}
        {/* ==================================================================== */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>Designer Order Workflow</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Track custom order milestones from initial design approval to atelier stitching and final fitting delivery.
              </p>
            </div>

            {/* Order Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', paddingBottom: '12px', overflowX: 'auto' }}>
              {['All', 'New Requests', 'Active', 'Design Pending', 'Stitching', 'Ready', 'Completed', 'Cancelled'].map(f => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f.toLowerCase())}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '20px',
                    border: 'none',
                    background: orderFilter === f.toLowerCase() ? '#F72585' : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#E2E8F0'),
                    color: orderFilter === f.toLowerCase() ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467'),
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Orders Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {designs.map(ord => (
                <div key={ord.id} style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img src={ord.image} alt={ord.name} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                      <div>
                        <strong style={{ fontSize: '16px', fontWeight: 700, display: 'block' }}>{ord.name}</strong>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>Order #{ord.id} • Customer: {ord.customer}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ fontSize: '18px', color: '#F72585', display: 'block' }}>₹{ord.estimatedPrice.toLocaleString()}</strong>
                      <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Delivery: {ord.deadline}</span>
                    </div>
                  </div>

                  {/* Workflow Milestones Tracker */}
                  <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFC', padding: '14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>✓ Design Approved</span>
                    <ChevronRight size={14} color="#64748B" />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>✓ Customer Approval</span>
                    <ChevronRight size={14} color="#64748B" />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#F72585' }}>● Stitching at Atelier (75%)</span>
                    <ChevronRight size={14} color="#64748B" />
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748B' }}>○ Fitting Session</span>
                    <ChevronRight size={14} color="#64748B" />
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748B' }}>○ Final Delivery</span>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: 📏 MEASUREMENTS (DESIGNER MEASUREMENT DATABASE)               */}
        {/* ==================================================================== */}
        {activeTab === 'measurements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>Client Measurement Vault</h1>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                  Search, review, add, or download 3D AI scan measurement profiles for custom fitting.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => alert("Launching 3D AI Body Scanner...")} style={{ padding: '9px 16px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', border: '1px solid #8B12C9', background: 'transparent', color: '#8B12C9', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} /> View AI 3D Scans
                </button>
                <button onClick={() => alert("Add measurement form modal...")} className="btn-text-white-force" style={{ padding: '9px 18px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', background: 'linear-gradient(135deg, #F72585, #8B12C9)', color: '#ffffff', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={16} /> Add Measurements
                </button>
              </div>
            </div>

            {/* Measurement Search */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search customers by name or phone..."
                value={customerSearch}
                onChange={e => setCustomerSearch(e.target.value)}
                style={{ padding: '10px 14px 10px 38px', fontSize: '13px', width: '100%', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
              />
            </div>

            {/* Measurement Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {[
                { name: 'Priya Sharma', phone: 'CUST-1024', bust: '36"', waist: '30"', hips: '39"', shoulder: '14.5"', blouseLength: '15"' },
                { name: 'Ananya Roy', phone: 'CUST-1088', bust: '34"', waist: '28"', hips: '37"', shoulder: '14.0"', blouseLength: '14.5"' },
                { name: 'Amit Verma', phone: 'CUST-2045', chest: '40"', waist: '34"', shoulder: '18.0"', inseam: '32"', sherwaniLength: '42"' }
              ].map((m, idx) => (
                <div key={idx} style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '16px', fontWeight: 700, display: 'block' }}>{m.name}</strong>
                      <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 600 }}>ID: {m.phone}</span>
                    </div>
                    <button onClick={() => alert(`Downloading Measurement PDF for ${m.name}`)} style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 600, borderRadius: '6px', border: '1px solid #E5E7EB', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Download size={13} /> PDF
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFC', padding: '12px', borderRadius: '10px', fontSize: '12px' }}>
                    <div><strong>Bust/Chest:</strong> {m.bust || m.chest}</div>
                    <div><strong>Waist:</strong> {m.waist}</div>
                    <div><strong>Hips:</strong> {m.hips || 'N/A'}</div>
                    <div><strong>Shoulder:</strong> {m.shoulder}</div>
                    <div><strong>Length:</strong> {m.blouseLength || m.sherwaniLength}</div>
                    <div><strong>Inseam:</strong> {m.inseam || 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: 👥 CUSTOMERS (DESIGNER CLIENT DIRECTORY)                        */}
        {/* ==================================================================== */}
        {activeTab === 'customers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>Client Directory</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Manage designer clients, view past custom orders, design preferences, and appointment records.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[
                { name: 'Priya Sharma', orders: 12, designs: 8, lastOrder: '2 days ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
                { name: 'Amit Verma', orders: 5, designs: 3, lastOrder: '1 week ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
                { name: 'Ananya Roy', orders: 8, designs: 5, lastOrder: '3 days ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' }
              ].map((c, idx) => (
                <div key={idx} style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={c.avatar} alt={c.name} style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '16px', fontWeight: 700, display: 'block' }}>{c.name}</strong>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>{c.orders} Orders • {c.designs} Custom Designs</span>
                    <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 600, display: 'block', marginTop: '2px' }}>Last Order: {c.lastOrder}</span>
                  </div>
                  <button onClick={() => setSelectedCustomer(c)} style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', border: '1px solid #F72585', background: 'transparent', color: '#F72585', cursor: 'pointer' }}>
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 6: 📅 CALENDAR (COLOR-CODED DESIGN APPOINTMENTS)                  */}
        {/* ==================================================================== */}
        {activeTab === 'calendar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>Designer Calendar & Deadlines</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Color-coded schedule for client appointments, measurement trials, and atelier delivery deadlines.
              </p>
            </div>

            {/* Color Legend */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F72585' }} /> 🌸 Pink: Design Deadline</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8B12C9' }} /> 🟣 Purple: Appointment</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0EA5E9' }} /> 🔵 Blue: Measurement</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} /> 🟢 Green: Delivery</span>
            </div>

            <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <h3>Interactive Designer Calendar Matrix</h3>
              <p style={{ fontSize: '13px', color: '#64748B' }}>Showing May/June 2026 Schedule • 4 Active Fitting Sessions Today</p>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 7: 💰 EARNINGS (DESIGNER RECHARTS ANALYTICS)                     */}
        {/* ==================================================================== */}
        {activeTab === 'earnings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>Designer Revenue Analytics</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Track total payouts, pending balances, and design category revenue breakdowns.
              </p>
            </div>

            {/* Financial KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '14px', padding: '20px' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Total Earnings</span>
                <strong style={{ fontSize: '26px', fontWeight: 700, display: 'block', color: '#F72585', marginTop: '6px' }}>₹48,200</strong>
              </div>

              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '14px', padding: '20px' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Pending Payouts</span>
                <strong style={{ fontSize: '26px', fontWeight: 700, display: 'block', color: '#F59E0B', marginTop: '6px' }}>₹12,350</strong>
              </div>

              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '14px', padding: '20px' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Completed Payouts</span>
                <strong style={{ fontSize: '26px', fontWeight: 700, display: 'block', color: '#10B981', marginTop: '6px' }}>₹35,850</strong>
              </div>
            </div>

            {/* Recharts Area & Bar Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              
              {/* Earnings Growth Area Chart */}
              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700 }}>Monthly Revenue Growth</h3>
                <div style={{ width: '100%', height: '240px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsTrendData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                      <YAxis stroke="#64748B" fontSize={11} />
                      <Tooltip />
                      <Area type="monotone" dataKey="earnings" stroke="#F72585" fill="rgba(247,37,133,0.2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Bar Chart */}
              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700 }}>Earnings by Category</h3>
                <div style={{ width: '100%', height: '240px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryEarningsData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="category" stroke="#64748B" fontSize={11} />
                      <YAxis stroke="#64748B" fontSize={11} />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8B12C9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 8: 🛟 SUPPORT (CONTROLLED SUPPORT CENTER & AI ASSISTANT)        */}
        {/* ==================================================================== */}
        {activeTab === 'support' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>Designer Support Center</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Controlled help desk, ticket resolution, and 24/7 AI assistance for fashion designers.
              </p>
            </div>

            {/* Support Subtabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', paddingBottom: '12px' }}>
              {['ai-assistant', 'help-center', 'my-tickets', 'create-ticket', 'announcements'].map(st => (
                <button
                  key={st}
                  onClick={() => setActiveSupportSubTab(st)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '20px',
                    border: 'none',
                    background: activeSupportSubTab === st ? '#F72585' : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#E2E8F0'),
                    color: activeSupportSubTab === st ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467'),
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {st.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* AI Assistant Section */}
            {activeSupportSubTab === 'ai-assistant' && (
              <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700 }}>✨ StitchBee AI Designer Assistant</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>Click any suggested question below for instant guidance.</p>
                </div>

                {/* Suggested Questions Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    "How do I create a design?",
                    "How do I update measurements?",
                    "How do I accept an order?",
                    "Where is my payout?",
                    "How do I report an issue?",
                    "How do I upload a design?"
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAiQuestionClick(q)}
                      style={{
                        padding: '8px 14px',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: '20px',
                        border: '1px solid #F72585',
                        background: theme === 'dark' ? 'rgba(247,37,133,0.1)' : '#FFF0F6',
                        color: '#F72585',
                        cursor: 'pointer'
                      }}
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>

                {/* AI Chat History */}
                <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFC', borderRadius: '12px', padding: '16px', minHeight: '180px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {aiChatMessages.map((msg, idx) => (
                    <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '12px 16px', borderRadius: '12px', background: msg.sender === 'user' ? '#F72585' : (theme === 'dark' ? '#231E3B' : '#ffffff'), color: msg.sender === 'user' ? '#ffffff' : (theme === 'dark' ? '#ffffff' : '#172033'), fontSize: '13px', lineHeight: '1.4' }}>
                      {msg.text}
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 9: 👤 PROFILE & STUDIO SETTINGS                                  */}
        {/* ==================================================================== */}
        {activeTab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>Designer Profile & Studio Settings</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Manage your fashion designer bio, studio credentials, consultation rates, and client reviews.
              </p>
            </div>

            {/* Profile Header Card */}
            <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Ananya Roy" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #F72585' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700 }}>Ananya Roy</h2>
                  <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '3px 10px', borderRadius: '12px' }}>
                    ✓ Verified Designer
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                  Ananya Roy Fashion Studio • Senior Bridal & Haute Couture Designer
                </p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '12px', fontWeight: 600 }}>
                  <span style={{ color: '#F59E0B' }}>★ 4.9 Rating (42 Client Reviews)</span>
                  <span style={{ color: '#F72585' }}>24 Completed Designs</span>
                  <span style={{ color: '#10B981' }}>7 Years Experience</span>
                </div>
              </div>
            </div>

            {/* Settings Form */}
            <div style={{ background: theme === 'dark' ? '#141126' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 700 }}>Studio Details & Pricing</h3>

              <form onSubmit={e => { e.preventDefault(); alert("Designer Profile settings saved successfully!"); }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Designer Name</label>
                  <input type="text" defaultValue="Ananya Roy" style={{ padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Studio Name</label>
                  <input type="text" defaultValue="Ananya Roy Couture Studio" style={{ padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Specialization</label>
                  <input type="text" defaultValue="Bridal Lehenga, Anarkali & Indo-Western" style={{ padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Sketch & Design Consultation Fee (₹)</label>
                  <input type="number" defaultValue="1500" style={{ padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Studio Address & Location</label>
                  <input type="text" defaultValue="104, 100 Feet Road, Indiranagar, Bengaluru - 560038" style={{ padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button type="submit" className="btn-text-white-force" style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', background: 'linear-gradient(135deg, #F72585, #8B12C9)', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
