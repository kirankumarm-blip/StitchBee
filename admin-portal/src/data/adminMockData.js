// ==========================================================================
// STITCHBEE ADMIN PORTAL MOCK DATABASE & ANALYTICS DATASET
// Realistic, highly-structured data for all 63 StitchBee platform management areas
// ==========================================================================

export const ADMIN_USER = {
  id: 'adm-01',
  name: 'Kiran Kumar',
  email: 'kiran.m@stitchbee.in',
  phone: '9845012345',
  role: 'Super Admin',
  avatar: 'KK',
  department: 'Executive Operations',
  lastLogin: 'Today, 02:45 PM',
  permissions: ['view', 'create', 'edit', 'delete', 'approve', 'reject', 'export']
};

export const EXECUTIVE_KPIS = [
  {
    id: 'kpi-customers',
    title: 'Total Customers',
    value: '24,850',
    numericValue: 24850,
    change: '+12.4%',
    isPositive: true,
    comparison: 'vs last month',
    iconName: 'Users',
    sparkline: [21400, 22100, 22600, 23200, 23900, 24400, 24850]
  },
  {
    id: 'kpi-orders',
    title: 'Total Orders',
    value: '18,642',
    numericValue: 18642,
    change: '+8.6%',
    isPositive: true,
    comparison: 'vs last month',
    iconName: 'ShoppingBag',
    sparkline: [15900, 16400, 16900, 17200, 17800, 18200, 18642]
  },
  {
    id: 'kpi-revenue',
    title: 'Total Revenue',
    value: '₹48.6L',
    numericValue: 4860000,
    change: '+15.2%',
    isPositive: true,
    comparison: 'vs last month',
    iconName: 'IndianRupee',
    sparkline: [38.2, 40.1, 41.5, 43.8, 45.2, 47.1, 48.6],
    isAccent: true
  },
  {
    id: 'kpi-tailors',
    title: 'Active Tailors',
    value: '1,248',
    numericValue: 1248,
    change: '+4.8%',
    isPositive: true,
    comparison: 'vs last month',
    iconName: 'Scissors',
    sparkline: [1150, 1180, 1195, 1210, 1225, 1240, 1248]
  },
  {
    id: 'kpi-delivery',
    title: 'Active Delivery Partners',
    value: '326',
    numericValue: 326,
    change: '+6.1%',
    isPositive: true,
    comparison: 'vs last month',
    iconName: 'Truck',
    sparkline: [280, 292, 305, 310, 316, 320, 326]
  },
  {
    id: 'kpi-designers',
    title: 'Active Designers',
    value: '184',
    numericValue: 184,
    change: '+9.3%',
    isPositive: true,
    comparison: 'vs last month',
    iconName: 'Sparkles',
    sparkline: [152, 158, 165, 170, 176, 180, 184]
  },
  {
    id: 'kpi-verifications',
    title: 'Pending Verifications',
    value: '72',
    numericValue: 72,
    change: 'Requires Action',
    isPositive: null,
    comparison: '24 tailors, 32 delivery, 16 designers',
    iconName: 'ShieldAlert',
    sparkline: [65, 78, 84, 70, 68, 75, 72],
    isAlert: true
  },
  {
    id: 'kpi-failures',
    title: 'Stitching Failures',
    value: '146',
    numericValue: 146,
    change: '0.78% rate',
    isPositive: true,
    comparison: '-18% lower vs avg',
    iconName: 'AlertTriangle',
    sparkline: [180, 172, 165, 158, 150, 148, 146]
  }
];

// Revenue and Sales Overview dataset across filters
export const REVENUE_SALES_TRENDS = {
  'Today': [
    { period: '08 AM', revenue: 18500, orders: 14, aov: 1321 },
    { period: '10 AM', revenue: 42000, orders: 32, aov: 1312 },
    { period: '12 PM', revenue: 68500, orders: 48, aov: 1427 },
    { period: '02 PM', revenue: 54000, orders: 39, aov: 1384 },
    { period: '04 PM', revenue: 89000, orders: 62, aov: 1435 },
    { period: '06 PM', revenue: 112000, orders: 78, aov: 1435 },
    { period: '08 PM', revenue: 94000, orders: 65, aov: 1446 }
  ],
  '7 Days': [
    { period: 'Mon', revenue: 215000, orders: 154, aov: 1396 },
    { period: 'Tue', revenue: 242000, orders: 168, aov: 1440 },
    { period: 'Wed', revenue: 228000, orders: 160, aov: 1425 },
    { period: 'Thu', revenue: 285000, orders: 195, aov: 1461 },
    { period: 'Fri', revenue: 340000, orders: 232, aov: 1465 },
    { period: 'Sat', revenue: 410000, orders: 278, aov: 1474 },
    { period: 'Sun', revenue: 380000, orders: 255, aov: 1490 }
  ],
  '30 Days': [
    { period: 'Week 1', revenue: 1040000, orders: 720, aov: 1444 },
    { period: 'Week 2', revenue: 1180000, orders: 810, aov: 1456 },
    { period: 'Week 3', revenue: 1120000, orders: 775, aov: 1445 },
    { period: 'Week 4', revenue: 1520000, orders: 1020, aov: 1490 }
  ],
  '3 Months': [
    { period: 'Jul', revenue: 3850000, orders: 2680, aov: 1436 },
    { period: 'Aug', revenue: 4320000, orders: 2950, aov: 1464 },
    { period: 'Sep', revenue: 4860000, orders: 3280, aov: 1481 }
  ],
  '6 Months': [
    { period: 'Apr', revenue: 3100000, orders: 2200, aov: 1409 },
    { period: 'May', revenue: 3450000, orders: 2410, aov: 1431 },
    { period: 'Jun', revenue: 3620000, orders: 2520, aov: 1436 },
    { period: 'Jul', revenue: 3850000, orders: 2680, aov: 1436 },
    { period: 'Aug', revenue: 4320000, orders: 2950, aov: 1464 },
    { period: 'Sep', revenue: 4860000, orders: 3280, aov: 1481 }
  ],
  '1 Year': [
    { period: 'Q1', revenue: 8400000, orders: 6020, aov: 1395 },
    { period: 'Q2', revenue: 10170000, orders: 7130, aov: 1426 },
    { period: 'Q3', revenue: 13030000, orders: 8910, aov: 1462 },
    { period: 'Q4 (Est)', revenue: 17000000, orders: 11200, aov: 1517 }
  ]
};

