import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VehicleSeatRestorePage from '../seats/VehicleSeatRestorePage';
import VehicleSeatShopPage from '../seats/VehicleSeatShopPage';
import VehicleSeatCustomWizardPage from '../seats/VehicleSeatCustomWizardPage';
import VehicleSeatProductDetailView from '../seats/VehicleSeatProductDetailView';
import VehicleSeatCategoryListingView from '../seats/VehicleSeatCategoryListingView';

export default function VehicleSeatExperience({
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
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [toastMessage, setToastMessage] = useState(null);

  // Subview states for smooth client routing
  const [subView, setSubView] = useState(null); // 'custom-design' | 'product-detail' | 'category-listing' | null
  const [activeProductId, setActiveProductId] = useState(null);

  // Sync pathname to serviceMode & subviews
  useEffect(() => {
    if (
      pathname === '/vehicle-seats/repair' || 
      pathname === '/vehicle-seats/restore' || 
      pathname === '/seats/repair' || 
      pathname === '/seats/restore' || 
      pathname.startsWith('/vehicle-seats/repair') || 
      pathname.startsWith('/seats/repair') ||
      pathname.startsWith('/vehicle-seat-covers/repair')
    ) {
      if (onSelectServiceMode && serviceMode !== 'alteration') {
        onSelectServiceMode('alteration');
      }
      setSubView(null);
    } else if (
      pathname === '/vehicle-seats/custom-design' || 
      pathname === '/vehicle-seat-covers/custom-design' || 
      pathname === '/seats/custom-design'
    ) {
      if (onSelectServiceMode && serviceMode === 'alteration') {
        onSelectServiceMode('buying');
      }
      setSubView('custom-design');
    } else if (
      pathname.includes('/product/') || 
      pathname.startsWith('/vehicle-seats/product') || 
      pathname.startsWith('/vehicle-seat-covers/product')
    ) {
      const parts = pathname.split('/product/');
      if (parts[1]) {
        setActiveProductId(parts[1]);
        setSubView('product-detail');
      }
      if (onSelectServiceMode && serviceMode === 'alteration') {
        onSelectServiceMode('buying');
      }
    } else if (
      pathname.startsWith('/vehicle-seats/category/') || 
      pathname.startsWith('/vehicle-seat-covers/category/') || 
      pathname === '/vehicle-seats/products' || 
      pathname === '/vehicle-seat-covers/products'
    ) {
      if (onSelectServiceMode && serviceMode === 'alteration') {
        onSelectServiceMode('buying');
      }
      setSubView('category-listing');
    } else {
      if (onSelectServiceMode && serviceMode === 'alteration') {
        onSelectServiceMode('buying');
      }
      setSubView(null);
    }
  }, [pathname]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className={`vehicle-experience animate-fade-in ${theme === 'dark' ? 'dark' : ''}`} style={{ width: '100%', minHeight: '100vh' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className="vehicle-floating-toast animate-slide-up"
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
            border: '1px solid #FF087A',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <span style={{ color: '#FF087A' }}>🚗</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ALTERATION & REPAIR SERVICES MODE */}
      {serviceMode === 'alteration' && (
        <VehicleSeatRestorePage
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          onAddToCart={onAddToCart}
          onDirectCheckout={onDirectCheckout}
          theme={theme}
          showToast={showToast}
          onNavigateShop={() => {
            if (onSelectServiceMode) onSelectServiceMode('buying');
            navigate('/vehicle-seats');
          }}
        />
      )}

      {/* BUYING MODE: SHOP & CREATE */}
      {serviceMode === 'buying' && (
        <>
          {/* Subview 1: Dedicated Custom Seat Cover Designer Page */}
          {subView === 'custom-design' && (
            <VehicleSeatCustomWizardPage
              currentUser={currentUser}
              onLoginRequired={onLoginRequired}
              onAddToCart={onAddToCart}
              onDirectCheckout={onDirectCheckout}
              onBack={() => {
                setSubView(null);
                navigate('/vehicle-seats');
              }}
              theme={theme}
              showToast={showToast}
            />
          )}

          {/* Subview 2: Dedicated Product Detail Page */}
          {subView === 'product-detail' && (
            <VehicleSeatProductDetailView
              productId={activeProductId}
              currentUser={currentUser}
              onAddToCart={onAddToCart}
              onDirectCheckout={onDirectCheckout}
              onBack={() => {
                setSubView(null);
                navigate('/vehicle-seats');
              }}
              theme={theme}
              showToast={showToast}
            />
          )}

          {/* Subview 3: Dedicated Category Listing View (All Products or Filtered by Category) */}
          {subView === 'category-listing' && (
            <VehicleSeatCategoryListingView
              showToast={showToast}
              onAddToCart={onAddToCart}
              onDirectCheckout={onDirectCheckout}
              onNavigateProduct={(prodId) => {
                setActiveProductId(prodId);
                setSubView('product-detail');
                navigate(`/vehicle-seat-covers/product/${prodId}`);
              }}
              onNavigateCustomDesign={() => {
                setSubView('custom-design');
                navigate('/vehicle-seat-covers/custom-design');
              }}
              onBack={() => {
                setSubView(null);
                navigate('/vehicle-seats');
              }}
              theme={theme}
            />
          )}

          {/* Main Landing View: Shop & Create Page (Exact 10 Sections matching Screenshot) */}
          {!subView && (
            <VehicleSeatShopPage
              currentUser={currentUser}
              onLoginRequired={onLoginRequired}
              onAddToCart={onAddToCart}
              onDirectCheckout={onDirectCheckout}
              onNavigateCategory={(catId) => {
                setSubView('category-listing');
                if (catId === 'all') {
                  navigate('/vehicle-seat-covers/products');
                } else {
                  navigate(`/vehicle-seat-covers/category/${catId}`);
                }
              }}
              onNavigateCustomDesign={() => {
                setSubView('custom-design');
                navigate('/vehicle-seat-covers/custom-design');
              }}
              onNavigateProductDetail={(prodId) => {
                setActiveProductId(prodId);
                setSubView('product-detail');
                navigate(`/vehicle-seat-covers/product/${prodId}`);
              }}
              onNavigateRepairRestore={() => {
                if (onSelectServiceMode) onSelectServiceMode('alteration');
                navigate('/vehicle-seats/repair');
              }}
              theme={theme}
              showToast={showToast}
            />
          )}
        </>
      )}

    </div>
  );
}
