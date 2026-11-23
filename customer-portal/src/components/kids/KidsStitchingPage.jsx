import React, { useState, useRef } from 'react';
import { 
  Scissors, Sparkles, Layers, Ruler, FileCheck, Truck,
  ChevronLeft, ChevronRight, ArrowRight, Check, Star, 
  Smile, Gem, Palette, Tag, Heart, X, Shield, Phone, Calendar, Clock, Info
} from 'lucide-react';
import { 
  KIDS_ASSETS,
  KIDS_CATEGORIES,
  KIDS_FABRICS,
  KIDS_AGE_GROUPS,
  KIDS_HOW_IT_WORKS,
  KIDS_REVIEWS,
  KIDS_BOTTOM_BENEFITS
} from '../../utils/kidsStitchingStore';
import './KidsStitchingPage.css';

export default function KidsStitchingPage({
  currentUser,
  theme = 'light',
  onSelectCategory = () => {},
  onSelectAgeGroup = () => {},
  onStartTailorWorkflow = () => {},
  onStartDesignerWorkflow = () => {},
  onViewAllFabrics = () => {},
  showToast = () => {}
}) {
  // Fabric Carousel Ref & State
  const fabricTrackRef = useRef(null);
  const [selectedFabricModal, setSelectedFabricModal] = useState(null);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [reviewCategory, setReviewCategory] = useState('all');
  const [allFabricsModalOpen, setAllFabricsModalOpen] = useState(false);
  const [howItWorksMode, setHowItWorksMode] = useState('tailor'); // 'tailor' | 'designer'

  const scrollFabrics = (direction) => {
    if (!fabricTrackRef.current) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    fabricTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    if (catId === 'custom-design') {
      onStartDesignerWorkflow({ category: catId });
    } else {
      onSelectCategory(catId);
    }
  };

  const filteredReviews = reviewCategory === 'all' 
    ? KIDS_REVIEWS 
    : KIDS_REVIEWS.filter(r => r.category === reviewCategory);

  return (
    <div className={`kids-page-wrapper ${theme === 'dark' ? 'dark' : ''}`}>

      {/* ===================================================================== */}
      {/* SECTION 1: HERO SECTION                                               */}
      {/* ===================================================================== */}
      <section className="kids-hero-section">
        {/* Full Ultra-Wide Hero Image spanning 100% width */}
        <div className="kids-hero-bg-container">
          <img 
            src={KIDS_ASSETS.hero} 
            alt="Perfect Outfits for Every Stage of Their Journey" 
            className="kids-hero-bg-image" 
          />
          <div className="kids-hero-bg-gradient-fade" />
        </div>

        {/* Left Hero Content overlaid on the soft left open area */}
        <div className="kids-hero-content-layer">
          <div className="kids-hero-left">
            <span className="kids-eyebrow">KIDS STITCHING & TAILORING</span>
            
            <h1 className="kids-hero-title">
              Perfect Outfits <br />
              for Every Stage <br />
              <span className="kids-hero-title-accent">of Their Journey</span>
            </h1>

            <p className="kids-hero-desc">
              From newborns to teenagers, get custom stitched outfits for every occasion. Choose your style, fabric, measurements and tailor or designer. Beautifully crafted with love and care.
            </p>

            {/* 4 Feature Badges */}
            <div className="kids-hero-features-row">
              <div className="kids-hero-feature-item">
                <div className="kids-hero-feature-icon-circle">
                  <Smile size={20} />
                </div>
                <span className="kids-hero-feature-label">All Age Groups</span>
              </div>

              <div className="kids-hero-feature-item">
                <div className="kids-hero-feature-icon-circle">
                  <Layers size={20} />
                </div>
                <span className="kids-hero-feature-label">Wide Fabric Collection</span>
              </div>

              <div className="kids-hero-feature-item">
                <div className="kids-hero-feature-icon-circle">
                  <Ruler size={20} />
                </div>
                <span className="kids-hero-feature-label">Perfect Fit & Measurements</span>
              </div>

              <div className="kids-hero-feature-item">
                <div className="kids-hero-feature-icon-circle">
                  <Scissors size={20} />
                </div>
                <span className="kids-hero-feature-label">Verified Tailors & Designers</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="kids-hero-cta-group">
              <button
                type="button"
                className="kids-btn kids-btn-primary"
                onClick={() => onStartTailorWorkflow()}
              >
                <span>Start Stitching</span>
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                className="kids-btn kids-btn-outline"
                onClick={() => onStartDesignerWorkflow()}
              >
                <span>Design with Our Fashion Designer</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: SHOP BY CATEGORY                                           */}
      {/* ===================================================================== */}
      <section className="kids-categories-section">
        <div className="kids-container">
          
          <div className="kids-section-header">
            <span className="kids-eyebrow">STITCHING CATEGORIES</span>
            <h2 className="kids-section-title">Shop by Category</h2>
            <p className="kids-section-subtitle">
              Choose the type of outfit you need or create your own unique design.
            </p>
          </div>

          <div className="kids-categories-grid">
            {KIDS_CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="kids-category-card"
                onClick={() => handleCategoryClick(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCategoryClick(cat.id);
                }}
              >
                <div className="kids-category-thumb-box">
                  <img src={cat.img} alt={cat.name} className="kids-category-thumb-img" />
                </div>
                <h3 className="kids-category-name">{cat.name}</h3>
                <span className="kids-category-arrow">→</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: TWO MAIN STITCHING OPTIONS                                 */}
      {/* ===================================================================== */}
      <section className="kids-services-section">
        <div className="kids-container">
          <div className="kids-services-grid">

            {/* Card 1: Verified Tailor Near You */}
            <div className="kids-service-banner-card kids-service-card-tailor">
              <div className="kids-service-left-col">
                <div>
                  <div className="kids-service-header-row">
                    <div className="kids-service-number-badge kids-badge-pink">1</div>
                    <h3 className="kids-service-heading">
                      Get It Stitched with a <Scissors size={14} style={{ display: 'inline', color: '#FF087A' }} /> <br />
                      Verified Tailor Near You
                    </h3>
                  </div>

                  <ul className="kids-service-check-list">
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Choose outfit and service</span>
                    </li>
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Select fabric (from us or your own)</span>
                    </li>
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Find nearby tailors</span>
                    </li>
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Schedule measurement appointment</span>
                    </li>
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Review sizing, pricing and delivery time</span>
                    </li>
                  </ul>
                </div>

                <div className="kids-service-btn-container">
                  <button
                    type="button"
                    className="kids-btn kids-btn-primary"
                    onClick={() => onStartTailorWorkflow()}
                  >
                    <span>Find Tailors Near You</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="kids-service-right-visual">
                <div className="kids-service-fade-overlay tailor-fade" />
                <img 
                  src={KIDS_ASSETS.services.tailor} 
                  alt="Get It Stitched with a Verified Tailor Near You" 
                  className="kids-service-img" 
                />
              </div>
            </div>

            {/* Card 2: StitchBeez Fashion Designer */}
            <div className="kids-service-banner-card kids-service-card-designer">
              <div className="kids-service-left-col">
                <div>
                  <div className="kids-service-header-row">
                    <div className="kids-service-number-badge kids-badge-blue">2</div>
                    <h3 className="kids-service-heading">
                      Create a Unique Outfit with <br />
                      Our Fashion Designer
                    </h3>
                  </div>

                  <ul className="kids-service-check-list">
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Personalized design consultation</span>
                    </li>
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Share your ideas or choose from designs</span>
                    </li>
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Select fabric, colors and details</span>
                    </li>
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Get measurements</span>
                    </li>
                    <li className="kids-service-check-item">
                      <Check size={16} className="kids-check-icon" />
                      <span>Review design, pricing and delivery time</span>
                    </li>
                  </ul>
                </div>

                <div className="kids-service-btn-container">
                  <button
                    type="button"
                    className="kids-btn kids-btn-primary"
                    onClick={() => onStartDesignerWorkflow()}
                  >
                    <span>Talk to a Fashion Designer</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="kids-service-right-visual">
                <div className="kids-service-fade-overlay designer-fade" />
                <img 
                  src={KIDS_ASSETS.services.designer} 
                  alt="Create a Unique Outfit with Our Fashion Designer" 
                  className="kids-service-img" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: PREMIUM FABRICS FOR KIDS                                   */}
      {/* ===================================================================== */}
      <section className="kids-fabrics-section">
        <div className="kids-container">
          
          <div className="kids-fabrics-header-row">
            <div>
              <span className="kids-eyebrow">PREMIUM FABRICS FOR KIDS</span>
              <h2 className="kids-section-title">Soft, Safe & Comfortable Fabrics</h2>
              <p className="kids-section-subtitle" style={{ margin: 0, textAlign: 'left' }}>
                High-quality, skin-friendly fabrics for your child's comfort.
              </p>
            </div>

            <button
              type="button"
              className="kids-btn kids-btn-outline kids-btn-sm"
              onClick={() => setAllFabricsModalOpen(true)}
            >
              <span>View All Fabrics</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="kids-carousel-wrapper">
            <button 
              type="button"
              className="kids-carousel-nav-btn kids-carousel-btn-prev"
              onClick={() => scrollFabrics('left')}
              aria-label="Previous Fabrics"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="kids-fabrics-track" ref={fabricTrackRef}>
              {KIDS_FABRICS.map((fabric) => (
                <div 
                  key={fabric.id} 
                  className="kids-fabric-card"
                  onClick={() => setSelectedFabricModal(fabric)}
                >
                  <div className="kids-fabric-swatch-box">
                    <img src={fabric.img} alt={fabric.name} className="kids-fabric-img" />
                  </div>
                  <span className="kids-fabric-name">{fabric.name}</span>
                </div>
              ))}
            </div>

            <button 
              type="button"
              className="kids-carousel-nav-btn kids-carousel-btn-next"
              onClick={() => scrollFabrics('right')}
              aria-label="Next Fabrics"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: ALL AGE GROUPS                                             */}
      {/* ===================================================================== */}
      <section className="kids-age-section">
        <div className="kids-container">
          
          <div className="kids-section-header">
            <span className="kids-eyebrow">ALL AGE GROUPS</span>
            <h2 className="kids-section-title">Stitching for Every Stage</h2>
            <p className="kids-section-subtitle">
              Beautiful outfits for every age, designed with care.
            </p>
          </div>

          <div className="kids-age-grid">
            {KIDS_AGE_GROUPS.map((age) => (
              <div 
                key={age.id} 
                className="kids-age-card"
                onClick={() => onSelectAgeGroup(age.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectAgeGroup(age.id);
                }}
              >
                <div className="kids-age-img-box">
                  <img src={age.img} alt={age.label} className="kids-age-img" />
                </div>
                <div className="kids-age-content">
                  <h4 className="kids-age-label">{age.label}</h4>
                  <p className="kids-age-range">{age.range}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: SIMPLE AND TRANSPARENT PROCESS (HOW IT WORKS)              */}
      {/* ===================================================================== */}
      <section className="kids-process-section">
        <div className="kids-container">
          
          <div className="kids-section-header">
            <span className="kids-eyebrow">SIMPLE AND TRANSPARENT PROCESS</span>
            <h2 className="kids-section-title">How it Works</h2>
            
            {/* Toggle between Tailor and Designer Process */}
            <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--kids-border-light)', padding: '4px', borderRadius: '30px', marginTop: '12px' }}>
              <button
                type="button"
                onClick={() => setHowItWorksMode('tailor')}
                style={{
                  padding: '6px 18px',
                  borderRadius: '24px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: howItWorksMode === 'tailor' ? '#FF087A' : 'transparent',
                  color: howItWorksMode === 'tailor' ? '#FFFFFF' : 'var(--kids-navy)',
                  transition: 'all 0.2s ease'
                }}
              >
                Tailor Stitching Process
              </button>
              <button
                type="button"
                onClick={() => setHowItWorksMode('designer')}
                style={{
                  padding: '6px 18px',
                  borderRadius: '24px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: howItWorksMode === 'designer' ? '#3B82F6' : 'transparent',
                  color: howItWorksMode === 'designer' ? '#FFFFFF' : 'var(--kids-navy)',
                  transition: 'all 0.2s ease'
                }}
              >
                Fashion Designer Process
              </button>
            </div>
          </div>

          <div className="kids-process-steps-row">
            {KIDS_HOW_IT_WORKS.map((item, idx) => (
              <div key={item.step} className="kids-process-card">
                <div className="kids-process-icon-box">
                  {item.icon === 'Scissors' && <Scissors size={22} />}
                  {item.icon === 'Layers' && <Layers size={22} />}
                  {item.icon === 'Ruler' && <Ruler size={22} />}
                  {item.icon === 'FileCheck' && <FileCheck size={22} />}
                  {item.icon === 'Sparkles' && <Sparkles size={22} />}
                  {item.icon === 'Truck' && <Truck size={22} />}
                </div>

                <h4 className="kids-process-step-title">{item.title}</h4>
                <p className="kids-process-step-sub">
                  {howItWorksMode === 'tailor' ? item.tailorDetail : item.designerDetail}
                </p>

                {idx < KIDS_HOW_IT_WORKS.length - 1 && (
                  <span className="kids-process-connector-arrow">›</span>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: LOVED BY PARENTS (REVIEWS)                                  */}
      {/* ===================================================================== */}
      <section className="kids-reviews-section">
        <div className="kids-container">
          
          <div className="kids-reviews-header-row">
            <div>
              <span className="kids-eyebrow">LOVED BY PARENTS</span>
              <h2 className="kids-section-title">Happy Parents, Happier Kids</h2>
              <p className="kids-section-subtitle" style={{ margin: 0, textAlign: 'left' }}>
                See what our customers say about our kids stitching services.
              </p>
            </div>

            <button
              type="button"
              className="kids-btn kids-btn-outline kids-btn-sm"
              onClick={() => setReviewsModalOpen(true)}
            >
              <span>View More Reviews</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="kids-reviews-grid">
            {KIDS_REVIEWS.map((rev) => (
              <div key={rev.id} className="kids-review-card">
                <img 
                  src={rev.avatar} 
                  alt={rev.author} 
                  className="kids-review-child-photo" 
                />

                <div className="kids-review-content">
                  <div className="kids-stars-row">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" />
                    ))}
                  </div>

                  <p className="kids-review-text">"{rev.text}"</p>

                  <div className="kids-review-author-meta">
                    <strong>{rev.author}</strong> • {rev.city}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 8: FINAL CTA BANNER                                           */}
      {/* ===================================================================== */}
      <section className="kids-final-cta-section">
        <div className="kids-container">
          <div className="kids-final-cta-container">
            
            {/* Left Image: Full scene with fabrics, clothes rack, plant & threads */}
            <div className="kids-final-cta-left-img">
              <img 
                src={KIDS_ASSETS.banners.left} 
                alt="Your Fabric or Ours - Kids Stitched Outfits" 
              />
              <div className="kids-cta-fade-overlay left-fade" />
            </div>

            {/* Center Text */}
            <div className="kids-final-cta-center-text">
              <h2 className="kids-final-cta-title">
                Your Fabric or Ours. <br />
                Beautifully Stitched for Your Little Ones.
              </h2>
              <p className="kids-final-cta-subtitle">
                Comfortable outfits for every occasion, designed with love.
              </p>

              <div className="kids-final-cta-buttons">
                <button
                  type="button"
                  className="kids-btn kids-btn-primary"
                  onClick={() => onStartTailorWorkflow()}
                >
                  <span>Start Stitching →</span>
                </button>

                <button
                  type="button"
                  className="kids-btn kids-btn-outline"
                  onClick={() => onStartDesignerWorkflow()}
                >
                  <span>Design with Our Fashion Designer</span>
                </button>
              </div>
            </div>

            {/* Right Image: Full scene with girl, teddy bear & Happy Kids Stylish Moments */}
            <div className="kids-final-cta-right-img">
              <div className="kids-cta-fade-overlay right-fade" />
              <img 
                src={KIDS_ASSETS.banners.right} 
                alt="Happy Kids Stylish Moments" 
              />
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 9: BOTTOM FEATURE STRIP                                       */}
      {/* ===================================================================== */}
      <div className="kids-bottom-strip">
        <div className="kids-container">
          <div className="kids-bottom-strip-grid">
            {KIDS_BOTTOM_BENEFITS.map((item) => (
              <div key={item.id} className="kids-bottom-strip-item">
                <div className="kids-bottom-strip-icon">
                  {item.icon === 'Smile' && <Smile size={18} />}
                  {item.icon === 'Gem' && <Gem size={18} />}
                  {item.icon === 'Palette' && <Palette size={18} />}
                  {item.icon === 'Scissors' && <Scissors size={18} />}
                  {item.icon === 'Tag' && <Tag size={18} />}
                  {item.icon === 'Truck' && <Truck size={18} />}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* FABRIC DETAIL MODAL                                                   */}
      {/* ===================================================================== */}
      {selectedFabricModal && (
        <div className="kids-modal-backdrop" onClick={() => setSelectedFabricModal(null)}>
          <div className="kids-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="kids-modal-close-btn"
              onClick={() => setSelectedFabricModal(null)}
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ width: '140px', height: '140px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--kids-border)' }}>
                <img src={selectedFabricModal.img} alt={selectedFabricModal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ flex: 1, minWidth: '220px' }}>
                <span className="kids-eyebrow">STITCHBEEZ KIDS FABRIC</span>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '2px 0 6px 0', color: 'var(--kids-navy)' }}>
                  {selectedFabricModal.name}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--kids-navy-muted)', margin: '0 0 10px 0' }}>
                  {selectedFabricModal.tagline}
                </p>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--kids-pink)' }}>
                  ₹{selectedFabricModal.pricePerMetre} <span style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)', fontWeight: 600 }}>/ metre</span>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--kids-border)', margin: '20px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', fontSize: '0.84rem' }}>
              <div>
                <strong style={{ color: 'var(--kids-navy)' }}>Softness:</strong> {selectedFabricModal.softness}
              </div>
              <div>
                <strong style={{ color: 'var(--kids-navy)' }}>Breathability:</strong> {selectedFabricModal.breathability}
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ color: 'var(--kids-navy)' }}>Recommended For:</strong> {selectedFabricModal.recommendedAge}
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ color: 'var(--kids-navy)' }}>Best Outfit Styles:</strong> {selectedFabricModal.bestFor}
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ color: 'var(--kids-navy)' }}>Care Instructions:</strong> {selectedFabricModal.care}
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="kids-btn kids-btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  const fab = selectedFabricModal;
                  setSelectedFabricModal(null);
                  onStartTailorWorkflow({ fabricId: fab.id, fabricName: fab.name });
                  showToast(`Selected ${fab.name} for kids stitching!`);
                }}
              >
                <span>Stitch with this Fabric</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="kids-btn kids-btn-outline"
                onClick={() => setSelectedFabricModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* REVIEWS MODAL                                                         */}
      {/* ===================================================================== */}
      {reviewsModalOpen && (
        <div className="kids-modal-backdrop" onClick={() => setReviewsModalOpen(false)}>
          <div className="kids-modal-card" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="kids-modal-close-btn"
              onClick={() => setReviewsModalOpen(false)}
            >
              <X size={18} />
            </button>

            <span className="kids-eyebrow">VERIFIED PARENT EXPERIENCES</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 12px 0', color: 'var(--kids-navy)' }}>
              Kids Stitching & Tailoring Reviews
            </h3>

            {/* Rating Summary Bar */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              background: '#FFF1F7', 
              padding: '12px 18px', 
              borderRadius: '12px', 
              marginBottom: '16px',
              border: '1px solid #FFD0E5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FF087A' }}>4.9</span>
                <div>
                  <div className="kids-stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#F59E0B" stroke="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Overall Fit & Stitching Score</span>
                </div>
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
                240+ Verified Kids Orders
              </div>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'frocks', label: 'Frocks & Dresses' },
                { id: 'traditional', label: 'Traditional Wear' },
                { id: 'baby', label: 'Newborn & Infant' },
                { id: 'uniforms', label: 'Uniforms' },
                { id: 'designer', label: 'Custom Couture' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setReviewCategory(tab.id)}
                  style={{
                    padding: '5px 14px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: reviewCategory === tab.id ? '#FF087A' : '#CBD5E1',
                    background: reviewCategory === tab.id ? '#FF087A' : 'transparent',
                    color: reviewCategory === tab.id ? '#FFFFFF' : '#334155',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filtered Reviews List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredReviews.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748B' }}>
                  No reviews in this category yet.
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    style={{ 
                      display: 'flex', 
                      gap: '16px', 
                      padding: '16px', 
                      borderRadius: '14px', 
                      border: '1px solid var(--kids-border)',
                      background: 'var(--kids-card-bg)'
                    }}
                  >
                    <img 
                      src={rev.avatar} 
                      alt={rev.author} 
                      style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div className="kids-stars-row">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={13} fill="#F59E0B" stroke="#F59E0B" />
                          ))}
                          <span style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: 700, marginLeft: '6px' }}>✓ Verified Order</span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--kids-navy-muted)' }}>{rev.date}</span>
                      </div>
                      <p style={{ fontSize: '0.86rem', margin: '0 0 6px 0', color: 'var(--kids-navy)', lineHeight: 1.45 }}>
                        "{rev.text}"
                      </p>
                      <div style={{ fontSize: '0.75rem', color: 'var(--kids-navy-muted)', fontWeight: 600 }}>
                        <strong style={{ color: 'var(--kids-navy)' }}>{rev.author}</strong> ({rev.city}) • {rev.childInfo} • <em>Tailor: {rev.tailorName}</em>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="kids-btn kids-btn-primary"
                onClick={() => setReviewsModalOpen(false)}
              >
                Close Reviews
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ALL FABRICS CATALOG MODAL                                             */}
      {/* ===================================================================== */}
      {allFabricsModalOpen && (
        <div className="kids-modal-backdrop" onClick={() => setAllFabricsModalOpen(false)}>
          <div className="kids-modal-card" style={{ maxWidth: '880px', maxHeight: '88vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="kids-modal-close-btn"
              onClick={() => setAllFabricsModalOpen(false)}
            >
              <X size={18} />
            </button>

            <span className="kids-eyebrow">PREMIUM FABRICS CATALOG FOR KIDS</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px 0', color: 'var(--kids-navy)' }}>
              100% Skin-Friendly Kids Fabric Collection
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--kids-navy-muted)', marginBottom: '18px' }}>
              Every fabric is lab-certified hypoallergenic, breathable, and pre-softened for delicate baby and child skin.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {KIDS_FABRICS.map((fabric) => (
                <div 
                  key={fabric.id}
                  style={{
                    border: '1px solid var(--kids-border)',
                    borderRadius: '14px',
                    padding: '12px',
                    background: 'var(--kids-card-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ height: '120px', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
                      <img src={fabric.img} alt={fabric.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--kids-navy)' }}>{fabric.name}</h4>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#FF087A' }}>₹{fabric.pricePerMetre}/m</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--kids-navy-muted)', margin: '0 0 8px 0', lineHeight: 1.35 }}>
                      {fabric.desc}
                    </p>
                    <div style={{ fontSize: '0.72rem', color: 'var(--kids-navy)', marginBottom: '8px' }}>
                      <strong>Best For:</strong> {fabric.bestFor}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button
                      type="button"
                      className="kids-btn kids-btn-primary kids-btn-sm"
                      style={{ flex: 1, padding: '6px 10px', fontSize: '0.78rem' }}
                      onClick={() => {
                        setAllFabricsModalOpen(false);
                        onStartTailorWorkflow({ fabricId: fabric.id });
                      }}
                    >
                      Stitch with this Fabric
                    </button>
                    <button
                      type="button"
                      className="kids-btn kids-btn-outline kids-btn-sm"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      onClick={() => {
                        setSelectedFabricModal(fabric);
                      }}
                    >
                      Specs
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button
                type="button"
                className="kids-btn kids-btn-outline"
                onClick={() => setAllFabricsModalOpen(false)}
              >
                Close Catalog
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
