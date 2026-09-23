import React, { useState } from 'react';
import { 
  MapPin, Star, ShieldCheck, Clock, Award, Phone, Check, 
  ChevronRight, Calendar, User, Search, Filter, Home, Sparkles 
} from 'lucide-react';

export default function SpecialistMapDiscovery({
  specialtyCategory = 'bags',
  categoryTitle = "Bags & Leather",
  tailors = [],
  onSelectTailorForBooking,
  currentUser,
  onLoginRequired
}) {
  const [selectedTailorId, setSelectedTailorId] = useState(null);
  const [profileModalTailor, setProfileModalTailor] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'near' | 'top' | 'home'
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'map' | 'list'

  // Curated list of verified specialists for this category
  const categoryTailors = tailors.filter(t => {
    if (specialtyCategory === 'bags') return t.categories?.includes('bags') || t.specialty?.toLowerCase().includes('bag') || t.specialty?.toLowerCase().includes('leather');
    if (specialtyCategory === 'shoes') return t.categories?.includes('shoes') || t.specialty?.toLowerCase().includes('shoe') || t.specialty?.toLowerCase().includes('slipper');
    if (specialtyCategory === 'seats') return t.categories?.includes('seats') || t.specialty?.toLowerCase().includes('seat') || t.specialty?.toLowerCase().includes('vehicle');
    if (specialtyCategory === 'gifts') return t.categories?.includes('gifts') || t.specialty?.toLowerCase().includes('craft') || t.specialty?.toLowerCase().includes('gift') || t.specialty?.toLowerCase().includes('embroidery');
    if (specialtyCategory === 'pets') return t.categories?.includes('pets') || t.specialty?.toLowerCase().includes('pet') || t.specialty?.toLowerCase().includes('costume');
    if (specialtyCategory === 'sofas') return t.categories?.includes('sofas') || t.specialty?.toLowerCase().includes('sofa') || t.specialty?.toLowerCase().includes('cushion') || t.specialty?.toLowerCase().includes('upholstery');
    return true;
  });

  // Fallback if none matched
  const displayTailors = (categoryTailors.length > 0 ? categoryTailors : tailors.slice(0, 4)).filter(t => {
    if (activeFilter === 'near') return (t.distance || 1.5) <= 2.0;
    if (activeFilter === 'top') return (t.rating || 4.8) >= 4.8;
    return true;
  });

  const activeTailor = displayTailors.find(t => t.id === selectedTailorId) || displayTailors[0];

  const handleBook = (tailor) => {
    if (!currentUser && onLoginRequired) {
      onLoginRequired();
      return;
    }
    if (onSelectTailorForBooking) {
      onSelectTailorForBooking(tailor);
    }
  };

  return (
    <section className="specialist-discovery-section" style={{ margin: '4.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', marginBottom: '4px' }}>
            <MapPin size={16} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Local Craftsmanship Network
            </span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '2px 0 6px 0', color: 'var(--text-primary)' }}>
            Find a Verified {categoryTitle} Specialist Near You
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: '600px' }}>
            Hand-vetted master artisans, equipped for physical measurements, workshop consultations, or doorstep assistance.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Specialists' },
            { id: 'near', label: 'Within 2.0 km' },
            { id: 'top', label: 'Top Rated (★ 4.8+)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`btn ${activeFilter === f.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem',
                borderRadius: '20px',
                background: activeFilter === f.id ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border-color)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Layout: Map + List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'stretch' }} className="specialist-grid-responsive">
        
        {/* INTERACTIVE MAP CANVAS */}
        <div
          className="glass-card-no-hover"
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            position: 'relative',
            minHeight: '440px',
            background: '#0a0914'
          }}
        >
          {/* Simulated Dark Mode City Map Graphic */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.28, pointerEvents: 'none', background: 'radial-gradient(circle at 40% 40%, rgba(247,37,133,0.15) 0%, transparent 70%)' }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Roads / Arteries */}
              <path d="M 0 100 Q 200 150 400 80 T 800 120" stroke="rgba(76,201,240,0.2)" strokeWidth="3" fill="none" />
              <path d="M 150 0 Q 180 250 250 500" stroke="rgba(247,37,133,0.2)" strokeWidth="4" fill="none" />
              <path d="M 50 380 Q 300 320 600 420" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* User Location Marker */}
          <div
            style={{
              position: 'absolute',
              top: '48%',
              left: '42%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--accent)', border: '3px solid #fff', boxShadow: '0 0 16px var(--accent)' }} />
              <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', border: '2px solid var(--accent)', animation: 'pulseGlow 2s infinite' }} />
            </div>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '2px 8px', borderRadius: '10px', marginTop: '4px' }}>
              You (HSR Layout)
            </span>
          </div>

          {/* Partner Pins */}
          {displayTailors.map((t, idx) => {
            const isSelected = activeTailor?.id === t.id;
            // Preset geographic distribution relative to user
            const offsets = [
              { top: '32%', left: '58%' },
              { top: '65%', left: '30%' },
              { top: '24%', left: '26%' },
              { top: '70%', left: '68%' }
            ];
            const pos = offsets[idx % offsets.length];

            return (
              <div
                key={t.id}
                onClick={() => setSelectedTailorId(t.id)}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 10 : 4,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div
                  style={{
                    width: isSelected ? '46px' : '36px',
                    height: isSelected ? '46px' : '36px',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--grad-primary)' : 'rgba(20,17,38,0.9)',
                    border: isSelected ? '3px solid #ffffff' : '2px solid var(--primary)',
                    boxShadow: isSelected ? '0 0 20px rgba(247,37,133,0.8)' : '0 4px 12px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div
                  style={{
                    background: isSelected ? 'var(--primary)' : 'rgba(15,13,30,0.85)',
                    color: '#fff',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    marginTop: '4px',
                    whiteSpace: 'nowrap',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {t.name.split(' ')[0]} • ★ {t.rating || '4.8'}
                </div>
              </div>
            );
          })}

          {/* Map Top Bar */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 12, display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '0.74rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#fff', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              📍 4 Specialists within 5 km
            </span>
          </div>
        </div>

        {/* SPECIALIST PARTNER CARDS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '540px', overflowY: 'auto', paddingRight: '4px' }}>
          {displayTailors.map(t => {
            const isSelected = activeTailor?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTailorId(t.id)}
                className="glass-card"
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'rgba(247,37,133,0.06)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                    <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)', background: 'rgba(247,37,133,0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        VERIFIED PARTNER
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        • {t.distance ? `${t.distance} km away` : '1.8 km away'}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.name}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.specialty || `${categoryTitle} Craft Specialist`}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{t.rating || '4.8'}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({t.reviews || 84}+ reviews)</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    From <strong style={{ color: 'var(--primary)', fontSize: '0.95rem' }}>₹{t.services?.[0]?.price || '249'}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '7px 12px', fontSize: '0.78rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileModalTailor(t);
                    }}
                  >
                    View Full Profile
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1.2, padding: '7px 14px', fontSize: '0.78rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBook(t);
                    }}
                  >
                    Book This Partner
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL TAILOR PROFILE MODAL */}
      {profileModalTailor && (
        <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={() => setProfileModalTailor(null)}>
          <div
            className="modal-content animate-fade-in"
            style={{ maxWidth: '600px', width: '92%', maxHeight: '85vh', overflowY: 'auto', padding: '28px', background: 'var(--bg-dark)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                  StitchBee Certified Specialist
                </span>
              </div>
              <button onClick={() => setProfileModalTailor(null)} className="btn btn-ghost" style={{ padding: '4px 8px', color: '#fff' }}>
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src={profileModalTailor.image}
                alt={profileModalTailor.name}
                style={{ width: '80px', height: '80px', borderRadius: '18px', objectFit: 'cover', border: '2px solid var(--primary)' }}
              />
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>
                  {profileModalTailor.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', margin: 0 }}>
                  Master Craftsman: {profileModalTailor.owner || 'Lead Artisan'} • 8+ Years Experience
                </p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>★ {profileModalTailor.rating || '4.9'} Rating</span>
                  <span>• 350+ Jobs Done</span>
                  <span>• 100% Fit Guarantee</span>
                </div>
              </div>
            </div>

            {/* Specialties & Capabilities */}
            <div style={{ marginBottom: '20px' }}>
              <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Available Specializations</h5>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(profileModalTailor.services || [
                  { name: 'Custom Stitching', price: 1499 },
                  { name: 'Structural Restoration', price: 499 },
                  { name: 'Doorstep Measurement', price: 199 }
                ]).map((s, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '5px 10px', borderRadius: '8px', color: 'var(--text-secondary)' }}>
                    {s.name} (from ₹{s.price})
                  </span>
                ))}
              </div>
            </div>

            {/* Workshop Address & Doorstep Availability */}
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#fff', marginBottom: '4px' }}>
                <MapPin size={16} style={{ color: 'var(--accent)' }} />
                <span>{profileModalTailor.address || 'HSR Layout, Sector 2, Bengaluru'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Clock size={14} />
                <span>Open Mon–Sat: 10:00 AM – 8:30 PM • Doorstep Fitting Visits Available</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, padding: '10px' }}
                onClick={() => setProfileModalTailor(null)}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 2, padding: '10px', fontWeight: 700 }}
                onClick={() => {
                  const target = profileModalTailor;
                  setProfileModalTailor(null);
                  handleBook(target);
                }}
              >
                Book Appointment With {profileModalTailor.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
