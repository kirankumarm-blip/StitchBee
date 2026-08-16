import React, { useState } from 'react';
import { 
  Home, Palette, ShoppingBag, Ruler, Users, Calendar, DollarSign, HelpCircle, Menu, User, LogOut,
  Plus, Search, Filter, Bell, Sun, Moon, CheckCircle2, Clock, AlertCircle,
  FileText, Upload, Sparkles, Download, ArrowUpRight, ArrowDownRight, ChevronRight,
  TrendingUp, Scissors, ChevronDown, Check, X, Shield, Lock, Info, MessageSquare,
  Eye, RefreshCw, Layers, Award
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import HeaderProfileModal from '../HeaderProfileModal';
import DesignerDashboard from '../dashboard/DesignerDashboard';
import DesignerStudioWorkspace from '../dashboard/DesignerStudioWorkspace';
import DesignerOrdersWorkspace from '../dashboard/DesignerOrdersWorkspace';
import DesignerMeasurementVault from '../dashboard/DesignerMeasurementVault';
import DesignerClientDirectory from '../dashboard/DesignerClientDirectory';
import DesignerCalendarWorkspace from '../dashboard/DesignerCalendarWorkspace';
import DesignerEarningsWorkspace from '../dashboard/DesignerEarningsWorkspace';
import ChatSupportPage from '../chat/ChatSupportPage';

export default function DesignerView({ theme, setTheme, currentUser, onLogout, onSwitchToTailor }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'studio' | 'orders' | 'measurements' | 'customers' | 'calendar' | 'earnings' | 'support'
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        
        {/* Brand Logo & Mobile Menu Toggle Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="mobile-menu-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: '6px', 
              color: theme === 'dark' ? '#ffffff' : '#172033', 
              cursor: 'pointer', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Open Menu"
          >
            <Menu size={24} />
          </button>

          <div onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="StitchBee" style={{ height: '42px', width: '120px', objectFit: 'contain' }} />
          </div>
        </div>

        {/* 8 Primary Tabs: Dashboard → Design Studio → Orders → Measurements → Customers → Calendar → Earnings → Support */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '100%' }} className="desktop-header-nav">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Home size={16} /> },
            { id: 'studio', label: 'Design Studio', icon: <Palette size={16} /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingBag size={16} /> },
            { id: 'measurements', label: 'Measurements', icon: <Ruler size={16} /> },
            { id: 'customers', label: 'Customers', icon: <Users size={16} /> },
            { id: 'calendar', label: 'Calendar', icon: <Calendar size={16} /> },
            { id: 'earnings', label: 'Earnings', icon: <DollarSign size={16} /> },
            { id: 'support', label: 'Support', icon: <HelpCircle size={16} /> }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '64px',
                  padding: '0 16px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  borderRadius: '0',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #EC168C' : '3px solid transparent',
                  background: 'transparent',
                  color: isActive 
                    ? '#EC168C' 
                    : (theme === 'dark' ? '#E2E8F0' : '#172033'),
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {React.cloneElement(tab.icon, { color: isActive ? '#EC168C' : (theme === 'dark' ? '#CBD5E1' : '#334155'), size: 16 })}
                <span style={{ color: isActive ? '#EC168C' : (theme === 'dark' ? '#E2E8F0' : '#172033'), fontWeight: 700 }}>{tab.label}</span>
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
      <main style={{ 
        padding: (activeTab === 'dashboard' || activeTab === 'studio' || activeTab === 'orders' || activeTab === 'measurements' || activeTab === 'customers' || activeTab === 'calendar' || activeTab === 'earnings') ? '0' : '24px', 
        maxWidth: '100%', 
        margin: '0',
        width: '100%'
      }}>
        
        {/* ==================================================================== */}
        {/* TAB 1: 🏠 DASHBOARD (DESIGNER MASTER OVERVIEW - PRODUCTION READY)     */}
        {/* ==================================================================== */}
        {activeTab === 'dashboard' && (
          <DesignerDashboard 
            theme={theme}
            onNavigateTab={(tab, subTab) => {
              setActiveTab(tab);
              if (subTab) setStudioSubTab(subTab);
            }} 
          />
        )}

        {/* ==================================================================== */}
        {/* TAB 2: 🎨 DESIGN STUDIO — 3-COLUMN PRIMARY WORKSPACE                 */}
        {/* ==================================================================== */}
        {activeTab === 'studio' && (
          <DesignerStudioWorkspace 
            theme={theme}
            designs={designs}
            handleCreateDesign={handleCreateDesign}
            newDesignName={newDesignName} setNewDesignName={setNewDesignName}
            newCategory={newCategory} setNewCategory={setNewCategory}
            newOutfitType={newOutfitType} setNewOutfitType={setNewOutfitType}
            newFabric={newFabric} setNewFabric={setNewFabric}
            newColor={newColor} setNewColor={setNewColor}
            newCustomer={newCustomer} setNewCustomer={setNewCustomer}
            newPrice={newPrice} setNewPrice={setNewPrice}
            newInstructions={newInstructions} setNewInstructions={setNewInstructions}
            studioSubTab={studioSubTab} setStudioSubTab={setStudioSubTab}
            onNavigateTab={(tab, subTab) => {
              setActiveTab(tab);
              if (subTab) setStudioSubTab(subTab);
            }}
          />
        )}

        {/* ==================================================================== */}
        {/* TAB 3: 📦 ORDERS (PREMIUM STITCHBEE DESIGNER ORDERS DASHBOARD)      */}
        {/* ==================================================================== */}
        {activeTab === 'orders' && (
          <DesignerOrdersWorkspace 
            theme={theme}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* ==================================================================== */}
        {/* TAB 4: 📏 MEASUREMENTS (PREMIUM STITCHBEE MEASUREMENT VAULT)         */}
        {/* ==================================================================== */}
        {activeTab === 'measurements' && (
          <DesignerMeasurementVault 
            theme={theme}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* ==================================================================== */}
        {/* TAB 5: 👥 CUSTOMERS (PREMIUM STITCHBEE CLIENT DIRECTORY)              */}
        {/* ==================================================================== */}
        {activeTab === 'customers' && (
          <DesignerClientDirectory 
            theme={theme}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* ==================================================================== */}
        {/* TAB 6: 📅 CALENDAR (PREMIUM STITCHBEE CALENDAR & DEADLINES)          */}
        {/* ==================================================================== */}
        {activeTab === 'calendar' && (
          <DesignerCalendarWorkspace 
            theme={theme}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* ==================================================================== */}
        {/* TAB 7: 💰 EARNINGS (PREMIUM STITCHBEE EARNINGS DASHBOARD)           */}
        {/* ==================================================================== */}
        {activeTab === 'earnings' && (
          <DesignerEarningsWorkspace 
            theme={theme}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* ==================================================================== */}
        {/* TAB 8: 🛟 SUPPORT (CHAT SUPPORT CENTER & AI ASSISTANT)             */}
        {/* ==================================================================== */}
        {activeTab === 'support' && (
          <ChatSupportPage theme={theme} />
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
              <style>{`
                .studio-profile-form {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 16px;
                  width: 100%;
                }
                .studio-profile-form .full-col {
                  grid-column: span 2;
                }
                @media (max-width: 640px) {
                  .studio-profile-form {
                    grid-template-columns: 1fr !important;
                  }
                  .studio-profile-form .full-col {
                    grid-column: span 1 !important;
                  }
                }
              `}</style>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 700 }}>Studio Details & Pricing</h3>

              <form 
                className="studio-profile-form"
                onSubmit={e => { e.preventDefault(); alert("Designer Profile settings saved successfully!"); }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Designer Name</label>
                  <input type="text" defaultValue="Ananya Roy" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Studio Name</label>
                  <input type="text" defaultValue="Ananya Roy Couture Studio" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Specialization</label>
                  <input type="text" defaultValue="Bridal Lehenga, Anarkali & Indo-Western" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Sketch & Design Consultation Fee (₹)</label>
                  <input type="number" defaultValue="1500" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div className="full-col" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600 }}>Studio Address & Location</label>
                  <input type="text" defaultValue="104, 100 Feet Road, Indiranagar, Bengaluru - 560038" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#172033', outline: 'none' }} />
                </div>

                <div className="full-col" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button type="submit" className="btn-text-white-force" style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', background: 'linear-gradient(135deg, #F72585, #8B12C9)', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

      </main>

      {/* SLIDE-OUT MOBILE/TABLET SIDE NAVIGATION DRAWER */}
      {sidebarOpen && (
        <>
          <div 
            className="drawer-backdrop"
            onClick={() => setSidebarOpen(false)}
            style={{ top: '64px' }}
          />

          <div 
            className="left-nav-drawer"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              top: '64px', 
              height: 'calc(100vh - 64px)', 
              zIndex: 9999,
              background: theme === 'dark' ? '#0F0C1B' : '#F8F9FC',
              color: theme === 'dark' ? '#ffffff' : '#172033',
              borderRight: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
              display: 'flex',
              flexDirection: 'column',
              padding: '16px'
            }}
          >

            {/* Designer Welcome Card */}
            <div className="drawer-welcome-card" style={{ background: 'linear-gradient(135deg, #1B0F2A 0%, #3B154C 50%, #EC167F 100%)', padding: '16px', borderRadius: '12px', marginBottom: '14px' }}>
              <div className="drawer-welcome-inner" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Ananya Roy" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #EC167F' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', opacity: 0.95, fontWeight: 500, color: '#ffffff' }}>
                    StitchBee Fashion Studio
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '2px 0 2px 0', color: '#ffffff' }}>
                    Ananya Roy 👋
                  </h3>
                  <p style={{ fontSize: '0.70rem', opacity: 0.9, margin: 0, color: '#ffffff' }}>
                    Senior Couture Designer • Verified ✓
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px', flex: 1, overflowY: 'auto' }}>
              {[
                { id: 'dashboard', label: 'Dashboard', subtitle: 'Studio Command Center & KPI Feed', icon: <Home size={18} /> },
                { id: 'studio', label: 'Design Studio', subtitle: 'Outfits, Sketches & CAD Designs', icon: <Palette size={18} /> },
                { id: 'orders', label: 'Orders', subtitle: 'Active Client Orders & Delivery SLAs', icon: <ShoppingBag size={18} /> },
                { id: 'measurements', label: 'Measurements', subtitle: '3D Body Scans & Measurement Vault', icon: <Ruler size={18} /> },
                { id: 'customers', label: 'Customers', subtitle: 'Client Directory & Fashion Profiles', icon: <Users size={18} /> },
                { id: 'calendar', label: 'Calendar', subtitle: 'Design Deadlines & Fittings', icon: <Calendar size={18} /> },
                { id: 'earnings', label: 'Earnings', subtitle: 'Payouts, Revenue & Financials', icon: <DollarSign size={18} /> },
                { id: 'support', label: 'Support', subtitle: 'Chat Support, Tickets & Help Center', icon: <HelpCircle size={18} /> },
                { id: 'profile', label: 'Studio Profile', subtitle: 'Bio, Rates & Consultation Hours', icon: <User size={18} /> }
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    className={`drawer-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                    style={{
                      background: isActive 
                        ? (theme === 'dark' ? 'rgba(236,22,127,0.15)' : '#FFF0F6') 
                        : (theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent'),
                      borderRadius: '10px',
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '8px', 
                          background: isActive 
                            ? (theme === 'dark' ? 'rgba(236,22,127,0.25)' : '#FFE4F2') 
                            : (theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9'),
                          color: isActive 
                            ? '#EC167F' 
                            : (theme === 'dark' ? '#E2E8F0' : '#475467'),
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center'
                        }}
                      >
                        {tab.icon}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <span style={{ 
                          fontSize: '0.88rem', 
                          fontWeight: 700, 
                          color: isActive ? '#EC167F' : (theme === 'dark' ? '#FFFFFF' : '#1B1B2F') 
                        }}>
                          {tab.label}
                        </span>
                        <span style={{ fontSize: '0.70rem', color: isActive ? '#EC167F' : (theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6B7280') }}>
                          {tab.subtitle}
                        </span>
                      </div>
                    </div>
                    <ChevronRight 
                      size={16} 
                      style={{ 
                        color: isActive ? '#EC167F' : (theme === 'dark' ? 'rgba(255,255,255,0.4)' : '#9CA3AF')
                      }} 
                    />
                  </div>
                );
              })}
            </div>

            {/* Designer Tier Card */}
            <div className="drawer-tier-card" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4a0072 100%)', padding: '12px', borderRadius: '10px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>👑</span>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                      Couture Designer Elite
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.8)' }}>
                      ★ 4.9 Rating (42 Reviews)
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

      {/* MOBILE BOTTOM FLOATING ANIMATED NAVIGATION BAR */}
      <footer 
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '66px',
          zIndex: 99999,
          background: theme === 'dark' ? 'rgba(15,12,27,0.92)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
          boxShadow: theme === 'dark' ? '0 -4px 25px rgba(0,0,0,0.5)' : '0 -4px 20px rgba(0,0,0,0.08)',
          padding: '0 12px',
          boxSizing: 'border-box',
          alignItems: 'center',
          justify: 'space-around'
        }}
      >
        {[
          { id: 'dashboard', label: 'Home', icon: <Home size={18} /> },
          { id: 'studio', label: 'Studio', icon: <Palette size={18} /> },
          { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> },
          { id: 'earnings', label: 'Earnings', icon: <DollarSign size={18} /> },
          { id: 'menu', label: 'Menu', icon: <Menu size={18} />, isMenu: true }
        ].map(item => {
          const isActive = item.isMenu ? sidebarOpen : activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isMenu) {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justify: 'center',
                position: 'relative',
                cursor: 'pointer',
                flex: 1,
                height: '100%',
                padding: 0
              }}
            >
              {/* Floating Animated Circle Bubble containing Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: isActive 
                    ? 'linear-gradient(135deg, #EC167F 0%, #7C3AED 100%)' 
                    : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  color: isActive ? '#FFFFFF' : (theme === 'dark' ? '#98A2B3' : '#667085'),
                  transform: isActive 
                    ? 'translateY(-16px) scale(1.15) rotateY(10deg)' 
                    : 'translateY(0) scale(1) rotateY(0)',
                  boxShadow: isActive 
                    ? '0 8px 22px rgba(236, 22, 127, 0.45), inset 0 2px 4px rgba(255,255,255,0.3)' 
                    : 'none',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 2
                }}
              >
                {item.icon}
              </div>

              {/* Animated Text Label under Bubble */}
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  color: isActive ? '#EC167F' : (theme === 'dark' ? '#98A2B3' : '#667085'),
                  opacity: isActive ? 1 : 0.75,
                  transform: isActive ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)',
                  transition: 'all 0.25s ease',
                  position: 'absolute',
                  bottom: '6px',
                  zIndex: 1,
                  letterSpacing: '0.01em'
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </footer>

    </div>
  );
}
