import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowLeft, ArrowRight, Check, CheckCircle2, Upload, Calendar, 
  Clock, MapPin, Phone, Star, ShieldCheck, AlertCircle, Palette, Video, 
  MessageSquare, User, Truck, DollarSign, Heart, Info, Eye, Layers, 
  Scissors, Edit3, Award, ExternalLink
} from 'lucide-react';
import { 
  KIDS_CATEGORIES, 
  KIDS_FABRICS, 
  KIDS_AGE_GROUPS, 
  KIDS_FASHION_DESIGNERS, 
  VERIFIED_KIDS_TAILORS,
  NEARBY_PROFESSIONALS_DATABASE,
  calculateStitchingEstimate,
  saveKidsOrder,
  getSavedChildMeasurements,
  saveChildMeasurements,
  KIDS_ASSETS
} from '../../utils/kidsStitchingStore';
import NearbyProfessionalsMap from '../common/NearbyProfessionalsMap';
import './KidsWorkflows.css';

const DESIGNER_STEPS = [
  { num: 1, label: "Idea", title: "Outfit Concept & Occasion" },
  { num: 2, label: "Designer", title: "Select StitchBeez Fashion Designer" },
  { num: 3, label: "Consultation", title: "Schedule Design Consultation" },
  { num: 4, label: "Mockup", title: "Design Creation & Approval" },
  { num: 5, label: "Fabric", title: "Select Fabric & Materials" },
  { num: 6, label: "Measurements", title: "Sizing & Growth Allowance" },
  { num: 7, label: "Specialist", title: "Production Specialist Assignment" },
  { num: 8, label: "Pricing", title: "Pricing & Timeline Review" },
  { num: 9, label: "Confirm", title: "Confirm Custom Couture Order" },
  { num: 10, label: "Track", title: "Live Design & Stitching Tracker" }
];

