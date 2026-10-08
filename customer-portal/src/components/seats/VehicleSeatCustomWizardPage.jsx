import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Upload, Trash2, 
  Car, ShieldCheck, Sparkles, Gem, Palette, UserCheck, 
  Tag, MapPin, Star, Phone, FileText, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { 
  VEHICLE_CATEGORIES, 
  PREMIUM_MATERIALS, 
  VEHICLE_BRANDS_MODELS, 
  VEHICLE_ARTISANS,
  calculateCustomDesignQuote,
  SEAT_SHOP_ASSETS 
} from '../../utils/vehicleSeatShopStore';
import './VehicleSeatCustomWizardPage.css';

export default function VehicleSeatCustomWizardPage({
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout,
  onBack,
  theme = 'light',
  showToast = () => {}
}) {
  const [currentStep, setCurrentStep] = useState(1);

  // Customizer State
  const [vehicleType, setVehicleType] = useState('car'); // 'bike' | 'car' | 'auto' | 'bus' | 'truck' | 'van' | 'other'
  
  // Step 2: Vehicle details
  const [brand, setBrand] = useState('Mahindra');
  const [model, setModel] = useState('Thar / Thar Roxx');
  const [year, setYear] = useState('2024');
  const [variant, setVariant] = useState('LX Hard Top');
  const [seatConfig, setSeatConfig] = useState('Standard 4/5 Seater (2 Rows)');
  
  // Step 3: Reference Uploads
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [photoError, setPhotoError] = useState(null);

  // Step 4: Material
  const [selectedMaterial, setSelectedMaterial] = useState('leatherette');

  // Step 5: Colors
  const [primaryColor, setPrimaryColor] = useState('Cognac Tan');
  const [secondaryColor, setSecondaryColor] = useState('Onyx Black');
  const [stitchingColor, setStitchingColor] = useState('Matching Tan');
  const [pipingColor, setPipingColor] = useState('Contrast Black');

  // Step 6: Stitching & Features
  const [stitchingStyle, setStitchingStyle] = useState('diamond');
  const [hasPerforation, setHasPerforation] = useState(true);
  const [hasLogoEmbroidery, setHasLogoEmbroidery] = useState(false);
  const [embroideryText, setEmbroideryText] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  // Step 8: Selected Artisan
  const [selectedArtisan, setSelectedArtisan] = useState(VEHICLE_ARTISANS[0]);

  // Order submission state
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderReferenceId, setOrderReferenceId] = useState(null);

  // Color options palette
  const COLOR_PALETTE = [
    { name: 'Onyx Black', hex: '#1c1917' },
    { name: 'Cognac Tan', hex: '#b45309' },
    { name: 'Crimson Red', hex: '#991b1b' },
    { name: 'Saddle Brown', hex: '#78350f' },
    { name: 'Touring Navy', hex: '#1e3a8a' },
    { name: 'Graphite Grey', hex: '#4b5563' },
    { name: 'Ivory Beige', hex: '#d6d3d1' },
    { name: 'Racing Yellow', hex: '#eab308' }
  ];

  // Stitching style options
  const STITCHING_STYLES = [
    { id: 'diamond', name: 'Diamond Quilting', desc: 'Classic luxury diamond cross-quilted cushions' },
    { id: 'horizontal', name: 'Horizontal Ribs', desc: 'Fluted horizontal ridges for ergonomic lumbar support' },
    { id: 'vertical', name: 'Vertical Flutes', desc: 'Retro vertical pleated channels with accent piping' },
    { id: 'plain', name: 'Plain Minimalist', desc: 'Sleek, modern flat surface with tailored contour seams' },
    { id: 'perforated', name: 'Perforated Sport', desc: 'Central cooling airflow perforation pattern' },
    { id: 'contrast', name: 'Contrast Double Stitch', desc: 'Heavyweight contrast nylon thread along bolsters' }
  ];

  // Dynamic Models for selected brand
  const brandList = VEHICLE_BRANDS_MODELS[vehicleType]?.brands || ['Mahindra', 'Tata Motors', 'Hyundai'];
  const modelList = VEHICLE_BRANDS_MODELS[vehicleType]?.models[brand] || ['Default Model'];
  const configList = VEHICLE_BRANDS_MODELS[vehicleType]?.configurations || ['Standard 4/5 Seater (2 Rows)'];

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setPhotoError(null);

    if (uploadedPhotos.length + files.length > 5) {
      setPhotoError("You can upload a maximum of 5 reference photos.");
      return;
    }

    files.forEach(file => {
      if (file.size > 8 * 1024 * 1024) {
        setPhotoError("File size must be under 8MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedPhotos(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          url: ev.target.result
        }]);
      };
      reader.readAsDataURL(file);
    });

    showToast(`${files.length} reference photo(s) uploaded!`);
  };

  const handleRemovePhoto = (id) => {
    setUploadedPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Calculate live estimate
  const quote = calculateCustomDesignQuote({
    vehicleType,
    materialId: selectedMaterial,
    stitchingStyle,
    hasPerforation,
    hasLogoEmbroidery,
    seatConfiguration: seatConfig
  });

  // Material Object
  const currentMaterialObj = PREMIUM_MATERIALS.find(m => m.id === selectedMaterial) || PREMIUM_MATERIALS[0];

  // Submit Order / Request Quote
  const handleSubmitCustomRequest = () => {
    const refId = `STB-SEAT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReferenceId(refId);

    const customOrderItem = {
      id: `custom-seat-${Date.now()}`,
      orderId: refId,
      title: `Custom ${brand} ${model} Seat Covers`,
      name: `Custom ${brand} ${model} Seat Covers`,
      price: quote.totalEstimate,
      effectivePrice: quote.totalEstimate,
      originalPrice: quote.originalEstimate,
      image: SEAT_SHOP_ASSETS.customDesign.sketchToSeat,
      category: 'Vehicle Seat Covers',
      vehicleType,
      specs: `${brand} ${model} (${year}) • ${currentMaterialObj.name} • ${primaryColor} / ${secondaryColor} • ${stitchingStyle.toUpperCase()}`,
      assignedArtisan: selectedArtisan.name,
      itemType: 'custom'
    };

    if (onAddToCart) {
      onAddToCart(customOrderItem);
    }

    setOrderSubmitted(true);
    showToast(`Custom design quotation ${refId} created and added to your cart! 🎉`);
  };

  return (
    <div className={`v-wizard-page ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="v-wizard-container">
        
        {/* Top Header Row with Back Button */}
        <div className="v-wizard-nav-header">
          <button type="button" className="v-wizard-back-btn" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>Back to Shop</span>
          </button>
          
          <div className="v-wizard-header-title">
            <span className="v-section-eyebrow">CUSTOM SEAT COVER STUDIO</span>
            <h1>Tailor Your Custom Vehicle Seat Covers</h1>
          </div>

          <div className="v-wizard-live-price-pill">
            <span className="v-price-label">Live Estimate:</span>
            <span className="v-price-val">₹{quote.totalEstimate.toLocaleString()}</span>
          </div>
        </div>

        {/* 9 Step Progress Bar */}
        <div className="v-wizard-progress-bar-wrapper">
          <div className="v-wizard-steps-track">
            {[
              { num: 1, label: 'Vehicle' },
              { num: 2, label: 'Details' },
              { num: 3, label: 'Upload' },
              { num: 4, label: 'Material' },
              { num: 5, label: 'Colors' },
              { num: 6, label: 'Stitching' },
              { num: 7, label: 'Preview' },
              { num: 8, label: 'Artisan' },
              { num: 9, label: 'Quote' }
            ].map(s => (
              <div 
                key={s.num} 
                className={`v-step-indicator ${currentStep === s.num ? 'active' : ''} ${currentStep > s.num ? 'completed' : ''}`}
                onClick={() => currentStep > s.num && setCurrentStep(s.num)}
              >
                <div className="v-step-circle">
                  {currentStep > s.num ? <Check size={14} /> : s.num}
                </div>
                <span className="v-step-text">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Step Container */}
        <div className="v-wizard-card">

          {/* STEP 1: SELECT VEHICLE TYPE */}
          {currentStep === 1 && (
            <div className="v-wizard-step-content animate-fade-in">
              <h2 className="v-step-heading">Step 1: Select Your Vehicle Type</h2>
              <p className="v-step-subheading">Choose your vehicle category to tailor the dimensions and pattern cuts.</p>

              <div className="v-wizard-vehicle-types-grid">
                {VEHICLE_CATEGORIES.map(cat => (
                  <div 
                    key={cat.id} 
                    className={`v-wizard-vehicle-card ${vehicleType === cat.vehicleType ? 'selected' : ''}`}
                    onClick={() => {
                      setVehicleType(cat.vehicleType);
                      // Reset model for selected vehicle
                      const newBrands = VEHICLE_BRANDS_MODELS[cat.vehicleType]?.brands || ['Mahindra'];
                      setBrand(newBrands[0]);
                      const newModels = VEHICLE_BRANDS_MODELS[cat.vehicleType]?.models[newBrands[0]] || ['Model'];
                      setModel(newModels[0]);
                    }}
                  >
                    <img src={cat.img} alt={cat.name} className="v-wizard-vehicle-img" />
                    <h3>{cat.name}</h3>
                    <p>{cat.desc}</p>
                    {vehicleType === cat.vehicleType && (
                      <div className="v-selected-checkmark">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: VEHICLE DETAILS */}
          {currentStep === 2 && (
            <div className="v-wizard-step-content animate-fade-in">
              <h2 className="v-step-heading">Step 2: Vehicle Details & Seat Configuration</h2>
              <p className="v-step-subheading">Provide exact vehicle details so our CAD team cuts your covers with millimeter precision.</p>

              <div className="v-form-grid">
                <div className="v-form-group">
                  <label>Vehicle Brand / Make</label>
                  <select 
                    value={brand} 
                    onChange={e => {
                      setBrand(e.target.value);
                      const models = VEHICLE_BRANDS_MODELS[vehicleType]?.models[e.target.value] || [];
                      if (models[0]) setModel(models[0]);
                    }}
                  >
                    {brandList.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="v-form-group">
                  <label>Model Name</label>
                  <select value={model} onChange={e => setModel(e.target.value)}>
                    {modelList.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="v-form-group">
                  <label>Manufacturing Year</label>
                  <input 
                    type="text" 
                    value={year} 
                    onChange={e => setYear(e.target.value)} 
                    placeholder="e.g. 2024" 
                  />
                </div>

                <div className="v-form-group">
                  <label>Vehicle Variant</label>
                  <input 
                    type="text" 
                    value={variant} 
                    onChange={e => setVariant(e.target.value)} 
                    placeholder="e.g. Z8L, Titanium, Dark Edition" 
                  />
                </div>

                <div className="v-form-group full-width">
                  <label>Seating Layout & Configuration</label>
                  <select value={seatConfig} onChange={e => setSeatConfig(e.target.value)}>
                    {configList.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: UPLOAD REFERENCE PHOTOS */}
          {currentStep === 3 && (
            <div className="v-wizard-step-content animate-fade-in">
              <h2 className="v-step-heading">Step 3: Upload Seat Reference or Design Idea</h2>
              <p className="v-step-subheading">Upload photos of your current seats, a sketch, or custom inspiration. Supports JPG, PNG, WEBP up to 8MB.</p>

              <div className="v-upload-zone">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  id="v-photo-upload" 
                  style={{ display: 'none' }}
                  onChange={handlePhotoUpload} 
                />
                <label htmlFor="v-photo-upload" className="v-upload-drop-target">
                  <Upload size={36} className="v-pink-icon" />
                  <span className="v-upload-drop-text">Click to browse or drag & drop reference photos</span>
                  <span className="v-upload-hint">Upload up to 5 clear photos of your seats</span>
                </label>
              </div>

              {photoError && <div className="v-error-banner">{photoError}</div>}

              {uploadedPhotos.length > 0 && (
                <div className="v-uploaded-preview-grid">
                  {uploadedPhotos.map(p => (
                    <div key={p.id} className="v-preview-card">
                      <img src={p.url} alt={p.name} />
                      <button 
                        type="button" 
                        className="v-remove-photo-btn"
                        onClick={() => handleRemovePhoto(p.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: SELECT MATERIAL */}
          {currentStep === 4 && (
            <div className="v-wizard-step-content animate-fade-in">
              <h2 className="v-step-heading">Step 4: Select Premium Material</h2>
              <p className="v-step-subheading">Choose from our 9 high-durability automotive grade upholstery materials.</p>

              <div className="v-wizard-materials-grid">
                {PREMIUM_MATERIALS.map(mat => (
                  <div 
                    key={mat.id} 
                    className={`v-wizard-material-card ${selectedMaterial === mat.id ? 'selected' : ''}`}
                    onClick={() => setSelectedMaterial(mat.id)}
                  >
                    <img src={mat.img} alt={mat.name} className="v-wizard-mat-img" />
                    <div className="v-wizard-mat-info">
                      <h4>{mat.name}</h4>
                      <span className="v-wizard-mat-tier">{mat.priceTier}</span>
                      <p>{mat.desc}</p>
                    </div>
                    {selectedMaterial === mat.id && (
                      <div className="v-selected-checkmark">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: CHOOSE COLORS */}
          {currentStep === 5 && (
            <div className="v-wizard-step-content animate-fade-in">
              <h2 className="v-step-heading">Step 5: Color Combinations & Palette</h2>
              <p className="v-step-subheading">Select primary seat bolster color, central insert color, stitching and piping accents.</p>

              <div className="v-colors-customizer-grid">
                
                {/* Primary Color */}
                <div className="v-color-picker-box">
                  <label>Primary Bolster Color: <strong>{primaryColor}</strong></label>
                  <div className="v-color-swatches-row">
                    {COLOR_PALETTE.map(c => (
                      <button 
                        key={c.name}
                        type="button" 
                        className={`v-color-circle ${primaryColor === c.name ? 'active' : ''}`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => setPrimaryColor(c.name)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Secondary Color */}
                <div className="v-color-picker-box">
                  <label>Central Insert Color: <strong>{secondaryColor}</strong></label>
                  <div className="v-color-swatches-row">
                    {COLOR_PALETTE.map(c => (
                      <button 
                        key={c.name}
                        type="button" 
                        className={`v-color-circle ${secondaryColor === c.name ? 'active' : ''}`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => setSecondaryColor(c.name)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Stitching Color */}
                <div className="v-color-picker-box">
                  <label>Stitching Thread: <strong>{stitchingColor}</strong></label>
                  <div className="v-color-swatches-row">
                    {COLOR_PALETTE.map(c => (
                      <button 
                        key={c.name}
                        type="button" 
                        className={`v-color-circle ${stitchingColor === c.name ? 'active' : ''}`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => setStitchingColor(c.name)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Piping Color */}
                <div className="v-color-picker-box">
                  <label>Edge Piping Accent: <strong>{pipingColor}</strong></label>
                  <div className="v-color-swatches-row">
                    {COLOR_PALETTE.map(c => (
                      <button 
                        key={c.name}
                        type="button" 
                        className={`v-color-circle ${pipingColor === c.name ? 'active' : ''}`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => setPipingColor(c.name)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 6: STITCHING PATTERN & SPECIAL FEATURES */}
          {currentStep === 6 && (
            <div className="v-wizard-step-content animate-fade-in">
              <h2 className="v-step-heading">Step 6: Stitching Patterns & Special Features</h2>
              <p className="v-step-subheading">Select your preferred quilting geometry and custom options.</p>

              <div className="v-stitching-options-grid">
                {STITCHING_STYLES.map(s => (
                  <div 
                    key={s.id} 
                    className={`v-stitching-card ${stitchingStyle === s.id ? 'selected' : ''}`}
                    onClick={() => setStitchingStyle(s.id)}
                  >
                    <h4>{s.name}</h4>
                    <p>{s.desc}</p>
                    {stitchingStyle === s.id && (
                      <div className="v-selected-checkmark">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="v-features-checkbox-row">
                <label className="v-checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={hasPerforation} 
                    onChange={e => setHasPerforation(e.target.checked)} 
                  />
                  <span>Add Central Breathable Perforation Channels (+₹250)</span>
                </label>

                <label className="v-checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={hasLogoEmbroidery} 
                    onChange={e => setHasLogoEmbroidery(e.target.checked)} 
                  />
                  <span>Add Personalized Headrest Embroidery / Initials (+₹350)</span>
                </label>
              </div>

              {hasLogoEmbroidery && (
                <div className="v-form-group" style={{ marginTop: '16px' }}>
                  <label>Embroidery Text or Initials</label>
                  <input 
                    type="text" 
                    value={embroideryText} 
                    onChange={e => setEmbroideryText(e.target.value)} 
                    placeholder="e.g. STITCHBEE, THAR, or Your Name" 
                  />
                </div>
              )}

              <div className="v-form-group" style={{ marginTop: '16px' }}>
                <label>Special Instructions for the Artisan</label>
                <textarea 
                  rows={3} 
                  value={customNotes} 
                  onChange={e => setCustomNotes(e.target.value)} 
                  placeholder="Mention any custom lumbar support needs, gel inserts, or specific seam requirements..." 
                />
              </div>
            </div>
          )}

          {/* STEP 7: PREVIEW AND QUOTATION SUMMARY */}
          {currentStep === 7 && (
            <div className="v-wizard-step-content animate-fade-in">
              <h2 className="v-step-heading">Step 7: Custom Design Preview & Specification</h2>
              <p className="v-step-subheading">Review your customized vehicle seat cover build before artisan selection.</p>

              <div className="v-summary-review-grid">
                
                {/* Visual Preview */}
                <div className="v-summary-visual-card">
                  <img 
                    src={SEAT_SHOP_ASSETS.customDesign.sketchToSeat} 
                    alt="Custom Seat Cover Mockup" 
                    className="v-summary-mockup-img"
                  />
                  <div className="v-summary-palette-pills">
                    <span className="v-color-tag" style={{ borderLeft: `6px solid #b45309` }}>Primary: {primaryColor}</span>
                    <span className="v-color-tag" style={{ borderLeft: `6px solid #1c1917` }}>Insert: {secondaryColor}</span>
                    <span className="v-color-tag" style={{ borderLeft: `6px solid #991b1b` }}>Stitch: {stitchingColor}</span>
                  </div>
                </div>

                {/* Specs List & Breakdown */}
                <div className="v-summary-specs-card">
                  <h3 className="v-summary-title">Specification Summary</h3>

                  <div className="v-summary-spec-list">
                    <div className="v-summary-row">
                      <span>Vehicle:</span>
                      <strong>{brand} {model} ({year})</strong>
                    </div>
                    <div className="v-summary-row">
                      <span>Configuration:</span>
                      <strong>{seatConfig}</strong>
                    </div>
                    <div className="v-summary-row">
                      <span>Selected Material:</span>
                      <strong>{currentMaterialObj.name}</strong>
                    </div>
                    <div className="v-summary-row">
                      <span>Stitching Style:</span>
                      <strong>{stitchingStyle.toUpperCase()}</strong>
                    </div>
                    <div className="v-summary-row">
                      <span>Perforation:</span>
                      <strong>{hasPerforation ? 'Yes (Central Breathable)' : 'No'}</strong>
                    </div>
                    {hasLogoEmbroidery && (
                      <div className="v-summary-row">
                        <span>Embroidery:</span>
                        <strong>{embroideryText || 'Custom Initials'}</strong>
                      </div>
                    )}
                    <div className="v-summary-row">
                      <span>Reference Photos:</span>
                      <strong>{uploadedPhotos.length} photo(s) attached</strong>
                    </div>
                  </div>

                  <div className="v-summary-pricing-box">
                    <div className="v-price-row-item">
                      <span>Base Fabrication:</span>
                      <span>₹{quote.breakdown.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="v-price-row-item">
                      <span>Material Upgrade ({currentMaterialObj.name}):</span>
                      <span>+₹{quote.breakdown.materialAddon.toLocaleString()}</span>
                    </div>
                    <div className="v-price-row-item">
                      <span>Custom Stitching & Geometry:</span>
                      <span>+₹{quote.breakdown.stitchingAddon.toLocaleString()}</span>
                    </div>
                    {quote.breakdown.extraFeaturesAddon > 0 && (
                      <div className="v-price-row-item">
                        <span>Add-on Features & Perforation:</span>
                        <span>+₹{quote.breakdown.extraFeaturesAddon.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="v-price-total-row">
                      <span>Estimated Total (Inclusive of Taxes):</span>
                      <span className="v-total-amount">₹{quote.totalEstimate.toLocaleString()}</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* STEP 8: CHOOSE ARTISAN / SPECIALIST */}
          {currentStep === 8 && (
            <div className="v-wizard-step-content animate-fade-in">
              <h2 className="v-step-heading">Step 8: Choose Your Master Automotive Artisan</h2>
              <p className="v-step-subheading">Select from verified certified ateliers in Bengaluru specializing in vehicle seat covers.</p>

              <div className="v-artisans-selection-grid">
                {VEHICLE_ARTISANS.map(artisan => (
                  <div 
                    key={artisan.id} 
                    className={`v-artisan-card ${selectedArtisan.id === artisan.id ? 'selected' : ''}`}
                    onClick={() => setSelectedArtisan(artisan)}
                  >
                    <div className="v-artisan-header">
                      <img src={artisan.avatar} alt={artisan.name} className="v-artisan-avatar" />
                      <div>
                        <h4>{artisan.name}</h4>
                        <div className="v-artisan-rating-pill">
                          <Star size={14} fill="#F59E0B" color="#F59E0B" />
                          <span>{artisan.rating} ★ ({artisan.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="v-artisan-details">
                      <div className="v-artisan-detail-item">
                        <MapPin size={14} className="v-pink-icon" />
                        <span>{artisan.location}</span>
                      </div>
                      <div className="v-artisan-detail-item">
                        <UserCheck size={14} className="v-pink-icon" />
                        <span>Experience: {artisan.experience}</span>
                      </div>
                      <div className="v-artisan-detail-item">
                        <ShieldCheck size={14} className="v-pink-icon" />
                        <span>{artisan.specialization}</span>
                      </div>
                    </div>

                    {selectedArtisan.id === artisan.id && (
                      <div className="v-selected-checkmark">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 9: SUBMIT QUOTE / PLACE ORDER */}
          {currentStep === 9 && (
            <div className="v-wizard-step-content animate-fade-in">
              <h2 className="v-step-heading">Step 9: Confirm & Submit Custom Request</h2>
              <p className="v-step-subheading">Your tailored quotation is ready. Confirm to proceed to payment or request doorstep consultation.</p>

              {!orderSubmitted ? (
                <div className="v-confirmation-card">
                  <div className="v-confirmation-banner">
                    <Sparkles size={28} className="v-pink-icon" />
                    <div>
                      <h3>Custom Build Ready for Submission</h3>
                      <p>Assigned to <strong>{selectedArtisan.name}</strong> • Estimated Delivery & Fitting: <strong>3-4 Business Days</strong></p>
                    </div>
                  </div>

                  <div className="v-confirmation-amount-box">
                    <span>Total Custom Quotation:</span>
                    <strong className="v-confirmed-amount">₹{quote.totalEstimate.toLocaleString()}</strong>
                  </div>

                  <div className="v-confirmation-actions">
                    <button
                      type="button"
                      className="v-btn v-btn-primary"
                      onClick={handleSubmitCustomRequest}
                    >
                      <CheckCircle2 size={18} />
                      <span>Confirm & Add Custom Order to Cart</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="v-success-card animate-scale-up">
                  <div className="v-success-icon-bubble">
                    <CheckCircle2 size={42} color="#10B981" />
                  </div>
                  <h3>Custom Order Created Successfully!</h3>
                  <p className="v-order-ref">Reference ID: <strong>{orderReferenceId}</strong></p>
                  <p className="v-order-desc">
                    Your custom seat cover order has been added to your cart and forwarded to <strong>{selectedArtisan.name}</strong>. A master craftsperson will review the cuts and contact you.
                  </p>
                  
                  <div className="v-success-btn-group">
                    <button 
                      type="button" 
                      className="v-btn v-btn-primary"
                      onClick={() => {
                        if (onDirectCheckout) {
                          onDirectCheckout({
                            id: orderReferenceId,
                            title: `Custom ${brand} ${model} Seat Covers`,
                            price: quote.totalEstimate,
                            category: 'Vehicle Seat Covers'
                          });
                        } else {
                          onBack();
                        }
                      }}
                    >
                      <span>Proceed to Cashfree Checkout</span>
                      <ArrowRight size={18} />
                    </button>

                    <button 
                      type="button" 
                      className="v-btn v-btn-secondary"
                      onClick={onBack}
                    >
                      <span>Return to Vehicle Seats Shop</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Step Navigation Bottom Row */}
        {!orderSubmitted && (
          <div className="v-wizard-footer-nav">
            <button
              type="button"
              className="v-btn v-btn-secondary"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            >
              <ArrowLeft size={16} />
              <span>Previous Step</span>
            </button>

            {currentStep < 9 ? (
              <button
                type="button"
                className="v-btn v-btn-primary"
                onClick={() => setCurrentStep(prev => Math.min(9, prev + 1))}
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="v-btn v-btn-primary"
                onClick={handleSubmitCustomRequest}
              >
                <span>Submit Custom Quotation</span>
                <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
