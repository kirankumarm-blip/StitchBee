import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingCart, ArrowRight, Check, Star, 
  ChevronLeft, ChevronRight, X, Sparkles, Sliders,
  Upload, Scissors, Compass, ShieldCheck, MapPin,
  Ruler, Eye, Award, HelpCircle
} from 'lucide-react';
import './PetOutfitsPage.css';
import { getWishlist, toggleWishlist } from '../../utils/bagsStore';
import { 
  PET_CATEGORIES, 
  ALL_PET_PRODUCTS, 
  PET_FABRICS, 
  PET_REVIEWS, 
  addPetOutfitToCart 
} from '../../utils/petOutfitsStore';

export const petAssets = {
  hero: "/assets/pets/hero_page.png",
  categories: {
    dogOutfits: "/assets/pets/cat_dog_outfits.png",
    catOutfits: "/assets/pets/cat_cat_outfits.png",
    shirts: "/assets/pets/cat_shirts.png",
    dresses: "/assets/pets/cat_dresses.png",
    hoodies: "/assets/pets/cat_hoodies.png",
    festive: "/assets/pets/cat_festive.png",
    accessories: "/assets/pets/cat_accessories.png",
    customDesign: "/assets/pets/cat_custom_design.png"
  },
  products: {
    casualDogShirt: "/assets/pets/prod_casual_dog_shirt.png",
    floralPetDress: "/assets/pets/prod_floral_dress.png",
    petHoodie: "/assets/pets/prod_pet_hoodie.png",
    traditionalPetKurta: "/assets/pets/prod_pet_kurta.png",
    festivePetLehenga: "/assets/pets/prod_pet_lehenga.png",
    personalizedPetShirt: "/assets/pets/prod_personalized_tshirt.png"
  },
  customStudio: {
    left: "/assets/pets/studio_dream_outfit_left.png",
    right: "/assets/pets/studio_dream_outfit_right.png"
  },
  howItWorks: "/assets/pets/how_it_works.png",
  lifestyleBanner: "/assets/pets/lifestyle_banner.png",
  finalCTA: {
    toys: "/assets/pets/bottom_toys.png"
  }
};

