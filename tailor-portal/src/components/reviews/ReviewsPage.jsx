import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, RadialBarChart, RadialBar, PolarAngleAxis, 
  ResponsiveContainer, Tooltip, XAxis 
} from 'recharts';
import { 
  Star, MessageSquare, Smile, CheckCircle2, Filter, Mail, 
  Search, Calendar, ChevronDown, Scissors, Layers, Clock, Sparkles, MoreVertical 
} from 'lucide-react';

// ==================================================
// REUSABLE CHART 1: RATING RADIAL CHART
// ==================================================
export function RatingRadialChart({ rating = 4.8, total = 120, theme }) {
  const data = [{ name: 'Rating', value: rating, max: 5.0, fill: '#F72585' }];

  return (
    <div style={{ position: 'relative', width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="75%" 
          innerRadius="70%" 
          outerRadius="100%" 
          barSize={8} 
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 5]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9' }}
            clockWise
            dataKey="value"
            cornerRadius={4}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ position: 'absolute', top: '48%', textAlign: 'center' }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: '#F72585', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Excellent
        </span>
      </div>
    </div>
  );
}

// ==================================================
// REUSABLE CHART 2: RATING DISTRIBUTION
// ==================================================
export function RatingDistribution({ distribution, totalReviews, theme }) {
  const total = totalReviews || (distribution || []).reduce((acc, curr) => acc + curr.count, 0) || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
      {(distribution || [
        { rating: 5, count: 102 },
        { rating: 4, count: 14 },
        { rating: 3, count: 4 },
        { rating: 2, count: 0 },
        { rating: 1, count: 0 }
      ]).map((item) => {
        const percentage = Math.round((item.count / total) * 100);
        return (
          <div key={item.rating} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px' }}>
            <span style={{ width: '38px', fontWeight: 600, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467' }}>
              {item.rating} Stars
            </span>
            <div style={{
              flex: 1,
              height: '6px',
              background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
              borderRadius: '999px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${percentage}%`,
                height: '100%',
                background: item.count > 0 ? '#F72585' : (theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#CBD5E1'),
                borderRadius: '999px',
                transition: 'width 500ms ease'
              }} />
            </div>
            <span style={{ width: '52px', textAlign: 'right', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085' }}>
              {item.count} ({percentage}%)
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ==================================================
// REUSABLE CHART 3: REVIEWS TREND CHART
// ==================================================
export function ReviewsTrendChart({ data, theme }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: theme === 'dark' ? '#1E1B38' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#1D2939',
          padding: '6px 10px',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          fontSize: '10px',
          border: '1px solid #E4E7EC'
        }}>
          <span style={{ fontWeight: 700 }}>{label}: </span>
          <span style={{ color: '#7C3AED', fontWeight: 700 }}>{payload[0].value} New Reviews</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '55px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="reviews" 
            stroke="#7C3AED" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#purpleAreaGrad)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ==================================================
// REUSABLE CHART 4: RECOMMENDATION TREND CHART
// ==================================================
export function RecommendationTrendChart({ data, theme }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: theme === 'dark' ? '#1E1B38' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#1D2939',
          padding: '6px 10px',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          fontSize: '10px',
          border: '1px solid #E4E7EC'
        }}>
          <span style={{ fontWeight: 700 }}>{label}: </span>
          <span style={{ color: '#12B76A', fontWeight: 700 }}>{payload[0].value}% Recommended</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '55px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="greenAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#12B76A" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#12B76A" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="rate" 
            stroke="#12B76A" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#greenAreaGrad)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ==================================================
// REUSABLE SUB-COMPONENT 5: WHAT CUSTOMERS LOVE
// ==================================================
export function WhatCustomersLove({ items, theme }) {
  const iconsMap = {
    stitching: <Scissors size={14} />,
    fit: <Layers size={14} />,
    delivery: <Clock size={14} />
  };

  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, lineHeight: '20px', color: theme === 'dark' ? '#ffffff' : '#172033' }}>
          What Customers Love
        </h4>
        <span style={{ fontSize: '10px', fontWeight: 600, color: '#F72585', cursor: 'pointer' }} onClick={() => alert("Loading analytical feedback insights...")}>
          View All
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {(items || [
          { title: 'Quality of Stitching', pct: 96, key: 'stitching', bg: 'rgba(247,37,133,0.1)', color: '#F72585' },
          { title: 'Perfect Fit', pct: 93, key: 'fit', bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
          { title: 'On-time Delivery', pct: 90, key: 'delivery', bg: 'rgba(245,183,0,0.15)', color: '#F5B700' }
        ]).map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '28px', 
              height: '28px', 
              borderRadius: '50%', 
              background: item.bg, 
              color: item.color, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0 
            }}>
              {iconsMap[item.key] || <Sparkles size={14} />}
            </div>
            <div>
              <strong style={{ fontSize: '12px', fontWeight: 700, lineHeight: '18px', color: theme === 'dark' ? '#ffffff' : '#1D2939', display: 'block' }}>
                {item.title}
              </strong>
              <span style={{ fontSize: '9px', fontWeight: 500, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085' }}>
                {item.pct}% customers rated 5 stars
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================================================
// REUSABLE SUB-COMPONENT 6: NEED MORE REVIEWS CTA
// ==================================================
export function NeedMoreReviewsCTA({ onRequest, theme }) {
  return (
    <div style={{
      background: theme === 'dark' ? 'linear-gradient(135deg, rgba(247,37,133,0.06) 0%, rgba(124,58,237,0.06) 100%)' : '#FFF0F6',
      border: '1px dashed rgba(247,37,133,0.3)',
      borderRadius: '12px',
      padding: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, lineHeight: '20px', color: '#F72585' }}>
          Need More Reviews?
        </h4>
        <p style={{ margin: '0 0 12px 0', fontSize: '11px', fontWeight: 400, lineHeight: '17px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467' }}>
          Request reviews from your recent customers to boost storefront rankings.
        </p>

        <button
          onClick={onRequest}
          className="btn-text-white-force"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            fontSize: '10px',
            fontWeight: 600,
            lineHeight: '16px',
            borderRadius: '8px',
            background: '#F72585',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(247,37,133,0.25)',
            transition: 'all 0.2s ease'
          }}
        >
          <Mail size={12} /> Request Review
        </button>
      </div>

      {/* Decorative Envelope Badge */}
      <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0, opacity: 0.85 }}>
        ✉️
      </div>
    </div>
  );
}

// ==================================================
// MAIN REVIEWS PAGE COMPONENT
// ==================================================
export default function ReviewsPage({ theme, onRequestReview }) {
  // Filters & State
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [liveSeconds, setLiveSeconds] = useState(0);

  const pageSize = 5;

  // Real-time Live Ticker Effect (30s polling fallback)
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveSeconds(prev => (prev >= 30 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock API Telemetry Data
  const [telemetry] = useState({
    averageRating: 4.8,
    totalReviews: 120,
    newReviews: 12,
    happyCustomers: 98,
    ratingDistribution: [
      { rating: 5, count: 102 },
      { rating: 4, count: 14 },
      { rating: 3, count: 4 },
      { rating: 2, count: 0 },
      { rating: 1, count: 0 }
    ],
    reviewsTrend: [
      { day: 'Mon', reviews: 2 },
      { day: 'Tue', reviews: 1 },
      { day: 'Wed', reviews: 3 },
      { day: 'Thu', reviews: 1 },
      { day: 'Fri', reviews: 4 },
      { day: 'Sat', reviews: 1 },
      { day: 'Sun', reviews: 2 }
    ],
    recommendationTrend: [
      { day: 'Mon', rate: 92 },
      { day: 'Tue', rate: 94 },
      { day: 'Wed', rate: 95 },
      { day: 'Thu', rate: 96 },
      { day: 'Fri', rate: 97 },
      { day: 'Sat', rate: 98 },
      { day: 'Sun', rate: 98 }
    ],
    reviews: [
      { id: 1, author: 'Priya Sharma', orderNo: '#ORD-1024', rating: 5, text: 'Rajesh did an outstanding job on my wedding lehenga. The fit is perfect, and the zari work is extremely premium.', tag: 'Wedding Lehenga', date: '1 week ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
      { id: 2, author: 'Kavitha Iyer', orderNo: '#ORD-1021', rating: 5, text: 'Delivered two silk blouses right on time for the festival. Stitching accuracy and piping detail are top notch!', tag: 'Silk Blouse', date: '2 weeks ago', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
      { id: 3, author: 'Ananya Goel', orderNo: '#ORD-1018', rating: 4, text: 'Great fit on my formal suit trousers. Slightly delayed by 1 day due to fabric delivery, but overall very happy.', tag: 'Formal Suit', date: '3 weeks ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
      { id: 4, author: 'Sneha Reddy', orderNo: '#ORD-1015', rating: 5, text: 'Doorstep fitting service was super convenient! The master tailor adjusted the armhole perfectly at my home.', tag: 'Designer Kurti', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200' },
      { id: 5, author: 'Vikram Seth', orderNo: '#ORD-1012', rating: 5, text: 'Excellent craftsmanship on 3-piece tuxedo alteration. Highly recommended for premium menswear alterations.', tag: 'Tuxedo Alteration', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
      { id: 6, author: 'Megha Agarwal', orderNo: '#ORD-1008', rating: 5, text: 'Perfect neck design finishing and padded lining. Master tailor listened carefully to all custom requests.', tag: 'Choli Stitching', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' }
    ]
  });

  // Filter Reviews
  const filteredReviews = telemetry.reviews.filter(rev => {
    if (filter === 'all') return true;
    if (filter === '5') return rev.rating === 5;
    if (filter === '4') return rev.rating === 4;
    if (filter === '3') return rev.rating === 3;
    if (filter === '1-2') return rev.rating <= 2;
    return true;
  });

  // Sort Reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sort === 'highest') return b.rating - a.rating;
    if (sort === 'lowest') return a.rating - b.rating;
    return a.id - b.id; // latest
  });

  // Paginated Reviews
  const totalPages = Math.ceil(sortedReviews.length / pageSize) || 1;
  const paginatedReviews = sortedReviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>
      
      {/* PAGE TITLE & TOP ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#172033' }}>
            Reviews
          </h2>
          <span style={{ fontSize: '11px', fontWeight: 400, lineHeight: '17px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085' }}>
            Monitor customer feedback, rating trends, and storefront sentiment telemetry.
          </span>
        </div>

        <button 
          onClick={onRequestReview}
          className="btn-text-white-force"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            fontSize: '10px',
            fontWeight: 600,
            lineHeight: '16px',
            borderRadius: '8px',
            background: '#F72585',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(247,37,133,0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          <Mail size={14} /> Request Review
        </button>
      </div>

      {/* TOP 4 SUMMARY CARDS (ROW OF EQUAL HEIGHT CARDS) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* CARD 1: Overall Rating */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
          borderRadius: '12px',
          padding: '20px',
          height: '170px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 600, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', textTransform: 'uppercase', display: 'block' }}>
              Overall Rating
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
              <strong style={{ fontSize: '24px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                {telemetry.averageRating}
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#F5B700', fontSize: '12px', letterSpacing: '1px' }}>★★★★★</span>
                <span style={{ fontSize: '9px', fontWeight: 500, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085' }}>
                  {telemetry.totalReviews} Total Reviews
                </span>
              </div>
            </div>
          </div>
          <RatingRadialChart rating={telemetry.averageRating} total={telemetry.totalReviews} theme={theme} />
        </div>

        {/* CARD 2: Rating Distribution */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
          borderRadius: '12px',
          padding: '20px',
          height: '170px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontSize: '10px', fontWeight: 600, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', textTransform: 'uppercase', display: 'block' }}>
            Rating Distribution
          </span>
          <RatingDistribution distribution={telemetry.ratingDistribution} totalReviews={telemetry.totalReviews} theme={theme} />
        </div>

        {/* CARD 3: New Reviews */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
          borderRadius: '12px',
          padding: '20px 20px 10px 20px',
          height: '170px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
          overflow: 'hidden'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: 600, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', textTransform: 'uppercase' }}>
                New Reviews
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(18,183,106,0.1)', color: '#12B76A', padding: '2px 6px', borderRadius: '999px', fontSize: '9px', fontWeight: 600 }}>
                ● Live · {liveSeconds}s
              </span>
            </div>
            <strong style={{ fontSize: '24px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block', marginTop: '4px' }}>
              {telemetry.newReviews}
            </strong>
            <span style={{ fontSize: '10px', fontWeight: 600, lineHeight: '14px', color: '#12B76A', display: 'block', marginTop: '2px' }}>
              This Week ↑ 20% <span style={{ fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085' }}>from last week</span>
            </span>
          </div>
          <ReviewsTrendChart data={telemetry.reviewsTrend} theme={theme} />
        </div>

        {/* CARD 4: Happy Customers */}
        <div style={{
          background: theme === 'dark' ? '#141126' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
          borderRadius: '12px',
          padding: '20px 20px 10px 20px',
          height: '170px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
          overflow: 'hidden'
        }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 600, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', textTransform: 'uppercase', display: 'block' }}>
              Happy Customers
            </span>
            <strong style={{ fontSize: '24px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block', marginTop: '4px' }}>
              {telemetry.happyCustomers}%
            </strong>
            <span style={{ fontSize: '10px', fontWeight: 600, lineHeight: '14px', color: '#12B76A', display: 'block', marginTop: '2px' }}>
              Would recommend you ↑ 8% <span style={{ fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085' }}>from last week</span>
            </span>
          </div>
          <RecommendationTrendChart data={telemetry.recommendationTrend} theme={theme} />
        </div>

      </div>

      {/* MAIN CONTENT GRID: 70% LEFT / 30% RIGHT */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'stretch' }}>
        
        {/* LEFT COLUMN (70% WIDTH): RECENT REVIEWS */}
        <div style={{ flex: '7', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: theme === 'dark' ? '#141126' : '#ffffff',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}>
            {/* Header + Filter Pills + Sort Selector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', paddingBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, lineHeight: '20px', color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                Recent Reviews
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '4px', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F1F5F9', padding: '3px', borderRadius: '8px' }}>
                  {[
                    { id: 'all', label: `All (${telemetry.reviews.length})` },
                    { id: '5', label: `5 ★ (${telemetry.reviews.filter(r => r.rating === 5).length})` },
                    { id: '4', label: `4 ★ (${telemetry.reviews.filter(r => r.rating === 4).length})` },
                    { id: '3', label: `3 ★ (${telemetry.reviews.filter(r => r.rating === 3).length})` },
                    { id: '1-2', label: `1–2 ★ (${telemetry.reviews.filter(r => r.rating <= 2).length})` }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => { setFilter(tab.id); setCurrentPage(1); }}
                      className={filter === tab.id ? 'btn-text-white-force' : ''}
                      style={{
                        padding: '4px 10px',
                        fontSize: '10px',
                        fontWeight: 600,
                        lineHeight: '16px',
                        borderRadius: '6px',
                        border: 'none',
                        background: filter === tab.id ? '#F72585' : 'transparent',
                        color: filter === tab.id ? '#ffffff' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467'),
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Sort Selector */}
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    fontSize: '10px',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC',
                    background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ffffff',
                    color: theme === 'dark' ? '#ffffff' : '#1D2939',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="latest">Latest</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>

            {/* Review Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {paginatedReviews.length > 0 ? (
                paginatedReviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    style={{ 
                      display: 'flex', 
                      gap: '14px', 
                      paddingBottom: '14px', 
                      borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.04)' : '1px solid #F1F5F9',
                      alignItems: 'flex-start'
                    }}
                  >
                    {/* Avatar */}
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid #E4E7EC' }}>
                      <img src={rev.avatar} alt={rev.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Review Body */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '12px', fontWeight: 700, lineHeight: '18px', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>
                            {rev.author}
                          </strong>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 500, lineHeight: '14px', color: '#F72585' }}>
                              {rev.orderNo}
                            </span>
                            <span style={{ fontSize: '9px', fontWeight: 600, lineHeight: '14px', background: 'rgba(18,183,106,0.1)', color: '#12B76A', padding: '1px 6px', borderRadius: '4px' }}>
                              ✓ Verified Customer
                            </span>
                          </div>
                        </div>
                        <span style={{ fontSize: '9px', fontWeight: 500, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085' }}>
                          {rev.date}
                        </span>
                      </div>

                      {/* Stars Rating */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '6px 0' }}>
                        <span style={{ color: '#F5B700', fontSize: '11px', fontWeight: 600, letterSpacing: '1px' }}>
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>
                          {rev.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Review Text */}
                      <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: 400, lineHeight: '17px', color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>
                        {rev.text}
                      </p>

                      {/* Product Tag */}
                      {rev.tag && (
                        <span style={{ 
                          fontSize: '9px', 
                          fontWeight: 500, 
                          lineHeight: '14px', 
                          background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F1F5F9', 
                          color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467', 
                          padding: '2px 8px', 
                          borderRadius: '999px', 
                          display: 'inline-block'
                        }}>
                          {rev.tag}
                        </span>
                      )}
                    </div>

                    {/* Actions Menu */}
                    <button 
                      onClick={() => alert(`Options for review by ${rev.author}`)}
                      style={{ background: 'transparent', border: 'none', color: '#667085', cursor: 'pointer', padding: '4px' }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '24px', fontSize: '11px', color: '#667085' }}>
                  No reviews match the selected filter.
                </div>
              )}
            </div>

            {/* Pagination Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '8px' }}>
              <span style={{ fontSize: '9px', fontWeight: 500, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085' }}>
                Showing {sortedReviews.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, sortedReviews.length)} of {sortedReviews.length} reviews
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  style={{
                    padding: '4px 10px',
                    fontSize: '10px',
                    fontWeight: 600,
                    lineHeight: '16px',
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
                    className={currentPage === idx + 1 ? 'btn-text-white-force' : ''}
                    style={{
                      padding: '4px 8px',
                      fontSize: '10px',
                      fontWeight: 600,
                      lineHeight: '16px',
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
                    lineHeight: '16px',
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
        </div>

        {/* RIGHT COLUMN (30% WIDTH): SIDEBAR ANALYTICS */}
        <div style={{ flex: '3', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Rating Breakdown Card */}
          <div style={{
            background: theme === 'dark' ? '#141126' : '#ffffff',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, lineHeight: '20px', color: theme === 'dark' ? '#ffffff' : '#172033' }}>
              Rating Breakdown
            </h4>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 700, lineHeight: '30px', margin: 0, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                {telemetry.averageRating}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#F5B700', fontSize: '11px', letterSpacing: '1px' }}>★★★★★</span>
                <span style={{ fontSize: '9px', fontWeight: 500, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085' }}>
                  {telemetry.totalReviews} Total Reviews
                </span>
              </div>
            </div>

            <RatingDistribution distribution={telemetry.ratingDistribution} totalReviews={telemetry.totalReviews} theme={theme} />
          </div>

          {/* What Customers Love */}
          <WhatCustomersLove theme={theme} />

          {/* Need More Reviews CTA */}
          <NeedMoreReviewsCTA onRequest={onRequestReview} theme={theme} />

        </div>

      </div>

    </div>
  );
}
