import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle2, ChevronRight, ArrowLeft, Clock, 
  Sparkles, ShieldCheck, MapPin, User, ArrowRight 
} from 'lucide-react';
import { getOrders } from '../../utils/bagsStore';

export default function BagsOrdersView({ showToast }) {
  const navigate = useNavigate();
  const location = useLocation();
  const justPlaced = location.state?.justPlaced;
  const newOrderId = location.state?.newOrderId;

  const [orders, setOrders] = useState(() => {
    try {
      return getOrders() || [];
    } catch (e) {
      return [];
    }
  });

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

  const [filterType, setFilterType] = useState('all'); // 'all' | 'ready' | 'custom'

  const filteredOrders = (orders || []).filter(o => {
    if (!o) return false;
    if (filterType === 'ready') return o.type === 'ready';
    if (filterType === 'custom') return o.type === 'custom';
    return true;
  });

  const regularSteps = [
    'Order Placed',
    'Confirmed',
    'Crafting / Processing',
    'Quality Check',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const customSteps = [
    'Quote Requested',
    'Quote Received',
    'Approved',
    'Crafting',
    'Quality Check',
    'Shipped',
    'Delivered'
  ];

  return (
    <div className="bl-orders-page">
      <div className="bl-container" style={{ padding: '24px 12px 60px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
          <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/bags')} className="bl-crumb-link">Studio Collection</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">My Orders</span>
        </nav>

        {/* Back Link */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/handmade-gifts')}
          >
            <ArrowLeft size={16} /> Back to Handmade Gifts
          </button>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/footwear')}
          >
            <ArrowLeft size={16} /> Back to Footwear Studio
          </button>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/bags')}
          >
            <ArrowLeft size={16} /> Back to Bags Studio
          </button>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <span className="bl-tag-label">ORDER TRACKING & HISTORY</span>
          <h1 className="bl-serif-title" style={{ fontSize: '2.4rem', margin: '4px 0 6px' }}>
            My Orders & Custom Quotes
          </h1>
          <p className="bl-section-subtext" style={{ margin: 0 }}>
            Live status of your handcrafted footwear, artisan bags, and bespoke quote requests.
          </p>
        </div>

        {/* New Order Just Placed Alert Banner */}
        {justPlaced && (
          <div className="bl-just-placed-banner" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(247, 37, 133, 0.12) 100%)',
            border: '1.5px solid #10b981',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.18)'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <CheckCircle2 size={26} color="#ffffff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff', fontWeight: 700 }}>
                  Order Confirmed! Live Tracking Active
                </h3>
                {newOrderId && (
                  <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '2px 10px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                    {newOrderId}
                  </span>
                )}
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                Thank you! Your handcrafted order is now in active artisan preparation. Follow each real-time milestone below.
              </p>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bl-orders-tabs-row">
          <button 
            className={`bl-shop-cat-pill ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Orders ({orders.length})
          </button>
          <button 
            className={`bl-shop-cat-pill ${filterType === 'ready' ? 'active' : ''}`}
            onClick={() => setFilterType('ready')}
          >
            Ready Orders ({orders.filter(o => o.type === 'ready').length})
          </button>
          <button 
            className={`bl-shop-cat-pill ${filterType === 'custom' ? 'active' : ''}`}
            onClick={() => setFilterType('custom')}
          >
            Custom Quotes ({orders.filter(o => o.type === 'custom').length})
          </button>
        </div>

        {/* Orders List */}
        <div className="bl-orders-stack">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => {
              if (!order) return null;
              const isCustom = order.type === 'custom' || order.category === 'custom';
              const steps = isCustom ? customSteps : regularSteps;
              const currentIndex = typeof order.statusIndex === 'number' ? order.statusIndex : (isCustom ? 0 : 2);
              const orderCategory = order.category === 'shoes' ? 'Footwear' : 'Leather Bags';

              return (
                <div key={order.id || `order-${Math.random()}`} className="bl-order-card">
                  {/* Order Top Bar */}
                  <div className="bl-order-top-bar">
                    <div className="bl-order-ref-group">
                      <span className="bl-order-id-label">Order Ref:</span>
                      <strong>{order.id}</strong>
                      <span className="bl-order-type-badge">
                        {isCustom ? (order.category === 'shoes' ? 'Bespoke Footwear' : 'Custom Bespoke') : (order.category === 'shoes' ? 'Footwear Pair' : 'Ready Bag')}
                      </span>
                    </div>

                    <div className="bl-order-meta-right">
                      <span className="bl-order-date">Placed: {order.date || 'Recently'}</span>
                      <span className={`bl-order-status-chip ${order.statusCode || 'processing'}`}>
                        {order.status || 'Order Placed'}
                      </span>
                    </div>
                  </div>

                  {/* Visual Status Progress Stepper */}
                  <div className="bl-order-stepper-box">
                    <div className="bl-order-stepper-track">
                      {steps.map((stName, idx) => {
                        const isDone = idx <= currentIndex;
                        const isCurrent = idx === currentIndex;
                        return (
                          <div 
                            key={idx} 
                            className={`bl-order-step-node ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                          >
                            <div className="bl-order-step-dot">
                              {isDone ? <CheckCircle2 size={14} /> : idx + 1}
                            </div>
                            <span className="bl-order-step-name">{stName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items or Custom Specs List */}
                  <div className="bl-order-content-area">
                    {order.items && Array.isArray(order.items) && order.items.length > 0 && (
                      <div className="bl-order-items-sublist">
                        {order.items.map((it, idx) => {
                          if (!it) return null;
                          const itPrice = typeof it.price === 'number' ? it.price : (parseFloat(String(it.price).replace(/[^0-9.]/g, '')) || 0);
                          const itQty = it.qty || it.quantity || 1;
                          const itImg = it.img || it.image || '/shoes_categories/HeroSection.png';
                          return (
                            <div key={idx} className="bl-order-item-mini">
                              <img src={itImg} alt={it.name || 'Order Item'} onError={(e) => { e.target.src = '/shoes_categories/HeroSection.png'; }} />
                              <div>
                                <strong>{it.name || 'Artisan Product'}</strong>
                                <span>Qty: {itQty} {it.color ? `• Color: ${it.color}` : ''} {it.size ? `• Size: ${it.size}` : ''}</span>
                                <span className="bl-order-item-price">
                                  {itPrice > 0 ? `₹${(itPrice * itQty).toLocaleString('en-IN')}` : (isCustom ? 'Included in Quote' : 'Artisan Handcrafted')}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {isCustom && order.customDetails && (
                      <div className="bl-order-custom-details-box">
                        <div className="bl-custom-spec-pill">
                          <span>Silhouette:</span> <strong>{order.customDetails.footwearType || order.customDetails.bagType || order.title || 'Bespoke Item'}</strong>
                        </div>
                        {order.customDetails.baseSilhouette && (
                          <div className="bl-custom-spec-pill">
                            <span>Base Style:</span> <strong>{order.customDetails.baseSilhouette}</strong>
                          </div>
                        )}
                        <div className="bl-custom-spec-pill">
                          <span>Material:</span> <strong>{order.customDetails.material || 'Artisan Leather'}</strong>
                        </div>
                        <div className="bl-custom-spec-pill">
                          <span>Color:</span> <strong>{order.customDetails.color || 'Custom'}</strong>
                        </div>
                        {order.customDetails.size && (
                          <div className="bl-custom-spec-pill">
                            <span>Fit / Size:</span> <strong>{order.customDetails.size}</strong>
                          </div>
                        )}
                        <div className="bl-custom-spec-pill">
                          <span>Initials:</span> <strong>{order.customDetails.initials || 'None'}</strong>
                        </div>
                        {order.customDetails.notes && (
                          <div className="bl-custom-spec-pill" style={{ gridColumn: 'span 2' }}>
                            <span>Notes:</span> <span>{order.customDetails.notes}</span>
                          </div>
                        )}
                        {order.artisanAssigned && (
                          <div className="bl-custom-spec-pill artisan">
                            <Sparkles size={13} className="bl-text-pink" />
                            <span>{order.artisanAssigned}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Order Details Footer */}
                    <div className="bl-order-card-footer">
                      <div className="bl-order-addr-text">
                        <MapPin size={14} className="bl-text-pink" />
                        <span>{typeof order.address === 'string' ? order.address : (order.address?.street || 'Doorstep Delivery')}</span>
                      </div>

                      <div className="bl-order-total-box">
                        <span>Total:</span>
                        <strong>
                          {typeof order.total === 'number' 
                            ? `₹${order.total.toLocaleString('en-IN')}` 
                            : (order.total || (order.price ? `₹${Number(order.price).toLocaleString('en-IN')}` : 'Pending Quote'))}
                        </strong>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="bl-empty-state-card">
              <div className="bl-empty-icon-circle">
                <Package size={36} />
              </div>
              <h3 className="bl-serif-title" style={{ fontSize: '1.6rem', margin: '12px 0 8px' }}>
                No orders in this view
              </h3>
              <p style={{ color: 'var(--bl-text-secondary)', maxWidth: '420px', margin: '0 auto 24px', lineHeight: 1.5 }}>
                You haven't placed any orders matching this filter yet. Explore our collection or design a custom piece.
              </p>
              <button 
                className="bl-btn-primary"
                onClick={() => navigate('/bags/shop')}
              >
                Shop Handcrafted Bags →
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
