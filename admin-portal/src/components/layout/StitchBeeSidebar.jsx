import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Truck, Scissors, Layers, Car,
  Users, UserCheck, ShieldCheck, Sparkles, AlertTriangle, AlertCircle,
  IndianRupee, CreditCard, BarChart3, TrendingUp, Star, MessageSquare,
  Bookmark, FolderTree, Settings, FileText, ChevronDown, ChevronRight,
  Shield, X
} from 'lucide-react';

export default function StitchBeeSidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) {
  const [expandedSections, setExpandedSections] = useState({
    operations: true,
    users: true,
    verification: true,
    finance: true,
    analytics: false,
    quality: true,
    catalog: false,
    reports: false,
    settings: false
  });

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const navSections = [
    {
      type: 'single',
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      type: 'group',
      key: 'operations',
      label: 'Operations',
      items: [
        { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: '18.6K' },
        { id: 'deliveries', label: 'Deliveries', icon: Truck },
        { id: 'stitching', label: 'Stitching', icon: Scissors },
        { id: 'bulk-orders', label: 'Bulk Orders', icon: Layers, badge: 'New' },
        { id: 'vehicle-seats', label: 'Vehicle Seat Covers', icon: Car }
      ]
    },
    {
      type: 'group',
      key: 'users',
      label: 'Users',
      items: [
        { id: 'customers', label: 'Customers', icon: Users, badge: '24.8K' },
        { id: 'tailors', label: 'Tailors', icon: Scissors, badge: '1.2K' },
        { id: 'delivery-partners', label: 'Delivery Partners', icon: Truck, badge: '326' },
        { id: 'designers', label: 'Designers', icon: Sparkles, badge: '184' }
      ]
    },
    {
      type: 'group',
      key: 'verification',
      label: 'Verification',
      items: [
        { id: 'tailor-verification', label: 'Tailor Verification', icon: UserCheck, alertBadge: '24' },
        { id: 'delivery-verification', label: 'Delivery Verification', icon: ShieldCheck, alertBadge: '32' },
        { id: 'designer-verification', label: 'Designer Verification', icon: Sparkles, alertBadge: '16' }
      ]
    },
    {
      type: 'group',
      key: 'finance',
      label: 'Finance',
      items: [
        { id: 'payments', label: 'Payments', icon: IndianRupee },
        { id: 'revenue-analytics', label: 'Revenue & Payouts', icon: CreditCard }
      ]
    },
    {
      type: 'group',
      key: 'analytics',
      label: 'Analytics',
      items: [
        { id: 'analytics-sales', label: 'Sales & Orders', icon: TrendingUp },
        { id: 'analytics-partners', label: 'Partner Analytics', icon: BarChart3 },
        { id: 'analytics-locations', label: 'Location Analytics', icon: FolderTree }
      ]
    },
    {
      type: 'group',
      key: 'quality',
      label: 'Quality & Support',
      items: [
        { id: 'stitching-failures', label: 'Stitching Failures', icon: AlertTriangle, alertBadge: '4' },
        { id: 'complaints', label: 'Complaints & SLA', icon: AlertCircle, alertBadge: '6' },
        { id: 'reviews', label: 'Reviews & Ratings', icon: Star }
      ]
    },
    {
      type: 'group',
      key: 'catalog',
      label: 'Catalog',
      items: [
        { id: 'catalog-categories', label: 'Categories & Services', icon: Bookmark }
      ]
    },
    {
      type: 'group',
      key: 'reports',
      label: 'Reports',
      items: [
        { id: 'reports', label: 'Custom Reports', icon: FileText }
      ]
    },
    {
      type: 'group',
      key: 'settings',
      label: 'Settings',
      items: [
        { id: 'settings', label: 'Admin Users & Rules', icon: Settings }
      ]
    }
  ];

  const handleItemClick = (id) => {
    setActiveTab(id);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            zIndex: 998,
            backdropFilter: 'blur(2px)'
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        style={{
          width: collapsed ? 'var(--sb-sidebar-collapsed-width)' : 'var(--sb-sidebar-width)',
          backgroundColor: 'var(--sb-bg-sidebar)',
          borderRight: '1px solid var(--sb-border-default)',
          height: '100vh',
          position: 'sticky',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          transition: 'width var(--sb-transition-normal)',
          flexShrink: 0
        }}
        className={`sb-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Brand Header */}
        <div style={{
          height: 'var(--sb-header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '0 10px' : '0 20px',
          borderBottom: '1px solid var(--sb-border-default)',
          background: 'var(--sb-bg-sidebar)'
        }}>
          {!collapsed ? (
            <div 
              onClick={() => setActiveTab('dashboard')} 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <img 
                src="/logo.png" 
                alt="StitchBee" 
                style={{ height: '38px', objectFit: 'contain' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('logo-fallback-text');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="logo-fallback-text" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--sb-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  SB
                </div>
                <div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--sb-text-title)', letterSpacing: '-0.02em' }}>
                    Stitch<span style={{ color: 'var(--sb-accent)' }}>Bee</span>
                  </span>
                  <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sb-primary)', fontWeight: 700 }}>
                    Admin Portal
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => setCollapsed(false)}
              style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--sb-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, cursor: 'pointer' }}
              title="Expand Sidebar"
            >
              SB
            </div>
          )}

          {/* Close button for mobile drawer */}
          <button 
            className="mobile-close-btn"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'var(--sb-text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items (Scrollable) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: collapsed ? '12px 6px' : '12px 10px' }}>
          {navSections.map(section => {
            if (section.type === 'single') {
              const Icon = section.icon;
              const isActive = activeTab === section.id;

              return (
                <div
                  key={section.id}
                  onClick={() => handleItemClick(section.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: collapsed ? '10px 0' : '9px 12px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    borderRadius: 'var(--sb-radius-md)',
                    cursor: 'pointer',
                    background: isActive ? 'var(--sb-primary-light)' : 'transparent',
                    color: isActive ? 'var(--sb-primary)' : 'var(--sb-text-body)',
                    fontWeight: isActive ? 600 : 500,
                    marginBottom: '4px',
                    transition: 'all var(--sb-transition-fast)',
                    position: 'relative'
                  }}
                  title={collapsed ? section.label : undefined}
                >
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: collapsed ? '2px' : '0',
                      top: '6px',
                      bottom: '6px',
                      width: '3.5px',
                      borderRadius: '0 4px 4px 0',
                      background: 'var(--sb-primary)'
                    }} />
                  )}
                  <Icon size={18} style={{ color: isActive ? 'var(--sb-primary)' : 'inherit', flexShrink: 0 }} />
                  {!collapsed && <span style={{ fontSize: '0.85rem' }}>{section.label}</span>}
                </div>
              );
            }

            // Group section
            const isExpanded = expandedSections[section.key];

            return (
              <div key={section.key} style={{ marginBottom: '6px' }}>
                {!collapsed && (
                  <div
                    onClick={() => toggleSection(section.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px 4px 12px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--sb-text-muted)',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    <span>{section.label}</span>
                    {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </div>
                )}

                {(isExpanded || collapsed) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {section.items.map(item => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: collapsed ? 'center' : 'space-between',
                            padding: collapsed ? '10px 0' : '8px 12px',
                            borderRadius: 'var(--sb-radius-md)',
                            cursor: 'pointer',
                            background: isActive ? 'var(--sb-primary-light)' : 'transparent',
                            color: isActive ? 'var(--sb-primary)' : 'var(--sb-text-body)',
                            fontWeight: isActive ? 600 : 450,
                            transition: 'all var(--sb-transition-fast)',
                            position: 'relative'
                          }}
                          title={collapsed ? item.label : undefined}
                          onMouseEnter={e => {
                            if (!isActive) e.currentTarget.style.backgroundColor = 'var(--sb-bg-surface-hover)';
                          }}
                          onMouseLeave={e => {
                            if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                            {isActive && (
                              <div style={{
                                position: 'absolute',
                                left: collapsed ? '2px' : '0',
                                top: '6px',
                                bottom: '6px',
                                width: '3.5px',
                                borderRadius: '0 4px 4px 0',
                                background: 'var(--sb-primary)'
                              }} />
                            )}
                            <Icon size={17} style={{ color: isActive ? 'var(--sb-primary)' : 'inherit', flexShrink: 0 }} />
                            {!collapsed && (
                              <span style={{ fontSize: '0.84rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.label}
                              </span>
                            )}
                          </div>

                          {!collapsed && (
                            <div>
                              {item.alertBadge && (
                                <span style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                  background: 'var(--sb-accent-light)',
                                  color: 'var(--sb-accent)',
                                  border: '1px solid var(--sb-accent-border)',
                                  padding: '1px 6px',
                                  borderRadius: 'var(--sb-radius-full)'
                                }}>
                                  {item.alertBadge}
                                </span>
                              )}
                              {item.badge && (
                                <span style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 600,
                                  color: 'var(--sb-text-muted)',
                                  background: 'var(--sb-bg-surface-subtle)',
                                  padding: '1px 6px',
                                  borderRadius: 'var(--sb-radius-full)'
                                }}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Admin Status */}
        {!collapsed && (
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--sb-border-default)',
            background: 'var(--sb-bg-surface-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--sb-status-success)'
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--sb-text-title)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                System Operational
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)' }}>
                v2.4.0 • StitchBee HQ
              </div>
            </div>
          </div>
        )}
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .sb-sidebar {
            position: fixed !important;
            left: -280px;
            top: 0;
            bottom: 0;
            z-index: 1001;
            transition: left 0.25s ease !important;
            box-shadow: var(--sb-shadow-dropdown);
          }
          .sb-sidebar.mobile-open {
            left: 0 !important;
          }
          .mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
