import React, { useState, useEffect } from 'react';
import { 
  X, Check, MapPin, Search, Star, Scissors, Ruler, Truck, ShieldCheck, 
  ArrowRight, ArrowLeft, Camera, User, Calendar, Clock, Sparkles, AlertCircle, Phone
} from 'lucide-react';
import { 
  MEN_CATEGORIES, 
  MEN_POPULAR_STYLES, 
  MEN_FABRICS, 
  MEN_VERIFIED_TAILORS, 
  saveMenStitchingOrder 
} from '../../utils/menStore';

export default function MenTailorWorkflowModal({
  isOpen,
  onClose,
  initialCategory = 'suits-blazers',
  initialStyle = null,
  initialFabric = null,
  currentUser,
  onLoginRequired,
  theme = 'light',
  showToast = () => {}
}) {
  if (!isOpen) return null;

  // Workflow Steps: 
  // 1: Style & Customization
  // 2: Fabric Selection (StitchBeez vs Customer's Own)
  // 3: Nearby Tailor Discovery (Google Maps & Verified Providers)
  // 4: Measurement Options (AI / Manual / Home Visit / Tailor Visit)
  // 5: Review & Quotation
  // 6: Confirmation
  const [step, setStep] = useState(1);

  // Form State
  const [selectedCatId, setSelectedCatId] = useState(initialCategory || 'suits-blazers');
  const [selectedStyleId, setSelectedStyleId] = useState(initialStyle?.id || 'style-business-suit');
  const [fitType, setFitType] = useState('Slim Fit');
  const [collarType, setCollarType] = useState('Spread Collar');
  const [cuffType, setCuffType] = useState('French Cuffs');
  const [customNotes, setCustomNotes] = useState('');

  // Fabric
  const [fabricSource, setFabricSource] = useState(initialFabric ? 'stitchbee' : 'stitchbee'); // 'stitchbee' | 'own'
  const [selectedFabricId, setSelectedFabricId] = useState(initialFabric?.id || 'fab-raymond');
  const [fabricPickupAddress, setFabricPickupAddress] = useState('Flat 402, Green Glen Layout, Bellandur, Bengaluru');

  // Tailor Search
  const [searchLocality, setSearchLocality] = useState('Bannerghatta Road, Bengaluru');
  const [searchRadius, setSearchRadius] = useState('5 km');
  const [selectedTailor, setSelectedTailor] = useState(MEN_VERIFIED_TAILORS[0]);
  const [mapViewMode, setMapViewMode] = useState('cards'); // 'cards' | 'map'

  // Measurements
  const [measurementMode, setMeasurementMode] = useState('home-visit'); // 'ai' | 'manual' | 'home-visit' | 'tailor-visit'
  const [aiScanStage, setAiScanStage] = useState('ready'); // 'ready' | 'scanning' | 'done'
  const [manualMeasurements, setManualMeasurements] = useState({
    chest: '39',
    waist: '32',
    shoulder: '17.5',
    length: '29',
    collar: '15.5',
    sleeve: '25'
  });
  const [appointmentDate, setAppointmentDate] = useState('Tomorrow, 11:00 AM');

  // Confirmed Order
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Sync initial selections
  useEffect(() => {
    if (initialCategory) setSelectedCatId(initialCategory);
    if (initialStyle) setSelectedStyleId(initialStyle.id);
    if (initialFabric) {
      setFabricSource('stitchbee');
      setSelectedFabricId(initialFabric.id);
    }
  }, [initialCategory, initialStyle, initialFabric]);

  const activeCategory = MEN_CATEGORIES.find(c => c.id === selectedCatId) || MEN_CATEGORIES[0];
  const activeStyle = MEN_POPULAR_STYLES.find(s => s.id === selectedStyleId) || MEN_POPULAR_STYLES[0];
  const activeFabric = MEN_FABRICS.find(f => f.id === selectedFabricId) || MEN_FABRICS[0];

  // Pricing calculations
  const stitchingCharge = activeStyle.startingPrice;
  const fabricCharge = fabricSource === 'stitchbee' ? Math.round(activeFabric.pricePerMeter * 2.5) : 0;
  const measurementFee = measurementMode === 'home-visit' ? 99 : 0;
  const doorstepDelivery = 0; // Free promotion
  const totalQuote = stitchingCharge + fabricCharge + measurementFee;

  const handleSimulateAIScan = () => {
    setAiScanStage('scanning');
    setTimeout(() => {
      setAiScanStage('done');
      showToast('AI Body Scan Complete: Precision Sizing Calibrated (99.4% Match)');
    }, 2000);
  };

  const handleConfirmOrder = () => {
    if (!currentUser && onLoginRequired) {
      onLoginRequired();
      return;
    }

    const orderPayload = {
      title: `${activeCategory.title} - ${activeStyle.name}`,
      outfitName: activeStyle.name,
      category: activeCategory.title,
      styleDetails: {
        fit: fitType,
        collar: collarType,
        cuffs: cuffType,
        notes: customNotes
      },
      fabricDetails: {
        source: fabricSource === 'stitchbee' ? 'StitchBeez Curated' : 'Customer-Owned Fabric',
        fabricName: fabricSource === 'stitchbee' ? activeFabric.name : 'Customer Provided Fabric',
        pricePerMeter: fabricSource === 'stitchbee' ? activeFabric.pricePerMeter : 0
      },
      tailor: {
        name: selectedTailor.name,
        locality: selectedTailor.locality,
        rating: selectedTailor.rating,
        phone: selectedTailor.phone
      },
      measurementMethod: measurementMode,
      measurements: measurementMode === 'manual' ? manualMeasurements : 'Professional Fitting Profile',
      pricing: {
        stitchingCharge,
        fabricCharge,
        measurementFee,
        doorstepDelivery,
        total: totalQuote
      }
    };

    const saved = saveMenStitchingOrder(orderPayload);
    setConfirmedOrder(saved);
    setStep(6);
    showToast(`Order Confirmed! Tailor assigned: ${selectedTailor.name} 🧵`);
  };

  return (
    <div className={`men-modal-backdrop ${theme === 'dark' ? 'dark' : ''}`} onClick={onClose}>
      <div className="men-modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="men-modal-header">
          <div className="men-modal-header-left">
            <span className="men-modal-eyebrow">
              <Scissors size={14} /> BESPOKE MEN’S TAILORING
            </span>
            <h3 className="men-modal-title">
              {step === 1 && 'Step 1: Choose Outfit & Customization'}
              {step === 2 && 'Step 2: Select Your Fabric'}
              {step === 3 && 'Step 3: Select Verified Tailor Near You'}
              {step === 4 && 'Step 4: Choose Measurement Method'}
              {step === 5 && 'Step 5: Review Quotation & Delivery'}
              {step === 6 && 'Tailoring Order Confirmed!'}
            </h3>
          </div>

          <button className="men-modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Progress Stepper */}
        {step < 6 && (
          <div className="men-modal-stepper">
            {[
              { num: 1, label: 'Style' },
              { num: 2, label: 'Fabric' },
              { num: 3, label: 'Tailor' },
              { num: 4, label: 'Measurements' },
              { num: 5, label: 'Quotation' }
            ].map(s => (
              <div 
                key={s.num} 
                className={`men-modal-step-pill ${step === s.num ? 'active' : step > s.num ? 'completed' : ''}`}
                onClick={() => step > s.num && setStep(s.num)}
              >
                <span className="step-num">{step > s.num ? <Check size={12} /> : s.num}</span>
                <span className="step-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="men-modal-body">

          {/* ================= STEP 1: STYLE & CUSTOMIZATION ================= */}
          {step === 1 && (
            <div className="men-step-content">
              {/* Category Selection */}
              <div className="men-form-group">
                <label className="men-form-label">Select Outfit Category:</label>
                <div className="men-category-pills-row">
                  {MEN_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`men-pill-btn ${selectedCatId === cat.id ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCatId(cat.id);
                        const match = MEN_POPULAR_STYLES.find(s => s.category === cat.id);
                        if (match) setSelectedStyleId(match.id);
                      }}
                    >
                      <img src={cat.image} alt={cat.title} className="men-pill-img" />
                      <span>{cat.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Card Selection */}
              <div className="men-form-group">
                <label className="men-form-label">Choose Base Style:</label>
                <div className="men-style-cards-grid">
                  {MEN_POPULAR_STYLES.filter(s => s.category === selectedCatId || selectedCatId === 'suits-blazers').slice(0, 4).map(st => (
                    <div 
                      key={st.id} 
                      className={`men-style-card ${selectedStyleId === st.id ? 'active' : ''}`}
                      onClick={() => setSelectedStyleId(st.id)}
                    >
                      <img src={st.image} alt={st.name} className="men-style-card-img" />
                      <div className="men-style-card-info">
                        <div className="men-style-card-name">{st.name}</div>
                        <div className="men-style-card-price">Starting ₹{st.startingPrice.toLocaleString()}</div>
                        <div className="men-style-card-time"><Clock size={12} /> {st.leadTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customization Details */}
              <div className="men-customization-options-grid">
                <div className="men-form-group">
                  <label className="men-form-label">Silhouetted Fit:</label>
                  <select 
                    value={fitType} 
                    onChange={(e) => setFitType(e.target.value)}
                    className="men-form-select"
                  >
                    <option value="Super Slim Fit">Super Slim Fit (Contemporary Italian)</option>
                    <option value="Slim Fit">Slim Fit (Structured Modern Fit)</option>
                    <option value="Classic Regular Fit">Classic Regular Fit (Timeless Comfort)</option>
                    <option value="Relaxed Fit">Relaxed Fit (Ease of Motion)</option>
                  </select>
                </div>

                <div className="men-form-group">
                  <label className="men-form-label">Collar / Neckline:</label>
                  <select 
                    value={collarType} 
                    onChange={(e) => setCollarType(e.target.value)}
                    className="men-form-select"
                  >
                    <option value="Spread Collar">Spread Collar (For Windsor Knots)</option>
                    <option value="Cutaway Collar">Cutaway Modern Collar</option>
                    <option value="Mandarin / Bandhgala Collar">Mandarin / Bandhgala Collar</option>
                    <option value="Button-Down Casual Collar">Button-Down Casual Collar</option>
                  </select>
                </div>

                <div className="men-form-group">
                  <label className="men-form-label">Cuff / Lapel Style:</label>
                  <select 
                    value={cuffType} 
                    onChange={(e) => setCuffType(e.target.value)}
                    className="men-form-select"
                  >
                    <option value="French Cuffs">French Cuffs (For Cufflinks)</option>
                    <option value="Two-Button Barrel Cuffs">Two-Button Barrel Cuffs</option>
                    <option value="Single-Button Rounded Cuffs">Single-Button Rounded Cuffs</option>
                    <option value="Notch Lapel (Suits)">Notch Lapel (Suits)</option>
                    <option value="Satin Peak Lapel (Tuxedo)">Satin Peak Lapel (Tuxedo)</option>
                  </select>
                </div>

                <div className="men-form-group">
                  <label className="men-form-label">Special Tailoring Instructions (Optional):</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Contrast stitching on buttonholes, inside pen pocket..." 
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="men-form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: FABRIC SELECTION ================= */}
          {step === 2 && (
            <div className="men-step-content">
              {/* Toggle Source: StitchBeez vs Own Fabric */}
              <div className="men-fabric-source-tabs">
                <button
                  type="button"
                  className={`men-source-tab ${fabricSource === 'stitchbee' ? 'active' : ''}`}
                  onClick={() => setFabricSource('stitchbee')}
                >
                  <Sparkles size={18} /> Choose from StitchBeez Curated Fabrics
                </button>

                <button
                  type="button"
                  className={`men-source-tab ${fabricSource === 'own' ? 'active' : ''}`}
                  onClick={() => setFabricSource('own')}
                >
                  <Scissors size={18} /> I Have My Own Fabric (Doorstep Pickup)
                </button>
              </div>

              {fabricSource === 'stitchbee' ? (
                <div>
                  <p className="men-step-subdesc">
                    All fabrics are certified pre-shrunk, skin-tested, and sourced from master textile mills including Raymond and fine linen imports.
                  </p>

                  <div className="men-fabrics-select-grid">
                    {MEN_FABRICS.map(fab => (
                      <div 
                        key={fab.id} 
                        className={`men-fabric-select-card ${selectedFabricId === fab.id ? 'active' : ''}`}
                        onClick={() => setSelectedFabricId(fab.id)}
                      >
                        <img src={fab.image} alt={fab.name} className="men-fabric-select-img" />
                        <div className="men-fabric-select-info">
                          <div className="men-fabric-select-name">{fab.name}</div>
                          <div className="men-fabric-select-type">{fab.type}</div>
                          <div className="men-fabric-select-price">₹{fab.pricePerMeter} / meter</div>
                        </div>
                        {selectedFabricId === fab.id && (
                          <div className="men-selected-badge"><Check size={14} /></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {activeFabric && (
                    <div className="men-fabric-selected-summary">
                      <div className="men-summary-pill">
                        <strong>Selected:</strong> {activeFabric.name} ({activeFabric.type})
                      </div>
                      <div className="men-summary-pill">
                        <strong>Calculated Meters:</strong> 2.5 Meters required for {activeStyle.name}
                      </div>
                      <div className="men-summary-pill price">
                        <strong>Fabric Cost:</strong> ₹{Math.round(activeFabric.pricePerMeter * 2.5).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="men-own-fabric-box">
                  <div className="men-own-fabric-icon-wrap">
                    <Scissors size={32} />
                  </div>
                  <h4>We Collect Your Fabric From Your Doorstep!</h4>
                  <p>
                    Our verified delivery executive will pick up your fabric in a secure anti-dust moisture bag. Hand over your fabric along with any sample garment you'd like the tailor to reference.
                  </p>

                  <div className="men-form-group" style={{ textAlign: 'left', marginTop: '16px' }}>
                    <label className="men-form-label">Pickup Address in Bengaluru:</label>
                    <input 
                      type="text" 
                      value={fabricPickupAddress} 
                      onChange={(e) => setFabricPickupAddress(e.target.value)}
                      className="men-form-input" 
                    />
                  </div>

                  <div className="men-own-fabric-note">
                    <ShieldCheck size={16} /> Free Doorstep Pickup Included with Every Stitching Order
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 3: NEARBY TAILORS (GOOGLE MAPS) ================= */}
          {step === 3 && (
            <div className="men-step-content">
              {/* Google Maps Search Bar */}
              <div className="men-maps-search-header">
                <div className="men-maps-search-input-box">
                  <MapPin size={18} className="men-maps-pin-icon" />
                  <input 
                    type="text" 
                    value={searchLocality} 
                    onChange={(e) => setSearchLocality(e.target.value)} 
                    placeholder="Search locality, PIN code, or landmark..."
                    className="men-maps-input"
                  />
                </div>

                <select 
                  value={searchRadius} 
                  onChange={(e) => setSearchRadius(e.target.value)}
                  className="men-maps-radius-select"
                >
                  <option value="2 km">Within 2 km</option>
                  <option value="5 km">Within 5 km</option>
                  <option value="10 km">Within 10 km</option>
                  <option value="25 km">All Bengaluru</option>
                </select>

                <div className="men-view-toggle-btns">
                  <button 
                    type="button" 
                    className={`men-toggle-btn ${mapViewMode === 'cards' ? 'active' : ''}`}
                    onClick={() => setMapViewMode('cards')}
                  >
                    List
                  </button>
                  <button 
                    type="button" 
                    className={`men-toggle-btn ${mapViewMode === 'map' ? 'active' : ''}`}
                    onClick={() => setMapViewMode('map')}
                  >
                    Map View
                  </button>
                </div>
              </div>

              {/* Map Simulator or Cards */}
              {mapViewMode === 'map' ? (
                <div className="men-interactive-map-container">
                  <div className="men-map-canvas-mock">
                    <div className="men-map-watermark">
                      <MapPin size={24} color="#FF008A" />
                      <span>Google Maps Discovery - Verified StitchBeez Tailors</span>
                    </div>

                    {MEN_VERIFIED_TAILORS.map((t, idx) => (
                      <div 
                        key={t.id} 
                        className={`men-map-marker-pin ${selectedTailor.id === t.id ? 'active' : ''}`}
                        style={{ top: `${25 + idx * 18}%`, left: `${30 + idx * 15}%` }}
                        onClick={() => setSelectedTailor(t)}
                      >
                        <div className="men-marker-bubble">
                          <strong>{t.name}</strong>
                          <span>★ {t.rating} ({t.distanceKm} km)</span>
                        </div>
                        <div className="men-pin-dot" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Tailor Cards */}
              <div className="men-tailors-list-grid">
                {MEN_VERIFIED_TAILORS.map(tailor => (
                  <div 
                    key={tailor.id} 
                    className={`men-tailor-item-card ${selectedTailor.id === tailor.id ? 'selected' : ''}`}
                    onClick={() => setSelectedTailor(tailor)}
                  >
                    <div className="men-tailor-item-top">
                      <img src={tailor.image} alt={tailor.name} className="men-tailor-item-img" />
                      <div className="men-tailor-item-details">
                        <div className="men-tailor-name-row">
                          <h4 className="men-tailor-name">{tailor.name}</h4>
                          <span className="men-verified-tag">
                            <ShieldCheck size={13} /> Verified
                          </span>
                        </div>
                        <div className="men-tailor-owner">{tailor.owner} • {tailor.experience}</div>
                        <div className="men-tailor-locality"><MapPin size={13} /> {tailor.locality} ({tailor.distanceKm} km away)</div>
                        <div className="men-tailor-rating">
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          <strong>{tailor.rating}</strong> ({tailor.reviewsCount} verified reviews)
                        </div>
                      </div>
                    </div>

                    <div className="men-tailor-item-bottom">
                      <div className="men-tailor-specs">
                        {tailor.specialties.map(sp => (
                          <span key={sp} className="men-spec-badge">{sp}</span>
                        ))}
                      </div>

                      <div className="men-tailor-select-action">
                        {selectedTailor.id === tailor.id ? (
                          <span className="men-selected-label"><Check size={16} /> Selected Tailor</span>
                        ) : (
                          <button type="button" className="men-btn-select-tailor">Select Tailor</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= STEP 4: MEASUREMENT OPTIONS ================= */}
          {step === 4 && (
            <div className="men-step-content">
              <p className="men-step-subdesc">
                StitchBeez offers 4 precise measurement paths so your outfit fits with perfection. Choose your preferred fitting experience:
              </p>

              <div className="men-measurement-options-row">
                {/* 1. AI Assisted */}
                <div 
                  className={`men-measure-card ${measurementMode === 'ai' ? 'active' : ''}`}
                  onClick={() => setMeasurementMode('ai')}
                >
                  <div className="men-measure-icon-circle ai"><Camera size={24} /></div>
                  <h4>AI-Assisted Scan</h4>
                  <p>Touchless camera scan via your smartphone calibrated to 99.4% bespoke precision.</p>
                  <span className="men-measure-cost">FREE • 30 Seconds</span>
                </div>

                {/* 2. Manual */}
                <div 
                  className={`men-measure-card ${measurementMode === 'manual' ? 'active' : ''}`}
                  onClick={() => setMeasurementMode('manual')}
                >
                  <div className="men-measure-icon-circle manual"><Ruler size={24} /></div>
                  <h4>Manual Input</h4>
                  <p>Enter your exact collar, chest, waist, and sleeve measurements manually or from existing shirt.</p>
                  <span className="men-measure-cost">FREE • Custom Sizing</span>
                </div>

                {/* 3. Doorstep Home Visit */}
                <div 
                  className={`men-measure-card ${measurementMode === 'home-visit' ? 'active' : ''}`}
                  onClick={() => setMeasurementMode('home-visit')}
                >
                  <div className="men-measure-icon-circle home"><User size={24} /></div>
                  <h4>Doorstep Fit Expert</h4>
                  <p>Our verified menswear fit helper visits your home or office with sample fabrics and measuring tape.</p>
                  <span className="men-measure-cost">₹99 • At Your Home</span>
                </div>

                {/* 4. Visit Tailor */}
                <div 
                  className={`men-measure-card ${measurementMode === 'tailor-visit' ? 'active' : ''}`}
                  onClick={() => setMeasurementMode('tailor-visit')}
                >
                  <div className="men-measure-icon-circle shop"><MapPin size={24} /></div>
                  <h4>Visit Selected Tailor</h4>
                  <p>Drop by {selectedTailor.name}’s workshop directly for an in-person measurement & fitting session.</p>
                  <span className="men-measure-cost">FREE • In Workshop</span>
                </div>
              </div>

              {/* Mode detail interactive panel */}
              {measurementMode === 'ai' && (
                <div className="men-measure-interactive-panel">
                  <h5>AI Touchless Body Scanner</h5>
                  <p>Stand 6 feet back facing the camera. Our neural network computes collar, chest circumference, torso fall, and shoulder angle.</p>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
                    <button 
                      type="button" 
                      onClick={handleSimulateAIScan}
                      className="men-btn-pink"
                      disabled={aiScanStage === 'scanning'}
                    >
                      <Camera size={16} /> {aiScanStage === 'scanning' ? 'Calibrating Scan...' : aiScanStage === 'done' ? 'Re-scan with Camera' : 'Start Touchless Camera Scan'}
                    </button>
                    {aiScanStage === 'done' && (
                      <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Check size={16} /> Dimensions Verified (Chest: 39", Waist: 32", Shoulder: 17.5")
                      </span>
                    )}
                  </div>
                </div>
              )}

              {measurementMode === 'manual' && (
                <div className="men-measure-interactive-panel">
                  <h5>Enter Your Garment Measurements (Inches):</h5>
                  <div className="men-manual-inputs-grid">
                    <div>
                      <label>Chest (inches):</label>
                      <input 
                        type="number" 
                        value={manualMeasurements.chest} 
                        onChange={(e) => setManualMeasurements({...manualMeasurements, chest: e.target.value})}
                        className="men-form-input" 
                      />
                    </div>
                    <div>
                      <label>Waist (inches):</label>
                      <input 
                        type="number" 
                        value={manualMeasurements.waist} 
                        onChange={(e) => setManualMeasurements({...manualMeasurements, waist: e.target.value})}
                        className="men-form-input" 
                      />
                    </div>
                    <div>
                      <label>Shoulder Width (inches):</label>
                      <input 
                        type="number" 
                        value={manualMeasurements.shoulder} 
                        onChange={(e) => setManualMeasurements({...manualMeasurements, shoulder: e.target.value})}
                        className="men-form-input" 
                      />
                    </div>
                    <div>
                      <label>Shirt / Suit Length (inches):</label>
                      <input 
                        type="number" 
                        value={manualMeasurements.length} 
                        onChange={(e) => setManualMeasurements({...manualMeasurements, length: e.target.value})}
                        className="men-form-input" 
                      />
                    </div>
                    <div>
                      <label>Collar Neck (inches):</label>
                      <input 
                        type="number" 
                        value={manualMeasurements.collar} 
                        onChange={(e) => setManualMeasurements({...manualMeasurements, collar: e.target.value})}
                        className="men-form-input" 
                      />
                    </div>
                    <div>
                      <label>Sleeve Length (inches):</label>
                      <input 
                        type="number" 
                        value={manualMeasurements.sleeve} 
                        onChange={(e) => setManualMeasurements({...manualMeasurements, sleeve: e.target.value})}
                        className="men-form-input" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {(measurementMode === 'home-visit' || measurementMode === 'tailor-visit') && (
                <div className="men-measure-interactive-panel">
                  <h5>Schedule Appointment Slot:</h5>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {['Today, 5:00 PM', 'Tomorrow, 11:00 AM', 'Tomorrow, 3:30 PM', 'Sunday, 10:00 AM'].map(slot => (
                      <button
                        key={slot}
                        type="button"
                        className={`men-pill-btn ${appointmentDate === slot ? 'active' : ''}`}
                        onClick={() => setAppointmentDate(slot)}
                      >
                        <Calendar size={14} /> {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 5: REVIEW & QUOTATION ================= */}
          {step === 5 && (
            <div className="men-step-content">
              <div className="men-quote-grid">
                
                {/* Left: Summary Cards */}
                <div className="men-quote-summary-left">
                  <div className="men-quote-item-box">
                    <img src={activeStyle.image} alt={activeStyle.name} className="men-quote-img" />
                    <div>
                      <span className="men-quote-tag">{activeCategory.title}</span>
                      <h4>{activeStyle.name}</h4>
                      <p>{fitType} • {collarType} • {cuffType}</p>
                      {customNotes && <small>Note: "{customNotes}"</small>}
                    </div>
                  </div>

                  <div className="men-quote-provider-box">
                    <div className="men-provider-row">
                      <div className="men-prov-icon"><Scissors size={18} /></div>
                      <div>
                        <strong>Assigned Tailor:</strong> {selectedTailor.name}
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{selectedTailor.locality} • ★ {selectedTailor.rating}</div>
                      </div>
                    </div>

                    <div className="men-provider-row">
                      <div className="men-prov-icon"><Ruler size={18} /></div>
                      <div>
                        <strong>Measurement:</strong> {measurementMode === 'home-visit' ? 'Doorstep Fit Expert' : measurementMode === 'ai' ? 'AI Camera Calibration' : measurementMode === 'manual' ? 'Custom Measurement Specs' : 'Tailor Workshop Visit'}
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Slot: {appointmentDate}</div>
                      </div>
                    </div>

                    <div className="men-provider-row">
                      <div className="men-prov-icon"><Truck size={18} /></div>
                      <div>
                        <strong>Estimated Delivery:</strong> 5 Days from Measurement Confirmation
                        <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>StitchBeez On-Time Delivery Guarantee Included</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Itemized Quotation */}
                <div className="men-quote-itemized-card">
                  <h4 className="men-quote-card-title">Itemized Quotation</h4>

                  <div className="men-quote-line-row">
                    <span>Bespoke Stitching Charge:</span>
                    <strong>₹{stitchingCharge.toLocaleString()}</strong>
                  </div>

                  <div className="men-quote-line-row">
                    <span>
                      Fabric: {fabricSource === 'stitchbee' ? `${activeFabric.name} (2.5m)` : 'Customer-Owned Fabric'}
                    </span>
                    <strong>
                      {fabricSource === 'stitchbee' ? `₹${fabricCharge.toLocaleString()}` : '₹0 (Client Provided)'}
                    </strong>
                  </div>

                  <div className="men-quote-line-row">
                    <span>Doorstep Measurement Visit:</span>
                    <strong>{measurementFee > 0 ? `₹${measurementFee}` : 'FREE'}</strong>
                  </div>

                  <div className="men-quote-line-row">
                    <span>Doorstep Delivery & Final Fitting:</span>
                    <strong style={{ color: '#10b981' }}>FREE</strong>
                  </div>

                  <div className="men-quote-total-row">
                    <span>Total Estimated Price:</span>
                    <span className="total-amount">₹{totalQuote.toLocaleString()}</span>
                  </div>

                  <p className="men-quote-guarantee-text">
                    <ShieldCheck size={14} /> Pay after doorstep delivery & final trial fitting. 100% satisfaction or complimentary alteration.
                  </p>

                  <button 
                    type="button" 
                    onClick={handleConfirmOrder}
                    className="men-btn-pink"
                    style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '16px' }}
                  >
                    Confirm Tailoring Order →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 6: CONFIRMATION ================= */}
          {step === 6 && confirmedOrder && (
            <div className="men-step-content men-confirmation-screen">
              <div className="men-success-icon-wrap">
                <Check size={40} />
              </div>

              <h2 className="men-conf-title">Bespoke Stitching Order Placed!</h2>
              <p className="men-conf-subtitle">
                Your order <strong>#{confirmedOrder.id}</strong> has been confirmed and routed to <strong>{selectedTailor.name}</strong>.
              </p>

              <div className="men-conf-summary-card">
                <div className="men-conf-grid">
                  <div>
                    <label>Garment Style:</label>
                    <p>{activeStyle.name} ({activeCategory.title})</p>
                  </div>
                  <div>
                    <label>Assigned Partner:</label>
                    <p>{selectedTailor.name}</p>
                  </div>
                  <div>
                    <label>Measurement Method:</label>
                    <p>{measurementMode === 'home-visit' ? 'Doorstep Fit Expert' : measurementMode === 'ai' ? 'AI Body Calibration' : 'Direct Workshop Visit'}</p>
                  </div>
                  <div>
                    <label>Estimated Delivery Date:</label>
                    <p>{confirmedOrder.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="men-conf-tracker-bar">
                  <div className="tracker-step done">1. Confirmed ✓</div>
                  <div className="tracker-step">2. Fabric Cut</div>
                  <div className="tracker-step">3. Hand Stitching</div>
                  <div className="tracker-step">4. Trial & Delivery</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
                <button 
                  type="button" 
                  onClick={onClose}
                  className="men-btn-pink"
                >
                  View Order in Customer Dashboard
                </button>
                <button 
                  type="button" 
                  onClick={onClose}
                  className="men-btn-outline"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 6 && (
          <div className="men-modal-footer">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="men-btn-outline"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            {step < 5 ? (
              <button 
                type="button" 
                onClick={() => setStep(step + 1)}
                className="men-btn-pink"
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
}
