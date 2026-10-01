import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, ShoppingCart, ShoppingBag, Sliders, Scissors, 
  ShieldCheck, Gem, Sparkles, ChevronLeft, ChevronRight, 
  ArrowRight, X, Upload, Check, Star, MapPin, Eye,
  Package, Ruler, Info, CheckCircle2, RotateCcw, Wrench
} from 'lucide-react';
import './ShoesFootwearStudio.css';
import { 
  SHOE_CATEGORIES, 
  ALL_SHOE_PRODUCTS, 
  SHOE_MATERIALS, 
  SHOE_REVIEWS,
  getFootwearCart, 
  addFootwearToCart, 
  toggleFootwearWishlist, 
  getFootwearWishlist,
  saveCustomFootwearDesign 
} from '../../utils/shoesStore';

export default function ShoesFootwearStudio({
  currentUser,
  theme = 'light',
  setTheme,
  initialMode = 'shop', // 'shop' | 'restore'
  onSwitchMode,
  onNavigateHome,
  onNavigateCategory,
  onOpenAuthModal,
  onAddToCart,
  tailors = [],
  onBookStitching
}) {
  const isDark = theme === 'dark';

  // Mode state: 'shop' (Shop + Create Custom) or 'restore' (Repair & Restore)
  const [activeMode, setActiveMode] = useState(initialMode || 'shop');

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
  }, [initialMode]);

  // Cart & Wishlist local state synced with localStorage
  const [cart, setCart] = useState(() => getFootwearCart());
  const [wishlist, setWishlist] = useState(() => new Set(getFootwearWishlist()));
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  useEffect(() => {
    const handleStoreUpdate = () => {
      setCart(getFootwearCart());
      setWishlist(new Set(getFootwearWishlist()));
    };
    window.addEventListener('stitchbee-store-update', handleStoreUpdate);
    window.addEventListener('storage', handleStoreUpdate);
    return () => {
      window.removeEventListener('stitchbee-store-update', handleStoreUpdate);
      window.removeEventListener('storage', handleStoreUpdate);
    };
  }, []);

  // Category Filtering
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Interactive Product List (with custom color selection per card)
  const [productsList, setProductsList] = useState(ALL_SHOE_PRODUCTS);

  // Modals
  const [pdpProduct, setPdpProduct] = useState(null);
  const [selectedPdpImage, setSelectedPdpImage] = useState(null);
  const [selectedPdpColor, setSelectedPdpColor] = useState(null);
  const [selectedPdpSize, setSelectedPdpSize] = useState('UK 8');
  const [pdpQuantity, setPdpQuantity] = useState(1);

  const [selectedMaterialModal, setSelectedMaterialModal] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Material Carousel Ref
  const materialsTrackRef = useRef(null);

  const scrollMaterials = (direction) => {
    if (materialsTrackRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      materialsTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // How It Works interactive step
  const [activeHowStep, setActiveHowStep] = useState(1);
  const howStepTips = {
    1: { title: 'Explore or Envision', text: 'Select a signature silhouette from our ready-to-wear archive or begin sketching your bespoke concept.' },
    2: { title: 'Select Luxury Tannery Specs', text: 'Handpick full-grain Italian calfskin, butter-soft nappa, water-repellent suede, or heavy canvas with custom welt stitching.' },
    3: { title: 'Master Cordwainer Assembly', text: 'Every shoe is lasted on custom ergonomic wooden lasts, Goodyear welted or Blake stitched by master cobblers.' },
    4: { title: 'White-Glove Delivery', text: 'Individually buffed, conditioned, fitted with cedar shoe trees, and shipped to your doorstep in luxury packaging.' }
  };

  // =========================================================================
  // 7-STEP CUSTOM FOOTWEAR CONFIGURATOR STATE
  // =========================================================================
  const [wizardStep, setWizardStep] = useState(1);
  const [footwearType, setFootwearType] = useState('Formal Shoes');
  const [baseSilhouette, setBaseSilhouette] = useState('Oxford Brogue');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [customNotes, setCustomNotes] = useState('');
  const [customMaterial, setCustomMaterial] = useState('full-grain-leather');
  const [mainColor, setMainColor] = useState('Cognac Tan');
  const [secondaryColor, setSecondaryColor] = useState('Matching');
  const [soleColor, setSoleColor] = useState('Natural Leather Tone');
  const [customHexColor, setCustomHexColor] = useState('');
  const [soleType, setSoleType] = useState('Goodyear Welted Leather');
  const [soleThickness, setSoleThickness] = useState('Standard (15mm)');
  const [laceStyle, setLaceStyle] = useState('Round Waxed Cotton');
  const [stitchColor, setStitchColor] = useState('Contrast Hand-Stitched Amber');
  const [hardwareStyle, setHardwareStyle] = useState('Antique Brass Eyelets');
  const [personalizationInitials, setPersonalizationInitials] = useState('SB');
  const [personalizationPlacement, setPersonalizationPlacement] = useState('Insole Deboss');
  const [isCustomMeasurement, setIsCustomMeasurement] = useState(false);
  const [standardSize, setStandardSize] = useState('UK 8');
  const [footwearWidth, setFootwearWidth] = useState('Standard (D)');
  const [footLengthCm, setFootLengthCm] = useState('26.5');
  const [footWidthCm, setFootWidthCm] = useState('9.8');
  const [instepCm, setInstepCm] = useState('24.0');
  const [orthoticNotes, setOrthoticNotes] = useState('');
  const [wizardSuccessData, setWizardSuccessData] = useState(null);

  // Smooth scroll helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Handler: Add to Cart from Card
  const handleAddToCartCard = (product, e) => {
    if (e) e.stopPropagation();
    const color = product.selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    const size = product.selectedSize || 'UK 8';
    addFootwearToCart(product, color, size, 1);
    if (onAddToCart) onAddToCart(product);
    showToast(`Added "${product.name}" (${color}, ${size}) to your bag!`);
  };

  // Handler: Toggle Wishlist
  const handleToggleWishlist = (productId, e) => {
    if (e) e.stopPropagation();
    const updated = toggleFootwearWishlist(productId);
    const isNowWish = updated.includes(productId);
    showToast(isNowWish ? 'Added to your Wishlist!' : 'Removed from Wishlist.');
  };

  // Handler: Open PDP Modal
  const handleOpenPdp = (product) => {
    setPdpProduct(product);
    setSelectedPdpImage(product.img);
    setSelectedPdpColor(product.selectedColor || (product.colors && product.colors[0]?.name) || 'Default');
    setSelectedPdpSize(product.selectedSize || (product.sizes && product.sizes[0]) || 'UK 8');
    setPdpQuantity(1);
  };

  // Handler: PDP Add to Cart
  const handlePdpAddToCart = () => {
    if (!pdpProduct) return;
    addFootwearToCart(pdpProduct, selectedPdpColor, selectedPdpSize, pdpQuantity);
    if (onAddToCart) onAddToCart(pdpProduct);
    showToast(`Added ${pdpQuantity}x "${pdpProduct.name}" (${selectedPdpColor}, ${selectedPdpSize}) to your bag!`);
    setPdpProduct(null);
  };

  // Handler: PDP Buy Now
  const handlePdpBuyNow = () => {
    if (!pdpProduct) return;
    addFootwearToCart(pdpProduct, selectedPdpColor, selectedPdpSize, pdpQuantity);
    if (onAddToCart) onAddToCart(pdpProduct);
    setPdpProduct(null);
    showToast(`Order initiated for "${pdpProduct.name}"!`);
  };

  // Handler: Photo Upload for Custom Configurator
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const readPromises = files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = ev => resolve(ev.target.result);
      reader.readAsDataURL(file);
    }));

    Promise.all(readPromises).then(urls => {
      setUploadedPhotos(prev => [...prev, ...urls].slice(0, 6));
      showToast(`${files.length} design reference${files.length > 1 ? 's' : ''} uploaded!`);
    });
    e.target.value = '';
  };

  const handleRemovePhoto = (idx) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  // Handler: Submit Custom Footwear Request
  const handleSubmitCustomQuote = () => {
    const customPayload = {
      footwearType,
      baseSilhouette,
      customMaterial,
      colors: {
        main: mainColor,
        secondary: secondaryColor,
        sole: soleColor,
        customHex: customHexColor || null
      },
      soleAndHardware: {
        soleType,
        soleThickness,
        laceStyle,
        stitchColor,
        hardwareStyle,
        personalization: `${personalizationInitials} (${personalizationPlacement})`
      },
      sizing: isCustomMeasurement ? {
        type: 'Custom Anatomical Fit',
        footLengthCm,
        footWidthCm,
        instepCm,
        notes: orthoticNotes || 'None'
      } : {
        type: 'Standard Sizing',
        size: standardSize,
        width: footwearWidth
      },
      notes: customNotes,
      uploadedReferencesCount: uploadedPhotos.length,
      samplePreview: uploadedPhotos[0] || '/footwear_concept_sketch.jpg'
    };

    const saved = saveCustomFootwearDesign(customPayload);
    setWizardSuccessData(saved);
    showToast('✨ Custom footwear design request submitted to Master Cordwainer!');
  };

  // Filtered Products
  const filteredProducts = categoryFilter === 'all' 
    ? productsList 
    : productsList.filter(p => p.category === categoryFilter);

  // Total cart item count
  const cartItemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className={`sf-shoes-studio ${isDark ? 'sf-theme-dark' : 'sf-theme-light'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#1e293b',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 600,
          border: '1px solid rgba(247, 37, 133, 0.4)'
        }}>
          <Sparkles size={16} color="#f72585" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SUB-NAVIGATION BAR (Immediately below existing header) */}
      <div className="sf-subnav-bar">
        <div className="sf-container sf-subnav-inner">
          <div className="sf-subnav-pills">
            <button 
              className={`sf-mode-pill ${activeMode === 'shop' ? 'active' : ''}`}
              onClick={() => {
                setActiveMode('shop');
                if (onSwitchMode) onSwitchMode('shop');
              }}
            >
              <ShoppingBag size={16} />
              <span>Shop & Create Custom</span>
            </button>
            <button 
              className={`sf-mode-pill ${activeMode === 'restore' ? 'active' : ''}`}
              onClick={() => {
                setActiveMode('restore');
                if (onSwitchMode) onSwitchMode('restore');
              }}
            >
              <Wrench size={16} />
              <span>Repair & Restore</span>
            </button>
          </div>

          <div className="sf-subnav-quick-actions">
            <button 
              className="sf-quick-badge-btn"
              onClick={() => scrollToId('sf-featured-collection')}
              title="View Collection"
            >
              <span>Ready Pairs</span>
              <span className="sf-badge-count">{productsList.length}</span>
            </button>

            <button 
              className="sf-quick-badge-btn"
              onClick={() => {
                setIsWizardOpen(true);
                setWizardStep(1);
                setWizardSuccessData(null);
              }}
              style={{ borderColor: 'var(--sf-pink)', color: 'var(--sf-pink)' }}
            >
              <Scissors size={14} />
              <span>Design Bespoke</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: SHOP & CREATE CUSTOM FOOTWEAR                                    */}
      {/* ========================================================================= */}
      {activeMode === 'shop' && (
        <div className="sf-shop-experience">
          
          {/* SECTION 1: HERO BANNER */}
          <section className="sf-hero-section">
            <div className="sf-container sf-hero-grid">
              
              {/* Left Column */}
              <div className="sf-hero-left">
                <span className="sf-hero-tag">
                  <Gem size={14} />
                  STITCHBEEZ FOOTWEAR STUDIO
                </span>

                <h1 className="sf-serif-title sf-hero-heading">
                  Footwear <br />
                  <span className="sf-hero-highlight">Made for Your Journey</span>
                </h1>

                <p className="sf-hero-description">
                  Premium shoes, sandals, slippers and custom-made footwear — handcrafted with quality materials and designed for your unique style.
                </p>

                {/* Trust Indicators */}
                <div className="sf-hero-trust-row">
                  <div className="sf-trust-item">
                    <span className="sf-trust-icon-sym">◆</span>
                    <span>Premium Materials</span>
                  </div>
                  <div className="sf-trust-item">
                    <span className="sf-trust-icon-sym">✂</span>
                    <span>Custom Designs</span>
                  </div>
                  <div className="sf-trust-item">
                    <span className="sf-trust-icon-sym">✓</span>
                    <span>Verified Artisans</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="sf-hero-ctas">
                  <button 
                    className="sf-btn-primary"
                    onClick={() => {
                      setCategoryFilter('all');
                      scrollToId('sf-featured-collection');
                    }}
                  >
                    Shop Ready Footwear →
                  </button>
                  <button 
                    className="sf-btn-secondary"
                    onClick={() => scrollToId('sf-custom-studio')}
                  >
                    Create Custom Design
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Image with script overlay */}
              <div className="sf-hero-right">
                <div className="sf-hero-img-frame">
                  <img 
                    src="/footwear_hero.jpg" 
                    alt="Handcrafted leather brogues on artisan workbench" 
                  />
                  <div className="sf-hero-img-blend-overlay" />
                  
                  <div className="sf-hero-script-overlay">
                    <span className="sf-hero-script-text">Every Step.</span>
                    <span className="sf-hero-script-text">Your Style.</span>
                    <span className="sf-hero-script-sub">Bespoke Atelier</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 2: SHOP BY CATEGORY */}
          <section className="sf-section sf-category-section">
            <div className="sf-container">
              <div className="sf-section-header-center">
                <span className="sf-tag-label">EXPLORE COLLECTION</span>
                <h2 className="sf-serif-title sf-section-heading">Shop by Category</h2>
                <p className="sf-section-subtext">
                  Find the perfect pair or create your own custom footwear.
                </p>
              </div>

              <div className="sf-category-grid-7">
                {SHOE_CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                  const isActive = categoryFilter === cat.id;
                  return (
                    <div 
                      key={cat.id} 
                      className={`sf-cat-card ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        if (cat.isCustom) {
                          scrollToId('sf-custom-studio');
                        } else {
                          setCategoryFilter(cat.id);
                          scrollToId('sf-featured-collection');
                        }
                      }}
                    >
                      <div className="sf-cat-img-box">
                        <img src={cat.img} alt={cat.label} />
                        {cat.isCustom && (
                          <span className="sf-cat-sketch-badge">Bespoke</span>
                        )}
                      </div>
                      <div className="sf-cat-info">
                        <h4 className="sf-cat-title">{cat.label}</h4>
                        <p className="sf-cat-desc">{cat.sub}</p>
                        <span className="sf-cat-action">{cat.action}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 3: FEATURED COLLECTION */}
          <section id="sf-featured-collection" className="sf-section sf-featured-section">
            <div className="sf-container">
              <div className="sf-section-header-split">
                <div>
                  <span className="sf-tag-label">FEATURED COLLECTION</span>
                  <h2 className="sf-serif-title sf-section-heading">
                    {categoryFilter === 'all' 
                      ? 'Premium Footwear, Ready for You' 
                      : `${SHOE_CATEGORIES.find(c => c.id === categoryFilter)?.label || 'Curated'} Collection`}
                  </h2>
                  <p className="sf-section-subtext">
                    Handpicked designs crafted with premium materials and fine detailing.
                  </p>

                  {categoryFilter !== 'all' && (
                    <button 
                      className="sf-filter-clear-pill"
                      onClick={() => setCategoryFilter('all')}
                    >
                      ✕ Show All Footwear ({ALL_SHOE_PRODUCTS.length})
                    </button>
                  )}
                </div>

                <button 
                  className="sf-link-text-pink"
                  onClick={() => setCategoryFilter('all')}
                >
                  View All →
                </button>
              </div>

              {/* Product Grid */}
              <div className="sf-products-grid">
                {filteredProducts.map(product => {
                  const isWish = wishlist.has(product.id);
                  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

                  return (
                    <div 
                      key={product.id} 
                      className="sf-product-card"
                      onClick={() => handleOpenPdp(product)}
                    >
                      <div className="sf-prod-img-box">
                        <img src={product.img} alt={product.name} />
                        
                        {discountPercent > 0 && (
                          <span className="sf-prod-discount-pill">{discountPercent}% OFF</span>
                        )}

                        <button 
                          className="sf-prod-wish-btn"
                          onClick={(e) => handleToggleWishlist(product.id, e)}
                          title="Save to Wishlist"
                        >
                          <Heart 
                            size={18} 
                            fill={isWish ? '#f72585' : 'none'} 
                            color={isWish ? '#f72585' : '#475569'} 
                            strokeWidth={2}
                          />
                        </button>
                      </div>

                      <div className="sf-prod-info">
                        <div className="sf-prod-rating-row">
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          <span>{product.rating}</span>
                          <span style={{ color: 'var(--sf-text-muted)' }}>({product.reviewCount})</span>
                        </div>

                        <h4 className="sf-prod-name">{product.name}</h4>

                        <div className="sf-prod-price-row">
                          <span className="sf-prod-price">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.originalPrice && (
                            <span className="sf-prod-orig-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>

                        <div className="sf-prod-bottom-row">
                          {/* Color Swatch Dots */}
                          <div className="sf-prod-swatches">
                            {product.colors.map(col => (
                              <span 
                                key={col.name}
                                className={`sf-prod-swatch-dot ${product.selectedColor === col.name ? 'active' : ''}`}
                                style={{ backgroundColor: col.hex }}
                                title={col.name}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProductsList(prev => prev.map(p => p.id === product.id ? {
                                    ...p,
                                    selectedColor: col.name,
                                    img: col.img || p.img
                                  } : p));
                                }}
                              />
                            ))}
                          </div>

                          {/* Add to Cart button */}
                          <button 
                            className="sf-prod-cart-btn"
                            onClick={(e) => handleAddToCartCard(product, e)}
                            title="Add to Bag"
                          >
                            <ShoppingCart size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4: CUSTOM DESIGN STUDIO */}
          <section id="sf-custom-studio" className="sf-custom-studio-section">
            <div className="sf-container">
              <div className="sf-custom-studio-card">
                <div className="sf-custom-studio-grid">
                  
                  {/* Left: Designer Sketching Photo */}
                  <div className="sf-custom-studio-photo">
                    <img 
                      src="/footwear_studio_designer.jpg" 
                      alt="Artisan sketching bespoke shoe design" 
                    />
                  </div>

                  {/* Center: Copy + CTA + 4 Process Indicators */}
                  <div className="sf-custom-studio-details">
                    <span className="sf-tag-label">CUSTOM DESIGN STUDIO</span>
                    <h2 className="sf-serif-title sf-custom-studio-heading">
                      Design Your Dream Footwear
                    </h2>
                    <p className="sf-custom-studio-sub">
                      Choose the style, material, color, size and detailing. Our artisans will bring your design to life.
                    </p>

                    <button 
                      className="sf-custom-studio-cta"
                      onClick={() => {
                        setIsWizardOpen(true);
                        setWizardStep(1);
                        setWizardSuccessData(null);
                      }}
                    >
                      Start Designing →
                    </button>

                    <div className="sf-custom-steps-row">
                      <div className="sf-custom-step-item">
                        <div className="sf-step-icon-wrap">
                          <Upload size={18} color="#f72585" strokeWidth={2.2} />
                        </div>
                        <span className="sf-step-name">1. Upload Sketch<br />or Idea</span>
                      </div>

                      <div className="sf-custom-step-item">
                        <div className="sf-step-icon-wrap">
                          <Gem size={18} color="#f72585" strokeWidth={2.2} />
                        </div>
                        <span className="sf-step-name">2. Choose Material<br />& Details</span>
                      </div>

                      <div className="sf-custom-step-item">
                        <div className="sf-step-icon-wrap">
                          <Eye size={18} color="#f72585" strokeWidth={2.2} />
                        </div>
                        <span className="sf-step-name">3. Get Preview<br />& Quote</span>
                      </div>

                      <div className="sf-custom-step-item">
                        <div className="sf-step-icon-wrap">
                          <Package size={18} color="#f72585" strokeWidth={2.2} />
                        </div>
                        <span className="sf-step-name">4. Handcrafted<br />& Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Footwear Concept Sketch with Annotations */}
                  <div className="sf-custom-studio-sketch">
                    <img 
                      src="/footwear_concept_sketch.jpg" 
                      alt="Hand-drawn concept footwear sketch" 
                    />
                    <div className="sf-sketch-callout sf-callout-1">“Your Style”</div>
                    <div className="sf-sketch-callout sf-callout-2">“Your Color”</div>
                    <div className="sf-sketch-callout sf-callout-3">“Your Material”</div>
                    <div className="sf-sketch-callout sf-callout-4">“Your Footwear”</div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: FOOTWEAR MATERIAL OPTIONS */}
          <section className="sf-materials-section">
            <div className="sf-container">
              <div className="sf-section-header-center">
                <span className="sf-tag-label">FOOTWEAR MATERIAL OPTIONS</span>
                <h2 className="sf-serif-title sf-section-heading">Premium Materials for Every Style</h2>
                <p className="sf-section-subtext">
                  Handpicked leathers, fabrics and soles to create long-lasting, comfortable footwear.
                </p>
              </div>

              <div className="sf-materials-carousel-wrapper">
                <button 
                  className="sf-mat-nav-arrow sf-mat-nav-prev"
                  onClick={() => scrollMaterials('left')}
                  title="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="sf-materials-carousel" ref={materialsTrackRef}>
                  {SHOE_MATERIALS.map(mat => (
                    <div 
                      key={mat.id} 
                      className="sf-material-card"
                      onClick={() => setSelectedMaterialModal(mat)}
                    >
                      <div className="sf-material-img-box">
                        <img src={mat.img} alt={mat.name} />
                      </div>
                      <div className="sf-material-info">
                        <span className="sf-material-tag">{mat.tag}</span>
                        <h4 className="sf-material-name">{mat.name}</h4>
                        <p className="sf-material-desc">{mat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="sf-mat-nav-arrow sf-mat-nav-next"
                  onClick={() => scrollMaterials('right')}
                  title="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 6: HOW IT WORKS */}
          <section className="sf-section sf-how-it-works-section">
            <div className="sf-container sf-how-it-works-grid">
              
              {/* Left Column */}
              <div className="sf-how-left">
                <span className="sf-tag-label">HOW IT WORKS</span>
                <h2 className="sf-serif-title sf-section-heading">From Idea to Your Footwear</h2>
                <p className="sf-section-subtext">
                  A simple and transparent process to create or buy your perfect pair.
                </p>

                <div className="sf-how-stepper">
                  <div 
                    className={`sf-how-step-card ${activeHowStep === 1 ? 'active' : ''}`}
                    onClick={() => setActiveHowStep(1)}
                  >
                    <div className="sf-how-icon-circle">
                      <ShoppingBag size={22} />
                    </div>
                    <h5 className="sf-how-step-title">1. Choose</h5>
                    <p className="sf-how-step-desc">Pick a ready design or create a custom pair.</p>
                  </div>

                  <div 
                    className={`sf-how-step-card ${activeHowStep === 2 ? 'active' : ''}`}
                    onClick={() => setActiveHowStep(2)}
                  >
                    <div className="sf-how-icon-circle">
                      <Sliders size={22} />
                    </div>
                    <h5 className="sf-how-step-title">2. Customize</h5>
                    <p className="sf-how-step-desc">Select material, color and details.</p>
                  </div>

                  <div 
                    className={`sf-how-step-card ${activeHowStep === 3 ? 'active' : ''}`}
                    onClick={() => setActiveHowStep(3)}
                  >
                    <div className="sf-how-icon-circle">
                      <Scissors size={22} />
                    </div>
                    <h5 className="sf-how-step-title">3. Crafted</h5>
                    <p className="sf-how-step-desc">Our artisans handcraft your footwear.</p>
                  </div>

                  <div 
                    className={`sf-how-step-card ${activeHowStep === 4 ? 'active' : ''}`}
                    onClick={() => setActiveHowStep(4)}
                  >
                    <div className="sf-how-icon-circle">
                      <Package size={22} />
                    </div>
                    <h5 className="sf-how-step-title">4. Delivered</h5>
                    <p className="sf-how-step-desc">Securely packed and delivered to you.</p>
                  </div>
                </div>

                {/* Interactive tip */}
                <div className="sf-how-tip-box">
                  <Sparkles size={18} color="#f72585" />
                  <div>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--sf-text-primary)' }}>
                      Step {activeHowStep}: {howStepTips[activeHowStep]?.title}
                    </strong>
                    <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--sf-text-secondary)', lineHeight: 1.4 }}>
                      {howStepTips[activeHowStep]?.text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Artisan Image */}
              <div className="sf-how-right">
                <img 
                  src="/footwear_artisan_stitching.jpg" 
                  alt="Master cobbler hand stitching footwear sole with STITCHBEEZ apron" 
                />
                <div className="sf-how-apron-badge">
                  <ShieldCheck size={16} color="#f72585" />
                  <span className="sf-how-apron-text">STITCHBEEZ Master Atelier</span>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 7: LIFESTYLE / EDITORIAL BANNER */}
          <section className="sf-lifestyle-banner-section">
            <div className="sf-container">
              <div className="sf-lifestyle-card">
                <img 
                  src="/footwear_lifestyle_lineup.jpg" 
                  alt="Curated handcrafted footwear collection lineup" 
                  className="sf-lifestyle-bg-img"
                />
                <div className="sf-lifestyle-overlay" />
                <div className="sf-lifestyle-content">
                  <span className="sf-tag-label" style={{ color: '#f72585' }}>EDITORIAL CURATION</span>
                  <h2 className="sf-serif-title sf-lifestyle-heading">
                    More Than Footwear, It’s a Lifestyle
                  </h2>
                  <p className="sf-lifestyle-sub">
                    Handcrafted comfort, timeless silhouette, and bespoke quality for every step of your journey.
                  </p>
                  <button 
                    className="sf-btn-primary"
                    onClick={() => {
                      setCategoryFilter('all');
                      scrollToId('sf-featured-collection');
                    }}
                  >
                    Shop Collection →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8: CUSTOMER REVIEWS */}
          <section className="sf-reviews-section">
            <div className="sf-container">
              <div className="sf-section-header-split">
                <div>
                  <span className="sf-tag-label">CUSTOMER VOICES</span>
                  <h2 className="sf-serif-title sf-section-heading">Loved by Walkers, Striders & Creators</h2>
                  <p className="sf-section-subtext">
                    Read verified stories from customers who step out in bespoke StitchBeez footwear.
                  </p>
                </div>
                <button 
                  className="sf-link-text-pink"
                  onClick={() => showToast('Displaying 24 verified footwear reviews')}
                >
                  View More Reviews →
                </button>
              </div>

              <div className="sf-reviews-grid-3">
                {SHOE_REVIEWS.map(rev => (
                  <div key={rev.id} className="sf-review-card">
                    <div className="sf-review-top">
                      <div className="sf-review-stars">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <p className="sf-review-quote">“{rev.quote}”</p>
                    </div>

                    <div className="sf-review-footer">
                      <div className="sf-review-author-wrap">
                        <img src={rev.avatar} alt={rev.name} className="sf-review-avatar" />
                        <div>
                          <span className="sf-review-name">{rev.name}</span>
                          <span className="sf-review-loc">{rev.location}</span>
                        </div>
                      </div>

                      <img src={rev.itemImg} alt="Footwear" className="sf-review-item-thumb" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: BOTTOM CTA BANNER */}
          <section className="sf-bottom-cta-section">
            <div className="sf-container">
              <div className="sf-bottom-cta-card">
                <img 
                  src="/footwear_cta_banner.jpg" 
                  alt="Espresso leather atelier background" 
                  className="sf-bottom-cta-bg"
                />
                
                <div className="sf-bottom-cta-text">
                  <h2 className="sf-serif-title sf-bottom-cta-heading">
                    Step into Your Next Journey
                  </h2>
                  <p className="sf-bottom-cta-sub">
                    Explore our ready-to-wear footwear collection or design your bespoke pair today with master artisans.
                  </p>
                </div>

                <div className="sf-bottom-cta-btns">
                  <button 
                    className="sf-cta-btn-pink"
                    onClick={() => {
                      setCategoryFilter('all');
                      scrollToId('sf-featured-collection');
                    }}
                  >
                    Shop Ready Footwear →
                  </button>
                  <button 
                    className="sf-cta-btn-glass"
                    onClick={() => {
                      setIsWizardOpen(true);
                      setWizardStep(1);
                      setWizardSuccessData(null);
                    }}
                  >
                    Create Custom Design
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: REPAIR & RESTORE (SWAPPING TO SHOE REPAIR EXPERT RESOLING)        */}
      {/* ========================================================================= */}
      {activeMode === 'restore' && (
        <div className="sf-restore-redirect-box" style={{ padding: '40px 0', minHeight: '60vh' }}>
          <div className="sf-container" style={{ textAlign: 'center', maxWidth: '640px', margin: '60px auto' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(247, 37, 133, 0.1)',
              color: '#f72585',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Wrench size={30} />
            </div>
            <h2 className="sf-serif-title" style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              Shoe Repair & Resoling Studio
            </h2>
            <p style={{ color: 'var(--sf-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '28px' }}>
              Restore, resole, and condition your cherished shoes and boots with verified master cobblers.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button 
                className="sf-btn-primary"
                onClick={() => {
                  if (onSwitchMode) onSwitchMode('restore');
                }}
              >
                Launch Repair & Resoling Portal →
              </button>
              <button 
                className="sf-btn-secondary"
                onClick={() => setActiveMode('shop')}
              >
                ← Back to Shop & Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: PRODUCT DETAILS MODAL (PDP)                                      */}
      {/* ========================================================================= */}
      {pdpProduct && (
        <div className="sf-modal-backdrop" onClick={() => setPdpProduct(null)}>
          <div className="sf-modal-box sf-pdp-modal" onClick={e => e.stopPropagation()}>
            <button className="sf-modal-close-btn" onClick={() => setPdpProduct(null)}>
              <X size={18} />
            </button>

            {/* Left: Gallery */}
            <div className="sf-pdp-gallery">
              <div className="sf-pdp-main-img">
                <img src={selectedPdpImage || pdpProduct.img} alt={pdpProduct.name} />
              </div>
              <div className="sf-pdp-thumbs-row">
                {(pdpProduct.images || [pdpProduct.img]).map((im, idx) => (
                  <div 
                    key={idx}
                    className={`sf-pdp-thumb ${(selectedPdpImage || pdpProduct.img) === im ? 'active' : ''}`}
                    onClick={() => setSelectedPdpImage(im)}
                  >
                    <img src={im} alt="" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="sf-pdp-details">
              <div className="sf-prod-rating-row">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span>{pdpProduct.rating}</span>
                <span style={{ color: 'var(--sf-text-muted)' }}>({pdpProduct.reviewCount} verified reviews)</span>
              </div>

              <h2 className="sf-serif-title sf-pdp-title">{pdpProduct.name}</h2>

              <div className="sf-pdp-price-row">
                <span className="sf-pdp-price">₹{pdpProduct.price.toLocaleString('en-IN')}</span>
                {pdpProduct.originalPrice && (
                  <span className="sf-pdp-orig">₹{pdpProduct.originalPrice.toLocaleString('en-IN')}</span>
                )}
                <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 700 }}>In Stock ({pdpProduct.stock} left)</span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--sf-text-secondary)', lineHeight: 1.5, margin: '0' }}>
                {pdpProduct.description}
              </p>

              {/* Color Selection */}
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sf-text-primary)' }}>
                  Color: <span style={{ color: 'var(--sf-pink)' }}>{selectedPdpColor}</span>
                </span>
                <div className="sf-swatch-row" style={{ marginTop: '8px' }}>
                  {pdpProduct.colors.map(col => (
                    <button 
                      key={col.name}
                      type="button"
                      className={`sf-swatch-btn ${selectedPdpColor === col.name ? 'active' : ''}`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                      onClick={() => {
                        setSelectedPdpColor(col.name);
                        if (col.img) setSelectedPdpImage(col.img);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sf-text-primary)' }}>
                    Select Size (UK / India):
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--sf-pink)', cursor: 'pointer', fontWeight: 600 }}>
                    Size Guide
                  </span>
                </div>
                <div className="sf-pdp-sizes-grid">
                  {(pdpProduct.sizes || ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']).map(sz => (
                    <button 
                      key={sz}
                      type="button"
                      className={`sf-size-chip ${selectedPdpSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedPdpSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="sf-pdp-qty-row">
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Quantity:</span>
                <div className="sf-qty-selector">
                  <button 
                    type="button" 
                    className="sf-qty-btn"
                    onClick={() => setPdpQuantity(q => Math.max(1, q - 1))}
                  >-</button>
                  <span className="sf-qty-num">{pdpQuantity}</span>
                  <button 
                    type="button" 
                    className="sf-qty-btn"
                    onClick={() => setPdpQuantity(q => Math.min(pdpProduct.stock || 10, q + 1))}
                  >+</button>
                </div>

                <span style={{ fontSize: '0.78rem', color: 'var(--sf-text-secondary)', marginLeft: 'auto' }}>
                  Estimated delivery: 3–5 days • Free shipping
                </span>
              </div>

              {/* Actions */}
              <div className="sf-pdp-action-btns">
                <button 
                  className="sf-btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handlePdpAddToCart}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Bag</span>
                </button>
                <button 
                  className="sf-btn-secondary" 
                  style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--sf-pink)', color: 'var(--sf-pink)' }}
                  onClick={handlePdpBuyNow}
                >
                  <span>Buy Now</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: 7-STEP CUSTOM FOOTWEAR CONFIGURATOR                              */}
      {/* ========================================================================= */}
      {isWizardOpen && (
        <div className="sf-modal-backdrop" onClick={() => setIsWizardOpen(false)}>
          <div className="sf-modal-box sf-wizard-modal" onClick={e => e.stopPropagation()}>
            <button className="sf-modal-close-btn" onClick={() => setIsWizardOpen(false)}>
              <X size={18} />
            </button>

            {/* Success State */}
            {wizardSuccessData ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <CheckCircle2 size={40} />
                </div>
                <span className="sf-tag-label">QUOTE REQUEST DISPATCHED</span>
                <h2 className="sf-serif-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                  Your Bespoke Footwear is in Motion
                </h2>
                <p style={{ color: 'var(--sf-text-secondary)', fontSize: '0.98rem', maxWidth: '520px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                  Reference ID: <strong style={{ color: 'var(--sf-pink)' }}>{wizardSuccessData.id}</strong><br />
                  Our master cordwainers will review your technical sketch and specifications, prepare a 3D digital visualization, and send you an artisan quote within 4 hours.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
                  <button 
                    className="sf-btn-primary"
                    onClick={() => {
                      setIsWizardOpen(false);
                      setWizardSuccessData(null);
                      scrollToId('sf-featured-collection');
                    }}
                  >
                    Continue Browsing Footwear
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Wizard Header & Stepper */}
                <div className="sf-wizard-progress-bar">
                  {[
                    { num: 1, label: 'Type' },
                    { num: 2, label: 'Design' },
                    { num: 3, label: 'Material' },
                    { num: 4, label: 'Color' },
                    { num: 5, label: 'Sole' },
                    { num: 6, label: 'Size' },
                    { num: 7, label: 'Review' }
                  ].map(s => (
                    <div 
                      key={s.num} 
                      className={`sf-wizard-step-node ${wizardStep === s.num ? 'active' : ''} ${wizardStep > s.num ? 'completed' : ''}`}
                      onClick={() => setWizardStep(s.num)}
                    >
                      <div className="sf-node-circle">
                        {wizardStep > s.num ? <Check size={16} /> : s.num}
                      </div>
                      <span className="sf-node-label">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Wizard Step Content */}
                <div className="sf-wizard-content-box">
                  
                  {/* STEP 1: FOOTWEAR TYPE */}
                  {wizardStep === 1 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 1 — What would you like us to create?</h3>
                      <p className="sf-wizard-step-sub">Select the core footwear category for your bespoke pair.</p>

                      <div className="sf-types-grid">
                        {[
                          { name: 'Formal Shoes', icon: '👞', desc: 'Oxfords, Derbies, Monkstraps' },
                          { name: 'Casual Shoes', icon: '👞', desc: 'Loafers, Boat Shoes, Driving Moccasins' },
                          { name: 'Sneakers', icon: '👟', desc: 'Low-Tops, High-Tops, Minimalist' },
                          { name: 'Sandals', icon: '👡', desc: 'Gladiators, Fisherman, Cross-strap' },
                          { name: 'Slippers', icon: '🥿', desc: 'Mules, Shearling House, Slides' },
                          { name: 'Heels', icon: '👠', desc: 'Stilettos, Block Heels, Pumps' },
                          { name: 'Boots', icon: '🥾', desc: 'Chelsea, Chukka, Combat Boots' },
                          { name: 'Other', icon: '✨', desc: 'Custom Hybrid / Artistic Creation' }
                        ].map(t => (
                          <div 
                            key={t.name}
                            className={`sf-type-card ${footwearType === t.name ? 'active' : ''}`}
                            onClick={() => setFootwearType(t.name)}
                          >
                            <span className="sf-type-icon">{t.icon}</span>
                            <span className="sf-type-name">{t.name}</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--sf-text-secondary)' }}>{t.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DESIGN & INSPIRATION */}
                  {wizardStep === 2 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 2 — Base Silhouette & Reference Upload</h3>
                      <p className="sf-wizard-step-sub">Upload your sketches, moodboards, or choose an existing base silhouette.</p>

                      <div style={{ marginBottom: '18px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                          Select Preferred Silhouette Profile:
                        </label>
                        <select 
                          value={baseSilhouette}
                          onChange={e => setBaseSilhouette(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--sf-border)',
                            background: 'var(--sf-warm-card)',
                            color: 'var(--sf-text-primary)',
                            fontSize: '0.9rem',
                            fontWeight: 600
                          }}
                        >
                          <option value="Oxford Brogue">Oxford Brogue (Traditional Wingtip Medallion)</option>
                          <option value="Wholecut Dress Oxford">Wholecut Dress Oxford (Single Seamless Leather Cut)</option>
                          <option value="Italian Penny Loafer">Italian Penny Loafer (Sprezzatura Beefroll Apron)</option>
                          <option value="Minimalist Cupsole Sneaker">Minimalist Cupsole Sneaker (Clean Architectural lines)</option>
                          <option value="Athletic Trainer Sneaker">Athletic Trainer Sneaker (Multi-panel dynamic knit)</option>
                          <option value="Multi-Strap Leather Sandal">Multi-Strap Leather Sandal (Anatomic contoured footbed)</option>
                          <option value="Shearling Lounge Mule">Shearling Lounge Mule (Slip-on luxury slipper)</option>
                          <option value="Pointed-Toe High Stiletto">Pointed-Toe High Stiletto (3.5-inch balanced balance)</option>
                          <option value="Storm-Welted Chelsea Boot">Storm-Welted Chelsea Boot (Dual elastic gusset)</option>
                          <option value="Fully Bespoke Sketch">Fully Bespoke from My Uploaded Sketch</option>
                        </select>
                      </div>

                      {/* Upload Dropzone */}
                      <label 
                        className="sf-upload-dropzone"
                        htmlFor="sf-file-upload-input"
                      >
                        <Upload size={28} color="#f72585" style={{ margin: '0 auto 8px', display: 'block' }} />
                        <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--sf-text-primary)' }}>
                          Click to upload inspiration photos, drawings, or sketches
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--sf-text-secondary)' }}>
                          PNG, JPG, or WEBP up to 10MB (Multiple uploads supported)
                        </span>
                        <input 
                          id="sf-file-upload-input"
                          type="file" 
                          multiple 
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          style={{ display: 'none' }}
                        />
                      </label>

                      {/* Uploaded Previews */}
                      {uploadedPhotos.length > 0 && (
                        <div className="sf-uploaded-previews">
                          {uploadedPhotos.map((url, i) => (
                            <div key={i} className="sf-upload-thumb">
                              <img src={url} alt={`Upload ${i + 1}`} />
                              <button 
                                type="button" 
                                className="sf-remove-thumb"
                                onClick={() => handleRemovePhoto(i)}
                              >✕</button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div style={{ marginTop: '16px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                          Design Notes & Inspiration Instructions:
                        </label>
                        <textarea 
                          rows={3}
                          value={customNotes}
                          onChange={e => setCustomNotes(e.target.value)}
                          placeholder="e.g. Brogue perforations on toe only, padded arch support, contrast white stitching..."
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--sf-border)',
                            background: 'var(--sf-warm-card)',
                            color: 'var(--sf-text-primary)',
                            fontSize: '0.88rem'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: MATERIAL */}
                  {wizardStep === 3 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 3 — Premium Footwear Materials</h3>
                      <p className="sf-wizard-step-sub">Select the primary material for your shoe upper.</p>

                      <div className="sf-wiz-materials-grid">
                        {SHOE_MATERIALS.map(m => (
                          <div 
                            key={m.id}
                            className={`sf-wiz-mat-card ${customMaterial === m.id ? 'active' : ''}`}
                            onClick={() => setCustomMaterial(m.id)}
                          >
                            <img src={m.img} alt={m.name} className="sf-wiz-mat-img" />
                            <div className="sf-wiz-mat-label">{m.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: COLOR */}
                  {wizardStep === 4 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 4 — Artisan Color Palette</h3>
                      <p className="sf-wizard-step-sub">Select rich tones for the upper, accent trim, and outsole.</p>

                      {/* Main Color */}
                      <div className="sf-color-group">
                        <label className="sf-color-group-label">
                          Main Upper Color: <span style={{ color: 'var(--sf-pink)' }}>{mainColor}</span>
                        </label>
                        <div className="sf-swatch-row">
                          {[
                            { name: 'Cognac Tan', hex: '#8c4a24' },
                            { name: 'Espresso Brown', hex: '#3d2314' },
                            { name: 'Obsidian Black', hex: '#111111' },
                            { name: 'Crisp White', hex: '#f8fafc' },
                            { name: 'Navy Blue', hex: '#1e293b' },
                            { name: 'Burgundy Crimson', hex: '#631d2f' },
                            { name: 'Olive Green', hex: '#444d28' },
                            { name: 'Warm Cream', hex: '#e8ded2' }
                          ].map(c => (
                            <button 
                              key={c.name}
                              type="button"
                              className={`sf-swatch-btn ${mainColor === c.name ? 'active' : ''}`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                              onClick={() => setMainColor(c.name)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Secondary Color */}
                      <div className="sf-color-group">
                        <label className="sf-color-group-label">
                          Secondary / Accent Trim: <span style={{ color: 'var(--sf-pink)' }}>{secondaryColor}</span>
                        </label>
                        <div className="sf-swatch-row">
                          {['Matching', 'Off-White', 'StitchBeez Pink (#f72585)', 'Dark Tan', 'Burnished Gold'].map(acc => (
                            <button 
                              key={acc}
                              type="button"
                              className={`sf-size-chip ${secondaryColor === acc ? 'active' : ''}`}
                              onClick={() => setSecondaryColor(acc)}
                            >
                              {acc}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sole Color */}
                      <div className="sf-color-group">
                        <label className="sf-color-group-label">
                          Outsole Color: <span style={{ color: 'var(--sf-pink)' }}>{soleColor}</span>
                        </label>
                        <div className="sf-swatch-row">
                          {['Natural Leather Tone', 'Solid White', 'Classic Black', 'Gum Caramel'].map(sc => (
                            <button 
                              key={sc}
                              type="button"
                              className={`sf-size-chip ${soleColor === sc ? 'active' : ''}`}
                              onClick={() => setSoleColor(sc)}
                            >
                              {sc}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Hex */}
                      <div style={{ marginTop: '12px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sf-text-secondary)' }}>
                          Need a specific pantone / custom dye shade?
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g. #9B2C2C or 'Vintage Oxblood Patina'"
                          value={customHexColor}
                          onChange={e => setCustomHexColor(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            marginTop: '4px',
                            borderRadius: '8px',
                            border: '1px solid var(--sf-border)',
                            background: 'var(--sf-warm-card)',
                            color: 'var(--sf-text-primary)',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 5: SOLE & HARDWARE */}
                  {wizardStep === 5 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 5 — Sole, Stitching & Detailing</h3>
                      <p className="sf-wizard-step-sub">Select the foundation build, welt construction, and hardware accents.</p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Sole Type:</label>
                          <select 
                            value={soleType} 
                            onChange={e => setSoleType(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)', color: 'var(--sf-text-primary)' }}
                          >
                            <option value="Goodyear Welted Leather">Goodyear Welted Oak-Bark Leather</option>
                            <option value="Vibram Commando Lug Rubber">Vibram Commando Lug Rubber</option>
                            <option value="Dainite Studded Sole">Dainite Studded Rubber Tap</option>
                            <option value="Natural Crepe Sole">Natural Soft Crepe Rubber</option>
                            <option value="Lightweight EVA Midsole">Lightweight Dual-Density EVA Midsole</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Sole Thickness:</label>
                          <select 
                            value={soleThickness} 
                            onChange={e => setSoleThickness(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)', color: 'var(--sf-text-primary)' }}
                          >
                            <option value="Standard (15mm)">Standard (15mm profile)</option>
                            <option value="Chunky Bold (25mm)">Chunky Bold Platform (25mm)</option>
                            <option value="Sleek Ultra-Light (10mm)">Sleek Ultra-Light (10mm)</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Lace / Fastener Style:</label>
                          <select 
                            value={laceStyle} 
                            onChange={e => setLaceStyle(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)', color: 'var(--sf-text-primary)' }}
                          >
                            <option value="Round Waxed Cotton">Round Waxed Cotton Laces</option>
                            <option value="Flat Italian Cotton">Flat Premium Italian Cotton</option>
                            <option value="Rawhide Leather Cords">Rawhide Leather Cords</option>
                            <option value="Slip-on / Laceless Elastic">Slip-on / Laceless Hidden Elastic</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Stitch Colour:</label>
                          <select 
                            value={stitchColor} 
                            onChange={e => setStitchColor(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)', color: 'var(--sf-text-primary)' }}
                          >
                            <option value="Contrast Hand-Stitched Amber">Contrast Hand-Stitched Amber</option>
                            <option value="Tone-on-Tone Matching">Tone-on-Tone Upper Matching</option>
                            <option value="Crisp White Welt">Crisp White Welt Stitch</option>
                            <option value="StitchBeez Signature Pink">StitchBeez Signature Pink</option>
                          </select>
                        </div>
                      </div>

                      {/* Personalization */}
                      <div style={{ background: 'rgba(247, 37, 133, 0.04)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--sf-pink-border)' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--sf-text-primary)', display: 'block', marginBottom: '8px' }}>
                          Personalization Monogramming:
                        </span>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px' }}>
                          <input 
                            type="text" 
                            maxLength={4}
                            value={personalizationInitials}
                            onChange={e => setPersonalizationInitials(e.target.value.toUpperCase())}
                            placeholder="Initials (e.g. SB)"
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--sf-border)', fontWeight: 700, textAlign: 'center' }}
                          />
                          <select 
                            value={personalizationPlacement}
                            onChange={e => setPersonalizationPlacement(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                          >
                            <option value="Insole Gold Foil Deboss">Insole Gold Foil Deboss</option>
                            <option value="Heel Counter Blind Stamp">Heel Counter Blind Stamp</option>
                            <option value="Leather Tongue Badge">Leather Tongue Badge</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: SIZE & MEASUREMENTS */}
                  {wizardStep === 6 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 6 — Sizing & Precision Measurements</h3>
                      <p className="sf-wizard-step-sub">Select standard UK/India shoe size or provide custom anatomical measurements.</p>

                      {/* Toggle */}
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <button 
                          type="button" 
                          className={`sf-size-chip ${!isCustomMeasurement ? 'active' : ''}`}
                          onClick={() => setIsCustomMeasurement(false)}
                        >
                          Standard UK/India Sizing
                        </button>
                        <button 
                          type="button" 
                          className={`sf-size-chip ${isCustomMeasurement ? 'active' : ''}`}
                          onClick={() => setIsCustomMeasurement(true)}
                        >
                          📏 I need custom measurements
                        </button>
                      </div>

                      {!isCustomMeasurement ? (
                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                            Choose Standard UK/India Size:
                          </label>
                          <div className="sf-pdp-sizes-grid">
                            {['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12', 'UK 13'].map(sz => (
                              <button 
                                key={sz}
                                type="button"
                                className={`sf-size-chip ${standardSize === sz ? 'active' : ''}`}
                                onClick={() => setStandardSize(sz)}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>

                          <div style={{ marginTop: '18px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                              Footwear Width Fitting:
                            </label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              {['Standard (D/E)', 'Wide (EE)', 'Extra Wide (EEE)'].map(w => (
                                <button 
                                  key={w}
                                  type="button"
                                  className={`sf-size-chip ${footwearWidth === w ? 'active' : ''}`}
                                  onClick={() => setFootwearWidth(w)}
                                >
                                  {w}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ background: 'rgba(247, 37, 133, 0.03)', padding: '18px', borderRadius: '14px', border: '1px solid var(--sf-pink-border)' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sf-pink)', display: 'block', marginBottom: '12px' }}>
                            📐 Guided Custom Foot Measurements
                          </span>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '14px' }}>
                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Foot Length (cm):</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={footLengthCm}
                                onChange={e => setFootLengthCm(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                              />
                            </div>
                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Ball Girth/Width (cm):</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={footWidthCm}
                                onChange={e => setFootWidthCm(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                              />
                            </div>
                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Instep Height (cm):</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={instepCm}
                                onChange={e => setInstepCm(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Orthotic or Arch Considerations:</label>
                            <input 
                              type="text" 
                              placeholder="e.g. High arch support required, flat foot padding, bunion ease..."
                              value={orthoticNotes}
                              onChange={e => setOrthoticNotes(e.target.value)}
                              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 7: REVIEW & QUOTE */}
                  {wizardStep === 7 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 7 — Review Bespoke Specifications</h3>
                      <p className="sf-wizard-step-sub">Confirm your customized parameters before artisan evaluation.</p>

                      <div className="sf-review-summary-grid">
                        <div className="sf-review-item">
                          <span className="sf-review-label">Footwear Category</span>
                          <span className="sf-review-val">{footwearType}</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Base Style</span>
                          <span className="sf-review-val">{baseSilhouette}</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Selected Material</span>
                          <span className="sf-review-val">
                            {SHOE_MATERIALS.find(m => m.id === customMaterial)?.name || customMaterial}
                          </span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Colors</span>
                          <span className="sf-review-val">{mainColor} / Sole: {soleColor}</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Sole Construction</span>
                          <span className="sf-review-val">{soleType}</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Sizing Fit</span>
                          <span className="sf-review-val">
                            {isCustomMeasurement ? `Custom (${footLengthCm}cm x ${footWidthCm}cm)` : `${standardSize} (${footwearWidth})`}
                          </span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Personalization</span>
                          <span className="sf-review-val">“{personalizationInitials}” ({personalizationPlacement})</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Uploaded References</span>
                          <span className="sf-review-val">{uploadedPhotos.length} files attached</span>
                        </div>
                      </div>

                      {/* Required Disclaimer */}
                      <div className="sf-wizard-disclaimer">
                        <Info size={20} style={{ flexShrink: 0 }} />
                        <span>
                          Final pricing will be confirmed after your design is reviewed by a StitchBeez specialist.
                        </span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Wizard Navigation Buttons */}
                <div className="sf-wizard-nav-btns">
                  {wizardStep > 1 ? (
                    <button 
                      className="sf-btn-secondary"
                      onClick={() => setWizardStep(s => s - 1)}
                    >
                      ← Back
                    </button>
                  ) : <div />}

                  {wizardStep < 7 ? (
                    <button 
                      className="sf-btn-primary"
                      onClick={() => setWizardStep(s => s + 1)}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button 
                      className="sf-btn-primary"
                      style={{ background: '#10b981' }}
                      onClick={handleSubmitCustomQuote}
                    >
                      Request Preview & Quote
                    </button>
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: MATERIAL DETAILS MODAL                                           */}
      {/* ========================================================================= */}
      {selectedMaterialModal && (
        <div className="sf-modal-backdrop" onClick={() => setSelectedMaterialModal(null)}>
          <div className="sf-modal-box" style={{ maxWidth: '580px', padding: '32px' }} onClick={e => e.stopPropagation()}>
            <button className="sf-modal-close-btn" onClick={() => setSelectedMaterialModal(null)}>
              <X size={18} />
            </button>

            <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '18px' }}>
              <img src={selectedMaterialModal.img} alt={selectedMaterialModal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <span className="sf-tag-label">{selectedMaterialModal.tag}</span>
            <h3 className="sf-serif-title" style={{ fontSize: '1.8rem', margin: '4px 0 10px' }}>
              {selectedMaterialModal.name}
            </h3>
            <p style={{ color: 'var(--sf-text-secondary)', lineHeight: 1.5, fontSize: '0.92rem', marginBottom: '16px' }}>
              {selectedMaterialModal.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--sf-warm-cream)', padding: '14px', borderRadius: '10px', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--sf-pink)' }}>Durability</span>
                <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: '0.85rem' }}>{selectedMaterialModal.durability}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--sf-pink)' }}>Breathability</span>
                <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: '0.85rem' }}>{selectedMaterialModal.breathability}</p>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Recommended Footwear:</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--sf-text-secondary)' }}>{selectedMaterialModal.recommendedFootwear}</span>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Artisan Care:</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--sf-text-secondary)' }}>{selectedMaterialModal.careInfo}</span>
            </div>

            <button 
              className="sf-btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setCustomMaterial(selectedMaterialModal.id);
                setSelectedMaterialModal(null);
                setIsWizardOpen(true);
                setWizardStep(3);
                showToast(`Pre-selected "${selectedMaterialModal.name}" in Custom Studio!`);
              }}
            >
              Design With This Material →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
