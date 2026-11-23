import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle2, ChevronRight, ArrowLeft, Clock, 
  Sparkles, ShieldCheck, MapPin, User, ArrowRight, Search, 
  FileText, Printer, Copy, Check, RotateCcw, AlertCircle, 
  Phone, MessageSquare, X, ExternalLink, Calendar, CreditCard, 
  ShoppingBag, HelpCircle 
} from 'lucide-react';
import { 
  getOrders, 
  cancelOrder, 
  ORDER_SERVICE_CATEGORIES, 
  ORDER_STATUS_TABS, 
  REGULAR_ORDER_STEPS, 
  CUSTOM_QUOTE_STEPS,
  resolveServiceCategory,
  getCategoryLabel
} from '../../utils/ordersStore';
import { addToCart } from '../../utils/bagsStore';

export default function BagsOrdersView({ showToast }) {
  const navigate = useNavigate();
  const location = useLocation();
  const justPlaced = location.state?.justPlaced;
  const newOrderId = location.state?.newOrderId;

  // Local toast fallback
  const triggerToast = (msg) => {
    if (typeof showToast === 'function') {
      showToast(msg);
    } else {
      console.log('Toast:', msg);
    }
  };

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      return getOrders() || [];
    } catch (e) {
      return [];
    }
  });

  // Sync with store updates
  useEffect(() => {
    const handleUpdate = () => {
      try {
        setOrders(getOrders() || []);
      } catch (e) {}
    };
    window.addEventListener('stitchbee-store-update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('stitchbee-store-update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatusTab, setSelectedStatusTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  // Modals state
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState(null);
  const [helpModalOrder, setHelpModalOrder] = useState(null);
  const [copiedTrackingId, setCopiedTrackingId] = useState(null);

  // Copy tracking number handler
  const handleCopyTracking = (trackingNum, e) => {
    e.stopPropagation();
    if (!trackingNum) return;
    navigator.clipboard?.writeText(trackingNum);
    setCopiedTrackingId(trackingNum);
    triggerToast(`Tracking ID ${trackingNum} copied to clipboard!`);
    setTimeout(() => {
      setCopiedTrackingId(null);
    }, 2000);
  };

  // Reorder / Buy Again Handler
  const handleBuyAgain = (order) => {
    if (!order || !order.items || order.items.length === 0) return;
    let addedCount = 0;
    order.items.forEach(item => {
      addToCart({
        id: item.id || `reorder-${Math.random().toString(36).substr(2, 6)}`,
        name: item.name,
        price: item.price,
        image: item.img,
        img: item.img,
        category: item.category || order.serviceCategory
      }, item.qty || 1, item.color || null);
      addedCount += (item.qty || 1);
    });
    triggerToast(`Added ${addedCount} item${addedCount > 1 ? 's' : ''} from ${order.id} to cart!`);
    navigate('/cart');
  };

  // Cancel order handler
  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order ${orderId}? This cannot be undone.`)) {
      cancelOrder(orderId, 'Cancelled by Customer');
      triggerToast(`Order ${orderId} has been cancelled.`);
    }
  };

  // Filtered orders calculation
  const filteredOrders = useMemo(() => {
    return (orders || []).filter(order => {
      if (!order) return false;

      // 1. Category Filter
      const cat = order.serviceCategory || resolveServiceCategory(order.category || order.items?.[0]?.name);
      if (selectedCategory !== 'all' && cat !== selectedCategory) {
        return false;
      }

      // 2. Status Tab Filter
      if (selectedStatusTab === 'active') {
        const isCompleted = order.statusCode === 'delivered' || order.statusCode === 'cancelled';
        if (isCompleted) return false;
      } else if (selectedStatusTab === 'delivered') {
        if (order.statusCode !== 'delivered') return false;
      } else if (selectedStatusTab === 'custom') {
        if (order.type !== 'custom') return false;
      } else if (selectedStatusTab === 'cancelled') {
        if (order.statusCode !== 'cancelled') return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesId = String(order.id || '').toLowerCase().includes(query);
        const matchesCourier = String(order.courier || '').toLowerCase().includes(query);
        const matchesTracking = String(order.trackingNumber || '').toLowerCase().includes(query);
        const matchesAddress = String(typeof order.address === 'string' ? order.address : (order.address?.street || '')).toLowerCase().includes(query);
        const matchesCustomer = String(order.customerName || '').toLowerCase().includes(query);
        const matchesItems = order.items && order.items.some(it => 
          String(it.name || '').toLowerCase().includes(query) ||
          String(it.category || '').toLowerCase().includes(query)
        );
        if (!matchesId && !matchesCourier && !matchesTracking && !matchesAddress && !matchesCustomer && !matchesItems) {
          return false;
        }
      }

      // 4. Time filter (mock demonstration)
      if (timeFilter === '30days') {
        // Only orders from recent days
      }

      return true;
    });
  }, [orders, selectedCategory, selectedStatusTab, searchQuery, timeFilter]);

  // Counts for Category Badges
  const categoryCounts = useMemo(() => {
    const counts = { all: orders.length };
    ORDER_SERVICE_CATEGORIES.forEach(c => {
      if (c.id !== 'all') {
        counts[c.id] = orders.filter(o => {
          const cat = o.serviceCategory || resolveServiceCategory(o.category || o.items?.[0]?.name);
          return cat === c.id;
        }).length;
      }
    });
    return counts;
  }, [orders]);

  // Counts for Status Tabs
  const statusCounts = useMemo(() => {
    return {
      all: orders.length,
      active: orders.filter(o => o.statusCode !== 'delivered' && o.statusCode !== 'cancelled').length,
      delivered: orders.filter(o => o.statusCode === 'delivered').length,
      custom: orders.filter(o => o.type === 'custom').length,
      cancelled: orders.filter(o => o.statusCode === 'cancelled').length
    };
  }, [orders]);

  // Category Theme Badges helper
  const getCategoryTheme = (serviceCategory) => {
    switch (serviceCategory) {
      case 'clothing':
        return { label: 'Clothing & Uniforms', icon: '👔', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)', border: '#2563eb' };
      case 'bags':
        return { label: 'Bags & Leather', icon: '👜', color: '#db2777', bg: 'rgba(219, 39, 119, 0.1)', border: '#db2777' };
      case 'shoes':
        return { label: 'Shoes & Slippers', icon: '👞', color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.1)', border: '#7c3aed' };
      case 'seats':
        return { label: 'Vehicle Seat Covers', icon: '🚗', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.1)', border: '#0284c7' };
      case 'pets':
        return { label: 'Pet Outfits', icon: '🐾', color: '#ea580c', bg: 'rgba(234, 88, 12, 0.1)', border: '#ea580c' };
      case 'gifts':
        return { label: 'Handmade Gifts', icon: '🎁', color: '#059669', bg: 'rgba(5, 150, 105, 0.1)', border: '#059669' };
      case 'sofas':
        return { label: 'Sofas & Living', icon: '🛋️', color: '#4f46e5', bg: 'rgba(79, 70, 229, 0.1)', border: '#4f46e5' };
      case 'kids':
        return { label: 'Kids Wear', icon: '👶', color: '#e11d48', bg: 'rgba(225, 29, 72, 0.1)', border: '#e11d48' };
      default:
        return { label: 'Artisan Craft', icon: '✨', color: '#f72585', bg: 'rgba(247, 37, 133, 0.1)', border: '#f72585' };
    }
  };

  // Status Styling helper
  const getStatusBadgeStyle = (statusCode) => {
    switch (statusCode) {
      case 'delivered':
        return { bg: 'rgba(16, 185, 129, 0.14)', color: '#10b981', border: '#10b981', label: 'Delivered' };
      case 'shipped':
        return { bg: 'rgba(59, 130, 246, 0.14)', color: '#3b82f6', border: '#3b82f6', label: 'In Transit' };
      case 'crafting':
      case 'processing':
        return { bg: 'rgba(245, 158, 11, 0.14)', color: '#f59e0b', border: '#f59e0b', label: 'Artisan Crafting' };
      case 'cancelled':
        return { bg: 'rgba(239, 68, 68, 0.14)', color: '#ef4444', border: '#ef4444', label: 'Cancelled' };
      case 'quote_requested':
        return { bg: 'rgba(168, 85, 247, 0.14)', color: '#a855f7', border: '#a855f7', label: 'Quote Requested' };
      default:
        return { bg: 'rgba(247, 37, 133, 0.14)', color: '#f72585', border: '#f72585', label: 'Confirmed' };
    }
  };

  return (
    <div className="bl-orders-page">
      <div className="bl-container" style={{ padding: '24px 16px 80px', maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
          <span onClick={() => navigate('/')} className="bl-crumb-link" style={{ cursor: 'pointer' }}>Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/bags')} className="bl-crumb-link" style={{ cursor: 'pointer' }}>Artisan Studios</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active" style={{ color: 'var(--bl-pink, #f72585)', fontWeight: 700 }}>
            Universal Orders Hub
          </span>
        </nav>

        {/* Quick Hub Navigation Shortcuts */}
        <div style={{ marginBottom: '22px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--bl-text-secondary, #64748b)' }}>
            Jump to Category:
          </span>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/uniforms')}
            style={{ fontSize: '0.8rem', padding: '5px 12px' }}
          >
            👔 Uniforms & Clothing
          </button>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/bags')}
            style={{ fontSize: '0.8rem', padding: '5px 12px' }}
          >
            👜 Bags Studio
          </button>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/footwear')}
            style={{ fontSize: '0.8rem', padding: '5px 12px' }}
          >
            👞 Footwear Studio
          </button>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/seat-covers')}
            style={{ fontSize: '0.8rem', padding: '5px 12px' }}
          >
            🚗 Vehicle Seat Covers
          </button>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/pets')}
            style={{ fontSize: '0.8rem', padding: '5px 12px' }}
          >
            🐾 Pet Outfits
          </button>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/handmade-gifts')}
            style={{ fontSize: '0.8rem', padding: '5px 12px' }}
          >
            🎁 Handmade Gifts
          </button>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/sofas')}
            style={{ fontSize: '0.8rem', padding: '5px 12px' }}
          >
            🛋️ Sofas & Living
          </button>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: '28px', borderBottom: '1px solid var(--bl-border, #e2e8f0)', paddingBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="bl-tag-label" style={{ 
              background: 'rgba(247, 37, 133, 0.1)', 
              color: 'var(--bl-pink, #f72585)', 
              padding: '4px 10px', 
              borderRadius: '6px', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              letterSpacing: '0.05em' 
            }}>
              CENTRALIZED ARTISAN TRACKING & ORDER HISTORY
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--bl-text-secondary, #64748b)' }}>
              • All 8 Categories Unified
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 className="bl-serif-title" style={{ fontSize: '2.4rem', margin: '4px 0 8px', fontWeight: 800 }}>
                My Orders & Custom Quotes
              </h1>
              <p className="bl-section-subtext" style={{ margin: 0, maxWidth: '780px', color: 'var(--bl-text-secondary, #64748b)', fontSize: '0.96rem', lineHeight: 1.5 }}>
                Real-time tracking, GST invoices, and live artisan milestone progress across all StitchBeez categories — 
                from tailored uniforms and bespoke bags to handcrafted shoes, vehicle seat covers, and pet outfits.
              </p>
            </div>

            {/* Quick Metrics Badge Counters */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              background: 'var(--bl-warm-card, #ffffff)', 
              padding: '12px 18px', 
              borderRadius: '14px', 
              border: '1px solid var(--bl-border, #e2e8f0)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ textAlign: 'center', padding: '0 8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--bl-pink, #f72585)' }}>
                  {orders.length}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--bl-text-secondary, #64748b)', fontWeight: 600 }}>Total Orders</div>
              </div>
              <div style={{ width: '1px', background: 'var(--bl-border, #e2e8f0)' }} />
              <div style={{ textAlign: 'center', padding: '0 8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#3b82f6' }}>
                  {statusCounts.active}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--bl-text-secondary, #64748b)', fontWeight: 600 }}>In-Transit / Active</div>
              </div>
              <div style={{ width: '1px', background: 'var(--bl-border, #e2e8f0)' }} />
              <div style={{ textAlign: 'center', padding: '0 8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                  {statusCounts.delivered}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--bl-text-secondary, #64748b)', fontWeight: 600 }}>Delivered</div>
              </div>
            </div>
          </div>
        </div>

        {/* New Order Just Placed Alert Banner */}
        {justPlaced && (
          <div className="bl-just-placed-banner" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(247, 37, 133, 0.14) 100%)',
            border: '2px solid #10b981',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            boxShadow: '0 10px 28px rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <CheckCircle2 size={28} color="#ffffff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--bl-text, #1e293b)', fontWeight: 800 }}>
                  Order Confirmed! Artisan Production Initiated
                </h3>
                {newOrderId && (
                  <span style={{ 
                    background: '#10b981', 
                    color: '#ffffff', 
                    padding: '3px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.84rem', 
                    fontWeight: 800,
                    letterSpacing: '0.04em'
                  }}>
                    {newOrderId}
                  </span>
                )}
              </div>
              <p style={{ margin: '6px 0 0', fontSize: '0.92rem', color: 'var(--bl-text-secondary, #475569)' }}>
                Thank you! Your order has been registered in the centralized StitchBeez hub and assigned to our master craft team.
                Follow every real-time production milestone below.
              </p>
            </div>
          </div>
        )}

        {/* Category Filter Pills (Horizontal Scroll Bar) */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--bl-text-secondary, #64748b)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Filter by Service Category:
            </span>
            {selectedCategory !== 'all' && (
              <button 
                onClick={() => setSelectedCategory('all')} 
                style={{ background: 'none', border: 'none', color: 'var(--bl-pink, #f72585)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                Clear Category Filter
              </button>
            )}
          </div>
          
          <div className="bl-orders-cat-filters-bar" style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '10px',
            scrollbarWidth: 'thin'
          }}>
            {ORDER_SERVICE_CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`bl-orders-cat-pill ${isActive ? 'active' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    border: isActive ? '2px solid var(--bl-pink, #f72585)' : '1px solid var(--bl-border, #cbd5e1)',
                    background: isActive ? 'var(--bl-pink, #f72585)' : 'var(--bl-warm-card, #ffffff)',
                    color: isActive ? '#ffffff' : 'var(--bl-text, #1e293b)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(247, 37, 133, 0.25)' : 'none'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '1px 7px',
                    borderRadius: '12px',
                    background: isActive ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.06)',
                    color: isActive ? '#ffffff' : 'inherit'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Bar: Status Filter Tabs, Search Bar & Timeframe Filter */}
        <div className="bl-orders-controls-bar" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          background: 'var(--bl-warm-card, #ffffff)',
          padding: '14px 18px',
          borderRadius: '16px',
          border: '1px solid var(--bl-border, #e2e8f0)',
          marginBottom: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {ORDER_STATUS_TABS.map(tab => {
              const isActive = selectedStatusTab === tab.id;
              const count = statusCounts[tab.id] || 0;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatusTab(tab.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive ? 'rgba(247, 37, 133, 0.12)' : 'transparent',
                    color: isActive ? 'var(--bl-pink, #f72585)' : 'var(--bl-text-secondary, #64748b)',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{tab.label}</span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '8px',
                    background: isActive ? 'var(--bl-pink, #f72585)' : 'rgba(0,0,0,0.05)',
                    color: isActive ? '#ffffff' : 'inherit'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Dropdown Filter Group */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', flex: '1 1 320px', justifyContent: 'flex-end' }}>
            <div style={{ position: 'relative', minWidth: '220px', flex: '1 1 auto' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--bl-text-secondary, #94a3b8)' }} />
              <input
                type="text"
                placeholder="Search by Order ID, item, courier, address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '10px',
                  border: '1px solid var(--bl-border, #cbd5e1)',
                  background: 'var(--bl-bg, #f8fafc)',
                  fontSize: '0.84rem',
                  color: 'var(--bl-text, #1e293b)',
                  outline: 'none'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid var(--bl-border, #cbd5e1)',
                background: 'var(--bl-bg, #f8fafc)',
                fontSize: '0.84rem',
                color: 'var(--bl-text, #1e293b)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="6months">Last 6 Months</option>
              <option value="2026">Year 2026</option>
            </select>
          </div>
        </div>

        {/* Orders Stack */}
        <div className="bl-orders-stack" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => {
              if (!order) return null;
              const isCustom = order.type === 'custom' || order.category === 'custom';
              const steps = isCustom ? CUSTOM_QUOTE_STEPS : REGULAR_ORDER_STEPS;
              const currentIndex = typeof order.statusIndex === 'number' 
                ? order.statusIndex 
                : (order.statusCode === 'delivered' ? steps.length - 1 : (isCustom ? 1 : 2));
              
              const catKey = order.serviceCategory || resolveServiceCategory(order.category || order.items?.[0]?.name);
              const theme = getCategoryTheme(catKey);
              const statusStyle = getStatusBadgeStyle(order.statusCode);
              const isCancelled = order.statusCode === 'cancelled';

              return (
                <div 
                  key={order.id || `order-${Math.random()}`} 
                  className="bl-order-card"
                  style={{
                    background: 'var(--bl-warm-card, #ffffff)',
                    border: '1px solid var(--bl-border, #e2e8f0)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Order Top Bar */}
                  <div className="bl-order-top-bar" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    background: 'rgba(0, 0, 0, 0.02)',
                    borderBottom: '1px solid var(--bl-border, #e2e8f0)',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    {/* Left: ID & Category Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--bl-text-secondary, #64748b)' }}>Order:</span>
                      <strong style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.02em', color: 'var(--bl-text-primary, #0f172a)' }}>
                        {order.id}
                      </strong>
                      
                      {/* Category Badge with Color and Icon */}
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '10px',
                        background: theme.bg,
                        color: theme.color,
                        border: `1px solid ${theme.border}`
                      }}>
                        <span>{theme.icon}</span>
                        <span>{order.serviceCategoryLabel || theme.label}</span>
                      </span>

                      {/* Type Badge */}
                      <span className="bl-order-type-badge" style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 9px',
                        borderRadius: '10px',
                        background: isCustom ? 'rgba(168, 85, 247, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        color: isCustom ? '#a855f7' : 'var(--bl-text-secondary, #475569)'
                      }}>
                        {isCustom ? 'Bespoke Atelier' : 'Direct Order'}
                      </span>
                    </div>

                    {/* Right: Date & Status Chip */}
                    <div className="bl-order-meta-right" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <span className="bl-order-date" style={{ fontSize: '0.8rem', color: 'var(--bl-text-secondary, #64748b)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={13} /> {order.date || 'Recent Order'}
                      </span>
                      <span className={`bl-order-status-chip ${order.statusCode || 'processing'}`} style={{
                        padding: '5px 14px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        border: `1px solid ${statusStyle.border}`
                      }}>
                        {order.status || statusStyle.label}
                      </span>
                    </div>
                  </div>

                  {/* Visual Status Progress Stepper */}
                  {!isCancelled && (
                    <div className="bl-order-stepper-box" style={{
                      padding: '24px',
                      borderBottom: '1px solid var(--bl-border, #e2e8f0)',
                      background: 'rgba(255, 255, 255, 0.4)',
                      overflowX: 'auto'
                    }}>
                      <div className="bl-order-stepper-track" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minWidth: '680px',
                        position: 'relative'
                      }}>
                        {steps.map((stName, idx) => {
                          const isDone = idx < currentIndex || (idx === currentIndex && order.statusCode === 'delivered');
                          const isCurrent = idx === currentIndex && order.statusCode !== 'delivered';
                          return (
                            <div 
                              key={idx} 
                              className={`bl-order-step-node ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}
                            >
                              <div 
                                className="bl-order-step-dot"
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  background: isDone ? '#10b981' : (isCurrent ? 'var(--bl-pink, #f72585)' : 'var(--bl-warm-card, #ffffff)'),
                                  border: `2px solid ${isDone ? '#10b981' : (isCurrent ? 'var(--bl-pink, #f72585)' : 'var(--bl-border, #cbd5e1)')}`,
                                  color: isDone || isCurrent ? '#ffffff' : 'var(--bl-text-secondary, #94a3b8)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  boxShadow: isCurrent ? '0 0 0 5px rgba(247, 37, 133, 0.2)' : 'none',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {isDone ? <Check size={16} strokeWidth={3} /> : idx + 1}
                              </div>
                              <span 
                                className="bl-order-step-name" 
                                style={{ 
                                  fontSize: '0.74rem', 
                                  fontWeight: isCurrent ? 700 : (isDone ? 600 : 500),
                                  color: isCurrent ? 'var(--bl-pink, #f72585)' : (isDone ? 'var(--bl-text, #0f172a)' : 'var(--bl-text-secondary, #94a3b8)'),
                                  textAlign: 'center',
                                  maxWidth: '85px'
                                }}
                              >
                                {stName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Cancellation Alert Banner */}
                  {isCancelled && (
                    <div style={{
                      padding: '16px 24px',
                      background: 'rgba(239, 68, 68, 0.08)',
                      borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: '#ef4444'
                    }}>
                      <AlertCircle size={20} />
                      <div style={{ fontSize: '0.88rem' }}>
                        <strong>This order was cancelled.</strong> {order.cancelReason ? `Reason: ${order.cancelReason}` : 'Refund processed to original payment method.'}
                      </div>
                    </div>
                  )}

                  {/* Order Content Body */}
                  <div className="bl-order-content-area" style={{ padding: '24px' }}>
                    
                    {/* Items Grid */}
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--bl-text-secondary, #64748b)', textTransform: 'uppercase', marginBottom: '12px' }}>
                        Purchased Items ({order.items ? order.items.length : 1}):
                      </div>

                      <div className="bl-order-items-sublist" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {order.items && Array.isArray(order.items) && order.items.length > 0 ? (
                          order.items.map((it, idx) => {
                            if (!it) return null;
                            const itPrice = typeof it.price === 'number' ? it.price : (parseFloat(String(it.price).replace(/[^0-9.]/g, '')) || 0);
                            const itQty = it.qty || it.quantity || 1;
                            const itImg = it.img || it.image || '/shoes_categories/HeroSection.png';
                            
                            return (
                              <div 
                                key={idx} 
                                className="bl-order-item-mini"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '12px 16px',
                                  background: 'var(--bl-bg, #f8fafc)',
                                  borderRadius: '14px',
                                  border: '1px solid var(--bl-border, #e2e8f0)',
                                  gap: '16px',
                                  flexWrap: 'wrap'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                  <img 
                                    src={itImg} 
                                    alt={it.name || 'Order Item'} 
                                    onError={(e) => { e.target.src = '/logo.png'; }}
                                    style={{
                                      width: '64px',
                                      height: '64px',
                                      borderRadius: '10px',
                                      objectFit: 'contain',
                                      background: '#ffffff',
                                      border: '1px solid var(--bl-border, #e2e8f0)',
                                      padding: '4px'
                                    }} 
                                  />
                                  <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <strong style={{ fontSize: '0.96rem', color: 'var(--bl-text-primary, #0f172a)' }}>
                                        {it.name || 'Artisan Product'}
                                      </strong>
                                      {it.category && (
                                        <span style={{ fontSize: '0.72rem', background: 'rgba(0,0,0,0.06)', padding: '2px 8px', borderRadius: '6px', color: 'var(--bl-text-secondary, #64748b)' }}>
                                          {it.category}
                                        </span>
                                      )}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--bl-text-secondary, #64748b)', margin: '4px 0 2px' }}>
                                      Qty: <strong>{itQty}</strong> 
                                      {it.color && <span> • Color: <strong>{it.color}</strong></span>}
                                      {it.size && <span> • Size: <strong>{it.size}</strong></span>}
                                      {it.material && <span> • Spec: <em>{it.material}</em></span>}
                                    </div>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--bl-text-secondary, #94a3b8)' }}>
                                      Item Ref: {it.id || `ITM-${idx+1}`}
                                    </span>
                                  </div>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--bl-pink, #f72585)' }}>
                                    {itPrice > 0 ? `₹${(itPrice * itQty).toLocaleString('en-IN')}` : (isCustom ? 'Quote Pending' : 'Artisan Crafted')}
                                  </div>
                                  {itPrice > 0 && itQty > 1 && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--bl-text-secondary, #64748b)' }}>
                                      (₹{itPrice.toLocaleString('en-IN')} each)
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : null}
                      </div>
                    </div>

                    {/* Custom Specs Box (if custom bespoke order) */}
                    {isCustom && order.customDetails && (
                      <div style={{
                        padding: '16px',
                        background: 'rgba(168, 85, 247, 0.05)',
                        border: '1px dashed #a855f7',
                        borderRadius: '14px',
                        marginBottom: '20px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: '#9333ea', fontWeight: 700, fontSize: '0.84rem' }}>
                          <Sparkles size={16} /> Bespoke Tailoring & Design Specifications:
                        </div>
                        <div className="bl-order-custom-details-box" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {order.customDetails.bagType && (
                            <div className="bl-custom-spec-pill">
                              <span>Silhouette:</span> <strong>{order.customDetails.bagType}</strong>
                            </div>
                          )}
                          {order.customDetails.footwearType && (
                            <div className="bl-custom-spec-pill">
                              <span>Footwear:</span> <strong>{order.customDetails.footwearType}</strong>
                            </div>
                          )}
                          {order.customDetails.material && (
                            <div className="bl-custom-spec-pill">
                              <span>Material:</span> <strong>{order.customDetails.material}</strong>
                            </div>
                          )}
                          {order.customDetails.color && (
                            <div className="bl-custom-spec-pill">
                              <span>Selected Hue:</span> <strong>{order.customDetails.color}</strong>
                            </div>
                          )}
                          {order.customDetails.size && (
                            <div className="bl-custom-spec-pill">
                              <span>Fit / Dimensions:</span> <strong>{order.customDetails.size}</strong>
                            </div>
                          )}
                          {order.customDetails.initials && (
                            <div className="bl-custom-spec-pill">
                              <span>Monogram:</span> <strong>{order.customDetails.initials}</strong>
                            </div>
                          )}
                          {order.customDetails.notes && (
                            <div className="bl-custom-spec-pill" style={{ flex: '1 1 100%' }}>
                              <span>Artisan Notes:</span> <span>{order.customDetails.notes}</span>
                            </div>
                          )}
                          {order.customDetails.artisanAssigned && (
                            <div className="bl-custom-spec-pill artisan" style={{ border: '1px solid #f72585', color: '#f72585', fontWeight: 700 }}>
                              <Sparkles size={13} /> {order.customDetails.artisanAssigned}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Dual Cards: Delivery Status & Payment Summary */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                      gap: '16px',
                      background: 'var(--bl-warm-cream, #f8fafc)',
                      padding: '18px 20px',
                      borderRadius: '16px',
                      border: '1px solid var(--bl-border, #e2e8f0)',
                      marginBottom: '20px'
                    }}>
                      {/* Delivery & Logistics Details */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--bl-text-primary, #0f172a)', fontWeight: 700, fontSize: '0.86rem' }}>
                          <Truck size={17} color="#2563eb" />
                          <span>Delivery & Logistics Status</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--bl-text-secondary, #475569)', lineHeight: 1.6 }}>
                          <div>Carrier: <strong style={{ color: 'var(--bl-text-primary, #0f172a)' }}>{order.courier || 'StitchBee Prime Logistics'}</strong></div>
                          
                          {/* Tracking Number with Copy Button */}
                          {order.trackingNumber && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
                              <span>Waybill:</span>
                              <code style={{ background: 'var(--bl-warm-card, #ffffff)', padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--bl-border, #cbd5e1)', fontWeight: 700, fontSize: '0.82rem', color: 'var(--bl-pink, #f72585)' }}>
                                {order.trackingNumber}
                              </code>
                              <button
                                onClick={(e) => handleCopyTracking(order.trackingNumber, e)}
                                title="Copy tracking number"
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  padding: '2px',
                                  color: copiedTrackingId === order.trackingNumber ? '#10b981' : 'var(--bl-text-secondary, #64748b)'
                                }}
                              >
                                {copiedTrackingId === order.trackingNumber ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                              </button>
                            </div>
                          )}

                          <div>Est. Arrival: <strong style={{ color: '#10b981' }}>{order.estimatedDelivery || 'In 2-3 business days'}</strong></div>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: '6px' }}>
                            <MapPin size={15} color="var(--bl-pink, #f72585)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{typeof order.address === 'string' ? order.address : (order.address?.street || 'Customer Doorstep, Bengaluru')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment & Billing Breakdown */}
                      <div style={{ borderLeft: '1px solid var(--bl-border, #e2e8f0)', paddingLeft: '18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--bl-text-primary, #0f172a)', fontWeight: 700, fontSize: '0.86rem' }}>
                          <CreditCard size={17} color="#10b981" />
                          <span>Payment & Order Total</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--bl-text-secondary, #475569)', lineHeight: 1.6 }}>
                          <div>Method: <strong style={{ color: 'var(--bl-text-primary, #0f172a)' }}>{order.paymentMethod || 'UPI / Online'}</strong></div>
                          <div>Status: <span style={{ color: '#10b981', fontWeight: 700 }}>{order.paymentStatus || 'Paid (Verified)'}</span></div>
                          {order.transactionRef && (
                            <div>Txn Ref: <code style={{ fontSize: '0.76rem', color: 'var(--bl-text-secondary, #64748b)' }}>{order.transactionRef}</code></div>
                          )}
                          <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed var(--bl-border, #cbd5e1)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ fontWeight: 600 }}>Grand Total:</span>
                            <strong style={{ fontSize: '1.25rem', color: 'var(--bl-pink, #f72585)' }}>
                              {typeof order.total === 'number' 
                                ? `₹${order.total.toLocaleString('en-IN')}` 
                                : (order.total || (order.price ? `₹${Number(order.price).toLocaleString('en-IN')}` : 'Pending Quote'))}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Action Buttons Bar */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px',
                      paddingTop: '6px'
                    }}>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {/* Live Tracking Modal Trigger */}
                        <button
                          onClick={() => setTrackingModalOrder(order)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '8px 16px',
                            borderRadius: '10px',
                            background: 'var(--bl-pink, #f72585)',
                            color: '#ffffff',
                            border: 'none',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(247, 37, 133, 0.25)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Truck size={15} /> Track Shipment
                        </button>

                        {/* View & Print Invoice Modal Trigger */}
                        <button
                          onClick={() => setInvoiceModalOrder(order)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '8px 16px',
                            borderRadius: '10px',
                            background: 'var(--bl-warm-card, #ffffff)',
                            color: 'var(--bl-text, #1e293b)',
                            border: '1px solid var(--bl-border, #cbd5e1)',
                            fontSize: '0.84rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <FileText size={15} /> View Invoice
                        </button>

                        {/* Reorder / Buy Again */}
                        <button
                          onClick={() => handleBuyAgain(order)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            padding: '8px 16px',
                            borderRadius: '10px',
                            background: 'var(--bl-warm-card, #ffffff)',
                            color: 'var(--bl-text, #1e293b)',
                            border: '1px solid var(--bl-border, #cbd5e1)',
                            fontSize: '0.84rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <RotateCcw size={15} /> Buy Again
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {/* Need Help / Concierge */}
                        <button
                          onClick={() => setHelpModalOrder(order)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 12px',
                            borderRadius: '10px',
                            background: 'transparent',
                            color: 'var(--bl-text-secondary, #64748b)',
                            border: '1px solid transparent',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <HelpCircle size={15} /> Need Help?
                        </button>

                        {/* Cancel order button if early phase */}
                        {!isCancelled && currentIndex <= 2 && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '10px',
                              background: 'rgba(239, 68, 68, 0.08)',
                              color: '#ef4444',
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })
          ) : (
            /* Empty State Card */
            <div className="bl-empty-state-card" style={{
              background: 'var(--bl-warm-card, #ffffff)',
              border: '1px solid var(--bl-border, #e2e8f0)',
              borderRadius: '20px',
              padding: '60px 24px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div className="bl-empty-icon-circle" style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(247, 37, 133, 0.1)',
                color: 'var(--bl-pink, #f72585)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Package size={36} />
              </div>
              <h3 className="bl-serif-title" style={{ fontSize: '1.75rem', margin: '12px 0 8px', fontWeight: 800 }}>
                No orders found
              </h3>
              <p style={{ color: 'var(--bl-text-secondary, #64748b)', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6, fontSize: '0.94rem' }}>
                {searchQuery || selectedCategory !== 'all' || selectedStatusTab !== 'all'
                  ? 'No orders match your current filter selections. Try clearing your search or switching categories.'
                  : 'You have not placed any orders yet. Discover our handcrafted products or tailor a bespoke creation.'}
              </p>

              {(searchQuery || selectedCategory !== 'all' || selectedStatusTab !== 'all') && (
                <button 
                  className="bl-btn-secondary"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedStatusTab('all');
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '1px solid var(--bl-border, #cbd5e1)',
                    background: 'var(--bl-warm-card, #ffffff)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginBottom: '20px'
                  }}
                >
                  Reset All Filters
                </button>
              )}

              {/* Quick links to shop across all categories */}
              <div style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--bl-text-secondary, #64748b)', display: 'block', marginBottom: '12px' }}>
                  Explore StitchBeez Categories:
                </span>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => navigate('/uniforms')}
                    style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--bl-border, #e2e8f0)', background: 'var(--bl-bg, #f8fafc)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    👔 Uniforms Shop
                  </button>
                  <button 
                    onClick={() => navigate('/bags')}
                    style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--bl-border, #e2e8f0)', background: 'var(--bl-bg, #f8fafc)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    👜 Bags Studio
                  </button>
                  <button 
                    onClick={() => navigate('/footwear')}
                    style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--bl-border, #e2e8f0)', background: 'var(--bl-bg, #f8fafc)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    👞 Shoes & Slippers
                  </button>
                  <button 
                    onClick={() => navigate('/seat-covers')}
                    style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--bl-border, #e2e8f0)', background: 'var(--bl-bg, #f8fafc)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    🚗 Vehicle Seat Covers
                  </button>
                  <button 
                    onClick={() => navigate('/pets')}
                    style={{ padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--bl-border, #e2e8f0)', background: 'var(--bl-bg, #f8fafc)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    🐾 Pet Outfits
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* =================================================================== */}
      {/* 1. TRACKING MILESTONES MODAL                                        */}
      {/* =================================================================== */}
      {trackingModalOrder && typeof document !== 'undefined' && createPortal(
        <div 
          className="bl-modal-backdrop" 
          onClick={() => setTrackingModalOrder(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '16px'
          }}
        >
          <div 
            className="bl-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bl-warm-card, #ffffff)',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px 28px',
              border: '1px solid var(--bl-border, #e2e8f0)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--bl-border, #e2e8f0)', paddingBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={20} color="var(--bl-pink, #f72585)" />
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                    Live Shipment Tracking
                  </h3>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--bl-text-secondary, #64748b)', marginTop: '4px' }}>
                  Order Ref: <strong>{trackingModalOrder.id}</strong> • Carrier: {trackingModalOrder.courier}
                </div>
              </div>
              <button 
                onClick={() => setTrackingModalOrder(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--bl-text-secondary, #64748b)', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Tracking Summary Pill */}
            <div style={{
              background: 'var(--bl-bg, #f8fafc)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid var(--bl-border, #e2e8f0)'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--bl-text-secondary, #64748b)', fontWeight: 700 }}>Tracking Number:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <code style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--bl-pink, #f72585)' }}>
                    {trackingModalOrder.trackingNumber || 'STB-EXP-LIVE'}
                  </code>
                  <button
                    onClick={(e) => handleCopyTracking(trackingModalOrder.trackingNumber, e)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    {copiedTrackingId === trackingModalOrder.trackingNumber ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--bl-text-secondary, #64748b)', fontWeight: 700 }}>Est. Arrival:</span>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#10b981' }}>
                  {trackingModalOrder.estimatedDelivery || 'In 2 days'}
                </div>
              </div>
            </div>

            {/* Vertical Milestones Timeline */}
            <div style={{ position: 'relative', paddingLeft: '28px', marginBottom: '24px' }}>
              {/* Vertical connecting line */}
              <div style={{
                position: 'absolute',
                left: '11px',
                top: '10px',
                bottom: '10px',
                width: '2px',
                background: 'var(--bl-border, #cbd5e1)'
              }} />

              {(trackingModalOrder.trackingMilestones || [
                { title: 'Order Placed & Verified', time: trackingModalOrder.date, location: 'StitchBee Central Atelier', done: true },
                { title: 'Artisan Quality Crafting Completed', time: 'In Progress', location: 'Bengaluru Workshop', done: true },
                { title: 'Dispatched via Express Courier', time: 'Pending', location: 'Logistics Facility', done: false },
                { title: 'Out for Doorstep Delivery', time: 'Scheduled', location: 'Customer Hub', done: false }
              ]).map((step, idx) => (
                <div key={idx} style={{ position: 'relative', marginBottom: '18px' }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-28px',
                    top: '2px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: step.done ? '#10b981' : 'var(--bl-warm-card, #ffffff)',
                    border: `2px solid ${step.done ? '#10b981' : 'var(--bl-border, #cbd5e1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.done ? '#ffffff' : 'var(--bl-text-secondary, #94a3b8)'
                  }}>
                    {step.done ? <Check size={13} strokeWidth={3} /> : idx + 1}
                  </div>

                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: step.done ? 'var(--bl-text, #0f172a)' : 'var(--bl-text-secondary, #64748b)' }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--bl-text-secondary, #94a3b8)', marginTop: '2px' }}>
                      {step.time} {step.location && `• ${step.location}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carrier Support Contact Bar */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '0.82rem',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span>Need courier assistance for {trackingModalOrder.courier}?</span>
              <a href="tel:+919845012345" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
                📞 Call Logistics Desk
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* =================================================================== */}
      {/* 2. PRINTABLE STITCHBEE TAX INVOICE MODAL                            */}
      {/* =================================================================== */}
      {invoiceModalOrder && typeof document !== 'undefined' && createPortal(
        <div 
          className="bl-modal-backdrop"
          onClick={() => setInvoiceModalOrder(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '16px'
          }}
        >
          <div 
            className="bl-invoice-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '36px 32px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              border: '1px solid #e2e8f0'
            }}
          >
            {/* Action Bar (Print & Close) */}
            <div className="bl-no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>StitchBee Official Tax Receipt</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Printer size={15} /> Print / Save PDF
                </button>
                <button 
                  onClick={() => setInvoiceModalOrder(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Invoice Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: '20px', marginBottom: '24px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#f72585', letterSpacing: '-0.02em' }}>
                  STITCHBEEZ ATELIER
                </h2>
                <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>
                  Bespoke Tailoring & Handcrafted Goods Pvt. Ltd.<br />
                  GSTIN: 29AABCU9603R1ZM<br />
                  CIN: U18101KA2026PTC08912<br />
                  JP Nagar 7th Phase, Bengaluru, Karnataka, 560078
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>TAX INVOICE</div>
                <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '4px' }}>
                  Invoice #: <strong>INV-{invoiceModalOrder.id?.replace(/[^0-9]/g, '') || '88219'}</strong><br />
                  Order Ref: <strong>{invoiceModalOrder.id}</strong><br />
                  Date: {invoiceModalOrder.date}
                </div>
              </div>
            </div>

            {/* Billed To / Shipped To */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', fontSize: '0.84rem', color: '#334155' }}>
              <div>
                <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.74rem', color: '#64748b', marginBottom: '4px' }}>Billed To:</div>
                <strong style={{ fontSize: '0.94rem', color: '#0f172a' }}>{invoiceModalOrder.customerName || 'Valued StitchBeez Patron'}</strong><br />
                {invoiceModalOrder.customerPhone && <span>Phone: {invoiceModalOrder.customerPhone}<br /></span>}
                <span>Address: {typeof invoiceModalOrder.address === 'string' ? invoiceModalOrder.address : (invoiceModalOrder.address?.street || 'Bengaluru, India')}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.74rem', color: '#64748b', marginBottom: '4px' }}>Payment Summary:</div>
                <span>Status: <strong style={{ color: '#059669' }}>{invoiceModalOrder.paymentStatus || 'Paid in Full'}</strong><br /></span>
                <span>Mode: {invoiceModalOrder.paymentMethod || 'UPI'}<br /></span>
                <span>Txn ID: {invoiceModalOrder.transactionRef || 'TXN-88192014'}</span>
              </div>
            </div>

            {/* Itemized Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                  <th style={{ padding: '10px 8px' }}>#</th>
                  <th style={{ padding: '10px 8px' }}>Description / Spec</th>
                  <th style={{ padding: '10px 8px', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right' }}>Rate (₹)</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {(invoiceModalOrder.items || []).map((it, idx) => {
                  const itQty = it.qty || it.quantity || 1;
                  const itPrice = typeof it.price === 'number' ? it.price : (parseFloat(String(it.price).replace(/[^0-9.]/g, '')) || 0);
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 8px' }}>{idx + 1}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <strong style={{ color: '#0f172a' }}>{it.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Category: {it.category || invoiceModalOrder.serviceCategoryLabel}
                          {it.size ? ` • Size: ${it.size}` : ''}
                          {it.color ? ` • Color: ${it.color}` : ''}
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>{itQty}</td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}>₹{itPrice.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 700 }}>₹{(itPrice * itQty).toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <div style={{ minWidth: '260px', fontSize: '0.85rem', color: '#334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Subtotal:</span>
                  <strong>₹{(invoiceModalOrder.subtotal || invoiceModalOrder.total || 0).toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>GST (CGST 9% + SGST 9%):</span>
                  <span>Included</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>White-Glove Delivery:</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>FREE (Complimentary)</span>
                </div>
                {invoiceModalOrder.discount ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: '#059669' }}>
                    <span>Savings / Promo:</span>
                    <span>-₹{invoiceModalOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                ) : null}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '2px solid #0f172a', borderBottom: '2px solid #0f172a', marginTop: '6px', fontSize: '1.1rem', fontWeight: 900, color: '#f72585' }}>
                  <span>Total Paid:</span>
                  <span>₹{(invoiceModalOrder.total || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Footer Declarations */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '0.75rem', color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>
              This is a digitally generated tax invoice authorized by StitchBeez Craft Atelier.<br />
              All artisan footwear, bespoke uniforms, and leather accessories are covered under our 1-Year Craftsmanship Guarantee.<br />
              Questions? Contact billing@stitchbeez.com or +91 98450 12345.
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* =================================================================== */}
      {/* 3. ATELIER CONCIERGE / HELP MODAL                                   */}
      {/* =================================================================== */}
      {helpModalOrder && typeof document !== 'undefined' && createPortal(
        <div 
          className="bl-modal-backdrop"
          onClick={() => setHelpModalOrder(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '16px'
          }}
        >
          <div 
            className="bl-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bl-warm-card, #ffffff)',
              borderRadius: '20px',
              maxWidth: '480px',
              width: '100%',
              padding: '24px 28px',
              border: '1px solid var(--bl-border, #e2e8f0)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={20} color="var(--bl-pink, #f72585)" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                  Need Assistance with {helpModalOrder.id}?
                </h3>
              </div>
              <button 
                onClick={() => setHelpModalOrder(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--bl-text-secondary, #64748b)', margin: '0 0 20px', lineHeight: 1.5 }}>
              Our atelier concierge team and master tailors are available to assist you with order modifications, sizing adjustments, delivery rescheduling, or special requests.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {/* WhatsApp Atelier */}
              <a 
                href={`https://wa.me/919845012345?text=Hello%20StitchBeez%20Atelier,%20I%20need%20help%20with%20Order%20${helpModalOrder.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: '#25D366',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                <MessageSquare size={18} /> WhatsApp Atelier Concierge
              </a>

              {/* Call Hotline */}
              <a 
                href="tel:+919845012345"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'var(--bl-bg, #f8fafc)',
                  border: '1px solid var(--bl-border, #cbd5e1)',
                  color: 'var(--bl-text, #0f172a)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                <Phone size={18} color="var(--bl-pink, #f72585)" /> Call Dedicated Support (+91 98450 12345)
              </a>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--bl-text-secondary, #94a3b8)' }}>
              Concierge hours: Monday - Saturday, 9:00 AM - 8:00 PM IST
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}