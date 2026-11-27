import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Scissors, User, Award, ShieldAlert, Heart, Star, Sparkles, MapPin, Truck, ChevronRight, Sun, Moon, RefreshCw, Users, ShieldCheck, Headphones, ChevronLeft, Facebook, Instagram, Linkedin, Twitter, Play, Apple, Menu, X, Home, Layers, Shirt, Clock, ChevronDown, BookOpen, Phone, LogOut } from 'lucide-react';
import { seedDatabase, loadFromStorage, saveToStorage } from './utils/mockDb';
import CustomerView from './components/CustomerView';
import AuthModal from './components/AuthModal';
import AuthPage from './components/AuthPage';
import AboutView from './components/AboutView';
import BlogsView from './components/BlogsView';
import DressCustomizer360 from './components/DressCustomizer360';
import FabricMarketplace from './components/FabricMarketplace';
import VerifiedTailorsShowcase from './components/VerifiedTailorsShowcase';
import TailorsNearYouPage from './components/TailorsNearYouPage';
import ProfessionalProfilePage from './components/ProfessionalProfilePage';
import HowStitchBeezWorks from './components/HowStitchBeezWorks';
import CraftsmanshipGallery from './components/CraftsmanshipGallery';
import CustomerReviewsCarousel from './components/CustomerReviewsCarousel';
import TrendingCreationsCarousel from './components/TrendingCreationsCarousel';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialRouteState = () => {
    if (typeof window === 'undefined') return { role: 'landing', category: 'all', hub: 'home', professionalId: null };
    const path = window.location.pathname;
    if (path === '/gallery') {
      return { role: 'craft-gallery', category: 'all', hub: 'home', professionalId: null };
    }
    if (path === '/designers' || path === '/designer-studio' || path === '/custom-design') {
      return { role: 'customer', category: 'all', hub: 'designers', professionalId: null };
    }
    if (path === '/tailors-near-you' || path === '/tailors') {
      return { role: 'tailors-near-you', category: 'all', hub: 'tailors', professionalId: null };
    }
    if (path.startsWith('/professionals/')) {
      const id = decodeURIComponent(path.replace('/professionals/', '').split('/')[0] || '');
      return { role: 'professional-profile', category: 'all', hub: 'home', professionalId: id || null };
    }
    if (path === '/fabrics' || path === '/cotton-fabrics' || path.startsWith('/fabrics') || path.startsWith('/cotton-fabrics') || path.startsWith('/shop-and-stitch') || path.startsWith('/shop-stitch')) {
      return { role: 'customer', category: 'all', hub: 'fabrics' };
    }
    if (path === '/login') {
      return { role: 'login', category: 'all', hub: 'home' };
    }
    if (path === '/signup') {
      return { role: 'signup', category: 'all', hub: 'home' };
    }
    if (
      path.startsWith('/uniforms') ||
      path.startsWith('/uniform') ||
      path.startsWith('/uniform-shop') ||
      path.startsWith('/shop-uniforms')
    ) {
      return { role: 'customer', category: 'uniforms', hub: 'category-landing' };
    }
    if (
      path.startsWith('/bags') || 
      path === '/cart' || 
      path === '/wishlist' || 
      path === '/orders'
    ) {
      return { role: 'customer', category: 'bags', hub: 'category-landing' };
    }
    if (
      path.startsWith('/shoes') ||
      path === '/cart' ||
      path === '/wishlist' ||
      path === '/orders' ||
      path.startsWith('/shoes-slippers') ||
      path.startsWith('/footwear') ||
      path.startsWith('/repair/footwear')
    ) {
      return { role: 'customer', category: 'shoes', hub: 'category-landing' };
    }
    if (
      path.startsWith('/gifts') ||
      path.startsWith('/handmade-gifts') ||
      path.startsWith('/handmade')
    ) {
      return { role: 'customer', category: 'gifts', hub: 'category-landing' };
    }
    if (
      path.startsWith('/pets') ||
      path.startsWith('/pet-outfits') ||
      path.startsWith('/pet')
    ) {
      return { role: 'customer', category: 'pets', hub: 'category-landing' };
    }
    if (path.startsWith('/sofas') || path.startsWith('/sofa')) {
      return { role: 'customer', category: 'sofas', hub: 'category-landing' };
    }
    if (path.startsWith('/vehicle-seats') || path.startsWith('/seats') || path.startsWith('/vehicle')) {
      return { role: 'customer', category: 'seats', hub: 'category-landing' };
    }
    if (path.startsWith('/kids') || path.startsWith('/kids-stitching')) {
      return { role: 'customer', category: 'kids', hub: 'category-landing' };
    }
    if (path.startsWith('/bridal') || path.startsWith('/bridal-stitching') || path.startsWith('/wedding')) {
      return { role: 'customer', category: 'bridal', hub: 'category-landing' };
    }
    if (path.startsWith('/mens') || path.startsWith('/men-stitching')) {
      return { role: 'customer', category: 'mens', hub: 'category-landing' };
    }
    if (path.startsWith('/womens') || path.startsWith('/women-stitching') || path.startsWith('/women')) {
      return { role: 'customer', category: 'womens', hub: 'category-landing' };
    }
    if (path.startsWith('/alterations') || path.startsWith('/alteration') || path.startsWith('/clothing-alterations') || path.startsWith('/clothing-alteration')) {
      return { role: 'customer', category: 'alterations', hub: 'category-landing' };
    }
    return { role: 'landing', category: 'all', hub: 'home' };
  };

  const initialRoute = getInitialRouteState();
  const [role, setRole] = useState(initialRoute.role);
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState({ role: 'customer', tab: 'login' });
  const [customerCategory, setCustomerCategory] = useState(initialRoute.category);
  const [customerHub, setCustomerHub] = useState(initialRoute.hub);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(initialRoute.professionalId || null);
  const [sharedUserLocation, setSharedUserLocation] = useState(null);
  const [mapInitialFilters, setMapInitialFilters] = useState({
    category: 'all',
    neighborhood: 'All Localities',
  });
  const [activeDropdown, setActiveDropdown] = useState(null); // null | 'services' | 'earn'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Sync role and category when URL matches bags, shoes, or customer routes
  useEffect(() => {
    const path = location.pathname;
    if (
      path.startsWith('/bags') || 
      path === '/cart' || 
      path === '/wishlist' || 
      path === '/orders'
    ) {
      setRole('customer');
      setCustomerCategory('bags');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/shoes') ||
      path.startsWith('/shoes-slippers') ||
      path.startsWith('/footwear') ||
      path.startsWith('/repair/footwear')
    ) {
      setRole('customer');
      setCustomerCategory('shoes');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/gifts') ||
      path.startsWith('/handmade-gifts') ||
      path.startsWith('/handmade')
    ) {
      setRole('customer');
      setCustomerCategory('gifts');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/pets') ||
      path.startsWith('/pet-outfits') ||
      path.startsWith('/pet')
    ) {
      setRole('customer');
      setCustomerCategory('pets');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/sofas') ||
      path.startsWith('/sofa')
    ) {
      setRole('customer');
      setCustomerCategory('sofas');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/vehicle-seats') ||
      path.startsWith('/seats') ||
      path.startsWith('/vehicle')
    ) {
      setRole('customer');
      setCustomerCategory('seats');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/kids') ||
      path.startsWith('/kids-stitching')
    ) {
      setRole('customer');
      setCustomerCategory('kids');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/bridal') ||
      path.startsWith('/bridal-stitching') ||
      path.startsWith('/wedding')
    ) {
      setRole('customer');
      setCustomerCategory('bridal');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/mens') ||
      path.startsWith('/men-stitching')
    ) {
      setRole('customer');
      setCustomerCategory('mens');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/womens') ||
      path.startsWith('/women-stitching') ||
      path.startsWith('/women')
    ) {
      setRole('customer');
      setCustomerCategory('womens');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/alterations') ||
      path.startsWith('/alteration') ||
      path.startsWith('/clothing-alterations') ||
      path.startsWith('/clothing-alteration')
    ) {
      setRole('customer');
      setCustomerCategory('alterations');
      setCustomerHub('category-landing');
    } else if (
      path.startsWith('/uniforms') ||
      path.startsWith('/uniform') ||
      path.startsWith('/uniform-shop') ||
      path.startsWith('/shop-uniforms')
    ) {
      setRole('customer');
      setCustomerCategory('uniforms');
      setCustomerHub('category-landing');
    } else if (
      path === '/fabrics' ||
      path === '/cotton-fabrics' ||
      path.startsWith('/fabrics') ||
      path.startsWith('/cotton-fabrics')
    ) {
      setRole('customer');
      setCustomerCategory('all');
      setCustomerHub('fabrics');
    } else if (path === '/gallery') {
      setRole('craft-gallery');
    } else if (path === '/designers' || path === '/designer-studio' || path === '/custom-design') {
      setRole('customer');
      setCustomerCategory('all');
      setCustomerHub('designers');
    } else if (path === '/tailors-near-you' || path === '/tailors') {
      setRole('tailors-near-you');
    } else if (path.startsWith('/professionals/')) {
      const id = decodeURIComponent(path.replace('/professionals/', '').split('/')[0] || '');
      setSelectedProfessionalId(id || null);
      setRole('professional-profile');
    } else if (path === '/') {
      setRole((prev) =>
        prev === 'tailors-near-you' || prev === 'professional-profile' || prev === 'craft-gallery' ? 'landing' : prev
      );
    } else if (path === '/login') {
      setRole('login');
    } else if (path === '/signup') {
      setRole('signup');
    }
  }, [location.pathname]);

  // Guest landing banner carousel states
  const [currentLandingSlide, setCurrentLandingSlide] = useState(0);
  const [pauseLandingCarousel, setPauseLandingCarousel] = useState(false);
  const guestLandingBanners = [
    {
      src: '/banners/Bridal Elegance Couture Moment.png',
      title: 'Bridal Elegance Couture Moment',
      route: '/bridal'
    },
    {
      src: '/banners/Tailored to Perfection Atelier.png',
      title: 'Tailored to Perfection Atelier',
      route: '/mens'
    },
    {
      src: '/banners/Tailored Style Together.png',
      title: 'Tailored Style Together',
      route: '/womens'
    },
    {
      src: '/banners/Little Styles, Big Moments.png',
      title: 'Little Styles, Big Moments',
      route: '/kids'
    },
    {
      src: '/banners/Uniforms for Every Role.png',
      title: 'Uniforms for Every Role',
      route: '/uniforms'
    },
    {
      src: '/banners/Crafted in Leather, Styled for Life.png',
      title: 'Crafted in Leather, Styled for Life',
      route: '/bags'
    },
    {
      src: '/banners/Every Step, Styled by Hand.png',
      title: 'Every Step, Styled by Hand',
      route: '/shoes'
    },
    {
      src: '/banners/Handmade with Love Gift Studio.png',
      title: 'Handmade with Love Gift Studio',
      route: '/gifts'
    },
    {
      src: '/banners/Leather Bag Repair & Restoration.png',
      title: 'Leather Bag Repair & Restoration',
      route: '/bags'
    },
    {
      src: '/banners/Repair & Restore Workshop.png',
      title: 'Repair & Restore Workshop',
      route: '/alterations'
    },
    {
      src: '/banners/Sofa Styles for Every Space.png',
      title: 'Sofa Styles for Every Space',
      route: '/sofas'
    },
    {
      src: '/banners/Sofa Repair and Restoration Workshop.png',
      title: 'Sofa Repair and Restoration Workshop',
      route: '/sofas'
    },
    {
      src: '/banners/Custom Seat Covers for Every Journey.png',
      title: 'Custom Seat Covers for Every Journey',
      route: '/vehicle-seats'
    },
    {
      src: '/banners/Repair & Restoration_ Vehicle Seat Revival.png',
      title: 'Repair & Restoration Vehicle Seat Revival',
      route: '/vehicle-seats'
    },
    {
      src: '/banners/Stylish Outfits for Furry Friends.png',
      title: 'Stylish Outfits for Furry Friends',
      route: '/pets'
    }
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
    
    window.L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps'
    }).addTo(map);

    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 200);
    
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

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('theme')) return p.get('theme');
    }
    return localStorage.getItem('stitchbee_theme') || 'light';
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedFaqIdx, setExpandedFaqIdx] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);

  const handleTrendingCategoryNavigate = (item) => {
    setCustomerCategory(item.categoryKey);
    setCustomerHub('category-landing');
    setRole('customer');
    navigate(item.route);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleViewProfessionalProfile = (pro) => {
    if (!pro || !pro.id) return;
    setSelectedProfessionalId(pro.id);
    setRole('professional-profile');
    navigate(`/professionals/${encodeURIComponent(pro.id)}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleExploreProfessionalsMap = (category = 'all', neighborhood = 'All Localities') => {
    setMapInitialFilters({
      category: category || 'all',
      neighborhood: neighborhood || 'All Localities',
    });
    setRole('tailors-near-you');
    navigate('/tailors-near-you');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToLandingProfessionals = () => {
    setRole('landing');
    navigate('/');
  };

  const handleOpenCraftGallery = () => {
    setRole('craft-gallery');
    navigate('/gallery');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleExploreCraftService = (item) => {
    if (!item) return;
    setRole('customer');
    setCustomerCategory(item.categoryKey || 'all');
    setCustomerHub(item.hub || 'category-landing');
    if (item.route) {
      navigate(item.route);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBookProfessional = (pro, selectedService = null) => {
    if (!currentUser) {
      openAuthModal('customer', 'login');
      return;
    }
    if (pro && pro.category) {
      setCustomerCategory(pro.category);
    } else if (selectedService && selectedService.name) {
      setCustomerCategory('all');
    }
    setCustomerHub('tailors');
    setRole('customer');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

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
    const path = window.location.pathname;
    const isPublicCategoryRoute = 
      path === '/login' ||
      path === '/signup' ||
      path === '/cart' ||
      path === '/wishlist' ||
      path === '/orders' ||
      path.startsWith('/uniforms') ||
      path.startsWith('/uniform') ||
      path.startsWith('/bags') ||
      path.startsWith('/shoes') ||
      path.startsWith('/gifts') ||
      path.startsWith('/pets') ||
      path.startsWith('/sofas') ||
      path.startsWith('/vehicle-seats') ||
      path.startsWith('/kids') ||
      path.startsWith('/bridal') ||
      path.startsWith('/mens') ||
      path.startsWith('/womens') ||
      path.startsWith('/alterations') ||
      path.startsWith('/fabrics') ||
      path === '/cotton-fabrics' ||
      path.startsWith('/cotton-fabrics') || path.startsWith('/shop-and-stitch') || path.startsWith('/shop-stitch') ||
      path === '/tailors-near-you' ||
      path === '/tailors' ||
      path === '/gallery' ||
      path === '/designers' ||
      path === '/designer-studio' ||
      path === '/custom-design' ||
      path.startsWith('/professionals/');

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && (parsed.role === 'customer' || !parsed.role)) {
          const custUser = { ...parsed, role: 'customer' };
          setCurrentUser(custUser);
          if (!isPublicCategoryRoute) {
            setRole('customer');
            if (location.pathname === '/' || !location.pathname) {
              setCustomerHub('home');
              setCustomerCategory('all');
            }
          }
        } else {
          setCurrentUser(null);
          if (!isPublicCategoryRoute) {
            setRole('landing');
          }
        }
      } catch (err) {
        if (!isPublicCategoryRoute) {
          setRole('landing');
        }
      }
    } else {
      if (!isPublicCategoryRoute) {
        setRole('landing');
      } else if (path === '/login') {
        setRole('login');
      } else if (path === '/signup') {
        setRole('signup');
      } else if (path === '/gallery') {
        setRole('craft-gallery');
      } else if (path === '/designers' || path === '/designer-studio' || path === '/custom-design') {
        setRole('customer');
        setCustomerCategory('all');
        setCustomerHub('designers');
      } else if (path === '/tailors-near-you' || path === '/tailors') {
        setRole('tailors-near-you');
      } else if (path.startsWith('/professionals/')) {
        const id = decodeURIComponent(path.replace('/professionals/', '').split('/')[0] || '');
        setSelectedProfessionalId(id || null);
        setRole('professional-profile');
      } else if (path.startsWith('/fabrics') || path === '/cotton-fabrics' || path.startsWith('/cotton-fabrics') || path.startsWith('/shop-and-stitch') || path.startsWith('/shop-stitch')) {
        setRole('customer');
        setCustomerCategory('all');
        setCustomerHub('fabrics');
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
    const activeBanner = guestLandingBanners[currentLandingSlide];
    const targetRoute = typeof activeBanner === 'object' && activeBanner?.route ? activeBanner.route : null;
    if (targetRoute) {
      navigate(targetRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!currentUser) {
      openAuthModal('customer', 'login');
    } else {
      setRole('customer');
      setCustomerHub('tailors');
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
    const custUser = { ...userData, role: 'customer' };
    setCurrentUser(custUser);
    localStorage.setItem('stitchbee_user', JSON.stringify(custUser));
    setRole('customer');
    setCustomerHub('home');
    setCustomerCategory('all');
    setAuthModalOpen(false);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('stitchbee_user');
    setCurrentUser(null);
    setRole('landing');
    setCustomerHub('home');
    navigate('/');
  };

  const openAuthModal = (targetRole, tab) => {
    setAuthModalConfig({ role: targetRole, tab });
    setRole(tab); // tab is 'login' or 'signup'
  };

  const navigateToSection = (sectionId) => {
    setRole('landing');
    if (location.pathname !== '/') {
      navigate('/');
    }
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
        <>
          <header className="top-nav">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* Mobile menu toggle hamburger icon */}
              <button 
                className="mobile-menu-toggle-btn"
                onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(!mobileMenuOpen); }}
                aria-label="Toggle menu"
                style={{ padding: '6px', cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--text-primary)' }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="logo" onClick={() => { setRole('landing'); if (location.pathname !== '/') navigate('/'); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <img src="/logo.png" alt="StitchBee" style={{ height: '100px', width: '300px', objectFit: 'contain', display: 'block', marginLeft: '-60px' }} />
              </div>
            </div>
            
            <div className="role-switcher desktop-nav-menu">
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
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'mens' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('mens'); setActiveDropdown(null); navigate('/mens'); }}>Men</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'womens' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('womens'); setActiveDropdown(null); navigate('/womens'); }}>Women</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'bridal' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('bridal'); setActiveDropdown(null); navigate('/bridal'); }}>Bridal</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'kids' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('kids'); setActiveDropdown(null); navigate('/kids-stitching'); }}>Kids</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'alterations' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('alterations'); setActiveDropdown(null); }}>Alterations</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'uniforms' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('uniforms'); setActiveDropdown(null); }}>Uniforms</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'bags' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('bags'); setActiveDropdown(null); navigate('/bags'); }}>Bags And Leathers</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'shoes' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('shoes'); setActiveDropdown(null); navigate('/shoes'); }}>Shoes And Slippers</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'seats' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('seats'); setActiveDropdown(null); }}>Vehicle Seat Covers</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'designers' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('designers'); setCustomerCategory('all'); setActiveDropdown(null); }}>Custom Design</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'gifts' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('gifts'); setActiveDropdown(null); }}>Hand Made Gifts</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'pets' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('pets'); setActiveDropdown(null); navigate('/pets'); }}>Pet Outfits</li>
                  <li className={`dropdown-item ${role === 'customer' && customerHub === 'category-landing' && customerCategory === 'sofas' ? 'active' : ''}`} onClick={() => { setRole('customer'); setCustomerHub('category-landing'); setCustomerCategory('sofas'); setActiveDropdown(null); navigate('/sofas'); }}>Sofas</li>
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

          {/* Slide-out Navigation Drawer (Mobile & Tablet - Tailor Style) */}
          {mobileMenuOpen && (
            <>
              <div 
                className="drawer-backdrop"
                onClick={() => setMobileMenuOpen(false)}
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
                {/* Top Close Header */}
                <div className="drawer-top-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--primary)' }}>
                      Navigation Menu
                    </span>
                  </div>
                  <button 
                    className="drawer-close-btn"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '10px', 
                      background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#FFFFFF', 
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E7EB',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: theme === 'dark' ? '#ffffff' : '#1B1B2F', 
                      cursor: 'pointer' 
                    }}
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* User / Brand Welcome Card */}
                <div className="drawer-welcome-card" style={{ background: 'linear-gradient(135deg, #1B0F2A 0%, #3B154C 50%, var(--primary) 100%)', margin: '0 0 16px 0', padding: '16px', borderRadius: '18px' }}>
                  <div className="drawer-welcome-inner" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div className="drawer-welcome-icon-box" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #B5179E 100%)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={24} color="#ffffff" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.72rem', opacity: 0.95, fontWeight: 500, color: '#ffffff' }}>
                        {currentUser ? 'Customer Account' : 'Welcome to StitchBee'}
                      </div>
                      <h3 style={{ fontSize: '1.12rem', fontWeight: 700, margin: '2px 0', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentUser ? `${currentUser.name} 👋` : 'Explore & Custom Stitch'}
                      </h3>
                      <p style={{ fontSize: '0.72rem', opacity: 0.85, margin: 0, color: '#ffffff' }}>
                        {currentUser ? (currentUser.phone || '+91 98765 43210') : 'Bespoke Tailoring & Designer Studio'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px', flex: 1, overflowY: 'auto' }}>
                  {[
                    { id: 'home', label: 'Home', subtitle: 'Atelier Discovery & Trends', icon: <Home size={20} />, action: () => { setRole('landing'); navigateToSection('hero-section'); } },
                    { id: 'categories', label: 'Categories', subtitle: 'Browse Garments & Crafts', icon: <Sparkles size={20} />, action: () => navigateToSection('categories-section') },
                    { id: 'fabrics', label: 'Fabric Marketplace', subtitle: 'Explore Pure Silks & Linens', icon: <Layers size={20} />, action: () => { setRole('customer'); setCustomerHub('fabrics'); } },
                    { id: 'tailors', label: 'Tailors Near You', subtitle: 'Locate Verified Local Boutiques', icon: <MapPin size={20} />, action: () => navigateToSection('tailors-near-you') },
                    { id: 'how-it-works', label: 'How It Works', subtitle: 'Doorstep Measurements & Delivery', icon: <Scissors size={20} />, action: () => navigateToSection('how-it-works') },
                    { id: 'track', label: 'Track Order', subtitle: 'Live Stitching & Dispatch Status', icon: <Truck size={20} />, action: () => handleTrackOrder() },
                    { id: 'blogs', label: 'Style Blogs', subtitle: 'Fashion Articles & Care Guides', icon: <BookOpen size={20} />, action: () => setRole('blogs') },
                    { id: 'contact', label: 'Contact Us', subtitle: '24/7 Atelier & Support Desk', icon: <Phone size={20} />, action: () => navigateToSection('contact-footer') }
                  ].map(tab => (
                    <div
                      key={tab.id}
                      className="drawer-nav-item"
                      onClick={() => {
                        tab.action();
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent',
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0, overflow: 'hidden' }}>
                        <div 
                          className="drawer-nav-icon-box" 
                          style={{ 
                            background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
                            color: theme === 'dark' ? '#E2E8F0' : '#475467',
                            flexShrink: 0
                          }}
                        >
                          {tab.icon}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flex: 1, minWidth: 0, overflow: 'hidden' }}>
                          <span style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: 700, 
                            color: theme === 'dark' ? '#FFFFFF' : '#1B1B2F',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {tab.label}
                          </span>
                          <span style={{ 
                            fontSize: '0.72rem', 
                            color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6B7280',
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
                          color: theme === 'dark' ? 'rgba(255,255,255,0.4)' : '#9CA3AF',
                          flexShrink: 0,
                          marginLeft: 'auto'
                        }} 
                      />
                    </div>
                  ))}

                  {/* Stitching Services Expandable Accordion */}
                  <div
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent',
                      borderRadius: '12px',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
                      overflow: 'hidden',
                      marginTop: '4px'
                    }}
                  >
                    <div 
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      style={{
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div 
                          className="drawer-nav-icon-box"
                          style={{
                            background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
                            color: 'var(--primary)',
                            flexShrink: 0
                          }}
                        >
                          <Scissors size={20} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: theme === 'dark' ? '#FFFFFF' : '#1B1B2F', display: 'block' }}>
                            Custom Stitching Services
                          </span>
                          <span style={{ fontSize: '0.72rem', color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6B7280' }}>
                            Men, Women, Bridal, Alterations...
                          </span>
                        </div>
                      </div>
                      <ChevronDown 
                        size={16} 
                        style={{ 
                          transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                          transition: 'transform 0.2s ease',
                          color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#6B7280'
                        }} 
                      />
                    </div>

                    {mobileServicesOpen && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '0 12px 12px 12px' }}>
                        {[
                          { id: 'mens', label: 'Men' },
                          { id: 'womens', label: 'Women' },
                          { id: 'bridal', label: 'Bridal' },
                          { id: 'kids', label: 'Kids' },
                          { id: 'alterations', label: 'Alterations' },
                          { id: 'uniforms', label: 'Uniforms' },
                          { id: 'bags', label: 'Bags & Leathers' },
                          { id: 'shoes', label: 'Shoes & Slippers' },
                          { id: 'seats', label: 'Vehicle Seat Covers' },
                          { id: 'designers', label: 'Custom Design' },
                          { id: 'gifts', label: 'Hand Made Gifts' },
                          { id: 'pets', label: 'Pet Outfits' },
                          { id: 'sofas', label: 'Sofas' },
                        ].map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              if (cat.id === 'designers') {
                                setRole('customer');
                                setCustomerHub('designers');
                                setCustomerCategory('all');
                              } else {
                                setRole('customer');
                                setCustomerHub('category-landing');
                                setCustomerCategory(cat.id);
                                if (cat.id === 'bridal') navigate('/bridal');
                                if (cat.id === 'mens') navigate('/mens');
                                if (cat.id === 'womens') navigate('/womens');
                              }
                              setMobileMenuOpen(false);
                            }}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '20px',
                              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E7EB',
                              background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#fff',
                              color: theme === 'dark' ? '#FFFFFF' : '#1B1B2F',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* VIP Customer Tier Card */}
                <div className="drawer-tier-card" style={{ background: 'linear-gradient(135deg, #7B3FF2 0%, #5B21B6 100%)', margin: '8px 0 12px 0', padding: '14px', borderRadius: '18px', color: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.25rem' }}>💎</span>
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>
                          StitchBee VIP Club
                        </div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.9, color: '#ffffff', marginTop: '1px' }}>
                          Doorstep Measurements & Free Delivery
                        </div>
                      </div>
                    </div>
                    <span style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, color: '#ffffff' }}>
                      VIP Tier
                    </span>
                  </div>
                </div>

                {/* Theme Toggle Button */}
                <div 
                  className="drawer-nav-item"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="drawer-nav-icon-box" style={{ background: theme === 'dark' ? 'rgba(251,191,36,0.15)' : '#FEF3C7', color: '#D97706', width: '36px', height: '36px', borderRadius: '10px' }}>
                      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: theme === 'dark' ? '#FFFFFF' : '#1B1B2F' }}>
                      {theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>
                    {theme === 'dark' ? 'Dark' : 'Light'}
                  </span>
                </div>

                {/* Auth Actions: Logout or Login/Signup */}
                {currentUser ? (
                  <button 
                    className="drawer-logout-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    style={{
                      background: theme === 'dark' ? 'rgba(239,68,68,0.15)' : '#FEF2F2',
                      color: '#EF4444',
                      border: '1.5px solid rgba(239,68,68,0.25)',
                      borderRadius: '12px',
                      padding: '12px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    <LogOut size={16} /> Logout ({currentUser.name})
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal('customer', 'login');
                      }}
                      style={{ flex: 1, padding: '10px', fontSize: '0.85rem', borderRadius: '10px', fontWeight: 600 }}
                    >
                      Login
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal('customer', 'signup');
                      }}
                      style={{ flex: 1, padding: '10px', fontSize: '0.85rem', borderRadius: '10px', fontWeight: 600 }}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* Main Content Area */}
      {role === 'landing' && (
        <div className="animate-fade-in">
          {/* Fold 1: Hero Carousel Banner & Stats Fold */}
          <section style={{ padding: '1.5rem 0 0.5rem 0', width: '100%', margin: '0 auto' }}>
            <div className="landing-container" style={{ padding: '0 10px' }}>
              
              {/* Full-width Carousel Banner Card */}
              <div 
                className="guest-landing-hero-banner"
                onMouseEnter={() => setPauseLandingCarousel(true)}
                onMouseLeave={() => setPauseLandingCarousel(false)}
                onClick={handleLandingBannerClick}
              >
                {/* Slides */}
                {guestLandingBanners.map((banner, idx) => {
                  const bannerSrc = typeof banner === 'string' ? banner : banner.src;
                  const bannerTitle = typeof banner === 'string' ? `banner-${idx+1}` : banner.title;
                  return (
                    <img 
                      key={idx}
                      className="guest-landing-hero-slide"
                      src={bannerSrc} 
                      alt={bannerTitle} 
                      style={{
                        opacity: currentLandingSlide === idx ? 1 : 0,
                        pointerEvents: currentLandingSlide === idx ? 'auto' : 'none'
                      }}
                    />
                  );
                })}

                {/* Navigation Arrows */}
                <button
                  type="button"
                  className="guest-landing-hero-arrow prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevLandingSlide();
                  }}
                  aria-label="Previous Banner"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="guest-landing-hero-arrow next"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextLandingSlide();
                  }}
                  aria-label="Next Banner"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Dot Indicators */}
                <div className="guest-landing-hero-dots">
                  {guestLandingBanners.map((_, idx) => (
                    <span 
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentLandingSlide(idx);
                      }}
                      style={{
                        width: currentLandingSlide === idx ? '16px' : '6px',
                        height: '6px',
                        borderRadius: '3px',
                        background: currentLandingSlide === idx ? '#FF008A' : 'rgba(255,255,255,0.6)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
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
          <section id="categories-section" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
            <div className="landing-container reveal">
              <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>Quick <span className="landing-title-pink">Service</span> Categories</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Select from our premium custom tailoring categories</p>
              </div>
            
              <div className="categories-grid-v2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {[
                  { 
                    name: "Men's Tailoring", 
                    img: "/mens_tailoring.jpg", 
                    desc: "Custom shirts, suits, trousers, kurtas & traditional wear.", 
                    cat: "mens",
                    icon: <span style={{ fontSize: '1.2rem', fontWeight: 'bold', lineHeight: 1 }}>♂</span>
                  },
                  { 
                    name: "Women's Tailoring", 
                    img: "/womens_tailoring_v2.jpg", 
                    desc: "Stitched kurtis, lehengas, suits, and daily-wear ethnic outfits.", 
                    cat: "womens",
                    icon: <span style={{ fontSize: '1.2rem', fontWeight: 'bold', lineHeight: 1 }}>♀</span>
                  },
                  { 
                    name: "Bridal Wear", 
                    img: "/bridal_wear.jpg", 
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
                    img: "/alterations_fit_v2.jpg", 
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
                    img: "/uniform_stitching.jpg", 
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
                    img: "/custom_design.jpg", 
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
                    img: "/kids_wear_v2.jpg", 
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
                    img: "/bags_leathers.jpg", 
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
                    img: "/vehicle_seats.jpg", 
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
                    img: "/Pets.png",
                    desc: "Custom stitched dresses & outfits for your furry friends.",
                    cat: "pets",
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
                    img: "/handmade_gifts.jpg",
                    desc: "Personalized stitching, fabric gifts & embroidered crafts.",
                    cat: "gifts",
                    imgPos: "center 55%",
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
                    img: "/Uniform.png",
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
                    img: "/assets/sofas/HERO.png",
                    desc: "Custom fitted sofa covers, handcrafted sofas & upholstery stitching.",
                    cat: "sofas",
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
                    if (category.cat === 'bags') {
                      navigate('/bags');
                    } else if (category.cat === 'shoes') {
                      navigate('/shoes');
                    } else if (category.cat === 'gifts') {
                      navigate('/gifts');
                    } else if (category.cat === 'pets') {
                      navigate('/pets');
                    } else if (category.cat === 'sofas') {
                      navigate('/sofas');
                    } else if (category.cat === 'bridal') {
                      navigate('/bridal');
                    } else if (category.cat === 'mens') {
                      navigate('/mens');
                    } else if (category.cat === 'womens') {
                      navigate('/womens');
                    }
                  }}
                  onMouseEnter={() => setHoveredCategoryIdx(idx)}
                  onMouseLeave={() => setHoveredCategoryIdx(null)}
                  style={{
                    background: theme === 'dark' ? '#1a1a2e' : '#ffffff',
                    boxShadow: hoveredCategoryIdx === idx
                      ? '0 20px 35px rgba(247,37,133,0.18), 0 4px 15px rgba(0,0,0,0.1)'
                      : '0 4px 20px rgba(0,0,0,0.03)',
                    border: `1px solid ${hoveredCategoryIdx === idx ? 'var(--primary)' : (theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#f1f5f9')}`,
                    transform: hoveredCategoryIdx === idx ? 'translateY(-10px) scale(1.03)' : 'translateY(0) scale(1)'
                  }}
                >
                  {/* Image wrapper */}
                  <div className="category-card-img-wrap">
                    <img 
                      className="category-card-img"
                      src={category.img} 
                      alt={category.name} 
                      style={{ 
                        transform: hoveredCategoryIdx === idx ? 'scale(1.12)' : 'scale(1)',
                        '--card-img-pos': category.imgPos || 'center center',
                        objectPosition: category.imgPos || 'center center'
                      }} 
                    />
                    {/* Overlapping Badge Icon */}
                    <div 
                      className="category-card-badge-icon"
                      style={{
                        background: theme === 'dark' ? '#24243e' : '#ffffff',
                        border: `1px solid ${hoveredCategoryIdx === idx ? 'var(--primary)' : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0')}`,
                        transform: hoveredCategoryIdx === idx ? 'scale(1.15) rotate(10deg)' : 'scale(1) rotate(0deg)'
                      }}
                    >
                      {category.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="category-card-content">
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
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: '1.45' }}>
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

          {/* Fold 3: How StitchBeez Works */}
          <HowStitchBeezWorks
            theme={theme}
            onExploreServices={() => {
              const target = document.getElementById('categories-section');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />

          {/* Fold 4: Trending Creations & Transformations */}
          <TrendingCreationsCarousel
            theme={theme}
            onNavigateCategory={handleTrendingCategoryNavigate}
          />

          {/* Fold 5: Fabric Marketplace */}
          <div className="reveal">
            <FabricMarketplace 
              openAuthModal={openAuthModal} 
              currentUser={currentUser} 
              setRole={setRole}
              onCategorySelect={handleCategorySelect}
              theme={theme}
            />
          </div>

          {/* Fold 6: Expert Craftsmen Discovery Section */}
          <div className="reveal">
            <VerifiedTailorsShowcase 
              tailors={tailors}
              userLocation={sharedUserLocation}
              onSetUserLocation={setSharedUserLocation}
              onViewProfile={handleViewProfessionalProfile}
              onExploreMap={handleExploreProfessionalsMap}
              theme={theme}
            />
          </div>

          {/* Fold 7: Craftsmanship Gallery */}
          <CraftsmanshipGallery
            mode="landing"
            theme={theme}
            onExploreGallery={handleOpenCraftGallery}
            onExploreService={handleExploreCraftService}
          />

          {/* Fold 9: Customer Reviews */}
          <CustomerReviewsCarousel theme={theme} />

          {/* Fold 10: Interactive FAQ Accordion Section */}
          <section className="faq-section" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
            <div className="landing-container">
              <h2 className="reveal" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2.5rem' }}>Frequently Asked <span className="landing-title-pink">Questions</span></h2>
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






        </div>
      )}

      {role === 'about' && (
        <AboutView setRole={setRole} />
      )}

      {role === 'blogs' && (
        <BlogsView setRole={setRole} />
      )}

      {role === 'tailors-near-you' && (
        <TailorsNearYouPage
          tailors={tailors}
          initialCategory={mapInitialFilters.category}
          initialNeighborhood={mapInitialFilters.neighborhood}
          userLocation={sharedUserLocation}
          onSetUserLocation={setSharedUserLocation}
          onBack={handleBackToLandingProfessionals}
          onViewProfile={handleViewProfessionalProfile}
          onBookProfessional={handleBookProfessional}
          theme={theme}
        />
      )}

      {role === 'craft-gallery' && (
        <CraftsmanshipGallery
          mode="full"
          theme={theme}
          onBack={handleBackToLandingProfessionals}
          onExploreService={handleExploreCraftService}
        />
      )}

      {role === 'professional-profile' && (
        <ProfessionalProfilePage
          professionalId={selectedProfessionalId}
          tailors={tailors}
          userLocation={sharedUserLocation}
          theme={theme}
          onBack={handleBackToLandingProfessionals}
          onExploreMap={() => handleExploreProfessionalsMap('all', 'All Localities')}
          onBookProfessional={handleBookProfessional}
        />
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

      {/* Global Premium Footer on landing/about/blogs/discovery roles */}
      {(role === 'landing' || role === 'about' || role === 'blogs' || role === 'tailors-near-you' || role === 'professional-profile' || role === 'craft-gallery' || role === 'become-tailor' || role === 'become-delivery' || role === 'become-student' || role === 'customer') && (
        <footer id="contact-footer" className="delivery-premium-footer">
          <div className="footer-container-v4">
            <div className="footer-top-v4">
              
              {/* Column 1 – Brand */}
              <div className="footer-col-v4 brand-col-v4">
                <div className="footer-header-slot">
                  <img src="/logo.png" alt="StitchBee" className="footer-logo-v4" />
                </div>
                <p className="footer-tagline-v4">Crafting elegance & custom stitching, tailored to perfection.</p>
                <div className="footer-social-icons-v4">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <Facebook size={18} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                </div>
              </div>

              {/* Column 2 – Company */}
              <div className="footer-col-v4">
                <div className="footer-header-slot">
                  <h5 className="footer-heading-v4">Company</h5>
                </div>
                <ul className="footer-links-v4">
                  <li><span className="footer-link-v4" onClick={() => setRole('about')}>About Us</span></li>
                  <li><span className="footer-link-v4" onClick={() => setRole('landing')}>How It Works</span></li>
                  <li><span className="footer-link-v4" onClick={() => setRole('blogs')}>Blogs & Stories</span></li>
                  <li><span className="footer-link-v4" onClick={() => setRole('about')}>Contact Us</span></li>
                </ul>
              </div>

              {/* Column 3 – Customer Services */}
              <div className="footer-col-v4">
                <div className="footer-header-slot">
                  <h5 className="footer-heading-v4">Customer Services</h5>
                </div>
                <ul className="footer-links-v4">
                  <li><span className="footer-link-v4" onClick={() => setRole('signup')}>Custom Tailoring</span></li>
                  <li><span className="footer-link-v4" onClick={() => setRole('signup')}>Doorstep Measurement</span></li>
                  <li><span className="footer-link-v4" onClick={() => setRole('signup')}>Book a Designer</span></li>
                  <li><span className="footer-link-v4" onClick={() => setRole('signup')}>Track Order</span></li>
                </ul>
              </div>

              {/* Column 4 – Download App */}
              <div className="footer-col-v4 download-col-v4">
                <div className="footer-header-slot">
                  <h5 className="footer-heading-v4">Download App</h5>
                </div>
                <div className="footer-downloads-v4">
                  <div className="download-btn-v4" onClick={() => setRole('signup')}>
                    <Play size={18} style={{ color: '#10b981' }} />
                    <div className="download-btn-text-v4">
                      <span className="download-pre-v4">GET IT ON</span>
                      <span className="download-main-v4">Android App</span>
                    </div>
                  </div>
                  <div className="download-btn-v4 disabled-app-btn">
                    <Apple size={18} style={{ color: '#64748b' }} />
                    <div className="download-btn-text-v4">
                      <span className="download-pre-v4">iOS App</span>
                      <span className="download-main-v4 coming-soon-text">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 5 – QR Code */}
              <div className="footer-col-v4 qr-col-v4">
                <div className="footer-header-slot">
                  <h5 className="footer-heading-v4">Scan to Download App</h5>
                </div>
                <div className="footer-qr-card-v4">
                  <img 
                    src="/qr_code_user.png" 
                    alt="Scan to Download App" 
                    className="footer-qr-img-v4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://stitchbee.com/download&color=172033&bgcolor=ffffff";
                    }}
                  />
                </div>
                <span className="footer-qr-caption-v4">Scan with your phone</span>
              </div>

            </div>

            <div className="footer-bottom-v4">
              <span className="footer-copyright-v4">&copy; 2026 StitchBee Technologies Private Limited. All rights reserved.</span>
              <div className="footer-bottom-links-v4">
                <span onClick={() => alert('Privacy Policy')}>Privacy Policy</span>
                <span onClick={() => alert('Terms & Conditions')}>Terms & Conditions</span>
                <span onClick={() => alert('Cookie Policy')}>Cookie Policy</span>
              </div>
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
        <div className={`splash-overlay ${splashFade ? 'splash-fade-out' : ''}`} />
      )}

    </div>
  );
}
