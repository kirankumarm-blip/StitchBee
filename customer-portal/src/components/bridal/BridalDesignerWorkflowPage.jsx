import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Check, Sparkles, Video, MapPin, 
  Calendar, Clock, ShieldCheck, Upload, Award, 
  ChevronRight, Heart, Star, Camera, Phone
} from 'lucide-react';
import { BRIDAL_PROVIDERS, BRIDAL_FABRICS } from '../../utils/bridalStore';
import './BridalDesignerWorkflowPage.css';

export default function BridalDesignerWorkflowPage({
  currentUser,
  theme = 'light',
  initialCategory = 'bridal-lehengas',
  onBack,
  showToast = () => {}
}) {
  // Steps: 1: Vision, 2: Designer (Google Maps), 3: Consultation Slot, 4: Quote & Confirmed
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Vision
  const [targetAudience, setTargetAudience] = useState('bride'); // 'bride' | 'groom' | 'couple'
  const [weddingOccasion, setWeddingOccasion] = useState('Wedding Ceremony (Pheras)');
  const [designIdea, setDesignIdea] = useState('');
  const [uploadedSketch, setUploadedSketch] = useState(null);

  // Step 2: Designer Discovery (Designers only from BRIDAL_PROVIDERS)
  const designers = BRIDAL_PROVIDERS.filter(p => p.isDesigner);
  const [selectedDesigner, setSelectedDesigner] = useState(designers[0]);
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);

  // Step 3: Appointment Booking
  const [consultationMode, setConsultationMode] = useState('video'); // 'video' | 'atelier'
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 4:00 PM');
  const [clientNotes, setClientNotes] = useState('');

  // Step 4: Quotation & Confirmation
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Map effect
  useEffect(() => {
    if (currentStep !== 2 || !mapContainerRef.current) return;
    const L = window.L;
    if (!L) return;

    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapContainerRef.current, {
        center: [12.9716, 77.5946],
        zoom: 12,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap | StitchBeez Designer Maps',
        maxZoom: 18
      }).addTo(leafletMapRef.current);
    }

    designers.forEach(des => {
      const isSel = selectedDesigner && selectedDesigner.id === des.id;
      const customPin = L.divIcon({
        className: 'custom-designer-map-pin',
        html: `
          <div style="
            background: ${isSel ? '#071B49' : '#FF008A'};
            color: #FFFFFF;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid #FFFFFF;
            box-shadow: 0 4px 12px rgba(255, 0, 138, 0.4);
            font-size: 14px;
            cursor: pointer;
          ">
            ★
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker([des.lat, des.lng], { icon: customPin })
        .addTo(leafletMapRef.current)
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 4px;">
            <div style="font-weight: 800; color: #071B49; font-size: 14px;">${des.name}</div>
            <div style="color: #FF008A; font-size: 12px; font-weight: 600;">Couture Fashion Designer</div>
            <div style="color: #64748B; font-size: 11px; margin-top: 2px;">★ ${des.rating} (${des.reviewsCount}+ reviews)</div>
            <div style="color: #334155; font-size: 11px; margin-top: 4px;">${des.location}</div>
          </div>
        `);

      marker.on('click', () => {
        setSelectedDesigner(des);
      });
    });

    if (selectedDesigner) {
      leafletMapRef.current.panTo([selectedDesigner.lat, selectedDesigner.lng], { animate: true });
    }
  }, [currentStep, selectedDesigner]);

  const handleSimulateSketchUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedSketch(URL.createObjectURL(file));
      showToast('Bridal sketch / inspiration image uploaded!');
    }
  };

  const handleConfirmConsultation = () => {
    const bookingId = `SBZ-DES-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: bookingId,
      category: 'Bridal Fashion Designer Consultation',
      categoryKey: 'bridal',
      title: `1-on-1 Bridal Consultation with ${selectedDesigner?.name}`,
      provider: selectedDesigner?.name,
      location: selectedDesigner?.location,
      consultationMode: consultationMode === 'video' ? 'HD Video Call' : 'Atelier Studio Visit',
      slot: selectedSlot,
      occasion: weddingOccasion,
      status: 'Consultation Confirmed',
      orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      totalAmount: 0, // Complimentary 1st consultation
      steps: [
        { name: 'Consultation Booked', date: 'Confirmed', completed: true },
        { name: 'Design Moodboard Discussion', date: selectedSlot, active: true },
        { name: 'Sketch & Fabric Approval', date: 'Within 3 Days', completed: false },
        { name: 'Trial Fitting in Atelier', date: 'Within 10 Days', completed: false },
        { name: 'Final Couture Handover', date: 'Wedding Week', completed: false }
      ]
    };

    try {
      const existing = JSON.parse(localStorage.getItem('stichbee_orders') || '[]');
      localStorage.setItem('stichbee_orders', JSON.stringify([newBooking, ...existing]));
    } catch (e) {
      console.warn('Sync failed', e);
    }

    setConfirmedBooking(newBooking);
    setCurrentStep(4);
    showToast(`Bridal consultation booked with ${selectedDesigner?.name}!`);
  };

  return (
    <div className={`bridal-designer-page-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {/* Header */}
      <div className="bridal-workflow-header-strip">
        <div className="bridal-workflow-header-container">
          <button type="button" onClick={onBack} className="bridal-workflow-back-btn">
            <ArrowLeft size={18} />
            <span>Back to Bridal Hub</span>
          </button>

          <div className="bridal-workflow-header-title">
            <h2>Couture Bridal Fashion Designer Studio</h2>
            <span className="sub">Step {currentStep} of 4 — {
              currentStep === 1 ? 'Design Vision & Inspiration' :
              currentStep === 2 ? 'Select Master Couturier' :
              currentStep === 3 ? 'Consultation Scheduling' : 'Appointment Confirmed'
            }</span>
          </div>

          <div className="bridal-workflow-step-pills">
            {[1, 2, 3, 4].map((step) => (
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

      <div className="bridal-workflow-content-container">
        {/* STEP 1: VISION */}
        {currentStep === 1 && (
          <div className="workflow-step-card animate-fadeIn">
            <div className="step-card-header">
              <span className="step-tag"><Sparkles size={14} /> STEP 1</span>
              <h3>Share Your Bridal Design Vision</h3>
              <p>Work directly with elite wedding designers to co-create a one-of-a-kind masterpiece.</p>
            </div>

            <div className="vision-audience-tabs">
              <label>Who are you designing for?</label>
              <div className="audience-pills">
                <button
                  type="button"
                  className={`aud-pill ${targetAudience === 'bride' ? 'active' : ''}`}
                  onClick={() => setTargetAudience('bride')}
                >
                  Bride (Lehengas, Sarees, Gowns)
                </button>
                <button
                  type="button"
                  className={`aud-pill ${targetAudience === 'groom' ? 'active' : ''}`}
                  onClick={() => setTargetAudience('groom')}
                >
                  Groom (Sherwanis, Tuxedos, Jodhpuris)
                </button>
                <button
                  type="button"
                  className={`aud-pill ${targetAudience === 'couple' ? 'active' : ''}`}
                  onClick={() => setTargetAudience('couple')}
                >
                  Coordinated Couple Ensemble
                </button>
              </div>
            </div>

            <div className="vision-form-grid">
              <div className="form-group">
                <label>Wedding Occasion</label>
                <select 
                  value={weddingOccasion} 
                  onChange={(e) => setWeddingOccasion(e.target.value)}
                  className="bridal-input"
                >
                  <option value="Wedding Ceremony (Pheras)">Wedding Ceremony (Pheras / Mandap)</option>
                  <option value="Grand Sangeet Night">Grand Sangeet & Dance Night</option>
                  <option value="Mehendi & Haldi Festivities">Mehendi & Haldi Festivities</option>
                  <option value="Cocktail & Black-Tie Reception">Cocktail & Black-Tie Reception</option>
                  <option value="Engagement & Ring Ceremony">Engagement & Ring Ceremony</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Describe Your Dream Outfit</label>
                <textarea 
                  rows="3"
                  placeholder="Share details like colors, neckline cuts, flare volume, traditional motifs, fabric preferences, or references to celebrity designer styles..."
                  value={designIdea}
                  onChange={(e) => setDesignIdea(e.target.value)}
                  className="bridal-textarea"
                />
              </div>

              {/* Upload Sketch / Inspiration */}
              <div className="form-group full-width">
                <label>Upload Pinterest Inspiration or Sketch (Optional)</label>
                <div className="sketch-dropzone">
                  <Upload size={28} className="upload-icon" />
                  <div>
                    <h5>Drag & Drop or Click to Upload Bridal Inspiration</h5>
                    <p>Supported: JPG, PNG, WEBP, PDF (Max 15MB)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleSimulateSketchUpload}
                    className="file-input-hidden"
                  />
                </div>
                {uploadedSketch && (
                  <div className="sketch-preview-box">
                    <img src={uploadedSketch} alt="Uploaded sketch" />
                    <span>✓ Inspiration photo attached</span>
                  </div>
                )}
              </div>
            </div>

            <div className="step-actions-footer">
              <button 
                type="button" 
                className="btn-next-step"
                onClick={() => setCurrentStep(2)}
              >
                <span>Select Fashion Designer</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DESIGNER VIA GOOGLE MAPS */}
        {currentStep === 2 && (
          <div className="workflow-step-card animate-fadeIn">
            <div className="step-card-header">
              <span className="step-tag"><Award size={14} /> STEP 2</span>
              <h3>Choose Your Bridal Couturier</h3>
              <p>Explore award-winning fashion designers and ateliers across Bengaluru on Google Maps.</p>
            </div>

            <div className="maps-and-cards-split">
              <div className="map-view-container">
                <div 
                  ref={mapContainerRef} 
                  style={{ width: '100%', height: '420px', borderRadius: '16px' }}
                />
                <div className="map-floating-hint">
                  <Star size={14} color="#FF008A" />
                  <span>Click pin to view atelier credentials</span>
                </div>
              </div>

              <div className="tailors-list-sidebar">
                {designers.map(des => {
                  const isSel = selectedDesigner && selectedDesigner.id === des.id;
                  return (
                    <div 
                      key={des.id}
                      className={`tailor-card-item ${isSel ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedDesigner(des);
                        if (leafletMapRef.current) {
                          leafletMapRef.current.panTo([des.lat, des.lng], { animate: true });
                        }
                      }}
                    >
                      <img src={des.image} alt={des.name} className="tailor-avatar" />
                      <div className="tailor-info">
                        <div className="tailor-name-row">
                          <h4>{des.name}</h4>
                          <span className="verified-tag"><ShieldCheck size={12} /> Certified Couturier</span>
                        </div>
                        <div className="tailor-specialty">{des.specialty}</div>
                        <div className="tailor-locality"><MapPin size={12} /> {des.location}</div>
                        <div className="tailor-meta-row">
                          <span className="rating">★ {des.rating} ({des.reviewsCount}+ brides)</span>
                          <span className="lead">{des.experienceYears} Yrs Haute Couture</span>
                        </div>
                      </div>
                      <button type="button" className={`select-btn ${isSel ? 'active' : ''}`}>
                        {isSel ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="step-actions-footer">
              <button type="button" className="btn-prev-step" onClick={() => setCurrentStep(1)}>
                Back
              </button>
              <button type="button" className="btn-next-step" onClick={() => setCurrentStep(3)}>
                <span>Schedule Consultation</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SCHEDULE 1-ON-1 CONSULTATION */}
        {currentStep === 3 && (
          <div className="workflow-step-card animate-fadeIn">
            <div className="step-card-header">
              <span className="step-tag"><Calendar size={14} /> STEP 3</span>
              <h3>Schedule 1-on-1 Consultation with {selectedDesigner?.name}</h3>
              <p>Discuss sketches, fabric swatches, embroidery swatches, and timeline directly with your designer.</p>
            </div>

            <div className="consult-mode-cards">
              <div 
                className={`mode-card ${consultationMode === 'video' ? 'active' : ''}`}
                onClick={() => setConsultationMode('video')}
              >
                <Video size={24} className="mode-icon" />
                <h4>1-on-1 HD Video Consultation</h4>
                <p>Join from the comfort of your home. Review digital sketches, color palettes, and video fabric close-ups.</p>
                <span className="badge-free">Complimentary</span>
              </div>

              <div 
                className={`mode-card ${consultationMode === 'atelier' ? 'active' : ''}`}
                onClick={() => setConsultationMode('atelier')}
              >
                <MapPin size={24} className="mode-icon" />
                <h4>In-Person Atelier Visit</h4>
                <p>Visit {selectedDesigner?.name}'s private boutique in {selectedDesigner?.location}. Touch real fabric rolls and embroidery samples.</p>
                <span className="badge-free">Complimentary Studio Access</span>
              </div>
            </div>

            <h4 className="section-subheading">Select Available Consultation Slot</h4>
            <div className="slots-grid">
              {(selectedDesigner?.availableSlots || [
                'Tomorrow, 11:30 AM', 
                'Tomorrow, 4:00 PM', 
                'Saturday, 2:30 PM',
                'Sunday, 11:00 AM'
              ]).map(slot => (
                <button
                  key={slot}
                  type="button"
                  className={`slot-chip ${selectedSlot === slot ? 'active' : ''}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  <Clock size={14} />
                  <span>{slot}</span>
                </button>
              ))}
            </div>

            <div className="notes-box" style={{ marginTop: '20px' }}>
              <label>Special Notes for Designer Prior to Call</label>
              <input 
                type="text" 
                placeholder="E.g., Please have rose-gold zari samples and pastel Banarasi fabrics ready."
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                className="bridal-input"
              />
            </div>

            <div className="step-actions-footer">
              <button type="button" className="btn-prev-step" onClick={() => setCurrentStep(2)}>
                Back
              </button>
              <button 
                type="button" 
                className="btn-next-step"
                onClick={handleConfirmConsultation}
              >
                <span>Confirm Consultation Appointment →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {currentStep === 4 && confirmedBooking && (
          <div className="workflow-step-card animate-fadeIn order-success-card">
            <div className="success-badge-circle">
              <Check size={38} />
            </div>

            <h3 className="success-title">Bridal Consultation Confirmed!</h3>
            <p className="success-subtitle">
              Appointment ID: <strong>{confirmedBooking.id}</strong> • Scheduled for <strong>{confirmedBooking.slot}</strong>
            </p>

            <div className="order-summary-box">
              <div className="summary-item">
                <span>Designer Atelier:</span>
                <strong>{confirmedBooking.provider}</strong>
              </div>
              <div className="summary-item">
                <span>Location:</span>
                <strong>{confirmedBooking.location}</strong>
              </div>
              <div className="summary-item">
                <span>Consultation Mode:</span>
                <strong>{confirmedBooking.consultationMode}</strong>
              </div>
              <div className="summary-item">
                <span>Occasion:</span>
                <strong>{confirmedBooking.occasion}</strong>
              </div>
            </div>

            <div className="success-actions-row">
              <button type="button" className="btn-return-hub" onClick={onBack}>
                Return to Bridal Hub
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
