import React, { useState, useEffect } from 'react';
import AdminLayout from './components/layout/AdminLayout';
import ToastNotification from './components/common/ToastNotification';

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

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('stitchbee_admin_theme') || 'light';
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
        return <AnalyticsView onExportReport={(name) => showToast(`Exported ${name}`, 'success')} />;
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
      >
        {renderActiveView()}
      </AdminLayout>

      {/* Global Action Toast Notification */}
      <ToastNotification toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
