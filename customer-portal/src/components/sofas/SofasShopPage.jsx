import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingCart, ArrowRight, Check, Star, 
  ChevronLeft, ChevronRight, X, Sparkles, Sliders,
  Upload, Scissors, Compass, ShieldCheck, MapPin,
  Ruler, Eye, Award, HelpCircle, Layers, Truck,
  FileText, Lightbulb, Armchair, Palette
} from 'lucide-react';
import './SofasShopPage.css';
import { 
  SOFA_CATEGORIES, 
  ALL_SOFA_PRODUCTS, 
  SOFA_FABRICS, 
  SOFA_REVIEWS,
  SOFA_SPECIALISTS,
  addSofaToCart,
  toggleSofaWishlist,
  getSofaWishlist
} from '../../utils/sofasStore';

export const sofaAssets = {
  hero: "/assets/sofas/HERO.png",
  categories: {
    sofaSets: "/assets/sofas/cat_sofa_sets.png",
    recliners: "/assets/sofas/cat_recliners.png",
    sofaCumBeds: "/assets/sofas/cat_sofa_cum_beds.png",
    accentChairs: "/assets/sofas/cat_accent_chairs.png",
    poufsOttomans: "/assets/sofas/cat_poufs_ottomans.png",
    diningChairs: "/assets/sofas/cat_dining_chairs.png",
    customDesign: "/assets/sofas/cat_custom_design.png"
  },
  products: {
    modern3Seater: "/assets/sofas/prod_modern_3_seater.png",
    lShapeSectional: "/assets/sofas/prod_lshape_sectional.png",
    recliner: "/assets/sofas/prod_recliner.png",
    sofaCumBed: "/assets/sofas/prod_sofa_cum_bed.png",
    premiumFabricSofa: "/assets/sofas/prod_premium_fabric_sofa.png",
    accentChair: "/assets/sofas/prod_accent_chair.png"
  },
  customStudio: {
    left: "/assets/sofas/studio_dream_sofa_left.png",
    right: "/assets/sofas/studio_dream_sofa_right.png"
  },
  howItWorks: "/assets/sofas/how_it_works.png",
  lifestyleBanner: "/assets/sofas/lifestyle_banner.png"
};

