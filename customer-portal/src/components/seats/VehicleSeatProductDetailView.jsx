import React, { useState } from 'react';
import { FEATURED_PRODUCTS, ALL_SEAT_PRODUCTS } from '../../utils/vehicleSeatShopStore';
import FlipkartProductDetailView from '../specialty/FlipkartProductDetailView';

export default function VehicleSeatProductDetailView({
  productId,
  currentUser,
  onAddToCart,
  onDirectCheckout,
  onBack,
  theme = 'light',
  showToast = () => {}
}) {
  const product = (ALL_SEAT_PRODUCTS && ALL_SEAT_PRODUCTS.find(p => p.id === productId)) || FEATURED_PRODUCTS.find(p => p.id === productId) || FEATURED_PRODUCTS[0];

  const [activeImg, setActiveImg] = useState(product?.gallery?.[0] || product?.img || '');
  const [selectedColor, setSelectedColor] = useState(product?.swatches?.[0]?.name || 'Default');
  const [selectedVehicleModel, setSelectedVehicleModel] = useState('Standard Factory Fitment');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (customItem) => {
    const item = customItem || {
      id: `${product.id}-${selectedColor.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      productId: product.id,
      title: `${product.name} (${selectedColor})`,
      name: `${product.name} (${selectedColor})`,
      price: product.price,
      effectivePrice: product.price,
      originalPrice: product.originalPrice,
      quantity,
      image: activeImg || product.img,
      category: 'Vehicle Seat Covers',
      vehicleType: product.vehicleType,
      selectedColor,
      specs: `${selectedVehicleModel} • Color: ${selectedColor} • ${product.material} • Qty: ${quantity}`,
      itemType: 'custom'
    };

    if (onAddToCart) {
      onAddToCart(item);
    }
    showToast(`Added ${item.name || product.name} to Cart! 🛒`);
  };

  const handleBuyNow = (customItem) => {
    const item = customItem || {
      id: `${product.id}-${selectedColor.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      productId: product.id,
      title: `${product.name} (${selectedColor})`,
      name: `${product.name} (${selectedColor})`,
      price: product.price * quantity,
      effectivePrice: product.price * quantity,
      originalPrice: product.originalPrice * quantity,
      quantity,
      image: activeImg || product.img,
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

  const flipkartProduct = product ? {
    ...product,
    brand: 'StitchBee Automotive Atelier',
    categoryLabel: 'Vehicle Seat Covers',
    image: product.img || product.image,
    gallery: product.gallery && product.gallery.length > 0 ? product.gallery : [product.img || product.image],
    colors: product.swatches ? product.swatches.map(s => s.name) : ['Onyx Black', 'Crimson Red', 'Saddle Brown', 'Cognac Tan'],
    sizes: ['Universal Factory Fit', 'Custom Tailored Fit'],
    isAssured: true,
    rating: product.rating || 4.9,
    reviewsCount: product.reviewsCount || 142,
    description: product.description || 'Custom and ready-made seat covers engineered for extreme durability and luxurious riding comfort.'
  } : null;

  return (
    <div className={`v-pdp-wrapper ${theme === 'dark' ? 'dark' : ''}`} style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'var(--v-bg-page, #FFFFFF)',
      padding: '24px 0 64px 0'
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        <FlipkartProductDetailView
          product={flipkartProduct}
          categoryTitle="Vehicle Seat Covers"
          onBack={onBack}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
