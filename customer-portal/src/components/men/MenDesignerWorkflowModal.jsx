import React, { useState } from 'react';
import { 
  X, Check, Sparkles, MapPin, Star, Upload, Video, Calendar, Clock, 
  ShieldCheck, ArrowRight, ArrowLeft, User, Scissors, Award, Palette, Image as ImageIcon
} from 'lucide-react';
import { 
  MEN_CATEGORIES, 
  MEN_FABRICS, 
  MEN_FASHION_DESIGNERS, 
  saveMenStitchingOrder 
} from '../../utils/menStore';

export default function MenDesignerWorkflowModal({
  isOpen,
  onClose,
  initialCategory = 'custom-design',
  currentUser,
  onLoginRequired,
  theme = 'light',
  showToast = () => {}
}) {
  if (!isOpen) return null;

  // Steps:
  // 1: Concept & Inspiration Upload
  // 2: Discover Certified Fashion Designer (Google Maps)
  // 3: Consultation Slot Booking (Video or Studio Visit)
  // 4: Fabric & Embellishments Consultation
  // 5: Quotation & Confirmation
  // 6: Success
  const [step, setStep] = useState(1);

  // Form State
  const [outfitType, setOutfitType] = useState('Wedding Achkan & Sherwani');
  const [designIdea, setDesignIdea] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [occasion, setOccasion] = useState('Wedding / Reception');

  // Designer Selection
  const [selectedDesigner, setSelectedDesigner] = useState(MEN_FASHION_DESIGNERS[0]);
  const [searchLocation, setSearchLocation] = useState('HSR Layout / Koramangala, Bengaluru');

  // Consultation Details
  const [consultationMode, setConsultationMode] = useState('video'); // 'video' | 'studio'
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 4:00 PM');

  // Fabric & Details
  const [selectedFabricId, setSelectedFabricId] = useState('fab-banarasi');
  const [embellishmentOption, setEmbellishmentOption] = useState('Handcrafted Zardozi Neckline');

  // Confirmed Order
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const activeFabric = MEN_FABRICS.find(f => f.id === selectedFabricId) || MEN_FABRICS[8];

  // Pricing
  const consultationFee = selectedDesigner.consultationFee;
  const designQuote = 5999;
  const fabricEstimate = Math.round(activeFabric.pricePerMeter * 3);
  const totalQuote = consultationFee + designQuote + fabricEstimate;

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
      showToast(`Uploaded sketch: ${e.target.files[0].name}`);
    }
  };

  const handleConfirmDesignerBooking = () => {
    if (!currentUser && onLoginRequired) {
      onLoginRequired();
      return;
    }

    const orderPayload = {
      title: `Designer Couture: ${outfitType}`,
      outfitName: outfitType,
      category: 'Custom Designer Wear',
      designer: {
        name: selectedDesigner.name,
        designerLead: selectedDesigner.designer,
        locality: selectedDesigner.locality,
        rating: selectedDesigner.rating,
        badge: selectedDesigner.badge
      },
      consultation: {
        mode: consultationMode === 'video' ? '1-on-1 Video Consultation' : 'Designer Studio Visit',
        slot: selectedDate,
        consultationFee: consultationFee
      },
      fabricPreferences: {
        fabricName: activeFabric.name,
        embellishments: embellishmentOption
      },
      pricing: {
        consultationFee,
        designQuote,
        fabricEstimate,
        total: totalQuote
      }
    };

    const saved = saveMenStitchingOrder(orderPayload);
    setConfirmedOrder(saved);
    setStep(6);
    showToast(`Consultation Booked with ${selectedDesigner.name}! ✨`);
  };

  return (
    <div className={`men-modal-backdrop ${theme === 'dark' ? 'dark' : ''}`} onClick={onClose}>
      <div className="men-modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="men-modal-header">
          <div className="men-modal-header-left">
            <span className="men-modal-eyebrow">
              <Sparkles size={14} /> FASHION DESIGNER CONSULTATION
            </span>
            <h3 className="men-modal-title">
              {step === 1 && 'Step 1: Share Your Outfit Vision & Inspiration'}
              {step === 2 && 'Step 2: Choose Your Certified Fashion Designer'}
              {step === 3 && 'Step 3: Schedule 1-on-1 Consultation'}
              {step === 4 && 'Step 4: Select Fabric & Luxury Details'}
              {step === 5 && 'Step 5: Review Designer Quotation'}
              {step === 6 && 'Designer Consultation Confirmed!'}
            </h3>
          </div>

          <button className="men-modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Stepper */}
        {step < 6 && (
          <div className="men-modal-stepper">
            {[
              { num: 1, label: 'Vision' },
              { num: 2, label: 'Designer' },
              { num: 3, label: 'Schedule' },
              { num: 4, label: 'Fabrics' },
              { num: 5, label: 'Proposal' }
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

          {/* STEP 1: VISION & INSPIRATION */}
          {step === 1 && (
            <div className="men-step-content">
              <div className="men-form-group">
                <label className="men-form-label">Garment Category to Create:</label>
                <select 
                  value={outfitType} 
                  onChange={(e) => setOutfitType(e.target.value)}
                  className="men-form-select"
                >
                  <option value="Wedding Achkan & Sherwani">Wedding Achkan & Royal Sherwani</option>
                  <option value="Contemporary Indo-Western Bandhgala">Contemporary Indo-Western Bandhgala</option>
                  <option value="Bespoke 3-Piece Tuxedo">Bespoke 3-Piece Tuxedo (Black-Tie)</option>
                  <option value="Regal Silk Kurta & Draped Waistcoat">Regal Silk Kurta & Draped Waistcoat</option>
                  <option value="Casual Designer Jacket & Linen Trouser">Casual Designer Jacket & Linen Trouser</option>
                  <option value="Completely Custom Idea">Completely Custom / Unique Design Concept</option>
                </select>
              </div>

              <div className="men-form-group">
                <label className="men-form-label">Event / Occasion:</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Wedding / Reception', 'Cocktail Gala', 'Festival / Pooja', 'Executive Keynote', 'Red Carpet'].map(occ => (
                    <button
                      key={occ}
                      type="button"
                      className={`men-pill-btn ${occasion === occ ? 'active' : ''}`}
                      onClick={() => setOccasion(occ)}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div className="men-form-group">
                <label className="men-form-label">Describe Your Vision / Preferences:</label>
                <textarea 
                  rows={3}
                  value={designIdea}
                  onChange={(e) => setDesignIdea(e.target.value)}
                  placeholder="Tell our designer about preferred colors, silhouette, fit, embroidery style, or any celebrity look you'd like to recreate..."
                  className="men-form-textarea"
                />
              </div>

              {/* Upload Dropzone */}
              <div className="men-form-group">
                <label className="men-form-label">Upload Sketch or Inspiration Photos (Optional):</label>
                <label className="men-upload-dropzone">
                  <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  <ImageIcon size={32} color="var(--kids-pink, #FF008A)" />
                  <span style={{ fontWeight: 700, marginTop: '8px', color: '#071B49' }}>
                    {uploadedFile ? `Attached: ${uploadedFile}` : 'Drag & drop image here or click to browse'}
                  </span>
                  <small style={{ color: '#64748b' }}>Supports PNG, JPG, WEBP sketches & references</small>
                </label>
              </div>
            </div>
          )}

          {/* STEP 2: DISCOVER DESIGNERS (GOOGLE MAPS) */}
          {step === 2 && (
            <div className="men-step-content">
              <div className="men-maps-search-header">
                <div className="men-maps-search-input-box">
                  <MapPin size={18} className="men-maps-pin-icon" />
                  <input 
                    type="text" 
                    value={searchLocation} 
                    onChange={(e) => setSearchLocation(e.target.value)} 
                    placeholder="Search Bengaluru locality..."
                    className="men-maps-input"
                  />
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FF008A' }}>
                  2 Certified Menswear Designers Found
                </span>
              </div>

              <div className="men-designers-list-grid">
                {MEN_FASHION_DESIGNERS.map(des => (
                  <div 
                    key={des.id} 
                    className={`men-designer-card ${selectedDesigner.id === des.id ? 'active' : ''}`}
                    onClick={() => setSelectedDesigner(des)}
                  >
                    <div className="men-designer-card-top">
                      <img src={des.image} alt={des.name} className="men-designer-avatar" />
                      <div className="men-designer-details">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <h4 className="men-designer-name">{des.name}</h4>
                          <span className="men-verified-tag"><ShieldCheck size={12} /> Certified</span>
                        </div>
                        <div className="men-designer-lead">{des.designer}</div>
                        <div className="men-designer-badge-pill"><Award size={12} /> {des.badge}</div>
                        <div className="men-designer-locality"><MapPin size={12} /> {des.locality} ({des.distanceKm} km away)</div>
                        <div className="men-designer-rating">
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          <strong>{des.rating}</strong> ({des.reviewsCount} clients styled)
                        </div>
                      </div>
                    </div>

                    <div className="men-designer-portfolio-row">
                      <span className="portfolio-label">Couture Showcase:</span>
                      <div className="portfolio-thumbs">
                        {des.portfolio.map((item, pIdx) => (
                          <div key={pIdx} className="portfolio-thumb-item" title={item.title}>
                            <img src={item.image} alt={item.title} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="men-designer-footer">
                      <div className="consult-fee">
                        <span>Consultation:</span>
                        <strong>₹{des.consultationFee}</strong>
                      </div>
                      <button type="button" className={`men-btn-select-des ${selectedDesigner.id === des.id ? 'selected' : ''}`}>
                        {selectedDesigner.id === des.id ? 'Selected' : 'Select Designer'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE CONSULTATION */}
          {step === 3 && (
            <div className="men-step-content">
              <div className="men-consult-mode-toggle">
                <button
                  type="button"
                  className={`men-mode-tab ${consultationMode === 'video' ? 'active' : ''}`}
                  onClick={() => setConsultationMode('video')}
                >
                  <Video size={20} /> 1-on-1 Private Video Consultation
                </button>
                <button
                  type="button"
                  className={`men-mode-tab ${consultationMode === 'studio' ? 'active' : ''}`}
                  onClick={() => setConsultationMode('studio')}
                >
                  <MapPin size={20} /> Designer Atelier Studio Visit ({selectedDesigner.locality})
                </button>
              </div>

              <div className="men-interactive-panel" style={{ marginTop: '20px' }}>
                <h5>Select Convenient Date & Time Slot:</h5>
                <p>During the consultation, {selectedDesigner.name} will sketch 2-3 custom silhouettes, review fabric swatches, and finalize your bespoke outfit specifications.</p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
                  {['Today, 6:00 PM', 'Tomorrow, 11:30 AM', 'Tomorrow, 4:00 PM', 'Saturday, 12:00 PM', 'Sunday, 3:00 PM'].map(slot => (
                    <button
                      key={slot}
                      type="button"
                      className={`men-pill-btn ${selectedDate === slot ? 'active' : ''}`}
                      onClick={() => setSelectedDate(slot)}
                    >
                      <Clock size={14} /> {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FABRIC & EMBELLISHMENTS */}
          {step === 4 && (
            <div className="men-step-content">
              <label className="men-form-label">Preferred Base Fabric:</label>
              <div className="men-fabrics-select-grid">
                {MEN_FABRICS.slice(0, 6).map(fab => (
                  <div 
                    key={fab.id} 
                    className={`men-fabric-select-card ${selectedFabricId === fab.id ? 'active' : ''}`}
                    onClick={() => setSelectedFabricId(fab.id)}
                  >
                    <img src={fab.image} alt={fab.name} className="men-fabric-select-img" />
                    <div className="men-fabric-select-info">
                      <div className="men-fabric-select-name">{fab.name}</div>
                      <div className="men-fabric-select-type">{fab.type}</div>
                      <div className="men-fabric-select-price">₹{fab.pricePerMeter} / m</div>
                    </div>
                    {selectedFabricId === fab.id && (
                      <div className="men-selected-badge"><Check size={14} /></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="men-form-group" style={{ marginTop: '20px' }}>
                <label className="men-form-label">Luxury Embellishments & Trims:</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                  {[
                    'Handcrafted Zardozi Neckline',
                    'Real Mother-of-Pearl Buttons',
                    'Custom Monogram Embroidery',
                    'Dual Tone Silk Pocket Square Trim',
                    'Classic Minimalist Clean Cut'
                  ].map(emb => (
                    <div 
                      key={emb}
                      className={`men-pill-btn ${embellishmentOption === emb ? 'active' : ''}`}
                      onClick={() => setEmbellishmentOption(emb)}
                      style={{ padding: '12px 14px', borderRadius: '10px', textAlign: 'left', cursor: 'pointer' }}
                    >
                      <Check size={14} color={embellishmentOption === emb ? '#FF008A' : '#CBD5E1'} />
                      <span>{emb}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PROPOSAL & QUOTE */}
          {step === 5 && (
            <div className="men-step-content">
              <div className="men-quote-grid">
                <div className="men-quote-summary-left">
                  <div className="men-quote-item-box">
                    <img src={selectedDesigner.image} alt={selectedDesigner.name} className="men-quote-img" />
                    <div>
                      <span className="men-quote-tag">COUTURE DESIGN</span>
                      <h4>{outfitType}</h4>
                      <p>{selectedDesigner.name} • {selectedDesigner.badge}</p>
                      <small>Slot: {selectedDate} ({consultationMode === 'video' ? 'Video Consult' : 'Atelier Visit'})</small>
                    </div>
                  </div>

                  <div className="men-quote-provider-box">
                    <div className="men-provider-row">
                      <div className="men-prov-icon"><Sparkles size={18} /></div>
                      <div>
                        <strong>Designer Consultation:</strong> Includes 2 sketch revisions and digital fabric preview.
                      </div>
                    </div>

                    <div className="men-provider-row">
                      <div className="men-prov-icon"><Scissors size={18} /></div>
                      <div>
                        <strong>Bespoke Craftsmanship:</strong> Hand-cut & single-needle stitched by master tailors.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="men-quote-itemized-card">
                  <h4 className="men-quote-card-title">Designer Quotation</h4>

                  <div className="men-quote-line-row">
                    <span>1-on-1 Designer Consultation Fee:</span>
                    <strong>₹{consultationFee.toLocaleString()}</strong>
                  </div>

                  <div className="men-quote-line-row">
                    <span>Couture Pattern & Handcrafted Stitching:</span>
                    <strong>₹{designQuote.toLocaleString()}</strong>
                  </div>

                  <div className="men-quote-line-row">
                    <span>Premium Fabric ({activeFabric.name} - 3m):</span>
                    <strong>₹{fabricEstimate.toLocaleString()}</strong>
                  </div>

                  <div className="men-quote-line-row">
                    <span>Doorstep Fitting & Delivery:</span>
                    <strong style={{ color: '#10b981' }}>COMPLIMENTARY</strong>
                  </div>

                  <div className="men-quote-total-row">
                    <span>Total Package Estimate:</span>
                    <span className="total-amount">₹{totalQuote.toLocaleString()}</span>
                  </div>

                  <button 
                    type="button" 
                    onClick={handleConfirmDesignerBooking}
                    className="men-btn-pink"
                    style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '16px' }}
                  >
                    Confirm Consultation & Design Order →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION */}
          {step === 6 && confirmedOrder && (
            <div className="men-step-content men-confirmation-screen">
              <div className="men-success-icon-wrap">
                <Check size={40} />
              </div>

              <h2 className="men-conf-title">Consultation & Design Order Booked!</h2>
              <p className="men-conf-subtitle">
                Your appointment with <strong>{selectedDesigner.name}</strong> is scheduled for <strong>{selectedDate}</strong>.
              </p>

              <div className="men-conf-summary-card">
                <div className="men-conf-grid">
                  <div>
                    <label>Design Project:</label>
                    <p>{outfitType}</p>
                  </div>
                  <div>
                    <label>Lead Designer:</label>
                    <p>{selectedDesigner.designer}</p>
                  </div>
                  <div>
                    <label>Consultation Mode:</label>
                    <p>{consultationMode === 'video' ? 'Secure 1-on-1 Video Link' : 'Atelier Visit'}</p>
                  </div>
                  <div>
                    <label>Estimated Delivery:</label>
                    <p>{confirmedOrder.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
                <button type="button" onClick={onClose} className="men-btn-pink">
                  View in Customer Dashboard
                </button>
                <button type="button" onClick={onClose} className="men-btn-outline">
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        {step < 6 && (
          <div className="men-modal-footer">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="men-btn-outline">
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            {step < 5 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="men-btn-pink">
                Continue <ArrowRight size={16} />
              </button>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
}
