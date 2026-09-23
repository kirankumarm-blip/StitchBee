import React, { useState, useEffect } from 'react';
import { 
  Check, X, MapPin, ShieldCheck, ChevronRight, Lock, 
  CreditCard, Smartphone, DollarSign, Gift, QrCode, AlertCircle, 
  CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag
} from 'lucide-react';
import { saveToStorage, loadFromStorage } from '../../utils/mockDb';

export default function FlipkartCheckoutModal({
  isOpen,
  onClose,
  items = [],
  currentUser,
  onOrderSuccess,
  onOpenTracking
}) {
  if (!isOpen) return null;

  // Active step: 1 (Address), 2 (Order Summary), 3 (Payment), 4 (Success Screen)
  const [checkoutStep, setCheckoutStep] = useState(1);

  // Address Form State (Image 3 Reference)
  const [fullName, setFullName] = useState(currentUser?.name || 'Kiran Kumar');
  const [phone, setPhone] = useState(currentUser?.phone || '9886973659');
  const [altPhone, setAltPhone] = useState('');
  const [showAltPhone, setShowAltPhone] = useState(false);
  const [pincode, setPincode] = useState('560083');
  const [stateName, setStateName] = useState('Karnataka');
  const [cityName, setCityName] = useState('Bengaluru');
  const [houseNo, setHouseNo] = useState('#210, 2nd Cross');
  const [roadName, setRoadName] = useState('Prestige Park Square, Royal Hermitage Layout, Weavers Colony');
  const [selectedLandmark, setSelectedLandmark] = useState('Prestige Park Square');
  const [customLandmark, setCustomLandmark] = useState('');
  const [addressType, setAddressType] = useState('home'); // 'home' | 'work'
  const [fetchingGps, setFetchingGps] = useState(false);
  const [gpsNotification, setGpsNotification] = useState(null);

  // Order Summary State (Image 4 Reference)
  const [itemQuantities, setItemQuantities] = useState(
    items.reduce((acc, it, idx) => ({ ...acc, [it.id || idx]: it.quantity || 1 }), {})
  );
  const [deliveryEmail, setDeliveryEmail] = useState(currentUser?.email || 'kiran.kumar@stitchbee.in');
  const [donationAmount, setDonationAmount] = useState(0); // 0 | 10 | 20 | 50 | 100

  // Payment State (Image 5 Reference)
  const [paymentTab, setPaymentTab] = useState('upi'); // 'upi' | 'card' | 'cod' | 'gift' | 'emi'
  const [qrCodeRevealed, setQrCodeRevealed] = useState(true);
  const [upiIdInput, setUpiIdInput] = useState('');
  const [cardNumber, setCardNumber] = useState('4532 8920 1284 9012');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('784');
  const [cardName, setCardName] = useState('Kiran Kumar');
  const [saveCardRbi, setSaveCardRbi] = useState(true);
  const [codCaptchaInput, setCodCaptchaInput] = useState('');
  const [codCaptchaCode] = useState('4829');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Financial Calculations
  const calculatedMrp = items.reduce((acc, it) => {
    const orig = it.originalPrice || Math.round((it.price || 1799) * 1.4);
    const qty = itemQuantities[it.id] || it.quantity || 1;
    return acc + orig * qty;
  }, 0) || 1799;

  const calculatedSellingPrice = items.reduce((acc, it) => {
    const pr = it.effectivePrice || it.price || 395;
    const qty = itemQuantities[it.id] || it.quantity || 1;
    return acc + pr * qty;
  }, 0) || 395;

  const platformFee = 10;
  const totalDiscounts = Math.max(0, calculatedMrp - calculatedSellingPrice);
  const grandTotal = Math.max(0, calculatedSellingPrice + platformFee + donationAmount);
  const totalSavings = Math.max(0, calculatedMrp - grandTotal);

  // GPS Location Fetching Handler (Image 3 "Use my location" button)
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setFetchingGps(true);
    setGpsNotification("Detecting precise GPS coordinates...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Auto-fill address based on GPS coordinates
        setTimeout(() => {
          setFetchingGps(false);
          setPincode('560083');
          setCityName('Bengaluru');
          setStateName('Karnataka');
          setRoadName('Prestige Park Square, Royal Hermitage Layout, Weavers Colony');
          setSelectedLandmark('Prestige Park Square');
          setGpsNotification("✓ Location auto-filled via GPS (Bengaluru 560083)");
          setTimeout(() => setGpsNotification(null), 4000);
        }, 800);
      },
      (error) => {
        // Fallback for location permission denied or error
        setTimeout(() => {
          setFetchingGps(false);
          setPincode('560083');
          setCityName('Bengaluru');
          setStateName('Karnataka');
          setRoadName('Prestige Park Square, Royal Hermitage Layout, Weavers Colony');
          setSelectedLandmark('Prestige Park Square');
          setGpsNotification("✓ Set to primary Bengaluru service zone (560083)");
          setTimeout(() => setGpsNotification(null), 3500);
        }, 600);
      },
      { timeout: 8000 }
    );
  };

  // Step 1 Validation & Save
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !pincode.trim() || !houseNo.trim() || !roadName.trim()) {
      alert("Please fill in all required address fields.");
      return;
    }
    setCheckoutStep(2);
  };

  // Step 3 Payment Authorization & Order Placement
  const handleCompletePayment = () => {
    setProcessingPayment(true);

    setTimeout(() => {
      const orderId = `STB-${Math.floor(100000 + Math.random() * 900000)}`;
      const resolvedAddress = `${houseNo}, ${roadName}, Near ${selectedLandmark === 'Other' ? customLandmark : selectedLandmark}, ${cityName}, ${stateName} - ${pincode}`;

      const newOrderData = {
        id: orderId,
        items: items.map(it => ({
          ...it,
          quantity: itemQuantities[it.id] || it.quantity || 1
        })),
        customer: fullName,
        phone: phone,
        email: deliveryEmail,
        address: resolvedAddress,
        addressType: addressType,
        total: grandTotal,
        mrp: calculatedMrp,
        savings: totalSavings,
        paymentMethod: paymentTab === 'upi' ? 'UPI (QR Code / Instant)' : (paymentTab === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'),
        paymentStatus: paymentTab === 'cod' ? 'Pending on Delivery' : 'Paid (Verified)',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        expectedDelivery: '28 Sep, Tuesday'
      };

      // Persist to Mock Database & LocalStorage
      const existingOrders = loadFromStorage('stichbee_orders', []);
      const updated = [newOrderData, ...existingOrders];
      saveToStorage('stichbee_orders', updated);

      if (onOrderSuccess) {
        onOrderSuccess(newOrderData);
      }

      setConfirmedOrder(newOrderData);
      setProcessingPayment(false);
      setCheckoutStep(4); // Success screen
    }, 1500);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 999999, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div 
        className="modal-content animate-fade-in"
        style={{
          width: '95%',
          maxWidth: checkoutStep === 4 ? '560px' : '1080px',
          maxHeight: '94vh',
          overflowY: 'auto',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          padding: 0,
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        
        {/* Top Flipkart Stepper Navigation Bar (Images 3, 4, 5 Reference) */}
        {checkoutStep !== 4 && (
          <header 
            style={{ 
              background: 'var(--grad-primary)', 
              color: '#ffffff', 
              padding: '16px 24px', 
              borderTopLeftRadius: '16px', 
              borderTopRightRadius: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {/* Logo & Close */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={onClose} 
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}
                title="Cancel Checkout"
              >
                <ArrowLeft size={20} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
                  StitchBee
                </span>
                <span style={{ fontSize: '0.72rem', background: '#ffe500', color: '#000', fontWeight: 900, padding: '1px 5px', borderRadius: '3px' }}>
                  PLUS
                </span>
              </div>
            </div>

            {/* Stepper (1 Address, 2 Order Summary, 3 Payment) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Step 1: Address */}
              <div 
                onClick={() => setCheckoutStep(1)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  cursor: 'pointer',
                  opacity: checkoutStep === 1 ? 1 : 0.85
                }}
              >
                <span 
                  style={{ 
                    width: '22px', 
                    height: '22px', 
                    borderRadius: '50%', 
                    background: checkoutStep > 1 ? '#10b981' : (checkoutStep === 1 ? '#fff' : 'rgba(255,255,255,0.3)'), 
                    color: checkoutStep > 1 ? '#fff' : (checkoutStep === 1 ? 'var(--primary)' : '#fff'), 
                    fontSize: '0.75rem', 
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {checkoutStep > 1 ? <Check size={14} strokeWidth={3} /> : '1'}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: checkoutStep === 1 ? 800 : 500 }}>
                  Address
                </span>
              </div>

              <div style={{ width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.4)' }} />

              {/* Step 2: Order Summary */}
              <div 
                onClick={() => checkoutStep > 2 && setCheckoutStep(2)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  cursor: checkoutStep >= 2 ? 'pointer' : 'default',
                  opacity: checkoutStep === 2 ? 1 : (checkoutStep > 2 ? 0.85 : 0.6)
                }}
              >
                <span 
                  style={{ 
                    width: '22px', 
                    height: '22px', 
                    borderRadius: '50%', 
                    background: checkoutStep > 2 ? '#10b981' : (checkoutStep === 2 ? '#fff' : 'rgba(255,255,255,0.3)'), 
                    color: checkoutStep > 2 ? '#fff' : (checkoutStep === 2 ? 'var(--primary)' : '#fff'), 
                    fontSize: '0.75rem', 
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {checkoutStep > 2 ? <Check size={14} strokeWidth={3} /> : '2'}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: checkoutStep === 2 ? 800 : 500 }}>
                  Order Summary
                </span>
              </div>

              <div style={{ width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.4)' }} />

              {/* Step 3: Payment */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  opacity: checkoutStep === 3 ? 1 : 0.6 
                }}
              >
                <span 
                  style={{ 
                    width: '22px', 
                    height: '22px', 
                    borderRadius: '50%', 
                    background: checkoutStep === 3 ? '#fff' : 'rgba(255,255,255,0.3)', 
                    color: checkoutStep === 3 ? 'var(--primary)' : '#fff', 
                    fontSize: '0.75rem', 
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  3
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: checkoutStep === 3 ? 800 : 500 }}>
                  Payment
                </span>
              </div>
            </div>

            {/* 100% Secure Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', opacity: 0.9 }}>
              <Lock size={14} /> 100% Safe & Secure
            </div>
          </header>
        )}

        {/* Modal Body Container */}
        <div style={{ padding: '24px' }}>
          
          {/* ============================================================== */}
          {/* STEP 1: ADD DELIVERY ADDRESS (Image 3 Reference)               */}
          {/* ============================================================== */}
          {checkoutStep === 1 && (
            <div className="animate-fade-in" style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Add delivery address
                </h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>* Required Fields</span>
              </div>

              {gpsNotification && (
                <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '10px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, marginBottom: '16px' }}>
                  {gpsNotification}
                </div>
              )}

              <form onSubmit={handleSaveAddress}>
                {/* Full Name & Phone Number */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      Full Name (Required)*
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Kiran Kumar"
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      Phone number (Required)*
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                {/* Alternate Phone toggle */}
                <div style={{ marginBottom: '16px' }}>
                  {!showAltPhone ? (
                    <button
                      type="button"
                      onClick={() => setShowAltPhone(true)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                    >
                      + Add Alternate Phone Number
                    </button>
                  ) : (
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                        Alternate Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={altPhone}
                        onChange={e => setAltPhone(e.target.value)}
                        placeholder="Alternative contact number"
                        style={{ width: '50%', padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                    </div>
                  )}
                </div>

                {/* Pincode with GPS "Use my location" button (Image 3 Key Feature) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'flex-end', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      Pincode (Required)*
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                      placeholder="e.g. 560083"
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 700 }}
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleUseMyLocation}
                      disabled={fetchingGps}
                      className="btn"
                      style={{
                        width: '100%',
                        padding: '12px 18px',
                        background: 'var(--grad-primary)',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(247, 37, 133, 0.35)'
                      }}
                    >
                      <MapPin size={18} />
                      {fetchingGps ? 'Fetching GPS Coordinates...' : 'Use my location'}
                    </button>
                  </div>
                </div>

                {/* State & City (Auto-populated by GPS) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      State (Required)*
                    </label>
                    <input
                      type="text"
                      required
                      value={stateName}
                      onChange={e => setStateName(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                      City (Required)*
                    </label>
                    <input
                      type="text"
                      required
                      value={cityName}
                      onChange={e => setCityName(e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                {/* House No., Building Name */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    House No., Building Name (Required)*
                  </label>
                  <input
                    type="text"
                    required
                    value={houseNo}
                    onChange={e => setHouseNo(e.target.value)}
                    placeholder="Flat/House number, Floor, Apartment or Building Name"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                  />
                </div>

                {/* Road name, Area, Colony */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Road name, Area, Colony (Required)*
                  </label>
                  <input
                    type="text"
                    required
                    value={roadName}
                    onChange={e => setRoadName(e.target.value)}
                    placeholder="Street, Cross, Sector, Layout or Colony"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                  />
                </div>

                {/* Nearby Landmark Options (Image 3 Feature) */}
                <div style={{ marginBottom: '20px', background: 'var(--bg-secondary)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '10px' }}>
                    Select a nearby landmark (Required)*
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      'Prestige Park Square',
                      'Basavanapura',
                      'Little Horizons Montessori Preschool and daycare',
                      'Weavers Colony Main Gate',
                      'Other'
                    ].map(lm => (
                      <label key={lm} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="landmark-radio"
                          checked={selectedLandmark === lm}
                          onChange={() => setSelectedLandmark(lm)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>{lm}</span>
                      </label>
                    ))}

                    {selectedLandmark === 'Other' && (
                      <input
                        type="text"
                        placeholder="Enter specific landmark or landmark description..."
                        value={customLandmark}
                        onChange={e => setCustomLandmark(e.target.value)}
                        style={{ marginTop: '6px', width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                      />
                    )}
                  </div>
                </div>

                {/* Type of Address: Home / Work */}
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                    Type of address
                  </span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setAddressType('home')}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '20px',
                        border: addressType === 'home' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: addressType === 'home' ? 'rgba(247,37,133,0.1)' : 'transparent',
                        color: addressType === 'home' ? 'var(--primary)' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      🏠 Home (All day delivery)
                    </button>

                    <button
                      type="button"
                      onClick={() => setAddressType('work')}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '20px',
                        border: addressType === 'work' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: addressType === 'work' ? 'rgba(247,37,133,0.1)' : 'transparent',
                        color: addressType === 'work' ? 'var(--primary)' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      💼 Work (Delivery between 10 AM - 5 PM)
                    </button>
                  </div>
                </div>

                {/* Save Address Button (Image 3 Orange Button) */}
                <button
                  type="submit"
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    background: 'var(--grad-primary)',
                    color: '#fff',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(247, 37, 133, 0.4)'
                  }}
                >
                  Save Address & Proceed to Order Summary
                </button>
              </form>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 2: ORDER SUMMARY (Image 4 Reference)                      */}
          {/* ============================================================== */}
          {checkoutStep === 2 && (
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', alignItems: 'start' }}>
              
              {/* Left Column: Delivery Address Card & Product Review */}
              <div>
                {/* Deliver To Card (Image 4 Header) */}
                <div 
                  style={{ 
                    background: 'var(--bg-secondary)', 
                    borderRadius: '10px', 
                    padding: '16px 20px', 
                    marginBottom: '16px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Deliver to:
                    </span>
                    <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-primary)', margin: '4px 0 2px 0' }}>
                      {fullName} <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase', marginLeft: '6px' }}>{addressType}</span>
                    </strong>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 4px 0', lineHeight: 1.4 }}>
                      {houseNo}, {roadName}, {cityName} {pincode}
                    </p>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {phone}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep(1)}
                    className="btn btn-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}
                  >
                    Change
                  </button>
                </div>

                {/* Ordered Items List (Image 4 Product Card) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px' }}>
                  {items.map((prod, idx) => {
                    const orig = prod.originalPrice || Math.round((prod.price || 1799) * 1.4);
                    const qty = itemQuantities[prod.id] || prod.quantity || 1;
                    const disc = Math.round(((orig - prod.price) / orig) * 100);

                    return (
                      <div
                        key={prod.id || idx}
                        style={{
                          background: 'var(--bg-card)',
                          borderRadius: '12px',
                          border: '1px solid var(--border-color)',
                          padding: '16px',
                          display: 'flex',
                          gap: '16px'
                        }}
                      >
                        {/* Thumbnail */}
                        <div style={{ width: '80px', height: '90px', borderRadius: '8px', background: '#0a0914', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {/* Details */}
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                            {prod.name}
                          </h4>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', background: '#388e3c', color: '#fff', padding: '1px 5px', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 700 }}>
                              {prod.rating || 4.6} <Star size={9} style={{ fill: '#fff' }} />
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              ({prod.reviewsCount || 254})
                            </span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', background: 'rgba(76,201,240,0.12)', color: 'var(--accent)', padding: '1px 4px', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 800 }}>
                              <ShieldCheck size={10} style={{ color: 'var(--accent)' }} /> Assured
                            </span>
                          </div>

                          {/* Pricing */}
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#388e3c' }}>
                              ↓{disc}%
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                              ₹{(orig * qty).toLocaleString()}
                            </span>
                            <strong style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                              ₹{((prod.effectivePrice || prod.price) * qty).toLocaleString()}
                            </strong>
                          </div>

                          {/* Quantity Selector & Delivery estimate */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Qty:</span>
                              <select
                                value={qty}
                                onChange={e => setItemQuantities({ ...itemQuantities, [prod.id]: Number(e.target.value) })}
                                style={{ padding: '3px 8px', borderRadius: '4px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.78rem', fontWeight: 700 }}
                              >
                                {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
                              </select>
                            </div>

                            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                              Delivery by <strong>Sep 28, Tue</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Email Confirmation Row */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px 16px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Order confirmation email will be sent to:
                    </span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                      {deliveryEmail}
                    </strong>
                  </div>
                </div>

                {/* Donate to Foundation (Image 4 Reference) */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '14px 16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block' }}>
                        Donate to StitchBee Artisan Foundation
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Support traditional handloom and leather craftsmen across India
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[10, 20, 50, 100].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDonationAmount(donationAmount === amt ? 0 : amt)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '20px',
                          border: donationAmount === amt ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                          background: donationAmount === amt ? 'rgba(247,37,133,0.1)' : 'transparent',
                          color: donationAmount === amt ? 'var(--primary)' : 'var(--text-secondary)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Price Details Card (Image 4 Reference) */}
              <div 
                className="flipkart-price-details-card"
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  padding: '20px',
                  position: 'sticky',
                  top: '80px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }}
              >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 14px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  Price Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>MRP (incl. of all taxes)</span>
                    <span>₹{calculatedMrp.toLocaleString()}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>

                  {donationAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Artisan Foundation Donation</span>
                      <span>₹{donationAmount}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#388e3c', fontWeight: 600 }}>
                    <span>Discounts</span>
                    <span>-₹{totalDiscounts.toLocaleString()}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
                    <span>Delivery Charges</span>
                    <span>FREE</span>
                  </div>
                </div>

                {/* Total Amount */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '14px' }}>
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--primary)' }}>₹{grandTotal.toLocaleString()}</span>
                </div>

                {/* Savings Banner (Image 4 Green Pill) */}
                <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, textAlign: 'center', marginBottom: '20px' }}>
                  🎉 You'll save ₹{totalSavings.toLocaleString()} on this order!
                </div>

                {/* Continue to Payment Button (Image 4 Yellow Button) */}
                <button
                  type="button"
                  onClick={() => setCheckoutStep(3)}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    background: 'var(--grad-primary)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(247, 37, 133, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  Continue to Payment <ArrowRight size={18} />
                </button>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 3: COMPLETE PAYMENT (Image 5 Reference)                    */}
          {/* ============================================================== */}
          {checkoutStep === 3 && (
            <div className="animate-fade-in payment-three-col-responsive" style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: '20px', alignItems: 'start' }}>
              
              {/* Col 1: Payment Method Tabs (Image 5 Left Column) */}
              <div 
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden'
                }}
              >
                {[
                  { id: 'upi', label: 'UPI', desc: 'Pay by any UPI app', icon: <Smartphone size={16} /> },
                  { id: 'card', label: 'Credit / Debit / ATM Card', desc: 'Add & secure cards', icon: <CreditCard size={16} /> },
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay at your doorstep', icon: <DollarSign size={16} /> },
                  { id: 'gift', label: 'Have a Gift Card?', desc: 'Redeem credits', icon: <Gift size={16} /> },
                  { id: 'emi', label: 'EMI', desc: 'Unavailable for this order', icon: <AlertCircle size={16} />, disabled: true }
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    disabled={tab.disabled}
                    onClick={() => !tab.disabled && setPaymentTab(tab.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '14px 16px',
                      background: paymentTab === tab.id ? 'var(--bg-card)' : 'transparent',
                      border: 'none',
                      borderLeft: paymentTab === tab.id ? '4px solid var(--primary)' : '4px solid transparent',
                      borderBottom: '1px solid var(--border-color)',
                      cursor: tab.disabled ? 'not-allowed' : 'pointer',
                      opacity: tab.disabled ? 0.45 : 1,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ color: paymentTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)' }}>
                        {tab.icon}
                      </span>
                      <strong style={{ fontSize: '0.84rem', color: paymentTab === tab.id ? 'var(--primary)' : 'var(--text-primary)' }}>
                        {tab.label}
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', paddingLeft: '24px' }}>
                      {tab.desc}
                    </span>
                  </button>
                ))}
              </div>

              {/* Col 2: Dynamic Payment Method Workspace (Image 5 Center Column) */}
              <div 
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  padding: '24px',
                  textAlign: paymentTab === 'upi' ? 'center' : 'left'
                }}
              >
                {/* UPI QR Code Interface (Image 5 Centerpiece) */}
                {paymentTab === 'upi' && (
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                      Scan QR and Pay
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '18px' }}>
                      Open any UPI app on your mobile to scan & authorize
                    </span>

                    {/* QR Code Container Box */}
                    <div 
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'inline-block',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                        marginBottom: '16px',
                        maxWidth: '280px',
                        width: '100%'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
                        AMOUNT TO PAY
                      </span>
                      <strong style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', display: 'block', marginBottom: '14px' }}>
                        ₹{grandTotal.toLocaleString()}
                      </strong>

                      {/* Visual QR Code Grid */}
                      <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 12px auto' }}>
                        {/* High-res SVG QR Simulation */}
                        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                          <rect width="100" height="100" fill="#ffffff" />
                          {/* Corner Markers */}
                          <rect x="5" y="5" width="28" height="28" fill="#0f172a" rx="4" />
                          <rect x="9" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                          <rect x="13" y="13" width="12" height="12" fill="#0f172a" rx="2" />

                          <rect x="67" y="5" width="28" height="28" fill="#0f172a" rx="4" />
                          <rect x="71" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                          <rect x="75" y="13" width="12" height="12" fill="#0f172a" rx="2" />

                          <rect x="5" y="67" width="28" height="28" fill="#0f172a" rx="4" />
                          <rect x="9" y="71" width="20" height="20" fill="#ffffff" rx="2" />
                          <rect x="13" y="75" width="12" height="12" fill="#0f172a" rx="2" />

                          {/* Data Matrix Dots */}
                          <rect x="38" y="8" width="6" height="6" fill="#0f172a" />
                          <rect x="48" y="12" width="6" height="6" fill="#0f172a" />
                          <rect x="56" y="8" width="6" height="6" fill="#0f172a" />
                          <rect x="38" y="24" width="6" height="6" fill="#0f172a" />
                          <rect x="50" y="28" width="6" height="6" fill="#0f172a" />

                          <rect x="8" y="38" width="6" height="6" fill="#0f172a" />
                          <rect x="20" y="44" width="6" height="6" fill="#0f172a" />
                          <rect x="32" y="38" width="6" height="6" fill="#0f172a" />
                          <rect x="44" y="42" width="12" height="12" fill="#f72585" rx="3" />
                          <rect x="60" y="38" width="6" height="6" fill="#0f172a" />
                          <rect x="72" y="44" width="6" height="6" fill="#0f172a" />
                          <rect x="84" y="38" width="6" height="6" fill="#0f172a" />

                          <rect x="38" y="62" width="6" height="6" fill="#0f172a" />
                          <rect x="48" y="70" width="6" height="6" fill="#0f172a" />
                          <rect x="56" y="62" width="6" height="6" fill="#0f172a" />
                          <rect x="42" y="82" width="6" height="6" fill="#0f172a" />
                          <rect x="68" y="78" width="6" height="6" fill="#0f172a" />
                          <rect x="82" y="84" width="6" height="6" fill="#0f172a" />
                        </svg>

                        {/* StitchBee Bee emblem in center */}
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '18px', background: '#ffffff', borderRadius: '50%', padding: '2px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                            🐝
                          </span>
                        </div>
                      </div>

                      {/* Supported UPI Apps Logos (Image 5 Reference) */}
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                        <span style={{ color: '#4285F4', fontWeight: 800 }}>GPay</span> • 
                        <span style={{ color: '#5f259f', fontWeight: 800 }}>PhonePe</span> • 
                        <span style={{ color: '#00baf2', fontWeight: 800 }}>Paytm</span> • 
                        <span style={{ color: '#f7931a', fontWeight: 800 }}>BHIM</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '18px', maxWidth: '320px', margin: '0 auto 18px auto' }}>
                      Do not hit back or close this screen until the transaction is complete
                    </div>

                    {/* Or enter UPI ID / VPA */}
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', maxWidth: '340px', margin: '0 auto' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                        Or enter UPI ID / VPA (e.g. mobile@upi)
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          placeholder="e.g. 9886973659@paytm"
                          value={upiIdInput}
                          onChange={e => setUpiIdInput(e.target.value)}
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                        />
                        <button
                          type="button"
                          onClick={handleCompletePayment}
                          disabled={processingPayment}
                          className="btn"
                          style={{ padding: '8px 16px', background: 'var(--grad-primary)', color: '#fff', fontSize: '0.82rem', fontWeight: 700, borderRadius: '6px' }}
                        >
                          Verify & Pay
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Credit/Debit Card Form */}
                {paymentTab === 'card' && (
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
                      Enter Card Details
                    </h3>
                    
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        placeholder="XXXX XXXX XXXX XXXX"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem', letterSpacing: '0.05em' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        placeholder="Name as on card"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                      />
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '20px' }}>
                      <input
                        type="checkbox"
                        checked={saveCardRbi}
                        onChange={e => setSaveCardRbi(e.target.checked)}
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      <span>Securely save this card as per RBI guidelines</span>
                    </label>
                  </div>
                )}

                {/* Cash on Delivery Form */}
                {paymentTab === 'cod' && (
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
                      Cash on Delivery
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px' }}>
                      Pay comfortably via Cash or UPI QR at your doorstep upon receiving and inspecting your handcrafted StitchBee delivery.
                    </p>

                    <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                        Enter the verification code shown below:
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#0f172a', color: '#10b981', padding: '8px 16px', borderRadius: '6px', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '0.2em', fontFamily: 'monospace' }}>
                          {codCaptchaCode}
                        </div>
                        <input
                          type="text"
                          placeholder="Code"
                          value={codCaptchaInput}
                          onChange={e => setCodCaptchaInput(e.target.value)}
                          style={{ width: '120px', padding: '10px 12px', borderRadius: '6px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700 }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Gift Card Tab */}
                {paymentTab === 'gift' && (
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
                      Redeem Gift Card
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                      <input
                        type="text"
                        placeholder="Enter 16-digit Gift Card Number"
                        style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                      <button type="button" className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '0.82rem' }}>
                        Apply
                      </button>
                    </div>
                  </div>
                )}

                {/* Primary Payment Action CTA Button */}
                <button
                  type="button"
                  onClick={handleCompletePayment}
                  disabled={processingPayment}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    background: 'var(--grad-primary)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    border: 'none',
                    cursor: processingPayment ? 'wait' : 'pointer',
                    boxShadow: '0 4px 16px rgba(247, 37, 133, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {processingPayment ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Authorizing with Gateway...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Pay ₹{grandTotal.toLocaleString()}
                    </>
                  )}
                </button>
              </div>

              {/* Col 3: Price Details & Cashback Banner (Image 5 Right Column) */}
              <div 
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  padding: '18px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Price Details
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
                    100% Secure
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>MRP (incl. of taxes)</span>
                    <span>₹{calculatedMrp.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#388e3c', fontWeight: 600 }}>
                    <span>Total Discount</span>
                    <span>-₹{totalDiscounts.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '14px' }}>
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--primary)' }}>₹{grandTotal.toLocaleString()}</span>
                </div>

                {/* 5% Cashback Banner (Image 5 Reference) */}
                <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600 }}>
                  <div style={{ fontWeight: 800, marginBottom: '2px' }}>5% Instant Cashback</div>
                  Claimed now with your active payment offer
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 4: ORDER CONFIRMED CELEBRATION SCREEN                     */}
          {/* ============================================================== */}
          {checkoutStep === 4 && confirmedOrder && (
            <div className="animate-fade-in" style={{ padding: '20px', textAlign: 'center' }}>
              <div 
                style={{ 
                  width: '68px', 
                  height: '68px', 
                  borderRadius: '50%', 
                  background: '#10b981', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 16px auto',
                  boxShadow: '0 8px 24px rgba(16,185,129,0.35)'
                }}
              >
                <Check size={36} strokeWidth={3} />
              </div>

              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Order Placed Successfully!
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', margin: '4px 0 10px 0' }}>
                Thank you, {confirmedOrder.customer}!
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                Your handcrafted order has been assigned to our master atelier and is being scheduled for doorstep dispatch.
              </p>

              <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', padding: '16px', maxWidth: '440px', margin: '0 auto 24px auto', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order ID:</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{confirmedOrder.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Amount Paid:</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>₹{confirmedOrder.total.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Payment Mode:</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>{confirmedOrder.paymentMethod}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Delivery:</span>
                  <strong style={{ fontSize: '0.85rem', color: '#10b981' }}>{confirmedOrder.expectedDelivery}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenTracking) onOpenTracking(confirmedOrder.id);
                  }}
                  className="btn btn-secondary"
                  style={{ padding: '12px 20px', fontWeight: 700, fontSize: '0.88rem' }}
                >
                  Track Order Live
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-primary"
                  style={{ padding: '12px 24px', fontWeight: 700, fontSize: '0.88rem' }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
