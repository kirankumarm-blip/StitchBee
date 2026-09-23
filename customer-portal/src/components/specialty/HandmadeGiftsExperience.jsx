import React, { useState } from 'react';
import { 
  Sparkles, Gift, Heart, Star, ArrowRight, Check, 
  Send, Layers, Eye, ShoppingCart 
} from 'lucide-react';
import MaterialShowcase from './MaterialShowcase';
import SpecialistMapDiscovery from './SpecialistMapDiscovery';
import UniversalProductModal from './UniversalProductModal';
import FlipkartCatalogView from './FlipkartCatalogView';
import FlipkartProductDetailView from './FlipkartProductDetailView';

export default function HandmadeGiftsExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout,
  serviceMode = 'buying',
  onSelectServiceMode
}) {
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [selectedPdpProduct, setSelectedPdpProduct] = useState(null);

  // Live Personalization Studio
  const [recipientName, setRecipientName] = useState('Ananya & Rohan');
  const [threadColor, setThreadColor] = useState('Golden Zari');
  const [giftCardMessage, setGiftCardMessage] = useState('Wishing you a lifetime of love and joy on your new beginning!');
  const [giftWrapping, setGiftWrapping] = useState(true);
  const [selectedGiftType, setSelectedGiftType] = useState('Wedding Potlis & Keepsakes');

  // Keepsake Restoration / Alteration State
  const [restorationItemType, setRestorationItemType] = useState('Heirloom Saree / Zari Dupatta');
  const [restorationDamageType, setRestorationDamageType] = useState('Loose Zari & Metallic Thread Snags');
  const [restorationSubmitted, setRestorationSubmitted] = useState(false);

  const giftRestorationServices = [
    { title: 'Heirloom Saree & Zari Thread Restoration', price: '₹599', desc: 'Hand-weaving frayed gold/silver zari threads on vintage sarees and dupattas.', icon: '🪡' },
    { title: 'Vintage Quilt & Kantha Restitching', price: '₹499', desc: 'Reinforcing torn hand-embroidered patches and replacing unraveled running stitches.', icon: '🧵' },
    { title: 'Delicate Embroidered Cushion Restoration', price: '₹399', desc: 'Restoring beadwork, sequins, and metallic zardozi on keepsake cushions.', icon: '✨' },
    { title: 'Name & Milestone Monogram Re-Stitching', price: '₹299', desc: 'Precision hand-embroidery to add new baby dates or family initials.', icon: '✍️' },
    { title: 'Lace, Potli Drawstrings & Pearl Tassels', price: '₹249', desc: 'Replacement of broken latkans, pearls, and pure silk drawstring cords.', icon: '🎀' }
  ];

  const giftMaterials = [
    {
      id: 'mat-rawsilk',
      name: 'Pure Banarasi Raw Silk',
      type: '100% Handloom Mulberry',
      badge: 'FESTIVE WEDDING',
      image: './fab1.jpg',
      priceTier: 'Included (Base)',
      durability: '4.8 / 5',
      waterResistance: 'Dry Clean Recommended',
      bestFor: 'Potlis, Envelopes & Keepsake Boxes',
      description: 'Lustrous slub raw silk spun on traditional Varanasi pit looms. Magnificent sheen for wedding gifting.'
    },
    {
      id: 'mat-khadi',
      name: 'Organic Handspun Khadi Cotton',
      type: '100% Breathable Eco-Fiber',
      badge: 'SUSTAINABLE CRAFT',
      image: './fab2.jpg',
      priceTier: 'Included (Base)',
      durability: '5 / 5',
      waterResistance: 'Machine Washable',
      bestFor: 'Aprons, Baby Quilts & Tote Sets',
      description: 'Soft, chemical-free organic cotton woven by rural women collectives. Gentle against newborn baby skin.'
    },
    {
      id: 'mat-velvetcraft',
      name: 'Royal Micro-Velvet',
      type: 'Plush High-Density Pile',
      badge: 'LUXURY EMBROIDERY',
      image: './fab4.jpg',
      priceTier: '+₹200 Upgrade',
      durability: '4.9 / 5',
      waterResistance: 'Stain Repellent',
      bestFor: 'Anniversary Cushion Sets & Trays',
      description: 'Ultra-dense smooth velvet pile that allows gold metallic thread embroidery to stand out in relief.'
    }
  ];

  const giftProducts = [
    {
      id: 'gp-potli',
      name: 'Handcrafted Golden Zari Potli Bag with Pearl Latkans',
      categoryLabel: 'Wedding & Return Gifts',
      subcategory: 'Wedding & Return Gifts',
      brand: 'Artisan Zardozi',
      price: 499,
      originalPrice: 799,
      rating: 5.0,
      reviewsCount: 124,
      isAssured: true,
      image: './handmade_gifts.jpg',
      gallery: ['./handmade_gifts.jpg', './br_bridal3.jpg', './wf_fab1.jpg'],
      colors: ['Ivory Gold', 'Blush Pink', 'Emerald Green', 'Royal Navy'],
      sizes: ['Standard (8x6 in)'],
      description: 'Intricately embroidered with genuine gold zari thread and lustrous pearl drawstrings. Ideal for weddings and return celebrations.'
    },
    {
      id: 'gp-quilt',
      name: 'Patchwork Keepsake Baby Quilt with Custom Hand Embroidery',
      categoryLabel: 'Baby Keepsakes',
      subcategory: 'Baby Keepsakes',
      brand: 'StitchBee Atelier',
      price: 1499,
      originalPrice: 1999,
      rating: 4.9,
      reviewsCount: 48,
      isAssured: true,
      image: './k_k4.jpg',
      gallery: ['./k_k4.jpg', './handmade_gifts.jpg', './kf_fab2.jpg'],
      colors: ['Pastel Multi-Color', 'Soft Sky Blue', 'Blush Peach'],
      sizes: ['Crib Size (40x30 in)'],
      description: '100% organic cotton patchwork throw quilt featuring custom hand-embroidered baby name and birth milestones.'
    },
    {
      id: 'gp-apron',
      name: 'Bespoke Monogrammed Heavy Canvas Chef Apron',
      categoryLabel: 'Custom Keepsakes',
      subcategory: 'Custom Keepsakes',
      brand: 'CraftKnot',
      price: 699,
      originalPrice: 999,
      rating: 4.8,
      reviewsCount: 62,
      isAssured: true,
      image: './uni_uni3.jpg',
      gallery: ['./uni_uni3.jpg', './handmade_gifts.jpg', './unif_fab3.jpg'],
      colors: ['Oatmeal Linen', 'Charcoal Denim', 'Sage Green'],
      sizes: ['Adjustable Fit'],
      description: 'Heavy 14oz canvas kitchen apron with cross-back leather straps and prominent hand-embroidered chest monogram.'
    },
    {
      id: 'gp-cushion',
      name: 'Embroidered Couple Velvet Cushion Pair with Wedding Date',
      categoryLabel: 'Home Keepsakes',
      subcategory: 'Home Keepsakes',
      brand: 'StitchBee Atelier',
      price: 999,
      originalPrice: 1499,
      rating: 4.9,
      reviewsCount: 75,
      isAssured: true,
      image: './fab4.jpg',
      gallery: ['./fab4.jpg', './handmade_gifts.jpg'],
      colors: ['Deep Wine & Gold', 'Dusty Rose & Silver', 'Teal & Gold'],
      sizes: ['16x16 in (Set of 2)'],
      description: 'Custom anniversary cushions featuring intertwined initials and wedding date embroidered with metallic thread.'
    },
    {
      id: 'gp-terracotta',
      name: 'Handcrafted Festive Dry Fruit & Shagun Potli Hamper',
      categoryLabel: 'Festive Hampers',
      subcategory: 'Festive Hampers',
      brand: 'Mitti Kala',
      price: 599,
      originalPrice: 899,
      rating: 4.7,
      reviewsCount: 92,
      isAssured: true,
      image: './br_bridal4.jpg',
      gallery: ['./br_bridal4.jpg', './handmade_gifts.jpg'],
      colors: ['Festive Gold', 'Royal Indigo', 'Marigold Yellow'],
      sizes: ['Gift Boxed (Set of 4)'],
      description: 'Handmade raw silk embellished shagun pouch set in an eco-friendly gift box with custom calligraphy message card.'
    },
    {
      id: 'gp-brass',
      name: 'Antique Engraved Keepsake & Jewelry Gift Box',
      categoryLabel: 'Custom Keepsakes',
      subcategory: 'Custom Keepsakes',
      brand: 'Moradabad Heritage',
      price: 1299,
      originalPrice: 1899,
      rating: 4.9,
      reviewsCount: 56,
      isAssured: true,
      image: './bagf_fb1.jpg',
      gallery: ['./bagf_fb1.jpg', './handmade_gifts.jpg'],
      colors: ['Antique Brass Gold', 'Oxidized Silver'],
      sizes: ['Medium (6x4x3 in)'],
      description: 'Solid brass trinket box lined with velvet and personalized with hand-etched initials on the hinged lid.'
    },
    {
      id: 'gp-passport',
      name: 'Handcrafted Pure Leather Couple Passport Wallet Duo',
      categoryLabel: 'Custom Keepsakes',
      subcategory: 'Custom Keepsakes',
      brand: 'StitchBee Atelier',
      price: 849,
      originalPrice: 1399,
      rating: 4.8,
      reviewsCount: 114,
      isAssured: true,
      image: './bag_b2.jpg',
      gallery: ['./bag_b2.jpg', './handmade_gifts.jpg'],
      colors: ['Tan & Blush', 'Black & Burgundy', 'Olive & Chestnut'],
      sizes: ['Standard Travel Fit'],
      description: 'Full-grain leather passport cases featuring foil-stamped names and wedding wanderlust emblems.'
    },
    {
      id: 'gp-thali',
      name: 'Hand-Etched Silver-Plated Festive Pooja Thali Set',
      categoryLabel: 'Wedding & Return Gifts',
      subcategory: 'Wedding & Return Gifts',
      brand: 'Heritage Silversmith',
      price: 1199,
      originalPrice: 1799,
      rating: 4.8,
      reviewsCount: 83,
      isAssured: true,
      image: './br_bridal7.jpg',
      gallery: ['./br_bridal7.jpg', './handmade_gifts.jpg'],
      colors: ['Pure Silver Finish', 'Antique Gold Accent'],
      sizes: ['9.5 inch Diameter'],
      description: 'Traditional etched pooja thali with matching diya, chandan wati, and agarbatti stand in royal red velvet presentation casing.'
    }
  ];

  const handleCustomGiftCheckout = () => {
    const item = {
      id: `gift-custom-${Date.now()}`,
      name: `Personalized ${selectedGiftType}`,
      price: 999,
      image: './handmade_gifts.jpg',
      selectedColor: threadColor,
      details: `Embroidered Name: "${recipientName}" • Card Message: "${giftCardMessage.substring(0, 30)}..." • Eco Gift Wrap`,
      monogramText: recipientName,
      giftWrapping: giftWrapping,
      giftMessage: giftCardMessage,
      quantity: 1,
      itemType: 'product'
    };
    if (onDirectCheckout) onDirectCheckout(item);
    else if (onAddToCart) onAddToCart(item);
  };

  return (
    <div className="gifts-experience animate-fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* 1. HERO */}
      {serviceMode !== 'buying' && (
      <section className="specialty-hero specialty-hero-responsive">
        <div
          className="specialty-hero-bg"
          style={{
            backgroundImage: 'url("./handmade_gifts.jpg")',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(247,37,133,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(247,37,133,0.12)', border: '1px solid rgba(247,37,133,0.3)', marginBottom: '18px' }}>
            <Sparkles size={15} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              StitchBee Artisan Gifts & Embroidery
            </span>
          </div>

          <h1 style={{ fontSize: '3.2rem', fontWeight: 900, lineHeight: '1.08', margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>
            Made by Hand.<br />
            <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Chosen by Heart.
            </span>
          </h1>

          <p className="specialty-hero-subtext" style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '28px' }}>
            Personalized hand-stitched keepsakes, golden zari wedding potlis, monogrammed kitchen linens, and festive fabric gift sets crafted with genuine emotional connection.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('buying')}
              className={`btn ${serviceMode === 'buying' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 20px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              🛍️ Gift Studio & Catalog
            </button>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('alteration')}
              className={`btn ${serviceMode === 'alteration' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 22px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              ✂️ Keepsake Restoration & Mending
            </button>
            <button
              type="button"
              onClick={() => onSelectServiceMode && onSelectServiceMode('partner')}
              className={`btn ${serviceMode === 'partner' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '12px 20px', fontSize: '0.9rem', fontWeight: 700 }}
            >
              📍 Find Embroidery Artisans
            </button>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart size={18} style={{ color: 'var(--primary)', fill: 'var(--primary)' }} /> 100%
              </strong>
              <span className="metric-label" style={{ fontSize: '0.72rem' }}>Handmade by Rural Artisans</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'var(--border-color)' }} />
            <div>
              <strong className="metric-value" style={{ fontSize: '1.25rem', color: '#10b981' }}>48 Hours</strong>
              <span className="metric-label" style={{ fontSize: '0.72rem', display: 'block' }}>Express Dispatch</span>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ============================================================== */}
      {/* ALTERATION & KEEPSAKE RESTORATION MODE CONTENT                 */}
      {/* ============================================================== */}
      {serviceMode === 'alteration' && (
        <>
          {/* Keepsake Restoration Catalog */}
          <section style={{ margin: '4rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Heritage Fabric & Zari Restoration
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0 8px 0', color: 'var(--text-primary)' }}>
                Keepsake Repair & Delicate Embroidery Care
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '620px', margin: '0 auto' }}>
                Trust delicate family heirlooms, wedding sarees, and handmade quilts to master embroidery specialists who treat memories with reverence.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {giftRestorationServices.map((ser, i) => (
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

          {/* Guided Keepsake Restoration Booking Wizard */}
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
                  Request Keepsake Restoration Consultation
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                  Provide details about your keepsake piece. Our certified embroidery master will inspect and provide an exact repair estimate.
                </p>
              </div>

              {restorationSubmitted ? (
                <div style={{ textAlign: 'center', padding: '36px 20px', background: 'rgba(16,185,129,0.06)', borderRadius: '16px', border: '1px solid #10b981' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
                    <Check size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    Restoration Request Received!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                    Artisan consultation scheduled for {restorationItemType}: {restorationDamageType}.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (onDirectCheckout) {
                        onDirectCheckout({
                          id: `restore-gift-${Date.now()}`,
                          name: `Keepsake Restoration: ${restorationItemType}`,
                          price: 499,
                          image: './handmade_gifts.jpg',
                          itemType: 'alteration'
                        });
                      }
                    }}
                  >
                    Proceed to Checkout (₹499)
                  </button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setRestorationSubmitted(true); }}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                      1. Keepsake Item Type
                    </label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        'Heirloom Saree / Zari Dupatta',
                        'Vintage Quilt / Kantha Throw',
                        'Wedding Potli / Bridal Keepsake',
                        'Embroidered Cushion / Tapestry'
                      ].map(it => (
                        <button
                          key={it}
                          type="button"
                          onClick={() => setRestorationItemType(it)}
                          className="btn"
                          style={{
                            padding: '9px 14px',
                            fontSize: '0.8rem',
                            borderRadius: '10px',
                            border: restorationItemType === it ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                            background: restorationItemType === it ? 'var(--primary)' : 'var(--bg-card)',
                            color: restorationItemType === it ? '#fff' : 'var(--text-primary)',
                            fontWeight: restorationItemType === it ? 700 : 500
                          }}
                        >
                          {it}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                      2. Restoration / Repair Needed
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                      {[
                        'Loose Zari & Metallic Thread Snags',
                        'Torn Fabric / Frayed Edge Re-weaving',
                        'Beadwork, Sequin & Pearl Re-stringing',
                        'Add Personalized Name or Date Monogram',
                        'Gentle Organic Stain Neutralization'
                      ].map(iss => (
                        <div
                          key={iss}
                          onClick={() => setRestorationDamageType(iss)}
                          style={{
                            padding: '12px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            border: restorationDamageType === iss ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                            background: restorationDamageType === iss ? 'rgba(247,37,133,0.1)' : 'var(--bg-card)',
                            color: restorationDamageType === iss ? 'var(--primary)' : 'var(--text-primary)',
                            fontSize: '0.82rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: restorationDamageType === iss ? '5px solid var(--primary)' : '1.5px solid var(--border-color)', flexShrink: 0 }} />
                          <span>{iss}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '18px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Evaluation & Restitch Starting Rate</span>
                      <strong style={{ fontSize: '1.25rem', color: 'var(--primary)', display: 'block' }}>₹499</strong>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontWeight: 700 }}>
                      Book Artisan Evaluation <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px' }} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </>
      )}

      {/* ============================================================== */}
      {/* BUYING & GIFT PERSONALIZATION MODE CONTENT                     */}
      {/* ============================================================== */}
      {serviceMode === 'buying' && (
        <>
          {selectedPdpProduct ? (
            <div id="pdp-scroll-anchor" style={{ margin: '1.5rem 0 3rem 0' }}>
              <FlipkartProductDetailView
                product={selectedPdpProduct}
                categoryTitle="Handmade Gifts & Keepsakes"
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
              <section id="flipkart-gift-catalog-section" style={{ margin: '2rem 0 4rem 0' }}>
                <FlipkartCatalogView
                  categoryKey="gifts"
                  categoryTitle="Artisan Handcrafted Gifts & Keepsakes"
                  breadcrumbs={['Home', 'Gifts & Crafts', 'Handmade & Personalized Gifts']}
                  products={giftProducts}
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

              {/* 2. 10 GIFTING OCCASION CATEGORIES (Hidden in Buying mode) */}
              {false && (
              <>
              <section style={{ margin: '3.5rem 0' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', textAlign: 'center' }}>
          Gifts for Every Meaningful Celebration
        </h3>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            'Personalized Gifts', 'Handmade Toys', 'Crochet Keepsakes', 'Wedding Potlis',
            'Birthday Gifts', 'Baby Shower Quilts', 'Corporate Gift Sets', 'Festive Hampers'
          ].map(cat => (
            <span
              key={cat}
              style={{
                fontSize: '0.78rem',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)'
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* 3. LIVE GIFT PERSONALIZER STUDIO */}
      <section id="personalizer-section" style={{ margin: '4.5rem 0' }}>
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
              <Gift size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Bespoke Personalization Studio
              </span>
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Personalize Your Gift in Real Time
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Add custom embroidered names, choose your thread luster, and include a heartfelt card message.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }} className="specialist-grid-responsive">
            {/* Input Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  1. Recipient Name(s) for Hand Embroidery
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={e => setRecipientName(e.target.value)}
                  placeholder="e.g. Ananya & Rohan"
                  maxLength={30}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  2. Embroidery Metallic Thread
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Golden Zari', 'Silver Foil', 'Rose Pink', 'Royal Navy'].map(th => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setThreadColor(th)}
                      className="btn"
                      style={{
                        flex: 1,
                        padding: '8px',
                        fontSize: '0.75rem',
                        borderRadius: '8px',
                        border: threadColor === th ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: threadColor === th ? 'rgba(247,37,133,0.1)' : 'var(--bg-card)',
                        color: threadColor === th ? 'var(--primary)' : 'var(--text-primary)'
                      }}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  3. Handwritten Card Message
                </label>
                <textarea
                  rows={3}
                  value={giftCardMessage}
                  onChange={e => setGiftCardMessage(e.target.value)}
                  placeholder="Write your personal greetings here..."
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <input
                  type="checkbox"
                  id="giftWrapStudio"
                  checked={giftWrapping}
                  onChange={e => setGiftWrapping(e.target.checked)}
                  style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <label htmlFor="giftWrapStudio" style={{ fontSize: '0.82rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  Include Artisan Eco Festive Box with Satin Ribbon (+₹99)
                </label>
              </div>
            </div>

            {/* Live Gift Preview Card */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
              <div style={{ height: '200px', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
                <img src="./handmade_gifts.jpg" alt="Gift item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* Live Floating Monogram Badge */}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px dashed var(--primary)' }}>
                  <span style={{ fontSize: '0.65rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                    Embroidered Thread Preview ({threadColor})
                  </span>
                  <strong style={{ fontSize: '1.05rem', color: '#fbbf24', letterSpacing: '0.06em', fontFamily: 'serif' }}>
                    {recipientName || 'Your Custom Monogram'}
                  </strong>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '16px', borderLeft: '2px solid var(--primary)', paddingLeft: '10px' }}>
                "{giftCardMessage || 'No message added'}"
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gift Package Total:</span>
                <strong style={{ fontSize: '1.35rem', color: 'var(--primary)' }}>₹999</strong>
              </div>

              <button
                onClick={handleCustomGiftCheckout}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontWeight: 800 }}
              >
                Order Personalized Gift (₹999)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TACTILE MATERIAL SHOWCASE */}
      <MaterialShowcase
        materials={giftMaterials}
        title="Artisan Fabric & Zari Anatomy"
        subtitle="Organic handspun khadi, mulberry silk, and untarnishable metallic zardozi threads."
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
          specialtyCategory="gifts"
          categoryTitle="Handmade Gifts & Embroidery"
          tailors={tailors}
          currentUser={currentUser}
          onLoginRequired={onLoginRequired}
          onSelectTailorForBooking={(tailor) => {
            if (onAddToCart) {
              onAddToCart({
                id: `booking-${tailor.id}-${Date.now()}`,
                name: `Artisan Embroidery Consultation with ${tailor.name}`,
                price: 199,
                image: tailor.image,
                itemType: 'alteration'
              });
            }
          }}
        />
      )}

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
