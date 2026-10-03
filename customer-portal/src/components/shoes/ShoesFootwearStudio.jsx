import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, ShoppingCart, ShoppingBag, Sliders, Scissors, 
  ShieldCheck, Gem, Sparkles, ChevronLeft, ChevronRight, 
  ArrowRight, ArrowLeft, X, Upload, Check, Star, MapPin, Eye,
  Package, Ruler, Info, CheckCircle2, RotateCcw, Wrench, Search, ArrowUpDown
} from 'lucide-react';
import './ShoesFootwearStudio.css';
import './ShoesRepairRestore.css';
import { 
  SHOE_CATEGORIES, 
  ALL_SHOE_PRODUCTS, 
  SHOE_MATERIALS, 
  SHOE_REVIEWS,
  getFootwearCart, 
  addFootwearToCart, 
  removeFromCart,
  updateCartQuantity,
  getCartTotals,
  getFootwearWishlist,
  toggleFootwearWishlist, 
  saveCustomFootwearDesign,
  createCustomFootwearRequest,
  getFootwearProductBySlug,
  searchFootwear,
  getProductReviews,
  submitReview 
} from '../../utils/shoesStore';
import { addOrder } from '../../utils/bagsStore';

export default function ShoesFootwearStudio({
  currentUser,
  theme = 'light',
  setTheme,
  initialMode = 'shop', // 'shop' | 'restore'
  onSwitchMode,
  onNavigateHome,
  onNavigateCategory,
  onOpenAuthModal,
  onAddToCart,
  tailors = [],
  onBookStitching,
  searchQuery = '',
  setSearchQuery
}) {
  const isDark = theme === 'dark';

  // Mode state: 'shop' (Shop + Create Custom) or 'restore' (Repair & Restore)
  const [activeMode, setActiveMode] = useState(initialMode || 'shop');

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
  }, [initialMode]);

  // Cart & Wishlist local state synced with localStorage
  const [cart, setCart] = useState(() => getFootwearCart());
  const [wishlist, setWishlist] = useState(() => new Set(getFootwearWishlist()));
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  useEffect(() => {
    const handleStoreUpdate = () => {
      setCart(getFootwearCart());
      setWishlist(new Set(getFootwearWishlist()));
    };
    window.addEventListener('stitchbee-store-update', handleStoreUpdate);
    window.addEventListener('storage', handleStoreUpdate);
    return () => {
      window.removeEventListener('stitchbee-store-update', handleStoreUpdate);
      window.removeEventListener('storage', handleStoreUpdate);
    };
  }, []);

  // Category Filtering
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Debounced search query
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery || '');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery || '');
    }, 280);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Advanced Filtering & Sorting (Requirement 9 View All)
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [genderFilter, setGenderFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [materialFilter, setMaterialFilter] = useState('all');
  const [priceRangeFilter, setPriceRangeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  // Interactive Product List (with custom color selection per card)
  const [productsList, setProductsList] = useState(ALL_SHOE_PRODUCTS);

  const location = useLocation();
  const navigate = useNavigate();

  // Cart Drawer open state (matching Bags)
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Page Navigation state: 'shop' | 'product-detail' | 'custom-design' | 'catalog'
  const [pageView, setPageView] = useState(() => {
    const path = window.location.pathname;
    if (path.includes('/product/')) return 'product-detail';
    if (path === '/footwear/custom-design' || path === '/shoes/custom-design') return 'custom-design';
    if (path === '/footwear/shop' || path === '/shoes/shop' || path === '/footwear/collection') return 'catalog';
    return 'shop';
  });

  const [selectedProduct, setSelectedProduct] = useState(() => {
    const path = window.location.pathname;
    if (path.includes('/product/')) {
      const slug = path.split('/product/')[1]?.replace(/\/$/, '');
      if (slug) {
        return getFootwearProductBySlug(slug) || ALL_SHOE_PRODUCTS[0];
      }
    }
    return ALL_SHOE_PRODUCTS[0];
  });

  const [selectedPdpImage, setSelectedPdpImage] = useState(null);
  const [selectedPdpColor, setSelectedPdpColor] = useState(null);
  const [selectedPdpSize, setSelectedPdpSize] = useState('UK 8');
  const [pdpQuantity, setPdpQuantity] = useState(1);
  const [activePdpTab, setActivePdpTab] = useState('description');

  // Quick-Add Modal (Requirement 7)
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const [quickAddColor, setQuickAddColor] = useState(null);
  const [quickAddSize, setQuickAddSize] = useState('UK 8');
  const [quickAddQty, setQuickAddQty] = useState(1);

  // Material Modal (Requirement 13)
  const [selectedMaterialModal, setSelectedMaterialModal] = useState(null);

  // Reviews Modal (Requirement 16)
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(() => getProductReviews());
  const [newReviewProduct, setNewReviewProduct] = useState('Classic Leather Formal Shoes');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const [hasNoSketch, setHasNoSketch] = useState(false);

  // Material Carousel Ref
  const materialsTrackRef = useRef(null);

  const scrollMaterials = (direction) => {
    if (materialsTrackRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      materialsTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // How It Works interactive step
  const [activeHowStep, setActiveHowStep] = useState(1);
  const howStepTips = {
    1: { title: 'Explore or Envision', text: 'Select a signature silhouette from our ready-to-wear archive or begin sketching your bespoke concept.' },
    2: { title: 'Select Luxury Tannery Specs', text: 'Handpick full-grain Italian calfskin, butter-soft nappa, water-repellent suede, or heavy canvas with custom welt stitching.' },
    3: { title: 'Master Cordwainer Assembly', text: 'Every shoe is lasted on custom ergonomic wooden lasts, Goodyear welted or Blake stitched by master cobblers.' },
    4: { title: 'White-Glove Delivery', text: 'Individually buffed, conditioned, fitted with cedar shoe trees, and shipped to your doorstep in luxury packaging.' }
  };

  // =========================================================================
  // 7-STEP CUSTOM FOOTWEAR CONFIGURATOR STATE
  // =========================================================================
  const [wizardStep, setWizardStep] = useState(1);
  const [footwearType, setFootwearType] = useState('Formal Shoes');
  const [baseSilhouette, setBaseSilhouette] = useState('Oxford Brogue');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [customNotes, setCustomNotes] = useState('');
  const [customMaterial, setCustomMaterial] = useState('full-grain-leather');
  const [mainColor, setMainColor] = useState('Cognac Tan');
  const [secondaryColor, setSecondaryColor] = useState('Matching');
  const [soleColor, setSoleColor] = useState('Natural Leather Tone');
  const [customHexColor, setCustomHexColor] = useState('');
  const [soleType, setSoleType] = useState('Goodyear Welted Leather');
  const [soleThickness, setSoleThickness] = useState('Standard (15mm)');
  const [laceStyle, setLaceStyle] = useState('Round Waxed Cotton');
  const [stitchColor, setStitchColor] = useState('Contrast Hand-Stitched Amber');
  const [hardwareStyle, setHardwareStyle] = useState('Antique Brass Eyelets');
  const [personalizationInitials, setPersonalizationInitials] = useState('SB');
  const [personalizationPlacement, setPersonalizationPlacement] = useState('Insole Deboss');
  const [isCustomMeasurement, setIsCustomMeasurement] = useState(false);
  const [standardSize, setStandardSize] = useState('UK 8');
  const [footwearWidth, setFootwearWidth] = useState('Standard (D)');
  const [footLengthCm, setFootLengthCm] = useState('26.5');
  const [footWidthCm, setFootWidthCm] = useState('9.8');
  const [instepCm, setInstepCm] = useState('24.0');
  const [orthoticNotes, setOrthoticNotes] = useState('');
  const [wizardSuccessData, setWizardSuccessData] = useState(null);

  // Smooth scroll helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Dynamic Section Title Helper (Requirement 2)
  const getCategoryHeading = (catId) => {
    switch (catId) {
      case 'mens':
        return "Premium Men's Shoes, Ready for You";
      case 'womens':
        return "Premium Women's Shoes, Ready for You";
      case 'sneakers':
        return "Premium Sneakers, Ready for You";
      case 'sandals':
        return "Premium Sandals, Ready for You";
      case 'slippers':
        return "Premium Slippers, Ready for You";
      case 'boots':
        return "Premium Boots, Ready for You";
      default:
        return "Premium Footwear, Ready for You";
    }
  };

  // Dynamic Category Label Helper
  const getCategoryLabel = (catId) => {
    switch (catId) {
      case 'mens': return "Men's Footwear";
      case 'womens': return "Women's Footwear";
      case 'sneakers': return "Sneakers";
      case 'sandals': return "Sandals";
      case 'slippers': return "Slippers";
      case 'boots': return "Boots";
      default: return "All Footwear";
    }
  };

  // URL Deep Linking & Popstate Synchronization (Requirement 24)
  useEffect(() => {
    const handleUrlSync = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);

      const catParam = params.get('category');
      if (catParam) {
        setCategoryFilter(catParam);
      }

      const qParam = params.get('q');
      if (qParam && setSearchQuery) {
        setSearchQuery(qParam);
      }

      if (path.includes('/product/')) {
        const slug = path.split('/product/')[1]?.replace(/\/$/, '');
        if (slug) {
          const prod = getFootwearProductBySlug(slug);
          if (prod) {
            setSelectedProduct(prod);
            const initialImg = prod.selectedColor ? prod.colors?.find(c => c.name === prod.selectedColor)?.img || prod.img : prod.img;
            setSelectedPdpImage(initialImg);
            setSelectedPdpColor(prod.selectedColor || (prod.colors && prod.colors[0]?.name) || 'Default');
            setSelectedPdpSize(prod.selectedSize || (prod.sizes && prod.sizes[0]) || 'UK 8');
            setPdpQuantity(1);
            setPageView('product-detail');
          }
        }
      } else if (path === '/footwear/custom-design' || path === '/shoes/custom-design') {
        setPageView('custom-design');
        setWizardStep(1);
      } else if (path === '/footwear/shop' || path === '/shoes/shop' || path === '/footwear/collection') {
        setPageView('catalog');
      } else {
        setPageView('shop');
      }

      if (path === '/footwear/reviews' || path === '/shoes/reviews') {
        setIsReviewsModalOpen(true);
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  // Handler: Open Quick Add Size & Color Drawer/Modal (Requirement 7)
  const handleOpenQuickAdd = (product, e) => {
    if (e) e.stopPropagation();
    setQuickAddProduct(product);
    setQuickAddColor(product.selectedColor || (product.colors && product.colors[0]?.name) || 'Default');
    setQuickAddSize(product.selectedSize || (product.sizes && product.sizes[0]) || 'UK 8');
    setQuickAddQty(1);
  };

  const handleQuickAddConfirm = () => {
    if (!quickAddProduct) return;
    addFootwearToCart(quickAddProduct, quickAddColor, quickAddSize, quickAddQty);
    setCart(getFootwearCart());
    showToast(`Added ${quickAddQty}x "${quickAddProduct.name}" (${quickAddColor}, ${quickAddSize}) to bag! 🛍️`);
    setQuickAddProduct(null);
    setIsCartOpen(true);
  };

  // Handler: Toggle Wishlist with Login Handling (Requirement 8 & 20)
  const handleToggleWishlist = (productId, e) => {
    if (e) e.stopPropagation();
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal('customer', 'login');
      showToast('Please sign in to save items to your wishlist');
      return;
    }
    const updated = toggleFootwearWishlist(productId);
    const isNowWish = updated.includes(productId);
    setWishlist(new Set(updated));
    showToast(isNowWish ? 'Added to your Wishlist!' : 'Removed from Wishlist.');
  };

  // Handler: Direct Add To Cart item from Product Card (matching Bags)
  const handleAddToCartItem = (product, e) => {
    if (e) e.stopPropagation();
    const chosenColor = product.selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    const chosenSize = product.selectedSize || (product.sizes && product.sizes[0]) || 'UK 8';
    addFootwearToCart(product, chosenColor, chosenSize, 1);
    setCart(getFootwearCart());
    showToast(`Added "${product.name}" (${chosenColor}, ${chosenSize}) to cart! 🛍️`);
    setIsCartOpen(true);
  };

  // Handler: Open Dedicated Footwear Catalog Page (Requirement 9)
  const handleOpenCatalog = (cat = 'all') => {
    setCategoryFilter(cat);
    setPageView('catalog');
    const catQuery = cat !== 'all' ? `?category=${cat}` : '';
    navigate(`/footwear/shop${catQuery}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Open Dedicated Product Details Page (Requirement 5)
  const handleOpenPdp = (product) => {
    setSelectedProduct(product);
    const initialImg = product.selectedColor 
      ? product.colors?.find(c => c.name === product.selectedColor)?.img || product.img 
      : product.img;
    setSelectedPdpImage(initialImg);
    setSelectedPdpColor(product.selectedColor || (product.colors && product.colors[0]?.name) || 'Default');
    setSelectedPdpSize(product.selectedSize || (product.sizes && product.sizes[0]) || 'UK 8');
    setPdpQuantity(1);
    setPageView('product-detail');
    navigate(`/footwear/product/${product.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Back to Shop
  const handleBackToShop = () => {
    setPageView('shop');
    navigate('/footwear');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Open Dedicated Custom Design Page (Requirement 10)
  const handleOpenCustomDesign = (preselectedMaterialId) => {
    if (preselectedMaterialId) {
      setCustomMaterial(preselectedMaterialId);
      setWizardStep(3);
    } else {
      setWizardStep(1);
    }
    setWizardSuccessData(null);
    setPageView('custom-design');
    navigate('/footwear/custom-design');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: PDP Add to Cart (Requirement 5 & 19)
  const handlePdpAddToCart = () => {
    if (!selectedProduct) return;
    addFootwearToCart(selectedProduct, selectedPdpColor, selectedPdpSize, pdpQuantity);
    setCart(getFootwearCart());
    showToast(`Added ${pdpQuantity}x "${selectedProduct.name}" (${selectedPdpColor}, ${selectedPdpSize}) to your bag! 🛍️`);
    setIsCartOpen(true);
  };

  // Handler: PDP Buy Now (Requirement 5)
  const handlePdpBuyNow = () => {
    if (!selectedProduct) return;
    addFootwearToCart(selectedProduct, selectedPdpColor, selectedPdpSize, pdpQuantity);
    setCart(getFootwearCart());
    navigate('/cart');
  };

  // Handler: Photo Upload for Custom Configurator (Requirement 10)
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const readPromises = files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = ev => resolve(ev.target.result);
      reader.readAsDataURL(file);
    }));

    Promise.all(readPromises).then(urls => {
      setUploadedPhotos(prev => [...prev, ...urls].slice(0, 6));
      setHasNoSketch(false);
      showToast(`${files.length} design reference${files.length > 1 ? 's' : ''} uploaded!`);
    });
    e.target.value = '';
  };

  const handleRemovePhoto = (idx) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  // Handler: Submit Custom Footwear Request (Requirement 10, 11, 12, 20)
  const handleSubmitCustomQuote = () => {
    const customPayload = {
      customerId: currentUser?.id || currentUser?.email || 'guest',
      footwearType,
      baseSilhouette,
      referenceImages: uploadedPhotos,
      hasNoDesign: hasNoSketch,
      material: SHOE_MATERIALS.find(m => m.id === customMaterial)?.name || customMaterial,
      colors: {
        main: mainColor,
        secondary: secondaryColor,
        sole: soleColor,
        customHex: customHexColor || null
      },
      size: isCustomMeasurement 
        ? `Custom (${footLengthCm}cm L x ${footWidthCm}cm W x ${instepCm}cm H)`
        : `${standardSize} (${footwearWidth})`,
      customization: {
        soleType,
        soleThickness,
        laceStyle,
        stitchColor,
        hardwareStyle,
        initials: personalizationInitials,
        placement: personalizationPlacement
      },
      notes: customNotes + (orthoticNotes ? ` | Orthotics: ${orthoticNotes}` : '') + (hasNoSketch ? ' | (Customer requested artisan design consultation)' : ''),
      status: 'Quote Requested',
      createdAt: new Date().toISOString()
    };

    const saved = createCustomFootwearRequest(customPayload);

    // Persist as custom order in stitchbeez_orders so it displays in My Orders
    try {
      const selectedMatObj = SHOE_MATERIALS.find(m => m.id === customMaterial);
      addOrder({
        id: saved?.id || `FTW-CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        type: 'custom',
        category: 'shoes',
        title: `Bespoke Footwear — ${footwearType}`,
        status: 'Quote Requested',
        statusCode: 'quote_requested',
        statusIndex: 0,
        total: 'Pending Artisan Quote',
        price: 0,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        deliveryDate: 'Artisan Quote within 4h',
        address: currentUser?.address || 'Doorstep Sizing & Delivery',
        artisanAssigned: 'Master Cordwainer Atelier',
        customDetails: {
          bagType: footwearType,
          footwearType,
          baseSilhouette,
          material: selectedMatObj?.name || customMaterial,
          color: `${mainColor} (Sole: ${soleColor})`,
          size: isCustomMeasurement 
            ? `Custom (${footLengthCm}cm L x ${footWidthCm}cm W)`
            : `${standardSize} (${footwearWidth})`,
          initials: personalizationInitials || 'None',
          notes: customNotes + (orthoticNotes ? ` | Orthotics: ${orthoticNotes}` : '')
        },
        items: [
          {
            id: saved?.id || 'ftw-item-1',
            name: `Bespoke ${footwearType} (${baseSilhouette})`,
            price: 0,
            color: mainColor,
            qty: 1,
            quantity: 1,
            img: uploadedPhotos[0] || '/shoes_categories/HeroSection.png',
            image: uploadedPhotos[0] || '/shoes_categories/HeroSection.png'
          }
        ],
        steps: [
          { name: 'Quote Requested', date: 'Today', completed: true, active: true },
          { name: 'Artisan Evaluation', date: 'Within 4h', pending: true },
          { name: 'Quote Approved', date: 'Pending', pending: true },
          { name: 'Handcrafting', date: 'Pending', pending: true },
          { name: 'Quality Check', date: 'Pending', pending: true },
          { name: 'Shipped', date: 'Pending', pending: true },
          { name: 'Delivered', date: 'Pending', pending: true }
        ]
      });
    } catch (err) {
      console.error('Error syncing custom footwear quote with orders:', err);
    }

    setWizardSuccessData(saved);
    showToast('✨ Custom design request submitted! Track it in My Orders 📋');
  };

  // Handler: Submit Verified Product Review (Requirement 16)
  const handleReviewSubmit = () => {
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal('customer', 'login');
      showToast('Please sign in to write a verified review');
      return;
    }
    if (!newReviewComment.trim()) {
      showToast('Please enter your review text');
      return;
    }
    const targetProd = ALL_SHOE_PRODUCTS.find(p => p.name === newReviewProduct);
    const rev = submitReview({
      productId: targetProd?.id || 'shoe-1',
      productName: newReviewProduct,
      name: currentUser.name || currentUser.email.split('@')[0],
      location: currentUser.city || 'Bangalore, India',
      rating: newReviewRating,
      quote: newReviewComment.trim(),
      itemImg: targetProd?.img || '/premium_footwear/ClassicLeatherFormalShoe.png'
    });
    setReviewsList(getProductReviews());
    setNewReviewComment('');
    showToast('✨ Thank you! Your verified review has been published.');
  };

  // Filtered Products with Category, Search, and Advanced Filters (Requirement 2, 9, 18)
  let filteredProducts = productsList;

  if (categoryFilter !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
  }

  if (debouncedSearch.trim()) {
    const q = debouncedSearch.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.material && p.material.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
      (p.colors && p.colors.some(c => c.name.toLowerCase().includes(q)))
    );
  }

  if (genderFilter !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.gender === genderFilter || p.gender === 'Unisex');
  }

  if (sizeFilter !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.sizes && p.sizes.includes(sizeFilter));
  }

  if (materialFilter !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.material && p.material.toLowerCase().includes(materialFilter.toLowerCase()));
  }

  if (priceRangeFilter === 'under-2500') {
    filteredProducts = filteredProducts.filter(p => p.price < 2500);
  } else if (priceRangeFilter === '2500-3500') {
    filteredProducts = filteredProducts.filter(p => p.price >= 2500 && p.price <= 3500);
  } else if (priceRangeFilter === 'above-3500') {
    filteredProducts = filteredProducts.filter(p => p.price > 3500);
  }

  if (availabilityFilter === 'in-stock') {
    filteredProducts = filteredProducts.filter(p => (p.stock || 0) > 0);
  }

  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].reverse();
  } else if (sortBy === 'popular') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
  }

  // Total cart item count
  const cartItemCount = cart.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0);

  // =========================================================================
  // RENDER DEDICATED FULL-PAGE: PRODUCT DETAILS PAGE (PDP)
  // =========================================================================
  const renderProductDetailPage = () => {
    if (!selectedProduct) return null;
    const isWish = wishlist.has(selectedProduct.id);
    const relatedProducts = ALL_SHOE_PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 4);
    const prodReviews = getProductReviews(selectedProduct.id);

    return (
      <div className="sf-pdp-page">
        <div className="sf-container">
          
          {/* Top Breadcrumb & Back Navigation */}
          <div className="sf-page-nav-bar">
            <div className="sf-page-breadcrumbs">
              <button type="button" onClick={handleBackToShop} className="sf-breadcrumb-link">
                Footwear Studio
              </button>
              <span className="sf-breadcrumb-sep">/</span>
              <button 
                type="button" 
                onClick={() => {
                  setCategoryFilter(selectedProduct.category);
                  handleBackToShop();
                }} 
                className="sf-breadcrumb-link"
              >
                {getCategoryLabel(selectedProduct.category)}
              </button>
              <span className="sf-breadcrumb-sep">/</span>
              <span className="sf-breadcrumb-current">{selectedProduct.name}</span>
            </div>

            <button type="button" onClick={handleBackToShop} className="sf-back-nav-btn">
              <ChevronLeft size={16} />
              <span>Back to Footwear Collection</span>
            </button>
          </div>

          {/* Main 2-Column Product Grid */}
          <div className="sf-pdp-main-grid">
            
            {/* Left Column: Gallery & Craft Badges */}
            <div className="sf-pdp-gallery-col">
              <div className="sf-pdp-hero-img-box">
                <span className="sf-pdp-hero-badge">Artisan Handcrafted</span>
                <img 
                  src={selectedPdpImage || selectedProduct.img} 
                  alt={selectedProduct.name} 
                  className="sf-pdp-hero-img" 
                />
              </div>

              {/* Thumbnails */}
              <div className="sf-pdp-thumbs-strip">
                {(selectedProduct.images || [selectedProduct.img]).map((im, idx) => (
                  <div 
                    key={idx}
                    className={`sf-pdp-thumb-card ${(selectedPdpImage || selectedProduct.img) === im ? 'active' : ''}`}
                    onClick={() => setSelectedPdpImage(im)}
                  >
                    <img src={im} alt="" />
                  </div>
                ))}
              </div>

              {/* Craftsmanship Guarantee Box */}
              <div className="sf-pdp-craft-box">
                <span className="sf-pdp-craft-title">Handmade Cordwainer Highlights</span>
                <div className="sf-pdp-craft-item">
                  <span>🔨</span>
                  <div>
                    <strong>Custom Ergonomic Lasts:</strong> Hand-lasted for natural arch contouring and zero heel slipping.
                  </div>
                </div>
                <div className="sf-pdp-craft-item">
                  <span>🧵</span>
                  <div>
                    <strong>Artisan Stitching:</strong> Reinforced Blake stitch & Goodyear welt durability with heavy waxed thread.
                  </div>
                </div>
                <div className="sf-pdp-craft-item">
                  <span>🌬️</span>
                  <div>
                    <strong>Breathable Lambskin Lining:</strong> Anti-microbial natural interior keeps feet dry all day.
                  </div>
                </div>
                <div className="sf-pdp-craft-item">
                  <span>📦</span>
                  <div>
                    <strong>Atelier Inclusions:</strong> Comes with cedar wood shoe trees and protective cotton travel dust bag.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Info, Selectors & Actions */}
            <div className="sf-pdp-info-col">
              <span className="sf-pdp-cat-tag">
                {getCategoryLabel(selectedProduct.category)} • {selectedProduct.gender}
              </span>

              <h1 className="sf-serif-title sf-pdp-title">{selectedProduct.name}</h1>

              {/* Ratings & Reviews */}
              <div className="sf-pdp-rating-strip">
                <div className="sf-pdp-rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className="sf-pdp-rating-val">{selectedProduct.rating}</span>
                <span 
                  className="sf-pdp-reviews-count"
                  onClick={() => scrollToId('sf-pdp-reviews-block')}
                >
                  ({selectedProduct.reviewCount} verified reviews)
                </span>
                <span className="sf-pdp-stock-badge" style={{ marginLeft: 'auto' }}>
                  <CheckCircle2 size={16} />
                  In Stock ({selectedProduct.stock} left)
                </span>
              </div>

              {/* Pricing Box */}
              <div className="sf-pdp-pricing-box">
                <span className="sf-pdp-price-now">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                {selectedProduct.originalPrice && (
                  <span className="sf-pdp-price-orig">₹{selectedProduct.originalPrice.toLocaleString('en-IN')}</span>
                )}
                {selectedProduct.originalPrice && (
                  <span className="sf-pdp-price-save">
                    Save ₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('en-IN')} ({Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% off)
                  </span>
                )}
              </div>

              <p className="sf-pdp-desc-text">
                {selectedProduct.description}
              </p>

              {/* Material Callout */}
              <div className="sf-pdp-material-callout">
                <strong>Leather & Tannery:</strong> {selectedProduct.material}
              </div>

              {/* Color Selection */}
              <div className="sf-pdp-selector-block">
                <div className="sf-pdp-selector-header">
                  <span>Selected Shade: <span style={{ color: 'var(--sf-pink)' }}>{selectedPdpColor}</span></span>
                </div>
                <div className="sf-swatch-row">
                  {selectedProduct.colors.map(col => (
                    <button 
                      key={col.name}
                      type="button"
                      className={`sf-swatch-btn ${selectedPdpColor === col.name ? 'active' : ''}`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                      onClick={() => {
                        setSelectedPdpColor(col.name);
                        if (col.img) setSelectedPdpImage(col.img);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="sf-pdp-selector-block">
                <div className="sf-pdp-selector-header">
                  <span>Select Size (UK / India):</span>
                  <span style={{ color: 'var(--sf-pink)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                    📏 Sizing Guide
                  </span>
                </div>
                <div className="sf-pdp-sizes-grid">
                  {(selectedProduct.sizes || ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']).map(sz => (
                    <button 
                      key={sz}
                      type="button"
                      className={`sf-size-chip ${selectedPdpSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedPdpSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="sf-pdp-qty-row">
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Quantity:</span>
                <div className="sf-qty-selector">
                  <button 
                    type="button" 
                    className="sf-qty-btn"
                    onClick={() => setPdpQuantity(q => Math.max(1, q - 1))}
                  >-</button>
                  <span className="sf-qty-num">{pdpQuantity}</span>
                  <button 
                    type="button" 
                    className="sf-qty-btn"
                    onClick={() => setPdpQuantity(q => Math.min(selectedProduct.stock || 10, q + 1))}
                  >+</button>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--sf-text-secondary)', marginLeft: 'auto' }}>
                  Free Insured Delivery Across India
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="sf-pdp-actions-row">
                <button 
                  type="button" 
                  className="sf-btn-primary sf-pdp-btn-bag"
                  onClick={handlePdpAddToCart}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Bag</span>
                </button>
                <button 
                  type="button" 
                  className="sf-btn-secondary sf-pdp-btn-buy"
                  onClick={handlePdpBuyNow}
                >
                  <span>Buy Now →</span>
                </button>
                <button 
                  type="button"
                  className="sf-pdp-btn-wish"
                  onClick={(e) => handleToggleWishlist(selectedProduct.id, e)}
                  title="Save to Wishlist"
                >
                  <Heart 
                    size={20} 
                    fill={wishlist.has(selectedProduct.id) ? '#f72585' : 'none'} 
                    color={wishlist.has(selectedProduct.id) ? '#f72585' : 'var(--sf-text-primary)'} 
                  />
                </button>
              </div>

              {/* Perks Grid */}
              <div className="sf-pdp-perks-grid">
                <div className="sf-pdp-perk-item">
                  <div className="sf-pdp-perk-icon"><Package size={16} /></div>
                  <span>Free Delivery in 3–5 Business Days</span>
                </div>
                <div className="sf-pdp-perk-item">
                  <div className="sf-pdp-perk-icon"><RotateCcw size={16} /></div>
                  <span>7-Day Hassle-Free Size Exchange</span>
                </div>
                <div className="sf-pdp-perk-item">
                  <div className="sf-pdp-perk-icon"><ShieldCheck size={16} /></div>
                  <span>1-Year Atelier Craftsmanship Warranty</span>
                </div>
                <div className="sf-pdp-perk-item">
                  <div className="sf-pdp-perk-icon"><Gem size={16} /></div>
                  <span>Includes Cedar Trees & Travel Dust Bag</span>
                </div>
              </div>

              {/* Tabs for Deep Information */}
              <div className="sf-pdp-tabs-container">
                <div className="sf-pdp-tab-header">
                  <button 
                    type="button" 
                    className={`sf-pdp-tab-btn ${activePdpTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActivePdpTab('description')}
                  >
                    Description
                  </button>
                  <button 
                    type="button" 
                    className={`sf-pdp-tab-btn ${activePdpTab === 'specifications' ? 'active' : ''}`}
                    onClick={() => setActivePdpTab('specifications')}
                  >
                    Specifications
                  </button>
                  <button 
                    type="button" 
                    className={`sf-pdp-tab-btn ${activePdpTab === 'care' ? 'active' : ''}`}
                    onClick={() => setActivePdpTab('care')}
                  >
                    Artisan Care
                  </button>
                </div>

                <div className="sf-pdp-tab-body">
                  {activePdpTab === 'description' && (
                    <div>
                      <p style={{ margin: '0 0 10px' }}>{selectedProduct.description}</p>
                      {selectedProduct.features && (
                        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {selectedProduct.features.map((feat, idx) => (
                            <li key={idx}>{feat}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {activePdpTab === 'specifications' && (
                    <div className="sf-pdp-spec-table">
                      <div className="sf-pdp-spec-row">
                        <span className="sf-pdp-spec-label">Silhouette</span>
                        <span className="sf-pdp-spec-val">{selectedProduct.name}</span>
                      </div>
                      <div className="sf-pdp-spec-row">
                        <span className="sf-pdp-spec-label">Leather & Material</span>
                        <span className="sf-pdp-spec-val">{selectedProduct.material}</span>
                      </div>
                      <div className="sf-pdp-spec-row">
                        <span className="sf-pdp-spec-label">Sole Construction</span>
                        <span className="sf-pdp-spec-val">{selectedProduct.soleType || 'Goodyear Welted Oak-Bark Leather'}</span>
                      </div>
                      <div className="sf-pdp-spec-row">
                        <span className="sf-pdp-spec-label">Approx. Weight</span>
                        <span className="sf-pdp-spec-val">{selectedProduct.weight || '380g per shoe'}</span>
                      </div>
                      <div className="sf-pdp-spec-row">
                        <span className="sf-pdp-spec-label">Available Sizes</span>
                        <span className="sf-pdp-spec-val">{selectedProduct.sizes?.join(', ')}</span>
                      </div>
                    </div>
                  )}

                  {activePdpTab === 'care' && (
                    <div>
                      <p style={{ margin: '0 0 8px' }}>
                        To ensure longevity and maintain natural leather luster:
                      </p>
                      <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <li>Wipe with a soft horsehair brush to remove everyday dust before conditioning.</li>
                        <li>Apply natural beeswax conditioner every 3-4 weeks to preserve suppleness.</li>
                        <li>Always insert the provided aromatic cedar shoe trees when not in use.</li>
                        <li>Allow natural drying away from direct heat sources if exposed to rain.</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Customer Reviews Section on PDP */}
          <div id="sf-pdp-reviews-block" className="sf-pdp-related-section">
            <div className="sf-section-header-split">
              <div>
                <span className="sf-tag-label">VERIFIED BUYER STORIES</span>
                <h2 className="sf-serif-title sf-section-heading">Reviews for {selectedProduct.name}</h2>
              </div>
              <button 
                type="button"
                className="sf-btn-primary" 
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                onClick={() => setIsReviewsModalOpen(true)}
              >
                Write a Review
              </button>
            </div>

            <div className="sf-reviews-grid-3" style={{ marginTop: '20px' }}>
              {(prodReviews.length > 0 ? prodReviews : SHOE_REVIEWS).slice(0, 3).map(rev => (
                <div key={rev.id} className="sf-review-card">
                  <div className="sf-review-top">
                    <div className="sf-review-stars">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <p className="sf-review-quote">“{rev.quote}”</p>
                  </div>

                  <div className="sf-review-footer">
                    <div className="sf-review-author-wrap">
                      <img src={rev.avatar} alt={rev.name} className="sf-review-avatar" />
                      <div>
                        <span className="sf-review-name">{rev.name}</span>
                        <span className="sf-review-loc">{rev.location}</span>
                      </div>
                    </div>
                    <img src={rev.itemImg || selectedProduct.img} alt="" className="sf-review-item-thumb" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* You May Also Like / Related Footwear Collection */}
          <div className="sf-pdp-related-section">
            <span className="sf-tag-label">COMPLETE YOUR WARDROBE</span>
            <h2 className="sf-serif-title sf-section-heading" style={{ marginBottom: '24px' }}>
              You May Also Like
            </h2>
            <div className="sf-products-grid">
              {relatedProducts.map(product => {
                const prodWish = wishlist.has(product.id);
                return (
                  <div 
                    key={product.id} 
                    className="sf-product-card"
                    onClick={() => handleOpenPdp(product)}
                  >
                    <div className="sf-prod-img-box">
                      <img src={product.img} alt={product.name} />
                      <button 
                        className="sf-prod-wish-btn"
                        onClick={(e) => handleToggleWishlist(product.id, e)}
                        title="Save to Wishlist"
                      >
                        <Heart 
                          size={16} 
                          fill={prodWish ? '#f72585' : 'none'} 
                          color={prodWish ? '#f72585' : '#475569'} 
                          strokeWidth={2}
                        />
                      </button>
                    </div>
                    <div className="sf-prod-info">
                      <h4 className="sf-prod-name">{product.name}</h4>
                      <div className="sf-prod-price-row">
                        <span className="sf-prod-price">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="sf-prod-bottom-row">
                        <div className="sf-prod-swatches">
                          {product.colors.map(col => (
                            <span 
                              key={col.name}
                              className="sf-prod-swatch-dot"
                              style={{ backgroundColor: col.hex }}
                            />
                          ))}
                        </div>
                        <button 
                          className="sf-prod-cart-btn"
                          onClick={(e) => handleAddToCartItem(product, e)}
                          title="Add to Bag"
                        >
                          <ShoppingCart size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  };

  // =========================================================================
  // RENDER DEDICATED FULL-PAGE: FOOTWEAR CATALOG / VIEW ALL PAGE
  // =========================================================================
  const catalogProducts = useMemo(() => {
    return ALL_SHOE_PRODUCTS.filter(product => {
      // Category filter
      if (categoryFilter !== 'all' && product.category !== categoryFilter) {
        return false;
      }
      // Search query
      if (debouncedSearch && debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesMat = product.material.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTags = product.tags && product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesMat && !matchesDesc && !matchesTags) return false;
      }
      // Price range
      if (priceRangeFilter === 'under-2500' && product.price >= 2500) return false;
      if (priceRangeFilter === '2500-3500' && (product.price < 2500 || product.price > 3500)) return false;
      if (priceRangeFilter === 'above-3500' && product.price <= 3500) return false;
      // Material
      if (materialFilter !== 'all') {
        if (!product.material.toLowerCase().includes(materialFilter.toLowerCase())) return false;
      }
      // Gender
      if (genderFilter !== 'all') {
        if (product.gender !== genderFilter && product.gender !== 'Unisex') return false;
      }
      // Size
      if (sizeFilter !== 'all') {
        if (!product.sizes || !product.sizes.includes(sizeFilter)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return b.reviewCount - a.reviewCount; // popular / recommended
    });
  }, [categoryFilter, debouncedSearch, priceRangeFilter, materialFilter, genderFilter, sizeFilter, sortBy]);

  const clearAllCatalogFilters = () => {
    setCategoryFilter('all');
    if (setSearchQuery) setSearchQuery('');
    setPriceRangeFilter('all');
    setMaterialFilter('all');
    setGenderFilter('all');
    setSizeFilter('all');
    setSortBy('recommended');
    navigate('/footwear/shop');
  };

  const hasActiveCatalogFilters = categoryFilter !== 'all' || debouncedSearch !== '' || priceRangeFilter !== 'all' || materialFilter !== 'all' || genderFilter !== 'all' || sizeFilter !== 'all';

  const renderCatalogPage = () => {
    return (
      <div className="sf-shop-catalog-page">
        <div className="sf-container" style={{ padding: '0 16px 60px' }}>
          
          {/* Breadcrumbs */}
          <div className="sf-page-nav-bar" style={{ marginBottom: '20px' }}>
            <div className="sf-page-breadcrumbs">
              <button type="button" onClick={onNavigateHome || (() => navigate('/'))} className="sf-breadcrumb-link">
                Home
              </button>
              <span className="sf-breadcrumb-sep">/</span>
              <button type="button" onClick={handleBackToShop} className="sf-breadcrumb-link">
                Shoes & Slippers
              </button>
              <span className="sf-breadcrumb-sep">/</span>
              <span className="sf-breadcrumb-current">Footwear Collection</span>
            </div>

            <button 
              type="button" 
              className="sf-back-nav-btn"
              onClick={handleBackToShop}
            >
              <ArrowLeft size={16} /> Back to Shoes Studio
            </button>
          </div>

          {/* Catalog Header Wrap */}
          <div className="sf-catalog-header-wrap">
            <div>
              <span className="sf-tag-label">READY-MADE ARTISAN PIECES</span>
              <h1 className="sf-serif-title" style={{ fontSize: '2.4rem', margin: '4px 0 8px' }}>
                Handcrafted Footwear Collection
              </h1>
              <p style={{ color: 'var(--sf-text-secondary)', maxWidth: '680px', margin: 0, fontSize: '0.96rem', lineHeight: 1.5 }}>
                Discover genuine Tuscan calfskin, Goodyear-welted formal shoes, sneakers, sandals, and slippers tailored by master cordwainers. Built for enduring distinction and comfort.
              </p>
            </div>

            <button 
              className="sf-btn-primary" 
              onClick={() => handleOpenCustomDesign()}
              style={{ alignSelf: 'flex-start' }}
            >
              <Sparkles size={16} /> Create Custom Design
            </button>
          </div>

          {/* Category Pills Bar */}
          <div className="sf-shop-category-pills">
            {[
              { id: 'all', label: 'All Footwear' },
              { id: 'mens', label: "Men's Shoes" },
              { id: 'womens', label: "Women's Shoes" },
              { id: 'sneakers', label: 'Sneakers' },
              { id: 'sandals', label: 'Sandals' },
              { id: 'slippers', label: 'Slippers' },
              { id: 'boots', label: 'Boots' }
            ].map(cat => (
              <button
                key={cat.id}
                className={`sf-shop-cat-pill ${categoryFilter === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setCategoryFilter(cat.id);
                  const catQuery = cat.id === 'all' ? '' : `?category=${cat.id}`;
                  navigate(`/footwear/shop${catQuery}`);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filter & Sort Controls Bar */}
          <div className="sf-catalog-filter-bar">
            <div className="sf-filter-left-col">
              {/* Search Input */}
              <div className="sf-filter-search-box">
                <Search size={15} style={{ color: 'var(--sf-text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Search shoes, leather, color..."
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  className="sf-filter-search-input"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery && setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sf-text-secondary)', fontSize: '1.1rem', lineHeight: 1 }}>×</button>
                )}
              </div>

              {/* Price Filter */}
              <select 
                value={priceRangeFilter} 
                onChange={(e) => setPriceRangeFilter(e.target.value)}
                className="sf-filter-select"
              >
                <option value="all">Price: All</option>
                <option value="under-2500">Under ₹2,500</option>
                <option value="2500-3500">₹2,500 – ₹3,500</option>
                <option value="above-3500">Above ₹3,500</option>
              </select>

              {/* Material Filter */}
              <select 
                value={materialFilter} 
                onChange={(e) => setMaterialFilter(e.target.value)}
                className="sf-filter-select"
              >
                <option value="all">All Materials</option>
                <option value="Calfskin">Italian Calfskin</option>
                <option value="Suede">Brushed Suede</option>
                <option value="Nappa">Nappa Leather</option>
                <option value="Canvas">Canvas Fabric</option>
                <option value="Mesh">Breathable Mesh</option>
                <option value="Vegan">Vegan Leather</option>
              </select>

              {/* Gender Filter */}
              <select 
                value={genderFilter} 
                onChange={(e) => setGenderFilter(e.target.value)}
                className="sf-filter-select"
              >
                <option value="all">All Genders</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div className="sf-filter-right-col">
              <span className="sf-filter-count">
                Showing <strong>{catalogProducts.length}</strong> {catalogProducts.length === 1 ? 'pair' : 'pairs'}
              </span>

              <div className="sf-sort-wrap">
                <ArrowUpDown size={14} style={{ color: 'var(--sf-pink)' }} />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sf-sort-select"
                >
                  <option value="recommended">Recommended</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>

              {hasActiveCatalogFilters && (
                <button onClick={clearAllCatalogFilters} className="sf-filter-clear-btn" title="Reset all filters">
                  <RotateCcw size={13} /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {catalogProducts.length > 0 ? (
            <div className="sf-shop-products-grid">
              {catalogProducts.map(product => {
                const isWish = wishlist.has(product.id);
                return (
                  <div 
                    key={product.id} 
                    className="sf-product-card"
                    onClick={() => handleOpenPdp(product)}
                  >
                    <div className="sf-prod-img-box">
                      <img src={product.img} alt={product.name} loading="lazy" />
                      
                      {product.stock <= 10 && (
                        <span className="sf-stock-pill-low" style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '10px',
                          background: 'rgba(239, 68, 68, 0.9)',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          textTransform: 'uppercase'
                        }}>
                          Only {product.stock} left
                        </span>
                      )}

                      <button 
                        className="sf-prod-wish-btn"
                        onClick={(e) => handleToggleWishlist(product.id, e)}
                        title="Save to Wishlist"
                      >
                        <Heart 
                          size={16} 
                          fill={isWish ? '#f72585' : 'none'} 
                          color={isWish ? '#f72585' : '#475569'} 
                          strokeWidth={2}
                        />
                      </button>
                    </div>

                    <div className="sf-prod-info">
                      <div className="sf-prod-meta-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span className="sf-prod-cat-tag" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--sf-pink)', textTransform: 'uppercase' }}>
                          {product.category}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', fontWeight: 700 }}>
                          <Star size={12} fill="#f59e0b" color="#f59e0b" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <h4 className="sf-prod-name">{product.name}</h4>
                      <p className="sf-prod-mat-brief" style={{ fontSize: '0.78rem', color: 'var(--sf-text-secondary)', margin: '0 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {product.material}
                      </p>

                      <div className="sf-prod-price-row">
                        <div className="sf-prod-price">₹{product.price.toLocaleString('en-IN')}</div>
                        {product.originalPrice && (
                          <div className="sf-prod-price-orig">₹{product.originalPrice.toLocaleString('en-IN')}</div>
                        )}
                      </div>

                      <div className="sf-prod-bottom-row">
                        {/* Color swatches */}
                        <div className="sf-prod-swatches">
                          {product.colors.map(col => (
                            <span 
                              key={col.name} 
                              className={`sf-prod-swatch-dot ${product.selectedColor === col.name ? 'active' : ''}`}
                              style={{ backgroundColor: col.hex }}
                              title={col.name}
                              onClick={(e) => {
                                e.stopPropagation();
                                setProductsList(prev => prev.map(p => p.id === product.id ? { ...p, selectedColor: col.name, img: col.img || p.img } : p));
                              }}
                            />
                          ))}
                        </div>

                        {/* Add to Cart button matching Bags */}
                        <button 
                          className="sf-prod-cart-btn"
                          onClick={(e) => handleAddToCartItem(product, e)}
                          title="Add to Cart"
                        >
                          <ShoppingCart size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="sf-empty-state-card">
              <div className="sf-empty-icon-circle">
                <Search size={28} />
              </div>
              <h3 className="sf-serif-title" style={{ fontSize: '1.4rem', margin: '8px 0' }}>
                No matching footwear found
              </h3>
              <p style={{ color: 'var(--sf-text-secondary)', maxWidth: '400px', margin: '0 auto 20px' }}>
                We couldn't find any footwear matching your selected filters. Try broadening your criteria or reset the search.
              </p>
              <button onClick={clearAllCatalogFilters} className="sf-btn-primary">
                <RotateCcw size={15} /> Reset All Filters
              </button>
            </div>
          )}

        </div>
      </div>
    );
  };

  // =========================================================================
  // RENDER DEDICATED FULL-PAGE: CUSTOM DESIGN STUDIO PAGE
  // =========================================================================
  const renderCustomDesignPage = () => {
    return (
      <div className="sf-custom-design-page">
        <div className="sf-container">
          
          {/* Top Breadcrumb & Back Navigation */}
          <div className="sf-page-nav-bar">
            <div className="sf-page-breadcrumbs">
              <button type="button" onClick={handleBackToShop} className="sf-breadcrumb-link">
                Footwear Studio
              </button>
              <span className="sf-breadcrumb-sep">/</span>
              <span className="sf-breadcrumb-link">Bespoke Atelier</span>
              <span className="sf-breadcrumb-sep">/</span>
              <span className="sf-breadcrumb-current">Design Your Dream Footwear</span>
            </div>

            <button type="button" onClick={handleBackToShop} className="sf-back-nav-btn">
              <ChevronLeft size={16} />
              <span>Back to Footwear Shop</span>
            </button>
          </div>

          {/* Header Atelier Banner */}
          <div className="sf-custom-page-header">
            <span className="sf-tag-label">BESPOKE CORDWAINER ATELIER</span>
            <h1 className="sf-custom-page-title">Design Your Dream Footwear</h1>
            <p className="sf-custom-page-sub">
              Every foot is unique, and every stride deserves perfection. Work with our master cobblers to craft a pair tailored to your precise aesthetic, luxury leather, sole build, and anatomical measurements.
            </p>

            <div className="sf-custom-page-badges-row">
              <div className="sf-custom-page-badge">
                <Upload size={14} color="#f72585" />
                <span>Upload Sketch or Choose Iconic Last</span>
              </div>
              <div className="sf-custom-page-badge">
                <Scissors size={14} color="#f72585" />
                <span>Full-Grain Italian Leathers & Suedes</span>
              </div>
              <div className="sf-custom-page-badge">
                <Ruler size={14} color="#f72585" />
                <span>Millimeter Precision Custom Sizing</span>
              </div>
              <div className="sf-custom-page-badge">
                <Sparkles size={14} color="#f72585" />
                <span>3D Digital Visualization & Quote in 4h</span>
              </div>
            </div>
          </div>

          {/* Custom Workspace Card */}
          <div className="sf-custom-workspace-card">
            
            {/* Success State */}
            {wizardSuccessData ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <CheckCircle2 size={40} />
                </div>
                <span className="sf-tag-label">QUOTE REQUEST DISPATCHED</span>
                <h2 className="sf-serif-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                  Your Bespoke Footwear is in Motion
                </h2>
                <p style={{ color: 'var(--sf-text-secondary)', fontSize: '0.98rem', maxWidth: '520px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                  Reference ID: <strong style={{ color: 'var(--sf-pink)' }}>{wizardSuccessData.id}</strong><br />
                  Our master cordwainers will review your technical sketch and specifications, prepare a 3D digital visualization, and send you an artisan quote within 4 hours.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
                  <button 
                    className="sf-btn-primary"
                    onClick={() => navigate('/orders')}
                  >
                    Track in My Orders →
                  </button>
                  <button 
                    className="sf-btn-secondary"
                    onClick={handleBackToShop}
                  >
                    Continue Browsing Footwear
                  </button>
                  <button 
                    className="sf-btn-secondary"
                    onClick={() => {
                      setWizardSuccessData(null);
                      setWizardStep(1);
                    }}
                  >
                    Design Another Pair
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* 7-Step Stepper */}
                <div className="sf-custom-page-stepper">
                  {[
                    { num: 1, label: 'Silhouette' },
                    { num: 2, label: 'Inspiration' },
                    { num: 3, label: 'Leather' },
                    { num: 4, label: 'Colorway' },
                    { num: 5, label: 'Sole & Welt' },
                    { num: 6, label: 'Sizing' },
                    { num: 7, label: 'Review' }
                  ].map(s => (
                    <div 
                      key={s.num} 
                      className={`sf-custom-page-step-item ${wizardStep === s.num ? 'active' : ''} ${wizardStep > s.num ? 'completed' : ''}`}
                      onClick={() => setWizardStep(s.num)}
                    >
                      <div className="sf-custom-step-number-box">
                        {wizardStep > s.num ? <Check size={16} /> : s.num}
                      </div>
                      <div className="sf-custom-step-text-meta">
                        <span className="sf-custom-step-idx">Step {s.num}</span>
                        <span className="sf-custom-step-name-str">{s.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="sf-wizard-content-box">
                  
                  {/* STEP 1: FOOTWEAR TYPE */}
                  {wizardStep === 1 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 1 — What would you like us to create?</h3>
                      <p className="sf-wizard-step-sub">Select the core footwear category for your bespoke pair.</p>

                      <div className="sf-types-grid">
                        {[
                          { name: "Men's Shoes", icon: '👞', desc: 'Oxfords, Derbies, Monkstraps, Loafers' },
                          { name: "Women's Shoes", icon: '👠', desc: 'Heels, Pumps, Flats, Wedges' },
                          { name: 'Sneakers', icon: '👟', desc: 'Low-Tops, High-Tops, Minimalist, Trainers' },
                          { name: 'Sandals', icon: '👡', desc: 'Gladiators, Fisherman, Cross-strap, Slides' },
                          { name: 'Slippers', icon: '🥿', desc: 'Mules, Shearling House, Slip-ons' },
                          { name: 'Boots', icon: '🥾', desc: 'Chelsea, Chukka, Combat, Ankle Boots' },
                          { name: 'Other', icon: '✨', desc: 'Custom Hybrid / Artistic Creation' }
                        ].map(t => (
                          <div 
                            key={t.name}
                            className={`sf-type-card ${footwearType === t.name ? 'active' : ''}`}
                            onClick={() => setFootwearType(t.name)}
                          >
                            <span className="sf-type-icon">{t.icon}</span>
                            <span className="sf-type-name">{t.name}</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--sf-text-secondary)' }}>{t.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DESIGN & INSPIRATION */}
                  {wizardStep === 2 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 2 — Base Silhouette & Reference Upload</h3>
                      <p className="sf-wizard-step-sub">Upload your sketches, moodboards, or choose an existing base silhouette.</p>

                      <div style={{ marginBottom: '18px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                          Select Preferred Silhouette Profile:
                        </label>
                        <select 
                          value={baseSilhouette}
                          onChange={e => setBaseSilhouette(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--sf-border)',
                            background: 'var(--sf-warm-card)',
                            color: 'var(--sf-text-primary)',
                            fontSize: '0.9rem',
                            fontWeight: 600
                          }}
                        >
                          <option value="Oxford Brogue">Oxford Brogue (Traditional Wingtip Medallion)</option>
                          <option value="Wholecut Dress Oxford">Wholecut Dress Oxford (Single Seamless Leather Cut)</option>
                          <option value="Italian Penny Loafer">Italian Penny Loafer (Sprezzatura Beefroll Apron)</option>
                          <option value="Minimalist Cupsole Sneaker">Minimalist Cupsole Sneaker (Clean Architectural lines)</option>
                          <option value="Athletic Trainer Sneaker">Athletic Trainer Sneaker (Multi-panel dynamic knit)</option>
                          <option value="Multi-Strap Leather Sandal">Multi-Strap Leather Sandal (Anatomic contoured footbed)</option>
                          <option value="Shearling Lounge Mule">Shearling Lounge Mule (Slip-on luxury slipper)</option>
                          <option value="Pointed-Toe High Stiletto">Pointed-Toe High Stiletto (3.5-inch balanced balance)</option>
                          <option value="Storm-Welted Chelsea Boot">Storm-Welted Chelsea Boot (Dual elastic gusset)</option>
                          <option value="Fully Bespoke Sketch">Fully Bespoke from My Uploaded Sketch</option>
                        </select>
                      </div>

                      {/* Upload Dropzone */}
                      <label 
                        className="sf-upload-dropzone"
                        htmlFor="sf-file-upload-input"
                      >
                        <Upload size={32} color="#f72585" style={{ margin: '0 auto 10px', display: 'block' }} />
                        <strong style={{ fontSize: '1rem', display: 'block', color: 'var(--sf-text-primary)', marginBottom: '4px' }}>
                          Click to upload inspiration photos, drawings, or sketches
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--sf-text-secondary)' }}>
                          JPG, JPEG, PNG, WEBP, or PDF up to 10MB (Multiple uploads supported)
                        </span>
                        <input 
                          id="sf-file-upload-input"
                          type="file" 
                          multiple 
                          accept=".jpg,.jpeg,.png,.webp,.pdf,image/*,application/pdf"
                          onChange={handlePhotoUpload}
                          style={{ display: 'none' }}
                        />
                      </label>

                      {/* "I don't have a design" Option */}
                      <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0 20px' }}>
                        <button 
                          type="button"
                          className={`sf-size-chip ${hasNoSketch ? 'active' : ''}`}
                          onClick={() => {
                            setHasNoSketch(prev => !prev);
                            if (!hasNoSketch) {
                              setUploadedPhotos([]);
                              showToast("✓ 'I don't have a design' selected. You can proceed with style notes!");
                            }
                          }}
                        >
                          {hasNoSketch ? "✓ Proceeding without reference sketch" : "I don't have a design"}
                        </button>
                      </div>

                      {/* Uploaded Previews */}
                      {uploadedPhotos.length > 0 && (
                        <div className="sf-uploaded-previews">
                          {uploadedPhotos.map((url, i) => (
                            <div key={i} className="sf-upload-thumb">
                              <img src={url} alt={`Upload ${i + 1}`} />
                              <button 
                                type="button" 
                                className="sf-remove-thumb"
                                onClick={() => handleRemovePhoto(i)}
                              >✕</button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div style={{ marginTop: '16px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                          Design Notes & Inspiration Instructions:
                        </label>
                        <textarea 
                          rows={3}
                          value={customNotes}
                          onChange={e => setCustomNotes(e.target.value)}
                          placeholder="Describe specific details, toe profile, arch curvature, or unique aesthetic details you envision..."
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1.5px solid var(--sf-border)',
                            background: 'var(--sf-warm-card)',
                            color: 'var(--sf-text-primary)',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: MATERIAL SELECTION */}
                  {wizardStep === 3 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 3 — Luxury Tannery Materials</h3>
                      <p className="sf-wizard-step-sub">Select the primary leather or textile sourced from certified tanneries.</p>

                      <div className="sf-wiz-materials-grid">
                        {SHOE_MATERIALS.map(mat => (
                          <div 
                            key={mat.id}
                            className={`sf-wiz-mat-card ${customMaterial === mat.id ? 'active' : ''}`}
                            onClick={() => setCustomMaterial(mat.id)}
                          >
                            <img src={mat.img} alt={mat.name} className="sf-wiz-mat-thumb" />
                            <div className="sf-wiz-mat-info">
                              <span className="sf-wiz-mat-tag">{mat.tag}</span>
                              <strong className="sf-wiz-mat-name">{mat.name}</strong>
                              <p className="sf-wiz-mat-desc">{mat.desc}</p>
                              <div style={{ fontSize: '0.72rem', color: 'var(--sf-pink)', fontWeight: 700, marginTop: '6px' }}>
                                Durability: {mat.durability}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: COLORWAYS */}
                  {wizardStep === 4 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 4 — Curate Your Color Palette</h3>
                      <p className="sf-wizard-step-sub">Choose primary leather tone, accent piping, and outsole finish.</p>

                      {/* Main Leather Color */}
                      <div className="sf-color-group">
                        <label className="sf-color-group-label">
                          Primary Upper Leather: <span style={{ color: 'var(--sf-pink)' }}>{mainColor}</span>
                        </label>
                        <div className="sf-swatch-row">
                          {[
                            { name: 'Cognac Tan', hex: '#8c4a24' },
                            { name: 'Espresso Brown', hex: '#3d2314' },
                            { name: 'Obsidian Black', hex: '#111111' },
                            { name: 'Crisp White', hex: '#f8fafc' },
                            { name: 'Navy Blue', hex: '#1e293b' },
                            { name: 'Burgundy Crimson', hex: '#631d2f' },
                            { name: 'Olive Green', hex: '#444d28' },
                            { name: 'Warm Cream', hex: '#e8ded2' }
                          ].map(c => (
                            <button 
                              key={c.name}
                              type="button"
                              className={`sf-swatch-btn ${mainColor === c.name ? 'active' : ''}`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                              onClick={() => setMainColor(c.name)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Secondary Color */}
                      <div className="sf-color-group">
                        <label className="sf-color-group-label">
                          Secondary / Accent Trim: <span style={{ color: 'var(--sf-pink)' }}>{secondaryColor}</span>
                        </label>
                        <div className="sf-swatch-row">
                          {['Matching', 'Off-White', 'StitchBeez Pink (#f72585)', 'Dark Tan', 'Burnished Gold'].map(acc => (
                            <button 
                              key={acc}
                              type="button"
                              className={`sf-size-chip ${secondaryColor === acc ? 'active' : ''}`}
                              onClick={() => setSecondaryColor(acc)}
                            >
                              {acc}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sole Color */}
                      <div className="sf-color-group">
                        <label className="sf-color-group-label">
                          Outsole Color: <span style={{ color: 'var(--sf-pink)' }}>{soleColor}</span>
                        </label>
                        <div className="sf-swatch-row">
                          {['Natural Leather Tone', 'Solid White', 'Classic Black', 'Gum Caramel'].map(sc => (
                            <button 
                              key={sc}
                              type="button"
                              className={`sf-size-chip ${soleColor === sc ? 'active' : ''}`}
                              onClick={() => setSoleColor(sc)}
                            >
                              {sc}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Hex */}
                      <div style={{ marginTop: '12px' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sf-text-secondary)' }}>
                          Need a specific pantone / custom dye shade?
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g. #9B2C2C or 'Vintage Oxblood Patina'"
                          value={customHexColor}
                          onChange={e => setCustomHexColor(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            marginTop: '4px',
                            borderRadius: '8px',
                            border: '1px solid var(--sf-border)',
                            background: 'var(--sf-warm-card)',
                            color: 'var(--sf-text-primary)',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 5: SOLE & HARDWARE */}
                  {wizardStep === 5 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 5 — Sole, Stitching & Detailing</h3>
                      <p className="sf-wizard-step-sub">Select the foundation build, welt construction, and hardware accents.</p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Sole Type:</label>
                          <select 
                            value={soleType} 
                            onChange={e => setSoleType(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)', color: 'var(--sf-text-primary)' }}
                          >
                            <option value="Goodyear Welted Leather">Goodyear Welted Oak-Bark Leather</option>
                            <option value="Vibram Commando Lug Rubber">Vibram Commando Lug Rubber</option>
                            <option value="Dainite Studded Sole">Dainite Studded Rubber Tap</option>
                            <option value="Natural Crepe Sole">Natural Soft Crepe Rubber</option>
                            <option value="Lightweight EVA Midsole">Lightweight Dual-Density EVA Midsole</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Sole Thickness:</label>
                          <select 
                            value={soleThickness} 
                            onChange={e => setSoleThickness(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)', color: 'var(--sf-text-primary)' }}
                          >
                            <option value="Standard (15mm)">Standard (15mm profile)</option>
                            <option value="Chunky Bold (25mm)">Chunky Bold Platform (25mm)</option>
                            <option value="Sleek Ultra-Light (10mm)">Sleek Ultra-Light (10mm)</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Lace / Fastener Style:</label>
                          <select 
                            value={laceStyle} 
                            onChange={e => setLaceStyle(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)', color: 'var(--sf-text-primary)' }}
                          >
                            <option value="Round Waxed Cotton">Round Waxed Cotton Laces</option>
                            <option value="Flat Italian Cotton">Flat Premium Italian Cotton</option>
                            <option value="Rawhide Leather Cords">Rawhide Leather Cords</option>
                            <option value="Slip-on / Laceless Elastic">Slip-on / Laceless Hidden Elastic</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Stitch Colour:</label>
                          <select 
                            value={stitchColor} 
                            onChange={e => setStitchColor(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)', color: 'var(--sf-text-primary)' }}
                          >
                            <option value="Contrast Hand-Stitched Amber">Contrast Hand-Stitched Amber</option>
                            <option value="Tone-on-Tone Matching">Tone-on-Tone Upper Matching</option>
                            <option value="Crisp White Welt">Crisp White Welt Stitch</option>
                            <option value="StitchBeez Signature Pink">StitchBeez Signature Pink</option>
                          </select>
                        </div>
                      </div>

                      {/* Personalization */}
                      <div style={{ background: 'rgba(247, 37, 133, 0.04)', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--sf-pink-border)' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--sf-text-primary)', display: 'block', marginBottom: '8px' }}>
                          Personalization Monogramming:
                        </span>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px' }}>
                          <input 
                            type="text" 
                            maxLength={4}
                            value={personalizationInitials}
                            onChange={e => setPersonalizationInitials(e.target.value.toUpperCase())}
                            placeholder="Initials (e.g. SB)"
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--sf-border)', fontWeight: 700, textAlign: 'center' }}
                          />
                          <select 
                            value={personalizationPlacement}
                            onChange={e => setPersonalizationPlacement(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                          >
                            <option value="Insole Gold Foil Deboss">Insole Gold Foil Deboss</option>
                            <option value="Heel Counter Blind Stamp">Heel Counter Blind Stamp</option>
                            <option value="Leather Tongue Badge">Leather Tongue Badge</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: SIZE & MEASUREMENTS */}
                  {wizardStep === 6 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 6 — Sizing & Precision Measurements</h3>
                      <p className="sf-wizard-step-sub">Select standard UK/India shoe size or provide custom anatomical measurements.</p>

                      {/* Toggle */}
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <button 
                          type="button" 
                          className={`sf-size-chip ${!isCustomMeasurement ? 'active' : ''}`}
                          onClick={() => setIsCustomMeasurement(false)}
                        >
                          Standard UK/India Sizing
                        </button>
                        <button 
                          type="button" 
                          className={`sf-size-chip ${isCustomMeasurement ? 'active' : ''}`}
                          onClick={() => setIsCustomMeasurement(true)}
                        >
                          📏 I need custom measurements
                        </button>
                      </div>

                      {!isCustomMeasurement ? (
                        <div>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                            Choose Standard UK/India Size:
                          </label>
                          <div className="sf-pdp-sizes-grid">
                            {['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12', 'UK 13'].map(sz => (
                              <button 
                                key={sz}
                                type="button"
                                className={`sf-size-chip ${standardSize === sz ? 'active' : ''}`}
                                onClick={() => setStandardSize(sz)}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>

                          <div style={{ marginTop: '18px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                              Footwear Width Fitting:
                            </label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              {['Standard (D/E)', 'Wide (EE)', 'Extra Wide (EEE)'].map(w => (
                                <button 
                                  key={w}
                                  type="button"
                                  className={`sf-size-chip ${footwearWidth === w ? 'active' : ''}`}
                                  onClick={() => setFootwearWidth(w)}
                                >
                                  {w}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ background: 'rgba(247, 37, 133, 0.03)', padding: '18px', borderRadius: '14px', border: '1px solid var(--sf-pink-border)' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sf-pink)', display: 'block', marginBottom: '12px' }}>
                            📐 Guided Custom Foot Measurements
                          </span>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '14px' }}>
                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Foot Length (cm):</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={footLengthCm}
                                onChange={e => setFootLengthCm(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                              />
                            </div>
                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Ball Girth/Width (cm):</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={footWidthCm}
                                onChange={e => setFootWidthCm(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                              />
                            </div>
                            <div>
                              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Instep Height (cm):</label>
                              <input 
                                type="number" 
                                step="0.1" 
                                value={instepCm}
                                onChange={e => setInstepCm(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Orthotic or Arch Considerations:</label>
                            <input 
                              type="text" 
                              placeholder="e.g. High arch support required, flat foot padding, bunion ease..."
                              value={orthoticNotes}
                              onChange={e => setOrthoticNotes(e.target.value)}
                              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--sf-border)' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 7: REVIEW & QUOTE */}
                  {wizardStep === 7 && (
                    <div>
                      <h3 className="sf-serif-title sf-wizard-step-title">Step 7 — Review Bespoke Specifications</h3>
                      <p className="sf-wizard-step-sub">Confirm your customized parameters before artisan evaluation.</p>

                      <div className="sf-review-summary-grid">
                        <div className="sf-review-item">
                          <span className="sf-review-label">Footwear Category</span>
                          <span className="sf-review-val">{footwearType}</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Base Style</span>
                          <span className="sf-review-val">{baseSilhouette}</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Selected Material</span>
                          <span className="sf-review-val">
                            {SHOE_MATERIALS.find(m => m.id === customMaterial)?.name || customMaterial}
                          </span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Colors</span>
                          <span className="sf-review-val">{mainColor} / Sole: {soleColor}</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Sole Construction</span>
                          <span className="sf-review-val">{soleType}</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Sizing Fit</span>
                          <span className="sf-review-val">
                            {isCustomMeasurement ? `Custom (${footLengthCm}cm x ${footWidthCm}cm)` : `${standardSize} (${footwearWidth})`}
                          </span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Personalization</span>
                          <span className="sf-review-val">“{personalizationInitials}” ({personalizationPlacement})</span>
                        </div>
                        <div className="sf-review-item">
                          <span className="sf-review-label">Uploaded References</span>
                          <span className="sf-review-val">{uploadedPhotos.length} files attached</span>
                        </div>
                      </div>

                      {/* Required Disclaimer */}
                      <div className="sf-wizard-disclaimer">
                        <Info size={20} style={{ flexShrink: 0 }} />
                        <span>
                          Final pricing will be confirmed after your design is reviewed by a StitchBeez specialist.
                        </span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Wizard Navigation Buttons */}
                <div className="sf-wizard-nav-btns">
                  {wizardStep > 1 ? (
                    <button 
                      type="button"
                      className="sf-btn-secondary"
                      onClick={() => setWizardStep(s => Math.max(1, s - 1))}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : <div />}

                  {wizardStep < 7 ? (
                    <button 
                      type="button"
                      className="sf-btn-primary"
                      onClick={() => setWizardStep(s => Math.min(7, s + 1))}
                    >
                      Continue to Step {wizardStep + 1} <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button 
                      type="button"
                      className="sf-btn-primary sf-submit-quote-btn"
                      style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}
                      onClick={handleSubmitCustomQuote}
                    >
                      <Sparkles size={16} /> Get Preview & Quote
                    </button>
                  )}
                </div>
              </>
            )}

          </div>

        </div>
      </div>
    );
  };

  return (
    <div className={`sf-shoes-studio ${isDark ? 'sf-theme-dark' : 'sf-theme-light'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#1e293b',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 600,
          border: '1px solid rgba(247, 37, 133, 0.4)'
        }}>
          <Sparkles size={16} color="#f72585" />
          <span>{toastMessage}</span>
        </div>
      )}



      {/* ========================================================================= */}
      {/* MODE 1: SHOP & CREATE CUSTOM FOOTWEAR                                    */}
      {/* ========================================================================= */}
      {activeMode === 'shop' && (
        <>
          {pageView === 'product-detail' && selectedProduct ? (
            renderProductDetailPage()
          ) : pageView === 'custom-design' ? (
            renderCustomDesignPage()
          ) : pageView === 'catalog' ? (
            renderCatalogPage()
          ) : (
            <div className="sf-shop-experience">
              
              {/* SECTION 1: HERO BANNER (100% Full-Width Panoramic Banner matching user reference) */}
              <section className="sf-hero-section-panoramic">
            <div className="sf-hero-panoramic-inner">
              
              {/* Hero Left Content */}
              <div className="sf-hero-left-content">
                <span className="sf-hero-tag-label">
                  STITCHBEEZ FOOTWEAR STUDIO
                </span>

                <h1 className="sf-serif-title sf-hero-panoramic-title">
                  Footwear <br />
                  <span className="sf-hero-brown-text">Made for Your Journey</span>
                </h1>

                <p className="sf-hero-panoramic-desc">
                  Premium shoes, sandals, slippers and custom-made footwear — handcrafted with quality materials and designed for your unique style.
                </p>

                {/* Trust Indicators with circular badges */}
                <div className="sf-hero-trust-badges-row">
                  <div className="sf-hero-trust-badge">
                    <div className="sf-trust-badge-circle">
                      <Gem size={17} color="#f72585" strokeWidth={2.2} />
                    </div>
                    <div className="sf-trust-badge-text">
                      <span>Premium</span>
                      <span>Materials</span>
                    </div>
                  </div>

                  <div className="sf-hero-trust-badge">
                    <div className="sf-trust-badge-circle">
                      <Scissors size={17} color="#f72585" strokeWidth={2.2} />
                    </div>
                    <div className="sf-trust-badge-text">
                      <span>Custom</span>
                      <span>Designs</span>
                    </div>
                  </div>

                  <div className="sf-hero-trust-badge">
                    <div className="sf-trust-badge-circle">
                      <ShieldCheck size={17} color="#f72585" strokeWidth={2.2} />
                    </div>
                    <div className="sf-trust-badge-text">
                      <span>Verified</span>
                      <span>Artisans</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="sf-hero-panoramic-ctas">
                  <button 
                    className="sf-btn-panoramic-pink"
                    onClick={() => {
                      setCategoryFilter('all');
                      scrollToId('sf-featured-collection');
                    }}
                  >
                    Shop Ready Footwear →
                  </button>
                  <button 
                    className="sf-btn-panoramic-white"
                    onClick={() => handleOpenCustomDesign()}
                  >
                    Create Custom Design
                  </button>
                </div>
              </div>

              {/* Top-Right Decorative Script */}
              <div className="sf-hero-panoramic-script">
                <span className="sf-script-word sf-script-every">Every</span>
                <span className="sf-script-word sf-script-step">Step.</span>
                <span className="sf-script-word sf-script-your">Your</span>
                <span className="sf-script-word sf-script-style">Style.</span>
              </div>

            </div>
          </section>

          {/* SECTION 2: SHOP BY CATEGORY */}
          <section className="sf-section sf-category-section">
            <div className="sf-container">
              <div className="sf-section-header-center">
                <span className="sf-tag-label">EXPLORE COLLECTION</span>
                <h2 className="sf-serif-title sf-section-heading">Shop by Category</h2>
                <p className="sf-section-subtext">
                  Find the perfect pair or create your own custom footwear.
                </p>
              </div>

              <div className="sf-category-grid-7">
                {SHOE_CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                  const isActive = categoryFilter === cat.id;
                  return (
                    <div 
                      key={cat.id} 
                      className={`sf-cat-card ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        if (cat.isCustom) {
                          handleOpenCustomDesign();
                        } else {
                          setCategoryFilter(cat.id);
                          const url = new URL(window.location);
                          url.searchParams.set('category', cat.id);
                          window.history.pushState(null, '', url.pathname + url.search);
                          scrollToId('sf-featured-collection');
                        }
                      }}
                    >
                      <div className="sf-cat-img-box">
                        <img src={cat.img} alt={cat.label} />
                      </div>
                      <div className="sf-cat-info">
                        <h4 className="sf-cat-title">{cat.label}</h4>
                        <p className="sf-cat-desc">{cat.sub}</p>
                        <span className="sf-cat-action">{cat.action}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 3: FEATURED COLLECTION */}
          <section id="sf-featured-collection" className="sf-section sf-featured-section">
            <div className="sf-container">
              <div className="sf-section-header-split">
                <div>
                  <span className="sf-tag-label">FEATURED COLLECTION</span>
                  <h2 className="sf-serif-title sf-section-heading">
                    {getCategoryHeading(categoryFilter)}
                  </h2>
                  <p className="sf-section-subtext">
                    Handpicked designs crafted with premium materials and fine detailing.
                  </p>

                  {(categoryFilter !== 'all' || debouncedSearch.trim()) && (
                    <button 
                      className="sf-filter-clear-pill"
                      onClick={() => {
                        setCategoryFilter('all');
                        if (setSearchQuery) setSearchQuery('');
                        const url = new URL(window.location);
                        url.searchParams.delete('category');
                        url.searchParams.delete('q');
                        window.history.pushState(null, '', url.pathname);
                      }}
                    >
                      ✕ Show All Footwear ({ALL_SHOE_PRODUCTS.length})
                    </button>
                  )}
                </div>

                <button 
                  className="sf-link-text-pink"
                  onClick={() => handleOpenCatalog(categoryFilter)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  View All →
                </button>
              </div>

              {/* View All Filter & Sort Toolbar (Requirement 9) */}
              {showFilterBar && (
                <div className="sf-filter-sort-bar">
                  <div className="sf-filter-group">
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sf-text-secondary)' }}>Filters:</span>
                    
                    {/* Category */}
                    <select 
                      className="sf-filter-select"
                      value={categoryFilter}
                      onChange={e => {
                        setCategoryFilter(e.target.value);
                        const url = new URL(window.location);
                        if (e.target.value === 'all') url.searchParams.delete('category');
                        else url.searchParams.set('category', e.target.value);
                        window.history.pushState(null, '', url.pathname + url.search);
                      }}
                    >
                      <option value="all">All Categories</option>
                      <option value="mens">Men's Shoes</option>
                      <option value="womens">Women's Shoes</option>
                      <option value="sneakers">Sneakers</option>
                      <option value="sandals">Sandals</option>
                      <option value="slippers">Slippers</option>
                      <option value="boots">Boots</option>
                    </select>

                    {/* Gender */}
                    <select 
                      className="sf-filter-select"
                      value={genderFilter}
                      onChange={e => setGenderFilter(e.target.value)}
                    >
                      <option value="all">All Genders</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>

                    {/* Size */}
                    <select 
                      className="sf-filter-select"
                      value={sizeFilter}
                      onChange={e => setSizeFilter(e.target.value)}
                    >
                      <option value="all">All Sizes</option>
                      <option value="UK 6">UK 6</option>
                      <option value="UK 7">UK 7</option>
                      <option value="UK 8">UK 8</option>
                      <option value="UK 9">UK 9</option>
                      <option value="UK 10">UK 10</option>
                      <option value="UK 11">UK 11</option>
                    </select>

                    {/* Material */}
                    <select 
                      className="sf-filter-select"
                      value={materialFilter}
                      onChange={e => setMaterialFilter(e.target.value)}
                    >
                      <option value="all">All Materials</option>
                      <option value="Calfskin">Italian Calfskin</option>
                      <option value="Suede">Brushed Suede</option>
                      <option value="Nappa">Nappa Leather</option>
                      <option value="Mesh">Breathable Mesh</option>
                      <option value="Patent">Patent Leather</option>
                      <option value="Shearling">Shearling Wool</option>
                    </select>

                    {/* Price Range */}
                    <select 
                      className="sf-filter-select"
                      value={priceRangeFilter}
                      onChange={e => setPriceRangeFilter(e.target.value)}
                    >
                      <option value="all">All Prices</option>
                      <option value="under-2500">Under ₹2,500</option>
                      <option value="2500-3500">₹2,500 – ₹3,500</option>
                      <option value="above-3500">Above ₹3,500</option>
                    </select>

                    {/* Availability */}
                    <select 
                      className="sf-filter-select"
                      value={availabilityFilter}
                      onChange={e => setAvailabilityFilter(e.target.value)}
                    >
                      <option value="all">All Availability</option>
                      <option value="in-stock">In Stock Only</option>
                    </select>
                  </div>

                  <div className="sf-filter-group">
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sf-text-secondary)' }}>Sort by:</span>
                    <select 
                      className="sf-filter-select"
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                    >
                      <option value="recommended">Recommended</option>
                      <option value="newest">Newest</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="popular">Popular</option>
                    </select>

                    <button 
                      style={{ fontSize: '0.8rem', color: 'var(--sf-pink)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                      onClick={() => {
                        setCategoryFilter('all');
                        setGenderFilter('all');
                        setSizeFilter('all');
                        setMaterialFilter('all');
                        setPriceRangeFilter('all');
                        setAvailabilityFilter('all');
                        setSortBy('recommended');
                        if (setSearchQuery) setSearchQuery('');
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <div className="sf-products-grid">
                {filteredProducts.map(product => {
                  const isWish = wishlist.has(product.id);
                  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

                  return (
                    <div 
                      key={product.id} 
                      className="sf-product-card"
                      onClick={() => handleOpenPdp(product)}
                    >
                      <div className="sf-prod-img-box">
                        <img src={product.img} alt={product.name} />
                        
                        <button 
                          className="sf-prod-wish-btn"
                          onClick={(e) => handleToggleWishlist(product.id, e)}
                          title="Save to Wishlist"
                        >
                          <Heart 
                            size={16} 
                            fill={isWish ? '#f72585' : 'none'} 
                            color={isWish ? '#f72585' : '#475569'} 
                            strokeWidth={2}
                          />
                        </button>
                      </div>

                      <div className="sf-prod-info">
                        <h4 className="sf-prod-name">{product.name}</h4>

                        <div className="sf-prod-price-row">
                          <span className="sf-prod-price">₹{product.price.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="sf-prod-bottom-row">
                          {/* Color Swatch Dots */}
                          <div className="sf-prod-swatches">
                            {product.colors.map(col => (
                              <span 
                                key={col.name}
                                className={`sf-prod-swatch-dot ${product.selectedColor === col.name ? 'active' : ''}`}
                                style={{ backgroundColor: col.hex }}
                                title={col.name}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProductsList(prev => prev.map(p => p.id === product.id ? {
                                    ...p,
                                    selectedColor: col.name,
                                    img: col.img || p.img
                                  } : p));
                                }}
                              />
                            ))}
                          </div>

                          {/* Add to Cart button adds to bag and opens Cart Drawer (matching Bags) */}
                          <button 
                            className="sf-prod-cart-btn"
                            onClick={(e) => handleAddToCartItem(product, e)}
                            title="Add to Bag"
                          >
                            <ShoppingCart size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 24px', background: 'var(--sf-warm-card)', borderRadius: '16px', border: '1px solid var(--sf-border)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--sf-text-primary)', marginBottom: '8px' }}>
                      No products available in this category yet.
                    </h3>
                    <p style={{ color: 'var(--sf-text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
                      Explore our complete handcrafted footwear range or customize a bespoke pair tailored to your preferences.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button 
                        className="sf-btn-primary" 
                        onClick={() => {
                          setCategoryFilter('all');
                          if (setSearchQuery) setSearchQuery('');
                          const url = new URL(window.location);
                          url.searchParams.delete('category');
                          url.searchParams.delete('q');
                          window.history.pushState(null, '', url.pathname);
                        }}
                      >
                        View All Footwear
                      </button>
                      <button className="sf-btn-secondary" onClick={() => scrollToId('sf-custom-studio')}>
                        Start Bespoke Design →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 4: CUSTOM DESIGN STUDIO */}
          <section id="sf-custom-studio" className="sf-custom-studio-section">
            <div className="sf-container">
              <div className="sf-custom-studio-card">
                <div className="sf-custom-studio-grid">
                  
                  {/* Left: Designer Sketching Photo */}
                  <div className="sf-custom-studio-photo">
                    <img 
                      src="/shoes_sketch/leftShoesSketch.png" 
                      alt="Artisan sketching bespoke shoe design" 
                    />
                  </div>

                  {/* Center: Copy + CTA + 4 Process Indicators */}
                  <div className="sf-custom-studio-details">
                    <span className="sf-tag-label">CUSTOM DESIGN STUDIO</span>
                    <h2 className="sf-serif-title sf-custom-studio-heading">
                      Design Your<br />Dream Footwear
                    </h2>
                    <p className="sf-custom-studio-sub">
                      Choose the style, material, color, size and detailing.<br />
                      Our artisans will bring your design to life.
                    </p>

                    <button 
                      className="sf-custom-studio-cta"
                      onClick={() => handleOpenCustomDesign()}
                    >
                      Start Designing →
                    </button>

                    <div className="sf-custom-steps-row">
                      <div className="sf-custom-step-item">
                        <div className="sf-step-icon-wrap">
                          <Upload size={18} color="#f72585" strokeWidth={2.2} />
                        </div>
                        <span className="sf-step-name">Upload Sketch<br />or idea</span>
                      </div>

                      <div className="sf-custom-step-item">
                        <div className="sf-step-icon-wrap">
                          <Scissors size={18} color="#f72585" strokeWidth={2.2} />
                        </div>
                        <span className="sf-step-name">Choose Material<br />& Details</span>
                      </div>

                      <div className="sf-custom-step-item">
                        <div className="sf-step-icon-wrap">
                          <Eye size={18} color="#f72585" strokeWidth={2.2} />
                        </div>
                        <span className="sf-step-name">Get Preview<br />& Quote</span>
                      </div>

                      <div className="sf-custom-step-item">
                        <div className="sf-step-icon-wrap">
                          <Package size={18} color="#f72585" strokeWidth={2.2} />
                        </div>
                        <span className="sf-step-name">Handcrafted<br />& Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Footwear Concept Sketch with Annotations */}
                  <div className="sf-custom-studio-sketch">
                    <img 
                      src="/shoes_sketch/rightsideshow.png" 
                      alt="Custom footwear concept design with handcrafted style, color and material annotations" 
                    />
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: FOOTWEAR MATERIAL OPTIONS */}
          <section className="sf-materials-section">
            <div className="sf-container">
              <div className="sf-section-header-center">
                <span className="sf-tag-label">FOOTWEAR MATERIAL OPTIONS</span>
                <h2 className="sf-serif-title sf-section-heading">Premium Materials for Every Style</h2>
                <p className="sf-section-subtext">
                  Handpicked leathers, fabrics and soles to create long-lasting, comfortable footwear.
                </p>
              </div>

              <div className="sf-materials-carousel-wrapper">
                <button 
                  className="sf-mat-nav-arrow sf-mat-nav-prev"
                  onClick={() => scrollMaterials('left')}
                  title="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="sf-materials-carousel" ref={materialsTrackRef}>
                  {SHOE_MATERIALS.map(mat => (
                    <div 
                      key={mat.id} 
                      className="sf-material-card"
                      onClick={() => setSelectedMaterialModal(mat)}
                    >
                      <div className="sf-material-img-box">
                        <img src={mat.img} alt={mat.name} />
                      </div>
                      <div className="sf-material-info">
                        <span className="sf-material-tag">{mat.tag}</span>
                        <h4 className="sf-material-name">{mat.name}</h4>
                        <p className="sf-material-desc">{mat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="sf-mat-nav-arrow sf-mat-nav-next"
                  onClick={() => scrollMaterials('right')}
                  title="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 6: HOW IT WORKS */}
          <section className="sf-how-it-works-section">
            <div className="sf-how-it-works-grid">
              
              {/* Left Column */}
              <div className="sf-how-left">
                <span className="sf-how-tag-label">HOW IT WORKS</span>
                <h2 className="sf-serif-title sf-how-main-heading">From Idea to Your Footwear</h2>
                <p className="sf-how-subtitle">
                  A simple and transparent process to create or buy your perfect pair.
                </p>

                <div className="sf-how-steps-flow">
                  {/* Step 1 */}
                  <div 
                    className={`sf-how-flow-step ${activeHowStep === 1 ? 'active' : ''}`}
                    onClick={() => setActiveHowStep(1)}
                  >
                    <div className="sf-how-icon-circle">
                      <img src="/footwear_how_step_1.png" alt="1. Choose" className="sf-how-step-icon-img" />
                    </div>
                    <h5 className="sf-how-step-title">1. Choose</h5>
                    <p className="sf-how-step-desc">Pick a ready design or create a custom pair.</p>
                  </div>

                  <span className="sf-how-flow-arrow">→</span>

                  {/* Step 2 */}
                  <div 
                    className={`sf-how-flow-step ${activeHowStep === 2 ? 'active' : ''}`}
                    onClick={() => setActiveHowStep(2)}
                  >
                    <div className="sf-how-icon-circle">
                      <img src="/footwear_how_step_2.png" alt="2. Customize" className="sf-how-step-icon-img" />
                    </div>
                    <h5 className="sf-how-step-title">2. Customize</h5>
                    <p className="sf-how-step-desc">Select material, color and details.</p>
                  </div>

                  <span className="sf-how-flow-arrow">→</span>

                  {/* Step 3 */}
                  <div 
                    className={`sf-how-flow-step ${activeHowStep === 3 ? 'active' : ''}`}
                    onClick={() => setActiveHowStep(3)}
                  >
                    <div className="sf-how-icon-circle">
                      <img src="/footwear_how_step_3.png" alt="3. Crafted" className="sf-how-step-icon-img" />
                    </div>
                    <h5 className="sf-how-step-title">3. Crafted</h5>
                    <p className="sf-how-step-desc">Our artisans handcraft your footwear.</p>
                  </div>

                  <span className="sf-how-flow-arrow">→</span>

                  {/* Step 4 */}
                  <div 
                    className={`sf-how-flow-step ${activeHowStep === 4 ? 'active' : ''}`}
                    onClick={() => setActiveHowStep(4)}
                  >
                    <div className="sf-how-icon-circle">
                      <img src="/footwear_how_step_4.png" alt="4. Delivered" className="sf-how-step-icon-img" />
                    </div>
                    <h5 className="sf-how-step-title">4. Delivered</h5>
                    <p className="sf-how-step-desc">Securely packed and delivered to you.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Artisan Stitcher Image */}
              <div className="sf-how-right">
                <img 
                  src="/Stitcher.png" 
                  alt="Master artisan handcrafting footwear in STITCHBEEZ apron" 
                  className="sf-how-stitcher-img"
                />
              </div>

            </div>
          </section>

          {/* SECTION 7: LIFESTYLE / EDITORIAL BANNER */}
          <section className="sf-lifestyle-banner-section">
            <div className="sf-lifestyle-grid">
              
              {/* Left Column: Heading & CTA */}
              <div className="sf-lifestyle-left">
                <h2 className="sf-serif-title sf-lifestyle-heading">
                  More Than Footwear,<br />It’s a Lifestyle
                </h2>
                <p className="sf-lifestyle-sub">
                  Stylish, comfortable and designed for every step of your journey.
                </p>
                <button 
                  className="sf-lifestyle-btn"
                  onClick={() => {
                    setCategoryFilter('all');
                    scrollToId('sf-featured-collection');
                  }}
                >
                  Shop Collection →
                </button>
              </div>

              {/* Right Column: Shoes Lineup Image */}
              <div className="sf-lifestyle-right">
                <img 
                  src="/AllShoes_stretched.png" 
                  alt="Sneakers, formal leather shoes, and handcrafted sandals" 
                  className="sf-lifestyle-img"
                />
              </div>

            </div>
          </section>

          {/* SECTION 8: CUSTOMER REVIEWS */}
          <section className="sf-reviews-section">
            <div className="sf-container">
              <div className="sf-section-header-split">
                <div>
                  <span className="sf-tag-label">CUSTOMER VOICES</span>
                  <h2 className="sf-serif-title sf-section-heading">Loved by Walkers, Striders & Creators</h2>
                  <p className="sf-section-subtext">
                    Read verified stories from customers who step out in bespoke StitchBeez footwear.
                  </p>
                </div>
                <button 
                  className="sf-link-text-pink"
                  onClick={() => {
                    setIsReviewsModalOpen(true);
                    window.history.pushState(null, '', '/footwear/reviews');
                  }}
                >
                  View More Reviews →
                </button>
              </div>

              <div className="sf-reviews-grid-3">
                {SHOE_REVIEWS.map(rev => (
                  <div key={rev.id} className="sf-review-card">
                    <div className="sf-review-top">
                      <div className="sf-review-stars">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <p className="sf-review-quote">“{rev.quote}”</p>
                    </div>

                    <div className="sf-review-footer">
                      <div className="sf-review-author-wrap">
                        <img src={rev.avatar} alt={rev.name} className="sf-review-avatar" />
                        <div>
                          <span className="sf-review-name">{rev.name}</span>
                          <span className="sf-review-loc">{rev.location}</span>
                        </div>
                      </div>

                      <img src={rev.itemImg} alt="Footwear" className="sf-review-item-thumb" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: BOTTOM CTA BANNER (Requirement 17) */}
          <section className="sf-bottom-cta-section">
            <div className="sf-container">
              <div className="sf-bottom-cta-card">
                <img 
                  src="/luxurious_brown_leather_shoe_texture.png" 
                  alt="Luxurious Brown Leather Shoe Texture" 
                  className="sf-bottom-cta-bg"
                />
                <div className="sf-bottom-cta-overlay" />
                
                <div className="sf-bottom-cta-text">
                  <h2 
                    className="sf-serif-title sf-bottom-cta-heading text-white has-white-text"
                    style={{ color: '#ffffff' }}
                  >
                    Step into Your Next Journey
                  </h2>
                  <p 
                    className="sf-bottom-cta-sub text-white has-white-text"
                    style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                  >
                    Explore premium footwear or create your own custom design today.
                  </p>
                </div>

                <div className="sf-bottom-cta-btns">
                  <button 
                    className="sf-cta-btn-pink btn-primary text-white has-white-text"
                    style={{ color: '#ffffff' }}
                    onClick={() => {
                      setCategoryFilter('all');
                      scrollToId('sf-featured-collection');
                    }}
                  >
                    Shop Ready Footwear →
                  </button>
                  <button 
                    className="sf-cta-btn-glass text-white has-white-text"
                    style={{ color: '#ffffff' }}
                    onClick={() => handleOpenCustomDesign()}
                  >
                    Create Custom Design
                  </button>
                </div>
              </div>
            </div>
          </section>

            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: REPAIR & RESTORE (SWAPPING TO SHOE REPAIR EXPERT RESOLING)        */}
      {/* ========================================================================= */}
      {activeMode === 'restore' && (
        <div className="sf-restore-redirect-box" style={{ padding: '40px 0', minHeight: '60vh' }}>
          <div className="sf-container" style={{ textAlign: 'center', maxWidth: '640px', margin: '60px auto' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(247, 37, 133, 0.1)',
              color: '#f72585',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Wrench size={30} />
            </div>
            <h2 className="sf-serif-title" style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              Shoe Repair & Resoling Studio
            </h2>
            <p style={{ color: 'var(--sf-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '28px' }}>
              Restore, resole, and condition your cherished shoes and boots with verified master cobblers.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button 
                className="sf-btn-primary" 
                onClick={() => {
                  if (onSwitchMode) onSwitchMode('restore');
                }}
              >
                Launch Repair & Resoling Portal →
              </button>
              <button 
                className="sf-btn-secondary"
                onClick={() => setActiveMode('shop')}
              >
                ← Back to Shop & Create
              </button>
            </div>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* MODAL 3: MATERIAL DETAILS MODAL                                           */}
      {/* ========================================================================= */}
      {selectedMaterialModal && (
        <div className="sf-modal-backdrop" onClick={() => setSelectedMaterialModal(null)}>
          <div className="sf-modal-box" style={{ maxWidth: '580px', padding: '32px' }} onClick={e => e.stopPropagation()}>
            <button className="sf-modal-close-btn" onClick={() => setSelectedMaterialModal(null)}>
              <X size={18} />
            </button>

            <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '18px' }}>
              <img src={selectedMaterialModal.img} alt={selectedMaterialModal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <span className="sf-tag-label">{selectedMaterialModal.tag}</span>
            <h3 className="sf-serif-title" style={{ fontSize: '1.8rem', margin: '4px 0 10px' }}>
              {selectedMaterialModal.name}
            </h3>
            <p style={{ color: 'var(--sf-text-secondary)', lineHeight: 1.5, fontSize: '0.92rem', marginBottom: '16px' }}>
              {selectedMaterialModal.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--sf-warm-cream)', padding: '14px', borderRadius: '10px', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--sf-pink)' }}>Durability</span>
                <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: '0.85rem' }}>{selectedMaterialModal.durability}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--sf-pink)' }}>Breathability</span>
                <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: '0.85rem' }}>{selectedMaterialModal.breathability}</p>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Recommended Footwear:</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--sf-text-secondary)' }}>{selectedMaterialModal.recommendedFootwear}</span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Artisan Care:</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--sf-text-secondary)' }}>{selectedMaterialModal.careInfo}</span>
            </div>

            {/* Available Colors for Material (Requirement 13) */}
            {selectedMaterialModal.availableColors && selectedMaterialModal.availableColors.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Available Tones:</strong>
                <div className="sf-swatch-row">
                  {selectedMaterialModal.availableColors.map(c => (
                    <span 
                      key={c.name}
                      className="sf-prod-swatch-dot"
                      style={{ backgroundColor: c.hex, width: '22px', height: '22px' }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <button 
              className="sf-btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                const matId = selectedMaterialModal.id;
                const matName = selectedMaterialModal.name;
                setSelectedMaterialModal(null);
                handleOpenCustomDesign(matId);
                showToast(`Pre-selected "${matName}" in Custom Studio!`);
              }}
            >
              Design With This Material →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: QUICK-ADD SIZE & COLOR MODAL (Requirement 7)                     */}
      {/* ========================================================================= */}
      {quickAddProduct && (
        <div className="sf-modal-backdrop" onClick={() => setQuickAddProduct(null)}>
          <div className="sf-modal-box sf-quick-add-modal" onClick={e => e.stopPropagation()}>
            <button className="sf-modal-close-btn" onClick={() => setQuickAddProduct(null)}>
              <X size={18} />
            </button>

            <div className="sf-quick-add-header">
              <img 
                src={quickAddProduct.colors?.find(c => c.name === quickAddColor)?.img || quickAddProduct.img} 
                alt={quickAddProduct.name} 
                className="sf-quick-add-img" 
              />
              <div className="sf-quick-add-info">
                <h4>{quickAddProduct.name}</h4>
                <span className="sf-quick-price">₹{quickAddProduct.price.toLocaleString('en-IN')}</span>
                <span style={{ display: 'block', fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>In Stock</span>
              </div>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sf-text-primary)' }}>
                Color: <span style={{ color: 'var(--sf-pink)' }}>{quickAddColor}</span>
              </span>
              <div className="sf-swatch-row" style={{ marginTop: '8px' }}>
                {quickAddProduct.colors.map(col => (
                  <button 
                    key={col.name}
                    type="button"
                    className={`sf-swatch-btn ${quickAddColor === col.name ? 'active' : ''}`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                    onClick={() => setQuickAddColor(col.name)}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sf-text-primary)', display: 'block', marginBottom: '8px' }}>
                Select Size (UK / India):
              </span>
              <div className="sf-pdp-sizes-grid">
                {(quickAddProduct.sizes || ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']).map(sz => (
                  <button 
                    key={sz}
                    type="button"
                    className={`sf-size-chip ${quickAddSize === sz ? 'active' : ''}`}
                    onClick={() => setQuickAddSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="sf-pdp-qty-row" style={{ marginBottom: '22px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Quantity:</span>
              <div className="sf-qty-selector">
                <button 
                  type="button" 
                  className="sf-qty-btn"
                  onClick={() => setQuickAddQty(q => Math.max(1, q - 1))}
                >-</button>
                <span className="sf-qty-num">{quickAddQty}</span>
                <button 
                  type="button" 
                  className="sf-qty-btn"
                  onClick={() => setQuickAddQty(q => Math.min(quickAddProduct.stock || 10, q + 1))}
                >+</button>
              </div>
            </div>

            {/* Add to Cart button */}
            <button 
              className="sf-btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleQuickAddConfirm}
            >
              <ShoppingCart size={16} />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CUSTOMER REVIEWS MODAL (Requirement 16)                          */}
      {/* ========================================================================= */}
      {isReviewsModalOpen && (
        <div className="sf-modal-backdrop" onClick={() => {
          setIsReviewsModalOpen(false);
          const catQuery = categoryFilter !== 'all' ? `?category=${categoryFilter}` : '';
          window.history.pushState(null, '', `/footwear${catQuery}`);
        }}>
          <div className="sf-modal-box sf-reviews-modal" onClick={e => e.stopPropagation()}>
            <button className="sf-modal-close-btn" onClick={() => {
              setIsReviewsModalOpen(false);
              const catQuery = categoryFilter !== 'all' ? `?category=${categoryFilter}` : '';
              window.history.pushState(null, '', `/footwear${catQuery}`);
            }}>
              <X size={18} />
            </button>

            <span className="sf-tag-label">VERIFIED FOOTWEAR EXPERIENCES</span>
            <h3 className="sf-serif-title" style={{ fontSize: '1.8rem', margin: '6px 0 16px' }}>
              Customer Reviews & Ratings
            </h3>

            {/* Aggregate Rating Summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--sf-warm-cream)', borderRadius: '12px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--sf-text-primary)', lineHeight: 1 }}>4.9</span>
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--sf-text-muted)' }}>out of 5</span>
              </div>
              <div style={{ borderLeft: '1px solid var(--sf-border)', paddingLeft: '16px', fontSize: '0.85rem', color: 'var(--sf-text-secondary)', lineHeight: 1.5 }}>
                Based on <strong>120+ verified footwear orders</strong>.<br />
                100% authentic feedback from verified customers.
              </div>
            </div>

            {/* Reviews List */}
            <div className="sf-reviews-list-scroll">
              {reviewsList.map(rev => (
                <div key={rev.id} className="sf-review-card-extended">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={rev.avatar} alt={rev.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--sf-text-primary)' }}>{rev.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--sf-text-secondary)' }}>{rev.location}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--sf-text-muted)' }}>{rev.date}</span>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--sf-text-primary)', lineHeight: 1.5 }}>
                    “{rev.quote}”
                  </p>

                  {rev.productName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--sf-pink)', fontWeight: 600 }}>
                      {rev.itemImg && <img src={rev.itemImg} alt="" style={{ width: '22px', height: '22px', borderRadius: '4px', objectFit: 'cover' }} />}
                      <span>Verified purchase: {rev.productName}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div style={{ borderTop: '1px solid var(--sf-border-light)', paddingTop: '20px', marginTop: '10px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 10px' }}>Write a Verified Review</h4>
              {!currentUser ? (
                <div style={{ padding: '14px', background: 'var(--sf-warm-cream)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--sf-text-secondary)' }}>
                    Only customers with completed purchases can submit verified reviews.
                  </span>
                  <button 
                    className="sf-btn-primary" 
                    style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                    onClick={() => {
                      if (onOpenAuthModal) onOpenAuthModal('customer', 'login');
                    }}
                  >
                    Sign In to Review
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Product:</label>
                      <select 
                        value={newReviewProduct} 
                        onChange={e => setNewReviewProduct(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)' }}
                      >
                        {ALL_SHOE_PRODUCTS.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Rating:</label>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', height: '36px' }}>
                        {[1, 2, 3, 4, 5].map(r => (
                          <Star 
                            key={r} 
                            size={20} 
                            fill={newReviewRating >= r ? '#f59e0b' : 'none'} 
                            color="#f59e0b" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => setNewReviewRating(r)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Your Experience:</label>
                    <textarea 
                      rows={2}
                      value={newReviewComment}
                      onChange={e => setNewReviewComment(e.target.value)}
                      placeholder="Share your thoughts on fit, leather quality, and comfort..."
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--sf-border)', background: 'var(--sf-warm-card)' }}
                    />
                  </div>

                  <button 
                    className="sf-btn-primary" 
                    style={{ alignSelf: 'flex-start' }}
                    onClick={handleReviewSubmit}
                  >
                    Submit Verified Review
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE-OUT CART DRAWER (Matching Bags Section)                             */}
      {/* ========================================================================= */}
      {isCartOpen && (
        <div className="sf-modal-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="sf-cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="sf-cart-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={20} color="var(--sf-pink)" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Your Footwear Cart</h3>
              </div>
              <button className="sf-drawer-close" onClick={() => setIsCartOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="sf-cart-items-list">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--sf-text-secondary)' }}>
                  <ShoppingBag size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                  <p>Your footwear cart is currently empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartKey || `${item.id}-${item.color}-${item.size}`} className="sf-cart-item-row">
                    <img src={item.image || item.img} alt={item.name} className="sf-cart-thumb" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ margin: '0 0 3px 0', fontSize: '0.9rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--sf-text-secondary)', display: 'block' }}>
                        {item.color} • {item.size}
                      </span>
                      <div style={{ fontWeight: 800, color: 'var(--sf-pink)', marginTop: '4px' }}>
                        ₹{(item.price || 0).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        className="sf-cart-qty-btn"
                        onClick={() => {
                          const updated = updateCartQuantity(item.cartKey || `${item.id}-${item.color}-${item.size}`, (item.quantity || 1) - 1);
                          setCart(updated);
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.quantity || item.qty || 1}</span>
                      <button 
                        className="sf-cart-qty-btn"
                        onClick={() => {
                          const updated = updateCartQuantity(item.cartKey || `${item.id}-${item.color}-${item.size}`, (item.quantity || 1) + 1);
                          setCart(updated);
                        }}
                      >
                        +
                      </button>
                      <button 
                        className="sf-cart-remove-btn"
                        onClick={() => {
                          const updated = removeFromCart(item.cartKey || `${item.id}-${item.color}-${item.size}`);
                          setCart(updated);
                          showToast('Item removed from cart');
                        }}
                        title="Remove item"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="sf-cart-footer">
                <div className="sf-cart-subtotal-row">
                  <span>Subtotal</span>
                  <strong>₹{cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || item.qty || 1), 0).toLocaleString('en-IN')}</strong>
                </div>
                <div className="sf-cart-subtotal-row" style={{ fontSize: '0.8rem', color: '#10b981' }}>
                  <span>Doorstep Insured Delivery</span>
                  <strong>FREE</strong>
                </div>

                <button 
                  className="sf-btn-primary" 
                  style={{ width: '100%', marginTop: '16px' }}
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
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
