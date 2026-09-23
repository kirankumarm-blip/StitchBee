import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, ShieldCheck, Truck, Sparkles, Star, ChevronRight, 
  ShoppingCart, Package, ArrowRight, X, Trash2, CheckCircle2, 
  ExternalLink, Layers, Heart, Plus, Minus, Clock, Scissors, MapPin
} from 'lucide-react';

import BagsLeatherExperience from './BagsLeatherExperience';
import ShoesSlippersExperience from './ShoesSlippersExperience';
import VehicleSeatExperience from './VehicleSeatExperience';
import HandmadeGiftsExperience from './HandmadeGiftsExperience';
import PetOutfitsExperience from './PetOutfitsExperience';
import SofasExperience from './SofasExperience';
import CashfreeCheckoutModal from './CashfreeCheckoutModal';
import OrderTrackingModal from './OrderTrackingModal';

const SPECIALTY_TABS = [
  { id: 'bags', label: 'Bags & Leather', icon: '🎒', badge: 'Atelier' },
  { id: 'shoes', label: 'Shoes & Slippers', icon: '👞', badge: 'Cobbler' },
  { id: 'seats', label: 'Vehicle Seats', icon: '🏍️', badge: 'Upholstery' },
  { id: 'gifts', label: 'Handmade Gifts', icon: '🎁', badge: 'Artisanal' },
  { id: 'pets', label: 'Pet Outfits', icon: '🐾', badge: 'Couture' },
  { id: 'sofas', label: 'Sofas & Cushions', icon: '🛋️', badge: 'Restoration' }
];

const SERVICE_MODES = [
  { id: 'buying', label: 'Buying & Custom Made', icon: <ShoppingBag size={18} /> },
  { id: 'alteration', label: 'Repair & Alteration', icon: <Scissors size={18} /> },
  { id: 'partner', label: 'Select Partner', icon: <MapPin size={18} /> }
];

