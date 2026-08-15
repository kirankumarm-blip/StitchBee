import React, { useState } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { 
  Wallet, Clock, Banknote, Receipt, Download, Calendar, ArrowUpRight, ArrowDownRight, 
  Sparkles, Info, Star, Award, TrendingUp, ChevronDown, CheckCircle2, ShieldCheck,
  Building, RefreshCw, Eye
} from 'lucide-react';
import '../../styles/dashboard.css';

export default function DesignerEarningsWorkspace({
  theme = 'light',
  onNavigateTab
}) {
  const isDark = theme === 'dark';

  // Brand Color Tokens
  const primaryPink = '#EC167F';
  const primaryPinkHover = '#D91472';
  const lightPink = '#FFF0F7';
  const pinkBorder = '#F7B6D5';
  
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const pageBg = isDark ? '#0D0A1A' : '#F7F8FA';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E5E7EB';
  const softBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#EEF0F3';
  const textColor = isDark ? '#F9FAFB' : '#172033';
  const secTextColor = isDark ? '#A0AEC0' : '#667085';
  const mutedTextColor = isDark ? '#718096' : '#98A2B3';
  const inputBg = isDark ? '#231D34' : '#FFFFFF';
  const itemBg = isDark ? 'rgba(255, 255, 255, 0.04)' : '#FAFBFC';

  // Timeframe & Filter States
  const [dateRange, setDateRange] = useState('01 May 2025 – 31 May 2025');
  const [chartTimeframe, setChartTimeframe] = useState('Monthly'); // 'Monthly' | 'Quarterly' | 'Yearly'
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);

  // Revenue Performance Chart Data (Matching Exact Image Dataset)
  const revenuePerformanceData = [
    { month: 'Jan', totalEarnings: 22150, completedPayouts: 12500, pendingPayouts: 9650 },
    { month: 'Feb', totalEarnings: 26450, completedPayouts: 18200, pendingPayouts: 8250 },
    { month: 'Mar', totalEarnings: 24800, completedPayouts: 17750, pendingPayouts: 7050 },
    { month: 'Apr', totalEarnings: 36100, completedPayouts: 23600, pendingPayouts: 12500 },
    { month: 'May', totalEarnings: 40250, completedPayouts: 29450, pendingPayouts: 10800 },
    { month: 'Jun', totalEarnings: 48200, completedPayouts: 35850, pendingPayouts: 12350 }
  ];

  // Earnings by Category Donut Chart Data
  const categoryData = [
    { name: 'Bridal Wear', value: 22450, percentage: '46.7%', color: '#EC167F' },
    { name: 'Anarkali', value: 12850, percentage: '26.7%', color: '#7C3AED' },
    { name: 'Sarees', value: 9600, percentage: '20.0%', color: '#3B82F6' },
    { name: 'Shirt & Trousers', value: 6750, percentage: '14.1%', color: '#16A36A' },
    { name: 'Indo-Western', value: 3250, percentage: '6.7%', color: '#F59E0B' },
    { name: 'Others', value: 1100, percentage: '2.3%', color: '#98A2B3' }
  ];

  // Custom Chart Tooltip
  const CustomRevenueTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: isDark ? '#1F1B2E' : '#FFFFFF',
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          padding: '10px 14px',
          boxShadow: '0 6px 18px rgba(16,24,40,0.12)',
          fontSize: '12px',
          color: textColor
        }}>
          <div style={{ fontWeight: 700, color: textColor, marginBottom: '6px' }}>{label} 2025</div>
          <div style={{ color: '#EC167F', fontWeight: 600 }}>● Total Earnings: ₹{payload[0]?.value?.toLocaleString()}</div>
          <div style={{ color: '#16A36A', fontWeight: 600 }}>● Completed Payouts: ₹{payload[1]?.value?.toLocaleString()}</div>
          <div style={{ color: '#F59E0B', fontWeight: 600 }}>● Pending Payouts: ₹{payload[2]?.value?.toLocaleString()}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: pageBg,
      color: textColor,
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      boxSizing: 'border-box',
      padding: '24px 28px'
    }}>
      
      {/* 100% Dynamic Screen Width Container (No side gaps) */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ==================================================================== */}
        {/* 1. PAGE HEADER & EXPORT ACTIONS                                      */}
        {/* ==================================================================== */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, lineHeight: '32px', color: textColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
              Designer Earnings Overview <Sparkles size={18} color={primaryPink} />
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: secTextColor, fontWeight: 400, lineHeight: '20px' }}>
              Track your earnings, payouts, and performance insights all in one place.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Date Selector */}
            <select 
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              style={{
                height: '40px',
                padding: '0 14px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                background: cardBg,
                fontSize: '13px',
                fontWeight: 600,
                color: textColor,
                cursor: 'pointer',
                outline: 'none',
                minWidth: '220px'
              }}
            >
              <option value="01 May 2025 – 31 May 2025">📅 01 May 2025 – 31 May 2025</option>
              <option value="01 Apr 2025 – 30 Apr 2025">📅 01 Apr 2025 – 30 Apr 2025</option>
              <option value="01 Jan 2025 – 31 Dec 2025">📅 Year 2025 Full</option>
            </select>

            {/* Export Report Button */}
            <button 
              onClick={() => alert("Downloading Designer Financial Earnings Report PDF...")}
              style={{
                height: '40px',
                padding: '0 18px',
                background: primaryPink,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(236,22,127,0.25)'
              }}
            >
              <Download size={15} color="#FFFFFF" />
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Export Report</span>
            </button>

          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. 4 LARGE KPI CARDS (25% | 25% | 25% | 25% EQUAL GRID)              */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          width: '100%'
        }}>
          
          {/* KPI Card 1 — Total Earnings */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '14px',
            padding: '18px',
            boxShadow: '0 2px 8px rgba(16,24,40,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '142px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Wallet size={22} color={primaryPink} />
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Total Earnings <Info size={13} color={secTextColor} />
                  </span>
                  <strong style={{ fontSize: '26px', fontWeight: 700, color: primaryPink, lineHeight: 1.15, marginTop: '4px', display: 'block' }}>
                    ₹48,200
                  </strong>
                  <span style={{ fontSize: '11px', color: '#16A36A', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <ArrowUpRight size={13} color="#16A36A" /> 18.6% vs Apr 2025
                  </span>
                </div>
              </div>

              {/* Pink Sparkline SVG with Dots & Gradient Fill */}
              <div style={{ width: '95px', height: '52px', flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 95 52">
                  <defs>
                    <linearGradient id="pinkSparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC167F" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#EC167F" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <polygon points="0,52 0,38 15,26 30,34 45,18 60,28 75,12 95,4 95,52" fill="url(#pinkSparkGrad)" />
                  <path d="M0,38 L15,26 L30,34 L45,18 L60,28 L75,12 L95,4" fill="none" stroke="#EC167F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="0" cy="38" r="3" fill="#EC167F" />
                  <circle cx="15" cy="26" r="3" fill="#EC167F" />
                  <circle cx="30" cy="34" r="3" fill="#EC167F" />
                  <circle cx="45" cy="18" r="3" fill="#EC167F" />
                  <circle cx="60" cy="28" r="3" fill="#EC167F" />
                  <circle cx="75" cy="12" r="3" fill="#EC167F" />
                  <circle cx="95" cy="4" r="3.5" fill="#EC167F" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <button 
                onClick={() => alert("Viewing detailed total earnings breakdown...")}
                style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}
              >
                View details →
              </button>
            </div>
          </div>

          {/* KPI Card 2 — Pending Payouts */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '14px',
            padding: '18px',
            boxShadow: '0 2px 8px rgba(16,24,40,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '142px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: isDark ? 'rgba(245,158,11,0.2)' : '#FFF7E6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={22} color="#F59E0B" />
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Pending Payouts <Info size={13} color={secTextColor} />
                  </span>
                  <strong style={{ fontSize: '26px', fontWeight: 700, color: '#F59E0B', lineHeight: 1.15, marginTop: '4px', display: 'block' }}>
                    ₹12,350
                  </strong>
                  <span style={{ fontSize: '11px', color: secTextColor, fontWeight: 500, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="#F59E0B" /> 2 payouts pending
                  </span>
                </div>
              </div>

              {/* Orange Sparkline SVG with Dots & Gradient Fill */}
              <div style={{ width: '95px', height: '52px', flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 95 52">
                  <defs>
                    <linearGradient id="orangeSparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <polygon points="0,52 0,40 15,28 30,36 45,20 60,30 75,16 95,8 95,52" fill="url(#orangeSparkGrad)" />
                  <path d="M0,40 L15,28 L30,36 L45,20 L60,30 L75,16 L95,8" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="0" cy="40" r="3" fill="#F59E0B" />
                  <circle cx="15" cy="28" r="3" fill="#F59E0B" />
                  <circle cx="30" cy="36" r="3" fill="#F59E0B" />
                  <circle cx="45" cy="20" r="3" fill="#F59E0B" />
                  <circle cx="60" cy="30" r="3" fill="#F59E0B" />
                  <circle cx="75" cy="16" r="3" fill="#F59E0B" />
                  <circle cx="95" cy="8" r="3.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <button 
                onClick={() => alert("Viewing pending payout schedule...")}
                style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}
              >
                View payouts →
              </button>
            </div>
          </div>

          {/* KPI Card 3 — Completed Payouts */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '14px',
            padding: '18px',
            boxShadow: '0 2px 8px rgba(16,24,40,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '142px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: isDark ? 'rgba(22,163,106,0.2)' : '#ECFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Banknote size={22} color="#16A36A" />
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Completed Payouts <Info size={13} color={secTextColor} />
                  </span>
                  <strong style={{ fontSize: '26px', fontWeight: 700, color: '#16A36A', lineHeight: 1.15, marginTop: '4px', display: 'block' }}>
                    ₹35,850
                  </strong>
                  <span style={{ fontSize: '11px', color: secTextColor, fontWeight: 500, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} color="#16A36A" /> 8 payouts completed
                  </span>
                </div>
              </div>

              {/* Green Sparkline SVG with Dots & Gradient Fill */}
              <div style={{ width: '95px', height: '52px', flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 95 52">
                  <defs>
                    <linearGradient id="greenSparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16A36A" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#16A36A" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <polygon points="0,52 0,36 15,26 30,32 45,14 60,24 75,10 95,6 95,52" fill="url(#greenSparkGrad)" />
                  <path d="M0,36 L15,26 L30,32 L45,14 L60,24 L75,10 L95,6" fill="none" stroke="#16A36A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="0" cy="36" r="3" fill="#16A36A" />
                  <circle cx="15" cy="26" r="3" fill="#16A36A" />
                  <circle cx="30" cy="32" r="3" fill="#16A36A" />
                  <circle cx="45" cy="14" r="3" fill="#16A36A" />
                  <circle cx="60" cy="24" r="3" fill="#16A36A" />
                  <circle cx="75" cy="10" r="3" fill="#16A36A" />
                  <circle cx="95" cy="6" r="3.5" fill="#16A36A" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <button 
                onClick={() => alert("Viewing completed payout history...")}
                style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}
              >
                View history →
              </button>
            </div>
          </div>

          {/* KPI Card 4 — This Month Orders */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: '14px',
            padding: '18px',
            boxShadow: '0 2px 8px rgba(16,24,40,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '142px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: isDark ? 'rgba(124,58,237,0.2)' : '#F4EEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Receipt size={22} color="#7C3AED" />
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: textColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    This Month Orders <Info size={13} color={secTextColor} />
                  </span>
                  <strong style={{ fontSize: '26px', fontWeight: 700, color: '#7C3AED', lineHeight: 1.15, marginTop: '4px', display: 'block' }}>
                    32
                  </strong>
                  <span style={{ fontSize: '11px', color: '#16A36A', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <ArrowUpRight size={13} color="#16A36A" /> 12 vs Apr 2025
                  </span>
                </div>
              </div>

              {/* Purple Sparkline SVG with Dots & Gradient Fill */}
              <div style={{ width: '95px', height: '52px', flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 95 52">
                  <defs>
                    <linearGradient id="purpleSparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <polygon points="0,52 0,38 15,24 30,32 45,14 60,26 75,12 95,4 95,52" fill="url(#purpleSparkGrad)" />
                  <path d="M0,38 L15,24 L30,32 L45,14 L60,26 L75,12 L95,4" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="0" cy="38" r="3" fill="#7C3AED" />
                  <circle cx="15" cy="24" r="3" fill="#7C3AED" />
                  <circle cx="30" cy="32" r="3" fill="#7C3AED" />
                  <circle cx="45" cy="14" r="3" fill="#7C3AED" />
                  <circle cx="60" cy="26" r="3" fill="#7C3AED" />
                  <circle cx="75" cy="12" r="3" fill="#7C3AED" />
                  <circle cx="95" cy="4" r="3.5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <button 
                onClick={() => onNavigateTab && onNavigateTab('orders')}
                style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}
              >
                View orders →
              </button>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 3. MAIN ANALYTICS ROW (60% REVENUE PERFORMANCE / 40% CATEGORY)      */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60% 40%',
          gap: '16px',
          width: '100%',
          alignItems: 'stretch'
        }}>
          
          {/* LEFT 60% — REVENUE PERFORMANCE MULTI-LINE SPLINE CHART WITH DATA BADGES */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(16,24,40,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Revenue Performance <Info size={14} color={secTextColor} />
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', fontWeight: 600, marginTop: '6px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: primaryPink }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: primaryPink }} /> Total Earnings (₹)
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#16A36A' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A36A' }} /> Completed Payouts (₹)
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#F59E0B' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} /> Pending Payouts (₹)
                  </span>
                </div>
              </div>

              {/* Premium Timeframe Filter Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: isDark ? '#231D34' : '#F1F5F9', border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '3px' }}>
                {['Monthly', 'Quarterly', 'Yearly'].map(tf => {
                  const isActive = chartTimeframe === tf;
                  return (
                    <button
                      key={tf}
                      onClick={() => setChartTimeframe(tf)}
                      style={{
                        padding: '6px 14px',
                        fontSize: '11px',
                        fontWeight: 700,
                        borderRadius: '7px',
                        border: 'none',
                        background: isActive ? '#EC167F' : 'transparent',
                        color: isActive ? '#FFFFFF' : secTextColor,
                        boxShadow: isActive ? '0 2px 10px rgba(236,22,127,0.4)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ color: isActive ? '#FFFFFF' : secTextColor, fontWeight: 700 }}>
                        {tf}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recharts Multi-Area Curve Chart with Vertex Data Badges */}
            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenuePerformanceData} margin={{ top: 25, right: 25, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="totalEarningsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EC167F" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#EC167F" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="completedPayoutsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A36A" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#16A36A" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="pendingPayoutsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={softBorderColor} vertical={false} opacity={0.7} />
                  <XAxis dataKey="month" stroke={secTextColor} fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke={secTextColor} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v / 1000}K`} domain={[0, 60000]} />
                  <Tooltip content={<CustomRevenueTooltip />} />
                  
                  {/* Total Earnings Area & Line */}
                  <Area 
                    type="monotone" 
                    dataKey="totalEarnings" 
                    stroke="#EC167F" 
                    strokeWidth={3} 
                    fill="url(#totalEarningsGrad)" 
                    dot={(props) => {
                      const { cx, cy, value, index } = props;
                      if (!cx || !cy) return null;
                      return (
                        <g key={`pink-dot-${index}`}>
                          <circle cx={cx} cy={cy} r={4.5} fill="#EC167F" stroke="#FFFFFF" strokeWidth={2} />
                          <rect x={cx - 22} y={cy - 20} width={44} height={14} rx={4} fill="#FFF0F7" stroke="#F8B5D5" strokeWidth={0.8} />
                          <text x={cx} y={cy - 9} fill="#EC167F" fontSize={9} fontWeight={700} textAnchor="middle">{value?.toLocaleString()}</text>
                        </g>
                      );
                    }} 
                  />

                  {/* Completed Payouts Area & Line */}
                  <Area 
                    type="monotone" 
                    dataKey="completedPayouts" 
                    stroke="#16A36A" 
                    strokeWidth={2.5} 
                    fill="url(#completedPayoutsGrad)" 
                    dot={(props) => {
                      const { cx, cy, value, index } = props;
                      if (!cx || !cy) return null;
                      return (
                        <g key={`green-dot-${index}`}>
                          <circle cx={cx} cy={cy} r={4} fill="#16A36A" stroke="#FFFFFF" strokeWidth={2} />
                          <rect x={cx - 22} y={cy + 8} width={44} height={14} rx={4} fill="#ECFDF3" stroke="#B7E8CF" strokeWidth={0.8} />
                          <text x={cx} y={cy + 18} fill="#16A36A" fontSize={8.5} fontWeight={700} textAnchor="middle">{value?.toLocaleString()}</text>
                        </g>
                      );
                    }} 
                  />

                  {/* Pending Payouts Area & Line */}
                  <Area 
                    type="monotone" 
                    dataKey="pendingPayouts" 
                    stroke="#F59E0B" 
                    strokeWidth={2.5} 
                    fill="url(#pendingPayoutsGrad)" 
                    dot={(props) => {
                      const { cx, cy, value, index } = props;
                      if (!cx || !cy) return null;
                      return (
                        <g key={`orange-dot-${index}`}>
                          <circle cx={cx} cy={cy} r={4} fill="#F59E0B" stroke="#FFFFFF" strokeWidth={2} />
                          <rect x={cx - 22} y={cy + 8} width={44} height={14} rx={4} fill="#FFF7E6" stroke="#FAD89B" strokeWidth={0.8} />
                          <text x={cx} y={cy + 18} fill="#F59E0B" fontSize={8.5} fontWeight={700} textAnchor="middle">{value?.toLocaleString()}</text>
                        </g>
                      );
                    }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', fontSize: '10px', color: secTextColor, marginTop: '4px' }}>
              <span>All amounts are in INR (₹)</span>
              <Info size={12} color={secTextColor} />
            </div>
          </div>

          {/* RIGHT 40% — EARNINGS BY CATEGORY ENLARGED DONUT CHART */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(16,24,40,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
                Earnings by Category <Info size={14} color={secTextColor} />
              </h3>

              <select 
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                style={{ height: '32px', padding: '0 10px', borderRadius: '7px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
              >
                <option value="All Categories">All Categories</option>
                <option value="Bridal Wear">Bridal Wear</option>
                <option value="Anarkali">Anarkali</option>
              </select>
            </div>

            {/* Enlarged Donut Chart (210px x 210px) + Category Legend Grid with Bi-directional Hover */}
            <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: '16px', alignItems: 'center', margin: '8px 0' }}>
              
              {/* Enlarged Donut Container with Dynamic Center Label */}
              <div style={{ width: '210px', height: '210px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                      onMouseEnter={(_, idx) => setHoveredCategoryIndex(idx)}
                      onMouseLeave={() => setHoveredCategoryIndex(null)}
                    >
                      {categoryData.map((entry, index) => {
                        const isHovered = hoveredCategoryIndex === index;
                        return (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke={isHovered ? '#FFFFFF' : 'none'}
                            strokeWidth={isHovered ? 3 : 0}
                            opacity={hoveredCategoryIndex === null || isHovered ? 1 : 0.4}
                            style={{ 
                              transform: isHovered ? 'scale(1.06)' : 'scale(1)', 
                              transformOrigin: 'center center', 
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                              cursor: 'pointer',
                              filter: isHovered ? `drop-shadow(0 4px 12px ${entry.color}88)` : 'none'
                            }}
                          />
                        );
                      })}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center Label: Switches dynamically on hover */}
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)', 
                  textAlign: 'center',
                  transition: 'all 0.25s ease',
                  pointerEvents: 'none',
                  width: '120px'
                }}>
                  {hoveredCategoryIndex !== null ? (
                    <>
                      <span style={{ fontSize: '10px', color: categoryData[hoveredCategoryIndex].color, fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {categoryData[hoveredCategoryIndex].name}
                      </span>
                      <strong style={{ fontSize: '18px', fontWeight: 700, color: categoryData[hoveredCategoryIndex].color, display: 'block', lineHeight: 1.15, margin: '2px 0' }}>
                        ₹{categoryData[hoveredCategoryIndex].value.toLocaleString()}
                      </strong>
                      <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 600 }}>
                        {categoryData[hoveredCategoryIndex].percentage}
                      </span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '11px', color: secTextColor, fontWeight: 500, display: 'block' }}>Total</span>
                      <strong style={{ fontSize: '20px', fontWeight: 700, color: textColor, display: 'block', lineHeight: 1.1 }}>₹48,200</strong>
                    </>
                  )}
                </div>
              </div>

              {/* Category Breakdown Table with Interactive Hover Sync */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
                {categoryData.map((c, idx) => {
                  const isHovered = hoveredCategoryIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      onMouseEnter={() => setHoveredCategoryIndex(idx)}
                      onMouseLeave={() => setHoveredCategoryIndex(null)}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: isHovered ? (isDark ? 'rgba(236,22,127,0.18)' : '#FFF0F7') : 'transparent',
                        border: isHovered ? `1px solid ${pinkBorder}` : '1px solid transparent',
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                        boxShadow: isHovered ? '0 2px 8px rgba(236,22,127,0.15)' : 'none',
                        transition: 'all 0.25s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: c.color, boxShadow: isHovered ? `0 0 8px ${c.color}` : 'none' }} />
                        <span style={{ color: isHovered ? primaryPink : textColor, fontWeight: isHovered ? 700 : 500 }}>{c.name}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <strong style={{ color: isHovered ? primaryPink : textColor, fontWeight: isHovered ? 700 : 600 }}>₹{c.value.toLocaleString()}</strong>
                        <span style={{ color: isHovered ? primaryPink : secTextColor, fontSize: '10px', width: '38px', textAlign: 'right', fontWeight: isHovered ? 700 : 500 }}>{c.percentage}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Top Earning Category Highlight Card matching reference screenshot */}
            <div style={{ 
              background: isDark ? 'rgba(236,22,127,0.1)' : '#FFF8FC', 
              border: `1px solid ${pinkBorder}`, 
              borderRadius: '12px', 
              padding: '12px 18px', 
              display: 'flex', 
              alignItems: 'center', 
              justify: 'space-between', 
              height: '64px', 
              marginTop: '8px',
              position: 'relative',
              boxSizing: 'border-box'
            }}>
              {/* Left Side: Pink Dress Icon & Category Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2 }}>
                <span style={{ fontSize: '22px', display: 'flex', alignItems: 'center' }}>👗</span>
                <div>
                  <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500, display: 'block' }}>Top Earning Category</span>
                  <strong style={{ fontSize: '14px', fontWeight: 700, color: primaryPink, display: 'block', marginTop: '1px' }}>Bridal Wear</strong>
                </div>
              </div>

              {/* Middle Right: Amount & Percentage */}
              <div style={{ textAlign: 'right', zIndex: 2, marginRight: '75px' }}>
                <strong style={{ fontSize: '15px', fontWeight: 700, color: primaryPink, display: 'block' }}>₹22,450</strong>
                <span style={{ fontSize: '10px', color: secTextColor, display: 'block', marginTop: '1px' }}>46.7% of total earnings</span>
              </div>

              {/* Far Right: 3D Pink Mannequin Illustration aligned to bottom right base */}
              <img 
                src="/images/mannequin.png" 
                alt="Mannequin Illustration" 
                style={{ 
                  height: '74px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  position: 'absolute',
                  right: '8px',
                  bottom: '-8px',
                  zIndex: 1,
                  filter: 'drop-shadow(0 2px 6px rgba(236,22,127,0.25))'
                }} 
              />
            </div>

          </div>

        </div>

        {/* ==================================================================== */}
        {/* 4. SECONDARY SECTION (32% SUMMARY | 36% RECENT PAYOUTS | 32% PENDING) */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '32% 36% 32%',
          gap: '16px',
          width: '100%',
          alignItems: 'stretch'
        }}>
          
          {/* COLUMN 1: EARNINGS SUMMARY (4 METRICS + LIFETIME EARNINGS CARD) */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
              Earnings Summary <Info size={14} color={secTextColor} />
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '12px 0' }}>
              {/* Metric 1 — Avg Order Value */}
              <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp size={14} color={primaryPink} />
                  </div>
                  <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500 }}>Average Order Value</span>
                </div>
                <strong style={{ fontSize: '16px', fontWeight: 700, color: textColor, display: 'block' }}>₹1,506</strong>
                <span style={{ fontSize: '10px', color: '#16A36A', fontWeight: 600, marginTop: '2px', display: 'block' }}>↑ 8.4%</span>
              </div>

              {/* Metric 2 — Total Orders Completed */}
              <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isDark ? 'rgba(59,130,246,0.2)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Receipt size={14} color="#3B82F6" />
                  </div>
                  <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500 }}>Total Orders Completed</span>
                </div>
                <strong style={{ fontSize: '16px', fontWeight: 700, color: textColor, display: 'block' }}>128</strong>
                <span style={{ fontSize: '10px', color: '#16A36A', fontWeight: 600, marginTop: '2px', display: 'block' }}>↑ 16</span>
              </div>

              {/* Metric 3 — Payout Success Rate */}
              <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isDark ? 'rgba(124,58,237,0.2)' : '#F4EEFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={14} color="#7C3AED" />
                  </div>
                  <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500 }}>Payout Success Rate</span>
                </div>
                <strong style={{ fontSize: '16px', fontWeight: 700, color: textColor, display: 'block' }}>98.6%</strong>
                <span style={{ fontSize: '10px', color: '#16A36A', fontWeight: 600, marginTop: '2px', display: 'block' }}>↑ 2.1%</span>
              </div>

              {/* Metric 4 — Repeat Client Rate */}
              <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isDark ? 'rgba(22,163,106,0.2)' : '#ECFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={14} color="#16A36A" />
                  </div>
                  <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500 }}>Repeat Client Rate</span>
                </div>
                <strong style={{ fontSize: '16px', fontWeight: 700, color: textColor, display: 'block' }}>62%</strong>
                <span style={{ fontSize: '10px', color: '#16A36A', fontWeight: 600, marginTop: '2px', display: 'block' }}>↑ 5%</span>
              </div>
            </div>

            {/* Lifetime Earnings Highlighted Card */}
            <div style={{ background: isDark ? 'rgba(245,158,11,0.12)' : '#FFF9EC', border: `1px solid ${isDark ? 'rgba(245,158,11,0.3)' : '#FDE68A'}`, borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={16} color="#FFFFFF" fill="#FFFFFF" />
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500, display: 'block' }}>Lifetime Earnings</span>
                  <strong style={{ fontSize: '16px', fontWeight: 700, color: textColor, display: 'block' }}>₹4,85,650</strong>
                </div>
              </div>

              <button onClick={() => alert("Viewing lifetime financial stats...")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>
                View all-time stats →
              </button>
            </div>
          </div>

          {/* COLUMN 2: RECENT PAYOUTS COMPACT TABLE */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor }}>Recent Payouts</h3>
              <button onClick={() => alert("Viewing all recent payouts...")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View All</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${softBorderColor}`, textAlign: 'left', color: secTextColor }}>
                    <th style={{ padding: '6px 4px', fontWeight: 600 }}>Payout ID</th>
                    <th style={{ padding: '6px 4px', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '6px 4px', fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: '6px 4px', fontWeight: 600 }}>Mode</th>
                    <th style={{ padding: '6px 4px', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#PAYOUT-1289', date: '30 May 2025', amount: '₹8,450', mode: 'Bank Transfer' },
                    { id: '#PAYOUT-1276', date: '20 May 2025', amount: '₹6,750', mode: 'Bank Transfer' },
                    { id: '#PAYOUT-1261', date: '10 May 2025', amount: '₹7,350', mode: 'UPI' },
                    { id: '#PAYOUT-1248', date: '01 May 2025', amount: '₹5,800', mode: 'Bank Transfer' },
                    { id: '#PAYOUT-1240', date: '28 Apr 2025', amount: '₹6,200', mode: 'UPI' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: `1px solid ${softBorderColor}` }}>
                      <td style={{ padding: '8px 4px', fontWeight: 600, color: textColor }}>{row.id}</td>
                      <td style={{ padding: '8px 4px', color: secTextColor }}>{row.date}</td>
                      <td style={{ padding: '8px 4px', fontWeight: 700, color: textColor }}>{row.amount}</td>
                      <td style={{ padding: '8px 4px', color: secTextColor }}>🏦 {row.mode}</td>
                      <td style={{ padding: '8px 4px' }}>
                        <span style={{ fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', background: isDark ? 'rgba(18,183,106,0.2)' : '#ECFDF3', color: '#16A36A' }}>
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* COLUMN 3: PENDING PAYOUTS TABLE & NEXT PAYOUT HIGHLIGHT */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor }}>Pending Payouts</h3>
              <button onClick={() => alert("Viewing all pending payouts...")} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>View All</button>
            </div>

            <div style={{ overflowX: 'auto', marginBottom: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${softBorderColor}`, textAlign: 'left', color: secTextColor }}>
                    <th style={{ padding: '6px 4px', fontWeight: 600 }}>Payout ID</th>
                    <th style={{ padding: '6px 4px', fontWeight: 600 }}>Expected Date</th>
                    <th style={{ padding: '6px 4px', fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: '6px 4px', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#PEND-1297', date: '05 Jun 2025', amount: '₹7,200' },
                    { id: '#PEND-1299', date: '10 Jun 2025', amount: '₹5,150' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: `1px solid ${softBorderColor}` }}>
                      <td style={{ padding: '8px 4px', fontWeight: 600, color: textColor }}>{row.id}</td>
                      <td style={{ padding: '8px 4px', color: secTextColor }}>{row.date}</td>
                      <td style={{ padding: '8px 4px', fontWeight: 700, color: textColor }}>{row.amount}</td>
                      <td style={{ padding: '8px 4px' }}>
                        <span style={{ fontSize: '9px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', background: isDark ? 'rgba(245,158,11,0.2)' : '#FFF7E6', color: '#F59E0B' }}>
                          Processing
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Next Payout Highlight Card */}
            <div style={{ background: isDark ? 'rgba(236,22,127,0.1)' : '#FFF8FC', border: `1px solid ${pinkBorder}`, borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '82px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={18} color={primaryPink} />
                </div>
                <div>
                  <span style={{ fontSize: '10px', color: secTextColor, fontWeight: 500, display: 'block' }}>Next Payout Date</span>
                  <strong style={{ fontSize: '15px', fontWeight: 700, color: textColor, display: 'block' }}>05 June 2025</strong>
                  <span style={{ fontSize: '10px', color: primaryPink, fontWeight: 600 }}>2 payouts scheduled</span>
                </div>
              </div>
              <span style={{ fontSize: '26px' }}>🎁</span>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 5. PERFORMANCE AT A GLANCE & MAY EARNINGS GOAL                       */}
        {/* ==================================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '68% 32%',
          gap: '16px',
          width: '100%',
          alignItems: 'center'
        }}>
          
          {/* LEFT 68% — PERFORMANCE AT A GLANCE */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
              Performance at a Glance <Info size={14} color={secTextColor} />
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {/* Sub-block 1 — Best Day */}
              <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10px', color: secTextColor, display: 'block' }}>Best Day</span>
                  <strong style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginTop: '1px' }}>28 May</strong>
                  <strong style={{ fontSize: '14px', fontWeight: 700, color: primaryPink, display: 'block', marginTop: '2px' }}>₹3,450</strong>
                </div>
                <div style={{ width: '40px', height: '24px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 40 24">
                    <rect x="2" y="10" width="6" height="14" rx="2" fill="#F8B5D5" />
                    <rect x="12" y="5" width="6" height="19" rx="2" fill="#F8B5D5" />
                    <rect x="22" y="2" width="6" height="22" rx="2" fill="#EC167F" />
                    <rect x="32" y="8" width="6" height="16" rx="2" fill="#F8B5D5" />
                  </svg>
                </div>
              </div>

              {/* Sub-block 2 — Best Week */}
              <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10px', color: secTextColor, display: 'block' }}>Best Week</span>
                  <strong style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginTop: '1px' }}>18 - 24 May</strong>
                  <strong style={{ fontSize: '14px', fontWeight: 700, color: '#7C3AED', display: 'block', marginTop: '2px' }}>₹9,850</strong>
                </div>
                <div style={{ width: '40px', height: '24px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 40 24">
                    <rect x="2" y="14" width="6" height="10" rx="2" fill="#DDD0FF" />
                    <rect x="12" y="8" width="6" height="16" rx="2" fill="#DDD0FF" />
                    <rect x="22" y="2" width="6" height="22" rx="2" fill="#7C3AED" />
                    <rect x="32" y="10" width="6" height="14" rx="2" fill="#DDD0FF" />
                  </svg>
                </div>
              </div>

              {/* Sub-block 3 — Best Month */}
              <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10px', color: secTextColor, display: 'block' }}>Best Month</span>
                  <strong style={{ fontSize: '12px', fontWeight: 600, color: textColor, display: 'block', marginTop: '1px' }}>May 2025</strong>
                  <strong style={{ fontSize: '14px', fontWeight: 700, color: '#16A36A', display: 'block', marginTop: '2px' }}>₹48,200</strong>
                </div>
                <div style={{ width: '40px', height: '24px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 40 24">
                    <rect x="2" y="12" width="6" height="12" rx="2" fill="#B7E8CF" />
                    <rect x="12" y="6" width="6" height="18" rx="2" fill="#B7E8CF" />
                    <rect x="22" y="2" width="6" height="22" rx="2" fill="#16A36A" />
                    <rect x="32" y="9" width="6" height="15" rx="2" fill="#B7E8CF" />
                  </svg>
                </div>
              </div>

              {/* Sub-block 4 — Growth This Month */}
              <div style={{ background: itemBg, border: `1px solid ${borderColor}`, borderRadius: '9px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10px', color: secTextColor, display: 'block' }}>Growth This Month</span>
                  <strong style={{ fontSize: '14px', fontWeight: 700, color: '#16A36A', display: 'block', marginTop: '2px' }}>18.6%</strong>
                  <span style={{ fontSize: '10px', color: secTextColor }}>vs Apr 2025</span>
                </div>
                <div style={{ width: '40px', height: '24px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 40 24">
                    <path d="M0,20 Q10,18 20,12 T40,2" fill="none" stroke="#16A36A" strokeWidth="2" />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT 32% — MAY EARNINGS GOAL CARD */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16,24,40,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isDark ? 'rgba(236,22,127,0.2)' : '#FFF0F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={15} color={primaryPink} />
                </div>
                <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: textColor }}>May Earnings Goal</h3>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: primaryPink }}>80%</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: textColor, marginBottom: '6px' }}>
                <span>₹48,200 / ₹60,000</span>
              </div>
              
              {/* Progress Bar Track */}
              <div style={{ width: '100%', height: '8px', borderRadius: '20px', background: isDark ? 'rgba(236,22,127,0.2)' : '#FCE3EF', overflow: 'hidden' }}>
                <div style={{ width: '80%', height: '100%', borderRadius: '20px', background: primaryPink, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
              <span style={{ color: secTextColor }}>You're doing amazing! Keep it up! 🎉</span>
              <button onClick={() => alert("Viewing custom designer targets...")} style={{ border: `1px solid ${borderColor}`, background: cardBg, color: textColor, borderRadius: '6px', padding: '4px 8px', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>
                View Goals
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Statement Footer */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '11px', color: secTextColor, paddingTop: '4px' }}>
          <span>All amounts are in INR (₹) · Data updated today at 10:30 AM</span>
          <Info size={13} color={secTextColor} />
        </div>

      </div>

    </div>
  );
}
