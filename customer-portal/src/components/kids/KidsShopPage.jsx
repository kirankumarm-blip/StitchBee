import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Gem, Ruler, Shirt, Scissors, ArrowRight, Heart, ShoppingCart, 
  ChevronLeft, ChevronRight, X, Check, Star, ShieldCheck, Image, Type, 
  FileText, Truck, Layers, SlidersHorizontal, Search, Info, Award, ArrowLeft, Zap
} from 'lucide-react';
import { 
  KIDS_SHOP_ASSETS, 
  KIDS_SHOP_CATEGORIES, 
  KIDS_SHOP_PRODUCTS, 
  KIDS_SHOP_FABRICS, 
  KIDS_STUDIO_STEPS, 
  KIDS_HOW_IT_WORKS_STEPS,
  KIDS_SIZE_CHART
} from '../../utils/kidsShopStore';
import { getWishlist, saveWishlist, getCart, saveCart } from '../../utils/bagsStore';
import './KidsShopPage.css';

export default function KidsShopPage({
  currentUser,
  onLoginRequired,
  theme = 'light',
  onAddToCart,
  onOpenCustomWorkflow,
  onSelectCategory,
  showToast = () => {}
}) {
  // Carousel Refs
  const trendingCarouselRef = useRef(null);
  const fabricsCarouselRef = useRef(null);
  const categoryOutfitsSectionRef = useRef(null);

  // In-Page View State: null = full landing page, product object = in-page purchase view
  const [selectedProductForPurchase, setSelectedProductForPurchase] = useState(null);

  // In-Page Category Filter State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inPageSearchQuery, setInPageSearchQuery] = useState('');
  const [inPageSortBy, setInPageSortBy] = useState('popular');

  // In-Page Purchase Options
  const [selectedSize, setSelectedSize] = useState('4-5Y');
  const [selectedColor, setSelectedColor] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [inPageSizeGuideOpen, setInPageSizeGuideOpen] = useState(false);

  // In-Page Fabric Details Inspector State
  const [inPageSelectedFabric, setInPageSelectedFabric] = useState(null);

  // Wishlist State synced with bagsStore
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      return getWishlist().map(item => item.id);
    } catch (e) {
      return [];
    }
  });

  const toggleWishlist = (product, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    let current = getWishlist();
    const exists = current.some(w => w.id === product.id);

    if (exists) {
      current = current.filter(w => w.id !== product.id);
      setWishlistIds(prev => prev.filter(id => id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`);
    } else {
      current = [...current, { ...product, addedOn: new Date().toISOString() }];
      setWishlistIds(prev => [...prev, product.id]);
      showToast(`Added "${product.name}" to wishlist ❤️`);
    }
    saveWishlist(current);
  };

  // Add to Cart Action (Saves to storage, notifies, and opens cart drawer without reload)
  const handleAddProductToCart = (product, size = selectedSize, color = selectedColor, qty = productQuantity, e) => {
    if (e && e.stopPropagation) e.stopPropagation();

    const chosenColor = color || (product.colors && product.colors[0]?.name) || "Default";
    const cartItem = {
      id: `${product.id}-${size}-${chosenColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      color: chosenColor,
      qty: qty,
      quantity: qty,
      category: product.category,
      type: 'kids-shop'
    };

    // 1. Sync persistent bagsStore cart
    try {
      const currentCart = getCart();
      const existingIdx = currentCart.findIndex(i => i.id === cartItem.id);
      if (existingIdx >= 0) {
        currentCart[existingIdx].qty = (currentCart[existingIdx].qty || 1) + qty;
      } else {
        currentCart.push(cartItem);
      }
      saveCart(currentCart);
    } catch (err) {
      console.warn("Could not save to persistent cart", err);
    }

    // 2. Trigger parent portal onAddToCart to open the cart drawer
    if (onAddToCart) {
      onAddToCart(cartItem, 'kids');
    }
    showToast(`Added ${qty}x "${product.name}" (${size}) to your bag! 🛒`);
  };

  // Buy Now Action (Adds to cart & immediately opens cart drawer without any page reload)
  const handleBuyNow = (product, size = selectedSize, color = selectedColor, qty = productQuantity, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    handleAddProductToCart(product, size, color, qty);
    showToast(`Proceeding to checkout with "${product.name}" ⚡`);
  };

  // In-Page Product Selection
  const handleSelectProductForPurchase = (product) => {
    setSelectedProductForPurchase(product);
    setSelectedColor(product.colors && product.colors[0] ? product.colors[0].name : null);
    setSelectedSize(product.sizes && product.sizes[0] ? product.sizes[0] : '4-5Y');
    setProductQuantity(1);
    setActiveGalleryIdx(0);
    setInPageSizeGuideOpen(false);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Handle Category Selection In-Page
  const handleCategoryClick = (cat) => {
    if (cat.isCustom) {
      onOpenCustomWorkflow();
      return;
    }
    setSelectedCategory(cat.id);
    setSelectedProductForPurchase(null);

    // Smoothly scroll down to In-Page Category Outfits Section
    setTimeout(() => {
      const el = document.getElementById('kids-category-outfits');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Carousel Scrolling
  const scrollTrending = (direction) => {
    if (!trendingCarouselRef.current) return;
    const scrollAmount = direction === 'left' ? -320 : 320;
    trendingCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollFabrics = (direction) => {
    if (!fabricsCarouselRef.current) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
    fabricsCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // In-Page Filtered Products for Category Browser
  const inPageFilteredProducts = KIDS_SHOP_PRODUCTS.filter(prod => {
    const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;
    const q = inPageSearchQuery.trim().toLowerCase();
    const matchesSearch = !q || 
      prod.name.toLowerCase().includes(q) || 
      (prod.desc && prod.desc.toLowerCase().includes(q)) ||
      (prod.fabric && prod.fabric.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (inPageSortBy === 'price-low') return a.price - b.price;
    if (inPageSortBy === 'price-high') return b.price - a.price;
    if (inPageSortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (b.reviewsCount || 0) - (a.reviewsCount || 0); // popular
  });

  const currentCategoryObj = KIDS_SHOP_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className={`kids-shop-wrapper ${theme === 'dark' ? 'dark' : ''}`}>

      {/* ===================================================================== */}
      {/* CONDITIONAL: IN-PAGE PRODUCT PURCHASE VIEW                            */}
      {/* ===================================================================== */}
      {selectedProductForPurchase ? (
        <section className="kids-inpage-purchase-view">
          {/* Top Navigation & Breadcrumbs */}
          <div className="kids-inpage-nav-row">
            <button 
              onClick={() => setSelectedProductForPurchase(null)}
              className="kids-back-btn"
            >
              <ArrowLeft size={16} /> Back to Kids Outfits
            </button>

            <nav className="kids-breadcrumbs" aria-label="Breadcrumb">
              <span>Home</span>
              <ChevronRight size={13} />
              <span onClick={() => setSelectedProductForPurchase(null)} style={{ cursor: 'pointer' }}>Kids Shop & Create</span>
              <ChevronRight size={13} />
              <span 
                onClick={() => {
                  setSelectedCategory(selectedProductForPurchase.category);
                  setSelectedProductForPurchase(null);
                }} 
                style={{ cursor: 'pointer' }}
              >
                {KIDS_SHOP_CATEGORIES.find(c => c.id === selectedProductForPurchase.category)?.title || 'Category'}
              </span>
              <ChevronRight size={13} />
              <span className="current">{selectedProductForPurchase.name}</span>
            </nav>
          </div>

          {/* 2-Column Product Detail Showcase */}
          <div className="kids-inpage-detail-grid">
            {/* Left Column: Gallery */}
            <div className="kids-inpage-gallery-col">
              <div className="kids-inpage-main-img-box">
                <img 
                  src={selectedProductForPurchase.images ? selectedProductForPurchase.images[activeGalleryIdx] : selectedProductForPurchase.image} 
                  alt={selectedProductForPurchase.name}
                  className="kids-inpage-main-img"
                />
                {selectedProductForPurchase.originalPrice && (
                  <span className="kids-detail-discount-badge">
                    {Math.round(((selectedProductForPurchase.originalPrice - selectedProductForPurchase.price) / selectedProductForPurchase.originalPrice) * 100)}% OFF
                  </span>
                )}
                <button 
                  onClick={(e) => toggleWishlist(selectedProductForPurchase, e)}
                  className={`kids-wishlist-btn-lg ${wishlistIds.includes(selectedProductForPurchase.id) ? 'active' : ''}`}
                  title="Wishlist"
                >
                  <Heart size={20} fill={wishlistIds.includes(selectedProductForPurchase.id) ? 'var(--kids-pink)' : 'none'} color={wishlistIds.includes(selectedProductForPurchase.id) ? 'var(--kids-pink)' : '#071B49'} />
                </button>
              </div>

              {selectedProductForPurchase.images && selectedProductForPurchase.images.length > 1 && (
                <div className="kids-inpage-thumbs-row">
                  {selectedProductForPurchase.images.map((img, iIdx) => (
                    <div 
                      key={iIdx}
                      onClick={() => setActiveGalleryIdx(iIdx)}
                      className={`kids-inpage-thumb-box ${activeGalleryIdx === iIdx ? 'active' : ''}`}
                    >
                      <img src={img} alt="thumbnail" />
                    </div>
                  ))}
                </div>
              )}

              {/* Baby Safe Certification Card */}
              <div className="kids-inpage-assurance-card">
                <div className="kids-assurance-icon"><ShieldCheck size={22} /></div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--kids-navy)' }}>
                    100% Certified Baby-Safe & Skin-Friendly
                  </strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: 'var(--kids-subtext)', lineHeight: 1.45 }}>
                    Stitched using AZO-free hypoallergenic dyes, pre-washed organic threads, and scratch-free labels.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: In-Page Purchase Form & Options */}
            <div className="kids-inpage-purchase-col">
              <div className="kids-detail-meta">
                <span className="kids-eyebrow">READY-TO-WEAR BOUTIQUE</span>
                <h1 className="kids-detail-title">{selectedProductForPurchase.name}</h1>
                
                <div className="kids-detail-rating-row">
                  <div className="kids-stars">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={15} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className="kids-rating-score">{selectedProductForPurchase.rating || 4.9}</span>
                  <span className="kids-rating-count">({selectedProductForPurchase.reviewsCount || 42} verified parent reviews)</span>
                </div>

                <div className="kids-detail-price-box">
                  <span className="kids-detail-price">₹{selectedProductForPurchase.price.toLocaleString()}</span>
                  {selectedProductForPurchase.originalPrice && (
                    <span className="kids-detail-orig-price">₹{selectedProductForPurchase.originalPrice.toLocaleString()}</span>
                  )}
                  <span className="kids-in-stock-tag">In Stock • Ready to Dispatch</span>
                </div>

                <p className="kids-detail-desc">{selectedProductForPurchase.desc}</p>
                {selectedProductForPurchase.fabric && (
                  <div style={{ fontSize: '0.84rem', color: 'var(--kids-subtext)', marginBottom: '14px' }}>
                    <strong>Fabric Composition:</strong> {selectedProductForPurchase.fabric}
                  </div>
                )}
              </div>

              {/* Color Selector */}
              {selectedProductForPurchase.colors && (
                <div className="kids-option-group">
                  <label className="kids-option-label">
                    Color: <strong>{selectedColor || selectedProductForPurchase.colors[0]?.name}</strong>
                  </label>
                  <div className="kids-color-picker-row">
                    {selectedProductForPurchase.colors.map((c, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setSelectedColor(c.name)}
                        className={`kids-color-swatch-circle ${(selectedColor === c.name || (!selectedColor && idx === 0)) ? 'selected' : ''}`}
                        style={{ background: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Age / Size Selector with In-Page Size Guide Toggle */}
              <div className="kids-option-group">
                <div className="kids-size-header-row">
                  <label className="kids-option-label">Select Age / Size</label>
                  <button 
                    type="button" 
                    onClick={() => setInPageSizeGuideOpen(prev => !prev)}
                    className="kids-size-guide-toggle-btn"
                  >
                    <Ruler size={14} /> {inPageSizeGuideOpen ? "Hide Size Guide" : "Size Guide 📐"}
                  </button>
                </div>

                <div className="kids-sizes-buttons-grid">
                  {selectedProductForPurchase.sizes?.map(sz => (
                    <button 
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`kids-size-btn ${selectedSize === sz ? 'active' : ''}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* In-Page Size Guide Table */}
                {inPageSizeGuideOpen && (
                  <div className="kids-inpage-size-table-card">
                    <div className="kids-size-table-title">Standard Indian Kids Size Measurements</div>
                    <table className="kids-size-table">
                      <thead>
                        <tr>
                          <th>Age / Size</th>
                          <th>Chest (inches)</th>
                          <th>Waist (inches)</th>
                          <th>Height (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {KIDS_SIZE_CHART.map((sc, scIdx) => (
                          <tr key={scIdx} className={selectedSize === sc.age ? 'selected-row' : ''}>
                            <td><strong>{sc.age}</strong></td>
                            <td>{sc.chest}</td>
                            <td>{sc.waist}</td>
                            <td>{sc.height}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="kids-option-group kids-qty-row">
                <label className="kids-option-label">Quantity</label>
                <div className="kids-qty-stepper">
                  <button type="button" onClick={() => setProductQuantity(prev => Math.max(1, prev - 1))}>-</button>
                  <span>{productQuantity}</span>
                  <button type="button" onClick={() => setProductQuantity(prev => prev + 1)}>+</button>
                </div>
              </div>

              {/* Highlights Checklist */}
              {selectedProductForPurchase.highlights && (
                <div className="kids-highlights-list">
                  {selectedProductForPurchase.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="kids-highlight-item">
                      <Check size={16} /> {h}
                    </div>
                  ))}
                  <div className="kids-highlight-item"><Check size={16} /> Free Doorstep Size Exchange within 7 Days</div>
                  <div className="kids-highlight-item"><Check size={16} /> Tailored with growth margins for prolonged fit</div>
                </div>
              )}

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="kids-purchase-actions-row">
                <button 
                  type="button"
                  onClick={(e) => handleAddProductToCart(selectedProductForPurchase, selectedSize, selectedColor, productQuantity, e)}
                  className="kids-btn-pink inpage-cta"
                >
                  <ShoppingCart size={18} color="#FFFFFF" stroke="#FFFFFF" />
                  <span style={{ color: '#FFFFFF' }}>Add to Cart</span>
                </button>

                <button 
                  type="button"
                  onClick={(e) => handleBuyNow(selectedProductForPurchase, selectedSize, selectedColor, productQuantity, e)}
                  className="kids-btn-buy-now inpage-cta"
                >
                  <Zap size={18} color="#FFFFFF" stroke="#FFFFFF" />
                  <span style={{ color: '#FFFFFF' }}>Buy Now</span>
                </button>
              </div>

              {/* Customization Opportunity Banner */}
              <div className="kids-custom-upsell-box">
                <div>
                  <strong>Want this outfit custom tailored to exact measurements?</strong>
                  <p>Our fashion designers and tailors can handcraft this design or alter embroidery to your liking.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => onOpenCustomWorkflow('upload')}
                  className="kids-btn-outline"
                  style={{ padding: '8px 18px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                >
                  Customize with Designer
                </button>
              </div>
            </div>
          </div>

          {/* Related Outfits Section */}
          <div className="kids-inpage-related-section">
            <div className="kids-section-header-center" style={{ marginBottom: '24px' }}>
              <span className="kids-eyebrow">COMPLETE THE WARDROBE</span>
              <h3 className="kids-title-serif" style={{ fontSize: '1.7rem' }}>You May Also Love</h3>
            </div>
            <div className="kids-inpage-products-grid">
              {KIDS_SHOP_PRODUCTS.filter(p => p.id !== selectedProductForPurchase.id).slice(0, 4).map(prod => (
                <div 
                  key={prod.id} 
                  className="kids-product-card inpage"
                  onClick={() => handleSelectProductForPurchase(prod)}
                >
                  <div className="kids-product-img-box">
                    <img src={prod.image} alt={prod.name} className="kids-product-img" />
                    {prod.originalPrice && (
                      <span className="kids-discount-pill">
                        {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="kids-product-info">
                    <h4 className="kids-prod-title">{prod.name}</h4>
                    <div className="kids-prod-price">₹{prod.price.toLocaleString()}</div>
                    <div className="kids-inpage-card-actions">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectProductForPurchase(prod);
                        }}
                        className="kids-inpage-buy-btn"
                        style={{ width: '100%', marginTop: '8px' }}
                      >
                        View & Purchase →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* ===================================================================== */}
          {/* SECTION 1: HERO SECTION (100% ULTRA-WIDE BANNER - EXACT REFERENCE UI) */}
          {/* ===================================================================== */}
          <section className="kids-shop-hero">
            <div className="kids-shop-hero-bg-container">
              <img 
                src={KIDS_SHOP_ASSETS.hero} 
                alt="Adorable Outfits Made Just for Them" 
                className="kids-shop-hero-bg-img" 
              />
            </div>

            <div className="kids-shop-hero-content-layer">
              <div className="kids-shop-hero-left">
                <span className="kids-eyebrow">
                  <Sparkles size={14} /> KIDS SHOP & CREATE
                </span>

                <h1 className="kids-hero-main-title">
                  Adorable Outfits
                  <span className="pink-accent">Made Just for Them</span>
                </h1>

                <p className="kids-hero-desc">
                  Shop ready-to-wear designs or create your own unique outfits for every occasion. Premium fabrics, trendy styles and expert stitching for your little ones.
                </p>

                {/* 4 Feature Badges */}
                <div className="kids-hero-features">
                  <div className="kids-hero-feat-item">
                    <div className="kids-hero-feat-icon-box">
                      <Gem size={20} />
                    </div>
                    <span className="kids-hero-feat-label">Trendy Designs</span>
                  </div>

                  <div className="kids-hero-feat-item">
                    <div className="kids-hero-feat-icon-box">
                      <Ruler size={20} />
                    </div>
                    <span className="kids-hero-feat-label">Premium Fabrics</span>
                  </div>

                  <div className="kids-hero-feat-item">
                    <div className="kids-hero-feat-icon-box">
                      <Shirt size={20} />
                    </div>
                    <span className="kids-hero-feat-label">All Age Groups</span>
                  </div>

                  <div className="kids-hero-feat-item">
                    <div className="kids-hero-feat-icon-box">
                      <Scissors size={20} />
                    </div>
                    <span className="kids-hero-feat-label">Expert Stitching</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="kids-hero-buttons">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('trending-kids-outfits');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="kids-btn-pink hero-btn"
                  >
                    Shop Kids Outfits →
                  </button>

                  <button 
                    onClick={() => onOpenCustomWorkflow()}
                    className="kids-btn-outline hero-btn"
                  >
                    Create Custom Design
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* SECTION 2: SHOP BY CATEGORY (10 CARDS)                                */}
          {/* ===================================================================== */}
          <section className="kids-section-container">
            <div className="kids-section-header-center">
              <span className="kids-eyebrow">SHOP BY CATEGORY</span>
              <h2 className="kids-title-serif">Explore Kids Fashion</h2>
              <p className="kids-subtitle">
                Choose from a wide range of outfits or create your own custom design.
              </p>
            </div>

            <div className="kids-category-grid-10">
              {KIDS_SHOP_CATEGORIES.map(cat => (
                <div 
                  key={cat.id} 
                  className={`kids-cat-card ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div className="kids-cat-img-box">
                    <img src={cat.image} alt={cat.title} className="kids-cat-img" />
                  </div>

                  <div>
                    <h3 className="kids-cat-title">{cat.title}</h3>
                    <div className="kids-cat-age">{cat.age}</div>
                  </div>

                  <div className="kids-cat-action">
                    {cat.actionText}
                  </div>
                </div>
              ))}
            </div>

            {/* IN-PAGE CATEGORY OUTFITS BROWSER */}
            <div id="kids-category-outfits" ref={categoryOutfitsSectionRef} className="kids-inpage-category-browser">
              <div className="kids-inpage-cat-header">
                <div>
                  <span className="kids-eyebrow">
                    {selectedCategory === 'all' ? 'ALL KIDS COLLECTIONS' : (currentCategoryObj?.title.toUpperCase() || 'COLLECTION')}
                  </span>
                  <h3 className="kids-title-serif" style={{ fontSize: '1.85rem', margin: '4px 0 6px 0' }}>
                    {selectedCategory === 'all' 
                      ? 'Browse All Outfits' 
                      : `${currentCategoryObj?.title} ${currentCategoryObj?.age ? `${currentCategoryObj.age}` : ''}`}
                  </h3>
                  <p className="kids-subtitle" style={{ margin: 0 }}>
                    {currentCategoryObj?.desc || 'Showing handpicked boutique designs handcrafted for your little stars.'}
                  </p>
                </div>

                {/* Filter & Sort Controls */}
                <div className="kids-inpage-cat-controls">
                  <div className="kids-inpage-cat-search-box">
                    <Search size={16} />
                    <input 
                      type="text" 
                      placeholder="Search outfits, fabric..." 
                      value={inPageSearchQuery}
                      onChange={(e) => setInPageSearchQuery(e.target.value)}
                    />
                    {inPageSearchQuery && (
                      <button onClick={() => setInPageSearchQuery('')} className="kids-clear-search-btn">
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <div className="kids-inpage-cat-sort">
                    <SlidersHorizontal size={15} />
                    <select value={inPageSortBy} onChange={(e) => setInPageSortBy(e.target.value)}>
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Customer Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="kids-inpage-cat-pills-row">
                <button 
                  className={`kids-cat-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Outfits ({KIDS_SHOP_PRODUCTS.length})
                </button>
                {KIDS_SHOP_CATEGORIES.filter(c => !c.isCustom).map(c => {
                  const count = KIDS_SHOP_PRODUCTS.filter(p => p.category === c.id).length;
                  return (
                    <button
                      key={c.id}
                      className={`kids-cat-pill ${selectedCategory === c.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(c.id)}
                    >
                      {c.title} {count > 0 ? `(${count})` : ''}
                    </button>
                  );
                })}
              </div>

              {/* In-Page Products Grid */}
              {inPageFilteredProducts.length > 0 ? (
                <div className="kids-inpage-products-grid">
                  {inPageFilteredProducts.map(prod => {
                    const isWishlisted = wishlistIds.includes(prod.id);
                    return (
                      <div 
                        key={prod.id} 
                        className="kids-product-card inpage"
                        onClick={() => handleSelectProductForPurchase(prod)}
                      >
                        <div className="kids-product-img-box">
                          <img src={prod.image} alt={prod.name} className="kids-product-img" />
                          {prod.originalPrice && (
                            <span className="kids-discount-pill">
                              {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% OFF
                            </span>
                          )}
                          <button 
                            onClick={(e) => toggleWishlist(prod, e)}
                            className={`kids-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <Heart size={16} fill={isWishlisted ? 'var(--kids-pink)' : 'none'} color={isWishlisted ? 'var(--kids-pink)' : 'currentColor'} />
                          </button>
                        </div>

                        <div className="kids-product-info">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span className="kids-prod-cat-badge">
                              {KIDS_SHOP_CATEGORIES.find(c => c.id === prod.category)?.title || 'Kids'}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>
                              <Star size={13} fill="#f59e0b" color="#f59e0b" />
                              <span>{prod.rating || 4.9}</span>
                            </div>
                          </div>

                          <h4 className="kids-prod-title">{prod.name}</h4>

                          <div className="kids-prod-price-row">
                            <div className="kids-prod-price">₹{prod.price.toLocaleString()}</div>
                            {prod.originalPrice && (
                              <div className="kids-prod-price-orig">₹{prod.originalPrice.toLocaleString()}</div>
                            )}
                          </div>

                          <div className="kids-prod-footer-row">
                            <div className="kids-swatches-row">
                              {prod.colors?.slice(0, 3).map((col, cIdx) => (
                                <div 
                                  key={cIdx} 
                                  className="kids-swatch-dot" 
                                  style={{ background: col.hex }} 
                                  title={col.name} 
                                />
                              ))}
                            </div>

                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddProductToCart(prod, prod.sizes[0], prod.colors[0]?.name, 1, e);
                                }}
                                className="kids-add-cart-btn"
                                title="Add to Cart"
                              >
                                <ShoppingCart size={15} color="#FFFFFF" stroke="#FFFFFF" />
                              </button>

                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectProductForPurchase(prod);
                                }}
                                className="kids-inpage-buy-btn"
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="kids-empty-state">
                  <p>No outfits found matching your search.</p>
                  <button 
                    onClick={() => { setSelectedCategory('all'); setInPageSearchQuery(''); }} 
                    className="kids-btn-outline"
                  >
                    View All Outfits
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ===================================================================== */}
          {/* SECTION 3: TRENDING KIDS OUTFITS (CAROUSEL)                           */}
          {/* ===================================================================== */}
          <section id="trending-kids-outfits" className="kids-section-container" style={{ paddingTop: '20px' }}>
            <div className="kids-trending-header-row">
              <div>
                <span className="kids-eyebrow">TRENDING KIDS OUTFITS</span>
                <h2 className="kids-title-serif" style={{ margin: '0 0 6px 0' }}>Most Loved Designs</h2>
                <p className="kids-subtitle">
                  Beautiful, comfortable and handcrafted outfits for your little ones.
                </p>
              </div>

              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  const el = document.getElementById('kids-category-outfits');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--kids-pink)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.92rem'
                }}
              >
                View All Outfits →
              </button>
            </div>

            <div className="kids-trending-carousel-wrap">
              <button 
                onClick={() => scrollTrending('left')}
                className="kids-carousel-nav-btn prev"
                aria-label="Previous Products"
              >
                <ChevronLeft size={20} />
              </button>

              <button 
                onClick={() => scrollTrending('right')}
                className="kids-carousel-nav-btn next"
                aria-label="Next Products"
              >
                <ChevronRight size={20} />
              </button>

              <div 
                ref={trendingCarouselRef}
                style={{
                  display: 'flex',
                  gap: '16px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  paddingBottom: '16px',
                  scrollbarWidth: 'none'
                }}
              >
                {KIDS_SHOP_PRODUCTS.filter(p => p.isTrending).map(prod => {
                  const isWishlisted = wishlistIds.includes(prod.id);
                  return (
                    <div 
                      key={prod.id}
                      className="kids-product-card"
                      style={{ flex: '0 0 215px', scrollSnapAlign: 'start' }}
                      onClick={() => handleSelectProductForPurchase(prod)}
                    >
                      <div className="kids-product-img-box">
                        <img src={prod.image} alt={prod.name} className="kids-product-img" />
                        
                        <button 
                          onClick={(e) => toggleWishlist(prod, e)}
                          className={`kids-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <Heart size={16} fill={isWishlisted ? 'var(--kids-pink)' : 'none'} color={isWishlisted ? 'var(--kids-pink)' : 'currentColor'} />
                        </button>
                      </div>

                      <div className="kids-product-info">
                        <h3 className="kids-prod-title">{prod.name}</h3>
                        <div className="kids-prod-price">₹{prod.price.toLocaleString()}</div>

                        <div className="kids-prod-footer-row">
                          <div className="kids-swatches-row">
                            {prod.colors?.slice(0, 3).map((col, cIdx) => (
                              <div 
                                key={cIdx} 
                                className="kids-swatch-dot"
                                style={{ background: col.hex }}
                                title={col.name}
                              />
                            ))}
                          </div>

                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddProductToCart(prod, prod.sizes[0], prod.colors[0]?.name, 1, e);
                              }}
                              className="kids-add-cart-btn"
                              title="Add to Cart"
                            >
                              <ShoppingCart size={15} color="#FFFFFF" stroke="#FFFFFF" />
                            </button>

                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectProductForPurchase(prod);
                              }}
                              className="kids-inpage-buy-btn"
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* ===================================================================== */}
          {/* SECTION 4: CUSTOM KIDS OUTFIT STUDIO (EXACT MATCH REFERENCE IMAGE 4)  */}
          {/* ===================================================================== */}
          <section className="kids-section-container" style={{ paddingTop: '20px' }}>
            <div className="kids-custom-studio-card">
              {/* Left Column: Heading, Subtext, Button */}
              <div className="kids-studio-left">
                <span className="kids-eyebrow">CUSTOM KIDS OUTFIT STUDIO</span>
                
                <h2 className="kids-studio-title">
                  <span className="navy-line">Design Your</span>
                  <span className="pink-line">Child's Dream Outfit</span>
                </h2>

                <p className="kids-subtitle">
                  Choose the style, fabric, color, measurements and details. Our expert designers and tailors will bring your design to life.
                </p>

                <button 
                  onClick={() => onOpenCustomWorkflow()}
                  className="kids-btn-pink studio-cta-btn"
                >
                  Start Designing →
                </button>
              </div>

              {/* Center Column: Sketching Artwork Image with full height fitting, dual edge fade, and cursive overlay */}
              <div className="kids-studio-center">
                <div className="kids-studio-img-wrap">
                  <img 
                    src={KIDS_SHOP_ASSETS.customStudio} 
                    alt="Their Imagination Our Stitching" 
                    className="kids-studio-center-img"
                  />
                  <div className="kids-studio-fade-left" />
                  <div className="kids-studio-fade-right" />
                  
                  {/* Decorative cursive script & heart matching Reference Image 4 */}
                  <div className="kids-studio-cursive-badge">
                    <span className="cursive-line">Their</span>
                    <span className="cursive-line">Imagination</span>
                    <span className="cursive-line">Our Stitching</span>
                    <span className="cursive-heart">♡</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 6 Process Step Cards (2x3 Grid) */}
              <div className="kids-studio-right-wrap">
                <div className="kids-studio-right-grid">
                  {KIDS_STUDIO_STEPS.map(st => (
                    <div 
                      key={st.id} 
                      className="kids-studio-step-box"
                      onClick={() => onOpenCustomWorkflow(st.id)}
                    >
                      <div className="kids-studio-step-icon">
                        {st.id === 'upload' && <Image size={24} />}
                        {st.id === 'style-fabric' && <Shirt size={24} />}
                        {st.id === 'measurements' && <Ruler size={24} />}
                        {st.id === 'personalization' && <Type size={24} />}
                        {st.id === 'quote' && <FileText size={24} />}
                        {st.id === 'delivery' && <Truck size={24} />}
                      </div>
                      <h4 className="kids-studio-step-title">{st.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* SECTION 5: PREMIUM FABRICS FOR KIDS (10 SWATCHES)                     */}
          {/* ===================================================================== */}
          <section className="kids-section-container" style={{ paddingTop: '30px' }}>
            <div className="kids-trending-header-row">
              <div>
                <span className="kids-eyebrow">PREMIUM FABRICS FOR KIDS</span>
                <h2 className="kids-title-serif" style={{ margin: '0 0 6px 0' }}>Soft, Safe & Stylish Fabrics</h2>
                <p className="kids-subtitle">
                  Wide range of high-quality, breathable and skin-friendly fabrics.
                </p>
              </div>

              {inPageSelectedFabric && (
                <button 
                  onClick={() => setInPageSelectedFabric(null)}
                  className="kids-btn-outline"
                  style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                >
                  Close Fabric Details ✕
                </button>
              )}
            </div>

            <div className="kids-trending-carousel-wrap">
              <button 
                onClick={() => scrollFabrics('left')}
                className="kids-carousel-nav-btn prev"
                aria-label="Previous Fabrics"
              >
                <ChevronLeft size={20} />
              </button>

              <button 
                onClick={() => scrollFabrics('right')}
                className="kids-carousel-nav-btn next"
                aria-label="Next Fabrics"
              >
                <ChevronRight size={20} />
              </button>

              <div 
                ref={fabricsCarouselRef}
                style={{
                  display: 'flex',
                  gap: '16px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  paddingBottom: '16px',
                  scrollbarWidth: 'none'
                }}
              >
                {KIDS_SHOP_FABRICS.map(fab => (
                  <div 
                    key={fab.id} 
                    className={`kids-fabric-card ${inPageSelectedFabric?.id === fab.id ? 'active' : ''}`}
                    style={{ flex: '0 0 110px', scrollSnapAlign: 'start' }}
                    onClick={() => setInPageSelectedFabric(fab)}
                  >
                    <div className="kids-fabric-img-wrap">
                      <img src={fab.image} alt={fab.name} className="kids-fabric-img" />
                    </div>
                    <div className="kids-fabric-name">{fab.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* In-Page Fabric Details Inspector (No Pop-up) */}
            {inPageSelectedFabric && (
              <div className="kids-inpage-fabric-inspector">
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img 
                    src={inPageSelectedFabric.image} 
                    alt={inPageSelectedFabric.name} 
                    style={{ width: '90px', height: '90px', borderRadius: '14px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <span className="kids-eyebrow">CERTIFIED BABY-SAFE FABRIC</span>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '2px 0', color: 'var(--kids-navy)' }}>
                      {inPageSelectedFabric.name}
                    </h4>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--kids-pink)', marginBottom: '4px' }}>
                      ₹{inPageSelectedFabric.pricePerMeter} / meter
                    </div>
                    <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--kids-subtext)' }}>
                      {inPageSelectedFabric.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => onOpenCustomWorkflow('style-fabric', inPageSelectedFabric)}
                      className="kids-btn-pink"
                      style={{ padding: '8px 18px', fontSize: '0.84rem' }}
                    >
                      Use in Custom Design →
                    </button>
                    <button 
                      onClick={() => setInPageSelectedFabric(null)}
                      className="kids-btn-outline"
                      style={{ padding: '8px 14px', fontSize: '0.84rem' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ===================================================================== */}
          {/* SECTION 6: HOW IT WORKS (5 STEPS + FADING ARTWORK - MATCH IMAGE 2)    */}
          {/* ===================================================================== */}
          <section className="kids-how-it-works-section">
            <div className="kids-how-it-works-grid">
              {/* Left Column: Heading and 5 Flow Steps */}
              <div className="kids-how-it-works-left">
                <span className="kids-eyebrow">HOW IT WORKS</span>
                <h2 className="kids-title-serif">From Idea to Perfect Outfit</h2>
                <p className="kids-subtitle">
                  A simple and transparent process to create or buy your child's outfit.
                </p>

                <div className="kids-steps-flow">
                  {KIDS_HOW_IT_WORKS_STEPS.map((st, sIdx) => (
                    <React.Fragment key={st.num}>
                      <div className="kids-step-node">
                        <div className="kids-step-icon-circle">
                          {st.num === '1' && <Shirt size={22} />}
                          {st.num === '2' && <Layers size={22} />}
                          {st.num === '3' && <Ruler size={22} />}
                          {st.num === '4' && <Scissors size={22} />}
                          {st.num === '5' && <Truck size={22} />}
                        </div>
                        <h4 className="kids-step-title">{st.num}. {st.title}</h4>
                        <p className="kids-step-desc">{st.desc}</p>
                      </div>

                      {sIdx < KIDS_HOW_IT_WORKS_STEPS.length - 1 && (
                        <div className="kids-step-arrow">
                          <ArrowRight size={18} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Right Column: Smiling Boy in Suit Artwork with edge fade */}
              <div className="kids-how-it-works-right">
                <div className="kids-how-it-works-img-wrap">
                  <img 
                    src={KIDS_SHOP_ASSETS.howItWorks} 
                    alt="Stylish Comfortable Unique" 
                    className="kids-how-it-works-img"
                  />
                  <div className="kids-how-fade-left" />
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* SECTION 7: BOTTOM PROMOTIONAL BANNER                                  */}
          {/* ===================================================================== */}
          <section className="kids-section-container" style={{ paddingTop: '20px', paddingBottom: '70px' }}>
            <div className="kids-promo-banner-card">
              <img 
                src={KIDS_SHOP_ASSETS.bottomBanner} 
                alt="Every Occasion A Special Outfit" 
                className="kids-promo-banner-bg" 
              />

              <div className="kids-promo-banner-content">
                <div className="kids-promo-banner-left">
                  <h2 className="kids-promo-banner-title">
                    Every Occasion <br />
                    A Special Outfit
                  </h2>
                  <p className="kids-promo-banner-desc">
                    Custom stitched outfits for birthdays, festivals, school and everyday wear.
                  </p>
                </div>

                <div className="kids-promo-banner-buttons">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('trending-kids-outfits');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="kids-btn-pink hero-btn"
                  >
                    Shop Kids Outfits →
                  </button>

                  <button 
                    onClick={() => onOpenCustomWorkflow()}
                    className="kids-btn-outline hero-btn"
                  >
                    Create Custom Design
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

    </div>
  );
}
