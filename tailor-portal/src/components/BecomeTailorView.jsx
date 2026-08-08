import React, { useState, useEffect } from 'react';
import { 
  Scissors, Check, ArrowRight, Star, Plus, Minus, 
  HelpCircle, ChevronDown, Award, TrendingUp, Calendar, 
  CheckCircle, Briefcase, DollarSign, ShieldCheck,
  ChevronLeft, ChevronRight, Users, PackageCheck, Clock, Sparkles, Headphones,
  Calculator, Wallet, Store, Shirt, Zap, MapPin, Building, Gift
} from 'lucide-react';

export default function BecomeTailorView({ onJoinClick }) {
  // Earnings calculator state
  const [calcOrders, setCalcOrders] = useState(40);
  const [calcPrice, setCalcPrice] = useState(1200);
  const [calcDays, setCalcDays] = useState(24);
  
  // Membership billing toggle
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Category Specialties Filter Tab
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  // Category Tabs Configuration
  const categoryTabs = [
    { id: 'all', label: 'All Crafting Specialties' },
    { id: 'apparel', label: '👔 Clothes & Ethnic' },
    { id: 'bags', label: '👜 Handmade & Leather Bags' },
    { id: 'gifts_pets', label: '🎁 Handmade Gifts & Pets' },
    { id: 'upholstery_shoes', label: '🚗 Vehicle Covers & Shoes' }
  ];

  // Garment & Crafting category items with descriptions
  const categories = [
    // Apparel & Ethnic
    { tab: 'apparel', name: "Shirts & Trousers", desc: "Formal, casual & custom fitted shirts & pants", icon: "👔", tag: "Apparel" },
    { tab: 'apparel', name: "Suits & Tuxedos", desc: "Three-piece formal suits, blazers & tuxedos", icon: "🤵", tag: "Apparel" },
    { tab: 'apparel', name: "Designer Saree Blouses", desc: "Custom padded, embroidery & bridal blouses", icon: "💃", tag: "Apparel" },
    { tab: 'apparel', name: "Bridal Lehengas & Gowns", desc: "Royal wedding lehengas, gowns & western dresses", icon: "👗", tag: "Apparel" },
    { tab: 'apparel', name: "Kurtas & Sherwanis", desc: "Traditional ethnic wear & festive outfits", icon: "👑", tag: "Apparel" },
    { tab: 'apparel', name: "Alterations & Fitting", desc: "Precision fitting, hem alteration & garment repair", icon: "✂️", tag: "Apparel" },

    // Handmade & Leather Bags
    { tab: 'bags', name: "Handmade Tote Bags", desc: "Custom eco-friendly canvas, jute & denim totes", icon: "👜", tag: "Handmade Bags" },
    { tab: 'bags', name: "Leather Bags & Backpacks", desc: "Genuine & faux leather bag stitching & repair", icon: "🎒", tag: "Leather Goods" },
    { tab: 'bags', name: "Custom Purses & Handbags", desc: "Designer fabric purses, clutches & pouches", icon: "👛", tag: "Handmade Bags" },
    { tab: 'bags', name: "Travel Duffles & Sleeves", desc: "Padded travel bags, laptop sleeves & organizers", icon: "💼", tag: "Custom Bags" },

    // Handmade Gifts & Pet Apparel
    { tab: 'gifts_pets', name: "Handmade Fabric Gifts", desc: "Custom handmade gift pouches, keepsakes & crafts", icon: "🎁", tag: "Handcrafted Gifts" },
    { tab: 'gifts_pets', name: "Pet Dresses & Outfits", desc: "Custom dog shirts, cat dresses, bandanas & coats", icon: "🐶", tag: "Pet Apparel" },
    { tab: 'gifts_pets', name: "Pet Harnesses & Accessories", desc: "Stitching durable pet harnesses, bows & collars", icon: "🐾", tag: "Pet Accessories" },
    { tab: 'gifts_pets', name: "Festive Craft Accessories", desc: "Custom embroidery art, festive covers & favors", icon: "✨", tag: "Crafts & Favors" },

    // Vehicle Covers & Shoes
    { tab: 'upholstery_shoes', name: "Car & Bike Seat Covers", desc: "Custom leatherette & heavy fabric vehicle upholstery", icon: "🚗", tag: "Vehicle Covers" },
    { tab: 'upholstery_shoes', name: "Handmade Shoes & Slippers", desc: "Handcrafted cloth shoes, juttis & slip-ons", icon: "👟", tag: "Handmade Footwear" },
    { tab: 'upholstery_shoes', name: "Leather Goods & Belts", desc: "Heavy duty leather stitching, boot repair & straps", icon: "👞", tag: "Leather Goods" },
    { tab: 'upholstery_shoes', name: "Home Curtains & Cushions", desc: "Custom sofa covers, curtains & cushion sets", icon: "🛋️", tag: "Soft Furnishings" }
  ];

  const filteredCategories = activeCategoryTab === 'all' 
    ? categories 
    : categories.filter(c => c.tab === activeCategoryTab);

  // Scroll Entrance Observer Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);



  // Testimonials with partner stats & cutouts
  const testimonials = [
    {
      quote: "Before StitchBee I had only local walk-in customers. Now I receive daily custom stitching orders from across Bengaluru. My monthly income crossed ₹85,000!",
      author: "Rajesh K.",
      role: "Suit & Blazer Specialist",
      location: "Indiranagar, Bengaluru",
      rating: 5,
      joined: "Joined 1 year ago",
      earnings: "₹85,000 / month",
      growth: "+180% Growth",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "StitchBee gave my home boutique a digital identity. I set my own charges for blouses and lehengas. The weekly payments on Mondays are always punctual.",
      author: "Meena S.",
      role: "Bridal & Ethnic Designer",
      location: "Jayanagar, Bengaluru",
      rating: 5,
      joined: "Joined 8 months ago",
      earnings: "₹65,000 / month",
      growth: "+140% Growth",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Managing orders through the tailor partner app is effortless. Fabric pickups and deliveries are handled by StitchBee riders, leaving me free to stitch.",
      author: "Amit P.",
      role: "Master Home Tailor",
      location: "Whitefield, Bengaluru",
      rating: 5,
      joined: "Joined 6 months ago",
      earnings: "₹52,000 / month",
      growth: "+120% Growth",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // FAQ list
  const faqs = [
    {
      q: "Do I need a physical commercial shop to join?",
      a: "No. You do not need a commercial storefront. Home tailors, boutique owners, and master tailors working out of home studios or workshops can all join StitchBee."
    },
    {
      q: "How do fabric pickups and deliveries work?",
      a: "StitchBee delivery partners collect fabric directly from the customer's doorstep and deliver it to your workshop. Once stitched, our rider picks up the completed garment for doorstep delivery."
    },
    {
      q: "How do payments work and when do I get paid?",
      a: "Customer payments are collected securely online. Your total net earnings are calculated automatically and transferred to your bank account every Monday."
    },
    {
      q: "Can I choose which orders to accept?",
      a: "Yes! You have 100% control. You can review the garment type, measurements, reference images, and delivery deadline before deciding to accept or pass on an order."
    }
  ];

  // Calculate monthly earnings
  const monthlyTotal = calcOrders * calcPrice;
  const weeklyEstimate = Math.round(monthlyTotal / 4);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div style={{ color: 'var(--text-color)', fontFamily: 'inherit' }}>
      
      {/* 1. Hero Section */}
      <section className="become-tailor-hero-section" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '5rem' }}>
        
        {/* Loop Video Background of Tailor Cutting */}
        <video
          src="/TailorCutting.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hero-partner-video"
        />

        <div className="become-tailor-hero-container" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Left Column: Content */}
          <div className="become-tailor-hero-content scroll-reveal-left" style={{ maxWidth: '560px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1.5rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem' }}>
              <Scissors size={12} /> StitchBee Tailor Partner Program
            </span>
            <h1 className="become-tailor-hero-title">
              Earn More. <span style={{ color: 'var(--primary)' }}>Stitch Smarter.</span> Grow Faster.
            </h1>
            <p className="become-tailor-hero-subtitle">
              Join StitchBee and turn your tailoring skills into a growing online business. Get access to thousands of clients in your area.
            </p>
            
            <div className="become-tailor-hero-ctas">
              <button className="btn btn-primary" onClick={onJoinClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}>
                Become a Tailor <ArrowRight size={16} />
              </button>
              <a href="#how-it-works" className="btn btn-secondary" style={{ padding: '12px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                Watch How It Works
              </a>
            </div>

            {/* Left 3 Stat Items with Soft Pink Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginTop: '2.5rem' }}>
              
              {/* Stat Item 1: 500+ */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  background: 'rgba(247,37,133,0.12)', 
                  border: '1.5px solid rgba(247,37,133,0.25)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#f72585',
                  boxShadow: '0 4px 14px rgba(247,37,133,0.12)',
                  flexShrink: 0
                }}>
                  <Users size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.15 }}>500+</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '2px' }}>Tailors Joined</div>
                </div>
              </div>

              {/* Stat Item 2: 10,000+ */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  background: 'rgba(247,37,133,0.12)', 
                  border: '1.5px solid rgba(247,37,133,0.25)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#f72585',
                  boxShadow: '0 4px 14px rgba(247,37,133,0.12)',
                  flexShrink: 0
                }}>
                  <PackageCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.15 }}>10,000+</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '2px' }}>Orders Delivered</div>
                </div>
              </div>

              {/* Stat Item 3: Weekly */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  background: 'rgba(247,37,133,0.12)', 
                  border: '1.5px solid rgba(247,37,133,0.25)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#f72585',
                  boxShadow: '0 4px 14px rgba(247,37,133,0.12)',
                  flexShrink: 0
                }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.15 }}>Weekly</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '2px' }}>Payouts</div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column Spacer for Widescreen Video Overlay */}
          <div className="hero-interactive-column" />

        </div>
      </section>

      {/* 2. Why Tailors Choose StitchBee */}
      <section id="tailor-benefits" style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem' }}>
              <Scissors size={14} /> WHY TAILORS CHOOSE STITCHBEE
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              More Revenue. More Freedom. <span style={{ color: 'var(--primary)' }}>Digital Growth.</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
              Everything you need to turn your tailoring craftsmanship into a thriving online business.
            </p>
          </div>

          <div className="tailor-benefits-3x2-grid">
            
            {/* Card 1 */}
            <div className="tailor-benefit-card scroll-reveal-scale">
              <div className="benefit-card-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(247,37,133,0.2) 0%, rgba(247,37,133,0.05) 100%)', color: '#f72585', borderColor: 'rgba(247,37,133,0.3)' }}>
                <Clock size={22} />
              </div>
              <h3 className="benefit-card-title">Work on Your Terms</h3>
              <p className="benefit-card-desc">Accept custom orders matching your schedule. Pause incoming orders whenever you are busy or on vacation.</p>
            </div>

            {/* Card 2 */}
            <div className="tailor-benefit-card scroll-reveal-scale">
              <div className="benefit-card-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(114,9,183,0.2) 0%, rgba(114,9,183,0.05) 100%)', color: '#b5179e', borderColor: 'rgba(114,9,183,0.3)' }}>
                <TrendingUp size={22} />
              </div>
              <h3 className="benefit-card-title">Higher Revenue & Profits</h3>
              <p className="benefit-card-desc">Set your own custom tailoring prices. Keep transparent earnings with zero hidden middleman deductions.</p>
            </div>

            {/* Card 3 */}
            <div className="tailor-benefit-card scroll-reveal-scale">
              <div className="benefit-card-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)' }}>
                <Wallet size={22} />
              </div>
              <h3 className="benefit-card-title">Guaranteed Weekly Payouts</h3>
              <p className="benefit-card-desc">Receive secure direct bank deposits every single Monday with complete earnings transparency and breakdown.</p>
            </div>

            {/* Card 4 */}
            <div className="tailor-benefit-card scroll-reveal-scale">
              <div className="benefit-card-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(63,55,201,0.2) 0%, rgba(63,55,201,0.05) 100%)', color: '#4cc9f0', borderColor: 'rgba(63,55,201,0.3)' }}>
                <Store size={22} />
              </div>
              <h3 className="benefit-card-title">Digital Boutique Storefront</h3>
              <p className="benefit-card-desc">Get a personalized digital portfolio page showcasing your previous garment creations, customer ratings & badges.</p>
            </div>

            {/* Card 5 */}
            <div className="tailor-benefit-card scroll-reveal-scale">
              <div className="benefit-card-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)', color: '#f59e0b', borderColor: 'rgba(245,158,11,0.3)' }}>
                <PackageCheck size={22} />
              </div>
              <h3 className="benefit-card-title">Doorstep Pickup & Delivery</h3>
              <p className="benefit-card-desc">StitchBee delivery partners handle fabric pickups from customers and drop-offs to your workshop, saving you time.</p>
            </div>

            {/* Card 6 */}
            <div className="tailor-benefit-card scroll-reveal-scale">
              <div className="benefit-card-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.05) 100%)', color: '#ec4899', borderColor: 'rgba(236,72,153,0.3)' }}>
                <Award size={22} />
              </div>
              <h3 className="benefit-card-title">Master Tailor Certification</h3>
              <p className="benefit-card-desc">Earn verified master tailor badges, priority order routing, and access to premium bridal & corporate leads.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Your Skills = Your Income (Earnings Estimator) */}
      <section id="tailor-earnings" style={{ 
        padding: '6rem 1.5rem', 
        background: 'linear-gradient(180deg, rgba(247,37,133,0.02) 0%, rgba(0,0,0,0) 100%)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem' }}>
              <Calculator size={14} /> EARNINGS ESTIMATOR
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              Your Skills = <span style={{ color: 'var(--primary)' }}>Your Income</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Estimate your monthly earnings based on your stitching capacity and order complexity
            </p>
          </div>

          <div className="tailor-calc-grid-layout">
            
            {/* Interactive Sliders Card */}
            <div className="tailor-calc-card scroll-reveal-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(247,37,133,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f72585' }}>
                  <Calculator size={20} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>Calculate Income Potential</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Adjust parameters to see your live estimate</span>
                </div>
              </div>

              {/* Slider 1: Orders per month */}
              <div style={{ marginBottom: '24px' }}>
                <div className="flex-row-between" style={{ marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Orders Per Month</span>
                  <strong style={{ color: '#f72585', fontSize: '1.1rem', fontWeight: '800' }}>{calcOrders} Orders</strong>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="120" 
                  step="5"
                  value={calcOrders}
                  onChange={(e) => setCalcOrders(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#f72585', cursor: 'pointer' }}
                />
                <div className="flex-row-between" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>10</span>
                  <span>40</span>
                  <span>80</span>
                  <span>120+</span>
                </div>
              </div>

              {/* Slider 2: Average Stitching Fee per order */}
              <div style={{ marginBottom: '24px' }}>
                <div className="flex-row-between" style={{ marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Avg Stitching Fee / Order</span>
                  <strong style={{ color: '#f72585', fontSize: '1.1rem', fontWeight: '800' }}>₹{calcPrice.toLocaleString('en-IN')}</strong>
                </div>
                <input 
                  type="range" 
                  min="400" 
                  max="3500" 
                  step="100"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#f72585', cursor: 'pointer' }}
                />
                <div className="flex-row-between" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>₹400 (Basic)</span>
                  <span>₹1,500 (Suits/Blouses)</span>
                  <span>₹3,500+ (Bridal)</span>
                </div>
              </div>

              {/* Slider 3: Working days per month */}
              <div style={{ marginBottom: '28px' }}>
                <div className="flex-row-between" style={{ marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Working Days Per Month</span>
                  <strong style={{ color: '#f72585', fontSize: '1.1rem', fontWeight: '800' }}>{calcDays} Days</strong>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="30" 
                  step="1"
                  value={calcDays}
                  onChange={(e) => setCalcDays(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#f72585', cursor: 'pointer' }}
                />
                <div className="flex-row-between" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>10 Days</span>
                  <span>20 Days</span>
                  <span>30 Days</span>
                </div>
              </div>

              {/* Result Gradient Glow Box */}
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(247,37,133,0.12) 0%, rgba(114,9,183,0.12) 100%)', 
                border: '1.5px solid rgba(247,37,133,0.3)',
                borderRadius: '16px', 
                padding: '24px', 
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(247,37,133,0.1)'
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Estimated Monthly Income
                </span>
                <div style={{ fontSize: '2.6rem', color: 'var(--text-primary)', fontWeight: '900', margin: '6px 0', lineHeight: 1 }}>
                  ₹{monthlyTotal.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#f72585', fontWeight: '700' }}>
                  ~₹{weeklyEstimate.toLocaleString('en-IN')} / week
                </div>
              </div>

              {/* Chips */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px', justifyContent: 'center' }}>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', fontSize: '0.72rem' }}>⚡ Weekly Payouts</span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', fontSize: '0.72rem' }}>100% Tips Kept</span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', fontSize: '0.72rem' }}>Bonus Incentives</span>
              </div>

            </div>

            {/* Benchmarks Grid */}
            <div className="tailor-calc-benchmarks scroll-reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
              
              {/* Benchmark 1 */}
              <div className="benchmark-tier-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#f72585', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Part-Time Home Tailor</span>
                    <h4 style={{ margin: '2px 0 0 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '700' }}>20 Orders / Month</h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>₹20K – ₹35K</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Avg / month</span>
                  </div>
                </div>
              </div>

              {/* Benchmark 2 */}
              <div className="benchmark-tier-card popular">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#f72585', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full-Time Boutique Designer</span>
                    <h4 style={{ margin: '2px 0 0 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '700' }}>50 Orders / Month</h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#f72585' }}>₹55K – ₹85K</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Avg / month</span>
                  </div>
                </div>
              </div>

              {/* Benchmark 3 */}
              <div className="benchmark-tier-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#4cc9f0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Master Custom House</span>
                    <h4 style={{ margin: '2px 0 0 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '700' }}>100+ Orders / Month</h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>₹1,20,000+</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Avg / month</span>
                  </div>
                </div>
              </div>

              {/* Quote Block */}
              <div style={{ 
                borderLeft: '3px solid #f72585', 
                padding: '16px 20px', 
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '0 12px 12px 0',
                marginTop: '8px'
              }}>
                <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  “Turn your sewing machine into a steady, high-revenue digital business with guaranteed weekly payouts.”
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Redesigned: How It Works */}
      <span id="how-it-works" />
      <section style={{ padding: '6rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem' }}>
              <CheckCircle size={14} /> SIMPLE 6-STEP PROCESS
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              How StitchBee Works <span style={{ color: 'var(--primary)' }}>For Tailors</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Start earning and growing your tailoring customer base in 6 simple steps
            </p>
          </div>

          <div className="tailor-how-it-works-grid">
            
            {[
              { num: "01", title: "Create Tailor Profile", desc: "Sign up in 2 minutes with your phone number, workshop location, and tailoring experience.", icon: <Briefcase size={20} /> },
              { num: "02", title: "Showcase Portfolio", desc: "Upload photos of your finest stitched garments, designs, blouses, suits, or dresses.", icon: <Sparkles size={20} /> },
              { num: "03", title: "Select Categories & Prices", desc: "Choose garment categories you specialize in and set your custom stitching rates.", icon: <Shirt size={20} /> },
              { num: "04", title: "Receive Local Orders", desc: "Get instant order notifications from nearby customers with measurements & fabric details.", icon: <Zap size={20} /> },
              { num: "05", title: "Stitch & Update Progress", desc: "Receive fabric via StitchBee riders, stitch to perfection, and upload completion photo.", icon: <Scissors size={20} /> },
              { num: "06", title: "Doorstep Delivery & Payout", desc: "Our rider delivers the finished outfit. Net earnings land in your bank account every Monday.", icon: <Wallet size={20} /> }
            ].map((step, idx) => (
              <div key={idx} className="tailor-step-card scroll-reveal-scale">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: '12px', 
                    background: 'rgba(247,37,133,0.12)', 
                    color: '#f72585', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    {step.icon}
                  </div>
                  <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'rgba(247,37,133,0.3)', fontFamily: 'monospace' }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>{step.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>{step.desc}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* 5. What Can You Stitch & Craft? */}
      <section id="tailor-specialties" style={{ padding: '6rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          
          <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem' }}>
              <Shirt size={14} /> TAILORING & CRAFTING SPECIALTIES
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              What Can You Stitch & Craft?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
              From bespoke clothes and handmade bags to pet dresses, leather goods, vehicle seat covers, and custom slippers!
            </p>

            {/* Specialty Filter Tabs */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px', 
              flexWrap: 'wrap', 
              marginTop: '28px' 
            }}>
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryTab(tab.id)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '24px',
                    border: activeCategoryTab === tab.id ? '1px solid #f72585' : '1px solid var(--border-color)',
                    background: activeCategoryTab === tab.id ? 'rgba(247,37,133,0.15)' : 'rgba(255,255,255,0.03)',
                    color: activeCategoryTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: activeCategoryTab === tab.id ? '700' : '500',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: activeCategoryTab === tab.id ? '0 4px 14px rgba(247,37,133,0.25)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
            gap: '20px' 
          }}>
            {filteredCategories.map((cat, idx) => (
              <div key={idx} className="tailor-category-card scroll-reveal-scale">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                  <span className="badge" style={{ background: 'rgba(247,37,133,0.12)', color: '#f72585', border: '1px solid rgba(247,37,133,0.25)', fontSize: '0.68rem', fontWeight: '700' }}>
                    {cat.tag}
                  </span>
                </div>
                <h4 style={{ color: 'var(--text-primary)', margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: '700', textAlign: 'left' }}>{cat.name}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0, textAlign: 'left' }}>{cat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Redesigned: Real Tailor Stories */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          
          <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem' }}>
              <Star size={14} /> TAILOR TESTIMONIALS
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              Real Stories From <span style={{ color: 'var(--primary)' }}>Real Tailors</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Hear how skilled tailors expanded their studios and doubled their monthly income
            </p>
          </div>

          <div className="tailor-stories-grid">
            {testimonials.map((test, idx) => (
              <div key={idx} className="tailor-story-card scroll-reveal-scale">
                
                {/* Header Profile Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <img 
                    src={test.avatar} 
                    alt={test.author}
                    style={{ 
                      width: '54px', 
                      height: '54px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      border: '2px solid #f72585',
                      boxShadow: '0 0 12px rgba(247,37,133,0.3)'
                    }}
                  />
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>{test.author}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#f72585', fontWeight: '600', display: 'block' }}>{test.role}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>📍 {test.location}</span>
                  </div>
                </div>

                {/* Badges Bar */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span className="badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', fontSize: '0.72rem', fontWeight: '700' }}>
                    {test.earnings}
                  </span>
                  <span className="badge" style={{ background: 'rgba(247,37,133,0.12)', color: '#f72585', border: '1px solid rgba(247,37,133,0.3)', fontSize: '0.72rem', fontWeight: '700' }}>
                    {test.growth}
                  </span>
                </div>

                {/* Rating */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                {/* Quote */}
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                  "{test.quote}"
                </p>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                  {test.joined}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Redesigned: Tailor Membership Plans */}
      <section id="tailor-pricing" style={{ 
        padding: '6rem 1.5rem', 
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(247,37,133,0.02) 100%)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
          
          <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem' }}>
              <Award size={14} /> TAILOR MEMBERSHIP PLANS
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              Choose Your Growth Plan
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              Flexible membership tiers tailored for solo home tailors, boutique studios, and master fashion outlets
            </p>

            {/* Toggle Monthly vs Annual */}
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '30px', border: '1px solid var(--border-color)', marginTop: '24px' }}>
              <button 
                onClick={() => setBillingCycle('monthly')}
                style={{ 
                  padding: '8px 20px', 
                  borderRadius: '24px', 
                  border: 'none', 
                  background: billingCycle === 'monthly' ? '#f72585' : 'transparent', 
                  color: billingCycle === 'monthly' ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Monthly Billing
              </button>
              <button 
                onClick={() => setBillingCycle('annual')}
                style={{ 
                  padding: '8px 20px', 
                  borderRadius: '24px', 
                  border: 'none', 
                  background: billingCycle === 'annual' ? '#f72585' : 'transparent', 
                  color: billingCycle === 'annual' ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Annual Billing <span style={{ background: '#10b981', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px', fontWeight: '800' }}>Save 20%</span>
              </button>
            </div>

          </div>

          <div className="tailor-pricing-grid">
            
            {/* Starter Plan */}
            <div className="tailor-pricing-card scroll-reveal-scale">
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Individual</span>
                <h3 style={{ color: 'var(--text-primary)', margin: '4px 0 12px 0', fontSize: '1.6rem', fontWeight: '800' }}>Starter Plan</h3>
                <div style={{ margin: '16px 0', color: 'var(--text-primary)' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '900' }}>₹0</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}> / month</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px', lineHeight: '1.4' }}>
                  Ideal for solo home tailors starting out in custom stitching.
                </p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> 15 Order Requests / month</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Standard profile listing</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> In-app order chat support</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Weekly Monday payouts</li>
                </ul>
              </div>
              <button className="btn btn-secondary" onClick={onJoinClick} style={{ width: '100%', marginTop: '32px', padding: '12px' }}>
                Start For Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="tailor-pricing-card popular scroll-reveal-scale">
              <span className="pricing-popular-ribbon">Most Popular</span>
              <div>
                <span style={{ color: '#f72585', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800' }}>Boutique Partner</span>
                <h3 style={{ color: 'var(--text-primary)', margin: '4px 0 12px 0', fontSize: '1.6rem', fontWeight: '800' }}>Pro Plan</h3>
                <div style={{ margin: '16px 0', color: 'var(--text-primary)' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#f72585' }}>
                    {billingCycle === 'monthly' ? '₹499' : '₹399'}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}> / month</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px', lineHeight: '1.4' }}>
                  Perfect for growing tailors looking to double monthly orders.
                </p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Unlimited Order Requests</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Priority customer search ranking</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Verified Master Tailor badge</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Priority phone & chat support</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Access to bridal & suit leads</li>
                </ul>
              </div>
              <button className="btn btn-primary" onClick={onJoinClick} style={{ width: '100%', marginTop: '32px', padding: '12px', background: '#f72585', borderColor: '#f72585' }}>
                Upgrade to Pro <ArrowRight size={16} style={{ marginLeft: '4px' }} />
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="tailor-pricing-card scroll-reveal-scale">
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Custom House</span>
                <h3 style={{ color: 'var(--text-primary)', margin: '4px 0 12px 0', fontSize: '1.6rem', fontWeight: '800' }}>Master Plan</h3>
                <div style={{ margin: '16px 0', color: 'var(--text-primary)' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '900' }}>
                    {billingCycle === 'monthly' ? '₹999' : '₹799'}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}> / month</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px', lineHeight: '1.4' }}>
                  For established boutique studios, bridal houses & workshop teams.
                </p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Everything in Pro Plan</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Dedicated Account Manager</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Corporate & bulk uniform orders</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={16} style={{ color: '#f72585' }} /> Featured App Header placement</li>
                </ul>
              </div>
              <button className="btn btn-secondary" onClick={onJoinClick} style={{ width: '100%', marginTop: '32px', padding: '12px' }}>
                Join Master Tier
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="tailor-faqs" style={{ padding: '6rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          
          <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem' }}>
              <HelpCircle size={14} /> GOT QUESTIONS?
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="scroll-reveal-scale"
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    style={{ 
                      transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: '#f72585'
                    }} 
                  />
                </button>

                {activeFaq === idx && (
                  <div style={{ padding: '0 24px 20px 24px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* 8. FAQ Section End */}
    </div>
  );
}