// Order Status Breakdown (12 Lifecycle Stages)
export const ORDER_STATUS_DISTRIBUTION = [
  { name: 'New', count: 485, value: 485, color: '#3b82f6' },
  { name: 'Measurement Pending', count: 340, value: 340, color: '#60a5fa' },
  { name: 'Fabric Pending', count: 265, value: 265, color: '#93c5fd' },
  { name: 'Assigned to Tailor', count: 820, value: 820, color: '#2563eb' },
  { name: 'Stitching', count: 2450, value: 2450, color: '#1d4ed8' },
  { name: 'Quality Check', count: 610, value: 610, color: '#f59e0b' },
  { name: 'Ready', count: 430, value: 430, color: '#fbbf24' },
  { name: 'Out for Delivery', count: 395, value: 395, color: '#fcd34d' },
  { name: 'Delivered', count: 11850, value: 11850, color: '#10b981' },
  { name: 'Cancelled', count: 520, value: 520, color: '#94a3b8' },
  { name: 'Returned', count: 185, value: 185, color: '#f87171' },
  { name: 'Rework', count: 292, value: 292, color: '#ef4444' }
];

// Category Performance
export const CATEGORY_PERFORMANCE = [
  { group: 'Fashion', name: "Men's Tailoring", orders: 4850, revenue: 12600000, aov: 2597, completed: 4620, failed: 34, cancelled: 196 },
  { group: 'Fashion', name: "Women's Tailoring", orders: 5640, revenue: 15200000, aov: 2695, completed: 5380, failed: 48, cancelled: 212 },
  { group: 'Fashion', name: "Kids Wear", orders: 1980, revenue: 2570000, aov: 1297, completed: 1910, failed: 12, cancelled: 58 },
  { group: 'Fashion', name: "Bridal Wear", orders: 840, revenue: 7560000, aov: 9000, completed: 815, failed: 8, cancelled: 17 },
  { group: 'Specialty', name: "Pets", orders: 410, revenue: 450000, aov: 1097, completed: 395, failed: 3, cancelled: 12 },
  { group: 'Specialty', name: "Shoes & Leather", orders: 620, revenue: 1480000, aov: 2387, completed: 590, failed: 6, cancelled: 24 },
  { group: 'Specialty', name: "Bags & Leather", orders: 740, revenue: 1850000, aov: 2500, completed: 710, failed: 7, cancelled: 23 },
  { group: 'Specialty', name: "Sofas & Covers", orders: 390, revenue: 1560000, aov: 4000, completed: 375, failed: 4, cancelled: 11 },
  { group: 'Specialty', name: "Vehicle Seat Covers", orders: 1420, revenue: 5680000, aov: 4000, completed: 1360, failed: 18, cancelled: 42 },
  { group: 'Business', name: "Bulk Orders", orders: 310, revenue: 9300000, aov: 30000, completed: 295, failed: 6, cancelled: 9 }
];

// Top Performers
export const TOP_TAILORS = [
  { id: 't-1', name: 'Master Rajesh Kumar', atelier: 'Vogue Craft Tailors', location: 'Bengaluru', rating: 4.92, orders: 842, onTimeRate: '98.5%', revenue: '₹14.2L', status: 'Active' },
  { id: 't-2', name: 'Ananya Sharma', atelier: 'Ananya Bridal Studio', location: 'Indiranagar', rating: 4.95, orders: 418, onTimeRate: '99.1%', revenue: '₹22.8L', status: 'Active' },
  { id: 't-3', name: 'Guru Prasad', atelier: 'Auto Leather Craft', location: 'Bengaluru', rating: 4.88, orders: 612, onTimeRate: '97.2%', revenue: '₹18.4L', status: 'Active' },
  { id: 't-4', name: 'Vikramaditya Rao', atelier: 'Imperial Cut Ateliers', location: 'Mumbai', rating: 4.91, orders: 512, onTimeRate: '98.0%', revenue: '₹16.9L', status: 'Active' }
];

export const TOP_DESIGNERS = [
  { id: 'd-1', name: 'Ritu Varma', atelier: 'Atelier Riva', location: 'Mumbai', rating: 4.94, approvedDesigns: 54, orders: 380, revenue: '₹11.4L' },
  { id: 'd-2', name: 'Kavya Pillai', atelier: 'Aura Pret Couture', location: 'Bengaluru', rating: 4.91, approvedDesigns: 42, orders: 290, revenue: '₹8.7L' },
  { id: 'd-3', name: 'Sanjay Dutt Roy', atelier: 'Modern Loom Design', location: 'Delhi', rating: 4.87, approvedDesigns: 38, orders: 240, revenue: '₹7.2L' }
];

export const TOP_DELIVERY_PARTNERS = [
  { id: 'dp-1', name: 'Manoj Gowda', vehicle: 'EV Bike (KA-05-EV-4412)', location: 'HSR Layout', rating: 4.96, deliveries: 1240, successRate: '99.4%', earnings: '₹48,500' },
  { id: 'dp-2', name: 'Deepak Sharma', vehicle: 'Motorcycle (KA-01-AB-8821)', location: 'Indiranagar', rating: 4.91, deliveries: 980, successRate: '98.8%', earnings: '₹39,200' },
  { id: 'dp-3', name: 'Siddharth Nair', vehicle: 'EV Scooter (KA-03-JJ-1029)', location: 'Whitefield', rating: 4.89, deliveries: 860, successRate: '98.2%', earnings: '₹34,400' }
];

// Location Analytics
export const LOCATION_ANALYTICS = [
  { city: 'Bengaluru', orders: 8420, revenue: 22400000, tailors: 480, deliveryPartners: 142, growth: '+18.2%' },
  { city: 'Mumbai', orders: 4120, revenue: 11800000, tailors: 260, deliveryPartners: 78, growth: '+14.5%' },
  { city: 'Delhi NCR', orders: 3250, revenue: 8600000, tailors: 210, deliveryPartners: 54, growth: '+11.8%' },
  { city: 'Hyderabad', orders: 1680, revenue: 4100000, tailors: 145, deliveryPartners: 32, growth: '+21.4%' },
  { city: 'Chennai', orders: 1172, revenue: 2700000, tailors: 95, deliveryPartners: 20, growth: '+8.9%' }
];

