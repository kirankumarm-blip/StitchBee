import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Check, X, ChevronRight, ChevronLeft, Star, MapPin, Phone, 
  ShieldCheck, Clock, Sparkles, Upload, Calendar, ArrowRight, 
  Eye, Info, Scissors, Wrench, Truck, Award, ExternalLink,
  RotateCcw, SlidersHorizontal, CheckCircle2, ArrowLeft,
  Camera, MessageCircle, HelpCircle, Layers, Palette,
  BadgePercent, Ruler, PenTool, Gem, Tag, Car
} from 'lucide-react';

import {
  VEHICLE_SEAT_ASSETS,
  VEHICLE_TYPES,
  VEHICLE_SEAT_SERVICES,
  VEHICLE_SEAT_MATERIALS,
  calculateVehicleSeatEstimate,
  WHY_STITCHBEEZ_BENEFITS,
  VEHICLE_SEAT_REVIEWS,
  BOTTOM_BENEFITS_STRIP,
  NEARBY_VEHICLE_SPECIALISTS,
  VEHICLE_ASSESSMENT_SLOTS
} from '../../utils/vehicleSeatRestoreStore';

import './VehicleSeatRestorePage.css';

export default function VehicleSeatRestorePage({
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

  // View Mode: 'landing' (10 sections) OR 'assessment' (page-level multi-step workflow)
  const isAssessmentRoute = pathname.includes('/assessment');
  const [viewMode, setViewMode] = useState(isAssessmentRoute ? 'assessment' : 'landing');

  useEffect(() => {
    if (pathname.includes('/assessment')) {
      setViewMode('assessment');
    } else if (pathname === '/vehicle-seats/repair' || pathname === '/vehicle-seats/restore' || pathname === '/seats/repair') {
      setViewMode('landing');
    }
  }, [pathname]);

  // --------------------------------------------------------------------------
  // STATE: VEHICLE SELECTION & SERVICE SELECTIONS
  // --------------------------------------------------------------------------
  // Default is 'bike-scooter' as shown in the reference screenshot
  const [selectedVehicleType, setSelectedVehicleType] = useState('bike-scooter');
  const [selectedServices, setSelectedServices] = useState(['tear-damage', 'foam-replacement']);
  const [selectedMaterial, setSelectedMaterial] = useState('leatherette');
  const [seatCount, setSeatCount] = useState(1);

  // Material Modal
  const [activeMaterialModal, setActiveMaterialModal] = useState(null);

  // 6 Transformations Slider Positions (0 to 100)
  const [transSliders, setTransSliders] = useState({
    'bike-seat': 50,
    'car-seat': 50,
    'auto-seat': 50,
    'bus-seat': 50,
    'truck-seat': 50,
    'van-seat': 50
  });
  const activeDraggingSliderRef = useRef(null);

  // --------------------------------------------------------------------------
  // PAGE-LEVEL ASSESSMENT WORKFLOW STATE
  // --------------------------------------------------------------------------
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    vehicleType: 'bike-scooter',
    services: ['tear-damage', 'foam-replacement'],
    // Dynamic vehicle details
    bikeBrand: 'Royal Enfield',
    bikeModel: 'Classic 350',
    carBrand: 'Mahindra',
    carModel: 'Thar / Scorpio',
    autoType: 'Bajaj RE Passenger',
    busType: 'Tourist 32-Seater',
    truckType: 'Tata Prima Multi-Axle',
    vanType: 'Force Traveller 12-Seater',
    tractorType: 'Mahindra 575 DI',
    otherDesc: 'Custom vintage seat frame',
    conditionNotes: 'Sunken foam causing lower back fatigue, tears along the center stitch line.',
    photos: [
      VEHICLE_SEAT_ASSETS.hero.main
    ],
    material: 'leatherette',
    serviceMethod: 'doorstep', // 'doorstep' | 'pickup' | 'workshop'
    specialistId: NEARBY_VEHICLE_SPECIALISTS[0].id,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: VEHICLE_ASSESSMENT_SLOTS[0],
    customerName: currentUser?.name || 'Arjun Sharma',
    customerPhone: currentUser?.phone || '+91 98451 22910',
    customerAddress: '24, 18th Cross, HSR Layout Sector 2, Bengaluru - 560102',
    specialInstructions: 'Parking space available inside compound for service van.'
  });
  const [bookingResult, setBookingResult] = useState(null);

  // Leaflet Google Maps Ref
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  // Dynamic estimate calculation
  const currentEstimate = calculateVehicleSeatEstimate({
    vehicleTypeId: selectedVehicleType,
    selectedServiceIds: selectedServices,
    materialId: selectedMaterial,
    seatCount
  });

  // Toggle service selection
  const toggleService = (srvId) => {
    setSelectedServices(prev => {
      const updated = prev.includes(srvId)
        ? prev.filter(id => id !== srvId)
        : [...prev, srvId];
      setAssessmentData(ad => ({ ...ad, services: updated }));
      return updated;
    });
  };

  // Transformation drag handling
  const handleTransSliderMove = (transId, clientX, rect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setTransSliders(prev => ({ ...prev, [transId]: percentage }));
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (activeDraggingSliderRef.current) {
        const { id, rect } = activeDraggingSliderRef.current;
        handleTransSliderMove(id, e.clientX, rect);
      }
    };
    const onTouchMove = (e) => {
      if (activeDraggingSliderRef.current && e.touches[0]) {
        const { id, rect } = activeDraggingSliderRef.current;
        handleTransSliderMove(id, e.touches[0].clientX, rect);
      }
    };
    const onEnd = () => {
      activeDraggingSliderRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, []);

  // Smooth scroll helper
  const scrollToTransformations = () => {
    const el = document.getElementById('vehicle-transformations-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToEstimate = () => {
    const el = document.getElementById('vehicle-estimate-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Page-level assessment navigation
  const goToAssessment = (targetStep = 1) => {
    setAssessmentData(prev => ({
      ...prev,
      vehicleType: selectedVehicleType,
      services: selectedServices.length > 0 ? selectedServices : ['tear-damage', 'foam-replacement'],
      material: selectedMaterial
    }));
    setAssessmentStep(targetStep);
    setBookingResult(null);
    setViewMode('assessment');
    navigate('/vehicle-seats/repair/assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToLanding = () => {
    setViewMode('landing');
    navigate('/vehicle-seats/repair');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --------------------------------------------------------------------------
  // LEAFLET GOOGLE MAPS SETUP (STEP 7 IN ASSESSMENT)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (viewMode !== 'assessment' || assessmentStep !== 7) {
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

      const activeSpecialist = NEARBY_VEHICLE_SPECIALISTS.find(
        s => s.id === assessmentData.specialistId
      ) || NEARBY_VEHICLE_SPECIALISTS[0];

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

      NEARBY_VEHICLE_SPECIALISTS.forEach(spec => {
        const isSelected = spec.id === assessmentData.specialistId;
        const iconHtml = `
          <div style="
            background: ${isSelected ? '#FF087A' : '#0D2344'};
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
            <span>🚗</span>
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
          photos: [...(prev.photos || []), event.target.result]
        }));
        if (showToast) showToast("Seat photo uploaded successfully");
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const removePhoto = (index) => {
    setAssessmentData(prev => ({
      ...prev,
      photos: (prev.photos || []).filter((_, idx) => idx !== index)
    }));
  };

  // Confirm Assessment Booking
  const handleConfirmAssessment = () => {
    const bookingId = `SEAT-${Math.floor(100000 + Math.random() * 900000)}`;
    const spec = NEARBY_VEHICLE_SPECIALISTS.find(s => s.id === assessmentData.specialistId) || NEARBY_VEHICLE_SPECIALISTS[0];

    const confirmedOrder = {
      bookingId,
      vehicleType: assessmentData.vehicleType,
      services: assessmentData.services,
      specialist: spec.name,
      specialistPhone: spec.phone,
      specialistAddress: spec.address,
      date: assessmentData.date,
      timeSlot: assessmentData.timeSlot,
      serviceMethod: assessmentData.serviceMethod === 'doorstep' ? 'Doorstep Mobile Service' : assessmentData.serviceMethod === 'pickup' ? 'Van Pickup & Drop' : 'Workshop Visit',
      address: assessmentData.customerAddress,
      customerName: assessmentData.customerName,
      customerPhone: assessmentData.customerPhone,
      estimatedPriceRange: currentEstimate.formattedRange,
      status: "Confirmed",
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setBookingResult(confirmedOrder);
    setAssessmentStep(9);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (onAddToCart) {
      onAddToCart({
        id: bookingId,
        name: `Vehicle Seat Assessment (${spec.name})`,
        price: 0,
        originalPrice: 299,
        image: VEHICLE_SEAT_ASSETS.hero.main,
        itemType: 'alteration',
        notes: `${assessmentData.vehicleType} • ${assessmentData.services.length} services • Inspection: ${assessmentData.date}`
      });
    }

    if (showToast) {
      showToast(`Vehicle Seat Assessment booked with ${spec.name}! Free Doorstep Visit.`);
    }
  };

  const selectedVehicleObj = VEHICLE_TYPES.find(v => v.id === assessmentData.vehicleType) || VEHICLE_TYPES[0];
  const selectedSpecialistObj = NEARBY_VEHICLE_SPECIALISTS.find(s => s.id === assessmentData.specialistId) || NEARBY_VEHICLE_SPECIALISTS[0];


  // ==========================================================================
  // VIEW MODE: PAGE-LEVEL VEHICLE SEAT ASSESSMENT STUDIO
  // ==========================================================================
  if (viewMode === 'assessment') {
    return (
      <div className={`veh-assessment-page-layout ${theme === 'dark' ? 'dark' : ''}`}>
        
        {/* Top Navigation Bar */}
        <div className="veh-assessment-nav-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              className="veh-link-btn"
              onClick={backToLanding}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Overview</span>
            </button>

            <div>
              <h2 style={{ fontFamily: 'var(--veh-font-serif)', fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'var(--veh-text-primary)' }}>
                Vehicle Seat Restoration Assessment
              </h2>
              <span style={{ fontSize: '0.74rem', color: 'var(--veh-text-muted)' }}>
                {assessmentStep <= 8 ? `Step ${assessmentStep} of 8 • Doorstep Inspection Assessment` : 'Booking Confirmed 🎉'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--veh-text-muted)' }}>
            <Phone size={15} color="var(--veh-pink)" />
            <span>Automotive Hotline: <strong>+91 98451 22910</strong></span>
          </div>
        </div>

        {/* 8-Step Stepper Bar */}
        <div className="veh-assessment-stepper-wrap">
          <div className="veh-assessment-stepper-track">
            {[
              { num: 1, label: 'Vehicle' },
              { num: 2, label: 'Services' },
              { num: 3, label: 'Details' },
              { num: 4, label: 'Photos' },
              { num: 5, label: 'Material' },
              { num: 6, label: 'Method' },
              { num: 7, label: 'Specialist' },
              { num: 8, label: 'Schedule' }
            ].map(s => {
              const isActive = assessmentStep === s.num;
              const isCompleted = assessmentStep > s.num;
              return (
                <div 
                  key={s.num}
                  className={`veh-assessment-step-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => {
                    if (s.num < assessmentStep || bookingResult) {
                      setAssessmentStep(s.num);
                    }
                  }}
                >
                  <div className="veh-assessment-step-circle">
                    {isCompleted ? <Check size={16} strokeWidth={3} /> : s.num}
                  </div>
                  <span className="veh-assessment-step-name">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid: Form (Left) + Live Sticky Estimate (Right) */}
        <div className="veh-assessment-grid">
          
          {/* Main Left Stage */}
          <div className="veh-assessment-main-panel">
            
            {/* STEP 1: VEHICLE TYPE */}
            {assessmentStep === 1 && (
              <div>
                <span className="veh-eyebrow">STEP 1 • VEHICLE CATEGORY</span>
                <h3 className="veh-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                  What type of vehicle do you have?
                </h3>
                <p className="veh-subtitle" style={{ marginBottom: '28px' }}>
                  Select your vehicle so our master craftsman brings the correct fitment tools, foams, and pattern gauges.
                </p>

                <div className="veh-types-grid" style={{ marginBottom: '32px' }}>
                  {VEHICLE_TYPES.map(vt => {
                    const isSelected = assessmentData.vehicleType === vt.id;
                    return (
                      <div 
                        key={vt.id}
                        className={`veh-type-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setAssessmentData(prev => ({ ...prev, vehicleType: vt.id }));
                          setSelectedVehicleType(vt.id);
                        }}
                      >
                        <div className="veh-type-img-wrap">
                          <img src={vt.img} alt={vt.name} className="veh-type-img" />
                        </div>
                        <h4 className="veh-type-name">{vt.name}</h4>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    type="button" 
                    className="veh-btn-primary"
                    onClick={() => {
                      setAssessmentStep(2);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                  >
                    <span>Continue to Services</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: WHAT NEEDS ATTENTION */}
            {assessmentStep === 2 && (
              <div>
                <span className="veh-eyebrow">STEP 2 • SEAT REPAIR SCOPE</span>
                <h3 className="veh-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                  What needs attention on your seats?
                </h3>
                <p className="veh-subtitle" style={{ marginBottom: '28px' }}>
                  Select one or more services required. Multiple selections are pre-calculated.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '32px' }}>
                  {VEHICLE_SEAT_SERVICES.map(srv => {
                    const isChecked = assessmentData.services.includes(srv.id);
                    return (
                      <div 
                        key={srv.id}
                        className={`glass-card ${isChecked ? 'selected' : ''}`}
                        onClick={() => {
                          const updated = isChecked
                            ? assessmentData.services.filter(id => id !== srv.id)
                            : [...assessmentData.services, srv.id];
                          setAssessmentData(prev => ({ ...prev, services: updated }));
                          setSelectedServices(updated);
                        }}
                        style={{
                          padding: '16px',
                          borderRadius: '14px',
                          border: isChecked ? '2px solid var(--veh-pink)' : '1.5px solid var(--veh-border)',
                          background: isChecked ? 'var(--veh-pink-tint)' : 'var(--veh-card)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1.5px solid var(--veh-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isChecked ? 'var(--veh-pink)' : '#fff', color: '#fff' }}>
                            {isChecked && <Check size={14} strokeWidth={3} />}
                          </div>
                          <div>
                            <strong style={{ fontSize: '0.9rem', color: 'var(--veh-text-primary)' }}>{srv.name}</strong>
                            <p style={{ fontSize: '0.74rem', color: 'var(--veh-text-secondary)', margin: '2px 0 0 0' }}>{srv.desc}</p>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--veh-pink)', marginLeft: '12px' }}>{srv.formattedPrice}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" className="veh-btn-secondary" onClick={() => setAssessmentStep(1)}>
                    <span>← Previous</span>
                  </button>
                  <button type="button" className="veh-btn-primary" onClick={() => { setAssessmentStep(3); window.scrollTo({ top: 120, behavior: 'smooth' }); }}>
                    <span>Continue to Vehicle Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DYNAMIC VEHICLE DETAILS */}
            {assessmentStep === 3 && (
              <div>
                <span className="veh-eyebrow">STEP 3 • MODEL SPECIFICATIONS</span>
                <h3 className="veh-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                  Tell us about your {selectedVehicleObj.name}
                </h3>
                <p className="veh-subtitle" style={{ marginBottom: '28px' }}>
                  Specific model details allow our upholsterers to prepare pre-cut foam inserts.
                </p>

                {assessmentData.vehicleType === 'bike-scooter' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '28px' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Bike / Scooter Brand</label>
                      <input 
                        type="text" 
                        value={assessmentData.bikeBrand} 
                        onChange={e => setAssessmentData(prev => ({ ...prev, bikeBrand: e.target.value }))}
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                        placeholder="e.g. Royal Enfield, Honda, Yamaha..."
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Model Name</label>
                      <input 
                        type="text" 
                        value={assessmentData.bikeModel} 
                        onChange={e => setAssessmentData(prev => ({ ...prev, bikeModel: e.target.value }))}
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                        placeholder="e.g. Classic 350, Activa 6G, Hunter..."
                      />
                    </div>
                  </div>
                )}

                {assessmentData.vehicleType === 'car' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '28px' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Car Brand</label>
                      <input 
                        type="text" 
                        value={assessmentData.carBrand} 
                        onChange={e => setAssessmentData(prev => ({ ...prev, carBrand: e.target.value }))}
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Model & Seating Configuration</label>
                      <input 
                        type="text" 
                        value={assessmentData.carModel} 
                        onChange={e => setAssessmentData(prev => ({ ...prev, carModel: e.target.value }))}
                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                )}

                {/* Additional notes */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Current Seat Condition & Notes</label>
                  <textarea 
                    rows={4}
                    value={assessmentData.conditionNotes}
                    onChange={e => setAssessmentData(prev => ({ ...prev, conditionNotes: e.target.value }))}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                    placeholder="Describe any sunken foam, torn seams, broken clips..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" className="veh-btn-secondary" onClick={() => setAssessmentStep(2)}>
                    <span>← Previous</span>
                  </button>
                  <button type="button" className="veh-btn-primary" onClick={() => { setAssessmentStep(4); window.scrollTo({ top: 120, behavior: 'smooth' }); }}>
                    <span>Continue to Photo Upload</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PHOTO UPLOAD */}
            {assessmentStep === 4 && (
              <div>
                <span className="veh-eyebrow">STEP 4 • SEAT VISUALS</span>
                <h3 className="veh-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                  Upload photos of your seats
                </h3>
                <p className="veh-subtitle" style={{ marginBottom: '28px' }}>
                  Clear photos help technicians verify tear depth and foam density.
                </p>

                <label style={{ display: 'block', border: '2px dashed var(--veh-border)', borderRadius: '14px', padding: '36px 20px', textAlign: 'center', cursor: 'pointer', background: 'var(--veh-surface-soft)', marginBottom: '24px' }}>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'var(--veh-pink-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    <Upload size={26} color="var(--veh-pink)" />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--veh-text-primary)' }}>
                    Drop seat photos here or click to browse
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--veh-text-muted)', marginTop: '4px' }}>
                    Supports JPG, PNG, WEBP (Supports camera capture on mobile)
                  </div>
                </label>

                {/* Previews */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  {assessmentData.photos.map((img, i) => (
                    <div key={i} style={{ width: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--veh-border)', position: 'relative' }}>
                      <img src={img} alt={`Upload ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button 
                        type="button" 
                        onClick={() => removePhoto(i)}
                        style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" className="veh-btn-secondary" onClick={() => setAssessmentStep(3)}>
                    <span>← Previous</span>
                  </button>
                  <button type="button" className="veh-btn-primary" onClick={() => { setAssessmentStep(5); window.scrollTo({ top: 120, behavior: 'smooth' }); }}>
                    <span>Continue to Materials</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: MATERIAL PREFERENCE */}
            {assessmentStep === 5 && (
              <div>
                <span className="veh-eyebrow">STEP 5 • MATERIAL SELECTION</span>
                <h3 className="veh-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                  Choose your preferred material
                </h3>
                <p className="veh-subtitle" style={{ marginBottom: '28px' }}>
                  All materials are automotive-certified, UV-stabilized, and wear-resistant.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
                  {VEHICLE_SEAT_MATERIALS.map(mat => {
                    const isSelected = assessmentData.material === mat.id;
                    return (
                      <div 
                        key={mat.id}
                        className={`veh-material-chip-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setAssessmentData(prev => ({ ...prev, material: mat.id }));
                          setSelectedMaterial(mat.id);
                        }}
                        style={{ padding: '12px', border: isSelected ? '2px solid var(--veh-pink)' : '1px solid var(--veh-border)', borderRadius: '12px' }}
                      >
                        <img src={mat.img} alt={mat.name} style={{ width: '100%', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, margin: '8px 0 2px 0', color: 'var(--veh-text-primary)' }}>{mat.name}</h4>
                        <span style={{ fontSize: '0.72rem', color: 'var(--veh-text-muted)' }}>{mat.priceTier}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" className="veh-btn-secondary" onClick={() => setAssessmentStep(4)}>
                    <span>← Previous</span>
                  </button>
                  <button type="button" className="veh-btn-primary" onClick={() => { setAssessmentStep(6); window.scrollTo({ top: 120, behavior: 'smooth' }); }}>
                    <span>Continue to Service Method</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: SERVICE METHOD */}
            {assessmentStep === 6 && (
              <div>
                <span className="veh-eyebrow">STEP 6 • SERVICE CONVENIENCE</span>
                <h3 className="veh-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                  How would you like the service performed?
                </h3>
                <p className="veh-subtitle" style={{ marginBottom: '28px' }}>
                  Choose between our mobile doorstep fitment van, free pickup & drop, or driving to our verified workshop.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                  {[
                    { id: 'doorstep', title: 'Doorstep Service', desc: 'Mobile fitment van visits your parking with tools and power generator.', icon: '🚚', badge: 'Most Popular' },
                    { id: 'pickup', title: 'Pickup & Drop', desc: 'Our courier securely collects your seat and returns it within 24-48 hours.', icon: '📦', badge: 'Free Transit' },
                    { id: 'workshop', title: 'Workshop Visit', desc: 'Drive your vehicle directly to our certified master upholsterer studio.', icon: '🏢', badge: 'Same-Day Fast' }
                  ].map(method => {
                    const isSelected = assessmentData.serviceMethod === method.id;
                    return (
                      <div 
                        key={method.id}
                        onClick={() => setAssessmentData(prev => ({ ...prev, serviceMethod: method.id }))}
                        style={{
                          padding: '24px 18px',
                          borderRadius: '16px',
                          border: isSelected ? '2px solid var(--veh-pink)' : '1.5px solid var(--veh-border)',
                          background: isSelected ? 'var(--veh-pink-tint)' : 'var(--veh-card)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '2.4rem', display: 'block', marginBottom: '10px' }}>{method.icon}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--veh-pink)', background: 'var(--veh-pink-light)', padding: '3px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>
                          {method.badge}
                        </span>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '10px 0 6px 0', color: 'var(--veh-text-primary)' }}>
                          {method.title}
                        </h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--veh-text-secondary)', margin: 0, lineHeight: 1.4 }}>
                          {method.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" className="veh-btn-secondary" onClick={() => setAssessmentStep(5)}>
                    <span>← Previous</span>
                  </button>
                  <button type="button" className="veh-btn-primary" onClick={() => { setAssessmentStep(7); window.scrollTo({ top: 120, behavior: 'smooth' }); }}>
                    <span>Select Nearby Specialist</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: SELECT SPECIALIST (REAL GOOGLE MAPS) */}
            {assessmentStep === 7 && (
              <div>
                <span className="veh-eyebrow">STEP 7 • MASTER ARTISAN</span>
                <h3 className="veh-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                  Choose a Vehicle Seat Specialist Near You
                </h3>
                <p className="veh-subtitle" style={{ marginBottom: '24px' }}>
                  Verified master craftsmen across Bengaluru equipped with mobile vans and heavy-gauge stitching rigs.
                </p>

                {/* Leaflet Google Maps View */}
                <div style={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid var(--veh-border)', marginBottom: '20px', position: 'relative' }}>
                  <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 999, background: 'rgba(255,255,255,0.95)', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, color: '#0D2344', boxShadow: '0 4px 14px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} color="#FF087A" />
                    <span>Google Maps Live Bengaluru</span>
                  </div>
                </div>

                {/* Specialist Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '28px' }}>
                  {NEARBY_VEHICLE_SPECIALISTS.map(spec => {
                    const isSelected = assessmentData.specialistId === spec.id;
                    return (
                      <div 
                        key={spec.id}
                        onClick={() => setAssessmentData(prev => ({ ...prev, specialistId: spec.id }))}
                        style={{
                          padding: '16px',
                          borderRadius: '14px',
                          border: isSelected ? '2px solid var(--veh-pink)' : '1px solid var(--veh-border)',
                          background: isSelected ? 'var(--veh-pink-tint)' : 'var(--veh-card)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--veh-border)' }}>
                          <img src={spec.avatar} alt={spec.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--veh-text-primary)' }}>{spec.name}</h4>
                          <span style={{ fontSize: '0.74rem', color: 'var(--veh-text-muted)' }}>★ {spec.rating} ({spec.reviews}) • {spec.distance}</span>
                          <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>✓ Free Doorstep Assessment</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" className="veh-btn-secondary" onClick={() => setAssessmentStep(6)}>
                    <span>← Previous</span>
                  </button>
                  <button type="button" className="veh-btn-primary" onClick={() => { setAssessmentStep(8); window.scrollTo({ top: 120, behavior: 'smooth' }); }}>
                    <span>Schedule Assessment Visit</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 8: SCHEDULE VISIT */}
            {assessmentStep === 8 && (
              <div>
                <span className="veh-eyebrow">STEP 8 • APPOINTMENT & CONTACT</span>
                <h3 className="veh-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
                  Schedule Your Free Inspection Visit
                </h3>
                <p className="veh-subtitle" style={{ marginBottom: '28px' }}>
                  Pick your date and time window. We will call you 30 minutes prior to arrival.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Inspection Date</label>
                    <input 
                      type="date"
                      value={assessmentData.date}
                      onChange={e => setAssessmentData(prev => ({ ...prev, date: e.target.value }))}
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Time Slot Window</label>
                    <select
                      value={assessmentData.timeSlot}
                      onChange={e => setAssessmentData(prev => ({ ...prev, timeSlot: e.target.value }))}
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                    >
                      {VEHICLE_ASSESSMENT_SLOTS.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Contact Name</label>
                    <input 
                      type="text" 
                      value={assessmentData.customerName}
                      onChange={e => setAssessmentData(prev => ({ ...prev, customerName: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Phone Number</label>
                    <input 
                      type="text" 
                      value={assessmentData.customerPhone}
                      onChange={e => setAssessmentData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Address (Apartment / Garage / Home in Bengaluru)</label>
                    <input 
                      type="text" 
                      value={assessmentData.customerAddress}
                      onChange={e => setAssessmentData(prev => ({ ...prev, customerAddress: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--veh-border)', background: 'var(--veh-card)', color: 'var(--veh-text-primary)', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" className="veh-btn-secondary" onClick={() => setAssessmentStep(7)}>
                    <span>← Previous</span>
                  </button>
                  <button 
                    type="button" 
                    className="veh-btn-primary" 
                    onClick={handleConfirmAssessment}
                    style={{ padding: '14px 32px', fontSize: '1rem' }}
                  >
                    <span>Confirm Free Assessment Booking</span>
                    <Check size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 9: BOOKING CONFIRMATION SUCCESS */}
            {assessmentStep === 9 && bookingResult && (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <CheckCircle2 size={42} />
                </div>

                <h3 className="veh-title" style={{ color: '#16A34A', fontSize: '2.2rem', marginBottom: '6px' }}>
                  Assessment Booked Successfully!
                </h3>
                <p className="veh-subtitle" style={{ marginBottom: '28px' }}>
                  Booking Reference: <strong>#{bookingResult.bookingId}</strong>
                </p>

                <div style={{ background: 'var(--veh-surface-soft)', padding: '28px', borderRadius: '16px', border: '1.5px solid var(--veh-border)', textAlign: 'left', maxWidth: '580px', margin: '0 auto 32px auto', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--veh-text-muted)' }}>Vehicle Type:</span>
                    <strong>{selectedVehicleObj.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--veh-text-muted)' }}>Assigned Specialist:</span>
                    <strong>{bookingResult.specialist} ({bookingResult.specialistPhone})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--veh-text-muted)' }}>Service Method:</span>
                    <span>{bookingResult.serviceMethod}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--veh-text-muted)' }}>Scheduled Time:</span>
                    <strong>{bookingResult.date} ({bookingResult.timeSlot})</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--veh-border)', paddingTop: '12px', marginTop: '12px' }}>
                    <span style={{ color: 'var(--veh-text-muted)' }}>Estimated Range:</span>
                    <strong style={{ color: 'var(--veh-pink)', fontSize: '1.15rem' }}>{bookingResult.estimatedPriceRange}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <button type="button" className="veh-btn-primary" onClick={backToLanding}>
                    <span>Back to Seat Restoration</span>
                  </button>
                  {onNavigateShop && (
                    <button type="button" className="veh-btn-secondary" onClick={onNavigateShop}>
                      <span>Shop Seat Covers</span>
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right Live Sticky Summary */}
          <div className="veh-assessment-sidebar-sticky">
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--veh-text-primary)', margin: '0 0 16px 0', paddingBottom: '12px', borderBottom: '1px solid var(--veh-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Vehicle Restoration Summary</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--veh-pink)', fontWeight: 800 }}>LIVE</span>
            </h4>

            {/* Dynamic Estimated Price Box */}
            <div className="veh-estimate-price-card" style={{ padding: '16px', marginBottom: '20px' }}>
              <div className="veh-estimate-price-label">Estimated Price Range</div>
              <div className="veh-estimate-price-val">{currentEstimate.formattedRange}</div>
              <div className="veh-estimate-price-note">* Final price confirmed after inspection</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--veh-text-muted)' }}>Vehicle</span>
                <strong>{selectedVehicleObj.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--veh-text-muted)' }}>Selected Services</span>
                <strong>{assessmentData.services.length} Services</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--veh-text-muted)' }}>Assigned Specialist</span>
                <strong>{selectedSpecialistObj.name.split(' ')[0]}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--veh-text-muted)' }}>Doorstep Assessment</span>
                <strong style={{ color: '#059669' }}>FREE (Save ₹299)</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--veh-border)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem', color: 'var(--veh-text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--veh-pink)" />
                <span>Up to 3-Year Warranty on Foam & Reupholstery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--veh-pink)" />
                <span>High-Density 50D Cold Cure Resilient Foam</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} color="var(--veh-pink)" />
                <span>Mobile Fitment Van with Power Tools</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }


  // ==========================================================================
  // VIEW MODE: SHOWCASE LANDING VIEW (10 SCREENSHOT SECTIONS)
  // ==========================================================================
  return (
    <div className={`veh-restore-wrapper ${theme === 'dark' ? 'dark' : ''}`}>

      {/* ======================================================================
          1. HERO SECTION (100% Full Width Panoramic Background)
          ====================================================================== */}
      <section className="veh-hero-section veh-hero-fullwidth">
        <div className="veh-hero-container">
          
          {/* Left Side Content */}
          <div className="veh-hero-left">
            <span className="veh-eyebrow">
              VEHICLE SEAT COVER<br />REPAIR & RESTORE
            </span>
            <h1 className="veh-hero-title">
              Comfort Back<br />On Every Ride
            </h1>
            <p className="veh-hero-desc">
              Expert repair, reupholstery and restoration for all types of vehicles. Fix tears, replace foam, renew fabric and make your seats look brand new with premium materials.
            </p>

            {/* 4 Circular Feature Badges */}
            <div className="veh-hero-features-row">
              <div className="veh-hero-feature-item">
                <div className="veh-feature-icon-circle">
                  <Gem size={20} />
                </div>
                <span className="veh-feature-label">Premium<br />Materials</span>
              </div>

              <div className="veh-hero-feature-item">
                <div className="veh-feature-icon-circle">
                  <Scissors size={20} />
                </div>
                <span className="veh-feature-label">Expert<br />Workmanship</span>
              </div>

              <div className="veh-hero-feature-item">
                <div className="veh-feature-icon-circle">
                  <BadgePercent size={20} />
                </div>
                <span className="veh-feature-label">Save Costs<br />vs New Seats</span>
              </div>

              <div className="veh-hero-feature-item">
                <div className="veh-feature-icon-circle">
                  <Truck size={20} />
                </div>
                <span className="veh-feature-label">Doorstep<br />Service</span>
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="veh-hero-cta-group">
              <button 
                type="button" 
                className="veh-btn-primary"
                onClick={() => goToAssessment(1)}
              >
                <span>Get Free Assessment</span>
                <ArrowRight size={16} />
              </button>

              <button 
                type="button" 
                className="veh-btn-secondary"
                onClick={scrollToTransformations}
              >
                <span>View Our Work</span>
              </button>
            </div>
          </div>

          <span className="veh-hero-script-tag">
            Same Seats New Comfort Every Journey ♡
          </span>

        </div>
      </section>


      {/* ======================================================================
          2. SELECT YOUR VEHICLE TYPE (8 VEHICLES)
          ====================================================================== */}
      <section className="veh-section">
        <div className="veh-section-header-center">
          <h2 className="veh-title">Select Your Vehicle Type</h2>
          <p className="veh-subtitle">
            We repair and restore seat covers for all types of vehicles.
          </p>
        </div>

        <div className="veh-types-grid">
          {VEHICLE_TYPES.map(vt => {
            const isSelected = selectedVehicleType === vt.id;
            return (
              <div 
                key={vt.id}
                className={`veh-type-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedVehicleType(vt.id)}
              >
                <div className="veh-type-img-wrap">
                  <img src={vt.img} alt={vt.name} className="veh-type-img" />
                </div>
                <h4 className="veh-type-name">{vt.name}</h4>
              </div>
            );
          })}
        </div>
      </section>


      {/* ======================================================================
          3. CHOOSE WHAT YOU NEED (6 SERVICES)
          ====================================================================== */}
      <section className="veh-section">
        <div className="veh-services-top-row">
          <div>
            <h2 className="veh-title" style={{ marginBottom: '4px' }}>Choose What You Need</h2>
            <p className="veh-subtitle">
              Select the services your seats need. Prices are starting estimates and may vary based on vehicle type, seat size and material.
            </p>
          </div>

          <div className="veh-services-benefits-pill">
            <div className="veh-benefit-tag">
              <Tag size={14} color="var(--veh-pink)" />
              <span>Transparent Pricing</span>
            </div>
            <div className="veh-benefit-tag">
              <Gem size={14} color="var(--veh-pink)" />
              <span>Quality Materials</span>
            </div>
            <div className="veh-benefit-tag">
              <Truck size={14} color="var(--veh-pink)" />
              <span>Doorstep Service</span>
            </div>
          </div>
        </div>

        <div className="veh-services-grid">
          {VEHICLE_SEAT_SERVICES.map(srv => {
            const isSelected = selectedServices.includes(srv.id);
            return (
              <div 
                key={srv.id}
                className={`veh-service-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleService(srv.id)}
              >
                <div>
                  <div className="veh-service-img-wrap">
                    <img src={srv.img} alt={srv.name} className="veh-service-img" />
                  </div>
                  <h3 className="veh-service-title">{srv.name}</h3>
                  <p className="veh-service-desc">{srv.desc}</p>
                </div>

                <div className="veh-service-footer">
                  <div className="veh-service-price-block">
                    <span className="veh-service-from">From</span>
                    <span className="veh-service-price">{srv.formattedPrice}</span>
                  </div>

                  <button 
                    type="button" 
                    className="veh-service-add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleService(srv.id);
                    }}
                  >
                    {isSelected ? '✓ Added' : 'Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ======================================================================
          4. GET AN INSTANT ESTIMATE
          ====================================================================== */}
      <section className="veh-section" id="vehicle-estimate-section">
        <div className="veh-estimate-panel">
          
          <div style={{ marginBottom: '28px' }}>
            <h2 className="veh-title" style={{ fontSize: '1.9rem', marginBottom: '4px' }}>
              Get an Instant Estimate
            </h2>
            <p className="veh-subtitle">
              Select services, vehicle type and share a few details to see the estimated price range.
            </p>
          </div>

          <div className="veh-estimate-grid-layout">
            
            {/* 4 Connected Steps */}
            <div className="veh-estimate-steps-row">
              <div className="veh-estimate-step-card">
                <span className="veh-estimate-step-badge">1 Select Services</span>
                <div className="veh-estimate-icon-box">
                  <Scissors size={24} />
                </div>
                <h4 className="veh-estimate-step-title">Select Services</h4>
                <p className="veh-estimate-step-desc">Choose one or more services.</p>
                <ChevronRight className="veh-step-connector-arrow" size={20} />
              </div>

              <div className="veh-estimate-step-card">
                <span className="veh-estimate-step-badge">2 Vehicle Details</span>
                <div className="veh-estimate-icon-box">
                  <Car size={24} />
                </div>
                <h4 className="veh-estimate-step-title">Vehicle Details</h4>
                <p className="veh-estimate-step-desc">Select your vehicle type & model.</p>
                <ChevronRight className="veh-step-connector-arrow" size={20} />
              </div>

              <div className="veh-estimate-step-card">
                <span className="veh-estimate-step-badge">3 Upload Photos</span>
                <div className="veh-estimate-icon-box">
                  <Camera size={24} />
                </div>
                <h4 className="veh-estimate-step-title">Upload Photos</h4>
                <p className="veh-estimate-step-desc">Share seat photos for accurate estimate.</p>
                <ChevronRight className="veh-step-connector-arrow" size={20} />
              </div>

              <div className="veh-estimate-step-card">
                <span className="veh-estimate-step-badge">4 Get Estimate</span>
                <div className="veh-estimate-icon-box">
                  <Tag size={24} />
                </div>
                <h4 className="veh-estimate-step-title">Get Estimate</h4>
                <p className="veh-estimate-step-desc">View estimated price range.</p>
              </div>
            </div>

            {/* Center Right Price Card */}
            <div className="veh-estimate-price-card">
              <div className="veh-estimate-price-label">Estimated Price Range</div>
              <div className="veh-estimate-price-val">{currentEstimate.formattedRange}</div>
              <p className="veh-estimate-price-note">Final price will be confirmed after inspection.</p>

              <button 
                type="button" 
                className="veh-estimate-cta-btn"
                onClick={() => goToAssessment(2)}
              >
                <span>Get My Estimate</span>
                <ArrowRight size={16} />
              </button>

              <button 
                type="button" 
                className="veh-estimate-doorstep-link"
                onClick={() => goToAssessment(8)}
              >
                <span>Book Doorstep Visit →</span>
              </button>
            </div>

            {/* Far Right Image */}
            <div className="veh-estimate-photo-wrap">
              <img src={VEHICLE_SEAT_ASSETS.estimateRight} alt="Seat Tailoring in Progress" />
            </div>

          </div>

        </div>
      </section>


      {/* ======================================================================
          5. PREMIUM MATERIAL OPTIONS (9 MATERIALS)
          ====================================================================== */}
      <section className="veh-section">
        <div className="veh-section-header-row">
          <div>
            <h2 className="veh-title" style={{ fontSize: '1.9rem', marginBottom: '4px' }}>
              Premium Material Options
            </h2>
            <p className="veh-subtitle">
              Choose from a wide range of durable and stylish materials.
            </p>
          </div>

          <button 
            type="button" 
            className="veh-link-btn"
            onClick={() => setActiveMaterialModal(VEHICLE_SEAT_MATERIALS[0])}
          >
            <span>View All Fabrics</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="veh-materials-scroll-row">
          {VEHICLE_SEAT_MATERIALS.map(mat => (
            <div 
              key={mat.id}
              className="veh-material-chip-card"
              onClick={() => setActiveMaterialModal(mat)}
            >
              <img src={mat.img} alt={mat.name} className="veh-material-thumb-img" />
              <span className="veh-material-chip-name">{mat.name}</span>
            </div>
          ))}
        </div>
      </section>


      {/* ======================================================================
          6. WHY CHOOSE STITCHBEEZ (3D Panoramic Banner)
          ====================================================================== */}
      <section className="veh-why-section-full">
        <div className="veh-why-banner-wrap">
          <img 
            src="/assets/repair-vehicle-seats/why_choose_stitchbeez_3d_hd.png" 
            alt="Why Choose StitchBeez - Built For Every Journey" 
            className="veh-why-3d-banner-img" 
          />
        </div>

        {/* Responsive mobile touch cards for small mobile screens */}
        <div className="veh-why-mobile-cards">
          {WHY_STITCHBEEZ_BENEFITS.map(b => (
            <div key={b.id} className="veh-why-mobile-card">
              <div className="veh-why-icon-circle">
                {b.icon === 'ruler' && <Car size={20} />}
                {b.icon === 'shield' && <ShieldCheck size={20} />}
                {b.icon === 'palette' && <Palette size={20} />}
                {b.icon === 'users' && <Award size={20} />}
                {b.icon === 'badge-percent' && <BadgePercent size={20} />}
                {b.icon === 'truck' && <Truck size={20} />}
              </div>
              <div className="veh-why-mobile-text">
                <span className="veh-why-mobile-title">{b.title}</span>
                <span className="veh-why-mobile-desc">{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ======================================================================
          7. BEFORE & AFTER TRANSFORMATIONS (6 PAIRS WITH SLIDER)
          ====================================================================== */}
      <section className="veh-section" id="vehicle-transformations-section">
        <div className="veh-section-header-row">
          <div>
            <h2 className="veh-title" style={{ fontSize: '1.9rem', marginBottom: '4px' }}>
              Before & After Transformations
            </h2>
            <p className="veh-subtitle">
              See how we bring new life and style to vehicle seats.
            </p>
          </div>

          <button 
            type="button" 
            className="veh-link-btn"
            onClick={() => goToAssessment(1)}
          >
            <span>View More Transformations</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="veh-trans-grid">
          {VEHICLE_SEAT_ASSETS.transformations.map(tr => {
            const sliderPos = transSliders[tr.id] || 50;
            return (
              <div key={tr.id} className="veh-trans-card">
                
                {/* Interactive Slider on Each Card */}
                <div 
                  className="veh-trans-slider-box"
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    activeDraggingSliderRef.current = { id: tr.id, rect };
                    handleTransSliderMove(tr.id, e.clientX, rect);
                  }}
                  onTouchStart={(e) => {
                    if (e.touches[0]) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      activeDraggingSliderRef.current = { id: tr.id, rect };
                      handleTransSliderMove(tr.id, e.touches[0].clientX, rect);
                    }
                  }}
                >
                  {/* After Layer (Background) */}
                  <div className="veh-trans-after-layer">
                    <img src={tr.after} alt={`${tr.title} After`} />
                  </div>

                  {/* Before Layer (Foreground clipped) */}
                  <div 
                    className="veh-trans-before-layer"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img 
                      src={tr.before} 
                      alt={`${tr.title} Before`} 
                      style={{ width: '100%', maxWidth: 'none' }}
                    />
                  </div>

                  {/* Divider Handle */}
                  <div 
                    className="veh-trans-divider-handle"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="veh-trans-handle-disc">
                      ◄►
                    </div>
                  </div>

                  <span className="veh-trans-badge-before">Before</span>
                  <span className="veh-trans-badge-after">After</span>
                </div>

                <h4 className="veh-trans-footer-title">{tr.title}</h4>
              </div>
            );
          })}
        </div>
      </section>


      {/* ======================================================================
          8. REAL PEOPLE. REAL COMFORT. (REVIEWS)
          ====================================================================== */}
      <section className="veh-section">
        <div className="veh-section-header-row">
          <div>
            <h2 className="veh-title" style={{ fontSize: '1.9rem', marginBottom: '4px' }}>
              Real People. Real Comfort.
            </h2>
            <p className="veh-subtitle">
              See what our customers say about our seat cover repair and restoration services.
            </p>
          </div>

          <button 
            type="button" 
            className="veh-link-btn"
            onClick={() => goToAssessment(1)}
          >
            <span>View More Reviews</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="veh-reviews-grid">
          {VEHICLE_SEAT_REVIEWS.map(rev => (
            <div key={rev.id} className="veh-review-card">
              <div className="veh-review-left-col">
                <div className="veh-review-stars">
                  {'★'.repeat(rev.rating)}
                </div>

                <p className="veh-review-comment">"{rev.comment}"</p>

                <div className="veh-review-user-row">
                  <img src={rev.userAvatar} alt={rev.name} className="veh-review-avatar" />
                  <div>
                    <h5 className="veh-review-user-name">{rev.name}</h5>
                    <p className="veh-review-user-loc">{rev.location}</p>
                  </div>
                </div>
              </div>

              <div className="veh-review-seat-thumb-wrap">
                <img src={rev.seatThumb} alt={rev.name} className="veh-review-seat-thumb" />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ======================================================================
          9. FINAL CTA – RESTORE COMFORT FOR EVERY VEHICLE
          ====================================================================== */}
      <section className="veh-section" style={{ marginBottom: '20px' }}>
        <div className="veh-final-cta-container">
          <img 
            src={VEHICLE_SEAT_ASSETS.restoreComfortBanner} 
            alt="Vehicle Lineup Fleet" 
            className="veh-final-cta-bg-img" 
          />
          <div className="veh-final-cta-overlay" />

          <div className="veh-final-cta-content">
            <h2 className="veh-final-cta-title">
              Restore Comfort<br />for Every Vehicle
            </h2>
            <p className="veh-final-cta-sub">
              From city rides to long journeys, we keep you comfortable.
            </p>

            <div className="veh-final-cta-btns-row">
              <button 
                type="button" 
                className="veh-btn-primary"
                onClick={() => goToAssessment(1)}
              >
                <span>Get Free Assessment</span>
                <ArrowRight size={16} />
              </button>

              {onNavigateShop && (
                <button 
                  type="button" 
                  className="veh-btn-secondary"
                  onClick={onNavigateShop}
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.3)' }}
                >
                  <span>Shop Seat Covers →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ======================================================================
          10. BOTTOM BENEFITS STRIP
          ====================================================================== */}
      <section className="veh-section" style={{ marginBottom: '40px' }}>
        <div className="veh-bottom-strip-wrap">
          {BOTTOM_BENEFITS_STRIP.map(b => (
            <div key={b.id} className="veh-bottom-benefit-item">
              {b.icon === 'car' && <Car size={16} className="icon" />}
              {b.icon === 'gem' && <Gem size={16} className="icon" />}
              {b.icon === 'pen-tool' && <PenTool size={16} className="icon" />}
              {b.icon === 'wrench' && <Wrench size={16} className="icon" />}
              {b.icon === 'tag' && <Tag size={16} className="icon" />}
              {b.icon === 'truck' && <Truck size={16} className="icon" />}
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </section>


      {/* ======================================================================
          MATERIAL DETAILS MODAL
          ====================================================================== */}
      {activeMaterialModal && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(5px)', zIndex: 99990, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={() => setActiveMaterialModal(null)}
        >
          <div 
            style={{ background: 'var(--veh-card)', borderRadius: '20px', maxWidth: '640px', width: '100%', padding: '32px', position: 'relative', border: '1px solid var(--veh-border)', boxShadow: '0 25px 50px rgba(0,0,0,0.35)' }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              type="button" 
              onClick={() => setActiveMaterialModal(null)}
              style={{ position: 'absolute', top: '18px', right: '18px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--veh-text-primary)' }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', alignItems: 'center' }}>
              <div style={{ height: '220px', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={activeMaterialModal.img} alt={activeMaterialModal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div>
                <span className="veh-eyebrow">AUTOMOTIVE UPHOLSTERY</span>
                <h3 style={{ fontFamily: 'var(--veh-font-serif)', fontSize: '1.7rem', margin: '2px 0 8px 0', color: 'var(--veh-text-primary)' }}>
                  {activeMaterialModal.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--veh-text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
                  {activeMaterialModal.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'var(--veh-text-secondary)' }}>
                  <div><strong>Durability:</strong> {activeMaterialModal.durability}</div>
                  <div><strong>Water Resistance:</strong> {activeMaterialModal.waterResistance}</div>
                  <div><strong>Comfort:</strong> {activeMaterialModal.comfort}</div>
                  <div><strong>Best For:</strong> {activeMaterialModal.recommendedVehicles}</div>
                  <div style={{ color: 'var(--veh-pink)', fontWeight: 800, marginTop: '4px' }}>Price: {activeMaterialModal.priceTier}</div>
                </div>

                <div style={{ marginTop: '18px', display: 'flex', gap: '10px' }}>
                  <button 
                    type="button"
                    className="veh-btn-primary"
                    onClick={() => {
                      setSelectedMaterial(activeMaterialModal.id);
                      setActiveMaterialModal(null);
                      if (showToast) showToast(`${activeMaterialModal.name} selected for your vehicle!`);
                    }}
                  >
                    <span>Choose Material</span>
                  </button>
                  <button 
                    type="button"
                    className="veh-btn-secondary"
                    onClick={() => setActiveMaterialModal(null)}
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
