import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, ShoppingCart, Star, ShieldCheck, 
  Truck, CheckCircle2, ChevronRight, Gem, Wrench, Share2 
} from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../utils/vehicleSeatShopStore';

export default function VehicleSeatProductDetailView({
  productId,
  currentUser,
  onAddToCart,
  onDirectCheckout,
  onBack,
  theme = 'light',
  showToast = () => {}
}) {
  const product = FEATURED_PRODUCTS.find(p => p.id === productId) || FEATURED_PRODUCTS[0];

  const [activeImg, setActiveImg] = useState(product.gallery[0] || product.img);
  const [selectedColor, setSelectedColor] = useState(product.swatches[0]?.name || 'Default');
  const [selectedVehicleModel, setSelectedVehicleModel] = useState('Standard Factory Fitment');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    const item = {
      id: `${product.id}-${selectedColor.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      productId: product.id,
      title: `${product.name} (${selectedColor})`,
      name: `${product.name} (${selectedColor})`,
      price: product.price,
      effectivePrice: product.price,
      originalPrice: product.originalPrice,
      quantity,
      image: activeImg,
      category: 'Vehicle Seat Covers',
      vehicleType: product.vehicleType,
      selectedColor,
      specs: `${selectedVehicleModel} • Color: ${selectedColor} • ${product.material} • Qty: ${quantity}`,
      itemType: 'custom'
    };

    if (onAddToCart) {
      onAddToCart(item);
    }
    showToast(`Added ${quantity}x ${product.name} (${selectedColor}) to Cart! 🛒`);
  };

  const handleBuyNow = () => {
    const item = {
      id: `${product.id}-${selectedColor.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      productId: product.id,
      title: `${product.name} (${selectedColor})`,
      name: `${product.name} (${selectedColor})`,
      price: product.price * quantity,
      effectivePrice: product.price * quantity,
      originalPrice: product.originalPrice * quantity,
      quantity,
      image: activeImg,
      category: 'Vehicle Seat Covers',
      vehicleType: product.vehicleType,
      selectedColor,
      specs: `${selectedVehicleModel} • Color: ${selectedColor} • ${product.material}`,
      itemType: 'custom'
    };

    if (onDirectCheckout) {
      onDirectCheckout(item);
    } else if (onAddToCart) {
      onAddToCart(item);
    }
  };

  return (
    <div className={`v-pdp-wrapper ${theme === 'dark' ? 'dark' : ''}`} style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'var(--v-bg-page, #FFFFFF)',
      color: 'var(--v-text-primary, #10213F)',
      padding: '32px 0 64px 0'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Breadcrumb / Back Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <button 
            type="button" 
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: '1px solid var(--v-border, #E8E8EC)',
              borderRadius: '20px',
              padding: '8px 18px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              color: 'var(--v-text-primary, #10213F)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Seat Covers</span>
          </button>

          <span style={{ fontSize: '0.82rem', color: 'var(--v-text-secondary, #52627A)' }}>
            Vehicle Seat Covers / {product.name}
          </span>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'start'
        }}>
          
          {/* Left Gallery */}
          <div>
            <div style={{
              width: '100%',
              height: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#F8FAFC',
              border: '1px solid var(--v-border, #E8E8EC)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={activeImg} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.gallery.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImg(img)}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: activeImg === img ? '2.5px solid #FF087A' : '1px solid var(--v-border, #E8E8EC)',
                    cursor: 'pointer',
                    opacity: activeImg === img ? 1 : 0.7,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={img} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Product Details */}
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#FF087A',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              VERIFIED ATELIER COLLECTION
            </span>

            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0 0 12px 0', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                {product.rating} ({product.reviewsCount} verified reviews)
              </span>
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '24px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#FF087A' }}>
                {product.formattedPrice}
              </span>
              <span style={{ fontSize: '1.1rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span style={{
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '0.78rem',
                fontWeight: 800
              }}>
                SAVE 33%
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--v-text-secondary, #52627A)', lineHeight: 1.6, marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Color Swatches */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px' }}>
                Selected Color: <strong>{selectedColor}</strong>
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.swatches.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedColor(s.name)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: s.hex,
                      border: '2px solid #FFFFFF',
                      cursor: 'pointer',
                      boxShadow: selectedColor === s.name ? '0 0 0 3px #FF087A' : '0 2px 4px rgba(0,0,0,0.2)',
                      transition: 'all 0.15s ease'
                    }}
                    title={s.name}
                  />
                ))}
              </div>
            </div>

            {/* Vehicle Model Fitment Dropdown */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                Vehicle Compatibility & Year:
              </label>
              <select
                value={selectedVehicleModel}
                onChange={e => setSelectedVehicleModel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--v-border, #E8E8EC)',
                  backgroundColor: 'var(--v-bg-card, #FFFFFF)',
                  color: 'inherit',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="Standard Factory Fitment">Standard Factory Fitment (Universal)</option>
                <option value="Mahindra Thar / Scorpio-N">Mahindra Thar / Scorpio-N</option>
                <option value="Tata Nexon / Punch / Harrier">Tata Nexon / Punch / Harrier</option>
                <option value="Hyundai Creta / Venue / Verna">Hyundai Creta / Venue / Verna</option>
                <option value="Maruti Suzuki Brezza / Grand Vitara">Maruti Suzuki Brezza / Grand Vitara</option>
                <option value="Toyota Fortuner / Innova Hycross">Toyota Fortuner / Innova Hycross</option>
                <option value="Royal Enfield Classic / Meteor / Hunter">Royal Enfield Classic / Meteor / Hunter</option>
                <option value="Commercial 3-Wheeler Auto (Bajaj/Piaggio)">Commercial 3-Wheeler Auto (Bajaj/Piaggio)</option>
                <option value="Commercial Bus Coach (2x2 Recliner)">Commercial Bus Coach (2x2 Recliner)</option>
              </select>
            </div>

            {/* Key Features List */}
            <div style={{
              backgroundColor: 'var(--v-bg-soft, #FFF7F4)',
              borderRadius: '12px',
              padding: '18px 20px',
              marginBottom: '28px'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '10px', color: '#10213F' }}>
                Craftsmanship Inclusions:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#52627A', lineHeight: 1.6 }}>
                {product.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>

            {/* Quantity and Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--v-border, #E8E8EC)',
                borderRadius: '24px',
                padding: '4px 8px'
              }}>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  style={{ background: 'none', border: 'none', padding: '6px 12px', cursor: 'pointer', fontWeight: 800 }}
                >
                  -
                </button>
                <span style={{ padding: '0 8px', fontWeight: 800, fontSize: '0.9rem' }}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                  style={{ background: 'none', border: 'none', padding: '6px 12px', cursor: 'pointer', fontWeight: 800 }}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#FF087A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '14px 24px',
                  borderRadius: '24px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                style={{
                  flex: 1,
                  backgroundColor: '#10213F',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '14px 24px',
                  borderRadius: '24px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* Assurances */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '0.78rem', color: '#52627A' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={16} color="#FF087A" />
                <span>Doorstep Fitment</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#FF087A" />
                <span>{product.warranty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Gem size={16} color="#FF087A" />
                <span>Genuine Automotive Grade</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