// Recent Operational Activity
export const RECENT_ACTIVITIES = [
  { id: 'act-1', type: 'order', text: 'Order #STB-10245 marked Delivered by Manoj Gowda', time: '2 mins ago', severity: 'success' },
  { id: 'act-2', type: 'verification', text: 'New Tailor Application: Royal Threads Studio (Pune)', time: '8 mins ago', severity: 'warning' },
  { id: 'act-3', type: 'payment', text: 'Payment ₹4,850 received via Razorpay (Order #STB-10249)', time: '12 mins ago', severity: 'info' },
  { id: 'act-4', type: 'delivery', text: 'Delivery Partner approved: Sunil Verma (Koramangala)', time: '20 mins ago', severity: 'success' },
  { id: 'act-5', type: 'designer', text: 'Designer Ritu Varma submitted 2 new Festive Lehengas', time: '32 mins ago', severity: 'info' },
  { id: 'act-6', type: 'failure', text: 'Stitching Failure flagged on Order #STB-10231 (Sleeve fit)', time: '45 mins ago', severity: 'danger' }
];

// Admin Alerts
export const ADMIN_ALERTS = [
  { id: 'alt-1', title: 'Pending Tailor Verifications', count: 24, targetTab: 'tailor-verification', level: 'warning', desc: 'Background & trade tests submitted' },
  { id: 'alt-2', title: 'Pending Delivery Verifications', count: 32, targetTab: 'delivery-verification', level: 'info', desc: 'RC & Driving Licenses pending review' },
  { id: 'alt-3', title: 'Pending Designer Verifications', count: 16, targetTab: 'designer-verification', level: 'info', desc: 'Atelier portfolios awaiting approval' },
  { id: 'alt-4', title: 'Stitching Failures Today', count: 4, targetTab: 'stitching-failures', level: 'danger', desc: 'Rework and refund decisions required' },
  { id: 'alt-5', title: 'High Priority Complaints', count: 6, targetTab: 'complaints', level: 'danger', desc: 'Customer SLA deadline under 2 hours' }
];

// Orders Full Dataset
export const MOCK_ORDERS = [
  {
    id: 'STB-10245',
    customer: 'Rahul Verma',
    phone: '+91 98450 12345',
    category: "Men's Tailoring",
    service: 'Bespoke 3-Piece Tuxedo',
    tailor: 'Vogue Craft Tailors',
    designer: 'Atelier Riva',
    deliveryPartner: 'Manoj Gowda',
    value: 5800,
    paymentStatus: 'Paid',
    paymentGateway: 'Razorpay',
    orderStatus: 'Delivered',
    orderDate: '2026-09-18',
    expectedDate: '2026-09-24',
    city: 'Bengaluru',
    timeline: [
      { step: 'Order Created', date: '18 Sep, 10:30 AM', done: true },
      { step: 'Payment Confirmed', date: '18 Sep, 10:32 AM', done: true },
      { step: 'Measurements Taken', date: '18 Sep, 02:00 PM', done: true },
      { step: 'Fabric Verified', date: '19 Sep, 11:00 AM', done: true },
      { step: 'Tailor Assigned', date: '19 Sep, 01:30 PM', done: true },
      { step: 'Stitching Started', date: '20 Sep, 10:00 AM', done: true },
      { step: 'Quality Check Passed', date: '21 Sep, 04:00 PM', done: true },
      { step: 'Pickup Scheduled', date: '22 Sep, 09:30 AM', done: true },
      { step: 'Out for Delivery', date: '22 Sep, 11:00 AM', done: true },
      { step: 'Delivered', date: '22 Sep, 01:15 PM', done: true }
    ],
    fabric: 'Italian Wool Blend 320 GSM',
    measurements: 'Chest 40", Waist 34", Shoulder 18.5", Inseam 32"'
  },
  {
    id: 'STB-10246',
    customer: 'Priya Sundaram',
    phone: '+91 97410 88231',
    category: 'Bridal Wear',
    service: 'Zardozi Wedding Lehenga',
    tailor: 'Ananya Bridal Studio',
    designer: 'Kavya Pillai',
    deliveryPartner: 'Deepak Sharma',
    value: 14500,
    paymentStatus: 'Paid',
    paymentGateway: 'Cashfree',
    orderStatus: 'Stitching',
    orderDate: '2026-09-20',
    expectedDate: '2026-09-29',
    city: 'Bengaluru',
    timeline: [
      { step: 'Order Created', date: '20 Sep, 11:15 AM', done: true },
      { step: 'Payment Confirmed', date: '20 Sep, 11:18 AM', done: true },
      { step: 'Measurements Taken', date: '20 Sep, 04:30 PM', done: true },
      { step: 'Fabric Verified', date: '21 Sep, 10:00 AM', done: true },
      { step: 'Tailor Assigned', date: '21 Sep, 12:00 PM', done: true },
      { step: 'Stitching Started', date: '22 Sep, 09:00 AM', done: true },
      { step: 'Quality Check Passed', date: 'Pending', done: false },
      { step: 'Pickup Scheduled', date: 'Pending', done: false },
      { step: 'Out for Delivery', date: 'Pending', done: false },
      { step: 'Delivered', date: 'Pending', done: false }
    ],
    fabric: 'Raw Silk with Heavy Golden Zari',
    measurements: 'Bust 36", Waist 30", Lehenga Length 42", Blouse Sleeve 11"'
  },
  {
    id: 'STB-10247',
    customer: 'Amitabh Sen',
    phone: '+91 99001 54321',
    category: 'Vehicle Seat Covers',
    service: 'Custom Perforated Nappa Covers',
    tailor: 'Auto Leather Craft',
    designer: '-',
    deliveryPartner: 'Siddharth Nair',
    value: 7800,
    paymentStatus: 'Paid',
    paymentGateway: 'Razorpay',
    orderStatus: 'Quality Check',
    orderDate: '2026-09-19',
    expectedDate: '2026-09-23',
    city: 'Bengaluru',
    timeline: [
      { step: 'Order Created', date: '19 Sep, 09:00 AM', done: true },
      { step: 'Payment Confirmed', date: '19 Sep, 09:05 AM', done: true },
      { step: 'Measurements Taken', date: '19 Sep, 01:00 PM', done: true },
      { step: 'Fabric Verified', date: '20 Sep, 10:00 AM', done: true },
      { step: 'Tailor Assigned', date: '20 Sep, 11:30 AM', done: true },
      { step: 'Stitching Started', date: '20 Sep, 02:00 PM', done: true },
      { step: 'Quality Check Passed', date: '22 Sep, 11:00 AM', done: true },
      { step: 'Pickup Scheduled', date: 'Pending', done: false },
      { step: 'Out for Delivery', date: 'Pending', done: false },
      { step: 'Delivered', date: 'Pending', done: false }
    ],
    fabric: 'Dual-tone Black & Tan Nappa PU',
    measurements: 'Hyundai Creta 2024 (Front bucket + Rear 60:40)'
  },
  {
    id: 'STB-10248',
    customer: 'Meenakshi Iyer',
    phone: '+91 98860 99420',
    category: "Women's Tailoring",
    service: 'Pure Chanderi Kurta & Palazzo',
    tailor: 'Ananya Bridal Studio',
    designer: '-',
    deliveryPartner: 'Manoj Gowda',
    value: 2400,
    paymentStatus: 'Paid',
    paymentGateway: 'PayU',
    orderStatus: 'Rework',
    orderDate: '2026-09-15',
    expectedDate: '2026-09-24',
    city: 'Bengaluru',
    timeline: [
      { step: 'Order Created', date: '15 Sep, 03:00 PM', done: true },
      { step: 'Payment Confirmed', date: '15 Sep, 03:05 PM', done: true },
      { step: 'Measurements Taken', date: '16 Sep, 11:00 AM', done: true },
      { step: 'Fabric Verified', date: '16 Sep, 02:00 PM', done: true },
      { step: 'Tailor Assigned', date: '17 Sep, 10:00 AM', done: true },
      { step: 'Stitching Started', date: '18 Sep, 09:30 AM', done: true },
      { step: 'Quality Check Passed', date: '20 Sep, 11:00 AM', done: false },
      { step: 'Pickup Scheduled', date: 'Pending', done: false },
      { step: 'Out for Delivery', date: 'Pending', done: false },
      { step: 'Delivered', date: 'Pending', done: false }
    ],
    fabric: 'Chanderi Silk 120 GSM',
    measurements: 'Bust 38", Waist 32", Kurta Length 44", Palazzo 38"'
  },
  {
    id: 'STB-10249',
    customer: 'St. Joseph Academy',
    phone: '+91 80 2211 4455',
    category: 'Bulk Orders',
    service: 'Senior School Blazers (120 units)',
    tailor: 'Vogue Craft Tailors',
    designer: '-',
    deliveryPartner: 'Fleet Logistics',
    value: 168000,
    paymentStatus: 'Advance 50%',
    paymentGateway: 'Razorpay',
    orderStatus: 'Stitching',
    orderDate: '2026-09-12',
    expectedDate: '2026-10-05',
    city: 'Bengaluru',
    timeline: [
      { step: 'Order Created', date: '12 Sep', done: true },
      { step: 'Payment Confirmed', date: '13 Sep', done: true },
      { step: 'Measurements Taken', date: '14 Sep', done: true },
      { step: 'Fabric Verified', date: '15 Sep', done: true },
      { step: 'Tailor Assigned', date: '16 Sep', done: true },
      { step: 'Stitching Started', date: '17 Sep', done: true },
      { step: 'Quality Check Passed', date: 'Pending', done: false },
      { step: 'Pickup Scheduled', date: 'Pending', done: false },
      { step: 'Out for Delivery', date: 'Pending', done: false },
      { step: 'Delivered', date: 'Pending', done: false }
    ],
    fabric: 'Navy Poly-Viscose Suiting',
    measurements: 'Batch sizes S, M, L, XL with embroidered crest'
  }
];

