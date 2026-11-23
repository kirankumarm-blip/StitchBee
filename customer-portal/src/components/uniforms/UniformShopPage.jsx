import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Scissors,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Heart,
  ShoppingCart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  Award,
  Layers,
  SlidersHorizontal,
  RotateCcw,
  Upload,
  Building2,
  Phone,
  Mail,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Eye,
  Info,
  ArrowRight,
  Shirt,
  FileText
} from 'lucide-react';
import { addToCart } from '../../utils/bagsStore';
import { getWishlist, toggleWishlist } from '../../utils/wishlistStore';
import { 
  UNIFORM_CATEGORIES, 
  UNIFORM_PRODUCTS, 
  COLOR_FILTER_OPTIONS 
} from '../../utils/uniformsStore';
import UniformBulkQuoteView from './UniformBulkQuoteView';
import UniformCustomOrderView from './UniformCustomOrderView';
import './UniformShopPage.css';

export { UNIFORM_CATEGORIES, UNIFORM_PRODUCTS, COLOR_FILTER_OPTIONS };

export default function UniformShopPage({
  currentUser,
  theme = 'light',
  setTheme,
  onAddToCart,
  onLoginRequired,
  onNavigateHome,
  onNavigateCategory,
  addOrder
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Sub-view synchronization for dedicated full-page routes
  const [subView, setSubView] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p.includes('/bulk-quote')) return 'bulk-quote';
      if (p.includes('/custom-order')) return 'custom-order';
    }
    return 'shop';
  });

  useEffect(() => {
    if (location.pathname.includes('/bulk-quote')) {
      setSubView('bulk-quote');
    } else if (location.pathname.includes('/custom-order')) {
      setSubView('custom-order');
    } else {
      setSubView('shop');
    }
  }, [location.pathname]);

  // Category & Tab States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sidebar Filter States
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedFabric, setSelectedFabric] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyFastDelivery, setOnlyFastDelivery] = useState(false);

  // Wishlist State (Synced with Central StitchBeez Wishlist)
  const [wishlist, setWishlist] = useState(() => new Set(getWishlist()));

  // Listen to central store updates across tabs/pages
  useEffect(() => {
    const syncWishlist = () => {
      setWishlist(new Set(getWishlist()));
    };
    window.addEventListener('stitchbee-store-update', syncWishlist);
    return () => window.removeEventListener('stitchbee-store-update', syncWishlist);
  }, []);

  // Modal States
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState('');
  const [quickViewColor, setQuickViewColor] = useState('');
  const [quickViewQty, setQuickViewQty] = useState(1);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle Wishlist via Central Universal Store
  const handleToggleWishlist = (productId, e) => {
    if (e) e.stopPropagation();
    const res = toggleWishlist(productId);
    const updatedIds = res.updated || res;
    setWishlist(new Set(updatedIds));
    const isAdded = res.added ?? res.isAdded ?? updatedIds.includes(productId);
    showToast(isAdded ? 'Added to wishlist ❤️' : 'Removed from wishlist');
  };

  // Add to Cart handler (Cart Icon Button - Bags shop method)
  const handleAddProductToCart = (product, selectedColorObj, chosenSize, qty = 1, e) => {
    if (e) e.stopPropagation();
    const color = selectedColorObj ? (typeof selectedColorObj === 'string' ? selectedColorObj : selectedColorObj.name) : (product.colors?.[0]?.name || product.colors?.[0] || 'Standard');
    const size = chosenSize || product.sizes?.[0] || 'Standard';

    addToCart({
      id: `uni-${product.id}-${color}-${size}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.mrp,
      selectedColor: color,
      color: color,
      size: size,
      img: product.image,
      image: product.image,
      material: product.fabric || 'Premium Uniform Fabric',
      category: 'uniforms'
    }, qty, color);

    if (onAddToCart) {
      onAddToCart({
        id: `uni-${product.id}-${color}-${size}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color,
        size,
        quantity: qty,
        category: 'uniforms'
      });
    }

    showToast(`Added "${product.name}" (${size}, ${color}) to bag! 🛍️`);
  };

  // Buy Now handler (Uses Bags Shop checkout method: addToCart + navigate to /cart)
  const handleBuyNowDirect = (product, colorObj, sizeChosen, qty = 1, e) => {
    if (e) e.stopPropagation();
    const color = colorObj ? (typeof colorObj === 'string' ? colorObj : colorObj.name) : (product.colors?.[0]?.name || product.colors?.[0] || 'Standard');
    const size = sizeChosen || product.sizes?.[0] || 'Standard';

    addToCart({
      id: `uni-${product.id}-${color}-${size}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.mrp,
      selectedColor: color,
      color: color,
      size: size,
      img: product.image,
      image: product.image,
      material: product.fabric || 'Premium Uniform Fabric',
      category: 'uniforms'
    }, qty, color);

    if (onAddToCart) {
      onAddToCart({
        id: `uni-${product.id}-${color}-${size}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color,
        size,
        quantity: qty,
        category: 'uniforms'
      });
    }

    navigate('/cart');
  };

  // Open Quick View Modal
  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewSize(product.sizes[0] || 'Standard');
    setQuickViewColor(product.colors[0]?.name || 'Standard');
    setQuickViewQty(1);
  };

  // Reset Filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTab('all');
    setMaxPrice(5000);
    setSelectedGender('all');
    setSelectedFabric('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setSelectedBrand('all');
    setMinRating(0);
    setOnlyInStock(false);
    setOnlyFastDelivery(false);
    setSearchQuery('');
  };

  // Scroll to marketplace products
  const scrollToMarketplace = () => {
    const el = document.getElementById('uniform-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // -------------------------------------------------------------------------
  // FILTERING LOGIC
  // -------------------------------------------------------------------------
  const filteredProducts = useMemo(() => {
    return UNIFORM_PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }

      // Tab filter
      if (selectedTab !== 'all') {
        if (selectedTab === 'bestsellers' && !item.tabTags.includes('bestsellers')) return false;
        if (selectedTab === 'new' && !item.tabTags.includes('new')) return false;
        if (selectedTab === 'school' && item.categoryId !== 'school') return false;
        if (selectedTab === 'corporate' && item.categoryId !== 'corporate') return false;
        if (selectedTab === 'medical' && item.categoryId !== 'hospital') return false;
        if (selectedTab === 'industrial' && item.categoryId !== 'industrial') return false;
      }

      // Price Filter
      if (item.price > maxPrice) return false;

      // Gender
      if (selectedGender !== 'all' && item.gender !== selectedGender && item.gender !== 'Unisex') {
        return false;
      }

      // Fabric
      if (selectedFabric !== 'all' && item.fabric !== selectedFabric) {
        return false;
      }

      // Size
      if (selectedSize !== 'all' && !item.sizes.includes(selectedSize)) {
        return false;
      }

      // Color
      if (selectedColor !== 'all') {
        const hasColor = item.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      // Brand
      if (selectedBrand !== 'all' && item.brand !== selectedBrand) {
        return false;
      }

      // Rating
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }

      // Availability
      if (onlyInStock && !item.inStock) return false;
      if (onlyFastDelivery && !item.fastDelivery) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.categoryName.toLowerCase().includes(query) ||
          item.fabric.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [
    selectedCategory,
    selectedTab,
    maxPrice,
    selectedGender,
    selectedFabric,
    selectedSize,
    selectedColor,
    selectedBrand,
    minRating,
    onlyInStock,
    onlyFastDelivery,
    searchQuery
  ]);

  const isDarkMode = theme === 'dark';

  // Dedicated Full Page: Request an Institutional Bulk Quote
  if (subView === 'bulk-quote' || location.pathname.includes('/bulk-quote')) {
    return (
      <div className={`uniform-shop-page ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
        <UniformBulkQuoteView
          onBackToShop={() => {
            setSubView('shop');
            navigate('/uniforms');
          }}
          showToast={showToast}
        />
        {toastMessage && (
          <div className="uniform-toast">
            <CheckCircle2 size={18} color="#34D399" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // Dedicated Full Page: Start a Bespoke Custom Uniform Order
  if (subView === 'custom-order' || location.pathname.includes('/custom-order')) {
    return (
      <div className={`uniform-shop-page ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
        <UniformCustomOrderView
          onBackToShop={() => {
            setSubView('shop');
            navigate('/uniforms');
          }}
          showToast={showToast}
        />
        {toastMessage && (
          <div className="uniform-toast">
            <CheckCircle2 size={18} color="#34D399" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // DEFAULT VIEW: UNIFORM MARKETPLACE SHOP (100% WIDTH)
  // -------------------------------------------------------------------------
  return (
    <div className={`uniform-shop-page ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      {/* =====================================================================
          1. HERO BANNER SECTION (Quality Uniforms, For Every Profession)
          Desktop: 100% fidelity to reference image (Image 2) with clean layout.
          Mobile: Dedicated responsive presentation with full-banner showcase & legible card.
          ===================================================================== */}
      <section className="uniform-hero-section">
        {/* Mobile Showcase Banner (displays the full lineup of uniforms cleanly without cropping) */}
        <div className="uniform-hero-mobile-visual">
          <div className="uniform-hero-mobile-banner">
            <img
              src="/uniform_assets/HERO.png"
              alt="StitchBeez Uniforms"
              className="uniform-hero-mobile-img"
            />
            <div className="uniform-hero-mobile-badge-slogan">
              Uniforms for a Better Tomorrow ♡
            </div>
          </div>
        </div>

        <div className="uniform-shop-container">
          <div className="uniform-hero-content">
            <div className="uniform-hero-badge">UNIFORM SHOP</div>

            <h1 className="uniform-hero-title">
              Quality Uniforms, <br />
              <span className="uniform-hero-title-accent">For Every Profession.</span>
            </h1>

            <p className="uniform-hero-desc">
              Explore ready-made uniforms for schools, colleges, businesses, hospitals, hotels,
              industries and more. Premium fabrics, perfect fit and bulk order options – all in one
              place with StitchBeez.
            </p>

            {/* 4 Feature Highlights in a neat 4-column circular icon row */}
            <div className="uniform-hero-features-v2">
              <div className="uniform-feature-col">
                <div className="uniform-feature-circle">
                  <Shirt size={20} />
                </div>
                <span className="uniform-feature-label">
                  Wide Range<br />of Uniforms
                </span>
              </div>

              <div className="uniform-feature-col">
                <div className="uniform-feature-circle">
                  <Heart size={20} />
                </div>
                <span className="uniform-feature-label">
                  Premium<br />Quality Fabrics
                </span>
              </div>

              <div className="uniform-feature-col">
                <div className="uniform-feature-circle">
                  <FileText size={20} />
                </div>
                <span className="uniform-feature-label">
                  Bulk Order<br />Discounts
                </span>
              </div>

              <div className="uniform-feature-col">
                <div className="uniform-feature-circle">
                  <Truck size={20} />
                </div>
                <span className="uniform-feature-label">
                  Fast & Reliable<br />Delivery
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="uniform-hero-actions">
              <button
                className="btn-uniform-shop-all"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTab('all');
                  scrollToMarketplace();
                }}
              >
                Shop All Uniforms <ArrowRight size={16} />
              </button>

              <button
                className="btn-uniform-quote"
                style={{ color: '#FFFFFF' }}
                onClick={() => {
                  setSubView('bulk-quote');
                  navigate('/uniforms/bulk-quote');
                }}
              >
                Request a Bulk Quote <ArrowRight size={16} color="#FFFFFF" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Slogan (Top Right) */}
        <div className="uniform-hero-desktop-slogan">
          <div className="uniform-hero-slogan-line">Uniforms</div>
          <div className="uniform-hero-slogan-line">for a Better</div>
          <div className="uniform-hero-slogan-line">Tomorrow</div>
          <div className="uniform-hero-slogan-heart">♡</div>
        </div>
      </section>

      {/* =====================================================================
          2. MAIN MARKETPLACE: SIDEBAR FILTERS + PRODUCTS (100% WIDTH)
          2-column layout begins directly below Hero banner as in reference!
          ===================================================================== */}
      <section id="uniform-products-section" className="uniform-shop-container">
        <div className="uniform-marketplace-layout">
          {/* ---------------------------------------------------------------
              LEFT SIDEBAR FILTERS (240px - 260px)
              --------------------------------------------------------------- */}
          <aside className="uniform-filter-sidebar">
            <div className="uniform-filter-header">
              <span className="uniform-filter-title">
                <SlidersHorizontal size={17} color="#E11D74" /> Filters
              </span>
              <button
                className="uniform-clear-filters-btn"
                onClick={handleClearFilters}
              >
                Clear All
              </button>
            </div>

            {/* Categories Filter with live counts */}
            <div className="uniform-filter-group">
              <div className="uniform-filter-group-title">
                <span>Category</span>
              </div>
              <div
                className="uniform-filter-item"
                onClick={() => setSelectedCategory('all')}
              >
                <div className="uniform-filter-item-left">
                  <input
                    type="radio"
                    name="category_filter"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="accent-pink-600"
                  />
                  <span>All Categories</span>
                </div>
                <span className="uniform-filter-count">{UNIFORM_PRODUCTS.length}</span>
              </div>
              {UNIFORM_CATEGORIES.filter((c) => !c.isAction).map((cat) => (
                <div
                  key={cat.id}
                  className="uniform-filter-item"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <div className="uniform-filter-item-left">
                    <input
                      type="radio"
                      name="category_filter"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="accent-pink-600"
                    />
                    <span>{cat.name}</span>
                  </div>
                  <span className="uniform-filter-count">
                    {UNIFORM_PRODUCTS.filter((p) => p.categoryId === cat.id).length || cat.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Range Slider */}
            <div className="uniform-filter-group">
              <div className="uniform-filter-group-title">
                <span>Price Range</span>
              </div>
              <div className="uniform-price-slider-wrap">
                <div className="uniform-price-display">
                  <span>₹0</span>
                  <span className="font-bold text-pink-600">Up to ₹{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="uniform-range-input"
                />
              </div>
            </div>

            {/* Gender Filter */}
            <div className="uniform-filter-group">
              <div className="uniform-filter-group-title">
                <span>Gender</span>
              </div>
              {['all', 'Men', 'Women', 'Boys', 'Girls', 'Unisex'].map((g) => (
                <div
                  key={g}
                  className="uniform-filter-item"
                  onClick={() => setSelectedGender(g)}
                >
                  <div className="uniform-filter-item-left">
                    <input
                      type="radio"
                      name="gender_filter"
                      checked={selectedGender === g}
                      onChange={() => setSelectedGender(g)}
                      className="accent-pink-600"
                    />
                    <span>{g === 'all' ? 'All Genders' : g}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Fabric Filter */}
            <div className="uniform-filter-group">
              <div className="uniform-filter-group-title">
                <span>Fabric</span>
              </div>
              {['all', 'Cotton', 'Polyester', 'Cotton Blend', 'Linen', 'Twill', 'Drill', 'Mesh'].map((f) => (
                <div
                  key={f}
                  className="uniform-filter-item"
                  onClick={() => setSelectedFabric(f)}
                >
                  <div className="uniform-filter-item-left">
                    <input
                      type="radio"
                      name="fabric_filter"
                      checked={selectedFabric === f}
                      onChange={() => setSelectedFabric(f)}
                      className="accent-pink-600"
                    />
                    <span>{f === 'all' ? 'All Fabrics' : f}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Size Chips */}
            <div className="uniform-filter-group">
              <div className="uniform-filter-group-title">
                <span>Size</span>
              </div>
              <div className="uniform-size-chips">
                {['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'Custom'].map((s) => (
                  <button
                    key={s}
                    className={`uniform-size-chip ${selectedSize === s ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s === 'all' ? 'All' : s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colour Swatches */}
            <div className="uniform-filter-group">
              <div className="uniform-filter-group-title">
                <span>Color</span>
              </div>
              <div className="uniform-color-swatches">
                <button
                  className={`uniform-size-chip ${selectedColor === 'all' ? 'selected' : ''}`}
                  onClick={() => setSelectedColor('all')}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                >
                  All
                </button>
                {COLOR_FILTER_OPTIONS.map((c) => (
                  <button
                    key={c.name}
                    className={`uniform-color-dot-btn ${selectedColor === c.name ? 'selected' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setSelectedColor(selectedColor === c.name ? 'all' : c.name)}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check
                        size={12}
                        color={c.hex === '#FFFFFF' ? '#000000' : '#FFFFFF'}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="uniform-filter-group">
              <div className="uniform-filter-group-title">
                <span>Brand</span>
              </div>
              {['all', 'StitchBeez Classic', 'StitchBeez Pro', 'Institutional Grade'].map((b) => (
                <div
                  key={b}
                  className="uniform-filter-item"
                  onClick={() => setSelectedBrand(b)}
                >
                  <div className="uniform-filter-item-left">
                    <input
                      type="radio"
                      name="brand_filter"
                      checked={selectedBrand === b}
                      onChange={() => setSelectedBrand(b)}
                      className="accent-pink-600"
                    />
                    <span>{b === 'all' ? 'All Brands' : b}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Rating Filter */}
            <div className="uniform-filter-group">
              <div className="uniform-filter-group-title">
                <span>Rating</span>
              </div>
              {[
                { label: '4★ & Up', value: 4.7 },
                { label: '3★ & Up', value: 4.0 },
                { label: 'All Ratings', value: 0 }
              ].map((r) => (
                <div
                  key={r.label}
                  className="uniform-filter-item"
                  onClick={() => setMinRating(r.value)}
                >
                  <div className="uniform-filter-item-left">
                    <input
                      type="radio"
                      name="rating_filter"
                      checked={minRating === r.value}
                      onChange={() => setMinRating(r.value)}
                      className="accent-pink-600"
                    />
                    <span>{r.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="uniform-filter-group">
              <div className="uniform-filter-group-title">
                <span>Availability</span>
              </div>
              <div
                className="uniform-filter-item"
                onClick={() => setOnlyInStock(!onlyInStock)}
              >
                <div className="uniform-filter-item-left">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-pink-600"
                  />
                  <span>In Stock</span>
                </div>
              </div>
              <div
                className="uniform-filter-item"
                onClick={() => setOnlyFastDelivery(!onlyFastDelivery)}
              >
                <div className="uniform-filter-item-left">
                  <input
                    type="checkbox"
                    checked={onlyFastDelivery}
                    onChange={(e) => setOnlyFastDelivery(e.target.checked)}
                    className="accent-pink-600"
                  />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ---------------------------------------------------------------
              RIGHT PRODUCTS AREA: CATEGORIES + 3 PROMO CARDS + TABS + 12 PRODUCT CARDS
              --------------------------------------------------------------- */}
          <main className="uniform-products-area">
            {/* A. Shop by Category (10 Compact Cards in 1 Row) */}
            <div className="uniform-category-section-compact">
              <div className="uniform-section-header">
                <div>
                  <h2 className="uniform-section-title">Shop by Category</h2>
                  <p className="uniform-section-subtitle">
                    Choose from a wide range of ready-made uniforms.
                  </p>
                </div>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="uniform-clear-filters-btn"
                    style={{ fontSize: '0.78rem' }}
                  >
                    View All Categories ({UNIFORM_PRODUCTS.length})
                  </button>
                )}
              </div>

              <div className="uniform-category-scroll">
                {UNIFORM_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      className={`uniform-category-card ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        if (cat.isAction) {
                          setSubView('custom-order');
                          navigate('/uniforms/custom-order');
                        } else {
                          setSelectedCategory(isSelected ? 'all' : cat.id);
                        }
                      }}
                    >
                      <div className="uniform-cat-img-box">
                        <img src={cat.image} alt={cat.name} loading="lazy" />
                      </div>
                      <div className="uniform-cat-title">{cat.name}</div>
                      <div className="uniform-cat-sub">{cat.sub}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* B. 3 Promotional Cards: School, Corporate, Medical - Exact Match to First Image */}
            <div className="uniform-promos-grid">
              {/* Promo 1: School Uniforms (Soft Blush Pink) */}
              <div
                className="uniform-promo-card-light uniform-promo-school"
                style={{
                  background: 'linear-gradient(135deg, #FFF0F4 0%, #FFE6ED 100%)'
                }}
                onClick={() => {
                  setSelectedCategory('school');
                  setSelectedTab('school');
                }}
              >
                <div className="uniform-promo-card-text">
                  <div className="uniform-promo-card-title">School Uniforms</div>
                  <div className="uniform-promo-card-sub">
                    Comfortable, durable & stylish uniforms for every student.
                  </div>
                  <span className="uniform-promo-card-btn" style={{ color: '#FFFFFF' }}>
                    Shop Now &rarr;
                  </span>
                </div>
                <div className="uniform-promo-card-img-wrap">
                  <img
                    src="/uniform_assets/School%20Uniforms%20Shop%20Now%20Sections.png"
                    alt="School Uniforms"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Promo 2: Corporate Uniforms (Soft Sky Blue) */}
              <div
                className="uniform-promo-card-light uniform-promo-corporate"
                style={{
                  background: 'linear-gradient(135deg, #EEF4FF 0%, #DFEBFF 100%)'
                }}
                onClick={() => {
                  setSelectedCategory('corporate');
                  setSelectedTab('corporate');
                }}
              >
                <div className="uniform-promo-card-text">
                  <div className="uniform-promo-card-title">Corporate Uniforms</div>
                  <div className="uniform-promo-card-sub">
                    Professional looks for a stronger brand identity.
                  </div>
                  <span className="uniform-promo-card-btn" style={{ color: '#FFFFFF' }}>
                    Shop Now &rarr;
                  </span>
                </div>
                <div className="uniform-promo-card-img-wrap">
                  <img
                    src="/uniform_assets/Corporate%20Uniforms%20Shop%20Now%20Sections.png"
                    alt="Corporate Uniforms"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Promo 3: Medical Scrubs (Soft Warm Cream / Peach) */}
              <div
                className="uniform-promo-card-light uniform-promo-medical"
                style={{
                  background: 'linear-gradient(135deg, #FFF6EC 0%, #FFEEDB 100%)'
                }}
                onClick={() => {
                  setSelectedCategory('hospital');
                  setSelectedTab('medical');
                }}
              >
                <div className="uniform-promo-card-text">
                  <div className="uniform-promo-card-title">Medical Scrubs</div>
                  <div className="uniform-promo-card-sub">
                    Premium scrubs for healthcare heroes.
                  </div>
                  <span className="uniform-promo-card-btn" style={{ color: '#FFFFFF' }}>
                    Shop Now &rarr;
                  </span>
                </div>
                <div className="uniform-promo-card-img-wrap">
                  <img
                    src="/uniform_assets/Medical%20Scrubs%20Shop%20Now%20Sections.png"
                    alt="Medical Scrubs"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Collection Tabs Bar */}
            <div className="uniform-tabs-container">
              <div className="uniform-tabs-list">
                {[
                  { id: 'bestsellers', label: 'Bestsellers' },
                  { id: 'new', label: 'New Arrivals' },
                  { id: 'school', label: 'School Uniforms' },
                  { id: 'corporate', label: 'Corporate Uniforms' },
                  { id: 'medical', label: 'Medical Scrubs' },
                  { id: 'industrial', label: 'Industrial Wear' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`uniform-tab-btn ${selectedTab === tab.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedTab(tab.id);
                      if (tab.id === 'school') setSelectedCategory('school');
                      else if (tab.id === 'corporate') setSelectedCategory('corporate');
                      else if (tab.id === 'medical') setSelectedCategory('hospital');
                      else if (tab.id === 'industrial') setSelectedCategory('industrial');
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <span
                className="uniform-view-all-link"
                onClick={handleClearFilters}
              >
                View All <ArrowRight size={14} />
              </span>
            </div>

            {/* 12 Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                <ShieldCheck size={48} className="mx-auto text-slate-400 mb-3" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  No uniforms match your current filters
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Try adjusting your price range, fabric or gender selections to discover more products.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-5 py-2 rounded-lg bg-pink-600 text-white font-semibold text-sm hover:bg-pink-700"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="uniform-products-grid">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.has(product.id);
                  return (
                    <div
                      key={product.id}
                      className="uniform-product-card"
                      onClick={() => openQuickView(product)}
                    >
                      {/* Image Wrap */}
                      <div className="uniform-card-img-wrap">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />

                        {/* Wishlist Heart Button */}
                        <button
                          className={`uniform-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                          onClick={(e) => handleToggleWishlist(product.id, e)}
                          title="Add to Wishlist"
                        >
                          <Heart
                            size={16}
                            fill={isWishlisted ? '#E11D74' : 'none'}
                            color={isWishlisted ? '#E11D74' : '#64748B'}
                          />
                        </button>
                      </div>

                      {/* Card Body */}
                      <div className="uniform-card-body">
                        {/* Title */}
                        <div className="uniform-card-title">{product.name}</div>

                        {/* Rating */}
                        <div className="uniform-card-rating">
                          <Star size={13} fill="#F59E0B" color="#F59E0B" />
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {product.rating}
                          </span>
                          <span>({product.reviews} reviews)</span>
                        </div>

                        {/* Color Swatch Dots */}
                        <div className="uniform-card-swatches">
                          {product.colors.map((c) => (
                            <span
                              key={c.name}
                              className="uniform-card-swatch-dot"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>

                        {/* Footer: Price & Buttons (BUY NOW + CART ICON) */}
                        <div className="uniform-card-footer">
                          <div className="uniform-card-price-row">
                            <span className="uniform-card-current-price">
                              ₹{product.price.toLocaleString()}
                            </span>
                            <span className="uniform-card-mrp">
                              ₹{product.mrp.toLocaleString()}
                            </span>
                          </div>

                          {/* Action Button Row: Redesigned "Buy Now" (Direct Checkout) + Square Cart Icon */}
                          <div className="uniform-card-actions-row">
                            <button
                              className="uniform-buy-now-btn"
                              style={{ color: '#FFFFFF' }}
                              onClick={(e) =>
                                handleBuyNowDirect(
                                  product,
                                  product.colors[0],
                                  product.sizes[0],
                                  1,
                                  e
                                )
                              }
                              title="Buy Now"
                            >
                              Buy Now
                            </button>

                            <button
                              className="uniform-cart-icon-btn"
                              style={{ color: '#FFFFFF' }}
                              onClick={(e) =>
                                handleAddProductToCart(
                                  product,
                                  product.colors[0],
                                  product.sizes[0],
                                  1,
                                  e
                                )
                              }
                              title="Add to Cart"
                            >
                              <ShoppingCart size={13} color="#FFFFFF" stroke="#FFFFFF" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ---------------------------------------------------------------
                SIDE-BY-SIDE PROMOTIONAL ACTION PANELS (Clean Presentation)
                --------------------------------------------------------------- */}
            <div className="uniform-promo-panels-section">
              {/* Left Panel: Bulk Orders */}
              <div className="uniform-clean-action-panel">
                <div className="uniform-panel-img-box">
                  <img
                    src="/uniform_assets/Bulk%20Orders%20for%20Schools,%20Collages%20&%20Business%20%20Section%20Bg%20Image.png"
                    alt="Bulk Uniform Orders"
                    loading="lazy"
                  />
                </div>
                <div className="uniform-clean-panel-body">
                  <h3 className="uniform-clean-panel-title">
                    Bulk Orders for Schools, Colleges & Businesses
                  </h3>

                  <div className="uniform-clean-checklist">
                    <div className="uniform-clean-check-item">
                      <CheckCircle2 size={16} color="#E11D74" />
                      <span>Special pricing for bulk orders</span>
                    </div>
                    <div className="uniform-clean-check-item">
                      <CheckCircle2 size={16} color="#E11D74" />
                      <span>Custom designs & branding (logo, names)</span>
                    </div>
                    <div className="uniform-clean-check-item">
                      <CheckCircle2 size={16} color="#E11D74" />
                      <span>Pan India delivery</span>
                    </div>
                    <div className="uniform-clean-check-item">
                      <CheckCircle2 size={16} color="#E11D74" />
                      <span>Dedicated account manager</span>
                    </div>
                  </div>

                  <button
                    className="uniform-clean-panel-btn"
                    style={{ color: '#FFFFFF' }}
                    onClick={() => {
                      setSubView('bulk-quote');
                      navigate('/uniforms/bulk-quote');
                    }}
                  >
                    Request a Bulk Quote <ArrowRight size={15} color="#FFFFFF" />
                  </button>
                </div>
              </div>

              {/* Right Panel: Custom Uniform Design */}
              <div className="uniform-clean-action-panel">
                <div className="uniform-clean-panel-body">
                  <h3 className="uniform-clean-panel-title">
                    Custom Uniform Design
                  </h3>

                  <div className="uniform-clean-checklist">
                    <div className="uniform-clean-check-item">
                      <CheckCircle2 size={16} color="#E11D74" />
                      <span>Choose fabrics, colors & styles</span>
                    </div>
                    <div className="uniform-clean-check-item">
                      <CheckCircle2 size={16} color="#E11D74" />
                      <span>Add your logo or branding</span>
                    </div>
                    <div className="uniform-clean-check-item">
                      <CheckCircle2 size={16} color="#E11D74" />
                      <span>Get samples before bulk production</span>
                    </div>
                  </div>

                  <button
                    className="uniform-clean-panel-btn"
                    style={{ color: '#FFFFFF' }}
                    onClick={() => {
                      setSubView('custom-order');
                      navigate('/uniforms/custom-order');
                    }}
                  >
                    Start a Custom Order <ArrowRight size={15} color="#FFFFFF" />
                  </button>
                </div>
                <div className="uniform-panel-img-box">
                  <img
                    src="/uniform_assets/Custom%20Uniform%20Design%20Section%20Bg%20Image.png"
                    alt="Custom Uniform Design"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* =====================================================================
          4. WHY SHOP UNIFORMS AT STITCHBEEZ? (6 BENEFITS) - 100% WIDTH
          All 6 benefits in a single horizontal row on desktop
          ===================================================================== */}
      <section className="uniform-why-section">
        <div className="uniform-shop-container">
          <div className="uniform-why-header">
            <h2 className="uniform-section-title">
              Why Shop Uniforms at StitchBeez?
            </h2>
          </div>

          <div className="uniform-why-grid">
            {/* 1 */}
            <div className="uniform-benefit-card">
              <div className="uniform-benefit-icon-box">
                <Layers size={18} />
              </div>
              <div className="uniform-benefit-title">Premium Quality Fabrics</div>
              <div className="uniform-benefit-desc">
                Durable & comfortable
              </div>
            </div>

            {/* 2 */}
            <div className="uniform-benefit-card">
              <div className="uniform-benefit-icon-box">
                <Scissors size={18} />
              </div>
              <div className="uniform-benefit-title">Wide Variety</div>
              <div className="uniform-benefit-desc">
                All industries & professions
              </div>
            </div>

            {/* 3 */}
            <div className="uniform-benefit-card">
              <div className="uniform-benefit-icon-box">
                <Sparkles size={18} />
              </div>
              <div className="uniform-benefit-title">Custom Branding</div>
              <div className="uniform-benefit-desc">
                Logos, names & designs &gt;
              </div>
            </div>

            {/* 4 */}
            <div className="uniform-benefit-card">
              <div className="uniform-benefit-icon-box">
                <ShieldCheck size={18} />
              </div>
              <div className="uniform-benefit-title">Bulk Order Discounts</div>
              <div className="uniform-benefit-desc">
                Save more on large orders
              </div>
            </div>

            {/* 5 */}
            <div className="uniform-benefit-card">
              <div className="uniform-benefit-icon-box">
                <RotateCcw size={18} />
              </div>
              <div className="uniform-benefit-title">Easy Returns</div>
              <div className="uniform-benefit-desc">
                Hassle-free process &gt;
              </div>
            </div>

            {/* 6 */}
            <div className="uniform-benefit-card">
              <div className="uniform-benefit-icon-box">
                <Truck size={18} />
              </div>
              <div className="uniform-benefit-title">Pan India Delivery</div>
              <div className="uniform-benefit-desc">
                Fast & reliable
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. BOTTOM PROMOTIONAL BANNER
          Rack on left, text in center, buttons on right, flowers on far right
          ===================================================================== */}
      <section className="uniform-shop-container" style={{ paddingBottom: '2.5rem' }}>
        <div
          className="uniform-bottom-banner"
          style={{
            backgroundImage: `url('/uniform_assets/Uniforms%20That%20Build%20Confident%20Future%20Image.png')`
          }}
        >
          <div className="uniform-bottom-banner-left-spacer" />

          <div className="uniform-bottom-banner-center">
            <h2 className="uniform-bottom-banner-title">
              Uniforms That Build <br />
              Confident Futures.
            </h2>
            <p className="uniform-bottom-banner-desc">
              Quality uniforms for schools, colleges, businesses and more. Shop now and get the
              perfect look for every team.
            </p>
          </div>

          <div className="uniform-bottom-banner-actions">
            <button
              className="btn-uniform-shop-all"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTab('all');
                scrollToMarketplace();
              }}
            >
              Shop All Uniforms <ArrowRight size={14} />
            </button>

            <button
              className="btn-uniform-quote"
              style={{ color: '#FFFFFF' }}
              onClick={() => {
                setSubView('bulk-quote');
                navigate('/uniforms/bulk-quote');
              }}
            >
              Request a Bulk Quote <ArrowRight size={14} color="#FFFFFF" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MODAL 1: QUICK VIEW / PRODUCT DETAILS MODAL
          ===================================================================== */}
      {quickViewProduct && (
        <div
          className="uniform-modal-backdrop"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="uniform-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '820px' }}
          >
            <button
              className="uniform-modal-close-btn"
              onClick={() => setQuickViewProduct(null)}
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="bg-slate-100 dark:bg-slate-900 p-6 flex items-center justify-center relative">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="max-h-[360px] w-auto object-contain rounded-xl"
                />
                <button
                  className={`absolute top-4 left-4 w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center ${
                    wishlist.has(quickViewProduct.id) ? 'text-pink-600' : 'text-slate-400'
                  }`}
                  onClick={(e) => handleToggleWishlist(quickViewProduct.id, e)}
                >
                  <Heart
                    size={18}
                    fill={wishlist.has(quickViewProduct.id) ? '#E11D74' : 'none'}
                  />
                </button>
              </div>

              {/* Product Details Form */}
              <div className="p-6 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
                <div>
                  <div className="text-xs uppercase font-bold text-pink-600 tracking-wider mb-1">
                    {quickViewProduct.categoryName}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                    {quickViewProduct.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <div className="flex items-center text-amber-500">
                      <Star size={14} fill="#F59E0B" />
                      <span className="font-bold ml-1">{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-slate-400">({quickViewProduct.reviews} customer reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-sky-400">
                      ₹{quickViewProduct.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{quickViewProduct.mrp.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      Save ₹{quickViewProduct.mrp - quickViewProduct.price}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {quickViewProduct.desc}
                  </p>

                  {/* Fabric & Brand info */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs mb-4">
                    <div>
                      <span className="text-slate-400 block">Fabric:</span>
                      <strong className="text-slate-700 dark:text-slate-200">
                        {quickViewProduct.fabric}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Brand:</span>
                      <strong className="text-slate-700 dark:text-slate-200">
                        {quickViewProduct.brand}
                      </strong>
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-2">
                      Color: <span className="font-normal text-slate-500">{quickViewColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setQuickViewColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform ${
                            quickViewColor === c.name
                              ? 'border-pink-600 scale-110 shadow-sm'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {quickViewColor === c.name && (
                            <Check
                              size={12}
                              color={c.hex === '#FFFFFF' ? '#000000' : '#FFFFFF'}
                              strokeWidth={3}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        Select Size
                      </label>
                      <button
                        onClick={() =>
                          showToast('Standard sizing guide: XS(34), S(36), M(38), L(40), XL(42)')
                        }
                        className="text-[11px] text-pink-600 font-semibold hover:underline"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuickViewSize(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                            quickViewSize === s
                              ? 'bg-pink-600 text-white border-pink-600'
                              : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-pink-600'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-4 mb-6">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Quantity:
                    </label>
                    <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                        className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-slate-800 dark:text-white min-w-[28px] text-center">
                        {quickViewQty}
                      </span>
                      <button
                        onClick={() => setQuickViewQty(quickViewQty + 1)}
                        className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Buy Now & Add to Cart */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all"
                    onClick={() => {
                      const chosenColorObj =
                        quickViewProduct.colors.find((c) => c.name === quickViewColor) ||
                        quickViewProduct.colors[0];
                      setQuickViewProduct(null);
                      handleBuyNowDirect(
                        quickViewProduct,
                        chosenColorObj,
                        quickViewSize,
                        quickViewQty
                      );
                    }}
                  >
                    Buy Now <ArrowRight size={14} />
                  </button>

                  <button
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs border border-slate-300 dark:border-slate-700 hover:border-pink-600 text-slate-800 dark:text-white flex items-center justify-center gap-2 transition-all"
                    onClick={() => {
                      const chosenColorObj =
                        quickViewProduct.colors.find((c) => c.name === quickViewColor) ||
                        quickViewProduct.colors[0];
                      handleAddProductToCart(
                        quickViewProduct,
                        chosenColorObj,
                        quickViewSize,
                        quickViewQty
                      );
                      setQuickViewProduct(null);
                    }}
                  >
                    <ShoppingCart size={15} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          FLOATING TOAST NOTIFICATION
          ===================================================================== */}
      {toastMessage && (
        <div className="uniform-toast">
          <CheckCircle2 size={18} color="#34D399" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
