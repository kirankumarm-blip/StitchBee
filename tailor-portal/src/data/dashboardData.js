// Centralized Mock Data Structure for StitchBee Designer Dashboard
// Designed for seamless REST API / WebSocket integration

export const initialDashboardData = {
  liveStatus: {
    isLive: true,
    lastUpdated: 'Just now',
    statusText: '● Live — Syncing with Atelier API'
  },
  
  stats: [
    {
      id: 'active_projects',
      label: 'Active Projects',
      value: '14',
      subtext: '+3 from last week',
      trend: 'up',
      accentColor: '#EC168C',
      badgeBg: 'rgba(236,22,140,0.1)',
      icon: 'Palette',
      sparkline: [
        { date: 'Mon', val: 9 },
        { date: 'Tue', val: 11 },
        { date: 'Wed', val: 10 },
        { date: 'Thu', val: 12 },
        { date: 'Fri', val: 13 },
        { date: 'Sat', val: 14 }
      ]
    },
    {
      id: 'new_requests',
      label: 'New Requests',
      value: '6',
      subtext: '2 Action Required',
      trend: 'warning',
      accentColor: '#7B1FE8',
      badgeBg: 'rgba(123,31,232,0.1)',
      icon: 'FileText',
      sparkline: [
        { date: 'Mon', val: 2 },
        { date: 'Tue', val: 4 },
        { date: 'Wed', val: 3 },
        { date: 'Thu', val: 5 },
        { date: 'Fri', val: 4 },
        { date: 'Sat', val: 6 }
      ]
    },
    {
      id: 'total_earnings',
      label: 'Total Earnings',
      value: '₹48,200',
      subtext: '↑ 18% from last month',
      trend: 'up',
      accentColor: '#10B981',
      badgeBg: 'rgba(16,185,129,0.1)',
      icon: 'DollarSign',
      sparkline: [
        { date: 'Mon', val: 32000 },
        { date: 'Tue', val: 38000 },
        { date: 'Wed', val: 41000 },
        { date: 'Thu', val: 44000 },
        { date: 'Fri', val: 46500 },
        { date: 'Sat', val: 48200 }
      ]
    },
    {
      id: 'pending_payout',
      label: 'Pending Payout',
      value: '₹12,350',
      subtext: 'Expected on 07 Jun 2026',
      trend: 'info',
      accentColor: '#F59E0B',
      badgeBg: 'rgba(245,158,11,0.1)',
      icon: 'Clock',
      sparkline: [
        { date: 'Mon', val: 8000 },
        { date: 'Tue', val: 9500 },
        { date: 'Wed', val: 10200 },
        { date: 'Thu', val: 11000 },
        { date: 'Fri', val: 11800 },
        { date: 'Sat', val: 12350 }
      ]
    },
    {
      id: 'design_rating',
      label: 'Design Rating',
      value: '4.9 ★',
      subtext: '96% Satisfaction Rate',
      trend: 'star',
      accentColor: '#3B82F6',
      badgeBg: 'rgba(59,130,246,0.1)',
      icon: 'Star',
      sparkline: [
        { date: 'Mon', val: 4.6 },
        { date: 'Tue', val: 4.7 },
        { date: 'Wed', val: 4.8 },
        { date: 'Thu', val: 4.8 },
        { date: 'Fri', val: 4.9 },
        { date: 'Sat', val: 4.9 }
      ]
    }
  ],

  earningsOverview: {
    summary: {
      totalEarnings: '₹48,200',
      completedOrders: 23,
      avgOrderValue: '₹18,550',
      commission: '₹2,850'
    },
    chartData: [
      { date: '01 May', earnings: 6200, change: '+12%' },
      { date: '05 May', earnings: 12800, change: '+15%' },
      { date: '10 May', earnings: 11200, change: '-4%' },
      { date: '15 May', earnings: 18400, change: '+22%' },
      { date: '20 May', earnings: 26800, change: '+18%' },
      { date: '25 May', earnings: 39200, change: '+25%' },
      { date: '31 May', earnings: 48200, change: '+18%' }
    ]
  },

  projectStatusData: [
    { name: 'In Progress', value: 7, percentage: '50%', color: '#EC168C' },
    { name: 'Stitching', value: 3, percentage: '21%', color: '#7B1FE8' },
    { name: 'Approved', value: 2, percentage: '14%', color: '#10B981' },
    { name: 'On Hold', value: 1, percentage: '7%', color: '#F59E0B' },
    { name: 'Completed', value: 1, percentage: '7%', color: '#3B82F6' }
  ],

  appointments: [
    {
      id: 'app-1',
      title: 'Bridal Fitting Appointment',
      client: 'Priya Sharma',
      outfit: 'Royal Bridal Lehenga',
      time: 'Today, 03:00 PM',
      type: 'fitting', // left border pink
      color: '#EC168C'
    },
    {
      id: 'app-2',
      title: 'Custom Measurement Session',
      client: 'Amit Verma',
      outfit: 'Velvet Sherwani 3D Scan',
      time: 'Tomorrow, 11:30 AM',
      type: 'measurement', // left border purple
      color: '#7B1FE8'
    },
    {
      id: 'app-3',
      title: 'Design Discussion',
      client: 'Sneha Iyer',
      outfit: 'Reception Gown',
      time: '27 May 2026, 04:00 PM',
      type: 'discussion', // left border green
      color: '#10B981'
    }
  ],

  activeProjects: [
    {
      id: 'proj-1',
      name: 'Royal Bridal Lehenga',
      client: 'Priya Sharma',
      version: 'v3.0',
      progress: 80,
      status: 'In Progress',
      statusColor: '#EC168C',
      statusBg: 'rgba(236,22,140,0.1)',
      amount: '₹18,500',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'proj-2',
      name: 'Zardozi Silk Anarkali',
      client: 'Ananya Roy',
      version: 'v2.1',
      progress: 100,
      status: 'Approved',
      statusColor: '#10B981',
      statusBg: 'rgba(16,185,129,0.1)',
      amount: '₹14,200',
      image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'proj-3',
      name: 'Embroidered Velvet Sherwani',
      client: 'Amit Verma',
      version: 'v1.0',
      progress: 60,
      status: 'Stitching',
      statusColor: '#7B1FE8',
      statusBg: 'rgba(123,31,232,0.1)',
      amount: '₹22,000',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'proj-4',
      name: 'Chanderi Silk Anarkali Suit',
      client: 'Sneha Iyer',
      version: 'v1.2',
      progress: 40,
      status: 'In Progress',
      statusColor: '#EC168C',
      statusBg: 'rgba(236,22,140,0.1)',
      amount: '₹12,800',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=200'
    }
  ],

  topDesigns: [
    { name: 'Bridal Lehenga Collection', revenue: 28450 },
    { name: 'Sherwani Collection', revenue: 16250 },
    { name: 'Anarkali Collection', revenue: 11800 },
    { name: 'Reception Gowns', revenue: 8900 },
    { name: 'Saree Blouse Designs', revenue: 5600 }
  ],

  recentClients: [
    {
      id: 'cli-1',
      name: 'Priya Sharma',
      ordersCount: 12,
      designsCount: 6,
      lastOrderTime: '2 days ago',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 'cli-2',
      name: 'Amit Verma',
      ordersCount: 8,
      designsCount: 3,
      lastOrderTime: '1 week ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 'cli-3',
      name: 'Sneha Iyer',
      ordersCount: 5,
      designsCount: 4,
      lastOrderTime: '1 week ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150'
    }
  ],

  activities: [
    {
      id: 'act-1',
      title: 'New design request received',
      desc: 'Bridal Lehenga Design',
      time: '10 mins ago',
      color: '#7B1FE8',
      icon: 'FileText'
    },
    {
      id: 'act-2',
      title: 'Measurement added',
      desc: 'Amit Verma — 3D Scan Completed',
      time: '45 mins ago',
      color: '#3B82F6',
      icon: 'Ruler'
    },
    {
      id: 'act-3',
      title: 'Project approved',
      desc: 'Zardozi Silk Anarkali',
      time: '2 hours ago',
      color: '#10B981',
      icon: 'CheckCircle2'
    },
    {
      id: 'act-4',
      title: 'Payment received',
      desc: '₹18,500 from Priya Sharma',
      time: '3 hours ago',
      color: '#EC168C',
      icon: 'DollarSign'
    },
    {
      id: 'act-5',
      title: 'Appointment scheduled',
      desc: 'Tomorrow, 11:30 AM',
      time: '5 hours ago',
      color: '#F59E0B',
      icon: 'Calendar'
    }
  ]
};
