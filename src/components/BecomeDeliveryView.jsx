import React, { useState, useEffect } from 'react';
import { 
  Truck, ArrowRight, Check, Star, HelpCircle, ChevronDown, 
  Clock, DollarSign, TrendingUp, Zap, Wallet, MapPin, 
  Smartphone, Award, UserCheck, ShieldCheck, CheckCircle,
  ChevronLeft, ChevronRight
} from 'lucide-react';

export default function BecomeDeliveryView({ onJoinClick }) {
  // Earnings calculator state
  const [calcDeliveries, setCalcDeliveries] = useState(15);
  
  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Carousel Configuration
  const carouselImages = [
    { url: '/delivery_hero_1.jpg', alt: "Delivery partner on scooter checking navigation map on smartphone" },
    { url: '/delivery_hero_2.jpg', alt: "Mockup map routing and delivery tracking overview" },
    { url: '/delivery_hero_3.jpg', alt: "StitchBee delivery partner carrying lightweight fashion package" },
    { url: '/delivery_hero_4.jpg', alt: "Courier partner picking up custom packages from boutique tailor" },
    { url: '/delivery_hero_5.jpg', alt: "Handing over premium packaged custom clothes to client with a smile" }
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

  // How It Works Carousel State
  const [activeWorksSlide, setActiveWorksSlide] = useState(0);

  // How It Works Steps
  const worksSteps = [
    {
      title: "Easy Onboarding",
      desc: "Register online, upload your ID and vehicle details, and get verified in under 24 hours.",
      img: "/delivery_works_2.jpg"
    },
    {
      title: "Careful Packaging",
      desc: "Wait for order notifications and secure the boutique outfits in high-quality clothing bags.",
      img: "/delivery_works_3.jpg"
    },
    {
      title: "Smart Pickups",
      desc: "Scan QR/barcodes on custom clothes at the tailor's studio to confirm pick-up details.",
      img: "/delivery_works_1.jpg"
    },
    {
      title: "Doorstep Delivery",
      desc: "Navigate to the customer's location and safely hand over the premium garments.",
      img: "/delivery_works_4.jpg"
    },
    {
      title: "High Earnings",
      desc: "Receive payments instantly, earn milestone bonuses, and cash out to your bank weekly.",
      img: "/delivery_works_5.jpg"
    }
  ];

  // How It Works Autoplay Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorksSlide((prev) => (prev + 1) % worksSteps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [worksSteps.length]);

  const handleWorksPrev = (e) => {
    e.stopPropagation();
    setActiveWorksSlide((prev) => (prev - 1 + worksSteps.length) % worksSteps.length);
  };

  const handleWorksNext = (e) => {
    e.stopPropagation();
    setActiveWorksSlide((prev) => (prev + 1) % worksSteps.length);
  };

  const handleStepClick = (idx) => {
    setActiveWorksSlide(idx);
  };

  // FAQ list
  const faqs = [
    {
      q: "Can I work part-time?",
      a: "Yes. You can log in whenever you want. You have full freedom to deliver part-time alongside your studies or other work."
    },
    {
      q: "Do I need my own vehicle?",
      a: "Yes. You will need your own bike, scooter, or bicycle to deliver clothes from tailors to customers."
    },
    {
      q: "How often do I get paid?",
      a: "Weekly. All your earnings, including delivery fees and bonuses, are transferred directly to your bank account every Monday."
    },
    {
      q: "Can I choose my working hours?",
      a: "Yes. You choose when you are active. There are no mandatory shifts or minimum hours."
    },
    {
      q: "Do I get incentives?",
      a: "Yes! We offer daily performance bonuses, weekend incentives, and extra support during peak festival seasons."
    }
  ];

  // Calculate earnings estimate based on slider
  const getEstimatedEarnings = (dailyCount) => {
    // Approx earning per delivery: ₹60 - ₹90 (includes basic fee + peak incentives)
    const minPerDel = 60;
    const maxPerDel = 90;
    const daysInMonth = 26;
    
    // Add monthly loyalty bonus if delivery volume is high
    let bonus = 0;
    if (dailyCount >= 25) bonus = 3000;
    else if (dailyCount >= 15) bonus = 1500;

    return {
      min: (dailyCount * minPerDel * daysInMonth + bonus).toLocaleString('en-IN'),
      max: (dailyCount * maxPerDel * daysInMonth + bonus).toLocaleString('en-IN')
    };
  };

  const estimated = getEstimatedEarnings(calcDeliveries);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div style={{ color: 'var(--text-color)', fontFamily: 'inherit' }}>
      
      {/* 1. Hero Section */}
      <section className="become-delivery-hero-section">
        <div className="delivery-container">
          
          {/* Left Column: Content */}
          <div className="become-delivery-hero-content">
            <span className="badge badge-primary" style={{ marginBottom: '1.5rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem', color: 'var(--primary)' }}>
              <Truck size={12} /> StitchBee Logistics Partner Program
            </span>
            <h1 className="become-delivery-hero-title">
              Deliver More. <span style={{ color: 'var(--primary)' }}>Earn More.</span> Work Freely.
            </h1>
            <p className="become-delivery-hero-subtitle">
              Join StitchBee as a delivery partner and earn by delivering custom-tailored outfits in your city.
            </p>
            
            <div className="become-delivery-hero-ctas">
              <button className="btn btn-primary" onClick={onJoinClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}>
                Join as Delivery Partner <ArrowRight size={16} />
              </button>
              <button className="btn btn-secondary" onClick={onJoinClick} style={{ padding: '12px 28px' }}>
                Start Earning Today
              </button>
            </div>

            {/* Trust Checklist Line */}
            <div className="become-delivery-hero-trust">
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Flexible Working Hours</span>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Weekly Payments</span>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Extra Incentives</span>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Fast Onboarding</span>
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
                          textAlign: 'left',
                          zIndex: 4
                        }}>
                          <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: 0, fontWeight: '700', letterSpacing: '-0.3px', lineHeight: '1.3' }}>
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
      <section className="become-delivery-why-join-section">
        <div className="delivery-container">
          
          <div className="why-join-split-container">
            
            {/* Left Column: Benefits Content */}
            <div className="why-join-content-col">
              <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Why Delivery Partners Choose StitchBee</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: 0 }}>The absolute best way to monetize your rides with zero mess</p>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                gap: '20px' 
              }}>
                {[
                  { title: "Flexible Hours", desc: "Work whenever you want. Log in and log out on your own terms.", icon: <Clock size={18} /> },
                  { title: "Good Earnings", desc: "Earn competitive rates per delivery plus milestone weekly bonuses.", icon: <DollarSign size={18} /> },
                  { title: "More Orders", desc: "Consistent courier orders directly from active boutique tailors in your local area.", icon: <TrendingUp size={18} /> },
                  { title: "Fuel Incentives", desc: "Extra distance payouts and support during peak rainfall or festival seasons.", icon: <Zap size={18} /> },
                  { title: "Weekly Payments", desc: "Your earnings are processed securely and sent directly to your bank account.", icon: <Wallet size={18} /> },
                  { title: "Easy App Tracking", desc: "Manage pickups and navigate destinations smoothly with the StitchBee App.", icon: <MapPin size={18} /> }
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

            {/* Right Column: Visual Showcase */}
            <div className="why-join-delivery-visual-col">
              <div className="delivery-premium-card-wrapper">
                <img 
                  src="/delivery_premium.png" 
                  alt="Premium clothing garment package being handled with care" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                  padding: '20px',
                  textAlign: 'left'
                }}>
                  <span className="badge badge-primary" style={{ marginBottom: '8px', fontSize: '0.65rem', color: 'var(--primary)' }}>Fashion Courier Class</span>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: 0, fontWeight: '700' }}>Premium Fabric Handling</h4>
                  <p style={{ color: '#e2e8f0', fontSize: '0.75rem', margin: '4px 0 0 0', opacity: 0.9 }}>Every delivery contains protected, high-value custom wear.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Earnings Potential */}
      <section style={{ 
        padding: '5rem 1.5rem', 
        background: 'rgba(255,255,255,0.01)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Your Time = Your Income</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Calculate your potential monthly income as a logistics partner</p>
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
                  <span style={{ color: 'var(--text-secondary)' }}>Deliveries Per Day</span>
                  <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{calcDeliveries} Deliveries</strong>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="45" 
                  value={calcDeliveries}
                  onChange={(e) => setCalcDeliveries(parseInt(e.target.value))}
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
                    <th style={{ padding: '12px 8px', color: 'var(--text-primary)' }}>Deliveries Per Day</th>
                    <th style={{ padding: '12px 8px', color: 'var(--text-primary)', textAlign: 'right' }}>Monthly Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 8px' }}>10 Deliveries</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>₹12,000 – ₹20,000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 8px' }}>20 Deliveries</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>₹25,000 – ₹40,000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 8px' }}>30+ Deliveries</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--primary)', fontWeight: '700' }}>₹50,000+</td>
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
                “More deliveries. More bonuses. More growth.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="become-delivery-works-section" style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="delivery-container" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Column: Timeline Steps */}
          <div className="delivery-works-steps-col" style={{ flex: 1.2 }}>
            <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>How It Works</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Start delivering in 5 simple steps</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
              {/* Timeline track connector line */}
              <div style={{ 
                position: 'absolute', 
                left: '20px', 
                top: '20px', 
                bottom: '20px', 
                width: '2px', 
                background: 'linear-gradient(to bottom, var(--primary), rgba(255,255,255,0.06))',
                zIndex: 1
              }} />

              {worksSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  style={{ display: 'flex', gap: '20px', alignItems: 'center', zIndex: 2, cursor: 'pointer' }}
                  onClick={() => handleStepClick(idx)}
                >
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: '50%', 
                    background: activeWorksSlide === idx ? 'var(--primary)' : 'var(--bg-card)', 
                    border: '2px solid var(--primary)', 
                    color: activeWorksSlide === idx ? '#fff' : 'var(--text-primary)', 
                    fontWeight: '700',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: activeWorksSlide === idx ? '0 0 15px rgba(247,37,133,0.4)' : 'none',
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>
                  <div className={`glass-card-no-hover ${activeWorksSlide === idx ? 'active-step-card' : ''}`} style={{ 
                    padding: '16px 20px', 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    border: activeWorksSlide === idx ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                    background: activeWorksSlide === idx ? 'rgba(247, 37, 133, 0.08)' : 'var(--bg-card)',
                    transition: 'all 0.3s ease'
                  }}>
                    <h4 style={{ color: 'var(--text-primary)', margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: '600' }}>{step.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.85rem', lineHeight: '1.4' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Carousel Card */}
          <div className="delivery-works-carousel-col" style={{ flex: 0.8, width: '100%' }}>
            <div className="works-carousel-wrapper" style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--primary)',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 15px rgba(247,37,133,0.15)',
              height: '400px'
            }}>
              {worksSteps.map((step, idx) => (
                <div 
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: activeWorksSlide === idx ? 1 : 0,
                    visibility: activeWorksSlide === idx ? 'visible' : 'hidden',
                    transition: 'opacity 0.6s ease, visibility 0.6s ease',
                    zIndex: activeWorksSlide === idx ? 2 : 1
                  }}
                >
                  <img 
                    src={step.img} 
                    alt={step.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Text Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    padding: '24px 20px 20px 20px',
                    textAlign: 'left',
                    color: '#fff',
                    zIndex: 3
                  }}>
                    <span className="badge badge-primary" style={{ marginBottom: '8px', display: 'inline-flex', fontSize: '0.65rem' }}>
                      Step {idx + 1} of 5
                    </span>
                    <h4 style={{ color: '#fff', fontSize: '1.2rem', margin: '0 0 6px 0', fontWeight: '700' }}>
                      {step.title}
                    </h4>
                    <p style={{ color: '#e2e8f0', fontSize: '0.85rem', margin: 0, opacity: 0.9 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button 
                onClick={handleWorksPrev} 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  zIndex: 10,
                  backdropFilter: 'blur(4px)',
                  transition: 'background 0.2s',
                  padding: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={handleWorksNext} 
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  zIndex: 10,
                  backdropFilter: 'blur(4px)',
                  transition: 'background 0.2s',
                  padding: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
              >
                <ChevronRight size={18} />
              </button>

              {/* Indicators */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                display: 'flex',
                gap: '6px',
                zIndex: 10
              }}>
                {worksSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveWorksSlide(idx)}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: activeWorksSlide === idx ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      boxShadow: activeWorksSlide === idx ? '0 0 8px var(--primary)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. What Will You Deliver? */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>What Will You Deliver?</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Fashion garments that are clean, lightweight, and easy to carry</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
            gap: '16px' 
          }}>
            {[
              "Shirts", "Pants", "Suits", "Blazers", "Kurtas", 
              "Dresses", "Altered Clothes", "Custom Orders", "Bulk Uniform Orders"
            ].map((item, idx) => (
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
                  background: 'rgba(247,37,133,0.08)', 
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
                <h5 style={{ color: 'var(--text-primary)', margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: '600' }}>{item}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why It’s Different */}
      <section style={{ 
        padding: '5rem 1.5rem', 
        borderBottom: '1px solid var(--border-color)',
        background: 'radial-gradient(circle at center, rgba(247,37,133,0.05) 0%, rgba(0,0,0,0) 70%)'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Not Food. Premium Fashion Deliveries.</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Say goodbye to smelly bags, heavy loads, and messy soup spills</p>
          </div>

          <div className="glass-card-no-hover" style={{ padding: '36px', border: '1px solid var(--primary)' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '24px' 
            }}>
              {[
                { title: "Lightweight Packages", desc: "No massive containers. Mostly light garment boxes and clothing hangers." },
                { title: "No Messy Deliveries", desc: "Zero food leakage, soup spillages, or bad food odours in your carrier bag." },
                { title: "Higher-Value Orders", desc: "Deliver premium custom wear which means customers value your handling care." },
                { title: "Premium Customer Base", desc: "Connect with high-end boutique customers who appreciate reliable delivery." },
                { title: "Better Tips", desc: "Safe, high-care garment transport is consistently rewarded with generous customer tips." }
              ].map((diff, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: 'var(--primary)', marginTop: '2px' }}>
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--text-primary)', margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: '700' }}>{diff.title}</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0, lineHeight: '1.4' }}>{diff.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Partner Success Stories */}
      <section style={{ 
        padding: '5rem 1.5rem', 
        background: 'rgba(255,255,255,0.01)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Partner Success Stories</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Hear from riders who earn on their own terms with StitchBee</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {[
              {
                quote: "I earn part-time while managing my college studies. Logging in for just 3 hours daily gives me enough pocket money.",
                author: "Vikram R.",
                role: "College Student & Part-Time Rider",
                rating: 5,
                joined: "Joined 4 months ago"
              },
              {
                quote: "Flexible timing helped me increase my overall monthly income. I do boutique courier runs during my morning slots.",
                author: "Sanjay M.",
                role: "Freelance Gig Executive",
                rating: 5,
                joined: "Joined 9 months ago"
              },
              {
                quote: "StitchBee clothing deliveries are much easier than food delivery. Packages are light and tailors treat us like partners.",
                author: "Ramesh K.",
                role: "Full-Time Logistics Partner",
                rating: 5,
                joined: "Joined 1 year ago"
              }
            ].map((test, idx) => (
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

      {/* 8. Growth Opportunities */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Grow With StitchBee</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>We don't just offer runs—we build paths for long-term career growth</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '20px'
          }}>
            {[
              "Become a premium delivery partner",
              "Earn high performance weekly bonuses",
              "Build and manage your own delivery team",
              "Access high-priority delivery time slots",
              "Increase your overall monthly income streams"
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

      {/* 9. Requirements to Join */}
      <section style={{ 
        padding: '5rem 1.5rem', 
        background: 'rgba(255,255,255,0.01)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ maxWidth: '950px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Requirements to Join</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Ensure you have the following basic details ready to get started</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '20px' 
          }}>
            {[
              { label: "Age 18+", desc: "Must be at least 18 years old.", icon: <Award size={18} /> },
              { label: "Smartphone", desc: "An Android or iOS phone with active internet connection.", icon: <Smartphone size={18} /> },
              { label: "Bike/Scooter", desc: "A two-wheeler with valid registration.", icon: <Truck size={18} /> },
              { label: "Valid Driving License", desc: "Active license to drive in your state.", icon: <UserCheck size={18} /> },
              { label: "Aadhaar Card / ID Proof", desc: "Required for background verification checks.", icon: <ShieldCheck size={18} /> },
              { label: "Active Bank Account", desc: "For secure weekly direct bank payouts.", icon: <Wallet size={18} /> }
            ].map((req, idx) => (
              <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ 
                  background: 'rgba(247,37,133,0.1)', 
                  color: 'var(--primary)', 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {req.icon}
                </div>
                <div>
                  <h5 style={{ color: 'var(--text-primary)', margin: '0 0 2px 0', fontSize: '0.95rem', fontWeight: '600' }}>{req.label}</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>{req.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
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
                    borderTop: '1px solid var(--border-color)',
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

      {/* 11. Final CTA Section */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'radial-gradient(circle, rgba(247,37,133,0.12) 0%, var(--bg-darker) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Start Delivering With StitchBee Today
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.4' }}>
            Get registered in a few steps, complete your verification, and start taking local garment deliveries.
          </p>
          <button 
            className="btn btn-primary" 
            onClick={onJoinClick} 
            style={{ padding: '14px 36px', fontSize: '1rem', display: 'inline-flex', gap: '10px', alignItems: 'center' }}
          >
            Become a Delivery Partner <ArrowRight size={18} />
          </button>
        </div>
      </section>

    </div>
  );
}
