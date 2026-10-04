import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingCart, ArrowRight, Check, Star, 
  ChevronLeft, ChevronRight, X, Sparkles, Sliders,
  Gift, Truck, Layers, Type, Lightbulb, Tag, Award,
  Upload, Scissors, Compass, ShieldCheck, MapPin
} from 'lucide-react';
import './HandmadeGiftsPage.css';
import { getWishlist, toggleWishlist } from '../../utils/bagsStore';
import { addHandmadeGiftToCart } from '../../utils/handmadeGiftsStore';

// ============================================================================
// ASSET MAPPINGS (Exact local assets from Desktop/HandMadeGifts)
// ============================================================================
export const handmadeGiftImages = {
  hero: "/assets/handmade-gifts/hero_page.png",
  
  categories: {
    teddy: "/assets/handmade-gifts/handmade_teddy.png",
    cushion: "/assets/handmade-gifts/cushion_covers.png",
    tote: "/assets/handmade-gifts/tote_bags.png",
    pouch: "/assets/handmade-gifts/pouches.png",
    personalized: "/assets/handmade-gifts/personalized_gifts.png",
    baby: "/assets/handmade-gifts/baby_gifts.png",
    kitchen: "/assets/handmade-gifts/kitchen_linen.png",
    custom: "/assets/handmade-gifts/custom_designs.png"
  },
  
  products: {
    classicTeddy: "/assets/handmade-gifts/classic_teddy_bear.png",
    floralCushion: "/assets/handmade-gifts/floral_cushion_cover.png",
    personalizedCushion: "/assets/handmade-gifts/personalized_name_cushion.png",
    embroideredTote: "/assets/handmade-gifts/embroidered_tote_bag.png",
    babyBib: "/assets/handmade-gifts/baby_gifts.png",
    cosmeticPouch: "/assets/handmade-gifts/cosmetic_pouch.png"
  },
  
  customStudio: {
    embroideryLeft: "/assets/handmade-gifts/create_gift_left_hero.png",
    sketchRight: "/assets/handmade-gifts/create_gift_right_hero.png"
  },
  
  fabrics: {
    cotton: "/assets/handmade-gifts/fabrics/cotton.jpg",
    linen: "/assets/handmade-gifts/fabrics/linen.jpg",
    canvas: "/assets/handmade-gifts/fabrics/canvas.jpg",
    velvet: "/assets/handmade-gifts/fabrics/velvet.jpg",
    felt: "/assets/handmade-gifts/fabrics/felt.jpg",
    jute: "/assets/handmade-gifts/fabrics/jute.jpg",
    denim: "/assets/handmade-gifts/fabrics/denim.jpg",
    organic: "/assets/handmade-gifts/fabrics/organic.jpg",
    muslin: "/assets/handmade-gifts/fabrics/muslin.jpg",
    suede: "/assets/handmade-gifts/fabrics/suede.jpg"
  },
  
  howItWorks: "/assets/handmade-gifts/how_it_works_artisan.png",
  lifestyle: "/assets/handmade-gifts/more_than_gift_lifestyle.png",
  bottomCTA: "/assets/handmade-gifts/bottom_craft.jpg"
};

// ============================================================================
// DATA DEFINITIONS (Exact structure from reference screenshot)
// ============================================================================

export const GIFT_CATEGORIES = [
  {
    id: "teddy-bears",
    name: "Handmade Teddy Bears",
    desc: "Soft, cute & customizable",
    img: handmadeGiftImages.categories.teddy,
    action: "Explore →"
  },
  {
    id: "cushion-covers",
    name: "Cushion Covers",
    desc: "Beautiful home décor cushions",
    img: handmadeGiftImages.categories.cushion,
    action: "Explore →"
  },
  {
    id: "tote-bags",
    name: "Tote Bags",
    desc: "Stylish stitched bags for everyday",
    img: handmadeGiftImages.categories.tote,
    action: "Explore →"
  },
  {
    id: "pouches-cosmetic",
    name: "Pouches & Cosmetic Bags",
    desc: "Everyday essentials",
    img: handmadeGiftImages.categories.pouch,
    action: "Explore →"
  },
  {
    id: "personalized-gifts",
    name: "Personalized Gifts",
    desc: "Names, initials & more",
    img: handmadeGiftImages.categories.personalized,
    action: "Explore →"
  },
  {
    id: "baby-gifts",
    name: "Baby Gifts",
    desc: "Bibs, soft toys & more",
    img: handmadeGiftImages.categories.baby,
    action: "Explore →"
  },
  {
    id: "kitchen-linen",
    name: "Kitchen Linen",
    desc: "Aprons, towels & more",
    img: handmadeGiftImages.categories.kitchen,
    action: "Explore →"
  },
  {
    id: "custom-design",
    name: "Custom Design",
    desc: "Your idea, our craft",
    img: handmadeGiftImages.categories.custom,
    action: "Start Designing →",
    isCustom: true
  }
];