// Hero Badges & Decorative Strip matching Master Reference Screenshot
const HeartBadgeIcon = () => (
  <div className="pet-feature-icon-circle">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
        fill="#FF1684" 
        stroke="#14213D" 
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const TapeBadgeIcon = () => (
  <div className="pet-feature-icon-circle">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <g transform="rotate(-30 12 12)">
        <rect x="2" y="7" width="20" height="10" rx="5" fill="#FF1684" stroke="#14213D" strokeWidth="1.5" />
        <line x1="7" y1="7" x2="7" y2="17" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="11" y1="7" x2="11" y2="13" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="15" y1="7" x2="15" y2="17" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="18" cy="12" r="2.2" fill="#FFFFFF" stroke="#14213D" strokeWidth="1" />
      </g>
    </svg>
  </div>
);

const AwardBadgeIcon = () => (
  <div className="pet-feature-icon-circle">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 13.5L6 21L11 19.5L12 15" fill="#FF1684" stroke="#14213D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M15 13.5L18 21L13 19.5L12 15" fill="#E01171" stroke="#14213D" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="6" fill="#FF1684" stroke="#14213D" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.6" fill="#FFFFFF" stroke="#14213D" strokeWidth="1.2" />
    </svg>
  </div>
);

const PetHeroDeco = () => (
  <div className="pet-hero-deco-strip" aria-hidden="true">
    <svg width="40" height="380" viewBox="0 0 40 380" fill="none">
      {/* Top Paw */}
      <g transform="translate(4, 12)">
        <ellipse cx="16" cy="18" rx="9" ry="7.5" fill="#FFA3BD" opacity="0.9" />
        <circle cx="8" cy="7" r="3.4" fill="#FFA3BD" opacity="0.9" />
        <circle cx="14" cy="4" r="3.6" fill="#FFA3BD" opacity="0.9" />
        <circle cx="20" cy="4" r="3.6" fill="#FFA3BD" opacity="0.9" />
        <circle cx="25" cy="7" r="3.4" fill="#FFA3BD" opacity="0.9" />
      </g>

      {/* Upper Botanical Leaves */}
      <g transform="translate(4, 52)">
        <path d="M12 85 C18 60 24 35 18 10" stroke="#7E9A75" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="24" cy="65" rx="6.5" ry="11" fill="#8FA986" transform="rotate(35 24 65)" opacity="0.85" />
        <ellipse cx="8" cy="50" rx="6" ry="10" fill="#A4BCA0" transform="rotate(-30 8 50)" opacity="0.85" />
        <ellipse cx="22" cy="35" rx="6" ry="10" fill="#7E9A75" transform="rotate(25 22 35)" opacity="0.85" />
        <ellipse cx="10" cy="20" rx="5" ry="8.5" fill="#8FA986" transform="rotate(-25 10 20)" opacity="0.85" />
      </g>

      {/* Middle Paw */}
      <g transform="translate(4, 155)">
        <ellipse cx="16" cy="18" rx="9" ry="7.5" fill="#FF8CAE" opacity="0.9" />
        <circle cx="8" cy="7" r="3.4" fill="#FF8CAE" opacity="0.9" />
        <circle cx="14" cy="4" r="3.6" fill="#FF8CAE" opacity="0.9" />
        <circle cx="20" cy="4" r="3.6" fill="#FF8CAE" opacity="0.9" />
        <circle cx="25" cy="7" r="3.4" fill="#FF8CAE" opacity="0.9" />
      </g>

      {/* Lower Botanical Leaves */}
      <g transform="translate(4, 195)">
        <path d="M14 85 C8 60 14 35 20 10" stroke="#7E9A75" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="8" cy="65" rx="6.5" ry="11" fill="#8FA986" transform="rotate(-35 8 65)" opacity="0.85" />
        <ellipse cx="22" cy="50" rx="6" ry="10" fill="#A4BCA0" transform="rotate(30 22 50)" opacity="0.85" />
        <ellipse cx="10" cy="35" rx="6" ry="10" fill="#7E9A75" transform="rotate(-25 10 35)" opacity="0.85" />
        <ellipse cx="20" cy="20" rx="5" ry="8.5" fill="#8FA986" transform="rotate(25 20 20)" opacity="0.85" />
      </g>

      {/* Bottom Paw */}
      <g transform="translate(4, 305)">
        <ellipse cx="16" cy="18" rx="9" ry="7.5" fill="#FFA3BD" opacity="0.9" />
        <circle cx="8" cy="7" r="3.4" fill="#FFA3BD" opacity="0.9" />
        <circle cx="14" cy="4" r="3.6" fill="#FFA3BD" opacity="0.9" />
        <circle cx="20" cy="4" r="3.6" fill="#FFA3BD" opacity="0.9" />
        <circle cx="25" cy="7" r="3.4" fill="#FFA3BD" opacity="0.9" />
      </g>
    </svg>
  </div>
);

export default function PetOutfitsPage({
  currentUser,
  theme = 'light',
  onAddToCart,
  onDirectCheckout,
  onLoginRequired
}) {
  const navigate = useNavigate();

  // Category Filtering State
  const [selectedCatId, setSelectedCatId] = useState('all');

  // Wishlist State (synced with global store)
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

  // Product Swatches State (productId -> colorIdx)
  const [selectedSwatches, setSelectedSwatches] = useState({
    "prod-casual-dog-shirt": 0,
    "prod-floral-pet-dress": 0,
    "prod-pet-hoodie": 0,
    "prod-pet-kurta": 0,
    "prod-pet-lehenga": 0,
    "prod-personalized-tshirt": 0
  });

  // Fabric Carousel Ref & Modals
  const fabricsScrollRef = useRef(null);
  const [selectedFabricModal, setSelectedFabricModal] = useState(null);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleWishlistToggle = (productId, productName) => {
    const { updated, added } = toggleWishlist(productId);
    setWishlist(updated);
    showToast(added ? `Saved "${productName}" to your Wishlist ❤️` : `Removed "${productName}" from Wishlist`);
  };

  const handleAddProductToCart = (product) => {
    const activeColorIdx = selectedSwatches[product.id] || 0;
    const chosenColor = product.colors[activeColorIdx]?.name || 'Standard';
    addPetOutfitToCart(product, {
      color: chosenColor,
      size: 'M',
      quantity: 1
    });
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        color: chosenColor,
        image: product.img,
        category: 'Pet Outfits'
      });
    }
    showToast(`Added ${product.name} (${chosenColor}) to Cart 🛍️`);
  };

  const handleCategoryClick = (category) => {
    if (category.isCustom || category.id === 'custom') {
      const studioTarget = document.getElementById('pet-custom-studio');
      if (studioTarget) {
        studioTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/pet-outfits/customize');
      }
      return;
    }

    const nextCat = selectedCatId === category.id ? 'all' : category.id;
    setSelectedCatId(nextCat);

    const target = document.getElementById('pet-featured-collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (nextCat !== 'all') {
      showToast(`Showing ${category.name}`);
    } else {
      showToast('Showing all outfits');
    }
  };

  const scrollFabrics = (direction) => {
    if (fabricsScrollRef.current) {
      const amount = direction === 'left' ? -280 : 280;
      fabricsScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const scrollToFeatured = () => {
    const target = document.getElementById('pet-featured-collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCatId === 'all') return ALL_PET_PRODUCTS;
    return ALL_PET_PRODUCTS.filter(p => {
      if (p.catId === selectedCatId || p.categorySlug === selectedCatId) return true;
      if (selectedCatId === 'dog-outfits' && (p.catId === 'dog-outfits' || p.petType.includes('Dog'))) return true;
      if (selectedCatId === 'cat-outfits' && (p.catId === 'dresses' || p.petType.includes('Cat'))) return true;
      if (selectedCatId === 'shirts' && (p.catId === 'shirts' || p.id === 'prod-casual-dog-shirt')) return true;
      if (selectedCatId === 'dresses' && p.catId === 'dresses') return true;
      if (selectedCatId === 'hoodies' && p.catId === 'hoodies') return true;
      if (selectedCatId === 'traditional' && p.catId === 'traditional') return true;
      if (selectedCatId === 'accessories' && (p.id === 'prod-floral-pet-dress' || p.id === 'prod-pet-kurta')) return true;
      return false;
    });
  }, [selectedCatId]);

  const activeCategory = PET_CATEGORIES.find(c => c.id === selectedCatId);

  return (
    <div className={`pet-page ${theme === 'dark' ? 'dark' : ''}`} id="pet-outfits-page">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="pet-toast">
          <Sparkles size={18} color="#FF1684" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          1. HERO SECTION (MATCHING REFERENCE SCREENSHOT EXACTLY)
          ==================================================================== */}
      <section className="pet-hero-section">
        {/* Full-width background image anchored right with natural dimensions */}
        <div className="pet-hero-bg-wrap">
          <img 
            src={petAssets.hero} 
            alt="StitchBeez Pet Outfits Hero" 
            className="pet-hero-bg-img"
          />
          <div className="pet-hero-gradient-overlay" />
        </div>

        <div className="pet-container pet-hero-container">
          {/* Decorative Paw & Botanical Leaf Strip on left margin */}
          <PetHeroDeco />

          {/* Left Hero Content */}
          <div className="pet-hero-content">
            <span className="pet-eyebrow">STITCHBEEZ PET OUTFITS</span>
            
            <h1 className="pet-hero-heading">
              Style Made for<br />
              <span className="pink-text">Every Paw</span>
            </h1>
            
            <p className="pet-hero-desc">
              Adorable, comfortable and custom-made outfits for your furry friends. 
              From everyday wear to festive looks, create unique styles that match their personality.
            </p>

            {/* 3 Key Feature Badges matching reference screenshot */}
            <div className="pet-hero-features">
              <div className="pet-feature-badge">
                <HeartBadgeIcon />
                <span className="pet-feature-text">Pet-Friendly<br />Fabrics</span>
              </div>

              <div className="pet-feature-badge">
                <TapeBadgeIcon />
                <span className="pet-feature-text">Custom Fit<br />for Every Pet</span>
              </div>

              <div className="pet-feature-badge">
                <AwardBadgeIcon />
                <span className="pet-feature-text">Verified<br />Tailors</span>
              </div>
            </div>

            {/* Hero Action Buttons */}
            <div className="pet-hero-cta-group">
              <button 
                type="button"
                className="pet-btn-primary"
                onClick={scrollToFeatured}
              >
                Shop Pet Outfits →
              </button>
              
              <button 
                type="button"
                className="pet-btn-secondary"
                onClick={() => navigate('/pet-outfits/customize')}
              >
                Create Custom Outfit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. SHOP BY CATEGORY (8 Cards)
          ==================================================================== */}
      <section className="pet-categories-section">
        <div className="pet-container">
          <div className="pet-section-header">
            <span className="pet-eyebrow">EXPLORE COLLECTION</span>
            <h2 className="pet-heading">Shop by Category</h2>
            <p className="pet-subtitle">Find the perfect outfit for your pet or create your own custom design.</p>
          </div>

          <div className="pet-categories-row">
            {PET_CATEGORIES.map(cat => (
              <div 
                key={cat.id} 
                className={`pet-category-card ${selectedCatId === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <div className="pet-cat-img-box">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="pet-cat-img" 
                    loading="lazy"
                  />
                </div>
                <div className="pet-cat-content">
                  <div className="pet-cat-name">{cat.name}</div>
                  <div className="pet-cat-desc">{cat.desc}</div>
                  <span className="pet-cat-link">
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
      <section className="pet-featured-section" id="pet-featured-collection">
        <div className="pet-container">
          
          <div className="pet-featured-top-row">
            <div>
              <span className="pet-eyebrow">FEATURED COLLECTION</span>
              <h2 className="pet-heading">
                {selectedCatId === 'all' 
                  ? 'Adorable Outfits, Ready for Your Pet' 
                  : `${activeCategory?.name || 'Selected'} Collection`}
              </h2>
              <p className="pet-subtitle">
                {selectedCatId === 'all'
                  ? 'Handcrafted with love, using premium fabrics and fine detailing.'
                  : `Handcrafted ${activeCategory?.name || ''} designs made with authentic pet-friendly materials.`}
              </p>

              {selectedCatId !== 'all' && (
                <button 
                  type="button"
                  className="pet-filter-clear-pill"
                  onClick={() => setSelectedCatId('all')}
                >
                  <X size={13} />
                  <span>Show All Outfits ({ALL_PET_PRODUCTS.length})</span>
                </button>
              )}
            </div>
            
            <button 
              type="button"
              className="pet-view-all-link"
              onClick={() => {
                const targetCat = selectedCatId && selectedCatId !== 'all' ? selectedCatId : 'all';
                navigate(`/pet-outfits/category/${targetCat}`);
              }}
            >
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="pet-products-grid">
            {filteredProducts.map(prod => {
              const activeColorIdx = selectedSwatches[prod.id] || 0;
              const isWishlisted = Array.isArray(wishlist) ? wishlist.includes(prod.id) : !!wishlist[prod.id];

              return (
                <div key={prod.id} className="pet-product-card">
                  
                  {/* Image with Wishlist Button */}
                  <div 
                    className="pet-prod-img-wrap"
                    onClick={() => navigate(`/pet-outfits/product/${prod.slug || prod.id}`)}
                  >
                    <img 
                      src={prod.img} 
                      alt={prod.name} 
                      className="pet-prod-img" 
                      loading="lazy"
                    />
                    
                    <button 
                      type="button" 
                      className="pet-wishlist-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(prod.id, prod.name);
                      }}
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={16} fill={isWishlisted ? '#FF1684' : 'none'} color={isWishlisted ? '#FF1684' : '#14213D'} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="pet-prod-info">
                    <div 
                      className="pet-prod-name"
                      onClick={() => navigate(`/pet-outfits/product/${prod.slug || prod.id}`)}
                    >
                      {prod.name}
                    </div>

                    {/* Color Swatches */}
                    <div className="pet-swatches-row">
                      {prod.colors?.map((c, idx) => (
                        <div 
                          key={c.name}
                          className={`pet-swatch-dot ${activeColorIdx === idx ? 'active' : ''}`}
                          style={{ backgroundColor: c.hex }}
                          onClick={() => setSelectedSwatches(prev => ({ ...prev, [prod.id]: idx }))}
                          title={c.name}
                        />
                      ))}
                    </div>

                    {/* Price & Cart CTA */}
                    <div className="pet-prod-price-row">
                      <span className="pet-prod-price">₹{prod.price}</span>
                      
                      <button 
                        type="button"
                        className="pet-cart-btn"
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
          4. CUSTOM PET OUTFIT STUDIO
          ==================================================================== */}
      <section className="pet-studio-section" id="pet-custom-studio">
        <div className="pet-container">
          
          <div className="pet-studio-layout">
            
            {/* Left Image: Tailoring Table with Natural Visibility */}
            <div className="pet-studio-left-wrap">
              <img 
                src={petAssets.customStudio.left} 
                alt="Pet tailoring craftsmanship" 
                className="pet-studio-left-img"
              />
            </div>

            {/* Center Content */}
            <div className="pet-studio-center">
              <span className="pet-eyebrow">CUSTOM PET OUTFIT STUDIO</span>
              <h2 className="pet-heading">
                Create Your<br />
                Pet’s Dream Outfit
              </h2>
              <p className="pet-studio-desc">
                Choose the style, fabric, size, colors and personalization. 
                Our expert tailors will craft a perfect outfit for your furry friend.
              </p>
              
              <button 
                type="button"
                className="pet-btn-primary"
                onClick={() => navigate('/pet-outfits/customize')}
              >
                Start Customizing <ArrowRight size={17} />
              </button>
            </div>

            {/* Right Circular Badge */}
            <div className="pet-studio-right-wrap">
              <div className="pet-studio-badge-img-box">
                <img 
                  src={petAssets.customStudio.right} 
                  alt="Pet outfit design badge" 
                  className="pet-studio-badge-img"
                />
              </div>
              <div className="pet-studio-script-tag">
                Your Pet<br />
                Our Design<br />
                Their Style ♡
              </div>
            </div>

          </div>

          {/* 6 Steps Row underneath Studio */}
          <div className="pet-studio-steps-row">
            <div className="pet-step-item">
              <div className="pet-step-icon-box">📷</div>
              <div className="pet-step-label">Upload Pet Photo</div>
              <div className="pet-step-sub">Share their cute look</div>
            </div>

            <div className="pet-step-item">
              <div className="pet-step-icon-box">👕</div>
              <div className="pet-step-label">Choose Outfit & Style</div>
              <div className="pet-step-sub">Kurtas, dresses, hoodies</div>
            </div>

            <div className="pet-step-item">
              <div className="pet-step-icon-box">📏</div>
              <div className="pet-step-label">Enter Measurements</div>
              <div className="pet-step-sub">Perfect Fit Guaranteed</div>
            </div>

            <div className="pet-step-item">
              <div className="pet-step-icon-box">🧵</div>
              <div className="pet-step-label">Select Fabric & Color</div>
              <div className="pet-step-sub">Soft, skin-safe weaves</div>
            </div>

            <div className="pet-step-item">
              <div className="pet-step-icon-box">✍️</div>
              <div className="pet-step-label">Add Name / Personalization</div>
              <div className="pet-step-sub">Embroidered with love</div>
            </div>

            <div className="pet-step-item">
              <div className="pet-step-icon-box">🎁</div>
              <div className="pet-step-label">Preview & Get Quote</div>
              <div className="pet-step-sub">Fast doorstep delivery</div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          5. PREMIUM FABRICS CAROUSEL (8 Fabrics)
          ==================================================================== */}
      <section className="pet-fabrics-section">
        <div className="pet-container">
          
          <div className="pet-section-header">
            <span className="pet-eyebrow">PET-FRIENDLY MATERIAL OPTIONS</span>
            <h2 className="pet-heading">Premium Fabrics for Happy & Comfortable Pets</h2>
            <p className="pet-subtitle">Soft, breathable and durable fabrics chosen especially for your pet's comfort.</p>
          </div>

          <div className="pet-fabrics-carousel-wrapper">
            <button 
              type="button"
              className="pet-carousel-arrow prev"
              onClick={() => scrollFabrics('left')}
              title="Previous fabrics"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="pet-fabrics-track" ref={fabricsScrollRef}>
              {PET_FABRICS.map(fabric => (
                <div 
                  key={fabric.id} 
                  className="pet-fabric-card"
                  onClick={() => setSelectedFabricModal(fabric)}
                >
                  <div className="pet-fabric-img-wrap">
                    <img 
                      src={fabric.img} 
                      alt={fabric.name} 
                      className="pet-fabric-img" 
                      loading="lazy"
                    />
                  </div>
                  <div className="pet-fabric-name">{fabric.name}</div>
                </div>
              ))}
            </div>

            <button 
              type="button"
              className="pet-carousel-arrow next"
              onClick={() => scrollFabrics('right')}
              title="Next fabrics"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </section>

      {/* ====================================================================
          6. HOW IT WORKS (From Idea to the Perfect Outfit)
          ==================================================================== */}
      <section className="pet-how-section">
        <div className="pet-container">
          <div className="pet-how-grid">
            
            {/* Left Steps */}
            <div>
              <span className="pet-eyebrow">HOW IT WORKS</span>
              <h2 className="pet-heading">From Idea to the Perfect Outfit</h2>
              <p className="pet-subtitle">A simple and transparent process to create or buy your pet's outfit.</p>

              <div className="pet-how-steps">
                <div className="pet-how-step-card">
                  <div className="pet-how-icon-box">🛍️</div>
                  <div className="pet-how-step-title">1. Choose</div>
                  <div className="pet-how-step-desc">Pick a ready design or create a custom outfit.</div>
                </div>

                <div className="pet-how-arrow">→</div>

                <div className="pet-how-step-card">
                  <div className="pet-how-icon-box">⚙️</div>
                  <div className="pet-how-step-title">2. Customize</div>
                  <div className="pet-how-step-desc">Select fabric, color, size and details.</div>
                </div>

                <div className="pet-how-arrow">→</div>

                <div className="pet-how-step-card">
                  <div className="pet-how-icon-box">🪡</div>
                  <div className="pet-how-step-title">3. Tailored</div>
                  <div className="pet-how-step-desc">Our expert tailors craft your pet's outfit.</div>
                </div>

                <div className="pet-how-arrow">→</div>

                <div className="pet-how-step-card">
                  <div className="pet-how-icon-box">📦</div>
                  <div className="pet-how-step-title">4. Delivered</div>
                  <div className="pet-how-step-desc">Securely packed and delivered to you.</div>
                </div>
              </div>
            </div>

            {/* Right Image with Natural Cat Visibility */}
            <div className="pet-how-right-wrap">
              <img 
                src={petAssets.howItWorks} 
                alt="Cat in bespoke stitched pink dress" 
                className="pet-how-right-img"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          7. LIFESTYLE BANNER
          ==================================================================== */}
      <section className="pet-lifestyle-section">
        <div className="pet-container">
          <div className="pet-lifestyle-card">
            <img 
              src={petAssets.lifestyleBanner} 
              alt="Pets wearing adorable handmade outfits" 
              className="pet-lifestyle-bg-img"
            />
            
            <div className="pet-lifestyle-content">
              <h2 className="pet-lifestyle-heading">
                More Than an Outfit,<br />
                It’s Their Personality
              </h2>
              <p className="pet-lifestyle-desc">
                Dress them in comfort, style and love. 
                Perfect for everyday moments and special occasions.
              </p>
              
              <button 
                type="button"
                className="pet-btn-primary"
                onClick={scrollToFeatured}
              >
                Shop Pet Outfits →
              </button>
            </div>

            <div className="pet-lifestyle-script-tag">
              Small<br />
              Outfits<br />
              Big<br />
              Personalities
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CUSTOMER REVIEWS (3 Cards)
          ==================================================================== */}
      <section className="pet-reviews-section">
        <div className="pet-container">
          
          <div className="pet-reviews-top-row">
            <div>
              <span className="pet-eyebrow">LOVED BY PET PARENTS</span>
              <h2 className="pet-heading">Real Pets. Real Happiness.</h2>
              <p className="pet-subtitle">See how our handmade pet outfits have made tails wag and hearts smile.</p>
            </div>

            <button 
              type="button"
              className="pet-view-all-link"
              onClick={() => setIsReviewsModalOpen(true)}
            >
              View More Reviews →
            </button>
          </div>

          <div className="pet-reviews-grid">
            {PET_REVIEWS.map(rev => (
              <div key={rev.id} className="pet-review-card">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="pet-rev-avatar" 
                />

                <div className="pet-rev-middle">
                  <div className="pet-rev-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <div className="pet-rev-text">"{rev.text}"</div>
                  <div className="pet-rev-author">{rev.name}</div>
                  <div className="pet-rev-location">{rev.location}</div>
                </div>

                <img 
                  src={rev.petImg} 
                  alt={`${rev.name}'s pet`} 
                  className="pet-rev-pet-photo" 
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================================
          9. FINAL CTA BANNER
          ==================================================================== */}
      <section className="pet-final-cta-section">
        <div className="pet-container">
          <div className="pet-final-cta-banner">
            
            <div className="pet-final-cta-left">
              <img 
                src={petAssets.finalCTA.toys} 
                alt="Pet toys and accessories" 
                className="pet-final-cta-toys-img"
              />
              <div>
                <h3 className="pet-final-cta-title" style={{ color: '#FFFFFF', margin: '0 0 6px', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Dress Them in Something Special
                </h3>
                <p className="pet-final-cta-desc" style={{ color: '#E2E8F0', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                  Explore our pet outfit collection or create a custom design today.
                </p>
              </div>
            </div>

            <div className="pet-final-cta-buttons">
              <button 
                type="button"
                className="pet-btn-primary"
                onClick={scrollToFeatured}
              >
                Shop Pet Outfits →
              </button>

              <button 
                type="button"
                className="pet-btn-cta-custom"
                onClick={() => navigate('/pet-outfits/customize')}
                style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.14)' }}
              >
                Create Custom Outfit →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          FABRIC DETAIL MODAL
          ==================================================================== */}
      {selectedFabricModal && (
        <div className="pet-modal-overlay" onClick={() => setSelectedFabricModal(null)}>
          <div className="pet-modal-card" onClick={e => e.stopPropagation()}>
            <button 
              type="button"
              className="pet-modal-close-btn"
              onClick={() => setSelectedFabricModal(null)}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
              <img 
                src={selectedFabricModal.img} 
                alt={selectedFabricModal.name} 
                style={{ width: '100px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div>
                <span className="pet-eyebrow">FABRIC SPECIFICATION</span>
                <h3 style={{ margin: '4px 0', fontSize: '1.4rem', color: 'var(--pet-text-heading)' }}>
                  {selectedFabricModal.name}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--pet-pink)', fontWeight: 600 }}>
                  Recommended Season: {selectedFabricModal.season}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--pet-text-body)', marginBottom: '18px' }}>
              {selectedFabricModal.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
              <div style={{ background: 'var(--pet-surface)', padding: '12px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--pet-text-muted)', display: 'block' }}>Softness Rating</span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--pet-text-heading)' }}>{selectedFabricModal.softness}</strong>
              </div>
              <div style={{ background: 'var(--pet-surface)', padding: '12px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--pet-text-muted)', display: 'block' }}>Breathability</span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--pet-text-heading)' }}>{selectedFabricModal.breathability}</strong>
              </div>
              <div style={{ background: 'var(--pet-surface)', padding: '12px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--pet-text-muted)', display: 'block' }}>Warmth Index</span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--pet-text-heading)' }}>{selectedFabricModal.warmth}</strong>
              </div>
              <div style={{ background: 'var(--pet-surface)', padding: '12px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--pet-text-muted)', display: 'block' }}>Fabric Durability</span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--pet-text-heading)' }}>{selectedFabricModal.durability}</strong>
              </div>
            </div>

            <div style={{ marginBottom: '14px', fontSize: '0.85rem' }}>
              <strong style={{ color: 'var(--pet-text-heading)', display: 'block', marginBottom: '3px' }}>Suitable For:</strong>
              <span style={{ color: 'var(--pet-text-body)' }}>{selectedFabricModal.suitablePets}</span>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '22px' }}>
              <strong style={{ color: 'var(--pet-text-heading)', display: 'block', marginBottom: '3px' }}>Wash & Care:</strong>
              <span style={{ color: 'var(--pet-text-body)' }}>{selectedFabricModal.care}</span>
            </div>

            <button 
              type="button"
              className="pet-btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setSelectedFabricModal(null);
                navigate('/pet-outfits/customize');
              }}
            >
              Customize Outfit with {selectedFabricModal.name} →
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          REVIEWS MODAL
          ==================================================================== */}
      {isReviewsModalOpen && (
        <div className="pet-modal-overlay" onClick={() => setIsReviewsModalOpen(false)}>
          <div className="pet-modal-card" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
            <button 
              type="button"
              className="pet-modal-close-btn"
              onClick={() => setIsReviewsModalOpen(false)}
            >
              <X size={18} />
            </button>

            <span className="pet-eyebrow">VERIFIED PET PARENT REVIEWS</span>
            <h2 className="pet-heading" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>
              Happy Tails & Five-Star Smiles
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {PET_REVIEWS.map(r => (
                <div key={r.id} style={{ display: 'flex', gap: '14px', padding: '14px', borderRadius: '12px', border: '1px solid var(--pet-border)', background: 'var(--pet-surface)' }}>
                  <img src={r.petImg} alt="pet" style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--pet-text-heading)' }}>{r.name} ({r.location})</strong>
                      <div style={{ display: 'flex', color: '#F59E0B' }}>
                        {[...Array(r.rating)].map((_, i) => <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />)}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.84rem', margin: 0, color: 'var(--pet-text-body)', lineHeight: 1.4 }}>
                      "{r.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