export default function SofasShopPage({
  currentUser,
  theme = 'light',
  onAddToCart,
  onDirectCheckout,
  onLoginRequired,
  onNavigateCategory,
  onNavigateProduct,
  onNavigateCustomize
}) {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [activeFabricModal, setActiveFabricModal] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedColorMap, setSelectedColorMap] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [swatchModalOpen, setSwatchModalOpen] = useState(false);
  const [swatchForm, setSwatchForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    preferredDate: '',
    selectedFabrics: ['Linen', 'Velvet', 'Leatherette']
  });
  const [swatchSuccess, setSwatchSuccess] = useState(false);

  const fabricCarouselRef = useRef(null);

  // Sync wishlist on mount and changes
  useEffect(() => {
    setWishlist(getSofaWishlist());
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleWishlist = (e, productId) => {
    e.stopPropagation();
    const updated = toggleSofaWishlist(productId);
    setWishlist(updated);
    const inWish = updated.includes(productId);
    showToast(inWish ? "Added to your sofa wishlist ♡" : "Removed from your sofa wishlist");
  };

  const handleColorSelect = (productId, colorName) => {
    setSelectedColorMap(prev => ({
      ...prev,
      [productId]: colorName
    }));
  };

  const handleAddToCartClick = (e, product) => {
    e.stopPropagation();
    const selectedColor = selectedColorMap[product.id] || product.defaultColor;
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor: selectedColor,
      selectedSize: product.defaultSize,
      category: product.category,
      itemType: 'product',
      quantity: 1
    };

    addSofaToCart(item);
    if (onAddToCart) onAddToCart(item);
    showToast(`Added "${product.name}" (${selectedColor}) to cart!`);
  };

  const handleProductCardClick = (product) => {
    if (onNavigateProduct) {
      onNavigateProduct(product.id);
    } else {
      navigate(`/sofas/product/${product.id}`);
    }
  };

  const handleCategoryClick = (category) => {
    if (category.isCustom) {
      if (onNavigateCustomize) onNavigateCustomize();
      else navigate('/sofas/customize');
    } else {
      if (onNavigateCategory) onNavigateCategory(category.id);
      else navigate(`/sofas/category/${category.id}`);
    }
  };

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollFabrics = (direction) => {
    if (fabricCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      fabricCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleBookSwatchVisit = (e) => {
    e.preventDefault();
    if (!swatchForm.phone || !swatchForm.address) {
      showToast("Please provide your phone number and delivery address.");
      return;
    }
    setSwatchSuccess(true);
    setTimeout(() => {
      setSwatchModalOpen(false);
      setSwatchSuccess(false);
      showToast("Doorstep Swatch Kit Booked! A master upholsterer will contact you.");
    }, 2000);
  };

  return (
    <div className={`sofa-shop-page-root ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="sofa-floating-toast animate-slide-up">
          <Sparkles size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================================================================ */}
      {/* 1. HERO SECTION                                                  */}
      {/* ================================================================ */}
      <section className="sofa-hero-section">
        <div 
          className="sofa-hero-bg-container"
          style={{ backgroundImage: `url(${sofaAssets.hero})` }}
        >
          {/* Smooth left gradient overlay to guarantee text readability */}
          <div className="sofa-hero-gradient-overlay" />

          {/* Script watermark top right */}
          <div className="sofa-hero-script-tag">
            Your Comfort Our Craft ♡
          </div>

          <div className="sofa-hero-content-wrapper">
            <div className="sofa-hero-badge-eyebrow">
              <span className="eyebrow-text">STITCHBEEZ SOFAS & UPHOLSTERY</span>
            </div>

            <h1 className="sofa-hero-headline">
              <span className="headline-dark">Sofas Designed</span>
              <br />
              <span className="headline-rust">for Your Space</span>
            </h1>

            <p className="sofa-hero-subtext">
              Premium custom and ready-made sofas, recliners and upholstered furniture crafted with quality materials and expert stitching.
            </p>

            {/* 3 Highlight Badges */}
            <div className="sofa-hero-features-row">
              <div className="sofa-hero-feature-item">
                <div className="sofa-feature-icon-box">
                  {/* Diamond Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 3H18L22 9L12 21L2 9L6 3Z" stroke="#E11D74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 21L8 9L12 3L16 9L12 21Z" stroke="#E11D74" strokeWidth="1.5"/>
                    <path d="M2 9H22" stroke="#E11D74" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="sofa-feature-text">
                  <span className="feat-title">Premium</span>
                  <span className="feat-sub">Materials</span>
                </div>
              </div>

              <div className="sofa-hero-feature-item">
                <div className="sofa-feature-icon-box">
                  {/* Custom Designs Pencil/Ruler Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="#E11D74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 5l4 4" stroke="#E11D74" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="sofa-feature-text">
                  <span className="feat-title">Custom</span>
                  <span className="feat-sub">Designs</span>
                </div>
              </div>

              <div className="sofa-hero-feature-item">
                <div className="sofa-feature-icon-box">
                  {/* Skilled Artisans Star/Badge Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#E11D74" strokeWidth="2"/>
                    <path d="M12 7l1.5 3.5 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5L12 7z" fill="#E11D74" fillOpacity="0.2" stroke="#E11D74" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="sofa-feature-text">
                  <span className="feat-title">Skilled</span>
                  <span className="feat-sub">Artisans</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sofa-hero-cta-group">
              <button 
                type="button"
                className="sofa-btn-primary"
                onClick={() => handleScrollToSection('featured-sofas-section')}
              >
                <span>Shop Ready Sofas</span>
                <ArrowRight size={18} />
              </button>
              
              <button 
                type="button"
                className="sofa-btn-secondary"
                onClick={() => {
                  if (onNavigateCustomize) onNavigateCustomize();
                  else navigate('/sofas/customize');
                }}
              >
                Create Custom Sofa
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. SHOP BY CATEGORY                                              */}
      {/* ================================================================ */}
      <section className="sofa-category-section" id="sofa-categories-section">
        <div className="sofa-section-header-center">
          <span className="sofa-section-eyebrow">EXPLORE COLLECTION</span>
          <h2 className="sofa-section-title">Shop by Category</h2>
          <p className="sofa-section-subtitle">Find the perfect sofa or create your own custom design.</p>
        </div>

        <div className="sofa-categories-grid">
          {SOFA_CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className={`sofa-category-card ${cat.isCustom ? 'custom-card-highlight' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="sofa-cat-img-wrapper">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="sofa-cat-img"
                  loading="lazy"
                />
              </div>
              <div className="sofa-cat-info">
                <h3 className="sofa-cat-name">{cat.name}</h3>
                <p className="sofa-cat-desc">{cat.desc}</p>
                <div className="sofa-cat-action">
                  <span>{cat.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. FEATURED COLLECTION                                           */}
      {/* ================================================================ */}
      <section className="sofa-featured-section" id="featured-sofas-section">
        <div className="sofa-featured-header-row">
          <div className="header-left">
            <span className="sofa-section-eyebrow">FEATURED COLLECTION</span>
            <h2 className="sofa-section-title">Premium Sofas, Ready for Your Home</h2>
            <p className="sofa-section-subtitle">Explore our handcrafted sofas with premium fabrics and fine detailing.</p>
          </div>
          <div className="header-right">
            <button 
              type="button" 
              className="sofa-view-all-link"
              onClick={() => {
                if (onNavigateCategory) onNavigateCategory('all');
                else navigate('/sofas/products');
              }}
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="sofa-products-grid">
          {ALL_SOFA_PRODUCTS.map((product) => {
            const inWishlist = wishlist.includes(product.id);
            const activeColorName = selectedColorMap[product.id] || product.defaultColor;

            return (
              <div 
                key={product.id} 
                className="sofa-product-card"
                onClick={() => handleProductCardClick(product)}
              >
                <div className="sofa-product-img-box">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="sofa-prod-img" 
                    loading="lazy"
                  />
                  {/* Wishlist Heart */}
                  <button 
                    type="button"
                    className={`sofa-wishlist-heart-btn ${inWishlist ? 'active' : ''}`}
                    onClick={(e) => handleToggleWishlist(e, product.id)}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart 
                      size={18} 
                      fill={inWishlist ? "#E11D74" : "none"} 
                      color={inWishlist ? "#E11D74" : "#64748B"} 
                    />
                  </button>
                </div>

                <div className="sofa-product-details">
                  <h4 className="sofa-prod-title">{product.name}</h4>
                  
                  <div className="sofa-prod-price-row">
                    <span className="sofa-prod-price">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Swatches and Add to Cart Row */}
                  <div className="sofa-prod-actions-row">
                    <div className="sofa-color-swatches" onClick={(e) => e.stopPropagation()}>
                      {product.colors.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`color-swatch-dot ${activeColorName === c.name ? 'selected' : ''}`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                          onClick={() => handleColorSelect(product.id, c.name)}
                        />
                      ))}
                    </div>

                    <button 
                      type="button" 
                      className="sofa-cart-icon-btn"
                      onClick={(e) => handleAddToCartClick(e, product)}
                      title="Add to Cart"
                      aria-label="Add to Cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. CUSTOM SOFA DESIGN STUDIO                                     */}
      {/* ================================================================ */}
      <section className="sofa-custom-studio-section" id="sofa-custom-studio">
        <div className="sofa-studio-container">
          {/* Left Column: Blueprint Sketch */}
          <div className="sofa-studio-side-img left-img">
            <img 
              src={sofaAssets.customStudio.left} 
              alt="Artisan sketching sofa design" 
              className="studio-img"
              loading="lazy"
            />
            <div className="sofa-studio-left-fade-overlay" />
          </div>

          {/* Center Column: Design Your Dream Sofa */}
          <div className="sofa-studio-center-panel">
            <span className="sofa-section-eyebrow studio-eyebrow">CUSTOM SOFA DESIGN STUDIO</span>
            <h2 className="sofa-studio-title">Design Your Dream Sofa</h2>
            <p className="sofa-studio-desc">
              Choose the style, size, fabric, color, cushions and features. Our artisans will bring your design to life.
            </p>

            <button 
              type="button" 
              className="sofa-btn-primary studio-cta-btn"
              onClick={() => {
                if (onNavigateCustomize) onNavigateCustomize();
                else navigate('/sofas/customize');
              }}
            >
              <span>Start Designing</span>
              <ArrowRight size={18} />
            </button>

            {/* 5 Process Steps */}
            <div className="sofa-studio-process-row">
              <div className="studio-step-item">
                <div className="step-icon-circle">
                  <Lightbulb size={20} color="#E11D74" />
                </div>
                <span className="step-label">Upload Sketch<br />or Idea</span>
              </div>

              <div className="studio-step-item">
                <div className="step-icon-circle">
                  <Palette size={20} color="#E11D74" />
                </div>
                <span className="step-label">Choose Fabric<br />& Material</span>
              </div>

              <div className="studio-step-item">
                <div className="step-icon-circle">
                  <Armchair size={20} color="#E11D74" />
                </div>
                <span className="step-label">Set Size & Style</span>
              </div>

              <div className="studio-step-item">
                <div className="step-icon-circle">
                  <FileText size={20} color="#E11D74" />
                </div>
                <span className="step-label">Get Preview<br />& Quote</span>
              </div>

              <div className="studio-step-item">
                <div className="step-icon-circle">
                  <Truck size={20} color="#E11D74" />
                </div>
                <span className="step-label">Handcrafted<br />& Delivered</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sofa with Callouts */}
          <div className="sofa-studio-side-img right-img">
            <img 
              src={sofaAssets.customStudio.right} 
              alt="Bespoke sofa with style, fabric, size, and comfort callouts" 
              className="studio-img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. PREMIUM FABRIC OPTIONS                                        */}
      {/* ================================================================ */}
      <section className="sofa-fabrics-section" id="sofa-fabrics-section">
        <div className="sofa-section-header-left">
          <span className="sofa-section-eyebrow">PREMIUM FABRIC OPTIONS</span>
          <h2 className="sofa-section-title">Fabrics for Every Style</h2>
          <p className="sofa-section-subtitle">Wide range of high-quality fabrics to match your home and lifestyle.</p>
        </div>

        <div className="sofa-fabrics-carousel-container">
          <button 
            type="button"
            className="fabric-carousel-arrow arrow-left"
            onClick={() => scrollFabrics('left')}
            aria-label="Previous fabrics"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="sofa-fabrics-carousel" ref={fabricCarouselRef}>
            {SOFA_FABRICS.map((fabric) => (
              <div 
                key={fabric.id} 
                className="sofa-fabric-card"
                onClick={() => setActiveFabricModal(fabric)}
              >
                <div className="sofa-fabric-img-wrapper">
                  <img 
                    src={fabric.img} 
                    alt={fabric.name} 
                    className="fabric-texture-img"
                    loading="lazy"
                  />
                </div>
                <span className="sofa-fabric-name">{fabric.name}</span>
              </div>
            ))}
          </div>

          <button 
            type="button"
            className="fabric-carousel-arrow arrow-right"
            onClick={() => scrollFabrics('right')}
            aria-label="Next fabrics"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Free Doorstep Swatch Kit CTA banner */}
        <div className="sofa-swatch-banner-row">
          <div className="swatch-banner-content">
            <div className="swatch-badge">
              <Sparkles size={16} />
              <span>Complimentary Doorstep Service</span>
            </div>
            <h4>Touch & Feel Fabrics at Your Home Before Stitching</h4>
            <p>Our upholstery artisan will visit with complete physical fabric books, texture cards, and foam densities.</p>
          </div>
          <button 
            type="button" 
            className="sofa-swatch-btn"
            onClick={() => setSwatchModalOpen(true)}
          >
            Book Free Swatch Visit
          </button>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. HOW IT WORKS                                                  */}
      {/* ================================================================ */}
      <section className="sofa-how-it-works-section" id="sofa-how-it-works">
        <div className="sofa-how-it-works-container">
          {/* Left / Center content */}
          <div className="how-it-works-left-col">
            <span className="sofa-section-eyebrow">HOW IT WORKS</span>
            <h2 className="sofa-section-title">From Idea to Your Sofa</h2>
            <p className="sofa-section-subtitle">A simple and transparent process to create or buy your perfect sofa.</p>

            <div className="how-it-works-steps-row">
              {/* Step 1 */}
              <div className="how-step-item">
                <div className="how-step-icon-circle">
                  <ShoppingCart size={22} color="#E11D74" />
                </div>
                <h4 className="how-step-title">1. Choose</h4>
                <p className="how-step-desc">Pick a ready design or create a custom sofa.</p>
              </div>

              <div className="how-step-arrow">
                <ArrowRight size={20} color="#94A3B8" />
              </div>

              {/* Step 2 */}
              <div className="how-step-item">
                <div className="how-step-icon-circle">
                  <Sliders size={22} color="#E11D74" />
                </div>
                <h4 className="how-step-title">2. Customize</h4>
                <p className="how-step-desc">Select fabric, size, color and features.</p>
              </div>

              <div className="how-step-arrow">
                <ArrowRight size={20} color="#94A3B8" />
              </div>

              {/* Step 3 */}
              <div className="how-step-item">
                <div className="how-step-icon-circle">
                  <Scissors size={22} color="#E11D74" />
                </div>
                <h4 className="how-step-title">3. Crafted</h4>
                <p className="how-step-desc">Our artisans stitch your sofa.</p>
              </div>

              <div className="how-step-arrow">
                <ArrowRight size={20} color="#94A3B8" />
              </div>

              {/* Step 4 */}
              <div className="how-step-item">
                <div className="how-step-icon-circle">
                  <Truck size={22} color="#E11D74" />
                </div>
                <h4 className="how-step-title">4. Delivered</h4>
                <p className="how-step-desc">Securely packed and delivered to your home.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Craftsman Stapling Sofa with Fade Effect */}
          <div className="how-it-works-right-img">
            <div className="craftsman-img-wrapper">
              <img 
                src={sofaAssets.howItWorks} 
                alt="Artisan craftsman stapling upholstery fabric onto sofa" 
                className="craftsman-img"
                loading="lazy"
              />
              <div className="craftsman-fade-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. BOTTOM LIFESTYLE BANNER                                       */}
      {/* ================================================================ */}
      <section className="sofa-lifestyle-banner-section">
        <div 
          className="lifestyle-banner-bg"
          style={{ backgroundImage: `url(${sofaAssets.lifestyleBanner})` }}
        >
          <div className="lifestyle-banner-overlay" />

          <div className="lifestyle-banner-content">
            <h2 className="lifestyle-banner-headline">
              More Than Sofas,
              <br />
              It's a Home Feeling
            </h2>
            <p className="lifestyle-banner-subtext">
              Comfortable, stylish and handcrafted for every home.
            </p>
            <button 
              type="button"
              className="sofa-btn-primary lifestyle-btn"
              onClick={() => handleScrollToSection('featured-sofas-section')}
            >
              <span>Shop Sofas</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FABRIC DETAIL MODAL                                              */}
      {/* ================================================================ */}
      {activeFabricModal && (
        <div className="sofa-modal-overlay" onClick={() => setActiveFabricModal(null)}>
          <div className="sofa-fabric-modal animate-scale-up" onClick={e => e.stopPropagation()}>
            <button 
              type="button" 
              className="sofa-modal-close-btn"
              onClick={() => setActiveFabricModal(null)}
            >
              <X size={20} />
            </button>

            <div className="fabric-modal-grid">
              <div className="fabric-modal-img-col">
                <img src={activeFabricModal.img} alt={activeFabricModal.name} className="modal-fabric-img" />
                <span className="fabric-modal-badge">Grade-A Quality</span>
              </div>

              <div className="fabric-modal-info-col">
                <span className="sofa-section-eyebrow">FABRIC PROFILE</span>
                <h3 className="fabric-modal-title">{activeFabricModal.name} Fabric</h3>
                <p className="fabric-modal-desc">{activeFabricModal.desc}</p>

                <div className="fabric-metrics-list">
                  <div className="metric-row">
                    <span className="m-label">Softness Rating:</span>
                    <strong className="m-val">{activeFabricModal.softness}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="m-label">Breathability:</span>
                    <strong className="m-val">{activeFabricModal.breathability}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="m-label">Durability Score:</span>
                    <strong className="m-val">{activeFabricModal.durability}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="m-label">Pet Scratch Resistance:</span>
                    <strong className="m-val">{activeFabricModal.petFriendly}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="m-label">Best Suited For:</span>
                    <strong className="m-val">{activeFabricModal.bestFor}</strong>
                  </div>
                  <div className="metric-row">
                    <span className="m-label">Care Instructions:</span>
                    <strong className="m-val">{activeFabricModal.care}</strong>
                  </div>
                </div>

                <div className="fabric-modal-actions">
                  <button 
                    type="button" 
                    className="sofa-btn-primary"
                    onClick={() => {
                      setActiveFabricModal(null);
                      setSwatchModalOpen(true);
                    }}
                  >
                    Request Physical Swatch
                  </button>
                  <button 
                    type="button" 
                    className="sofa-btn-secondary"
                    onClick={() => {
                      setActiveFabricModal(null);
                      if (onNavigateCustomize) onNavigateCustomize();
                      else navigate('/sofas/customize');
                    }}
                  >
                    Design with this Fabric
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* DOORSTEP SWATCH VISIT MODAL                                      */}
      {/* ================================================================ */}
      {swatchModalOpen && (
        <div className="sofa-modal-overlay" onClick={() => setSwatchModalOpen(false)}>
          <div className="sofa-swatch-modal animate-scale-up" onClick={e => e.stopPropagation()}>
            <button 
              type="button" 
              className="sofa-modal-close-btn"
              onClick={() => setSwatchModalOpen(false)}
            >
              <X size={20} />
            </button>

            {swatchSuccess ? (
              <div className="swatch-success-view">
                <div className="success-icon-circle">
                  <Check size={36} color="#10B981" />
                </div>
                <h3>Doorstep Visit Confirmed!</h3>
                <p>Our master upholstery specialist will visit with 10 physical fabric swatch cards and foam hardness testers.</p>
              </div>
            ) : (
              <form onSubmit={handleBookSwatchVisit} className="swatch-form">
                <span className="sofa-section-eyebrow">FREE DOORSTEP VISIT</span>
                <h3 className="swatch-modal-heading">Experience Swatches In Your Living Room</h3>
                <p className="swatch-modal-sub">Compare shades directly against your wall paint, flooring, and room lighting.</p>

                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={swatchForm.name}
                    onChange={e => setSwatchForm({ ...swatchForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      value={swatchForm.phone}
                      onChange={e => setSwatchForm({ ...swatchForm, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Visit Date</label>
                    <input 
                      type="date" 
                      value={swatchForm.preferredDate}
                      onChange={e => setSwatchForm({ ...swatchForm, preferredDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Living Room / Home Address</label>
                  <textarea 
                    rows={2}
                    placeholder="Flat/House, Apartment name, Street, Landmark, Pin code" 
                    value={swatchForm.address}
                    onChange={e => setSwatchForm({ ...swatchForm, address: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Fabrics of Interest</label>
                  <div className="swatch-checkbox-grid">
                    {SOFA_FABRICS.map(f => {
                      const isSelected = swatchForm.selectedFabrics.includes(f.name);
                      return (
                        <label 
                          key={f.id} 
                          className={`swatch-chip ${isSelected ? 'selected' : ''}`}
                        >
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => {
                              const list = isSelected 
                                ? swatchForm.selectedFabrics.filter(x => x !== f.name)
                                : [...swatchForm.selectedFabrics, f.name];
                              setSwatchForm({ ...swatchForm, selectedFabrics: list });
                            }}
                          />
                          <span>{f.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button type="submit" className="sofa-btn-primary submit-swatch-btn">
                  Schedule Free Swatch Visit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
