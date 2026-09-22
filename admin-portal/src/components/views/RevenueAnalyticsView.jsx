import React from 'react';
import { 
  ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { IndianRupee, TrendingUp, CreditCard, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { LOCATION_ANALYTICS, CATEGORY_PERFORMANCE } from '../../data/adminMockData';

export default function RevenueAnalyticsView() {
  const financeBreakdown = [
    { label: 'Gross Platform Inflow', amount: '₹48,60,000', sub: '100% Volume', color: 'var(--sb-primary)' },
    { label: 'Master Tailor Payouts', amount: '₹34,02,000', sub: '70% Allocation', color: 'var(--sb-blue-500)' },
    { label: 'Delivery Partner Payouts', amount: '₹4,86,000', sub: '10% Allocation', color: 'var(--sb-blue-300)' },
    { label: 'Platform Net Commission', amount: '₹7,29,000', sub: '15% Net Take', color: 'var(--sb-accent)' },
    { label: 'GST & Regulatory Taxes (5%)', amount: '₹2,43,000', sub: 'Remitted', color: 'var(--sb-text-muted)' }
  ];

  const gatewayShares = [
    { name: 'Razorpay UPI & Cards', value: 62, color: '#2563eb' },
    { name: 'Cashfree NetBanking', value: 24, color: '#60a5fa' },
    { name: 'PayU Corporate Accounts', value: 14, color: '#f59e0b' }
  ];

  const monthlyRunRate = [
    { month: 'Apr', gross: 31.0, payouts: 21.7, netCommission: 4.65 },
    { month: 'May', gross: 34.5, payouts: 24.1, netCommission: 5.17 },
    { month: 'Jun', gross: 36.2, payouts: 25.3, netCommission: 5.43 },
    { month: 'Jul', gross: 38.5, payouts: 26.9, netCommission: 5.77 },
    { month: 'Aug', gross: 43.2, payouts: 30.2, netCommission: 6.48 },
    { month: 'Sep', gross: 48.6, payouts: 34.0, netCommission: 7.29 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 5-Column Financial Inflow Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        {financeBreakdown.map((item, idx) => (
          <div key={idx} className="sb-card" style={{ padding: '16px 20px', borderLeft: `4px solid ${item.color}` }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--sb-text-muted)', fontWeight: 500 }}>
              {item.label}
            </span>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--sb-text-title)', marginTop: '4px' }}>
              {item.amount}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--sb-text-subtle)' }}>
              {item.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Monthly Run Rate Chart + Gateway Share Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }} className="sb-dashboard-charts-grid">
        
        <div className="sb-card">
          <div className="sb-card-header">
            <div>
              <div className="sb-card-title">
                <TrendingUp size={18} color="var(--sb-primary)" />
                <span>Monthly Revenue & Partner Payout Run-rate</span>
              </div>
              <div className="sb-card-subtitle">
                Gross Inflow vs Tailor/Logistics Payouts vs Net Platform Commission (in ₹ Lakhs)
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '300px', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRunRate} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sb-chart-grid)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--sb-text-muted)" fontSize={11} />
                <YAxis stroke="var(--sb-text-muted)" fontSize={11} tickFormatter={v => `₹${v}L`} />
                <Tooltip
                  formatter={(val, name) => [`₹${val} Lakhs`, name]}
                  contentStyle={{
                    backgroundColor: 'var(--sb-bg-surface)',
                    border: '1px solid var(--sb-border-default)',
                    borderRadius: 'var(--sb-radius-md)',
                    color: 'var(--sb-text-title)',
                    fontSize: '0.8rem'
                  }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '10px', fontSize: '0.75rem' }} />
                <Bar dataKey="gross" name="Gross Revenue" fill="var(--sb-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="payouts" name="Artisan & Courier Payouts" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="netCommission" name="Net Commission (15%)" fill="var(--sb-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Gateway Distribution */}
        <div className="sb-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="sb-card-header">
            <div>
              <div className="sb-card-title">
                <CreditCard size={18} color="var(--sb-primary)" />
                <span>Gateway Share</span>
              </div>
              <div className="sb-card-subtitle">
                Volume processed by provider
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gatewayShares}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={84}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {gatewayShares.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--sb-bg-surface)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip formatter={val => [`${val}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            {gatewayShares.map(gw => (
              <div key={gw.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: gw.color }} />
                  <span style={{ color: 'var(--sb-text-title)' }}>{gw.name}</span>
                </div>
                <strong>{gw.value}%</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Regional City Inflow Table */}
      <div className="sb-card">
        <div className="sb-card-header">
          <div className="sb-card-title">
            <span>City-wise Financial Inflow & Payouts</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: 'var(--sb-bg-surface-subtle)', borderBottom: '1px solid var(--sb-border-default)' }}>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)' }}>City Hub</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)' }}>Orders</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)' }}>Gross Inflow</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)' }}>Tailor Payouts</th>
                <th style={{ padding: '10px 16px', fontSize: '0.74rem', fontWeight: 600, color: 'var(--sb-text-muted)' }}>Net Commission (15%)</th>
              </tr>
            </thead>
            <tbody>
              {LOCATION_ANALYTICS.map((loc, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--sb-border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--sb-text-title)' }}>{loc.city}</td>
                  <td style={{ padding: '12px 16px' }}>{loc.orders.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--sb-primary)' }}>₹{(loc.revenue / 100000).toFixed(1)}L</td>
                  <td style={{ padding: '12px 16px' }}>₹{((loc.revenue * 0.7) / 100000).toFixed(1)}L</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--sb-accent)' }}>₹{((loc.revenue * 0.15) / 100000).toFixed(2)}L</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
