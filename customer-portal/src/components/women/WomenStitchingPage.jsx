import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, Sparkles, Layers, Ruler, Truck, ShieldCheck, 
  ChevronLeft, ChevronRight, ArrowRight, Check, Star, Heart, 
  User, UserCheck, Award, MapPin, Clock, Calendar, Info, X, Search, Phone, Upload
} from 'lucide-react';
import { 
  WOMEN_ASSETS, 
  WOMEN_CATEGORIES, 
  WOMEN_MOST_LOVED, 
  WOMEN_FABRICS, 
  WOMEN_HOW_IT_WORKS_STEPS, 
  WOMEN_INSPIRATION_SLIDES, 
  WOMEN_REVIEWS, 
  WOMEN_PROVIDERS 
} from '../../utils/womenStore';
import WomenCardImageSlider from './WomenCardImageSlider';
import './WomenStitchingPage.css';

export default function WomenStitchingPage({
  currentUser,
  onLoginRequired,
  theme = 'light',
  onNavigateHome,
  showToast = () => {},
  onNavigateToTailor,
  onNavigateToDesigner,
  onNavigateToFabrics
}) {
  // Navigation Refs for Carousels
  const mostLovedCarouselRef = useRef(null);
  const fabricsCarouselRef = useRef(null);
  const inspirationCarouselRef = useRef(null);
  const categoriesSectionRef = useRef(null);
  const previewMapContainerRef = useRef(null);
  const previewMapInstanceRef = useRef(null);

  // State
  const [wishlistItems, setWishlistItems] = useState({});
  const [activeProviderModal, setActiveProviderModal] = useState(null);
  const [activeMeasurementModal, setActiveMeasurementModal] = useState(false);
  const [activeCustomDesignModal, setActiveCustomDesignModal] = useState(false);
  const [selectedOutfitForMeasurement, setSelectedOutfitForMeasurement] = useState('Anarkali Suit');
  const [measurementType, setMeasurementType] = useState('ai');
  const [manualMeasurements, setManualMeasurements] = useState({
    bust: '34',
    waist: '28',
    hips: '36',
    shoulder: '14',
    armLength: '21',
    outfitLength: '48'
  });
  const [selectedFabricModal, setSelectedFabricModal] = useState(null);
  const [customDesignNotes, setCustomDesignNotes] = useState('');
  const [uploadedDesignFiles, setUploadedDesignFiles] = useState([]);

  // Toast feedback
  const triggerToast = (msg) => {
    if (typeof showToast === 'function') {
      showToast(msg);
    }
  };

  // Wishlist toggle
  const toggleWishlist = (id, name) => {
    setWishlistItems(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      triggerToast(updated[id] ? `Saved "${name}" to Wishlist!` : `Removed "${name}" from Wishlist`);
      return updated;
    });
  };

  // Carousel scroll helper
  const scrollSection = (ref, direction, scrollAmount = 300) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToCategories = () => {
    if (categoriesSectionRef.current) {
      categoriesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize interactive Leaflet Google Map for providers
  useEffect(() => {
    if (!previewMapContainerRef.current) return;
    const L = window.L;
    if (!L) return;

    if (!previewMapInstanceRef.current) {
      try {
        const map = L.map(previewMapContainerRef.current, {
          center: [12.965, 77.62],
          zoom: 11,
          zoomControl: false,
          attributionControl: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18
        }).addTo(map);

        WOMEN_PROVIDERS.forEach(prov => {
          const markerHtml = `
            <div style="background: #FF008A; width: 22px; height: 22px; border-radius: 50%; border: 2px solid #FFFFFF; box-shadow: 0 2px 6px rgba(255,0,138,0.5); display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 11px; font-weight: bold; cursor: pointer;">
              ♥
            </div>
          `;
          const customIcon = L.divIcon({
            html: markerHtml,
            className: 'custom-women-pin',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          });

          const marker = L.marker([prov.lat, prov.lng], { icon: customIcon }).addTo(map);
          marker.on('click', () => {
            setActiveProviderModal(prov);
          });
        });

        previewMapInstanceRef.current = map;
      } catch (err) {
        console.warn("Leaflet map initialization skipped:", err);
      }
    }
  }, []);

  return (
    <div className={`women-stitching-page-wrapper ${theme === 'dark' ? 'dark' : 'light'}`}>

      {/* ===================================================================== */}
      {/* SECTION 1: HERO BANNER (100% WIDTH - EXACT REFERENCE UI)              */}
      {/* ===================================================================== */}
      <section className="women-hero-section">
        <div className="women-hero-bg-container">
          <img 
            src={WOMEN_ASSETS.hero} 
            alt="Women's Stitching & Tailoring" 
            className="women-hero-bg-img"
          />
        </div>

        {/* Script watermark at top right */}
        <div className="women-hero-script-watermark">
          <span className="script-text">Tailored <br />for Your <br />Unique <br />You</span>
          <span className="script-heart">♥</span>
        </div>

        <div className="women-hero-content-layer">
          <div className="women-hero-left">
            <span className="women-hero-eyebrow">WOMEN'S STITCHING & TAILORING</span>

            <h1 className="women-hero-title">
              Your Style, <span className="pink-accent">Perfectlys</span><br />
              <span className="pink-accent">Stitched for Every You.</span>
            </h1>

            <p className="women-hero-desc">
              From everyday wear to special occasions, get custom stitched outfits with premium fabrics and expert designers. For your style, your fit and every moment of your life.
            </p>

            {/* 4 Feature Badges */}
            <div className="women-hero-features-row">
              <div className="women-hero-feat-item">
                <div className="women-feat-icon-box">
                  <Ruler size={20} />
                </div>
                <span className="women-feat-label">Perfect Fit &<br />Measurements</span>
              </div>

              <div className="women-hero-feat-item">
                <div className="women-feat-icon-box">
                  <Layers size={20} />
                </div>
                <span className="women-feat-label">Premium<br />Fabrics</span>
              </div>

              <div className="women-hero-feat-item">
                <div className="women-feat-icon-box">
                  <UserCheck size={20} />
                </div>
                <span className="women-feat-label">Verified<br />Tailors & Designers</span>
              </div>

              <div className="women-hero-feat-item">
                <div className="women-feat-icon-box">
                  <Sparkles size={20} />
                </div>
                <span className="women-feat-label">For Every<br />Occasion</span>
              </div>
            </div>

            {/* 2 Primary Hero Buttons */}
            <div className="women-hero-buttons-row">
              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToTailor) onNavigateToTailor('sarees');
                }}
                className="women-btn-pink hero-btn"
              >
                Find a Tailor Near You →
              </button>

              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToDesigner) onNavigateToDesigner('custom-design');
                }}
                className="women-btn-outline hero-btn"
              >
                Design with a Fashion Designer →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: BROWSE WOMEN'S OUTFITS (10 CATEGORIES)                     */}
      {/* ===================================================================== */}
      <section className="women-section-container" ref={categoriesSectionRef} style={{ paddingTop: '32px' }}>
        <div className="women-section-header-row">
          <div>
            <span className="women-eyebrow">EXPLORE STITCHING CATEGORIES</span>
            <h2 className="women-section-title">Browse Women's Outfits</h2>
            <p className="women-section-sub">Choose the type of outfit you need or create your own custom design.</p>
          </div>

          <button 
            type="button" 
            onClick={() => {
              if (onNavigateToTailor) onNavigateToTailor('sarees');
            }}
            className="women-section-link-btn"
          >
            View All Categories →
          </button>
        </div>

        {/* 10 Category Cards */}
        <div className="women-categories-row">
          {WOMEN_CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              className="women-cat-card"
              onClick={() => {
                if (cat.id === 'custom-design') {
                  setActiveCustomDesignModal(true);
                } else if (onNavigateToTailor) {
                  onNavigateToTailor(cat.id);
                }
              }}
            >
              <div className="women-cat-img-box">
                <img src={cat.image} alt={cat.name} className="women-cat-img" />
              </div>
              <h4 className="women-cat-title">{cat.name}</h4>
              <p className="women-cat-sub">{cat.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: DUAL SERVICE PANELS (TAILORS & DESIGNERS)                  */}
      {/* ===================================================================== */}
      <section className="women-section-container" style={{ paddingTop: '28px' }}>
        <div className="women-panels-grid">
          {/* Left Panel: Verified Tailor Stitching */}
          <div className="women-panel-card">
            <img 
              src={WOMEN_ASSETS.twoPanels.tailor} 
              alt="Get It Stitched with a Verified Tailor Near You" 
              className="women-panel-bg-img"
            />
            <div className="women-panel-left-content">
              <h3 className="women-panel-title">Get It Stitched with a<br />Verified Tailor Near You</h3>

              <ul className="women-panel-check-list">
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Choose outfit and style</span>
                </li>
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Select fabric (ours or yours)</span>
                </li>
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Find verified tailors near you (Google Maps)</span>
                </li>
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Home or shop measurements</span>
                </li>
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Transparent pricing & on-time delivery</span>
                </li>
              </ul>

              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToTailor) onNavigateToTailor('sarees');
                }}
                className="women-btn-pink panel-cta-btn"
              >
                Find Tailors Near You →
              </button>
            </div>

            <div className="panel-badge-circle" title="Find nearby tailors on Google Maps">
              <MapPin size={18} color="#FFFFFF" fill="#FF008A" />
            </div>
          </div>

          {/* Right Panel: Fashion Designer Consultation */}
          <div className="women-panel-card">
            <img 
              src={WOMEN_ASSETS.twoPanels.designer} 
              alt="Design a Unique Outfit with Our Fashion Designer" 
              className="women-panel-bg-img"
            />
            <div className="women-panel-left-content">
              <h3 className="women-panel-title">Design a Unique Outfit with<br />Our Fashion Designer</h3>

              <ul className="women-panel-check-list">
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Personalized design consultation</span>
                </li>
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Share your ideas or inspiration</span>
                </li>
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Select premium fabrics and details</span>
                </li>
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Get design sketches and approvals</span>
                </li>
                <li>
                  <span className="panel-check-icon"><Check size={14} /></span>
                  <span>Perfect fit with expert craftsmanship</span>
                </li>
              </ul>

              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToDesigner) onNavigateToDesigner('custom-design');
                }}
                className="women-btn-pink panel-cta-btn"
              >
                Talk to a Fashion Designer →
              </button>
            </div>

            <div className="panel-badge-circle" title="Consult top fashion designers">
              <Sparkles size={18} color="#FFFFFF" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: MOST LOVED DESIGNS (8 TALL CARDS WITH CAROUSEL)            */}
      {/* ===================================================================== */}
      <section className="women-section-container" style={{ paddingTop: '28px' }}>
        <div className="women-section-header-row">
          <div>
            <span className="women-eyebrow">TRENDING WOMEN'S STYLES</span>
            <h2 className="women-section-title">Most Loved Designs</h2>
            <p className="women-section-sub">Get inspired by our popular styles and stitch them to your measurements.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              onClick={() => {
                if (onNavigateToTailor) onNavigateToTailor('sarees');
              }}
              className="women-section-link-btn"
            >
              View All Styles →
            </button>

            {/* Navigation Arrows */}
            <div className="women-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(mostLovedCarouselRef, 'left', 260)} 
                className="women-nav-arrow-btn"
                aria-label="Previous styles"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(mostLovedCarouselRef, 'right', 260)} 
                className="women-nav-arrow-btn"
                aria-label="Next styles"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 8 Popular Cards */}
        <div className="women-most-loved-track" ref={mostLovedCarouselRef}>
          {WOMEN_MOST_LOVED.map(item => (
            <div key={item.id} className="women-style-card">
              <div className="women-style-img-wrap">
                <img src={item.image} alt={item.name} className="women-style-img" />

                <button 
                  type="button"
                  className={`women-heart-btn ${wishlistItems[item.id] ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item.id, item.name);
                  }}
                  aria-label="Save style to wishlist"
                >
                  <Heart size={16} fill={wishlistItems[item.id] ? '#FF008A' : 'none'} color={wishlistItems[item.id] ? '#FF008A' : '#475569'} />
                </button>
              </div>

              <div className="women-style-body">
                <h4 className="women-style-title">{item.name}</h4>
                <div className="women-style-price">Starting ₹{item.price.toLocaleString('en-IN')}</div>
                <div className="women-style-tags">
                  {item.tags.join(' · ')}
                </div>

                <button 
                  type="button" 
                  onClick={() => {
                    if (onNavigateToTailor) onNavigateToTailor(item.category, item);
                  }}
                  className="women-start-stitching-btn"
                >
                  Start Stitching →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: LUXURIOUS FABRICS FOR EVERY STYLE (10 SWATCHES)            */}
      {/* ===================================================================== */}
      <section className="women-section-container" style={{ paddingTop: '28px' }}>
        <div className="women-section-header-row">
          <div>
            <span className="women-eyebrow">PREMIUM FABRICS FOR WOMEN</span>
            <h2 className="women-section-title">Luxurious Fabrics for Every Style</h2>
            <p className="women-section-sub">Choose from a wide range of high-quality fabrics for your custom outfit.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              onClick={() => {
                if (onNavigateToFabrics) onNavigateToFabrics();
                else triggerToast('Displaying complete Women fabric catalog');
              }}
              className="women-section-link-btn"
            >
              View All Fabrics →
            </button>

            <div className="women-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(fabricsCarouselRef, 'left', 260)} 
                className="women-nav-arrow-btn"
                aria-label="Previous fabrics"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(fabricsCarouselRef, 'right', 260)} 
                className="women-nav-arrow-btn"
                aria-label="Next fabrics"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 10 Fabric Swatches */}
        <div className="women-fabrics-track" ref={fabricsCarouselRef}>
          {WOMEN_FABRICS.map(fab => (
            <div 
              key={fab.id} 
              className="women-fabric-card"
              onClick={() => setSelectedFabricModal(fab)}
            >
              <div className="women-fabric-img-wrap">
                <img src={fab.image} alt={fab.name} className="women-fabric-img" />
              </div>
              <h5 className="women-fabric-name">{fab.name}</h5>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: FROM IDEA TO PERFECT OUTFIT (6-STEP HOW IT WORKS)          */}
      {/* ===================================================================== */}
      <section className="women-section-container" style={{ paddingTop: '32px' }}>
        <div className="women-section-header-row" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '28px' }}>
          <div>
            <span className="women-eyebrow">HOW IT WORKS</span>
            <h2 className="women-section-title" style={{ textAlign: 'center' }}>From Idea to Perfect Outfit</h2>
            <p className="women-section-sub" style={{ textAlign: 'center' }}>A simple and transparent process for your custom outfit.</p>
          </div>
        </div>

        {/* 6 Steps matching Image 3 */}
        <div className="women-process-flow-container">
          {WOMEN_HOW_IT_WORKS_STEPS.map((st, i) => (
            <React.Fragment key={st.step}>
              <div className="women-process-step-col">
                <div className="women-process-icon-pair">
                  <div className="women-step-num-badge">
                    {st.step}
                  </div>
                  <div className="women-step-circle-icon">
                    {st.step === 1 && (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FF008A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
                      </svg>
                    )}
                    {st.step === 2 && (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FF008A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                        <path d="M4 14a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                        <path d="M6 10v4M18 10v4" />
                      </svg>
                    )}
                    {st.step === 3 && (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FF008A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.3 15.3a2.4 2.4 0 010 3.4l-2.6 2.6a2.4 2.4 0 01-3.4 0L2.7 8.7a2.4 2.4 0 010-3.4l2.6-2.6a2.4 2.4 0 013.4 0l12.6 12.6z" />
                        <path d="M7.5 4.5l2 2M10.5 7.5l2 2M13.5 10.5l2 2M16.5 13.5l2 2" />
                      </svg>
                    )}
                    {st.step === 4 && (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FF008A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <path d="M14 2v6h6M9 13h6M9 17h4" />
                      </svg>
                    )}
                    {st.step === 5 && (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FF008A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 18h18M5 18V8a2 2 0 012-2h10a2 2 0 012 2v10M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2M12 11v4M15 15h2" />
                      </svg>
                    )}
                    {st.step === 6 && (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FF008A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" rx="2" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="women-process-text-block">
                  <h4 className="women-process-title">{st.step}. {st.title}</h4>
                  <p className="women-process-desc">{st.desc}</p>
                </div>
              </div>

              {i < WOMEN_HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="women-process-arrow-divider">
                  <span>→</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: LOOK YOUR BEST, ALWAYS – DUAL-IMAGE HOVER CAROUSEL         */}
      {/* (CRITICAL SPECIAL ENHANCEMENT: AUTO 7S + HOVER TO IMAGE 2)             */}
      {/* ===================================================================== */}
      <section className="women-section-container" style={{ paddingTop: '36px' }}>
        <div className="women-section-header-row">
          <div>
            <span className="women-eyebrow">WOMEN'S STYLE INSPIRATION</span>
            <h2 className="women-section-title">Look Your Best, Always</h2>
            <p className="women-section-sub">From everyday essentials to grand celebrations — get inspired by our latest women's styles.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              onClick={() => {
                if (onNavigateToTailor) onNavigateToTailor('sarees');
              }}
              className="women-section-link-btn"
            >
              View More Styles →
            </button>

            <div className="women-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(inspirationCarouselRef, 'left', 260)} 
                className="women-nav-arrow-btn"
                aria-label="Previous inspiration styles"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(inspirationCarouselRef, 'right', 260)} 
                className="women-nav-arrow-btn"
                aria-label="Next inspiration styles"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 8 Dual-Image Cards */}
        <div className="women-inspiration-track" ref={inspirationCarouselRef}>
          {WOMEN_INSPIRATION_SLIDES.map(slide => (
            <div key={slide.id} className="women-insp-card">
              {/* Dual Image Hover Slider Component */}
              <WomenCardImageSlider
                images={slide.images}
                title={slide.title}
                interval={7000}
                className="women-insp-slider-wrap"
              />

              {/* Card Content Overlay */}
              <div className="women-insp-content-overlay">
                <h4 className="women-insp-title">{slide.title}</h4>
                <p className="women-insp-desc">{slide.desc}</p>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onNavigateToTailor) onNavigateToTailor(slide.category);
                  }}
                  className="women-insp-cta-btn"
                >
                  Start Stitching →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 8: CUSTOMER REVIEWS (TRUSTED BY THOUSANDS)                    */}
      {/* ===================================================================== */}
      <section className="women-section-container" style={{ paddingTop: '28px' }}>
        <div className="women-section-header-row">
          <div>
            <span className="women-eyebrow">WHAT OUR CUSTOMERS SAY</span>
            <h2 className="women-section-title">Trusted by Thousands</h2>
          </div>

          <button 
            type="button" 
            onClick={() => triggerToast('Displaying 250+ verified customer reviews!')}
            className="women-section-link-btn"
          >
            View More Reviews →
          </button>
        </div>

        <div className="women-reviews-grid">
          {WOMEN_REVIEWS.map(rev => (
            <div key={rev.id} className="women-review-card">
              <div className="women-review-header">
                <img src={rev.avatar} alt={rev.author} className="women-review-avatar" />
                <div>
                  <div className="women-review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <h5 className="women-review-author">{rev.author}</h5>
                  <span className="women-review-location">{rev.location}</span>
                </div>
              </div>
              <p className="women-review-quote">"{rev.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 9: BOTTOM PROMOTIONAL BANNER                                  */}
      {/* ===================================================================== */}
      <section className="women-section-container" style={{ paddingTop: '20px', paddingBottom: '70px' }}>
        <div className="women-bottom-banner-card">
          <img 
            src={WOMEN_ASSETS.bottomBanner} 
            alt="Every Occasion, A More Beautiful You" 
            className="women-bottom-banner-bg"
          />
          <div className="women-bottom-banner-overlay" />

          <div className="women-bottom-banner-content">
            <div className="women-bottom-banner-text">
              <h2 className="women-bottom-banner-title">
                Every Occasion <br />
                <span className="pink-line">A More Beautiful You.</span>
              </h2>
              <p className="women-bottom-banner-desc">
                From daily wear to weddings, get custom stitched outfits with premium fabrics and expert tailors.
              </p>
            </div>

            <div className="women-bottom-banner-buttons">
              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToTailor) onNavigateToTailor('sarees');
                }}
                className="women-btn-pink banner-btn"
              >
                Find a Tailor Near You →
              </button>

              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToDesigner) onNavigateToDesigner('custom-design');
                }}
                className="women-btn-outline banner-btn"
              >
                Design with a Fashion Designer →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* INTERACTIVE MODALS                                                    */}
      {/* ===================================================================== */}

      {/* 1. Provider Profile & Map Modal */}
      {activeProviderModal && (
        <div className="women-modal-backdrop" onClick={() => setActiveProviderModal(null)}>
          <div className="women-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="women-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={activeProviderModal.image} alt={activeProviderModal.name} className="modal-prov-avatar" />
                <div>
                  <h3 className="modal-prov-name">{activeProviderModal.name}</h3>
                  <div className="modal-prov-sub">
                    <span className="prov-pink-pin">📍</span> {activeProviderModal.location} ({activeProviderModal.distance})
                  </div>
                  <div className="modal-prov-rating">
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    <strong>{activeProviderModal.rating}</strong> ({activeProviderModal.reviewsCount}+ verified reviews)
                  </div>
                </div>
              </div>
              <button 
                type="button" 
                className="women-modal-close-btn" 
                onClick={() => setActiveProviderModal(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="women-modal-body">
              <div className="modal-info-badge-row">
                <div className="modal-badge-chip">
                  <Award size={14} color="#FF008A" />
                  <span>{activeProviderModal.specialization}</span>
                </div>
                <div className="modal-badge-chip">
                  <Clock size={14} color="#FF008A" />
                  <span>Delivery: {activeProviderModal.deliveryDays}</span>
                </div>
                <div className="modal-badge-chip">
                  <span>Starts at {activeProviderModal.startingPrice}</span>
                </div>
              </div>

              {/* Portfolio Samples */}
              <h5 style={{ margin: '14px 0 8px 0', fontSize: '0.88rem', fontWeight: 700, color: '#071B49' }}>
                Recent Stitching & Tailoring Portfolio
              </h5>
              <div className="modal-portfolio-grid">
                {activeProviderModal.portfolio.map((imgSrc, idx) => (
                  <img key={idx} src={imgSrc} alt="Portfolio Work" className="modal-port-img" />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="modal-action-row" style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <button 
                  type="button"
                  className="women-btn-pink"
                  style={{ flex: 1, padding: '12px' }}
                  onClick={() => {
                    setActiveProviderModal(null);
                    if (activeProviderModal.role === 'designer') {
                      if (onNavigateToDesigner) onNavigateToDesigner('custom-design');
                    } else {
                      if (onNavigateToTailor) onNavigateToTailor('sarees');
                    }
                  }}
                >
                  Book Appointment with {activeProviderModal.name.split(' ')[0]} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Custom Design Upload Modal */}
      {activeCustomDesignModal && (
        <div className="women-modal-backdrop" onClick={() => setActiveCustomDesignModal(false)}>
          <div className="women-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="women-modal-header">
              <div>
                <h3 className="modal-prov-name">Create Your Custom Design</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                  Share your inspiration sketches, photos, or describe your dream outfit.
                </p>
              </div>
              <button 
                type="button" 
                className="women-modal-close-btn" 
                onClick={() => setActiveCustomDesignModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="women-modal-body">
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: '#071B49' }}>
                  Upload Sketches / Reference Images
                </label>
                <div 
                  className="design-upload-dropzone"
                  onClick={() => {
                    setUploadedDesignFiles(prev => [...prev, `Sketch_Inspiration_${prev.length + 1}.png`]);
                    triggerToast('Sample design file attached!');
                  }}
                >
                  <Upload size={24} color="#FF008A" />
                  <p style={{ margin: '6px 0 2px 0', fontSize: '0.82rem', fontWeight: 600 }}>Click to upload reference photos or drag and drop</p>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>PNG, JPG, PDF up to 15MB</span>
                </div>

                {uploadedDesignFiles.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {uploadedDesignFiles.map((fn, idx) => (
                      <span key={idx} className="uploaded-file-pill">
                        📄 {fn}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: '#071B49' }}>
                  Design Details & Silhouette Requirements
                </label>
                <textarea 
                  rows={4}
                  className="women-modal-textarea"
                  placeholder="Describe necklines, sleeves, flare, embroidery details, fabric preferences, or specific fit instructions..."
                  value={customDesignNotes}
                  onChange={(e) => setCustomDesignNotes(e.target.value)}
                />
              </div>

              <button 
                type="button"
                className="women-btn-pink"
                style={{ width: '100%', padding: '12px' }}
                onClick={() => {
                  setActiveCustomDesignModal(false);
                  triggerToast('Custom design submitted! Connecting to our Fashion Designer.');
                  if (onNavigateToDesigner) onNavigateToDesigner('custom-design');
                }}
              >
                Submit & Connect with Fashion Designer →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Fabric Detail Modal */}
      {selectedFabricModal && (
        <div className="women-modal-backdrop" onClick={() => setSelectedFabricModal(null)}>
          <div className="women-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="women-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={selectedFabricModal.image} alt={selectedFabricModal.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                <div>
                  <h3 className="modal-prov-name">{selectedFabricModal.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#FF008A', fontWeight: 700 }}>
                    ₹{selectedFabricModal.price}/meter · {selectedFabricModal.material}
                  </span>
                </div>
              </div>
              <button 
                type="button" 
                className="women-modal-close-btn" 
                onClick={() => setSelectedFabricModal(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="women-modal-body">
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#475569', margin: '0 0 16px 0' }}>
                {selectedFabricModal.desc}
              </p>

              <div style={{ background: '#FFF0F5', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', color: '#071B49', fontWeight: 700 }}>StitchBeez Quality Promise</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>100% pre-shrunk, color-fast, and verified by certified textile experts.</div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button"
                  className="women-btn-pink"
                  style={{ flex: 1, padding: '12px' }}
                  onClick={() => {
                    const chosen = selectedFabricModal;
                    setSelectedFabricModal(null);
                    triggerToast(`Selected ${chosen.name} for your stitching order!`);
                    if (onNavigateToTailor) onNavigateToTailor('sarees', null, chosen);
                  }}
                >
                  Stitch with this Fabric →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
