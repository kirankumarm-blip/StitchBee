import React, { useState } from 'react';
import { 
  Sparkles, Gift, Heart, Star, ArrowRight, Check, 
  Send, Layers, Eye, ShoppingCart 
} from 'lucide-react';
import MaterialShowcase from './MaterialShowcase';
import SpecialistMapDiscovery from './SpecialistMapDiscovery';
import UniversalProductModal from './UniversalProductModal';

export default function HandmadeGiftsExperience({
  tailors = [],
  currentUser,
  onLoginRequired,
  onAddToCart,
  onDirectCheckout
}) {
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Live Personalization Studio
  const [recipientName, setRecipientName] = useState('Ananya & Rohan');
  const [threadColor, setThreadColor] = useState('Golden Zari');
  const [giftCardMessage, setGiftCardMessage] = useState('Wishing you a lifetime of love and joy on your new beginning!');
  const [giftWrapping, setGiftWrapping] = useState(true);
  const [selectedGiftType, setSelectedGiftType] = useState('Wedding Potlis & Keepsakes');

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
      name: 'Handcrafted Golden Zari Potli Bag',
      categoryLabel: 'RETURN GIFTS',
      price: 499,
      originalPrice: 799,
      rating: 5.0,
      reviewsCount: 124,
      image: './handmade_gifts.jpg',
      gallery: ['./handmade_gifts.jpg'],
      colors: ['Ivory Gold', 'Blush Pink', 'Emerald Green', 'Royal Navy'],
      sizes: ['Standard (8x6 in)'],
      description: 'Intricately embroidered with gold zari thread and lustrous pearl drawstrings. Ideal for weddings and pooja celebrations.'
    },
    {
      id: 'gp-quilt',
      name: 'Patchwork Keepsake Baby Quilt',
      categoryLabel: 'BABY GIFTS',
      price: 1499,
      originalPrice: 1999,
      rating: 4.9,
      reviewsCount: 48,
      image: './handmade_gifts.jpg',
      gallery: ['./handmade_gifts.jpg'],
      colors: ['Pastel Multi-Color', 'Soft Sky Blue', 'Blush Peach'],
      sizes: ['Crib Size (40x30 in)'],
      description: '100% organic cotton patchwork throw quilt featuring custom hand-embroidered baby name and birth milestones.'
    },
    {
      id: 'gp-apron',
      name: 'Bespoke Monogrammed Chef Apron',
      categoryLabel: 'CUSTOM KEEPSAKES',
      price: 699,
      originalPrice: 999,
      rating: 4.8,
      reviewsCount: 62,
      image: './handmade_gifts.jpg',
      gallery: ['./handmade_gifts.jpg'],
      colors: ['Oatmeal Linen', 'Charcoal Denim', 'Sage Green'],
      sizes: ['Adjustable Fit'],
      description: 'Heavy 14oz canvas kitchen apron with cross-back leather straps and prominent chest monogram.'
    },
    {
      id: 'gp-cushion',
      name: 'Embroidered Couple Velvet Cushion Pair',
      categoryLabel: 'HOME DECOR',
      price: 999,
      originalPrice: 1499,
      rating: 4.9,
      reviewsCount: 75,
      image: './handmade_gifts.jpg',
      gallery: ['./handmade_gifts.jpg'],
      colors: ['Deep Wine & Gold', 'Dusty Rose & Silver', 'Teal & Gold'],
      sizes: ['16x16 in (Set of 2)'],
      description: 'Custom anniversary cushions featuring intertwined initials and wedding date embroidered with metallic thread.'
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
            <a href="#personalizer-section" className="btn btn-primary" style={{ padding: '12px 22px', fontSize: '0.9rem', fontWeight: 700 }}>
              Live Gift Personalizer
            </a>
            <a href="#gift-collections-section" className="btn btn-secondary specialty-secondary-btn" style={{ padding: '12px 20px', fontSize: '0.9rem' }}>
              Explore Gift Collections
            </a>
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

      {/* 2. 10 GIFTING OCCASION CATEGORIES */}
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

      {/* 4. EDITORIAL CURATED GIFT COLLECTIONS */}
      <section id="gift-collections-section" style={{ margin: '4.5rem 0' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1.5rem 0', color: 'var(--text-primary)' }}>
          Artisan Handcrafted Gifting Collection
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {giftProducts.map(p => (
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
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>Personalize & Buy →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TACTILE MATERIAL SHOWCASE */}
      <MaterialShowcase
        materials={giftMaterials}
        title="Artisan Fabric & Zari Anatomy"
        subtitle="Organic handspun khadi, mulberry silk, and untarnishable metallic zardozi threads."
      />

      {/* 6. SPECIALIST DISCOVERY */}
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
