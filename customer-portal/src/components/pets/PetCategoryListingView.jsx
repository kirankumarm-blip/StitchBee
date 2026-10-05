import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, ShoppingCart, ArrowRight, ArrowLeft, ChevronRight, 
  Star, Sparkles, Filter, SlidersHorizontal, Check, RefreshCw 
} from 'lucide-react';
import './PetOutfitsPage.css';
import { 
  getPetProductsByCategory, 
  getPetCategory, 
  addPetOutfitToCart 
} from '../../utils/petOutfitsStore';
import { getWishlist, toggleWishlist } from '../../utils/bagsStore';

export default function PetCategoryListingView({ showToast }) {
  const { categorySlug, slug } = useParams();
  const location = useLocation();
  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const catIdx = pathParts.indexOf('category');
  const pathCatSlug = catIdx !== -1 && pathParts[catIdx + 1] ? pathParts[catIdx + 1] : null;
  const catParam = categorySlug || slug || pathCatSlug || 'all';
  const navigate = useNavigate();

  const categoryInfo = getPetCategory(catParam);
  const products = getPetProductsByCategory(catParam);

  const [wishlist, setWishlist] = useState(() => getWishlist());
  const [selectedSwatches, setSelectedSwatches] = useState({});
  const [petTypeFilter, setPetTypeFilter] = useState('all'); // 'all' | 'dog' | 'cat'
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
    addPetOutfitToCart(product, { color, size: 'M', quantity: 1 });
    if (showToast) {
      showToast(`Added "${product.name}" (${color}) to cart! 🛍️`);
    }
  };

  const displayedProducts = useMemo(() => {
    let list = [...products];

    if (petTypeFilter === 'dog') {
      list = list.filter(p => p.petType.toLowerCase().includes('dog'));
    } else if (petTypeFilter === 'cat') {
      list = list.filter(p => p.petType.toLowerCase().includes('cat'));
    }

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
  }, [products, petTypeFilter, filterPersonalizable, sortBy]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--pet-bg)', paddingBottom: '80px' }}>
      
      {/* Breadcrumb Header */}
      <div style={{ background: 'var(--pet-card)', borderBottom: '1px solid var(--pet-border)', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <span onClick={() => navigate('/')} style={{ color: 'var(--pet-text-muted)', cursor: 'pointer' }}>Home</span>
            <ChevronRight size={14} color="var(--pet-text-muted)" />
            <span onClick={() => navigate('/pet-outfits')} style={{ color: 'var(--pet-text-muted)', cursor: 'pointer' }}>Pet Outfits</span>
            <ChevronRight size={14} color="var(--pet-text-muted)" />
            <span style={{ color: 'var(--pet-pink)', fontWeight: 700 }}>{categoryInfo.name}</span>
          </nav>

          <button
            type="button"
            onClick={() => navigate('/pet-outfits')}
            style={{ background: 'none', border: 'none', color: 'var(--pet-text-muted)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={15} /> All Pet Outfits
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 24px 0' }}>
        
        {/* Banner with Title & Quick Custom CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF9F7 0%, #FFFFFF 100%)',
          border: '1px solid var(--pet-border)',
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
            <span className="pet-eyebrow">STITCHBEEZ PET COLLECTION</span>
            <h1 className="pet-heading" style={{ fontSize: '2.2rem', margin: '6px 0 8px' }}>
              {categoryInfo.name}
            </h1>
            <p style={{ color: 'var(--pet-text-body)', fontSize: '0.95rem', margin: 0, maxWidth: '580px' }}>
              {categoryInfo.heroText || categoryInfo.desc}
            </p>
          </div>

          <button
            type="button"
            className="pet-btn-primary"
            onClick={() => navigate('/pet-outfits/customize')}
          >
            Start Custom Design <ArrowRight size={17} />
          </button>
        </div>

        {/* Toolbar: Filters & Sorting */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          background: 'var(--pet-card)',
          borderRadius: '14px',
          border: '1px solid var(--pet-border)',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--pet-text-heading)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={15} /> Filter:
            </span>

            {/* Pet Type Filter */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'all', label: 'All Pets' },
                { id: 'dog', label: 'Dogs 🐕' },
                { id: 'cat', label: 'Cats 🐈' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setPetTypeFilter(f.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: petTypeFilter === f.id ? '1px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                    background: petTypeFilter === f.id ? 'var(--pet-pink-light)' : 'var(--pet-surface)',
                    color: petTypeFilter === f.id ? 'var(--pet-pink)' : 'var(--pet-text-heading)'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Personalizable checkbox */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--pet-text-heading)', cursor: 'pointer', marginLeft: '8px' }}>
              <input 
                type="checkbox"
                checked={filterPersonalizable}
                onChange={e => setFilterPersonalizable(e.target.checked)}
                style={{ accentColor: 'var(--pet-pink)' }}
              />
              Personalizable Only
            </label>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--pet-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <SlidersHorizontal size={14} /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--pet-border)',
                background: 'var(--pet-surface)',
                color: 'var(--pet-text-heading)',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="pet-products-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {displayedProducts.map(prod => {
              const activeColorIdx = selectedSwatches[prod.id] || 0;
              const isWish = Array.isArray(wishlist) ? wishlist.includes(prod.id) : !!wishlist[prod.id];

              return (
                <div key={prod.id} className="pet-product-card">
                  <div 
                    className="pet-prod-img-wrap"
                    onClick={() => navigate(`/pet-outfits/product/${prod.slug || prod.id}`)}
                  >
                    <img src={prod.img} alt={prod.name} className="pet-prod-img" loading="lazy" />
                    
                    <button 
                      type="button" 
                      className="pet-wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(prod.id, prod.name);
                      }}
                      title={isWish ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={16} fill={isWish ? '#FF1684' : 'none'} color={isWish ? '#FF1684' : '#14213D'} />
                    </button>
                  </div>

                  <div className="pet-prod-info">
                    <div 
                      className="pet-prod-name"
                      onClick={() => navigate(`/pet-outfits/product/${prod.slug || prod.id}`)}
                    >
                      {prod.name}
                    </div>

                    <div className="pet-swatches-row">
                      {prod.colors?.map((c, idx) => (
                        <div 
                          key={c.name}
                          className={`pet-swatch-dot ${activeColorIdx === idx ? 'active' : ''}`}
                          style={{ backgroundColor: c.hex }}
                          onClick={() => setSelectedSwatches(prev => ({ ...prev, [prod.id]: idx }))}
                          title={c.name}
                        />
                      ))}
                    </div>

                    <div className="pet-prod-price-row">
                      <span className="pet-prod-price">₹{prod.price}</span>
                      <button 
                        type="button"
                        className="pet-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(prod);
                        }}
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
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--pet-surface)', borderRadius: '16px', border: '1px dashed var(--pet-border)' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '10px' }}>🐾</span>
            <h3 style={{ margin: '0 0 6px', color: 'var(--pet-text-heading)' }}>No Outfits Matched This Filter</h3>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Try switching your pet type or creating a custom outfit.</p>
            <button
              type="button"
              className="pet-btn-primary"
              onClick={() => { setPetTypeFilter('all'); setFilterPersonalizable(false); }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
