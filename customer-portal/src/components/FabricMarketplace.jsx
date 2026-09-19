import React, { useState, useRef } from 'react';
import { 
  Award, Compass, Sparkles, Scissors, Ruler, ShieldCheck, 
  Star, Heart, ArrowRight, ShoppingBag, Plus, Check, Info, 
  X, Eye, Tag, Clock, Truck, Layers, CheckCircle2, Zap
} from 'lucide-react';

export default function FabricMarketplace({ openAuthModal, currentUser, setRole, onCategorySelect, theme }) {
  const [activeComboCategory, setActiveComboCategory] = useState('all');
  const [selectedSpecsCombo, setSelectedSpecsCombo] = useState(null);

  // Ref for categories scroll buttons
  const catScrollRef = useRef(null);
  const scrollCategories = (dir) => {
    if (catScrollRef.current) {
      const scrollAmt = 280;
      catScrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmt : scrollAmt, behavior: 'smooth' });
    }
  };

  const handleBookOutfit = (comboTitle, catKey = 'all') => {
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

  const COMBO_PACKAGES = [
    {
      id: 'italian-wool-suit',
      category: 'suits',
      title: 'Italian Super 150s Merino Wool + Bespoke 2-Piece Suit',
      subtitle: 'Biella Wool Mill (Italy) • 3.5m Fabric + Full-Canvas Tailoring',
      tag: 'Bestselling Luxury Suit Pack',
      rating: '4.95',
      reviews: 142,
      price: 5999,
      originalPrice: 7999,
      saveAmount: 2000,
      discountPercent: '25% OFF',
      outfitImg: './why_join_2.jpg',
      swatchImg: './men1.jpg',
      swatchName: 'Charcoal Herringbone 150s',
      fabricType: 'Pure Super 150s Merino Wool',
      deliveryDays: '4-5 Days',
      catKey: 'luxury',
      inclusions: [
        '3.5m Italian Super 150s Merino Wool fabric',
        'Handcrafted 2-piece jacket & tailored trousers',
        'Imported breathable Bemberg lining & horn buttons',
        'Custom lapel, pocket, and interior monogramming',
        'Free doorstep trial & infinite fit guarantee'
      ],
      specs: {
        composition: '100% Super 150s Merino Wool',
        weight: '280 GSM (All-Season Medium Weight)',
        origin: 'Biella, Northern Italy',
        weave: 'Twill / Micro-Herringbone Weave',
        feel: 'Silky smooth, drape-holding structured finish',
        tailoring: 'Full Canvas Construction with Horsehair Interfacing',
        washCare: 'Dry Clean Only'
      }
    },
    {
      id: 'kanjeevaram-silk-blouse',
      category: 'bridal',
      title: 'Kanjeevaram Pattu Silk + Maggam & Aari Handwork Blouse',
      subtitle: 'SilkMark Certified Pure Zari Silk • 1.25m Fabric + Artisanal Embroidery',
      tag: 'Bridal Heritage Exclusive',
      rating: '4.98',
      reviews: 218,
      price: 3299,
      originalPrice: 4500,
      saveAmount: 1201,
      discountPercent: '27% OFF',
      outfitImg: './bridal 5.jpg',
      swatchImg: './bridal2.jpg',
      swatchName: 'Crimson Gold Zari Pattu',
      fabricType: 'Certified Pure Kanjeevaram Silk',
      deliveryDays: '3-4 Days',
      catKey: 'bridal',
      inclusions: [
        '1.25m Certified Pure Kanjeevaram Silk with Rich Border',
        'Custom princess-cut or katori blouse stitching',
        'Intricate neckline Maggam / Aari pearl hand embroidery',
        'Dual-layer sweat-resistant cotton lining & padded cups',
        'Doorstep trial with customized latkan tassel hangings'
      ],
      specs: {
        composition: '100% Pure Mulberry Silk with Gold Zari Warp',
        weight: '210 GSM (Heavy Luxury Silk)',
        origin: 'Kanchipuram, Tamil Nadu',
        weave: 'Korvai Handloom Interlocking Weave',
        feel: 'Rich, lustrous texture with stiff royal drape',
        tailoring: 'Master Artisan Hand Embroidery & Padded Fitting',
        washCare: 'Professional Silk Dry Clean Only'
      }
    },
    {
      id: 'belgian-linen-shirt-trouser',
      category: 'executive',
      title: 'Pure Belgian Flax Linen + Executive Shirt & Trousers',
      subtitle: '100% European Organic Flax • 3.2m Fabric + Slim-Fit Tailoring',
      tag: 'Summer Royal Casual Pack',
      rating: '4.90',
      reviews: 96,
      price: 1999,
      originalPrice: 2600,
      saveAmount: 601,
      discountPercent: '23% OFF',
      outfitImg: './why_join_1.jpg',
      swatchImg: './men2.jpg',
      swatchName: 'Oatmeal Cross-Hatch Linen',
      fabricType: '100% Belgian Organic Flax Linen',
      deliveryDays: '3 Days',
      catKey: 'men',
      inclusions: [
        '3.2m Natural Belgian Flax Linen fabric',
        'Custom tailored formal/casual shirt & pleated trousers',
        'Mother-of-pearl buttons & fused structured collar',
        'Pre-washed and pre-shrunk to eliminate post-wash shrinkage',
        'Free home fitting trial & alteration guarantee'
      ],
      specs: {
        composition: '100% European Certified Organic Flax',
        weight: '185 GSM (Ultra-Breathable Light-Medium)',
        origin: 'Flanders, Belgium',
        weave: 'Airy Cross-Hatch Slub Weave',
        feel: 'Crisp organic feel that softens luxuriously with every wash',
        tailoring: 'Single-needle precision edge stitching',
        washCare: 'Gentle Machine / Hand Wash, Steam Iron while damp'
      }
    },
    {
      id: 'banarasi-georgette-anarkali',
      category: 'ethnic',
      title: 'Banarasi Georgette + Designer Flared Anarkali / Gown',
      subtitle: 'Hand-dyed Viscose Georgette with Antique Zari • 5.0m Fabric + Full Flared Stitching',
      tag: 'Festive Glamour Pack',
      rating: '4.92',
      reviews: 134,
      price: 4499,
      originalPrice: 5800,
      saveAmount: 1301,
      discountPercent: '22% OFF',
      outfitImg: './womensCollection.jpg',
      swatchImg: './bridal3.jpg',
      swatchName: 'Royal Emerald Antique Zari',
      fabricType: 'Banarasi Hand-Dyed Georgette',
      deliveryDays: '4-5 Days',
      catKey: 'women',
      inclusions: [
        '5.0m Flowing Banarasi Georgette fabric with gold motifs',
        'Custom floor-length 24-kali flared Anarkali or Party Gown',
        'Full Santoon lining with structured canvas hemline border',
        'Custom neck cutouts, zipper back & matching dupattas border',
        'Free doorstep size capture & trial delivery'
      ],
      specs: {
        composition: 'Pure Viscose Georgette with Antique Gold Zari',
        weight: '160 GSM (Flowy & Dramatic Fall)',
        origin: 'Varanasi, Uttar Pradesh',
        weave: 'Kadhiwa Jacquard Floral Motifs',
        feel: 'Lightweight, feather-soft with dynamic fluid movement',
        tailoring: '24-Kali Flared Architecture with reinforced hem',
        washCare: 'Dry Clean Recommended'
      }
    }
  ];

  const filteredCombos = activeComboCategory === 'all' 
    ? COMBO_PACKAGES 
    : COMBO_PACKAGES.filter(c => c.category === activeComboCategory);

  const isLight = theme === 'light';

  return (
    <section id="fabric-marketplace" className="fabric-marketplace-section">
      <div className="landing-container">
        
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge" style={{ background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', padding: '6px 12px', borderRadius: 'var(--radius-full)', fontWeight: '600', fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Curated Material Catalog
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '10px', color: isLight ? '#0f172a' : '#fff' }}>
            Explore Premium Fabric Marketplace
          </h2>
          <p style={{ color: isLight ? '#64748b' : 'var(--text-secondary)', marginTop: '8px', fontSize: '1.02rem', maxWidth: '600px', margin: '8px auto 0' }}>
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
                  <h4 style={{ color: isLight ? '#0f172a' : '#fff' }}>{cat.name}</h4>
                  <span className="price-tag">From {cat.price}/meter</span>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-nav-btn slider-right" onClick={() => scrollCategories('right')}>&#8594;</button>
        </div>

        {/* 2. Why Our Fabrics? */}
        <div className="why-fabrics-section" style={{ margin: '4rem 0' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: isLight ? '#0f172a' : '#fff' }}>Why Our Fabrics?</h3>
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
                  <h4 style={{ fontWeight: 'bold', fontSize: '0.98rem', color: isLight ? '#0f172a' : '#fff' }}>{why.title}</h4>
                  <p style={{ color: isLight ? '#64748b' : 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px', lineHeight: '1.4' }}>{why.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Luxury Fabric + Stitch Combo Packages */}
        <div className="stitch-combos-section" style={{ margin: '4.5rem 0' }}>
          
          {/* Header & Sub-banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ 
                  background: 'linear-gradient(135deg, rgba(247,37,133,0.18), rgba(76,201,240,0.18))', 
                  color: 'var(--primary)', 
                  border: '1px solid rgba(247,37,133,0.3)',
                  padding: '4px 10px', 
                  borderRadius: '12px', 
                  fontSize: '0.72rem', 
                  fontWeight: '700', 
                  letterSpacing: '0.04em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Zap size={12} fill="currentColor" /> ATELIER BUNDLES
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>
                  ✓ Guaranteed 20-30% Savings
                </span>
              </div>
              <h3 style={{ fontSize: '1.9rem', fontWeight: '800', color: isLight ? '#0f172a' : '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                Fabric + Bespoke Stitch Combo Packages
              </h3>
              <p style={{ color: isLight ? '#64748b' : 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px', maxWidth: '620px' }}>
                All-in-one curated sets: Certified raw fabric delivered with master bespoke tailoring, doorstep sizing, and infinite fit guarantee.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Combos' },
                { id: 'suits', label: 'Bespoke Suits' },
                { id: 'bridal', label: 'Bridal & Silk' },
                { id: 'executive', label: 'Flax Linen' },
                { id: 'ethnic', label: 'Designer Ethnic' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveComboCategory(tab.id)}
                  style={{
                    padding: '7px 15px',
                    borderRadius: '24px',
                    fontSize: '0.8rem',
                    fontWeight: activeComboCategory === tab.id ? '700' : '500',
                    border: activeComboCategory === tab.id ? '1px solid var(--primary)' : isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
                    background: activeComboCategory === tab.id ? 'var(--primary)' : isLight ? '#ffffff' : 'rgba(255,255,255,0.04)',
                    color: activeComboCategory === tab.id ? '#ffffff' : isLight ? '#334155' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: activeComboCategory === tab.id ? '0 4px 14px rgba(247,37,133,0.3)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Premium Combos Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '24px' 
          }}>
            {filteredCombos.map((combo) => (
              <div 
                key={combo.id} 
                className="glass-card" 
                style={{ 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
                  background: isLight ? '#ffffff' : 'rgba(15, 23, 42, 0.65)',
                  boxShadow: isLight ? '0 10px 30px rgba(0,0,0,0.06)' : '0 12px 36px rgba(0,0,0,0.35)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative'
                }}
              >
                {/* Visual Imagery Preview Banner */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden', background: '#000' }}>
                  <img 
                    src={combo.outfitImg} 
                    alt={combo.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' 
                  }} />

                  {/* Top Badge: Highlight Tag */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                    <span style={{ 
                      background: 'rgba(15, 23, 42, 0.85)', 
                      backdropFilter: 'blur(8px)',
                      color: '#4cc9f0', 
                      border: '1px solid rgba(76,201,240,0.4)',
                      padding: '4px 10px', 
                      borderRadius: '8px', 
                      fontSize: '0.68rem', 
                      fontWeight: '700',
                      letterSpacing: '0.03em'
                    }}>
                      {combo.tag}
                    </span>
                  </div>

                  {/* Discount Badge */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span style={{ 
                      background: 'linear-gradient(135deg, #f72585, #7209b7)', 
                      color: '#ffffff', 
                      padding: '4px 10px', 
                      borderRadius: '8px', 
                      fontSize: '0.72rem', 
                      fontWeight: '800',
                      boxShadow: '0 4px 12px rgba(247,37,133,0.4)'
                    }}>
                      {combo.discountPercent}
                    </span>
                  </div>

                  {/* Floating Fabric Swatch Thumbnail */}
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '12px', 
                    right: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    background: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(10px)',
                    padding: '4px 10px 4px 4px',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <img 
                      src={combo.swatchImg} 
                      alt={combo.swatchName} 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #fff' }}
                    />
                    <span style={{ fontSize: '0.68rem', color: '#fff', fontWeight: '600' }}>
                      {combo.swatchName}
                    </span>
                  </div>

                  {/* Delivery Timeline Pill */}
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '5px', color: '#cbd5e1', fontSize: '0.72rem' }}>
                    <Clock size={13} color="#4cc9f0" />
                    <span>Tailored in {combo.deliveryDays}</span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  
                  {/* Rating & Fabric Type Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {combo.fabricType}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#f59e0b', fontWeight: '700' }}>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span>{combo.rating}</span>
                      <span style={{ color: isLight ? '#94a3b8' : 'rgba(255,255,255,0.4)', fontWeight: '400' }}>({combo.reviews})</span>
                    </div>
                  </div>

                  {/* Package Title */}
                  <h4 style={{ 
                    fontSize: '1.08rem', 
                    fontWeight: '700', 
                    color: isLight ? '#0f172a' : '#ffffff', 
                    lineHeight: '1.35', 
                    margin: '0 0 6px 0',
                    minHeight: '44px'
                  }}>
                    {combo.title}
                  </h4>

                  <p style={{ 
                    fontSize: '0.78rem', 
                    color: isLight ? '#64748b' : 'var(--text-secondary)', 
                    margin: '0 0 16px 0',
                    lineHeight: '1.4'
                  }}>
                    {combo.subtitle}
                  </p>

                  {/* Package Inclusions Checklist */}
                  <div style={{ 
                    background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.03)', 
                    borderRadius: '12px', 
                    padding: '12px 14px', 
                    border: isLight ? '1px solid #f1f5f9' : '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '16px'
                  }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', color: isLight ? '#475569' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                      Package Inclusions:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {combo.inclusions.slice(0, 3).map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.76rem', color: isLight ? '#334155' : '#e2e8f0', lineHeight: '1.35' }}>
                          <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Specs Trigger Link */}
                  <div style={{ marginBottom: '18px' }}>
                    <button
                      onClick={() => setSelectedSpecsCombo(combo)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        color: '#4cc9f0',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        textDecoration: 'underline'
                      }}
                    >
                      <Info size={13} /> View full fabric specs & tailoring details
                    </button>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div style={{ 
                    marginTop: 'auto', 
                    paddingTop: '15px', 
                    borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>
                          ₹{combo.price.toLocaleString('en-IN')}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: isLight ? '#94a3b8' : 'var(--text-muted)', textDecoration: 'line-through' }}>
                          ₹{combo.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Tag size={11} /> Save ₹{combo.saveAmount.toLocaleString('en-IN')} instant
                      </span>
                    </div>

                    <button 
                      className="primary-btn" 
                      onClick={() => handleBookOutfit(combo.title, combo.catKey)} 
                      style={{ 
                        padding: '10px 18px', 
                        fontSize: '0.84rem', 
                        fontWeight: '700',
                        color: '#ffffff',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 15px rgba(247,37,133,0.35)',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      <ShoppingBag size={14} color="#ffffff" />
                      <span style={{ color: '#ffffff' }}>Buy Combo</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Quick Specs Modal Popup */}
        {selectedSpecsCombo && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}>
            <div style={{
              background: isLight ? '#ffffff' : '#0f172a',
              color: isLight ? '#0f172a' : '#f8fafc',
              borderRadius: '20px',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
              padding: '24px',
              position: 'relative'
            }}>
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSpecsCombo(null)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isLight ? '#475569' : '#fff',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img 
                  src={selectedSpecsCombo.swatchImg} 
                  alt={selectedSpecsCombo.swatchName} 
                  style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--primary)' }}
                />
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
                    {selectedSpecsCombo.tag}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: isLight ? '#0f172a' : '#fff' }}>
                    {selectedSpecsCombo.title}
                  </h3>
                </div>
              </div>

              {/* All Inclusions Full List */}
              <div style={{ 
                background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.03)', 
                borderRadius: '12px', 
                padding: '16px', 
                marginBottom: '20px',
                border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.06)'
              }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: isLight ? '#0f172a' : '#fff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#10b981" /> Full Combo Inclusions:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedSpecsCombo.inclusions.map((inc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: isLight ? '#334155' : '#cbd5e1' }}>
                      <span style={{ color: '#10b981', fontWeight: 'bold' }}>•</span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: isLight ? '#0f172a' : '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={16} color="var(--primary)" /> Technical Fabric & Tailoring Specs:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {Object.entries(selectedSpecsCombo.specs).map(([key, val]) => (
                    <div key={key} style={{ 
                      background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.02)', 
                      padding: '10px 12px', 
                      borderRadius: '8px',
                      border: isLight ? '1px solid #f1f5f9' : '1px solid rgba(255,255,255,0.04)'
                    }}>
                      <div style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'capitalize', fontWeight: '600' }}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: isLight ? '#0f172a' : '#e2e8f0', fontWeight: '600', marginTop: '2px' }}>
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee & Action */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>
                      ₹{selectedSpecsCombo.price.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: isLight ? '#94a3b8' : 'var(--text-muted)', textDecoration: 'line-through' }}>
                      ₹{selectedSpecsCombo.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: '700' }}>
                    Includes Fabric + Doorstep Trial + Stitching
                  </span>
                </div>

                <button 
                  className="primary-btn" 
                  onClick={() => {
                    setSelectedSpecsCombo(null);
                    handleBookOutfit(selectedSpecsCombo.title, selectedSpecsCombo.catKey);
                  }}
                  style={{ 
                    padding: '10px 22px', 
                    fontSize: '0.88rem', 
                    fontWeight: '700',
                    color: '#ffffff',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(247,37,133,0.35)'
                  }}
                >
                  <span style={{ color: '#ffffff' }}>Book This Combo Now</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

