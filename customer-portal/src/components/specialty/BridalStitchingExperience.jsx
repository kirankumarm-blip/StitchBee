import React, { useState, useEffect } from 'react';
import BridalStitchingPage from '../bridal/BridalStitchingPage';
import BridalTailorWorkflowPage from '../bridal/BridalTailorWorkflowPage';
import BridalDesignerWorkflowPage from '../bridal/BridalDesignerWorkflowPage';
import BridalFabricsPage from '../bridal/BridalFabricsPage';

export default function BridalStitchingExperience({
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
  const [selectedCategory, setSelectedCategory] = useState('bridal-lehengas');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [targetGender, setTargetGender] = useState('couple');

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Handlers
  const handleNavigateToTailor = (catId = 'bridal-lehengas', style = null, fabric = null, gender = 'couple') => {
    setSelectedCategory(catId || 'bridal-lehengas');
    setSelectedStyle(style || null);
    if (fabric) setSelectedFabric(fabric);
    if (gender) setTargetGender(gender);
    setActiveView('tailor');
  };

  const handleNavigateToDesigner = (catId = 'custom-bridal', gender = 'couple') => {
    setSelectedCategory(catId || 'custom-bridal');
    if (gender) setTargetGender(gender);
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
    <div className={`bridal-stitching-experience-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {activeView === 'landing' && (
        <BridalStitchingPage
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
        <BridalTailorWorkflowPage
          currentUser={currentUser}
          theme={theme}
          initialCategory={selectedCategory}
          initialStyle={selectedStyle}
          initialFabric={selectedFabric}
          initialGender={targetGender}
          onBack={handleBackToLanding}
          showToast={showToast}
        />
      )}

      {activeView === 'designer' && (
        <BridalDesignerWorkflowPage
          currentUser={currentUser}
          theme={theme}
          initialCategory={selectedCategory}
          initialGender={targetGender}
          onBack={handleBackToLanding}
          showToast={showToast}
        />
      )}

      {activeView === 'fabrics' && (
        <BridalFabricsPage
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
