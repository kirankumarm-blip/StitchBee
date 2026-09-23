import React, { useState, useMemo } from 'react';
import { 
  Star, Heart, ShieldCheck, ChevronRight, SlidersHorizontal, 
  RotateCcw, ArrowUpDown, Check, Eye, ShoppingCart, Zap, Filter
} from 'lucide-react';

export default function FlipkartCatalogView({
  categoryKey = 'bags',
  categoryTitle = 'Handmade Bags & Leather',
  breadcrumbs = ['Home', 'Bags, Wallets & Belts', 'Handbags & Clutches'],
  products = [],
  onSelectProduct,
  onQuickBuy,
  onAddToCart
}) {
  // Filter States
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [assuredOnly, setAssuredOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [wishlist, setWishlist] = useState({});
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique subcategories & colors from products
  const subcategories = useMemo(() => {
    const set = new Set();
    products.forEach(p => {
      if (p.subcategory) set.add(p.subcategory);
      else if (p.categoryLabel) set.add(p.categoryLabel);
    });
    return Array.from(set);
  }, [products]);

  const availableColors = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Tan', hex: '#d97706' },
    { name: 'Black', hex: '#111827' },
    { name: 'Brown', hex: '#78350f' },
    { name: 'Blue', hex: '#2563eb' },
    { name: 'Olive', hex: '#4d7c0f' },
    { name: 'Ivory / Gold', hex: '#e2d5b8' },
    { name: 'Maroon', hex: '#881337' }
  ];

  const toggleColor = (cName) => {
    setSelectedColors(prev => 
      prev.includes(cName) ? prev.filter(c => c !== cName) : [...prev, cName]
    );
  };

  const toggleWishlist = (e, productId) => {
    e.stopPropagation();
    setWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedSubcategory !== 'all') {
      list = list.filter(p => 
        (p.subcategory && p.subcategory === selectedSubcategory) ||
        (p.categoryLabel && p.categoryLabel === selectedSubcategory)
      );
    }

    if (assuredOnly) {
      list = list.filter(p => p.isAssured !== false);
    }

    if (selectedColors.length > 0) {
      list = list.filter(p => {
        if (!p.colors) return false;
        return p.colors.some(col => 
          selectedColors.some(sel => col.toLowerCase().includes(sel.toLowerCase()))
        );
      });
    }

    list = list.filter(p => (Number(p.price) || 0) <= priceRange);

    if (minRating > 0) {
      list = list.filter(p => (Number(p.rating) || 0) >= minRating);
    }

    if (selectedOffer === 'special') {
      list = list.filter(p => p.originalPrice && p.price < p.originalPrice * 0.7);
    }

    // Sorting
    if (sortBy === 'low-to-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-to-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity' || sortBy === 'rating') {
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
    }

    return list;
  }, [products, selectedSubcategory, assuredOnly, selectedColors, priceRange, minRating, selectedOffer, sortBy]);

  const clearAllFilters = () => {
    setSelectedSubcategory('all');
    setAssuredOnly(false);
    setSelectedColors([]);
    setPriceRange(15000);
    setMinRating(0);
    setSelectedOffer('all');
  };

  return (
    <div className="flipkart-catalog-container animate-fade-in">
      {/* Mobile Filter Toggle Bar */}
      <div className="catalog-mobile-bar" style={{ display: 'none', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600 }}
        >
          <Filter size={16} /> Filters {selectedColors.length > 0 || assuredOnly || selectedSubcategory !== 'all' ? `(${ (selectedColors.length > 0 ? 1 : 0) + (assuredOnly ? 1 : 0) + (selectedSubcategory !== 'all' ? 1 : 0) })` : ''}
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {filteredProducts.length} Results
        </span>
      </div>

      <div className="catalog-main-layout" style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '16px', alignItems: 'start' }}>
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: FILTERS SIDEBAR (Image 1 reference)               */}
        {/* ============================================================== */}
        <aside 
          className={`catalog-filter-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}
          style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            position: 'sticky',
            top: '80px'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={18} style={{ color: 'var(--primary)' }} />
              Filters
            </h3>
            {(selectedColors.length > 0 || assuredOnly || selectedSubcategory !== 'all' || priceRange < 15000 || minRating > 0) && (
              <button 
                onClick={clearAllFilters}
                style={{ background: 'transparent', border: 'none', color: '#2874f0', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories / Subcategories */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
              Categories
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => setSelectedSubcategory('all')}
                style={{
                  textAlign: 'left',
                  background: selectedSubcategory === 'all' ? 'rgba(40,116,240,0.08)' : 'transparent',
                  color: selectedSubcategory === 'all' ? '#2874f0' : 'var(--text-primary)',
                  fontWeight: selectedSubcategory === 'all' ? 700 : 500,
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                All {categoryTitle}
              </button>
              {subcategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  style={{
                    textAlign: 'left',
                    background: selectedSubcategory === sub ? 'rgba(40,116,240,0.08)' : 'transparent',
                    color: selectedSubcategory === sub ? '#2874f0' : 'var(--text-primary)',
                    fontWeight: selectedSubcategory === sub ? 700 : 500,
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* StitchBee Assured Badge Filter */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={assuredOnly}
                onChange={e => setAssuredOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#2874f0', cursor: 'pointer' }}
              />
              <span className="assured-badge-flipkart" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800 }}>
                <ShieldCheck size={14} style={{ color: '#0284c7' }} /> StitchBee <span style={{ color: '#f59e0b' }}>Assured</span>
              </span>
            </label>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Price Range
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2874f0' }}>
                Up to ₹{priceRange.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="400"
              max="15000"
              step="200"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#2874f0', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>₹400</span>
              <span>₹5,000</span>
              <span>₹15,000+</span>
            </div>
            {/* Quick Price Buttons */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
              {[
                { label: 'Under ₹1K', val: 1000 },
                { label: 'Under ₹2.5K', val: 2500 },
                { label: 'Under ₹5K', val: 5000 },
                { label: 'All Prices', val: 15000 }
              ].map(b => (
                <button
                  key={b.label}
                  onClick={() => setPriceRange(b.val)}
                  style={{
                    padding: '4px 8px',
                    fontSize: '0.72rem',
                    borderRadius: '4px',
                    border: priceRange === b.val ? '1px solid #2874f0' : '1px solid var(--border-color)',
                    background: priceRange === b.val ? 'rgba(40,116,240,0.1)' : 'transparent',
                    color: priceRange === b.val ? '#2874f0' : 'var(--text-secondary)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
              Color Swatches
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {availableColors.map(c => {
                const isSelected = selectedColors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => toggleColor(c.name)}
                    title={c.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 4px',
                      borderRadius: '6px',
                      border: isSelected ? '1.5px solid #2874f0' : '1px solid var(--border-color)',
                      background: isSelected ? 'rgba(40,116,240,0.08)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      style={{ 
                        width: '18px', 
                        height: '18px', 
                        borderRadius: '50%', 
                        background: c.hex, 
                        border: '1px solid rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                      }}
                    >
                      {isSelected && <Check size={11} strokeWidth={3} />}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: isSelected ? '#2874f0' : 'var(--text-secondary)', fontWeight: isSelected ? 700 : 500, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '48px' }}>
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
              Customer Ratings
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { label: '4★ & above', val: 4.0 },
                { label: '4.5★ & above', val: 4.5 },
                { label: 'All Ratings', val: 0 }
              ].map(r => (
                <label key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="rating-filter"
                    checked={minRating === r.val}
                    onChange={() => setMinRating(r.val)}
                    style={{ accentColor: '#2874f0' }}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Offers Filter */}
          <div className="filter-group">
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
              Special Offers
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedOffer === 'special'}
                  onChange={e => setSelectedOffer(e.target.checked ? 'special' : 'all')}
                  style={{ accentColor: '#2874f0' }}
                />
                <span>Special Price (30%+ Off)</span>
              </label>
            </div>
          </div>

        </aside>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: CATALOG RESULTS HEADER & PRODUCT GRID (Image 1)  */}
        {/* ============================================================== */}
        <main className="catalog-content-main">
          {/* Top Breadcrumb & Sorting Strip */}
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              padding: '14px 20px',
              marginBottom: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}
          >
            {/* Breadcrumb Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb}>
                  <span style={{ cursor: idx < breadcrumbs.length - 1 ? 'pointer' : 'default', color: idx === breadcrumbs.length - 1 ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: idx === breadcrumbs.length - 1 ? 600 : 400 }}>
                    {crumb}
                  </span>
                  {idx < breadcrumbs.length - 1 && <ChevronRight size={12} />}
                </React.Fragment>
              ))}
            </div>

            {/* Results Title & Count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>
                  Showing 1 – {filteredProducts.length} of {products.length} results for "{categoryTitle}"
                </h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Authentic artisan handcrafted goods direct from verified master ateliers
                </span>
              </div>
            </div>

            {/* Sort Options Strip (Flipkart style tab switcher) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginRight: '8px' }}>
                Sort By
              </span>
              {[
                { id: 'relevance', label: 'Relevance' },
                { id: 'popularity', label: 'Popularity' },
                { id: 'low-to-high', label: 'Price -- Low to High' },
                { id: 'high-to-low', label: 'Price -- High to Low' },
                { id: 'newest', label: 'Newest First' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    fontWeight: sortBy === s.id ? 700 : 500,
                    borderRadius: '20px',
                    border: 'none',
                    background: sortBy === s.id ? '#2874f0' : 'transparent',
                    color: sortBy === s.id ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid (Matching Image 1 Card Anatomy) */}
          {filteredProducts.length === 0 ? (
            <div 
              style={{
                background: 'var(--bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                padding: '60px 24px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛍️</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                No Products Match Your Filter
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
                Try adjusting your price range or clearing active color filters.
              </p>
              <button onClick={clearAllFilters} className="btn btn-primary" style={{ padding: '8px 24px' }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div 
              className="flipkart-product-grid" 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
                gap: '16px' 
              }}
            >
              {filteredProducts.map(prod => {
                const isItemWishlisted = !!wishlist[prod.id];
                const original = prod.originalPrice || Math.round(prod.price * 1.4);
                const discountPercent = Math.round(((original - prod.price) / original) * 100);

                return (
                  <div
                    key={prod.id}
                    className="flipkart-product-card glass-card"
                    onClick={() => onSelectProduct && onSelectProduct(prod)}
                    style={{
                      background: 'var(--bg-card)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    {/* Top Image Box with Wishlist */}
                    <div style={{ position: 'relative', width: '100%', height: '240px', background: '#0a0914', overflow: 'hidden' }}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        className="catalog-product-img"
                      />

                      {/* Wishlist Heart Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(e, prod.id)}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.85)',
                          backdropFilter: 'blur(4px)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          zIndex: 3
                        }}
                      >
                        <Heart
                          size={16}
                          style={{
                            color: isItemWishlisted ? '#ef4444' : '#64748b',
                            fill: isItemWishlisted ? '#ef4444' : 'none'
                          }}
                        />
                      </button>

                      {/* Sponsored / Brand Tag */}
                      <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
                        {prod.brand || prod.categoryLabel || 'Atelier Direct'}
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        {/* Title */}
                        <h4 
                          style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: 600, 
                            color: 'var(--text-primary)', 
                            margin: '0 0 6px 0',
                            lineHeight: 1.35,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                          title={prod.name}
                        >
                          {prod.name}
                        </h4>

                        {/* Rating & Assured Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#388e3c', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                            {prod.rating || 4.6} <Star size={10} style={{ fill: '#fff' }} />
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            ({prod.reviewsCount || 128})
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', background: '#f0f9ff', color: '#0369a1', padding: '1px 5px', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 800 }}>
                            <ShieldCheck size={11} style={{ color: '#0284c7' }} /> Assured
                          </span>
                        </div>

                        {/* Pricing (Flipkart Style: Current Price, MRP strike, Discount %) */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                          <strong style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            ₹{prod.price.toLocaleString()}
                          </strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            ₹{original.toLocaleString()}
                          </span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#388e3c' }}>
                            {discountPercent}% off
                          </span>
                        </div>

                        {/* Delivery Notice */}
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                          Free delivery by <strong style={{ color: 'var(--text-primary)' }}>Tomorrow</strong>
                        </div>
                      </div>

                      {/* Quick Action Buttons */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onQuickBuy) onQuickBuy(prod);
                            else if (onSelectProduct) onSelectProduct(prod);
                          }}
                          className="btn"
                          style={{
                            flex: 1,
                            padding: '8px 10px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            borderRadius: '6px',
                            background: '#fb641b',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <Zap size={13} /> Buy Now
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAddToCart) onAddToCart(prod);
                          }}
                          className="btn btn-secondary"
                          style={{
                            padding: '8px 12px',
                            fontSize: '0.78rem',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                          title="Add to cart"
                        >
                          <ShoppingCart size={14} />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
