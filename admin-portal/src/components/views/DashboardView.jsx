import React, { useState } from 'react';
import { 
  ResponsiveContainer, ComposedChart, Area, Bar, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { 
  ShoppingBag, Users, Scissors, Truck, IndianRupee, Sparkles, 
  AlertTriangle, ShieldAlert, CheckCircle2, ArrowUpRight, ArrowDownRight,
  TrendingUp, Star, Filter, Calendar, MapPin, Eye, ExternalLink, Plus
} from 'lucide-react';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';
import { 
  EXECUTIVE_KPIS, REVENUE_SALES_TRENDS, ORDER_STATUS_DISTRIBUTION, 
  CATEGORY_PERFORMANCE, TOP_TAILORS, TOP_DESIGNERS, TOP_DELIVERY_PARTNERS,
  LOCATION_ANALYTICS, RECENT_ACTIVITIES, ADMIN_ALERTS 
} from '../../data/adminMockData';

// Custom Chart Tooltip for Revenue & Sales
function RevenueTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: 'var(--sb-bg-surface)',
        border: '1px solid var(--sb-border-default)',
        borderRadius: 'var(--sb-radius-md)',
        boxShadow: 'var(--sb-shadow-dropdown)',
        padding: '12px 16px',
        fontSize: '0.82rem',
        color: 'var(--sb-text-title)'
      }}>
        <div style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--sb-text-title)' }}>
          {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--sb-primary)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--sb-primary)' }} />
          <span>Revenue: <strong>₹{Number(data.revenue).toLocaleString('en-IN')}</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--sb-accent)', marginTop: '3px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--sb-accent)' }} />
          <span>Orders: <strong>{data.orders}</strong></span>
        </div>
        {data.aov && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--sb-text-muted)', marginTop: '3px' }}>
            <span>Avg Order Value: <strong>₹{Number(data.aov).toLocaleString('en-IN')}</strong></span>
          </div>
        )}
      </div>
    );
  }
  return null;
}

