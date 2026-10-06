import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Star, ShieldCheck, Truck, RefreshCw, 
  ChevronRight, ArrowLeft, Check, Sparkles, Layers, Scissors, 
  Info, Ruler, X, HelpCircle, Eye, Sliders, CheckCircle2
} from 'lucide-react';
import './SofasShopPage.css';
import { 
  ALL_SOFA_PRODUCTS, 
  SOFA_FABRICS,
  SOFA_REVIEWS,
  getSofaProductById, 
  addSofaToCart, 
  toggleSofaWishlist, 
  getSofaWishlist 
} from '../../utils/sofasStore';

export default function SofaProductDetailView({ 
  showToast, 
  currentUser, 
  onOpenAuthModal,
  onAddToCart,
  onDirectCheckout,
  onBack
}) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract ID from pathname if not in params
  const pathParts = (location.pathname || '').split('/').filter(Boolean);
  const prodIdx = pathParts.indexOf('product');
  const targetId = id || (prodIdx !== -1 && pathParts[prodIdx + 1] ? pathParts[prodIdx + 1] : pathParts[pathParts.length - 1]);

  const product = getSofaProductById(targetId) || ALL_SOFA_PRODUCTS[0];

  const [activeImg, setActiveImg] = useState(product?.image);
  const [selectedColor, setSelectedColor] = useState(product?.defaultColor || product?.colors?.[0]?.name);
  const [selectedSizeObj, setSelectedSizeObj] = useState(product?.availableSizes?.[1] || product?.availableSizes?.[0]);
  const [selectedFabric, setSelectedFabric] = useState(SOFA_FABRICS[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(() => getSofaWishlist());
  
  // Custom Dimension State
  const [customDimensionModalOpen, setCustomDimensionModalOpen] = useState(false);
  const [isCustomSizeApplied, setIsCustomSizeApplied] = useState(false);
  const [customDimensions, setCustomDimensions] = useState({
    length: '84',
    depth: '36',
    height: '33',
    unit: 'inches',
    chaiseOrientation: 'Right Chaise',
    specialNotes: ''
  });

  // Swatch inspection add-on
  const [includeSwatchVisit, setIncludeSwatchVisit] = useState(true);

  // Pincode state
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  useEffect(() => {
    if (product) {
      setActiveImg(product.image);
      setSelectedColor(product.defaultColor || product.colors?.[0]?.name);
      setSelectedSizeObj(product.availableSizes?.[1] || product.availableSizes?.[0]);
      setQuantity(1);
      setIsCustomSizeApplied(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  const isWishlisted = wishlist.includes(product.id);

  const handleWishlistToggle = () => {
    const updated = toggleSofaWishlist(product.id);
    setWishlist(updated);
    const added = updated.includes(product.id);
    if (showToast) {
      showToast(added ? `Saved "${product.name}" to wishlist ♡` : 'Removed from wishlist');
    }
  };

  const currentPrice = isCustomSizeApplied 
    ? (selectedSizeObj?.price || product.price) + 3500 
    : (selectedSizeObj?.price || product.price);

  const handleAddToCartClick = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: activeImg || product.image,
      selectedColor: selectedColor,
      selectedSize: isCustomSizeApplied 
        ? `Custom: ${customDimensions.length}"L × ${customDimensions.depth}"D × ${customDimensions.height}"H (${customDimensions.chaiseOrientation})` 
        : selectedSizeObj?.name || product.defaultSize,
      fabric: selectedFabric,
      includeSwatchVisit,
      quantity,
      itemType: 'product'
    };

    addSofaToCart(cartItem);
    if (onAddToCart) onAddToCart(cartItem);
    if (showToast) {
      showToast(`Added "${product.name}" to Cart!`);
    }
  };

  const handleBuyNow = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: activeImg || product.image,
      selectedColor: selectedColor,
      selectedSize: isCustomSizeApplied 
        ? `Custom: ${customDimensions.length}"L × ${customDimensions.depth}"D × ${customDimensions.height}"H` 
        : selectedSizeObj?.name || product.defaultSize,
      fabric: selectedFabric,
      includeSwatchVisit,
      quantity,
      itemType: 'product'
    };

    addSofaToCart(cartItem);
    if (onDirectCheckout) {
      onDirectCheckout(cartItem);
    } else if (onAddToCart) {
      onAddToCart(cartItem);
    }
    navigate('/cart');
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setDeliveryStatus({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }
    setDeliveryStatus({
      valid: true,
      message: `Delivery available in 5 - 7 business days. Free White-Glove in-room installation included.`
    });
  };

  const handleSaveCustomDimensions = (e) => {
    e.preventDefault();
    setIsCustomSizeApplied(true);
    setCustomDimensionModalOpen(false);
    if (showToast) {
      showToast('Custom room dimensions applied to your configuration!');
    }
  };

  return (
    <div className="sofa-shop-page-root" style={{ paddingTop: '20px' }}>
      <div className="sofa-featured-section" style={{ maxWidth: '1360px', margin: '0 auto 60px auto' }}>
        
        {/* Navigation Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748B', marginBottom: '24px' }}>
          <button 
            type="button" 
            onClick={() => onBack ? onBack() : navigate('/sofas')}
            style={{ background: 'none', border: 'none', color: '#E11D74', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 600, padding: 0 }}
          >
            <ArrowLeft size={16} />
            <span>Back to Sofas</span>
          </button>
          <span>/</span>
          <span>Sofas & Living</span>
          <span>/</span>
          <span>{product.categoryLabel}</span>
          <span>/</span>
          <strong style={{ color: '#1E293B' }}>{product.name}</strong>
        </div>

        {/* PDP Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '48px', alignItems: 'start' }} className="pdp-responsive-grid">
          
          {/* LEFT: Product Gallery */}
          <div>
            <div style={{ width: '100%', height: '480px', borderRadius: '20px', overflow: 'hidden', background: '#F8FAFC', position: 'relative', border: '1px solid #E2E8F0', boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
              <img 
                src={activeImg} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <button 
                type="button"
                onClick={handleWishlistToggle}
                style={{ position: 'absolute', top: '20px', right: '20px', width: '42px', height: '42px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                <Heart size={22} fill={isWishlisted ? "#E11D74" : "none"} color={isWishlisted ? "#E11D74" : "#64748B"} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                {product.gallery.map((thumb, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(thumb)}
                    style={{ width: '84px', height: '84px', borderRadius: '12px', overflow: 'hidden', border: activeImg === thumb ? '2px solid #E11D74' : '1px solid #E2E8F0', padding: 0, cursor: 'pointer', background: '#F8FAFC' }}
                  >
                    <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Assured Quality Trust Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginTop: '28px' }}>
              <div style={{ padding: '16px 12px', borderRadius: '12px', background: '#FAF6F0', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <ShieldCheck size={22} color="#E11D74" style={{ margin: '0 auto 6px auto' }} />
                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#14213D' }}>5-Year Frame</strong>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Solid Teakwood</span>
              </div>
              <div style={{ padding: '16px 12px', borderRadius: '12px', background: '#FAF6F0', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <Truck size={22} color="#E11D74" style={{ margin: '0 auto 6px auto' }} />
                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#14213D' }}>White-Glove</strong>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Assembly In Room</span>
              </div>
              <div style={{ padding: '16px 12px', borderRadius: '12px', background: '#FAF6F0', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <Scissors size={22} color="#E11D74" style={{ margin: '0 auto 6px auto' }} />
                <strong style={{ fontSize: '0.82rem', display: 'block', color: '#14213D' }}>Doorstep Swatches</strong>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Touch Before Sewing</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Configurations & Details */}
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#E11D74', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {product.categoryLabel}
            </span>
            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.4rem', fontWeight: 700, color: '#14213D', margin: '6px 0 10px 0' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                <Star size={14} fill="#065F46" />
                <span>{product.rating}</span>
              </div>
              <span style={{ fontSize: '0.88rem', color: '#64748B' }}>
                {product.reviewsCount} Verified Customer Ratings
              </span>
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '22px' }}>
              <strong style={{ fontSize: '2rem', fontWeight: 800, color: '#14213D' }}>
                ₹{currentPrice.toLocaleString('en-IN')}
              </strong>
              {product.originalPrice && (
                <span style={{ fontSize: '1.15rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  ₹{(product.originalPrice + (isCustomSizeApplied ? 3500 : 0)).toLocaleString('en-IN')}
                </span>
              )}
              {product.discount && (
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10B981', background: '#ECFDF5', padding: '3px 8px', borderRadius: '6px' }}>
                  {product.discount}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* 1. Color Selection */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14213D', display: 'block', marginBottom: '8px' }}>
                Selected Color: <span style={{ color: '#E11D74' }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: c.hex,
                      border: '2px solid #FFFFFF',
                      boxShadow: selectedColor === c.name ? '0 0 0 2px #E11D74' : '0 0 0 1px #CBD5E1',
                      cursor: 'pointer',
                      transform: selectedColor === c.name ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.2s ease'
                    }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* 2. Fabric Choice */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14213D', display: 'block', marginBottom: '8px' }}>
                Upholstery Fabric: <span style={{ color: '#E11D74' }}>{selectedFabric}</span>
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {SOFA_FABRICS.map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFabric(f.name)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: selectedFabric === f.name ? 700 : 500,
                      border: selectedFabric === f.name ? '2px solid #E11D74' : '1px solid #CBD5E1',
                      background: selectedFabric === f.name ? '#FCE7F3' : '#FFFFFF',
                      color: selectedFabric === f.name ? '#E11D74' : '#14213D',
                      cursor: 'pointer'
                    }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Size / Dimensions Selector */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14213D' }}>
                  Select Size & Dimensions:
                </label>
                <button
                  type="button"
                  onClick={() => setCustomDimensionModalOpen(true)}
                  style={{ background: 'none', border: 'none', color: '#E11D74', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                >
                  <Ruler size={14} />
                  <span>{isCustomSizeApplied ? 'Edit Custom Size ✓' : 'Custom Room Dimensions?'}</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                {product.availableSizes?.map((sz, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSelectedSizeObj(sz);
                      setIsCustomSizeApplied(false);
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      textAlign: 'left',
                      border: (!isCustomSizeApplied && selectedSizeObj?.name === sz.name) ? '2px solid #E11D74' : '1px solid #E2E8F0',
                      background: (!isCustomSizeApplied && selectedSizeObj?.name === sz.name) ? '#FCE7F3' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <strong style={{ fontSize: '0.82rem', display: 'block', color: '#14213D' }}>{sz.name}</strong>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>{sz.dimensions}</span>
                  </button>
                ))}
              </div>

              {isCustomSizeApplied && (
                <div style={{ marginTop: '10px', padding: '10px 14px', borderRadius: '8px', background: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.82rem', color: '#065F46', fontWeight: 600 }}>
                    Custom Size Active: {customDimensions.length}" L × {customDimensions.depth}" D × {customDimensions.height}" H ({customDimensions.chaiseOrientation})
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setIsCustomSizeApplied(false)}
                    style={{ background: 'none', border: 'none', color: '#065F46', cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline' }}
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            {/* 4. Swatch Visit Option */}
            <div style={{ padding: '14px 18px', borderRadius: '12px', background: '#FAF6F0', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={includeSwatchVisit} 
                  onChange={e => setIncludeSwatchVisit(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#E11D74' }}
                />
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#14213D', display: 'block' }}>
                    Include Free At-Home Swatch Inspection
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    A master artisan will bring physical swatches to your doorstep before cutting fabric.
                  </span>
                </div>
              </label>
            </div>

            {/* 5. Quantity & Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #CBD5E1', borderRadius: '9999px', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '38px', height: '42px', border: 'none', background: '#F8FAFC', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}
                >
                  -
                </button>
                <span style={{ width: '38px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700 }}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '38px', height: '42px', border: 'none', background: '#F8FAFC', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}
                >
                  +
                </button>
              </div>

              <button 
                type="button"
                className="sofa-btn-secondary"
                onClick={handleAddToCartClick}
                style={{ flex: 1, padding: '14px', borderRadius: '9999px', fontWeight: 700, gap: '8px' }}
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>

              <button 
                type="button"
                className="sofa-btn-primary"
                onClick={handleBuyNow}
                style={{ flex: 1.2, padding: '14px', borderRadius: '9999px', fontWeight: 700 }}
              >
                Buy Now
              </button>
            </div>

            {/* 6. Pincode Check */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px', marginBottom: '28px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#14213D', display: 'block', marginBottom: '8px' }}>
                Estimated Delivery & Assembly:
              </label>
              <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '10px', maxWidth: '380px' }}>
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode" 
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
                <button 
                  type="submit" 
                  className="sofa-btn-secondary"
                  style={{ padding: '10px 18px', borderRadius: '8px', fontSize: '0.82rem' }}
                >
                  Check
                </button>
              </form>
              {deliveryStatus && (
                <p style={{ fontSize: '0.8rem', marginTop: '8px', color: deliveryStatus.valid ? '#10B981' : '#EF4444' }}>
                  {deliveryStatus.message}
                </p>
              )}
            </div>

            {/* Specifications Accordion / Highlights */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#14213D', marginBottom: '12px' }}>
                Engineering & Specifications
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Frame Construction:</span>
                  <strong style={{ color: '#14213D' }}>{product.frameMaterial}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Foam Core:</span>
                  <strong style={{ color: '#14213D' }}>{product.foamDensity}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Warranty:</span>
                  <strong style={{ color: '#14213D' }}>{product.warranty}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ color: '#64748B' }}>Delivery & Setup:</span>
                  <strong style={{ color: '#14213D' }}>{product.deliveryTime}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Customer Reviews Section */}
        <section style={{ marginTop: '64px', borderTop: '1px solid #E2E8F0', paddingTop: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="sofa-section-eyebrow">VERIFIED REVIEWS</span>
            <h2 className="sofa-section-title">What Our Customers Say</h2>
            <p className="sofa-section-subtitle">Real experiences from homeowners who furnished with StitchBeez.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {SOFA_REVIEWS.map(rev => (
              <div key={rev.id} style={{ padding: '24px', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#14213D' }}>{rev.author}</h5>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{rev.city}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#FB923C" color="#FB923C" />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', margin: '0 0 14px 0' }}>
                  "{rev.text}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94A3B8' }}>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>✓ Verified Buyer</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* CUSTOM ROOM DIMENSIONS MODAL */}
      {customDimensionModalOpen && (
        <div className="sofa-modal-overlay" onClick={() => setCustomDimensionModalOpen(false)}>
          <div className="sofa-swatch-modal animate-scale-up" onClick={e => e.stopPropagation()}>
            <button 
              type="button" 
              className="sofa-modal-close-btn"
              onClick={() => setCustomDimensionModalOpen(false)}
            >
              <X size={20} />
            </button>

            <form onSubmit={handleSaveCustomDimensions} className="swatch-form">
              <span className="sofa-section-eyebrow">CUSTOM FIT ADAPTATION</span>
              <h3 className="swatch-modal-heading">Enter Your Exact Room Dimensions</h3>
              <p className="swatch-modal-sub">Our master carpenters will craft the internal frame precisely to your specified inches.</p>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Total Length (Inches)</label>
                  <input 
                    type="number" 
                    value={customDimensions.length}
                    onChange={e => setCustomDimensions({ ...customDimensions, length: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Seating Depth (Inches)</label>
                  <input 
                    type="number" 
                    value={customDimensions.depth}
                    onChange={e => setCustomDimensions({ ...customDimensions, depth: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Backrest Height (Inches)</label>
                  <input 
                    type="number" 
                    value={customDimensions.height}
                    onChange={e => setCustomDimensions({ ...customDimensions, height: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Chaise Orientation (if sectional)</label>
                  <select
                    value={customDimensions.chaiseOrientation}
                    onChange={e => setCustomDimensions({ ...customDimensions, chaiseOrientation: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                  >
                    <option value="Standard Straight">Standard Straight</option>
                    <option value="Left Chaise Facing">Left Chaise Facing</option>
                    <option value="Right Chaise Facing">Right Chaise Facing</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Special Architectural Notes (Optional)</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Needs to fit through narrow staircase, low window sill on back..."
                  value={customDimensions.specialNotes}
                  onChange={e => setCustomDimensions({ ...customDimensions, specialNotes: e.target.value })}
                />
              </div>

              <button type="submit" className="sofa-btn-primary submit-swatch-btn">
                Apply Custom Dimensions (+₹3,500)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
