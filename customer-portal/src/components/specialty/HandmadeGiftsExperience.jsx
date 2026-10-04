import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HandmadeGiftsPage from '../handmade-gifts/HandmadeGiftsPage';
import HandmadeGiftProductDetailView from '../handmade-gifts/HandmadeGiftProductDetailView';
import CustomGiftWizardPage from '../handmade-gifts/CustomGiftWizardPage';
import HandmadeGiftCategoryListingView from '../handmade-gifts/HandmadeGiftCategoryListingView';

export default function HandmadeGiftsExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout,
  serviceMode = 'buying',
  onSelectServiceMode,
  theme = 'light'
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const isProductDetail = pathname.startsWith('/handmade-gifts/product/');
  const isCustomizer = pathname === '/handmade-gifts/customize';
  const isCategoryListing = pathname.startsWith('/handmade-gifts/category/') || pathname === '/handmade-gifts/products';

  return (
    <div className="handmade-gifts-experience-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
      {toastMessage && (
        <div 
          className="hm-toast animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 99999,
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            color: '#FFFFFF',
            padding: '14px 22px',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid #FF1678',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <span style={{ color: '#FF1678' }}>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {isProductDetail && (
        <HandmadeGiftProductDetailView 
          showToast={showToast} 
          currentUser={currentUser} 
          onOpenAuthModal={onLoginRequired} 
        />
      )}

      {isCustomizer && (
        <CustomGiftWizardPage 
          currentUser={currentUser} 
          showToast={showToast} 
        />
      )}

      {isCategoryListing && (
        <HandmadeGiftCategoryListingView 
          showToast={showToast} 
        />
      )}

      {!isProductDetail && !isCustomizer && !isCategoryListing && (
        <HandmadeGiftsPage
          currentUser={currentUser}
          theme={theme}
          onAddToCart={onAddToCart}
          onDirectCheckout={onDirectCheckout}
          onLoginRequired={onLoginRequired}
        />
      )}
    </div>
  );
}
