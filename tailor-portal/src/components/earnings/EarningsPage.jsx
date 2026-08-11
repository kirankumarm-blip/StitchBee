import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, CreditCard, Scissors, ShoppingBag, ArrowUpRight, 
  ArrowDownRight, Search, Calendar, ShieldAlert, CheckCircle2, 
  Clock, Download, Filter, RefreshCw, Zap, Sparkles, Trophy
} from 'lucide-react';

// ==================================================
// REUSABLE SUB-COMPONENT 1: EARNINGS SUMMARY CARD
// ==================================================
export function EarningsSummaryCard({ label, value, supportingText, trend, isPositive, icon: Icon, valueColor, iconBg, theme }) {
  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
      borderRadius: '14px',
      padding: '18px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      <div style={{ minWidth: 0 }}>
        <span style={{ 
          fontSize: '10px', 
          fontWeight: 600, 
          textTransform: 'uppercase', 
          letterSpacing: '0.04em',
          color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085',
          display: 'block'
        }}>
          {label}
        </span>
        
        <strong style={{ 
          fontSize: '22px', 
          fontWeight: 700, 
          color: valueColor || (theme === 'dark' ? '#ffffff' : '#172033'),
          display: 'block',
          margin: '4px 0 2px 0',
          lineHeight: '28px'
        }}>
          {value}
        </strong>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {trend && (
            <span style={{ 
              fontSize: '10px', 
              fontWeight: 600, 
              color: isPositive ? '#12B76A' : '#F04438',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px'
            }}>
              {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {trend}
            </span>
          )}
          <span style={{ fontSize: '10px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : '#667085' }}>
            {supportingText}
          </span>
        </div>
      </div>

      <div style={{ 
        width: '42px', 
        height: '42px', 
        borderRadius: '12px', 
        background: iconBg || (theme === 'dark' ? 'rgba(247,37,133,0.12)' : '#FFF0F6'),
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: valueColor || '#F72585',
        flexShrink: 0
      }}>
        <Icon size={20} />
      </div>
    </div>
  );
}

// ==================================================
// REUSABLE SUB-COMPONENT 2: EARNINGS TREND CHART
// ==================================================
export function EarningsTrendChart({ data, range, onRangeChange, liveSeconds, theme }) {
  const formatCurrency = (val) => `₹${val.toLocaleString('en-IN')}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div style={{
          background: theme === 'dark' ? '#1E1B38' : '#172033',
          color: '#ffffff',
          padding: '10px 14px',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          fontSize: '11px',
          border: '1px solid rgba(247,37,133,0.3)'
        }}>
          <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontSize: '10px', marginBottom: '2px' }}>{label || item.date}</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#F72585' }}>{formatCurrency(item.earnings)}</div>
          {item.orders && (
            <div style={{ fontSize: '10px', color: '#12B76A', marginTop: '2px', fontWeight: 500 }}>
              {item.orders} Orders Completed
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
      borderRadius: '16px',
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      {/* Header with Live Sync & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
              Earnings Trend
            </h3>
            
            {/* Live Indicator */}
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '5px', 
              background: 'rgba(18,183,106,0.1)', 
              color: '#12B76A', 
              padding: '3px 8px', 
              borderRadius: '999px',
              fontSize: '10px',
              fontWeight: 600
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#12B76A', display: 'inline-block' }}></span>
              Live · Updated {liveSeconds}s ago
            </span>
          </div>
          <span style={{ fontSize: '11px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', fontWeight: 400 }}>
            Real-time revenue telemetry and trend performance
          </span>
        </div>

        {/* Range Selector */}
        <div style={{ 
          display: 'flex', 
          background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F1F5F9', 
          borderRadius: '8px', 
          padding: '3px' 
        }}>
          {['Today', '7 Days', '30 Days', '3 Months'].map((r) => (
            <button
              key={r}
              onClick={() => onRangeChange(r)}
              style={{
                background: range === r ? '#F72585' : 'transparent',
                color: range === r ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467'),
                border: 'none',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                padding: '6px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div style={{ width: '100%', height: 260 }}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F72585" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#F72585" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10, fill: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085', fontWeight: 500 }} 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                tickFormatter={(v) => `₹${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} 
                tick={{ fontSize: 10, fill: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085', fontWeight: 500 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="earnings" 
                stroke="#F72585" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#earningsGradient)" 
                activeDot={{ r: 6, fill: '#ffffff', stroke: '#F72585', strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#667085', fontSize: '11px' }}>
            No earnings telemetry available for selected timeframe.
          </div>
        )}
      </div>
    </div>
  );
}

// ==================================================
// REUSABLE SUB-COMPONENT 3: EARNINGS CATEGORY DONUT
// ==================================================
export function EarningsCategoryDonut({ data, theme }) {
  const COLORS = ['#F72585', '#7C3AED', '#F5B700', '#0EA5E9'];
  
  const totalRevenue = (data || []).reduce((acc, curr) => acc + (curr.value || 0), 0);

  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
      borderRadius: '16px',
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
        Earnings by Category
      </h3>

      {/* Donut Container with Center Label */}
      <div style={{ position: 'relative', width: '100%', height: 180, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={78}
              paddingAngle={4}
              dataKey="value"
            >
              {(data || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <span style={{ fontSize: '20px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033', lineHeight: '24px' }}>
            ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: '9px', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Total Revenue
          </span>
        </div>
      </div>

      {/* Category Legend List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', paddingTop: '12px' }}>
        {(data || []).map((cat, idx) => {
          const percentage = totalRevenue > 0 ? Math.round((cat.value / totalRevenue) * 100) : 0;
          return (
            <div key={cat.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[idx % COLORS.length] }}></span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>{cat.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '11px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                  ₹{cat.value.toLocaleString('en-IN')}
                </strong>
                <span style={{ fontSize: '10px', fontWeight: 500, color: '#F72585', minWidth: '28px', textAlign: 'right' }}>
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================================================
// REUSABLE SUB-COMPONENT 4: EARNINGS GOAL PROGRESS
// ==================================================
export function EarningsGoalProgress({ currentAmount, goalAmount, theme }) {
  const percentage = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);

  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
          Monthly Goal
        </h4>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#F72585' }}>
          {percentage}%
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>
          ₹{currentAmount.toLocaleString('en-IN')} <span style={{ fontWeight: 400, color: '#667085' }}>/ ₹{goalAmount.toLocaleString('en-IN')}</span>
        </span>
      </div>

      {/* Progress Bar Container */}
      <div style={{
        width: '100%',
        height: '8px',
        background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
        borderRadius: '999px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: '#F72585',
          borderRadius: '999px',
          transition: 'width 500ms ease'
        }} />
      </div>

      <span style={{ fontSize: '10px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', fontWeight: 400 }}>
        {percentage >= 100 ? '🎉 Monthly goal achieved!' : `₹${(goalAmount - currentAmount).toLocaleString('en-IN')} remaining to reach your target.`}
      </span>
    </div>
  );
}

// ==================================================
// REUSABLE SUB-COMPONENT 5: PAYOUT SUMMARY
// ==================================================
export function PayoutSummary({ nextAmount, estimatedDate, totalPayouts, successfulPayouts, failedPayouts, onRequestPayout, theme }) {
  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
      borderRadius: '16px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      {/* Top Banner */}
      <div style={{
        padding: '18px 20px',
        background: 'linear-gradient(135deg, #172033 0%, #1E293B 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#F72585' }}>
          Next Payout
        </span>
        <strong style={{ fontSize: '24px', fontWeight: 700, lineHeight: '30px' }}>
          ₹{nextAmount.toLocaleString('en-IN')}
        </strong>
        <span style={{ fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>
          Estimated on {estimatedDate}
        </span>
      </div>

      {/* Breakdown Rows */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467', fontWeight: 500 }}>Total Payouts</span>
          <strong style={{ fontSize: '11px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>₹{totalPayouts.toLocaleString('en-IN')}</strong>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#12B76A', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={12} /> Successful Payouts
          </span>
          <strong style={{ fontSize: '11px', fontWeight: 700, color: '#12B76A' }}>₹{successfulPayouts.toLocaleString('en-IN')}</strong>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#F04438', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldAlert size={12} /> Failed Payouts
          </span>
          <strong style={{ fontSize: '11px', fontWeight: 700, color: '#F04438' }}>₹{failedPayouts.toLocaleString('en-IN')}</strong>
        </div>

        <button 
          onClick={onRequestPayout}
          style={{
            marginTop: '6px',
            padding: '10px',
            borderRadius: '8px',
            background: '#F72585',
            color: '#ffffff',
            border: 'none',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(247,37,133,0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          Request Instant Payout
        </button>
      </div>
    </div>
  );
}

// ==================================================
// REUSABLE SUB-COMPONENT 6: TOP PERFORMING DAYS
// ==================================================
export function TopPerformingDays({ days, theme }) {
  const sortedDays = [...(days || [])].sort((a, b) => b.amount - a.amount).slice(0, 3);
  const badgeColors = ['#F5B700', '#94A3B8', '#B45309'];

  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
        Top Performing Days
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sortedDays.map((d, idx) => (
          <div key={d.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                width: '18px', 
                height: '18px', 
                borderRadius: '50%', 
                background: badgeColors[idx] || '#F72585', 
                color: '#ffffff', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 700
              }}>
                {idx + 1}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>{d.day}</span>
            </div>
            <strong style={{ fontSize: '11px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
              ₹{d.amount.toLocaleString('en-IN')}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================================================
// REUSABLE SUB-COMPONENT 7: RECENT TRANSACTIONS TABLE
// ==================================================
export function RecentTransactions({ transactions, theme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter transactions
  const filtered = (transactions || []).filter(tx => {
    const matchesSearch = tx.desc.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.order.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || tx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return { bg: '#ECFDF5', color: '#12B76A' };
      case 'Processing':
      case 'Pending':
        return { bg: '#FFFAEB', color: '#F79009' };
      case 'Failed':
        return { bg: '#FEF3F2', color: '#F04438' };
      default:
        return { bg: '#F1F5F9', color: '#64748B' };
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Earning':
        return { bg: '#ECFDF5', color: '#12B76A' };
      case 'Commission':
        return { bg: '#F5F3FF', color: '#7C3AED' };
      case 'Payout':
        return { bg: '#F0F9FF', color: '#0EA5E9' };
      default:
        return { bg: '#F1F5F9', color: '#64748B' };
    }
  };

  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
      borderRadius: '16px',
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
          Recent Transactions
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', color: '#667085' }} />
            <input 
              type="text" 
              placeholder="Search transaction..." 
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{
                padding: '6px 12px 6px 30px',
                fontSize: '11px',
                borderRadius: '8px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC',
                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F8FAFC',
                color: theme === 'dark' ? '#ffffff' : '#1D2939',
                outline: 'none',
                width: '170px'
              }}
            />
          </div>

          {/* Type Filter Pills */}
          <div style={{ display: 'flex', gap: '4px', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F1F5F9', padding: '3px', borderRadius: '8px' }}>
            {['All', 'Earning', 'Commission', 'Payout'].map(type => (
              <button
                key={type}
                onClick={() => { setTypeFilter(type); setCurrentPage(1); }}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: typeFilter === type ? '#F72585' : 'transparent',
                  color: typeFilter === type ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467'),
                  fontSize: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC' }}>
              <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: '10px', fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>Date & Time</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: '10px', fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>Description</th>
              <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: '10px', fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>Order ID</th>
              <th style={{ textAlign: 'right', padding: '10px 8px', fontSize: '10px', fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>Amount</th>
              <th style={{ textAlign: 'center', padding: '10px 8px', fontSize: '10px', fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>Type</th>
              <th style={{ textAlign: 'center', padding: '10px 8px', fontSize: '10px', fontWeight: 600, color: '#667085', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((tx, idx) => {
                const statusB = getStatusBadge(tx.status);
                const typeB = getTypeBadge(tx.type);
                return (
                  <tr key={idx} style={{ borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 8px', fontSize: '11px', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467' }}>{tx.date}</td>
                    <td style={{ padding: '12px 8px', fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>{tx.desc}</td>
                    <td style={{ padding: '12px 8px', fontSize: '11px', fontWeight: 500, color: '#667085' }}>{tx.order}</td>
                    <td style={{ 
                      padding: '12px 8px', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      textAlign: 'right', 
                      color: tx.isNegative ? '#F04438' : (theme === 'dark' ? '#ffffff' : '#172033') 
                    }}>
                      {tx.val}
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '2px 8px', 
                        borderRadius: '999px', 
                        fontSize: '9px', 
                        fontWeight: 600, 
                        background: typeB.bg, 
                        color: typeB.color 
                      }}>
                        {tx.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '3px 8px', 
                        borderRadius: '6px', 
                        fontSize: '9px', 
                        fontWeight: 600, 
                        background: statusB.bg, 
                        color: statusB.color 
                      }}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '24px', fontSize: '11px', color: '#667085' }}>
                  No matching transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '8px' }}>
        <span style={{ fontSize: '10px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', fontWeight: 500 }}>
          Showing {filtered.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} transactions
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            style={{
              padding: '4px 10px',
              fontSize: '10px',
              fontWeight: 600,
              borderRadius: '6px',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC',
              background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
              color: currentPage === 1 ? '#98A2B3' : (theme === 'dark' ? '#ffffff' : '#344054'),
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              style={{
                padding: '4px 8px',
                fontSize: '10px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                background: currentPage === idx + 1 ? '#F72585' : 'transparent',
                color: currentPage === idx + 1 ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467'),
                cursor: 'pointer'
              }}
            >
              {idx + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            style={{
              padding: '4px 10px',
              fontSize: '10px',
              fontWeight: 600,
              borderRadius: '6px',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC',
              background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
              color: currentPage === totalPages ? '#98A2B3' : (theme === 'dark' ? '#ffffff' : '#344054'),
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================================================
// MAIN EARNINGS PAGE COMPONENT
// ==================================================
export default function EarningsPage({ theme }) {
  // Top filter state
  const [filterPeriod, setFilterPeriod] = useState('This Week');
  const [trendRange, setTrendRange] = useState('7 Days');

  // Real-time telemetry sync seconds
  const [liveSeconds, setLiveSeconds] = useState(0);

  // Dynamic Datasets state
  const [earningsData, setEarningsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [goalData, setGoalData] = useState({ current: 31000, goal: 50000 });

  // Mock Transactions list
  const [transactions] = useState([
    { date: '08 Jun 2026, 06:30 PM', desc: 'Order Payment - Priya Sharma', order: '#ORD-1024', val: '₹2,850', type: 'Earning', status: 'Completed' },
    { date: '08 Jun 2026, 03:15 PM', desc: 'Order Payment - Amit Verma', order: '#ORD-1023', val: '₹1,950', type: 'Earning', status: 'Completed' },
    { date: '07 Jun 2026, 07:45 PM', desc: 'Order Payment - Megha Reddy', order: '#ORD-1022', val: '₹3,250', type: 'Earning', status: 'Completed' },
    { date: '07 Jun 2026, 02:30 PM', desc: 'Platform Commission (5%)', order: 'COMM-8821', val: '-₹362', type: 'Commission', status: 'Completed', isNegative: true },
    { date: '07 Jun 2026, 11:10 AM', desc: 'Weekly Payout Initiated', order: 'PAYOUT-1012', val: '₹5,000', type: 'Payout', status: 'Processing' },
    { date: '06 Jun 2026, 05:20 PM', desc: 'Order Payment - Sneha Iyer', order: '#ORD-1021', val: '₹4,120', type: 'Earning', status: 'Completed' },
    { date: '05 Jun 2026, 01:10 PM', desc: 'Order Payment - Neha Singh', order: '#ORD-1020', val: '₹1,800', type: 'Earning', status: 'Completed' },
    { date: '04 Jun 2026, 04:00 PM', desc: 'Order Payment - Vikram Seth', order: '#ORD-1019', val: '₹5,420', type: 'Earning', status: 'Completed' },
    { date: '03 Jun 2026, 09:30 AM', desc: 'Payout Transfer', order: 'PAYOUT-1011', val: '₹8,500', type: 'Payout', status: 'Completed' },
    { date: '02 Jun 2026, 02:15 PM', desc: 'Order Payment - Ananya Goel', order: '#ORD-1018', val: '₹2,100', type: 'Earning', status: 'Completed' }
  ]);

  // Top Performing Days Dataset
  const [performingDays] = useState([
    { day: 'Friday', amount: 5420 },
    { day: 'Tuesday', amount: 4850 },
    { day: 'Wednesday', amount: 3250 },
    { day: 'Monday', amount: 1250 },
    { day: 'Thursday', amount: 2100 }
  ]);

  // Polling simulation effect (30s ticker)
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveSeconds(prev => (prev >= 30 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update dynamic trend chart data whenever filter/range changes
  useEffect(() => {
    if (filterPeriod === 'This Week' || trendRange === '7 Days') {
      setEarningsData([
        { date: 'Jun 02', earnings: 2100, orders: 3 },
        { date: 'Jun 03', earnings: 3250, orders: 4 },
        { date: 'Jun 04', earnings: 5420, orders: 8 },
        { date: 'Jun 05', earnings: 1800, orders: 2 },
        { date: 'Jun 06', earnings: 4120, orders: 6 },
        { date: 'Jun 07', earnings: 2850, orders: 4 },
        { date: 'Jun 08', earnings: 4800, orders: 7 }
      ]);
      setCategoryData([
        { name: 'Custom Stitching', value: 12450 },
        { name: 'Alterations', value: 3250 },
        { name: 'Fabric & Materials', value: 2100 },
        { name: 'Doorstep Fitting', value: 950 }
      ]);
    } else if (filterPeriod === 'This Month' || trendRange === '30 Days') {
      setEarningsData([
        { date: 'Week 1', earnings: 14200, orders: 18 },
        { date: 'Week 2', earnings: 18750, orders: 24 },
        { date: 'Week 3', earnings: 23600, orders: 31 },
        { date: 'Week 4', earnings: 15850, orders: 20 }
      ]);
      setCategoryData([
        { name: 'Custom Stitching', value: 47060 },
        { name: 'Alterations', value: 14480 },
        { name: 'Fabric & Materials', value: 7240 },
        { name: 'Doorstep Fitting', value: 3620 }
      ]);
    } else {
      setEarningsData([
        { date: 'Jan', earnings: 32000, orders: 42 },
        { date: 'Feb', earnings: 38500, orders: 48 },
        { date: 'Mar', earnings: 45000, orders: 56 },
        { date: 'Apr', earnings: 42100, orders: 51 },
        { date: 'May', earnings: 58400, orders: 74 },
        { date: 'Jun', earnings: 72400, orders: 93 },
        { date: 'Jul', earnings: 51200, orders: 63 }
      ]);
      setCategoryData([
        { name: 'Custom Stitching', value: 372776 },
        { name: 'Alterations', value: 98676 },
        { name: 'Fabric & Materials', value: 49338 },
        { name: 'Doorstep Fitting', value: 27410 }
      ]);
    }
  }, [filterPeriod, trendRange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* PAGE TITLE & TOP FILTERS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#172033' }}>
            Earnings Overview
          </h2>
          <span style={{ fontSize: '12px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085' }}>
            Track your income, payouts and real-time chart performance.
          </span>
        </div>

        {/* Top Period Filters */}
        <div style={{ display: 'flex', gap: '6px', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', padding: '4px', borderRadius: '10px' }}>
          {['This Week', 'This Month', 'This Year'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPeriod(p)}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '7px',
                border: 'none',
                cursor: 'pointer',
                background: filterPeriod === p ? '#F72585' : 'transparent',
                color: filterPeriod === p ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#172033'),
                transition: 'all 0.2s ease'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* SUMMARY CARDS ROW (4-COLUMN GRID) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <EarningsSummaryCard 
          label="Total Earnings" 
          value={filterPeriod === 'This Month' ? '₹72,400' : (filterPeriod === 'This Year' ? '₹5,48,200' : '₹18,750')} 
          valueColor={theme === 'dark' ? '#ffffff' : '#172033'} 
          trend="↑ 12% this week" 
          isPositive={true} 
          supportingText="Gross order revenue" 
          icon={TrendingUp} 
          iconBg={theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9'} 
          theme={theme}
        />
        <EarningsSummaryCard 
          label="Pending Payouts" 
          value={filterPeriod === 'This Month' ? '₹24,100' : (filterPeriod === 'This Year' ? '₹38,500' : '₹12,350')} 
          valueColor="#F79009" 
          trend="Auto releases daily" 
          isPositive={true} 
          supportingText="In clearance cycle" 
          icon={CreditCard} 
          iconBg={theme === 'dark' ? 'rgba(247,144,9,0.12)' : '#FFFAEB'} 
          theme={theme}
        />
        <EarningsSummaryCard 
          label="Commission (5%)" 
          value={filterPeriod === 'This Month' ? '₹3,620' : (filterPeriod === 'This Year' ? '₹27,410' : '₹937')} 
          valueColor="#7C3AED" 
          trend="Platform fee" 
          isPositive={true} 
          supportingText="Service fee deducted" 
          icon={Scissors} 
          iconBg={theme === 'dark' ? 'rgba(124,58,237,0.12)' : '#F5F3FF'} 
          theme={theme}
        />
        <EarningsSummaryCard 
          label="Net Earnings" 
          value={filterPeriod === 'This Month' ? '₹68,780' : (filterPeriod === 'This Year' ? '₹5,20,790' : '₹17,813')} 
          valueColor="#12B76A" 
          trend="↑ 8% from last week" 
          isPositive={true} 
          supportingText="Take-home income" 
          icon={ShoppingBag} 
          iconBg={theme === 'dark' ? 'rgba(18,183,106,0.12)' : '#ECFDF5'} 
          theme={theme}
        />
      </div>

      {/* MAIN DASHBOARD GRID: 75% MAIN / 25% SIDEBAR */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'stretch' }}>
        
        {/* MAIN CONTENT AREA (75% width) */}
        <div style={{ flex: '3', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Trend Chart & Category Donut Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ flex: '2' }}>
              <EarningsTrendChart 
                data={earningsData} 
                range={trendRange} 
                onRangeChange={setTrendRange} 
                liveSeconds={liveSeconds} 
                theme={theme}
              />
            </div>
            <div style={{ flex: '1' }}>
              <EarningsCategoryDonut 
                data={categoryData} 
                theme={theme}
              />
            </div>
          </div>

          {/* Recent Transactions Table */}
          <RecentTransactions 
            transactions={transactions} 
            theme={theme}
          />
        </div>

        {/* RIGHT SIDEBAR (25% width) */}
        <div style={{ flex: '1', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Payout Summary */}
          <PayoutSummary 
            nextAmount={12350}
            estimatedDate="30 Jun 2026"
            totalPayouts={125000}
            successfulPayouts={118650}
            failedPayouts={6350}
            onRequestPayout={() => alert("Instant Payout Request submitted for ₹12,350")}
            theme={theme}
          />

          {/* Top Performing Days */}
          <TopPerformingDays 
            days={performingDays} 
            theme={theme}
          />

          {/* Earnings Goal Progress */}
          <EarningsGoalProgress 
            currentAmount={goalData.current} 
            goalAmount={goalData.goal} 
            theme={theme}
          />

          {/* Insights Pro Card */}
          <div style={{
            background: theme === 'dark' ? 'rgba(124,58,237,0.1)' : '#F5F3FF',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '16px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} style={{ color: '#7C3AED' }} />
              <strong style={{ fontSize: '13px', fontWeight: 700, color: '#7C3AED' }}>Growth Analytics Insight</strong>
            </div>
            <span style={{ fontSize: '11px', color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467', lineHeight: '16px' }}>
              Your net revenue is 18% higher this period. Custom Stitching accounts for 66% of total revenue.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
