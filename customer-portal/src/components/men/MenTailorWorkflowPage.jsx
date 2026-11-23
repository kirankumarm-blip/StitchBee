import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, ArrowLeft, ArrowRight, Check, MapPin, Calendar, Clock, 
  Star, ShieldCheck, Camera, User, Layers, Sparkles, Phone, Upload, 
  X, Search, SlidersHorizontal, Award, ChevronRight, CheckCircle2, Truck
} from 'lucide-react';
import { 
  MEN_CATEGORIES, 
  MEN_POPULAR_STYLES, 
  MEN_FABRICS, 
  MEN_VERIFIED_TAILORS, 
  saveMenStitchingOrder 
} from '../../utils/menStore';
import './MenTailorWorkflowPage.css';

const QUICK_LOCALITIES = [
  { name: 'Bannerghatta Road', coords: [12.8596, 77.5888] },
  { name: 'Koramangala', coords: [12.9352, 77.6245] },
  { name: 'Indiranagar', coords: [12.9716, 77.6412] },
  { name: 'Jayanagar', coords: [12.9307, 77.5840] },
  { name: 'HSR Layout', coords: [12.9141, 77.6413] },
  { name: 'Whitefield', coords: [12.9698, 77.7500] }
];

export default function MenTailorWorkflowPage({
  initialCategory = 'suits-blazers',
  initialStyle = null,
  initialFabric = null,
  currentUser,
  onLoginRequired,
  onBackToLanding,
  theme = 'light',
  showToast = () => {}
}) {
  // Steps:
  // 1: Choose Outfit & Customization
  // 2: Select Fabric (StitchBeez vs Customer's Own)
  // 3: Select Verified Tailor from Google Map
  // 4: Measurement Options (AI / Manual / Doorstep / Atelier)
  // 5: Review & Itemized Quotation
  // 6: Confirmation & Order Tracking
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Style & Customization
  const [selectedCatId, setSelectedCatId] = useState(initialCategory || 'suits-blazers');
  const [selectedStyleId, setSelectedStyleId] = useState(initialStyle?.id || 'style-business-suit');
  const [fitType, setFitType] = useState('Slim Fit');
  const [collarType, setCollarType] = useState('Spread Collar');
  const [cuffType, setCuffType] = useState('French Cuffs');
  const [customNotes, setCustomNotes] = useState('');

  // Step 2: Fabric
  const [fabricSource, setFabricSource] = useState(initialFabric ? 'stitchbee' : 'stitchbee'); // 'stitchbee' | 'own'
  const [selectedFabricId, setSelectedFabricId] = useState(initialFabric?.id || 'fab-raymond');
  const [ownFabricType, setOwnFabricType] = useState('Pure Cotton (3.0 Meters)');
  const [pickupAddress, setPickupAddress] = useState('Flat 402, Royal Palms, Koramangala, Bengaluru');

  // Step 3: Google Map Tailor Selection
  const [selectedTailorId, setSelectedTailorId] = useState('tailor-1');
  const [selectedLocality, setSelectedLocality] = useState(QUICK_LOCALITIES[0]);
  const [searchRadius, setSearchRadius] = useState(5);
  const [tailorSort, setTailorSort] = useState('distance');

  // Map DOM Refs
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  // Step 4: Measurements
  const [measurementMode, setMeasurementMode] = useState('home-visit'); // 'ai' | 'manual' | 'home-visit' | 'tailor-visit'
  const [aiScanStatus, setAiScanStatus] = useState('idle'); // 'idle' | 'scanning' | 'done'
  const [manualSizes, setManualSizes] = useState({
    chest: '40',
    waist: '33',
    shoulder: '18',
    length: '29.5',
    collar: '15.5',
    sleeve: '25.5'
  });
  const [appointmentSlot, setAppointmentSlot] = useState('Tomorrow, 11:00 AM - 12:30 PM');

  // Step 6: Confirmed Order
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const activeCategory = MEN_CATEGORIES.find(c => c.id === selectedCatId) || MEN_CATEGORIES[0];
  const activeStyle = MEN_POPULAR_STYLES.find(s => s.id === selectedStyleId) || MEN_POPULAR_STYLES[0];
  const activeFabric = MEN_FABRICS.find(f => f.id === selectedFabricId) || MEN_FABRICS[0];
  const activeTailor = MEN_VERIFIED_TAILORS.find(t => t.id === selectedTailorId) || MEN_VERIFIED_TAILORS[0];

  // Pricing Calculation
  const stitchingCharge = activeStyle.startingPrice || 2499;
  const fabricCharge = fabricSource === 'stitchbee' ? Math.round(activeFabric.pricePerMeter * 2.5) : 0;
  const measurementFee = measurementMode === 'home-visit' ? 99 : 0;
  const deliveryCharge = 0; // Free promotion
  const totalAmount = stitchingCharge + fabricCharge + measurementFee;

  // Filter styles by selected category
  const filteredStyles = MEN_POPULAR_STYLES.filter(s => s.category === selectedCatId);
  const displayStyles = filteredStyles.length > 0 ? filteredStyles : MEN_POPULAR_STYLES.slice(0, 4);

  // =========================================================================
  // LEAFLET GOOGLE MAPS INTEGRATION FOR TAILOR DISCOVERY
  // =========================================================================
  useEffect(() => {
    if (currentStep !== 3) return;
    if (!mapContainerRef.current) return;
    if (typeof window === 'undefined' || !window.L) return;

    // Initialize Map if not present
    if (!mapInstanceRef.current) {
      const map = window.L.map(mapContainerRef.current, {
        center: selectedLocality.coords,
        zoom: 13,
        zoomControl: true
      });

      // Google-like clean Voyager tiles
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB &copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      markersGroupRef.current = window.L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(selectedLocality.coords, 13);
    }

    // Plot Tailor Pins
    const map = mapInstanceRef.current;
    const group = markersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // User center marker
    const userPin = window.L.divIcon({
      className: 'men-map-user-pin',
      html: `<div style="background:#071B49; color:#fff; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 10px rgba(0,0,0,0.3); border:2px solid #fff;"><span style="font-size:11px; font-weight:800;">YOU</span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    window.L.marker(selectedLocality.coords, { icon: userPin }).addTo(group).bindPopup('<strong>Your Location</strong><br/>' + selectedLocality.name);

    // Verified Tailors Pins
    MEN_VERIFIED_TAILORS.forEach(t => {
      const isSelected = t.id === selectedTailorId;
      const tailorIcon = window.L.divIcon({
        className: 'men-map-tailor-pin',
        html: `
          <div style="background:${isSelected ? '#FF008A' : '#071B49'}; color:#fff; padding:4px 8px; border-radius:18px; font-weight:700; font-size:11px; display:flex; align-items:center; gap:4px; box-shadow:0 3px 12px rgba(0,0,0,0.35); border:2px solid #fff; white-space:nowrap; cursor:pointer;">
            <span>✂</span>
            <span>${t.name.split(' ')[0]}</span>
            <span style="color:#FFD700; font-size:10px;">★${t.rating}</span>
          </div>
        `,
        iconSize: [100, 30],
        iconAnchor: [50, 15]
      });

      const marker = window.L.marker([t.lat, t.lng], { icon: tailorIcon }).addTo(group);
      marker.on('click', () => {
        setSelectedTailorId(t.id);
        map.setView([t.lat, t.lng], 14, { animate: true });
      });

      marker.bindPopup(`
        <div style="font-family:sans-serif; min-width:180px; padding:4px;">
          <strong style="color:#071B49; font-size:13px;">${t.name}</strong><br/>
          <span style="font-size:11px; color:#FF008A; font-weight:700;">★ ${t.rating} (${t.reviewsCount} reviews)</span><br/>
          <span style="font-size:11px; color:#64748b;">${t.locality}</span><br/>
          <div style="margin-top:6px; font-size:11px; font-weight:700; color:#071B49;">Starts ₹${t.startingPrice} • ${t.deliveryDays}</div>
          <button style="margin-top:6px; width:100%; background:#FF008A; color:#fff; border:none; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:700; cursor:pointer;" onclick="window.selectMenTailor('${t.id}')">Select this Tailor</button>
        </div>
      `);
    });

    window.selectMenTailor = (id) => {
      setSelectedTailorId(id);
      showToast(`Selected ${MEN_VERIFIED_TAILORS.find(t => t.id === id)?.name}`);
    };
  }, [currentStep, selectedLocality, selectedTailorId]);

  // Handle AI Body Scan Simulation
  const handleStartAIScan = () => {
    setAiScanStatus('scanning');
    setTimeout(() => {
      setAiScanStatus('done');
      showToast('AI Body Scan Complete! Calibrated sizing (99.4% Fit Match)');
    }, 2200);
  };

  // Confirm Order
  const handleConfirmOrder = () => {
    if (!currentUser && onLoginRequired) {
      onLoginRequired();
      return;
    }

    const orderPayload = {
      title: `${activeCategory.title}: ${activeStyle.name}`,
      category: activeCategory.title,
      style: activeStyle.name,
      fitType,
      collarType,
      cuffType,
      customNotes,
      fabric: {
        source: fabricSource === 'stitchbee' ? 'StitchBeez Premium Fabric' : 'Customer Provided Fabric',
        name: fabricSource === 'stitchbee' ? activeFabric.name : ownFabricType,
        meters: fabricSource === 'stitchbee' ? '2.5 Meters' : '3.0 Meters'
      },
      tailor: {
        name: activeTailor.name,
        locality: activeTailor.locality,
        rating: activeTailor.rating,
        phone: activeTailor.phone
      },
      measurement: {
        mode: measurementMode === 'ai' ? 'Touchless AI 3D Camera Scan' :
              measurementMode === 'manual' ? 'Manual Customer Sizing' :
              measurementMode === 'home-visit' ? 'Doorstep Fit Expert Home Visit (₹99)' :
              'Master Tailor Atelier Studio Visit',
        slot: appointmentSlot,
        details: measurementMode === 'manual' ? manualSizes : null
      },
      pricing: {
        stitchingCharge,
        fabricCharge,
        measurementFee,
        deliveryCharge,
        total: totalAmount
      },
      deliveryEstimate: 'Delivered in 4 - 6 Days'
    };

    const saved = saveMenStitchingOrder(orderPayload);
    setConfirmedOrder(saved);
    setCurrentStep(6);
    showToast('Bespoke Stitching Order Placed Successfully!');
  };

  return (
    <div className={`men-tailor-workflow-page ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Top Navigation Bar */}
      <div className="men-workflow-topbar">
        <div className="men-workflow-topbar-inner">
          <button 
            type="button" 
            onClick={onBackToLanding} 
            className="men-back-to-landing-btn"
          >
            <ArrowLeft size={16} /> Back to Men's Stitching
          </button>

          <div className="men-workflow-stepper-pills">
            {[
              { num: 1, label: 'Style & Outfit' },
              { num: 2, label: 'Fabric' },
              { num: 3, label: 'Select Tailor (Map)' },
              { num: 4, label: 'Measurements' },
              { num: 5, label: 'Quotation' },
              { num: 6, label: 'Confirmation' }
            ].map(s => (
              <div 
                key={s.num} 
                className={`step-pill ${currentStep === s.num ? 'active' : ''} ${currentStep > s.num ? 'completed' : ''}`}
                onClick={() => {
                  if (currentStep !== 6 && s.num < currentStep) setCurrentStep(s.num);
                }}
              >
                <span className="step-num">{currentStep > s.num ? '✓' : s.num}</span>
                <span className="step-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="men-workflow-body-container">
        {/* =================================================================== */}
        {/* STEP 1: CHOOSE OUTFIT & CUSTOMIZATION                               */}
        {/* =================================================================== */}
        {currentStep === 1 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 1 OF 5</span>
              <h2 className="step-title">Choose Outfit & Customization</h2>
              <p className="step-sub">Select your garment category, base cut, and custom design details.</p>
            </div>

            {/* Category Selector Horizontal Tabs */}
            <div className="men-category-tabs-row">
              {MEN_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  className={`men-cat-pill-tab ${selectedCatId === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCatId(cat.id);
                    const matching = MEN_POPULAR_STYLES.filter(s => s.category === cat.id);
                    if (matching.length > 0) setSelectedStyleId(matching[0].id);
                  }}
                >
                  <img src={cat.image} alt={cat.title} className="cat-pill-thumb" />
                  <span>{cat.title}</span>
                </button>
              ))}
            </div>

            {/* Base Styles Grid */}
            <div className="step-section-heading">
              <h3>Select Base Silhouette ({activeCategory.title})</h3>
              <p>Each style is custom-tailored to your precise measurements.</p>
            </div>

            <div className="men-styles-selection-grid">
              {displayStyles.map(style => (
                <div 
                  key={style.id}
                  className={`men-style-select-card ${selectedStyleId === style.id ? 'active' : ''}`}
                  onClick={() => setSelectedStyleId(style.id)}
                >
                  <div className="style-card-img-wrap">
                    <img src={style.image} alt={style.name} className="style-select-img" />
                    {selectedStyleId === style.id && (
                      <div className="style-selected-badge">
                        <Check size={14} /> Selected
                      </div>
                    )}
                  </div>
                  <div className="style-card-info">
                    <h4>{style.name}</h4>
                    <p className="style-desc">{style.desc}</p>
                    <div className="style-meta-row">
                      <span className="style-price">Starts ₹{style.startingPrice?.toLocaleString()}</span>
                      <span className="style-lead">{style.leadTime || '4 - 6 Days'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tailoring Specs: Fit, Collar, Cuffs, Notes */}
            <div className="step-section-heading" style={{ marginTop: '28px' }}>
              <h3>Custom Fit & Styling Preferences</h3>
            </div>

            <div className="men-tailoring-specs-grid">
              <div className="spec-group">
                <label>Silhouetted Fit</label>
                <div className="spec-options-row">
                  {['Slim Fit', 'Modern Regular', 'Classic Relaxed'].map(f => (
                    <button
                      key={f}
                      type="button"
                      className={`spec-pill-btn ${fitType === f ? 'active' : ''}`}
                      onClick={() => setFitType(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="spec-group">
                <label>Collar Type</label>
                <div className="spec-options-row">
                  {['Spread Collar', 'Cutaway Collar', 'Button-Down', 'Mandarin Bandhgala'].map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`spec-pill-btn ${collarType === c ? 'active' : ''}`}
                      onClick={() => setCollarType(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="spec-group">
                <label>Cuffs Configuration</label>
                <div className="spec-options-row">
                  {['French Double Cuffs', 'Single Button Barrel', 'Mitred Convertible'].map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`spec-pill-btn ${cuffType === c ? 'active' : ''}`}
                      onClick={() => setCuffType(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="spec-group full-width">
                <label>Special Tailoring Instructions & Monogram</label>
                <input 
                  type="text" 
                  value={customNotes} 
                  onChange={e => setCustomNotes(e.target.value)}
                  placeholder="e.g. Monogram 'A.M.' on left cuff, 2.5 inch lapel width, ticket pocket..."
                  className="men-input-field"
                />
              </div>
            </div>

            <div className="workflow-bottom-nav">
              <div />
              <button 
                type="button" 
                onClick={() => setCurrentStep(2)} 
                className="men-workflow-primary-btn"
              >
                Proceed to Fabric Selection <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 2: SELECT FABRIC OPTION                                        */}
        {/* =================================================================== */}
        {currentStep === 2 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 2 OF 5</span>
              <h2 className="step-title">Select Fabric Option</h2>
              <p className="step-sub">Select from StitchBeez curated luxury fabrics or provide your own material.</p>
            </div>

            <div className="fabric-source-toggle-row">
              <button 
                type="button"
                className={`source-toggle-card ${fabricSource === 'stitchbee' ? 'active' : ''}`}
                onClick={() => setFabricSource('stitchbee')}
              >
                <div className="source-icon-wrap">
                  <Layers size={22} />
                </div>
                <div>
                  <h4>StitchBeez Curated Luxury Fabrics</h4>
                  <p>10 premium materials: Raymond wool, Egyptian Giza cotton, Belgian linen & raw silks.</p>
                </div>
              </button>

              <button 
                type="button"
                className={`source-toggle-card ${fabricSource === 'own' ? 'active' : ''}`}
                onClick={() => setFabricSource('own')}
              >
                <div className="source-icon-wrap">
                  <Truck size={22} />
                </div>
                <div>
                  <h4>I Will Provide My Own Fabric</h4>
                  <p>Free doorstep pickup. Our delivery agent collects your unstitched fabric from home.</p>
                </div>
              </button>
            </div>

            {fabricSource === 'stitchbee' ? (
              <div style={{ marginTop: '24px' }}>
                <div className="step-section-heading">
                  <h3>Choose Material (10 Luxury Swatches)</h3>
                  <p>High-res woven fabrics with certified GSM and composition.</p>
                </div>

                <div className="men-fabrics-select-grid">
                  {MEN_FABRICS.map(fab => (
                    <div 
                      key={fab.id} 
                      className={`men-fabric-card-selectable ${selectedFabricId === fab.id ? 'active' : ''}`}
                      onClick={() => setSelectedFabricId(fab.id)}
                    >
                      <div className="fabric-select-img-wrap">
                        <img src={fab.image} alt={fab.name} className="fabric-select-img" />
                        {selectedFabricId === fab.id && (
                          <div className="fabric-selected-check">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                      <div className="fabric-select-meta">
                        <div className="fabric-title-row">
                          <span className="fab-name">{fab.name}</span>
                          <span className="fab-price">₹{fab.pricePerMeter}/m</span>
                        </div>
                        <span className="fab-type">{fab.type}</span>
                        <p className="fab-desc">{fab.desc.substring(0, 60)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="own-fabric-form-box">
                <div className="step-section-heading">
                  <h3>Doorstep Fabric Pickup Details</h3>
                  <p>Our rider will arrive with an authenticated tamper-proof StitchBeez garment bag.</p>
                </div>

                <div className="own-fabric-fields-grid">
                  <div className="form-field">
                    <label>Fabric Type & Meters</label>
                    <input 
                      type="text" 
                      value={ownFabricType} 
                      onChange={e => setOwnFabricType(e.target.value)}
                      className="men-input-field" 
                      placeholder="e.g. Raymond Charcoal Wool (3.25 meters)"
                    />
                  </div>

                  <div className="form-field">
                    <label>Pickup Address</label>
                    <input 
                      type="text" 
                      value={pickupAddress} 
                      onChange={e => setPickupAddress(e.target.value)}
                      className="men-input-field" 
                      placeholder="Enter flat number, apartment, locality"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="workflow-bottom-nav">
              <button 
                type="button" 
                onClick={() => setCurrentStep(1)} 
                className="men-workflow-secondary-btn"
              >
                <ArrowLeft size={16} /> Back to Outfit
              </button>

              <button 
                type="button" 
                onClick={() => setCurrentStep(3)} 
                className="men-workflow-primary-btn"
              >
                Proceed to Select Tailor (Map) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 3: SELECT VERIFIED TAILOR FROM GOOGLE MAP                      */}
        {/* =================================================================== */}
        {currentStep === 3 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 3 OF 5</span>
              <h2 className="step-title">Select Nearby Verified Tailor from Google Map</h2>
              <p className="step-sub">Select verified master tailors plotted on Google Maps across Bengaluru with ratings & portfolio.</p>
            </div>

            {/* Quick Locality Selector Pills */}
            <div className="locality-pills-row">
              <span className="locality-label"><MapPin size={14} /> Quick Area:</span>
              {QUICK_LOCALITIES.map(loc => (
                <button
                  key={loc.name}
                  type="button"
                  className={`locality-btn ${selectedLocality.name === loc.name ? 'active' : ''}`}
                  onClick={() => setSelectedLocality(loc)}
                >
                  {loc.name}
                </button>
              ))}
            </div>

            {/* Map + Tailor Cards Split View */}
            <div className="men-map-split-container">
              {/* Left Side: Tailor Cards List */}
              <div className="men-tailors-sidebar-list">
                {MEN_VERIFIED_TAILORS.map(tailor => {
                  const isSelected = selectedTailorId === tailor.id;
                  return (
                    <div 
                      key={tailor.id}
                      className={`men-tailor-sidebar-card ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedTailorId(tailor.id);
                        if (mapInstanceRef.current) {
                          mapInstanceRef.current.setView([tailor.lat, tailor.lng], 14, { animate: true });
                        }
                      }}
                    >
                      <div className="tailor-card-top">
                        <img src={tailor.image} alt={tailor.name} className="tailor-avatar-img" />
                        <div style={{ flex: 1 }}>
                          <div className="tailor-title-row">
                            <h4>{tailor.name}</h4>
                            <span className="tailor-rating">★ {tailor.rating}</span>
                          </div>
                          <span className="tailor-owner">{tailor.owner}</span>
                          <span className="tailor-locality"><MapPin size={11} /> {tailor.locality}</span>
                        </div>
                      </div>

                      <div className="tailor-badges-row">
                        <span className="t-badge">{tailor.badge}</span>
                        <span className="t-badge distance">{tailor.distanceKm} km away</span>
                        <span className="t-badge delivery">{tailor.deliveryDays}</span>
                      </div>

                      <div className="tailor-card-bottom">
                        <span className="t-price">Starts <strong>₹{tailor.startingPrice}</strong></span>
                        <button 
                          type="button"
                          className={`select-tailor-btn ${isSelected ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTailorId(tailor.id);
                            showToast(`Selected ${tailor.name}`);
                          }}
                        >
                          {isSelected ? '✓ Selected' : 'Select Tailor'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Side: Interactive Leaflet Map */}
              <div className="men-map-view-wrapper">
                <div ref={mapContainerRef} className="men-interactive-leaflet-map" />
                <div className="map-overlay-helper">
                  <span>Click any pin to select tailor • Scroll to zoom</span>
                </div>
              </div>
            </div>

            <div className="workflow-bottom-nav">
              <button 
                type="button" 
                onClick={() => setCurrentStep(2)} 
                className="men-workflow-secondary-btn"
              >
                <ArrowLeft size={16} /> Back to Fabric
              </button>

              <button 
                type="button" 
                onClick={() => setCurrentStep(4)} 
                className="men-workflow-primary-btn"
              >
                Proceed to Measurements <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 4: PRECISION MEASUREMENT OPTIONS                               */}
        {/* =================================================================== */}
        {currentStep === 4 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 4 OF 5</span>
              <h2 className="step-title">Choose Measurement Method</h2>
              <p className="step-sub">Select how you'd like your exact tailoring dimensions recorded.</p>
            </div>

            <div className="measurement-options-grid">
              {/* Option 1: AI Body Scan */}
              <div 
                className={`meas-card ${measurementMode === 'ai' ? 'active' : ''}`}
                onClick={() => setMeasurementMode('ai')}
              >
                <div className="meas-icon-box ai">
                  <Camera size={24} />
                </div>
                <h4>Touchless AI Camera Scan</h4>
                <p>30-second 3D body calibration with your phone camera. 99.4% precision fit.</p>
                <span className="meas-tag">Zero Contact • Instant</span>
              </div>

              {/* Option 2: Doorstep Fit Expert */}
              <div 
                className={`meas-card ${measurementMode === 'home-visit' ? 'active' : ''}`}
                onClick={() => setMeasurementMode('home-visit')}
              >
                <div className="meas-icon-box home">
                  <User size={24} />
                </div>
                <h4>Doorstep Fit Expert Visit</h4>
                <p>Certified male fit-helper visits your home with master measuring tape & fabric samples.</p>
                <span className="meas-tag price">₹99 Home Visit</span>
              </div>

              {/* Option 3: Manual Sizing */}
              <div 
                className={`meas-card ${measurementMode === 'manual' ? 'active' : ''}`}
                onClick={() => setMeasurementMode('manual')}
              >
                <div className="meas-icon-box manual">
                  <SlidersHorizontal size={24} />
                </div>
                <h4>Enter Measurements Manually</h4>
                <p>Provide your existing chest, waist, shoulder, collar, and sleeve dimensions.</p>
                <span className="meas-tag">Self-Assisted</span>
              </div>

              {/* Option 4: Tailor Atelier Visit */}
              <div 
                className={`meas-card ${measurementMode === 'tailor-visit' ? 'active' : ''}`}
                onClick={() => setMeasurementMode('tailor-visit')}
              >
                <div className="meas-icon-box shop">
                  <Scissors size={24} />
                </div>
                <h4>Visit {activeTailor.name.split(' ')[0]}'s Atelier</h4>
                <p>Visit the master tailor's shop directly in {activeTailor.locality} for trial & fitting.</p>
                <span className="meas-tag">Free Shop Visit</span>
              </div>
            </div>

            {/* Sub-view based on selection */}
            {measurementMode === 'ai' && (
              <div className="meas-detail-box">
                <h4>Touchless AI 3D Camera Scan</h4>
                <p>Our computer vision algorithm calculates 18 anatomical points without storing images.</p>
                {aiScanStatus === 'idle' && (
                  <button type="button" onClick={handleStartAIScan} className="men-btn-pink" style={{ marginTop: '12px' }}>
                    <Camera size={16} /> Launch Simulated AI Camera Scan
                  </button>
                )}
                {aiScanStatus === 'scanning' && (
                  <div className="scanning-indicator">
                    <div className="spinner-ring" />
                    <span>Calibrating posture, chest contour, shoulder slope...</span>
                  </div>
                )}
                {aiScanStatus === 'done' && (
                  <div className="scan-success-banner">
                    <CheckCircle2 size={20} color="#10B981" />
                    <span>Calibrated: Chest 40", Waist 33", Shoulder 18", Collar 15.5", Sleeve 25.5" (99.4% Match)</span>
                  </div>
                )}
              </div>
            )}

            {measurementMode === 'home-visit' && (
              <div className="meas-detail-box">
                <h4>Schedule Doorstep Fit Helper Visit</h4>
                <div className="appointment-picker-row">
                  <div>
                    <label>Select Preferred Time Slot</label>
                    <select 
                      value={appointmentSlot} 
                      onChange={e => setAppointmentSlot(e.target.value)}
                      className="men-select-field"
                    >
                      <option>Tomorrow, 10:00 AM - 11:30 AM</option>
                      <option>Tomorrow, 11:30 AM - 01:00 PM</option>
                      <option>Tomorrow, 03:00 PM - 04:30 PM</option>
                      <option>Tomorrow, 05:00 PM - 06:30 PM</option>
                      <option>Day After Tomorrow, 11:00 AM - 12:30 PM</option>
                    </select>
                  </div>
                  <div>
                    <label>Home Visit Address</label>
                    <input 
                      type="text" 
                      value={pickupAddress} 
                      onChange={e => setPickupAddress(e.target.value)}
                      className="men-input-field" 
                    />
                  </div>
                </div>
              </div>
            )}

            {measurementMode === 'manual' && (
              <div className="meas-detail-box">
                <h4>Enter Manual Measurements (Inches)</h4>
                <div className="manual-sizes-grid">
                  {Object.entries(manualSizes).map(([k, v]) => (
                    <div key={k} className="size-input-item">
                      <label style={{ textTransform: 'capitalize' }}>{k} (inches)</label>
                      <input 
                        type="number" 
                        step="0.5"
                        value={v} 
                        onChange={e => setManualSizes({ ...manualSizes, [k]: e.target.value })}
                        className="men-input-field" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="workflow-bottom-nav">
              <button 
                type="button" 
                onClick={() => setCurrentStep(3)} 
                className="men-workflow-secondary-btn"
              >
                <ArrowLeft size={16} /> Back to Tailor
              </button>

              <button 
                type="button" 
                onClick={() => setCurrentStep(5)} 
                className="men-workflow-primary-btn"
              >
                Review Itemized Quotation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 5: REVIEW & ITEMIZED QUOTATION                                 */}
        {/* =================================================================== */}
        {currentStep === 5 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 5 OF 5</span>
              <h2 className="step-title">Review Stitching Quotation</h2>
              <p className="step-sub">Transparent pricing, verified tailor craftsmanship, and doorstep delivery.</p>
            </div>

            <div className="quotation-summary-grid">
              {/* Order Details Left */}
              <div className="quote-order-details">
                <div className="quote-header-item">
                  <img src={activeStyle.image} alt={activeStyle.name} className="quote-outfit-thumb" />
                  <div>
                    <span className="quote-cat-tag">{activeCategory.title}</span>
                    <h3>{activeStyle.name}</h3>
                    <span className="quote-spec">{fitType} • {collarType} • {cuffType}</span>
                  </div>
                </div>

                <div className="quote-specs-list">
                  <div className="q-spec-row">
                    <span>Fabric Choice:</span>
                    <strong>{fabricSource === 'stitchbee' ? `${activeFabric.name} (${activeFabric.type})` : ownFabricType}</strong>
                  </div>
                  <div className="q-spec-row">
                    <span>Selected Master Tailor:</span>
                    <strong>{activeTailor.name} ({activeTailor.locality})</strong>
                  </div>
                  <div className="q-spec-row">
                    <span>Measurement Mode:</span>
                    <strong>{measurementMode === 'ai' ? 'Touchless AI 3D Body Scan' : measurementMode === 'home-visit' ? 'Doorstep Fit Expert' : 'Manual Measurements'}</strong>
                  </div>
                  <div className="q-spec-row">
                    <span>Estimated Completion:</span>
                    <strong style={{ color: '#10B981' }}>Ready in 4 - 6 Days (Doorstep Delivery)</strong>
                  </div>
                </div>
              </div>

              {/* Price Breakdown Right */}
              <div className="quote-price-card">
                <h4>Transparent Quotation</h4>

                <div className="price-breakdown-table">
                  <div className="price-row">
                    <span>Custom Tailoring Labor:</span>
                    <span>₹{stitchingCharge.toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span>Fabric Cost (2.5m):</span>
                    <span>{fabricSource === 'stitchbee' ? `₹${fabricCharge.toLocaleString()}` : 'Provided by You (₹0)'}</span>
                  </div>
                  <div className="price-row">
                    <span>Measurement Visit:</span>
                    <span>{measurementFee > 0 ? `₹${measurementFee}` : 'FREE'}</span>
                  </div>
                  <div className="price-row">
                    <span>Doorstep Delivery & Trial:</span>
                    <span style={{ color: '#10B981', fontWeight: 700 }}>FREE (Promotion)</span>
                  </div>

                  <div className="price-total-row">
                    <span>Total Amount Payable:</span>
                    <span className="total-val">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={handleConfirmOrder} 
                  className="confirm-order-btn"
                >
                  Confirm & Place Stitching Order <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="workflow-bottom-nav">
              <button 
                type="button" 
                onClick={() => setCurrentStep(4)} 
                className="men-workflow-secondary-btn"
              >
                <ArrowLeft size={16} /> Back to Measurements
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 6: CONFIRMATION & LIVE TRACKING                                */}
        {/* =================================================================== */}
        {currentStep === 6 && confirmedOrder && (
          <div className="men-workflow-step-card success-card">
            <div className="success-badge-circle">
              <Check size={36} />
            </div>

            <span className="step-eyebrow" style={{ color: '#10B981' }}>ORDER CONFIRMED</span>
            <h2 className="step-title">Your Bespoke Stitching Order Has Been Booked!</h2>
            <p className="step-sub">
              Order ID: <strong>{confirmedOrder.orderId}</strong> • Placed on {confirmedOrder.orderDate}
            </p>

            {/* Tracking Progress Stepper */}
            <div className="order-tracking-bar-container">
              {[
                { label: 'Confirmed', done: true },
                { label: 'Fabric Received', done: false },
                { label: 'Pattern Cutting', done: false },
                { label: 'Master Stitching', done: false },
                { label: 'Doorstep Trial', done: false }
              ].map((trk, i) => (
                <div key={i} className={`track-node ${trk.done ? 'done' : ''}`}>
                  <div className="track-circle">{trk.done ? '✓' : i + 1}</div>
                  <span className="track-label">{trk.label}</span>
                </div>
              ))}
            </div>

            <div className="order-success-details-box">
              <div className="s-detail-item">
                <span>Garment:</span>
                <strong>{confirmedOrder.title}</strong>
              </div>
              <div className="s-detail-item">
                <span>Tailor Partner:</span>
                <strong>{confirmedOrder.tailor?.name}</strong>
              </div>
              <div className="s-detail-item">
                <span>Total Paid / Payable:</span>
                <strong style={{ color: '#FF008A' }}>₹{confirmedOrder.pricing?.total?.toLocaleString()}</strong>
              </div>
              <div className="s-detail-item">
                <span>Estimated Delivery:</span>
                <strong style={{ color: '#10B981' }}>{confirmedOrder.deliveryEstimate}</strong>
              </div>
            </div>

            <div className="success-actions-row">
              <button 
                type="button"
                onClick={onBackToLanding}
                className="men-workflow-primary-btn"
              >
                Back to Men's Stitching Hub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
