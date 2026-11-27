import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  Navigation,
  Phone,
  Scissors,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { calculateDistanceKm, findProfessionalById } from '../data/professionals';

export default function ProfessionalProfilePage({
  professionalId,
  tailors = [],
  userLocation = null,
  theme = 'light',
  onBack,
  onExploreMap,
  onBookProfessional,
}) {
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(null);
  const isLight = theme === 'light';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [professionalId]);

  const professional = useMemo(
    () => findProfessionalById(professionalId, tailors),
    [professionalId, tailors]
  );

  if (!professional) {
    return (
      <section className={`pro-profile-page ${isLight ? 'is-light' : 'is-dark'}`}>
        <div className="landing-container pro-profile-empty">
          <Scissors size={38} style={{ color: '#f72585' }} />
          <h2>Professional Profile Not Found</h2>
          <p>This atelier or craftsperson listing is currently unavailable.</p>
          <div className="pro-profile-empty-actions">
            <button type="button" className="pro-btn-secondary" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
            <button type="button" className="pro-btn-primary" onClick={onExploreMap}>
              <MapPin size={16} />
              <span>Explore All Professionals</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const distanceKm =
    userLocation && Number.isFinite(professional.lat) && Number.isFinite(professional.lng)
      ? calculateDistanceKm(userLocation.lat, userLocation.lng, professional.lat, professional.lng)
      : null;

  const directionsUrl =
    Number.isFinite(professional.lat) && Number.isFinite(professional.lng)
      ? `https://www.google.com/maps/dir/?api=1&destination=${professional.lat},${professional.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(professional.address || professional.name)}`;

  return (
    <section className={`pro-profile-page ${isLight ? 'is-light' : 'is-dark'}`}>
      <div className="landing-container">
        {/* Top breadcrumb bar */}
        <div className="pro-profile-navrow">
          <button type="button" className="pro-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
          <button type="button" className="pro-map-link" onClick={onExploreMap}>
            <MapPin size={15} />
            <span>Explore Professionals on Map</span>
          </button>
        </div>

        {/* Hero summary card */}
        <div className="pro-hero-card">
          <div className="pro-hero-media">
            <img src={professional.image} alt={professional.name} className="pro-hero-photo" />
            {professional.verified && (
              <span className="pro-verified-badge">
                <ShieldCheck size={14} />
                <span>Verified Professional</span>
              </span>
            )}
          </div>

          <div className="pro-hero-content">
            <div className="pro-category-eyebrow">
              {professional.categoryLabel || professional.category}
            </div>
            <h1 className="pro-title">{professional.name}</h1>

            {(professional.masterTailor || professional.experience) && (
              <p className="pro-craftsman-line">
                <Award size={15} />
                <span>
                  {[professional.masterTailor, professional.experience].filter(Boolean).join(' • ')}
                </span>
              </p>
            )}

            <p className="pro-specialty-desc">{professional.specialty}</p>

            <div className="pro-metrics-row">
              {professional.rating != null && (
                <div className="pro-metric-chip">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>
                    <strong>{professional.rating}</strong>
                    {professional.reviewsCount ? ` (${professional.reviewsCount} reviews)` : ''}
                  </span>
                </div>
              )}

              {professional.orders != null && (
                <div className="pro-metric-chip">
                  <CheckCircle2 size={14} color="#10b981" />
                  <span>
                    <strong>{professional.orders}+</strong> completed orders
                  </span>
                </div>
              )}

              {professional.turnaround && (
                <div className="pro-metric-chip">
                  <Clock size={14} color="#f72585" />
                  <span>{professional.turnaround}</span>
                </div>
              )}

              {distanceKm !== null && (
                <div className="pro-metric-chip">
                  <Navigation size={14} color="#f72585" />
                  <span>
                    <strong>{distanceKm} km</strong> away
                  </span>
                </div>
              )}
            </div>

            <div className="pro-details-meta">
              {professional.address && (
                <div className="pro-detail-row">
                  <MapPin size={15} />
                  <span>{professional.address}</span>
                </div>
              )}
              {professional.doorstepAvailable && professional.availability && (
                <div className="pro-detail-row is-doorstep">
                  <CheckCircle2 size={15} />
                  <span>{professional.availability}</span>
                </div>
              )}
              {professional.phone && (
                <div className="pro-detail-row">
                  <Phone size={15} />
                  <span>{professional.phone}</span>
                </div>
              )}
            </div>

            <div className="pro-hero-actions">
              <button
                type="button"
                className="pro-btn-primary"
                onClick={() => onBookProfessional(professional)}
              >
                <Scissors size={16} />
                <span>Book Doorstep Trial</span>
              </button>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pro-btn-secondary"
              >
                <Compass size={16} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Lower details grid: Services/Specialties + Portfolio */}
        <div className="pro-sections-grid">
          <div className="pro-panel">
            <h2 className="pro-panel-title">Service Information &amp; Pricing</h2>
            {professional.priceRange && (
              <p className="pro-price-range">
                Estimated Range: <strong>{professional.priceRange}</strong>
              </p>
            )}

            {Array.isArray(professional.services) && professional.services.length > 0 && (
              <div className="pro-services-list">
                {professional.services.map((srv, idx) => (
                  <button
                    key={srv.id || idx}
                    type="button"
                    className={`pro-service-item ${selectedServiceIdx === idx ? 'is-selected' : ''}`}
                    onClick={() => setSelectedServiceIdx(idx)}
                  >
                    <div>
                      <strong>{srv.name}</strong>
                      {srv.days && <span>Turnaround: {srv.days} days</span>}
                    </div>
                    <strong className="pro-service-price">₹{srv.price}</strong>
                  </button>
                ))}
              </div>
            )}

            {Array.isArray(professional.tags) && professional.tags.length > 0 && (
              <div className="pro-tags-wrap">
                {professional.tags.map((tag) => (
                  <span key={tag} className="pro-tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {Array.isArray(professional.portfolio) && professional.portfolio.length > 0 && (
            <div className="pro-panel">
              <h2 className="pro-panel-title">Craftsmanship Portfolio</h2>
              <div className="pro-portfolio-grid">
                {professional.portfolio.map((work, idx) => (
                  <div key={idx} className="pro-portfolio-card">
                    <img src={work.img} alt={work.title} loading="lazy" />
                    <div className="pro-portfolio-info">
                      <strong>{work.title}</strong>
                      {work.price && <span>From {work.price}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
