import React, { useState, useEffect } from 'react';
import { 
  MapPin, Star, ShieldCheck, CheckCircle2, Scissors, 
  Clock, Search, Navigation, RefreshCw, Eye, Award, 
  X, Layers, ExternalLink, Heart, Compass
} from 'lucide-react';

const CURATED_TAILORS = [
  {
    id: 't_near_1',
    name: "Royal Couturiers & Atelier",
    masterTailor: "Master Rameshwar Rao",
    experience: "18+ Yrs Master Cutter",
    specialty: "Bespoke Bridal Lehengas & Zardozi Gowns",
    category: "bridal",
    neighborhood: "Koramangala",
    rating: 4.96,
    reviewsCount: 248,
    orders: 430,
    availability: "🟢 Doorstep Trial Available Today",
    turnaround: "⚡ 48h Express Available",
    phone: "+91 98450 12345",
    address: "80 Feet Road, 4th Block, Koramangala, Bengaluru",
    priceRange: "₹2,500 – ₹18,000",
    image: "/why_join_1.jpg",
    avatar: "/kiran.jpg",
    tags: ["Bridal Lehenga", "Heavy Zardozi", "Silk Blouse", "Designer Gown"],
    lat: 12.9345,
    lng: 77.6267,
    mapQuery: "Koramangala 4th Block Bengaluru",
    portfolio: [
      { img: "/bridal 5.jpg", title: "Velvet Bridal Lehenga", price: "₹14,500" },
      { img: "/bridal2.jpg", title: "Raw Silk Embroidered Blouse", price: "₹3,200" },
      { img: "/bridal3.jpg", title: "Handcrafted Anarkali Suit", price: "₹7,800" }
    ]
  },
  {
    id: 't_near_2',
    name: "Savile Row Bespoke Studio",
    masterTailor: "Master Anthony Rozario",
    experience: "14+ Yrs Bespoke Suiting",
    specialty: "Luxury 3-Piece Suits, Tuxedos & Sherwanis",
    category: "suits",
    neighborhood: "Indiranagar",
    rating: 4.92,
    reviewsCount: 195,
    orders: 380,
    availability: "🟢 Doorstep Measurement Slot Open",
    turnaround: "⚡ 3-Day Express",
    phone: "+91 98860 98765",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru",
    priceRange: "₹3,500 – ₹24,000",
    image: "/why_join_2.jpg",
    avatar: "/manoj.jpg",
    tags: ["3-Piece Suit", "Bandhgala", "Tuxedo", "Italian Fit"],
    lat: 12.9719,
    lng: 77.6412,
    mapQuery: "100 Feet Road Indiranagar Bengaluru",
    portfolio: [
      { img: "/men1.jpg", title: "Bespoke Royal Bandhgala", price: "₹12,000" },
      { img: "/men2.jpg", title: "Italian Cut Tuxedo", price: "₹16,500" },
      { img: "/Velvet Bandhgala.png", title: "Classic Wool Blend Suit", price: "₹8,900" }
    ]
  },
  {
    id: 't_near_3',
    name: "Heritage Silks & Blouse Atelier",
    masterTailor: "Master Meenakshi Sundaram",
    experience: "22+ Yrs Silk Specialist",
    specialty: "Aari Work, Maggam & Designer Silk Blouses",
    category: "blouses",
    neighborhood: "Jayanagar",
    rating: 4.98,
    reviewsCount: 312,
    orders: 620,
    availability: "🟢 Available Today (Home Visit)",
    turnaround: "⚡ 24h Express Available",
    phone: "+91 98451 55667",
    address: "11th Main, 4th Block, Jayanagar, Bengaluru",
    priceRange: "₹1,200 – ₹8,500",
    image: "/womens_tailoring_v2.jpg",
    avatar: "/stany.jpg",
    tags: ["Maggam Work", "Aari Embroidery", "Kanjeevaram Blouse", "Princess Cut"],
    lat: 12.9298,
    lng: 77.5833,
    mapQuery: "Jayanagar 4th Block Bengaluru",
    portfolio: [
      { img: "/bridal 5.jpg", title: "Bridal Maggam Blouse", price: "₹4,500" },
      { img: "/bridal2.jpg", title: "Zari Border Pattu Blouse", price: "₹2,800" },
      { img: "/womensCollection.jpg", title: "Corset Style Crop Top", price: "₹3,200" }
    ]
  },
  {
    id: 't_near_4',
    name: "StitchBee Express Studio",
    masterTailor: "Master Rajesh Kumar",
    experience: "11+ Yrs Master Tailor",
    specialty: "Same-Day Alterations, Upcycling & Perfect Fits",
    category: "alterations",
    neighborhood: "HSR Layout",
    rating: 4.88,
    reviewsCount: 420,
    orders: 890,
    availability: "🟢 30-Min Doorstep Pickup",
    turnaround: "⚡ 24-Hour Delivery",
    phone: "+91 98452 77889",
    address: "27th Main, Sector 1, HSR Layout, Bengaluru",
    priceRange: "₹250 – ₹3,500",
    image: "/tailor_stitching_hero.png",
    avatar: "/kiran.jpg",
    tags: ["24h Alterations", "Waist Resizing", "Dress Tapering", "Suit Restyling"],
    lat: 12.9141,
    lng: 77.6329,
    mapQuery: "HSR Layout Sector 1 Bengaluru",
    portfolio: [
      { img: "/alterations_fit.jpg", title: "Designer Lehenga Waist & Flare Taper", price: "₹850" },
      { img: "/alt_al1.jpg", title: "Blazer Shoulder Restyling", price: "₹1,200" },
      { img: "/alt_al2.jpg", title: "Saree Fall & Pico Finishing", price: "₹250" }
    ]
  },
  {
    id: 't_near_5',
    name: "Luxe Thread & Co.",
    masterTailor: "Master Farooq Siddiqui",
    experience: "16+ Yrs Indo-Western Specialist",
    specialty: "Indo-Western Fusion, Shararas & Kurta Sets",
    category: "fusion",
    neighborhood: "Whitefield",
    rating: 4.91,
    reviewsCount: 165,
    orders: 290,
    availability: "🟢 Doorstep Trial Available Today",
    turnaround: "⚡ 3-Day Turnaround",
    phone: "+91 98453 99001",
    address: "ITPL Main Road, Prestige Ozone Junction, Whitefield",
    priceRange: "₹2,200 – ₹12,500",
    image: "/why_join_3.jpg",
    avatar: "/manoj.jpg",
    tags: ["Indo-Western", "Sharara Suit", "Draped Sarees", "Embroidered Kurta"],
    lat: 12.9698,
    lng: 77.7499,
    mapQuery: "Whitefield ITPL Main Road Bengaluru",
    portfolio: [
      { img: "/bridal 5.jpg", title: "Georgette Draped Sharara", price: "₹6,800" },
      { img: "/men1.jpg", title: "Asymmetric Silk Kurta", price: "₹4,200" },
      { img: "/bridal2.jpg", title: "Cape Style Fusion Gown", price: "₹9,500" }
    ]
  }
];

