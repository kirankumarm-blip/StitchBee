import React, { useState, useEffect } from 'react';
import { 
  Scissors, User, Award, Heart, Star, Sparkles, MapPin, 
  Truck, ChevronRight, Check, Users, ShieldCheck, 
  ChevronLeft, ArrowRight, X, Layers, Clock, ShoppingBag, 
  Bell, Upload, Camera, Sliders, CheckCircle2, RotateCcw, Wrench, 
  FileText, Sparkle, Tag, Info, ArrowUpRight, Eye, Phone, HelpCircle, Trash2, RefreshCw, Plus, Gem
} from 'lucide-react';
import './BagsLeatherStudio.css';

export default function BagsLeatherStudio({
  currentUser,
  onNavigateHome,
  onNavigateCategory,
  onLogout,
  onOpenAuthModal,
  theme,
  setTheme,
  initialMode = 'shop', // 'shop' | 'restore'
  onSwitchMode,
  onAddToCart
}) {
  const isDark = theme === 'dark';

  // Primary mode state: 'shop' (Shop & Create) or 'restore' (Repair & Restore)
  const [activeMode, setActiveMode] = useState(initialMode || 'shop');

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
  }, [initialMode]);

  // Sync theme class to document.body so all body.bl-theme-dark and body.bl-theme-light styles work reliably
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('bl-theme-dark');
      document.body.classList.remove('bl-theme-light');
    } else {
      document.body.classList.add('bl-theme-light');
      document.body.classList.remove('bl-theme-dark');
    }
    return () => {
      document.body.classList.remove('bl-theme-dark');
      document.body.classList.remove('bl-theme-light');
    };
  }, [isDark]);

  // Cart & Wishlist state
  const [cart, setCart] = useState([
    { 
      id: 'prod-1', 
      name: 'Classic Leather Handbag', 
      price: 3999, 
      color: 'Cognac Brown', 
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop', 
      qty: 1 
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set(['prod-1', 'prod-4']));
  const [toastMessage, setToastMessage] = useState(null);

  // Modals
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [customStudioModalOpen, setCustomStudioModalOpen] = useState(false);
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  // Shop & Create state
  const [readyCategoryFilter, setReadyCategoryFilter] = useState('all');
  const [materialCarouselIndex, setMaterialCarouselIndex] = useState(0);

  // Custom Designer Modal state
  const [builderStyle, setBuilderStyle] = useState('handbag');
  const [builderMaterial, setBuilderMaterial] = useState('full-grain');
  const [builderColor, setBuilderColor] = useState('cognac');
  const [builderHardware, setBuilderHardware] = useState('gold');
  const [builderInitials, setBuilderInitials] = useState('SB');
  const [builderCustomNotes, setBuilderCustomNotes] = useState('');
  const [customQuoteSubmitted, setCustomQuoteSubmitted] = useState(false);

  // Repair & Restore state
  const [selectedRestoreCategory, setSelectedRestoreCategory] = useState('handbag');
  const [selectedIssue, setSelectedIssue] = useState('zip');
  const [selectedHotspot, setSelectedHotspot] = useState('zip');
  const [accessorySubtype, setAccessorySubtype] = useState('Wallet');
  const [isFading, setIsFading] = useState(false);
  const [customItemType, setCustomItemType] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [selectedBookingRepair, setSelectedBookingRepair] = useState({
    category: 'Luxury Handbags',
    issue: 'Zip & Runner Damaged',
    service: 'Zip & Runner Restoration',
    startingPrice: 249
  });
  const [baCategory, setBaCategory] = useState('handbags');
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // Restoration 4-Step Wizard State
  const [wizardStep, setWizardStep] = useState(1); // 1: Item, 2: Damage, 3: Photos, 4: Pickup, 5: Confirmed
  const [wizardItem, setWizardItem] = useState('handbag');
  const [wizardDamages, setWizardDamages] = useState(['Zip & Runner Damaged']);
  const [wizardPhotos, setWizardPhotos] = useState([
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop',
    null,
    null,
    null
  ]);

  const scrollToDiagnosis = () => {
    const el = document.getElementById('what-needs-attention');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (catKey) => {
    if (selectedRestoreCategory === catKey) {
      scrollToDiagnosis();
      return;
    }

    setIsFading(true);
    setSelectedRestoreCategory(catKey);
    setWizardItem(catKey);

    const catData = repairCategories[catKey];
    if (catData && catData.issues && catData.issues.length > 0) {
      const firstIssue = catData.issues[0];
      setSelectedIssue(firstIssue.id);
      setSelectedHotspot(firstIssue.id);
      setWizardDamages([firstIssue.label]);
      setSelectedBookingRepair({
        category: catData.title,
        issue: firstIssue.label,
        service: firstIssue.priorityService || (catData.services && catData.services[0]?.title) || 'General Restoration',
        startingPrice: (catData.services && catData.services[0]?.priceNum) || 249
      });
    }

    setTimeout(() => {
      setIsFading(false);
    }, 200);

    setTimeout(() => {
      scrollToDiagnosis();
    }, 80);
  };

  const handleHotspotClick = (pin) => {
    setSelectedHotspot(pin.id);
    setSelectedIssue(pin.issueId);
    const catData = repairCategories[selectedRestoreCategory] || repairCategories.handbag;
    const matchedIssue = catData.issues?.find(i => i.id === pin.issueId);
    if (matchedIssue) {
      setWizardDamages([matchedIssue.label]);
      setSelectedBookingRepair(prev => ({
        category: catData.title,
        issue: matchedIssue.label,
        service: matchedIssue.priorityService || prev?.service || 'Restoration Service',
        startingPrice: prev?.startingPrice || 249
      }));
      showToast(`Selected: ${matchedIssue.label}`);
    }
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue.id);
    setSelectedHotspot(issue.id);
    setWizardDamages([issue.label]);
    const catData = repairCategories[selectedRestoreCategory] || repairCategories.handbag;
    setSelectedBookingRepair(prev => ({
      category: catData.title,
      issue: issue.label,
      service: issue.priorityService || prev?.service || 'Restoration Service',
      startingPrice: prev?.startingPrice || 249
    }));
    showToast(`Selected: ${issue.label}`);
  };

  const handleSelectRepair = (service) => {
    const catData = repairCategories[selectedRestoreCategory] || repairCategories.handbag;
    const issueObj = catData.issues?.find(i => i.id === selectedIssue);
    const repairInfo = {
      category: catData.title,
      issue: issueObj ? issueObj.label : 'General Restoration',
      service: service.title,
      startingPrice: service.priceNum || 249
    };
    setSelectedBookingRepair(repairInfo);
    setWizardItem(selectedRestoreCategory);
    setWizardDamages([service.title]);
    setWizardStep(3); // Directly continues to photo upload / assessment
    
    const wizEl = document.getElementById('start-restoration-wizard');
    if (wizEl) {
      const yOffset = -90;
      const y = wizEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    showToast(`Selected "${service.title}"! Attach inspection photos below.`);
  };

  const handlePhotoFileChange = (e, targetIdx) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const readPromises = files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = ev => resolve(ev.target.result);
      reader.readAsDataURL(file);
    }));

    Promise.all(readPromises).then(dataUrls => {
      setWizardPhotos(prev => {
        const next = [...prev];
        let currentSlot = targetIdx;
        dataUrls.forEach(url => {
          if (currentSlot < next.length) {
            next[currentSlot] = url;
            currentSlot++;
          }
        });
        return next;
      });
      showToast(dataUrls.length > 1 ? `${dataUrls.length} photos uploaded!` : `Photo ${targetIdx + 1} uploaded successfully!`);
    });

    e.target.value = '';
  };
  const [wizardNotes, setWizardNotes] = useState('');
  const [pickupAddress, setPickupAddress] = useState('42, Residency Road, Shanthala Nagar, Bengaluru');
  const [pickupPincode, setPickupPincode] = useState('560025');
  const [pickupDate, setPickupDate] = useState('2026-10-02');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('10:00 AM - 01:00 PM');

  // Auto-hide toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handleToggleWishlist = (id, e) => {
    if (e) e.stopPropagation();
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from wishlist');
      } else {
        next.add(id);
        showToast('Saved to your wishlist ❤️');
      }
      return next;
    });
  };

  const handleAddToCartItem = (product, e) => {
    if (e) e.stopPropagation();
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        color: product.selectedColor || product.colors?.[0]?.name || 'Standard',
        img: product.img,
        qty: 1
      }];
    });
    showToast(`Added "${product.name}" to cart! 🛍️`);
    setIsCartOpen(true);
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // -------------------------------------------------------------
  // DATA COLLECTIONS FOR IMAGE 1 (SHOP & CREATE)
  // -------------------------------------------------------------

  // 6 Categories from Image 1: Explore Collection
  const shopCategories = [
    {
      id: 'handbags',
      title: 'Handbags',
      sub: 'Everyday, office & designer',
      action: 'Explore →',
      img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'luggage',
      title: 'Luggage & Travel',
      sub: 'Suitcases, travel bags',
      action: 'Explore →',
      img: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'backpacks',
      title: 'Backpacks',
      sub: 'College, work & casual',
      action: 'Explore →',
      img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'briefcases',
      title: 'Briefcases',
      sub: 'Business & professional',
      action: 'Explore →',
      img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'accessories',
      title: 'Accessories',
      sub: 'Wallets, belts, pouches',
      action: 'Explore →',
      img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'custom',
      title: 'Custom Design',
      sub: 'Your design, our craft',
      action: 'Start Designing →',
      isCustom: true,
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop'
    }
  ];

  // 5 Featured Products from Image 1: Featured Collection
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 'prod-1',
      name: 'Classic Leather Handbag',
      category: 'handbags',
      price: 3999,
      colors: [
        { name: 'Onyx Black', hex: '#1c1917' },
        { name: 'Cognac Brown', hex: '#8b4513' },
        { name: 'Blush Rose', hex: '#f472b6' }
      ],
      selectedColor: 'Onyx Black',
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      material: 'Full-Grain Tuscan Calfskin',
      dimensions: '28cm x 20cm x 12cm',
      description: 'Handcrafted with precision saddle stitching, structured silhouette, interior zip separator, and gold-plated protective feet.'
    },
    {
      id: 'prod-2',
      name: 'Travel Luggage Suitcase',
      category: 'luggage',
      price: 5999,
      colors: [
        { name: 'Mocha Bronze', hex: '#543d2b' },
        { name: 'Jet Black', hex: '#1c1917' },
        { name: 'Saddle Tan', hex: '#c28859' }
      ],
      selectedColor: 'Mocha Bronze',
      img: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=800&auto=format&fit=crop',
      material: 'Reinforced Polycarbonate with Italian Leather Trim',
      dimensions: '55cm x 38cm x 23cm (Cabin compliant)',
      description: 'Whisper-quiet 360° spinner wheels, TSA approved lock, telescopic aerospace aluminum handle, and vegetable-tanned leather handle straps.'
    },
    {
      id: 'prod-3',
      name: 'Urban Leather Backpack',
      category: 'backpacks',
      price: 2699,
      colors: [
        { name: 'Matte Black', hex: '#1c1917' },
        { name: 'Saddle Brown', hex: '#b47a46' },
        { name: 'Cream Stone', hex: '#e7d8c5' }
      ],
      selectedColor: 'Matte Black',
      img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
      material: 'Pebble Grain Buffalo Leather',
      dimensions: '42cm x 30cm x 15cm',
      description: 'Features a dedicated padded 16-inch laptop compartment, water-resistant interior lining, ergonomic shoulder straps, and quick-access passport pocket.'
    },
    {
      id: 'prod-4',
      name: 'Executive Briefcase',
      category: 'briefcases',
      price: 4499,
      colors: [
        { name: 'Vintage Cognac', hex: '#9a4f21' },
        { name: 'Midnight Black', hex: '#1c1917' },
        { name: 'Desert Sand', hex: '#d7c1a8' }
      ],
      selectedColor: 'Vintage Cognac',
      img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
      material: 'Vegetable-Tanned Heritage Leather',
      dimensions: '40cm x 29cm x 9cm',
      description: 'Polished brass clasp lock with key, structured accordion dividers for documents, reinforced top handle, and detachable padded leather shoulder strap.'
    },
    {
      id: 'prod-5',
      name: 'Minimal Tote Bag',
      category: 'handbags',
      price: 3499,
      colors: [
        { name: 'Warm Ivory', hex: '#f5f0e8' },
        { name: 'Pitch Black', hex: '#1c1917' },
        { name: 'Chestnut Tan', hex: '#b6875b' }
      ],
      selectedColor: 'Warm Ivory',
      img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
      material: 'Soft Nappa Leather with Suede Lining',
      dimensions: '36cm x 31cm x 14cm',
      description: 'Spacious everyday tote with magnetic snap bridge closure, interior zippered clutch pouch, and comfortable double-stitched shoulder drop handles.'
    }
  ]);

  // 8 Materials from Image 1: Leather & Material Options
  const materialsList = [
    {
      id: 'm-full-grain',
      name: 'Full Grain Leather',
      desc: 'The highest grade hide with natural grain and enduring patina.',
      tag: 'Heritage Grade',
      img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'm-top-grain',
      name: 'Top Grain Leather',
      desc: 'Smooth, uniform surface treated for scratch and stain resistance.',
      tag: 'Everyday Luxury',
      img: 'https://images.unsplash.com/photo-1524388676161-0777ea826500?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'm-suede',
      name: 'Suede Leather',
      desc: 'Velvety napped underside offering luxurious softness and warmth.',
      tag: 'Velvet Touch',
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'm-nappa',
      name: 'Nappa Leather',
      desc: 'Buttery-soft full-grain lambskin and calfskin known for supple drape.',
      tag: 'Ultra Soft',
      img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'm-canvas',
      name: 'Canvas Fabric',
      desc: 'Heavyweight military-grade cotton duck canvas for rugged durability.',
      tag: 'Rugged Work',
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'm-vegan',
      name: 'Vegan Leather',
      desc: 'Eco-conscious plant-based PU crafted without animal derivatives.',
      tag: 'Sustainable',
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'm-croc',
      name: 'Croc Texture',
      desc: 'Embossed scale pattern with high-gloss lacquer finish.',
      tag: 'Statement Exotic',
      img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'm-metallic',
      name: 'Metallic Finish',
      desc: 'Subtle champagne and silver shimmer bonded to fine grain leather.',
      tag: 'Evening Glam',
      img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop'
    }
  ];

  // 3 Testimonials from Image 1
  const shopTestimonials = [
    {
      id: 't-1',
      name: 'Priya S.',
      location: 'Bengaluru',
      quote: 'Absolutely loved my custom handbag. The quality and finish are excellent!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
      itemImg: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 't-2',
      name: 'Rahul K.',
      location: 'Hyderabad',
      quote: 'Perfect travel bag for my Europe trip. Sturdy and stylish. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      itemImg: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 't-3',
      name: 'Arun M.',
      location: 'Chennai',
      quote: 'The custom briefcase looks premium and professional. Great craftsmanship.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
      itemImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop'
    }
  ];

  // -------------------------------------------------------------
  // DATA COLLECTIONS FOR IMAGE 2 (REPAIR & RESTORE)
  // -------------------------------------------------------------

  // 6 Categories from Image 2: Our Expertise
  const restoreCategories = [
    {
      id: 'rc-handbags',
      key: 'handbag',
      title: 'Luxury Handbags',
      count: '12 restoration types',
      img: '/restore_cat_handbag.jpg'
    },
    {
      id: 'rc-luggage',
      key: 'luggage',
      title: 'Travel & Luggage',
      count: '9 restoration types',
      img: '/restore_cat_luggage.jpg'
    },
    {
      id: 'rc-backpacks',
      key: 'backpack',
      title: 'Backpacks',
      count: '7 restoration types',
      img: '/restore_cat_backpack.jpg'
    },
    {
      id: 'rc-briefcases',
      key: 'briefcase',
      title: 'Briefcases',
      count: '8 restoration types',
      img: '/restore_cat_briefcase.jpg'
    },
    {
      id: 'rc-accessories',
      key: 'accessories',
      title: 'Leather Accessories',
      count: '10 restoration types',
      img: '/restore_cat_accessories.jpg'
    },
    {
      id: 'rc-other',
      key: 'other',
      title: 'Something Else?',
      count: 'Get a custom assessment',
      img: '/restore_cat_other.jpg'
    }
  ];

  // Data-Driven Repair Categories Config
  const repairCategories = {
    handbag: {
      key: 'handbag',
      title: 'Luxury Handbags',
      sectionLabel: 'YOUR HANDBAG',
      heading: 'What needs attention?',
      description: 'Tap the area on your bag or select from the options below.',
      image: '/bag_diagnosis_anatomy.png',
      hotspots: [
        { id: 'handle', label: 'Handle', top: '10%', left: '44%', issueId: 'handle' },
        { id: 'zip', label: 'Zip / Hardware', top: '35%', left: '68%', issueId: 'zip' },
        { id: 'corner', label: 'Corner', top: '82%', left: '26%', issueId: 'surface' },
        { id: 'surface', label: 'Surface', top: '56%', left: '45%', issueId: 'surface' },
        { id: 'lining', label: 'Lining', top: '30%', left: '33%', issueId: 'lining' },
        { id: 'strap', label: 'Strap', top: '22%', left: '16%', issueId: 'handle' }
      ],
      issues: [
        { id: 'handle', label: 'Broken Handle / Strap', icon: '🧳', priorityService: 'Handle / Strap Replacement' },
        { id: 'zip', label: 'Zip & Runner Damaged', icon: '⚡', priorityService: 'Zip & Runner Restoration' },
        { id: 'lining', label: 'Torn Inner Lining', icon: '👜', priorityService: 'Inner Lining Replacement' },
        { id: 'surface', label: 'Cracked Leather Surface', icon: '💧', priorityService: 'Corner & Edge Restoration' },
        { id: 'stitching', label: 'Stitching Came Undone', icon: '🧵', priorityService: 'Leather Re-Dyeing' },
        { id: 'color', label: 'Colour Fading / Patina', icon: '🎨', priorityService: 'Leather Re-Dyeing' },
        { id: 'hardware', label: 'Hardware Damaged', icon: '🔒', priorityService: 'Hardware Replacement' },
        { id: 'unsure', label: "I'm Not Sure", icon: '❓', priorityService: 'Zip & Runner Restoration' }
      ],
      recommendedHeading: 'Recommended for Your Handbag',
      services: [
        {
          id: 'hb-zip',
          title: 'Zip & Runner Restoration',
          desc: 'Replace damaged sliders, runners or zipper components while retaining original construction.',
          price: '₹249',
          priceNum: 249,
          turnaround: '2-4 days',
          img: '/rec_zip_runner.png',
          matchIssues: ['zip', 'unsure']
        },
        {
          id: 'hb-handle',
          title: 'Handle / Strap Replacement',
          desc: 'Replace worn or broken handles and shoulder straps with matching leather and hardware.',
          price: '₹499',
          priceNum: 499,
          turnaround: '3-5 days',
          img: '/rec_handle_strap.png',
          matchIssues: ['handle']
        },
        {
          id: 'hb-lining',
          title: 'Inner Lining Replacement',
          desc: 'Restore torn or stained linings with premium fabrics/canvas matching original styles.',
          price: '₹499',
          priceNum: 499,
          turnaround: '3-5 days',
          img: '/rec_inner_lining.png',
          matchIssues: ['lining']
        },
        {
          id: 'hb-corner',
          title: 'Corner & Edge Restoration',
          desc: 'Repair scuffs, cracks, and worn corners with color-matched leather and finishing.',
          price: '₹349',
          priceNum: 349,
          turnaround: '2-5 days',
          img: '/rec_corner_edge.png',
          matchIssues: ['surface']
        },
        {
          id: 'hb-redye',
          title: 'Leather Re-Dyeing',
          desc: 'Deep clean, color restore, and condition faded luxury leather with expert patina blending.',
          price: '₹699',
          priceNum: 699,
          turnaround: '4-6 days',
          img: '/restore_cat_handbag.jpg',
          matchIssues: ['color', 'stitching']
        },
        {
          id: 'hb-hw',
          title: 'Hardware Replacement',
          desc: 'Fix or replace tarnished clasps, rings, studs, locks, and metallic embellishments.',
          price: '₹399',
          priceNum: 399,
          turnaround: '3-5 days',
          img: '/rec_zip_runner.png',
          matchIssues: ['hardware']
        }
      ]
    },

    luggage: {
      key: 'luggage',
      title: 'Travel & Luggage',
      sectionLabel: 'YOUR LUGGAGE',
      heading: 'What needs attention?',
      description: 'Tap the damaged area on your luggage or choose an issue below.',
      image: '/restore_cat_luggage.jpg',
      hotspots: [
        { id: 'trolley-handle', label: 'Trolley Handle', top: '8%', left: '46%', issueId: 'trolley-handle' },
        { id: 'zip', label: 'Main Zip', top: '38%', left: '76%', issueId: 'zip' },
        { id: 'wheel', label: 'Wheel', top: '88%', left: '26%', issueId: 'wheel' },
        { id: 'shell', label: 'Corner / Shell', top: '55%', left: '32%', issueId: 'shell' },
        { id: 'lock', label: 'Lock', top: '48%', left: '80%', issueId: 'lock' },
        { id: 'lining', label: 'Inner Lining', top: '65%', left: '55%', issueId: 'lining' }
      ],
      issues: [
        { id: 'wheel', label: 'Broken Wheels', icon: '🛞', priorityService: 'Spinner Wheel Replacement' },
        { id: 'trolley-handle', label: 'Trolley Handle / Rod Damaged', icon: '🧳', priorityService: 'Trolley Handle Replacement' },
        { id: 'zip', label: 'Zip & Runner Damaged', icon: '⚡', priorityService: 'Zip & Runner Restoration' },
        { id: 'lock', label: 'Lock Damaged', icon: '🔒', priorityService: 'Lock Replacement' },
        { id: 'shell', label: 'Cracked / Dented Shell', icon: '🛡️', priorityService: 'Shell / Corner Repair' },
        { id: 'lining', label: 'Torn Inner Lining', icon: '👜', priorityService: 'Inner Lining Replacement' },
        { id: 'stitching', label: 'Stitching Damage', icon: '🧵', priorityService: 'Trolley Base Repair' },
        { id: 'handle', label: 'Handle Damaged', icon: '🛠️', priorityService: 'Trolley Handle Replacement' },
        { id: 'unsure', label: "I'm Not Sure", icon: '❓', priorityService: 'Spinner Wheel Replacement' }
      ],
      recommendedHeading: 'Recommended for Your Luggage',
      services: [
        {
          id: 'lug-wheel',
          title: 'Spinner Wheel Replacement',
          desc: 'Replace noisy, jammed, or broken 360-degree caster wheels with smooth high-durability bearings.',
          price: '₹399',
          priceNum: 399,
          turnaround: '2-3 days',
          img: '/restore_cat_luggage.jpg',
          matchIssues: ['wheel', 'unsure']
        },
        {
          id: 'lug-wheel-house',
          title: 'Wheel Housing Repair',
          desc: 'Reinforce cracked wheel mounts, axles, and undercarriage housings for heavy-load stability.',
          price: '₹449',
          priceNum: 449,
          turnaround: '2-4 days',
          img: '/restore_cat_luggage.jpg',
          matchIssues: ['wheel']
        },
        {
          id: 'lug-base',
          title: 'Trolley Base Repair',
          desc: 'Re-align bent trolley structural chassis, bottom bumpers, and rivets to restore smooth rolling.',
          price: '₹499',
          priceNum: 499,
          turnaround: '3-5 days',
          img: '/restore_cat_luggage.jpg',
          matchIssues: ['wheel', 'stitching']
        },
        {
          id: 'lug-handle',
          title: 'Trolley Handle Replacement',
          desc: 'Fix or replace stuck, bent telescopic extension rods and top push-button grip mechanisms.',
          price: '₹599',
          priceNum: 599,
          turnaround: '3-5 days',
          img: '/restore_cat_luggage.jpg',
          matchIssues: ['trolley-handle', 'handle']
        },
        {
          id: 'lug-zip',
          title: 'Zip & Runner Restoration',
          desc: 'Heavy-duty zip slider re-tracking, tooth realignment, and weather-seal burst repair.',
          price: '₹299',
          priceNum: 299,
          turnaround: '2-4 days',
          img: '/rec_zip_runner.png',
          matchIssues: ['zip']
        },
        {
          id: 'lug-lock',
          title: 'Lock Replacement',
          desc: 'Reset or replace faulty TSA combination dials, key barrels, and interlocking sliders.',
          price: '₹349',
          priceNum: 349,
          turnaround: '2-3 days',
          img: '/restore_cat_luggage.jpg',
          matchIssues: ['lock']
        },
        {
          id: 'lug-shell',
          title: 'Shell / Corner Repair',
          desc: 'Fiberglass/polycarbonate weld repair for cracked luggage bodies and dent removal.',
          price: '₹549',
          priceNum: 549,
          turnaround: '3-6 days',
          img: '/rec_corner_edge.png',
          matchIssues: ['shell']
        },
        {
          id: 'lug-lining',
          title: 'Inner Lining Replacement',
          desc: 'Replace torn divider compartments, elastic packing straps, and zipper privacy pockets.',
          price: '₹499',
          priceNum: 499,
          turnaround: '3-5 days',
          img: '/rec_inner_lining.png',
          matchIssues: ['lining']
        }
      ]
    },

    backpack: {
      key: 'backpack',
      title: 'Backpacks',
      sectionLabel: 'YOUR BACKPACK',
      heading: 'What needs attention?',
      description: 'Tap the damaged area on your backpack or choose an issue below.',
      image: '/restore_cat_backpack.jpg',
      hotspots: [
        { id: 'shoulder-strap', label: 'Shoulder Strap', top: '25%', left: '22%', issueId: 'shoulder-strap' },
        { id: 'top-handle', label: 'Top Handle', top: '10%', left: '48%', issueId: 'top-handle' },
        { id: 'zip', label: 'Main Zip', top: '34%', left: '65%', issueId: 'zip' },
        { id: 'buckle', label: 'Buckle', top: '65%', left: '72%', issueId: 'buckle' },
        { id: 'surface', label: 'Surface', top: '55%', left: '42%', issueId: 'surface' },
        { id: 'lining', label: 'Inner Lining', top: '42%', left: '35%', issueId: 'lining' }
      ],
      issues: [
        { id: 'shoulder-strap', label: 'Broken Shoulder Strap', icon: '🎒', priorityService: 'Shoulder Strap Replacement' },
        { id: 'zip', label: 'Zip / Runner Damaged', icon: '⚡', priorityService: 'Zip Restoration' },
        { id: 'top-handle', label: 'Top Handle Damaged', icon: '🧳', priorityService: 'Top Handle Repair' },
        { id: 'surface', label: 'Torn Fabric / Leather', icon: '✂️', priorityService: 'Fabric / Leather Patch Repair' },
        { id: 'buckle', label: 'Broken Buckle', icon: '🔗', priorityService: 'Buckle Replacement' },
        { id: 'lining', label: 'Torn Inner Lining', icon: '👜', priorityService: 'Inner Lining Repair' },
        { id: 'stitching', label: 'Stitching Came Undone', icon: '🧵', priorityService: 'Shoulder Strap Replacement' },
        { id: 'color', label: 'Colour Fading', icon: '🎨', priorityService: 'Fabric / Leather Patch Repair' },
        { id: 'unsure', label: "I'm Not Sure", icon: '❓', priorityService: 'Zip Restoration' }
      ],
      recommendedHeading: 'Recommended for Your Backpack',
      services: [
        {
          id: 'bp-zip',
          title: 'Zip Restoration',
          desc: 'Re-align and replace heavy-duty backpack zippers, cord pulls, and dual slider runners.',
          price: '₹249',
          priceNum: 249,
          turnaround: '2-4 days',
          img: '/rec_zip_runner.png',
          matchIssues: ['zip', 'unsure']
        },
        {
          id: 'bp-strap',
          title: 'Shoulder Strap Replacement',
          desc: 'Reinforce load-bearing strap anchors, replace torn padding, and re-stitch webbing.',
          price: '₹399',
          priceNum: 399,
          turnaround: '3-5 days',
          img: '/restore_cat_backpack.jpg',
          matchIssues: ['shoulder-strap', 'stitching']
        },
        {
          id: 'bp-handle',
          title: 'Top Handle Repair',
          desc: 'Reconstruct torn haul loop handles with heavy-duty bar-tack reinforced stitching.',
          price: '₹349',
          priceNum: 349,
          turnaround: '2-4 days',
          img: '/rec_handle_strap.png',
          matchIssues: ['top-handle']
        },
        {
          id: 'bp-buckle',
          title: 'Buckle Replacement',
          desc: 'Replace broken quick-release side-squeeze buckles, tension sliders, and sternum clasps.',
          price: '₹199',
          priceNum: 199,
          turnaround: '1-3 days',
          img: '/restore_cat_backpack.jpg',
          matchIssues: ['buckle']
        },
        {
          id: 'bp-patch',
          title: 'Fabric / Leather Patch Repair',
          desc: 'Invisible bonded darning and matched leather overlay patches for abrasions and cuts.',
          price: '₹449',
          priceNum: 449,
          turnaround: '3-5 days',
          img: '/rec_corner_edge.png',
          matchIssues: ['surface', 'color']
        },
        {
          id: 'bp-lining',
          title: 'Inner Lining Repair',
          desc: 'Repair torn laptop compartment padding, hydration sleeve dividers, and seam tapes.',
          price: '₹399',
          priceNum: 399,
          turnaround: '2-4 days',
          img: '/rec_inner_lining.png',
          matchIssues: ['lining']
        }
      ]
    },

    briefcase: {
      key: 'briefcase',
      title: 'Briefcases',
      sectionLabel: 'YOUR BRIEFCASE',
      heading: 'What needs attention?',
      description: 'Tap the damaged area on your briefcase or choose an issue below.',
      image: '/restore_cat_briefcase.jpg',
      hotspots: [
        { id: 'handle', label: 'Handle', top: '15%', left: '48%', issueId: 'handle' },
        { id: 'lock', label: 'Lock / Clasp', top: '35%', left: '50%', issueId: 'lock' },
        { id: 'hinge', label: 'Hinge', top: '75%', left: '18%', issueId: 'hinge' },
        { id: 'corner', label: 'Corner', top: '80%', left: '78%', issueId: 'corner' },
        { id: 'surface', label: 'Surface', top: '55%', left: '35%', issueId: 'surface' },
        { id: 'lining', label: 'Lining', top: '45%', left: '68%', issueId: 'lining' }
      ],
      issues: [
        { id: 'handle', label: 'Broken Handle', icon: '🧳', priorityService: 'Handle Replacement' },
        { id: 'lock', label: 'Lock / Clasp Damaged', icon: '🔒', priorityService: 'Lock / Clasp Repair' },
        { id: 'hinge', label: 'Hinge Damaged', icon: '⚙️', priorityService: 'Hinge Replacement' },
        { id: 'corner', label: 'Corner Wear', icon: '📐', priorityService: 'Corner & Edge Restoration' },
        { id: 'surface', label: 'Leather Cracking', icon: '💧', priorityService: 'Leather Re-Dyeing' },
        { id: 'lining', label: 'Torn Inner Lining', icon: '👜', priorityService: 'Inner Lining Replacement' },
        { id: 'stitching', label: 'Stitching Damage', icon: '🧵', priorityService: 'Corner & Edge Restoration' },
        { id: 'color', label: 'Colour Fading', icon: '🎨', priorityService: 'Leather Re-Dyeing' },
        { id: 'unsure', label: "I'm Not Sure", icon: '❓', priorityService: 'Handle Replacement' }
      ],
      recommendedHeading: 'Recommended for Your Briefcase',
      services: [
        {
          id: 'bc-handle',
          title: 'Handle Replacement',
          desc: 'Re-craft structured bridle leather handles, molded cores, and brass mounting anchors.',
          price: '₹499',
          priceNum: 499,
          turnaround: '3-5 days',
          img: '/rec_handle_strap.png',
          matchIssues: ['handle', 'unsure']
        },
        {
          id: 'bc-lock',
          title: 'Lock / Clasp Repair',
          desc: 'Restore key-lock latches, spring catches, combination dials, and brass tongue locks.',
          price: '₹399',
          priceNum: 399,
          turnaround: '2-4 days',
          img: '/restore_cat_briefcase.jpg',
          matchIssues: ['lock']
        },
        {
          id: 'bc-hinge',
          title: 'Hinge Replacement',
          desc: 'Repair or swap out loose metal stay hinges, rivets, and internal folding supports.',
          price: '₹449',
          priceNum: 449,
          turnaround: '3-5 days',
          img: '/restore_cat_briefcase.jpg',
          matchIssues: ['hinge']
        },
        {
          id: 'bc-corner',
          title: 'Corner & Edge Restoration',
          desc: 'Repair scuffed structural piping, edge coat re-glazing, and leather corner cap guards.',
          price: '₹349',
          priceNum: 349,
          turnaround: '2-4 days',
          img: '/rec_corner_edge.png',
          matchIssues: ['corner', 'stitching']
        },
        {
          id: 'bc-redye',
          title: 'Leather Re-Dyeing',
          desc: 'Remove deep scratches, nourish vegetable-tanned leathers, and restore rich executive luster.',
          price: '₹699',
          priceNum: 699,
          turnaround: '4-6 days',
          img: '/restore_cat_briefcase.jpg',
          matchIssues: ['surface', 'color']
        },
        {
          id: 'bc-lining',
          title: 'Inner Lining Replacement',
          desc: 'Re-line document partitions, pigskin or suede interiors, and pen loop pockets.',
          price: '₹499',
          priceNum: 499,
          turnaround: '3-5 days',
          img: '/rec_inner_lining.png',
          matchIssues: ['lining']
        }
      ]
    },

    accessories: {
      key: 'accessories',
      title: 'Leather Accessories',
      sectionLabel: 'YOUR LEATHER ITEM',
      heading: 'What needs attention?',
      description: 'Select the damaged area or choose the issue affecting your leather item.',
      image: '/restore_cat_accessories.jpg',
      subtypes: ['Wallet', 'Belt', 'Pouch', 'Card Holder', 'Small Leather Item'],
      hotspots: [
        { id: 'edge', label: 'Edge Wear', top: '35%', left: '22%', issueId: 'edge' },
        { id: 'stitching', label: 'Stitching', top: '65%', left: '35%', issueId: 'stitching' },
        { id: 'snap', label: 'Buckle / Snap', top: '25%', left: '72%', issueId: 'snap' },
        { id: 'surface', label: 'Surface', top: '52%', left: '55%', issueId: 'surface' },
        { id: 'lining', label: 'Pocket / Lining', top: '78%', left: '68%', issueId: 'cracking' }
      ],
      issues: [
        { id: 'stitching', label: 'Stitching Came Undone', icon: '🧵', priorityService: 'Leather Re-Stitching' },
        { id: 'cracking', label: 'Leather Cracking', icon: '💧', priorityService: 'Leather Conditioning' },
        { id: 'color', label: 'Colour Fading', icon: '🎨', priorityService: 'Leather Re-Dyeing' },
        { id: 'edge', label: 'Edge Wear', icon: '📐', priorityService: 'Edge Restoration' },
        { id: 'buckle', label: 'Broken Buckle', icon: '🔗', priorityService: 'Buckle Replacement' },
        { id: 'snap', label: 'Broken Snap / Button', icon: '🔘', priorityService: 'Snap / Button Replacement' },
        { id: 'surface', label: 'Surface Scratches', icon: '✨', priorityService: 'Leather Conditioning' },
        { id: 'dryness', label: 'Leather Dryness', icon: '🧴', priorityService: 'Leather Conditioning' },
        { id: 'unsure', label: "I'm Not Sure", icon: '❓', priorityService: 'Edge Restoration' }
      ],
      recommendedHeading: 'Recommended for Your Leather Item',
      services: [
        {
          id: 'acc-stitch',
          title: 'Leather Re-Stitching',
          desc: 'Hand-sewn saddle stitching with waxed linen thread matching exact gauge and tension.',
          price: '₹199',
          priceNum: 199,
          turnaround: '1-3 days',
          img: '/restore_cat_accessories.jpg',
          matchIssues: ['stitching']
        },
        {
          id: 'acc-edge',
          title: 'Edge Restoration',
          desc: 'Beveling, burnishing, and multi-coat Italian edge paint application for flawless sealed edges.',
          price: '₹249',
          priceNum: 249,
          turnaround: '2-4 days',
          img: '/rec_corner_edge.png',
          matchIssues: ['edge', 'unsure']
        },
        {
          id: 'acc-redye',
          title: 'Leather Re-Dyeing',
          desc: 'Color re-pigmentation and sealing to mask pocket patina and restore original leather tone.',
          price: '₹399',
          priceNum: 399,
          turnaround: '3-5 days',
          img: '/restore_cat_accessories.jpg',
          matchIssues: ['color', 'cracking']
        },
        {
          id: 'acc-buckle',
          title: 'Buckle Replacement',
          desc: 'Solid brass, nickel, or gunmetal buckle replacement and strap shortening / hole punching.',
          price: '₹249',
          priceNum: 249,
          turnaround: '1-3 days',
          img: '/restore_cat_accessories.jpg',
          matchIssues: ['buckle']
        },
        {
          id: 'acc-snap',
          title: 'Snap / Button Replacement',
          desc: 'Replacement of magnetic clasps, press studs, and branded snaps without leather distortion.',
          price: '₹149',
          priceNum: 149,
          turnaround: '1-2 days',
          img: '/restore_cat_accessories.jpg',
          matchIssues: ['snap']
        },
        {
          id: 'acc-condition',
          title: 'Leather Conditioning',
          desc: 'Deep nourishing beeswax and lanolin treatment to reverse dryness and buff away fine scratches.',
          price: '₹199',
          priceNum: 199,
          turnaround: '1-2 days',
          img: '/restore_cat_accessories.jpg',
          matchIssues: ['dryness', 'surface']
        }
      ]
    },

    other: {
      key: 'other',
      title: 'Something Else?',
      sectionLabel: 'CUSTOM ASSESSMENT',
      heading: "Tell us what you'd like restored.",
      description: "Can't find your item above? Upload a few photos and our specialists will assess the item and recommend the right restoration service.",
      recommendedHeading: 'Complimentary Diagnostic Assessment',
      services: [
        {
          id: 'other-diag',
          title: 'Complimentary Specialist Assessment',
          desc: 'Our master craftsmen review your photos and send a guaranteed upfront estimate within 30 minutes.',
          price: 'Free',
          priceNum: 0,
          turnaround: 'Same day',
          img: '/restore_cat_other.jpg',
          matchIssues: ['custom']
        }
      ]
    }
  };

  const currentCatData = repairCategories[selectedRestoreCategory] || repairCategories.handbag;
  const sortedServices = [...(currentCatData.services || [])].sort((a, b) => {
    const aMatch = a.matchIssues?.includes(selectedIssue) ? 1 : 0;
    const bMatch = b.matchIssues?.includes(selectedIssue) ? 1 : 0;
    return bMatch - aMatch;
  });

  // 3 Testimonials from Image 2: Customer Stories
  const restoreTestimonials = [
    {
      id: 'rt-1',
      name: 'Priya S.',
      location: 'Bengaluru',
      service: 'Handbag Restoration',
      quote: 'My designer handbag looks new again. The colour restoration is perfect.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 'rt-2',
      name: 'Arun K.',
      location: 'Hyderabad',
      service: 'Luggage Repair',
      quote: 'Quick pickup and excellent repair on my luggage zip. Highly recommend.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 'rt-3',
      name: 'Meera R.',
      location: 'Chennai',
      service: 'Leather Accessories',
      quote: 'Fantastic craftsmanship and very professional service.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop'
    }
  ];

  // Scroll to section helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Switch mode handler
  const handleModeSwitch = (mode) => {
    setActiveMode(mode);
    if (onSwitchMode) onSwitchMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`bl-leather-studio ${isDark ? 'bl-theme-dark' : 'bl-theme-light'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bl-toast-notification">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)}><X size={14} /></button>
        </div>
      )}



      {/* ========================================================================= */}
      {/* MODE 1: SHOP & CREATE (MATCHING IMAGE 1 EXACTLY)                         */}
      {/* ========================================================================= */}
      {activeMode === 'shop' && (
        <div className="bl-shop-create-page">
          
          {/* SECTION 1: HERO (100% WIDTH, MATCHING USER SCREENSHOT EXACTLY) */}
          <section className="bl-shop-hero-fullwidth">
            <div className="bl-shop-hero-inner">
              
              {/* Hero Left Content */}
              <div className="bl-hero-left">
                <span className="bl-tag-label-shop">
                  STITCHBEE LEATHER & BAG STUDIO
                </span>

                <h1 className="bl-serif-title bl-hero-heading-shop">
                  Bags That <br />
                  <span className="bl-text-brown-shop">Match Your Story</span>
                </h1>

                <p className="bl-hero-subtext-shop">
                  Custom-designed handbags, luggage, backpacks and leather goods — handcrafted by expert artisans, just for you.
                </p>

                <div className="bl-hero-trust-row-shop">
                  <div className="bl-trust-item-shop">
                    <div className="bl-trust-icon-circle"><Gem size={17} /></div>
                    <div className="bl-trust-text-stack">
                      <span>Premium</span>
                      <span>Materials</span>
                    </div>
                  </div>
                  <div className="bl-trust-item-shop">
                    <div className="bl-trust-icon-circle"><Scissors size={17} /></div>
                    <div className="bl-trust-text-stack">
                      <span>Custom</span>
                      <span>Designs</span>
                    </div>
                  </div>
                  <div className="bl-trust-item-shop">
                    <div className="bl-trust-icon-circle"><ShieldCheck size={17} /></div>
                    <div className="bl-trust-text-stack">
                      <span>Verified</span>
                      <span>Artisans</span>
                    </div>
                  </div>
                </div>

                <div className="bl-hero-cta-group-shop">
                  <button 
                    className="bl-btn-primary"
                    onClick={() => scrollToId('featured-bags-section')}
                  >
                    Shop Ready Bags →
                  </button>
                  <button 
                    className="bl-btn-secondary"
                    onClick={() => setCustomStudioModalOpen(true)}
                  >
                    Create Custom Design
                  </button>
                </div>
              </div>

            </div>

            {/* Hero Right Visual: Dark panel backdrop with gold script */}
            <div className="bl-hero-right-dark-panel">
              <div className="bl-hero-script-stack">
                <span className="bl-script-line bl-script-line-1">Custom.</span>
                <span className="bl-script-line bl-script-line-2">Stylish.</span>
                <span className="bl-script-line bl-script-line-3">Yours.</span>
              </div>
            </div>
          </section>

          {/* SECTION 2: EXPLORE COLLECTION — SHOP BY CATEGORY */}
          <section className="bl-section bl-shop-by-category">
            <div className="bl-container">
              <div className="bl-section-header-center">
                <span className="bl-tag-label">EXPLORE COLLECTION</span>
                <h2 className="bl-serif-title bl-section-heading">Shop by Category</h2>
                <p className="bl-section-subtext">
                  Discover ready-made bags or create your own custom design.
                </p>
              </div>

              <div className="bl-category-grid-6">
                {shopCategories.map(cat => (
                  <div 
                    key={cat.id} 
                    className="bl-cat-card"
                    onClick={() => {
                      if (cat.isCustom) {
                        setCustomStudioModalOpen(true);
                      } else {
                        setReadyCategoryFilter(cat.id);
                        scrollToId('featured-bags-section');
                      }
                    }}
                  >
                    <div className="bl-cat-img-box">
                      <img src={cat.img} alt={cat.title} />
                      <div className="bl-cat-overlay" />
                    </div>
                    <div className="bl-cat-info">
                      <h4 className="bl-cat-title">{cat.title}</h4>
                      <p className="bl-cat-desc">{cat.sub}</p>
                      <span className="bl-cat-action">{cat.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: FEATURED COLLECTION — PREMIUM BAGS, READY FOR YOU */}
          <section id="featured-bags-section" className="bl-section bl-featured-collection">
            <div className="bl-container">
              <div className="bl-section-header-split">
                <div>
                  <span className="bl-tag-label">FEATURED COLLECTION</span>
                  <h2 className="bl-serif-title bl-section-heading">Premium Bags, Ready for You</h2>
                  <p className="bl-section-subtext">
                    Handpicked designs crafted with premium leather and fine detailing.
                  </p>
                </div>
                <button 
                  className="bl-link-text-pink"
                  onClick={() => setReadyCategoryFilter('all')}
                >
                  View All →
                </button>
              </div>

              {/* Filter Pills */}
              <div className="bl-filter-strip">
                {['all', 'handbags', 'luggage', 'backpacks', 'briefcases'].map(filterKey => (
                  <button
                    key={filterKey}
                    className={`bl-filter-pill ${readyCategoryFilter === filterKey ? 'active' : ''}`}
                    onClick={() => setReadyCategoryFilter(filterKey)}
                  >
                    {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                  </button>
                ))}
              </div>

              {/* Product Grid (5 items from Image 1) */}
              <div className="bl-products-grid-5">
                {featuredProducts
                  .filter(p => readyCategoryFilter === 'all' || p.category === readyCategoryFilter)
                  .map(product => {
                    const isWish = wishlist.has(product.id);
                    return (
                      <div 
                        key={product.id} 
                        className="bl-product-card"
                        onClick={() => setSelectedProductModal(product)}
                      >
                        <div className="bl-prod-img-box">
                          <img src={product.img} alt={product.name} />
                          <button 
                            className={`bl-prod-wish-btn ${isWish ? 'active' : ''}`}
                            onClick={(e) => handleToggleWishlist(product.id, e)}
                            title="Add to wishlist"
                          >
                            <Heart size={16} fill={isWish ? '#f72585' : 'none'} color={isWish ? '#f72585' : '#475569'} />
                          </button>
                        </div>

                        <div className="bl-prod-info">
                          <h4 className="bl-prod-name">{product.name}</h4>
                          <div className="bl-prod-price">₹{product.price.toLocaleString('en-IN')}</div>

                          <div className="bl-prod-bottom-row">
                            {/* Color swatches */}
                            <div className="bl-prod-swatches">
                              {product.colors.map(col => (
                                <span 
                                  key={col.name} 
                                  className={`bl-prod-swatch-dot ${product.selectedColor === col.name ? 'active' : ''}`}
                                  style={{ backgroundColor: col.hex }}
                                  title={col.name}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFeaturedProducts(prev => prev.map(item => item.id === product.id ? { ...item, selectedColor: col.name } : item));
                                  }}
                                />
                              ))}
                            </div>

                            {/* Add to cart icon button */}
                            <button 
                              className="bl-prod-cart-btn"
                              onClick={(e) => handleAddToCartItem(product, e)}
                              title="Add to Cart"
                            >
                              <ShoppingBag size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>

          {/* SECTION 4: CUSTOM DESIGN STUDIO — DESIGN YOUR DREAM BAG */}
          <section className="bl-section bl-custom-design-studio">
            <div className="bl-container">
              <div className="bl-custom-studio-card">
                <div className="bl-custom-studio-grid">
                  
                  {/* Left: Artisan Sketching Photo */}
                  <div className="bl-custom-studio-photo">
                    <img 
                      src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=900&auto=format&fit=crop" 
                      alt="Artisan sketching bespoke handbag" 
                    />
                    <div className="bl-custom-studio-badge">
                      <span>Artisan Studio Workbench</span>
                    </div>
                  </div>

                  {/* Center: Details & Steps */}
                  <div className="bl-custom-studio-details">
                    <span className="bl-tag-label">CUSTOM DESIGN STUDIO</span>
                    <h2 className="bl-serif-title bl-custom-studio-heading">Design Your Dream Bag</h2>
                    <p className="bl-custom-studio-sub">
                      Choose the style, leather, color, size and detailing. Our artisans will bring your design to life.
                    </p>

                    <button 
                      className="bl-btn-primary" 
                      style={{ margin: '14px 0 28px 0' }}
                      onClick={() => setCustomStudioModalOpen(true)}
                    >
                      Start Designing →
                    </button>

                    <div className="bl-custom-steps-row">
                      <div className="bl-custom-step-item">
                        <div className="bl-step-icon-wrap"><Scissors size={18} /></div>
                        <span className="bl-step-name">Upload Sketch or Idea</span>
                      </div>
                      <div className="bl-custom-step-item">
                        <div className="bl-step-icon-wrap"><Layers size={18} /></div>
                        <span className="bl-step-name">Choose Material & Details</span>
                      </div>
                      <div className="bl-custom-step-item">
                        <div className="bl-step-icon-wrap"><FileText size={18} /></div>
                        <span className="bl-step-name">Get Review & Quote</span>
                      </div>
                      <div className="bl-custom-step-item">
                        <div className="bl-step-icon-wrap"><Truck size={18} /></div>
                        <span className="bl-step-name">Handcrafted & Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Technical Line Art Drawing with Callouts */}
                  <div className="bl-custom-studio-sketch">
                    <div className="bl-blueprint-canvas">
                      <svg viewBox="0 0 300 260" className="bl-schematic-svg">
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f72585" />
                          </marker>
                        </defs>
                        {/* Bag Outline */}
                        <path d="M 60 90 L 80 220 C 80 230 220 230 220 220 L 240 90 C 240 80 60 80 60 90 Z" fill="rgba(247,37,133,0.04)" stroke="#475569" strokeWidth="2.5" strokeDasharray="3 3" />
                        {/* Top Flap */}
                        <path d="M 60 90 Q 150 140 240 90" fill="none" stroke="#475569" strokeWidth="2" />
                        {/* Clasp & Lock */}
                        <rect x="138" y="115" width="24" height="20" rx="3" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
                        <circle cx="150" cy="125" r="3" fill="#fff" />
                        {/* Handle */}
                        <path d="M 95 90 C 95 20, 205 20, 205 90" fill="none" stroke="#475569" strokeWidth="3" />
                        
                        {/* Annotations */}
                        <path d="M 230 35 L 180 40" stroke="#f72585" strokeWidth="1.5" markerEnd="url(#arrow)" />
                        <text x="235" y="38" fill="#f72585" fontSize="11" fontWeight="700">Your Style</text>

                        <path d="M 255 105 L 210 115" stroke="#f72585" strokeWidth="1.5" markerEnd="url(#arrow)" />
                        <text x="250" y="100" fill="#f72585" fontSize="11" fontWeight="700">Your Color</text>

                        <path d="M 35 150 L 95 160" stroke="#f72585" strokeWidth="1.5" markerEnd="url(#arrow)" />
                        <text x="10" y="148" fill="#f72585" fontSize="11" fontWeight="700">Your Material</text>

                        <path d="M 45 210 L 125 190" stroke="#f72585" strokeWidth="1.5" markerEnd="url(#arrow)" />
                        <text x="15" y="222" fill="#f72585" fontSize="11" fontWeight="700">+ Your Details</text>

                        <text x="110" y="248" fill="#934a26" fontSize="12" fontStyle="italic" fontWeight="700">StitchBee Atelier</text>
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: LEATHER & MATERIAL OPTIONS */}
          <section className="bl-section bl-materials-section">
            <div className="bl-container">
              <div className="bl-section-header-split">
                <div>
                  <span className="bl-tag-label">LEATHER & MATERIAL OPTIONS</span>
                  <h2 className="bl-serif-title bl-section-heading">Premium Materials for Every Style</h2>
                  <p className="bl-section-subtext">
                    Handpicked leathers, fabrics and finishes to create long-lasting, beautiful bags.
                  </p>
                </div>

                <div className="bl-carousel-nav-arrows">
                  <button 
                    className="bl-arrow-btn"
                    onClick={() => setMaterialCarouselIndex(prev => Math.max(0, prev - 1))}
                    disabled={materialCarouselIndex === 0}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="bl-arrow-btn"
                    onClick={() => setMaterialCarouselIndex(prev => Math.min(materialsList.length - 4, prev + 1))}
                    disabled={materialCarouselIndex >= materialsList.length - 4}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="bl-materials-carousel">
                {materialsList.map(mat => (
                  <div key={mat.id} className="bl-material-card">
                    <div className="bl-material-img-box">
                      <img src={mat.img} alt={mat.name} />
                      <span className="bl-mat-tag">{mat.tag}</span>
                    </div>
                    <div className="bl-material-info">
                      <h4 className="bl-material-name">{mat.name}</h4>
                      <p className="bl-material-desc">{mat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: HOW IT WORKS — FROM IDEA TO YOUR BAG */}
          <section className="bl-section bl-how-it-works-split">
            <div className="bl-container">
              <div className="bl-split-work-grid">
                
                {/* Left 4 steps */}
                <div className="bl-work-steps-col">
                  <span className="bl-tag-label">HOW IT WORKS</span>
                  <h2 className="bl-serif-title bl-section-heading">From Idea to Your Bag</h2>
                  <p className="bl-section-subtext" style={{ marginBottom: '32px' }}>
                    A simple and transparent process to create or buy your perfect bag.
                  </p>

                  <div className="bl-horizontal-stepper">
                    <div className="bl-num-step">
                      <div className="bl-num-circle">1</div>
                      <h5 className="bl-num-title">1. Choose</h5>
                      <p className="bl-num-desc">Pick a ready design or create a custom bag.</p>
                    </div>
                    <div className="bl-step-arrow-line">→</div>

                    <div className="bl-num-step">
                      <div className="bl-num-circle">2</div>
                      <h5 className="bl-num-title">2. Customize</h5>
                      <p className="bl-num-desc">Select material, color and details.</p>
                    </div>
                    <div className="bl-step-arrow-line">→</div>

                    <div className="bl-num-step">
                      <div className="bl-num-circle">3</div>
                      <h5 className="bl-num-title">3. Crafted</h5>
                      <p className="bl-num-desc">Our artisans handcraft your bag.</p>
                    </div>
                    <div className="bl-step-arrow-line">→</div>

                    <div className="bl-num-step">
                      <div className="bl-num-circle">4</div>
                      <h5 className="bl-num-title">4. Delivered</h5>
                      <p className="bl-num-desc">Securely packed and delivered to you.</p>
                    </div>
                  </div>
                </div>

                {/* Right Photo */}
                <div className="bl-work-photo-col">
                  <img 
                    src="https://images.unsplash.com/photo-1524388676161-0777ea826500?q=80&w=900&auto=format&fit=crop" 
                    alt="Leather Stitching Machine Work" 
                    className="bl-work-photo-img" 
                  />
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 7: STATEMENT BANNER */}
          <section className="bl-statement-banner">
            <div className="bl-container">
              <div className="bl-statement-card">
                <div className="bl-statement-content">
                  <h2 className="bl-serif-title bl-statement-heading">More Than a Bag, It's a Statement</h2>
                  <p className="bl-statement-sub">
                    Elegant, durable and designed for your everyday journeys.
                  </p>
                  <button 
                    className="bl-btn-primary"
                    onClick={() => scrollToId('featured-bags-section')}
                  >
                    Shop Collection →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8: CUSTOMER TESTIMONIALS */}
          <section className="bl-section bl-testimonials-section">
            <div className="bl-container">
              <div className="bl-section-header-split">
                <div>
                  <span className="bl-tag-label">LOVED BY OUR CUSTOMERS</span>
                  <h2 className="bl-serif-title bl-section-heading">Real People. Real Bags.</h2>
                  <p className="bl-section-subtext">
                    See how our custom and ready-made bags have become a part of their journey.
                  </p>
                </div>
                <span className="bl-link-text-pink">View More Reviews →</span>
              </div>

              <div className="bl-testimonials-grid-3">
                {shopTestimonials.map(t => (
                  <div key={t.id} className="bl-testimonial-card">
                    <div className="bl-t-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <p className="bl-t-quote">"{t.quote}"</p>

                    <div className="bl-t-footer">
                      <div className="bl-t-user">
                        <img src={t.avatar} alt={t.name} className="bl-t-avatar" />
                        <div>
                          <div className="bl-t-name">{t.name}</div>
                          <div className="bl-t-loc">{t.location}</div>
                        </div>
                      </div>
                      <img src={t.itemImg} alt="Bag item" className="bl-t-item-thumb" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: BOTTOM CTA BANNER */}
          <section className="bl-bottom-cta-banner">
            <div className="bl-container">
              <div className="bl-bottom-cta-inner">
                <div className="bl-bottom-cta-text">
                  <h2 className="bl-serif-title" style={{ color: '#fff', fontSize: '2.1rem', margin: '0 0 10px 0' }}>
                    Crafted for Your Next Journey
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '0.95rem' }}>
                    Explore premium bags or create your own custom design today.
                  </p>
                </div>

                <div className="bl-bottom-cta-btns">
                  <button 
                    className="bl-btn-primary"
                    onClick={() => scrollToId('featured-bags-section')}
                  >
                    Shop Ready Bags →
                  </button>
                  <button 
                    className="bl-btn-dark-outline"
                    onClick={() => setCustomStudioModalOpen(true)}
                  >
                    Create Custom Design
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: REPAIR & RESTORE (MATCHING IMAGE 2 EXACTLY)                      */}
      {/* ========================================================================= */}
      {activeMode === 'restore' && (
        <div className="bl-repair-restore-page">
          
          {/* SECTION 1: HERO (MATCHING USER SCREENSHOT EXACTLY) */}
          <div className="bl-restore-hero-wrapper">
            <div className="bl-restore-hero-card">
              
              {/* Hero Left Content */}
              <div className="bl-restore-hero-left">
                <span className="bl-restore-hero-tag">
                  STITCHBEE LEATHER ATELIER
                </span>

                <h1 className="bl-serif-title bl-restore-heading">
                  Restore the pieces <br />
                  <span className="bl-restore-heading-brown">worth keeping.</span>
                </h1>

                <p className="bl-restore-subtext">
                  Expert restoration for handbags, luggage, leather accessories and travel pieces. Trusted specialists. Premium craftsmanship.
                </p>

                <div className="bl-restore-badges-row">
                  <div className="bl-restore-badge-pill">
                    <span className="bl-badge-icon-wrap"><ShieldCheck size={16} /></span>
                    <span>Verified Specialists</span>
                  </div>
                  <div className="bl-restore-badge-pill">
                    <span className="bl-badge-icon-wrap"><Truck size={16} /></span>
                    <span>Doorstep Pickup</span>
                  </div>
                  <div className="bl-restore-badge-pill">
                    <span className="bl-badge-icon-wrap"><RotateCcw size={16} /></span>
                    <span>Repair Warranty</span>
                  </div>
                </div>

                <div className="bl-restore-cta-row">
                  <button 
                    className="bl-restore-btn-pink"
                    onClick={() => scrollToId('start-restoration-wizard')}
                  >
                    Start a Repair →
                  </button>
                  <button 
                    className="bl-restore-btn-white"
                    onClick={() => scrollToId('recommended-services-section')}
                  >
                    Explore Services
                  </button>
                </div>
              </div>

              {/* Hero Right: Floating Assessment Card */}
              <div className="bl-restore-hero-right">
                <div className="bl-assessment-floating-card">
                  <div className="bl-assess-card-icon">
                    <Camera size={20} color="#f72585" />
                  </div>
                  <h4 className="bl-assess-card-title">
                    Complimentary<br />Assessment
                  </h4>
                  <p className="bl-assess-card-sub">
                    Upload 2-4 photos and receive a repair estimate.
                  </p>
                  <button 
                    className="bl-assess-card-btn"
                    onClick={() => setAssessmentModalOpen(true)}
                  >
                    Upload Photos →
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 2: OUR EXPERTISE — WHAT WOULD YOU LIKE US TO RESTORE? */}
          <section className="bl-section bl-restore-expertise-section">
            <div className="bl-container">
              <div className="bl-section-header-center">
                <span className="bl-tag-label bl-tag-label-pink">OUR EXPERTISE</span>
                <h2 className="bl-serif-title bl-section-heading">What would you like us to restore?</h2>
                <p className="bl-section-subtext">
                  Select a category to see available restoration services.
                </p>
              </div>

              <div className="bl-restore-expertise-grid">
                {restoreCategories.map(cat => {
                  const isSelected = selectedRestoreCategory === cat.key;
                  return (
                    <div 
                      key={cat.id} 
                      className={`bl-restore-expertise-card ${isSelected ? 'selected active' : ''}`}
                      onClick={() => handleCategorySelect(cat.key)}
                    >
                      <img 
                        src={cat.img} 
                        alt={cat.title} 
                        className="bl-restore-card-bg"
                      />
                      <div className={`bl-restore-card-overlay ${isSelected ? 'selected' : ''}`} />
                      
                      {isSelected && (
                        <div className="bl-cat-selected-badge">
                          <Check size={13} color="#ffffff" strokeWidth={3} />
                        </div>
                      )}

                      <div className="bl-restore-card-content">
                        <div className="bl-restore-card-text">
                          <h4 className="bl-restore-card-title">{cat.title}</h4>
                          <p className="bl-restore-card-count">{cat.count}</p>
                        </div>
                        <div className="bl-restore-card-arrow">
                          <ChevronRight size={18} strokeWidth={2.4} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 3: VISUAL DIAGNOSIS — WHAT NEEDS ATTENTION? */}
          <section id="what-needs-attention" className="bl-section bl-diagnosis-section">
            <div className="bl-container">
              <div className="bl-diagnosis-wrapper">
                {selectedRestoreCategory === 'other' ? (
                  <div className="bl-custom-assessment-container">
                    <span className="bl-tag-label bl-tag-label-pink">CUSTOM ASSESSMENT</span>
                    <h3 className="bl-serif-title" style={{ fontSize: '1.9rem', margin: '8px 0 10px 0' }}>
                      Tell us what you'd like restored.
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--bl-text-secondary)', margin: '0 0 28px 0', maxWidth: '640px' }}>
                      Can't find your item above? Upload a few photos and our specialists will assess the item and recommend the right restoration service.
                    </p>

                    <div className="bl-custom-assessment-form">
                      <div className="bl-custom-form-group">
                        <label className="bl-form-label" style={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.05em' }}>ITEM TYPE</label>
                        <input 
                          type="text"
                          value={customItemType}
                          onChange={(e) => setCustomItemType(e.target.value)}
                          placeholder="e.g. Camera bag, leather case, musical instrument case..."
                          className="bl-form-input"
                          style={{ maxWidth: '540px' }}
                        />
                      </div>

                      <div className="bl-custom-form-group">
                        <label className="bl-form-label" style={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.05em' }}>UPLOAD PHOTOS (2–4 photos)</label>
                        <div className="bl-photos-drop-grid" style={{ maxWidth: '540px' }}>
                          {['Full Item', 'Damage Close-Up', 'Another Angle', 'Optional Photo'].map((slotLabel, idx) => {
                            const photoSrc = wizardPhotos[idx];
                            const hasPhoto = Boolean(photoSrc);
                            return (
                              <div 
                                key={idx} 
                                className={`bl-photo-slot ${hasPhoto ? 'filled' : ''}`}
                                onClick={() => {
                                  if (!hasPhoto) {
                                    const inputEl = document.getElementById(`custom-photo-input-${idx}`);
                                    if (inputEl) inputEl.click();
                                  }
                                }}
                              >
                                <input 
                                  id={`custom-photo-input-${idx}`}
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  style={{ display: 'none' }}
                                  onChange={(e) => handlePhotoFileChange(e, idx)}
                                />
                                {hasPhoto ? (
                                  <>
                                    <img src={photoSrc} alt={slotLabel} />
                                    <div className="bl-photo-tag-pill">{slotLabel}</div>
                                    <div className="bl-photo-overlay">
                                      <button 
                                        type="button" 
                                        className="bl-photo-action-btn"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const inputEl = document.getElementById(`custom-photo-input-${idx}`);
                                          if (inputEl) inputEl.click();
                                        }}
                                      >
                                        <RefreshCw size={11} /> Replace
                                      </button>
                                      <button 
                                        type="button" 
                                        className="bl-photo-action-btn delete"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setWizardPhotos(prev => {
                                            const next = [...prev];
                                            next[idx] = null;
                                            return next;
                                          });
                                          showToast('Photo removed');
                                        }}
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="bl-photo-empty">
                                    <Camera size={18} color="var(--bl-pink)" />
                                    <span>{slotLabel}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="bl-custom-form-group">
                        <label className="bl-form-label" style={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.05em' }}>DESCRIPTION</label>
                        <textarea 
                          rows={3}
                          value={customDescription}
                          onChange={(e) => setCustomDescription(e.target.value)}
                          placeholder="Tell us what is damaged or what you would like restored..."
                          className="bl-notes-textarea"
                          style={{ maxWidth: '540px' }}
                        />
                      </div>

                      <button 
                        type="button"
                        className="bl-btn-primary"
                        style={{ padding: '12px 28px', fontSize: '0.9rem', marginTop: '6px' }}
                        onClick={() => {
                          const itemLabel = customItemType.trim() || 'Custom Item';
                          const issueLabel = customDescription.trim() || 'Custom Assessment Request';
                          setSelectedBookingRepair({
                            category: itemLabel,
                            issue: issueLabel,
                            service: 'Complimentary Specialist Assessment',
                            startingPrice: 0
                          });
                          setWizardItem('other');
                          setWizardDamages([itemLabel ? `${itemLabel} Assessment` : 'Custom Item Assessment']);
                          setWizardStep(3);
                          scrollToId('start-restoration-wizard');
                          showToast('Custom assessment details saved! Complete your booking below.');
                        }}
                      >
                        Get Free Assessment →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bl-diagnosis-grid">
                    
                    {/* Left Column: Interactive Product Anatomy with Hotspots */}
                    <div className="bl-diagnosis-left">
                      <span className="bl-tag-label">{currentCatData.sectionLabel}</span>
                      <h3 className="bl-serif-title" style={{ fontSize: '1.8rem', margin: '6px 0 10px 0' }}>
                        {currentCatData.heading}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--bl-text-secondary)', margin: '0 0 20px 0' }}>
                        {currentCatData.description}
                      </p>

                      {/* If Accessories category, show sub-item switcher */}
                      {selectedRestoreCategory === 'accessories' && (
                        <div className="bl-accessory-subtype-pills">
                          {currentCatData.subtypes?.map(sub => (
                            <button 
                              key={sub}
                              type="button"
                              className={`bl-accessory-pill ${accessorySubtype === sub ? 'active' : ''}`}
                              onClick={() => {
                                setAccessorySubtype(sub);
                                showToast(`Selected: ${sub}`);
                              }}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="bl-hotspot-canvas-box">
                        <img 
                          src={currentCatData.image} 
                          alt={`${currentCatData.title} interactive diagnosis`} 
                          className={`bl-hotspot-bag-img ${isFading ? 'fading' : ''}`} 
                        />

                        {/* Dynamic Hotspots for Current Category */}
                        {currentCatData.hotspots?.map(pin => {
                          const isPinActive = selectedHotspot === pin.id || selectedIssue === pin.issueId;
                          return (
                            <button 
                              key={pin.id}
                              type="button"
                              className={`bl-hotspot-pin ${isPinActive ? 'active' : ''}`}
                              style={{ top: pin.top, left: pin.left }}
                              onClick={() => handleHotspotClick(pin)}
                            >
                              <span className="bl-pin-dot" />
                              <span className="bl-pin-label">{pin.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Dynamic Common Issues List */}
                    <div className="bl-diagnosis-right">
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--bl-text-secondary)' }}>
                        Or choose from common issues:
                      </h4>

                      <div className="bl-issues-list">
                        {currentCatData.issues?.map(issue => {
                          const isSelected = selectedIssue === issue.id;
                          return (
                            <div 
                              key={issue.id}
                              className={`bl-issue-row ${isSelected ? 'active' : ''}`}
                              onClick={() => handleIssueClick(issue)}
                            >
                              <div className="bl-issue-row-left">
                                <span className="bl-issue-icon">{issue.icon}</span>
                                <span className="bl-issue-title">{issue.label}</span>
                              </div>
                              {isSelected && (
                                <Check size={16} className="bl-issue-check" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 4: POPULAR SERVICES — RECOMMENDED FOR YOUR BAG */}
          <section id="recommended-services-section" className="bl-section bl-recommended-services">
            <div className="bl-container">
              <div className="bl-section-header-center">
                <span className="bl-tag-label">POPULAR SERVICES</span>
                <h2 className="bl-serif-title bl-section-heading">{currentCatData.recommendedHeading}</h2>
                <p className="bl-section-subtext">
                  Our most requested restoration services for {currentCatData.title.toLowerCase()}. Transparent pricing and professional craftsmanship.
                </p>
              </div>

              <div className="bl-services-grid-4">
                {sortedServices.map(service => (
                  <div key={service.id} className="bl-service-card">
                    <div className="bl-serv-img-box">
                      <img src={service.img} alt={service.title} />
                    </div>
                    <div className="bl-serv-content">
                      <h4 className="bl-serv-title">{service.title}</h4>
                      <p className="bl-serv-desc">{service.desc}</p>
                      
                      <div className="bl-serv-meta-row">
                        <div className="bl-serv-price">
                          <span className="bl-serv-from">From</span> {service.price}
                        </div>
                        <div className="bl-serv-time">
                          <Clock size={13} /> {service.turnaround}
                        </div>
                      </div>

                      <div className="bl-serv-btn-row">
                        <button 
                          className="bl-serv-view-btn"
                          onClick={() => setSelectedServiceModal(service)}
                        >
                          View Details
                        </button>
                        <button 
                          className="bl-serv-select-btn"
                          onClick={() => handleSelectRepair(service)}
                        >
                          Select Repair
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: REAL RESTORATIONS — CRAFTSMANSHIP YOU CAN SEE */}
          <section className="bl-section bl-before-after-section">
            <div className="bl-container">
              <div className="bl-section-header-split">
                <div>
                  <span className="bl-tag-label">REAL RESTORATIONS</span>
                  <h2 className="bl-serif-title bl-section-heading">Craftsmanship you can see.</h2>
                  <p className="bl-section-subtext">
                    Actual repairs completed by our verified StitchBee leather specialists.
                  </p>
                </div>

                <div className="bl-ba-category-pills">
                  {['handbags', 'luggage', 'briefcases', 'backpacks'].map(key => (
                    <button 
                      key={key}
                      className={`bl-ba-pill ${baCategory === key ? 'active' : ''}`}
                      onClick={() => setBaCategory(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bl-ba-showcase-grid">
                
                {/* Left: Interactive Draggable Before / After Slider */}
                <div 
                  className="bl-ba-slider-container"
                  onMouseMove={(e) => {
                    if (isDraggingSlider) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                      setSliderPos((x / rect.width) * 100);
                    }
                  }}
                  onMouseDown={() => setIsDraggingSlider(true)}
                  onMouseUp={() => setIsDraggingSlider(false)}
                  onMouseLeave={() => setIsDraggingSlider(false)}
                  onTouchMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const touch = e.touches[0];
                    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                    setSliderPos((x / rect.width) * 100);
                  }}
                >
                  {/* AFTER IMAGE (Background) */}
                  <img 
                    src="/after_bag.png" 
                    alt="After Restoration" 
                    className="bl-ba-img after" 
                  />
                  <div className="bl-ba-badge after">AFTER</div>

                  {/* BEFORE IMAGE (Clipped on top) */}
                  <div 
                    className="bl-ba-clip-wrapper"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img 
                      src="/before_bag.png" 
                      alt="Before Restoration" 
                      className="bl-ba-img before" 
                    />
                    <div className="bl-ba-badge before">BEFORE</div>
                  </div>

                  {/* Divider Line & Handle */}
                  <div 
                    className="bl-ba-divider-line"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="bl-ba-handle">
                      <span>↔</span>
                    </div>
                  </div>
                </div>

                {/* Right: Vintage Leather Handbag Card */}
                <div className="bl-ba-info-card">
                  <h3 className="bl-serif-title" style={{ fontSize: '1.45rem', margin: '0 0 16px 0' }}>
                    Vintage Leather Handbag
                  </h3>

                  <ul className="bl-ba-check-list">
                    <li><Check size={16} color="#10b981" /> Corner reconstruction</li>
                    <li><Check size={16} color="#10b981" /> Colour restoration</li>
                    <li><Check size={16} color="#10b981" /> Restitching</li>
                    <li><Check size={16} color="#10b981" /> Hardware polishing</li>
                  </ul>

                  <div className="bl-ba-price-time-row">
                    <div className="bl-ba-time">
                      <Clock size={15} /> Completed in 5 days
                    </div>
                    <div className="bl-ba-price">
                      ₹1,849
                    </div>
                  </div>

                  <div className="bl-ba-thumbs-row">
                    <img src="/before_bag.png" alt="Before restoration detail" title="Before" />
                    <img src="/after_bag.png" alt="After restoration detail" title="After" />
                    <img src="/rec_corner_edge.png" alt="Corner restoration detail" title="Corner repair" />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 6: STANDARDS & HOW IT WORKS (SPLIT) */}
          <section className="bl-section bl-standards-split">
            <div className="bl-container">
              <div className="bl-standards-split-grid">
                
                {/* Column 1: The StitchBee Standards */}
                <div className="bl-standards-col">
                  <span className="bl-tag-label">THE STITCHBEE STANDARDS</span>
                  <h3 className="bl-serif-title" style={{ fontSize: '1.6rem', margin: '8px 0 24px 0' }}>
                    Restored by specialists. Protected by StitchBee.
                  </h3>

                  <div className="bl-std-features-list">
                    <div className="bl-std-feature">
                      <div className="bl-std-icon"><Users size={20} /></div>
                      <div>
                        <h5 className="bl-std-title">Specialist Matching</h5>
                        <p className="bl-std-desc">Your item is matched with a craftsperson experienced with its material and repair.</p>
                      </div>
                    </div>

                    <div className="bl-std-feature">
                      <div className="bl-std-icon"><FileText size={20} /></div>
                      <div>
                        <h5 className="bl-std-title">Transparent Assessment</h5>
                        <p className="bl-std-desc">Review the repair scope and final quote before restoration begins.</p>
                      </div>
                    </div>

                    <div className="bl-std-feature">
                      <div className="bl-std-icon"><Truck size={20} /></div>
                      <div>
                        <h5 className="bl-std-title">Doorstep Logistics</h5>
                        <p className="bl-std-desc">Secure pickup and delivery without visiting the workshop.</p>
                      </div>
                    </div>

                    <div className="bl-std-feature">
                      <div className="bl-std-icon"><RotateCcw size={20} /></div>
                      <div>
                        <h5 className="bl-std-title">Repair Guarantee</h5>
                        <p className="bl-std-desc">Eligible workmanship is covered by the StitchBee repair warranty.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: How It Works */}
                <div className="bl-how-it-works-col">
                  <span className="bl-tag-label">HOW IT WORKS</span>
                  <h3 className="bl-serif-title" style={{ fontSize: '1.6rem', margin: '8px 0 24px 0' }}>
                    A simple 4-step journey.
                  </h3>

                  <div className="bl-std-features-list">
                    <div className="bl-std-feature">
                      <div className="bl-std-icon round-pink">1</div>
                      <div>
                        <h5 className="bl-std-title">Upload Photos</h5>
                        <p className="bl-std-desc">Tell us what needs attention.</p>
                      </div>
                    </div>

                    <div className="bl-std-feature">
                      <div className="bl-std-icon round-pink">2</div>
                      <div>
                        <h5 className="bl-std-title">Assessment & Quote</h5>
                        <p className="bl-std-desc">We inspect and provide pricing.</p>
                      </div>
                    </div>

                    <div className="bl-std-feature">
                      <div className="bl-std-icon round-pink">3</div>
                      <div>
                        <h5 className="bl-std-title">Restoration by Specialist</h5>
                        <p className="bl-std-desc">Our experts carefully repair your item.</p>
                      </div>
                    </div>

                    <div className="bl-std-feature">
                      <div className="bl-std-icon round-pink">4</div>
                      <div>
                        <h5 className="bl-std-title">Returned to You</h5>
                        <p className="bl-std-desc">Your restored piece is back at your doorstep.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 7: START YOUR RESTORATION WIZARD */}
          <section id="start-restoration-wizard" className="bl-section bl-wizard-section">
            <div className="bl-container">
              <div className="bl-wizard-box">
                {/* 1. Left visual photo of artisan craftsmanship with smooth fade */}
                <div className="bl-wizard-photo-panel">
                  <img 
                    src="/get_assessed_artisan.png" 
                    alt="Leather artisan restoring bag" 
                    className="bl-wizard-artisan-img" 
                  />
                  <div className="bl-wizard-photo-gradient" />
                </div>

                {/* 2. Middle-Left: Heading and Tag on clean white background */}
                <div className="bl-wizard-intro-col">
                  <span className="bl-tag-label bl-tag-label-pink">START YOUR RESTORATION</span>
                  <h3 className="bl-serif-title bl-wizard-heading">
                    Get your bag assessed<br />in a few simple steps.
                  </h3>
                </div>

                {/* 3. Right: 4-Step Interactive Wizard */}
                <div className="bl-wizard-content-col">
                  
                  {/* Stepper Bar with Connecting Lines */}
                  <div className="bl-stepper-header">
                    {[
                      { step: 1, label: 'Item' },
                      { step: 2, label: 'Damage' },
                      { step: 3, label: 'Photos' },
                      { step: 4, label: 'Pickup' }
                    ].map((s, idx) => (
                      <React.Fragment key={s.step}>
                        {idx > 0 && (
                          <div className={`bl-stepper-line ${wizardStep >= s.step ? 'active' : ''}`} />
                        )}
                        <div 
                          className={`bl-stepper-tab ${wizardStep >= s.step ? 'active' : ''} ${wizardStep === s.step ? 'current' : ''}`}
                          onClick={() => setWizardStep(s.step)}
                        >
                          <span className="bl-step-num-pill">{s.step}</span>
                          <span className="bl-step-tab-label">{s.label}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Pre-Selected Summary Banner */}
                  {selectedBookingRepair && (
                    <div className="bl-wizard-preselected-banner">
                      <div className="bl-preselected-tag">
                        <Check size={13} color="#f72585" strokeWidth={3} />
                        <span>{selectedBookingRepair.category}</span>
                      </div>
                      <span className="bl-preselected-sep">•</span>
                      <div className="bl-preselected-tag">
                        <Check size={13} color="#f72585" strokeWidth={3} />
                        <span>{selectedBookingRepair.issue}</span>
                      </div>
                      <span className="bl-preselected-sep">•</span>
                      <div className="bl-preselected-tag">
                        <Check size={13} color="#f72585" strokeWidth={3} />
                        <span>{selectedBookingRepair.service}</span>
                      </div>
                      <button 
                        type="button" 
                        className="bl-preselected-edit-btn"
                        onClick={() => setWizardStep(1)}
                      >
                        Edit
                      </button>
                    </div>
                  )}

                    {/* STEP 1: WHAT ARE WE RESTORING? */}
                    {wizardStep === 1 && (
                      <div className="bl-wizard-body-step">
                        <span className="bl-step-indicator">Step 1 of 4</span>
                        <h4 className="bl-wizard-step-title">What are we restoring?</h4>

                        <div className="bl-item-type-cards">
                          {[
                            { id: 'handbag', label: 'Handbag', icon: '👜' },
                            { id: 'luggage', label: 'Luggage', icon: '🧳' },
                            { id: 'backpack', label: 'Backpack', icon: '🎒' },
                            { id: 'briefcase', label: 'Briefcase', icon: '💼' },
                            { id: 'accessories', label: 'Accessories', icon: '👛' },
                            { id: 'other', label: 'Other', icon: '🗃️' }
                          ].map(it => (
                            <div 
                              key={it.id}
                              className={`bl-item-type-card ${wizardItem === it.id ? 'selected' : ''}`}
                              onClick={() => {
                                setWizardItem(it.id);
                                setSelectedRestoreCategory(it.id);
                                const cData = repairCategories[it.id];
                                if (cData) {
                                  setSelectedBookingRepair(prev => ({
                                    category: cData.title,
                                    issue: cData.issues?.[0]?.label || prev?.issue || 'General Restoration',
                                    service: cData.issues?.[0]?.priorityService || prev?.service || 'Restoration Service',
                                    startingPrice: cData.services?.[0]?.priceNum || 249
                                  }));
                                }
                              }}
                            >
                              <span className="bl-item-type-icon">{it.icon}</span>
                              <span className="bl-item-type-name">{it.label}</span>
                            </div>
                          ))}
                        </div>

                        <div style={{ marginTop: '28px', textAlign: 'left' }}>
                          <button 
                            className="bl-btn-primary bl-wizard-continue-btn"
                            onClick={() => setWizardStep(2)}
                          >
                            Continue →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: DAMAGE SELECTION */}
                    {wizardStep === 2 && (
                      <div className="bl-wizard-body-step">
                        <span className="bl-step-indicator">Step 2 of 4</span>
                        <h4 className="bl-wizard-step-title">Select Component & Damage</h4>

                        <div className="bl-damage-selection-grid">
                          {(currentCatData.issues || []).filter(i => i.id !== 'unsure').map(iss => {
                            const d = iss.label;
                            const isChecked = wizardDamages.includes(d);
                            return (
                              <div 
                                key={iss.id}
                                className={`bl-damage-checkbox-card ${isChecked ? 'active' : ''}`}
                                onClick={() => {
                                  if (isChecked) {
                                    setWizardDamages(prev => prev.filter(x => x !== d));
                                  } else {
                                    setWizardDamages(prev => [...prev, d]);
                                  }
                                  setSelectedIssue(iss.id);
                                  setSelectedHotspot(iss.id);
                                  setSelectedBookingRepair(prev => ({
                                    ...prev,
                                    issue: d,
                                    service: iss.priorityService || prev?.service || 'Restoration Service'
                                  }));
                                }}
                              >
                                <div className={`bl-checkbox-box ${isChecked ? 'checked' : ''}`}>
                                  {isChecked && <Check size={13} color="#fff" />}
                                </div>
                                <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>{d}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
                          <button className="bl-btn-secondary" onClick={() => setWizardStep(1)}>
                            ← Back
                          </button>
                          <button className="bl-btn-primary" onClick={() => setWizardStep(3)}>
                            Next: Photos →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: UPLOAD PHOTOS */}
                    {wizardStep === 3 && (
                      <div className="bl-wizard-body-step">
                        <span className="bl-step-indicator">Step 3 of 4</span>
                        <h4 className="bl-wizard-step-title">Upload Inspection Photos</h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--bl-text-secondary)', margin: '0 0 16px 0' }}>
                          Clear photos of the front, back, and damage areas help our specialists assess the scope quickly.
                        </p>

                        <div className="bl-photos-drop-grid">
                          {wizardPhotos.map((photoSrc, idx) => {
                            const hasPhoto = Boolean(photoSrc);
                            return (
                              <div 
                                key={idx} 
                                className={`bl-photo-slot ${hasPhoto ? 'filled' : ''}`}
                                onClick={() => {
                                  if (!hasPhoto) {
                                    const inputEl = document.getElementById(`wizard-photo-input-${idx}`);
                                    if (inputEl) inputEl.click();
                                  }
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const file = e.dataTransfer.files?.[0];
                                  if (file && file.type.startsWith('image/')) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      setWizardPhotos(prev => {
                                        const next = [...prev];
                                        next[idx] = ev.target.result;
                                        return next;
                                      });
                                      showToast(`Photo ${idx + 1} uploaded!`);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              >
                                <input 
                                  id={`wizard-photo-input-${idx}`}
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  style={{ display: 'none' }}
                                  onChange={(e) => handlePhotoFileChange(e, idx)}
                                />
                                {hasPhoto ? (
                                  <>
                                    <img 
                                      src={photoSrc} 
                                      alt={`Inspection bag photo ${idx + 1}`} 
                                    />
                                    <div className="bl-photo-tag-pill">
                                      {['Front', 'Back', 'Damage', 'Detail'][idx] || `Photo ${idx + 1}`}
                                    </div>
                                    <div className="bl-photo-overlay">
                                      <button 
                                        type="button"
                                        className="bl-photo-action-btn"
                                        title="Replace photo"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const inputEl = document.getElementById(`wizard-photo-input-${idx}`);
                                          if (inputEl) inputEl.click();
                                        }}
                                      >
                                        <RefreshCw size={11} /> Replace
                                      </button>
                                      <button 
                                        type="button"
                                        className="bl-photo-action-btn delete"
                                        title="Remove photo"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setWizardPhotos(prev => {
                                            const next = [...prev];
                                            next[idx] = null;
                                            return next;
                                          });
                                          showToast(`Photo ${idx + 1} removed`);
                                        }}
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="bl-photo-empty">
                                    <Camera size={20} color="var(--bl-pink)" />
                                    <span>+ Photo {idx + 1}</span>
                                    <span style={{ fontSize: '0.62rem', opacity: 0.6, fontWeight: 500 }}>
                                      {['Front', 'Back', 'Damage', 'Detail'][idx]}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <textarea 
                          placeholder="Describe specific damage notes or requests (optional)..."
                          value={wizardNotes}
                          onChange={(e) => setWizardNotes(e.target.value)}
                          className="bl-notes-textarea"
                          rows={2}
                        />

                        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                          <button className="bl-btn-secondary" onClick={() => setWizardStep(2)}>
                            ← Back
                          </button>
                          <button className="bl-btn-primary" onClick={() => setWizardStep(4)}>
                            Next: Pickup Details →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: SCHEDULE PICKUP */}
                    {wizardStep === 4 && (
                      <div className="bl-wizard-body-step">
                        <span className="bl-step-indicator">Step 4 of 4</span>
                        <h4 className="bl-wizard-step-title">Doorstep Collection & Assessment</h4>

                        <div className="bl-pickup-form">
                          <div>
                            <label className="bl-form-label">Pickup Address</label>
                            <input 
                              type="text" 
                              value={pickupAddress}
                              onChange={(e) => setPickupAddress(e.target.value)}
                              className="bl-form-input" 
                            />
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                              <label className="bl-form-label">Pincode</label>
                              <input 
                                type="text" 
                                value={pickupPincode}
                                onChange={(e) => setPickupPincode(e.target.value)}
                                className="bl-form-input" 
                              />
                            </div>
                            <div>
                              <label className="bl-form-label">Pickup Date</label>
                              <input 
                                type="date" 
                                value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                                className="bl-form-input" 
                              />
                            </div>
                          </div>

                          <div>
                            <label className="bl-form-label">Preferred Time Slot</label>
                            <select 
                              value={pickupTimeSlot}
                              onChange={(e) => setPickupTimeSlot(e.target.value)}
                              className="bl-form-input"
                            >
                              <option>10:00 AM - 01:00 PM</option>
                              <option>02:00 PM - 05:00 PM</option>
                              <option>05:30 PM - 08:30 PM</option>
                            </select>
                          </div>
                        </div>

                        {wizardPhotos.some(Boolean) && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'var(--bl-warm-card)', borderRadius: '8px', border: '1px solid var(--bl-border)', marginTop: '14px' }}>
                            <span style={{ fontSize: '0.76rem', color: 'var(--bl-text-secondary)', fontWeight: 600 }}>Inspection Photos:</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              {wizardPhotos.map((p, i) => p ? (
                                <img key={i} src={p} alt="Uploaded bag" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--bl-border)' }} />
                              ) : null)}
                            </div>
                          </div>
                        )}

                        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                          <button className="bl-btn-secondary" onClick={() => setWizardStep(3)}>
                            ← Back
                          </button>
                          <button 
                            className="bl-btn-primary" 
                            onClick={() => {
                              setWizardStep(5);
                              showToast('Restoration pickup scheduled! 🛵');
                            }}
                          >
                            Confirm Free Assessment Pickup →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: CONFIRMED */}
                    {wizardStep === 5 && (
                      <div className="bl-wizard-body-step" style={{ textAlign: 'center', padding: '30px 10px' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                          <CheckCircle2 size={36} />
                        </div>
                        <h3 className="bl-serif-title" style={{ fontSize: '1.6rem', margin: '0 0 8px 0' }}>
                          Pickup Scheduled!
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: 'var(--bl-text-secondary)', maxWidth: '440px', margin: '0 auto 20px auto' }}>
                          A StitchBee leather logistics partner will collect your bag on <strong>{pickupDate}</strong> during <strong>{pickupTimeSlot}</strong>.
                        </p>

                        <div className="bl-order-meta-box">
                          <div><strong>Tracking ID:</strong> #STB-RESTORE-8842</div>
                          <div><strong>Assessment:</strong> Complimentary Diagnostic Quote</div>
                          <div><strong>Workshop:</strong> Master Atelier Bangalore</div>
                          <div><strong>Photos Attached:</strong> {wizardPhotos.filter(Boolean).length} photo(s)</div>
                        </div>

                        <button 
                          className="bl-btn-primary" 
                          style={{ marginTop: '20px' }}
                          onClick={() => setWizardStep(1)}
                        >
                          Book Another Item
                        </button>
                      </div>
                    )}

                  </div>
              </div>
            </div>
          </section>

          {/* SECTION 8: CUSTOMER STORIES — LOVED BY BAG OWNERS */}
          <section className="bl-section bl-testimonials-section">
            <div className="bl-container">
              <div className="bl-section-header-center">
                <span className="bl-tag-label">CUSTOMER STORIES</span>
                <h2 className="bl-serif-title bl-section-heading">Loved by Bag Owners</h2>
                <p className="bl-section-subtext">
                  Real experiences from customers who trusted StitchBee with their most valued pieces.
                </p>
              </div>

              <div className="bl-testimonials-grid-3">
                {restoreTestimonials.map(t => (
                  <div key={t.id} className="bl-testimonial-card">
                    <div className="bl-t-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <p className="bl-t-quote">"{t.quote}"</p>

                    <div className="bl-t-footer">
                      <div className="bl-t-user">
                        <img src={t.avatar} alt={t.name} className="bl-t-avatar" />
                        <div>
                          <div className="bl-t-name">{t.name} • {t.location}</div>
                          <div className="bl-t-loc" style={{ color: 'var(--bl-pink)', fontWeight: 600 }}>{t.service}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: BOTTOM CTA BANNER */}
          <section className="bl-restore-cta-section">
            <div className="bl-container">
              <div className="bl-restore-cta-card">
                <div className="bl-restore-cta-text">
                  <h2 
                    className="bl-serif-title bl-restore-cta-title"
                    style={{ color: '#ffffff', margin: '0 0 8px 0', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
                  >
                    Ready to restore your favourite piece?
                  </h2>
                  <p 
                    className="bl-restore-cta-subtitle"
                    style={{ color: 'rgba(255, 255, 255, 0.88)', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
                  >
                    Get a free assessment from our verified leather specialists.
                  </p>
                </div>

                <div className="bl-restore-cta-actions">
                  <button 
                    className="bl-btn-primary bl-restore-cta-btn"
                    onClick={() => scrollToId('start-restoration-wizard')}
                  >
                    Start Free Assessment →
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ========================================================================= */}
      {/* RICH INTERACTIVE MODALS & DRAWERS                                        */}
      {/* ========================================================================= */}

      {/* 1. PRODUCT DETAILS MODAL */}
      {selectedProductModal && (
        <div className="bl-modal-backdrop" onClick={() => setSelectedProductModal(null)}>
          <div className="bl-modal-card bl-product-detail-modal" onClick={e => e.stopPropagation()}>
            <button className="bl-modal-close" onClick={() => setSelectedProductModal(null)}>
              <X size={20} />
            </button>

            <div className="bl-prod-detail-grid">
              <div className="bl-prod-detail-img-box">
                <img src={selectedProductModal.img} alt={selectedProductModal.name} />
              </div>

              <div className="bl-prod-detail-info">
                <span className="bl-tag-label">{selectedProductModal.category.toUpperCase()}</span>
                <h3 className="bl-serif-title" style={{ fontSize: '1.8rem', margin: '8px 0 10px 0' }}>
                  {selectedProductModal.name}
                </h3>
                <div className="bl-detail-price">₹{selectedProductModal.price.toLocaleString('en-IN')}</div>
                <p className="bl-detail-desc">{selectedProductModal.description}</p>

                <div className="bl-specs-table">
                  <div className="bl-spec-row">
                    <span>Material:</span>
                    <strong>{selectedProductModal.material}</strong>
                  </div>
                  <div className="bl-spec-row">
                    <span>Dimensions:</span>
                    <strong>{selectedProductModal.dimensions}</strong>
                  </div>
                  <div className="bl-spec-row">
                    <span>Craftsmanship:</span>
                    <strong>Handcrafted in Bengaluru Atelier</strong>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
                    Select Leather Color:
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {selectedProductModal.colors?.map(col => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedProductModal({ ...selectedProductModal, selectedColor: col.name })}
                        className={`bl-color-pick-pill ${selectedProductModal.selectedColor === col.name ? 'active' : ''}`}
                      >
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: col.hex, display: 'inline-block' }} />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bl-modal-cta-row">
                  <button 
                    className="bl-btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => {
                      handleAddToCartItem(selectedProductModal);
                      setSelectedProductModal(null);
                    }}
                  >
                    Add to Cart & Checkout
                  </button>
                  <button 
                    className="bl-btn-secondary"
                    onClick={() => {
                      setSelectedProductModal(null);
                      setCustomStudioModalOpen(true);
                    }}
                  >
                    Customize in 3D
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CUSTOM DESIGN STUDIO MODAL */}
      {customStudioModalOpen && (
        <div className="bl-modal-backdrop" onClick={() => setCustomStudioModalOpen(false)}>
          <div className="bl-modal-card bl-custom-modal" onClick={e => e.stopPropagation()}>
            <button className="bl-modal-close" onClick={() => setCustomStudioModalOpen(false)}>
              <X size={20} />
            </button>

            {!customQuoteSubmitted ? (
              <div className="bl-custom-modal-grid">
                {/* Visual Preview Canvas */}
                <div className="bl-builder-canvas-panel">
                  <div className="bl-canvas-badge">Interactive Atelier Configurator</div>
                  
                  <div className="bl-canvas-svg-box">
                    <svg viewBox="0 0 320 280" className="bl-bag-3d-svg">
                      <defs>
                        <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={builderColor === 'cognac' ? '#9a4f21' : builderColor === 'black' ? '#262626' : '#d97706'} />
                          <stop offset="100%" stopColor={builderColor === 'cognac' ? '#5c2d15' : builderColor === 'black' ? '#0f0f0f' : '#92400e'} />
                        </linearGradient>
                      </defs>

                      {/* Main Bag Body */}
                      <path 
                        d="M 50 100 L 75 240 C 75 255 245 255 245 240 L 270 100 C 270 90 50 90 50 100 Z" 
                        fill="url(#bagGrad)" 
                        stroke="#1c1917" 
                        strokeWidth="3" 
                      />

                      {/* Front Panel Accent */}
                      <path 
                        d="M 75 125 L 90 225 C 90 235 230 235 230 225 L 245 125 Z" 
                        fill="rgba(0,0,0,0.12)" 
                        stroke="rgba(255,255,255,0.2)" 
                        strokeWidth="1.5" 
                      />

                      {/* Hardware Clasp */}
                      <rect 
                        x="146" 
                        y="135" 
                        width="28" 
                        height="22" 
                        rx="4" 
                        fill={builderHardware === 'gold' ? '#f59e0b' : builderHardware === 'brass' ? '#b45309' : '#94a3b8'} 
                        stroke="#000" 
                        strokeWidth="1" 
                      />

                      {/* Monogram Stamp */}
                      {builderInitials && (
                        <text 
                          x="160" 
                          y="185" 
                          textAnchor="middle" 
                          fill={builderHardware === 'gold' ? '#fde68a' : '#fff'} 
                          fontSize="15" 
                          fontWeight="800" 
                          letterSpacing="2"
                        >
                          {builderInitials.toUpperCase()}
                        </text>
                      )}

                      {/* Top Handles */}
                      <path 
                        d="M 90 100 C 90 15, 230 15, 230 100" 
                        fill="none" 
                        stroke={builderColor === 'cognac' ? '#5c2d15' : '#0a0a0a'} 
                        strokeWidth="14" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </div>

                  <div className="bl-builder-summary-pill">
                    <span>Configured: <strong>{builderStyle}</strong> • {builderMaterial} • {builderColor}</span>
                  </div>
                </div>

                {/* Configuration Controls */}
                <div className="bl-builder-controls-panel">
                  <span className="bl-tag-label">CUSTOM DESIGN STUDIO</span>
                  <h3 className="bl-serif-title" style={{ fontSize: '1.6rem', margin: '4px 0 16px 0' }}>
                    Configure Bespoke Bag
                  </h3>

                  {/* Bag Style */}
                  <div className="bl-config-group">
                    <label className="bl-config-label">1. Bag Style</label>
                    <div className="bl-config-pills">
                      {['handbag', 'tote', 'briefcase', 'backpack', 'duffel'].map(s => (
                        <button
                          key={s}
                          className={`bl-config-pill ${builderStyle === s ? 'active' : ''}`}
                          onClick={() => setBuilderStyle(s)}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Material */}
                  <div className="bl-config-group">
                    <label className="bl-config-label">2. Premium Leather</label>
                    <div className="bl-config-pills">
                      {[
                        { id: 'full-grain', name: 'Full Grain' },
                        { id: 'pebble', name: 'Pebble Nappa' },
                        { id: 'saffiano', name: 'Saffiano' },
                        { id: 'suede', name: 'Velvet Suede' }
                      ].map(m => (
                        <button
                          key={m.id}
                          className={`bl-config-pill ${builderMaterial === m.id ? 'active' : ''}`}
                          onClick={() => setBuilderMaterial(m.id)}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div className="bl-config-group">
                    <label className="bl-config-label">3. Leather Shade</label>
                    <div className="bl-config-pills">
                      {[
                        { id: 'cognac', name: 'Cognac Saddle', hex: '#9a4f21' },
                        { id: 'black', name: 'Jet Black', hex: '#1c1917' },
                        { id: 'honey', name: 'Honey Amber', hex: '#d97706' }
                      ].map(c => (
                        <button
                          key={c.id}
                          className={`bl-config-pill ${builderColor === c.id ? 'active' : ''}`}
                          onClick={() => setBuilderColor(c.id)}
                        >
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: c.hex, display: 'inline-block' }} />
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monogram */}
                  <div className="bl-config-group">
                    <label className="bl-config-label">4. Monogramming Initials (Foil Stamped)</label>
                    <input 
                      type="text" 
                      maxLength={4} 
                      value={builderInitials}
                      onChange={(e) => setBuilderInitials(e.target.value.toUpperCase())}
                      className="bl-form-input" 
                      placeholder="e.g. SB"
                      style={{ maxWidth: '120px', fontWeight: 800, letterSpacing: '2px' }}
                    />
                  </div>

                  {/* Special Requests */}
                  <div className="bl-config-group">
                    <label className="bl-config-label">5. Custom Dimensions or Notes (Optional)</label>
                    <textarea 
                      rows={2} 
                      value={builderCustomNotes}
                      onChange={(e) => setBuilderCustomNotes(e.target.value)}
                      placeholder="e.g. Add 15-inch laptop divider, brass key-clasp..."
                      className="bl-notes-textarea" 
                    />
                  </div>

                  <div className="bl-config-price-row">
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--bl-text-secondary)', display: 'block' }}>Estimated Atelier Price</span>
                      <strong style={{ fontSize: '1.4rem', color: 'var(--bl-pink)' }}>₹6,499 - ₹8,999</strong>
                    </div>
                    <button 
                      className="bl-btn-primary"
                      onClick={() => setCustomQuoteSubmitted(true)}
                    >
                      Request Atelier Quote →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(247,37,133,0.15)', color: 'var(--bl-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <Sparkles size={36} />
                </div>
                <h3 className="bl-serif-title" style={{ fontSize: '1.8rem', margin: '0 0 10px 0' }}>
                  Custom Design Inquiry Received!
                </h3>
                <p style={{ maxWidth: '480px', margin: '0 auto 24px auto', color: 'var(--bl-text-secondary)', fontSize: '0.9rem' }}>
                  Your bespoke specifications for a <strong>{builderStyle}</strong> in <strong>{builderMaterial}</strong> ({builderColor}) with monogram <strong>"{builderInitials}"</strong> have been forwarded to master leather artisans. You will receive a 3D blueprint review and formal quote within 4 hours.
                </p>
                <button 
                  className="bl-btn-primary"
                  onClick={() => {
                    setCustomStudioModalOpen(false);
                    setCustomQuoteSubmitted(false);
                  }}
                >
                  Back to Studio
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. COMPLIMENTARY ASSESSMENT PHOTO MODAL */}
      {assessmentModalOpen && (
        <div className="bl-modal-backdrop" onClick={() => setAssessmentModalOpen(false)}>
          <div className="bl-modal-card" style={{ maxWidth: '540px' }} onClick={e => e.stopPropagation()}>
            <button className="bl-modal-close" onClick={() => setAssessmentModalOpen(false)}>
              <X size={20} />
            </button>

            <span className="bl-tag-label">COMPLIMENTARY ASSESSMENT</span>
            <h3 className="bl-serif-title" style={{ fontSize: '1.6rem', margin: '6px 0 12px 0' }}>
              Upload Photos for Diagnostic
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--bl-text-secondary)', margin: '0 0 20px 0' }}>
              Upload 2 to 4 photos of your handbag, luggage or leather piece. Our master restoration craftsmen will evaluate the damage and send a guaranteed price quote.
            </p>

            <div className="bl-photos-drop-grid">
              {[0, 1, 2, 3].map(idx => {
                const photoSrc = wizardPhotos[idx];
                const hasPhoto = Boolean(photoSrc);
                return (
                  <div 
                    key={idx} 
                    className={`bl-photo-slot ${hasPhoto ? 'filled' : ''}`}
                    onClick={() => {
                      if (!hasPhoto) {
                        const inputEl = document.getElementById(`modal-photo-input-${idx}`);
                        if (inputEl) inputEl.click();
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setWizardPhotos(prev => {
                            const next = [...prev];
                            next[idx] = ev.target.result;
                            return next;
                          });
                          showToast(`Photo ${idx + 1} uploaded!`);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  >
                    <input 
                      id={`modal-photo-input-${idx}`}
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={(e) => handlePhotoFileChange(e, idx)}
                    />
                    {hasPhoto ? (
                      <>
                        <img src={photoSrc} alt="Inspection pic" />
                        <div className="bl-photo-tag-pill">
                          {['Front', 'Back', 'Damage', 'Detail'][idx] || `Photo ${idx + 1}`}
                        </div>
                        <div className="bl-photo-overlay">
                          <button 
                            type="button"
                            className="bl-photo-action-btn"
                            title="Replace photo"
                            onClick={(e) => {
                              e.stopPropagation();
                              const inputEl = document.getElementById(`modal-photo-input-${idx}`);
                              if (inputEl) inputEl.click();
                            }}
                          >
                            <RefreshCw size={11} /> Replace
                          </button>
                          <button 
                            type="button"
                            className="bl-photo-action-btn delete"
                            title="Remove photo"
                            onClick={(e) => {
                              e.stopPropagation();
                              setWizardPhotos(prev => {
                                const next = [...prev];
                                next[idx] = null;
                                return next;
                              });
                              showToast(`Photo ${idx + 1} removed`);
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="bl-photo-empty">
                        <Upload size={18} color="var(--bl-pink)" />
                        <span>Upload</span>
                        <span style={{ fontSize: '0.62rem', opacity: 0.6, fontWeight: 500 }}>
                          {['Front', 'Back', 'Damage', 'Detail'][idx]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '20px' }}>
              <label className="bl-form-label">Phone Number for WhatsApp Estimate</label>
              <input type="tel" defaultValue="+91 98450 12345" className="bl-form-input" />
            </div>

            <button 
              className="bl-btn-primary" 
              style={{ width: '100%', marginTop: '20px' }}
              onClick={() => {
                setAssessmentModalOpen(false);
                showToast('Photos submitted! Estimate sent to WhatsApp within 30 mins.');
              }}
            >
              Get Free Repair Estimate →
            </button>
          </div>
        </div>
      )}

      {/* 4. SERVICE DETAILS MODAL */}
      {selectedServiceModal && (
        <div className="bl-modal-backdrop" onClick={() => setSelectedServiceModal(null)}>
          <div className="bl-modal-card" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <button className="bl-modal-close" onClick={() => setSelectedServiceModal(null)}>
              <X size={20} />
            </button>

            <img 
              src={selectedServiceModal.img} 
              alt={selectedServiceModal.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '16px' }} 
            />

            <span className="bl-tag-label">SERVICE SPECIFICATION</span>
            <h3 className="bl-serif-title" style={{ fontSize: '1.5rem', margin: '4px 0 8px 0' }}>
              {selectedServiceModal.title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--bl-text-secondary)', lineHeight: 1.5 }}>
              {selectedServiceModal.desc}
            </p>

            <div className="bl-order-meta-box" style={{ margin: '18px 0' }}>
              <div><strong>Starting Price:</strong> {selectedServiceModal.price}</div>
              <div><strong>Turnaround:</strong> {selectedServiceModal.turnaround}</div>
              <div><strong>Warranty:</strong> 6-Month StitchBee Craft Guarantee</div>
            </div>

            <button 
              className="bl-btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setWizardDamages([selectedServiceModal.title]);
                setSelectedServiceModal(null);
                setWizardStep(2);
                scrollToId('start-restoration-wizard');
                showToast(`Selected "${selectedServiceModal.title}"`);
              }}
            >
              Book This Repair
            </button>
          </div>
        </div>
      )}

      {/* 5. SLIDE-OUT CART DRAWER */}
      {isCartOpen && (
        <div className="bl-modal-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="bl-cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="bl-cart-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={20} color="var(--bl-pink)" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Your Studio Cart</h3>
              </div>
              <button className="bl-drawer-close" onClick={() => setIsCartOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="bl-cart-items-list">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--bl-text-secondary)' }}>
                  <ShoppingBag size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                  <p>Your bag cart is currently empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="bl-cart-item-row">
                    <img src={item.img} alt={item.name} className="bl-cart-thumb" />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 3px 0', fontSize: '0.9rem', fontWeight: 700 }}>{item.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--bl-text-secondary)' }}>Color: {item.color}</span>
                      <div style={{ fontWeight: 800, color: 'var(--bl-pink)', marginTop: '4px' }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        className="bl-qty-btn"
                        onClick={() => {
                          setCart(prev => prev.map(p => p.id === item.id ? { ...p, qty: Math.max(1, p.qty - 1) } : p));
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.qty}</span>
                      <button 
                        className="bl-qty-btn"
                        onClick={() => {
                          setCart(prev => prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
                        }}
                      >
                        +
                      </button>
                      <button 
                        className="bl-remove-btn"
                        onClick={() => {
                          setCart(prev => prev.filter(p => p.id !== item.id));
                          showToast('Item removed from cart');
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="bl-cart-footer">
                <div className="bl-cart-subtotal-row">
                  <span>Subtotal</span>
                  <strong>₹{cart.reduce((sum, item) => sum + item.price * item.qty, 0).toLocaleString('en-IN')}</strong>
                </div>
                <div className="bl-cart-subtotal-row" style={{ fontSize: '0.78rem', color: '#10b981' }}>
                  <span>Doorstep Insured Delivery</span>
                  <strong>FREE</strong>
                </div>

                <button 
                  className="bl-btn-primary" 
                  style={{ width: '100%', marginTop: '16px' }}
                  onClick={() => {
                    showToast('Order confirmed! Tracking details sent to your registered mobile.');
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                >
                  Proceed to Secure Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
