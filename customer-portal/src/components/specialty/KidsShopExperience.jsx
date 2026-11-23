import React, { useState, useEffect } from 'react';
import KidsShopPage from '../kids/KidsShopPage';
import KidsCustomDesignWorkflow from '../kids/KidsCustomDesignWorkflow';

export default function KidsShopExperience({
  currentUser,
  onLoginRequired,
  onNavigateHome,
  onAddToCart,
  theme = 'light',
  setTheme
}) {
  // Parse initial route / query params
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return { view: 'landing', initialStep: 1, initialFabric: null };
    }
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');

    if (path.includes('/create') || action === 'create' || path === '/kids-shop/create') {
      return { view: 'create', initialStep: 1, initialFabric: null };
    }
    return { view: 'landing', initialStep: 1, initialFabric: null };
  };

  const [activeView, setActiveView] = useState(() => getInitialState().view);
  const [workflowInitialStep, setWorkflowInitialStep] = useState(1);
  const [workflowInitialFabric, setWorkflowInitialFabric] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync state on popstate
  useEffect(() => {
    const handlePopState = () => {
      const state = getInitialState();
      setActiveView(state.view);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view, stepId = null, fabric = null) => {
    setActiveView(view);
    if (fabric) setWorkflowInitialFabric(fabric);

    let stepNum = 1;
    if (stepId === 'upload') stepNum = 1;
    else if (stepId === 'style-fabric') stepNum = 3;
    else if (stepId === 'measurements') stepNum = 4;
    else if (stepId === 'personalization') stepNum = 5;
    else if (stepId === 'quote') stepNum = 6;
    else if (stepId === 'delivery') stepNum = 6;
    setWorkflowInitialStep(stepNum);

    let newUrl = view === 'create' ? '/kids-shop/create' : '/kids/shop';
    if (typeof window !== 'undefined' && window.location.pathname !== newUrl) {
      window.history.pushState({ view, stepNum }, '', newUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`kids-shop-experience-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'var(--kids-pink, #FF008A)',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: '30px',
          fontSize: '0.9rem',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(255, 0, 138, 0.4)',
          zIndex: 9999,
          animation: 'kidsFadeIn 0.25s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {activeView === 'landing' && (
        <KidsShopPage
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          theme={theme}
          onAddToCart={onAddToCart}
          onOpenCustomWorkflow={(stepId, fabric) => navigateTo('create', stepId, fabric)}
          showToast={showToast}
        />
      )}

      {activeView === 'create' && (
        <KidsCustomDesignWorkflow
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          theme={theme}
          initialFabric={workflowInitialFabric}
          onBackToShop={() => navigateTo('landing')}
          showToast={showToast}
        />
      )}
    </div>
  );
}
