import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Scissors, Sparkles, Layers, Ruler, Truck, ShieldCheck, 
  ChevronLeft, ChevronRight, ArrowRight, Check, Star, Heart, 
  User, Award, MapPin, Clock, Calendar, Info, X, Play, Pause
} from 'lucide-react';
import { 
  MEN_ASSETS, 
  MEN_CATEGORIES, 
  MEN_POPULAR_STYLES, 
  MEN_FABRICS, 
  MEN_HOW_IT_WORKS_STEPS, 
  MEN_INSPIRATION_SLIDES, 
  MEN_REVIEWS 
} from '../../utils/menStore';
import MenTailorWorkflowModal from './MenTailorWorkflowModal';
import MenDesignerWorkflowModal from './MenDesignerWorkflowModal';
import './MenStitchingPage.css';

export default function MenStitchingPage({
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
  const stylesCarouselRef = useRef(null);
  const fabricsCarouselRef = useRef(null);
  const reviewsCarouselRef = useRef(null);
  const inspirationContainerRef = useRef(null);

  // Modals
  const [tailorWorkflowOpen, setTailorWorkflowOpen] = useState(false);
  const [designerWorkflowOpen, setDesignerWorkflowOpen] = useState(false);
  const [selectedWorkflowCategory, setSelectedWorkflowCategory] = useState('suits-blazers');
  const [selectedWorkflowStyle, setSelectedWorkflowStyle] = useState(null);
  const [selectedWorkflowFabric, setSelectedWorkflowFabric] = useState(null);

  // Informational Modals & Inspectors
  const [activeFabricModal, setActiveFabricModal] = useState(null);
  const [allFabricsModalOpen, setAllFabricsModalOpen] = useState(false);
  const [allCategoriesModalOpen, setAllCategoriesModalOpen] = useState(false);
  const [allStylesModalOpen, setAllStylesModalOpen] = useState(false);
  const [allReviewsModalOpen, setAllReviewsModalOpen] = useState(false);

  // Per-card inner image index for "Look Your Best, Always" (each card toggles its images inside)
  const [cardActiveImageMap, setCardActiveImageMap] = useState({});
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // 10-Second Auto-Sliding/Toggling for images inside each card
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsCarouselPaused(true);
      } else {
        setIsCarouselPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const timer = setInterval(() => {
      if (!isCarouselPaused && !document.hidden) {
        setCardActiveImageMap(prev => {
          const next = { ...prev };
          MEN_INSPIRATION_SLIDES.forEach(s => {
            next[s.id] = (next[s.id] || 0) === 0 ? 1 : 0;
          });
          return next;
        });
      }
    }, 8000);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isCarouselPaused]);

  // Touch Swipe for Inspiration Carousel
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextInspiration();
    } else if (distance < -50) {
      prevInspiration();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard Navigation for Inspiration Carousel
  const handleInspirationKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevInspiration();
    } else if (e.key === 'ArrowRight') {
      nextInspiration();
    }
  };

  // Generic Horizontal Scroll Helper
  const scrollSection = (ref, direction, amount = 300) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  // Workflow Openers
  const openTailorWorkflow = (catId = 'suits-blazers', styleObj = null, fabricObj = null) => {
    if (onNavigateToTailor) {
      onNavigateToTailor(catId, styleObj, fabricObj);
      return;
    }
    setSelectedWorkflowCategory(catId);
    setSelectedWorkflowStyle(styleObj);
    setSelectedWorkflowFabric(fabricObj);
    setTailorWorkflowOpen(true);
  };

  const openDesignerWorkflow = (catId = 'custom-design') => {
    if (onNavigateToDesigner) {
      onNavigateToDesigner(catId);
      return;
    }
    setSelectedWorkflowCategory(catId);
    setDesignerWorkflowOpen(true);
  };

  const openFabricsStudio = () => {
    if (onNavigateToFabrics) {
      onNavigateToFabrics();
      return;
    }
    setAllFabricsModalOpen(true);
  };

  return (
    <div className={`men-stitching-page-wrapper ${theme === 'dark' ? 'dark' : ''}`}>

      {/* ===================================================================== */}
      {/* SECTION 1: HERO BANNER (100% WIDTH - EXACT REFERENCE UI)              */}
      {/* ===================================================================== */}
      <section className="men-hero-section">
        <div className="men-hero-bg-container">
          <img 
            src={MEN_ASSETS.hero} 
            alt="Custom Fit for Every Occasion" 
            className="men-hero-bg-img"
          />
        </div>

        {/* Floating Tailored Script Badge from Reference */}
        <div className="men-hero-floating-tailored">
          <div className="tailored-script">Tailored<br/>for Your<br/>Style</div>
          <div className="tailored-heart">♥</div>
        </div>

        <div className="men-hero-content-layer">
          <div className="men-hero-left">
            <span className="men-hero-eyebrow">
              MEN'S STITCHING & TAILORING
            </span>

            <h1 className="men-hero-title">
              Custom Fit for<br />
              <span className="men-hero-title-pink">Every Occasion</span>
            </h1>

            <p className="men-hero-desc">
              Classic to contemporary, get perfectly tailored outfits with premium fabrics and expert tailors. From everyday wear to weddings and formal attire - look your best with StitchBeez.
            </p>

            {/* 4 Feature Badges */}
            <div className="men-hero-features-row">
              <div className="men-hero-feat-item">
                <div className="men-feat-icon-box">
                  <Ruler size={20} />
                </div>
                <span className="men-feat-label">Perfect Fit &<br/>Measurements</span>
              </div>

              <div className="men-hero-feat-item">
                <div className="men-feat-icon-box">
                  <Layers size={20} />
                </div>
                <span className="men-feat-label">Premium<br/>Fabrics</span>
              </div>

              <div className="men-hero-feat-item">
                <div className="men-feat-icon-box">
                  <Scissors size={20} />
                </div>
                <span className="men-feat-label">Verified<br/>Tailors</span>
              </div>

              <div className="men-hero-feat-item">
                <div className="men-feat-icon-box">
                  <Award size={20} />
                </div>
                <span className="men-feat-label">For Every<br/>Occasion</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="men-hero-buttons-row">
              <button 
                type="button"
                onClick={() => openTailorWorkflow('suits-blazers')}
                className="men-btn-pink hero-btn"
              >
                Find a Tailor Near You →
              </button>

              <button 
                type="button"
                onClick={() => openDesignerWorkflow('custom-design')}
                className="men-btn-outline hero-btn"
              >
                Design with a Fashion Designer →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: EXPLORE MEN'S OUTFITS (10 CATEGORY CARDS)                  */}
      {/* ===================================================================== */}
      <section className="men-section-container">
        <div className="men-section-header-row">
          <div>
            <span className="men-eyebrow">EXPLORE STITCHING CATEGORIES</span>
            <h2 className="men-section-title">Explore Men's Outfits</h2>
            <p className="men-section-sub">Choose the type of outfit you need or create your own custom design.</p>
          </div>

          <button 
            type="button" 
            onClick={() => setAllCategoriesModalOpen(true)}
            className="men-section-link-btn"
          >
            View All Categories →
          </button>
        </div>

        <div className="men-categories-scroll-row">
          {MEN_CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              className="men-cat-card"
              onClick={() => {
                if (cat.isCustom) {
                  openDesignerWorkflow(cat.id);
                } else {
                  openTailorWorkflow(cat.id);
                }
              }}
            >
              <div className="men-cat-img-box">
                <img src={cat.image} alt={cat.title} className="men-cat-img" />
              </div>
              <h3 className="men-cat-title">{cat.title}</h3>
              <p className="men-cat-sub">{cat.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: TWO MAIN STITCHING OPTIONS (TAILOR vs DESIGNER)             */}
      {/* ===================================================================== */}
      <section className="men-section-container" style={{ paddingTop: '10px' }}>
        <div className="men-two-options-grid">

          {/* Option A: Verified Tailor */}
          <div className="men-option-feature-card tailor-card">
            <div className="men-option-left-content">
              <div className="men-option-badge-tag tailor">
                <MapPin size={14} /> NEARBY VERIFIED PARTNERS
              </div>

              <h3 className="men-option-heading">
                Get It Stitched with a <br />
                <span className="pink-accent">Verified Tailor Near You</span>
              </h3>

              <ul className="men-option-checklist">
                <li><Check size={16} className="check-icon" /> Choose outfit and style</li>
                <li><Check size={16} className="check-icon" /> Select fabric (ours or yours)</li>
                <li><Check size={16} className="check-icon" /> Find verified tailors near you (Google Maps)</li>
                <li><Check size={16} className="check-icon" /> Home or shop measurements</li>
                <li><Check size={16} className="check-icon" /> Transparent pricing & on-time delivery</li>
              </ul>

              <button 
                type="button" 
                onClick={() => openTailorWorkflow('suits-blazers')}
                className="men-btn-pink option-cta-btn"
              >
                Find Tailors Near You →
              </button>
            </div>

            <div className="men-option-right-img-box">
              <img 
                src={MEN_ASSETS.twoOptions.tailor} 
                alt="Get It Stitched with a Verified Tailor Near You" 
                className="men-option-img"
              />
            </div>
          </div>

          {/* Option B: Fashion Designer */}
          <div className="men-option-feature-card designer-card">
            <div className="men-option-left-content">
              <div className="men-option-badge-tag designer">
                <Sparkles size={14} /> CERTIFIED COUTURE LAB
              </div>

              <h3 className="men-option-heading">
                Create a Unique Design with <br />
                <span className="pink-accent">Our Fashion Designer</span>
              </h3>

              <ul className="men-option-checklist">
                <li><Check size={16} className="check-icon" /> Personalized design consultation</li>
                <li><Check size={16} className="check-icon" /> Share your ideas or inspiration</li>
                <li><Check size={16} className="check-icon" /> Select premium fabrics and details</li>
                <li><Check size={16} className="check-icon" /> Get measurements and fittings</li>
                <li><Check size={16} className="check-icon" /> Review design, pricing and delivery time</li>
              </ul>

              <button 
                type="button" 
                onClick={() => openDesignerWorkflow('custom-design')}
                className="men-btn-pink option-cta-btn"
              >
                Talk to a Fashion Designer →
              </button>
            </div>

            <div className="men-option-right-img-box">
              <img 
                src={MEN_ASSETS.twoOptions.designer} 
                alt="Create a Unique Design with Our Fashion Designer" 
                className="men-option-img"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: POPULAR STYLES FOR EVERY OCCASION (8 CARDS CAROUSEL)       */}
      {/* ===================================================================== */}
      <section className="men-section-container" style={{ paddingTop: '20px' }}>
        <div className="men-section-header-row">
          <div>
            <span className="men-eyebrow">TRENDING MEN'S STYLES</span>
            <h2 className="men-section-title">Popular Styles for Every Occasion</h2>
            <p className="men-section-sub">Explore handpicked outfit inspirations and get them stitched to your measurements.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              onClick={() => openTailorWorkflow('suits-blazers')}
              className="men-section-link-btn"
            >
              View All Styles →
            </button>

            <div className="men-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(stylesCarouselRef, 'left', 260)} 
                className="men-nav-arrow-btn"
                aria-label="Previous styles"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(stylesCarouselRef, 'right', 260)} 
                className="men-nav-arrow-btn"
                aria-label="Next styles"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="men-styles-carousel-track" ref={stylesCarouselRef}>
          {MEN_POPULAR_STYLES.map(style => (
            <div key={style.id} className="men-popular-style-card">
              <div className="men-style-card-image-wrap">
                <img src={style.image} alt={style.name} className="men-popular-style-img" />
              </div>

              <div className="men-popular-style-body">
                <h4 className="men-style-title">{style.name}</h4>
                <div className="men-style-starting-price">
                  Starting <strong>₹{style.startingPrice.toLocaleString()}</strong>
                </div>

                <button 
                  type="button"
                  onClick={() => openTailorWorkflow(style.category, style)}
                  className="men-start-stitching-btn"
                >
                  Start Stitching →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: SUPERIOR FABRICS FOR MEN (10 SWATCHES CAROUSEL)            */}
      {/* ===================================================================== */}
      <section className="men-section-container" style={{ paddingTop: '20px' }}>
        <div className="men-section-header-row">
          <div>
            <span className="men-eyebrow">PREMIUM FABRICS FOR MEN</span>
            <h2 className="men-section-title">Superior Fabrics for a Refined Look</h2>
            <p className="men-section-sub">Choose from a wide range of high-quality fabrics for your custom outfit.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              onClick={openFabricsStudio}
              className="men-section-link-btn"
            >
              View All Fabrics →
            </button>

            <div className="men-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(fabricsCarouselRef, 'left', 220)} 
                className="men-nav-arrow-btn"
                aria-label="Previous fabrics"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(fabricsCarouselRef, 'right', 220)} 
                className="men-nav-arrow-btn"
                aria-label="Next fabrics"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="men-fabrics-carousel-track" ref={fabricsCarouselRef}>
          {MEN_FABRICS.map(fab => (
            <div 
              key={fab.id} 
              className="men-fabric-swatch-card"
              onClick={openFabricsStudio}
            >
              <div className="men-fabric-swatch-img-box">
                <img src={fab.image} alt={fab.name} className="men-fabric-swatch-img" />
              </div>
              <div className="men-fabric-swatch-name">{fab.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: HOW IT WORKS (6 STEPS - FROM DESIGN TO PERFECT FIT)        */}
      {/* ===================================================================== */}
      <section className="men-section-container" style={{ paddingTop: '20px' }}>
        <div className="men-section-header-center">
          <span className="men-eyebrow">HOW IT WORKS</span>
          <h2 className="men-section-title">From Design to Perfect Fit</h2>
          <p className="men-section-sub">A simple and transparent process for your custom outfit.</p>
        </div>

        <div className="men-process-flow-row">
          {MEN_HOW_IT_WORKS_STEPS.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="men-process-node">
                <div className="men-process-circle">
                  <span className="node-num">{step.num}</span>
                  {step.num === '1' && <Scissors size={20} />}
                  {step.num === '2' && <Layers size={20} />}
                  {step.num === '3' && <Ruler size={20} />}
                  {step.num === '4' && <ShieldCheck size={20} />}
                  {step.num === '5' && <Award size={20} />}
                  {step.num === '6' && <Truck size={20} />}
                </div>
                <h4 className="men-process-title">{step.title}</h4>
                <p className="men-process-desc">{step.desc}</p>
              </div>

              {idx < MEN_HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="men-process-arrow">
                  <ArrowRight size={16} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: LOOK YOUR BEST, ALWAYS (6 CARDS ROW + INNER IMAGE SLIDER)  */}
      {/* ===================================================================== */}
      <section 
        className="men-section-container men-inspiration-section" 
        style={{ paddingTop: '30px' }}
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        <div className="men-section-header-row">
          <div>
            <span className="men-eyebrow">MEN'S STYLE INSPIRATION</span>
            <h2 className="men-section-title">Look Your Best, Always</h2>
            <p className="men-section-sub">From everyday essentials to grand celebrations - get inspired by our latest men's styles.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button 
              type="button" 
              onClick={() => openTailorWorkflow('suits-blazers')}
              className="men-section-link-btn"
            >
              View All Styles →
            </button>

            <div className="men-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(inspirationContainerRef, 'left', 260)} 
                className="men-nav-arrow-btn"
                aria-label="Previous Inspiration"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(inspirationContainerRef, 'right', 260)} 
                className="men-nav-arrow-btn"
                aria-label="Next Inspiration"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Cards Row: Each card has its own auto-sliding/crossfading images inside */}
        <div 
          className="men-style-inspiration-row"
          ref={inspirationContainerRef}
        >
          {MEN_INSPIRATION_SLIDES.map((slide) => {
            const isAlt = cardActiveImageMap[slide.id] === 1;
            return (
              <div 
                key={slide.id} 
                className="men-style-card"
                onMouseEnter={() => setCardActiveImageMap(prev => ({ ...prev, [slide.id]: 1 }))}
                onMouseLeave={() => setCardActiveImageMap(prev => ({ ...prev, [slide.id]: 0 }))}
              >
                <div className="men-style-card-image-box">
                  <img 
                    src={isAlt ? slide.sideImage : slide.mainImage} 
                    alt={slide.title} 
                    className="men-style-card-bg-img" 
                  />
                  {/* Micro indicator dots inside the card */}
                  <div className="men-card-inner-indicators">
                    <span className={`inner-dot ${!isAlt ? 'active' : ''}`} />
                    <span className={`inner-dot ${isAlt ? 'active' : ''}`} />
                  </div>
                </div>

                <div className="men-style-card-bottom-overlay">
                  <h3 className="men-style-card-title">{slide.title}</h3>
                  <p className="men-style-card-desc">{slide.desc}</p>
                  <button 
                    type="button" 
                    onClick={() => openTailorWorkflow(slide.category, slide)}
                    className="men-style-card-cta-btn"
                  >
                    Start Stitching →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 8: CUSTOMER REVIEWS (TRUSTED BY THOUSANDS)                    */}
      {/* ===================================================================== */}
      <section className="men-section-container" style={{ paddingTop: '20px' }}>
        <div className="men-section-header-row">
          <div>
            <span className="men-eyebrow">WHAT OUR CUSTOMERS SAY</span>
            <h2 className="men-section-title">Trusted by Thousands</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button" 
              onClick={() => setAllReviewsModalOpen(true)}
              className="men-section-link-btn"
            >
              View More Reviews →
            </button>

            <div className="men-carousel-nav-arrows">
              <button 
                type="button" 
                onClick={() => scrollSection(reviewsCarouselRef, 'left', 320)} 
                className="men-nav-arrow-btn"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollSection(reviewsCarouselRef, 'right', 320)} 
                className="men-nav-arrow-btn"
                aria-label="Next reviews"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="men-reviews-track" ref={reviewsCarouselRef}>
          {MEN_REVIEWS.map(rev => (
            <div key={rev.id} className="men-review-card">
              <div className="men-review-top-row">
                <img src={rev.avatar} alt={rev.author} className="men-review-avatar" />
                <div>
                  <div className="men-review-author-name">{rev.author}</div>
                  <div className="men-review-locality">{rev.location}</div>
                </div>
                <div className="men-review-stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>

              <p className="men-review-quote">"{rev.text}"</p>

              <div className="men-review-footer">
                <span className="men-review-order-tag">{rev.orderType}</span>
                <span className="men-review-verified"><ShieldCheck size={13} /> Verified Stitching</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 9: BOTTOM PROMOTIONAL BANNER                                  */}
      {/* ===================================================================== */}
      <section className="men-section-container" style={{ paddingTop: '20px', paddingBottom: '70px' }}>
        <div className="men-bottom-banner-card">
          <img 
            src={MEN_ASSETS.bottomBanner} 
            alt="Every Occasion A Perfect Outfit" 
            className="men-bottom-banner-bg"
          />

          <div className="men-bottom-banner-content">
            <div className="men-bottom-banner-text">
              <h2 className="men-bottom-banner-title">
                Every Occasion <br />
                <span className="pink-line">A Perfect Outfit</span>
              </h2>
              <p className="men-bottom-banner-desc">
                From daily wear to weddings, get custom stitched outfits with premium fabrics and expert tailors.
              </p>
            </div>

            <div className="men-bottom-banner-buttons">
              <button 
                type="button" 
                onClick={() => openTailorWorkflow('suits-blazers')}
                className="men-btn-pink banner-btn"
              >
                Find a Tailor Near You →
              </button>

              <button 
                type="button" 
                onClick={() => openDesignerWorkflow('custom-design')}
                className="men-btn-outline banner-btn"
              >
                Design with a Fashion Designer →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* FABRIC INSPECTOR MODAL                                                */}
      {/* ===================================================================== */}
      {activeFabricModal && (
        <div className="men-modal-backdrop" onClick={() => setActiveFabricModal(null)}>
          <div className="men-modal-dialog" style={{ maxWidth: '620px' }} onClick={e => e.stopPropagation()}>
            <div className="men-modal-header">
              <h3 className="men-modal-title">{activeFabricModal.name} Fabric Details</h3>
              <button className="men-modal-close-btn" onClick={() => setActiveFabricModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="men-modal-body" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <img 
                src={activeFabricModal.image} 
                alt={activeFabricModal.name} 
                style={{ width: '180px', height: '180px', borderRadius: '14px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <span className="men-eyebrow">{activeFabricModal.type}</span>
                <h4 style={{ fontSize: '1.4rem', color: '#071B49', margin: '4px 0 8px 0' }}>{activeFabricModal.name}</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FF008A', marginBottom: '8px' }}>
                  ₹{activeFabricModal.pricePerMeter} / meter
                </div>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                  {activeFabricModal.desc}
                </p>
                <div style={{ marginTop: '12px', fontSize: '0.82rem', color: '#071B49' }}>
                  <strong>Best Tailored For:</strong> {activeFabricModal.bestFor}
                </div>
              </div>
            </div>

            <div className="men-modal-footer">
              <button 
                type="button" 
                onClick={() => {
                  const fab = activeFabricModal;
                  setActiveFabricModal(null);
                  openTailorWorkflow('suits-blazers', null, fab);
                }}
                className="men-btn-pink"
              >
                Use This Fabric in Custom Stitching →
              </button>
              <button 
                type="button" 
                onClick={() => setActiveFabricModal(null)}
                className="men-btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ALL FABRICS BROWSER MODAL (10 LUXURY SWATCHES)                        */}
      {/* ===================================================================== */}
      {allFabricsModalOpen && (
        <div className="men-modal-backdrop" onClick={() => setAllFabricsModalOpen(false)}>
          <div className="men-modal-dialog" style={{ maxWidth: '960px' }} onClick={e => e.stopPropagation()}>
            <div className="men-modal-header">
              <div>
                <h3 className="men-modal-title">All Premium Men's Fabrics (10 Luxury Materials)</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Hand-selected suitings, shirting cottons, natural linens, and celebratory silks.
                </p>
              </div>
              <button className="men-modal-close-btn" onClick={() => setAllFabricsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="men-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '18px' }}>
                {MEN_FABRICS.map(fab => (
                  <div 
                    key={fab.id} 
                    className="men-fabric-swatch-card" 
                    style={{ minWidth: 'unset', width: '100%', padding: '10px', textAlign: 'left' }}
                    onClick={() => {
                      setAllFabricsModalOpen(false);
                      setActiveFabricModal(fab);
                    }}
                  >
                    <div className="men-fabric-swatch-img-box" style={{ height: '110px' }}>
                      <img src={fab.image} alt={fab.name} className="men-fabric-swatch-img" />
                    </div>
                    <div style={{ padding: '6px 4px 4px 4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="men-fabric-swatch-name" style={{ fontSize: '0.95rem' }}>{fab.name}</span>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FF008A' }}>₹{fab.pricePerMeter}/m</span>
                      </div>
                      <span className="men-eyebrow" style={{ fontSize: '0.68rem', margin: '2px 0 6px 0', display: 'block' }}>{fab.type}</span>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 10px 0', lineHeight: 1.35 }}>
                        {fab.desc.substring(0, 75)}...
                      </p>
                      <button 
                        type="button" 
                        className="men-btn-pink" 
                        style={{ width: '100%', fontSize: '0.78rem', padding: '7px 10px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setAllFabricsModalOpen(false);
                          openTailorWorkflow('suits-blazers', null, fab);
                        }}
                      >
                        Stitch with this Fabric →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ALL CATEGORIES BROWSER MODAL                                          */}
      {/* ===================================================================== */}
      {allCategoriesModalOpen && (
        <div className="men-modal-backdrop" onClick={() => setAllCategoriesModalOpen(false)}>
          <div className="men-modal-dialog" style={{ maxWidth: '840px' }} onClick={e => e.stopPropagation()}>
            <div className="men-modal-header">
              <h3 className="men-modal-title">All Men's Stitching Categories</h3>
              <button className="men-modal-close-btn" onClick={() => setAllCategoriesModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="men-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                {MEN_CATEGORIES.map(cat => (
                  <div 
                    key={cat.id} 
                    className="men-cat-card"
                    style={{ minWidth: 'unset', width: '100%' }}
                    onClick={() => {
                      setAllCategoriesModalOpen(false);
                      if (cat.isCustom) {
                        openDesignerWorkflow(cat.id);
                      } else {
                        openTailorWorkflow(cat.id);
                      }
                    }}
                  >
                    <div className="men-cat-img-box">
                      <img src={cat.image} alt={cat.title} className="men-cat-img" />
                    </div>
                    <h3 className="men-cat-title">{cat.title}</h3>
                    <p className="men-cat-sub">{cat.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ALL STYLES BROWSER MODAL                                              */}
      {/* ===================================================================== */}
      {allStylesModalOpen && (
        <div className="men-modal-backdrop" onClick={() => setAllStylesModalOpen(false)}>
          <div className="men-modal-dialog" style={{ maxWidth: '900px' }} onClick={e => e.stopPropagation()}>
            <div className="men-modal-header">
              <h3 className="men-modal-title">All Trending Men's Styles</h3>
              <button className="men-modal-close-btn" onClick={() => setAllStylesModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="men-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '18px' }}>
                {MEN_POPULAR_STYLES.map(style => (
                  <div key={style.id} className="men-popular-style-card" style={{ minWidth: 'unset', flex: 'unset' }}>
                    <div className="men-style-card-image-wrap">
                      <img src={style.image} alt={style.name} className="men-popular-style-img" />
                    </div>
                    <div className="men-popular-style-body">
                      <h4 className="men-style-title">{style.name}</h4>
                      <div className="men-style-starting-price">Starting <strong>₹{style.startingPrice.toLocaleString()}</strong></div>
                      <button 
                        type="button"
                        onClick={() => {
                          setAllStylesModalOpen(false);
                          openTailorWorkflow(style.category, style);
                        }}
                        className="men-start-stitching-btn"
                      >
                        Start Stitching →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ALL REVIEWS MODAL                                                     */}
      {/* ===================================================================== */}
      {allReviewsModalOpen && (
        <div className="men-modal-backdrop" onClick={() => setAllReviewsModalOpen(false)}>
          <div className="men-modal-dialog" style={{ maxWidth: '700px' }} onClick={e => e.stopPropagation()}>
            <div className="men-modal-header">
              <h3 className="men-modal-title">Verified Customer Reviews</h3>
              <button className="men-modal-close-btn" onClick={() => setAllReviewsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="men-modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {MEN_REVIEWS.map(rev => (
                  <div key={rev.id} className="men-review-card" style={{ minWidth: 'unset', width: '100%' }}>
                    <div className="men-review-top-row">
                      <img src={rev.avatar} alt={rev.author} className="men-review-avatar" />
                      <div>
                        <div className="men-review-author-name">{rev.author}</div>
                        <div className="men-review-locality">{rev.location}</div>
                      </div>
                      <div className="men-review-stars">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>
                    <p className="men-review-quote">"{rev.text}"</p>
                    <div className="men-review-footer">
                      <span className="men-review-order-tag">{rev.orderType}</span>
                      <span className="men-review-verified"><ShieldCheck size={13} /> Verified Stitching</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* WORKFLOW MODALS                                                       */}
      {/* ===================================================================== */}
      <MenTailorWorkflowModal
        isOpen={tailorWorkflowOpen}
        onClose={() => setTailorWorkflowOpen(false)}
        initialCategory={selectedWorkflowCategory}
        initialStyle={selectedWorkflowStyle}
        initialFabric={selectedWorkflowFabric}
        currentUser={currentUser}
        onLoginRequired={onLoginRequired}
        theme={theme}
        showToast={showToast}
      />

      <MenDesignerWorkflowModal
        isOpen={designerWorkflowOpen}
        onClose={() => setDesignerWorkflowOpen(false)}
        initialCategory={selectedWorkflowCategory}
        currentUser={currentUser}
        onLoginRequired={onLoginRequired}
        theme={theme}
        showToast={showToast}
      />

    </div>
  );
}
