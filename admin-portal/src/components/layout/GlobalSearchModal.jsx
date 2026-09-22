import React, { useState, useEffect } from 'react';
import { Search, X, ShoppingBag, Users, Scissors, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { MOCK_ORDERS, MOCK_CUSTOMERS, MOCK_TAILORS, MOCK_DESIGNERS, MOCK_DELIVERY_PARTNERS } from '../../data/adminMockData';

export default function GlobalSearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Categorized matching
  const matchingOrders = q ? MOCK_ORDERS.filter(o => 
    o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.tailor.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchingCustomers = q ? MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchingTailors = q ? MOCK_TAILORS.filter(t => 
    t.name.toLowerCase().includes(q) || t.shopName.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchingDesigners = q ? MOCK_DESIGNERS.filter(d => 
    d.name.toLowerCase().includes(q) || d.brandName.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchingDelivery = q ? MOCK_DELIVERY_PARTNERS.filter(p => 
    p.name.toLowerCase().includes(q) || p.vehicleNo.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const hasResults = matchingOrders.length > 0 || matchingCustomers.length > 0 || matchingTailors.length > 0 || matchingDesigners.length > 0 || matchingDelivery.length > 0;

  return (
    <div className="sb-modal-backdrop" onClick={onClose}>
      <div 
        className="sb-modal-box" 
        style={{ maxWidth: '640px', padding: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--sb-border-default)'
        }}>
          <Search size={20} style={{ color: 'var(--sb-primary)' }} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search orders, customers, tailors, designers, deliveries..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '1rem',
              color: 'var(--sb-text-title)',
              fontFamily: 'inherit'
            }}
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="sb-btn sb-btn-ghost sb-btn-sm"
              style={{ padding: '4px' }}
            >
              <X size={16} />
            </button>
          )}
          <span style={{ fontSize: '0.72rem', background: 'var(--sb-bg-surface-subtle)', padding: '2px 6px', borderRadius: '4px', color: 'var(--sb-text-muted)', border: '1px solid var(--sb-border-default)' }}>
            ESC
          </span>
        </div>

        {/* Search Results Content */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 20px' }}>
          {!q && (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--sb-text-muted)', fontSize: '0.86rem' }}>
              Type a name, Order ID, phone number, vehicle number, or atelier...
            </div>
          )}

          {q && !hasResults && (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--sb-text-muted)', fontSize: '0.86rem' }}>
              No platform records matching "<span style={{ color: 'var(--sb-text-title)' }}>{query}</span>"
            </div>
          )}

          {/* Orders Group */}
          {matchingOrders.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-muted)', letterSpacing: '0.04em', marginBottom: '6px' }}>
                Orders
              </div>
              {matchingOrders.map(order => (
                <div
                  key={order.id}
                  onClick={() => { onSelectResult('orders', order); onClose(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--sb-radius-md)',
                    cursor: 'pointer',
                    background: 'var(--sb-bg-surface-subtle)',
                    marginBottom: '6px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--sb-primary-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--sb-bg-surface-subtle)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShoppingBag size={16} color="var(--sb-primary)" />
                    <div>
                      <span style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{order.id}</span>
                      <span style={{ color: 'var(--sb-text-muted)', marginLeft: '8px', fontSize: '0.8rem' }}>{order.customer} • {order.service}</span>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--sb-text-muted)" />
                </div>
              ))}
            </div>
          )}

          {/* Customers Group */}
          {matchingCustomers.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-muted)', letterSpacing: '0.04em', marginBottom: '6px' }}>
                Customers
              </div>
              {matchingCustomers.map(cust => (
                <div
                  key={cust.id}
                  onClick={() => { onSelectResult('customers', cust); onClose(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--sb-radius-md)',
                    cursor: 'pointer',
                    background: 'var(--sb-bg-surface-subtle)',
                    marginBottom: '6px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--sb-primary-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--sb-bg-surface-subtle)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={16} color="var(--sb-primary)" />
                    <div>
                      <span style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{cust.name}</span>
                      <span style={{ color: 'var(--sb-text-muted)', marginLeft: '8px', fontSize: '0.8rem' }}>{cust.phone} • {cust.tier}</span>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--sb-text-muted)" />
                </div>
              ))}
            </div>
          )}

          {/* Tailors Group */}
          {matchingTailors.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-muted)', letterSpacing: '0.04em', marginBottom: '6px' }}>
                Tailors & Ateliers
              </div>
              {matchingTailors.map(tailor => (
                <div
                  key={tailor.id}
                  onClick={() => { onSelectResult('tailors', tailor); onClose(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--sb-radius-md)',
                    cursor: 'pointer',
                    background: 'var(--sb-bg-surface-subtle)',
                    marginBottom: '6px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--sb-primary-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--sb-bg-surface-subtle)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Scissors size={16} color="var(--sb-primary)" />
                    <div>
                      <span style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{tailor.shopName}</span>
                      <span style={{ color: 'var(--sb-text-muted)', marginLeft: '8px', fontSize: '0.8rem' }}>{tailor.name} • {tailor.location}</span>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--sb-text-muted)" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