// Normalize MOCK_ORDERS fields for multi-view compatibility
MOCK_ORDERS.forEach(order => {
  if (order.value !== undefined && order.totalAmount === undefined) {
    order.totalAmount = order.value;
  }
  if (order.orderStatus !== undefined && order.status === undefined) {
    order.status = order.orderStatus;
  }
  if (order.expectedDate !== undefined && order.estimatedDelivery === undefined) {
    order.estimatedDelivery = order.expectedDate;
  }
});

// Tailors Full Dataset & Verification
export const MOCK_TAILORS = [
  {
    id: 't-101',
    name: 'Master Rajesh Kumar',
    shopName: 'Vogue Craft Tailors',
    phone: '+91 98450 11223',
    location: 'HSR Layout, Bengaluru',
    experience: '18 Years',
    specialization: 'Men Suits, Sherwanis, Formal Blazers',
    verification: 'Approved',
    orders: 842,
    completed: 818,
    inProgress: 18,
    failed: 6,
    rework: 8,
    revenue: 1420000,
    rating: 4.92,
    status: 'Active',
    aadhaar: 'XXXX-XXXX-8921',
    pan: 'ABCDE1234F',
    gst: '29ABCDE1234F1Z5',
    bank: { bankName: 'HDFC Bank', accNo: 'XXXXXX4819', ifsc: 'HDFC0001248' },
    portfolioCount: 24,
    skills: ['Hand Canvas', 'Bespoke Lapel Cut', 'Pattern Grading', 'Alterations']
  },
  {
    id: 't-102',
    name: 'Ananya Sharma',
    shopName: 'Ananya Bridal Studio',
    phone: '+91 97410 44556',
    location: 'Indiranagar, Bengaluru',
    experience: '12 Years',
    specialization: 'Bridal Lehengas, Sarees, Designer Blouses',
    verification: 'Approved',
    orders: 418,
    completed: 402,
    inProgress: 12,
    failed: 4,
    rework: 5,
    revenue: 2280000,
    rating: 4.95,
    status: 'Active',
    aadhaar: 'XXXX-XXXX-1049',
    pan: 'XYZWR9876A',
    gst: '29XYZWR9876A1Z3',
    bank: { bankName: 'ICICI Bank', accNo: 'XXXXXX9012', ifsc: 'ICIC0000412' },
    portfolioCount: 38,
    skills: ['Zardozi Embroidery', 'Corset Structure', 'Gown Fitting', 'Silk Care']
  },
  {
    id: 't-103',
    name: 'Guru Prasad',
    shopName: 'Auto Leather Craft',
    phone: '+91 99001 88776',
    location: 'Koramangala, Bengaluru',
    experience: '15 Years',
    specialization: 'Vehicle Seat Covers, Bike Saddles, Leather Goods',
    verification: 'Approved',
    orders: 612,
    completed: 590,
    inProgress: 16,
    failed: 6,
    rework: 9,
    revenue: 1840000,
    rating: 4.88,
    status: 'Active',
    aadhaar: 'XXXX-XXXX-3341',
    pan: 'KLMNO4455B',
    gst: '29KLMNO4455B1Z8',
    bank: { bankName: 'State Bank of India', accNo: 'XXXXXX7842', ifsc: 'SBIN0008412' },
    portfolioCount: 19,
    skills: ['Heavy Stitching Machine', 'Leather Cutting', 'Perforation', 'Foam Molding']
  },
  {
    id: 't-104',
    name: 'Mohd. Zeeshan',
    shopName: 'Zeeshan Needle Crafts',
    phone: '+91 96112 33445',
    location: 'Shivajinagar, Bengaluru',
    experience: '9 Years',
    specialization: 'Sherwanis, Kurta Sets, Bandhgalas',
    verification: 'Pending',
    orders: 0,
    completed: 0,
    inProgress: 0,
    failed: 0,
    rework: 0,
    revenue: 0,
    rating: 0,
    status: 'Pending',
    aadhaar: 'XXXX-XXXX-6712',
    pan: 'PQRST7788C',
    gst: 'Pending Registration',
    bank: { bankName: 'Axis Bank', accNo: 'XXXXXX3319', ifsc: 'UTIB0001092' },
    portfolioCount: 8,
    skills: ['Collar Stitching', 'Embroidery Work', 'Kurta Drafting'],
    applicationDate: '2026-09-21'
  }
];

