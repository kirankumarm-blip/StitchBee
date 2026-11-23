import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingCart, ShoppingBag, Trash2, ChevronRight, ArrowLeft, Star, 
  Sparkles, CheckCircle2, Search, X, ArrowUpDown, ExternalLink 
} from 'lucide-react';
import { addToCart } from '../../utils/bagsStore';
import { 
  getWishlist, 
  getWishlistProducts, 
  toggleWishlist, 
  clearWishlist, 
  WISHLIST_SERVICE_CATEGORIES 
} from '../../utils/wishlistStore';

export default function BagsWishlistView({ showToast }) {
  const navigate = useNavigate();

  // Wishlist products state loaded from centralized store
  const [wishlistProducts, setWishlistProducts] = useState(() => getWishlistProducts());
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recently-added');

  // Sync state when any component dispatches store update
  useEffect(() => {
    const handleStoreUpdate = () => {
      setWishlistProducts(getWishlistProducts());
    };
    window.addEventListener('stitchbee-store-update', handleStoreUpdate);
    return () => window.removeEventListener('stitchbee-store-update', handleStoreUpdate);
  }, []);

  // Category counts map for filter pills
  const categoryCounts = useMemo(() => {
    const counts = { all: wishlistProducts.length };
    WISHLIST_SERVICE_CATEGORIES.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = wishlistProducts.filter(p => p.serviceCategory === cat.id).length;
      }
    });
    return counts;
  }, [wishlistProducts]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let list = [...wishlistProducts];

    // 1. Filter by category
    if (selectedCategoryFilter !== 'all') {
      list = list.filter(p => p.serviceCategory === selectedCategoryFilter);
    }

    // 2. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.serviceCategoryLabel && p.serviceCategoryLabel.toLowerCase().includes(q)) ||
        (p.material && p.material.toLowerCase().includes(q))
      );
    }

    // 3. Sort
    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'recently-added':
      default:
        // Preserves current store order
        break;
    }

    return list;
  }, [wishlistProducts, selectedCategoryFilter, searchQuery, sortBy]);

  // Direct product route helper
  const getProductRoute = (prod) => {
    if (prod.route) return prod.route;
    if (prod.serviceCategory === 'clothing' || prod.categoryId || prod.gender) {
      return '/uniforms';
    }
    if (prod.serviceCategory === 'seats' || prod.vehicleType) {
      return '/seats';
    }
    if (prod.serviceCategory === 'pets' || prod.petType) {
      return `/pets/product/${prod.slug || prod.id}`;
    }
    if (prod.serviceCategory === 'gifts' || prod.catId || prod.category === 'Handmade Gifts') {
      return `/handmade-gifts/product/${prod.slug || prod.id}`;
    }
    if (prod.serviceCategory === 'sofas' || prod.seatingCapacity) {
      return `/sofas/product/${prod.slug || prod.id}`;
    }
    if (prod.serviceCategory === 'shoes' || (prod.slug && prod.sizes)) {
      return `/footwear/product/${prod.slug || prod.id}`;
    }
    if (prod.serviceCategory === 'kids') {
      return '/kids/shop';
    }
    return `/bags/product/${prod.id}`;
  };

  // Badge class helper
  const getBadgeClass = (serviceCategory) => {
    switch (serviceCategory) {
      case 'clothing':
      case 'uniforms':
        return 'bl-cat-badge-clothing';
      case 'bags':
        return 'bl-cat-badge-bags';
      case 'shoes':
        return 'bl-cat-badge-shoes';
      case 'seats':
        return 'bl-cat-badge-seats';
      case 'pets':
        return 'bl-cat-badge-pets';
      case 'gifts':
        return 'bl-cat-badge-gifts';
      case 'sofas':
        return 'bl-cat-badge-sofas';
      case 'kids':
        return 'bl-cat-badge-kids';
      default:
        return 'bl-cat-badge-bags';
    }
  };

  // Remove from Wishlist
  const handleRemove = (productId) => {
    toggleWishlist(productId);
    if (showToast) {
      showToast('Removed item from your wishlist');
    }
  };

  // Move to Shopping Bag / Cart
  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
    if (showToast) {
      showToast(`Moved "${product.name}" to your shopping bag! 🛍️`);
    }
  };

  // Clear all wishlist items
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved items from your wishlist?')) {
      clearWishlist();
      if (showToast) {
        showToast('All items cleared from your wishlist');
      }
    }
  };

  return (
    <div className="bl-wishlist-page">
      <div className="bl-container" style={{ padding: '24px 12px 60px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
          <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">My Central Wishlist</span>
        </nav>

        {/* Category Quick Links */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="bl-back-btn" onClick={() => navigate('/uniforms')}>
            👔 School & Corporate Uniforms
          </button>
          <button className="bl-back-btn" onClick={() => navigate('/bags')}>
            👜 Bags Atelier
          </button>
          <button className="bl-back-btn" onClick={() => navigate('/footwear')}>
            👞 Shoes & Slippers
          </button>
          <button className="bl-back-btn" onClick={() => navigate('/seats')}>
            🚗 Vehicle Seat Covers
          </button>
          <button className="bl-back-btn" onClick={() => navigate('/pets')}>
            🐾 Pet Outfits
          </button>
          <button className="bl-back-btn" onClick={() => navigate('/handmade-gifts')}>
            🎁 Handmade Gifts
          </button>
          <button className="bl-back-btn" onClick={() => navigate('/sofas')}>
            🛋️ Sofas & Living
          </button>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '24px' }}>
          <span className="bl-tag-label">CENTRALIZED ARTISAN WISHLIST</span>
          <h1 className="bl-serif-title" style={{ fontSize: '2.4rem', margin: '4px 0 6px' }}>
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="bl-section-subtext" style={{ margin: 0 }}>
            Saved handcrafted creations, tailored uniforms, custom seat covers, and bespoke designs across all StitchBeez categories.
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="bl-wishlist-filters-bar">
          {WISHLIST_SERVICE_CATEGORIES.map(cat => {
            const count = categoryCounts[cat.id] || 0;
            const isActive = selectedCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`bl-wishlist-filter-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategoryFilter(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="bl-wishlist-pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Controls Row: Search, Sort, Clear */}
        <div className="bl-wishlist-controls-row">
          <div className="bl-wishlist-search-box">
            <Search size={16} className="bl-wishlist-search-icon" />
            <input 
              type="text"
              placeholder="Search saved designs, materials, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="bl-wishlist-search-clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="bl-wishlist-actions-right">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpDown size={14} color="var(--bl-text-secondary)" />
              <select
                className="bl-wishlist-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recently-added">Sort: Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {wishlistProducts.length > 0 && (
              <button 
                type="button"
                className="bl-wishlist-clear-btn"
                onClick={handleClearAll}
                title="Clear all saved items"
              >
                <Trash2 size={14} /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Main Wishlist Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="bl-wishlist-grid">
            {filteredProducts.map(product => {
              const discountPct = product.originalPrice && product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : null;

              return (
                <div key={product.id} className="bl-product-card bl-wishlist-card">
                  {/* Image box with remove button */}
                  <div 
                    className="bl-prod-img-box"
                    onClick={() => navigate(getProductRoute(product))}
                    style={{ cursor: 'pointer', position: 'relative' }}
                  >
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/logo.png';
                      }}
                    />

                    {/* Service Category Tag overlay on image */}
                    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
                      <span className={`bl-prod-cat-tag ${getBadgeClass(product.serviceCategory)}`} style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 700 }}>
                        {(product.serviceCategoryLabel || product.serviceCategory || 'ARTISAN').toUpperCase()}
                      </span>
                    </div>

                    {/* Remove Trash Button */}
                    <button 
                      type="button"
                      className="bl-prod-wish-btn active"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(product.id);
                      }}
                      title="Remove from wishlist"
                    >
                      <Trash2 size={15} color="#f72585" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="bl-prod-info">
                    <div className="bl-prod-meta-top">
                      <span className="bl-prod-cat-tag">{(product.category || 'ARTISAN').toUpperCase()}</span>
                      <div className="bl-prod-rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating}</span>
                        {product.reviews && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--bl-text-secondary)', marginLeft: '2px' }}>
                            ({product.reviews})
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 
                      className="bl-prod-name"
                      onClick={() => navigate(getProductRoute(product))}
                      style={{ cursor: 'pointer' }}
                    >
                      {product.name}
                    </h4>
                    <p className="bl-prod-mat-brief">{product.material}</p>

                    <div className="bl-prod-price-row">
                      <div className="bl-prod-price">₹{product.price.toLocaleString('en-IN')}</div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="bl-prod-price-orig">₹{product.originalPrice.toLocaleString('en-IN')}</div>
                      )}
                      {discountPct && (
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16a34a', background: 'rgba(22, 163, 74, 0.1)', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px' }}>
                          {discountPct}% OFF
                        </span>
                      )}
                    </div>

                    <div className="bl-wishlist-actions-row">
                      <button 
                        type="button"
                        className="bl-btn-primary bl-wishlist-move-btn"
                        onClick={() => handleMoveToCart(product)}
                      >
                        <ShoppingBag size={15} /> Move to Bag
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bl-empty-state-card" style={{ padding: '48px 20px', textAlign: 'center' }}>
            <div className="bl-empty-icon-circle" style={{ width: '72px', height: '72px', margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(247, 37, 133, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={36} color="var(--bl-pink, #f72585)" />
            </div>

            <h3 className="bl-serif-title" style={{ fontSize: '1.7rem', margin: '12px 0 8px' }}>
              {searchQuery || selectedCategoryFilter !== 'all' 
                ? 'No matching saved items found' 
                : 'Your Central Wishlist is empty'}
            </h3>

            <p style={{ color: 'var(--bl-text-secondary)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6, fontSize: '0.92rem' }}>
              {searchQuery 
                ? `No saved designs match "${searchQuery}". Try a different keyword or reset filters.`
                : selectedCategoryFilter !== 'all'
                  ? `You haven't saved any items from ${WISHLIST_SERVICE_CATEGORIES.find(c => c.id === selectedCategoryFilter)?.label || 'this category'} yet. Tap the heart icon on any product to save it here!`
                  : 'Tap the heart icon on any design across StitchBeez categories — Uniforms, Bags, Shoes, Vehicle Seat Covers, Pet Outfits, and more — to view and manage them together here.'}
            </p>

            {(searchQuery || selectedCategoryFilter !== 'all') ? (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  type="button"
                  className="bl-btn-primary"
                  onClick={() => {
                    setSelectedCategoryFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters & View All
                </button>
              </div>
            ) : null}

            {/* Quick Category Discovery Grid */}
            <div className="bl-wishlist-discovery-grid">
              <div className="bl-wishlist-discovery-card" onClick={() => navigate('/uniforms')}>
                <div className="bl-wishlist-discovery-icon">👔</div>
                <div className="bl-wishlist-discovery-text">
                  <h5>School & Corporate Uniforms</h5>
                  <p>12 custom styles</p>
                </div>
              </div>

              <div className="bl-wishlist-discovery-card" onClick={() => navigate('/bags/shop')}>
                <div className="bl-wishlist-discovery-icon">👜</div>
                <div className="bl-wishlist-discovery-text">
                  <h5>Bags & Leather Atelier</h5>
                  <p>Handcrafted luxury</p>
                </div>
              </div>

              <div className="bl-wishlist-discovery-card" onClick={() => navigate('/footwear')}>
                <div className="bl-wishlist-discovery-icon">👞</div>
                <div className="bl-wishlist-discovery-text">
                  <h5>Shoes & Slippers</h5>
                  <p>Bespoke leather footwear</p>
                </div>
              </div>

              <div className="bl-wishlist-discovery-card" onClick={() => navigate('/seats')}>
                <div className="bl-wishlist-discovery-icon">🚗</div>
                <div className="bl-wishlist-discovery-text">
                  <h5>Vehicle Seat Covers</h5>
                  <p>Custom tailored fit</p>
                </div>
              </div>

              <div className="bl-wishlist-discovery-card" onClick={() => navigate('/pets')}>
                <div className="bl-wishlist-discovery-icon">🐾</div>
                <div className="bl-wishlist-discovery-text">
                  <h5>Pet Outfits & Costumes</h5>
                  <p>Custom fit pet wear</p>
                </div>
              </div>

              <div className="bl-wishlist-discovery-card" onClick={() => navigate('/handmade-gifts')}>
                <div className="bl-wishlist-discovery-icon">🎁</div>
                <div className="bl-wishlist-discovery-text">
                  <h5>Handmade Gifts</h5>
                  <p>Artisan personalized</p>
                </div>
              </div>

              <div className="bl-wishlist-discovery-card" onClick={() => navigate('/sofas')}>
                <div className="bl-wishlist-discovery-icon">🛋️</div>
                <div className="bl-wishlist-discovery-text">
                  <h5>Sofas & Living Room</h5>
                  <p>Custom sofa covers</p>
                </div>
              </div>

              <div className="bl-wishlist-discovery-card" onClick={() => navigate('/kids/shop')}>
                <div className="bl-wishlist-discovery-icon">👶</div>
                <div className="bl-wishlist-discovery-text">
                  <h5>Kids Wear</h5>
                  <p>Festive & everyday</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
