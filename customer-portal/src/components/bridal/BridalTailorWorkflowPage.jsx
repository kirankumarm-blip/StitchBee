import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Check, Sparkles, Scissors, MapPin, 
  Ruler, ShieldCheck, Camera, Calendar, Clock, 
  ChevronRight, Layers, Award, User, Info, AlertCircle, Heart
} from 'lucide-react';
import { 
  BRIDAL_CATEGORIES, 
  BRIDAL_FABRICS, 
  BRIDAL_PROVIDERS, 
  BRIDAL_TRENDING_STYLES 
} from '../../utils/bridalStore';
import './BridalTailorWorkflowPage.css';

const QUICK_LOCALITIES = [
  { name: 'Indiranagar', lat: 12.9784, lng: 77.6408 },
  { name: 'Koramangala', lat: 12.9352, lng: 77.6245 },
  { name: 'HSR Layout', lat: 12.9121, lng: 77.6446 },
  { name: 'Jayanagar', lat: 12.9308, lng: 77.5838 },
  { name: 'MG Road', lat: 12.9756, lng: 77.6066 },
  { name: 'Commercial Street', lat: 12.9822, lng: 77.6083 }
];

export default function BridalTailorWorkflowPage({
  currentUser,
  theme = 'light',
  initialCategory = 'bridal-lehengas',
  initialStyle = null,
  initialFabric = null,
  onBack,
  showToast = () => {}
}) {
  // Stepper: 1: Style & Silhouette, 2: Fabric, 3: Tailor/Designer (Google Maps), 4: Measurements, 5: Quotation, 6: Confirmed
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Category & Silhouette
  const [selectedCatId, setSelectedCatId] = useState(initialCategory || 'bridal-lehengas');
  const [selectedStyle, setSelectedStyle] = useState(initialStyle || BRIDAL_TRENDING_STYLES[0]);
  const [fitPreference, setFitPreference] = useState('Tailored Fit');
  const [embellishmentTier, setEmbellishmentTier] = useState('Royal Zardozi (Heavy)');
  const [customNotes, setCustomNotes] = useState('');

  // Dual Couple configuration
  const [couplePalette, setCouplePalette] = useState('Maroon & Antique Gold');
  const [groomOutfitChoice, setGroomOutfitChoice] = useState('Royal Sherwani');
  const [brideOutfitChoice, setBrideOutfitChoice] = useState('Embroidered Lehenga');

  // Step 2: Fabric Mode
  const [fabricMode, setFabricMode] = useState(initialFabric ? 'stitchbee' : 'stitchbee'); // 'stitchbee' | 'own'
  const [selectedFabric, setSelectedFabric] = useState(initialFabric || BRIDAL_FABRICS[0]);
  const [ownFabricDetails, setOwnFabricDetails] = useState({
    type: 'Pure Silk Heirlooms',
    meters: '6.5',
    notes: 'Handloom family silk fabric, handle with delicate zari needles',
    pickupAddress: 'Prestige Lakeside Habitat, Tower 14, Bengaluru - 560087'
  });

  // Step 3: Google Maps & Tailor/Designer Selection
  const [selectedTailor, setSelectedTailor] = useState(BRIDAL_PROVIDERS[0]);
  const [mapSearchLocality, setMapSearchLocality] = useState('Bengaluru');
  const [mapRadiusKm, setMapRadiusKm] = useState(15);
  const [selectedProviderType, setSelectedProviderType] = useState('all'); // 'all' | 'tailor' | 'designer'
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  // Step 4: Measurements
  const [measurementMode, setMeasurementMode] = useState('ai_scan'); // 'ai_scan' | 'manual' | 'doorstep' | 'atelier'
  const [aiScanDone, setAiScanDone] = useState(false);
  const [aiScanning, setAiScanning] = useState(false);
  const [manualMeasurements, setManualMeasurements] = useState({
    chest: '36',
    waist: '30',
    hips: '39',
    shoulder: '15',
    length: '43',
    sleeves: '21',
    // Groom measurements for couple outfit
    groomChest: '40',
    groomWaist: '34',
    groomShoulder: '18',
    groomLength: '45'
  });

  // Step 5: Itemized Order & Tracking
  const [orderConfirmedData, setOrderConfirmedData] = useState(null);

  // Initialize or update Leaflet Google Maps
  useEffect(() => {
    if (currentStep !== 3 || !mapContainerRef.current) return;

    const L = window.L;
    if (!L) {
      console.warn('Leaflet library is loading or unavailable.');
      return;
    }

    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapContainerRef.current, {
        center: [12.9716, 77.5946], // Bengaluru center
        zoom: 12,
        scrollWheelZoom: false
      });

      // Google-like clean light tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors | StitchBeez Bridal Maps',
        maxZoom: 18
      }).addTo(leafletMapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Filter providers
    const filteredProviders = BRIDAL_PROVIDERS.filter(p => {
      if (selectedProviderType === 'tailor') return !p.isDesigner;
      if (selectedProviderType === 'designer') return p.isDesigner;
      return true;
    });

    // Add markers
    filteredProviders.forEach(provider => {
      const isSelected = selectedTailor && selectedTailor.id === provider.id;

      // Custom Pink StitchBeez Pin
      const customPin = L.divIcon({
        className: 'custom-bridal-map-pin',
        html: `
          <div style="
            background: ${isSelected ? '#071B49' : '#FF008A'};
            color: #FFFFFF;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid #FFFFFF;
            box-shadow: 0 4px 12px rgba(255, 0, 138, 0.4);
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            ♥
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([provider.lat, provider.lng], { icon: customPin })
        .addTo(leafletMapRef.current)
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; min-width: 170px;">
            <div style="font-weight: 800; color: #071B49; font-size: 14px;">${provider.name}</div>
            <div style="color: #FF008A; font-size: 12px; font-weight: 600;">${provider.type}</div>
            <div style="color: #64748B; font-size: 11px; margin-top: 2px;">★ ${provider.rating} (${provider.reviewsCount}+ reviews)</div>
            <div style="color: #334155; font-size: 11px; margin-top: 4px;">${provider.location}</div>
          </div>
        `);

      marker.on('click', () => {
        setSelectedTailor(provider);
      });

      markersRef.current.push(marker);
    });

    // Center map to selected tailor
    if (selectedTailor) {
      leafletMapRef.current.panTo([selectedTailor.lat, selectedTailor.lng], { animate: true });
    }
  }, [currentStep, selectedTailor, selectedProviderType]);

  // Handle AI Scan Simulation
  const handleStartAiScan = () => {
    setAiScanning(true);
    setTimeout(() => {
      setAiScanning(false);
      setAiScanDone(true);
      showToast('3D Bridal AI Scan complete! 34 ergonomic fit coordinates calibrated.');
    }, 2500);
  };

  // Pricing Calculation
  const isCouple = selectedCatId === 'couple-outfits';
  const baseStitchingPrice = selectedStyle ? selectedStyle.startingPrice : 5999;
  const fabricPrice = fabricMode === 'stitchbee' && selectedFabric ? (selectedFabric.pricePerMeter * (isCouple ? 9 : 5)) : 0;
  const embroideryCharge = embellishmentTier.includes('Heavy') ? 3500 : 1800;
  const pickupFee = fabricMode === 'own' ? 149 : 0;
  const measurementFee = measurementMode === 'doorstep' ? 99 : 0;
  const subtotal = baseStitchingPrice + fabricPrice + embroideryCharge + pickupFee + measurementFee;
  const gst = Math.round(subtotal * 0.05);
  const totalPrice = subtotal + gst;

  // Confirm Order Handler
  const handleConfirmOrder = () => {
    const orderId = `SBZ-BRL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      category: 'Bridal Stitching & Tailoring',
      categoryKey: 'bridal',
      title: `${selectedStyle ? selectedStyle.name : 'Bridal Ensemble'} (${fitPreference})`,
      style: selectedStyle ? selectedStyle.name : 'Bespoke Bridal',
      fabric: fabricMode === 'stitchbee' ? selectedFabric?.name : 'Customer Heirloom Fabric',
      provider: selectedTailor?.name,
      providerType: selectedTailor?.type,
      location: selectedTailor?.location,
      measurementMode: measurementMode,
      totalAmount: totalPrice,
      status: 'Order Confirmed',
      orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      estimatedDelivery: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      steps: [
        { name: 'Order Confirmed', date: 'Today', completed: true },
        { name: 'Fabric Picked & QC', date: 'In 2 Days', completed: false, active: true },
        { name: 'Master Cutting & Zari', date: 'In 5 Days', completed: false },
        { name: 'Bespoke Fitting Trial', date: 'In 9 Days', completed: false },
        { name: 'Bridal Delivery', date: 'In 12 Days', completed: false }
      ]
    };

    // Sync to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('stichbee_orders') || '[]');
      localStorage.setItem('stichbee_orders', JSON.stringify([newOrder, ...existing]));
    } catch (e) {
      console.warn('Could not sync order to localStorage', e);
    }

    setOrderConfirmedData(newOrder);
    setCurrentStep(6);
    showToast(`Bridal Order ${orderId} created successfully!`);
  };

  return (
    <div className={`bridal-workflow-page-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {/* Top Header Strip */}
      <div className="bridal-workflow-header-strip">
        <div className="bridal-workflow-header-container">
          <button 
            type="button" 
            onClick={onBack} 
            className="bridal-workflow-back-btn"
          >
            <ArrowLeft size={18} />
            <span>Back to Bridal Hub</span>
          </button>

          <div className="bridal-workflow-header-title">
            <h2>Bespoke Bridal Tailoring & Couture Studio</h2>
            <span className="sub">Step {currentStep} of 5 — {
              currentStep === 1 ? 'Outfit Style & Silhouette' :
              currentStep === 2 ? 'Fabric Selection' :
              currentStep === 3 ? 'Verified Tailor / Designer via Google Maps' :
              currentStep === 4 ? 'Measurements & Fitting Method' :
              currentStep === 5 ? 'Quotation & Order Review' : 'Order Confirmed'
            }</span>
          </div>

          <div className="bridal-workflow-step-pills">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step} 
                className={`step-circle-pill ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                onClick={() => {
                  if (currentStep > step) setCurrentStep(step);
                }}
              >
                {currentStep > step ? <Check size={14} /> : step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bridal-workflow-content-container">

        {/* ================================================================= */}
        {/* STEP 1: OUTFIT CATEGORY & SILHOUETTE                              */}
        {/* ================================================================= */}
        {currentStep === 1 && (
          <div className="workflow-step-card animate-fadeIn">
            <div className="step-card-header">
              <span className="step-tag"><Sparkles size={14} /> STEP 1</span>
              <h3>Choose Bridal Category & Silhouette</h3>
              <p>Select whether you are stitching for the Bride, Groom, or a Coordinated Couple ensemble.</p>
            </div>

            {/* Category Tabs with Thumbnails */}
            <div className="bridal-cat-tabs-row">
              {BRIDAL_CATEGORIES.map(cat => (
                <div
                  key={cat.id}
                  className={`bridal-cat-tab-chip ${selectedCatId === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCatId(cat.id);
                    // Match trending style if available
                    const matched = BRIDAL_TRENDING_STYLES.find(s => s.category === cat.id);
                    if (matched) setSelectedStyle(matched);
                  }}
                >
                  <img src={cat.image} alt={cat.title} className="cat-chip-thumb" />
                  <div>
                    <div className="cat-chip-name">{cat.title}</div>
                    <span className="cat-chip-tag">{cat.tag}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Couple Outfits Dual Coordinated Section */}
            {isCouple && (
              <div className="couple-coordinated-config-box">
                <div className="couple-badge">
                  <Heart size={16} fill="#FF008A" color="#FF008A" />
                  <span>COORDINATED HIS & HERS BRIDAL ENSEMBLE</span>
                </div>
                <div className="couple-fields-grid">
                  <div className="config-group">
                    <label>Bride's Primary Silhouette</label>
                    <select 
                      value={brideOutfitChoice}
                      onChange={(e) => setBrideOutfitChoice(e.target.value)}
                      className="bridal-input"
                    >
                      <option value="Embroidered Lehenga">Royal Flared Embroidered Lehenga</option>
                      <option value="Bridal Saree">Kanjeevaram / Banarasi Bridal Saree</option>
                      <option value="Contemporary Gown">Trail Gown / Corset Evening Silhouette</option>
                    </select>
                  </div>

                  <div className="config-group">
                    <label>Groom's Primary Silhouette</label>
                    <select 
                      value={groomOutfitChoice}
                      onChange={(e) => setGroomOutfitChoice(e.target.value)}
                      className="bridal-input"
                    >
                      <option value="Royal Sherwani">Royal Zardozi Sherwani with Stole</option>
                      <option value="Jodhpuri Suit">Bespoke Bandhgala Jodhpuri Set</option>
                      <option value="Indo-Western Tuxedo">Overlap Fusion Indo-Western</option>
                    </select>
                  </div>

                  <div className="config-group">
                    <label>Color Synchronization Palette</label>
                    <select 
                      value={couplePalette}
                      onChange={(e) => setCouplePalette(e.target.value)}
                      className="bridal-input"
                    >
                      <option value="Maroon & Antique Gold">Maroon Velvet & Antique Gold Zari</option>
                      <option value="Pastel Peach & Pearl">Pastel Peach & Pearl Ivory</option>
                      <option value="Royal Emerald & Gold">Royal Emerald Green & Dull Gold</option>
                      <option value="Midnight Navy & Rose Gold">Midnight Navy & Rose Gold</option>
                      <option value="Blush Pink & Champagne">Blush Pink & Champagne White</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Silhouettes Grid */}
            <h4 className="section-subheading">Select Trending Base Silhouette</h4>
            <div className="bridal-silhouettes-grid">
              {BRIDAL_TRENDING_STYLES.map(style => {
                const isSelected = selectedStyle && selectedStyle.id === style.id;
                return (
                  <div 
                    key={style.id}
                    className={`bridal-silhouette-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedStyle(style)}
                  >
                    <div className="silhouette-img-box">
                      <img src={style.mainImage} alt={style.name} />
                      {isSelected && (
                        <div className="selected-badge">
                          <Check size={14} /> Selected
                        </div>
                      )}
                    </div>
                    <div className="silhouette-content">
                      <h5>{style.name}</h5>
                      <p>{style.desc}</p>
                      <div className="silhouette-price">
                        Starting <strong>₹{style.startingPrice.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Customization Controls */}
            <div className="bridal-options-row">
              <div className="option-col">
                <label>Fit Alignment</label>
                <div className="pills-selector">
                  {['Couture Tailored', 'Comfort Classic', 'Flared Royal'].map(fit => (
                    <button
                      key={fit}
                      type="button"
                      className={`pill-btn ${fitPreference === fit ? 'active' : ''}`}
                      onClick={() => setFitPreference(fit)}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-col">
                <label>Embellishment & Zari Work</label>
                <div className="pills-selector">
                  {['Royal Zardozi (Heavy)', 'Hand Aari & Sequins', 'Minimalist Cutdana'].map(tier => (
                    <button
                      key={tier}
                      type="button"
                      className={`pill-btn ${embellishmentTier === tier ? 'active' : ''}`}
                      onClick={() => setEmbellishmentTier(tier)}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="notes-box">
              <label>Special Instructions & Personalization Notes (Neckline, Drapes, Can-can, Monograms)</label>
              <textarea 
                rows="2"
                placeholder="E.g., Require sweetheart neckline, double can-can flare for lehenga, and bride & groom wedding initials embroidered on inner lapel."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="bridal-textarea"
              />
            </div>

            <div className="step-actions-footer">
              <button 
                type="button" 
                className="btn-next-step"
                onClick={() => setCurrentStep(2)}
              >
                <span>Continue to Fabric Selection</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 2: SELECT FABRIC                                             */}
        {/* ================================================================= */}
        {currentStep === 2 && (
          <div className="workflow-step-card animate-fadeIn">
            <div className="step-card-header">
              <span className="step-tag"><Layers size={14} /> STEP 2</span>
              <h3>Select Bridal Fabric</h3>
              <p>Choose from our authentic heritage textile archive or provide your own special heirloom fabric.</p>
            </div>

            {/* Fabric Switcher Tabs */}
            <div className="fabric-mode-switcher">
              <button
                type="button"
                className={`mode-toggle-btn ${fabricMode === 'stitchbee' ? 'active' : ''}`}
                onClick={() => setFabricMode('stitchbee')}
              >
                <Sparkles size={16} />
                <span>StitchBeez Luxury Bridal Fabrics</span>
              </button>
              <button
                type="button"
                className={`mode-toggle-btn ${fabricMode === 'own' ? 'active' : ''}`}
                onClick={() => setFabricMode('own')}
              >
                <Scissors size={16} />
                <span>I Will Provide My Own Fabric</span>
              </button>
            </div>

            {fabricMode === 'stitchbee' ? (
              <div>
                <div className="swatches-grid">
                  {BRIDAL_FABRICS.map(fab => {
                    const isSelected = selectedFabric && selectedFabric.id === fab.id;
                    return (
                      <div 
                        key={fab.id} 
                        className={`bridal-swatch-item ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedFabric(fab)}
                      >
                        <div className="swatch-img-box">
                          <img src={fab.image} alt={fab.name} />
                          {isSelected && <span className="swatch-check"><Check size={14} /></span>}
                        </div>
                        <div className="swatch-name">{fab.name}</div>
                        <div className="swatch-price">₹{fab.pricePerMeter} / m</div>
                        <div className="swatch-sub">{fab.type}</div>
                      </div>
                    );
                  })}
                </div>

                {selectedFabric && (
                  <div className="selected-fabric-preview-card">
                    <img src={selectedFabric.image} alt={selectedFabric.name} className="preview-swatch-img" />
                    <div>
                      <h4>Selected: {selectedFabric.name}</h4>
                      <p>{selectedFabric.description}</p>
                      <div className="meta-row">
                        <span><strong>Weight & Feel:</strong> {selectedFabric.season}</span>
                        <span><strong>Ideal For:</strong> {selectedFabric.suitableFor}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="own-fabric-form-box">
                <div className="own-fabric-alert">
                  <ShieldCheck size={24} className="shield-icon" />
                  <div>
                    <h5>Insured White-Glove Doorstep Fabric Pickup</h5>
                    <p>Our secure courier partner will collect your fabric directly from your address. It will be photographed, tagged with your order ID, and weighed before master cutting.</p>
                  </div>
                </div>

                <div className="form-fields-grid">
                  <div className="form-group">
                    <label>Fabric Name & Type</label>
                    <input 
                      type="text" 
                      value={ownFabricDetails.type}
                      onChange={(e) => setOwnFabricDetails({ ...ownFabricDetails, type: e.target.value })}
                      className="bridal-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Approximate Length (Meters)</label>
                    <input 
                      type="text" 
                      value={ownFabricDetails.meters}
                      onChange={(e) => setOwnFabricDetails({ ...ownFabricDetails, meters: e.target.value })}
                      className="bridal-input"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Doorstep Pickup Address</label>
                    <input 
                      type="text" 
                      value={ownFabricDetails.pickupAddress}
                      onChange={(e) => setOwnFabricDetails({ ...ownFabricDetails, pickupAddress: e.target.value })}
                      className="bridal-input"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="step-actions-footer">
              <button 
                type="button" 
                className="btn-prev-step"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>

              <button 
                type="button" 
                className="btn-next-step"
                onClick={() => setCurrentStep(3)}
              >
                <span>Continue to Tailor & Designer Selection</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 3: GOOGLE MAPS TAILOR / DESIGNER SELECTION                   */}
        {/* ================================================================= */}
        {currentStep === 3 && (
          <div className="workflow-step-card animate-fadeIn">
            <div className="step-card-header">
              <span className="step-tag"><MapPin size={14} /> STEP 3</span>
              <h3>Select Verified Bridal Tailor or Couturier</h3>
              <p>Locate top-rated bridal ateliers in Bengaluru with interactive Google Maps and verified credentials.</p>
            </div>

            {/* Quick Locality Filter Bar */}
            <div className="maps-controls-bar">
              <div className="locality-chips-row">
                <span className="chips-label">Quick Locations:</span>
                {QUICK_LOCALITIES.map(loc => (
                  <button
                    key={loc.name}
                    type="button"
                    className={`loc-chip ${mapSearchLocality === loc.name ? 'active' : ''}`}
                    onClick={() => {
                      setMapSearchLocality(loc.name);
                      if (leafletMapRef.current) {
                        leafletMapRef.current.panTo([loc.lat, loc.lng], { animate: true });
                      }
                    }}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>

              {/* Type Filter */}
              <div className="type-toggle-pills">
                <button
                  type="button"
                  className={`type-pill ${selectedProviderType === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedProviderType('all')}
                >
                  All Specialists
                </button>
                <button
                  type="button"
                  className={`type-pill ${selectedProviderType === 'designer' ? 'active' : ''}`}
                  onClick={() => setSelectedProviderType('designer')}
                >
                  Designers Only
                </button>
                <button
                  type="button"
                  className={`type-pill ${selectedProviderType === 'tailor' ? 'active' : ''}`}
                  onClick={() => setSelectedProviderType('tailor')}
                >
                  Master Tailors
                </button>
              </div>
            </div>

            {/* Map and Tailor Cards Split Layout */}
            <div className="maps-and-cards-split">
              {/* Left: Interactive Map */}
              <div className="map-view-container">
                <div 
                  ref={mapContainerRef} 
                  className="interactive-leaflet-map"
                  style={{ width: '100%', height: '420px', borderRadius: '16px' }}
                />
                <div className="map-floating-hint">
                  <MapPin size={14} color="#FF008A" />
                  <span>Click any pin to select atelier</span>
                </div>
              </div>

              {/* Right: Provider Cards List */}
              <div className="tailors-list-sidebar">
                {BRIDAL_PROVIDERS.map(prov => {
                  const isSelected = selectedTailor && selectedTailor.id === prov.id;
                  return (
                    <div 
                      key={prov.id}
                      className={`tailor-card-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedTailor(prov);
                        if (leafletMapRef.current) {
                          leafletMapRef.current.panTo([prov.lat, prov.lng], { animate: true });
                        }
                      }}
                    >
                      <img src={prov.image} alt={prov.name} className="tailor-avatar" />
                      <div className="tailor-info">
                        <div className="tailor-name-row">
                          <h4>{prov.name}</h4>
                          {prov.verified && <span className="verified-tag"><ShieldCheck size={12} /> Verified</span>}
                        </div>
                        <div className="tailor-specialty">{prov.specialty}</div>
                        <div className="tailor-locality"><MapPin size={12} /> {prov.location}</div>
                        <div className="tailor-meta-row">
                          <span className="rating">★ {prov.rating} ({prov.reviewsCount}+ reviews)</span>
                          <span className="lead">Starts ₹{prov.startingPrice}</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className={`select-btn ${isSelected ? 'active' : ''}`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="step-actions-footer">
              <button 
                type="button" 
                className="btn-prev-step"
                onClick={() => setCurrentStep(2)}
              >
                Back
              </button>

              <button 
                type="button" 
                className="btn-next-step"
                onClick={() => setCurrentStep(4)}
              >
                <span>Continue to Measurements</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 4: MEASUREMENTS & FITTING METHOD                             */}
        {/* ================================================================= */}
        {currentStep === 4 && (
          <div className="workflow-step-card animate-fadeIn">
            <div className="step-card-header">
              <span className="step-tag"><Ruler size={14} /> STEP 4</span>
              <h3>Measurements & Fitting Selection</h3>
              <p>StitchBeez offers zero-contact AI body scans, home visits by certified fit masters, or manual inputs.</p>
            </div>

            {/* 4 Measurement Cards */}
            <div className="measurement-options-grid">
              <div 
                className={`measurement-card ${measurementMode === 'ai_scan' ? 'active' : ''}`}
                onClick={() => setMeasurementMode('ai_scan')}
              >
                <div className="icon-circle"><Camera size={22} /></div>
                <h4>Touchless 3D AI Body Scan</h4>
                <p>Use your camera to calculate 34 biometric fit coordinates with 99.4% precision.</p>
                <span className="badge-free">Recommended • Free</span>
              </div>

              <div 
                className={`measurement-card ${measurementMode === 'doorstep' ? 'active' : ''}`}
                onClick={() => setMeasurementMode('doorstep')}
              >
                <div className="icon-circle"><User size={22} /></div>
                <h4>Doorstep Master Tailor Visit</h4>
                <p>A certified measurement specialist visits your home with bridal tape and posture calipers.</p>
                <span className="badge-price">₹99 Booking Fee</span>
              </div>

              <div 
                className={`measurement-card ${measurementMode === 'manual' ? 'active' : ''}`}
                onClick={() => setMeasurementMode('manual')}
              >
                <div className="icon-circle"><Ruler size={22} /></div>
                <h4>Enter Measurements Manually</h4>
                <p>Type your measurements or input details from an existing well-fitting bridal outfit.</p>
                <span className="badge-standard">Self-Service</span>
              </div>

              <div 
                className={`measurement-card ${measurementMode === 'atelier' ? 'active' : ''}`}
                onClick={() => setMeasurementMode('atelier')}
              >
                <div className="icon-circle"><Award size={22} /></div>
                <h4>Visit Tailor Atelier / Studio</h4>
                <p>Schedule a visit to {selectedTailor?.name || 'Selected Atelier'} in {selectedTailor?.location || 'Bengaluru'}.</p>
                <span className="badge-standard">Free In-Store</span>
              </div>
            </div>

            {/* AI Scan Simulation Box */}
            {measurementMode === 'ai_scan' && (
              <div className="ai-scan-panel">
                <div className="ai-scan-inner">
                  <Camera size={36} className="camera-icon" />
                  <h4>Live AI Biometric Body Scanner</h4>
                  <p>Stand 6 feet back facing the camera. Our algorithm auto-detects shoulder width, bust, waist, flare drop, and arm circumference.</p>
                  
                  {aiScanning && (
                    <div className="scanning-indicator">
                      <div className="pulse-bar" />
                      <span>Calibrating body posture & drape angles...</span>
                    </div>
                  )}

                  {aiScanDone && (
                    <div className="scan-success-pill">
                      <Check size={16} /> 34 Bridal Measurement Points Calibrated!
                    </div>
                  )}

                  {!aiScanDone && !aiScanning && (
                    <button 
                      type="button" 
                      className="btn-start-ai"
                      onClick={handleStartAiScan}
                    >
                      Start 3D Camera Scan
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Manual Inputs Box */}
            {measurementMode === 'manual' && (
              <div className="manual-inputs-panel">
                <h4>{isCouple ? "Bride's Measurements (Inches)" : "Tailoring Measurements (Inches)"}</h4>
                <div className="manual-grid">
                  <div className="input-group">
                    <label>Bust / Chest</label>
                    <input 
                      type="number" 
                      value={manualMeasurements.chest}
                      onChange={(e) => setManualMeasurements({ ...manualMeasurements, chest: e.target.value })}
                      className="bridal-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>Waist</label>
                    <input 
                      type="number" 
                      value={manualMeasurements.waist}
                      onChange={(e) => setManualMeasurements({ ...manualMeasurements, waist: e.target.value })}
                      className="bridal-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>Hips</label>
                    <input 
                      type="number" 
                      value={manualMeasurements.hips}
                      onChange={(e) => setManualMeasurements({ ...manualMeasurements, hips: e.target.value })}
                      className="bridal-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>Shoulder Width</label>
                    <input 
                      type="number" 
                      value={manualMeasurements.shoulder}
                      onChange={(e) => setManualMeasurements({ ...manualMeasurements, shoulder: e.target.value })}
                      className="bridal-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>Garment Length</label>
                    <input 
                      type="number" 
                      value={manualMeasurements.length}
                      onChange={(e) => setManualMeasurements({ ...manualMeasurements, length: e.target.value })}
                      className="bridal-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>Sleeve Length</label>
                    <input 
                      type="number" 
                      value={manualMeasurements.sleeves}
                      onChange={(e) => setManualMeasurements({ ...manualMeasurements, sleeves: e.target.value })}
                      className="bridal-input"
                    />
                  </div>
                </div>

                {/* Additional Groom Profile for Couple */}
                {isCouple && (
                  <div style={{ marginTop: '20px' }}>
                    <h4>Groom's Measurements (Inches)</h4>
                    <div className="manual-grid">
                      <div className="input-group">
                        <label>Groom Chest</label>
                        <input 
                          type="number" 
                          value={manualMeasurements.groomChest}
                          onChange={(e) => setManualMeasurements({ ...manualMeasurements, groomChest: e.target.value })}
                          className="bridal-input"
                        />
                      </div>
                      <div className="input-group">
                        <label>Groom Waist</label>
                        <input 
                          type="number" 
                          value={manualMeasurements.groomWaist}
                          onChange={(e) => setManualMeasurements({ ...manualMeasurements, groomWaist: e.target.value })}
                          className="bridal-input"
                        />
                      </div>
                      <div className="input-group">
                        <label>Groom Shoulder</label>
                        <input 
                          type="number" 
                          value={manualMeasurements.groomShoulder}
                          onChange={(e) => setManualMeasurements({ ...manualMeasurements, groomShoulder: e.target.value })}
                          className="bridal-input"
                        />
                      </div>
                      <div className="input-group">
                        <label>Groom Length</label>
                        <input 
                          type="number" 
                          value={manualMeasurements.groomLength}
                          onChange={(e) => setManualMeasurements({ ...manualMeasurements, groomLength: e.target.value })}
                          className="bridal-input"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="step-actions-footer">
              <button 
                type="button" 
                className="btn-prev-step"
                onClick={() => setCurrentStep(3)}
              >
                Back
              </button>

              <button 
                type="button" 
                className="btn-next-step"
                onClick={() => setCurrentStep(5)}
              >
                <span>Continue to Quotation & Review</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 5: ITEMIZED QUOTATION & APPROVAL                             */}
        {/* ================================================================= */}
        {currentStep === 5 && (
          <div className="workflow-step-card animate-fadeIn">
            <div className="step-card-header">
              <span className="step-tag"><Award size={14} /> STEP 5</span>
              <h3>Itemized Bridal Quotation & Design Approval</h3>
              <p>Transparent pricing with zero hidden surcharges. Free alteration warranty included.</p>
            </div>

            <div className="quote-grid-split">
              {/* Left: Summary */}
              <div className="quote-details-col">
                <div className="quote-detail-block">
                  <h4>Outfit Specifications</h4>
                  <div className="detail-row">
                    <span>Category:</span>
                    <strong>{isCouple ? 'Coordinated Couple Ensembles' : selectedStyle?.name}</strong>
                  </div>
                  {isCouple && (
                    <>
                      <div className="detail-row">
                        <span>Bride & Groom Outfits:</span>
                        <strong>{brideOutfitChoice} + {groomOutfitChoice}</strong>
                      </div>
                      <div className="detail-row">
                        <span>Palette Synchronization:</span>
                        <strong>{couplePalette}</strong>
                      </div>
                    </>
                  )}
                  <div className="detail-row">
                    <span>Fit Alignment:</span>
                    <strong>{fitPreference}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Embellishment:</span>
                    <strong>{embellishmentTier}</strong>
                  </div>
                </div>

                <div className="quote-detail-block">
                  <h4>Selected Partner & Location</h4>
                  <div className="detail-row">
                    <span>Boutique / Couturier:</span>
                    <strong>{selectedTailor?.name}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Location:</span>
                    <strong>{selectedTailor?.location}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Measurement Mode:</span>
                    <strong>{
                      measurementMode === 'ai_scan' ? '3D AI Camera Scan' :
                      measurementMode === 'doorstep' ? 'Doorstep Specialist Visit' :
                      measurementMode === 'atelier' ? 'Atelier Studio Appointment' : 'Manual Measurements'
                    }</strong>
                  </div>
                </div>
              </div>

              {/* Right: Bill Breakdown */}
              <div className="quote-billing-col">
                <h4>Price Breakdown</h4>
                <div className="bill-line">
                  <span>Base Stitching & Silhouette Crafting</span>
                  <span>₹{baseStitchingPrice.toLocaleString()}</span>
                </div>
                {fabricMode === 'stitchbee' && (
                  <div className="bill-line">
                    <span>{selectedFabric?.name} ({isCouple ? '9m' : '5m'})</span>
                    <span>₹{fabricPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="bill-line">
                  <span>Zari Hand Embroidery ({embellishmentTier})</span>
                  <span>₹{embroideryCharge.toLocaleString()}</span>
                </div>
                {pickupFee > 0 && (
                  <div className="bill-line">
                    <span>Doorstep Heirloom Fabric Pickup</span>
                    <span>₹{pickupFee}</span>
                  </div>
                )}
                {measurementFee > 0 && (
                  <div className="bill-line">
                    <span>Doorstep Measurement Specialist</span>
                    <span>₹{measurementFee}</span>
                  </div>
                )}
                <div className="bill-line">
                  <span>GST (5%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="bill-total-line">
                  <span>Total Order Quotation</span>
                  <span className="total-amount">₹{totalPrice.toLocaleString()}</span>
                </div>

                <div className="free-perks-box">
                  <div><Check size={14} color="#10b981" /> 2 Complimentary trial & fitting alteration passes</div>
                  <div><Check size={14} color="#10b981" /> Guaranteed delivery before wedding event date</div>
                  <div><Check size={14} color="#10b981" /> 100% Escrow protected until final trial satisfaction</div>
                </div>

                <button 
                  type="button" 
                  className="btn-confirm-order"
                  onClick={handleConfirmOrder}
                >
                  Approve Design & Confirm Bridal Order →
                </button>
              </div>
            </div>

            <div className="step-actions-footer">
              <button 
                type="button" 
                className="btn-prev-step"
                onClick={() => setCurrentStep(4)}
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 6: ORDER CONFIRMED & TRACKER                                 */}
        {/* ================================================================= */}
        {currentStep === 6 && orderConfirmedData && (
          <div className="workflow-step-card animate-fadeIn order-success-card">
            <div className="success-badge-circle">
              <Check size={38} />
            </div>

            <h3 className="success-title">Your Bridal Order is Confirmed!</h3>
            <p className="success-subtitle">
              Order ID: <strong>{orderConfirmedData.id}</strong> • Estimated Delivery by <strong>{orderConfirmedData.estimatedDelivery}</strong>
            </p>

            {/* Stepper Progress */}
            <div className="order-live-stepper">
              {orderConfirmedData.steps.map((st, i) => (
                <div key={st.name} className={`stepper-node ${st.completed ? 'completed' : ''} ${st.active ? 'active' : ''}`}>
                  <div className="node-circle">
                    {st.completed ? <Check size={14} /> : i + 1}
                  </div>
                  <div className="node-label">{st.name}</div>
                  <div className="node-date">{st.date}</div>
                </div>
              ))}
            </div>

            <div className="order-summary-box">
              <div className="summary-item">
                <span>Couturier:</span>
                <strong>{orderConfirmedData.provider}</strong>
              </div>
              <div className="summary-item">
                <span>Location:</span>
                <strong>{orderConfirmedData.location}</strong>
              </div>
              <div className="summary-item">
                <span>Total Quotation:</span>
                <strong>₹{orderConfirmedData.totalAmount.toLocaleString()}</strong>
              </div>
              <div className="summary-item">
                <span>Sync Status:</span>
                <strong style={{ color: '#10b981' }}>Synced to Customer Dashboard</strong>
              </div>
            </div>

            <div className="success-actions-row">
              <button 
                type="button" 
                className="btn-return-hub"
                onClick={onBack}
              >
                Return to Bridal Hub
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
