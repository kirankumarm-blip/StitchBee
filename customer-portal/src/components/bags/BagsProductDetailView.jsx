import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Star, ShieldCheck, Truck, RefreshCw, 
  ChevronRight, ArrowLeft, Check, Sparkles, Gem, Layers, Scissors, Info 
} from 'lucide-react';
import { 
  ALL_BAG_PRODUCTS, 
  getWishlist, 
  toggleWishlist, 
  addToCart 
} from '../../utils/bagsStore';

export default function BagsProductDetailView({ showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = ALL_BAG_PRODUCTS.find(p => p.id === id) || ALL_BAG_PRODUCTS[0];

  const [activeImg, setActiveImg] = useState(product.images?.[0] || product.img);
  const [selectedColor, setSelectedColor] = useState(product.selectedColor || product.colors?.[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'materials' | 'shipping'
  const [wishlist, setWishlist] = useState(getWishlist());

  useEffect(() => {
    if (product) {
      setActiveImg(product.images?.[0] || product.img);
      setSelectedColor(product.selectedColor || product.colors?.[0]?.name);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, product]);

  const isWish = wishlist.includes(product.id);

  const handleWishlistToggle = () => {
    const { updated, added } = toggleWishlist(product.id);
    setWishlist(updated);
    showToast(added ? 'Saved to your wishlist ❤️' : 'Removed from wishlist');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    showToast(`Added ${quantity}x "${product.name}" to your bag! 🛍️`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    navigate('/cart');
  };

  const handleCustomize = () => {
    navigate(`/bags/custom-design?base=${product.id}&style=${product.category}&color=${encodeURIComponent(selectedColor)}`);
  };

  return (
    <div className="bl-pdp-page">
      <div className="bl-container" style={{ padding: '24px 12px 60px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
          <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/bags')} className="bl-crumb-link">Bags & Leather</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/bags/shop')} className="bl-crumb-link">Shop</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">{product.name}</span>
        </nav>

        {/* Back Link */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            className="bl-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} /> Back to Collection
          </button>
        </div>

        {/* Product Details 2-Column Grid */}
        <div className="bl-pdp-grid">
          
          {/* Left Column: Media Gallery */}
          <div className="bl-pdp-media-col">
            <div className="bl-pdp-main-img-box">
              <img src={activeImg} alt={product.name} className="bl-pdp-main-img" />
              
              <button 
                className={`bl-pdp-wish-float-btn ${isWish ? 'active' : ''}`}
                onClick={handleWishlistToggle}
                title="Save to Wishlist"
              >
                <Heart size={20} fill={isWish ? '#f72585' : 'none'} color={isWish ? '#f72585' : '#1e293b'} strokeWidth={2} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="bl-pdp-thumbs-row">
                {product.images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    className={`bl-pdp-thumb-btn ${activeImg === imgSrc ? 'active' : ''}`}
                    onClick={() => setActiveImg(imgSrc)}
                  >
                    <img src={imgSrc} alt={`${product.name} preview ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Artisan Trust Row */}
            <div className="bl-pdp-trust-strip">
              <div className="bl-trust-strip-item">
                <Gem size={20} className="bl-text-pink" />
                <div>
                  <strong>Certified Tuscan Hide</strong>
                  <span>100% Genuine Leather</span>
                </div>
              </div>
              <div className="bl-trust-strip-item">
                <Scissors size={20} className="bl-text-pink" />
                <div>
                  <strong>Master Artisan Handcrafted</strong>
                  <span>Every stitch inspected</span>
                </div>
              </div>
              <div className="bl-trust-strip-item">
                <Truck size={20} className="bl-text-pink" />
                <div>
                  <strong>Secure Insured Shipping</strong>
                  <span>Doorstep delivery in 3-5 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Spec & Action */}
          <div className="bl-pdp-info-col">
            <span className="bl-tag-label">{product.category.toUpperCase()}</span>
            
            <h1 className="bl-serif-title bl-pdp-title">
              {product.name}
            </h1>

            {/* Rating & Review Counter */}
            <div className="bl-pdp-rating-row">
              <div className="bl-pdp-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span className="bl-pdp-rating-num">{product.rating}</span>
              <span className="bl-pdp-rating-sep">•</span>
              <button 
                className="bl-pdp-review-link"
                onClick={() => navigate('/bags/reviews')}
              >
                {product.reviewCount} verified reviews →
              </button>
            </div>

            {/* Price Box */}
            <div className="bl-pdp-price-box">
              <div className="bl-pdp-price-main">₹{product.price.toLocaleString('en-IN')}</div>
              {product.originalPrice && (
                <div className="bl-pdp-price-orig">₹{product.originalPrice.toLocaleString('en-IN')}</div>
              )}
              {product.originalPrice && (
                <span className="bl-pdp-save-badge">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
              <div className="bl-pdp-tax-note">Inclusive of all taxes & complimentary delivery</div>
            </div>

            {/* Stock Availability */}
            <div className="bl-pdp-stock-badge">
              <span className="bl-stock-indicator" />
              <span>In Stock ({product.stock} units available) — Ships within 24-48 hours</span>
            </div>

            {/* Color Selection */}
            <div className="bl-pdp-section-block">
              <div className="bl-pdp-section-label">
                <span>Color:</span>
                <strong>{selectedColor}</strong>
              </div>
              <div className="bl-pdp-color-swatches">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    className={`bl-pdp-color-pill ${selectedColor === col.name ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedColor(col.name);
                      if (col.img) setActiveImg(col.img);
                    }}
                  >
                    <span className="bl-swatch-circle" style={{ backgroundColor: col.hex }} />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Snapshot */}
            <div className="bl-pdp-specs-card">
              <div className="bl-spec-row">
                <span className="bl-spec-name">Material:</span>
                <span className="bl-spec-val">{product.material}</span>
              </div>
              <div className="bl-spec-row">
                <span className="bl-spec-name">Dimensions:</span>
                <span className="bl-spec-val">{product.dimensions}</span>
              </div>
              {product.weight && (
                <div className="bl-spec-row">
                  <span className="bl-spec-name">Weight:</span>
                  <span className="bl-spec-val">{product.weight}</span>
                </div>
              )}
            </div>

            {/* Key Features */}
            {product.features && (
              <div className="bl-pdp-features-list">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="bl-pdp-feat-item">
                    <Check size={15} className="bl-text-pink" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector & CTA Buttons */}
            <div className="bl-pdp-action-area">
              <div className="bl-pdp-qty-row">
                <span className="bl-qty-label">Quantity:</span>
                <div className="bl-qty-picker">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="bl-qty-btn"
                  >
                    -
                  </button>
                  <span className="bl-qty-num">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="bl-qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bl-pdp-btns-stack">
                <div className="bl-pdp-main-btns-row">
                  <button 
                    className="bl-btn-primary bl-pdp-cart-btn"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={17} /> Add to Cart
                  </button>

                  <button 
                    className="bl-btn-secondary bl-pdp-buy-btn"
                    onClick={handleBuyNow}
                  >
                    Buy Now →
                  </button>
                </div>

                {product.customizable && (
                  <button 
                    className="bl-pdp-custom-btn"
                    onClick={handleCustomize}
                  >
                    <Sparkles size={16} className="bl-text-pink" />
                    <span>Customize This Bag (Add Initials & Color Details)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Accordion / Tab Information */}
            <div className="bl-pdp-tabs-wrap">
              <div className="bl-pdp-tab-headers">
                <button 
                  className={`bl-pdp-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Description
                </button>
                <button 
                  className={`bl-pdp-tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
                  onClick={() => setActiveTab('materials')}
                >
                  Leather & Care
                </button>
                <button 
                  className={`bl-pdp-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping & Returns
                </button>
              </div>

              <div className="bl-pdp-tab-body">
                {activeTab === 'overview' && (
                  <p className="bl-pdp-desc-text">{product.description}</p>
                )}
                {activeTab === 'materials' && (
                  <div className="bl-pdp-desc-text">
                    <p><strong>Hide Origin:</strong> Vegetable tanned Tuscan full-grain cowhide.</p>
                    <p><strong>Hardware:</strong> Solid brass with anti-tarnish electroplating.</p>
                    <p><strong>Care Instruction:</strong> Condition with natural leather balm every 6 months. Wipe with a dry microfiber cloth if caught in rain.</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="bl-pdp-desc-text">
                    <p><strong>Dispatch:</strong> Dispatched from our Bengaluru artisan workshop within 24–48 hours.</p>
                    <p><strong>Returns:</strong> 7-day hassle-free doorstep returns and complimentary alterations guarantee.</p>
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
