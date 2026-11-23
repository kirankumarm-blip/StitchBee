import React, { useState, useEffect } from 'react';
import WomenStitchingPage from '../women/WomenStitchingPage';
import WomenTailorWorkflowPage from '../women/WomenTailorWorkflowPage';
import WomenDesignerWorkflowPage from '../women/WomenDesignerWorkflowPage';
import WomenFabricsPage from '../women/WomenFabricsPage';

export default function WomenStitchingExperience({
  currentUser,
  onLoginRequired,
  onNavigateHome,
  tailors = [],
  theme = 'light',
  setTheme,
  showToast = () => {}
}) {
  // Navigation view: 'landing' | 'tailor' | 'designer' | 'fabrics'
  const [activeView, setActiveView] = useState('landing');
  const [selectedCategory, setSelectedCategory] = useState('sarees');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState(null);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Handlers
  const handleNavigateToTailor = (catId = 'sarees', style = null, fabric = null) => {
    setSelectedCategory(catId || 'sarees');
    setSelectedStyle(style || null);
    if (fabric) setSelectedFabric(fabric);
    setActiveView('tailor');
  };

  const handleNavigateToDesigner = (catId = 'custom-design') => {
    setSelectedCategory(catId || 'custom-design');
    setActiveView('designer');
  };

  const handleNavigateToFabrics = () => {
    setActiveView('fabrics');
  };

  const handleBackToLanding = () => {
    setActiveView('landing');
  };

  const handleFabricSelectedForTailoring = (fabric) => {
    setSelectedFabric(fabric);
    setActiveView('tailor');
  };

  return (
    <div className={`women-stitching-experience-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {activeView === 'landing' && (
        <WomenStitchingPage
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          theme={theme}
          onNavigateHome={onNavigateHome}
          showToast={showToast}
          onNavigateToTailor={handleNavigateToTailor}
          onNavigateToDesigner={handleNavigateToDesigner}
          onNavigateToFabrics={handleNavigateToFabrics}
        />
      )}

      {activeView === 'tailor' && (
        <WomenTailorWorkflowPage
          currentUser={currentUser}
          theme={theme}
          initialCategory={selectedCategory}
          initialStyle={selectedStyle}
          initialFabric={selectedFabric}
          onBack={handleBackToLanding}
          showToast={showToast}
        />
      )}

      {activeView === 'designer' && (
        <WomenDesignerWorkflowPage
          currentUser={currentUser}
          theme={theme}
          initialCategory={selectedCategory}
          onBack={handleBackToLanding}
          showToast={showToast}
        />
      )}

      {activeView === 'fabrics' && (
        <WomenFabricsPage
          currentUser={currentUser}
          theme={theme}
          onBack={handleBackToLanding}
          onSelectFabricForTailoring={handleFabricSelectedForTailoring}
          showToast={showToast}
        />
      )}
    </div>
  );
}
