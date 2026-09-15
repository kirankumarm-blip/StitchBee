import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Star, ShieldCheck, CheckCircle2, Scissors, 
  Sparkles, Clock, Phone, ChevronRight, Search, 
  Navigation, RefreshCw, Eye, Award, Sliders, X, 
  Layers, ExternalLink, Calendar, Heart
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
  setCustomerHub 
}) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All Localities");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTailor, setActiveTailor] = useState(CURATED_TAILORS[0]);
  const [previewPortfolioTailor, setPreviewPortfolioTailor] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("Bengaluru Central");
  const [savedTailors, setSavedTailors] = useState([]);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

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
        setLocationName("Your Current GPS Location");
        setIsLocating(false);

        if (mapInstanceRef.current && window.L) {
          mapInstanceRef.current.setView([latitude, longitude], 13);
          window.L.circle([latitude, longitude], {
            color: '#F72585',
            fillColor: '#F72585',
            fillOpacity: 0.15,
            radius: 2000
          }).addTo(mapInstanceRef.current);
        }
      },
      (err) => {
        console.warn("GPS error:", err);
        setIsLocating(false);
        alert("Location access denied or unavailable. Showing top curated studios in Bengaluru.");
      },
      { timeout: 8000 }
    );
  };

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const loadMap = () => {
      if (!window.L) {
        // Retry after Leaflet script load if not yet ready
        setTimeout(loadMap, 300);
        return;
      }

      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.error("Map cleanup error:", e);
        }
        mapInstanceRef.current = null;
      }

      const container = mapContainerRef.current;
      if (container && container._leaflet_id) {
        delete container._leaflet_id;
      }

      const centerLat = userLocation ? userLocation.lat : 12.9500;
      const centerLng = userLocation ? userLocation.lng : 77.6300;

      const map = window.L.map(container, {
        center: [centerLat, centerLng],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false
      });

      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      // Custom User Marker if GPS available
      if (userLocation) {
        const userSvgIcon = window.L.divIcon({
          html: `<div style="background: #4CC9F0; width: 18px; height: 18px; border: 3px solid #fff; border-radius: 50%; box-shadow: 0 0 16px #4CC9F0; animation: pulse-glow 1.5s infinite;"></div>`,
          className: 'user-radar-pin',
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });
        window.L.marker([userLocation.lat, userLocation.lng], { icon: userSvgIcon })
          .addTo(map)
          .bindPopup(`<div style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; color: #111;">📍 Your Live Location</div>`);
      }

      // Tailor Atelier Markers
      markersRef.current = [];
      filteredTailors.forEach(tailor => {
        const isSelected = activeTailor && activeTailor.id === tailor.id;
        const tailorIcon = window.L.divIcon({
          html: `
            <div style="
              position: relative; 
              cursor: pointer;
              transform: scale(${isSelected ? 1.25 : 1});
              transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ">
              <div style="
                background: linear-gradient(135deg, #F72585 0%, #7209B7 100%);
                width: 38px;
                height: 38px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 6px 16px rgba(247, 37, 133, 0.45);
                border: 2.5px solid #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  transform: rotate(45deg);
                  color: #ffffff;
                  font-size: 14px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  ✂️
                </div>
              </div>
              <div style="
                position: absolute;
                bottom: -18px;
                left: 50%;
                transform: translateX(-50%);
                background: #111827;
                color: #ffffff;
                font-size: 10px;
                font-weight: 700;
                padding: 2px 6px;
                border-radius: 4px;
                white-space: nowrap;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              ">
                ★ ${tailor.rating}
              </div>
            </div>
          `,
          className: 'custom-atelier-marker',
          iconSize: [38, 38],
          iconAnchor: [19, 38]
        });

        const marker = window.L.marker([tailor.lat, tailor.lng], { icon: tailorIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; color: #111; padding: 4px; max-width: 220px; text-align: left;">
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                <span style="color: #F72585; font-size: 10px; font-weight: 800; text-transform: uppercase;">VERIFIED ATELIER</span>
              </div>
              <strong style="font-size: 13px; color: #111; display: block; line-height: 1.2;">${tailor.name}</strong>
              <span style="font-size: 11px; color: #6B7280; display: block; margin: 4px 0;">${tailor.specialty}</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 11px; border-top: 1px solid #E5E7EB; padding-top: 6px;">
                <span style="font-weight: 700; color: #F72585;">★ ${tailor.rating} (${tailor.reviewsCount})</span>
                <span style="color: #10B981; font-weight: 600;">${tailor.calculatedDist}</span>
              </div>
            </div>
          `);

        marker.on('click', () => {
          setActiveTailor(tailor);
        });

        markersRef.current.push({ id: tailor.id, marker, lat: tailor.lat, lng: tailor.lng });
      });

      mapInstanceRef.current = map;
    };

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.error("Cleanup error:", e);
        }
        mapInstanceRef.current = null;
      }
    };
  }, [userLocation, selectedNeighborhood, selectedCategory, searchQuery]);

  const handleSelectTailor = (tailor) => {
    setActiveTailor(tailor);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([tailor.lat, tailor.lng], 14, { animate: true });
      const targetMarker = markersRef.current.find(m => m.id === tailor.id);
      if (targetMarker) {
        targetMarker.marker.openPopup();
      }
    }
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

  return (
    <section id="tailors-near-you" style={{ padding: '5rem 0 4rem 0', position: 'relative' }}>
      <div className="landing-container">
        
        {/* SECTION HEADER WITH LUXURY PILLS */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.8rem auto' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(247, 37, 133, 0.1)', 
            border: '1px solid rgba(247, 37, 133, 0.25)', 
            padding: '6px 16px', 
            borderRadius: '30px', 
            marginBottom: '14px' 
          }}>
            <ShieldCheck size={16} style={{ color: '#F72585' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#F72585', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              100% Vetted & Verified Boutique Network
            </span>
          </div>

          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: 'var(--text-primary)', 
            lineHeight: 1.15, 
            margin: '0 0 12px 0' 
          }}>
            Verified Tailors & Master Ateliers Near You
          </h2>

          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Connect with certified master craftsmen, luxury bridal ateliers, and bespoke suit makers offering 
            <strong> doorstep measurement trials</strong> and <strong>100% perfect fit guarantees</strong>.
          </p>
        </div>

        {/* SEARCH & LOCALITY FILTER BAR */}
        <div style={{
          background: 'var(--card-bg, rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-color)',
          borderRadius: '18px',
          padding: '16px 20px',
          boxShadow: '0 10px 35px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          marginBottom: '2rem'
        }}>
          {/* Top Row: Search Input + GPS Button */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text"
                placeholder="Search tailor by name, outfit type (e.g. Bridal, Suit, Blouse), or landmark..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary, rgba(255,255,255,0.03))',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
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
                padding: '12px 20px',
                borderRadius: '12px',
                background: userLocation ? 'rgba(16, 185, 129, 0.12)' : 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                border: userLocation ? '1px solid #10B981' : 'none',
                color: userLocation ? '#10B981' : '#ffffff',
                fontWeight: 700,
                fontSize: '12.5px',
                cursor: 'pointer',
                boxShadow: userLocation ? 'none' : '0 4px 14px rgba(247, 37, 133, 0.35)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              {isLocating ? (
                <>
                  <RefreshCw size={15} className="animate-spin" /> Detecting Location...
                </>
              ) : userLocation ? (
                <>
                  <CheckCircle2 size={15} /> GPS Active ({locationName})
                </>
              ) : (
                <>
                  <Navigation size={15} /> Use My Live GPS Location
                </>
              )}
            </button>
          </div>

          {/* Bottom Row: Neighborhood Pills & Specialty Categories */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            
            {/* Neighborhood Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Area:
              </span>
              {NEIGHBORHOODS.map(hood => (
                <button
                  key={hood}
                  onClick={() => setSelectedNeighborhood(hood)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    border: selectedNeighborhood === hood ? '1px solid #F72585' : '1px solid var(--border-color)',
                    background: selectedNeighborhood === hood ? '#F72585' : 'transparent',
                    color: selectedNeighborhood === hood ? '#ffffff' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {hood}
                </button>
              ))}
            </div>

            {/* Specialty Filters */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              {SPECIALTY_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    border: selectedCategory === cat.id ? '1px solid #7209B7' : '1px solid var(--border-color)',
                    background: selectedCategory === cat.id ? 'rgba(114, 9, 183, 0.15)' : 'transparent',
                    color: selectedCategory === cat.id ? '#F72585' : 'var(--text-muted)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN SHOWCASE: INTERACTIVE RADAR MAP (LEFT) + PREMIUM ATELIER CARDS (RIGHT) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          
          {/* LEFT: INTERACTIVE LEAFLET STUDIO MAP */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            minHeight: '560px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#141126'
          }}>
            {/* Real Map Canvas */}
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: '560px' }} />

            {/* Floating Top Radar Status Bar */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
              gap: '10px'
            }}>
              <div style={{
                background: 'rgba(17, 24, 39, 0.88)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '30px',
                fontSize: '11.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                pointerEvents: 'auto'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }}></span>
                <span>{filteredTailors.length} Verified Boutiques Active Near You</span>
              </div>

              <button
                onClick={() => {
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.setView([12.9500, 77.6300], 12);
                  }
                }}
                style={{
                  background: 'rgba(17, 24, 39, 0.88)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Layers size={13} /> Reset View
              </button>
            </div>

            {/* Floating Bottom Quick Selected Tailor Preview */}
            {activeTailor && (
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                zIndex: 1000,
                background: 'rgba(17, 24, 39, 0.92)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(247, 37, 133, 0.35)',
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <img 
                    src={activeTailor.image} 
                    alt={activeTailor.name}
                    style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #F72585' }} 
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '13px', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {activeTailor.name}
                      </strong>
                      <span style={{ fontSize: '10px', color: '#F72585', fontWeight: 700 }}>★ {activeTailor.rating}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {activeTailor.masterTailor} • {activeTailor.calculatedDist}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookTailor(activeTailor)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  Book Doorstep Trial
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: SCROLLABLE CURATED ATELIER CARDS */}
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
                background: 'var(--card-bg, rgba(255,255,255,0.04))',
                borderRadius: '18px',
                border: '1px dashed var(--border-color)'
              }}>
                <Scissors size={36} style={{ color: '#F72585', margin: '0 auto 12px auto', opacity: 0.6 }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>No Tailor Studios Found</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>Try switching neighborhoods or searching for general categories like "Bridal", "Suits", or "Blouses".</p>
                <button
                  onClick={() => { setSelectedNeighborhood("All Localities"); setSelectedCategory("all"); setSearchQuery(""); }}
                  style={{ padding: '8px 18px', borderRadius: '10px', background: '#F72585', color: '#fff', border: 'none', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
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
                    onClick={() => handleSelectTailor(tailor)}
                    style={{
                      background: isSelected 
                        ? 'var(--selected-card-bg, rgba(247, 37, 133, 0.06))' 
                        : 'var(--card-bg, rgba(255, 255, 255, 0.04))',
                      border: isSelected 
                        ? '1.5px solid #F72585' 
                        : '1px solid var(--border-color)',
                      borderRadius: '18px',
                      padding: '18px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isSelected 
                        ? '0 10px 30px rgba(247, 37, 133, 0.15)' 
                        : '0 4px 16px rgba(0,0,0,0.03)',
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
                            border: '1px solid var(--border-color)'
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
                              fontSize: '15px', 
                              fontWeight: 800, 
                              color: 'var(--text-primary)', 
                              margin: '0 0 2px 0',
                              lineHeight: 1.3
                            }}>
                              {tailor.name}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#F72585', fontWeight: 600 }}>
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
                              color: isSaved ? '#F72585' : 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                            title="Save tailor"
                          >
                            <Heart size={18} fill={isSaved ? '#F72585' : 'none'} />
                          </button>
                        </div>

                        <p style={{ 
                          fontSize: '12px', 
                          color: 'var(--text-secondary)', 
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
                      background: 'var(--bg-secondary, rgba(255, 255, 255, 0.02))', 
                      padding: '10px 12px', 
                      borderRadius: '12px', 
                      border: '1px solid var(--border-color)',
                      fontSize: '11px',
                      textAlign: 'center'
                    }}>
                      <div>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 600 }}>Distance</span>
                        <strong style={{ color: '#F72585', fontSize: '12px' }}>📍 {tailor.calculatedDist}</strong>
                      </div>
                      <div style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 600 }}>Rating</span>
                        <strong style={{ color: '#F59E0B', fontSize: '12px' }}>★ {tailor.rating} ({tailor.reviewsCount})</strong>
                      </div>
                      <div>
                        <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 600 }}>Completed</span>
                        <strong style={{ color: '#10B981', fontSize: '12px' }}>{tailor.orders}+ orders</strong>
                      </div>
                    </div>

                    {/* Turnaround & Availability Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {tailor.availability}
                      </span>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {tailor.turnaround}
                      </span>
                    </div>

                    {/* Specialty Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {tailor.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: 'var(--tag-bg, rgba(255, 255, 255, 0.05))',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-color)'
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action CTA Buttons */}
                    <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewPortfolioTailor(tailor);
                        }}
                        style={{
                          flex: 1,
                          padding: '9px 12px',
                          borderRadius: '10px',
                          background: 'transparent',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          fontSize: '11.5px',
                          fontWeight: 600,
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
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(247, 37, 133, 0.25)'
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
          background: 'var(--card-bg, rgba(255, 255, 255, 0.03))',
          border: '1px solid var(--border-color)',
          borderRadius: '18px',
          padding: '24px 28px'
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(247, 37, 133, 0.1)', color: '#F72585', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', color: 'var(--text-primary)', display: 'block' }}>Doorstep Measurement Trials</strong>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Master fashion consultants visit your home</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(114, 9, 183, 0.1)', color: '#7209B7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Scissors size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', color: 'var(--text-primary)', display: 'block' }}>100% Perfect Fit Guarantee</strong>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Free unlimited adjustments until it fits like a glove</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', color: 'var(--text-primary)', display: 'block' }}>Fast Turnaround & Insured</strong>
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Express 24h & 48h delivery in garment bags</span>
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
            background: 'var(--modal-bg, #141126)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            maxWidth: '640px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            animation: 'fadeIn 0.25s ease'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '10.5px', color: '#F72585', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Atelier Creations & Portfolio
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '2px 0 0 0' }}>
                  {previewPortfolioTailor.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewPortfolioTailor(null)}
                style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body: Gallery Grid */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '65vh', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
                {previewPortfolioTailor.portfolio.map((item, pIdx) => (
                  <div key={pIdx} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      style={{ width: '100%', height: '170px', objectFit: 'cover' }} 
                    />
                    <div style={{ padding: '10px 12px' }}>
                      <strong style={{ fontSize: '12px', color: '#ffffff', display: 'block' }}>{item.title}</strong>
                      <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 700 }}>Custom Stitching from {item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(247, 37, 133, 0.08)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(247, 37, 133, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '12px', color: '#fff', display: 'block' }}>Ready to customize your design?</strong>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Book a home visit or studio trial with {previewPortfolioTailor.masterTailor}</span>
                </div>
                <button
                  onClick={() => {
                    const t = previewPortfolioTailor;
                    setPreviewPortfolioTailor(null);
                    handleBookTailor(t);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#F72585',
                    border: 'none',
                    color: '#fff',
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
