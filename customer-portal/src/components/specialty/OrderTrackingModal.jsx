import React from 'react';
import { CheckCircle2, Clock, Truck, ShieldCheck, MapPin, Phone, HelpCircle, X, Sparkles } from 'lucide-react';

export default function OrderTrackingModal({
  orderId = "STB-849201",
  isOpen,
  onClose,
  serviceType = "stitching", // 'stitching' | 'alteration' | 'product'
  customerName = "Rohan Sen",
  partnerName = "Ravi Leather & Master Tailors",
  onContactSupport
}) {
  if (!isOpen) return null;

  const stitchingSteps = [
    { label: "Order Placed", time: "Today, 10:30 AM", done: true },
    { label: "Payment Confirmed (Cashfree)", time: "Today, 10:32 AM", done: true },
    { label: "Master Tailor Assigned", time: "Today, 11:15 AM", done: true, sub: partnerName },
    { label: "Measurements & Anatomy Verified", time: "Today, 02:40 PM", done: true },
    { label: "Material Cut & Prepped", time: "Est. Tomorrow", active: true },
    { label: "Hand-Stitching in Progress", time: "Est. Day 3", pending: true },
    { label: "Multi-Point Quality Check", time: "Est. Day 4", pending: true },
    { label: "Dispatched with Delivery Partner", time: "Est. Day 5", pending: true },
    { label: "Delivered & Fit Guaranteed", time: "Est. Day 5", pending: true }
  ];

  const alterationSteps = [
    { label: "Alteration Request Submitted", time: "Today, 10:30 AM", done: true },
    { label: "Specialist Partner Matched", time: "Today, 11:00 AM", done: true, sub: partnerName },
    { label: "Doorstep Pickup Completed", time: "Today, 02:15 PM", done: true },
    { label: "Workshop Inspection & Deconstruct", time: "Today, 04:30 PM", active: true },
    { label: "Precision Repair & Stitching", time: "Est. Tomorrow", pending: true },
    { label: "Quality Assurance & Finishing", time: "Est. Day 2", pending: true },
    { label: "Return Delivery to Doorstep", time: "Est. Day 3", pending: true }
  ];

  const productSteps = [
    { label: "Order Placed", time: "Today, 10:30 AM", done: true },
    { label: "Payment Verified (Cashfree)", time: "Today, 10:32 AM", done: true },
    { label: "Artisan Workshop Packaged", time: "Today, 01:20 PM", active: true },
    { label: "Shipped via Express Courier", time: "Est. Tomorrow", pending: true },
    { label: "Out for Delivery", time: "Est. Day 3", pending: true },
    { label: "Delivered & Signed", time: "Est. Day 3", pending: true }
  ];

  const steps = serviceType === 'alteration' ? alterationSteps : (serviceType === 'product' ? productSteps : stitchingSteps);

  return (
    <div className="modal-overlay" style={{ zIndex: 999999 }} onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{
          maxWidth: '580px',
          width: '92%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          background: 'var(--bg-dark)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.85)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Live Order Stepper
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0 0', color: '#fff' }}>
              Tracking Order: {orderId}
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px', color: '#fff' }}>
            <X size={18} />
          </button>
        </div>

        {/* Assigned Specialist Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
              ST
            </div>
            <div>
              <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block' }}>{partnerName}</strong>
              <span style={{ fontSize: '0.72rem', color: '#10b981' }}>StitchBee Verified Lead Specialist</span>
            </div>
          </div>
          <button
            onClick={() => onContactSupport && onContactSupport()}
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}
          >
            Need Help?
          </button>
        </div>

        {/* Stepper Timeline */}
        <div style={{ position: 'relative', paddingLeft: '32px', marginBottom: '24px' }}>
          {/* Vertical connecting line */}
          <div style={{ position: 'absolute', top: '10px', bottom: '20px', left: '11px', width: '2px', background: 'rgba(255,255,255,0.1)' }} />

          {steps.map((st, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: '22px' }}>
              {/* Stepper Node */}
              <div
                style={{
                  position: 'absolute',
                  left: '-32px',
                  top: '0',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: st.done ? '#10b981' : (st.active ? 'var(--primary)' : 'rgba(255,255,255,0.1)'),
                  border: st.active ? '3px solid #fff' : 'none',
                  boxShadow: st.active ? '0 0 12px var(--primary)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  zIndex: 2
                }}
              >
                {st.done ? '✓' : (i + 1)}
              </div>

              <div>
                <h5 style={{ fontSize: '0.86rem', fontWeight: st.active ? 800 : (st.done ? 600 : 500), margin: '0 0 2px 0', color: st.active ? 'var(--primary)' : (st.done ? '#fff' : 'var(--text-muted)') }}>
                  {st.label}
                </h5>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>{st.time}</span>
                  {st.sub && <span style={{ color: 'var(--accent)' }}>• {st.sub}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '11px', fontSize: '0.85rem' }} onClick={onClose}>
          Close Tracking
        </button>
      </div>
    </div>
  );
}
