import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Scissors, 
  ShoppingCart, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Ruler, 
  Truck, 
  Star, 
  ChevronRight, 
  Info, 
  Heart,
  Layers,
  Award
} from 'lucide-react';
import './ShopAndStitchPage.css';

const GARMENT_OPTIONS = [
  { id: 'kurti', name: 'Designer Kurti / Tunic', defaultMeters: 2.5, basePrice: 650, time: '3-4 Days', desc: 'A-line, straight, or flared daily/festive kurti with custom neck design.' },
  { id: 'suit', name: 'Salwar Kameez / Suit Set', defaultMeters: 4.5, basePrice: 1200, time: '4-5 Days', desc: 'Full 3-piece set tailored with custom pant/palazzo & neckline finish.' },
  { id: 'blouse', name: 'Designer Saree Blouse', defaultMeters: 1.0, basePrice: 850, time: '2-3 Days', desc: 'Padded/non-padded blouse with custom back cut, piping and tassels.' },
  { id: 'shirt', name: 'Formal / Casual Shirt', defaultMeters: 2.0, basePrice: 550, time: '3 Days', desc: 'Tailored fit shirt with crisp spread collar, cuffs and mother-of-pearl buttons.' },
  { id: 'dress', name: 'Western Dress / Midi', defaultMeters: 3.0, basePrice: 1400, time: '5 Days', desc: 'Contemporary tiered or wrap dress with custom sleeve & length profile.' },
  { id: 'lehenga', name: 'Festive Skirt / Lehenga', defaultMeters: 5.0, basePrice: 1800, time: '5-7 Days', desc: 'Full circle flare skirt with custom waistband, cancan attachment option.' }
];

const TAILOR_OPTIONS = [
  { id: 'royal', name: 'Royal Heritage Master Tailors', rating: 4.9, reviews: 240, specialty: 'Ethnic & Festive Wear', distance: '1.8 km away', badge: 'Top Rated' },
  { id: 'vogue', name: 'Vogue Cut & Stitch Studio', rating: 4.8, reviews: 185, specialty: 'Contemporary & Indo-Western', distance: '2.4 km away', badge: 'Verified Master' },
  { id: 'priya', name: 'Priya Designer Boutique', rating: 4.9, reviews: 310, specialty: 'Blouses & Fitted Kurtis', distance: '3.1 km away', badge: 'StitchBee Choice' }
];

const MEASUREMENT_MODES = [
  { id: 'standard', title: 'Standard Sizes', desc: 'Pick from standard size chart (XS - XXL)' },
  { id: 'sample', title: 'Pickup Sample Garment', desc: 'We pick up your best-fitting clothes for free' },
  { id: 'doorstep', title: 'Doorstep Tailor Visit', desc: 'Certified tailor visits your address to measure' },
  { id: 'custom', title: 'Enter Custom Values', desc: 'Input your bust, waist, hips & length in inches' }
];

const ADDONS = [
  { id: 'lining', label: 'Premium Cotton / Satin Inner Lining', price: 200 },
  { id: 'pockets', label: 'Concealed Side Pockets (Both Sides)', price: 150 },
  { id: 'latkans', label: 'Handcrafted Tassels & Latkans', price: 180 },
  { id: 'piping', label: 'Contrast Border Piping & Zari Hem', price: 120 },
  { id: 'embroidery', label: 'Subtle Yoke Thread Embroidery', price: 350 }
];

