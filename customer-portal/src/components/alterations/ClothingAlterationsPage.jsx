import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, Clock, ShieldCheck, Truck, ChevronRight, ChevronLeft, 
  Star, MapPin, Heart, ArrowRight, X, Check, Upload, Calendar, 
  Search, SlidersHorizontal, RefreshCw, AlertCircle, Sparkles, 
  Phone, User, CheckCircle2, Eye, Shield, Tag, Info, Navigation,
  Plus, Minus, CheckCircle, ArrowLeft
} from 'lucide-react';
import L from 'leaflet';
import './ClothingAlterationsPage.css';

// 10 Clothing Categories matching exact reference screenshot
const CLOTHING_CATEGORIES = [
  { id: 'sarees', name: 'Sarees', img: '/alteration_assets/Sarees.png', compatibleServices: ['length', 'lining'] },
  { id: 'blouses', name: 'Blouses', img: '/alteration_assets/Blouses.png', compatibleServices: ['reduction', 'increase', 'sleeves', 'neckline', 'zipper', 'lining'] },
  { id: 'salwar-suits', name: 'Salwar Suits', img: '/alteration_assets/Salwar Suits.png', compatibleServices: ['length', 'reduction', 'increase', 'sleeves', 'waist', 'neckline', 'lining'] },
  { id: 'kurtis', name: 'Kurtis & Kurta Sets', img: '/alteration_assets/Kurtis & Kurta Set.png', compatibleServices: ['length', 'reduction', 'increase', 'sleeves', 'neckline', 'lining'] },
  { id: 'lehengas', name: 'Lehengas & Gowns', img: '/alteration_assets/Lehenga & Gowns.png', compatibleServices: ['length', 'waist', 'reduction', 'zipper', 'lining'] },
  { id: 'shirts', name: 'Shirts', img: '/alteration_assets/Shirts.png', compatibleServices: ['reduction', 'increase', 'sleeves', 'length'] },
  { id: 'trousers', name: 'Trousers', img: '/alteration_assets/Navy Shirt and Tailored Beige Trousers.png', compatibleServices: ['length', 'waist', 'reduction', 'zipper'] },
  { id: 'suits-blazers', name: 'Suits & Blazers', img: '/alteration_assets/Suits & Blazers.png', compatibleServices: ['length', 'reduction', 'increase', 'sleeves', 'zipper', 'lining'] },
  { id: 'dresses', name: 'Dresses', img: '/alteration_assets/Dresses.png', compatibleServices: ['length', 'reduction', 'sleeves', 'waist', 'neckline', 'zipper', 'lining'] },
  { id: 'uniforms', name: 'Uniforms', img: '/alteration_assets/Uniform.png', compatibleServices: ['length', 'reduction', 'increase', 'waist', 'sleeves', 'zipper', 'lining'] }
];

// 8 Popular Alteration Services matching exact reference screenshot
const POPULAR_SERVICES = [
  {
    id: 'length',
    name: 'Length Adjustment',
    tags: 'Saree, Kurti, Dress, Trousers',
    price: 99,
    priceDisplay: 'From ₹99',
    img: '/alteration_assets/Length Adjustment.png',
    turnaround: '24 - 48 Hours',
    desc: 'Shorten or let down hemlines on pants, skirts, kurtis, dresses, and sarees with authentic stitching and original hem preservation.'
  },
  {
    id: 'reduction',
    name: 'Size Reduction',
    tags: 'Shirts, Blouses, Dresses',
    price: 149,
    priceDisplay: 'From ₹149',
    img: '/alteration_assets/Size Reduction.png',
    turnaround: '24 - 48 Hours',
    desc: 'Take in sides, chest, shoulders, or bust line to create a sleek, bespoke silhouette without affecting original garment proportions.'
  },
  {
    id: 'increase',
    name: 'Size Increase',
    tags: 'Shirts, Blouses, Suits',
    price: 199,
    priceDisplay: 'From ₹199',
    img: '/alteration_assets/Size Increase.png',
    turnaround: '48 Hours',
    desc: 'Expertly let out internal seam margins and add matched gussets or panels to comfortably expand tight garments.'
  },
  {
    id: 'sleeves',
    name: 'Sleeve Alteration',
    tags: 'Shorten / Lengthen',
    price: 99,
    priceDisplay: 'From ₹99',
    img: '/alteration_assets/Sleeve Altration.png',
    turnaround: '24 Hours',
    desc: 'Alter sleeve lengths, taper arm openings, modify cuffs, or restyle from full to three-quarter or cap sleeves.'
  },
  {
    id: 'waist',
    name: 'Waist Adjustment',
    tags: 'Pants, Skirts, Salwars',
    price: 149,
    priceDisplay: 'From ₹149',
    img: '/alteration_assets/Waist Adjustment.png',
    turnaround: '24 - 48 Hours',
    desc: 'Take in or let out trouser, denim, or lehenga waists. Re-align waistband, belt loops, and back seam seamlessly.'
  },
  {
    id: 'neckline',
    name: 'Neckline Change',
    tags: 'Alter / Redesign',
    price: 99,
    priceDisplay: 'From ₹99',
    img: '/alteration_assets/Neckline Change.png',
    turnaround: '48 Hours',
    desc: 'Reshape front or back necklines (V-neck, boat neck, sweetheart, round) or adjust collar height and modest piping.'
  },
  {
    id: 'zipper',
    name: 'Zipper Replacement',
    tags: 'Dresses, Blouses, Jackets',
    price: 199,
    priceDisplay: 'From ₹199',
    img: '/alteration_assets/Zipper Replacement.png',
    turnaround: '24 Hours',
    desc: 'Replace broken or jammed metal, nylon, and invisible zips with durable YKK premium sliders and neat inner stitching.'
  },
  {
    id: 'lining',
    name: 'Lining & Finishing',
    tags: 'Sarees, Gowns, Kurtis',
    price: 149,
    priceDisplay: 'From ₹149',
    img: '/alteration_assets/Lining & Finishing.png',
    turnaround: '24 - 48 Hours',
    desc: 'Add soft cotton or butter crepe lining, pico borders, delicate hem tape, and interlining to sarees, lehengas, and sheer tunics.'
  }
];

// 5 Before & After Transformations matching reference assets
const TRANSFORMATIONS = [
  {
    id: 't1',
    title: 'Kurti Length Adjustment',
    beforeImg: '/alteration_assets/Kurti Length Adjustment Before.png',
    afterImg: '/alteration_assets/Kurti Length Adjustment  After.png',
    details: 'Shortened high-low hem by 3.5 inches while preserving original ethnic embroidery border.'
  },
  {
    id: 't2',
    title: 'Blouse Size Reduction',
    beforeImg: '/alteration_assets/Blouse Size Reduction Before.png',
    afterImg: '/alteration_assets/Blouse Size Reduction After.png',
    details: 'Tapered chest and side seam margins by 2 inches for a snug, flawless bridal fitting.'
  },
  {
    id: 't3',
    title: 'Pant Waist Adjustment',
    beforeImg: '/alteration_assets/Pant Waist Adjustment Before.png',
    afterImg: '/alteration_assets/Pant Waist Adjustment After.png',
    details: 'Waistband taken in 2 inches with custom centered back darting and belt loop alignment.'
  },
  {
    id: 't4',
    title: 'Dress Fit Adjustment',
    beforeImg: '/alteration_assets/Dress Fit Adjustment Before.png',
    afterImg: '/alteration_assets/Dress Fit Adjustment After.png',
    details: 'Contoured princess seams and raised waistline for an elegant hourglass drape.'
  },
  {
    id: 't5',
    title: 'Shirt Sleeve Alteration',
    beforeImg: '/alteration_assets/Shirt Sleeve Altration Before.png',
    afterImg: '/alteration_assets/Shirt Sleeve Altration After.png',
    details: 'Shortened sleeves by 2.2 inches with authentic French cuff re-attachment.'
  }
];

