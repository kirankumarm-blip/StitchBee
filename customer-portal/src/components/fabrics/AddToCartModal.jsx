import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Check, ShieldCheck, Truck } from 'lucide-react';

export default function AddToCartModal({ fabric, isOpen, onClose, onAddToCart, isDark }) {
  const [metres, setMetres] = useState(2.5);
  const [selectedWidth, setSelectedWidth] = useState(fabric?.width || '44 Inch');
  const [added, setAdded] = useState(false);

  if (!isOpen || !fabric) return null;

  const pricePerMetre = fabric.price;
  const totalPrice = Math.round(pricePerMetre * metres);

  const handleConfirm = () => {
    onAddToCart({
      id: `${fabric.id}-${Date.now()}`,
      fabricId: fabric.id,
      name: `${fabric.name} (${metres}m)`,
      fabricName: fabric.name,
      price: totalPrice,
      unitPrice: pricePerMetre,
      quantity: metres,
      unit: 'metre',
      width: selectedWidth,
      image: fabric.image,
      category: 'fabric',
      fabricCategory: 'Cotton',
      seller: fabric.seller?.name || 'StitchBeez Verified Partner'
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const presetMetres = [1, 2, 2.5, 3, 4, 5];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(7, 20, 92, 0.65)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
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
        maxWidth: '460px',
        width: '100%',
        padding: '28px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
        position: 'relative',
        border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
        animation: 'fadeInUp 0.25s ease-out'
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
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isDark ? '#F8FAFC' : '#687395'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '22px' }}>
          <img 
            src={fabric.image} 
            alt={fabric.name} 
            style={{ width: '80px', height: '65px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #E8EAF2' }} 
          />
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#FF008A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Add to Shopping Bag
            </span>
            <h3 style={{ margin: '2px 0 4px', fontSize: '18px', fontWeight: '800' }}>{fabric.name}</h3>
            <span style={{ fontSize: '15px', fontWeight: '800', color: '#FF008A' }}>
              ₹{fabric.price} <span style={{ fontSize: '12px', fontWeight: '500', color: '#687395' }}>/ metre</span>
            </span>
          </div>
        </div>

        {/* Metres Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
            Select Length (in Metres):
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <button
              onClick={() => setMetres(m => Math.max(1, Math.round((m - 0.5) * 10) / 10))}
              style={{
                width: '42px', height: '42px', borderRadius: '12px',
                border: '1.5px solid #FF008A', background: 'transparent',
                color: '#FF008A', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              <Minus size={18} />
            </button>
            <div style={{
              flex: 1, height: '42px', borderRadius: '12px',
              border: isDark ? '1.5px solid #34394D' : '1.5px solid #E8EAF2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '800', fontSize: '18px', color: '#FF008A'
            }}>
              {metres} Metres
            </div>
            <button
              onClick={() => setMetres(m => Math.round((m + 0.5) * 10) / 10)}
              style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: '#FF008A', border: 'none',
                color: '#FFFFFF', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Quick presets */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {presetMetres.map(p => (
              <button
                key={p}
                onClick={() => setMetres(p)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: metres === p ? '1.5px solid #FF008A' : isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                  background: metres === p ? (isDark ? 'rgba(255, 0, 138, 0.15)' : '#FFF0F7') : 'transparent',
                  color: metres === p ? '#FF008A' : 'inherit',
                  cursor: 'pointer'
                }}
              >
                {p}m
              </button>
            ))}
          </div>
        </div>

        {/* Width Selector */}
        <div style={{ marginBottom: '22px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
            Fabric Width:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['44 Inch', '58 Inch', '60 Inch'].map(w => (
              <button
                key={w}
                onClick={() => setSelectedWidth(w)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  border: selectedWidth === w ? '2px solid #FF008A' : isDark ? '1px solid #34394D' : '1px solid #E8EAF2',
                  background: selectedWidth === w ? (isDark ? 'rgba(255, 0, 138, 0.15)' : '#FFF0F7') : 'transparent',
                  color: selectedWidth === w ? '#FF008A' : 'inherit',
                  cursor: 'pointer'
                }}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div style={{
          background: isDark ? '#101322' : '#F8FAFC',
          borderRadius: '14px',
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          border: isDark ? '1px solid #34394D' : '1px solid #E8EAF2'
        }}>
          <div>
            <span style={{ fontSize: '12px', color: '#687395', display: 'block' }}>Total Subtotal</span>
            <span style={{ fontSize: '11px', color: '#687395' }}>₹{pricePerMetre} × {metres}m</span>
          </div>
          <span style={{ fontSize: '22px', fontWeight: '900', color: '#FF008A' }}>
            ₹{totalPrice}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleConfirm}
          disabled={added}
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '12px',
            background: added ? '#10B981' : '#FF008A',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '15px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: added ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 8px 20px rgba(255, 0, 138, 0.3)'
          }}
        >
          {added ? (
            <>
              <Check size={18} /> Added to Cart!
            </>
          ) : (
            <>
              <ShoppingBag size={18} /> Confirm & Add to Bag
            </>
          )}
        </button>
      </div>
    </div>
  );
}
