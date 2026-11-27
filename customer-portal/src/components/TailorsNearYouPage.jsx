import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Compass,
  Eye,
  Heart,
  Layers,
  MapPin,
  Navigation,
  RefreshCw,
  Scissors,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  calculateDistanceKm,
  getAllProfessionals,
  NEIGHBORHOOD_COORDS,
  NEIGHBORHOODS,
  SPECIALTY_CATEGORIES,
} from '../data/professionals';
import PremiumSelect from './PremiumSelect';

export default function TailorsNearYouPage({
  tailors = [],
  initialCategory = 'all',
  initialNeighborhood = 'All Localities',
  userLocation = null,
  onSetUserLocation,
  onBack,
  onViewProfile,
  onBookProfessional,
  theme = 'light',
}) {
  const isLight = theme === 'light';

  const [selectedNeighborhood, setSelectedNeighborhood] = useState(initialNeighborhood);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationNotice, setLocationNotice] = useState('');
  const [savedTailors, setSavedTailors] = useState([]);
  const [mapType, setMapType] = useState('roadmap');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const allProfessionals = useMemo(() => getAllProfessionals(tailors), [tailors]);
  const [activeTailor, setActiveTailor] = useState(() => allProfessionals[0] || null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const tailorMarkersRef = useRef({});

  const handleGetLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationNotice('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setLocationNotice('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        if (onSetUserLocation) onSetUserLocation(coords);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === 1) {
          setLocationNotice('Location permission was denied. Showing studios by locality.');
        } else if (error.code === 2) {
          setLocationNotice('Location position unavailable. Showing curated Bengaluru studios.');
        } else {
          setLocationNotice('Location request timed out. Please try again.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const filteredTailors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allProfessionals
      .filter((t) => {
        const matchesNeighborhood =
          selectedNeighborhood === 'All Localities' ||
          (t.neighborhood && t.neighborhood.toLowerCase() === selectedNeighborhood.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' ||
          t.category === selectedCategory ||
          (Array.isArray(t.categories) && t.categories.includes(selectedCategory));
        const matchesSearch =
          q === '' ||
          t.name.toLowerCase().includes(q) ||
          (t.masterTailor && t.masterTailor.toLowerCase().includes(q)) ||
          (t.specialty && t.specialty.toLowerCase().includes(q)) ||
          (t.address && t.address.toLowerCase().includes(q)) ||
          (t.categoryLabel && t.categoryLabel.toLowerCase().includes(q)) ||
          (Array.isArray(t.tags) && t.tags.some((tag) => tag.toLowerCase().includes(q)));
        return matchesNeighborhood && matchesCategory && matchesSearch;
      })
      .map((t) => {
        if (!userLocation) {
          return { ...t, calculatedDist: null, distVal: null };
        }
        const dist = calculateDistanceKm(userLocation.lat, userLocation.lng, t.lat, t.lng);
        return { ...t, calculatedDist: `${dist} km`, distVal: dist };
      })
      .sort((a, b) => {
        if (userLocation && a.distVal !== null && b.distVal !== null) {
          return a.distVal - b.distVal;
        }
        return 0;
      });
  }, [allProfessionals, selectedNeighborhood, selectedCategory, searchQuery, userLocation]);

  useEffect(() => {
    if (
      filteredTailors.length > 0 &&
      (!activeTailor || !filteredTailors.some((t) => t.id === activeTailor.id))
    ) {
      setActiveTailor(filteredTailors[0]);
    }
  }, [filteredTailors, activeTailor]);

  const toggleSaveTailor = (tailorId, e) => {
    e.stopPropagation();
    setSavedTailors((prev) =>
      prev.includes(tailorId) ? prev.filter((id) => id !== tailorId) : [...prev, tailorId]
    );
  };

  // Initialize Leaflet interactive map
  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return undefined;
    const container = mapContainerRef.current;

    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch {
        // Ignore cleanup errors
      }
      mapInstanceRef.current = null;
    }
    if (container._leaflet_id) {
      delete container._leaflet_id;
    }

    const initialLat = activeTailor ? activeTailor.lat : userLocation ? userLocation.lat : 12.9716;
    const initialLng = activeTailor ? activeTailor.lng : userLocation ? userLocation.lng : 77.5946;

    const map = window.L.map(container, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([initialLat, initialLng], 13);

    const tileUrl =
      mapType === 'satellite'
        ? 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
        : 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';

    const tileLayer = window.L.tileLayer(tileUrl, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="https://maps.google.com" target="_blank" rel="noreferrer">Google Maps</a>',
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    markersLayerRef.current = window.L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    const timer1 = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 250);
    const timer2 = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // Ignore cleanup errors
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Switch tile layer
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;
    if (tileLayerRef.current) {
      try {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      } catch {
        // Ignore
      }
    }
    const tileUrl =
      mapType === 'satellite'
        ? 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
        : 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';

    tileLayerRef.current = window.L.tileLayer(tileUrl, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="https://maps.google.com" target="_blank" rel="noreferrer">Google Maps</a>',
    }).addTo(mapInstanceRef.current);
  }, [mapType]);

  // Render markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !window.L) return;

    markersLayerRef.current.clearLayers();
    tailorMarkersRef.current = {};

    if (userLocation) {
      const userSvgIcon = window.L.divIcon({
        html: `
          <div style="position: relative; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 26px; height: 26px; border-radius: 50%; background: rgba(76, 201, 240, 0.38);"></div>
            <div style="position: relative; width: 13px; height: 13px; border-radius: 50%; background: #4cc9f0; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>
          </div>
        `,
        className: 'user-gps-pulse-marker',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      window.L.marker([userLocation.lat, userLocation.lng], { icon: userSvgIcon })
        .addTo(markersLayerRef.current)
        .bindPopup('<strong>Your Current Location</strong>');
    }

    filteredTailors.forEach((t) => {
      const isActive = activeTailor && activeTailor.id === t.id;
      const tailorIcon = window.L.divIcon({
        html: `
          <div style="transform: ${isActive ? 'scale(1.15)' : 'scale(1)'}; transition: transform 0.2s ease; cursor: pointer; display: flex; flex-direction: column; align-items: center;">
            <div style="background: ${isActive ? '#f72585' : '#0f172a'}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #ffffff; box-shadow: 0 3px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
              <span style="transform: rotate(45deg); font-size: 12px; color: #fff;">✂</span>
            </div>
            ${isActive ? `<div style="margin-top: 3px; background: #f72585; color: #fff; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 6px; white-space: nowrap;">★ ${t.rating}</div>` : ''}
          </div>
        `,
        className: `tailor-marker-${t.id}`,
        iconSize: [32, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = window.L.marker([t.lat, t.lng], {
        icon: tailorIcon,
        zIndexOffset: isActive ? 1000 : 100,
      }).addTo(markersLayerRef.current);

      tailorMarkersRef.current[t.id] = marker;

      const distText = t.calculatedDist ? ` • ${t.calculatedDist} away` : '';
      marker.bindPopup(`
        <div style="font-family: Inter, sans-serif; min-width: 210px; max-width: 240px; padding: 4px 2px; color: #0f172a;">
          <div style="font-weight: 700; font-size: 13px; margin-bottom: 2px;">${t.name}</div>
          <div style="font-size: 11px; color: #f72585; font-weight: 700; margin-bottom: 4px;">★ ${t.rating}${distText}</div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 8px;">${t.address}</div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background: #f72585; color: #ffffff !important; text-decoration: none; padding: 6px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;">Directions</a>
        </div>
      `);

      marker.on('click', () => setActiveTailor(t));
      if (isActive) marker.openPopup();
    });
  }, [filteredTailors, activeTailor, userLocation]);

  useEffect(() => {
    if (!mapInstanceRef.current || !activeTailor) return;
    mapInstanceRef.current.flyTo([activeTailor.lat, activeTailor.lng], 15, {
      animate: true,
      duration: 0.7,
    });
    if (tailorMarkersRef.current[activeTailor.id]) {
      tailorMarkersRef.current[activeTailor.id].openPopup();
    }
  }, [activeTailor]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (selectedNeighborhood !== 'All Localities' && NEIGHBORHOOD_COORDS[selectedNeighborhood]) {
      mapInstanceRef.current.flyTo(NEIGHBORHOOD_COORDS[selectedNeighborhood], 14, {
        animate: true,
        duration: 0.7,
      });
    }
  }, [selectedNeighborhood]);

  const getMapDirectionsUrl = () => {
    if (activeTailor) {
      return `https://www.google.com/maps/dir/?api=1&destination=${activeTailor.lat},${activeTailor.lng}`;
    }
    if (userLocation) {
      return `https://www.google.com/maps/search/?api=1&query=${userLocation.lat},${userLocation.lng}`;
    }
    return 'https://www.google.com/maps/search/?api=1&query=Tailors+Bengaluru';
  };

  return (
    <section className={`tailors-map-page ${isLight ? 'is-light' : 'is-dark'}`}>
      <div className="landing-container">
        <div className="tmy-topbar">
          <button type="button" className="pro-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
          <span className="tmy-count-pill">{filteredTailors.length} Professionals Available</span>
        </div>

        <div className="tmy-header">
          <h1>Tailors &amp; Master Craftsmen Near You</h1>
          <p>Explore verified professionals on the interactive map, compare specialties, get directions, or book doorstep trials.</p>
        </div>

        {/* Advanced Filter Bar */}
        <div className="tmy-filter-card">
          <div className="tmy-filter-top">
            <div className="tmy-search-wrap">
              <Search size={17} className="tmy-search-icon" />
              <input
                type="text"
                placeholder="Search studio, craftsman, specialty, or locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
                  <X size={15} />
                </button>
              )}
            </div>

            <PremiumSelect
              icon={MapPin}
              value={selectedNeighborhood}
              onChange={setSelectedNeighborhood}
              ariaLabel="Filter by locality"
              theme={theme}
              options={NEIGHBORHOODS.map((hood) => ({ value: hood, label: hood }))}
              className="tmy-premium-locality"
            />

            <button
              type="button"
              className={`tmy-gps-btn ${userLocation ? 'is-active' : ''}`}
              onClick={handleGetLiveLocation}
              disabled={isLocating}
            >
              {isLocating ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  <span>Detecting...</span>
                </>
              ) : userLocation ? (
                <>
                  <CheckCircle2 size={15} />
                  <span>Live Location Active</span>
                </>
              ) : (
                <>
                  <Navigation size={15} />
                  <span>Use My Location</span>
                </>
              )}
            </button>
          </div>

          {locationNotice && <div className="tmy-location-notice">{locationNotice}</div>}

          <div className="tmy-cat-scroll">
            {SPECIALTY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`tmy-cat-chip ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map + List Split Grid */}
        <div className="tmy-split-grid">
          <div className="tmy-map-panel">
            <div className="tmy-map-header">
              <div className="tmy-map-status">
                <span className="tmy-live-dot" />
                <strong>
                  {activeTailor ? `${activeTailor.neighborhood} • ${activeTailor.name}` : 'Studio Map Locator'}
                </strong>
              </div>
              <div className="tmy-map-actions">
                <button
                  type="button"
                  className="tmy-map-toggle"
                  onClick={() => setMapType((m) => (m === 'roadmap' ? 'satellite' : 'roadmap'))}
                >
                  <Layers size={14} />
                  <span>{mapType === 'roadmap' ? 'Satellite' : 'Roadmap'}</span>
                </button>
                <a
                  href={getMapDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tmy-map-dir-btn"
                >
                  <Compass size={14} />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            <div className="tmy-leaflet-wrap">
              <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: '460px' }} />
            </div>

            {activeTailor && (
              <div className="tmy-map-footer">
                <div className="tmy-map-footer-info">
                  <img src={activeTailor.image} alt={activeTailor.name} />
                  <div>
                    <strong>{activeTailor.name}</strong>
                    <span>
                      {activeTailor.address}
                      {activeTailor.calculatedDist ? ` (${activeTailor.calculatedDist})` : ''}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="pro-btn-primary"
                  onClick={() => onBookProfessional(activeTailor)}
                >
                  Book Doorstep Trial
                </button>
              </div>
            )}
          </div>

          <div className="tmy-results-list">
            {filteredTailors.length === 0 ? (
              <div className="tmy-empty-box">
                <Scissors size={30} style={{ color: '#f72585' }} />
                <h3>No Professionals Found</h3>
                <p>Try selecting a different category or locality.</p>
                <button
                  type="button"
                  className="pro-btn-primary"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedNeighborhood('All Localities');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredTailors.map((tailor) => {
                const isSelected = activeTailor && activeTailor.id === tailor.id;
                const isSaved = savedTailors.includes(tailor.id);
                return (
                  <div
                    key={tailor.id}
                    className={`tmy-list-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setActiveTailor(tailor)}
                  >
                    <div className="tmy-list-top">
                      <img src={tailor.image} alt={tailor.name} className="tmy-list-photo" />
                      <div className="tmy-list-meta">
                        <div className="tmy-list-badges">
                          <span className="tmy-list-cat">{tailor.categoryLabel || tailor.category}</span>
                          {tailor.verified && (
                            <span className="tmy-list-verified">
                              <ShieldCheck size={12} /> Verified
                            </span>
                          )}
                        </div>
                        <h3>{tailor.name}</h3>
                        <p className="tmy-list-master">
                          <Award size={13} /> {tailor.masterTailor} • {tailor.experience}
                        </p>
                        <p className="tmy-list-spec">{tailor.specialty}</p>
                      </div>
                      <button
                        type="button"
                        className="tmy-heart-btn"
                        onClick={(e) => toggleSaveTailor(tailor.id, e)}
                        aria-label="Save professional"
                      >
                        <Heart size={18} fill={isSaved ? '#f72585' : 'none'} color={isSaved ? '#f72585' : 'currentColor'} />
                      </button>
                    </div>

                    <div className="tmy-list-stats">
                      <span>★ {tailor.rating} ({tailor.reviewsCount})</span>
                      <span>•</span>
                      <span>{tailor.orders}+ orders</span>
                      {tailor.calculatedDist && (
                        <>
                          <span>•</span>
                          <span>{tailor.calculatedDist} away</span>
                        </>
                      )}
                      {tailor.doorstepAvailable && (
                        <>
                          <span>•</span>
                          <span className="is-green">Doorstep Available</span>
                        </>
                      )}
                    </div>

                    <div className="tmy-list-actions">
                      <button
                        type="button"
                        className="pro-btn-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProfile(tailor);
                        }}
                      >
                        <Eye size={14} />
                        <span>View Profile</span>
                      </button>
                      <button
                        type="button"
                        className="pro-btn-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookProfessional(tailor);
                        }}
                      >
                        <Scissors size={14} />
                        <span>Book Doorstep Trial</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
