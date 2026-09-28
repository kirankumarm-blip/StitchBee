import React, { useState, useMemo } from 'react';
import { 
  Star, Heart, ShieldCheck, ChevronRight, SlidersHorizontal, 
  RotateCcw, ArrowUpDown, Check, Eye, ShoppingCart, Zap, Filter, Award, Sparkles
} from 'lucide-react';

export default function FlipkartCatalogView({
  categoryKey = 'bags',
  categoryTitle = 'Handmade Bags & Leather',
  breadcrumbs = [],
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

  const activeFilterCount = (selectedColors.length > 0 ? 1 : 0) + 
    (assuredOnly ? 1 : 0) + 
    (selectedSubcategory !== 'all' ? 1 : 0) + 
    (priceRange < 15000 ? 1 : 0) + 
    (minRating > 0 ? 1 : 0) + 
    (selectedOffer !== 'all' ? 1 : 0);

  return (
    <div className="flipkart-catalog-container animate-fade-in">
      {/* Mobile Filter Toggle Bar */}
      <div className="catalog-mobile-bar" style={{ display: 'none', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', marginBottom: '16px', borderRadius: '12px' }}>
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="btn-leather-primary has-white-text"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.85rem', fontWeight: 700, borderRadius: '12px', background: 'var(--primary)', border: 'none', color: '#ffffff', boxShadow: '0 4px 14px rgba(247, 37, 133, 0.35)' }}
        >
          <Filter size={16} /> Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          {filteredProducts.length} Results
        </span>
      </div>

      <div className="catalog-main-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: FILTERS SIDEBAR (App Pink Brand Redesign)        */}
        {/* ============================================================== */}
        <aside 
          className={`catalog-filter-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}
          style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '22px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            position: 'sticky',
            top: '80px'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.01em' }}>
              <SlidersHorizontal size={18} style={{ color: '#f72585' }} />
              Filters
            </h3>
            {activeFilterCount > 0 && (
              <button 
                onClick={clearAllFilters}
                style={{ 
                  background: 'rgba(247, 37, 133, 0.12)', 
                  border: '1px solid rgba(247, 37, 133, 0.3)', 
                  color: '#f72585', 
                  fontSize: '0.74rem', 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  textTransform: 'uppercase',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.15s ease'
                }}
              >
                <RotateCcw size={11} /> Reset
              </button>
            )}
          </div>

          {/* Categories / Subcategories */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f72585', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
              Categories
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* All Category Pill */}
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`leather-cat-btn ${selectedSubcategory === 'all' ? 'active has-white-text' : ''}`}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: selectedSubcategory === 'all' ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: selectedSubcategory === 'all' ? 'var(--primary)' : 'transparent',
                  color: selectedSubcategory === 'all' ? '#ffffff' : 'var(--text-primary)',
                  border: 'none',
                  boxShadow: selectedSubcategory === 'all' ? '0 4px 14px rgba(247, 37, 133, 0.35)' : 'none',
                  transition: 'all 0.18s ease'
                }}
              >
                <span>All {categoryTitle}</span>
                <span style={{ 
                  fontSize: '0.72rem', 
                  background: selectedSubcategory === 'all' ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.06)', 
                  color: selectedSubcategory === 'all' ? '#ffffff' : 'var(--text-muted)', 
                  padding: '3px 8px', 
                  borderRadius: '10px', 
                  fontWeight: 700 
                }}>
                  {products.length}
                </span>
              </button>

              {/* Subcategories */}
              {subcategories.map(sub => {
                const isSelected = selectedSubcategory === sub;
                const count = products.filter(p => (p.subcategory === sub || p.categoryLabel === sub)).length;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`leather-cat-btn ${isSelected ? 'active has-white-text' : ''}`}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isSelected ? 'var(--primary)' : 'transparent',
                      color: isSelected ? '#ffffff' : 'var(--text-primary)',
                      border: 'none',
                      boxShadow: isSelected ? '0 4px 14px rgba(247, 37, 133, 0.35)' : 'none',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    <span>{sub}</span>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      background: isSelected ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.06)', 
                      color: isSelected ? '#ffffff' : 'var(--text-muted)', 
                      padding: '3px 8px', 
                      borderRadius: '10px', 
                      fontWeight: 600 
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* StitchBee Assured Badge Filter (App Pink & Teal Branding) */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px' }}>
            <div 
              onClick={() => setAssuredOnly(!assuredOnly)}
              className={`leather-assured-seal ${assuredOnly ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                userSelect: 'none',
                padding: '12px 14px',
                borderRadius: '10px',
                border: assuredOnly ? '1.5px solid #f72585' : '1px solid var(--border-color)',
                background: assuredOnly ? 'linear-gradient(135deg, rgba(247, 37, 133, 0.16), rgba(114, 9, 183, 0.08))' : 'rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: assuredOnly ? '2px solid #f72585' : '1.5px solid var(--border-color)',
                background: assuredOnly ? '#f72585' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}>
                {assuredOnly && <Check size={12} strokeWidth={3} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  <ShieldCheck size={16} style={{ color: '#f72585' }} />
                  StitchBee <span style={{ color: '#4cc9f0' }}>Assured</span>
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px', lineHeight: 1.25 }}>
                  100% verified quality & artisan craft
                </span>
              </div>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f72585', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Price Range
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f72585', background: 'rgba(247, 37, 133, 0.1)', border: '1px solid rgba(247, 37, 133, 0.25)', padding: '2px 8px', borderRadius: '12px' }}>
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
              style={{ width: '100%', accentColor: '#f72585', cursor: 'pointer', height: '6px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 500 }}>
              <span>₹400</span>
              <span>₹5,000</span>
              <span>₹15,000+</span>
            </div>
            {/* Quick Price Buttons */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
              {[
                { label: 'Under ₹1K', val: 1000 },
                { label: 'Under ₹2.5K', val: 2500 },
                { label: 'Under ₹5K', val: 5000 },
                { label: 'All Prices', val: 15000 }
              ].map(b => {
                const isActive = priceRange === b.val;
                return (
                  <button
                    key={b.label}
                    onClick={() => setPriceRange(b.val)}
                    className={`leather-price-pill ${isActive ? 'active has-white-text' : ''}`}
                    style={{
                      padding: '7px 12px',
                      fontSize: '0.76rem',
                      borderRadius: '10px',
                      border: isActive ? 'none' : '1px solid var(--border-color)',
                      background: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      fontWeight: isActive ? 700 : 500,
                      boxShadow: isActive ? '0 3px 10px rgba(247, 37, 133, 0.35)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Filter */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f72585', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
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
                      gap: '5px',
                      padding: '8px 4px',
                      borderRadius: '8px',
                      border: isSelected ? '1.5px solid #f72585' : '1px solid var(--border-color)',
                      background: isSelected ? 'rgba(247, 37, 133, 0.1)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    <span 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        background: c.hex, 
                        border: '1px solid rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: isSelected ? '0 0 0 2px var(--bg-card), 0 0 0 4px #f72585' : 'none',
                        transform: isSelected ? 'scale(1.08)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isSelected && <Check size={11} strokeWidth={3} />}
                    </span>
                    <span style={{ fontSize: '0.66rem', color: isSelected ? '#f72585' : 'var(--text-secondary)', fontWeight: isSelected ? 700 : 500, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '52px' }}>
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div className="filter-group" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f72585', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
              Customer Ratings
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: '4.5★ & above', val: 4.5, stars: '★★★★½' },
                { label: '4.0★ & above', val: 4.0, stars: '★★★★☆' },
                { label: 'All Ratings', val: 0, stars: 'All' }
              ].map(r => {
                const isSelected = minRating === r.val;
                return (
                  <label 
                    key={r.label} 
                    onClick={() => setMinRating(r.val)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      background: isSelected ? 'rgba(247, 37, 133, 0.1)' : 'transparent',
                      border: isSelected ? '1px solid rgba(247, 37, 133, 0.35)' : '1px solid transparent',
                      fontSize: '0.82rem', 
                      color: isSelected ? '#f72585' : 'var(--text-primary)', 
                      cursor: 'pointer',
                      fontWeight: isSelected ? 700 : 500,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="rating-filter"
                        checked={isSelected}
                        onChange={() => setMinRating(r.val)}
                        style={{ accentColor: '#f72585', cursor: 'pointer' }}
                      />
                      <span>{r.label}</span>
                    </span>
                    {r.stars !== 'All' && (
                      <span style={{ color: '#f59e0b', fontSize: '0.78rem', letterSpacing: '1px' }}>
                        {r.stars}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Special Offers Filter */}
          <div className="filter-group">
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f72585', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
              Special Offers
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label 
                onClick={() => setSelectedOffer(selectedOffer === 'special' ? 'all' : 'special')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  fontSize: '0.82rem', 
                  color: selectedOffer === 'special' ? '#f72585' : 'var(--text-primary)', 
                  cursor: 'pointer',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  background: selectedOffer === 'special' ? 'rgba(247, 37, 133, 0.1)' : 'transparent',
                  border: selectedOffer === 'special' ? '1px solid rgba(247, 37, 133, 0.35)' : '1px solid transparent',
                  fontWeight: selectedOffer === 'special' ? 700 : 500
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedOffer === 'special'}
                  onChange={e => setSelectedOffer(e.target.checked ? 'special' : 'all')}
                  style={{ accentColor: '#f72585' }}
                />
                <span>Special Discount (30%+ Off)</span>
              </label>
            </div>
          </div>

        </aside>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: CATALOG RESULTS HEADER & PRODUCT GRID            */}
        {/* ============================================================== */}
        <main className="catalog-content-main">
          {/* Top Results & Sorting Strip (Breadcrumb Removed per Request 1) */}
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '18px 24px',
              marginBottom: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}
          >
            {/* Results Title & Count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f72585', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  <Award size={14} style={{ color: '#f72585' }} /> StitchBee Verified Studio
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Showing 1 – {filteredProducts.length} of {products.length} results for "{categoryTitle}"
                </h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Authentic artisan handcrafted goods direct from verified master ateliers
                </span>
              </div>
            </div>

            {/* Sort Options Strip (App Pink Segmented Control) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginRight: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowUpDown size={14} style={{ color: '#f72585' }} /> Sort By:
              </span>
              {[
                { id: 'relevance', label: 'Relevance' },
                { id: 'popularity', label: 'Popularity' },
                { id: 'low-to-high', label: 'Price -- Low to High' },
                { id: 'high-to-low', label: 'Price -- High to Low' },
                { id: 'newest', label: 'Newest First' }
              ].map(s => {
                const isActive = sortBy === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSortBy(s.id)}
                    className={`catalog-sort-btn ${isActive ? 'active has-white-text' : ''}`}
                    style={{
                      padding: '8px 18px',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 700 : 500,
                      borderRadius: '12px',
                      border: isActive ? 'none' : '1px solid var(--border-color)',
                      background: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 4px 14px rgba(247, 37, 133, 0.35)' : 'none',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Cards Grid (Luxury Atelier Cards) */}
          {filteredProducts.length === 0 ? (
            <div 
              style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
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
                Try adjusting your price range or clearing active color swatches.
              </p>
              <button 
                onClick={clearAllFilters} 
                className="btn-leather-primary has-white-text" 
                style={{ padding: '12px 28px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', background: 'var(--primary)', border: 'none', boxShadow: '0 4px 14px rgba(247, 37, 133, 0.35)' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div 
              className="flipkart-product-grid" 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
                gap: '20px' 
              }}
            >
              {filteredProducts.map(prod => {
                const isItemWishlisted = !!wishlist[prod.id];
                const original = prod.originalPrice || Math.round(prod.price * 1.4);
                const discountPercent = Math.round(((original - prod.price) / original) * 100);

                return (
                  <div
                    key={prod.id}
                    className="leather-luxury-card"
                    onClick={() => onSelectProduct && onSelectProduct(prod)}
                    style={{
                      background: 'var(--bg-card)',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {/* Top Image Box with Atelier Badges & Wishlist */}
                    <div style={{ position: 'relative', width: '100%', height: '250px', background: '#0a0914', overflow: 'hidden' }}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease'
                        }}
                        className="catalog-product-img"
                      />

                      {/* Luxury Atelier Floating Tag */}
                      <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                        <span style={{ 
                          fontSize: '0.68rem', 
                          fontWeight: 800, 
                          background: 'rgba(15, 23, 42, 0.85)', 
                          color: '#f72585', 
                          backdropFilter: 'blur(4px)', 
                          padding: '3px 8px', 
                          borderRadius: '6px', 
                          border: '1px solid rgba(247, 37, 133, 0.4)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase'
                        }}>
                          <Sparkles size={11} style={{ color: '#f72585' }} /> Handcrafted
                        </span>
                      </div>

                      {/* Wishlist Heart Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(e, prod.id)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(6px)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          zIndex: 3,
                          transition: 'transform 0.15s ease'
                        }}
                        title="Save to wishlist"
                      >
                        <Heart
                          size={16}
                          style={{
                            color: isItemWishlisted ? '#ef4444' : '#64748b',
                            fill: isItemWishlisted ? '#ef4444' : 'none'
                          }}
                        />
                      </button>
                    </div>

                    {/* Card Content Details */}
                    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        {/* Brand Name */}
                        <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                          {prod.brand || 'StitchBee Atelier'}
                        </div>

                        {/* Title */}
                        <h4 
                          style={{ 
                            fontSize: '0.92rem', 
                            fontWeight: 600, 
                            color: 'var(--text-primary)', 
                            margin: '0 0 8px 0',
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                          title={prod.name}
                        >
                          {prod.name}
                        </h4>

                        {/* Assured & Rating Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#388e3c', color: '#fff', padding: '2px 7px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                            {prod.rating || 4.6} <Star size={10} style={{ fill: '#fff' }} />
                          </span>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            ({prod.reviewsCount || 120})
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(247, 37, 133, 0.12)', color: '#f72585', padding: '2px 7px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                            <ShieldCheck size={12} style={{ color: '#f72585' }} /> Assured
                          </span>
                        </div>

                        {/* Pricing */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                          <strong style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            ₹{prod.price.toLocaleString()}
                          </strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            ₹{original.toLocaleString()}
                          </span>
                          <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#388e3c', background: 'rgba(56, 142, 60, 0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                            {discountPercent}% OFF
                          </span>
                        </div>
                      </div>

                      {/* Card Action Button (App Pink with Crisp White Text by Default) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct && onSelectProduct(prod);
                        }}
                        className="btn-leather-primary has-white-text"
                        style={{
                          marginTop: '12px',
                          width: '100%',
                          padding: '11px 18px',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          background: 'var(--primary)',
                          border: 'none',
                          color: '#ffffff',
                          boxShadow: '0 4px 14px rgba(247, 37, 133, 0.35)'
                        }}
                      >
                        <Eye size={15} /> View Details
                      </button>
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
