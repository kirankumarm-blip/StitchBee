import React, { useState, useEffect } from 'react';
import { Search, Sliders, Plus, RotateCw, X, Check, Filter } from 'lucide-react';
import OrderStats from './OrderStats';
import OrderStatusDonut from './OrderStatusDonut';
import RealTimeOrderChart from './RealTimeOrderChart';
import OrderPerformanceChart from './OrderPerformanceChart';
import RevenueChart from './RevenueChart';
import OrderTable from './OrderTable';
import Pagination from './Pagination';
import OrderFilters from './OrderFilters';
import UpcomingDeliveries from './UpcomingDeliveries';
import LiveOrderActivity from './LiveOrderActivity';
import QuickActions from './QuickActions';

export default function OrdersPage({ theme, setActiveTab }) {
  // SINGLE SOURCE OF TRUTH ORDERS STATE
  const [orders, setOrders] = useState([
    { id: 'ORD-1024', customer: 'Priya Sharma', image: '/bridal 5.jpg', outfit: 'Bridal Lehenga', fabric: 'Net Fabric', date: '22 May 2026', daysLeft: '3 days left', progress: 65, status: 'In Progress', amount: 8500, createdDate: '2026-05-10' },
    { id: 'ORD-1023', customer: 'Amit Verma', image: '/men1.jpg', outfit: 'Sherwani', fabric: 'Silk Fabric', date: '25 May 2026', daysLeft: '6 days left', progress: 30, status: 'Stitching', amount: 12350, createdDate: '2026-05-12' },
    { id: 'ORD-1022', customer: 'Megha Reddy', image: '/bridal2.jpg', outfit: 'Anarkali Suit', fabric: 'Georgette', date: '28 May 2026', daysLeft: '9 days left', progress: 20, status: 'Cutting', amount: 6750, createdDate: '2026-05-14' },
    { id: 'ORD-1021', customer: 'Rahul Nair', image: '/men2.jpg', outfit: 'Formal Shirt', fabric: 'Cotton', date: '29 May 2026', daysLeft: '10 days left', progress: 0, status: 'Pending', amount: 2150, createdDate: '2026-05-15' },
    { id: 'ORD-1019', customer: 'Neha Singh', image: '/bridal 5.jpg', outfit: 'Saree Blouse', fabric: 'Silk', date: '31 May 2026', daysLeft: '12 days left', progress: 75, status: 'In Progress', amount: 1850, createdDate: '2026-05-08' },
    { id: 'ORD-1018', customer: 'Karan Johar', image: '/men2.jpg', outfit: 'Bandhgala Suit', fabric: 'Velvet', date: '15 May 2026', daysLeft: 'Completed', progress: 100, status: 'Completed', amount: 15000, createdDate: '2026-05-01' },
    { id: 'ORD-1017', customer: 'Sita Ram', image: '/bridal2.jpg', outfit: 'Salwar Kameez', fabric: 'Cotton silk', date: '10 May 2026', daysLeft: 'Completed', progress: 100, status: 'Completed', amount: 3200, createdDate: '2026-04-28' },
    { id: 'ORD-1016', customer: 'Vijay Devar', image: '/men1.jpg', outfit: 'Kurta Pyjama', fabric: 'Linen', date: '05 May 2026', daysLeft: 'Cancelled', progress: 0, status: 'Cancelled', amount: 2500, createdDate: '2026-04-25' }
  ]);

  // Controls & Filters State
  const [subTab, setSubTab] = useState('active'); // 'active' | 'new' | 'completed' | 'cancelled' | 'all'
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [fabricFilter, setFabricFilter] = useState('all');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState(null);
  
  // Real-time status states
  const [lastUpdatedSeconds, setLastUpdatedSeconds] = useState(4);
  const [realtimeTimeRange, setRealtimeTimeRange] = useState('Today');
  const [donutTimeRange, setDonutTimeRange] = useState('This Week');
  const [perfTimeRange, setPerfTimeRange] = useState('This Week');
  const [revenueTimeRange, setRevenueTimeRange] = useState('7 Days');

  const [activityLog, setActivityLog] = useState([
    { id: 1, customer: 'Rahul Nair', text: 'Order #ORD-1021 placed in Pending Queue', time: 'Just now' },
    { id: 2, customer: 'Priya Sharma', text: 'Bridal Lehenga fitting trial completed', time: '2 min ago' },
    { id: 3, customer: 'Amit Verma', text: 'Sherwani sleeve measurement verified', time: '5 min ago' },
    { id: 4, customer: 'Megha Reddy', text: 'Georgette fabric cutting initiated', time: '8 min ago' }
  ]);

  // 1-second live ticker effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdatedSeconds(prev => (prev >= 59 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate dynamic tab counts from orders state
  const activeOrdersCount = orders.filter(o => !['Completed', 'Cancelled'].includes(o.status)).length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const completedCount = orders.filter(o => o.status === 'Completed').length;
  const cancelledCount = orders.filter(o => o.status === 'Cancelled').length;

  // Calculate dynamic trend data for RealTimeOrderChart from orders state
  const inProgressCount = orders.filter(o => o.status === 'In Progress').length;
  const stitchingCount = orders.filter(o => o.status === 'Stitching').length;
  const cuttingCount = orders.filter(o => o.status === 'Cutting').length;
  const readyCount = orders.filter(o => o.status === 'Ready').length;

  const realTimeTrendData = [
    { time: '10 AM', inProgress: Math.max(1, inProgressCount - 3), stitching: Math.max(1, stitchingCount - 2), cutting: Math.max(1, cuttingCount - 1), ready: 0 },
    { time: '12 PM', inProgress: Math.max(2, inProgressCount - 2), stitching: Math.max(1, stitchingCount - 1), cutting: Math.max(2, cuttingCount), ready: 1 },
    { time: '2 PM', inProgress: Math.max(3, inProgressCount - 1), stitching: stitchingCount, cutting: Math.max(1, cuttingCount - 1), ready: 1 },
    { time: '4 PM', inProgress: inProgressCount, stitching: Math.max(2, stitchingCount + 1), cutting: cuttingCount, ready: readyCount },
    { time: '6 PM', inProgress: inProgressCount, stitching: stitchingCount, cutting: cuttingCount, ready: readyCount }
  ];

  // Calculate dynamic performance data for OrderPerformanceChart
  const performanceData = [
    { day: 'Mon', received: 5, completed: 4 },
    { day: 'Tue', received: 7, completed: 6 },
    { day: 'Wed', received: 4, completed: 5 },
    { day: 'Thu', received: 8, completed: 7 },
    { day: 'Fri', received: 10, completed: 9 },
    { day: 'Sat', received: 6, completed: 4 },
    { day: 'Sun', received: 3, completed: 2 }
  ];

  // Calculate dynamic revenue data for RevenueChart from completed orders
  const totalRevenue = orders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => sum + o.amount, 0) + 30000; // total base plus completed

  const revenueData = [
    { date: '15 May', amount: 8000 },
    { date: '18 May', amount: 15000 },
    { date: '21 May', amount: 22000 },
    { date: '24 May', amount: 32000 },
    { date: '27 May', amount: 41000 },
    { date: '30 May', amount: totalRevenue }
  ];

  // Filter orders by subTab, search, fabric, minPrice
  let filteredOrders = orders.filter(o => {
    if (subTab === 'new') return o.status === 'Pending';
    if (subTab === 'active') return ['In Progress', 'Stitching', 'Cutting', 'Ready'].includes(o.status);
    if (subTab === 'completed') return o.status === 'Completed';
    if (subTab === 'cancelled') return o.status === 'Cancelled';
    return true;
  });

  if (search.trim()) {
    const q = search.toLowerCase();
    filteredOrders = filteredOrders.filter(o =>
      o.customer.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      o.outfit.toLowerCase().includes(q) ||
      o.fabric.toLowerCase().includes(q)
    );
  }

  if (fabricFilter !== 'all') {
    filteredOrders = filteredOrders.filter(o => o.fabric.toLowerCase().includes(fabricFilter.toLowerCase()));
  }

  if (minPriceFilter) {
    filteredOrders = filteredOrders.filter(o => o.amount >= Number(minPriceFilter));
  }

  // Sort orders
  filteredOrders.sort((a, b) => {
    let res = 0;
    if (sortBy === 'customer') res = a.customer.localeCompare(b.customer);
    else if (sortBy === 'amount') res = a.amount - b.amount;
    else if (sortBy === 'progress') res = a.progress - b.progress;
    else if (sortBy === 'status') res = a.status.localeCompare(b.status);
    else res = a.id.localeCompare(b.id);
    return sortAsc ? res : -res;
  });

  // Pagination calculations
  const totalRows = filteredOrders.length;
  const totalPages = Math.ceil(totalRows / pageSize) || 1;
  const currPage = Math.min(currentPage, totalPages);
  const startIndex = (currPage - 1) * pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  // Stage Update Handler (Triggers automatic state update across all charts, KPIs & table)
  const handleUpdateStage = (orderId, newStatus) => {
    let newProg = 0;
    if (newStatus === 'Pending') newProg = 0;
    else if (newStatus === 'Cutting') newProg = 20;
    else if (newStatus === 'Stitching') newProg = 50;
    else if (newStatus === 'In Progress') newProg = 75;
    else if (newStatus === 'Ready') newProg = 90;
    else if (newStatus === 'Completed') newProg = 100;

    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, progress: newProg } : o));

    const targetOrder = orders.find(o => o.id === orderId);
    setActivityLog(prev => [
      { id: Date.now(), customer: targetOrder?.customer || 'Client', text: `Order #${orderId} moved to ${newStatus}`, time: 'Just now' },
      ...prev.slice(0, 5)
    ]);
    setLastUpdatedSeconds(0);
    setSelectedOrderForEdit(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* PAGE HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.2' }}>Orders</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(18,183,106,0.1)', color: '#12B76A', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#12B76A' }}></span>
              ● Live
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Last updated: {lastUpdatedSeconds}s ago
              <RotateCw 
                size={12} 
                style={{ cursor: 'pointer' }} 
                onClick={() => setLastUpdatedSeconds(0)} 
                title="Refresh now"
              />
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: 400, color: 'var(--text-secondary)' }}>
            Manage and track all stitching orders in real-time
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Functional Search */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by order ID, customer or outfit..." 
              className="form-input" 
              style={{ paddingLeft: '36px', width: '100%', height: '40px', borderRadius: '9px', fontSize: '12px', border: '1px solid var(--border-color)' }}
            />
            {search && (
              <X size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setSearch('')} />
            )}
          </div>

          {/* Filter Modal Trigger */}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            title="Filter options"
            style={{
              background: isFilterOpen || fabricFilter !== 'all' || minPriceFilter ? 'rgba(247,37,133,0.1)' : (theme === 'dark' ? '#141126' : '#ffffff'),
              border: fabricFilter !== 'all' || minPriceFilter ? '1px solid var(--primary)' : '1px solid var(--border-color)',
              borderRadius: '9px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: fabricFilter !== 'all' || minPriceFilter ? 'var(--primary)' : 'var(--text-primary)',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}
          >
            <Sliders size={16} />
          </button>

          {/* New Request CTA */}
          <button 
            className="btn btn-primary" 
            style={{ height: '40px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 18px', fontSize: '12px', fontWeight: 600, borderRadius: '9px', background: '#F72585', border: 'none', color: '#fff' }} 
            onClick={() => alert("Creating new customer stitching request...")}
          >
            <Plus size={16} /> New Request
          </button>
        </div>
      </div>

      {/* ADVANCED FILTER PANEL */}
      {isFilterOpen && (
        <OrderFilters 
          fabric={fabricFilter} 
          setFabric={setFabricFilter} 
          minPrice={minPriceFilter} 
          setMinPrice={setMinPriceFilter} 
          onReset={() => { setFabricFilter('all'); setMinPriceFilter(''); setSearch(''); }}
          theme={theme}
        />
      )}

      {/* ORDER SUB-TABS */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {[
          { id: 'active', label: 'Active Stitching', count: activeOrdersCount },
          { id: 'new', label: 'New Requests', count: pendingCount },
          { id: 'completed', label: 'Completed', count: completedCount },
          { id: 'cancelled', label: 'Cancelled', count: cancelledCount },
          { id: 'all', label: 'All Orders', count: orders.length }
        ].map(tb => {
          const isActive = subTab === tb.id;
          return (
            <button
              key={tb.id}
              onClick={() => { setSubTab(tb.id); setCurrentPage(1); }}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                border: isActive ? '1px solid #F72585' : '1px solid var(--border-color)',
                background: isActive ? '#F72585' : (theme === 'dark' ? '#141126' : '#ffffff'),
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 2px 6px rgba(247,37,133,0.25)' : 'none'
              }}
            >
              <span>{tb.label}</span>
              <span style={{
                padding: '1px 6px',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: 700,
                background: isActive ? 'rgba(255,255,255,0.25)' : (theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#f1f5f9'),
                color: isActive ? '#ffffff' : 'var(--text-muted)'
              }}>
                {tb.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* KPI CARDS (REAL RECHARTS SPARKELINES) */}
      <OrderStats orders={orders} theme={theme} />

      {/* REAL-TIME LINE CHART (62%) + EQUAL-HEIGHT DONUT CHART (38%) */}
      <div style={{ display: 'flex', gap: '18px', alignItems: 'stretch', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 60%', minWidth: '320px' }}>
          <RealTimeOrderChart 
            trendData={realTimeTrendData} 
            timeRange={realtimeTimeRange} 
            setTimeRange={setRealtimeTimeRange} 
            lastUpdatedSeconds={lastUpdatedSeconds}
            onRefresh={() => setLastUpdatedSeconds(0)}
            theme={theme} 
          />
        </div>
        <div style={{ flex: '1 1 35%', minWidth: '280px', display: 'flex', flexDirection: 'column' }}>
          <OrderStatusDonut 
            orders={orders} 
            timeRange={donutTimeRange} 
            setTimeRange={setDonutTimeRange} 
            theme={theme} 
          />
        </div>
      </div>

      {/* MAIN ORDERS PRODUCTION TABLE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <OrderTable 
          orders={paginatedOrders} 
          onEditStage={setSelectedOrderForEdit} 
          onSort={handleSort} 
          sortBy={sortBy} 
          sortAsc={sortAsc} 
          onMessage={() => setActiveTab('chat')} 
          onCreateNewOrder={() => alert("Creating new order...")}
          theme={theme} 
        />
        <Pagination 
          currentPage={currPage} 
          totalPages={totalPages} 
          totalRows={totalRows} 
          pageSize={pageSize} 
          onPageChange={setCurrentPage} 
          onPageSizeChange={(sz) => { setPageSize(sz); setCurrentPage(1); }} 
          startIndex={startIndex} 
          theme={theme} 
        />
      </div>

      {/* PERFORMANCE BAR CHART + REVENUE LINE CHART */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <OrderPerformanceChart 
          performanceData={performanceData} 
          timeRange={perfTimeRange} 
          setTimeRange={setPerfTimeRange} 
          theme={theme} 
        />
        <RevenueChart 
          revenueData={revenueData} 
          totalRevenue={totalRevenue} 
          pctChange={18} 
          timeRange={revenueTimeRange} 
          setTimeRange={setRevenueTimeRange} 
          theme={theme} 
        />
      </div>

      {/* UPCOMING DELIVERIES + LIVE ACTIVITY + QUICK ACTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <UpcomingDeliveries 
          orders={orders} 
          onViewCalendar={() => setActiveTab('calendar')} 
          theme={theme} 
        />
        <LiveOrderActivity 
          activityLog={activityLog} 
          isLive={true} 
          theme={theme} 
        />
        <QuickActions 
          onAction={(lbl) => alert(`Executing: ${lbl}`)} 
          theme={theme} 
        />
      </div>

      {/* PRODUCTION STAGE EDIT MODAL */}
      {selectedOrderForEdit && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: theme === 'dark' ? '#141126' : '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            width: '100%',
            maxWidth: '420px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Update Stage: #{selectedOrderForEdit.id}
              </h3>
              <X size={18} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setSelectedOrderForEdit(null)} />
            </div>

            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Customer: <strong>{selectedOrderForEdit.customer}</strong> ({selectedOrderForEdit.outfit})
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Select New Stage:</label>
              {['Pending', 'Cutting', 'Stitching', 'In Progress', 'Ready', 'Completed'].map(st => (
                <button
                  key={st}
                  onClick={() => handleUpdateStage(selectedOrderForEdit.id, st)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: selectedOrderForEdit.status === st ? '1px solid #F72585' : '1px solid var(--border-color)',
                    background: selectedOrderForEdit.status === st ? 'rgba(247,37,133,0.1)' : (theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#F7F8FA'),
                    color: selectedOrderForEdit.status === st ? '#F72585' : 'var(--text-primary)',
                    fontSize: '12px',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{st}</span>
                  {selectedOrderForEdit.status === st && <Check size={14} color="#F72585" />}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button 
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '8px' }}
                onClick={() => setSelectedOrderForEdit(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