export default function DashboardView({ onNavigateTab }) {
  const [revenueFilter, setRevenueFilter] = useState('7 Days');
  const [categoryTab, setCategoryTab] = useState('Fashion');

  const chartData = REVENUE_SALES_TRENDS[revenueFilter] || REVENUE_SALES_TRENDS['7 Days'];
  const filteredCategories = CATEGORY_PERFORMANCE.filter(c => c.group === categoryTab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Top Executive KPI Cards Grid (8 Cards) */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--sb-text-title)' }}>
              Executive Overview
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', margin: 0 }}>
              Live platform metrics across orders, ateliers, logistics, and revenue
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--sb-status-success)' }} />
            <span>Updated 2 mins ago</span>
          </div>
        </div>

        <div className="sb-grid-4">
          {EXECUTIVE_KPIS.map(kpi => (
            <StatCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              isPositive={kpi.isPositive}
              comparison={kpi.comparison}
              iconName={kpi.iconName}
              sparkline={kpi.sparkline}
              isAccent={kpi.isAccent}
              isAlert={kpi.isAlert}
              onClick={() => {
                if (kpi.id === 'kpi-customers') onNavigateTab('customers');
                else if (kpi.id === 'kpi-orders') onNavigateTab('orders');
                else if (kpi.id === 'kpi-revenue') onNavigateTab('revenue-analytics');
                else if (kpi.id === 'kpi-tailors') onNavigateTab('tailors');
                else if (kpi.id === 'kpi-delivery') onNavigateTab('delivery-partners');
                else if (kpi.id === 'kpi-designers') onNavigateTab('designers');
                else if (kpi.id === 'kpi-verifications') onNavigateTab('tailor-verification');
                else if (kpi.id === 'kpi-failures') onNavigateTab('stitching-failures');
              }}
            />
          ))}
        </div>
      </section>

      {/* 2. Admin Alerts & Quick Action Shortcuts */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {ADMIN_ALERTS.map(alert => (
          <div
            key={alert.id}
            onClick={() => onNavigateTab(alert.targetTab)}
            className="sb-card sb-card-interactive"
            style={{
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--sb-radius-md)',
                background: alert.level === 'danger' ? 'var(--sb-status-failed-bg)' : 'var(--sb-accent-light)',
                color: alert.level === 'danger' ? 'var(--sb-status-failed)' : 'var(--sb-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {alert.level === 'danger' ? <AlertTriangle size={18} /> : <ShieldAlert size={18} />}
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
                  {alert.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>
                  {alert.desc}
                </div>
              </div>
            </div>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: alert.level === 'danger' ? 'var(--sb-status-failed)' : 'var(--sb-accent)',
              background: alert.level === 'danger' ? 'var(--sb-status-failed-bg)' : 'var(--sb-accent-light)',
              padding: '4px 10px',
              borderRadius: 'var(--sb-radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>{alert.count}</span>
              <ArrowUpRight size={13} />
            </div>
          </div>
        ))}
      </section>

      {/* 3. Main Revenue & Sales Chart + Order Status Donut Chart */}
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }} className="sb-dashboard-charts-grid">
        
        {/* Large Revenue & Sales Overview Chart */}
        <div className="sb-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="sb-card-header" style={{ flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div className="sb-card-title">
                <IndianRupee size={18} color="var(--sb-primary)" />
                <span>Revenue & Sales Overview</span>
              </div>
              <div className="sb-card-subtitle">
                Combined platform revenue (Blue) and order volume (Gold)
              </div>
            </div>

            {/* Time Filter Pills */}
            <div style={{ display: 'flex', background: 'var(--sb-bg-surface-subtle)', padding: '3px', borderRadius: 'var(--sb-radius-md)', gap: '2px' }}>
              {['Today', '7 Days', '30 Days', '3 Months', '6 Months', '1 Year'].map(f => (
                <button
                  key={f}
                  onClick={() => setRevenueFilter(f)}
                  style={{
                    background: revenueFilter === f ? 'var(--sb-primary)' : 'transparent',
                    color: revenueFilter === f ? '#ffffff' : 'var(--sb-text-muted)',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: 'var(--sb-radius-sm)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--sb-transition-fast)'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Composed Area + Bar + Line */}
          <div style={{ width: '100%', height: '320px', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--sb-primary)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--sb-primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sb-chart-grid)" vertical={false} />
                <XAxis 
                  dataKey="period" 
                  stroke="var(--sb-text-muted)" 
                  fontSize={11}
                  tickLine={false} 
                  axisLine={{ stroke: 'var(--sb-border-default)' }}
                />
                <YAxis 
                  yAxisId="left" 
                  stroke="var(--sb-text-muted)" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={val => val >= 100000 ? `₹${(val / 100000).toFixed(1)}L` : `₹${val}`}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="var(--sb-accent)" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={val => `${val}`}
                />
                <Tooltip content={<RevenueTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '0.75rem' }} 
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  name="Gross Revenue (₹)" 
                  stroke="var(--sb-primary)" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#revenueGrad)" 
                />
                <Bar 
                  yAxisId="right"
                  dataKey="orders" 
                  name="Orders Completed" 
                  fill="var(--sb-accent)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={18}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Donut Chart */}
        <div className="sb-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="sb-card-header">
            <div>
              <div className="sb-card-title">
                <ShoppingBag size={18} color="var(--sb-primary)" />
                <span>Order Status Overview</span>
              </div>
              <div className="sb-card-subtitle">
                Active workflow breakdown (18,642 total)
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ORDER_STATUS_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={86}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {ORDER_STATUS_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--sb-bg-surface)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value.toLocaleString()} orders`, name]}
                  contentStyle={{
                    backgroundColor: 'var(--sb-bg-surface)',
                    border: '1px solid var(--sb-border-default)',
                    borderRadius: 'var(--sb-radius-md)',
                    color: 'var(--sb-text-title)',
                    fontSize: '0.8rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Compact Legend Pills */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            marginTop: '8px',
            fontSize: '0.74rem'
          }}>
            {ORDER_STATUS_DISTRIBUTION.slice(0, 6).map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <span style={{ color: 'var(--sb-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.name}: <strong>{item.count}</strong>
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('orders')}
            className="sb-btn sb-btn-ghost sb-btn-sm"
            style={{ width: '100%', marginTop: '14px', justifyContent: 'center' }}
          >
            <span>View All 12 Workflow Stages</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </section>

      {/* 4. Category Performance Breakdown */}
      <section className="sb-card">
        <div className="sb-card-header" style={{ flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div className="sb-card-title">
              <Scissors size={18} color="var(--sb-primary)" />
              <span>Category Performance</span>
            </div>
            <div className="sb-card-subtitle">
              Order volume, revenue generation, and tailor completion rate by vertical
            </div>
          </div>

          <div style={{ display: 'flex', background: 'var(--sb-bg-surface-subtle)', padding: '3px', borderRadius: 'var(--sb-radius-md)', gap: '4px' }}>
            {['Fashion', 'Specialty', 'Business'].map(tab => (
              <button
                key={tab}
                onClick={() => setCategoryTab(tab)}
                style={{
                  background: categoryTab === tab ? 'var(--sb-primary)' : 'transparent',
                  color: categoryTab === tab ? '#ffffff' : 'var(--sb-text-muted)',
                  border: 'none',
                  padding: '5px 14px',
                  borderRadius: 'var(--sb-radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--sb-transition-fast)'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px' }}>
            <thead>
              <tr style={{ background: 'var(--sb-bg-surface-subtle)', borderBottom: '1px solid var(--sb-border-default)' }}>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase' }}>Category</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase' }}>Orders</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase' }}>Gross Revenue</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase' }}>AOV</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase' }}>Completed</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase' }}>Failures</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--sb-border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--sb-text-title)' }}>
                    {cat.name}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--sb-text-body)' }}>
                    {cat.orders.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--sb-primary)' }}>
                    ₹{(cat.revenue / 100000).toFixed(2)}L
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--sb-text-body)' }}>
                    ₹{cat.aov.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--sb-status-success)' }}>
                    {cat.completed.toLocaleString()} ({((cat.completed / cat.orders) * 100).toFixed(1)}%)
                  </td>
                  <td style={{ padding: '12px 16px', color: cat.failed > 10 ? 'var(--sb-status-failed)' : 'var(--sb-text-muted)' }}>
                    {cat.failed}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => onNavigateTab('catalog-categories')}
                      className="sb-btn sb-btn-secondary sb-btn-sm"
                      style={{ padding: '4px 8px' }}
                    >
                      <span>Manage</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Top Performers & Regional Location Analytics */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Top Ateliers & Tailors */}
        <div className="sb-card">
          <div className="sb-card-header">
            <div className="sb-card-title">
              <Scissors size={18} color="var(--sb-primary)" />
              <span>Top Master Ateliers</span>
            </div>
            <button onClick={() => onNavigateTab('tailors')} className="sb-btn sb-btn-ghost sb-btn-sm">
              <span>View All</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {TOP_TAILORS.map(t => (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--sb-radius-md)',
                  background: 'var(--sb-bg-surface-subtle)',
                  border: '1px solid var(--sb-border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
                    {t.atelier}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>
                    {t.name} • {t.location}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', fontSize: '0.82rem', fontWeight: 700, color: 'var(--sb-accent)' }}>
                    <Star size={13} fill="currentColor" />
                    <span>{t.rating}</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>
                    {t.orders} orders ({t.onTimeRate})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Analytics (City Breakdown) */}
        <div className="sb-card">
          <div className="sb-card-header">
            <div className="sb-card-title">
              <MapPin size={18} color="var(--sb-primary)" />
              <span>Regional Hub Performance</span>
            </div>
            <button onClick={() => onNavigateTab('analytics-locations')} className="sb-btn sb-btn-ghost sb-btn-sm">
              <span>Detailed Hubs</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {LOCATION_ANALYTICS.map(loc => (
              <div
                key={loc.city}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--sb-radius-md)',
                  background: 'var(--sb-bg-surface-subtle)',
                  border: '1px solid var(--sb-border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
                    {loc.city}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>
                    {loc.tailors} Tailors • {loc.deliveryPartners} Delivery
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--sb-primary)' }}>
                    ₹{(loc.revenue / 100000).toFixed(1)}L
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--sb-status-success)', fontWeight: 600 }}>
                    {loc.growth} MoM
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Operational Stream */}
        <div className="sb-card">
          <div className="sb-card-header">
            <div className="sb-card-title">
              <TrendingUp size={18} color="var(--sb-primary)" />
              <span>Live Operational Stream</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {RECENT_ACTIVITIES.map(act => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: act.severity === 'danger' ? 'var(--sb-status-failed)' : act.severity === 'warning' ? 'var(--sb-accent)' : 'var(--sb-primary)',
                  marginTop: '5px',
                  flexShrink: 0
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--sb-text-title)', margin: 0, lineHeight: 1.4 }}>
                    {act.text}
                  </p>
                  <span style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)' }}>
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <style>{`
        @media (max-width: 1024px) {
          .sb-dashboard-charts-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
