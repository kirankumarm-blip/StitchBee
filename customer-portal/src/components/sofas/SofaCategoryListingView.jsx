import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, ShoppingCart, ArrowRight, ArrowLeft, ChevronRight, 
  Star, Sparkles, Filter, SlidersHorizontal, Check 
} from 'lucide-react';
import './SofasShopPage.css';
import { 
  SOFA_CATEGORIES, 
  ALL_SOFA_PRODUCTS, 
  getSofaCategoryById, 
  getSofaProductsByCategory, 
  addSofaToCart, 
  toggleSofaWishlist, 
  getSofaWishlist 
} from '../../utils/sofasStore';

export default function SofaCategoryListingView({ showToast, onAddToCart, onNavigateProduct }) {
  const { categorySlug, slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const catIdx = pathParts.indexOf('category');
  const pathCatSlug = catIdx !== -1 && pathParts[catIdx + 1] ? pathParts[catIdx + 1] : null;
  const currentCategorySlug = categorySlug || slug || pathCatSlug || 'all';

  const category = currentCategorySlug === 'all' 
    ? { name: 'All Sofas & Living Furniture', desc: 'Browse our complete handcrafted living room collection.' }
    : getSofaCategoryById(currentCategorySlug);

  const rawProducts = getSofaProductsByCategory(currentCategorySlug);

  const [wishlist, setWishlist] = useState(() => getSofaWishlist());
  const [selectedSwatches, setSelectedSwatches] = useState({});
  const [sizeFilter, setSizeFilter] = useState('all'); // 'all' | '2-seater' | '3-seater' | 'sectional' | 'recliner'
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'

  const handleWishlistToggle = (productId, productName) => {
    const updated = toggleSofaWishlist(productId);
    setWishlist(updated);
    const added = updated.includes(productId);
    if (showToast) {
      showToast(added ? `Saved "${productName}" to wishlist ♡` : 'Removed from wishlist');
    }
  };

  const handleAddToCartClick = (e, product) => {
    e.stopPropagation();
    const activeColor = selectedSwatches[product.id] || product.defaultColor;
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor: activeColor,
      selectedSize: product.defaultSize,
      quantity: 1,
      itemType: 'product'
    };
    addSofaToCart(item);
    if (onAddToCart) onAddToCart(item);
    if (showToast) {
      showToast(`Added "${product.name}" (${activeColor}) to cart!`);
    }
  };

  const displayedProducts = useMemo(() => {
    let list = [...rawProducts];

    if (sizeFilter !== 'all') {
      list = list.filter(p => {
        const text = `${p.name} ${p.defaultSize} ${p.category}`.toLowerCase();
        return text.includes(sizeFilter);
      });
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [rawProducts, sizeFilter, sortBy]);

  return (
    <div className="sofa-shop-page-root" style={{ paddingTop: '20px' }}>
      <div className="sofa-featured-section" style={{ width: '100%', maxWidth: '100%', padding: '0 48px', margin: '0 auto 60px auto' }}>
        
        {/* Breadcrumb Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748B', marginBottom: '24px' }}>
          <button 
            type="button" 
            onClick={() => navigate('/sofas')}
            style={{ background: 'none', border: 'none', color: '#E11D74', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 600, padding: 0 }}
          >
            <ArrowLeft size={16} />
            <span>Sofas Home</span>
          </button>
          <span>/</span>
          <span>Categories</span>
          <span>/</span>
          <strong style={{ color: '#14213D' }}>{category.name}</strong>
        </div>

        {/* Category Header Banner */}
        <div style={{ background: 'linear-gradient(135deg, #FAF6F0 0%, #F5EBE1 100%)', borderRadius: '20px', padding: '36px 32px', marginBottom: '36px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="sofa-section-eyebrow">CURATED COLLECTION</span>
            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.4rem', fontWeight: 700, color: '#14213D', margin: '4px 0 8px 0' }}>
              {category.name}
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.95rem', margin: 0, maxWidth: '640px' }}>
              {category.desc || category.heroText}
            </p>
          </div>

          <button 
            type="button" 
            className="sofa-btn-primary"
            onClick={() => navigate('/sofas/customize')}
            style={{ padding: '12px 24px' }}
          >
            Need Custom Dimensions?
          </button>
        </div>

        {/* Filters and Sorting Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
          {/* Category Chips */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              type="button"
              onClick={() => navigate('/sofas/products')}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: currentCategorySlug === 'all' ? 700 : 500,
                border: currentCategorySlug === 'all' ? '2px solid #E11D74' : '1px solid #CBD5E1',
                background: currentCategorySlug === 'all' ? '#FCE7F3' : '#FFFFFF',
                color: currentCategorySlug === 'all' ? '#E11D74' : '#14213D',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              All Categories
            </button>
            {SOFA_CATEGORIES.filter(c => !c.isCustom).map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => navigate(`/sofas/category/${c.id}`)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: currentCategorySlug === c.id ? 700 : 500,
                  border: currentCategorySlug === c.id ? '2px solid #E11D74' : '1px solid #CBD5E1',
                  background: currentCategorySlug === c.id ? '#FCE7F3' : '#FFFFFF',
                  color: currentCategorySlug === c.id ? '#E11D74' : '#14213D',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', color: '#14213D', background: '#FFFFFF', cursor: 'pointer' }}
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="sofa-products-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '22px' }}>
          {displayedProducts.map(product => {
            const inWishlist = wishlist.includes(product.id);
            const activeColor = selectedSwatches[product.id] || product.defaultColor;

            return (
              <div 
                key={product.id}
                className="sofa-product-card"
                onClick={() => {
                  if (onNavigateProduct) onNavigateProduct(product.id);
                  else navigate(`/sofas/product/${product.id}`);
                }}
              >
                <div className="sofa-product-img-box">
                  <img src={product.image} alt={product.name} className="sofa-prod-img" />
                  <button 
                    type="button"
                    className={`sofa-wishlist-heart-btn ${inWishlist ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(product.id, product.name);
                    }}
                  >
                    <Heart size={18} fill={inWishlist ? "#E11D74" : "none"} color={inWishlist ? "#E11D74" : "#64748B"} />
                  </button>
                </div>

                <div className="sofa-product-details">
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
                    {product.categoryLabel}
                  </span>
                  <h4 className="sofa-prod-title">{product.name}</h4>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#059669', fontSize: '0.78rem', fontWeight: 700 }}>
                      <Star size={13} fill="#059669" />
                      <span>{product.rating}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>({product.reviewsCount})</span>
                  </div>

                  <div className="sofa-prod-price-row">
                    <span className="sofa-prod-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span style={{ fontSize: '0.85rem', color: '#94A3B8', textDecoration: 'line-through', marginLeft: '8px' }}>
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="sofa-prod-actions-row">
                    <div className="sofa-color-swatches" onClick={e => e.stopPropagation()}>
                      {product.colors.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`color-swatch-dot ${activeColor === c.name ? 'selected' : ''}`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                          onClick={() => setSelectedSwatches({ ...selectedSwatches, [product.id]: c.name })}
                        />
                      ))}
                    </div>

                    <button 
                      type="button"
                      className="sofa-cart-icon-btn"
                      onClick={(e) => handleAddToCartClick(e, product)}
                      title="Add to Cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
