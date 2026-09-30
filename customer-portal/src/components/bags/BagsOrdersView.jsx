import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle2, ChevronRight, ArrowLeft, Clock, 
  Sparkles, ShieldCheck, MapPin, User, ArrowRight 
} from 'lucide-react';
import { getOrders } from '../../utils/bagsStore';

export default function BagsOrdersView({ showToast }) {
  const navigate = useNavigate();

  const [orders] = useState(getOrders());
  const [filterType, setFilterType] = useState('all'); // 'all' | 'ready' | 'custom'

  const filteredOrders = orders.filter(o => {
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
          <span onClick={() => navigate('/bags')} className="bl-crumb-link">Bags & Leather</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">My Orders</span>
        </nav>

        {/* Back Link */}
        <div style={{ marginBottom: '20px' }}>
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
            Live status of your handcrafted bag orders and bespoke artisan quote consultations.
          </p>
        </div>

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
            Ready Bags ({orders.filter(o => o.type === 'ready').length})
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
              const isCustom = order.type === 'custom';
              const steps = isCustom ? customSteps : regularSteps;
              const currentIndex = order.statusIndex ?? (isCustom ? 0 : 2);

              return (
                <div key={order.id} className="bl-order-card">
                  {/* Order Top Bar */}
                  <div className="bl-order-top-bar">
                    <div className="bl-order-ref-group">
                      <span className="bl-order-id-label">Order Ref:</span>
                      <strong>{order.id}</strong>
                      <span className="bl-order-type-badge">{isCustom ? 'Custom Bespoke' : 'Ready Bag'}</span>
                    </div>

                    <div className="bl-order-meta-right">
                      <span className="bl-order-date">Placed: {order.date}</span>
                      <span className={`bl-order-status-chip ${order.statusCode || 'processing'}`}>
                        {order.status}
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
                    {order.items && order.items.length > 0 && (
                      <div className="bl-order-items-sublist">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="bl-order-item-mini">
                            <img src={it.img} alt={it.name} />
                            <div>
                              <strong>{it.name}</strong>
                              <span>Qty: {it.qty} • Color: {it.color}</span>
                              <span className="bl-order-item-price">₹{(it.price * it.qty).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {isCustom && order.customDetails && (
                      <div className="bl-order-custom-details-box">
                        <div className="bl-custom-spec-pill">
                          <span>Silhouette:</span> <strong>{order.customDetails.bagType}</strong>
                        </div>
                        <div className="bl-custom-spec-pill">
                          <span>Material:</span> <strong>{order.customDetails.material}</strong>
                        </div>
                        <div className="bl-custom-spec-pill">
                          <span>Color:</span> <strong>{order.customDetails.color}</strong>
                        </div>
                        <div className="bl-custom-spec-pill">
                          <span>Initials:</span> <strong>{order.customDetails.initials || 'None'}</strong>
                        </div>
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
                        <span>{order.address}</span>
                      </div>

                      <div className="bl-order-total-box">
                        <span>Total:</span>
                        <strong>{typeof order.total === 'number' ? `₹${order.total.toLocaleString('en-IN')}` : order.total}</strong>
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
