import React, { useState } from 'react';
import { 
  Sparkles, Wrench, ShieldCheck, Star, ArrowRight, 
  Upload, Layers, Check, Home, ChevronRight, Sliders, Eye 
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import MaterialShowcase from './MaterialShowcase';
import SpecialistMapDiscovery from './SpecialistMapDiscovery';
import FlipkartCatalogView from './FlipkartCatalogView';
import FlipkartProductDetailView from './FlipkartProductDetailView';

export default function SofasExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout,
  serviceMode = 'buying',
  onSelectServiceMode
}) {
  const [selectedPdpProduct, setSelectedPdpProduct] = useState(null);

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

  const sofaProducts = [
    {
      id: 'sofa-3seater',
      name: 'Tailored 3-Seater Velvet Sofa Slipcover Set with Piping',
      categoryLabel: 'Sofa Covers',
      subcategory: 'Sofa Covers',
      brand: 'LivingCraft',
      price: 4999,
      originalPrice: 7999,
      rating: 4.9,
      reviewsCount: 86,
      isAssured: true,
      image: './Vehicle Seat Covers.png',
      gallery: ['./Vehicle Seat Covers.png', './fab4.jpg', './fab3.jpg'],
      colors: ['Royal Sapphire', 'Emerald Green', 'Charcoal Grey', 'Champagne Beige'],
      sizes: ['Standard 3-Seater (78 in)', 'Compact 3-Seater (72 in)', 'Grand 3-Seater (84 in)'],
      description: 'Custom-tailored heavyweight micro-velvet slipcovers with tailored seat cushion envelopes, corded piping trims, and non-slip bottom anchors.'
    },
    {
      id: 'sofa-sectional',
      name: 'L-Shape Sectional Waterproof Stretch Sofa Cover',
      categoryLabel: 'Sectional Covers',
      subcategory: 'Sectional Covers',
      brand: 'LivingCraft',
      price: 7499,
      originalPrice: 11999,
      rating: 4.8,
      reviewsCount: 64,
      isAssured: true,
      image: './Vehicle Seat Covers.png',
      gallery: ['./Vehicle Seat Covers.png', './fab2.jpg', './fab1.jpg'],
      colors: ['Slate Charcoal', 'Sand Beige', 'Midnight Navy'],
      sizes: ['Left Chaise (96x60 in)', 'Right Chaise (96x60 in)', 'U-Shape Sectional'],
      description: 'Dual-piece tailored sectional slipcovers made with hydro-repellent 4-way stretch waffle jacquard fabric. Resists coffee spills and pet dampness.'
    },
    {
      id: 'sofa-pet-protector',
      name: 'Pet-Friendly Anti-Scratch Microfiber Couch Protector',
      categoryLabel: 'Pet Protectors',
      subcategory: 'Pet Protectors',
      brand: 'PawArmor',
      price: 3299,
      originalPrice: 4999,
      rating: 4.9,
      reviewsCount: 112,
      isAssured: true,
      image: './fab3.jpg',
      gallery: ['./fab3.jpg', './Vehicle Seat Covers.png', './pets_wear.jpg'],
      colors: ['Chocolate Brown', 'Dove Grey', 'Olive Moss'],
      sizes: ['2-Seater (54 in)', '3-Seater (70 in)', 'XL-Couch (78 in)'],
      description: 'Ultra-dense woven microfiber that claws cannot puncture or snag. Machine washable with rubberized non-skid dot backing and tuck-in foam rollers.'
    },
    {
      id: 'sofa-foam-renewal',
      name: 'High-Density Orthopedic Foam Cushion Renewal Set (Pack of 3)',
      categoryLabel: 'Cushions & Foam',
      subcategory: 'Cushions & Foam',
      brand: 'StitchBee Living',
      price: 3999,
      originalPrice: 5999,
      rating: 4.8,
      reviewsCount: 49,
      isAssured: true,
      image: './fab1.jpg',
      gallery: ['./fab1.jpg', './Vehicle Seat Covers.png'],
      colors: ['40-Density Firm Foam', '45-Density High Resilient Lux'],
      sizes: ['22x24x4 in', '24x24x5 in', 'Custom Cut Dimensions'],
      description: 'Revitalize sagging living room couches with 10-year warranty high-resilience foam cores wrapped in dacron batting and protective stocking knit.'
    },
    {
      id: 'sofa-recliner',
      name: 'Tailored Recliner Armchair Stretch Slipcover with Side Pocket',
      categoryLabel: 'Recliner Covers',
      subcategory: 'Recliner Covers',
      brand: 'LivingCraft',
      price: 2499,
      originalPrice: 3899,
      rating: 4.7,
      reviewsCount: 58,
      isAssured: true,
      image: './Vehicle Seat Covers.png',
      gallery: ['./Vehicle Seat Covers.png', './fab4.jpg'],
      colors: ['Sand Beige', 'Charcoal Grey', 'Warm Rust'],
      sizes: ['Single Recliner (One-Size Stretch)'],
      description: '4-piece form-fitting design covering arms, back, and footrest independently. Features dedicated side magazine and remote control pocket.'
    },
    {
      id: 'sofa-cushion-set',
      name: 'Artisan Jacquard Woven Cushion Covers Set of 5 (16x16 in)',
      categoryLabel: 'Cushions & Foam',
      subcategory: 'Cushions & Foam',
      brand: 'Heritage Weave',
      price: 999,
      originalPrice: 1799,
      rating: 4.9,
      reviewsCount: 230,
      isAssured: true,
      image: './fab4.jpg',
      gallery: ['./fab4.jpg', './br_bridal3.jpg'],
      colors: ['Boho Geometric Multi', 'Royal Floral Gold', 'Moroccan Indigo'],
      sizes: ['16x16 in (Set of 5)', '18x18 in (Set of 5)', '20x20 in (Set of 5)'],
      description: 'Loom-woven heavy chenille and jacquard designer cushion covers with hidden YKK zippers and reinforced double-lock stitching.'
    },
    {
      id: 'sofa-spill-shield',
      name: 'Quilted Spill-Proof Reversible Sofa Seat Shield',
      categoryLabel: 'Pet Protectors',
      subcategory: 'Pet Protectors',
      brand: 'PawArmor',
      price: 1899,
      originalPrice: 2899,
      rating: 4.8,
      reviewsCount: 77,
      isAssured: true,
      image: './fab2.jpg',
      gallery: ['./fab2.jpg', './Vehicle Seat Covers.png'],
      colors: ['Double-Sided Grey/Beige', 'Navy/Tan Brown'],
      sizes: ['Loveseat (46 in)', 'Sofa (68 in)'],
      description: 'Diamond-quilted water-resistant throw protector with elastic back anchor straps to stop shifting while sitting.'
    },
    {
      id: 'sofa-jute-throw',
      name: 'Heavy Belgian Jute Linen Living Room Throw Blanket & Runner',
      categoryLabel: 'Cushions & Foam',
      subcategory: 'Cushions & Foam',
      brand: 'StitchBee Living',
      price: 1499,
      originalPrice: 2499,
      rating: 4.9,
      reviewsCount: 92,
      isAssured: true,
      image: './fab5.jpg',
      gallery: ['./fab5.jpg', './Vehicle Seat Covers.png'],
      colors: ['Natural Oatmeal', 'Sage Green', 'Terracotta Earth'],
      sizes: ['Large (70x90 in)', 'Extra Large (90x108 in)'],
      description: 'Woven from 100% natural breathable jute linen with knotted fringe tassels. Elegant casual cover for summer sofas.'
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
      {serviceMode !== 'buying' && (
      <section className="specialty-hero specialty-hero-responsive">
        <div
          className="specialty-hero-bg"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80")',
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

          <h1 style={{ fontSize: '3.2rem', fontWeight: 900, lineHeight: '1.08', margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>
            Give Your Space<br />
            <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              A New Look.
            </span>
          </h1>

          <p className="specialty-hero-subtext" style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px' }}>
            Tailored sofa slipcovers, foam cushion renewal, claw-resistant fabrics, and luxury leather sofa re-upholstery. Our master upholsterers visit your living room with fabric swatches.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('buying')}
              className={`btn ${serviceMode === 'buying' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 20px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              🛍️ Customize Sofa Covers
            </button>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('alteration')}
              className={`btn ${serviceMode === 'alteration' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 22px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              ✂️ Sofa Services & Foam Renewal
            </button>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('partner')}
              className={`btn ${serviceMode === 'partner' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 20px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              📍 Find Upholsterers
            </button>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={18} style={{ color: '#fbbf24', fill: '#fbbf24' }} /> 4.9 ★
              </strong>
              <span className="metric-label" style={{ fontSize: '0.72rem' }}>Living & Upholstery Rating</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'var(--border-color)' }} />
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', color: '#10b981' }}>Home Visit</strong>
              <span className="metric-label" style={{ fontSize: '0.72rem', display: 'block' }}>Fabric Swatch Swapping</span>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ============================================================== */}
      {/* ALTERATION & SOFA SERVICES MODE CONTENT                        */}
      {/* ============================================================== */}
      {serviceMode === 'alteration' && (
        <>
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
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>{ser.title}</h4>
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
        </>
      )}

      {/* ============================================================== */}
      {/* BUYING & SOFA CONFIGURATOR MODE CONTENT                        */}
      {/* ============================================================== */}
      {serviceMode === 'buying' && (
        <>
          {selectedPdpProduct ? (
            <div id="pdp-scroll-anchor" style={{ margin: '1.5rem 0 3rem 0' }}>
              <FlipkartProductDetailView
                product={selectedPdpProduct}
                categoryTitle="Sofas & Cushions"
                onBack={() => {
                  setSelectedPdpProduct(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAddToCart={onAddToCart}
                onBuyNow={(prod) => {
                  if (onDirectCheckout) onDirectCheckout(prod);
                }}
                currentUser={currentUser}
              />
            </div>
          ) : (
            <>
              {/* 1. FLIPKART STYLE CATALOG BROWSING & FILTERS (Image 1 Reference) */}
              <section id="flipkart-sofa-catalog-section" style={{ margin: '2rem 0 4rem 0' }}>
                <FlipkartCatalogView
                  categoryKey="sofas"
                  categoryTitle="Sofas, Cushions & Living Upholstery"
                  breadcrumbs={['Home', 'Living & Furniture', 'Sofa Covers & Cushions']}
                  products={sofaProducts}
                  onSelectProduct={(prod) => {
                    setSelectedPdpProduct(prod);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onQuickBuy={(prod) => {
                    if (onDirectCheckout) onDirectCheckout(prod);
                  }}
                  onAddToCart={onAddToCart}
                />
              </section>

              {/* 4. SOFA CONFIGURATOR SECTION (Hidden in Buying mode) */}
              {false && (
              <>
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
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
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
                        background: sofaType === st ? 'rgba(247,37,133,0.1)' : 'var(--bg-card)',
                        color: sofaType === st ? 'var(--primary)' : 'var(--text-primary)',
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
                    style={{ padding: '8px 10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Depth (e.g. 34 in)"
                    value={sofaDepth}
                    onChange={e => setSofaDepth(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Height (e.g. 32 in)"
                    value={sofaHeight}
                    onChange={e => setSofaHeight(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem' }}
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
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
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
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}
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
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
              <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
                <img src="./Vehicle Seat Covers.png" alt="Sofa cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
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
              </>
              )}
            </>
          )}
        </>
      )}

      {/* ============================================================== */}
      {/* SPECIALIST PARTNER SELECTION MODE CONTENT                     */}
      {/* ============================================================== */}
      {serviceMode === 'partner' && (
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
      )}
    </div>
  );
}
