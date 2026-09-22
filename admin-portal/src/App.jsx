import React, { useState, useEffect } from 'react';
import AdminLayout from './components/layout/AdminLayout';
import ToastNotification from './components/common/ToastNotification';
import AdminLogin from './components/auth/AdminLogin';

// Import All 20 Platform Views
import DashboardView from './components/views/DashboardView';
import OrdersView from './components/views/OrdersView';
import TailorsView from './components/views/TailorsView';
import TailorVerificationView from './components/views/TailorVerificationView';
import DeliveryPartnersView from './components/views/DeliveryPartnersView';
import DeliveryVerificationView from './components/views/DeliveryVerificationView';
import DesignersView from './components/views/DesignersView';
import DesignerVerificationView from './components/views/DesignerVerificationView';
import CustomersView from './components/views/CustomersView';
import StitchingFailuresView from './components/views/StitchingFailuresView';
import BulkOrdersView from './components/views/BulkOrdersView';
import VehicleSeatCoversView from './components/views/VehicleSeatCoversView';
import PaymentsView from './components/views/PaymentsView';
import RevenueAnalyticsView from './components/views/RevenueAnalyticsView';
import AnalyticsView from './components/views/AnalyticsView';
import ReviewsView from './components/views/ReviewsView';
import ComplaintsView from './components/views/ComplaintsView';
import CatalogView from './components/views/CatalogView';
import ReportsView from './components/views/ReportsView';
import SettingsView from './components/views/SettingsView';

// Error Boundary to prevent any single module from breaking the admin shell
class ViewErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Module Error Boundary caught:', error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTab !== this.props.activeTab && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="sb-card" style={{ padding: '36px', textAlign: 'center', margin: '20px 0' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--sb-status-failed-bg)', color: 'var(--sb-status-failed)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', fontSize: '1.25rem', fontWeight: 800 }}>
            !
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--sb-text-title)', marginBottom: '8px' }}>
            Unable to display {this.props.activeTab?.replace('-', ' ')}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', maxWidth: '420px', margin: '0 auto 20px auto' }}>
            {this.state.error?.message || 'An unexpected rendering error occurred. You can safely retry or switch to another section.'}
          </p>
          <button
            type="button"
            className="sb-btn sb-btn-primary"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Retry Module
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('stitchbee_admin_theme') || 'light';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('stitchbee_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [toast, setToast] = useState(null);

  // Apply theme to document body and sync with localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('stitchbee_admin_theme', theme);
  }, [theme]);

  // Global Toast Helper
  const showToast = (message, type = 'success', title = '') => {
    setToast({
      id: Date.now(),
      message,
      type,
      title: title || (type === 'success' ? 'Success' : type === 'error' ? 'Action Failed' : 'Notice')
    });
  };

  const handleLoginSuccess = (adminUser) => {
    setCurrentUser(adminUser);
    localStorage.setItem('stitchbee_admin_session', JSON.stringify(adminUser));
    showToast(`Welcome back, ${adminUser.name}! Signed in as ${adminUser.role}.`, 'success', 'Session Authenticated');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('stitchbee_admin_session');
    showToast('You have been securely signed out of your admin session.', 'info', 'Signed Out');
  };

  // Render view based on active sidebar tab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigateTab={setActiveTab} />;
      case 'orders':
        return <OrdersView onShowToast={showToast} />;
      case 'deliveries':
        return <DeliveryPartnersView onShowToast={showToast} onNavigateTab={setActiveTab} />;
      case 'stitching':
        return <OrdersView onShowToast={showToast} />;
      case 'bulk-orders':
        return <BulkOrdersView onShowToast={showToast} />;
      case 'vehicle-seats':
        return <VehicleSeatCoversView onShowToast={showToast} />;
      case 'customers':
        return <CustomersView onShowToast={showToast} />;
      case 'tailors':
        return <TailorsView onNavigateTab={setActiveTab} onShowToast={showToast} />;
      case 'delivery-partners':
        return <DeliveryPartnersView onShowToast={showToast} onNavigateTab={setActiveTab} />;
      case 'designers':
        return <DesignersView onNavigateTab={setActiveTab} onShowToast={showToast} />;
      case 'tailor-verification':
        return <TailorVerificationView onShowToast={showToast} />;
      case 'delivery-verification':
        return <DeliveryVerificationView onShowToast={showToast} />;
      case 'designer-verification':
        return <DesignerVerificationView onShowToast={showToast} />;
      case 'payments':
        return <PaymentsView onShowToast={showToast} />;
      case 'revenue-analytics':
        return <RevenueAnalyticsView onNavigateTab={setActiveTab} />;
      case 'analytics-sales':
      case 'analytics-partners':
      case 'analytics-locations':
      case 'analytics':
        return <AnalyticsView initialTab={activeTab} onExportReport={(name) => showToast(`Exported ${name}`, 'success')} />;
      case 'stitching-failures':
        return <StitchingFailuresView onShowToast={showToast} />;
      case 'complaints':
        return <ComplaintsView showToast={showToast} />;
      case 'reviews':
        return <ReviewsView showToast={showToast} />;
      case 'catalog-categories':
      case 'catalog':
        return <CatalogView showToast={showToast} />;
      case 'reports':
        return <ReportsView showToast={showToast} />;
      case 'settings':
        return <SettingsView showToast={showToast} />;
      default:
        return <DashboardView onNavigateTab={setActiveTab} />;
    }
  };

  if (!currentUser) {
    return (
      <>
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          theme={theme}
          setTheme={setTheme}
        />
        <ToastNotification toast={toast} onDismiss={() => setToast(null)} />
      </>
    );
  }

  return (
    <>
      <AdminLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        onSelectSearchResult={(tab) => {
          setActiveTab(tab);
          showToast(`Navigated to ${tab.replace('-', ' ')}`, 'info');
        }}
        onLogout={handleLogout}
        user={currentUser}
      >
        <ViewErrorBoundary activeTab={activeTab}>
          {renderActiveView()}
        </ViewErrorBoundary>
      </AdminLayout>

      {/* Global Action Toast Notification */}
      <ToastNotification toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
