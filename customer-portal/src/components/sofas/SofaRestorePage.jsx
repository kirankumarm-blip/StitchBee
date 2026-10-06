import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Check, X, ChevronRight, ChevronLeft, Star, MapPin, Phone, 
  ShieldCheck, Clock, Sparkles, Upload, Calendar, ArrowRight, 
  Eye, Info, Scissors, Wrench, Truck, Award, ExternalLink,
  RotateCcw, SlidersHorizontal, CheckCircle2, ArrowLeft,
  Camera, MessageCircle, HelpCircle
} from 'lucide-react';

import {
  RESTORE_SOFA_ASSETS,
  SOFA_REPAIR_SERVICES,
  ADDITIONAL_ESTIMATE_SERVICES,
  ALL_ESTIMATE_SERVICES,
  SOFA_TYPES,
  UPHOLSTERY_PREFERENCES,
  calculateSofaRepairEstimate,
  SOFA_REPAIR_FABRICS,
  RESTORE_PROCESS_STEPS,
  SOFA_REPAIR_REVIEWS,
  NEARBY_SOFA_SPECIALISTS,
  ASSESSMENT_TIME_SLOTS
} from '../../utils/sofaRestoreStore';

import './SofaRestorePage.css';

const COMMON_SOFA_ISSUES = [
  "Sagging Cushion Foam",
  "Broken / Loose Springs",
  "Wooden Frame Wobble",
  "Pet Scratch Marks",
  "Torn Seams & Zippers",
  "Liquid / Food Stains",
  "Faded / Discolored Fabric",
  "Armrest Sinking",
  "Squeaking Sound on Sitting"
];

const FIRMNESS_PREFERENCES = [
  { id: 'medium-firm', name: 'Medium Firm (Standard)', desc: 'Balanced bounce & lumbar support' },
  { id: 'plush-soft', name: 'Plush Cloud Soft', desc: 'Deep sinking luxurious comfort' },
  { id: 'extra-firm', name: 'Orthopedic Extra Firm', desc: 'High-density 45D ergonomic support' }
];

