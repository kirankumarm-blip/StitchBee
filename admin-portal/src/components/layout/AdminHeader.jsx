import React from 'react';
import { Menu, Search, Sun, Moon, ChevronRight } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

export default function AdminHeader({
  activeTab,
  onNavigateTab,
  theme,
  setTheme,
  onOpenSearch,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen
}) {
  // Map active tab to human readable breadcrumb
  const pageTitles = {
    'dashboard': 'Executive Dashboard',
    'orders': 'Orders Management',
    'deliveries': 'Delivery Operations',
    'stitching': 'Stitching & Production',
    'bulk-orders': 'Bulk & Institution Orders',
    'vehicle-seats': 'Vehicle Seat Covers',
    'customers': 'Customer Directory',
    'tailors': 'Tailor Directory',
    'delivery-partners': 'Delivery Partners',
    'designers': 'Designer Atelier Directory',
    'tailor-verification': 'Tailor Verification Queue',
    'delivery-verification': 'Delivery Partner Verification',
    'designer-verification': 'Designer Verification',
    'payments': 'Payments & Gateways',
    'revenue-analytics': 'Revenue Analytics & Payouts',
    'analytics-sales': 'Sales & Order Analytics',
    'analytics-partners': 'Partner Performance Analytics',
    'analytics-locations': 'Location & Regional Analytics',
    'stitching-failures': 'Stitching Failures & Quality Rework',
    'complaints': 'Customer Complaints & Disputes',
    'reviews': 'Reviews & Ratings Moderation',
    'catalog-categories': 'Categories & Service Catalog',
    'reports': 'Custom Reports Generator',
    'settings': 'Admin Roles & Platform Settings'
  };

  const currentTitle = pageTitles[activeTab] || 'Dashboard';

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
    localStorage.setItem('stitchbee_admin_theme', nextTheme);
  };

  return (
    <header style={{
      height: 'var(--sb-header-height)',
      backgroundColor: 'var(--sb-bg-header)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--sb-border-default)',
      position: 'sticky',
      top: 0,
      zIndex: 900,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      gap: '16px'
    }}>
      {/* Left side: Sidebar Toggle, Breadcrumbs & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="sb-btn sb-btn-ghost sb-mobile-menu-btn"
          style={{ padding: '6px', borderRadius: 'var(--sb-radius-md)' }}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Collapse Trigger */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="sb-btn sb-btn-ghost sb-desktop-collapse-btn"
          style={{ padding: '6px', borderRadius: 'var(--sb-radius-md)', color: 'var(--sb-text-muted)' }}
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <Menu size={18} />
        </button>

        {/* Breadcrumb Navigation */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>
            <span>StitchBee</span>
            <ChevronRight size={12} />
            <span style={{ textTransform: 'capitalize' }}>
              {activeTab.split('-')[0]}
            </span>
          </div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--sb-text-title)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Right side: Search, Notifications, Theme Toggle, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Search Bar / Trigger */}
        <button
          onClick={onOpenSearch}
          className="sb-btn sb-btn-secondary sb-btn-sm"
          style={{
            height: '36px',
            padding: '0 12px',
            color: 'var(--sb-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          title="Search anything (Ctrl+K)"
        >
          <Search size={15} color="var(--sb-primary)" />
          <span style={{ fontSize: '0.8rem', display: 'none' }} className="sb-header-search-label">
            Search platform...
          </span>
          <kbd style={{
            fontSize: '0.68rem',
            background: 'var(--sb-bg-surface-subtle)',
            padding: '1px 5px',
            borderRadius: '4px',
            border: '1px solid var(--sb-border-default)',
            color: 'var(--sb-text-muted)'
          }}>
            ⌘K
          </kbd>
        </button>

        {/* Real-time Notifications Dropdown */}
        <NotificationDropdown onNavigateTab={onNavigateTab} />

        {/* Theme Toggle (Light / Dark) */}
        <button
          onClick={toggleTheme}
          className="sb-btn sb-btn-ghost"
          style={{
            width: '38px',
            height: '38px',
            padding: 0,
            borderRadius: 'var(--sb-radius-md)',
            color: theme === 'dark' ? 'var(--sb-accent)' : 'var(--sb-text-title)'
          }}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--sb-border-default)' }} />

        {/* Admin User Profile Dropdown */}
        <ProfileDropdown onNavigateTab={onNavigateTab} />
      </div>

      <style>{`
        .sb-mobile-menu-btn { display: none; }
        .sb-desktop-collapse-btn { display: flex; }
        @media (max-width: 900px) {
          .sb-mobile-menu-btn { display: flex !important; }
          .sb-desktop-collapse-btn { display: none !important; }
        }
        @media (min-width: 768px) {
          .sb-header-search-label { display: inline !important; }
        }
      `}</style>
    </header>
  );
}
