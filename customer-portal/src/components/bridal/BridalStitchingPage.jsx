import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, Sparkles, Layers, Ruler, Truck, ShieldCheck, 
  ChevronLeft, ChevronRight, ArrowRight, Check, Star, Heart, 
  User, UserCheck, Award, MapPin, Clock, Calendar, Info, X, Search, Phone
} from 'lucide-react';
import { 
  BRIDAL_ASSETS, 
  BRIDAL_CATEGORIES, 
  BRIDAL_TRENDING_STYLES, 
  BRIDAL_FABRICS, 
  BRIDAL_PROVIDERS, 
  BRIDAL_HOW_IT_WORKS_STEPS, 
  BRIDAL_REVIEWS 
} from '../../utils/bridalStore';
import BridalCardImageSlider from './BridalCardImageSlider';
import './BridalStitchingPage.css';

export default function BridalStitchingPage({
  currentUser,
  onLoginRequired,
  theme = 'light',
  onNavigateHome,
  showToast = () => {},
  onNavigateToTailor,
  onNavigateToDesigner,
  onNavigateToFabrics
}) {
  // Navigation Refs
  const trendingCarouselRef = useRef(null);
  const fabricsCarouselRef = useRef(null);
  const providersCarouselRef = useRef(null);
  const reviewsCarouselRef = useRef(null);
  const categoriesSectionRef = useRef(null);
  const previewMapContainerRef = useRef(null);
  const previewMapInstanceRef = useRef(null);

  // Initialize interactive Leaflet Google Map for Section 4 (Bengaluru tailors)
  useEffect(() => {
    if (!previewMapContainerRef.current) return;
    const L = window.L;
    if (!L) return;

    if (!previewMapInstanceRef.current) {
      try {
        const map = L.map(previewMapContainerRef.current, {
          center: [12.965, 77.61],
          zoom: 11,
          zoomControl: false,
          attributionControl: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18
        }).addTo(map);

        BRIDAL_PROVIDERS.forEach(prov => {
          const markerHtml = `
            <div style="background: #FF008A; width: 22px; height: 22px; border-radius: 50%; border: 2px solid #FFFFFF; box-shadow: 0 2px 6px rgba(255,0,138,0.5); display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 11px; font-weight: bold; cursor: pointer;">
              ♥
            </div>
          `;
          const customIcon = L.divIcon({
            className: 'bridal-map-pin-custom',
            html: markerHtml,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
            popupAnchor: [0, -12]
          });

          const marker = L.marker([prov.lat, prov.lng], { icon: customIcon }).addTo(map);
          marker.bindPopup(`
            <div style="font-family: 'Poppins', sans-serif; font-size: 11px; line-height: 1.4; padding: 2px;">
              <strong style="color: #071B49; font-size: 12px;">${prov.name}</strong><br/>
              <span style="color: #FF008A; font-weight: 700;">★ ${prov.rating}</span> • <span style="color: #475569;">${prov.type}</span><br/>
              <span style="color: #64748B;">📍 ${prov.location}</span>
            </div>
          `);
        });

        previewMapInstanceRef.current = map;
        setTimeout(() => {
          map.invalidateSize();
        }, 350);
      } catch (err) {
        console.warn('Map initialization failed', err);
      }
    }

    return () => {
      if (previewMapInstanceRef.current) {
        previewMapInstanceRef.current.remove();
        previewMapInstanceRef.current = null;
      }
    };
  }, []);

  // Trending Styles Active Filter Pill
  const [activeTrendingFilter, setActiveTrendingFilter] = useState('All');

  // Wishlist Heart state
  const [wishlistItems, setWishlistItems] = useState({});

  // Provider Detail Modal & Booking Modal
  const [activeProviderModal, setActiveProviderModal] = useState(null);
  const [bookingProviderModal, setBookingProviderModal] = useState(null);
  const [bookingDate, setBookingDate] = useState('Tomorrow');
  const [bookingSlot, setBookingSlot] = useState('11:30 AM');
  const [bookingNotes, setBookingNotes] = useState('');

  // Location search state
  const [searchLocation, setSearchLocation] = useState('Bengaluru');

  // Toggle Wishlist
  const toggleWishlist = (id, title) => {
    setWishlistItems(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        showToast(`Saved ${title} to your bridal wishlist!`);
      } else {
        showToast(`Removed from bridal wishlist.`);
      }
      return next;
    });
  };

  // Scroll to categories section
  const scrollToCategories = () => {
    if (categoriesSectionRef.current) {
      categoriesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generic Horizontal Scroll
  const scrollSection = (ref, direction, amount = 300) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  // Filter trending styles
  const filteredTrendingStyles = BRIDAL_TRENDING_STYLES.filter(style => {
    if (activeTrendingFilter === 'All') return true;
    return style.filterTag.toLowerCase() === activeTrendingFilter.toLowerCase();
  });

  // Handle appointment booking
  const handleConfirmAppointment = () => {
    if (!bookingProviderModal) return;
    const bookingId = `SBZ-BAP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: bookingId,
      category: 'Bridal Stitching Appointment',
      categoryKey: 'bridal',
      title: `Bridal Appointment with ${bookingProviderModal.name}`,
      provider: bookingProviderModal.name,
      location: bookingProviderModal.location,
      slot: `${bookingDate}, ${bookingSlot}`,
      status: 'Appointment Confirmed',
      orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    try {
      const existing = JSON.parse(localStorage.getItem('stichbee_orders') || '[]');
      localStorage.setItem('stichbee_orders', JSON.stringify([newBooking, ...existing]));
    } catch (e) {
      console.warn('Booking sync failed', e);
    }

    showToast(`Appointment confirmed with ${bookingProviderModal.name} for ${bookingDate}, ${bookingSlot}!`);
    setBookingProviderModal(null);
  };

  return (
    <div className={`bridal-stitching-page-wrapper ${theme === 'dark' ? 'dark' : ''}`}>

      {/* ===================================================================== */}
      {/* SECTION 1: HERO BANNER (100% WIDTH - EXACT REFERENCE UI)              */}
      {/* ===================================================================== */}
      <section className="bridal-hero-section">
        <div className="bridal-hero-bg-container">
          <img 
            src={BRIDAL_ASSETS.hero} 
            alt="Two Hearts, One Perfect Look" 
            className="bridal-hero-bg-img"
          />
        </div>

        {/* Cursive script watermark in top right from reference screenshot */}
        <div className="bridal-hero-script-watermark">
          <div className="script-text">Stitched for<br />Your Beautiful<br />Beginning</div>
          <div className="script-heart">♥</div>
        </div>

        <div className="bridal-hero-content-layer">
          <div className="bridal-hero-left">
            <span className="bridal-hero-eyebrow">
              BRIDAL STITCHING & TAILORING
            </span>

            <h1 className="bridal-hero-title">
              Two Hearts, <br />
              <span className="pink-accent">One Perfect Look</span>
            </h1>

            <p className="bridal-hero-desc">
              Custom stitched bridal outfits for him and her with premium fabrics, expert designers and verified tailors. From traditional to contemporary, create outfits as unique as your love story.
            </p>

            {/* 4 Feature Badges */}
            <div className="bridal-hero-features-row">
              <div className="bridal-hero-feat-item">
                <div className="bridal-feat-icon-box">
                  <Sparkles size={20} />
                </div>
                <span className="bridal-feat-label">Perfect Fit &<br/>Measurements</span>
              </div>

              <div className="bridal-hero-feat-item">
                <div className="bridal-feat-icon-box">
                  <Layers size={20} />
                </div>
                <span className="bridal-feat-label">Premium<br/>Fabrics</span>
              </div>

              <div className="bridal-hero-feat-item">
                <div className="bridal-feat-icon-box">
                  <UserCheck size={20} />
                </div>
                <span className="bridal-feat-label">Verified<br/>Designers & Tailors</span>
              </div>

              <div className="bridal-hero-feat-item">
                <div className="bridal-feat-icon-box">
                  <Award size={20} />
                </div>
                <span className="bridal-feat-label">Complete<br/>Bridal Solutions</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="bridal-hero-buttons-row">
              <button 
                type="button"
                onClick={() => {
                  if (onNavigateToTailor) onNavigateToTailor('bridal-lehengas');
                }}
                className="bridal-btn-pink hero-btn"
              >
                Find a Designer or Tailor Near You →
              </button>

              <button 
                type="button"
                onClick={scrollToCategories}
                className="bridal-btn-outline hero-btn"
              >
                Explore Bridal Styles →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: CHOOSE YOUR BRIDAL STYLE (10 CATEGORIES HORIZONTAL ROW)    */}
      {/* ===================================================================== */}
      <section 
        ref={categoriesSectionRef} 
        className="bridal-section-container" 
        style={{ paddingTop: '28px' }}
      >
        <div className="bridal-section-header-row">
          <div>
            <span className="bridal-eyebrow">EXPLORE BRIDAL CATEGORIES</span>
            <h2 className="bridal-section-title">Choose Your Bridal Style</h2>
            <p className="bridal-section-sub">From traditional to contemporary styles or create your own custom design.</p>
          </div>

          <button 
            type="button" 
            onClick={() => {
              if (onNavigateToTailor) onNavigateToTailor('bridal-lehengas');
            }}
            className="bridal-section-link-btn"
          >
            View All Categories →
          </button>
        </div>

        {/* 10 Categories in Row */}
        <div className="bridal-categories-row">
          {BRIDAL_CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              className="bridal-cat-card"
              onClick={() => {
                if (cat.isCustom) {
                  if (onNavigateToDesigner) onNavigateToDesigner(cat.id);
                } else {
                  if (onNavigateToTailor) onNavigateToTailor(cat.id);
                }
              }}
            >
              <div className="bridal-cat-img-box">
                <img src={cat.image} alt={cat.title} className="bridal-cat-img" />
              </div>
              <h3 className="bridal-cat-title">{cat.title}</h3>
              <p className="bridal-cat-tag">{cat.tag}</p>
              <span className="bridal-cat-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: THREE MAIN BRIDAL SERVICE PANELS                           */}
      {/* ===================================================================== */}
      <section className="bridal-section-container" style={{ paddingTop: '10px' }}>
        <div className="bridal-three-panels-grid">

          {/* Panel 1: Men's Bridal Stitching */}
          <div className="bridal-panel-card mens-panel">
            <img 
              src={BRIDAL_ASSETS.panels.mens} 
              alt="Men's Bridal Stitching" 
              className="bridal-panel-bg-img"
            />
            <div className="bridal-panel-content">
              <div>
                <h3 className="bridal-panel-heading">Men's Bridal Stitching</h3>
                <div className="bridal-panel-subheading">Royal Outfits for Your Special Day</div>

                <ul className="bridal-panel-checklist">
                  <li><Check size={16} className="check-icon" /> Custom stitched sherwanis, suits and indo-western</li>
                  <li><Check size={16} className="check-icon" /> Premium fabrics and royal designs</li>
                  <li><Check size={16} className="check-icon" /> Expert tailors and designers</li>
                  <li><Check size={16} className="check-icon" /> Perfect fit with professional measurements</li>
                  <li><Check size={16} className="check-icon" /> From mehendi to reception - complete solutions</li>
                </ul>
              </div>

              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToTailor) onNavigateToTailor('sherwanis');
                }}
                className="bridal-btn-pink panel-cta-btn"
              >
                Explore Men's Bridal Styles →
              </button>
            </div>
          </div>

          {/* Panel 2: Design with Our Fashion Designers */}
          <div className="bridal-panel-card designer-panel">
            <img 
              src={BRIDAL_ASSETS.panels.designer} 
              alt="Design with Our Fashion Designers" 
              className="bridal-panel-bg-img"
            />
            <div className="bridal-panel-content">
              <div>
                <div className="panel-badge-top">
                  <div className="sparkle-icon-wrap">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="bridal-panel-heading">Design with Our<br />Fashion Designers</h3>
                </div>

                <ul className="bridal-panel-checklist">
                  <li><Check size={16} className="check-icon" /> Personalized design consultation</li>
                  <li><Check size={16} className="check-icon" /> Choose from new trending styles</li>
                  <li><Check size={16} className="check-icon" /> Get custom design sketches & approvals</li>
                  <li><Check size={16} className="check-icon" /> Premium fabric selection</li>
                  <li><Check size={16} className="check-icon" /> Work with expert bridal designers</li>
                </ul>
              </div>

              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToDesigner) onNavigateToDesigner('custom-design');
                }}
                className="bridal-btn-pink panel-cta-btn"
              >
                Talk to a Fashion Designer →
              </button>
            </div>
          </div>

          {/* Panel 3: Women's Bridal Stitching */}
          <div className="bridal-panel-card womens-panel">
            <img 
              src={BRIDAL_ASSETS.panels.womens} 
              alt="Women's Bridal Stitching" 
              className="bridal-panel-bg-img"
            />
            <div className="bridal-panel-content">
              <div>
                <h3 className="bridal-panel-heading pink-head">Women's Bridal Stitching</h3>
                <div className="bridal-panel-subheading">Graceful Outfits for Your Special Day</div>

                <ul className="bridal-panel-checklist">
                  <li><Check size={16} className="check-icon" /> Custom stitched lehengas, sarees, gowns and more</li>
                  <li><Check size={16} className="check-icon" /> Premium fabrics and unique designs</li>
                  <li><Check size={16} className="check-icon" /> Expert designers and tailors</li>
                  <li><Check size={16} className="check-icon" /> Perfect fit with professional measurements</li>
                  <li><Check size={16} className="check-icon" /> From mehendi to reception - complete solutions</li>
                </ul>
              </div>

              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToTailor) onNavigateToTailor('bridal-lehengas');
                }}
                className="bridal-btn-pink panel-cta-btn"
              >
                Explore Women's Bridal Styles →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: FIND VERIFIED DESIGNERS & TAILORS NEAR YOU (GOOGLE MAPS)   */}
      {/* ===================================================================== */}
      <section className="bridal-section-container" style={{ paddingTop: '24px' }}>
        <div className="bridal-section-header-row">
          <div>
            <h2 className="bridal-section-title">
              Find Verified Designers & Tailors <span className="pink-accent">Near You</span>
            </h2>
            <p className="bridal-section-sub">Choose from expert bridal designers and experienced tailors in your city.</p>
          </div>

          {/* Search bar from reference screenshot */}
          <div className="bridal-location-search-wrap">
            <span className="search-label">Search by Location</span>
            <div className="search-input-pill">
              <MapPin size={16} className="pin-icon" />
              <select 
                value={searchLocation} 
                onChange={(e) => setSearchLocation(e.target.value)}
                className="search-select"
              >
                <option value="Bengaluru">Bengaluru</option>
                <option value="Indiranagar">Indiranagar</option>
                <option value="Koramangala">Koramangala</option>
                <option value="HSR Layout">HSR Layout</option>
                <option value="Jayanagar">Jayanagar</option>
                <option value="Commercial Street">Commercial Street</option>
              </select>
              <button 
                type="button" 
                className="search-btn-pink"
                onClick={() => showToast(`Showing top bridal partners near ${searchLocation}`)}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* 6 Provider Cards + 1 Map Card */}
        <div className="bridal-providers-grid" ref={providersCarouselRef}>
          {BRIDAL_PROVIDERS.map(prov => (
            <div key={prov.id} className="bridal-provider-card">
              <div className="prov-img-wrap">
                <img src={prov.image} alt={prov.name} className="prov-img" />
                <button 
                  type="button"
                  className={`prov-heart-btn ${wishlistItems[prov.id] ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(prov.id, prov.name);
                  }}
                  aria-label="Save to wishlist"
                >
                  <Heart size={16} fill={wishlistItems[prov.id] ? '#FF008A' : 'none'} color={wishlistItems[prov.id] ? '#FF008A' : '#475569'} />
                </button>
              </div>

              <div className="prov-body">
                <h4 className="prov-name">{prov.name}</h4>
                <div className="prov-rating">
                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                  <strong>{prov.rating}</strong> <span className="reviews-sub">({prov.reviewsCount}+ reviews)</span>
                </div>
                <div className="prov-type-tag">
                  <span className="prov-pink-pin">📍</span> {prov.type}
                </div>
                <div className="prov-loc">
                  <span className="prov-pink-pin">📍</span> {prov.location}
                </div>

                <button 
                  type="button" 
                  className="prov-view-profile-btn"
                  onClick={() => setActiveProviderModal(prov)}
                >
                  View Profile →
                </button>
              </div>
            </div>
          ))}

          {/* 7th Card: Interactive Leaflet Google Maps Card */}
          <div className="bridal-map-card">
            <div className="map-card-graphic" style={{ position: 'relative' }}>
              <div 
                ref={previewMapContainerRef} 
                style={{ width: '100%', height: '100%', minHeight: '180px', borderRadius: '10px', overflow: 'hidden' }}
              />
              <div className="map-badge-overlay">
                <span>📍 Bengaluru</span>
              </div>
            </div>

            <button 
              type="button"
              className="map-view-btn-pink"
              onClick={() => {
                if (onNavigateToTailor) onNavigateToTailor('bridal-lehengas');
              }}
            >
              View on Map →
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: TRENDING BRIDAL STYLES (TWO IMAGES PER CARD! - MAIN REQ)   */}
      {/* ===================================================================== */}
      <section className="bridal-section-container" style={{ paddingTop: '28px' }}>
        <div className="bridal-section-header-row">
          <div>
            <h2 className="bridal-section-title">Trending Bridal Styles</h2>
            <p className="bridal-section-sub">Get inspired by our most loved designs for him and her.</p>
          </div>

          <div className="bridal-trending-controls-row">
            {/* Filter Pills */}
            <div className="trending-filter-pills">
              {['All', 'Lehenga', 'Saree', 'Sherwani', 'Indo-Western', 'Gown', 'Suits', 'Couple Outfits'].map(pill => (
                <button
                  key={pill}
                  type="button"
                  className={`filter-pill-chip ${activeTrendingFilter === pill ? 'active' : ''}`}
                  onClick={() => setActiveTrendingFilter(pill)}
                >
                  {pill}
                </button>
              ))}
            </div>

            <button 
              type="button" 
              onClick={() => {
                if (onNavigateToTailor) onNavigateToTailor('bridal-lehengas');
              }}
              className="bridal-section-link-btn"
            >
              View All Styles →
            </button>

            {/* Carousel Navigation Arrows */}
            <div className="bridal-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(trendingCarouselRef, 'left', 260)} 
                className="bridal-nav-arrow-btn"
                aria-label="Previous trending styles"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(trendingCarouselRef, 'right', 260)} 
                className="bridal-nav-arrow-btn"
                aria-label="Next trending styles"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 8 Trending Cards with 2 Images Each (Auto-sliding every 7 seconds) */}
        <div className="bridal-trending-carousel-track" ref={trendingCarouselRef}>
          {filteredTrendingStyles.map(style => (
            <div key={style.id} className="bridal-trending-card">
              <div className="trending-card-slider-wrap">
                {/* 2-Image Slider inside each card */}
                <BridalCardImageSlider
                  images={style.images}
                  altText={style.name}
                  interval={7000}
                />

                <button 
                  type="button"
                  className={`trending-heart-btn ${wishlistItems[style.id] ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(style.id, style.name);
                  }}
                  aria-label="Save style to wishlist"
                >
                  <Heart size={16} fill={wishlistItems[style.id] ? '#FF008A' : 'none'} color={wishlistItems[style.id] ? '#FF008A' : '#475569'} />
                </button>
              </div>

              <div className="trending-card-body">
                <h4 className="trending-outfit-title">{style.name}</h4>
                <p className="trending-outfit-desc">{style.desc}</p>

                <button 
                  type="button"
                  onClick={() => {
                    if (onNavigateToTailor) {
                      onNavigateToTailor(style.category, style);
                    }
                  }}
                  className="bridal-start-stitching-btn"
                >
                  Start Stitching →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: PREMIUM FABRICS FOR BRIDAL (10 SWATCHES CAROUSEL)          */}
      {/* ===================================================================== */}
      <section className="bridal-section-container" style={{ paddingTop: '28px' }}>
        <div className="bridal-section-header-row">
          <div>
            <h2 className="bridal-section-title">Premium Fabrics for Bridal</h2>
            <p className="bridal-section-sub">Explore a wide range of luxurious fabrics for your dream outfit.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              onClick={() => {
                if (onNavigateToFabrics) onNavigateToFabrics();
              }}
              className="bridal-section-link-btn"
            >
              View All Fabrics →
            </button>

            <div className="bridal-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(fabricsCarouselRef, 'left', 220)} 
                className="bridal-nav-arrow-btn"
                aria-label="Previous fabrics"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(fabricsCarouselRef, 'right', 220)} 
                className="bridal-nav-arrow-btn"
                aria-label="Next fabrics"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 10 Fabric Swatches */}
        <div className="bridal-fabrics-carousel-track" ref={fabricsCarouselRef}>
          {BRIDAL_FABRICS.map(fab => (
            <div 
              key={fab.id} 
              className="bridal-fabric-swatch-card"
              onClick={() => {
                if (onNavigateToFabrics) onNavigateToFabrics();
              }}
            >
              <div className="bridal-fabric-swatch-img-box">
                <img src={fab.image} alt={fab.name} className="bridal-fabric-swatch-img" />
              </div>
              <div className="bridal-fabric-swatch-name">{fab.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: HOW IT WORKS (7 CIRCULAR STEPS FLOW)                       */}
      {/* ===================================================================== */}
      <section className="bridal-section-container" style={{ paddingTop: '24px' }}>
        <div className="bridal-section-header-row" style={{ marginBottom: '16px' }}>
          <div>
            <span className="bridal-eyebrow">HOW IT WORKS</span>
            <h2 className="bridal-section-title">How It Works</h2>
            <p className="bridal-section-sub">A simple and transparent process for your custom bridal outfit.</p>
          </div>
        </div>

        <div className="bridal-process-flow-row">
          {BRIDAL_HOW_IT_WORKS_STEPS.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="bridal-process-node">
                <div className="bridal-process-circle">
                  <span className="node-num">{step.num}</span>
                  {step.num === 1 && <Sparkles size={22} />}
                  {step.num === 2 && <MapPin size={22} />}
                  {step.num === 3 && <Layers size={22} />}
                  {step.num === 4 && <Ruler size={22} />}
                  {step.num === 5 && <Award size={22} />}
                  {step.num === 6 && <Scissors size={22} />}
                  {step.num === 7 && <Truck size={22} />}
                </div>

                <h4 className="bridal-process-title">{step.title}</h4>
                <p className="bridal-process-desc">{step.desc}</p>
              </div>

              {idx < BRIDAL_HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="bridal-process-arrow">
                  <ArrowRight size={16} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 8: REAL COUPLES, REAL HAPPINESS (TESTIMONIALS)                 */}
      {/* ===================================================================== */}
      <section className="bridal-section-container" style={{ paddingTop: '24px' }}>
        <div className="bridal-section-header-row">
          <div>
            <span className="bridal-eyebrow">REAL COUPLES, REAL HAPPINESS</span>
            <h2 className="bridal-section-title">Real Couples, Real Happiness</h2>
            <p className="bridal-section-sub">Our brides and grooms loved their custom outfits.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              onClick={() => showToast('Displaying 180+ verified bridal reviews!')}
              className="bridal-section-link-btn"
            >
              View All Reviews →
            </button>

            <div className="bridal-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(reviewsCarouselRef, 'left', 320)} 
                className="bridal-nav-arrow-btn"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(reviewsCarouselRef, 'right', 320)} 
                className="bridal-nav-arrow-btn"
                aria-label="Next reviews"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="bridal-reviews-track" ref={reviewsCarouselRef}>
          {BRIDAL_REVIEWS.map(rev => (
            <div key={rev.id} className="bridal-review-card">
              <div className="bridal-review-top-row">
                <img src={rev.avatar} alt={rev.author} className="bridal-review-avatar" />
                <div className="bridal-review-stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>

              <p className="bridal-review-quote">"{rev.text}"</p>

              <div className="bridal-review-author-info">
                <div className="author-name">{rev.author}</div>
                <div className="author-loc">{rev.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 9: BOTTOM PROMOTIONAL BANNER                                  */}
      {/* ===================================================================== */}
      <section className="bridal-section-container" style={{ paddingTop: '20px', paddingBottom: '70px' }}>
        <div className="bridal-bottom-banner-card">
          <img 
            src={BRIDAL_ASSETS.bottomBanner} 
            alt="Your Dream Wedding Outfit Starts Here" 
            className="bridal-bottom-banner-bg"
          />
          <div className="bridal-bottom-banner-overlay" />

          <div className="bridal-bottom-banner-content">
            <div className="bridal-bottom-banner-text">
              <h2 className="bridal-bottom-banner-title">
                Your Dream Wedding Outfit <br />
                <span className="pink-line">Starts Here</span>
              </h2>
              <p className="bridal-bottom-banner-desc">
                From mehendi to reception, get custom stitched outfits with premium fabrics and expert designers.
              </p>
            </div>

            <div className="bridal-bottom-banner-buttons">
              <button 
                type="button" 
                onClick={() => {
                  if (onNavigateToTailor) onNavigateToTailor('bridal-lehengas');
                }}
                className="bridal-btn-pink banner-btn"
              >
                Find a Designer or Tailor Near You →
              </button>

              <button 
                type="button" 
                onClick={scrollToCategories}
                className="bridal-btn-outline banner-btn"
              >
                Explore Bridal Styles →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* PROVIDER PROFILE MODAL                                                */}
      {/* ===================================================================== */}
      {activeProviderModal && (
        <div className="bridal-modal-backdrop" onClick={() => setActiveProviderModal(null)}>
          <div className="bridal-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="bridal-modal-header">
              <div className="prov-modal-top">
                <img src={activeProviderModal.image} alt={activeProviderModal.name} className="modal-avatar" />
                <div>
                  <h3 className="modal-title">{activeProviderModal.name}</h3>
                  <div className="modal-specialty">{activeProviderModal.specialty}</div>
                  <div className="modal-rating">★ {activeProviderModal.rating} ({activeProviderModal.reviewsCount}+ verified reviews) • {activeProviderModal.location}</div>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveProviderModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="bridal-modal-body">
              <div className="modal-stats-grid">
                <div className="stat-card">
                  <span className="stat-num">{activeProviderModal.experienceYears}+</span>
                  <span className="stat-lbl">Years of Experience</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">{activeProviderModal.portfolioCount}+</span>
                  <span className="stat-lbl">Bridal Ensembles Crafted</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">₹{activeProviderModal.startingPrice}</span>
                  <span className="stat-lbl">Starting Price</span>
                </div>
              </div>

              <h4 style={{ margin: '18px 0 10px 0', fontSize: '1rem', color: '#071B49' }}>Specialized Bridal Services</h4>
              <div className="services-chips">
                <span className="chip">Heirloom Hand Embroidery</span>
                <span className="chip">Royal Zardozi & Maggam Work</span>
                <span className="chip">Coordinated Groom & Bride Themes</span>
                <span className="chip">Complimentary Pre-Stitch Fitting Trial</span>
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button"
                  className="bridal-btn-pink"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setBookingProviderModal(activeProviderModal);
                    setActiveProviderModal(null);
                  }}
                >
                  Book Bridal Consultation Appointment →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* APPOINTMENT BOOKING MODAL                                             */}
      {/* ===================================================================== */}
      {bookingProviderModal && (
        <div className="bridal-modal-backdrop" onClick={() => setBookingProviderModal(null)}>
          <div className="bridal-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="bridal-modal-header">
              <div>
                <h3 className="modal-title">Book Bridal Appointment with {bookingProviderModal.name}</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>{bookingProviderModal.location}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setBookingProviderModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="bridal-modal-body">
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>Preferred Date</label>
                <select 
                  value={bookingDate} 
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="bridal-input"
                >
                  <option value="Tomorrow">Tomorrow (Friday)</option>
                  <option value="Saturday">Saturday (Weekend Slot)</option>
                  <option value="Sunday">Sunday (Weekend Slot)</option>
                  <option value="Monday">Next Monday</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>Select Available Time Slot</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {['10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'].map(slot => (
                    <button
                      key={slot}
                      type="button"
                      className={`pill-btn ${bookingSlot === slot ? 'active' : ''}`}
                      onClick={() => setBookingSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>Special Requests / Wedding Event Date</label>
                <input 
                  type="text" 
                  placeholder="E.g., Wedding on 18th December. Bringing sample lehenga fabric."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="bridal-input"
                />
              </div>

              <button 
                type="button" 
                className="bridal-btn-pink"
                style={{ width: '100%' }}
                onClick={handleConfirmAppointment}
              >
                Confirm Appointment Slot →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