export default function ShopAndStitchPage({
  fabric,
  allFabrics = [],
  theme = 'light',
  currentUser,
  onLoginRequired,
  cart,
  setCart,
  setCartOpen,
  addOrder,
  onBack,
  showToast
}) {
  const [selectedGarment, setSelectedGarment] = useState(GARMENT_OPTIONS[0]);
  const [meters, setMeters] = useState(GARMENT_OPTIONS[0].defaultMeters);
  const [selectedTailor, setSelectedTailor] = useState(TAILOR_OPTIONS[0]);
  const [measurementMode, setMeasurementMode] = useState('standard');
  const [standardSize, setStandardSize] = useState('M');
  const [customMeasurements, setCustomMeasurements] = useState({
    bust: '36',
    waist: '30',
    hips: '39',
    length: '42',
    shoulder: '14.5'
  });
  const [selectedAddons, setSelectedAddons] = useState(['lining']);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [currentFabric, setCurrentFabric] = useState(fabric);
  const [showFabricPicker, setShowFabricPicker] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // When garment changes, update default meters
  const handleGarmentSelect = (garment) => {
    setSelectedGarment(garment);
    setMeters(garment.defaultMeters);
  };

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => 
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Price calculations
  const fabricTotal = Math.round(meters * (currentFabric?.price || 220));
  const stitchingBase = selectedGarment.basePrice;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = ADDONS.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);
  const grandTotal = fabricTotal + stitchingBase + addonsTotal;

  // Add customized stitched item to Cart
  const handleAddCustomToCart = () => {
    if (!setCart) return;

    const cartItem = {
      id: `stitch-${currentFabric.id}-${Date.now()}`,
      name: `${currentFabric.name} – Custom Stitched ${selectedGarment.name}`,
      price: grandTotal,
      unitPrice: grandTotal,
      length: meters,
      type: 'custom_stitching',
      fabric: currentFabric,
      garment: selectedGarment.name,
      tailor: selectedTailor.name,
      measurementMode,
      size: measurementMode === 'standard' ? standardSize : 'Custom Spec',
      addons: selectedAddons,
      image: currentFabric.image,
      qty: 1,
      total: grandTotal
    };

    setCart((prev) => [...(prev || []), cartItem]);
    if (showToast) {
      showToast(`Added custom stitched ${selectedGarment.name} to Cart! ✂️`);
    }
    if (setCartOpen) {
      setCartOpen(true);
    }
  };

  // Book & Place Direct Stitching Order
  const handleProceedBooking = () => {
    if (currentUser === null && onLoginRequired) {
      onLoginRequired();
      return;
    }

    const orderData = {
      id: `SB-STITCH-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Tailor Assigned',
      garmentType: selectedGarment.name,
      fabricName: currentFabric.name,
      fabricMeters: meters,
      fabricPrice: currentFabric.price,
      tailorName: selectedTailor.name,
      measurementType: measurementMode,
      totalAmount: grandTotal,
      deliveryEstimated: '5-7 business days',
      image: currentFabric.image
    };

    if (addOrder) {
      addOrder(orderData);
    }
    setIsOrderPlaced(true);
    if (showToast) {
      showToast(`Stitching order #${orderData.id} placed successfully! 🎉`);
    }
  };

  return (
    <div className={`shop-stitch-page ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      {/* Top Breadcrumb & Back Bar */}
      <div className="stitch-top-bar">
        <button type="button" className="stitch-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Fabric Marketplace</span>
        </button>

        <div className="stitch-breadcrumb-trail">
          <span onClick={onBack} className="crumb-link">Fabrics</span>
          <ChevronRight size={13} className="crumb-sep" />
          <span className="crumb-active">Shop & Stitch Studio</span>
        </div>
      </div>

      {/* Hero Banner Header */}
      <div className="stitch-page-hero">
        <div className="stitch-hero-badge">
          <Sparkles size={14} /> StitchBeez Custom Tailoring Service
        </div>
        <h1 className="stitch-page-title">
          Shop Fabric & <span className="pink-text">Get It Stitched</span>
        </h1>
        <p className="stitch-page-desc">
          Combine premium cotton fabric from our certified weavers with master bespoke tailoring. Select your garment style, provide measurements, and relax while our verified artisans craft your dream outfit.
        </p>
      </div>

      {isOrderPlaced ? (
        <div className="stitch-success-card">
          <CheckCircle2 size={64} color="#FF008A" />
          <h2>Order Confirmed & Tailor Assigned!</h2>
          <p>
            Your custom <strong>{selectedGarment.name}</strong> using <strong>{currentFabric.name}</strong> ({meters}m) is now scheduled with <strong>{selectedTailor.name}</strong>.
          </p>
          <div className="success-actions">
            <button type="button" className="btn-primary-stitch" onClick={onBack}>
              Explore More Fabrics
            </button>
          </div>
        </div>
      ) : (
        <div className="stitch-layout-grid">
          {/* LEFT COLUMN: Customization Steps */}
          <div className="stitch-steps-col">
            
            {/* FABRIC SPOTLIGHT CARD */}
            <div className="stitch-card fabric-spotlight-card">
              <div className="card-header-flex">
                <span className="step-tag">Selected Fabric</span>
                <button 
                  type="button" 
                  className="change-fabric-btn"
                  onClick={() => setShowFabricPicker(!showFabricPicker)}
                >
                  {showFabricPicker ? 'Close Picker' : 'Change Fabric'}
                </button>
              </div>

              <div className="spotlight-body">
                <img 
                  src={currentFabric.image} 
                  alt={currentFabric.name} 
                  className="spotlight-img"
                />
                <div className="spotlight-details">
                  <h3 className="spotlight-name">{currentFabric.name}</h3>
                  <div className="spotlight-price">
                    ₹{currentFabric.price} <span className="per-meter">/ metre</span>
                  </div>
                  <div className="spotlight-specs">
                    <span>Width: {currentFabric.width || '44"'}</span>
                    <span>•</span>
                    <span>GSM: {currentFabric.gsm || '120'}</span>
                    <span>•</span>
                    <span>Pattern: {currentFabric.pattern || 'Printed'}</span>
                  </div>

                  <div className="meters-selector-row">
                    <span className="meters-label">Fabric Required:</span>
                    <div className="meters-quick-pills">
                      {[1, 2, 2.5, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={`meter-pill ${meters === val ? 'active' : ''}`}
                          onClick={() => setMeters(val)}
                        >
                          {val}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Fabric Swapper Drawer */}
              {showFabricPicker && (
                <div className="fabric-swapper-drawer">
                  <h4>Choose another cotton fabric:</h4>
                  <div className="fabric-swapper-grid">
                    {allFabrics.slice(0, 10).map((f) => (
                      <div 
                        key={f.id} 
                        className={`swapper-item ${currentFabric.id === f.id ? 'active' : ''}`}
                        onClick={() => {
                          setCurrentFabric(f);
                          setShowFabricPicker(false);
                          if (showToast) showToast(`Switched fabric to "${f.name}"`);
                        }}
                      >
                        <img src={f.image} alt={f.name} />
                        <span>{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* STEP 1: GARMENT TYPE SELECTION */}
            <div className="stitch-card">
              <div className="card-section-title">
                <span className="step-num">1</span>
                <div>
                  <h3>Select Garment Style</h3>
                  <p>Choose the outfit you want our expert tailor to craft</p>
                </div>
              </div>

              <div className="garment-options-grid">
                {GARMENT_OPTIONS.map((garment) => (
                  <div 
                    key={garment.id}
                    className={`garment-card ${selectedGarment.id === garment.id ? 'selected' : ''}`}
                    onClick={() => handleGarmentSelect(garment)}
                  >
                    <div className="garment-card-top">
                      <h4 className="garment-name">{garment.name}</h4>
                      <span className="garment-price">₹{garment.basePrice}</span>
                    </div>
                    <p className="garment-desc">{garment.desc}</p>
                    <div className="garment-meta">
                      <span className="meta-time"><Clock size={12} /> {garment.time}</span>
                      <span className="meta-meters">Requires ~{garment.defaultMeters}m</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 2: MEASUREMENTS OPTION */}
            <div className="stitch-card">
              <div className="card-section-title">
                <span className="step-num">2</span>
                <div>
                  <h3>Provide Measurements</h3>
                  <p>Guaranteed 100% perfect fit with free alterations if needed</p>
                </div>
              </div>

              <div className="measurement-modes-grid">
                {MEASUREMENT_MODES.map((mode) => (
                  <div 
                    key={mode.id}
                    className={`measure-mode-card ${measurementMode === mode.id ? 'selected' : ''}`}
                    onClick={() => setMeasurementMode(mode.id)}
                  >
                    <div className="measure-radio-row">
                      <input 
                        type="radio" 
                        name="measureMode" 
                        checked={measurementMode === mode.id} 
                        onChange={() => setMeasurementMode(mode.id)}
                      />
                      <strong>{mode.title}</strong>
                    </div>
                    <p>{mode.desc}</p>
                  </div>
                ))}
              </div>

              {/* Sub-panels based on mode */}
              {measurementMode === 'standard' && (
                <div className="standard-size-selector">
                  <span>Select Size:</span>
                  <div className="size-buttons-row">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <button 
                        key={sz} 
                        type="button" 
                        className={`size-btn ${standardSize === sz ? 'active' : ''}`}
                        onClick={() => setStandardSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {measurementMode === 'custom' && (
                <div className="custom-measure-inputs-grid">
                  <div className="measure-field">
                    <label>Bust / Chest (in)</label>
                    <input 
                      type="text" 
                      value={customMeasurements.bust} 
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, bust: e.target.value })} 
                    />
                  </div>
                  <div className="measure-field">
                    <label>Waist (in)</label>
                    <input 
                      type="text" 
                      value={customMeasurements.waist} 
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, waist: e.target.value })} 
                    />
                  </div>
                  <div className="measure-field">
                    <label>Hips (in)</label>
                    <input 
                      type="text" 
                      value={customMeasurements.hips} 
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, hips: e.target.value })} 
                    />
                  </div>
                  <div className="measure-field">
                    <label>Total Length (in)</label>
                    <input 
                      type="text" 
                      value={customMeasurements.length} 
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, length: e.target.value })} 
                    />
                  </div>
                  <div className="measure-field">
                    <label>Shoulder Width (in)</label>
                    <input 
                      type="text" 
                      value={customMeasurements.shoulder} 
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, shoulder: e.target.value })} 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: SELECT MASTER TAILOR */}
            <div className="stitch-card">
              <div className="card-section-title">
                <span className="step-num">3</span>
                <div>
                  <h3>Select Certified Tailor</h3>
                  <p>Hand-picked master artisans verified by StitchBee</p>
                </div>
              </div>

              <div className="tailors-list-grid">
                {TAILOR_OPTIONS.map((tailor) => (
                  <div 
                    key={tailor.id}
                    className={`tailor-option-card ${selectedTailor.id === tailor.id ? 'selected' : ''}`}
                    onClick={() => setSelectedTailor(tailor)}
                  >
                    <div className="tailor-card-top">
                      <div className="tailor-name-flex">
                        <h4>{tailor.name}</h4>
                        <span className="tailor-badge">{tailor.badge}</span>
                      </div>
                      <span className="tailor-rating">
                        <Star size={13} fill="#F59E0B" color="#F59E0B" /> {tailor.rating} ({tailor.reviews})
                      </span>
                    </div>
                    <div className="tailor-details">
                      <span>Specialty: {tailor.specialty}</span>
                      <span>•</span>
                      <span>{tailor.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 4: CUSTOM ADD-ONS */}
            <div className="stitch-card">
              <div className="card-section-title">
                <span className="step-num">4</span>
                <div>
                  <h3>Custom Stitching Add-Ons</h3>
                  <p>Enhance comfort and styling with artisan details</p>
                </div>
              </div>

              <div className="addons-list">
                {ADDONS.map((addon) => (
                  <label key={addon.id} className="addon-checkbox-row">
                    <div className="addon-label-group">
                      <input 
                        type="checkbox" 
                        checked={selectedAddons.includes(addon.id)} 
                        onChange={() => toggleAddon(addon.id)}
                      />
                      <span>{addon.label}</span>
                    </div>
                    <span className="addon-price">+₹{addon.price}</span>
                  </label>
                ))}
              </div>

              <div className="special-notes-box">
                <label>Special Stitching Instructions / Notes (Optional):</label>
                <textarea 
                  rows="3" 
                  placeholder="e.g. Boat neck design, elbow-length sleeves, loose relaxed fit..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary & Sticky CTA */}
          <div className="stitch-summary-col">
            <div className="stitch-summary-card">
              <h3 className="summary-title">Summary & Cost Breakdown</h3>

              <div className="summary-line-item">
                <div className="item-label-group">
                  <strong>Fabric Cost</strong>
                  <span className="item-sub">{currentFabric.name} ({meters}m × ₹{currentFabric.price})</span>
                </div>
                <span className="item-val">₹{fabricTotal}</span>
              </div>

              <div className="summary-line-item">
                <div className="item-label-group">
                  <strong>Stitching Base</strong>
                  <span className="item-sub">{selectedGarment.name}</span>
                </div>
                <span className="item-val">₹{stitchingBase}</span>
              </div>

              {addonsTotal > 0 && (
                <div className="summary-line-item">
                  <div className="item-label-group">
                    <strong>Add-Ons Total</strong>
                    <span className="item-sub">{selectedAddons.length} custom add-ons</span>
                  </div>
                  <span className="item-val">+₹{addonsTotal}</span>
                </div>
              )}

              <div className="summary-line-item">
                <div className="item-label-group">
                  <strong>Doorstep Delivery / Pickup</strong>
                  <span className="item-sub">Pan-India Express Service</span>
                </div>
                <span className="free-badge">FREE</span>
              </div>

              <div className="summary-divider" />

              <div className="grand-total-row">
                <span>Grand Total:</span>
                <span className="grand-total-price">₹{grandTotal}</span>
              </div>

              <div className="summary-action-buttons">
                <button 
                  type="button" 
                  className="btn-book-stitch"
                  onClick={handleProceedBooking}
                >
                  <Scissors size={16} />
                  <span>Proceed to Book & Stitch</span>
                </button>

                <button 
                  type="button" 
                  className="btn-cart-stitch"
                  onClick={handleAddCustomToCart}
                >
                  <ShoppingCart size={16} />
                  <span>Add Custom Outfit to Cart</span>
                </button>
              </div>

              <div className="guarantee-box">
                <div className="guarantee-item">
                  <ShieldCheck size={18} color="#FF008A" />
                  <span>100% Fit Guarantee with Free Alterations</span>
                </div>
                <div className="guarantee-item">
                  <Truck size={18} color="#FF008A" />
                  <span>Pan-India Safe Doorstep Delivery</span>
                </div>
                <div className="guarantee-item">
                  <Award size={18} color="#FF008A" />
                  <span>Crafted by Verified Master Tailors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
