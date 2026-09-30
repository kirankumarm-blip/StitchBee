import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ChevronRight, ArrowLeft, ArrowRight, Check, Upload, Sparkles, 
  ShieldCheck, Gem, Layers, Scissors, Info, Trash2, Eye, Camera, CheckCircle2 
} from 'lucide-react';
import { 
  ALL_MATERIALS, 
  saveCustomDesignDraft, 
  addOrder 
} from '../../utils/bagsStore';

export default function BagsCustomDesignWizard({ showToast, currentUser, onOpenAuthModal }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pre-fill from query params if coming from Material Carousel or Product Detail
  const queryMaterial = searchParams.get('material');
  const queryStyle = searchParams.get('style');
  const queryColor = searchParams.get('color');

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [bagType, setBagType] = useState(queryStyle || 'Handbag');
  const [material, setMaterial] = useState(queryMaterial || 'full-grain-leather');
  const [color, setColor] = useState(queryColor || 'Cognac Tan');
  const [size, setSize] = useState('Medium / Everyday (32cm x 24cm)');
  const [hardware, setHardware] = useState('Polished Gold');
  const [initials, setInitials] = useState('');
  const [stitching, setStitching] = useState('Contrast Light Wax Cord');
  const [pocketReqs, setPocketReqs] = useState(['Padded Laptop Sleeve', 'Key Leash Clip']);
  const [strapReqs, setStrapReqs] = useState('Detachable & Adjustable Crossbody Strap');
  const [customNotes, setCustomNotes] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  useEffect(() => {
    if (queryMaterial) {
      setMaterial(queryMaterial);
      setCurrentStep(2); // Jump to material step or start flow with feedback
    }
  }, [queryMaterial]);

  const bagTypes = [
    { id: 'Handbag', title: 'Handbag / Tote', icon: '👜', desc: 'Shoulder totes, satchels & structured clutches' },
    { id: 'Backpack', title: 'Urban Backpack', icon: '🎒', desc: 'Commuter backpacks, daypacks & laptop bags' },
    { id: 'Briefcase', title: 'Executive Briefcase', icon: '💼', desc: 'Formal portfolios, attache & document holders' },
    { id: 'Travel Bag', title: 'Travel Duffel', icon: '🧳', desc: 'Weekenders, gym duffels & luggage pieces' },
    { id: 'Other', title: 'Custom Shape / Other', icon: '✨', desc: 'Messenger, sling, cross-body or bespoke geometry' }
  ];

  const colors = [
    { name: 'Cognac Tan', hex: '#8c5835' },
    { name: 'Espresso Brown', hex: '#3d2516' },
    { name: 'Onyx Black', hex: '#111111' },
    { name: 'Dusty Rose', hex: '#b85b6c' },
    { name: 'Royal Burgundy', hex: '#58111a' },
    { name: 'Forest Green', hex: '#1b4332' },
    { name: 'Ivory Cream', hex: '#f4ede4' }
  ];

  const sizes = [
    { id: 'Small / Compact (22cm x 16cm)', label: 'Small / Compact', dims: '22cm x 16cm x 8cm', note: 'Perfect for wallet, phone, keys and lipstick' },
    { id: 'Medium / Everyday (32cm x 24cm)', label: 'Medium / Everyday', dims: '32cm x 24cm x 12cm', note: 'Fits iPad, notebook, daily makeup & sunglasses' },
    { id: 'Large / Weekend (42cm x 30cm)', label: 'Large / Weekend', dims: '42cm x 30cm x 16cm', note: 'Fits 16" laptop, changes of clothes & accessories' },
    { id: 'Custom Specific Dimensions', label: 'Custom Specific Dimensions', dims: 'Provide in notes', note: 'Tailored to exact millimeter specifications' }
  ];

  const hardwares = [
    { id: 'Polished Gold', label: 'Polished Gold', hex: '#d4af37', desc: '24k electroplated bright luxury gold' },
    { id: 'Antique Silver', label: 'Antique Silver', hex: '#c0c0c0', desc: 'Brushed matte nickel silver finish' },
    { id: 'Matte Gunmetal', label: 'Matte Gunmetal', hex: '#3a3a3c', desc: 'Modern industrial stealth dark finish' }
  ];

  const stitchingStyles = [
    'Tone-on-tone Hidden Stitching',
    'Contrast Light Wax Cord',
    'Heavy Saddler Hand-Stitch (Double Thread)',
    'Edge Painted Sealed Border'
  ];

  const availablePockets = [
    'Padded Laptop Sleeve',
    'Interior Zippered Divider',
    'Card & Passport Organizer',
    'Key Leash Clip',
    'Exterior Quick-Access Pocket',
    'RFID Shielded Wallet Slot'
  ];

  const togglePocket = (p) => {
    setPocketReqs(prev => prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        showToast('Reference design uploaded successfully! 🎨');
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedMaterialObj = ALL_MATERIALS.find(m => m.id === material) || ALL_MATERIALS[0];

  const handleSubmitQuote = () => {
    setIsSubmitting(true);

    const draft = {
      bagType,
      material: selectedMaterialObj.name,
      materialId: selectedMaterialObj.id,
      color,
      size,
      hardware,
      initials: initials.toUpperCase() || 'None',
      stitching,
      pocketReqs,
      strapReqs,
      customNotes,
      uploadedImage: uploadedImage ? 'Attached' : 'None'
    };

    saveCustomDesignDraft(draft);

    const newOrder = addOrder({
      type: 'custom',
      status: 'Quote Requested',
      statusCode: 'quote_requested',
      statusIndex: 0,
      total: 'Pending Artisan Assessment',
      customDetails: draft,
      address: currentUser?.address || 'Doorstep Assessment Consultation',
      artisanAssigned: 'Master Artisan Evaluation Team'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedOrder(newOrder);
      showToast('Custom quote request submitted to our master artisans! ✨');
    }, 600);
  };

  return (
    <div className="bl-wizard-page">
      <div className="bl-container" style={{ padding: '24px 12px 60px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
          <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/bags')} className="bl-crumb-link">Bags & Leather</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">Custom Bag Designer</span>
        </nav>

        {/* Wizard Header */}
        <div className="bl-wizard-header-strip">
          <div>
            <span className="bl-tag-label">BESPOKE ATELIER CREATION</span>
            <h1 className="bl-serif-title" style={{ fontSize: '2.2rem', margin: '4px 0 6px' }}>
              Design Your Dream Bag
            </h1>
            <p className="bl-section-subtext" style={{ margin: 0 }}>
              Step-by-step bespoke craftsmanship. Each custom piece is personally evaluated by our master leather artisans.
            </p>
          </div>

          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/bags')}
          >
            <ArrowLeft size={16} /> Exit Studio
          </button>
        </div>

        {/* 8-Step Stepper Progress Bar */}
        <div className="bl-stepper-container">
          <div className="bl-stepper-track">
            {[
              { num: 1, label: 'Bag Type' },
              { num: 2, label: 'Material' },
              { num: 3, label: 'Color' },
              { num: 4, label: 'Size' },
              { num: 5, label: 'Hardware' },
              { num: 6, label: 'Details' },
              { num: 7, label: 'Upload' },
              { num: 8, label: 'Review' }
            ].map(step => (
              <div 
                key={step.num}
                className={`bl-stepper-node ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
                onClick={() => setCurrentStep(step.num)}
              >
                <div className="bl-stepper-circle">
                  {currentStep > step.num ? <Check size={14} /> : step.num}
                </div>
                <span className="bl-stepper-label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Card Body */}
        <div className="bl-wizard-main-card">
          
          {/* STEP 1: CHOOSE BAG TYPE */}
          {currentStep === 1 && (
            <div className="bl-wizard-step-body">
              <h2 className="bl-wizard-step-title">Step 1: Choose Your Bag Silhouette</h2>
              <p className="bl-wizard-step-desc">Select the primary style to establish the structural proportions.</p>

              <div className="bl-type-grid-5">
                {bagTypes.map(t => (
                  <div 
                    key={t.id}
                    className={`bl-type-card ${bagType === t.id ? 'active' : ''}`}
                    onClick={() => setBagType(t.id)}
                  >
                    <div className="bl-type-icon">{t.icon}</div>
                    <h4 className="bl-type-title">{t.title}</h4>
                    <p className="bl-type-desc">{t.desc}</p>
                    <div className="bl-type-select-radio">
                      {bagType === t.id && <Check size={14} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE MATERIAL */}
          {currentStep === 2 && (
            <div className="bl-wizard-step-body">
              <h2 className="bl-wizard-step-title">Step 2: Choose Leather & Material</h2>
              <p className="bl-wizard-step-desc">Hand-selected natural hides and performance fabrics.</p>

              <div className="bl-mat-select-grid">
                {ALL_MATERIALS.map(m => (
                  <div 
                    key={m.id}
                    className={`bl-mat-select-card ${material === m.id ? 'active' : ''}`}
                    onClick={() => setMaterial(m.id)}
                  >
                    <div className="bl-mat-select-img">
                      <img src={m.img} alt={m.name} />
                      <span className="bl-mat-select-tag">{m.tag}</span>
                    </div>
                    <div className="bl-mat-select-info">
                      <h4>{m.name}</h4>
                      <p>{m.desc}</p>
                      <div className="bl-mat-durability-pill">
                        <Gem size={12} /> {m.durability}
                      </div>
                    </div>
                    <div className="bl-mat-check-badge">
                      {material === m.id && <Check size={14} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE COLOR */}
          {currentStep === 3 && (
            <div className="bl-wizard-step-body">
              <h2 className="bl-wizard-step-title">Step 3: Select Leather Dye & Color</h2>
              <p className="bl-wizard-step-desc">Rich drum-dyed shades treated for enduring color-fastness.</p>

              <div className="bl-color-select-grid">
                {colors.map(c => (
                  <div 
                    key={c.name}
                    className={`bl-color-card ${color === c.name ? 'active' : ''}`}
                    onClick={() => setColor(c.name)}
                  >
                    <div className="bl-color-swatch-large" style={{ backgroundColor: c.hex }} />
                    <span className="bl-color-name">{c.name}</span>
                    {color === c.name && (
                      <span className="bl-color-active-tick"><Check size={14} /></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: CHOOSE SIZE */}
          {currentStep === 4 && (
            <div className="bl-wizard-step-body">
              <h2 className="bl-wizard-step-title">Step 4: Select Proportions & Size</h2>
              <p className="bl-wizard-step-desc">Calibrated for your lifestyle and carrying requirements.</p>

              <div className="bl-size-grid">
                {sizes.map(s => (
                  <div 
                    key={s.id}
                    className={`bl-size-card ${size === s.id ? 'active' : ''}`}
                    onClick={() => setSize(s.id)}
                  >
                    <div className="bl-size-header">
                      <h4>{s.label}</h4>
                      <span className="bl-size-dims">{s.dims}</span>
                    </div>
                    <p className="bl-size-note">{s.note}</p>
                    <div className="bl-size-select-indicator">
                      {size === s.id && <Check size={14} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: CHOOSE HARDWARE */}
          {currentStep === 5 && (
            <div className="bl-wizard-step-body">
              <h2 className="bl-wizard-step-title">Step 5: Choose Hardware & Finish</h2>
              <p className="bl-wizard-step-desc">Solid cast brass and alloy fittings with anti-tarnish protective sealing.</p>

              <div className="bl-hardware-grid">
                {hardwares.map(h => (
                  <div 
                    key={h.id}
                    className={`bl-hardware-card ${hardware === h.id ? 'active' : ''}`}
                    onClick={() => setHardware(h.id)}
                  >
                    <div className="bl-hardware-circle" style={{ backgroundColor: h.hex }} />
                    <h4>{h.label}</h4>
                    <p>{h.desc}</p>
                    <div className="bl-hardware-indicator">
                      {hardware === h.id && <Check size={14} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: ADD CUSTOM DETAILS */}
          {currentStep === 6 && (
            <div className="bl-wizard-step-body">
              <h2 className="bl-wizard-step-title">Step 6: Personalize & Interior Details</h2>
              <p className="bl-wizard-step-desc">Initials, stitching style, pocket partitions, and special instructions.</p>

              <div className="bl-custom-details-layout">
                {/* Monogram Initials */}
                <div className="bl-detail-field-group">
                  <label className="bl-field-label">
                    Hot-Stamped Monogram Initials (Up to 3 Letters):
                  </label>
                  <div className="bl-initials-input-wrap">
                    <input 
                      type="text" 
                      maxLength={3}
                      placeholder="e.g. SKB"
                      value={initials}
                      onChange={(e) => setInitials(e.target.value.toUpperCase())}
                      className="bl-initials-input"
                    />
                    <div className="bl-initials-preview-pill">
                      <span>Preview:</span>
                      <strong>{initials ? `[ ${initials} ]` : '[ YOUR INITIALS ]'}</strong>
                    </div>
                  </div>
                </div>

                {/* Stitching */}
                <div className="bl-detail-field-group">
                  <label className="bl-field-label">Stitching Style:</label>
                  <div className="bl-stitching-options-row">
                    {stitchingStyles.map(st => (
                      <button
                        key={st}
                        type="button"
                        className={`bl-option-pill ${stitching === st ? 'active' : ''}`}
                        onClick={() => setStitching(st)}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pocket Requirements */}
                <div className="bl-detail-field-group">
                  <label className="bl-field-label">Select Interior Organization Features:</label>
                  <div className="bl-pockets-checkboxes-grid">
                    {availablePockets.map(p => {
                      const isChecked = pocketReqs.includes(p);
                      return (
                        <div 
                          key={p}
                          className={`bl-pocket-checkbox-item ${isChecked ? 'active' : ''}`}
                          onClick={() => togglePocket(p)}
                        >
                          <div className="bl-pocket-box">
                            {isChecked && <Check size={13} />}
                          </div>
                          <span>{p}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Strap Details */}
                <div className="bl-detail-field-group">
                  <label className="bl-field-label">Shoulder & Handle Strap Type:</label>
                  <select 
                    value={strapReqs} 
                    onChange={(e) => setStrapReqs(e.target.value)}
                    className="bl-strap-select"
                  >
                    <option value="Detachable & Adjustable Crossbody Strap">Detachable & Adjustable Crossbody Strap</option>
                    <option value="Rolled Hand-Grab Double Handles Only">Rolled Hand-Grab Double Handles Only</option>
                    <option value="Chain Accent Mixed Leather Strap">Chain Accent Mixed Leather Strap</option>
                    <option value="Wide Ergonomic Cushioned Backpack Straps">Wide Ergonomic Cushioned Backpack Straps</option>
                  </select>
                </div>

                {/* Additional Instructions */}
                <div className="bl-detail-field-group">
                  <label className="bl-field-label">Any Special Artisan Instructions / Dimensions?</label>
                  <textarea 
                    rows={3}
                    placeholder="Specify any exact zipper preferences, laptop models, lining colors, or bespoke requirements..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="bl-custom-textarea"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: UPLOAD DESIGN */}
          {currentStep === 7 && (
            <div className="bl-wizard-step-body">
              <h2 className="bl-wizard-step-title">Step 7: Upload Sketch or Inspiration</h2>
              <p className="bl-wizard-step-desc">Upload a photo, drawing, CAD sketch or moodboard for our artisan team.</p>

              <div className="bl-upload-zone-wrapper">
                {uploadedImage ? (
                  <div className="bl-uploaded-preview-box">
                    <img src={uploadedImage} alt="Custom design reference" />
                    <button 
                      onClick={() => setUploadedImage(null)} 
                      className="bl-uploaded-remove-btn"
                      title="Remove uploaded image"
                    >
                      <Trash2 size={16} /> Remove Image
                    </button>
                  </div>
                ) : (
                  <label className="bl-upload-dropzone">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="bl-upload-icon-circle">
                      <Upload size={32} />
                    </div>
                    <h4>Click to browse or drag and drop your sketch</h4>
                    <p>PNG, JPG, WEBP or PDF up to 15MB</p>
                    <span className="bl-upload-optional-pill">Optional — Our artisans can also sketch for you</span>
                  </label>
                )}
              </div>
            </div>
          )}

          {/* STEP 8: REVIEW REQUEST */}
          {currentStep === 8 && (
            <div className="bl-wizard-step-body">
              <h2 className="bl-wizard-step-title">Step 8: Review Your Custom Specification</h2>
              <p className="bl-wizard-step-desc">
                Review your selections before submitting. Our artisan master will evaluate your requirements and contact you with a bespoke quote.
              </p>

              <div className="bl-review-summary-card">
                <div className="bl-review-grid-2">
                  
                  {/* Left Column: Visual summary */}
                  <div className="bl-review-visual-box">
                    <div className="bl-review-material-thumb">
                      <img src={selectedMaterialObj.img} alt={selectedMaterialObj.name} />
                      <div className="bl-review-badge">
                        <span>{bagType}</span>
                      </div>
                    </div>

                    <div className="bl-review-swatch-badge">
                      <span className="bl-swatch-circle" style={{ backgroundColor: colors.find(c => c.name === color)?.hex || '#8c5835' }} />
                      <span>{color}</span>
                    </div>

                    {initials && (
                      <div className="bl-review-monogram-box">
                        <span>Hot-Stamped Initials:</span>
                        <strong>{initials}</strong>
                      </div>
                    )}

                    {uploadedImage && (
                      <div className="bl-review-ref-attached">
                        <Camera size={15} /> Reference Sketch Attached
                      </div>
                    )}
                  </div>

                  {/* Right Column: Specification breakdown */}
                  <div className="bl-review-specs-list">
                    <div className="bl-review-row">
                      <span className="bl-r-label">Bag Silhouette:</span>
                      <span className="bl-r-val">{bagType}</span>
                    </div>
                    <div className="bl-review-row">
                      <span className="bl-r-label">Leather Material:</span>
                      <span className="bl-r-val">{selectedMaterialObj.name} ({selectedMaterialObj.tag})</span>
                    </div>
                    <div className="bl-review-row">
                      <span className="bl-r-label">Leather Color:</span>
                      <span className="bl-r-val">{color}</span>
                    </div>
                    <div className="bl-review-row">
                      <span className="bl-r-label">Proportions:</span>
                      <span className="bl-r-val">{size}</span>
                    </div>
                    <div className="bl-review-row">
                      <span className="bl-r-label">Hardware Fitting:</span>
                      <span className="bl-r-val">{hardware}</span>
                    </div>
                    <div className="bl-review-row">
                      <span className="bl-r-label">Stitching Style:</span>
                      <span className="bl-r-val">{stitching}</span>
                    </div>
                    <div className="bl-review-row">
                      <span className="bl-r-label">Internal Features:</span>
                      <span className="bl-r-val">{pocketReqs.join(', ') || 'Standard lining'}</span>
                    </div>
                    <div className="bl-review-row">
                      <span className="bl-r-label">Strap Specification:</span>
                      <span className="bl-r-val">{strapReqs}</span>
                    </div>
                    {customNotes && (
                      <div className="bl-review-row">
                        <span className="bl-r-label">Custom Notes:</span>
                        <span className="bl-r-val">{customNotes}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Artisan Quote Notice */}
                <div className="bl-artisan-notice-banner">
                  <ShieldCheck size={22} className="bl-text-pink" />
                  <div>
                    <strong>No Upfront Payment Required Today</strong>
                    <p>
                      Because each custom hide and pattern is unique, final pricing and timeline are provided only after artisan assessment. You will receive an exact quote and hide swatch samples before crafting begins.
                    </p>
                  </div>
                </div>

                <div className="bl-review-cta-wrap">
                  <button 
                    className="bl-btn-primary bl-submit-quote-btn"
                    onClick={handleSubmitQuote}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Sending to Master Artisans...</span>
                    ) : (
                      <>
                        <Sparkles size={17} /> Request Custom Quote
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Footer */}
          <div className="bl-wizard-footer-nav">
            <button 
              className="bl-btn-secondary"
              onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft size={16} /> Previous
            </button>

            {currentStep < 8 ? (
              <button 
                className="bl-btn-primary"
                onClick={() => setCurrentStep(s => Math.min(8, s + 1))}
              >
                Continue to Step {currentStep + 1} <ArrowRight size={16} />
              </button>
            ) : null}
          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {submittedOrder && (
        <div className="bl-modal-backdrop">
          <div className="bl-modal-card bl-quote-success-modal" onClick={e => e.stopPropagation()}>
            <div className="bl-success-icon-wrap">
              <CheckCircle2 size={48} className="bl-text-pink" />
            </div>

            <h3 className="bl-serif-title" style={{ fontSize: '1.8rem', margin: '12px 0 6px' }}>
              Custom Quote Requested!
            </h3>

            <p style={{ color: 'var(--bl-text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
              Your bespoke <strong>{submittedOrder.customDetails?.bagType}</strong> request has been submitted under Reference <strong>{submittedOrder.id}</strong>.
              Our master artisan will review your design, hide availability, and contact you with swatch options.
            </p>

            <div className="bl-quote-details-summary">
              <div><strong>Reference ID:</strong> {submittedOrder.id}</div>
              <div><strong>Status:</strong> Quote Requested</div>
              <div><strong>Estimated Assessment:</strong> Within 24 Hours</div>
            </div>

            <div className="bl-quote-modal-btns">
              <button 
                className="bl-btn-primary" 
                onClick={() => navigate('/orders')}
              >
                View in My Orders →
              </button>
              <button 
                className="bl-btn-secondary" 
                onClick={() => navigate('/bags')}
              >
                Back to Bags Studio
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
