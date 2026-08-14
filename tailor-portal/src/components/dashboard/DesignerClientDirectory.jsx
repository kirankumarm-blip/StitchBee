import React, { useState } from 'react';
import { 
  Users, UserCheck, UserPlus, Calendar, Search, Filter, LayoutGrid, List,
  MoreVertical, Edit3, X, Check, Plus, MessageCircle, Download, Upload,
  Phone, Mail, MapPin, ChevronRight, Eye, Sparkles, AlertCircle, ShoppingBag,
  Ruler, Scissors, Briefcase
} from 'lucide-react';
import '../../styles/dashboard.css';

export default function DesignerClientDirectory({
  theme = 'light',
  onNavigateTab
}) {
  const isDark = theme === 'dark';

  // Brand Color Tokens
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

  // Component States
  const [searchQuery, setSearchQuery] = useState('');
  const [customerFilter, setCustomerFilter] = useState('All Customers');
  const [designerFilter, setDesignerFilter] = useState('All Designers');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedCustomerId, setSelectedCustomerId] = useState('CUST-1024');
  const [activeDrawerTab, setActiveDrawerTab] = useState('Overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Customer List Data (6 Detailed Client Cards)
  const [customersList, setCustomersList] = useState([
    {
      id: 'CUST-1024',
      name: 'Priya Sharma',
      avatar: '/images/customers/priya sharma.jpg',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      location: 'Delhi, India',
      status: 'Active',
      statusBg: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3',
      statusColor: '#12B76A',
      isVIP: true,
      ordersCount: 12,
      designsCount: 8,
      measurementsCount: 24,
      totalSpent: '₹48,500',
      avgOrderValue: '₹6,195',
      lastOrderDate: '22 May 2026',
      dateJoined: '18 Apr 2026',
      preferredContact: 'Phone',
      designer: 'Ananya Roy',
      latestOrder: {
        id: '#DES-101',
        name: 'Royal Bridal Lehenga',
        status: 'Stitching (75%)',
        statusColor: primaryPink,
        price: '₹18,500',
        deliveryDate: '28 May 2026',
        image: '/images/designs/royal bridal lehenga.jpg'
      },
      recentDesign: {
        id: '#DS-204',
        name: 'Royal Bridal Lehenga',
        status: 'Approved',
        image: '/images/designs/royal bridal lehenga.jpg'
      },
      measurementsSnapshot: {
        bust: '36"',
        waist: '30"',
        hips: '39"',
        shoulder: '14.5"'
      }
    },
    {
      id: 'CUST-1008',
      name: 'Amit Verma',
      avatar: '/images/customers/Amit Verma.jpg',
      phone: '+91 91234 56789',
      email: 'amit.verma@email.com',
      location: 'Lucknow, India',
      status: 'Active',
      statusBg: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3',
      statusColor: '#12B76A',
      isVIP: false,
      ordersCount: 12,
      designsCount: 5,
      measurementsCount: 22,
      totalSpent: '₹64,200',
      avgOrderValue: '₹7,800',
      lastOrderDate: '20 May 2026',
      dateJoined: '10 Feb 2026',
      preferredContact: 'Email',
      designer: 'Ananya Roy',
      latestOrder: {
        id: '#DES-098',
        name: 'Zardozi Sherwani',
        status: 'Completed',
        statusColor: '#12B76A',
        price: '₹24,800',
        deliveryDate: '20 May 2026',
        image: '/images/designs/velvet shervani.jpg'
      },
      recentDesign: {
        id: '#DS-192',
        name: 'Zardozi Sherwani',
        status: 'Delivered',
        image: '/images/designs/velvet shervani.jpg'
      },
      measurementsSnapshot: {
        bust: '40"',
        waist: '34"',
        hips: '41"',
        shoulder: '18.0"'
      }
    },
    {
      id: 'CUST-1088',
      name: 'Ananya Roy',
      avatar: '/images/customers/Ananya Roy.jpg',
      phone: '+91 99876 54321',
      email: 'ananya.roy@email.com',
      location: 'Kolkata, India',
      status: 'Active',
      statusBg: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3',
      statusColor: '#12B76A',
      isVIP: true,
      ordersCount: 24,
      designsCount: 12,
      measurementsCount: 28,
      totalSpent: '₹92,400',
      avgOrderValue: '₹8,200',
      lastOrderDate: '21 May 2026',
      dateJoined: '05 Jan 2026',
      preferredContact: 'Phone',
      designer: 'Ananya Roy',
      latestOrder: {
        id: '#DES-094',
        name: 'Silk Anarkali Suit',
        status: 'Stitching (40%)',
        statusColor: primaryPink,
        price: '₹14,200',
        deliveryDate: '02 Jun 2026',
        image: '/images/designs/zardoni silk anarkali.jpg'
      },
      recentDesign: {
        id: '#DS-188',
        name: 'Silk Anarkali Suit',
        status: 'Approved',
        image: '/images/designs/zardoni silk anarkali.jpg'
      },
      measurementsSnapshot: {
        bust: '34"',
        waist: '28"',
        hips: '37"',
        shoulder: '14.0"'
      }
    },
    {
      id: 'CUST-2041',
      name: 'Neha Verma',
      avatar: '/images/customers/neha verma.jpg',
      phone: '+91 98712 34567',
      email: 'neha.verma@email.com',
      location: 'Mumbai, India',
      status: 'New',
      statusBg: isDark ? 'rgba(123,44,255,0.2)' : '#F4F0FF',
      statusColor: '#7B2CFF',
      isVIP: false,
      ordersCount: 8,
      designsCount: 3,
      measurementsCount: 18,
      totalSpent: '₹32,000',
      avgOrderValue: '₹5,400',
      lastOrderDate: '15 May 2026',
      dateJoined: '02 May 2026',
      preferredContact: 'Phone',
      designer: 'Ananya Roy',
      latestOrder: {
        id: '#DES-087',
        name: 'Pastel Lehenga',
        status: 'Design Pending',
        statusColor: '#F79009',
        price: '₹22,500',
        deliveryDate: '10 Jun 2026',
        image: '/images/designs/pastel lehenga.jpg'
      },
      recentDesign: {
        id: '#DS-175',
        name: 'Pastel Lehenga',
        status: 'In Review',
        image: '/images/designs/pastel lehenga.jpg'
      },
      measurementsSnapshot: {
        bust: '38"',
        waist: '32"',
        hips: '40"',
        shoulder: '14.5"'
      }
    },
    {
      id: 'CUST-3045',
      name: 'Kavya Iyer',
      avatar: '/images/customers/kavya iyer.jpg',
      phone: '+91 99099 11223',
      email: 'kavya.iyer@email.com',
      location: 'Chennai, India',
      status: 'Inactive',
      statusBg: isDark ? 'rgba(255,255,255,0.08)' : '#F2F4F7',
      statusColor: '#667085',
      isVIP: false,
      ordersCount: 15,
      designsCount: 7,
      measurementsCount: 20,
      totalSpent: '₹54,000',
      avgOrderValue: '₹6,100',
      lastOrderDate: '17 May 2026',
      dateJoined: '12 Nov 2025',
      preferredContact: 'Email',
      designer: 'Ananya Roy',
      latestOrder: {
        id: '#DES-082',
        name: 'Emerald Gown',
        status: 'Completed',
        statusColor: '#12B76A',
        price: '₹19,600',
        deliveryDate: '17 May 2026',
        image: '/images/designs/reception gown.jpg'
      },
      recentDesign: {
        id: '#DS-162',
        name: 'Emerald Gown',
        status: 'Delivered',
        image: '/images/designs/reception gown.jpg'
      },
      measurementsSnapshot: {
        bust: '32"',
        waist: '26"',
        hips: '35"',
        shoulder: '13.5"'
      }
    },
    {
      id: 'CUST-3050',
      name: 'Ritik Malhotra',
      avatar: '/images/customers/ritik malhotra.jpg',
      phone: '+91 80808 33445',
      email: 'ritik.malhotra@email.com',
      location: 'Bengaluru, India',
      status: 'Active',
      statusBg: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3',
      statusColor: '#12B76A',
      isVIP: false,
      ordersCount: 9,
      designsCount: 4,
      measurementsCount: 16,
      totalSpent: '₹38,900',
      avgOrderValue: '₹5,800',
      lastOrderDate: '19 May 2026',
      dateJoined: '20 Mar 2026',
      preferredContact: 'Phone',
      designer: 'Ananya Roy',
      latestOrder: {
        id: '#DES-078',
        name: 'Indo Western Set',
        status: 'Stitching (60%)',
        statusColor: primaryPink,
        price: '₹16,750',
        deliveryDate: '29 May 2026',
        image: '/images/designs/men kurta set.jpg'
      },
      recentDesign: {
        id: '#DS-154',
        name: 'Indo Western Set',
        status: 'Approved',
        image: '/images/designs/men kurta set.jpg'
      },
      measurementsSnapshot: {
        bust: '38"',
        waist: '32"',
        hips: '39"',
        shoulder: '17.5"'
      }
    }
  ]);

  const activeCustomer = customersList.find(c => c.id === selectedCustomerId) || customersList[0];

  // Search & Filter Filtered List
  const filteredCustomers = customersList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: pageBg,
      color: textColor,
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      boxSizing: 'border-box',
      padding: '24px 32px'
    }}>
      
      {/* Edge-to-Edge Workspace Container */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* ==================================================================== */}
        {/* 1. PAGE HEADER (Client Directory ✦ & Import/Add Customer Buttons)    */}
        {/* ==================================================================== */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, lineHeight: '32px', color: textColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
              Client Directory <span style={{ color: primaryPink }}>✦</span>
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: secTextColor, fontWeight: 400 }}>
              Manage designer clients, view past custom orders, design preferences, and appointment records.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            
            {/* Secondary Button — Import Customers */}
            <button 
              onClick={() => alert("Opening Customer CSV/Excel Importer...")}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '38px',
                padding: '0 16px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                background: cardBg,
                fontSize: '12px',
                fontWeight: 600,
                color: textColor,
                cursor: 'pointer'
              }}
            >
              <Upload size={14} color={secTextColor} />
              <span>Import Customers</span>
            </button>

            {/* Primary Button — + Add New Customer */}
            <button 
              onClick={() => setIsAddModalOpen(true)}
              style={{
                height: '38px',
                padding: '0 18px',
                background: primaryPink,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(236,22,127,0.22)'
              }}
            >
              <Plus size={15} color="#FFFFFF" />
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>+ Add New Customer</span>
            </button>

          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. CUSTOMER SUMMARY CARDS (4 Compact Equal Columns)                  */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          width: '100%'
        }}>
          
          {/* Card 1 — Total Clients */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '16px', boxShadow: '0 2px 10px rgba(16,24,40,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '92px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: isDark ? 'rgba(123,44,255,0.2)' : '#F4F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} color={secondaryPurple} />
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 500, color: secTextColor, display: 'block' }}>Total Clients</span>
                <strong style={{ fontSize: '24px', fontWeight: 700, color: textColor, lineHeight: 1.1, marginTop: '2px', display: 'block' }}>128</strong>
                <span style={{ fontSize: '10px', color: mutedTextColor }}>All time customers</span>
              </div>
            </div>
          </div>

          {/* Card 2 — Active Clients */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '16px', boxShadow: '0 2px 10px rgba(16,24,40,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '92px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: isDark ? 'rgba(247,144,9,0.2)' : '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserCheck size={20} color="#F79009" />
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 500, color: secTextColor, display: 'block' }}>Active Clients</span>
                <strong style={{ fontSize: '24px', fontWeight: 700, color: textColor, lineHeight: 1.1, marginTop: '2px', display: 'block' }}>96</strong>
                <span style={{ fontSize: '10px', color: mutedTextColor }}>With recent activity</span>
              </div>
            </div>
          </div>

          {/* Card 3 — New This Month */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '16px', boxShadow: '0 2px 10px rgba(16,24,40,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '92px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={20} color="#3B82F6" />
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 500, color: secTextColor, display: 'block' }}>New This Month</span>
                <strong style={{ fontSize: '24px', fontWeight: 700, color: textColor, lineHeight: 1.1, marginTop: '2px', display: 'block' }}>14</strong>
                <span style={{ fontSize: '10px', color: mutedTextColor }}>Joined this month</span>
              </div>
            </div>
          </div>

          {/* Card 4 — Upcoming Appointments */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '16px', boxShadow: '0 2px 10px rgba(16,24,40,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '92px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={20} color={primaryPink} />
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 500, color: secTextColor, display: 'block' }}>Upcoming Appointments</span>
                <strong style={{ fontSize: '24px', fontWeight: 700, color: textColor, lineHeight: 1.1, marginTop: '2px', display: 'block' }}>8</strong>
                <span style={{ fontSize: '10px', color: mutedTextColor }}>Next 7 days</span>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 3. SEARCH + FILTER TOOLBAR (Height 58px)                             */}
        {/* ==================================================================== */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          height: '58px'
        }}>
          
          {/* Left — Search Field (360px width, 40px height) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 14px',
            height: '40px',
            borderRadius: '9px',
            border: `1px solid ${borderColor}`,
            background: inputBg,
            width: '360px'
          }}>
            <Search size={16} color={mutedTextColor} />
            <input 
              type="text" 
              placeholder="Search customers by name, phone, email or customer ID..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: textColor, width: '100%' }}
            />
          </div>

          {/* Center — Filter Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <select 
              value={customerFilter}
              onChange={e => setCustomerFilter(e.target.value)}
              style={{ height: '40px', padding: '0 12px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}
            >
              <option value="All Customers">All Customers</option>
              <option value="VIP Customers">VIP Customers</option>
              <option value="Regular Clients">Regular Clients</option>
            </select>

            <select 
              value={designerFilter}
              onChange={e => setDesignerFilter(e.target.value)}
              style={{ height: '40px', padding: '0 12px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}
            >
              <option value="All Designers">All Designers</option>
              <option value="Current Designer">Current Designer (Ananya)</option>
            </select>

            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ height: '40px', padding: '0 12px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="New">New</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button style={{ height: '40px', padding: '0 14px', borderRadius: '9px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={14} color={textColor} /> More Filters
            </button>
          </div>

          {/* Right — View Toggle (Grid / List) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: inputBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '3px' }}>
            <button 
              onClick={() => setViewMode('grid')}
              style={{ width: '34px', height: '34px', borderRadius: '6px', border: 'none', background: viewMode === 'grid' ? '#FFF0F7' : 'transparent', color: viewMode === 'grid' ? primaryPink : secTextColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              style={{ width: '34px', height: '34px', borderRadius: '6px', border: 'none', background: viewMode === 'list' ? '#FFF0F7' : 'transparent', color: viewMode === 'list' ? primaryPink : secTextColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <List size={16} />
            </button>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 4. MAIN WORKSPACE (LEFT 3-COLUMN GRID / RIGHT CUSTOMER DRAWER)       */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 430px',
          gap: '20px',
          width: '100%',
          alignItems: 'flex-start'
        }}>
          
          {/* LEFT COLUMN — CUSTOMER GRID (3 COLUMNS) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              width: '100%'
            }}>
              {filteredCustomers.map(cust => {
                const isSelected = selectedCustomerId === cust.id;
                return (
                  <div 
                    key={cust.id}
                    onClick={() => setSelectedCustomerId(cust.id)}
                    style={{
                      background: isSelected ? (isDark ? 'rgba(236,22,127,0.12)' : '#FFF0F7') : cardBg,
                      border: isSelected ? `1.5px solid ${primaryPink}` : `1px solid ${borderColor}`,
                      borderRadius: '14px',
                      padding: '14px',
                      boxShadow: isSelected ? '0 8px 24px rgba(236,22,127,0.12)' : '0 2px 10px rgba(16,24,40,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      position: 'relative'
                    }}
                  >
                    
                    {/* Header Row: Avatar, Name, ID, VIP, Status Pill, Three-Dot */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={cust.avatar} alt={cust.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                        <div>
                          <strong style={{ fontSize: '14px', fontWeight: 600, color: textColor, display: 'block', lineHeight: 1.2 }}>{cust.name}</strong>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                            <span style={{ fontSize: '11px', color: primaryPink, fontWeight: 600 }}>{cust.id}</span>
                            {cust.isVIP && (
                              <span style={{ fontSize: '9px', fontWeight: 700, color: '#12B76A', background: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3', padding: '1px 5px', borderRadius: '4px' }}>
                                ✦ VIP
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '11px', color: secTextColor, display: 'block', marginTop: '2px' }}>📞 {cust.phone}</span>
                          <span style={{ fontSize: '11px', color: secTextColor, display: 'block' }}>✉️ {cust.email}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                        <button style={{ border: 'none', background: 'transparent', color: secTextColor, cursor: 'pointer', padding: '2px' }}>
                          <MoreVertical size={16} />
                        </button>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '12px',
                          background: cust.statusBg,
                          color: cust.statusColor
                        }}>
                          {cust.status}
                        </span>
                      </div>
                    </div>

                    {/* 3 Metrics Equal Columns */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', textAlign: 'center', borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: '8px 0' }}>
                      <div>
                        <strong style={{ fontSize: '15px', fontWeight: 700, color: textColor, display: 'block' }}>{cust.ordersCount}</strong>
                        <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500 }}>Orders</span>
                      </div>
                      <div style={{ borderLeft: `1px solid ${borderColor}`, borderRight: `1px solid ${borderColor}` }}>
                        <strong style={{ fontSize: '15px', fontWeight: 700, color: textColor, display: 'block' }}>{cust.designsCount}</strong>
                        <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500 }}>Custom Designs</span>
                      </div>
                      <div>
                        <strong style={{ fontSize: '15px', fontWeight: 700, color: textColor, display: 'block' }}>{cust.measurementsCount}</strong>
                        <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500 }}>Measurements</span>
                      </div>
                    </div>

                    {/* Latest Order Sub-card */}
                    <div style={{ background: itemHoverBg, borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', border: `1px solid ${borderColor}` }}>
                      <img src={cust.latestOrder.image} alt={cust.latestOrder.name} style={{ width: '42px', height: '48px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '9px', color: mutedTextColor, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, display: 'block' }}>Latest Order</span>
                        <strong style={{ fontSize: '12px', fontWeight: 600, color: textColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{cust.latestOrder.name}</strong>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', fontSize: '10px' }}>
                          <span style={{ color: primaryPink, fontWeight: 600 }}>{cust.latestOrder.id}</span>
                          <span style={{ color: cust.latestOrder.statusColor, fontWeight: 600 }}>• {cust.latestOrder.status}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <strong style={{ fontSize: '12px', fontWeight: 700, color: primaryPink, display: 'block' }}>{cust.latestOrder.price}</strong>
                        <span style={{ fontSize: '9px', color: '#12B76A', fontWeight: 600, display: 'block', marginTop: '2px' }}>Delivered: {cust.latestOrder.deliveryDate.split(' ')[0]} {cust.latestOrder.deliveryDate.split(' ')[1]}</span>
                      </div>
                    </div>

                    {/* Customer Card Buttons (View Profile & New Order) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedCustomerId(cust.id); }}
                        style={{
                          height: '36px',
                          borderRadius: '8px',
                          border: `1px solid ${primaryPink}`,
                          background: cardBg,
                          color: primaryPink,
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        View Profile
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); alert(`Creating new order for ${cust.name}...`); }}
                        style={{
                          height: '36px',
                          borderRadius: '8px',
                          border: 'none',
                          background: primaryPink,
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(236,22,127,0.2)'
                        }}
                      >
                        <span style={{ color: '#FFFFFF', fontWeight: 600 }}>New Order</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Pagination Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px 18px', fontSize: '11px', color: secTextColor }}>
              <span>Showing 1 to {filteredCustomers.length} of 128 customers</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${primaryPink}`, background: '#FFF0F7', color: primaryPink, fontWeight: 700, cursor: 'pointer' }}>1</button>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer' }}>2</button>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer' }}>3</button>
                <span>...</span>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer' }}>22</button>
                <button style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: cardBg, color: secTextColor, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — CUSTOMER PROFILE DRAWER (Width 430px) */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '-8px 0 30px rgba(16,24,40,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            width: '100%',
            position: 'sticky',
            top: '24px'
          }}>
            
            {/* Drawer Header: Avatar, Name, VIP, ID, Contact, Edit/More/Close */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <img src={activeCustomer.avatar} alt={activeCustomer.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: textColor }}>{activeCustomer.name}</h3>
                    {activeCustomer.isVIP && (
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#12B76A', background: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3', padding: '2px 6px', borderRadius: '4px' }}>
                        ✦ VIP
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '11px', color: primaryPink, fontWeight: 600, display: 'block', marginTop: '2px' }}>{activeCustomer.id}</span>
                  <div style={{ fontSize: '11px', color: secTextColor, display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                    <span>📞 {activeCustomer.phone}</span>
                    <span>✉️ {activeCustomer.email}</span>
                    <span>📍 {activeCustomer.location}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  style={{ fontSize: '11px', color: textColor, border: `1px solid ${borderColor}`, background: cardBg, padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                >
                  <Edit3 size={12} /> Edit
                </button>
                <button style={{ border: 'none', background: 'transparent', color: secTextColor, cursor: 'pointer' }}>
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* 4 Compact Metric Cards (Total Orders, Total Spent, Avg. Order Value, Last Order) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              <div style={{ background: itemHoverBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '8px', textAlign: 'center' }}>
                <strong style={{ fontSize: '14px', fontWeight: 700, color: textColor, display: 'block' }}>{activeCustomer.ordersCount}</strong>
                <span style={{ fontSize: '9px', color: secTextColor, fontWeight: 500 }}>Total Orders</span>
              </div>
              <div style={{ background: itemHoverBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '8px', textAlign: 'center' }}>
                <strong style={{ fontSize: '14px', fontWeight: 700, color: textColor, display: 'block' }}>{activeCustomer.totalSpent}</strong>
                <span style={{ fontSize: '9px', color: secTextColor, fontWeight: 500 }}>Total Spent</span>
              </div>
              <div style={{ background: itemHoverBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '8px', textAlign: 'center' }}>
                <strong style={{ fontSize: '14px', fontWeight: 700, color: textColor, display: 'block' }}>{activeCustomer.avgOrderValue}</strong>
                <span style={{ fontSize: '9px', color: secTextColor, fontWeight: 500 }}>Avg. Order Value</span>
              </div>
              <div style={{ background: itemHoverBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '8px', textAlign: 'center' }}>
                <strong style={{ fontSize: '12px', fontWeight: 700, color: textColor, display: 'block' }}>{activeCustomer.lastOrderDate.split(' ')[0]} {activeCustomer.lastOrderDate.split(' ')[1]}</strong>
                <span style={{ fontSize: '9px', color: secTextColor, fontWeight: 500 }}>Last Order</span>
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div style={{ display: 'flex', gap: '12px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '6px', overflowX: 'auto' }}>
              {['Overview', 'Orders', 'Measurements', 'Designs', 'Appointments', 'Notes'].map(t => {
                const isActive = activeDrawerTab === t;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveDrawerTab(t)}
                    style={{
                      border: 'none',
                      borderBottom: isActive ? `2px solid ${primaryPink}` : '2px solid transparent',
                      background: 'transparent',
                      color: isActive ? primaryPink : secTextColor,
                      fontSize: '11px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      paddingBottom: '6px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Profile Overview Tab Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Customer Details Mini Card */}
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: textColor }}>Customer Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px' }}>
                  <div><span style={{ color: secTextColor }}>Full Name:</span> <strong style={{ color: textColor }}>{activeCustomer.name}</strong></div>
                  <div><span style={{ color: secTextColor }}>Date Joined:</span> <strong style={{ color: textColor }}>{activeCustomer.dateJoined}</strong></div>
                  <div><span style={{ color: secTextColor }}>Preferred Contact:</span> <strong style={{ color: textColor }}>{activeCustomer.preferredContact}</strong></div>
                  <div><span style={{ color: secTextColor }}>Location:</span> <strong style={{ color: textColor }}>{activeCustomer.location}</strong></div>
                  <div><span style={{ color: secTextColor }}>Customer Type:</span> <strong style={{ color: primaryPink }}>{activeCustomer.isVIP ? 'VIP' : 'Regular'}</strong></div>
                  <div><span style={{ color: secTextColor }}>Designer:</span> <strong style={{ color: textColor }}>{activeCustomer.designer}</strong></div>
                </div>
              </div>

              {/* Latest Order Sub-card */}
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: textColor }}>Latest Order</h4>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={activeCustomer.latestOrder.image} alt={activeCustomer.latestOrder.name} style={{ width: '48px', height: '54px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block' }}>{activeCustomer.latestOrder.name}</strong>
                    <span style={{ fontSize: '10px', color: primaryPink, fontWeight: 600 }}>{activeCustomer.latestOrder.id}</span>
                    <span style={{ fontSize: '10px', color: activeCustomer.latestOrder.statusColor, fontWeight: 600, display: 'block', marginTop: '2px' }}>{activeCustomer.latestOrder.status}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ fontSize: '13px', fontWeight: 700, color: primaryPink, display: 'block' }}>{activeCustomer.latestOrder.price}</strong>
                    <span style={{ fontSize: '9px', color: '#12B76A', display: 'block', marginTop: '2px' }}>Delivery: {activeCustomer.latestOrder.deliveryDate.split(' ')[0]} {activeCustomer.latestOrder.deliveryDate.split(' ')[1]}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('orders')}
                  style={{ border: `1px solid ${borderColor}`, background: itemHoverBg, color: textColor, borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', textAlign: 'center', marginTop: '4px' }}
                >
                  View Order
                </button>
              </div>

              {/* Recent Design Sub-card */}
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: textColor }}>Recent Design</h4>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={activeCustomer.recentDesign.image} alt={activeCustomer.recentDesign.name} style={{ width: '48px', height: '54px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'block' }}>{activeCustomer.recentDesign.name}</strong>
                    <span style={{ fontSize: '10px', color: secTextColor }}>Design {activeCustomer.recentDesign.id}</span>
                    <span style={{ fontSize: '10px', color: '#12B76A', fontWeight: 600, background: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3', padding: '1px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>{activeCustomer.recentDesign.status}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('studio')}
                  style={{ border: `1px solid ${borderColor}`, background: itemHoverBg, color: textColor, borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', textAlign: 'center', marginTop: '4px' }}
                >
                  View Design
                </button>
              </div>

              {/* Measurements Snapshot */}
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: textColor }}>Measurements Snapshot</h4>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px' }}>
                  <div><span style={{ color: secTextColor }}>Bust / Chest:</span> <strong style={{ color: textColor }}>{activeCustomer.measurementsSnapshot.bust}</strong></div>
                  <div><span style={{ color: secTextColor }}>Waist:</span> <strong style={{ color: textColor }}>{activeCustomer.measurementsSnapshot.waist}</strong></div>
                  <div><span style={{ color: secTextColor }}>Hips:</span> <strong style={{ color: textColor }}>{activeCustomer.measurementsSnapshot.hips}</strong></div>
                  <div><span style={{ color: secTextColor }}>Shoulder:</span> <strong style={{ color: textColor }}>{activeCustomer.measurementsSnapshot.shoulder}</strong></div>
                </div>
                <button 
                  onClick={() => onNavigateTab && onNavigateTab('measurements')}
                  style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 700, cursor: 'pointer', textAlign: 'left', marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  View All Measurements →
                </button>
              </div>

            </div>

            {/* Message Customer Full-width CTA Button */}
            <button style={{
              width: '100%',
              height: '40px',
              borderRadius: '9px',
              border: `1px solid ${primaryPink}`,
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
            }}>
              <MessageCircle size={15} color={primaryPink} />
              <span>Message Customer</span>
            </button>

          </div>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 5. ADD NEW CUSTOMER MODAL (WIDTH 520px)                              */}
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
            maxWidth: '520px',
            boxShadow: '0 20px 60px rgba(16,24,40,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: `1px solid ${borderColor}` }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: textColor }}>Add New Customer</h3>
                <span style={{ fontSize: '12px', color: secTextColor }}>Create a new designer client profile.</span>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'transparent', border: 'none', color: secTextColor, cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '420px', overflowY: 'auto' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Full Name *</label>
                <input type="text" placeholder="e.g. Priya Sharma" style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Phone Number *</label>
                  <input type="text" placeholder="+91 98765 43210" style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Email Address</label>
                  <input type="email" placeholder="priya@email.com" style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Location</label>
                  <input type="text" placeholder="e.g. Delhi, India" style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Preferred Contact</label>
                  <select style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none' }}>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '4px' }}>Designer Notes</label>
                <textarea rows="2" placeholder="Add custom design preferences or notes..." style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '13px', outline: 'none', resize: 'none' }} />
              </div>
            </div>

            <div style={{ padding: '16px 20px', borderTop: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setIsAddModalOpen(false)} style={{ height: '38px', padding: '0 16px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: cardBg, color: textColor, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button 
                onClick={() => {
                  alert("Successfully created new customer profile!");
                  setIsAddModalOpen(false);
                }}
                style={{ height: '38px', padding: '0 18px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(236,22,127,0.22)' }}
              >
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Create Customer</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
