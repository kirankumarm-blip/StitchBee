import React, { useState } from 'react';
import StitchBeeSidebar from './StitchBeeSidebar';
import AdminHeader from './AdminHeader';
import GlobalSearchModal from './GlobalSearchModal';

export default function AdminLayout({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  children,
  onSelectSearchResult,
  onLogout,
  user
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div className="sb-admin-layout">
      {/* Sidebar Navigation */}
      <StitchBeeSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="sb-admin-main">
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          onNavigateTab={setActiveTab}
          theme={theme}
          setTheme={setTheme}
          onOpenSearch={() => setSearchModalOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          onLogout={onLogout}
          user={user}
        />

        {/* Dynamic View Content */}
        <main className="sb-admin-content sb-animate-fade">
          {children}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={(tab, entity) => {
          setActiveTab(tab);
          if (onSelectSearchResult) onSelectSearchResult(tab, entity);
        }}
      />
    </div>
  );
}