// Delivery Partners Dataset & Verification
export const MOCK_DELIVERY_PARTNERS = [
  {
    id: 'dp-201',
    name: 'Manoj Gowda',
    phone: '+91 98800 11990',
    location: 'HSR Layout, Bengaluru',
    vehicle: 'Ather 450X (EV Bike)',
    vehicleNo: 'KA-05-EV-4412',
    drivingLicense: 'KA052021008419',
    aadhaar: 'XXXX-XXXX-5521',
    bank: { bankName: 'Canara Bank', accNo: 'XXXXXX1298', ifsc: 'CNRB0001124' },
    verification: 'Approved',
    deliveries: 1240,
    completed: 1232,
    failed: 5,
    cancelled: 3,
    earnings: 48500,
    rating: 4.96,
    status: 'Active',
    joinedDate: '2025-11-10'
  },
  {
    id: 'dp-202',
    name: 'Deepak Sharma',
    phone: '+91 97420 33118',
    location: 'Indiranagar, Bengaluru',
    vehicle: 'Honda Shine 125',
    vehicleNo: 'KA-01-AB-8821',
    drivingLicense: 'KA012020004918',
    aadhaar: 'XXXX-XXXX-9912',
    bank: { bankName: 'HDFC Bank', accNo: 'XXXXXX4481', ifsc: 'HDFC0000841' },
    verification: 'Approved',
    deliveries: 980,
    completed: 968,
    failed: 7,
    cancelled: 5,
    earnings: 39200,
    rating: 4.91,
    status: 'Active',
    joinedDate: '2026-01-15'
  },
  {
    id: 'dp-203',
    name: 'Suresh Patil',
    phone: '+91 99160 55442',
    location: 'Whitefield, Bengaluru',
    vehicle: 'Bajaj Pulsar 150',
    vehicleNo: 'KA-04-MM-9102',
    drivingLicense: 'KA042022001194',
    aadhaar: 'XXXX-XXXX-3381',
    bank: { bankName: 'SBI', accNo: 'XXXXXX8821', ifsc: 'SBIN0004018' },
    verification: 'Pending',
    deliveries: 0,
    completed: 0,
    failed: 0,
    cancelled: 0,
    earnings: 0,
    rating: 0,
    status: 'Pending',
    joinedDate: '2026-09-21'
  }
];

// Designers Dataset & Verification
export const MOCK_DESIGNERS = [
  {
    id: 'des-301',
    name: 'Ritu Varma',
    brandName: 'Atelier Riva',
    phone: '+91 98200 44112',
    location: 'Bandra, Mumbai',
    experience: '8 Years',
    specialization: 'Contemporary Ethnic & Luxury Bridal',
    verification: 'Approved',
    projects: 142,
    approvedDesigns: 54,
    rejectedDesigns: 3,
    orders: 380,
    revenue: 1140000,
    rating: 4.94,
    status: 'Active',
    portfolioUrl: 'instagram.com/atelier_riva',
    certifications: ['NIFT Mumbai Apparel Design (2018)']
  },
  {
    id: 'des-302',
    name: 'Kavya Pillai',
    brandName: 'Aura Pret Couture',
    phone: '+91 98450 77119',
    location: 'Koramangala, Bengaluru',
    experience: '6 Years',
    specialization: 'Western Gowns & Handcrafted Drapes',
    verification: 'Approved',
    projects: 98,
    approvedDesigns: 42,
    rejectedDesigns: 2,
    orders: 290,
    revenue: 870000,
    rating: 4.91,
    status: 'Active',
    portfolioUrl: 'behance.net/kavyapillai',
    certifications: ['Pearl Academy Fashion Styling (2020)']
  },
  {
    id: 'des-303',
    name: 'Aakash Verma',
    brandName: 'AV Monogram',
    phone: '+91 99110 33441',
    location: 'Hauz Khas, Delhi',
    experience: '4 Years',
    specialization: 'Men Sustainable Streetwear & Bandhgalas',
    verification: 'Pending',
    projects: 18,
    approvedDesigns: 0,
    rejectedDesigns: 0,
    orders: 0,
    revenue: 0,
    rating: 0,
    status: 'Pending',
    portfolioUrl: 'instagram.com/av_monogram',
    certifications: ['NID Ahmedabad Textile Design']
  }
];

