import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, ShieldCheck, Gem, PenTool, CheckCircle2, 
  Heart, ShoppingCart, ChevronLeft, ChevronRight, 
  ArrowRight, Star, Truck, UserCheck, Tag, Eye,
  Sliders, Palette, Wrench, X, Check, Car, Phone
} from 'lucide-react';
import { 
  SEAT_SHOP_ASSETS,
  VEHICLE_CATEGORIES, 
  FEATURED_PRODUCTS, 
  PREMIUM_MATERIALS, 
  WHY_CHOOSE_BENEFITS, 
  BEFORE_AFTER_TRANSFORMATIONS, 
  CUSTOMER_REVIEWS, 
  DESIGN_STUDIO_STEPS, 
  BOTTOM_BENEFITS,
  addVehicleSeatToCart,
  toggleVehicleSeatWishlist,
  getVehicleSeatWishlist
} from '../../utils/vehicleSeatShopStore';
import './VehicleSeatShopPage.css';

function BeforeAfterTransformationCard({ trans }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let pct = (x / rect.width) * 100;
    if (pct < 3) pct = 3;
    if (pct > 97) pct = 97;
    setSliderPos(pct);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const handleWindowMouseMove = (e) => {
      updatePosition(e.clientX);
    };
    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDragging, updatePosition]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="v-transformation-card">
      <div 
        className="v-trans-slider-box"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onClick={(e) => updatePosition(e.clientX)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {/* AFTER IMAGE (Base Layer) */}
        <img 
          src={trans.after} 
          alt={`${trans.title} - After`} 
          className="v-trans-img v-trans-after-img" 
          draggable="false"
        />
        <span className="v-trans-badge v-badge-after">After</span>

        {/* BEFORE IMAGE (Clipped Layer on Top) */}
        <div 
          className="v-trans-clip-container"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <img 
            src={trans.before} 
            alt={`${trans.title} - Before`} 
            className="v-trans-img v-trans-before-img" 
            draggable="false"
          />
          <span className="v-trans-badge v-badge-before">Before</span>
        </div>

        {/* DRAGGABLE DIVIDER LINE & HANDLE */}
        <div 
          className="v-trans-divider-handle-line"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="v-trans-divider-handle" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
            <span>⇄</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VehicleSeatShopPage({
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout,
  onNavigateCustomDesign,
  onNavigateProductDetail,
  onNavigateRepairRestore,
  onNavigateCategory,
  theme = 'light',
  showToast = () => {}
}) {
  // Category filter state
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState(null);
  
  // Product card variant state: productId -> { selectedColor: string }
  const [productVariants, setProductVariants] = useState(() => {
    const initial = {};
    FEATURED_PRODUCTS.forEach(p => {
      initial[p.id] = { selectedColor: p.swatches[0]?.name || 'Default' };
    });
    return initial;
  });

  // Local wishlist state: Set of product IDs
  const [wishlistSet, setWishlistSet] = useState(new Set());

  // Material carousel ref & modal state
  const materialCarouselRef = useRef(null);
  const [selectedMaterialModal, setSelectedMaterialModal] = useState(null);

  // Active Before/After transformation index
  const [activeTransIndex, setActiveTransIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const isDraggingRef = useRef(false);

  // Customer Reviews index (for mobile/tablet carousel)
  const [reviewIndex, setReviewIndex] = useState(0);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Color Swatch Selection
  const handleSelectColor = (productId, colorName) => {
    setProductVariants(prev => ({
      ...prev,
      [productId]: { selectedColor: colorName }
    }));
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product) => {
    setWishlistSet(prev => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed "${product.name}" from your wishlist`);
      } else {
        next.add(product.id);
        showToast(`Added "${product.name}" to your wishlist ❤️`);
      }
      return next;
    });
  };

  // Add Product to Cart
  const handleAddProductToCart = (product) => {
    const currentVariant = productVariants[product.id]?.selectedColor || product.swatches[0]?.name || 'Default';
    const cartItem = {
      id: `${product.id}-${currentVariant.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      productId: product.id,
      title: product.name,
      name: product.name,
      price: product.price,
      effectivePrice: product.price,
      originalPrice: product.originalPrice,
      image: product.img,
      category: 'Vehicle Seat Covers',
      vehicleType: product.vehicleType,
      selectedColor: currentVariant,
      specs: `Custom Fit • Color: ${currentVariant} • ${product.material}`,
      itemType: 'custom'
    };

    if (onAddToCart) {
      onAddToCart(cartItem);
    }
    showToast(`Added ${product.name} (${currentVariant}) to Cart! 🛒`);
  };

  // Material Carousel Scrolling
  const handleScrollMaterials = (direction) => {
    if (materialCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      materialCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Before / After Slider Interaction
  const handleSliderMove = (clientX, rect) => {
    const x = clientX - rect.left;
    const width = rect.width;
    let percentage = (x / width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Filter products by selected vehicle category
  const filteredProducts = selectedVehicleCategory
    ? FEATURED_PRODUCTS.filter(p => p.category === selectedVehicleCategory)
    : FEATURED_PRODUCTS;

  return (
    <div className={`v-shop-page ${theme === 'dark' ? 'dark' : ''}`}>
      
      {/* ===================================================================== */}
      {/* SECTION 1: HERO SECTION                                               */}
      {/* ===================================================================== */}
      <section className="v-hero-section" id="v-hero">
        <div className="v-hero-container">
          
          {/* Left Text Content */}
          <div className="v-hero-content">
            <span className="v-hero-eyebrow">VEHICLE SEAT COVERS</span>
            
            <h1 className="v-hero-title">
              Comfort for <br />
              <span className="v-hero-title-accent">Every Journey</span>
            </h1>

            <p className="v-hero-description">
              Custom and ready-made seat covers for bikes, cars, autos, buses and all types of vehicles. Premium materials, perfect fit and expert stitching.
            </p>

            {/* 4 Feature Icons */}
            <div className="v-hero-features-grid">
              <div className="v-hero-feature-item">
                <div className="v-hero-feature-icon-box">
                  <Gem size={20} className="v-pink-icon" />
                </div>
                <span className="v-hero-feature-label">Premium Materials</span>
              </div>

              <div className="v-hero-feature-item">
                <div className="v-hero-feature-icon-box">
                  <PenTool size={20} className="v-pink-icon" />
                </div>
                <span className="v-hero-feature-label">Custom Designs</span>
              </div>

              <div className="v-hero-feature-item">
                <div className="v-hero-feature-icon-box">
                  <ShieldCheck size={20} className="v-pink-icon" />
                </div>
                <span className="v-hero-feature-label">Perfect Fit</span>
              </div>

              <div className="v-hero-feature-item">
                <div className="v-hero-feature-icon-box">
                  <Wrench size={20} className="v-pink-icon" />
                </div>
                <span className="v-hero-feature-label">Skilled Artisans</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="v-hero-cta-group">
              <button
                type="button"
                className="v-btn v-btn-primary"
                onClick={() => scrollToSection('v-featured-collection')}
              >
                <span>Shop Seat Covers</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="v-btn v-btn-secondary"
                onClick={onNavigateCustomDesign}
              >
                <span>Create Custom Design</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="v-hero-image-wrapper">
            <img 
              src={SEAT_SHOP_ASSETS.hero} 
              alt="Comfort for Every Journey - Premium Stitched Car Interior" 
              className="v-hero-main-img"
            />
            {/* Subtle soft gradient fade mask matching the screenshot transition */}
            <div className="v-hero-image-overlay-mask" />
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: SHOP BY VEHICLE TYPE                                       */}
      {/* ===================================================================== */}
      <section className="v-categories-section" id="v-vehicle-types">
        <div className="v-section-container">
          
          <div className="v-section-header-center">
            <span className="v-section-eyebrow">SHOP BY VEHICLE TYPE</span>
            <h2 className="v-section-title">Seat Covers for Every Vehicle</h2>
            <p className="v-section-subtitle">
              Choose your vehicle type and explore designs or create your own custom seat covers.
            </p>
          </div>

          {/* 7 Vehicle Categories Cards */}
          <div className="v-categories-grid">
            {VEHICLE_CATEGORIES.map((cat) => {
              const isSelected = selectedVehicleCategory === cat.id;
              return (
                <div 
                  key={cat.id} 
                  className={`v-category-card ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    if (onNavigateCategory) {
                      onNavigateCategory(cat.id);
                    } else {
                      if (isSelected) {
                        setSelectedVehicleCategory(null);
                        showToast(`Showing all seat covers`);
                      } else {
                        setSelectedVehicleCategory(cat.id);
                        showToast(`Filtered seat covers for ${cat.name}`);
                        scrollToSection('v-featured-collection');
                      }
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      if (onNavigateCategory) onNavigateCategory(cat.id);
                      else setSelectedVehicleCategory(isSelected ? null : cat.id);
                    }
                  }}
                >
                  <div className="v-category-image-box">
                    <img src={cat.img} alt={cat.name} className="v-category-img" />
                  </div>
                  <h3 className="v-category-name">{cat.name}</h3>
                  <p className="v-category-desc">{cat.desc}</p>
                  <div className="v-category-link">
                    <span>Explore</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: FEATURED COLLECTION                                        */}
      {/* ===================================================================== */}
      <section className="v-products-section" id="v-featured-collection">
        <div className="v-section-container">
          
          <div className="v-section-header-row">
            <div>
              <span className="v-section-eyebrow">FEATURED COLLECTION</span>
              <h2 className="v-section-title">Popular Seat Cover Designs</h2>
              <p className="v-section-subtitle">Stylish, durable and crafted for comfort.</p>
            </div>
            
            <div className="v-header-actions-right">
              {selectedVehicleCategory && (
                <button
                  type="button"
                  className="v-pill-reset-filter"
                  onClick={() => setSelectedVehicleCategory(null)}
                >
                  <span>All Vehicles (Clear Filter)</span>
                  <X size={14} />
                </button>
              )}
              <button 
                type="button" 
                className="v-link-view-all"
                onClick={() => {
                  if (onNavigateCategory) {
                    onNavigateCategory('all');
                  } else {
                    setSelectedVehicleCategory(null);
                    showToast("Displaying all verified seat cover styles");
                  }
                }}
              >
                <span>View All</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* 6 Products Grid */}
          <div className="v-products-grid">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistSet.has(product.id);
              const selectedColor = productVariants[product.id]?.selectedColor || product.swatches[0]?.name;

              return (
                <div key={product.id} className="v-product-card">
                  
                  {/* Top Image with Wishlist Button */}
                  <div className="v-product-image-container">
                    <button
                      type="button"
                      className={`v-wishlist-heart-btn ${isWishlisted ? 'favorited' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product);
                      }}
                      title="Save to Wishlist"
                    >
                      <Heart size={18} fill={isWishlisted ? '#FF087A' : 'none'} color={isWishlisted ? '#FF087A' : '#64748b'} />
                    </button>

                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="v-product-img"
                      onClick={() => onNavigateProductDetail(product.id)}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="v-product-body">
                    <h3 
                      className="v-product-title"
                      onClick={() => onNavigateProductDetail(product.id)}
                    >
                      {product.name}
                    </h3>
                    
                    <div className="v-product-price-row">
                      <span className="v-product-price">{product.formattedPrice}</span>
                      <span className="v-product-orig-price">₹{product.originalPrice.toLocaleString()}</span>
                    </div>

                    {/* Color Swatches and Add-to-Cart Row */}
                    <div className="v-product-bottom-row">
                      <div className="v-swatches-group">
                        {product.swatches.map((swatch) => {
                          const isSwatchActive = selectedColor === swatch.name;
                          return (
                            <button
                              key={swatch.id}
                              type="button"
                              className={`v-swatch-circle ${isSwatchActive ? 'active' : ''}`}
                              style={{ backgroundColor: swatch.hex }}
                              title={swatch.name}
                              onClick={() => handleSelectColor(product.id, swatch.name)}
                            />
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        className="v-cart-icon-btn"
                        onClick={() => handleAddProductToCart(product)}
                        title={`Add ${product.name} to Cart`}
                      >
                        <ShoppingCart size={17} />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: CUSTOM SEAT COVER STUDIO                                   */}
      {/* ===================================================================== */}
      <section className="v-custom-studio-section" id="v-custom-studio">
        <div className="v-section-container">
          
          <div className="v-custom-studio-banner">
            
            {/* Left Column: Heading, Description & Start Designing Button */}
            <div className="v-studio-left-col">
              <span className="v-studio-eyebrow">CUSTOM SEAT COVER STUDIO</span>
              <h2 className="v-studio-title">
                Design Your <br />
                Own Seat Cover
              </h2>
              <p className="v-studio-desc">
                Choose the style, material, color, stitching and features. Our artisans will bring your design to life.
              </p>
              <button
                type="button"
                className="v-btn v-btn-primary v-studio-btn"
                onClick={onNavigateCustomDesign}
              >
                <span>Start Designing</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Center Visual: Sketch to Stitched Leather Finished Seat */}
            <div className="v-studio-center-col">
              <img 
                src={SEAT_SHOP_ASSETS.customDesign.sketchToSeat} 
                alt="Design Your Own Seat Cover - Sketch to Finished Stitched Leather Seat"
                className="v-studio-sketch-img"
              />
            </div>

            {/* Right Column: 6 Process Cards (3x2 Grid) */}
            <div className="v-studio-right-col">
              <div className="v-process-cards-grid">
                {DESIGN_STUDIO_STEPS.map((step) => (
                  <div 
                    key={step.step} 
                    className="v-process-card"
                    onClick={onNavigateCustomDesign}
                  >
                    <div className="v-process-icon-box">
                      {step.step === 1 && <Sparkles size={20} className="v-pink-icon" />}
                      {step.step === 2 && <Car size={20} className="v-pink-icon" />}
                      {step.step === 3 && <Palette size={20} className="v-pink-icon" />}
                      {step.step === 4 && <ShieldCheck size={20} className="v-pink-icon" />}
                      {step.step === 5 && <Sliders size={20} className="v-pink-icon" />}
                      {step.step === 6 && <UserCheck size={20} className="v-pink-icon" />}
                    </div>
                    <span className="v-process-card-title">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: PREMIUM MATERIAL OPTIONS                                   */}
      {/* ===================================================================== */}
      <section className="v-materials-section" id="v-materials">
        <div className="v-section-container">
          
          <div className="v-section-header-row">
            <div>
              <h2 className="v-section-title">Premium Material Options</h2>
              <p className="v-section-subtitle">Wide range of high-quality fabrics to match your style and usage.</p>
            </div>
            
            <button 
              type="button" 
              className="v-btn-outlined-pink"
              onClick={() => setSelectedMaterialModal(PREMIUM_MATERIALS[0])}
            >
              <span>View All Fabrics</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Horizontal Swiping Carousel with Left/Right Buttons */}
          <div className="v-materials-carousel-wrapper">
            <button 
              type="button" 
              className="v-carousel-arrow v-arrow-left"
              onClick={() => handleScrollMaterials('left')}
              aria-label="Previous Materials"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="v-materials-track" ref={materialCarouselRef}>
              {PREMIUM_MATERIALS.map((mat) => (
                <div 
                  key={mat.id} 
                  className="v-material-card"
                  onClick={() => setSelectedMaterialModal(mat)}
                >
                  <div className="v-material-swatch-box">
                    <img src={mat.img} alt={mat.name} className="v-material-swatch-img" />
                  </div>
                  <span className="v-material-name">{mat.name}</span>
                </div>
              ))}
            </div>

            <button 
              type="button" 
              className="v-carousel-arrow v-arrow-right"
              onClick={() => handleScrollMaterials('right')}
              aria-label="Next Materials"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: WHY CHOOSE STITCHBEEZ (EXACT MATCH TO REFERENCE SCREENSHOT) */}
      {/* ===================================================================== */}
      <section className="v-why-section" id="v-why-choose-us">
        <div className="v-section-container">
          <div className="v-why-card-banner">
            
            {/* Left Column: Heading and 6 Benefit Icon Badges in Horizontal Row */}
            <div className="v-why-left-content">
              <h2 className="v-why-heading">Why Choose StitchBeez</h2>

              <div className="v-why-benefits-bar">
                {WHY_CHOOSE_BENEFITS.map((b) => (
                  <div key={b.id} className="v-why-benefit-card">
                    <div className="v-why-icon-bubble">
                      {b.id === 'benefit-fit' && <ShieldCheck size={22} className="v-pink-icon" />}
                      {b.id === 'benefit-materials' && <Gem size={22} className="v-pink-icon" />}
                      {b.id === 'benefit-custom' && <PenTool size={22} className="v-pink-icon" />}
                      {b.id === 'benefit-artisans' && <UserCheck size={22} className="v-pink-icon" />}
                      {b.id === 'benefit-pricing' && <Tag size={22} className="v-pink-icon" />}
                      {b.id === 'benefit-delivery' && <Truck size={22} className="v-pink-icon" />}
                    </div>
                    <span className="v-why-benefit-title">{b.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Seamless Blended Panoramic Car Interior with cursive Comfort In Every Ride ♡ */}
            <div className="v-why-right-visual">
              <img 
                src={SEAT_SHOP_ASSETS.whyChooseUs.bg} 
                alt="Comfort In Every Ride - StitchBeez Custom Upholstery" 
                className="v-why-car-img" 
              />
              <div className="v-why-visual-blend-mask" />
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: BEFORE & AFTER TRANSFORMATIONS (DRAGGABLE COMPARISON)      */}
      {/* ===================================================================== */}
      <section className="v-transformations-section" id="v-transformations">
        <div className="v-section-container">
          
          <div className="v-section-header-row">
            <div>
              <h2 className="v-section-title">Before & After Transformations</h2>
              <p className="v-section-subtitle">See how we bring new life and style to vehicle seats.</p>
            </div>
            
            <button 
              type="button" 
              className="v-btn-outlined-pink"
              onClick={() => {
                showToast("Showing all verified transformation builds");
                if (onNavigateRepairRestore) onNavigateRepairRestore();
              }}
            >
              <span>View More Transformations</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 5 Interactive Draggable Transformation Cards Grid */}
          <div className="v-transformations-grid">
            {BEFORE_AFTER_TRANSFORMATIONS.map((trans) => (
              <BeforeAfterTransformationCard key={trans.id} trans={trans} />
            ))}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 8: CUSTOMER REVIEWS (LOVED BY OUR CUSTOMERS)                 */}
      {/* ===================================================================== */}
      <section className="v-reviews-section" id="v-reviews">
        <div className="v-section-container">
          
          <div className="v-section-header-row">
            <div>
              <span className="v-section-eyebrow">LOVED BY OUR CUSTOMERS</span>
              <h2 className="v-section-title">Real People. Real Journeys.</h2>
              <p className="v-section-subtitle">See what our customers say about our seat covers.</p>
            </div>
            
            <button 
              type="button" 
              className="v-btn-outlined-pink"
              onClick={() => showToast("Loaded verified customer reviews")}
            >
              <span>View More Reviews</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 3 Review Cards (Arjun S., Ramesh K., Suresh T.) */}
          <div className="v-reviews-grid">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div key={rev.id} className="v-review-card">
                
                {/* Left Side: Customer Info & Quote */}
                <div className="v-review-main-col">
                  {/* Stars */}
                  <div className="v-review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="v-review-quote">"{rev.quote}"</p>

                  {/* User Profile Footer */}
                  <div className="v-review-author-row">
                    <img src={rev.avatar} alt={rev.name} className="v-review-avatar" />
                    <div>
                      <div className="v-review-author-name">{rev.name}</div>
                      <div className="v-review-author-city">{rev.city}</div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Seat Cover Photo Thumbnail */}
                <div className="v-review-media-col">
                  {rev.vehicleThumb && (
                    <img src={rev.vehicleThumb} alt={rev.vehicle} className="v-review-vehicle-thumb" />
                  )}
                  <img src={rev.seatThumb} alt={rev.name} className="v-review-seat-thumb" />
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 9: FINAL CTA BANNER                                           */}
      {/* ===================================================================== */}
      <section className="v-final-cta-section" id="v-final-cta">
        <div className="v-final-cta-banner">
          
          {/* Panoramic sunset highway vehicles background image */}
          <img 
            src={SEAT_SHOP_ASSETS.banners.comfortRoadAhead} 
            alt="Comfort for Every Road Ahead - Custom Seat Covers for All Vehicles"
            className="v-final-cta-bg-img"
          />

          <div className="v-final-cta-overlay">
            <div className="v-section-container v-final-cta-content-wrapper">
              
              <div className="v-final-cta-text">
                <h2 className="v-final-cta-title">
                  Comfort for <br />
                  Every Road Ahead
                </h2>
                <p className="v-final-cta-subtitle">Custom seat covers for all vehicles.</p>
              </div>

              <div className="v-final-cta-buttons">
                <button
                  type="button"
                  className="v-btn v-btn-primary"
                  onClick={() => scrollToSection('v-featured-collection')}
                >
                  <span>Shop Seat Covers</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  className="v-btn v-btn-light"
                  onClick={onNavigateCustomDesign}
                >
                  <span>Create Custom Design</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 10: BOTTOM BENEFITS STRIP                                     */}
      {/* ===================================================================== */}
      <div className="v-bottom-strip">
        <div className="v-section-container v-bottom-strip-container">
          {BOTTOM_BENEFITS.map((item, idx) => (
            <div key={idx} className="v-bottom-strip-item">
              <div className="v-bottom-strip-icon-box">
                {item.icon === 'Car' && <Car size={18} />}
                {item.icon === 'Gem' && <Gem size={18} />}
                {item.icon === 'PenTool' && <PenTool size={18} />}
                {item.icon === 'Wrench' && <Wrench size={18} />}
                {item.icon === 'Truck' && <Truck size={18} />}
              </div>
              <span className="v-bottom-strip-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MATERIAL SPECIFICATION MODAL                                         */}
      {/* ===================================================================== */}
      {selectedMaterialModal && (
        <div className="v-modal-overlay animate-fade-in" onClick={() => setSelectedMaterialModal(null)}>
          <div className="v-material-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="v-modal-close-btn"
              onClick={() => setSelectedMaterialModal(null)}
            >
              <X size={20} />
            </button>

            <div className="v-material-modal-grid">
              <div className="v-material-modal-image-side">
                <img 
                  src={selectedMaterialModal.img} 
                  alt={selectedMaterialModal.name} 
                  className="v-material-modal-img" 
                />
                <div className="v-material-modal-price-tag">
                  {selectedMaterialModal.priceTier}
                </div>
              </div>

              <div className="v-material-modal-info-side">
                <span className="v-section-eyebrow">AUTOMOTIVE UPHOLSTERY FABRIC</span>
                <h3 className="v-material-modal-title">{selectedMaterialModal.name}</h3>
                <p className="v-material-modal-desc">{selectedMaterialModal.desc}</p>

                <div className="v-material-specs-list">
                  <div className="v-material-spec-row">
                    <strong>Durability:</strong>
                    <span>{selectedMaterialModal.durability}</span>
                  </div>
                  <div className="v-material-spec-row">
                    <strong>Water Resistance:</strong>
                    <span>{selectedMaterialModal.waterResistance}</span>
                  </div>
                  <div className="v-material-spec-row">
                    <strong>Tactile Comfort:</strong>
                    <span>{selectedMaterialModal.comfort}</span>
                  </div>
                  <div className="v-material-spec-row">
                    <strong>Recommended Vehicles:</strong>
                    <span>{selectedMaterialModal.recommendedVehicles}</span>
                  </div>
                  <div className="v-material-spec-row">
                    <strong>Care:</strong>
                    <span>{selectedMaterialModal.care}</span>
                  </div>
                </div>

                <div className="v-material-modal-actions">
                  <button
                    type="button"
                    className="v-btn v-btn-primary"
                    onClick={() => {
                      setSelectedMaterialModal(null);
                      if (onNavigateCustomDesign) {
                        onNavigateCustomDesign();
                      }
                    }}
                  >
                    <span>Use {selectedMaterialModal.name} in Custom Design</span>
                    <ArrowRight size={16} />
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
