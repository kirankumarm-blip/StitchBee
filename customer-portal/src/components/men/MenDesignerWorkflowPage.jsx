import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, ArrowLeft, ArrowRight, Check, MapPin, Calendar, Clock, 
  Star, ShieldCheck, User, Layers, Phone, Upload, X, Search, Video, 
  Palette, Award, CheckCircle2
} from 'lucide-react';
import { 
  MEN_CATEGORIES, 
  MEN_FABRICS, 
  MEN_FASHION_DESIGNERS, 
  saveMenStitchingOrder 
} from '../../utils/menStore';
import './MenTailorWorkflowPage.css';

const DESIGNER_LOCALITIES = [
  { name: 'HSR Layout', coords: [12.9141, 77.6413] },
  { name: 'Koramangala', coords: [12.9352, 77.6245] },
  { name: 'Indiranagar', coords: [12.9716, 77.6412] },
  { name: 'Lavelle Road', coords: [12.9719, 77.5946] }
];

export default function MenDesignerWorkflowPage({
  initialCategory = 'custom-design',
  currentUser,
  onLoginRequired,
  onBackToLanding,
  theme = 'light',
  showToast = () => {}
}) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Concept
  const [outfitType, setOutfitType] = useState('Royal Wedding Sherwani & Stole');
  const [designIdea, setDesignIdea] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [occasion, setOccasion] = useState('Wedding / Reception');

  // Step 2: Designer on Google Map
  const [selectedDesignerId, setSelectedDesignerId] = useState('des-1');
  const [selectedLocality, setSelectedLocality] = useState(DESIGNER_LOCALITIES[0]);

  // Leaflet Map Refs
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  // Step 3: Consultation Slot
  const [consultationMode, setConsultationMode] = useState('video'); // 'video' | 'studio'
  const [consultationSlot, setConsultationSlot] = useState('Tomorrow, 04:00 PM - 05:00 PM');

  // Step 4: Fabric & Embellishments
  const [selectedFabricId, setSelectedFabricId] = useState('fab-banarasi');
  const [embellishment, setEmbellishment] = useState('Handcrafted Zardozi Neckline');

  // Step 6: Confirmed Order
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const activeDesigner = MEN_FASHION_DESIGNERS.find(d => d.id === selectedDesignerId) || MEN_FASHION_DESIGNERS[0];
  const activeFabric = MEN_FABRICS.find(f => f.id === selectedFabricId) || MEN_FABRICS[8];

  const consultationFee = activeDesigner.consultationFee || 999;
  const designQuote = 5999;
  const fabricEstimate = Math.round(activeFabric.pricePerMeter * 3);
  const totalAmount = consultationFee + designQuote + fabricEstimate;

  // =========================================================================
  // LEAFLET GOOGLE MAP FOR FASHION DESIGNERS
  // =========================================================================
  useEffect(() => {
    if (currentStep !== 2) return;
    if (!mapContainerRef.current) return;
    if (typeof window === 'undefined' || !window.L) return;

    if (!mapInstanceRef.current) {
      const map = window.L.map(mapContainerRef.current, {
        center: selectedLocality.coords,
        zoom: 13,
        zoomControl: true
      });

      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB &copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      markersGroupRef.current = window.L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView(selectedLocality.coords, 13);
    }

    const map = mapInstanceRef.current;
    const group = markersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // Plot Designers
    MEN_FASHION_DESIGNERS.forEach(d => {
      const isSelected = d.id === selectedDesignerId;
      const designerIcon = window.L.divIcon({
        className: 'men-map-designer-pin',
        html: `
          <div style="background:${isSelected ? '#FF008A' : '#7C3AED'}; color:#fff; padding:4px 8px; border-radius:18px; font-weight:700; font-size:11px; display:flex; align-items:center; gap:4px; box-shadow:0 3px 12px rgba(0,0,0,0.35); border:2px solid #fff; white-space:nowrap; cursor:pointer;">
            <span>✨</span>
            <span>${d.name.split(' ')[0]}</span>
            <span style="color:#FFD700; font-size:10px;">★${d.rating}</span>
          </div>
        `,
        iconSize: [110, 30],
        iconAnchor: [55, 15]
      });

      const marker = window.L.marker([d.lat, d.lng], { icon: designerIcon }).addTo(group);
      marker.on('click', () => {
        setSelectedDesignerId(d.id);
        map.setView([d.lat, d.lng], 14, { animate: true });
      });

      marker.bindPopup(`
        <div style="font-family:sans-serif; min-width:180px; padding:4px;">
          <strong style="color:#071B49; font-size:13px;">${d.name}</strong><br/>
          <span style="font-size:11px; color:#FF008A; font-weight:700;">Lead: ${d.designer}</span><br/>
          <span style="font-size:11px; color:#64748b;">${d.locality}</span><br/>
          <div style="margin-top:6px; font-size:11px; font-weight:700; color:#071B49;">Consultation: ₹${d.consultationFee}</div>
          <button style="margin-top:6px; width:100%; background:#FF008A; color:#fff; border:none; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:700; cursor:pointer;" onclick="window.selectMenDesigner('${d.id}')">Select this Designer</button>
        </div>
      `);
    });

    window.selectMenDesigner = (id) => {
      setSelectedDesignerId(id);
      showToast(`Selected ${MEN_FASHION_DESIGNERS.find(d => d.id === id)?.name}`);
    };
  }, [currentStep, selectedLocality, selectedDesignerId]);

  const handleConfirmDesignerOrder = () => {
    if (!currentUser && onLoginRequired) {
      onLoginRequired();
      return;
    }

    const payload = {
      title: `Designer Couture: ${outfitType}`,
      category: 'Custom Designer Wear',
      outfitName: outfitType,
      designer: {
        name: activeDesigner.name,
        designerLead: activeDesigner.designer,
        locality: activeDesigner.locality,
        rating: activeDesigner.rating
      },
      consultation: {
        mode: consultationMode === 'video' ? '1-on-1 Video Consultation' : 'Designer Studio Visit',
        slot: consultationSlot,
        fee: consultationFee
      },
      fabric: {
        name: activeFabric.name,
        embellishment
      },
      pricing: {
        consultationFee,
        designQuote,
        fabricEstimate,
        total: totalAmount
      },
      deliveryEstimate: '10 - 14 Days (Bespoke Designer Fitting)'
    };

    const saved = saveMenStitchingOrder(payload);
    setConfirmedBooking(saved);
    setCurrentStep(6);
    showToast('Fashion Designer Consultation Booked Successfully!');
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
              { num: 1, label: 'Concept & Idea' },
              { num: 2, label: 'Select Designer (Map)' },
              { num: 3, label: 'Consultation' },
              { num: 4, label: 'Fabrics & Details' },
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
        {/* STEP 1: CONCEPT & INSPIRATION UPLOAD                                */}
        {/* =================================================================== */}
        {currentStep === 1 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 1 OF 5</span>
              <h2 className="step-title">Share Your Custom Design Vision</h2>
              <p className="step-sub">Collaborate with certified fashion designers to create an original masterpiece.</p>
            </div>

            <div className="men-tailoring-specs-grid" style={{ marginBottom: '24px' }}>
              <div className="spec-group">
                <label>Outfit Silhouette</label>
                <input 
                  type="text" 
                  value={outfitType} 
                  onChange={e => setOutfitType(e.target.value)}
                  className="men-input-field" 
                  placeholder="e.g. Asymmetric Indo-Western Bandhgala"
                />
              </div>

              <div className="spec-group">
                <label>Occasion / Event</label>
                <select 
                  value={occasion} 
                  onChange={e => setOccasion(e.target.value)}
                  className="men-select-field"
                >
                  <option>Wedding / Reception Groom</option>
                  <option>Sangeet / Mehendi Celebration</option>
                  <option>Black-Tie Gala / Tuxedo</option>
                  <option>Corporate High-Profile Event</option>
                  <option>Festival / Puja Ceremony</option>
                </select>
              </div>

              <div className="spec-group full-width">
                <label>Design Notes & Styling Vision</label>
                <textarea 
                  rows={4}
                  value={designIdea} 
                  onChange={e => setDesignIdea(e.target.value)}
                  className="men-input-field" 
                  placeholder="Describe colors, lapel cuts, drape preferences, embroidery, or Pinterest ideas..."
                />
              </div>

              <div className="spec-group full-width">
                <label>Upload Reference Sketch or Celebrity Photo (Optional)</label>
                <div className="file-upload-dropzone" style={{ border: '2px dashed #CBD5E1', padding: '24px', borderRadius: '12px', textAlign: 'center', background: '#F8FAFC' }}>
                  <Upload size={28} style={{ color: '#FF008A', margin: '0 auto 8px auto' }} />
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                    {uploadedFile ? `Attached: ${uploadedFile}` : 'Drag & drop sketch or click to browse'}
                  </p>
                  <input 
                    type="file" 
                    onChange={e => {
                      if (e.target.files?.[0]) {
                        setUploadedFile(e.target.files[0].name);
                        showToast(`Uploaded: ${e.target.files[0].name}`);
                      }
                    }}
                    style={{ marginTop: '8px' }}
                  />
                </div>
              </div>
            </div>

            <div className="workflow-bottom-nav">
              <div />
              <button 
                type="button" 
                onClick={() => setCurrentStep(2)} 
                className="men-workflow-primary-btn"
              >
                Proceed to Select Fashion Designer (Map) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 2: SELECT DESIGNER ON GOOGLE MAP                               */}
        {/* =================================================================== */}
        {currentStep === 2 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 2 OF 5</span>
              <h2 className="step-title">Select Certified Fashion Designer from Google Map</h2>
              <p className="step-sub">Browse couture ateliers plotted on Google Maps across Bengaluru.</p>
            </div>

            <div className="locality-pills-row">
              <span className="locality-label"><MapPin size={14} /> Quick Locality:</span>
              {DESIGNER_LOCALITIES.map(loc => (
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

            <div className="men-map-split-container">
              {/* Left Side: Designer Cards */}
              <div className="men-tailors-sidebar-list">
                {MEN_FASHION_DESIGNERS.map(designer => {
                  const isSelected = selectedDesignerId === designer.id;
                  return (
                    <div 
                      key={designer.id}
                      className={`men-tailor-sidebar-card ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedDesignerId(designer.id);
                        if (mapInstanceRef.current) {
                          mapInstanceRef.current.setView([designer.lat, designer.lng], 14, { animate: true });
                        }
                      }}
                    >
                      <div className="tailor-card-top">
                        <img src={designer.image} alt={designer.name} className="tailor-avatar-img" />
                        <div style={{ flex: 1 }}>
                          <div className="tailor-title-row">
                            <h4>{designer.name}</h4>
                            <span className="tailor-rating">★ {designer.rating}</span>
                          </div>
                          <span className="tailor-owner">Lead: {designer.designer}</span>
                          <span className="tailor-locality"><MapPin size={11} /> {designer.locality}</span>
                        </div>
                      </div>

                      <div className="tailor-badges-row">
                        <span className="t-badge" style={{ background: '#F3E8FF', color: '#9333EA' }}>{designer.badge}</span>
                        <span className="t-badge distance">{designer.experience}</span>
                      </div>

                      <div className="tailor-card-bottom">
                        <span className="t-price">Consultation: <strong>₹{designer.consultationFee}</strong></span>
                        <button 
                          type="button"
                          className={`select-tailor-btn ${isSelected ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDesignerId(designer.id);
                            showToast(`Selected ${designer.name}`);
                          }}
                        >
                          {isSelected ? '✓ Selected' : 'Select Designer'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Side: Map */}
              <div className="men-map-view-wrapper">
                <div ref={mapContainerRef} className="men-interactive-leaflet-map" />
                <div className="map-overlay-helper">
                  <span>Click designer pins to view atelier details</span>
                </div>
              </div>
            </div>

            <div className="workflow-bottom-nav">
              <button 
                type="button" 
                onClick={() => setCurrentStep(1)} 
                className="men-workflow-secondary-btn"
              >
                <ArrowLeft size={16} /> Back to Concept
              </button>

              <button 
                type="button" 
                onClick={() => setCurrentStep(3)} 
                className="men-workflow-primary-btn"
              >
                Proceed to Schedule Consultation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 3: CONSULTATION SCHEDULING                                     */}
        {/* =================================================================== */}
        {currentStep === 3 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 3 OF 5</span>
              <h2 className="step-title">Schedule 1-on-1 Designer Consultation</h2>
              <p className="step-sub">Discuss silhouettes, fabric swatches, color palette, and bespoke fitting.</p>
            </div>

            <div className="fabric-source-toggle-row">
              <button 
                type="button"
                className={`source-toggle-card ${consultationMode === 'video' ? 'active' : ''}`}
                onClick={() => setConsultationMode('video')}
              >
                <div className="source-icon-wrap" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                  <Video size={22} />
                </div>
                <div>
                  <h4>1-on-1 HD Video Consultation</h4>
                  <p>30-minute interactive live call with {activeDesigner.designer} to discuss mood board & styling.</p>
                </div>
              </button>

              <button 
                type="button"
                className={`source-toggle-card ${consultationMode === 'studio' ? 'active' : ''}`}
                onClick={() => setConsultationMode('studio')}
              >
                <div className="source-icon-wrap" style={{ background: '#FFE4EE', color: '#FF008A' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4>Atelier Studio Visit</h4>
                  <p>In-person luxury fitting at {activeDesigner.name} in {activeDesigner.locality}.</p>
                </div>
              </button>
            </div>

            <div className="meas-detail-box" style={{ marginTop: '20px' }}>
              <h4>Select Preferred Date & Time Slot</h4>
              <div className="appointment-picker-row">
                <div>
                  <label>Consultation Time Slot</label>
                  <select 
                    value={consultationSlot} 
                    onChange={e => setConsultationSlot(e.target.value)}
                    className="men-select-field"
                  >
                    <option>Tomorrow, 04:00 PM - 05:00 PM</option>
                    <option>Tomorrow, 06:00 PM - 07:00 PM</option>
                    <option>Day After Tomorrow, 11:00 AM - 12:00 PM</option>
                    <option>Saturday, 03:00 PM - 04:00 PM</option>
                  </select>
                </div>
                <div>
                  <label>Selected Atelier</label>
                  <input 
                    type="text" 
                    disabled 
                    value={`${activeDesigner.name} • ${activeDesigner.locality}`}
                    className="men-input-field" 
                  />
                </div>
              </div>
            </div>

            <div className="workflow-bottom-nav">
              <button 
                type="button" 
                onClick={() => setCurrentStep(2)} 
                className="men-workflow-secondary-btn"
              >
                <ArrowLeft size={16} /> Back to Designer
              </button>

              <button 
                type="button" 
                onClick={() => setCurrentStep(4)} 
                className="men-workflow-primary-btn"
              >
                Proceed to Fabrics & Details <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 4: FABRICS & EMBELLISHMENTS                                    */}
        {/* =================================================================== */}
        {currentStep === 4 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 4 OF 5</span>
              <h2 className="step-title">Select Bespoke Fabrics & Embellishments</h2>
              <p className="step-sub">Pick royal brocades, raw silks, or pure wools with artisan embroidery.</p>
            </div>

            <div className="step-section-heading">
              <h3>Curated Luxury Fabrics for Custom Couture</h3>
            </div>

            <div className="men-fabrics-select-grid" style={{ marginBottom: '24px' }}>
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
                  </div>
                </div>
              ))}
            </div>

            <div className="step-section-heading">
              <h3>Artisan Embellishment Preference</h3>
            </div>

            <div className="spec-options-row" style={{ marginBottom: '20px' }}>
              {[
                'Handcrafted Zardozi Neckline',
                'Tone-on-Tone Resham Embroidery',
                'Minimalist Clean Edge Modern',
                'Royal Heritage Dabka Needlework',
                'Custom Monogrammed Facing'
              ].map(opt => (
                <button
                  key={opt}
                  type="button"
                  className={`spec-pill-btn ${embellishment === opt ? 'active' : ''}`}
                  onClick={() => setEmbellishment(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="workflow-bottom-nav">
              <button 
                type="button" 
                onClick={() => setCurrentStep(3)} 
                className="men-workflow-secondary-btn"
              >
                <ArrowLeft size={16} /> Back to Consultation
              </button>

              <button 
                type="button" 
                onClick={() => setCurrentStep(5)} 
                className="men-workflow-primary-btn"
              >
                Review Designer Quotation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 5: QUOTATION & CONFIRMATION                                    */}
        {/* =================================================================== */}
        {currentStep === 5 && (
          <div className="men-workflow-step-card">
            <div className="step-card-header">
              <span className="step-eyebrow">STEP 5 OF 5</span>
              <h2 className="step-title">Review Designer Couture Quotation</h2>
              <p className="step-sub">Itemized breakdown for design, material, and master tailoring.</p>
            </div>

            <div className="quotation-summary-grid">
              <div className="quote-order-details">
                <div className="quote-specs-list">
                  <div className="q-spec-row">
                    <span>Garment Silhouette:</span>
                    <strong>{outfitType}</strong>
                  </div>
                  <div className="q-spec-row">
                    <span>Occasion:</span>
                    <strong>{occasion}</strong>
                  </div>
                  <div className="q-spec-row">
                    <span>Couture Designer:</span>
                    <strong>{activeDesigner.name} ({activeDesigner.designer})</strong>
                  </div>
                  <div className="q-spec-row">
                    <span>Consultation Slot:</span>
                    <strong>{consultationMode === 'video' ? '1-on-1 Video Call' : 'Studio Visit'} • {consultationSlot}</strong>
                  </div>
                  <div className="q-spec-row">
                    <span>Selected Fabric:</span>
                    <strong>{activeFabric.name} ({activeFabric.type})</strong>
                  </div>
                  <div className="q-spec-row">
                    <span>Artisan Detail:</span>
                    <strong>{embellishment}</strong>
                  </div>
                </div>
              </div>

              <div className="quote-price-card">
                <h4>Quotation Breakdown</h4>

                <div className="price-breakdown-table">
                  <div className="price-row">
                    <span>Designer Consultation Fee:</span>
                    <span>₹{consultationFee.toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span>Bespoke Pattern & Tailoring:</span>
                    <span>₹{designQuote.toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span>Luxury Fabric Estimate (3m):</span>
                    <span>₹{fabricEstimate.toLocaleString()}</span>
                  </div>
                  <div className="price-row">
                    <span>Doorstep Trial & Delivery:</span>
                    <span style={{ color: '#10B981', fontWeight: 700 }}>FREE</span>
                  </div>

                  <div className="price-total-row">
                    <span>Total Estimate:</span>
                    <span className="total-val">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={handleConfirmDesignerOrder} 
                  className="confirm-order-btn"
                >
                  Book Designer Consultation <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="workflow-bottom-nav">
              <button 
                type="button" 
                onClick={() => setCurrentStep(4)} 
                className="men-workflow-secondary-btn"
              >
                <ArrowLeft size={16} /> Back to Fabrics
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 6: CONFIRMATION                                                */}
        {/* =================================================================== */}
        {currentStep === 6 && confirmedBooking && (
          <div className="men-workflow-step-card success-card">
            <div className="success-badge-circle">
              <Check size={36} />
            </div>

            <span className="step-eyebrow" style={{ color: '#10B981' }}>CONSULTATION BOOKED</span>
            <h2 className="step-title">Designer Couture Appointment Confirmed!</h2>
            <p className="step-sub">
              Booking Ref: <strong>{confirmedBooking.orderId}</strong> • Scheduled for {consultationSlot}
            </p>

            <div className="order-success-details-box">
              <div className="s-detail-item">
                <span>Designer:</span>
                <strong>{activeDesigner.name} ({activeDesigner.designer})</strong>
              </div>
              <div className="s-detail-item">
                <span>Mode:</span>
                <strong>{consultationMode === 'video' ? 'HD Video Call' : 'Studio Atelier Visit'}</strong>
              </div>
              <div className="s-detail-item">
                <span>Outfit:</span>
                <strong>{outfitType}</strong>
              </div>
              <div className="s-detail-item">
                <span>Delivery Target:</span>
                <strong style={{ color: '#10B981' }}>{confirmedBooking.deliveryEstimate}</strong>
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
