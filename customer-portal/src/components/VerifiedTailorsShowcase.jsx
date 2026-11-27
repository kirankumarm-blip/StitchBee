import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  Loader2,
  MapPin,
  Scissors,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import {
  calculateDistanceKm,
  getAllProfessionals,
  NEIGHBORHOODS,
  SPECIALTY_CATEGORIES,
} from '../data/professionals';

function PremiumDropdown({ icon: Icon, value, options, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={containerRef} className={`ec-dropdown ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="ec-dropdown-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="ec-dropdown-trigger-left">
          {Icon && <Icon size={14} className="ec-dropdown-icon" />}
          <span className="ec-dropdown-label">{selectedOption?.label}</span>
        </span>
        <ChevronDown size={15} className={`ec-dropdown-chevron ${open ? 'is-rotated' : ''}`} />
      </button>

      {open && (
        <div className="ec-dropdown-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`ec-dropdown-option ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} className="ec-dropdown-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function VerifiedTailorsShowcase({
  tailors = [],
  userLocation = null,
  onSetUserLocation,
  onViewProfile,
  onExploreMap,
  theme = 'light',
}) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Localities');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [locatingState, setLocatingState] = useState('idle'); // 'idle' | 'loading' | 'granted' | 'denied' | 'error'
  const [locationFeedback, setLocationFeedback] = useState('');

  const trackRef = useRef(null);
  const isLight = theme === 'light';

  const localityOptions = useMemo(
    () => NEIGHBORHOODS.map((area) => ({ value: area, label: area })),
    []
  );

  const categoryOptions = useMemo(
    () => SPECIALTY_CATEGORIES.map((cat) => ({ value: cat.id, label: cat.label })),
    []
  );

  const allProfessionals = useMemo(() => getAllProfessionals(tailors), [tailors]);

  const filteredProfessionals = useMemo(() => {
    const base = allProfessionals.filter((pro) => {
      const matchesLocality =
        selectedNeighborhood === 'All Localities' ||
        (pro.neighborhood &&
          pro.neighborhood.toLowerCase() === selectedNeighborhood.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        pro.category === selectedCategory ||
        (Array.isArray(pro.categories) && pro.categories.includes(selectedCategory));

      return matchesLocality && matchesCategory;
    });

    return base
      .map((pro) => {
        const distanceKm =
          userLocation && Number.isFinite(pro.lat) && Number.isFinite(pro.lng)
            ? calculateDistanceKm(userLocation.lat, userLocation.lng, pro.lat, pro.lng)
            : null;
        return { ...pro, distanceKm };
      })
      .sort((a, b) => {
        if (a.distanceKm !== null && b.distanceKm !== null) {
          return a.distanceKm - b.distanceKm;
        }
        if (userLocation && (a.distanceKm !== null || b.distanceKm !== null)) {
          return a.distanceKm !== null ? -1 : 1;
        }
        return (b.rating || 0) - (a.rating || 0);
      });
  }, [allProfessionals, selectedNeighborhood, selectedCategory, userLocation]);

  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocatingState('error');
      setLocationFeedback('Location lookup is not supported in this browser.');
      return;
    }

    setLocatingState('loading');
    setLocationFeedback('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        if (onSetUserLocation) {
          onSetUserLocation(coords);
        }
        setLocatingState('granted');
        setLocationFeedback('Sorted by distance from your location.');
      },
      (error) => {
        if (error.code === 1) {
          setLocatingState('denied');
          setLocationFeedback(
            'Location permission was declined. Showing available local professionals.'
          );
        } else {
          setLocatingState('error');
          setLocationFeedback(
            'Unable to fetch your location right now. You can select a locality instead.'
          );
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const scrollCarousel = (direction) => {
    const container = trackRef.current;
    if (!container) return;
    const step = Math.max(container.clientWidth * 0.78, 280);
    container.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedNeighborhood('All Localities');
  };

  return (
    <section
      id="tailors-near-you"
      className={`ec-section ${isLight ? 'is-light' : 'is-dark'}`}
      aria-labelledby="ec-heading"
    >
      <div className="landing-container ec-container">
        {/* Centered Header + View All Action */}
        <div className="ec-header">
          <div className="ec-header-center">
            <h2 id="ec-heading" className="ec-title">
              Expert <span className="landing-title-pink">Craftsmen</span> Near You
            </h2>
            <p className="ec-subtitle">
              Find skilled local professionals for every creation.
            </p>
          </div>
          <button
            type="button"
            className="ec-view-all-link"
            onClick={() =>
              onExploreMap && onExploreMap(selectedCategory, selectedNeighborhood)
            }
          >
            <span>View All Professionals</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Centered Premium Dropdown Filter Bar */}
        <div className="ec-controls-bar">
          <PremiumDropdown
            icon={MapPin}
            value={selectedNeighborhood}
            options={localityOptions}
            onChange={setSelectedNeighborhood}
            ariaLabel="Filter professionals by locality"
          />

          <PremiumDropdown
            icon={Layers}
            value={selectedCategory}
            options={categoryOptions}
            onChange={setSelectedCategory}
            ariaLabel="Filter professionals by category"
          />

          <button
            type="button"
            className={`ec-gps-btn ${userLocation ? 'is-active' : ''}`}
            onClick={handleRequestLocation}
            disabled={locatingState === 'loading'}
          >
            {locatingState === 'loading' ? (
              <Loader2 size={14} className="ec-spin" />
            ) : (
              <Compass size={14} />
            )}
            <span>
              {locatingState === 'loading'
                ? 'Locating...'
                : userLocation
                ? 'Location Active'
                : 'Use My Location'}
            </span>
          </button>
        </div>

        {locationFeedback && (
          <div
            className={`ec-status-note ${
              locatingState === 'denied' || locatingState === 'error'
                ? 'is-warn'
                : 'is-info'
            }`}
            role="status"
          >
            <span>{locationFeedback}</span>
          </div>
        )}

        {/* Horizontal Carousel */}
        {filteredProfessionals.length > 0 ? (
          <div className="ec-carousel-shell">
            <button
              type="button"
              className="ec-nav-arrow ec-nav-prev"
              aria-label="Previous professionals"
              onClick={() => scrollCarousel('prev')}
            >
              <ChevronLeft size={18} />
            </button>

            <div ref={trackRef} className="ec-carousel-track">
              {filteredProfessionals.map((pro) => {
                const hasRating =
                  typeof pro.rating === 'number' && !Number.isNaN(pro.rating);
                const reviewCount = pro.reviewsCount ?? pro.reviews;

                return (
                  <article key={pro.id} className="ec-card">
                    <div className="ec-card-media">
                      <img
                        src={pro.image || '/womens_tailoring.jpg'}
                        alt={pro.name}
                        className="ec-card-img"
                        loading="lazy"
                      />
                      {pro.verified === true && (
                        <span className="ec-verified-pill" title="Verified Professional">
                          <ShieldCheck size={12} />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>

                    <div className="ec-card-body">
                      <h3 className="ec-card-name" title={pro.name}>
                        {pro.name}
                      </h3>
                      <p className="ec-card-category">
                        {pro.categoryLabel || pro.specialty || 'Custom Tailoring'}
                      </p>

                      <div className="ec-card-meta">
                        {hasRating && (
                          <span className="ec-rating">
                            <Star size={12} fill="#f72585" color="#f72585" />
                            <strong>{pro.rating.toFixed(1)}</strong>
                            {typeof reviewCount === 'number' && reviewCount > 0 && (
                              <span className="ec-reviews">({reviewCount})</span>
                            )}
                          </span>
                        )}

                        {pro.distanceKm !== null ? (
                          <span className="ec-distance">
                            <MapPin size={11} />
                            <span>{pro.distanceKm} km away</span>
                          </span>
                        ) : (
                          pro.neighborhood && (
                            <span className="ec-locality-text">{pro.neighborhood}</span>
                          )
                        )}
                      </div>

                      {pro.doorstepAvailable ? (
                        <div className="ec-doorstep">
                          <Truck size={12} />
                          <span>Doorstep service available</span>
                        </div>
                      ) : (
                        <div className="ec-doorstep is-studio">
                          <Scissors size={12} />
                          <span>In-studio fitting</span>
                        </div>
                      )}

                      <button
                        type="button"
                        className="ec-profile-cta"
                        onClick={() => onViewProfile && onViewProfile(pro)}
                      >
                        View Profile
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              className="ec-nav-arrow ec-nav-next"
              aria-label="Next professionals"
              onClick={() => scrollCarousel('next')}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          <div className="ec-empty-state">
            <Scissors size={26} style={{ color: '#f72585' }} />
            <p className="ec-empty-title">No professionals found for this selection.</p>
            <p className="ec-empty-desc">
              Try choosing another specialty category or viewing all Bengaluru localities.
            </p>
            <button type="button" className="ec-reset-btn" onClick={resetFilters}>
              Show All Professionals
            </button>
          </div>
        )}

        {/* Bottom Map CTA */}
        <div className="ec-footer-cta-row">
          <button
            type="button"
            className="ec-map-btn"
            onClick={() =>
              onExploreMap && onExploreMap(selectedCategory, selectedNeighborhood)
            }
          >
            <MapPin size={16} />
            <span>Explore Professionals on Map</span>
          </button>
        </div>
      </div>
    </section>
  );
}
