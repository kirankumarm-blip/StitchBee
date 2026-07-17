import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, ShoppingBag, Map, DollarSign, MessageSquare, User, 
  Phone, AlertTriangle, CheckCircle, Navigation, Send, Calendar, 
  Clock, Check, ChevronRight, ChevronDown, Info, LogOut, Shield, Compass, Sparkles, Sun, Moon, Scissors,
  Target, Star, Bell, Gift, Scan, Camera, UserPlus, Headphones, Wallet, TrendingUp, FileText, Power, RotateCw
} from 'lucide-react';

export default function DeliveryView({ theme, setTheme, currentUser, onLogout, setRole }) {
  const isDark = theme === 'dark';
  const bgCard = theme === 'dark' ? '#120f26' : '#ffffff';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0';
  const colorTextPrimary = theme === 'dark' ? '#f3f4f6' : '#0f172a';
  const colorTextSecondary = theme === 'dark' ? '#9ca3af' : '#475569';
  const colorTextMuted = theme === 'dark' ? '#6b7280' : '#94a3b8';

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'orders' | 'navigation' | 'earnings' | 'support' | 'profile'
  const [isOnline, setIsOnline] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // floating dropdown state
  const [ordersSubTab, setOrdersSubTab] = useState('active'); // 'active' | 'upcoming' | 'completed' | 'cancelled' | 'returned'
  const [earningsPeriod, setEarningsPeriod] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [selectedOrder, setSelectedOrder] = useState(null); // Detailed order modal/view
  const [orderSearchText, setOrderSearchText] = useState(''); // Search query for orders list
  const [typedMessage, setTypedMessage] = useState('');
    const [supportContact, setSupportContact] = useState('customer'); // 'customer' | 'tailor' | 'admin' | 'ai'
  
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

        const map = L.map(navMapRef.current).setView([12.9592, 77.6974], 14);
        navMapInstance.current = map;

        const tileUrl = isDark 
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
        L.tileLayer(tileUrl, {
          attribution: '&copy; Google Maps &copy; OpenStreetMap'
        }).addTo(map);

        const pickup = [12.9592, 77.6974];
        const deliver = [12.9660, 77.7320];

        map.fitBounds(L.latLngBounds([pickup, deliver]), { padding: [40, 40] });

        // Route line
        L.polyline([pickup, deliver], {
          color: '#f72585',
          weight: 6,
          opacity: 0.95
        }).addTo(map);

        // Pickup Marker
        const pickupIcon = L.divIcon({
          html: `<div style="background:#7209b7; color:#fff; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.3); font-size:14px;">🏪</div>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        L.marker(pickup, { icon: pickupIcon }).addTo(map).bindPopup("<strong>Pickup: Vogue Craft Tailors</strong>");

        // Delivery Marker
        const deliverIcon = L.divIcon({
          html: `<div style="background:#10b981; color:#fff; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.3); font-size:14px;">🏠</div>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        L.marker(deliver, { icon: deliverIcon }).addTo(map).bindPopup("<strong>Deliver: Priya Sharma</strong>");
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
      { sender: 'customer', text: 'Hi, are you near the location yet?', time: '11:45 AM' },
      { sender: 'rider', text: 'Yes, just 5 minutes away. Please keep the delivery OTP ready.', time: '11:47 AM' }
    ],
    tailor: [
      { sender: 'tailor', text: 'Please collect the matching border bag with the Lehenga.', time: '10:30 AM' },
      { sender: 'rider', text: 'Sure, will make sure to check and pick it up.', time: '10:32 AM' }
    ],
    admin: [
      { sender: 'admin', text: 'Your incentive payout for completing 10 deliveries has been credited.', time: 'Yesterday' }
    ],
    ai: [
      { sender: 'ai', text: 'Hello! I am your AI delivery route planner. Ask me for traffic alerts or destination updates.', time: 'Today' }
    ]
  });

  const handleSendMessage = () => {
    if (!typedMessage) return;
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    const newMsg = { sender: 'rider', text: typedMessage, time: timeStr };
    
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
      const replyMsg = { sender: supportContact, text: replyText, time: timeStr };
      setChatHistory(prev => ({
        ...prev,
        [supportContact]: [...prev[supportContact], replyMsg]
      }));
    }, 1500);
  };

  const handleWithdraw = () => {
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0 || amt > walletBalance) {
      alert("Please enter a valid withdrawal amount");
      return;
    }
    setWalletBalance(prev => prev - amt);
    setWithdrawAmount('');
    alert(`Withdrawal request of ₹${amt} submitted to your linked bank account!`);
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
      <header className="top-nav">
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
      <main style={{ flex: 1, padding: activeTab === 'orders' ? '12px 16px' : '20px', overflowY: 'auto', paddingBottom: activeTab === 'orders' ? '12px' : '90px' }}>
        
        {/* MODULE 1: HOME (DASHBOARD) */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div 
              className="delivery-main-dashboard-grid" 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '250px 1fr', 
                gap: '20px' 
              }}
            >
            {/* LEFT COLUMN: Far-Left Sidebar Card (Go Online & Start Delivering) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '250px' }}>
              <div 
                className="glass-card-no-hover" 
                style={{ 
                  background: 'linear-gradient(135deg, #7209b7 0%, #f72585 100%)', 
                  border: 'none', 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                  height: '580px',
                  justifyContent: 'space-between',
                  color: '#ffffff'
                }}
              >
                <h4 style={{ margin: '0 0 2px 0', fontSize: '0.92rem', fontWeight: '800', textAlign: 'left', color: '#ffffff', lineHeight: '1.4' }}>Go Online & Start Delivering</h4>
                
                <div style={{ textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src="/rider_3d.jpg" 
                    alt="Rider 3D" 
                    style={{ 
                      width: '95%', 
                      height: '160px', 
                      objectFit: 'contain'
                    }} 
                  />
                </div>
                
                {/* White floating card inside the gradient background - floating style */}
                <div 
                  style={{ 
                    background: '#ffffff', 
                    color: '#0f172a',
                    borderRadius: '18px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                  }}
                >
                  {/* Online status badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#10b981' : '#6b7280' }}></span>
                    <strong style={{ fontSize: '0.8rem', color: isOnline ? '#10b981' : '#6b7280' }}>
                      {isOnline ? 'You are Online' : 'You are Offline'}
                    </strong>
                  </div>

                  {/* Stats List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Row 1: Working Time */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(114, 9, 183, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Clock size={14} style={{ color: '#7209b7' }} />
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold' }}>Working Time</span>
                        <strong style={{ display: 'block', fontSize: '0.78rem', color: '#0f172a' }}>{isOnline ? '04h 18m' : '00h 00m'}</strong>
                      </div>
                    </div>

                    {/* Row 2: Orders Completed */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(114, 9, 183, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ShoppingBag size={14} style={{ color: '#7209b7' }} />
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold' }}>Orders Completed</span>
                        <strong style={{ display: 'block', fontSize: '0.78rem', color: '#0f172a' }}>11 Deliveries</strong>
                      </div>
                    </div>

                    {/* Row 3: Earnings Today */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Wallet size={14} style={{ color: '#10b981' }} />
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold' }}>Earnings Today</span>
                        <strong style={{ display: 'block', fontSize: '0.78rem', color: '#0f172a' }}>₹1,820</strong>
                      </div>
                    </div>

                    {/* Row 4: Rider Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(249, 115, 22, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Star size={14} style={{ color: '#f97316' }} />
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold' }}>Rider Rating</span>
                        <strong style={{ display: 'flex', fontSize: '0.78rem', color: '#0f172a', alignItems: 'center', gap: '3px' }}>
                          4.9 <Star size={10} fill="#fbbf24" style={{ color: '#fbbf24' }} />
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Offline / Online Action Button */}
                  <button 
                    className="btn" 
                    onClick={() => setIsOnline(!isOnline)}
                    style={{ 
                      width: '100%', 
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      background: '#ffffff',
                      color: isOnline ? '#f72585' : '#10b981',
                      border: `1.5px solid ${isOnline ? '#f72585' : '#10b981'}`,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Power size={12} /> {isOnline ? 'Go Offline' : 'Go Online'}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: KPI cards, Map, active delivery, timeline list, perform charts, quick actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Row 1: KPI Stats Summary Grid */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                  gap: '12px' 
                }}
              >
                {[
                  { label: "Today's Earnings", val: "₹1,820", sub: "+₹150 incentives", subColor: '#10b981', icon: <Wallet size={18} style={{ color: '#f72585' }} />, iconBg: 'rgba(247,37,133,0.05)', iconBorder: 'rgba(247,37,133,0.15)', iconColor: '#f72585' },
                  { label: "Today's Orders", val: "16", sub: "Goal: 20", subColor: colorTextMuted, icon: <FileText size={18} style={{ color: '#3b82f6' }} />, iconBg: 'rgba(59,130,246,0.05)', iconBorder: 'rgba(59,130,246,0.15)', iconColor: '#3b82f6' },
                  { label: "Completed", val: "11", sub: "69% Success Rate", subColor: colorTextMuted, icon: <CheckCircle size={18} style={{ color: '#10b981' }} />, iconBg: 'rgba(16,185,129,0.05)', iconBorder: 'rgba(16,185,129,0.15)', iconColor: '#10b981' },
                  { label: "Pending", val: "5", sub: "View Details >", subColor: '#ef4444', icon: <Clock size={18} style={{ color: '#f59e0b' }} />, iconBg: 'rgba(245,158,11,0.05)', iconBorder: 'rgba(245,158,11,0.15)', iconColor: '#f59e0b', clickAction: () => setActiveTab('orders') },
                  { label: "Wallet Balance", val: "₹8,500", sub: "Withdraw >", subColor: '#ef4444', icon: <Wallet size={18} style={{ color: '#7209b7' }} />, iconBg: 'rgba(114,9,183,0.05)', iconBorder: 'rgba(114,9,183,0.15)', iconColor: '#7209b7', clickAction: () => setActiveTab('earnings') },
                  { label: "Rider Rating", val: "4.9", sub: "Top Tier Rider", subColor: colorTextMuted, icon: <Star size={18} fill="#fbbf24" style={{ color: '#fbbf24' }} />, iconBg: 'rgba(251,191,36,0.05)', iconBorder: 'rgba(251,191,36,0.15)', iconColor: '#fbbf24' }
                ].map((kpi, idx) => (
                  <div 
                    key={idx} 
                    className="glass-card-no-hover" 
                    style={{ 
                      padding: '12px 14px', 
                      background: bgCard, 
                      border: `1px solid ${borderColor}`, 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      cursor: kpi.clickAction ? 'pointer' : 'default',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                    }}
                    onClick={kpi.clickAction}
                  >
                    <div 
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '10px', 
                        background: kpi.iconBg, 
                        border: `1px solid ${kpi.iconBorder}`,
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '1.1rem',
                        color: kpi.iconColor,
                        flexShrink: 0
                      }}
                    >
                      {kpi.icon}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: colorTextMuted, display: 'block', fontWeight: '700' }}>{kpi.label}</span>
                      <strong style={{ fontSize: '1.05rem', color: colorTextPrimary, display: 'block', margin: '2px 0' }}>{kpi.val}</strong>
                      <span style={{ fontSize: '0.62rem', color: kpi.subColor, fontWeight: 'bold' }}>{kpi.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: Today's Route Overview, Active Delivery & Delivery Schedule Grid */}
              <div 
                className="delivery-home-layout-grid" 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1.2fr 1fr 1fr', 
                  gap: '20px' 
                }}
              >
                {/* Col 2.1: Today's Route Overview */}
                <div 
                  className="glass-card-no-hover" 
                  style={{ 
                    padding: '20px', 
                    background: bgCard, 
                    border: `1px solid ${borderColor}`, 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '460px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: colorTextPrimary }}>Today's Route Overview</h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveTab('navigation')}>
                      View Full Route
                    </span>
                  </div>

                  {/* Real Leaflet Map Container */}
                  <div style={{ flex: 1, minHeight: '280px', height: '280px', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${borderColor}`, position: 'relative', marginTop: '12px', marginBottom: '12px' }}>
                    <div ref={homeMapRef} style={{ width: '100%', height: '100%', filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none', zIndex: 1 }} />
                  </div>

                  {/* Bottom Stats & Button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', borderTop: `1px solid ${borderColor}`, paddingTop: '14px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(114,9,183,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Compass size={14} style={{ color: '#7209b7' }} />
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.58rem', color: colorTextMuted }}>Total Distance</span>
                          <strong style={{ fontSize: '0.75rem', color: colorTextPrimary }}>48.6 KM</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(249,115,22,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Target size={14} style={{ color: '#f97316' }} />
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.58rem', color: colorTextMuted }}>Total Stops</span>
                          <strong style={{ fontSize: '0.75rem', color: colorTextPrimary }}>7 Stops</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16,185,129,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Clock size={14} style={{ color: '#10b981' }} />
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.58rem', color: colorTextMuted }}>Estimated Time</span>
                          <strong style={{ fontSize: '0.75rem', color: colorTextPrimary }}>3h 20m</strong>
                        </div>
                      </div>
                    </div>

                    <button 
                      className="btn btn-solid-pink" 
                      style={{ fontSize: '0.72rem', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '4px', borderRadius: '8px', fontWeight: 'bold' }}
                      onClick={() => setActiveTab('navigation')}
                    >
                      Start Route <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Col 2.2: Current Active Delivery */}
                <div 
                  className="glass-card-no-hover" 
                  style={{ 
                    padding: '20px', 
                    background: bgCard, 
                    border: `1px solid ${borderColor}`, 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '460px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: colorTextPrimary }}>Current Active Delivery</h4>
                      <span style={{ fontSize: '0.65rem', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                        #SB-1024
                      </span>
                    </div>

                    {/* Pickup and Delivery details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.75rem' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(114,9,183,0.1)', color: '#7209b7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <ShoppingBag size={12} style={{ color: '#7209b7' }} />
                        </div>
                        <div>
                          <strong style={{ display: 'block', color: colorTextPrimary }}>Pickup From</strong>
                          <span style={{ fontWeight: 'bold', color: colorTextSecondary }}>Vogue Craft Tailors</span>
                          <p style={{ margin: '2px 0 0 0', color: colorTextMuted, fontSize: '0.68rem' }}>23, 4th Main, 1st Cross, Brookefield, Bengaluru 560037</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Home size={12} style={{ color: '#10b981' }} />
                        </div>
                        <div>
                          <strong style={{ display: 'block', color: colorTextPrimary }}>Deliver To</strong>
                          <span style={{ fontWeight: 'bold', color: colorTextSecondary }}>Priya Sharma</span>
                          <p style={{ margin: '2px 0 0 0', color: colorTextMuted, fontSize: '0.68rem' }}>12, Prestige Lakeside, Whitefield, Bengaluru 560066</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Specs and action buttons */}
                  <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '12px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: colorTextMuted, marginBottom: '14px' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.58rem', color: colorTextMuted, textTransform: 'uppercase', marginBottom: '2px' }}>Distance</span>
                        <strong style={{ color: colorTextPrimary, fontSize: '0.8rem' }}>3.4 km</strong>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.58rem', color: colorTextMuted, textTransform: 'uppercase', marginBottom: '2px' }}>ETA</span>
                        <strong style={{ color: colorTextPrimary, fontSize: '0.8rem' }}>14 mins</strong>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.58rem', color: colorTextMuted, textTransform: 'uppercase', marginBottom: '2px' }}>Item</span>
                        <strong style={{ color: colorTextPrimary, fontSize: '0.8rem' }}>Lehenga & Blouse</strong>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-solid-pink" 
                        style={{ flex: 1.5, fontSize: '0.72rem', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold' }} 
                        onClick={() => setActiveTab('navigation')}
                      >
                        <Navigation size={12} style={{ transform: 'rotate(45deg)' }} /> Navigate
                      </button>
                      <button 
                        className="btn" 
                        style={{ 
                          flex: 1, 
                          fontSize: '0.72rem', 
                          padding: '8px 12px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '4px',
                          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15, 23, 42, 0.05)',
                          color: colorTextPrimary,
                          border: `1px solid ${borderColor}`,
                          cursor: 'pointer'
                        }} 
                        onClick={() => alert(`Calling customer: ${activeOrder.phone}`)}
                      >
                        <Phone size={12} /> Call
                      </button>
                      <button 
                        className="btn" 
                        style={{ 
                          flex: 1, 
                          fontSize: '0.72rem', 
                          padding: '8px 12px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '4px',
                          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15, 23, 42, 0.05)',
                          color: colorTextPrimary,
                          border: `1px solid ${borderColor}`,
                          cursor: 'pointer'
                        }} 
                        onClick={() => { setActiveTab('support'); setSupportContact('customer'); }}
                      >
                        <MessageSquare size={12} /> Chat
                      </button>
                    </div>
                  </div>
                </div>

                {/* Col 2.3: Today's Delivery Schedule */}
                <div 
                  className="glass-card-no-hover" 
                  style={{ 
                    padding: '20px', 
                    background: bgCard, 
                    border: `1px solid ${borderColor}`, 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '460px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: colorTextPrimary }}>Today's Delivery Schedule</h4>
                      <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setActiveTab('orders'); setOrdersSubTab('active'); }}>
                        View All
                      </span>
                    </div>

                    {/* Scheduled stops list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.72rem' }}>
                      {[
                        { time: '09:00 AM', type: 'Pickup', store: 'Vogue Craft Tailors', tag: 'Now', num: 1 },
                        { time: '10:00 AM', type: 'Delivery', store: 'Priya Sharma', tag: '3.4 km', num: 2 },
                        { time: '11:30 AM', type: 'Pickup', store: 'Elite Threads', tag: '6.2 km', num: 3 },
                        { time: '01:15 PM', type: 'Delivery', store: 'Amit Verma', tag: '8.1 km', num: 4 },
                        { time: '02:45 PM', type: 'Delivery', store: 'Sneha Iyer', tag: '5.4 km', num: 5 }
                      ].map((step, sIdx) => (
                        <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: colorTextMuted, width: '55px' }}>{step.time}</span>
                            <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: step.num === 1 ? '#f72585' : '#f97316', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 'bold' }}>
                              {step.num}
                            </span>
                            <div>
                              <strong style={{ display: 'block', color: colorTextPrimary }}>{step.type}</strong>
                              <span style={{ color: colorTextSecondary, fontSize: '0.65rem' }}>{step.store}</span>
                            </div>
                          </div>
                          <span style={{ 
                            fontSize: '0.62rem', 
                            background: step.tag === 'Now' ? '#f72585' : 'rgba(15, 23, 42, 0.04)', 
                            color: step.tag === 'Now' ? '#fff' : colorTextMuted, 
                            padding: '2px 8px', 
                            borderRadius: '6px', 
                            fontWeight: 'bold' 
                          }}>
                            {step.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom stats and optimize button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${borderColor}`, paddingTop: '12px', marginTop: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: colorTextMuted }}>Total <strong>7 Stops</strong></span>
                    <button 
                      className="btn btn-ghost" 
                      style={{ fontSize: '0.72rem', color: '#f72585', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
                      onClick={() => alert("Route schedule optimized!")}
                    >
                      <Compass size={12} style={{ color: '#f72585' }} /> Optimize Route
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Today's Performance / Earnings Chart / Notifications Grid */}
              <div 
                className="delivery-home-layout-grid" 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1.45fr 1.45fr 1.1fr', 
                  gap: '20px',
                  alignItems: 'stretch'
                }}
              >
                {/* Col 3.1: Today's Performance Card */}
                <div 
                  className="glass-card-no-hover" 
                  style={{ 
                    padding: '16px 20px', 
                    background: bgCard, 
                    border: `1px solid ${borderColor}`, 
                    borderRadius: '20px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '210px',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: colorTextPrimary }}>Today's Performance</h4>
                    <span style={{ fontSize: '0.72rem', color: '#f72585', cursor: 'pointer', fontWeight: '800' }} onClick={() => setActiveTab('profile')}>
                      View Report
                    </span>
                  </div>

                  {/* Performance stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '12px', flex: 1, alignItems: 'center' }}>
                    {[
                      { label: 'Acceptance Rate', val: '98%', icon: <Target size={18} />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
                      { label: 'On-Time Rate', val: '96%', icon: <Clock size={18} />, color: '#f72585', bg: 'rgba(247, 37, 133, 0.08)' },
                      { label: 'Completion Rate', val: '92%', icon: <Shield size={18} />, color: '#4361ee', bg: 'rgba(67, 97, 238, 0.08)' },
                      { label: 'Customer Rating', val: '4.9', icon: <Star size={18} fill="#f97316" style={{ color: '#f97316' }} />, color: '#f97316', bg: 'rgba(249, 115, 22, 0.08)' }
                    ].map((perf, pIdx) => (
                      <div key={pIdx} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div 
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '12px', 
                            background: perf.bg, 
                            color: perf.color, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            marginBottom: '8px'
                          }}
                        >
                          {perf.icon}
                        </div>
                        <span style={{ fontSize: '0.62rem', color: colorTextMuted, display: 'block', fontWeight: '600', marginBottom: '4px', height: '24px', lineHeight: '1.2' }}>{perf.label}</span>
                        <strong style={{ fontSize: '1.05rem', color: colorTextPrimary, display: 'block', fontWeight: '800' }}>{perf.val}</strong>
                        <div style={{ width: '45px', height: '4px', background: perf.color, borderRadius: '2px', margin: '8px auto 0 auto' }}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Col 3.2: Earnings Summary (Spline Chart) */}
                <div 
                  className="glass-card-no-hover" 
                  style={{ 
                    padding: '16px 20px', 
                    background: bgCard, 
                    border: `1px solid ${borderColor}`, 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '210px',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: colorTextPrimary }}>Earnings Summary</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc', border: `1.5px solid ${borderColor}`, padding: '4px 8px', borderRadius: '8px', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.68rem', color: colorTextSecondary, fontWeight: '700' }}>This Week</span>
                      <span style={{ fontSize: '0.6rem', color: colorTextSecondary }}>▼</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flex: 1, alignItems: 'center' }}>
                    {/* Left stats */}
                    <div style={{ flex: '0 0 115px', width: '115px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h3 style={{ margin: 0, fontSize: '1.65rem', fontWeight: '900', color: colorTextPrimary, letterSpacing: '-0.5px' }}>₹11,250</h3>
                      <span style={{ fontSize: '0.72rem', color: colorTextSecondary, fontWeight: '800', marginTop: '2px', display: 'block' }}>Total Earnings</span>
                      <span style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: '700', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        ▲ +12.5% <span style={{ color: colorTextMuted, fontWeight: 'normal' }}>vs last week</span>
                      </span>
                    </div>
                    
                    {/* Right graphics: SVG Spline Chart - Stretched dynamically */}
                    <div style={{ flex: 1, height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ height: '75px', position: 'relative' }}>
                        <svg viewBox="0 0 240 75" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                          <defs>
                            <linearGradient id="pinkChartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f72585" stopOpacity="0.22" />
                              <stop offset="100%" stopColor="#f72585" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path 
                            d="M 10 65 Q 27.5 58.5, 45 52 T 80 38 T 115 45 T 150 32 T 190 22 T 235 8" 
                            fill="none" 
                            stroke="#f72585" 
                            strokeWidth="2.5" 
                            strokeLinecap="round"
                          />
                          <path 
                            d="M 10 65 Q 27.5 58.5, 45 52 T 80 38 T 115 45 T 150 32 T 190 22 T 235 8 L 235 75 L 10 75 Z" 
                            fill="url(#pinkChartGrad)" 
                          />
                          <circle cx="10" cy="65" r="3.5" fill="#f72585" stroke="#ffffff" strokeWidth="1" />
                          <circle cx="45" cy="52" r="3.5" fill="#f72585" stroke="#ffffff" strokeWidth="1" />
                          <circle cx="80" cy="38" r="3.5" fill="#f72585" stroke="#ffffff" strokeWidth="1" />
                          <circle cx="115" cy="45" r="3.5" fill="#f72585" stroke="#ffffff" strokeWidth="1" />
                          <circle cx="150" cy="32" r="3.5" fill="#f72585" stroke="#ffffff" strokeWidth="1" />
                          <circle cx="190" cy="22" r="3.5" fill="#f72585" stroke="#ffffff" strokeWidth="1" />
                          <circle cx="235" cy="8" r="3.5" fill="#f72585" stroke="#ffffff" strokeWidth="1" />
                        </svg>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: colorTextMuted, fontWeight: '700', padding: '0 4px 2px 4px' }}>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Col 3.3: Recent Notifications */}
                <div 
                  className="glass-card-no-hover" 
                  style={{ 
                    padding: '16px 20px', 
                    background: bgCard, 
                    border: `1px solid ${borderColor}`, 
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '210px',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800', color: colorTextPrimary }}>Recent Notifications</h4>
                    <span style={{ fontSize: '0.72rem', color: '#f72585', cursor: 'pointer', fontWeight: '800' }} onClick={() => setActiveTab('profile')}>
                      View All
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', flex: 1, justifyContent: 'center' }}>
                    {[
                      { label: 'New Order Assigned', desc: '#SB-1025 has been assigned to you.', time: '2m ago', color: '#f72585', bg: 'rgba(247, 37, 133, 0.06)', icon: <ShoppingBag size={12} /> },
                      { label: 'Customer Called', desc: 'Priya Sharma tried to call you.', time: '10m ago', color: '#7209b7', bg: 'rgba(114, 9, 183, 0.06)', icon: <Phone size={12} /> },
                      { label: 'Incentive Earned', desc: 'You earned ₹50 incentive.', time: '1h ago', color: '#f97316', bg: 'rgba(249, 115, 22, 0.06)', icon: <Gift size={12} /> }
                    ].map((notif, nIdx) => (
                      <div key={nIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: notif.bg, color: notif.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {notif.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <strong style={{ fontSize: '0.72rem', color: colorTextPrimary, fontWeight: '700' }}>{notif.label}</strong>
                            <span style={{ fontSize: '0.58rem', color: colorTextMuted, flexShrink: 0 }}>{notif.time}</span>
                          </div>
                          <span style={{ fontSize: '0.62rem', color: colorTextSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
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
                className="glass-card-no-hover" 
                style={{ 
                  padding: '20px', 
                  background: bgCard, 
                  border: `1px solid ${borderColor}`, 
                  borderRadius: '20px' 
                }}
              >
                <h4 style={{ margin: '0 0 16px 0', fontSize: '0.92rem', fontWeight: '800', color: colorTextPrimary }}>Quick Actions</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
                  {[
                    { label: 'Scan Package', color: '#f72585', bg: 'rgba(247, 37, 133, 0.05)', icon: <Scan size={15} /> },
                    { label: 'Upload Proof', color: '#7209b7', bg: 'rgba(114, 9, 183, 0.05)', icon: <Camera size={15} /> },
                    { label: 'Emergency', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.05)', icon: <AlertTriangle size={15} /> },
                    { label: 'Earnings Details', color: '#10b981', bg: 'rgba(16, 185, 129, 0.05)', icon: <Wallet size={15} /> },
                    { label: 'Support Chat', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.05)', icon: <Headphones size={15} /> },
                    { label: 'Refer & Earn', color: '#f97316', bg: 'rgba(249, 115, 22, 0.05)', icon: <UserPlus size={15} /> }
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
                        border: 'none',
                        color: act.color,
                        background: act.bg,
                        '--quick-action-color': act.color,
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        padding: '12px 10px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(0.96)'}
                      onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                    >
                      {act.icon}
                      <span>{act.label}</span>
                    </button>
                  ))}
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
                      padding: '12px 18px', 
                      background: bgCard, 
                      border: `1px solid ${borderColor}`, 
                      borderRadius: '14px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      boxShadow: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: '8px' }}>
                      <span style={{ fontSize: '0.68rem', color: colorTextMuted, fontWeight: '700', whiteSpace: 'nowrap' }}>{kpi.label}</span>
                      <strong style={{ fontSize: '1.22rem', color: colorTextPrimary, fontWeight: '800', lineHeight: '1.1' }}>{kpi.val}</strong>
                      <span style={{ fontSize: '0.64rem', color: kpi.subColor, fontWeight: 'bold', whiteSpace: 'nowrap' }}>{kpi.sub}</span>
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
                    fontSize: '14px', 
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#F8FAFC',
                    border: `1px solid ${isDark ? borderColor : '#E9EEF5'}`,
                    padding: '12px 18px',
                    borderRadius: '12px',
                    boxSizing: 'border-box',
                    width: '100%'
                  }}>
                    <span style={{ fontWeight: '600', color: colorTextPrimary }}>Can't find an order?</span>
                    <button 
                      className="btn" 
                      style={{ 
                        fontSize: '14px', 
                        background: 'transparent',
                        border: 'none',
                        color: '#FF2E83', 
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        padding: 0
                      }} 
                      onClick={() => alert("Refreshed tasks list!")}
                    >
                      <RotateCw size={14} style={{ color: '#FF2E83' }} /> Refresh
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

                      {/* Row 1: Pickup Details & Delivery Details (Spans full width above the split container) */}
                      <div className="order-details-row1-grid" style={{ marginBottom: '20px' }}>
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

                      {/* Main workspace details content: Left Details / Right Map split */}
                      <div className="order-details-split-container">
                        
                        {/* LEFT COLUMN: Details Cards Grid */}
                        <div className="order-details-left-col" style={{ overflowY: 'visible' }}>
                          
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
                                height: '270px',
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
                                height: '270px',
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
                                height: '270px',
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
                              padding: '16px 20px', 
                              background: bgCard, 
                              border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, 
                              borderRadius: '16px', 
                              display: 'flex', 
                              flexDirection: 'column', 
                              height: '270px',
                              boxSizing: 'border-box',
                              justifyContent: 'space-between',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <strong style={{ fontSize: '16px', fontWeight: '600', color: colorTextPrimary }}>Route Overview</strong>
                              <span style={{ fontSize: '13px', color: '#FF2E83', fontWeight: '700' }}>{selectedOrder.distance} • {selectedOrder.estTime}</span>
                            </div>

                            {/* Leaflet map container */}
                            <div style={{ flex: 1, minHeight: '130px', height: '130px', borderRadius: '12px', overflow: 'hidden', border: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, position: 'relative' }}>
                              <div ref={orderMapRef} style={{ width: '100%', height: '100%', filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none', zIndex: 1 }} />
                              <button 
                                onClick={() => {
                                  try {
                                    const pickup = selectedOrder.pickupCoords || [12.9592, 77.6974];
                                    const deliver = selectedOrder.deliveryCoords || [12.9660, 77.7320];
                                    const L = window.L;
                                    if (orderMapInstance.current && L) {
                                      orderMapInstance.current.fitBounds(L.latLngBounds([pickup, deliver]), { padding: [15, 15] });
                                    }
                                  } catch (e) {
                                    console.error("Map fitBounds failed", e);
                                  }
                                }}
                                style={{
                                  position: 'absolute',
                                  bottom: '8px',
                                  right: '8px',
                                  background: 'rgba(255,255,255,0.95)',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  cursor: 'pointer',
                                  zIndex: 10,
                                  color: '#1E293B',
                                  boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '3px'
                                }}
                              >
                                📍 Live
                              </button>
                            </div>

                            {/* Map specs footer */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', borderTop: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingTop: '8px', marginTop: '8px' }}>
                              <div>
                                <span style={{ color: '#6B7280', display: 'block', fontSize: '11px', fontWeight: '600' }}>Distance</span>
                                <strong style={{ color: colorTextPrimary, fontSize: '13px', fontWeight: '700', marginTop: '2px', display: 'block' }}>{selectedOrder.distance}</strong>
                              </div>
                              <div style={{ borderLeft: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingLeft: '8px' }}>
                                <span style={{ color: '#6B7280', display: 'block', fontSize: '11px', fontWeight: '600' }}>ETA</span>
                                <strong style={{ color: colorTextPrimary, fontSize: '13px', fontWeight: '700', marginTop: '2px', display: 'block' }}>{selectedOrder.estTime}</strong>
                              </div>
                              <div style={{ borderLeft: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingLeft: '8px' }}>
                                <span style={{ color: '#6B7280', display: 'block', fontSize: '11px', fontWeight: '600' }}>Traffic</span>
                                <strong style={{ color: selectedOrder.traffic === 'Light' ? '#22C55E' : (selectedOrder.traffic === 'Moderate' ? '#FF9F43' : '#FF2E83'), fontSize: '13px', fontWeight: '700', marginTop: '2px', display: 'block' }}>
                                  ● {selectedOrder.traffic}
                                </strong>
                              </div>
                              <div style={{ borderLeft: `1.5px solid ${isDark ? borderColor : '#E9EEF5'}`, paddingLeft: '8px' }}>
                                <span style={{ color: '#6B7280', display: 'block', fontSize: '11px', fontWeight: '600' }}>Best Route</span>
                                <strong style={{ color: colorTextPrimary, fontSize: '13px', fontWeight: '700', marginTop: '2px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedOrder.bestRoute}</strong>
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
                            height: '48px',
                            borderRadius: '12px', 
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
                            boxShadow: '0 4px 14px rgba(122, 62, 240, 0.25)'
                          }}
                        >
                          <Navigation size={18} style={{ transform: 'rotate(45deg)' }} /> Navigate
                        </button>

                        <button 
                          className="btn-text-white-force"
                          onClick={() => alert(`Calling customer: ${selectedOrder.deliveryPhone}`)}
                          style={{ 
                            flex: 1, 
                            height: '48px',
                            borderRadius: '12px', 
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
                            boxShadow: '0 4px 14px rgba(255, 46, 131, 0.25)'
                          }}
                        >
                          <Phone size={18} /> Call Customer
                        </button>

                        <button 
                          className="btn-text-white-force"
                          onClick={() => alert(`Calling tailor: ${selectedOrder.pickupPhone}`)}
                          style={{ 
                            flex: 1, 
                            height: '48px',
                            borderRadius: '12px', 
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
                            boxShadow: '0 4px 14px rgba(122, 62, 240, 0.25)'
                          }}
                        >
                          <Phone size={18} /> Call Tailor
                        </button>

                        <button 
                          className="btn-chat-custom"
                          onClick={() => { setActiveTab('support'); setSupportContact('customer'); }}
                          style={{ 
                            flex: 1, 
                            height: '48px',
                            borderRadius: '12px', 
                            fontSize: '14px', 
                            fontWeight: '700', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '8px', 
                            background: isDark ? 'rgba(122, 62, 240, 0.15)' : 'rgba(122, 62, 240, 0.08)',
                            color: '#7A3EF0', 
                            border: `1px solid ${isDark ? 'rgba(122, 62, 240, 0.3)' : 'rgba(122, 62, 240, 0.15)'}`,
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
                              height: '48px',
                              borderRadius: '12px', 
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
                              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.25)'
                            }}
                          >
                            <Check size={18} /> Accept Task
                          </button>
                        )}

                        {selectedOrder.status === 'active' && (selectedOrder.taskStatus === 'Ready' || selectedOrder.taskStatus === 'Pickup Pending') && (
                          <div style={{ display: 'flex', flex: 1.2, height: '48px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 14px rgba(31, 199, 126, 0.25)' }}>
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
                              height: '48px',
                              borderRadius: '12px', 
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
                              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.25)'
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

        {/* MODULE 3: NAVIGATION & LIVE ROUTE PLANNER */}
        {activeTab === 'navigation' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', height: 'calc(100vh - 160px)' }} className="delivery-nav-grid">
            
            {/* Map Simulator */}
            <div style={{ background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              
              {/* Interactive Vector map canvas */}
              <div style={{ flex: 1, background: isDark ? '#14142b' : '#e2e8f0', position: 'relative' }}>
                <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%' }}>
                  {/* Grid Lines representing streets */}
                  <line x1="50" y1="0" x2="50" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="150" y1="0" x2="150" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="300" y1="0" x2="300" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="500" y1="0" x2="500" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="700" y1="0" x2="700" y2="600" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  
                  <line x1="0" y1="100" x2="800" y2="100" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="0" y1="250" x2="800" y2="250" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="0" y1="400" x2="800" y2="400" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />
                  <line x1="0" y1="520" x2="800" y2="520" stroke={isDark ? '#2e2e4e' : '#cbd5e1'} strokeWidth="12" />

                  {/* Route line */}
                  <path d="M 150 250 L 300 250 L 300 400 L 500 400" fill="none" stroke="var(--primary)" strokeWidth="6" strokeDasharray="6 4" />

                  {/* Pickup Pin */}
                  <circle cx="150" cy="250" r="14" fill="#7209b7" />
                  <text x="150" y="254" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🏪</text>

                  {/* Rider Dot */}
                  <circle cx="300" cy="250" r="10" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                  
                  {/* Delivery Destination Pin */}
                  <circle cx="500" cy="400" r="14" fill="var(--primary)" />
                  <text x="500" y="404" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">🏠</text>
                </svg>

                {/* Floating GPS HUD overlay */}
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', background: bgCard, border: `1px solid ${borderColor}`, padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <div>
                    <span style={{ fontSize: '0.62rem', color: colorTextMuted, textTransform: 'uppercase', fontWeight: 'bold' }}>CURRENT ACTIVE ROUTE</span>
                    <h5 style={{ margin: '2px 0 0 0', fontSize: '0.88rem', fontWeight: '800' }}>To {activeOrder.deliverTo}</h5>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', textAlign: 'center', fontSize: '0.78rem' }}>
                    <div>
                      <span style={{ display: 'block', color: colorTextSecondary }}>Distance</span>
                      <strong style={{ color: 'var(--primary)' }}>3.8 KM</strong>
                    </div>
                    <div style={{ borderLeft: `1px solid ${borderColor}`, paddingLeft: '14px' }}>
                      <span style={{ display: 'block', color: colorTextSecondary }}>ETA</span>
                      <strong style={{ color: '#10b981' }}>12 mins</strong>
                    </div>
                    <div style={{ borderLeft: `1px solid ${borderColor}`, paddingLeft: '14px' }}>
                      <span style={{ display: 'block', color: colorTextSecondary }}>Traffic</span>
                      <strong style={{ color: '#fbbf24' }}>Moderate</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick actions bar */}
              <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', borderTop: `1px solid ${borderColor}` }}>
                <button className="btn btn-primary" style={{ flex: 1.5, fontSize: '0.75rem' }} onClick={() => alert("Simulated GPS directions initialized...")}>
                  Start Route
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.75rem' }} onClick={() => alert("SOS Alert dispatched to operations center!")}>
                  ⚠️ SOS
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, fontSize: '0.75rem' }} onClick={() => alert(`Calling Tailor Shop ${activeOrder.pickup} at ${activeOrder.tailorPhone}`)}>
                  Call Tailor
                </button>
              </div>

            </div>

            {/* Route Planner sidebar */}
            <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800' }}>Amazon Flex Route Planner</h4>
                <span style={{ fontSize: '0.65rem', color: colorTextMuted }}>Sequence of pickups and drop-offs</span>
              </div>

              {/* Path timeline */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '12px', borderLeft: `2px dashed ${borderColor}`, marginLeft: '10px', position: 'relative' }}>
                {[
                  { num: 1, title: 'Pickup from Vogue Tailors', subText: 'Order #SB-1024' },
                  { num: 2, title: 'Deliver to Priya Sharma', subText: 'Flat 402, Pinecrest Apts' },
                  { num: 3, title: 'Pickup from Elite Threads', subText: 'Order #SB-0998' },
                  { num: 4, title: 'Deliver to Amit Verma', subText: 'Lane 5, Phase 2, Pune Road' },
                  { num: 5, title: 'Deliver to Sneha Iyer', subText: 'Rose Boutique collection drop-off' }
                ].map((step, idx) => (
                  <div key={idx} style={{ position: 'relative', fontSize: '0.78rem' }}>
                    <div 
                      style={{ 
                        position: 'absolute', 
                        left: '-22px', 
                        top: '1px', 
                        width: '18px', 
                        height: '18px', 
                        borderRadius: '50%', 
                        background: step.title.includes('Pickup') ? '#7209b7' : 'var(--primary)',
                        color: '#fff', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.62rem', 
                        fontWeight: 'bold' 
                      }}
                    >
                      {step.num}
                    </div>
                    <strong style={{ display: 'block', color: colorTextPrimary }}>{step.title}</strong>
                    <span style={{ fontSize: '0.68rem', color: colorTextSecondary }}>{step.subText}</span>
                  </div>
                ))}
              </div>

              {/* Optimize Button */}
              <button className="btn btn-secondary" style={{ width: '100%', marginTop: '16px', fontWeight: 'bold', fontSize: '0.78rem' }} onClick={() => alert("Re-ordered route timeline to avoid major congestion areas!")}>
                Optimize Route
              </button>

            </div>

          </div>
        )}

        {/* MODULE 4: EARNINGS AND WALLET */}
        {activeTab === 'earnings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Quick Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              {[
                { title: "Today's Payout", val: "₹1,850", info: "Incentives: ₹120", sub: "Withdraw Available" },
                { title: "Weekly Payout", val: "₹11,250", info: "12 Hours Active", sub: "Cleared Friday" },
                { title: "Monthly Payout", val: "₹48,600", info: "98% Completion", sub: "June Cycle" },
                { title: "Bonus & Incentives", val: "₹4,000", info: "Weekend Rush rewards", sub: "Paid instantly" }
              ].map((card, idx) => (
                <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                  <span style={{ fontSize: '0.72rem', color: colorTextSecondary, textTransform: 'uppercase', fontWeight: 'bold' }}>{card.title}</span>
                  <h2 style={{ margin: '8px 0', fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary)' }}>{card.val}</h2>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: colorTextMuted }}>
                    <span>{card.info}</span>
                    <span>{card.sub}</span>
                  </div>
                </div>
              ))}

              {/* Instant withdraw card */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: colorTextSecondary, textTransform: 'uppercase', fontWeight: 'bold' }}>Available Balance</span>
                  <h2 style={{ margin: '4px 0', fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>₹{walletBalance}</h2>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                  <input 
                    type="number" 
                    placeholder="Amt" 
                    className="form-input" 
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem', height: '32px' }}
                  />
                  <button className="btn btn-primary" style={{ padding: '0 10px', fontSize: '0.72rem', height: '32px' }} onClick={handleWithdraw}>
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Graph & Transaction History split */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }} className="earnings-bottom-layout">
              
              {/* Native SVG Spline Spline wave graph representation */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: '800' }}>Weekly Revenue trends</h4>
                  <select className="form-select" style={{ width: '100px', fontSize: '0.7rem', padding: '4px 8px', height: '24px' }}>
                    <option>June 2026</option>
                    <option>May 2026</option>
                  </select>
                </div>

                <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                  <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Horizontal helper lines */}
                    <line x1="0" y1="40" x2="400" y2="40" stroke={borderColor} strokeWidth="0.5" />
                    <line x1="0" y1="90" x2="400" y2="90" stroke={borderColor} strokeWidth="0.5" />
                    <line x1="0" y1="140" x2="400" y2="140" stroke={borderColor} strokeWidth="0.5" />
                    
                    {/* Graph Spline wave */}
                    <path d="M 0 170 C 50 140, 100 130, 150 90 C 200 50, 250 80, 300 40 C 350 0, 400 30, 400 30 L 400 200 L 0 200 Z" fill="url(#gradientGreen)" />
                    <path d="M 0 170 C 50 140, 100 130, 150 90 C 200 50, 250 80, 300 40 C 350 0, 400 30, 400 30" fill="none" stroke="#10b981" strokeWidth="3" />

                    {/* Nodes */}
                    <circle cx="150" cy="90" r="5" fill="#10b981" />
                    <circle cx="300" cy="40" r="5" fill="#10b981" />

                    {/* Labels */}
                    <text x="150" y="80" fontSize="8" fill={colorTextPrimary} fontWeight="bold">₹1,850</text>
                    <text x="300" y="30" fontSize="8" fill={colorTextPrimary} fontWeight="bold">₹2,400</text>
                  </svg>
                </div>
              </div>

              {/* Transactions logs table widget */}
              <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '0.92rem', fontWeight: '800' }}>Recent Account Statements</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { title: "Delivery Commission payout #SB-1024", date: "June 21, 2026", amt: "+₹120", type: "credit" },
                    { title: "Weekend Surge Incentive bonus", date: "June 21, 2026", amt: "+₹50", type: "credit" },
                    { title: "Instant Wallet Payout withdrawal request", date: "June 20, 2026", amt: "-₹2,000", type: "debit" },
                    { title: "Delivery Commission payout #SB-0950", date: "June 19, 2026", amt: "+₹95", type: "credit" }
                  ].map((tx, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.01)' : '#f8fafc' }}>
                      <div>
                        <strong style={{ fontSize: '0.75rem', color: colorTextPrimary, display: 'block' }}>{tx.title}</strong>
                        <span style={{ fontSize: '0.62rem', color: colorTextMuted }}>{tx.date}</span>
                      </div>
                      <strong style={{ fontSize: '0.82rem', color: tx.type === 'credit' ? '#10b981' : 'var(--primary)' }}>
                        {tx.amt}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* MODULE 5: SUPPORT AND LIVE CHAT CENTER */}
        {activeTab === 'support' && (
          <div className="glass-card-no-hover" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', height: '480px', padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
            
            {/* Left Channel selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderRight: `1px solid ${borderColor}`, paddingRight: '16px' }}>
              {[
                { id: 'customer', label: 'Customer Chat', desc: activeOrder.deliverTo },
                { id: 'tailor', label: 'Tailor Partner', desc: activeOrder.pickup },
                { id: 'admin', label: 'StitchBee Admin', desc: 'Platform Help' },
                { id: 'ai', label: 'AI Route Assistant', desc: 'Instant suggestion' }
              ].map(ch => (
                <div 
                  key={ch.id}
                  onClick={() => setSupportContact(ch.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: supportContact === ch.id ? 'var(--primary)' : 'transparent',
                    color: supportContact === ch.id ? '#ffffff' : colorTextPrimary,
                    transition: 'all 0.2s'
                  }}
                >
                  <strong style={{ fontSize: '0.78rem', display: 'block' }}>{ch.label}</strong>
                  <span style={{ fontSize: '0.62rem', color: supportContact === ch.id ? 'rgba(255,255,255,0.7)' : colorTextSecondary }}>{ch.desc}</span>
                </div>
              ))}
            </div>

            {/* Right Chat feed */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              
              {/* Header Contact Info */}
              <div style={{ borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.88rem' }}>Active Support thread: {supportContact.toUpperCase()}</strong>
                <span style={{ fontSize: '0.68rem', color: '#10b981' }}>● Online</span>
              </div>

              {/* Messages timeline */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '14px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(chatHistory[supportContact] || []).map((msg, idx) => (
                  <div key={idx} style={{ alignSelf: msg.sender === 'rider' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                    <div 
                      style={{ 
                        padding: '10px 14px', 
                        borderRadius: '12px', 
                        fontSize: '0.8rem',
                        background: msg.sender === 'rider' ? 'var(--primary)' : (isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9'),
                        color: msg.sender === 'rider' ? '#ffffff' : colorTextPrimary,
                        border: `1px solid ${borderColor}`
                      }}
                    >
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '0.6rem', color: colorTextMuted, marginTop: '2px', display: 'block', textAlign: msg.sender === 'rider' ? 'right' : 'left' }}>
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Composer input */}
              <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '10px' }}>
                {/* Quick actions buttons */}
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
                  {quickReplies.map((reply, idx) => (
                    <button 
                      key={idx} 
                      className="btn btn-secondary" 
                      style={{ fontSize: '0.65rem', padding: '4px 10px', whiteSpace: 'nowrap' }}
                      onClick={() => setTypedMessage(reply)}
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Type message..." 
                    className="form-input" 
                    value={typedMessage} 
                    onChange={e => setTypedMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    style={{ flex: 1, padding: '10px', fontSize: '0.8rem' }}
                  />
                  <button className="btn btn-primary" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center' }} onClick={handleSendMessage}>
                    <Send size={14} />
                  </button>
                </div>
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
          { id: 'home', label: 'Home', icon: <Home size={20} /> },
          { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
          { id: 'navigation', label: 'Route', icon: <Compass size={20} /> },
          { id: 'earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
          { id: 'profile', label: 'Profile', icon: <User size={20} /> }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.62rem',
              fontWeight: 'bold',
              color: activeTab === item.id ? 'var(--primary)' : colorTextMuted,
              cursor: 'pointer'
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </footer>

    </div>
  );
}