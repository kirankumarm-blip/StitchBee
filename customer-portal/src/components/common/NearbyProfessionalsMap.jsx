import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Navigation, Search, Filter, Star, ShieldCheck, Phone, 
  ExternalLink, Calendar, Clock, Check, X, ChevronRight, Sparkles, 
  Layers, Info, Eye, SlidersHorizontal, ArrowRight, ShieldAlert, Award
} from 'lucide-react';
import { 
  NEARBY_PROFESSIONALS_DATABASE, 
  searchNearbyProfessionals 
} from '../../utils/kidsStitchingStore';
import './NearbyProfessionalsMap.css';

// Predefined Bengaluru quick-select localities with coordinates
const QUICK_LOCALITIES = [
  { name: 'Indiranagar', coords: [12.9719, 77.6412] },
  { name: 'Koramangala', coords: [12.9348, 77.6189] },
  { name: 'Jayanagar', coords: [12.9307, 77.5840] },
  { name: 'HSR Layout', coords: [12.9141, 77.6413] },
  { name: 'Whitefield', coords: [12.9698, 77.7500] },
  { name: 'Malleshwaram', coords: [13.0031, 77.5643] },
];

export default function NearbyProfessionalsMap({
  serviceType = 'tailor', // 'tailor' | 'designer'
  selectedId = null,
  onSelectProfessional = () => {},
  initialCoords = [12.9719, 77.6412], // Default Indiranagar, Bengaluru
  title = '',
  subtitle = '',
  theme = 'light'
}) {
  // Search & Filter State
  const [userCoords, setUserCoords] = useState(initialCoords);
  const [searchQuery, setSearchQuery] = useState('Indiranagar, Bengaluru');
  const [radiusKm, setRadiusKm] = useState(10);
  const [onlyPartners, setOnlyPartners] = useState(false);
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState('distance'); // 'distance' | 'rating' | 'price'
  const [mobileTab, setMobileTab] = useState('list'); // 'list' | 'map'
  const [isLocating, setIsLocating] = useState(false);
  const [showSearchAreaBtn, setShowSearchAreaBtn] = useState(false);

  // Selected & Modal State
  const [selectedProId, setSelectedProId] = useState(selectedId);
  const [portfolioModalData, setPortfolioModalData] = useState(null);
  const [conciergeModalData, setConciergeModalData] = useState(null);
  const [conciergePhone, setConciergePhone] = useState('+91 98450 12345');
  const [conciergeNotes, setConciergeNotes] = useState('');
  const [conciergeSubmitted, setConciergeSubmitted] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  // Map DOM Refs
  const mapElementRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Synchronize internal selectedId with prop
  useEffect(() => {
    if (selectedId) setSelectedProId(selectedId);
  }, [selectedId]);

  // Compute filtered list using store helper
  const professionals = searchNearbyProfessionals({
    type: serviceType,
    radiusKm,
    userCoords,
    onlyPartners,
    minRating
  }).filter(item => {
    if (specializationFilter === 'all') return true;
    if (!item.specializations) return false;
    const filterLower = specializationFilter.toLowerCase();
    return item.specializations.some(s => s.toLowerCase().includes(filterLower));
  }).sort((a, b) => {
    if (sortOption === 'distance') return a.distanceKm - b.distanceKm;
    if (sortOption === 'rating') {
      const rA = a.isPartner ? a.stitchbeezRating : a.googleRating;
      const rB = b.isPartner ? b.stitchbeezRating : b.googleRating;
      return rB - rA;
    }
    if (sortOption === 'price') {
      const pA = a.startingPrice || a.startingDesignFee || 0;
      const pB = b.startingPrice || b.startingDesignFee || 0;
      return pA - pB;
    }
    return 0;
  });

  const activeProfessional = professionals.find(p => p.id === selectedProId) || professionals[0];

  // =========================================================================
  // LEAFLET MAP INITIALIZATION & SYNC
  // =========================================================================
  useEffect(() => {
    if (!mapElementRef.current) return;
    if (typeof window === 'undefined' || !window.L) return;

    // Destroy existing map if re-mounting
    if (!leafletMapRef.current) {
      const map = window.L.map(mapElementRef.current, {
        center: userCoords,
        zoom: radiusKm <= 5 ? 14 : radiusKm <= 10 ? 13 : 11,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // CartoDB Voyager or OpenStreetMap clean tiles
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>, &copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Create layer group for pins
      markersLayerRef.current = window.L.layerGroup().addTo(map);

      // Listen to map drag to show "Search this area"
      map.on('moveend', () => {
        setShowSearchAreaBtn(true);
      });

      leafletMapRef.current = map;
    }

    return () => {
      // Don't destroy on every state change, only unmount
    };
  }, []);

  // Sync Markers and Center on professionals or userCoords update
  useEffect(() => {
    const map = leafletMapRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer || !window.L) return;

    layer.clearLayers();

    // 1. User Location Pin (pulsing circle)
    const userIcon = window.L.divIcon({
      className: 'user-loc-divicon',
      html: `
        <div class="user-pulse-marker" title="Your Location">
          <div class="user-pulse-ring"></div>
          <div class="user-pulse-dot"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const userMarker = window.L.marker(userCoords, { icon: userIcon });
    userMarker.bindPopup(`
      <div style="font-family: inherit; font-size: 12px; font-weight: 700; color: #0f172a; text-align: center;">
        📍 Your Current Location<br/>
        <span style="font-size: 11px; font-weight: 400; color: #64748b;">Indiranagar, Bengaluru</span>
      </div>
    `);
    layer.addLayer(userMarker);

    // 2. Add Professional Pins
    professionals.forEach(pro => {
      const isSelected = pro.id === selectedProId;
      const isPartner = pro.isPartner;

      // Custom HTML Pin
      const pinHtml = isPartner ? `
        <div class="marker-pin-partner ${isSelected ? 'active' : ''}">
          <div class="marker-pin-head">
            <span class="marker-pin-icon">★</span>
          </div>
          <div class="marker-pin-point"></div>
          ${isSelected ? '<div class="marker-pin-pulse"></div>' : ''}
        </div>
      ` : `
        <div class="marker-pin-google ${isSelected ? 'active' : ''}">
          <div class="marker-pin-head">
            <span class="marker-pin-icon">G</span>
          </div>
          <div class="marker-pin-point"></div>
        </div>
      `;

      const customIcon = window.L.divIcon({
        className: 'professional-divicon',
        html: pinHtml,
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -42]
      });

      const marker = window.L.marker(pro.coords, { icon: customIcon });

      const popupContent = `
        <div class="map-popup-card">
          <div class="map-popup-header">
            <span class="map-popup-badge ${isPartner ? 'partner' : 'google'}">
              ${isPartner ? '★ Verified Partner' : 'G Google Place'}
            </span>
            <span class="map-popup-dist">${pro.distanceKm} km away</span>
          </div>
          <h4 class="map-popup-title">${pro.name}</h4>
          <p class="map-popup-addr">${pro.address}</p>
          <div class="map-popup-footer">
            <div class="map-popup-rating">
              ★ ${isPartner ? pro.stitchbeezRating : pro.googleRating}
              <span>(${isPartner ? `${pro.stitchbeezOrdersCount} orders` : `${pro.googleReviewsCount} reviews`})</span>
            </div>
            <div class="map-popup-price">
              Starts ₹${pro.startingPrice || pro.startingDesignFee}
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setSelectedProId(pro.id);
        onSelectProfessional(pro);
      });

      layer.addLayer(marker);
    });

  }, [professionals, selectedProId, userCoords]);

  // Handle Select Professional Card
  const handleCardClick = (pro) => {
    setSelectedProId(pro.id);
    onSelectProfessional(pro);

    if (leafletMapRef.current && pro.coords) {
      leafletMapRef.current.flyTo(pro.coords, 14, { duration: 1.2 });
    }
  };

  // Browser Geolocation
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const newCoords = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(newCoords);
        setSearchQuery('Current Location');
        setShowSearchAreaBtn(false);

        if (leafletMapRef.current) {
          leafletMapRef.current.flyTo(newCoords, 14, { duration: 1 });
        }
      },
      (err) => {
        setIsLocating(false);
        // Default graceful fallback to Indiranagar
        setUserCoords([12.9719, 77.6412]);
        setSearchQuery('Indiranagar, Bengaluru');
        alert("Location access was denied or timed out. Defaulted to Indiranagar, Bengaluru.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Handle Quick Locality Change
  const handleLocalitySelect = (loc) => {
    setSearchQuery(`${loc.name}, Bengaluru`);
    setUserCoords(loc.coords);
    setShowSearchAreaBtn(false);
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo(loc.coords, 13, { duration: 1 });
    }
  };

  // Search Map Center Area
  const handleSearchThisArea = () => {
    if (!leafletMapRef.current) return;
    const center = leafletMapRef.current.getCenter();
    setUserCoords([center.lat, center.lng]);
    setSearchQuery(`Map Area (${center.lat.toFixed(3)}, ${center.lng.toFixed(3)})`);
    setShowSearchAreaBtn(false);
  };

  // Handle Concierge Booking Submit
  const handleConciergeSubmit = (e) => {
    e.preventDefault();
    setConciergeSubmitted(true);
    setTimeout(() => {
      // Automatically select this professional for the workflow
      if (conciergeModalData) {
        onSelectProfessional({
          ...conciergeModalData,
          isConciergeRequest: true,
          conciergePhone,
          conciergeNotes
        });
      }
      setConciergeModalData(null);
      setConciergeSubmitted(false);
    }, 1500);
  };

  return (
    <div className={`nearby-map-container ${theme === 'dark' ? 'dark' : ''}`}>
      
      {/* 1. Header & Location Controls */}
      <div className="nearby-map-header">
        <div className="nearby-map-title-row">
          <div>
            <div className="nearby-eyebrow">
              <MapPin size={15} style={{ color: '#FF087A' }} />
              <span>GOOGLE MAPS & STITCHBEEZ DISCOVERY</span>
            </div>
            <h2 className="nearby-main-heading">
              {title || (serviceType === 'tailor' 
                ? 'Find Nearby Kids Tailoring Specialists' 
                : 'Discover Fashion Designers & Ateliers')}
            </h2>
            <p className="nearby-subtitle">
              {subtitle || 'Explore background-verified StitchBeez partners and Google Places discovered studios near your doorstep.'}
            </p>
          </div>

          {/* Mobile List/Map View Toggle */}
          <div className="nearby-mobile-view-toggle">
            <button
              type="button"
              className={`toggle-pill ${mobileTab === 'list' ? 'active' : ''}`}
              onClick={() => setMobileTab('list')}
            >
              List ({professionals.length})
            </button>
            <button
              type="button"
              className={`toggle-pill ${mobileTab === 'map' ? 'active' : ''}`}
              onClick={() => setMobileTab('map')}
            >
              Map View
            </button>
          </div>
        </div>

        {/* Location Search Bar + Quick Localities */}
        <div className="nearby-search-strip">
          <div className="nearby-search-input-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              className="nearby-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter locality, landmark or PIN code (e.g. Indiranagar, 560038)"
            />
            <button
              type="button"
              className="use-location-btn"
              onClick={handleUseMyLocation}
              title="Detect current GPS location"
            >
              <Navigation size={14} className={isLocating ? 'spin-anim' : ''} />
              <span>{isLocating ? 'Locating...' : 'Use My Location'}</span>
            </button>
          </div>

          {/* Quick Locality Chips */}
          <div className="nearby-quick-localities">
            <span className="quick-label">Popular:</span>
            {QUICK_LOCALITIES.map(loc => (
              <button
                key={loc.name}
                type="button"
                className={`quick-locality-chip ${searchQuery.includes(loc.name) ? 'active' : ''}`}
                onClick={() => handleLocalitySelect(loc)}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Strip */}
        <div className="nearby-filter-strip">
          {/* Distance Radius */}
          <div className="filter-group">
            <span className="filter-group-label">Radius:</span>
            <div className="radius-pills">
              {[2, 5, 10, 25, 50].map(r => (
                <button
                  key={r}
                  type="button"
                  className={`radius-pill ${radiusKm === r ? 'active' : ''}`}
                  onClick={() => setRadiusKm(r)}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>

          {/* Verified Partner Toggle */}
          <button
            type="button"
            className={`verified-toggle-btn ${onlyPartners ? 'active' : ''}`}
            onClick={() => setOnlyPartners(!onlyPartners)}
          >
            <ShieldCheck size={16} />
            <span>StitchBeez Verified Only</span>
            {onlyPartners && <Check size={14} />}
          </button>

          {/* Specialization Filter */}
          <div className="filter-group">
            <select
              className="spec-filter-select"
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
            >
              <option value="all">All Specializations</option>
              <option value="infant">Infant & Newborn</option>
              <option value="traditional">Traditional & Ethnic</option>
              <option value="party">Party & Occasion</option>
              <option value="uniform">School Uniforms</option>
              <option value="couture">Bespoke Couture</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="filter-group sort-group">
            <span className="filter-group-label">Sort:</span>
            <select
              className="spec-filter-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="distance">Nearest Distance</option>
              <option value="rating">Highest Rated</option>
              <option value="price">Starting Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Main Dual Split View (Cards on Left + Interactive Map on Right) */}
      <div className={`nearby-split-view ${mobileTab === 'map' ? 'mobile-show-map' : 'mobile-show-list'}`}>
        
        {/* LEFT COLUMN: LISTINGS */}
        <div className="nearby-listings-col">
          <div className="listings-summary-bar">
            <span>
              Found <strong>{professionals.length}</strong> {serviceType === 'tailor' ? 'tailors' : 'fashion designers'} within <strong>{radiusKm} km</strong>
            </span>
            <div className="legend-items">
              <span className="legend-item partner"><span className="legend-dot"></span> StitchBeez Partner</span>
              <span className="legend-item google"><span className="legend-dot"></span> Google Place</span>
            </div>
          </div>

          {professionals.length === 0 ? (
            <div className="no-professionals-found">
              <MapPin size={40} style={{ color: '#94a3b8', margin: '0 auto 12px auto' }} />
              <h4>No professionals found within {radiusKm} km</h4>
              <p>Try expanding your search radius to 25 km or clearing the verified filter.</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => { setRadiusKm(25); setOnlyPartners(false); setSpecializationFilter('all'); }}
              >
                Expand Search to 25 km
              </button>
            </div>
          ) : (
            <div className="professionals-cards-stack">
              {professionals.map(pro => {
                const isSelected = selectedProId === pro.id;
                const isPartner = pro.isPartner;

                return (
                  <div
                    key={pro.id}
                    className={`pro-card ${isSelected ? 'selected' : ''} ${isPartner ? 'is-partner-card' : 'is-google-card'}`}
                    onClick={() => handleCardClick(pro)}
                  >
                    {/* Header Row */}
                    <div className="pro-card-header">
                      <div className="pro-avatar-box">
                        <img 
                          src={pro.photo || pro.avatar || (isPartner ? '/tailor_hero_1.jpg' : '/tailor_hero_2.jpg')} 
                          alt={pro.name} 
                          className="pro-avatar-img"
                        />
                        {isPartner ? (
                          <div className="pro-badge-verified" title="StitchBeez Verified Partner">
                            <ShieldCheck size={14} />
                          </div>
                        ) : (
                          <div className="pro-badge-google" title="Discovered via Google Maps">
                            <span>G</span>
                          </div>
                        )}
                      </div>

                      <div className="pro-details-main">
                        <div className="pro-status-tag-row">
                          {isPartner ? (
                            <span className="pro-tag partner-tag">
                              <Sparkles size={11} /> StitchBeez Verified Partner
                            </span>
                          ) : (
                            <span className="pro-tag google-tag">
                              Discovered via Google Maps
                            </span>
                          )}
                          <span className="pro-dist-badge">
                            <MapPin size={12} /> {pro.distanceKm} km away
                          </span>
                        </div>

                        <h3 className="pro-name">{pro.name}</h3>

                        {isPartner ? (
                          <div className="pro-lead-artisan">
                            {pro.masterTailor ? `Master Tailor: ${pro.masterTailor}` : pro.title}
                            {pro.experienceYears ? ` • ${pro.experienceYears} Yrs Exp.` : ''}
                          </div>
                        ) : (
                          <div className="pro-lead-artisan">
                            Independent Tailoring Shop • {pro.locality}
                          </div>
                        )}

                        <div className="pro-location-text">
                          {pro.address}
                        </div>
                      </div>
                    </div>

                    {/* Ratings & Pricing Metrics */}
                    <div className="pro-metrics-strip">
                      <div className="metric-item">
                        <div className="rating-pill">
                          <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
                          <strong>{isPartner ? pro.stitchbeezRating : pro.googleRating}</strong>
                        </div>
                        <span className="metric-sub">
                          {isPartner ? `${pro.stitchbeezOrdersCount} StitchBeez Orders` : `${pro.googleReviewsCount} Google Reviews`}
                        </span>
                      </div>

                      <div className="metric-divider" />

                      <div className="metric-item">
                        <div className="metric-val">
                          ₹{pro.startingPrice || pro.startingDesignFee}
                        </div>
                        <span className="metric-sub">Starting Stitching</span>
                      </div>

                      <div className="metric-divider" />

                      <div className="metric-item">
                        <div className="metric-val" style={{ color: '#10B981' }}>
                          {pro.turnAroundDays || '3-5 Days'}
                        </div>
                        <span className="metric-sub">Est. Turnaround</span>
                      </div>
                    </div>

                    {/* Specialization Tags */}
                    {pro.specializations && pro.specializations.length > 0 && (
                      <div className="pro-specializations-row">
                        {pro.specializations.slice(0, 3).map(s => (
                          <span key={s} className="specialization-chip">{s}</span>
                        ))}
                        {pro.specializations.length > 3 && (
                          <span className="specialization-chip more">+{pro.specializations.length - 3}</span>
                        )}
                      </div>
                    )}

                    {/* Non-Partner Notice Banner */}
                    {!isPartner && (
                      <div className="non-partner-notice">
                        <Info size={14} style={{ flexShrink: 0, color: '#3B82F6' }} />
                        <span>
                          Discovered via Google Maps. StitchBeez concierge will coordinate fabric pickup and delivery with this shop.
                        </span>
                      </div>
                    )}

                    {/* Action Buttons Row */}
                    <div className="pro-actions-row">
                      {isPartner ? (
                        <>
                          {pro.portfolioSamples && pro.portfolioSamples.length > 0 && (
                            <button
                              type="button"
                              className="btn-outline-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPortfolioModalData(pro);
                              }}
                            >
                              <Eye size={14} />
                              <span>View Portfolio</span>
                            </button>
                          )}

                          <button
                            type="button"
                            className={`btn-select-direct ${isSelected ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(pro);
                            }}
                          >
                            {isSelected ? (
                              <>
                                <Check size={15} />
                                <span>Selected for Booking</span>
                              </>
                            ) : (
                              <>
                                <span>Direct Instant Booking</span>
                                <ArrowRight size={14} />
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <>
                          <a
                            href={pro.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(pro.name + ' ' + pro.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={14} />
                            <span>View on Google Maps</span>
                          </a>

                          <button
                            type="button"
                            className="btn-request-concierge"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConciergeModalData(pro);
                            }}
                          >
                            <span>Request StitchBeez Booking</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INTERACTIVE MAP CANVAS */}
        <div className="nearby-map-canvas-wrapper">
          <div className="nearby-map-container-div" ref={mapElementRef} />

          {/* "Search this area" Button overlay */}
          {showSearchAreaBtn && (
            <div className="search-this-area-overlay">
              <button
                type="button"
                className="search-this-area-btn"
                onClick={handleSearchThisArea}
              >
                <Search size={14} />
                <span>Search this map area</span>
              </button>
            </div>
          )}

          {/* Bottom Floating Map Active Professional Pill */}
          {activeProfessional && (
            <div className="map-active-pro-pill">
              <div className="pill-avatar-wrap">
                <img 
                  src={activeProfessional.photo || activeProfessional.avatar || '/tailor_hero_1.jpg'} 
                  alt={activeProfessional.name} 
                />
              </div>
              <div className="pill-text-wrap">
                <div className="pill-name">{activeProfessional.name}</div>
                <div className="pill-meta">
                  {activeProfessional.isPartner ? '★ Verified Partner' : 'G Google Place'} • {activeProfessional.distanceKm} km
                </div>
              </div>
              <button
                type="button"
                className="pill-select-btn"
                onClick={() => handleCardClick(activeProfessional)}
              >
                {selectedProId === activeProfessional.id ? 'Selected ✓' : 'Select'}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ===================================================================== */}
      {/* MODAL 1: PORTFOLIO & PAST KIDS CREATIONS GALLERY                      */}
      {/* ===================================================================== */}
      {portfolioModalData && (
        <div className="modal-backdrop" onClick={() => setPortfolioModalData(null)}>
          <div className="modal-dialog portfolio-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={portfolioModalData.photo || portfolioModalData.avatar || '/tailor_hero_1.jpg'} 
                  alt={portfolioModalData.name} 
                  className="modal-header-avatar"
                />
                <div>
                  <h3 className="modal-title">{portfolioModalData.name}</h3>
                  <div className="modal-sub">
                    {portfolioModalData.masterTailor ? `Master: ${portfolioModalData.masterTailor}` : portfolioModalData.title} • {portfolioModalData.experienceYears} Years Kids Stitching Experience
                  </div>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setPortfolioModalData(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="portfolio-gallery-headline">
                <h4>Past Kids Outfits & Stitching Samples</h4>
                <p>Every outfit is hand-crafted with skin-safe inner linings and growth margins.</p>
              </div>

              <div className="portfolio-grid">
                {portfolioModalData.portfolioSamples?.map((sample, idx) => (
                  <div key={idx} className="portfolio-sample-card">
                    <div 
                      className="portfolio-img-box"
                      onClick={() => setZoomImage(sample.image)}
                    >
                      <img src={sample.image} alt={sample.name} />
                      <div className="zoom-hint">
                        <Eye size={16} /> Click to Zoom
                      </div>
                    </div>
                    <div className="portfolio-info-box">
                      <span className="sample-category-tag">{sample.category}</span>
                      <h5 className="sample-title">{sample.name}</h5>
                      <p className="sample-desc">{sample.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-select-direct"
                onClick={() => {
                  handleCardClick(portfolioModalData);
                  setPortfolioModalData(null);
                }}
              >
                <Check size={16} />
                <span>Select {portfolioModalData.name} for Stitching</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: REQUEST CONCIERGE BOOKING (FOR GOOGLE PLACES SHOPS)          */}
      {/* ===================================================================== */}
      {conciergeModalData && (
        <div className="modal-backdrop" onClick={() => setConciergeModalData(null)}>
          <div className="modal-dialog concierge-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="nearby-eyebrow">STITCHBEEZ CONCIERGE SERVICE</span>
                <h3 className="modal-title">Book Stitching with {conciergeModalData.name}</h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setConciergeModalData(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="concierge-explainer-box">
                <div className="explainer-icon-circle">
                  <Award size={22} color="#FF087A" />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.96rem', fontWeight: 700, color: 'var(--kids-navy)' }}>
                    How Google Discovered Shop Booking Works
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--kids-navy-muted)', lineHeight: 1.45 }}>
                    This shop was discovered via Google Places ({conciergeModalData.googleRating} ★ from {conciergeModalData.googleReviewsCount} reviews). StitchBeez concierge coordinates fabric pickup from your home, physically conveys measurements to this tailor, inspects final seams, and delivers the outfit to you.
                  </p>
                </div>
              </div>

              {conciergeSubmitted ? (
                <div className="concierge-success-box">
                  <Check size={36} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
                  <h4>Concierge Request Confirmed!</h4>
                  <p>Our team will assign your order to {conciergeModalData.name}. Continuing your stitching booking...</p>
                </div>
              ) : (
                <form onSubmit={handleConciergeSubmit} style={{ marginTop: '16px' }}>
                  <div className="form-field-group">
                    <label className="form-field-label">Your Phone Number for Updates</label>
                    <input 
                      type="tel" 
                      className="modal-text-input"
                      value={conciergePhone}
                      onChange={(e) => setConciergePhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field-group" style={{ marginTop: '12px' }}>
                    <label className="form-field-label">Special Stitching Instructions for this Shop</label>
                    <textarea 
                      className="modal-textarea"
                      rows="2"
                      value={conciergeNotes}
                      onChange={(e) => setConciergeNotes(e.target.value)}
                      placeholder="e.g. Please ask tailor to leave 2 inches extra side seam margins for child's growth."
                    />
                  </div>

                  <div className="modal-footer" style={{ padding: '16px 0 0 0', marginTop: '16px' }}>
                    <button
                      type="submit"
                      className="btn-select-direct"
                      style={{ width: '100%' }}
                    >
                      Confirm Concierge Booking & Proceed
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: IMAGE ZOOM PREVIEW                                           */}
      {/* ===================================================================== */}
      {zoomImage && (
        <div className="zoom-backdrop" onClick={() => setZoomImage(null)}>
          <img src={zoomImage} alt="Zoom Preview" className="zoom-full-image" />
          <button type="button" className="zoom-close-btn" onClick={() => setZoomImage(null)}>
            <X size={24} />
          </button>
        </div>
      )}

    </div>
  );
}
