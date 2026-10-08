import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, ShoppingCart, ArrowRight, ArrowLeft, ChevronRight, 
  Star, Sparkles, Filter, SlidersHorizontal, Check, ShieldCheck, Car
} from 'lucide-react';
import './VehicleSeatShopPage.css';
import { 
  VEHICLE_CATEGORIES, 
  ALL_SEAT_PRODUCTS, 
  getVehicleSeatCategoryById, 
  getVehicleSeatProductsByCategory, 
  addVehicleSeatToCart, 
  toggleVehicleSeatWishlist, 
  getVehicleSeatWishlist 
} from '../../utils/vehicleSeatShopStore';

export default function VehicleSeatCategoryListingView({ 
  showToast, 
  onAddToCart, 
  onDirectCheckout,
  onNavigateProduct, 
  onNavigateCustomDesign,
  onBack,
  theme = 'light' 
}) {
  const { categorySlug, slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const catIdx = pathParts.indexOf('category');
  const pathCatSlug = catIdx !== -1 && pathParts[catIdx + 1] ? pathParts[catIdx + 1] : null;
  const currentCategorySlug = categorySlug || slug || pathCatSlug || 'all';

  const category = getVehicleSeatCategoryById(currentCategorySlug);
  const rawProducts = getVehicleSeatProductsByCategory(currentCategorySlug);

  const [wishlist, setWishlist] = useState(() => getVehicleSeatWishlist());
  const [selectedSwatches, setSelectedSwatches] = useState({});
  const [materialFilter, setMaterialFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'

  const handleWishlistToggle = (productId, productName) => {
    const updated = toggleVehicleSeatWishlist(productId);
    setWishlist(updated);
    const added = updated.includes(productId);
    if (showToast) {
      showToast(added ? `Saved "${productName}" to wishlist ♡` : `Removed "${productName}" from wishlist`);
    }
  };

  const handleAddToCartClick = (e, product) => {
    e.stopPropagation();
    const activeColor = selectedSwatches[product.id] || product.swatches?.[0]?.name || 'Standard';
    const item = {
      id: `${product.id}-${activeColor.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      productId: product.id,
      name: `${product.name} (${activeColor})`,
      title: `${product.name} (${activeColor})`,
      price: product.price,
      effectivePrice: product.price,
      originalPrice: product.originalPrice,
      image: product.img,
      category: 'Vehicle Seat Covers',
      vehicleType: product.vehicleType,
      selectedColor: activeColor,
      quantity: 1,
      itemType: 'product'
    };
    addVehicleSeatToCart(item);
    if (onAddToCart) onAddToCart(item);
    if (showToast) {
      showToast(`Added "${product.name}" (${activeColor}) to cart! 🛒`);
    }
  };

  const displayedProducts = useMemo(() => {
    let list = [...rawProducts];

    if (materialFilter !== 'all') {
      list = list.filter(p => {
        const text = `${p.material || ''} ${p.name || ''} ${p.description || ''}`.toLowerCase();
        return text.includes(materialFilter.toLowerCase());
      });
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    return list;
  }, [rawProducts, materialFilter, sortBy]);

  const handleCategoryChange = (newCatId) => {
    if (newCatId === 'all') {
      navigate('/vehicle-seat-covers/products');
    } else {
      navigate(`/vehicle-seat-covers/category/${newCatId}`);
    }
  };

  return (
    <div className={`v-shop-page v-category-listing ${theme === 'dark' ? 'dark' : ''}`} style={{ paddingTop: '24px', minHeight: '100vh', width: '100%' }}>
      <div className="v-section-container" style={{ width: '100%', maxWidth: '100%', padding: '0 48px', margin: '0 auto 60px auto' }}>
        
        {/* Breadcrumb Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#64748B', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            onClick={() => onBack ? onBack() : navigate('/vehicle-seats')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#FF087A', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              cursor: 'pointer', 
              fontWeight: 700, 
              padding: 0 
            }}
          >
            <ArrowLeft size={16} />
            <span>Vehicle Seats Home</span>
          </button>
          <span>/</span>
          <span>Categories</span>
          <span>/</span>
          <strong style={{ color: 'var(--v-text-primary, #10213F)' }}>{category.name}</strong>
        </div>

        {/* Category Header Banner */}
        <div style={{ 
          background: 'linear-gradient(135deg, #FFF8F5 0%, #FFF0F5 100%)', 
          borderRadius: '20px', 
          padding: '36px 36px', 
          marginBottom: '36px', 
          border: '1px solid #FFE4EC', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div>
            <span className="v-section-eyebrow">CURATED COLLECTION</span>
            <h1 style={{ 
              fontFamily: 'Playfair Display, Georgia, serif', 
              fontSize: '2.4rem', 
              fontWeight: 800, 
              color: 'var(--v-text-primary, #10213F)', 
              margin: '4px 0 10px 0' 
            }}>
              {category.name}
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.96rem', margin: 0, maxWidth: '680px', lineHeight: 1.6 }}>
              {category.desc}
            </p>
          </div>

          <button 
            type="button" 
            className="v-btn v-btn-primary"
            onClick={() => {
              if (onNavigateCustomDesign) onNavigateCustomDesign();
              else navigate('/vehicle-seat-covers/custom-design');
            }}
            style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}
          >
            <span>Design Custom Seat Cover</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Filters and Sorting Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '16px', 
          marginBottom: '32px', 
          paddingBottom: '20px', 
          borderBottom: '1px solid #E2E8F0' 
        }}>
          
          {/* Category Chips */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', maxWidth: '100%' }}>
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                fontWeight: currentCategorySlug === 'all' ? 700 : 500,
                border: currentCategorySlug === 'all' ? '2px solid #FF087A' : '1px solid #CBD5E1',
                background: currentCategorySlug === 'all' ? '#FFE8F1' : '#FFFFFF',
                color: currentCategorySlug === 'all' ? '#FF087A' : '#1E293B',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              All Categories
            </button>
            {VEHICLE_CATEGORIES.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleCategoryChange(c.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: currentCategorySlug === c.id ? 700 : 500,
                  border: currentCategorySlug === c.id ? '2px solid #FF087A' : '1px solid #CBD5E1',
                  background: currentCategorySlug === c.id ? '#FFE8F1' : '#FFFFFF',
                  color: currentCategorySlug === c.id ? '#FF087A' : '#1E293B',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Right Controls: Material Filter & Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.84rem', color: '#64748B', fontWeight: 600 }}>Material:</span>
              <select
                value={materialFilter}
                onChange={e => setMaterialFilter(e.target.value)}
                style={{ 
                  padding: '8px 14px', 
                  borderRadius: '8px', 
                  border: '1px solid #CBD5E1', 
                  fontSize: '0.84rem', 
                  color: '#1E293B', 
                  background: '#FFFFFF', 
                  cursor: 'pointer' 
                }}
              >
                <option value="all">All Materials</option>
                <option value="leatherette">Leatherette</option>
                <option value="leather">Genuine Leather</option>
                <option value="suede">Sport Suede</option>
                <option value="fabric">Fabric & Jacquard</option>
                <option value="vinyl">Heavy-Duty Vinyl</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.84rem', color: '#64748B', fontWeight: 600 }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ 
                  padding: '8px 14px', 
                  borderRadius: '8px', 
                  border: '1px solid #CBD5E1', 
                  fontSize: '0.84rem', 
                  color: '#1E293B', 
                  background: '#FFFFFF', 
                  cursor: 'pointer' 
                }}
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F8FAFC', borderRadius: '16px' }}>
            <p style={{ fontSize: '1.1rem', color: '#64748B', marginBottom: '16px' }}>No seat covers match the selected filters.</p>
            <button 
              type="button" 
              className="v-btn v-btn-primary" 
              onClick={() => { setMaterialFilter('all'); handleCategoryChange('all'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {displayedProducts.map(product => {
              const inWishlist = wishlist.includes(product.id);
              const activeColor = selectedSwatches[product.id] || product.swatches?.[0]?.name || 'Standard';

              return (
                <div 
                  key={product.id}
                  className="v-product-card"
                  onClick={() => {
                    if (onNavigateProduct) onNavigateProduct(product.id);
                    else navigate(`/vehicle-seat-covers/product/${product.id}`);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="v-product-image-container" style={{ height: '220px' }}>
                    <img src={product.img} alt={product.name} className="v-product-img" />
                    <button 
                      type="button"
                      className={`v-wishlist-heart-btn ${inWishlist ? 'favorited' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(product.id, product.name);
                      }}
                      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={16} fill={inWishlist ? "#FF087A" : "none"} color={inWishlist ? "#FF087A" : "#64748B"} />
                    </button>
                  </div>

                  <div className="v-product-body" style={{ padding: '16px 14px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#FF087A', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>
                      {product.vehicleType?.toUpperCase() || 'VEHICLE'} SEAT COVER
                    </span>
                    <h3 className="v-product-title" style={{ fontSize: '1rem', marginBottom: '8px' }}>
                      {product.name}
                    </h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#059669', fontSize: '0.82rem', fontWeight: 700 }}>
                        <Star size={14} fill="#059669" />
                        <span>{product.rating || 4.9}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>({product.reviewsCount || 42} reviews)</span>
                    </div>

                    <div className="v-product-price-row">
                      <span className="v-product-price">{product.formattedPrice || `₹${product.price.toLocaleString('en-IN')}`}</span>
                      {product.originalPrice && (
                        <span className="v-product-orig-price">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div className="v-product-bottom-row" style={{ marginTop: '12px' }}>
                      <div className="v-color-swatches" onClick={e => e.stopPropagation()}>
                        {(product.swatches || []).map((swatch) => (
                          <button
                            key={swatch.id || swatch.name}
                            type="button"
                            className={`v-swatch-circle ${activeColor === swatch.name ? 'active' : ''}`}
                            style={{ backgroundColor: swatch.hex }}
                            title={swatch.name}
                            onClick={() => setSelectedSwatches({ ...selectedSwatches, [product.id]: swatch.name })}
                          />
                        ))}
                      </div>

                      <button 
                        type="button"
                        className="v-cart-icon-btn"
                        onClick={(e) => handleAddToCartClick(e, product)}
                        title={`Add ${product.name} to Cart`}
                      >
                        <ShoppingCart size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
