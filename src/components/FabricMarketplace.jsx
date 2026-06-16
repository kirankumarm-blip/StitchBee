import React, { useState, useRef } from 'react';
import { Award, Compass, Sparkles, Scissors, Ruler, ShieldCheck, Star, Heart, ArrowRight, ShoppingBag, Plus } from 'lucide-react';

export default function FabricMarketplace({ openAuthModal, currentUser, setRole, onCategorySelect }) {
  // 1. Swatches data for the interactive mannequin customizer
  const swatches = [
    {
      id: 'black-wool',
      name: 'Charcoal Black Wool',
      type: 'Premium Wool',
      price: 1999,
      fillUrl: 'url(#pattern-black-wool)',
      ratings: { softness: 5, breathability: 4, luxury: 5 },
      weight: 'Medium (280g/m)',
      stretch: 'Low (Natural Stretch)',
      softness: 'Extra Soft (Cashmere blend)',
      desc: 'Expertly woven herringbone wool with a soft touch, perfect for royal formal blazers and suits.'
    },
    {
      id: 'navy-wool',
      name: 'Navy Pinstripe Wool',
      type: 'Italian Wool',
      price: 2499,
      fillUrl: 'url(#pattern-navy-wool)',
      ratings: { softness: 4, breathability: 4, luxury: 5 },
      weight: 'Medium-Heavy (310g/m)',
      stretch: 'Low (Pure Wool)',
      softness: 'Smooth & Structured',
      desc: 'Classic business navy wool with white pinstripes. Holds structure perfectly for formal executive suits.'
    },
    {
      id: 'beige-linen',
      name: 'Beige Cross-Hatch Linen',
      type: 'Belgian Linen',
      price: 1499,
      fillUrl: 'url(#pattern-beige-linen)',
      ratings: { softness: 3, breathability: 5, luxury: 4 },
      weight: 'Lightweight (180g/m)',
      stretch: 'None',
      softness: 'Coarse & Airy',
      desc: 'Authentic flax linen with a visible organic weave. Maximum breathability for premium summer shirts and trousers.'
    },
    {
      id: 'white-cotton',
      name: 'Crisp White Cotton Twill',
      type: 'Egyptian Cotton',
      price: 799,
      fillUrl: 'url(#pattern-white-cotton)',
      ratings: { softness: 5, breathability: 5, luxury: 4 },
      weight: 'Light-Medium (150g/m)',
      stretch: 'Medium (Natural Twill)',
      softness: 'Super Soft (100% Giza)',
      desc: 'Fine double-ply twill weave with a subtle sheen. Best for executive collared shirts and daily summer luxury.'
    },
    {
      id: 'maroon-velvet',
      name: 'Royal Maroon Velvet',
      type: 'Luxury Velvet',
      price: 1899,
      fillUrl: 'url(#grad-maroon-velvet)',
      ratings: { softness: 5, breathability: 3, luxury: 5 },
      weight: 'Heavyweight (380g/m)',
      stretch: 'Low (Stretch Weft)',
      softness: 'Ultra Plush Velvet',
      desc: 'Deep burgundy velvet with a plush pile that shines in light. Ideal for high-end wedding blazers and gowns.'
    }
  ];

  const [activeFabricIdx, setActiveFabricIdx] = useState(0);
  const currentFabric = swatches[activeFabricIdx];
  const [waveActive, setWaveActive] = useState(false);

  const handleFabricSelect = (idx) => {
    setActiveFabricIdx(idx);
    setWaveActive(true);
    setTimeout(() => setWaveActive(false), 800); // 800ms cloth wave distortion duration
  };



  const handleBookOutfit = (fabricName, catKey = 'all') => {
    if (!currentUser) {
      openAuthModal('customer', 'login');
    } else {
      if (onCategorySelect) {
        onCategorySelect(catKey);
      } else {
        setRole('customer');
      }
    }
  };

  // Ref for categories scroll buttons
  const catScrollRef = useRef(null);
  const scrollCategories = (dir) => {
    if (catScrollRef.current) {
      const scrollAmt = 280;
      catScrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmt : scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <section id="fabric-marketplace" className="fabric-marketplace-section">
      <div className="landing-container">
        
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge" style={{ background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', padding: '6px 12px', borderRadius: 'var(--radius-full)', fontWeight: '600', fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Curated Material Catalog
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '10px', color: '#fff' }}>
            Explore Premium Fabric Marketplace
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1.02rem', maxWidth: '600px', margin: '8px auto 0' }}>
            Choose from luxury fabrics sourced for perfect custom tailoring.
          </p>
        </div>

        {/* 1. Fabric Category Cards (Horizontal Row) */}
        <div className="categories-slider-wrapper">
          <button className="slider-nav-btn slider-left" onClick={() => scrollCategories('left')}>&#8592;</button>
          <div className="categories-slider" ref={catScrollRef}>
            {[
              { key: 'men', name: 'Men Collection', price: '₹599', img: '/Mens Collection.jpg' },
              { key: 'women', name: 'Women Collection', price: '₹499', img: '/womensCollection.jpg' },
              { key: 'bridal', name: 'Bridal Collection', price: '₹899', img: '/bridalCollection.jpg' },
              { key: 'kids', name: 'Kids Collection', price: '₹399', img: '/kidsCollection.jpg' },
              { key: 'luxury', name: 'Luxury Exclusive', price: '₹899', img: '/luxuryCollection.jpg' }
            ].map((cat, idx) => (
              <div 
                key={idx} 
                className="category-scroll-card glass-card" 
                onClick={() => onCategorySelect && onCategorySelect(cat.key)} 
                style={{ cursor: 'pointer' }}
              >
                <div className="cat-img-box">
                  <img src={cat.img} alt={cat.name} />
                  <div className="cat-img-overlay"></div>
                </div>
                <div className="cat-info">
                  <h4>{cat.name}</h4>
                  <span className="price-tag">From {cat.price}/meter</span>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-nav-btn slider-right" onClick={() => scrollCategories('right')}>&#8594;</button>
        </div>

        {/* 2 & 3. Featured Luxury & Swatches Mannequin Widget (Combined Grid) */}
        <div className="fabric-mannequin-grid" style={{ margin: '4rem 0' }}>
          
          {/* Mannequin Interactive Widget */}
          <div className="glass-card mannequin-widget-card" style={{ padding: '30px' }}>
            <div className="mannequin-header" style={{ marginBottom: '20px' }}>
              <span className="badge-mini" style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Live Mannequin Preview
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginTop: '6px' }}>Interactive Fabric Swatches</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click swatches below to change mannequin blazer fabric</p>
            </div>

            <div className="mannequin-flex-layout">
              {/* Torso/Mannequin Box */}
              <div className="mannequin-viewer-box">
                <div className={`mannequin-svg-wrapper ${waveActive ? 'cloth-wave-effect' : ''}`}>
                  <svg width="200" height="350" viewBox="0 0 200 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      {/* Black Wool Pattern */}
                      <pattern id="pattern-black-wool" width="10" height="10" patternUnits="userSpaceOnUse">
                        <rect width="10" height="10" fill="#181818" />
                        <path d="M0,5 L5,0 M5,10 L10,5 M0,10 L10,0" stroke="#2b2b2b" strokeWidth="1" />
                      </pattern>

                      {/* Navy Wool Pattern */}
                      <pattern id="pattern-navy-wool" width="12" height="12" patternUnits="userSpaceOnUse">
                        <rect width="12" height="12" fill="#0d1f3d" />
                        <line x1="4" y1="0" x2="4" y2="12" stroke="#1c3a6b" strokeWidth="1" />
                        <line x1="10" y1="0" x2="10" y2="12" stroke="#1c3a6b" strokeWidth="1" />
                      </pattern>

                      {/* Beige Linen Pattern */}
                      <pattern id="pattern-beige-linen" width="12" height="12" patternUnits="userSpaceOnUse">
                        <rect width="12" height="12" fill="#d2b48c" />
                        <line x1="0" y1="3" x2="12" y2="3" stroke="#b5946a" strokeWidth="0.8" />
                        <line x1="0" y1="9" x2="12" y2="9" stroke="#b5946a" strokeWidth="0.8" />
                        <line x1="3" y1="0" x2="3" y2="12" stroke="#b5946a" strokeWidth="0.8" />
                        <line x1="9" y1="0" x2="9" y2="12" stroke="#b5946a" strokeWidth="0.8" />
                      </pattern>

                      {/* White Cotton Pattern */}
                      <pattern id="pattern-white-cotton" width="8" height="8" patternUnits="userSpaceOnUse">
                        <rect width="8" height="8" fill="#fafafa" />
                        <line x1="0" y1="0" x2="8" y2="8" stroke="#eeeeee" strokeWidth="0.8" />
                      </pattern>

                      {/* Maroon Velvet Gradient */}
                      <radialGradient id="grad-maroon-velvet" cx="50%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#7a0826" />
                        <stop offset="50%" stopColor="#500316" />
                        <stop offset="100%" stopColor="#2c000a" />
                      </radialGradient>

                      {/* Shadow for depth */}
                      <filter id="shadow-depth" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="2" dy="5" stdDeviation="4" floodOpacity="0.4"/>
                      </filter>
                    </defs>

                    {/* Torso stand */}
                    <path d="M100,280 L100,340" stroke="#555555" strokeWidth="4" />
                    <path d="M70,340 L130,340 L125,348 L75,348 Z" fill="#333333" />

                    {/* V-Neck Shirt block */}
                    <path d="M90,75 L110,75 L100,95 Z" fill="#eaeaea" />
                    {/* Tie */}
                    <path d="M98,95 L102,95 L104,140 L100,148 L96,140 Z" fill="var(--primary)" />

                    {/* Blazer/Torso base (wraps texture fill) */}
                    <path 
                      d="M60,95 C75,70 125,70 140,95 C145,115 142,160 138,200 C134,230 128,260 128,280 L72,280 C72,260 66,230 62,200 C58,160 55,115 60,95 Z" 
                      fill={currentFabric.fillUrl} 
                      filter="url(#shadow-depth)"
                    />

                    {/* Left Sleeve */}
                    <path d="M60,95 C52,110 46,150 46,210 C46,220 52,220 54,210 C54,170 56,130 63,110 Z" fill={currentFabric.fillUrl} opacity="0.95" />
                    {/* Right Sleeve */}
                    <path d="M140,95 C148,110 154,150 154,210 C154,220 148,220 146,210 C146,170 144,130 137,110 Z" fill={currentFabric.fillUrl} opacity="0.95" />

                    {/* Lapel details */}
                    <path d="M98,75 L68,96 L85,160 L100,120 Z" fill={currentFabric.fillUrl} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                    <path d="M102,75 L132,96 L115,160 L100,120 Z" fill={currentFabric.fillUrl} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

                    {/* Blazer Buttons */}
                    <circle cx="100" cy="180" r="3.5" fill="#ffd700" />
                    <circle cx="100" cy="210" r="3.5" fill="#ffd700" />
                  </svg>
                </div>
              </div>

              {/* Fabric Details Dynamic Info */}
              <div className="mannequin-info-box">
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 'bold' }}>{currentFabric.type}</span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginTop: '2px' }}>{currentFabric.name}</h4>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)', display: 'block', marginTop: '4px' }}>₹{currentFabric.price}/meter</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{currentFabric.desc}</p>
                
                {/* Fabric Feel Ratings */}
                <div className="fabric-ratings-box" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="rating-row">
                    <span className="rating-label">Softness</span>
                    <div className="stars-row">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill={i < currentFabric.ratings.softness ? 'var(--primary)' : 'none'} stroke={i < currentFabric.ratings.softness ? 'var(--primary)' : 'var(--text-muted)'} />
                      ))}
                    </div>
                  </div>
                  <div className="rating-row">
                    <span className="rating-label">Breathability</span>
                    <div className="stars-row">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill={i < currentFabric.ratings.breathability ? 'var(--primary)' : 'none'} stroke={i < currentFabric.ratings.breathability ? 'var(--primary)' : 'var(--text-muted)'} />
                      ))}
                    </div>
                  </div>
                  <div className="rating-row">
                    <span className="rating-label">Luxury Level</span>
                    <div className="stars-row">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill={i < currentFabric.ratings.luxury ? 'var(--primary)' : 'none'} stroke={i < currentFabric.ratings.luxury ? 'var(--primary)' : 'var(--text-muted)'} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fabric Specifications */}
                <div className="fabric-specs" style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <div><strong>Fabric Weight:</strong> {currentFabric.weight}</div>
                  <div><strong>Fabric Stretch:</strong> {currentFabric.stretch}</div>
                  <div><strong>Fabric Feel:</strong> {currentFabric.softness}</div>
                </div>

                {/* Customize Button */}
                <button className="primary-btn" onClick={() => handleBookOutfit(currentFabric.name, 'men')} style={{ width: '100%', padding: '10px', marginTop: '16px', fontSize: '0.85rem' }}>
                  Stitch Outfit with this Fabric
                </button>
              </div>
            </div>

            {/* Circular Swatch Picker Row */}
            <div className="swatches-pick-row" style={{ marginTop: '25px', display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
              {swatches.map((sw, idx) => (
                <button 
                  key={sw.id} 
                  onClick={() => handleFabricSelect(idx)} 
                  className={`swatch-circle-btn ${activeFabricIdx === idx ? 'active' : ''}`}
                  title={sw.name}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: activeFabricIdx === idx ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.2)',
                    background: sw.id === 'black-wool' ? '#181818' : 
                                sw.id === 'navy-wool' ? '#0d1f3d' : 
                                sw.id === 'beige-linen' ? '#d2b48c' : 
                                sw.id === 'white-cotton' ? '#f0f0f0' : '#7a0826',
                    cursor: 'pointer',
                    boxShadow: activeFabricIdx === idx ? '0 0 10px rgba(247,37,133,0.5)' : 'none',
                    transform: activeFabricIdx === idx ? 'scale(1.15)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Featured Luxury Showcase */}
          <div className="featured-fabric-card glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div className="featured-zoom-wrapper" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
              <img 
                src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=700&q=80" 
                alt="Luxury Italian Wool" 
                className="featured-bg-img"
              />
              <div className="featured-card-blur"></div>
            </div>
            
            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge-mini" style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.68rem', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Luxury Collection Spotlight
                </span>
                <h3 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '15px', color: '#fff', lineHeight: '1.1' }}>Italian Royal Wool</h3>
                <p style={{ color: 'var(--text-primary)', marginTop: '10px', fontSize: '0.92rem', maxWidth: '320px', lineHeight: '1.4' }}>
                  Luxury imported fabric for premium bespoke suits, tuxedos, and winter blazers.
                </p>
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff' }}>₹2,499</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/meter starting</span>
                </div>
              </div>

              <div style={{ marginTop: '30px', display: 'flex', gap: '12px' }}>
                <button className="primary-btn" onClick={() => handleBookOutfit('Italian Royal Wool', 'luxury')} style={{ flexGrow: 1, padding: '12px' }}>
                  Customize Suit
                </button>
                <button className="secondary-btn" onClick={() => onCategorySelect && onCategorySelect('luxury')} style={{ padding: '12px', background: 'rgba(0,0,0,0.5)' }}>
                  View Fabrics
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* 6. Why Our Fabrics? */}
        <div className="why-fabrics-section" style={{ margin: '4rem 0' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#fff' }}>Why Our Fabrics?</h3>
          <div className="why-fabrics-grid">
            {[
              { title: 'Premium Quality Checked', desc: 'Every meter undergoes strict thread count, color bleed, and shrinkage inspection.', icon: <Award size={20} /> },
              { title: 'Imported Fabrics', desc: 'Direct sourcing of wool from Biella, linen from Belgium, and cotton from Giza.', icon: <Compass size={20} /> },
              { title: 'Authentic Material', desc: 'Certified pure fabrics complete with official SilkMark and Woolmark certifications.', icon: <ShieldCheck size={20} /> },
              { title: 'Best Stitch Compatibility', desc: 'Pre-treated fabric structures optimized for hand-stitching and tailored durability.', icon: <Scissors size={20} /> },
              { title: 'Custom Fit Ready', desc: 'Sufficient fabric sizing allowance designed specifically for bespoke suit and shirt fittings.', icon: <Ruler size={20} /> },
              { title: 'Long-lasting Quality', desc: 'Highly resilient fibers that maintain structure, fit, and sheen through repeated dry cleaning.', icon: <Sparkles size={20} /> }
            ].map((why, idx) => (
              <div key={idx} className="glass-card why-fabric-card" style={{ padding: '20px', display: 'flex', gap: '15px' }}>
                <div className="why-icon-box" style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {why.icon}
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '0.98rem', color: '#fff' }}>{why.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px', lineHeight: '1.4' }}>{why.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Fabric + Stitch Combo */}
        <div className="stitch-combos-section" style={{ margin: '4rem 0' }}>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#fff' }}>Fabric + Stitch Combo packages</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Save up to 20% by purchasing premium fabric and stitching together</p>
          </div>
          
          <div className="combos-grid">
            {[
              { title: 'Italian Wool + Suit Stitching', desc: 'Premium Super 150s Merino Wool fabric + full jacket & trouser custom stitching.', price: '₹5,999', original: '₹6,999', save: 'Save ₹1,000', label: 'Bestselling Suit Pack' },
              { title: 'Belgian Linen + Shirt Stitching', desc: 'Pure linen fabric + custom slim-fit shirt stitching with collar customization.', price: '₹1,999', original: '₹2,200', save: 'Save ₹201', label: 'Summer Casual Pack' },
              { title: 'Royal Silk + Kurta Stitching', desc: 'Fine Mulberry silk fabric + bespoke wedding kurta stitching with chest lining.', price: '₹3,499', original: '₹4,000', save: 'Save ₹501', label: 'Festive Ethnic Pack' }
            ].map((combo, idx) => (
              <div key={idx} className="glass-card combo-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                <span className="combo-badge">{combo.label}</span>
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff', marginTop: '10px' }}>{combo.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '8px', lineHeight: '1.4', height: '38px', overflow: 'hidden' }}>{combo.desc}</p>
                </div>
                <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>{combo.price}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{combo.original}</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 'bold', display: 'block' }}>{combo.save}</span>
                  </div>
                  <button className="primary-btn" onClick={() => handleBookOutfit(combo.title, combo.title.includes('Wool') ? 'luxury' : combo.title.includes('Linen') ? 'men' : 'bridal')} style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                    Buy Combo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Designer Picks */}
        <div className="designer-picks-section" style={{ margin: '4rem 0', background: 'var(--grad-glow)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#fff' }}>
            Recommended by Top Designers
          </h3>
          <div className="designer-picks-flex" style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 280px', textAlign: 'left' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                "We always advise our customers to pick high-grade Egyptian cotton for shirts and Super 150s wool for suits. The fall, finish, and structural retention of StitchBee marketplace fabrics match top global luxury brands."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  V
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>Vikram Singh</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Senior Bespoke Designer, StitchBee Expert</span>
                </div>
              </div>
            </div>
            <div style={{ flex: '1 1 280px', textAlign: 'left' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                "Linen has a tendency to lose stitch integrity if poorly woven. Sourcing verified Belgian Linen from this marketplace ensures tailors get perfect tension during seam stitching, which prevents bunching."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--secondary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  S
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>Sneha Reddy</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Bridal & Ethnic Couture Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 9. CTA Section */}
        <div className="fabric-cta-banner" style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-dark) 100%)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '50px 30px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-glow)' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#fff' }}>Find Your Perfect Fabric Today</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '10px auto 25px', fontSize: '0.95rem' }}>
              Sourced directly from authentic weavers and double quality-checked for perfect custom tailoring.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="primary-btn" onClick={() => handleBookOutfit('Egyptian Giza Cotton', 'men')} style={{ padding: '14px 28px' }}>
                Customize Your Outfit
              </button>
              <button className="secondary-btn" onClick={() => handleBookOutfit('Marketplace Store', 'all')} style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.05)' }}>
                Explore Fabric Store
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