// 8 Pricing Guide Pills matching reference screenshot
const PRICE_GUIDE = [
  { id: 'p1', name: 'Saree Fall & Pico', price: '₹99', serviceId: 'lining', category: 'sarees' },
  { id: 'p2', name: 'Blouse Alteration', price: '₹149', serviceId: 'reduction', category: 'blouses' },
  { id: 'p3', name: 'Length Adjustment', price: '₹99', serviceId: 'length', category: 'trousers' },
  { id: 'p4', name: 'Pant Hemming', price: '₹99', serviceId: 'length', category: 'trousers' },
  { id: 'p5', name: 'Shirt Alteration', price: '₹149', serviceId: 'sleeves', category: 'shirts' },
  { id: 'p6', name: 'Dress Fit Adjustment', price: '₹199', serviceId: 'reduction', category: 'dresses' },
  { id: 'p7', name: 'Zipper Replacement', price: '₹199', serviceId: 'zipper', category: 'dresses' },
  { id: 'p8', name: 'Neckline Change', price: '₹99', serviceId: 'neckline', category: 'kurtis' }
];

// 5 Why Choose Benefits matching reference screenshot
const WHY_CHOOSE_BENEFITS = [
  {
    id: 'b1',
    title: 'Verified & Skilled Tailors',
    desc: 'Expert tailors with years of experience.',
    icon: <Scissors size={22} />
  },
  {
    id: 'b2',
    title: 'Convenient & Hassle-Free',
    desc: 'Home pickup and delivery available.',
    icon: <Truck size={22} />
  },
  {
    id: 'b3',
    title: 'Transparent Pricing',
    desc: 'No hidden charges.',
    icon: <ShieldCheck size={22} />
  },
  {
    id: 'b4',
    title: 'Quick Turnaround',
    desc: 'Get your clothes back on time.',
    icon: <Clock size={22} />
  },
  {
    id: 'b5',
    title: 'Quality Assurance',
    desc: 'Perfect fit and neat finishing.',
    icon: <CheckCircle2 size={22} />
  }
];

// 3 Customer Testimonials
const CUSTOMER_REVIEWS = [
  {
    id: 'rev1',
    name: 'Sneha K.',
    city: 'Bengaluru',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    quote: 'My saree blouse fitting was perfect! Very professional service and quick delivery.'
  },
  {
    id: 'rev2',
    name: 'Divya M.',
    city: 'Hyderabad',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    quote: 'Excellent alteration service. My kurti fits so well now. Highly recommended!'
  },
  {
    id: 'rev3',
    name: 'Priya R.',
    city: 'Chennai',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    quote: 'Convenient pickup and delivery. Great stitching quality!'
  }
];

// Curated verified alteration tailors
const VERIFIED_ALTERATION_TAILORS = [
  {
    id: 't-alt-1',
    name: 'Classic Stitch & 24h Alterations',
    rating: 4.9,
    reviews: 142,
    area: 'Koramangala, 5th Block',
    city: 'Bengaluru',
    distance: 0.8,
    turnaround: '24 Hours Express',
    startingPrice: '₹99',
    specialties: ['Express Alterations', 'Saree Fall & Pico', 'Pants', 'Blouses'],
    pickupAvailable: true,
    img: '/alteration_assets/Length Adjustment.png',
    lat: 12.9345,
    lng: 77.6200
  },
  {
    id: 't-alt-2',
    name: 'Royal Bespoke Fit Studio',
    rating: 4.8,
    reviews: 118,
    area: 'HSR Layout, Sector 2',
    city: 'Bengaluru',
    distance: 1.4,
    turnaround: '24 - 48 Hours',
    startingPrice: '₹149',
    specialties: ['Suits & Blazers', 'Trouser Tapering', 'Shirts'],
    pickupAvailable: true,
    img: '/alteration_assets/Size Reduction.png',
    lat: 12.9141,
    lng: 77.6413
  },
  {
    id: 't-alt-3',
    name: 'Gottigere Designer Tailors & Alterations',
    rating: 4.8,
    reviews: 95,
    area: 'Gottigere, Bannerghatta Road',
    city: 'Bengaluru',
    distance: 2.1,
    turnaround: '48 Hours',
    startingPrice: '₹99',
    specialties: ['Kurtis', 'Lehengas', 'Zippers', 'Blouse Resizing'],
    pickupAvailable: true,
    img: '/alteration_assets/Waist Adjustment.png',
    lat: 12.8596,
    lng: 77.5888
  },
  {
    id: 't-alt-4',
    name: 'Perfect Stitches Boutique',
    rating: 4.7,
    reviews: 84,
    area: 'Indiranagar, 100ft Road',
    city: 'Bengaluru',
    distance: 3.2,
    turnaround: '24 Hours',
    startingPrice: '₹129',
    specialties: ['Dresses', 'Neckline Reshaping', 'Linings'],
    pickupAvailable: true,
    img: '/alteration_assets/Neckline Change.png',
    lat: 12.9784,
    lng: 77.6408
  }
];

