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
              { key: 'men', name: 'Men Collection', price: '₹599', img: './Mens Collection.jpg' },
              { key: 'women', name: 'Women Collection', price: '₹499', img: './womensCollection.jpg' },
              { key: 'bridal', name: 'Bridal Collection', price: '₹899', img: './bridalCollection.jpg' },
              { key: 'kids', name: 'Kids Collection', price: '₹399', img: './kidsCollection.jpg' },
              { key: 'luxury', name: 'Luxury Exclusive', price: '₹899', img: './luxuryCollection.jpg' }
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





      </div>
    </section>
  );
}
