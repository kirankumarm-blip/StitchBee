import React, { useState } from 'react';
import { 
  Sparkles, Wrench, ShieldCheck, Star, ArrowRight, 
  Upload, Layers, Check, Home, ChevronRight, Sliders, Eye 
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import MaterialShowcase from './MaterialShowcase';
import SpecialistMapDiscovery from './SpecialistMapDiscovery';

export default function SofasExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout
}) {
  // Sofa Configurator States
  const [sofaType, setSofaType] = useState('3 Seater');
  const [sofaLength, setSofaLength] = useState('78 in (198 cm)');
  const [sofaDepth, setSofaDepth] = useState('34 in (86 cm)');
  const [sofaHeight, setSofaHeight] = useState('32 in (81 cm)');
  const [sofaFabric, setSofaFabric] = useState('Pet-Friendly Scratch-Resistant Microfiber');
  const [sofaColor, setSofaColor] = useState('Sand Beige');
  const [cushionType, setCushionType] = useState('Separate Boxed Cushions');
  const [sofaPhotosAttached, setSofaPhotosAttached] = useState(false);
  const [sofaSubmitted, setSofaSubmitted] = useState(false);

  // Upholstery Material data
  const sofaMaterials = [
    {
      id: 'mat-microfiber',
      name: 'Pet-Friendly Scratch Microfiber',
      type: 'Claw-Proof Tight Weave',
      badge: 'STAIN & CLAW PROOF',
      image: './fab3.jpg',
      priceTier: 'Included (Base)',
      durability: '5 / 5',
      waterResistance: 'Stain-Resistant Coated',
      bestFor: 'Homes with Cats, Dogs & Toddlers',
      description: 'Zero loop threads so cat claws cannot snag. Liquids bead on the surface for easy 10-second damp cloth wipe-down.'
    },
    {
      id: 'mat-jutelinen',
      name: 'Belgian Textured Jute Linen',
      type: '100% Breathable Flax Blend',
      badge: 'NATURAL LUXURY',
      image: './fab2.jpg',
      priceTier: '+₹600 / Seater',
      durability: '4.8 / 5',
      waterResistance: 'Breathable Eco Weave',
      bestFor: 'Living Rooms & Sunlit Lounges',
      description: 'Tactile earthy grain offering relaxed Scandinavian aesthetic. Naturally cool during hot Indian summer months.'
    },
    {
      id: 'mat-plushvelvet',
      name: 'High-Density Matte Velvet',
      type: 'Micro-Velvet Non-Crush',
      badge: 'HERITAGE COUTURE',
      image: './fab4.jpg',
      priceTier: '+₹800 / Seater',
      durability: '4.9 / 5',
      waterResistance: 'Medium (Dry Clean)',
      bestFor: 'Formal Drawing Rooms & Accent Recliners',
      description: 'Opulent color depth with anti-pile treatment. Retains rich sheen under ambient warm lighting.'
    }
  ];

  // Calculated Pricing
  const basePrice = sofaType.includes('3') ? 4999 : (sofaType.includes('L') ? 8999 : 3499);

  const handleCheckoutSofa = () => {
    const item = {
      id: `sofa-cover-${Date.now()}`,
      name: `Custom Tailored ${sofaType} Sofa Cover Set`,
      price: basePrice,
      image: './Vehicle Seat Covers.png',
      selectedColor: sofaColor,
      details: `${sofaFabric} • Dimensions: ${sofaLength} x ${sofaDepth} • ${cushionType} • Includes At-Home Swatch Visit`,
      quantity: 1,
      itemType: 'custom'
    };
    if (onDirectCheckout) onDirectCheckout(item);
    else if (onAddToCart) onAddToCart(item);
  };

  return (
    <div className="sofas-experience animate-fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* 1. HERO */}
      <section
        style={{
          position: 'relative',
          minHeight: '540px',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '60px 48px',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, rgba(20,15,30,0.92) 0%, rgba(28,20,38,0.88) 100%)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
        }}
        className="specialty-hero-responsive"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
              StitchBee Living & Upholstery Studio
            </span>
          </div>

          <h1 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#fff', lineHeight: '1.08', margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>
            Give Your Space<br />
            <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              A New Look.
            </span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px' }}>
            Tailored sofa slipcovers, foam cushion renewal, claw-resistant fabrics, and luxury leather sofa re-upholstery. Our master upholsterers visit your living room with fabric swatches.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <a href="#sofa-customizer-section" className="btn btn-primary" style={{ padding: '12px 22px', fontSize: '0.9rem', fontWeight: 700 }}>
              Customize Sofa Covers
            </a>
            <a href="#sofa-services-section" className="btn btn-secondary" style={{ padding: '12px 20px', fontSize: '0.9rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)' }}>
              Explore Sofa Services
            </a>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={18} style={{ color: '#fbbf24', fill: '#fbbf24' }} /> 4.9 ★
              </strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Living & Upholstery Rating</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'var(--border-color)' }} />
            <div>
              <strong style={{ fontSize: '1.25rem', color: '#10b981' }}>Home Visit</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Fabric Swatch Swapping</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE BEFORE / AFTER SLIDER */}
      <BeforeAfterSlider
        beforeImage="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
        afterImage="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
        beforeLabel="Stained & Sagging Fabric Couch"
        afterLabel="Fitted Textured Linen Cover & High-Density Foam"
        title="Living Room Sofa Transformation"
        subtitle="Compare old, stained upholstery against custom-tailored slipcovers fitted with piping and high-density foam rejuvenation."
        aspectRatio="21/9"
      />

      {/* 3. 9 UNIVERSAL SOFA SERVICES */}
      <section id="sofa-services-section" style={{ margin: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
            Complete Sofa & Cushion Tailoring Services
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            From single cushion restitching to entire 7-seater sectional transformations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {[
            { title: 'New Fitted Sofa Covers', price: '₹2,499', desc: 'Custom tailored to your exact sofa frame with zipper tucks.' },
            { title: 'Sofa Cover Replacement', price: '₹1,899', desc: 'Copy existing fit with brand new premium fabrics.' },
            { title: 'Cushion Foam Replacement', price: '₹999', desc: 'Restores sagging couches with high-density 40-density foam.' },
            { title: 'Cushion Cover Sets (Set of 5)', price: '₹799', desc: 'Matching or contrast accent cushion cover stitching.' },
            { title: 'Leather Sofa Scratch Buffing', price: '₹899', desc: 'Color restoration and tear patching for genuine & PU leather.' },
            { title: 'Zip Replacement & Restitching', price: '₹299', desc: 'Heavy-duty nylon coil zippers for cushion cases.' }
          ].map((ser, i) => (
            <div key={i} className="glass-card" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px 0', color: '#fff' }}>{ser.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>{ser.desc}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>From</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary)' }}>{ser.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOFA CONFIGURATOR SECTION */}
      <section id="sofa-customizer-section" style={{ margin: '4.5rem 0' }}>
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
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              Configure Custom Sofa Covers
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Specify your sofa silhouette, enter approximate dimensions, and pick your preferred upholstery fabric.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }} className="specialist-grid-responsive">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Sofa Type */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  1. Sofa Configuration
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {['1 Seater', '2 Seater', '3 Seater', 'L Shape Sectional', 'Recliner Chair', 'Custom Shape'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSofaType(st)}
                      className="btn"
                      style={{
                        padding: '10px 8px',
                        fontSize: '0.78rem',
                        borderRadius: '8px',
                        border: sofaType === st ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: sofaType === st ? 'rgba(247,37,133,0.1)' : 'rgba(255,255,255,0.03)',
                        color: '#fff',
                        fontWeight: sofaType === st ? 700 : 500
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions Input */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  2. Approximate Dimensions (Optional - Specialist verifies at doorstep)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Length (e.g. 78 in)"
                    value={sofaLength}
                    onChange={e => setSofaLength(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.8rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Depth (e.g. 34 in)"
                    value={sofaDepth}
                    onChange={e => setSofaDepth(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.8rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Height (e.g. 32 in)"
                    value={sofaHeight}
                    onChange={e => setSofaHeight(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.8rem' }}
                  />
                </div>
              </div>

              {/* Fabric & Color */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Fabric Type
                  </label>
                  <select
                    value={sofaFabric}
                    onChange={e => setSofaFabric(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#111', color: '#fff', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
                  >
                    <option value="Pet-Friendly Scratch-Resistant Microfiber">Pet-Friendly Scratch Microfiber</option>
                    <option value="Belgian Textured Jute Linen">Belgian Textured Jute Linen</option>
                    <option value="Royal Micro-Velvet">Royal Micro-Velvet</option>
                    <option value="Heavy Cotton Duck Canvas">Heavy Cotton Duck Canvas</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                    Color Palette
                  </label>
                  <select
                    value={sofaColor}
                    onChange={e => setSofaColor(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#111', color: '#fff', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
                  >
                    <option value="Sand Beige">Sand Beige</option>
                    <option value="Slate Charcoal">Slate Charcoal</option>
                    <option value="Olive Moss">Olive Moss</option>
                    <option value="Midnight Navy">Midnight Navy</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live Sofa Summary Card */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
              <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
                <img src="./Vehicle Seat Covers.png" alt="Sofa cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>
                {sofaType} Sofa Cover Set
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                {sofaFabric} • {sofaColor}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Cost:</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>₹{basePrice.toLocaleString()}</strong>
              </div>

              <button
                onClick={handleCheckoutSofa}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontWeight: 800 }}
              >
                Book Doorstep Swatch Inspection (₹{basePrice.toLocaleString()})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TACTILE MATERIAL SHOWCASE */}
      <MaterialShowcase
        materials={sofaMaterials}
        title="Living Room Upholstery Fabric Anatomy"
        subtitle="Tested against claws, coffee spills, and heavy everyday lounging."
      />

      {/* 6. SPECIALIST DISCOVERY */}
      <SpecialistMapDiscovery
        specialtyCategory="sofas"
        categoryTitle="Sofa & Furniture Upholstery"
        tailors={tailors}
        currentUser={currentUser}
        onLoginRequired={onLoginRequired}
        onSelectTailorForBooking={(tailor) => {
          if (onAddToCart) {
            onAddToCart({
              id: `booking-${tailor.id}-${Date.now()}`,
              name: `Sofa Swatch Visit by ${tailor.name}`,
              price: 299,
              image: tailor.image,
              itemType: 'alteration'
            });
          }
        }}
      />
    </div>
  );
}
