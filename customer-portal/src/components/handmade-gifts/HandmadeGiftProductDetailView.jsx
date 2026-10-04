import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Star, ShieldCheck, Truck, RefreshCw, 
  ChevronRight, ArrowLeft, Check, Sparkles, Gem, Layers, Scissors, Info, Type
} from 'lucide-react';
import '../BagsLeatherStudio.css';
import './HandmadeGiftsPage.css';
import { 
  getHandmadeGiftBySlug, 
  addHandmadeGiftToCart, 
  ALL_HANDMADE_GIFTS,
  THREAD_COLORS 
} from '../../utils/handmadeGiftsStore';
import { getWishlist, toggleWishlist } from '../../utils/bagsStore';

export default function HandmadeGiftProductDetailView({ showToast, currentUser, onOpenAuthModal }) {
  const { slug, productSlug } = useParams();
  const targetSlug = productSlug || slug;
  const navigate = useNavigate();

  const product = getHandmadeGiftBySlug(targetSlug) || ALL_HANDMADE_GIFTS[0];

  const [activeImg, setActiveImg] = useState(product?.images?.[0] || product?.img);
  const [selectedColor, setSelectedColor] = useState(product?.selectedColor || product?.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'materials' | 'shipping'
  const [wishlist, setWishlist] = useState(() => getWishlist());

  // Personalization state
  const [wantsPersonalization, setWantsPersonalization] = useState(product?.personalizable || false);
  const [personalizationName, setPersonalizationName] = useState('');
  const [personalizationMessage, setPersonalizationMessage] = useState('');
  const [selectedThreadColor, setSelectedThreadColor] = useState('Golden Zari');

  useEffect(() => {
    if (product) {
      setActiveImg(product.images?.[0] || product.img);
      setSelectedColor(product.selectedColor || product.colors?.[0]?.name || 'Standard');
      setQuantity(1);
      setPersonalizationName('');
      setPersonalizationMessage('');
      setWantsPersonalization(product.personalizable || false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [targetSlug, product]);

  const isWish = wishlist.includes(product.id);

  const handleWishlistToggle = () => {
    const { updated, added } = toggleWishlist(product.id);
    setWishlist(updated);
    if (showToast) {
      showToast(added ? `Saved "${product.name}" to your wishlist ❤️` : 'Removed from wishlist');
    }
  };

  const buildPersonalizationPayload = () => {
    if (!wantsPersonalization || (!personalizationName.trim() && !personalizationMessage.trim())) {
      return null;
    }
    return {
      name: personalizationName.trim(),
      message: personalizationMessage.trim(),
      threadColor: selectedThreadColor,
      text: [personalizationName.trim(), personalizationMessage.trim()].filter(Boolean).join(' • ')
    };
  };

  const handleAddToCart = () => {
    const personalization = buildPersonalizationPayload();
    addHandmadeGiftToCart(product, selectedColor, personalization, quantity);
    if (showToast) {
      showToast(`Added ${quantity}x "${product.name}" (${selectedColor}) to cart! 🎁`);
    }
  };

  const handleBuyNow = () => {
    const personalization = buildPersonalizationPayload();
    addHandmadeGiftToCart(product, selectedColor, personalization, quantity);
    navigate('/cart');
  };

  const handleCustomize = () => {
    navigate(`/handmade-gifts/customize?base=${product.slug}&category=${product.catId || 'teddy-bears'}&color=${encodeURIComponent(selectedColor)}`);
  };

  return (
    <div className="bl-pdp-page" style={{ width: '100%', minHeight: '100vh', background: 'var(--bl-bg, #FAF5F2)' }}>
      <div className="bl-container" style={{ padding: '24px 20px 80px', maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
          <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/handmade-gifts')} className="bl-crumb-link">Handmade Gifts</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate(`/handmade-gifts/category/${product.catId || 'all'}`)} className="bl-crumb-link">
            {product.categorySlug ? product.categorySlug.replace('-', ' ') : 'Collection'}
          </span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">{product.name}</span>
        </nav>

        {/* Back Link */}
        <div style={{ marginBottom: '24px' }}>
          <button 
            type="button"
            className="bl-back-btn"
            onClick={() => navigate('/handmade-gifts')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <ArrowLeft size={16} /> Back to Handmade Gifts
          </button>
        </div>

        {/* Product Details 2-Column Grid */}
        <div className="bl-pdp-grid">
          
          {/* Left Column: Media Gallery */}
          <div className="bl-pdp-media-col">
            <div className="bl-pdp-main-img-box" style={{ background: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={activeImg} 
                alt={product.name} 
                className="bl-pdp-main-img" 
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
              
              <button 
                type="button"
                className={`bl-pdp-wish-float-btn ${isWish ? 'active' : ''}`}
                onClick={handleWishlistToggle}
                title="Save to Wishlist"
              >
                <Heart size={20} fill={isWish ? '#FF1678' : 'none'} color={isWish ? '#FF1678' : '#1e293b'} strokeWidth={2} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="bl-pdp-thumbs-row" style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                {product.images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`bl-pdp-thumb-btn ${activeImg === imgSrc ? 'active' : ''}`}
                    onClick={() => setActiveImg(imgSrc)}
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: activeImg === imgSrc ? '2px solid #FF1678' : '1px solid #E2E8F0',
                      padding: 0,
                      cursor: 'pointer',
                      width: '74px',
                      height: '74px'
                    }}
                  >
                    <img src={imgSrc} alt={`${product.name} preview ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Artisan Trust Row */}
            <div className="bl-pdp-trust-strip" style={{ marginTop: '24px' }}>
              <div className="bl-trust-strip-item">
                <Scissors size={20} color="#FF1678" />
                <div>
                  <strong>Master Artisan Handcrafted</strong>
                  <span>Hand-stitched with love & care</span>
                </div>
              </div>
              <div className="bl-trust-strip-item">
                <Gem size={20} color="#FF1678" />
                <div>
                  <strong>Pure Eco-Friendly Fabrics</strong>
                  <span>GOTS Organic & Natural Linen</span>
                </div>
              </div>
              <div className="bl-trust-strip-item">
                <Truck size={20} color="#FF1678" />
                <div>
                  <strong>Free Doorstep Delivery</strong>
                  <span>Insured dispatch in 24–48 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Spec & Action */}
          <div className="bl-pdp-info-col">
            <span className="bl-tag-label" style={{ color: '#FF1678', fontWeight: 700, letterSpacing: '1px' }}>
              {(product.catId || 'HANDMADE GIFTS').replace('-', ' ').toUpperCase()}
            </span>
            
            <h1 className="bl-serif-title bl-pdp-title" style={{ fontSize: '2.4rem', margin: '6px 0 12px' }}>
              {product.name}
            </h1>

            {/* Rating & Review Counter */}
            <div className="bl-pdp-rating-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div className="bl-pdp-stars" style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span className="bl-pdp-rating-num" style={{ fontWeight: 700 }}>{product.rating}</span>
              <span className="bl-pdp-rating-sep" style={{ color: '#94A3B8' }}>•</span>
              <span style={{ fontSize: '0.88rem', color: '#64748B' }}>
                {product.reviewCount} verified reviews
              </span>
            </div>

            {/* Price Box */}
            <div className="bl-pdp-price-box" style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <div className="bl-pdp-price-main" style={{ fontSize: '2rem', fontWeight: 800, color: '#FF1678' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
                {product.originalPrice && (
                  <div className="bl-pdp-price-orig" style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: '#94A3B8' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </div>
                )}
                {product.originalPrice && (
                  <span className="bl-pdp-save-badge" style={{ background: '#ECFDF5', color: '#059669', padding: '4px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
              <div className="bl-pdp-tax-note" style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                Inclusive of all taxes & complimentary insured delivery
              </div>
            </div>

            {/* Stock Availability */}
            <div className="bl-pdp-stock-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <span className="bl-stock-indicator" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ color: '#059669', fontWeight: 600 }}>
                In Stock ({product.stock} pieces crafted) — Dispatched within 24–48 hours
              </span>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="bl-pdp-section-block" style={{ marginBottom: '22px' }}>
                <div className="bl-pdp-section-label" style={{ marginBottom: '8px' }}>
                  <span>Color:</span>
                  <strong style={{ marginLeft: '6px' }}>{selectedColor}</strong>
                </div>
                <div className="bl-pdp-color-swatches" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      type="button"
                      className={`bl-pdp-color-pill ${selectedColor === col.name ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedColor(col.name);
                        if (col.img) setActiveImg(col.img);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 14px',
                        borderRadius: '24px',
                        border: selectedColor === col.name ? '2px solid #FF1678' : '1px solid #CBD5E1',
                        background: selectedColor === col.name ? 'rgba(255, 22, 120, 0.08)' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <span 
                        className="bl-swatch-circle" 
                        style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: col.hex, border: '1px solid rgba(0,0,0,0.1)' }} 
                      />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Personalization Section (Requirement 11) */}
            {product.personalizable && (
              <div className="bl-pdp-personalization-card" style={{
                background: '#FFF5F8',
                border: '1.5px dashed #FF1678',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '22px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Type size={18} color="#FF1678" />
                    <strong style={{ fontSize: '0.95rem', color: '#1E293B' }}>Personalize This Stitched Gift</strong>
                  </div>
                  <span style={{ fontSize: '0.75rem', background: '#FF1678', color: '#FFFFFF', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                    COMPLIMENTARY
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Recipient Name / Initial (Max 15 chars)
                    </label>
                    <input 
                      type="text"
                      maxLength={15}
                      placeholder="e.g. Priya or P"
                      value={personalizationName}
                      onChange={e => setPersonalizationName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Thread Color
                    </label>
                    <select
                      value={selectedThreadColor}
                      onChange={e => setSelectedThreadColor(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.85rem',
                        background: '#FFFFFF'
                      }}
                    >
                      {THREAD_COLORS.map(t => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Special Embroidered Note / Date (Optional, max 30 chars)
                  </label>
                  <input 
                    type="text"
                    maxLength={30}
                    placeholder="e.g. Best Friends Forever, Est. 2026"
                    value={personalizationMessage}
                    onChange={e => setPersonalizationMessage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                {/* Live Preview Badge */}
                {(personalizationName || personalizationMessage) && (
                  <div style={{
                    marginTop: '12px',
                    padding: '10px 14px',
                    background: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #FBCFE8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Artisan Stitch Preview:</span>
                    <span style={{
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: selectedThreadColor === 'Golden Zari' ? '#B8860B' : '#FF1678'
                    }}>
                      "{personalizationName || ''} {personalizationMessage ? `— ${personalizationMessage}` : ''}"
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Specifications Snapshot */}
            <div className="bl-pdp-specs-card" style={{ background: '#FFFFFF', borderRadius: '10px', padding: '14px 18px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
              <div className="bl-spec-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span className="bl-spec-name" style={{ color: '#64748B', fontSize: '0.85rem' }}>Fabric / Material:</span>
                <span className="bl-spec-val" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{product.fabric || product.material}</span>
              </div>
              <div className="bl-spec-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span className="bl-spec-name" style={{ color: '#64748B', fontSize: '0.85rem' }}>Dimensions:</span>
                <span className="bl-spec-val" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{product.dimensions}</span>
              </div>
              {product.weight && (
                <div className="bl-spec-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span className="bl-spec-name" style={{ color: '#64748B', fontSize: '0.85rem' }}>Item Weight:</span>
                  <span className="bl-spec-val" style={{ fontWeight: 600, fontSize: '0.85rem' }}>{product.weight}</span>
                </div>
              )}
            </div>

            {/* Key Features */}
            {product.features && (
              <div className="bl-pdp-features-list" style={{ marginBottom: '24px' }}>
                {product.features.map((feat, idx) => (
                  <div key={idx} className="bl-pdp-feat-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <Check size={16} color="#FF1678" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector & CTA Buttons */}
            <div className="bl-pdp-action-area" style={{ marginBottom: '28px' }}>
              <div className="bl-pdp-qty-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span className="bl-qty-label" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Quantity:</span>
                <div className="bl-qty-picker" style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden' }}>
                  <button 
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    style={{ padding: '6px 14px', background: '#F8FAFC', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    -
                  </button>
                  <span style={{ padding: '6px 16px', fontWeight: 700, minWidth: '32px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button 
                    type="button"
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    style={{ padding: '6px 14px', background: '#F8FAFC', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bl-pdp-btns-stack">
                <div className="bl-pdp-main-btns-row" style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="button"
                    className="hm-btn-primary"
                    onClick={handleAddToCart}
                    style={{ flex: 1, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>

                  <button 
                    type="button"
                    className="hm-btn-secondary"
                    onClick={handleBuyNow}
                    style={{ flex: 1, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    Buy Now →
                  </button>
                </div>

                {product.customizable && (
                  <button 
                    type="button"
                    onClick={handleCustomize}
                    style={{
                      width: '100%',
                      marginTop: '12px',
                      padding: '12px',
                      borderRadius: '10px',
                      background: '#FFF5F8',
                      border: '1.5px dashed #FF1678',
                      color: '#FF1678',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Sparkles size={16} color="#FF1678" />
                    <span>Create Bespoke Version of this Gift →</span>
                  </button>
                )}
              </div>
            </div>

            {/* Accordion / Tab Information */}
            <div className="bl-pdp-tabs-wrap" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <div className="bl-pdp-tab-headers" style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px', marginBottom: '14px' }}>
                <button 
                  type="button"
                  className={`bl-pdp-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '6px 0',
                    fontWeight: activeTab === 'overview' ? 700 : 500,
                    color: activeTab === 'overview' ? '#FF1678' : '#64748B',
                    borderBottom: activeTab === 'overview' ? '2px solid #FF1678' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  Description
                </button>
                <button 
                  type="button"
                  className={`bl-pdp-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
                  onClick={() => setActiveTab('materials')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '6px 0',
                    fontWeight: activeTab === 'materials' ? 700 : 500,
                    color: activeTab === 'materials' ? '#FF1678' : '#64748B',
                    borderBottom: activeTab === 'materials' ? '2px solid #FF1678' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  Artisan Stitch & Care
                </button>
                <button 
                  type="button"
                  className={`bl-pdp-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shipping')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '6px 0',
                    fontWeight: activeTab === 'shipping' ? 700 : 500,
                    color: activeTab === 'shipping' ? '#FF1678' : '#64748B',
                    borderBottom: activeTab === 'shipping' ? '2px solid #FF1678' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  Shipping & Returns
                </button>
              </div>

              <div className="bl-pdp-tab-body" style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                {activeTab === 'overview' && (
                  <p>{product.description}</p>
                )}
                {activeTab === 'materials' && (
                  <div>
                    <p><strong>Fabric Composition:</strong> {product.fabric || product.material}</p>
                    <p style={{ marginTop: '6px' }}><strong>Stitch Type:</strong> Hand-guided embroidery & high-tensile safety lock-stitch.</p>
                    <p style={{ marginTop: '6px' }}><strong>Care Instructions:</strong> {product.careInfo || 'Spot clean with mild damp cloth. Air dry flat.'}</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div>
                    <p><strong>Dispatch:</strong> Handcrafted and packaged from our Bengaluru artisan workshop within 24–48 hours.</p>
                    <p style={{ marginTop: '6px' }}><strong>Delivery:</strong> Express delivery across India in 3–5 business days.</p>
                    <p style={{ marginTop: '6px' }}><strong>Returns:</strong> 7-day hassle-free doorstep returns and complimentary alteration guarantee.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
