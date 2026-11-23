import React, { useState } from 'react';
import { 
  X, Star, Heart, ShoppingBag, Scissors, ShieldCheck, Truck, 
  RotateCcw, Sparkles, Check, CheckCircle2, MapPin 
} from 'lucide-react';

export default function FabricDetailsModal({ 
  fabric, 
  isOpen, 
  onClose, 
  onAddToCartClick, 
  onShopAndStitchClick, 
  isWishlisted, 
  onToggleWishlist, 
  isDark 
}) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [pincode, setPincode] = useState('560102');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  if (!isOpen || !fabric) return null;

  const gallery = fabric.gallery || [fabric.image];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(7, 20, 92, 0.72)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: isDark ? '#1C2033' : '#FFFFFF',
        color: isDark ? '#F8FAFC' : '#07145C',
        borderRadius: '24px',
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        position: 'relative',
        border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isDark ? '#F8FAFC' : '#687395',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '32px' }} className="fabric-details-grid">
          {/* Left: Gallery */}
          <div>
            <div style={{
              width: '100%',
              aspectRatio: '1.25 / 1',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '12px',
              border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
              position: 'relative'
            }}>
              <img
                src={gallery[selectedImg] || fabric.image}
                alt={fabric.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {fabric.badge && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: fabric.badgeType === 'new' ? '#3B82F6' : '#FF008A',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '800'
                }}>
                  {fabric.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    style={{
                      width: '60px',
                      height: '50px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImg === i ? '2px solid #FF008A' : isDark ? '1px solid #34394D' : '1px solid #E8EAF2'
                    }}
                  >
                    <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Seller Card */}
            <div style={{
              marginTop: '20px',
              padding: '14px',
              borderRadius: '14px',
              background: isDark ? '#101322' : '#F8FAFC',
              border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
              fontSize: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '800', fontSize: '13px' }}>{fabric.seller?.name || 'Jaipur Craft Guild'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#10B981', fontWeight: '700' }}>
                  <ShieldCheck size={14} /> Verified Seller
                </span>
              </div>
              <div style={{ color: '#687395' }}>
                📍 {fabric.seller?.location || 'Rajasthan, India'} • ⭐ {fabric.seller?.rating || '4.9'} Ratings
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#FF008A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {fabric.brand || 'StitchBeez Marketplace'}
              </span>
              <button
                onClick={() => onToggleWishlist(fabric)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Heart size={20} fill={isWishlisted ? '#FF008A' : 'none'} color={isWishlisted ? '#FF008A' : '#687395'} />
              </button>
            </div>

            <h2 style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: '900' }}>{fabric.name}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{ fontSize: '26px', fontWeight: '900', color: '#FF008A' }}>
                ₹{fabric.price}
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#687395', marginLeft: '4px' }}>/ metre</span>
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', background: 'rgba(251,191,36,0.15)', color: '#D97706', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>
                <Star size={14} fill="#D97706" /> {fabric.rating} ({fabric.reviews} reviews)
              </div>
            </div>

            <p style={{ fontSize: '13px', color: isDark ? '#CBD5E1' : '#475569', lineHeight: '1.5', margin: '0 0 18px' }}>
              {fabric.description}
            </p>

            {/* Specifications Matrix */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px',
              padding: '14px', borderRadius: '14px', background: isDark ? '#101322' : '#F8FAFC',
              marginBottom: '18px', fontSize: '12px', border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2'
            }}>
              <div><strong style={{ color: '#687395' }}>Composition:</strong> {fabric.composition}</div>
              <div><strong style={{ color: '#687395' }}>Fabric Width:</strong> {fabric.width}</div>
              <div><strong style={{ color: '#687395' }}>Weight:</strong> {fabric.gsm || '95 GSM'}</div>
              <div><strong style={{ color: '#687395' }}>Pattern:</strong> {fabric.pattern}</div>
              <div><strong style={{ color: '#687395' }}>Stretch:</strong> {fabric.stretch || 'Non-Stretch'}</div>
              <div><strong style={{ color: '#687395' }}>Feel:</strong> Soft & Breathable</div>
            </div>

            {/* Usages Recommended */}
            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#687395', display: 'block', marginBottom: '6px' }}>
                Recommended Stitching Outfits:
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {fabric.usage.map(u => (
                  <span
                    key={u}
                    style={{
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '700',
                      background: isDark ? 'rgba(255,0,138,0.12)' : '#FFF0F7',
                      color: '#FF008A',
                      border: '1px solid rgba(255,0,138,0.2)'
                    }}
                  >
                    {u}
                  </span>
                ))}
              </div>
            </div>

            {/* Delivery check */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
              <MapPin size={16} color="#FF008A" />
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                style={{
                  width: '120px', height: '32px', borderRadius: '8px',
                  border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                  padding: '0 8px', fontSize: '12px', background: 'transparent', color: 'inherit'
                }}
              />
              <button
                onClick={() => setPincodeChecked(true)}
                style={{ padding: '6px 12px', borderRadius: '8px', background: '#07145C', color: '#fff', border: 'none', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
              >
                Check
              </button>
              {pincodeChecked && (
                <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700' }}>
                  ✓ Delivery available in 2-4 days
                </span>
              )}
            </div>

            {/* CTAs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                onClick={() => { onClose(); onAddToCartClick(fabric); }}
                style={{
                  height: '46px',
                  borderRadius: '12px',
                  background: isDark ? 'transparent' : '#FFFFFF',
                  color: '#FF008A',
                  border: '1.5px solid #FF008A',
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <button
                onClick={() => { onClose(); onShopAndStitchClick(fabric); }}
                style={{
                  height: '46px',
                  borderRadius: '12px',
                  background: '#FF008A',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(255,0,138,0.3)'
                }}
              >
                <Scissors size={18} /> Shop & Stitch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
