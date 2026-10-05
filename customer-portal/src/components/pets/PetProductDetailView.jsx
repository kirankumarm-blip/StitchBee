import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Star, ShieldCheck, Truck, RefreshCw, 
  ChevronRight, ArrowLeft, Check, Sparkles, Gem, Layers, Scissors, Info, Ruler, X
} from 'lucide-react';
import './PetOutfitsPage.css';
import { 
  getPetProductBySlug, 
  addPetOutfitToCart, 
  ALL_PET_PRODUCTS, 
  PET_FABRICS 
} from '../../utils/petOutfitsStore';
import { getWishlist, toggleWishlist } from '../../utils/bagsStore';

export default function PetProductDetailView({ showToast, currentUser, onOpenAuthModal }) {
  const { id, slug, productSlug } = useParams();
  const location = useLocation();
  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const prodIdx = pathParts.indexOf('product');
  const pathProductSlug = prodIdx !== -1 && pathParts[prodIdx + 1] ? pathParts[prodIdx + 1] : pathParts[pathParts.length - 1];
  const targetSlug = productSlug || slug || id || pathProductSlug;
  const navigate = useNavigate();

  const product = getPetProductBySlug(targetSlug) || ALL_PET_PRODUCTS[0];

  const [activeImg, setActiveImg] = useState(product?.images?.[0] || product?.img);
  const [selectedColor, setSelectedColor] = useState(product?.selectedColor || product?.colors?.[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState('M');
  const [petType, setPetType] = useState('Dog');
  const [quantity, setQuantity] = useState(1);
  const [selectedFabric, setSelectedFabric] = useState(product?.fabric || 'Soft Cotton');
  
  // Custom Size & Measurements State
  const [unit, setUnit] = useState('cm'); // 'cm' | 'inch'
  const [measurements, setMeasurements] = useState({
    neck: '',
    chest: '',
    backLength: '',
    waist: '',
    weight: ''
  });
  const [isMeasureGuideOpen, setIsMeasureGuideOpen] = useState(false);

  // Personalization
  const [wantsPersonalization, setWantsPersonalization] = useState(product?.personalizable || false);
  const [petName, setPetName] = useState('');
  const [threadColor, setThreadColor] = useState('Gold Zari');

  const [wishlist, setWishlist] = useState(() => getWishlist());

  useEffect(() => {
    if (product) {
      setActiveImg(product.images?.[0] || product.img);
      setSelectedColor(product.selectedColor || product.colors?.[0]?.name || 'Standard');
      setQuantity(1);
      setPetName('');
      setWantsPersonalization(product.personalizable || false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  const isWishlisted = Array.isArray(wishlist) ? wishlist.includes(product.id) : !!wishlist[product.id];

  const handleWishlistToggle = () => {
    const { updated, added } = toggleWishlist(product.id);
    setWishlist(updated);
    if (showToast) {
      showToast(added ? `Saved "${product.name}" to wishlist ❤️` : 'Removed from wishlist');
    }
  };

  const handleAddToCart = () => {
    addPetOutfitToCart(product, {
      color: selectedColor,
      size: selectedSize,
      petType,
      petName: wantsPersonalization ? petName : '',
      measurements: selectedSize === 'Custom Size' ? measurements : null,
      fabric: selectedFabric,
      quantity
    });
    if (showToast) {
      showToast(`Added ${quantity}x "${product.name}" to cart! 🛍️`);
    }
  };

  const handleBuyNow = () => {
    addPetOutfitToCart(product, {
      color: selectedColor,
      size: selectedSize,
      petType,
      petName: wantsPersonalization ? petName : '',
      measurements: selectedSize === 'Custom Size' ? measurements : null,
      fabric: selectedFabric,
      quantity
    });
    navigate('/checkout');
  };

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
            <span style={{ color: 'var(--pet-pink)', fontWeight: 700 }}>{product.name}</span>
          </nav>

          <button
            type="button"
            onClick={() => navigate('/pet-outfits')}
            style={{ background: 'none', border: 'none', color: 'var(--pet-text-muted)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={15} /> Back to Pet Outfits
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '36px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '48px', alignItems: 'start' }}>
          
          {/* LEFT: Image Gallery */}
          <div>
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#F9F9FA',
              border: '1px solid var(--pet-border)',
              aspectRatio: '1 / 1',
              boxShadow: 'var(--pet-shadow-md)',
              marginBottom: '16px'
            }}>
              <img 
                src={activeImg} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              <button 
                type="button"
                onClick={handleWishlistToggle}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: 'none',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Heart size={20} fill={isWishlisted ? '#FF1684' : 'none'} color={isWishlisted ? '#FF1684' : '#14213D'} />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {(product.images || [product.img]).map((im, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveImg(im)}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: activeImg === im ? '2px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                    cursor: 'pointer',
                    boxShadow: activeImg === im ? '0 0 0 2px rgba(255, 22, 132, 0.2)' : 'none'
                  }}
                >
                  <img src={im} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {/* Quality Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px' }}>
              <div style={{ background: 'var(--pet-surface)', border: '1px solid var(--pet-border)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <ShieldCheck size={22} color="var(--pet-pink)" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pet-text-heading)' }}>Fur-Safe Seams</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--pet-text-muted)' }}>Zero friction irritation</div>
              </div>
              <div style={{ background: 'var(--pet-surface)', border: '1px solid var(--pet-border)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <Truck size={22} color="var(--pet-pink)" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pet-text-heading)' }}>Express Delivery</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--pet-text-muted)' }}>Handcrafted in 2-3 days</div>
              </div>
              <div style={{ background: 'var(--pet-surface)', border: '1px solid var(--pet-border)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <RefreshCw size={22} color="var(--pet-pink)" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pet-text-heading)' }}>Perfect Fit Guarantee</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--pet-text-muted)' }}>Free local alteration</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Form */}
          <div>
            <span className="pet-eyebrow">READY PET COLLECTION</span>
            <h1 className="pet-heading" style={{ fontSize: '2.4rem', margin: '4px 0 12px' }}>
              {product.name}
            </h1>

            {/* Stars & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', color: '#F59E0B' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--pet-text-heading)' }}>{product.rating}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--pet-text-muted)' }}>({product.reviewCount} pet parent reviews)</span>
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--pet-text-heading)' }}>
                ₹{product.price}
              </span>
              <span style={{ fontSize: '1.15rem', color: 'var(--pet-text-muted)', textDecoration: 'line-through' }}>
                ₹{product.originalPrice}
              </span>
              <span style={{ background: 'rgba(255, 22, 132, 0.1)', color: 'var(--pet-pink)', fontSize: '0.8rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px' }}>
                Save 25% Today
              </span>
            </div>

            <p style={{ fontSize: '0.96rem', lineHeight: 1.6, color: 'var(--pet-text-body)', marginBottom: '22px' }}>
              {product.description}
            </p>

            {/* Pet Type Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '8px' }}>
                1. Select Pet Type
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['Dog 🐕', 'Cat 🐈', 'Other 🐾'].map(pt => (
                  <button
                    key={pt}
                    type="button"
                    onClick={() => setPetType(pt.split(' ')[0])}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: petType === pt.split(' ')[0] ? '2px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                      background: petType === pt.split(' ')[0] ? 'var(--pet-pink-light)' : 'var(--pet-card)',
                      color: petType === pt.split(' ')[0] ? 'var(--pet-pink)' : 'var(--pet-text-heading)'
                    }}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--pet-text-heading)' }}>
                  2. Select Size
                </label>
                <button
                  type="button"
                  onClick={() => setIsMeasureGuideOpen(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--pet-pink)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Ruler size={14} /> How to Measure?
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom Size']).map(sz => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: selectedSize === sz ? '2px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                      background: selectedSize === sz ? 'var(--pet-pink-light)' : 'var(--pet-card)',
                      color: selectedSize === sz ? 'var(--pet-pink)' : 'var(--pet-text-heading)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Measurements Form (Shown if Custom Size selected) */}
            {selectedSize === 'Custom Size' && (
              <div style={{
                background: 'var(--pet-surface)',
                border: '1.5px solid var(--pet-pink)',
                borderRadius: '14px',
                padding: '18px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--pet-text-heading)' }}>
                    Custom Pet Measurements
                  </strong>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['cm', 'inch'].map(u => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUnit(u)}
                        style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: unit === u ? '1px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                          background: unit === u ? 'var(--pet-pink)' : '#FFF',
                          color: unit === u ? '#FFF' : '#333'
                        }}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--pet-text-muted)' }}>Neck ({unit})</span>
                    <input 
                      type="number" 
                      placeholder="e.g. 28" 
                      value={measurements.neck} 
                      onChange={e => setMeasurements({ ...measurements, neck: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--pet-border)', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--pet-text-muted)' }}>Chest ({unit})</span>
                    <input 
                      type="number" 
                      placeholder="e.g. 45" 
                      value={measurements.chest} 
                      onChange={e => setMeasurements({ ...measurements, chest: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--pet-border)', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--pet-text-muted)' }}>Back Length ({unit})</span>
                    <input 
                      type="number" 
                      placeholder="e.g. 35" 
                      value={measurements.backLength} 
                      onChange={e => setMeasurements({ ...measurements, backLength: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--pet-border)', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--pet-text-muted)' }}>Waist ({unit})</span>
                    <input 
                      type="number" 
                      placeholder="e.g. 38" 
                      value={measurements.waist} 
                      onChange={e => setMeasurements({ ...measurements, waist: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--pet-border)', fontSize: '0.82rem' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--pet-text-muted)' }}>Pet Weight (kg)</span>
                    <input 
                      type="number" 
                      placeholder="e.g. 12" 
                      value={measurements.weight} 
                      onChange={e => setMeasurements({ ...measurements, weight: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--pet-border)', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Color Swatches */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '8px' }}>
                3. Color: <span style={{ color: 'var(--pet-pink)' }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.colors?.map(col => (
                  <div
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: col.hex,
                      border: '2px solid #FFFFFF',
                      boxShadow: selectedColor === col.name ? '0 0 0 2.5px var(--pet-pink)' : '0 0 0 1px #D1D5DB',
                      cursor: 'pointer',
                      transform: selectedColor === col.name ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Personalization Section */}
            <div style={{
              background: 'var(--pet-surface)',
              border: '1px solid var(--pet-border)',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', color: 'var(--pet-text-heading)' }}>
                <input 
                  type="checkbox"
                  checked={wantsPersonalization}
                  onChange={e => setWantsPersonalization(e.target.checked)}
                  style={{ accentColor: 'var(--pet-pink)', width: '16px', height: '16px' }}
                />
                Add Custom Pet Name Embroidery (+₹150)
              </label>

              {wantsPersonalization && (
                <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Enter your Pet's Name (e.g. Buddy)"
                    value={petName}
                    onChange={e => setPetName(e.target.value)}
                    maxLength={15}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--pet-border)',
                      fontSize: '0.9rem'
                    }}
                  />
                  <select
                    value={threadColor}
                    onChange={e => setThreadColor(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--pet-border)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="Gold Zari">Gold Zari Thread</option>
                    <option value="Silken Silver">Silken Silver</option>
                    <option value="Blush Pink">Blush Pink</option>
                    <option value="Royal Navy">Royal Navy</option>
                  </select>
                </div>
              )}
            </div>

            {/* Quantity & CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--pet-border)', borderRadius: '28px', background: 'var(--pet-card)' }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700 }}
                >
                  -
                </button>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, minWidth: '24px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700 }}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="pet-btn-primary"
                onClick={handleAddToCart}
                style={{ flex: 1, padding: '14px 28px' }}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              <button
                type="button"
                className="pet-btn-secondary"
                onClick={handleBuyNow}
                style={{ flex: 1, padding: '14px 28px', background: '#14213D', color: '#FFF', borderColor: '#14213D' }}
              >
                Buy Now ⚡
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* HOW TO MEASURE GUIDE MODAL */}
      {isMeasureGuideOpen && (
        <div className="pet-modal-overlay" onClick={() => setIsMeasureGuideOpen(false)}>
          <div className="pet-modal-card" onClick={e => e.stopPropagation()}>
            <button 
              type="button"
              className="pet-modal-close-btn"
              onClick={() => setIsMeasureGuideOpen(false)}
            >
              <X size={18} />
            </button>

            <span className="pet-eyebrow">FIT ASSURANCE GUIDE</span>
            <h2 className="pet-heading" style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
              How to Measure Your Pet
            </h2>

            <p style={{ fontSize: '0.88rem', color: 'var(--pet-text-body)', lineHeight: 1.5, marginBottom: '18px' }}>
              Keep your pet standing comfortably on all four paws. Use a soft tape measure and keep it snug but not tight (allow a two-finger gap).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'var(--pet-surface)', padding: '12px 14px', borderRadius: '10px' }}>
                <strong style={{ color: 'var(--pet-pink)', display: 'block', fontSize: '0.88rem' }}>1. Neck Circumference</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--pet-text-body)' }}>Measure around the base of the neck where the collar naturally sits.</span>
              </div>
              <div style={{ background: 'var(--pet-surface)', padding: '12px 14px', borderRadius: '10px' }}>
                <strong style={{ color: 'var(--pet-pink)', display: 'block', fontSize: '0.88rem' }}>2. Chest Circumference (Girth)</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--pet-text-body)' }}>Measure the widest part of your pet's ribcage, directly behind the front legs.</span>
              </div>
              <div style={{ background: 'var(--pet-surface)', padding: '12px 14px', borderRadius: '10px' }}>
                <strong style={{ color: 'var(--pet-pink)', display: 'block', fontSize: '0.88rem' }}>3. Back Length</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--pet-text-body)' }}>Measure along the spine from the base of the neck to the base of the tail.</span>
              </div>
            </div>

            <button
              type="button"
              className="pet-btn-primary"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={() => setIsMeasureGuideOpen(false)}
            >
              Got It, Continue Styling
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
