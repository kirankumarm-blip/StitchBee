import React, { useState, useEffect } from 'react';
import MenStitchingPage from '../men/MenStitchingPage';
import MenTailorWorkflowPage from '../men/MenTailorWorkflowPage';
import MenDesignerWorkflowPage from '../men/MenDesignerWorkflowPage';
import MenFabricsPage from '../men/MenFabricsPage';

export default function MenStitchingExperience({
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
  const [selectedCategory, setSelectedCategory] = useState('suits-blazers');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState(null);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Handlers
  const handleNavigateToTailor = (catId = 'suits-blazers', style = null, fabric = null) => {
    setSelectedCategory(catId || 'suits-blazers');
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
    <div className={`men-stitching-experience-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {activeView === 'landing' && (
        <MenStitchingPage
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
        <MenTailorWorkflowPage
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
        <MenDesignerWorkflowPage
          currentUser={currentUser}
          theme={theme}
          initialCategory={selectedCategory}
          onBack={handleBackToLanding}
          showToast={showToast}
        />
      )}

      {activeView === 'fabrics' && (
        <MenFabricsPage
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
