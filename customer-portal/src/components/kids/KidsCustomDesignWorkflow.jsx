import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, Scissors, User, Upload, 
  MapPin, Star, Calendar, Clock, ShieldCheck, Heart, Info, DollarSign,
  Camera, Plus, Trash2, ShoppingCart, Truck, AlertCircle
} from 'lucide-react';
import { 
  KIDS_SHOP_FABRICS, 
  KIDS_SHOP_CATEGORIES, 
  KIDS_SIZE_CHART,
  saveKidsDraft
} from '../../utils/kidsShopStore';
import { addOrder } from '../../utils/bagsStore';
import NearbyProfessionalsMap from '../common/NearbyProfessionalsMap';

export default function KidsCustomDesignWorkflow({
  currentUser,
  onLoginRequired,
  theme = 'light',
  onBackToShop,
  initialCategory = 'frocks-dresses',
  initialFabric = null,
  showToast = () => {}
}) {
  const [currentStep, setCurrentStep] = useState(1); // 1 to 8

  // Step 1: Upload & Idea
  const [designTitle, setDesignTitle] = useState('');
  const [designDescription, setDesignDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [occasion, setOccasion] = useState('Birthday');
  const [ageGroup, setAgeGroup] = useState('4-5 Years');
  const [requiredDate, setRequiredDate] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  // Step 2: Tailor vs Designer
  const [assistanceType, setAssistanceType] = useState('tailor'); // 'tailor' | 'designer'
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentSlot, setAppointmentSlot] = useState('11:00 AM - 01:00 PM');

  // Step 3: Style & Fabric
  const [neckline, setNeckline] = useState('Round Neck with Bow');
  const [sleeves, setSleeves] = useState('Puff Sleeves');
  const [fitPreference, setFitPreference] = useState('Comfort Fit with Growth Seam');
  const [fabricSource, setFabricSource] = useState('stitchbee'); // 'stitchbee' | 'own'
  const [selectedFabric, setSelectedFabric] = useState(initialFabric || KIDS_SHOP_FABRICS[0]);
  const [ownFabricDesc, setOwnFabricDesc] = useState('');

  // Step 4: Measurements
  const [measurementMode, setMeasurementMode] = useState('standard'); // 'standard' | 'custom' | 'doorstep'
  const [selectedStandardSize, setSelectedStandardSize] = useState('4-5Y');
  const [customChest, setCustomChest] = useState('24');
  const [customWaist, setCustomWaist] = useState('22');
  const [customShoulder, setCustomShoulder] = useState('11');
  const [customLength, setCustomLength] = useState('28');
  const [doorstepDate, setDoorstepDate] = useState('');
  const [doorstepSlot, setDoorstepSlot] = useState('Morning (10 AM - 1 PM)');

  // Step 5: Personalization
  const [childName, setChildName] = useState('');
  const [monogramInitials, setMonogramInitials] = useState('');
  const [embroideryType, setEmbroideryType] = useState('Hand-stitched Floral Sprigs');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Step 7: Order & Payment
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // File Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedImages(prev => [...prev, uploadEvent.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Calculations
  const stitchingCharge = assistanceType === 'designer' ? 1800 : 1200;
  const fabricCost = fabricSource === 'stitchbee' ? (selectedFabric?.price || 500) * 2 : 0;
  const personalizationCost = (childName || monogramInitials) ? 350 : 0;
  const measurementFee = measurementMode === 'doorstep' ? 199 : 0;
  const subtotal = stitchingCharge + fabricCost + personalizationCost + measurementFee;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  // Place Order Handler
  const handleConfirmOrder = () => {
    if (!currentUser && onLoginRequired) {
      onLoginRequired();
      return;
    }

    const orderId = `KID-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      id: orderId,
      orderNumber: orderId,
      type: 'kids-custom-design',
      title: designTitle || `Custom ${selectedCategory.replace('-', ' ')}`,
      category: selectedCategory,
      totalAmount: total,
      status: 'Design Confirmed',
      items: [
        {
          name: designTitle || `Custom Kids Outfit (${selectedCategory})`,
          price: total,
          quantity: 1,
          size: measurementMode === 'standard' ? selectedStandardSize : 'Custom Measurements',
          color: selectedFabric?.name || 'Customer Choice',
          image: uploadedImages[0] || selectedFabric?.image || '/images/kidsShop/HERO.png'
        }
      ],
      createdAt: new Date().toISOString(),
      provider: selectedProvider?.name || 'Verified StitchBeez Atelier',
      deliveryEstimate: '5 - 7 Business Days',
      shippingAddress: currentUser?.address || 'Doorstep Delivery'
    };

    addOrder(newOrder);
    setConfirmedOrder(newOrder);
    setCurrentStep(8);
    showToast(`Order #${orderId} placed successfully!`);
  };

  const stepsList = [
    "Upload Idea",
    "Tailor/Designer",
    "Style & Fabric",
    "Measurements",
    "Personalize",
    "Review Quote",
    "Checkout",
    "Tracking"
  ];

  return (
    <div className={`kids-shop-wrapper ${theme === 'dark' ? 'dark' : ''}`} style={{ minHeight: '100vh', padding: '30px 6%' }}>
      {/* Top Breadcrumb & Step Indicator */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 30px auto' }}>
        <button 
          onClick={onBackToShop}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--kids-pink)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '18px',
            fontSize: '0.9rem'
          }}
        >
          <ArrowLeft size={16} /> Back to Kids Shop & Create
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span className="kids-eyebrow">CUSTOM KIDS ATELIER WORKFLOW</span>
            <h2 className="kids-title-serif" style={{ fontSize: '1.8rem', margin: 0 }}>
              Step {currentStep}: {stepsList[currentStep - 1]}
            </h2>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--kids-pink)', background: '#FFF0F5', padding: '4px 12px', borderRadius: '20px' }}>
            Estimated Total: ₹{total}
          </span>
        </div>

        {/* Progress Stepper Bar */}
        <div style={{ display: 'flex', gap: '4px', width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
          {stepsList.map((_, idx) => (
            <div 
              key={idx}
              style={{
                flex: 1,
                background: idx + 1 <= currentStep ? 'var(--kids-pink)' : 'transparent',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Container Card */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        background: theme === 'dark' ? '#1C2230' : '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid var(--kids-border)',
        padding: '36px',
        boxShadow: '0 12px 40px rgba(7, 27, 73, 0.06)'
      }}>

        {/* STEP 1: UPLOAD DESIGN OR IDEA */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--kids-navy)' }}>
                Share Your Child's Dream Outfit Idea
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--kids-subtext)' }}>
                Upload photos, reference sketches or describe the design you have in mind.
              </p>
            </div>

            {/* Drag & Drop Upload Area */}
            <div style={{
              border: '2px dashed rgba(255, 0, 138, 0.35)',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center',
              background: theme === 'dark' ? 'rgba(255, 0, 138, 0.05)' : '#FFF9FB',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  opacity: 0, cursor: 'pointer'
                }}
              />
              <Upload size={38} style={{ color: 'var(--kids-pink)', margin: '0 auto 10px auto' }} />
              <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700 }}>
                Click to browse or drop images here
              </h4>
              <p style={{ margin: 0, fontSize: '0.78rem', opacity: 0.75 }}>
                PNG, JPG, WEBP up to 10MB each (Supports multiple photos)
              </p>
            </div>

            {/* Uploaded Previews */}
            {uploadedImages.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {uploadedImages.map((img, idx) => (
                  <div key={idx} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--kids-border)' }}>
                    <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                      style={{
                        position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px',
                        borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Outfit Metadata */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Outfit Title / Concept</label>
                <input 
                  type="text"
                  placeholder="e.g. Princess Rose Gold Party Frock"
                  value={designTitle}
                  onChange={(e) => setDesignTitle(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                >
                  {KIDS_SHOP_CATEGORIES.filter(c => !c.isCustom).map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Occasion</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                >
                  <option value="Birthday">1st or Birthday Party</option>
                  <option value="Wedding">Family Wedding / Reception</option>
                  <option value="Festival">Festive & Traditional Celebration</option>
                  <option value="School">School Annual Day / Function</option>
                  <option value="Casual">Play & Casual Everyday</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Child's Age Group</label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                >
                  <option value="0-6 Months">Newborn (0 - 6 Months)</option>
                  <option value="6-24 Months">Infant (6 - 24 Months)</option>
                  <option value="2-4 Years">Toddler (2 - 4 Years)</option>
                  <option value="4-7 Years">Little Kids (4 - 7 Years)</option>
                  <option value="8-12 Years">Big Kids (8 - 12 Years)</option>
                  <option value="13-18 Years">Teens (13 - 18 Years)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Special Design Notes & Requests</label>
              <textarea 
                rows={3}
                placeholder="Explain colors, flair style, neckline preferences or any inspirations..."
                value={designDescription}
                onChange={(e) => setDesignDescription(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                  background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE DESIGN ASSISTANCE (TAILOR VS DESIGNER) */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--kids-navy)' }}>
                Choose Your Design Partner
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--kids-subtext)' }}>
                Work directly with a verified master tailor or collaborate 1-on-1 with a fashion designer.
              </p>
            </div>

            {/* Assistance Selector Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div 
                onClick={() => setAssistanceType('tailor')}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  border: `2px solid ${assistanceType === 'tailor' ? 'var(--kids-pink)' : 'var(--kids-border)'}`,
                  background: assistanceType === 'tailor' ? (theme === 'dark' ? 'rgba(255,0,138,0.1)' : '#FFF0F5') : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Scissors size={24} style={{ color: 'var(--kids-pink)' }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Stitch with Verified Tailor</h4>
                </div>
                <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--kids-subtext)', lineHeight: 1.5 }}>
                  Give your pattern or pick from templates. Skilled tailors execute your outfit with growth seams and doorstep fitting.
                </p>
                <span style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--kids-pink)' }}>
                  Stitching Fee: ₹1,200
                </span>
              </div>

              <div 
                onClick={() => setAssistanceType('designer')}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  border: `2px solid ${assistanceType === 'designer' ? 'var(--kids-pink)' : 'var(--kids-border)'}`,
                  background: assistanceType === 'designer' ? (theme === 'dark' ? 'rgba(255,0,138,0.1)' : '#FFF0F5') : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Sparkles size={24} style={{ color: 'var(--kids-pink)' }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Design with Fashion Designer</h4>
                </div>
                <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--kids-subtext)', lineHeight: 1.5 }}>
                  Get custom digital sketches, couture mood boards, and dedicated 1-on-1 consultation for a one-of-a-kind outfit.
                </p>
                <span style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--kids-pink)' }}>
                  Consultation & Stitching: ₹1,800
                </span>
              </div>
            </div>

            {/* Google Maps Discovery Component */}
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
                Select a Verified {assistanceType === 'tailor' ? 'Tailor' : 'Fashion Designer'} Near You
              </h4>
              <NearbyProfessionalsMap 
                roleType={assistanceType}
                onSelectProfessional={(prof) => {
                  setSelectedProvider(prof);
                  showToast(`Selected ${prof.name}`);
                }}
                selectedId={selectedProvider?.id}
                theme={theme}
              />
            </div>
          </div>
        )}

        {/* STEP 3: STYLE & FABRIC */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--kids-navy)' }}>
                Choose Style Cuts & Premium Fabric
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--kids-subtext)' }}>
                Customize the neckline, sleeves, and select from certified baby-safe fabrics.
              </p>
            </div>

            {/* Style Elements */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Neck Style</label>
                <select
                  value={neckline}
                  onChange={(e) => setNeckline(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                >
                  <option value="Round Neck with Bow">Round Neck with Back Bow</option>
                  <option value="Peter Pan Collar">Classic Peter Pan Collar</option>
                  <option value="Sweetheart Neck">Sweetheart Party Neck</option>
                  <option value="Mandarin Collar">Mandarin / Nehru Collar</option>
                  <option value="Square Neck">Square Neckline</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Sleeve Cut</label>
                <select
                  value={sleeves}
                  onChange={(e) => setSleeves(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                >
                  <option value="Puff Sleeves">Double Gathered Puff Sleeves</option>
                  <option value="Sleeveless">Sleeveless with Ruffle Armholes</option>
                  <option value="Full Length">Full Length with Button Cuffs</option>
                  <option value="Half Sleeves">Comfort Half Sleeves</option>
                  <option value="Cap Sleeves">Cap Flutter Sleeves</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Seam & Fit Allowance</label>
                <select
                  value={fitPreference}
                  onChange={(e) => setFitPreference(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                >
                  <option value="Comfort Fit with Growth Seam">Comfort Fit (Hidden 2-inch Growth Seam)</option>
                  <option value="Slim Tailored Fit">Slim Tailored Fit</option>
                  <option value="Relaxed Loose Play Fit">Relaxed Loose Play Fit</option>
                </select>
              </div>
            </div>

            {/* Fabric Source Switch */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '10px' }}>Fabric Source</label>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setFabricSource('stitchbee')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: `1.5px solid ${fabricSource === 'stitchbee' ? 'var(--kids-pink)' : 'var(--kids-border)'}`,
                    background: fabricSource === 'stitchbee' ? '#FFF0F5' : 'transparent',
                    color: fabricSource === 'stitchbee' ? 'var(--kids-pink)' : 'inherit',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Select from StitchBeez Fabrics
                </button>
                <button
                  type="button"
                  onClick={() => setFabricSource('own')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: `1.5px solid ${fabricSource === 'own' ? 'var(--kids-pink)' : 'var(--kids-border)'}`,
                    background: fabricSource === 'own' ? '#FFF0F5' : 'transparent',
                    color: fabricSource === 'own' ? 'var(--kids-pink)' : 'inherit',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  I will provide my own fabric (Doorstep Pickup)
                </button>
              </div>
            </div>

            {/* StitchBeez 10 Fabrics Selection */}
            {fabricSource === 'stitchbee' ? (
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>
                  Pick From 10 Premium Kid-Safe Fabrics
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '12px'
                }}>
                  {KIDS_SHOP_FABRICS.map(fab => (
                    <div 
                      key={fab.id}
                      onClick={() => setSelectedFabric(fab)}
                      style={{
                        borderRadius: '12px',
                        border: `2px solid ${selectedFabric?.id === fab.id ? 'var(--kids-pink)' : 'var(--kids-border)'}`,
                        padding: '10px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: selectedFabric?.id === fab.id ? (theme === 'dark' ? 'rgba(255,0,138,0.1)' : '#FFF0F5') : 'transparent',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <img src={fab.image} alt={fab.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', margin: '0 auto 6px auto' }} />
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--kids-navy)' }}>{fab.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--kids-pink)', fontWeight: 700 }}>₹{fab.price}/m</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                background: theme === 'dark' ? '#141822' : '#F8FAFC',
                padding: '20px',
                borderRadius: '14px',
                border: '1px solid var(--kids-border)'
              }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', fontWeight: 700 }}>Own Fabric Handover Details</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.8rem', color: 'var(--kids-subtext)' }}>
                  Our gig logistics partner will collect your fabric from your doorstep free of charge.
                </p>
                <textarea 
                  rows={2}
                  placeholder="Mention fabric type, approximate length in meters, and any specific washing requests..."
                  value={ownFabricDesc}
                  onChange={(e) => setOwnFabricDesc(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#1C2230' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 4: MEASUREMENTS */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--kids-navy)' }}>
                Sizing & Measurement Method
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--kids-subtext)' }}>
                Select from standard age sizing, input custom measurements, or schedule a doorstep visit.
              </p>
            </div>

            {/* Measurement Method Tabs */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { id: 'standard', label: '1. Standard Size Chart' },
                { id: 'custom', label: '2. Enter Measurements' },
                { id: 'doorstep', label: '3. Book Home Visit (₹199)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMeasurementMode(tab.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '12px',
                    border: `1.5px solid ${measurementMode === tab.id ? 'var(--kids-pink)' : 'var(--kids-border)'}`,
                    background: measurementMode === tab.id ? '#FFF0F5' : 'transparent',
                    color: measurementMode === tab.id ? 'var(--kids-pink)' : 'inherit',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Standard Size Chart Grid */}
            {measurementMode === 'standard' && (
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>Select Standard Child Size</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                  {KIDS_SIZE_CHART.map(sz => (
                    <button
                      key={sz.size}
                      onClick={() => setSelectedStandardSize(sz.size)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: `1.5px solid ${selectedStandardSize === sz.size ? 'var(--kids-pink)' : 'var(--kids-border)'}`,
                        background: selectedStandardSize === sz.size ? 'var(--kids-pink)' : 'transparent',
                        color: selectedStandardSize === sz.size ? '#FFFFFF' : 'inherit',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {sz.size} ({sz.age})
                    </button>
                  ))}
                </div>

                {/* Size Reference Table */}
                <div style={{ overflowX: 'auto', border: '1px solid var(--kids-border)', borderRadius: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                    <thead style={{ background: theme === 'dark' ? '#141822' : '#FFF0F5' }}>
                      <tr>
                        <th style={{ padding: '10px' }}>Size</th>
                        <th style={{ padding: '10px' }}>Age</th>
                        <th style={{ padding: '10px' }}>Chest (in)</th>
                        <th style={{ padding: '10px' }}>Waist (in)</th>
                        <th style={{ padding: '10px' }}>Height</th>
                      </tr>
                    </thead>
                    <tbody>
                      {KIDS_SIZE_CHART.slice(0, 6).map((r, i) => (
                        <tr key={i} style={{ borderTop: '1px solid var(--kids-border)' }}>
                          <td style={{ padding: '10px', fontWeight: 700 }}>{r.size}</td>
                          <td style={{ padding: '10px' }}>{r.age}</td>
                          <td style={{ padding: '10px' }}>{r.chest}</td>
                          <td style={{ padding: '10px' }}>{r.waist}</td>
                          <td style={{ padding: '10px' }}>{r.height}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Custom Measurements Inputs */}
            {measurementMode === 'custom' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Chest (inches)</label>
                  <input 
                    type="number" 
                    value={customChest} 
                    onChange={(e) => setCustomChest(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                      background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Waist (inches)</label>
                  <input 
                    type="number" 
                    value={customWaist} 
                    onChange={(e) => setCustomWaist(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                      background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Shoulder (inches)</label>
                  <input 
                    type="number" 
                    value={customShoulder} 
                    onChange={(e) => setCustomShoulder(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                      background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Garment Length (inches)</label>
                  <input 
                    type="number" 
                    value={customLength} 
                    onChange={(e) => setCustomLength(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                      background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Doorstep Home Measurement Visit */}
            {measurementMode === 'doorstep' && (
              <div style={{
                background: theme === 'dark' ? '#141822' : '#FFF9FB',
                padding: '24px',
                borderRadius: '16px',
                border: '1.5px solid rgba(255, 0, 138, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <User size={22} style={{ color: 'var(--kids-pink)' }} />
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Doorstep Measurement Visit by Certified Fit Specialist</h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--kids-subtext)' }}>
                  A vetted, background-verified student helper will arrive at your home with sanitized soft measuring tapes to measure your child comfortably.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Visit Date</label>
                    <input 
                      type="date"
                      value={doorstepDate}
                      onChange={(e) => setDoorstepDate(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                        background: theme === 'dark' ? '#1C2230' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Time Slot</label>
                    <select
                      value={doorstepSlot}
                      onChange={(e) => setDoorstepSlot(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                        background: theme === 'dark' ? '#1C2230' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                      }}
                    >
                      <option value="Morning (10 AM - 1 PM)">Morning (10:00 AM - 01:00 PM)</option>
                      <option value="Afternoon (2 PM - 5 PM)">Afternoon (02:00 PM - 05:00 PM)</option>
                      <option value="Evening (5 PM - 8 PM)">Evening (05:00 PM - 08:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: ADD PERSONALIZATION */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--kids-navy)' }}>
                Add Custom Personalization (Optional)
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--kids-subtext)' }}>
                Add your child's embroidered name, cute initials, or custom patch motifs.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Child's Name on Inner Tag / Hem (+₹350)</label>
                <input 
                  type="text"
                  placeholder="e.g. Ananya / Aarav"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Monogram Initials</label>
                <input 
                  type="text"
                  maxLength={3}
                  placeholder="e.g. AM"
                  value={monogramInitials}
                  onChange={(e) => setMonogramInitials(e.target.value.toUpperCase())}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Embroidery Pattern</label>
                <select
                  value={embroideryType}
                  onChange={(e) => setEmbroideryType(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                    background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                  }}
                >
                  <option value="Hand-stitched Floral Sprigs">Hand-stitched Floral Sprigs</option>
                  <option value="Tiny Gold Stars">Tiny Gold Stars & Moon</option>
                  <option value="Cute Bear / Animal Patch">Cute Bear / Animal Patch Motif</option>
                  <option value="Classic Cursive Lettering">Classic Cursive Lettering</option>
                  <option value="None">None (Plain / Sleek)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>Any Extra Tailoring Instructions</label>
              <textarea 
                rows={3}
                placeholder="e.g. Please use pure cotton thread only, child has sensitive skin..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--kids-border)',
                  background: theme === 'dark' ? '#141822' : '#FFFFFF', color: 'inherit', boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        )}

        {/* STEP 6: PREVIEW & TRANSPARENT QUOTE */}
        {currentStep === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--kids-navy)' }}>
                Review Custom Outfit Specifications & Quote
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--kids-subtext)' }}>
                Transparent pricing breakdown with no surprises.
              </p>
            </div>

            {/* Summary Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{
                background: theme === 'dark' ? '#141822' : '#FFF9FB',
                padding: '20px',
                borderRadius: '14px',
                border: '1px solid var(--kids-border)'
              }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--kids-pink)' }}>
                  Outfit Specifications
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                  <div><strong>Category:</strong> {selectedCategory.replace('-', ' ')}</div>
                  <div><strong>Occasion:</strong> {occasion}</div>
                  <div><strong>Partner:</strong> {assistanceType === 'tailor' ? 'Verified Tailor' : 'Fashion Designer'} ({selectedProvider?.name || 'Assigned Specialist'})</div>
                  <div><strong>Fabric:</strong> {fabricSource === 'stitchbee' ? selectedFabric?.name : 'Customer Provided Fabric'}</div>
                  <div><strong>Sizing:</strong> {measurementMode === 'standard' ? `Standard (${selectedStandardSize})` : (measurementMode === 'custom' ? 'Custom Inputs' : 'Home Visit')}</div>
                  <div><strong>Neck & Sleeves:</strong> {neckline}, {sleeves}</div>
                  {childName && <div><strong>Personalization:</strong> "{childName}" ({embroideryType})</div>}
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{
                background: theme === 'dark' ? '#141822' : '#F8FAFC',
                padding: '20px',
                borderRadius: '14px',
                border: '1px solid var(--kids-border)'
              }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--kids-navy)' }}>
                  Price Breakdown
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Stitching & Crafting:</span>
                    <span>₹{stitchingCharge}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Fabric Cost ({fabricSource === 'stitchbee' ? '2 meters' : 'Provided'}):</span>
                    <span>₹{fabricCost}</span>
                  </div>
                  {personalizationCost > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Monogram & Name Embroidery:</span>
                      <span>₹{personalizationCost}</span>
                    </div>
                  )}
                  {measurementFee > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Doorstep Measurement Visit:</span>
                      <span>₹{measurementFee}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                    <span>Doorstep Pickup & Return:</span>
                    <span>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.75 }}>
                    <span>Estimated GST (5%):</span>
                    <span>₹{tax}</span>
                  </div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem',
                    borderTop: '1.5px solid var(--kids-border)', paddingTop: '10px', marginTop: '6px',
                    color: 'var(--kids-pink)'
                  }}>
                    <span>Grand Total:</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: CHECKOUT & PAYMENT */}
        {currentStep === 7 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--kids-navy)' }}>
                Confirm Booking & Payment
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--kids-subtext)' }}>
                Secured payment with StitchBeez 100% Fit Guarantee.
              </p>
            </div>

            {/* Address Review */}
            <div style={{
              background: theme === 'dark' ? '#141822' : '#F8FAFC',
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid var(--kids-border)'
            }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 700 }}>Delivery & Pickup Address</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--kids-subtext)' }}>
                {currentUser?.address || '123 Green Glen Road, HSR Layout, Bengaluru, Karnataka - 560102'}
              </p>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '12px' }}>Choose Payment Option</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {[
                  { id: 'upi', label: 'UPI / Google Pay / PhonePe', desc: 'Instant verification' },
                  { id: 'card', label: 'Credit / Debit Card', desc: 'All major banks' },
                  { id: 'cod', label: 'Pay on Delivery / Trial', desc: 'Pay after fit satisfaction' }
                ].map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => setPaymentMethod(opt.id)}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      border: `2px solid ${paymentMethod === opt.id ? 'var(--kids-pink)' : 'var(--kids-border)'}`,
                      background: paymentMethod === opt.id ? '#FFF0F5' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--kids-navy)' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--kids-subtext)' }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: '#FFF0F5',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 0, 138, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <ShieldCheck size={26} style={{ color: 'var(--kids-pink)' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--kids-navy)' }}>
                <strong>StitchBeez Fit & Comfort Guarantee:</strong> If the outfit does not fit like a glove, our tailor will perform unlimited free alterations or refund your stitching charges.
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: ORDER CONFIRMED & TRACKING */}
        {currentStep === 8 && confirmedOrder && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Check size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--kids-navy)' }}>
              Custom Outfit Order Confirmed!
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--kids-subtext)', margin: '0 0 20px 0' }}>
              Order ID: <strong style={{ color: 'var(--kids-pink)' }}>#{confirmedOrder.id}</strong>
            </p>

            {/* Stepper tracking */}
            <div style={{
              maxWidth: '650px',
              margin: '0 auto 30px auto',
              background: theme === 'dark' ? '#141822' : '#F8FAFC',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid var(--kids-border)',
              textAlign: 'left'
            }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '0.9rem', fontWeight: 700 }}>Live Production Tracker</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#16a34a' }}>
                  <Check size={16} /> <strong>Design Confirmed:</strong> Specifications & fabrics recorded
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--kids-pink)' }}>
                  <Clock size={16} /> <strong>Fabric & Measurements Verification:</strong> Tailor scheduled
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.5 }}>
                  <Scissors size={16} /> <strong>Master Crafting:</strong> Precision stitching & growth allowance
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.5 }}>
                  <Truck size={16} /> <strong>Quality Inspection & Doorstep Delivery:</strong> Ready in 5-7 days
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={onBackToShop}
                className="kids-btn-pink"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        {currentStep < 8 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--kids-border)',
            paddingTop: '24px',
            marginTop: '30px'
          }}>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="kids-btn-outline"
              >
                <ArrowLeft size={16} /> Previous Step
              </button>
            ) : (
              <button
                type="button"
                onClick={onBackToShop}
                className="kids-btn-outline"
              >
                Cancel
              </button>
            )}

            {currentStep < 7 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1 && !designTitle) {
                    setDesignTitle(`Custom ${selectedCategory.replace('-', ' ')}`);
                  }
                  setCurrentStep(prev => prev + 1);
                  window.scrollTo({ top: 100, behavior: 'smooth' });
                }}
                className="kids-btn-pink"
              >
                Proceed to Step {currentStep + 1} <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="kids-btn-pink"
                style={{ padding: '14px 36px', fontSize: '1rem' }}
              >
                Confirm Order & Pay ₹{total} →
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
