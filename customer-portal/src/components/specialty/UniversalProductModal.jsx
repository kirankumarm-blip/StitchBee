import React, { useState } from 'react';
import { 
  Star, Heart, ShoppingCart, ShieldCheck, Truck, Sparkles, 
  Check, X, ArrowRight, Layers, Eye 
} from 'lucide-react';

export default function UniversalProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onDirectCheckout,
  onToggleWishlist,
  isWishlisted = false
}) {
  if (!isOpen || !product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Natural Tan');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [monogramText, setMonogramText] = useState('');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [
    product.image,
    product.image,
    product.image
  ];

  const handleAdd = () => {
    setAddedAnimation(true);
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedColor,
        selectedSize,
        monogramText: monogramText.trim() ? monogramText.trim() : null,
        giftWrapping,
        giftMessage: giftMessage.trim() ? giftMessage.trim() : null,
        quantity: 1,
        itemType: 'product'
      });
    }
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  const handleCheckoutNow = () => {
    if (onDirectCheckout) {
      onDirectCheckout({
        ...product,
        selectedColor,
        selectedSize,
        monogramText: monogramText.trim() ? monogramText.trim() : null,
        giftWrapping,
        giftMessage: giftMessage.trim() ? giftMessage.trim() : null,
        quantity: 1,
        itemType: 'product'
      });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{
          maxWidth: '920px',
          width: '94%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          background: 'var(--bg-dark)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px', color: '#fff' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '36px', alignItems: 'start' }} className="product-modal-grid-responsive">
          {/* LEFT: Editorial Multi-Angle Gallery */}
          <div>
            <div style={{ position: 'relative', width: '100%', height: '420px', borderRadius: '18px', overflow: 'hidden', background: '#090812', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Tag pill */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--grad-primary)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', letterSpacing: '0.04em' }}>
                {product.categoryLabel || 'HANDCRAFTED'}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist && onToggleWishlist(product)}
                style={{ position: 'absolute', top: '16px', right: '16px', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: 'none', color: isWishlisted ? 'var(--primary)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Heart size={18} fill={isWishlisted ? 'var(--primary)' : 'none'} />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: activeImageIndex === idx ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      opacity: activeImageIndex === idx ? 1 : 0.6,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Specs, Customization, & Actions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <div style={{ display: 'flex', color: '#fbbf24' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" />)}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {product.rating || '4.9'} ({product.reviewsCount || 42} artisan reviews)
              </span>
            </div>

            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: '0 0 10px 0', color: 'var(--text-primary)', lineHeight: '1.2' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                ₹{product.price ? product.price.toLocaleString() : '1,999'}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span style={{ fontSize: '0.72rem', background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                Includes GST & Certification
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
              {product.description || 'Individually crafted by master StitchBee artisans with reinforced stress-point stitching and hand-finished edges.'}
            </p>

            {/* COLOR SELECTION */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Color Choice: <strong style={{ color: 'var(--primary)' }}>{selectedColor}</strong>
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.colors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className="btn"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.78rem',
                        borderRadius: '20px',
                        border: selectedColor === col ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                        background: selectedColor === col ? 'rgba(247,37,133,0.1)' : 'rgba(255,255,255,0.03)',
                        color: selectedColor === col ? '#fff' : 'var(--text-secondary)'
                      }}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE / VARIANT SELECTION */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Select Sizing:
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className="btn"
                      style={{
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        borderRadius: '8px',
                        border: selectedSize === sz ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                        background: selectedSize === sz ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                        color: '#fff'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BESPOKE MONOGRAM / PERSONALIZATION */}
            <div style={{ marginBottom: '18px', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Sparkles size={14} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>
                  Complimentary Hot-Stamp Monogramming
                </span>
              </div>
              <input
                type="text"
                maxLength={12}
                placeholder="e.g. R.V. or EMILY (up to 12 chars)"
                value={monogramText}
                onChange={e => setMonogramText(e.target.value.toUpperCase())}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.82rem', letterSpacing: '0.08em' }}
              />
            </div>

            {/* GIFT WRAPPING CHECKBOX (Gifts category or any) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="giftWrapModal"
                checked={giftWrapping}
                onChange={e => setGiftWrapping(e.target.checked)}
                style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <label htmlFor="giftWrapModal" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Add Artisan Eco Gift Wrap with satin ribbon (+₹99)
              </label>
            </div>

            {/* CTA BUTTONS */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)' }}
                onClick={handleAdd}
              >
                {addedAnimation ? (
                  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={16} /> Added to Cart!
                  </span>
                ) : (
                  <>
                    <ShoppingCart size={16} /> Add to Cart
                  </>
                )}
              </button>

              <button
                className="btn btn-primary"
                style={{ flex: 1.3, padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={handleCheckoutNow}
              >
                Buy Now (Cashfree) <ArrowRight size={16} />
              </button>
            </div>

            {/* Assurances */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--border-color)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={14} style={{ color: 'var(--accent)' }} /> 3–5 Days Dispatch
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} style={{ color: '#10b981' }} /> 100% Craftsmanship Fit Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
