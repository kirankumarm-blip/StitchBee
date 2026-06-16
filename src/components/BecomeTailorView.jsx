import React, { useState, useEffect } from 'react';
import { 
  Scissors, Check, ArrowRight, Star, Plus, Minus, 
  HelpCircle, ChevronDown, Award, TrendingUp, Calendar, 
  CheckCircle, Briefcase, DollarSign, ShieldCheck,
  ChevronLeft, ChevronRight
} from 'lucide-react';

export default function BecomeTailorView({ onJoinClick }) {
  // Earnings calculator state
  const [calcOrders, setCalcOrders] = useState(30);
  
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);

  // Hero Carousel Configuration
  const carouselImages = [
    { url: '/tailor_hero_5.jpg', alt: "Tailor partner measuring custom suit jacket" },
    { url: '/tailor_hero_1.jpg', alt: "StitchBee tailors collaborating at workspace" },
    { url: '/tailor_hero_2.jpg', alt: "Stitching workbench with designs & tailoring tools" },
    { url: '/tailor_hero_3.jpg', alt: "Precision sewing machine stitching gold fabric border" },
    { url: '/tailor_hero_4.jpg', alt: "Professional tailor marking and pinning fabrics" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  // Why Join Carousel State & Config
  const [whyJoinSlide, setWhyJoinSlide] = useState(0);
  
  const whyJoinImages = [
    { url: '/why_join_1.jpg', alt: "Redhead designer reviewing custom sizing patterns on a tablet" },
    { url: '/why_join_2.jpg', alt: "Boutique tailor measuring a client's chest fitting" },
    { url: '/why_join_3.jpg', alt: "Precision tailoring using scissors to cut fabric patterns" },
    { url: '/why_join_4.png', alt: "StitchBee Partner App showing measurement tools" },
    { url: '/why_join_5.jpg', alt: "Custom designer measuring waist fitting on a female client" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setWhyJoinSlide((prev) => (prev + 1) % whyJoinImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [whyJoinImages.length]);

  // Gown / clothing category items with descriptions
  const categories = [
    { name: "Shirts", desc: "Formal & casual shirt stitching" },
    { name: "Pants", desc: "Trousers, chinos, & bottoms" },
    { name: "Suits", desc: "Three-piece formal & casual suits" },
    { name: "Blazers", desc: "Custom structured outer coats" },
    { name: "Kurtas", desc: "Traditional Indian men's wear" },
    { name: "Sherwanis", desc: "Royal wedding & festive sherwanis" },
    { name: "Dresses", desc: "Western gowns & casual dresses" },
    { name: "Blouses", desc: "Designer saree blouses & tops" },
    { name: "Uniforms", desc: "School & corporate custom wear" },
    { name: "Alterations", desc: "Perfect resizing & tailoring fits" }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Before StitchBee I had only local customers. Now I get orders daily from all over the city.",
      author: "Rajesh K.",
      role: "Suit & Blazer Specialist",
      rating: 5,
      joined: "Joined 8 months ago"
    },
    {
      quote: "My monthly tailoring income doubled in just 3 months. I set my own charges, which is amazing.",
      author: "Meena S.",
      role: "Boutique & Bridal Owner",
      rating: 5,
      joined: "Joined 1 year ago"
    },
    {
      quote: "The app made managing orders very easy. Updating stitching status takes just one click.",
      author: "Amit P.",
      role: "Home Tailor & Designer",
      rating: 5,
      joined: "Joined 5 months ago"
    }
  ];

  // FAQ list
  const faqs = [
    {
      q: "Do I need my own shop?",
      a: "No. You do not need a physical commercial shop. You can operate out of a workshop, home, or boutique as long as you have a stitching setup."
    },
    {
      q: "Can I work from home?",
      a: "Yes! Many of our most successful tailors are home-based tailors or boutique designers working from home studios."
    },
    {
      q: "How do payments work?",
      a: "Customer payments are collected securely online. Your earnings are paid out directly to your registered bank account weekly on every Monday."
    },
    {
      q: "Can I reject orders?",
      a: "Yes, you have full control. You can review the order details, fabric type, and measurements before deciding to accept or reject."
    }
  ];

  // Calculate earnings estimate based on slider
  const getEstimatedEarnings = (ordersCount) => {
    const minPerOrder = 800;
    const maxPerOrder = 1400;
    return {
      min: (ordersCount * minPerOrder).toLocaleString('en-IN'),
      max: (ordersCount * maxPerOrder).toLocaleString('en-IN')
    };
  };

  const estimated = getEstimatedEarnings(calcOrders);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div style={{ color: 'var(--text-color)', fontFamily: 'inherit' }}>
      
      {/* 1. Hero Section (First Fold) */}
      <section className="become-tailor-hero-section">
        <div className="become-tailor-hero-container">
          
          {/* Left Column: Content */}
          <div className="become-tailor-hero-content">
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

            {/* Trust Line */}
            <div className="become-tailor-hero-trust">
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> 500+ Tailors Joined</span>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> 10,000+ Orders Delivered</span>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Weekly Payouts</span>
            </div>
          </div>

          {/* Right Column: Carousel */}
          <div className="become-tailor-hero-carousel-col">
            <div className="hero-carousel-container">
              <div className="hero-carousel-track">
                {carouselImages.map((image, idx) => {
                  let offset = idx - currentSlide;
                  if (offset < -2) offset += carouselImages.length;
                  if (offset > 2) offset -= carouselImages.length;

                  const isActive = offset === 0;
                  const isLeft = offset === -1;
                  const isRight = offset === 1;

                  let slideClass = "hero-carousel-slide";
                  if (offset === 0) slideClass += " active";
                  else if (offset === -1) slideClass += " prev";
                  else if (offset === 1) slideClass += " next";
                  else if (offset === -2) slideClass += " hidden-left";
                  else if (offset === 2) slideClass += " hidden-right";

                  return (
                    <div
                      key={idx}
                      className={slideClass}
                      onClick={() => {
                        if (isLeft) handlePrev();
                        else if (isRight) handleNext();
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                          padding: '24px 20px 20px 20px',
                          textAlign: 'left'
                        }}>
                          <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: 0, fontWeight: '700', letterSpacing: '-0.3px' }}>
                            {image.alt}
                          </h4>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Carousel Arrows */}
              <button className="hero-carousel-btn prev-btn" onClick={handlePrev} aria-label="Previous slide">
                <ChevronLeft size={20} />
              </button>
              <button className="hero-carousel-btn next-btn" onClick={handleNext} aria-label="Next slide">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Why Join StitchBee? */}
      <section className="become-tailor-why-join-section">
        <div className="why-join-container">
          
          <div className="why-join-split-container">
            
            {/* Left Column: Benefits Content */}
            <div className="why-join-content-col">
              <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Why Tailors Choose StitchBee</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: 0 }}>The tools and demand you need to take your craft online</p>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                gap: '20px' 
              }}>
                {[
                  { title: "More Orders", desc: "Get customers from your city without spending on marketing.", icon: <TrendingUp size={18} /> },
                  { title: "Flexible Work", desc: "Accept orders when you're available. Pause orders when you're busy.", icon: <Calendar size={18} /> },
                  { title: "Better Earnings", desc: "Set your own custom stitching charges and keep consistent profits.", icon: <DollarSign size={18} /> },
                  { title: "Digital Growth", desc: "Build your online tailoring profile, portfolio, and digital catalog.", icon: <Award size={18} /> },
                  { title: "Ratings & Reviews", desc: "Gain trust with customer reviews and showcase your premium ratings.", icon: <Star size={18} /> },
                  { title: "Instant Payments", desc: "Receive secure, direct bank transfers every single week.", icon: <ShieldCheck size={18} /> }
                ].map((benefit, idx) => (
                  <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', gap: '12px', flexDirection: 'column' }}>
                    <div style={{ 
                      background: 'rgba(247,37,133,0.1)', 
                      color: 'var(--primary)', 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: '0 0 6px 0', fontWeight: '600' }}>{benefit.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Carousel */}
            <div className="why-join-carousel-col">
              <div className="why-join-slider-wrapper">
                {whyJoinImages.map((image, idx) => (
                  <img
                    key={idx}
                    src={image.url}
                    alt={image.alt}
                    className={`why-join-slide-img ${idx === whyJoinSlide ? 'active' : ''}`}
                  />
                ))}

                {/* Arrow Controls */}
                <button
                  onClick={() => setWhyJoinSlide((prev) => (prev - 1 + whyJoinImages.length) % whyJoinImages.length)}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                    zIndex: 5,
                    opacity: 0.7,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={() => setWhyJoinSlide((prev) => (prev + 1) % whyJoinImages.length)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                    zIndex: 5,
                    opacity: 0.7,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                >
                  <ChevronRight size={16} />
                </button>
                
                {/* Description Banner */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                  padding: '16px 20px',
                  textAlign: 'left',
                  zIndex: 4
                }}>
                  <p style={{ color: '#fff', fontSize: '0.8rem', margin: 0, opacity: 0.9, lineHeight: '1.3' }}>
                    {whyJoinImages[whyJoinSlide].alt}
                  </p>
                </div>
              </div>

              {/* Dots */}
              <div className="why-join-dots">
                {whyJoinImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`why-join-dot ${idx === whyJoinSlide ? 'active' : ''}`}
                    onClick={() => setWhyJoinSlide(idx)}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Earnings Calculator */}
      <section style={{ 
        padding: '5rem 1.5rem', 
        background: 'rgba(255,255,255,0.01)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Your Skills = Your Income</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Calculate your potential monthly income on our platform</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '32px',
            alignItems: 'center'
          }}>
            {/* Interactive Calculator Slider */}
            <div className="glass-card-no-hover" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Estimate Your Income</h4>
              
              <div style={{ marginBottom: '25px' }}>
                <div className="flex-row-between" style={{ marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Orders Per Month</span>
                  <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{calcOrders} Orders</strong>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="120" 
                  value={calcOrders}
                  onChange={(e) => setCalcOrders(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div style={{ background: 'var(--bg-darker)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Estimated Monthly Earnings</span>
                <strong style={{ fontSize: '2rem', color: 'var(--text-primary)', fontWeight: '800' }}>₹{estimated.min} – ₹{estimated.max}</strong>
              </div>
            </div>

            {/* Income Benchmarks */}
            <div>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 8px', color: 'var(--text-primary)' }}>Orders Per Month</th>
                    <th style={{ padding: '12px 8px', color: 'var(--text-primary)', textAlign: 'right' }}>Avg Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 8px' }}>20 Orders</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>₹15,000 – ₹25,000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 8px' }}>50 Orders</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>₹40,000 – ₹70,000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 8px' }}>100 Orders</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--primary)', fontWeight: '700' }}>₹80,000+</td>
                  </tr>
                </tbody>
              </table>

              <blockquote style={{ 
                borderLeft: '3px solid var(--primary)', 
                margin: '2rem 0 0 0', 
                paddingLeft: '1rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                fontSize: '0.95rem'
              }}>
                “The more you stitch, the more you earn.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <span id="how-it-works" />
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>How It Works</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Start earning in 6 simple steps</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
            {/* Visual connector line for timeline */}
            <div style={{ 
              position: 'absolute', 
              left: '20px', 
              top: '20px', 
              bottom: '20px', 
              width: '2px', 
              background: 'linear-gradient(to bottom, var(--primary), rgba(255,255,255,0.06))',
              zIndex: 1
            }} />

            {[
              "Create your tailor profile",
              "Upload your shop details",
              "Add skills & clothing types",
              "Receive customer orders",
              "Stitch and update progress",
              "Deliver and get paid"
            ].map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'center', zIndex: 2 }}>
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-card)', 
                  border: '2px solid var(--primary)', 
                  color: 'var(--text-primary)', 
                  fontWeight: '700',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(247,37,133,0.15)'
                }}>
                  {idx + 1}
                </div>
                <div className="glass-card-no-hover" style={{ padding: '16px 20px', flex: 1, display: 'flex', alignItems: 'center' }}>
                  <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1rem', fontWeight: '500' }}>{step}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What Can You Stitch? */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>What Can You Stitch?</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Select the categories that match your custom tailoring expertise</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
            gap: '16px' 
          }}>
            {categories.map((cat, idx) => (
              <div key={idx} className="glass-card-no-hover" style={{ 
                padding: '20px', 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}>
                  <CheckCircle size={16} />
                </div>
                <h5 style={{ color: 'var(--text-primary)', margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: '600' }}>{cat.name}</h5>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{cat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Real Tailor Stories */}
      <section style={{ 
        padding: '5rem 1.5rem', 
        background: 'rgba(255,255,255,0.01)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Real Tailor Stories</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Hear from our partners who grew their businesses with us</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {testimonials.map((test, idx) => (
              <div key={idx} className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--primary)" color="var(--primary)" />
                    ))}
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: '1.4', margin: '0 0 20px 0' }}>
                    "{test.quote}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <h5 style={{ color: 'var(--text-primary)', margin: '0 0 2px 0', fontSize: '0.9rem' }}>{test.author}</h5>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{test.role}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>{test.joined}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Future Growth */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Build Your Tailoring Brand</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>StitchBee is not just about gigs—it's a path to long-term startup business growth</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '20px'
          }}>
            {[
              "Open your digital store",
              "Get repeat customers",
              "Expand your team",
              "Hire helpers",
              "Become a premium tailor",
              "Earn bonuses"
            ].map((point, idx) => (
              <div key={idx} className="glass-card-no-hover" style={{ 
                padding: '16px 20px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                border: '1px solid rgba(255,255,255,0.04)' 
              }}>
                <div style={{ 
                  background: 'rgba(247,37,133,0.1)', 
                  color: 'var(--primary)', 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Check size={14} />
                </div>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '500' }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Tailor Membership Plans */}
      <section style={{ 
        padding: '5rem 1.5rem', 
        background: 'rgba(255,255,255,0.01)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Tailor Membership Plans</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Choose a membership plan designed to fit your production capacity</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {/* Basic Plan */}
            <div className="glass-card-no-hover" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Starter</span>
                <h3 style={{ color: 'var(--text-primary)', margin: '4px 0 10px 0', fontSize: '1.6rem' }}>Basic Plan</h3>
                <div style={{ margin: '15px 0', color: 'var(--text-primary)' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700' }}>₹0</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}> / month</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>Perfect for individual home tailors getting started.</p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Basic lead access</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Standard profile visibility</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Standard email support</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'line-through' }}><Check size={14} /> Featured vendor listing</li>
                </ul>
              </div>
              <button className="btn btn-secondary" onClick={onJoinClick} style={{ width: '100%', marginTop: '30px' }}>Get Started</button>
            </div>

            {/* Pro Plan */}
            <div className="glass-card-no-hover" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '2px solid var(--primary)', transform: 'scale(1.02)', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--primary)', color: '#fff', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase', fontWeight: '700' }}>Most Popular</span>
              <div>
                <span style={{ color: 'var(--primary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Grow</span>
                <h3 style={{ color: 'var(--text-primary)', margin: '4px 0 10px 0', fontSize: '1.6rem' }}>Pro Plan</h3>
                <div style={{ margin: '15px 0', color: 'var(--text-primary)' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700' }}>₹499</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}> / month</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>Ideal for professional tailors looking to double their orders.</p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Pro lead access (higher value)</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Higher profile visibility</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Priority chat & phone support</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Featured vendor tag</li>
                </ul>
              </div>
              <button className="btn btn-primary" onClick={onJoinClick} style={{ width: '100%', marginTop: '30px' }}>Upgrade to Pro</button>
            </div>

            {/* Premium Plan */}
            <div className="glass-card-no-hover" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Enterprise</span>
                <h3 style={{ color: 'var(--text-primary)', margin: '4px 0 10px 0', fontSize: '1.6rem' }}>Premium Plan</h3>
                <div style={{ margin: '15px 0', color: 'var(--text-primary)' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700' }}>₹999</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}> / month</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>Perfect for boutique shops and established custom outlets.</p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Unlimited lead access</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Maximum search visibility</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Dedicated relationship manager</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} style={{ color: 'var(--primary)' }} /> Top Featured listing placement</li>
                </ul>
              </div>
              <button className="btn btn-secondary" onClick={onJoinClick} style={{ width: '100%', marginTop: '30px' }}>Upgrade to Premium</button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Got questions? We have answers.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="glass-card-no-hover" 
                style={{ 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  border: activeFaq === idx ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                  transition: 'border-color 0.2s'
                }}
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HelpCircle size={16} style={{ color: 'var(--primary)' }} /> {faq.q}
                  </span>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: 'var(--text-secondary)'
                    }} 
                  />
                </button>
                
                {activeFaq === idx && (
                  <div style={{ 
                    padding: '0 20px 16px 20px', 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.9rem',
                    lineHeight: '1.45',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    paddingTop: '12px'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA Section */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'radial-gradient(circle, rgba(247,37,133,0.12) 0%, var(--bg-darker) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Start Your Tailoring Journey Today
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.4' }}>
            Register in minutes, setup your digital store catalog, and let customers find you online.
          </p>
          <button 
            className="btn btn-primary" 
            onClick={onJoinClick} 
            style={{ padding: '14px 36px', fontSize: '1rem', display: 'inline-flex', gap: '10px', alignItems: 'center' }}
          >
            Join StitchBee as a Tailor <ArrowRight size={18} />
          </button>
        </div>
      </section>

    </div>
  );
}
