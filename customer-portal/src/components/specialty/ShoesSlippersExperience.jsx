import React, { useState } from 'react';
import { 
  Sparkles, Wrench, Scissors, ShieldCheck, Star, ArrowRight, 
  Upload, Check, ChevronRight, Sliders, Ruler, Eye, ShoppingCart 
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import MaterialShowcase from './MaterialShowcase';
import SpecialistMapDiscovery from './SpecialistMapDiscovery';
import AIMeasurementModal from './AIMeasurementModal';
import UniversalProductModal from './UniversalProductModal';

export default function ShoesSlippersExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout
}) {
  const [measurementModalOpen, setMeasurementModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Shoe Repair Wizard
  const [selectedShoeType, setSelectedShoeType] = useState('Formal Oxford');
  const [selectedShoeIssue, setSelectedShoeIssue] = useState('Sole Replacement & Resoling');
  const [shoePhotosAttached, setShoePhotosAttached] = useState(false);
  const [shoeRepairSubmitted, setShoeRepairSubmitted] = useState(false);

  // Bespoke Footwear Customizer
  const [customStyle, setCustomStyle] = useState('Classic Wholecut Oxford');
  const [customMaterial, setCustomMaterial] = useState('Italian Calfskin');
  const [customColor, setCustomColor] = useState('Polished Tan');
  const [customSole, setCustomSole] = useState('Oak-Bark Leather Sole');
  const [customSize, setCustomSize] = useState('UK 8');
  const [customWidth, setCustomWidth] = useState('Standard (D)');
  const [customFootMeasurements, setCustomFootMeasurements] = useState(null);

  const shoeMaterials = [
    {
      id: 'mat-calfskin',
      name: 'Full-Grain Italian Calfskin',
      type: 'Supple Aniline Finished',
      badge: 'PREMIUM DRESS TIER',
      image: './shoef_c2.jpg',
      priceTier: 'Included (Base)',
      durability: '5 / 5',
      waterResistance: 'Medium (Wax Protect)',
      bestFor: 'Oxfords, Derbies, Formal Loafers',
      description: 'Extremely fine pore structure with gentle natural stretch. Holds a razor-sharp mirror glaze shine.'
    },
    {
      id: 'mat-suedeshoe',
      name: 'Water-Repellent Snuff Suede',
      type: 'Reverse Calf Split',
      badge: 'SUMMER CASUAL',
      image: './shoef_c3.jpg',
      priceTier: 'Included (Base)',
      durability: '4.5 / 5',
      waterResistance: 'Scotchgard Treated',
      bestFor: 'Penny Loafers & Chelsea Boots',
      description: 'Silky tactile nap treated with nano-repellent polymer. Impervious to light rain showers and dust.'
    },
    {
      id: 'mat-soleleather',
      name: 'Traditional Oak-Bark Sole Leather',
      type: 'Slow-Tanned Heavy Rind',
      badge: 'GOODYEAR WELT SPEC',
      image: './shoef_c4.jpg',
      priceTier: '+₹600 Upgrade',
      durability: '5 / 5',
      waterResistance: 'Dense Water Resistant',
      bestFor: 'Handmade Outsoles & Heels',
      description: 'Tanned for 12 months in oak-bark pits. Rock-solid abrasion resistance that molds to your unique foot arch.'
    }
  ];

  const shoeProducts = [
    {
      id: 'sh-oxford',
      name: 'The Artisan Wholecut Oxford',
      categoryLabel: 'FORMAL COUTURE',
      price: 3499,
      originalPrice: 4999,
      rating: 4.9,
      reviewsCount: 56,
      image: './shoe_c1.jpg',
      gallery: ['./shoe_c1.jpg', './shoe_c2.jpg'],
      colors: ['Polished Tan', 'Onyx Black', 'Deep Oxblood'],
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      description: 'Cut from a single flawless hide of calfskin. Seamless silhouette with closed-channel Goodyear welted leather soles.'
    },
    {
      id: 'sh-loafer',
      name: 'Hand-Sewn Penny Loafer',
      categoryLabel: 'CASUAL LUXURY',
      price: 2799,
      originalPrice: 3899,
      rating: 4.8,
      reviewsCount: 39,
      image: './shoe_c2.jpg',
      gallery: ['./shoe_c2.jpg', './shoe_c4.jpg'],
      colors: ['Snuff Brown Suede', 'Navy Blue Suede', 'Caramel Calf'],
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
      description: 'Unlined glove-soft suede loafer with padded memory foam insole. Exceptional comfort without socks.'
    },
    {
      id: 'sh-mojari',
      name: 'Royal Zari Embroidered Wedding Mojari',
      categoryLabel: 'ETHNIC BRIDAL',
      price: 1599,
      originalPrice: 2299,
      rating: 4.9,
      reviewsCount: 88,
      image: './shoe_c3.jpg',
      gallery: ['./shoe_c3.jpg'],
      colors: ['Ivory Gold', 'Ruby Velvet', 'Royal Navy'],
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
      description: 'Handcrafted wedding footwear with genuine zari embroidery matching groom sherwanis. Cushioned arch support.'
    },
    {
      id: 'sh-slipper',
      name: 'Hand-Molded Orthopedic Leather Slide',
      categoryLabel: 'DAILY COMFORT',
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviewsCount: 94,
      image: './shoe_c6.jpg',
      gallery: ['./shoe_c6.jpg'],
      colors: ['Tan', 'Black'],
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      description: 'Ergonomic cork-latex footbed wrapped in supple cowhide lining with anti-skid ribbed outsoles.'
    }
  ];

  const handleCustomShoeCheckout = () => {
    const item = {
      id: `shoe-custom-${Date.now()}`,
      name: `Bespoke ${customStyle}`,
      price: 3499,
      image: './shoe_c1.jpg',
      selectedColor: customColor,
      details: `${customMaterial} • ${customSole} • Size: ${customSize} (${customWidth})`,
      requiresMeasurement: true,
      measurements: customFootMeasurements || { size: customSize, width: customWidth },
      quantity: 1,
      itemType: 'custom'
    };
    if (onDirectCheckout) onDirectCheckout(item);
    else if (onAddToCart) onAddToCart(item);
  };

  return (
    <div className="shoes-experience animate-fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '560px',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '60px 48px',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, rgba(16,13,29,0.92) 0%, rgba(20,18,36,0.88) 100%)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
        }}
        className="specialty-hero-responsive"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("./Shoes And Slippers.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            opacity: 0.22,
            mixBlendMode: 'luminosity',
            pointerEvents: 'none'
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(247,37,133,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(247,37,133,0.12)', border: '1px solid rgba(247,37,133,0.3)', marginBottom: '18px' }}>
            <Sparkles size={15} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              StitchBee Master Cobblers & Footwear
            </span>
          </div>

          <h1 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#fff', lineHeight: '1.08', margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>
            Walk Further.<br />
            <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Wear Better.
            </span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px' }}>
            From high-grade Vibram resoling, sneaker rejuvenation, and orthopedic heel repairs to bespoke Goodyear-welted dress shoes, experience true master cobbler craftsmanship.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <a href="#shoe-repair-section" className="btn btn-primary" style={{ padding: '12px 22px', fontSize: '0.9rem', fontWeight: 700 }}>
              Book Shoe Repair / Resoling
            </a>
            <a href="#custom-shoes-section" className="btn btn-secondary" style={{ padding: '12px 20px', fontSize: '0.9rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)' }}>
              Design Custom Footwear
            </a>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={18} style={{ color: '#fbbf24', fill: '#fbbf24' }} /> 4.9 ★
              </strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cobbler Excellence Rating</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'var(--border-color)' }} />
            <div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>2,100+</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Shoes Resoled & Repaired</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE BEFORE / AFTER SLIDER */}
      <BeforeAfterSlider
        beforeImage="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"
        afterImage="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80"
        beforeLabel="Split Outsole & Scuffed Leather"
        afterLabel="Full Oak-Bark Welt Resole & Mirror Glaze"
        title="Sole Restoration & High-Shine Transformation"
        subtitle="See how our cobblers deconstruct damaged outsoles, hand-stitch new welt ribbons, and apply multi-coat carnauba wax mirror glazes."
        aspectRatio="21/9"
      />

      {/* 3. SHOE REPAIR WIZARD */}
      <section id="shoe-repair-section" style={{ margin: '4.5rem 0' }}>
        <div
          className="glass-card-no-hover"
          style={{
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)'
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', marginBottom: '4px' }}>
              <Wrench size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Cobbler Service Flow
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              Book Footwear Repair & Restoration
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Select shoe type, specify the damage, and request express doorstep pickup across Bengaluru.
            </p>
          </div>

          {shoeRepairSubmitted ? (
            <div style={{ textAlign: 'center', padding: '36px 20px', background: 'rgba(16,185,129,0.06)', borderRadius: '16px', border: '1px solid #10b981' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
                <Check size={32} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                Shoe Repair Request Saved!
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                Pickup scheduled for: {selectedShoeType} ({selectedShoeIssue}). StepCraft Cobblers will examine your shoe soles.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (onDirectCheckout) {
                    onDirectCheckout({
                      id: `repair-shoe-${Date.now()}`,
                      name: `${selectedShoeType} Repair: ${selectedShoeIssue}`,
                      price: 799,
                      image: './Shoes And Slippers.png',
                      itemType: 'alteration'
                    });
                  }
                }}
              >
                Proceed to Checkout (₹799)
              </button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setShoeRepairSubmitted(true); }}>
              {/* 10 Shoe Types */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  1. Select Shoe Category
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    'Formal Oxford', 'Sneakers', 'Boots / Chelsea', 'Sandals', 
                    'Leather Slippers', 'Sports Trainers', 'High Heels', 'Loafers', 'School Shoes'
                  ].map(sh => (
                    <button
                      key={sh}
                      type="button"
                      onClick={() => setSelectedShoeType(sh)}
                      className="btn"
                      style={{
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        borderRadius: '10px',
                        border: selectedShoeType === sh ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: selectedShoeType === sh ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                        color: '#fff',
                        fontWeight: selectedShoeType === sh ? 700 : 500
                      }}
                    >
                      {sh}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shoe Issues */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  2. Select Issue / Repair Needed
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {[
                    'Sole Replacement & Resoling', 'Worn Heel Top-Lift Repair', 'Strap or Buckle Broken',
                    'Leather Scratch & Re-Shine', 'Shoe Widening / Size Adjustment', 'Orthopedic Cushion Insole'
                  ].map(iss => (
                    <div
                      key={iss}
                      onClick={() => setSelectedShoeIssue(iss)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: selectedShoeIssue === iss ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                        background: selectedShoeIssue === iss ? 'rgba(247,37,133,0.08)' : 'rgba(255,255,255,0.02)',
                        color: '#fff',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: selectedShoeIssue === iss ? '5px solid var(--primary)' : '1.5px solid var(--border-color)', flexShrink: 0 }} />
                      <span>{iss}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Estimated Resoling Starting Rate</span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--primary)', display: 'block' }}>₹799</strong>
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontWeight: 700 }}>
                  Book Doorstep Pickup <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 4. BESPOKE CUSTOM SHOES STUDIO */}
      <section id="custom-shoes-section" style={{ margin: '4.5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Master Cobbler Atelier
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0 8px 0', color: 'var(--text-primary)' }}>
            Custom Handmade Footwear
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '620px', margin: '0 auto' }}>
            Built around your personal foot geometry. Choose your leather, welt construction, sole density, and custom width.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '32px', alignItems: 'start' }} className="specialist-grid-responsive">
          {/* Preview Card */}
          <div className="glass-card-no-hover" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
            <div style={{ width: '100%', height: '360px', overflow: 'hidden', position: 'relative' }}>
              <img src="./shoe_c1.jpg" alt="Custom Shoe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: '10px 14px', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 2px 0', color: '#fff' }}>{customStyle}</h4>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  {customColor} • {customSole} • {customSize}
                </span>
              </div>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Custom Footwear Craft:</span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>₹3,499</strong>
              </div>
            </div>
          </div>

          {/* Customizer Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Footwear Silhouette
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {['Classic Wholecut Oxford', 'Casual Penny Loafer', 'Bespoke Royal Mojari', 'Handmade Ankle Boot'].map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setCustomStyle(st)}
                    className="btn"
                    style={{
                      padding: '10px',
                      fontSize: '0.78rem',
                      borderRadius: '8px',
                      border: customStyle === st ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      background: customStyle === st ? 'rgba(247,37,133,0.1)' : 'rgba(255,255,255,0.03)',
                      color: '#fff'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Leather Color
                </label>
                <select
                  value={customColor}
                  onChange={e => setCustomColor(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#111', color: '#fff', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                >
                  <option value="Polished Tan">Polished Tan</option>
                  <option value="Onyx Jet Black">Onyx Jet Black</option>
                  <option value="Dark Oxblood">Dark Oxblood</option>
                  <option value="Navy Blue Suede">Navy Blue Suede</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Outsole Construction
                </label>
                <select
                  value={customSole}
                  onChange={e => setCustomSole(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#111', color: '#fff', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                >
                  <option value="Oak-Bark Leather Sole">Oak-Bark Leather Sole</option>
                  <option value="Dainite Studded Rubber">Dainite Studded Rubber</option>
                  <option value="Lightweight Vibram Grip">Lightweight Vibram Grip</option>
                </select>
              </div>
            </div>

            {/* Sizing & Width */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  UK Shoe Size
                </label>
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'].map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setCustomSize(sz)}
                      className="btn"
                      style={{
                        padding: '6px 10px',
                        fontSize: '0.75rem',
                        borderRadius: '6px',
                        border: customSize === sz ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                        background: customSize === sz ? 'var(--primary)' : 'transparent',
                        color: '#fff'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Width
                </label>
                <select
                  value={customWidth}
                  onChange={e => setCustomWidth(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#111', color: '#fff', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                >
                  <option value="Standard (D)">Standard (D)</option>
                  <option value="Wide (E)">Wide (E)</option>
                  <option value="Extra Wide (EE)">Extra Wide (EE)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCustomShoeCheckout}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.95rem', fontWeight: 800 }}
            >
              Order Custom Handmade Shoes (₹3,499)
            </button>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL PRODUCTS SHOWCASE */}
      <section style={{ margin: '4.5rem 0' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: 'var(--text-primary)' }}>
          Curated Footwear Collection
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {shoeProducts.map(p => (
            <div
              key={p.id}
              className="glass-card"
              style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => setSelectedProductForModal(p)}
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '18px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  {p.categoryLabel}
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
                  {p.name}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--primary)' }}>₹{p.price.toLocaleString()}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>Inspect & Fit →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MATERIAL SHOWCASE */}
      <MaterialShowcase
        materials={shoeMaterials}
        title="Footwear Upper & Sole Anatomy"
        subtitle="Slow pit-tanned sole leathers and velvety snuffs built for lasting arch support."
      />

      {/* 7. SPECIALIST DISCOVERY */}
      <SpecialistMapDiscovery
        specialtyCategory="shoes"
        categoryTitle="Shoes & Footwear"
        tailors={tailors}
        currentUser={currentUser}
        onLoginRequired={onLoginRequired}
        onSelectTailorForBooking={(tailor) => {
          if (onAddToCart) {
            onAddToCart({
              id: `booking-${tailor.id}-${Date.now()}`,
              name: `Cobbler Evaluation with ${tailor.name}`,
              price: 199,
              image: tailor.image,
              itemType: 'alteration'
            });
          }
        }}
      />

      <UniversalProductModal
        product={selectedProductForModal}
        isOpen={!!selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={onAddToCart}
        onDirectCheckout={onDirectCheckout}
      />
    </div>
  );
}