// Customers Dataset
export const MOCK_CUSTOMERS = [
  {
    id: 'CUST-801',
    name: 'Rahul Verma',
    phone: '+91 98450 12345',
    email: 'rahul.verma@techcorp.in',
    location: 'HSR Layout, Bengaluru',
    orders: 14,
    totalSpent: 48600,
    lastOrder: '2026-09-18',
    status: 'Active',
    joinedDate: '2025-08-14',
    tier: 'Platinum Atelier VIP',
    reviewsGiven: 8,
    complaintsCount: 0
  },
  {
    id: 'CUST-802',
    name: 'Priya Sundaram',
    phone: '+91 97410 88231',
    email: 'priya.sundaram@gmail.com',
    location: 'Indiranagar, Bengaluru',
    orders: 9,
    totalSpent: 62400,
    lastOrder: '2026-09-20',
    status: 'Active',
    joinedDate: '2025-10-02',
    tier: 'Gold Bespoke',
    reviewsGiven: 6,
    complaintsCount: 0
  },
  {
    id: 'CUST-803',
    name: 'Meenakshi Iyer',
    phone: '+91 98860 99420',
    email: 'meenakshi.iyer@live.com',
    location: 'Malleshwaram, Bengaluru',
    orders: 6,
    totalSpent: 16800,
    lastOrder: '2026-09-15',
    status: 'Active',
    joinedDate: '2026-02-18',
    tier: 'Silver Regular',
    reviewsGiven: 3,
    complaintsCount: 1
  },
  {
    id: 'CUST-804',
    name: 'Vikram Malhotra',
    phone: '+91 98110 55432',
    email: 'vikram.m@investments.com',
    location: 'Bandra West, Mumbai',
    orders: 18,
    totalSpent: 92400,
    lastOrder: '2026-09-12',
    status: 'Active',
    joinedDate: '2025-06-20',
    tier: 'Platinum Atelier VIP',
    reviewsGiven: 12,
    complaintsCount: 0
  },
  {
    id: 'CUST-805',
    name: 'Siddharth Rao',
    phone: '+91 97312 99018',
    email: 'siddharth.r@yahoo.com',
    location: 'Jayanagar, Bengaluru',
    orders: 2,
    totalSpent: 3800,
    lastOrder: '2026-08-01',
    status: 'Blocked',
    joinedDate: '2026-07-10',
    tier: 'Standard',
    reviewsGiven: 1,
    complaintsCount: 3
  }
];

// Stitching Failures & Quality Control
export const STITCHING_FAILURES = [
  {
    id: 'FL-901',
    orderId: 'STB-10248',
    tailor: 'Ananya Bridal Studio',
    category: "Women's Tailoring",
    failureReason: 'Wrong Size / Fit Issue',
    customer: 'Meenakshi Iyer',
    orderValue: 2400,
    date: '2026-09-21',
    resolution: 'Rework Approved',
    status: 'In Progress',
    notes: 'Waist seam was taken in by 1.5 inches too tight compared to digital card.'
  },
  {
    id: 'FL-902',
    orderId: 'STB-10192',
    tailor: 'Imperial Cut Ateliers',
    category: "Men's Tailoring",
    failureReason: 'Wrong Measurement',
    customer: 'Arun Nair',
    orderValue: 4200,
    date: '2026-09-19',
    resolution: 'Replacement Order Created',
    status: 'Resolved',
    notes: 'Shoulder width measured 17 instead of 18.5 in gig visit report.'
  },
  {
    id: 'FL-903',
    orderId: 'STB-10174',
    tailor: 'Auto Leather Craft',
    category: 'Vehicle Seat Covers',
    failureReason: 'Wrong Fabric / Material',
    customer: 'Ramesh K.',
    orderValue: 6500,
    date: '2026-09-17',
    resolution: 'Refunded',
    status: 'Closed',
    notes: 'Matte black ordered, glossy leatherette delivered.'
  },
  {
    id: 'FL-904',
    orderId: 'STB-10150',
    tailor: 'Vogue Craft Tailors',
    category: 'Uniform Stitching',
    failureReason: 'Poor Stitching / Loose Threading',
    customer: 'St. Paul School',
    orderValue: 32000,
    date: '2026-09-14',
    resolution: 'Rework Completed',
    status: 'Resolved',
    notes: '8 blazers had double-stitch hem misalignment.'
  }
];

// Failure Reasons Distribution
export const FAILURE_REASONS_BREAKDOWN = [
  { reason: 'Wrong Measurement', count: 38, percentage: '26.0%' },
  { reason: 'Wrong Size / Fit', count: 32, percentage: '21.9%' },
  { reason: 'Poor Stitching / Finish', count: 24, percentage: '16.4%' },
  { reason: 'Wrong Fabric / Color', count: 18, percentage: '12.3%' },
  { reason: 'Customer Requested Changes', count: 14, percentage: '9.6%' },
  { reason: 'Wrong Design / Silhouette', count: 10, percentage: '6.8%' },
  { reason: 'Damaged Material', count: 6, percentage: '4.1%' },
  { reason: 'Late Completion', count: 4, percentage: '2.7%' }
];

// Bulk Orders Dataset
export const MOCK_BULK_ORDERS = [
  {
    id: 'BLK-401',
    company: 'St. Joseph Academy',
    contact: 'Father Francis (+91 80 2211 4455)',
    category: 'School Uniform Blazers',
    quantity: 120,
    estimatedValue: 168000,
    assignedTailor: 'Vogue Craft Tailors',
    status: 'Production',
    deadline: '2026-10-05',
    payment: '50% Advance'
  },
  {
    id: 'BLK-402',
    company: 'Grand Oberoi Hotel & Spa',
    contact: 'Chef Sanjeev Kapur (+91 98200 77881)',
    category: 'Chef Coats & Aprons',
    quantity: 250,
    estimatedValue: 245000,
    assignedTailor: 'Imperial Cut Ateliers',
    status: 'Quality Check',
    deadline: '2026-09-28',
    payment: 'Paid 100%'
  },
  {
    id: 'BLK-403',
    company: 'Aura Fitness Chain',
    contact: 'Karan Mehra (+91 99881 22334)',
    category: 'Custom Dri-fit Trainer Tees',
    quantity: 500,
    estimatedValue: 195000,
    assignedTailor: 'Vogue Craft Tailors',
    status: 'Quotation',
    deadline: '2026-10-20',
    payment: 'Pending Approval'
  }
];

// Vehicle Seat Covers Dataset
export const MOCK_VEHICLE_SEAT_ORDERS = [
  {
    id: 'VSC-501',
    customer: 'Amitabh Sen',
    vehicleType: 'Car',
    vehicleModel: 'Hyundai Creta 2024',
    seatType: 'Full Bucket Set (5 Seater)',
    material: 'Perforated Nappa Leather (Dual Tan/Black)',
    tailor: 'Auto Leather Craft',
    location: 'Bengaluru',
    price: 7800,
    status: 'Quality Check',
    delivery: 'Doorstep Fitting Scheduled',
    date: '2026-09-19'
  },
  {
    id: 'VSC-502',
    customer: 'Kishore Kumar',
    vehicleType: 'Bike',
    vehicleModel: 'Royal Enfield Classic 350',
    seatType: 'Split Touring Seat with Gel Cushion',
    material: 'Distressed Brown Leatherette with Diamond Quilt',
    tailor: 'Auto Leather Craft',
    location: 'Bengaluru',
    price: 2400,
    status: 'Delivered',
    delivery: 'Delivered & Fitted',
    date: '2026-09-18'
  },
  {
    id: 'VSC-503',
    customer: 'TransCity Cab Fleet',
    vehicleType: 'Commercial Vehicle',
    vehicleModel: 'Toyota Innova Crysta (7 Seater)',
    seatType: 'Heavy Duty Commercial Covers',
    material: 'High-Density Breathable PU Leather',
    tailor: 'Auto Leather Craft',
    location: 'Bengaluru',
    price: 9400,
    status: 'Stitching',
    delivery: 'Pickup from Workshop',
    date: '2026-09-21'
  }
];

