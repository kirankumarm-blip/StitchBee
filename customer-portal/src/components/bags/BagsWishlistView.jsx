import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Trash2, ChevronRight, ArrowLeft, Star, 
  Sparkles, CheckCircle2 
} from 'lucide-react';
import { 
  ALL_BAG_PRODUCTS, 
  getWishlist, 
  toggleWishlist, 
  addToCart 
} from '../../utils/bagsStore';

export default function BagsWishlistView({ showToast }) {
  const navigate = useNavigate();

  const [wishlistIds, setWishlistIds] = useState(getWishlist());

  const wishlistProducts = ALL_BAG_PRODUCTS.filter(p => wishlistIds.includes(p.id));

  const handleRemove = (productId) => {
    const { updated } = toggleWishlist(productId);
    setWishlistIds(updated);
    showToast('Removed item from your wishlist');
  };

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    const { updated } = toggleWishlist(product.id);
    setWishlistIds(updated);
    showToast(`Moved "${product.name}" to your bag! 🛍️`);
  };

  return (
    <div className="bl-wishlist-page">
      <div className="bl-container" style={{ padding: '24px 12px 60px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
          <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/bags')} className="bl-crumb-link">Bags & Leather</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">My Wishlist</span>
        </nav>

        {/* Back Link */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/bags')}
          >
            <ArrowLeft size={16} /> Back to Bags Studio
          </button>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <span className="bl-tag-label">SAVED ARTISAN DESIGNS</span>
          <h1 className="bl-serif-title" style={{ fontSize: '2.4rem', margin: '4px 0 6px' }}>
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="bl-section-subtext" style={{ margin: 0 }}>
            Saved handcrafted leather bags ready for your next order or bespoke customization.
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="bl-wishlist-grid">
            {wishlistProducts.map(product => (
              <div key={product.id} className="bl-product-card bl-wishlist-card">
                <div 
                  className="bl-prod-img-box"
                  onClick={() => navigate(`/bags/product/${product.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={product.img} alt={product.name} />

                  <button 
                    className="bl-prod-wish-btn active"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(product.id);
                    }}
                    title="Remove from wishlist"
                  >
                    <Trash2 size={15} color="#f72585" />
                  </button>
                </div>

                <div className="bl-prod-info">
                  <div className="bl-prod-meta-top">
                    <span className="bl-prod-cat-tag">{product.category.toUpperCase()}</span>
                    <div className="bl-prod-rating">
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <h4 
                    className="bl-prod-name"
                    onClick={() => navigate(`/bags/product/${product.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.name}
                  </h4>
                  <p className="bl-prod-mat-brief">{product.material}</p>

                  <div className="bl-prod-price-row">
                    <div className="bl-prod-price">₹{product.price.toLocaleString('en-IN')}</div>
                    {product.originalPrice && (
                      <div className="bl-prod-price-orig">₹{product.originalPrice.toLocaleString('en-IN')}</div>
                    )}
                  </div>

                  <div className="bl-wishlist-actions-row">
                    <button 
                      className="bl-btn-primary bl-wishlist-move-btn"
                      onClick={() => handleMoveToCart(product)}
                    >
                      <ShoppingCart size={15} /> Move to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bl-empty-state-card">
            <div className="bl-empty-icon-circle">
              <Heart size={36} color="var(--bl-pink)" />
            </div>
            <h3 className="bl-serif-title" style={{ fontSize: '1.6rem', margin: '12px 0 8px' }}>
              Your wishlist is empty
            </h3>
            <p style={{ color: 'var(--bl-text-secondary)', maxWidth: '420px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Tap the heart icon on any handcrafted bag to save it here for later or to discuss with our master artisans.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                className="bl-btn-primary"
                onClick={() => navigate('/bags/shop')}
              >
                Discover Handcrafted Bags →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