export const FEATURED_GIFTS = [
  {
    id: "prod-classic-teddy",
    slug: "classic-teddy-bear",
    name: "Classic Teddy Bear",
    price: "₹1,299",
    rawPrice: 1299,
    img: handmadeGiftImages.products.classicTeddy,
    colors: [
      { name: "Caramel Brown", hex: "#B4713E" },
      { name: "Cream White", hex: "#F3ECE1" },
      { name: "Blush Pink", hex: "#F0A6B4" },
      { name: "Olive Green", hex: "#7E855D" }
    ],
    catId: "teddy-bears"
  },
  {
    id: "prod-floral-cushion",
    slug: "floral-cushion-cover",
    name: "Floral Cushion Cover",
    price: "₹899",
    rawPrice: 899,
    img: handmadeGiftImages.products.floralCushion,
    colors: [
      { name: "Off White", hex: "#FDFBF7" },
      { name: "Sky Blue", hex: "#4B90CD" },
      { name: "Sage", hex: "#9EB097" }
    ],
    catId: "cushion-covers"
  },
  {
    id: "prod-personalized-cushion",
    slug: "personalized-name-cushion",
    name: "Personalized Name Cushion",
    price: "₹999",
    rawPrice: 999,
    img: handmadeGiftImages.products.personalizedCushion,
    colors: [
      { name: "Soft Lilac", hex: "#D6AFCB" },
      { name: "Warm Grey", hex: "#8A8482" },
      { name: "Natural Beige", hex: "#D5C8B9" }
    ],
    catId: "personalized-gifts"
  },
  {
    id: "prod-embroidered-tote",
    slug: "embroidered-tote-bag",
    name: "Embroidered Tote Bag",
    price: "₹1,299",
    rawPrice: 1299,
    img: handmadeGiftImages.products.embroideredTote,
    colors: [
      { name: "Ivory Canvas", hex: "#EDE8DC" },
      { name: "Warm Mustard", hex: "#D99E32" }
    ],
    catId: "tote-bags"
  },
  {
    id: "prod-baby-bib",
    slug: "baby-bib-embroidered",
    name: "Baby Bib (Embroidered)",
    price: "₹499",
    rawPrice: 499,
    img: handmadeGiftImages.products.babyBib,
    colors: [
      { name: "Powder Blue", hex: "#5C99E3" },
      { name: "Sunny Yellow", hex: "#E9B634" },
      { name: "Mint Green", hex: "#7BB894" },
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    catId: "baby-gifts"
  },
  {
    id: "prod-cosmetic-pouch",
    slug: "cosmetic-pouch",
    name: "Cosmetic Pouch",
    price: "₹799",
    rawPrice: 799,
    img: handmadeGiftImages.products.cosmeticPouch,
    colors: [
      { name: "Soft Sage", hex: "#8EA993" },
      { name: "Blush", hex: "#E6A5AB" },
      { name: "Warm Tan", hex: "#9F6F4C" }
    ],
    catId: "pouches-cosmetic"
  },
  {
    id: "prod-linen-apron",
    slug: "embroidered-kitchen-apron",
    name: "Embroidered Kitchen Apron",
    price: "₹1,199",
    rawPrice: 1199,
    img: handmadeGiftImages.categories.kitchen,
    colors: [
      { name: "Natural Oatmeal", hex: "#D9CBB6" },
      { name: "Charcoal Slate", hex: "#3E444B" }
    ],
    catId: "kitchen-linen"
  }
];

export const FABRIC_OPTIONS = [
  { id: "cotton", name: "Cotton", img: handmadeGiftImages.fabrics.cotton },
  { id: "linen", name: "Linen", img: handmadeGiftImages.fabrics.linen },
  { id: "canvas", name: "Canvas", img: handmadeGiftImages.fabrics.canvas },
  { id: "velvet", name: "Velvet", img: handmadeGiftImages.fabrics.velvet },
  { id: "felt", name: "Felt", img: handmadeGiftImages.fabrics.felt },
  { id: "jute", name: "Jute", img: handmadeGiftImages.fabrics.jute },
  { id: "denim", name: "Denim", img: handmadeGiftImages.fabrics.denim },
  { id: "organic", name: "Organic Fabric", img: handmadeGiftImages.fabrics.organic },
  { id: "muslin", name: "Muslin", img: handmadeGiftImages.fabrics.muslin },
  { id: "suede", name: "Suede Fabric", img: handmadeGiftImages.fabrics.suede }
];

export const GIFT_PROCESS_STEPS = [
  {
    step: "1. Choose",
    desc: "Pick a ready design or create a custom gift.",
    icon: Gift
  },
  {
    step: "2. Customize",
    desc: "Select fabric, color and details.",
    icon: Sliders
  },
  {
    step: "3. Crafted",
    desc: "Our artisans handcraft your gift.",
    icon: Scissors
  },
  {
    step: "4. Delivered",
    desc: "Securely packed and delivered to you.",
    icon: Truck
  }
];

export const REVIEWS_DATA = [
  {
    id: "rev-1",
    author: "Priya S.",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    quote: "Amazing quality and beautiful stitching. Loved my custom cushion!",
    productThumb: handmadeGiftImages.products.floralCushion,
    stars: 5
  },
  {
    id: "rev-2",
    author: "Rahul K.",
    city: "Hyderabad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    quote: "Perfect gift for my daughter. The teddy bear is adorable!",
    productThumb: handmadeGiftImages.products.classicTeddy,
    stars: 5
  },
  {
    id: "rev-3",
    author: "Meera R.",
    city: "Chennai",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    quote: "The customized tote bag matched my design perfectly. Excellent work!",
    productThumb: handmadeGiftImages.products.embroideredTote,
    stars: 5
  }
];

// Decorative Eucalyptus Leaves SVG Component matching reference
const EucalyptusLeaves = ({ className = '', style = {} }) => (
  <svg 
    viewBox="0 0 140 220" 
    width="140" 
    height="220" 
    fill="none" 
    className={`hm-leaf-svg ${className}`}
    style={style}
  >
    <path 
      d="M20 200 C35 150 45 90 95 15" 
      stroke="#7B9371" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M38 160 C15 145 12 120 28 110 C44 100 55 125 38 160 Z" 
      fill="#8FA986" 
      opacity="0.85" 
    />
    <path 
      d="M52 125 C75 110 82 85 68 75 C54 65 40 90 52 125 Z" 
      fill="#A4BCA0" 
      opacity="0.8" 
    />
    <path 
      d="M65 85 C42 70 40 45 55 35 C70 25 80 50 65 85 Z" 
      fill="#88A282" 
      opacity="0.85" 
    />
    <path 
      d="M80 50 C100 35 105 15 92 10 C78 5 68 30 80 50 Z" 
      fill="#B1C6AD" 
      opacity="0.8" 
    />
  </svg>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function HandmadeGiftsPage({
  currentUser,
  theme = 'light',
  onAddToCart,
  onDirectCheckout,
  onLoginRequired,
  onNavigateHome
}) {
  const navigate = useNavigate();

  // 1. Category Filtering
  const [selectedCatId, setSelectedCatId] = useState('all');

  // 2. Wishlist State (synchronized with global store)
  const [wishlist, setWishlist] = useState(() => getWishlist());

  useEffect(() => {
    const handleUpdate = () => {
      setWishlist(getWishlist());
    };
    window.addEventListener('stitchbee-store-update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('stitchbee-store-update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // 3. Product Swatch States (map of productId -> colorIndex)
  const [selectedSwatches, setSelectedSwatches] = useState({
    "prod-classic-teddy": 0,
    "prod-floral-cushion": 0,
    "prod-personalized-cushion": 0,
    "prod-embroidered-tote": 0,
    "prod-baby-bib": 0,
    "prod-cosmetic-pouch": 0
  });

  // 4. Fabric Carousel State
  const [selectedFabric, setSelectedFabric] = useState("cotton");
  const fabricsScrollRef = useRef(null);

  // 5. Interactive Modals
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 6. Custom Studio Wizard State
  const [customForm, setCustomForm] = useState({
    giftType: "Handmade Teddy Bear",
    fabric: "Cotton",
    primaryColor: "Caramel Brown",
    recipientName: "Aarav",
    personalizationText: "With Love, Always",
    notes: "Please include subtle floral embroidery on the left paw."
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleWishlistToggle = (productId, productName) => {
    const { updated, added } = toggleWishlist(productId);
    setWishlist(updated);
    showToast(added ? `Added "${productName}" to your Wishlist ❤️` : `Removed "${productName}" from Wishlist`);
  };

  const handleAddProductToCart = (product) => {
    const activeColorIdx = selectedSwatches[product.id] || 0;
    const chosenColor = product.colors[activeColorIdx]?.name || 'Standard';
    addHandmadeGiftToCart(product, chosenColor, null, 1);
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.rawPrice || product.price,
        color: chosenColor,
        image: product.img,
        category: 'Handmade Gifts'
      });
    }
    showToast(`Added ${product.name} (${chosenColor}) to Cart 🛍️`);
  };

  const handleCategoryClick = (category) => {
    if (category.isCustom || category.id === 'custom-design' || category.id === 'custom') {
      const studioTarget = document.getElementById('hm-custom-gift-studio');
      if (studioTarget) {
        studioTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/handmade-gifts/customize');
      }
      return;
    }

    const nextCat = selectedCatId === category.id ? 'all' : category.id;
    setSelectedCatId(nextCat);

    const target = document.getElementById('hm-featured-collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (nextCat !== 'all') {
      showToast(`Showing ${category.name}`);
    } else {
      showToast('Showing all gifts');
    }
  };

  const scrollFabrics = (direction) => {
    if (fabricsScrollRef.current) {
      const amount = direction === 'left' ? -260 : 260;
      fabricsScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const scrollToFeatured = () => {
    const target = document.getElementById('hm-featured-collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCatId === 'all') return FEATURED_GIFTS;
    return FEATURED_GIFTS.filter(p => {
      if (p.catId === selectedCatId) return true;
      if (selectedCatId === 'cushion-covers' && (p.catId === 'cushion-covers' || p.id === 'prod-personalized-cushion')) return true;
      if (selectedCatId === 'personalized-gifts' && (p.id === 'prod-personalized-cushion' || p.id === 'prod-classic-teddy' || p.id === 'prod-baby-bib')) return true;
      if (selectedCatId === 'baby-gifts' && (p.catId === 'baby-gifts' || p.id === 'prod-classic-teddy')) return true;
      if (selectedCatId === 'pouches-cosmetic' && (p.catId === 'pouches-cosmetic' || p.catId === 'pouches-cosmetic-bags')) return true;
      if (selectedCatId === 'kitchen-linen' && p.catId === 'kitchen-linen') return true;
      return false;
    });
  }, [selectedCatId]);

  return (
    <div className={`hm-page ${theme === 'dark' ? 'dark' : ''}`} id="hm-handmade-gifts-page">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="hm-toast">
          <Sparkles size={18} color="#FF1678" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          1. HERO SECTION
          ==================================================================== */}
      <section className="hm-hero-section">
        <div className="hm-container">
          <div className="hm-hero-grid">
            
            {/* Left Content */}
            <div className="hm-hero-left">
              <EucalyptusLeaves className="hm-hero-leaf-deco" />
              <span className="hm-eyebrow">STITCHBEEZ HANDMADE GIFTS</span>
              
              <h1 className="hm-hero-heading">
                Thoughtful Gifts,
                <span className="pink-text">Beautifully Stitched</span>
              </h1>
              
              <p className="hm-hero-desc">
                Unique handmade stitched gifts crafted with love by skilled artisans. 
                Personalize, customize and create one-of-a-kind gifts for every special moment.
              </p>

              {/* Three Benefit Badges */}
              <div className="hm-hero-benefits">
                <div className="hm-benefit-item">
                  <div className="hm-benefit-icon-wrap">
                    <Heart size={18} fill="#FF1678" />
                  </div>
                  <div className="hm-benefit-text">
                    Handmade<br />with Love
                  </div>
                </div>

                <div className="hm-benefit-item">
                  <div className="hm-benefit-icon-wrap">
                    <Type size={18} />
                  </div>
                  <div className="hm-benefit-text">
                    Personalised<br />for You
                  </div>
                </div>

                <div className="hm-benefit-item">
                  <div className="hm-benefit-icon-wrap">
                    <Award size={18} />
                  </div>
                  <div className="hm-benefit-text">
                    Verified<br />Artisans
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="hm-hero-cta-group">
                <button 
                  type="button"
                  className="hm-btn-primary"
                  onClick={scrollToFeatured}
                >
                  Shop Stitched Gifts <ArrowRight size={17} />
                </button>
                
                <button 
                  type="button"
                  className="hm-btn-secondary"
                  onClick={() => navigate('/handmade-gifts/customize')}
                >
                  Create Custom Gift
                </button>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="hm-hero-right">
              <div className="hm-hero-banner-wrap">
                <img 
                  src={handmadeGiftImages.hero} 
                  alt="StitchBeez Handmade Gifts Hero" 
                  className="hm-hero-banner-img"
                />
                
                <div className="hm-hero-image-overlay" />
                
                <div className="hm-hero-script-tag">
                  Stitched Emotions<br />
                  For Every Occasion... ♡
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          2. SHOP BY CATEGORY (8 Cards)
          ==================================================================== */}
      <section className="hm-categories-section">
        <div className="hm-container">
          <div className="hm-section-header">
            <span className="hm-eyebrow">EXPLORE COLLECTION</span>
            <h2 className="hm-heading">Shop by Category</h2>
            <p className="hm-subtitle">Find the perfect stitched gift or create your own custom design.</p>
          </div>

          <div className="hm-categories-row">
            {GIFT_CATEGORIES.map(cat => (
              <div 
                key={cat.id} 
                className={`hm-category-card ${selectedCatId === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <div className="hm-category-img-wrap">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="hm-category-img" 
                    loading="lazy"
                  />
                </div>
                <div className="hm-category-content">
                  <div className="hm-category-name">{cat.name}</div>
                  <div className="hm-category-desc">{cat.desc}</div>
                  <span className="hm-category-link">
                    {cat.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. FEATURED COLLECTION (6 Products)
          ==================================================================== */}
      <section className="hm-featured-section" id="hm-featured-collection">
        <div className="hm-container">
          
          <div className="hm-featured-top-row">
            <div>
              <span className="hm-eyebrow">FEATURED COLLECTION</span>
              <h2 className="hm-heading">
                {selectedCatId === 'all' 
                  ? 'Handmade Stitched Gifts, Ready for You' 
                  : `${GIFT_CATEGORIES.find(c => c.id === selectedCatId)?.name || 'Selected'} Collection`}
              </h2>
              <p className="hm-subtitle">
                {selectedCatId === 'all'
                  ? 'Carefully crafted with fine stitching and beautiful detailing.'
                  : `Handcrafted ${GIFT_CATEGORIES.find(c => c.id === selectedCatId)?.name || ''} designs made with authentic materials.`}
              </p>

              {selectedCatId !== 'all' && (
                <button 
                  type="button"
                  className="hm-filter-clear-pill"
                  onClick={() => setSelectedCatId('all')}
                  style={{
                    marginTop: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: 'rgba(255, 22, 120, 0.08)',
                    color: '#FF1678',
                    border: '1px solid rgba(255, 22, 120, 0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <X size={13} />
                  <span>Show All Stitched Gifts ({FEATURED_GIFTS.length})</span>
                </button>
              )}
            </div>
            
            <button 
              type="button"
              className="hm-view-all-link"
              onClick={() => {
                const targetCat = selectedCatId && selectedCatId !== 'all' ? selectedCatId : 'all';
                navigate(`/handmade-gifts/category/${targetCat}`);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="hm-products-grid">
            {filteredProducts.map(prod => {
              const activeColorIdx = selectedSwatches[prod.id] || 0;
              const isWishlisted = Array.isArray(wishlist) ? wishlist.includes(prod.id) : !!wishlist[prod.id];

              return (
                <div key={prod.id} className="hm-product-card">
                  
                  {/* Image with Wishlist Button */}
                  <div 
                    className="hm-product-img-wrap"
                    onClick={() => navigate(`/handmade-gifts/product/${prod.slug || prod.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={prod.img} 
                      alt={prod.name} 
                      className="hm-product-img" 
                      loading="lazy"
                    />
                    
                    <button 
                      type="button" 
                      className={`hm-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(prod.id, prod.name);
                      }}
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={16} fill={isWishlisted ? '#FF1678' : 'none'} color={isWishlisted ? '#FF1678' : '#1E293B'} />
                    </button>
                  </div>

                  {/* Body & Footer */}
                  <div className="hm-product-body">
                    <div 
                      className="hm-product-title"
                      onClick={() => navigate(`/handmade-gifts/product/${prod.slug || prod.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {prod.name}
                    </div>
                    <div className="hm-product-price">{prod.price}</div>
                    
                    <div className="hm-product-footer">
                      {/* Swatches */}
                      <div className="hm-swatches-row">
                        {prod.colors.map((c, idx) => (
                          <button
                            key={c.name}
                            type="button"
                            className={`hm-color-dot ${activeColorIdx === idx ? 'active' : ''}`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            onClick={() => {
                              setSelectedSwatches(prev => ({ ...prev, [prod.id]: idx }));
                              showToast(`Selected ${c.name} for ${prod.name}`);
                            }}
                          />
                        ))}
                      </div>

                      {/* Pink Cart Button */}
                      <button 
                        type="button"
                        className="hm-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddProductToCart(prod);
                        }}
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

        </div>
      </section>

      {/* ====================================================================
          4. CUSTOM STITCHED GIFT STUDIO
          ==================================================================== */}
      <section className="hm-studio-section" id="hm-custom-gift-studio">
        <div className="hm-container">
          
          <div className="hm-studio-layout">
            
            {/* Left Large Visual: Hands Embroidering */}
            <div className="hm-studio-left-img-wrap">
              <img 
                src={handmadeGiftImages.customStudio.embroideryLeft} 
                alt="Artisan embroidery craftsmanship" 
                className="hm-studio-left-img"
              />
              <div className="hm-studio-left-fade-overlay" />
            </div>

            {/* Center Content */}
            <div className="hm-studio-center">
              <span className="hm-eyebrow">CUSTOM STITCHED GIFT STUDIO</span>
              <h2 className="hm-studio-heading">
                Create Your<br />
                Dream Stitched Gift
              </h2>
              <p className="hm-studio-desc">
                Choose the style, fabric, colors, size and personalization. 
                Our artisans will bring your vision to life.
              </p>
              
              <button 
                type="button"
                className="hm-btn-primary"
                onClick={() => navigate('/handmade-gifts/customize')}
              >
                Start Customizing <ArrowRight size={17} />
              </button>
            </div>

            {/* Right Visual: Teddy Sketch in Hoop */}
            <div className="hm-studio-right-img-wrap">
              <img 
                src={handmadeGiftImages.customStudio.sketchRight} 
                alt="Your Idea Our Stitch" 
                className="hm-studio-right-img"
              />
              <div className="hm-studio-script-tag">
                Your Idea<br />Our Stitch ♡
              </div>
            </div>

          </div>

          {/* 5 Process Step Icons */}
          <div className="hm-studio-process-row">
            <div 
              className="hm-process-step-col"
              onClick={() => navigate('/handmade-gifts/customize?step=idea')}
              style={{ cursor: 'pointer' }}
            >
              <div className="hm-step-circle-icon">
                <Lightbulb size={22} />
              </div>
              <div className="hm-step-label">Upload Sketch or Idea</div>
            </div>

            <div 
              className="hm-process-step-col"
              onClick={() => navigate('/handmade-gifts/customize?step=fabric')}
              style={{ cursor: 'pointer' }}
            >
              <div className="hm-step-circle-icon">
                <Layers size={22} />
              </div>
              <div className="hm-step-label">Choose Fabric & Details</div>
            </div>

            <div 
              className="hm-process-step-col"
              onClick={() => navigate('/handmade-gifts/customize?step=personalization')}
              style={{ cursor: 'pointer' }}
            >
              <div className="hm-step-circle-icon">
                <Type size={22} />
              </div>
              <div className="hm-step-label">Add Personalization</div>
              <div className="hm-step-sublabel">(Name, Message)</div>
            </div>

            <div 
              className="hm-process-step-col"
              onClick={() => navigate('/handmade-gifts/customize?step=quote')}
              style={{ cursor: 'pointer' }}
            >
              <div className="hm-step-circle-icon">
                <Tag size={22} />
              </div>
              <div className="hm-step-label">Get Preview & Quote</div>
            </div>

            <div 
              className="hm-process-step-col"
              onClick={() => navigate('/handmade-gifts/customize?step=size')}
              style={{ cursor: 'pointer' }}
            >
              <div className="hm-step-circle-icon">
                <Truck size={22} />
              </div>
              <div className="hm-step-label">Handcrafted & Delivered</div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          5. PREMIUM FABRICS FOR EVERY GIFT (10 Materials Carousel)
          ==================================================================== */}
      <section className="hm-fabrics-section">
        <div className="hm-container">
          
          <div className="hm-section-header">
            <span className="hm-eyebrow">STITCHED MATERIAL OPTIONS</span>
            <h2 className="hm-heading">Premium Fabrics for Every Gift</h2>
            <p className="hm-subtitle">
              High-quality fabrics handpicked to create beautiful and long-lasting stitched gifts.
            </p>
          </div>

          <div className="hm-fabrics-carousel-wrap">
            
            {/* Left Nav Arrow */}
            <button 
              type="button"
              className="hm-carousel-arrow prev"
              onClick={() => scrollFabrics('left')}
              title="Previous fabrics"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Scrollable Container */}
            <div className="hm-fabrics-scroll-container" ref={fabricsScrollRef}>
              {FABRIC_OPTIONS.map(fabric => (
                <div 
                  key={fabric.id}
                  className={`hm-fabric-card ${selectedFabric === fabric.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedFabric(fabric.id);
                    navigate(`/handmade-gifts/customize?fabric=${fabric.id}`);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="hm-fabric-img-wrap">
                    <img 
                      src={fabric.img} 
                      alt={fabric.name} 
                      className="hm-fabric-img" 
                      loading="lazy"
                    />
                  </div>
                  <div className="hm-fabric-name">{fabric.name}</div>
                </div>
              ))}
            </div>

            {/* Right Nav Arrow */}
            <button 
              type="button"
              className="hm-carousel-arrow next"
              onClick={() => scrollFabrics('right')}
              title="Next fabrics"
            >
              <ChevronRight size={20} />
            </button>

          </div>

        </div>
      </section>

      {/* ====================================================================
          6. HOW IT WORKS (From Idea to Your Stitched Gift)
          ==================================================================== */}
      <section className="hm-how-it-works-section">
        <div className="hm-container">
          
          <div className="hm-how-grid">
            
            {/* Left Steps */}
            <div className="hm-how-left">
              <span className="hm-eyebrow">HOW IT WORKS</span>
              <h2 className="hm-heading">From Idea to Your Stitched Gift</h2>
              <p className="hm-subtitle">
                A simple and transparent process to create or buy your perfect handmade gift.
              </p>

              <div className="hm-how-steps-row">
                {GIFT_PROCESS_STEPS.map((item, idx) => {
                  const Icon = item.icon;
                  const isChoose = item.step.includes("Choose");
                  const isCustomize = item.step.includes("Customize");
                  return (
                    <React.Fragment key={item.step}>
                      <div 
                        className="hm-how-step-item"
                        onClick={() => {
                          if (isChoose) scrollToFeatured();
                          else if (isCustomize) navigate('/handmade-gifts/customize');
                        }}
                        style={{ cursor: isChoose || isCustomize ? 'pointer' : 'default' }}
                      >
                        <div className="hm-how-step-icon">
                          <Icon size={20} />
                        </div>
                        <div className="hm-how-step-num-title">{item.step}</div>
                        <p className="hm-how-step-desc">{item.desc}</p>
                      </div>
                      
                      {idx < GIFT_PROCESS_STEPS.length - 1 && (
                        <div className="hm-how-arrow">→</div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Right Image */}
            <div className="hm-how-right">
              <img 
                src={handmadeGiftImages.howItWorks} 
                alt="Artisan embroidering gift" 
                className="hm-how-artisan-img" 
                loading="lazy"
              />
              <div className="hm-how-fade-overlay" />
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          7. LIFESTYLE BANNER ("MORE THAN GIFTS, IT'S A FEELING")
          ==================================================================== */}
      <section className="hm-lifestyle-section">
        <div className="hm-container">
          
          <div className="hm-lifestyle-banner">
            
            <div className="hm-lifestyle-left">
              <EucalyptusLeaves className="hm-lifestyle-leaf-deco" />
              
              <h2 className="hm-lifestyle-heading">
                More Than Gifts,<br />
                It’s a Feeling
              </h2>
              
              <p className="hm-lifestyle-desc">
                Stitched with love, made to be cherished. 
                Perfect for every occasion and every relationship.
              </p>
              
              <button 
                type="button"
                className="hm-btn-primary"
                onClick={scrollToFeatured}
              >
                Shop Stitched Gifts <ArrowRight size={17} />
              </button>
            </div>

            <div className="hm-lifestyle-right">
              <img 
                src={handmadeGiftImages.lifestyle} 
                alt="More than gifts lifestyle collection" 
                className="hm-lifestyle-img" 
                loading="lazy"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          8. CUSTOMER REVIEWS (3 Cards)
          ==================================================================== */}
      <section className="hm-reviews-section">
        <div className="hm-container">
          
          <div className="hm-reviews-top-row">
            <div>
              <span className="hm-eyebrow">LOVED BY OUR CUSTOMERS</span>
              <h2 className="hm-heading">Real People. Real Gifts.</h2>
              <p className="hm-subtitle">
                See how our handmade stitched gifts have become a part of their special moments.
              </p>
            </div>

            <button 
              type="button"
              className="hm-view-all-link"
              onClick={() => setIsReviewsModalOpen(true)}
              style={{ background: 'none', border: 'none' }}
            >
              View More Reviews <ArrowRight size={16} />
            </button>
          </div>

          <div className="hm-reviews-grid">
            {REVIEWS_DATA.map(rev => (
              <div key={rev.id} className="hm-review-card">
                
                <div className="hm-review-top">
                  <img 
                    src={rev.avatar} 
                    alt={rev.author} 
                    className="hm-review-avatar" 
                  />
                  <div className="hm-review-stars">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} size={15} fill="#F59E0B" stroke="#F59E0B" />
                    ))}
                  </div>
                </div>

                <div className="hm-review-quote">
                  “{rev.quote}”
                </div>

                <div className="hm-review-footer">
                  <div className="hm-reviewer-info">
                    <span className="hm-reviewer-name">{rev.author}</span>
                    <span className="hm-reviewer-city">
                      <MapPin size={11} color="#FF1678" /> {rev.city}
                    </span>
                  </div>

                  <img 
                    src={rev.productThumb} 
                    alt="Reviewed product" 
                    className="hm-review-product-thumb" 
                  />
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================================
          9. FINAL BOTTOM CTA BANNER
          ==================================================================== */}
      <section className="hm-bottom-cta-section">
        <div className="hm-container">
          
          <div className="hm-bottom-banner">
            
            {/* Left Craft Supplies Image */}
            <div className="hm-bottom-left-img-wrap">
              <img 
                src={handmadeGiftImages.bottomCTA} 
                alt="Handmade craft desk and thread spools" 
                className="hm-bottom-left-img" 
              />
              <div className="hm-bottom-fade-overlay" />
            </div>

            {/* Center Heading & Subtitle */}
            <div className="hm-bottom-center-text">
              <h2 className="hm-bottom-heading">Gift Happiness, Stitch by Stitch</h2>
              <p className="hm-bottom-subtitle">
                Explore our handmade collection or create your own custom design today.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="hm-bottom-right-btns">
              <button 
                type="button"
                className="hm-btn-primary"
                onClick={scrollToFeatured}
              >
                Shop Stitched Gifts <ArrowRight size={16} />
              </button>

              <button 
                type="button"
                className="hm-btn-outline-white"
                onClick={() => navigate('/handmade-gifts/customize')}
              >
                Create Custom Gift →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          10. CUSTOM GIFT STUDIO MODAL (INTERACTIVE WIZARD)
          ==================================================================== */}
      {isCustomModalOpen && (
        <div className="hm-modal-overlay" onClick={() => setIsCustomModalOpen(false)}>
          <div className="hm-modal-content" onClick={e => e.stopPropagation()}>
            
            <div className="hm-modal-header">
              <div>
                <span className="hm-eyebrow">CUSTOM STITCHED GIFT STUDIO</span>
                <h3 className="hm-modal-title">Design Your Custom Keepsake</h3>
              </div>
              <button 
                type="button" 
                className="hm-modal-close-btn"
                onClick={() => setIsCustomModalOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="hm-modal-body">
              
              {/* Gift Item Type */}
              <div className="hm-form-group">
                <label className="hm-form-label">1. Choose Gift Item</label>
                <select 
                  className="hm-form-select"
                  value={customForm.giftType}
                  onChange={e => setCustomForm(prev => ({ ...prev, giftType: e.target.value }))}
                >
                  <option value="Handmade Teddy Bear">Handmade Teddy Bear (Classic 14-inch)</option>
                  <option value="Embroidered Cushion Cover">Embroidered Cushion Cover (16x16 in)</option>
                  <option value="Custom Name Tote Bag">Custom Name Tote Bag (Heavy Canvas)</option>
                  <option value="Zippered Cosmetic Pouch">Zippered Cosmetic Pouch (Velvet/Cotton)</option>
                  <option value="Personalized Keepsake Quilt">Personalized Keepsake Quilt</option>
                  <option value="Custom Baby Bib">Custom Baby Bib with Initial</option>
                  <option value="Embroidered Kitchen Apron">Embroidered Kitchen Linen Apron</option>
                </select>
              </div>

              {/* Fabric Picker */}
              <div className="hm-form-group">
                <label className="hm-form-label">2. Select Premium Fabric ({customForm.fabric})</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                  {FABRIC_OPTIONS.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setCustomForm(prev => ({ ...prev, fabric: f.name }))}
                      style={{
                        padding: '6px',
                        border: customForm.fabric === f.name ? '2px solid #FF1678' : '1px solid #E2E8F0',
                        borderRadius: '8px',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <img 
                        src={f.img} 
                        alt={f.name} 
                        style={{ width: '100%', height: '36px', objectFit: 'cover', borderRadius: '4px' }} 
                      />
                      <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personalization Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="hm-form-group">
                  <label className="hm-form-label">3. Recipient Name / Initial</label>
                  <input 
                    type="text"
                    className="hm-form-input"
                    value={customForm.recipientName}
                    placeholder="e.g. Priya or P"
                    onChange={e => setCustomForm(prev => ({ ...prev, recipientName: e.target.value }))}
                  />
                </div>

                <div className="hm-form-group">
                  <label className="hm-form-label">Thread / Accent Color</label>
                  <select 
                    className="hm-form-select"
                    value={customForm.primaryColor}
                    onChange={e => setCustomForm(prev => ({ ...prev, primaryColor: e.target.value }))}
                  >
                    <option value="Golden Zari">Golden Zari (Shimmer)</option>
                    <option value="Rose Gold Silk">Rose Gold Silk</option>
                    <option value="Emerald Green">Emerald Green</option>
                    <option value="Blush Pink">Blush Pink</option>
                    <option value="Rich Burgundy">Rich Burgundy</option>
                    <option value="Navy Indigo">Navy Indigo</option>
                  </select>
                </div>
              </div>

              {/* Custom Monogram / Message */}
              <div className="hm-form-group">
                <label className="hm-form-label">4. Monogram or Custom Embroidered Message</label>
                <input 
                  type="text"
                  className="hm-form-input"
                  value={customForm.personalizationText}
                  placeholder="e.g. Best Friends Forever, Est. 2026"
                  onChange={e => setCustomForm(prev => ({ ...prev, personalizationText: e.target.value }))}
                />
              </div>

              {/* Special Instructions & Upload */}
              <div className="hm-form-group">
                <label className="hm-form-label">5. Artisan Notes / Special Requests</label>
                <textarea 
                  className="hm-form-textarea"
                  rows={2}
                  value={customForm.notes}
                  placeholder="Describe thread style, motifs (e.g. daisies, monograms), or packaging preferences..."
                  onChange={e => setCustomForm(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

            </div>

            <div className="hm-modal-footer">
              <div className="hm-modal-price-box">
                <span className="hm-modal-price-val">₹1,499</span>
                <span className="hm-modal-price-note">Estimated handcrafting: 3–5 business days</span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button"
                  className="hm-btn-secondary"
                  onClick={() => setIsCustomModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className="hm-btn-primary"
                  onClick={() => {
                    if (onAddToCart) {
                      onAddToCart({
                        id: `custom-gift-${Date.now()}`,
                        name: `Custom ${customForm.giftType}`,
                        price: 1499,
                        color: customForm.primaryColor,
                        fabric: customForm.fabric,
                        personalization: customForm.personalizationText,
                        image: handmadeGiftImages.customStudio.sketchRight,
                        category: 'Custom Stitched Gifts'
                      });
                    }
                    setIsCustomModalOpen(false);
                    showToast(`Custom ${customForm.giftType} added to your cart! 🎁`);
                  }}
                >
                  Add Custom Creation to Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================================
          11. ALL REVIEWS MODAL
          ==================================================================== */}
      {isReviewsModalOpen && (
        <div className="hm-modal-overlay" onClick={() => setIsReviewsModalOpen(false)}>
          <div className="hm-modal-content" onClick={e => e.stopPropagation()}>
            <div className="hm-modal-header">
              <div>
                <span className="hm-eyebrow">CUSTOMER STORIES</span>
                <h3 className="hm-modal-title">Verified Customer Experiences</h3>
              </div>
              <button 
                type="button" 
                className="hm-modal-close-btn"
                onClick={() => setIsReviewsModalOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="hm-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {REVIEWS_DATA.concat([
                {
                  id: "rev-4",
                  author: "Aditi Sharma",
                  city: "Mumbai",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
                  quote: "Ordered 12 customized potli bags for my sister's wedding return gifts. Each was finished to perfection!",
                  productThumb: handmadeGiftImages.products.cosmeticPouch,
                  stars: 5
                },
                {
                  id: "rev-5",
                  author: "Kavita Rao",
                  city: "Pune",
                  avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
                  quote: "The organic linen apron and towels have that authentic European country house aesthetic. Love the stitching!",
                  productThumb: handmadeGiftImages.categories.kitchen,
                  stars: 5
                }
              ]).map(r => (
                <div key={r.id} className="hm-review-card" style={{ marginBottom: '14px' }}>
                  <div className="hm-review-top">
                    <img src={r.avatar} alt={r.author} className="hm-review-avatar" />
                    <div>
                      <div className="hm-reviewer-name">{r.author}</div>
                      <div className="hm-review-stars">
                        {[...Array(r.stars)].map((_, i) => (
                          <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="hm-review-quote">“{r.quote}”</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#64748B' }}>
                    <span>Verified StitchBeez Buyer • {r.city}</span>
                    <img src={r.productThumb} alt="Product" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="hm-modal-footer">
              <button 
                type="button" 
                className="hm-btn-primary" 
                style={{ width: '100%' }}
                onClick={() => setIsReviewsModalOpen(false)}
              >
                Close Reviews
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
