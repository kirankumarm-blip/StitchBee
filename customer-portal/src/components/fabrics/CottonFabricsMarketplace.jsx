import React, { useState, useMemo, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Sliders, 
  Grid, 
  List, 
  Heart, 
  ShoppingCart, 
  Scissors, 
  Star, 
  ChevronDown, 
  ChevronLeft, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  ArrowRight, 
  Eye, 
  RotateCcw, 
  Award, 
  Layers, 
  X, 
  Filter,
  Gem,
  Feather,
  Wind,
  Shirt,
  Crown
} from 'lucide-react';
import './CottonFabricsMarketplace.css';
import ShopAndStitchPage from './ShopAndStitchPage';
import { 
  COTTON_FABRICS, 
  FABRIC_CATEGORIES, 
  PATTERN_FILTERS, 
  COLOR_SWATCHES, 
  WIDTH_FILTERS, 
  USAGE_FILTERS, 
  BRAND_FILTERS
} from './cottonFabricsData';
import AddToCartModal from './AddToCartModal';
import ShopAndStitchModal from './ShopAndStitchModal';
import FabricDetailsModal from './FabricDetailsModal';


const getCategoryIcon = (id) => {
  switch(id) {
    case 'cotton': return <Gem size={15} />;
    case 'silk': return <Shirt size={15} />;
    case 'linen': return <Layers size={15} />;
    case 'chiffon': return <Feather size={15} />;
    case 'georgette': return <Wind size={15} />;
    case 'denim': return <Scissors size={15} />;
    case 'velvet': return <Crown size={15} />;
    case 'net': return <Grid size={15} />;
    default: return <Sparkles size={15} />;
  }
};

