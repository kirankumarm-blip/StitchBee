import React, { useState, useRef } from 'react';
import { 
  Scissors, ShoppingBag, TrendingUp, Check, Play, Award, Ruler, ArrowRight, Save, Plus, 
  Trash2, Clock, Send, MessageSquare, ShieldAlert, Calendar, ShieldCheck, Database, 
  Bell, Sun, Moon, Sparkles, Star, Edit, Upload, User, Video, MapPin, Map, CreditCard, 
  ChevronDown, ChevronRight, ChevronLeft, X, Info, Heart, List, HelpCircle, Activity, FileText, Filter, Users, Eye,
  Layers, Sliders, Truck, Search, Mail, Smile, Phone, Paperclip, Home, Menu, LogOut, DollarSign, LayoutGrid,
  RotateCw, ArrowUpRight, TrendingDown, Lock
} from 'lucide-react';
import OrdersPage from './orders/OrdersPage';
import EarningsPage from './earnings/EarningsPage';
import ReviewsPage from './reviews/ReviewsPage';
import ChatSupportPage from './chat/ChatSupportPage';
import InventoryPage from './inventory/InventoryPage';
import HeaderProfileModal from './HeaderProfileModal';

export default function TailorView({ 
  tailors, setTailors, orders, updateOrderStatus, theme, setTheme, currentUser, onLogout, onSwitchToDesigner 
}) {
  // Simulating logged-in tailor: Vogue Craft Tailors (id: 't1')
  const [selectedStoreId, setSelectedStoreId] = useState('t1');
  const tailorProfile = tailors.find(t => t.id === selectedStoreId) || tailors[0];

  // Primary active tabs: dashboard, orders, measurements, inventory, calendar, earnings, chat, reviews, profile, notifications, portfolio, material-requests, team
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Orders tab sub-filtering: 'new' | 'active' | 'completed' | 'cancelled'
  const [ordersSubTab, setOrdersSubTab] = useState('active');

  // Chat center tabs: 'customer' | 'admin' | 'delivery'
  const [chatSubTab, setChatSubTab] = useState('customer');

  // Search queries
  const [measurementSearch, setMeasurementSearch] = useState('');
  const [inventorySearch, setInventorySearch] = useState('');

  // Redesigned Measurements page states
  const [customersList, setCustomersList] = useState([
    {
      name: 'Priya Sharma',
      id: 'CUST-1024',
      cat: 'Women',
      phone: '98765 43210',
      email: 'priya.sharma@email.com',
      image: '/bridal 5.jpg',
      chest: 34,
      waist: 28,
      hip: 36,
      shoulder: 14.5,
      sleeve: 18,
      upperArm: 10.5,
      neck: 13.5,
      fullLength: 56,
      notes: 'Customer prefers slim fit. Extra margin added for comfort.',
      source: 'AI Scan',
      updated: '22 May 2026, 10:30 AM',
      history: [
        { date: '22 May 2026, 10:30 AM', source: 'AI Scan' },
        { date: '20 Feb 2026, 04:15 PM', source: 'Manual' },
        { date: '10 Nov 2025, 11:20 AM', source: 'Existing Dress' }
      ]
    },
    {
      name: 'Amit Verma',
      id: 'CUST-1023',
      cat: 'Men',
      phone: '98765 43211',
      email: 'amit.verma@email.com',
      image: '/men1.jpg',
      chest: 38,
      waist: 32,
      hip: 38,
      shoulder: 17,
      sleeve: 24,
      upperArm: 13.5,
      neck: 15.5,
      fullLength: 29,
      notes: 'Prefers slightly loose fit around shoulder.',
      source: 'Manual',
      updated: '20 May 2026, 04:15 PM',
      history: [
        { date: '20 May 2026, 04:15 PM', source: 'Manual' }
      ]
    },
    {
      name: 'Megha Reddy',
      id: 'CUST-1022',
      cat: 'Women',
      phone: '98765 43212',
      email: 'megha.reddy@email.com',
      image: '/bridal2.jpg',
      chest: 36,
      waist: 34,
      hip: 38,
      shoulder: 15,
      sleeve: 19,
      upperArm: 11,
      neck: 14,
      fullLength: 42,
      notes: 'Anarkali custom border fits.',
      source: 'Existing Dress',
      updated: '18 May 2026, 11:20 AM',
      history: [
        { date: '18 May 2026, 11:20 AM', source: 'Existing Dress' }
      ]
    },
    {
      name: 'Rahul Nair',
      id: 'CUST-1021',
      cat: 'Men',
      phone: '98765 43213',
      email: 'rahul.nair@email.com',
      image: '/men2.jpg',
      chest: 40,
      waist: 34,
      hip: 40,
      shoulder: 18,
      sleeve: 25,
      upperArm: 14,
      neck: 16,
      fullLength: 30,
      notes: 'Formal shirt standard fit.',
      source: 'AI Scan',
      updated: '17 May 2026, 09:15 AM',
      history: [
        { date: '17 May 2026, 09:15 AM', source: 'AI Scan' }
      ]
    },
    {
      name: 'Neha Singh',
      id: 'CUST-1019',
      cat: 'Women',
      phone: '98765 43214',
      email: 'neha.singh@email.com',
      image: '/bridal3.jpg',
      chest: 32,
      waist: 26,
      hip: 34,
      shoulder: 13.5,
      sleeve: 17,
      upperArm: 9.5,
      neck: 12.5,
      fullLength: 54,
      notes: 'Regular designer fit.',
      source: 'AI Scan',
      updated: '15 May 2026, 02:30 PM',
      history: [
        { date: '15 May 2026, 02:30 PM', source: 'AI Scan' }
      ]
    },
    {
      name: 'Sanjay Mehta',
      id: 'CUST-1018',
      cat: 'Men',
      phone: '98765 43215',
      email: 'sanjay.mehta@email.com',
      image: '/men1.jpg',
      chest: 42,
      waist: 36,
      hip: 42,
      shoulder: 19,
      sleeve: 26,
      upperArm: 14.5,
      neck: 16.5,
      fullLength: 31,
      notes: 'Wants premium finish.',
      source: 'Manual',
      updated: '12 May 2026, 10:15 AM',
      history: [
        { date: '12 May 2026, 10:15 AM', source: 'Manual' }
      ]
    },
    {
      name: 'Kavya Patel',
      id: 'CUST-1017',
      cat: 'Women',
      phone: '98765 43216',
      email: 'kavya.patel@email.com',
      image: '/bridal4.jpg',
      chest: 35,
      waist: 29,
      hip: 37,
      shoulder: 14,
      sleeve: 18,
      upperArm: 10,
      neck: 13,
      fullLength: 55,
      notes: 'Bridesmaid lehenga dress.',
      source: 'Existing Dress',
      updated: '10 May 2026, 11:00 AM',
      history: [
        { date: '10 May 2026, 11:00 AM', source: 'Existing Dress' }
      ]
    }
  ]);

  const [selectedCustomerId, setSelectedCustomerId] = useState('CUST-1024');
  const [measurementUnit, setMeasurementUnit] = useState('inch'); // 'inch' | 'cm'
  const [measurementsSubTab, setMeasurementsSubTab] = useState('body'); // 'body' | 'chart' | '3d'
  const [hoveredMeasurementRow, setHoveredMeasurementRow] = useState(null); // 'chest' | 'waist' | 'hip' | etc.

  // Calendar redesign states
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 5, 1)); // Default June 2026
  const [calendarViewMode, setCalendarViewMode] = useState('month'); // 'month' | 'week' | 'day'
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date(2026, 5, 20)); // Default June 20, 2026
  const [calendarEvents, setCalendarEvents] = useState([
    { id: 1, date: new Date(2026, 5, 19), time: '10:00 AM', type: 'Pick up & Delivery', customer: 'Priya Sharma', details: 'Pick up: Silk Fabric', service: 'Lehenga Stitching' },
    { id: 2, date: new Date(2026, 5, 20), time: '10:00 AM', type: 'Pick up & Delivery', customer: 'Priya Sharma', details: 'Pick up: Silk Fabric', service: 'Lehenga Stitching' },
    { id: 3, date: new Date(2026, 5, 20), time: '04:00 PM', type: 'Stitching Deadline', customer: 'Priya Sharma', details: 'Delivery: Lehenga', service: 'Bridal Lehenga' },
    { id: 4, date: new Date(2026, 5, 20), time: '06:00 PM', type: 'Appointment', customer: 'Amit Verma', details: 'Fitting Appointment', service: '3-Piece Suit' },
    { id: 5, date: new Date(2026, 5, 20), time: '03:30 PM', type: 'Appointment', customer: 'Kavitha Iyer', details: 'Suit Alteration Fitting', service: 'Suit Alteration' },
    { id: 6, date: new Date(2026, 5, 21), time: '11:30 AM', type: 'Appointment', customer: 'Sneha Iyer', details: 'Measurement & Fabric Choice', service: 'Anarkali Suit' },
    { id: 7, date: new Date(2026, 5, 22), time: '10:00 AM', type: 'Stitching Deadline', customer: 'Neha Singh', details: 'Blouse Stitching Deadline', service: 'Blouse Stitching' },
    { id: 8, date: new Date(2026, 5, 22), time: '01:00 PM', type: 'Stitching Deadline', customer: 'Neha Singh', details: 'Salwar Suit Stitching Deadline', service: 'Salwar Suit' },
    { id: 9, date: new Date(2026, 5, 22), time: '04:30 PM', type: 'Pick up & Delivery', customer: 'Rohit Roy', details: 'Sherwani Delivery', service: 'Wedding Sherwani' },
    { id: 10, date: new Date(2026, 5, 23), time: '02:30 PM', type: 'Stitching Deadline', customer: 'Ananya Goel', details: 'Designer Blouse Trial', service: 'Designer Blouse' },
    { id: 11, date: new Date(2026, 5, 24), time: '05:00 PM', type: 'Pick up & Delivery', customer: 'Vikram Seth', details: 'Linen Suit Delivery', service: 'Linen Suit' },
    { id: 12, date: new Date(2026, 5, 25), time: '03:00 PM', type: 'Pick up & Delivery', customer: 'Sanjay Mehta', details: 'Kurta Home Delivery', service: 'Silk Kurta' },
    { id: 13, date: new Date(2026, 5, 2), time: '02:00 PM', type: 'Stitching Deadline', customer: 'Priya Sharma', details: 'Lehenga stitching completion', service: 'Lehenga' },
    { id: 14, date: new Date(2026, 5, 10), time: '11:00 AM', type: 'Stitching Deadline', customer: 'Amit Verma', details: 'Custom Suit stitching completion', service: 'Custom Suit' },
    { id: 15, date: new Date(2026, 5, 12), time: '09:30 AM', type: 'Appointment', customer: 'Priya Sharma', details: 'Lehenga Stitching Fitting', service: 'Lehenga Fitting' },
    { id: 16, date: new Date(2026, 5, 15), time: '04:00 PM', type: 'Stitching Deadline', customer: 'Megha Reddy', details: 'Anarkali stitching completion', service: 'Anarkali' }
  ]);
  const [calendarFilters, setCalendarFilters] = useState(['Stitching Deadline', 'Pick up & Delivery', 'Appointment', 'Holiday', 'Blocked Date']);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showBlockDatesModal, setShowBlockDatesModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // New Event Form State
  const [newEventCust, setNewEventCust] = useState('');
  const [newEventTime, setNewEventTime] = useState('12:00 PM');
  const [newEventDate, setNewEventDate] = useState('2026-06-02');
  const [newEventType, setNewEventType] = useState('Stitching Deadline');
  const [newEventDetails, setNewEventDetails] = useState('');

  // Block Dates Form State
  const [blockStartDate, setBlockStartDate] = useState('2026-06-12');
  const [blockEndDate, setBlockEndDate] = useState('2026-06-14');

  // Editable Profile fields
  const [shopName, setShopName] = useState(tailorProfile?.name || 'Vogue Craft Tailors');
  const [ownerName, setOwnerName] = useState(tailorProfile?.owner || 'Master Rajesh Kumar');
  const [shopSpecialty, setShopSpecialty] = useState(tailorProfile?.specialty || 'Premium Bridal & Suits');
  const [shopAddress, setShopAddress] = useState(tailorProfile?.address || 'HSR Layout, Bengaluru');
  const [shopHours, setShopHours] = useState('09:00 AM - 09:00 PM');
  const [shopRadius, setShopRadius] = useState('15');
  const [workingDays, setWorkingDays] = useState('Mon - Sat');
  const [stitchingCapacity, setStitchingCapacity] = useState('30');
  const [kycStatus, setKycStatus] = useState('Verified');
  const [bankAccount, setBankAccount] = useState('HDFC Bank •••• 9821');

  // Real-time Orders Command Center States
  const [ordersListState, setOrdersListState] = useState([
    { id: 'ORD-1024', customer: 'Priya Sharma', image: '/bridal 5.jpg', outfit: 'Bridal Lehenga', fabric: 'Net Fabric', date: '22 May 2026', daysLeft: '3 days left', progress: 65, status: 'In Progress', amount: 8500, createdDate: '2026-05-10' },
    { id: 'ORD-1023', customer: 'Amit Verma', image: '/men1.jpg', outfit: 'Sherwani', fabric: 'Silk Fabric', date: '25 May 2026', daysLeft: '6 days left', progress: 30, status: 'Stitching', amount: 12350, createdDate: '2026-05-12' },
    { id: 'ORD-1022', customer: 'Megha Reddy', image: '/bridal2.jpg', outfit: 'Anarkali Suit', fabric: 'Georgette', date: '28 May 2026', daysLeft: '9 days left', progress: 20, status: 'Cutting', amount: 6750, createdDate: '2026-05-14' },
    { id: 'ORD-1021', customer: 'Rahul Nair', image: '/men2.jpg', outfit: 'Formal Shirt', fabric: 'Cotton', date: '29 May 2026', daysLeft: '10 days left', progress: 0, status: 'Pending', amount: 2150, createdDate: '2026-05-15' },
    { id: 'ORD-1019', customer: 'Neha Singh', image: '/bridal 5.jpg', outfit: 'Saree Blouse', fabric: 'Silk', date: '31 May 2026', daysLeft: '12 days left', progress: 75, status: 'In Progress', amount: 1850, createdDate: '2026-05-08' },
    { id: 'ORD-1018', customer: 'Karan Johar', image: '/men2.jpg', outfit: 'Bandhgala Suit', fabric: 'Velvet', date: '15 May 2026', daysLeft: 'Completed', progress: 100, status: 'Completed', amount: 15000, createdDate: '2026-05-01' },
    { id: 'ORD-1017', customer: 'Sita Ram', image: '/bridal2.jpg', outfit: 'Salwar Kameez', fabric: 'Cotton silk', date: '10 May 2026', daysLeft: 'Completed', progress: 100, status: 'Completed', amount: 3200, createdDate: '2026-04-28' },
    { id: 'ORD-1016', customer: 'Vijay Devar', image: '/men1.jpg', outfit: 'Kurta Pyjama', fabric: 'Linen', date: '05 May 2026', daysLeft: 'Cancelled', progress: 0, status: 'Cancelled', amount: 2500, createdDate: '2026-04-25' }
  ]);

  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [ordersSortBy, setOrdersSortBy] = useState('date');
  const [ordersSortAsc, setOrdersSortAsc] = useState(true);
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);
  const [ordersFilterModalOpen, setOrdersFilterModalOpen] = useState(false);
  const [ordersFilterStatus, setOrdersFilterStatus] = useState('all');
  const [ordersFilterFabric, setOrdersFilterFabric] = useState('all');
  const [ordersFilterMinPrice, setOrdersFilterMinPrice] = useState('');
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState(null);
  const [ordersLastUpdatedSeconds, setOrdersLastUpdatedSeconds] = useState(3);
  const [ordersTimeRange, setOrdersTimeRange] = useState('Today');
  const [ordersDonutTimeRange, setOrdersDonutTimeRange] = useState('This Week');
  const [performanceTimeRange, setPerformanceTimeRange] = useState('This Week');
  const [revenueTimeRange, setRevenueTimeRange] = useState('7 Days');

  const [ordersActivityLog, setOrdersActivityLog] = useState([
    { id: 1, customer: 'Rahul Nair', text: 'Order #ORD-1021 placed in Pending Queue', time: 'Just now', type: 'pending' },
    { id: 2, customer: 'Priya Sharma', text: 'Bridal Lehenga trial completed', time: '2 min ago', type: 'progress' },
    { id: 3, customer: 'Amit Verma', text: 'Sherwani sleeve measurement verified', time: '5 min ago', type: 'measurement' },
    { id: 4, customer: 'Megha Reddy', text: 'Georgette fabric cutting initiated', time: '8 min ago', type: 'cutting' }
  ]);

  // Live timer tick effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setOrdersLastUpdatedSeconds(prev => (prev > 59 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Interactive Stitching Queue progress state
  const [stitchingQueue, setStitchingQueue] = useState([
    { id: 'ORD-1024', customer: 'Priya Sharma', image: '/bridal 5.jpg', outfit: 'Bridal Lehenga', fabric: 'Net Fabric', date: '22 May 2026', daysLeft: '3 days left', progress: 65, status: 'In Progress' },
    { id: 'ORD-1023', customer: 'Amit Verma', image: '/men1.jpg', outfit: 'Sherwani', fabric: 'Silk Fabric', date: '25 May 2026', daysLeft: '6 days left', progress: 30, status: 'Stitching' },
    { id: 'ORD-1022', customer: 'Megha Reddy', image: '/bridal2.jpg', outfit: 'Anarkali Suit', fabric: 'Georgette', date: '28 May 2026', daysLeft: '9 days left', progress: 10, status: 'Cutting' },
    { id: 'ORD-1021', customer: 'Rahul Nair', image: '/men2.jpg', outfit: 'Formal Shirt', fabric: 'Cotton', date: '29 May 2026', daysLeft: '10 days left', progress: 0, status: 'Pending' }
  ]);

  // Incoming Booking Requests
  const [bookingRequests, setBookingRequests] = useState([
    { id: 'REQ-901', customer: 'Ananya Goel', outfit: 'Designer Blouse', fabric: 'Chanderi Silk', distance: '1.2 km', estPrice: '₹1,200', date: 'Just now' },
    { id: 'REQ-902', customer: 'Vikram Seth', outfit: 'Linen Kurta Suit', fabric: 'Premium Linen', distance: '2.5 km', estPrice: '₹3,500', date: '10m ago' }
  ]);

  // Inventory Stock list
  const [inventoryStock, setInventoryStock] = useState([
    { id: 'inv-1', category: 'Thread Spools', name: 'Premium Polyester Thread', quantity: 350, unit: 'spools', status: 'Good', icon: <Database size={18} /> },
    { id: 'inv-2', category: 'Fabric Rolls', name: 'Cotton Silk Blend Fabric', quantity: 45, unit: 'meters', status: 'Good', icon: <Layers size={18} /> },
    { id: 'inv-3', category: 'Accessories', name: 'High-Strength Metal Zippers', quantity: 120, unit: 'pieces', status: 'Low Stock', icon: <Sliders size={18} /> },
    { id: 'inv-4', category: 'Accessories', name: 'Designer Pearl Buttons', quantity: 850, unit: 'pieces', status: 'Good', icon: <Award size={18} /> }
  ]);

  // New stock add
  const [newStockCategory, setNewStockCategory] = useState('Fabric Rolls');
  const [newStockName, setNewStockName] = useState('');
  const [newStockQty, setNewStockQty] = useState('');
  const [newStockUnit, setNewStockUnit] = useState('meters');

  // Material purchase requests from admin
  const [materialRequests, setMaterialRequests] = useState([
    { id: 'REQ-MAT-01', material: 'Golden Zari Border Rolls', qty: '10 rolls', status: 'Pending Approval', date: '28 Jun 2026' },
    { id: 'REQ-MAT-02', material: 'Velvet Base Fabric (Deep Red)', qty: '25 meters', status: 'Approved & Dispatched', date: '25 Jun 2026' }
  ]);
  const [newReqMaterialName, setNewReqMaterialName] = useState('');
  const [newReqMaterialQty, setNewReqMaterialQty] = useState('');

  // Team members list
  const [teamMembers, setTeamMembers] = useState([
    { id: 'tm-1', name: 'Ramesh Sen', role: 'Master Cutting Specialist', status: 'Active', tasks: 'ORD-1022 (Cutting)' },
    { id: 'tm-2', name: 'Suhail Khan', role: 'Senior Embroidery Artist', status: 'Active', tasks: 'ORD-1024 (Embroidery)' },
    { id: 'tm-3', name: 'Savita Devi', role: 'Junior Stitching Assistant', status: 'Active', tasks: 'ORD-1023 (Base Stitching)' }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Stitching Assistant');

  // Calendar scheduler schedule
  const [selectedDay, setSelectedDay] = useState(20);
  const [todaySchedule, setTodaySchedule] = useState([
    { time: '10:00 AM', title: 'Pick up: Silk Fabric', type: 'pickup', desc: 'Customer: Priya Sharma' },
    { time: '04:00 PM', title: 'Delivery: Lehenga', type: 'delivery', desc: 'Customer: Priya Sharma' },
    { time: '06:00 PM', title: 'Appointment', type: 'appointment', desc: 'Customer: Amit Verma' }
  ]);

  // Earnings filter & chart interactive state
  const [earningsFilter, setEarningsFilter] = useState('this_week');
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);

  // Chat window state
  const [typedMessage, setTypedMessage] = useState('');
  const [activeChatUser, setActiveChatUser] = useState('priya'); // 'priya' | 'amit' | 'sneha' | 'neha' | 'rahul' | 'admin_support' | 'delivery_partner' | 'ai_assistant'
  const [chatSearch, setChatSearch] = useState('');
  const [chatFilter, setChatFilter] = useState('all'); // 'all' | 'unread' | 'priority' | 'groups'
  const [rightSidebarTab, setRightSidebarTab] = useState('details'); // 'details' | 'timeline' | 'files' | 'ai_assistant'
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [mobileChatView, setMobileChatView] = useState('left'); // 'left' | 'middle' | 'right'

  const [chatHistory, setChatHistory] = useState({
    priya: [
      { sender: 'customer', text: 'Hi, is my suit stitching ready?', time: '11:30 AM' },
      { sender: 'tailor', text: "Hello Priya! \uD83D\uDE0A Yes, your stitching is completed. We're doing final quality check. We will share photos with you shortly.", time: '11:32 AM', status: 'read' },
      { sender: 'tailor', type: 'order-card', orderNo: '#SB-1024', status: 'In Progress', item: 'Bridal Lehenga', desc: 'Peach • Net Fabric', progress: 80, due: '22 Jun 2024', amount: '₹8,500', time: '11:33 AM', statusCheck: 'read' }
    ],
    amit: [
      { sender: 'customer', text: 'Thanks! Please share the final photo when completed.', time: 'Yesterday' },
      { sender: 'tailor', text: 'Sure Amit, will share it by tomorrow afternoon.', time: 'Yesterday', status: 'read' }
    ],
    sneha: [
      { sender: 'customer', text: 'Payment received, thank you!', time: 'Yesterday' },
      { sender: 'tailor', text: 'Great! Your delivery has been dispatched.', time: 'Yesterday', status: 'read' }
    ],
    neha: [
      { sender: 'customer', text: 'Please call me when free.', time: '2 days ago' },
      { sender: 'tailor', text: 'Will call you in 10 minutes.', time: '2 days ago', status: 'read' }
    ],
    rahul: [
      { sender: 'customer', text: 'Ok, noted. See you tomorrow.', time: '2 days ago' },
      { sender: 'tailor', text: 'Perfect, see you.', time: '2 days ago', status: 'read' }
    ],
    admin_support: [
      { sender: 'admin', text: 'Aadhaar card verification completed. Shop status is active.', time: '3 days ago' },
      { sender: 'tailor', text: 'Thank you for the verification approval.', time: '3 days ago', status: 'read' }
    ],
    delivery_partner: [
      { sender: 'delivery', text: 'I am on my way to deliver Order #SB-1024.', time: 'Today' },
      { sender: 'tailor', text: 'Excellent, the package is ready at the shop.', time: 'Today', status: 'read' }
    ],
    ai_assistant: [
      { sender: 'ai', text: 'Hello! I am your StitchBee AI Assistant. How can I help you manage your stitching orders today?', time: 'Today' }
    ]
  });

  // Notifications
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, type: 'new_order', text: 'New order booking request received from Ananya Goel', time: 'Just now', unread: true },
    { id: 2, type: 'message', text: 'Priya Sharma sent a message: "When will my lehenga be ready?"', time: '2m ago', unread: true },
    { id: 3, type: 'low_inventory', text: 'Alert: Zippers count is below threshold (120 remaining)', time: '45m ago', unread: true },
    { id: 4, type: 'payment', text: 'Payment of ₹12,350 for Completed Order #ORD-1019 released', time: '3h ago', unread: false }
  ]);

  // Mock Reviews
  const [reviewsList, setReviewsList] = useState([
    { 
      id: 1, 
      author: 'Priya Sharma', 
      rating: 5, 
      date: '1 week ago', 
      orderNo: '#ORD-1024', 
      tag: 'Wedding Lehenga', 
      avatar: '/why_join_1.jpg',
      text: 'Rajesh did an outstanding job on my wedding lehenga! The fit is perfect, and the zari work is extremely premium.' 
    },
    { 
      id: 2, 
      author: 'Amit Verma', 
      rating: 4, 
      date: '2 weeks ago', 
      orderNo: '#ORD-1023', 
      tag: 'Sherwani', 
      avatar: '/tailor_hero_3.jpg',
      text: 'Great sherwani stitching, fits very well. Deliver was delayed by a couple of hours but overall very good service.' 
    },
    { 
      id: 3, 
      author: 'Neha Singh', 
      rating: 5, 
      date: '3 weeks ago', 
      orderNo: '#ORD-1022', 
      tag: 'Blouse', 
      avatar: '/why_join_2.jpg',
      text: 'Loved the blouse stitching. The finishing and fitting is top notch. Highly recommended!' 
    },
    { 
      id: 4, 
      author: 'Rahul Mehta', 
      rating: 5, 
      date: '1 month ago', 
      orderNo: '#ORD-1021', 
      tag: 'Kurta Pajama', 
      avatar: '/tailor_hero_4.jpg',
      text: 'Very professional and polite. The kurta pajama stitching was perfect. Will definitely order again.' 
    }
  ]);

  // Tailor reviews tab filter & sort states
  const [reviewsFilter, setReviewsFilter] = useState('all'); // 'all' | '5' | '4' | '3' | '1-2'
  const [reviewsSort, setReviewsSort] = useState('latest'); // 'latest' | 'highest' | 'lowest'
  const [reviewsDateRange, setReviewsDateRange] = useState('2 Jun - 8 Jun 2026');
  const [showRequestReviewModal, setShowRequestReviewModal] = useState(false);

  // Handle stitching queue updates
  const handleUpdateProgress = (orderId, amount) => {
    setStitchingQueue(stitchingQueue.map(item => {
      if (item.id === orderId) {
        const nextProgress = Math.min(100, Math.max(0, item.progress + amount));
        let nextStatus = item.status;
        if (nextProgress === 0) nextStatus = 'Pending';
        else if (nextProgress < 30) nextStatus = 'Cutting';
        else if (nextProgress < 90) nextStatus = 'Stitching';
        else if (nextProgress < 100) nextStatus = 'QC';
        else nextStatus = 'Ready';
        return { ...item, progress: nextProgress, status: nextStatus };
      }
      return item;
    }));
  };

  const handleStartStitching = (orderId) => {
    setStitchingQueue(stitchingQueue.map(item => {
      if (item.id === orderId) {
        return { ...item, progress: 10, status: 'Cutting' };
      }
      return item;
    }));
  };

  // Add stock item
  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newStockName || !newStockQty) return;
    const newStock = {
      id: 'inv-' + Math.floor(Math.random() * 10000),
      category: newStockCategory,
      name: newStockName,
      quantity: parseInt(newStockQty),
      unit: newStockUnit,
      status: parseInt(newStockQty) < 50 ? 'Low Stock' : 'Good',
      icon: newStockCategory === 'Fabric Rolls' ? <Layers size={18} /> : newStockCategory === 'Thread Spools' ? <Database size={18} /> : <Sliders size={18} />
    };
    setInventoryStock([...inventoryStock, newStock]);
    setNewStockName('');
    setNewStockQty('');
    alert('Stock updated successfully!');
  };

  // Trigger material requests
  const handleRequestMaterial = (e) => {
    e.preventDefault();
    if (!newReqMaterialName || !newReqMaterialQty) return;
    const newReq = {
      id: 'REQ-MAT-' + Math.floor(Math.random() * 100),
      material: newReqMaterialName,
      qty: newReqMaterialQty,
      status: 'Pending Approval',
      date: '28 Jun 2026'
    };
    setMaterialRequests([newReq, ...materialRequests]);
    setNewReqMaterialName('');
    setNewReqMaterialQty('');
    alert('Request submitted to admin for purchase approval!');
  };

  // Add worker
  const handleAddWorker = (e) => {
    e.preventDefault();
    if (!newMemberName) return;
    const newMember = {
      id: 'tm-' + Math.floor(Math.random() * 100),
      name: newMemberName,
      role: newMemberRole,
      status: 'Active',
      tasks: 'None assigned'
    };
    setTeamMembers([...teamMembers, newMember]);
    setNewMemberName('');
    alert('Team member registered successfully!');
  };

  // Send message
  const handleSendMessage = () => {
    if (!typedMessage) return;
    const now = new Date();
    const hrs = now.getHours();
    const mins = now.getMinutes().toString().padStart(2, '0');
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    const hr12 = hrs % 12 || 12;
    const timeStr = `${hr12}:${mins} ${ampm}`;
    const newMsg = { sender: 'tailor', text: typedMessage, time: timeStr, status: 'read' };

    setChatHistory(prev => ({
      ...prev,
      [activeChatUser]: [...(prev[activeChatUser] || []), newMsg]
    }));
    setTypedMessage('');

    // Simulated auto-reply
    setTimeout(() => {
      let replyText = "Alright! Let me double check that and get back to you.";
      if (activeChatUser === 'ai_assistant') {
        replyText = "I've analyzed your request. I can assist in setting order status updates, calculating measurements, or reviewing fabric options.";
      }
      const replyMsg = { 
        sender: activeChatUser === 'ai_assistant' ? 'ai' : 
                (activeChatUser === 'admin_support' ? 'admin' : 
                 (activeChatUser === 'delivery_partner' ? 'delivery' : 'customer')), 
        text: replyText, 
        time: timeStr 
      };
      setChatHistory(prev => ({
        ...prev,
        [activeChatUser]: [...(prev[activeChatUser] || []), replyMsg]
      }));
    }, 1500);
  };

  return (
    <div style={{
      background: theme === 'dark' ? '#0b0914' : '#f8fafc',
      color: theme === 'dark' ? '#f3f4f6' : '#0f172a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* 1. TOP HEADER BANNER NAVIGATION */}
      <header className="top-nav">
        {/* Logo & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="mobile-menu-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: '6px', 
              color: 'var(--text-primary)', 
              cursor: 'pointer', 
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Menu size={24} />
          </button>

          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="logo" 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <img src="/logo.png" alt="StitchBee" style={{ height: '80px', width: '240px', objectFit: 'contain', display: 'block', marginLeft: '-40px' }} />
          </div>
        </div>

        {/* Web / Desktop Header Navigation Options */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-header-nav">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <Home size={15} /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingBag size={15} /> },
            { id: 'measurements', label: 'Measurements', icon: <Ruler size={15} /> },
            { id: 'inventory', label: 'Inventory', icon: <Database size={15} /> },
            { id: 'calendar', label: 'Calendar', icon: <Calendar size={15} /> },
            { id: 'earnings', label: 'Earnings', icon: <DollarSign size={15} /> },
            { id: 'chat', label: 'Support', icon: <MessageSquare size={15} /> },
            { id: 'reviews', label: 'Reviews', icon: <Star size={15} /> }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '24px',
                  border: isActive ? '2px solid #F72585' : '2px solid transparent',
                  background: isActive 
                    ? (theme === 'dark' ? 'rgba(247,37,133,0.12)' : '#FFF0F6') 
                    : 'transparent',
                  color: isActive 
                    ? '#F72585' 
                    : (theme === 'dark' ? 'rgba(255,255,255,0.85)' : '#475467'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(247,37,133,0.15)' : 'none'
                }}
              >
                {React.cloneElement(tab.icon, { color: isActive ? '#F72585' : 'currentColor' })}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side Quick Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '6px' }}
          >
            {theme === 'dark' ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: 'var(--primary)' }} />}
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileDropdown(false);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '6px', display: 'flex' }}
            >
              <Bell size={18} />
              {notificationsList.filter(n => n.unread).length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: '14px',
                  height: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {notificationsList.filter(n => n.unread).length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                width: '320px',
                background: theme === 'dark' ? '#141126' : '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                padding: '16px',
                zIndex: 1100
              }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Notifications 
                  <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setNotificationsList(notificationsList.map(n => ({...n, unread: false})))}>Mark all read</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
                  {notificationsList.map(notif => (
                    <div key={notif.id} style={{
                      padding: '8px',
                      borderRadius: '6px',
                      background: notif.unread ? (theme === 'dark' ? 'rgba(247,37,133,0.08)' : 'rgba(247,37,133,0.03)') : 'transparent',
                      fontSize: '0.75rem',
                      borderBottom: '1px solid var(--border-color)'
                    }}>
                      <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: notif.unread ? 'bold' : 'normal' }}>{notif.text}</p>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Online/Offline Toggle */}
          <button 
            onClick={() => setIsOnline(!isOnline)}
            style={{
              background: isOnline ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              border: `1px solid ${isOnline ? '#10b981' : '#ef4444'}`,
              color: isOnline ? '#10b981' : '#ef4444',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#10b981' : '#ef4444' }}></span>
            {isOnline ? 'Online' : 'Offline'}
          </button>

          {/* User profile dropdown */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => {
                setActiveTab('profile');
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifications(false);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                <img src="/bridal 5.jpg" alt="Tailor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="desktop-header-user-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Master Rajesh</span>
                <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 'bold' }}>TAILOR</span>
              </div>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} className="desktop-header-user-info" />
            </div>

            {/* Profile Component Modal */}
            {showProfileDropdown && (
              <HeaderProfileModal
                userRole="tailor"
                userName={ownerName || "Master Rajesh"}
                userAvatar="/bridal 5.jpg"
                theme={theme}
                setTheme={setTheme}
                onViewProfile={() => setActiveTab('profile')}
                onSwitchPortal={() => { if (onSwitchToDesigner) onSwitchToDesigner(); }}
                onLogout={onLogout}
                onClose={() => setShowProfileDropdown(false)}
              />
            )}
          </div>
        </div>
      </header>

      {/* 2. BODY CONTAINER FOR SELECTED TABS */}
      <main style={{ flex: 1, padding: '24px 24px 90px 24px', width: '100%' }}>

        {/* TAB 1: STITCHBEE TAILOR DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>
            
            {/* 1. WELCOME BANNER */}
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              alignItems: 'center', 
              background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#ffffff', 
              padding: '18px 20px', 
              borderRadius: '12px', 
              border: '1px solid var(--border-color)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)', flexShrink: 0 }}>
                <img src="/bridal 5.jpg" alt="Master Rajesh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, lineHeight: '1.3', color: 'var(--text-primary)' }}>
                  Welcome back, Master Rajesh Kumar 👋
                </h3>
                <p style={{ margin: '3px 0 0 0', fontSize: '12px', fontWeight: 400, color: 'var(--text-secondary)' }}>
                  Here's what is happening with your store today.
                </p>
              </div>
            </div>

            {/* 2. SIX STATISTICS CARDS IN ONE ROW ON DESKTOP */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              {[
                { 
                  label: "Today's Orders", 
                  value: '8', 
                  change: '↑ 2 from yesterday', 
                  accentColor: '#f72585', 
                  badgeBg: 'rgba(247,37,133,0.1)',
                  isGrowth: true
                },
                { 
                  label: 'In Progress', 
                  value: '14', 
                  change: 'View details →', 
                  accentColor: '#f72585', 
                  badgeBg: 'rgba(247,37,133,0.1)',
                  action: () => setActiveTab('orders'),
                  isLink: true
                },
                { 
                  label: 'Completed Orders', 
                  value: '24', 
                  change: '↑ 12% this week', 
                  accentColor: '#10b981', 
                  badgeBg: 'rgba(16,185,129,0.1)',
                  isGrowth: true
                },
                { 
                  label: "Today's Earnings", 
                  value: '₹4,500', 
                  change: '↑ 8% from yesterday', 
                  accentColor: '#f59e0b', 
                  badgeBg: 'rgba(245,158,11,0.1)',
                  isGrowth: true
                },
                { 
                  label: 'Store Rating', 
                  value: '4.8', 
                  change: '★★★★★ (120 reviews)', 
                  accentColor: '#3b82f6', 
                  badgeBg: 'rgba(59,130,246,0.1)',
                  action: () => setActiveTab('reviews'),
                  isRating: true
                },
                { 
                  label: 'Pending Payments', 
                  value: '₹12,350', 
                  change: 'View details →', 
                  accentColor: '#ef4444', 
                  badgeBg: 'rgba(239,68,68,0.1)',
                  action: () => setActiveTab('earnings'),
                  isLink: true
                }
              ].map((card, idx) => (
                <div 
                  key={idx} 
                  onClick={card.action}
                  style={{
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                    cursor: card.action ? 'pointer' : 'default',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{card.label}</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: card.accentColor, opacity: 0.8 }}></span>
                  </div>
                  
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.1' }}>
                    {card.value}
                  </div>

                  <div style={{ fontSize: '11px', fontWeight: card.isLink ? 600 : 400, color: card.isLink ? card.accentColor : card.isRating ? '#f59e0b' : 'var(--text-muted)' }}>
                    {card.change}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. MAIN CONTENT GRID: 50% / 50% ACTIVE STITCHING QUEUE & TODAY'S SCHEDULE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              
              {/* Left Column: Active Stitching Queue */}
              <div style={{
                background: theme === 'dark' ? '#141126' : '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Active Stitching Queue</h4>
                  <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    View All Orders →
                  </button>
                </div>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                        <th style={{ padding: '8px 6px', fontSize: '11px', fontWeight: 600 }}>Customer</th>
                        <th style={{ padding: '8px 6px', fontSize: '11px', fontWeight: 600 }}>Outfit & Fabric</th>
                        <th style={{ padding: '8px 6px', fontSize: '11px', fontWeight: 600 }}>Delivery Date</th>
                        <th style={{ padding: '8px 6px', fontSize: '11px', fontWeight: 600 }}>Progress</th>
                        <th style={{ padding: '8px 6px', fontSize: '11px', fontWeight: 600 }}>Status</th>
                        <th style={{ padding: '8px 6px', fontSize: '11px', fontWeight: 600, textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stitchingQueue.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '12px 6px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.customer}</div>
                            <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)' }}>#{item.id}</span>
                          </td>
                          <td style={{ padding: '12px 6px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)' }}>{item.outfit}</div>
                            <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)' }}>{item.fabric}</span>
                          </td>
                          <td style={{ padding: '12px 6px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.date}</div>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#ef4444' }}>{item.daysLeft}</span>
                          </td>
                          <td style={{ padding: '12px 6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{ flex: 1, height: '5px', minWidth: '50px', background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${item.progress}%`, background: item.progress === 100 ? '#10b981' : 'var(--primary)', borderRadius: '3px' }}></div>
                              </div>
                              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.progress}%</span>
                            </div>
                          </td>
                          <td style={{ padding: '12px 6px' }}>
                            <span style={{
                              padding: '3px 8px',
                              borderRadius: '12px',
                              fontSize: '10px',
                              fontWeight: 600,
                              background: item.status === 'Ready' ? 'rgba(16,185,129,0.1)' : 
                                          item.status === 'Stitching' ? 'rgba(114,9,183,0.1)' :
                                          item.status === 'Cutting' ? 'rgba(245,158,11,0.1)' :
                                          item.status === 'Pending' ? (theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9') : 
                                          'rgba(247,37,133,0.1)',
                              color: item.status === 'Ready' ? '#10b981' : 
                                     item.status === 'Stitching' ? '#8b5cf6' :
                                     item.status === 'Cutting' ? '#f59e0b' :
                                     item.status === 'Pending' ? 'var(--text-muted)' : 
                                     'var(--primary)'
                            }}>{item.status}</span>
                          </td>
                          <td style={{ padding: '12px 6px', textAlign: 'right' }}>
                            {item.progress < 100 ? (
                              <button 
                                className="btn btn-primary" 
                                style={{ padding: '4px 10px', fontSize: '11px', fontWeight: 600, borderRadius: '20px' }}
                                onClick={() => handleUpdateProgress(item.id, 15)}
                              >
                                Update
                              </button>
                            ) : (
                              <button 
                                className="btn btn-secondary" 
                                style={{ padding: '4px 10px', fontSize: '11px', fontWeight: 600, borderRadius: '20px', borderColor: '#10b981', color: '#10b981' }}
                                onClick={() => alert(`${item.customer}'s order marked ready for delivery Handover!`)}
                              >
                                Handover
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Today's Schedule */}
              {(() => {
                const activeDate = selectedCalendarDate || new Date(2026, 5, 20);
                
                // Calculate 7 days of current week (Monday -> Sunday)
                const dayIndex = (activeDate.getDay() + 6) % 7; // Mon=0 ... Sun=6
                const monday = new Date(activeDate);
                monday.setDate(activeDate.getDate() - dayIndex);

                const weekDaysList = Array.from({ length: 7 }, (_, i) => {
                  const d = new Date(monday);
                  d.setDate(monday.getDate() + i);
                  return d;
                });

                // Filter actual calendar events for activeDate
                const activeDayEvents = calendarEvents.filter(e => {
                  const ed = e.date instanceof Date ? e.date : new Date(e.date);
                  return ed.getFullYear() === activeDate.getFullYear() &&
                         ed.getMonth() === activeDate.getMonth() &&
                         ed.getDate() === activeDate.getDate();
                });

                // Helper for border badge colors
                const getEventBorderColor = (type) => {
                  if (type === 'Pick up & Delivery') return '#f59e0b';
                  if (type === 'Stitching Deadline') return '#10b981';
                  if (type === 'Appointment') return '#3b82f6';
                  if (type === 'Blocked Date') return '#ef4444';
                  return 'var(--primary)';
                };

                return (
                  <div style={{
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Today's Schedule</h4>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>
                          {activeDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <button onClick={() => setActiveTab('calendar')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                        View Calendar →
                      </button>
                    </div>

                    {/* Dynamic 7-Day Date Carousel */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                      {weekDaysList.map((dayDate, idx) => {
                        const isSelected = dayDate.toDateString() === activeDate.toDateString();
                        const hasEvent = calendarEvents.some(e => {
                          const ed = e.date instanceof Date ? e.date : new Date(e.date);
                          return ed.toDateString() === dayDate.toDateString();
                        });

                        const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayNum = dayDate.getDate();

                        return (
                          <div 
                            key={idx}
                            onClick={() => setSelectedCalendarDate(new Date(dayDate))}
                            style={{
                              padding: '6px 8px',
                              borderRadius: '8px',
                              background: isSelected ? 'var(--primary)' : 'transparent',
                              color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                              textAlign: 'center',
                              cursor: 'pointer',
                              flex: 1,
                              position: 'relative',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span style={{ fontSize: '11px', fontWeight: 500, display: 'block', color: isSelected ? '#ffffff' : 'var(--text-secondary)' }}>{dayName}</span>
                            <strong style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginTop: '2px', color: isSelected ? '#ffffff' : 'var(--text-primary)' }}>{dayNum}</strong>
                            {hasEvent && !isSelected && (
                              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)', position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)' }}></span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Schedule Event List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '140px' }}>
                      {activeDayEvents.length > 0 ? (
                        activeDayEvents.map((evt, idx) => (
                          <div key={idx} style={{
                            padding: '12px 14px',
                            borderRadius: '8px',
                            background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#f8fafc',
                            borderLeft: `4px solid ${getEventBorderColor(evt.type)}`,
                            borderTop: '1px solid var(--border-color)',
                            borderRight: '1px solid var(--border-color)',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div>
                              <span style={{ fontSize: '13px', fontWeight: 700, display: 'block', color: 'var(--text-primary)' }}>
                                {evt.details || evt.type}
                              </span>
                              <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-secondary)' }}>
                                {evt.customer ? `Customer: ${evt.customer}` : evt.type}
                              </span>
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                              {evt.time}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '24px 12px', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
                          <Calendar size={20} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400, textAlign: 'center' }}>No schedule or deadlines for this day</span>
                          <button 
                            className="btn btn-secondary" 
                            style={{ fontSize: '11px', fontWeight: 600, padding: '4px 12px', marginTop: '4px' }}
                            onClick={() => setShowAddEventModal(true)}
                          >
                            + Add Event
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 4. SECONDARY CONTENT: THREE EQUAL COLUMNS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              
              {/* Column 1: New Booking Requests */}
              <div style={{
                background: theme === 'dark' ? '#141126' : '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>New Booking Requests</h4>
                {bookingRequests.length === 0 ? (
                  <p style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)' }}>No pending booking requests.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {bookingRequests.map(req => (
                      <div key={req.id} style={{
                        padding: '12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : '#f8fafc'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{req.customer}</span>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{req.estPrice}</span>
                        </div>
                        <p style={{ margin: '4px 0', fontSize: '11px', fontWeight: 400, color: 'var(--text-secondary)' }}>Outfit: {req.outfit} • Fabric: {req.fabric}</p>
                        <span style={{ fontSize: '10px', fontWeight: 400, color: 'var(--text-muted)' }}>📍 Distance: {req.distance} • {req.date}</span>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                          <button 
                            className="btn btn-primary" 
                            style={{ flex: 1, padding: '5px', fontSize: '11px', fontWeight: 600, borderRadius: '6px' }}
                            onClick={() => {
                              alert(`Booking request accepted! Added to active stitch queue.`);
                              setBookingRequests(bookingRequests.filter(b => b.id !== req.id));
                            }}
                          >
                            Accept
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            style={{ flex: 1, padding: '5px', fontSize: '11px', fontWeight: 600, borderRadius: '6px' }}
                            onClick={() => setBookingRequests(bookingRequests.filter(b => b.id !== req.id))}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Column 2: Inventory Snapshot */}
              <div style={{
                background: theme === 'dark' ? '#141126' : '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Inventory Snapshot</h4>
                  <button onClick={() => setActiveTab('inventory')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    View Stock →
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {inventoryStock.map(item => (
                    <div key={item.id} style={{
                      padding: '12px 10px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      background: item.status === 'Low Stock' ? (theme === 'dark' ? 'rgba(239,68,68,0.1)' : 'rgba(254,242,242,0.8)') : (theme === 'dark' ? 'rgba(255,255,255,0.01)' : '#f8fafc')
                    }}>
                      <div style={{ color: item.status === 'Low Stock' ? '#ef4444' : 'var(--primary)', marginBottom: '4px', display: 'flex', justifyContent: 'center' }}>
                        {item.icon}
                      </div>
                      <strong style={{ fontSize: '14px', fontWeight: 700, display: 'block', color: 'var(--text-primary)' }}>
                        {item.quantity} {item.unit === 'meters' ? 'm' : ''}
                      </strong>
                      <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)' }}>{item.category}</span>
                      {item.status === 'Low Stock' && (
                        <span style={{ fontSize: '10px', fontWeight: 600, color: '#ef4444', display: 'block', marginTop: '2px' }}>Low Stock</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Recent Messages */}
              <div style={{
                background: theme === 'dark' ? '#141126' : '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Messages</h4>
                  <button onClick={() => setActiveTab('chat')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    Support →
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { name: 'Priya Sharma', text: 'When will my lehenga be ready?', time: '2m ago', avatar: '/bridal 5.jpg', count: 2 },
                    { name: 'Amit Verma', text: 'Thank you! I will share measurement...', time: '15m ago', avatar: '/men1.jpg', count: 1 },
                    { name: 'Admin Support', text: 'Payment of order #ORD-1023 rec...', time: '45m ago', avatar: '/stany.4f315ea9.jpg' }
                  ].map((chat, idx) => (
                    <div key={idx} onClick={() => setActiveTab('chat')} style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={chat.avatar} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{chat.name}</span>
                          <span style={{ fontSize: '10px', fontWeight: 400, color: 'var(--text-muted)' }}>{chat.time}</span>
                        </div>
                        <p style={{ margin: '2px 0 0 0', fontSize: '11px', fontWeight: 400, color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{chat.text}</p>
                      </div>
                      {chat.count && (
                        <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '10px', fontWeight: 600, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {chat.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 5. MONTHLY GOAL PROGRESS CARD */}
            <div style={{
              background: theme === 'dark' ? '#141126' : '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '18px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Monthly Goal Progress</h4>
                <p style={{ margin: '3px 0 0 0', fontSize: '12px', fontWeight: 400, color: 'var(--text-secondary)' }}>
                  Complete 10 more orders this month to unlock Gold Partner Badge and extra commissions!
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>20 / 30 Orders</span>
                <div style={{ width: '160px', height: '8px', background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '67%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
                </div>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '6px 14px', fontSize: '11px', fontWeight: 600, borderRadius: '20px' }} 
                  onClick={() => alert("Unlocking benefits: Free express fabric pickup & 5% higher payouts!")}
                >
                  View Benefits
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ORDERS - MODULAR RECHARTS ORDERS PAGE */}
        {activeTab === 'orders' && (
          <OrdersPage theme={theme} setActiveTab={setActiveTab} />
        )}

        {/* TAB 3: MEASUREMENTS */}
        {activeTab === 'measurements' && (() => {
          // Dynamic Active Customer lookup
          const activeCust = customersList.find(c => c.id === selectedCustomerId) || customersList[0];

          // Filter lists based on search
          const filteredCustomers = customersList.filter(c => 
            c.name.toLowerCase().includes(measurementSearch.toLowerCase()) ||
            c.id.toLowerCase().includes(measurementSearch.toLowerCase()) ||
            c.cat.toLowerCase().includes(measurementSearch.toLowerCase())
          );

          // Update active customer values in state
          const handleValueChange = (field, rawVal) => {
            const num = parseFloat(rawVal) || 0;
            // If in CM, convert back to inches for base storage
            const inchVal = measurementUnit === 'cm' ? (num / 2.54) : num;
            
            setCustomersList(customersList.map(c => {
              if (c.id === activeCust.id) {
                return { ...c, [field]: parseFloat(inchVal.toFixed(2)) };
              }
              return c;
            }));
          };

          // Render value according to unit
          const formatValue = (inches) => {
            if (measurementUnit === 'cm') {
              return (inches * 2.54).toFixed(1);
            }
            return inches.toString();
          };

          // Hotspot pulsing dots configurations
          const hotspots = {
            chest: { top: '28%', left: '49%' },
            waist: { top: '39%', left: '49%' },
            hip: { top: '48%', left: '49%' },
            shoulder: { top: '20%', left: '33%' },
            sleeve: { top: '36%', left: '26%' },
            upperArm: { top: '30%', left: '27%' },
            neck: { top: '13%', left: '49%' },
            fullLength: { top: '60%', left: '49%' }
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: "'Inter', sans-serif" }}>
              
              {/* HEADER THEME BANNER */}
              <div style={{
                background: theme === 'dark' 
                  ? '#141126' 
                  : 'linear-gradient(135deg, rgba(247,37,133,0.05) 0%, rgba(139,92,246,0.05) 100%)',
                padding: '24px',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '24px',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    background: theme === 'dark' ? 'rgba(247,37,133,0.15)' : 'rgba(247,37,133,0.1)', 
                    padding: '12px', 
                    borderRadius: '50%', 
                    color: '#F72585' 
                  }}>
                    <Ruler size={28} />
                  </div>
                  <div>
                    <h2 style={{ 
                      margin: 0, 
                      fontSize: '24px', 
                      fontWeight: 700, 
                      lineHeight: '32px',
                      color: theme === 'dark' ? '#ffffff' : '#172033' 
                    }}>Measurements</h2>
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      fontSize: '13px', 
                      fontWeight: 400,
                      lineHeight: '20px',
                      color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085' 
                    }}>Manage all customer body measurements</p>
                  </div>
                </div>

                {/* Top KPI Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '12px',
                  width: '100%',
                  maxWidth: '740px'
                }}>
                  {[
                    { label: 'Total Customers', val: '128', footer: '↑ 8 this month', isPos: true, icon: <Users size={16} /> },
                    { label: 'Total Measurements', val: '236', footer: '↑ 12 this month', isPos: true, icon: <FileText size={16} /> },
                    { label: 'AI Scan Measurements', val: '98', footer: '42% of total', isPos: false, icon: <Sparkles size={16} /> },
                    { label: 'Manual Measurements', val: '138', footer: '58% of total', isPos: false, icon: <Ruler size={16} /> }
                  ].map((card, idx) => (
                    <div key={idx} style={{
                      background: theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#ffffff',
                      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E4E7EC',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      boxShadow: theme === 'dark' ? 'none' : '0 1px 3px rgba(16,24,40,0.04)'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        fontSize: '11px', 
                        fontWeight: 500,
                        color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085' 
                      }}>
                        <span>{card.label}</span>
                        <span style={{ color: '#F72585' }}>{card.icon}</span>
                      </div>
                      <strong style={{ 
                        fontSize: '24px', 
                        fontWeight: 700, 
                        lineHeight: '30px',
                        color: theme === 'dark' ? '#ffffff' : '#172033' 
                      }}>{card.val}</strong>
                      <span style={{ 
                        fontSize: '10px', 
                        fontWeight: 400,
                        color: card.isPos ? '#12B76A' : (theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085') 
                      }}>{card.footer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* THREE-COLUMN WORKSPACE */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch' }}>
                
                {/* 1. LEFT SIDEBAR: CUSTOMERS */}
                <div style={{ 
                  flex: '1', 
                  minWidth: '260px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px',
                  padding: '20px',
                  background: theme === 'dark' ? '#141126' : '#ffffff',
                  border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                  borderRadius: '12px'
                }} className="glass-card-no-hover measurements-sidebar">
                  <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em', color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#344054', display: 'block' }}>
                    CUSTOMERS
                  </span>
                  
                  {/* Search and filter */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : '#98A2B3' }} />
                      <input 
                        type="text" 
                        placeholder="Search customer..." 
                        className="form-input" 
                        value={measurementSearch}
                        onChange={(e) => setMeasurementSearch(e.target.value)}
                        style={{ 
                          paddingLeft: '32px', 
                          width: '100%', 
                          height: '36px', 
                          fontSize: '12px', 
                          fontWeight: 400, 
                          color: theme === 'dark' ? '#ffffff' : '#344054', 
                          background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff',
                          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC'
                        }}
                      />
                    </div>
                    <button style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC',
                      borderRadius: '8px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme === 'dark' ? '#ffffff' : '#344054',
                      cursor: 'pointer'
                    }}>
                      <Sliders size={14} />
                    </button>
                  </div>

                  {/* Customer Scroll List */}
                  <div className="customer-scroll-list" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px', 
                    overflowY: 'auto', 
                    flex: 1, 
                    paddingRight: '4px' 
                  }}>
                    {filteredCustomers.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : '#98A2B3', fontSize: '12px' }}>No customers found</div>
                    ) : (
                      filteredCustomers.map(cust => {
                        const isSelected = selectedCustomerId === cust.id;
                        return (
                          <div 
                            key={cust.id}
                            onClick={() => setSelectedCustomerId(cust.id)}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '10px',
                              border: isSelected ? '1px solid #F72585' : (theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC'),
                              background: isSelected ? (theme === 'dark' ? 'rgba(247,37,133,0.15)' : 'rgba(247,37,133,0.03)') : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden' }}>
                                <img src={cust.image} alt={cust.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div>
                                <strong style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: isSelected ? (theme === 'dark' ? '#FF66B2' : '#F72585') : (theme === 'dark' ? '#ffffff' : '#1D2939') }}>{cust.name}</strong>
                                <span style={{ fontSize: '10px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#98A2B3' }}>{cust.id}</span>
                              </div>
                            </div>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '9px',
                              fontWeight: 600,
                              background: cust.cat === 'Women' ? (theme === 'dark' ? 'rgba(247,37,133,0.18)' : '#FCE7F3') : (theme === 'dark' ? 'rgba(37,99,235,0.18)' : '#EFF6FF'),
                              color: cust.cat === 'Women' ? (theme === 'dark' ? '#FF66B2' : '#D63384') : (theme === 'dark' ? '#60A5FA' : '#2563EB')
                            }}>{cust.cat}</span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Add Customer button */}
                  <button 
                    className="btn btn-primary" 
                    onClick={() => alert("Launching Add New Customer wizard...")}
                    style={{
                      width: '100%',
                      background: '#F72585',
                      border: 'none',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '11px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      marginTop: 'auto'
                    }}
                  >
                    <Plus size={14} /> Add New Customer
                  </button>
                </div>

                {/* 2. CENTER PANEL: ACTIVE CUSTOMER DETAIL */}
                <div style={{ 
                  flex: '3', 
                  minWidth: '320px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '20px',
                  padding: '24px',
                  background: theme === 'dark' ? '#141126' : '#ffffff',
                  border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                  borderRadius: '12px'
                }} className="glass-card-no-hover measurements-main-panel">
                  
                  {/* Active Customer Summary Banner */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                    paddingBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #F72585' }}>
                        <img src={activeCust.image} alt={activeCust.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>{activeCust.name}</h4>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '9px',
                            fontWeight: 600,
                            background: activeCust.cat === 'Women' ? (theme === 'dark' ? 'rgba(247,37,133,0.18)' : '#FCE7F3') : (theme === 'dark' ? 'rgba(37,99,235,0.18)' : '#EFF6FF'),
                            color: activeCust.cat === 'Women' ? (theme === 'dark' ? '#FF66B2' : '#D63384') : (theme === 'dark' ? '#60A5FA' : '#2563EB')
                          }}>{activeCust.cat}</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467' }}>
                          📞 {activeCust.phone} &nbsp;•&nbsp; ✉ {activeCust.email}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467', alignItems: 'center' }}>
                      <div>
                        <span style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : '#98A2B3', display: 'block', fontSize: '9px', fontWeight: 500 }}>Profile ID</span>
                        <strong style={{ fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054' }}>{activeCust.id}</strong>
                      </div>
                      <div style={{ borderLeft: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', paddingLeft: '16px' }}>
                        <span style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : '#98A2B3', display: 'block', fontSize: '9px', fontWeight: 500 }}>Last Updated</span>
                        <strong style={{ fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054' }}>{activeCust.updated}</strong>
                      </div>
                      <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054', background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff', height: '30px', borderRadius: '6px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC' }} onClick={() => alert("Edit customer details...")}>
                        <Edit size={12} style={{ marginRight: '4px' }} /> Edit Info
                      </button>
                    </div>
                  </div>

                  {/* Inner sub-tabs switcher */}
                  <div style={{ display: 'flex', gap: '10px', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', paddingBottom: '12px' }}>
                    {[
                      { id: 'body', label: 'Body Measurements', icon: <Ruler size={14} /> },
                      { id: 'chart', label: 'Measurement Chart', icon: <FileText size={14} /> },
                      { id: '3d', label: '3D View (Coming Soon)', icon: <Eye size={14} /> }
                    ].map(tab => {
                      const isActive = measurementsSubTab === tab.id;
                      const isDisabled = tab.id === '3d';
                      const textColor = isDisabled 
                        ? (theme === 'dark' ? 'rgba(255,255,255,0.3)' : '#98A2B3') 
                        : (isActive ? '#F72585' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085'));
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            if (!isDisabled) setMeasurementsSubTab(tab.id);
                            else alert("3D Mannequin fitting telemetry coming in StitchBee 2.0!");
                          }}
                          style={{
                            background: isActive ? (theme === 'dark' ? 'rgba(247,37,133,0.18)' : 'rgba(247,37,133,0.08)') : 'transparent',
                            border: isActive ? '1px solid #F72585' : '1px solid transparent',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: isActive ? 600 : 500,
                            color: textColor,
                            padding: '6px 12px',
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span style={{ color: textColor, display: 'inline-flex', alignItems: 'center' }}>{tab.icon}</span>
                          <span style={{ color: textColor }}>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Body Measurements tab panel */}
                  {measurementsSubTab === 'body' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, minHeight: 0 }}>
                      
                      {/* Unit switch row */}
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ 
                          display: 'flex', 
                          background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F8F9FB', 
                          borderRadius: '8px', 
                          padding: '3px',
                          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC'
                        }}>
                          <button
                            onClick={() => setMeasurementUnit('inch')}
                            style={{
                              background: measurementUnit === 'inch' ? (theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#ffffff') : 'transparent',
                              border: 'none',
                              color: measurementUnit === 'inch' ? (theme === 'dark' ? '#ffffff' : '#344054') : (theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#98A2B3'),
                              fontWeight: 600,
                              fontSize: '10px',
                              padding: '5px 14px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              boxShadow: measurementUnit === 'inch' ? '0 1px 3px rgba(16,24,40,0.08)' : 'none'
                            }}
                          >
                            Inches
                          </button>
                          <button
                            onClick={() => setMeasurementUnit('cm')}
                            style={{
                              background: measurementUnit === 'cm' ? (theme === 'dark' ? 'rgba(255,255,255,0.12)' : '#ffffff') : 'transparent',
                              border: 'none',
                              color: measurementUnit === 'cm' ? (theme === 'dark' ? '#ffffff' : '#344054') : (theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#98A2B3'),
                              fontWeight: 600,
                              fontSize: '10px',
                              padding: '5px 14px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              boxShadow: measurementUnit === 'cm' ? '0 1px 3px rgba(16,24,40,0.08)' : 'none'
                            }}
                          >
                            CM
                          </button>
                        </div>
                      </div>

                      {/* Split visual & table workspace */}
                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', flex: 1, minHeight: 0 }}>
                        
                        {/* Mannequin visual (left) */}
                        <div style={{ flex: '1.2', minWidth: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            position: 'relative', 
                            width: '100%',
                            maxWidth: '280px', 
                            background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8F9FB',
                            borderRadius: '12px',
                            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                            overflow: 'hidden',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                            <img 
                              src={activeCust.cat === 'Men' ? '/mannequin_male.png' : '/mannequin_female.png'} 
                              alt="Mannequin Guide" 
                              style={{ width: '100%', height: 'auto', maxHeight: '340px', display: 'block', objectFit: 'contain' }} 
                            />
                            
                            {/* Hotspot indicator overlay */}
                            {hoveredMeasurementRow && hotspots[hoveredMeasurementRow] && (
                              <div 
                                className="hotspot-dot active" 
                                style={{ 
                                  top: hotspots[hoveredMeasurementRow].top, 
                                  left: hotspots[hoveredMeasurementRow].left 
                                }} 
                              />
                            )}
                          </div>
                          <span 
                            style={{ fontSize: '11px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                            onClick={() => alert("Interactive measurement hotspots overlay automatically highlights points during hover.")}
                          >
                            <Info size={12} /> View Measurement Guide
                          </span>
                        </div>

                        {/* Key measurements table (right) */}
                        <div style={{ flex: '2', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>Key Measurements</span>
                          
                          <div style={{ overflowX: 'auto', flex: 1 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                              <thead>
                                <tr style={{ borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', textAlign: 'left' }}>
                                  <th style={{ padding: '8px 4px', fontSize: '11px', fontWeight: 600 }}>Measurement</th>
                                  <th style={{ padding: '8px 4px', textAlign: 'center', fontSize: '11px', fontWeight: 600 }}>Size</th>
                                  <th style={{ padding: '8px 4px', fontSize: '11px', fontWeight: 600 }}>Notes</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { id: 1, key: 'chest', label: 'Chest', val: activeCust.chest, note: '—' },
                                  { id: 2, key: 'waist', label: 'Waist', val: activeCust.waist, note: 'Natural Waist' },
                                  { id: 3, key: 'hip', label: 'Hip', val: activeCust.hip, note: 'Fullest Part' },
                                  { id: 4, key: 'shoulder', label: 'Shoulder', val: activeCust.shoulder, note: '—' },
                                  { id: 5, key: 'sleeve', label: 'Sleeve Length', val: activeCust.sleeve, note: 'From Shoulder' },
                                  { id: 6, key: 'upperArm', label: 'Upper Arm', val: activeCust.upperArm, note: '—' },
                                  { id: 7, key: 'neck', label: 'Neck', val: activeCust.neck, note: '—' },
                                  { id: 8, key: 'fullLength', label: 'Full Length', val: activeCust.fullLength, note: 'From Shoulder' }
                                ].map(row => {
                                  const isRowHovered = hoveredMeasurementRow === row.key;
                                  return (
                                    <tr 
                                      key={row.key} 
                                      onMouseEnter={() => setHoveredMeasurementRow(row.key)}
                                      onMouseLeave={() => setHoveredMeasurementRow(null)}
                                      style={{ 
                                        borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid #E4E7EC',
                                        background: isRowHovered ? (theme === 'dark' ? 'rgba(247,37,133,0.15)' : '#FFF7FB') : 'transparent',
                                        transition: 'background 0.2s'
                                      }}
                                    >
                                      <td style={{ padding: '8px 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{
                                          width: '18px',
                                          height: '18px',
                                          borderRadius: '50%',
                                          border: isRowHovered ? '1px solid #F72585' : (theme === 'dark' ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E4E7EC'),
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '10px',
                                          fontWeight: 600,
                                          color: isRowHovered ? '#F72585' : (theme === 'dark' ? 'rgba(255,255,255,0.4)' : '#98A2B3'),
                                          background: isRowHovered ? 'rgba(247,37,133,0.1)' : 'transparent',
                                          transition: 'all 0.2s'
                                        }}>{row.id}</span>
                                        <span style={{ 
                                          fontSize: '12px',
                                          fontWeight: isRowHovered ? 600 : 500,
                                          color: theme === 'dark' ? '#ffffff' : '#344054',
                                          transition: 'color 0.2s'
                                        }}>{row.label}</span>
                                      </td>
                                      <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                                          <input 
                                            type="number"
                                            step="0.1"
                                            value={formatValue(row.val)}
                                            onChange={(e) => handleValueChange(row.key, e.target.value)}
                                            style={{
                                              border: 'none',
                                              borderBottom: theme === 'dark' ? '1px dashed rgba(255,255,255,0.2)' : '1px dashed #E4E7EC',
                                              background: 'transparent',
                                              color: isRowHovered ? '#F72585' : (theme === 'dark' ? '#ffffff' : '#172033'),
                                              textAlign: 'center',
                                              width: '50px',
                                              fontWeight: 700,
                                              fontSize: '13px',
                                              outline: 'none',
                                              transition: 'color 0.2s ease'
                                            }}
                                          />
                                          <span style={{ fontSize: '11px', color: isRowHovered ? '#F72585' : (theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#98A2B3'), fontWeight: 500 }}>
                                            {measurementUnit === 'inch' ? '"' : ' cm'}
                                          </span>
                                        </div>
                                      </td>
                                      <td style={{ padding: '8px 4px', color: row.note === '—' ? (theme === 'dark' ? 'rgba(255,255,255,0.3)' : '#98A2B3') : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085'), fontSize: '11px', fontWeight: 400 }}>{row.note}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Footer Action buttons */}
                      <div style={{ 
                        display: 'flex', 
                        justify: 'flex-end', 
                        flexWrap: 'wrap', 
                        gap: '12px', 
                        marginTop: 'auto',
                        paddingTop: '12px',
                        borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC'
                      }}>
                        <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054', background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff', padding: '8px 16px', borderRadius: '6px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC' }} onClick={() => alert("Generating size PDF sheet...")}>
                          <Upload size={14} /> Download PDF
                        </button>
                        <button className="btn btn-primary" style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF', background: '#F72585', border: 'none', borderRadius: '6px', padding: '8px 24px', cursor: 'pointer' }} onClick={() => {
                          alert(`Sizes for ${activeCust.name} updated successfully!`);
                        }}>
                          Update Measurements
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Measurement Chart Sub-tab */}
                  {measurementsSubTab === 'chart' && (
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
                      <span style={{ fontSize: '13px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033', display: 'block' }}>Size Scaling Analysis</span>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#F8F9FB', padding: '24px', borderRadius: '12px', textAlign: 'center', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC' }}>
                        <TrendingUp size={36} style={{ color: '#F72585', marginBottom: '10px' }} />
                        <h5 style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>Historical Size Deviation Tracker</h5>
                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085' }}>Mannequin scan telemetry indicates fit parameters have stayed 98% consistent since first capture.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. RIGHT SIDEBAR: NOTES, HISTORY & QUICK STATS */}
                <div className="glass-card-no-hover measurements-sidebar" style={{ 
                  flex: '1', 
                  minWidth: '260px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '20px',
                  gap: '16px',
                  background: theme === 'dark' ? '#141126' : '#ffffff',
                  border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                  borderRadius: '12px'
                }}>
                  
                  {/* Measurement Notes box */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 auto', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                      <FileText size={16} style={{ color: '#F72585' }} />
                      <span>Measurement Notes</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085', lineHeight: '1.4', overflowY: 'auto', maxHeight: '70px', paddingRight: '4px' }}>
                      {activeCust.notes}
                    </p>
                    <button className="btn btn-secondary" style={{ width: '100%', fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054', background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff', height: '28px', padding: '4px 8px', marginTop: 'auto', borderRadius: '6px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC' }} onClick={() => {
                      const note = prompt("Enter customer notes:", activeCust.notes);
                      if (note !== null) {
                        setCustomersList(customersList.map(c => {
                          if (c.id === activeCust.id) return { ...c, notes: note };
                          return c;
                        }));
                      }
                    }}>
                      Edit Notes
                    </button>
                  </div>

                  <hr style={{ border: 'none', borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', margin: 0 }} />

                  {/* Measurement History box */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 auto' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#344054' }}>
                      <Clock size={16} style={{ color: '#F72585' }} />
                      <span>Measurement History</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '4px 0', overflowY: 'auto', maxHeight: '75px', paddingRight: '4px' }}>
                      {activeCust.history.map((hist, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467', fontSize: '10px', fontWeight: 500 }}>{hist.date}</span>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '9px',
                            fontWeight: 600,
                            background: hist.source === 'AI Scan' ? (theme === 'dark' ? 'rgba(247,37,133,0.18)' : '#FCE7F3') : hist.source === 'Manual' ? (theme === 'dark' ? 'rgba(37,99,235,0.18)' : '#EFF6FF') : (theme === 'dark' ? 'rgba(245,158,11,0.18)' : '#FEF0C7'),
                            color: hist.source === 'AI Scan' ? (theme === 'dark' ? '#FF66B2' : '#D63384') : hist.source === 'Manual' ? (theme === 'dark' ? '#60A5FA' : '#2563EB') : (theme === 'dark' ? '#FBBF24' : '#F79009')
                          }}>{hist.source}</span>
                        </div>
                      ))}
                    </div>

                    <button className="btn btn-secondary" style={{ width: '100%', fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054', background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff', height: '28px', padding: '4px 8px', marginTop: 'auto', borderRadius: '6px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC' }} onClick={() => alert("Showing history logs...")}>
                      View All History
                    </button>
                  </div>

                  <hr style={{ border: 'none', borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', margin: 0 }} />

                  {/* Quick Stats box */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 auto' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#344054' }}>
                      <Activity size={16} style={{ color: '#F72585' }} />
                      <span>Quick Stats</span>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', textAlign: 'center' }}>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F8F9FB', padding: '6px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC' }}>
                        <span style={{ fontSize: '9px', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', display: 'block' }}>Total Scans</span>
                        <strong style={{ fontSize: '14px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>{activeCust.history.length}</strong>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F8F9FB', padding: '6px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC' }}>
                        <span style={{ fontSize: '9px', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', display: 'block' }}>Avg Updates</span>
                        <strong style={{ fontSize: '14px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>2.1/cust</strong>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F8F9FB', padding: '6px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC' }}>
                        <span style={{ fontSize: '9px', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', display: 'block' }}>AI Scan</span>
                        <strong style={{ fontSize: '14px', fontWeight: 700, color: '#F72585' }}>
                          {activeCust.history.filter(h => h.source === 'AI Scan').length}
                        </strong>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F8F9FB', padding: '6px', borderRadius: '8px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC' }}>
                        <span style={{ fontSize: '9px', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', display: 'block' }}>Manual</span>
                        <strong style={{ fontSize: '14px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>
                          {activeCust.history.filter(h => h.source === 'Manual').length}
                        </strong>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* RECENT MEASUREMENTS FOOTER TABLE SECTION */}
              <div className="glass-card-no-hover" style={{ 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                background: theme === 'dark' ? '#141126' : '#ffffff',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#172033' }}>Recent Measurements</h4>
                  <button className="btn btn-ghost" style={{ fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#344054', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => alert("Viewing all customer registry...")}>
                    View all <ArrowRight size={14} />
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', textAlign: 'left' }}>
                        <th style={{ padding: '12px 10px', fontSize: '10px', fontWeight: 600 }}>Customer</th>
                        <th style={{ padding: '12px 10px', fontSize: '10px', fontWeight: 600 }}>Category</th>
                        <th style={{ padding: '12px 10px', fontSize: '10px', fontWeight: 600 }}>Source</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center', fontSize: '10px', fontWeight: 600 }}>Chest</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center', fontSize: '10px', fontWeight: 600 }}>Waist</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center', fontSize: '10px', fontWeight: 600 }}>Hip</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center', fontSize: '10px', fontWeight: 600 }}>Length</th>
                        <th style={{ padding: '12px 10px', fontSize: '10px', fontWeight: 600 }}>Last Updated</th>
                        <th style={{ padding: '12px 10px', textAlign: 'right', fontSize: '10px', fontWeight: 600 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((cust, idx) => (
                        <tr key={cust.id} style={{ borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid #E4E7EC' }}>
                          <td style={{ padding: '12px 10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden' }}>
                                <img src={cust.image} alt={cust.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div>
                                <strong style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054' }}>{cust.name}</strong>
                                <span style={{ fontSize: '10px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : '#98A2B3' }}>{cust.id}</span>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 10px' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '9px',
                              fontWeight: 600,
                              background: cust.cat === 'Women' ? (theme === 'dark' ? 'rgba(247,37,133,0.18)' : '#FCE7F3') : (theme === 'dark' ? 'rgba(37,99,235,0.18)' : '#EFF6FF'),
                              color: cust.cat === 'Women' ? (theme === 'dark' ? '#FF66B2' : '#D63384') : (theme === 'dark' ? '#60A5FA' : '#2563EB')
                            }}>{cust.cat}</span>
                          </td>
                          <td style={{ padding: '12px 10px' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '9px',
                              fontWeight: 600,
                              background: cust.source === 'AI Scan' ? (theme === 'dark' ? 'rgba(247,37,133,0.18)' : '#FCE7F3') : cust.source === 'Manual' ? (theme === 'dark' ? 'rgba(37,99,235,0.18)' : '#EFF6FF') : (theme === 'dark' ? 'rgba(245,158,11,0.18)' : '#FEF0C7'),
                              color: cust.source === 'AI Scan' ? (theme === 'dark' ? '#FF66B2' : '#D63384') : cust.source === 'Manual' ? (theme === 'dark' ? '#60A5FA' : '#2563EB') : (theme === 'dark' ? '#FBBF24' : '#F79009')
                            }}>{cust.source}</span>
                          </td>
                          <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054' }}>{formatValue(cust.chest)}{measurementUnit === 'inch' ? '"' : ' cm'}</td>
                          <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054' }}>{formatValue(cust.waist)}{measurementUnit === 'inch' ? '"' : ' cm'}</td>
                          <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054' }}>{formatValue(cust.hip)}{measurementUnit === 'inch' ? '"' : ' cm'}</td>
                          <td style={{ padding: '12px 10px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: theme === 'dark' ? '#ffffff' : '#344054' }}>{formatValue(cust.fullLength)}{measurementUnit === 'inch' ? '"' : ' cm'}</td>
                          <td style={{ padding: '12px 10px', fontSize: '11px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085' }}>{cust.updated}</td>
                          <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button className="btn btn-secondary" style={{ padding: '6px', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#344054', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC' }} onClick={() => {
                                setSelectedCustomerId(cust.id);
                                setMeasurementsSubTab('body');
                                alert(`Loaded sizes for ${cust.name}`);
                              }}>
                                <Eye size={12} />
                              </button>
                              <button className="btn btn-secondary" style={{ padding: '6px', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#344054', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC' }} onClick={() => {
                                setSelectedCustomerId(cust.id);
                                setMeasurementsSubTab('body');
                              }}>
                                <Edit size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          );
        })()}

        {/* TAB 4: INVENTORY */}
        {activeTab === 'inventory' && (
          <InventoryPage 
            theme={theme} 
            onRequestMaterial={() => setActiveTab('material-requests')} 
          />
        )}

        {/* TAB 5: CALENDAR */}
        {activeTab === 'calendar' && (() => {
          const activeYear = calendarDate.getFullYear();
          const activeMonth = calendarDate.getMonth();
          const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
          const firstDayIndex = new Date(activeYear, activeMonth, 1).getDay();
          const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Align Mon-Sun

          // Generate cells array
          const cells = [];
          
          // Previous month padding cells
          const prevMonthDate = new Date(activeYear, activeMonth, 0);
          const prevMonthDays = prevMonthDate.getDate();
          for (let i = startOffset - 1; i >= 0; i--) {
            const d = prevMonthDays - i;
            cells.push({
              day: d,
              date: new Date(activeYear, activeMonth - 1, d),
              isCurrentMonth: false
            });
          }
          
          // Current month cells
          for (let d = 1; d <= daysInMonth; d++) {
            cells.push({
              day: d,
              date: new Date(activeYear, activeMonth, d),
              isCurrentMonth: true
            });
          }
          
          // Next month padding cells
          const totalGridCells = Math.ceil(cells.length / 7) * 7;
          const nextMonthDaysNeeded = totalGridCells - cells.length;
          for (let d = 1; d <= nextMonthDaysNeeded; d++) {
            cells.push({
              day: d,
              date: new Date(activeYear, activeMonth + 1, d),
              isCurrentMonth: false
            });
          }

          // Active month name
          const activeMonthName = calendarDate.toLocaleString('default', { month: 'long' });

          // Event type colors & icons resolver
          const getEventConfig = (type) => {
            switch (type) {
              case 'Stitching Deadline':
                return { 
                  bg: theme === 'dark' ? 'rgba(247,37,133,0.14)' : '#FFF0F6', 
                  border: 'rgba(247,37,133,0.3)', 
                  text: '#F72585',
                  accent: '#F72585',
                  icon: <Scissors size={11} /> 
                };
              case 'Pick up & Delivery':
                return { 
                  bg: theme === 'dark' ? 'rgba(114,9,183,0.14)' : '#F3E8FF', 
                  border: 'rgba(114,9,183,0.3)', 
                  text: '#7209B7',
                  accent: '#7209B7',
                  icon: <Truck size={11} /> 
                };
              case 'Appointment':
                return { 
                  bg: theme === 'dark' ? 'rgba(6,182,212,0.14)' : '#E0F2FE', 
                  border: 'rgba(6,182,212,0.3)', 
                  text: '#0284C7',
                  accent: '#06B6D4',
                  icon: <User size={11} /> 
                };
              case 'Holiday':
                return { 
                  bg: theme === 'dark' ? 'rgba(245,158,11,0.14)' : '#FEF3C7', 
                  border: 'rgba(245,158,11,0.3)', 
                  text: '#D97706',
                  accent: '#F59E0B',
                  icon: <Sparkles size={11} /> 
                };
              case 'Blocked Date':
                return { 
                  bg: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F1F5F9', 
                  border: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E2E8F0', 
                  text: theme === 'dark' ? '#94A3B8' : '#64748B',
                  accent: '#64748B',
                  icon: <Lock size={11} /> 
                };
              default:
                return { 
                  bg: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F8FAFC', 
                  border: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#E2E8F0', 
                  text: theme === 'dark' ? '#CBD5E1' : '#475467',
                  accent: '#475467',
                  icon: <Calendar size={11} /> 
                };
            }
          };

          // Filtered list of all events matching selected month
          const filteredMonthEvents = calendarEvents.filter(e => 
            e.date.getFullYear() === activeYear && 
            e.date.getMonth() === activeMonth &&
            calendarFilters.includes(e.type)
          );

          // Events on selected day
          const selectedDayEvents = calendarEvents.filter(e => 
            selectedCalendarDate &&
            e.date.getFullYear() === selectedCalendarDate.getFullYear() &&
            e.date.getMonth() === selectedCalendarDate.getMonth() &&
            e.date.getDate() === selectedCalendarDate.getDate() &&
            calendarFilters.includes(e.type)
          );

          // Month Overview counts
          const totalEventsCount = filteredMonthEvents.length;
          const deadlinesCount = filteredMonthEvents.filter(e => e.type === 'Stitching Deadline').length;
          const appointmentsCount = filteredMonthEvents.filter(e => e.type === 'Appointment').length;

          // Event type dot colors for mini calendar
          const getDotColor = (type) => {
            if (type === 'Stitching Deadline') return '#F72585';
            if (type === 'Pick up & Delivery') return '#7209B7';
            if (type === 'Appointment') return '#06B6D4';
            if (type === 'Holiday') return '#F59E0B';
            return '#64748B';
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>
              
              {/* COMPACT PAGE HEADER BELOW TOP NAV */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, lineHeight: '30px', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>Deliveries & Appointments</h2>
                  <span style={{ fontSize: '12px', fontWeight: 400, lineHeight: '18px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467' }}>Manage your stitching deadlines, fittings and customer appointments</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  
                  {/* Integrated Month Selector */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC',
                    borderRadius: '10px',
                    padding: '4px 10px',
                    gap: '10px'
                  }}>
                    <strong style={{ fontSize: '13px', fontWeight: 600, minWidth: '85px', textAlign: 'center', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>
                      {activeMonthName} {activeYear}
                    </strong>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <button 
                        onClick={() => setCalendarDate(new Date(activeYear, activeMonth - 1, 1))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467', display: 'flex', padding: '4px', borderRadius: '4px' }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => setCalendarDate(new Date(activeYear, activeMonth + 1, 1))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467', display: 'flex', padding: '4px', borderRadius: '4px' }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <button 
                    className="btn btn-secondary" 
                    style={{ 
                      padding: '8px 16px', 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      lineHeight: '16px',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff',
                      color: theme === 'dark' ? '#ffffff' : '#344054',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC'
                    }} 
                    onClick={() => {
                      setCalendarDate(new Date(2026, 5, 1));
                      setSelectedCalendarDate(new Date(2026, 5, 20));
                    }}
                  >
                    Today
                  </button>

                  {/* Filter Switcher Dropdown */}
                  <div style={{ position: 'relative' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ 
                        padding: '8px 16px', 
                        fontSize: '11px', 
                        fontWeight: 600, 
                        lineHeight: '16px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff',
                        color: theme === 'dark' ? '#ffffff' : '#344054',
                        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC'
                      }}
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    >
                      <Filter size={14} /> Filter
                    </button>
                    
                    {showFilterDropdown && (
                      <div style={{
                        position: 'absolute',
                        top: '42px',
                        right: '0',
                        width: '220px',
                        background: theme === 'dark' ? '#141126' : '#ffffff',
                        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC',
                        borderRadius: '12px',
                        padding: '16px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.02em', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085' }}>FILTER BY EVENT TYPE</span>
                        {['Stitching Deadline', 'Pick up & Delivery', 'Appointment', 'Holiday', 'Blocked Date'].map(type => {
                          const isChecked = calendarFilters.includes(type);
                          const cfg = getEventConfig(type);
                          return (
                            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: isChecked ? 600 : 500, cursor: 'pointer' }}>
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) setCalendarFilters(calendarFilters.filter(f => f !== type));
                                  else setCalendarFilters([...calendarFilters, type]);
                                }}
                                style={{ accentColor: '#F72585' }}
                              />
                              <span style={{ color: isChecked ? cfg.text : (theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#475467') }}>{type}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Add Event Button */}
                  <button 
                    className="btn btn-secondary" 
                    style={{ 
                      color: '#F72585', 
                      borderColor: '#F72585', 
                      padding: '8px 16px', 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      lineHeight: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      background: theme === 'dark' ? 'rgba(247,37,133,0.08)' : '#FFF0F6'
                    }} 
                    onClick={() => setShowAddEventModal(true)}
                  >
                    <Plus size={14} /> Add Event
                  </button>
                  
                  {/* Block Date Button (StitchBee Pink) */}
                  <button 
                    className="btn btn-primary" 
                    style={{ 
                      padding: '8px 16px', 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      lineHeight: '16px',
                      background: '#F72585',
                      color: '#ffffff',
                      border: 'none',
                      boxShadow: '0 2px 6px rgba(247,37,133,0.3)'
                    }} 
                    onClick={() => setShowBlockDatesModal(true)}
                  >
                    Block Date
                  </button>
                </div>
              </div>

              {/* 70 / 30 SPLIT MAIN WORKSPACE LAYOUT */}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'stretch' }}>
                
                {/* LEFT WORKSPACE (70% width) */}
                <div style={{ flex: '7', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Premium White Rounded Calendar Card */}
                  <div style={{ 
                    padding: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '20px', 
                    flex: 1,
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                  }}>
                    
                    {/* Integrated View Controls Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ 
                        display: 'flex', 
                        background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F1F5F9', 
                        borderRadius: '8px', 
                        padding: '3px' 
                      }}>
                        {['month', 'week', 'day'].map(mode => (
                          <button
                            key={mode}
                            onClick={() => setCalendarViewMode(mode)}
                            style={{
                              background: calendarViewMode === mode 
                                ? (theme === 'dark' ? '#1E1B38' : '#ffffff') 
                                : 'transparent',
                              border: 'none',
                              color: calendarViewMode === mode ? '#F72585' : (theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#64748B'),
                              fontWeight: calendarViewMode === mode ? 700 : 500,
                              fontSize: '11px',
                              lineHeight: '16px',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              textTransform: 'capitalize',
                              transition: 'all 0.2s ease',
                              boxShadow: calendarViewMode === mode ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                            }}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>

                      {/* Small Integrated Today Indicator */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ display: 'inline-flex', width: '8px', height: '8px', borderRadius: '50%', background: '#F72585' }}></span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>
                          Today: Jun 20, 2026
                        </span>
                      </div>
                    </div>

                    {/* MONTH VIEW CALENDAR GRID */}
                    {calendarViewMode === 'month' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#E4E7EC', borderRadius: '12px', overflow: 'hidden', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC' }}>
                        
                        {/* Weekday Labels Header */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: theme === 'dark' ? '#18142e' : '#F8FAFC' }}>
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} style={{ padding: '10px', textAlign: 'center', fontSize: '10px', fontWeight: 700, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#64748B', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{day}</div>
                          ))}
                        </div>

                        {/* Cells Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#E4E7EC', gap: '1px' }}>
                          {cells.map((cell, idx) => {
                            const isTodayDate = cell.date.getFullYear() === 2026 && cell.date.getMonth() === 5 && cell.date.getDate() === 20;
                            const isSelected = selectedCalendarDate && 
                              selectedCalendarDate.getFullYear() === cell.date.getFullYear() && 
                              selectedCalendarDate.getMonth() === cell.date.getMonth() && 
                              selectedCalendarDate.getDate() === cell.date.getDate();
                            
                            const cellEvents = calendarEvents.filter(e => 
                              e.date.getFullYear() === cell.date.getFullYear() &&
                              e.date.getMonth() === cell.date.getMonth() &&
                              e.date.getDate() === cell.date.getDate() &&
                              calendarFilters.includes(e.type)
                            );

                            const isBlocked = cellEvents.some(e => e.type === 'Blocked Date');

                            return (
                              <div
                                key={idx}
                                onClick={() => setSelectedCalendarDate(cell.date)}
                                style={{
                                  minHeight: '105px',
                                  padding: '8px',
                                  background: isTodayDate 
                                    ? (theme === 'dark' ? 'rgba(247,37,133,0.15)' : '#FFF0F6')
                                    : (isBlocked 
                                      ? (theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#F8FAFC')
                                      : (isSelected 
                                        ? (theme === 'dark' ? '#1c152a' : '#FAF5FF') 
                                        : (theme === 'dark' ? '#141126' : '#ffffff'))),
                                  border: isTodayDate 
                                    ? '1px solid rgba(247,37,133,0.4)' 
                                    : (isSelected ? '1px solid #7209B7' : 'none'),
                                  position: 'relative',
                                  cursor: 'pointer',
                                  opacity: cell.isCurrentMonth ? 1 : 0.4,
                                  transition: 'all 0.15s ease',
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}
                              >
                                {/* Date Number Row */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                  <span style={{ 
                                    fontSize: '11px', 
                                    fontWeight: isTodayDate || isSelected ? 700 : 500, 
                                    lineHeight: '16px',
                                    color: isTodayDate ? '#ffffff' : (isSelected ? '#7209B7' : (theme === 'dark' ? '#ffffff' : '#344054')),
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    width: '22px',
                                    height: '22px',
                                    background: isTodayDate ? '#F72585' : (isSelected ? 'rgba(114,9,183,0.12)' : 'transparent'),
                                    boxShadow: isTodayDate ? '0 2px 6px rgba(247,37,133,0.3)' : 'none'
                                  }}>
                                    {cell.day}
                                  </span>

                                  {isTodayDate && (
                                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#F72585', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Today</span>
                                  )}
                                </div>

                                {/* Rich Event Cards Container */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                                  {cellEvents.slice(0, 2).map(evt => {
                                    const cfg = getEventConfig(evt.type);
                                    return (
                                      <div 
                                        key={evt.id} 
                                        style={{
                                          padding: '4px 6px',
                                          borderRadius: '6px',
                                          background: cfg.bg,
                                          borderLeft: `3px solid ${cfg.accent}`,
                                          borderTop: `1px solid ${cfg.border}`,
                                          borderRight: `1px solid ${cfg.border}`,
                                          borderBottom: `1px solid ${cfg.border}`,
                                          color: theme === 'dark' ? '#ffffff' : '#1D2939',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: '1px'
                                        }}
                                        title={`${evt.type}: ${evt.customer} - ${evt.time}`}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                          <span style={{ color: cfg.accent, display: 'flex' }}>{cfg.icon}</span>
                                          <strong style={{ fontSize: '10px', fontWeight: 600, lineHeight: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {evt.type === 'Blocked Date' ? 'Blocked' : evt.customer}
                                          </strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8.5px', color: cfg.text, fontWeight: 600 }}>
                                          <span style={{ letterSpacing: '0.02em', textTransform: 'uppercase' }}>{evt.type === 'Stitching Deadline' ? 'Deadline' : (evt.type === 'Pick up & Delivery' ? 'Delivery' : evt.type)}</span>
                                          <span>{evt.time}</span>
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {/* +N More Indicator */}
                                  {cellEvents.length > 2 && (
                                    <div 
                                      style={{
                                        fontSize: '9px',
                                        fontWeight: 600,
                                        color: '#F72585',
                                        background: theme === 'dark' ? 'rgba(247,37,133,0.15)' : '#FFF0F6',
                                        borderRadius: '4px',
                                        padding: '2px 5px',
                                        textAlign: 'center',
                                        marginTop: 'auto'
                                      }}
                                    >
                                      +{cellEvents.length - 2} more
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    )}

                    {/* WEEK VIEW TIMELINE */}
                    {calendarViewMode === 'week' && (() => {
                      const startOfWeek = new Date(selectedCalendarDate || new Date());
                      const dayOfWeek = startOfWeek.getDay();
                      const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
                      startOfWeek.setDate(startOfWeek.getDate() + distanceToMonday);
                      
                      const weekDays = [];
                      for (let i = 0; i < 7; i++) {
                        const d = new Date(startOfWeek);
                        d.setDate(d.getDate() + i);
                        weekDays.push(d);
                      }

                      return (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                          {weekDays.map((wDate, idx) => {
                            const isSelected = selectedCalendarDate && selectedCalendarDate.getDate() === wDate.getDate();
                            const wEvents = calendarEvents.filter(e => 
                              e.date.getDate() === wDate.getDate() &&
                              e.date.getMonth() === wDate.getMonth() &&
                              calendarFilters.includes(e.type)
                            );
                            return (
                              <div 
                                key={idx} 
                                onClick={() => setSelectedCalendarDate(wDate)}
                                style={{
                                  padding: '10px',
                                  borderRadius: '12px',
                                  border: isSelected ? '1px solid #F72585' : (theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC'),
                                  background: isSelected ? (theme === 'dark' ? 'rgba(247,37,133,0.12)' : '#FFF0F6') : (theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#ffffff'),
                                  cursor: 'pointer',
                                  minHeight: '230px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '8px'
                                }}
                              >
                                <div style={{ textAlign: 'center', borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', paddingBottom: '6px' }}>
                                  <span style={{ fontSize: '10px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085', display: 'block', fontWeight: 600, lineHeight: '14px' }}>
                                    {wDate.toLocaleString('default', { weekday: 'short' })}
                                  </span>
                                  <strong style={{ fontSize: '13px', fontWeight: 700, lineHeight: '18px', color: isSelected ? '#F72585' : (theme === 'dark' ? '#ffffff' : '#1D2939') }}>
                                    {wDate.getDate()}
                                  </strong>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
                                  {wEvents.map(evt => {
                                    const cfg = getEventConfig(evt.type);
                                    return (
                                      <div 
                                        key={evt.id} 
                                        style={{
                                          padding: '6px 8px',
                                          borderRadius: '8px',
                                          background: cfg.bg,
                                          borderLeft: `3px solid ${cfg.accent}`,
                                          borderTop: `1px solid ${cfg.border}`,
                                          borderRight: `1px solid ${cfg.border}`,
                                          borderBottom: `1px solid ${cfg.border}`,
                                          color: theme === 'dark' ? '#ffffff' : '#1D2939',
                                          fontSize: '10px',
                                          fontWeight: 600,
                                          lineHeight: '14px'
                                        }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                          <span style={{ color: cfg.accent, display: 'flex' }}>{cfg.icon}</span>
                                          <span>{evt.customer}</span>
                                        </div>
                                        <span style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: cfg.text, marginTop: '2px' }}>{evt.time}</span>
                                      </div>
                                    );
                                  })}
                                  {wEvents.length === 0 && (
                                    <span style={{ fontSize: '10px', fontWeight: 500, lineHeight: '14px', color: theme === 'dark' ? 'rgba(255,255,255,0.4)' : '#98A2B3', textAlign: 'center', marginTop: '16px' }}>No events</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}

                    {/* DAY VIEW DETAIL PANEL */}
                    {calendarViewMode === 'day' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#F8FAFC', padding: '16px', borderRadius: '12px', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '15px', fontWeight: 700, lineHeight: '22px', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>
                            Schedule for {selectedCalendarDate ? selectedCalendarDate.toLocaleDateString('default', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Selected Day'}
                          </strong>
                          <span style={{ fontSize: '10px', fontWeight: 600, lineHeight: '14px', background: 'rgba(247,37,133,0.1)', color: '#F72585', padding: '4px 10px', borderRadius: '10px' }}>
                            {selectedDayEvents.length} Events Scheduled
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {selectedDayEvents.map(evt => {
                            const cfg = getEventConfig(evt.type);
                            return (
                              <div 
                                key={evt.id} 
                                style={{ 
                                  display: 'flex', 
                                  gap: '14px', 
                                  padding: '14px', 
                                  borderRadius: '10px', 
                                  background: cfg.bg,
                                  borderLeft: `4px solid ${cfg.accent}`,
                                  borderTop: `1px solid ${cfg.border}`,
                                  borderRight: `1px solid ${cfg.border}`,
                                  borderBottom: `1px solid ${cfg.border}`
                                }}
                              >
                                <div style={{ borderRight: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC', paddingRight: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                  <strong style={{ fontSize: '13px', fontWeight: 700, lineHeight: '18px', color: cfg.text }}>{evt.time}</strong>
                                </div>
                                <div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                    <span style={{ color: cfg.accent, display: 'flex' }}>{cfg.icon}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 700, lineHeight: '16px', letterSpacing: '0.02em', color: cfg.text, textTransform: 'uppercase' }}>{evt.type}</span>
                                  </div>
                                  <strong style={{ fontSize: '13px', fontWeight: 700, lineHeight: '18px', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>{evt.customer}</strong>
                                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', fontWeight: 400, lineHeight: '17px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467' }}>{evt.details}</p>
                                </div>
                              </div>
                            );
                          })}
                          {selectedDayEvents.length === 0 && (
                            <div style={{ padding: '40px', textAlign: 'center', color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#667085' }}>
                              <Clock size={28} style={{ color: '#F72585', marginBottom: '10px', opacity: 0.6 }} />
                              <h5 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 700, lineHeight: '18px', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>No events scheduled</h5>
                              <p style={{ margin: 0, fontSize: '11px', fontWeight: 400, lineHeight: '17px', color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085' }}>Add new appointments or stitching deadlines to display them here.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Visually Distinct Event Types Legend */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '16px', 
                      borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC', 
                      paddingTop: '16px', 
                      flexWrap: 'wrap',
                      fontSize: '11px',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>Event Types</span>
                      {[
                        { label: 'Stitching Deadline', color: '#F72585', icon: <Scissors size={11} /> },
                        { label: 'Pick up & Delivery', color: '#7209B7', icon: <Truck size={11} /> },
                        { label: 'Appointment', color: '#06B6D4', icon: <User size={11} /> },
                        { label: 'Holiday', color: '#F59E0B', icon: <Sparkles size={11} /> },
                        { label: 'Blocked Date', color: '#64748B', icon: <Lock size={11} /> }
                      ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></span>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>{item.label}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* RIGHT SIDEBAR (30% width) */}
                <div style={{ flex: '3', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* CARD 1 — MINI CALENDAR */}
                  <div style={{ 
                    padding: '16px 20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '14px',
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '13px', fontWeight: 700, lineHeight: '18px', textTransform: 'uppercase', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>{activeMonthName} {activeYear}</strong>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button 
                          onClick={() => setCalendarDate(new Date(activeYear, activeMonth - 1, 1))}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467', display: 'flex', padding: '2px', borderRadius: '4px' }}
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button 
                          onClick={() => setCalendarDate(new Date(activeYear, activeMonth + 1, 1))}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#475467', display: 'flex', padding: '2px', borderRadius: '4px' }}
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((wDay, idx) => (
                        <span key={idx} style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#98A2B3', fontSize: '10px', fontWeight: 600, lineHeight: '14px' }}>{wDay}</span>
                      ))}
                      
                      {cells.map((cell, idx) => {
                        const isSelected = selectedCalendarDate && 
                          selectedCalendarDate.getDate() === cell.date.getDate() && 
                          selectedCalendarDate.getMonth() === cell.date.getMonth();
                        
                        const dayEvents = calendarEvents.filter(e => 
                          e.date.getDate() === cell.date.getDate() &&
                          e.date.getMonth() === cell.date.getMonth() &&
                          calendarFilters.includes(e.type)
                        );

                        const mainEvtType = dayEvents.find(e => calendarFilters.includes(e.type))?.type;

                        return (
                          <div 
                            key={idx}
                            onClick={() => setSelectedCalendarDate(cell.date)}
                            style={{
                              position: 'relative',
                              padding: '2px 0',
                              borderRadius: '50%',
                              cursor: 'pointer',
                              background: isSelected ? '#F72585' : 'transparent',
                              color: isSelected ? '#ffffff' : (cell.isCurrentMonth ? (theme === 'dark' ? '#ffffff' : '#1D2939') : (theme === 'dark' ? 'rgba(255,255,255,0.3)' : '#98A2B3')),
                              fontSize: '11px',
                              fontWeight: isSelected ? 700 : 500,
                              lineHeight: '16px',
                              opacity: cell.isCurrentMonth ? 1 : 0.4,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '24px',
                              width: '24px',
                              margin: '0 auto',
                              transition: 'all 0.15s'
                            }}
                          >
                            <span>{cell.day}</span>
                            {dayEvents.length > 0 && !isSelected && (
                              <span style={{ 
                                position: 'absolute', 
                                bottom: '2px', 
                                width: '3px', 
                                height: '3px', 
                                borderRadius: '50%', 
                                background: getDotColor(mainEvtType)
                              }}></span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CARD 2 — UPCOMING EVENTS */}
                  <div style={{ 
                    padding: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '14px',
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '13px', fontWeight: 700, lineHeight: '18px', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>Upcoming Events</strong>
                      <span 
                        style={{ fontSize: '10px', fontWeight: 600, color: '#F72585', cursor: 'pointer' }}
                        onClick={() => setSelectedCalendarDate(null)}
                      >
                        View All
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
                      {[
                        { id: 'u1', customer: 'Priya Sharma', service: 'Lehenga Stitching', date: '12 Jun · 09:30 AM', icon: '👗', badge: 'Upcoming', bg: 'rgba(247,37,133,0.08)', text: '#F72585' },
                        { id: 'u2', customer: 'Kavitha Iyer', service: 'Suit Alteration', date: '20 Jun · 03:30 PM', icon: '👕', badge: 'Upcoming', bg: 'rgba(6,182,212,0.08)', text: '#0284C7' },
                        { id: 'u3', customer: 'Neha Singh', service: 'Blouse Stitching', date: '22 Jun · 10:00 AM', icon: '🧵', badge: 'Upcoming', bg: 'rgba(114,9,183,0.08)', text: '#7209B7' },
                        { id: 'u4', customer: 'Vikram Seth', service: 'Linen Suit Delivery', date: '24 Jun · 05:00 PM', icon: '📦', badge: 'Confirmed', bg: 'rgba(18,183,106,0.08)', text: '#12B76A' }
                      ].map(item => (
                        <div 
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F1F5F9'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px', 
                              background: item.bg, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              fontSize: '14px' 
                            }}>
                              {item.icon}
                            </div>
                            <div>
                              <strong style={{ display: 'block', fontSize: '11px', fontWeight: 600, lineHeight: '16px', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>{item.customer}</strong>
                              <span style={{ display: 'block', fontSize: '10px', fontWeight: 400, color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : '#667085' }}>{item.service}</span>
                              <span style={{ display: 'block', fontSize: '9px', fontWeight: 500, color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : '#98A2B3', marginTop: '1px' }}>{item.date}</span>
                            </div>
                          </div>
                          <span style={{ fontSize: '9px', fontWeight: 600, color: item.text, background: item.bg, padding: '2px 8px', borderRadius: '10px' }}>
                            {item.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CARD 3 — MONTH OVERVIEW */}
                  <div style={{ 
                    padding: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '14px',
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                  }}>
                    <strong style={{ fontSize: '13px', fontWeight: 700, lineHeight: '18px', textTransform: 'uppercase', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>THIS MONTH OVERVIEW</strong>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                      <div style={{ background: theme === 'dark' ? 'rgba(247,37,133,0.1)' : '#FFF0F6', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(247,37,133,0.2)' }}>
                        <strong style={{ fontSize: '16px', fontWeight: 700, lineHeight: '20px', color: '#F72585', display: 'block' }}>12</strong>
                        <span style={{ fontSize: '9px', fontWeight: 500, lineHeight: '13px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085', marginTop: '2px', display: 'block' }}>Total Events</span>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(114,9,183,0.1)' : '#F3E8FF', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(114,9,183,0.2)' }}>
                        <strong style={{ fontSize: '16px', fontWeight: 700, lineHeight: '20px', color: '#7209B7', display: 'block' }}>6</strong>
                        <span style={{ fontSize: '9px', fontWeight: 500, lineHeight: '13px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085', marginTop: '2px', display: 'block' }}>Stitching Deadlines</span>
                      </div>
                      <div style={{ background: theme === 'dark' ? 'rgba(6,182,212,0.1)' : '#E0F2FE', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(6,182,212,0.2)' }}>
                        <strong style={{ fontSize: '16px', fontWeight: 700, lineHeight: '20px', color: '#0284C7', display: 'block' }}>4</strong>
                        <span style={{ fontSize: '9px', fontWeight: 500, lineHeight: '13px', color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#667085', marginTop: '2px', display: 'block' }}>Appointments</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 4 — QUICK ACTIONS */}
                  <div style={{ 
                    padding: '20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '14px',
                    background: theme === 'dark' ? '#141126' : '#ffffff',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E4E7EC',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                  }}>
                    <strong style={{ fontSize: '13px', fontWeight: 700, lineHeight: '18px', textTransform: 'uppercase', color: theme === 'dark' ? '#ffffff' : '#1D2939' }}>QUICK ACTIONS</strong>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <button 
                        onClick={() => setShowAddEventModal(true)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: theme === 'dark' ? 'rgba(247,37,133,0.1)' : '#FFF0F6',
                          border: '1px solid rgba(247,37,133,0.2)',
                          color: '#F72585',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          justifyContent: 'center'
                        }}
                      >
                        <Plus size={14} /> + Add Event
                      </button>

                      <button 
                        onClick={() => setShowBlockDatesModal(true)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: theme === 'dark' ? 'rgba(114,9,183,0.1)' : '#F3E8FF',
                          border: '1px solid rgba(114,9,183,0.2)',
                          color: '#7209B7',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          justifyContent: 'center'
                        }}
                      >
                        <Lock size={14} /> Block Date
                      </button>

                      <button 
                        onClick={() => setActiveTab('orders')}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: theme === 'dark' ? 'rgba(6,182,212,0.1)' : '#E0F2FE',
                          border: '1px solid rgba(6,182,212,0.2)',
                          color: '#0284C7',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          justifyContent: 'center'
                        }}
                      >
                        <ShoppingBag size={14} /> View Orders
                      </button>

                      <button 
                        onClick={() => alert("Downloading June 2026 StitchBee Tailor Calendar schedule PDF...")}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#F8FAFC',
                          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E4E7EC',
                          color: theme === 'dark' ? '#ffffff' : '#344054',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          justifyContent: 'center'
                        }}
                      >
                        <FileText size={14} /> Export Calendar
                      </button>
                    </div>
                  </div>

                  {/* OPTIONAL INSIGHT CARD */}
                  <div style={{ 
                    padding: '16px 20px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px',
                    background: theme === 'dark' ? 'rgba(247,37,133,0.08)' : '#FFF0F6',
                    border: '1px solid rgba(247,37,133,0.2)',
                    borderRadius: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={14} style={{ color: '#F72585' }} />
                      <strong style={{ fontSize: '13px', fontWeight: 700, color: '#F72585' }}>Busy Week Ahead</strong>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 400, lineHeight: '16px', color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#475467' }}>
                      5 stitching deadlines and 3 appointments scheduled this week.
                    </span>

                    <div style={{ marginTop: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, color: '#F72585', marginBottom: '4px' }}>
                        <span>Weekly Schedule</span>
                        <span>72% booked</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(247,37,133,0.15)', overflow: 'hidden' }}>
                        <div style={{ width: '72%', height: '100%', borderRadius: '3px', background: '#F72585' }}></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* DYNAMIC DIALOG MODAL: ADD EVENT */}
              {showAddEventModal && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2000
                }}>
                  <div className="glass-card-no-hover" style={{ 
                    width: '100%', 
                    maxWidth: '420px', 
                    padding: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Create Calendar Event</h4>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowAddEventModal(false)}>
                        <X size={18} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Customer Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Priya Sharma" 
                          className="form-input" 
                          value={newEventCust} 
                          onChange={e => setNewEventCust(e.target.value)} 
                          style={{ width: '100%' }}
                        />
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Date</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={newEventDate} 
                            onChange={e => setNewEventDate(e.target.value)} 
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Time</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 02:00 PM" 
                            className="form-input" 
                            value={newEventTime} 
                            onChange={e => setNewEventTime(e.target.value)} 
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Event Type</label>
                        <select 
                          className="form-select" 
                          value={newEventType} 
                          onChange={e => setNewEventType(e.target.value)} 
                          style={{ width: '100%' }}
                        >
                          <option value="Stitching Deadline">Stitching Deadline</option>
                          <option value="Pick up & Delivery">Pick up & Delivery</option>
                          <option value="Appointment">Appointment</option>
                          <option value="Holiday">Holiday</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Event Details</label>
                        <textarea 
                          placeholder="Details or notes about this appointment..." 
                          className="form-input" 
                          rows="2"
                          value={newEventDetails} 
                          onChange={e => setNewEventDetails(e.target.value)} 
                          style={{ width: '100%', resize: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                      <button className="btn btn-secondary" onClick={() => setShowAddEventModal(false)}>Cancel</button>
                      <button className="btn btn-primary" style={{ fontWeight: 'bold' }} onClick={() => {
                        const parsedDate = new Date(newEventDate + 'T00:00:00');
                        if (isNaN(parsedDate.getTime())) {
                          alert("Please enter a valid date");
                          return;
                        }
                        const newEv = {
                          id: Date.now(),
                          date: parsedDate,
                          time: newEventTime,
                          type: newEventType,
                          customer: newEventCust || 'Walk-in Client',
                          details: newEventDetails || 'No details provided'
                        };
                        setCalendarEvents([...calendarEvents, newEv]);
                        setShowAddEventModal(false);
                        setNewEventCust('');
                        setNewEventDetails('');
                        alert("Event added successfully!");
                      }}>
                        Add Event
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* DYNAMIC DIALOG MODAL: BLOCK DATES */}
              {showBlockDatesModal && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2000
                }}>
                  <div className="glass-card-no-hover" style={{ 
                    width: '100%', 
                    maxWidth: '400px', 
                    padding: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Block Shop Calendar Dates</h4>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowBlockDatesModal(false)}>
                        <X size={18} />
                      </button>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Block custom ranges from customer order scheduling. Selected days will show up as blocked/grayed out in the calendar registry.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Start Date</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={blockStartDate} 
                            onChange={e => setBlockStartDate(e.target.value)} 
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>End Date</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={blockEndDate} 
                            onChange={e => setBlockEndDate(e.target.value)} 
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                      <button className="btn btn-secondary" onClick={() => setShowBlockDatesModal(false)}>Cancel</button>
                      <button className="btn btn-primary" style={{ fontWeight: 'bold' }} onClick={() => {
                        const start = new Date(blockStartDate + 'T00:00:00');
                        const end = new Date(blockEndDate + 'T00:00:00');
                        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
                          alert("Please enter a valid date range");
                          return;
                        }

                        const blockedArr = [];
                        let current = new Date(start);
                        while (current <= end) {
                          blockedArr.push({
                            id: Math.random(),
                            date: new Date(current),
                            time: 'All Day',
                            type: 'Blocked Date',
                            customer: 'Shop Blocked',
                            details: 'Storefront appointments blocked'
                          });
                          current.setDate(current.getDate() + 1);
                        }

                        setCalendarEvents([...calendarEvents, ...blockedArr]);
                        setShowBlockDatesModal(false);
                        alert("Selected range blocked successfully!");
                      }}>
                        Block Dates
                      </button>
                  </div>
                </div>
              </div>
            )}

            </div>
          );
        })()}

        {/* TAB 6: EARNINGS */}
        {activeTab === 'earnings' && (
          <EarningsPage theme={theme} />
        )}

        {/* TAB 7: SUPPORT / CHAT CENTER */}
        {activeTab === 'chat' && (
          <ChatSupportPage theme={theme} />
        )}

        {/* TAB 8: REVIEWS */}
        {activeTab === 'reviews' && (
          <ReviewsPage theme={theme} onRequestReview={() => setShowRequestReviewModal(true)} />
        )}


        {/* TAB 9: PROFILE & SETTINGS */}
        {activeTab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Profile & Shop Settings</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Manage master tailor details, store specialization, working hours, and worker allocations.
              </p>
            </div>

            {/* Master Profile Header Card */}
            <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)', flexShrink: 0 }}>
                <img src="/bridal 5.jpg" alt="Master Rajesh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>{ownerName}</h4>
                  <span className="badge badge-success" style={{ fontSize: '0.65rem', padding: '3px 8px' }}>
                    ✓ Verified Tailor Store
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {shopName} • Master Tailor & Custom Suit Specialist
                </p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '0.75rem', fontWeight: 600 }}>
                  <span style={{ color: '#F59E0B' }}>★ 4.8 Rating (142 Store Orders)</span>
                  <span style={{ color: 'var(--primary)' }}>Capacity: {stitchingCapacity} Suits/Mo</span>
                  <span style={{ color: '#10B981' }}>{kycStatus} Partner</span>
                </div>
              </div>
            </div>

            {/* Shop info form */}
            <div className="glass-card-no-hover" style={{ padding: '24px' }}>
              <form onSubmit={e => { e.preventDefault(); alert("Profile settings saved successfully!"); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Shop Name</label>
                    <input type="text" className="form-input" value={shopName} onChange={e => setShopName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Master Owner</label>
                    <input type="text" className="form-input" value={ownerName} onChange={e => setOwnerName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Specialty Specialization</label>
                    <input type="text" className="form-input" value={shopSpecialty} onChange={e => setShopSpecialty(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Working Hours</label>
                    <input type="text" className="form-input" value={shopHours} onChange={e => setShopHours(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stitching Capacity (monthly)</label>
                    <input type="text" className="form-input" value={stitchingCapacity} onChange={e => setStitchingCapacity(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">KYC Verification Status</label>
                    <input type="text" className="form-input" value={kycStatus} disabled style={{ opacity: 0.6 }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Shop Address</label>
                  <input type="text" className="form-input" value={shopAddress} onChange={e => setShopAddress(e.target.value)} />
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>Save Profile Changes</button>
                </div>
              </form>
            </div>

            {/* Subpages: Team, Material Requests */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* Team Management */}
              <div className="glass-card-no-hover" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> Team Management</h4>
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => setActiveTab('team')}>Manage</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {teamMembers.map(member => (
                    <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                      <div>
                        <strong>{member.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{member.role}</span>
                      </div>
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>{member.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material Purchase Requests */}
              <div className="glass-card-no-hover" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}><Database size={16} /> Material Requests</h4>
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => setActiveTab('material-requests')}>Create Request</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {materialRequests.slice(0, 2).map(req => (
                    <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                      <div>
                        <strong>{req.material}</strong>
                        <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Quantity: {req.qty}</span>
                      </div>
                      <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>{req.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: TEAM MANAGEMENT */}
        {activeTab === 'team' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Team Management & Worker Allocation</h3>
            
            {/* Team listing */}
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Worker Name</th>
                    <th style={{ padding: '10px' }}>Role</th>
                    <th style={{ padding: '10px' }}>Assigned Task</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{member.name}</td>
                      <td style={{ padding: '12px 10px' }}>{member.role}</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span className="badge badge-primary">{member.tasks}</span>
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <span className="badge badge-success">{member.status}</span>
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                        <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }} onClick={() => alert(`Assign task to ${member.name}`)}>
                          Reassign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Team Member form */}
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', fontWeight: '800' }}>Register New Worker</h4>
              <form onSubmit={handleAddWorker} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', alignItems: 'end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Full Name</label>
                  <input type="text" className="form-input" placeholder="e.g. Anand Sharma" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Role</label>
                  <select className="form-select" value={newMemberRole} onChange={e => setNewMemberRole(e.target.value)}>
                    <option value="Stitching Assistant">Stitching Assistant</option>
                    <option value="Cutting Specialist">Cutting Specialist</option>
                    <option value="Embroidery Artist">Embroidery Artist</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Register Worker</button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 11: MATERIAL REQUESTS */}
        {activeTab === 'material-requests' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Material Purchase Requests</h3>
            
            {/* Requests listing */}
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Request ID</th>
                    <th style={{ padding: '10px' }}>Material Requested</th>
                    <th style={{ padding: '10px' }}>Quantity</th>
                    <th style={{ padding: '10px' }}>Date</th>
                    <th style={{ padding: '10px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRequests.map(req => (
                    <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{req.id}</td>
                      <td style={{ padding: '12px 10px' }}>{req.material}</td>
                      <td style={{ padding: '12px 10px' }}>{req.qty}</td>
                      <td style={{ padding: '12px 10px' }}>{req.date}</td>
                      <td style={{ padding: '12px 10px' }}>
                        <span className="badge badge-secondary">{req.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Create Purchase Request Form */}
            <div className="glass-card-no-hover" style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', fontWeight: '800' }}>Create Material Purchase Request</h4>
              <form onSubmit={handleRequestMaterial} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', alignItems: 'end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Material Description</label>
                  <input type="text" className="form-input" placeholder="e.g. Silver Beads & Threads" value={newReqMaterialName} onChange={e => setNewReqMaterialName(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Quantity</label>
                  <input type="text" className="form-input" placeholder="e.g. 5 boxes" value={newReqMaterialQty} onChange={e => setNewReqMaterialQty(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit Request</button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* 3. SLIDE-OUT NAVIGATION DRAWER */}
      {sidebarOpen && (
        <>
          <div 
            className="drawer-backdrop"
            onClick={() => setSidebarOpen(false)}
            style={{ top: '64px' }}
          />

          <div 
            className="left-nav-drawer"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              top: '64px', 
              height: 'calc(100vh - 64px)', 
              zIndex: 999,
              background: theme === 'dark' ? '#0F0C1B' : '#F8F9FC',
              color: theme === 'dark' ? '#ffffff' : '#172033',
              borderRight: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB'
            }}
          >


            {/* Tailor Welcome Card */}
            <div className="drawer-welcome-card" style={{ background: 'linear-gradient(135deg, #1B0F2A 0%, #3B154C 50%, var(--primary) 100%)' }}>
              <div className="drawer-welcome-inner">
                <div className="drawer-welcome-icon-box" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}>
                  <Scissors size={24} color="#ffffff" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.95, fontWeight: 500, color: '#ffffff' }}>
                    Master Tailor Portal
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '2px 0 2px 0', color: '#ffffff' }}>
                    Master Rajesh 👋
                  </h3>
                  <p style={{ fontSize: '0.72rem', opacity: 0.9, margin: 0, color: '#ffffff' }}>
                    Vogue Craft Tailors • Senior Designer
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px', flex: 1, overflowY: 'auto' }}>
              {[
                { id: 'dashboard', label: 'Dashboard', subtitle: 'Store Overview & Active Queue', icon: <Home size={20} /> },
                { id: 'orders', label: 'Orders', subtitle: 'Stitching & Alteration Orders', icon: <ShoppingBag size={20} /> },
                { id: 'measurements', label: 'Measurements', subtitle: 'Customer Measurement Records', icon: <Ruler size={20} /> },
                { id: 'inventory', label: 'Inventory', subtitle: 'Fabric & Material Stock', icon: <Database size={20} /> },
                { id: 'calendar', label: 'Calendar', subtitle: 'Deadlines & Appointments', icon: <Calendar size={20} /> },
                { id: 'earnings', label: 'Earnings', subtitle: 'Payouts & Revenue Ledgers', icon: <TrendingUp size={20} /> },
                { id: 'chat', label: 'Support', subtitle: 'Customer & Support Messages', icon: <MessageSquare size={20} /> },
                { id: 'material-requests', label: 'Material Orders', subtitle: 'Fabric & Trim Purchases', icon: <Layers size={20} /> },
                { id: 'team', label: 'Team Staff', subtitle: 'Assistants & Cutting Specialists', icon: <Users size={20} /> },
                { id: 'reviews', label: 'Reviews', subtitle: 'Ratings & Customer Feedback', icon: <Star size={20} /> },
                { id: 'profile', label: 'Store Profile', subtitle: 'Shop Info & Operating Hours', icon: <User size={20} /> }
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    className={`drawer-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                    style={{
                      background: isActive 
                        ? (theme === 'dark' ? 'rgba(247,37,133,0.15)' : '#FFF0F6') 
                        : (theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent'),
                      borderRadius: '12px',
                      padding: '10px 14px',
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%',
                      boxSizing: 'border-box',
                      gap: '8px'
                    }}
                  >
                    {isActive && <div className="drawer-nav-indicator" style={{ background: 'var(--primary)' }} />}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0, overflow: 'hidden' }}>
                      <div 
                        className="drawer-nav-icon-box" 
                        style={{ 
                          background: isActive 
                            ? (theme === 'dark' ? 'rgba(247,37,133,0.2)' : '#FFE4F2') 
                            : (theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9'),
                          color: isActive 
                            ? '#F72585' 
                            : (theme === 'dark' ? '#E2E8F0' : '#475467'),
                          flexShrink: 0
                        }}
                      >
                        {tab.icon}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flex: 1, minWidth: 0, overflow: 'hidden' }}>
                        <span style={{ 
                          fontSize: '0.9rem', 
                          fontWeight: 700, 
                          color: isActive ? 'var(--primary)' : (theme === 'dark' ? '#FFFFFF' : '#1B1B2F'),
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {tab.label}
                        </span>
                        <span style={{ 
                          fontSize: '0.72rem', 
                          color: isActive ? 'var(--primary)' : (theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6B7280'),
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {tab.subtitle}
                        </span>
                      </div>
                    </div>
                    <ChevronRight 
                      size={18} 
                      style={{ 
                        color: isActive ? 'var(--primary)' : (theme === 'dark' ? 'rgba(255,255,255,0.4)' : '#9CA3AF'),
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                        marginLeft: 'auto'
                      }} 
                    />
                  </div>
                );
              })}
            </div>

            {/* Tailor Partner Tier Progress Card */}
            <div className="drawer-tier-card" style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, #4a0072 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.3rem' }}>🥇</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                      Gold Tailor Partner
                    </div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.9, color: '#ffffff', marginTop: '1px' }}>
                      Completed: 20 / 30 Orders (66%)
                    </div>
                  </div>
                </div>
                <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700, color: '#ffffff' }}>
                  Tier v4.8
                </span>
              </div>
              <div className="drawer-tier-progress-bar">
                <div className="drawer-tier-progress-fill" style={{ width: '66%', background: 'linear-gradient(90deg, var(--primary) 0%, #10b981 100%)' }} />
              </div>
            </div>

            {/* Logout Button */}
            <button 
              className="drawer-logout-btn"
              onClick={() => {
                setSidebarOpen(false);
                if (onLogout) onLogout();
              }}
              style={{
                background: theme === 'dark' ? 'rgba(239,68,68,0.15)' : '#FEF2F2',
                color: '#EF4444',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              <LogOut size={18} /> Logout Tailor Account
            </button>
          </div>
        </>
      )}

      {/* 4. BOTTOM FOOTER NAVIGATION BAR */}
      <footer 
        className="mobile-bottom-nav" 
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: theme === 'dark' ? '#0e0b1a' : '#ffffff', 
          borderTop: '1px solid var(--border-color)', 
          display: 'flex', 
          justifyContent: 'space-around', 
          padding: '6px 0',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}
      >
        {[
          { id: 'dashboard', label: 'Home', icon: <Home size={18} /> },
          { id: 'measurements', label: 'Measurements', icon: <Ruler size={18} /> },
          { id: 'calendar', label: 'Calendar', icon: <Calendar size={18} /> },
          { id: 'earnings', label: 'Earnings', icon: <TrendingUp size={18} /> },
          { id: 'chat', label: 'Support', icon: <MessageSquare size={18} /> }
        ].map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isMenu) {
                  setSidebarOpen(true);
                } else {
                  setActiveTab(item.id);
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                flex: 1,
                height: '54px',
                padding: 0
              }}
            >
              {/* Floating Circle Bubble containing Icon */}
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: isActive 
                    ? 'linear-gradient(135deg, var(--primary), var(--secondary))' 
                    : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  transform: isActive 
                    ? 'translateY(-14px) scale(1.1) rotateY(10deg)' 
                    : 'translateY(0) scale(1) rotateY(0)',
                  boxShadow: isActive 
                    ? '0 8px 18px rgba(247, 37, 133, 0.45), inset 0 2px 4px rgba(255,255,255,0.2)' 
                    : 'none',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 2
                }}
              >
                {item.icon}
              </div>

              {/* Text Label under Bubble */}
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  opacity: isActive ? 1 : 0.8,
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.25s ease',
                  position: 'absolute',
                  bottom: '4px',
                  zIndex: 1
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </footer>
    </div>
  );
}
