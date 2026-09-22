import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Filter,
  Download,
  DollarSign,
  ShoppingBag,
  Users,
  Scissors,
  Truck,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  MapPin
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import StatCard from '../common/StatCard';
import {
  REVENUE_SALES_TRENDS,
  CATEGORY_PERFORMANCE,
  TOP_TAILORS,
  LOCATION_ANALYTICS,
  MOCK_CUSTOMERS
} from '../../data/adminMockData';

export const AnalyticsView = ({ initialTab, onExportReport }) => {
  const getTabFromInitial = (tabId) => {
    if (tabId === 'analytics-partners') return 'tailors';
    if (tabId === 'analytics-locations') return 'locations';
    return 'sales';
  };

  const [activeTab, setActiveTab] = useState(() => getTabFromInitial(initialTab));
  const [timeRange, setTimeRange] = useState('30 Days');
  const [selectedHub, setSelectedHub] = useState('All');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(getTabFromInitial(initialTab));
    }
  }, [initialTab]);

  // Time range data selector
  const chartData = REVENUE_SALES_TRENDS[timeRange] || REVENUE_SALES_TRENDS['30 Days'];

  // Conversion funnel data
  const funnelData = [
    { stage: 'App / Web Visits', count: 184500, drop: '0%' },
    { stage: 'Category & Style Browse', count: 94200, drop: '48.9%' },
    { stage: 'Measurement Scheduled', count: 32600, drop: '65.4%' },
    { stage: 'Measurements Recorded', count: 28400, drop: '12.8%' },
    { stage: 'Order Placed & Paid', count: 18642, drop: '34.3%' },
    { stage: 'Repeat Orders', count: 7420, drop: '39.8%' }
  ];

  // Delivery performance SLA
  const deliverySlaData = [
    { name: 'On-Time Doorstep Pickup', value: 96.4, target: 95 },
    { name: 'Tailor Dropoff On-Time', value: 98.1, target: 95 },
    { name: 'Home Fitting On-Time', value: 94.8, target: 92 },
    { name: 'Final Handover SLA', value: 97.2, target: 95 }
  ];

  // Tailor capacity vs utilization
  const tailorUtilization = [
    { zone: 'Koramangala Hub', capacity: 450, active: 412, utilization: '91%' },
    { zone: 'Indiranagar Hub', capacity: 380, active: 365, utilization: '96%' },
    { zone: 'Whitefield Hub', capacity: 520, active: 470, utilization: '90%' },
    { zone: 'Jayanagar Hub', capacity: 340, active: 295, utilization: '86%' },
    { zone: 'Malleshwaram Hub', capacity: 280, active: 240, utilization: '85%' }
  ];

  const tabs = [
    { id: 'sales', label: 'Sales & Revenue', icon: DollarSign },
    { id: 'categories', label: 'Category & Styles', icon: Scissors },
    { id: 'tailors', label: 'Tailor Capacity & Quality', icon: CheckCircle },
    { id: 'logistics', label: 'Logistics & Doorstep SLA', icon: Truck },
    { id: 'locations', label: 'Regional Hubs', icon: MapPin },
    { id: 'funnel', label: 'Conversion Funnel', icon: TrendingUp }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header & Global Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--sb-text-title)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <BarChart3 style={{ width: '22px', height: '22px', color: 'var(--sb-primary)' }} />
            Platform Analytics & Intelligence
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
            Real-time business performance, conversion rates, partner efficiency, and geographic trends.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {/* Hub Filter */}
          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
            className="sb-select-control"
          >
            <option value="All">All City Hubs</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi-NCR">Delhi-NCR</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
          </select>

          {/* Time Range Selector */}
          <div className="sb-pill-group">
            {[
              { id: '7 Days', label: '7D' },
              { id: '30 Days', label: '30D' },
              { id: '3 Months', label: '3M' },
              { id: '1 Year', label: '1Y' }
            ].map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() => setTimeRange(range.id)}
                className={`sb-pill-btn ${timeRange === range.id ? 'active' : ''}`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onExportReport && onExportReport('Analytics-Summary')}
            className="sb-btn sb-btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.78rem' }}
          >
            <Download style={{ width: '14px', height: '14px' }} />
            Export Data
          </button>
        </div>
      </div>

      {/* Analytics Category Tabs Bar */}
      <div className="sb-tabs-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`sb-tab-item ${isActive ? 'active' : ''}`}
            >
              <Icon style={{ width: '16px', height: '16px' }} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Sales & Revenue */}
      {activeTab === 'sales' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 4-Column Stat Cards Grid */}
          <div className="sb-grid-4">
            <StatCard
              title="Gross Merchandise Value"
              value="₹48,60,000"
              change="+15.2%"
              isPositive={true}
              comparison="vs previous period"
              iconName="DollarSign"
              sparkline={[38, 41, 40, 44, 46, 48]}
              isAccent={true}
            />
            <StatCard
              title="StitchBee Commission Net"
              value="₹7,29,000"
              change="+14.8%"
              isPositive={true}
              comparison="15% platform take-rate"
              iconName="TrendingUp"
              sparkline={[5.8, 6.2, 6.1, 6.7, 7.0, 7.29]}
            />
            <StatCard
              title="Average Order Value"
              value="₹2,607"
              change="+6.1%"
              isPositive={true}
              comparison="Target: ₹2,500"
              iconName="ShoppingBag"
              sparkline={[2450, 2480, 2520, 2560, 2590, 2607]}
            />
            <StatCard
              title="Refund / Rework Cost"
              value="₹42,800"
              change="-8.4%"
              isPositive={true}
              comparison="0.88% of GMV"
              iconName="ArrowDownRight"
              sparkline={[58, 52, 49, 46, 44, 42.8]}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Revenue Trend Area Chart */}
            <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
                    Revenue & Order Growth Trend
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                    Aggregated daily inflow across all payment channels
                  </p>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--sb-primary)', backgroundColor: 'var(--sb-primary-light)', padding: '4px 10px', borderRadius: 'var(--sb-radius-full)' }}>
                  Growth: +18.4% YoY
                </span>
              </div>

              <div style={{ flex: 1, minHeight: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="analyticsRevGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sb-border-default)" opacity={0.6} />
                    <XAxis dataKey="period" stroke="var(--sb-text-muted)" fontSize={11} />
                    <YAxis stroke="var(--sb-text-muted)" fontSize={11} tickFormatter={(v) => `₹${(v/1000)}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--sb-bg-surface)',
                        borderColor: 'var(--sb-border-default)',
                        borderRadius: '8px',
                        color: 'var(--sb-text-title)',
                        fontSize: '12px',
                        boxShadow: 'var(--sb-shadow-dropdown)'
                      }}
                      formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Revenue']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue (₹)"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#analyticsRevGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Regional Hub Breakdown */}
            <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
                  Regional Hub Distribution
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                  Active operations and GMV contribution
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {LOCATION_ANALYTICS.map((loc, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{loc.city}</span>
                      <span style={{ fontWeight: 700, color: 'var(--sb-primary)' }}>
                        ₹{(loc.revenue / 100000).toFixed(1)}L ({loc.growth})
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--sb-bg-surface-hover)', borderRadius: 'var(--sb-radius-full)', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: 'var(--sb-primary)',
                          borderRadius: 'var(--sb-radius-full)',
                          width: `${Math.min(100, (loc.orders / 8420) * 100)}%`,
                          transition: 'width 0.5s ease-out'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--sb-text-muted)' }}>
                      <span>{loc.orders.toLocaleString()} orders</span>
                      <span>{loc.tailors} verified tailors</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Category & Styles */}
      {activeTab === 'categories' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
                  Orders by Tailoring Category
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                  Comparison of total volume and average ticket size
                </p>
              </div>

              <div style={{ height: '340px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={CATEGORY_PERFORMANCE}
                    margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--sb-border-default)" opacity={0.6} />
                    <XAxis
                      dataKey="name"
                      stroke="var(--sb-text-muted)"
                      fontSize={10}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis stroke="var(--sb-text-muted)" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--sb-bg-surface)',
                        borderColor: 'var(--sb-border-default)',
                        borderRadius: '8px',
                        color: 'var(--sb-text-title)',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="orders" name="Order Volume" fill="var(--sb-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Performance Details */}
            <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
                  Category Highlights
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                  High-margin vs High-volume segments
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {CATEGORY_PERFORMANCE.slice(0, 5).map((cat, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--sb-radius-md)',
                      border: '1px solid var(--sb-border-default)',
                      backgroundColor: 'var(--sb-bg-surface-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>{cat.name}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                        {cat.orders.toLocaleString()} orders • {cat.group}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sb-accent)', margin: 0 }}>
                        ₹{(cat.revenue / 100000).toFixed(1)}L
                      </p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--sb-status-success)', fontWeight: 600 }}>
                        Healthy Demand
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tailor Capacity & Quality */}
      {activeTab === 'tailors' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="sb-grid-3">
            <div className="sb-card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--sb-radius-md)', backgroundColor: 'var(--sb-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sb-primary)' }}>
                  <Scissors style={{ width: '20px', height: '20px' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: 0 }}>Active Tailors</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--sb-text-title)', margin: '2px 0' }}>1,248</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--sb-status-success)', margin: 0 }}>+42 onboarding</p>
                </div>
              </div>
            </div>

            <div className="sb-card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--sb-radius-md)', backgroundColor: 'var(--sb-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sb-accent)' }}>
                  <CheckCircle style={{ width: '20px', height: '20px' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: 0 }}>First-Time Fit Rate</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--sb-text-title)', margin: '2px 0' }}>98.2%</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--sb-status-success)', margin: 0 }}>Industry high</p>
                </div>
              </div>
            </div>

            <div className="sb-card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--sb-radius-md)', backgroundColor: 'var(--sb-status-failed-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sb-status-failed)' }}>
                  <Clock style={{ width: '20px', height: '20px' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: 0 }}>Avg Stitching Turnaround</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--sb-text-title)', margin: '2px 0' }}>4.2 Days</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--sb-primary)', margin: 0 }}>SLA target: 5 days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
              Hub Capacity Utilization
            </h3>
            <div style={{ overflowX: 'auto', border: '1px solid var(--sb-border-default)', borderRadius: 'var(--sb-radius-md)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--sb-bg-surface-hover)', borderBottom: '1px solid var(--sb-border-default)', color: 'var(--sb-text-muted)', fontWeight: 600 }}>
                    <th style={{ padding: '10px 14px' }}>Cluster / Hub</th>
                    <th style={{ padding: '10px 14px' }}>Daily Capacity</th>
                    <th style={{ padding: '10px 14px' }}>Active Orders</th>
                    <th style={{ padding: '10px 14px' }}>Utilization %</th>
                    <th style={{ padding: '10px 14px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tailorUtilization.map((hub, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--sb-border-default)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--sb-text-title)' }}>{hub.zone}</td>
                      <td style={{ padding: '12px 14px' }}>{hub.capacity} garments/day</td>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--sb-primary)' }}>{hub.active} garments</td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '90px', height: '8px', backgroundColor: 'var(--sb-bg-surface-hover)', borderRadius: 'var(--sb-radius-full)', overflow: 'hidden', border: '1px solid var(--sb-border-default)' }}>
                            <div
                              style={{ height: '100%', backgroundColor: 'var(--sb-primary)', borderRadius: 'var(--sb-radius-full)', width: hub.utilization }}
                            />
                          </div>
                          <span style={{ fontWeight: 700 }}>{hub.utilization}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: 'var(--sb-radius-sm)', fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'var(--sb-status-success-bg)', color: 'var(--sb-status-success)' }}>
                          Optimal Load
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Logistics & Doorstep SLA */}
      {activeTab === 'logistics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
                Doorstep Logistics SLAs
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                Strict quality timelines for measurement gig and delivery partners
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {deliverySlaData.map((sla, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{sla.name}</span>
                    <span style={{ fontWeight: 700, color: 'var(--sb-primary)' }}>
                      {sla.value}% (Target: &gt;{sla.target}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--sb-bg-surface-hover)', borderRadius: 'var(--sb-radius-full)', overflow: 'hidden', border: '1px solid var(--sb-border-default)' }}>
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: 'var(--sb-primary)',
                        borderRadius: 'var(--sb-radius-full)',
                        width: `${sla.value}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
                Doorstep Fitting Satisfaction
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
                Ratings collected after delivery partner home trial
              </p>
            </div>

            <div style={{ padding: '24px', borderRadius: 'var(--sb-radius-xl)', backgroundColor: 'var(--sb-bg-surface-subtle)', border: '1px solid var(--sb-border-default)', width: '100%', maxWidth: '320px' }}>
              <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--sb-accent)', margin: 0 }}>4.88 / 5.0</p>
              <div style={{ color: 'var(--sb-accent)', fontSize: '1.25rem', margin: '4px 0 8px 0' }}>
                ★★★★★
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: 0 }}>
                Based on 14,280 verified doorstep delivery trials
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Regional Hubs */}
      {activeTab === 'locations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="sb-grid-4">
            {LOCATION_ANALYTICS.map((loc, idx) => (
              <div key={idx} className="sb-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--sb-text-title)' }}>{loc.city}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sb-status-success)' }}>{loc.growth}</span>
                </div>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--sb-primary)', margin: 0 }}>
                  ₹{(loc.revenue / 100000).toFixed(1)} Lakhs
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--sb-text-muted)', paddingTop: '4px', borderTop: '1px solid var(--sb-border-default)' }}>
                  <span>{loc.orders.toLocaleString()} orders</span>
                  <span>{loc.tailors} tailors</span>
                  <span>{loc.deliveryPartners} riders</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
              City Operations Breakdown
            </h3>
            <div style={{ overflowX: 'auto', border: '1px solid var(--sb-border-default)', borderRadius: 'var(--sb-radius-md)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--sb-bg-surface-hover)', borderBottom: '1px solid var(--sb-border-default)', color: 'var(--sb-text-muted)', fontWeight: 600 }}>
                    <th style={{ padding: '10px 14px' }}>City Hub</th>
                    <th style={{ padding: '10px 14px' }}>Total Orders</th>
                    <th style={{ padding: '10px 14px' }}>Gross Revenue</th>
                    <th style={{ padding: '10px 14px' }}>Verified Tailors</th>
                    <th style={{ padding: '10px 14px' }}>Riders & Gigs</th>
                    <th style={{ padding: '10px 14px' }}>YoY Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {LOCATION_ANALYTICS.map((loc, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--sb-border-default)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--sb-text-title)' }}>{loc.city}</td>
                      <td style={{ padding: '12px 14px' }}>{loc.orders.toLocaleString()}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--sb-primary)' }}>₹{loc.revenue.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '12px 14px' }}>{loc.tailors}</td>
                      <td style={{ padding: '12px 14px' }}>{loc.deliveryPartners}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--sb-status-success)', fontWeight: 700 }}>{loc.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Conversion Funnel */}
      {activeTab === 'funnel' && (
        <div className="sb-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
              End-to-End Customer Journey Funnel
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', margin: '4px 0 0 0' }}>
              Conversion from discovery to measurement booking, order completion, and repeat orders
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {funnelData.map((stage, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--sb-radius-md)',
                  border: '1px solid var(--sb-border-default)',
                  backgroundColor: 'var(--sb-bg-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '26px', height: '26px', borderRadius: 'var(--sb-radius-full)', backgroundColor: 'var(--sb-primary-light)', color: 'var(--sb-primary)', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {idx + 1}
                  </span>
                  <div>
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>{stage.stage}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>
                      {stage.count.toLocaleString()} Users
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: stage.drop === '0%' ? 'var(--sb-status-success)' : 'var(--sb-primary)' }}>
                    {stage.drop === '0%' ? 'Top of Funnel' : `Drop-off: ${stage.drop}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsView;
