import React, { useState } from 'react';
import { 
  Sparkles, Wrench, Scissors, ShieldCheck, Star, ArrowRight, 
  Upload, Layers, Check, ChevronRight, Sliders, Eye, Heart, ShoppingCart 
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import MaterialShowcase from './MaterialShowcase';
import SpecialistMapDiscovery from './SpecialistMapDiscovery';
import TrolleyWarrantyModal from './TrolleyWarrantyModal';
import AIMeasurementModal from './AIMeasurementModal';
import UniversalProductModal from './UniversalProductModal';

export default function BagsLeatherExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout,
  onOpenTracking,
  serviceMode = 'buying',
  onSelectServiceMode
}) {
  // Modal states
  const [warrantyModalOpen, setWarrantyModalOpen] = useState(false);
  const [aiMeasurementOpen, setAiMeasurementOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Bag Repair Interactive Wizard State
  const [selectedBagType, setSelectedBagType] = useState('Handbag');
  const [selectedIssue, setSelectedIssue] = useState('Zip & Runner Damaged');
  const [repairPhotoUploaded, setRepairPhotoUploaded] = useState(false);
  const [repairDescription, setRepairDescription] = useState('');
  const [repairSubmitted, setRepairSubmitted] = useState(false);

  // Custom Leather Jacket Studio State
  const [jacketGender, setJacketGender] = useState('Men');
  const [jacketStyle, setJacketStyle] = useState('Biker Double-Rider');
  const [jacketLeather, setJacketLeather] = useState('Full-Grain Italian Calfskin');
  const [jacketColor, setJacketColor] = useState('Vintage Cognac');
  const [jacketLining, setJacketLining] = useState('Quilted Bemberg Silk');
  const [jacketHardware, setJacketHardware] = useState('Antique Brass');
  const [jacketMeasurements, setJacketMeasurements] = useState(null);

  // Material Data for Bags & Leather
  const leatherMaterials = [
    {
      id: 'mat-fullgrain',
      name: 'Full-Grain Pull-Up Leather',
      type: '100% Genuine Bovine',
      badge: 'TOP GRAIN HERITAGE',
      image: './bagf_fb1.jpg',
      priceTier: 'Included (Base)',
      durability: '5 / 5',
      waterResistance: 'High (Natural Oils)',
      bestFor: 'Luxury Travel Bags & Daily Totes',
      description: 'The purest cut of leather with natural surface grain intact. Develops a magnificent, glossy patina over decades of usage.'
    },
    {
      id: 'mat-saffiano',
      name: 'Black Saffiano Textured Leather',
      type: 'Cross-Hatch Embossed',
      badge: 'SCRATCH PROOF',
      image: './bagf_fb2.jpg',
      priceTier: '+₹400 Upgrade',
      durability: '5 / 5',
      waterResistance: '100% Waterproof',
      bestFor: 'Executive Laptop Bags & Clutches',
      description: 'Signature diagonal cross-hatch texture treated with vegetable wax coating. Highly impervious to stains, rain, and scuffs.'
    },
    {
      id: 'mat-suede',
      name: 'Velvety Nubuck Suede',
      type: 'Top-Layer Buffed',
      badge: 'ULTRA SOFT TACTILE',
      image: './bagf_fb3.jpg',
      priceTier: '+₹250 Upgrade',
      durability: '4 / 5',
      waterResistance: 'Medium (Treated)',
      bestFor: 'Bespoke Jackets & Shoulder Bags',
      description: 'Buffed outer grain offering a rich, suede-like napped finish with extraordinary drape and softness.'
    },
    {
      id: 'mat-canvas',
      name: 'Heavy Waxed Scottish Canvas',
      type: '18 oz Cotton Duck',
      badge: 'WEATHERPROOF CANVAS',
      image: './bagf_fb4.jpg',
      priceTier: 'Included (Base)',
      durability: '4.8 / 5',
      waterResistance: '100% Hydrophobic',
      bestFor: 'Duffel Bags & Rucksacks',
      description: 'Tightly woven industrial cotton saturated with paraffin wax. Repels tropical rainstorms while giving a rugged field aesthetic.'
    }
  ];

  // Editorial Products for "The Leather Edit"
  const leatherProducts = [
    {
      id: 'lp-duffel',
      name: 'The Sovereign Leather Weekender Duffel',
      categoryLabel: 'SIGNATURE DUFFEL',
      price: 3499,
      originalPrice: 4999,
      rating: 4.9,
      reviewsCount: 78,
      image: './bag_b4.jpg',
      gallery: ['./bag_b4.jpg', './bag_b1.jpg', './bag_b2.jpg'],
      colors: ['Vintage Cognac', 'Midnight Black', 'Espresso Brown'],
      sizes: ['Standard 45L', 'Extended 55L'],
      description: 'Full-grain vegetable-tanned leather duffel with antique solid brass hardware, shoe compartment, and padded shoulder strap.'
    },
    {
      id: 'lp-tote',
      name: 'Bespoke Structured Work Tote',
      categoryLabel: 'DAILY CARRY',
      price: 2499,
      originalPrice: 3299,
      rating: 4.8,
      reviewsCount: 52,
      image: './bag_b1.jpg',
      gallery: ['./bag_b1.jpg', './bag_b5.jpg'],
      colors: ['Caramel Tan', 'Burgundy', 'Jet Black'],
      sizes: ['Fits 14" Laptop', 'Fits 16" Laptop'],
      description: 'Reinforced dual leather handles, magnetic closure, and microfiber-lined laptop sleeve designed for elegant modern commuters.'
    },
    {
      id: 'lp-messenger',
      name: 'Waxed Canvas & Leather Messenger',
      categoryLabel: 'URBAN FIELD',
      price: 1899,
      originalPrice: 2499,
      rating: 4.9,
      reviewsCount: 64,
      image: './bag_b2.jpg',
      gallery: ['./bag_b2.jpg', './bag_b6.jpg'],
      colors: ['Olive Green & Tan', 'Charcoal & Black'],
      sizes: ['One Size (15L)'],
      description: '18oz paraffin-waxed canvas bonded with pull-up leather straps. Weatherproof everyday bag built for heavy rain and long commutes.'
    },
    {
      id: 'lp-wallet',
      name: 'Minimalist Bifold Card Wallet',
      categoryLabel: 'LEATHER GOODS',
      price: 599,
      originalPrice: 899,
      rating: 4.9,
      reviewsCount: 110,
      image: './bag_b3.jpg',
      gallery: ['./bag_b3.jpg'],
      colors: ['Tan', 'Black', 'Olive'],
      sizes: ['Slim 6-Card'],
      description: 'Beveled and burnished by hand. Full-grain pocket wallet with RFID-blocking core and hidden banknote sleeve.'
    }
  ];

  // Bag Alteration Services with starting prices
  const bagServices = [
    { title: 'Telescopic Trolley Handle Replacement', price: '₹499', desc: 'Heavy-duty aluminum alloy pull-rod assembly replacement.', icon: '🧳' },
    { title: '360° Luggage Spinner Wheel Set', price: '₹399', desc: 'Silent dual-bearing shock-absorbent wheel replacement.', icon: '⚙️' },
    { title: 'Leather Handle Re-Stitching & Core', price: '₹249', desc: 'Reconstruction with thick rope core and saddle-stitch.', icon: '🧵' },
    { title: 'Heavy-Duty Coil Zip & Slider Swap', price: '₹249', desc: 'Replacement of broken runners, zip teeth realignment.', icon: '⚡' },
    { title: 'Full Inner Silk/Canvas Lining Replacement', price: '₹499', desc: 'Custom replacement for torn, stained, or peeling interiors.', icon: '✨' },
    { title: 'Corner & Edge Resin Re-Burnishing', price: '₹349', desc: 'Edge sealing, crack reinforcement, and color-matched edge paint.', icon: '🛡️' },
    { title: 'Leather Re-Dyeing & Patina Restoration', price: '₹799', desc: 'Deep nourishment, oil conditioning, and pigment restoration.', icon: '🎨' },
    { title: 'Shoulder Strap Anchor Reinforcement', price: '₹299', desc: 'D-ring re-anchoring with internal ballistic nylon backing.', icon: '🔗' }
  ];

  // Handle Jacket Checkout
  const handleJacketCheckout = () => {
    const jacketItem = {
      id: `jacket-${Date.now()}`,
      name: `Custom ${jacketGender}'s ${jacketStyle} Jacket`,
      price: 8499,
      image: './bagf_fb1.jpg',
      selectedColor: jacketColor,
      details: `${jacketLeather} • ${jacketLining} • Hardware: ${jacketHardware}`,
      requiresMeasurement: true,
      measurements: jacketMeasurements || { mode: 'Doorstep Fit-Helper Appointment' },
      quantity: 1,
      itemType: 'custom'
    };

    if (onDirectCheckout) {
      onDirectCheckout(jacketItem);
    } else if (onAddToCart) {
      onAddToCart(jacketItem);
    }
  };

  const handleRepairSubmit = (e) => {
    e.preventDefault();
    setRepairSubmitted(true);
    const repairItem = {
      id: `repair-${Date.now()}`,
      name: `${selectedBagType} Restoration: ${selectedIssue}`,
      price: 499,
      image: './Alteration.png',
      details: repairDescription || 'Doorstep inspection & master artisan repair',
      quantity: 1,
      itemType: 'alteration'
    };
    if (onAddToCart) onAddToCart(repairItem);
  };

  return (
    <div className="bags-leather-experience animate-fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="specialty-hero specialty-hero-responsive">
        {/* Subtle Ambient Background Visual */}
        <div
          className="specialty-hero-bg"
          style={{ backgroundImage: 'url("./Bags And Leather.png")' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(247,37,133,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
          <div className="specialty-hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', marginBottom: '18px' }}>
            <Sparkles size={15} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              StitchBee Leather & Bag Studio
            </span>
          </div>

          <h1>
            Crafted with care.<br />
            <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Restored with precision.
            </span><br />
            Made for you.
          </h1>

          <p className="specialty-hero-subtext">
            From heirloom travel bags and burst luggage zippers to bespoke custom leather jackets, StitchBee connects you with master leathercraft artisans who repair, customize, and create.
          </p>

          {/* Action Pills */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('buying')}
              className={`btn ${serviceMode === 'buying' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 20px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              🛍️ Custom Jackets & Goods
            </button>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('alteration')}
              className={`btn ${serviceMode === 'alteration' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 22px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              ✂️ Bag & Luggage Repairs
            </button>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('partner')}
              className={`btn ${serviceMode === 'partner' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 20px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              📍 Find Specialist Partners
            </button>
            <button
              onClick={() => setWarrantyModalOpen(true)}
              className="btn"
              style={{ padding: '12px 18px', fontSize: '0.9rem', background: 'rgba(76,201,240,0.1)', color: 'var(--accent)', border: '1px solid rgba(76,201,240,0.3)', fontWeight: 600 }}
            >
              <ShieldCheck size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px' }} />
              Trolley Warranty Claim
            </button>
          </div>

          {/* Trust Metric Badges */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={18} style={{ color: '#fbbf24', fill: '#fbbf24' }} /> 4.9 ★
              </strong>
              <span className="metric-label" style={{ fontSize: '0.72rem' }}>Verified Craft Rating</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'var(--border-color)' }} />
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', display: 'block', color: 'var(--primary)' }}>1,400+</strong>
              <span className="metric-label" style={{ fontSize: '0.72rem', display: 'block' }}>Bags & Jackets Restored</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'var(--border-color)' }} />
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', display: 'block', color: '#10b981' }}>100%</strong>
              <span className="metric-label" style={{ fontSize: '0.72rem', display: 'block' }}>Guaranteed Stitch Fit</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* ALTERATION & REPAIR MODE CONTENT                                */}
      {/* ============================================================== */}
      {serviceMode === 'alteration' && (
        <>
          {/* 2. INTERACTIVE BEFORE / AFTER TRANSFORMATION SLIDER */}
          <BeforeAfterSlider
        beforeImage="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
        afterImage="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80"
        beforeLabel="Worn, Torn & Scuffed Leather Bag"
        afterLabel="Hand-Dyed, Re-Stitched & Restored by StitchBee"
        title="Witness the Master Restoration Difference"
        subtitle="Drag the interactive divider to inspect how our certified leather specialists repair ripped handles, restore faded patinas, and replace torn linings."
        aspectRatio="21/9"
      />

      {/* 3. BAG ALTERATION & REPAIR SERVICES GRID */}
      <section style={{ margin: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Precision Alteration Catalog
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0 8px 0', color: 'var(--text-primary)' }}>
            Specialized Bag & Luggage Repairs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '620px', margin: '0 auto' }}>
            Transparent starting rates configured through StitchBee verified partner workshops. Pick your repair or upload custom photos below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {bagServices.map((ser, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{ser.icon}</div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
                  {ser.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                  {ser.desc}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Starting from</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary)' }}>{ser.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GUIDED BAG REPAIR FLOW SECTION */}
      <section id="bag-repair-section" style={{ margin: '4.5rem 0' }}>
        <div
          className="glass-card-no-hover"
          style={{
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', marginBottom: '4px' }}>
                <Wrench size={16} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Interactive Booking Wizard
                </span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                Book a Fast Bag or Luggage Repair
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                Select your bag type, indicate the issue, and schedule an immediate doorstep evaluation.
              </p>
            </div>

            <button
              onClick={() => setWarrantyModalOpen(true)}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '8px 16px', background: 'rgba(76,201,240,0.06)', color: 'var(--accent)', border: '1px solid rgba(76,201,240,0.2)' }}
            >
              Has Warranty? Check Eligibility
            </button>
          </div>

          {repairSubmitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(16,185,129,0.05)', borderRadius: '16px', border: '1px solid #10b981' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
                <Check size={32} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                Bag Repair Request Added to Universal Cart!
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                Estimated labor cost: ₹499. A specialist from Ravi Leather Studio will inspect and confirm final repairs.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setRepairSubmitted(false)}>
                  Repair Another Item
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (onDirectCheckout) {
                      onDirectCheckout({
                        id: `repair-bag-${Date.now()}`,
                        name: `${selectedBagType} Repair (${selectedIssue})`,
                        price: 499,
                        image: './Alteration.png',
                        itemType: 'alteration'
                      });
                    }
                  }}
                >
                  Checkout with Cashfree (₹499)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRepairSubmit}>
              {/* Bag Type Selector */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  1. Select Bag Silhouette
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    'Handbag', 'Backpack', 'Laptop Bag', 'Travel Duffel', 
                    'Trolley Suitcase', 'Leather Briefcase', 'School Bag', 'Other'
                  ].map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBagType(b)}
                      className="btn"
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.8rem',
                        borderRadius: '10px',
                        border: selectedBagType === b ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: selectedBagType === b ? 'var(--primary)' : 'var(--bg-card)',
                        color: selectedBagType === b ? '#fff' : 'var(--text-primary)',
                        fontWeight: selectedBagType === b ? 700 : 500
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Issue Selector */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  2. What Needs Repair?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {[
                    'Zip & Runner Damaged', 'Broken Handle / Strap', 'Torn Inner Lining',
                    'Cracked Leather Surface', 'Broken Wheels / Trolley Rod', 'Stitching Came Undone'
                  ].map(iss => (
                    <div
                      key={iss}
                      onClick={() => setSelectedIssue(iss)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: selectedIssue === iss ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                        background: selectedIssue === iss ? 'rgba(247,37,133,0.1)' : 'var(--bg-card)',
                        color: selectedIssue === iss ? 'var(--primary)' : 'var(--text-primary)',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: selectedIssue === iss ? '5px solid var(--primary)' : '1.5px solid var(--border-color)', flexShrink: 0 }} />
                      <span>{iss}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos & Description */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '24px' }}>
                <div
                  onClick={() => setRepairPhotoUploaded(!repairPhotoUploaded)}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: repairPhotoUploaded ? '1.5px solid #10b981' : '1px dashed var(--border-color)',
                    background: repairPhotoUploaded ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.02)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Upload size={22} style={{ color: repairPhotoUploaded ? '#10b981' : 'var(--primary)' }} />
                  <span style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600 }}>
                    {repairPhotoUploaded ? '✓ 2 Photos Attached' : 'Upload Damage Photos'}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Helps specialist quote exact parts</span>
                </div>

                <textarea
                  rows={3}
                  placeholder="Describe damage details or brand name (e.g. Broken left zipper pull on my Samsonite laptop bag)..."
                  value={repairDescription}
                  onChange={e => setRepairDescription(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.82rem' }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '18px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Evaluation Base</span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>₹499</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '6px' }}>includes doorstep pickup</span>
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontWeight: 700 }}>
                  Book Repair Service Now <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
        </>
      )}

      {/* ============================================================== */}
      {/* BUYING & BESPOKE CUSTOM GOODS MODE CONTENT                     */}
      {/* ============================================================== */}
      {serviceMode === 'buying' && (
        <>
          {/* 5. CUSTOM LEATHER JACKET BESPOKE STUDIO */}
          <section id="custom-jacket-section" style={{ margin: '4.5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Atelier Bespoke Tailoring
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0 8px 0', color: 'var(--text-primary)' }}>
            Custom Tailored Leather Jackets
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '620px', margin: '0 auto' }}>
            Individually patterned to your precise anatomical contours. Choice of Italian full-grain, lining materials, and YKK heavy brass hardware.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '32px', alignItems: 'start' }} className="specialist-grid-responsive">
          {/* Visual Jacket Preview Card */}
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
            <div style={{ width: '100%', height: '380px', position: 'relative', overflow: 'hidden', background: '#0a0914' }}>
              <img
                src="./bagf_fb1.jpg"
                alt="Jacket Leather Texture"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,9,20,0.9) 0%, transparent 60%)' }} />

              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <span style={{ fontSize: '0.72rem', background: 'var(--grad-primary)', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontWeight: 800, textTransform: 'uppercase' }}>
                  {jacketGender} • {jacketStyle}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '6px 0 2px 0' }}>
                  {jacketColor} Leather Jacket
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {jacketLeather} • {jacketLining}
                </span>
              </div>
            </div>

            {/* Price Review Breakdown (Section 16 requirement) */}
            <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <span>Custom Leather Jacket Labor & Craft</span>
                <span>₹8,499</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <span>Doorstep Fit-Helper Measurement</span>
                <span>₹199</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>Reinforced Garment Carrier Delivery</span>
                <span>₹149</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#fff', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                <span>Total Guaranteed Price</span>
                <span style={{ color: 'var(--primary)' }}>₹8,847</span>
              </div>
            </div>
          </div>

          {/* Jacket Customization Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Gender Toggle */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Gender Cut
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Men', 'Women', 'Unisex'].map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setJacketGender(g)}
                    className="btn"
                    style={{
                      flex: 1,
                      padding: '8px',
                      fontSize: '0.8rem',
                      borderRadius: '8px',
                      border: jacketGender === g ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      background: jacketGender === g ? 'var(--primary)' : 'var(--bg-card)',
                      color: jacketGender === g ? '#fff' : 'var(--text-primary)',
                      fontWeight: jacketGender === g ? 700 : 500
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Silhouette Style */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Silhouette & Collar Cut
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  'Biker Double-Rider', 'Flight Bomber', 'Cafe Racer',
                  'Classic Blazer', 'Sherpa Shearling', 'Bespoke Concept'
                ].map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setJacketStyle(st)}
                    className="btn"
                    style={{
                      padding: '10px 8px',
                      fontSize: '0.75rem',
                      borderRadius: '8px',
                      border: jacketStyle === st ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      background: jacketStyle === st ? 'var(--primary)' : 'var(--bg-card)',
                      color: jacketStyle === st ? '#fff' : 'var(--text-primary)',
                      fontWeight: jacketStyle === st ? 700 : 500
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Leather Grade & Color */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Leather Grade
                </label>
                <select
                  value={jacketLeather}
                  onChange={e => setJacketLeather(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                >
                  <option value="Full-Grain Italian Calfskin">Full-Grain Italian Calfskin</option>
                  <option value="Soft Vegetable-Tanned Nappa">Soft Vegetable-Tanned Nappa</option>
                  <option value="Distressed Vintage Cowhide">Distressed Vintage Cowhide</option>
                  <option value="Supple Lambskin Suede">Supple Lambskin Suede</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Leather Color
                </label>
                <select
                  value={jacketColor}
                  onChange={e => setJacketColor(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                >
                  <option value="Vintage Cognac">Vintage Cognac (Tan)</option>
                  <option value="Jet Midnight Black">Jet Midnight Black</option>
                  <option value="Dark Espresso Brown">Dark Espresso Brown</option>
                  <option value="Oxblood Maroon">Oxblood Maroon</option>
                </select>
              </div>
            </div>

            {/* Hardware & Lining */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Hardware / Zipper
                </label>
                <select
                  value={jacketHardware}
                  onChange={e => setJacketHardware(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                >
                  <option value="Antique Brass">Antique Brass</option>
                  <option value="Gunmetal Matte Silver">Gunmetal Matte Silver</option>
                  <option value="Stealth Jet Black">Stealth Jet Black</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Inner Lining
                </label>
                <select
                  value={jacketLining}
                  onChange={e => setJacketLining(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                >
                  <option value="Quilted Bemberg Silk">Quilted Bemberg Silk</option>
                  <option value="Heavy Cotton Tartan">Heavy Cotton Tartan</option>
                  <option value="Breathable Satin Jacquard">Breathable Satin Jacquard</option>
                </select>
              </div>
            </div>

            {/* Measurements Trigger */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '0.84rem', color: 'var(--text-primary)', display: 'block' }}>
                  Body Measurement: {jacketMeasurements ? '✓ Verified' : 'AI Scan or Home Visit'}
                </strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Required for custom pattern grading (Chest, Shoulder, Sleeve, Waist).
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAiMeasurementOpen(true)}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '8px 14px' }}
              >
                {jacketMeasurements ? 'Edit Sizing' : 'Set Measurements'}
              </button>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleJacketCheckout}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.95rem', fontWeight: 800, marginTop: '4px' }}
            >
              Order Custom Leather Jacket (₹8,847)
            </button>
          </div>
        </div>
      </section>

      {/* 6. TACTILE MATERIAL SHOWCASE */}
      <MaterialShowcase
        materials={leatherMaterials}
        title="Curated Leather & Canvas Anatomy"
        subtitle="Explore high-resolution textures, tensile strength, and water-resistance metrics."
      />

      {/* 7. "THE LEATHER EDIT" EDITORIAL PRODUCT COLLECTION */}
      <section style={{ margin: '4.5rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Artisan Crafted Goods
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '2px 0 0 0', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              THE LEATHER EDIT
            </h2>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Finished, ready-to-dispatch leather goods with complimentary custom monogramming.
          </span>
        </div>

        {/* Asymmetrical Editorial Collection Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px', alignItems: 'stretch' }} className="specialist-grid-responsive">
          {/* Main Featured Showpiece */}
          {leatherProducts[0] && (
            <div
              className="glass-card"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
              onClick={() => setSelectedProductForModal(leatherProducts[0])}
            >
              <div style={{ width: '100%', height: '360px', position: 'relative', overflow: 'hidden', background: '#0a0914' }}>
                <img
                  src={leatherProducts[0].image}
                  alt={leatherProducts[0].name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--grad-primary)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '8px' }}>
                  FEATURED EDIT
                </div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {leatherProducts[0].name}
                    </h3>
                    <strong style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>
                      ₹{leatherProducts[0].price.toLocaleString()}
                    </strong>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                    {leatherProducts[0].description}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
                    ★ 4.9 • Free Monogram Included
                  </span>
                  <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.8rem' }}>
                    Inspect & Customize
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Supporting Product Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {leatherProducts.slice(1).map(prod => (
              <div
                key={prod.id}
                className="glass-card"
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  gap: '16px',
                  cursor: 'pointer',
                  alignItems: 'center'
                }}
                onClick={() => setSelectedProductForModal(prod)}
              >
                <div style={{ width: '90px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                    {prod.categoryLabel}
                  </span>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, margin: '2px 0 4px 0', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {prod.name}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>₹{prod.price.toLocaleString()}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>View Specs →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CRAFTSMANSHIP SECTION: "MADE BY SKILLED HANDS" */}
      <section style={{ margin: '4.5rem 0', background: 'rgba(255,255,255,0.02)', padding: '40px 32px', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 6px 0', color: '#fff' }}>
            Made by Skilled Hands
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            5-Stage Heritage Leathercraft Protocol adhered to by every verified StitchBee atelier.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {[
            { num: '01', title: 'Inspection & Selection', desc: 'Grain uniformity, pull-up character, and tensile load verification.' },
            { num: '02', title: 'Precision Skiving', desc: 'Hand-paring leather edges for seamless zero-bulk folds and joins.' },
            { num: '03', title: 'Saddle Stitching', desc: 'Double-needle bonded waxed thread that never unravels if clipped.' },
            { num: '04', title: 'Edge Burnishing', desc: 'Repeated sanding, beeswax application, and organic edge sealing.' },
            { num: '05', title: 'Stress QA Check', desc: 'Handle tensile load test up to 25 kg and zipper run cycle audit.' }
          ].map((step, idx) => (
            <div key={idx} style={{ padding: '16px', borderRadius: '14px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)', opacity: 0.8, display: 'block', marginBottom: '4px' }}>
                {step.num}
              </span>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', margin: '0 0 4px 0' }}>{step.title}</h4>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
        </>
      )}

      {/* ============================================================== */}
      {/* SPECIALIST PARTNER SELECTION MODE CONTENT                     */}
      {/* ============================================================== */}
      {serviceMode === 'partner' && (
        <SpecialistMapDiscovery
          specialtyCategory="bags"
          categoryTitle="Bags & Leather"
          tailors={tailors}
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          onSelectTailorForBooking={(tailor) => {
            if (onAddToCart) {
              onAddToCart({
                id: `booking-${tailor.id}-${Date.now()}`,
                name: `Specialist Consultation with ${tailor.name}`,
                price: tailor.services?.[0]?.price || 249,
                image: tailor.image,
                specialist: tailor.name,
                itemType: 'alteration'
              });
            }
          }}
        />
      )}

      {/* 10. EDITORIAL CUSTOMER STORY */}
      <section style={{ margin: '4rem 0', padding: '36px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(247,37,133,0.06) 0%, rgba(76,201,240,0.06) 100%)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
            alt="Customer portrait"
            style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
          />
          <div style={{ flex: 1, minWidth: '260px' }}>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#fff', lineHeight: '1.6', margin: '0 0 10px 0' }}>
              "My grandfather's 1978 leather suitcase had broken corner rivets and completely locked up runners. StitchBee matched me with Ravi Leather Studio in HSR Layout. They sourced vintage-matched brass runners and hand-conditioned the leather until it looked like a museum masterpiece."
            </p>
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#fff' }}>Vikramaditya S.</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> • Indiranagar, Bengaluru • Vintage Leather Restoration</span>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FINAL HIGH-IMPACT VISUAL CTA */}
      <section style={{ textAlign: 'center', padding: '60px 24px', borderRadius: '24px', background: 'var(--grad-primary)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
          Your Favorite Things Deserve Another Life.
        </h2>
        <p style={{ fontSize: '1rem', maxWidth: '580px', margin: '0 auto 28px auto', opacity: 0.9 }}>
          Repair it with master artisans. Customize it to your exact physique. Or select a local verified specialist.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              if (onSelectServiceMode) onSelectServiceMode('alteration');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            className="btn btn-secondary"
            style={{ background: '#fff', color: 'var(--primary)', fontWeight: 800, padding: '12px 28px' }}
          >
            ✂️ Start a Bag Repair
          </button>
          <button
            type="button"
            onClick={() => {
              if (onSelectServiceMode) onSelectServiceMode('buying');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            className="btn btn-secondary"
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', padding: '12px 24px', fontWeight: 700 }}
          >
            🛍️ Commission Custom Leather
          </button>
          <button
            type="button"
            onClick={() => {
              if (onSelectServiceMode) onSelectServiceMode('partner');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
            className="btn btn-secondary"
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', padding: '12px 24px', fontWeight: 700 }}
          >
            📍 Find Local Specialists
          </button>
        </div>
      </section>

      {/* MODALS */}
      <TrolleyWarrantyModal
        isOpen={warrantyModalOpen}
        onClose={() => setWarrantyModalOpen(false)}
        onSubmitClaim={(claimData) => {
          alert(`Warranty Claim initiated for ${claimData.brand} ${claimData.model}! Reference dossier created.`);
        }}
        onSwitchToPaidRepair={() => {
          const el = document.getElementById('bag-repair-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <AIMeasurementModal
        isOpen={aiMeasurementOpen}
        onClose={() => setAiMeasurementOpen(false)}
        type="apparel"
        onConfirmMeasurements={(data) => {
          setJacketMeasurements(data);
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
