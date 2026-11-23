import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Check, Sparkles, Scissors, MapPin, 
  Ruler, ShieldCheck, Camera, Calendar, Clock, 
  ChevronRight, Layers, Award, User, Info, AlertCircle, Heart, Star
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  WOMEN_CATEGORIES, 
  WOMEN_FABRICS, 
  WOMEN_PROVIDERS, 
  WOMEN_MOST_LOVED 
} from '../../utils/womenStore';
import './WomenTailorWorkflowPage.css';

const QUICK_LOCALITIES = [
  { name: 'Indiranagar', lat: 12.9784, lng: 77.6408 },
  { name: 'Koramangala', lat: 12.9352, lng: 77.6245 },
  { name: 'HSR Layout', lat: 12.9121, lng: 77.6446 },
  { name: 'Jayanagar', lat: 12.9308, lng: 77.5838 },
  { name: 'Malleshwaram', lat: 13.0031, lng: 77.5643 },
  { name: 'Whitefield', lat: 12.9698, lng: 77.7500 }
];

export default function WomenTailorWorkflowPage({
  currentUser,
  theme = 'light',
  initialCategory = 'sarees',
  initialStyle = null,
  initialFabric = null,
  onBack,
  showToast = () => {}
}) {
  // Stepper: 1: Outfit & Style, 2: Fabric, 3: Tailor (Google Maps), 4: Measurements, 5: Quotation, 6: Confirmed
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Category & Style
  const [selectedCatId, setSelectedCatId] = useState(initialCategory || 'sarees');
  const [selectedStyle, setSelectedStyle] = useState(initialStyle || WOMEN_MOST_LOVED[0]);
  const [fitPreference, setFitPreference] = useState('Comfort Fit');
  const [liningOption, setLiningOption] = useState('Cotton Lining (Breathable)');
  const [customNotes, setCustomNotes] = useState('');

  // Step 2: Fabric Mode
  const [fabricMode, setFabricMode] = useState(initialFabric ? 'stitchbee' : 'stitchbee');
  const [selectedFabric, setSelectedFabric] = useState(initialFabric || WOMEN_FABRICS[0]);
  const [ownFabricDetails, setOwnFabricDetails] = useState({
    type: 'Pure Silk Saree Material',
    meters: '5.5',
    notes: 'Delicate handloom zari border, needs gentle stitching',
    pickupAddress: 'Indiranagar 100ft Road, Bengaluru - 560038'
  });

  // Step 3: Google Maps & Tailor Selection
  const [selectedTailor, setSelectedTailor] = useState(WOMEN_PROVIDERS[0]);
  const [mapSearchLocality, setMapSearchLocality] = useState('Bengaluru');
  const [mapRadiusKm, setMapRadiusKm] = useState(10);
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  // Step 4: Measurements
  const [measurementMode, setMeasurementMode] = useState('ai_scan'); // 'ai_scan' | 'manual' | 'doorstep' | 'atelier'
  const [aiScanDone, setAiScanDone] = useState(false);
  const [aiScanning, setAiScanning] = useState(false);
  const [manualMeasurements, setManualMeasurements] = useState({
    bust: '34',
    waist: '28',
    hips: '36',
    shoulder: '14',
    armLength: '21',
    outfitLength: '48'
  });
  const [doorstepSlot, setDoorstepSlot] = useState('Tomorrow, 10:00 AM');
  const [doorstepAddress, setDoorstepAddress] = useState('Indiranagar 100ft Road, Bengaluru - 560038');

  // Step 5 & 6: Order state
  const [orderId, setOrderId] = useState(null);

  const selectedCategoryObj = WOMEN_CATEGORIES.find(c => c.id === selectedCatId) || WOMEN_CATEGORIES[0];

  // Pricing calculations
  const baseStitchingPrice = selectedCategoryObj?.startingPrice || 999;
  const fabricCost = fabricMode === 'stitchbee' ? (selectedFabric ? (selectedFabric.price || 0) * 2 : 1200) : 0;
  const measurementServiceFee = measurementMode === 'doorstep' ? 149 : 0;
  const liningFee = liningOption.includes('Cotton') ? 199 : 349;
  const subtotal = baseStitchingPrice + fabricCost + measurementServiceFee + liningFee;
  const gst = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + gst;

  // Initialize interactive Leaflet Google Map for Step 3 safely
  useEffect(() => {
    if (currentStep !== 3) {
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove();
        } catch (e) {
          // ignore
        }
        leafletMapRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current) return;
    const Leaflet = window.L || L;
    if (!Leaflet) return;

    // If map already initialized, just update view safely
    if (leafletMapRef.current) {
      if (selectedTailor?.lat && selectedTailor?.lng) {
        try {
          leafletMapRef.current.setView([selectedTailor.lat, selectedTailor.lng], 13);
        } catch (e) {
          // ignore
        }
      }
      return;
    }

    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;
      try {
        const map = Leaflet.map(mapContainerRef.current, {
          center: [selectedTailor?.lat || 12.965, selectedTailor?.lng || 77.62],
          zoom: 12,
          scrollWheelZoom: false
        });

        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap | StitchBeez Tailors',
          maxZoom: 18
        }).addTo(map);

        leafletMapRef.current = map;
        markersRef.current = [];

        WOMEN_PROVIDERS.forEach(tailor => {
          const isSelected = selectedTailor && selectedTailor.id === tailor.id;
          const markerHtml = `
            <div style="background: ${isSelected ? '#071B49' : '#FF008A'}; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold; border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.3); cursor: pointer;">
              ✂
            </div>
          `;
          const icon = Leaflet.divIcon({ html: markerHtml, className: 'women-map-pin', iconSize: [28, 28], iconAnchor: [14, 14] });
          const marker = Leaflet.marker([tailor.lat, tailor.lng], { icon }).addTo(map);
          marker.on('click', () => {
            setSelectedTailor(tailor);
          });
          markersRef.current.push(marker);
        });

        if (selectedTailor?.lat && selectedTailor?.lng) {
          map.setView([selectedTailor.lat, selectedTailor.lng], 13);
        }

        setTimeout(() => {
          try {
            map.invalidateSize();
          } catch (e) {}
        }, 200);
      } catch (err) {
        console.warn("Leaflet map initialization skipped:", err);
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove();
        } catch (e) {
          // ignore
        }
        leafletMapRef.current = null;
      }
    };
  }, [currentStep, selectedTailor]);

  // AI Scan Simulator
  const handleStartAiScan = () => {
    setAiScanning(true);
    setTimeout(() => {
      setAiScanning(false);
      setAiScanDone(true);
      showToast('AI Body Scan Complete! Precision accuracy calculated (99.4%)');
    }, 2400);
  };

  const handleConfirmOrder = () => {
    const generatedId = 'SBW-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setCurrentStep(6);
    showToast(`Stitching Order #${generatedId} confirmed! Tailor assigned.`);
  };

  return (
    <div className={`women-tailor-page-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {/* Top Header Strip */}
      <div className="women-workflow-header-strip">
        <div className="women-workflow-header-container">
          <button type="button" onClick={onBack} className="women-back-link-btn">
            <ArrowLeft size={16} /> Back to Women's Stitching
          </button>
          <div className="women-workflow-title-block">
            <span className="workflow-badge">VERIFIED WOMEN'S TAILORING WORKFLOW</span>
            <h1 className="workflow-page-title">Custom Outfit Stitching & Tailor Booking</h1>
          </div>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="women-stepper-wrap">
        <div className="women-stepper-container">
          {[
            { step: 1, label: 'Outfit & Style' },
            { step: 2, label: 'Fabric Selection' },
            { step: 3, label: 'Choose Tailor' },
            { step: 4, label: 'Measurements' },
            { step: 5, label: 'Review & Quotation' },
            { step: 6, label: 'Confirmed & Tracking' }
          ].map(s => (
            <div 
              key={s.step} 
              className={`women-step-node ${currentStep === s.step ? 'active' : ''} ${currentStep > s.step ? 'completed' : ''}`}
              onClick={() => {
                if (currentStep > s.step && currentStep !== 6) {
                  setCurrentStep(s.step);
                }
              }}
            >
              <div className="step-circle">
                {currentStep > s.step ? <Check size={14} /> : s.step}
              </div>
              <span className="step-text">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content Area */}
      <div className="women-workflow-content-wrap">
        <div className="women-workflow-content-container">

          {/* =================================================================== */}
          {/* STEP 1: OUTFIT & STYLE                                              */}
          {/* =================================================================== */}
          {currentStep === 1 && (
            <div className="workflow-step-card animate-fade-in">
              <div className="step-card-header">
                <h2>1. Choose Women's Outfit Category & Style</h2>
                <p>Select your category and customization preferences.</p>
              </div>

              {/* Category Pills */}
              <div className="workflow-cat-pills-row">
                {WOMEN_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`workflow-cat-pill ${selectedCatId === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCatId(cat.id)}
                  >
                    <img src={cat.image} alt={cat.name} className="pill-thumb" />
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Selected Category Details */}
              <div className="workflow-category-preview-box">
                <img src={selectedCategoryObj.image} alt={selectedCategoryObj.name} className="preview-img" />
                <div className="preview-info">
                  <h3>{selectedCategoryObj.name}</h3>
                  <p className="preview-sub">{selectedCategoryObj.subtitle}</p>
                  <p className="preview-desc">{selectedCategoryObj.description}</p>
                  <div className="preview-price-tag">Starting from ₹{selectedCategoryObj.startingPrice.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Customization Options */}
              <div className="workflow-options-grid">
                <div className="opt-block">
                  <label>Fit Preference</label>
                  <div className="opt-pills-row">
                    {['Tailored Fit', 'Comfort Fit', 'Flared & Flowy', 'Loose Silhouette'].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        className={`opt-pill ${fitPreference === opt ? 'active' : ''}`}
                        onClick={() => setFitPreference(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="opt-block">
                  <label>Inner Lining Selection</label>
                  <div className="opt-pills-row">
                    {['Cotton Lining (Breathable)', 'Butter Crepe Lining', 'Satin Silk Lining (+₹150)'].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        className={`opt-pill ${liningOption === opt ? 'active' : ''}`}
                        onClick={() => setLiningOption(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="opt-block" style={{ marginTop: '16px' }}>
                <label>Special Instructions / Neckline & Sleeve Requests</label>
                <textarea
                  rows={3}
                  className="workflow-textarea"
                  placeholder="e.g. Boat neck front, deep V back with latkans, 3/4 sleeves with embroidered borders..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                />
              </div>

              <div className="workflow-actions-row">
                <button type="button" onClick={onBack} className="women-btn-outline">
                  Cancel
                </button>
                <button type="button" onClick={() => setCurrentStep(2)} className="women-btn-pink">
                  Continue to Fabric Selection →
                </button>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* STEP 2: FABRIC SELECTION (STITCHBEEZ OR OWN FABRIC)                 */}
          {/* =================================================================== */}
          {currentStep === 2 && (
            <div className="workflow-step-card animate-fade-in">
              <div className="step-card-header">
                <h2>2. Select Fabric for Your Custom Outfit</h2>
                <p>Choose from StitchBeez premium luxury fabrics or provide your own cloth with free doorstep pickup.</p>
              </div>

              {/* Fabric Mode Toggle */}
              <div className="fabric-mode-toggle-row">
                <button
                  type="button"
                  className={`fabric-mode-pill ${fabricMode === 'stitchbee' ? 'active' : ''}`}
                  onClick={() => setFabricMode('stitchbee')}
                >
                  <Sparkles size={16} /> Choose from StitchBeez Fabrics
                </button>
                <button
                  type="button"
                  className={`fabric-mode-pill ${fabricMode === 'own' ? 'active' : ''}`}
                  onClick={() => setFabricMode('own')}
                >
                  <Layers size={16} /> I Will Provide My Own Fabric
                </button>
              </div>

              {/* StitchBeez Fabrics Grid */}
              {fabricMode === 'stitchbee' && (
                <div>
                  <div className="workflow-fabrics-grid">
                    {WOMEN_FABRICS.map(fab => (
                      <div
                        key={fab.id}
                        className={`workflow-fabric-card ${selectedFabric && selectedFabric.id === fab.id ? 'selected' : ''}`}
                        onClick={() => setSelectedFabric(fab)}
                      >
                        <img src={fab.image} alt={fab.name} className="fab-thumb" />
                        <div className="fab-info">
                          <h4>{fab.name}</h4>
                          <span className="fab-price">₹{fab.price}/m · {fab.tag}</span>
                          <p className="fab-desc">{fab.desc}</p>
                        </div>
                        {selectedFabric && selectedFabric.id === fab.id && (
                          <div className="fab-check-badge"><Check size={14} /></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Own Fabric Form */}
              {fabricMode === 'own' && (
                <div className="own-fabric-form-box">
                  <div className="info-banner">
                    <Info size={16} color="#FF008A" />
                    <span>Free Doorstep Fabric Pickup: Our courier partner will collect your fabric from your home.</span>
                  </div>

                  <div className="workflow-grid-2">
                    <div className="form-group">
                      <label>Fabric Description / Material Type</label>
                      <input
                        type="text"
                        className="workflow-input"
                        value={ownFabricDetails.type}
                        onChange={(e) => setOwnFabricDetails({ ...ownFabricDetails, type: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Fabric Length (meters)</label>
                      <input
                        type="text"
                        className="workflow-input"
                        value={ownFabricDetails.meters}
                        onChange={(e) => setOwnFabricDetails({ ...ownFabricDetails, meters: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label>Pickup Address in Bengaluru</label>
                    <input
                      type="text"
                      className="workflow-input"
                      value={ownFabricDetails.pickupAddress}
                      onChange={(e) => setOwnFabricDetails({ ...ownFabricDetails, pickupAddress: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="workflow-actions-row">
                <button type="button" onClick={() => setCurrentStep(1)} className="women-btn-outline">
                  ← Back to Style
                </button>
                <button type="button" onClick={() => setCurrentStep(3)} className="women-btn-pink">
                  Continue to Tailor Selection →
                </button>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* STEP 3: GOOGLE MAPS & TAILOR SELECTION                              */}
          {/* =================================================================== */}
          {currentStep === 3 && (
            <div className="workflow-step-card animate-fade-in">
              <div className="step-card-header">
                <h2>3. Find Verified Tailors Near You (Google Maps)</h2>
                <p>Discover top-rated verified women's tailors and boutique ateliers in Bengaluru.</p>
              </div>

              {/* Locality Quick Filter */}
              <div className="locality-pills-row">
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#071B49', alignSelf: 'center' }}>Locality:</span>
                {QUICK_LOCALITIES.map(loc => (
                  <button
                    key={loc.name}
                    type="button"
                    className={`loc-pill ${mapSearchLocality === loc.name ? 'active' : ''}`}
                    onClick={() => {
                      setMapSearchLocality(loc.name);
                      if (leafletMapRef.current) {
                        leafletMapRef.current.setView([loc.lat, loc.lng], 13);
                      }
                    }}
                  >
                    📍 {loc.name}
                  </button>
                ))}
              </div>

              {/* Map & Tailors Split View */}
              <div className="tailor-map-split-grid">
                {/* Interactive Leaflet Map */}
                <div className="map-view-column">
                  <div ref={mapContainerRef} className="workflow-leaflet-map" />
                  <div className="map-info-footer">
                    <span>Showing 6 verified tailors & designers within {mapRadiusKm} km</span>
                  </div>
                </div>

                {/* Provider Cards List */}
                <div className="tailor-cards-column">
                  {WOMEN_PROVIDERS.map(tailor => {
                    const isSelected = selectedTailor && selectedTailor.id === tailor.id;
                    return (
                      <div
                        key={tailor.id}
                        className={`workflow-tailor-item-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedTailor(tailor)}
                      >
                        <img src={tailor.image} alt={tailor.name} className="tailor-avatar" />
                        <div className="tailor-meta">
                          <div className="tailor-header-row">
                            <h4>{tailor.name}</h4>
                            <span className="dist-chip">{tailor.distance}</span>
                          </div>
                          <div className="tailor-rating-row">
                            <Star size={13} fill="#f59e0b" color="#f59e0b" />
                            <strong>{tailor.rating}</strong> ({tailor.reviewsCount}+ reviews)
                          </div>
                          <div className="tailor-spec-tag">{tailor.specialization}</div>
                          <div className="tailor-loc-tag">📍 {tailor.location}</div>
                        </div>
                        {isSelected && <div className="tailor-check-badge"><Check size={14} /></div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="workflow-actions-row">
                <button type="button" onClick={() => setCurrentStep(2)} className="women-btn-outline">
                  ← Back to Fabric
                </button>
                <button type="button" onClick={() => setCurrentStep(4)} className="women-btn-pink">
                  Continue with {selectedTailor?.name ? selectedTailor.name.split(' ')[0] : 'Tailor'} →
                </button>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* STEP 4: MEASUREMENTS                                                */}
          {/* =================================================================== */}
          {currentStep === 4 && (
            <div className="workflow-step-card animate-fade-in">
              <div className="step-card-header">
                <h2>4. Choose Your Preferred Measurement Method</h2>
                <p>We provide 4 flexible options to guarantee a millimeter-precise fit.</p>
              </div>

              {/* 4 Measurement Option Cards */}
              <div className="measurement-options-grid">
                <div 
                  className={`meas-option-card ${measurementMode === 'ai_scan' ? 'active' : ''}`}
                  onClick={() => setMeasurementMode('ai_scan')}
                >
                  <div className="meas-icon-box"><Camera size={22} /></div>
                  <h4>AI Touchless Camera Scan</h4>
                  <p>Hold your phone camera for 10 seconds. AI calculates 68 precision body points.</p>
                  <span className="meas-badge">Fastest · 99.4% Accurate</span>
                </div>

                <div 
                  className={`meas-option-card ${measurementMode === 'manual' ? 'active' : ''}`}
                  onClick={() => setMeasurementMode('manual')}
                >
                  <div className="meas-icon-box"><Ruler size={22} /></div>
                  <h4>Manual Measurement Entry</h4>
                  <p>Enter your measurements directly or copy from your favorite existing outfit.</p>
                  <span className="meas-badge">Custom Entry</span>
                </div>

                <div 
                  className={`meas-option-card ${measurementMode === 'doorstep' ? 'active' : ''}`}
                  onClick={() => setMeasurementMode('doorstep')}
                >
                  <div className="meas-icon-box"><User size={22} /></div>
                  <h4>Doorstep Measurement Visit</h4>
                  <p>A certified female fit-specialist visits your home with standard tailoring tape.</p>
                  <span className="meas-badge">+₹149 Visit Fee</span>
                </div>

                <div 
                  className={`meas-option-card ${measurementMode === 'atelier' ? 'active' : ''}`}
                  onClick={() => setMeasurementMode('atelier')}
                >
                  <div className="meas-icon-box"><MapPin size={22} /></div>
                  <h4>Visit {selectedTailor?.name ? selectedTailor.name.split(' ')[0] : 'Tailor'}'s Studio</h4>
                  <p>Visit the tailor directly in {selectedTailor?.location ? selectedTailor.location.split(',')[0] : 'Bengaluru'} for physical trial.</p>
                  <span className="meas-badge">Free Studio Visit</span>
                </div>
              </div>

              {/* AI Scan Container */}
              {measurementMode === 'ai_scan' && (
                <div className="meas-detail-box">
                  <div className="ai-scan-console">
                    {aiScanning ? (
                      <div className="scanning-active">
                        <div className="radar-spinner" />
                        <h4>Scanning Body Metrics via Touchless AI...</h4>
                        <p>Analyzing posture, bust circumference, waist taper, and shoulder slope</p>
                      </div>
                    ) : aiScanDone ? (
                      <div className="scan-success">
                        <div className="success-icon"><Check size={28} /></div>
                        <h4>AI Scan Profile Ready!</h4>
                        <p>Bust: 34.2" | Waist: 28.1" | Hips: 36.4" | Arm Length: 21.0" | Shoulder: 14.2"</p>
                      </div>
                    ) : (
                      <div>
                        <h4>Ready to Start 3D Touchless Scan</h4>
                        <p>Stand straight in front of your camera wearing fitted clothing.</p>
                        <button type="button" onClick={handleStartAiScan} className="women-btn-pink">
                          Launch AI Camera Scan Now →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Manual Form */}
              {measurementMode === 'manual' && (
                <div className="meas-detail-box">
                  <div className="workflow-grid-3">
                    {Object.keys(manualMeasurements).map(field => (
                      <div key={field} className="form-group">
                        <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()} (inches)</label>
                        <input
                          type="text"
                          className="workflow-input"
                          value={manualMeasurements[field]}
                          onChange={(e) => setManualMeasurements({ ...manualMeasurements, [field]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doorstep Booking */}
              {measurementMode === 'doorstep' && (
                <div className="meas-detail-box">
                  <div className="workflow-grid-2">
                    <div className="form-group">
                      <label>Preferred Visit Slot</label>
                      <select 
                        className="workflow-input"
                        value={doorstepSlot}
                        onChange={(e) => setDoorstepSlot(e.target.value)}
                      >
                        <option>Tomorrow, 10:00 AM - 12:00 PM</option>
                        <option>Tomorrow, 2:00 PM - 4:00 PM</option>
                        <option>Day After Tomorrow, 11:00 AM - 1:00 PM</option>
                        <option>Weekend Special Slot (Saturday 11 AM)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Visit Address</label>
                      <input
                        type="text"
                        className="workflow-input"
                        value={doorstepAddress}
                        onChange={(e) => setDoorstepAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="workflow-actions-row">
                <button type="button" onClick={() => setCurrentStep(3)} className="women-btn-outline">
                  ← Back to Tailor
                </button>
                <button type="button" onClick={() => setCurrentStep(5)} className="women-btn-pink">
                  Review Quotation & Pricing →
                </button>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* STEP 5: QUOTATION & REVIEW                                          */}
          {/* =================================================================== */}
          {currentStep === 5 && (
            <div className="workflow-step-card animate-fade-in">
              <div className="step-card-header">
                <h2>5. Review Stitching Quotation & Timeline</h2>
                <p>Transparent itemized breakdown with StitchBeez Perfect Fit Guarantee.</p>
              </div>

              <div className="quote-split-grid">
                {/* Summary Column */}
                <div className="quote-summary-col">
                  <h3>Order Specification</h3>
                  <div className="quote-meta-row">
                    <span>Category:</span>
                    <strong>{selectedCategoryObj?.name || 'Custom Outfit'}</strong>
                  </div>
                  <div className="quote-meta-row">
                    <span>Fit Preference:</span>
                    <strong>{fitPreference}</strong>
                  </div>
                  <div className="quote-meta-row">
                    <span>Fabric:</span>
                    <strong>{fabricMode === 'stitchbee' ? `${selectedFabric?.name || 'Selected Fabric'} (${selectedFabric?.material || 'Premium'})` : 'Customer-Owned Fabric'}</strong>
                  </div>
                  <div className="quote-meta-row">
                    <span>Assigned Master Tailor:</span>
                    <strong>{selectedTailor?.name || 'Master Tailor'} ({selectedTailor?.location || 'Bengaluru'})</strong>
                  </div>
                  <div className="quote-meta-row">
                    <span>Measurement Mode:</span>
                    <strong>{measurementMode.toUpperCase().replace('_', ' ')}</strong>
                  </div>
                  <div className="quote-meta-row">
                    <span>Estimated Completion:</span>
                    <strong style={{ color: '#FF008A' }}>4 Business Days</strong>
                  </div>

                  <div className="quote-guarantee-badge">
                    <ShieldCheck size={18} color="#FF008A" />
                    <span>Free Re-alteration Guarantee: If the fit is not 100% perfect, alterations are free within 14 days.</span>
                  </div>
                </div>

                {/* Price Breakdown Column */}
                <div className="quote-price-col">
                  <h3>Price Breakdown</h3>
                  <div className="price-item-row">
                    <span>Base Stitching Charge</span>
                    <span>₹{(baseStitchingPrice || 999).toLocaleString('en-IN')}</span>
                  </div>
                  {fabricCost > 0 && (
                    <div className="price-item-row">
                      <span>Fabric ({selectedFabric?.name || 'Fabric'})</span>
                      <span>₹{fabricCost.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="price-item-row">
                    <span>Lining ({liningOption.split(' ')[0]})</span>
                    <span>₹{liningFee.toLocaleString('en-IN')}</span>
                  </div>
                  {measurementServiceFee > 0 && (
                    <div className="price-item-row">
                      <span>Doorstep Measurement Visit</span>
                      <span>₹{measurementServiceFee}</span>
                    </div>
                  )}
                  <div className="price-item-row">
                    <span>Taxes & GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>

                  <div className="price-total-row">
                    <span>Total Amount Payable</span>
                    <span className="total-val">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <button type="button" onClick={handleConfirmOrder} className="women-btn-pink confirm-order-btn">
                    Confirm Stitching Order →
                  </button>
                </div>
              </div>

              <div className="workflow-actions-row">
                <button type="button" onClick={() => setCurrentStep(4)} className="women-btn-outline">
                  ← Back to Measurements
                </button>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* STEP 6: CONFIRMED & DELIVERY TRACKING                               */}
          {/* =================================================================== */}
          {currentStep === 6 && (
            <div className="workflow-step-card animate-fade-in" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div className="success-badge-large">
                <Check size={36} color="#FFFFFF" />
              </div>

              <h2 style={{ fontSize: '2rem', color: '#071B49', margin: '14px 0 6px 0' }}>
                Stitching Order Confirmed!
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0 0 24px 0' }}>
                Order <strong>#{orderId}</strong> has been assigned to <strong>{selectedTailor?.name || 'Master Tailor'}</strong>.
              </p>

              {/* Progress Stepper */}
              <div className="tracking-timeline-box">
                <div className="track-step active">
                  <div className="track-dot">1</div>
                  <span>Order Placed</span>
                </div>
                <div className="track-line active" />
                <div className="track-step active">
                  <div className="track-dot">2</div>
                  <span>Fabric Verification</span>
                </div>
                <div className="track-line" />
                <div className="track-step">
                  <div className="track-dot">3</div>
                  <span>Master Cutting</span>
                </div>
                <div className="track-line" />
                <div className="track-step">
                  <div className="track-dot">4</div>
                  <span>Stitching & Finishing</span>
                </div>
                <div className="track-line" />
                <div className="track-step">
                  <div className="track-dot">5</div>
                  <span>Delivery to Doorstep</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '30px' }}>
                <button type="button" onClick={onBack} className="women-btn-pink">
                  Back to Women's Tailoring Home →
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
