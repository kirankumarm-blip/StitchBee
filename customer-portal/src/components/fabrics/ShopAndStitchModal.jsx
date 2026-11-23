import React, { useState } from 'react';
import { 
  X, Scissors, Check, MapPin, Star, ShieldCheck, Ruler, Calendar, 
  CreditCard, ArrowRight, ArrowLeft, Sparkles, User, Truck, Clock, ChevronRight
} from 'lucide-react';

const OUTFIT_OPTIONS = [
  { id: 'kurti', name: 'Designer Kurti', baseStitching: 450, reqMetres: 2.5, icon: '👗', popular: true },
  { id: 'dress', name: 'A-Line Maxi Dress', baseStitching: 650, reqMetres: 3.5, icon: '👗', popular: true },
  { id: 'shirt', name: 'Classic Tailored Shirt', baseStitching: 400, reqMetres: 2.0, icon: '👔', popular: true },
  { id: 'blouse', name: 'Padded Designer Blouse', baseStitching: 550, reqMetres: 1.0, icon: '👚', popular: true },
  { id: 'trouser', name: 'Pleated Trousers', baseStitching: 450, reqMetres: 1.5, icon: '👖' },
  { id: 'kids', name: 'Kids Festive Set', baseStitching: 350, reqMetres: 1.5, icon: '👶' },
  { id: 'suit', name: 'Salwar Kameez Set', baseStitching: 750, reqMetres: 4.5, icon: '✨' },
  { id: 'custom', name: 'Bespoke Custom Outfit', baseStitching: 850, reqMetres: 3.0, icon: '🎨' }
];

const NEARBY_TAILORS = [
  {
    id: 't-1',
    name: 'Kiran Boutique & Master Tailor',
    specialty: 'Kurtis, Blouses & Western Dresses',
    rating: 4.9,
    reviews: 218,
    distance: '1.2 km away',
    turnaround: '3-4 Days',
    experience: '18 Yrs Exp',
    verified: true,
    image: '/assets/kiran.fb1b1f80.jpg'
  },
  {
    id: 't-2',
    name: 'Stany Bespoke Atelier',
    specialty: 'Shirts, Suits & Formal Wear',
    rating: 4.8,
    reviews: 164,
    distance: '2.5 km away',
    turnaround: '4-5 Days',
    experience: '14 Yrs Exp',
    verified: true,
    image: '/assets/stany.4f315ea9.jpg'
  },
  {
    id: 't-3',
    name: 'Manoj Designer Studio',
    specialty: 'Bridal Outfits & Heavy Embellishment',
    rating: 4.9,
    reviews: 312,
    distance: '3.1 km away',
    turnaround: '5-6 Days',
    experience: '22 Yrs Exp',
    verified: true,
    image: '/assets/manoj.318d554e.jpg'
  }
];

