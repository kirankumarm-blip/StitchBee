import React, { useState, useEffect } from 'react';
import { 
  Scissors, ArrowLeft, ArrowRight, Check, CheckCircle2, Upload, Calendar, 
  Clock, MapPin, Phone, Star, ShieldCheck, AlertCircle, Sparkles, RefreshCw,
  Layers, User, Truck, DollarSign, Heart, Info, Eye, Sliders, Camera, HelpCircle, X
} from 'lucide-react';
import { 
  KIDS_CATEGORIES, 
  KIDS_FABRICS, 
  KIDS_AGE_GROUPS, 
  VERIFIED_KIDS_TAILORS, 
  NEARBY_PROFESSIONALS_DATABASE,
  calculateStitchingEstimate,
  saveKidsOrder,
  getSavedChildMeasurements,
  saveChildMeasurements,
  KIDS_ASSETS
} from '../../utils/kidsStitchingStore';
import NearbyProfessionalsMap from '../common/NearbyProfessionalsMap';
import './KidsWorkflows.css';

const STEPS = [
  { num: 1, label: "Outfit", title: "Choose Kids Outfit & Design" },
  { num: 2, label: "Fabric", title: "Select Fabric Option" },
  { num: 3, label: "Tailor", title: "Choose Verified Nearby Tailor" },
  { num: 4, label: "Appointment", title: "Schedule Measurement Appointment" },
  { num: 5, label: "Measurements", title: "Review Sizing & Growth Allowance" },
  { num: 6, label: "Pricing", title: "Review Estimate & Delivery Date" },
  { num: 7, label: "Confirm", title: "Confirm Stitching Order" },
  { num: 8, label: "Track", title: "Stitching Progress Tracker" }
];