export default function KidsDesignerWorkflowPage({ 
  initialCategory = 'custom-design', 
  initialAge = 'little-kids',
  onBackToLanding,
  currentUser,
  onLoginRequired,
  theme = 'light'
}) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Design Idea
  const [ageGroup, setAgeGroup] = useState(initialAge);
  const [category, setCategory] = useState(initialCategory);
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [preferredStyle, setPreferredStyle] = useState('Fairytale Princess / Whimsical');
  const [budgetRange, setBudgetRange] = useState('₹3,000 - ₹5,000');
  const [designIdeaNotes, setDesignIdeaNotes] = useState('Looking for a pastel pink tulle layered dress with soft cotton lining for a 5th birthday party.');
  const [moodboardImages, setMoodboardImages] = useState([]);

  // Step 2: Designer Selection
  const [selectedDesignerId, setSelectedDesignerId] = useState('designer-d1');

  // Step 3: Consultation
  const [consultationMode, setConsultationMode] = useState('video'); // 'video' | 'voice' | 'chat' | 'in-person'
  const [consultationDate, setConsultationDate] = useState('2026-10-17');
  const [consultationSlot, setConsultationSlot] = useState('04:30 PM - 05:15 PM');
  const [parentContact, setParentContact] = useState('+91 98450 12345');
  const [colorPreferences, setColorPreferences] = useState('Pastel Pink, Cream & Soft Gold');

  // Step 4: Design Mockup & Approval
  const [designApproved, setDesignApproved] = useState(true);
  const [designFeedback, setDesignFeedback] = useState('');
  const [activeMockupVersion, setActiveMockupVersion] = useState('v1.1');

  // Step 5: Fabric Selection
  const [fabricSource, setFabricSource] = useState('stitchbeez'); // 'stitchbeez' | 'own'
  const [selectedFabricId, setSelectedFabricId] = useState('organic-cotton');
  const [fabricColor, setFabricColor] = useState('Blush Pink');
  const [fabricMeters, setFabricMeters] = useState(2.0);
  const [ownFabricDesc, setOwnFabricDesc] = useState('');

  // Step 6: Measurements
  const [childName, setChildName] = useState('Ananya');
  const [chest, setChest] = useState(24);
  const [waist, setWaist] = useState(22);
  const [hip, setHip] = useState(25);
  const [shoulder, setShoulder] = useState(10.5);
  const [sleeves, setSleeves] = useState(13);
  const [length, setLength] = useState(26);
  const [fitType, setFitType] = useState('growth-allowance');
  const [measurementsConfirmed, setMeasurementsConfirmed] = useState(true);

  // Step 7: Specialist Assignment
  const [assignedSpecialistId, setAssignedSpecialistId] = useState('tailor-k1');

  // Step 9 & 10: Confirmation & Tracking
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [notification, setNotification] = useState(null);

  // Selected object getters
  const selectedDesigner = NEARBY_PROFESSIONALS_DATABASE.find(d => d.id === selectedDesignerId) || KIDS_FASHION_DESIGNERS[0];
  const selectedSpecialist = VERIFIED_KIDS_TAILORS.find(t => t.id === assignedSpecialistId) || VERIFIED_KIDS_TAILORS[0];
  const selectedCategoryObj = KIDS_CATEGORIES.find(c => c.id === category) || KIDS_CATEGORIES[0];
  const selectedFabricObj = KIDS_FABRICS.find(f => f.id === selectedFabricId) || KIDS_FABRICS[0];
  const selectedAgeObj = KIDS_AGE_GROUPS.find(a => a.id === ageGroup) || KIDS_AGE_GROUPS[3];

  // Pricing calculation
  const estimate = calculateStitchingEstimate({
    category,
    fabricSource,
    selectedFabricId,
    fabricMeters,
    measurementType: 'home-visit',
    serviceType: 'designer',
    selectedDesignerId
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMoodboardImages(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleNextStep = () => {
    if (currentStep === 4 && !designApproved) {
      showToast('Please approve the designer mockup or request adjustments');
      return;
    }
    if (currentStep === 6 && !measurementsConfirmed) {
      showToast('Please confirm the measurements and fit allowance');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => Math.min(prev + 1, 10));
  };

  const handlePrevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Place Designer Order
  const handleConfirmOrder = () => {
    const orderData = {
      serviceType: 'designer',
      designerId: selectedDesigner.id,
      designerName: selectedDesigner.name,
      designerAvatar: selectedDesigner.avatar,
      specialistName: selectedSpecialist.name,
      categoryKey: category,
      categoryName: selectedCategoryObj.name,
      categoryImg: selectedCategoryObj.img,
      ageGroup: selectedAgeObj.label,
      occasion,
      preferredStyle,
      designNotes: designIdeaNotes,
      consultation: {
        mode: consultationMode,
        date: consultationDate,
        slot: consultationSlot,
        phone: parentContact
      },
      fabricDetails: {
        source: fabricSource,
        name: selectedFabricObj.name,
        color: fabricColor,
        meters: fabricMeters
      },
      measurements: {
        childName,
        chest,
        waist,
        shoulder,
        length,
        sleeves,
        fitType
      },
      pricing: estimate,
      totalAmount: estimate.totalAmount,
      estimatedDelivery: 'Oct 28, 2026'
    };

    saveChildMeasurements({
      childName,
      ageGroup: selectedAgeObj.label,
      chest,
      waist,
      shoulder,
      length,
      sleeves
    });

    const newOrder = saveKidsOrder(orderData);
    setConfirmedOrder(newOrder);
    showToast(`Bespoke Designer Order #${newOrder.id} initiated!`);
    setCurrentStep(10);
  };

  return (
    <div className={`kids-workflow-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>

      {/* Toast */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #FF087A, #8A2BE2)',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(255,8,122,0.4)',
          zIndex: 9999,
          fontWeight: 700,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={16} />
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="kids-workflow-header">
        <button className="kids-workflow-back-btn" onClick={onBackToLanding}>
          <ArrowLeft size={16} /> Back to Kids Stitching Hub
        </button>
        <div className="kids-workflow-title-box">
          <div>
            <span style={{ 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: '#8A2BE2', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em' 
            }}>
              Service 2: StitchBeez Fashion Designer
            </span>
            <h1 className="kids-workflow-main-title">{DESIGNER_STEPS[currentStep - 1].title}</h1>
          </div>
          <div style={{ 
            fontSize: '0.85rem', 
            fontWeight: 700, 
            color: 'var(--kids-navy-muted)',
            background: 'var(--kids-card-bg)',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid var(--kids-border)'
          }}>
            Step {currentStep} of 10
          </div>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="kids-stepper-bar">
        {DESIGNER_STEPS.map((s) => {
          const isDone = currentStep > s.num;
          const isActive = currentStep === s.num;
          return (
            <div 
              key={s.num} 
              className={`kids-step-pill ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
              onClick={() => {
                if (s.num < currentStep && currentStep !== 10) {
                  setCurrentStep(s.num);
                }
              }}
              style={{ cursor: s.num < currentStep ? 'pointer' : 'default' }}
            >
              <div className="kids-step-circle">
                {isDone ? <Check size={14} /> : s.num}
              </div>
              <span className="kids-step-label">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="kids-step-content-box">

        {/* ================= STEP 1: CHOOSE OUTFIT / DESIGN IDEA ================= */}
        {currentStep === 1 && (
          <div className="kids-fade-in">
            {/* Age Group */}
            <div className="kids-form-group">
              <label className="kids-form-label">
                1. Select Child's Age Group <span style={{ color: 'var(--kids-pink)' }}>*</span>
              </label>
              <div className="kids-age-pill-grid">
                {KIDS_AGE_GROUPS.map((ag) => (
                  <div 
                    key={ag.id} 
                    className={`kids-select-tile ${ageGroup === ag.id ? 'selected' : ''}`}
                    onClick={() => setAgeGroup(ag.id)}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{ag.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)' }}>{ag.range}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Occasion & Category */}
            <div className="kids-grid-2col">
              <div className="kids-form-group">
                <label className="kids-form-label">Celebration / Occasion</label>
                <select 
                  className="kids-text-input" 
                  value={occasion} 
                  onChange={(e) => setOccasion(e.target.value)}
                >
                  <option>1st Birthday / Milestone Party</option>
                  <option>Wedding Guest / Family Reception</option>
                  <option>Festive Celebration (Diwali / Eid / Christmas)</option>
                  <option>Theme Cosplay / Storybook Character</option>
                  <option>School Annual Function / Graduation</option>
                  <option>Casual Luxury Everyday Wear</option>
                </select>
              </div>

              <div className="kids-form-group">
                <label className="kids-form-label">Clothing Category</label>
                <select 
                  className="kids-text-input" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {KIDS_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preferred Aesthetic & Budget */}
            <div className="kids-grid-2col">
              <div className="kids-form-group">
                <label className="kids-form-label">Preferred Aesthetic Theme</label>
                <select 
                  className="kids-text-input" 
                  value={preferredStyle} 
                  onChange={(e) => setPreferredStyle(e.target.value)}
                >
                  <option>Fairytale Princess / Whimsical Twirl</option>
                  <option>Royal Indian Heritage (Zari & Silk)</option>
                  <option>Modern European Minimalist</option>
                  <option>Gentleman’s Miniature Tuxedo / Sharp Cuts</option>
                  <option>Vintage Floral Bohemian</option>
                </select>
              </div>

              <div className="kids-form-group">
                <label className="kids-form-label">Estimated Budget Range (Optional)</label>
                <select 
                  className="kids-text-input" 
                  value={budgetRange} 
                  onChange={(e) => setBudgetRange(e.target.value)}
                >
                  <option>₹1,500 - ₹3,000 (Simple Designer)</option>
                  <option>₹3,000 - ₹5,000 (Couture Special)</option>
                  <option>₹5,000 - ₹10,000 (Heavy Handcrafted Couture)</option>
                </select>
              </div>
            </div>

            {/* Design Notes */}
            <div className="kids-form-group">
              <label className="kids-form-label">Describe Your Vision / Child's Preferences</label>
              <textarea 
                className="kids-textarea" 
                rows="3" 
                value={designIdeaNotes} 
                onChange={(e) => setDesignIdeaNotes(e.target.value)}
                placeholder="Describe colors, theme, silhouette, child's comfort notes (e.g. sensitive skin, hates scratchy embroidery, wants pockets)."
              />
            </div>

            {/* Inspiration Uploads */}
            <div className="kids-form-group">
              <label className="kids-form-label">Moodboard & Inspiration Photos (Pinterest / Sketches)</label>
              <div className="kids-upload-dropzone">
                {moodboardImages.length > 0 && (
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {moodboardImages.map((img, i) => (
                      <img key={i} src={img} alt={`Moodboard ${i}`} style={{ width: 70, height: 70, borderRadius: 8, objectFit: 'cover' }} />
                    ))}
                  </div>
                )}
                <label className="kids-secondary-btn" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                  + Add Inspiration Photo
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SELECT FASHION DESIGNER ================= */}
        {currentStep === 2 && (
          <div className="kids-fade-in">
            <NearbyProfessionalsMap
              serviceType="designer"
              selectedId={selectedDesignerId}
              onSelectProfessional={(pro) => {
                setSelectedDesignerId(pro.id);
                setNotification(`Selected Fashion Designer ${pro.name}!`);
                setTimeout(() => setNotification(null), 3000);
              }}
              title="Find Kids Fashion Designers & Ateliers via Google Maps"
              subtitle="Collaborate 1-on-1 with certified couture designers and local design studios for bespoke children's outfits."
              theme={theme}
            />

            {/* Selected Designer Confirmation Strip */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#EFF6FF',
              border: '1.5px solid #BFDBFE',
              borderRadius: '16px',
              padding: '16px 20px',
              marginTop: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={selectedDesigner.avatar || selectedDesigner.photo || '/des1.jpg'} 
                  alt={selectedDesigner.name} 
                  style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover' }} 
                />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
                    {selectedDesigner.isPartner ? '★ Selected Certified Couture Designer' : 'G Selected Google Place Atelier'}
                  </div>
                  <h4 style={{ margin: '2px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--kids-navy)' }}>
                    {selectedDesigner.name}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--kids-navy-muted)' }}>
                    {selectedDesigner.title || selectedDesigner.locality} • Consultation: ₹{selectedDesigner.consultationFee || 299} • Turnaround: {selectedDesigner.turnAroundDays || '5-7 Days'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="kids-primary-btn"
                style={{ padding: '10px 22px', fontSize: '0.88rem', background: '#2563EB' }}
                onClick={() => setCurrentStep(3)}
              >
                <span>Continue to Consultation Schedule</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: DESIGN CONSULTATION ================= */}
        {currentStep === 3 && (
          <div className="kids-fade-in">
            <div className="kids-form-group">
              <label className="kids-form-label">
                1. Select Consultation Method with {selectedDesigner.name}
              </label>
              <div className="kids-grid-4col">
                {[
                  { id: 'video', title: '1-on-1 Video Call', icon: Video, desc: 'High definition virtual design session with screen sketch sharing' },
                  { id: 'voice', title: 'Phone Call', icon: Phone, desc: 'Detailed audio discussion regarding design direction & fabrics' },
                  { id: 'chat', title: 'Interactive Chat', icon: MessageSquare, desc: 'Exchange reference photos, swatches and ideas in chat' },
                  { id: 'in-person', title: 'Atelier Visit', icon: MapPin, desc: 'In-person meeting at StitchBeez Indiranagar design studio' }
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div 
                      key={m.id} 
                      className={`kids-select-tile ${consultationMode === m.id ? 'selected' : ''}`}
                      onClick={() => setConsultationMode(m.id)}
                    >
                      <Icon size={22} style={{ color: 'var(--kids-pink)', marginBottom: '8px' }} />
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>{m.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--kids-navy-muted)' }}>{m.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Schedule Slot */}
            <div className="kids-grid-2col" style={{ marginTop: '20px' }}>
              <div className="kids-form-group">
                <label className="kids-form-label">Choose Consultation Date</label>
                <input 
                  type="date" 
                  className="kids-text-input" 
                  value={consultationDate} 
                  onChange={(e) => setConsultationDate(e.target.value)}
                />
              </div>

              <div className="kids-form-group">
                <label className="kids-form-label">Available Designer Slots</label>
                <select 
                  className="kids-text-input" 
                  value={consultationSlot} 
                  onChange={(e) => setConsultationSlot(e.target.value)}
                >
                  <option>10:30 AM - 11:15 AM (Morning)</option>
                  <option>02:00 PM - 02:45 PM (Afternoon)</option>
                  <option>04:30 PM - 05:15 PM (Evening - Recommended)</option>
                  <option>06:30 PM - 07:15 PM (Post-Work)</option>
                </select>
              </div>
            </div>

            <div className="kids-grid-2col">
              <div className="kids-form-group">
                <label className="kids-form-label">Preferred Color Palette Swatches</label>
                <input 
                  type="text" 
                  className="kids-text-input" 
                  value={colorPreferences} 
                  onChange={(e) => setColorPreferences(e.target.value)}
                  placeholder="e.g. Lavender, Rose Gold, Off-White"
                />
              </div>

              <div className="kids-form-group">
                <label className="kids-form-label">Parent Contact Mobile</label>
                <input 
                  type="tel" 
                  className="kids-text-input" 
                  value={parentContact} 
                  onChange={(e) => setParentContact(e.target.value)}
                />
              </div>
            </div>

            <div className="kids-banner-notice" style={{ marginTop: '16px' }}>
              <Info size={18} style={{ color: 'var(--kids-pink)', flexShrink: 0 }} />
              <div>
                <strong>Consultation Preparation:</strong> You will receive a calendar invite and video link. Feel free to have your child join the call for 5 minutes so the designer can see their personality and smile!
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: DESIGN CREATION & APPROVAL ================= */}
        {currentStep === 4 && (
          <div className="kids-fade-in">
            <div className="kids-grid-2col">
              {/* Left: Interactive Mockup Card */}
              <div className="kids-mockup-card">
                <div className="kids-mockup-header">
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--kids-navy)', margin: 0 }}>
                      Digital Couture Sketch & Concept
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)' }}>
                      Prepared by {selectedDesigner.name} • Version {activeMockupVersion}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['v1.0', 'v1.1'].map(v => (
                      <button 
                        key={v}
                        type="button"
                        className={`kids-choice-chip ${activeMockupVersion === v ? 'active' : ''}`}
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        onClick={() => setActiveMockupVersion(v)}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="kids-mockup-preview-img-box">
                  <img 
                    src={selectedCategoryObj.img} 
                    alt="Design Preview" 
                    className="kids-mockup-img"
                  />
                  <div className="kids-mockup-badge">
                    {designApproved ? '✓ Design Approved' : 'Approval Pending'}
                  </div>
                </div>

                <div className="kids-mockup-features">
                  <div><strong>Silhouette:</strong> Tiered A-line twirl with layered horsehair braid hem</div>
                  <div><strong>Lining:</strong> 100% GOTS organic cotton anti-itch double layer</div>
                  <div><strong>Embellishment:</strong> Hand-cut fabric flowers with soft pearl center beads</div>
                  <div><strong>Back Closure:</strong> Invisible concealed YKK zipper + comfortable bow sash</div>
                </div>
              </div>

              {/* Right: Approval & Feedback */}
              <div className="kids-summary-box">
                <h3 className="kids-summary-title">Design Review & Approval</h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--kids-navy-muted)', lineHeight: '1.5' }}>
                  Review the designer's concept sketch and material specifications. We strictly do not proceed to fabric cutting until you are 100% satisfied with the design.
                </p>

                <div style={{ 
                  margin: '18px 0', 
                  padding: '16px', 
                  background: designApproved ? 'rgba(16,185,129,0.1)' : 'var(--kids-border-light)', 
                  borderRadius: '10px',
                  border: `1px solid ${designApproved ? '#10B981' : 'var(--kids-border)'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="checkbox" 
                      id="designerApprovalCheckbox"
                      checked={designApproved} 
                      onChange={(e) => setDesignApproved(e.target.checked)}
                      style={{ width: 20, height: 20, accentColor: '#10B981' }}
                    />
                    <label htmlFor="designerApprovalCheckbox" style={{ fontWeight: 800, color: 'var(--kids-navy)', cursor: 'pointer', fontSize: '0.92rem' }}>
                      I approve this design concept for tailoring
                    </label>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)', marginTop: '6px', marginLeft: '30px' }}>
                    Approved by parent on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div className="kids-form-group">
                  <label className="kids-form-label">Request Minor Design Tweaks (Optional)</label>
                  <textarea 
                    className="kids-textarea" 
                    rows="3" 
                    value={designFeedback} 
                    onChange={(e) => setDesignFeedback(e.target.value)}
                    placeholder="e.g. Could we make the bow slightly smaller and add flutter cap sleeves?"
                  />
                  {designFeedback && (
                    <button 
                      type="button" 
                      className="kids-secondary-btn" 
                      style={{ marginTop: '8px', fontSize: '0.82rem' }}
                      onClick={() => showToast('Design change request sent to ' + selectedDesigner.name)}
                    >
                      Send Tweaks to Designer
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: FABRIC SELECTION ================= */}
        {currentStep === 5 && (
          <div className="kids-fade-in">
            {/* Same functionality as tailor stitching */}
            <div className="kids-fabric-mode-selector">
              <div 
                className={`kids-fabric-mode-card ${fabricSource === 'stitchbeez' ? 'active' : ''}`}
                onClick={() => setFabricSource('stitchbeez')}
              >
                <div className="kids-mode-radio">
                  <div className={`radio-dot ${fabricSource === 'stitchbeez' ? 'active' : ''}`} />
                </div>
                <div>
                  <h3 className="kids-mode-title">Designer Curated Fabrics (StitchBeez)</h3>
                  <p className="kids-mode-desc">
                    {selectedDesigner.name} recommends skin-friendly Organic Cotton, Satin or Muslin for this design.
                  </p>
                </div>
              </div>

              <div 
                className={`kids-fabric-mode-card ${fabricSource === 'own' ? 'active' : ''}`}
                onClick={() => setFabricSource('own')}
              >
                <div className="kids-mode-radio">
                  <div className={`radio-dot ${fabricSource === 'own' ? 'active' : ''}`} />
                </div>
                <div>
                  <h3 className="kids-mode-title">I Have My Own Fabric</h3>
                  <p className="kids-mode-desc">
                    Send your own heritage fabric or gifted material. Our runner picks it up from your doorstep.
                  </p>
                </div>
              </div>
            </div>

            {fabricSource === 'stitchbeez' ? (
              <div style={{ marginTop: '20px' }}>
                <label className="kids-form-label">Select Designer Recommended Fabric</label>
                <div className="kids-fabrics-picker-grid">
                  {KIDS_FABRICS.map((fab) => (
                    <div 
                      key={fab.id} 
                      className={`kids-fab-tile ${selectedFabricId === fab.id ? 'active' : ''}`}
                      onClick={() => setSelectedFabricId(fab.id)}
                    >
                      <div className="kids-fab-tile-thumb">
                        <img src={fab.img} alt={fab.name} />
                      </div>
                      <div className="kids-fab-tile-info">
                        <div className="kids-fab-tile-name">{fab.name}</div>
                        <div className="kids-fab-tile-tag">{fab.tag}</div>
                        <div className="kids-fab-tile-price">₹{fab.pricePerMetre}/m</div>
                      </div>
                      {selectedFabricId === fab.id && (
                        <div className="kids-fab-tile-check"><Check size={14} /></div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="kids-grid-3col" style={{ marginTop: '20px' }}>
                  <div className="kids-form-group">
                    <label className="kids-form-label">Color Shade</label>
                    <select className="kids-text-input" value={fabricColor} onChange={(e) => setFabricColor(e.target.value)}>
                      {selectedFabricObj.colors.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="kids-form-group">
                    <label className="kids-form-label">Meters Required</label>
                    <input 
                      type="number" 
                      step="0.25" 
                      min="1" 
                      max="6" 
                      className="kids-text-input" 
                      value={fabricMeters} 
                      onChange={(e) => setFabricMeters(parseFloat(e.target.value) || 1)} 
                    />
                  </div>

                  <div className="kids-form-group">
                    <label className="kids-form-label">Fabric Total</label>
                    <div style={{ height: '42px', display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '1.1rem', color: 'var(--kids-pink)' }}>
                      ₹{Math.round(selectedFabricObj.pricePerMetre * fabricMeters)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="kids-own-fabric-panel" style={{ marginTop: '20px' }}>
                <div className="kids-form-group">
                  <label className="kids-form-label">Details of Personal Fabric</label>
                  <textarea 
                    className="kids-textarea" 
                    rows="2" 
                    value={ownFabricDesc} 
                    onChange={(e) => setOwnFabricDesc(e.target.value)}
                    placeholder="Describe material, approx meters, color and condition"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 6: MEASUREMENTS & SIZING ================= */}
        {currentStep === 6 && (
          <div className="kids-fade-in">
            <div className="kids-grid-2col">
              <div className="kids-form-group">
                <label className="kids-form-label">Child Name</label>
                <input 
                  type="text" 
                  className="kids-text-input" 
                  value={childName} 
                  onChange={(e) => setChildName(e.target.value)}
                />
              </div>

              <div className="kids-form-group">
                <label className="kids-form-label">Fit & Seam Allowance</label>
                <select 
                  className="kids-text-input" 
                  value={fitType} 
                  onChange={(e) => setFitType(e.target.value)}
                >
                  <option value="growth-allowance">Growth Allowance Fit (+1.5" expandable inner seams)</option>
                  <option value="regular">Tailored Couture Fit (True to size)</option>
                  <option value="relaxed">Relaxed Comfort Fit</option>
                </select>
              </div>
            </div>

            <label className="kids-form-label">Couture Sizing Specifications (Inches)</label>
            <div className="kids-measurements-grid">
              <div className="kids-measure-input-box">
                <label>Chest</label>
                <input type="number" step="0.5" value={chest} onChange={(e) => setChest(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Waist</label>
                <input type="number" step="0.5" value={waist} onChange={(e) => setWaist(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Hip</label>
                <input type="number" step="0.5" value={hip} onChange={(e) => setHip(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Shoulder</label>
                <input type="number" step="0.5" value={shoulder} onChange={(e) => setShoulder(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Sleeves</label>
                <input type="number" step="0.5" value={sleeves} onChange={(e) => setSleeves(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
              <div className="kids-measure-input-box">
                <label>Length</label>
                <input type="number" step="0.5" value={length} onChange={(e) => setLength(parseFloat(e.target.value) || 0)} />
                <span>in</span>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                id="designerMeasurementsCheckbox"
                checked={measurementsConfirmed} 
                onChange={(e) => setMeasurementsConfirmed(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--kids-pink)' }}
              />
              <label htmlFor="designerMeasurementsCheckbox" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--kids-navy)', cursor: 'pointer' }}>
                I confirm sizing specifications. A fit specialist will conduct final doorstep fit check.
              </label>
            </div>
          </div>
        )}

        {/* ================= STEP 7: ASSIGN STITCHING SPECIALIST ================= */}
        {currentStep === 7 && (
          <div className="kids-fade-in">
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--kids-navy)', margin: 0 }}>
                Certified Master Atelier for Couture Execution
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--kids-navy-muted)', marginTop: '4px' }}>
                {selectedDesigner.name} has paired your design with an experienced children's production specialist.
              </p>
            </div>

            <div className="kids-tailors-list">
              {VERIFIED_KIDS_TAILORS.slice(0, 3).map((tailor) => {
                const isAssigned = assignedSpecialistId === tailor.id;
                return (
                  <div 
                    key={tailor.id} 
                    className={`kids-tailor-card ${isAssigned ? 'selected' : ''}`}
                    onClick={() => setAssignedSpecialistId(tailor.id)}
                  >
                    <div className="kids-tailor-avatar-box">
                      <img src={tailor.photo} alt={tailor.name} className="kids-tailor-avatar" />
                    </div>

                    <div className="kids-tailor-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 className="kids-tailor-name">{tailor.name}</h4>
                          <div className="kids-tailor-master">Master Craftsman: {tailor.masterTailor} • {tailor.experienceYears} Years Exp.</div>
                          <div className="kids-tailor-location">{tailor.area}</div>
                        </div>
                        <div className="kids-tailor-rating-box">
                          <Star size={14} fill="#F59E0B" color="#F59E0B" /> {tailor.rating}
                        </div>
                      </div>

                      <div className="kids-tailor-footer" style={{ marginTop: '14px' }}>
                        <div>Turnaround: <strong>{tailor.turnAroundDays}</strong></div>
                        <div style={{ color: '#10B981', fontWeight: 700 }}>✓ Designer Blueprint Approved</div>
                        <button type="button" className={`kids-select-btn ${isAssigned ? 'active' : ''}`}>
                          {isAssigned ? '✓ Assigned Specialist' : 'Select Specialist'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 8: PRICING & DELIVERY REVIEW ================= */}
        {currentStep === 8 && (
          <div className="kids-fade-in">
            <div className="kids-grid-2col">
              {/* Summary */}
              <div className="kids-summary-box">
                <h3 className="kids-summary-title">Bespoke Couture Summary</h3>

                <div className="kids-summary-row">
                  <span className="label">Fashion Designer:</span>
                  <span className="value">{selectedDesigner.name} ({selectedDesigner.title})</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Occasion & Theme:</span>
                  <span className="value">{occasion} • {preferredStyle}</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Consultation Slot:</span>
                  <span className="value">{consultationDate} ({consultationSlot})</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Concept Status:</span>
                  <span className="value" style={{ color: '#10B981', fontWeight: 800 }}>Approved ({activeMockupVersion})</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Fabric:</span>
                  <span className="value">{fabricSource === 'own' ? 'Own Material' : `${selectedFabricObj.name} (${fabricColor})`}</span>
                </div>
                <div className="kids-summary-row">
                  <span className="label">Craft Atelier:</span>
                  <span className="value">{selectedSpecialist.name}</span>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--kids-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 700 }}>
                    <Truck size={18} /> Estimated Delivery: Oct 28, 2026
                  </div>
                </div>
              </div>

              {/* Itemized Pricing */}
              <div className="kids-summary-box">
                <h3 className="kids-summary-title">Itemized Investment Breakdown</h3>

                <div className="kids-price-table">
                  <div className="kids-price-row">
                    <span>1-on-1 Designer Consultation Fee</span>
                    <span>₹{estimate.consultationFee}</span>
                  </div>

                  <div className="kids-price-row">
                    <span>Custom Pattern & Couture Design Fee</span>
                    <span>₹{estimate.designFee}</span>
                  </div>

                  <div className="kids-price-row">
                    <span>Master Tailoring & Hand-finishing</span>
                    <span>₹{estimate.stitchingCharge}</span>
                  </div>

                  <div className="kids-price-row">
                    <span>Fabric Cost ({fabricSource === 'own' ? 'Provided by Client' : selectedFabricObj.name})</span>
                    <span>{estimate.fabricCost > 0 ? `₹${estimate.fabricCost}` : '₹0'}</span>
                  </div>

                  <div className="kids-price-row">
                    <span>Doorstep Fitting Visit Service</span>
                    <span>₹{estimate.measurementFee}</span>
                  </div>

                  <div className="kids-price-row">
                    <span>Luxury Keepsake Box Packaging & Shipping</span>
                    <span style={{ color: '#10B981', fontWeight: 800 }}>FREE</span>
                  </div>

                  <div className="kids-price-row">
                    <span>GST (5%)</span>
                    <span>₹{estimate.taxes}</span>
                  </div>

                  <div className="kids-price-row total">
                    <span>Total Amount (All Inclusive)</span>
                    <span className="total-val">₹{estimate.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 9: CONFIRM ORDER ================= */}
        {currentStep === 9 && (
          <div className="kids-fade-in">
            <div className="kids-confirmation-card">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: '50%', 
                  background: 'rgba(138,43,226,0.1)', 
                  color: '#8A2BE2', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Sparkles size={28} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--kids-navy)', margin: 0 }}>
                  Confirm Your Designer Couture Stitching Order
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--kids-navy-muted)', marginTop: '6px' }}>
                  Your personal design journey with <strong>{selectedDesigner.name}</strong> is ready to begin.
                </p>
              </div>

              <div className="kids-grid-3col">
                <div className="kids-review-pill">
                  <div className="pill-title">Design Concept</div>
                  <div className="pill-val">{occasion}</div>
                  <div className="pill-sub">{preferredStyle}</div>
                  <button type="button" className="pill-edit" onClick={() => setCurrentStep(1)}>Edit</button>
                </div>

                <div className="kids-review-pill">
                  <div className="pill-title">Designer & Call</div>
                  <div className="pill-val">{selectedDesigner.name}</div>
                  <div className="pill-sub">{consultationDate} • {consultationSlot}</div>
                  <button type="button" className="pill-edit" onClick={() => setCurrentStep(3)}>Edit</button>
                </div>

                <div className="kids-review-pill">
                  <div className="pill-title">Child Sizing</div>
                  <div className="pill-val">{childName} ({selectedAgeObj.label})</div>
                  <div className="pill-sub">Growth Allowance Fit</div>
                  <button type="button" className="pill-edit" onClick={() => setCurrentStep(6)}>Edit</button>
                </div>
              </div>

              <div style={{ 
                marginTop: '30px', 
                padding: '20px', 
                background: 'var(--kids-border-light)', 
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--kids-navy-muted)', fontWeight: 700 }}>Total Payable:</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--kids-pink)' }}>
                    ₹{estimate.totalAmount}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--kids-navy-muted)' }}>Includes Consultation, Design & Tailoring</span>
                </div>

                <button 
                  type="button" 
                  className="kids-primary-btn" 
                  style={{ padding: '14px 32px', fontSize: '1.05rem', background: 'linear-gradient(135deg, #FF087A, #8A2BE2)' }}
                  onClick={handleConfirmOrder}
                >
                  Confirm & Start Designing →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 10: TRACK DESIGN & STITCHING ================= */}
        {currentStep === 10 && (
          <div className="kids-fade-in">
            <div className="kids-tracking-container">
              <div className="kids-tracking-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    background: '#8A2BE2', 
                    color: '#FFFFFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Sparkles size={26} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--kids-navy)', margin: 0 }}>
                      Custom Design Order #{confirmedOrder?.id || 'KIDS-DES-9281'}
                    </h2>
                    <div style={{ fontSize: '0.85rem', color: 'var(--kids-navy-muted)', marginTop: '4px' }}>
                      Collaborating with <strong>{selectedDesigner.name}</strong> • Placed on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="kids-tracking-badge" style={{ background: 'rgba(138,43,226,0.1)', color: '#8A2BE2', borderColor: '#8A2BE2' }}>
                  ● Consultation Scheduled
                </div>
              </div>

              {/* Consultation card banner */}
              <div style={{ 
                margin: '24px 0', 
                padding: '18px 24px', 
                background: 'linear-gradient(135deg, rgba(255,8,122,0.06), rgba(138,43,226,0.08))', 
                borderRadius: '12px',
                border: '1px solid rgba(138,43,226,0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#8A2BE2', textTransform: 'uppercase' }}>
                    Upcoming Video Consultation
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--kids-navy)', marginTop: '4px' }}>
                    {consultationDate} at {consultationSlot}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--kids-navy-muted)', marginTop: '2px' }}>
                    Video room link will activate 10 minutes prior to slot.
                  </div>
                </div>

                <button 
                  type="button" 
                  className="kids-primary-btn" 
                  style={{ background: 'linear-gradient(135deg, #FF087A, #8A2BE2)' }}
                  onClick={() => showToast('Virtual room will be ready on ' + consultationDate)}
                >
                  <Video size={16} /> Join Design Room
                </button>
              </div>

              {/* 10-Stage Visual Tracker */}
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--kids-navy)', marginBottom: '16px' }}>
                Bespoke Design & Tailoring Timeline
              </h3>
              <div className="kids-live-pipeline">
                {[
                  { title: "Design Request Submitted", desc: "Design brief logged and accepted by designer", done: true, current: false },
                  { title: "Consultation Scheduled", desc: `${consultationDate} (${consultationSlot})`, done: true, current: true },
                  { title: "Designing in Progress", desc: "Digital sketch, material palette & silhouette drafting", done: false, current: false },
                  { title: "Design Approval Pending", desc: "Digital mockup sent to parent for review", done: false, current: false },
                  { title: "Design Approved", desc: "Parent gave sign-off on pattern & embellishments", done: false, current: false },
                  { title: "Measurements Confirmed", desc: "Final sizing check with comfort allowances", done: false, current: false },
                  { title: "Stitching in Progress", desc: `Handcrafted at ${selectedSpecialist.name}`, done: false, current: false },
                  { title: "Quality Check", desc: "Seam softness, snap tests & finish inspection", done: false, current: false },
                  { title: "Dispatched", desc: "Packaged in luxury keepsake gift box", done: false, current: false },
                  { title: "Delivered", desc: "Doorstep delivery with 7-day fit adjustment guarantee", done: false, current: false }
                ].map((st, i) => (
                  <div key={st.title} className={`pipeline-step ${st.done ? 'done' : ''} ${st.current ? 'current' : ''}`}>
                    <div className="pipeline-bullet">
                      {st.done ? <Check size={14} /> : i + 1}
                    </div>
                    <div className="pipeline-details">
                      <div className="pipeline-step-title">{st.title}</div>
                      <div className="pipeline-step-desc">{st.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Back */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '30px', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  className="kids-primary-btn"
                  onClick={() => {
                    setCurrentStep(1);
                    setConfirmedOrder(null);
                  }}
                >
                  Create Another Custom Outfit
                </button>
                <button 
                  type="button" 
                  className="kids-secondary-btn"
                  onClick={onBackToLanding}
                >
                  Return to Kids Stitching Hub
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Stepper Footer Navigation (Steps 1 to 9) */}
      {currentStep < 10 && (
        <div className="kids-workflow-footer-nav">
          <button 
            type="button" 
            className="kids-workflow-nav-back"
            onClick={currentStep === 1 ? onBackToLanding : handlePrevStep}
          >
            <ArrowLeft size={16} /> {currentStep === 1 ? 'Cancel & Return' : 'Back'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--kids-navy-muted)', fontWeight: 700 }}>Estimated Total:</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--kids-pink)' }}>
                ₹{estimate.totalAmount}
              </div>
            </div>

            {currentStep < 9 ? (
              <button 
                type="button" 
                className="kids-workflow-nav-next"
                onClick={handleNextStep}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                type="button" 
                className="kids-workflow-nav-next confirm"
                style={{ background: 'linear-gradient(135deg, #FF087A, #8A2BE2)' }}
                onClick={handleConfirmOrder}
              >
                Start Designing <Sparkles size={16} />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