const NEIGHBORHOODS = [
  "All Localities",
  "Koramangala",
  "Indiranagar",
  "Jayanagar",
  "HSR Layout",
  "Whitefield"
];

const SPECIALTY_CATEGORIES = [
  { id: 'all', label: 'All Specialties' },
  { id: 'bridal', label: '👑 Bridal & Lehengas' },
  { id: 'suits', label: '🤵 Bespoke Suits' },
  { id: 'blouses', label: '🥻 Designer Blouses' },
  { id: 'alterations', label: '⚡ 24h Alterations' }
];

export default function VerifiedTailorsShowcase({ 
  openAuthModal, 
  currentUser, 
  setRole, 
  setCustomerHub,
  theme = 'dark'
}) {
  const isLight = theme === 'light';

  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All Localities");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTailor, setActiveTailor] = useState(CURATED_TAILORS[0]);
  const [previewPortfolioTailor, setPreviewPortfolioTailor] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("Bengaluru Central");
  const [savedTailors, setSavedTailors] = useState([]);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'

  // Calculate Distance in KM
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  // Filter tailors based on search, neighborhood, category
  const filteredTailors = CURATED_TAILORS.filter(t => {
    const matchesNeighborhood = selectedNeighborhood === "All Localities" || t.neighborhood.toLowerCase() === selectedNeighborhood.toLowerCase();
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === "" || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.masterTailor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesNeighborhood && matchesCategory && matchesSearch;
  }).map(t => {
    const originLat = userLocation ? userLocation.lat : 12.9716;
    const originLng = userLocation ? userLocation.lng : 77.5946;
    const dist = calculateDistance(originLat, originLng, t.lat, t.lng);
    return { ...t, calculatedDist: `${dist} km` };
  });

  // Keep activeTailor synced with filtered results
  useEffect(() => {
    if (filteredTailors.length > 0 && (!activeTailor || !filteredTailors.some(t => t.id === activeTailor.id))) {
      setActiveTailor(filteredTailors[0]);
    }
  }, [selectedNeighborhood, selectedCategory, searchQuery]);

  // Handle GPS location request
  const handleGetLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationName("Your Current Location");
        setIsLocating(false);
      },
      (err) => {
        console.warn("GPS error:", err);
        setIsLocating(false);
        alert("Location access denied or unavailable. Showing top curated studios in Bengaluru.");
      },
      { timeout: 8000 }
    );
  };

  const handleBookTailor = (tailor) => {
    if (!currentUser) {
      openAuthModal('customer', 'login');
    } else {
      alert(`🎉 Doorstep measurement trial booking requested for ${tailor.name}! Our fashion specialist will confirm your time slot.`);
      if (setCustomerHub) setCustomerHub('tailors');
      if (setRole) setRole('customer');
    }
  };

  const toggleSaveTailor = (tailorId, e) => {
    e.stopPropagation();
    setSavedTailors(prev => 
      prev.includes(tailorId) ? prev.filter(id => id !== tailorId) : [...prev, tailorId]
    );
  };

  // Construct Google Maps Embed URL
  const googleMapEmbedUrl = activeTailor
    ? `https://maps.google.com/maps?q=${activeTailor.lat},${activeTailor.lng}&hl=en&z=15&t=${mapType === 'satellite' ? 'k' : 'm'}&output=embed`
    : `https://maps.google.com/maps?q=12.9716,77.5946&hl=en&z=13&t=${mapType === 'satellite' ? 'k' : 'm'}&output=embed`;

  // Construct Google Maps Direct App Directions Link
  const googleMapsDirectionsUrl = activeTailor
    ? `https://www.google.com/maps/dir/?api=1&destination=${activeTailor.lat},${activeTailor.lng}`
    : `https://www.google.com/maps/search/?api=1&query=Tailors+Bengaluru`;

  // Dynamic Theme Palette Values
  const colors = {
    sectionTitle: isLight ? '#0f172a' : '#ffffff',
    sectionSubtitle: isLight ? '#475569' : 'rgba(255, 255, 255, 0.85)',
    filterCardBg: isLight ? '#ffffff' : 'rgba(20, 17, 38, 0.92)',
    filterBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.15)',
    filterShadow: isLight ? '0 10px 30px rgba(0,0,0,0.05)' : '0 12px 35px rgba(0,0,0,0.3)',
    searchBg: isLight ? '#f8fafc' : 'rgba(255, 255, 255, 0.06)',
    searchBorder: isLight ? '#cbd5e1' : 'rgba(255, 255, 255, 0.2)',
    searchText: isLight ? '#0f172a' : '#ffffff',
    searchPlaceholder: isLight ? '#64748b' : 'rgba(255, 255, 255, 0.6)',
    filterLabel: isLight ? '#0f172a' : '#ffffff',
    pillUnselectedBg: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.08)',
    pillUnselectedBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.2)',
    pillUnselectedText: isLight ? '#334155' : '#ffffff',
    tailorCardBg: isLight ? '#ffffff' : 'rgba(20, 17, 38, 0.92)',
    tailorCardSelectedBg: isLight ? '#fff5f8' : 'rgba(247, 37, 133, 0.12)',
    tailorCardBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.15)',
    tailorCardShadow: isLight ? '0 4px 18px rgba(0,0,0,0.05)' : '0 4px 16px rgba(0,0,0,0.2)',
    tailorTitle: isLight ? '#0f172a' : '#ffffff',
    tailorSpecialty: isLight ? '#475569' : 'rgba(255, 255, 255, 0.85)',
    metricStripBg: isLight ? '#f8fafc' : 'rgba(255, 255, 255, 0.05)',
    metricStripBorder: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.12)',
    metricLabel: isLight ? '#64748b' : 'rgba(255, 255, 255, 0.7)',
    metricValue: isLight ? '#0f172a' : '#ffffff',
    tagBg: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.08)',
    tagBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.14)',
    tagText: isLight ? '#475569' : '#ffffff',
    secondaryBtnBg: isLight ? '#f8fafc' : 'rgba(255, 255, 255, 0.08)',
    secondaryBtnBorder: isLight ? '#cbd5e1' : 'rgba(255, 255, 255, 0.2)',
    secondaryBtnText: isLight ? '#0f172a' : '#ffffff',
    mapHeaderBg: isLight ? '#ffffff' : '#111827',
    mapHeaderBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.1)',
    mapHeaderText: isLight ? '#0f172a' : '#ffffff',
    mapToggleBg: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.1)',
    mapToggleBorder: isLight ? '#cbd5e1' : 'rgba(255, 255, 255, 0.2)',
    mapToggleText: isLight ? '#334155' : '#ffffff',
    mapBottomBannerBg: isLight ? '#ffffff' : '#111827',
    trustCardBg: isLight ? '#ffffff' : 'rgba(20, 17, 38, 0.85)',
    trustCardBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.15)',
    trustCardTitle: isLight ? '#0f172a' : '#ffffff',
    trustCardSubtitle: isLight ? '#64748b' : 'rgba(255, 255, 255, 0.8)'
  };

  return (
    <section id="tailors-near-you" style={{ padding: '5rem 0 4rem 0', position: 'relative' }}>
      <div className="landing-container">
        
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem auto' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(247, 37, 133, 0.12)', 
            border: '1px solid rgba(247, 37, 133, 0.35)', 
            padding: '7px 18px', 
            borderRadius: '30px', 
            marginBottom: '14px' 
          }}>
            <ShieldCheck size={16} style={{ color: '#F72585' }} />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#F72585', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              100% Vetted & Verified Boutique Network
            </span>
          </div>

          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: colors.sectionTitle, 
            lineHeight: 1.15, 
            margin: '0 0 12px 0' 
          }}>
            Verified Tailors & Master Ateliers Near You
          </h2>

          <p style={{ fontSize: '15px', color: colors.sectionSubtitle, lineHeight: 1.6, margin: 0 }}>
            Connect with certified master craftsmen, luxury bridal ateliers, and bespoke suit makers offering 
            <strong style={{ color: '#F72585' }}> doorstep measurement trials</strong> and <strong style={{ color: '#10B981' }}>100% perfect fit guarantees</strong>.
          </p>
        </div>

        {/* SEARCH & LOCALITY FILTER BAR (CLEAN RESPONSIVE THEMING) */}
        <div style={{
          background: colors.filterCardBg,
          backdropFilter: 'blur(16px)',
          border: `1px solid ${colors.filterBorder}`,
          borderRadius: '18px',
          padding: '18px 22px',
          boxShadow: colors.filterShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '2rem'
        }}>
          {/* Top Row: Search Input + GPS Button */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.searchPlaceholder }} />
              <input 
                type="text"
                placeholder="Search by tailor name, outfit (e.g. Bridal, Suit, Blouse), or neighborhood..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 14px 13px 42px',
                  borderRadius: '12px',
                  border: `1px solid ${colors.searchBorder}`,
                  background: colors.searchBg,
                  color: colors.searchText,
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: colors.searchPlaceholder, cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* GPS Live Geolocation Button */}
            <button 
              onClick={handleGetLiveLocation}
              disabled={isLocating}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 22px',
                borderRadius: '12px',
                background: userLocation ? 'rgba(16, 185, 129, 0.15)' : 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                border: userLocation ? '1.5px solid #10B981' : 'none',
                color: userLocation ? '#10B981' : '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: userLocation ? 'none' : '0 4px 16px rgba(247, 37, 133, 0.4)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              {isLocating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Detecting Location...
                </>
              ) : userLocation ? (
                <>
                  <CheckCircle2 size={16} style={{ color: '#10B981' }} /> GPS Active ({locationName})
                </>
              ) : (
                <>
                  <Navigation size={16} /> Use My Live GPS Location
                </>
              )}
            </button>
          </div>

          {/* Bottom Row: Neighborhood Pills & Specialty Categories */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderTop: `1px solid ${colors.filterBorder}`, paddingTop: '14px' }}>
            
            {/* Neighborhood Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%', WebkitOverflowScrolling: 'touch', alignItems: 'center' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: colors.filterLabel, display: 'flex', alignItems: 'center', marginRight: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📍 Locality:
              </span>
              {NEIGHBORHOODS.map(hood => {
                const isSelected = selectedNeighborhood === hood;
                return (
                  <button
                    key={hood}
                    onClick={() => setSelectedNeighborhood(hood)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '24px',
                      fontSize: '12px',
                      fontWeight: isSelected ? 800 : 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      border: isSelected ? '1px solid #F72585' : `1px solid ${colors.pillUnselectedBorder}`,
                      background: isSelected ? '#F72585' : colors.pillUnselectedBg,
                      color: isSelected ? '#ffffff' : colors.pillUnselectedText,
                      boxShadow: isSelected ? '0 4px 14px rgba(247, 37, 133, 0.35)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {hood}
                  </button>
                );
              })}
            </div>

            {/* Specialty Category Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: colors.filterLabel, display: 'flex', alignItems: 'center', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ✂️ Category:
              </span>
              {SPECIALTY_CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: isSelected ? 800 : 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      border: isSelected ? 'none' : `1px solid ${colors.pillUnselectedBorder}`,
                      background: isSelected ? 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)' : colors.pillUnselectedBg,
                      color: isSelected ? '#ffffff' : colors.pillUnselectedText,
                      boxShadow: isSelected ? '0 4px 14px rgba(114, 9, 183, 0.35)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MAIN SHOWCASE: GOOGLE MAPS LIVE ATELIER LOCATOR (LEFT) + BOUTIQUE CARDS (RIGHT) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          
          {/* LEFT: LIVE GOOGLE MAPS INTERACTIVE VIEWER */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: `1px solid ${colors.filterBorder}`,
            boxShadow: colors.filterShadow,
            minHeight: '580px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: colors.filterCardBg
          }}>
            
            {/* Top Google Maps Control Header Bar */}
            <div style={{
              padding: '12px 16px',
              background: colors.mapHeaderBg,
              borderBottom: `1px solid ${colors.mapHeaderBorder}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 10px #10B981' }}></span>
                <strong style={{ fontSize: '12.5px', color: colors.mapHeaderText, letterSpacing: '0.02em' }}>
                  Google Maps • {activeTailor?.neighborhood || 'Bengaluru'} Studio
                </strong>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Satellite / Standard Toggle */}
                <button
                  onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: colors.mapToggleBg,
                    border: `1px solid ${colors.mapToggleBorder}`,
                    color: colors.mapToggleText,
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Toggle Satellite View"
                >
                  <Layers size={13} /> {mapType === 'roadmap' ? 'Satellite' : 'Roadmap'}
                </button>

                {/* Direct Open in Google Maps */}
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                    color: '#ffffff',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Compass size={13} /> Directions
                </a>
              </div>
            </div>

            {/* Embedded Live Google Maps Iframe */}
            <div style={{ width: '100%', flex: 1, minHeight: '440px', position: 'relative' }}>
              <iframe
                title="Google Maps Studio Locator"
                src={googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  minHeight: '440px',
                  display: 'block'
                }}
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Bottom Active Tailor Overlay Banner */}
            {activeTailor && (
              <div style={{
                background: colors.mapBottomBannerBg,
                borderTop: '1.5px solid rgba(247, 37, 133, 0.35)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <img 
                    src={activeTailor.image} 
                    alt={activeTailor.name}
                    style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #F72585' }} 
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '13.5px', color: colors.tailorTitle, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {activeTailor.name}
                      </strong>
                      <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 800 }}>★ {activeTailor.rating}</span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: colors.tailorSpecialty, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                      📍 {activeTailor.address} ({activeTailor.calculatedDist})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookTailor(activeTailor)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    boxShadow: '0 4px 14px rgba(247, 37, 133, 0.35)'
                  }}
                >
                  Book Doorstep Trial
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: CURATED ATELIER CARDS LIST */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: '680px',
            overflowY: 'auto',
            paddingRight: '6px'
          }}>
            {filteredTailors.length === 0 ? (
              <div style={{
                padding: '48px 24px',
                textAlign: 'center',
                background: colors.filterCardBg,
                borderRadius: '18px',
                border: `1px dashed ${colors.filterBorder}`
              }}>
                <Scissors size={36} style={{ color: '#F72585', margin: '0 auto 12px auto', opacity: 0.7 }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: colors.tailorTitle, margin: '0 0 6px 0' }}>No Tailor Studios Found</h4>
                <p style={{ fontSize: '13px', color: colors.tailorSpecialty, margin: '0 0 16px 0' }}>Try clearing your search query or selecting "All Localities".</p>
                <button
                  onClick={() => { setSelectedNeighborhood("All Localities"); setSelectedCategory("all"); setSearchQuery(""); }}
                  style={{ padding: '8px 18px', borderRadius: '10px', background: '#F72585', color: '#ffffff', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredTailors.map(tailor => {
                const isSelected = activeTailor && activeTailor.id === tailor.id;
                const isSaved = savedTailors.includes(tailor.id);

                return (
                  <div
                    key={tailor.id}
                    onClick={() => setActiveTailor(tailor)}
                    style={{
                      background: isSelected 
                        ? colors.tailorCardSelectedBg 
                        : colors.tailorCardBg,
                      border: isSelected 
                        ? '2px solid #F72585' 
                        : `1px solid ${colors.tailorCardBorder}`,
                      borderRadius: '18px',
                      padding: '18px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isSelected 
                        ? '0 12px 32px rgba(247, 37, 133, 0.2)' 
                        : colors.tailorCardShadow,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      position: 'relative'
                    }}
                  >
                    {/* Top Row: Thumbnail + Title + Rating */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img 
                          src={tailor.image} 
                          alt={tailor.name} 
                          style={{
                            width: '84px',
                            height: '84px',
                            borderRadius: '14px',
                            objectFit: 'cover',
                            border: `1.5px solid ${colors.tailorCardBorder}`
                          }} 
                        />
                        <span style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                          color: '#ffffff',
                          fontSize: '8.5px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '10px',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                        }}>
                          VERIFIED
                        </span>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                          <div>
                            <h3 style={{ 
                              fontSize: '15.5px', 
                              fontWeight: 800, 
                              color: colors.tailorTitle, 
                              margin: '0 0 2px 0',
                              lineHeight: 1.3
                            }}>
                              {tailor.name}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#F72585', fontWeight: 700 }}>
                              <Award size={13} />
                              <span>{tailor.masterTailor} • {tailor.experience}</span>
                            </div>
                          </div>

                          {/* Heart Bookmark */}
                          <button
                            onClick={(e) => toggleSaveTailor(tailor.id, e)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: isSaved ? '#F72585' : colors.metricLabel,
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                            title="Save atelier"
                          >
                            <Heart size={18} fill={isSaved ? '#F72585' : 'none'} />
                          </button>
                        </div>

                        <p style={{ 
                          fontSize: '12.5px', 
                          color: colors.tailorSpecialty, 
                          margin: '6px 0 0 0',
                          lineHeight: 1.4
                        }}>
                          {tailor.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Meta Metric Badges */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(3, 1fr)', 
                      gap: '8px', 
                      background: colors.metricStripBg, 
                      padding: '10px 12px', 
                      borderRadius: '12px', 
                      border: `1px solid ${colors.metricStripBorder}`,
                      fontSize: '11px',
                      textAlign: 'center'
                    }}>
                      <div>
                        <span style={{ display: 'block', color: colors.metricLabel, fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Distance</span>
                        <strong style={{ color: '#F72585', fontSize: '12.5px' }}>📍 {tailor.calculatedDist}</strong>
                      </div>
                      <div style={{ borderLeft: `1px solid ${colors.metricStripBorder}`, borderRight: `1px solid ${colors.metricStripBorder}` }}>
                        <span style={{ display: 'block', color: colors.metricLabel, fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Rating</span>
                        <strong style={{ color: '#F59E0B', fontSize: '12.5px' }}>★ {tailor.rating} ({tailor.reviewsCount})</strong>
                      </div>
                      <div>
                        <span style={{ display: 'block', color: colors.metricLabel, fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Completed</span>
                        <strong style={{ color: '#10B981', fontSize: '12.5px' }}>{tailor.orders}+ orders</strong>
                      </div>
                    </div>

                    {/* Turnaround & Availability Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {tailor.availability}
                      </span>
                      <span style={{ color: colors.tailorSpecialty, fontWeight: 600 }}>
                        {tailor.turnaround}
                      </span>
                    </div>

                    {/* Specialty Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {tailor.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: colors.tagBg,
                            color: colors.tagText,
                            border: `1px solid ${colors.tagBorder}`
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action CTA Buttons */}
                    <div style={{ display: 'flex', gap: '10px', borderTop: `1px solid ${colors.metricStripBorder}`, paddingTop: '12px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewPortfolioTailor(tailor);
                        }}
                        style={{
                          flex: 1,
                          padding: '9px 12px',
                          borderRadius: '10px',
                          background: colors.secondaryBtnBg,
                          border: `1px solid ${colors.secondaryBtnBorder}`,
                          color: colors.secondaryBtnText,
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Eye size={13} /> View Creations
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookTailor(tailor);
                        }}
                        style={{
                          flex: 1.2,
                          padding: '9px 14px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 14px rgba(247, 37, 133, 0.35)'
                        }}
                      >
                        <Scissors size={13} /> Book Doorstep Trial
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* TRUST & GUARANTEE STRIP */}
        <div style={{
          marginTop: '3.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          background: colors.trustCardBg,
          border: `1px solid ${colors.trustCardBorder}`,
          borderRadius: '18px',
          padding: '24px 28px',
          boxShadow: colors.filterShadow
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(247, 37, 133, 0.15)', color: '#F72585', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', color: colors.trustCardTitle, display: 'block' }}>Doorstep Measurement Trials</strong>
              <span style={{ fontSize: '11.5px', color: colors.trustCardSubtitle }}>Master fashion consultants visit your home</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(114, 9, 183, 0.15)', color: '#7209B7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Scissors size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', color: colors.trustCardTitle, display: 'block' }}>100% Perfect Fit Guarantee</strong>
              <span style={{ fontSize: '11.5px', color: colors.trustCardSubtitle }}>Free unlimited adjustments until it fits like a glove</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', color: colors.trustCardTitle, display: 'block' }}>Fast Turnaround & Insured</strong>
              <span style={{ fontSize: '11.5px', color: colors.trustCardSubtitle }}>Express 24h & 48h delivery in garment bags</span>
            </div>
          </div>
        </div>

      </div>

      {/* ATELIER CREATIONS / PORTFOLIO MODAL */}
      {previewPortfolioTailor && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#141126',
            border: `1px solid ${colors.filterBorder}`,
            borderRadius: '24px',
            maxWidth: '640px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.25s ease'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.filterBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '10.5px', color: '#F72585', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Atelier Creations & Portfolio
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: colors.tailorTitle, margin: '2px 0 0 0' }}>
                  {previewPortfolioTailor.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewPortfolioTailor(null)}
                style={{ background: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.08)', border: 'none', color: colors.tailorTitle, width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body: Gallery Grid */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '65vh', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
                {previewPortfolioTailor.portfolio.map((item, pIdx) => (
                  <div key={pIdx} style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${colors.filterBorder}`, background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      style={{ width: '100%', height: '170px', objectFit: 'cover' }} 
                    />
                    <div style={{ padding: '10px 12px' }}>
                      <strong style={{ fontSize: '12px', color: colors.tailorTitle, display: 'block' }}>{item.title}</strong>
                      <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 700 }}>Custom Stitching from {item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: isLight ? '#fff0f6' : 'rgba(247, 37, 133, 0.12)', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(247, 37, 133, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <strong style={{ fontSize: '12.5px', color: colors.tailorTitle, display: 'block' }}>Ready to customize your design?</strong>
                  <span style={{ fontSize: '11px', color: colors.tailorSpecialty }}>Book a home visit or studio trial with {previewPortfolioTailor.masterTailor}</span>
                </div>
                <button
                  onClick={() => {
                    const t = previewPortfolioTailor;
                    setPreviewPortfolioTailor(null);
                    handleBookTailor(t);
                  }}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    background: '#F72585',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
