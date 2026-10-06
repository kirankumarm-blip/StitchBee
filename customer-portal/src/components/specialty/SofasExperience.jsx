import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Armchair, Wrench, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import SofasShopPage from '../sofas/SofasShopPage';
import SofaProductDetailView from '../sofas/SofaProductDetailView';
import SofaCustomWizardPage from '../sofas/SofaCustomWizardPage';
import SofaCategoryListingView from '../sofas/SofaCategoryListingView';
import SofaRestorePage from '../sofas/SofaRestorePage';
import BeforeAfterSlider from './BeforeAfterSlider';
import SpecialistMapDiscovery from './SpecialistMapDiscovery';

export default function SofasExperience({
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

  // Sync pathname to serviceMode
  useEffect(() => {
    if (pathname === '/sofas/repair' || pathname === '/sofas/restore' || pathname.startsWith('/sofas/repair') || pathname.startsWith('/sofas/restore')) {
      if (onSelectServiceMode && serviceMode !== 'alteration') {
        onSelectServiceMode('alteration');
      }
    } else if (pathname === '/sofas' || pathname.startsWith('/sofas/product') || pathname.startsWith('/sofas/category') || pathname === '/sofas/customize') {
      if (onSelectServiceMode && serviceMode === 'alteration') {
        onSelectServiceMode('buying');
      }
    }
  }, [pathname]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const isProductDetail = pathname.startsWith('/sofas/product/') || pathname.startsWith('/sofa/product/');
  const isCustomizer = pathname === '/sofas/customize' || pathname === '/sofa/customize';
  const isCategoryListing = pathname.startsWith('/sofas/category/') || pathname === '/sofas/products' || pathname.startsWith('/sofa/category/');

  return (
    <div className={`sofas-experience-wrapper ${theme === 'dark' ? 'dark' : ''}`} style={{ width: '100%', minHeight: '100vh' }}>
      
      {/* Top Category Mode Switcher Bar (Shop & Create vs Repair & Restore) */}
      <div style={{ 
        width: '100%', 
        borderBottom: '1px solid var(--sofa-border)', 
        background: 'var(--sofa-card-bg)', 
        padding: '12px 48px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxSizing: 'border-box',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => {
              if (onSelectServiceMode) onSelectServiceMode('buying');
              navigate('/sofas');
            }}
            style={{
              padding: '8px 20px',
              borderRadius: '24px',
              border: serviceMode === 'buying' ? '2px solid #E11D74' : '1px solid var(--sofa-border)',
              background: serviceMode === 'buying' ? '#FCE7F3' : 'transparent',
              color: serviceMode === 'buying' ? '#E11D74' : 'inherit',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Armchair size={16} />
            <span>Shop & Create</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onSelectServiceMode) onSelectServiceMode('alteration');
              navigate('/sofas/repair');
            }}
            style={{
              padding: '8px 20px',
              borderRadius: '24px',
              border: serviceMode === 'alteration' ? '2px solid #E11D74' : '1px solid var(--sofa-border)',
              background: serviceMode === 'alteration' ? '#FCE7F3' : 'transparent',
              color: serviceMode === 'alteration' ? '#E11D74' : 'inherit',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Wrench size={16} />
            <span>Repair & Restore</span>
          </button>
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--sofa-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#E11D74" />
          <span>StitchBee Sofa Atelier • Handcrafted & Reupholstered in Bengaluru</span>
        </div>
      </div>
      {toastMessage && (
        <div 
          className="sofa-floating-toast animate-slide-up"
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
            border: '1px solid #E11D74',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <span style={{ color: '#E11D74' }}>🛋️</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ALTERATION & REPAIR SERVICES MODE */}
      {serviceMode === 'alteration' && (
        <SofaRestorePage
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          onAddToCart={onAddToCart}
          onDirectCheckout={onDirectCheckout}
          theme={theme}
          showToast={showToast}
          onNavigateShop={() => {
            if (onSelectServiceMode) onSelectServiceMode('buying');
            navigate('/sofas');
          }}
        />
      )}

      {/* SPECIALIST PARTNER SELECTION MODE */}
      {serviceMode === 'partner' && (
        <SpecialistMapDiscovery
          specialtyCategory="sofas"
          categoryTitle="Sofa & Furniture Upholstery"
          tailors={tailors}
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          onSelectTailorForBooking={(tailor) => {
            if (onAddToCart) {
              onAddToCart({
                id: `booking-${tailor.id}-${Date.now()}`,
                name: `Sofa Swatch Visit by ${tailor.name}`,
                price: 299,
                image: tailor.image,
                itemType: 'alteration'
              });
              showToast(`Booked doorstep visit with ${tailor.name}`);
            }
          }}
        />
      )}

      {/* BUYING MODE (SHOP & CREATE EXPERIENCE) */}
      {serviceMode === 'buying' && (
        <>
          {isProductDetail && (
            <SofaProductDetailView
              showToast={showToast}
              currentUser={currentUser}
              onOpenAuthModal={onLoginRequired}
              onAddToCart={onAddToCart}
              onDirectCheckout={onDirectCheckout}
              onBack={() => navigate('/sofas')}
            />
          )}

          {isCustomizer && (
            <SofaCustomWizardPage
              currentUser={currentUser}
              showToast={showToast}
              onAddToCart={onAddToCart}
            />
          )}

          {isCategoryListing && (
            <SofaCategoryListingView
              showToast={showToast}
              onAddToCart={onAddToCart}
              onNavigateProduct={(id) => navigate(`/sofas/product/${id}`)}
            />
          )}

          {!isProductDetail && !isCustomizer && !isCategoryListing && (
            <SofasShopPage
              currentUser={currentUser}
              theme={theme}
              onAddToCart={onAddToCart}
              onDirectCheckout={onDirectCheckout}
              onLoginRequired={onLoginRequired}
              onNavigateCategory={(catId) => navigate(catId === 'all' ? '/sofas/products' : `/sofas/category/${catId}`)}
              onNavigateProduct={(prodId) => navigate(`/sofas/product/${prodId}`)}
              onNavigateCustomize={() => navigate('/sofas/customize')}
            />
          )}
        </>
      )}
    </div>
  );
}
