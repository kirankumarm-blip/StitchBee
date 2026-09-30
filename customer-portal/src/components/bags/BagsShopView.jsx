import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Star, Filter, ArrowUpDown, ChevronRight, 
  Search, SlidersHorizontal, RotateCcw, Check, Sparkles 
} from 'lucide-react';
import { 
  ALL_BAG_PRODUCTS, 
  BAG_CATEGORIES, 
  getWishlist, 
  toggleWishlist, 
  addToCart 
} from '../../utils/bagsStore';

export default function BagsShopView({ showToast }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  const [selectedPriceRange, setSelectedPriceRange] = useState('all'); // 'all' | 'under-3000' | '3000-5000' | 'above-5000'
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [wishlist, setWishlist] = useState(getWishlist());

  // Available unique materials and colors for filter pills
  const materials = [
    { id: 'all', label: 'All Materials' },
    { id: 'full-grain', label: 'Full Grain' },
    { id: 'top-grain', label: 'Top Grain' },
    { id: 'nappa', label: 'Nappa Leather' },
    { id: 'suede', label: 'Suede' },
    { id: 'polycarbonate', label: 'Polycarbonate / Trim' }
  ];

  const colors = [
    { name: 'All', hex: 'transparent' },
    { name: 'Beige', hex: '#d8c2aa' },
    { name: 'Black', hex: '#111111' },
    { name: 'Tan', hex: '#d4b996' },
    { name: 'Rose', hex: '#b85b6c' },
    { name: 'Brown', hex: '#6f432a' }
  ];

  const handleWishlistToggle = (productId, e) => {
    e.stopPropagation();
    const { updated, added } = toggleWishlist(productId);
    setWishlist(updated);
    showToast(added ? 'Saved to your wishlist ❤️' : 'Removed from wishlist');
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added "${product.name}" to your bag! 🛍️`);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return ALL_BAG_PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesMat = product.material.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesMat && !matchesDesc) return false;
      }
      // Price range
      if (selectedPriceRange === 'under-3000' && product.price >= 3000) return false;
      if (selectedPriceRange === '3000-5000' && (product.price < 3000 || product.price > 5000)) return false;
      if (selectedPriceRange === 'above-5000' && product.price <= 5000) return false;

      // Material
      if (selectedMaterial !== 'all') {
        if (!product.material.toLowerCase().includes(selectedMaterial.toLowerCase())) return false;
      }

      // Color
      if (selectedColor !== 'all') {
        const hasColor = product.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return b.reviewCount - a.reviewCount; // popular
    });
  }, [selectedCategory, searchTerm, sortBy, selectedPriceRange, selectedMaterial, selectedColor]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSelectedPriceRange('all');
    setSelectedMaterial('all');
    setSelectedColor('all');
    setSortBy('popular');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchTerm !== '' || selectedPriceRange !== 'all' || selectedMaterial !== 'all' || selectedColor !== 'all';

  return (
    <div className="bl-shop-catalog-page">
      <div className="bl-container" style={{ padding: '24px 12px 60px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
          <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/bags')} className="bl-crumb-link">Bags & Leather</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">Shop Collection</span>
        </nav>

        {/* Page Header */}
        <div className="bl-catalog-header-wrap">
          <div>
            <span className="bl-tag-label">READY-MADE ARTISAN PIECES</span>
            <h1 className="bl-serif-title" style={{ fontSize: '2.4rem', margin: '4px 0 8px' }}>
              Handcrafted Bags Collection
            </h1>
            <p className="bl-section-subtext" style={{ maxWidth: '640px', margin: 0 }}>
              Discover genuine Tuscan and heritage leathers, tailored by certified master craftsmen. Built for a lifetime of stories.
            </p>
          </div>

          <button 
            className="bl-btn-primary" 
            onClick={() => navigate('/bags/custom-design')}
            style={{ alignSelf: 'flex-start' }}
          >
            <Sparkles size={16} /> Create Custom Design
          </button>
        </div>

        {/* Category Pills Bar */}
        <div className="bl-shop-category-pills">
          {BAG_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`bl-shop-cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSearchParams(cat.id === 'all' ? {} : { category: cat.id });
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="bl-catalog-filter-bar">
          <div className="bl-filter-left-col">
            {/* Search Input */}
            <div className="bl-filter-search-box">
              <Search size={15} className="bl-search-icon" />
              <input
                type="text"
                placeholder="Search bags, leather, color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bl-filter-search-input"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="bl-search-clear">×</button>
              )}
            </div>

            {/* Price Filter */}
            <select 
              value={selectedPriceRange} 
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="bl-filter-select"
            >
              <option value="all">Price: All</option>
              <option value="under-3000">Under ₹3,000</option>
              <option value="3000-5000">₹3,000 – ₹5,000</option>
              <option value="above-5000">Above ₹5,000</option>
            </select>

            {/* Material Filter */}
            <select 
              value={selectedMaterial} 
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="bl-filter-select"
            >
              {materials.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>

          <div className="bl-filter-right-col">
            <span className="bl-filter-count">
              Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'bag' : 'bags'}
            </span>

            {/* Sort Dropdown */}
            <div className="bl-sort-wrap">
              <ArrowUpDown size={14} style={{ color: 'var(--bl-pink)' }} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bl-sort-select"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="bl-filter-clear-btn" title="Reset all filters">
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="bl-shop-products-grid">
            {filteredProducts.map(product => {
              const isWish = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id} 
                  className="bl-product-card bl-shop-card"
                  onClick={() => navigate(`/bags/product/${product.id}`)}
                >
                  <div className="bl-prod-img-box">
                    <img src={product.img} alt={product.name} loading="lazy" />
                    
                    {product.stock <= 10 && (
                      <span className="bl-stock-pill-low">Only {product.stock} left</span>
                    )}

                    <button 
                      className={`bl-prod-wish-btn ${isWish ? 'active' : ''}`}
                      onClick={(e) => handleWishlistToggle(product.id, e)}
                      title="Add to wishlist"
                      aria-label="Add to wishlist"
                    >
                      <Heart size={16} fill={isWish ? '#f72585' : 'none'} color={isWish ? '#f72585' : '#475569'} strokeWidth={2} />
                    </button>
                  </div>

                  <div className="bl-prod-info">
                    <div className="bl-prod-meta-top">
                      <span className="bl-prod-cat-tag">{product.category.toUpperCase()}</span>
                      <div className="bl-prod-rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h4 className="bl-prod-name">{product.name}</h4>
                    <p className="bl-prod-mat-brief">{product.material}</p>

                    <div className="bl-prod-price-row">
                      <div className="bl-prod-price">₹{product.price.toLocaleString('en-IN')}</div>
                      {product.originalPrice && (
                        <div className="bl-prod-price-orig">₹{product.originalPrice.toLocaleString('en-IN')}</div>
                      )}
                    </div>

                    <div className="bl-prod-bottom-row">
                      {/* Color swatches */}
                      <div className="bl-prod-swatches">
                        {product.colors.map(col => (
                          <span 
                            key={col.name} 
                            className={`bl-prod-swatch-dot ${col.name === product.selectedColor ? 'active' : ''}`}
                            style={{ backgroundColor: col.hex }}
                            title={col.name}
                          />
                        ))}
                      </div>

                      {/* Add to cart button */}
                      <button 
                        className="bl-prod-cart-btn"
                        onClick={(e) => handleAddToCart(product, e)}
                        title="Add to Cart"
                        aria-label="Add to Cart"
                      >
                        <ShoppingCart size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bl-empty-state-card">
            <div className="bl-empty-icon-circle">
              <Search size={28} />
            </div>
            <h3 className="bl-serif-title" style={{ fontSize: '1.4rem', margin: '8px 0' }}>
              No matching bags found
            </h3>
            <p style={{ color: 'var(--bl-text-secondary)', maxWidth: '400px', margin: '0 auto 20px' }}>
              We couldn't find any items matching your selected filters. Try broadening your criteria or reset the search.
            </p>
            <button onClick={clearAllFilters} className="bl-btn-primary">
              <RotateCcw size={15} /> Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