export default function SpecialtyCategoryView({
  categoryKey = 'bags',
  currentUser,
  onLoginRequired,
  tailors = [],
  onAddToCart: parentAddToCart,
  onBookStitching,
  onExploreDesigns,
  onViewFabrics
}) {
  const [activeCategory, setActiveCategory] = useState(categoryKey);
  const [serviceMode, setServiceMode] = useState('buying'); // 'buying' | 'alteration' | 'partner'
  const [cartItems, setCartItems] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingData, setTrackingData] = useState({
    orderId: 'STB-849201',
    serviceType: 'stitching',
    partnerName: 'StitchBee Master Atelier'
  });
  const [toastMessage, setToastMessage] = useState(null);

  // Sync internal state if categoryKey prop changes
  useEffect(() => {
    if (categoryKey && SPECIALTY_TABS.some(t => t.id === categoryKey)) {
      setActiveCategory(categoryKey);
    }
  }, [categoryKey]);

  const handleTabClick = (tabId) => {
    setActiveCategory(tabId);
    if (onSelectCategory) {
      onSelectCategory(tabId);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleAddToCart = (productOrConfig) => {
    const newItem = {
      id: 'cart-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      title: productOrConfig.title || productOrConfig.name || 'Custom Specialty Item',
      name: productOrConfig.title || productOrConfig.name || 'Custom Specialty Item',
      category: productOrConfig.category || activeCategory,
      price: Number(productOrConfig.price) || 2499,
      quantity: productOrConfig.quantity || 1,
      image: productOrConfig.image || productOrConfig.img || './bagf_fb1.jpg',
      specs: productOrConfig.specs || productOrConfig.desc || 'Custom Atelier Handcrafted Specification',
      requiresMeasurement: !!productOrConfig.requiresMeasurement
    };

    setCartItems(prev => [newItem, ...prev]);
    if (parentAddToCart) {
      parentAddToCart(newItem);
    }
    showToast(`Added to Atelier Cart: ${newItem.title}`);
  };

  const handleDirectCheckout = (productOrConfig) => {
    const item = {
      id: 'direct-' + Date.now(),
      title: productOrConfig.title || productOrConfig.name || 'Custom Specialty Order',
      name: productOrConfig.title || productOrConfig.name || 'Custom Specialty Order',
      category: productOrConfig.category || activeCategory,
      price: Number(productOrConfig.price) || 2499,
      quantity: 1,
      image: productOrConfig.image || productOrConfig.img || './bagf_fb1.jpg',
      specs: productOrConfig.specs || productOrConfig.desc || 'Direct Specialty Checkout',
      requiresMeasurement: !!productOrConfig.requiresMeasurement
    };
    setCheckoutItems([item]);
    setCheckoutModalOpen(true);
  };

  const handleProceedCartCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutItems([...cartItems]);
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const nextQ = (item.quantity || 1) + delta;
        return nextQ > 0 ? { ...item, quantity: nextQ } : item;
      }
      return item;
    }));
  };

  const handleOrderSuccess = (newOrderId) => {
    // If checkout was from cart, clear cart
    setCartItems([]);
    setTrackingData({
      orderId: newOrderId,
      serviceType: 'stitching',
      partnerName: 'StitchBee Master Craftsperson'
    });
    setCheckoutModalOpen(false);
    setTrackingModalOpen(true);
  };

  const cartSubtotal = cartItems.reduce((acc, it) => acc + (Number(it.price) || 0) * (it.quantity || 1), 0);
  const totalCartCount = cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0);

  return (
    <div className="specialty-category-wrapper" style={{ minHeight: '100vh' }}>
      
      {/* Floating Cart Button (shows when items in cart) */}
      {cartItems.length > 0 && (
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="floating-cart-badge animate-bounce-subtle"
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 900,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 20px',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, #f72585, #7209b7)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 8px 24px rgba(247, 37, 133, 0.45)',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '0.9rem'
          }}
        >
          <ShoppingCart size={18} />
          <span>Atelier Cart ({totalCartCount})</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>• ₹{cartSubtotal.toLocaleString()}</span>
        </button>
      )}

      {/* ============================================================== */}
      {/* 2. TOAST NOTIFICATION                                         */}
      {/* ============================================================== */}
      {toastMessage && (
        <div 
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #1f1235, #12121f)',
            border: '1px solid #f72585',
            borderRadius: '12px',
            padding: '14px 20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: '#fff'
          }}
        >
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(247,37,133,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f72585' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 'bold' }}>{toastMessage}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Item ready for Cashfree checkout</div>
          </div>
          <button
            onClick={() => { setToastMessage(null); setCartDrawerOpen(true); }}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#f72585',
              border: 'none',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginLeft: '8px'
            }}
          >
            View Cart
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2.5 SERVICE MODE SWITCHER (Buying vs Alteration vs Select Partner) */}
      {/* ============================================================== */}
      <div className="service-mode-tabs-container">
        {SERVICE_MODES.map(mode => (
          <button
            key={mode.id}
            type="button"
            className={`service-mode-pill ${serviceMode === mode.id ? 'active' : ''}`}
            onClick={() => setServiceMode(mode.id)}
          >
            {mode.icon}
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* 3. ACTIVE SPECIALTY CATEGORY EXPERIENCE VIEW                   */}
      {/* ============================================================== */}
      <main style={{ minHeight: 'calc(100vh - 65px)' }}>
        {activeCategory === 'bags' && (
          <BagsLeatherExperience
            tailors={tailors}
            currentUser={currentUser}
            onLoginRequired={onLoginRequired}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            serviceMode={serviceMode}
            onSelectServiceMode={setServiceMode}
            onOpenTracking={(orderId) => {
              setTrackingData({ orderId, serviceType: 'alteration', partnerName: 'Ravi Leather Crafts' });
              setTrackingModalOpen(true);
            }}
          />
        )}

        {activeCategory === 'shoes' && (
          <ShoesSlippersExperience
            tailors={tailors}
            currentUser={currentUser}
            onLoginRequired={onLoginRequired}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            serviceMode={serviceMode}
            onSelectServiceMode={setServiceMode}
          />
        )}

        {activeCategory === 'seats' && (
          <VehicleSeatExperience
            tailors={tailors}
            currentUser={currentUser}
            onLoginRequired={onLoginRequired}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            serviceMode={serviceMode}
            onSelectServiceMode={setServiceMode}
          />
        )}

        {activeCategory === 'gifts' && (
          <HandmadeGiftsExperience
            tailors={tailors}
            currentUser={currentUser}
            onLoginRequired={onLoginRequired}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            serviceMode={serviceMode}
            onSelectServiceMode={setServiceMode}
          />
        )}

        {activeCategory === 'pets' && (
          <PetOutfitsExperience
            tailors={tailors}
            currentUser={currentUser}
            onLoginRequired={onLoginRequired}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            serviceMode={serviceMode}
            onSelectServiceMode={setServiceMode}
          />
        )}

        {activeCategory === 'sofas' && (
          <SofasExperience
            tailors={tailors}
            currentUser={currentUser}
            onLoginRequired={onLoginRequired}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            serviceMode={serviceMode}
            onSelectServiceMode={setServiceMode}
          />
        )}
      </main>

      {/* ============================================================== */}
      {/* 4. CART SLIDE-IN DRAWER                                        */}
      {/* ============================================================== */}
      {cartDrawerOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setCartDrawerOpen(false)}
          style={{ zIndex: 1200, display: 'flex', justifyContent: 'flex-end', background: 'rgba(0,0,0,0.65)' }}
        >
          <div 
            className="animate-slide-left"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '460px',
              height: '100vh',
              background: '#12121f',
              borderLeft: '1px solid rgba(247,37,133,0.3)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.8)'
            }}
          >
            {/* Drawer Header */}
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(247,37,133,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f72585' }}>
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>Specialty Atelier Cart</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{cartItems.length} item(s) selected</span>
                </div>
              </div>
              <button 
                onClick={() => setCartDrawerOpen(false)}
                style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--text-muted)' }}>
                    <ShoppingBag size={28} />
                  </div>
                  <h4 style={{ color: '#fff', marginBottom: '6px' }}>Your Atelier Cart is Empty</h4>
                  <p style={{ fontSize: '0.84rem', lineHeight: '1.5' }}>
                    Configure bespoke shoes, request luxury leather repairs, or craft custom vehicle seat covers to add items.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '14px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = './bagf_fb1.jpg'; }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#fff', margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </h4>
                        <button 
                          onClick={() => handleRemoveFromCart(item.id)}
                          style={{ background: 'none', border: 'none', color: '#ff4d6d', cursor: 'pointer', padding: '2px' }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#f72585', fontWeight: '600', marginBottom: '4px' }}>
                        {item.category}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.specs}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#4cc9f0' }}>
                          ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '2px 6px' }}>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', minWidth: '16px', textAlign: 'center' }}>
                            {item.quantity || 1}
                          </span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span>Items Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span>Doorstep Courier / Pickup</span>
                  <span style={{ color: cartSubtotal > 2000 ? '#4ade80' : '#fff' }}>
                    {cartSubtotal > 2000 ? 'FREE' : '₹149'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.05rem', fontWeight: 'bold', color: '#fff', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                  <span>Total Payable</span>
                  <span style={{ color: '#f72585' }}>₹{(cartSubtotal + (cartSubtotal > 2000 ? 0 : 149)).toLocaleString()}</span>
                </div>

                <button
                  onClick={handleProceedCartCheckout}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #f72585, #7209b7)',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 20px rgba(247,37,133,0.4)'
                  }}
                >
                  <span>Proceed to Cashfree Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={14} style={{ color: '#4ade80' }} />
                  <span>100% Fit Guarantee & Secure Cashfree Encryption</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. CASHFREE CHECKOUT MODAL                                     */}
      {/* ============================================================== */}
      <CashfreeCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        items={checkoutItems}
        currentUser={currentUser}
        onOrderSuccess={handleOrderSuccess}
        onOpenTracking={(orderId) => {
          setCheckoutModalOpen(false);
          setTrackingData({
            orderId,
            serviceType: 'stitching',
            partnerName: 'StitchBee Master Craftsman'
          });
          setTrackingModalOpen(true);
        }}
      />

      {/* ============================================================== */}
      {/* 6. ORDER TRACKING MODAL                                        */}
      {/* ============================================================== */}
      <OrderTrackingModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        orderId={trackingData.orderId}
        serviceType={trackingData.serviceType}
        customerName={currentUser?.name || 'Rohan Sen'}
        partnerName={trackingData.partnerName}
      />

    </div>
  );
}
