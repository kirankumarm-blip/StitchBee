import React, { useState } from 'react';
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
  ArrowDownRight
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

export const AnalyticsView = ({ onExportReport }) => {
  const [activeTab, setActiveTab] = useState('sales');
  const [timeRange, setTimeRange] = useState('30 Days');
  const [selectedHub, setSelectedHub] = useState('All');

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

  return (
    <div className="space-y-6">
      {/* Top Header & Global Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[var(--color-primary)]" />
            Platform Analytics & Intelligence
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
            Real-time business performance, conversion rates, partner efficiency, and geographic trends.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Hub Filter */}
          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] shadow-sm"
          >
            <option value="All">All City Hubs</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi-NCR">Delhi-NCR</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
          </select>

          {/* Time Range Selector */}
          <div className="flex items-center bg-[var(--color-surface-hover)] p-1 rounded-lg border border-[var(--color-border)] text-xs font-semibold">
            {[
              { id: '7 Days', label: '7D' },
              { id: '30 Days', label: '30D' },
              { id: '3 Months', label: '3M' },
              { id: '1 Year', label: '1Y' }
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeRange === range.id
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onExportReport && onExportReport('Analytics-Summary')}
            className="sb-btn-secondary text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Data
          </button>
        </div>
      </div>

      {/* Analytics Category Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] overflow-x-auto pb-1">
        {[
          { id: 'sales', label: 'Sales & Revenue', icon: DollarSign },
          { id: 'categories', label: 'Category & Styles', icon: Scissors },
          { id: 'tailors', label: 'Tailor Capacity & Quality', icon: CheckCircle },
          { id: 'logistics', label: 'Logistics & Doorstep SLA', icon: Truck },
          { id: 'funnel', label: 'Conversion Funnel', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Sales & Revenue */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Trend Area Chart */}
            <div className="lg:col-span-2 sb-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[var(--color-text)]">
                    Revenue & Order Growth Trend
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Aggregated daily inflow across all payment channels
                  </p>
                </div>
                <span className="text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2.5 py-1 rounded-full">
                  Growth: +18.4% YoY
                </span>
              </div>

              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="analyticsRevGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="analyticsOrdersGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.6} />
                    <XAxis dataKey="period" stroke="var(--color-text-muted)" fontSize={11} />
                    <YAxis stroke="var(--color-text-muted)" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        borderRadius: '8px',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                      formatter={(val) => `₹${val.toLocaleString('en-IN')}`}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue (₹)"
                      stroke="var(--color-primary)"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#analyticsRevGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Regional Hub Breakdown */}
            <div className="sb-card p-5">
              <h3 className="text-base font-bold text-[var(--color-text)] mb-1">
                Regional Hub Distribution
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mb-4">
                Active operations and GMV contribution
              </p>

              <div className="space-y-4">
                {LOCATION_ANALYTICS.map((loc, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--color-text)]">{loc.city}</span>
                      <span className="font-bold text-[var(--color-primary)]">
                        ₹{(loc.revenue / 100000).toFixed(1)}L ({loc.share})
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[var(--color-surface-hover)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
                        style={{ width: loc.share }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-[var(--color-text-muted)]">
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 sb-card p-5">
              <h3 className="text-base font-bold text-[var(--color-text)] mb-1">
                Orders by Tailoring Category
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mb-4">
                Comparison of total volume and average ticket size
              </p>

              <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={CATEGORY_PERFORMANCE}
                    margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.6} />
                    <XAxis
                      dataKey="name"
                      stroke="var(--color-text-muted)"
                      fontSize={10}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis stroke="var(--color-text-muted)" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        borderRadius: '8px',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="orders" name="Order Volume" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Performance Details */}
            <div className="sb-card p-5">
              <h3 className="text-base font-bold text-[var(--color-text)] mb-1">
                Category Highlights
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mb-4">
                High-margin vs High-volume segments
              </p>

              <div className="space-y-3">
                {CATEGORY_PERFORMANCE.slice(0, 5).map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-hover)] flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-[var(--color-text)]">{cat.name}</p>
                      <p className="text-[11px] text-[var(--color-text-muted)]">
                        {cat.orders.toLocaleString()} orders • {cat.growth}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-[var(--color-accent)]">
                        ₹{(cat.revenue / 100000).toFixed(1)}L
                      </p>
                      <span className="text-[10px] text-[var(--color-success)] font-medium">
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="sb-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)]">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Active Tailors</p>
                  <p className="text-xl font-bold text-[var(--color-text)]">1,248</p>
                  <p className="text-[11px] text-[var(--color-success)]">+42 onboarding</p>
                </div>
              </div>
            </div>

            <div className="sb-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)]">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">First-Time Fit Rate</p>
                  <p className="text-xl font-bold text-[var(--color-text)]">98.2%</p>
                  <p className="text-[11px] text-[var(--color-success)]">Industry high</p>
                </div>
              </div>
            </div>

            <div className="sb-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Avg Stitching Turnaround</p>
                  <p className="text-xl font-bold text-[var(--color-text)]">4.2 Days</p>
                  <p className="text-[11px] text-[var(--color-primary)]">SLA target: 5 days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sb-card p-5">
            <h3 className="text-base font-bold text-[var(--color-text)] mb-3">
              Hub Capacity Utilization
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)] text-left">
                    <th className="py-2.5 px-3">Cluster / Hub</th>
                    <th className="py-2.5 px-3">Total Daily Capacity</th>
                    <th className="py-2.5 px-3">Currently Active Orders</th>
                    <th className="py-2.5 px-3">Utilization %</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {tailorUtilization.map((hub, idx) => (
                    <tr key={idx} className="hover:bg-[var(--color-surface-hover)]">
                      <td className="py-3 px-3 font-semibold text-[var(--color-text)]">{hub.zone}</td>
                      <td className="py-3 px-3">{hub.capacity} garments/day</td>
                      <td className="py-3 px-3 font-medium text-[var(--color-primary)]">{hub.active} garments</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-[var(--color-surface-hover)] rounded-full overflow-hidden border border-[var(--color-border)]">
                            <div
                              className="h-full bg-[var(--color-primary)] rounded-full"
                              style={{ width: hub.utilization }}
                            />
                          </div>
                          <span className="font-bold">{hub.utilization}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300">
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="sb-card p-5">
              <h3 className="text-base font-bold text-[var(--color-text)] mb-1">
                Doorstep Logistics SLAs
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mb-4">
                Strict quality timelines for measurement gig and delivery partners
              </p>

              <div className="space-y-4">
                {deliverySlaData.map((sla, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-[var(--color-text)]">{sla.name}</span>
                      <span className="font-bold text-[var(--color-primary)]">
                        {sla.value}% (Target: &gt;{sla.target}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-[var(--color-surface-hover)] rounded-full overflow-hidden border border-[var(--color-border)]">
                      <div
                        className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
                        style={{ width: `${sla.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sb-card p-5">
              <h3 className="text-base font-bold text-[var(--color-text)] mb-1">
                Doorstep Fitting Satisfaction
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mb-4">
                Ratings collected after delivery partner home trial
              </p>

              <div className="p-4 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-center my-auto space-y-2">
                <p className="text-4xl font-extrabold text-[var(--color-accent)]">4.88 / 5.0</p>
                <div className="flex justify-center gap-1 text-[var(--color-accent)]">
                  {'★★★★★'}
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Based on 14,280 verified doorstep delivery trials
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Conversion Funnel */}
      {activeTab === 'funnel' && (
        <div className="sb-card p-5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-[var(--color-text)]">
              End-to-End Customer Journey Funnel
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Conversion from discovery to measurement booking, order completion, and repeat orders
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {funnelData.map((stage, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[var(--color-text)]">{stage.stage}</p>
                    <p className="text-[11px] text-[var(--color-text-muted)]">
                      {stage.count.toLocaleString()} Users
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-[var(--color-primary)]">
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