export default function ShopAndStitchModal({ fabric, isOpen, onClose, onCompleteOrder, isDark, currentUser }) {
  const [step, setStep] = useState(1); // 1 to 6
  const [selectedOutfit, setSelectedOutfit] = useState(OUTFIT_OPTIONS[0]);
  const [metres, setMetres] = useState(OUTFIT_OPTIONS[0].reqMetres);
  const [selectedTailor, setSelectedTailor] = useState(NEARBY_TAILORS[0]);
  const [measurementType, setMeasurementType] = useState('doorstep'); // 'ai' | 'manual' | 'doorstep'
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser?.address || '123 Green Glen Road, HSR Layout, Bengaluru 560102'
  );
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen || !fabric) return null;

  const fabricCost = Math.round(fabric.price * metres);
  const stitchingCost = selectedOutfit.baseStitching;
  const measurementFee = measurementType === 'doorstep' ? 99 : 0;
  const deliveryFee = 0; // Free delivery
  const tax = Math.round((fabricCost + stitchingCost + measurementFee) * 0.05);
  const totalAmount = fabricCost + stitchingCost + measurementFee + deliveryFee + tax;

  const handleOutfitChange = (outfit) => {
    setSelectedOutfit(outfit);
    setMetres(outfit.reqMetres);
  };

  const handleFinishOrder = () => {
    const newOrder = {
      id: `SB-STITCH-${Date.now().toString().slice(-6)}`,
      category: 'clothing',
      type: 'Shop & Stitch',
      fabric: {
        id: fabric.id,
        name: fabric.name,
        image: fabric.image,
        metres: metres,
        pricePerMetre: fabric.price,
        cost: fabricCost
      },
      outfit: selectedOutfit.name,
      tailor: {
        name: selectedTailor.name,
        specialty: selectedTailor.specialty,
        distance: selectedTailor.distance
      },
      measurementType: measurementType,
      pricing: {
        fabricCost,
        stitchingCost,
        measurementFee,
        deliveryFee,
        tax,
        total: totalAmount
      },
      deliveryAddress,
      paymentMethod,
      paymentStatus: 'Paid',
      status: 'Tailor Assigned',
      stage: 'Fabric Dispatch',
      progress: 20,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    };

    if (onCompleteOrder) {
      onCompleteOrder(newOrder);
    }
    setOrderConfirmed(true);
  };

  const handleCloseAll = () => {
    setOrderConfirmed(false);
    setStep(1);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(7, 20, 92, 0.72)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: isDark ? '#1C2033' : '#FFFFFF',
        color: isDark ? '#F8FAFC' : '#07145C',
        borderRadius: '24px',
        maxWidth: '720px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        position: 'relative',
        border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2'
      }}>
        {/* Close Button */}
        <button
          onClick={handleCloseAll}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isDark ? '#F8FAFC' : '#687395'
          }}
        >
          <X size={18} />
        </button>

        {!orderConfirmed ? (
          <>
            {/* Header & Step Indicator */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #FF008A, #7B2DFF)',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Shop & Stitch™ Workflow
                </span>
                <span style={{ fontSize: '13px', color: '#687395', fontWeight: '600' }}>
                  Step {step} of 6
                </span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '900', margin: 0 }}>
                {step === 1 && '1. Fabric & Length Details'}
                {step === 2 && '2. Choose Outfit to Stitch'}
                {step === 3 && '3. Select Verified Local Tailor'}
                {step === 4 && '4. Measurement Preference'}
                {step === 5 && '5. Review Design & Pricing'}
                {step === 6 && '6. Delivery & Order Confirmation'}
              </h2>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '5px', background: isDark ? '#34394D' : '#E8EAF2', borderRadius: '10px', marginTop: '12px', overflow: 'hidden' }}>
                <div style={{ width: `${(step / 6) * 100}%`, height: '100%', background: '#FF008A', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            {/* STEP 1: Fabric Selection */}
            {step === 1 && (
              <div>
                <div style={{
                  display: 'flex', gap: '20px', padding: '16px', borderRadius: '16px',
                  background: isDark ? '#101322' : '#FFF0F7', marginBottom: '20px',
                  border: isDark ? '1px solid #34394D' : '1px solid #FFD0E5'
                }}>
                  <img src={fabric.image} alt={fabric.name} style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800' }}>{fabric.name}</h3>
                    <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#687395' }}>{fabric.composition}</p>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
                      <span><strong>Price:</strong> ₹{fabric.price}/m</span>
                      <span><strong>Width:</strong> {fabric.width}</span>
                      <span><strong>Pattern:</strong> {fabric.pattern}</span>
                    </div>
                  </div>
                </div>

                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
                  Select Fabric Length (Metres):
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {[1.5, 2.0, 2.5, 3.0, 3.5, 4.5, 5.0].map(m => (
                    <button
                      key={m}
                      onClick={() => setMetres(m)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '13px',
                        border: metres === m ? '2px solid #FF008A' : isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                        background: metres === m ? '#FF008A' : 'transparent',
                        color: metres === m ? '#FFFFFF' : 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      {m} Metres
                    </button>
                  ))}
                </div>

                <div style={{ padding: '14px', borderRadius: '12px', background: isDark ? '#101322' : '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Fabric Total ({metres}m × ₹{fabric.price})</span>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#FF008A' }}>₹{fabricCost}</span>
                </div>
              </div>
            )}

            {/* STEP 2: Choose Outfit */}
            {step === 2 && (
              <div>
                <p style={{ fontSize: '13px', color: '#687395', marginBottom: '16px' }}>
                  Select the silhouette you want tailored with this {fabric.name}:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  {OUTFIT_OPTIONS.map(outfit => (
                    <div
                      key={outfit.id}
                      onClick={() => handleOutfitChange(outfit)}
                      style={{
                        padding: '14px',
                        borderRadius: '14px',
                        border: selectedOutfit.id === outfit.id ? '2px solid #FF008A' : isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                        background: selectedOutfit.id === outfit.id ? (isDark ? 'rgba(255,0,138,0.12)' : '#FFF0F7') : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{outfit.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: '700', fontSize: '14px' }}>{outfit.name}</span>
                          {outfit.popular && (
                            <span style={{ fontSize: '9px', background: '#FF008A', color: '#fff', padding: '1px 5px', borderRadius: '4px', fontWeight: '800' }}>Popular</span>
                          )}
                        </div>
                        <span style={{ fontSize: '12px', color: '#687395' }}>
                          Stitching from ₹{outfit.baseStitching} • Req {outfit.reqMetres}m
                        </span>
                      </div>
                      {selectedOutfit.id === outfit.id && <Check size={18} color="#FF008A" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Nearby Tailors */}
            {step === 3 && (
              <div>
                <p style={{ fontSize: '13px', color: '#687395', marginBottom: '16px' }}>
                  Choose from background-verified local tailors matched to your outfit:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {NEARBY_TAILORS.map(t => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTailor(t)}
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        border: selectedTailor.id === t.id ? '2px solid #FF008A' : isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                        background: selectedTailor.id === t.id ? (isDark ? 'rgba(255,0,138,0.12)' : '#FFF0F7') : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}
                    >
                      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#E8EAF2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: '#FF008A' }}>
                        {t.name[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800' }}>{t.name}</h4>
                          <span style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                            <ShieldCheck size={12} style={{ marginRight: '2px' }} /> Verified
                          </span>
                        </div>
                        <p style={{ margin: '2px 0 4px', fontSize: '12px', color: '#687395' }}>{t.specialty}</p>
                        <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: '#687395' }}>
                          <span>⭐ <strong>{t.rating}</strong> ({t.reviews})</span>
                          <span>📍 {t.distance}</span>
                          <span>⏱ {t.turnaround}</span>
                        </div>
                      </div>
                      {selectedTailor.id === t.id && <Check size={20} color="#FF008A" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Measurements */}
            {step === 4 && (
              <div>
                <p style={{ fontSize: '13px', color: '#687395', marginBottom: '16px' }}>
                  How would you like to provide sizing measurements?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {[
                    { id: 'doorstep', title: 'Doorstep Master Tailor Trial', desc: 'A verified tailor visits your home with measurement tape and fabric swatches.', fee: '₹99 (Free above ₹1,499)', icon: <Truck size={20} /> },
                    { id: 'ai', title: 'StitchBee AI Smart Sizing', desc: 'Capture 2 front and side photos using camera for instant 3D body measurements.', fee: 'Free', icon: <Sparkles size={20} /> },
                    { id: 'manual', title: 'Enter Standard / Custom Sizing', desc: 'Provide chest, waist, hips, and length manually or pick standard sizes (S, M, L, XL).', fee: 'Free', icon: <Ruler size={20} /> }
                  ].map(m => (
                    <div
                      key={m.id}
                      onClick={() => setMeasurementType(m.id)}
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        border: measurementType === m.id ? '2px solid #FF008A' : isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                        background: measurementType === m.id ? (isDark ? 'rgba(255,0,138,0.12)' : '#FFF0F7') : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,0,138,0.1)', color: '#FF008A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {m.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800' }}>{m.title}</h4>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#FF008A' }}>{m.fee}</span>
                        </div>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#687395' }}>{m.desc}</p>
                      </div>
                      {measurementType === m.id && <Check size={18} color="#FF008A" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Review & Cost Breakdown */}
            {step === 5 && (
              <div>
                <div style={{ background: isDark ? '#101322' : '#F8FAFC', borderRadius: '16px', padding: '20px', marginBottom: '20px', border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2' }}>
                  <h4 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '800' }}>Order Summary</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Fabric: {fabric.name} ({metres}m)</span>
                      <strong>₹{fabricCost}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Stitching: {selectedOutfit.name} ({selectedTailor.name})</span>
                      <strong>₹{stitchingCost}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Measurement Service ({measurementType === 'doorstep' ? 'Doorstep Visit' : 'Digital'})</span>
                      <strong>{measurementFee > 0 ? `₹${measurementFee}` : 'Free'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Pan-India Delivery</span>
                      <strong style={{ color: '#10B981' }}>FREE</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Applicable GST (5%)</span>
                      <strong>₹{tax}</strong>
                    </div>
                    <div style={{ height: '1px', background: isDark ? '#34394D' : '#E8EAF2', margin: '4px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px' }}>
                      <strong>Total Payable Amount</strong>
                      <strong style={{ color: '#FF008A', fontSize: '20px' }}>₹{totalAmount}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', color: '#10B981', fontSize: '12px', alignItems: 'center' }}>
                  <Clock size={16} />
                  <span>Estimated Completion: <strong>4-5 Days</strong> from measurement approval. Free alterations included!</span>
                </div>
              </div>
            )}

            {/* STEP 6: Address & Payment */}
            {step === 6 && (
              <div>
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                    Delivery & Pickup Address:
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: '10px',
                      border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                      background: isDark ? '#101322' : '#FFFFFF', color: 'inherit',
                      fontSize: '13px', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
                    Payment Method:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {[
                      { id: 'upi', label: 'UPI / QR', icon: '📱' },
                      { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                      { id: 'cod', label: 'Cash on Delivery', icon: '💵' }
                    ].map(pm => (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        style={{
                          padding: '12px',
                          borderRadius: '12px',
                          border: paymentMethod === pm.id ? '2px solid #FF008A' : isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                          background: paymentMethod === pm.id ? (isDark ? 'rgba(255,0,138,0.12)' : '#FFF0F7') : 'transparent',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '20px', marginBottom: '4px' }}>{pm.icon}</div>
                        <span style={{ fontSize: '12px', fontWeight: '700' }}>{pm.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '14px 18px', borderRadius: '12px', background: isDark ? '#101322' : '#FFF0F7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Grand Total</span>
                  <span style={{ fontSize: '22px', fontWeight: '900', color: '#FF008A' }}>₹{totalAmount}</span>
                </div>
              </div>
            )}

            {/* Modal Bottom Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '24px' }}>
              {step > 1 ? (
                <button
                  onClick={() => setStep(s => s - 1)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                    background: 'transparent',
                    color: 'inherit',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : <div />}

              {step < 6 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#FF008A',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 15px rgba(255,0,138,0.3)'
                  }}
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleFinishOrder}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #FF008A, #7B2DFF)',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 25px rgba(255,0,138,0.35)'
                  }}
                >
                  <Check size={18} /> Place Fabric & Stitching Order
                </button>
              )}
            </div>
          </>
        ) : (
          /* Order Placed Success Confirmation */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: '#10B981', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(16,185,129,0.35)'
            }}>
              <Check size={36} strokeWidth={3} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 8px' }}>
              Order Successfully Booked! 🎉
            </h2>
            <p style={{ color: '#687395', fontSize: '14px', maxWidth: '420px', margin: '0 auto 24px', lineHeight: '1.5' }}>
              Your order for <strong>{metres}m {fabric.name}</strong> tailored into a <strong>{selectedOutfit.name}</strong> by <strong>{selectedTailor.name}</strong> has been confirmed.
            </p>

            <div style={{
              background: isDark ? '#101322' : '#F8FAFC',
              borderRadius: '16px',
              padding: '16px',
              maxWidth: '380px',
              margin: '0 auto 24px',
              textAlign: 'left',
              fontSize: '13px',
              border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#687395' }}>Order ID:</span>
                <strong>SB-STITCH-{(Date.now() % 100000)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#687395' }}>Assigned Tailor:</span>
                <strong>{selectedTailor.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#687395' }}>Measurement Mode:</span>
                <strong style={{ textTransform: 'capitalize' }}>{measurementType}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#687395' }}>Total Paid:</span>
                <strong style={{ color: '#FF008A' }}>₹{totalAmount}</strong>
              </div>
            </div>

            <button
              onClick={handleCloseAll}
              style={{
                padding: '12px 32px',
                borderRadius: '12px',
                background: '#FF008A',
                color: '#fff',
                border: 'none',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(255,0,138,0.3)'
              }}
            >
              Continue Exploring Fabrics
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
