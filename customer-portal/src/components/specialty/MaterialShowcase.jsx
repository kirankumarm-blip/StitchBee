import React, { useState } from 'react';
import { Layers, ShieldCheck, Droplets, Check, ZoomIn, Info, Sparkles } from 'lucide-react';

export default function MaterialShowcase({
  materials = [],
  title = "Tactile Material & Leather Showcase",
  subtitle = "High-definition textures, authentic provenance, and certified durability grades.",
  selectedMaterialId,
  onSelectMaterial,
  interactive = true
}) {
  const [activeMaterial, setActiveMaterial] = useState(materials[0] || null);
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!materials || materials.length === 0) return null;

  const current = materials.find(m => m.id === selectedMaterialId) || activeMaterial || materials[0];

  return (
    <section className="material-showcase-section" style={{ margin: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '6px' }}>
          <Layers size={18} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Material Anatomy
          </span>
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0 10px 0', color: 'var(--text-primary)' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto' }}>
          {subtitle}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'start' }}>
        {/* LEFT: High-Definition Inspection Card */}
        <div
          className="glass-card-no-hover"
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            position: 'relative'
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden', background: '#0b0a14' }}>
            <img
              src={current.image}
              alt={current.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                padding: '6px 12px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fff',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
              onClick={() => setZoomOpen(true)}
            >
              <ZoomIn size={14} /> Zoom Texture
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'var(--grad-primary)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '8px',
                letterSpacing: '0.04em'
              }}
            >
              {current.badge || 'CERTIFIED TIER'}
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {current.name}
              </h3>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>
                {current.priceTier || 'Included'}
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              {current.description}
            </p>

            {/* Spec Meters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Durability</span>
                <strong style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> {current.durability || '5 / 5'}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Water Resistance</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Droplets size={14} /> {current.waterResistance || 'High'}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Best For</span>
                <strong style={{ fontSize: '0.78rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {current.bestFor || 'Daily Use'}
                </strong>
              </div>
            </div>

            {interactive && onSelectMaterial && (
              <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px', fontSize: '0.9rem' }}
                onClick={() => onSelectMaterial(current)}
              >
                {selectedMaterialId === current.id ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Check size={16} /> Selected for Customization
                  </span>
                ) : (
                  `Choose ${current.name}`
                )}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Swatch Selector Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Available Material Variations ({materials.length})
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
            {materials.map(mat => {
              const isSelected = (selectedMaterialId === mat.id) || (current.id === mat.id);
              return (
                <div
                  key={mat.id}
                  onClick={() => {
                    setActiveMaterial(mat);
                    if (onSelectMaterial) onSelectMaterial(mat);
                  }}
                  className="glass-card"
                  style={{
                    padding: '12px',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(247,37,133,0.06)' : 'var(--bg-card)',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
                    <img src={mat.image} alt={mat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'var(--primary)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                        }}
                      >
                        <Check size={13} />
                      </div>
                    )}
                  </div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px 0', color: 'var(--text-primary)' }}>
                    {mat.name}
                  </h5>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{mat.type}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{mat.priceTier || 'Std'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Provenance Promise Notice */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px', borderRadius: '12px', background: 'rgba(76,201,240,0.05)', border: '1px dashed rgba(76,201,240,0.3)', marginTop: '8px' }}>
            <Sparkles size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <strong>100% Ethical & Tested Materials:</strong> Every leather hide and heavy-duty fabric swatch is hand-inspected for tensile strength, grain uniformity, and color fastness before cutting.
            </div>
          </div>
        </div>
      </div>

      {/* Texture Zoom Modal */}
      {zoomOpen && (
        <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={() => setZoomOpen(false)}>
          <div
            className="modal-content animate-fade-in"
            style={{ maxWidth: '640px', width: '90%', padding: '24px', background: 'var(--bg-card)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Macro Texture Close-Up: {current.name}
              </h3>
              <button onClick={() => setZoomOpen(false)} className="btn btn-ghost" style={{ padding: '6px', color: 'var(--text-primary)' }}>
                ✕
              </button>
            </div>
            <div style={{ width: '100%', height: '380px', borderRadius: '14px', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)' }}>
              <img src={current.image} alt={current.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.3)' }} />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '12px', textAlign: 'center' }}>
              Authentic grain structure photographed under high-intensity macro studio illumination.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
