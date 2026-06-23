import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Star, Scissors, Truck, Calendar, Sparkles, User, Info, Map, List, Clock, 
  CreditCard, ChevronRight, X, ShoppingCart, Plus, Minus, Check, Camera, RefreshCw, Upload, 
  Video, Layers, Activity, FileText, Shield, Sliders 
} from 'lucide-react';
import { loadFromStorage, saveToStorage, executePgQuery, FABRIC_MARKETPLACE_DATA } from '../utils/mockDb';
import ServiceCategoryView from './ServiceCategoryView';

export default function CustomerView({ 
  tailors, orders, addOrder, updateOrderStatus, ledger, setLedger, banners, articles, currentUser,
  initialCategory = 'all', initialHub = 'tailors', onLoginRequired
}) {
  const bannerCarouselRef = React.useRef(null);
  const designerCarouselRef = React.useRef(null);
  const [activeHub, setActiveHub] = useState(initialHub); // 'tailors' | 'fabrics' | 'sarees' | 'designers' | 'articles' | 'history'
  
  // Dashboard & Booking Wizard States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

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

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  
  // Sizing & Sizing State
  const [customerName, setCustomerName] = useState('Aarav Mehta');
  const [customerAddress, setCustomerAddress] = useState('Apartment 204, Royal Palms, Koramangala');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 - 12:00');
  const [measurementOption, setMeasurementOption] = useState('ai'); 
  const [deliveryType, setDeliveryType] = useState('student'); // 'self' | 'student'
  const [notes, setNotes] = useState('');
  const [technicianGender, setTechnicianGender] = useState('male'); // male | female

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
  React.useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
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

  // Group completed orders for History Tab
  const completedOrders = orders.filter(o => o.status === 'closed');
  const activeOrders = orders.filter(o => o.status !== 'closed');

  return (
    <div className="view-container">
      
      {/* Dynamic promo banners from CMS */}
      {banners.length > 0 && activeHub === 'tailors' && !wizardOpen && (
        <div ref={bannerCarouselRef} className="promo-banner-list">
          {banners.map(b => (
            <div 
              key={b.id} 
              className="glass-card-no-hover promo-banner-card" 
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(8,7,16,0.95) 0%, rgba(8,7,16,0.4) 100%), url(${b.imageUrl})`
              }}
            >
              <span className="badge badge-primary" style={{ width: 'fit-content', marginBottom: '6px', fontSize: '0.65rem' }}>Promo Offer</span>
              <h4 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: '800' }}>{b.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{b.subtitle}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hub Tabs selector */}
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
          <div className="wizard-steps-header">
            <div className="wizard-steps-line">
              <div className="wizard-steps-line-fill" style={{ width: `${((wizardStep - 1) / 4) * 100}%` }}></div>
            </div>
            {[1, 2, 3, 4, 5].map(s => (
              <div 
                key={s} 
                className={`wizard-step-dot ${s === wizardStep ? 'active' : s < wizardStep ? 'completed' : ''}`}
              >
                {s < wizardStep ? '✓' : s}
              </div>
            ))}
          </div>

          {/* Wizard step contents */}
          <form onSubmit={submitWizardBooking}>
            
            {/* STEP 1: Design & Fabric Selection */}
            {wizardStep === 1 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Step 1: Choose Style Design & Fabric</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Select a fashion design template and add premium stitching fabrics.</p>
                </div>

                {/* Categories Tag Summary */}
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <span>Active Stitch Category: <strong>{categoryCards.find(c => c.id === selectedWizardCategory)?.label || selectedWizardCategory}</strong></span>
                </div>

                {/* Select design */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '10px' }}>Designer Recommendations (Optional)</h4>
                  <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '10px' }}>
                    <div 
                      className="glass-card"
                      style={{
                        flex: '0 0 auto', width: '220px', padding: '14px', borderRadius: '8px', cursor: 'pointer',
                        border: `1.5px solid ${!selectedDesign ? 'var(--primary)' : 'var(--border-color)'}`,
                        background: !selectedDesign ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                      }}
                      onClick={() => setSelectedDesign(null)}
                    >
                      <div style={{ width: '100%', height: '100px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Scissors size={28} style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <h5 style={{ fontSize: '0.9rem', marginTop: '10px', color: '#fff' }}>Provide Own Pattern</h5>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>No pre-set template. Input details manually.</p>
                    </div>

                    {newArrivalDesigns.filter(d => d.category === selectedWizardCategory || selectedWizardCategory === 'bridal').map(design => (
                      <div 
                        key={design.id}
                        className="glass-card"
                        style={{
                          flex: '0 0 auto', width: '220px', padding: '14px', borderRadius: '8px', cursor: 'pointer',
                          border: `1.5px solid ${selectedDesign?.id === design.id ? 'var(--primary)' : 'var(--border-color)'}`,
                          background: selectedDesign?.id === design.id ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                        }}
                        onClick={() => setSelectedDesign(design)}
                      >
                        <img src={design.image} alt={design.title} style={{ width: '100%', height: '100px', borderRadius: '6px', objectFit: 'cover' }} />
                        <h5 style={{ fontSize: '0.9rem', marginTop: '10px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{design.title}</h5>
                        <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: '600' }}>₹{design.price} Stitch Fee</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fabric stitching option */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                  <div className="flex-row-between" style={{ marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '0.95rem' }}>StitchBee Fabrics Integration</h4>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input type="checkbox" checked={addFabric} onChange={e => { setAddFabric(e.target.checked); if (e.target.checked && !selectedFabric) setSelectedFabric(mockFabrics[0]); }} />
                      Buy Fabric from site and stitch here
                    </label>
                  </div>

                  {addFabric && (
                    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                      {mockFabrics.map(fb => (
                        <div 
                          key={fb.id}
                          className="glass-card"
                          style={{
                            padding: '14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center',
                            border: `1.5px solid ${selectedFabric?.id === fb.id ? 'var(--primary)' : 'var(--border-color)'}`,
                            background: selectedFabric?.id === fb.id ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                          }}
                          onClick={() => setSelectedFabric(fb)}
                        >
                          <img src={fb.image} alt={fb.name} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>{fb.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '700' }}>+₹{fb.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setWizardOpen(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={nextStep}>Next: Sizing & Measurements <ChevronRight size={14} /></button>
                </div>
              </div>
            )}

            {/* STEP 2: Sizing & Measurements */}
            {wizardStep === 2 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Step 2: Sizing & Fit Measurements</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Select how we should capture your measurements for fitting.</p>
                </div>

                {/* Basic client info */}
                <div className="grid-cols-2" style={{ gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Client Name</label>
                    <input type="text" className="form-input" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-input" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} required />
                  </div>
                </div>

                {/* Selection panel */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                  {/* Option: AI scan */}
                  <div 
                    className="glass-card" 
                    onClick={() => setMeasurementOption('ai')}
                    style={{
                      padding: '12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                      border: `1.5px solid ${measurementOption === 'ai' ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: measurementOption === 'ai' ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <Camera size={18} style={{ color: 'var(--primary)', marginBottom: '4px' }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>AI Body Scan</div>
                    <span className="badge badge-success" style={{ fontSize: '0.55rem', padding: '1px 4px', marginTop: '4px' }}>Free</span>
                  </div>

                  {/* Option: Manual entry */}
                  <div 
                    className="glass-card" 
                    onClick={() => setMeasurementOption('manual')}
                    style={{
                      padding: '12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                      border: `1.5px solid ${measurementOption === 'manual' ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: measurementOption === 'manual' ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <Scissors size={18} style={{ color: 'var(--accent)', marginBottom: '4px' }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Manual Input</div>
                    <span className="badge badge-secondary" style={{ fontSize: '0.55rem', padding: '1px 4px', marginTop: '4px' }}>Free</span>
                  </div>

                  {/* Option: Home visit */}
                  <div 
                    className="glass-card" 
                    onClick={() => setMeasurementOption('expert')}
                    style={{
                      padding: '12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                      border: `1.5px solid ${measurementOption === 'expert' ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: measurementOption === 'expert' ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <User size={18} style={{ color: '#10b981', marginBottom: '4px' }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Home Visit Fit</div>
                    <span className="badge badge-primary" style={{ fontSize: '0.55rem', padding: '1px 4px', marginTop: '4px' }}>+₹100</span>
                  </div>

                  {/* Option: reference dress */}
                  <div 
                    className="glass-card" 
                    onClick={() => setMeasurementOption('dress')}
                    style={{
                      padding: '12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                      border: `1.5px solid ${measurementOption === 'dress' ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: measurementOption === 'dress' ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <Upload size={18} style={{ color: '#fbbf24', marginBottom: '4px' }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Existing Dress</div>
                    <span className="badge badge-secondary" style={{ fontSize: '0.55rem', padding: '1px 4px', marginTop: '4px' }}>Free</span>
                  </div>

                  {/* Option: video assist */}
                  <div 
                    className="glass-card" 
                    onClick={() => setMeasurementOption('video')}
                    style={{
                      padding: '12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                      border: `1.5px solid ${measurementOption === 'video' ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: measurementOption === 'video' ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <Video size={18} style={{ color: '#a78bfa', marginBottom: '4px' }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff' }}>Video Assist</div>
                    <span className="badge badge-secondary" style={{ fontSize: '0.55rem', padding: '1px 4px', marginTop: '4px' }}>Free</span>
                  </div>
                </div>

                {/* Sub Panel details */}
                {measurementOption === 'ai' && (
                  <div className="glass-card-no-hover" style={{ padding: '20px', background: 'rgba(10,8,25,0.7)', border: '1.5px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Camera size={16} /> StitchBee AI Sizing Scanner Studio
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
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Contactless 3D AI Sizing</h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto', lineHeight: '1.5' }}>
                          Using our computer vision sizing engine, compute full-body custom tailoring measurements in seconds using your camera profile.
                        </p>
                        <button type="button" className="btn btn-primary animate-pulse" style={{ padding: '8px 20px', fontSize: '0.8rem', marginTop: '6px' }} onClick={() => setAiScanStep('permission')}>
                          Launch Sizing Scanner
                        </button>
                      </div>
                    )}

                    {/* STEP 2: CAMERA PERMISSION REQUEST */}
                    {aiScanStep === 'permission' && (
                      <div className="animate-fade-in" style={{ padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Shield size={14} style={{ color: 'var(--accent)' }} /> <strong>Device Camera Permissions</strong>
                        </span>
                        <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                          StitchBee requests access to your webcam to perform body contour landmark mapping. No image frames are saved or transmitted to any server—processing occurs 100% locally in your browser sandbox.
                        </p>
                        {aiCameraError && (
                          <div style={{ padding: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', fontSize: '0.72rem', color: 'var(--danger)' }}>
                            {aiCameraError}
                          </div>
                        )}
                        <div className="grid-cols-2" style={{ gap: '10px' }}>
                          <button type="button" className="btn btn-primary" style={{ padding: '8px', fontSize: '0.78rem' }} onClick={async () => {
                            const stream = await startCamera();
                            if (stream) setAiScanStep('instructions');
                          }}>
                            Request Webcam Access
                          </button>
                          <button type="button" className="btn btn-secondary" style={{ padding: '8px', fontSize: '0.78rem' }} onClick={() => {
                            setAiCameraError(null);
                            setAiScanStep('instructions');
                          }}>
                            Simulate Webcam Sensor
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: INSTRUCTIONS SCREEN */}
                    {aiScanStep === 'instructions' && (
                      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--accent)' }}>📐 Scan Posture Instructions</span>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
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
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Visible from head to toe.</span>
                          <button type="button" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.76rem' }} onClick={() => {
                            if (!cameraStream) startCamera();
                            setAiScanStep('capturing_front');
                          }}>
                            Start Auto-Capture sequence
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: TIMELINE AUTO-CAPTURE ENGINES */}
                    {aiScanStep.startsWith('capturing_') && (
                      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '100%', height: '200px', background: '#05040a', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {cameraStream ? (
                            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', justifyContent: 'center', color: 'rgba(76,201,240,0.8)' }}>
                              <div style={{ width: '40px', height: '40px', border: '2px dashed #4cc9f0', borderRadius: '50%', animation: 'spinSlow 3s linear infinite' }} />
                              <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>MOCK VIDEO SCAN ACTIVE</span>
                            </div>
                          )}
                          
                          {/* Pulsing scanning frame laser visual */}
                          <div style={{ position: 'absolute', inset: '10px', border: '2px solid rgba(76,201,240,0.4)', borderRadius: '4px', pointerEvents: 'none' }}>
                            <div style={{ width: '100%', height: '2px', background: '#4cc9f0', position: 'absolute', top: '50%', left: 0, boxShadow: '0 0 8px #4cc9f0', animation: 'pulseGlow 1.5s infinite' }} />
                          </div>

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
                      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' }}>ℹ️ Sizing Engine Parameter calibration</span>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                          Contours captured! Provide your exact height. The Sizing Engine automatically estimates gender, age, weight, and shape curves without asking.
                        </p>
                        
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Client Height (cm) *</label>
                          <input type="number" min="100" max="250" className="form-input" value={aiHeight} onChange={e => setAiHeight(parseInt(e.target.value) || 170)} required />
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
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '12px' }}>Doorstep Logistics Delivery</h4>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div 
                      className="glass-card" 
                      onClick={() => setDeliveryType('student')}
                      style={{
                        flex: 1, padding: '12px', borderRadius: '8px', cursor: 'pointer',
                        border: `1.5px solid ${deliveryType === 'student' ? 'var(--primary)' : 'var(--border-color)'}`,
                        background: deliveryType === 'student' ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                      }}
                    >
                      <div style={{ display: 'flex', justify: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.85rem', color: '#fff' }}>Student Delivery</span>
                        <span className="badge badge-success">+₹50</span>
                      </div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Certified student partners manage pickups and deliver finished clothes.</p>
                    </div>

                    <div 
                      className="glass-card" 
                      onClick={() => setDeliveryType('self')}
                      style={{
                        flex: 1, padding: '12px', borderRadius: '8px', cursor: 'pointer',
                        border: `1.5px solid ${deliveryType === 'self' ? 'var(--primary)' : 'var(--border-color)'}`,
                        background: deliveryType === 'self' ? 'rgba(247,37,133,0.06)' : 'rgba(255,255,255,0.01)'
                      }}
                    >
                      <div style={{ display: 'flex', justify: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.85rem', color: '#fff' }}>Self Pick-up</span>
                        <span className="badge badge-secondary">Free</span>
                      </div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Visit the tailor shop to collect yourself once stitching completes.</p>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={nextStep}>Next: Match Nearby Tailor <ChevronRight size={14} /></button>
                </div>
              </div>
            )}

            {/* STEP 3: Match Nearby Tailor (Uber/Namma Yatri style) */}
            {wizardStep === 3 && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Step 3: Geolocated Tailor Match Radar</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Select from tailors registered under our app matching your coordinate area.</p>
                </div>

                {/* Place Search bar */}
                <div style={{ position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Search by area (e.g. HSR Layout, Indiranagar, Koramangala)..." 
                    className="form-input" 
                    value={placeSearchText} 
                    onChange={e => setPlaceSearchText(e.target.value)}
                    style={{ paddingLeft: '44px' }}
                  />
                </div>

                {/* Uber Box Layout */}
                <div className="uber-search-box">
                  {/* Left list */}
                  <div className="uber-tailor-list">
                    {wizardFilteredTailors.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '40px' }}>No tailors found in this area for this category.</p>
                    ) : (
                      wizardFilteredTailors.map(tailor => (
                        <div 
                          key={tailor.id} 
                          className={`uber-tailor-item ${selectedTailor?.id === tailor.id ? 'active' : ''}`}
                          onClick={() => setSelectedTailor(tailor)}
                        >
                          <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#fff' }}>{tailor.name}</span>
                            <span style={{ fontSize: '0.8rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '2px' }}>
                              ★ {tailor.rating}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{tailor.address} ({tailor.distance}km away)</p>
                          <span className="badge badge-secondary" style={{ fontSize: '0.55rem', marginTop: '6px' }}>{tailor.specialty}</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Right Map */}
                  <div className="map-sim" style={{ height: '100%' }}>
                    <div className="map-grid"></div>
                    <div className="map-road" style={{ top: '60px', left: 0, right: 0, height: '12px' }}></div>
                    <div className="map-road" style={{ top: 0, bottom: 0, left: '50%', width: '12px' }}></div>
                    {/* User Marker */}
                    <div className="map-marker" style={{ top: '55%', left: '48%' }}>
                      <div className="marker-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' }}></div>
                      <div className="marker-label">You (Pickup)</div>
                    </div>
                    {/* Tailor Markers */}
                    {wizardFilteredTailors.map(tailor => (
                      <div 
                        key={tailor.id} 
                        className="map-marker" 
                        style={{ 
                          top: `${tailor.coordinates.y}%`, 
                          left: `${tailor.coordinates.x}%`,
                          zIndex: selectedTailor?.id === tailor.id ? 20 : 10
                        }}
                        onClick={() => setSelectedTailor(tailor)}
                      >
                        <div 
                          className="marker-dot" 
                          style={{ 
                            background: selectedTailor?.id === tailor.id ? 'var(--primary)' : 'var(--success)', 
                            boxShadow: `0 0 10px ${selectedTailor?.id === tailor.id ? 'var(--primary)' : 'var(--success)'}`,
                            width: selectedTailor?.id === tailor.id ? '16px' : '12px',
                            height: selectedTailor?.id === tailor.id ? '16px' : '12px'
                          }}
                        ></div>
                        <div className="marker-label">{tailor.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Tailor details portfolio */}
                {selectedTailor && (
                  <div className="glass-card animate-fade-in" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <img src={selectedTailor.image} alt={selectedTailor.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>{selectedTailor.name}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Shop Owner: <strong>{selectedTailor.owner}</strong></p>
                      </div>
                    </div>

                    {/* Past works gallery */}
                    {selectedTailor.portfolio && (
                      <div>
                        <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Tailor Portfolio (Past Works Done)</h5>
                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                          {selectedTailor.portfolio.map((p, idx) => (
                            <div key={idx} style={{ flex: '0 0 auto', width: '100px', textAlign: 'center' }}>
                              <img src={p.image} alt={p.title} style={{ width: '100px', height: '80px', borderRadius: '4px', objectFit: 'cover' }} />
                              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reviews */}
                    {selectedTailor.reviewsList && (
                      <div>
                        <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Customer Reviews</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {selectedTailor.reviewsList.map((r, idx) => (
                            <div key={idx} style={{ background: 'rgba(0,0,0,0.15)', padding: '8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                              <div className="flex-row-between">
                                <span style={{ fontWeight: '600', color: '#fff' }}>{r.name}</span>
                                <span style={{ color: '#fbbf24' }}>★ {r.rating}</span>
                              </div>
                              <p style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>"{r.comment}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={nextStep}>Next: Request Tailor <ChevronRight size={14} /></button>
                </div>
              </div>
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
                      <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>Sending order details...</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Uploading measurements and styling briefs to {selectedTailor?.name}.</p>
                    </>
                  )}

                  {negotiatingState === 'reviewing' && (
                    <>
                      <div className="negotiation-radar" style={{ borderTopColor: 'var(--accent)' }}></div>
                      <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>Tailor is analyzing requirements...</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Tailor console active. Mapping stitching hours, lining fabrics, and delivery margins.</p>
                    </>
                  )}

                  {negotiatingState === 'proposed' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                      <div style={{ padding: '10px', background: 'rgba(16,185,129,0.1)', color: 'var(--success)', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={24} />
                      </div>
                      <h4 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>Tailor {selectedTailor?.name} Accepted Booking!</h4>
                      
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
                  <div className="animate-fade-in" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(0,0,0,0.15)', padding: '16px', borderRadius: '8px', flexWrap: 'wrap' }}>
                    <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Simulating QR code */}
                      <div style={{ width: '100px', height: '100px', background: 'repeating-conic-gradient(from 45deg, #000 0% 25%, #fff 25% 50%) 50% / 10px 10px' }}></div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600' }}>Scan QR Code or enter UPI ID</p>
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
        <div>
          {/* Main Title & Categories Section */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>Select Stitching Category</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Choose a category below to start custom sizing and book nearby expert tailors.</p>
          </div>

          {/* Categories Cards Grid */}
          <div className="category-card-grid">
            {categoryCards.map(cat => (
              <div 
                key={cat.id} 
                className="category-card"
                style={{ backgroundImage: `url(${cat.img})` }}
                onClick={() => startWizard(cat.id)}
              >
                <div className="category-card-info">
                  <span className="category-card-title">{cat.label}</span>
                  <span className="category-card-desc">{cat.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Designer Recommendations Carousel Slider */}
          <div className="designer-carousel-wrapper">
            <h3 className="section-title"><Sparkles size={18} style={{ color: 'var(--primary)' }} /> New Arrivals & Fashion Designs</h3>
            <div ref={designerCarouselRef} className="designer-carousel">
              {newArrivalDesigns.map(design => (
                <div key={design.id} className="designer-carousel-card">
                  <img src={design.image} alt={design.title} className="designer-carousel-img" />
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span className="badge badge-primary" style={{ width: 'fit-content', fontSize: '0.6rem' }}>{design.category.toUpperCase()}</span>
                    <h4 style={{ fontSize: '0.95rem', color: '#fff', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{design.title}</h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Designer: <strong>{design.designer}</strong></p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>{design.info}</p>
                    <div className="flex-row-between" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '8px', marginTop: '4px' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '1.05rem' }}>₹{design.price}</span>
                      <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => startWizard(design.category, design)}>
                        Stitch Style
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

          {/* COMPARE MODAL OVERLAY */}
          {compareModalOpen && (
            <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
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

      {/* --- HUB 3: SAREES SHOP --- */}
      {activeHub === 'sarees' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Sarees & Lehenga Fabrics</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Buy sarees or lehenga materials online, and dispatch them to nearby boutiques for stitching.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="glass-card-no-hover" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <img src="https://images.unsplash.com/photo-1610030470352-78d10b7b12d5?auto=format&fit=crop&w=300&q=80" alt="Kanchipuram Silk" style={{ width: '100%', height: '160px', borderRadius: '8px', objectFit: 'cover' }} />
              <div>
                <h4 style={{ fontSize: '1rem', color: '#fff' }}>Kanchipuram Pure Silk Saree</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Classic gold zari border wedding special.</p>
              </div>
              <div className="flex-row-between" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                <span style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '1.1rem' }}>₹8500</span>
                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleAddToCart({ id: 's1', name: 'Kanchipuram Silk Saree', price: 8500, image: 'https://images.unsplash.com/photo-1610030470352-78d10b7b12d5?auto=format&fit=crop&w=300&q=80' }, 'saree')}>
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80" alt="Chanderi Silk" style={{ width: '100%', height: '160px', borderRadius: '8px', objectFit: 'cover' }} />
              <div>
                <h4 style={{ fontSize: '1rem', color: '#fff' }}>Chanderi Cotton-Silk Saree</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Lightweight sheer texture, comfortable office/ethnic wear.</p>
              </div>
              <div className="flex-row-between" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                <span style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '1.1rem' }}>₹3200</span>
                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleAddToCart({ id: 's2', name: 'Chanderi Saree', price: 3200, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80' }, 'saree')}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <div style={{ height: '140px', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                      <img src={tr.img} alt={tr.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
      {activeHub === 'articles' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {articles.map(art => (
            <div key={art.id} className="glass-card-no-hover" style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '16px', padding: '16px' }}>
              <img src={art.imageUrl} alt={art.title} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '6px' }} />
              <div>
                <span className="badge badge-primary" style={{ fontSize: '0.55rem' }}>{art.category}</span>
                <h4 style={{ fontSize: '0.9rem', color: '#fff', marginTop: '4px', marginBottom: '2px', lineHeight: '1.2' }}>{art.title}</h4>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{art.author} • {art.reads} Reads</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- HUB 6: HISTORY & INVOICES TAB --- */}
      {activeHub === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Invoices & Order History</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Access past completed orders, invoices, and billing transaction details.</p>
          </div>

          {completedOrders.length === 0 ? (
            <div className="glass-card-no-hover" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No completed orders on record.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {completedOrders.map(order => (
                <div key={order.id} className="glass-card-no-hover" style={{ padding: '20px' }}>
                  <div className="flex-row-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontWeight: '700', color: '#fff' }}>Order #{order.id}</span>
                      <span className="badge badge-success" style={{ marginLeft: '10px' }}>Closed</span>
                    </div>
                    <span style={{ color: 'var(--accent)', fontWeight: '800' }}>₹{order.price}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <div><strong>Service:</strong> {order.serviceName}</div>
                    <div><strong>Tailor Shop:</strong> {order.tailorName}</div>
                    <div><strong>Date Completed:</strong> {order.date}</div>
                  </div>
                  <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid var(--border-color)', display: 'flex', justify: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Payment: Card/UPI online transaction cleared</span>
                    <span style={{ color: 'var(--success)', fontWeight: '600' }}>Invoice Generated</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
                  if (!currentUser) {
                    if (onLoginRequired) onLoginRequired();
                    return;
                  }
                  if (!inspTitle || !inspImage || !inspBudget || !inspDesc) {
                    alert('Please fill out all fields of the inspiration upload form.');
                    return;
                  }
                  const newUpload = {
                    id: Date.now(),
                    title: inspTitle,
                    category: inspCategory,
                    image: inspImage.startsWith('http') ? inspImage : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
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
                {inspImage && inspImage.startsWith('http') ? (
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ height: '280px', borderRadius: '6px', overflow: 'hidden', background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={inspImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' }} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.6rem' }}>{inspCategory.toUpperCase()}</span>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginTop: '6px' }}>{inspTitle || 'Untitled Design'}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{inspDesc || 'No description provided.'}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Budget:</span>
                        <strong style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>₹{inspBudget || '0'}</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <Upload size={40} style={{ color: 'rgba(255,255,255,0.2)' }} />
                    <div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No valid image link pasted yet.</p>
                      <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>Paste an Unsplash image URL or click to see how it looks.</p>
                    </div>
                  </div>
                )}
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
                        <p><strong>Sizing Method:</strong> {order.measurementType.toUpperCase()}</p>
                      </div>
                      <div>
                        <p><strong>Delivery:</strong> {order.deliveryType === 'student' ? 'Student Agent Delivery' : 'Pickup at shop'}</p>
                        <p><strong>Fittings Specs:</strong> Chest: {order.measurements.chest}", Waist: {order.measurements.waist}", Shoulder: {order.measurements.shoulder}"</p>
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

    </div>
  );
}
