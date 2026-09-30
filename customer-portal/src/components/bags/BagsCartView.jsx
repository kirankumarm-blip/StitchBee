import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, Heart, Plus, Minus, ShoppingBag, ShieldCheck, Truck, 
  ChevronRight, ArrowLeft, ArrowRight, Check, Tag, CreditCard, 
  Sparkles, CheckCircle2 
} from 'lucide-react';
import { 
  getCart, 
  updateCartQty, 
  removeFromCart, 
  toggleWishlist, 
  saveCart, 
  addOrder 
} from '../../utils/bagsStore';

export default function BagsCartView({ showToast, currentUser, onOpenAuthModal }) {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(getCart());
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Cart list, 1: Address, 2: Delivery, 3: Payment, 4: Confirmation
  
  // Checkout Form State
  const [addressName, setAddressName] = useState(currentUser?.name || 'Aarav Sharma');
  const [addressPhone, setAddressPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [addressPincode, setAddressPincode] = useState('560078');
  const [addressLine, setAddressLine] = useState('Flat 402, Oakwood Residences, Bannerghatta Main Road');
  const [addressCity, setAddressCity] = useState('Bengaluru');
  const [addressState, setAddressState] = useState('Karnataka');

  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' (Free) | 'express' (₹199)
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleQtyChange = (productId, color, delta) => {
    const updated = updateCartQty(productId, color, delta);
    setCartItems(updated);
  };

  const handleRemove = (productId, color) => {
    const updated = removeFromCart(productId, color);
    setCartItems(updated);
    showToast('Item removed from cart');
  };

  const handleMoveToWishlist = (item) => {
    toggleWishlist(item.id);
    const updated = removeFromCart(item.id, item.color);
    setCartItems(updated);
    showToast(`Moved "${item.name}" to your wishlist ❤️`);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'STITCH10') {
      setAppliedDiscount(10);
      setCouponMessage('STITCH10 applied! 10% artisan discount granted ✨');
      showToast('10% discount applied! 🎉');
    } else {
      setCouponMessage('Invalid promo code. Try "STITCH10" for 10% off.');
      showToast('Invalid promo code');
    }
  };

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discountAmount = appliedDiscount > 0 ? Math.round((subtotal * appliedDiscount) / 100) : 0;
  const shippingCost = shippingMethod === 'express' ? 199 : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCost);

  const handlePlaceOrder = () => {
    const newOrder = addOrder({
      type: 'ready',
      status: 'Order Placed',
      statusCode: 'placed',
      statusIndex: 0,
      total: totalAmount,
      items: cartItems,
      address: `${addressName}, ${addressLine}, ${addressCity}, ${addressState} - ${addressPincode} (Ph: ${addressPhone})`,
      deliveryMethod: shippingMethod === 'express' ? 'Express Courier (1-2 Days)' : 'Standard Free (3-5 Days)',
      paymentMethod: paymentMethod.toUpperCase(),
      paymentStatus: 'Pending Gateway Integration (Demo Placed)'
    });

    // Clear cart
    saveCart([]);
    setCartItems([]);
    setConfirmedOrder(newOrder);
    setCheckoutStep(4);
    showToast('Order placed successfully! Tracking initiated 🚀');
  };

  return (
    <div className="bl-cart-page">
      <div className="bl-container" style={{ padding: '24px 12px 60px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
          <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/bags')} className="bl-crumb-link">Bags & Leather</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">
            {checkoutStep === 0 ? 'Shopping Bag' : 'Checkout'}
          </span>
        </nav>

        {/* Back Link */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            className="bl-back-btn" 
            onClick={() => checkoutStep > 0 ? setCheckoutStep(s => s - 1) : navigate('/bags/shop')}
          >
            <ArrowLeft size={16} /> {checkoutStep > 0 ? 'Back to Previous Step' : 'Continue Shopping'}
          </button>
        </div>

        {/* Page Title */}
        <div style={{ marginBottom: '28px' }}>
          <span className="bl-tag-label">CHECKOUT & BAG</span>
          <h1 className="bl-serif-title" style={{ fontSize: '2.4rem', margin: '4px 0 6px' }}>
            {checkoutStep === 0 ? 'Your Shopping Bag' : 'Bespoke Order Checkout'}
          </h1>
          <p className="bl-section-subtext" style={{ margin: 0 }}>
            {checkoutStep === 0 
              ? 'Review your selected artisan leather pieces before placing your order.' 
              : 'Complete your delivery and payment details for artisan doorstep dispatch.'}
          </p>
        </div>

        {/* STEP 0: CART ITEMS LIST */}
        {checkoutStep === 0 && (
          cartItems.length > 0 ? (
            <div className="bl-cart-layout-grid">
              
              {/* Left Column: Items List */}
              <div className="bl-cart-items-col">
                <div className="bl-cart-items-card">
                  <div className="bl-cart-header-row">
                    <span className="bl-cart-count-hdr">Items in Bag ({cartItems.reduce((a, b) => a + b.qty, 0)})</span>
                    <span className="bl-cart-del-info"><Truck size={14} /> Ships in 24–48 hours</span>
                  </div>

                  <div className="bl-cart-list">
                    {cartItems.map((item, idx) => (
                      <div key={`${item.id}-${item.color}-${idx}`} className="bl-cart-item-row">
                        <div 
                          className="bl-cart-thumb-box"
                          onClick={() => navigate(`/bags/product/${item.id}`)}
                          style={{ cursor: 'pointer' }}
                        >
                          <img src={item.img} alt={item.name} />
                        </div>

                        <div className="bl-cart-info-box">
                          <h4 
                            className="bl-cart-item-name"
                            onClick={() => navigate(`/bags/product/${item.id}`)}
                          >
                            {item.name}
                          </h4>

                          <div className="bl-cart-item-meta">
                            <span>Color: <strong>{item.color}</strong></span>
                            <span>•</span>
                            <span>Material: <strong>{item.material}</strong></span>
                          </div>

                          <div className="bl-cart-item-pricing">
                            <span className="bl-cart-unit-price">₹{item.price.toLocaleString('en-IN')} each</span>
                            <span className="bl-cart-line-total">Line Total: ₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                          </div>

                          <div className="bl-cart-actions-row">
                            {/* Quantity Controls */}
                            <div className="bl-cart-qty-ctrl">
                              <button 
                                onClick={() => handleQtyChange(item.id, item.color, -1)}
                                className="bl-cart-qty-btn"
                                title="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="bl-cart-qty-val">{item.qty}</span>
                              <button 
                                onClick={() => handleQtyChange(item.id, item.color, 1)}
                                className="bl-cart-qty-btn"
                                title="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <div className="bl-cart-btn-links">
                              <button 
                                onClick={() => handleMoveToWishlist(item)}
                                className="bl-cart-link-btn"
                              >
                                <Heart size={14} /> Move to Wishlist
                              </button>
                              <button 
                                onClick={() => handleRemove(item.id, item.color)}
                                className="bl-cart-link-btn remove"
                              >
                                <Trash2 size={14} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust strip */}
                <div className="bl-cart-trust-strip">
                  <div className="bl-trust-item"><ShieldCheck size={18} className="bl-text-pink" /> 100% Genuine Certified Leather</div>
                  <div className="bl-trust-item"><Truck size={18} className="bl-text-pink" /> Free Doorstep Returns (7 Days)</div>
                  <div className="bl-trust-item"><CheckCircle2 size={18} className="bl-text-pink" /> Master Handcrafted Assurance</div>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="bl-cart-summary-col">
                <div className="bl-cart-summary-card">
                  <h3 className="bl-summary-title">Order Summary</h3>

                  {/* Promo Code Box */}
                  <form onSubmit={handleApplyCoupon} className="bl-promo-box">
                    <div className="bl-promo-input-wrap">
                      <Tag size={15} className="bl-promo-tag-icon" />
                      <input 
                        type="text" 
                        placeholder="Promo Code (try STITCH10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="bl-promo-input"
                      />
                      <button type="submit" className="bl-promo-btn">Apply</button>
                    </div>
                    {couponMessage && (
                      <span className={`bl-promo-msg ${appliedDiscount > 0 ? 'success' : 'error'}`}>
                        {couponMessage}
                      </span>
                    )}
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="bl-summary-lines">
                    <div className="bl-summary-line">
                      <span>Subtotal</span>
                      <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="bl-summary-line discount">
                        <span>Artisan Discount (10%)</span>
                        <strong className="bl-text-pink">-₹{discountAmount.toLocaleString('en-IN')}</strong>
                      </div>
                    )}

                    <div className="bl-summary-line">
                      <span>Standard Shipping</span>
                      <strong style={{ color: '#10b981' }}>FREE</strong>
                    </div>

                    <div className="bl-summary-line">
                      <span>Estimated GST / Tax</span>
                      <span>Included</span>
                    </div>

                    <div className="bl-summary-divider" />

                    <div className="bl-summary-total-line">
                      <span>Total Amount</span>
                      <span className="bl-total-price">₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button 
                    className="bl-btn-primary bl-checkout-cta"
                    onClick={() => setCheckoutStep(1)}
                  >
                    Proceed to Checkout <ArrowRight size={17} />
                  </button>

                  <div className="bl-delivery-guarantee-note">
                    <Truck size={15} />
                    <span>Estimated delivery to Bengaluru in <strong>3–5 business days</strong></span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bl-empty-cart-card">
              <div className="bl-empty-icon-circle">
                <ShoppingBag size={36} />
              </div>
              <h3 className="bl-serif-title" style={{ fontSize: '1.6rem', margin: '12px 0 8px' }}>
                Your shopping bag is empty
              </h3>
              <p style={{ color: 'var(--bl-text-secondary)', maxWidth: '420px', margin: '0 auto 24px', lineHeight: 1.5 }}>
                Explore our handcrafted bags collection or design your own bespoke bag with our master leather artisans.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button 
                  className="bl-btn-primary"
                  onClick={() => navigate('/bags/shop')}
                >
                  Shop Ready Bags →
                </button>
                <button 
                  className="bl-btn-secondary"
                  onClick={() => navigate('/bags/custom-design')}
                >
                  Create Custom Design
                </button>
              </div>
            </div>
          )
        )}

        {/* STEP 1: DELIVERY ADDRESS */}
        {checkoutStep === 1 && (
          <div className="bl-checkout-step-container">
            <div className="bl-checkout-card">
              <h2 className="bl-checkout-section-hdr">1. Enter Delivery Address</h2>
              
              <div className="bl-form-grid-2">
                <div className="bl-form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    value={addressName} 
                    onChange={e => setAddressName(e.target.value)} 
                    className="bl-form-input" 
                  />
                </div>

                <div className="bl-form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    value={addressPhone} 
                    onChange={e => setAddressPhone(e.target.value)} 
                    className="bl-form-input" 
                  />
                </div>

                <div className="bl-form-group">
                  <label>Pincode *</label>
                  <input 
                    type="text" 
                    value={addressPincode} 
                    onChange={e => setAddressPincode(e.target.value)} 
                    className="bl-form-input" 
                  />
                </div>

                <div className="bl-form-group">
                  <label>City *</label>
                  <input 
                    type="text" 
                    value={addressCity} 
                    onChange={e => setAddressCity(e.target.value)} 
                    className="bl-form-input" 
                  />
                </div>

                <div className="bl-form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Flat, House no., Building, Street Address *</label>
                  <input 
                    type="text" 
                    value={addressLine} 
                    onChange={e => setAddressLine(e.target.value)} 
                    className="bl-form-input" 
                  />
                </div>
              </div>

              <div className="bl-checkout-btns-row">
                <button 
                  className="bl-btn-secondary" 
                  onClick={() => setCheckoutStep(0)}
                >
                  <ArrowLeft size={16} /> Back to Bag
                </button>
                <button 
                  className="bl-btn-primary" 
                  onClick={() => setCheckoutStep(2)}
                >
                  Continue to Delivery Method <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DELIVERY METHOD */}
        {checkoutStep === 2 && (
          <div className="bl-checkout-step-container">
            <div className="bl-checkout-card">
              <h2 className="bl-checkout-section-hdr">2. Choose Delivery Method</h2>

              <div className="bl-delivery-options-stack">
                <div 
                  className={`bl-delivery-option-card ${shippingMethod === 'standard' ? 'active' : ''}`}
                  onClick={() => setShippingMethod('standard')}
                >
                  <div className="bl-del-radio">
                    {shippingMethod === 'standard' && <Check size={14} />}
                  </div>
                  <div className="bl-del-text">
                    <strong>Standard Insured Delivery (3–5 Business Days)</strong>
                    <p>Complimentary doorstep courier delivery with signature confirmation.</p>
                  </div>
                  <span className="bl-del-price free">FREE</span>
                </div>

                <div 
                  className={`bl-delivery-option-card ${shippingMethod === 'express' ? 'active' : ''}`}
                  onClick={() => setShippingMethod('express')}
                >
                  <div className="bl-del-radio">
                    {shippingMethod === 'express' && <Check size={14} />}
                  </div>
                  <div className="bl-del-text">
                    <strong>Express Artisan Courier (1–2 Business Days)</strong>
                    <p>Priority packing directly from artisan workshop to doorstep.</p>
                  </div>
                  <span className="bl-del-price">₹199</span>
                </div>
              </div>

              <div className="bl-checkout-btns-row">
                <button 
                  className="bl-btn-secondary" 
                  onClick={() => setCheckoutStep(1)}
                >
                  <ArrowLeft size={16} /> Back to Address
                </button>
                <button 
                  className="bl-btn-primary" 
                  onClick={() => setCheckoutStep(3)}
                >
                  Continue to Payment <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT METHOD */}
        {checkoutStep === 3 && (
          <div className="bl-checkout-step-container">
            <div className="bl-checkout-card">
              <h2 className="bl-checkout-section-hdr">3. Payment & Order Review</h2>

              <div className="bl-order-review-mini-card">
                <div>
                  <strong>Total Payable:</strong> <span className="bl-total-price">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--bl-text-secondary)' }}>
                  Delivering to: {addressName}, {addressCity} ({addressPincode})
                </div>
              </div>

              <div className="bl-payment-options-grid">
                <div 
                  className={`bl-pay-card ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="bl-pay-radio">{paymentMethod === 'upi' && <Check size={13} />}</div>
                  <div className="bl-pay-label">
                    <strong>UPI / QR Code</strong>
                    <span>Google Pay, PhonePe, Paytm, BHIM</span>
                  </div>
                </div>

                <div 
                  className={`bl-pay-card ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="bl-pay-radio">{paymentMethod === 'card' && <Check size={13} />}</div>
                  <div className="bl-pay-label">
                    <strong>Credit / Debit Card</strong>
                    <span>Visa, MasterCard, RuPay, Amex</span>
                  </div>
                </div>

                <div 
                  className={`bl-pay-card ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <div className="bl-pay-radio">{paymentMethod === 'netbanking' && <Check size={13} />}</div>
                  <div className="bl-pay-label">
                    <strong>Net Banking</strong>
                    <span>All major Indian banks supported</span>
                  </div>
                </div>

                <div 
                  className={`bl-pay-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="bl-pay-radio">{paymentMethod === 'cod' && <Check size={13} />}</div>
                  <div className="bl-pay-label">
                    <strong>Cash on Delivery</strong>
                    <span>Pay at doorstep after unboxing</span>
                  </div>
                </div>
              </div>

              {/* Requirement 17 Notice */}
              <div className="bl-gateway-prep-banner">
                <Info size={18} className="bl-text-pink" />
                <div>
                  <strong>Frontend Architecture Ready for Payment Gateway</strong>
                  <p>
                    Orders placed here generate an active tracking reference and persist in your local session. Future payment gateway APIs can attach seamlessly.
                  </p>
                </div>
              </div>

              <div className="bl-checkout-btns-row">
                <button 
                  className="bl-btn-secondary" 
                  onClick={() => setCheckoutStep(2)}
                >
                  <ArrowLeft size={16} /> Back to Delivery
                </button>
                <button 
                  className="bl-btn-primary" 
                  onClick={handlePlaceOrder}
                >
                  Confirm & Place Order (₹{totalAmount.toLocaleString('en-IN')}) →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: ORDER CONFIRMATION */}
        {checkoutStep === 4 && confirmedOrder && (
          <div className="bl-confirmation-card">
            <div className="bl-success-icon-wrap">
              <CheckCircle2 size={56} className="bl-text-pink" />
            </div>

            <h2 className="bl-serif-title" style={{ fontSize: '2.2rem', margin: '14px 0 8px' }}>
              Thank You! Your Order is Confirmed
            </h2>

            <p style={{ color: 'var(--bl-text-secondary)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Order <strong>{confirmedOrder.id}</strong> has been received by our master artisan workshop. A confirmation receipt has been generated.
            </p>

            <div className="bl-confirmation-details-box">
              <div className="bl-conf-row">
                <span>Order Reference:</span>
                <strong>{confirmedOrder.id}</strong>
              </div>
              <div className="bl-conf-row">
                <span>Status:</span>
                <span className="bl-status-pill placed">Order Placed</span>
              </div>
              <div className="bl-conf-row">
                <span>Total Paid:</span>
                <strong>₹{confirmedOrder.total.toLocaleString('en-IN')}</strong>
              </div>
              <div className="bl-conf-row">
                <span>Delivery Address:</span>
                <span>{confirmedOrder.address}</span>
              </div>
            </div>

            <div className="bl-conf-btns">
              <button 
                className="bl-btn-primary"
                onClick={() => navigate('/orders')}
              >
                Track in My Orders →
              </button>
              <button 
                className="bl-btn-secondary"
                onClick={() => navigate('/bags')}
              >
                Back to Bags Studio
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
