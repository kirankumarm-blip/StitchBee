import React, { useState } from 'react';
import { 
  ShieldCheck, Bot, Clock, Sparkles, Send, CheckCircle2, 
  AlertCircle, HelpCircle, Package, Truck, Ruler, CreditCard, 
  Scissors, Layers, FileText, UserCheck, Lock, ChevronRight, 
  MessageSquare, ArrowUpRight, Filter, Search, Info
} from 'lucide-react';

export default function ChatSupportPage({ theme }) {
  // State for active conversation
  const [selectedConvId, setSelectedConvId] = useState('ord-1024');
  const [filterTab, setFilterTab] = useState('all');
  const [rightTab, setRightTab] = useState('customer_order');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);

  // Mock Conversations List
  const [conversations, setConversations] = useState([
    {
      id: 'ord-1024',
      customerName: 'Priya Sharma',
      verified: true,
      customerId: 'CUST-1024',
      customerType: 'Regular',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      orderId: '#ORD-1024',
      garment: 'Bridal Lehenga',
      fabric: 'Net Fabric',
      status: 'Open',
      unreadCount: 2,
      time: '2 min ago',
      category: 'Order status question',
      requestMessage: 'Is my order #ORD-1024 ready?',
      requestTime: '10:30 AM',
      deliveryDate: '22 Jun 2026',
      orderValue: '₹8,500',
      progress: 80,
      aiResponseText: 'The stitching is currently in progress and the order is expected to be ready according to the scheduled delivery date.'
    },
    {
      id: 'ord-1023',
      customerName: 'Amit Verma',
      verified: true,
      customerId: 'CUST-1023',
      customerType: 'Regular',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      orderId: '#ORD-1023',
      garment: 'Sherwani Suit',
      fabric: 'Silk Fabric',
      status: 'Waiting',
      unreadCount: 0,
      time: '15 min ago',
      category: 'Delivery issue',
      requestMessage: 'Can I request delivery confirmation for order #ORD-1023?',
      requestTime: '10:15 AM',
      deliveryDate: '25 Jun 2026',
      orderValue: '₹12,000',
      progress: 60,
      aiResponseText: 'Your fabric cutting is completed and stitching is currently at 60% completion stage.'
    },
    {
      id: 'ord-0987',
      customerName: 'Sneha Iyer',
      verified: true,
      customerId: 'CUST-0987',
      customerType: 'New Customer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      orderId: '#ORD-0987',
      garment: 'Designer Blouse',
      fabric: 'Cotton Brocade',
      status: 'Open',
      unreadCount: 0,
      time: '1 hour ago',
      category: 'Payment question',
      requestMessage: 'Has my advance deposit payment for #ORD-0987 been verified?',
      requestTime: '09:30 AM',
      deliveryDate: '20 Jun 2026',
      orderValue: '₹3,200',
      progress: 40,
      aiResponseText: 'Payment deposit of ₹1,600 has been successfully logged by StitchBee Escrow.'
    },
    {
      id: 'ord-1011',
      customerName: 'Neha Kapoor',
      verified: true,
      customerId: 'CUST-1011',
      customerType: 'Regular',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      orderId: '#ORD-1011',
      garment: 'Anarkali Gown',
      fabric: 'Georgette',
      status: 'Resolved',
      unreadCount: 0,
      time: '2 hours ago',
      category: 'Measurement help',
      requestMessage: 'How do I update shoulder width for #ORD-1011?',
      requestTime: '08:45 AM',
      deliveryDate: '18 Jun 2026',
      orderValue: '₹6,800',
      progress: 100,
      aiResponseText: 'Master tailor confirmed measurement adjustments on 12 Jun 2026.'
    },
    {
      id: 'ord-1003',
      customerName: 'Rahul Mehta',
      verified: false,
      customerId: 'CUST-1003',
      customerType: 'Regular',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      orderId: '#ORD-1003',
      garment: 'Kurta Suit',
      fabric: 'Linen',
      status: 'Open',
      unreadCount: 0,
      time: '3 hours ago',
      category: 'Alteration request',
      requestMessage: 'Is fitting alteration possible for sleeve length?',
      requestTime: '07:30 AM',
      deliveryDate: '28 Jun 2026',
      orderValue: '₹4,500',
      progress: 50,
      aiResponseText: 'Sleeve alteration request queued for doorstep trial session.'
    },
    {
      id: 'ord-0985',
      customerName: 'Pooja Shah',
      verified: true,
      customerId: 'CUST-0985',
      customerType: 'Regular',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
      orderId: '#ORD-0985',
      garment: 'Chaniya Choli',
      fabric: 'Silk & Bandhani',
      status: 'Open',
      unreadCount: 0,
      time: '3 hours ago',
      category: 'Delivery address change',
      requestMessage: 'Can I update delivery landmark for #ORD-0985?',
      requestTime: '07:15 AM',
      deliveryDate: '30 Jun 2026',
      orderValue: '₹9,200',
      progress: 70,
      aiResponseText: 'StitchBee Logistics address modification ticket created.'
    }
  ]);

  // Active selected conversation object
  const activeConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  // Filter conversations
  const filteredConvs = conversations.filter(c => {
    const matchesSearch = c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.orderId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterTab === 'all') return true;
    if (filterTab === 'open') return c.status === 'Open';
    if (filterTab === 'waiting') return c.status === 'Waiting';
    if (filterTab === 'resolved') return c.status === 'Resolved';
    return true;
  });

  // Dynamic status badge styling
  const getStatusBadge = (status) => {
    if (status === 'Open') return { bg: 'rgba(247,37,133,0.1)', color: '#F72585', label: 'Open' };
    if (status === 'Waiting') return { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B', label: 'Waiting' };
    return { bg: 'rgba(16,185,129,0.1)', color: '#10B981', label: 'Resolved' };
  };

  // Quick Action Handler
  const handleQuickAction = (actionName) => {
    alert(`StitchBee AI Action triggered: "${actionName}" for order ${activeConv.orderId}. System update dispatch logged.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      
      {/* PAGE HEADER (BELOW NAVIGATION HEADER) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
              Chat Center
            </h1>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px', 
              padding: '4px 10px', 
              borderRadius: '999px', 
              fontSize: '11px', 
              fontWeight: 600, 
              background: 'rgba(16,185,129,0.1)', 
              color: '#10B981',
              border: '1px solid rgba(16,185,129,0.2)'
            }}>
              <Lock size={12} /> Secure Support Channel
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#64748B' }}>
            Manage customer requests with predefined messages and AI assistance.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            fontSize: '12px', 
            fontWeight: 600, 
            color: '#10B981',
            background: theme === 'dark' ? 'rgba(16,185,129,0.1)' : '#ECFDF5',
            padding: '6px 12px',
            borderRadius: '8px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            AI Assistant Online
          </span>

          <button
            onClick={() => setShowHowItWorksModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '8px',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E5E7EB',
              background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
              color: theme === 'dark' ? '#ffffff' : '#172033',
              cursor: 'pointer'
            }}
          >
            <Info size={14} /> How it works?
          </button>
        </div>
      </div>

      {/* MAIN 3-COLUMN LAYOUT (GRID: 24% 52% 24%) */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(260px, 24%) minmax(320px, 52%) minmax(260px, 24%)', 
          gap: '18px', 
          alignItems: 'start' 
        }}
        className="support-center-grid-layout"
      >
        
        {/* ================================================== */}
        {/* LEFT COLUMN — SUPPORT INBOX (24% WIDTH) */}
        {/* ================================================== */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
              Support Inbox
            </h2>
            <button style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}>
              <Filter size={16} />
            </button>
          </div>

          {/* Search Field */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#64748B' }} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 32px',
                fontSize: '12px',
                borderRadius: '8px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F8FAFC',
                color: theme === 'dark' ? '#ffffff' : '#172033',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Pill Tabs */}
          <div style={{ display: 'flex', gap: '4px', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F1F5F9', padding: '3px', borderRadius: '8px', overflowX: 'auto' }}>
            {[
              { id: 'all', label: `All ${conversations.length}` },
              { id: 'open', label: `Open ${conversations.filter(c => c.status === 'Open').length}` },
              { id: 'waiting', label: `Waiting ${conversations.filter(c => c.status === 'Waiting').length}` },
              { id: 'resolved', label: `Resolved ${conversations.filter(c => c.status === 'Resolved').length}` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={filterTab === tab.id ? 'btn-text-white-force' : ''}
                style={{
                  padding: '5px 8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: filterTab === tab.id ? '#F72585' : 'transparent',
                  color: filterTab === tab.id ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#64748B'),
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Conversation List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '480px', overflowY: 'auto' }}>
            {filteredConvs.map(conv => {
              const isSelected = selectedConvId === conv.id;
              const badgeStyle = getStatusBadge(conv.status);

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: isSelected 
                      ? (theme === 'dark' ? 'rgba(247,37,133,0.12)' : 'rgba(247,37,133,0.06)') 
                      : 'transparent',
                    borderLeft: isSelected ? '4px solid #F72585' : '4px solid transparent',
                    borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid #F1F5F9',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {/* Avatar */}
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid #E5E7EB' }}>
                    <img src={conv.avatar} alt={conv.customerName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '13px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#172033', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {conv.customerName}
                      </strong>
                      <span style={{ fontSize: '10px', color: '#64748B' }}>{conv.time}</span>
                    </div>

                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#F72585', margin: '1px 0' }}>
                      Order {conv.orderId}
                    </div>

                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {conv.category}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                      <span style={{ 
                        fontSize: '9px', 
                        fontWeight: 600, 
                        background: badgeStyle.bg, 
                        color: badgeStyle.color, 
                        padding: '1px 6px', 
                        borderRadius: '4px' 
                      }}>
                        {badgeStyle.label}
                      </span>

                      {conv.unreadCount > 0 && (
                        <span style={{ 
                          fontSize: '9px', 
                          fontWeight: 700, 
                          background: '#F72585', 
                          color: '#ffffff', 
                          width: '16px', 
                          height: '16px', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* New Support Ticket Button */}
          <button
            onClick={() => alert("Creating new support ticket for pending orders...")}
            className="btn-text-white-force"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '11px',
              fontWeight: 600,
              borderRadius: '8px',
              background: '#F72585',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(247,37,133,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            + New Support Ticket
          </button>

          {/* Privacy Notice */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748B', lineHeight: '1.4' }}>
            <Lock size={12} style={{ flexShrink: 0, color: '#10B981' }} />
            <span>All conversations are managed by StitchBee to keep your data secure.</span>
          </div>

        </div>

        {/* ================================================== */}
        {/* CENTER COLUMN — AI ASSISTANT (52% WIDTH — DOMINANT) */}
        {/* ================================================== */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
        }}>
          
          {/* AI Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #F72585 0%, #8B0FCB 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                    StitchBee AI Assistant
                  </h3>
                  <span style={{ fontSize: '9px', fontWeight: 600, background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '1px 6px', borderRadius: '999px' }}>
                    ● Live
                  </span>
                </div>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#64748B' }}>
                  Your intelligent support assistant for customer requests
                </p>
              </div>
            </div>
          </div>

          {/* Selected Customer Context Bar */}
          <div style={{
            background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '12px 14px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={activeConv.avatar} alt={activeConv.customerName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <strong style={{ fontSize: '13px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                  {activeConv.customerName}
                </strong>
                {activeConv.verified && (
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#10B981', marginLeft: '6px' }}>
                    ✓ Verified Customer
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
              <span style={{ fontWeight: 600, color: '#F72585' }}>Order {activeConv.orderId}</span>
              <span style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>{activeConv.garment}</span>
              <span style={{ color: '#64748B', fontSize: '11px' }}>Delivery: {activeConv.deliveryDate}</span>
            </div>
          </div>

          {/* CUSTOMER REQUEST CARD */}
          <div style={{
            background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#F1F5F9',
            borderLeft: '4px solid #64748B',
            borderRadius: '8px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Customer Request
              </span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>{activeConv.requestTime}</span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
              "{activeConv.requestMessage}"
            </p>
          </div>

          {/* AI RESPONSE CARD */}
          <div style={{
            background: theme === 'dark' ? 'rgba(247,37,133,0.05)' : '#FFF0F6',
            border: '1px solid rgba(247,37,133,0.2)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#F72585', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> StitchBee AI Assistant
              </span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>10:31 AM</span>
            </div>

            <p style={{ margin: 0, fontSize: '13px', fontWeight: 500, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
              Here's the latest update for order {activeConv.orderId}:
            </p>

            {/* ORDER INFORMATION CARD */}
            <div style={{
              background: theme === 'dark' ? '#141126' : '#ffffff',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '14px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                  {activeConv.garment}
                </strong>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Fabric: {activeConv.fabric}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <span>Status: <strong style={{ color: '#F72585' }}>Stitching in Progress</strong></span>
                <span>Progress: <strong style={{ color: '#F72585' }}>{activeConv.progress}%</strong></span>
              </div>

              {/* REAL PROGRESS BAR */}
              <div style={{
                height: '8px',
                background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
                borderRadius: '999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${activeConv.progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #F72585 0%, #8B0FCB 100%)',
                  borderRadius: '999px',
                  transition: 'width 600ms ease'
                }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748B', paddingTop: '4px', borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid #F1F5F9' }}>
                <span>Expected Delivery: <strong style={{ color: theme === 'dark' ? '#ffffff' : '#172033' }}>{activeConv.deliveryDate}</strong></span>
                <span>Order Value: <strong style={{ color: theme === 'dark' ? '#ffffff' : '#172033' }}>{activeConv.orderValue}</strong></span>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '13px', fontWeight: 400, lineHeight: '18px', color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#475467' }}>
              "{activeConv.aiResponseText}"
            </p>
          </div>

          {/* SUGGESTED ACTIONS */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
              SUGGESTED ACTIONS
            </span>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => handleQuickAction('Send Status Update')}
                className="btn-text-white-force"
                style={{
                  padding: '8px 14px',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  background: '#F72585',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(247,37,133,0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Send size={12} /> Send Status Update
              </button>

              <button
                onClick={() => handleQuickAction('Request Measurement')}
                style={{
                  padding: '8px 14px',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
                  color: theme === 'dark' ? '#ffffff' : '#172033',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Ruler size={12} /> Request Measurement
              </button>

              <button
                onClick={() => handleQuickAction('Change Delivery Date')}
                style={{
                  padding: '8px 14px',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E7EB',
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
                  color: theme === 'dark' ? '#ffffff' : '#172033',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Clock size={12} /> Change Delivery Date
              </button>

              <button
                onClick={() => handleQuickAction('Report an Issue')}
                style={{
                  padding: '8px 14px',
                  fontSize: '11px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: '1px solid rgba(239,68,68,0.25)',
                  background: 'rgba(239,68,68,0.05)',
                  color: '#EF4444',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <AlertCircle size={12} /> Report an Issue
              </button>
            </div>
          </div>

          {/* QUICK HELP TOPICS */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467', display: 'block', marginBottom: '10px' }}>
              Or select a quick help topic:
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {[
                { title: 'Order Status', desc: 'Track progress', icon: <Package size={14} color="#F72585" /> },
                { title: 'Delivery', desc: 'Schedules & slots', icon: <Truck size={14} color="#8B0FCB" /> },
                { title: 'Measurements', desc: 'Fitting guidelines', icon: <Ruler size={14} color="#10B981" /> },
                { title: 'Payment', desc: 'Escrow & invoices', icon: <CreditCard size={14} color="#F59E0B" /> },
                { title: 'Alteration', desc: 'Adjustments & fixes', icon: <Scissors size={14} color="#0EA5E9" /> },
                { title: 'Other Help', desc: 'StitchBee support', icon: <HelpCircle size={14} color="#7C3AED" /> }
              ].map((topic, idx) => (
                <div
                  key={idx}
                  onClick={() => handleQuickAction(topic.title)}
                  style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
                    borderRadius: '10px',
                    padding: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {topic.icon}
                    <strong style={{ fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                      {topic.title}
                    </strong>
                  </div>
                  <span style={{ fontSize: '10px', color: '#64748B' }}>{topic.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================================================== */}
        {/* RIGHT COLUMN — CUSTOMER & ORDER (24% WIDTH) */}
        {/* ================================================== */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
        }}>
          
          {/* Card Tabs */}
          <div style={{ display: 'flex', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', paddingBottom: '8px' }}>
            {[
              { id: 'customer_order', label: 'Customer & Order' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'files', label: 'Files' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRightTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: 'none',
                  borderBottom: rightTab === tab.id ? '2px solid #F72585' : '2px solid transparent',
                  background: 'transparent',
                  color: rightTab === tab.id ? '#F72585' : (theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#64748B'),
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: CUSTOMER & ORDER DETAILS */}
          {rightTab === 'customer_order' && (
            <>
              {/* Customer Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '14px', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={activeConv.avatar} alt={activeConv.customerName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <strong style={{ fontSize: '14px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>
                      {activeConv.customerName}
                    </strong>
                    {activeConv.verified && (
                      <span style={{ fontSize: '10px', fontWeight: 600, color: '#10B981' }}>
                        ✓ Verified Customer
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', marginTop: '4px' }}>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Customer ID</span>
                    <strong style={{ color: theme === 'dark' ? '#ffffff' : '#172033' }}>{activeConv.customerId}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Customer Type</span>
                    <strong style={{ color: theme === 'dark' ? '#ffffff' : '#172033' }}>{activeConv.customerType}</strong>
                  </div>
                </div>

                {/* Privacy Badge Banner */}
                <div style={{ background: theme === 'dark' ? 'rgba(16,185,129,0.06)' : '#ECFDF5', padding: '6px 8px', borderRadius: '6px', fontSize: '10px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Lock size={12} /> Contact details protected by StitchBee
                </div>
              </div>

              {/* Order Overview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '14px', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Order Overview
                </span>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', background: '#F1F5F9', border: '1px solid #E5E7EB', flexShrink: 0 }}>
                    <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=200" alt={activeConv.garment} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '12px', fontWeight: 700, color: '#F72585' }}>{activeConv.orderId}</strong>
                      <span style={{ fontSize: '10px', fontWeight: 600, background: 'rgba(247,37,133,0.1)', color: '#F72585', padding: '1px 5px', borderRadius: '4px' }}>In Progress</span>
                    </div>
                    <strong style={{ fontSize: '13px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>{activeConv.garment}</strong>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>Fabric: {activeConv.fabric}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Delivery Date</span>
                    <strong style={{ color: theme === 'dark' ? '#ffffff' : '#172033' }}>{activeConv.deliveryDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Order Value</span>
                    <strong style={{ color: theme === 'dark' ? '#ffffff' : '#172033' }}>{activeConv.orderValue}</strong>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, color: '#64748B' }}>
                    <span>Stitching Progress</span>
                    <span>{activeConv.progress}%</span>
                  </div>
                  <div style={{ height: '6px', background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${activeConv.progress}%`, height: '100%', background: '#F72585', borderRadius: '999px' }} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: VERTICAL ORDER TIMELINE */}
          {(rightTab === 'timeline' || rightTab === 'customer_order') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Order Timeline
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '8px', borderLeft: theme === 'dark' ? '2px solid rgba(255,255,255,0.08)' : '2px solid #E5E7EB', marginLeft: '6px' }}>
                {[
                  { title: 'Order Confirmed', time: '10 Jun 2026, 10:30 AM', state: 'completed' },
                  { title: 'Measurements Added', time: '12 Jun 2026, 11:15 AM', state: 'completed' },
                  { title: 'Stitching in Progress', time: '14 Jun 2026, 09:45 AM', state: 'current' },
                  { title: 'Quality Check', time: 'Pending', state: 'pending' },
                  { title: 'Ready for Delivery', time: 'Pending', state: 'pending' },
                  { title: 'Delivered', time: 'Pending', state: 'pending' }
                ].map((step, idx) => (
                  <div key={idx} style={{ position: 'relative', paddingLeft: '12px' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-15px',
                      top: '2px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: step.state === 'completed' ? '#10B981' : (step.state === 'current' ? '#F72585' : '#CBD5E1'),
                      border: theme === 'dark' ? '2px solid #141126' : '2px solid #ffffff'
                    }} />
                    <strong style={{ fontSize: '12px', fontWeight: 600, color: step.state === 'current' ? '#F72585' : (theme === 'dark' ? '#ffffff' : '#172033'), display: 'block' }}>
                      {step.title}
                    </strong>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>{step.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FILES TAB */}
          {rightTab === 'files' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Attached Files
              </span>
              {[
                { name: 'lehenga_sketch.pdf', size: '1.2 MB' },
                { name: 'fabric_sample_net.jpg', size: '850 KB' },
                { name: 'measurement_sheet.pdf', size: '420 KB' }
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '6px', background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: '1px solid #E5E7EB', fontSize: '11px' }}>
                  <FileText size={14} color="#F72585" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                    <span style={{ fontSize: '9px', color: '#64748B' }}>{f.size}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ESCALATION SECTION */}
          <div style={{
            background: theme === 'dark' ? 'linear-gradient(135deg, rgba(247,37,133,0.08) 0%, rgba(139,15,203,0.08) 100%)' : 'linear-gradient(135deg, #FFF0F6 0%, #F5F3FF 100%)',
            border: '1px solid rgba(247,37,133,0.25)',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: 'auto'
          }}>
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#F72585' }}>
              Need More Help?
            </h4>
            <p style={{ margin: 0, fontSize: '11px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467', lineHeight: '15px' }}>
              AI can't resolve this issue? Escalate to StitchBee Support.
            </p>

            <button
              onClick={() => alert("Ticket escalated directly to StitchBee Senior Support Desk.")}
              className="btn-text-white-force"
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #F72585 0%, #8B0FCB 100%)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(247,37,133,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '4px'
              }}
            >
              <ShieldCheck size={14} /> Contact StitchBee Support
            </button>
          </div>

        </div>

      </div>

      {/* HOW IT WORKS MODAL */}
      {showHowItWorksModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: theme === 'dark' ? '#141126' : '#ffffff',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
            borderRadius: '16px',
            padding: '24px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                How StitchBee AI Support Works
              </h3>
              <button 
                onClick={() => setShowHowItWorksModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '18px', color: '#64748B', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467', lineHeight: '18px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#F72585', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: '11px' }}>1</span>
                <div>
                  <strong style={{ color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>Customer Selects Predefined Request</strong>
                  Customers choose structured queries regarding order status, measurements, or delivery times.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8B0FCB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: '11px' }}>2</span>
                <div>
                  <strong style={{ color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>AI Queries Live Order Data</strong>
                  StitchBee AI automatically retrieves real-time order status, fabric progress, and schedule logs.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: '11px' }}>3</span>
                <div>
                  <strong style={{ color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>Controlled Tailor Actions & Escalation</strong>
                  Tailors execute predefined actions (e.g. status updates, trial schedules) or escalate to StitchBee Human Support if needed.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB', paddingTop: '14px' }}>
              <button 
                onClick={() => setShowHowItWorksModal(false)}
                className="btn-text-white-force"
                style={{ padding: '8px 18px', fontSize: '12px', fontWeight: 600, background: '#F72585', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
