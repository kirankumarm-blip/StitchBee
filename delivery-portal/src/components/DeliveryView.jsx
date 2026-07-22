import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, ShoppingBag, Map, DollarSign, MessageSquare, User, 
  Phone, AlertTriangle, CheckCircle, Navigation, Send, Calendar, 
  Clock, Check, ChevronRight, ChevronDown, Info, LogOut, Shield, Compass, Sparkles, Sun, Moon, Scissors,
  Target, Star, Bell, Gift, Scan, Camera, UserPlus, Headphones, Wallet, TrendingUp, FileText, Power, RefreshCw,
  Trophy, Percent, Activity, Filter, ArrowUpRight, ArrowDownRight,
  Paperclip, Mic, Smile, Award, Bookmark, Share2, Pin, Heart
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

export default function DeliveryView({ theme, setTheme, currentUser, onLogout, setRole }) {
  const isDark = theme === 'dark';
  const bgCard = theme === 'dark' ? '#120f26' : '#ffffff';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0';
  const colorTextPrimary = theme === 'dark' ? '#f3f4f6' : '#0f172a';
  const colorTextSecondary = theme === 'dark' ? '#9ca3af' : '#475569';
  const colorTextMuted = theme === 'dark' ? '#6b7280' : '#94a3b8';

  const pBackground = isDark ? '#0b0914' : '#FAFBFD';
  const pCardBg = isDark ? '#120f26' : '#FFFFFF';
  const pBorder = isDark ? 'rgba(255,255,255,0.08)' : '#E8EDF5';
  const pCardShadow = isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(20, 20, 43, 0.08)';

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'orders' | 'navigation' | 'earnings' | 'support' | 'profile'
  const [isOnline, setIsOnline] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // floating dropdown state
  const [ordersSubTab, setOrdersSubTab] = useState('active'); // 'active' | 'upcoming' | 'completed' | 'cancelled' | 'returned'
  const [earningsPeriod, setEarningsPeriod] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [selectedOrder, setSelectedOrder] = useState(null); // Detailed order modal/view
  const [orderSearchText, setOrderSearchText] = useState(''); // Search query for orders list
  const [typedMessage, setTypedMessage] = useState('');
    const [supportContact, setSupportContact] = useState('customer'); // 'customer' | 'tailor' | 'admin' | 'ai'
    const [rightPanelTab, setRightPanelTab] = useState('order'); // 'order' | 'faq' | 'analytics'
    const [faqOpenIdx, setFaqOpenIdx] = useState(null);
    const [supportMobileView, setSupportMobileView] = useState('list'); // 'list' | 'chat' | 'info'
  
  // Interactive Map References
  const homeMapRef = useRef(null);
  const navMapRef = useRef(null);
  const orderMapRef = useRef(null);
  const homeMapInstance = useRef(null);
  const navMapInstance = useRef(null);
  const orderMapInstance = useRef(null);

  useEffect(() => {
    // Load Leaflet CSS dynamically if not present
    if (!document.getElementById('leaflet-css-cdn')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css-cdn';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const initMap = (L) => {
      // 1. Handle Home Map
      if (activeTab === 'home' && homeMapRef.current) {
        if (homeMapInstance.current) {
          try {
            homeMapInstance.current.remove();
          } catch (e) {
            console.error("Error removing home map:", e);
          }
          homeMapInstance.current = null;
        }
        if (homeMapRef.current._leaflet_id) {
          delete homeMapRef.current._leaflet_id;
        }

        const map = L.map(homeMapRef.current, {
          zoomControl: false,
          scrollWheelZoom: true
        }).setView([12.9716, 77.5946], 13);
        homeMapInstance.current = map;

        // Google Maps styled tiles
        const tileUrl = isDark 
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
        L.tileLayer(tileUrl, {
          attribution: '&copy; Google Maps &copy; OpenStreetMap'
        }).addTo(map);

        // Coordinates around HSR / Brookefield Layout Bengaluru matching second image flow (Start -> Shop -> Stop 2 -> Stop 3 -> Stop 4 -> Home)
        const points = [
          { lat: 12.9500, lng: 77.6800, label: 'Start Point', isStart: true },
          { lat: 12.9592, lng: 77.6974, label: '🏪 Vogue Craft Tailors (Pickup)', isShop: true },
          { lat: 12.9610, lng: 77.7060, label: 'Stop 2', num: 2 },
          { lat: 12.9550, lng: 77.7120, label: 'Stop 3', num: 3 },
          { lat: 12.9680, lng: 77.7200, label: 'Stop 4', num: 4 },
          { lat: 12.9660, lng: 77.7320, label: '🏠 Priya Sharma (Delivery)', isHome: true }
        ];

        const latLngs = points.map(p => [p.lat, p.lng]);
        map.fitBounds(L.latLngBounds(latLngs), { padding: [30, 30] });

        // Purple-pink polyline matching second image
        L.polyline(latLngs, {
          color: '#d946ef',
          weight: 5,
          opacity: 0.95
        }).addTo(map);

        // Add custom markers matching second image
        points.forEach((p) => {
          let html = '';
          let iconSize = [34, 42];
          let iconAnchor = [17, 42];

          if (p.isStart) {
            html = `
              <div style="display:flex; align-items:center; justify-content:center; width:22px; height:22px; background:rgba(59,130,246,0.25); border-radius:50%;">
                <div style="background:#3b82f6; border:3px solid #fff; width:16px; height:16px; border-radius:50%; box-shadow:0 0 8px rgba(59,130,246,0.85);"></div>
              </div>
            `;
            iconSize = [22, 22];
            iconAnchor = [11, 11];
          } else if (p.isShop) {
            html = `
              <div style="position:relative; display:flex; flex-direction:column; align-items:center; width:34px; height:42px;">
                <div style="background:#e91e63; color:#fff; width:34px; height:34px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); display:flex; align-items:center; justify-content:center; box-shadow:0 3px 6px rgba(0,0,0,0.3); border:2px solid #fff;">
                  <span style="transform:rotate(45deg); font-size:14px; display:block; line-height:1; margin-top:-2px; margin-left:-2px;">🏪</span>
                </div>
              </div>
            `;
          } else if (p.isHome) {
            html = `
              <div style="position:relative; display:flex; flex-direction:column; align-items:center; width:34px; height:42px;">
                <div style="background:#10b981; color:#fff; width:34px; height:34px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); display:flex; align-items:center; justify-content:center; box-shadow:0 3px 6px rgba(0,0,0,0.3); border:2px solid #fff;">
                  <span style="transform:rotate(45deg); font-size:14px; display:block; line-height:1; margin-top:-2px; margin-left:-2px;">🏠</span>
                </div>
              </div>
            `;
          } else {
            html = `
              <div style="position:relative; display:flex; flex-direction:column; align-items:center; width:34px; height:42px;">
                <div style="background:#f97316; color:#fff; width:34px; height:34px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); display:flex; align-items:center; justify-content:center; box-shadow:0 3px 6px rgba(0,0,0,0.3); border:2px solid #fff;">
                  <span style="transform:rotate(45deg); font-size:13px; font-weight:800; display:block; line-height:1; margin-top:-2px; margin-left:-2px;">${p.num}</span>
                </div>
              </div>
            `;
          }

          const divIcon = L.divIcon({
            html: html,
            className: '',
            iconSize: iconSize,
            iconAnchor: iconAnchor
          });

          L.marker([p.lat, p.lng], { icon: divIcon })
            .addTo(map)
            .bindPopup(`<strong>${p.label}</strong>`);
        });
      }

      // 2. Handle Navigation Map
      if (activeTab === 'navigation' && navMapRef.current) {
        if (navMapInstance.current) {
          try {
            navMapInstance.current.remove();
          } catch (e) {
            console.error("Error removing nav map:", e);
          }
          navMapInstance.current = null;
        }
        if (navMapRef.current._leaflet_id) {
          delete navMapRef.current._leaflet_id;
        }

        const map = L.map(navMapRef.current, {
          zoomControl: false,
          attributionControl: false
        }).setView([12.9600, 77.7100], 14);
        navMapInstance.current = map;

        const tileUrl = isDark 
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
        L.tileLayer(tileUrl, {
          maxZoom: 20
        }).addTo(map);

        const pickup = [12.9640, 77.6910];
        const riderLoc = [12.9610, 77.7120];
        const deliver = [12.9560, 77.7280];

        map.fitBounds(L.latLngBounds([pickup, deliver]), { padding: [60, 60] });

        // Route line (Dashed gradient pink/purple path)
        L.polyline([pickup, riderLoc, deliver], {
          color: '#FF2E8A',
          weight: 5,
          dashArray: '8, 8',
          opacity: 0.95
        }).addTo(map);

        // Pickup Marker Badge
        const pickupIcon = L.divIcon({
          html: `<div style="display:flex; align-items:center; gap:6px; background:#ffffff; padding:4px 10px 4px 6px; border-radius:20px; box-shadow:0 6px 18px rgba(0,0,0,0.18); border:1.5px solid #7C3AED; cursor:pointer;">
            <div style="background:linear-gradient(135deg, #7C3AED, #6D28D9); color:#fff; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; flex-shrink:0;">🛍️</div>
            <div style="display:flex; flex-direction:column; line-height:1.2; text-align:left;">
              <span style="font-size:9px; color:#64748B; font-weight:700; text-transform:uppercase;">Pickup</span>
              <strong style="font-size:11px; color:#0F172A; white-space:nowrap; font-weight:800;">Vogue Tailors</strong>
            </div>
          </div>`,
          className: '',
          iconSize: [140, 36],
          iconAnchor: [70, 18]
        });
        L.marker(pickup, { icon: pickupIcon }).addTo(map).bindPopup("<strong>Pickup: Vogue Craft Tailors</strong>");

        // Rider GPS Dot with Pulse Animation
        const riderIcon = L.divIcon({
          html: `<div style="position:relative; width:38px; height:38px; display:flex; align-items:center; justify-content:center;">
            <div style="position:absolute; width:38px; height:38px; border-radius:50%; background:rgba(59,130,246,0.35);" class="pulse-marker"></div>
            <div style="width:18px; height:18px; border-radius:50%; background:#3B82F6; border:3px solid #ffffff; box-shadow:0 4px 14px rgba(59,130,246,0.6);"></div>
          </div>`,
          className: '',
          iconSize: [38, 38],
          iconAnchor: [19, 19]
        });
        L.marker(riderLoc, { icon: riderIcon }).addTo(map).bindPopup("<strong>Live Location: On the way to pickup</strong>");

        // Delivery Marker Badge
        const deliverIcon = L.divIcon({
          html: `<div style="display:flex; align-items:center; gap:6px; background:#ffffff; padding:4px 10px 4px 6px; border-radius:20px; box-shadow:0 6px 18px rgba(0,0,0,0.18); border:1.5px solid #FF2E8A; cursor:pointer;">
            <div style="background:linear-gradient(135deg, #FF2E8A, #C400FF); color:#fff; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; flex-shrink:0;">📍</div>
            <div style="display:flex; flex-direction:column; line-height:1.2; text-align:left;">
              <span style="font-size:9px; color:#64748B; font-weight:700; text-transform:uppercase;">Deliver to</span>
              <strong style="font-size:11px; color:#0F172A; white-space:nowrap; font-weight:800;">Priya Sharma</strong>
            </div>
          </div>`,
          className: '',
          iconSize: [140, 36],
          iconAnchor: [70, 18]
        });
        L.marker(deliver, { icon: deliverIcon }).addTo(map).bindPopup("<strong>Deliver to: Priya Sharma</strong>");
      }

      // 3. Handle Order Details Map
      if (activeTab === 'orders' && selectedOrder && orderMapRef.current) {
        if (orderMapInstance.current) {
          try {
            orderMapInstance.current.remove();
          } catch (e) {
            console.error("Error removing order map:", e);
          }
          orderMapInstance.current = null;
        }
        if (orderMapRef.current._leaflet_id) {
          delete orderMapRef.current._leaflet_id;
        }

        const pickupCoords = selectedOrder.pickupCoords || [12.9592, 77.6974];
        const deliveryCoords = selectedOrder.deliveryCoords || [12.9660, 77.7320];

        const map = L.map(orderMapRef.current, {
          zoomControl: false,
          attributionControl: false
        }).setView(pickupCoords, 14);
        orderMapInstance.current = map;

        L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20
        }).addTo(map);

        map.fitBounds(L.latLngBounds([pickupCoords, deliveryCoords]), { padding: [30, 30] });

        // Route polyline
        L.polyline([pickupCoords, deliveryCoords], {
          color: '#7209b7',
          weight: 4,
          opacity: 0.9,
          dashArray: '4, 4'
        }).addTo(map);

        // Custom markers
        const pickupIconHtml = L.divIcon({
          html: `<div style="background:#7209b7; color:#fff; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.3); font-size:14px; font-weight:bold;">🏪</div>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        L.marker(pickupCoords, { icon: pickupIconHtml }).addTo(map).bindPopup(`<strong>Pickup: ${selectedOrder.pickup}</strong>`);

        const deliverIconHtml = L.divIcon({
          html: `<div style="background:#f72585; color:#fff; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.3); font-size:14px; font-weight:bold;">🏠</div>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        L.marker(deliveryCoords, { icon: deliverIconHtml }).addTo(map).bindPopup(`<strong>Deliver: ${selectedOrder.deliverTo}</strong>`);
      }
    };

    if (window.L) {
      initMap(window.L);
    } else {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        if (window.L) initMap(window.L);
      };
      document.head.appendChild(script);
    }

    return () => {
      if (homeMapInstance.current) {
        try {
          homeMapInstance.current.remove();
        } catch (e) {
          console.error(e);
        }
        homeMapInstance.current = null;
      }
      if (navMapInstance.current) {
        try {
          navMapInstance.current.remove();
        } catch (e) {
          console.error(e);
        }
        navMapInstance.current = null;
      }
      if (orderMapInstance.current) {
        try {
          orderMapInstance.current.remove();
        } catch (e) {
          console.error(e);
        }
        orderMapInstance.current = null;
      }
    };
  }, [activeTab, isDark, selectedOrder]);

  // Wallet state
  const [walletBalance, setWalletBalance] = useState(8500);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [earningsSubTab, setEarningsSubTab] = useState('Overview');
  const [isDatePickerActive, setIsDatePickerActive] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filterArea, setFilterArea] = useState('All');
  const [filterPaymentType, setFilterPaymentType] = useState('All');
  const [filterOrderType, setFilterOrderType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDistance, setFilterDistance] = useState('All');
  const [filterOnlineHours, setFilterOnlineHours] = useState('All');
  const [filterBonusType, setFilterBonusType] = useState('All');
  const [earningsSearchText, setEarningsSearchText] = useState('');
  const [earningsTypeFilter, setEarningsTypeFilter] = useState('All');
  const [earningsChartMetric, setEarningsChartMetric] = useState('revenue');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank *8831');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [activeIncentiveChallenge, setActiveIncentiveChallenge] = useState(null);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [earningsTransactions, setEarningsTransactions] = useState([
    { id: "SB-TX-9842", date: "Today, 02:30 PM", type: "Delivery Commission", orderId: "SB-1024", status: "Settled", amount: 120, mode: "credit" },
    { id: "SB-TX-9841", date: "Today, 01:15 PM", type: "Customer Tip", orderId: "SB-1024", status: "Settled", amount: 40, mode: "credit" },
    { id: "SB-TX-9840", date: "Today, 11:45 AM", type: "Surge Pay (Rain)", orderId: "SB-1023", status: "Settled", amount: 35, mode: "credit" },
    { id: "SB-TX-9839", date: "Yesterday, 08:20 PM", type: "Withdrawal Request", orderId: "SB-WD-221", status: "Settled", amount: -2500, mode: "debit" },
    { id: "SB-TX-9838", date: "Yesterday, 06:10 PM", type: "Delivery Commission", orderId: "SB-1019", status: "Settled", amount: 95, mode: "credit" },
    { id: "SB-TX-9837", date: "Yesterday, 05:45 PM", type: "Weekend Incentive", orderId: "SB-INC-99", status: "Settled", amount: 200, mode: "credit" },
    { id: "SB-TX-9836", date: "18 Jun, 03:30 PM", type: "Delivery Commission", orderId: "SB-1018", status: "Settled", amount: 110, mode: "credit" },
    { id: "SB-TX-9835", date: "17 Jun, 09:12 AM", type: "Withdrawal Request", orderId: "SB-WD-220", status: "Failed", amount: -1500, mode: "debit" },
    { id: "SB-TX-9834", date: "17 Jun, 08:00 AM", type: "Weekly Milestone Bonus", orderId: "SB-INC-98", status: "Settled", amount: 500, mode: "credit" },
    { id: "SB-TX-9833", date: "16 Jun, 12:45 PM", type: "Delivery Commission", orderId: "SB-1012", status: "Settled", amount: 85, mode: "credit" },
  ]);
  
  // Quick support replies
  const quickReplies = [
    "Running Late due to traffic",
    "Reached the location",
    "Picked Up the order",
    "5 Minutes Away",
    "Delivered successfully!"
  ];

  // Mock Active Order for Nav
  const activeOrder = {
    id: '#SB-1024',
    pickup: 'Vogue Craft Tailors',
    pickupAddress: 'Shop 4, Lane 2, Sector 5, HSR Layout, Bengaluru',
    deliverTo: 'Priya Sharma',
    deliveryAddress: 'Flat 402, Pinecrest Apartments, Sector 3, HSR Layout, Bengaluru',
    distance: '3.4 km',
    eta: '14 mins',
    item: 'Lehenga & Blouse',
    price: 850,
    earnings: 120,
    phone: '+91 98765 43210',
    tailorPhone: '+91 99887 76655',
    pickupOtp: '4091',
    deliveryOtp: '8821'
  };

  // Mock Orders list
  const [ordersList, setOrdersList] = useState([
    {
      id: '#SB-1024',
      status: 'active',
      taskStatus: 'Ready', // 'Ready', 'In Progress', 'Pickup Pending'
      pickup: 'Vogue Craft Tailors',
      pickupAddress: '23, 4th Main, 1st Cross, Brookefield, Bengaluru, Karnataka 560037',
      pickupPhone: '+91 98765 43210',
      pickupContactName: 'Rajesh Kumar',
      pickupTime: 'Open till 9:00 PM',
      deliverTo: 'Priya Sharma',
      deliveryAddress: '12, Prestige Lakeside, Whitefield, Bengaluru, Karnataka 560066',
      deliveryPhone: '+91 87654 32109',
      deliveryOtp: '7842',
      item: 'Lehenga',
      weight: '2.3 KG',
      type: 'Clothing',
      fragile: 'Yes',
      handleNote: 'Embroidered work',
      customerNote: 'Please call before arriving. Gate No. 4, Flat 507. Ring the bell twice.',
      paymentType: 'Prepaid',
      orderValue: '₹5,200',
      payout: '₹150',
      distance: '3.2 KM',
      estTime: '18 mins',
      traffic: 'Light',
      bestRoute: 'Via ITPL Main Rd',
      pickupCoords: [12.9592, 77.6974],
      deliveryCoords: [12.9660, 77.7320]
    },
    {
      id: '#SB-1025',
      status: 'active',
      taskStatus: 'In Progress',
      pickup: 'Rose Boutique',
      pickupAddress: '456, 80 Feet Rd, Koramangala 4th Block, Bengaluru, Karnataka 560034',
      pickupPhone: '+91 98765 43211',
      pickupContactName: 'Anita Singh',
      pickupTime: 'Open till 8:30 PM',
      deliverTo: 'Sneha Iyer',
      deliveryAddress: '78, 19th Main, HSR Layout Sector 3, Bengaluru, Karnataka 560102',
      deliveryPhone: '+91 87654 32110',
      deliveryOtp: '3941',
      item: 'Saree',
      weight: '1.8 KG',
      type: 'Clothing',
      fragile: 'No',
      handleNote: 'Delicate silk material',
      customerNote: 'Leave at reception desk if not available.',
      paymentType: 'COD',
      orderValue: '₹4,500',
      payout: '₹180',
      distance: '5.4 KM',
      estTime: '26 mins',
      traffic: 'Moderate',
      bestRoute: 'Via Outer Ring Rd',
      pickupCoords: [12.9348, 77.6272],
      deliveryCoords: [12.9100, 77.6450]
    },
    {
      id: '#SB-1026',
      status: 'active',
      taskStatus: 'Pickup Pending',
      pickup: 'Elite Threads',
      pickupAddress: '89, 100 Feet Rd, Indiranagar, Bengaluru, Karnataka 560038',
      pickupPhone: '+91 98765 43212',
      pickupContactName: 'Vikram Rao',
      pickupTime: 'Open till 9:30 PM',
      deliverTo: 'Amit Verma',
      deliveryAddress: '34, Spice Garden Layout, Marathahalli, Bengaluru, Karnataka 560037',
      deliveryPhone: '+91 87654 32111',
      deliveryOtp: '5682',
      item: 'Kurta Set',
      weight: '1.2 KG',
      type: 'Clothing',
      fragile: 'No',
      handleNote: 'Standard packing',
      customerNote: 'Call upon reaching the gate for gate pass entry code.',
      paymentType: 'Prepaid',
      orderValue: '₹2,800',
      payout: '₹120',
      distance: '4.6 KM',
      estTime: '20 mins',
      traffic: 'Heavy',
      bestRoute: 'Via HAL Old Airport Rd',
      pickupCoords: [12.9719, 77.6412],
      deliveryCoords: [12.9562, 77.7011]
    },
    {
      id: '#SB-0998',
      status: 'upcoming',
      taskStatus: 'Ready',
      pickup: 'Vogue Craft Tailors',
      pickupAddress: '23, 4th Main, 1st Cross, Brookefield, Bengaluru, Karnataka 560037',
      pickupPhone: '+91 98765 43210',
      pickupContactName: 'Rajesh Kumar',
      pickupTime: 'Open till 9:00 PM',
      deliverTo: 'Amit Verma',
      deliveryAddress: '34, Spice Garden Layout, Marathahalli, Bengaluru, Karnataka 560037',
      deliveryPhone: '+91 87654 32111',
      deliveryOtp: '9081',
      item: 'Sherwani',
      weight: '3.5 KG',
      type: 'Clothing',
      fragile: 'Yes',
      handleNote: 'Heavy work garment',
      customerNote: 'Please deliver before 8 PM.',
      paymentType: 'Prepaid',
      orderValue: '₹12,500',
      payout: '₹150',
      distance: '4.8 KM',
      estTime: '22 mins',
      traffic: 'Light',
      bestRoute: 'Via Marathahalli Bridge',
      pickupCoords: [12.9592, 77.6974],
      deliveryCoords: [12.9562, 77.7011]
    },
    {
      id: '#SB-0987',
      status: 'upcoming',
      taskStatus: 'Pickup Pending',
      pickup: 'Rose Boutique',
      pickupAddress: '456, 80 Feet Rd, Koramangala 4th Block, Bengaluru, Karnataka 560034',
      pickupPhone: '+91 98765 43211',
      pickupContactName: 'Anita Singh',
      pickupTime: 'Open till 8:30 PM',
      deliverTo: 'Sneha Iyer',
      deliveryAddress: '78, 19th Main, HSR Layout Sector 3, Bengaluru, Karnataka 560102',
      deliveryPhone: '+91 87654 32110',
      deliveryOtp: '4481',
      item: 'Anarkali Suit',
      weight: '2.0 KG',
      type: 'Clothing',
      fragile: 'No',
      handleNote: 'Embroidered outfit',
      customerNote: 'Call husband if phone is busy.',
      paymentType: 'Prepaid',
      orderValue: '₹3,400',
      payout: '₹100',
      distance: '2.5 KM',
      estTime: '12 mins',
      traffic: 'Light',
      bestRoute: 'Via 14th Main Rd',
      pickupCoords: [12.9348, 77.6272],
      deliveryCoords: [12.9100, 77.6450]
    },
    {
      id: '#SB-0950',
      status: 'completed',
      taskStatus: 'Delivered',
      pickup: 'Vogue Craft Tailors',
      pickupAddress: '23, 4th Main, 1st Cross, Brookefield, Bengaluru, Karnataka 560037',
      pickupPhone: '+91 98765 43210',
      pickupContactName: 'Rajesh Kumar',
      pickupTime: 'Open till 9:00 PM',
      deliverTo: 'Neha Kapoor',
      deliveryAddress: '88, Palm Meadows, Whitefield, Bengaluru, Karnataka 560066',
      deliveryPhone: '+91 87654 32112',
      deliveryOtp: '1234',
      item: 'Kurtis',
      weight: '1.0 KG',
      type: 'Clothing',
      fragile: 'No',
      handleNote: 'None',
      customerNote: 'Leave with guard.',
      paymentType: 'Prepaid',
      orderValue: '₹1,500',
      payout: '₹95',
      distance: '3.0 KM',
      estTime: '15 mins',
      traffic: 'Light',
      bestRoute: 'Via Whitefield Main Rd',
      pickupCoords: [12.9592, 77.6974],
      deliveryCoords: [12.9698, 77.7499]
    },
    {
      id: '#SB-0921',
      status: 'cancelled',
      taskStatus: 'Cancelled',
      pickup: 'Vogue Craft Tailors',
      pickupAddress: '23, 4th Main, 1st Cross, Brookefield, Bengaluru, Karnataka 560037',
      pickupPhone: '+91 98765 43210',
      pickupContactName: 'Rajesh Kumar',
      pickupTime: 'Open till 9:00 PM',
      deliverTo: 'Rahul Mehta',
      deliveryAddress: '15, Rustam Bagh, HAL Road, Bengaluru, Karnataka 560017',
      deliveryPhone: '+91 87654 32113',
      deliveryOtp: '4321',
      item: 'Suit Pant',
      weight: '2.5 KG',
      type: 'Clothing',
      fragile: 'No',
      handleNote: 'Premium suit pack',
      customerNote: 'Call 10 mins before arrival.',
      paymentType: 'Prepaid',
      orderValue: '₹8,900',
      payout: '₹110',
      distance: '3.5 KM',
      estTime: '18 mins',
      traffic: 'Moderate',
      bestRoute: 'Via HAL Rd',
      pickupCoords: [12.9592, 77.6974],
      deliveryCoords: [12.9620, 77.6710]
    }
  ]);

  // Sync selectedOrder with sub-tab selection
  useEffect(() => {
    const filtered = ordersList.filter(o => o.status === ordersSubTab);
    if (filtered.length > 0) {
      const exists = filtered.find(o => o.id === selectedOrder?.id);
      if (!exists) {
        setSelectedOrder(filtered[0]);
      }
    } else {
      setSelectedOrder(null);
    }
  }, [ordersSubTab, ordersList]);

  // Support messages timeline
  const [chatHistory, setChatHistory] = useState({
    customer: [
      { sender: 'customer', text: 'Hi, are you near the location yet?', time: '11:45 AM', read: true, type: 'text' },
      { sender: 'rider', text: 'Yes, just 5 minutes away. Please keep the delivery OTP ready.', time: '11:47 AM', read: true, type: 'text' },
      { sender: 'customer', text: 'Please drop it off with the security guard if I am not at the door.', time: '11:48 AM', read: true, type: 'text' },
      { sender: 'system', text: 'OTP Requested: Verification code sent to customer.', time: '11:49 AM', read: true, type: 'system' }
    ],
    tailor: [
      { sender: 'tailor', text: 'Please collect the matching border bag with the Lehenga.', time: '10:30 AM', read: true, type: 'text' },
      { sender: 'rider', text: 'Sure, will make sure to check and pick it up.', time: '10:32 AM', read: true, type: 'text' },
      { sender: 'tailor', text: 'I have uploaded the invoice image for your verification.', time: '10:35 AM', read: true, type: 'image', imgUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=300&q=80', caption: 'Invoice Vogue #882' }
    ],
    admin: [
      { sender: 'admin', text: 'Your incentive payout for completing 10 deliveries has been credited.', time: 'Yesterday', read: true, type: 'text' },
      { sender: 'system', text: 'Ticket SB-5021 has been marked as Resolved.', time: 'Yesterday', read: true, type: 'system' }
    ],
    ai: [
      { sender: 'ai', text: 'Hello! I am your AI delivery route planner. Ask me for traffic alerts or destination updates.', time: 'Today', read: true, type: 'text' },
      { sender: 'ai', text: 'Traffic Alert: Heavy congestion on main road. Alternative path via 12th Cross will save 8 minutes.', time: '10:00 AM', read: true, type: 'ai' }
    ]
  });

  const handleSendMessage = () => {
    if (!typedMessage) return;
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    const newMsg = { sender: 'rider', text: typedMessage, time: timeStr, read: false, type: 'text' };
    
    setChatHistory(prev => ({
      ...prev,
      [supportContact]: [...prev[supportContact], newMsg]
    }));
    setTypedMessage('');

    // Simulated reply
    setTimeout(() => {
      let replyText = "Received! Working on it.";
      if (supportContact === 'ai') {
        replyText = "The shortest route has moderate traffic. Expected delay: 2 minutes.";
      }
      const replyMsg = { sender: supportContact, text: replyText, time: timeStr, read: true, type: 'text' };
      setChatHistory(prev => ({
        ...prev,
        [supportContact]: [...prev[supportContact], replyMsg]
      }));
    }, 1500);
  };

  const sendSmartMessage = (text) => {
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    const newMsg = { sender: 'rider', text: text, time: timeStr, read: false, type: 'text' };
    setChatHistory(prev => ({
      ...prev,
      [supportContact]: [...prev[supportContact], newMsg]
    }));
  };

  const handleWithdraw = () => {
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0 || amt > walletBalance) {
      alert("Please enter a valid withdrawal amount within your available balance.");
      return;
    }
    
    setIsWithdrawing(true);
    setWithdrawSuccess(false);

    setTimeout(() => {
      setWalletBalance(prev => prev - amt);
      setWithdrawAmount('');
      
      const newTx = {
        id: `SB-TX-${Math.floor(1000 + Math.random() * 9000)}`,
        date: "Just Now",
        type: "Withdrawal Request",
        orderId: `SB-WD-${Math.floor(222 + Math.random() * 500)}`,
        status: "Settled",
        amount: -amt,
        mode: "debit"
      };
      setEarningsTransactions(prev => [newTx, ...prev]);
      
      setIsWithdrawing(false);
      setWithdrawSuccess(true);
      
      setTimeout(() => {
        setWithdrawSuccess(false);
      }, 4000);
    }, 2000);
  };

  return (
    <div 
      style={{ 
        background: isDark ? '#0b0914' : '#f8fafc', 
        color: colorTextPrimary, 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <header className="top-nav rider-top-nav">
        {/* Logo and Brand */}
        <div className="logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Scissors size={24} style={{ color: 'var(--primary)', transform: 'rotate(-45deg)' }} />
          <span className="logo-text">StitchBee</span>
          <span style={{ fontSize: '0.65rem', background: '#3b82f6', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginLeft: '4px' }}>RIDER PORTAL</span>
        </div>

        {/* Desktop Tabs Header Menu */}
        <div className="role-switcher desktop-header-nav" style={{ display: 'flex', gap: '4px' }}>
          {[
            { id: 'home', label: 'Home', icon: <Home size={15} /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingBag size={15} /> },
            { id: 'navigation', label: 'Navigation', icon: <Compass size={15} /> },
            { id: 'earnings', label: 'Earnings', icon: <DollarSign size={15} /> },
            { id: 'support', label: 'Support', icon: <MessageSquare size={15} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`role-btn ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Info: Online status, Theme selector, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Online Toggle Pill */}
          <div 
            onClick={() => setIsOnline(!isOnline)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 12px', 
              borderRadius: '20px', 
              background: isOnline ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)', 
              color: isOnline ? '#10b981' : '#6b7280', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.72rem',
              border: `1px solid ${isOnline ? '#10b981' : '#6b7280'}`
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#10b981' : '#6b7280' }}></span>
            {isOnline ? 'Online' : 'Offline'}
          </div>

          {/* Theme toggle */}
          <button 
            className="btn btn-ghost" 
            style={{ padding: '8px', borderRadius: '50%', color: colorTextSecondary }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Profile Avatar with Dropdown */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative' }}
            onClick={(e) => {
              e.stopPropagation();
              setProfileDropdownOpen(!profileDropdownOpen);
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: `2px solid var(--primary)` }}>
              <img src="/tailor_hero_4.jpg" alt="Rider" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.7rem', textAlign: 'left' }} className="desktop-header-nav">
              <strong style={{ color: colorTextPrimary, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Rajesh Rider <ChevronRight size={10} style={{ transform: 'rotate(90deg)', marginLeft: '2px' }} />
              </strong>
              <span style={{ color: colorTextMuted }}>Rider Partner</span>
            </div>

            {/* Floating Dropdown menu */}
            {profileDropdownOpen && (
              <ul 
                className="nav-dropdown-menu show" 
                style={{ 
                  position: 'absolute', 
                  top: '40px', 
                  right: 0, 
                  minWidth: '150px', 
                  background: bgCard, 
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 200,
                  listStyle: 'none',
                  padding: '8px 0',
                  margin: 0
                }}
              >
                <li 
                  className="dropdown-item" 
                  style={{ padding: '8px 16px', fontSize: '0.8rem', color: colorTextPrimary }}
                  onClick={() => {
                    setActiveTab('profile');
                    setProfileDropdownOpen(false);
                  }}
                >
                  👤 View Profile
                </li>
                <li 
                  className="dropdown-item" 
                  style={{ padding: '8px 16px', fontSize: '0.8rem', color: 'var(--primary)' }}
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                >
                  🚪 Log Out
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Main content body */}
      <main style={{ flex: 1, padding: activeTab === 'orders' ? '12px 16px' : '20px', overflowY: 'auto', overflowX: 'hidden', paddingBottom: activeTab === 'orders' ? '12px' : '90px' }}>
        
        {/* MODULE 1: HOME (DASHBOARD) */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="dashboard-main-grid">
            {/* LEFT COLUMN: Far-Left Sidebar Card (Go Online & Start Delivering) */}
            <div className="delivery-dashboard-sidebar-wrapper" style={{ position: 'sticky', top: '20px', alignSelf: 'start' }}>
              <div 
                className="dashboard-premium-card" 
                style={{ 
                  background: isDark ? 'linear-gradient(135deg, #1A153B 0%, #0F0B26 100%)' : 'linear-gradient(135deg, #7C3AED 0%, #FF2E83 100%)', 
                  border: 'none', 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px',
                  height: '660px',
                  justifyContent: 'space-between',
                  color: '#ffffff',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Partner Portal</h4>
                    <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>V4.2</span>
                  </div>

                  {/* Level Badge Widget */}
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '6px', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)' }}>
                        <Award size={14} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '12px', color: '#fff', display: 'block' }}>Gold Rider Tier</strong>
                        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>XP: 8,500 / 10,000 (85%)</span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden', marginTop: '2px' }}>
                      <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #F59E0B, #FF9F43)', borderRadius: '3px' }} />
                    </div>
                  </div>
                </div>
                
                {/* 3D Illustration Widget */}
                <div style={{ textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '14px 0' }}>
                  <img 
                    src="/rider_3d.jpg" 
                    alt="Rider 3D" 
                    style={{ 
                      width: '95%', 
                      height: '170px', 
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))'
                    }} 
                  />
                </div>
                
                {/* Info and Actions Area */}
                <div 
                  style={{ 
                    background: isDark ? '#120f26' : '#ffffff', 
                    color: colorTextPrimary,
                    borderRadius: '20px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                    border: `1px solid ${borderColor}`
                  }}
                >
                  {/* Status Indicator & Weather & Traffic Badges */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: `1.5px solid ${borderColor}`, paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#22C55E' : '#9CA3AF' }} className={isOnline ? 'pulse-marker' : ''}></span>
                        <strong style={{ fontSize: '11px', color: isOnline ? '#22C55E' : colorTextMuted }}>
                          {isOnline ? 'ONLINE' : 'OFFLINE'}
                        </strong>
                      </div>
                      <span style={{ fontSize: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', padding: '2px 6px', borderRadius: '6px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Sun size={10} /> 31°C Sunny
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: colorTextMuted, fontWeight: 'bold' }}>
                      <span>TRAFFIC: <strong style={{ color: '#F59E0B' }}>MODERATE</strong></span>
                      <span>BOOST MULTIPLIER: <strong style={{ color: '#22C55E' }}>1.2x</strong></span>
                    </div>
                  </div>

                  {/* Today's Goal Badge */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold' }}>
                      <span style={{ color: colorTextSecondary }}>Today's Goal</span>
                      <span style={{ color: '#FF2E83' }}>16 / 20 Orders</span>
                    </div>
                    <div style={{ height: '6px', background: isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #7C3AED, #FF2E83)', borderRadius: '3px' }} />
                    </div>
                  </div>

                  {/* Metrics Stats List */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '10px', textAlign: 'left', marginTop: '2px' }}>
                    <div style={{ background: isDark ? 'rgba(255,255,255,0.02)' : '#F8FAFC', padding: '8px', borderRadius: '10px', border: `1px solid ${borderColor}` }}>
                      <span style={{ color: colorTextMuted, display: 'block' }}>Today's Pay</span>
                      <strong style={{ color: '#22C55E', fontSize: '12px' }}>₹1,820</strong>
                    </div>
                    <div style={{ background: isDark ? 'rgba(255,255,255,0.02)' : '#F8FAFC', padding: '8px', borderRadius: '10px', border: `1px solid ${borderColor}` }}>
                      <span style={{ color: colorTextMuted, display: 'block' }}>Rating</span>
                      <strong style={{ color: '#F59E0B', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        4.95 <Star size={10} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                      </strong>
                    </div>
                  </div>

                  {/* Offline / Online Floating Power Action Button */}
                  <button 
                    className="btn" 
                    onClick={() => setIsOnline(!isOnline)}
                    style={{ 
                      width: '100%', 
                      fontWeight: '800',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      background: isOnline ? 'linear-gradient(135deg, #EF4444, #C53030)' : 'linear-gradient(135deg, #22C55E, #16A34A)',
                      color: '#ffffff',
                      border: 'none',
                      boxShadow: isOnline ? '0 4px 12px rgba(239, 68, 68, 0.2)' : '0 4px 12px rgba(34, 197, 94, 0.2)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                  >
                    <Power size={14} /> {isOnline ? 'Go Offline' : 'Go Online'}
                  </button>
                </div>
              </div>

              {/* Recent Earnings Card */}
              <div 
                className="dashboard-premium-card earning-slide-in" 
                style={{ 
                  background: bgCard, 
                  border: `1.5px solid ${borderColor}`, 
                  borderRadius: '20px', 
                  padding: '16px 20px',
                  height: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                  textAlign: 'left'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: colorTextPrimary, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>💰</span> Recent Earnings
                  </span>
                  <span 
                    style={{ fontSize: '12px', color: '#FF2E83', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => setActiveTab('earnings')}
                  >
                    View All
                  </span>
                </div>

                {/* Earnings List */}
                <div 
                  className="earnings-mini-list"
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px', 
                    overflowY: 'auto',
                    flex: 1,
                    margin: '10px 0',
                    paddingRight: '2px'
                  }}
                >
                  {[
                    { id: '#SB-1025', from: 'Whitefield', to: 'HSR Layout', time: '8 mins ago', amt: 180, method: 'Online', isLatest: true },
                    { id: '#SB-1023', from: 'Indiranagar', to: 'Koramangala', time: '24 mins ago', amt: 150, method: 'Cash' },
                    { id: '#SB-1022', from: 'Brookfield', to: 'Marathahalli', time: '1h ago', amt: 210, method: 'Online' },
                    { id: '#SB-1021', from: 'Domlur', to: 'Bellandur', time: '2h ago', amt: 130, method: 'Cash' },
                    { id: '#SB-1020', from: 'HSR Layout', to: 'Bellandur', time: '3h ago', amt: 160, method: 'Online' }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="earning-row-item earning-slide-in"
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        paddingBottom: '6px',
                        borderBottom: idx === 4 ? 'none' : `1px solid ${borderColor}`,
                        animationDelay: `${idx * 0.15}s`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        {/* Gradient circular icon with green check marker */}
                        <div 
                          style={{ 
                            width: '26px', 
                            height: '26px', 
                            borderRadius: '50%', 
                            background: item.method === 'Cash' 
                              ? 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)' 
                              : 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: '#ffffff',
                            flexShrink: 0
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>

                        {/* Text details */}
                        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <strong style={{ fontSize: '12px', color: colorTextPrimary }}>Order {item.id}</strong>
                            <FileText size={10} style={{ color: colorTextMuted }} />
                            {item.isLatest && (
                              <span 
                                className="just-now-pulse" 
                                style={{ 
                                  width: '6px', 
                                  height: '6px', 
                                  borderRadius: '50%', 
                                  background: '#22C55E', 
                                  display: 'inline-block',
                                  marginLeft: '2px'
                                }} 
                                title="Just Now"
                              />
                            )}
                          </div>
                          <span style={{ fontSize: '10px', color: colorTextSecondary, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {item.from} → {item.to}
                          </span>
                          <span style={{ fontSize: '9px', color: colorTextMuted }}>
                            Completed {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Payout & Payment Method badge */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '2px' }}>
                        <strong style={{ fontSize: '13px', color: '#22C55E' }}>+₹{item.amt}</strong>
                        <span 
                          style={{ 
                            fontSize: '8px', 
                            padding: '1px 6px', 
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            background: item.method === 'Cash' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                            color: item.method === 'Cash' ? '#22C55E' : '#3B82F6'
                          }}
                        >
                          {item.method}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer summary panel */}
                <div 
                  style={{ 
                    background: isDark ? 'rgba(255, 46, 131, 0.04)' : 'linear-gradient(135deg, rgba(255, 46, 131, 0.05) 0%, rgba(255, 46, 131, 0.01) 100%)',
                    border: '1px solid rgba(255, 46, 131, 0.15)',
                    borderRadius: '16px',
                    padding: '8px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block', fontWeight: 'bold' }}>TODAY'S EARNINGS</span>
                    <strong style={{ fontSize: '14px', color: colorTextPrimary }}>₹1,820</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', color: '#FF2E83', display: 'block', fontWeight: 'bold' }}>11 Deliveries</span>
                    <span style={{ fontSize: '9px', color: colorTextSecondary }}>Avg: ₹165/order</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: KPI cards, Map, active delivery, timeline list, perform charts, quick actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Row 1: KPI Stats Summary Grid */}
              <div className="dashboard-kpi-grid">
                {[
                  { 
                    label: "Today's Earnings", 
                    val: "₹1,820", 
                    sub: "+₹150 Incentives", 
                    subColor: '#22C55E', 
                    sparkColor: '#FF2E83',
                    sparkData: [400, 700, 500, 900, 1200, 1820],
                    icon: <Wallet size={16} />, 
                    grad: 'linear-gradient(135deg, rgba(255, 46, 131, 0.05) 0%, rgba(255, 46, 131, 0.01) 100%)', 
                    border: 'rgba(255, 46, 131, 0.15)',
                    color: '#FF2E83'
                  },
                  { 
                    label: "Today's Orders", 
                    val: "16 Orders", 
                    sub: "Goal: 20 Orders", 
                    subColor: colorTextSecondary, 
                    sparkColor: '#3B82F6',
                    sparkData: [3, 6, 8, 11, 14, 16],
                    icon: <FileText size={16} />, 
                    grad: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.01) 100%)', 
                    border: 'rgba(59, 130, 246, 0.15)',
                    color: '#3B82F6' 
                  },
                  { 
                    label: "Completed", 
                    val: "11 Orders", 
                    sub: "69% Success Rate", 
                    subColor: '#22C55E', 
                    sparkColor: '#22C55E',
                    sparkData: [2, 4, 6, 8, 10, 11],
                    icon: <CheckCircle size={16} />, 
                    grad: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.01) 100%)', 
                    border: 'rgba(34, 197, 94, 0.15)',
                    color: '#22C55E' 
                  },
                  { 
                    label: "Pending", 
                    val: "5 Orders", 
                    sub: "View Active >", 
                    subColor: '#EF4444', 
                    sparkColor: '#F59E0B',
                    sparkData: [1, 2, 2, 3, 4, 5],
                    icon: <Clock size={16} />, 
                    grad: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.01) 100%)', 
                    border: 'rgba(245, 158, 11, 0.15)',
                    color: '#F59E0B', 
                    clickAction: () => setActiveTab('orders') 
                  },
                  { 
                    label: "Wallet Balance", 
                    val: "₹8,500", 
                    sub: "Instant Withdraw >", 
                    subColor: '#7C3AED', 
                    sparkColor: '#7C3AED',
                    sparkData: [5000, 6200, 5800, 7100, 8000, 8500],
                    icon: <Wallet size={16} />, 
                    grad: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0.01) 100%)', 
                    border: 'rgba(124, 58, 237, 0.15)',
                    color: '#7C3AED', 
                    clickAction: () => setActiveTab('earnings') 
                  },
                  { 
                    label: "Rider Rating", 
                    val: "4.95", 
                    sub: "Top Tier Partner", 
                    subColor: '#F59E0B', 
                    sparkColor: '#F59E0B',
                    sparkData: [4.8, 4.85, 4.88, 4.9, 4.93, 4.95],
                    icon: <Star size={16} fill="#F59E0B" style={{ color: '#F59E0B' }} />, 
                    grad: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.01) 100%)', 
                    border: 'rgba(245, 158, 11, 0.15)',
                    color: '#F59E0B' 
                  }
                ].map((kpi, idx) => (
                  <div 
                    key={idx} 
                    className="dashboard-premium-card" 
                    style={{ 
                      padding: '14px', 
                      background: bgCard, 
                      border: `1.5px solid ${borderColor}`, 
                      borderRadius: '20px', 
                      display: 'flex', 
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: kpi.clickAction ? 'pointer' : 'default',
                      height: '135px',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                    }}
                    onClick={kpi.clickAction}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.04)';
                      e.currentTarget.style.borderColor = kpi.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.01)';
                      e.currentTarget.style.borderColor = borderColor;
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '8px', 
                          background: kpi.grad, 
                          border: `1.5px solid ${kpi.border}`,
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: kpi.color,
                          flexShrink: 0
                        }}
                      >
                        {kpi.icon}
                      </div>
                      
                      {/* Mini Sparkline Visualization */}
                      <div style={{ width: '55px', height: '24px' }}>
                        <svg width="100%" height="100%" viewBox="0 0 50 20">
                          <polyline
                            fill="none"
                            stroke={kpi.sparkColor}
                            strokeWidth="2"
                            points={kpi.sparkData.map((val, sIdx) => {
                              const min = Math.min(...kpi.sparkData);
                              const max = Math.max(...kpi.sparkData);
                              const range = max - min || 1;
                              const x = (sIdx / (kpi.sparkData.length - 1)) * 50;
                              const y = 18 - ((val - min) / range) * 16;
                              return `${x},${y}`;
                            }).join(' ')}
                          />
                        </svg>
                      </div>
                    </div>

                    <div style={{ textAlign: 'left', marginTop: '10px' }}>
                      <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block', fontWeight: 'bold' }}>{kpi.label}</span>
                      <strong style={{ fontSize: '18px', color: colorTextPrimary, display: 'block', margin: '2px 0' }}>{kpi.val}</strong>
                      <span style={{ fontSize: '10px', color: kpi.subColor, fontWeight: 'bold' }}>{kpi.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: Today's Optimized Route */}
              <div className="dashboard-row-two-grid">
                {/* Col 2.1: Today's Route Overview */}
                <div 
                  className="dashboard-premium-card" 
                  style={{ 
                    padding: '20px', 
                    background: bgCard, 
                    border: `1.5px solid ${borderColor}`, 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '480px',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 className="dashboard-card-title" style={{ margin: 0, color: colorTextPrimary }}>Today's Optimized Route</h4>
                    <span style={{ fontSize: '11px', color: '#FF2E83', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveTab('navigation')}>
                      Full Map
                    </span>
                  </div>

                  {/* Leaflet Map Container */}
                  <div style={{ flex: 1, minHeight: '270px', borderRadius: '14px', overflow: 'hidden', border: `1.5px solid ${borderColor}`, position: 'relative', margin: '10px 0' }}>
                    <div ref={homeMapRef} style={{ width: '100%', height: '100%', filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none', zIndex: 1 }} />
                  </div>

                  {/* Bottom Stats & Optimization Action Button */}
                  <div style={{ borderTop: `1.5px solid ${borderColor}`, paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED', flexShrink: 0 }}>
                          <Compass size={14} />
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '9px', color: colorTextMuted, fontWeight: 'bold' }}>DISTANCE</span>
                          <strong style={{ fontSize: '11px', color: colorTextPrimary }}>48.6 KM</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', flexShrink: 0 }}>
                          <Target size={14} />
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '9px', color: colorTextMuted, fontWeight: 'bold' }}>EST TIME</span>
                          <strong style={{ fontSize: '11px', color: colorTextPrimary }}>2h 45m</strong>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: colorTextSecondary }}>
                      <span>Fuel Est: <strong>1.5L</strong></span>
                      <span>Traffic: <strong style={{ color: '#F59E0B' }}>Moderate</strong></span>
                    </div>
                  </div>
                </div>

                {/* Col 2.2: Active Delivery Details */}
                <div 
                  className="dashboard-premium-card" 
                  style={{ 
                    padding: '20px', 
                    background: bgCard, 
                    border: `1.5px solid ${borderColor}`, 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '480px',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4 className="dashboard-card-title" style={{ margin: 0, color: colorTextPrimary }}>Active Delivery</h4>
                      <span style={{ fontSize: '11px', background: 'rgba(255, 46, 131, 0.1)', color: '#FF2E83', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                        {activeOrder.id}
                      </span>
                    </div>

                    {/* Delivery Address & Customer details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: colorTextMuted }}>Deliver To</span>
                        <strong style={{ color: colorTextPrimary }}>{activeOrder.deliverTo}</strong>
                      </div>
                      <p style={{ margin: 0, fontSize: '11px', color: colorTextSecondary, lineHeight: '1.4', background: isDark ? 'rgba(255,255,255,0.02)' : '#F8FAFC', padding: '8px', borderRadius: '10px', border: `1px solid ${borderColor}` }}>
                        {activeOrder.deliveryAddress}
                      </p>
                    </div>

                    {/* Timeline Tracker */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                      <span style={{ fontSize: '9px', color: colorTextMuted, fontWeight: 'bold', textTransform: 'uppercase' }}>Delivery Timeline</span>
                      <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
                        <div style={{ width: '2px', background: borderColor, position: 'absolute', top: '10px', bottom: '10px', left: '7px', zIndex: 1 }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2, width: '100%' }}>
                          {[
                            { title: 'Package Picked Up', desc: 'At Vogue Craft Tailors', done: true },
                            { title: 'Out for Delivery', desc: 'ETA: 20 mins', active: true }
                          ].map((step, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                              <span style={{ 
                                width: '16px', 
                                height: '16px', 
                                borderRadius: '50%', 
                                background: step.done ? '#22C55E' : step.active ? '#FF2E83' : '#6B7280',
                                border: '3px solid ' + bgCard,
                                display: 'inline-block',
                                flexShrink: 0
                              }} />
                              <div>
                                <strong style={{ fontSize: '11px', color: step.active ? '#FF2E83' : colorTextPrimary, display: 'block' }}>{step.title}</strong>
                                <span style={{ fontSize: '9px', color: colorTextSecondary }}>{step.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                      <button 
                        className="btn" 
                        onClick={() => alert(`Starting Live Navigation via Google Maps...`)}
                        style={{ fontSize: '11px', padding: '8px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', background: '#7C3AED', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
                      >
                        <Navigation size={12} /> Map
                      </button>
                      <button 
                        className="btn" 
                        onClick={() => alert(`Calling customer: ${activeOrder.deliveryPhone}`)}
                        style={{ fontSize: '11px', padding: '8px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', background: bgCard, color: colorTextPrimary, border: `1.5px solid ${borderColor}`, borderRadius: '10px', cursor: 'pointer' }}
                      >
                        <Phone size={12} /> Call
                      </button>
                      <button 
                        className="btn" 
                        onClick={() => { setActiveTab('support'); setSupportContact('customer'); }}
                        style={{ fontSize: '11px', padding: '8px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', background: bgCard, color: colorTextPrimary, border: `1.5px solid ${borderColor}`, borderRadius: '10px', cursor: 'pointer' }}
                      >
                        <MessageSquare size={12} /> Chat
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        onClick={() => alert("Verification OTP screen loading...")}
                        className="btn" 
                        style={{ flex: 1, fontSize: '11px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', background: '#22C55E', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
                      >
                        <CheckCircle size={12} /> Complete Delivery
                      </button>
                    </div>
                  </div>
                </div>

                {/* Col 2.3: Today's Delivery Schedule */}
                <div 
                  className="dashboard-premium-card" 
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '480px',
                    padding: '20px',
                    background: bgCard,
                    border: `1.5px solid ${borderColor}`,
                    borderRadius: '20px',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 className="dashboard-card-title" style={{ margin: 0, color: colorTextPrimary }}>Today's Delivery Schedule</h4>
                      <span style={{ fontSize: '11px', color: '#FF2E83', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setActiveTab('orders'); setOrdersSubTab('active'); }}>
                        View All
                      </span>
                    </div>

                    {/* Scheduled stops list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px' }}>
                      {[
                        { time: '09:00 AM', type: 'Pickup', store: 'Vogue Craft Tailors', tag: 'Now', num: 1, active: true },
                        { time: '10:00 AM', type: 'Delivery', store: 'Priya Sharma', tag: '3.4 km', num: 2 },
                        { time: '11:30 AM', type: 'Pickup', store: 'Elite Threads', tag: '6.2 km', num: 3 },
                        { time: '01:15 PM', type: 'Delivery', store: 'Amit Verma', tag: '8.1 km', num: 4 },
                        { time: '02:45 PM', type: 'Delivery', store: 'Sneha Iyer', tag: '5.4 km', num: 5 }
                      ].map((step, sIdx) => (
                        <div 
                          key={sIdx} 
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            padding: '6px 8px',
                            background: step.active ? 'rgba(255, 46, 131, 0.08)' : 'transparent',
                            borderRadius: '10px',
                            border: step.active ? '1.5px solid rgba(255, 46, 131, 0.15)' : '1.5px solid transparent'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, textAlign: 'left' }}>
                            <span style={{ color: colorTextMuted, width: '52px', fontSize: '9px', fontWeight: 'bold', flexShrink: 0 }}>{step.time}</span>
                            <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: step.active ? '#FF2E83' : '#7C3AED', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold', flexShrink: 0 }}>
                              {step.num}
                            </span>
                            <div style={{ minWidth: 0 }}>
                              <strong style={{ display: 'block', color: colorTextPrimary, fontSize: '11px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{step.type}</strong>
                              <span style={{ color: colorTextSecondary, fontSize: '10px', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{step.store}</span>
                            </div>
                          </div>
                          <span style={{ 
                            fontSize: '9px', 
                            background: step.active ? '#FF2E83' : 'rgba(15, 23, 42, 0.04)', 
                            color: step.active ? '#fff' : colorTextMuted, 
                            padding: '2px 6px', 
                            borderRadius: '6px', 
                            fontWeight: 'bold',
                            flexShrink: 0
                          }}>
                            {step.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom stats and optimize button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1.5px solid ${borderColor}`, paddingTop: '10px' }}>
                    <span style={{ fontSize: '12px', color: colorTextMuted }}>Total <strong>7 Stops</strong></span>
                    <button 
                      className="btn btn-ghost" 
                      style={{ fontSize: '11px', color: '#FF2E83', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
                      onClick={() => alert("Route schedule optimized!")}
                    >
                      <Compass size={12} style={{ color: '#FF2E83' }} /> Optimize Route
                    </button>
                  </div>
                </div>
              </div>

          {/* Row 3: Today's Performance / Earnings Chart / Notifications Grid */}
              <div className="dashboard-row-three-grid">
                {/* Col 3.1: Today's Performance Card */}
                <div 
                  className="dashboard-premium-card" 
                  style={{ 
                    padding: '20px', 
                    background: bgCard, 
                    border: `1.5px solid ${borderColor}`, 
                    borderRadius: '20px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '240px',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="dashboard-card-title" style={{ margin: 0, color: colorTextPrimary }}>Today's Performance</h4>
                    <span style={{ fontSize: '11px', color: '#FF2E83', cursor: 'pointer', fontWeight: '800' }} onClick={() => setActiveTab('profile')}>
                      View Report
                    </span>
                  </div>

                  {/* Performance stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '12px', flex: 1, alignItems: 'center' }}>
                    {[
                      { label: 'Acceptance', val: '98%', icon: <Target size={16} />, color: '#22C55E', bg: 'rgba(34, 197, 148, 0.08)' },
                      { label: 'On-Time', val: '96%', icon: <Clock size={16} />, color: '#FF2E83', bg: 'rgba(255, 46, 131, 0.08)' },
                      { label: 'Completion', val: '92%', icon: <Shield size={16} />, color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.08)' },
                      { label: 'Rating', val: '4.95', icon: <Star size={16} fill="#F59E0B" style={{ color: '#F59E0B' }} />, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.08)' }
                    ].map((perf, pIdx) => (
                      <div key={pIdx} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div 
                          style={{ 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '10px', 
                            background: perf.bg, 
                            color: perf.color, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            marginBottom: '6px'
                          }}
                        >
                          {perf.icon}
                        </div>
                        <span style={{ fontSize: '9px', color: colorTextMuted, display: 'block', fontWeight: 'bold', marginBottom: '2px', height: '24px', lineHeight: '1.2' }}>{perf.label}</span>
                        <strong style={{ fontSize: '14px', color: colorTextPrimary, display: 'block', fontWeight: '800' }}>{perf.val}</strong>
                        <div style={{ width: '35px', height: '3px', background: perf.color, borderRadius: '1.5px', marginTop: '6px' }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Col 3.2: Earnings Summary (AreaChart Chart) */}
                <div 
                  className="dashboard-premium-card" 
                  style={{ 
                    padding: '20px', 
                    background: bgCard, 
                    border: `1.5px solid ${borderColor}`, 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '240px',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 className="dashboard-card-title" style={{ margin: 0, color: colorTextPrimary }}>Weekly Earnings</h4>
                    <span style={{ fontSize: '11px', color: '#22C55E', fontWeight: 'bold' }}>
                      Total: ₹11,250
                    </span>
                  </div>

                  <div style={{ flex: 1, minHeight: '130px', position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { name: 'Mon', earnings: 1200 },
                          { name: 'Tue', earnings: 1800 },
                          { name: 'Wed', earnings: 1400 },
                          { name: 'Thu', earnings: 2100 },
                          { name: 'Fri', earnings: 1600 },
                          { name: 'Sat', earnings: 2500 },
                          { name: 'Sun', earnings: 1820 }
                        ]}
                        margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF2E83" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#FF2E83" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={borderColor} />
                        <XAxis dataKey="name" tick={{ fontSize: 9, fill: colorTextMuted }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 9, fill: colorTextMuted }} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ 
                            background: bgCard, 
                            border: `1.5px solid ${borderColor}`,
                            borderRadius: '8px',
                            fontSize: '11px',
                            color: colorTextPrimary
                          }}
                        />
                        <Area type="monotone" dataKey="earnings" stroke="#FF2E83" strokeWidth={2} fillOpacity={1} fill="url(#earningsGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Col 3.3: Recent Notifications */}
                <div 
                  className="dashboard-premium-card" 
                  style={{ 
                    padding: '20px', 
                    background: bgCard, 
                    border: `1.5px solid ${borderColor}`, 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '240px',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 className="dashboard-card-title" style={{ margin: 0, color: colorTextPrimary }}>Recent Notifications</h4>
                    <span style={{ fontSize: '11px', color: '#FF2E83', cursor: 'pointer', fontWeight: '800' }} onClick={() => setActiveTab('profile')}>
                      View All
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', flex: 1, justifyContent: 'center' }}>
                    {[
                      { label: 'New Order Assigned', desc: '#SB-1025 assigned to you.', time: '2m ago', color: '#FF2E83', bg: 'rgba(255, 46, 131, 0.06)', icon: <ShoppingBag size={12} /> },
                      { label: 'Customer Called', desc: 'Priya Sharma tried to call.', time: '10m ago', color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.06)', icon: <Phone size={12} /> },
                      { label: 'Incentive Earned', desc: 'You earned ₹50 incentive.', time: '1h ago', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.06)', icon: <Gift size={12} /> }
                    ].map((notif, nIdx) => (
                      <div key={nIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: notif.bg, color: notif.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {notif.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <strong style={{ fontSize: '11px', color: colorTextPrimary, fontWeight: '700' }}>{notif.label}</strong>
                            <span style={{ fontSize: '8px', color: colorTextMuted, flexShrink: 0 }}>{notif.time}</span>
                          </div>
                          <span style={{ fontSize: '10px', color: colorTextSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                            {notif.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Quick Actions Bar */}
              <div 
                className="dashboard-premium-card" 
                style={{ 
                  padding: '20px', 
                  background: bgCard, 
                  border: `1.5px solid ${borderColor}`, 
                  borderRadius: '20px',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <h4 className="dashboard-card-title" style={{ margin: '0 0 16px 0', color: colorTextPrimary }}>Quick Actions</h4>
                <div className="dashboard-quick-actions-grid">
                  {[
                    { label: 'Scan Package', color: '#FF2E83', bg: 'rgba(255, 46, 131, 0.06)', icon: <Scan size={16} /> },
                    { label: 'Upload Proof', color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.06)', icon: <Camera size={16} /> },
                    { label: 'Emergency', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.06)', icon: <AlertTriangle size={16} /> },
                    { label: 'Earnings Details', color: '#22C55E', bg: 'rgba(34, 197, 148, 0.06)', icon: <Wallet size={16} /> },
                    { label: 'Support Chat', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.06)', icon: <Headphones size={16} /> },
                    { label: 'Refer & Earn', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.06)', icon: <UserPlus size={16} /> }
                  ].map((act, aIdx) => (
                    <button 
                      key={aIdx}
                      className="btn quick-action-btn"
                      onClick={() => {
                        if (act.label === 'Support Chat') setActiveTab('support');
                        else if (act.label === 'Earnings Details') setActiveTab('earnings');
                        else alert(`Dispatched quick action: ${act.label}`);
                      }}
                      style={{ 
                        border: `1.5px solid ${borderColor}`,
                        color: act.color,
                        background: bgCard,
                        fontSize: '12px',
                        fontWeight: '800',
                        padding: '12px 10px',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = act.bg;
                        e.currentTarget.style.borderColor = act.color;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = bgCard;
                        e.currentTarget.style.borderColor = borderColor;
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      {act.icon}
                      <span>{act.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

        {/* MODULE 2: ORDERS LIST */}
        {activeTab === 'orders' && (() => {
          // Filter orders dynamically based on selected sub-tab and search query
          const filteredOrders = ordersList.filter(order => {
            const matchesTab = order.status === ordersSubTab;
            const query = orderSearchText.toLowerCase().trim();
            const matchesSearch = !query ? true : (
              order.id.toLowerCase().includes(query) ||
              order.deliverTo.toLowerCase().includes(query) ||
              order.pickup.toLowerCase().includes(query)
            );
            return matchesTab && matchesSearch;
          });

          const orderKpis = [
            { 
              label: "Today's Orders", 
              val: "12", 
              sub: "+2 vs yesterday", 
              subColor: '#10b981', 
              color: '#7209b7', 
              bg: 'rgba(114,9,183,0.06)', 
              icon: <FileText size={15} /> 
            },
            { 
              label: "Completed", 
              val: "8", 
              sub: "66%", 
              subColor: colorTextMuted, 
              color: '#10b981', 
              bg: 'rgba(16,185,129,0.06)', 
              icon: <CheckCircle size={15} /> 
            },
            { 
              label: "Pending", 
              val: "4", 
              sub: "34%", 
              subColor: colorTextMuted, 
              color: '#f97316', 
              bg: 'rgba(249,115,22,0.06)', 
              icon: <FileText size={15} /> 
            },
            { 
              label: "Today's Earnings", 
              val: "₹1,450", 
              sub: "+₹230 vs yesterday", 
              subColor: '#10b981', 
              color: '#3b82f6', 
              bg: 'rgba(59,130,246,0.06)', 
              icon: <Wallet size={15} /> 
            },
            { 
              label: "Average Delivery Time", 
              val: "18 mins", 
              sub: "+2 mins", 
              subColor: '#f72585', 
              color: '#f72585', 
              bg: 'rgba(247,37,133,0.06)', 
              icon: <Clock size={15} /> 
            },
            { 
              label: "Acceptance Rate", 
              val: "98%", 
              sub: "Excellent", 
              subColor: '#10b981', 
              color: '#10b981', 
              bg: 'rgba(16,185,129,0.06)', 
              icon: <TrendingUp size={15} /> 
            },
            { 
              label: "Rider Rating", 
              val: "4.9", 
              sub: "Top Tier Rider", 
              subColor: colorTextMuted, 
              color: '#fbbf24', 
              bg: 'rgba(251,191,36,0.06)', 
              icon: <Star size={15} /> 
            }
          ];

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* TOP SECTION: Unified 7 KPI Cards Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }} className="order-kpi-grid">
                {orderKpis.map((kpi, idx) => (
                  <div 
                    key={idx} 
                    className="kpi-card-flat" 
                    style={{ 
                      padding: '18px 12px', 
                      background: bgCard, 
                      border: `1px solid ${borderColor}`, 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      boxShadow: 'none'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: kpi.bg,
                      color: kpi.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {kpi.icon}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginLeft: '6px' }}>
                      <span style={{ fontSize: '0.62rem', color: colorTextMuted, fontWeight: '700', whiteSpace: 'nowrap' }}>{kpi.label}</span>
                      <strong style={{ fontSize: '1.05rem', color: colorTextPrimary, fontWeight: '800', lineHeight: '1.1' }}>{kpi.val}</strong>
                      <span style={{ fontSize: '0.58rem', color: kpi.subColor, fontWeight: 'bold', whiteSpace: 'nowrap' }}>{kpi.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* MIDDLE SECTION: Filters & Search bar row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }} className="order-filters-row">
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {[
                    { id: 'active', label: 'Active Tasks', count: ordersList.filter(o => o.status === 'active').length },
                    { id: 'upcoming', label: 'Upcoming Queued', count: ordersList.filter(o => o.status === 'upcoming').length },
                    { id: 'completed', label: 'Completed', count: ordersList.filter(o => o.status === 'completed').length },
                    { id: 'cancelled', label: 'Cancelled', count: ordersList.filter(o => o.status === 'cancelled').length },
                    { id: 'returned', label: 'Returned', count: ordersList.filter(o => o.status === 'returned').length }
                  ].map(tab => {
                    const isTabActive = ordersSubTab === tab.id;
                    return (
                      <div
                        key={tab.id}
                        role="button"
                        onClick={() => setOrdersSubTab(tab.id)}
                        style={{
                          padding: '6px 12px',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          borderRadius: '12px',
                          border: isTabActive ? '1.5px solid #f72585' : `1px solid ${borderColor}`,
                          background: isTabActive ? (isDark ? 'rgba(247,37,133,0.08)' : '#ffffff') : (isDark ? 'rgba(255,255,255,0.02)' : '#ffffff'),
                          color: isTabActive ? '#f72585' : colorTextSecondary,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {tab.label}
                        <span style={{ 
                          marginLeft: '6px', 
                          background: isTabActive ? '#f72585' : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(247,37,133,0.06)'), 
                          color: isTabActive ? '#ffffff' : (isDark ? colorTextSecondary : '#f72585'),
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.62rem',
                          fontWeight: 'bold'
                        }}>
                          {tab.count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      placeholder="Search by Order ID / Customer" 
                      value={orderSearchText}
                      onChange={(e) => setOrderSearchText(e.target.value)}
                      style={{
                        padding: '6px 10px 6px 26px',
                        fontSize: '0.72rem',
                        borderRadius: '8px',
                        border: `1px solid ${borderColor}`,
                        background: bgCard,
                        color: colorTextPrimary,
                        width: '210px'
                      }}
                    />
                    <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: colorTextMuted, fontSize: '10px' }}>🔍</span>
                  </div>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setOrderSearchText('');
                      alert("Filters reset!");
                    }}
                    style={{ fontSize: '0.7rem', padding: '6px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>⚙️</span> Filter
                  </button>
                </div>
              </div>

              {/* BOTTOM SECTION: Two-column grid workspace */}
              <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '24px', height: 'calc(100vh - 250px)' }} className="orders-workspace-layout">
                
                {/* Left Column: List of Category Orders */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto', paddingRight: '4px' }}>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, oIdx) => {
                      const isSelected = selectedOrder && selectedOrder.id === order.id;
                      const getCleanAddr = (addrStr) => {
                        if (!addrStr) return '';
                        const parts = addrStr.split(',');
                        if (parts.length >= 4) {
                          const blrIdx = parts.findIndex(p => p.toLowerCase().includes('bengaluru'));
                          if (blrIdx > 0) {
                            return `${parts[blrIdx - 1].trim()}, Bengaluru`;
                          }
                          return `${parts[parts.length - 3].trim()}, ${parts[parts.length - 2].trim()}`;
                        }
                        return addrStr;
                      };
                      return (
                        <div 
                          key={oIdx}
                          onClick={() => setSelectedOrder(order)}
                          className="kpi-card-flat"
                          style={{
                            padding: '16px 20px',
                            height: '260px',
                            boxSizing: 'border-box',
                            background: bgCard,
                            border: isSelected ? '2px solid #FF2E83' : `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`,
                            borderRadius: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                            justifyContent: 'space-between',
                            boxShadow: isSelected ? '0 8px 24px rgba(255, 46, 131, 0.08)' : '0 4px 12px rgba(0,0,0,0.01)'
                          }}
                        >
                          {/* Order ID & Status Badge */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '18px', color: isSelected ? '#FF2E83' : colorTextPrimary, fontWeight: '700' }}>{order.id}</strong>
                            <span style={{ 
                              fontSize: '12px', 
                              background: order.taskStatus === 'Ready' ? '#EAFBF3' : (order.taskStatus === 'In Progress' ? 'rgba(255,159,67,0.1)' : 'rgba(122,62,240,0.1)'), 
                              color: order.taskStatus === 'Ready' ? '#22C55E' : (order.taskStatus === 'In Progress' ? '#FF9F43' : '#7A3EF0'),
                              padding: '4px 12px', 
                              borderRadius: '8px', 
                              fontWeight: '700' 
                            }}>
                              {order.taskStatus}
                            </span>
                          </div>

                          {/* Middle Row: Left timeline, Right stats */}
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                            
                            {/* Left Side: Custom Timeline */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, position: 'relative', minWidth: 0 }}>
                              
                              {/* Pickup row */}
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <div style={{ 
                                  width: '32px', 
                                  height: '32px', 
                                  borderRadius: '50%', 
                                  background: 'rgba(122,62,240,0.06)', 
                                  color: '#7A3EF0', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  flexShrink: 0 
                                }}>
                                  <ShoppingBag size={14} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                  <span style={{ fontSize: '10px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase' }}>Pickup</span>
                                  <strong style={{ fontSize: '14px', color: colorTextPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600' }}>{order.pickup}</strong>
                                  <span style={{ fontSize: '12px', color: colorTextSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getCleanAddr(order.pickupAddress)}</span>
                                </div>
                              </div>

                              {/* Down Arrow separator */}
                              <div style={{ paddingLeft: '10px', margin: '-6px 0', color: colorTextMuted, display: 'flex', alignItems: 'center', height: '12px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>↓</span>
                              </div>

                              {/* Delivery row */}
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <div style={{ 
                                  width: '32px', 
                                  height: '32px', 
                                  borderRadius: '50%', 
                                  background: 'rgba(255,46,131,0.06)', 
                                  color: '#FF2E83', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  flexShrink: 0 
                                }}>
                                  <User size={14} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                  <span style={{ fontSize: '10px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase' }}>Delivery</span>
                                  <strong style={{ fontSize: '14px', color: colorTextPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600' }}>{order.deliverTo}</strong>
                                  <span style={{ fontSize: '12px', color: colorTextSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getCleanAddr(order.deliveryAddress)}</span>
                                </div>
                              </div>

                            </div>

                            {/* Right Side: Metrics block */}
                            <div style={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              gap: '6px', 
                              paddingLeft: '16px', 
                              borderLeft: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`,
                              width: '90px',
                              alignItems: 'flex-end',
                              textAlign: 'right',
                              justifyContent: 'center'
                            }}>
                              <div>
                                <strong style={{ color: '#FF2E83', fontSize: '15px', display: 'block', fontWeight: '700' }}>{order.payout}</strong>
                                <span style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Payout</span>
                              </div>
                              <div style={{ marginTop: '4px' }}>
                                <strong style={{ color: colorTextPrimary, fontSize: '13px', display: 'block', fontWeight: '700' }}>{order.distance}</strong>
                                <span style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Distance</span>
                              </div>
                              <div style={{ marginTop: '4px' }}>
                                <strong style={{ color: colorTextPrimary, fontSize: '13px', display: 'block', fontWeight: '700' }}>{order.estTime}</strong>
                                <span style={{ color: '#6B7280', fontSize: '12px', fontWeight: '600' }}>Est. Time</span>
                              </div>
                            </div>

                          </div>

                          {/* Bottom Bar: Gray Card Fill containing Package Item and Payment details */}
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc',
                            padding: '8px 12px',
                            borderRadius: '10px',
                            fontSize: '13px'
                          }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: colorTextSecondary, fontWeight: '600' }}>
                              📦 {order.item}
                            </span>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <span style={{ 
                                background: order.paymentType === 'COD' ? 'rgba(255,46,131,0.06)' : 'rgba(34,197,94,0.06)', 
                                color: order.paymentType === 'COD' ? '#FF2E83' : '#22C55E', 
                                padding: '2px 8px', 
                                borderRadius: '6px', 
                                fontWeight: '700',
                                fontSize: '11px'
                              }}>
                                {order.paymentType}
                              </span>
                              <div style={{ 
                                background: bgCard, 
                                border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`,
                                padding: '2px 6px',
                                borderRadius: '6px',
                                fontWeight: '700',
                                color: colorTextPrimary,
                                fontSize: '12px'
                              }}>
                                {order.paymentType === 'COD' ? order.orderValue : '₹0'}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: colorTextMuted, fontSize: '14px' }}>
                      No tasks found.
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: '16px', 
                    padding: '14px 20px', 
                    borderRadius: '12px', 
                    background: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', 
                    border: `1px solid ${isDark ? borderColor : '#E9EEF5'}`,
                  }}>
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: isDark ? '#f3f4f6' : '#334155' 
                    }}>
                      Can't find an order?
                    </span>
                    <button 
                      className="btn" 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontSize: '14px', 
                        padding: '0', 
                        color: '#FF2E83', 
                        fontWeight: '700', 
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }} 
                      onClick={() => alert("Refreshed tasks list!")}
                    >
                      <RefreshCw size={15} style={{ color: '#FF2E83' }} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 0 }} className="order-details-right-panel">
                  {selectedOrder ? (
                    <div 
                      className="glass-card-no-hover"
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '24px', 
                        height: '100%',
                        background: bgCard,
                        border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`,
                        borderRadius: '20px',
                        padding: '28px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                        boxSizing: 'border-box'
                      }}
                    >
                      {/* Ready + Order Payout Section */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}` }}>
                        {/* Left side */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#FF2E83' }}>{selectedOrder.id}</h3>
                          <span style={{ 
                            fontSize: '14px', 
                            background: selectedOrder.taskStatus === 'Ready' ? '#EAFBF3' : (selectedOrder.taskStatus === 'In Progress' ? 'rgba(255,159,67,0.1)' : 'rgba(122,62,240,0.1)'), 
                            color: selectedOrder.taskStatus === 'Ready' ? '#22C55E' : (selectedOrder.taskStatus === 'In Progress' ? '#FF9F43' : '#7A3EF0'),
                            padding: '6px 14px', 
                            borderRadius: '8px', 
                            fontWeight: '700' 
                          }}>
                            {selectedOrder.taskStatus}
                          </span>
                        </div>

                        {/* Right side */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '13px', color: '#6B7280', display: 'block', fontWeight: '600' }}>Order Payout</span>
                            <strong style={{ fontSize: '34px', color: '#FF2E83', fontWeight: '800', display: 'block', marginTop: '2px', lineHeight: '1' }}>{selectedOrder.payout}</strong>
                          </div>
                          <button 
                            className="btn" 
                            onClick={() => alert(`Details for ${selectedOrder.id}`)}
                            style={{ 
                              height: '44px',
                              padding: '0 20px', 
                              borderRadius: '22px', 
                              border: `1.5px solid #FF2E83`,
                              background: 'transparent',
                              color: '#FF2E83',
                              fontSize: '14px',
                              fontWeight: '700',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 46, 131, 0.05)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                          >
                            Order Details
                          </button>
                        </div>
                      </div>

                      {/* Delivery Progress timeline stepper */}
                      <div style={{ padding: '0', position: 'relative', margin: '4px 0', maxWidth: '380px' }}>
                        {/* Connecting line */}
                        <div style={{
                          position: 'absolute',
                          left: '40px',
                          right: '40px',
                          top: '10px', // centered vertically to the 20px circles
                          height: '3px',
                          background: isDark ? 'rgba(255,255,255,0.08)' : '#E9EEF5',
                          zIndex: 0
                        }}>
                          {/* Progress Fill */}
                          <div style={{
                            width: selectedOrder.taskStatus === 'Delivered' ? '100%' : (selectedOrder.taskStatus === 'Ready' ? '33%' : (selectedOrder.taskStatus === 'In Progress' ? '66%' : '0%')),
                            height: '100%',
                            background: '#FF2E83',
                            transition: 'width 0.4s'
                          }}></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 1, position: 'relative' }}>
                          {[
                            { label: 'Assigned', active: true },
                            { label: 'Reached Tailor', active: selectedOrder.taskStatus === 'In Progress' || selectedOrder.taskStatus === 'Ready' || selectedOrder.taskStatus === 'Delivered' },
                            { label: 'Picked Up', active: selectedOrder.taskStatus === 'Ready' || selectedOrder.taskStatus === 'Delivered' },
                            { label: 'Delivered', active: selectedOrder.taskStatus === 'Delivered' }
                          ].map((step, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px', textAlign: 'center' }}>
                              <div style={{ 
                                width: '20px', 
                                height: '20px', 
                                borderRadius: '50%', 
                                background: step.active ? '#FF2E83' : (isDark ? '#2e2e4e' : '#E9EEF5'), 
                                color: '#ffffff',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: '700',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                border: step.active ? 'none' : `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`
                              }}>
                                {step.active ? '✓' : '•'}
                              </div>
                              <span style={{ fontSize: '11px', color: step.active ? colorTextPrimary : '#6B7280', fontWeight: '600', marginTop: '6px' }}>{step.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <hr style={{ border: 'none', borderTop: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, margin: '4px 0 0 0' }} />

                      {/* Main workspace details content: Left Details / Right Map split */}
                      <div className="order-details-split-container">
                        
                        {/* LEFT COLUMN: Details Cards Grid */}
                        <div className="order-details-left-col">
                          
                          {/* Row 1: Pickup Details & Delivery Details */}
                          <div className="order-details-row1-grid">
                            {/* Pickup Details */}
                            <div 
                              className="glass-card-no-hover" 
                              style={{ 
                                padding: '24px', 
                                background: bgCard, 
                                border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, 
                                borderRadius: '16px',
                                height: '230px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                              }}
                            >
                              <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(122, 62, 240, 0.08)', color: '#7A3EF0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>🏪</div>
                                    <strong style={{ fontSize: '18px', fontWeight: '600', color: colorTextPrimary }}>Pickup Details</strong>
                                  </div>
                                  <button 
                                    className="btn" 
                                    onClick={() => alert(`Calling Tailor: ${selectedOrder.pickupPhone}`)}
                                    style={{ 
                                      height: '32px',
                                      padding: '0 16px', 
                                      borderRadius: '16px', 
                                      border: '1.5px solid #7A3EF0',
                                      background: 'transparent',
                                      color: '#7A3EF0',
                                      fontSize: '13px',
                                      fontWeight: '700',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    📞 Call
                                  </button>
                                </div>
                                <h5 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: colorTextPrimary }}>{selectedOrder.pickup}</h5>
                                <span style={{ fontSize: '13px', color: colorTextSecondary, display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                                  {selectedOrder.pickupContactName} • {selectedOrder.pickupPhone}
                                </span>
                                <p style={{ margin: 0, fontSize: '14px', color: colorTextMuted, lineHeight: '1.4' }}>{selectedOrder.pickupAddress}</p>
                              </div>
                              <span style={{ fontSize: '13px', color: '#22C55E', fontWeight: '700', display: 'block', marginTop: '8px' }}>⏰ Open till {selectedOrder.pickupTime || '9:00 PM'}</span>
                            </div>

                            {/* Delivery Details */}
                            <div 
                              className="glass-card-no-hover" 
                              style={{ 
                                padding: '24px', 
                                background: bgCard, 
                                border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, 
                                borderRadius: '16px',
                                height: '230px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                              }}
                            >
                              <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255, 46, 131, 0.08)', color: '#FF2E83', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>🏠</div>
                                    <strong style={{ fontSize: '18px', fontWeight: '600', color: colorTextPrimary }}>Delivery Details</strong>
                                  </div>
                                  <button 
                                    className="btn" 
                                    onClick={() => alert(`Calling Customer: ${selectedOrder.deliveryPhone}`)}
                                    style={{ 
                                      height: '32px',
                                      padding: '0 16px', 
                                      borderRadius: '16px', 
                                      border: '1.5px solid #FF2E83',
                                      background: 'transparent',
                                      color: '#FF2E83',
                                      fontSize: '13px',
                                      fontWeight: '700',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    📞 Call
                                  </button>
                                </div>
                                <h5 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: colorTextPrimary }}>{selectedOrder.deliverTo}</h5>
                                <span style={{ fontSize: '13px', color: colorTextSecondary, display: 'block', fontWeight: '500', marginBottom: '8px' }}>
                                  {selectedOrder.deliveryPhone}
                                </span>
                                <p style={{ margin: 0, fontSize: '14px', color: colorTextMuted, lineHeight: '1.4' }}>{selectedOrder.deliveryAddress}</p>
                              </div>
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,46,131,0.04)', padding: '6px 12px', borderRadius: '8px', border: '1px dashed rgba(255,46,131,0.15)', marginTop: '8px' }}>
                                <span style={{ fontSize: '13px', color: '#FF2E83', fontWeight: '700' }}>🔑 OTP Required</span>
                                <strong style={{ fontSize: '15px', color: '#FF2E83', letterSpacing: '1px' }}>{selectedOrder.deliveryOtp}</strong>
                              </div>
                            </div>
                          </div>

                          {/* Row 2: Package Details, Customer Note, Payment Details */}
                          <div className="order-details-row2-grid">
                            {/* Package Details */}
                            <div 
                              className="glass-card-no-hover" 
                              style={{ 
                                padding: '24px', 
                                background: bgCard, 
                                border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, 
                                borderRadius: '16px',
                                height: '100%',
                                minHeight: '245px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                              }}
                            >
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(122, 62, 240, 0.08)', color: '#7A3EF0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>📦</div>
                                  <strong style={{ fontSize: '18px', fontWeight: '600', color: colorTextPrimary }}>Package Details</strong>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingBottom: '4px' }}>
                                    <span style={{ color: '#6B7280' }}>Item</span>
                                    <strong style={{ color: colorTextPrimary }}>{selectedOrder.item}</strong>
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingBottom: '4px' }}>
                                    <span style={{ color: '#6B7280' }}>Weight</span>
                                    <strong style={{ color: colorTextPrimary }}>{selectedOrder.weight}</strong>
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                                    <span style={{ color: '#6B7280' }}>Fragile</span>
                                    <span style={{ background: selectedOrder.fragile === 'Yes' ? 'rgba(255,46,131,0.06)' : 'rgba(34,197,94,0.06)', color: selectedOrder.fragile === 'Yes' ? '#FF2E83' : '#22C55E', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '12px' }}>
                                      {selectedOrder.fragile}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div style={{ background: 'rgba(122,62,240,0.04)', padding: '6px 12px', borderRadius: '8px', border: '1px dashed rgba(122,62,240,0.15)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>🛡️</span>
                                <span style={{ fontSize: '12px', color: '#7A3EF0', fontWeight: '700' }}>{selectedOrder.handleNote}</span>
                              </div>
                            </div>

                            {/* Customer Notes */}
                            <div 
                              className="glass-card-no-hover" 
                              style={{ 
                                padding: '24px', 
                                background: bgCard, 
                                border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, 
                                borderRadius: '16px',
                                height: '100%',
                                minHeight: '245px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,159,67,0.08)', color: '#FF9F43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>📝</div>
                                <strong style={{ fontSize: '18px', fontWeight: '600', color: colorTextPrimary }}>Customer Note</strong>
                              </div>
                              <p style={{ margin: 0, fontSize: '15px', color: colorTextSecondary, lineHeight: '1.6', fontStyle: 'italic', flex: 1 }}>
                                "{selectedOrder.customerNote}"
                              </p>
                            </div>

                            {/* Payment Details */}
                            <div 
                              className="glass-card-no-hover" 
                              style={{ 
                                padding: '24px', 
                                background: bgCard, 
                                border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, 
                                borderRadius: '16px',
                                height: '100%',
                                minHeight: '245px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                              }}
                            >
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.08)', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>💵</div>
                                  <strong style={{ fontSize: '18px', fontWeight: '600', color: colorTextPrimary }}>Payment Details</strong>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#6B7280' }}>Payment Type</span>
                                    <span style={{ 
                                      background: selectedOrder.paymentType === 'Prepaid' ? '#EAFBF3' : 'rgba(255,46,131,0.06)', 
                                      color: selectedOrder.paymentType === 'Prepaid' ? '#22C55E' : '#FF2E83', 
                                      padding: '4px 10px', 
                                      borderRadius: '6px', 
                                      fontWeight: '700', 
                                      fontSize: '13px' 
                                    }}>
                                      {selectedOrder.paymentType}
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingTop: '12px', marginTop: '4px' }}>
                                    <span style={{ color: '#6B7280' }}>Order Value</span>
                                    <strong style={{ color: colorTextPrimary, fontSize: '16px', fontWeight: '700' }}>{selectedOrder.orderValue}</strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* RIGHT COLUMN: Route Overview Map */}
                        <div className="order-details-right-col">
                          <div 
                            className="glass-card-no-hover" 
                            style={{ 
                              padding: '24px', 
                              background: bgCard, 
                              border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, 
                              borderRadius: '16px', 
                              display: 'flex', 
                              flexDirection: 'column', 
                              flex: 1,
                              justifyContent: 'space-between',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <strong style={{ fontSize: '18px', fontWeight: '600', color: colorTextPrimary }}>Route Overview</strong>
                              <span style={{ fontSize: '15px', color: '#FF2E83', fontWeight: '700' }}>{selectedOrder.distance} • {selectedOrder.estTime}</span>
                            </div>

                            {/* Leaflet map container */}
                            <div style={{ flex: 1, minHeight: '360px', height: '360px', borderRadius: '16px', overflow: 'hidden', border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, position: 'relative' }}>
                              <div ref={orderMapRef} style={{ width: '100%', height: '100%', filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none', zIndex: 1 }} />
                              <button 
                                onClick={() => {
                                  try {
                                    const pickup = selectedOrder.pickupCoords || [12.9592, 77.6974];
                                    const deliver = selectedOrder.deliveryCoords || [12.9660, 77.7320];
                                    const L = window.L;
                                    if (orderMapInstance.current && L) {
                                      orderMapInstance.current.fitBounds(L.latLngBounds([pickup, deliver]), { padding: [24, 24] });
                                    }
                                  } catch (e) {
                                    console.error("Map fitBounds failed", e);
                                  }
                                }}
                                style={{
                                  position: 'absolute',
                                  bottom: '12px',
                                  right: '12px',
                                  background: 'rgba(255,255,255,0.95)',
                                  border: 'none',
                                  borderRadius: '8px',
                                  padding: '8px 12px',
                                  fontSize: '13px',
                                  fontWeight: '700',
                                  cursor: 'pointer',
                                  zIndex: 10,
                                  color: '#1E293B',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                📍 Live Location
                              </button>
                            </div>

                            {/* Map specs footer */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', borderTop: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingTop: '16px', marginTop: '16px' }}>
                              <div>
                                <span style={{ color: '#6B7280', display: 'block', fontSize: '13px', fontWeight: '600' }}>Distance</span>
                                <strong style={{ color: colorTextPrimary, fontSize: '15px', fontWeight: '700', marginTop: '4px', display: 'block' }}>{selectedOrder.distance}</strong>
                              </div>
                              <div style={{ borderLeft: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingLeft: '12px' }}>
                                <span style={{ color: '#6B7280', display: 'block', fontSize: '13px', fontWeight: '600' }}>ETA</span>
                                <strong style={{ color: colorTextPrimary, fontSize: '15px', fontWeight: '700', marginTop: '4px', display: 'block' }}>{selectedOrder.estTime}</strong>
                              </div>
                              <div style={{ borderLeft: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingLeft: '12px' }}>
                                <span style={{ color: '#6B7280', display: 'block', fontSize: '13px', fontWeight: '600' }}>Traffic</span>
                                <strong style={{ color: selectedOrder.traffic === 'Light' ? '#22C55E' : (selectedOrder.traffic === 'Moderate' ? '#FF9F43' : '#FF2E83'), fontSize: '15px', fontWeight: '700', marginTop: '4px', display: 'block' }}>
                                  ● {selectedOrder.traffic}
                                </strong>
                              </div>
                              <div style={{ borderLeft: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingLeft: '12px' }}>
                                <span style={{ color: '#6B7280', display: 'block', fontSize: '13px', fontWeight: '600' }}>Best Route</span>
                                <strong style={{ color: colorTextPrimary, fontSize: '15px', fontWeight: '700', marginTop: '4px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedOrder.bestRoute}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 5: Bottom action footer bar */}
                      <div style={{ display: 'flex', gap: '16px', borderTop: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingTop: '20px', marginTop: '20px' }} className="order-details-actions">
                        <button 
                          className="btn-text-white-force"
                          onClick={() => setActiveTab('navigation')}
                          style={{ 
                            flex: 1, 
                            height: '46px',
                            borderRadius: '10px', 
                            fontSize: '14px', 
                            fontWeight: '700', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '8px', 
                            background: '#7A3EF0',
                            color: '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(122, 62, 240, 0.2)'
                          }}
                        >
                          <Navigation size={18} style={{ transform: 'rotate(45deg)' }} /> Navigate
                        </button>

                        <button 
                          className="btn-text-white-force"
                          onClick={() => alert(`Calling customer: ${selectedOrder.deliveryPhone}`)}
                          style={{ 
                            flex: 1, 
                            height: '46px',
                            borderRadius: '10px', 
                            fontSize: '14px', 
                            fontWeight: '700', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '8px', 
                            background: '#FF2E83',
                            color: '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(255, 46, 131, 0.2)'
                          }}
                        >
                          <Phone size={18} /> Call Customer
                        </button>

                        <button 
                          className="btn-text-white-force"
                          onClick={() => alert(`Calling tailor: ${selectedOrder.pickupPhone}`)}
                          style={{ 
                            flex: 1, 
                            height: '46px',
                            borderRadius: '10px', 
                            fontSize: '14px', 
                            fontWeight: '700', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '8px', 
                            background: '#7A3EF0',
                            color: '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(122, 62, 240, 0.2)'
                          }}
                        >
                          <Phone size={18} /> Call Tailor
                        </button>

                        <button 
                          className="btn-chat-custom"
                          onClick={() => { setActiveTab('support'); setSupportContact('customer'); }}
                          style={{ 
                            flex: 1, 
                            height: '46px',
                            borderRadius: '10px', 
                            fontSize: '14px', 
                            fontWeight: '700', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '8px', 
                            background: 'rgba(122, 62, 240, 0.08)',
                            color: '#7A3EF0', 
                            border: '1px solid rgba(122, 62, 240, 0.15)',
                            cursor: 'pointer'
                          }}
                        >
                          <MessageSquare size={18} /> Chat
                        </button>
                        
                        {selectedOrder.status === 'upcoming' && (
                          <button 
                            className="btn-text-white-force"
                            onClick={() => {
                              alert(`Task accepted! Navigating to Pickup point.`);
                              const updated = ordersList.map(o => o.id === selectedOrder.id ? { ...o, status: 'active', taskStatus: 'In Progress' } : o);
                              setOrdersList(updated);
                              setSelectedOrder({ ...selectedOrder, status: 'active', taskStatus: 'In Progress' });
                            }}
                            style={{ 
                              flex: 1.2, 
                              height: '46px',
                              borderRadius: '10px', 
                              fontSize: '14px', 
                              fontWeight: '700', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              gap: '8px', 
                              background: '#22C55E',
                              color: '#ffffff',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                            }}
                          >
                            <Check size={18} /> Accept Task
                          </button>
                        )}

                        {selectedOrder.status === 'active' && (selectedOrder.taskStatus === 'Ready' || selectedOrder.taskStatus === 'Pickup Pending') && (
                          <div style={{ display: 'flex', flex: 1.2, height: '46px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(31, 199, 126, 0.2)' }}>
                            <button 
                              className="btn-text-white-force"
                              onClick={() => {
                                alert(`Order picked up! Now navigating to delivery point.`);
                                const updated = ordersList.map(o => o.id === selectedOrder.id ? { ...o, taskStatus: 'In Progress' } : o);
                                setOrdersList(updated);
                                setSelectedOrder({ ...selectedOrder, taskStatus: 'In Progress' });
                              }}
                              style={{ 
                                flex: 1, 
                                height: '100%',
                                fontSize: '14px', 
                                fontWeight: '700', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '8px', 
                                background: '#1FC77E', // Brand Green
                                color: '#ffffff',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              <Check size={18} /> Picked Up
                            </button>
                            <div style={{ width: '1.5px', background: 'rgba(255,255,255,0.2)', height: '100%' }}></div>
                            <button
                              className="btn-text-white-force"
                              onClick={() => alert("Open options...")}
                              style={{
                                width: '36px',
                                height: '100%',
                                background: '#1FC77E',
                                color: '#ffffff',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <ChevronDown size={14} />
                            </button>
                          </div>
                        )}

                        {selectedOrder.status === 'active' && selectedOrder.taskStatus === 'In Progress' && (
                          <button 
                            className="btn-text-white-force"
                            onClick={() => {
                              const code = prompt("Enter customer Delivery OTP to verify delivery:");
                              if (code === selectedOrder.deliveryOtp) {
                                alert("OTP Verified! Order marked completed.");
                                const updated = ordersList.map(o => o.id === selectedOrder.id ? { ...o, status: 'completed', taskStatus: 'Delivered' } : o);
                                setOrdersList(updated);
                                setSelectedOrder({ ...selectedOrder, status: 'completed', taskStatus: 'Delivered' });
                              } else {
                                alert("Incorrect OTP code. Verification failed.");
                              }
                            }}
                            style={{ 
                              flex: 1.2, 
                              height: '46px',
                              borderRadius: '10px', 
                              fontSize: '14px', 
                              fontWeight: '700', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              gap: '8px', 
                              background: '#22C55E',
                              color: '#ffffff',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                            }}
                          >
                            <Check size={18} /> Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card-no-hover" style={{ padding: '40px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '24px', textAlign: 'center', color: colorTextMuted }}>
                      No task selected. Select a task from the list on the left to view detailed information.
                    </div>
                  )}
                </div>
              </div>

            </div>
        );
      })()}

        {/* MODULE 3: NAVIGATION & LIVE ROUTE PLANNER (Uber / Amazon Flex / StitchBee Redesign) */}
        {activeTab === 'navigation' && (
          <div style={{ display: 'grid', gridTemplateColumns: '76% 24%', gap: '20px', background: isDark ? '#0b081e' : '#F7F8FC', minHeight: 'calc(100vh - 120px)', padding: '4px', borderRadius: '24px' }} className="delivery-nav-grid">
            
            {/* LEFT COLUMN: TOP ORDER INFO CARD & MAIN MAP (Matching Widths) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0, width: '100%' }}>
              
              {/* TOP INFORMATION CARD (Floating Order Info Bar - Aligned to Map Width) */}
              <div 
                className="nav-top-info-card"
                style={{ 
                  background: bgCard, 
                  border: `1.5px solid ${borderColor}`, 
                  borderRadius: '24px', 
                  padding: '16px 28px',
                  boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.04)',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                {/* Left Order Title & Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colorTextPrimary, fontFamily: 'Poppins, sans-serif' }}>
                      Order #SB-1024
                    </h3>
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: '700', 
                        background: 'rgba(29, 185, 84, 0.12)', 
                        color: '#1DB954', 
                        padding: '4px 12px', 
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1DB954' }} className="pulse-marker"></span>
                      In Progress
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', color: colorTextSecondary, fontWeight: '600' }}>
                    Pickup → Delivery
                  </span>
                </div>

                {/* Middle Metrics Group */}
                <div className="nav-top-info-card-metrics">
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '11px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase' }}>ETA</span>
                    <strong style={{ fontSize: '20px', fontWeight: '800', background: 'linear-gradient(135deg, #7C3AED 0%, #FF2E83 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      12 mins
                    </strong>
                  </div>

                  <div style={{ borderLeft: `1.5px solid ${borderColor}`, paddingLeft: '36px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '11px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase' }}>Distance</span>
                    <strong style={{ fontSize: '20px', fontWeight: '800', color: colorTextPrimary }}>
                      3.8 km
                    </strong>
                  </div>

                  <div style={{ borderLeft: `1.5px solid ${borderColor}`, paddingLeft: '36px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '11px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase' }}>Earnings</span>
                    <strong style={{ fontSize: '20px', fontWeight: '800', color: colorTextPrimary }}>
                      ₹150.00
                    </strong>
                  </div>
                </div>

                {/* Right View Details Button */}
                <button 
                  className="btn"
                  onClick={() => { setActiveTab('orders'); setSelectedOrder(orders.find(o => o.id === 'SB-1024') || orders[0]); }}
                  style={{ 
                    background: 'transparent',
                    color: '#FF2E83',
                    border: '1.5px solid #FF2E83',
                    padding: '10px 18px',
                    borderRadius: '14px',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 46, 131, 0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
                >
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* MAIN MAP SECTION */}
              <div 
                style={{ 
                  background: bgCard, 
                  border: `1.5px solid ${borderColor}`, 
                  borderRadius: '30px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  position: 'relative',
                  boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.04)',
                  flex: 1,
                  minHeight: '560px'
                }}
              >
                {/* Leaflet map container element */}
                <div ref={navMapRef} style={{ width: '100%', height: '100%', minHeight: '560px', position: 'relative' }}></div>

                {/* Floating Map Controls (Top Right Overlay) */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 1000 }}>
                  <button 
                    onClick={() => { if (navMapInstance.current) navMapInstance.current.zoomIn(); }}
                    style={{ width: '40px', height: '40px', borderRadius: '12px', background: bgCard, border: `1px solid ${borderColor}`, boxShadow: '0 4px 14px rgba(0,0,0,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: colorTextPrimary }}
                    title="Zoom In"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => { if (navMapInstance.current) navMapInstance.current.zoomOut(); }}
                    style={{ width: '40px', height: '40px', borderRadius: '12px', background: bgCard, border: `1px solid ${borderColor}`, boxShadow: '0 4px 14px rgba(0,0,0,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: colorTextPrimary }}
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => { if (navMapInstance.current) navMapInstance.current.setView([12.9610, 77.7120], 15); }}
                    style={{ width: '40px', height: '40px', borderRadius: '12px', background: bgCard, border: `1px solid ${borderColor}`, boxShadow: '0 4px 14px rgba(0,0,0,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}
                    title="Locate Me"
                  >
                    <Compass size={18} />
                  </button>
                  <button 
                    onClick={() => alert("Traffic overlay refreshed with live congestion metrics!")}
                    style={{ width: '40px', height: '40px', borderRadius: '12px', background: bgCard, border: `1px solid ${borderColor}`, boxShadow: '0 4px 14px rgba(0,0,0,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFB547' }}
                    title="Traffic Layer"
                  >
                    <Activity size={18} />
                  </button>
                </div>

                {/* Left Floating Status Cards (Top Left Overlay) */}
                <div className="nav-floating-status-stack" style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 1000, maxWidth: '240px' }}>
                  {/* Card 1: Live Status & Speed */}
                  <div style={{ background: bgCard, border: `1.5px solid ${borderColor}`, padding: '12px 16px', borderRadius: '18px', boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)', textAlign: 'left' }}>
                    <span style={{ fontSize: '10px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Live Status</span>
                    <strong style={{ fontSize: '12px', color: '#1DB954', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1DB954' }}></span>
                      On the way to pickup
                    </strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', paddingTop: '8px', borderTop: `1px solid ${borderColor}` }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(29, 185, 84, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1DB954' }}>
                        <Activity size={14} />
                      </div>
                      <div>
                        <span style={{ fontSize: '9px', color: colorTextMuted, display: 'block', fontWeight: '700' }}>Speed</span>
                        <strong style={{ fontSize: '12px', color: '#1DB954' }}>42 km/h</strong>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Traffic */}
                  <div style={{ background: bgCard, border: `1.5px solid ${borderColor}`, padding: '10px 14px', borderRadius: '16px', boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255, 181, 71, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFB547' }}>
                      <AlertTriangle size={14} />
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: colorTextMuted, display: 'block', fontWeight: '700' }}>Traffic</span>
                      <strong style={{ fontSize: '12px', color: '#FFB547' }}>Moderate</strong>
                    </div>
                  </div>

                  {/* Card 3: Weather */}
                  <div style={{ background: bgCard, border: `1.5px solid ${borderColor}`, padding: '10px 14px', borderRadius: '16px', boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                      <Sun size={14} />
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: colorTextMuted, display: 'block', fontWeight: '700' }}>Weather</span>
                      <strong style={{ fontSize: '12px', color: colorTextPrimary }}>Sunny 31°C</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Floating Glassmorphism Information Bar */}
                <div 
                  className="nav-bottom-info-bar"
                  style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    left: '20px', 
                    right: '20px', 
                    background: isDark ? 'rgba(18, 15, 38, 0.92)' : 'rgba(255, 255, 255, 0.92)', 
                    backdropFilter: 'blur(12px)',
                    border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255, 255, 255, 0.8)'}`, 
                    padding: '16px 24px', 
                    borderRadius: '24px', 
                    boxShadow: isDark ? '0 12px 36px rgba(0,0,0,0.5)' : '0 12px 36px rgba(0,0,0,0.08)',
                    zIndex: 1000
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255, 46, 131, 0.12)', color: '#FF2E83', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Navigation size={16} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '9px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Distance Left</span>
                      <strong style={{ fontSize: '14px', color: colorTextPrimary, fontWeight: '800' }}>3.8 km</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: `1.5px solid ${borderColor}`, paddingLeft: '14px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(124, 58, 237, 0.12)', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={16} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '9px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>ETA</span>
                      <strong style={{ fontSize: '14px', color: colorTextPrimary, fontWeight: '800' }}>12 mins</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: `1.5px solid ${borderColor}`, paddingLeft: '14px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.12)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Compass size={16} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '9px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Stops Left</span>
                      <strong style={{ fontSize: '14px', color: colorTextPrimary, fontWeight: '800' }}>2</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: `1.5px solid ${borderColor}`, paddingLeft: '14px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(29, 185, 84, 0.12)', color: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Wallet size={16} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '9px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Earnings</span>
                      <strong style={{ fontSize: '14px', color: colorTextPrimary, fontWeight: '800' }}>₹150.00</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: `1.5px solid ${borderColor}`, paddingLeft: '14px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Sparkles size={16} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '9px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Delivery Type</span>
                      <strong style={{ fontSize: '14px', color: colorTextPrimary, fontWeight: '800' }}>Express</strong>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: ROUTE TIMELINE PANEL & CUSTOMER DETAILS (Aligned to Top) */}
            <div 
              style={{ 
                background: bgCard, 
                border: `1.5px solid ${borderColor}`, 
                borderRadius: '24px', 
                padding: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.04)',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colorTextPrimary, fontFamily: 'Poppins, sans-serif' }}>Delivery Route</h4>
                  <span 
                    style={{ fontSize: '11px', color: '#FF2E83', fontWeight: '700', cursor: 'pointer' }}
                    onClick={() => setActiveTab('orders')}
                  >
                    View All Orders
                  </span>
                </div>

                {/* Vertical Route Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '4px' }}>
                  {[
                    { num: 1, type: 'Pickup', name: 'Vogue Craft Tailors', address: '12, 5th Main, AECS Layout, Bengaluru - 560037', tag: 'Now', isNow: true, bg: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', phone: '+919876543210' },
                    { num: 2, type: 'Deliver to', name: 'Priya Sharma', address: 'Flat 402, Pinecrest Apts, Brookfield, Bengaluru - 560037', tag: '12 mins', isNow: false, bg: 'linear-gradient(135deg, #FF2E83 0%, #C400FF 100%)', phone: '+919812345678' },
                    { num: 3, type: 'Next Pickup', name: 'Elite Threads', address: '88, 7th Cross, Whitefield, Bengaluru - 560066', tag: '25 mins', isNow: false, bg: '#94A3B8', phone: '+919822233344' },
                    { num: 4, type: 'Deliver to', name: 'Amit Verma', address: 'Lane 5, Phase 2, Pune Road, Bengaluru - 560048', tag: '35 mins', isNow: false, bg: '#94A3B8', phone: '+919855566677' }
                  ].map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative' }}>
                      {/* Dashed vertical connector line */}
                      {idx < 3 && (
                        <div 
                          style={{ 
                            position: 'absolute', 
                            left: '11px', 
                            top: '24px', 
                            bottom: '-12px', 
                            width: '2px', 
                            borderLeft: `2px dashed ${borderColor}`, 
                            zIndex: 1 
                          }} 
                        />
                      )}

                      {/* Step Number Circle */}
                      <div 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          background: step.bg, 
                          color: '#ffffff', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontSize: '11px', 
                          fontWeight: '800',
                          flexShrink: 0,
                          zIndex: 2,
                          boxShadow: step.isNow ? '0 2px 8px rgba(124, 58, 237, 0.3)' : 'none'
                        }}
                      >
                        {step.num}
                      </div>

                      {/* Stop Details */}
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <span style={{ fontSize: '10px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase' }}>
                            {step.type}
                          </span>
                          <span 
                            style={{ 
                              fontSize: '9px', 
                              padding: '2px 6px', 
                              borderRadius: '6px', 
                              fontWeight: '700',
                              background: step.isNow ? 'rgba(255, 46, 131, 0.15)' : 'rgba(148, 163, 184, 0.12)',
                              color: step.isNow ? '#FF2E83' : colorTextMuted
                            }}
                          >
                            {step.tag}
                          </span>
                        </div>

                        <strong style={{ fontSize: '12px', color: colorTextPrimary, fontWeight: '800' }}>
                          {step.name}
                        </strong>

                        <span style={{ fontSize: '10px', color: colorTextSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                          {step.address}
                        </span>
                      </div>

                      {/* Phone action button */}
                      <button 
                        onClick={() => alert(`Dialing ${step.name}: ${step.phone}`)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.05)' : '#F8FAFC', border: `1px solid ${borderColor}`, color: colorTextSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                        title={`Call ${step.name}`}
                      >
                        <Phone size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Section Divider */}
                <div style={{ borderTop: `1.5px solid ${borderColor}`, margin: '4px 0' }} />

                {/* Customer Details Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: colorTextPrimary }}>Customer Details</h4>
                    <span style={{ fontSize: '10px', fontWeight: '700', background: 'rgba(29, 185, 84, 0.12)', color: '#1DB954', padding: '2px 8px', borderRadius: '8px' }}>
                      COD: ₹520
                    </span>
                  </div>

                  {/* Customer Profile Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED 0%, #FF2E83 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                        PS
                      </div>
                      <div>
                        <strong style={{ fontSize: '12px', color: colorTextPrimary, display: 'block' }}>Priya Sharma</strong>
                        <span style={{ fontSize: '10px', color: '#F59E0B', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <Star size={10} fill="#F59E0B" /> 4.9 Rating
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        onClick={() => alert("Calling customer Priya Sharma: +919812345678")}
                        style={{ padding: '6px 10px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.05)' : '#F8FAFC', border: `1px solid ${borderColor}`, color: colorTextPrimary, fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Phone size={12} /> Call
                      </button>
                      <button 
                        onClick={() => { setActiveTab('support'); setSupportContact('customer'); }}
                        style={{ padding: '6px 10px', borderRadius: '10px', background: 'rgba(255, 46, 131, 0.12)', border: 'none', color: '#FF2E83', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <MessageSquare size={12} /> Chat
                      </button>
                    </div>
                  </div>

                  {/* Order Notes Box */}
                  <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: `1px solid ${borderColor}`, borderRadius: '14px', padding: '10px 12px' }}>
                    <span style={{ fontSize: '10px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      Order Notes & Instructions
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '11px', color: colorTextSecondary, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <li>Please call before arriving.</li>
                      <li>Gate No. 4, Flat 402.</li>
                      <li>Fragile Package - Handle with care.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px', borderTop: `1.5px solid ${borderColor}`, paddingTop: '14px' }}>
                <button 
                  className="btn"
                  onClick={() => alert("Initializing live turn-by-turn navigation...")}
                  style={{ 
                    width: '100%', 
                    height: '46px',
                    background: 'linear-gradient(135deg, #7C3AED 0%, #FF2E83 100%)', 
                    color: '#ffffff', 
                    border: 'none', 
                    borderRadius: '16px', 
                    fontWeight: '800', 
                    fontSize: '13px', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <Navigation size={16} /> Navigate
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button 
                    onClick={() => alert("Marked Order #SB-1024 as Picked Up!")}
                    style={{ 
                      padding: '10px', 
                      borderRadius: '14px', 
                      background: bgCard, 
                      border: '1.5px solid #7C3AED', 
                      color: '#7C3AED', 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      cursor: 'pointer' 
                    }}
                  >
                    Mark Picked Up
                  </button>
                  <button 
                    onClick={() => alert("Marked Order #SB-1024 as Delivered!")}
                    style={{ 
                      padding: '10px', 
                      borderRadius: '14px', 
                      background: '#1DB954', 
                      border: 'none', 
                      color: '#ffffff', 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(29, 185, 84, 0.25)' 
                    }}
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* MODULE 4: EARNINGS AND WALLET */}
        {activeTab === 'earnings' && (
          <div className="earnings-page-wrapper" style={{ background: pBackground }}>
            
            {/* Quick Cards Grid */}
            <div className="earnings-stats-grid">
              {/* Card 1: Today's Payout (Gradient Purple to Pink) */}
              <div className="earnings-card-premium earnings-card-gradient">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', opacity: 0.9, letterSpacing: '0.5px' }}>Today's Payout</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wallet size={16} style={{ color: '#ffffff' }} />
                  </div>
                </div>
                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#ffffff', margin: '4px 0 0 0', lineHeight: 1.2 }}>₹1,850</h2>
                  <span style={{ fontSize: '11px', opacity: 0.9, fontWeight: '500' }}>Incentives: ₹120</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '600', opacity: 0.9 }}>
                    <Sparkles size={11} />
                    <span>Withdraw Available</span>
                  </div>
                  <button 
                    onClick={() => alert("Withdrawal of ₹1,850 initiated!")}
                    className="withdraw-btn-outline"
                    style={{ padding: '4px 12px', fontSize: '12px' }}
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              {/* Card 2: Weekly Payout */}
              <div className="earnings-card-premium" style={{ background: pCardBg, borderColor: pBorder, boxShadow: pCardShadow }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '500', color: colorTextMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Weekly Payout</span>
                    <h2 style={{ fontSize: '32px', fontWeight: '700', color: colorTextPrimary, margin: '4px 0 0 0', lineHeight: 1.2 }}>₹11,250</h2>
                    <span style={{ fontSize: '11px', color: colorTextSecondary, fontWeight: '500' }}>12 Hours Active</span>
                  </div>
                  <div style={{ width: '80px', height: '35px', marginTop: '8px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { value: 100 }, { value: 120 }, { value: 110 }, { value: 150 }, { value: 140 }, { value: 190 }, { value: 220 }
                      ]}>
                        <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={2.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: colorTextSecondary, marginTop: '8px', justifyContent: 'flex-end', width: '100%' }}>
                  <span>Cleared Friday</span>
                  <Calendar size={12} style={{ color: colorTextMuted }} />
                </div>
              </div>

              {/* Card 3: Monthly Payout */}
              <div className="earnings-card-premium" style={{ background: pCardBg, borderColor: pBorder, boxShadow: pCardShadow }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '500', color: colorTextMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Monthly Payout</span>
                    <h2 style={{ fontSize: '32px', fontWeight: '700', color: colorTextPrimary, margin: '4px 0 0 0', lineHeight: 1.2 }}>₹48,600</h2>
                    <span style={{ fontSize: '11px', color: colorTextSecondary, fontWeight: '500' }}>98% Completion</span>
                  </div>
                  <div style={{ width: '80px', height: '35px', marginTop: '8px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { value: 200 }, { value: 220 }, { value: 210 }, { value: 240 }, { value: 280 }, { value: 260 }, { value: 310 }
                      ]}>
                        <Line type="monotone" dataKey="value" stroke="#FF9F43" strokeWidth={2.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: colorTextSecondary, marginTop: '8px', justifyContent: 'flex-end', width: '100%' }}>
                  <span>June Cycle</span>
                  <Calendar size={12} style={{ color: colorTextMuted }} />
                </div>
              </div>

              {/* Card 4: Bonus & Incentives */}
              <div className="earnings-card-premium" style={{ background: pCardBg, borderColor: pBorder, boxShadow: pCardShadow }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '500', color: colorTextMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bonus & Incentives</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(122, 62, 240, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Gift size={16} style={{ color: '#7A3EF0' }} />
                  </div>
                </div>
                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: '700', color: colorTextPrimary, margin: '4px 0 0 0', lineHeight: 1.2 }}>₹4,000</h2>
                  <span style={{ fontSize: '11px', color: colorTextSecondary, fontWeight: '500' }}>Weekend Rush rewards</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#7A3EF0', fontWeight: '600', marginTop: '8px' }}>
                  <Sparkles size={12} />
                  <span>Paid instantly</span>
                </div>
              </div>

              {/* Card 5: Available Balance */}
              <div className="earnings-card-premium" style={{ background: pCardBg, borderColor: pBorder, boxShadow: pCardShadow }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '500', color: colorTextMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available Balance</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255, 46, 131, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wallet size={16} style={{ color: '#FF2E83' }} />
                  </div>
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: '700', color: colorTextPrimary, margin: '4px 0 0 0', lineHeight: 1.2 }}>₹{walletBalance.toLocaleString()}</h2>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', width: '100%' }}>
                  <input 
                    type="number" 
                    placeholder="Enter Amount" 
                    className="form-input" 
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    style={{ 
                      flex: 1, 
                      padding: '0 12px', 
                      fontSize: '12px', 
                      height: '32px',
                      borderRadius: '16px',
                      border: `1.5px solid ${pBorder}`,
                      background: pBackground,
                      color: colorTextPrimary,
                      outline: 'none',
                      width: '50%'
                    }}
                  />
                  <button 
                    className="btn btn-primary" 
                    style={{ 
                      padding: '0 12px', 
                      fontSize: '12px', 
                      height: '32px',
                      borderRadius: '16px',
                      background: '#FF2E83',
                      border: 'none',
                      color: '#ffffff',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }} 
                    onClick={handleWithdraw}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs and Filters Row */}
            <div className="earnings-tab-bar" style={{ borderColor: pBorder }}>
              <div className="earnings-tabs-container">
                {['Overview', 'Daily', 'Weekly', 'Monthly', 'Incentives', 'Adjustments'].map(tab => (
                  <button
                    key={tab}
                    className={`earnings-tab-btn ${earningsSubTab === tab ? 'active' : ''}`}
                    onClick={() => setEarningsSubTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="earnings-filter-buttons-row">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setIsDatePickerActive(!isDatePickerActive)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: pCardBg, 
                    border: `1.5px solid ${isDatePickerActive ? '#FF2E83' : pBorder}`, 
                    borderRadius: '12px', 
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: isDatePickerActive ? '600' : '500',
                    color: isDatePickerActive ? '#FF2E83' : colorTextSecondary,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Calendar size={16} style={{ color: isDatePickerActive ? '#FF2E83' : colorTextMuted }} />
                  <span>June 21 - June 27, 2026</span>
                  <ChevronDown size={14} style={{ color: isDatePickerActive ? '#FF2E83' : colorTextMuted }} />
                </button>
                
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setIsFilterActive(!isFilterActive)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: pCardBg, 
                    border: `1.5px solid ${isFilterActive ? '#FF2E83' : pBorder}`, 
                    borderRadius: '12px', 
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: isFilterActive ? '600' : '500',
                    color: isFilterActive ? '#FF2E83' : colorTextSecondary,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Filter size={16} style={{ color: isFilterActive ? '#FF2E83' : colorTextMuted }} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Main Content Grid (Overview Tab default layout) */}
            {earningsSubTab === 'Overview' ? (
              <>
                <div className="earnings-split-grid">
                  {/* Column 1: Earnings Overview */}
                  <div className="glass-card-no-hover earnings-glass-card" style={{ height: '520px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '16px', fontWeight: '600', color: colorTextPrimary }}>Earnings Overview</span>
                      <select 
                        className="form-select" 
                        style={{ 
                          width: '110px', 
                          fontSize: '13px', 
                          padding: '6px 12px', 
                          height: '32px', 
                          borderRadius: '8px', 
                          background: pBackground, 
                          border: `1.5px solid ${pBorder}`, 
                          color: colorTextPrimary 
                        }}
                      >
                        <option>This Week</option>
                        <option>Last Week</option>
                      </select>
                    </div>

                    <div className="earnings-summary-header">
                      <div>
                        <h2 style={{ fontSize: '40px', fontWeight: '700', color: colorTextPrimary, margin: 0, lineHeight: 1.2 }}>₹11,250</h2>
                        <span style={{ fontSize: '14px', color: colorTextMuted, fontWeight: '500' }}>Total Earnings</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#ECFDF5', color: '#22C55E', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', marginTop: '6px', width: 'fit-content' }}>
                          <TrendingUp size={12} />
                          <span>18.6% vs last week</span>
                        </div>
                      </div>

                      <div className="earnings-summary-stats">
                        <div>
                          <span style={{ fontSize: '12px', color: colorTextMuted, display: 'block' }}>Avg. Daily Earnings</span>
                          <strong style={{ fontSize: '18px', color: colorTextPrimary }}>₹1,607</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: colorTextMuted, display: 'block' }}>Total Orders</span>
                          <strong style={{ fontSize: '18px', color: colorTextPrimary }}>58</strong>
                        </div>
                      </div>
                    </div>

                    {/* Chart Container */}
                    <div style={{ height: '240px', width: '100%', marginTop: '16px', position: 'relative' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                          data={[
                            { name: 'Mon', earnings: 900 },
                            { name: 'Tue', earnings: 1200 },
                            { name: 'Wed', earnings: 1850 },
                            { name: 'Thu', earnings: 1100 },
                            { name: 'Fri', earnings: 1600 },
                            { name: 'Sat', earnings: 2200 },
                            { name: 'Sun', earnings: 1700 }
                          ]}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FF2E83" stopOpacity={0.18}/>
                              <stop offset="95%" stopColor="#FF2E83" stopOpacity={0.01}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : '#E8EDF5'} />
                          <XAxis dataKey="name" stroke={colorTextMuted} fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis 
                            stroke={colorTextMuted} 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                            tickFormatter={v => v === 0 ? '₹0' : '₹' + (v >= 1000 ? (v/1000) + 'K' : v)}
                          />
                          <RechartsTooltip 
                            cursor={{ stroke: '#FF2E83', strokeWidth: 1, strokeDasharray: '4 4' }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div style={{
                                    background: pCardBg,
                                    border: `1.5px solid ${pBorder}`,
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
                                  }}>
                                    <span style={{ fontSize: '11px', color: colorTextMuted, display: 'block', marginBottom: '2px' }}>
                                      {payload[0].payload.name === 'Wed' ? 'Wed, Jun 24' : `${payload[0].payload.name}, Jun 2026`}
                                    </span>
                                    <strong style={{ fontSize: '15px', color: colorTextPrimary }}>₹{payload[0].value}</strong>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="earnings" 
                            stroke="#FF2E83" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorEarnings)" 
                            dot={{ r: 4, stroke: '#FF2E83', strokeWidth: 2, fill: pCardBg }}
                            activeDot={{ r: 6, stroke: '#FF2E83', strokeWidth: 2, fill: pCardBg }}
                            animationDuration={800}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Bottom Parameters */}
                    <div className="earnings-overview-grid">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '12px', background: isDark ? 'rgba(59, 130, 246, 0.05)' : '#F0F7FF', border: `1px solid ${pBorder}` }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Clock size={16} style={{ color: '#3B82F6' }} />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Online Time</span>
                          <strong style={{ fontSize: '13px', color: colorTextPrimary, whiteSpace: 'nowrap' }}>42h 18m</strong>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '12px', background: isDark ? 'rgba(34, 197, 94, 0.05)' : '#ECFDF5', border: `1px solid ${pBorder}` }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckCircle size={16} style={{ color: '#22C55E' }} />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Completed Orders</span>
                          <strong style={{ fontSize: '13px', color: colorTextPrimary }}>58</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '12px', background: isDark ? 'rgba(239, 68, 68, 0.05)' : '#FEF2F2', border: `1px solid ${pBorder}` }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <AlertTriangle size={16} style={{ color: '#EF4444' }} />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Cancelled Orders</span>
                          <strong style={{ fontSize: '13px', color: colorTextPrimary }}>2</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '12px', background: isDark ? 'rgba(34, 197, 94, 0.05)' : '#ECFDF5', border: `1px solid ${pBorder}` }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Target size={16} style={{ color: '#22C55E' }} />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Acceptance Rate</span>
                          <strong style={{ fontSize: '13px', color: colorTextPrimary }}>98%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Earnings Breakdown */}
                  <div className="glass-card-no-hover earnings-glass-card" style={{ height: '520px' }}>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '16px', fontWeight: '600', color: colorTextPrimary }}>Earnings Breakdown</span>
                    </div>

                    {/* Donut Chart and Legend Split */}
                    <div className="earnings-breakdown-row">
                      <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Base Earnings', value: 7200, percentage: 64, color: '#7A3EF0' },
                                { name: 'Delivery Commission', value: 2400, percentage: 21, color: '#3B82F6' },
                                { name: 'Incentives', value: 1200, percentage: 11, color: '#22C55E' },
                                { name: 'Surge Bonus', value: 300, percentage: 3, color: '#FF9F43' },
                                { name: 'Other Adjustments', value: 150, percentage: 1, color: '#00D8F6' }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={75}
                              paddingAngle={3}
                              dataKey="value"
                              animationDuration={800}
                            >
                              {[
                                { color: '#7A3EF0' },
                                { color: '#3B82F6' },
                                { color: '#22C55E' },
                                { color: '#FF9F43' },
                                { color: '#00D8F6' }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                          <span style={{ fontSize: '11px', color: colorTextMuted, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</span>
                          <strong style={{ fontSize: '20px', color: colorTextPrimary, fontWeight: '700' }}>₹11,250</strong>
                        </div>
                      </div>

                      {/* Legend List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: 0 }}>
                        {[
                          { name: 'Base Earnings', value: 7200, percentage: 64, color: '#7A3EF0' },
                          { name: 'Delivery Commission', value: 2400, percentage: 21, color: '#3B82F6' },
                          { name: 'Incentives', value: 1200, percentage: 11, color: '#22C55E' },
                          { name: 'Surge Bonus', value: 300, percentage: 3, color: '#FF9F43' },
                          { name: 'Other Adjustments', value: 150, percentage: 1, color: '#00D8F6' }
                        ].map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }}></span>
                              <span style={{ color: colorTextSecondary, fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', fontWeight: '600', flexShrink: 0 }}>
                              <span style={{ color: colorTextPrimary }}>₹{item.value}</span>
                              <span style={{ color: colorTextMuted, fontWeight: '400', width: '28px', textAlign: 'right' }}>{item.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Success Banner */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '14px', background: isDark ? 'rgba(34, 197, 94, 0.05)' : '#ECFDF5', border: `1.5px solid ${isDark ? 'rgba(34,197,94,0.1)' : '#D1FAE5'}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Trophy size={20} style={{ color: '#22C55E' }} />
                        </div>
                        <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                          <strong style={{ fontSize: '14px', color: isDark ? '#34d399' : '#065F46', display: 'block' }}>Great Job! 🚀</strong>
                          <span style={{ fontSize: '11px', color: isDark ? '#a7f3d0' : '#047857', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>You completed 58 orders this week.</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setEarningsSubTab('Incentives')}
                        style={{
                          background: '#ffffff',
                          border: '1.5px solid #22C55E',
                          color: '#22C55E',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}
                      >
                        View Incentives
                      </button>
                    </div>
                  </div>

                  {/* Column 3: Recent Transactions */}
                  <div className="glass-card-no-hover earnings-glass-card" style={{ height: '520px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1.5px solid ${pBorder}`, paddingBottom: '16px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '600', color: colorTextPrimary }}>Recent Transactions</span>
                      <button 
                        onClick={() => alert("Transaction history page loading...")} 
                        style={{ background: 'none', border: 'none', color: '#FF2E83', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
                      >
                        View All
                      </button>
                    </div>

                    {/* Scrollable list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', flex: 1, marginTop: '8px', marginRight: '-8px', paddingRight: '8px' }}>
                      {[
                        { title: "Delivery Commission payout #SB-1024", date: "June 21, 2026", time: "09:15 PM", amount: 120, type: "credit", icon: 'delivery' },
                        { title: "Weekend Surge Incentive bonus", date: "June 21, 2026", time: "08:30 PM", amount: 50, type: "credit", icon: 'surge' },
                        { title: "Instant Wallet Payout withdrawal", date: "June 20, 2026", time: "11:45 AM", amount: -2000, type: "debit", icon: 'wallet' },
                        { title: "Delivery Commission payout #SB-0950", date: "June 19, 2026", time: "09:20 PM", amount: 95, type: "credit", icon: 'delivery' },
                        { title: "Incentive payout", date: "June 19, 2026", time: "08:10 PM", amount: 80, type: "credit", icon: 'incentive' }
                      ].map((tx, idx) => {
                        let iconBg = 'rgba(34, 197, 94, 0.1)';
                        let iconColor = '#22C55E';
                        let LucideIcon = ShoppingBag;

                        if (tx.icon === 'surge') {
                          iconBg = 'rgba(122, 62, 240, 0.1)';
                          iconColor = '#7A3EF0';
                          LucideIcon = Activity;
                        } else if (tx.icon === 'wallet') {
                          iconBg = 'rgba(255, 159, 67, 0.1)';
                          iconColor = '#FF9F43';
                          LucideIcon = Wallet;
                        } else if (tx.icon === 'incentive') {
                          iconBg = 'rgba(59, 130, 246, 0.1)';
                          iconColor = '#3B82F6';
                          LucideIcon = Gift;
                        }

                        return (
                          <div 
                            key={idx} 
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center', 
                              padding: '12px 8px', 
                              borderRadius: '12px', 
                              transition: 'background 0.2s ease',
                              borderBottom: idx < 4 ? `1px solid ${isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD'}` : 'none',
                              cursor: 'pointer'
                            }}
                            className="transaction-item-row"
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <LucideIcon size={18} style={{ color: iconColor }} />
                              </div>
                              <div style={{ overflow: 'hidden', textAlign: 'left' }}>
                                <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.title}</strong>
                                <span style={{ fontSize: '11px', color: colorTextMuted }}>{tx.date} • {tx.time}</span>
                              </div>
                            </div>
                            <strong style={{ fontSize: '14px', color: tx.type === 'credit' ? '#22C55E' : '#FF2E83', flexShrink: 0, marginLeft: '8px' }}>
                              {tx.type === 'credit' ? '+' : ''}₹{tx.amount.toLocaleString()}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Second Row Grid */}
                <div className="earnings-bottom-grid">
                  {/* Left: Earnings Summary Table */}
                  <div className="glass-card-no-hover earnings-glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '600', color: colorTextPrimary }}>Earnings Summary</span>
                    </div>

                    <div className="earnings-table-container">
                      <table className="earnings-table">
                        <thead>
                          <tr>
                            <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Date</th>
                            <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Online Time</th>
                            <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Orders</th>
                            <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Base Earnings</th>
                            <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Incentives</th>
                            <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Adjustments</th>
                            <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Total Earnings</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { date: "Sun, Jun 21", online: "6h 20m", orders: 8, base: 1200, inc: 180, adj: 0, total: 1380 },
                            { date: "Sat, Jun 20", online: "8h 15m", orders: 12, base: 1800, inc: 400, adj: 0, total: 2200 },
                            { date: "Fri, Jun 19", online: "7h 10m", orders: 10, base: 1500, inc: 150, adj: -50, total: 1600 },
                            { date: "Thu, Jun 18", online: "6h 05m", orders: 7, base: 1050, inc: 100, adj: 0, total: 1150 },
                            { date: "Wed, Jun 17", online: "5h 40m", orders: 6, base: 900, inc: 80, adj: 0, total: 980 }
                          ].map((row, idx) => (
                            <tr key={idx}>
                              <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextSecondary, fontWeight: '500' }}>{row.date}</td>
                              <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary }}>{row.online}</td>
                              <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary }}>{row.orders}</td>
                              <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary }}>₹{row.base}</td>
                              <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: '#22C55E', fontWeight: '500' }}>₹{row.inc}</td>
                              <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: row.adj < 0 ? '#FF2E83' : colorTextPrimary }}>
                                {row.adj < 0 ? `-₹${Math.abs(row.adj)}` : `₹${row.adj}`}
                              </td>
                              <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: '#22C55E', fontWeight: '700' }}>₹{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right: Incentive Progress & Referral */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-card-no-hover earnings-glass-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: colorTextPrimary }}>Incentive Progress</span>
                        <button 
                          onClick={() => setEarningsSubTab('Incentives')} 
                          style={{ background: 'none', border: 'none', color: '#FF2E83', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
                        >
                          View All
                        </button>
                      </div>

                      {/* 3 cards side-by-side inside this container */}
                      <div className="earnings-incentives-mini-grid">
                        {[
                          { title: "Weekend Rush Bonus", info: "Extra earnings on weekend", val: "₹150 / ₹200", pct: 75, color: '#FF2E83', iconBg: 'rgba(255, 46, 131, 0.1)', LucideIcon: Gift },
                          { title: "Order Streak Bonus", info: "Complete 60 orders", val: "58 / 60 orders", pct: 97, color: '#FF9F43', iconBg: 'rgba(255, 159, 67, 0.1)', LucideIcon: Target },
                          { title: "High Performance", info: "Maintain 95%+ acceptance", val: "98% / 95%", pct: 100, color: '#22C55E', iconBg: 'rgba(34, 197, 94, 0.1)', LucideIcon: Activity }
                        ].map((card, idx) => {
                          const Icon = card.LucideIcon;
                          return (
                            <div 
                              key={idx} 
                              style={{ 
                                padding: '16px', 
                                border: `1.5px solid ${pBorder}`, 
                                borderRadius: '14px', 
                                background: pCardBg, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between',
                                height: '160px',
                                boxSizing: 'border-box'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <Icon size={16} style={{ color: card.color }} />
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                  <strong style={{ fontSize: '12px', color: colorTextPrimary, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.title}</strong>
                                  <span style={{ fontSize: '9px', color: colorTextMuted, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.info}</span>
                                </div>
                              </div>

                              <div style={{ marginTop: '16px', textAlign: 'left' }}>
                                <strong style={{ fontSize: '14px', color: colorTextPrimary, display: 'block', marginBottom: '8px' }}>{card.val}</strong>
                                <div className="incentive-progress-wrapper">
                                  <div className="incentive-progress-bg">
                                    <div 
                                      className="incentive-progress-fill" 
                                      style={{ width: `${card.pct}%`, background: card.color }}
                                    ></div>
                                  </div>
                                  <span style={{ fontSize: '10px', color: colorTextMuted, alignSelf: 'flex-end', fontWeight: '600' }}>{card.pct}%</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Referral Banner */}
                    <div 
                      className="referral-banner-gradient referral-banner-container" 
                      style={{ padding: '20px 28px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0, textAlign: 'left' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(122, 62, 240, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <UserPlus size={24} style={{ color: '#7A3EF0' }} />
                        </div>
                        <div>
                          <strong style={{ fontSize: '16px', color: colorTextPrimary, display: 'block' }}>Refer & Earn More!</strong>
                          <span style={{ fontSize: '13px', color: colorTextSecondary }}>Refer other riders and earn exciting bonuses.</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => alert("Referral link copied!")}
                        style={{
                          background: 'transparent',
                          border: '1.5px solid #7A3EF0',
                          color: '#7A3EF0',
                          borderRadius: '12px',
                          padding: '8px 18px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s ease',
                          flexShrink: 0
                        }}
                      >
                        Refer Now
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Redesigned Filter Panel for sub-tabs */}
                <div 
                  className="glass-card-no-hover" 
                  style={{ 
                    padding: '24px', 
                    background: pCardBg, 
                    border: `1.5px solid ${pBorder}`, 
                    borderRadius: '18px', 
                    boxShadow: pCardShadow,
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Filter size={18} style={{ color: '#FF2E83' }} />
                      <strong style={{ fontSize: '15px', color: colorTextPrimary }}>Filter {earningsSubTab} Performance</strong>
                    </div>
                    <button 
                      onClick={() => {
                        setFilterArea('All');
                        setFilterPaymentType('All');
                        setFilterOrderType('All');
                        setFilterStatus('All');
                        setFilterDistance('All');
                        setFilterOnlineHours('All');
                        setFilterBonusType('All');
                        setIsDatePickerActive(false);
                      }}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#FF2E83', 
                        fontSize: '12px', 
                        fontWeight: '600', 
                        cursor: 'pointer' 
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    {/* Date filter dropdown */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '500' }}>Date Period</span>
                      <select 
                        className="form-select" 
                        value={isDatePickerActive ? 'Selected' : 'All'}
                        onChange={(e) => setIsDatePickerActive(e.target.value === 'Selected')}
                        style={{ background: pBackground, border: `1.5px solid ${isDatePickerActive ? '#FF2E83' : pBorder}`, color: isDatePickerActive ? '#FF2E83' : colorTextPrimary, borderRadius: '10px', padding: '8px 12px', fontSize: '13px', fontWeight: isDatePickerActive ? '600' : '500', outline: 'none', height: '38px' }}
                      >
                        <option value="All">All Days</option>
                        <option value="Selected">June 21 - June 27, 2026</option>
                      </select>
                    </div>

                    {/* Area filter */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '500' }}>Operating Area</span>
                      <select 
                        className="form-select" 
                        value={filterArea}
                        onChange={(e) => setFilterArea(e.target.value)}
                        style={{ background: pBackground, border: `1.5px solid ${filterArea !== 'All' ? '#FF2E83' : pBorder}`, color: filterArea !== 'All' ? '#FF2E83' : colorTextPrimary, borderRadius: '10px', padding: '8px 12px', fontSize: '13px', fontWeight: filterArea !== 'All' ? '600' : '500', outline: 'none', height: '38px' }}
                      >
                        <option value="All">All Areas</option>
                        <option value="HSR Layout">HSR Layout</option>
                        <option value="Koramangala">Koramangala</option>
                        <option value="Indiranagar">Indiranagar</option>
                        <option value="Whitefield">Whitefield</option>
                      </select>
                    </div>

                    {/* Payment Type */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '500' }}>Payment Mode</span>
                      <select 
                        className="form-select" 
                        value={filterPaymentType}
                        onChange={(e) => setFilterPaymentType(e.target.value)}
                        style={{ background: pBackground, border: `1.5px solid ${filterPaymentType !== 'All' ? '#FF2E83' : pBorder}`, color: filterPaymentType !== 'All' ? '#FF2E83' : colorTextPrimary, borderRadius: '10px', padding: '8px 12px', fontSize: '13px', fontWeight: filterPaymentType !== 'All' ? '600' : '500', outline: 'none', height: '38px' }}
                      >
                        <option value="All">All Payments</option>
                        <option value="Cash">Cash</option>
                        <option value="Online">Online</option>
                        <option value="Wallet">Wallet</option>
                      </select>
                    </div>

                    {/* Order Type */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '500' }}>Delivery Type</span>
                      <select 
                        className="form-select" 
                        value={filterOrderType}
                        onChange={(e) => setFilterOrderType(e.target.value)}
                        style={{ background: pBackground, border: `1.5px solid ${filterOrderType !== 'All' ? '#FF2E83' : pBorder}`, color: filterOrderType !== 'All' ? '#FF2E83' : colorTextPrimary, borderRadius: '10px', padding: '8px 12px', fontSize: '13px', fontWeight: filterOrderType !== 'All' ? '600' : '500', outline: 'none', height: '38px' }}
                      >
                        <option value="All">All Deliveries</option>
                        <option value="Regular">Regular</option>
                        <option value="Express">Express</option>
                        <option value="Custom">Custom</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '500' }}>Delivery Status</span>
                      <select 
                        className="form-select" 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ background: pBackground, border: `1.5px solid ${filterStatus !== 'All' ? '#FF2E83' : pBorder}`, color: filterStatus !== 'All' ? '#FF2E83' : colorTextPrimary, borderRadius: '10px', padding: '8px 12px', fontSize: '13px', fontWeight: filterStatus !== 'All' ? '600' : '500', outline: 'none', height: '38px' }}
                      >
                        <option value="All">All Statuses</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Returned">Returned</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>

                    {/* Distance */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '500' }}>Distance Range</span>
                      <select 
                        className="form-select" 
                        value={filterDistance}
                        onChange={(e) => setFilterDistance(e.target.value)}
                        style={{ background: pBackground, border: `1.5px solid ${filterDistance !== 'All' ? '#FF2E83' : pBorder}`, color: filterDistance !== 'All' ? '#FF2E83' : colorTextPrimary, borderRadius: '10px', padding: '8px 12px', fontSize: '13px', fontWeight: filterDistance !== 'All' ? '600' : '500', outline: 'none', height: '38px' }}
                      >
                        <option value="All">All Distances</option>
                        <option value="Short">Short (&lt;3 km)</option>
                        <option value="Medium">Medium (3-5 km)</option>
                        <option value="Long">Long (&gt;5 km)</option>
                      </select>
                    </div>

                    {/* Online Hours */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '500' }}>Shift Duration</span>
                      <select 
                        className="form-select" 
                        value={filterOnlineHours}
                        onChange={(e) => setFilterOnlineHours(e.target.value)}
                        style={{ background: pBackground, border: `1.5px solid ${filterOnlineHours !== 'All' ? '#FF2E83' : pBorder}`, color: filterOnlineHours !== 'All' ? '#FF2E83' : colorTextPrimary, borderRadius: '10px', padding: '8px 12px', fontSize: '13px', fontWeight: filterOnlineHours !== 'All' ? '600' : '500', outline: 'none', height: '38px' }}
                      >
                        <option value="All">All Durations</option>
                        <option value="Short">Short (&lt;4 hrs)</option>
                        <option value="Regular">Regular (4-8 hrs)</option>
                        <option value="Extended">Extended (&gt;8 hrs)</option>
                      </select>
                    </div>

                    {/* Bonus Type */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '500' }}>Incentive Category</span>
                      <select 
                        className="form-select" 
                        value={filterBonusType}
                        onChange={(e) => setFilterBonusType(e.target.value)}
                        style={{ background: pBackground, border: `1.5px solid ${filterBonusType !== 'All' ? '#FF2E83' : pBorder}`, color: filterBonusType !== 'All' ? '#FF2E83' : colorTextPrimary, borderRadius: '10px', padding: '8px 12px', fontSize: '13px', fontWeight: filterBonusType !== 'All' ? '600' : '500', outline: 'none', height: '38px' }}
                      >
                        <option value="All">All Categories</option>
                        <option value="Weekend Rush">Weekend Rush</option>
                        <option value="Peak Hours">Peak Hours</option>
                        <option value="Milestone">Milestone</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* DAILY TAB */}
                {earningsSubTab === 'Daily' && (
                  <>
                    {/* KPI Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
                      {[
                        { title: "Total Earnings", val: "₹1,850", info: "+₹120 Incentives", color: '#FF2E83', bg: 'rgba(255, 46, 131, 0.05)' },
                        { title: "Total Deliveries", val: "8", info: "100% Completed", color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.05)' },
                        { title: "Online Hours", val: "6.3h", info: "Shift: 09AM - 04PM", color: '#22C55E', bg: 'rgba(34, 197, 94, 0.05)' },
                        { title: "Avg. Earnings/Order", val: "₹231", info: "Based on base commission", color: '#FF9F43', bg: 'rgba(255, 159, 67, 0.05)' },
                        { title: "Incentives Earned", val: "₹120", info: "Weekend rush reward", color: '#7A3EF0', bg: 'rgba(122, 62, 240, 0.05)' },
                        { title: "Acceptance Rate", val: "98%", info: "Target: 95%+", color: '#00D8F6', bg: 'rgba(0, 216, 246, 0.05)' }
                      ].map((kpi, idx) => (
                        <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left' }}>
                          <span style={{ fontSize: '11px', color: colorTextMuted, textTransform: 'uppercase', fontWeight: '600' }}>{kpi.title}</span>
                          <h2 style={{ fontSize: '28px', fontWeight: '700', color: kpi.color, margin: '6px 0' }}>{kpi.val}</h2>
                          <span style={{ fontSize: '11px', color: colorTextSecondary }}>{kpi.info}</span>
                        </div>
                      ))}
                    </div>

                    {/* Charts Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="earnings-split-grid">
                      {/* Hourly Earnings Area Chart */}
                      <div className="glass-card-no-hover earnings-glass-card" style={{ height: '400px' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block', marginBottom: '16px' }}>Hourly Earnings & Deliveries</strong>
                        <div style={{ height: '300px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                              { hour: '8 AM', earnings: 150, orders: 1 },
                              { hour: '10 AM', earnings: 380, orders: 2 },
                              { hour: '12 PM', earnings: 180, orders: 1 },
                              { hour: '2 PM', earnings: 420, orders: 2 },
                              { hour: '4 PM', earnings: 120, orders: 1 },
                              { hour: '6 PM', earnings: 500, orders: 1 },
                              { hour: '8 PM', earnings: 100, orders: 0 }
                            ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#FF2E83" stopOpacity={0.18}/>
                                  <stop offset="95%" stopColor="#FF2E83" stopOpacity={0.01}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : '#E8EDF5'} />
                              <XAxis dataKey="hour" stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} />
                              <YAxis stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => '₹' + v} />
                              <RechartsTooltip cursor={{ stroke: '#FF2E83', strokeWidth: 1, strokeDasharray: '4 4' }} />
                              <Area type="monotone" dataKey="earnings" stroke="#FF2E83" strokeWidth={3} fillOpacity={1} fill="url(#colorDaily)" dot={{ r: 4, stroke: '#FF2E83', strokeWidth: 2, fill: pCardBg }} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Daily Breakdown Donut */}
                      <div className="glass-card-no-hover earnings-glass-card" style={{ height: '400px' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block' }}>Daily Earnings Source</strong>
                        <div style={{ position: 'relative', width: '100%', height: '180px', margin: '12px 0' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Base Commission', value: 1200, color: '#7A3EF0' },
                                  { name: 'Tips', value: 200, color: '#3B82F6' },
                                  { name: 'Milestone Bonus', value: 150, color: '#22C55E' },
                                  { name: 'Surge Pay', value: 200, color: '#FF9F43' },
                                  { name: 'Adjustments', value: 100, color: '#00D8F6' }
                               ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={68}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {[
                                  { color: '#7A3EF0' },
                                  { color: '#3B82F6' },
                                  { color: '#22C55E' },
                                  { color: '#FF9F43' },
                                  { color: '#00D8F6' }
                                ].map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block' }}>Daily Total</span>
                            <strong style={{ fontSize: '18px', color: colorTextPrimary, fontWeight: '700' }}>₹1,850</strong>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                          {[
                            { name: 'Base', val: '₹1,200', pct: '65%', color: '#7A3EF0' },
                            { name: 'Surge & Tips', val: '₹400', pct: '21%', color: '#3B82F6' },
                            { name: 'Incentives', val: '₹250', pct: '14%', color: '#22C55E' }
                          ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color }}></span>
                                <span style={{ color: colorTextSecondary }}>{item.name}</span>
                              </div>
                              <span style={{ color: colorTextPrimary, fontWeight: '600' }}>{item.val} ({item.pct})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Timeline and Heatmap Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="earnings-split-grid">
                      {/* Timeline status block */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, display: 'block', marginBottom: '14px' }}>Shift Activity Timeline</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {[
                            { time: "09:00 AM", event: "Shift Started", desc: "Checked in at HSR Layout", status: "online" },
                            { time: "11:30 AM", event: "Busy Hours Spike", desc: "Monsoon surge + rain incentive active", status: "busy" },
                            { time: "01:30 PM", event: "Lunch Break", desc: "Offline for 30 minutes", status: "offline" },
                            { time: "04:00 PM", event: "Shift Ended", desc: "Checked out. Total active 6.3h", status: "online" }
                          ].map((evt, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                              <div style={{ fontSize: '11px', color: colorTextMuted, width: '56px', fontWeight: '600', pt: '2px' }}>{evt.time}</div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ 
                                  width: '10px', 
                                  height: '10px', 
                                  borderRadius: '50%', 
                                  background: evt.status === 'online' ? '#22C55E' : evt.status === 'busy' ? '#FF2E83' : '#6B7280',
                                  zIndex: 2 
                                }}></span>
                                {idx < 3 && <div style={{ width: '2px', flex: 1, background: pBorder, margin: '4px 0' }}></div>}
                              </div>
                              <div style={{ pb: '14px' }}>
                                <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block' }}>{evt.event}</strong>
                                <span style={{ fontSize: '11px', color: colorTextSecondary }}>{evt.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Daily Heatmap Grid */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                          <strong style={{ fontSize: '15px', color: colorTextPrimary }}>Hourly Profitability Heatmap</strong>
                          <span style={{ fontSize: '11px', color: '#FF2E83', fontWeight: 'bold' }}>Peak: 6 PM - 7 PM</span>
                        </div>
                        <div className="earnings-heatmap-grid">
                          {[
                            { h: '09 AM', val: '₹120', lvl: 1 }, { h: '10 AM', val: '₹260', lvl: 3 }, { h: '11 AM', val: '₹140', lvl: 1 }, { h: '12 PM', val: '₹180', lvl: 2 },
                            { h: '01 PM', val: '₹90', lvl: 0 }, { h: '02 PM', val: '₹310', lvl: 4 }, { h: '03 PM', val: '₹110', lvl: 1 }, { h: '04 PM', val: '₹130', lvl: 1 },
                            { h: '05 PM', val: '₹240', lvl: 3 }, { h: '06 PM', val: '₹500', lvl: 4 }, { h: '07 PM', val: '₹410', lvl: 4 }, { h: '08 PM', val: '₹100', lvl: 0 }
                          ].map((cell, idx) => {
                            const opacities = [0.05, 0.15, 0.3, 0.5, 0.8];
                            const isHigh = cell.lvl >= 3;
                            return (
                              <div key={idx} style={{ padding: '10px 4px', border: `1px solid ${pBorder}`, borderRadius: '8px', background: `rgba(255, 46, 131, ${opacities[cell.lvl]})` }}>
                                <span style={{ display: 'block', color: isHigh ? (isDark ? '#fff' : '#881337') : colorTextMuted, fontSize: '9px', fontWeight: '600' }}>{cell.h}</span>
                                <strong style={{ display: 'block', color: isHigh ? (isDark ? '#fff' : '#9f1239') : colorTextPrimary, fontSize: '12px', marginTop: '4px' }}>{cell.val}</strong>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Timeline delivery details table */}
                    <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow }}>
                      <strong style={{ fontSize: '15px', color: colorTextPrimary, display: 'block', textAlign: 'left', marginBottom: '16px' }}>Delivery Timeline Ledger</strong>
                      <div className="earnings-table-container">
                        <table className="earnings-table">
                          <thead>
                            <tr>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Order ID</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Pickup Point</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Drop Destination</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Distance</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Delivery Time</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Amount</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { id: "SB-1024", pick: "Vogue Craft Tailors", drop: "Priya Sharma (Flat 402)", dist: "3.4 km", time: "02:14 PM", amt: 120, status: "Completed" },
                              { id: "SB-1023", pick: "Classic Stitch Studio", drop: "Anil Kumar (Sector 3)", dist: "4.8 km", time: "11:10 AM", amt: 165, status: "Completed" },
                              { id: "SB-1020", pick: "Urban Fabrics Shop", drop: "Ravi Teja (Sector 7)", dist: "2.1 km", time: "09:45 AM", amt: 95, status: "Completed" }
                            ].map((row, idx) => (
                              <tr key={idx}>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: '#FF2E83', fontWeight: '600' }}>{row.id}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary, textAlign: 'left' }}>{row.pick}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary, textAlign: 'left' }}>{row.drop}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextSecondary }}>{row.dist}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextSecondary }}>{row.time}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: '#22C55E', fontWeight: '700' }}>₹{row.amt}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD' }}>
                                  <span style={{ fontSize: '11px', background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', padding: '2px 8px', borderRadius: '8px', fontWeight: 'bold' }}>{row.status}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {/* WEEKLY TAB */}
                {earningsSubTab === 'Weekly' && (
                  <>
                    {/* KPI Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
                      {[
                        { title: "Weekly Earnings", val: "₹11,250", info: "Avg: ₹1,607/day", color: '#FF2E83' },
                        { title: "Weekly Deliveries", val: "58", info: "Avg: 8 orders/day", color: '#3B82F6' },
                        { title: "Online Hours", val: "42.3h", info: "Avg: 6.0h/day", color: '#22C55E' },
                        { title: "Avg. Daily Earnings", val: "₹1,607", info: "Target: ₹1,500/day", color: '#FF9F43' },
                        { title: "Incentive Bonuses", val: "₹1,200", info: "Weekend rush + Streak", color: '#7A3EF0' },
                        { title: "Weekly Target Progress", val: "97%", info: "Goal: 60 deliveries", color: '#00D8F6' }
                      ].map((kpi, idx) => (
                        <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left' }}>
                          <span style={{ fontSize: '11px', color: colorTextMuted, textTransform: 'uppercase', fontWeight: '600' }}>{kpi.title}</span>
                          <h2 style={{ fontSize: '28px', fontWeight: '700', color: kpi.color, margin: '6px 0' }}>{kpi.val}</h2>
                          <span style={{ fontSize: '11px', color: colorTextSecondary }}>{kpi.info}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chart Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="earnings-split-grid">
                      {/* Weekly Earnings trend */}
                      <div className="glass-card-no-hover earnings-glass-card" style={{ height: '400px' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block', marginBottom: '16px' }}>Weekly Earnings Summary (Mon - Sun)</strong>
                        <div style={{ height: '300px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { day: 'Mon', earnings: 900 },
                              { day: 'Tue', earnings: 1200 },
                              { day: 'Wed', earnings: 1850 },
                              { day: 'Thu', earnings: 1100 },
                              { day: 'Fri', earnings: 1600 },
                              { day: 'Sat', earnings: 2200 },
                              { day: 'Sun', earnings: 1700 }
                            ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : '#E8EDF5'} />
                              <XAxis dataKey="day" stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} />
                              <YAxis stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => '₹' + v} />
                              <RechartsTooltip />
                              <Line type="monotone" dataKey="earnings" stroke="#FF2E83" strokeWidth={3.5} dot={{ r: 4, stroke: '#FF2E83', strokeWidth: 2, fill: pCardBg }} activeDot={{ r: 6 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Daily Online Hours Area */}
                      <div className="glass-card-no-hover earnings-glass-card" style={{ height: '400px' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block', marginBottom: '16px' }}>Daily Active Hours Timeline</strong>
                        <div style={{ height: '300px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                              { day: 'Mon', hours: 5.6 },
                              { day: 'Tue', hours: 6.8 },
                              { day: 'Wed', hours: 6.3 },
                              { day: 'Thu', hours: 5.2 },
                              { day: 'Fri', hours: 7.1 },
                              { day: 'Sat', hours: 8.25 },
                              { day: 'Sun', hours: 6.5 }
                            ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.18}/>
                                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0.01}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : '#E8EDF5'} />
                              <XAxis dataKey="day" stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} />
                              <YAxis stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => v + 'h'} />
                              <RechartsTooltip />
                              <Area type="monotone" dataKey="hours" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" dot={{ r: 4, stroke: '#22C55E', strokeWidth: 2, fill: pCardBg }} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Highlights Cards & Radial progress */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="earnings-stats-grid">
                      {/* Highlight card 1 */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <TrendingUp size={24} style={{ color: '#22C55E' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '11px', color: colorTextMuted, display: 'block', textTransform: 'uppercase', fontWeight: '600' }}>Best Performing Day</span>
                          <strong style={{ fontSize: '20px', color: colorTextPrimary, display: 'block', margin: '2px 0' }}>Saturday</strong>
                          <span style={{ fontSize: '13px', color: '#22C55E', fontWeight: 'bold' }}>₹2,650 earned</span>
                        </div>
                      </div>

                      {/* Highlight card 2 */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <AlertTriangle size={24} style={{ color: '#EF4444' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '11px', color: colorTextMuted, display: 'block', textTransform: 'uppercase', fontWeight: '600' }}>Lowest Earning Day</span>
                          <strong style={{ fontSize: '20px', color: colorTextPrimary, display: 'block', margin: '2px 0' }}>Tuesday</strong>
                          <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 'bold' }}>₹980 earned</span>
                        </div>
                      </div>

                      {/* Goal progress gauge */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 46, 131, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Target size={24} style={{ color: '#FF2E83' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: '11px', color: colorTextMuted, display: 'block', textTransform: 'uppercase', fontWeight: '600' }}>Weekly Goal Progress</span>
                          <strong style={{ fontSize: '20px', color: colorTextPrimary, display: 'block', margin: '2px 0' }}>58 / 60 Orders</strong>
                          <div className="incentive-progress-wrapper" style={{ marginTop: '8px' }}>
                            <div className="incentive-progress-bg">
                              <div className="incentive-progress-fill" style={{ width: '97%', background: '#FF2E83' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary Table */}
                    <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow }}>
                      <strong style={{ fontSize: '15px', color: colorTextPrimary, display: 'block', textAlign: 'left', marginBottom: '16px' }}>Daily Summary Report</strong>
                      <div className="earnings-table-container">
                        <table className="earnings-table">
                          <thead>
                            <tr>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Day</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Orders Completed</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Active Hours</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Bonus & Incentives</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Total Earnings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { date: "Sunday, Jun 21", orders: 8, hours: "6h 20m", bonus: 180, total: 1380 },
                              { date: "Saturday, Jun 20", orders: 12, hours: "8h 15m", bonus: 400, total: 2200 },
                              { date: "Friday, Jun 19", orders: 10, hours: "7h 10m", bonus: 150, total: 1600 },
                              { date: "Thursday, Jun 18", orders: 7, hours: "6h 05m", bonus: 100, total: 1150 },
                              { date: "Wednesday, Jun 17", orders: 6, hours: "5h 40m", bonus: 80, total: 980 }
                            ].map((row, idx) => (
                              <tr key={idx}>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextSecondary, fontWeight: '500' }}>{row.date}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary }}>{row.orders}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary }}>{row.hours}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: '#22C55E', fontWeight: '500' }}>+₹{row.bonus}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: '#22C55E', fontWeight: '700' }}>₹{row.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {/* MONTHLY TAB */}
                {earningsSubTab === 'Monthly' && (
                  <>
                    {/* KPI Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
                      {[
                        { title: "Monthly Earnings", val: "₹48,600", info: "Goal: ₹50,000", color: '#FF2E83' },
                        { title: "Total Orders Completed", val: "224", info: "Avg: 7.5 orders/day", color: '#3B82F6' },
                        { title: "Total Online Hours", val: "168h", info: "Avg: 5.6h/day", color: '#22C55E' },
                        { title: "Highest Earning Day", val: "₹3,200", info: "Sat, Jun 13 Milestone", color: '#FF9F43' },
                        { title: "Average Daily", val: "₹1,620", info: "Target: ₹1,500/day", color: '#7A3EF0' },
                        { title: "Withdrawals Cleared", val: "₹8,500", info: "Pending: ₹0", color: '#00D8F6' }
                      ].map((kpi, idx) => (
                        <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left' }}>
                          <span style={{ fontSize: '11px', color: colorTextMuted, textTransform: 'uppercase', fontWeight: '600' }}>{kpi.title}</span>
                          <h2 style={{ fontSize: '28px', fontWeight: '700', color: kpi.color, margin: '6px 0' }}>{kpi.val}</h2>
                          <span style={{ fontSize: '11px', color: colorTextSecondary }}>{kpi.info}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chart Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="earnings-split-grid">
                      {/* 30 day line chart */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block', marginBottom: '16px' }}>Monthly Revenue trend (Last 30 Days)</strong>
                        <div style={{ height: '300px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { label: 'Jun 1', earnings: 1400 },
                              { label: 'Jun 4', earnings: 1600 },
                              { label: 'Jun 8', earnings: 1200 },
                              { label: 'Jun 11', earnings: 1900 },
                              { label: 'Jun 14', earnings: 2100 },
                              { label: 'Jun 18', earnings: 1350 },
                              { label: 'Jun 21', earnings: 1850 }
                            ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : '#E8EDF5'} />
                              <XAxis dataKey="label" stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} />
                              <YAxis stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => '₹' + v} />
                              <RechartsTooltip />
                              <Line type="monotone" dataKey="earnings" stroke="#FF2E83" strokeWidth={3.5} dot={{ r: 4, stroke: '#FF2E83', strokeWidth: 2, fill: pCardBg }} activeDot={{ r: 6 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Weekly comparison Grouped Bar Chart */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block', marginBottom: '16px' }}>Weekly Performance Comparison</strong>
                        <div style={{ height: '300px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { week: 'Week 1', base: 6800, bonus: 800 },
                              { week: 'Week 2', base: 7200, bonus: 1100 },
                              { week: 'Week 3', base: 8100, bonus: 1300 },
                              { week: 'Week 4', base: 9200, bonus: 1200 }
                            ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : '#E8EDF5'} />
                              <XAxis dataKey="week" stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} />
                              <YAxis stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => '₹' + v} />
                              <RechartsTooltip />
                              <Bar dataKey="base" fill="#7A3EF0" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="bonus" fill="#FF2E83" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Area Performance Horizontal Bars & Calendar Heatmap */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="earnings-split-grid">
                      {/* Area Performance */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, display: 'block', marginBottom: '14px' }}>Area Performance Index</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {[
                            { name: 'HSR Layout', orders: 98, amount: '₹21,120', pct: 85, color: '#FF2E83' },
                            { name: 'Koramangala', orders: 64, amount: '₹13,800', pct: 60, color: '#7A3EF0' },
                            { name: 'Whitefield', orders: 42, amount: '₹9,180', pct: 45, color: '#3B82F6' },
                            { name: 'Indiranagar', orders: 20, amount: '₹4,500', pct: 25, color: '#22C55E' }
                          ].map((area, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '500' }}>
                                <span style={{ color: colorTextPrimary }}>{area.name} ({area.orders} orders)</span>
                                <strong style={{ color: colorTextPrimary }}>{area.amount}</strong>
                              </div>
                              <div className="incentive-progress-bg">
                                <div className="incentive-progress-fill" style={{ width: `${area.pct}%`, background: area.color }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Calendar Heatmap */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                          <strong style={{ fontSize: '15px', color: colorTextPrimary }}>June 2026 Earnings Calendar</strong>
                          <span style={{ fontSize: '11px', color: colorTextMuted }}>Darker pink = High earnings</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
                          {Array.from({ length: 30 }).map((_, idx) => {
                            const intensities = [2, 1, 0, 3, 2, 1, 4, 3, 2, 0, 1, 3, 4, 2, 2, 1, 0, 3, 2, 1, 4, 3, 2, 1, 2, 4, 3, 1, 2, 3];
                            const opacity = intensities[idx % intensities.length] * 0.2 + 0.15;
                            return (
                              <div 
                                key={idx} 
                                style={{ 
                                  aspectRatio: '1', 
                                  borderRadius: '6px', 
                                  background: `rgba(255, 46, 131, ${opacity})`, 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  fontSize: '10px', 
                                  fontWeight: 'bold', 
                                  color: intensities[idx % intensities.length] >= 3 ? '#ffffff' : colorTextPrimary,
                                  border: `1px solid ${pBorder}`
                                }}
                              >
                                {idx + 1}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Table Summary */}
                    <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow }}>
                      <strong style={{ fontSize: '15px', color: colorTextPrimary, display: 'block', textAlign: 'left', marginBottom: '16px' }}>Monthly Statements Report</strong>
                      <div className="earnings-table-container">
                        <table className="earnings-table">
                          <thead>
                            <tr>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Period</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Orders Completed</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Active Hours</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Base Earnings</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Bonus & Incentives</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Total Earnings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { label: "Jun 21 - Jun 27 (Week 25)", orders: 58, hours: "42h 18m", base: 7200, bonus: 1200, total: 11250 },
                              { label: "Jun 14 - Jun 20 (Week 24)", orders: 65, hours: "48h 10m", base: 8100, bonus: 1300, total: 12800 },
                              { label: "Jun 07 - Jun 13 (Week 23)", orders: 48, hours: "38h 05m", base: 6300, bonus: 980, total: 9500 },
                              { label: "May 01 - May 31 (May Cycle)", orders: 210, hours: "162h 12m", base: 26000, bonus: 4200, total: 45200 }
                            ].map((row, idx) => (
                              <tr key={idx}>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextSecondary, fontWeight: '500' }}>{row.label}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary }}>{row.orders}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary }}>{row.hours}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary }}>₹{row.base}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: '#22C55E', fontWeight: '500' }}>+₹{row.bonus}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: '#22C55E', fontWeight: '700' }}>₹{row.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {/* INCENTIVES TAB */}
                {earningsSubTab === 'Incentives' && (
                  <>
                    {/* KPI Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
                      {[
                        { title: "Total Incentives Earned", val: "₹4,000", info: "Weekend + streak payouts", color: '#FF2E83' },
                        { title: "Unlocked & Paid", val: "₹3,200", info: "Cleared in statements", color: '#3B82F6' },
                        { title: "Pending Settlement", val: "₹800", info: "Processing for Friday", color: '#22C55E' },
                        { title: "Milestones Completed", val: "3 / 4", info: "Streak target achieved", color: '#FF9F43' },
                        { title: "Next Milestone Reward", val: "₹500", info: "Requires 2 more orders", color: '#7A3EF0' }
                      ].map((kpi, idx) => (
                        <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left' }}>
                          <span style={{ fontSize: '11px', color: colorTextMuted, textTransform: 'uppercase', fontWeight: '600' }}>{kpi.title}</span>
                          <h2 style={{ fontSize: '28px', fontWeight: '700', color: kpi.color, margin: '6px 0' }}>{kpi.val}</h2>
                          <span style={{ fontSize: '11px', color: colorTextSecondary }}>{kpi.info}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chart Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="earnings-split-grid">
                      {/* Incentives Trend Line */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block', marginBottom: '16px' }}>Milestone Incentive Cash History</strong>
                        <div style={{ height: '300px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { label: 'Week 21', incentives: 400 },
                              { label: 'Week 22', incentives: 600 },
                              { label: 'Week 23', incentives: 980 },
                              { label: 'Week 24', incentives: 1300 },
                              { label: 'Week 25', incentives: 1200 }
                            ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : '#E8EDF5'} />
                              <XAxis dataKey="label" stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} />
                              <YAxis stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => '₹' + v} />
                              <RechartsTooltip />
                              <Line type="monotone" dataKey="incentives" stroke="#7A3EF0" strokeWidth={3.5} dot={{ r: 4, stroke: '#7A3EF0', strokeWidth: 2, fill: pCardBg }} activeDot={{ r: 6 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Donut Chart: Types of Incentives */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block' }}>Incentive Distribution</strong>
                        <div style={{ position: 'relative', width: '100%', height: '180px', margin: '12px 0' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Weekend Rush', value: 1800, color: '#FF2E83' },
                                  { name: 'Streak Bonus', value: 1200, color: '#7A3EF0' },
                                  { name: 'Peak Hours', value: 600, color: '#FF9F43' },
                                  { name: 'Referrals', value: 400, color: '#3B82F6' }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={68}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {[
                                  { color: '#FF2E83' },
                                  { color: '#7A3EF0' },
                                  { color: '#FF9F43' },
                                  { color: '#3B82F6' }
                                ].map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block' }}>Incentives</span>
                            <strong style={{ fontSize: '18px', color: colorTextPrimary, fontWeight: '700' }}>₹4,000</strong>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                          {[
                            { name: 'Weekend Rush', val: '₹1,800', pct: '45%', color: '#FF2E83' },
                            { name: 'Streak Bonus', val: '₹1,200', pct: '30%', color: '#7A3EF0' },
                            { name: 'Peak & Referrals', val: '₹1,000', pct: '25%', color: '#3B82F6' }
                          ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color }}></span>
                                <span style={{ color: colorTextSecondary }}>{item.name}</span>
                              </div>
                              <span style={{ color: colorTextPrimary, fontWeight: '600' }}>{item.val} ({item.pct})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress Cards & Milestone timeline */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }} className="earnings-split-grid">
                      {/* Milestones in detail */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary }}>Milestone Challenge Trackers</strong>
                        
                        {[
                          { title: "Weekend Rush Bonus", progress: "₹150 / ₹200", pct: 75, desc: "Complete 15 weekend deliveries", color: '#FF2E83' },
                          { title: "Order Streak Bonus", progress: "58 / 60 orders", pct: 97, desc: "Weekly consistent deliveries target", color: '#FF9F43' },
                          { title: "Referral Bonus payout", progress: "1 / 2 riders active", pct: 50, desc: "Refer other riders to join StitchBee", color: '#7A3EF0' }
                        ].map((mil, idx) => (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                              <div>
                                <strong style={{ color: colorTextPrimary, display: 'block' }}>{mil.title}</strong>
                                <span style={{ fontSize: '10px', color: colorTextMuted }}>{mil.desc}</span>
                              </div>
                              <strong style={{ color: colorTextPrimary }}>{mil.progress} ({mil.pct}%)</strong>
                            </div>
                            <div className="incentive-progress-bg">
                              <div className="incentive-progress-fill" style={{ width: `${mil.pct}%`, background: mil.color }}></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Milestone timeline instructions */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, display: 'block', marginBottom: '14px' }}>Upcoming Milestone Rewards</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {[
                            { title: "Complete 2 more orders", reward: "Earn ₹500 Consistency Bonus", step: "Milestone 4", active: true },
                            { title: "Deliver 4 Peak Hour orders", reward: "Unlock ₹150 Peak hour bonus", step: "Milestone 5", active: false },
                            { title: "Complete Referral 2", reward: "Earn ₹1,000 payout once rider delivers 10 orders", step: "Milestone 6", active: false }
                          ].map((tline, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: tline.active ? 'rgba(255, 46, 131, 0.1)' : pBackground, border: `1.5px solid ${tline.active ? '#FF2E83' : pBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <strong style={{ fontSize: '13px', color: tline.active ? '#FF2E83' : colorTextMuted }}>{idx + 1}</strong>
                              </div>
                              <div>
                                <strong style={{ fontSize: '13px', color: tline.active ? '#FF2E83' : colorTextPrimary, display: 'block' }}>{tline.title}</strong>
                                <span style={{ fontSize: '11px', color: colorTextSecondary }}>{tline.reward}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Incentive history table */}
                    <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow }}>
                      <strong style={{ fontSize: '15px', color: colorTextPrimary, display: 'block', textAlign: 'left', marginBottom: '16px' }}>Incentives Payout History</strong>
                      <div className="earnings-table-container">
                        <table className="earnings-table">
                          <thead>
                            <tr>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Date</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Incentive Category</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Milestone Target</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Amount</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { date: "June 21, 2026", type: "Weekend Rush Bonus", desc: "15 Deliveries completed", amt: 200, status: "Settled" },
                              { date: "June 19, 2026", type: "Weekly Consistency Bonus", desc: "50 Deliveries achieved", amt: 500, status: "Settled" },
                              { date: "June 17, 2026", type: "Monsoon Surge Payout", desc: "Heavy rain hour bonus", amt: 100, status: "Settled" },
                              { date: "June 12, 2026", type: "Rider Referral Bonus", desc: "Rider R-9021 first milestone", amt: 1000, status: "Settled" }
                            ].map((row, idx) => (
                              <tr key={idx}>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextSecondary, fontWeight: '500' }}>{row.date}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary, fontWeight: '600' }}>{row.type}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextSecondary, textAlign: 'left' }}>{row.desc}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: '#22C55E', fontWeight: '700' }}>+₹{row.amt}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD' }}>
                                  <span style={{ fontSize: '11px', background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', padding: '2px 8px', borderRadius: '8px', fontWeight: 'bold' }}>{row.status}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {/* ADJUSTMENTS TAB */}
                {earningsSubTab === 'Adjustments' && (
                  <>
                    {/* KPI Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                      {[
                        { title: "Total Credits", val: "₹240", info: "Tip + Toll Reimbursements", color: '#22C55E' },
                        { title: "Total Debits", val: "-₹2,500", info: "Wallet withdraw payouts", color: '#FF2E83' },
                        { title: "Penalties Deducted", val: "-₹50", info: "Late cancellation order SB-1011", color: '#EF4444' },
                        { title: "Net Adjustments Ledger", val: "-₹2,310", info: "Debited from available balance", color: '#7A3EF0' }
                      ].map((kpi, idx) => (
                        <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, textAlign: 'left' }}>
                          <span style={{ fontSize: '11px', color: colorTextMuted, textTransform: 'uppercase', fontWeight: '600' }}>{kpi.title}</span>
                          <h2 style={{ fontSize: '28px', fontWeight: '700', color: kpi.color, margin: '6px 0' }}>{kpi.val}</h2>
                          <span style={{ fontSize: '11px', color: colorTextSecondary }}>{kpi.info}</span>
                        </div>
                      ))}
                    </div>

                    {/* Chart Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="earnings-split-grid">
                      {/* Stacked credits vs debits chart */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block', marginBottom: '16px' }}>Credits vs Debits (Daily Breakdown)</strong>
                        <div style={{ height: '300px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { name: 'Mon', credits: 120, debits: -2000 },
                              { name: 'Tue', credits: 40, debits: 0 },
                              { name: 'Wed', credits: 35, debits: 0 },
                              { name: 'Thu', credits: 0, debits: -500 },
                              { name: 'Fri', credits: 95, debits: 0 }
                            ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : '#E8EDF5'} />
                              <XAxis dataKey="name" stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} />
                              <YAxis stroke={colorTextMuted} fontSize={11} tickLine={false} axisLine={false} />
                              <RechartsTooltip />
                              <Bar dataKey="credits" fill="#22C55E" stackId="a" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="debits" fill="#FF2E83" stackId="a" radius={[0, 0, 4, 4]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Donut Chart: Adjustment Categories */}
                      <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                        <strong style={{ fontSize: '15px', color: colorTextPrimary, textAlign: 'left', display: 'block' }}>Adjustment Distribution</strong>
                        <div style={{ position: 'relative', width: '100%', height: '180px', margin: '12px 0' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Manual Refund', value: 100, color: '#22C55E' },
                                  { name: 'Penalties', value: 50, color: '#EF4444' },
                                  { name: 'Toll fare Reimbursement', value: 90, color: '#3B82F6' },
                                  { name: 'Tips Payout', value: 40, color: '#FF9F43' }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={68}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {[
                                  { color: '#22C55E' },
                                  { color: '#EF4444' },
                                  { color: '#3B82F6' },
                                  { color: '#FF9F43' }
                                ].map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block' }}>Adj Count</span>
                            <strong style={{ fontSize: '18px', color: colorTextPrimary, fontWeight: '700' }}>4 txs</strong>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                          {[
                            { name: 'Reimbursements', val: '₹190', color: '#3B82F6' },
                            { name: 'Tips Payout', val: '₹40', color: '#FF9F43' },
                            { name: 'Penalties', val: '-₹50', color: '#EF4444' }
                          ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color }}></span>
                                <span style={{ color: colorTextSecondary }}>{item.name}</span>
                              </div>
                              <span style={{ color: colorTextPrimary, fontWeight: '600' }}>{item.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Adjustments table */}
                    <div className="glass-card-no-hover" style={{ padding: '24px', background: pCardBg, border: `1.5px solid ${pBorder}`, borderRadius: '18px', boxShadow: pCardShadow }}>
                      <strong style={{ fontSize: '15px', color: colorTextPrimary, display: 'block', textAlign: 'left', marginBottom: '16px' }}>Adjustments ledger transactions</strong>
                      <div className="earnings-table-container">
                        <table className="earnings-table">
                          <thead>
                            <tr>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Adjustment ID</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Date</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Description</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Type</th>
                              <th style={{ background: pCardBg, borderColor: pBorder, color: colorTextMuted }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { id: "ADJ-9042", date: "June 21, 2026", desc: "Toll fee reimbursement for delivery #SB-1024", type: "Reimbursement", amt: 50, color: '#22C55E' },
                              { id: "ADJ-9039", date: "June 20, 2026", desc: "Customer tip payout (Order #SB-1024)", type: "Tip", amt: 40, color: '#22C55E' },
                              { id: "ADJ-9035", date: "June 19, 2026", desc: "Order cancellation fee adjustment (Order SB-1011)", type: "Penalty", amt: -50, color: '#FF2E83' },
                              { id: "ADJ-9031", date: "June 17, 2026", desc: "Monsoon delay compensation incentive", type: "Surge pay", amt: 100, color: '#22C55E' }
                            ].map((row, idx) => (
                              <tr key={idx}>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextSecondary, fontWeight: '500' }}>{row.id}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary }}>{row.date}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextPrimary, textAlign: 'left' }}>{row.desc}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: colorTextSecondary }}>{row.type}</td>
                                <td style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : '#FAFBFD', color: row.amt < 0 ? '#FF2E83' : '#22C55E', fontWeight: '700' }}>
                                  {row.amt < 0 ? `-₹${Math.abs(row.amt)}` : `+₹${row.amt}`}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODULE 5: SUPPORT AND LIVE CHAT CENTER */}
        {activeTab === 'support' && (
          <div className={`support-desk-grid view-${supportMobileView}`}>
            {/* COLUMN 1: LEFT CONVERSATIONS SIDEBAR */}
            <div className="support-sidebar" style={{ borderRight: `1.5px solid ${pBorder}`, background: isDark ? '#0b0914' : '#F8FAF9' }}>
              {/* Search bar header */}
              <div style={{ padding: '16px', borderBottom: `1.5px solid ${pBorder}` }}>
                <strong style={{ fontSize: '15px', color: colorTextPrimary, display: 'block', marginBottom: '10px', textAlign: 'left' }}>Support Center</strong>
                <input 
                  type="text" 
                  placeholder="Search chats, tickets..." 
                  style={{ width: '100%', padding: '8px 12px', fontSize: '13px', borderRadius: '10px', background: pCardBg, border: `1px solid ${pBorder}`, color: colorTextPrimary, outline: 'none' }}
                />
              </div>

              {/* Chat list viewport */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
                {/* ACTIVE DELIVERY SECTION */}
                <div style={{ padding: '0 16px 8px 16px', fontSize: '11px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>
                  Active Delivery
                </div>
                
                {[
                  { id: 'customer', name: 'Priya Sharma', role: 'Customer', desc: 'Waiting for OTP', time: '2 mins ago', unread: 1, online: true },
                  { id: 'tailor', name: 'Vogue Craft Tailors', role: 'Tailor', desc: 'Package Ready', time: '10 mins ago', unread: 0, online: true },
                  { id: 'admin', name: 'StitchBee Admin', role: 'Platform Help', desc: 'Responded', time: 'Yesterday', unread: 0, online: false },
                  { id: 'ai', name: 'AI Route Assistant', role: 'AI Assist', desc: 'Suggests faster routes', time: 'Today', unread: 0, online: true }
                ].map(ch => {
                  const isActive = supportContact === ch.id;
                  let badgeBg = 'rgba(255, 46, 131, 0.1)';
                  let badgeColor = '#FF2E83';
                  if (ch.id === 'tailor') { badgeBg = 'rgba(122, 62, 240, 0.1)'; badgeColor = '#7A3EF0'; }
                  if (ch.id === 'admin') { badgeBg = 'rgba(59, 130, 246, 0.1)'; badgeColor = '#3B82F6'; }
                  if (ch.id === 'ai') { badgeBg = 'rgba(34, 197, 94, 0.1)'; badgeColor = '#22C55E'; }

                  return (
                    <div 
                      key={ch.id}
                      onClick={() => {
                        setSupportContact(ch.id);
                        setSupportMobileView('chat');
                      }}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        background: isActive ? (isDark ? 'rgba(255,255,255,0.03)' : '#EFF6FF') : 'transparent',
                        borderLeft: `3px solid ${isActive ? '#FF2E83' : 'transparent'}`,
                        transition: 'all 0.2s',
                        textAlign: 'left'
                      }}
                    >
                      {/* Avatar */}
                      <div style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '50%', background: badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: badgeColor, flexShrink: 0 }}>
                        {ch.name.split(' ').map(n => n[0]).join('')}
                        {/* Online Indicator dot */}
                        <span style={{ position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', borderRadius: '50%', background: ch.online ? '#22C55E' : '#6B7280', border: `2px solid ${isActive ? (isDark ? '#120f26' : '#EFF6FF') : (isDark ? '#0b0914' : '#F8FAF9')}` }}></span>
                      </div>
                      
                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                          <strong style={{ fontSize: '13px', color: colorTextPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ch.name}</strong>
                          <span style={{ fontSize: '10px', color: colorTextMuted }}>{ch.time}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: colorTextSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ch.desc}</span>
                          <span style={{ fontSize: '9px', fontWeight: 'bold', background: badgeBg, color: badgeColor, padding: '1px 6px', borderRadius: '6px', marginLeft: '6px', flexShrink: 0 }}>{ch.role}</span>
                        </div>
                      </div>

                      {/* Unread badge */}
                      {ch.unread > 0 && (
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#FF2E83', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', flexShrink: 0, alignSelf: 'center' }}>
                          {ch.unread}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* ARCHIVED / RECENT VIEW CATEGORIES */}
                <div style={{ marginTop: '20px', padding: '0 16px 8px 16px', fontSize: '11px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left' }}>
                  History & Filters
                </div>
                {[
                  { label: 'Yesterday Conversations', count: 3 },
                  { label: 'Unread Chats Only', count: 1 },
                  { label: 'Closed Support Tickets', count: 12 },
                  { label: 'Archived Messages', count: 0 }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 16px',
                      fontSize: '12px',
                      color: colorTextSecondary,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => alert(`Showing history category: ${item.label}`)}
                  >
                    <span>{item.label}</span>
                    <span style={{ fontSize: '10px', background: pBorder, padding: '2px 6px', borderRadius: '8px', color: colorTextMuted }}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: CENTER CHAT COLUMN */}
            <div className="support-chat-col">
              {/* TOP TOOLBAR */}
              <div 
                className="support-chat-toolbar"
                style={{ 
                  borderBottom: `1.5px solid ${pBorder}`, 
                  background: isDark ? 'rgba(255,255,255,0.01)' : '#ffffff' 
                }}
              >
                <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Mobile Back Button to Chat list */}
                  <button 
                    className="mobile-only-btn" 
                    onClick={() => setSupportMobileView('list')}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#FF2E83', 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      marginRight: '8px', 
                      cursor: 'pointer',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    ←
                  </button>
                  <div className="support-chat-toolbar-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '15px', color: colorTextPrimary }}>
                        {supportContact === 'customer' ? 'Customer Thread' : supportContact === 'tailor' ? 'Tailor Desk' : supportContact === 'admin' ? 'StitchBee Admin' : 'Route AI Assistant'}
                      </strong>
                      <span style={{ fontSize: '11px', background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                        In Transit • Order #SB-1024
                      </span>
                    </div>
                    <span className="support-chat-toolbar-subtitle" style={{ fontSize: '12px', color: colorTextSecondary }}>
                      Pickup: Vogue Craft Tailors • Delivery: Priya Sharma • ETA: 12 mins
                    </span>
                  </div>
                </div>

                {/* Quick actions on Toolbar */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button 
                    onClick={() => alert("Calling customer...")}
                    className="btn btn-secondary" 
                    style={{ fontSize: '12px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Phone size={13} style={{ color: '#FF2E83' }} /> 
                    <span className="mobile-hide">Call Customer</span>
                  </button>
                  <button 
                    onClick={() => alert("Opening order details...")}
                    className="btn btn-secondary mobile-hide" 
                    style={{ fontSize: '12px', padding: '6px 12px' }}
                  >
                    View Order
                  </button>
                  
                  {/* Mobile Details button */}
                  <button 
                    className="mobile-only-btn btn btn-secondary" 
                    onClick={() => setSupportMobileView('info')}
                    style={{ fontSize: '12px', padding: '6px 12px' }}
                  >
                    Info ⓘ
                  </button>
                </div>
              </div>

              {/* CHAT MESSAGES TIMELINE */}
              <div 
                className="support-chat-feed"
                style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {(chatHistory[supportContact] || []).map((msg, idx) => {
                  const isRider = msg.sender === 'rider';
                  
                  // Color backgrounds based on sender
                  let msgBg = isDark ? 'rgba(255,255,255,0.04)' : '#F3F4F6';
                  let textColor = colorTextPrimary;
                  let borderStyle = `1px solid ${pBorder}`;

                  if (isRider) {
                    msgBg = 'linear-gradient(135deg, #7A3EF0, #FF2E83)';
                    textColor = '#ffffff';
                    borderStyle = 'none';
                  } else if (msg.sender === 'tailor') {
                    msgBg = isDark ? 'rgba(122, 62, 240, 0.12)' : '#F5F3FF';
                    borderStyle = isDark ? '1px solid rgba(122, 62, 240, 0.3)' : '1px solid #DDD6FE';
                  } else if (msg.sender === 'admin') {
                    msgBg = isDark ? 'rgba(59, 130, 246, 0.12)' : '#EFF6FF';
                    borderStyle = isDark ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid #BFDBFE';
                  } else if (msg.sender === 'system') {
                    msgBg = isDark ? 'rgba(234, 179, 8, 0.08)' : '#FEFCBF';
                    borderStyle = isDark ? '1px solid rgba(234, 179, 8, 0.2)' : '1px solid #FEF08A';
                  } else if (msg.sender === 'ai') {
                    msgBg = isDark ? 'rgba(34, 197, 94, 0.12)' : '#F0FDF4';
                    borderStyle = isDark ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid #BBF7D0';
                  }

                  return (
                    <div 
                      key={idx} 
                      style={{ 
                        alignSelf: isRider ? 'flex-end' : 'flex-start', 
                        maxWidth: '75%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isRider ? 'flex-end' : 'flex-start'
                      }}
                    >
                      {/* Sender details and initials */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: colorTextSecondary }}>
                          {isRider ? 'Rajesh Rider (You)' : msg.sender.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '10px', color: colorTextMuted }}>{msg.time}</span>
                      </div>

                      {/* Message container bubble */}
                      <div 
                        style={{ 
                          padding: '12px 16px', 
                          borderRadius: '16px', 
                          fontSize: '13.5px',
                          background: msgBg,
                          color: textColor,
                          border: borderStyle,
                          textAlign: 'left',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                        }}
                      >
                        {/* Render standard text */}
                        {msg.type === 'text' && <span>{msg.text}</span>}

                        {/* Render location pins */}
                        {msg.type === 'location' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <MapPin size={16} style={{ color: isRider ? '#fff' : '#FF2E83' }} />
                              <strong>Location Shared</strong>
                            </div>
                            <span style={{ fontSize: '12px', opacity: 0.9 }}>{msg.mapName} ({msg.location})</span>
                            <button 
                              onClick={() => alert(`Navigating to ${msg.location}...`)}
                              style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', color: isRider ? '#fff' : colorTextPrimary, fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}
                            >
                              Navigate to Pin
                            </button>
                          </div>
                        )}

                        {/* Render invoice images */}
                        {msg.type === 'image' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <img src={msg.imgUrl} alt={msg.caption} style={{ width: '100%', maxHeight: '160px', borderRadius: '10px', objectFit: 'cover' }} />
                            <span style={{ fontSize: '11px', opacity: 0.9 }}>{msg.caption}</span>
                          </div>
                        )}

                        {/* Render system updates */}
                        {msg.type === 'system' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontStyle: 'italic' }}>
                            <Info size={14} style={{ color: isDark ? '#FACC15' : '#CA8A04' }} />
                            <span>{msg.text}</span>
                          </div>
                        )}

                        {/* Render AI suggestion boxes */}
                        {msg.type === 'ai' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22C55E' }}>
                              <Sparkles size={14} />
                              <strong>AI Suggestion</strong>
                            </div>
                            <span>{msg.text}</span>
                          </div>
                        )}
                      </div>

                      {/* Read status and checkmark */}
                      {isRider && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '10px', color: colorTextMuted }}>
                          <span>Read Receipts</span>
                          <CheckCircle size={10} style={{ color: '#22C55E' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* SMART SUGGESTIONS PANEL */}
              <div 
                style={{ 
                  padding: '8px 16px', 
                  borderTop: `1.5px solid ${pBorder}`, 
                  background: isDark ? 'rgba(255,255,255,0.01)' : '#FAFBF9',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {[
                    "Running 5 mins late", 
                    "Reached Pickup", 
                    "Package Collected", 
                    "Reached Destination", 
                    "Need OTP", 
                    "Delivery Completed", 
                    "Traffic Delay"
                  ].map((suggestion, idx) => (
                    <button 
                      key={idx}
                      onClick={() => sendSmartMessage(suggestion)}
                      className="btn btn-secondary"
                      style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '14px', whiteSpace: 'nowrap', borderColor: '#FF2E83', color: '#FF2E83', fontWeight: '500' }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* MESSAGE COMPOSER INPUT BOX */}
              <div className="support-chat-input-wrapper" style={{ borderTop: `1.5px solid ${pBorder}` }}>
                <div className="support-chat-input-row">
                  {/* Action icons */}
                  <div className="support-input-icons" style={{ display: 'flex', gap: '8px', color: colorTextMuted }}>
                    <Paperclip size={18} style={{ cursor: 'pointer' }} onClick={() => alert("Upload generic files...")} />
                    <Smile className="smile-icon" size={18} style={{ cursor: 'pointer' }} onClick={() => alert("Open emoji panel...")} />
                    <Camera size={18} style={{ cursor: 'pointer' }} onClick={() => alert("Open camera device...")} />
                    <Mic className="mic-icon" size={18} style={{ cursor: 'pointer' }} onClick={() => alert("Record voice note...")} />
                  </div>

                  {/* Input field */}
                  <input 
                    type="text" 
                    placeholder="Type message..." 
                    className="form-input" 
                    value={typedMessage} 
                    onChange={e => setTypedMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    style={{ flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '12px', background: pBackground, border: `1.5px solid ${pBorder}`, color: colorTextPrimary, outline: 'none' }}
                  />

                  {/* Send Button */}
                  <button 
                    onClick={handleSendMessage}
                    style={{ 
                      background: 'linear-gradient(135deg, #7A3EF0, #FF2E83)', 
                      border: 'none', 
                      width: '38px', 
                      height: '38px', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#ffffff',
                      cursor: 'pointer' 
                    }}
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMN 3: RIGHT INFORMATION PANEL */}
            <div className="support-right-panel" style={{ borderLeft: `1.5px solid ${pBorder}` }}>
              {/* Tab options headers */}
              <div style={{ display: 'flex', borderBottom: `1.5px solid ${pBorder}`, alignItems: 'center' }}>
                {/* Mobile Back Button to Chat view */}
                <button 
                  className="mobile-only-btn" 
                  onClick={() => setSupportMobileView('chat')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#FF2E83', 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    padding: '0 12px', 
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ←
                </button>
                
                <div style={{ display: 'flex', flex: 1 }}>
                  {[
                    { id: 'order', label: 'Order' },
                    { id: 'faq', label: 'FAQ' },
                    { id: 'analytics', label: 'Stats' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setRightPanelTab(tab.id)}
                      style={{
                        flex: 1,
                        padding: '12px 4px',
                        background: 'none',
                        border: 'none',
                        borderBottom: `2.5px solid ${rightPanelTab === tab.id ? '#FF2E83' : 'transparent'}`,
                        color: rightPanelTab === tab.id ? '#FF2E83' : colorTextSecondary,
                        fontWeight: rightPanelTab === tab.id ? '700' : '500',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport for tab contents */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', textAlign: 'left' }}>
                {/* TAB 1: ORDER & TICKET INFO */}
                {rightPanelTab === 'order' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Order Details block */}
                    <div>
                      <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block', marginBottom: '8px' }}>Active Order Details</strong>
                      <div style={{ padding: '12px', borderRadius: '12px', background: pBackground, border: `1px solid ${pBorder}`, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Order ID</span> <strong>#SB-1024</strong></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Status</span> <strong style={{ color: '#FF2E83' }}>In Transit</strong></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Distance</span> <strong>3.2 KM</strong></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>ETA</span> <strong>12 mins</strong></div>
                      </div>
                    </div>

                    {/* Timeline block */}
                    <div>
                      <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block', marginBottom: '8px' }}>Delivery Tracking Timeline</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px', paddingLeft: '4px' }}>
                        {[
                          { title: "Assigned", desc: "Checked in order • 10:15 AM", done: true },
                          { title: "Reached Tailor Store", desc: "Arrived at pickup • 10:32 AM", done: true },
                          { title: "Picked Up package", desc: "Invoice checked & bag collected • 10:45 AM", done: true },
                          { title: "Reached Customer", desc: "Navigating to Golden Heights • In Transit", done: false, active: true },
                          { title: "Delivered", desc: "Pending OTP confirmation", done: false }
                        ].map((step, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <span style={{ 
                                width: '10px', 
                                height: '10px', 
                                borderRadius: '50%', 
                                background: step.done ? '#22C55E' : step.active ? '#FF2E83' : '#6B7280'
                              }}></span>
                              {idx < 4 && <div style={{ width: '1.5px', flex: 1, background: pBorder, margin: '2px 0' }}></div>}
                            </div>
                            <div>
                              <strong style={{ color: step.active ? '#FF2E83' : colorTextPrimary, display: 'block' }}>{step.title}</strong>
                              <span style={{ color: colorTextSecondary, fontSize: '10px' }}>{step.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Support Ticket details */}
                    <div>
                      <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block', marginBottom: '8px' }}>Support Ticket Details</strong>
                      <div style={{ padding: '12px', borderRadius: '12px', background: pBackground, border: `1px solid ${pBorder}`, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Ticket ID</span> <strong>#TKT-9082</strong></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Status</span> <strong style={{ color: '#22C55E' }}>Open</strong></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Priority</span> <strong style={{ color: '#EF4444' }}>High</strong></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Expected response</span> <strong>5 mins</strong></div>
                      </div>
                    </div>

                    {/* AI Route advisor advice */}
                    <div>
                      <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block', marginBottom: '8px' }}>AI Advisor Insights</strong>
                      <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px', color: colorTextSecondary }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: '#22C55E', fontWeight: 'bold' }}>
                          <Sparkles size={12} />
                          <span>Alternative Route</span>
                        </div>
                        <span>Heavy congestion on Main road. Detour via 12th Cross road avoids traffic signal and saves 8 minutes.</span>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block', marginBottom: '4px' }}>Internal Notes (Admin Only)</strong>
                      <span style={{ fontSize: '11px', color: colorTextMuted }}>Rider reported severe monsoon rain delay during order collection.</span>
                    </div>
                  </div>
                )}

                {/* TAB 2: FAQ & SOS EMERGENCY */}
                {rightPanelTab === 'faq' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* FAQ accordion */}
                    <div>
                      <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block', marginBottom: '8px' }}>Rider FAQ Center</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                          { q: "How is weekly payout calculated?", a: "Weekly payouts are calculated every Monday and credited on Friday. They include base fare + surge + incentives minus any deductions." },
                          { q: "How do I withdraw cash?", a: "Go to your Wallet dashboard, enter withdrawal amount, and click Withdraw. Instant transfers to your bank account are available." },
                          { q: "What if customer is not sharing OTP?", a: "If the customer is unavailable or refuses to share the OTP, contact support immediately or mark as 'Customer Not Responding' via quick actions." },
                          { q: "GPS route shows wrong direction", a: "Use the built-in AI Route Assistant in chat or use Google Maps. Report map inaccuracies in the support ticket center." }
                        ].map((faq, idx) => {
                          const isOpen = faqOpenIdx === idx;
                          return (
                            <div key={idx} style={{ border: `1px solid ${pBorder}`, borderRadius: '8px', overflow: 'hidden' }}>
                              <div 
                                onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                                style={{ padding: '10px 12px', background: pBackground, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: colorTextPrimary }}
                              >
                                <span>{faq.q}</span>
                                <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                              </div>
                              {isOpen && (
                                <div style={{ padding: '10px 12px', fontSize: '11.5px', color: colorTextSecondary, borderTop: `1px solid ${pBorder}`, background: pCardBg }}>
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* SOS section */}
                    <div style={{ borderTop: `1.5px solid ${pBorder}`, paddingTop: '16px' }}>
                      <strong style={{ fontSize: '13px', color: '#EF4444', display: 'block', marginBottom: '8px' }}>Emergency SOS Dispatcher</strong>
                      <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.05)', border: '1.5px solid rgba(239, 68, 68, 0.2)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <span style={{ fontSize: '11.5px', color: colorTextSecondary }}>Need immediate help? Triggering these alerts alerts the dispatch hub.</span>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          <button 
                            onClick={() => alert("Alerting Police dispatcher and sending current coordinates...")}
                            style={{ padding: '8px 12px', background: '#EF4444', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '11.5px', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            Call Police (100)
                          </button>
                          <button 
                            onClick={() => alert("Alerting Ambulance dispatcher...")}
                            style={{ padding: '8px 12px', background: '#EF4444', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '11.5px', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            Ambulance (108)
                          </button>
                        </div>

                        <button 
                          onClick={() => alert("EMERGENCY BEACON: StitchBee dispatch center notified. Support is calling you now.")}
                          style={{ padding: '10px', background: 'linear-gradient(135deg, #FF2E83, #EF4444)', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          🚨 Trigger SOS Alert Beacon
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: CHAT ANALYTICS & SYSTEM MESSAGES */}
                {rightPanelTab === 'analytics' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Small dashboard numbers */}
                    <div>
                      <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block', marginBottom: '8px' }}>Chat Performance Metrics</strong>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {[
                          { title: "Today's Chats", val: "4 cases" },
                          { title: "Avg Response", val: "1.8 mins" },
                          { title: "Resolved Today", val: "5 tickets" },
                          { title: "Customer Rating", val: "4.9 ★" }
                        ].map((stat, idx) => (
                          <div key={idx} style={{ padding: '10px', borderRadius: '10px', background: pBackground, border: `1px solid ${pBorder}`, textAlign: 'center' }}>
                            <span style={{ fontSize: '10px', color: colorTextMuted, display: 'block' }}>{stat.title}</span>
                            <strong style={{ fontSize: '14px', color: colorTextPrimary, display: 'block', marginTop: '2px' }}>{stat.val}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Platform Notifications feed */}
                    <div style={{ borderTop: `1.5px solid ${pBorder}`, paddingTop: '16px' }}>
                      <strong style={{ fontSize: '13px', color: colorTextPrimary, display: 'block', marginBottom: '8px' }}>System Bulletins</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: colorTextSecondary }}>
                        {[
                          { title: "Monsoon Surge Bonus", desc: "Active today. Earn extra ₹35 per rain delivery.", time: "1 hr ago" },
                          { title: "Wallet cycle payout delay", desc: "Weekly payout processing cleared successfully.", time: "4 hrs ago" },
                          { title: "Version Update active", desc: "Rider app updated to version 4.2.1.", time: "Yesterday" }
                        ].map((notif, idx) => (
                          <div key={idx} style={{ padding: '10px', borderRadius: '10px', background: pBackground, border: `1px solid ${pBorder}`, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                              <span style={{ color: colorTextPrimary }}>{notif.title}</span>
                              <span style={{ fontSize: '9px', color: colorTextMuted }}>{notif.time}</span>
                            </div>
                            <span>{notif.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 6: PROFILE, DOCUMENTS & RATINGS */}
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }} className="delivery-profile-grid">
            
            {/* Left sidebar profile cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Avatar Summary card */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 10px auto', border: `3.5px solid var(--primary)` }}>
                  <img src="/tailor_hero_4.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ margin: '4px 0', fontSize: '0.98rem', fontWeight: '800' }}>Rajesh Rider</h4>
                <span style={{ fontSize: '0.7rem', color: colorTextSecondary, display: 'block', marginBottom: '8px' }}>Rider ID: RIDER-99210</span>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '0.72rem' }}>
                  <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Active Shift</span>
                  <span style={{ background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Bike Delivery</span>
                </div>
              </div>

              {/* Core Profile Parameters details */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem' }}>
                <h5 style={{ margin: '0 0 4px 0', fontSize: '0.82rem', fontWeight: '800', borderBottom: `1px solid ${borderColor}`, paddingBottom: '6px' }}>Rider Information</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Vehicle</span> <strong>Bajaj Pulsar 150 (KA-05-EX-4902)</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Driving License</span> <strong>DL-409823908920</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Insurance Policy</span> <strong>IND-INS-8890-ACTIVE</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Emergency Contact</span> <strong>+91 99887 76655 (Father)</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Preferred Hours</span> <strong>08:00 AM - 05:00 PM</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Language</span> <strong>English, Kannada, Hindi</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: colorTextMuted }}>Linked Bank</span> <strong>HDFC Account (•••4021)</strong></div>
              </div>

              {/* Logout button */}
              <button className="btn btn-ghost" style={{ width: '100%', color: 'var(--primary)', border: `1.5px solid var(--primary)`, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={onLogout}>
                <LogOut size={14} /> Log Out Account
              </button>

            </div>

            {/* Right sidebar details: Calendar Schedule & Ratings reviews */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Calendar Scheduler */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800' }}>Google Calendar Shift Scheduler</h4>
                  <button className="btn btn-secondary" style={{ fontSize: '0.65rem', padding: '4px 10px' }} onClick={() => alert("Calendar block dates selected")}>Modify Schedule</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', fontSize: '0.7rem' }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <div key={idx} style={{ padding: '8px 4px', border: `1px solid ${borderColor}`, borderRadius: '6px', background: idx >= 5 ? 'rgba(247,37,133,0.05)' : 'rgba(16,185,129,0.05)' }}>
                      <span style={{ display: 'block', color: colorTextMuted, fontSize: '0.6rem' }}>{day}</span>
                      <strong style={{ display: 'block', margin: '4px 0', color: colorTextPrimary }}>{idx + 10}</strong>
                      <span style={{ fontSize: '0.55rem', color: idx >= 5 ? 'var(--primary)' : '#10b981', fontWeight: 'bold' }}>{idx >= 5 ? 'Holiday' : 'Shift'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ratings and reviews */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '0.92rem', fontWeight: '800' }}>Ratings breakdown & feedback</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', border: `1px solid ${borderColor}`, borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.62rem', color: colorTextMuted, display: 'block' }}>CUSTOMER</span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>⭐ 4.8</strong>
                  </div>
                  <div style={{ padding: '10px', border: `1px solid ${borderColor}`, borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.62rem', color: colorTextMuted, display: 'block' }}>TAILOR</span>
                    <strong style={{ fontSize: '1.2rem', color: '#10b981' }}>⭐ 5.0</strong>
                  </div>
                  <div style={{ padding: '10px', border: `1px solid ${borderColor}`, borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.62rem', color: colorTextMuted, display: 'block' }}>ADMIN</span>
                    <strong style={{ fontSize: '1.2rem', color: '#3b82f6' }}>⭐ 4.9</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.72rem', color: colorTextSecondary }}>
                  <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '6px' }}>
                    <strong>Priya Sharma:</strong> "Arrived exactly on time, very polite rider!" (5★)
                  </div>
                  <div>
                    <strong>Amit Verma:</strong> "Protected fabric box from rain perfectly." (5★)
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* 2. BOTTOM MOBILE NAVIGATION BAR */}
      <footer 
        className="mobile-bottom-nav" 
        style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: bgCard, 
          borderTop: `1px solid ${borderColor}`, 
          display: 'flex', 
          justifyContent: 'space-around', 
          padding: '8px 0',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
          zIndex: 100
        }}
      >
        {[
          { id: 'home', label: 'Home', icon: <Home size={18} /> },
          { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> },
          { id: 'navigation', label: 'Route', icon: <Compass size={18} /> },
          { id: 'earnings', label: 'Earnings', icon: <DollarSign size={18} /> },
          { id: 'support', label: 'Support', icon: <MessageSquare size={18} /> },
          { id: 'profile', label: 'Profile', icon: <User size={18} /> }
        ].map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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
                height: '56px',
                padding: 0
              }}
            >
              {/* Floating Circle Bubble containing only the Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: isActive 
                    ? 'linear-gradient(135deg, #FF2E83, #E00A61)' 
                    : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? '#ffffff' : '#6B7280',
                  transform: isActive 
                    ? 'translateY(-16px) scale(1.12) rotateY(15deg)' 
                    : 'translateY(0) scale(1) rotateY(0)',
                  boxShadow: isActive 
                    ? '0 8px 18px rgba(255, 46, 131, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)' 
                    : 'none',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 2
                }}
              >
                {item.icon}
              </div>

              {/* Text Label aligned under the bubble */}
              <span
                style={{
                  fontSize: '0.55rem',
                  fontWeight: 'bold',
                  color: isActive ? '#FF2E83' : '#6B7280',
                  opacity: isActive ? 1 : 0.8,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.25s ease',
                  position: 'absolute',
                  bottom: '6px',
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