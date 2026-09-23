import React, { useState } from 'react';
import { 
  Star, Heart, ShieldCheck, Truck, ChevronRight, ArrowLeft, 
  ShoppingCart, Zap, Check, Tag, MapPin, Sparkles, Clock, Share2
} from 'lucide-react';

export default function FlipkartProductDetailView({
  product,
  categoryTitle = 'Handmade Bags & Leather',
  onBack,
  onAddToCart,
  onBuyNow,
  currentUser
}) {
  if (!product) return null;

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const colors = product.colors && product.colors.length > 0 ? product.colors : ['Classic Red', 'Tan Brown', 'Midnight Black'];
  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['Standard One-Size'];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [monogramText, setMonogramText] = useState('');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [userPincode, setUserPincode] = useState('560083');
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [pincodeSuccess, setPincodeSuccess] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [appliedBankOffer, setAppliedBankOffer] = useState('axis'); // 'none' | 'axis' | 'sbi'

  const originalPrice = product.originalPrice || Math.round(product.price * 1.4);
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const bankDiscount = appliedBankOffer !== 'none' ? 20 : 0;
  const effectivePrice = Math.max(0, product.price - bankDiscount);

  const handlePincodeCheck = () => {
    setCheckingPincode(true);
    setTimeout(() => {
      setCheckingPincode(false);
      setPincodeSuccess(true);
    }, 400);
  };

  const handleDetectGPSLocation = () => {
    if (navigator.geolocation) {
      setCheckingPincode(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCheckingPincode(false);
          setUserPincode('560083'); // Bengaluru resolved
          setPincodeSuccess(true);
        },
        () => {
          setCheckingPincode(false);
          setUserPincode('560001');
          setPincodeSuccess(true);
        }
      );
    }
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedColor,
        selectedSize,
        monogramText: monogramText.trim() ? monogramText.trim() : null,
        giftWrapping,
        quantity,
        effectivePrice
      });
    }
  };

  const handleBuy = () => {
    if (onBuyNow) {
      onBuyNow({
        ...product,
        selectedColor,
        selectedSize,
        monogramText: monogramText.trim() ? monogramText.trim() : null,
        giftWrapping,
        quantity,
        effectivePrice
      });
    }
  };

  return (
    <div className="flipkart-pdp-container animate-fade-in" style={{ padding: '8px 0 4rem 0' }}>
      
      {/* Top Header & Breadcrumb Nav */}
      <div 
        style={{ 
          background: 'var(--bg-card)', 
          borderRadius: '10px', 
          border: '1px solid var(--border-color)', 
          padding: '12px 20px', 
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <button
            onClick={onBack}
            className="btn btn-ghost"
            style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.82rem' }}
          >
            <ArrowLeft size={16} /> Back to Catalog
          </button>
          <span>/</span>
          <span>Home</span>
          <ChevronRight size={12} />
          <span>{categoryTitle}</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Heart size={14} style={{ color: isWishlisted ? '#ef4444' : 'inherit', fill: isWishlisted ? '#ef4444' : 'none' }} />
            {isWishlisted ? 'Wishlisted' : 'Save to Wishlist'}
          </button>
        </div>
      </div>

      {/* Main PDP Grid (Matching Image 2 Reference) */}
      <div 
        className="flipkart-pdp-layout" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1.15fr', 
          gap: '24px', 
          alignItems: 'start' 
        }}
      >
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: MULTI-ANGLE GALLERY (Image 2 Reference)           */}
        {/* ============================================================== */}
        <div 
          className="flipkart-gallery-card"
          style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '24px',
            position: 'sticky',
            top: '80px'
          }}
        >
          {/* Main Featured Photo Box */}
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: '420px', 
              borderRadius: '12px', 
              background: '#0a0914', 
              overflow: 'hidden',
              marginBottom: '16px',
              border: '1px solid var(--border-color)'
            }}
          >
            <img
              src={images[activeImageIndex] || product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />

            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              <Heart size={18} style={{ color: isWishlisted ? '#ef4444' : '#64748b', fill: isWishlisted ? '#ef4444' : 'none' }} />
            </button>
          </div>

          {/* Thumbnail Strip (Multi-angle view switcher) */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
            {images.map((imgUrl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImageIndex(i)}
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: activeImageIndex === i ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: '#0a0914',
                  padding: 0,
                  cursor: 'pointer',
                  opacity: activeImageIndex === i ? 1 : 0.65,
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                <img src={imgUrl} alt={`Thumbnail ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          {/* Dual Action Buttons (Flipkart Fixed / Bottom CTAs) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={handleAdd}
              className="btn btn-secondary"
              style={{
                padding: '14px',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: '8px',
                border: '1.5px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuy}
              className="btn"
              style={{
                padding: '14px',
                fontSize: '0.95rem',
                fontWeight: 800,
                borderRadius: '8px',
                background: 'var(--grad-primary)',
                color: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(247, 37, 133, 0.4)'
              }}
            >
              <Zap size={18} /> Buy at ₹{effectivePrice.toLocaleString()}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: PRODUCT SPECIFICATIONS & OFFERS (Image 2)       */}
        {/* ============================================================== */}
        <div 
          className="flipkart-details-card"
          style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '28px'
          }}
        >
          {/* Color Switcher Thumbnails */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Selected Color: <strong style={{ color: 'var(--text-primary)' }}>{selectedColor}</strong>
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {colors.map((c, idx) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px',
                    borderRadius: '8px',
                    border: selectedColor === c ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={images[idx % images.length]}
                    alt={c}
                    style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.68rem', color: selectedColor === c ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 600 }}>
                    {c}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Title */}
          <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px 0', lineHeight: 1.35 }}>
            {product.name}
          </h1>

          {/* Ratings & Assured Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#388e3c', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 800 }}>
              {product.rating || 4.6} <Star size={12} style={{ fill: '#fff' }} />
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {product.reviewsCount || 254} ratings & 82 reviews
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(76,201,240,0.12)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
              <ShieldCheck size={13} style={{ color: 'var(--accent)' }} /> StitchBee Assured
            </span>
          </div>

          {/* Pricing Details */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '18px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#388e3c' }}>
              ↓{discountPercent}%
            </span>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹{originalPrice.toLocaleString()}
            </span>
            <strong style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              ₹{effectivePrice.toLocaleString()}
            </strong>
          </div>

          {/* "WOW Deal" Bank Offers Card (Image 2 Reference) */}
          <div 
            className="flipkart-bank-offers-card"
            style={{
              background: 'linear-gradient(135deg, rgba(247,37,133,0.08), rgba(114,9,183,0.08))',
              border: '1px solid rgba(247,37,133,0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '22px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ background: 'var(--grad-primary)', color: '#fff', fontSize: '0.68rem', fontWeight: 900, padding: '2px 6px', borderRadius: '3px' }}>
                  WOW Deal
                </span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  Apply offers for maximum savings
                </strong>
              </div>
              <strong style={{ fontSize: '1rem', color: '#388e3c' }}>
                Buy at ₹{effectivePrice.toLocaleString()}
              </strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {/* Axis Bank Offer */}
              <div 
                onClick={() => setAppliedBankOffer(appliedBankOffer === 'axis' ? 'none' : 'axis')}
                style={{
                  background: 'var(--bg-card)',
                  border: appliedBankOffer === 'axis' ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', background: '#fef3c7', color: '#92400e', fontWeight: 700, padding: '1px 6px', borderRadius: '3px' }}>
                    Best value for you
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800 }}>
                    {appliedBankOffer === 'axis' ? 'Applied ✓' : 'Apply'}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ₹20 off
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  StitchBee Pay / Axis Bank
                </div>
              </div>

              {/* SBI Bank Offer */}
              <div 
                onClick={() => setAppliedBankOffer(appliedBankOffer === 'sbi' ? 'none' : 'sbi')}
                style={{
                  background: 'var(--bg-card)',
                  border: appliedBankOffer === 'sbi' ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#065f46', fontWeight: 700, padding: '1px 6px', borderRadius: '3px' }}>
                    Instant UPI
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800 }}>
                    {appliedBankOffer === 'sbi' ? 'Applied ✓' : 'Apply'}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ₹20 off
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  SBI YONO & Credit Card
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details with GPS button (Image 2 Reference) */}
          <div style={{ marginBottom: '22px', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              Delivery Details
            </span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--primary)' }} />
                <input
                  type="text"
                  value={userPincode}
                  onChange={e => setUserPincode(e.target.value)}
                  placeholder="Enter Delivery Pincode"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handlePincodeCheck}
                className="btn btn-secondary"
                style={{ padding: '10px 16px', fontSize: '0.82rem', fontWeight: 700 }}
              >
                Check
              </button>
              <button
                type="button"
                onClick={handleDetectGPSLocation}
                className="btn"
                style={{
                  padding: '10px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  background: 'rgba(247,37,133,0.1)',
                  color: 'var(--primary)',
                  border: '1px solid rgba(247,37,133,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title="Use GPS to fetch address"
              >
                <MapPin size={14} /> GPS
              </button>
            </div>

            {pincodeSuccess && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#10b981' }}>
                <Check size={15} />
                <span>Delivery by <strong>Saturday, 26 Sep</strong> • Fastest Doorstep Dispatch</span>
              </div>
            )}
          </div>

          {/* Size / Sizing Options */}
          {sizes.length > 1 && (
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                Select Size / Fit
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: selectedSize === s ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      background: selectedSize === s ? 'rgba(247,37,133,0.1)' : 'transparent',
                      color: selectedSize === s ? 'var(--primary)' : 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bespoke Monogramming & Custom Options */}
          <div style={{ marginBottom: '22px', borderBottom: '1px solid var(--border-color)', paddingBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sparkles size={16} style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Complimentary Atelier Customization
              </span>
            </div>
            
            <input
              type="text"
              maxLength={12}
              value={monogramText}
              onChange={e => setMonogramText(e.target.value.toUpperCase())}
              placeholder="Custom Monogram / Name (e.g. RK or K.K.)"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                marginBottom: '10px'
              }}
            />

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={giftWrapping}
                onChange={e => setGiftWrapping(e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Add Luxury Gift Packaging with Wax Seal (+₹49)</span>
            </label>
          </div>

          {/* Product Description */}
          <div>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
              Product Story & Craftsmanship
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {product.description || 'Master artisan handcrafted construction utilizing premium materials, durable hardware, and bespoke stitching standards.'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
