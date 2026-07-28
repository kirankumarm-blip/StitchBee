import React, { useState, useEffect, useRef } from 'react';
import { Scissors, User, Award, ShieldAlert, Heart, Star, Sparkles, MapPin, Truck, ChevronRight, Sun, Moon, RefreshCw, Check, Users, ShieldCheck, Headphones, ChevronLeft, ArrowRight } from 'lucide-react';
import { seedDatabase, loadFromStorage, saveToStorage } from './utils/mockDb';
import CustomerView from './components/CustomerView';
import AuthModal from './components/AuthModal';
import AuthPage from './components/AuthPage';
import AboutView from './components/AboutView';
import BlogsView from './components/BlogsView';
import DressCustomizer360 from './components/DressCustomizer360';
import FabricMarketplace from './components/FabricMarketplace';

export default function App() {
  const [role, setRole] = useState('landing'); // 'landing' | 'customer' | 'tailor' | 'student' | 'admin'
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState({ role: 'customer', tab: 'login' });
  const [customerCategory, setCustomerCategory] = useState('all');
  const [customerHub, setCustomerHub] = useState('home');
  const [activeDropdown, setActiveDropdown] = useState(null); // null | 'services' | 'earn'

  // Guest landing banner carousel states
  const [currentLandingSlide, setCurrentLandingSlide] = useState(0);
  const [pauseLandingCarousel, setPauseLandingCarousel] = useState(false);
  const guestLandingBanners = [
    '/banners/banner1.png',
    '/banners/banner2.png',
    '/banners/banner3.png',
    '/banners/banner4.png',
    '/banners/banner5.png',
    '/banners/banner6.png',
    '/banners/banner7.png',
    '/banners/banner8.png',
    '/banners/banner9.png',
    '/banners/banner10.png',
    '/banners/Banner11.png'
  ];


  // Geolocation & Interactive Map States
  const [locationStatus, setLocationStatus] = useState('prompt'); // 'prompt' | 'fetching' | 'success' | 'denied'
  const [userCoords, setUserCoords] = useState({ lat: null, lng: null });
  const [nearbyTailors, setNearbyTailors] = useState([]);
  const [markersRef, setMarkersRef] = useState([]);
  const [hoveredCategoryIdx, setHoveredCategoryIdx] = useState(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1)); // Return distance in km with 1 decimal place
  };

  const handleFindTailors = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLocationStatus('error');
      return;
    }
    
    setLocationStatus('fetching');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserCoords({ lat, lng });
        
        // Dynamically generate 4 nearby tailors around the user's location
        const tailorsData = [
          {
            id: 't_near_1',
            name: "StitchPro Tailors",
            specialty: "Suits & Sherwanis Specialist",
            rating: 4.9,
            orders: 142,
            exp: "8 Years",
            availability: "🟢 Available Today",
            phone: "+91 98765 43210",
            address: "Near Main Market Road",
            latOffset: 0.0065,
            lngOffset: -0.0058
          },
          {
            id: 't_near_2',
            name: "Elite Mens Wear",
            specialty: "Men's Formal & Casual Suits",
            rating: 4.8,
            orders: 98,
            exp: "6 Years",
            availability: "🟡 Next Slot: Tomorrow",
            phone: "+91 98765 43211",
            address: "Opposite Commercial Complex",
            latOffset: -0.0082,
            lngOffset: 0.0094
          },
          {
            id: 't_near_3',
            name: "Bridal Masters",
            specialty: "Luxury Lehengas & Gowns",
            rating: 4.9,
            orders: 210,
            exp: "12 Years",
            availability: "🟢 Available Today",
            phone: "+91 98765 43212",
            address: "Designer Lane, Ground Floor",
            latOffset: 0.0124,
            lngOffset: -0.0112
          },
          {
            id: 't_near_4',
            name: "Quick Alterations",
            specialty: "Hemming, Adjustments & Fittings",
            rating: 4.7,
            orders: 76,
            exp: "3 Years",
            availability: "🟢 Available Today",
            phone: "+91 98765 43213",
            address: "Corner Shop, Near Subway Station",
            latOffset: -0.0041,
            lngOffset: -0.0076
          }
        ].map(t => {
          const tLat = lat + t.latOffset;
          const tLng = lng + t.lngOffset;
          const dist = calculateDistance(lat, lng, tLat, tLng);
          return {
            ...t,
            lat: tLat,
            lng: tLng,
            dist: `${dist} km`
          };
        });
        
        setNearbyTailors(tailorsData);
        setLocationStatus('success');
      },
      (error) => {
        console.error("Geolocation error:", error);
        // Load default Bengaluru tailors if location access is denied
        const defaultLat = 12.9716;
        const defaultLng = 77.5946;
        loadDefaultTailors(defaultLat, defaultLng);
        setLocationStatus('denied');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const loadDefaultTailors = (lat, lng) => {
    const defaultTailors = [
      {
        id: 't_near_1',
        name: "StitchPro Tailors",
        specialty: "Suits & Sherwanis Specialist",
        rating: 4.9,
        orders: 120,
        exp: "8 Years",
        availability: "🟢 Available Today",
        phone: "+91 98765 43210",
        address: "Sector 3, HSR Layout, Bengaluru",
        lat: 12.9141,
        lng: 77.6329
      },
      {
        id: 't_near_2',
        name: "Elite Mens Wear",
        specialty: "Men's Formal & Casual Suits",
        rating: 4.8,
        orders: 85,
        exp: "5 Years",
        availability: "🟡 Next Slot: Tomorrow",
        phone: "+91 98765 43211",
        address: "5th Block, Koramangala, Bengaluru",
        lat: 12.9345,
        lng: 77.6267
      },
      {
        id: 't_near_3',
        name: "Bridal Masters",
        specialty: "Luxury Lehengas & Gowns",
        rating: 4.9,
        orders: 142,
        exp: "10 Years",
        availability: "🟢 Available Today",
        phone: "+91 98765 43212",
        address: "100 Feet Road, Indiranagar, Bengaluru",
        lat: 12.9719,
        lng: 77.6412
      },
      {
        id: 't_near_4',
        name: "Quick Alterations",
        specialty: "Hemming, Adjustments & Fittings",
        rating: 4.7,
        orders: 54,
        exp: "3 Years",
        availability: "🟢 Available Today",
        phone: "+91 98765 43213",
        address: "Jayanagar 4th Block, Bengaluru",
        lat: 12.9298,
        lng: 77.5833
      }
    ].map(t => {
      const dist = calculateDistance(lat, lng, t.lat, t.lng);
      return {
        ...t,
        dist: `${dist} km`
      };
    });
    setNearbyTailors(defaultTailors);
  };

  const initializeMap = (centerLat, centerLng, tailorsList, isDenied = false) => {
    if (!window.L) return;
    
    const container = mapContainerRef.current;
    if (!container) return;
 
    // Remove existing map instance if any to prevent Leaflet container duplicate initialization error
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (e) {
        console.error("Error removing Leaflet map:", e);
      }
      mapInstanceRef.current = null;
    }
    
    // Clear Leaflet internal tracker on container DOM element
    if (container._leaflet_id) {
      delete container._leaflet_id;
    }
    
    const map = window.L.map(container).setView([centerLat, centerLng], 13);
    
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    const markers = [];
    
    const userSvgIcon = window.L.divIcon({
      html: `<div style="background: #4cc9f0; width: 14px; height: 14px; border: 3px solid #fff; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5); animation: pulse-glow 1.5s infinite;"></div>`,
      className: 'custom-user-marker',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
    
    const tailorSvgIcon = window.L.divIcon({
      html: `<div style="background: #f72585; width: 22px; height: 22px; border: 2.5px solid #fff; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="width: 7px; height: 7px; background: #fff; border-radius: 50%; transform: rotate(45deg);"></div></div>`,
      className: 'custom-tailor-marker',
      iconSize: [22, 22],
      iconAnchor: [11, 22]
    });
    
    if (!isDenied) {
      window.L.marker([centerLat, centerLng], { icon: userSvgIcon })
        .addTo(map)
        .bindPopup(`<strong>📍 Your Location</strong>`)
        .openPopup();
    }
    
    tailorsList.forEach(t => {
      const marker = window.L.marker([t.lat, t.lng], { icon: tailorSvgIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: Inter, sans-serif; color: #111; padding: 4px; text-align: left;">
            <strong style="font-size: 0.85rem; display: block; margin-bottom: 2px;">${t.name}</strong>
            <span style="font-size: 0.72rem; color: #555; display: block; margin-bottom: 2px;">${t.specialty}</span>
            <span style="font-size: 0.72rem; font-weight: bold; color: #f72585;">⭐ ${t.rating} • ${t.dist} away</span>
          </div>
        `);
      markers.push({ id: t.id, marker });
    });
    
    mapInstanceRef.current = map;
    setMarkersRef(markers);
  };
 
  // Effect to automatically initialize map once location access resolves and DOM renders the container
  useEffect(() => {
    if ((locationStatus === 'success' || locationStatus === 'denied') && nearbyTailors.length > 0) {
      initializeMap(
        locationStatus === 'success' ? userCoords.lat : 12.9716,
        locationStatus === 'success' ? userCoords.lng : 77.5946,
        nearbyTailors,
        locationStatus === 'denied'
      );
    }
 
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.error("Cleanup map error:", e);
        }
        mapInstanceRef.current = null;
      }
    };
  }, [locationStatus, nearbyTailors, userCoords]);
 
  const handleViewOnMap = (tailor) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([tailor.lat, tailor.lng], 15);
      const found = markersRef.find(m => m.id === tailor.id);
      if (found) {
        found.marker.openPopup();
      }
    }
  };
 
  const handleBookTailor = (tailorName) => {
    alert(`Booking initiated for ${tailorName}! We will fetch your size profile and direct you to customize the order.`);
    if (!currentUser) {
      openAuthModal('customer', 'login');
    } else {
      setCustomerHub('tailors');
      setRole('customer');
    }
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      setActiveDropdown(null);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const handleCategorySelect = (categoryKey) => {
    setCustomerCategory(categoryKey);
    setCustomerHub('fabrics');
    setRole('customer');
  };

  const [theme, setTheme] = useState(localStorage.getItem('stitchbee_theme') || 'dark');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedFaqIdx, setExpandedFaqIdx] = useState(null);
  const reelsRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);

  useEffect(() => {
    // Lock scrolling on mount if splash screen is visible
    document.body.style.overflow = 'hidden';
    
    const fadeTimer = setTimeout(() => {
      setSplashFade(true);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
      // Restore scrolling after splash screen transitions away
      document.body.style.overflow = '';
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  const scrollReels = (direction) => {
    if (reelsRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      reelsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto scroll landing slideshow
  useEffect(() => {
    if (role === 'landing') {
      const slideInterval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 4);
      }, 4000);
      return () => clearInterval(slideInterval);
    }
  }, [role]);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('stitchbee_theme', theme);
  }, [theme]);

  // Scroll to top when view/role changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [role]);
  
  // Database states
  const [tailors, setTailors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [studentState, setStudentState] = useState({
    certified: false,
    quizPassed: false,
    wallet: { earnings: 150, completedGigs: 1 }
  });

  // Marketplace states
  const [fabrics, setFabrics] = useState([]);
  const [sarees, setSarees] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [banners, setBanners] = useState([]);
  const [articles, setArticles] = useState([]);
  const [ledger, setLedger] = useState({
    platformCommission: 650,
    fabricSales: 0,
    sareeSales: 0,
    designerSales: 0,
    registrationCredits: 100,
    totalRevenue: 750
  });

  // 1. Initialize Database
  useEffect(() => {
    seedDatabase();
    setTailors(loadFromStorage('stichbee_tailors', []));
    setOrders(loadFromStorage('stichbee_orders', []));
    setFabrics(loadFromStorage('stichbee_fabrics', []));
    setSarees(loadFromStorage('stichbee_sarees', []));
    setDesigners(loadFromStorage('stichbee_designers', []));
    setBanners(loadFromStorage('stichbee_banners', []));
    setArticles(loadFromStorage('stichbee_articles', []));
    setLedger(loadFromStorage('stichbee_ledger', {
      platformCommission: 650,
      fabricSales: 0,
      sareeSales: 0,
      designerSales: 0,
      registrationCredits: 100,
      totalRevenue: 750
    }));
    setStudentState(loadFromStorage('stichbee_student', {
      certified: false,
      quizPassed: false,
      wallet: { earnings: 150, completedGigs: 1 }
    }));

    // Load user session
    const savedUser = localStorage.getItem('stitchbee_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setCurrentUser(parsed);
      if (parsed.role) {
        setRole(parsed.role);
      }
    }
  }, []);

  // Guest landing banner carousel auto-scroll every 5 seconds (5000ms)
  useEffect(() => {
    if (pauseLandingCarousel || role !== 'landing') return;
    const interval = setInterval(() => {
      setCurrentLandingSlide((prev) => (prev + 1) % guestLandingBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pauseLandingCarousel, role]);

  // Scroll reveal animation observer for guest landing folds
  useEffect(() => {
    if (role !== 'landing') return;

    const observerOptions = {
      root: null,
      rootMargin: '0px -40px 0px -40px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
      const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
      targets.forEach((target) => observer.observe(target));
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [role, locationStatus]);

  const nextLandingSlide = () => {
    setCurrentLandingSlide((prev) => (prev + 1) % guestLandingBanners.length);
  };

  const prevLandingSlide = () => {
    setCurrentLandingSlide((prev) => (prev - 1 + guestLandingBanners.length) % guestLandingBanners.length);
  };

  const handleLandingBannerClick = () => {
    if (!currentUser) {
      openAuthModal('customer', 'login');
    } else {
      setRole('customer');
      setCustomerHub('tailors');
      // If fabrics slide is active (Banner 4 / index 3), open fabrics
      if (currentLandingSlide === 3) {
        setCustomerHub('fabrics');
      }
    }
  };

  // 2. Synchronize Storage
  const updateTailorsState = (newTailors) => {
    setTailors(newTailors);
    saveToStorage('stichbee_tailors', newTailors);
  };

  const addOrder = (newOrder) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveToStorage('stichbee_orders', updated);
  };

  const updateOrderStatus = (orderId, newStatus, assignedStudentId) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          ...(newStatus ? { status: newStatus } : {}),
          ...(assignedStudentId ? { studentId: assignedStudentId } : {})
        };
      }
      return o;
    });
    setOrders(updated);
    saveToStorage('stichbee_orders', updated);
  };

  const updateOrderMeasurements = (orderId, measurements) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          measurements
        };
      }
      return o;
    });
    setOrders(updated);
    saveToStorage('stichbee_orders', updated);
  };

  const handleStudentStateChange = (newState) => {
    setStudentState(newState);
    saveToStorage('stichbee_student', newState);
  };

  const handleLedgerStateChange = (newLedger) => {
    setLedger(newLedger);
    saveToStorage('stichbee_ledger', newLedger);
  };

  const handleBannersStateChange = (newBanners) => {
    setBanners(newBanners);
    saveToStorage('stichbee_banners', newBanners);
  };

  const handleArticlesStateChange = (newArticles) => {
    setArticles(newArticles);
    saveToStorage('stichbee_articles', newArticles);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData.role) {
      setRole(userData.role);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('stitchbee_user');
    setCurrentUser(null);
    setRole('landing');
  };

  const openAuthModal = (targetRole, tab) => {
    setAuthModalConfig({ role: targetRole, tab });
    setRole(tab); // tab is 'login' or 'signup'
  };

  const navigateToSection = (sectionId) => {
    setRole('landing');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleTrackOrder = () => {
    if (!currentUser) {
      openAuthModal('customer', 'login');
    } else {
      setRole('customer');
      setCustomerHub('history');
    }
  };

  const handleEarnClick = (targetRole) => {
    if (!currentUser) {
      openAuthModal(targetRole, 'signup');
    } else {
      setRole(targetRole);
    }
  };

  return (
    <div className="app-container">
      
      {/* Top sticky navigation bar */}
      {!['customer', 'tailor', 'student', 'admin', 'delivery', 'login', 'signup'].includes(role) && (
        <header className="top-nav">
          <div className="logo" onClick={() => setRole('landing')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="StitchBee" style={{ height: '100px', width: '300px', objectFit: 'contain', display: 'block', marginLeft: '-60px' }} />
          </div>
          
          <div className="role-switcher">
  
  
            <div className="nav-item-relative">
              <button 
                className="role-btn" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setActiveDropdown(activeDropdown === 'services' ? null : 'services'); 
                }}
              >
                Services ▼
              </button>
              <ul className={`nav-dropdown-menu services-dropdown-menu ${activeDropdown === 'services' ? 'show' : ''}`}>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'mens' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('mens'); setActiveDropdown(null); }}>Men</li>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'womens' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('womens'); setActiveDropdown(null); }}>Women</li>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'bridal' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('bridal'); setActiveDropdown(null); }}>Bridal</li>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'kids' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('kids'); setActiveDropdown(null); }}>Kids</li>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'alterations' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('alterations'); setActiveDropdown(null); }}>Alterations</li>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'uniforms' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('uniforms'); setActiveDropdown(null); }}>Uniforms</li>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'bags' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('bags'); setActiveDropdown(null); }}>Bags And Leathers</li>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'shoes' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('shoes'); setActiveDropdown(null); }}>Shoes And Slippers</li>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'seats' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('seats'); setActiveDropdown(null); }}>Vehicle Seat Covers</li>
                <li className={`dropdown-item ${role === 'customer' && customerHub === 'designers' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('designers'); setCustomerCategory('all'); setActiveDropdown(null); }}>Custom Design</li>
              </ul>
            </div>
  
            <button 
              className="role-btn"
              onClick={() => navigateToSection('how-it-works')}
            >
              How It Works
            </button>
  
            <button 
              className="role-btn"
              onClick={() => navigateToSection('tailors-near-you')}
            >
              Tailors Near You
            </button>
  
            <button 
              className="role-btn"
              onClick={() => navigateToSection('pricing-section')}
            >
              Pricing
            </button>
  
            <button 
              className="role-btn"
              onClick={handleTrackOrder}
            >
              Track Order
            </button>

  
            <button 
              className={`role-btn ${role === 'blogs' ? 'active' : ''}`}
              onClick={() => setRole('blogs')}
            >
              Blogs
            </button>
  
            <button 
              className="role-btn"
              onClick={() => navigateToSection('contact-footer')}
            >
              Contact
            </button>
          </div>
  
          {/* User Profile / Auth Area */}
          <div className="top-nav-auth" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{ padding: '8px', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.03)' }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} style={{ color: '#fbbf24' }} /> : <Moon size={16} style={{ color: 'var(--primary)' }} />}
            </button>
  
            {currentUser ? (
              <div className="user-profile-nav">
                <div className="user-profile-chip" onClick={() => setRole(currentUser.role)} style={{ cursor: 'pointer' }}>
                  <div className="user-profile-avatar">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{currentUser.name}</span>
                  <span className="user-profile-role-badge">{currentUser.role === 'admin' ? 'Admin' : currentUser.role}</span>
                </div>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '6px 12px', fontSize: '0.8rem', minHeight: '32px' }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  className="btn btn-secondary" 
                  style={{ minHeight: '32px', padding: '6px 16px', fontSize: '0.85rem' }} 
                  onClick={() => openAuthModal('customer', 'login')}
                >
                  Login
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '6px 16px', fontSize: '0.85rem', minHeight: '32px' }} 
                  onClick={() => openAuthModal('customer', 'signup')}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      {role === 'landing' && (
        <div className="animate-fade-in">
          {/* Fold 1: Hero Carousel Banner & Stats Fold */}
          <section style={{ padding: '1.5rem 0 0.5rem 0', width: '100%', margin: '0 auto' }}>
            <div className="landing-container" style={{ padding: '0 10px' }}>
              
              {/* Full-width Carousel Banner Card */}
              <div 
                style={{ 
                  position: 'relative', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  padding: 0,
                  width: '100%',
                  aspectRatio: '1024 / 315',
                  height: 'auto',
                  borderRadius: '0px',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent'
                }}
                onMouseEnter={() => setPauseLandingCarousel(true)}
                onMouseLeave={() => setPauseLandingCarousel(false)}
                onClick={handleLandingBannerClick}
              >
                {/* Slides */}
                {guestLandingBanners.map((banner, idx) => (
                  <img 
                    key={idx}
                    src={banner} 
                    alt={`banner-${idx+1}`} 
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'fill',
                      opacity: currentLandingSlide === idx ? 1 : 0,
                      transition: 'opacity 0.8s ease-in-out',
                      pointerEvents: currentLandingSlide === idx ? 'auto' : 'none'
                    }}
                  />
                ))}

                {/* Dot Indicators */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '6px',
                  zIndex: 20,
                  background: 'rgba(0,0,0,0.25)',
                  padding: '5px 12px',
                  borderRadius: '20px'
                }}>
                  {guestLandingBanners.map((_, idx) => (
                    <span 
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentLandingSlide(idx);
                      }}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: currentLandingSlide === idx ? 'var(--primary)' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Horizontal statistics / features bar */}
              <div 
                className="landing-stats-bar" 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-around', 
                  alignItems: 'center',
                  background: 'transparent', 
                  border: 'none', 
                  borderRadius: '16px', 
                  padding: '16px 0', 
                  marginTop: '16px',
                  boxShadow: 'none',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                {[
                  { icon: <Users size={18} />, value: "500+", label: "Expert Tailors", bg: 'rgba(247, 37, 133, 0.08)', color: 'var(--primary)' },
                  { icon: <Heart size={18} />, value: "50K+", label: "Happy Customers", bg: 'rgba(247, 37, 133, 0.08)', color: 'var(--primary)' },
                  { icon: <Star size={18} />, value: "4.8 ★", label: "Average Rating", bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' },
                  { icon: <ShieldCheck size={18} />, value: "100%", label: "Quality Assurance", bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
                  { icon: <Headphones size={18} />, value: "24/7", label: "Customer Support", bg: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`stats-bar-item reveal-zoom stagger-${idx + 1}`}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      flex: 1,
                      justifyContent: 'center',
                      minWidth: '160px',
                      borderRight: 'none',
                      paddingRight: 0
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', background: item.bg, color: item.color, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>{item.value}</h4>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* Fold 2: Quick Service Categories */}
          <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
            <div className="landing-container reveal">
              <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>Quick Service Categories</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Select from our premium custom tailoring categories</p>
              </div>
            
              <div className="categories-grid-v2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {[
                  { 
                    name: "Men's Tailoring", 
                    img: "./mens_tailoring.jpg", 
                    desc: "Custom shirts, suits, trousers, kurtas & traditional wear.", 
                    cat: "mens",
                    icon: <span style={{ fontSize: '1.2rem', fontWeight: 'bold', lineHeight: 1 }}>♂</span>
                  },
                  { 
                    name: "Women's Tailoring", 
                    img: "./womens_tailoring_v2.jpg", 
                    desc: "Stitched kurtis, lehengas, suits, and daily-wear ethnic outfits.", 
                    cat: "womens",
                    icon: <span style={{ fontSize: '1.2rem', fontWeight: 'bold', lineHeight: 1 }}>♀</span>
                  },
                  { 
                    name: "Bridal Wear", 
                    img: "./bridal_wear.jpg", 
                    desc: "Exquisite wedding lehengas, heavy embroidered gowns, and luxury wear.", 
                    cat: "bridal",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L9 7h6z M9 7l-2 15h10L15 7z" />
                      </svg>
                    )
                  },
                  { 
                    name: "Alterations & Fit", 
                    img: "./alterations_fit_v2.jpg", 
                    desc: "Expert alterations, sizing corrections, and perfect custom-fit styling.", 
                    cat: "alterations",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
                        <line x1="6" y1="7" x2="6" y2="12" />
                        <line x1="10" y1="7" x2="10" y2="12" />
                        <line x1="14" y1="7" x2="14" y2="12" />
                        <line x1="18" y1="7" x2="18" y2="12" />
                      </svg>
                    )
                  },
                  { 
                    name: "Uniform Stitching", 
                    img: "./uniform_stitching.jpg", 
                    desc: "Perfect school, college, corporate and professional uniforms.", 
                    cat: "uniforms",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l1.08 5.4a2 2 0 00.99 1.42L9 15v5a2 2 0 002 2h2a2 2 0 002-2v-5l4.65-2.49a2 2 0 00.99-1.42l1.08-5.4a2 2 0 00-1.34-2.23z" />
                      </svg>
                    )
                  },
                  { 
                    name: "Custom Design", 
                    img: "./custom_design.jpg", 
                    desc: "Collaborate with designers for one-of-a-kind bespoke creations.", 
                    cat: "all",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <line x1="20" y1="4" x2="8.12" y2="15.88" />
                        <line x1="14.47" y1="14.48" x2="20" y2="20" />
                        <line x1="8.12" y1="8.12" x2="12" y2="12" />
                      </svg>
                    )
                  },
                  { 
                    name: "Kids Wear", 
                    img: "./kids_wear_v2.jpg", 
                    desc: "Comfortable and cute clothes for children of all ages.", 
                    cat: "kids",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22a10 10 0 100-20 10 10 0 000 20z" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    )
                  },
                  { 
                    name: "Bags & Leathers", 
                    img: "./bags_leathers.jpg", 
                    desc: "Premium tailored leather jackets, custom travel bags, and goods.", 
                    cat: "bags",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="9" width="18" height="11" rx="2" ry="2" />
                        <path d="M16 9V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v4" />
                      </svg>
                    )
                  },
                  { 
                    name: "Shoes & Slippers", 
                    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80", 
                    desc: "Custom fitted boots, sandals, loafers and traditional footwear.", 
                    cat: "shoes",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12h18M3 12a9 9 0 009 9h6a3 3 0 003-3v-6a9 9 0 00-9-9H6a3 3 0 00-3 3v6z" />
                      </svg>
                    )
                  },
                  { 
                    name: "Vehicle Seat Covers", 
                    img: "./vehicle_seats.jpg", 
                    desc: "Tailored car & bike seat covers, matching interior trims & styling.", 
                    cat: "seats",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                      </svg>
                    )
                  },
                  {
                    name: "Pets",
                    img: "./Pets.png",
                    desc: "Custom stitched dresses & outfits for your furry friends.",
                    cat: "all",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <circle cx="7.5" cy="8.5" r="2.5" />
                        <circle cx="12" cy="6" r="2.5" />
                        <circle cx="16.5" cy="8.5" r="2.5" />
                        <path d="M12 13c-2.5 0-4.5 2-4.5 4.5S9.5 22 12 22s4.5-2 4.5-4.5S14.5 13 12 13z" />
                      </svg>
                    )
                  },
                  {
                    name: "Hand Made Gifts",
                    img: "./why_join_4.png",
                    desc: "Personalized stitching, fabric gifts & embroidered crafts.",
                    cat: "all",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 12 20 22 4 22 4 12" />
                        <rect x="2" y="7" width="20" height="5" />
                        <line x1="12" y1="22" x2="12" y2="7" />
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                      </svg>
                    )
                  },
                  {
                    name: "Bulk Orders",
                    img: "./Uniform.png",
                    desc: "Wholesale uniform stitching, corporate garments & event orders.",
                    cat: "uniforms",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )
                  },
                  {
                    name: "Sofas",
                    img: "./Vehicle Seat Covers.png",
                    desc: "Custom fitted sofa covers, cushions & upholstery stitching.",
                    cat: "seats",
                    icon: (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 10V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v5a4 4 0 0 0-4 4v4a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-4a4 4 0 0 0-4-4z" />
                        <line x1="6" y1="18" x2="6" y2="21" />
                        <line x1="18" y1="18" x2="18" y2="21" />
                      </svg>
                    )
                  }
                ].map((category, idx) => (
                <div 
                  key={idx} 
                  className={`category-card-v2 reveal-zoom stagger-${(idx % 4) + 1}`} 
                  onClick={() => {
                    setCustomerCategory(category.cat);
                    setCustomerHub('category-landing');
                    setRole('customer');
                  }}
                  onMouseEnter={() => setHoveredCategoryIdx(idx)}
                  onMouseLeave={() => setHoveredCategoryIdx(null)}
                  style={{
                    background: theme === 'dark' ? '#1a1a2e' : '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: hoveredCategoryIdx === idx
                      ? '0 20px 35px rgba(247,37,133,0.18), 0 4px 15px rgba(0,0,0,0.1)'
                      : '0 4px 20px rgba(0,0,0,0.03)',
                    border: `1px solid ${hoveredCategoryIdx === idx ? 'var(--primary)' : (theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f1f5f9')}`,
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    position: 'relative',
                    transform: hoveredCategoryIdx === idx ? 'translateY(-10px) scale(1.03)' : 'translateY(0) scale(1)'
                  }}
                >
                  {/* Image wrapper */}
                  <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden' }}>
                    <img 
                      src={category.img} 
                      alt={category.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
                        transform: hoveredCategoryIdx === idx ? 'scale(1.12)' : 'scale(1)'
                      }} 
                    />
                    {/* Overlapping Badge Icon */}
                    <div 
                      style={{
                        position: 'absolute',
                        left: '16px',
                        bottom: '-18px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: theme === 'dark' ? '#24243e' : '#ffffff',
                        border: `1px solid ${hoveredCategoryIdx === idx ? 'var(--primary)' : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0')}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        zIndex: 10,
                        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                        transform: hoveredCategoryIdx === idx ? 'scale(1.15) rotate(10deg)' : 'scale(1) rotate(0deg)'
                      }}
                    >
                      {category.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px 16px 16px 16px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.05rem', 
                        fontWeight: '800', 
                        color: hoveredCategoryIdx === idx ? 'var(--primary)' : 'var(--text-primary)', 
                        margin: '0 0 6px 0',
                        transition: 'color 0.3s ease'
                      }}>
                        {category.name}
                      </h3>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                        {category.desc}
                      </p>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      color: 'var(--primary)', 
                      fontSize: '0.82rem', 
                      fontWeight: '700',
                      transition: 'transform 0.3s ease',
                      transform: hoveredCategoryIdx === idx ? 'translateX(4px)' : 'translateX(0)'
                    }}>
                      <span>Explore</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </section>

          {/* Fold 3: How It Works */}
          <section id="how-it-works" style={{ padding: '6rem 0', borderTop: '1px solid var(--border-color)', background: theme === 'dark' ? '#0b0a11' : '#f8fafc', overflow: 'hidden' }}>
            <div className="landing-container reveal how-it-works-container-premium">
              <div className="how-it-works-mesh-bg"></div>
              
              <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.8rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', color: theme === 'dark' ? '#fff' : '#0f172a', letterSpacing: '-0.02em' }}>
                  How <span style={{ background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StitchBee</span> Works
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1.08rem', fontWeight: '500' }}>Get your custom outfit in 4 easy steps</p>
              </div>

              {/* Connected Timeline Progress Line (Desktop only) */}
              <div className="timeline-progress-line-desktop" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem auto 3.5rem auto', maxWidth: '800px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '40px', right: '40px', height: '2px', background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#e2e8f0', zIndex: 1 }}>
                  <div style={{ width: '100%', height: '100%', borderTop: '2px dashed var(--border-color)' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: theme === 'dark' ? '#0b0a11' : '#f8fafc', padding: '0 12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', border: '2px solid var(--primary)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem' }}>1</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: theme === 'dark' ? '#0b0a11' : '#f8fafc', padding: '0 12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', border: '2px solid var(--accent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem' }}>2</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: theme === 'dark' ? '#0b0a11' : '#f8fafc', padding: '0 12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', border: '2px solid var(--success)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem' }}>3</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: theme === 'dark' ? '#0b0a11' : '#f8fafc', padding: '0 12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', border: '2px solid #8b5cf6', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem' }}>4</div>
                  </div>
                </div>
              </div>

              <div className="timeline-grid-premium">
                {/* Step 1: Select Style */}
                <div className="how-step-card-premium theme-pink reveal-zoom stagger-1">
                  {/* Card Header Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#fff',
                      border: '2px solid var(--primary)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.85rem'
                    }}>
                      1
                    </div>
                    <div style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#fff5f8',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(247,37,133,0.15)'}`,
                      color: 'var(--primary)',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ⏱ 2 mins
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: theme === 'dark' ? '#fff' : '#0f172a', textAlign: 'center', margin: '4px 0 12px 0' }}>
                    Select Style
                  </h3>

                  <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                    <img src="./step_style.jpg" alt="Select Style" style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }} />
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(247,37,133,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Browse 1000+ designs</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(247,37,133,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Upload inspiration photos</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(247,37,133,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Customize sleeves & necks</span>
                    </li>
                  </ul>
                </div>

                {/* Step 2: Measure Body */}
                <div className="how-step-card-premium theme-blue reveal-zoom stagger-2">
                  {/* Card Header Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#fff',
                      border: '2px solid var(--accent)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.85rem'
                    }}>
                      2
                    </div>
                    <div style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#ecfeff',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(76,201,240,0.15)'}`,
                      color: 'var(--accent)',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ⏱ 5 mins
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: theme === 'dark' ? '#fff' : '#0f172a', textAlign: 'center', margin: '4px 0 12px 0' }}>
                    Measure Body
                  </h3>

                  <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                    <img src="./step_measure.jpg" alt="Measure Body" style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }} />
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(76,201,240,0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Instant 3D AI Scan</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(76,201,240,0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Home Visit pickup slots</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(76,201,240,0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Reference dress sizing</span>
                    </li>
                  </ul>
                </div>

                {/* Step 3: Choose Tailor */}
                <div className="how-step-card-premium theme-green reveal-zoom stagger-3">
                  {/* Card Header Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#fff',
                      border: '2px solid var(--success)',
                      color: 'var(--success)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.85rem'
                    }}>
                      3
                    </div>
                    <div style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f0fdf4',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(16,185,129,0.15)'}`,
                      color: 'var(--success)',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ⏱ 10 mins
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: theme === 'dark' ? '#fff' : '#0f172a', textAlign: 'center', margin: '4px 0 12px 0' }}>
                    Choose Tailor
                  </h3>

                  <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                    <img src="./step_tailor.jpg" alt="Choose Tailor" style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }} />
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(16,185,129,0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Compare tailor bids</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(16,185,129,0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Direct real-time chat</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(16,185,129,0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Check rating reviews</span>
                    </li>
                  </ul>
                </div>

                {/* Step 4: Delivered */}
                <div className="how-step-card-premium theme-purple reveal-zoom stagger-4">
                  {/* Card Header Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', marginBottom: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#fff',
                      border: '2px solid #8b5cf6',
                      color: '#8b5cf6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.85rem'
                    }}>
                      4
                    </div>
                    <div style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f5f3ff',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(139,92,246,0.15)'}`,
                      color: '#8b5cf6',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ⏱ 3-5 Days
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: theme === 'dark' ? '#fff' : '#0f172a', textAlign: 'center', margin: '4px 0 12px 0' }}>
                    Delivered
                  </h3>

                  <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9'}` }}>
                    <img src="./step_delivery.jpg" alt="Delivered" style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }} />
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Live tracking</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>Contactless doorstep drop</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: theme === 'dark' ? 'var(--text-secondary)' : '#475569', textAlign: 'left' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span style={{ fontWeight: '500' }}>7-day free alterations</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom CTA Block */}
              <div 
                className="reveal" 
                style={{ 
                  marginTop: '4rem', 
                  background: theme === 'dark' ? 'rgba(247,37,133,0.04)' : '#fff5f8', 
                  border: `1px solid ${theme === 'dark' ? 'rgba(247,37,133,0.15)' : 'rgba(247,37,133,0.08)'}`, 
                  borderRadius: '24px', 
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  flexWrap: 'wrap',
                  textAlign: 'left',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', border: '2px solid rgba(247,37,133,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                      <circle cx="12" cy="11" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: theme === 'dark' ? '#fff' : '#0f172a', margin: 0 }}>
                      Ready to design your perfect custom outfit?
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.92rem' }}>
                      Your style. Your fit. Made just for you.
                    </p>
                  </div>
                </div>
                <button 
                  className="btn" 
                  onClick={() => {
                    if (!currentUser) {
                      openAuthModal('customer', 'login');
                    } else {
                      setRole('customer');
                      setCustomerHub('landing');
                    }
                  }}
                  style={{ 
                    padding: '14px 32px', 
                    fontSize: '1.02rem', 
                    fontWeight: '700', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', 
                    color: '#ffffff',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    boxShadow: '0 8px 25px rgba(247,37,133,0.25)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ color: '#ffffff' }}>Start Designing</span> <ArrowRight size={18} style={{ color: '#ffffff' }} />
                </button>
              </div>
            </div>
          </section>

          {/* Fold 4: Popular Designs Section */}
          <section id="popular-designs" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
            <div className="landing-container reveal-zoom">
              <div className="reels-header reveal">
              <div className="reels-title-box">
                <h2 className="reels-title">Trending Designer Outfits</h2>
                <p className="reels-subtitle">Watch fits and choose custom designs from our master fashion designers</p>
              </div>
              <div className="reels-nav-group">
                <button className="reels-nav-btn" onClick={() => scrollReels('left')} title="Scroll Left">&#8592;</button>
                <button className="reels-nav-btn" onClick={() => scrollReels('right')} title="Scroll Right">&#8594;</button>
              </div>
            </div>

            <div className="reels-carousel-container">
              <div className="reels-carousel" ref={reelsRef}>
                {[
                  { title: "Zardozi Royal Lehenga", designer: "Sneha Reddy (Expert)", price: 8500, cat: "bridal", videoUrl: "./trending_video_1.mp4" },
                  { title: "Italian Double-Breasted Suit", designer: "Vikram Singh (Expert)", price: 5500, cat: "mens", videoUrl: "./trending_video_2.mp4" },
                  { title: "Georgette Floral Kurti", designer: "Ananya Pillai (Expert)", price: 1200, cat: "womens", videoUrl: "./trending_video_3.mp4" },
                  { title: "Padded Silk Blouse", designer: "Sarah Khan (Expert)", price: 1500, cat: "womens", videoUrl: "./trending_video_4.mp4" },
                  { title: "Classic Oxford Cotton Shirt", designer: "Amit Kumar (Student)", price: 1800, cat: "mens", videoUrl: "./trending_video_5.mp4" },
                  { title: "Handwoven Chanderi Saree", designer: "Pooja Mehta (Expert)", price: 6200, cat: "womens", videoUrl: "./trending_video_6.mp4" },
                  { title: "Bespoke Indigo Sherwani", designer: "Rajesh Nair (Expert)", price: 9500, cat: "mens", videoUrl: "./trending_video_7.mp4" },
                  { title: "Organza Pastel Anarkali", designer: "Kiran Shah (Student)", price: 4800, cat: "womens", videoUrl: "./trending_video_8.mp4" },
                  { title: "Kid's Velvet Party Suit", designer: "Meena Patel (Expert)", price: 2400, cat: "kids", videoUrl: "./trending_video_9.mp4" },
                  { title: "Premium Tweed Blazer", designer: "Sanjay Dutta (Expert)", price: 3800, cat: "mens", videoUrl: "./trending_video_10.mp4" },
                  { title: "Satin Evening Slip Gown", designer: "Nisha Sen (Student)", price: 5200, cat: "womens", videoUrl: "./trending_video_11.mp4" },
                  { title: "Embroidered Pashmina Shawl", designer: "Harish Gupta (Expert)", price: 7000, cat: "womens", videoUrl: "./trending_video_12.mp4" }
                ].map((reel, idx) => (
                  <div 
                    key={idx} 
                    className={`reel-card reveal-zoom stagger-${(idx % 4) + 1}`}
                    onMouseEnter={(e) => {
                      const videoEl = e.currentTarget.querySelector('video');
                      if (videoEl) videoEl.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                      const videoEl = e.currentTarget.querySelector('video');
                      if (videoEl) videoEl.pause();
                    }}
                    onClick={(e) => {
                      const videoEl = e.currentTarget.querySelector('video');
                      if (videoEl) {
                        if (videoEl.paused) {
                          videoEl.muted = false;
                          videoEl.play().catch(() => {});
                        } else {
                          videoEl.pause();
                        }
                      }
                    }}
                  >
                    <div className="reel-play-overlay">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <video className="reel-video" src={reel.videoUrl} muted loop playsInline />
                    <div className="reel-info-overlay" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span className="badge" style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.65rem', margin: 0, width: 'fit-content' }}>
                          ₹{reel.price}
                        </span>
                        <button 
                          className="btn btn-primary" 
                          style={{ 
                            padding: '3px 8px', 
                            fontSize: '0.65rem', 
                            background: 'var(--primary)', 
                            border: 'none', 
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }} 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (!currentUser) { 
                              openAuthModal('customer', 'login'); 
                            } else { 
                              setCustomerCategory(reel.cat); 
                              setCustomerHub('designers'); 
                              setRole('customer'); 
                            } 
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                      <div className="reel-designer">
                        <div className="reel-designer-avatar">{reel.designer.charAt(0)}</div>
                        <span className="reel-designer-name">By {reel.designer}</span>
                      </div>
                      <span className="reel-title-text">{reel.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </section>

          {/* Fold 5: Fabric Marketplace */}
          <div className="reveal">
            <FabricMarketplace 
              openAuthModal={openAuthModal} 
              currentUser={currentUser} 
              setRole={setRole}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Fold 6: Tailors Near You */}
          <section id="tailors-near-you" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
            <div className="landing-container">
              <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>Verified Tailors Near You</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Locate verified boutique partners offering doorstep measurement trials</p>
              </div>

              {locationStatus === 'prompt' && (
                <div className="glass-card-no-hover" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '40px', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', height: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.15, background: 'radial-gradient(circle, rgba(247,37,133,0.5) 10%, transparent 10.5%), radial-gradient(circle, rgba(255,255,255,0.2) 20%, transparent 20.5%)', backgroundSize: '20px 20px' }}></div>
                    <MapPin size={56} style={{ color: 'var(--primary)', zIndex: 1, animation: 'pulse-glow 1.5s infinite' }} />
                    <div style={{ zIndex: 1, color: '#fff', fontSize: '0.8rem', opacity: 0.6 }}>Map Preview Overlay</div>
                  </div>
                  <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <span className="badge badge-primary" style={{ alignSelf: 'flex-start', fontSize: '0.65rem' }}>GPS GEOLOCATION SEARCH</span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>Find Boutiques in Your Neighborhood</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      StitchBee requests browser GPS location access to find and rank local sewing partners. Allowing access enables real-time geodesic calculations (in KM) and maps precise doorstep pickup route trials.
                    </p>
                    <button 
                      onClick={handleFindTailors} 
                      className="btn btn-primary" 
                      style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}
                    >
                      <MapPin size={16} /> Allow Location Access & Search
                    </button>
                  </div>
                </div>
              )}

              {locationStatus === 'fetching' && (
                <div className="glass-card-no-hover" style={{ padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  <RefreshCw size={40} className="animate-spin" style={{ color: 'var(--primary)' }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>Querying GPS Coordinates...</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px' }}>Please allow browser location permissions if prompted. Fetching nearest tailoring studios...</p>
                  </div>
                </div>
              )}

              {(locationStatus === 'success' || locationStatus === 'denied') && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
                  
                  {/* Left Column: Map Preview */}
                  <div className="reveal-left" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', height: '420px' }}>
                    <div 
                      ref={mapContainerRef} 
                      style={{ width: '100%', height: '100%' }} 
                    />
                    
                    {/* Custom Map Top Status Banner */}
                    <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', zIndex: 1000, pointerEvents: 'none' }}>
                      {locationStatus === 'success' ? (
                        <div style={{ background: 'rgba(16,185,129,0.95)', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '6px 12px', borderRadius: '6px', backdropFilter: 'blur(4px)', display: 'inline-flex', alignItems: 'center', gap: '6px', pointerEvents: 'auto' }}>
                          <Check size={12} /> Map showing tailors near your GPS coordinates
                        </div>
                      ) : (
                        <div style={{ background: 'rgba(239,68,68,0.95)', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', padding: '6px 12px', borderRadius: '6px', backdropFilter: 'blur(4px)', display: 'inline-flex', alignItems: 'center', gap: '6px', pointerEvents: 'auto' }}>
                          ⚠️ GPS Denied. Showing default partners in Bengaluru
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Tailors List */}
                  <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '420px', overflowY: 'auto', paddingRight: '6px' }}>
                    <div style={{ textAlign: 'left', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                        📍 {locationStatus === 'success' ? 'Your Neighborhood' : 'Bengaluru Area'}
                      </span>
                      <span className="badge" style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.06)' }}>
                        {nearbyTailors.length} Studios Found
                      </span>
                    </div>

                    {nearbyTailors.map((tailor) => (
                      <div 
                        key={tailor.id} 
                        className="glass-card-no-hover" 
                        style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.06)', transition: 'border 0.3s' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                          <div>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#fff' }}>{tailor.name}</h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tailor.specialty}</span>
                          </div>
                          <span style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24', fontSize: '0.72rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                            <Star size={10} fill="#fbbf24" /> {tailor.rating}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
                          <div>Distance: <strong style={{ color: 'var(--accent)' }}>{tailor.dist}</strong></div>
                          <div>•</div>
                          <div>Avail: <strong style={{ color: tailor.availability.includes('🟢') ? '#10b981' : '#f59e0b' }}>{tailor.availability.replace('🟢 ', '').replace('🟡 ', '')}</strong></div>
                          <div>•</div>
                          <div>Orders: <strong>{tailor.orders}</strong></div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                          <button 
                            className="btn btn-secondary" 
                            style={{ flexGrow: 1, padding: '6px 12px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}
                            onClick={() => handleViewOnMap(tailor)}
                          >
                            View on Map
                          </button>
                          <button 
                            className="btn btn-primary" 
                            style={{ flexGrow: 1, padding: '6px 12px', fontSize: '0.75rem' }}
                            onClick={() => handleBookTailor(tailor.name)}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>
          </section>

          {/* Fold 7: Why Choose StitchBee */}
          <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
            <div className="landing-container">
              <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>The StitchBee Promise</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Designed to ensure convenience, safety, and visual perfection</p>
            </div>

            <div className="trust-grid-v2">
              {[
                { title: "Verified Boutique Experts", desc: "All local tailors pass rigorous ID verification and sewing assessments.", icon: <Sparkles size={24} style={{ color: 'var(--primary)' }} /> },
                { title: "100% Fit Guarantee", desc: "Enjoy completely free alterations within 7 days of receiving your outfit.", icon: <Scissors size={24} style={{ color: 'var(--accent)' }} /> },
                { title: "On-Time Delivery Protection", desc: "Track shipping in 12 real-time stages with cash-back guarantee if delayed.", icon: <Truck size={24} style={{ color: '#10b981' }} /> },
                { title: "Sealed & Sanitized Packaging", desc: "Each outfit is steam-pressed, sanitized, and delivered in a premium sealed package.", icon: <Award size={24} style={{ color: '#8b5cf6' }} /> },
                { title: "No-Markup Fair Pricing", desc: "Get quotes directly from tailors and choose the bid matching your budget.", icon: <Star size={24} style={{ color: '#fbbf24' }} /> },
                { title: "Escrow Protected Payments", desc: "Stitching fees are held securely, and released to tailors only after trial satisfaction.", icon: <User size={24} style={{ color: '#ec4899' }} /> }
              ].map((trust, idx) => (
                <div key={idx} className={`trust-item-v2 reveal-zoom stagger-${(idx % 3) + 1}`}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    {trust.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#ffffff' }}>{trust.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>{trust.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </section>

          {/* Fold 8: Pricing Section */}
          <section id="pricing-section" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
            <div className="landing-container">
              <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>Transparent Tailoring Pricing</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Standard stitching rates. Choose the tier matching your styling goals.</p>
            </div>

            <div className="pricing-grid-v2">
              {[
                { name: "Basic Stitching", price: "399", features: ["Essential shirts, simple kurtis", "Standard fit alignments", "5-day standard delivery", "1 free alteration trial"], action: "Book Basic" },
                { name: "Premium Stitching", price: "899", features: ["Double-breasted suits, designer gowns", "Expert necklines & sleeve adjustments", "3-day express delivery", "2 free alteration trials"], action: "Book Premium" },
                { name: "Bridal / Heavy Designer", price: "2499", features: ["Intricate wedding lehengas, heavy zari", "Pre-stitch designer consultation", "Priority boutique stitching slot", "Unlimited alteration revisions"], action: "Book Designer" },
                { name: "Alteration Specialist", price: "149", features: ["Resizing, hemming, repairs", "Zipper / button replacements", "24-hour express completion", "Perfect fit guarantee"], action: "Book Alteration" }
              ].map((tier, idx) => (
                <div key={idx} className={`pricing-card-v2 reveal-zoom stagger-${idx + 1}`}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{tier.name}</h3>
                  <div className="pricing-price-box">
                    <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>From</span> ₹{tier.price}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'left', flexGrow: 1 }}>
                    {tier.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '10px' }}
                    onClick={() => {
                      if (!currentUser) {
                        openAuthModal('customer', 'login');
                      } else {
                        setCustomerCategory('all');
                        setCustomerHub('tailors');
                        setRole('customer');
                      }
                    }}
                  >
                    {tier.action}
                  </button>
                </div>
              ))}
            </div>
            </div>
          </section>

          {/* Fold 9: Customer Reviews */}
          <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
            <div className="landing-container">
              <h2 className="reveal" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2.5rem' }}>Loved by 10,000+ Fashion Enthusiasts</h2>
            <div className="testimonial-grid">
              <div className="testimonial-card reveal-zoom stagger-1">
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '8px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" style={{ color: '#fbbf24' }} />)}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "StitchBee is a game-changer! I ordered a custom lehenga for my sister's wedding. The student came to my home for measurements, and the fit was absolutely flawless! Highly recommend."
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: 'var(--grad-primary)' }}>P</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>Priya Sharma</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Customer</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card reveal-zoom stagger-2">
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '8px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" style={{ color: '#fbbf24' }} />)}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "I was skeptical about manual measurements, but their AI measurement option is surprisingly accurate. The blazer fits like a glove, and the master tailor was very professional."
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: 'var(--grad-accent)' }}>R</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>Rahul Verma</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Customer</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card reveal-zoom stagger-3">
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '8px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" style={{ color: '#fbbf24' }} />)}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "Being able to buy premium fabrics directly on the platform and have it sent directly to a local boutique is so convenient. This is the future of custom tailoring."
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: 'var(--success)' }}>A</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>Ananya Iyer</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Customer</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>

          {/* Fold 10: Interactive FAQ Accordion Section */}
          <section className="faq-section" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
            <div className="landing-container">
              <h2 className="reveal" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2.5rem' }}>Frequently Asked Questions</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {[
                {
                  question: "How does the home measurement visit work?",
                  answer: "Once you place an order, you can choose a home visit. A trained student gig partner (separated by gender: male partners for men, female partners for women) will visit your home, take professional measurements, and upload them to the app."
                },
                {
                  question: "Can I bring my own fabric?",
                  answer: "Yes! You can either buy premium fabrics directly from the StitchBee marketplace, or choose to provide your own fabric. If you bring your own, our delivery partner will pick it up from your address."
                },
                {
                  question: "What happens if the garment does not fit perfectly?",
                  answer: "Every order includes a free trial and alteration period. If there are any fit issues, you can request an alteration within 7 days, and your assigned tailor will adjust it to your liking at no extra cost."
                },
                {
                  question: "Are the tailors registered under your app verified?",
                  answer: "Absolutely. All tailors registered on StitchBee undergo strict background checks, including Aadhaar/PAN verification, and a physical assessment of their workspace and stitching quality before they are approved to take orders."
                }
              ].map((faq, idx) => (
                <div key={idx} className={`reveal stagger-${(idx % 4) + 1}`}>
                  <div className={`faq-item ${expandedFaqIdx === idx ? 'expanded' : ''}`}>
                    <button 
                      className="faq-question" 
                      onClick={() => setExpandedFaqIdx(expandedFaqIdx === idx ? null : idx)}
                    >
                      <span>{faq.question}</span>
                      <span style={{ fontSize: '0.8rem', transition: 'transform 0.3s ease', transform: expandedFaqIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        ▼
                      </span>
                    </button>
                    <div className="faq-answer">
                      <p style={{ margin: 0 }}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </section>



          {/* Fold 12: Mobile App Download Banner */}
          <div className="landing-container reveal">
            <section id="download-app-banner" className="app-download-banner" style={{ margin: '40px 0' }}>
            <div className="app-download-text">
              <span className="badge badge-secondary" style={{ width: 'fit-content', marginBottom: '8px' }}>STITCHBEE MOBILE</span>
              <h2 style={{ fontSize: '2rem', lineHeight: '1.2' }}>StitchBee is always in your pocket.</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px' }}>
                Consult designers, track your stitching process in real-time, get fit notifications, and execute instant touchless AI body scans.
              </p>
            </div>
            <div className="app-badge-group">
              <div className="app-badge-btn" onClick={() => alert('App Store download link')}>
                <svg width="20" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fff' }}>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.11.09 2.24-.58 2.94-1.39" />
                </svg>
                <div className="app-badge-text">
                  <span className="app-badge-sub">Download on the</span>
                  <span className="app-badge-main">App Store</span>
                </div>
              </div>
              
              <div className="app-badge-btn" onClick={() => alert('Google Play download link')}>
                <svg width="20" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fff' }}>
                  <path d="M5 3.00003C4.9 3.00003 4.79998 3.02003 4.69998 3.07003L14.85 13.22L18.42 9.65003L5.86 2.53003C5.56 2.36003 5.23 2.53003 5 3.00003ZM3.24 4.29003C3.08 4.60003 3 4.96003 3 5.37003V18.63C3 19.04 3.08 19.4 3.24 19.71L13.43 11.8L3.24 4.29003ZM14.85 14.78L4.69998 20.93C4.79998 20.98 4.9 21 5 21C5.23 21 5.56 21.17 5.86 21.0003L18.42 13.88L14.85 14.78ZM16.27 11.8L20.53 9.42003C21.15 9.07003 21.15 8.49003 20.53 8.14003L16.27 11.8Z" />
                </svg>
                <div className="app-badge-text">
                  <span className="app-badge-sub">GET IT ON</span>
                  <span className="app-badge-main">Google Play</span>
                </div>
              </div>
            </div>
            </section>
          </div>


        </div>
      )}

      {role === 'about' && (
        <AboutView setRole={setRole} />
      )}

      {role === 'blogs' && (
        <BlogsView setRole={setRole} />
      )}


      {role === 'customer' && (
        <CustomerView 
          tailors={tailors}
          orders={orders}
          addOrder={addOrder}
          updateOrderStatus={updateOrderStatus}
          ledger={ledger}
          setLedger={handleLedgerStateChange}
          banners={banners}
          articles={articles}
          currentUser={currentUser}
          initialCategory={customerCategory}
          initialHub={customerHub}
          onLoginRequired={() => openAuthModal('customer', 'login')}
          onLogout={handleLogout}
          setRole={setRole}
          setCustomerHub={setCustomerHub}
          setCustomerCategory={setCustomerCategory}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      {/* Global Premium Footer on landing/about/blogs roles */}
      {(role === 'landing' || role === 'about' || role === 'blogs' || role === 'become-tailor' || role === 'become-delivery' || role === 'become-student' || role === 'customer') && (
        <footer id="contact-footer" className="premium-footer">
          <div className="landing-container">
            <div className="footer-content">
              <div className="footer-brand">
                <span className="footer-brand-title">StitchBee</span>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                The custom tailoring platform your entire wardrobe has been waiting for.
              </p>
              <div className="footer-brand-contact">
                Follow along or reach out to us directly at <a href="mailto:info@stitchbee.com">info@stitchbee.com</a>
              </div>
            </div>
            
            <div className="footer-column">
              <span className="footer-column-title">Company</span>
              <ul className="footer-links">
                <li><span className="footer-link" onClick={() => setRole('about')}>About</span></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <span className="footer-column-title">Resources</span>
              <ul className="footer-links">
                <li><span className="footer-link" onClick={() => setRole('blogs')}>Blogs</span></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <span className="footer-column-title">Socials</span>
              <ul className="footer-links">
                <li><a className="footer-link" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a className="footer-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <span className="footer-column-title">Compliance</span>
              <ul className="footer-links">
                <li><span className="footer-link" onClick={() => alert('Terms of Service')}>Terms of Service</span></li>
                <li><span className="footer-link" onClick={() => alert('Privacy Policy')}>Privacy Policy</span></li>
                <li><span className="footer-link" onClick={() => alert('Trust Center')}>Trust Center</span></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <span>&copy; 2026 StitchBee Technologies Private Limited. Empowering tailors and students locally.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Made with <Heart size={10} style={{ color: 'var(--primary)' }} /> for startup innovation.
            </span>
          </div>
          </div>
        </footer>
      )}

      {/* Full screen Auth Page */}
      {(role === 'login' || role === 'signup') && (
        <AuthPage 
          tab={role}
          setTab={(newTab) => setRole(newTab)}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setRole('landing')}
          theme={theme}
          setTheme={setTheme}
          initialRole={authModalConfig.role}
        />
      )}

      {/* Auth Modal overlay (fallback) */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialRole={authModalConfig.role}
        initialTab={authModalConfig.tab}
      />

      {/* Luxury Intro Splash Screen */}
      {showSplash && (
        <div className={`splash-overlay ${splashFade ? 'splash-fade-out' : ''}`}>
          <div className="splash-content">
            <span className="splash-subtitle">ATELIER D'ARTISANS</span>
            <h1 className="splash-title">STITCHBEE</h1>
            <div className="splash-line"></div>
          </div>
        </div>
      )}

    </div>
  );
}