// Payments & Transactions
export const MOCK_PAYMENTS = [
  {
    id: 'TXN-7741',
    orderId: 'STB-10245',
    customer: 'Rahul Verma',
    amount: 5800,
    paymentMethod: 'UPI (Google Pay)',
    gateway: 'Razorpay',
    status: 'Successful',
    date: '2026-09-18 10:32 AM',
    refundStatus: '-'
  },
  {
    id: 'TXN-7742',
    orderId: 'STB-10246',
    customer: 'Priya Sundaram',
    amount: 14500,
    paymentMethod: 'Credit Card (HDFC Regalia)',
    gateway: 'Cashfree',
    status: 'Successful',
    date: '2026-09-20 11:18 AM',
    refundStatus: '-'
  },
  {
    id: 'TXN-7743',
    orderId: 'STB-10247',
    customer: 'Amitabh Sen',
    amount: 7800,
    paymentMethod: 'NetBanking (ICICI)',
    gateway: 'Razorpay',
    status: 'Successful',
    date: '2026-09-19 09:05 AM',
    refundStatus: '-'
  },
  {
    id: 'TXN-7744',
    orderId: 'STB-10174',
    customer: 'Ramesh K.',
    amount: 6500,
    paymentMethod: 'Credit Card (Axis Bank)',
    gateway: 'PayU',
    status: 'Refunded',
    date: '2026-09-17 02:40 PM',
    refundStatus: 'Full Refund ₹6,500'
  },
  {
    id: 'TXN-7745',
    orderId: 'STB-10250',
    customer: 'Sunil Mehta',
    amount: 3200,
    paymentMethod: 'UPI (PhonePe)',
    gateway: 'Razorpay',
    status: 'Failed',
    date: '2026-09-22 01:10 PM',
    refundStatus: '-'
  }
];

// Customer Reviews & Ratings
export const MOCK_REVIEWS = [
  {
    id: 'REV-601',
    customer: 'Priya Sundaram',
    orderId: 'STB-10246',
    tailor: 'Ananya Bridal Studio',
    designer: 'Kavya Pillai',
    deliveryPartner: 'Deepak Sharma',
    rating: 5,
    comment: 'Exquisite bridal stitching! The hand embroidery and custom fit exceeded my expectations.',
    date: '2026-09-22',
    status: 'Published'
  },
  {
    id: 'REV-602',
    customer: 'Rahul Verma',
    orderId: 'STB-10245',
    tailor: 'Vogue Craft Tailors',
    designer: 'Atelier Riva',
    deliveryPartner: 'Manoj Gowda',
    rating: 5,
    comment: 'Master Rajesh crafted a world-class tuxedo. Home measurement visit by student was prompt and polite.',
    date: '2026-09-22',
    status: 'Published'
  },
  {
    id: 'REV-603',
    customer: 'Meenakshi Iyer',
    orderId: 'STB-10248',
    tailor: 'Ananya Bridal Studio',
    designer: '-',
    deliveryPartner: 'Manoj Gowda',
    rating: 3,
    comment: 'Fabric is lovely, but kurti waist was a bit tight. Tailor agreed to rework it free of cost.',
    date: '2026-09-21',
    status: 'Under Review'
  },
  {
    id: 'REV-604',
    customer: 'Kishore Kumar',
    orderId: 'VSC-502',
    tailor: 'Auto Leather Craft',
    designer: '-',
    deliveryPartner: 'Manoj Gowda',
    rating: 5,
    comment: 'Bike seat cover quality is pure leather feel. Diamond quilt pattern looks menacing on the Classic 350.',
    date: '2026-09-19',
    status: 'Published'
  }
];

// Complaints & Support Disputes
export const MOCK_COMPLAINTS = [
  {
    id: 'TKT-101',
    category: 'Quality / Fit',
    orderId: 'STB-10248',
    customer: 'Meenakshi Iyer',
    tailor: 'Ananya Bridal Studio',
    subject: 'Kurta waist seam 1.5 inches tighter than specified',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Support Executive Swati',
    createdAt: '2026-09-21 03:30 PM',
    slaDeadline: '2026-09-22 03:30 PM'
  },
  {
    id: 'TKT-102',
    category: 'Payment / Refund',
    orderId: 'STB-10174',
    customer: 'Ramesh K.',
    tailor: 'Auto Leather Craft',
    subject: 'Refund status inquiry for returned seat cover',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: 'Finance Team',
    createdAt: '2026-09-18 11:20 AM',
    slaDeadline: '2026-09-19 11:20 AM'
  },
  {
    id: 'TKT-103',
    category: 'Delivery Delay',
    orderId: 'STB-10239',
    customer: 'Anjali Menon',
    tailor: 'Vogue Craft Tailors',
    subject: 'Delivery delayed due to rain in Indiranagar',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Logistics Desk',
    createdAt: '2026-09-20 05:00 PM',
    slaDeadline: '2026-09-21 05:00 PM'
  }
];

// Categories & Services Management
export const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: "Men's Tailoring", status: 'Active', ordersCount: 4850, basePrice: 399, subcategories: ['Shirts', 'Suits', 'Trousers', 'Kurtas', 'Sherwanis'] },
  { id: 'cat-2', name: "Women's Tailoring", status: 'Active', ordersCount: 5640, basePrice: 499, subcategories: ['Kurtis', 'Salwar Suits', 'Saree Blouses', 'Gowns', 'Skirts'] },
  { id: 'cat-3', name: 'Bridal Wear', status: 'Active', ordersCount: 840, basePrice: 2499, subcategories: ['Bridal Lehengas', 'Zardozi Blouses', 'Reception Gowns'] },
  { id: 'cat-4', name: 'Kids Wear', status: 'Active', ordersCount: 1980, basePrice: 299, subcategories: ['Frocks', 'Kids Ethnic', 'School Uniforms', 'Party Suits'] },
  { id: 'cat-5', name: 'Alterations & Fit', status: 'Active', ordersCount: 3200, basePrice: 149, subcategories: ['Hemming', 'Sleeve Adjustment', 'Waist Fit', 'Zipper Replacement'] },
  { id: 'cat-6', name: 'Vehicle Seat Covers', status: 'Active', ordersCount: 1420, basePrice: 1999, subcategories: ['Car Full Sets', 'Bike Saddles', 'Commercial Vans'] },
  { id: 'cat-7', name: 'Bags & Leathers', status: 'Active', ordersCount: 740, basePrice: 899, subcategories: ['Tote Bags', 'Leather Backpacks', 'Laptop Sleeves'] },
  { id: 'cat-8', name: 'Sofas & Cushions', status: 'Active', ordersCount: 390, basePrice: 1499, subcategories: ['Sofa Slips', 'Cushion Covers', 'Recliner Trims'] },
  { id: 'cat-9', name: 'Pets Clothing', status: 'Active', ordersCount: 410, basePrice: 399, subcategories: ['Dog Vests', 'Cat Capes', 'Festive Outfits'] },
  { id: 'cat-10', name: 'Bulk Orders', status: 'Active', ordersCount: 310, basePrice: 299, subcategories: ['Corporate Uniforms', 'Hotel Apparel', 'College Lab Coats'] }
];

