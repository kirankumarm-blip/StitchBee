import React, { useState } from 'react';
import { 
  Sparkles, Heart, Star, ArrowRight, Check, 
  Ruler, Camera, Layers, Eye, ShoppingCart 
} from 'lucide-react';
import MaterialShowcase from './MaterialShowcase';
import SpecialistMapDiscovery from './SpecialistMapDiscovery';
import AIMeasurementModal from './AIMeasurementModal';
import UniversalProductModal from './UniversalProductModal';

export default function PetOutfitsExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout,
  serviceMode = 'buying',
  onSelectServiceMode
}) {
  const [petMeasurementModalOpen, setPetMeasurementModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Pet Configurator States
  const [petSpecies, setPetSpecies] = useState('Dog');
  const [petBreed, setPetBreed] = useState('Golden Retriever');
  const [petSize, setPetSize] = useState('L (25-35 kg)');
  const [petDesign, setPetDesign] = useState('Royal Festive Sherwani');
  const [petFabric, setPetFabric] = useState('Royal Micro-Velvet (Festive)');
  const [petMeasurements, setPetMeasurements] = useState(null);

  // Pet Outfit Alteration / Resizing State
  const [petAlterationType, setPetAlterationType] = useState('Festive Sherwani / Tuxedo');
  const [petAlterationIssue, setPetAlterationIssue] = useState('Resize Chest / Neck for Growing Pet');
  const [petAlterationSubmitted, setPetAlterationSubmitted] = useState(false);

  const petAlterationServices = [
    { title: 'Pet Outfit Resizing (Chest / Neck)', price: '₹249', desc: 'Expand or take-in seams as your pet grows so favorite outfits still fit comfortably.', icon: '📏' },
    { title: 'Heavy-Duty Velcro & Snap Button Replacement', price: '₹149', desc: 'Replace weak or fur-clogged velcro with ultra-grip pet closure tape.', icon: '✨' },
    { title: 'Leash Anchor Ring & Harness Reinforcement', price: '₹199', desc: 'Restitch pulled D-ring attachment points with tensile-bonded nylon thread.', icon: '🔗' },
    { title: 'Raincoat & Fleece Seam Waterproofing', price: '₹249', desc: 'Heat-seal torn seams and reapply hydrophobic waterproof film.', icon: '🌧️' },
    { title: 'Anti-Chafing Soft Neoprene Lining Addition', price: '₹199', desc: 'Add ultra-soft padded underlay to stiff collars or harnesses that cause friction.', icon: '🐾' }
  ];

  const dogBreeds = ['Golden Retriever', 'Beagle', 'Pug', 'Labrador', 'Shih Tzu', 'Indie', 'German Shepherd'];
  const catBreeds = ['Persian Cat', 'Indie Short-Hair', 'Siamese', 'British Shorthair', 'Maine Coon'];

  const petMaterials = [
    {
      id: 'mat-petcotton',
      name: 'Hypoallergenic Organic Cotton',
      type: '100% Breathable Weave',
      badge: 'SKIN FRIENDLY',
      image: './fab2.jpg',
      priceTier: 'Included (Base)',
      durability: '4.8 / 5',
      waterResistance: 'Machine Washable 40°C',
      bestFor: 'Daily Kurtas & Sleep T-Shirts',
      description: 'Zero chemical dyes or harsh bleaches. Tested non-irritant against sensitive pet underbellies.'
    },
    {
      id: 'mat-petfleece',
      name: 'Thermal Anti-Pill Polar Fleece',
      type: 'Double-Brushed Polyester',
      badge: 'WINTER WARMTH',
      image: './fab4.jpg',
      priceTier: 'Included (Base)',
      durability: '5 / 5',
      waterResistance: 'Fast Dry Hydrophobic',
      bestFor: 'Winter Sweaters & Vests',
      description: 'Ultra-lightweight warmth insulation that traps body heat without restricting active movement.'
    },
    {
      id: 'mat-petripstop',
      name: 'Reflective Waterproof Ripstop',
      type: 'Diamond-Grid Nylon',
      badge: 'MONSOON SHIELD',
      image: './fab5.jpg',
      priceTier: '+₹150 Upgrade',
      durability: '5 / 5',
      waterResistance: '100% Sealed Seam Proof',
      bestFor: 'All-Weather Raincoats & Harnesses',
      description: 'Resists thorny outdoor brush while keeping underfur bone-dry. 3M reflective border for night walking safety.'
    }
  ];

  const petProducts = [
    {
      id: 'pp-sherwani',
      name: 'Royal Festive Pet Sherwani with Zari',
      categoryLabel: 'WEDDING COUTURE',
      price: 799,
      originalPrice: 1199,
      rating: 5.0,
      reviewsCount: 84,
      image: './Pets.png',
      gallery: ['./Pets.png', './pets_wear.jpg'],
      colors: ['Ruby Red & Gold', 'Emerald Green', 'Royal Navy'],
      sizes: ['Small (5-10kg)', 'Medium (12-22kg)', 'Large (25-38kg)'],
      description: 'Bespoke festive velvet sherwani with golden embroidered trims, Velcro belly strap for effortless 10-second wear, and leash portal.'
    },
    {
      id: 'pp-tux',
      name: "Gentleman's Black-Tie Pet Tuxedo",
      categoryLabel: 'FORMAL EVENT',
      price: 899,
      originalPrice: 1299,
      rating: 4.9,
      reviewsCount: 42,
      image: './Pets.png',
      gallery: ['./Pets.png'],
      colors: ['Classic Black & White', 'Midnight Blue'],
      sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
      description: 'Satin lapel tuxedo vest with integrated red bowtie. Elastic comfort belly band allowing natural bathroom breaks.'
    },
    {
      id: 'pp-raincoat',
      name: 'High-Visibility Waterproof Hooded Raincoat',
      categoryLabel: 'WEATHER GEAR',
      price: 649,
      originalPrice: 949,
      rating: 4.8,
      reviewsCount: 65,
      image: './Pets.png',
      gallery: ['./Pets.png'],
      colors: ['Safety Yellow', 'Electric Orange'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Tough ripstop raincoat with transparent visor hood and underbelly splash guard. Keeps mud off your car interior.'
    },
    {
      id: 'pp-harness',
      name: 'Bespoke Padded Leather No-Choke Harness',
      categoryLabel: 'LEATHER WALKING',
      price: 1199,
      originalPrice: 1699,
      rating: 5.0,
      reviewsCount: 112,
      image: './Pets.png',
      gallery: ['./Pets.png'],
      colors: ['Natural Tan', 'Dark Brown', 'Onyx Black'],
      sizes: ['Custom Tailored to Chest Girth'],
      description: 'Hand-stitched vegetable-tanned leather harness lined with soft neoprene padding. Brass buckle and free engraved nameplate.'
    }
  ];

  const handleCustomPetOutfitCheckout = () => {
    const item = {
      id: `pet-outfit-${Date.now()}`,
      name: `Custom ${petBreed} ${petDesign}`,
      price: 899,
      image: './Pets.png',
      selectedColor: petFabric,
      details: `${petSpecies}: ${petBreed} (${petSize}) • ${petFabric} ${petMeasurements ? '• Custom Measurements Verified' : ''}`,
      requiresMeasurement: true,
      measurements: petMeasurements || { size: petSize },
      quantity: 1,
      itemType: 'custom'
    };
    if (onDirectCheckout) onDirectCheckout(item);
    else if (onAddToCart) onAddToCart(item);
  };

  return (
    <div className="pets-experience animate-fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* 1. HERO */}
      <section className="specialty-hero specialty-hero-responsive">
        <div
          className="specialty-hero-bg"
          style={{
            backgroundImage: 'url("./Pets.png")',
            backgroundSize: 'contain',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(247,37,133,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(247,37,133,0.12)', border: '1px solid rgba(247,37,133,0.3)', marginBottom: '18px' }}>
            <Sparkles size={15} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              StitchBee Tailored Pet Couture
            </span>
          </div>

          <h1 style={{ fontSize: '3.2rem', fontWeight: 900, lineHeight: '1.08', margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>
            Made for Their<br />
            <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Little Moments.
            </span>
          </h1>

          <p className="specialty-hero-subtext" style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px' }}>
            Bespoke festive sherwanis for wedding celebrations, zero-choke ergonomic leather harnesses, and breathable cotton playwear customized to your pet's exact chest and neck dimensions.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('buying')}
              className={`btn ${serviceMode === 'buying' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 20px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              🛍️ Pet Couture & Catalog
            </button>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('alteration')}
              className={`btn ${serviceMode === 'alteration' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 22px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              ✂️ Pet Outfit Resizing & Alteration
            </button>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('partner')}
              className={`btn ${serviceMode === 'partner' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 20px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              📍 Find Pet Tailors
            </button>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart size={18} style={{ color: 'var(--primary)', fill: 'var(--primary)' }} /> 100%
              </strong>
              <span className="metric-label" style={{ fontSize: '0.72rem' }}>Comfort & Skin Safe</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'var(--border-color)' }} />
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', color: '#10b981' }}>Easy Wear</strong>
              <span className="metric-label" style={{ fontSize: '0.72rem', display: 'block' }}>10-Second Velcro Closure</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* ALTERATION & RESIZING MODE CONTENT                             */}
      {/* ============================================================== */}
      {serviceMode === 'alteration' && (
        <>
          {/* Pet Alteration Services Catalog */}
          <section style={{ margin: '4rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Pet Garment Alterations & Repairs
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0 8px 0', color: 'var(--text-primary)' }}>
                Pet Outfit Resizing & Care
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '620px', margin: '0 auto' }}>
                Keep your pet comfortable in their cherished festive outfits as they grow. Doorstep pickup and alteration fitting.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {petAlterationServices.map((ser, i) => (
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

          {/* Guided Pet Resizing Booking Wizard */}
          <section style={{ margin: '4.5rem 0' }}>
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
                  Schedule Pet Outfit Resizing & Fit Check
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                  Select the item type and what adjustments are needed for your pet.
                </p>
              </div>

              {petAlterationSubmitted ? (
                <div style={{ textAlign: 'center', padding: '36px 20px', background: 'rgba(16,185,129,0.06)', borderRadius: '16px', border: '1px solid #10b981' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
                    <Check size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    Pet Alteration Request Saved!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                    Service booked for {petAlterationType}: {petAlterationIssue}.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (onDirectCheckout) {
                        onDirectCheckout({
                          id: `pet-alter-${Date.now()}`,
                          name: `Pet Alteration: ${petAlterationType}`,
                          price: 249,
                          image: './Pets.png',
                          itemType: 'alteration'
                        });
                      }
                    }}
                  >
                    Proceed to Checkout (₹249)
                  </button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setPetAlterationSubmitted(true); }}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                      1. Pet Outfit Type
                    </label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        'Festive Sherwani / Tuxedo',
                        'Monsoon Raincoat',
                        'Winter Sweater / Fleece Vest',
                        'Walking Harness / Collar'
                      ].map(ot => (
                        <button
                          key={ot}
                          type="button"
                          onClick={() => setPetAlterationType(ot)}
                          className="btn"
                          style={{
                            padding: '9px 14px',
                            fontSize: '0.8rem',
                            borderRadius: '10px',
                            border: petAlterationType === ot ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                            background: petAlterationType === ot ? 'var(--primary)' : 'var(--bg-card)',
                            color: petAlterationType === ot ? '#fff' : 'var(--text-primary)',
                            fontWeight: petAlterationType === ot ? 700 : 500
                          }}
                        >
                          {ot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                      2. Adjustment / Repair Needed
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                      {[
                        'Resize Chest / Neck for Growing Pet',
                        'Replace Worn Velcro / Button Fastener',
                        'Shorten Back Length to Prevent Dirtying',
                        'Add Soft Anti-Chafing Neoprene Padding',
                        'Restitch Broken Leash Attachment Ring'
                      ].map(iss => (
                        <div
                          key={iss}
                          onClick={() => setPetAlterationIssue(iss)}
                          style={{
                            padding: '12px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            border: petAlterationIssue === iss ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                            background: petAlterationIssue === iss ? 'rgba(247,37,133,0.1)' : 'var(--bg-card)',
                            color: petAlterationIssue === iss ? 'var(--primary)' : 'var(--text-primary)',
                            fontSize: '0.82rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: petAlterationIssue === iss ? '5px solid var(--primary)' : '1.5px solid var(--border-color)', flexShrink: 0 }} />
                          <span>{iss}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '18px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Starting Alteration Rate</span>
                      <strong style={{ fontSize: '1.25rem', color: 'var(--primary)', display: 'block' }}>₹249</strong>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontWeight: 700 }}>
                      Book Pet Alteration Service <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </>
      )}

      {/* ============================================================== */}
      {/* BUYING & PET COUTURE MODE CONTENT                              */}
      {/* ============================================================== */}
      {serviceMode === 'buying' && (
        <>
          {/* 2. PET CUSTOMIZER STUDIO */}
          <section id="pet-customizer-section" style={{ margin: '4.5rem 0' }}>
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
              <Heart size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Interactive Pet Tailoring
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Configure a Tailored Fit for Your Pet
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Choose your pet type, select their breed silhouette, and customize fabrics with zero choking hazards.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }} className="specialist-grid-responsive">
            {/* Input Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Pet Type */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  1. Pet Type
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Dog', 'Cat', 'Small Pet'].map(sp => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => {
                        setPetSpecies(sp);
                        setPetBreed(sp === 'Cat' ? 'Persian Cat' : 'Golden Retriever');
                      }}
                      className="btn"
                      style={{
                        flex: 1,
                        padding: '9px',
                        fontSize: '0.8rem',
                        borderRadius: '8px',
                        border: petSpecies === sp ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: petSpecies === sp ? 'rgba(247,37,133,0.1)' : 'var(--bg-card)',
                        color: petSpecies === sp ? 'var(--primary)' : 'var(--text-primary)',
                        fontWeight: petSpecies === sp ? 700 : 500
                      }}
                    >
                      {sp === 'Dog' ? '🐕 Dog' : (sp === 'Cat' ? '🐈 Cat' : '🐇 Small Pet')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Breed Selector */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  2. Pet Breed
                </label>
                <select
                  value={petBreed}
                  onChange={e => setPetBreed(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                >
                  {(petSpecies === 'Cat' ? catBreeds : dogBreeds).map(br => (
                    <option key={br} value={br}>{br}</option>
                  ))}
                </select>
              </div>

              {/* Design Occasion */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  3. Outfit Occasion & Silhouette
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {[
                    'Royal Festive Sherwani', "Gentleman's Tuxedo",
                    'Thermal Polar Fleece Vest', 'Monsoon Waterproof Raincoat'
                  ].map(des => (
                    <button
                      key={des}
                      type="button"
                      onClick={() => setPetDesign(des)}
                      className="btn"
                      style={{
                        padding: '10px',
                        fontSize: '0.78rem',
                        borderRadius: '8px',
                        border: petDesign === des ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: petDesign === des ? 'rgba(247,37,133,0.12)' : 'var(--bg-card)',
                        color: petDesign === des ? 'var(--primary)' : 'var(--text-primary)',
                        textAlign: 'left'
                      }}
                    >
                      {des}
                    </button>
                  ))}
                </div>
              </div>

              {/* Measurements Selector */}
              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block' }}>
                    Pet Dimensions: {petMeasurements ? '✓ Custom Verified' : petSize}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Neck, Chest Girth & Back Length.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPetMeasurementModalOpen(true)}
                  className="btn btn-secondary specialty-secondary-btn"
                  style={{ fontSize: '0.78rem', padding: '8px 14px' }}
                >
                  {petMeasurements ? 'Edit Dimensions' : 'Enter Measurements'}
                </button>
              </div>
            </div>

            {/* Live Pet Preview Card */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
              <div style={{ height: '240px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="./Pets.png" alt="Pet preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                {petBreed} • {petDesign}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                Includes adjustable belly velcro and double-bonded leash opening.
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tailored Price:</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>₹899</strong>
              </div>

              <button
                onClick={handleCustomPetOutfitCheckout}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontWeight: 800 }}
              >
                Order Custom Pet Outfit (₹899)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED OUTFITS CATALOG */}
      <section id="pet-collection-section" style={{ margin: '4.5rem 0' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: 'var(--text-primary)' }}>
          Popular Pet Outfits & Gear
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {petProducts.map(p => (
            <div
              key={p.id}
              className="glass-card"
              style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              onClick={() => setSelectedProductForModal(p)}
            >
              <div style={{ height: '220px', overflow: 'hidden', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} />
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
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>View & Fit →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TACTILE MATERIAL SHOWCASE */}
      <MaterialShowcase
        materials={petMaterials}
        title="Skin-Safe Pet Fabric Anatomy"
        subtitle="Tested non-irritant against sensitive underbellies with breathable, wash-proof durability."
      />
        </>
      )}

      {/* ============================================================== */}
      {/* SPECIALIST PARTNER SELECTION MODE CONTENT                     */}
      {/* ============================================================== */}
      {serviceMode === 'partner' && (
        <SpecialistMapDiscovery
          specialtyCategory="pets"
          categoryTitle="Pet Outfits & Tailoring"
          tailors={tailors}
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          onSelectTailorForBooking={(tailor) => {
            if (onAddToCart) {
              onAddToCart({
                id: `booking-${tailor.id}-${Date.now()}`,
                name: `Pet Fitting Session with ${tailor.name}`,
                price: 199,
                image: tailor.image,
                itemType: 'alteration'
              });
            }
          }}
        />
      )}

      <AIMeasurementModal
        isOpen={petMeasurementModalOpen}
        onClose={() => setPetMeasurementModalOpen(false)}
        type="pet"
        onConfirmMeasurements={(data) => {
          setPetMeasurements(data);
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
