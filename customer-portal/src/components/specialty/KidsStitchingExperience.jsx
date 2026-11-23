import React, { useState, useEffect } from 'react';
import KidsStitchingPage from '../kids/KidsStitchingPage';
import KidsTailorWorkflowPage from '../kids/KidsTailorWorkflowPage';
import KidsDesignerWorkflowPage from '../kids/KidsDesignerWorkflowPage';

export default function KidsStitchingExperience({
  currentUser,
  onLoginRequired,
  onNavigateHome,
  tailors = [],
  theme = 'light',
  setTheme,
  onSwitchToShop
}) {
  // Parse initial state from window.location
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return { view: 'landing', category: 'frocks-dresses', age: 'little-kids' };
    }
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category') || 'frocks-dresses';
    const ageParam = params.get('age') || 'little-kids';
    const serviceParam = params.get('service');

    if (path.includes('/designer') || serviceParam === 'designer') {
      return { view: 'designer', category: catParam, age: ageParam };
    }
    if (path.includes('/tailor') || path.includes('/start') || serviceParam === 'tailor') {
      return { view: 'tailor', category: catParam, age: ageParam };
    }
    return { view: 'landing', category: catParam, age: ageParam };
  };

  const [activeView, setActiveView] = useState(() => getInitialState().view);
  const [selectedCategory, setSelectedCategory] = useState(() => getInitialState().category);
  const [selectedAge, setSelectedAge] = useState(() => getInitialState().age);

  // Sync state on popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      const state = getInitialState();
      setActiveView(state.view);
      setSelectedCategory(state.category);
      setSelectedAge(state.age);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view, category = selectedCategory, age = selectedAge) => {
    setSelectedCategory(category);
    setSelectedAge(age);
    setActiveView(view);

    let newUrl = '/kids-stitching';
    if (view === 'tailor') {
      newUrl = `/kids-stitching/tailor?category=${encodeURIComponent(category)}&age=${encodeURIComponent(age)}`;
    } else if (view === 'designer') {
      newUrl = `/kids-stitching/designer?category=${encodeURIComponent(category)}&age=${encodeURIComponent(age)}`;
    }

    if (typeof window !== 'undefined' && window.location.pathname + window.location.search !== newUrl) {
      window.history.pushState({ view, category, age }, '', newUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`kids-stitching-experience-root ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {activeView === 'landing' && (
        <KidsStitchingPage
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          theme={theme}
          onSwitchToShop={onSwitchToShop}
          onStartTailorWorkflow={(opts) => {
            const cat = opts?.category || selectedCategory || 'frocks-dresses';
            const ag = opts?.ageGroup || selectedAge || 'little-kids';
            navigateTo('tailor', cat, ag);
          }}
          onStartDesignerWorkflow={(opts) => {
            const cat = opts?.category || selectedCategory || 'custom-design';
            const ag = opts?.ageGroup || selectedAge || 'little-kids';
            navigateTo('designer', cat, ag);
          }}
          onSelectCategory={(catId) => {
            if (catId === 'custom-design') {
              navigateTo('designer', catId, selectedAge);
            } else {
              navigateTo('tailor', catId, selectedAge);
            }
          }}
          onSelectAgeGroup={(ageId) => {
            navigateTo('tailor', selectedCategory, ageId);
          }}
        />
      )}

      {activeView === 'tailor' && (
        <KidsTailorWorkflowPage
          initialCategory={selectedCategory}
          initialAge={selectedAge}
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          theme={theme}
          onBackToLanding={() => navigateTo('landing')}
        />
      )}

      {activeView === 'designer' && (
        <KidsDesignerWorkflowPage
          initialCategory={selectedCategory}
          initialAge={selectedAge}
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          theme={theme}
          onBackToLanding={() => navigateTo('landing')}
        />
      )}
    </div>
  );
}
