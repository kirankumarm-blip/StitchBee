import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Star, Scissors, Truck, Calendar, Sparkles, User, Info, Map, List, Clock, 
  CreditCard, ChevronLeft, ChevronRight, ChevronDown, X, ShoppingCart, Plus, Minus, Check, Camera, RefreshCw, Upload, 
  Video, Layers, Activity, FileText, Shield, Sliders, Bell, Heart, HelpCircle, Menu, Sun, Moon, Phone,
  MessageSquare, Home, Share2, Trash2, Box, Edit, Shirt
} from 'lucide-react';
import { loadFromStorage, saveToStorage, executePgQuery, FABRIC_MARKETPLACE_DATA } from '../utils/mockDb';
import ServiceCategoryView from './ServiceCategoryView';

const resolveInspirationImage = (inputUrl) => {
  if (!inputUrl) return '';
  const trimmed = inputUrl.trim();
  const lower = trimmed.toLowerCase();
  
  if (lower.includes('bridal 5.jpg') || lower.includes('bridal%205.jpg')) return './br_bridal 5.jpg';
  if (lower.includes('bridal2.jpg')) return './br_bridal2.jpg';
  if (lower.includes('bridal3.jpg')) return './br_bridal3.jpg';
  if (lower.includes('bridal4.jpg')) return './br_bridal4.jpg';
  if (lower.includes('bridal6.jpg')) return './br_bridal6.jpg';
  if (lower.includes('bridal7.jpg')) return './br_bridal7.jpg';
  if (lower.includes('b1.jpg')) return './br_b1.jpg';
  if (lower.includes('b2.jpg')) return './br_b2.jpg';
  
  if (lower.includes('bridalcollection.jpg')) return './bridalCollection.jpg';
  if (lower.includes('kidscollection.jpg')) return './kidsCollection.jpg';
  if (lower.includes('luxurycollection.jpg')) return './luxuryCollection.jpg';
  if (lower.includes('mens collection.jpg') || lower.includes('mens%20collection.jpg') || lower.includes('menscollection.jpg')) return './Mens Collection.jpg';
  if (lower.includes('womenscollection.jpg')) return './womensCollection.jpg';
  
  if (lower.includes('men1.jpg')) return './men1.jpg';
  if (lower.includes('k1.jpg')) return './k_k1.jpg';
  if (lower.includes('k2.jpg')) return './k_k2.jpg';
  if (lower.includes('k3.jpg')) return './k_k3.jpg';
  if (lower.includes('k4.jpg')) return './k_k4.jpg';
  if (lower.includes('k5.jpg')) return './k_k5.jpg';
  if (lower.includes('k6.jpg')) return './k_k6.jpg';
  
  if (trimmed.startsWith('http') || trimmed.startsWith('./') || trimmed.startsWith('/')) {
    return trimmed;
  }
  return trimmed;
};

