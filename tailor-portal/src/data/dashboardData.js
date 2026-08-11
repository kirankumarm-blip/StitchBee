// Centralized API-ready JavaScript Data Layer for StitchBee Designer Dashboard

export const initialDashboardData = {
  liveStatus: {
    isLive: true,
    lastUpdatedText: 'Updated just now'
  },

  // SECTION 2: 5 KPI Cards
  kpiStats: [
    {
      id: 'active_projects',
      label: 'Active Projects',
      value: '14',
      subtext: '+3 from last week',
      trend: 'up',
      accentColor: '#F72585',
      badgeBg: 'rgba(247,37,133,0.1)',
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
      accentColor: '#8B12C8',
      badgeBg: 'rgba(139,18,200,0.1)',
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
      accentColor: '#12B76A',
      badgeBg: 'rgba(18,183,106,0.1)',
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
      accentColor: '#F79009',
      badgeBg: 'rgba(247,144,9,0.1)',
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

  // SECTION 2 Col 1: Earnings Overview
  earningsOverview: {
    summary: {
      totalEarnings: '₹48,200',
      completedOrders: 23,
      avgOrderValue: '₹18,550',
      commission: '₹2,850'
    },
    timeframeData: {
      'Today': [
        { date: '09 AM', earnings: 1200 },
        { date: '11 AM', earnings: 2800 },
        { date: '01 PM', earnings: 4500 },
        { date: '03 PM', earnings: 6200 },
        { date: '05 PM', earnings: 8100 }
      ],
      '7 Days': [
        { date: 'Mon', earnings: 14200 },
        { date: 'Tue', earnings: 18500 },
        { date: 'Wed', earnings: 22100 },
        { date: 'Thu', earnings: 29400 },
        { date: 'Fri', earnings: 36800 },
        { date: 'Sat', earnings: 42100 },
        { date: 'Sun', earnings: 48200 }
      ],
      '30 Days': [
        { date: 'Week 1', earnings: 12800 },
        { date: 'Week 2', earnings: 24500 },
        { date: 'Week 3', earnings: 36200 },
        { date: 'Week 4', earnings: 48200 }
      ],
      'This Month': [
        { date: '01 May', earnings: 6200 },
        { date: '05 May', earnings: 12800 },
        { date: '10 May', earnings: 11200 },
        { date: '15 May', earnings: 18400 },
        { date: '20 May', earnings: 26800 },
        { date: '25 May', earnings: 39200 },
        { date: '31 May', earnings: 48200 }
      ],
      'This Year': [
        { date: 'Jan', earnings: 120000 },
        { date: 'Feb', earnings: 185000 },
        { date: 'Mar', earnings: 240000 },
        { date: 'Apr', earnings: 310000 },
        { date: 'May', earnings: 418200 }
      ]
    }
  },

  // SECTION 2 Col 2: Project Status Donut Chart
  projectStatus: [
    { name: 'In Progress', value: 7, percentage: '50%', color: '#F72585' },
    { name: 'Stitching', value: 3, percentage: '21%', color: '#8B12C8' },
    { name: 'Approved', value: 2, percentage: '14%', color: '#12B76A' },
    { name: 'On Hold', value: 1, percentage: '7%', color: '#F79009' },
    { name: 'Completed', value: 1, percentage: '7%', color: '#3B82F6' }
  ],

  // SECTION 2 Col 3: Project Progress & Weekly Performance
  projectProgressItems: [
    { name: 'Royal Bridal Lehenga', progress: 82, status: 'In Progress', deadline: '28 May', color: '#F72585' },
    { name: 'Zardozi Silk Anarkali', progress: 65, status: 'Stitching', deadline: '30 May', color: '#8B12C8' },
    { name: 'Embroidered Velvet Sherwani', progress: 48, status: 'Pattern Making', deadline: '02 Jun', color: '#3B82F6' },
    { name: 'Chanderi Silk Suit', progress: 91, status: 'Final Trial', deadline: '26 May', color: '#12B76A' }
  ],
  weeklyPerformanceChart: [
    { day: 'M', completed: 4 },
    { day: 'T', completed: 6 },
    { day: 'W', completed: 5 },
    { day: 'T', completed: 8 },
    { day: 'F', completed: 7 },
    { day: 'S', completed: 9 }
  ],

  // SECTION 3 Col 1: Active Design Projects Table
  activeProjects: [
    {
      id: 'proj-1',
      name: 'Royal Bridal Lehenga',
      customer: 'Priya Sharma',
      amount: '₹18,500',
      status: 'In Progress',
      statusColor: '#F72585',
      statusBg: 'rgba(247,37,133,0.1)',
      progress: 82,
      deadline: '28 May 2026',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'proj-2',
      name: 'Zardozi Silk Anarkali',
      customer: 'Ananya Roy',
      amount: '₹14,200',
      status: 'Approved',
      statusColor: '#12B76A',
      statusBg: 'rgba(18,183,106,0.1)',
      progress: 100,
      deadline: '25 May 2026',
      image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'proj-3',
      name: 'Embroidered Velvet Sherwani',
      customer: 'Amit Verma',
      amount: '₹22,000',
      status: 'Stitching',
      statusColor: '#8B12C8',
      statusBg: 'rgba(139,18,200,0.1)',
      progress: 60,
      deadline: '02 Jun 2026',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'proj-4',
      name: 'Chanderi Silk Anarkali Suit',
      customer: 'Sneha Iyer',
      amount: '₹12,800',
      status: 'In Progress',
      statusColor: '#F72585',
      statusBg: 'rgba(247,37,133,0.1)',
      progress: 40,
      deadline: '05 Jun 2026',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'proj-5',
      name: 'Designer Reception Gown',
      customer: 'Rhea Patel',
      amount: '₹26,500',
      status: 'On Hold',
      statusColor: '#F79009',
      statusBg: 'rgba(247,144,9,0.1)',
      progress: 25,
      deadline: '10 Jun 2026',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=200'
    }
  ],

  // SECTION 3 Col 2: Upcoming Appointments
  appointments: [
    {
      id: 'app-1',
      customer: 'Priya Sharma',
      type: 'Bridal Fitting Appointment',
      outfit: 'Royal Bridal Lehenga',
      date: 'Today',
      time: '03:00 PM',
      status: 'Confirmed',
      color: '#F72585'
    },
    {
      id: 'app-2',
      customer: 'Amit Verma',
      type: 'Custom Measurement Session',
      outfit: 'Velvet Sherwani 3D Scan',
      date: 'Tomorrow',
      time: '11:30 AM',
      status: 'Scheduled',
      color: '#8B12C8'
    },
    {
      id: 'app-3',
      customer: 'Sneha Iyer',
      type: 'Design Discussion',
      outfit: 'Reception Gown Sketch Review',
      date: '27 May 2026',
      time: '04:00 PM',
      status: 'Pending Review',
      color: '#12B76A'
    }
  ],

  // SECTION 3 Col 3: Recent Activity / Notifications Feed
  activities: [
    {
      id: 'act-1',
      text: 'New design request received from Priya Sharma',
      subtext: 'Bridal Lehenga Design',
      timestamp: 'Just now',
      color: '#F72585'
    },
    {
      id: 'act-2',
      text: 'Customer measurement updated by Master Rajesh',
      subtext: 'Amit Verma — 3D Scan Completed',
      timestamp: '5 min ago',
      color: '#3B82F6'
    },
    {
      id: 'act-3',
      text: 'Design approved by client',
      subtext: 'Zardozi Silk Anarkali',
      timestamp: '20 min ago',
      color: '#12B76A'
    },
    {
      id: 'act-4',
      text: 'Payment received: ₹18,500',
      subtext: 'From Priya Sharma via UPI',
      timestamp: '1 hour ago',
      color: '#8B12C8'
    },
    {
      id: 'act-5',
      text: 'Appointment scheduled with Sneha Iyer',
      subtext: 'Design Discussion for 27 May',
      timestamp: '3 hours ago',
      color: '#F79009'
    }
  ]
};