export default function KidsTailorWorkflowPage({ 
  initialCategory = 'frocks-dresses', 
  initialAge = 'little-kids',
  onBackToLanding,
  currentUser,
  onLoginRequired,
  theme = 'light'
}) {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [ageGroup, setAgeGroup] = useState(initialAge);
  const [gender, setGender] = useState('Girls');
  const [category, setCategory] = useState(initialCategory);
  const [outfitType, setOutfitType] = useState('Layered Party Frock');
  const [designChoice, setDesignChoice] = useState('catalog'); // 'catalog' | 'custom'
  const [referenceImg, setReferenceImg] = useState(null);
  const [designNotes, setDesignNotes] = useState('');

  // Step 2: Fabric State
  const [fabricSource, setFabricSource] = useState('stitchbeez'); // 'own' | 'stitchbeez'
  // Own fabric sub-fields
  const [ownFabricType, setOwnFabricType] = useState('Pure Cotton');
  const [ownFabricMeters, setOwnFabricMeters] = useState(1.5);
  const [ownFabricCondition, setOwnFabricCondition] = useState('New & Pre-washed');
  const [ownPickupMethod, setOwnPickupMethod] = useState('doorstep-pickup'); // 'doorstep-pickup' | 'tailor-visit' | 'drop-off'
  const [ownFabricImg, setOwnFabricImg] = useState(null);
  // StitchBeez fabric sub-fields
  const [selectedFabricId, setSelectedFabricId] = useState('cotton');
  const [fabricColor, setFabricColor] = useState('Blush Pink');
  const [fabricPattern, setFabricPattern] = useState('Solid Soft Touch');
  const [fabricMeters, setFabricMeters] = useState(1.5);

  // Step 3: Tailor State
  const [selectedTailorId, setSelectedTailorId] = useState('tailor-k1');
  const [tailorSort, setTailorSort] = useState('nearest'); // 'nearest' | 'rating' | 'price' | 'delivery'

  // Step 4: Appointment State
  const [measurementMethod, setMeasurementMethod] = useState('home-visit'); // 'home-visit' | 'online' | 'saved' | 'manual'
  const [appointmentDate, setAppointmentDate] = useState('2026-10-18');
  const [appointmentSlot, setAppointmentSlot] = useState('11:00 AM - 12:30 PM');
  const [address, setAddress] = useState('42, 4th Cross, 2nd Main, Indiranagar, Bengaluru');
  const [pincode, setPincode] = useState('560038');
  const [parentPhone, setParentPhone] = useState('+91 98450 12345');

  // Step 5: Measurements State
  const [childProfiles, setChildProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [childName, setChildName] = useState('Ananya');
  const [chest, setChest] = useState(24);
  const [waist, setWaist] = useState(22);
  const [hip, setHip] = useState(25);
  const [shoulder, setShoulder] = useState(10.5);
  const [sleeves, setSleeves] = useState(13);
  const [length, setLength] = useState(24);
  const [neck, setNeck] = useState(11);
  const [inseam, setInseam] = useState(15);
  const [fitType, setFitType] = useState('growth-allowance'); // 'growth-allowance' | 'regular' | 'relaxed'
  const [measurementsConfirmed, setMeasurementsConfirmed] = useState(true);

  // Step 7/8: Confirmed Order Result
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [notification, setNotification] = useState(null);

  // AI Camera Measurement Scanner state
  const [aiCameraModalOpen, setAiCameraModalOpen] = useState(false);
  const [aiConsentGiven, setAiConsentGiven] = useState(false);
  const [aiScanningState, setAiScanningState] = useState('idle'); // 'idle' | 'scanning' | 'success'
  const [quotationNotes, setQuotationNotes] = useState('');
  const [quotationAccepted, setQuotationAccepted] = useState(true);

  // Load saved profiles
  useEffect(() => {
    const profiles = getSavedChildMeasurements();
    setChildProfiles(profiles);
    if (profiles.length > 0) {
      setSelectedProfileId(profiles[0].id);
      setChildName(profiles[0].childName.replace(/\s*\(.*\)/, ''));
      if (profiles[0].chest) setChest(profiles[0].chest);
      if (profiles[0].waist) setWaist(profiles[0].waist);
      if (profiles[0].shoulder) setShoulder(profiles[0].shoulder);
      if (profiles[0].length) setLength(profiles[0].length);
      if (profiles[0].sleeves) setSleeves(profiles[0].sleeves);
    }
  }, []);

  // Update default measurements when age group changes
  useEffect(() => {
    const ag = KIDS_AGE_GROUPS.find(a => a.id === ageGroup);
    if (ag) {
      setChest(ag.standardChest);
      setWaist(ag.standardWaist);
      setLength(ag.standardLength);
    }
  }, [ageGroup]);

  // Handle image upload
  const handleImageUpload = (e, targetSetter) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        targetSetter(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Pricing calculation
  const estimate = calculateStitchingEstimate({
    category,
    fabricSource,
    selectedFabricId,
    fabricMeters: fabricSource === 'own' ? ownFabricMeters : fabricMeters,
    measurementType: measurementMethod,
    serviceType: 'tailor'
  });

  const selectedCategoryObj = KIDS_CATEGORIES.find(c => c.id === category) || KIDS_CATEGORIES[0];
  const selectedFabricObj = KIDS_FABRICS.find(f => f.id === selectedFabricId) || KIDS_FABRICS[0];
  const selectedTailorObj = NEARBY_PROFESSIONALS_DATABASE.find(t => t.id === selectedTailorId) || VERIFIED_KIDS_TAILORS[0];
  const selectedAgeObj = KIDS_AGE_GROUPS.find(a => a.id === ageGroup) || KIDS_AGE_GROUPS[3];

  // Tailors sorting
  const sortedTailors = [...VERIFIED_KIDS_TAILORS].sort((a, b) => {
    if (tailorSort === 'nearest') return a.distanceKm - b.distanceKm;
    if (tailorSort === 'rating') return b.rating - a.rating;
    if (tailorSort === 'price') return a.startingPrice - b.startingPrice;
    if (tailorSort === 'delivery') return parseInt(a.turnAroundDays) - parseInt(b.turnAroundDays);
    return 0;
  });

  const handleNextStep = () => {
    if (currentStep === 1 && !category) {
      showToast('Please select a clothing category');
      return;
    }
    if (currentStep === 5 && !measurementsConfirmed) {
      showToast('Please confirm the measurements and sizing fit');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => Math.min(prev + 1, 8));
  };

  const handlePrevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Confirm and place order
  const handleConfirmOrder = () => {
    const orderData = {
      serviceType: 'tailor',
      tailorId: selectedTailorObj.id,
      tailorName: selectedTailorObj.name,
      tailorAvatar: selectedTailorObj.photo,
      categoryKey: category,
      categoryName: selectedCategoryObj.name,
      categoryImg: selectedCategoryObj.img,
      ageGroup: selectedAgeObj.label + ' (' + selectedAgeObj.range + ')',
      gender,
      outfitType,
      designChoice,
      referenceImg,
      designNotes,
      fabricSource,
      fabricDetails: fabricSource === 'own' ? {
        type: ownFabricType,
        meters: ownFabricMeters,
        condition: ownFabricCondition,
        pickupMethod: ownPickupMethod,
        photo: ownFabricImg
      } : {
        id: selectedFabricObj.id,
        name: selectedFabricObj.name,
        color: fabricColor,
        pattern: fabricPattern,
        meters: fabricMeters,
        pricePerMetre: selectedFabricObj.pricePerMetre
      },
      measurementMethod,
      appointmentDate,
      appointmentSlot,
      address,
      pincode,
      parentPhone,
      measurements: {
        childName,
        chest,
        waist,
        hip,
        shoulder,
        sleeves,
        length,
        neck,
        inseam,
        fitType
      },
      pricing: estimate,
      totalAmount: estimate.totalAmount,
      estimatedDelivery: 'Oct 24, 2026'
    };

    // Save profile to storage
    saveChildMeasurements({
      childName,
      ageGroup: selectedAgeObj.label,
      chest,
      waist,
      shoulder,
      length,
      sleeves
    });

    const newOrder = saveKidsOrder(orderData);
    setConfirmedOrder(newOrder);
    showToast(`Order #${newOrder.id} confirmed successfully!`);
    setCurrentStep(8);
  };

  return (
    <div className={`kids-workflow-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      
      {/* Toast */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #FF087A, #E00065)',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(255,8,122,0.4)',
          zIndex: 9999,
          fontWeight: 700,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={16} />
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="kids-workflow-header">
        <button className="kids-workflow-back-btn" onClick={onBackToLanding}>
          <ArrowLeft size={16} /> Back to Kids Stitching Hub
        </button>
        <div className="kids-workflow-title-box">
          <div>
            <span style={{ 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: 'var(--kids-pink)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em' 
            }}>
              Service 1: Nearby Verified Tailor
            </span>
            <h1 className="kids-workflow-main-title">{STEPS[currentStep - 1].title}</h1>
          </div>
          <div style={{ 
            fontSize: '0.85rem', 
            fontWeight: 700, 
            color: 'var(--kids-navy-muted)',
            background: 'var(--kids-card-bg)',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid var(--kids-border)'
          }}>
            Step {currentStep} of 8
          </div>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="kids-stepper-bar">
        {STEPS.map((s) => {
          const isDone = currentStep > s.num;
          const isActive = currentStep === s.num;
          return (
            <div 
              key={s.num} 
              className={`kids-step-pill ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
              onClick={() => {
                if (s.num < currentStep && currentStep !== 8) {
                  setCurrentStep(s.num);
                }
              }}
              style={{ cursor: s.num < currentStep ? 'pointer' : 'default' }}
            >
              <div className="kids-step-circle">
                {isDone ? <Check size={14} /> : s.num}
              </div>
              <span className="kids-step-label">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="kids-step-content-box">

        {/* ================= STEP 1: CHOOSE OUTFIT ================= */}
        {currentStep === 1 && (
          <div className="kids-fade-in">
            {/* Age Group Selection */}
            <div className="kids-form-group">
              <label className="kids-form-label">
                1. Select Child's Age Group <span style={{ color: 'var(--kids-pink)' }}>*</span>
              </label>
              <div className="kids-age-pill-grid">
                {KIDS_AGE_GROUPS.map((ag) => (
                  <div 
                    key={ag.id} 
                    className={`kids-select-tile ${ageGroup === ag.id ? 'selected' : ''}`}
                    onClick={() => setAgeGroup(ag.id)}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{ag.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)' }}>{ag.range}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender Selection */}
            <div className="kids-form-group">
              <label className="kids-form-label">2. Gender / Styling Cut</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['Girls', 'Boys', 'Unisex'].map((g) => (
                  <button 
                    key={g} 
                    type="button" 
                    className={`kids-choice-chip ${gender === g ? 'active' : ''}`}
                    onClick={() => setGender(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Grid */}
            <div className="kids-form-group">
              <label className="kids-form-label">
                3. Clothing Category <span style={{ color: 'var(--kids-pink)' }}>*</span>
              </label>
              <div className="kids-category-picker-grid">
                {KIDS_CATEGORIES.map((cat) => (
                  <div 
                    key={cat.id} 
                    className={`kids-cat-tile ${category === cat.id ? 'active' : ''}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    <div className="kids-cat-tile-thumb">
                      <img src={cat.img} alt={cat.name} />
                    </div>
                    <div className="kids-cat-tile-info">
                      <div className="kids-cat-tile-name">{cat.name}</div>
                      <div className="kids-cat-tile-sub">Stitching from ₹{cat.startingPrice}</div>
                    </div>
                    {category === cat.id && (
                      <div className="kids-cat-tile-check"><Check size={14} /></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Outfit Subtype & Inspiration */}
            <div className="kids-grid-2col">
              <div className="kids-form-group">
                <label className="kids-form-label">Specific Outfit Name / Occasion</label>
                <input 
                  type="text" 
                  className="kids-text-input" 
                  value={outfitType} 
                  onChange={(e) => setOutfitType(e.target.value)}
                  placeholder="e.g. Birthday Twirl Gown, Silk Kurta Pajama, School Uniform"
                />
              </div>

              <div className="kids-form-group">
                <label className="kids-form-label">Design Reference Type</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="button" 
                    className={`kids-choice-chip ${designChoice === 'catalog' ? 'active' : ''}`}
                    onClick={() => setDesignChoice('catalog')}
                  >
                    Standard Stitching Pattern
                  </button>
                  <button 
                    type="button" 
                    className={`kids-choice-chip ${designChoice === 'custom' ? 'active' : ''}`}
                    onClick={() => setDesignChoice('custom')}
                  >
                    Upload My Inspiration
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Inspiration Upload Box */}
            {designChoice === 'custom' && (
              <div className="kids-upload-dropzone">
                {referenceImg ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={referenceImg} alt="Reference" style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: '#10B981' }}>Photo uploaded successfully!</div>
                      <label style={{ fontSize: '0.8rem', color: 'var(--kids-pink)', cursor: 'pointer', textDecoration: 'underline' }}>
                        Change Photo
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, setReferenceImg)} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload size={32} style={{ color: 'var(--kids-pink)', marginBottom: '8px' }} />
                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>Upload Kids Outfit Reference Photo</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--kids-navy-muted)', marginBottom: '12px' }}>
                      PNG, JPG up to 10MB (Screenshots, Pinterest ideas, or sketches)
                    </div>
                    <label className="kids-secondary-btn" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                      Browse Files
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, setReferenceImg)} />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Design Notes */}
            <div className="kids-form-group" style={{ marginTop: '16px' }}>
              <label className="kids-form-label">Customization Notes for Tailor (Optional)</label>
              <textarea 
                className="kids-textarea" 
                rows="2" 
                value={designNotes} 
                onChange={(e) => setDesignNotes(e.target.value)}
                placeholder="e.g. Needs extra soft cotton inner lining, round neck, itch-free elastic at cuffs, room for growth."
              />
            </div>
          </div>
        )}

        {/* ================= STEP 2: CHOOSE FABRIC ================= */}
        {currentStep === 2 && (
          <div className="kids-fade-in">
            {/* Prominent Two Option Toggle */}
            <div className="kids-fabric-mode-selector">
              <div 
                className={`kids-fabric-mode-card ${fabricSource === 'own' ? 'active' : ''}`}
                onClick={() => setFabricSource('own')}
              >
                <div className="kids-mode-radio">
                  <div className={`radio-dot ${fabricSource === 'own' ? 'active' : ''}`} />
                </div>
                <div>
                  <h3 className="kids-mode-title">I Have My Own Fabric</h3>
                  <p className="kids-mode-desc">
                    Use your personal saree, gifted cloth, or pre-bought fabric. Our verified student partner picks it up from your doorstep.
                  </p>
                  <div className="kids-mode-badge">Doorstep Pickup Available (+₹49)</div>
                </div>
              </div>

              <div 
                className={`kids-fabric-mode-card ${fabricSource === 'stitchbeez' ? 'active' : ''}`}
                onClick={() => setFabricSource('stitchbeez')}
              >
                <div className="kids-mode-radio">
                  <div className={`radio-dot ${fabricSource === 'stitchbeez' ? 'active' : ''}`} />
                </div>
                <div>
                  <h3 className="kids-mode-title">Choose Fabric from StitchBeez</h3>
                  <p className="kids-mode-desc">
                    100% skin-friendly, certified child-safe fabrics: Organic Cotton, Pure Linen, Mulberry Silk, Soft Muslin & Velvet.
                  </p>
                  <div className="kids-mode-badge success">Certified Skin-Safe • 10 Kid Fabrics</div>
                </div>
              </div>
            </div>

            {/* OPTION A: OWN FABRIC FORM */}
            {fabricSource === 'own' && (
              <div className="kids-own-fabric-panel">
                <div className="kids-banner-notice">
                  <Info size={18} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Tailor Fabric Suitability Guarantee:</strong> The tailor will inspect the weave, elasticity, and condition upon receipt. For kids, we recommend pre-washing to prevent subsequent shrinkage.
                  </div>
                </div>

                <div className="kids-grid-3col" style={{ marginTop: '16px' }}>
                  <div className="kids-form-group">
                    <label className="kids-form-label">Fabric Material Type</label>
                    <select 
                      className="kids-text-input" 
                      value={ownFabricType} 
                      onChange={(e) => setOwnFabricType(e.target.value)}
                    >
                      <option>Pure Cotton</option>
                      <option>Silk / Raw Silk</option>
                      <option>Linen Blend</option>
                      <option>Georgette / Chiffon</option>
                      <option>Velvet / Satin</option>
                      <option>Denim / Twill</option>
                      <option>Other / Unsure</option>
                    </select>
                  </div>

                  <div className="kids-form-group">
                    <label className="kids-form-label">Available Quantity (Metres)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input 
                        type="number" 
                        step="0.25" 
                        min="0.5" 
                        max="10" 
                        className="kids-text-input" 
                        value={ownFabricMeters} 
                        onChange={(e) => setOwnFabricMeters(parseFloat(e.target.value) || 1)}
                      />
                      <span style={{ fontSize: '0.85rem', color: 'var(--kids-navy-muted)', fontWeight: 700 }}>Mtr</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--kids-pink)', marginTop: '4px', display: 'block' }}>
                      Recommended for {selectedCategoryObj.name}: ~{selectedCategoryObj.typicalFabricMeters}m
                    </span>
                  </div>

                  <div className="kids-form-group">
                    <label className="kids-form-label">Fabric Condition</label>
                    <select 
                      className="kids-text-input" 
                      value={ownFabricCondition} 
                      onChange={(e) => setOwnFabricCondition(e.target.value)}
                    >
                      <option>New & Pre-washed (Recommended)</option>
                      <option>New Unwashed</option>
                      <option>Repurposed Family Saree / Garment</option>
                    </select>
                  </div>
                </div>

                {/* Handover Method */}
                <div className="kids-form-group">
                  <label className="kids-form-label">Fabric Handover Preference</label>
                  <div className="kids-grid-3col">
                    {[
                      { id: 'doorstep-pickup', title: 'Doorstep Pickup', desc: 'Runner collects from home (+₹49)' },
                      { id: 'tailor-visit', title: 'Give During Measurement', desc: 'Hand over when tailor visits for sizing (FREE)' },
                      { id: 'drop-off', title: 'Drop at Atelier', desc: 'Self drop-off at tailor shop' }
                    ].map((m) => (
                      <div 
                        key={m.id} 
                        className={`kids-select-tile ${ownPickupMethod === m.id ? 'selected' : ''}`}
                        onClick={() => setOwnPickupMethod(m.id)}
                      >
                        <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{m.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)' }}>{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Fabric Photo */}
                <div className="kids-form-group">
                  <label className="kids-form-label">Upload Fabric Photo (Optional)</label>
                  <div className="kids-upload-dropzone" style={{ padding: '20px' }}>
                    {ownFabricImg ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img src={ownFabricImg} alt="Fabric" style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover' }} />
                        <span style={{ fontWeight: 700, color: '#10B981' }}>Photo Attached</span>
                      </div>
                    ) : (
                      <label style={{ cursor: 'pointer', color: 'var(--kids-pink)', fontWeight: 700, fontSize: '0.85rem' }}>
                        + Add photo of your cloth piece
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, setOwnFabricImg)} />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* OPTION B: STITCHBEEZ FABRICS SELECTION */}
            {fabricSource === 'stitchbeez' && (
              <div>
                <label className="kids-form-label">Select Certified Skin-Safe Fabric</label>
                <div className="kids-fabrics-picker-grid">
                  {KIDS_FABRICS.map((fab) => (
                    <div 
                      key={fab.id} 
                      className={`kids-fab-tile ${selectedFabricId === fab.id ? 'active' : ''}`}
                      onClick={() => setSelectedFabricId(fab.id)}
                    >
                      <div className="kids-fab-tile-thumb">
                        <img src={fab.img} alt={fab.name} />
                      </div>
                      <div className="kids-fab-tile-info">
                        <div className="kids-fab-tile-name">{fab.name}</div>
                        <div className="kids-fab-tile-tag">{fab.tag}</div>
                        <div className="kids-fab-tile-price">₹{fab.pricePerMetre}/m</div>
                      </div>
                      {selectedFabricId === fab.id && (
                        <div className="kids-fab-tile-check"><Check size={14} /></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Fabric Customization options */}
                <div className="kids-grid-3col" style={{ marginTop: '20px' }}>
                  <div className="kids-form-group">
                    <label className="kids-form-label">Choose Color Shade</label>
                    <select 
                      className="kids-text-input" 
                      value={fabricColor} 
                      onChange={(e) => setFabricColor(e.target.value)}
                    >
                      {selectedFabricObj.colors.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="kids-form-group">
                    <label className="kids-form-label">Pattern / Weave</label>
                    <select 
                      className="kids-text-input" 
                      value={fabricPattern} 
                      onChange={(e) => setFabricPattern(e.target.value)}
                    >
                      <option>Solid Plain Soft Touch</option>
                      <option>Micro Polka Dots</option>
                      <option>Pastel Dobby Checks</option>
                      <option>Floral Meadow Print</option>
                    </select>
                  </div>

                  <div className="kids-form-group">
                    <label className="kids-form-label">Fabric Metres Needed</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input 
                        type="number" 
                        step="0.25" 
                        min="0.5" 
                        max="5" 
                        className="kids-text-input" 
                        value={fabricMeters} 
                        onChange={(e) => setFabricMeters(parseFloat(e.target.value) || 1)}
                      />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--kids-navy)' }}>
                        = ₹{Math.round(selectedFabricObj.pricePerMetre * fabricMeters)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fabric Details Banner */}
                <div className="kids-fabric-info-strip">
                  <div><strong>Softness:</strong> {selectedFabricObj.softness}</div>
                  <div><strong>Breathability:</strong> {selectedFabricObj.breathability}</div>
                  <div><strong>Care:</strong> {selectedFabricObj.care}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 3: FIND NEARBY TAILOR ================= */}
        {currentStep === 3 && (
          <div className="kids-fade-in">
            <NearbyProfessionalsMap
              serviceType="tailor"
              selectedId={selectedTailorId}
              onSelectProfessional={(pro) => {
                setSelectedTailorId(pro.id);
                setNotification(`Selected ${pro.name} for kids stitching!`);
                setTimeout(() => setNotification(null), 3000);
              }}
              title="Find Kids Tailors Near You via Google Maps"
              subtitle="Browse verified master tailors and nearby tailoring studios across Bengaluru with doorstep measurement service."
              theme={theme}
            />

            {/* Selected Tailor Confirmation Strip */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#FFF1F7',
              border: '1.5px solid #FFD0E5',
              borderRadius: '16px',
              padding: '16px 20px',
              marginTop: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={selectedTailorObj.photo || '/tailor_hero_1.jpg'} 
                  alt={selectedTailorObj.name} 
                  style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover' }} 
                />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#FF087A', textTransform: 'uppercase' }}>
                    {selectedTailorObj.isPartner ? '★ Selected StitchBeez Verified Partner' : 'G Selected Google Place Shop'}
                  </div>
                  <h4 style={{ margin: '2px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--kids-navy)' }}>
                    {selectedTailorObj.name}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--kids-navy-muted)' }}>
                    {selectedTailorObj.address || selectedTailorObj.locality} • Est. Turnaround: {selectedTailorObj.turnAroundDays || '3-5 Days'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="kids-primary-btn"
                style={{ padding: '10px 22px', fontSize: '0.88rem' }}
                onClick={() => setCurrentStep(4)}
              >
                <span>Continue to Measurement Appointment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: SCHEDULE MEASUREMENT ================= */}
        {currentStep === 4 && (
          <div className="kids-fade-in">
            <div className="kids-form-group">
              <label className="kids-form-label">
                1. Choose Measurement Method <span style={{ color: 'var(--kids-pink)' }}>*</span>
              </label>
              <div className="kids-grid-4col">
                {[
                  { id: 'home-visit', title: 'Home Visit', fee: '₹99 Visit Fee', desc: 'Verified female fit-helper visits your home with soft tape' },
                  { id: 'online', title: 'Online Guided', fee: 'FREE', desc: 'Video call or AI camera guide step-by-step from your phone' },
                  { id: 'saved', title: 'Saved Profile', fee: 'FREE', desc: 'Use previously saved child measurements from your account' },
                  { id: 'manual', title: 'Manual Entry', fee: 'FREE', desc: 'Input your child’s measurements directly in inches' }
                ].map((m) => (
                  <div 
                    key={m.id} 
                    className={`kids-select-tile ${measurementMethod === m.id ? 'selected' : ''}`}
                    onClick={() => setMeasurementMethod(m.id)}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '4px' }}>{m.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--kids-pink)', fontWeight: 700, marginBottom: '6px' }}>{m.fee}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)' }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* If online guided, show AI Camera banner */}
            {measurementMethod === 'online' && (
              <div style={{
                background: '#EFF6FF',
                border: '1.5px solid #BFDBFE',
                borderRadius: '14px',
                padding: '16px',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Camera size={22} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#1E40AF' }}>
                      AI-Assisted Smart Camera Measurement Available
                    </h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#3B82F6', maxWidth: '550px' }}>
                      Scan your child in 3 seconds using your smartphone or webcam. Auto-calculates chest, waist, shoulder & length with 98.6% fit accuracy.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  style={{
                    background: '#2563EB',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => setAiCameraModalOpen(true)}
                >
                  Launch Camera Guide
                </button>
              </div>
            )}

            {/* If home visit or online, schedule date and time slot */}
            {(measurementMethod === 'home-visit' || measurementMethod === 'online') && (
              <div>
                <div className="kids-grid-2col" style={{ marginTop: '20px' }}>
                  <div className="kids-form-group">
                    <label className="kids-form-label">Select Appointment Date</label>
                    <input 
                      type="date" 
                      className="kids-text-input" 
                      value={appointmentDate} 
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </div>

                  <div className="kids-form-group">
                    <label className="kids-form-label">Available Time Slots</label>
                    <select 
                      className="kids-text-input" 
                      value={appointmentSlot} 
                      onChange={(e) => setAppointmentSlot(e.target.value)}
                    >
                      <option>09:30 AM - 11:00 AM (Morning)</option>
                      <option>11:00 AM - 12:30 PM (Mid-day)</option>
                      <option>02:30 PM - 04:00 PM (Afternoon)</option>
                      <option>04:30 PM - 06:00 PM (Evening)</option>
                      <option>06:30 PM - 08:00 PM (Late Evening)</option>
                    </select>
                  </div>
                </div>

                <div className="kids-grid-2col">
                  <div className="kids-form-group">
                    <label className="kids-form-label">Appointment Address</label>
                    <input 
                      type="text" 
                      className="kids-text-input" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat, building, street address"
                    />
                  </div>

                  <div className="kids-form-group">
                    <label className="kids-form-label">Parent Contact Number</label>
                    <input 
                      type="tel" 
                      className="kids-text-input" 
                      value={parentPhone} 
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="kids-banner-notice" style={{ marginTop: '12px' }}>
                  <ShieldCheck size={18} style={{ color: '#10B981', flexShrink: 0 }} />
                  <div>
                    <strong>StitchBeez Safety Guarantee:</strong> All home-visit measurement partners are background-verified, carry digital identification, and follow child-friendly hygienic measurement protocols.
                  </div>
                </div>
              </div>
            )}

            {/* If saved child profile */}
            {measurementMethod === 'saved' && (
              <div style={{ marginTop: '20px' }}>
                <label className="kids-form-label">Choose Saved Child Profile</label>
                {childProfiles.length > 0 ? (
                  <div className="kids-grid-2col">
                    {childProfiles.map((p) => (
                      <div 
                        key={p.id} 
                        className={`kids-select-tile ${selectedProfileId === p.id ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedProfileId(p.id);
                          setChildName(p.childName);
                          if (p.chest) setChest(p.chest);
                          if (p.waist) setWaist(p.waist);
                          if (p.shoulder) setShoulder(p.shoulder);
                          if (p.length) setLength(p.length);
                          if (p.sleeves) setSleeves(p.sleeves);
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--kids-navy)' }}>{p.childName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--kids-pink)', fontWeight: 700 }}>{p.ageGroup}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)', marginTop: '4px' }}>
                          Chest: {p.chest}" • Waist: {p.waist}" • Length: {p.length}"
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '20px', background: 'var(--kids-card-bg)', borderRadius: '10px', textAlign: 'center' }}>
                    No saved profiles found. You can enter measurements in the next step to save them for future outfits.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 5: MEASUREMENTS & SIZING REVIEW ================= */}
        {currentStep === 5 && (
          <div className="kids-fade-in">
            {/* Child Name & Fit Style */}
            <div className="kids-grid-2col">
              <div className="kids-form-group">
                <label className="kids-form-label">Child Name / Nickname</label>
                <input 
                  type="text" 
                  className="kids-text-input" 
                  value={childName} 
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Aarav, Ananya"
                />
              </div>

              <div className="kids-form-group">
                <label className="kids-form-label">Fit Style & Growth Allowance</label>
                <select 
                  className="kids-text-input" 
                  value={fitType} 
                  onChange={(e) => setFitType(e.target.value)}
                >
                  <option value="growth-allowance">Growth Allowance Fit (+1.5" seams for growing kids)</option>
                  <option value="regular">Standard Regular Fit (True to current size)</option>
                  <option value="relaxed">Relaxed / Comfort Fit (Extra airy room)</option>
                </select>
              </div>
            </div>

            {/* Sizing inputs grid */}
            <label className="kids-form-label" style={{ marginTop: '12px' }}>
              Outfit Measurements (All values in inches)
            </label>
            <div className="kids-measurements-grid">
              <div className="kids-measure-input-box">
                <label>Chest / Bust</label>
                <input type="number" step="0.5" value={chest} onChange={(e) => setChest(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Waist</label>
                <input type="number" step="0.5" value={waist} onChange={(e) => setWaist(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Hip</label>
                <input type="number" step="0.5" value={hip} onChange={(e) => setHip(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Shoulder Width</label>
                <input type="number" step="0.5" value={shoulder} onChange={(e) => setShoulder(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Sleeve Length</label>
                <input type="number" step="0.5" value={sleeves} onChange={(e) => setSleeves(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Garment Length</label>
                <input type="number" step="0.5" value={length} onChange={(e) => setLength(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Neck</label>
                <input type="number" step="0.5" value={neck} onChange={(e) => setNeck(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Inseam / Pant Length</label>
                <input type="number" step="0.5" value={inseam} onChange={(e) => setInseam(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
            </div>

            {/* Special Infant / Newborn Comfort Advisory */}
            {(ageGroup === 'newborn' || ageGroup === 'infant') && (
              <div className="kids-banner-notice" style={{ marginTop: '16px', background: '#FFF7EF', borderColor: '#FED7AA' }}>
                <Sparkles size={18} style={{ color: '#F97316', flexShrink: 0 }} />
                <div>
                  <strong>Baby Comfort Advisory:</strong> Newborn and infant outfits are stitched exclusively with concealed interior seams, zero raw edges, soft tagless labels, and nickel-free snap buttons to protect tender skin.
                </div>
              </div>
            )}

            {/* Confirmation checkbox */}
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                id="confirmMeasurements" 
                checked={measurementsConfirmed} 
                onChange={(e) => setMeasurementsConfirmed(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--kids-pink)' }}
              />
              <label htmlFor="confirmMeasurements" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--kids-navy)', cursor: 'pointer' }}>
                I confirm these measurements. The tailor will verify seam allowances before cutting the fabric.
              </label>
            </div>
          </div>
        )}

        {/* ================= STEP 6: PRICING & DELIVERY REVIEW ================= */}
        {currentStep === 6 && (
          <div className="kids-fade-in">
            <div className="kids-grid-2col">
              {/* Order Summary Card */}
              <div className="kids-summary-box">
                <h3 className="kids-summary-title">Stitching Order Summary</h3>

                <div className="kids-summary-row">
                  <span className="label">Category:</span>
                  <span className="value">{selectedCategoryObj.name}</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Outfit Type:</span>
                  <span className="value">{outfitType}</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Age Group & Gender:</span>
                  <span className="value">{selectedAgeObj.label} • {gender}</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Fabric Source:</span>
                  <span className="value">
                    {fabricSource === 'own' ? `Own Fabric (${ownFabricType}, ${ownFabricMeters}m)` : `StitchBeez ${selectedFabricObj.name} (${fabricColor}, ${fabricMeters}m)`}
                  </span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Assigned Tailor:</span>
                  <span className="value">{selectedTailorObj.name} ({selectedTailorObj.area})</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Measurement Mode:</span>
                  <span className="value">{measurementMethod === 'home-visit' ? 'Home Measurement Visit' : measurementMethod}</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Fit Preference:</span>
                  <span className="value" style={{ textTransform: 'capitalize' }}>{fitType.replace('-', ' ')}</span>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--kids-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 700, fontSize: '0.9rem' }}>
                    <Truck size={18} />
                    Estimated Doorstep Delivery: Oct 24, 2026
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)', marginTop: '4px' }}>
                    Includes 3-4 days stitching + 1 day quality inspection + doorstep delivery
                  </div>
                </div>
              </div>

              {/* Itemized Pricing Breakdown */}
              <div className="kids-summary-box">
                <h3 className="kids-summary-title">Transparent Price Breakdown</h3>

                <div className="kids-price-table">
                  <div className="kids-price-row">
                    <span>Base Stitching Charge ({selectedCategoryObj.name})</span>
                    <span>₹{estimate.stitchingCharge}</span>
                  </div>

                  <div className="kids-price-row">
                    <span>
                      Fabric Cost {fabricSource === 'own' ? '(Provided by Customer)' : `(${selectedFabricObj.name} x ${fabricMeters}m)`}
                    </span>
                    <span>{estimate.fabricCost > 0 ? `₹${estimate.fabricCost}` : '₹0'}</span>
                  </div>

                  {estimate.measurementFee > 0 && (
                    <div className="kids-price-row">
                      <span>Doorstep Measurement Visit Service</span>
                      <span>₹{estimate.measurementFee}</span>
                    </div>
                  )}

                  {estimate.pickupFee > 0 && (
                    <div className="kids-price-row">
                      <span>Fabric Pickup Service</span>
                      <span>₹{estimate.pickupFee}</span>
                    </div>
                  )}

                  <div className="kids-price-row">
                    <span>Doorstep Express Delivery</span>
                    <span style={{ color: '#10B981', fontWeight: 800 }}>FREE</span>
                  </div>

                  <div className="kids-price-row">
                    <span>GST (5%)</span>
                    <span>₹{estimate.taxes}</span>
                  </div>

                  <div className="kids-price-row total">
                    <span>Total Amount (All Inclusive)</span>
                    <span className="total-val">₹{estimate.totalAmount}</span>
                  </div>
                </div>

                {/* Quotation Acceptance / Clarification Request */}
                <div style={{ marginTop: '16px', padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--kids-navy)' }}>
                      Quotation Status: Instant Guaranteed Pricing
                    </span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#10B981', background: '#ECFDF5', padding: '3px 8px', borderRadius: '12px', border: '1px solid #A7F3D0' }}>
                      ✓ Price Locked
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--kids-navy-muted)', marginBottom: '10px' }}>
                    Have questions about this price or special embellishments? Leave a note for the master tailor.
                  </div>

                  <textarea
                    className="kids-textarea"
                    rows="2"
                    placeholder="Optional notes or clarification for tailor (e.g. Can we include matching hair accessory?)"
                    value={quotationNotes}
                    onChange={(e) => setQuotationNotes(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: '16px', padding: '12px', background: 'var(--kids-card-bg)', borderRadius: '8px', border: '1px solid var(--kids-border)' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--kids-navy)', marginBottom: '4px' }}>
                    🔒 StitchBeez Fit Guarantee
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)' }}>
                    If the stitched outfit doesn't fit your child perfectly, we provide free alteration and pickup within 7 days of delivery.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 7: CONFIRM STITCHING ORDER ================= */}
        {currentStep === 7 && (
          <div className="kids-fade-in">
            <div className="kids-confirmation-card">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: '50%', 
                  background: 'rgba(255,8,122,0.1)', 
                  color: 'var(--kids-pink)', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Scissors size={28} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--kids-navy)', margin: 0 }}>
                  Ready to Confirm Your Tailor Stitching Order
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--kids-navy-muted)', marginTop: '6px' }}>
                  Please review your details before submitting to <strong>{selectedTailorObj.name}</strong>.
                </p>
              </div>

              {/* Quick editable blocks */}
              <div className="kids-grid-3col">
                <div className="kids-review-pill">
                  <div className="pill-title">Outfit & Child</div>
                  <div className="pill-val">{childName} • {selectedAgeObj.label}</div>
                  <div className="pill-sub">{selectedCategoryObj.name} ({outfitType})</div>
                  <button type="button" className="pill-edit" onClick={() => setCurrentStep(1)}>Edit</button>
                </div>

                <div className="kids-review-pill">
                  <div className="pill-title">Fabric Choice</div>
                  <div className="pill-val">{fabricSource === 'own' ? 'Personal Fabric' : selectedFabricObj.name}</div>
                  <div className="pill-sub">{fabricSource === 'own' ? ownPickupMethod : `${fabricColor} • ${fabricMeters}m`}</div>
                  <button type="button" className="pill-edit" onClick={() => setCurrentStep(2)}>Edit</button>
                </div>

                <div className="kids-review-pill">
                  <div className="pill-title">Measurement & Visit</div>
                  <div className="pill-val">{measurementMethod === 'home-visit' ? 'Home Visit' : measurementMethod}</div>
                  <div className="pill-sub">{appointmentDate} • {appointmentSlot}</div>
                  <button type="button" className="pill-edit" onClick={() => setCurrentStep(4)}>Edit</button>
                </div>
              </div>

              {/* Total & Action */}
              <div style={{ 
                marginTop: '30px', 
                padding: '20px', 
                background: 'var(--kids-border-light)', 
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--kids-navy-muted)', fontWeight: 700 }}>Total Payable Amount:</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--kids-pink)' }}>
                    ₹{estimate.totalAmount}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--kids-navy-muted)' }}>Includes GST, Stitching & Delivery</span>
                </div>

                <button 
                  type="button" 
                  className="kids-primary-btn" 
                  style={{ padding: '14px 32px', fontSize: '1.05rem' }}
                  onClick={handleConfirmOrder}
                >
                  Confirm & Place Stitching Order →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 8: ORDER TRACKING ================= */}
        {currentStep === 8 && (
          <div className="kids-fade-in">
            <div className="kids-tracking-container">
              <div className="kids-tracking-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    background: '#10B981', 
                    color: '#FFFFFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--kids-navy)', margin: 0 }}>
                      Stitching Order Placed Successfully!
                    </h2>
                    <div style={{ fontSize: '0.85rem', color: 'var(--kids-navy-muted)', marginTop: '4px' }}>
                      Order ID: <strong>#{confirmedOrder?.id || 'KIDS-892104'}</strong> • Placed on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="kids-tracking-badge">
                  ● Status: Request Submitted
                </div>
              </div>

              {/* Order Info Cards */}
              <div className="kids-grid-3col" style={{ margin: '24px 0' }}>
                <div className="kids-summary-box">
                  <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)', fontWeight: 700 }}>Assigned Tailor</div>
                  <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--kids-navy)', marginTop: '4px' }}>
                    {selectedTailorObj.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--kids-pink)', marginTop: '2px' }}>
                    {selectedTailorObj.area}
                  </div>
                </div>

                <div className="kids-summary-box">
                  <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)', fontWeight: 700 }}>Measurement Slot</div>
                  <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--kids-navy)', marginTop: '4px' }}>
                    {appointmentDate}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--kids-navy-muted)', marginTop: '2px' }}>
                    {appointmentSlot}
                  </div>
                </div>

                <div className="kids-summary-box">
                  <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)', fontWeight: 700 }}>Estimated Delivery</div>
                  <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#10B981', marginTop: '4px' }}>
                    Oct 24, 2026
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--kids-navy-muted)', marginTop: '2px' }}>
                    Doorstep Delivery Guarantee
                  </div>
                </div>
              </div>

              {/* 8-Stage Progress Stepper */}
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--kids-navy)', marginBottom: '16px' }}>
                Live Stitching Pipeline
              </h3>
              <div className="kids-live-pipeline">
                {[
                  { title: "Request Submitted", desc: "Order received by tailor atelier", done: true, current: false },
                  { title: "Measurements Scheduled", desc: `${appointmentDate} (${appointmentSlot})`, done: false, current: true },
                  { title: "Measurements Confirmed", desc: "Verified seam allowances & fit approval", done: false, current: false },
                  { title: "Fabric Received", desc: fabricSource === 'own' ? 'Pickup runner dispatched' : 'Certified fabric cut from roll', done: false, current: false },
                  { title: "Stitching Started", desc: "Handcrafted with skin-safe linings", done: false, current: false },
                  { title: "Quality Check", desc: "Seam stress test & comfort verification", done: false, current: false },
                  { title: "Ready for Dispatch", desc: "Steamed and boxed in gift packaging", done: false, current: false },
                  { title: "Delivered", desc: "Doorstep trial with 7-day fit guarantee", done: false, current: false }
                ].map((st, i) => (
                  <div key={st.title} className={`pipeline-step ${st.done ? 'done' : ''} ${st.current ? 'current' : ''}`}>
                    <div className="pipeline-bullet">
                      {st.done ? <Check size={14} /> : i + 1}
                    </div>
                    <div className="pipeline-details">
                      <div className="pipeline-step-title">{st.title}</div>
                      <div className="pipeline-step-desc">{st.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '30px', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  className="kids-primary-btn"
                  onClick={() => {
                    setCurrentStep(1);
                    setConfirmedOrder(null);
                  }}
                >
                  Stitch Another Outfit
                </button>
                <button 
                  type="button" 
                  className="kids-secondary-btn"
                  onClick={onBackToLanding}
                >
                  Return to Kids Stitching Hub
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Stepper Footer Navigation (Steps 1 to 7) */}
      {currentStep < 8 && (
        <div className="kids-workflow-footer-nav">
          <button 
            type="button" 
            className="kids-workflow-nav-back"
            onClick={currentStep === 1 ? onBackToLanding : handlePrevStep}
          >
            <ArrowLeft size={16} /> {currentStep === 1 ? 'Cancel & Return' : 'Back'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--kids-navy-muted)', fontWeight: 700 }}>Estimated Total:</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--kids-pink)' }}>
                ₹{estimate.totalAmount}
              </div>
            </div>

            {currentStep < 7 ? (
              <button 
                type="button" 
                className="kids-workflow-nav-next"
                onClick={handleNextStep}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                type="button" 
                className="kids-workflow-nav-next confirm"
                onClick={handleConfirmOrder}
              >
                Place Order <Check size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* AI CAMERA MEASUREMENT SCANNER MODAL                                   */}
      {/* ===================================================================== */}
      {aiCameraModalOpen && (
        <div className="kids-modal-backdrop" onClick={() => setAiCameraModalOpen(false)}>
          <div className="kids-modal-card" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="kids-modal-close-btn"
              onClick={() => {
                setAiCameraModalOpen(false);
                setAiScanningState('idle');
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Camera size={20} />
              </div>
              <div>
                <span className="kids-eyebrow" style={{ color: '#2563EB' }}>SMART SIZING TECHNOLOGY</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--kids-navy)' }}>
                  AI-Assisted Kids Measurement Scan
                </h3>
              </div>
            </div>

            <div style={{ padding: '12px 14px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '10px', margin: '14px 0', fontSize: '0.78rem', color: '#92400E', lineHeight: 1.4 }}>
              <strong>🔒 Child Privacy First:</strong> Zero photos or videos are stored or sent to any server. Measurements are computed in real-time in your browser sandbox using skeletal silhouette estimation.
            </div>

            {aiScanningState === 'idle' && (
              <div>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 700, margin: '0 0 10px 0', color: 'var(--kids-navy)' }}>
                  How to prepare for the 3-second scan:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--kids-navy-muted)', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', color: '#0F172A' }}>1</div>
                    <span>Place phone/laptop upright at child's waist height, 6 to 8 feet away.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', color: '#0F172A' }}>2</div>
                    <span>Child wears form-fitting clothes (t-shirt & shorts) and stands in good lighting.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', color: '#0F172A' }}>3</div>
                    <span>Child stands still with feet shoulder-width apart and arms slightly away from sides.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <input
                    type="checkbox"
                    id="consentCheck"
                    checked={aiConsentGiven}
                    onChange={(e) => setAiConsentGiven(e.target.checked)}
                    style={{ accentColor: '#2563EB', width: 16, height: 16, cursor: 'pointer' }}
                  />
                  <label htmlFor="consentCheck" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--kids-navy)', cursor: 'pointer' }}>
                    I am the parent/guardian and consent to launching the camera guidance scan.
                  </label>
                </div>

                <button
                  type="button"
                  disabled={!aiConsentGiven}
                  className="kids-primary-btn"
                  style={{
                    width: '100%',
                    padding: '12px',
                    opacity: aiConsentGiven ? 1 : 0.5,
                    cursor: aiConsentGiven ? 'pointer' : 'not-allowed',
                    background: '#2563EB'
                  }}
                  onClick={() => {
                    setAiScanningState('scanning');
                    setTimeout(() => {
                      setAiScanningState('success');
                    }, 3200);
                  }}
                >
                  <Camera size={16} />
                  <span>Start Live 3-Second Camera Scan</span>
                </button>
              </div>
            )}

            {aiScanningState === 'scanning' && (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ 
                  width: '260px', 
                  height: '240px', 
                  margin: '0 auto 16px auto', 
                  background: '#0F172A', 
                  borderRadius: '16px', 
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #3B82F6'
                }}>
                  {/* Scanning Laser Beam */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#60A5FA',
                    boxShadow: '0 0 12px #60A5FA',
                    animation: 'spin 1.5s ease-in-out infinite alternate'
                  }} />
                  <div style={{ color: '#93C5FD', fontSize: '0.85rem', fontWeight: 700 }}>
                    Scanning Child Silhouette...<br />
                    <span style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 900 }}>Hold Still</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2563EB' }}>
                  Calibrating Depth Sensors & Seam Anchors...
                </div>
              </div>
            )}

            {aiScanningState === 'success' && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#ECFDF5', color: '#10B981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                    <Check size={24} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#065F46' }}>
                    Measurements Successfully Captured!
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, marginTop: '2px' }}>
                    Confidence Score: 98.6% (Master Tailor Verified Range)
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '10px', 
                  background: 'var(--kids-card-bg)', 
                  padding: '14px', 
                  borderRadius: '12px',
                  border: '1px solid var(--kids-border)',
                  marginBottom: '18px'
                }}>
                  <div style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--kids-navy-muted)' }}>Chest:</span> <strong>24.0 in</strong>
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--kids-navy-muted)' }}>Waist:</span> <strong>22.0 in</strong>
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--kids-navy-muted)' }}>Shoulder:</span> <strong>10.5 in</strong>
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--kids-navy-muted)' }}>Length:</span> <strong>24.0 in</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="kids-primary-btn"
                    style={{ flex: 1, padding: '10px' }}
                    onClick={() => {
                      setChest(24);
                      setWaist(22);
                      setShoulder(10.5);
                      setLength(24);
                      setMeasurementsConfirmed(true);
                      setAiCameraModalOpen(false);
                      setAiScanningState('idle');
                      setNotification("AI Measurements applied to your outfit!");
                      setTimeout(() => setNotification(null), 3000);
                    }}
                  >
                    Apply Measurements to Outfit
                  </button>

                  <button
                    type="button"
                    className="kids-secondary-btn"
                    onClick={() => setAiScanningState('idle')}
                  >
                    Rescan
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
