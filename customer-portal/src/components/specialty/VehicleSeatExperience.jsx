import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VehicleSeatRestorePage from '../seats/VehicleSeatRestorePage';
import VehicleSeatShopPage from '../seats/VehicleSeatShopPage';
import VehicleSeatCustomWizardPage from '../seats/VehicleSeatCustomWizardPage';
import VehicleSeatProductDetailView from '../seats/VehicleSeatProductDetailView';
import VehicleSeatCategoryListingView from '../seats/VehicleSeatCategoryListingView';
import FlipkartProductDetailView from './FlipkartProductDetailView';
import { FEATURED_PRODUCTS, ALL_SEAT_PRODUCTS } from '../../utils/vehicleSeatShopStore';

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

      {/* Top Mode Switcher Bar (Shop & Create vs Repair & Restore) */}
      <div 
        className="v-top-mode-switcher"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '12px 20px',
          gap: '12px',
          background: theme === 'dark' ? '#0F172A' : '#F8FAFC',
          borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(8px)'
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (onSelectServiceMode) onSelectServiceMode('buying');
            setSubView(null);
            navigate('/vehicle-seats');
          }}
          style={{
            padding: '9px 24px',
            fontSize: '0.88rem',
            fontWeight: 700,
            borderRadius: '24px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            background: serviceMode === 'buying' ? 'linear-gradient(135deg, #E11D74 0%, #FF087A 100%)' : (theme === 'dark' ? '#1E293B' : '#FFFFFF'),
            color: serviceMode === 'buying' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#64748B'),
            boxShadow: serviceMode === 'buying' ? '0 4px 14px rgba(225, 29, 116, 0.35)' : '0 1px 3px rgba(0,0,0,0.05)',
            border: serviceMode === 'buying' ? 'none' : (theme === 'dark' ? '1px solid #334155' : '1px solid #CBD5E1')
          }}
        >
          <span>🛍️</span>
          <span>Shop & Create</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onSelectServiceMode) onSelectServiceMode('alteration');
            setSubView(null);
            navigate('/vehicle-seats/repair');
          }}
          style={{
            padding: '9px 24px',
            fontSize: '0.88rem',
            fontWeight: 700,
            borderRadius: '24px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            background: serviceMode === 'alteration' ? 'linear-gradient(135deg, #E11D74 0%, #FF087A 100%)' : (theme === 'dark' ? '#1E293B' : '#FFFFFF'),
            color: serviceMode === 'alteration' ? '#FFFFFF' : (theme === 'dark' ? '#94A3B8' : '#64748B'),
            boxShadow: serviceMode === 'alteration' ? '0 4px 14px rgba(225, 29, 116, 0.35)' : '0 1px 3px rgba(0,0,0,0.05)',
            border: serviceMode === 'alteration' ? 'none' : (theme === 'dark' ? '1px solid #334155' : '1px solid #CBD5E1')
          }}
        >
          <span>✂️</span>
          <span>Repair & Restore</span>
        </button>
      </div>

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

          {/* Subview 2: Dedicated Product Detail Page (Flipkart / Shoe-shop Style) */}
          {subView === 'product-detail' && (() => {
            const rawProd = (ALL_SEAT_PRODUCTS && ALL_SEAT_PRODUCTS.find(p => p.id === activeProductId)) || FEATURED_PRODUCTS.find(p => p.id === activeProductId) || FEATURED_PRODUCTS[0];
            const flipkartProduct = rawProd ? {
              ...rawProd,
              brand: 'StitchBee Automotive Atelier',
              categoryLabel: 'Vehicle Seat Covers',
              image: rawProd.img || rawProd.image,
              gallery: rawProd.gallery && rawProd.gallery.length > 0 ? rawProd.gallery : [rawProd.img || rawProd.image],
              colors: rawProd.swatches ? rawProd.swatches.map(s => s.name) : ['Onyx Black', 'Crimson Red', 'Saddle Brown', 'Cognac Tan'],
              sizes: ['Universal Factory Fit', 'Custom Tailored Fit'],
              isAssured: true,
              rating: rawProd.rating || 4.9,
              reviewsCount: rawProd.reviewsCount || 142,
              description: rawProd.description || 'Custom and ready-made seat covers engineered for extreme durability and luxurious riding comfort.'
            } : null;

            return (
              <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 24px' }}>
                <FlipkartProductDetailView
                  product={flipkartProduct}
                  categoryTitle="Vehicle Seat Covers"
                  onBack={() => {
                    setSubView(null);
                    navigate('/vehicle-seats');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onAddToCart={(prod) => {
                    if (onAddToCart) onAddToCart(prod);
                    showToast(`Added ${prod.name || 'Seat Cover'} to Cart! 🛒`);
                  }}
                  onBuyNow={(prod) => {
                    if (onDirectCheckout) {
                      onDirectCheckout(prod);
                    } else if (onAddToCart) {
                      onAddToCart(prod);
                    }
                  }}
                  currentUser={currentUser}
                />
              </div>
            );
          })()}

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