export default function ClothingAlterationsPage({
  currentUser,
  theme = 'light',
  tailors = [],
  orders = [],
  addOrder = () => {},
  onLoginRequired = () => {},
  onNavigateHome = () => {}
}) {
  // Page View state: 'landing' (Main page) | 'booking' (Next Page Workflow)
  const [currentPage, setCurrentPage] = useState('landing');
  const [bookingStep, setBookingStep] = useState(1); // 1: Garment & Services, 2: Photos & Notes, 3: Tailor, 4: Schedule, 5: Review & Estimate, 6: Confirmed

  // Category Filtering on landing page
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllServicesInPage, setShowAllServicesInPage] = useState(false);

  // Active selected service for booking
  const [activeService, setActiveService] = useState(POPULAR_SERVICES[0]);
  const [selectedServicesList, setSelectedServicesList] = useState([POPULAR_SERVICES[0]]);

  // In-Page Full Price Catalog Expansion
  const [showInPagePriceList, setShowInPagePriceList] = useState(false);

  // Transformations modal & drag comparison state
  const [transDetailModal, setTransDetailModal] = useState(null);
  const [dragPosition, setDragPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [transIndex, setTransIndex] = useState(0);

  // Reviews carousel index
  const [reviewIndex, setReviewIndex] = useState(0);

  // Booking Data State
  const [bookingData, setBookingData] = useState({
    garmentType: 'trousers',
    garmentName: 'Trousers',
    quantity: 1,
    instructions: '',
    uploadedPhotos: [],
    tailor: VERIFIED_ALTERATION_TAILORS[0],
    fulfillment: 'pickup', // 'pickup' | 'visit'
    pickupDate: '',
    pickupTime: '10:00 - 12:00',
    customerName: currentUser?.name || 'Aarav Mehta',
    customerPhone: currentUser?.phone || '+91 98765 43210',
    customerAddress: 'Apartment 204, Royal Palms, Koramangala, Bengaluru'
  });
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Map state for Step 3
  const [tailorDistanceFilter, setTailorDistanceFilter] = useState('all');
  const [tailorRatingFilter, setTailorRatingFilter] = useState('all');
  const [tailorPickupOnly, setTailorPickupOnly] = useState(false);
  const [tailorSearchTerm, setTailorSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState('Bengaluru (Koramangala)');
  const [locationStatus, setLocationStatus] = useState(null);
  const bookingMapRef = useRef(null);
  const leafletMapInstanceRef = useRef(null);

  // Filtered Services for landing page grid
  const displayedServices = selectedCategory 
    ? POPULAR_SERVICES.filter(service => {
        const cat = CLOTHING_CATEGORIES.find(c => c.id === selectedCategory);
        return cat?.compatibleServices.includes(service.id);
      })
    : POPULAR_SERVICES;

  // Filtered Tailors
  const displayedTailors = VERIFIED_ALTERATION_TAILORS.filter(tailor => {
    if (tailorPickupOnly && !tailor.pickupAvailable) return false;
    if (tailorRatingFilter === '4.8' && tailor.rating < 4.8) return false;
    if (tailorDistanceFilter === '2' && tailor.distance > 2) return false;
    if (tailorDistanceFilter === '5' && tailor.distance > 5) return false;
    if (tailorSearchTerm) {
      const q = tailorSearchTerm.toLowerCase();
      const match = tailor.name.toLowerCase().includes(q) || 
                    tailor.area.toLowerCase().includes(q) || 
                    tailor.specialties.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Open booking workflow directly on Next Page
  const openBookingWorkflow = (service = null, categoryId = null, step = 1) => {
    if (service) {
      setActiveService(service);
      setSelectedServicesList([service]);
    }
    if (categoryId) {
      const cat = CLOTHING_CATEGORIES.find(c => c.id === categoryId);
      setBookingData(prev => ({ 
        ...prev, 
        garmentType: categoryId,
        garmentName: cat ? cat.name : prev.garmentName
      }));
    }
    setBookingStep(step);
    setConfirmedOrder(null);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle service selection in workflow
  const toggleWorkflowService = (service) => {
    setSelectedServicesList(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  // Calculate live estimate
  const calculateEstimate = () => {
    const basePrice = selectedServicesList.reduce((sum, s) => sum + (s?.price || 99), 0);
    const subtotal = basePrice * (bookingData.quantity || 1);
    const pickupFee = bookingData.fulfillment === 'pickup' ? (subtotal >= 499 ? 0 : 49) : 0;
    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + pickupFee + gst;
    const turnaround = selectedServicesList[0]?.turnaround || '24 - 48 Hours';

    return { subtotal, pickupFee, gst, total, turnaround };
  };

  // Handle Geolocation Request
  const handleDetectLocation = () => {
    setLocationStatus('Detecting GPS coordinates...');
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationStatus('Location found! Showing closest tailors.');
        setUserLocation(`Current: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        if (leafletMapInstanceRef.current) {
          leafletMapInstanceRef.current.setView([pos.coords.latitude, pos.coords.longitude], 14);
        }
      },
      () => {
        setLocationStatus('Permission denied. Showing Bengaluru default.');
      }
    );
  };

  // Initialize Leaflet map on step 3
  useEffect(() => {
    if (currentPage !== 'booking' || bookingStep !== 3) {
      if (leafletMapInstanceRef.current) {
        leafletMapInstanceRef.current.remove();
        leafletMapInstanceRef.current = null;
      }
      return;
    }

    const timer = setTimeout(() => {
      if (!bookingMapRef.current) return;
      if (leafletMapInstanceRef.current) {
        leafletMapInstanceRef.current.remove();
        leafletMapInstanceRef.current = null;
      }

      try {
        const map = L.map(bookingMapRef.current, {
          center: [12.9345, 77.6200],
          zoom: 13,
          zoomControl: true
        });

        L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          attribution: '&copy; Google Maps'
        }).addTo(map);

        displayedTailors.forEach(t => {
          const customIcon = L.divIcon({
            className: 'custom-alt-pin',
            html: `<div style="background:#E11D74; color:#fff; font-weight:800; font-size:11px; padding:4px 8px; border-radius:14px; box-shadow:0 2px 8px rgba(0,0,0,0.3); white-space:nowrap; border:2px solid #fff; cursor:pointer;">✂ ${t.name.split(' ')[0]}</div>`,
            iconSize: [80, 24],
            iconAnchor: [40, 12]
          });

          const marker = L.marker([t.lat, t.lng], { icon: customIcon }).addTo(map);
          marker.bindPopup(`
            <div style="font-family:inherit; min-width:180px; padding:4px;">
              <strong style="color:#111827; font-size:13px; display:block;">${t.name}</strong>
              <div style="color:#E11D74; font-weight:700; font-size:12px; margin:2px 0;">⭐ ${t.rating} (${t.reviews} reviews)</div>
              <div style="color:#6B7280; font-size:11px;">${t.area} • ${t.distance} km</div>
              <div style="color:#10B981; font-weight:600; font-size:11px; margin-top:2px;">Turnaround: ${t.turnaround}</div>
            </div>
          `);

          marker.on('click', () => {
            setBookingData(prev => ({ ...prev, tailor: t }));
          });
        });

        leafletMapInstanceRef.current = map;
      } catch (err) {
        console.warn('Leaflet map error:', err);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      if (leafletMapInstanceRef.current) {
        leafletMapInstanceRef.current.remove();
        leafletMapInstanceRef.current = null;
      }
    };
  }, [currentPage, bookingStep, displayedTailors]);

  // Confirm Final Booking
  const handleConfirmFinalBooking = () => {
    const est = calculateEstimate();
    const orderId = `ALT-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: orderId,
      orderNumber: orderId,
      type: 'Clothing Alteration',
      serviceType: 'Alteration',
      category: bookingData.garmentName || 'Garment',
      services: selectedServicesList.map(s => s.name),
      garment: bookingData.garmentName || 'Garment',
      quantity: bookingData.quantity,
      tailor: bookingData.tailor?.name || 'Verified Tailor',
      tailorId: bookingData.tailor?.id || 't-alt-1',
      tailorPhone: '+91 98765 12345',
      customerName: bookingData.customerName,
      customerPhone: bookingData.customerPhone,
      deliveryAddress: bookingData.customerAddress,
      fulfillment: bookingData.fulfillment,
      scheduledDate: bookingData.pickupDate || 'Tomorrow',
      scheduledTime: bookingData.pickupTime || '10:00 - 12:00',
      instructions: bookingData.instructions || 'Standard fitting required.',
      photos: bookingData.uploadedPhotos,
      pricing: {
        basePrice: est.subtotal,
        pickupFee: est.pickupFee,
        gst: est.gst,
        total: est.total
      },
      status: 'Booking Confirmed',
      timeline: [
        { title: 'Booking Confirmed', date: 'Just now', completed: true },
        { title: 'Pickup Scheduled', date: bookingData.pickupDate || 'Tomorrow', completed: false },
        { title: 'Garment Collected', date: 'Pending', completed: false },
        { title: 'Alteration in Progress', date: 'Pending', completed: false },
        { title: 'Quality Check', date: 'Pending', completed: false },
        { title: 'Ready for Delivery', date: 'Pending', completed: false },
        { title: 'Delivered', date: 'Pending', completed: false }
      ],
      createdAt: new Date().toISOString()
    };

    if (addOrder) {
      addOrder(newOrder);
    }
    setConfirmedOrder(newOrder);
    setBookingStep(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Draggable slider mouse events for before/after comparison
  const handleDragMove = (e) => {
    if (!isDragging) return;
    const container = document.getElementById('alt-drag-compare-box');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (offsetX / rect.width) * 100;
    setDragPosition(percent);
  };


  /* ==========================================================================
     RENDER: NEXT PAGE (BOOKING WORKFLOW VIEW)
     ========================================================================== */
  if (currentPage === 'booking') {
    const est = calculateEstimate();

    return (
      <div className={`alterations-page-root ${theme === 'dark' ? 'dark' : 'light'}`}>
        <div className="alt-workflow-page-wrap">
          <div className="alt-container">
            
            {/* Top Navigation Bar with Back Button */}
            <div className="alt-workflow-topbar">
              <button 
                className="alt-back-btn"
                onClick={() => {
                  setCurrentPage('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <ArrowLeft size={18} />
                <span>Back to Alteration Services</span>
              </button>

              <div className="alt-workflow-title-wrap">
                <span className="alt-workflow-badge">CLOTHING ALTERATION & FIT</span>
                <h1 className="alt-workflow-heading">Book Alteration Service</h1>
              </div>
            </div>

            {/* Stepper Progress Bar (Only visible before confirmation) */}
            {bookingStep < 6 && (
              <div className="alt-workflow-stepper">
                {[
                  { step: 1, label: 'Garment & Service' },
                  { step: 2, label: 'Photos & Notes' },
                  { step: 3, label: 'Select Tailor' },
                  { step: 4, label: 'Schedule Pickup' },
                  { step: 5, label: 'Review & Estimate' }
                ].map(s => {
                  const isActive = bookingStep === s.step;
                  const isCompleted = bookingStep > s.step;
                  return (
                    <div 
                      key={s.step} 
                      className={`alt-workflow-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={() => {
                        if (bookingStep > s.step) setBookingStep(s.step);
                      }}
                    >
                      <div className="alt-workflow-step-circle">
                        {isCompleted ? <Check size={16} /> : s.step}
                      </div>
                      <span className="alt-workflow-step-label">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Dedicated Next Page Content Card */}
            <div className="alt-workflow-content-card">
              
              {/* STEP 1: Garment & Services Selection */}
              {bookingStep === 1 && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--alt-text-primary)' }}>
                      Step 1: Choose Garment & Services
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: 'var(--alt-text-muted)', margin: 0 }}>
                      Select the clothing category and pick one or more alteration services you need.
                    </p>
                  </div>

                  {/* Garment Type Grid */}
                  <label className="alt-form-label" style={{ marginBottom: '12px', display: 'block' }}>
                    Select Garment Type:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px', marginBottom: '28px' }}>
                    {CLOTHING_CATEGORIES.map(c => {
                      const isSel = bookingData.garmentType === c.id;
                      return (
                        <div 
                          key={c.id}
                          onClick={() => setBookingData(prev => ({ ...prev, garmentType: c.id, garmentName: c.name }))}
                          style={{
                            border: `2px solid ${isSel ? 'var(--alt-primary)' : 'var(--alt-border)'}`,
                            background: isSel ? 'var(--alt-primary-light)' : 'var(--alt-bg-card)',
                            borderRadius: '12px',
                            padding: '10px 8px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <img src={c.img} alt={c.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, textAlign: 'center', color: isSel ? 'var(--alt-primary)' : 'var(--alt-text-primary)' }}>
                            {c.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Alteration Services Multiselect */}
                  <label className="alt-form-label" style={{ marginBottom: '12px', display: 'block' }}>
                    Select Alteration Services (Multiple compatible services supported):
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px', marginBottom: '28px' }}>
                    {POPULAR_SERVICES.map(srv => {
                      const isSelected = selectedServicesList.some(s => s.id === srv.id);
                      return (
                        <div 
                          key={srv.id}
                          onClick={() => toggleWorkflowService(srv)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: `2px solid ${isSelected ? 'var(--alt-primary)' : 'var(--alt-border)'}`,
                            background: isSelected ? 'var(--alt-primary-light)' : 'var(--alt-bg-card)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <img src={srv.img} alt={srv.name} style={{ width: '56px', height: '46px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <strong style={{ fontSize: '0.88rem', color: 'var(--alt-text-primary)' }}>{srv.name}</strong>
                              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--alt-primary)' }}>{srv.priceDisplay}</span>
                            </div>
                            <span style={{ fontSize: '0.74rem', color: 'var(--alt-text-muted)', display: 'block', marginTop: '2px' }}>
                              Turnaround: {srv.turnaround}
                            </span>
                          </div>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--alt-primary)' : 'var(--alt-border)'}`,
                            background: isSelected ? 'var(--alt-primary)' : 'transparent',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 800
                          }}>
                            {isSelected && '✓'}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quantity selector */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'var(--alt-bg-subtle)', borderRadius: '12px', border: '1px solid var(--alt-border)', marginBottom: '32px' }}>
                    <div>
                      <strong style={{ fontSize: '0.94rem', color: 'var(--alt-text-primary)', display: 'block' }}>Garment Quantity</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--alt-text-muted)' }}>How many pieces require this alteration?</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button 
                        type="button"
                        onClick={() => setBookingData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                        style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid var(--alt-border)', background: 'var(--alt-bg-card)', color: 'var(--alt-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800 }}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, minWidth: '24px', textAlign: 'center', color: 'var(--alt-text-primary)' }}>
                        {bookingData.quantity}
                      </span>
                      <button 
                        type="button"
                        onClick={() => setBookingData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                        style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid var(--alt-border)', background: 'var(--alt-bg-card)', color: 'var(--alt-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 800 }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button 
                      className="alt-btn-primary"
                      onClick={() => setBookingStep(2)}
                    >
                      <span>Continue to Photos & Notes</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Reference Photos & Notes */}
              {bookingStep === 2 && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--alt-text-primary)' }}>
                      Step 2: Garment Photos & Alteration Instructions
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: 'var(--alt-text-muted)', margin: 0 }}>
                      Provide exact instructions and photos of the garment to help our master tailors.
                    </p>
                  </div>

                  {/* Photo Upload Area */}
                  <div className="alt-form-group" style={{ marginBottom: '20px' }}>
                    <label className="alt-form-label">Upload Garment Reference Photos (Optional)</label>
                    <label 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        border: '2px dashed var(--alt-border-pink)',
                        borderRadius: '12px',
                        padding: '24px',
                        cursor: 'pointer',
                        background: 'var(--alt-bg-subtle)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        style={{ display: 'none' }}
                        onChange={e => {
                          const urls = Array.from(e.target.files).map(f => URL.createObjectURL(f));
                          setBookingData(prev => ({ ...prev, uploadedPhotos: [...prev.uploadedPhotos, ...urls] }));
                        }}
                      />
                      <Upload size={24} style={{ color: 'var(--alt-primary)' }} />
                      <strong style={{ fontSize: '0.9rem', color: 'var(--alt-text-primary)' }}>Click to browse or drop garment photos here</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--alt-text-muted)' }}>Supported: JPG, PNG, WEBP (Max 5 photos)</span>
                    </label>

                    {bookingData.uploadedPhotos.length > 0 && (
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                        {bookingData.uploadedPhotos.map((url, i) => (
                          <div key={i} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--alt-border)' }}>
                            <img src={url} alt="Garment preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button 
                              type="button"
                              onClick={() => setBookingData(prev => ({ ...prev, uploadedPhotos: prev.uploadedPhotos.filter((_, idx) => idx !== i) }))}
                              style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.65)', border: 'none', borderRadius: '50%', color: '#fff', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Alteration Notes */}
                  <div className="alt-form-group" style={{ marginBottom: '32px' }}>
                    <label className="alt-form-label">Special Fit Instructions / Alteration Details</label>
                    <textarea 
                      className="alt-form-textarea"
                      rows={4}
                      value={bookingData.instructions}
                      onChange={e => setBookingData(prev => ({ ...prev, instructions: e.target.value }))}
                      placeholder="e.g. Please shorten the pant hem by 2 inches and keep the original jeans stitch. Blouse bust needs 1 inch tightening."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <button 
                      className="alt-btn-outline"
                      onClick={() => setBookingStep(1)}
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Garment</span>
                    </button>
                    <button 
                      className="alt-btn-primary"
                      onClick={() => setBookingStep(3)}
                    >
                      <span>Continue to Tailor Selection</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Verified Tailor Selection with Interactive Map */}
              {bookingStep === 3 && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--alt-text-primary)' }}>
                      Step 3: Select Verified Alteration Tailor
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: 'var(--alt-text-muted)', margin: 0 }}>
                      Discover vetted master tailors near your location with ratings, distance and starting rates.
                    </p>
                  </div>

                  {/* GPS & Location Bar */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'var(--alt-bg-subtle)', padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--alt-border)', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Navigation size={18} style={{ color: 'var(--alt-primary)' }} />
                      <div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--alt-text-muted)' }}>Selected Location</div>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--alt-text-primary)' }}>{userLocation}</strong>
                      </div>
                    </div>
                    <button 
                      className="alt-btn-outline" 
                      onClick={handleDetectLocation}
                      style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                    >
                      <Navigation size={14} />
                      <span>Use My Location</span>
                    </button>
                  </div>

                  {/* Split Layout: Interactive Leaflet Google Maps on Left + Tailor Cards on Right */}
                  <div className="alt-step-two-col alt-tailor-step-split">
                    {/* Interactive Leaflet Map Box */}
                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--alt-border)', position: 'relative', minHeight: '340px' }}>
                      <div ref={bookingMapRef} style={{ width: '100%', height: '100%', minHeight: '340px' }} />
                    </div>

                    {/* Tailors List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px', overflowY: 'auto', paddingRight: '4px' }}>
                      {displayedTailors.map(t => {
                        const isChosen = bookingData.tailor?.id === t.id;
                        return (
                          <div 
                            key={t.id}
                            onClick={() => setBookingData(prev => ({ ...prev, tailor: t }))}
                            style={{
                              padding: '12px 14px',
                              borderRadius: '10px',
                              border: `2px solid ${isChosen ? 'var(--alt-primary)' : 'var(--alt-border)'}`,
                              background: isChosen ? 'var(--alt-primary-light)' : 'var(--alt-bg-card)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <img src={t.img} alt={t.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ fontSize: '0.88rem', color: 'var(--alt-text-primary)' }}>{t.name}</strong>
                                <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>{t.distance} km</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--alt-text-muted)', margin: '2px 0' }}>
                                <span style={{ color: '#F59E0B', fontWeight: 700 }}>⭐ {t.rating}</span>
                                <span>({t.reviews} reviews)</span>
                                <span>•</span>
                                <span>{t.area}</span>
                              </div>
                              <span style={{ fontSize: '0.72rem', color: 'var(--alt-primary)', fontWeight: 600 }}>
                                {t.turnaround}
                              </span>
                            </div>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              border: `2px solid ${isChosen ? 'var(--alt-primary)' : 'var(--alt-border)'}`,
                              background: isChosen ? 'var(--alt-primary)' : 'transparent',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: 800
                            }}>
                              {isChosen && '✓'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <button 
                      className="alt-btn-outline"
                      onClick={() => setBookingStep(2)}
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Photos</span>
                    </button>
                    <button 
                      className="alt-btn-primary"
                      onClick={() => setBookingStep(4)}
                    >
                      <span>Continue to Pickup & Schedule</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Fulfillment (Pickup vs Visit) & Schedule */}
              {bookingStep === 4 && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--alt-text-primary)' }}>
                      Step 4: Fulfillment Method & Schedule
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: 'var(--alt-text-muted)', margin: 0 }}>
                      Choose doorstep pickup & delivery or schedule an in-person tailor studio appointment.
                    </p>
                  </div>

                  {/* Fulfillment Option Selector */}
                  <div className="alt-step-two-col">
                    <div 
                      onClick={() => setBookingData(prev => ({ ...prev, fulfillment: 'pickup' }))}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: `2px solid ${bookingData.fulfillment === 'pickup' ? 'var(--alt-primary)' : 'var(--alt-border)'}`,
                        background: bookingData.fulfillment === 'pickup' ? 'var(--alt-primary-light)' : 'var(--alt-bg-card)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Truck size={24} style={{ color: 'var(--alt-primary)', marginBottom: '6px' }} />
                      <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--alt-text-primary)' }}>Home Pickup & Delivery</div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--alt-text-muted)' }}>Free on orders above ₹499 (Standard ₹49)</span>
                    </div>

                    <div 
                      onClick={() => setBookingData(prev => ({ ...prev, fulfillment: 'visit' }))}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: `2px solid ${bookingData.fulfillment === 'visit' ? 'var(--alt-primary)' : 'var(--alt-border)'}`,
                        background: bookingData.fulfillment === 'visit' ? 'var(--alt-primary-light)' : 'var(--alt-bg-card)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <User size={24} style={{ color: 'var(--alt-primary)', marginBottom: '6px' }} />
                      <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--alt-text-primary)' }}>Tailor Shop Visit</div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--alt-text-muted)' }}>Visit tailor studio in person for trial</span>
                    </div>
                  </div>

                  {/* Date and Time Selector */}
                  <div className="alt-step-two-col">
                    <div className="alt-form-group">
                      <label className="alt-form-label">Preferred Date</label>
                      <input 
                        type="date" 
                        className="alt-form-input"
                        value={bookingData.pickupDate}
                        onChange={e => setBookingData(prev => ({ ...prev, pickupDate: e.target.value }))}
                      />
                    </div>
                    <div className="alt-form-group">
                      <label className="alt-form-label">Preferred Time Slot</label>
                      <select 
                        className="alt-form-select"
                        value={bookingData.pickupTime}
                        onChange={e => setBookingData(prev => ({ ...prev, pickupTime: e.target.value }))}
                      >
                        <option value="10:00 - 12:00">10:00 AM - 12:00 PM</option>
                        <option value="12:00 - 15:00">12:00 PM - 03:00 PM</option>
                        <option value="15:00 - 18:00">03:00 PM - 06:00 PM</option>
                        <option value="18:00 - 20:00">06:00 PM - 08:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Address & Contact Information */}
                  <div className="alt-step-two-col">
                    <div className="alt-form-group">
                      <label className="alt-form-label">Customer Name</label>
                      <input 
                        type="text" 
                        className="alt-form-input"
                        value={bookingData.customerName}
                        onChange={e => setBookingData(prev => ({ ...prev, customerName: e.target.value }))}
                      />
                    </div>
                    <div className="alt-form-group">
                      <label className="alt-form-label">Contact Phone</label>
                      <input 
                        type="text" 
                        className="alt-form-input"
                        value={bookingData.customerPhone}
                        onChange={e => setBookingData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="alt-form-group" style={{ marginBottom: '32px' }}>
                    <label className="alt-form-label">Pickup & Delivery Address</label>
                    <input 
                      type="text" 
                      className="alt-form-input"
                      value={bookingData.customerAddress}
                      onChange={e => setBookingData(prev => ({ ...prev, customerAddress: e.target.value }))}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <button 
                      className="alt-btn-outline"
                      onClick={() => setBookingStep(3)}
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Tailor</span>
                    </button>
                    <button 
                      className="alt-btn-primary"
                      onClick={() => setBookingStep(5)}
                    >
                      <span>Review & Instant Estimate</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Instant Transparent Estimate */}
              {bookingStep === 5 && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--alt-text-primary)' }}>
                      Step 5: Review & Confirm Booking
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: 'var(--alt-text-muted)', margin: 0 }}>
                      Transparent pricing breakdown with no hidden charges.
                    </p>
                  </div>

                  {/* Summary Overview Grid */}
                  <div className="alt-step-two-col alt-summary-step-split">
                    
                    {/* Left: Booking Details Recap */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--alt-bg-subtle)', padding: '20px', borderRadius: '12px', border: '1px solid var(--alt-border)' }}>
                      <h4 style={{ margin: 0, fontSize: '0.94rem', color: 'var(--alt-text-primary)' }}>Booking Details</h4>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: 'var(--alt-text-secondary)' }}>Garment:</span>
                        <strong style={{ color: 'var(--alt-text-primary)' }}>{bookingData.garmentName} (x{bookingData.quantity})</strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: 'var(--alt-text-secondary)' }}>Services:</span>
                        <strong style={{ color: 'var(--alt-primary)' }}>
                          {selectedServicesList.map(s => s.name).join(', ')}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: 'var(--alt-text-secondary)' }}>Selected Tailor:</span>
                        <strong style={{ color: 'var(--alt-text-primary)' }}>{bookingData.tailor?.name}</strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: 'var(--alt-text-secondary)' }}>Fulfillment:</span>
                        <strong style={{ color: 'var(--alt-text-primary)' }}>
                          {bookingData.fulfillment === 'pickup' ? 'Home Pickup & Delivery' : 'Tailor Studio Visit'}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: 'var(--alt-text-secondary)' }}>Schedule:</span>
                        <strong style={{ color: 'var(--alt-text-primary)' }}>
                          {bookingData.pickupDate || 'Tomorrow'}, {bookingData.pickupTime}
                        </strong>
                      </div>

                      {bookingData.instructions && (
                        <div style={{ fontSize: '0.82rem', background: 'var(--alt-bg-card)', padding: '10px', borderRadius: '8px', border: '1px solid var(--alt-border)' }}>
                          <span style={{ color: 'var(--alt-text-muted)', display: 'block', marginBottom: '2px' }}>Instructions:</span>
                          <span style={{ color: 'var(--alt-text-primary)' }}>"{bookingData.instructions}"</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Transparent Price Breakdown Table */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--alt-bg-subtle)', padding: '20px', borderRadius: '12px', border: '1px solid var(--alt-border)' }}>
                      <h4 style={{ margin: 0, fontSize: '0.94rem', color: 'var(--alt-text-primary)' }}>Instant Estimate Breakdown</h4>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: 'var(--alt-text-secondary)' }}>Alteration Base Charge:</span>
                        <strong style={{ color: 'var(--alt-text-primary)' }}>₹{est.subtotal}</strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: 'var(--alt-text-secondary)' }}>Doorstep Pickup & Return:</span>
                        <strong style={{ color: est.pickupFee === 0 ? '#10B981' : 'var(--alt-text-primary)' }}>
                          {est.pickupFee === 0 ? 'FREE' : `₹${est.pickupFee}`}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: 'var(--alt-text-secondary)' }}>GST (5%):</span>
                        <strong style={{ color: 'var(--alt-text-primary)' }}>₹{est.gst}</strong>
                      </div>

                      <div style={{ height: '1px', background: 'var(--alt-border)' }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800 }}>
                        <span style={{ color: 'var(--alt-text-primary)' }}>Total Estimated:</span>
                        <span style={{ color: 'var(--alt-primary)' }}>₹{est.total}</span>
                      </div>

                      <div style={{ fontSize: '0.76rem', color: 'var(--alt-text-muted)', marginTop: '4px' }}>
                        • Expected Turnaround: <strong>{est.turnaround}</strong>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <button 
                      className="alt-btn-outline"
                      onClick={() => setBookingStep(4)}
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Schedule</span>
                    </button>
                    <button 
                      className="alt-btn-primary"
                      onClick={handleConfirmFinalBooking}
                      style={{ padding: '12px 28px' }}
                    >
                      <Check size={18} />
                      <span>Confirm Alteration Booking</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: Booking Confirmed & Live Order Tracking Timeline */}
              {bookingStep === 6 && confirmedOrder && (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle size={44} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--alt-text-primary)', margin: '0 0 8px 0' }}>
                    Alteration Booking #{confirmedOrder.id} Confirmed!
                  </h2>
                  <p style={{ fontSize: '0.94rem', color: 'var(--alt-text-secondary)', maxWidth: '560px', margin: '0 auto 28px auto' }}>
                    Master tailor <strong>{confirmedOrder.tailor}</strong> has confirmed your booking for <strong>{confirmedOrder.garment}</strong>. Pickup scheduled for <strong>{confirmedOrder.scheduledDate} ({confirmedOrder.scheduledTime})</strong>.
                  </p>

                  {/* Live 6-Stage Tracking Timeline */}
                  <div style={{ maxWidth: '640px', margin: '0 auto 32px auto', background: 'var(--alt-bg-subtle)', borderRadius: '16px', padding: '24px', textAlign: 'left', border: '1px solid var(--alt-border)' }}>
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '0.94rem', color: 'var(--alt-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={16} style={{ color: 'var(--alt-primary)' }} />
                      <span>Live Order Status Tracking</span>
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {confirmedOrder.timeline.map((st, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: st.completed ? '#10B981' : 'var(--alt-text-muted)', fontWeight: st.completed ? 700 : 500 }}>
                            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: st.completed ? '#10B981' : 'var(--alt-border)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>
                              {st.completed ? '✓' : idx + 1}
                            </span>
                            {st.title}
                          </span>
                          <span style={{ color: 'var(--alt-text-muted)', fontSize: '0.78rem' }}>{st.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confirmation CTAs */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <button 
                      className="alt-btn-outline"
                      onClick={() => {
                        setBookingStep(1);
                        setConfirmedOrder(null);
                      }}
                    >
                      <span>Book Another Alteration</span>
                    </button>
                    <button 
                      className="alt-btn-primary"
                      onClick={() => {
                        setCurrentPage('landing');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Alteration Home</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    );
  }


  /* ==========================================================================
     RENDER: LANDING PAGE (MAIN CLOTHING ALTERATIONS PAGE)
     ========================================================================== */
  return (
    <div className={`alterations-page-root ${theme === 'dark' ? 'dark' : 'light'}`}>
      
      {/* ==========================================================================
         1. HERO SECTION – 100% FULL-WIDTH HERO BANNER
         ========================================================================== */}
      <section className="alt-hero-section">
        <div className="alt-hero-full-banner-wrap">
          {/* 100% full-width image spanning edge-to-edge */}
          <img 
            src="/alteration_assets/HERO.png" 
            alt="StitchBeez Clothing Alteration & Fit Services" 
            className="alt-hero-full-img"
            loading="eager"
          />

          {/* Overlaid Interactive Controls on the Left Side of HERO.png */}
          <div className="alt-hero-overlay-content">
            <span className="alt-hero-eyebrow">ALTERATION & FIT SERVICES</span>
            <h1 className="alt-hero-heading">
              <span className="alt-hero-heading-navy">Perfect Fit</span>
              <span className="alt-hero-heading-pink">For Every Outfit</span>
            </h1>
            <p className="alt-hero-subtext">
              From small alterations to complete fit adjustments, get your clothes tailored by verified experts. 
              Look better, feel comfortable and wear your favourites again.
            </p>

            {/* 4 Feature Badges */}
            <div className="alt-hero-features-row">
              <div className="alt-hero-feature-item">
                <div className="alt-hero-feature-icon-box">
                  <Scissors size={18} />
                </div>
                <span className="alt-hero-feature-label">Skilled Tailors</span>
              </div>
              <div className="alt-hero-feature-item">
                <div className="alt-hero-feature-icon-box">
                  <Clock size={18} />
                </div>
                <span className="alt-hero-feature-label">Quick Turnaround</span>
              </div>
              <div className="alt-hero-feature-item">
                <div className="alt-hero-feature-icon-box">
                  <ShieldCheck size={18} />
                </div>
                <span className="alt-hero-feature-label">Transparent Pricing</span>
              </div>
              <div className="alt-hero-feature-item">
                <div className="alt-hero-feature-icon-box">
                  <Truck size={18} />
                </div>
                <span className="alt-hero-feature-label">Home Pickup & Delivery</span>
              </div>
            </div>

            {/* 2 Primary CTA Buttons */}
            <div className="alt-hero-cta-group">
              <button 
                className="alt-btn-primary"
                onClick={() => openBookingWorkflow(null, null, 3)}
              >
                <span>Find a Tailor Near You</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="alt-btn-outline"
                onClick={() => openBookingWorkflow(POPULAR_SERVICES[0], 'trousers', 1)}
              >
                <span>Get Instant Estimate</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ==========================================================================
         2. CHOOSE YOUR CLOTHING TYPE (10 CARDS - 100% FULL-WIDTH EVEN DISTRIBUTION)
         ========================================================================== */}
      <section className="alt-categories-section">
        <div className="alt-container">
          
          <div className="alt-section-header">
            <div className="alt-section-header-left">
              <h2 className="alt-section-title">Choose Your Clothing Type</h2>
              <p className="alt-section-subtitle">Select a category to view tailor-recommended alteration services.</p>
            </div>
            <button 
              className="alt-section-action-btn"
              onClick={() => setSelectedCategory(null)}
            >
              <span>{selectedCategory ? 'Show All Garments' : 'View All Clothing Types (10)'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Active filter chip if a category is selected */}
          {selectedCategory && (
            <div className="alt-active-filter-badge">
              <span>Showing alterations for: <strong>{CLOTHING_CATEGORIES.find(c => c.id === selectedCategory)?.name}</strong></span>
              <button 
                className="alt-clear-filter-btn"
                onClick={() => setSelectedCategory(null)}
                title="Clear filter"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* 10 Category Cards Distributed Evenly across 100% Full Width */}
          <div className="alt-categories-grid-10">
            {CLOTHING_CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`alt-category-card ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedCategory(null);
                    } else {
                      setSelectedCategory(cat.id);
                      setBookingData(prev => ({ ...prev, garmentType: cat.id, garmentName: cat.name }));
                    }
                  }}
                  title={`Click to filter alterations for ${cat.name}`}
                >
                  <div className="alt-category-img-box">
                    <img src={cat.img} alt={cat.name} className="alt-category-img" loading="lazy" />
                  </div>
                  <span className="alt-category-label">{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>


      {/* ==========================================================================
         3. POPULAR ALTERING SERVICES (8 CARDS - NAVIGATES TO NEXT PAGE ON CLICK)
         ========================================================================== */}
      <section className="alt-services-section">
        <div className="alt-container">
          
          <div className="alt-section-header">
            <div className="alt-section-header-left">
              <h2 className="alt-section-title">Popular Altering Services</h2>
              <p className="alt-section-subtitle">Choose the service you need and get it done by expert tailors.</p>
            </div>
            <button 
              className="alt-section-action-btn"
              onClick={() => {
                setSelectedCategory(null);
                setShowAllServicesInPage(prev => !prev);
              }}
            >
              <span>{showAllServicesInPage ? 'Show Filtered Services' : 'View All Services (8)'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 8 Services Grid */}
          <div className="alt-services-grid">
            {(showAllServicesInPage ? POPULAR_SERVICES : displayedServices).map(service => {
              return (
                <div 
                  key={service.id} 
                  className="alt-service-card"
                  onClick={() => openBookingWorkflow(service, selectedCategory, 1)}
                  title={`Click to customize and book ${service.name} on the next page`}
                >
                  <div className="alt-service-img-box">
                    <img src={service.img} alt={service.name} className="alt-service-img" loading="lazy" />
                  </div>
                  <div className="alt-service-body">
                    <div className="alt-service-title-row">
                      <h3 className="alt-service-title">{service.name}</h3>
                      <span className="alt-service-tags">{service.tags}</span>
                    </div>
                    <div className="alt-service-footer">
                      <span className="alt-service-price">{service.priceDisplay}</span>
                      <button 
                        className="alt-service-arrow-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookingWorkflow(service, selectedCategory, 1);
                        }}
                        title={`Select ${service.name}`}
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ==========================================================================
         4. HOW ALTERATION WORKS (6 STEPS HORIZONTAL)
         ========================================================================== */}
      <section className="alt-process-section">
        <div className="alt-container">
          
          <div className="alt-section-header">
            <div className="alt-section-header-left">
              <h2 className="alt-section-title">How Alteration Works</h2>
              <p className="alt-section-subtitle">A simple and transparent process to get your clothes perfectly fitted.</p>
            </div>
            <button 
              className="alt-section-action-btn"
              onClick={() => openBookingWorkflow(POPULAR_SERVICES[0], 'trousers', 1)}
            >
              <span>Book Alteration</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="alt-process-steps-row">
            
            {/* Step 1 */}
            <div className="alt-process-step-item">
              <div className="alt-process-step-head">
                <span className="alt-step-number-bubble">1</span>
                <div className="alt-step-icon-circle">
                  <Scissors size={26} />
                </div>
                <span className="alt-step-connector-arrow">● ● →</span>
              </div>
              <h4 className="alt-step-title">Choose Clothing Type</h4>
              <p className="alt-step-desc">Select the garment you want to alter.</p>
            </div>

            {/* Step 2 */}
            <div className="alt-process-step-item">
              <div className="alt-process-step-head">
                <span className="alt-step-number-bubble">2</span>
                <div className="alt-step-icon-circle">
                  <Tag size={26} />
                </div>
                <span className="alt-step-connector-arrow">● ● →</span>
              </div>
              <h4 className="alt-step-title">Select Service</h4>
              <p className="alt-step-desc">Choose the alteration service you need.</p>
            </div>

            {/* Step 3 */}
            <div className="alt-process-step-item">
              <div className="alt-process-step-head">
                <span className="alt-step-number-bubble">3</span>
                <div className="alt-step-icon-circle">
                  <MapPin size={26} />
                </div>
                <span className="alt-step-connector-arrow">● ● →</span>
              </div>
              <h4 className="alt-step-title">Find a Tailor</h4>
              <p className="alt-step-desc">Discover verified tailors near you (Google Maps).</p>
            </div>

            {/* Step 4 */}
            <div className="alt-process-step-item">
              <div className="alt-process-step-head">
                <span className="alt-step-number-bubble">4</span>
                <div className="alt-step-icon-circle">
                  <ShieldCheck size={26} />
                </div>
                <span className="alt-step-connector-arrow">● ● →</span>
              </div>
              <h4 className="alt-step-title">Get Estimate</h4>
              <p className="alt-step-desc">View price and delivery time.</p>
            </div>

            {/* Step 5 */}
            <div className="alt-process-step-item">
              <div className="alt-process-step-head">
                <span className="alt-step-number-bubble">5</span>
                <div className="alt-step-icon-circle">
                  <Calendar size={26} />
                </div>
                <span className="alt-step-connector-arrow">● ● →</span>
              </div>
              <h4 className="alt-step-title">Pickup or Visit</h4>
              <p className="alt-step-desc">Schedule home pickup or visit tailor.</p>
            </div>

            {/* Step 6 */}
            <div className="alt-process-step-item">
              <div className="alt-process-step-head">
                <span className="alt-step-number-bubble">6</span>
                <div className="alt-step-icon-circle">
                  <Truck size={26} />
                </div>
              </div>
              <h4 className="alt-step-title">Alteration & Delivery</h4>
              <p className="alt-step-desc">Get it stitched and delivered on time.</p>
            </div>

          </div>

        </div>
      </section>


      {/* ==========================================================================
         5. BEFORE & AFTER TRANSFORMATIONS (5 CARDS)
         ========================================================================== */}
      <section className="alt-transformations-section">
        <div className="alt-container">
          
          <div className="alt-section-header">
            <div className="alt-section-header-left">
              <h2 className="alt-section-title">Before & After Transformations</h2>
              <p className="alt-section-subtitle">See how small changes can make a big difference.</p>
            </div>
            <button 
              className="alt-section-action-btn"
              onClick={() => {
                setTransDetailModal(TRANSFORMATIONS[0]);
                setDragPosition(50);
              }}
            >
              <span>View More Examples</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="alt-carousel-nav-wrapper">
            <button 
              className="alt-carousel-btn prev"
              onClick={() => setTransIndex(prev => (prev > 0 ? prev - 1 : TRANSFORMATIONS.length - 1))}
              title="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="alt-transformations-grid">
              {TRANSFORMATIONS.map((item) => (
                <div 
                  key={item.id} 
                  className="alt-transformation-card"
                  onClick={() => {
                    setTransDetailModal(item);
                    setDragPosition(50);
                  }}
                  title="Click to view interactive before/after split slider"
                >
                  <div className="alt-trans-images-split">
                    <div className="alt-trans-single-half">
                      <img src={item.beforeImg} alt={`${item.title} Before`} className="alt-trans-img" loading="lazy" />
                      <span className="alt-trans-pill before">Before</span>
                    </div>
                    <div className="alt-trans-single-half">
                      <img src={item.afterImg} alt={`${item.title} After`} className="alt-trans-img" loading="lazy" />
                      <span className="alt-trans-pill after">After</span>
                    </div>
                  </div>
                  <h4 className="alt-trans-title">{item.title}</h4>
                </div>
              ))}
            </div>

            <button 
              className="alt-carousel-btn next"
              onClick={() => setTransIndex(prev => (prev < TRANSFORMATIONS.length - 1 ? prev + 1 : 0))}
              title="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </section>


      {/* ==========================================================================
         6. ALTERATION PRICE GUIDE (8 PILL CARDS + IN-PAGE SHEET TOGGLE)
         ========================================================================== */}
      <section className="alt-pricing-section">
        <div className="alt-container">
          
          <div className="alt-section-header">
            <div className="alt-section-header-left">
              <h2 className="alt-section-title">Alteration Price Guide</h2>
              <p className="alt-section-subtitle">Get an idea of our starting prices for common alterations.</p>
            </div>
            <button 
              className="alt-section-action-btn"
              onClick={() => setShowInPagePriceList(prev => !prev)}
            >
              <span>{showInPagePriceList ? 'Hide Price List' : 'View Full Price List'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="alt-pricing-grid">
            {PRICE_GUIDE.map(item => (
              <div 
                key={item.id} 
                className="alt-price-pill-card"
                onClick={() => {
                  const targetSrv = POPULAR_SERVICES.find(s => s.id === item.serviceId) || POPULAR_SERVICES[0];
                  openBookingWorkflow(targetSrv, item.category, 1);
                }}
                title={`Click to book ${item.name} on the next page`}
              >
                <span className="alt-price-pill-name">{item.name}</span>
                <span className="alt-price-pill-value">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Expanded Full Price List Sheet */}
          {showInPagePriceList && (
            <div className="alt-inpage-pricelist-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--alt-text-primary)' }}>Full Alteration Price Sheet</h3>
                <button 
                  className="alt-inpage-close-btn"
                  onClick={() => setShowInPagePriceList(false)}
                >
                  <X size={14} />
                  <span>Close</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                {[
                  { item: 'Saree Fall & Pico', price: '₹99', turnaround: '24 hrs', serviceId: 'lining', cat: 'sarees' },
                  { item: 'Pant & Jeans Hemming (Length)', price: '₹99', turnaround: '24 hrs', serviceId: 'length', cat: 'trousers' },
                  { item: 'Pant Waist Adjustment (Take in / Let out)', price: '₹149', turnaround: '24 - 48 hrs', serviceId: 'waist', cat: 'trousers' },
                  { item: 'Blouse Sizing & Side Seams Adjustment', price: '₹149', turnaround: '24 - 48 hrs', serviceId: 'reduction', cat: 'blouses' },
                  { item: 'Shirt Tapering & Sleeve Shortening', price: '₹149', turnaround: '24 hrs', serviceId: 'sleeves', cat: 'shirts' },
                  { item: 'Dress Silhouette Tapering & Bust Fitting', price: '₹199', turnaround: '48 hrs', serviceId: 'reduction', cat: 'dresses' },
                  { item: 'YKK Premium Zipper Replacement', price: '₹199', turnaround: '24 hrs', serviceId: 'zipper', cat: 'dresses' },
                  { item: 'Neckline Reshape & Modesty Lining', price: '₹199', turnaround: '48 hrs', serviceId: 'neckline', cat: 'kurtis' }
                ].map((row, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '8px', background: 'var(--alt-bg-subtle)', border: '1px solid var(--alt-border)' }}>
                    <div>
                      <strong style={{ fontSize: '0.86rem', color: 'var(--alt-text-primary)' }}>{row.item}</strong>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--alt-text-muted)' }}>Est. {row.turnaround}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--alt-primary)' }}>{row.price}</strong>
                      <button 
                        className="alt-btn-primary"
                        style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                        onClick={() => {
                          const targetSrv = POPULAR_SERVICES.find(s => s.id === row.serviceId) || POPULAR_SERVICES[0];
                          openBookingWorkflow(targetSrv, row.cat, 1);
                        }}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>


      {/* ==========================================================================
         7. WHY CHOOSE STITCHBEEZ ALTERATION? (5 BENEFITS)
         ========================================================================== */}
      <section className="alt-benefits-section">
        <div className="alt-container">
          
          <div className="alt-section-header" style={{ marginBottom: '28px' }}>
            <div className="alt-section-header-left">
              <h2 className="alt-section-title">Why Choose StitchBeez Alteration?</h2>
            </div>
          </div>

          <div className="alt-benefits-grid">
            {WHY_CHOOSE_BENEFITS.map(b => (
              <div key={b.id} className="alt-benefit-card">
                <div className="alt-benefit-icon-box">
                  {b.icon}
                </div>
                <h4 className="alt-benefit-title">{b.title}</h4>
                <p className="alt-benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ==========================================================================
         8. WHAT OUR CUSTOMERS SAY (REVIEWS)
         ========================================================================== */}
      <section className="alt-reviews-section">
        <div className="alt-container">
          
          <div className="alt-section-header">
            <div className="alt-section-header-left">
              <h2 className="alt-section-title">What Our Customers Say</h2>
            </div>
          </div>

          <div className="alt-carousel-nav-wrapper">
            <button 
              className="alt-carousel-btn prev"
              onClick={() => setReviewIndex(prev => (prev > 0 ? prev - 1 : CUSTOMER_REVIEWS.length - 1))}
              title="Previous Review"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="alt-reviews-grid">
              {CUSTOMER_REVIEWS.map(rev => (
                <div key={rev.id} className="alt-review-card">
                  <div className="alt-review-header">
                    <img src={rev.avatar} alt={rev.name} className="alt-review-avatar" />
                    <div className="alt-review-user-info">
                      <div className="alt-review-stars">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#FBBF24" stroke="#FBBF24" />
                        ))}
                      </div>
                      <span className="alt-review-author">{rev.name}</span>
                      <span className="alt-review-city">{rev.city}</span>
                    </div>
                  </div>
                  <p className="alt-review-quote">"{rev.quote}"</p>
                </div>
              ))}
            </div>

            <button 
              className="alt-carousel-btn next"
              onClick={() => setReviewIndex(prev => (prev < CUSTOMER_REVIEWS.length - 1 ? prev + 1 : 0))}
              title="Next Review"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </section>


      {/* ==========================================================================
         9. BOTTOM CTA BANNER – 100% FULL-WIDTH BANNER IMAGE
         ========================================================================== */}
      <section className="alt-bottom-cta-section">
        <div className="alt-bottom-cta-full-banner-wrap">
          {/* 100% full-width image spanning edge-to-edge */}
          <img 
            src="/alteration_assets/Give Your Clothes a New Life.png" 
            alt="Give Your Clothes a New Life" 
            className="alt-bottom-cta-full-img"
            loading="lazy"
          />

          {/* Overlaid Interactive Controls on the Right Side of Give Your Clothes a New Life.png */}
          <div className="alt-bottom-cta-overlay-content">
            <h2 className="alt-bottom-cta-title">Give Your Clothes a New Life</h2>
            <p className="alt-bottom-cta-subtext">
              Get professional alteration services and enjoy a perfect fit again.
            </p>
            <div className="alt-bottom-cta-buttons">
              <button 
                className="alt-btn-primary"
                onClick={() => openBookingWorkflow(null, null, 3)}
              >
                <span>Find a Tailor Near You</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="alt-btn-outline"
                onClick={() => openBookingWorkflow(POPULAR_SERVICES[0], 'trousers', 1)}
              >
                <span>Get Instant Estimate</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ==========================================================================
         BEFORE & AFTER INTERACTIVE DRAG COMPARISON SLIDER (FOR TRANSFORMATION CARDS)
         ========================================================================== */}
      {transDetailModal && (
        <div className="alt-modal-overlay" onClick={() => setTransDetailModal(null)}>
          <div className="alt-modal-dialog" onClick={e => e.stopPropagation()}>
            
            <div className="alt-modal-header">
              <h3 className="alt-modal-title">{transDetailModal.title}</h3>
              <button className="alt-modal-close-btn" onClick={() => setTransDetailModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="alt-modal-body">
              <p style={{ fontSize: '0.86rem', color: 'var(--alt-text-secondary)', margin: 0 }}>
                {transDetailModal.details}
              </p>

              {/* Interactive Draggable Split Box */}
              <div 
                id="alt-drag-compare-box"
                className="alt-drag-compare-container"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleDragMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={handleDragMove}
              >
                <img 
                  src={transDetailModal.afterImg} 
                  alt="After alteration" 
                  className="alt-drag-img" 
                />
                <span className="alt-trans-pill after" style={{ bottom: '16px', right: '16px', left: 'auto', transform: 'none' }}>
                  After Alteration
                </span>

                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${dragPosition}%`,
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={transDetailModal.beforeImg} 
                    alt="Before alteration" 
                    className="alt-drag-img" 
                    style={{ width: document.getElementById('alt-drag-compare-box')?.clientWidth || 600 }}
                  />
                  <span className="alt-trans-pill before" style={{ bottom: '16px', left: '16px', transform: 'none' }}>
                    Original Fit (Before)
                  </span>
                </div>

                <div 
                  className="alt-drag-divider"
                  style={{ left: `${dragPosition}%` }}
                >
                  <div className="alt-drag-handle">
                    <SlidersHorizontal size={16} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--alt-text-muted)' }}>
                  ↔ Drag slider left and right to inspect precision tailoring.
                </span>
                <button 
                  className="alt-btn-primary"
                  onClick={() => {
                    setTransDetailModal(null);
                    openBookingWorkflow(POPULAR_SERVICES[0], 'trousers', 1);
                  }}
                >
                  <span>Book Similar Alteration</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
