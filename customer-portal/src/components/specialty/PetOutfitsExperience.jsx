import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PetOutfitsPage from '../pets/PetOutfitsPage';
import PetProductDetailView from '../pets/PetProductDetailView';
import PetCustomWizardPage from '../pets/PetCustomWizardPage';
import PetCategoryListingView from '../pets/PetCategoryListingView';

export default function PetOutfitsExperience({
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

  const isProductDetail = pathname.startsWith('/pet-outfits/product/') || pathname.startsWith('/pets/product/');
  const isCustomizer = pathname === '/pet-outfits/customize' || pathname === '/pets/customize';
  const isCategoryListing = pathname.startsWith('/pet-outfits/category/') || pathname === '/pet-outfits/products' || pathname.startsWith('/pets/category/');

  return (
    <div className="pet-outfits-experience-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
      {toastMessage && (
        <div 
          className="pet-toast"
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 99999,
            background: 'linear-gradient(135deg, #14213D 0%, #0F172A 100%)',
            color: '#FFFFFF',
            padding: '14px 22px',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid #FF1684',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <span style={{ color: '#FF1684' }}>🐾</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {isProductDetail && (
        <PetProductDetailView 
          showToast={showToast} 
          currentUser={currentUser} 
          onOpenAuthModal={onLoginRequired} 
        />
      )}

      {isCustomizer && (
        <PetCustomWizardPage 
          currentUser={currentUser} 
          showToast={showToast} 
        />
      )}

      {isCategoryListing && (
        <PetCategoryListingView 
          showToast={showToast} 
        />
      )}

      {!isProductDetail && !isCustomizer && !isCategoryListing && (
        <PetOutfitsPage
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
