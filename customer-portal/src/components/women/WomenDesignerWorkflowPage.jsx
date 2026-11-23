import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Check, Sparkles, Video, MapPin, 
  Calendar, Clock, ShieldCheck, Upload, Award, 
  ChevronRight, Heart, Star, Camera, Phone
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WOMEN_PROVIDERS, WOMEN_FABRICS } from '../../utils/womenStore';
import './WomenDesignerWorkflowPage.css';

export default function WomenDesignerWorkflowPage({
  currentUser,
  theme = 'light',
  initialCategory = 'custom-design',
  onBack,
  showToast = () => {}
}) {
  // Steps: 1: Vision & Sketches, 2: Designer Discovery (Google Maps), 3: Consultation Slot, 4: Confirmed & Next Steps
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Vision
  const [outfitType, setOutfitType] = useState('Festive & Party Wear');
  const [designIdea, setDesignIdea] = useState('');
  const [uploadedSketches, setUploadedSketches] = useState([]);
  const [preferredColors, setPreferredColors] = useState('Rose Pink & Antique Gold');

  // Step 2: Designer Discovery (Filtered designers from WOMEN_PROVIDERS)
  const designers = WOMEN_PROVIDERS.filter(p => p.role === 'designer' || p.type.includes('Designer'));
  const [selectedDesigner, setSelectedDesigner] = useState(designers[0] || WOMEN_PROVIDERS[0]);
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);

  // Step 3: Appointment Booking
  const [consultationMode, setConsultationMode] = useState('video'); // 'video' | 'atelier'
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 3:30 PM');
  const [clientNotes, setClientNotes] = useState('');

  // Step 4: Confirmation
  const [bookingRef, setBookingRef] = useState(null);

  // Map effect safely handled
  useEffect(() => {
    if (currentStep !== 2) {
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

    if (leafletMapRef.current) {
      if (selectedDesigner?.lat && selectedDesigner?.lng) {
        try {
          leafletMapRef.current.setView([selectedDesigner.lat, selectedDesigner.lng], 13);
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
          center: [selectedDesigner?.lat || 12.9716, selectedDesigner?.lng || 77.62],
          zoom: 12,
          scrollWheelZoom: false
        });

        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap | StitchBeez Designer Maps',
          maxZoom: 18
        }).addTo(map);

        leafletMapRef.current = map;

        designers.forEach(des => {
          const isSelected = selectedDesigner && selectedDesigner.id === des.id;
          const markerHtml = `
            <div style="background: ${isSelected ? '#071B49' : '#FF008A'}; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold; border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.3); cursor: pointer;">
              ★
            </div>
          `;
          const icon = Leaflet.divIcon({ html: markerHtml, className: 'women-designer-pin', iconSize: [28, 28], iconAnchor: [14, 14] });
          const marker = Leaflet.marker([des.lat, des.lng], { icon }).addTo(map);
          marker.on('click', () => {
            setSelectedDesigner(des);
          });
        });

        if (selectedDesigner?.lat && selectedDesigner?.lng) {
          map.setView([selectedDesigner.lat, selectedDesigner.lng], 13);
        }

        setTimeout(() => {
          try {
            map.invalidateSize();
          } catch (e) {}
        }, 200);
      } catch (err) {
        console.warn("Designer map initialization skipped:", err);
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
  }, [currentStep, selectedDesigner]);

  const handleConfirmConsultation = () => {
    const genId = 'SBD-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(genId);
    setCurrentStep(4);
    showToast(`Consultation #${genId} confirmed with ${selectedDesigner.name}!`);
  };

  return (
    <div className={`women-designer-page-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {/* Header Strip */}
      <div className="women-workflow-header-strip">
        <div className="women-workflow-header-container">
          <button type="button" onClick={onBack} className="women-back-link-btn">
            <ArrowLeft size={16} /> Back to Women's Stitching
          </button>
          <div className="women-workflow-title-block">
            <span className="workflow-badge">FASHION DESIGNER CONSULTATION & BESPOKE COUTURE</span>
            <h1 className="workflow-page-title">Design a Unique Outfit with Our Fashion Designers</h1>
          </div>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="women-stepper-wrap">
        <div className="women-stepper-container">
          {[
            { step: 1, label: 'Vision & Sketches' },
            { step: 2, label: 'Select Designer (Map)' },
            { step: 3, label: 'Consultation Booking' },
            { step: 4, label: 'Confirmed & Next Steps' }
          ].map(s => (
            <div 
              key={s.step} 
              className={`women-step-node ${currentStep === s.step ? 'active' : ''} ${currentStep > s.step ? 'completed' : ''}`}
              onClick={() => {
                if (currentStep > s.step && currentStep !== 4) {
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

      {/* Workflow Content */}
      <div className="women-workflow-content-wrap">
        <div className="women-workflow-content-container">

          {/* STEP 1: Vision & Ideas */}
          {currentStep === 1 && (
            <div className="workflow-step-card animate-fade-in">
              <div className="step-card-header">
                <h2>1. Share Your Outfit Vision & Inspiration</h2>
                <p>Tell our boutique fashion designers about your concept, silhouette, and occasion.</p>
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>Occasion & Style Category</label>
                <div className="opt-pills-row">
                  {['Festive & Party Wear', 'Bridal & Reception', 'Contemporary Western Gown', 'Modern Indo-Western', 'Designer Saree Blouse'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      className={`opt-pill ${outfitType === cat ? 'active' : ''}`}
                      onClick={() => setOutfitType(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>Color Palette Preference</label>
                <input
                  type="text"
                  className="workflow-input"
                  value={preferredColors}
                  onChange={(e) => setPreferredColors(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>Describe Your Vision in Detail</label>
                <textarea
                  rows={4}
                  className="workflow-textarea"
                  placeholder="e.g. A structured flared Anarkali with sheer organza dupatta, pastel rose tones, delicate golden zari embroidery around the neckline and cuffs..."
                  value={designIdea}
                  onChange={(e) => setDesignIdea(e.target.value)}
                />
              </div>

              {/* Upload Dropzone */}
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label>Upload Inspiration Photos / Sketches</label>
                <div 
                  className="design-upload-dropzone"
                  onClick={() => {
                    setUploadedSketches(prev => [...prev, `Inspiration_${prev.length + 1}.png`]);
                    showToast('Inspiration sketch attached!');
                  }}
                >
                  <Upload size={24} color="#FF008A" />
                  <p style={{ margin: '6px 0 2px 0', fontSize: '0.84rem', fontWeight: 600 }}>Click to attach inspiration images or mood board sketches</p>
                  <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Supports PNG, JPG, WEBP, PDF</span>
                </div>
                {uploadedSketches.length > 0 && (
                  <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {uploadedSketches.map((f, i) => (
                      <span key={i} className="uploaded-file-pill">🎨 {f}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="workflow-actions-row">
                <button type="button" onClick={onBack} className="women-btn-outline">
                  Cancel
                </button>
                <button type="button" onClick={() => setCurrentStep(2)} className="women-btn-pink">
                  Select Fashion Designer →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Designer Discovery via Google Maps */}
          {currentStep === 2 && (
            <div className="workflow-step-card animate-fade-in">
              <div className="step-card-header">
                <h2>2. Select Your Verified Fashion Designer (Google Maps)</h2>
                <p>Browse verified boutique designers in Bengaluru with authentic portfolios and ratings.</p>
              </div>

              <div className="tailor-map-split-grid">
                {/* Map */}
                <div className="map-view-column">
                  <div ref={mapContainerRef} className="workflow-leaflet-map" />
                  <div className="map-info-footer">
                    <span>Showing verified boutique designers in Bengaluru</span>
                  </div>
                </div>

                {/* Designer List */}
                <div className="tailor-cards-column">
                  {designers.map(des => {
                    const isSelected = selectedDesigner && selectedDesigner.id === des.id;
                    return (
                      <div
                        key={des.id}
                        className={`workflow-tailor-item-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedDesigner(des)}
                      >
                        <img src={des.image} alt={des.name} className="tailor-avatar" />
                        <div className="tailor-meta">
                          <div className="tailor-header-row">
                            <h4>{des.name}</h4>
                            <span className="dist-chip">{des.distance}</span>
                          </div>
                          <div className="tailor-rating-row">
                            <Star size={13} fill="#f59e0b" color="#f59e0b" />
                            <strong>{des.rating}</strong> ({des.reviewsCount}+ client reviews)
                          </div>
                          <div className="tailor-spec-tag">{des.specialization}</div>
                          <div className="tailor-loc-tag">📍 {des.location}</div>
                        </div>
                        {isSelected && <div className="tailor-check-badge"><Check size={14} /></div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="workflow-actions-row">
                <button type="button" onClick={() => setCurrentStep(1)} className="women-btn-outline">
                  ← Back to Vision
                </button>
                <button type="button" onClick={() => setCurrentStep(3)} className="women-btn-pink">
                  Book Consultation with {selectedDesigner.name.split(' ')[0]} →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Book Consultation */}
          {currentStep === 3 && (
            <div className="workflow-step-card animate-fade-in">
              <div className="step-card-header">
                <h2>3. Schedule 1-on-1 Design Consultation with {selectedDesigner.name}</h2>
                <p>Choose between a high-definition Video Consultation or an in-person Atelier Visit in {selectedDesigner.location.split(',')[0]}.</p>
              </div>

              {/* Consultation Mode */}
              <div className="fabric-mode-toggle-row">
                <button
                  type="button"
                  className={`fabric-mode-pill ${consultationMode === 'video' ? 'active' : ''}`}
                  onClick={() => setConsultationMode('video')}
                >
                  <Video size={16} /> 1-on-1 Live Video Consultation
                </button>
                <button
                  type="button"
                  className={`fabric-mode-pill ${consultationMode === 'atelier' ? 'active' : ''}`}
                  onClick={() => setConsultationMode('atelier')}
                >
                  <MapPin size={16} /> In-Person Atelier Studio Visit
                </button>
              </div>

              {/* Date & Slot Selection */}
              <div className="workflow-grid-2">
                <div className="form-group">
                  <label>Select Date</label>
                  <select 
                    className="workflow-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option>Today (Urgent slot)</option>
                    <option>Tomorrow (Recommended)</option>
                    <option>This Saturday</option>
                    <option>This Sunday</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Available Time Slot</label>
                  <select 
                    className="workflow-input"
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                  >
                    <option>Tomorrow, 11:30 AM - 12:15 PM</option>
                    <option>Tomorrow, 3:30 PM - 4:15 PM</option>
                    <option>Tomorrow, 5:00 PM - 5:45 PM</option>
                    <option>Tomorrow, 7:00 PM - 7:45 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>Notes for Designer Before Consultation</label>
                <textarea
                  rows={3}
                  className="workflow-textarea"
                  placeholder="Mention budget targets, event dates, fabric queries, or specific body fitting focus..."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                />
              </div>

              <div className="workflow-actions-row">
                <button type="button" onClick={() => setCurrentStep(2)} className="women-btn-outline">
                  ← Back to Designers
                </button>
                <button type="button" onClick={handleConfirmConsultation} className="women-btn-pink">
                  Confirm Consultation Slot →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmed & Next Steps */}
          {currentStep === 4 && (
            <div className="workflow-step-card animate-fade-in" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div className="success-badge-large">
                <Check size={36} color="#FFFFFF" />
              </div>

              <h2 style={{ fontSize: '2rem', color: '#071B49', margin: '14px 0 6px 0' }}>
                Consultation Confirmed!
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem', margin: '0 0 24px 0' }}>
                Reference <strong>#{bookingRef}</strong> with <strong>{selectedDesigner.name}</strong> on <strong>{selectedSlot}</strong>.
              </p>

              <div className="quote-guarantee-badge" style={{ maxWidth: '600px', margin: '0 auto 24px auto', textAlign: 'left' }}>
                <Video size={20} color="#FF008A" />
                <span>
                  The consultation link has been sent to your WhatsApp and registered email. During the session, {selectedDesigner.name.split(' ')[0]} will present custom digital sketches, recommend luxury fabrics, and provide a binding stitching quotation.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
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