export default function CottonFabricsMarketplace({
  theme = 'light',
  currentUser = null,
  onLoginRequired,
  cart = [],
  setCart,
  setCartOpen,
  wishlist = [],
  setWishlist,
  orders = [],
  addOrder,
  tailors = [],
  onNavigate
}) {
  const isDark = theme === 'dark';

  // --- FILTERS STATE ---
  const [activeCategory, setActiveCategory] = useState('cotton');
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceRange, setPriceRange] = useState([50, 2000]);
  const [selectedWidths, setSelectedWidths] = useState([]);
  const [selectedUsages, setSelectedUsages] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showAllPatterns, setShowAllPatterns] = useState(false);

  // --- VIEW & SORT STATE ---
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity' | 'price-low' | 'price-high' | 'newest' | 'rating' | 'bestselling'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // --- MODALS STATE ---
  const [cartModalProduct, setCartModalProduct] = useState(null);
  const [stitchModalProduct, setStitchModalProduct] = useState(null);
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && (window.location.pathname.includes('/shop-and-stitch') || window.location.pathname.includes('/shop-stitch'))) {
      return 'shop-and-stitch';
    }
    return 'marketplace';
  });
  const [selectedFabricForStitch, setSelectedFabricForStitch] = useState(null);

  // Popstate listener for back/forward navigation
  useEffect(() => {
    const handlePop = () => {
      if (window.location.pathname.includes('/shop-and-stitch') || window.location.pathname.includes('/shop-stitch')) {
        setCurrentView('shop-and-stitch');
      } else {
        setCurrentView('marketplace');
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // --- TOAST NOTIFICATION ---
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // --- NEWSLETTER STATE ---
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  // --- FILTER RESET ---
  const handleClearAllFilters = () => {
    setSelectedPatterns([]);
    setSelectedColor(null);
    setPriceRange([50, 2000]);
    setSelectedWidths([]);
    setSelectedUsages([]);
    setSelectedBrands([]);
    setCurrentPage(1);
    showToast('All filters have been reset');
  };

  const isFilterActive = useMemo(() => {
    return (
      selectedPatterns.length > 0 ||
      selectedColor !== null ||
      priceRange[1] < 2000 ||
      selectedWidths.length > 0 ||
      selectedUsages.length > 0 ||
      selectedBrands.length > 0
    );
  }, [selectedPatterns, selectedColor, priceRange, selectedWidths, selectedUsages, selectedBrands]);

  // Toggle helpers for multi-select checkboxes
  const togglePattern = (pattern) => {
    setCurrentPage(1);
    setSelectedPatterns((prev) => 
      prev.includes(pattern) ? prev.filter((p) => p !== pattern) : [...prev, pattern]
    );
  };

  const toggleWidth = (width) => {
    setCurrentPage(1);
    setSelectedWidths((prev) => 
      prev.includes(width) ? prev.filter((w) => w !== width) : [...prev, width]
    );
  };

  const toggleUsage = (usage) => {
    setCurrentPage(1);
    setSelectedUsages((prev) => 
      prev.includes(usage) ? prev.filter((u) => u !== usage) : [...prev, usage]
    );
  };

  const toggleBrand = (brand) => {
    setCurrentPage(1);
    setSelectedBrands((prev) => 
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // --- FILTERED & SORTED PRODUCTS ---
  const filteredProducts = useMemo(() => {
    let result = COTTON_FABRICS.filter((product) => {
      // Pattern Filter (OR within group)
      if (selectedPatterns.length > 0 && !selectedPatterns.includes(product.pattern)) {
        return false;
      }

      // Color Swatch Filter
      if (selectedColor) {
        const matchesColorName = product.color?.toLowerCase() === selectedColor.toLowerCase();
        const matchesColorHex = product.colorHex?.toLowerCase() === selectedColor.toLowerCase();
        if (!matchesColorName && !matchesColorHex) return false;
      }

      // Price Range Filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Width Filter (OR within group)
      if (selectedWidths.length > 0 && !selectedWidths.includes(product.width)) {
        return false;
      }

      // Usage Filter (OR within group)
      if (selectedUsages.length > 0) {
        const hasMatchingUsage = product.usage?.some((u) => selectedUsages.includes(u));
        if (!hasMatchingUsage) return false;
      }

      // Brand Filter (OR within group)
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      return true;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0);
      if (sortBy === 'bestselling') return (b.badge === 'Bestseller' ? 1 : 0) - (a.badge === 'Bestseller' ? 1 : 0);
      // Popularity (default): matches exact reference screenshot initial sequence
      return 0;
    });

    return result;
  }, [selectedPatterns, selectedColor, priceRange, selectedWidths, selectedUsages, selectedBrands, sortBy]);

  // Dynamic count calculation
  const totalCount = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // --- WISHLIST MANAGEMENT ---
  const isProductInWishlist = (product) => {
    if (!wishlist || !Array.isArray(wishlist)) return false;
    return wishlist.some((item) => item.id === product.id || item.name === product.name);
  };

  const handleToggleWishlist = (product, e) => {
    if (e) e.stopPropagation();
    if (!setWishlist) return;

    if (isProductInWishlist(product)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id && item.name !== product.name));
      showToast(`Removed "${product.name}" from Wishlist`);
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.image,
        image: product.image,
        rating: product.rating,
        category: 'fabric',
        brand: product.brand,
        addedAt: new Date().toISOString()
      };
      setWishlist((prev) => [newItem, ...(prev || [])]);
      showToast(`Added "${product.name}" to Wishlist! ❤️`);
    }
  };

  // --- CART ADD HANDLER ---
  const handleAddToCartConfirm = (cartItem) => {
    if (!setCart) return;

    const existingIndex = cart.findIndex((c) => c.id === cartItem.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex] = {
        ...updated[existingIndex],
        qty: updated[existingIndex].qty + cartItem.qty,
        total: (updated[existingIndex].qty + cartItem.qty) * cartItem.price
      };
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          id: cartItem.id,
          name: cartItem.name,
          price: cartItem.price,
          unitPrice: cartItem.price,
          length: cartItem.length,
          width: cartItem.width,
          image: cartItem.image,
          type: 'fabric',
          qty: cartItem.qty,
          total: cartItem.total
        }
      ]);
    }

    showToast(`Added ${cartItem.length}m of "${cartItem.fabric.name}" to Cart! 🛒`);
    setCartModalProduct(null);
  };

  // --- STITCH ORDER CONFIRM HANDLER ---
  const handleStitchOrderConfirm = (orderData) => {
    if (addOrder) {
      addOrder(orderData);
    }
    showToast(`StitchBeez Order #${orderData.id} placed successfully! ✂️`);
  };

  // --- NEWSLETTER SUBMIT ---
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setNewsletterStatus({ type: 'success', message: 'Thank you! You are now subscribed for new fabric arrivals & 20% off.' });
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus(null), 5000);
  };

  const visiblePatterns = showAllPatterns ? PATTERN_FILTERS : PATTERN_FILTERS.slice(0, 5);

  if (currentView === 'shop-and-stitch') {
    return (
      <ShopAndStitchPage
        fabric={selectedFabricForStitch || filteredProducts[0] || COTTON_FABRICS[0]}
        allFabrics={COTTON_FABRICS}
        theme={theme}
        currentUser={currentUser}
        onLoginRequired={onLoginRequired}
        cart={cart}
        setCart={setCart}
        setCartOpen={setCartOpen}
        addOrder={addOrder}
        onBack={() => {
          setCurrentView('marketplace');
          window.history.pushState(null, '', '/fabrics');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        showToast={showToast}
      />
    );
  }

  return (
    <div className={`cotton-fabrics-page-root ${isDark ? 'dark-mode' : 'light-mode'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#07145C',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(7, 20, 92, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          fontSize: '13.5px',
          fontWeight: '600',
          borderLeft: '4px solid #FF008A',
          animation: 'slideInRight 0.3s ease'
        }}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO BANNER - 100% Full Width Panoramic Image */}
      <section className="fabric-hero-banner">
        <img 
          src="/fabric_marketplace/HERO.png" 
          alt="Cotton Fabrics Collection" 
          className="fabric-hero-bg-img"
          loading="eager"
        />
        <div className="fabric-hero-overlay-content">
          <h1 className="fabric-hero-title">
            <span className="title-navy">Cotton </span>
            <span className="title-pink">Fabrics</span>
          </h1>
          <p className="fabric-hero-desc">
            Everyday comfort with endless possibilities. Explore soft, breathable cotton fabrics in a variety of prints, colours and patterns.
          </p>
          <div className="fabric-hero-highlights">
            <div className="hero-pill-badge">
              <span className="pill-icon"><Sparkles size={13} /></span>
              <span>Breathable & Comfortable</span>
            </div>
            <div className="hero-pill-badge">
              <span className="pill-icon"><Layers size={13} /></span>
              <span>Wide Range of Prints</span>
            </div>
            <div className="hero-pill-badge">
              <span className="pill-icon"><CheckCircle2 size={13} /></span>
              <span>Perfect for Everyday Wear</span>
            </div>
            <div className="hero-pill-badge">
              <span className="pill-icon"><Scissors size={13} /></span>
              <span>Ideal for All Outfits</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Button */}
      <div className="mobile-filter-trigger-bar">
        <button 
          className="btn-mobile-filter"
          onClick={() => setMobileFilterOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--sb-pink)',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '16px',
            cursor: 'pointer'
          }}
        >
          <Filter size={15} /> Filter Fabrics {isFilterActive && '(Active)'}
        </button>
      </div>

      {/* 3. MAIN CONTENT LAYOUT */}
      <div className="fabric-main-layout">
        
        {/* 4. FILTER SIDEBAR */}
        {mobileFilterOpen && (
        <div 
          className="sidebar-mobile-backdrop" 
          onClick={() => setMobileFilterOpen(false)} 
        />
      )}
      <aside className={`fabric-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">
            <h2 className="sidebar-title">Filters</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                type="button" 
                className="sidebar-clear-all" 
                onClick={handleClearAllFilters}
              >
                Clear All
              </button>
              <button 
                type="button" 
                className="sidebar-close-mobile-btn" 
                onClick={() => setMobileFilterOpen(false)}
                title="Close Filters"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Fabric Category Filter */}
          <div className="filter-section">
            <h3 className="filter-heading">Fabric Category</h3>
            <div className="category-filter-list">
              {FABRIC_CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  className={`category-filter-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id !== 'cotton') {
                      showToast(`Showing ${cat.name}. You can switch back to Cotton anytime.`);
                    }
                  }}
                >
                  <span className="category-item-icon">{getCategoryIcon(cat.id)}</span>
                  <span className="category-item-name">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pattern Filter */}
          <div className="filter-section">
            <h3 className="filter-heading">Pattern</h3>
            <div className="checkbox-list">
              {visiblePatterns.map((pat) => (
                <label key={pat.id} className="filter-checkbox-item">
                  <div className="checkbox-label-group">
                    <input 
                      type="checkbox" 
                      checked={selectedPatterns.includes(pat.id)} 
                      onChange={() => togglePattern(pat.id)}
                    />
                    <span>{pat.label}</span>
                  </div>
                  <span className="filter-item-count">{pat.count}</span>
                </label>
              ))}
            </div>
            <button 
              type="button" 
              className="filter-show-more"
              onClick={() => setShowAllPatterns(!showAllPatterns)}
            >
              {showAllPatterns ? 'Show Less' : 'Show More'}
            </button>
          </div>

          {/* Colour Swatches */}
          <div className="filter-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="filter-heading">Colour</h3>
              {selectedColor && (
                <button 
                  onClick={() => setSelectedColor(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--sb-pink)', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}
                >
                  Reset
                </button>
              )}
            </div>
            <div className="color-swatches-grid">
              {COLOR_SWATCHES.map((swatch) => {
                const isSelected = selectedColor === swatch.label || selectedColor === swatch.hex;
                return (
                  <div 
                    key={swatch.id}
                    className={`color-swatch-circle ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.label}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedColor(null);
                      } else {
                        setSelectedColor(swatch.label);
                        setCurrentPage(1);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-section">
            <h3 className="filter-heading">Price Range</h3>
            <input 
              type="range" 
              min="50" 
              max="2000" 
              step="50"
              value={priceRange[1]} 
              onChange={(e) => {
                setPriceRange([50, parseInt(e.target.value, 10)]);
                setCurrentPage(1);
              }}
              className="price-slider-track"
            />
            <div className="price-range-labels">
              <span>₹50</span>
              <span style={{ color: 'var(--sb-pink)', fontWeight: '800' }}>Up to ₹{priceRange[1]}</span>
              <span>₹2,000+</span>
            </div>
          </div>

          {/* Fabric Width */}
          <div className="filter-section">
            <h3 className="filter-heading">Fabric Width</h3>
            <div className="checkbox-list">
              {WIDTH_FILTERS.map((wf) => (
                <label key={wf.id} className="filter-checkbox-item">
                  <div className="checkbox-label-group">
                    <input 
                      type="checkbox" 
                      checked={selectedWidths.includes(wf.id)} 
                      onChange={() => toggleWidth(wf.id)}
                    />
                    <span>{wf.label}</span>
                  </div>
                  <span className="filter-item-count">{wf.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Usage Filter */}
          <div className="filter-section">
            <h3 className="filter-heading">Usage</h3>
            <div className="checkbox-list">
              {USAGE_FILTERS.map((uf) => (
                <label key={uf.id} className="filter-checkbox-item">
                  <div className="checkbox-label-group">
                    <input 
                      type="checkbox" 
                      checked={selectedUsages.includes(uf.id)} 
                      onChange={() => toggleUsage(uf.id)}
                    />
                    <span>{uf.label}</span>
                  </div>
                  <span className="filter-item-count">{uf.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="filter-section">
            <h3 className="filter-heading">Brand</h3>
            <div className="checkbox-list">
              {BRAND_FILTERS.map((bf) => (
                <label key={bf.id} className="filter-checkbox-item">
                  <div className="checkbox-label-group">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(bf.id)} 
                      onChange={() => toggleBrand(bf.id)}
                    />
                    <span>{bf.label}</span>
                  </div>
                  <span className="filter-item-count">{bf.count}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* 5. PRODUCT LISTING & TOOLBAR */}
        <main className="fabric-products-container">
          
          {/* Toolbar */}
          <div className="fabric-toolbar">
            <h2 className="fabric-count-title">
              120+ Cotton Fabrics
            </h2>

            <div className="fabric-toolbar-actions">
              <div className="sort-dropdown-wrapper">
                <span className="sort-label">Sort by:</span>
                <select 
                  className="sort-select" 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="bestselling">Bestselling</option>
                </select>
              </div>

              <div className="view-mode-toggle">
                <button 
                  type="button" 
                  className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View (5 Columns)"
                >
                  <Grid size={16} />
                </button>
                <button 
                  type="button" 
                  className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="fabric-empty-state">
              <div className="empty-state-icon">
                <Sliders size={32} />
              </div>
              <h3 className="empty-state-title">No Cotton Fabrics Found</h3>
              <p className="empty-state-desc">
                We couldn't find any fabrics matching your selected filters. Try broadening your price range or clearing selected patterns and colours.
              </p>
              <button 
                type="button" 
                className="btn-empty-reset" 
                onClick={handleClearAllFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* 6. PRODUCT GRID (5 COLUMNS) */
            <div className={viewMode === 'grid' ? 'fabric-grid-5cols' : 'fabric-grid-listview'}>
              {paginatedProducts.map((product) => {
                const inWishlist = isProductInWishlist(product);
                return (
                  <article key={product.id} className="fabric-card">
                    {/* Badge */}
                    {product.badge && (
                      <span className={`fabric-card-badge badge-${product.badgeType || 'bestseller'}`}>
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Heart Button */}
                    <button 
                      type="button" 
                      className={`fabric-wishlist-btn ${inWishlist ? 'active' : ''}`}
                      onClick={(e) => handleToggleWishlist(product, e)}
                      title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart 
                        size={15} 
                        fill={inWishlist ? 'var(--sb-pink)' : 'none'} 
                        color={inWishlist ? 'var(--sb-pink)' : 'currentColor'} 
                      />
                    </button>

                    {/* Product Image Box */}
                    <div 
                      className="fabric-card-img-box" 
                      onClick={() => setDetailsModalProduct(product)}
                      title={`View details for ${product.name}`}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="fabric-card-img" 
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/fabric_marketplace/Floral Cotton Print.png';
                        }}
                      />
                    </div>

                    {/* Product Card Body */}
                    <div className="fabric-card-body">
                      <h3 
                        className="fabric-card-title" 
                        onClick={() => setDetailsModalProduct(product)}
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      <div className="fabric-card-price-row">
                        <span className="fabric-price-val">₹{product.price}</span>
                        <span className="fabric-price-unit">/ metre</span>
                      </div>

                      <div className="fabric-card-rating">
                        <Star size={11} className="rating-star-icon" />
                        <span>{product.rating}</span>
                        <span className="rating-count">({product.reviews})</span>
                      </div>

                      {/* Card Actions: Add to Cart + Shop & Stitch */}
                      <div className="fabric-card-actions">
                        <button 
                          type="button" 
                          className="btn-add-cart"
                          onClick={() => setCartModalProduct(product)}
                          title="Add fabric to cart"
                        >
                          <ShoppingCart size={12} />
                          <span>Add to Cart</span>
                        </button>

                        <button 
                          type="button" 
                          className="btn-shop-stitch"
                          onClick={() => setStitchModalProduct(product)}
                          title="Custom tailor with local verified boutique"
                        >
                          <Scissors size={12} />
                          <span>Shop & Stitch</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* 7. PAGINATION */}
          <div className="fabric-pagination-row">
            <div className="fabric-pages-list">
              <button 
                type="button" 
                className="page-arrow-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                title="Previous Page"
                style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={16} />
              </button>

              {[1, 2, 3, 4, 5].map((num) => (
                <button 
                  key={num}
                  type="button" 
                  className={`page-num-btn ${currentPage === num ? 'active' : ''}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}

              <span style={{ color: '#A0AEC0', padding: '0 4px', fontSize: '14px' }}>..</span>

              <button 
                type="button" 
                className={`page-num-btn ${currentPage === 12 ? 'active' : ''}`}
                onClick={() => setCurrentPage(12)}
              >
                12
              </button>

              <button 
                type="button" 
                className="page-arrow-btn"
                onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
                title="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="page-size-selector">
              <span>Show</span>
              <select 
                className="page-size-select"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
              >
                <option value={20}>20 per page</option>
                <option value={40}>40 per page</option>
                <option value={60}>60 per page</option>
              </select>
            </div>
          </div>

          {/* 8. PROMOTIONAL BANNERS ROW */}
          <div className="fabric-promo-banners-row">
            {/* Banner 1: Buy Fabric Get it Stitched */}
            <div 
              className="promo-banner-card promo-banner-card-1"
              onClick={() => {
                setSelectedFabricForStitch(filteredProducts[0] || COTTON_FABRICS[0]);
                setCurrentView('shop-and-stitch');
                window.history.pushState(null, '', '/shop-and-stitch');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Buy Fabric Get it Stitched - Shop & Book Tailor"
            >
              <img 
                src="/fabric_marketplace/Buy Fabric Get it Stitched Left Image.png" 
                alt="Buy Fabric Get it Stitched" 
                className="promo-banner-bg-img"
              />
              <div className="promo-banner-content-center">
                <h3 className="promo-banner-heading">
                  Buy Fabric<br />
                  <span className="promo-banner-sub">Get it Stitched</span>
                </h3>
                <div className="promo-banner-checklist">
                  <div className="promo-check-item">
                    <CheckCircle2 size={13} color="#FF008A" />
                    <span>Choose your favourite fabric</span>
                  </div>
                  <div className="promo-check-item">
                    <CheckCircle2 size={13} color="#FF008A" />
                    <span>Book a tailor or designer</span>
                  </div>
                  <div className="promo-check-item">
                    <CheckCircle2 size={13} color="#FF008A" />
                    <span>Get a perfect outfit</span>
                  </div>
                </div>
                <button type="button" className="promo-banner-cta-btn">
                  <span>Shop & Book Tailor</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Banner 2: Custom Outfits Made Just For You */}
            <div 
              className="promo-banner-card promo-banner-card-2"
              onClick={() => {
                setSelectedFabricForStitch(filteredProducts[1] || filteredProducts[0] || COTTON_FABRICS[0]);
                setCurrentView('shop-and-stitch');
                window.history.pushState(null, '', '/shop-and-stitch');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Custom Outfits Made Just for You - Create Custom Outfit"
            >
              <img 
                src="/fabric_marketplace/Custom Outfits Made Just For You Right Image.png" 
                alt="Custom Outfits Made Just for You" 
                className="promo-banner-bg-img"
              />
              <div className="promo-banner-content-left">
                <h3 className="promo-banner-heading">
                  Custom Outfits<br />
                  <span className="promo-banner-sub">Made Just for You</span>
                </h3>
                <div className="promo-banner-checklist">
                  <div className="promo-check-item">
                    <Sparkles size={13} color="#FF008A" />
                    <span>Select fabric from marketplace</span>
                  </div>
                  <div className="promo-check-item">
                    <Layers size={13} color="#FF008A" />
                    <span>Share your design or get designs</span>
                  </div>
                  <div className="promo-check-item">
                    <Scissors size={13} color="#FF008A" />
                    <span>Stitched by expert tailors</span>
                  </div>
                </div>
                <button type="button" className="promo-banner-cta-btn">
                  <span>Create Custom Outfit</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 9. WHY SHOP ON STITCHBEEZ? SECTION (100% Full Width) */}
      <section className="why-stitchbeez-section">
        <h3 className="why-section-title">Why Shop on StitchBeez?</h3>
        <div className="why-features-row">
          <div className="why-feature-card">
            <div className="why-icon-badge">
              <Layers size={18} />
            </div>
            <div className="why-feature-label">Wide Range of Fabrics</div>
          </div>

          <div className="why-feature-card">
            <div className="why-icon-badge">
              <Sparkles size={18} />
            </div>
            <div className="why-feature-label">Premium Quality</div>
          </div>

          <div className="why-feature-card">
            <div className="why-icon-badge">
              <ShieldCheck size={18} />
            </div>
            <div className="why-feature-label">Verified Sellers</div>
          </div>

          <div className="why-feature-card">
            <div className="why-icon-badge">
              <RotateCcw size={18} />
            </div>
            <div className="why-feature-label">Secure Payments & Easy Returns</div>
          </div>

          <div className="why-feature-card">
            <div className="why-icon-badge">
              <Scissors size={18} />
            </div>
            <div className="why-feature-label">Book Tailor in One Click</div>
          </div>

          <div className="why-feature-card">
            <div className="why-icon-badge">
              <Truck size={18} />
            </div>
            <div className="why-feature-label">Pan India Delivery</div>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER SUBSCRIPTION SECTION (100% Full Width with Full Artwork) */}
      <section className="fabric-newsletter-banner">
        <div className="newsletter-left">
          <div className="newsletter-icon-box">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="newsletter-title">Stay Updated with New Fabrics & Offers</h4>
            <p className="newsletter-desc">
              Subscribe to get the latest collections, exclusive deals and style inspirations.
            </p>
          </div>
        </div>

        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="newsletter-input" 
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </section>

      {/* MODAL 1: ADD TO CART MODAL */}
      {cartModalProduct && (
        <AddToCartModal 
          fabric={cartModalProduct}
          isOpen={!!cartModalProduct}
          onClose={() => setCartModalProduct(null)}
          onAddToCart={handleAddToCartConfirm}
        />
      )}

      {/* MODAL 2: SHOP & STITCH 6-STEP MODAL */}
      {stitchModalProduct && (
        <ShopAndStitchModal 
          fabric={stitchModalProduct}
          isOpen={!!stitchModalProduct}
          onClose={() => setStitchModalProduct(null)}
          onConfirmOrder={handleStitchOrderConfirm}
          tailorsList={tailors}
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
        />
      )}

      {/* MODAL 3: FABRIC DETAILS MODAL */}
      {detailsModalProduct && (
        <FabricDetailsModal 
          fabric={detailsModalProduct}
          isOpen={!!detailsModalProduct}
          onClose={() => setDetailsModalProduct(null)}
          onAddToCart={(product) => {
            setDetailsModalProduct(null);
            setCartModalProduct(product);
          }}
          onShopAndStitch={(product) => {
            setDetailsModalProduct(null);
            setStitchModalProduct(product);
          }}
          isWishlisted={isProductInWishlist(detailsModalProduct)}
          onToggleWishlist={(product) => handleToggleWishlist(product)}
        />
      )}

    </div>
  );
}
