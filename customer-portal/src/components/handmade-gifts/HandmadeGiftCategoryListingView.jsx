import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, ShoppingCart, ArrowRight, ArrowLeft, ChevronRight, 
  Star, Sparkles, Filter, SlidersHorizontal, Check, RefreshCw 
} from 'lucide-react';
import './HandmadeGiftsPage.css';
import { 
  getHandmadeGiftsByCategory, 
  getHandmadeGiftCategory, 
  addHandmadeGiftToCart 
} from '../../utils/handmadeGiftsStore';
import { getWishlist, toggleWishlist } from '../../utils/bagsStore';

export default function HandmadeGiftCategoryListingView({ showToast }) {
  const { categorySlug, slug } = useParams();
  const location = useLocation();
  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const catIdx = pathParts.indexOf('category');
  const pathCatSlug = catIdx !== -1 && pathParts[catIdx + 1] ? pathParts[catIdx + 1] : null;
  const catParam = categorySlug || slug || pathCatSlug || 'all';
  const navigate = useNavigate();

  const categoryInfo = getHandmadeGiftCategory(catParam);
  const products = getHandmadeGiftsByCategory(catParam);

  const [wishlist, setWishlist] = useState(() => getWishlist());
  const [selectedSwatches, setSelectedSwatches] = useState({});
  const [filterPersonalizable, setFilterPersonalizable] = useState(false);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'price-low' | 'price-high' | 'rating'

  const handleWishlistToggle = (productId, productName) => {
    const { updated, added } = toggleWishlist(productId);
    setWishlist(updated);
    if (showToast) {
      showToast(added ? `Saved "${productName}" to your wishlist ❤️` : 'Removed from wishlist');
    }
  };

  const handleAddToCart = (product) => {
    const activeColorIdx = selectedSwatches[product.id] || 0;
    const color = product.colors?.[activeColorIdx]?.name || 'Standard';
    addHandmadeGiftToCart(product, color, null, 1);
    if (showToast) {
      showToast(`Added "${product.name}" (${color}) to cart! 🛍️`);
    }
  };

  const displayedProducts = useMemo(() => {
    let list = [...products];
    if (filterPersonalizable) {
      list = list.filter(p => p.personalizable);
    }
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [products, filterPersonalizable, sortBy]);

  return (
    <div className="hm-category-listing-page" style={{ width: '100%', minHeight: '100vh', background: '#FAF5F2', paddingBottom: '80px' }}>
      
      {/* Breadcrumb Header */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
            <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
            <ChevronRight size={14} className="bl-crumb-sep" />
            <span onClick={() => navigate('/handmade-gifts')} className="bl-crumb-link">Handmade Gifts</span>
            <ChevronRight size={14} className="bl-crumb-sep" />
            <span className="bl-crumb-active">{categoryInfo.name}</span>
          </nav>

          <button
            type="button"
            onClick={() => navigate('/handmade-gifts')}
            style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={15} /> All Handmade Gifts
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 24px 0' }}>
        
        {/* Banner with Title & Quick Custom CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF5F8 0%, #FFFFFF 100%)',
          border: '1px solid #FFE4ED',
          borderRadius: '20px',
          padding: '36px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div>
            <span className="hm-eyebrow">HANDMADE GIFTS COLLECTION</span>
            <h1 className="hm-heading" style={{ fontSize: '2.2rem', margin: '6px 0 8px' }}>
              {categoryInfo.name}
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.95rem', margin: 0, maxWidth: '580px' }}>
              {categoryInfo.heroText || categoryInfo.desc}
            </p>
          </div>

          <button
            type="button"
            className="hm-btn-primary"
            onClick={() => navigate(`/handmade-gifts/customize?category=${catParam}`)}
            style={{ padding: '14px 28px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Sparkles size={16} />
            <span>Customize a {categoryInfo.name.replace(/s$/, '')} →</span>
          </button>
        </div>

        {/* Filter and Sorting Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          background: '#FFFFFF',
          padding: '14px 20px',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>
              Showing {displayedProducts.length} items
            </span>

            <button
              type="button"
              onClick={() => setFilterPersonalizable(prev => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '20px',
                border: filterPersonalizable ? '1.5px solid #FF1678' : '1px solid #CBD5E1',
                background: filterPersonalizable ? '#FFF5F8' : '#FFFFFF',
                color: filterPersonalizable ? '#FF1678' : '#475569',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <span>Personalizable Only</span>
              {filterPersonalizable && <Check size={14} />}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '0.85rem',
                color: '#334155'
              }}
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length > 0 ? (
          <div className="hm-products-grid" style={{ marginBottom: '48px' }}>
            {displayedProducts.map(prod => {
              const activeColorIdx = selectedSwatches[prod.id] || 0;
              const isWishlisted = wishlist.includes(prod.id);

              return (
                <div key={prod.id} className="hm-product-card">
                  
                  {/* Image with Wishlist Button */}
                  <div 
                    className="hm-product-img-wrap"
                    onClick={() => navigate(`/handmade-gifts/product/${prod.slug || prod.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={prod.img} 
                      alt={prod.name} 
                      className="hm-product-img" 
                      loading="lazy"
                    />
                    
                    <button 
                      type="button" 
                      className={`hm-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(prod.id, prod.name);
                      }}
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={16} fill={isWishlisted ? '#FF1678' : 'none'} color={isWishlisted ? '#FF1678' : '#1E293B'} />
                    </button>
                  </div>

                  {/* Body & Footer */}
                  <div className="hm-product-body">
                    <div 
                      className="hm-product-title"
                      onClick={() => navigate(`/handmade-gifts/product/${prod.slug || prod.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {prod.name}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                      <span className="hm-product-price">₹{prod.price.toLocaleString('en-IN')}</span>
                      {prod.originalPrice && (
                        <span style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: '#94A3B8' }}>
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    
                    <div className="hm-product-footer">
                      {/* Swatches */}
                      <div className="hm-swatches-row">
                        {prod.colors && prod.colors.map((c, idx) => (
                          <button
                            key={c.name}
                            type="button"
                            className={`hm-color-dot ${activeColorIdx === idx ? 'active' : ''}`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            onClick={() => {
                              setSelectedSwatches(prev => ({ ...prev, [prod.id]: idx }));
                              if (showToast) showToast(`Selected ${c.name} for ${prod.name}`);
                            }}
                          />
                        ))}
                      </div>

                      {/* Pink Cart Button */}
                      <button 
                        type="button"
                        className="hm-cart-btn"
                        onClick={() => handleAddToCart(prod)}
                        title="Add to Cart"
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
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#1E293B', marginBottom: '8px' }}>No products match this filter</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '20px' }}>Try resetting your filter or creating a custom stitched piece.</p>
            <button
              type="button"
              className="hm-btn-secondary"
              onClick={() => setFilterPersonalizable(false)}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Custom Design Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1A2B4C 0%, #0D3B3A 100%)',
          borderRadius: '20px',
          padding: '36px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 6px', color: '#FFFFFF' }}>
              Have a Unique Vision in Mind?
            </h3>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.92rem', maxWidth: '520px', color: '#FFFFFF' }}>
              Our master artisans can create completely custom {categoryInfo.name.toLowerCase()} tailored to your fabric, embroidery, size, and color preferences.
            </p>
          </div>

          <button
            type="button"
            className="hm-btn-primary"
            onClick={() => navigate(`/handmade-gifts/customize?category=${catParam}`)}
            style={{ padding: '14px 28px', cursor: 'pointer' }}
          >
            Start Customizing →
          </button>
        </div>

      </div>

    </div>
  );
}
