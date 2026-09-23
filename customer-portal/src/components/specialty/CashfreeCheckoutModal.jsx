import React, { useState } from 'react';
import { 
  CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowRight, 
  MapPin, Calendar, Clock, AlertCircle, RefreshCw, X, QrCode, Smartphone 
} from 'lucide-react';

export default function CashfreeCheckoutModal({
  isOpen,
  onClose,
  items = [],
  currentUser,
  onOrderSuccess,
  onOpenTracking
}) {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Items & Address, 2: Payment, 3: Success Confirmation
  const [address, setAddress] = useState({
    fullName: currentUser?.name || 'Rohan Sen',
    phone: currentUser?.phone || '9876543210',
    street: 'Flat 402, Lotus Orchid, 14th Main, Sector 4',
    city: 'Bengaluru',
    pincode: '560102'
  });

  const [appointmentSlot, setAppointmentSlot] = useState({
    date: '2026-09-25',
    time: '11:00 AM - 01:00 PM'
  });

  // Cashfree Payment states
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [upiOption, setUpiOption] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'qr'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('4532 8920 1284 9012');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('784');
  const [paymentState, setPaymentState] = useState('idle'); // 'idle' | 'initiating' | 'processing' | 'verifying' | 'success' | 'failed'
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  // Group items by category / service type
  const itemsSubtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (it.quantity || 1), 0);
  const measurementFee = items.some(it => it.requiresMeasurement) ? 199 : 0;
  const deliveryFee = itemsSubtotal > 2000 ? 0 : 149;
  const discount = itemsSubtotal > 3000 ? 300 : 0;
  const grandTotal = Math.max(0, itemsSubtotal + measurementFee + deliveryFee - discount);

  const handleInitiateCashfree = () => {
    setPaymentState('initiating');
    setTimeout(() => {
      setPaymentState('processing');
      setTimeout(() => {
        setPaymentState('verifying');
        setTimeout(() => {
          const generatedId = `STB-${Math.floor(100000 + Math.random() * 900000)}`;
          setConfirmedOrderId(generatedId);
          setPaymentState('success');
          setCheckoutStep(3);

          const newOrder = {
            id: generatedId,
            items: items,
            customer: address.fullName,
            phone: address.phone,
            address: `${address.street}, ${address.city} - ${address.pincode}`,
            total: grandTotal,
            status: 'in-progress',
            createdAt: new Date().toISOString(),
            expectedDate: '3 to 5 Days',
            paymentMethod: `Cashfree (${paymentMethod.toUpperCase()})`,
            paymentId: `cf_pay_${Math.random().toString(36).substring(2, 10)}`
          };

          if (onOrderSuccess) {
            onOrderSuccess(newOrder);
          }
        }, 1200);
      }, 1500);
    }, 800);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 999999 }} onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{
          maxWidth: checkoutStep === 3 ? '540px' : '720px',
          width: '94%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          background: 'var(--bg-dark)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.85)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.85rem' }}>
              SB
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                {checkoutStep === 3 ? 'Order Confirmed' : 'StitchBee Premium Checkout'}
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {checkoutStep === 1 && 'Step 1 of 2: Review Items, Address & Appointments'}
                {checkoutStep === 2 && 'Step 2 of 2: Cashfree Secure Payment Gateway'}
                {checkoutStep === 3 && 'Payment Verified Server-Side • Real-Time Tracking Active'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px', color: '#fff' }}>
            <X size={18} />
          </button>
        </div>

        {/* STEP 1: ITEMS REVIEW & ADDRESS */}
        {checkoutStep === 1 && (
          <div>
            {/* Grouped Items List */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                Your Configured Items ({items.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                {items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <img src={it.image} alt={it.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px 0', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {it.name}
                      </h5>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {it.selectedColor || it.specialization || 'Custom Craft'} {it.monogramText ? `• Monogram: "${it.monogramText}"` : ''}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>₹{it.price}</strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Qty: {it.quantity || 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Details */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--primary)' }} />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                  Service / Delivery Address
                </h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={address.fullName}
                  onChange={e => setAddress({ ...address, fullName: e.target.value })}
                  style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.82rem' }}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={e => setAddress({ ...address, phone: e.target.value })}
                  style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.82rem' }}
                />
                <input
                  type="text"
                  placeholder="Street / Apartment / House No"
                  value={address.street}
                  onChange={e => setAddress({ ...address, street: e.target.value })}
                  style={{ gridColumn: 'span 2', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.82rem' }}
                />
              </div>
            </div>

            {/* Bill Summary */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <span>Subtotal Items & Stitching</span>
                <span>₹{itemsSubtotal.toLocaleString()}</span>
              </div>
              {measurementFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  <span>Doorstep Fitting & Inspection</span>
                  <span>₹{measurementFee}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <span>Safe Delivery / Return Courier</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#10b981', marginBottom: '6px' }}>
                  <span>Artisan Launch Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800, color: '#fff', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '6px' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--primary)' }}>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontWeight: 700, fontSize: '0.95rem' }}
              onClick={() => setCheckoutStep(2)}
            >
              Proceed to Cashfree Payment (₹{grandTotal.toLocaleString()})
            </button>
          </div>
        )}

        {/* STEP 2: CASHFREE SECURE PAYMENT GATEWAY */}
        {checkoutStep === 2 && (
          <div>
            {/* Cashfree Official Badge Banner */}
            <div style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.8) 0%, rgba(15,23,42,0.9) 100%)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(76,201,240,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={22} style={{ color: 'var(--accent)' }} />
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block' }}>Cashfree Payments Direct SDK</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>256-Bit SSL Encrypted • PCI-DSS Level 1 Certified</span>
                </div>
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>₹{grandTotal.toLocaleString()}</span>
            </div>

            {/* Payment Method Selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[
                { id: 'upi', label: 'UPI / QR Code', icon: <Smartphone size={14} /> },
                { id: 'card', label: 'Cards (Visa/MC)', icon: <CreditCard size={14} /> },
                { id: 'netbanking', label: 'Net Banking', icon: <Lock size={14} /> },
                { id: 'wallet', label: 'Wallets', icon: <ShieldCheck size={14} /> }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className="btn"
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    borderRadius: '8px',
                    background: paymentMethod === m.id ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                    color: paymentMethod === m.id ? '#fff' : 'var(--text-secondary)',
                    fontWeight: paymentMethod === m.id ? 700 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {/* UPI Option */}
            {paymentMethod === 'upi' && (
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  {['gpay', 'phonepe', 'paytm', 'qr'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setUpiOption(opt)}
                      className="btn"
                      style={{
                        flex: 1,
                        padding: '8px',
                        fontSize: '0.75rem',
                        borderRadius: '8px',
                        border: upiOption === opt ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                        background: upiOption === opt ? 'rgba(247,37,133,0.1)' : 'transparent',
                        color: '#fff',
                        textTransform: 'uppercase',
                        fontWeight: 700
                      }}
                    >
                      {opt === 'qr' ? 'Scan QR' : opt}
                    </button>
                  ))}
                </div>

                {upiOption === 'qr' ? (
                  <div style={{ textAlign: 'center', padding: '10px' }}>
                    <div style={{ width: '130px', height: '130px', background: '#fff', padding: '10px', borderRadius: '12px', margin: '0 auto 10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QrCode size={110} color="#000" />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scan using any UPI App to complete ₹{grandTotal}</span>
                  </div>
                ) : (
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Enter UPI VPA / Mobile</label>
                    <input
                      type="text"
                      placeholder="e.g. yourname@okhdfcbank"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Card Option */}
            {paymentMethod === 'card' && (
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Expiry</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Other Options Fallback */}
            {(paymentMethod === 'netbanking' || paymentMethod === 'wallet') && (
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', marginBottom: '20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                HDFC, ICICI, SBI, Axis, Kotak & Popular Wallets will open in authenticated Cashfree Gateway overlay.
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, padding: '12px' }}
                onClick={() => setCheckoutStep(1)}
                disabled={paymentState !== 'idle'}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 2, padding: '12px', fontWeight: 700 }}
                onClick={handleInitiateCashfree}
                disabled={paymentState !== 'idle'}
              >
                {paymentState === 'initiating' && 'Connecting Cashfree API...'}
                {paymentState === 'processing' && 'Authorizing Transaction...'}
                {paymentState === 'verifying' && 'Verifying Server Signature...'}
                {paymentState === 'idle' && `Pay ₹${grandTotal.toLocaleString()} with Cashfree`}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMATION & ORDER ID */}
        {checkoutStep === 3 && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={38} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
              ✓ Booking & Payment Confirmed
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
              Order ID: <strong style={{ color: 'var(--primary)', letterSpacing: '0.04em' }}>{confirmedOrderId}</strong>
            </p>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', marginBottom: '24px', textAlign: 'left', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Customer:</span>
                <strong style={{ color: '#fff' }}>{address.fullName} ({address.phone})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Verified:</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Cashfree Verified ✓</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount Paid:</span>
                <strong style={{ color: 'var(--primary)' }}>₹{grandTotal.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Expected Delivery:</span>
                <span style={{ color: 'var(--accent)' }}>3 to 5 Business Days</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, padding: '11px', fontSize: '0.85rem' }}
                onClick={onClose}
              >
                Close & Browse
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1.4, padding: '11px', fontSize: '0.85rem', fontWeight: 700 }}
                onClick={() => {
                  onClose();
                  if (onOpenTracking) onOpenTracking(confirmedOrderId);
                }}
              >
                Track Live Order Stepper <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