export default function SofaRestorePage({
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout,
  theme = 'light',
  showToast,
  onNavigateShop
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // View Mode: 'landing' (8 showcase sections) OR 'assessment' (page-level multi-step workflow)
  const isAssessmentRoute = pathname.includes('/assessment');
  const [viewMode, setViewMode] = useState(isAssessmentRoute ? 'assessment' : 'landing');

  // Sync route if URL changes
  useEffect(() => {
    if (pathname.includes('/assessment')) {
      setViewMode('assessment');
    } else if (pathname === '/sofas/repair' || pathname === '/sofas/restore') {
      setViewMode('landing');
    }
  }, [pathname]);

  // --------------------------------------------------------------------------
  // STATE: INSTANT ESTIMATE & SERVICE SYNCHRONIZATION
  // --------------------------------------------------------------------------
  const [selectedServices, setSelectedServices] = useState(['tear-damage', 'cushion-foam']);
  const [selectedSofaType, setSelectedSofaType] = useState('3-seater');
  const [selectedUpholstery, setSelectedUpholstery] = useState('new-fabric');

  // Hero Before/After interactive slider (0 to 100 percentage)
  const [heroSliderPos, setHeroSliderPos] = useState(50);
  const heroSliderRef = useRef(null);
  const isDraggingHeroRef = useRef(false);

  // Modals for landing previews
  const [activeFabricModal, setActiveFabricModal] = useState(null);
  const [activeTransModal, setActiveTransModal] = useState(null);
  const [transModalSliderPos, setTransModalSliderPos] = useState(50);
  const transSliderRef = useRef(null);
  const isDraggingTransRef = useRef(false);

  // --------------------------------------------------------------------------
  // PAGE-LEVEL ASSESSMENT WORKFLOW STATE
  // --------------------------------------------------------------------------
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    services: ['tear-damage', 'cushion-foam'],
    sofaType: '3-seater',
    sofaAge: '3-5 years',
    firmness: 'medium-firm',
    selectedIssues: ['Sagging Cushion Foam', 'Torn Seams & Zippers'],
    conditionNotes: 'Cushion foam has lost firmness and there is light tearing along seam.',
    photos: [
      RESTORE_SOFA_ASSETS.hero.before
    ],
    upholstery: 'new-fabric',
    specialistId: NEARBY_SOFA_SPECIALISTS[0].id,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: ASSESSMENT_TIME_SLOTS[0],
    customerName: currentUser?.name || 'Kiran Kumar',
    customerPhone: currentUser?.phone || '+91 98765 43210',
    customerAddress: '42, 14th Main, Indiranagar, Bengaluru - 560038',
    specialNotes: 'Please bring velvet and textured linen fabric swatches.'
  });
  const [bookingResult, setBookingResult] = useState(null);

  // Leaflet Map Ref for Specialist selection
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  // Compute reactive estimate
  const currentEstimate = calculateSofaRepairEstimate({
    selectedServiceIds: selectedServices,
    sofaTypeId: selectedSofaType,
    upholsteryId: selectedUpholstery
  });

  // Toggle service selection in both services grid and estimate checklist
  const toggleService = (srvId) => {
    setSelectedServices(prev => {
      const updated = prev.includes(srvId)
        ? prev.filter(id => id !== srvId)
        : [...prev, srvId];
      // Keep assessment state in sync
      setAssessmentData(ad => ({ ...ad, services: updated }));
      return updated;
    });
  };

  // Toggle common issue tag in step 3
  const toggleIssueTag = (tag) => {
    setAssessmentData(prev => {
      const currentList = prev.selectedIssues || [];
      const updated = currentList.includes(tag)
        ? currentList.filter(t => t !== tag)
        : [...currentList, tag];
      return {
        ...prev,
        selectedIssues: updated
      };
    });
  };

  // --------------------------------------------------------------------------
  // HERO SLIDER MOUSE / TOUCH DRAGGING
  // --------------------------------------------------------------------------
  const handleHeroDragStart = (e) => {
    isDraggingHeroRef.current = true;
    updateHeroSlider(e);
  };

  const updateHeroSlider = useCallback((e) => {
    if (!heroSliderRef.current) return;
    const rect = heroSliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setHeroSliderPos(percentage);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (isDraggingHeroRef.current) {
        updateHeroSlider(e);
      }
      if (isDraggingTransRef.current && transSliderRef.current) {
        const rect = transSliderRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setTransModalSliderPos(percentage);
      }
    };
    const handleEnd = () => {
      isDraggingHeroRef.current = false;
      isDraggingTransRef.current = false;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [updateHeroSlider]);

  // Smooth scroll helper
  const scrollToEstimate = () => {
    const el = document.getElementById('instant-estimate-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --------------------------------------------------------------------------
  // TRANSITION TO PAGE-LEVEL RESTORATION ASSESSMENT STUDIO
  // --------------------------------------------------------------------------
  const goToPageAssessment = (targetStep = 1) => {
    setAssessmentData(prev => ({
      ...prev,
      services: selectedServices.length > 0 ? selectedServices : ['tear-damage'],
      sofaType: selectedSofaType,
      upholstery: selectedUpholstery
    }));
    setAssessmentStep(targetStep);
    setBookingResult(null);
    setViewMode('assessment');
    navigate('/sofas/repair/assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToLanding = () => {
    setViewMode('landing');
    navigate('/sofas/repair');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --------------------------------------------------------------------------
  // LEAFLET GOOGLE MAPS SETUP (STEP 6 IN PAGE-LEVEL ASSESSMENT)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (viewMode !== 'assessment' || assessmentStep !== 6) {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.error("Map cleanup error:", e);
        }
        mapInstanceRef.current = null;
      }
      return;
    }

    const timer = setTimeout(() => {
      if (!window.L || !mapContainerRef.current) return;
      const container = mapContainerRef.current;
      if (container._leaflet_id) {
        delete container._leaflet_id;
      }

      const activeSpecialist = NEARBY_SOFA_SPECIALISTS.find(
        s => s.id === assessmentData.specialistId
      ) || NEARBY_SOFA_SPECIALISTS[0];

      const centerLat = activeSpecialist.coordinates.lat;
      const centerLng = activeSpecialist.coordinates.lng;

      const map = window.L.map(container, {
        zoomControl: true,
        scrollWheelZoom: false
      }).setView([centerLat, centerLng], 13);

      // Authentic Google Maps tile layer
      window.L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      }).addTo(map);

      const markersGroup = window.L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;

      NEARBY_SOFA_SPECIALISTS.forEach(spec => {
        const isSelected = spec.id === assessmentData.specialistId;
        const iconHtml = `
          <div style="
            background: ${isSelected ? '#E11D74' : '#14213D'};
            color: #FFFFFF;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 800;
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            gap: 6px;
            border: 2px solid #FFFFFF;
            cursor: pointer;
            white-space: nowrap;
          ">
            <span>🛋️</span>
            <span>${spec.name.split(' ')[0]}</span>
            <span style="color: #FCD34D;">★ ${spec.rating}</span>
          </div>
        `;

        const customIcon = window.L.divIcon({
          html: iconHtml,
          className: 'custom-map-pill',
          iconSize: [130, 34],
          iconAnchor: [65, 17]
        });

        const marker = window.L.marker([spec.coordinates.lat, spec.coordinates.lng], { icon: customIcon })
          .addTo(markersGroup);

        marker.on('click', () => {
          setAssessmentData(prev => ({ ...prev, specialistId: spec.id }));
          map.panTo([spec.coordinates.lat, spec.coordinates.lng]);
        });
      });

      mapInstanceRef.current = map;
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 300);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [viewMode, assessmentStep, assessmentData.specialistId]);

  // Photo upload handling
  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAssessmentData(prev => ({
          ...prev,
          photos: [...prev.photos, event.target.result]
        }));
        if (showToast) showToast("Photo added to restoration assessment");
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const removePhoto = (index) => {
    setAssessmentData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== index)
    }));
  };

  // Add sample demonstration photo
  const addSamplePhoto = (sampleUrl) => {
    setAssessmentData(prev => ({
      ...prev,
      photos: [...prev.photos, sampleUrl]
    }));
    if (showToast) showToast("Sample sofa photo attached");
  };

  // Confirm Assessment Booking
  const handleConfirmAssessment = () => {
    const bookingId = `RESTORE-${Math.floor(100000 + Math.random() * 900000)}`;
    const spec = NEARBY_SOFA_SPECIALISTS.find(s => s.id === assessmentData.specialistId) || NEARBY_SOFA_SPECIALISTS[0];

    const confirmedOrder = {
      bookingId,
      services: assessmentData.services,
      sofaType: assessmentData.sofaType,
      upholstery: assessmentData.upholstery,
      specialist: spec.name,
      specialistPhone: spec.phone,
      specialistAddress: spec.address,
      date: assessmentData.date,
      timeSlot: assessmentData.timeSlot,
      address: assessmentData.customerAddress,
      customerName: assessmentData.customerName,
      customerPhone: assessmentData.customerPhone,
      estimatedPriceRange: currentEstimate.formattedRange,
      status: "Confirmed",
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setBookingResult(confirmedOrder);
    setAssessmentStep(8);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (onAddToCart) {
      onAddToCart({
        id: bookingId,
        name: `Doorstep Sofa Assessment (${spec.name})`,
        price: 0,
        originalPrice: 299,
        image: RESTORE_SOFA_ASSETS.hero.after,
        itemType: 'alteration',
        notes: `${assessmentData.sofaType} • ${assessmentData.services.length} services • Inspection: ${assessmentData.date}`
      });
    }

    if (showToast) {
      showToast(`Assessment booked with ${spec.name}! Free Doorstep Inspection.`);
    }
  };

  // Active specialist helper
  const selectedSpecialistObj = NEARBY_SOFA_SPECIALISTS.find(
    s => s.id === assessmentData.specialistId
  ) || NEARBY_SOFA_SPECIALISTS[0];

  const selectedUpholsteryObj = UPHOLSTERY_PREFERENCES.find(
    u => u.id === assessmentData.upholstery
  ) || UPHOLSTERY_PREFERENCES[1];

  const selectedSofaTypeObj = SOFA_TYPES.find(
    t => t.id === assessmentData.sofaType
  ) || SOFA_TYPES[2];


  // ==========================================================================
  // VIEW MODE: PAGE-LEVEL RESTORATION ASSESSMENT STUDIO
  // ==========================================================================
  if (viewMode === 'assessment') {
    return (
      <div className={`assessment-page-layout ${theme === 'dark' ? 'dark' : ''}`}>
        
        {/* Top Navigation Bar */}
        <div className="assessment-page-nav-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              className="assessment-back-link"
              onClick={backToLanding}
            >
              <ArrowLeft size={18} />
              <span>Back to Sofa Restoration</span>
            </button>

            <div className="assessment-header-title-block">
              <h2 className="assessment-header-title">
                Sofa Restoration Assessment
              </h2>
              <span className="assessment-header-badge">
                {assessmentStep <= 7 ? `Step ${assessmentStep} of 7` : 'Confirmed'}
              </span>
            </div>
          </div>

          <div className="assessment-support-tag">
            <Phone size={15} color="var(--restore-pink)" />
            <span>Artisan Helpdesk: <strong>+91 98452 31204</strong></span>
          </div>
        </div>

        {/* Full Page Stepper Bar */}
        <div className="assessment-page-stepper-wrap">
          <div className="assessment-stepper-track">
            {[
              { num: 1, label: 'Services' },
              { num: 2, label: 'Sofa Type' },
              { num: 3, label: 'Condition' },
              { num: 4, label: 'Photos' },
              { num: 5, label: 'Fabrics' },
              { num: 6, label: 'Specialist' },
              { num: 7, label: 'Schedule' }
            ].map(s => {
              const isActive = assessmentStep === s.num;
              const isCompleted = assessmentStep > s.num;
              return (
                <div 
                  key={s.num}
                  className={`assessment-step-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => {
                    if (s.num < assessmentStep || bookingResult) {
                      setAssessmentStep(s.num);
                    }
                  }}
                >
                  <div className="assessment-step-circle">
                    {isCompleted ? <Check size={16} strokeWidth={3} /> : s.num}
                  </div>
                  <span className="assessment-step-name">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Page Grid: Left Step Form + Right Sticky Live Summary */}
        <div className="assessment-page-grid">
          
          {/* LEFT: STEP CONTENT PANEL */}
          <div className="assessment-main-panel-card">
            
            {/* STEP 1: SELECT SERVICES */}
            {assessmentStep === 1 && (
              <div>
                <div className="assessment-panel-header">
                  <span className="assessment-panel-eyebrow">STEP 1 • RESTORATION SCOPE</span>
                  <h3 className="assessment-panel-title">Which services does your sofa need?</h3>
                  <p className="assessment-panel-desc">
                    Select all that apply. Our artisan will bring tools and physical fabric samples to assess the sofa frame.
                  </p>
                </div>

                <div className="assessment-page-services-grid">
                  {ALL_ESTIMATE_SERVICES.map(srv => {
                    const isChecked = assessmentData.services.includes(srv.id);
                    return (
                      <div 
                        key={srv.id}
                        className={`assessment-page-service-card ${isChecked ? 'selected' : ''}`}
                        onClick={() => {
                          const updated = isChecked 
                            ? assessmentData.services.filter(id => id !== srv.id)
                            : [...assessmentData.services, srv.id];
                          setAssessmentData(prev => ({ ...prev, services: updated }));
                          setSelectedServices(updated);
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="estimate-custom-checkbox">
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--restore-text-primary)' }}>
                              {srv.name}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--restore-text-secondary)', marginTop: '2px' }}>
                              {srv.desc}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--restore-pink)', marginLeft: '12px' }}>
                          {srv.formattedPrice}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="assessment-page-actions-row">
                  <button 
                    type="button" 
                    className="restore-btn-secondary"
                    onClick={backToLanding}
                  >
                    <span>← Cancel & Return</span>
                  </button>
                  <button 
                    type="button" 
                    className="restore-btn-primary"
                    onClick={() => {
                      setAssessmentStep(2);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                  >
                    <span>Continue to Sofa Type</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SOFA TYPE, AGE & FIRMNESS */}
            {assessmentStep === 2 && (
              <div>
                <div className="assessment-panel-header">
                  <span className="assessment-panel-eyebrow">STEP 2 • FRAME SPECIFICATIONS</span>
                  <h3 className="assessment-panel-title">What type of sofa is it?</h3>
                  <p className="assessment-panel-desc">
                    Helps our master craftsman determine the foam sheet dimensions, webbing yardage, and spring resistance required.
                  </p>
                </div>

                {/* 6 Sofa Types */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
                  {SOFA_TYPES.map(type => {
                    const isSelected = assessmentData.sofaType === type.id;
                    return (
                      <div 
                        key={type.id}
                        className={`estimate-sofa-type-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setAssessmentData(prev => ({ ...prev, sofaType: type.id }));
                          setSelectedSofaType(type.id);
                        }}
                        style={{ padding: '20px 12px' }}
                      >
                        <span style={{ fontSize: '2rem' }}>
                          {type.id === '1-seater' ? '🪑' : type.id === '2-seater' ? '🛋️' : type.id === '3-seater' ? '🛋️' : type.id === 'l-shape' ? '📐' : '🛋️'}
                        </span>
                        <span className="estimate-sofa-type-label" style={{ fontSize: '0.88rem' }}>{type.name}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--restore-text-muted)' }}>
                          {type.id === '3-seater' ? 'Standard 3-seater couch' : type.id === 'l-shape' ? 'Corner chaise sectional' : 'Armchair / Loveseat'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Sofa Age Pills */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                    Approximate Sofa Age
                  </label>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['Under 2 years', '3-5 years', '6-10 years', '10+ years / Heirloom'].map(age => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setAssessmentData(prev => ({ ...prev, sofaAge: age }))}
                        style={{
                          padding: '9px 18px',
                          borderRadius: '24px',
                          border: assessmentData.sofaAge === age ? '2px solid var(--restore-pink)' : '1.5px solid var(--restore-border)',
                          background: assessmentData.sofaAge === age ? 'var(--restore-pink-light)' : 'transparent',
                          color: assessmentData.sofaAge === age ? 'var(--restore-pink)' : 'inherit',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer'
                        }}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seating Firmness Preference */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                    Desired Cushion Firmness
                  </label>
                  <div className="assessment-firmness-grid">
                    {FIRMNESS_PREFERENCES.map(firm => {
                      const isSelected = assessmentData.firmness === firm.id;
                      return (
                        <div 
                          key={firm.id}
                          className={`assessment-firmness-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => setAssessmentData(prev => ({ ...prev, firmness: firm.id }))}
                        >
                          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--restore-text-primary)' }}>
                            {firm.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--restore-text-muted)', marginTop: '4px' }}>
                            {firm.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="assessment-page-actions-row">
                  <button 
                    type="button" 
                    className="restore-btn-secondary"
                    onClick={() => setAssessmentStep(1)}
                  >
                    <span>← Previous</span>
                  </button>
                  <button 
                    type="button" 
                    className="restore-btn-primary"
                    onClick={() => {
                      setAssessmentStep(3);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                  >
                    <span>Continue to Condition Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CURRENT CONDITION & ISSUES */}
            {assessmentStep === 3 && (
              <div>
                <div className="assessment-panel-header">
                  <span className="assessment-panel-eyebrow">STEP 3 • DAMAGE ASSESSMENT</span>
                  <h3 className="assessment-panel-title">What issues does your sofa currently have?</h3>
                  <p className="assessment-panel-desc">
                    Tap the common symptoms below and add any specific notes for our restoration team.
                  </p>
                </div>

                {/* Multi-select Common Issue Tags */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                    Select Observed Issues
                  </label>
                  <div className="assessment-issues-pills-wrap">
                    {COMMON_SOFA_ISSUES.map(issue => {
                      const isSelected = (assessmentData.selectedIssues || []).includes(issue);
                      return (
                        <button
                          key={issue}
                          type="button"
                          className={`assessment-issue-pill ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleIssueTag(issue)}
                        >
                          {isSelected ? '✓ ' : '+ '} {issue}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed Notes */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                    Additional Condition Notes
                  </label>
                  <textarea
                    rows={4}
                    value={assessmentData.conditionNotes}
                    onChange={e => setAssessmentData(prev => ({ ...prev, conditionNotes: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '12px',
                      border: '1.5px solid var(--restore-border)',
                      background: 'var(--restore-card)',
                      color: 'var(--restore-text-primary)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                      lineHeight: '1.5'
                    }}
                    placeholder="e.g. Center seat cushion sags 2 inches when sitting down; left armrest piping has peeled off..."
                  />
                </div>

                <div className="assessment-page-actions-row">
                  <button 
                    type="button" 
                    className="restore-btn-secondary"
                    onClick={() => setAssessmentStep(2)}
                  >
                    <span>← Previous</span>
                  </button>
                  <button 
                    type="button" 
                    className="restore-btn-primary"
                    onClick={() => {
                      setAssessmentStep(4);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                  >
                    <span>Continue to Photo Upload</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PHOTO UPLOAD */}
            {assessmentStep === 4 && (
              <div>
                <div className="assessment-panel-header">
                  <span className="assessment-panel-eyebrow">STEP 4 • VISUAL INSPECTION</span>
                  <h3 className="assessment-panel-title">Upload photos of your sofa</h3>
                  <p className="assessment-panel-desc">
                    Clear photos allow our master upholsterers to prepare exact replacement foam contours and examine stitching lines.
                  </p>
                </div>

                {/* Dropzone */}
                <label className="assessment-dropzone" style={{ display: 'block', padding: '36px 20px', marginBottom: '24px' }}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                    style={{ display: 'none' }} 
                  />
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--restore-pink-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    <Upload size={28} color="var(--restore-pink)" />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--restore-text-primary)' }}>
                    Click to browse or drop sofa photos here
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--restore-text-muted)', marginTop: '6px' }}>
                    Supports PNG, JPG, WEBP (Up to 10MB each)
                  </div>
                </label>

                {/* Photo Previews */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                    Attached Photos ({assessmentData.photos.length})
                  </label>
                  
                  <div className="photo-preview-grid">
                    {assessmentData.photos.map((img, i) => (
                      <div key={i} className="photo-preview-card">
                        <img src={img} alt={`Sofa Photo ${i + 1}`} />
                        <button 
                          type="button" 
                          className="photo-remove-btn"
                          onClick={() => removePhoto(i)}
                          title="Remove photo"
                        >
                          <X size={12} />
                        </button>
                        <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '9px', padding: '1px 5px', borderRadius: '3px' }}>
                          {i === 0 ? 'Primary' : `Photo ${i + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Attach Sample Presets */}
                <div style={{ background: 'var(--restore-surface-soft)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--restore-border)', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--restore-text-secondary)', display: 'block', marginBottom: '8px' }}>
                    Quick attach reference photos:
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="restore-link-btn"
                      style={{ fontSize: '0.74rem', padding: '4px 12px' }}
                      onClick={() => addSamplePhoto(RESTORE_SOFA_ASSETS.hero.before)}
                    >
                      + Front Cushion Angle
                    </button>
                    <button
                      type="button"
                      className="restore-link-btn"
                      style={{ fontSize: '0.74rem', padding: '4px 12px' }}
                      onClick={() => addSamplePhoto(RESTORE_SOFA_ASSETS.transformations[0].before)}
                    >
                      + Armrest Close-up
                    </button>
                    <button
                      type="button"
                      className="restore-link-btn"
                      style={{ fontSize: '0.74rem', padding: '4px 12px' }}
                      onClick={() => addSamplePhoto(RESTORE_SOFA_ASSETS.transformations[1].before)}
                    >
                      + Underframe Seam
                    </button>
                  </div>
                </div>

                <div className="assessment-page-actions-row">
                  <button 
                    type="button" 
                    className="restore-btn-secondary"
                    onClick={() => setAssessmentStep(3)}
                  >
                    <span>← Previous</span>
                  </button>
                  <button 
                    type="button" 
                    className="restore-btn-primary"
                    onClick={() => {
                      setAssessmentStep(5);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                  >
                    <span>Continue to Fabrics</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: FABRIC & UPHOLSTERY PREFERENCE */}
            {assessmentStep === 5 && (
              <div>
                <div className="assessment-panel-header">
                  <span className="assessment-panel-eyebrow">STEP 5 • FABRIC & TEXTURE</span>
                  <h3 className="assessment-panel-title">Choose your upholstery preference</h3>
                  <p className="assessment-panel-desc">
                    Pick a material category or specific weave. Our specialist will carry physical tactile swatch books to your doorstep.
                  </p>
                </div>

                {/* 4 General Preference Options */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '28px' }}>
                  {UPHOLSTERY_PREFERENCES.map(uph => {
                    const isSelected = assessmentData.upholstery === uph.id;
                    return (
                      <div 
                        key={uph.id}
                        className={`estimate-upholstery-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setAssessmentData(prev => ({ ...prev, upholstery: uph.id }));
                          setSelectedUpholstery(uph.id);
                        }}
                        style={{ padding: '12px 8px' }}
                      >
                        <img src={uph.thumb} alt={uph.name} className="estimate-upholstery-thumb" style={{ height: '64px' }} />
                        <span className="estimate-upholstery-name" style={{ fontSize: '0.78rem', marginTop: '4px' }}>{uph.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* All 10 Swatch Options for Deep Browsing */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                    Explore StitchBee Atelier Fabrics (10 Available Materials)
                  </label>
                  
                  <div className="assessment-page-fabrics-grid">
                    {SOFA_REPAIR_FABRICS.map(fabric => {
                      const isChosen = assessmentData.upholstery === 'new-fabric' || assessmentData.upholstery === fabric.id;
                      return (
                        <div 
                          key={fabric.id}
                          className="assessment-page-fabric-card"
                          onClick={() => {
                            setAssessmentData(prev => ({ ...prev, upholstery: 'new-fabric', fabricName: fabric.name }));
                            setSelectedUpholstery('new-fabric');
                            if (showToast) showToast(`${fabric.name} selected!`);
                          }}
                        >
                          <img src={fabric.img} alt={fabric.name} className="assessment-page-fabric-thumb" />
                          <div className="assessment-page-fabric-info">
                            <h5 className="assessment-page-fabric-name">{fabric.name}</h5>
                            <p className="assessment-page-fabric-price">{fabric.priceRange}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="assessment-page-actions-row">
                  <button 
                    type="button" 
                    className="restore-btn-secondary"
                    onClick={() => setAssessmentStep(4)}
                  >
                    <span>← Previous</span>
                  </button>
                  <button 
                    type="button" 
                    className="restore-btn-primary"
                    onClick={() => {
                      setAssessmentStep(6);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                  >
                    <span>Continue to Select Specialist</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: NEARBY SPECIALIST (REAL GOOGLE MAPS) */}
            {assessmentStep === 6 && (
              <div>
                <div className="assessment-panel-header">
                  <span className="assessment-panel-eyebrow">STEP 6 • LOCAL ARTISAN DISCOVERY</span>
                  <h3 className="assessment-panel-title">Select Nearby Sofa Specialist</h3>
                  <p className="assessment-panel-desc">
                    Choose from verified master craftsmen in Bengaluru with dedicated restoration workshops and doorstep assessment.
                  </p>
                </div>

                {/* Authentic Google Maps Live Container */}
                <div style={{ width: '100%', height: '320px', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid var(--restore-border)', marginBottom: '20px', position: 'relative' }}>
                  <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 999, background: 'rgba(255,255,255,0.95)', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, color: '#10213F', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} color="#E11D74" />
                    <span>Google Maps Live Bengaluru</span>
                  </div>
                </div>

                {/* Specialist Cards Selector */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px' }}>
                  {NEARBY_SOFA_SPECIALISTS.map(spec => {
                    const isSelected = assessmentData.specialistId === spec.id;
                    return (
                      <div 
                        key={spec.id}
                        onClick={() => setAssessmentData(prev => ({ ...prev, specialistId: spec.id }))}
                        className={`assessment-specialist-card ${isSelected ? 'selected' : ''}`}
                        style={{ margin: 0, padding: '16px' }}
                      >
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <div style={{ width: '54px', height: '54px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--restore-border)' }}>
                            <img src={spec.avatar} alt={spec.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--restore-text-primary)' }}>
                              {spec.name}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--restore-text-muted)', marginTop: '2px' }}>
                              ★ {spec.rating} ({spec.reviews} reviews) • {spec.distance}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--restore-text-secondary)', marginTop: '2px' }}>
                              {spec.address}
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#059669', background: '#DCFCE7', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                            {spec.doorstepVisit ? 'Doorstep Visit' : 'Workshop'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="assessment-page-actions-row">
                  <button 
                    type="button" 
                    className="restore-btn-secondary"
                    onClick={() => setAssessmentStep(5)}
                  >
                    <span>← Previous</span>
                  </button>
                  <button 
                    type="button" 
                    className="restore-btn-primary"
                    onClick={() => {
                      setAssessmentStep(7);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                  >
                    <span>Continue to Schedule</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: SCHEDULE DOORSTEP INSPECTION */}
            {assessmentStep === 7 && (
              <div>
                <div className="assessment-panel-header">
                  <span className="assessment-panel-eyebrow">STEP 7 • DOORSTEP APPOINTMENT</span>
                  <h3 className="assessment-panel-title">Schedule Your Free Doorstep Inspection</h3>
                  <p className="assessment-panel-desc">
                    Our master artisan will visit your address with fabric swatches, frame calipers, and high-density foam samples.
                  </p>
                </div>

                {/* Date & Time Window */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                      Preferred Inspection Date
                    </label>
                    <input 
                      type="date"
                      value={assessmentData.date}
                      onChange={e => setAssessmentData(prev => ({ ...prev, date: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--restore-border)',
                        background: 'var(--restore-card)',
                        color: 'var(--restore-text-primary)',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                      Arrival Time Window
                    </label>
                    <select
                      value={assessmentData.timeSlot}
                      onChange={e => setAssessmentData(prev => ({ ...prev, timeSlot: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--restore-border)',
                        background: 'var(--restore-card)',
                        color: 'var(--restore-text-primary)',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box'
                      }}
                    >
                      {ASSESSMENT_TIME_SLOTS.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address & Contact Information */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Contact Name</label>
                    <input 
                      type="text" 
                      value={assessmentData.customerName}
                      onChange={e => setAssessmentData(prev => ({ ...prev, customerName: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--restore-border)', background: 'var(--restore-card)', color: 'var(--restore-text-primary)', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Phone Number</label>
                    <input 
                      type="text" 
                      value={assessmentData.customerPhone}
                      onChange={e => setAssessmentData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--restore-border)', background: 'var(--restore-card)', color: 'var(--restore-text-primary)', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Doorstep Inspection Address (Bengaluru)</label>
                    <input 
                      type="text" 
                      value={assessmentData.customerAddress}
                      onChange={e => setAssessmentData(prev => ({ ...prev, customerAddress: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--restore-border)', background: 'var(--restore-card)', color: 'var(--restore-text-primary)', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Special Instructions / Apartment Gate Code</label>
                    <input 
                      type="text" 
                      value={assessmentData.specialNotes}
                      onChange={e => setAssessmentData(prev => ({ ...prev, specialNotes: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--restore-border)', background: 'var(--restore-card)', color: 'var(--restore-text-primary)', boxSizing: 'border-box' }}
                      placeholder="e.g. Service elevator available, call before arriving..."
                    />
                  </div>
                </div>

                <div className="assessment-page-actions-row">
                  <button 
                    type="button" 
                    className="restore-btn-secondary"
                    onClick={() => setAssessmentStep(6)}
                  >
                    <span>← Previous</span>
                  </button>
                  <button 
                    type="button" 
                    className="restore-btn-primary"
                    onClick={handleConfirmAssessment}
                    style={{ padding: '14px 32px', fontSize: '1rem' }}
                  >
                    <span>Confirm Free Assessment Booking</span>
                    <Check size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 8: CONFIRMATION SUCCESS */}
            {assessmentStep === 8 && bookingResult && (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <CheckCircle2 size={42} />
                </div>

                <h3 className="assessment-panel-title" style={{ color: '#16A34A', fontSize: '2.2rem', marginBottom: '6px' }}>
                  Doorstep Assessment Booked!
                </h3>
                <p className="assessment-panel-desc" style={{ marginBottom: '28px' }}>
                  Your free doorstep sofa inspection has been confirmed. Reference: <strong>#{bookingResult.bookingId}</strong>
                </p>

                <div style={{ background: 'var(--restore-surface-soft)', padding: '28px', borderRadius: '16px', border: '1.5px solid var(--restore-border)', textAlign: 'left', maxWidth: '580px', margin: '0 auto 32px auto', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--restore-text-muted)' }}>Assigned Specialist:</span>
                    <strong>{bookingResult.specialist}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--restore-text-muted)' }}>Specialist Phone:</span>
                    <strong>{bookingResult.specialistPhone}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--restore-text-muted)' }}>Date & Arrival Window:</span>
                    <strong>{bookingResult.date} ({bookingResult.timeSlot})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--restore-text-muted)' }}>Inspection Address:</span>
                    <span>{bookingResult.address}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--restore-border)', paddingTop: '12px', marginTop: '12px' }}>
                    <span style={{ color: 'var(--restore-text-muted)' }}>Estimated Price Range:</span>
                    <strong style={{ color: 'var(--restore-pink)', fontSize: '1.15rem' }}>{bookingResult.estimatedPriceRange}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="restore-btn-primary"
                    onClick={backToLanding}
                  >
                    <span>Back to Sofa Restoration</span>
                  </button>
                  {onNavigateShop && (
                    <button 
                      type="button" 
                      className="restore-btn-secondary"
                      onClick={onNavigateShop}
                    >
                      <span>Explore Sofas Shop</span>
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>


          {/* RIGHT: LIVE STICKY ESTIMATE & SCOPE SIDEBAR */}
          <div className="assessment-sidebar-sticky">
            <h4 className="assessment-sidebar-title">
              <span>Restoration Summary</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--restore-pink)', fontWeight: 800 }}>LIVE</span>
            </h4>

            {/* Dynamic Estimated Price Box */}
            <div className="assessment-sidebar-price-box">
              <div className="sidebar-price-label">Estimated Price Range</div>
              <div className="sidebar-price-amount">{currentEstimate.formattedRange}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--restore-text-muted)', marginTop: '4px' }}>
                * Includes repair, new padding & fabric options
              </div>
            </div>

            {/* Summary List */}
            <div className="sidebar-summary-list">
              <div className="sidebar-summary-row">
                <span className="label">Sofa Silhouette</span>
                <span className="value">{selectedSofaTypeObj.name} ({assessmentData.sofaAge})</span>
              </div>

              <div className="sidebar-summary-row">
                <span className="label">Selected Services</span>
                <span className="value">{assessmentData.services.length} Services</span>
              </div>

              <div className="sidebar-summary-row">
                <span className="label">Upholstery</span>
                <span className="value">{selectedUpholsteryObj.name}</span>
              </div>

              <div className="sidebar-summary-row">
                <span className="label">Assigned Artisan</span>
                <span className="value">{selectedSpecialistObj.name.split(' ')[0]} ({selectedSpecialistObj.distance})</span>
              </div>

              <div className="sidebar-summary-row">
                <span className="label">Doorstep Assessment</span>
                <span className="value" style={{ color: '#059669' }}>FREE (Save ₹299)</span>
              </div>

              <div className="sidebar-summary-row">
                <span className="label">Pickup & Drop</span>
                <span className="value" style={{ color: '#059669' }}>Included</span>
              </div>
            </div>

            {/* StitchBeez Guarantees */}
            <div className="sidebar-guarantees-list">
              <div className="sidebar-guarantee-item">
                <ShieldCheck size={16} color="var(--restore-pink)" />
                <span>Up to 3-Year Craftsmanship Warranty</span>
              </div>
              <div className="sidebar-guarantee-item">
                <Sparkles size={16} color="var(--restore-pink)" />
                <span>100+ Physical Swatches at Doorstep</span>
              </div>
              <div className="sidebar-guarantee-item">
                <Truck size={16} color="var(--restore-pink)" />
                <span>Safe Van Transport with Protective Foam Wrap</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }


  // ==========================================================================
  // VIEW MODE: SHOWCASE LANDING VIEW (8 SCREENSHOT SECTIONS)
  // ==========================================================================
  return (
    <div className={`sofa-restore-wrapper ${theme === 'dark' ? 'dark' : ''}`}>

      {/* ======================================================================
          1. HERO SECTION
          ====================================================================== */}
      <section className="sofa-restore-hero-section">
        <div className="restore-hero-container">
          
          {/* Left Hero Content */}
          <div className="restore-hero-left">
            <span className="restore-eyebrow">SOFA REPAIR & RESTORE</span>
            <h1 className="restore-hero-title">
              Give Your Sofa<br />A New Life
            </h1>
            <p className="restore-hero-desc">
              Expert repair, reupholstery and restoration to bring back the comfort, style and longevity of your favorite furniture.
            </p>

            {/* 4 Feature Badges / Highlights */}
            <div className="restore-hero-features-row">
              <div className="restore-hero-feature-item">
                <div className="restore-feature-icon-circle">
                  <RotateCcw size={20} />
                </div>
                <span className="restore-feature-label">300+ Sofas<br />Restored</span>
              </div>

              <div className="restore-hero-feature-item">
                <div className="restore-feature-icon-circle">
                  <Truck size={20} />
                </div>
                <span className="restore-feature-label">Doorstep<br />Assessment</span>
              </div>

              <div className="restore-hero-feature-item">
                <div className="restore-feature-icon-circle">
                  <ShieldCheck size={20} />
                </div>
                <span className="restore-feature-label">Up to 3-Year<br />Warranty</span>
              </div>

              <div className="restore-hero-feature-item">
                <div className="restore-feature-icon-circle">
                  <Scissors size={20} />
                </div>
                <span className="restore-feature-label">₹499 Starting<br />Price</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="restore-hero-cta-group">
              <button 
                type="button" 
                className="restore-btn-primary"
                onClick={scrollToEstimate}
              >
                <span>Get Instant Estimate</span>
                <span style={{ fontSize: '1.1rem' }}>↓</span>
              </button>

              <button 
                type="button" 
                className="restore-btn-secondary"
                onClick={() => goToPageAssessment(1)}
              >
                <span>Book Free Assessment</span>
              </button>
            </div>
          </div>

          {/* Right Hero: Interactive Before/After Comparison Slider */}
          <div className="restore-hero-right">
            <div 
              className="restore-hero-slider-wrap" 
              ref={heroSliderRef}
              onMouseDown={handleHeroDragStart}
              onTouchStart={handleHeroDragStart}
            >
              {/* After Image Layer (Background) */}
              <div className="slider-img-layer slider-after-layer">
                <img 
                  src={RESTORE_SOFA_ASSETS.hero.after} 
                  alt="Restored Sofa" 
                />
              </div>

              {/* Before Image Layer (Clipped Foreground) */}
              <div 
                className="slider-img-layer slider-before-layer"
                style={{ width: `${heroSliderPos}%` }}
              >
                <img 
                  src={RESTORE_SOFA_ASSETS.hero.before} 
                  alt="Original Damaged Sofa" 
                  style={{ 
                    width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%',
                    maxWidth: 'none'
                  }}
                />
              </div>

              {/* Draggable Divider Bar */}
              <div 
                className="slider-handle-bar"
                style={{ left: `${heroSliderPos}%` }}
              >
                <div className="slider-handle-circle">
                  <span>◄►</span>
                </div>
              </div>

              {/* Before & After Badges */}
              <span className="slider-badge-before">BEFORE</span>
              <span className="slider-badge-after">AFTER</span>

              {/* Handwritten Script Tag */}
              <span className="slider-script-tag">
                Same Sofa New Story ♡
              </span>
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--restore-text-muted)' }}>
                Drag slider horizontally to compare original vs restored state
              </span>
            </div>
          </div>

        </div>
      </section>


      {/* ======================================================================
          2. OUR SERVICES (COMPLETE SOFA REPAIR & RESTORATION)
          ====================================================================== */}
      <section className="restore-section">
        <div className="restore-section-header-center">
          <span className="restore-eyebrow">OUR SERVICES</span>
          <h2 className="restore-title">
            Complete Sofa Repair & Restoration
          </h2>
          <p className="restore-subtitle">
            Choose the service your sofa needs, from minor fixes to complete makeovers.
          </p>
        </div>

        <div className="restore-services-grid">
          {SOFA_REPAIR_SERVICES.map(srv => {
            const isSelected = selectedServices.includes(srv.id);
            return (
              <div 
                key={srv.id}
                className={`restore-service-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleService(srv.id)}
              >
                <div className="restore-service-img-wrap">
                  <img 
                    src={srv.img} 
                    alt={srv.name} 
                    className="restore-service-img" 
                  />
                </div>

                <div>
                  <h3 className="restore-service-title">{srv.name}</h3>
                  <p className="restore-service-desc">{srv.desc}</p>
                </div>

                <div className="restore-service-footer">
                  <div className="restore-service-price-col">
                    <span className="restore-service-price-from">From</span>
                    <span className="restore-service-price-val">{srv.formattedPrice}</span>
                  </div>

                  <div className="restore-service-checkbox">
                    {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ======================================================================
          3. GET AN INSTANT ESTIMATE SECTION
          ====================================================================== */}
      <section className="restore-section" id="instant-estimate-section">
        <div className="restore-estimate-panel">
          
          <div className="restore-estimate-header">
            <span className="restore-eyebrow">CALCULATOR</span>
            <h2 className="restore-estimate-title">
              Get an Instant Estimate
            </h2>
            <p className="restore-estimate-desc">
              Select your requirements and get a quick price range.
            </p>
          </div>

          <div className="restore-estimate-columns-layout">
            
            {/* Column 1: Choose Services Checklist */}
            <div className="restore-estimate-col">
              <h4 className="estimate-col-title">
                <span>Choose Services</span>
                <span className="sub-tag">({selectedServices.length} selected)</span>
              </h4>

              <div className="estimate-services-checklist">
                {ALL_ESTIMATE_SERVICES.map(srv => {
                  const isChecked = selectedServices.includes(srv.id);
                  return (
                    <div 
                      key={srv.id}
                      className={`estimate-checkbox-row ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleService(srv.id)}
                    >
                      <div className="estimate-cb-left">
                        <div className="estimate-custom-checkbox">
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span>{srv.name}</span>
                      </div>
                      <span className="estimate-cb-price">{srv.formattedPrice}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Sofa Type Selector */}
            <div className="restore-estimate-col">
              <h4 className="estimate-col-title">
                <span>Sofa Type</span>
              </h4>

              <div className="estimate-sofa-types-grid">
                {SOFA_TYPES.map(type => {
                  const isSelected = selectedSofaType === type.id;
                  return (
                    <div 
                      key={type.id}
                      className={`estimate-sofa-type-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedSofaType(type.id)}
                    >
                      <span style={{ fontSize: '1.4rem' }}>
                        {type.id === '1-seater' ? '🛋️' : type.id === '2-seater' ? '🛋️' : type.id === '3-seater' ? '🛋️' : type.id === 'l-shape' ? '📐' : '🪑'}
                      </span>
                      <span className="estimate-sofa-type-label">{type.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Upholstery Preference & Price Result Card */}
            <div className="restore-estimate-col">
              <h4 className="estimate-col-title">
                <span>Upholstery Preference</span>
              </h4>

              <div className="estimate-upholstery-grid">
                {UPHOLSTERY_PREFERENCES.map(uph => {
                  const isSelected = selectedUpholstery === uph.id;
                  return (
                    <div 
                      key={uph.id}
                      className={`estimate-upholstery-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedUpholstery(uph.id)}
                    >
                      <img 
                        src={uph.thumb} 
                        alt={uph.name} 
                        className="estimate-upholstery-thumb" 
                      />
                      <span className="estimate-upholstery-name">{uph.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Price Range Card */}
              <div className="estimate-result-card">
                <div className="estimate-result-eyebrow">Estimated Price Range:</div>
                <div className="estimate-result-sub">
                  {currentEstimate.sofaType?.name || '3 Seater'} • {currentEstimate.upholstery?.name || 'New Fabric'}
                </div>

                <div className="estimate-result-price-row">
                  <div className="estimate-result-amount">
                    {currentEstimate.formattedRange}
                  </div>

                  {/* Transitions to PAGE-LEVEL Restoration Assessment Studio */}
                  <button 
                    type="button" 
                    className="estimate-result-continue-btn"
                    onClick={() => goToPageAssessment(2)}
                  >
                    <span>Continue</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <p className="estimate-result-disclaimer">
                  * Final quote provided after doorstep inspection. No hidden charges.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================================
          4. PREMIUM FABRICS FOR EVERY STYLE
          ====================================================================== */}
      <section className="restore-section">
        <div className="restore-fabrics-header-row">
          <div>
            <span className="restore-eyebrow">MATERIALS</span>
            <h2 className="restore-title" style={{ fontSize: '1.9rem', marginBottom: '4px' }}>
              Premium Fabrics for Every Style
            </h2>
            <p className="restore-subtitle">
              Choose from hundreds of fabrics, textures and colors for your reupholstery.
            </p>
          </div>

          <button 
            type="button" 
            className="restore-link-btn"
            onClick={() => setActiveFabricModal(SOFA_REPAIR_FABRICS[0])}
          >
            <span>View All Fabrics</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* 10 Fabrics Carousel / Horizontal Swatches */}
        <div className="restore-fabrics-carousel-wrap">
          <div className="restore-fabrics-scroll-container">
            {SOFA_REPAIR_FABRICS.map(fabric => (
              <div 
                key={fabric.id}
                className="restore-fabric-chip-card"
                onClick={() => setActiveFabricModal(fabric)}
              >
                <img 
                  src={fabric.img} 
                  alt={fabric.name} 
                  className="restore-fabric-thumb-img" 
                />
                <span className="restore-fabric-chip-name">{fabric.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ======================================================================
          5. HOW IT WORKS
          ====================================================================== */}
      <section className="restore-section">
        <div className="restore-how-container">
          
          {/* Left: 6 Process Steps */}
          <div>
            <span className="restore-eyebrow">PROCESS</span>
            <h2 className="restore-title" style={{ fontSize: '2.2rem', marginBottom: '6px' }}>
              How It Works
            </h2>
            <p className="restore-subtitle">
              Simple, transparent and hassle-free sofa restoration in 6 steps.
            </p>

            <div className="restore-steps-horizontal-row">
              {RESTORE_PROCESS_STEPS.map((step, idx) => (
                <div key={step.step} className="restore-step-column">
                  <div className="restore-step-icon-circle">
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{step.step}</span>
                  </div>
                  <h4 className="restore-step-title">{step.title}</h4>
                  <p className="restore-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Artisan Image with Script Overlay */}
          <div className="restore-how-artisan-wrap">
            <img 
              src={RESTORE_SOFA_ASSETS.howItWorks.artisan} 
              alt="Artisan at Work" 
              className="restore-how-artisan-img" 
            />
            <span className="restore-how-script-tag">
              Crafted with Care ♡
            </span>
          </div>

        </div>
      </section>


      {/* ======================================================================
          6. BEFORE & AFTER TRANSFORMATIONS
          ====================================================================== */}
      <section className="restore-section">
        <div className="restore-trans-header-row">
          <div>
            <span className="restore-eyebrow">TRANSFORMATIONS</span>
            <h2 className="restore-title">
              Before & After Transformations
            </h2>
            <p className="restore-subtitle">
              Real sofas restored by our expert craftsmen.
            </p>
          </div>
        </div>

        <div className="restore-trans-grid">
          {RESTORE_SOFA_ASSETS.transformations.map(item => (
            <div 
              key={item.id} 
              className="restore-trans-card"
              onClick={() => {
                setActiveTransModal(item);
                setTransModalSliderPos(50);
              }}
            >
              <div className="restore-trans-images-pair">
                <div className="restore-trans-side">
                  <img src={item.before} alt={`${item.title} Before`} />
                  <span className="restore-trans-badge">BEFORE</span>
                </div>
                <div className="restore-trans-side">
                  <img src={item.after} alt={`${item.title} After`} />
                  <span className="restore-trans-badge" style={{ background: 'rgba(225, 29, 116, 0.88)' }}>
                    AFTER
                  </span>
                </div>
              </div>

              <div style={{ padding: '16px' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--restore-text-primary)' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--restore-text-secondary)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                  {item.desc}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--restore-border)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--restore-text-muted)', fontWeight: 600 }}>
                    {item.duration} • {item.fabric}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--restore-pink)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Compare</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ======================================================================
          7. CUSTOMER REVIEWS
          ====================================================================== */}
      <section className="restore-section">
        <div className="restore-reviews-header-row">
          <div>
            <span className="restore-eyebrow">REVIEWS</span>
            <h2 className="restore-title">
              Customer Reviews
            </h2>
            <p className="restore-subtitle">
              What our customers say about our sofa restoration.
            </p>
          </div>
        </div>

        <div className="restore-reviews-grid">
          {SOFA_REPAIR_REVIEWS.map(rev => (
            <div key={rev.id} className="restore-review-card">
              <div className="restore-review-left-col">
                <div className="restore-review-user-row">
                  <img 
                    src={rev.userAvatar} 
                    alt={rev.name} 
                    className="restore-review-avatar" 
                  />
                  <div>
                    <h5 className="restore-review-user-name">{rev.name}</h5>
                    <p className="restore-review-user-loc">{rev.location}</p>
                  </div>
                </div>

                <div className="restore-review-stars">
                  {'★'.repeat(rev.rating)}
                </div>

                <p className="restore-review-comment">
                  "{rev.comment}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', color: '#059669', fontWeight: 700 }}>
                  <ShieldCheck size={13} />
                  <span>Verified Restoration</span>
                </div>
              </div>

              <div className="restore-review-sofa-thumb-wrap">
                <img 
                  src={rev.sofaThumb} 
                  alt="Restored Sofa" 
                  className="restore-review-sofa-thumb" 
                />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ======================================================================
          8. MORE THAN REPAIR, IT'S A FRESH BEGINNING (CTA BANNER)
          ====================================================================== */}
      <section className="restore-section" style={{ marginBottom: '32px' }}>
        <div className="restore-final-cta-container">
          <img 
            src={RESTORE_SOFA_ASSETS.ctaBanner} 
            alt="Restored Living Room" 
            className="restore-final-cta-bg-img" 
          />
          <div className="restore-final-cta-overlay" />

          <div className="restore-final-cta-content">
            <h2 className="restore-final-cta-title">
              More Than Repair,<br />It's a Fresh Beginning
            </h2>
            <p className="restore-final-cta-sub">
              Give your cherished furniture the love and craftsmanship it deserves. Book a free consultation today.
            </p>

            <button 
              type="button" 
              className="restore-btn-primary"
              onClick={() => goToPageAssessment(1)}
            >
              <span>Book a Free Assessment</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <span className="restore-final-cta-script-tag">
            Made with Love ♡
          </span>
        </div>

        {/* 4 Benefit Pills below banner */}
        <div className="restore-benefits-badges-row">
          <div className="restore-benefit-pill">
            <CheckCircle2 size={18} className="pill-icon" />
            <span>Free Home Inspection</span>
          </div>

          <div className="restore-benefit-pill">
            <Sparkles size={18} className="pill-icon" />
            <span>100+ Fabric Swatches at Home</span>
          </div>

          <div className="restore-benefit-pill">
            <ShieldCheck size={18} className="pill-icon" />
            <span>Up to 3-Year Warranty</span>
          </div>

          <div className="restore-benefit-pill">
            <Truck size={18} className="pill-icon" />
            <span>Pick-up & Drop Included</span>
          </div>
        </div>
      </section>


      {/* ======================================================================
          FABRIC DETAILS MODAL (LANDING PREVIEW)
          ====================================================================== */}
      {activeFabricModal && (
        <div className="restore-modal-overlay" onClick={() => setActiveFabricModal(null)}>
          <div className="restore-modal-box" onClick={e => e.stopPropagation()}>
            <button 
              className="restore-modal-close-btn"
              onClick={() => setActiveFabricModal(null)}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', alignItems: 'center' }}>
              <div style={{ width: '100%', height: '240px', borderRadius: '14px', overflow: 'hidden' }}>
                <img 
                  src={activeFabricModal.img} 
                  alt={activeFabricModal.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              <div>
                <span className="restore-eyebrow">UPHOLSTERY MATERIAL</span>
                <h3 style={{ fontFamily: 'var(--restore-font-serif)', fontSize: '1.8rem', margin: '2px 0 8px 0', color: 'var(--restore-text-primary)' }}>
                  {activeFabricModal.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--restore-text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                  {activeFabricModal.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--restore-text-secondary)' }}>
                  <div><strong>Durability:</strong> {activeFabricModal.durability}</div>
                  <div><strong>Feel & Comfort:</strong> {activeFabricModal.comfort}</div>
                  <div><strong>Maintenance:</strong> {activeFabricModal.maintenance}</div>
                  <div><strong>Water Resistance:</strong> {activeFabricModal.waterResistant}</div>
                  <div><strong>Recommended:</strong> {activeFabricModal.recommendedFor}</div>
                  <div style={{ marginTop: '4px', fontSize: '0.9rem', color: 'var(--restore-pink)', fontWeight: 800 }}>
                    Price: {activeFabricModal.priceRange}
                  </div>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    className="restore-btn-primary"
                    onClick={() => {
                      setSelectedUpholstery('new-fabric');
                      setActiveFabricModal(null);
                      if (showToast) showToast(`${activeFabricModal.name} selected for your estimate!`);
                    }}
                  >
                    <span>Choose for Estimate</span>
                  </button>
                  <button
                    type="button"
                    className="restore-btn-secondary"
                    onClick={() => setActiveFabricModal(null)}
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ======================================================================
          TRANSFORMATION LIVE SLIDER MODAL (LANDING PREVIEW)
          ====================================================================== */}
      {activeTransModal && (
        <div className="restore-modal-overlay" onClick={() => setActiveTransModal(null)}>
          <div className="restore-modal-box" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()}>
            <button 
              className="restore-modal-close-btn"
              onClick={() => setActiveTransModal(null)}
            >
              <X size={18} />
            </button>

            <span className="restore-eyebrow">CASE STUDY</span>
            <h3 style={{ fontFamily: 'var(--restore-font-serif)', fontSize: '1.6rem', margin: '4px 0 16px 0', color: 'var(--restore-text-primary)' }}>
              {activeTransModal.title}
            </h3>

            {/* Draggable slider */}
            <div 
              className="restore-hero-slider-wrap" 
              style={{ height: '360px' }}
              ref={transSliderRef}
              onMouseDown={(e) => {
                isDraggingTransRef.current = true;
              }}
              onTouchStart={(e) => {
                isDraggingTransRef.current = true;
              }}
            >
              <div className="slider-img-layer slider-after-layer">
                <img src={activeTransModal.after} alt="After" />
              </div>

              <div 
                className="slider-img-layer slider-before-layer"
                style={{ width: `${transModalSliderPos}%` }}
              >
                <img 
                  src={activeTransModal.before} 
                  alt="Before" 
                  style={{ 
                    width: transSliderRef.current ? `${transSliderRef.current.offsetWidth}px` : '100%',
                    maxWidth: 'none'
                  }}
                />
              </div>

              <div 
                className="slider-handle-bar"
                style={{ left: `${transModalSliderPos}%` }}
              >
                <div className="slider-handle-circle">
                  <span>◄►</span>
                </div>
              </div>

              <span className="slider-badge-before">BEFORE</span>
              <span className="slider-badge-after">AFTER</span>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--restore-text-primary)' }}>
                  Services Applied: {activeTransModal.services.join(', ')}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--restore-text-muted)' }}>
                  Fabric: {activeTransModal.fabric} • Duration: {activeTransModal.duration}
                </div>
              </div>

              <button 
                type="button"
                className="restore-btn-primary"
                onClick={() => {
                  setActiveTransModal(null);
                  goToPageAssessment(1);
                }}
              >
                <span>Book Similar Restoration</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