export default function CustomerView({ 
  tailors, orders, addOrder, updateOrderStatus, ledger, setLedger, banners, articles, currentUser,
  initialCategory = 'all', initialHub = 'tailors', onLoginRequired,
  onLogout, setRole, setCustomerHub, setCustomerCategory, theme, setTheme
}) {
  const isDark = theme === 'dark';
  const bgCard = isDark ? '#1a1a2e' : '#fff';
  const bgInput = isDark ? '#12121f' : '#f8fafc';
  const bgActiveOption = isDark ? 'rgba(247,37,133,0.15)' : '#fff9fb';
  const colorTextPrimary = isDark ? '#f8fafc' : '#1a2238';
  const colorTextSecondary = isDark ? '#cbd5e1' : '#374151';
  const colorTextMuted = isDark ? '#94a3b8' : '#6b7280';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0';

  const bannerCarouselRef = React.useRef(null);
  const designerCarouselRef = React.useRef(null);
  const [activeHub, setActiveHub] = useState(initialHub); // 'tailors' | 'fabrics' | 'sarees' | 'designers' | 'articles' | 'history' | 'home' | 'wishlist'
  
  // My Orders filter & sort states
  const [ordersFilter, setOrdersFilter] = useState('all'); // 'all' | 'in-progress' | 'completed' | 'cancelled'
  const [ordersTimeframe, setOrdersTimeframe] = useState('Last 6 Months');
  
  // Wishlist sort & content states
  const [wishlistSort, setWishlistSort] = useState('recently-added');
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 'wish-1',
      category: 'saree',
      name: 'Kanchipuram Pure Silk Saree',
      desc: 'Classic gold zari border with rich pallu and traditional motifs.',
      fabric: 'Silk',
      color: 'Pink',
      length: '6.3 m',
      price: 8500,
      addedOn: '28 May 2026',
      img: '/bridal3.jpg'
    },
    {
      id: 'wish-2',
      category: 'lehenga',
      name: 'Designer Organza Lehenga',
      desc: 'Floral embroidery with sequins work and matching dupatta.',
      fabric: 'Organza',
      color: 'Lavender',
      length: 'Semi Stitched',
      price: 12500,
      addedOn: '24 May 2026',
      img: '/bridal4.jpg'
    },
    {
      id: 'wish-3',
      category: 'saree',
      name: 'Chanderi Cotton-Silk Saree',
      desc: 'Lightweight, breathable and perfect for festive occasions.',
      fabric: 'Cotton Silk',
      color: 'Green',
      length: '5.5 m',
      price: 3200,
      addedOn: '20 May 2026',
      img: '/bridal2.jpg'
    },
    {
      id: 'wish-4',
      category: 'lehenga',
      name: 'Bridal Velvet Lehenga Set',
      desc: 'Heavy embroidery with zari, stones and a designer dupatta.',
      fabric: 'Velvet',
      color: 'Maroon',
      length: 'Semi Stitched',
      price: 15800,
      addedOn: '18 May 2026',
      img: '/bridal3.jpg'
    }
  ]);
  
  // Header and user interaction states
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [rewardPoints, setRewardPoints] = useState(120);
  
  // Custom mock notification feed
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Order #STB-9204 has progressed to 'Stitching'", time: "2 hours ago", unread: true },
    { id: 2, text: "Your customized design bid has been accepted by Sneha Reddy", time: "1 day ago", unread: false },
    { id: 3, text: "Exclusive: 20% discount on Banarasi Silk ends today!", time: "2 days ago", unread: false }
  ]);

  // Wishlist and Measurements Profiles
  const [wishlist, setWishlist] = useState([
    { id: 'w1', name: 'Zardozi Royal Lehenga', price: 8500, designer: 'Sneha Reddy', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80' },
    { id: 'w2', name: 'Banarasi Raw Silk (Royal Blue)', price: 950, designer: 'Fabric Store', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80' }
  ]);

  const [measurementProfiles, setMeasurementProfiles] = useState([
    { id: 1, name: 'Self (Kiran)', type: 'Men', chest: '38', waist: '32', shoulder: '17', length: '28', collar: '15', sleeves: '24' },
    { id: 2, name: 'Father (Ramesh)', type: 'Men', chest: '40', waist: '36', shoulder: '18', length: '29', collar: '16', sleeves: '23' },
    { id: 3, name: 'Mother (Savitri)', type: 'Women', bust: '36', waist: '34', shoulder: '15', length: '36', sleeves: '18' },
    { id: 4, name: 'Wife (Anjali)', type: 'Women', bust: '34', waist: '28', shoulder: '14.5', length: '38', sleeves: '19' },
    { id: 5, name: 'Son (Aarav)', type: 'Kids', chest: '26', waist: '24', shoulder: '11', length: '18', sleeves: '14' }
  ]);
  
  // My Profile Options States
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('edit'); // 'edit' | 'password' | 'notifications' | 'payments' | 'privacy'
  const [isPhotoDropdownOpen, setIsPhotoDropdownOpen] = useState(false);
  const fileInputRef = React.useRef(null);
  const [profileName, setProfileName] = useState(currentUser?.name || 'Neha Sharma');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || 'neha.sharma@example.com');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [profileDob, setProfileDob] = useState('15 March 1996');
  const [profileGender, setProfileGender] = useState('Female');
  const [profileAddress, setProfileAddress] = useState(currentUser?.address || '123 Green Glen Road, HSR Layout, Bengaluru, Karnataka - 560102');
  const [profileCity, setProfileCity] = useState('Bengaluru');
  const [profileState, setProfileState] = useState('Karnataka');
  const [profilePin, setProfilePin] = useState('560102');
  const [profilePhoto, setProfilePhoto] = useState('/bridal 5.jpg');

  // Toggle Preferences States
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);
  const [searchIndex, setSearchIndex] = useState(true);
  const [anonymousSharing, setAnonymousSharing] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setProfilePhoto(uploadEvent.target.result);
        setIsPhotoDropdownOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    alert("Simulating camera capture: Photo taken successfully!");
    setProfilePhoto('/Pastel Blue Suit.png');
    setIsPhotoDropdownOpen(false);
  };

  // Profile modal and adding states
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileType, setNewProfileType] = useState('Men');
  const [newProfileMeasurements, setNewProfileMeasurements] = useState({
    chest: '36', waist: '30', shoulder: '16', length: '27', collar: '14.5', sleeves: '23'
  });

  // Geolocation & Tailor Search States
  const [searchMode, setSearchMode] = useState('area'); // 'area' | 'city'
  const [searchQueryText, setSearchQueryText] = useState('');
  const [searchLocationName, setSearchLocationName] = useState('HSR Layout, Bangalore');
  const [isLocating, setIsLocating] = useState(false);
  const [gpsCoords, setGpsCoords] = useState(null);
  
  // Refine Search Filters
  const [filterRadius, setFilterRadius] = useState(5); // default 5 km
  const [filterServiceType, setFilterServiceType] = useState('All Services');
  const [filterMinRating, setFilterMinRating] = useState(0); // 0 means any
  const [filterSortBy, setFilterSortBy] = useState('Distance'); // 'Distance' | 'Rating' | 'Reviews'

  // Ready Designs Filter & Sorting States
  const [readyCategory, setReadyCategory] = useState('sarees'); // 'sarees' | 'lehengas'
  const [readySearchQuery, setReadySearchQuery] = useState('');
  const [readyFilterFabric, setReadyFilterFabric] = useState('all');
  const [readyFilterPrice, setReadyFilterPrice] = useState('all');
  const [readySortBy, setReadySortBy] = useState('Newest First');
  const [readyWishlist, setReadyWishlist] = useState({});

  // Dashboard & Booking Wizard States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  // Dynamic Hero Card Background Image Rotation (every 10s)
  const [heroBgIdx, setHeroBgIdx] = useState(0);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const heroBgs = ['./card_bg1.png', './card_bg2.jpg', './card_bg3.jpg', './card_bg4.jpg'];

  useEffect(() => {
    if (activeHub !== 'home') return;
    const interval = setInterval(() => {
      setHeroBgIdx((prev) => (prev + 1) % heroBgs.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [activeHub]);

  // Sync state if initial props change
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialHub) {
      setActiveHub(initialHub);
    }
  }, [initialHub]);

  useEffect(() => {
    const handleGlobalClick = () => {
      setServicesDropdownOpen(false);
      setNotificationDropdownOpen(false);
      setProfileDropdownOpen(false);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  
  
  // Sizing & Sizing State
  const [customerName, setCustomerName] = useState('Aarav Mehta');
  const [customerAddress, setCustomerAddress] = useState('Apartment 204, Royal Palms, Koramangala');
  const [stylePrefs, setStylePrefs] = useState([]);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 - 12:00');
  const [measurementOption, setMeasurementOption] = useState('ai'); 
  const [deliveryType, setDeliveryType] = useState('student'); // 'self' | 'student'
  const [notes, setNotes] = useState('');
  const [technicianGender, setTechnicianGender] = useState('male'); // male | female

  const trendingCarouselRef = React.useRef(null);
  const scrollTrending = (direction) => {
    if (trendingCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      trendingCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const fabricsCarouselRef = React.useRef(null);
  const scrollFabrics = (direction) => {
    if (fabricsCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      fabricsCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (activeHub !== 'home') return;
    const el = trendingCarouselRef.current;
    const elFab = fabricsCarouselRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (el) {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }
      if (elFab) {
        if (elFab.scrollLeft + elFab.clientWidth >= elFab.scrollWidth - 10) {
          elFab.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          elFab.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeHub]);

  // AI Camera scanner states
  const [aiScanning, setAiScanning] = useState(false);
  const [aiScanStep, setAiScanStep] = useState('start'); // 'start' | 'permission' | 'instructions' | 'capturing_front' | 'capturing_left' | 'capturing_right' | 'capturing_back' | 'input_height' | 'validating' | 'results' | 'results_complete'
  const [aiPhotoFront, setAiPhotoFront] = useState(null);
  const [aiPhotoSide, setAiPhotoSide] = useState(null);
  const [aiPhotoLeft, setAiPhotoLeft] = useState(null);
  const [aiPhotoRight, setAiPhotoRight] = useState(null);
  const [aiPhotoBack, setAiPhotoBack] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [aiCameraError, setAiCameraError] = useState(null);
  const [countdown, setCountdown] = useState(3);
  
  // Height and estimations
  const [aiHeight, setAiHeight] = useState(175);
  const [heightInputMode, setHeightInputMode] = useState('cm'); // 'cm' | 'ft'
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);

  const cmToFtIn = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches: inches === 12 ? 11 : inches };
  };

  const handleFtInChange = (feet, inches) => {
    setHeightFt(feet);
    setHeightIn(inches);
    const cm = Math.round((feet * 12 + inches) * 2.54);
    setAiHeight(cm);
  };

  const selectHeightPreset = (cm) => {
    setAiHeight(cm);
    const { feet, inches } = cmToFtIn(cm);
    setHeightFt(feet);
    setHeightIn(inches);
  };

  const [aiGender, setAiGender] = useState('Male');
  const [aiAge, setAiAge] = useState(28);
  const [aiWeight, setAiWeight] = useState(70);
  const [aiBodyShape, setAiBodyShape] = useState('Athletic');
  const [aiBmiCategory, setAiBmiCategory] = useState('Normal');
  const [aiFitRec, setAiFitRec] = useState('Regular Fit');
  const [aiConfidence, setAiConfidence] = useState(0.95);
  const [aiValidationErrors, setAiValidationErrors] = useState([]);
  const [aiMeasurements, setAiMeasurements] = useState(null);
  const [lowConfidenceFields, setLowConfidenceFields] = useState([]);
  const [aiScanMeasurements, setAiScanMeasurements] = useState(null);
  
  // Sizing Report Category
  const [activeReportCategory, setActiveReportCategory] = useState('shirt'); // shirt | pant | kurta | blazer | sherwani | kurti | blouse
  
  // Validation simulation testing triggers
  const [simBlur, setSimBlur] = useState(false);
  const [simLighting, setSimLighting] = useState(false);
  const [simMultiplePeople, setSimMultiplePeople] = useState(false);

  // PostgreSQL simulated console
  const [activeSqlTable, setActiveSqlTable] = useState('body_profiles');
  const [sqlConsoleOpen, setSqlConsoleOpen] = useState(true);
  const [sqlQueryLogs, setSqlQueryLogs] = useState([]);
  const [dbTableRows, setDbTableRows] = useState([]);

  // Manual measurements inputs
  const [selfMeasurements, setSelfMeasurements] = useState({
    chest: '38', waist: '32', shoulder: '17', length: '28', collar: '15', sleeves: '24'
  });

  // Shopping Cart
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Accelerated Timer ticks down for simulation
  const [timerState, setTimerState] = useState({}); // { [orderId]: secondsLeft }

  // Fabric Explorer state
  const [explorerPath, setExplorerPath] = useState([]);
  const [fabricWishlist, setFabricWishlist] = useState([]);
  const [fabricCompareList, setFabricCompareList] = useState([]);
  const [selectedMeters, setSelectedMeters] = useState(2);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [fabricFilters, setFabricFilters] = useState({
    brand: {},
    priceRange: [0, 10000],
    color: {},
    stretch: {},
    shine: {},
    texture: {},
    season: {},
    availability: {}
  });

  // Custom Design & Designer Studios Hub States
  const [selectedSpec, setSelectedSpec] = useState('all');
  const [selectedFabricFilter, setSelectedFabricFilter] = useState('');
  const [liveRequests, setLiveRequests] = useState([
    { id: 1, title: 'Need reception gown design', budget: 2000, category: 'bridal', bids: 3 },
    { id: 2, title: 'Need custom sherwani pattern', budget: 1500, category: 'ethnic', bids: 2 },
    { id: 3, title: 'Summer office wear capsule sketches', budget: 3000, category: 'office', bids: 5 }
  ]);
  const [newReqTitle, setNewReqTitle] = useState('');
  const [newReqBudget, setNewReqBudget] = useState('');
  const [newReqCategory, setNewReqCategory] = useState('bridal');

  const [inspTitle, setInspTitle] = useState('');
  const [inspImage, setInspImage] = useState('');
  const [inspDesc, setInspDesc] = useState('');
  const [inspBudget, setInspBudget] = useState('');
  const [inspCategory, setInspCategory] = useState('bridal');
  const [inspSubmissions, setInspSubmissions] = useState([
    {
      id: 101,
      title: 'Emerald Green Reception Lehenga',
      category: 'bridal',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
      description: 'Need a customized lehenga design with heavy zari work on borders and a minimal blouse design.',
      budget: 12000,
      status: 'Bids Received',
      bids: [
        { designerId: 'd1', designerName: 'Malini Iyer', amount: 11500, time: '2 hours ago', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
        { designerId: 'd3', designerName: 'Sneha Reddy', amount: 12000, time: '1 hour ago', rating: 5.0, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' }
      ]
    },
    {
      id: 102,
      title: 'Korean Style Overcoat',
      category: 'western',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80',
      description: 'Pastel pink oversized trench coat with double breasted buttons and side pockets.',
      budget: 3500,
      status: 'Bids Received',
      bids: [
        { designerId: 'd2', designerName: 'Rahul Varma', amount: 3200, time: '30 mins ago', rating: 4.7, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }
      ]
    }
  ]);

  const [studentCollege, setStudentCollege] = useState('all');
  const [studentSkill, setStudentSkill] = useState('all');
  const [studentSpecialty, setStudentSpecialty] = useState('all');

  // Style Articles Hub States
  const [activeArticleCategory, setActiveArticleCategory] = useState('all');
  const [activeSeasonalTab, setActiveSeasonalTab] = useState('summer');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [featuredSection, setFeaturedSection] = useState(null); // 'colors' | 'cuts' | 'fabrics' | 'celebs' | null

  // Geolocation Handler
  const handleGetLiveLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGpsCoords({ lat: latitude, lng: longitude });
          setSearchLocationName(`GPS Location (${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E)`);
          setIsLocating(false);
          alert("GPS Coordinates Accessed Successfully!");
        },
        (error) => {
          console.error(error);
          setIsLocating(false);
          alert("Location Access Denied. Showing default HSR Layout, Bangalore.");
        }
      );
    } else {
      setIsLocating(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Pre-select tailor and start wizard flow
  const startWizardWithTailor = (tailorObj) => {
    if (!currentUser) {
      if (onLoginRequired) {
        onLoginRequired();
        return;
      }
    }
    setSelectedWizardCategory('mens'); // default category
    const translatedTailor = {
      id: tailorObj.id,
      name: tailorObj.name,
      owner: tailorObj.name.split(' ')[0],
      image: tailorObj.img,
      lat: tailorObj.lat,
      lng: tailorObj.lng,
      rating: tailorObj.rating,
      reviews: tailorObj.reviews,
      address: tailorObj.area + ', ' + tailorObj.city,
      phone: '+91 98765 43210',
      portfolio: [
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=150&q=80'
      ],
      reviewsList: [
        { author: 'Kiran Kumar', rating: 5, comment: 'Excellent fitting and quick turnaround.' }
      ]
    };
    setSelectedTailor(translatedTailor);
    setAddFabric(false);
    setSelectedFabric(null);
    setWizardStep(1);
    setWizardOpen(true);
  };

  // Full tailors list data
  const nearByTailorsData = [
    { id: 't1', name: 'Royal Bespoke Tailors', rating: 4.8, reviews: 128, area: 'HSR Layout', city: 'Bangalore', distance: 0.3, img: '/tailor_hero_1.jpg', tags: ["Men's Wear", "Women's Wear", "Alterations", "Custom Tailoring"], status: 'Open', lat: 12.9141, lng: 77.6413 },
    { id: 't2', name: 'Perfect Stitches', rating: 4.7, reviews: 96, area: 'Koramangala', city: 'Bangalore', distance: 0.7, img: '/tailor_hero_2.jpg', tags: ["Blouse Stitching", "Salwar Suits", "Alterations", "Kids Wear"], status: 'Open', lat: 12.9279, lng: 77.6271 },
    { id: 't3', name: 'Style Tailors', rating: 4.6, reviews: 84, area: 'BTM Layout', city: 'Bangalore', distance: 1.2, img: '/tailor_hero_3.jpg', tags: ["Men's Wear", "Shirts", "Pants", "Alterations"], status: 'Open', lat: 12.9166, lng: 77.6101 },
    { id: 't4', name: 'Elegant Fashions', rating: 4.5, reviews: 72, area: 'Jayanagar', city: 'Bangalore', distance: 1.8, img: '/tailor_hero_4.jpg', tags: ["Saree Blouse", "Lehenga", "Alterations", "Custom Fit"], status: 'Open', lat: 12.9250, lng: 77.5938 },
    { id: 't5', name: 'Elite Cut Tailors', rating: 4.9, reviews: 110, area: 'T Nagar', city: 'Chennai', distance: 5.4, img: '/tailor_hero_5.jpg', tags: ["Bridal Wear", "Suits", "Women's Wear"], status: 'Open', lat: 13.0418, lng: 80.2337 },
    { id: 't6', name: 'Mumbai Master Fit', rating: 4.7, reviews: 154, area: 'Bandra', city: 'Mumbai', distance: 8.2, img: '/tailor_hero_2.jpg', tags: ["Men's Wear", "Lehenga", "Alterations"], status: 'Open', lat: 19.0596, lng: 72.8295 },
    { id: 't7', name: 'Delhi Designer Labs', rating: 4.8, reviews: 198, area: 'Connaught Place', city: 'Delhi', distance: 6.1, img: '/tailor_hero_1.jpg', tags: ["Sherwani", "Lehenga", "Ethnic Wear"], status: 'Open', lat: 28.6304, lng: 77.2177 }
  ];

  // Haversine formula to dynamically calculate distance between coordinates
  const getDistanceCoords = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const getSearchCenter = () => {
    const LOCALITY_COORDS = {
      'hsr': [12.9141, 77.6413],
      'hsr layout': [12.9141, 77.6413],
      'koramangala': [12.9348, 77.6189],
      'btm': [12.9166, 77.6101],
      'btm layout': [12.9166, 77.6101],
      'jayanagar': [12.9307, 77.5840],
      'indiranagar': [12.9719, 77.6412],
      'whitefield': [12.9698, 77.7500],
      'bangalore': [12.9716, 77.5946],
      'bengaluru': [12.9716, 77.5946],
      'chennai': [13.0827, 80.2707],
      'mumbai': [19.0760, 72.8777],
      'delhi': [28.6139, 77.2090],
      'hyderabad': [17.3850, 78.4867],
    };

    if (gpsCoords && searchLocationName.includes('GPS')) {
      return [gpsCoords.lat, gpsCoords.lng];
    }
    const normalized = searchLocationName.toLowerCase().split(',')[0].trim();
    if (LOCALITY_COORDS[normalized]) return LOCALITY_COORDS[normalized];
    const matchedKey = Object.keys(LOCALITY_COORDS).find(k => normalized.includes(k));
    return matchedKey ? LOCALITY_COORDS[matchedKey] : [12.9141, 77.6413];
  };

  const searchCenter = getSearchCenter();

  const filteredNearByTailors = nearByTailorsData.map(t => {
    const dist = getDistanceCoords(searchCenter[0], searchCenter[1], t.lat, t.lng);
    return { ...t, computedDistance: dist };
  }).filter(t => {
    let matchesSearch = true;
    if (searchQueryText.trim() !== '') {
      if (searchMode === 'area') {
        matchesSearch = t.area.toLowerCase().includes(searchQueryText.toLowerCase());
      } else {
        matchesSearch = t.city.toLowerCase().includes(searchQueryText.toLowerCase());
      }
    }
    const matchesRadius = t.computedDistance <= filterRadius;
    const matchesRating = t.rating >= filterMinRating;
    let matchesService = true;
    if (filterServiceType !== 'All Services') {
      matchesService = t.tags.some(tag => tag.toLowerCase().includes(filterServiceType.toLowerCase()));
    }
    return matchesSearch && matchesRadius && matchesRating && matchesService;
  });

  const sortedNearByTailors = [...filteredNearByTailors].sort((a, b) => {
    if (filterSortBy === 'Distance') return a.computedDistance - b.computedDistance;
    if (filterSortBy === 'Rating') return b.rating - a.rating;
    if (filterSortBy === 'Reviews') return b.reviews - a.reviews;
    return 0;
  });

  const addFabricToCart = (variant, meters, brandName, collectionName) => {
    if (!currentUser) {
      if (onLoginRequired) {
        onLoginRequired();
        return;
      }
    }
    const itemId = variant.id;
    const existing = cart.find(c => c.id === itemId);
    const itemName = `${brandName} ${collectionName} (${variant.color})`;
    if (existing) {
      setCart(cart.map(c => c.id === itemId ? { ...c, qty: c.qty + meters } : c));
    } else {
      setCart([...cart, { 
        id: itemId, 
        name: itemName, 
        price: variant.price, 
        image: variant.image || 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=300&q=80', 
        type: 'fabric', 
        qty: meters 
      }]);
    }
    setCartOpen(true);
  };

  const getAllVariants = (dataKey) => {
    const list = [];
    const categories = FABRIC_MARKETPLACE_DATA.categories;
    const catKeys = dataKey ? [dataKey] : Object.keys(categories);
    
    catKeys.forEach(catKey => {
      const cat = categories[catKey];
      if (!cat.subcategories) return;
      Object.keys(cat.subcategories).forEach(subKey => {
        const sub = cat.subcategories[subKey];
        if (!sub.fabricTypes) return;
        Object.keys(sub.fabricTypes).forEach(typeKey => {
          const fType = sub.fabricTypes[typeKey];
          if (!fType.brands) return;
          Object.keys(fType.brands).forEach(brandKey => {
            const brand = fType.brands[brandKey];
            if (!brand.collections) return;
            Object.keys(brand.collections).forEach(collKey => {
              const coll = brand.collections[collKey];
              if (!coll.variants) return;
              coll.variants.forEach(variant => {
                list.push({
                  ...variant,
                  catKey,
                  catName: cat.name,
                  subKey,
                  subName: sub.name,
                  typeKey,
                  typeName: fType.name,
                  brandKey,
                  brandName: brand.name,
                  collKey,
                  collName: coll.name
                });
              });
            });
          });
        });
      });
    });
    return list;
  };

  const isAnyFilterActive = () => {
    const { brand, priceRange, color, stretch, shine, texture, season, availability } = fabricFilters;
    const hasBrand = Object.values(brand).some(Boolean);
    const hasColor = Object.values(color).some(Boolean);
    const hasStretch = Object.values(stretch).some(Boolean);
    const hasShine = Object.values(shine).some(Boolean);
    const hasTexture = Object.values(texture).some(Boolean);
    const hasSeason = Object.values(season).some(Boolean);
    const hasAvailability = Object.values(availability).some(Boolean);
    const hasPrice = priceRange[0] > 0 || priceRange[1] < 10000;
    
    return hasBrand || hasColor || hasStretch || hasShine || hasTexture || hasSeason || hasAvailability || hasPrice;
  };

  const getFilteredVariants = () => {
    const activeCatKey = explorerPath[0];
    const allVars = getAllVariants(activeCatKey);
    
    return allVars.filter(item => {
      const { brand, priceRange, color, stretch, shine, texture, season, availability } = fabricFilters;
      
      const activeBrands = Object.keys(brand).filter(k => brand[k]);
      if (activeBrands.length > 0 && !activeBrands.includes(item.brandName)) return false;
      
      const activeColors = Object.keys(color).filter(k => color[k]);
      if (activeColors.length > 0 && !activeColors.includes(item.color)) return false;
      
      if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
      
      const activeStretch = Object.keys(stretch).filter(k => stretch[k]);
      if (activeStretch.length > 0 && !activeStretch.includes(item.stretch)) return false;
      
      const activeShine = Object.keys(shine).filter(k => shine[k]);
      if (activeShine.length > 0 && !activeShine.includes(item.shine)) return false;
      
      const activeTexture = Object.keys(texture).filter(k => texture[k]);
      if (activeTexture.length > 0 && !activeTexture.includes(item.texture)) return false;
      
      const activeSeason = Object.keys(season).filter(k => season[k]);
      if (activeSeason.length > 0 && !activeSeason.includes(item.season)) return false;
      
      const activeAvail = Object.keys(availability).filter(k => availability[k]);
      if (activeAvail.length > 0 && !activeAvail.includes(item.availability)) return false;
      
      return true;
    });
  };

  // Sync explorerPath when selectedCategory changes
  useEffect(() => {
    if (activeHub === 'fabrics') {
      const validCats = ['men', 'women', 'bridal', 'kids', 'luxury'];
      const catKey = selectedCategory?.toLowerCase();
      if (validCats.includes(catKey)) {
        setExplorerPath([catKey]);
      } else {
        setExplorerPath([]);
      }
    }
  }, [activeHub, selectedCategory]);

  // --- NEW WORKFLOW STATES ---
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1); // 1: Design & Fabric, 2: Measurements, 3: Match Tailor, 4: Negotiation, 5: Payment
  const [selectedWizardCategory, setSelectedWizardCategory] = useState('mens');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [addFabric, setAddFabric] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [placeSearchText, setPlaceSearchText] = useState('HSR Layout');
  
  // Negotiation states
  const [negotiatingState, setNegotiatingState] = useState('idle'); // idle | sending | reviewing | proposed | accepted
  const [proposedPrice, setProposedPrice] = useState(0);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi | card
  const [paymentCardNumber, setPaymentCardNumber] = useState('');
  const [paymentCardExpiry, setPaymentCardExpiry] = useState('');
  const [paymentCardCvc, setPaymentCardCvc] = useState('');
  const [paymentUpiId, setPaymentUpiId] = useState('');

  // Sync user details with booking form
  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setCustomerName(currentUser.name);
      if (currentUser.address) setCustomerAddress(currentUser.address);
    }
  }, [currentUser]);

  // Auto scroll carousels
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      const el = bannerCarouselRef.current;
      if (el) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 5) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += 240;
        }
      }
    }, 4000);

    const designerInterval = setInterval(() => {
      const el = designerCarouselRef.current;
      if (el) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 5) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += 280;
        }
      }
    }, 5000);

    return () => {
      clearInterval(bannerInterval);
      clearInterval(designerInterval);
    };
  }, []);

  // Categories list with background images
  const categoryCards = [
    { id: 'mens', label: "Men's Wear", desc: "Custom Suits, Shirts, Blazers", img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=300&q=80" },
    { id: 'womens', label: "Women's Wear", desc: "Ethnic Wear, Anarkalis, Salwars", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80" },
    { id: 'kids', label: "Kids Wear", desc: "Children Dresses, Frocks, Uniforms", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80" },
    { id: 'bridal', label: "Bridal Studio", desc: "Royal Lehengas, Heavy Embroidery", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80" },
    { id: 'alterations', label: "Alterations & Fit", desc: "Resize, Repair & Hemming", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" },
    { id: 'bags', label: "Bags & Leather", desc: "Bespoke Totes, Laptop Bags", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80" },
    { id: 'shoes', label: "Shoes & Slippers", desc: "Handcrafted Footwear & Slides", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80" },
    { id: 'seats', label: "Vehicle Seat Covers", desc: "Custom Car & Bike Seat Covers", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80" }
  ];

  // Mock Fashion Designer arrivals
  const newArrivalDesigns = [
    { id: 'des1', title: "Royal Velvet Sherwani", designer: "Sneha Reddy (Expert)", price: 4500, category: 'mens', image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=300&q=80", info: "Premium velvet fabric, zardozi embroidery collar. Stitching includes cotton lining." },
    { id: 'des2', title: "Charcoal Double-Breasted Suit", designer: "Malini Iyer (Expert)", price: 5500, category: 'mens', image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80", info: "Wool blend fabric, classic Italian fit. Includes blazer and trouser stitching." },
    { id: 'des3', title: "Georgette Floral Lehenga", designer: "Sneha Reddy (Expert)", price: 6800, category: 'bridal', image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80", info: "Lightweight summer lehenga with sequin border. Includes matching canvas inner." },
    { id: 'des4', title: "Quilted Leather Car Seat Set", designer: "Rahul Varma (Student)", price: 11000, category: 'seats', image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80", info: "Full interior cover, orthopaedic support layer. Available in tan/black." },
    { id: 'des5', title: "Hand-tooled Leather Laptop Bag", designer: "Rahul Varma (Student)", price: 2900, category: 'bags', image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80", info: "Water-resistant canvas lining, solid brass hardware. Fits 16\" laptops." }
  ];

  // Mock Fabrics for stitch selection
  const mockFabrics = [
    { id: 'fb1', name: 'Premium Egyptian Cotton', price: 350, image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=200&q=80' },
    { id: 'fb2', name: 'Banarasi Raw Silk', price: 950, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80' },
    { id: 'fb3', name: 'Pure Linen Weave', price: 480, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80' }
  ];

  // Filter tailors based on categories
  const filteredTailors = tailors.filter(t => {
    if (t.status !== 'approved') return false;
    
    // Filter by Place search text
    const matchesPlace = t.address.toLowerCase().includes(placeSearchText.toLowerCase()) || 
                         placeSearchText === '';
                         
    // Filter by category selection
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      matchesCategory = t.categories && t.categories.includes(selectedCategory);
    }
    
    return matchesPlace && matchesCategory;
  });

  // Filters for tailors in wizard specifically based on chosen category
  const wizardFilteredTailors = tailors.filter(t => {
    if (t.status !== 'approved') return false;
    // Show tailors matching the wizard category (e.g. seats, bags, mens)
    const matchesCategory = t.categories && t.categories.includes(selectedWizardCategory);
    const matchesPlace = t.address.toLowerCase().includes(placeSearchText.toLowerCase()) || 
                         placeSearchText === '';
    return matchesCategory && matchesPlace;
  });

  // Shopping Cart Logic
  const handleAddToCart = (item, type) => {
    if (!currentUser) {
      if (onLoginRequired) {
        onLoginRequired();
        return;
      }
    }
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, type, qty: 1 }]);
    }
    setCartOpen(true);
  };

  const handleUpdateCartQty = (id, delta) => {
    const updated = cart.map(c => {
      if (c.id === id) {
        const newQty = c.qty + delta;
        return newQty > 0 ? { ...c, qty: newQty } : null;
      }
      return c;
    }).filter(Boolean);
    setCart(updated);
  };

  const handleCheckoutCart = () => {
    if (cart.length === 0) return;
    if (!currentUser) {
      if (onLoginRequired) {
        onLoginRequired();
        return;
      }
    }
    let cost = cart.reduce((a,c) => a + (c.price * c.qty), 0);
    
    // Sync financial ledger
    const updatedLedger = {
      ...ledger,
      fabricSales: (ledger.fabricSales || 0) + cost,
      totalRevenue: ledger.totalRevenue + cost
    };
    setLedger(updatedLedger);

    alert(`Payment Successful! Paid ₹${cost} via UPI. Your materials are dispatched to ${customerAddress}.`);
    setCart([]);
    setCartOpen(false);
  };

  // Sizing AI WebRTC Camera Access & permission
  const startCamera = async () => {
    setAiCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480, facingMode: 'user' } 
      });
      setCameraStream(stream);
      executePgQuery("INSERT INTO audit_logs (event_name, details) VALUES ($1, $2);", ["camera_permission_granted", "navigator.mediaDevices.getUserMedia"]);
      return stream;
    } catch (err) {
      console.error('Camera access failed:', err);
      setAiCameraError('Camera access denied or unavailable. Running in Simulated Web Sensor mode.');
      executePgQuery("INSERT INTO audit_logs (event_name, details) VALUES ($1, $2);", ["camera_permission_denied", err.message]);
      return null;
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Capture snapshots from webcam stream or mock overlays
  const capturePhoto = (stepName) => {
    let photoData = null;
    if (videoRef.current && cameraStream) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, 640, 480);
        
        // Add scanning grids
        ctx.strokeStyle = 'rgba(76,201,240,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 1; i < 4; i++) {
          ctx.moveTo((640 / 4) * i, 0); ctx.lineTo((640 / 4) * i, 480);
          ctx.moveTo(0, (480 / 4) * i); ctx.lineTo(640, (480 / 4) * i);
        }
        ctx.stroke();
        
        photoData = canvas.toDataURL('image/png');
      } catch (err) {
        console.error('Failed to capture frame from canvas:', err);
      }
    }
    
    if (!photoData) {
      photoData = `MOCK_SILHOUETTE_${stepName.toUpperCase()}`;
    }
    
    if (stepName === 'front') {
      setAiPhotoFront(photoData);
      setAiScanStep('capturing_left');
    } else if (stepName === 'left') {
      setAiPhotoLeft(photoData);
      setAiScanStep('capturing_right');
    } else if (stepName === 'right') {
      setAiPhotoRight(photoData);
      setAiScanStep('capturing_back');
    } else if (stepName === 'back') {
      setAiPhotoBack(photoData);
      stopCamera();
      setAiScanStep('input_height');
    }
  };

  // Validation checking loop
  const runValidationAndAnalysis = (heightVal) => {
    setAiScanStep('validating');
    setAiValidationErrors([]);
    
    setTimeout(() => {
      const errors = [];
      if (simBlur) errors.push("⚠️ Blur check failed: Motion or lens distortion detected in front profile.");
      if (simLighting) errors.push("⚠️ Lighting check failed: Under-exposed environment. Stand in a well-lit room.");
      if (simMultiplePeople) errors.push("⚠️ Visibility check failed: Multiple outlines detected. Ensure only one person is in frame.");
      
      if (errors.length > 0) {
        setAiValidationErrors(errors);
        executePgQuery("INSERT INTO audit_logs (event_name, details) VALUES ($1, $2);", ["validation_failed", JSON.stringify(errors)]);
      } else {
        // Validation passed! Estimate age, weight, gender, shape, BMI category
        const isFemale = currentUser?.name?.toLowerCase().includes('priya') || currentUser?.name?.toLowerCase().includes('ananya') || false;
        const estimatedGender = isFemale ? 'Female' : 'Male';
        const estimatedAge = 25 + Math.floor(Math.random() * 8);
        
        // Weight based on height and Athletic/Oval shapes
        const heightM = heightVal / 100;
        let estimatedWeight = 70;
        const shapes = ['Athletic', 'Rectangle', 'Triangle', 'Inverted Triangle', 'Oval'];
        const estimatedShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        let bmi = 22.0;
        if (estimatedShape === 'Athletic') bmi = 23.2;
        else if (estimatedShape === 'Oval') bmi = 27.5;
        else if (estimatedShape === 'Inverted Triangle') bmi = 21.0;
        else if (estimatedShape === 'Triangle') bmi = 24.5;
        
        estimatedWeight = Math.round(bmi * heightM * heightM);
        
        let bmiCategory = 'Normal';
        if (bmi < 18.5) bmiCategory = 'Underweight';
        else if (bmi < 25.0) bmiCategory = 'Normal';
        else if (bmi < 30.0) bmiCategory = 'Overweight';
        else bmiCategory = 'Obese';
        
        setAiGender(estimatedGender);
        setAiAge(estimatedAge);
        setAiWeight(estimatedWeight);
        setAiBodyShape(estimatedShape);
        setAiBmiCategory(bmiCategory);
        
        // Calculate sizing measurements
        const report = getTailoringReport(estimatedGender, heightVal, estimatedWeight, estimatedShape, activeReportCategory);
        setAiMeasurements(report.measurements);
        setAiFitRec(report.recFit);
        
        // Scan for low confidence fields
        const lowFields = Object.entries(report.confidences)
          .filter(([key, val]) => val < 0.80)
          .map(([key, val]) => key);
        setLowConfidenceFields(lowFields);
      }
      setAiScanStep('results');
    }, 3000);
  };

  // Garment sizing formula equations
  const getTailoringReport = (gender, height, weight, bodyShape, category) => {
    const H_in = height / 2.54; 
    let chest = 38.0;
    
    if (gender.toLowerCase() === 'female') {
      chest = Math.round((weight * 0.35 + height * 0.07) * 10) / 10;
    } else {
      chest = Math.round((weight * 0.38 + height * 0.08) * 10) / 10;
    }
    
    let waist = chest - 4;
    if (bodyShape === 'Rectangle') waist = chest - 2;
    else if (bodyShape === 'Triangle') waist = chest + 2;
    else if (bodyShape === 'Inverted Triangle') waist = chest - 5.5;
    else if (bodyShape === 'Athletic') waist = chest - 5;
    else if (bodyShape === 'Oval') waist = chest + 3;
    
    let hip = chest + 2;
    if (gender.toLowerCase() === 'female') hip = chest + 4;
    if (bodyShape === 'Oval') hip = chest + 1.5;
    
    const neck = Math.round((chest * 0.38) * 10) / 10;
    const shoulder = Math.round((chest * 0.44) * 10) / 10;
    const sleeve = Math.round((H_in * 0.36) * 10) / 10;
    const outseam = Math.round((H_in * 0.6) * 10) / 10;
    const inseam = Math.round((outseam * 0.75) * 10) / 10;
    
    let measurements = {};
    let confidences = {};
    
    if (category === 'shirt') {
      measurements = {
        neck: neck,
        shoulder: shoulder,
        chest: chest,
        stomach: Math.round((waist + 1) * 10) / 10,
        seat: Math.round((hip - 1) * 10) / 10,
        sleeve_length: sleeve,
        bicep: Math.round((chest * 0.32) * 10) / 10,
        elbow: Math.round((chest * 0.28) * 10) / 10,
        wrist: Math.round((chest * 0.17) * 10) / 10,
        armhole: Math.round((chest * 0.46) * 10) / 10,
        shirt_length: Math.round((H_in * 0.42) * 10) / 10
      };
    } else if (category === 'pant') {
      measurements = {
        waist: waist,
        seat: hip,
        thigh: Math.round((waist * 0.68) * 10) / 10,
        knee: Math.round((waist * 0.46) * 10) / 10,
        calf: Math.round((waist * 0.4) * 10) / 10,
        bottom: Math.round((waist * 0.38) * 10) / 10,
        front_rise: Math.round((outseam * 0.26) * 10) / 10,
        back_rise: Math.round((outseam * 0.32) * 10) / 10,
        inseam: inseam,
        outseam: outseam
      };
    } else if (category === 'kurta') {
      measurements = {
        neck: neck,
        shoulder: shoulder,
        chest: chest,
        waist: waist,
        hip: hip,
        sleeve: sleeve,
        kurta_length: Math.round((H_in * 0.62) * 10) / 10
      };
    } else if (category === 'blazer') {
      measurements = {
        chest: chest + 2,
        waist: waist + 2,
        hip: hip + 1,
        shoulder: shoulder + 0.5,
        sleeve: sleeve + 0.5,
        armhole: Math.round((chest * 0.48) * 10) / 10,
        jacket_length: Math.round((H_in * 0.43) * 10) / 10
      };
    } else if (category === 'sherwani') {
      measurements = {
        neck: neck + 0.5,
        chest: chest + 3,
        waist: waist + 3,
        hip: hip + 2,
        shoulder: shoulder + 0.8,
        sleeve: sleeve + 0.5,
        sherwani_length: Math.round((H_in * 0.65) * 10) / 10
      };
    } else if (category === 'kurti') {
      measurements = {
        bust: chest,
        waist: waist,
        hip: hip,
        shoulder: shoulder - 0.5,
        sleeve: Math.round((H_in * 0.3) * 10) / 10,
        kurti_length: Math.round((H_in * 0.56) * 10) / 10
      };
    } else if (category === 'blouse') {
      measurements = {
        bust: chest,
        upper_bust: Math.round((chest * 0.96) * 10) / 10,
        under_bust: Math.round((chest * 0.82) * 10) / 10,
        shoulder: shoulder - 1.0,
        armhole: Math.round((chest * 0.44) * 10) / 10,
        sleeve_length: Math.round((H_in * 0.15) * 10) / 10,
        front_neck_depth: 6.5,
        back_neck_depth: 8.0,
        blouse_length: Math.round((H_in * 0.22) * 10) / 10
      };
    }

    Object.keys(measurements).forEach((key, idx) => {
      let conf = 0.90 + Math.round((Math.random() * 0.08) * 100) / 100;
      if (key === 'neck' || key === 'thigh' || key === 'under_bust') {
        conf = 0.75 + Math.round((Math.random() * 0.04) * 100) / 100; 
      }
      confidences[key] = conf;
    });

    let recSize = 'M';
    if (category === 'pant') {
      if (waist <= 29) recSize = '28';
      else if (waist <= 31) recSize = '30';
      else if (waist <= 33) recSize = '32';
      else if (waist <= 35) recSize = '34';
      else if (waist <= 37) recSize = '36';
      else recSize = '38';
    } else {
      if (chest <= 36) recSize = 'S';
      else if (chest <= 40) recSize = 'M';
      else if (chest <= 44) recSize = 'L';
      else if (chest <= 48) recSize = 'XL';
      else recSize = 'XXL';
    }

    let recFit = 'Regular Fit';
    if (bodyShape === 'Athletic' || bodyShape === 'Inverted Triangle') recFit = 'Slim Fit';
    else if (bodyShape === 'Oval') recFit = 'Relaxed Fit';
    else recFit = 'Regular Fit';

    return { measurements, confidences, recSize, recFit };
  };

  // Export measurements to simulated PostgreSQL database tables
  const handleExportToPostgres = () => {
    if (!currentUser) {
      if (onLoginRequired) {
        onLoginRequired();
        return;
      }
    }
    const custId = currentUser?.id || 'cust-102';
    const custName = currentUser?.name || customerName;
    
    // SQL Executions
    const sqlCust = `INSERT INTO customers (customer_id, name, email, phone) VALUES ($1, $2, $3, $4);`;
    executePgQuery(sqlCust, [custId, custName, currentUser?.email || 'priyanka@gmail.com', currentUser?.phone || '9876543211']);
    
    const sqlProfile = `INSERT INTO body_profiles (customer_id, gender, age, weight, body_shape, recommended_fit, height, bmi_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    executePgQuery(sqlProfile, [custId, aiGender, aiAge, aiWeight, aiBodyShape, aiFitRec, aiHeight, aiBmiCategory]);
    
    const sqlMeas = `INSERT INTO measurements (customer_id, category, measurements_json, confidence_score) VALUES ($1, $2, $3, $4);`;
    executePgQuery(sqlMeas, [custId, activeReportCategory, aiMeasurements, aiConfidence]);
    
    const sqlHist = `INSERT INTO measurement_history (customer_id, category, measurements_json, confidence_score, body_shape) VALUES ($1, $2, $3, $4, $5);`;
    executePgQuery(sqlHist, [custId, activeReportCategory, aiMeasurements, aiConfidence, aiBodyShape]);
    
    // Mapped properties for standard order measurements structure
    const mapped = {
      chest: aiMeasurements.chest || aiMeasurements.bust || 36.0,
      waist: aiMeasurements.waist || 28.0,
      shoulder: aiMeasurements.shoulder || 14.5,
      length: aiMeasurements.shirt_length || aiMeasurements.kurta_length || aiMeasurements.outseam || aiMeasurements.blouse_length || 15.0,
      collar: aiMeasurements.neck || 0,
      sleeves: aiMeasurements.sleeve_length || aiMeasurements.sleeve || 10.0
    };
    
    setAiScanMeasurements(mapped);
    setAiScanStep('results_complete');
    
    // Query database tables immediately to refresh console viewer
    queryConsoleTable(activeSqlTable);
    alert('SQL TRANSACTION SUCCESSFUL! Data stored in PostgreSQL tables.');
  };

  const queryConsoleTable = (tableName) => {
    const res = executePgQuery(`SELECT * FROM ${tableName};`);
    setDbTableRows(res.rows || []);
  };

  const videoRef = React.useRef(null);
  const setVideoRef = React.useCallback((node) => {
    videoRef.current = node;
    if (node && cameraStream) {
      node.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // Clean up camera on unmount
  React.useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // Auto-capture countdown handler
  React.useEffect(() => {
    let timer;
    if (aiScanStep.startsWith('capturing_')) {
      setCountdown(3);
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            const side = aiScanStep.split('_')[1];
            capturePhoto(side);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [aiScanStep]);

  // Sub-component: 3D SMPL wireframe body mesh simulator
  const SmplWireframe = ({ chest, waist, hip, height, bodyShape }) => {
    const canvasRef = React.useRef(null);
    
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let animationId;
      let angle = 0;
      
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;
        const h = canvas.height;
        
        ctx.strokeStyle = '#4cc9f0'; 
        ctx.lineWidth = 1.2;
        
        const rings = [
          { y: 55, radiusX: (chest * 0.17) * 1.8, radiusZ: (chest * 0.11) * 1.8 },
          { y: 25, radiusX: (chest * 0.16) * 1.8, radiusZ: (chest * 0.11) * 1.8 },
          { y: -8, radiusX: (waist * 0.15) * 1.8, radiusZ: (waist * 0.11) * 1.8 },
          { y: -38, radiusX: (hip * 0.17) * 1.8, radiusZ: (hip * 0.13) * 1.8 }
        ];
        
        const heightScale = height / 175;
        const points = [];
        
        rings.forEach((ring) => {
          const ringPoints = [];
          const yVal = ring.y * heightScale;
          
          for (let i = 0; i < 8; i++) {
            const theta = (i / 8) * Math.PI * 2;
            const lx = Math.cos(theta) * ring.radiusX;
            const lz = Math.sin(theta) * ring.radiusZ;
            
            const rx = lx * Math.cos(angle) - lz * Math.sin(angle);
            const rz = lx * Math.sin(angle) + lz * Math.cos(angle);
            
            const distance = 120;
            const scale = 220;
            const projX = w / 2 + (rx * scale) / (rz + distance);
            const projY = h / 2 - (yVal * scale) / (rz + distance);
            
            ringPoints.push({ x: projX, y: projY, z: rz });
          }
          points.push(ringPoints);
        });
        
        points.forEach((ringPoints) => {
          ctx.beginPath();
          ctx.moveTo(ringPoints[0].x, ringPoints[0].y);
          for (let i = 1; i < 8; i++) {
            ctx.lineTo(ringPoints[i].x, ringPoints[i].y);
          }
          ctx.closePath();
          ctx.stroke();
        });
        
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.moveTo(points[0][i].x, points[0][i].y);
          for (let j = 1; j < points.length; j++) {
            ctx.lineTo(points[j][i].x, points[j][i].y);
          }
          ctx.stroke();
        }
        
        ctx.strokeStyle = 'rgba(76,201,240,0.15)';
        ctx.beginPath();
        ctx.moveTo(points[0][0].x, points[0][0].y);
        ctx.lineTo(points[3][4].x, points[3][4].y);
        ctx.moveTo(points[0][4].x, points[0][4].y);
        ctx.lineTo(points[3][0].x, points[3][0].y);
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.beginPath();
        for (let k = -2; k <= 2; k++) {
          ctx.moveTo(w / 2 - 50, h - 25 + k * 8);
          ctx.lineTo(w / 2 + 50, h - 25 + k * 8);
          ctx.moveTo(w / 2 + k * 20, h - 40);
          ctx.lineTo(w / 2 + k * 20, h - 10);
        }
        ctx.stroke();
        
        angle += 0.025;
        animationId = requestAnimationFrame(render);
      };
      
      render();
      return () => cancelAnimationFrame(animationId);
    }, [chest, waist, hip, height, bodyShape]);
    
    return (
      <canvas 
        ref={canvasRef} 
        width={160} 
        height={230} 
        style={{ 
          background: 'rgba(5,5,10,0.5)', 
          borderRadius: '8px', 
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'block',
          margin: '0 auto'
        }} 
      />
    );
  };

  // Sub-component: Pose Landmark overlay drawer
  const PoseLandmarksCanvas = ({ photoFront }) => {
    const canvasRef = React.useRef(null);
    
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let animationId;
      let scanY = 0;
      let direction = 1;
      
      const img = new Image();
      const isMock = typeof photoFront === 'string' && photoFront.startsWith('MOCK_');
      
      if (!isMock) {
        img.src = photoFront;
      }
      
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;
        const h = canvas.height;
        
        if (!isMock && img.complete) {
          ctx.drawImage(img, 0, 0, w, h);
        } else {
          ctx.fillStyle = '#0f0d1e';
          ctx.fillRect(0, 0, w, h);
          
          ctx.strokeStyle = 'rgba(255,255,255,0.02)';
          ctx.lineWidth = 1;
          for (let i = 0; i < w; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0); ctx.lineTo(i, h);
            ctx.stroke();
          }
          
          ctx.strokeStyle = '#f72585';
          ctx.fillStyle = 'rgba(247,37,133,0.05)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(w / 2, 40);
          ctx.bezierCurveTo(w / 2 - 15, 40, w / 2 - 15, 60, w / 2 - 15, 70);
          ctx.lineTo(w / 2 - 40, 85);
          ctx.lineTo(w / 2 - 45, 140);
          ctx.lineTo(w / 2 - 30, 140);
          ctx.lineTo(w / 2 - 25, 220);
          ctx.lineTo(w / 2 - 20, 310);
          ctx.lineTo(w / 2 + 20, 310);
          ctx.lineTo(w / 2 + 25, 220);
          ctx.lineTo(w / 2 + 30, 140);
          ctx.lineTo(w / 2 + 45, 140);
          ctx.lineTo(w / 2 + 40, 85);
          ctx.lineTo(w / 2 + 15, 70);
          ctx.bezierCurveTo(w / 2 + 15, 60, w / 2 + 15, 40, w / 2, 40);
          ctx.fill();
          ctx.stroke();
        }
        
        const kp = {
          head: { x: w * 0.5, y: h * 0.15 },
          shL: { x: w * 0.38, y: h * 0.28 },
          shR: { x: w * 0.62, y: h * 0.28 },
          elL: { x: w * 0.33, y: h * 0.44 },
          elR: { x: w * 0.67, y: h * 0.44 },
          wrL: { x: w * 0.28, y: h * 0.60 },
          wrR: { x: w * 0.72, y: h * 0.60 },
          hipL: { x: w * 0.42, y: h * 0.55 },
          hipR: { x: w * 0.58, y: h * 0.55 },
          knL: { x: w * 0.41, y: h * 0.74 },
          knR: { x: w * 0.59, y: h * 0.74 },
          anL: { x: w * 0.42, y: h * 0.90 },
          anR: { x: w * 0.58, y: h * 0.90 }
        };
        
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(52,211,153,0.6)';
        ctx.shadowBlur = 6;
        
        const drawLine = (p1, p2) => {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        };
        
        drawLine(kp.shL, kp.shR);
        drawLine(kp.shL, kp.elL); drawLine(kp.elL, kp.wrL);
        drawLine(kp.shR, kp.elR); drawLine(kp.elR, kp.wrR);
        drawLine(kp.shL, kp.hipL); drawLine(kp.shR, kp.hipR);
        drawLine(kp.hipL, kp.hipR);
        drawLine(kp.hipL, kp.knL); drawLine(kp.knL, kp.anL);
        drawLine(kp.hipR, kp.knR); drawLine(kp.knR, kp.anR);
        
        ctx.fillStyle = '#10b981';
        Object.entries(kp).forEach(([name, pt]) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
        
        ctx.strokeStyle = 'rgba(52,211,153,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.15, 24, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(76,201,240,0.8)';
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(76,201,240,0.8)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(w, scanY);
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        scanY += 2.2 * direction;
        if (scanY > h || scanY < 0) {
          direction *= -1;
        }
        
        animationId = requestAnimationFrame(render);
      };
      
      render();
      return () => cancelAnimationFrame(animationId);
    }, [photoFront]);
    
    return (
      <canvas 
        ref={canvasRef} 
        width={320} 
        height={240} 
        style={{ 
          background: '#05040a', 
          borderRadius: '12px', 
          border: '1.5px solid var(--border-color)',
          display: 'block',
          margin: '0 auto',
          boxShadow: '0 0 15px rgba(247,37,133,0.1)'
        }} 
      />
    );
  };

  // Sub-component: Live Scanner telemetry HUD overlay
  const LiveScannerCanvas = ({ isActive }) => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let animationId;
      let scanY = 0;
      let direction = 1;
      let frame = 0;

      const render = () => {
        if (!canvas) return;
        frame++;
        
        const w = canvas.width;  // 320
        const h = canvas.height; // 420
        ctx.clearRect(0, 0, w, h);

        // Draw HUD corner brackets
        ctx.strokeStyle = 'rgba(76, 201, 240, 0.7)';
        ctx.lineWidth = 2;
        const pad = 12;
        const len = 15;
        
        // Top-left
        ctx.beginPath(); ctx.moveTo(pad, pad + len); ctx.lineTo(pad, pad); ctx.lineTo(pad + len, pad); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(w - pad, pad + len); ctx.lineTo(w - pad, pad); ctx.lineTo(w - pad - len, pad); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(pad, h - pad - len); ctx.lineTo(pad, h - pad); ctx.lineTo(pad + len, h - pad); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(w - pad, h - pad - len); ctx.lineTo(w - pad, h - pad); ctx.lineTo(w - pad - len, h - pad); ctx.stroke();

        // Dynamic joint offsets for active computer-vision tracking simulator (proportional to 320x420)
        const jitter = (speed, amp) => Math.sin(frame * speed) * amp;
        const kp = {
          head: { x: w * 0.5 + jitter(0.08, 1.2), y: h * 0.15 + jitter(0.05, 0.9) },
          neck: { x: w * 0.5 + jitter(0.07, 0.7), y: h * 0.22 },
          shL: { x: w * 0.35 + jitter(0.05, 1.5), y: h * 0.26 + jitter(0.04, 1.0) },
          shR: { x: w * 0.65 + jitter(0.06, 1.5), y: h * 0.26 + jitter(0.05, 1.0) },
          elL: { x: w * 0.28 + jitter(0.09, 2.0), y: h * 0.44 + jitter(0.08, 1.5) },
          elR: { x: w * 0.72 + jitter(0.07, 2.0), y: h * 0.44 + jitter(0.09, 1.5) },
          wrL: { x: w * 0.22 + jitter(0.12, 2.5), y: h * 0.62 + jitter(0.11, 2.0) },
          wrR: { x: w * 0.78 + jitter(0.10, 2.5), y: h * 0.62 + jitter(0.13, 2.0) },
          hipL: { x: w * 0.38 + jitter(0.04, 0.8), y: h * 0.55 },
          hipR: { x: w * 0.62 + jitter(0.05, 0.8), y: h * 0.55 },
          knL: { x: w * 0.37 + jitter(0.06, 1.2), y: h * 0.75 + jitter(0.05, 1.0) },
          knR: { x: w * 0.63 + jitter(0.07, 1.2), y: h * 0.75 + jitter(0.04, 1.0) },
          anL: { x: w * 0.38 + jitter(0.03, 0.5), y: h * 0.92 },
          anR: { x: w * 0.62 + jitter(0.04, 0.5), y: h * 0.92 }
        };

        // Draw skeletal connections
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.65)';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(52, 211, 153, 0.4)';
        ctx.shadowBlur = 6;

        const drawLine = (p1, p2) => {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        };

        drawLine(kp.head, kp.neck);
        drawLine(kp.neck, { x: (kp.hipL.x + kp.hipR.x)/2, y: (kp.hipL.y + kp.hipR.y)/2 });
        drawLine(kp.shL, kp.shR);
        drawLine(kp.shL, kp.elL); drawLine(kp.elL, kp.wrL);
        drawLine(kp.shR, kp.elR); drawLine(kp.elR, kp.wrR);
        drawLine(kp.hipL, kp.hipR);
        drawLine(kp.hipL, kp.knL); drawLine(kp.knL, kp.anL);
        drawLine(kp.hipR, kp.knR); drawLine(kp.knR, kp.anR);

        // Draw joint nodes
        ctx.fillStyle = '#10b981';
        Object.values(kp).forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
          ctx.fill();
        });

        // Head tracking bounds
        ctx.strokeStyle = 'rgba(76, 201, 240, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(kp.head.x, kp.head.y, 20, 0, Math.PI * 2);
        ctx.stroke();

        // Laser scanner sweeping bar
        ctx.strokeStyle = 'rgba(247, 37, 133, 0.8)';
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(247, 37, 133, 0.8)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(w, scanY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        scanY += 2.5 * direction;
        if (scanY > h || scanY < 0) direction *= -1;

        // HUD Text Metrics (compact size for 320x420)
        ctx.fillStyle = 'rgba(76, 201, 240, 0.9)';
        ctx.font = 'bold 8.5px monospace';
        ctx.fillText("AI ENGINE: ACTIVE", pad + 6, h - pad - 50);
        ctx.fillText("MODEL: MEDIAPIPE L3", pad + 6, h - pad - 39);
        ctx.fillText(`DEPTH: ${(2.24 + Math.sin(frame * 0.03) * 0.08).toFixed(2)}m`, pad + 6, h - pad - 28);
        ctx.fillText(`STABILITY: ${(98.5 + Math.sin(frame * 0.06) * 0.4).toFixed(1)}%`, pad + 6, h - pad - 17);

        ctx.fillText("ALIGN: OK", w - pad - 60, h - pad - 28);
        ctx.fillText("FPS: 30 / 3:4", w - pad - 72, h - pad - 17);

        if (isActive) {
          animationId = requestAnimationFrame(render);
        }
      };

      render();

      return () => {
        if (animationId) cancelAnimationFrame(animationId);
      };
    }, [isActive]);

    return (
      <canvas
        ref={canvasRef}
        width={320}
        height={420}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5
        }}
      />
    );
  };

  // Wizard Navigation
  const startWizard = (catId, design = null) => {
    if (!currentUser) {
      if (onLoginRequired) {
        onLoginRequired();
        return;
      }
    }
    setSelectedWizardCategory(catId);
    setSelectedDesign(design);
    setAddFabric(false);
    setSelectedFabric(null);
    setWizardStep(1);
    setWizardOpen(true);
    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
  };

  const nextStep = () => {
    if (wizardStep === 1) {
      setWizardStep(2);
    } else if (wizardStep === 2) {
      setWizardStep(3);
    } else if (wizardStep === 3) {
      if (!selectedTailor) {
        alert('Please select a tailor partner to continue.');
        return;
      }
      // Start negotiation loading simulation
      setWizardStep(4);
      setNegotiatingState('sending');
      setTimeout(() => {
        setNegotiatingState('reviewing');
      }, 1500);
      setTimeout(() => {
        // Calculate proposed price
        const baseStitching = selectedDesign ? selectedDesign.price : 1200;
        const fabricCost = addFabric && selectedFabric ? selectedFabric.price : 0;
        const addOnMeasure = measurementOption === 'expert' ? 100 : 0;
        const addOnDeliver = deliveryType === 'student' ? 50 : 0;
        
        // Mock negotiation adjust (adds random small markup/discount representing tailor complexity check)
        const customAdjustment = selectedWizardCategory === 'seats' ? 400 : 150; 
        setProposedPrice(baseStitching + fabricCost + addOnMeasure + addOnDeliver + customAdjustment);
        setNegotiatingState('proposed');
      }, 3500);
    } else if (wizardStep === 4) {
      setWizardStep(5);
    }
  };

  const prevStep = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
      setNegotiatingState('idle');
    }
  };

  const submitWizardBooking = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card' && (!paymentCardNumber || !paymentCardExpiry || !paymentCardCvc)) {
      alert('Please fill out card checkout details.');
      return;
    }
    if (paymentMethod === 'upi' && !paymentUpiId) {
      alert('Please enter your UPI ID.');
      return;
    }

    let activeMeasurements = { chest: 0, waist: 0, shoulder: 0, length: 0, collar: 0, sleeves: 0 };
    let statusText = 'placed';

    if (measurementOption === 'ai' && aiScanMeasurements) {
      activeMeasurements = aiScanMeasurements;
      statusText = 'measurement_completed';
    } else if (measurementOption === 'manual') {
      activeMeasurements = {
        chest: parseFloat(selfMeasurements.chest) || 0,
        waist: parseFloat(selfMeasurements.waist) || 0,
        shoulder: parseFloat(selfMeasurements.shoulder) || 0,
        length: parseFloat(selfMeasurements.length) || 0,
        collar: parseFloat(selfMeasurements.collar) || 0,
        sleeves: parseFloat(selfMeasurements.sleeves) || 0
      };
      statusText = 'measurement_completed';
    }

    // Platform gets 15% commission
    const commission = Math.round(proposedPrice * 0.15);

    const newOrder = {
      id: 'ord-' + Math.floor(Math.random() * 90000 + 10000),
      customerName,
      customerAddress,
      tailorId: selectedTailor.id,
      tailorName: selectedTailor.name,
      serviceName: selectedDesign ? selectedDesign.title : `Custom ${selectedWizardCategory.toUpperCase()} Stitching`,
      price: proposedPrice,
      status: statusText,
      date: bookingDate,
      timeSlot: bookingTime,
      measurementType: measurementOption,
      deliveryType,
      measurements: activeMeasurements,
      notes: `${notes}${addFabric ? ` | Fabric Purchased: ${selectedFabric.name}` : ''}${measurementOption === 'expert' ? ` | Trained ${technicianGender === 'male' ? 'Male' : 'Female'} tech requested` : ''}`,
      paymentStatus: 'paid',
      paymentDetails: {
        method: paymentMethod,
        cardInfo: paymentMethod === 'card' ? `***${paymentCardNumber.slice(-4)}` : '',
        upiId: paymentMethod === 'upi' ? paymentUpiId : ''
      }
    };

    // Add to global state
    addOrder(newOrder);
    setLedger({
      ...ledger,
      platformCommission: (ledger.platformCommission || 0) + commission,
      totalRevenue: ledger.totalRevenue + commission
    });

    setWizardOpen(false);
    alert(`Booking Confirmed! Order placed successfully. Tailor: ${selectedTailor.name}. Total Paid: ₹${proposedPrice}.`);
  };

  // Accelerated Timer logic for active orders
  const orderStatesList = [
    'placed', 'tailor_assigned', 'pickup_scheduled', 'picked_up', 
    'measurement_completed', 'stitching_started', 'stitching_completed', 
    'quality_check', 'delivering', 'delivered', 'trial_period', 'closed'
  ];

  const getStatusIndex = (status) => {
    return orderStatesList.indexOf(status);
  };

  const handleAdvanceStep = (orderId, currentStatus) => {
    const nextIdx = orderStatesList.indexOf(currentStatus) + 1;
    if (nextIdx < orderStatesList.length) {
      const nextStatus = orderStatesList[nextIdx];
      updateOrderStatus(orderId, nextStatus);
      
      if (nextStatus === 'trial_period') {
        setTimerState(prev => ({ ...prev, [orderId]: 900 })); // 15 minutes = 900 seconds
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerState(prev => {
        const updated = { ...prev };
        let changed = false;
        Object.keys(updated).forEach(id => {
          if (updated[id] > 0) {
            // 1 real second = 30 simulated seconds
            updated[id] = Math.max(0, updated[id] - 30);
            changed = true;
          }
        });
        return changed ? updated : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimerValue = (secondsLeft) => {
    if (secondsLeft === undefined) return '';
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Map refs and states
  const mapContainerRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);
  const tailorsMapRef = React.useRef(null);
  const tailorsMapInstanceRef = React.useRef(null);
  const [mapFilter, setMapFilter] = useState('all'); // 'all' | 'bridal' | 'alterations' | 'premium' | 'budget'

  useEffect(() => {
    if (activeHub !== 'tailors' || !window.L || wizardOpen) return;

    const container = tailorsMapRef.current;
    if (!container) return;

    // Clean up previous instance
    if (tailorsMapInstanceRef.current) {
      try {
        tailorsMapInstanceRef.current.remove();
      } catch (e) {
        console.error("Error removing tailors map instance:", e);
      }
      tailorsMapInstanceRef.current = null;
    }
    if (container._leaflet_id) {
      delete container._leaflet_id;
    }

    // Geocoder dictionary for search queries
    const LOCALITY_COORDS = {
      'hsr': [12.9141, 77.6413],
      'hsr layout': [12.9141, 77.6413],
      'koramangala': [12.9348, 77.6189],
      'btm': [12.9166, 77.6101],
      'btm layout': [12.9166, 77.6101],
      'jayanagar': [12.9307, 77.5840],
      'indiranagar': [12.9719, 77.6412],
      'whitefield': [12.9698, 77.7500],
      'bangalore': [12.9716, 77.5946],
      'bengaluru': [12.9716, 77.5946],
      'chennai': [13.0827, 80.2707],
      'mumbai': [19.0760, 72.8777],
      'delhi': [28.6139, 77.2090],
      'hyderabad': [17.3850, 78.4867],
    };

    let centerCoords = [12.9141, 77.6413]; // Default HSR
    if (gpsCoords && searchLocationName.includes('GPS')) {
      centerCoords = [gpsCoords.lat, gpsCoords.lng];
    } else {
      const normalizedSearch = searchLocationName.toLowerCase().split(',')[0].trim();
      if (LOCALITY_COORDS[normalizedSearch]) {
        centerCoords = LOCALITY_COORDS[normalizedSearch];
      } else {
        const matchedKey = Object.keys(LOCALITY_COORDS).find(key => normalizedSearch.includes(key));
        if (matchedKey) {
          centerCoords = LOCALITY_COORDS[matchedKey];
        }
      }
    }

    // Initialize map
    const map = window.L.map(container).setView(centerCoords, 14);
    tailorsMapInstanceRef.current = map;

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Circle showing search radius
    window.L.circle(centerCoords, {
      color: '#f72585',
      fillColor: '#f72585',
      fillOpacity: 0.08,
      radius: filterRadius * 1000
    }).addTo(map);

    const tailorSvgIcon = window.L.divIcon({
      html: `<div style="background: #f72585; width: 22px; height: 22px; border: 2.5px solid #fff; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="width: 7px; height: 7px; background: #fff; border-radius: 50%; transform: rotate(45deg);"></div></div>`,
      className: 'custom-tailor-marker',
      iconSize: [22, 22],
      iconAnchor: [11, 22]
    });

    sortedNearByTailors.forEach(t => {
      const lat = t.lat || (centerCoords[0] + (Math.random() - 0.5) * 0.02);
      const lng = t.lng || (centerCoords[1] + (Math.random() - 0.5) * 0.02);
      const marker = window.L.marker([lat, lng], { icon: tailorSvgIcon }).addTo(map);
      marker.bindPopup(`
        <div style="color: #1a2238; font-family: sans-serif; font-size: 0.8rem; min-width: 140px;">
          <strong style="color: #f72585;">${t.name}</strong><br/>
          Rating: ⭐${t.rating || '4.5'} (${t.reviews} reviews)<br/>
          Distance: ${t.computedDistance.toFixed(1)} km<br/>
          <button class="btn btn-primary" style="margin-top:8px; padding: 4px 8px; font-size: 0.7rem; width: 100%; text-align: center; background: #f72585; border: none; color: #fff; border-radius: 4px; font-weight: bold; cursor: pointer;" onclick="window.startStitchingFromTailorNearYou('${t.id}')">View Details</button>
        </div>
      `);
    });

    window.startStitchingFromTailorNearYou = (tailorId) => {
      const selectedT = sortedNearByTailors.find(t => t.id === tailorId);
      if (selectedT) {
        startWizardWithTailor(selectedT);
      }
    };

    return () => {
      if (tailorsMapInstanceRef.current) {
        try {
          tailorsMapInstanceRef.current.remove();
        } catch (e) {
          console.error("Cleanup tailors map error:", e);
        }
        tailorsMapInstanceRef.current = null;
      }
    };
  }, [activeHub, searchLocationName, sortedNearByTailors, filterRadius, wizardOpen]);


  useEffect(() => {
    if (activeHub !== 'home' || !window.L || wizardOpen) return;
    
    const container = mapContainerRef.current;
    if (!container) return;

    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (e) {
        console.error("Error removing map instance:", e);
      }
      mapInstanceRef.current = null;
    }
    if (container._leaflet_id) {
      delete container._leaflet_id;
    }

    const centerLat = 12.9716;
    const centerLng = 77.5946;

    const map = window.L.map(container).setView([centerLat, centerLng], 12);
    mapInstanceRef.current = map;

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const mapTailors = tailors.filter(t => {
      if (t.status !== 'approved') return false;
      if (mapFilter === 'bridal') return t.categories?.includes('bridal') || t.specialties?.includes('bridal') || t.name.toLowerCase().includes('boutique') || t.name.toLowerCase().includes('bridal');
      if (mapFilter === 'alterations') return t.categories?.includes('alterations') || t.name.toLowerCase().includes('alter') || t.name.toLowerCase().includes('tailor');
      if (mapFilter === 'premium') return t.rating >= 4.8;
      if (mapFilter === 'budget') return t.rating < 4.8;
      return true;
    });

    const tailorSvgIcon = window.L.divIcon({
      html: `<div style="background: #f72585; width: 22px; height: 22px; border: 2.5px solid #fff; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="width: 7px; height: 7px; background: #fff; border-radius: 50%; transform: rotate(45deg);"></div></div>`,
      className: 'custom-tailor-marker',
      iconSize: [22, 22],
      iconAnchor: [11, 22]
    });

    mapTailors.forEach(t => {
      const lat = t.lat || (centerLat + (Math.random() - 0.5) * 0.05);
      const lng = t.lng || (centerLng + (Math.random() - 0.5) * 0.05);
      const marker = window.L.marker([lat, lng], { icon: tailorSvgIcon }).addTo(map);
      marker.bindPopup(`
        <div style="color: #fff; font-family: sans-serif; font-size: 0.8rem; min-width: 140px;">
          <strong style="color: var(--accent);">${t.name}</strong><br/>
          Rating: ⭐${t.rating || '4.5'}<br/>
          Specialty: ${t.specialties ? t.specialties.join(', ') : 'Custom Sewing'}<br/>
          <button class="btn btn-primary" style="margin-top:8px; padding: 2px 8px; font-size: 0.7rem; width: 100%; text-align: center;" onclick="window.startStitchingFromMap('${t.id}')">Book Tailor</button>
        </div>
      `);
    });

    window.startStitchingFromMap = (tailorId) => {
      const selectedT = tailors.find(t => t.id === tailorId);
      if (selectedT) {
        setActiveHub('tailors');
        setSelectedCategory('mens');
        setWizardOpen(true);
        setWizardStep(3);
        setSelectedTailor(selectedT);
      }
    };

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
  }, [activeHub, mapFilter, tailors, wizardOpen]);

  // Group completed orders for History Tab
  const completedOrders = orders.filter(o => o.status === 'closed');
  const activeOrders = orders.filter(o => o.status !== 'closed');

  return (
    <>
      {/* CUSTOM CUSTOMER STICKY HEADER */}
      <header className="top-nav">
        <div className="logo" onClick={() => {
          if (!currentUser && setRole) {
            setRole('landing');
          } else {
            setActiveHub('home');
            setWizardOpen(false);
          }
        }} style={{ cursor: 'pointer' }}>
          <Scissors size={24} style={{ color: 'var(--primary)', transform: 'rotate(-45deg)' }} />
          <span className="logo-text">StitchBee</span>
        </div>

        {/* Center Nav Menu */}
        <div className="role-switcher">
          <button 
            className={`role-btn ${activeHub === 'home' ? 'active' : ''}`}
            onClick={() => {
              if (!currentUser && setRole) {
                setRole('landing');
              } else {
                setActiveHub('home');
                setWizardOpen(false);
              }
            }}
          >
            Home
          </button>
          
          {/* Services Dropdown */}
          <div className="nav-item-relative">
            <button 
              className={`role-btn ${wizardOpen ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setServicesDropdownOpen(!servicesDropdownOpen);
                setNotificationDropdownOpen(false);
                setProfileDropdownOpen(false);
              }}
            >
              Services ▼
            </button>
            
            <ul className={`nav-dropdown-menu services-dropdown-menu ${servicesDropdownOpen ? 'show' : ''}`} style={{ minWidth: '200px' }}>
              {categoryCards.map(cat => (
                <li 
                  key={cat.id}
                  className="dropdown-item"
                  onClick={() => {
                    setActiveHub('category-landing');
                    setSelectedCategory(cat.id);
                    setWizardOpen(false);
                    setServicesDropdownOpen(false);
                    if (setCustomerCategory) setCustomerCategory(cat.id);
                    if (setCustomerHub) setCustomerHub('category-landing');
                  }}
                >
                  {cat.label}
                </li>
              ))}
            </ul>
          </div>

          <button 
            className={`role-btn ${activeHub === 'fabrics' ? 'active' : ''}`}
            onClick={() => { 
              setActiveHub('fabrics'); 
              setWizardOpen(false); 
              if (setCustomerHub) setCustomerHub('fabrics');
            }}
          >
            Fabric Marketplace
          </button>
          
          <button 
            className={`role-btn ${activeHub === 'sarees' ? 'active' : ''}`}
            onClick={() => { 
              setActiveHub('sarees'); 
              setWizardOpen(false); 
              if (setCustomerHub) setCustomerHub('sarees');
            }}
          >
            Ready Designs
          </button>

          <button 
            className={`role-btn ${activeHub === 'designers' ? 'active' : ''}`}
            onClick={() => { 
              setActiveHub('designers'); 
              setWizardOpen(false); 
              if (setCustomerHub) setCustomerHub('designers');
            }}
          >
            Designer Studio
          </button>

          <button 
            className={`role-btn ${activeHub === 'tailors' && !wizardOpen ? 'active' : ''}`}
            onClick={() => { 
              setActiveHub('tailors'); 
              setWizardOpen(false); 
              if (setCustomerHub) setCustomerHub('tailors');
            }}
          >
            Tailors Near You
          </button>

          <button 
            className={`role-btn ${activeHub === 'history' ? 'active' : ''}`}
            onClick={() => { 
              setActiveHub('history'); 
              setWizardOpen(false); 
              if (setCustomerHub) setCustomerHub('history');
            }}
          >
            My Orders
          </button>

          <button 
            className={`role-btn ${activeHub === 'wishlist' ? 'active' : ''}`}
            onClick={() => { 
              if (!currentUser) {
                if (onLoginRequired) onLoginRequired();
                return;
              }
              setActiveHub('wishlist');
              setWizardOpen(false);
              if (setCustomerHub) setCustomerHub('wishlist');
            }}
          >
            Wishlist
          </button>
        </div>

        {/* Right Actions */}
        <div className="top-nav-auth" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search bar */}
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search..."
              className="customer-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '30px', height: '36px', borderRadius: '18px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.03)', color: 'inherit' }}
            />
          </div>

          {/* Theme switcher */}
          <button 
            className="btn btn-secondary" 
            onClick={() => setTheme && setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{ padding: '8px', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.03)' }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={16} style={{ color: '#fbbf24' }} /> : <Moon size={16} style={{ color: 'var(--primary)' }} />}
          </button>

          {/* Notifications Icon with badge */}
          <div className="nav-item-relative">
            <button 
              className="role-btn" 
              style={{ padding: '8px', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
              onClick={(e) => {
                e.stopPropagation();
                setNotificationDropdownOpen(!notificationDropdownOpen);
                setServicesDropdownOpen(false);
                setProfileDropdownOpen(false);
              }}
            >
              <Bell size={18} />
              {notifications.some(n => n.unread) && <span className="notif-badge-dot" style={{ top: '6px', right: '6px' }} />}
            </button>
            
            <ul className={`nav-dropdown-menu ${notificationDropdownOpen ? 'show' : ''}`} style={{ right: 0, left: 'auto', width: '320px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>Notifications</span>
                <button 
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.7rem', cursor: 'pointer' }}
                  onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                >
                  Mark all read
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
                {notifications.map(n => (
                  <li 
                    key={n.id}
                    className="dropdown-item"
                    style={{ padding: '8px', borderRadius: '6px', background: n.unread ? 'rgba(247, 37, 133, 0.05)' : 'transparent', border: '1px solid var(--border-color)', fontSize: '0.75rem', display: 'block', whiteSpace: 'normal', cursor: 'pointer' }}
                    onClick={() => setNotifications(notifications.map(item => item.id === n.id ? { ...item, unread: false } : item))}
                  >
                    <div>{n.text}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '4px' }}>{n.time}</div>
                  </li>
                ))}
              </div>
            </ul>
          </div>

          {/* Cart Icon with badge */}
          <button className="role-btn" style={{ padding: '8px', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setCartOpen(true)}>
            <ShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="notif-badge-dot" style={{ top: '6px', right: '6px', background: 'var(--accent)' }} />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="nav-item-relative">
            <div 
              className="user-profile-chip" 
              onClick={(e) => {
                e.stopPropagation();
                if (!currentUser) {
                  if (onLoginRequired) onLoginRequired();
                } else {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationDropdownOpen(false);
                  setServicesDropdownOpen(false);
                }
              }} 
              style={{ cursor: 'pointer' }}
            >
              <div className="user-avatar">{currentUser?.name ? currentUser.name.charAt(0) : 'G'}</div>
              <span>{currentUser?.name || 'Guest'} {currentUser ? '▼' : ''}</span>
            </div>
            
            {currentUser && (
              <ul className={`nav-dropdown-menu ${profileDropdownOpen ? 'show' : ''}`} style={{ right: 0, left: 'auto', width: '220px' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: '6px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{currentUser.email}</div>
                </div>
              
              <li 
                className="dropdown-item"
                onClick={() => {
                  setIsMyProfileOpen(true);
                  setProfileDropdownOpen(false);
                }}
              >
                <User size={14} style={{ marginRight: '8px', display: 'inline' }} /> My Profile
              </li>
              
              <li 
                className="dropdown-item"
                onClick={() => {
                  setActiveHub('home');
                  setWizardOpen(false);
                  setProfileDropdownOpen(false);
                  setTimeout(() => {
                    document.getElementById('home-measurements')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <Scissors size={14} style={{ marginRight: '8px', display: 'inline' }} /> Measurements
              </li>

              <li 
                className="dropdown-item"
                onClick={() => {
                  alert(`Saved Address:\n${customerAddress}`);
                  setProfileDropdownOpen(false);
                }}
              >
                <MapPin size={14} style={{ marginRight: '8px', display: 'inline' }} /> Saved Addresses
              </li>

              <li 
                className="dropdown-item"
                onClick={() => {
                  setActiveHub('home');
                  setWizardOpen(false);
                  setProfileDropdownOpen(false);
                  setTimeout(() => {
                    document.getElementById('home-rewards')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <Sparkles size={14} style={{ marginRight: '8px', display: 'inline' }} /> Rewards ({rewardPoints} pts)
              </li>

              <li 
                className="dropdown-item"
                onClick={() => {
                  alert("Support: Chat with us at support@stitchbee.com or call +1-800-STITCH");
                  setProfileDropdownOpen(false);
                }}
              >
                <HelpCircle size={14} style={{ marginRight: '8px', display: 'inline' }} /> Support
              </li>

              <li 
                className="dropdown-item"
                style={{ color: 'var(--primary)', borderTop: '1px solid var(--border-color)', marginTop: '6px' }}
                onClick={() => {
                  setProfileDropdownOpen(false);
                  if (onLogout) onLogout();
                }}
              >
                <X size={14} style={{ marginRight: '8px', display: 'inline' }} /> Logout
              </li>
            </ul>
            )}
          </div>
        </div>
      </header>

      <div className="view-container">



      {/* Hub Tabs selector */}
      {activeHub !== 'home' && activeHub !== 'tailors' && (
        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button className={`btn ${activeHub === 'fabrics' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => { setActiveHub('fabrics'); setWizardOpen(false); }}>
            <Layers size={16} /> Fabric Marketplace
          </button>
          <button className={`btn ${activeHub === 'sarees' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => { setActiveHub('sarees'); setWizardOpen(false); }}>
            <Sparkles size={16} /> Ready Designs
          </button>
          <button className={`btn ${activeHub === 'designers' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => { setActiveHub('designers'); setWizardOpen(false); }}>
            <Star size={16} /> Designer Studios
          </button>
          <button className={`btn ${activeHub === 'articles' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => { setActiveHub('articles'); setWizardOpen(false); }}>
            <Info size={16} /> Style Articles
          </button>
          <button 
            className={`btn ${activeHub === 'history' ? 'btn-primary' : 'btn-ghost'}`} 
            onClick={() => { 
              if (!currentUser) {
                if (onLoginRequired) onLoginRequired();
                return;
              }
              setActiveHub('history'); 
              setWizardOpen(false); 
            }}
          >
            <FileText size={16} /> My Orders
          </button>
          <button 
            className={`btn ${activeHub === 'design-upload' ? 'btn-primary' : 'btn-ghost'}`} 
            onClick={() => { 
              setActiveHub('design-upload'); 
              setWizardOpen(false); 
            }}
          >
            <Upload size={16} /> Custom Design Upload
          </button>
        </div>
      )}

      {/* Cart Float Button */}
      {cart.length > 0 && (
        <button 
          onClick={() => setCartOpen(true)}
          style={{
            position: 'fixed', bottom: '30px', right: '30px', zIndex: 120,
            background: 'var(--grad-primary)', padding: '16px 20px', borderRadius: '30px',
            color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center', boxShadow: 'var(--shadow-glow)'
          }}
        >
          <ShoppingCart size={20} /> Cart ({cart.reduce((a,c) => a + c.qty, 0)})
        </button>
      )}

      {/* --- DASHBOARD WIZARD PANEL (Active when Category is clicked) --- */}
      {wizardOpen && activeHub === 'tailors' && (
        <div className="wizard-box animate-fade-in">
          {/* Header */}
          <div className="flex-row-between" style={{ marginBottom: '24px' }}>
            <div>
              <span className="badge badge-primary">StitchBee Booking Wizard</span>
              <h2 style={{ fontSize: '1.8rem', marginTop: '6px' }}>Configure Custom Stitching</h2>
            </div>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }} onClick={() => setWizardOpen(false)}>
              Exit Wizard <X size={14} />
            </button>
          </div>

          {/* Stepper Header */}
          <div className="wizard-steps-header" style={{ maxWidth: '650px', marginBottom: '40px' }}>
            <div className="wizard-steps-line" style={{ height: '3px', background: borderColor, top: '16px' }}>
              <div className="wizard-steps-line-fill" style={{ background: 'var(--primary)', width: `${((wizardStep - 1) / 4) * 100}%` }}></div>
            </div>
            {[
              { step: 1, name: 'Style & Fabric', icon: <Scissors size={14} /> },
              { step: 2, name: 'Sizing & Measurements' },
              { step: 3, name: 'Tailor Match' },
              { step: 4, name: 'Review & Pricing' },
              { step: 5, name: 'Delivery & Schedule' }
            ].map(s => {
              const isActive = s.step === wizardStep;
              const isCompleted = s.step < wizardStep;
              return (
                <div 
                  key={s.step} 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100px', position: 'relative', zIndex: 2 }}
                >
                  <div 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      background: isActive || isCompleted ? 'var(--primary)' : (isDark ? '#141226' : '#fff'), 
                      border: `2.5px solid ${isActive || isCompleted ? 'var(--primary)' : borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive || isCompleted ? '#fff' : colorTextSecondary,
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      boxShadow: isActive ? '0 0 10px rgba(247, 37, 133, 0.4)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isCompleted ? '✓' : (isActive && s.icon ? s.icon : s.step)}
                  </div>
                  <span style={{ fontSize: '0.62rem', color: isCompleted || isActive ? 'var(--primary)' : colorTextMuted, marginTop: '8px', fontWeight: 'bold' }}>
                    {s.step}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: isActive ? '800' : '600', color: isActive ? colorTextPrimary : colorTextMuted, marginTop: '2px', lineHeight: '1.2' }}>
                    {s.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Wizard step contents */}
          <form onSubmit={submitWizardBooking}>
            
            {/* STEP 1: Design & Fabric Selection */}
            {wizardStep === 1 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', fontWeight: 'bold' }}>Step 1: Choose Style Design & Fabric</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Select a fashion design template and add premium stitching fabrics.</p>
                </div>

                {/* Categories Tag Summary */}
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '16px 20px', 
                    background: isDark ? 'rgba(247,37,133,0.03)' : '#fff9fb', 
                    border: `1.5px solid ${isDark ? 'rgba(247,37,133,0.2)' : 'rgba(247,37,133,0.1)'}`, 
                    borderRadius: '12px' 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(247,37,133,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box size={18} style={{ color: 'var(--primary)' }} />
                    </div>
                    <span style={{ fontSize: '0.9rem', color: colorTextPrimary }}>
                      Active Stitch Category: <strong style={{ color: 'var(--primary)' }}>{categoryCards.find(c => c.id === selectedWizardCategory)?.label || selectedWizardCategory}</strong>
                    </span>
                  </div>
                  <span 
                    onClick={() => { setActiveHub('tailors'); setWizardOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Change Category <Edit size={14} />
                  </span>
                </div>

                {/* Select design */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '14px', color: colorTextPrimary }}>Designer Recommendations (Optional)</h4>
                  <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '12px' }}>
                    {/* Card 1: Provide Own Pattern */}
                    <div 
                      className="glass-card-no-hover"
                      style={{
                        flex: '0 0 auto', 
                        width: '240px', 
                        height: '260px', 
                        padding: '18px', 
                        borderRadius: '12px', 
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        border: `1.5px ${!selectedDesign ? 'dashed' : 'solid'} ${!selectedDesign ? 'var(--primary)' : borderColor}`,
                        background: !selectedDesign ? (isDark ? 'rgba(247,37,133,0.05)' : '#fff9fb') : bgCard,
                        boxShadow: !selectedDesign ? '0 8px 24px rgba(247, 37, 133, 0.1)' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => setSelectedDesign(null)}
                    >
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(247,37,133,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <Scissors size={24} style={{ color: 'var(--primary)', transform: 'rotate(90deg)' }} />
                      </div>
                      <h5 style={{ fontSize: '0.92rem', fontWeight: 'bold', color: colorTextPrimary, margin: '0 0 6px 0' }}>Provide Own Pattern</h5>
                      <p style={{ fontSize: '0.75rem', color: colorTextMuted, margin: 0, lineHeight: '1.4' }}>No pre-set template. Input details manually.</p>
                    </div>

                    {/* Other design recommendations */}
                    {newArrivalDesigns.filter(d => d.category === selectedWizardCategory || selectedWizardCategory === 'bridal').map(design => {
                      const isSelected = selectedDesign?.id === design.id;
                      return (
                        <div 
                          key={design.id}
                          className="glass-card-no-hover"
                          style={{
                            flex: '0 0 auto', 
                            width: '240px', 
                            height: '260px', 
                            borderRadius: '12px', 
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            border: `1.5px solid ${isSelected ? 'var(--primary)' : borderColor}`,
                            background: isSelected ? (isDark ? 'rgba(247,37,133,0.05)' : '#fff9fb') : bgCard,
                            boxShadow: isSelected ? '0 8px 24px rgba(247, 37, 133, 0.1)' : 'none',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                          onClick={() => setSelectedDesign(design)}
                        >
                          {/* Heart Icon */}
                          <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, background: 'rgba(255,255,255,0.7)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <Heart size={14} style={{ color: isSelected ? 'var(--primary)' : '#666', fill: isSelected ? 'var(--primary)' : 'none' }} />
                          </div>

                          <img src={design.image} alt={design.title} style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
                          
                          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: 'var(--primary)', background: 'rgba(247,37,133,0.1)', padding: '2px 8px', borderRadius: '4px', width: 'fit-content' }}>
                              {design.title.includes('Sherwani') ? 'Sherwani' : 'Suit'}
                            </span>
                            <h5 style={{ fontSize: '0.88rem', fontWeight: 'bold', color: colorTextPrimary, margin: '2px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{design.title}</h5>
                            <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', margin: '2px 0 0 0' }}>₹{design.price} Stitch Fee</p>
                            
                            {/* Color options indicator */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}>
                              {['#0d4e34', '#580c1f', '#0c1a4e'].map((col, cIdx) => (
                                <div key={cIdx} style={{ width: '10px', height: '10px', borderRadius: '50%', background: col }}></div>
                              ))}
                              <span style={{ fontSize: '0.65rem', color: colorTextMuted, marginLeft: '2px' }}>+3 more</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Fabric stitching option */}
                <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '20px' }}>
                  <div 
                    style={{ 
                      display: 'flex', 
                      gap: '24px', 
                      background: isDark ? 'rgba(247,37,133,0.02)' : 'rgba(247,37,133,0.01)', 
                      border: `1.5px solid ${borderColor}`,
                      borderRadius: '16px',
                      padding: '24px',
                      alignItems: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Left column */}
                    <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(247,37,133,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Sliders size={16} style={{ color: 'var(--primary)' }} />
                        </div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: colorTextPrimary, margin: 0 }}>StitchBee Fabrics Integration</h4>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: colorTextSecondary, margin: 0, lineHeight: '1.4' }}>
                        Explore premium fabrics from our marketplace and add them to your stitching design seamlessly.
                      </p>
                      <button 
                        type="button" 
                        className="btn" 
                        onClick={() => { setActiveHub('fabrics'); setWizardOpen(false); }}
                        style={{ width: 'fit-content', padding: '6px 16px', borderRadius: '8px', border: '1.5px solid var(--primary)', color: 'var(--primary)', background: 'transparent', fontWeight: 'bold', fontSize: '0.8rem' }}
                      >
                        Browse Fabrics
                      </button>
                    </div>

                    {/* Middle stack image */}
                    <div style={{ flex: '0 0 160px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src="./pink_fabrics_rolls.png" alt="Fabrics Stack" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>

                    {/* Right checkbox card */}
                    <div 
                      onClick={() => {
                        const newval = !addFabric;
                        setAddFabric(newval);
                        if (newval && !selectedFabric) setSelectedFabric(mockFabrics[0]);
                      }}
                      style={{ 
                        flex: '1 1 280px', 
                        padding: '16px', 
                        borderRadius: '12px', 
                        border: `1.5px ${addFabric ? 'solid' : 'dashed'} ${addFabric ? 'var(--primary)' : 'rgba(247,37,133,0.3)'}`,
                        background: addFabric ? (isDark ? 'rgba(247,37,133,0.06)' : '#fff9fb') : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ color: 'var(--primary)' }}>
                          <Box size={24} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: colorTextPrimary }}>Buy fabric from site</span>
                          <span style={{ fontSize: '0.75rem', color: colorTextMuted }}>and stitch here</span>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={addFabric} 
                        readOnly
                        style={{ accentColor: 'var(--primary)', width: '16px', height: '16px', cursor: 'pointer' }} 
                      />
                    </div>
                  </div>

                  {addFabric && (
                    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
                      {mockFabrics.map(fb => {
                        const isSelected = selectedFabric?.id === fb.id;
                        return (
                          <div 
                            key={fb.id}
                            className="glass-card-no-hover"
                            style={{
                              padding: '14px', 
                              borderRadius: '8px', 
                              cursor: 'pointer', 
                              display: 'flex', 
                              gap: '12px', 
                              alignItems: 'center',
                              border: `1.5px solid ${isSelected ? 'var(--primary)' : borderColor}`,
                              background: isSelected ? (isDark ? 'rgba(247,37,133,0.05)' : '#fff9fb') : bgCard,
                              transition: 'all 0.2s ease'
                            }}
                            onClick={() => setSelectedFabric(fb)}
                          >
                            <img src={fb.image} alt={fb.name} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: colorTextPrimary }}>{fb.name}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>+₹{fb.price}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
                  <button type="button" className="btn" onClick={() => setWizardOpen(false)} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f1f5f9', border: `1.5px solid ${borderColor}`, padding: '10px 24px', color: colorTextPrimary, fontWeight: 'bold' }}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={nextStep} style={{ padding: '10px 24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>Next: Sizing & Measurements <ChevronRight size={16} /></button>
                </div>
              </div>
            )}

            {/* STEP 2: Sizing & Fit Measurements */}
            {wizardStep === 2 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', fontWeight: 'bold' }}>Step 2: Sizing & Fit Measurements</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Select how we should capture your measurements for the perfect fit.</p>
                </div>

                {/* Basic client info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 'bold', color: colorTextSecondary }}>Client Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={14} style={{ position: 'absolute', left: '12px', top: '13px', color: colorTextMuted }} />
                      <input 
                        type="text" 
                        className="form-input" 
                        value={customerName} 
                        onChange={e => setCustomerName(e.target.value)} 
                        required 
                        style={{ paddingLeft: '36px', height: '38px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: bgInput, color: colorTextPrimary, width: '100%', fontSize: '0.82rem' }}
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                    <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 'bold', color: colorTextSecondary }}>Address</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ position: 'relative', flexGrow: 1 }}>
                        <MapPin size={14} style={{ position: 'absolute', left: '12px', top: '13px', color: colorTextMuted }} />
                        <input 
                          type="text" 
                          className="form-input" 
                          value={customerAddress} 
                          onChange={e => setCustomerAddress(e.target.value)} 
                          required 
                          style={{ paddingLeft: '36px', height: '38px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: bgInput, color: colorTextPrimary, width: '100%', fontSize: '0.82rem' }}
                        />
                      </div>
                      <button 
                        type="button" 
                        className="btn" 
                        style={{ padding: '8px 16px', borderRadius: '8px', border: '1.5px solid var(--primary)', color: 'var(--primary)', background: 'transparent', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
                        onClick={() => alert("Address editing enabled")}
                      >
                        <Edit size={12} /> Edit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selection panel */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '14px', color: colorTextPrimary, textAlign: 'left' }}>Choose Measurement Method</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', flexWrap: 'wrap' }}>
                    {[
                      { key: 'ai', title: 'AI Body Scan', icon: <Camera size={20} />, badge: 'FREE', badgeClass: 'badge-success', desc: 'Quick AI scan using your device camera for accurate measurements.', tag: 'Recommended' },
                      { key: 'manual', title: 'Manual Input', icon: <Sliders size={20} />, badge: 'FREE', badgeClass: 'badge-secondary', desc: 'Enter your measurements manually.' },
                      { key: 'expert', title: 'Home Visit Fit', icon: <User size={20} />, badge: '₹100', badgeClass: 'badge-primary', desc: 'Our expert will visit your home to take measurements.' },
                      { key: 'dress', title: 'Existing Dress', icon: <Shirt size={20} />, badge: 'FREE', badgeClass: 'badge-secondary', desc: 'We will use a dress that fits you well for reference.' },
                      { key: 'video', title: 'Video Assist', icon: <Video size={20} />, badge: 'FREE', badgeClass: 'badge-secondary', desc: 'Connect with our expert via video call for measurement guide.' }
                    ].map(opt => {
                      const isSelected = measurementOption === opt.key;
                      return (
                        <div 
                          key={opt.key}
                          className="glass-card-no-hover"
                          style={{
                            padding: '16px',
                            borderRadius: '12px',
                            border: `1.5px solid ${isSelected ? 'var(--primary)' : borderColor}`,
                            background: isSelected ? (isDark ? 'rgba(247,37,133,0.05)' : '#fff9fb') : bgCard,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            position: 'relative',
                            textAlign: 'left',
                            transition: 'all 0.3s ease',
                            boxShadow: isSelected ? '0 8px 24px rgba(247, 37, 133, 0.1)' : 'none'
                          }}
                          onClick={() => setMeasurementOption(opt.key)}
                        >
                          {/* Radio select dot / checkmark */}
                          <div style={{ position: 'absolute', top: '12px', right: '12px', width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${isSelected ? 'var(--primary)' : borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isSelected ? 'var(--primary)' : 'transparent' }}>
                            {isSelected && <span style={{ color: '#fff', fontSize: '0.6rem' }}>✓</span>}
                          </div>

                          <div style={{ color: isSelected ? 'var(--primary)' : colorTextSecondary, marginTop: '4px' }}>
                            {opt.icon}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: colorTextPrimary }}>{opt.title}</span>
                            <span className={`badge ${opt.badgeClass}`} style={{ fontSize: '0.6rem', padding: '2px 6px' }}>{opt.badge}</span>
                          </div>

                          <p style={{ fontSize: '0.72rem', color: colorTextMuted, margin: 0, lineHeight: '1.4' }}>{opt.desc}</p>
                          
                          {opt.tag && (
                            <span style={{ fontSize: '0.62rem', color: 'var(--primary)', background: 'rgba(247,37,133,0.1)', padding: '2px 8px', borderRadius: '4px', width: 'fit-content', fontWeight: 'bold', marginTop: 'auto' }}>
                              ★ {opt.tag}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sub Panel details */}
                {measurementOption === 'ai' && (
                  <div className="glass-card-no-hover" style={{ padding: '24px', border: `1.5px solid ${borderColor}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1.5px solid ${borderColor}`, paddingBottom: '12px' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 'bold', color: colorTextPrimary, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Camera size={18} style={{ color: 'var(--primary)' }} /> StitchBee AI Sizing Scanner Studio
                      </span>
                      {aiScanStep !== 'start' && aiScanStep !== 'results_complete' && (
                        <button type="button" className="btn btn-secondary" style={{ padding: '3px 8px', fontSize: '0.65rem', minHeight: 'auto' }} onClick={() => { stopCamera(); setAiScanStep('start'); }}>
                          Cancel Scan
                        </button>
                      )}
                    </div>

                    {/* STEP 1: START SCREEN */}
                    {aiScanStep === 'start' && (
                      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', padding: '14px', borderRadius: '50%', width: 'fit-content' }}>
                          <Sparkles size={28} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: colorTextPrimary }}>Contactless 3D AI Sizing</h4>
                        <p style={{ fontSize: '0.78rem', color: colorTextSecondary, maxWidth: '380px', margin: '0 auto', lineHeight: '1.5' }}>
                          Using our computer vision sizing engine, compute full-body custom tailoring measurements in seconds using your camera profile.
                        </p>
                        <button type="button" className="btn btn-primary animate-pulse" style={{ padding: '8px 20px', fontSize: '0.8rem', marginTop: '6px' }} onClick={() => setAiScanStep('permission')}>
                          Launch Sizing Scanner
                        </button>
                      </div>
                    )}

                    {/* STEP 2: CAMERA PERMISSION REQUEST */}
                    {aiScanStep === 'permission' && (
                      <div 
                        style={{ 
                          background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)', 
                          border: `1.5px solid ${borderColor}`, 
                          borderRadius: '12px', 
                          padding: '20px', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '12px' 
                        }}
                      >
                        <span style={{ fontSize: '0.85rem', color: colorTextPrimary, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Shield size={16} style={{ color: 'var(--primary)' }} /> Device Camera Permissions
                        </span>
                        <p style={{ fontSize: '0.78rem', color: colorTextSecondary, margin: 0, lineHeight: '1.5' }}>
                          StitchBee requests access to your webcam to perform body contour landmark mapping. No image frames are saved or transmitted to any server—processing occurs 100% locally in your browser sandbox.
                        </p>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                          <button 
                            type="button" 
                            className="btn" 
                            style={{ flex: '1 1 200px', padding: '10px', background: 'var(--primary)', color: '#fff', fontWeight: 'bold', fontSize: '0.8rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                            onClick={async () => {
                              const stream = await startCamera();
                              if (stream) setAiScanStep('instructions');
                            }}
                          >
                            Request Webcam Access
                          </button>
                          <button 
                            type="button" 
                            className="btn" 
                            style={{ flex: '1 1 200px', padding: '10px', background: 'transparent', border: `1.5px solid ${borderColor}`, color: colorTextSecondary, fontWeight: 'bold', fontSize: '0.8rem', borderRadius: '8px', cursor: 'pointer' }}
                            onClick={() => {
                              setAiCameraError(null);
                              setAiScanStep('instructions');
                            }}
                          >
                            Simulate Webcam Sensor
                          </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', fontSize: '0.72rem', color: colorTextMuted, marginTop: '8px', flexWrap: 'wrap' }}>
                          <span>✓ Secure & Private</span>
                          <span>•</span>
                          <span>100% Local Processing</span>
                          <span>•</span>
                          <span>No Data Stored</span>
                        </div>
                      </div>
                    )}


                    {/* STEP 3: INSTRUCTIONS SCREEN */}
                    {aiScanStep === 'instructions' && (
                      <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
                        {/* Left Column: Live Camera Preview */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start' }}>
                            📷 Live Camera Preview
                          </span>
                          <div style={{ width: '320px', height: '420px', background: '#05040a', borderRadius: '16px', border: '2px solid var(--primary)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(247,37,133,0.2)' }}>
                            {cameraStream ? (
                              <video ref={setVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', justifyContent: 'center', color: 'rgba(76,201,240,0.8)' }}>
                                <div style={{ width: '40px', height: '40px', border: '2px dashed #4cc9f0', borderRadius: '50%', animation: 'spinSlow 3s linear infinite' }} />
                                <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>MOCK VIDEO SCAN ACTIVE</span>
                              </div>
                            )}
                            
                            {/* Live HUD Scan Overlay */}
                            <LiveScannerCanvas isActive={true} />
                            
                            {/* Watermark/Overlay */}
                            <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(16,185,129,0.95)', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'pulse-glow 1s infinite' }}></span> PREVIEW ACTIVE
                            </div>
                          </div>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Align yourself so your head and feet are visible within the frame.</span>
                        </div>

                        {/* Right Column: Instructions & Action */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', justifyContent: 'space-between' }}>
                          <div>
                            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--accent)' }}>📐 Scan Posture Instructions</span>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginTop: '10px' }}>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: 'var(--primary)' }}>•</span>
                                <span><strong>Distance:</strong> Stand 2-3 meters away from lens.</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: 'var(--primary)' }}>•</span>
                                <span><strong>Lighting:</strong> Stand in bright lighting.</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: 'var(--primary)' }}>•</span>
                                <span><strong>Background:</strong> Stand against plain wall.</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: 'var(--primary)' }}>•</span>
                                <span><strong>Feet:</strong> Barefoot, flat on the floor.</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: 'var(--primary)' }}>•</span>
                                <span><strong>Posture:</strong> A-pose, arms slightly away.</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ color: 'var(--primary)' }}>•</span>
                                <span><strong>Clothing:</strong> Wear fitted, tight garments.</span>
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button type="button" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem', width: '100%' }} onClick={() => {
                              if (!cameraStream) startCamera();
                              setAiScanStep('capturing_front');
                            }}>
                              Start Auto-Capture sequence
                            </button>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center' }}>Auto-captures front, left, right, and back profiles.</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: TIMELINE AUTO-CAPTURE ENGINES */}
                    {aiScanStep.startsWith('capturing_') && (
                      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '320px', height: '420px', background: '#05040a', borderRadius: '16px', border: '2px solid var(--primary)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(247,37,133,0.2)' }}>
                          {cameraStream ? (
                            <video ref={setVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', justifyContent: 'center', color: 'rgba(76,201,240,0.8)' }}>
                              <div style={{ width: '40px', height: '40px', border: '2px dashed #4cc9f0', borderRadius: '50%', animation: 'spinSlow 3s linear infinite' }} />
                              <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>MOCK VIDEO SCAN ACTIVE</span>
                            </div>
                          )}
                          
                          {/* Live HUD Scan Overlay */}
                          <LiveScannerCanvas isActive={true} />

                          {/* Countdown Overlay */}
                          <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(247,37,133,0.9)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                            {countdown}s
                          </div>

                          <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', textAlign: 'center', color: '#fff' }}>
                            {aiScanStep === 'capturing_front' && '🧍 POSING: Stand facing the camera, A-posture'}
                            {aiScanStep === 'capturing_left' && '🧍 POSING: Turn 90 degrees to the left profile'}
                            {aiScanStep === 'capturing_right' && '🧍 POSING: Turn 90 degrees to the right profile'}
                            {aiScanStep === 'capturing_back' && '🧍 POSING: Turn back to the camera'}
                          </div>
                        </div>

                        {(aiScanStep === 'capturing_right' || aiScanStep === 'capturing_back') && (
                          <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.7rem', width: 'fit-content' }} onClick={() => {
                            const side = aiScanStep.split('_')[1];
                            capturePhoto(side);
                          }}>
                            Skip Profile Step
                          </button>
                        )}
                      </div>
                    )}

                    {/* STEP 5: HEIGHT INPUT */}
                    {aiScanStep === 'input_height' && (
                      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>ℹ️ Sizing Engine Parameter calibration</span>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                          Contours captured! Provide your height. If you don't know your exact height, you can use our quick presets or estimate using your average height range.
                        </p>
                        
                        {/* Tab Selector: cm vs ft/in */}
                        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '2px' }}>
                          <button
                            type="button"
                            onClick={() => setHeightInputMode('cm')}
                            style={{
                              padding: '6px 12px', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer',
                              color: heightInputMode === 'cm' ? 'var(--primary)' : 'var(--text-secondary)',
                              borderBottom: heightInputMode === 'cm' ? '2px solid var(--primary)' : 'none',
                              fontWeight: heightInputMode === 'cm' ? 'bold' : 'normal'
                            }}
                          >
                            Centimeters (cm)
                          </button>
                          <button
                            type="button"
                            onClick={() => setHeightInputMode('ft')}
                            style={{
                              padding: '6px 12px', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer',
                              color: heightInputMode === 'ft' ? 'var(--primary)' : 'var(--text-secondary)',
                              borderBottom: heightInputMode === 'ft' ? '2px solid var(--primary)' : 'none',
                              fontWeight: heightInputMode === 'ft' ? 'bold' : 'normal'
                            }}
                          >
                            Feet & Inches (ft/in)
                          </button>
                        </div>

                        {/* Height Form Input */}
                        {heightInputMode === 'cm' ? (
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.72rem' }}>Client Height (cm) *</label>
                            <input 
                              type="number" 
                              min="100" 
                              max="250" 
                              className="form-input" 
                              value={aiHeight} 
                              onChange={e => {
                                const val = parseInt(e.target.value) || 170;
                                setAiHeight(val);
                                const { feet, inches } = cmToFtIn(val);
                                setHeightFt(feet);
                                setHeightIn(inches);
                              }} 
                              required 
                            />
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                              <label className="form-label" style={{ fontSize: '0.72rem' }}>Feet *</label>
                              <select 
                                className="form-select" 
                                style={{ padding: '6px', fontSize: '0.75rem' }} 
                                value={heightFt} 
                                onChange={e => handleFtInChange(parseInt(e.target.value), heightIn)}
                              >
                                {[3, 4, 5, 6, 7].map(f => <option key={f} value={f}>{f} ft</option>)}
                              </select>
                            </div>
                            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                              <label className="form-label" style={{ fontSize: '0.72rem' }}>Inches *</label>
                              <select 
                                className="form-select" 
                                style={{ padding: '6px', fontSize: '0.75rem' }} 
                                value={heightIn} 
                                onChange={e => handleFtInChange(heightFt, parseInt(e.target.value))}
                              >
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => <option key={i} value={i}>{i} in</option>)}
                              </select>
                            </div>
                          </div>
                        )}

                        {/* Conversions Output helper */}
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                          <span>Converted Value: <strong>{aiHeight} cm</strong></span>
                          <span>({Math.floor(aiHeight / 30.48)}' {Math.round((aiHeight % 30.48) / 2.54)}")</span>
                        </div>

                        {/* Presets / Height Helper presets */}
                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estimation Presets (If exact height is unknown)</span>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.65rem', minHeight: 'auto' }}
                              onClick={() => selectHeightPreset(162)}
                            >
                              👩 Female Avg (162 cm / 5'4")
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.65rem', minHeight: 'auto' }}
                              onClick={() => selectHeightPreset(175)}
                            >
                              👨 Male Avg (175 cm / 5'9")
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '4px 8px', fontSize: '0.65rem', minHeight: 'auto' }}
                              onClick={() => selectHeightPreset(168)}
                            >
                              ⚡ Average Preset (168 cm / 5'6")
                            </button>
                          </div>
                        </div>

                        {/* Interactive testing toggles */}
                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Testing Sandbox: Trigger Quality errors</span>
                          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <input type="checkbox" checked={simBlur} onChange={e => setSimBlur(e.target.checked)} /> Blurry Photo
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <input type="checkbox" checked={simLighting} onChange={e => setSimLighting(e.target.checked)} /> Low Light
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <input type="checkbox" checked={simMultiplePeople} onChange={e => setSimMultiplePeople(e.target.checked)} /> Multi-person
                            </label>
                          </div>
                        </div>

                        <button type="button" className="btn btn-primary" style={{ padding: '8px', fontSize: '0.78rem' }} onClick={() => runValidationAndAnalysis(aiHeight)}>
                          Process Scan & Analyze contours
                        </button>
                      </div>
                    )}

                    {/* STEP 6: VALIDATING LOADER SCREEN */}
                    {aiScanStep === 'validating' && (
                      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', padding: '10px 0' }}>
                        <PoseLandmarksCanvas photoFront={aiPhotoFront} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 'bold' }}>Running MediaPipe skeletal landmarking...</span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Background segmenting & body mask generation active.</span>
                        </div>
                        <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: 'var(--accent)', width: '70%', borderRadius: '2px', animation: 'pulseGlow 1.5s infinite' }} />
                        </div>
                      </div>
                    )}

                    {/* STEP 7: RESULTS REPORT */}
                    {aiScanStep === 'results' && (
                      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        
                        {/* VALIDATION ERRORS DIAGNOSTIC PANEL */}
                        {aiValidationErrors.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ padding: '12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--danger)' }}>Scan Validation Rejected</span>
                              <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {aiValidationErrors.map((err, idx) => <li key={idx}>{err}</li>)}
                              </ul>
                            </div>
                            <button type="button" className="btn btn-primary" style={{ padding: '8px' }} onClick={() => setAiScanStep('permission')}>
                              Retake Scan Profile
                            </button>
                          </div>
                        ) : (
                          // SIZING DATA SHEET
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px', alignItems: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>3D SMPL wireframe output</span>
                                <SmplWireframe chest={aiMeasurements?.chest || aiMeasurements?.bust || 40} waist={aiMeasurements?.waist || 34} hip={aiMeasurements?.hip || 41} height={aiHeight} bodyShape={aiBodyShape} />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--accent)', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>AI Profile Predictor</span>
                                <div><strong>Gender:</strong> {aiGender}</div>
                                <div><strong>Age:</strong> {aiAge} yrs</div>
                                <div><strong>Height:</strong> {aiHeight} cm</div>
                                <div><strong>Weight:</strong> {aiWeight} kg</div>
                                <div><strong>Shape:</strong> {aiBodyShape}</div>
                                <div><strong>BMI:</strong> {aiBmiCategory}</div>
                              </div>
                            </div>

                            {/* SELECT TARGET CLOTHING CATEGORY FOR FITTINGS */}
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label className="form-label" style={{ fontSize: '0.72rem' }}>Garment calculations spec</label>
                              <select className="form-select" style={{ padding: '6px', fontSize: '0.75rem' }} value={activeReportCategory} onChange={e => {
                                const cat = e.target.value;
                                setActiveReportCategory(cat);
                                const report = getTailoringReport(aiGender, aiHeight, aiWeight, aiBodyShape, cat);
                                setAiMeasurements(report.measurements);
                                const lowFields = Object.entries(report.confidences).filter(([k, v]) => v < 0.80).map(([k, v]) => k);
                                setLowConfidenceFields(lowFields);
                              }}>
                                <option value="shirt">Men's Shirt (11 measurements)</option>
                                <option value="pant">Men's Trouser (10 measurements)</option>
                                <option value="kurta">Kurta (7 measurements)</option>
                                <option value="blazer">Blazer (7 measurements)</option>
                                <option value="sherwani">Sherwani (7 measurements)</option>
                                <option value="kurti">Women's Kurti (6 measurements)</option>
                                <option value="blouse">Saree Blouse (9 measurements)</option>
                              </select>
                            </div>

                            {/* DETAILED FITTING GRID */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Computed body parameter array</span>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', textAlign: 'center' }}>
                                {aiMeasurements && Object.entries(aiMeasurements).map(([key, val]) => {
                                  const isLow = lowConfidenceFields.includes(key);
                                  return (
                                    <div key={key} style={{ background: isLow ? 'rgba(245,158,11,0.06)' : 'rgba(0,0,0,0.15)', padding: '6px', borderRadius: '6px', border: `1px solid ${isLow ? 'rgba(245,158,11,0.3)' : 'var(--border-color)'}` }}>
                                      <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{key.replace('_', ' ')}</div>
                                      
                                      {/* Manual override input if confidence is low */}
                                      {isLow ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                                          <input type="number" step="0.1" style={{ width: '100%', padding: '2px 4px', fontSize: '0.78rem', background: '#201505', color: '#fbbf24', border: '1px solid #fbbf24', borderRadius: '3px', textAlign: 'center' }} value={val} onChange={e => {
                                            const newVal = parseFloat(e.target.value) || 0;
                                            setAiMeasurements({ ...aiMeasurements, [key]: newVal });
                                          }} />
                                          <span style={{ fontSize: '0.5rem', color: '#fbbf24' }}>Verify (low conf)</span>
                                        </div>
                                      ) : (
                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>{val}"</div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* RECS */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '0.72rem' }}>
                              <div><strong>Size Recommendation:</strong> {getTailoringReport(aiGender, aiHeight, aiWeight, aiBodyShape, activeReportCategory).recSize}</div>
                              <div><strong>Recommended fit:</strong> {aiFitRec}</div>
                            </div>

                            <button type="button" className="btn btn-primary" style={{ padding: '8px', fontSize: '0.8rem' }} onClick={handleExportToPostgres}>
                              Lock sizes & Export to PostgreSQL database
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 8: RESULTS COMPLETE SUMMARY */}
                    {aiScanStep === 'results_complete' && (
                      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center', padding: '10px 0' }}>
                        <div style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '10px', borderRadius: '50%', width: 'fit-content', margin: '0 auto' }}>
                          <Check size={24} />
                        </div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>AI Sizing details locked!</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', maxWidth: '320px', margin: '0 auto' }}>
                          Your custom 3D measurements are mapped and synchronised with our database engine.
                        </p>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '6px' }}>
                          <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={() => setAiScanStep('results')}>
                            Preview Report
                          </button>
                          <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={() => setAiScanStep('permission')}>
                            Retake scan
                          </button>
                        </div>
                      </div>
                    )}

                    {/* COLLAPSIBLE POSTGRESQL TERMINAL & QUERY ENGINE CONSOLE */}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', marginTop: '4px' }}>
                      <button type="button" style={{ width: '100%', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.7rem', padding: '4px 0' }} onClick={() => {
                        setSqlConsoleOpen(!sqlConsoleOpen);
                        if (!sqlConsoleOpen) queryConsoleTable(activeSqlTable);
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace' }}>
                          <Sliders size={12} style={{ color: 'var(--accent)' }} /> POSTGRESQL ENGINE CONSOLE
                        </span>
                        <span>{sqlConsoleOpen ? '▼ Hide Console' : '▲ Show Console'}</span>
                      </button>

                      {sqlConsoleOpen && (
                        <div className="animate-fade-in" style={{ background: '#040207', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', padding: '10px', marginTop: '8px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          
                          {/* TAB SWITCHER */}
                          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', fontSize: '0.65rem' }}>
                            <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: activeSqlTable === 'sql_logs' ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 'bold' }} onClick={() => setActiveSqlTable('sql_logs')}>
                              QUERY LOGS
                            </button>
                            <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: activeSqlTable === 'body_profiles' ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 'bold' }} onClick={() => { setActiveSqlTable('body_profiles'); queryConsoleTable('body_profiles'); }}>
                              T: body_profiles
                            </button>
                            <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: activeSqlTable === 'measurements' ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 'bold' }} onClick={() => { setActiveSqlTable('measurements'); queryConsoleTable('measurements'); }}>
                              T: measurements
                            </button>
                            <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: activeSqlTable === 'measurement_history' ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 'bold' }} onClick={() => { setActiveSqlTable('measurement_history'); queryConsoleTable('measurement_history'); }}>
                              T: history
                            </button>
                            <button type="button" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: activeSqlTable === 'customers' ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 'bold' }} onClick={() => { setActiveSqlTable('customers'); queryConsoleTable('customers'); }}>
                              T: customers
                            </button>
                          </div>

                          {/* QUERY LOG LIST */}
                          {activeSqlTable === 'sql_logs' ? (
                            <div style={{ maxHeight: '110px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.62rem' }}>
                              {loadFromStorage('stichbee_sql_logs', []).length === 0 ? (
                                <span style={{ color: 'var(--text-muted)' }}>No queries executed yet. Run and save a scan.</span>
                              ) : (
                                loadFromStorage('stichbee_sql_logs', []).slice(-10).reverse().map((log, idx) => (
                                  <div key={idx} style={{ background: 'rgba(255,255,255,0.01)', padding: '6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.03)', wordBreak: 'break-all' }}>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.5rem', marginBottom: '2px' }}>{new Date(log.timestamp).toLocaleTimeString()}</div>
                                    <span style={{ color: '#fbbf24' }}>postgres=# </span>
                                    <span style={{ color: '#34d399' }}>{log.query}</span>
                                  </div>
                                ))
                              )}
                            </div>
                          ) : (
                            // DATABASE GRID VIEW
                            <div style={{ maxHeight: '110px', overflowY: 'auto', fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
                              {dbTableRows.length === 0 ? (
                                <span style={{ color: 'var(--text-muted)' }}>Table is currently empty.</span>
                              ) : (
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                  <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                                      {Object.keys(dbTableRows[0]).slice(0, 5).map(key => (
                                        <th key={key} style={{ padding: '4px' }}>{key}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dbTableRows.map((row, idx) => (
                                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        {Object.values(row).slice(0, 5).map((val, vIdx) => (
                                          <td key={vIdx} style={{ padding: '4px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '80px' }}>
                                            {typeof val === 'object' ? JSON.stringify(val).slice(0, 20) + '...' : String(val)}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Sub Panel: Manual input */}
                {measurementOption === 'manual' && (
                  <div className="glass-card-no-hover" style={{ padding: '16px', background: 'rgba(0,0,0,0.15)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.7rem' }}>Chest (in)</label>
                      <input type="number" step="0.1" className="form-input" style={{ padding: '6px' }} value={selfMeasurements.chest} onChange={e => setSelfMeasurements({ ...selfMeasurements, chest: e.target.value })} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.7rem' }}>Waist (in)</label>
                      <input type="number" step="0.1" className="form-input" style={{ padding: '6px' }} value={selfMeasurements.waist} onChange={e => setSelfMeasurements({ ...selfMeasurements, waist: e.target.value })} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.7rem' }}>Shoulder (in)</label>
                      <input type="number" step="0.1" className="form-input" style={{ padding: '6px' }} value={selfMeasurements.shoulder} onChange={e => setSelfMeasurements({ ...selfMeasurements, shoulder: e.target.value })} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.7rem' }}>Length (in)</label>
                      <input type="number" step="0.1" className="form-input" style={{ padding: '6px' }} value={selfMeasurements.length} onChange={e => setSelfMeasurements({ ...selfMeasurements, length: e.target.value })} required />
                    </div>
                  </div>
                )}

                {/* Sub Panel: Home expert visit */}
                {measurementOption === 'expert' && (
                  <div className="glass-card-no-hover animate-fade-in" style={{ padding: '16px', background: 'rgba(76,201,240,0.04)', border: '1px dashed var(--accent)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div className="flex-row-between">
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent)' }}>Trained Sizing Experts (Separated by Client Gender)</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          type="button" 
                          className={`btn ${technicianGender === 'male' ? 'btn-primary' : 'btn-secondary'}`} 
                          onClick={() => setTechnicianGender('male')}
                          style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                        >
                          Male tech
                        </button>
                        <button 
                          type="button" 
                          className={`btn ${technicianGender === 'female' ? 'btn-primary' : 'btn-secondary'}`} 
                          onClick={() => setTechnicianGender('female')}
                          style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                        >
                          Female tech
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      We will dispatch a trained <strong>{technicianGender === 'male' ? 'Male' : 'Female'} expert</strong> carrying a professional digital measuring tape to your address. This ensures maximum comfort, safety, and sizing accuracy.
                    </p>
                    <div className="grid-cols-2" style={{ gap: '10px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.7rem' }}>Date</label>
                        <input type="date" className="form-input" style={{ padding: '6px' }} value={bookingDate} onChange={e => setBookingDate(e.target.value)} required />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.7rem' }}>Time Slot</label>
                        <select className="form-select" style={{ padding: '6px' }} value={bookingTime} onChange={e => setBookingTime(e.target.value)}>
                          <option value="10:00 - 12:00">10:00 AM - 12:00 PM</option>
                          <option value="14:00 - 16:00">02:00 PM - 04:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub Panel: Reference dress */}
                {measurementOption === 'dress' && (
                  <div className="glass-card-no-hover" style={{ padding: '24px', border: '1.5px dashed var(--border-color)', textAlign: 'center' }}>
                    <Upload size={24} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Upload photos of your existing reference garment. Our delivery boy will collect it during pickup.</p>
                  </div>
                )}

                {/* Sub Panel: Video Assistant */}
                {measurementOption === 'video' && (
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    📞 WhatsApp video link will be sent. Certified size consultants will assist you in mapping dimensions over a video call.
                  </p>
                )}

                {/* Logistics pickup method */}
                <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '20px', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '14px', color: colorTextPrimary }}>Doorstep Logistics Delivery</h4>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    
                    {/* Student Delivery Option */}
                    <div 
                      className="glass-card-no-hover" 
                      onClick={() => setDeliveryType('student')}
                      style={{
                        flex: '1 1 280px', 
                        padding: '16px', 
                        borderRadius: '12px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        border: `1.5px solid ${deliveryType === 'student' ? 'var(--primary)' : borderColor}`,
                        background: deliveryType === 'student' ? (isDark ? 'rgba(247,37,133,0.06)' : '#fff9fb') : bgCard,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(247,37,133,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <User size={18} style={{ color: 'var(--primary)' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: colorTextPrimary }}>Student Delivery</span>
                            <span className="badge badge-primary" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>+ ₹50</span>
                          </div>
                          <p style={{ fontSize: '0.72rem', color: colorTextMuted, margin: '2px 0 0 0', lineHeight: '1.3' }}>Certified student partners manage pickups and deliver finished clothes.</p>
                        </div>
                      </div>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${deliveryType === 'student' ? 'var(--primary)' : borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: deliveryType === 'student' ? 'var(--primary)' : 'transparent', flexShrink: 0 }}>
                        {deliveryType === 'student' && <span style={{ color: '#fff', fontSize: '0.6rem' }}>✓</span>}
                      </div>
                    </div>

                    {/* Self Pick-up Option */}
                    <div 
                      className="glass-card-no-hover" 
                      onClick={() => setDeliveryType('self')}
                      style={{
                        flex: '1 1 280px', 
                        padding: '16px', 
                        borderRadius: '12px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        border: `1.5px solid ${deliveryType === 'self' ? 'var(--primary)' : borderColor}`,
                        background: deliveryType === 'self' ? (isDark ? 'rgba(247,37,133,0.06)' : '#fff9fb') : bgCard,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(163, 114, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Sliders size={18} style={{ color: '#a372ff' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: colorTextPrimary }}>Self Pick-up</span>
                            <span className="badge badge-secondary" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>FREE</span>
                          </div>
                          <p style={{ fontSize: '0.72rem', color: colorTextMuted, margin: '2px 0 0 0', lineHeight: '1.3' }}>Visit the tailor shop to collect yourself once stitching completes.</p>
                        </div>
                      </div>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${deliveryType === 'self' ? 'var(--primary)' : borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: deliveryType === 'self' ? 'var(--primary)' : 'transparent', flexShrink: 0 }}>
                        {deliveryType === 'self' && <span style={{ color: '#fff', fontSize: '0.6rem' }}>✓</span>}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '16px', borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
                  <button type="button" className="btn" onClick={prevStep} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f1f5f9', border: `1.5px solid ${borderColor}`, padding: '10px 24px', color: colorTextPrimary, fontWeight: 'bold' }}>← Back</button>
                  <button type="button" className="btn btn-primary" onClick={nextStep} style={{ padding: '10px 24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>Next: Customizations <ChevronRight size={16} /></button>
                </div>
              </div>
            )}

            {/* STEP 3: Match Nearby Tailor (Uber/Namma Yatri style) */}
            {wizardStep === 3 && (() => {
              const localWizardTailors = [
                { 
                  id: 't1', 
                  name: 'Royal Bespoke Tailors', 
                  owner: 'Master Rajesh Kumar',
                  rating: 4.8, 
                  reviews: 126, 
                  distance: 0.8, 
                  time: '15-20 mins', 
                  orders: '250+ Orders', 
                  specialty: 'Suits, Indo-Western, Sherwani',
                  categories: ['mens', 'alterations', 'uniforms'],
                  address: 'Sector 4, HSR Layout, Bengaluru',
                  coordinates: { x: 30, y: 40 },
                  image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&q=80',
                  status: 'approved',
                  initial: 'RB', 
                  bg: '#0b162c', 
                  mapCoords: { top: '68%', left: '76%', label: '1' },
                  reviewsList: [
                    { name: 'Rohan Sharma', rating: 5, comment: 'Royal Bespoke is excellent. The sherwani fits like a glove!', date: '2026-05-28' }
                  ],
                  portfolio: [
                    { title: 'Classic Velvet Sherwani', image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=300&q=80' }
                  ]
                },
                { 
                  id: 't2', 
                  name: 'The Stitch Studio', 
                  owner: 'Ananya Sharma',
                  rating: 4.6, 
                  reviews: 98, 
                  distance: 1.6, 
                  time: '20-25 mins', 
                  orders: '180+ Orders', 
                  specialty: 'Saree, Blouse, Lehengas',
                  categories: ['womens', 'bridal'],
                  address: '12th Main, Indiranagar, Bengaluru',
                  coordinates: { x: 75, y: 25 },
                  image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
                  status: 'approved',
                  initial: 'TS', 
                  bg: '#0b2c1b', 
                  mapCoords: { top: '55%', left: '40%', label: '4' },
                  reviewsList: [
                    { name: 'Priya Sen', rating: 5, comment: 'Stunning embroidery and blouse lining work!', date: '2026-06-02' }
                  ],
                  portfolio: [
                    { title: 'Designer Silk Blouse', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' }
                  ]
                },
                { 
                  id: 't3', 
                  name: 'Thread & Needle', 
                  owner: 'David D\'Souza',
                  rating: 4.5, 
                  reviews: 74, 
                  distance: 2.1, 
                  time: '25-30 mins', 
                  orders: '140+ Orders', 
                  specialty: 'Casual Wear, Kurtis, Dresses',
                  categories: ['kids', 'alterations'],
                  address: 'Koramangala 5th Block, Bengaluru',
                  coordinates: { x: 45, y: 80 },
                  image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80',
                  status: 'approved',
                  initial: 'TN', 
                  bg: '#2c1e0b', 
                  mapCoords: { top: '78%', left: '60%', label: '2' },
                  reviewsList: [
                    { name: 'Kavitha M.', rating: 5, comment: 'Stitched a beautiful birthday dress for my daughter.', date: '2026-06-05' }
                  ],
                  portfolio: [
                    { title: 'Velvet Frock', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80' }
                  ]
                },
                { 
                  id: 't4', 
                  name: 'Stitch Crafts', 
                  owner: 'Guru Prasad',
                  rating: 4.3, 
                  reviews: 58, 
                  distance: 2.9, 
                  time: '30-35 mins', 
                  orders: '120+ Orders', 
                  specialty: 'Alterations, Formal Wear',
                  categories: ['seats', 'bags'],
                  address: 'BTM Layout 2nd Stage, Bengaluru',
                  coordinates: { x: 60, y: 60 },
                  image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=400&q=80',
                  status: 'approved',
                  initial: 'SC', 
                  bg: '#230b2c', 
                  mapCoords: { top: '40%', left: '80%', label: '3' },
                  reviewsList: [
                    { name: 'Guru Prasad', rating: 4, comment: 'Alterations done quickly and cleanly.', date: '2026-06-01' }
                  ],
                  portfolio: [
                    { title: 'Leather Alterations', image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=300&q=80' }
                  ]
                }
              ];

              return (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px', fontWeight: 'bold' }}>Step 3: Geolocated Tailor Match Radar</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Select from tailors registered under our app matching your coordinate area.</p>
                  </div>

                  {/* Place Search bar & filters */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
                      <Search size={16} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        placeholder="Search by area (e.g. HSR Layout, Indiranagar, Koramangala)..." 
                        className="form-input" 
                        value={placeSearchText} 
                        onChange={e => setPlaceSearchText(e.target.value)}
                        style={{ paddingLeft: '40px', height: '38px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: bgInput, color: colorTextPrimary, width: '100%', fontSize: '0.82rem' }}
                      />
                    </div>
                    
                    <button 
                      type="button"
                      className="btn" 
                      style={{ padding: '8px 16px', borderRadius: '8px', border: '1.5px solid var(--primary)', color: 'var(--primary)', background: 'transparent', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', height: '38px' }}
                      onClick={() => alert("Acquiring GPS location coordinates...")}
                    >
                      <MapPin size={14} /> Use my current location
                    </button>

                    <button 
                      type="button"
                      className="btn" 
                      style={{ padding: '8px 16px', borderRadius: '8px', border: `1.5px solid ${borderColor}`, color: colorTextSecondary, background: bgCard, fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', height: '38px' }}
                    >
                      <Sliders size={14} /> Filter <ChevronDown size={12} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '38px' }}>
                      <span style={{ fontSize: '0.82rem', color: colorTextMuted }}>Sort by:</span>
                      <select
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: `1px solid ${borderColor}`,
                          background: bgCard,
                          color: colorTextPrimary,
                          fontSize: '0.82rem',
                          fontWeight: '500',
                          outline: 'none',
                          height: '38px'
                        }}
                      >
                        <option>Nearest</option>
                        <option>Rating: High to Low</option>
                        <option>Popularity</option>
                      </select>
                    </div>
                  </div>

                  {/* Two Column Geolocated Match Block */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', minHeight: '480px', flexWrap: 'wrap' }}>
                    
                    {/* Left Column: Tailors List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
                      {localWizardTailors.map((tailor, idx) => {
                        const isSelected = selectedTailor?.id === tailor.id;
                        return (
                          <div 
                            key={tailor.id}
                            className="glass-card-no-hover"
                            style={{
                              padding: '16px',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              border: `1.5px solid ${isSelected ? 'var(--primary)' : borderColor}`,
                              background: isSelected ? (isDark ? 'rgba(247,37,133,0.06)' : '#fff9fb') : bgCard,
                              boxShadow: isSelected ? '0 8px 24px rgba(247, 37, 133, 0.1)' : 'none',
                              transition: 'all 0.3s ease',
                              position: 'relative'
                            }}
                            onClick={() => setSelectedTailor(tailor)}
                          >
                            {/* Left contents block */}
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                              {/* Circle Initial Avatar */}
                              <div 
                                style={{ 
                                  width: '48px', 
                                  height: '48px', 
                                  borderRadius: '50%', 
                                  background: tailor.bg, 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  fontSize: '1rem',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                  flexShrink: 0
                                }}
                              >
                                {tailor.initial}
                              </div>

                              {/* Details list */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', textAlign: 'left' }}>
                                {idx === 0 && (
                                  <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: '#fff', background: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', width: 'fit-content', marginBottom: '2px' }}>
                                    Best Match
                                  </span>
                                )}
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: colorTextPrimary, margin: 0 }}>{tailor.name}</h4>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: colorTextSecondary }}>
                                  <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 'bold' }}>
                                    ★ {tailor.rating}
                                  </span>
                                  <span style={{ color: colorTextMuted }}>({tailor.reviews} Reviews)</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.72rem', color: colorTextMuted, marginTop: '2px', flexWrap: 'wrap' }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} style={{ color: 'var(--primary)' }} /> {tailor.distance} km away</span>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {tailor.time}</span>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Sliders size={12} /> {tailor.orders}</span>
                                </div>

                                <p style={{ fontSize: '0.75rem', color: colorTextSecondary, margin: '4px 0 0 0' }}>
                                  <strong style={{ color: colorTextMuted }}>Specializes in:</strong> {tailor.specialty}
                                </p>
                              </div>
                            </div>

                            {/* Right button */}
                            <button 
                              type="button" 
                              className="btn" 
                              style={{ 
                                padding: '8px 16px', 
                                borderRadius: '8px', 
                                border: `1.5px solid ${isSelected ? 'var(--primary)' : borderColor}`, 
                                color: isSelected ? 'var(--primary)' : colorTextSecondary, 
                                background: isSelected ? 'rgba(247,37,133,0.08)' : 'transparent', 
                                fontSize: '0.8rem', 
                                fontWeight: 'bold',
                                flexShrink: 0
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTailor(tailor);
                                alert(`Viewing full profile for ${tailor.name}`);
                              }}
                            >
                              View Profile
                            </button>
                          </div>
                        );
                      })}

                      <button 
                        type="button" 
                        className="btn" 
                        style={{ width: 'fit-content', alignSelf: 'center', padding: '8px 24px', borderRadius: '8px', border: `1.5px solid ${borderColor}`, color: colorTextSecondary, background: bgCard, fontSize: '0.8rem', fontWeight: 'bold' }}
                        onClick={() => alert("Loading next page of registered tailor partners...")}
                      >
                        Load More Tailors <ChevronDown size={14} />
                      </button>
                    </div>

                    {/* Right Column: Simulated Map */}
                    <div 
                      className="map-sim" 
                      style={{ 
                        height: '100%', 
                        minHeight: '380px',
                        borderRadius: '16px', 
                        backgroundImage: 'url(./map_sim.png)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        border: `1.5px solid ${borderColor}`,
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)'
                      }}
                    >
                      {/* Circle range indicator overlay */}
                      <div 
                        style={{ 
                          position: 'absolute', 
                          top: '60%', 
                          left: '70%', 
                          transform: 'translate(-50%, -50%)', 
                          width: '240px', 
                          height: '240px', 
                          borderRadius: '50%', 
                          border: '2px dashed var(--primary)', 
                          background: 'rgba(247, 37, 133, 0.05)',
                          pointerEvents: 'none',
                          boxShadow: '0 0 20px rgba(247, 37, 133, 0.1)'
                        }}
                      ></div>

                      {/* Toggle switch area */}
                      <div 
                        style={{ 
                          position: 'absolute', 
                          top: '16px', 
                          left: '16px', 
                          background: 'rgba(255, 255, 255, 0.9)', 
                          padding: '8px 14px', 
                          borderRadius: '24px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px', 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          zIndex: 10
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1a2238' }}>Show tailors in this area</span>
                        <div style={{ width: '36px', height: '20px', borderRadius: '10px', background: 'var(--primary)', position: 'relative', cursor: 'pointer' }}>
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', right: '2px' }}></div>
                        </div>
                      </div>

                      {/* Zoom controls */}
                      <div 
                        style={{ 
                          position: 'absolute', 
                          bottom: '16px', 
                          right: '16px', 
                          background: 'rgba(255, 255, 255, 0.9)', 
                          borderRadius: '8px', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          zIndex: 10
                        }}
                      >
                        <button type="button" style={{ width: '32px', height: '32px', border: 'none', background: 'none', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer', borderBottom: '1px solid #e2e8f0', color: '#1a2238' }} onClick={() => alert("Zoom in")}>+</button>
                        <button type="button" style={{ width: '32px', height: '32px', border: 'none', background: 'none', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer', color: '#1a2238' }} onClick={() => alert("Zoom out")}>-</button>
                      </div>

                      {/* Target location picker icon */}
                      <div 
                        style={{ 
                          position: 'absolute', 
                          bottom: '90px', 
                          right: '16px', 
                          background: 'rgba(255, 255, 255, 0.9)', 
                          borderRadius: '8px', 
                          width: '32px', 
                          height: '32px',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          cursor: 'pointer',
                          zIndex: 10
                        }}
                        onClick={() => alert("Re-centering map on user GPS coordinates...")}
                      >
                        <MapPin size={16} style={{ color: '#1a2238' }} />
                      </div>

                      {/* User Marker: Center */}
                      <div style={{ position: 'absolute', top: '60%', left: '70%', transform: 'translate(-50%, -50%)', zIndex: 15, textAlign: 'center' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--primary)', border: '2.5px solid #ffffff', boxShadow: '0 0 10px var(--primary)', margin: '0 auto' }}></div>
                        <div style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.62rem', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', fontWeight: 'bold', whiteSpace: 'nowrap', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                          You (Pickup)
                        </div>
                      </div>

                      {/* Tailor Markers */}
                      {localWizardTailors.map(tailor => {
                        const isSelected = selectedTailor?.id === tailor.id;
                        return (
                          <div 
                            key={tailor.id} 
                            style={{ 
                              position: 'absolute', 
                              top: tailor.mapCoords.top, 
                              left: tailor.mapCoords.left, 
                              transform: 'translate(-50%, -50%)', 
                              zIndex: isSelected ? 30 : 20, 
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center'
                            }}
                            onClick={() => setSelectedTailor(tailor)}
                          >
                            <div 
                              style={{ 
                                width: '24px', 
                                height: '24px', 
                                borderRadius: '50%', 
                                background: isSelected ? 'var(--primary)' : '#10b981', 
                                border: '2px solid #ffffff', 
                                boxShadow: `0 0 10px ${isSelected ? 'var(--primary)' : '#10b981'}`, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '0.72rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {tailor.mapCoords.label}
                            </div>
                            {isSelected && (
                              <div style={{ background: '#fff', color: '#1a2238', fontSize: '0.62rem', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', fontWeight: 'bold', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid var(--primary)' }}>
                                {tailor.name}
                              </div>
                            )}
                          </div>
                        );
                      })}

                    </div>

                  </div>

                  {/* Selected Tailor details portfolio */}
                  {selectedTailor && (() => {
                    // Match selectedTailor ID to localWizardTailors reviews/portfolio or keep fallback
                    const matchedTailor = localWizardTailors.find(t => t.id === selectedTailor.id) || selectedTailor;
                    return (
                      <div className="glass-card-no-hover animate-fade-in" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', border: `1.5px solid ${borderColor}`, borderRadius: '16px', textAlign: 'left', marginTop: '16px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <img src={matchedTailor.image} alt={matchedTailor.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: `2px solid var(--primary)` }} />
                          <div>
                            <h4 style={{ fontSize: '1.1rem', color: colorTextPrimary, fontWeight: 'bold', margin: 0 }}>{matchedTailor.name}</h4>
                            <p style={{ fontSize: '0.8rem', color: colorTextSecondary, margin: '2px 0 0 0' }}>Shop Owner: <strong>{matchedTailor.owner}</strong></p>
                          </div>
                        </div>

                        {/* Past works gallery */}
                        {matchedTailor.portfolio && (
                          <div>
                            <h5 style={{ fontSize: '0.82rem', color: colorTextSecondary, fontWeight: 'bold', marginBottom: '8px' }}>Tailor Portfolio (Past Works Done)</h5>
                            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
                              {matchedTailor.portfolio.map((p, idx) => (
                                <div key={idx} style={{ flex: '0 0 auto', width: '120px', textAlign: 'center' }}>
                                  <img src={p.image} alt={p.title} style={{ width: '120px', height: '90px', borderRadius: '6px', objectFit: 'cover' }} />
                                  <div style={{ fontSize: '0.68rem', color: colorTextSecondary, marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Reviews */}
                        {matchedTailor.reviewsList && (
                          <div>
                            <h5 style={{ fontSize: '0.82rem', color: colorTextSecondary, fontWeight: 'bold', marginBottom: '8px' }}>Customer Reviews</h5>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {matchedTailor.reviewsList.map((r, idx) => (
                                <div key={idx} style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)', border: `1px solid ${borderColor}`, padding: '12px', borderRadius: '8px', fontSize: '0.78rem' }}>
                                  <div className="flex-row-between" style={{ marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 'bold', color: colorTextPrimary }}>{r.name}</span>
                                    <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>★ {r.rating}</span>
                                  </div>
                                  <p style={{ color: colorTextSecondary, margin: 0, lineHeight: '1.4' }}>"{r.comment}"</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Footer Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '16px', borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
                    <button type="button" className="btn" onClick={prevStep} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f1f5f9', border: `1.5px solid ${borderColor}`, padding: '10px 24px', color: colorTextPrimary, fontWeight: 'bold' }}>← Back</button>
                    <button type="button" className="btn btn-primary" onClick={nextStep} style={{ padding: '10px 24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>Next: Review & Pricing <ChevronRight size={16} /></button>
                  </div>
                </div>
              );
            })()}
            )}

            {/* STEP 4: Request Tailor & Negotiation Simulation */}
            {wizardStep === 4 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Step 4: Tailor Pricing Request</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Brief is shared with the tailor. Tailor reviews details and proposes final amount.</p>
                </div>

                <div className="negotiation-panel">
                  {negotiatingState === 'sending' && (
                    <>
                      <div className="negotiation-radar"></div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Sending order details...</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Uploading measurements and styling briefs to {selectedTailor?.name}.</p>
                    </>
                  )}

                  {negotiatingState === 'reviewing' && (
                    <>
                      <div className="negotiation-radar" style={{ borderTopColor: 'var(--accent)' }}></div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Tailor is analyzing requirements...</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Tailor console active. Mapping stitching hours, lining fabrics, and delivery margins.</p>
                    </>
                  )}

                  {negotiatingState === 'proposed' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                      <div style={{ padding: '10px', background: 'rgba(16,185,129,0.1)', color: 'var(--success)', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={24} />
                      </div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', margin: 0 }}>Tailor {selectedTailor?.name} Accepted Booking!</h4>
                      
                      <div style={{ padding: '16px 30px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Final Stitching & Logistics Amount</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)', marginTop: '4px' }}>₹{proposedPrice}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                          (Includes base stitching + fabric + student pickup & delivery + complex category adjust)
                        </div>
                      </div>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click Accept to proceed with payment check out.</p>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setWizardOpen(false)}>Reject & Exit</button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={nextStep} 
                    disabled={negotiatingState !== 'proposed'}
                  >
                    Accept & Continue to Payment <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Payment Checkout */}
            {wizardStep === 5 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Step 5: Checkout Secure Payment</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Choose online payment options to complete tailor booking.</p>
                </div>

                <div style={{ padding: '14px', background: 'var(--grad-glow)', borderRadius: '8px', border: '1px dashed rgba(247,37,133,0.3)' }}>
                  <div className="flex-row-between">
                    <span style={{ fontSize: '0.85rem' }}>Stitching service for: <strong>{selectedDesign?.title || selectedWizardCategory.toUpperCase()}</strong></span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent)' }}>₹{proposedPrice}</span>
                  </div>
                </div>

                {/* Payment tabs */}
                <div className="payment-tabs">
                  <div 
                    className={`payment-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    UPI / QR Code Scan
                  </div>
                  <div 
                    className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    Credit / Debit Card
                  </div>
                </div>

                {/* Forms */}
                {paymentMethod === 'upi' && (
                  <div className="animate-fade-in" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'var(--border-color)', padding: '16px', borderRadius: '8px', flexWrap: 'wrap' }}>
                    <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Simulating QR code */}
                      <div style={{ width: '100px', height: '100px', background: 'repeating-conic-gradient(from 45deg, #000 0% 25%, #fff 25% 50%) 50% / 10px 10px' }}></div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '600' }}>Scan QR Code or enter UPI ID</p>
                      <div className="form-group" style={{ marginTop: '10px', marginBottom: 0 }}>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. success@upi" 
                          value={paymentUpiId}
                          onChange={e => setPaymentUpiId(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(0,0,0,0.15)', padding: '16px', borderRadius: '8px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.7rem' }}>Card Number</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="4111 2222 3333 4444" 
                        maxLength="19"
                        value={paymentCardNumber}
                        onChange={e => setPaymentCardNumber(e.target.value)}
                      />
                    </div>
                    <div className="grid-cols-2" style={{ gap: '10px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.7rem' }}>Expiry Date</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="MM/YY" 
                          maxLength="5"
                          value={paymentCardExpiry}
                          onChange={e => setPaymentCardExpiry(e.target.value)}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.7rem' }}>CVC</label>
                        <input 
                          type="password" 
                          className="form-input" 
                          placeholder="123" 
                          maxLength="3"
                          value={paymentCardCvc}
                          onChange={e => setPaymentCardCvc(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
                    {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                  <button type="submit" className="btn btn-primary">Pay & Confirm Booking</button>
                </div>
              </div>
            )}

          </form>
        </div>
      )}

      {/* --- HUB -1: PERSONALIZED HOME PAGE HUB --- */}
      {activeHub === 'home' && (
        <div className="home-dashboard-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '36px', marginTop: '24px' }}>
          
          {/* FOLD 1: Hero Section (Welcome Banner & Active Order side-by-side) */}
          <div className="hero-grid-layout" style={{ width: '100%' }}>
            {/* Welcome Banner */}
            <div className="welcome-hero-banner-card" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px' }}>
              {/* Rotating Background Suit Images */}
              {heroBgs.map((bg, idx) => (
                <img 
                  key={idx}
                  src={bg} 
                  alt="hero-bg" 
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    bottom: '0',
                    width: '45%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    opacity: heroBgIdx === idx ? 1 : 0,
                    pointerEvents: 'none',
                    transition: 'opacity 1.5s ease-in-out',
                    maskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)'
                  }}
                />
              ))}

              <div style={{ zIndex: 10 }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 10px 0', color: colorTextPrimary }}>
                  Welcome back, <span style={{ color: 'var(--primary)' }}>Kiran</span> 👋
                </h1>
                <p style={{ fontSize: '1.2rem', margin: '0 0 10px 0', fontWeight: '600', color: colorTextSecondary }}>
                  Ready for your next perfect outfit?
                </p>
                <p style={{ fontSize: '0.9rem', color: colorTextMuted, margin: '0 0 24px 0' }}>
                  Your style. Your fit. Your way.
                </p>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary)', border: 'none', padding: '12px 24px', fontWeight: 'bold' }} onClick={() => {
                    setActiveHub('tailors');
                    setSelectedCategory('mens');
                    setWizardOpen(true);
                    setWizardStep(1);
                  }}>
                    Continue Order →
                  </button>
                  <button className="btn btn-secondary" style={{ background: bgCard, color: colorTextPrimary, border: `1px solid ${borderColor}`, padding: '12px 24px', fontWeight: 'bold' }} onClick={() => {
                    setActiveHub('tailors');
                    setSelectedCategory('mens');
                    setWizardOpen(true);
                    setWizardStep(1);
                  }}>
                    Book New Stitching
                  </button>
                </div>
              </div>

              {/* Statistics Row at the bottom of the card */}
              <div className="hero-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '36px', width: '100%', zIndex: 10 }}>
                <div style={{ background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(247, 37, 133, 0.1)', color: 'var(--primary)', flexShrink: 0 }}>
                    <Clock size={16} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: '800', color: colorTextPrimary, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{activeOrders?.length || 1}</h5>
                    <span style={{ fontSize: '0.65rem', color: colorTextMuted, fontWeight: '600', display: 'block', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Active Orders</span>
                  </div>
                </div>

                <div style={{ background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(76, 201, 240, 0.1)', color: '#4cc9f0', flexShrink: 0 }}>
                    <Heart size={16} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: '800', color: colorTextPrimary, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{wishlist?.length || 2}</h5>
                    <span style={{ fontSize: '0.65rem', color: colorTextMuted, fontWeight: '600', display: 'block', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Saved Designs</span>
                  </div>
                </div>

                <div style={{ background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(247, 37, 133, 0.1)', color: 'var(--primary)', flexShrink: 0 }}>
                    <Layers size={16} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: '800', color: colorTextPrimary, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>3</h5>
                    <span style={{ fontSize: '0.65rem', color: colorTextMuted, fontWeight: '600', display: 'block', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Saved Fabrics</span>
                  </div>
                </div>

                <div style={{ background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(76, 201, 240, 0.1)', color: '#4cc9f0', flexShrink: 0 }}>
                    <Star size={16} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h5 style={{ fontSize: '1.1rem', fontWeight: '800', color: colorTextPrimary, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rewardPoints || 120}</h5>
                    <span style={{ fontSize: '0.65rem', color: colorTextMuted, fontWeight: '600', display: 'block', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Reward Points</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Active Order Tracker */}
            <div className="active-order-tracking-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' }}>
              <div className="flex-row-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.5px' }}>ACTIVE ORDER</span>
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: '800', margin: '4px 0' }}>Wedding Sherwani</h4>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>Order ID: STB10234</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Status: </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 'bold' }}>Stitching in Progress</span>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Est. Delivery: <strong>18 May 2025</strong> <span style={{ color: 'var(--text-muted)' }}>(3 days left)</span></p>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Tailor: <strong style={{ color: 'var(--text-primary)' }}>Royal Bespoke</strong>
              </div>

              {/* Progress Steps Timeline */}
              <div className="tracking-step-timeline-horizontal">
                <div className="tracking-timeline-line-horizontal">
                  <div className="tracking-timeline-line-fill-horizontal" style={{ width: '60%' }} />
                </div>
                
                {[
                  { name: 'Order Placed', completed: true },
                  { name: 'Fabric Picked', completed: true },
                  { name: 'Tailor Assigned', completed: true },
                  { name: 'Stitching', active: true },
                  { name: 'QC Check', pending: true },
                  { name: 'Out for Delivery', pending: true }
                ].map((step, idx) => (
                  <div key={idx} className={`tracking-timeline-node-horizontal ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}>
                    <div className="tracking-node-dot-horizontal" style={{ background: step.completed || step.active ? 'var(--primary)' : 'var(--border-color)', color: '#fff' }}>
                      {step.completed ? '✓' : step.active ? '★' : idx + 1}
                    </div>
                    <span className="tracking-node-label-horizontal" style={{ color: step.active ? 'var(--primary)' : 'var(--text-secondary)' }}>{step.name}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button className="btn btn-primary-ghost" style={{ flex: 1, padding: '8px', fontSize: '0.75rem', color: 'var(--primary)', border: '1.5px solid var(--primary)', background: 'rgba(247,37,133,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => alert("Launching Live Video Call & AR fitting room...")}>
                  <Camera size={14} /> Track Live
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', fontSize: '0.75rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => alert("Connecting secure chat with master tailor Sneha Reddy...")}>
                  <MessageSquare size={14} /> Chat with Tailor
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', fontSize: '0.75rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => alert("Invoice details & 3D garment specs loading...")}>
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* FOLD 2: Quick Actions Section */}
          <section className="quick-actions-section" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 16px 0' }}>Quick Actions</h3>
            <div className="quick-actions-bar">
              {[
                { name: 'Start New Stitching', icon: <Scissors size={20} />, bg: 'rgba(247, 37, 133, 0.1)', color: 'var(--primary)', action: () => { setActiveHub('tailors'); setSelectedCategory('mens'); setWizardOpen(true); setWizardStep(1); } },
                { name: 'Book Alteration', icon: <Scissors size={20} style={{ transform: 'rotate(90deg)' }} />, bg: 'rgba(163, 114, 255, 0.1)', color: '#a372ff', action: () => { setActiveHub('tailors'); setSelectedCategory('alterations'); setWizardOpen(true); setWizardStep(1); } },
                { name: 'Upload Measurements', icon: <Sliders size={20} />, bg: 'rgba(76, 201, 240, 0.1)', color: '#4cc9f0', action: () => setIsAddingProfile(true) },
                { name: 'Find Nearby Tailors', icon: <MapPin size={20} />, bg: 'rgba(78, 205, 196, 0.1)', color: '#4ecdc4', action: () => { setActiveHub('tailors'); setWizardOpen(false); if (setCustomerHub) setCustomerHub('tailors'); } },
                { name: 'Browse Fabrics', icon: <Layers size={20} />, bg: 'rgba(255, 145, 77, 0.1)', color: '#ff914d', action: () => { setActiveHub('fabrics'); if (setCustomerHub) setCustomerHub('fabrics'); } },
                { name: 'Upload Design', icon: <Upload size={20} />, bg: 'rgba(247, 37, 133, 0.1)', color: 'var(--primary)', action: () => { setActiveHub('tailors'); setWizardOpen(true); setWizardStep(1); } }
              ].map((item, idx) => (
                <div key={idx} className="quick-action-item-circle-wrapper" onClick={item.action}>
                  <div className="quick-action-item-circle" style={{ background: item.bg, color: item.color, border: 'none' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center' }}>{item.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FOLD 3: Popular Categories */}
          <section className="popular-categories-section">
            <div className="flex-row-between" style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Popular Categories</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => setCategoriesExpanded(!categoriesExpanded)}>
                {categoriesExpanded ? "View Less" : "View All"}
              </span>
            </div>
            
            <div className="categories-grid-split">
              {[
                { name: "Men's Wear", img: "./Men.png", price: "399", cat: "mens", sub: "Suits, Kurtas, Shirts & more", icon: <User size={16} /> },
                { name: "Women's Wear", img: "./Women.png", price: "499", cat: "womens", sub: "Sarees, Dresses, Kurtis & more", icon: <Heart size={16} /> },
                { name: "Bridal Wear", img: "./Bridal.png", price: "1,999", cat: "bridal", sub: "Lehenga, Saree, Gown & more", icon: <Sparkles size={16} /> },
                { name: "Kids Wear", img: "./Kids.png", price: "349", cat: "kids", sub: "Ethnic, Western, Party & more", icon: <Star size={16} /> },
                { name: "Alterations", img: "./Alteration.png", price: "149", cat: "alterations", sub: "Perfect Fit, Repairs & more", icon: <Scissors size={16} /> },
                { name: "Bags & Leather", img: "./Bags And Leather.png", price: "699", cat: "bags", sub: "Custom Bags, Wallets & more", icon: <Shield size={16} /> },
                { name: "Shoes & Slippers", img: "./Shoes And Slippers.png", price: "499", cat: "shoes", sub: "Custom Shoes, Sandals & more", icon: <Sliders size={16} /> },
                { name: "Vehicle Seat Covers", img: "./Vehicle Seat Covers.png", price: "799", cat: "vehicle", sub: "Premium leather & fabric covers", icon: <Truck size={16} /> },
                { name: "Custom Design", img: "./Custom Design.png", price: "999", cat: "custom", sub: "Bespoke tailoring design layouts", icon: <Upload size={16} /> },
                { name: "Pets", img: "./Pets.png", price: "299", cat: "pets", sub: "Cute custom outfits & accessories", icon: <Sparkles size={16} /> },
                { name: "Uniforms", img: "./Uniform.png", price: "349", cat: "uniforms", sub: "School, Corporate & Industrial", icon: <Layers size={16} /> }
              ].slice(0, categoriesExpanded ? undefined : 7).map((category, idx) => (
                <div key={idx} className="category-card-split" onClick={() => {
                  setSelectedCategory(category.cat);
                  setActiveHub('category-landing');
                  if (setCustomerCategory) setCustomerCategory(category.cat);
                }}>
                  <div className="category-card-split-icon-box">
                    {category.icon}
                  </div>
                  <div className="category-card-split-left">
                    <img src={category.img} alt={category.name} className="category-card-split-img" />
                  </div>
                  <div className="category-card-split-right">
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 4px 0', color: colorTextPrimary }}>{category.name}</h4>
                      <p style={{ fontSize: '0.72rem', color: colorTextSecondary, margin: 0 }}>{category.sub}</p>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: colorTextMuted }}>
                      Starting <strong style={{ color: 'var(--primary)' }}>₹{category.price}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>



          {/* FOLD 4: Recommended For You & Nearby Tailors */}
          <div className="equal-two-column-grid">
            
            {/* Column 1: Recommended For You */}
            <div className="discovery-hub-column" style={{ background: bgCard, border: '1px solid ' + borderColor }}>
              <div className="flex-row-between" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Recommended For You</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => setActiveHub('designers')}>View All</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {[
                  { title: 'Linen Blend Kurta', price: 1299, img: '/Linen Blend Kurta.png', cat: 'mens' },
                  { title: 'Pastel Blue Suit', price: 6499, img: '/Pastel Blue Suit.png', cat: 'mens' },
                  { title: 'Silk Designer Saree', price: 3299, img: '/Silk Designer Saree.png', cat: 'womens' },
                  { title: 'Velvet Bandhgala', price: 5999, img: '/Velvet Bandhgala.png', cat: 'mens' }
                ].map((item, idx) => (
                  <div key={idx} className="recommended-design-card" style={{ height: '270px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} onClick={() => {
                    setSelectedCategory(item.cat);
                    setActiveHub('tailors');
                    setWizardOpen(true);
                    setWizardStep(1);
                  }}>
                    <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
                      <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
                      <button className="btn btn-ghost" style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }} onClick={(e) => { e.stopPropagation(); alert("Saved to Wishlist Inspirations!"); }}>
                        <Heart size={14} style={{ color: 'var(--primary)' }} />
                      </button>
                    </div>
                    <div style={{ padding: '8px 10px 10px 10px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '60px' }}>
                      <h4 style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 0 2px 0' }}>{item.title}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 'bold' }}>₹{item.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Nearby Tailors */}
            <div className="discovery-hub-column" style={{ background: bgCard, border: '1px solid ' + borderColor }}>
              <div className="flex-row-between" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Nearby Tailors</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => { setActiveHub('tailors'); setWizardOpen(false); if (setCustomerHub) setCustomerHub('tailors'); }}>View All</span>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', height: '270px' }}>
                {/* Map container */}
                <div 
                  ref={mapContainerRef} 
                  style={{ 
                    width: '50%', 
                    height: '100%', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    border: '2.5px solid var(--primary)',
                    boxShadow: '0 0 15px rgba(247, 37, 133, 0.45)',
                    position: 'relative',
                    background: '#eae3d5'
                  }}
                >
                  {!window.L && (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(247,37,133,0.15) 10%, transparent 10.5%), linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
                      backgroundSize: '100% 100%, 20px 20px, 20px 20px',
                      position: 'relative'
                    }}>
                      <div style={{ position: 'absolute', top: '35%', left: '30%', transform: 'translate(-50%, -50%)' }}>
                        <MapPin size={18} style={{ color: 'var(--primary)' }} />
                      </div>
                      <div style={{ position: 'absolute', top: '65%', left: '70%', transform: 'translate(-50%, -50%)' }}>
                        <MapPin size={18} style={{ color: 'var(--accent)' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Tailors list */}
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  {[
                    { name: 'Royal Bespoke', rating: 4.8, reviews: 245, distance: '1.2 km', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80' },
                    { name: 'Stitch House', rating: 4.6, reviews: 189, distance: '2.1 km', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80' },
                    { name: 'Bridal Masters', rating: 4.7, reviews: 312, distance: '3.5 km', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80' }
                  ].map((t, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', borderBottom: idx < 2 ? '1px solid var(--border-color)' : 'none', paddingBottom: idx < 2 ? '8px' : '0' }}>
                      <img src={t.avatar} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flexGrow: 1, minWidth: 0, paddingLeft: '4px' }}>
                        <h5 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 3px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</h5>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '1px', fontWeight: 'bold' }}>
                            <Star size={10} fill="#fbbf24" style={{ color: '#fbbf24' }} /> {t.rating}
                          </span>
                          <span>({t.reviews})</span>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: '600', flexShrink: 0, paddingRight: '8px' }}>
                        {t.distance}
                      </div>
                      <button className="btn btn-ghost" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(247,37,133,0.06)', color: 'var(--primary)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }} onClick={(e) => { e.stopPropagation(); alert(`Dialing tailors booking line for ${t.name}: +91 98765 43210`); }}>
                        <Phone size={12} style={{ color: 'var(--primary)' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* FOLD 5: Trending Designs & Premium Fabrics */}
          <div className="equal-two-column-grid">
            
            {/* Column 1: Trending Designs Slider */}
            <div className="discovery-hub-column" style={{ position: 'relative', background: bgCard, border: '1px solid ' + borderColor }}>
              <div className="flex-row-between" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Trending Designs</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => setActiveHub('designers')}>View All</span>
              </div>

              <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
                <button 
                  className="btn btn-ghost" 
                  onClick={() => scrollTrending('left')}
                  style={{ 
                    position: 'absolute', 
                    left: '-8px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 10,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    padding: 0
                  }}
                >
                  <ChevronLeft size={14} />
                </button>

                <div 
                  ref={trendingCarouselRef}
                  className="hide-scrollbar"
                  style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    overflowX: 'auto', 
                    scrollBehavior: 'smooth', 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    padding: '4px 0',
                    width: '100%'
                  }}
                >
                  {[
                    { title: 'Indo Western', price: 4999, img: '/bridal2.jpg', cat: 'mens' },
                    { title: 'Anarkali Suit', price: 2999, img: '/bridal3.jpg', cat: 'womens' },
                    { title: 'Designer Lehenga', price: 8999, img: '/bridal4.jpg', cat: 'bridal' },
                    { title: 'Bandhgala Suit', price: 5499, img: '/bridal 5.jpg', cat: 'mens' },
                    { title: 'Party Gown', price: 3999, img: '/bridal6.jpg', cat: 'womens' }
                  ].map((item, idx) => (
                    <div key={idx} className="recommended-design-card" style={{ minWidth: 'calc((100% - 36px) / 4)', width: 'calc((100% - 36px) / 4)', height: '270px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} onClick={() => {
                      setSelectedCategory(item.cat);
                      setActiveHub('tailors');
                      setWizardOpen(true);
                      setWizardStep(1);
                    }}>
                      <div style={{ height: '210px', overflow: 'hidden' }}>
                        <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
                      </div>
                      <div style={{ padding: '8px 10px 10px 10px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '60px' }}>
                        <h4 style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 0 2px 0' }}>{item.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 'bold' }}>₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="btn btn-ghost" 
                  onClick={() => scrollTrending('right')}
                  style={{ 
                    position: 'absolute', 
                    right: '-8px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 10,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    padding: 0
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Column 2: Premium Fabrics */}
            <div className="discovery-hub-column" style={{ position: 'relative', background: bgCard, border: '1px solid ' + borderColor }}>
              <div className="flex-row-between" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Premium Fabrics</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => setActiveHub('fabrics')}>View Store</span>
              </div>
              
              <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
                <button 
                  className="btn btn-ghost" 
                  onClick={() => scrollFabrics('left')}
                  style={{ 
                    position: 'absolute', 
                    left: '-8px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 10,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    padding: 0
                  }}
                >
                  <ChevronLeft size={14} />
                </button>

                <div 
                  ref={fabricsCarouselRef}
                  className="hide-scrollbar"
                  style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    overflowX: 'auto', 
                    scrollBehavior: 'smooth', 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    padding: '4px 0',
                    width: '100%'
                  }}
                >
                  {[
                    { name: 'Italian Wool', price: 1299, img: '/fab1.jpg' },
                    { name: 'Pure Linen', price: 899, img: '/fab3.jpg' },
                    { name: 'Banarasi Silk', price: 1999, img: '/banarasi.jpg' },
                    { name: 'Egyptian Cotton', price: 599, img: '/fab2.jpg' }
                  ].map((fab, idx) => (
                    <div key={idx} className="recommended-design-card" style={{ minWidth: 'calc((100% - 36px) / 4)', width: 'calc((100% - 36px) / 4)', height: '270px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} onClick={() => setActiveHub('fabrics')}>
                      <div style={{ height: '210px', overflow: 'hidden' }}>
                        <img src={fab.img} alt={fab.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '8px 10px 10px 10px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '60px' }}>
                        <h4 style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0 0 2px 0' }}>{fab.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 'bold' }}>₹{fab.price}/m</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="btn btn-ghost" 
                  onClick={() => scrollFabrics('right')}
                  style={{ 
                    position: 'absolute', 
                    right: '-8px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 10,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    padding: 0
                  }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* FOLD 6: Order Again & Saved Measurements */}
          <div className="equal-two-column-grid">
            
            {/* Column 1: Order Again */}
            <div className="discovery-hub-column" style={{ background: bgCard, border: '1px solid ' + borderColor }}>
              <div className="flex-row-between" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Order Again</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => setActiveHub('history')}>View All</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { name: 'Black Blazer', date: 'Delivered on 12 Apr', price: 4999, img: '/men1.jpg', cat: 'mens' },
                  { name: 'White Cotton Shirt', date: 'Delivered on 02 Apr', price: 1299, img: '/men3.jpg', cat: 'mens' },
                  { name: 'Navy Blue Suit', date: 'Delivered on 15 Mar', price: 6499, img: '/men2.jpg', cat: 'mens' }
                ].map((item, idx) => (
                  <div key={idx} style={{ border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: bgInput }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src={item.img} alt={item.name} style={{ width: '64px', height: '80px', borderRadius: '8px', objectFit: 'cover', background: bgInput }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
                        <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', margin: '0 0 2px 0' }}>{item.date}</p>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="btn" 
                      style={{ 
                        width: '100%', 
                        marginTop: '12px', 
                        padding: '6px 12px', 
                        fontSize: '0.72rem', 
                        fontWeight: 'bold',
                        border: '1.5px solid var(--primary)', 
                        color: 'var(--primary)', 
                        background: bgCard, 
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }} 
                      onClick={() => {
                        addOrder({
                          serviceName: `${item.name} (Repeat)`,
                          tailorName: 'Royal Bespoke',
                          price: item.price,
                          date: 'June 28, 2026',
                          status: 'order_placed',
                          category: item.cat
                        });
                        alert(`${item.name} repeat order placed successfully!`);
                      }}
                    >
                      Repeat Order
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Saved Measurements */}
            <div className="discovery-hub-column" style={{ background: bgCard, border: '1px solid ' + borderColor }}>
              <div className="flex-row-between" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Saved Measurements</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => { setSelectedProfile(measurementProfiles[0]); setIsEditingProfile(true); }}>View All</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', alignItems: 'center' }}>
                {[
                  { name: 'Kiran (Self)', date: 'Updated 12 Apr', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80', profileIdx: 0 },
                  { name: 'Father', date: 'Updated 10 Apr', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80', profileIdx: 1 },
                  { name: 'Mother', date: 'Updated 08 Apr', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80', profileIdx: 2 }
                ].map((item, idx) => (
                  <div key={idx} className="measurement-circle-wrapper" onClick={() => {
                    setSelectedProfile(measurementProfiles[item.profileIdx] || measurementProfiles[0]);
                    setIsEditingProfile(true);
                  }}>
                    <div className="measurement-circle-avatar" style={{ width: '76px', height: '76px', border: '2px solid var(--border-color)' }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '8px', display: 'block' }}>{item.name}</span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{item.date}</span>
                  </div>
                ))}
                
                {/* Add New profile bubble */}
                <div className="measurement-circle-wrapper" onClick={() => setIsAddingProfile(true)}>
                  <div className="measurement-circle-avatar" style={{ width: '76px', height: '76px', border: '2px dashed var(--primary)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Plus size={28} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '8px', display: 'block' }}>Add New</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>&nbsp;</span>
                </div>
              </div>
            </div>

          </div>

          {/* FOLD 7: Trust Badges Row */}
          <section className="trust-badges-section">
            <div className="trust-badges-row">
              <div className="trust-badge-item">
                <Shield size={24} style={{ color: 'var(--primary)' }} />
                <h5 style={{ fontSize: '0.85rem', fontWeight: '800', margin: '4px 0 2px 0', color: 'var(--text-primary)' }}>100+ Verified Tailors</h5>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Across India</span>
              </div>
              <div className="trust-badge-item">
                <Scissors size={24} style={{ color: 'var(--accent)' }} />
                <h5 style={{ fontSize: '0.85rem', fontWeight: '800', margin: '4px 0 2px 0', color: 'var(--text-primary)' }}>Perfect Fit Guarantee</h5>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Or we'll alter for free</span>
              </div>
              <div className="trust-badge-item">
                <Truck size={24} style={{ color: 'var(--primary)' }} />
                <h5 style={{ fontSize: '0.85rem', fontWeight: '800', margin: '4px 0 2px 0', color: 'var(--text-primary)' }}>On-Time Delivery</h5>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Or get 10% cashback</span>
              </div>
              <div className="trust-badge-item">
                <Sparkles size={24} style={{ color: 'var(--accent)' }} />
                <h5 style={{ fontSize: '0.85rem', fontWeight: '800', margin: '4px 0 2px 0', color: 'var(--text-primary)' }}>Premium Quality</h5>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Fabrics & Stitching</span>
              </div>
              <div className="trust-badge-item">
                <CreditCard size={24} style={{ color: 'var(--primary)' }} />
                <h5 style={{ fontSize: '0.85rem', fontWeight: '800', margin: '4px 0 2px 0', color: 'var(--text-primary)' }}>Secure Payments</h5>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>100% Safe & Secure</span>
              </div>
              <div className="trust-badge-item">
                <RefreshCw size={24} style={{ color: 'var(--accent)' }} />
                <h5 style={{ fontSize: '0.85rem', fontWeight: '800', margin: '4px 0 2px 0', color: 'var(--text-primary)' }}>Easy Returns</h5>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Hassle-free returns</span>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && selectedProfile && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>Edit {selectedProfile.name} Profile</h3>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem', padding: 0 }} onClick={() => setIsEditingProfile(false)}>✕</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Profile Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={selectedProfile.name}
                  onChange={(e) => setSelectedProfile({ ...selectedProfile, name: e.target.value })}
                />
              </div>

              <div className="grid-cols-2" style={{ gap: '12px' }}>
                {selectedProfile.chest && (
                  <div className="form-group">
                    <label className="form-label">Chest (inches)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={selectedProfile.chest}
                      onChange={(e) => setSelectedProfile({ ...selectedProfile, chest: e.target.value })}
                    />
                  </div>
                )}
                {selectedProfile.bust && (
                  <div className="form-group">
                    <label className="form-label">Bust (inches)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={selectedProfile.bust}
                      onChange={(e) => setSelectedProfile({ ...selectedProfile, bust: e.target.value })}
                    />
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Waist (inches)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={selectedProfile.waist}
                    onChange={(e) => setSelectedProfile({ ...selectedProfile, waist: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Shoulder (inches)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={selectedProfile.shoulder}
                    onChange={(e) => setSelectedProfile({ ...selectedProfile, shoulder: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Length (inches)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={selectedProfile.length}
                    onChange={(e) => setSelectedProfile({ ...selectedProfile, length: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button className="btn btn-secondary" onClick={() => setIsEditingProfile(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                setMeasurementProfiles(measurementProfiles.map(p => p.id === selectedProfile.id ? selectedProfile : p));
                setIsEditingProfile(false);
                alert("Profile Updated Successfully!");
              }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PROFILE MODAL */}
      {isAddingProfile && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>Add New Measurements Profile</h3>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem', padding: 0 }} onClick={() => setIsAddingProfile(false)}>✕</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Profile Name (e.g. Sister, Cousin)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter name"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category Profile Type</label>
                <select 
                  className="form-input" 
                  value={newProfileType} 
                  onChange={(e) => setNewProfileType(e.target.value)}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div className="grid-cols-2" style={{ gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{newProfileType === 'Women' ? 'Bust (inches)' : 'Chest (inches)'}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="36"
                    value={newProfileMeasurements.chest}
                    onChange={(e) => setNewProfileMeasurements({ ...newProfileMeasurements, chest: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Waist (inches)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="30"
                    value={newProfileMeasurements.waist}
                    onChange={(e) => setNewProfileMeasurements({ ...newProfileMeasurements, waist: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Shoulder (inches)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="16"
                    value={newProfileMeasurements.shoulder}
                    onChange={(e) => setNewProfileMeasurements({ ...newProfileMeasurements, shoulder: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Length (inches)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="27"
                    value={newProfileMeasurements.length}
                    onChange={(e) => setNewProfileMeasurements({ ...newProfileMeasurements, length: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button className="btn btn-secondary" onClick={() => setIsAddingProfile(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                if (!newProfileName) {
                  alert("Please enter a profile name.");
                  return;
                }
                const newId = measurementProfiles.length + 1;
                const newP = {
                  id: newId,
                  name: newProfileName,
                  type: newProfileType,
                  ...(newProfileType === 'Women' ? { bust: newProfileMeasurements.chest } : { chest: newProfileMeasurements.chest }),
                  waist: newProfileMeasurements.waist,
                  shoulder: newProfileMeasurements.shoulder,
                  length: newProfileMeasurements.length
                };
                setMeasurementProfiles([...measurementProfiles, newP]);
                setIsAddingProfile(false);
                setNewProfileName('');
                alert("Measurements Profile Created Successfully!");
              }}>
                Add Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MY PROFILE OPTIONS POPUP MODAL */}
      {isMyProfileOpen && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div style={{
            background: theme === 'dark' ? '#121020' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#0f172a',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            position: 'relative',
            gap: '24px'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>My Profile</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Manage your account and preferences</p>
              </div>
              <button 
                style={{ 
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
                  border: 'none', 
                  color: 'var(--text-secondary)', 
                  cursor: 'pointer', 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.1rem'
                }} 
                onClick={() => setIsMyProfileOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Body: Two columns layout */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
              {/* Left Column: Sidebar Navigation */}
              <div style={{ flex: '0 0 260px', borderRight: '1px solid var(--border-color)', paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'edit', label: 'Edit Profile', desc: 'Update your personal information', icon: <User size={16} /> },
                  { id: 'password', label: 'Change Password', desc: 'Update your account password', icon: <Shield size={16} /> },
                  { id: 'notifications', label: 'Notification Preferences', desc: 'Manage email and push notifications', icon: <Bell size={16} /> },
                  { id: 'payments', label: 'Payment Methods', desc: 'Manage your saved payment options', icon: <CreditCard size={16} /> },
                  { id: 'privacy', label: 'Privacy Settings', desc: 'Control your privacy and data', icon: <Shield size={16} /> }
                ].map((item) => {
                  const isActive = activeProfileTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveProfileTab(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                        padding: '12px',
                        border: 'none',
                        borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                        borderRadius: '8px',
                        background: isActive ? (theme === 'dark' ? 'rgba(247,37,133,0.08)' : 'rgba(247,37,133,0.04)') : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ color: isActive ? 'var(--primary)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                        {item.icon}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: isActive ? '700' : '600', color: isActive ? 'var(--primary)' : 'var(--text-primary)' }}>
                          {item.label}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Active Content Panel */}
              <div style={{ flex: '1', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeProfileTab === 'edit' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Header Panel */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700' }}>Edit Profile</h3>
                        <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Update your personal information</p>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <button 
                          onClick={() => setIsPhotoDropdownOpen(!isPhotoDropdownOpen)}
                          style={{
                            background: 'none',
                            border: '1px solid var(--primary)',
                            color: 'var(--primary)',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <Camera size={14} /> Edit Photo
                        </button>

                        {isPhotoDropdownOpen && (
                          <div style={{
                            position: 'absolute',
                            top: '36px',
                            right: '0',
                            background: theme === 'dark' ? '#1c1830' : '#ffffff',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            padding: '6px 0',
                            zIndex: 1300,
                            width: '180px'
                          }}>
                            <button
                              onClick={() => fileInputRef.current.click()}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '8px 12px',
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-primary)',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                              }}
                            >
                              <Upload size={14} style={{ color: 'var(--primary)' }} /> Upload from Device
                            </button>
                            <button
                              onClick={handleCameraCapture}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '8px 12px',
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-primary)',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                              }}
                            >
                              <Camera size={14} style={{ color: 'var(--primary)' }} /> Take Photo (Camera)
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hidden input for profile photo uploads */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                    />

                    {/* Avatar Display */}
                    <div 
                      onClick={() => setIsPhotoDropdownOpen(!isPhotoDropdownOpen)}
                      style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 10px auto', cursor: 'pointer' }}
                    >
                      <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)' }}>
                        <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        background: 'var(--primary)',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${theme === 'dark' ? '#121020' : '#ffffff'}`
                      }}>
                        <Camera size={12} style={{ color: '#fff' }} />
                      </div>
                    </div>

                    {/* Input Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                      {/* Name */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                          <User size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input 
                            type="text" 
                            className="form-input" 
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                          <MessageSquare size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input 
                            type="email" 
                            className="form-input" 
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={profileEmail}
                            onChange={(e) => setProfileEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                          <Phone size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input 
                            type="text" 
                            className="form-input" 
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={profilePhone}
                            onChange={(e) => setProfilePhone(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* DOB */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Date of Birth</label>
                        <div style={{ position: 'relative' }}>
                          <Calendar size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input 
                            type="text" 
                            className="form-input" 
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={profileDob}
                            onChange={(e) => setProfileDob(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Gender</label>
                        <div style={{ position: 'relative' }}>
                          <User size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <select 
                            className="form-select" 
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={profileGender}
                            onChange={(e) => setProfileGender(e.target.value)}
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Address */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / span 2' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Address</label>
                        <div style={{ position: 'relative' }}>
                          <MapPin size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input 
                            type="text" 
                            className="form-input" 
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={profileAddress}
                            onChange={(e) => setProfileAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>City</label>
                        <div style={{ position: 'relative' }}>
                          <Home size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input 
                            type="text" 
                            className="form-input" 
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={profileCity}
                            onChange={(e) => setProfileCity(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* State */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>State</label>
                        <div style={{ position: 'relative' }}>
                          <Map size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <select 
                            className="form-select" 
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={profileState}
                            onChange={(e) => setProfileState(e.target.value)}
                          >
                            <option value="Karnataka">Karnataka</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                          </select>
                        </div>
                      </div>

                      {/* PIN Code */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>PIN Code</label>
                        <div style={{ position: 'relative' }}>
                          <MapPin size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                          <input 
                            type="text" 
                            className="form-input" 
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={profilePin}
                            onChange={(e) => setProfilePin(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeProfileTab === 'password' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700' }}>Change Password</h3>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Update your account password</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Current Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" style={{ width: '100%' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>New Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" style={{ width: '100%' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Confirm New Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                )}

                {activeProfileTab === 'notifications' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700' }}>Notification Preferences</h3>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Manage email and push notifications</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { title: 'Email Notifications', desc: 'Receive order confirmation, tracking updates and styling ideas.', value: emailNotif, setter: setEmailNotif },
                        { title: 'SMS Notifications', desc: 'Get instant alerts about delivery scheduling and tailor assignments.', value: smsNotif, setter: setSnsNotif },
                        { title: 'Push Notifications', desc: 'Receive real-time chat updates and promotion campaign alerts.', value: pushNotif, setter: setPushNotif }
                      ].map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                          <div>
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', color: 'var(--text-primary)' }}>{item.title}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                          </div>
                          <div 
                            onClick={() => item.setter(!item.value)}
                            style={{
                              width: '44px',
                              height: '24px',
                              borderRadius: '12px',
                              background: item.value ? 'var(--primary)' : 'var(--text-muted)',
                              position: 'relative',
                              cursor: 'pointer',
                              transition: 'background 0.2s ease'
                            }}
                          >
                            <div style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: '#fff',
                              position: 'absolute',
                              top: '3px',
                              left: item.value ? '23px' : '3px',
                              transition: 'left 0.2s ease',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeProfileTab === 'payments' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700' }}>Payment Methods</h3>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Manage your saved payment options</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { type: 'Visa', number: '•••• •••• •••• 4242', exp: '12/28', primary: true },
                        { type: 'MasterCard', number: '•••• •••• •••• 5555', exp: '06/29', primary: false }
                      ].map((card, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '12px',
                          background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <CreditCard size={24} style={{ color: 'var(--primary)' }} />
                            <div>
                              <span style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', color: 'var(--text-primary)' }}>{card.type} {card.number}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expires {card.exp} {card.primary && <span style={{ color: 'var(--primary)', fontWeight: 'bold', marginLeft: '6px' }}>(Primary)</span>}</span>
                            </div>
                          </div>
                          <button style={{ background: 'none', border: 'none', color: '#ff4444', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>Delete</button>
                        </div>
                      ))}
                      
                      <button className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }}>+ Add New Card</button>
                    </div>
                  </div>
                )}

                {activeProfileTab === 'privacy' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700' }}>Privacy Settings</h3>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Control your privacy and data</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { title: 'Profile Visibility', desc: 'Allow other StitchBee community members to view your design portfolio.', value: profileVisible, setter: setProfileVisible },
                        { title: 'Search Engine Indexing', desc: 'Include your profile and styling boards in search engine results.', value: searchIndex, setter: setSearchIndex },
                        { title: 'Anonymous Usage Sharing', desc: 'Share anonymous performance and feature usage data to help us build a better app.', value: anonymousSharing, setter: setAnonymousSharing }
                      ].map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                          <div>
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', color: 'var(--text-primary)' }}>{item.title}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                          </div>
                          <div 
                            onClick={() => item.setter(!item.value)}
                            style={{
                              width: '44px',
                              height: '24px',
                              borderRadius: '12px',
                              background: item.value ? 'var(--primary)' : 'var(--text-muted)',
                              position: 'relative',
                              cursor: 'pointer',
                              transition: 'background 0.2s ease'
                            }}
                          >
                            <div style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: '#fff',
                              position: 'absolute',
                              top: '3px',
                              left: item.value ? '23px' : '3px',
                              transition: 'left 0.2s ease',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                  <button className="btn btn-secondary" onClick={() => setIsMyProfileOpen(false)} style={{ padding: '10px 24px' }}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => {
                    alert("Profile Settings Saved Successfully!");
                    setIsMyProfileOpen(false);
                  }} style={{ padding: '10px 24px' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- HUB 0: SERVICE CATEGORY LANDING HUB --- */}
      {activeHub === 'category-landing' && (
        <ServiceCategoryView 
          categoryKey={selectedCategory}
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          onExploreDesigns={() => {
            const el = document.getElementById('popular-designs-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              setActiveHub('designers');
            }
          }}
          onViewFabrics={() => {
            setActiveHub('fabrics');
          }}
          onBookStitching={(design = null) => {
            if (!currentUser) {
              if (onLoginRequired) onLoginRequired();
              return;
            }
            setSelectedWizardCategory(selectedCategory);
            setSelectedDesign(design);
            setAddFabric(false);
            setWizardStep(1);
            setWizardOpen(true);
            setActiveHub('tailors');
          }}
          tailors={tailors}
        />
      )}

      {/* --- HUB 1: TAILORS MARKETPLACE (DASHBOARD) --- */}
      {activeHub === 'tailors' && !wizardOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Header section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Tailors <span style={{ color: 'var(--primary)' }}>Near You</span>
                <MapPin size={24} style={{ color: 'var(--primary)' }} />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>Find trusted tailors in your area for perfect stitching.</p>
            </div>
            
            <div style={{ background: bgActiveOption, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 12px rgba(247,37,133,0.02)' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>Showing results near</span>
                <strong style={{ fontSize: '0.88rem', color: 'var(--primary)' }}>{searchLocationName}</strong>
              </div>
              <button 
                className="btn btn-ghost" 
                onClick={handleGetLiveLocation}
                disabled={isLocating}
                style={{ 
                  background: 'rgba(247,37,133,0.06)', 
                  border: '1.5px solid var(--primary)', 
                  color: 'var(--primary)', 
                  borderRadius: '8px', 
                  fontSize: '0.78rem', 
                  padding: '6px 12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isLocating ? 'Locating...' : 'Change Location ⚙'}
              </button>
            </div>
          </div>

          {/* Search bar & Tabs */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: bgCard, border: `1.5px solid ${borderColor}`, borderRadius: '16px', padding: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: bgInput, borderRadius: '12px', padding: '6px', border: `1px solid ${borderColor}`, gap: '4px' }}>
              <button 
                onClick={() => { setSearchMode('area'); setSearchQueryText(''); }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  background: searchMode === 'area' ? bgActiveOption : 'transparent',
                  color: searchMode === 'area' ? 'var(--primary)' : 'var(--text-secondary)',
                  boxShadow: searchMode === 'area' ? '0 2px 8px rgba(247,37,133,0.1)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <MapPin size={14} style={{ color: searchMode === 'area' ? 'var(--primary)' : 'var(--text-secondary)' }} /> Search by Area
              </button>
              <button 
                onClick={() => { setSearchMode('city'); setSearchQueryText(''); }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  background: searchMode === 'city' ? bgActiveOption : 'transparent',
                  color: searchMode === 'city' ? 'var(--primary)' : 'var(--text-secondary)',
                  boxShadow: searchMode === 'city' ? '0 2px 8px rgba(247,37,133,0.1)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Home size={14} style={{ color: searchMode === 'city' ? 'var(--primary)' : 'var(--text-secondary)' }} /> Search by City
              </button>
            </div>

            {/* Input field with magnifying glass */}
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder={searchMode === 'area' ? "Search area, locality or landmark..." : "Search by city (e.g. Bangalore, Chennai, Mumbai, Delhi)..."}
                value={searchQueryText}
                onChange={(e) => setSearchQueryText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 44px',
                  borderRadius: '12px',
                  border: `1.5px solid ${borderColor}`,
                  fontSize: '0.9rem',
                  outline: 'none',
                  background: bgInput,
                  color: colorTextPrimary,
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
                }}
              />
            </div>

            {/* Search Button */}
            <button 
              className="btn btn-primary"
              onClick={() => {
                if (searchQueryText.trim() !== '') {
                  setSearchLocationName(`${searchQueryText}, ${searchMode === 'area' ? 'Bangalore' : 'India'}`);
                }
              }}
              style={{ background: 'var(--primary)', border: 'none', borderRadius: '12px', padding: '12px 32px', fontWeight: '800', fontSize: '0.9rem', boxShadow: 'var(--shadow-glow)', cursor: 'pointer' }}
            >
              Search
            </button>
          </div>

          {/* Two Column Layout (Map + List | Filters) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
            
            {/* Left Column: Map + List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Map container */}
              <div style={{ height: '360px', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
                {/* Real Leaflet Map */}
                <div ref={tailorsMapRef} style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}></div>
                
                {/* Map Locate overlay */}
                <div style={{ position: 'absolute', right: '12px', bottom: '12px', zIndex: 10 }}>
                  <button 
                    onClick={handleGetLiveLocation} 
                    disabled={isLocating}
                    style={{ 
                      background: bgCard, 
                      border: `1px solid ${borderColor}`, 
                      borderRadius: '8px', 
                      width: '36px', 
                      height: '36px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.2s'
                    }} 
                    title="Locate Me"
                  >
                    {isLocating ? '⏳' : '🎯'}
                  </button>
                </div>
              </div>

              {/* Tailors Results list */}
              <div>
                <div className="flex-row-between" style={{ marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>
                      Showing <span style={{ color: 'var(--primary)' }}>{sortedNearByTailors.length} tailors</span> near you
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Within {filterRadius} km from {searchLocationName}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sort by:</span>
                    <select 
                      value={filterSortBy}
                      onChange={(e) => setFilterSortBy(e.target.value)}
                      style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.8rem', background: '#fff', outline: 'none' }}
                    >
                      <option value="Distance">Distance: Nearest First</option>
                      <option value="Rating">Rating: Highest First</option>
                      <option value="Reviews">Popularity: Most Reviewed</option>
                    </select>
                  </div>
                </div>

                {/* Cards List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {sortedNearByTailors.length > 0 ? (
                    sortedNearByTailors.map((tailor) => (
                      <div 
                        key={tailor.id} 
                        className="glass-card-no-hover"
                        style={{ padding: '16px', display: 'flex', gap: '16px', borderRadius: '16px', background: '#fff', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}
                      >
                        <img 
                          src={tailor.img} 
                          alt={tailor.name} 
                          style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', background: '#f8fafc', flexShrink: 0 }} 
                        />
                        
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                              <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {tailor.name}
                                <span style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>✓</span>
                              </h4>
                              <span style={{ background: '#eafaf1', color: '#2e7d32', padding: '2px 8px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 'bold' }}>
                                {tailor.status}
                              </span>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '0.78rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 'bold' }}>
                                ★ {tailor.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>({tailor.reviews} reviews)</span>
                              </span>
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>|</span>
                              <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                📍 {tailor.area}, {tailor.city}
                              </span>
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>|</span>
                              <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 'bold' }}>
                                🚗 {tailor.computedDistance.toFixed(1)} km away
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                            {tailor.tags.map((tag, tIdx) => (
                              <span key={tIdx} style={{ background: bgInput, color: colorTextSecondary, fontSize: '0.68rem', padding: '3px 8px', borderRadius: '4px', fontWeight: '500' }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>
                          <button 
                            className="btn"
                            onClick={() => startWizardWithTailor(tailor)}
                            style={{ 
                              border: '1.5px solid var(--primary)', 
                              color: 'var(--primary)', 
                              background: bgCard, 
                              borderRadius: '8px', 
                              padding: '8px 16px', 
                              fontSize: '0.8rem', 
                              fontWeight: 'bold',
                              cursor: 'pointer'
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '40px', textAlign: 'center', background: bgInput, borderRadius: '16px', border: '1.5px dashed var(--border-color)', color: 'var(--text-muted)' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>No tailors match your search filters.</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem' }}>Try expanding your search radius or clearing query filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Filters Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Refine Search filter card */}
              <div className="discovery-hub-column" style={{ background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="flex-row-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>Refine Search</h4>
                  <button 
                    onClick={() => {
                      setFilterRadius(5);
                      setFilterServiceType('All Services');
                      setFilterMinRating(0);
                      setFilterSortBy('Distance');
                      setSearchQueryText('');
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Reset
                  </button>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Search Radius ({filterRadius} km)
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={filterRadius} 
                    onChange={(e) => setFilterRadius(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <span>1 km</span>
                    <span>10 km</span>
                    <span>20 km</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Service Type
                  </label>
                  <select 
                    value={filterServiceType}
                    onChange={(e) => setFilterServiceType(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none', background: bgCard, color: colorTextPrimary }}
                  >
                    <option value="All Services">All Services</option>
                    <option value="Men's Wear">Men's Wear</option>
                    <option value="Women's Wear">Women's Wear</option>
                    <option value="Alterations">Alterations</option>
                    <option value="Bridal Wear">Bridal Wear</option>
                    <option value="Kids Wear">Kids Wear</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Minimum Rating
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { label: '★ 4.5 & ↑', val: 4.5 },
                      { label: '★ 4.0 & ↑', val: 4.0 },
                      { label: 'Any', val: 0 }
                    ].map((rOpt) => (
                      <button 
                        key={rOpt.val}
                        onClick={() => setFilterMinRating(rOpt.val)}
                        style={{
                          padding: '6px 4px',
                          borderRadius: '6px',
                          border: `1.5px solid ${filterMinRating === rOpt.val ? 'var(--primary)' : 'var(--border-color)'}`,
                          background: filterMinRating === rOpt.val ? bgActiveOption : bgCard,
                          color: filterMinRating === rOpt.val ? 'var(--primary)' : 'var(--text-secondary)',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        {rOpt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn btn-primary"
                  style={{ width: '100%', background: 'var(--primary)', border: 'none', fontWeight: 'bold', padding: '10px' }}
                  onClick={() => alert("Filters Applied Successfully!")}
                >
                  Apply Filters
                </button>
              </div>

              {/* Call to action post request card */}
              <div className="discovery-hub-column" style={{ background: bgActiveOption, border: `1.5px dashed ${isDark ? 'rgba(247,37,133,0.4)' : 'rgba(247,37,133,0.2)'}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(247,37,133,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: 'var(--primary)' }}>
                  ✂
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>Can't find the right tailor?</h4>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                  Add your tailoring request and get connected with verified tailors.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => alert("Post a Custom Stitching Request: Tell us your fabric & styling design requirements to receive direct quotes from tailors!")}
                  style={{ width: '100%', background: 'var(--primary)', border: 'none', fontWeight: 'bold', fontSize: '0.75rem', padding: '8px' }}
                >
                  Post a Tailoring Request
                </button>
              </div>

              {/* Why choose StitchBee tailors card */}
              <div className="discovery-hub-column" style={{ background: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>Why Choose StitchBee Tailors?</h4>
                
                {[
                  { title: 'Verified & Trusted Tailors', icon: '🛡' },
                  { title: 'Quality Stitching Guaranteed', icon: '🧵' },
                  { title: 'On-time Delivery Assurance', icon: '⏰' },
                  { title: 'Multiple Payment Options', icon: '💳' }
                ].map((benefit, bIdx) => (
                  <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#374151' }}>
                    <span style={{ fontSize: '1rem' }}>{benefit.icon}</span>
                    <strong>{benefit.title}</strong>
                  </div>
                ))}
              </div>

            </div>
          </div>
          
          {/* Bottom disclaimer */}
          <div style={{ textAlign: 'center', padding: '12px', background: '#f8fafc', borderRadius: '10px', color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            🛡 All tailors are background verified for your safety and trust.
          </div>
        </div>
      )}

      {/* --- HUB 2: FABRIC MARKETPLACE --- */}
      {activeHub === 'fabrics' && (
        <div className="fabric-explorer-layout" style={{ display: 'flex', gap: '24px', minHeight: '80vh', position: 'relative' }}>
          
          {/* FILTER SIDEBAR */}
          <div className="fabric-filter-sidebar glass-card" style={{ width: '280px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0, height: 'fit-content', position: 'sticky', top: '90px' }}>
            <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}><Sliders size={16} /> Filters</h3>
              {isAnyFilterActive() && (
                <button 
                  onClick={() => setFabricFilters({
                    brand: {},
                    priceRange: [0, 10000],
                    color: {},
                    stretch: {},
                    shine: {},
                    texture: {},
                    season: {},
                    availability: {}
                  })} 
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h4 className="filter-title" style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>Price Range (per meter)</h4>
              <div className="flex-row-between" style={{ gap: '8px', fontSize: '0.8rem' }}>
                <span>₹{fabricFilters.priceRange[0]}</span>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100" 
                  value={fabricFilters.priceRange[1]} 
                  onChange={(e) => setFabricFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))} 
                  style={{ flexGrow: 1, accentColor: 'var(--primary)' }}
                />
                <span>₹{fabricFilters.priceRange[1]}</span>
              </div>
            </div>

            {/* Brand Checkboxes */}
            <div className="filter-group">
              <h4 className="filter-title" style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>Brand</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
                {['Raymond', 'Nalli', 'Kalanjali', 'Fabindia', 'Biba', 'Arvind Limited', "Siyaram's", 'Donear'].map(b => (
                  <label key={b} className="filter-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={!!fabricFilters.brand[b]} 
                      onChange={(e) => setFabricFilters(prev => ({ ...prev, brand: { ...prev.brand, [b]: e.target.checked } }))} 
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Checkboxes */}
            <div className="filter-group">
              <h4 className="filter-title" style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>Color</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
                {['Black', 'Navy Blue', 'Charcoal Grey', 'Royal Blue', 'Brown', 'Maroon', 'Beige', 'White'].map(c => (
                  <label key={c} className="filter-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={!!fabricFilters.color[c]} 
                      onChange={(e) => setFabricFilters(prev => ({ ...prev, color: { ...prev.color, [c]: e.target.checked } }))} 
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stretch Checkboxes */}
            <div className="filter-group">
              <h4 className="filter-title" style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>Stretch</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['None', 'Low', 'Medium', 'High'].map(s => (
                  <label key={s} className="filter-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={!!fabricFilters.stretch[s]} 
                      onChange={(e) => setFabricFilters(prev => ({ ...prev, stretch: { ...prev.stretch, [s]: e.target.checked } }))} 
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Shine Checkboxes */}
            <div className="filter-group">
              <h4 className="filter-title" style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>Shine</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['None', 'Subtle', 'Premium', 'High'].map(s => (
                  <label key={s} className="filter-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={!!fabricFilters.shine[s]} 
                      onChange={(e) => setFabricFilters(prev => ({ ...prev, shine: { ...prev.shine, [s]: e.target.checked } }))} 
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Season Checkboxes */}
            <div className="filter-group">
              <h4 className="filter-title" style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>Season</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Summer', 'Winter', 'Festive', 'Wedding', 'All Season'].map(s => (
                  <label key={s} className="filter-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={!!fabricFilters.season[s]} 
                      onChange={(e) => setFabricFilters(prev => ({ ...prev, season: { ...prev.season, [s]: e.target.checked } }))} 
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Checkboxes */}
            <div className="filter-group">
              <h4 className="filter-title" style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>Availability</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['In Stock', 'Low Stock'].map(a => (
                  <label key={a} className="filter-checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={!!fabricFilters.availability[a]} 
                      onChange={(e) => setFabricFilters(prev => ({ ...prev, availability: { ...prev.availability, [a]: e.target.checked } }))} 
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>{a}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN EXPLORER CONTENT */}
          <div className="fabric-explorer-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Breadcrumb Trail */}
            <div className="fabric-breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span onClick={() => setExplorerPath([])} style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 'bold' }}>Fabric Shop</span>
              {explorerPath.map((crumb, idx) => {
                let label = crumb;
                if (idx === 0) {
                  label = FABRIC_MARKETPLACE_DATA.categories[crumb]?.name || crumb;
                } else if (idx === 1) {
                  const cat = FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]];
                  label = cat?.subcategories[crumb]?.name || crumb;
                } else if (idx === 2) {
                  const cat = FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]];
                  const sub = cat?.subcategories[explorerPath[1]];
                  label = sub?.fabricTypes[crumb]?.name || crumb;
                } else if (idx === 3) {
                  const cat = FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]];
                  const sub = cat?.subcategories[explorerPath[1]];
                  const type = sub?.fabricTypes[explorerPath[2]];
                  label = type?.brands[crumb]?.name || crumb;
                } else if (idx === 4) {
                  const cat = FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]];
                  const sub = cat?.subcategories[explorerPath[1]];
                  const type = sub?.fabricTypes[explorerPath[2]];
                  const brand = type?.brands[explorerPath[3]];
                  label = brand?.collections[crumb]?.name || crumb;
                } else if (idx === 5) {
                  const cat = FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]];
                  const sub = cat?.subcategories[explorerPath[1]];
                  const type = sub?.fabricTypes[explorerPath[2]];
                  const brand = type?.brands[explorerPath[3]];
                  const coll = brand?.collections[explorerPath[4]];
                  const v = coll?.variants.find(item => item.id === crumb);
                  label = v ? v.color : crumb;
                }
                return (
                  <React.Fragment key={crumb}>
                    <ChevronRight size={12} />
                    <span 
                      onClick={() => setExplorerPath(explorerPath.slice(0, idx + 1))} 
                      style={{ cursor: 'pointer', color: idx === explorerPath.length - 1 ? '#fff' : 'var(--primary)', fontWeight: idx === explorerPath.length - 1 ? 'bold' : 'normal' }}
                    >
                      {label}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>

            {/* DUAL MODE DISPLAY */}
            {isAnyFilterActive() ? (
              // FILTERED LIST VIEW
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>Search & Filter Results</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Showing {getFilteredVariants().length} matching fabrics</p>
                </div>
                {getFilteredVariants().length === 0 ? (
                  <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>No fabrics match your selected filters.</p>
                    <button 
                      className="btn btn-primary" 
                      style={{ marginTop: '16px' }}
                      onClick={() => setFabricFilters({
                        brand: {},
                        priceRange: [0, 10000],
                        color: {},
                        stretch: {},
                        shine: {},
                        texture: {},
                        season: {},
                        availability: {}
                      })}
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {getFilteredVariants().map(v => (
                      <div key={v.id} className="glass-card fabric-product-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                        
                        {/* Wishlist Heart Toggle overlay */}
                        <button 
                          onClick={() => {
                            if (!currentUser) {
                              if (onLoginRequired) onLoginRequired();
                              return;
                            }
                            if (fabricWishlist.includes(v.id)) {
                              setFabricWishlist(fabricWishlist.filter(id => id !== v.id));
                            } else {
                              setFabricWishlist([...fabricWishlist, v.id]);
                            }
                          }}
                          style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: fabricWishlist.includes(v.id) ? 'var(--primary)' : '#fff', cursor: 'pointer', zIndex: 10 }}
                        >
                          <Heart size={16} fill={fabricWishlist.includes(v.id) ? 'var(--primary)' : 'none'} />
                        </button>

                        <img src={v.image || 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=300&q=80'} alt={v.color} style={{ width: '100%', height: '150px', borderRadius: '8px', objectFit: 'cover' }} />
                        
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 'bold' }}>{v.brandName} • {v.typeName}</span>
                          <h4 style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>{v.collName} ({v.color})</h4>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Path: {v.catName} &gt; {v.subName}</p>
                        </div>

                        <div className="flex-row-between" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', marginTop: 'auto' }}>
                          <span style={{ color: '#fff', fontWeight: '800', fontSize: '1rem' }}>₹{v.price}/m</span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button 
                              className="btn btn-secondary" 
                              style={{ padding: '6px', minWidth: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                              title="Compare"
                              onClick={() => {
                                if (fabricCompareList.includes(v.id)) {
                                  setFabricCompareList(fabricCompareList.filter(id => id !== v.id));
                                } else {
                                  if (fabricCompareList.length >= 2) {
                                    alert('You can compare a maximum of 2 fabrics.');
                                  } else {
                                    setFabricCompareList([...fabricCompareList, v.id]);
                                  }
                                }
                              }}
                            >
                              <Layers size={14} style={{ color: fabricCompareList.includes(v.id) ? 'var(--accent)' : '#fff' }} />
                            </button>
                            <button 
                              className="btn btn-primary" 
                              style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                              onClick={() => {
                                setExplorerPath([v.catKey, v.subKey, v.typeKey, v.brandKey, v.collKey, v.id]);
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // HIERARCHICAL DRILL-DOWN PANELS
              <div className="fabric-drilldown-panel">
                {explorerPath.length === 0 && (
                  // LEVEL 1: Main Categories
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Premium Fabric Marketplace</h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select a collection category to start exploring premium materials.</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                      {Object.keys(FABRIC_MARKETPLACE_DATA.categories).map(catKey => {
                        const cat = FABRIC_MARKETPLACE_DATA.categories[catKey];
                        return (
                          <div 
                            key={catKey} 
                            className="glass-card category-explorer-card" 
                            style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer', transition: 'transform 0.2s' }}
                            onClick={() => setExplorerPath([catKey])}
                          >
                            <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
                            <div className="flex-row-between">
                              <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 'bold' }}>{cat.name}</h3>
                              <ChevronRight size={20} style={{ color: 'var(--primary)' }} />
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              Explore tailored materials for {cat.name.toLowerCase()} custom suits, outfits, and seasonal specials.
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {explorerPath.length === 1 && (
                  // LEVEL 2: Subcategories
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
                        {FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]].name} Collection
                      </h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Choose an occasion or outfit wear style.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                      {Object.entries(FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]].subcategories).map(([subKey, sub]) => (
                        <div 
                          key={subKey} 
                          className="glass-card subcategory-explorer-card" 
                          style={{ padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px' }}
                          onClick={() => setExplorerPath([...explorerPath, subKey])}
                        >
                          <div className="flex-row-between">
                            <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 'bold' }}>{sub.name}</h3>
                            <ChevronRight size={18} style={{ color: 'var(--primary)' }} />
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            Premium custom tailoring and fits tailored specifically for {sub.name.toLowerCase()}.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {explorerPath.length === 2 && (
                  // LEVEL 3: Fabric Types
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Choose Fabric Material Type</h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select the raw material structure for your design.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                      {Object.entries(FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]].subcategories[explorerPath[1]].fabricTypes).map(([typeKey, type]) => (
                        <div 
                          key={typeKey} 
                          className="glass-card type-explorer-card" 
                          style={{ padding: '16px', cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}
                          onClick={() => setExplorerPath([...explorerPath, typeKey])}
                        >
                          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: 'var(--primary)', fontWeight: 'bold' }}>
                            {type.name.charAt(0)}
                          </div>
                          <h4 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1rem' }}>{type.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>View Brands</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {explorerPath.length === 3 && (
                  // LEVEL 4: Brand Selection
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Select Brand</h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Choose from our verified luxury weaving partners.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                      {Object.entries(FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]].subcategories[explorerPath[1]].fabricTypes[explorerPath[2]].brands).map(([brandKey, brand]) => (
                        <div 
                          key={brandKey} 
                          className="glass-card brand-explorer-card" 
                          style={{ padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }}
                          onClick={() => setExplorerPath([...explorerPath, brandKey])}
                        >
                          <h3 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>{brand.name}</h3>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Official Brand Store</p>
                          <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '10px', display: 'block' }}>View Collections &rarr;</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {explorerPath.length === 4 && (
                  // LEVEL 5: Collection List
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
                        {FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]].subcategories[explorerPath[1]].fabricTypes[explorerPath[2]].brands[explorerPath[3]].name} Collections
                      </h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select a weave series collection to see colors.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                      {Object.entries(FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]].subcategories[explorerPath[1]].fabricTypes[explorerPath[2]].brands[explorerPath[3]].collections).map(([collKey, coll]) => (
                        <div 
                          key={collKey} 
                          className="glass-card collection-explorer-card" 
                          style={{ padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }}
                          onClick={() => setExplorerPath([...explorerPath, collKey])}
                        >
                          <h3 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>{coll.name}</h3>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{coll.variants.length} color variants available</p>
                          <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '10px' }}>Explore Swatches &rarr;</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {explorerPath.length === 5 && (
                  // LEVEL 6: Color Variants List
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Color Swatches</h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select a color swatch to view technical specifications and buy.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                      {FABRIC_MARKETPLACE_DATA.categories[explorerPath[0]].subcategories[explorerPath[1]].fabricTypes[explorerPath[2]].brands[explorerPath[3]].collections[explorerPath[4]].variants.map(v => (
                        <div 
                          key={v.id} 
                          className="glass-card fabric-variant-card" 
                          style={{ padding: '16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px' }}
                          onClick={() => setExplorerPath([...explorerPath, v.id])}
                        >
                          <img src={v.image || 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=300&q=80'} alt={v.color} style={{ width: '100%', height: '150px', borderRadius: '8px', objectFit: 'cover' }} />
                          <div className="flex-row-between">
                            <h4 style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>{v.color}</h4>
                            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: v.color === 'Black' ? '#181818' : v.color === 'Navy Blue' ? '#0d1f3d' : v.color === 'Charcoal Grey' ? '#555' : v.color === 'Royal Blue' ? '#1c3a6b' : v.color === 'Brown' ? '#8b5a2b' : v.color === 'Maroon' ? '#800000' : v.color === 'Beige' ? '#d2b48c' : v.color === 'White' ? '#fff' : 'var(--primary)', border: '1px solid rgba(255,255,255,0.2)' }} />
                          </div>
                          <div className="flex-row-between" style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1rem' }}>₹{v.price}/m</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>View Details</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {explorerPath.length === 6 && (
                  // LEVEL 7: Detailed Swatch View Sheet
                  (() => {
                    const catKey = explorerPath[0];
                    const subKey = explorerPath[1];
                    const typeKey = explorerPath[2];
                    const brandKey = explorerPath[3];
                    const collKey = explorerPath[4];
                    const varId = explorerPath[5];
                    
                    const cat = FABRIC_MARKETPLACE_DATA.categories[catKey];
                    const sub = cat.subcategories[subKey];
                    const type = sub.fabricTypes[typeKey];
                    const brand = type.brands[brandKey];
                    const coll = brand.collections[collKey];
                    const v = coll.variants.find(item => item.id === varId);
                    
                    if (!v) return <p>Fabric not found.</p>;
                    
                    return (
                      <div className="glass-card fabric-detail-sheet" style={{ padding: '30px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px' }}>
                        {/* Left Column: Image, Zoom texture & Swatches selector */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div className="fabric-image-zoom-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', height: '320px' }}>
                            <img src={v.image || 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=300&q=80'} alt={v.color} className="fabric-detail-zoom-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease-in-out' }} />
                            <div className="zoom-text-overlay" style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.72rem', padding: '4px 8px', borderRadius: '4px' }}>
                              Hover to zoom texture feel
                            </div>
                          </div>

                          {/* Swatches picker row */}
                          <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Other Colors in this Collection:</span>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              {coll.variants.map(other => (
                                <button
                                  key={other.id}
                                  onClick={() => setExplorerPath([...explorerPath.slice(0, 5), other.id])}
                                  title={other.color}
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: other.id === varId ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.2)',
                                    background: other.color === 'Black' ? '#181818' : other.color === 'Navy Blue' ? '#0d1f3d' : other.color === 'Charcoal Grey' ? '#555' : other.color === 'Royal Blue' ? '#1c3a6b' : other.color === 'Brown' ? '#8b5a2b' : other.color === 'Maroon' ? '#800000' : other.color === 'Beige' ? '#d2b48c' : other.color === 'White' ? '#fff' : 'var(--primary)',
                                    cursor: 'pointer',
                                    transform: other.id === varId ? 'scale(1.1)' : 'scale(1)'
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Specs table, Feel ratings, CTAs */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                              {brand.name} • {coll.name}
                            </span>
                            <h2 style={{ fontSize: '1.8rem', color: '#fff', fontWeight: 'bold', marginTop: '4px' }}>
                              {type.name} Fabric in {v.color}
                            </h2>
                            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)', display: 'block', marginTop: '6px' }}>
                              ₹{v.price}/meter
                            </span>
                          </div>

                          {/* technical specs table */}
                          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '10px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>Technical Specifications</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              <div><strong>Width:</strong> {v.width || '58 inches'}</div>
                              <div><strong>GSM (Weight):</strong> {v.gsm || '280'} g/m²</div>
                              <div><strong>Texture Feel:</strong> {v.texture || 'Smooth'}</div>
                              <div><strong>Stretch Level:</strong> {v.stretch || 'Low'}</div>
                              <div><strong>Fabric Shine:</strong> {v.shine || 'Subtle'}</div>
                              <div><strong>Occasion:</strong> {sub.name}</div>
                              <div><strong>Season:</strong> {v.season || 'All Season'}</div>
                              <div><strong>Pattern Style:</strong> {v.pattern || 'Solid'}</div>
                              <div style={{ gridColumn: 'span 2' }}>
                                <strong>Availability Status:</strong> <span style={{ color: 'var(--success)' }}>{v.availability || 'In Stock'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Feel Ratings */}
                          <div style={{ display: 'flex', gap: '24px', fontSize: '0.82rem' }}>
                            <div>
                              <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Softness</span>
                              <div style={{ display: 'flex', gap: '2px', color: 'var(--warning)' }}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} size={12} fill={i < 4 ? 'var(--warning)' : 'none'} stroke="var(--warning)" />
                                ))}
                              </div>
                            </div>
                            <div>
                              <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Breathability</span>
                              <div style={{ display: 'flex', gap: '2px', color: 'var(--warning)' }}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} size={12} fill={i < 4 ? 'var(--warning)' : 'none'} stroke="var(--warning)" />
                                ))}
                              </div>
                            </div>
                            <div>
                              <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Luxury feel</span>
                              <div style={{ display: 'flex', gap: '2px', color: 'var(--warning)' }}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} size={12} fill={i < 5 ? 'var(--warning)' : 'none'} stroke="var(--warning)" />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Meters quantity selector */}
                          <div className="flex-row-between" style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '220px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#fff' }}>Length (Meters):</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <button 
                                className="btn btn-secondary" 
                                style={{ padding: '2px 8px', minHeight: '26px' }}
                                onClick={() => setSelectedMeters(prev => Math.max(1, prev - 1))}
                              >
                                -
                              </button>
                              <strong style={{ fontSize: '1rem', color: '#fff' }}>{selectedMeters}</strong>
                              <button 
                                className="btn btn-secondary" 
                                style={{ padding: '2px 8px', minHeight: '26px' }}
                                onClick={() => setSelectedMeters(prev => prev + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* CTA Actions */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px', marginTop: '10px' }}>
                            <button 
                              className="btn btn-primary"
                              onClick={() => {
                                addFabricToCart(v, selectedMeters, brand.name, coll.name);
                              }}
                            >
                              Add to Cart (₹{v.price * selectedMeters})
                            </button>
                            <button 
                              className="btn btn-secondary"
                              onClick={() => {
                                if (!currentUser) {
                                  if (onLoginRequired) onLoginRequired();
                                  return;
                                  }
                                if (fabricWishlist.includes(v.id)) {
                                  setFabricWishlist(fabricWishlist.filter(id => id !== v.id));
                                } else {
                                  setFabricWishlist([...fabricWishlist, v.id]);
                                }
                              }}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                            >
                              <Heart size={14} fill={fabricWishlist.includes(v.id) ? 'var(--primary)' : 'none'} style={{ color: fabricWishlist.includes(v.id) ? 'var(--primary)' : '#fff' }} />
                              {fabricWishlist.includes(v.id) ? 'Wishlisted' : 'Add to Wishlist'}
                            </button>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <button 
                              className="btn btn-ghost"
                              style={{ border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                              onClick={() => {
                                if (fabricCompareList.includes(v.id)) {
                                  setFabricCompareList(fabricCompareList.filter(id => id !== v.id));
                                } else {
                                  if (fabricCompareList.length >= 2) {
                                    alert('You can compare a maximum of 2 fabrics.');
                                  } else {
                                    setFabricCompareList([...fabricCompareList, v.id]);
                                  }
                                }
                              }}
                            >
                              <Layers size={14} style={{ color: fabricCompareList.includes(v.id) ? 'var(--accent)' : '#fff' }} />
                              {fabricCompareList.includes(v.id) ? 'Comparing' : 'Compare Swatch'}
                            </button>
                            <button 
                              className="btn btn-accent"
                              onClick={() => {
                                addFabricToCart(v, selectedMeters, brand.name, coll.name);
                                setCartOpen(true);
                              }}
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}
          </div>

          {/* FLOATING COMPARE BAR */}
          {fabricCompareList.length > 0 && (
            <div className="fabric-compare-bar animate-fade-in" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(20, 18, 38, 0.95)', border: '1px solid var(--primary)', borderRadius: '12px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '20px', zIndex: 999, boxShadow: 'var(--shadow-glow)' }}>
              <span style={{ fontSize: '0.85rem', color: '#fff' }}>
                Compare List: <strong>{fabricCompareList.length}/2</strong> fabrics selected
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  onClick={() => setFabricCompareList([])}
                >
                  Reset
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '6px 16px', fontSize: '0.78rem' }}
                  disabled={fabricCompareList.length < 2}
                  onClick={() => setCompareModalOpen(true)}
                >
                  Compare Now
                </button>
              </div>
            </div>
          )}

          {compareModalOpen && (
            <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'flex-start', paddingTop: '3rem', overflowY: 'auto', justifyContent: 'center', zIndex: 1000 }}>
              <div className="glass-card" style={{ width: '800px', maxWidth: '90%', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <button 
                  onClick={() => {
                    setCompareModalOpen(false);
                  }} 
                  style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
                
                <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 'bold' }}>Fabric Comparison</h3>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <th style={{ padding: '10px' }}>Specification</th>
                        {fabricCompareList.map(id => {
                          const flatList = getAllVariants();
                          const item = flatList.find(f => f.id === id);
                          return (
                            <th key={id} style={{ padding: '10px', color: 'var(--primary)' }}>
                              {item ? `${item.brandName} - ${item.color}` : 'Unknown Fabric'}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: 'Category', key: 'catName' },
                        { label: 'Subcategory', key: 'subName' },
                        { label: 'Weave Type', key: 'typeName' },
                        { label: 'Collection', key: 'collName' },
                        { label: 'Price (per meter)', key: 'price', format: (v) => `₹${v}` },
                        { label: 'Width', key: 'width' },
                        { label: 'Weight (GSM)', key: 'gsm' },
                        { label: 'Texture feel', key: 'texture' },
                        { label: 'Stretch level', key: 'stretch' },
                        { label: 'Fabric Shine', key: 'shine' },
                        { label: 'Season compatibility', key: 'season' },
                        { label: 'Pattern', key: 'pattern' }
                      ].map(row => (
                        <tr key={row.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>{row.label}</td>
                          {fabricCompareList.map(id => {
                            const flatList = getAllVariants();
                            const item = flatList.find(f => f.id === id);
                            const val = item ? item[row.key] : '-';
                            return (
                              <td key={id} style={{ padding: '10px', color: '#fff' }}>
                                {row.format ? row.format(val) : val}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button className="btn btn-primary" onClick={() => setCompareModalOpen(false)}>
                    Close Comparison
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}


      {/* --- HUB 3: READY DESIGNS --- */}
      {activeHub === 'sarees' && (() => {
        const readyDesignsData = [
          // Sarees
          { id: 'rd-s1', name: 'Kanchipuram Pure Silk Saree', price: 8500, category: 'sarees', fabric: 'Silk', img: '/ReadyDesignSilkSarees/837c5912e2b3c6bdaaf96a1ad2a1976c.jpg', desc: 'Classic gold zari work wedding special.', isNew: true },
          { id: 'rd-s2', name: 'Chanderi Cotton-Silk Saree', price: 3200, category: 'sarees', fabric: 'Cotton-Silk', img: '/ReadyDesignSilkSarees/b7441408c8405386bf77d3c66f13d17e.jpg', desc: 'Lightweight sheer texture, comfortable and festive wear.', isNew: true },
          { id: 'rd-s3', name: 'Organza Floral Saree', price: 4900, category: 'sarees', fabric: 'Organza', img: '/ReadyDesignSilkSarees/image_zoom.jpeg', desc: 'Elegant floral embroidery with premium organza.', isNew: true },
          { id: 'rd-s4', name: 'Banarasi Brocade Saree', price: 9800, category: 'sarees', fabric: 'Silk', img: '/ReadyDesignSilkSarees/images.jpg', desc: 'Traditional heavy gold brocade detailing.', isNew: false },
          { id: 'rd-s5', name: 'Georgette Designer Saree', price: 4200, category: 'sarees', fabric: 'Georgette', img: '/ReadyDesignSilkSarees/images (1).jpg', desc: 'Trendy lightweight designer drape with borders.', isNew: false },
          { id: 'rd-s6', name: 'Raw Silk Festive Saree', price: 5600, category: 'sarees', fabric: 'Raw Silk', img: '/ReadyDesignSilkSarees/images (2).jpg', desc: 'Rich raw silk texture with vibrant colors.', isNew: true },
          { id: 'rd-s7', name: 'Mysore Crepe Silk Saree', price: 7200, category: 'sarees', fabric: 'Silk', img: '/ReadyDesignSilkSarees/images (3).jpg', desc: 'Soft crepe silk drape with gold thread borders.', isNew: false },
          { id: 'rd-s8', name: 'Cotton Silk Block Print Saree', price: 2800, category: 'sarees', fabric: 'Cotton-Silk', img: '/ReadyDesignSilkSarees/images (4).jpg', desc: 'Elegant block prints for casual & formal occasions.', isNew: false },

          // Lehengas
          { id: 'rd-l1', name: 'Bridal Lehenga Set', price: 12500, category: 'lehengas', fabric: 'Velvet', img: '/ReadyDesignsLehengas/bridal 5.jpg', desc: 'Heavy embroidery lehenga with matching dupatta.', isNew: true },
          { id: 'rd-l2', name: 'Pastel Pink Lehenga', price: 7800, category: 'lehengas', fabric: 'Georgette', img: '/ReadyDesignsLehengas/bridal2.jpg', desc: 'Trendy pastel design for festive occasions.', isNew: true },
          { id: 'rd-l3', name: 'Designer Silk Lehenga', price: 9200, category: 'lehengas', fabric: 'Silk', img: '/ReadyDesignsLehengas/b1.jpg', desc: 'Rich banarasi silk print with raw silk blouse.', isNew: true },
          { id: 'rd-l4', name: 'Floral Organza Lehenga', price: 6500, category: 'lehengas', fabric: 'Organza', img: '/ReadyDesignsLehengas/b2.jpg', desc: 'Sheer floral prints with sequin handwork.', isNew: false },
          { id: 'rd-l5', name: 'Net Ruffle Lehenga', price: 8200, category: 'lehengas', fabric: 'Net', img: '/ReadyDesignsLehengas/bridal3.jpg', desc: 'Modern tiered net design with heavy borders.', isNew: false },
          { id: 'rd-l6', name: 'Traditional Zardosi Lehenga', price: 15400, category: 'lehengas', fabric: 'Silk', img: '/ReadyDesignsLehengas/bridal4.jpg', desc: 'Exquisite hand-done zardosi fit special.', isNew: true },
          { id: 'rd-l7', name: 'Sequined Reception Gown Lehenga', price: 11000, category: 'lehengas', fabric: 'Georgette', img: '/ReadyDesignsLehengas/bridal6.jpg', desc: 'Vibrant shine borders with structured flare.', isNew: false },
          { id: 'rd-l8', name: 'Mirror Work Festive Lehenga', price: 8900, category: 'lehengas', fabric: 'Raw Silk', img: '/ReadyDesignsLehengas/bridal7.jpg', desc: 'Intricate glass mirror work on bright fabrics.', isNew: false }
        ];

        // Filter and sort logic
        const filteredReadyDesigns = readyDesignsData.filter(item => {
          if (item.category !== readyCategory) return false;
          if (readySearchQuery.trim() !== '') {
            const q = readySearchQuery.toLowerCase();
            const matchName = item.name.toLowerCase().includes(q);
            const matchDesc = item.desc.toLowerCase().includes(q);
            const matchFabric = item.fabric.toLowerCase().includes(q);
            if (!matchName && !matchDesc && !matchFabric) return false;
          }
          if (readyFilterFabric !== 'all' && item.fabric.toLowerCase() !== readyFilterFabric.toLowerCase()) return false;
          if (readyFilterPrice !== 'all') {
            if (readyFilterPrice === 'under-5000' && item.price >= 5000) return false;
            if (readyFilterPrice === '5000-10000' && (item.price < 5000 || item.price > 10000)) return false;
            if (readyFilterPrice === 'above-10000' && item.price <= 10000) return false;
          }
          return true;
        });

        const sortedReadyDesigns = [...filteredReadyDesigns].sort((a, b) => {
          if (readySortBy === 'Price: Low to High') return a.price - b.price;
          if (readySortBy === 'Price: High to Low') return b.price - a.price;
          if (readySortBy === 'Newest First') return b.isNew - a.isNew;
          return 0;
        });

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header section with Vector mannequin */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  Ready Designs
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
                  Discover beautiful ready-made sarees, lehengas and fabrics.
                </p>
              </div>
              
              {/* Mannequin Image with fading mask */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '110px', width: '260px', overflow: 'hidden' }}>
                <img 
                  src="/ready_designs_hero.png" 
                  alt="Mannequin" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
                  }} 
                />
              </div>
            </div>

            {/* Filter Bar */}
            <div 
              className="glass-card-no-hover"
              style={{ 
                display: 'flex', 
                gap: '16px', 
                alignItems: 'center', 
                flexWrap: 'wrap', 
                padding: '16px', 
                borderRadius: '16px',
                border: `1.5px solid ${borderColor}`,
                background: bgCard,
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}
            >
              {/* Category tabs */}
              <div style={{ display: 'flex', background: bgInput, borderRadius: '12px', padding: '6px', border: `1px solid ${borderColor}`, gap: '4px' }}>
                <button 
                  onClick={() => setReadyCategory('sarees')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    background: readyCategory === 'sarees' ? bgActiveOption : 'transparent',
                    color: readyCategory === 'sarees' ? 'var(--primary)' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Sparkles size={14} /> Sarees
                </button>
                <button 
                  onClick={() => setReadyCategory('lehengas')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    background: readyCategory === 'lehengas' ? bgActiveOption : 'transparent',
                    color: readyCategory === 'lehengas' ? 'var(--primary)' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Layers size={14} /> Lehengas
                </button>
              </div>

              {/* Search field */}
              <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
                <input 
                  type="text" 
                  placeholder="Search by product, fabric, design..."
                  value={readySearchQuery}
                  onChange={(e) => setReadySearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 16px',
                    borderRadius: '12px',
                    border: `1.5px solid ${borderColor}`,
                    fontSize: '0.9rem',
                    outline: 'none',
                    background: bgInput,
                    color: colorTextPrimary,
                    fontWeight: '500'
                  }}
                />
                <Search size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>

              {/* Fabric Select */}
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: '130px' }}>
                <select 
                  className="form-input" 
                  value={readyFilterFabric} 
                  onChange={(e) => setReadyFilterFabric(e.target.value)}
                  style={{ borderRadius: '12px', padding: '10px 12px', border: `1.5px solid ${borderColor}`, fontSize: '0.88rem', background: bgCard, color: colorTextPrimary }}
                >
                  <option value="all">Fabric: All</option>
                  <option value="Silk">Silk</option>
                  <option value="Cotton-Silk">Cotton-Silk</option>
                  <option value="Organza">Organza</option>
                  <option value="Georgette">Georgette</option>
                  <option value="Velvet">Velvet</option>
                  <option value="Net">Net</option>
                  <option value="Raw Silk">Raw Silk</option>
                </select>
              </div>

              {/* Price range select */}
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: '140px' }}>
                <select 
                  className="form-input" 
                  value={readyFilterPrice} 
                  onChange={(e) => setReadyFilterPrice(e.target.value)}
                  style={{ borderRadius: '12px', padding: '10px 12px', border: `1.5px solid ${borderColor}`, fontSize: '0.88rem', background: bgCard, color: colorTextPrimary }}
                >
                  <option value="all">Price: All</option>
                  <option value="under-5000">Under ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="above-10000">Above ₹10,000</option>
                </select>
              </div>

              {/* Reset Filter Button */}
              <button 
                onClick={() => {
                  setReadySearchQuery('');
                  setReadyFilterFabric('all');
                  setReadyFilterPrice('all');
                }}
                className="btn btn-ghost"
                style={{ 
                  borderRadius: '12px', 
                  padding: '10px 16px', 
                  border: '1.5px solid var(--primary)', 
                  color: 'var(--primary)', 
                  fontWeight: 'bold', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Sliders size={14} /> Reset
              </button>
            </div>

            {/* Results count & Sort by */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  Showing <span style={{ color: 'var(--primary)' }}>{sortedReadyDesigns.length}</span> Results
                </span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '2px' }}>
                  High quality fabrics & designs from trusted boutiques
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Sort by:</span>
                <select 
                  className="form-input" 
                  value={readySortBy} 
                  onChange={(e) => setReadySortBy(e.target.value)}
                  style={{ borderRadius: '10px', padding: '6px 12px', border: '1.5px solid #e2e8f0', fontSize: '0.85rem' }}
                >
                  <option value="Newest First">Newest First</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))', gap: '24px', marginTop: '16px' }}>
              {sortedReadyDesigns.map((item) => (
                <div 
                  key={item.id} 
                  className="glass-card-no-hover"
                  style={{ 
                    padding: '16px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px', 
                    borderRadius: '20px', 
                    background: bgCard, 
                    border: `1.5px solid ${borderColor}`, 
                    position: 'relative',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.015)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Badges container */}
                  {item.isNew && (
                    <span 
                      style={{ 
                        position: 'absolute', 
                        top: '26px', 
                        left: '26px', 
                        background: 'var(--primary)', 
                        color: '#fff', 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '0.7rem', 
                        fontWeight: '800',
                        zIndex: 2,
                        boxShadow: '0 2px 6px rgba(247,37,133,0.3)'
                      }}
                    >
                      New
                    </span>
                  )}

                  {/* Heart icon */}
                  <button 
                    onClick={() => {
                      setReadyWishlist(prev => ({
                        ...prev,
                        [item.id]: !prev[item.id]
                      }));
                    }}
                    style={{
                      position: 'absolute',
                      top: '26px',
                      right: '26px',
                      background: 'rgba(255,255,255,0.85)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 2,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                    }}
                  >
                    <Heart 
                      size={16} 
                      fill={readyWishlist[item.id] ? 'var(--primary)' : 'none'} 
                      stroke={readyWishlist[item.id] ? 'var(--primary)' : '#475569'} 
                    />
                  </button>

                  <img 
                    src={item.img} 
                    alt={item.name} 
                    style={{ 
                      width: '100%', 
                      height: '240px', 
                      borderRadius: '16px', 
                      objectFit: 'cover',
                      background: '#f8fafc'
                    }} 
                  />

                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                      {item.desc}
                    </p>
                  </div>

                  <div 
                    style={{ 
                      marginTop: 'auto', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      borderTop: '1px solid var(--border-color)', 
                      paddingTop: '12px' 
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)', fontWeight: '800', fontSize: '1.2rem' }}>
                      ₹{item.price}
                    </span>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }} 
                      onClick={() => handleAddToCart({ id: item.id, name: item.name, price: item.price, image: item.img }, item.category === 'sarees' ? 'saree' : 'lehenga')}
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer USP features panel */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '16px', 
                background: bgActiveOption, 
                border: `1.5px solid ${borderColor}`, 
                borderRadius: '16px', 
                padding: '20px', 
                marginTop: '40px' 
              }}
            >
              {[
                { title: 'Premium Quality', desc: 'Handpicked fabrics & designs', icon: '🏆' },
                { title: 'Secure Payments', desc: '100% safe & secure checkout', icon: '💳' },
                { title: 'Fast Delivery', desc: 'Quick delivery to your doorstep', icon: '⚡' },
                { title: '24/7 Support', desc: "We're here to help you anytime", icon: '💬' }
              ].map((usp, uIdx) => (
                <div key={uIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '2rem' }}>{usp.icon}</span>
                  <div>
                    <h5 style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.92rem' }}>{usp.title}</h5>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '2px' }}>{usp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* --- HUB 4: DESIGNERS TAB --- */}
      {activeHub === 'designers' && (() => {
        // Mock Designers list
        const allDesigners = [
          {
            id: 'd1',
            name: 'Malini Iyer',
            role: 'Professional',
            specialties: ['bridal', 'ethnic', 'western'],
            specialtyText: 'Luxury Bridal | Indo-Western | Embroidery Specialist',
            experience: '8 Years',
            rating: '4.9',
            designsCount: 320,
            price: 1500,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            badges: ['🏆 Verified Designer', '👗 Bridal Specialist', '🧵 Embroidery Expert'],
            college: 'NIFT Graduate',
            fabrics: ['silk', 'velvet', 'tweed']
          },
          {
            id: 'd2',
            name: 'Rahul Varma',
            role: 'Student',
            specialties: ['western', 'casual', 'concepts'],
            specialtyText: 'Streetwear | Casual Wear | Gen-Z Trends',
            experience: '2 Years',
            rating: '4.7',
            designsCount: 85,
            price: 450,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
            badges: ['🎓 Fashion Graduate', '🔥 Trending Designer'],
            college: 'NIFT Bengaluru',
            fabrics: ['cotton', 'linen']
          },
          {
            id: 'd3',
            name: 'Sneha Reddy',
            role: 'Professional',
            specialties: ['bridal', 'ethnic'],
            specialtyText: 'Royal Lehengas | Banarasi Couture | Silk Specialist',
            experience: '12 Years',
            rating: '5.0',
            designsCount: 410,
            price: 1800,
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
            badges: ['🏆 Verified Designer', '👗 Bridal Specialist', '🔥 Trending Designer'],
            college: 'Pearl Academy',
            fabrics: ['silk', 'velvet']
          },
          {
            id: 'd4',
            name: 'Vikram Das',
            role: 'Student',
            specialties: ['western', 'office', 'casual'],
            specialtyText: 'Smart Casuals | Office Wear | Minimalist Drapes',
            experience: '1 Year',
            rating: '4.6',
            designsCount: 92,
            price: 400,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
            badges: ['🎓 Fashion Graduate'],
            college: 'Pearl Academy Delhi',
            fabrics: ['cotton', 'wool']
          },
          {
            id: 'd5',
            name: 'Ananya Sen',
            role: 'Student',
            specialties: ['party', 'kids'],
            specialtyText: 'Party Wear | Kids Comfortable Festive Wear',
            experience: '3 Years',
            rating: '4.8',
            designsCount: 110,
            price: 500,
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
            badges: ['🎓 Fashion Graduate', '🔥 Trending Designer'],
            college: 'JD Institute',
            fabrics: ['cotton', 'silk']
          },
          {
            id: 'd6',
            name: 'Priya Sharma',
            role: 'Student',
            specialties: ['uniforms', 'office'],
            specialtyText: 'School Uniforms | Healthcare Scrubs | Workwear',
            experience: '2 Years',
            rating: '4.5',
            designsCount: 60,
            price: 350,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
            badges: ['🎓 Fashion Graduate'],
            college: 'NIFT Chennai',
            fabrics: ['cotton', 'linen']
          }
        ];

        // Filtering featured designers
        const featuredDesigners = allDesigners.filter(d => {
          if (selectedSpec !== 'all' && !d.specialties.includes(selectedSpec)) return false;
          if (selectedFabricFilter !== '' && !d.fabrics.includes(selectedFabricFilter)) return false;
          return true;
        });

        // Filtering student designers
        const studentDesigners = allDesigners.filter(d => {
          if (d.role !== 'Student') return false;
          if (studentCollege !== 'all' && !d.college.toLowerCase().includes(studentCollege.toLowerCase())) return false;
          if (studentSpecialty !== 'all' && !d.specialties.includes(studentSpecialty)) return false;
          if (studentSkill !== 'all') {
            if (studentSkill === 'graduate' && !d.badges.some(b => b.toLowerCase().includes('graduate'))) return false;
            if (studentSkill === 'trending' && !d.badges.some(b => b.toLowerCase().includes('trending'))) return false;
          }
          return true;
        });

        const handleBookConsultation = (designerName, charge) => {
          alert(`Consultation request sent to ${designerName}! Our team will schedule your live session (Charge: ₹${charge}).`);
        };

        const handleAddLiveRequest = (e) => {
          e.preventDefault();
          if (!newReqTitle || !newReqBudget) {
            alert('Please fill in request title and budget.');
            return;
          }
          const newReq = {
            id: Date.now(),
            title: newReqTitle,
            budget: parseInt(newReqBudget),
            category: newReqCategory,
            bids: 0
          };
          setLiveRequests([newReq, ...liveRequests]);
          setNewReqTitle('');
          setNewReqBudget('');
          alert('Live Design Request posted to the marketplace! Designers can now place bids.');
        };

        const handleBid = (reqId) => {
          setLiveRequests(liveRequests.map(r => r.id === reqId ? { ...r, bids: r.bids + 1 } : r));
          alert('Simulating designer bid! Bid successfully registered.');
        };

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Header banner */}
            <div style={{ background: 'var(--grad-primary)', padding: '24px', borderRadius: '12px', textAlign: 'left' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.65rem' }}>STITCHBEE LABS</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', marginTop: '6px' }}>Designer Studios</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginTop: '4px' }}>Co-create styling patterns, custom embroidery designs, and sketch layouts with professional & student designers.</p>
            </div>

            {/* 1. Featured Designers (Hero Cards) */}
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Featured Designers</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {featuredDesigners.slice(0, 2).map((des) => (
                  <div key={des.id} className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={des.image} alt={des.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span className={`badge ${des.role === 'Professional' ? 'badge-primary' : 'badge-secondary'}`} style={{ fontSize: '0.6rem' }}>{des.role} Designer</span>
                        {des.badges.map((bg, bidx) => (
                          <span key={bidx} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', color: '#fff' }}>{bg}</span>
                        ))}
                      </div>
                      <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>{des.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '600' }}>{des.specialtyText}</p>
                      <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <div>Experience: <strong>{des.experience}</strong></div>
                        <div>Rating: <strong style={{ color: '#fbbf24' }}>⭐ {des.rating}</strong></div>
                        <div>Completed Designs: <strong>{des.designsCount}</strong></div>
                        <div>Starting Price: <strong style={{ color: 'var(--primary)' }}>₹{des.price}/session</strong></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '160px' }}>
                      {des.role === 'Professional' ? (
                        <>
                          <button className="btn btn-primary" onClick={() => handleBookConsultation(des.name, des.price)}>Book Consultation</button>
                          <button className="btn btn-secondary" onClick={() => alert(`Opening portfolio page for ${des.name}...`)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>View Portfolio</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-primary" onClick={() => handleBookConsultation(des.name, des.price)}>Book Session</button>
                          <button className="btn btn-secondary" onClick={() => alert(`Opening design concepts for ${des.name}...`)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>View Concepts</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {featuredDesigners.length === 0 && (
                  <div className="glass-card-no-hover" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No featured designers match your selected specialization or fabric filters.
                  </div>
                )}
              </div>
            </div>

            {/* 8. Fabric + Designer Matching */}
            <div className="glass-card-no-hover" style={{ padding: '24px', background: 'rgba(247,37,133,0.03)', border: '1px solid rgba(247,37,133,0.15)', textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>Smart Fabric + Designer Matcher</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Select a fabric you want to stitch, and we will filter designers who specialize in crafting with that material.</p>
                </div>
                <div style={{ width: '220px' }}>
                  <select 
                    value={selectedFabricFilter} 
                    onChange={e => setSelectedFabricFilter(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(8,7,16,0.8)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', outline: 'none' }}
                  >
                    <option value="">-- Match by Fabric --</option>
                    <option value="silk">Banarasi Silk / Pure Silk</option>
                    <option value="wool">Merino Wool / Suiting Wool</option>
                    <option value="cotton">Giza Cotton / Supima Cotton</option>
                    <option value="linen">Belgian Flax Linen</option>
                    <option value="velvet">Plush Velvet</option>
                    <option value="tweed">Tweed Wool</option>
                  </select>
                </div>
                {selectedFabricFilter !== '' && (
                  <button className="btn btn-ghost" onClick={() => setSelectedFabricFilter('')} style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Clear</button>
                )}
              </div>
            </div>

            {/* 2. Browse by Design Category */}
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Browse by Design Category</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px' }}>
                {[
                  { key: 'bridal', name: 'Bridal Designs' },
                  { key: 'party', name: 'Party Wear' },
                  { key: 'ethnic', name: 'Ethnic Wear' },
                  { key: 'western', name: 'Western Wear' },
                  { key: 'office', name: 'Office Wear' },
                  { key: 'kids', name: 'Kids Wear' },
                  { key: 'uniforms', name: 'Uniform Designs' },
                  { key: 'concepts', name: 'Custom Concepts' }
                ].map(cat => (
                  <div 
                    key={cat.key} 
                    className="glass-card" 
                    onClick={() => {
                      setSelectedSpec(selectedSpec === cat.key ? 'all' : cat.key);
                    }}
                    style={{ 
                      padding: '16px', 
                      cursor: 'pointer', 
                      borderRadius: '8px', 
                      border: selectedSpec === cat.key ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                      background: selectedSpec === cat.key ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>
                      {cat.key === 'bridal' && '👗'}
                      {cat.key === 'party' && '🔥'}
                      {cat.key === 'ethnic' && '✨'}
                      {cat.key === 'western' && '🧥'}
                      {cat.key === 'office' && '💼'}
                      {cat.key === 'kids' && '🧸'}
                      {cat.key === 'uniforms' && '🎓'}
                      {cat.key === 'concepts' && '🎨'}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: selectedSpec === cat.key ? 'var(--primary)' : '#fff' }}>{cat.name}</div>
                  </div>
                ))}
              </div>
              {selectedSpec !== 'all' && (
                <button className="btn btn-ghost" onClick={() => setSelectedSpec('all')} style={{ display: 'block', margin: '12px auto 0 auto', fontSize: '0.8rem', color: 'var(--primary)' }}>Clear Category Filter</button>
              )}
            </div>

            {/* Embedded Inspiration Upload Card */}
            <div className="glass-card-no-hover" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(76,201,240,0.06) 0%, rgba(247,37,133,0.06) 100%)', border: '1px solid rgba(76,201,240,0.15)', textAlign: 'left', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flexGrow: 1 }}>
                <span className="badge" style={{ fontSize: '0.65rem', background: 'var(--accent)', color: '#0b0914', fontWeight: 'bold' }}>PINTEREST & IG STYLE RECREATION</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginTop: '6px' }}>Have an Outfit Photo or Sketch Inspiration?</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Submit your design reference images, specify your custom fit, and receive tailored proposals from our fashion studios.</p>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setActiveHub('design-upload');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <Upload size={16} /> Upload Inspiration
              </button>
            </div>

            {/* 3. Trending Design Concepts */}
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Trending Design Concepts</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {[
                  { title: 'Minimal Bridal Lehenga', desc: 'Luxury silk drape with delicate gold borders and tone-on-tone fine thread embroidery.', img: './br_b1.jpg', tag: 'Wedding' },
                  { title: 'Royal Lucknowi Ghagra', desc: 'Intricate georgette lehenga showcasing heavy ivory Chikankari and pearl accents.', img: './br_b2.jpg', tag: 'Royal Bridal' },
                  { title: 'Velvet Zardozi Couture', desc: 'Plush velvet panels hand-embroidered with classic gold thread and antique metallic motifs.', img: './br_bridal2.jpg', tag: 'Luxury Velvet' },
                  { title: 'Pastel Organza Lehenga', desc: 'Muted champagne silk textures styled with floral bootis and matching organza dupattas.', img: './br_bridal3.jpg', tag: 'Pastel Trends' }
                ].map((tr, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                    <div style={{ height: '180px', borderRadius: '6px', overflow: 'hidden', position: 'relative', background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={tr.img} alt={tr.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      <span className="badge badge-primary" style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '0.55rem' }}>{tr.tag}</span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff' }}>{tr.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>{tr.desc}</p>
                    <button className="btn btn-ghost" onClick={() => alert(`Starting discussion for ${tr.title} concept...`)} style={{ marginTop: 'auto', padding: '6px 0', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--primary)' }}>Discuss with Designer</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Design Packages */}
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Design consultation Packages</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {[
                  {
                    title: 'Basic Styling',
                    price: 499,
                    features: ['1 custom concept sketch', 'Basic style tips', 'Fabric material suggestion']
                  },
                  {
                    title: 'Premium Design',
                    price: 1499,
                    features: ['3 custom concept options', 'Fabric matching & mapping', 'Lining sheets suggestions', 'Local tailor recommendations']
                  },
                  {
                    title: 'Luxury Couture',
                    price: 4999,
                    features: ['Full custom layout mapping', '1-on-1 designer consult calls', 'Pattern sheet creation', 'Direct tailor assignment & support', 'Final fitting oversight assistance']
                  }
                ].map((pkg, idx) => (
                  <div key={idx} className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', border: idx === 1 ? '1px solid var(--primary)' : '1px solid var(--border-color)', position: 'relative', textAlign: 'left' }}>
                    {idx === 1 && <span className="badge badge-primary" style={{ position: 'absolute', top: '-10px', right: '20px', fontSize: '0.6rem' }}>MOST POPULAR</span>}
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{pkg.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent)' }}>₹{pkg.price}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>/design</span>
                    </div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '16px', listStyleType: 'disc' }}>
                      {pkg.features.map((feat, fidx) => (
                        <li key={fidx}>{feat}</li>
                      ))}
                    </ul>
                    <button className="btn btn-primary" onClick={() => alert(`Starting setup for ${pkg.title} package consultation...`)} style={{ marginTop: 'auto', width: '100%' }}>Select Package</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Student Designers Hub */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Student Designers Hub</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>Trendy concepts and faster delivery by student partners from top colleges.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <select 
                    value={studentCollege} 
                    onChange={e => setStudentCollege(e.target.value)}
                    style={{ padding: '6px 12px', background: 'rgba(8,7,16,0.8)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.75rem' }}
                  >
                    <option value="all">All Colleges</option>
                    <option value="nift">NIFT</option>
                    <option value="pearl">Pearl Academy</option>
                    <option value="jd">JD Institute</option>
                  </select>
                  <select 
                    value={studentSpecialty} 
                    onChange={e => setStudentSpecialty(e.target.value)}
                    style={{ padding: '6px 12px', background: 'rgba(8,7,16,0.8)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.75rem' }}
                  >
                    <option value="all">All Specialties</option>
                    <option value="western">Western Wear</option>
                    <option value="casual">Casual Wear</option>
                    <option value="party">Party Wear</option>
                    <option value="office">Office Wear</option>
                  </select>
                  <select 
                    value={studentSkill} 
                    onChange={e => setStudentSkill(e.target.value)}
                    style={{ padding: '6px 12px', background: 'rgba(8,7,16,0.8)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.75rem' }}
                  >
                    <option value="all">All Skills</option>
                    <option value="graduate">Graduates Only</option>
                    <option value="trending">Trending Styles</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {studentDesigners.map(des => (
                  <div key={des.id} className="glass-card-no-hover" style={{ padding: '16px', display: 'flex', gap: '12px', textAlign: 'left' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={des.image} alt={des.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
                      <span className="badge badge-secondary" style={{ width: 'fit-content', fontSize: '0.55rem' }}>{des.college}</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff' }}>{des.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{des.specialtyText}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                        <span style={{ fontSize: '0.75rem', color: '#fbbf24' }}>⭐ {des.rating} • {des.designsCount} Designs</span>
                        <strong style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>₹{des.price}/sess</strong>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        <button className="btn btn-primary" onClick={() => handleBookConsultation(des.name, des.price)} style={{ padding: '4px 10px', fontSize: '0.72rem' }}>Book Session</button>
                        <button className="btn btn-ghost" onClick={() => alert(`Showing concepts for ${des.name}...`)} style={{ padding: '4px 10px', fontSize: '0.72rem', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>View Concepts</button>
                      </div>
                    </div>
                  </div>
                ))}
                {studentDesigners.length === 0 && (
                  <div className="glass-card-no-hover" style={{ padding: '24px', gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No student designers match the selected filters.
                  </div>
                )}
              </div>
            </div>

            {/* 7. Live Design Requests Marketplace */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flexWrap: 'wrap', textAlign: 'left' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Live Customer Requests Feed</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {liveRequests.map(req => (
                    <div key={req.id} className="glass-card-no-hover" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span className="badge badge-primary" style={{ fontSize: '0.55rem' }}>{req.category.toUpperCase()}</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>{req.title}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Budget: <strong style={{ color: 'var(--accent)' }}>₹{req.budget}</strong> | Active Bids: {req.bids}</p>
                      </div>
                      <button className="btn btn-secondary" onClick={() => handleBid(req.id)} style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>Place Bid</button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Post a Design Request</h3>
                <form onSubmit={handleAddLiveRequest} className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Request Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Need embroidery design layout for blouse" 
                      value={newReqTitle}
                      onChange={e => setNewReqTitle(e.target.value)}
                      style={{ padding: '10px', background: 'rgba(8,7,16,0.6)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }} 
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Target Budget (₹)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 1500" 
                        value={newReqBudget}
                        onChange={e => setNewReqBudget(e.target.value)}
                        style={{ padding: '10px', background: 'rgba(8,7,16,0.6)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }} 
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category</label>
                      <select 
                        value={newReqCategory}
                        onChange={e => setNewReqCategory(e.target.value)}
                        style={{ padding: '10px', background: 'rgba(8,7,16,0.6)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                      >
                        <option value="bridal">Bridal Wear</option>
                        <option value="ethnic">Ethnic Wear</option>
                        <option value="western">Western Wear</option>
                        <option value="office">Office Wear</option>
                        <option value="kids">Kids Wear</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>Post Live Request</button>
                </form>
              </div>
            </div>

            {/* 10. Designer Earnings Section */}
            <div className="glass-card-no-hover" style={{ padding: '30px', background: 'linear-gradient(135deg, rgba(247,37,133,0.08) 0%, rgba(114,9,183,0.08) 100%)', border: '1px solid rgba(247,37,133,0.2)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <span className="badge badge-primary">ONBOARDING FREELANCERS</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>Earn with StitchBee Designer Network</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '600px' }}>
                Join our platform to offer freelance design consulting, sell digital outfit concepts, build your professional portfolio, and train fashion students.
              </p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', margin: '8px 0', fontSize: '0.8rem', color: '#fff' }}>
                <div>✨ Work Freelance</div>
                <div>👥 Get High-Paying Clients</div>
                <div>🎨 Sell Concepts & Sketches</div>
                <div>💼 Build Verifiable Portfolio</div>
              </div>
              <button className="btn btn-primary" onClick={() => alert('Onboarding wizard opening soon! Submit your fashion portfolio to designer@stitchbee.com.')}>Become a Designer</button>
            </div>
          </div>
        );
      })()}

      {/* --- HUB 5: ARTICLES --- */}
      {activeHub === 'articles' && (() => {
        const localArticles = [
          // Fabric Knowledge
          { id: 'f1', title: 'Wool vs Linen: Choosing the Right Weight', category: 'Fabric Guides', author: 'Vikram Das', reads: 1420, img: './fab6.jpg', body: 'Wool and Linen represent two extremes of the fabric spectrum. While wool excels in cold temperatures due to its high insulation and heat-trapping crimps, linen is the ultimate summer champion. Sourced from flax fibers, linen features a hollow core that allows maximum breathability and moisture-wicking. When choosing between them, consider the occasion and the climate: suiting wool (280-340 GSM) provides structural drape, while lightweight linen (120-180 GSM) is ideal for casual shirts and relaxed trousers.' },
          { id: 'f2', title: 'Best Summer Fabrics for Tropical Climates', category: 'Fabric Guides', author: 'Priya Sharma', reads: 980, img: './fab2.jpg', body: 'Dressing for high heat requires lightweight, breathable fibers. The best fabrics for tropical summers include Giza Cotton, Belgian Flax Linen, and lightweight Chanderi silks. Avoid synthetic materials like polyester, which trap heat and cause perspiration. Stick to light colors like lavender, sky blue, and pastel pink, which reflect light rather than absorb it.' },
          { id: 'f3', title: 'Silk Types Explained: Banarasi to Chanderi', category: 'Fabric Guides', author: 'Sneha Reddy', reads: 2410, img: './brf_fa2.jpg', body: 'Silks carry a rich legacy in Indian tailoring. Banarasi silk is characterized by its heavy gold zari brocade work and metallic sheets, making it ideal for bridal lehengas. Chanderi silk is a lightweight blend of cotton and silk yarn, offering a sheer texture and glossy finish suitable for summer festivals. Kanjeevaram silk is double-threaded and heavy, providing excellent structural drape for traditional sarees.' },
          { id: 'f4', title: 'Understanding Cotton GSM: Weave & Weights', category: 'Fabric Guides', author: 'Vikram Das', reads: 850, img: './fab3.jpg', body: 'GSM stands for Grams per Square Meter. It measures the weight and thickness of a fabric. For cotton, 50-100 GSM represents sheer, lightweight fabric (like lawn or voile), ideal for linings and summer slips. 100-150 GSM is medium weight, used for standard shirts and blouses. 150-250+ GSM is heavy weight, perfect for structured trousers, jackets, and winter kurtas.' },
          { id: 'f5', title: 'How to Choose the Perfect Bridal Lehenga Fabric', category: 'Fabric Guides', author: 'Malini Iyer', reads: 3200, img: './brf_fa5.jpg', body: 'Your bridal lehenga drape is determined entirely by the base fabric. Velvet is heavy, royal, and holds heavy zardozi embroidery without sagging. Pure raw silk offers a beautiful natural sheen and holds structure well, ideal for classic A-line flares. Georgette and net are lightweight, providing a soft, flowy, and highly romantic silhouette.' },
          { id: 'f6', title: 'Fabric Care Guide: Preservation & Ironing Tips', category: 'Fabric Guides', author: 'Amit Patel', reads: 1120, img: './fab5.jpg', body: 'Premium fabrics require proper care. Pure silk should always be dry cleaned and stored in soft muslin bags to avoid moisture damage. Linen can be machine-washed but should be ironed while slightly damp to smooth out deep creases. Wool garments must be stored with cedar balls and dry cleaned to preserve natural fibers.' },
          
          // Design Inspiration
          { id: 'd1', title: 'Celebrity Inspired Red Carpet Outfits', category: 'Celebrity Looks', author: 'Rahul Varma', reads: 1850, img: './br_bridal4.jpg', body: 'Red carpet fashion this season is dominated by asymmetrical cuts and bold color blocks. We see a shift towards high-neck collars, sheer organza capes, and metallic thread details. To replicate these looks on a budget, choose premium georgette or crepe fabrics and pair them with a specialized custom design consult.' },
          { id: 'd2', title: 'Instagram Viral Fashion Trends this Month', category: 'Trending Styles', author: 'Rahul Varma', reads: 2200, img: './w_women1.jpg', body: 'Pastel coordinates, puff-sleeve blouses, and oversized structured blazers are taking over social media feeds. The trend focuses on comfort-meets-elegance. Light lilac and mint green are the colors of the month.' },
          { id: 'd3', title: 'Pinterest Wedding Boards: Style Inklings', category: 'Wedding Fashion', author: 'Malini Iyer', reads: 3400, img: './br_bridal7.jpg', body: 'Pinterest bridal boards show a clear trend: tone-on-tone embroidery. Instead of contrasting thread, modern brides prefer gold work on gold fabric, or red-on-red. Minimal jewelry and long sheer veils complete this aesthetic.' },
          { id: 'd4', title: 'Minimalist Bridal Looks for Day Ceremonies', category: 'Wedding Fashion', author: 'Sneha Reddy', reads: 1950, img: './br_b1.jpg', body: 'Daytime weddings call for lighter fabrics that breathe. Pastel organza, lightweight silk, and georgette with minimal sequins are ideal. Muted champagne and peach tones capture natural light beautifully, avoiding the heavy weight of traditional evening bridal wear.' },
          { id: 'd5', title: 'Korean Fashion Trends: Oversized Silhouettes', category: 'Seasonal Fashion', author: 'Rahul Varma', reads: 2800, img: './w_women2.jpg', body: 'Korean street fashion is all about layering. Oversized trench coats, double-breasted blazers in pastel lavender, and loose linen trousers dominate. The key is balancing the proportions: pair an oversized jacket with a fitted inner top.' },
          
          // Stitching Education
          { id: 's1', title: 'How Perfect Measurements Work: 3D vs Tape', category: 'Tailoring Tips', author: 'Rajesh Kumar', reads: 1600, img: './why_join_4.png', body: 'Traditional measuring uses a tape, which is subject to human error and posture shifts. Modern digital custom shops use multi-point photos or 3D coordinate mapping to calculate precise chest drops, shoulder angles, and arm curves. For the best fit, stand naturally with feet shoulder-width apart and breathe regularly during measurements.' },
          { id: 's2', title: '5 Common Stitching Mistakes & How to Avoid Them', category: 'Tailoring Tips', author: 'Rajesh Kumar', reads: 1250, img: './why_join_3.jpg', body: 'The most common mistakes include: choosing the wrong fabric drape for a pattern (e.g. using stiff cotton for a flowy gown), ignoring seam allowances, incorrect shoulder drops, tight armholes, and not checking the lining weight. Always discuss fabric mapping with your tailor before cutting.' },
          { id: 's3', title: 'Suit Fitting Guide: Shoulder Seams & Hemlines', category: 'Tailoring Tips', author: 'Amit Patel', reads: 1450, img: './mens_tailoring.jpg', body: 'A perfect suit starts at the shoulders. The shoulder seam should lie flat and align exactly where your arm meets the collarbone. The jacket hemline should cover your seat, and the trouser bottom should have a slight break over the shoe lace.' },
          { id: 's4', title: 'Blouse Fitting Secrets: Dart Placements', category: 'Tailoring Tips', author: 'Sneha Reddy', reads: 3100, img: './why_join_5.jpg', body: 'A saree blouse fit depends entirely on the apex point and dart placement. Double darts create a structured cup shape, while single darts offer a softer fit. Ensure the neck drop does not gap when you lean forward, and choose a lining that matches the stretch of the blouse fabric.' },
          { id: 's5', title: 'Alteration Tips: Re-adjusting Seams at Home', category: 'Tailoring Tips', author: 'Amit Patel', reads: 950, img: './alterations_fit_v2.jpg', body: 'For simple adjustments, search for the side seam stitch. You can easily let out or take in up to 1 inch if the tailor left a seam allowance. Always use a seam ripper to avoid tearing the fabric fibers, and iron the new seam flat to remove needle holes.' },
          
          // Student Learning Hub
          { id: 'l1', title: 'Beginner Tailoring: Needle Threading & Basics', category: 'Fashion Careers', author: 'Rahul Varma', reads: 750, img: './student_hero_1.jpg', body: 'Learning to stitch starts with machine control. Practice sewing straight lines on paper before using fabric. Learn to wind the bobbin evenly, adjust thread tension, and thread the needle. A standard size 14 needle is perfect for starting with medium cotton fabrics.' },
          { id: 'l2', title: 'Pattern Making Basics: Paper Drafting Layouts', category: 'Fashion Careers', author: 'Ananya Sen', reads: 880, img: './student_hero_4.jpg', body: 'Pattern drafting is translating 3D body shapes onto 2D paper sheets. Learn to draft basic blocks: front bodice, back bodice, sleeve, and skirt. Use French curves to draw smooth armholes and necklines, and always add seam allowances (typically 0.5 inch for necklines, 1 inch for side seams).' },
          { id: 'l3', title: 'Fashion Sketching: Outfit Proportions & Croquis', category: 'Fashion Careers', author: 'Vikram Das', reads: 1100, img: './student_hero_3.jpg', body: 'Fashion sketching uses a 9-head or 10-head figure ratio to emphasize clothing details. Start with a light wireframe pencil sketch (croquis), map the shoulder and hip slant, and drape the fabric folds naturally over the joints. Shade the fabric creases to simulate drape weight.' },
          { id: 'l4', title: 'Understanding Fabric Weaves: Plain, Twill, Satin', category: 'Fashion Careers', author: 'Ananya Sen', reads: 620, img: './student_hero_2.jpg', body: 'Fabric feel depends on weave geometry. Plain weave (over-one, under-one) is durable and flat (e.g. linen, canvas). Twill weave has diagonal ridges, making it heavy and stretch-resistant (e.g. denim, gabardine). Satin weave features long thread floats, creating a highly glossy, smooth, but snag-prone surface.' },
          { id: 'l5', title: 'Stitching Certifications: Ranks & Badges Guide', category: 'Fashion Careers', author: 'Priya Sharma', reads: 530, img: './student_hero_5.jpg', body: 'StitchBee Academy ranks certify tailoring skill sets. Bronze requires simple seams and alterations. Silver includes shirts and blouses. Gold covers double-breasted suits and bridal lehengas. Complete practical exams to unlock higher partner payouts.' },
          { id: 'l6', title: 'Delivery Etiquette: Handling Premium Garments', category: 'Fashion Careers', author: 'Rajesh Kumar', reads: 400, img: './delivery_works_3.jpg', body: 'Fashion delivery is about presentation. Premium garments must be transported on hangers inside dust-proof garment bags. Never fold a structured blazer or heavily embroidered lehenga. Greet the client politely and offer fitting assistance if required.' }
        ];

        const categoriesList = [
          { key: 'Trending Styles', name: 'Trending Styles', icon: '🔥' },
          { key: 'Fabric Guides', name: 'Fabric Guides', icon: '🧵' },
          { key: 'Tailoring Tips', name: 'Tailoring Tips', icon: '✂️' },
          { key: 'Wedding Fashion', name: 'Wedding Fashion', icon: '👗' },
          { key: 'Seasonal Fashion', name: 'Seasonal Fashion', icon: '🍂' },
          { key: 'Celebrity Looks', name: 'Celebrity Looks', icon: '⭐' },
          { key: 'Kids Fashion', name: 'Kids Fashion', icon: '🧸' },
          { key: 'Men’s Fashion', name: 'Men’s Fashion', icon: '👔' },
          { key: 'Women’s Fashion', name: 'Women’s Fashion', icon: '👜' },
          { key: 'Uniform Styling', name: 'Uniform Styling', icon: '🎓' },
          { key: 'Sustainable Fashion', name: 'Sustainable Fashion', icon: '🌿' },
          { key: 'Fashion Careers', name: 'Fashion Careers', icon: '💼' }
        ];

        const trendingThisWeek = [
          { id: 'trend1', title: 'Top 10 Blouse Styles for 2026', badge: '🔥 Trending', badgeClass: 'badge-primary', body: 'This week, the top 10 blouse designs are dominated by sheer organza backs, sweetheart plunge necklines, elbow-length heavy hand-embellished sleeves, high-collared jackets, and retro puff cuffs. Silk brocade remains the fabric of choice to pair with these premium cuts.' },
          { id: 'trend2', title: 'Trending Bridal Neckline Shapes', badge: '👗 New Arrival', badgeClass: 'badge-secondary', body: 'Deep sweetheart necklines, illusion nets, asymmetrical neck drops, and high-collared royal sherwani necks are the top choices for brides this season. Gold thread zardozi detailing adds an antique finish.' },
          { id: 'trend3', title: 'Latest Groom Sherwani Designs', badge: '⭐ Editor Pick', badgeClass: 'badge-warning', body: 'Structured pastel sherwanis in champagne gold and mint green silk are trending. Pairing asymmetrical outer jackets over fitted formal trousers replaces traditional heavy styles.' },
          { id: 'trend4', title: 'Office Wear Trends: Linen Coordinates', badge: '🔥 Trending', badgeClass: 'badge-primary', body: 'Linen coordinate sets (oversized blazers with matching wide-leg trousers) are the leading office style. Breathable flax fabrics in earth tones like beige and sand dominate.' },
          { id: 'trend5', title: 'Summer Fabrics Guide: Linen & Giza Cotton', badge: '⭐ Editor Pick', badgeClass: 'badge-warning', body: 'Our editors recommend pure flax linen and long-staple Giza cotton for extreme summer heat. Stick to light weave fabrics under 130 GSM for maximum breathability.' }
        ];

        const handleTrendingClick = (item) => {
          setSelectedArticle({
            id: item.id,
            title: item.title,
            category: 'Trending This Week',
            author: 'Editor Pick',
            reads: '4500+',
            body: item.body,
            img: './br_bridal7.jpg'
          });
        };

        const filteredArticlesList = localArticles.filter(art => {
          if (activeArticleCategory === 'all') return true;
          return art.category === activeArticleCategory;
        });

        // Interactive Quizzes Code
        const handleQuizAnswer = (questionKey, answerVal) => {
          const newAnswers = { ...quizAnswers, [questionKey]: answerVal };
          setQuizAnswers(newAnswers);
          setQuizStep(quizStep + 1);
        };

        const resetQuiz = (quizId) => {
          setActiveQuiz(quizId);
          setQuizStep(0);
          setQuizAnswers({});
        };

        const renderQuizContent = () => {
          if (activeQuiz === 'fabric') {
            if (quizStep === 0) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Question 1: What occasion are you dressing for?</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('occ', 'wedding')}>Wedding / Royal Ceremony</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('occ', 'office')}>Office / Daily Formal</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('occ', 'party')}>Casual Summer Party</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('occ', 'festive')}>Traditional Festival</button>
                  </div>
                </div>
              );
            }
            if (quizStep === 1) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Question 2: What climate or season is this outfit for?</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('climate', 'summer')}>Hot Summer / Humid</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('climate', 'winter')}>Cold Winter / Chill</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('climate', 'mild')}>Mild / Spring / Indoor AC</button>
                  </div>
                </div>
              );
            }
            if (quizStep === 2) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Question 3: What texture or feel do you prefer?</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('feel', 'shiny')}>Soft & Shiny (Glossy)</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('feel', 'breathable')}>Crisp & Lightweight</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('feel', 'warm')}>Heavy, Rich & Warm</button>
                  </div>
                </div>
              );
            }
            // Quiz Results calculation
            const occ = quizAnswers.occ;
            const climate = quizAnswers.climate;
            const feel = quizAnswers.feel;
            let resultFabric = 'Premium Giza Cotton';
            let resultCategory = 'cotton';
            let resultDesc = 'Excellent breathability, crisp texture, and easy daily maintenance.';
            let resultPrice = '₹499/meter';

            if (occ === 'wedding' || feel === 'shiny') {
              resultFabric = 'Banarasi Silk / Pure Silk';
              resultCategory = 'silk';
              resultDesc = 'Lustrous texture, royal gold brocade weaves, and holds elegant structured flares.';
              resultPrice = '₹1200/meter';
            } else if (climate === 'summer' || feel === 'breathable') {
              resultFabric = 'Belgian Flax Linen';
              resultCategory = 'linen';
              resultDesc = 'Extremely airy, hollow fibers for hot climates, and a clean natural texture look.';
              resultPrice = '₹690/meter';
            } else if (climate === 'winter' || feel === 'warm') {
              resultFabric = 'Plush Velvet / Tweed Wool';
              resultCategory = 'velvet';
              resultDesc = 'Heavy weight, rich drape, traps warmth comfortably, and feels highly premium.';
              resultPrice = '₹850/meter';
            }

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>🧵</span>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--accent)', fontWeight: 'bold' }}>Recommendation: {resultFabric}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{resultDesc} (Est: {resultPrice})</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={() => { setActiveHub('fabrics'); setSelectedCategory(resultCategory); }}>Go Search in Shop</button>
                  <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }} onClick={() => resetQuiz('fabric')}>Retake Quiz</button>
                </div>
              </div>
            );
          }

          if (activeQuiz === 'body') {
            if (quizStep === 0) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Question 1: What is your fit preference?</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('fit', 'tight')}>Tailored Slim Fit</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('fit', 'regular')}>Classic Regular Fit</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('fit', 'loose')}>Comfort / Oversized</button>
                  </div>
                </div>
              );
            }
            if (quizStep === 1) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Question 2: Select your silhouette structure:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('body', 'broad')}>Broad Shoulders / Athletic</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('body', 'balanced')}>Balanced Proportion</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('body', 'narrow')}>Narrow / Petite Frame</button>
                  </div>
                </div>
              );
            }

            const fit = quizAnswers.fit;
            const body = quizAnswers.body;
            let resultOutfit = 'Classic Structured Kurta Set';
            let resultDesc = 'A well-tailored regular fit kurta provides a clean drop down the frame, balancing proportions.';

            if (fit === 'loose' || body === 'broad') {
              resultOutfit = 'Oversized Pastel Trench Blazer';
              resultDesc = 'A comfortable oversized double-breasted blazer balances broad shoulders and drapes loosely.';
            } else if (fit === 'tight' || body === 'narrow') {
              resultOutfit = 'Structured Slim-Fit Sherwani / Corset Gown';
              resultDesc = 'A close-fitting tailored structure highlights petite silhouettes and adds posture support.';
            }

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>🧥</span>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--accent)', fontWeight: 'bold' }}>Recommendation: {resultOutfit}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{resultDesc}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={() => { setActiveHub('sarees'); }}>Browse Outfit Designs</button>
                  <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }} onClick={() => resetQuiz('body')}>Retake Quiz</button>
                </div>
              </div>
            );
          }

          if (activeQuiz === 'wedding-planner') {
            if (quizStep === 0) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Question 1: What is your role in the wedding?</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('role', 'bride')}>The Bride / Groom</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('role', 'party')}>Bridesmaid / Best Man</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('role', 'guest')}>Wedding Guest</button>
                  </div>
                </div>
              );
            }
            if (quizStep === 1) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Question 2: Select your budget allocation:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('budget', 'low')}>Under ₹5,000</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('budget', 'med')}>₹5,000 to ₹15,000</button>
                    <button className="btn btn-secondary" onClick={() => handleQuizAnswer('budget', 'high')}>Luxury Couture (₹15,000+)</button>
                  </div>
                </div>
              );
            }

            const wRole = quizAnswers.role;
            const wBudget = quizAnswers.budget;
            let resultPlan = 'Premium Custom Stitching';
            let resultDesc = 'We recommend purchasing raw fabrics from our shop and hiring a pro-tailor with measurements for a custom fit.';

            if (wRole === 'bride' || wBudget === 'high') {
              resultPlan = 'Luxury Couture & Designer Consultation';
              resultDesc = 'Book a direct 1-on-1 session with Malini Iyer for raw silk mapping, pattern sheets, and direct tailor assignment.';
            } else if (wRole === 'guest' && wBudget === 'low') {
              resultPlan = 'Ready Dress Alterations';
              resultDesc = 'Order a ready design dress from our shop and use our quick alterations service to fit it to your size.';
            }

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>💍</span>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--accent)', fontWeight: 'bold' }}>Plan Recommended: {resultPlan}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{resultDesc}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={() => { setActiveHub(wRole === 'bride' || wBudget === 'high' ? 'designers' : 'sarees'); }}>Explore Options</button>
                  <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }} onClick={() => resetQuiz('wedding-planner')}>Retake Quiz</button>
                </div>
              </div>
            );
          }

          // Default state: select which quiz to take
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tired of reading? Choose one of our quick interactive planners to get guided style suggestions immediately:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className="btn btn-secondary" style={{ textAlign: 'left', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => resetQuiz('fabric')}>
                  <span>🧵 Find Your Perfect Fabric Quiz</span>
                  <ChevronRight size={16} />
                </button>
                <button className="btn btn-secondary" style={{ textAlign: 'left', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => resetQuiz('body')}>
                  <span>🧥 Silhouette & Body Type Guide</span>
                  <ChevronRight size={16} />
                </button>
                <button className="btn btn-secondary" style={{ textAlign: 'left', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => resetQuiz('wedding-planner')}>
                  <span>💍 Wedding Style & Budget Planner</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        };

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', textAlign: 'left' }}>
            
            {/* 1. Featured Article (Hero) */}
            <div className="glass-card-no-hover articles-hero-grid" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className="badge badge-primary">EDITORIAL HERO</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Malini Iyer • 5 Min Read</span>
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', lineHeight: '1.3' }}>2026 Wedding Trends: Bridal Lehengas, Fabrics & Styling</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  A breakdown of emerging bridal silhouettes, raw thread works, and luxury textile combinations dominating the wedding registers this season.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                  {[
                    { id: 'colors', label: 'Trending Colors', content: 'Emerald Green, Soft Lavender, Champagne Gold, and Dusty Rose are dominating the luxury bridal space. Brides are moving away from traditional reds to pastel bases with heavy gold zari.' },
                    { id: 'cuts', label: 'Popular Cuts', content: 'A-Line structured flares, asymmetric layered hemlines, and off-shoulder corseted blouses are major hits for 2026 receptions.' },
                    { id: 'fabrics', label: 'Premium Fabrics', content: 'Plush Velvet panels, Banarasi Brocade silk borders, and organza overlays with hand-painted gold highlights are preferred for their royal texture.' },
                    { id: 'celebs', label: 'Celebrity Inspiration', content: 'Celebrity weddings this year showed minimal jewelry paired with extremely heavy hand-embroidered lehengas, shifting attention to fabric texture.' }
                  ].map(sec => (
                    <div key={sec.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                      <button 
                        onClick={() => setFeaturedSection(featuredSection === sec.id ? null : sec.id)}
                        style={{ background: 'none', border: 'none', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', padding: '6px 0' }}
                      >
                        <span>{sec.label}</span>
                        <span style={{ color: 'var(--primary)' }}>{featuredSection === sec.id ? '−' : '+'}</span>
                      </button>
                      {featuredSection === sec.id && (
                        <p className="animate-fade-in" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>{sec.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: '280px', borderRadius: '12px', overflow: 'hidden' }}>
                <img src="./br_bridal6.jpg" alt="Bridal Fashion Trend" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* 2. Article Categories */}
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Article Categories</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                <button 
                  className={`btn ${activeArticleCategory === 'all' ? 'btn-primary' : 'btn-ghost'}`} 
                  onClick={() => setActiveArticleCategory('all')}
                  style={{ display: 'flex', gap: '8px', padding: '10px 14px', fontSize: '0.8rem', justifyContent: 'center', border: activeArticleCategory === 'all' ? 'none' : '1px solid var(--border-color)', background: activeArticleCategory === 'all' ? '' : 'rgba(255,255,255,0.01)' }}
                >
                  📖 All Categories
                </button>
                {categoriesList.map(cat => (
                  <button 
                    key={cat.key} 
                    className={`btn ${activeArticleCategory === cat.key ? 'btn-primary' : 'btn-ghost'}`} 
                    onClick={() => setActiveArticleCategory(cat.key)}
                    style={{ display: 'flex', gap: '8px', padding: '10px 14px', fontSize: '0.8rem', justifyContent: 'center', border: activeArticleCategory === cat.key ? 'none' : '1px solid var(--border-color)', background: activeArticleCategory === cat.key ? '' : 'rgba(255,255,255,0.01)' }}
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Two-Column Layout for Main Content & Sidebar */}
            <div className="articles-main-grid">
              
              {/* Left Column: Filtered Articles & Quizzes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* 9. Interactive Articles */}
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Interactive Style Planners</h3>
                  <div className="glass-card-no-hover" style={{ padding: '24px', border: activeQuiz ? '1px solid var(--accent)' : '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#fff' }}>
                        {activeQuiz === 'fabric' && '🧵 Quiz: Find Your Fabric'}
                        {activeQuiz === 'body' && '🧥 Guide: Silhouette Matcher'}
                        {activeQuiz === 'wedding-planner' && '💍 Planner: Wedding Budget'}
                        {!activeQuiz && '🎨 Guided Styling Tools'}
                      </h4>
                      {activeQuiz && (
                        <button className="btn btn-ghost" onClick={() => setActiveQuiz(null)} style={{ padding: '4px 8px', fontSize: '0.72rem', color: 'var(--primary)' }}>Exit Tool</button>
                      )}
                    </div>
                    {renderQuizContent()}
                  </div>
                </div>

                {/* Main Articles List (Fabric Knowledge, Stitching Ed, Student Hub, etc.) */}
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>
                    {activeArticleCategory === 'all' ? 'Latest Styling Guides' : `${activeArticleCategory} Articles`}
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredArticlesList.map(art => (
                      <div key={art.id} className="glass-card article-row-card" onClick={() => setSelectedArticle(art)}>
                        <div style={{ width: '130px', height: '110px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={art.img} alt={art.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left', flexGrow: 1 }}>
                          <span className="badge badge-primary" style={{ width: 'fit-content', fontSize: '0.55rem' }}>{art.category.toUpperCase()}</span>
                          <h4 style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 'bold', marginTop: '4px', lineHeight: '1.3' }}>{art.title}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{art.body}</p>
                          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 'auto' }}>{art.author} • {art.reads} Reads</p>
                        </div>
                      </div>
                    ))}
                    {filteredArticlesList.length === 0 && (
                      <div className="glass-card-no-hover" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No articles found in this category. Select another category above.
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Trending, Seasonal, Designer Picks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* 3. Trending This Week */}
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Trending This Week</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {trendingThisWeek.map((tr, idx) => (
                      <div key={idx} className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer' }} onClick={() => handleTrendingClick(tr)}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)' }}>#0{idx+1}</span>
                          <span className={`badge ${tr.badgeClass}`} style={{ fontSize: '0.55rem' }}>{tr.badge}</span>
                        </div>
                        <h4 style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 'bold' }}>{tr.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. Seasonal Guides */}
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Seasonal Styling Guides</h3>
                  <div className="glass-card-no-hover" style={{ padding: '20px' }}>
                    {/* Tab Selector */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', gap: '10px', marginBottom: '16px' }}>
                      {[
                        { id: 'summer', label: '☀️ Summer' },
                        { id: 'wedding', label: '👗 Wedding' },
                        { id: 'festive', label: '✨ Festive' }
                      ].map(tab => (
                        <button 
                          key={tab.id}
                          className="btn btn-ghost" 
                          onClick={() => setActiveSeasonalTab(tab.id)}
                          style={{ padding: '4px 10px', fontSize: '0.75rem', borderBottom: activeSeasonalTab === tab.id ? '2px solid var(--primary)' : 'none', color: activeSeasonalTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)', background: 'none', borderRadius: '0' }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    {/* Tab Content */}
                    {activeSeasonalTab === 'summer' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                        <div>🍀 <strong>Best Fabrics:</strong> Belgian Flax Linen, Giza Cotton yarn, sheer organza drops.</div>
                        <div>🎨 <strong>Light Colors:</strong> Lavender tones, sky blue, muted champagne, beige shades.</div>
                        <div>🍃 <strong>Breathable Outfits:</strong> Wide-leg linen trousers, loose-fit shirts, unlined blazers.</div>
                      </div>
                    )}
                    {activeSeasonalTab === 'wedding' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                        <div>👑 <strong>Bridal Fabrics:</strong> Plush Velvet panels, Banarasi Brocade silk.</div>
                        <div>👔 <strong>Groom Fabrics:</strong> Italian suiting wool, raw silk sherwanis.</div>
                        <div>👥 <strong>Family Outfits:</strong> Pastel coordinate sets, traditional border silk sarees.</div>
                      </div>
                    )}
                    {activeSeasonalTab === 'festive' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                        <div>🪔 <strong>Diwali Styles:</strong> Heavy Anarkalis, silk Nehru jackets, bootis work.</div>
                        <div>🕌 <strong>Eid Collection:</strong> Sheer Georgette suits, silver embroidery kurtas.</div>
                        <div>🎄 <strong>Christmas Looks:</strong> Emerald Tweed jackets, plush dark red velvet outfits.</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 10. Designer Picks */}
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Designer Recommendations</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="glass-card-no-hover" style={{ padding: '16px', borderLeft: '3px solid var(--primary)' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Malini Iyer" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#fff' }}>Designer Malini Iyer recommends:</span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.4' }}>
                        "For the upcoming festive season, focus on high-neck blouse collars paired with elbow-length heavy sleeve zardozi panels. Keep the saree minimal to make the embroidery pop!"
                      </p>
                      <button className="btn btn-ghost" onClick={() => { setActiveHub('designers'); }} style={{ fontSize: '0.72rem', color: 'var(--primary)', marginTop: '8px', padding: '2px 0', border: 'none', background: 'none' }}>Book Consultation →</button>
                    </div>

                    <div className="glass-card-no-hover" style={{ padding: '16px', borderLeft: '3px solid var(--accent)' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Rahul Varma" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#fff' }}>Designer Rahul Varma recommends:</span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.4' }}>
                        "Gen-Z streetwear is shifting to pastel linen coordinates. Layer an unlined oversized sand blazer over a white cotton crop, paired with sand-tints trousers."
                      </p>
                      <button className="btn btn-ghost" onClick={() => { setActiveHub('designers'); }} style={{ fontSize: '0.72rem', color: 'var(--primary)', marginTop: '8px', padding: '2px 0', border: 'none', background: 'none' }}>Book Session →</button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* --- HUB 6: HISTORY & INVOICES TAB --- */}
      {activeHub === 'history' && (() => {
        const allOrdersList = [
          {
            id: 'ORD-101',
            title: 'Premium 2-Piece Suit',
            tailor: 'Vogue Craft Tailors',
            size: 'M',
            qty: 1,
            price: 4500,
            deliveryDate: '28 May 2026',
            status: 'In Progress',
            img: '/bridal2.jpg',
            steps: [
              { name: 'Order Placed', date: '12 May 2026', completed: true },
              { name: 'Fabric Picked', date: '13 May 2026', completed: true },
              { name: 'Stitching', date: 'In Progress', active: true },
              { name: 'QC Check', date: 'Pending', pending: true },
              { name: 'Out for Delivery', date: 'Pending', pending: true }
            ]
          },
          {
            id: 'ORD-098',
            title: 'Designer Lehenga Set',
            tailor: 'Royal Bespoke',
            size: 'L',
            qty: 1,
            price: 12500,
            deliveryDate: '14 May 2026',
            status: 'Out for Delivery',
            img: '/bridal4.jpg',
            steps: [
              { name: 'Order Placed', date: '02 May 2026', completed: true },
              { name: 'Fabric Picked', date: '03 May 2026', completed: true },
              { name: 'Stitching', date: '06 May 2026', completed: true },
              { name: 'QC Check', date: '10 May 2026', completed: true },
              { name: 'Out for Delivery', date: '12 May 2026', active: true }
            ]
          },
          {
            id: 'ORD-095',
            title: 'Kanchipuram Silk Saree',
            tailor: 'Ethnic Stitches',
            size: 'Free',
            qty: 1,
            price: 8500,
            deliveryDate: '28 Apr 2026',
            status: 'Completed',
            img: '/bridal3.jpg',
            steps: [
              { name: 'Order Placed', date: '20 Apr 2026', completed: true },
              { name: 'Fabric Picked', date: '21 Apr 2026', completed: true },
              { name: 'Stitching', date: '24 Apr 2026', completed: true },
              { name: 'QC Check', date: '26 Apr 2026', completed: true },
              { name: 'Delivered', date: '28 Apr 2026', active: true }
            ]
          },
          {
            id: 'ORD-092',
            title: 'Bridal Lehenga Set',
            tailor: 'Stitch Bee Studio',
            size: 'XL',
            qty: 1,
            price: 15800,
            deliveryDate: '11 Apr 2026',
            status: 'Cancelled',
            img: '/bridal2.jpg',
            steps: [
              { name: 'Order Placed', date: '10 Apr 2026', completed: true },
              { name: 'Cancelled', date: '11 Apr 2026', active: true, cancelled: true }
            ]
          }
        ];

        const filteredOrders = allOrdersList.filter(o => {
          if (ordersFilter === 'all') return true;
          if (ordersFilter === 'in-progress') return o.status === 'In Progress' || o.status === 'Out for Delivery';
          if (ordersFilter === 'completed') return o.status === 'Completed';
          if (ordersFilter === 'cancelled') return o.status === 'Cancelled';
          return true;
        });

        const getBadgeStyle = (status) => {
          switch(status) {
            case 'In Progress':
              return { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' };
            case 'Out for Delivery':
              return { background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' };
            case 'Completed':
              return { background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' };
            case 'Cancelled':
              return { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' };
            default:
              return {};
          }
        };

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header info */}
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: colorTextPrimary, margin: '0 0 4px 0' }}>My Orders</h2>
              <p style={{ color: colorTextSecondary, fontSize: '0.88rem', margin: 0 }}>Track, manage and reorder your stitching orders.</p>
            </div>

            {/* Layout Grid */}
            <div className="orders-wishlist-layout">
              {/* Left Column: Orders list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Filter bar */}
                <div 
                  className="glass-card-no-hover" 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '12px 20px', 
                    borderRadius: '16px', 
                    border: `1.5px solid ${borderColor}`, 
                    background: bgCard,
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['all', 'in-progress', 'completed', 'cancelled'].map((fKey) => (
                      <button
                        key={fKey}
                        onClick={() => setOrdersFilter(fKey)}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          background: ordersFilter === fKey ? 'var(--primary)' : 'transparent',
                          color: ordersFilter === fKey ? '#fff' : colorTextSecondary,
                          textTransform: 'capitalize',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {fKey === 'all' ? 'All Orders' : fKey.replace('-', ' ')}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <select
                      value={ordersTimeframe}
                      onChange={(e) => setOrdersTimeframe(e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: `1px solid ${borderColor}`,
                        background: bgInput,
                        color: colorTextPrimary,
                        fontSize: '0.82rem',
                        fontWeight: '500',
                        outline: 'none'
                      }}
                    >
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option value="Last 6 Months">Last 6 Months</option>
                      <option value="Last Year">Last Year</option>
                    </select>

                    <button
                      className="btn"
                      onClick={() => alert(`Applied filters for orders in timeframe: ${ordersTimeframe}`)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid var(--primary)',
                        color: 'var(--primary)',
                        background: bgCard,
                        fontSize: '0.82rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Filter
                    </button>
                  </div>
                </div>

                {/* Orders cards */}
                {filteredOrders.length === 0 ? (
                  <div className="glass-card-no-hover" style={{ padding: '60px', textAlign: 'center', color: colorTextMuted, background: bgCard, border: `1.5px solid ${borderColor}`, borderRadius: '16px' }}>
                    <FileText size={48} style={{ strokeWidth: 1, marginBottom: '12px', color: 'var(--primary)' }} />
                    <p style={{ margin: 0, fontWeight: 'bold' }}>No matching orders found.</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="glass-card-no-hover order-card-grid" 
                      style={{ 
                        padding: '20px', 
                        background: bgCard, 
                        border: `1.5px solid ${borderColor}`, 
                        borderRadius: '16px'
                      }}
                    >
                      {/* Product thumbnail */}
                      <img 
                        src={order.img} 
                        alt={order.title} 
                        style={{ 
                          width: '90px', 
                          height: '110px', 
                          borderRadius: '10px', 
                          objectFit: 'cover',
                          background: bgInput 
                        }} 
                      />

                      {/* Product details & Timeline */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: colorTextPrimary, margin: 0 }}>Order #{order.id}</h4>
                            <span 
                              style={{ 
                                padding: '2px 8px', 
                                borderRadius: '20px', 
                                fontSize: '0.7rem', 
                                fontWeight: 'bold',
                                ...getBadgeStyle(order.status)
                              }}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: colorTextSecondary, margin: '4px 0 0 0' }}>{order.title} | {order.tailor}</p>
                          <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: colorTextMuted, marginTop: '4px' }}>
                            <span>Size: <strong>{order.size}</strong></span>
                            <span>Qty: <strong>{order.qty}</strong></span>
                          </div>
                        </div>

                        {/* Progress Tracker */}
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginTop: '4px', width: '100%', padding: '0 8px' }}>
                          {/* Background connector line */}
                          <div 
                            style={{ 
                              position: 'absolute', 
                              left: '8px', 
                              right: '8px', 
                              top: '10px', 
                              height: '3px', 
                              background: order.status === 'Cancelled' ? '#ef4444' : borderColor, 
                              zIndex: 1 
                            }} 
                          />
                          {/* Fill connector line for active steps */}
                          {order.status !== 'Cancelled' && (
                            <div 
                              style={{ 
                                position: 'absolute', 
                                left: '8px', 
                                top: '10px', 
                                height: '3px', 
                                background: 'var(--primary)', 
                                zIndex: 1, 
                                width: order.status === 'In Progress' ? '40%' : order.status === 'Out for Delivery' ? '80%' : '100%' 
                              }} 
                            />
                          )}

                          {/* Steps Nodes */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', zIndex: 2 }}>
                            {order.steps.map((st, sIdx) => (
                              <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '60px' }}>
                                <div 
                                  style={{ 
                                    width: '20px', 
                                    height: '20px', 
                                    borderRadius: '50%', 
                                    background: st.cancelled ? '#ef4444' : (st.completed || st.active ? 'var(--primary)' : bgInput), 
                                    border: `2px solid ${st.cancelled ? '#ef4444' : (st.completed || st.active ? 'var(--primary)' : borderColor)}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: '0.65rem',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {st.cancelled ? '✕' : (st.completed ? '✓' : st.active ? '★' : '')}
                                </div>
                                <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: st.completed || st.active ? colorTextPrimary : colorTextMuted, marginTop: '6px', whiteSpace: 'nowrap' }}>
                                  {st.name}
                                </span>
                                <span style={{ fontSize: '0.55rem', color: colorTextMuted, marginTop: '2px' }}>
                                  {st.date}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Pricing and Actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%', paddingLeft: '20px', borderLeft: `1px solid ${borderColor}` }}>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: '800', color: colorTextPrimary }}>₹{order.price.toLocaleString()}</span>
                          <p style={{ fontSize: '0.68rem', color: colorTextMuted, margin: '2px 0 0 0' }}>
                            {order.status === 'Completed' ? 'Delivered on' : order.status === 'Cancelled' ? 'Cancelled on' : 'Est. Delivery'}<br/>
                            <strong style={{ color: colorTextSecondary }}>{order.deliveryDate}</strong>
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            if (order.status === 'Completed') {
                              addOrder({
                                serviceName: `${order.title} (Repeat)`,
                                tailorName: order.tailor,
                                price: order.price,
                                date: 'June 28, 2026',
                                status: 'order_placed',
                                category: 'custom'
                              });
                              alert(`Successfully requested repeat stitching for ${order.title}!`);
                            } else {
                              alert(`Order Details:\nID: #${order.id}\nTailor: ${order.tailor}\nPrice: ₹${order.price}`);
                            }
                          }}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--primary)',
                            color: 'var(--primary)',
                            background: bgCard,
                            fontSize: '0.78rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '16px',
                            textAlign: 'center'
                          }}
                        >
                          {order.status === 'Completed' ? 'Reorder' : order.status === 'Out for Delivery' ? 'Track Order' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Right Column: Summary & Need Help */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Order Summary card */}
                <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: colorTextPrimary, margin: '0 0 16px 0', borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px' }}>Order Summary</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: 'Total Orders', value: 12, color: 'var(--primary)' },
                      { label: 'In Progress', value: 3, color: '#10b981' },
                      { label: 'Out for Delivery', value: 2, color: '#3b82f6' },
                      { label: 'Completed', value: 6, color: '#10b981' },
                      { label: 'Cancelled', value: 1, color: '#ef4444' }
                    ].map((sum, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span style={{ color: colorTextSecondary }}>{sum.label}</span>
                        <strong style={{ color: sum.color }}>{sum.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Need Help card */}
                <div 
                  className="glass-card-no-hover" 
                  style={{ 
                    padding: '20px', 
                    background: isDark ? 'linear-gradient(135deg, rgba(20, 17, 38, 0.9) 0%, rgba(247,37,133,0.05) 100%)' : '#fff9fb', 
                    border: '1.5px dashed rgba(247,37,133,0.2)', 
                    borderRadius: '16px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(247,37,133,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <HelpCircle size={20} />
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 'bold', color: colorTextPrimary, margin: 0 }}>Need Help?</h4>
                  <p style={{ fontSize: '0.78rem', color: colorTextSecondary, margin: 0, lineHeight: '1.4' }}>
                    Our support team is here to help you anytime.
                  </p>
                  
                  {/* Small absolute mannequin illustration */}
                  <img 
                    src="./media__1782584739193.png" 
                    alt="Mannequin" 
                    style={{ 
                      width: '45px', 
                      height: '80px', 
                      objectFit: 'contain', 
                      opacity: 0.15, 
                      position: 'absolute', 
                      right: '12px', 
                      bottom: '8px',
                      pointerEvents: 'none'
                    }} 
                  />

                  <button
                    className="btn btn-primary"
                    onClick={() => alert("Connecting with support... Please email support@stitchbee.com or call +91-98765-43210")}
                    style={{ width: '100%', background: 'var(--primary)', border: 'none', fontWeight: 'bold', fontSize: '0.8rem', padding: '10px', marginTop: '4px' }}
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- HUB 6B: WISHLIST TAB --- */}
      {activeHub === 'wishlist' && (() => {
        const sortedWishlist = [...wishlistItems].sort((a, b) => {
          if (wishlistSort === 'price-low-high') return a.price - b.price;
          if (wishlistSort === 'price-high-low') return b.price - a.price;
          return 0; // Default: recently added (keeps original order)
        });

        const recList = [
          { id: 'rec-1', name: 'Banarasi Silk Saree', price: 9200, rating: 4.8, reviews: 128, img: '/bridal2.jpg' },
          { id: 'rec-2', name: 'Net Embroidered Lehenga', price: 11200, rating: 4.7, reviews: 96, img: '/bridal4.jpg' }
        ];

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: colorTextPrimary, margin: '0 0 4px 0' }}>My Wishlist <Heart size={20} fill="var(--primary)" style={{ color: 'var(--primary)', display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} /></h2>
                <p style={{ color: colorTextSecondary, fontSize: '0.88rem', margin: 0 }}>Your saved designs and fabrics you love.</p>
              </div>

              <button
                onClick={() => alert(`Share link copied to clipboard!\nhttp://localhost:5173/share/wishlist/${currentUser?.name || 'guest'}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: `1.5px solid ${borderColor}`,
                  background: bgCard,
                  color: colorTextPrimary,
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                <Share2 size={14} /> Share Wishlist
              </button>
            </div>

            {/* Sorting Row */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', margin: '-8px 0' }}>
              <span style={{ fontSize: '0.82rem', color: colorTextMuted }}>Sort by:</span>
              <select
                value={wishlistSort}
                onChange={(e) => setWishlistSort(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  background: bgCard,
                  color: colorTextPrimary,
                  fontSize: '0.82rem',
                  fontWeight: '500',
                  outline: 'none'
                }}
              >
                <option value="recently-added">Recently Added</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Layout Grid */}
            <div className="orders-wishlist-layout">
              {/* Left Column: Wishlist Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {wishlistItems.length === 0 ? (
                  <div className="glass-card-no-hover" style={{ padding: '60px', textAlign: 'center', color: colorTextMuted, background: bgCard, border: `1.5px solid ${borderColor}`, borderRadius: '16px' }}>
                    <Heart size={48} style={{ strokeWidth: 1, marginBottom: '12px', color: 'var(--primary)' }} />
                    <p style={{ margin: 0, fontWeight: 'bold' }}>Your Wishlist is empty.</p>
                  </div>
                ) : (
                  sortedWishlist.map((item) => (
                    <div
                      key={item.id}
                      className="glass-card-no-hover wishlist-card-grid"
                      style={{
                        padding: '16px',
                        background: bgCard,
                        border: `1.5px solid ${borderColor}`,
                        borderRadius: '16px'
                      }}
                    >
                      {/* Product Image */}
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        style={{ 
                          width: '90px', 
                          height: '110px', 
                          borderRadius: '10px', 
                          objectFit: 'cover',
                          background: bgInput 
                        }} 
                      />

                      {/* Description & specs */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div>
                          <span 
                            style={{ 
                              padding: '2px 8px', 
                              borderRadius: '20px', 
                              fontSize: '0.62rem', 
                              fontWeight: '800',
                              background: item.category === 'saree' ? 'rgba(247,37,133,0.08)' : 'rgba(114,9,183,0.08)', 
                              color: item.category === 'saree' ? 'var(--primary)' : 'var(--secondary)',
                              textTransform: 'capitalize'
                            }}
                          >
                            {item.category}
                          </span>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: colorTextPrimary, margin: '4px 0 2px 0' }}>{item.name}</h4>
                          <p style={{ fontSize: '0.78rem', color: colorTextSecondary, margin: 0, lineHeight: '1.3' }}>{item.desc}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: colorTextMuted, flexWrap: 'wrap' }}>
                          <span>🧵 {item.fabric}</span>
                          <span>🎨 {item.color}</span>
                          <span>📏 {item.length}</span>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%', paddingLeft: '16px', borderLeft: `1px solid ${borderColor}` }}>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '1.2rem', fontWeight: '800', color: colorTextPrimary }}>₹{item.price.toLocaleString()}</span>
                          <p style={{ fontSize: '0.68rem', color: colorTextMuted, margin: '2px 0 0 0' }}>Added on {item.addedOn}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '16px' }}>
                          <button
                            className="btn"
                            onClick={() => alert(`Showing design specs for ${item.name}`)}
                            style={{
                              flex: 1,
                              padding: '8px 4px',
                              borderRadius: '8px',
                              border: '1.5px solid var(--primary)',
                              color: 'var(--primary)',
                              background: bgCard,
                              fontSize: '0.72rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              textAlign: 'center'
                            }}
                          >
                            View Details
                          </button>
                          
                          <button
                            onClick={() => {
                              // Toggle heart active
                              alert(`${item.name} is already in your wishlist!`);
                            }}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              border: `1.5px solid ${borderColor}`,
                              background: bgInput,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: 'var(--primary)'
                            }}
                          >
                            <Heart size={14} fill="var(--primary)" />
                          </button>

                          <button
                            onClick={() => {
                              setWishlistItems(prev => prev.filter(w => w.id !== item.id));
                              alert(`${item.name} removed from Wishlist.`);
                            }}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              border: `1px solid ${borderColor}`,
                              background: bgInput,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: colorTextMuted
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Right Column: Wishlist Summary & recommendations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Summary Card */}
                <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: colorTextPrimary, margin: '0 0 16px 0', borderBottom: `1px solid ${borderColor}`, paddingBottom: '10px' }}>Wishlist Summary</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                    {[
                      { label: 'Total Items', value: wishlistItems.length },
                      { label: 'Sarees', value: wishlistItems.filter(i => item => item.category === 'saree').length || 2 },
                      { label: 'Lehengas', value: wishlistItems.filter(i => item => item.category === 'lehenga').length || 2 },
                      { label: 'Fabrics', value: 2 }
                    ].map((sum, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span style={{ color: colorTextSecondary }}>{sum.label}</span>
                        <strong style={{ color: colorTextPrimary }}>{sum.value}</strong>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        wishlistItems.forEach(item => {
                          handleAddToCart({ id: item.id, name: item.name, price: item.price, image: item.img }, item.category);
                        });
                        alert("Successfully moved all items to cart!");
                      }}
                      style={{ width: '100%', background: 'var(--primary)', border: 'none', fontWeight: 'bold', fontSize: '0.8rem', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <ShoppingCart size={14} /> Move All to Cart
                    </button>
                    
                    <button
                      onClick={() => {
                        setWishlistItems([]);
                        alert("Cleared all items from Wishlist.");
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: `1.5px solid ${borderColor}`,
                        background: bgCard,
                        color: colorTextSecondary,
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Trash2 size={14} /> Clear Wishlist
                    </button>
                  </div>
                </div>

                {/* You May Also Like Card */}
                <div className="glass-card-no-hover" style={{ padding: '20px', background: bgCard, border: `1px solid ${borderColor}`, borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 'bold', color: colorTextPrimary, margin: 0 }}>You May Also Like</h4>
                    <span 
                      style={{ fontSize: '0.72rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={() => setActiveHub('sarees')}
                    >
                      View All
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {recList.map((rec) => (
                      <div key={rec.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative' }}>
                        <img src={rec.img} alt={rec.name} style={{ width: '56px', height: '70px', borderRadius: '6px', objectFit: 'cover', background: bgInput }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h5 style={{ fontSize: '0.78rem', fontWeight: 'bold', color: colorTextPrimary, margin: '0 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rec.name}</h5>
                          <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--primary)', display: 'block' }}>₹{rec.price.toLocaleString()}</span>
                          <span style={{ fontSize: '0.68rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                            <Star size={10} fill="#fbbf24" style={{ color: '#fbbf24' }} /> {rec.rating} ({rec.reviews})
                          </span>
                        </div>
                        
                        <button
                          onClick={() => {
                            handleAddToCart({ id: rec.id, name: rec.name, price: rec.price, image: rec.img }, 'saree');
                            alert(`${rec.name} added to cart!`);
                          }}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '6px',
                            border: `1.2px solid ${borderColor}`,
                            background: bgCard,
                            color: colorTextPrimary,
                            fontSize: '0.68rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- HUB 7: CUSTOM DESIGN UPLOAD --- */}
      {activeHub === 'design-upload' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', textAlign: 'left' }}>
          {/* Header banner */}
          <div style={{ background: 'var(--grad-primary)', padding: '24px', borderRadius: '12px', textAlign: 'left' }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.65rem' }}>PINTEREST & SKETCH STUDIO</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', marginTop: '6px' }}>Upload Your Inspiration</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginTop: '4px' }}>Have a photo from Instagram, Pinterest, or a hand-drawn sketch? Share it below. Our custom designers will review it, suggest fabrics, and send you direct design bids.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start', flexWrap: 'wrap' }}>
            {/* Upload Form */}
            <div className="glass-card-no-hover" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', color: 'var(--primary)' }}>Submit Custom Sketch / Outfit Link</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Inspiration Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Lavender Georgette Anarkali with Gota Patti" 
                  className="form-input"
                  value={inspTitle}
                  onChange={e => setInspTitle(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Category</label>
                  <select 
                    value={inspCategory}
                    onChange={e => setInspCategory(e.target.value)}
                    className="form-select"
                    style={{ width: '100%' }}
                  >
                    <option value="bridal">Bridal Wear</option>
                    <option value="ethnic">Ethnic Wear</option>
                    <option value="western">Western Wear</option>
                    <option value="office">Office Wear</option>
                    <option value="party">Party Wear</option>
                    <option value="kids">Kids Wear</option>
                    <option value="uniforms">Uniform Designs</option>
                    <option value="concepts">Custom Concepts</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Target Budget (₹)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5000" 
                    className="form-input"
                    value={inspBudget}
                    onChange={e => setInspBudget(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Pinterest / IG Link or Image URL</label>
                <input 
                  type="text" 
                  placeholder="Paste URL (e.g. https://images.unsplash.com/... or Pinterest link)" 
                  className="form-input"
                  value={inspImage}
                  onChange={e => setInspImage(e.target.value)}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Paste any online image URL to generate an interactive mockup preview.</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Outfit Description & Custom Styling Directions</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your design specifications (e.g. Fit preferences, fabric embroidery, collar style, sleeve details, hemline instructions)"
                  className="form-textarea"
                  value={inspDesc}
                  onChange={e => setInspDesc(e.target.value)}
                  style={{ width: '100%', resize: 'none' }}
                />
              </div>

              <button 
                onClick={() => {
                                    const newUpload = {
                    id: Date.now(),
                    title: inspTitle,
                    category: inspCategory,
                    image: resolveInspirationImage(inspImage) || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
                    description: inspDesc,
                    budget: parseInt(inspBudget),
                    status: 'Awaiting Bids',
                    bids: []
                  };
                  setInspSubmissions([newUpload, ...inspSubmissions]);
                  setInspTitle('');
                  setInspImage('');
                  setInspDesc('');
                  setInspBudget('');
                  alert('Inspiration uploaded successfully! Designers have been notified.');
                  
                  // Mock interactive feedback: generate a bid from a designer after 4 seconds!
                  setTimeout(() => {
                    setInspSubmissions(prev => prev.map(item => {
                      if (item.id === newUpload.id) {
                        return {
                          ...item,
                          status: 'Bids Received',
                          bids: [
                            {
                              designerId: 'd2',
                              designerName: 'Rahul Varma',
                              amount: Math.round(newUpload.budget * 0.9),
                              time: 'Just now',
                              rating: 4.7,
                              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
                            }
                          ]
                        };
                      }
                      return item;
                    }));
                  }, 4000);
                }}
                className="btn btn-primary" 
                style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
              >
                Submit Inspiration to Designer Pool
              </button>
            </div>
 
            {/* Live Preview Panel */}
            <div className="glass-card-no-hover" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '400px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', color: 'var(--accent)' }}>Live Preview</h3>
              
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '20px', background: 'rgba(255,255,255,0.01)', overflow: 'hidden' }}>
                {(() => {
                  const resolvedPreviewImg = resolveInspirationImage(inspImage);
                  if (resolvedPreviewImg) {
                    return (
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ height: '280px', borderRadius: '6px', overflow: 'hidden', background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={resolvedPreviewImg} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' }} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{inspCategory.toUpperCase()}</span>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginTop: '6px' }}>{inspTitle || 'Untitled Design'}</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{inspDesc || 'No description provided.'}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Budget:</span>
                            <strong style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>₹{inspBudget || '0'}</strong>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <Upload size={40} style={{ color: 'rgba(255,255,255,0.2)' }} />
                      <div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No valid image link pasted yet.</p>
                        <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>Paste an Unsplash image URL or click to see how it looks.</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Submissions List */}
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '16px', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>Your Inspiration Submissions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {inspSubmissions.map(sub => (
                <div key={sub.id} className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'start' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={sub.image} alt={sub.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{sub.category.toUpperCase()}</span>
                        <span className={`badge ${sub.status === 'Awaiting Bids' ? 'badge-secondary' : 'badge-success'}`} style={{ fontSize: '0.65rem' }}>{sub.status}</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: #{sub.id.toString().slice(-6)}</span>
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{sub.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{sub.description}</p>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                      <div>Budget Limit: <strong style={{ color: 'var(--accent)' }}>₹{sub.budget}</strong></div>
                      <div>Bids Received: <strong>{sub.bids.length}</strong></div>
                    </div>

                    {/* Bids List */}
                    {sub.bids.length > 0 && (
                      <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <h5 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Active Designer Bids</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {sub.bids.map((bid, bidx) => (
                            <div key={bidx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: bidx < sub.bids.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', paddingBottom: bidx < sub.bids.length - 1 ? '10px' : '0' }}>
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <img src={bid.avatar} alt={bid.designerName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>{bid.designerName}</div>
                                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>⭐ {bid.rating} • {bid.time}</div>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <strong style={{ color: 'var(--primary)', fontSize: '0.95rem' }}>₹{bid.amount}</strong>
                                <button className="btn btn-primary" onClick={() => alert(`Bid of ₹${bid.amount} by ${bid.designerName} accepted! We will initialize a consultation session.`)} style={{ padding: '4px 12px', fontSize: '0.72rem' }}>Accept Bid</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {inspSubmissions.length === 0 && (
                <div className="glass-card-no-hover" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No custom inspirations uploaded yet. Use the form above to share your dream outfit with our designer community.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- LIVE ORDER TRACKER SECTION --- */}
      {activeHub === 'tailors' && !wizardOpen && (
        <div style={{ marginTop: '48px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px' }}>
          <h3 className="section-title"><Clock size={20} style={{ color: 'var(--primary)' }} /> Live Custom Order Tracker</h3>
          
          {activeOrders.length === 0 ? (
            <div className="glass-card-no-hover" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No custom orders booked yet. Place a tailor order above to start tracking.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeOrders.map(order => {
                const currentIdx = getStatusIndex(order.status);
                const isTrial = order.status === 'trial_period';
                const secondsLeft = timerState[order.id];
                
                return (
                  <div key={order.id} className="glass-card-no-hover animate-fade-in" style={{ padding: '20px' }}>
                    <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontWeight: '700', color: '#fff', fontSize: '1.1rem' }}>Order #{order.id}</span>
                          <span className="badge badge-primary">{order.serviceName}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Shop: <strong>{order.tailorName}</strong> | Scheduled: {order.date}
                        </p>
                      </div>

                      {/* SIMULATE ADVANCE BUTTON FOR PROTOTYPING */}
                      {order.status !== 'closed' && (
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--primary)' }}
                          onClick={() => handleAdvanceStep(order.id, order.status)}
                        >
                          <RefreshCw size={12} /> Advance State Simulation
                        </button>
                      )}
                    </div>

                    {/* Progress Dots timeline */}
                    <div className="progress-timeline">
                      <div className="progress-timeline-line">
                        <div 
                          className="progress-timeline-line-fill" 
                          style={{ '--fill-percentage': `${(currentIdx / 11) * 100}%` }}
                        ></div>
                      </div>

                      {orderStatesList.map((step, idx) => {
                        const active = idx === currentIdx;
                        const past = idx < currentIdx;
                        return (
                          <div key={step} className="progress-timeline-step">
                            <div 
                              className="progress-timeline-dot"
                              style={{
                                background: active ? 'var(--primary)' : past ? 'var(--success)' : '#141226',
                                border: `2px solid ${active ? 'var(--primary)' : past ? 'var(--success)' : 'rgba(255,255,255,0.08)'}`
                              }}
                            >
                              {past ? '✓' : idx + 1}
                            </div>
                            <span 
                              className="progress-timeline-label"
                              style={{ color: active ? '#fff' : past ? '#34d399' : 'var(--text-muted)' }}
                            >
                              {step.replace('_', ' ')}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* 15 Minute Trial Countdown details */}
                    {isTrial && (
                      <div className="timer-banner animate-fade-in">
                        <div>
                          <h4 style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> 15-Minute Sizing Trial Active</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Please try on the garment. Our delivery partner is waiting outside to finalize sizes.</p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                          <div className="timer-digits">
                            {secondsLeft > 0 ? formatTimerValue(secondsLeft) : 'Expired'}
                          </div>
                          
                          <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => updateOrderStatus(order.id, 'closed')}>
                            Confirm Perfect Fit & Close
                          </button>

                          <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem', color: 'var(--warning)' }} onClick={() => { updateOrderStatus(order.id, 'stitching_started'); alert('Alteration request logged. Order sent back to stitching status.'); }}>
                            Request Alteration
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Basic specs layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', padding: '14px', background: 'rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '0.8rem', marginTop: '10px' }}>
                      <div>
                        <p><strong>Stitching:</strong> {order.serviceName} (₹{order.price})</p>
                        <p><strong>Sizing Method:</strong> {order.measurementType?.toUpperCase() || 'STANDARD'}</p>
                      </div>
                      <div>
                        <p><strong>Delivery:</strong> {order.deliveryType === 'student' ? 'Student Agent Delivery' : 'Pickup at shop'}</p>
                        <p><strong>Fittings Specs:</strong> Chest: {order.measurements?.chest || 0}", Waist: {order.measurements?.waist || 0}", Shoulder: {order.measurements?.shoulder || 0}"</p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* CART OVERLAY SLIDE OUT */}
      {cartOpen && (
        <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: 0 }}>
          <div className="modal-content animate-fade-in" style={{ width: '400px', height: '100vh', borderRadius: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' }}>
            <div>
              <div className="modal-header" style={{ marginBottom: '16px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShoppingCart size={20} /> Shopping Cart</h3>
                <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setCartOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {cart.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '40px' }}>Your cart is empty.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '70vh', overflowY: 'auto' }}>
                  {cart.map(item => (
                    <div key={item.id} className="flex-row-between" style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ width: '45px', height: '45px', borderRadius: '4px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>{item.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>₹{item.price}{item.type === 'fabric' && '/m'}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => handleUpdateCartQty(item.id, -1)}><Minus size={12} /></button>
                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{item.qty} {item.type === 'fabric' && 'm'}</span>
                        <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => handleAddToCart(item, item.type)}><Plus size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                <div className="flex-row-between" style={{ marginBottom: '16px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Total Cost:</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent)' }}>
                    ₹{cart.reduce((a,c) => a + (c.price * c.qty), 0)}
                  </span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }} onClick={handleCheckoutCart}>
                  Checkout & Pay via UPI
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Article Details Modal Overlay */}
      {selectedArticle && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 999999, padding: '20px'
          }}
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="glass-card-no-hover animate-fade-in"
            style={{
              width: '100%', maxWidth: '650px', maxHeight: '90vh',
              overflowY: 'auto', background: 'var(--bg-dark)',
              border: '1px solid var(--border-color)', borderRadius: '16px',
              padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px',
              textAlign: 'left'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{selectedArticle.category.toUpperCase()}</span>
              <button 
                onClick={() => setSelectedArticle(null)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', lineHeight: '1.3' }}>{selectedArticle.title}</h3>
            
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div>Author: <strong>{selectedArticle.author}</strong></div>
              <div>•</div>
              <div>Reads: <strong>{selectedArticle.reads}</strong></div>
            </div>

            {selectedArticle.img && (
              <div style={{ height: '220px', borderRadius: '8px', overflow: 'hidden', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={selectedArticle.img} alt="Article cover" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            )}

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
              {selectedArticle.body}
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button 
                className="btn btn-primary" 
                style={{ flexGrow: 1 }} 
                onClick={() => {
                  setSelectedArticle(null);
                  setActiveHub('fabrics');
                }}
              >
                Explore Recommended Fabrics
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', flexGrow: 1 }} 
                onClick={() => {
                  setSelectedArticle(null);
                  setActiveHub('designers');
                }}
              >
                Book Designer Consultation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}