export const INITIAL_SERVICES = [
  { id: 'srv-1', category: "Men's Tailoring", name: 'Bespoke 2-Piece Suit Stitching', price: 4500, estDays: 7, status: 'Active' },
  { id: 'srv-2', category: "Men's Tailoring", name: 'Formal Shirt Tailoring', price: 650, estDays: 3, status: 'Active' },
  { id: 'srv-3', category: "Women's Tailoring", name: 'Designer Blouse Stitching', price: 1200, estDays: 4, status: 'Active' },
  { id: 'srv-4', category: "Women's Tailoring", name: 'Anarkali Suit Stitching', price: 2200, estDays: 6, status: 'Active' },
  { id: 'srv-5', category: 'Bridal Wear', name: 'Handcrafted Bridal Lehenga', price: 8500, estDays: 14, status: 'Active' },
  { id: 'srv-6', category: 'Vehicle Seat Covers', name: 'Nappa Leather Car Seat Set', price: 7800, estDays: 5, status: 'Active' },
  { id: 'srv-7', category: 'Alterations & Fit', name: 'Pant Length & Waist Alteration', price: 199, estDays: 1, status: 'Active' }
];

// Admin Users & Permissions Matrix
export const MOCK_ADMIN_USERS = [
  { id: 'u-1', name: 'Kiran Kumar', email: 'kiran.m@stitchbee.in', phone: '9845012345', role: 'Super Admin', status: 'Active', access: 'All Modules' },
  { id: 'u-2', name: 'Sunil Rao', email: 'sunil.r@stitchbee.in', phone: '9845023456', role: 'Operations Admin', status: 'Active', access: 'Orders, Stitching, Deliveries' },
  { id: 'u-3', name: 'Deepa Krishnan', email: 'deepa.k@stitchbee.in', phone: '9845034567', role: 'Verification Admin', status: 'Active', access: 'Tailors, Delivery, Designers' },
  { id: 'u-4', name: 'Venkatesh Iyer', email: 'venkat.i@stitchbee.in', phone: '9845045678', role: 'Finance Admin', status: 'Active', access: 'Payments, Refunds, Payouts' },
  { id: 'u-5', name: 'Pooja Hegde', email: 'pooja.h@stitchbee.in', phone: '9845056789', role: 'Support Admin', status: 'Active', access: 'Complaints, Reviews, Tickets' }
];

// Authorized Administrator Phone Registry (Requirement #67)
export const AUTHORIZED_ADMIN_USERS = {
  '9845012345': { ...ADMIN_USER },
  '9845023456': { id: 'u-2', name: 'Sunil Rao', email: 'sunil.r@stitchbee.in', phone: '9845023456', role: 'Operations Admin', avatar: 'SR', department: 'Operations Management' },
  '9845034567': { id: 'u-3', name: 'Deepa Krishnan', email: 'deepa.k@stitchbee.in', phone: '9845034567', role: 'Verification Admin', avatar: 'DK', department: 'Partner KYC & Auditing' },
  '9845045678': { id: 'u-4', name: 'Venkatesh Iyer', email: 'venkat.i@stitchbee.in', phone: '9845045678', role: 'Finance Admin', avatar: 'VI', department: 'Finance & Payouts' },
  '9845056789': { id: 'u-5', name: 'Pooja Hegde', email: 'pooja.h@stitchbee.in', phone: '9845056789', role: 'Support Admin', avatar: 'PH', department: 'Grievance Resolution' },
  '9876543210': { id: 'adm-demo', name: 'Super Admin', email: 'admin@stitchbee.in', phone: '9876543210', role: 'Super Admin', avatar: 'SA', department: 'Platform Operations' }
};

export const PERMISSION_MATRIX = [
  { module: 'Dashboard & Metrics', SuperAdmin: true, OpsAdmin: true, FinanceAdmin: true, VerificationAdmin: true, SupportAdmin: true },
  { module: 'Order Lifecycle Management', SuperAdmin: true, OpsAdmin: true, FinanceAdmin: false, VerificationAdmin: false, SupportAdmin: true },
  { module: 'Partner Verification (Approve/Reject)', SuperAdmin: true, OpsAdmin: false, FinanceAdmin: false, VerificationAdmin: true, SupportAdmin: false },
  { module: 'Payment Gateways & Refunds', SuperAdmin: true, OpsAdmin: false, FinanceAdmin: true, VerificationAdmin: false, SupportAdmin: false },
  { module: 'Stitching Failure Rework & Penalties', SuperAdmin: true, OpsAdmin: true, FinanceAdmin: true, VerificationAdmin: false, SupportAdmin: false },
  { module: 'Category & Catalog Configuration', SuperAdmin: true, OpsAdmin: true, FinanceAdmin: false, VerificationAdmin: false, SupportAdmin: false },
  { module: 'Admin Users & Platform Settings', SuperAdmin: true, OpsAdmin: false, FinanceAdmin: false, VerificationAdmin: false, SupportAdmin: false }
];

// Platform Configuration Settings
export const PLATFORM_SETTINGS = {
  platformCommissionPercent: 15,
  expressDeliverySurgePercent: 20,
  freeAlterationDays: 7,
  maxHomeVisitRadiusKm: 12,
  razorpayActive: true,
  cashfreeActive: true,
  payuActive: true,
  autoAssignDelivery: true,
  requireGstForTailorsAboveAnnualRevenue: 2000000
};
