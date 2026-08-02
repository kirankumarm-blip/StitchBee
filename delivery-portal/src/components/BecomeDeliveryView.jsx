import React, { useState, useEffect } from 'react';
import { 
  Truck, ArrowRight, Check, Star, HelpCircle, ChevronDown, 
  Clock, DollarSign, TrendingUp, Zap, Wallet, MapPin, 
  Smartphone, Award, UserCheck, ShieldCheck, CheckCircle,
  ChevronLeft, ChevronRight, Users, Gift, Shield, ThumbsUp, Calendar, Calculator, Headphones
} from 'lucide-react';

const allTestimonials = [
  {
    author: "Vikram R.",
    role: "College Student & Part-Time Rider",
    quote: "I earn ₹900–₹1200 every day after college. StitchBee gives me the freedom I always wanted.",
    earnings: "₹22,000/month",
    hours: "4 hrs/day",
    location: "Bangalore",
    joined: "Joined 4 months ago",
    avatar: "/alt_al1.jpg"
  },
  {
    author: "Sanjay M.",
    role: "Freelance Gig Executive",
    quote: "After joining StitchBee, I now earn ₹32,000 every month while studying.",
    earnings: "₹32,000+ Monthly Earnings",
    hours: "5–6 hrs/day Flexible Hours",
    location: "Mumbai Location",
    joined: "Joined 9 months ago",
    avatar: "/alt_al2.jpg"
  },
  {
    author: "Ramesh K.",
    role: "Full-Time Logistics Partner",
    quote: "StitchBee deliveries are much easier than food delivery. Packages are light and tailors treat us like partners.",
    earnings: "₹38,500/month",
    hours: "8 hrs/day",
    location: "Hyderabad",
    joined: "Joined 1 year ago",
    avatar: "/alt_al3.jpg"
  },
  {
    author: "Anil P.",
    role: "Delivery Specialist",
    quote: "StitchBee's customer tips are amazing. Deliveries are lightweight, so I can complete more runs daily.",
    earnings: "₹28,000/month",
    hours: "5 hrs/day",
    location: "Delhi",
    joined: "Joined 6 months ago",
    avatar: "/alt_al4.jpg"
  },
  {
    author: "Kiran G.",
    role: "Weekend Courier Partner",
    quote: "I ride only on weekends. Earning ₹8,000 extra every month helps me pay my bike loan easily.",
    earnings: "₹12,500/month",
    hours: "6 hrs/day",
    location: "Pune",
    joined: "Joined 8 months ago",
    avatar: "/alt_al5.jpg"
  },
  {
    author: "Deepak S.",
    role: "Full-Time Fleet Partner",
    quote: "The dedicated partner support solves any delivery issue instantly. Highly professional platform.",
    earnings: "₹41,000/month",
    hours: "8 hrs/day",
    location: "Chennai",
    joined: "Joined 1.5 years ago",
    avatar: "/alt_al6.jpg"
  }
];

export default function BecomeDeliveryView({ onJoinClick }) {
  // Earnings calculator states
  const [calcDeliveries, setCalcDeliveries] = useState(15);
  const [calcHours, setCalcHours] = useState(6);
  const [calcDays, setCalcDays] = useState(26);
  
  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);
  const [earningsCount, setEarningsCount] = useState(0);

  // 3D Phone Mockup Tilt & Counter states
  const [tilt, setTilt] = useState({ rotateX: 12, rotateY: -18 });
  const [liveEarnings, setLiveEarnings] = useState(1850);
  const [liveDeliveries, setLiveDeliveries] = useState(12);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Calculate tilt values (tilt max 8 degrees)
    const rotateY = (x / (box.width / 2)) * 8;
    const rotateX = -(y / (box.height / 2)) * 8;
    
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    // Return back to standard 3D depth angles: rotateY(-18deg), rotateX(12deg)
    setTilt({ rotateX: 12, rotateY: -18 });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEarnings((prev) => {
        if (prev === 1850) {
          setLiveDeliveries(13);
          return 1875;
        }
        if (prev === 1875) {
          setLiveDeliveries(14);
          return 1900;
        }
        setLiveDeliveries(12);
        return 1850;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 12) > 1250 ? 0 : (current + 12);
      setEarningsCount(current);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Scroll reveal IntersectionObserver logic for premium slide-in scroll animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-3d-phone');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1, // trigger early when 10% of element is in view
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Carousel Configuration
  const carouselImages = [
    { url: './delivery_hero_1.jpg', alt: "Delivery partner on scooter checking navigation map on smartphone" },
    { url: './delivery_hero_2.jpg', alt: "Mockup map routing and delivery tracking overview" },
    { url: './delivery_hero_3.jpg', alt: "StitchBee delivery partner carrying lightweight fashion package" },
    { url: './delivery_hero_4.jpg', alt: "Courier partner picking up custom packages from boutique tailor" },
    { url: './delivery_hero_5.jpg', alt: "Handing over premium packaged custom clothes to client with a smile" }
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
      img: "./delivery_works_2.jpg"
    },
    {
      title: "Careful Packaging",
      desc: "Wait for order notifications and secure the boutique outfits in high-quality clothing bags.",
      img: "./delivery_works_3.jpg"
    },
    {
      title: "Smart Pickups",
      desc: "Scan QR/barcodes on custom clothes at the tailor's studio to confirm pick-up details.",
      img: "./delivery_works_1.jpg"
    },
    {
      title: "Doorstep Delivery",
      desc: "Navigate to the customer's location and safely hand over the premium garments.",
      img: "./delivery_works_4.jpg"
    },
    {
      title: "High Earnings",
      desc: "Receive payments instantly, earn milestone bonuses, and cash out to your bank weekly.",
      img: "./delivery_works_5.jpg"
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

  // Calculate earnings estimate based on sliders
  const getEstimatedEarnings = (deliveries, hours, days) => {
    // Formula: (Deliveries * 80 + Hours * 15 + 37) * Days
    const val = (deliveries * 80 + hours * 15 + 37) * days;
    // Round to nearest 50
    const rounded = Math.round(val / 50) * 50;
    return rounded.toLocaleString('en-IN');
  };

  const estimated = getEstimatedEarnings(calcDeliveries, calcHours, calcDays);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div style={{ color: 'var(--text-color)', fontFamily: 'inherit' }}>
      
      {/* 1. Hero Section */}
      <section className="become-delivery-hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* Loop Video Background of Delivery Partner */}
        <video
          src="/DeliveryPartner.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hero-partner-video"
        />

        <div className="delivery-container" style={{ position: 'relative', zIndex: 2 }}>
          
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

          {/* Right Column: Layout Spacer */}
          <div className="hero-interactive-column" />

        </div>
      </section>

      {/* 2. Stats Ribbon Banner */}
      <section className="delivery-stats-ribbon-section" style={{ padding: '0 1.5rem', marginTop: '-35px', position: 'relative', zIndex: 30 }}>
        <div className="delivery-stats-ribbon-container">
          <div className="delivery-stats-ribbon-row">
            {/* Stat 1 */}
            <div className="delivery-stat-item">
              <div className="delivery-stat-icon-wrapper" style={{ background: 'rgba(247,37,133,0.12)', color: 'var(--primary)' }}>
                <Users size={22} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div className="delivery-stat-number">10K+</div>
                <div className="delivery-stat-label">Active Delivery Partners</div>
              </div>
            </div>

            <div className="delivery-stat-divider" />

            {/* Stat 2 */}
            <div className="delivery-stat-item">
              <div className="delivery-stat-icon-wrapper" style={{ background: 'rgba(76,201,240,0.12)', color: 'var(--accent)' }}>
                <Wallet size={22} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div className="delivery-stat-number">₹25K+</div>
                <div className="delivery-stat-label">Average Monthly Earnings</div>
              </div>
            </div>

            <div className="delivery-stat-divider" />

            {/* Stat 3 */}
            <div className="delivery-stat-item">
              <div className="delivery-stat-icon-wrapper" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
                <Award size={22} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div className="delivery-stat-number">95%</div>
                <div className="delivery-stat-label">Partner Satisfaction</div>
              </div>
            </div>

            <div className="delivery-stat-divider" />

            {/* Stat 4 */}
            <div className="delivery-stat-item">
              <div className="delivery-stat-icon-wrapper" style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}>
                <Clock size={22} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div className="delivery-stat-number">Flexible</div>
                <div className="delivery-stat-label">Work on Your Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose StitchBee (More Benefits. More Freedom. Redesigned) */}
      <section id="delivery-benefits" className="become-delivery-why-join-section" style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Decorative background glows & particles behind the phone */}
        <div className="phone-back-effects">
          <div className="phone-glow-blob" />
          <div className="phone-light-rays" />
          <div className="phone-glass-circle circle-1" />
          <div className="phone-glass-circle circle-2" />
          <div className="phone-particles">
            <div className="particle p1" />
            <div className="particle p2" />
            <div className="particle p3" />
            <div className="particle p4" />
          </div>
        </div>

        <div style={{ maxWidth: '1320px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div className="delivery-benefits-three-col-layout">
            
            {/* Column 1: Animated 3D Phone Mockup & Floating Cards */}
            <div className="phone-animation-column reveal-3d-phone">
              <div 
                className="interactive-phone-perspective-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Floating Cards around the phone */}
                <div className="floating-card-v3 card-rating">
                  <span className="star-icon">⭐</span> 4.9
                </div>
                <div className="floating-card-v3 card-earnings">
                  ₹{liveEarnings}
                </div>
                <div className="floating-card-v3 card-deliveries">
                  📦 {liveDeliveries}
                </div>
                <div className="floating-card-v3 card-status">
                  <span className="live-dot-v3" /> Live
                </div>

                {/* The 3D Phone Body */}
                <div 
                  className="phone-body-3d"
                  style={{
                    transform: `rotateY(${tilt.rotateY}deg) rotateX(${tilt.rotateX}deg)`
                  }}
                >
                  <div className="phone-inner-screen">
                    <div className="phone-notch" />
                    
                    {/* Screen App Layout */}
                    <div className="phone-app-container">
                      <div className="phone-app-header">
                        <span>Hello, Partner 👋</span>
                      </div>
                      
                      {/* Earnings widget */}
                      <div className="phone-app-earnings-widget">
                        <span className="widget-label">Today's Earnings</span>
                        <div className="widget-value-row">
                          <strong className="widget-value">₹{liveEarnings}</strong>
                          <span className="widget-trend">↑</span>
                        </div>
                        <span className="widget-deliveries">{liveDeliveries} Deliveries</span>
                      </div>

                      {/* Recent Order notification widget */}
                      <div className="phone-app-notification">
                        <div className="notif-header">
                          <span className="notif-tag">Recent Order</span>
                          <span className="notif-status">Delivered</span>
                        </div>
                        <div className="notif-body">
                          <strong>#SB1234</strong>
                          <strong>₹160</strong>
                        </div>
                      </div>

                      {/* Interactive Route Map widget */}
                      <div className="phone-app-map-widget">
                        <div className="map-gps-route">
                          <span className="gps-start">●</span>
                          <div className="gps-line-container">
                            <div className="gps-line-progress" />
                          </div>
                          <span className="gps-end">►</span>
                        </div>
                        <div className="map-pin-indicator">
                          <span className="bouncing-pin">📍</span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Bullet points & Info */}
            <div className="benefits-middle-info-col reveal-left">
              <h3 className="middle-col-title">
                Everything You Need,<br />In <span className="highlight-pink-text">One App</span>
              </h3>
              
              <ul className="benefits-bullet-list">
                <li>
                  <span className="bullet-icon-box pink"><Zap size={18} /></span>
                  <div className="bullet-text-box">
                    <strong>Get real-time delivery requests</strong>
                  </div>
                </li>
                <li>
                  <span className="bullet-icon-box purple"><MapPin size={18} /></span>
                  <div className="bullet-text-box">
                    <strong>Navigate easily with in-app maps</strong>
                  </div>
                </li>
                <li>
                  <span className="bullet-icon-box pink"><TrendingUp size={18} /></span>
                  <div className="bullet-text-box">
                    <strong>Track earnings and payouts</strong>
                  </div>
                </li>
                <li>
                  <span className="bullet-icon-box purple"><Headphones size={18} /></span>
                  <div className="bullet-text-box">
                    <strong>Get 24/7 partner support</strong>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: App Downloads & QR */}
            <div className="benefits-right-download-col reveal-right">
              <h4 className="download-title">Download the StitchBee<br />Partner App</h4>
              
              <div className="store-buttons-container">
                <div className="store-badge-v3 play-store">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M3.609,1.814 C3.38,2.043 3.25,2.4 3.25,2.86 L3.25,21.14 C3.25,21.6 3.38,21.957 3.609,22.186 L3.684,22.251 L13.882,12.053 L13.882,11.947 L3.684,1.749 L3.609,1.814 Z" fill="#00E5FF"/>
                    <path d="M17.272,15.448 L13.882,12.057 L13.882,11.943 L17.273,8.552 L17.348,8.595 L21.365,10.878 C22.513,11.53 22.513,12.47 21.365,13.122 L17.348,15.405 L17.272,15.448 Z" fill="#FFC107"/>
                    <path d="M3.684,1.749 L13.882,11.947 L17.272,8.557 L3.684,1.749 Z" fill="#FF3D00"/>
                    <path d="M3.684,22.251 L17.272,15.443 L13.882,12.053 L3.684,22.251 Z" fill="#4CAF50"/>
                  </svg>
                  <div className="store-badge-text">
                    <span className="store-pre">GET IT ON</span>
                    <span className="store-main">Google Play</span>
                  </div>
                </div>
                
                <div className="store-badge-v3 app-store">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M18.71,19.5 C17.88,20.74 17,21.95 15.66,21.97 C14.32,22 13.89,21.18 12.37,21.18 C10.84,21.18 10.37,21.95 9.1,22 C7.79,22.05 6.8,20.68 5.96,19.47 C4.25,17 2.94,12.45 4.7,9.39 C5.57,7.87 7.13,6.91 8.82,6.88 C10.1,6.86 11.32,7.75 12.11,7.75 C12.89,7.75 14.37,6.68 15.92,6.84 C16.57,6.87 18.39,7.1 19.56,8.82 C19.47,8.88 17.39,10.1 17.41,12.63 C17.44,15.65 20.06,16.66 20.1,16.67 C20.08,16.74 19.67,18.11 18.71,19.5 M15.97,4.17 C16.63,3.37 17.07,2.28 16.95,1 C15.85,1.04 14.51,1.73 13.73,2.64 C13.07,3.41 12.49,4.52 12.64,5.78 C13.87,5.87 15.12,5.17 15.97,4.17 Z" fill="currentColor"/>
                  </svg>
                  <div className="store-badge-text">
                    <span className="store-pre">Download on the</span>
                    <span className="store-main">App Store</span>
                  </div>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="qr-download-card">
                <div className="qr-code-wrapper">
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                    <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" fill="currentColor" />
                    <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" fill="currentColor" />
                    <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" fill="currentColor" />
                    <path d="M35,5 h5 v10 h-5 z M45,0 h10 v5 h-10 z M60,5 h5 v5 h-5 z" fill="currentColor" />
                    <path d="M35,20 h15 v5 h-15 z M55,15 h10 v5 h-10 z M60,25 h10 v5 h-10 z" fill="currentColor" />
                    <path d="M35,35 h5 v15 h-5 z M45,40 h15 v5 h-15 z M50,50 h10 v10 h-10 z" fill="currentColor" />
                    <path d="M5,35 h10 v5 h-10 z M15,45 h5 v10 h-5 z M25,40 h5 v5 h-5 z M20,55 h10 v5 h-10 z" fill="currentColor" />
                    <path d="M70,35 h15 v5 h-15 z M80,45 h10 v5 h-10 z M75,55 h5 v15 h-5 z M85,60 h15 v5 h-15 z" fill="currentColor" />
                    <path d="M35,70 h10 v5 h-10 z M45,80 h5 v15 h-5 z M55,75 h15 v5 h-15 z M60,85 h10 v10 h-10 z" fill="currentColor" />
                    <path d="M35,60 h5 v5 h-5 z M45,60 h5 v5 h-5 z M55,60 h5 v5 h-5 z" fill="currentColor" />
                  </svg>
                </div>
                <span className="qr-card-label">Scan to Download Android App</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose StitchBee (More Benefits. More Freedom. Old Cards Grid Restored) */}
      <section className="become-delivery-why-join-section" style={{ padding: '7rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Decorative background glows */}
        <div className="why-join-glow-pink" />
        <div className="why-join-glow-purple" />

        <div style={{ maxWidth: '1320px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <div className="delivery-benefits-main-split-container">
            
            {/* Left Side: Headline & 3x2 Grid of 6 Premium Cards */}
            <div className="delivery-benefits-left-col reveal-left">
              <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
                <span className="premium-section-badge">
                  WHY CHOOSE STITCHBEE?
                </span>
                <h2 className="become-delivery-why-join-title">
                  More Benefits. More Freedom.
                </h2>
                <p className="premium-supporting-text">
                  Everything you need to earn more, work flexibly, and grow with India's fastest tailoring delivery platform.
                </p>
              </div>

              {/* 3x2 Grid of 6 cards */}
              <div className="delivery-benefits-3x2-grid">
                
                {/* Card 1 */}
                <div className="delivery-premium-feature-card">
                  <div className="premium-card-icon-wrapper grad-pink">
                    <Clock size={20} />
                  </div>
                  <h4 className="premium-card-title">Work on Your Terms</h4>
                  <p className="premium-card-desc">Choose your own working hours and deliver at your convenience.</p>
                </div>

                {/* Card 2 */}
                <div className="delivery-premium-feature-card">
                  <div className="premium-card-icon-wrapper grad-purple">
                    <DollarSign size={20} />
                  </div>
                  <h4 className="premium-card-title">Higher Earnings</h4>
                  <p className="premium-card-desc">Earn competitive rates per delivery plus milestone weekly bonuses.</p>
                </div>

                {/* Card 3 */}
                <div className="delivery-premium-feature-card">
                  <div className="premium-card-icon-wrapper grad-red">
                    <Zap size={20} />
                  </div>
                  <h4 className="premium-card-title">Weekly Payouts</h4>
                  <p className="premium-card-desc">Get paid every week with secure, instant, and on-time transfers.</p>
                </div>

                {/* Card 4 */}
                <div className="delivery-premium-feature-card">
                  <div className="premium-card-icon-wrapper grad-blue">
                    <Shield size={20} />
                  </div>
                  <h4 className="premium-card-title">Accident Insurance</h4>
                  <p className="premium-card-desc">Comprehensive accidental insurance and medical coverage always with you.</p>
                </div>

                {/* Card 5 */}
                <div className="delivery-premium-feature-card">
                  <div className="premium-card-icon-wrapper grad-yellow">
                    <UserCheck size={20} />
                  </div>
                  <h4 className="premium-card-title">Dedicated Partner Support</h4>
                  <p className="premium-card-desc">Get 24/7 dedicated support for any delivery issues or queries.</p>
                </div>

                {/* Card 6 */}
                <div className="delivery-premium-feature-card">
                  <div className="premium-card-icon-wrapper grad-pink2">
                    <Users size={20} />
                  </div>
                  <h4 className="premium-card-title">Growing Community</h4>
                  <p className="premium-card-desc">Join a growing community that respects, supports, and values you.</p>
                </div>

              </div>
            </div>

            {/* Right Side: Onboarding Panel with 3D Rotating Phone Mockup & Glassmorphism CTA card */}
            <div className="delivery-signup-right-col reveal-right">
              
              {/* Phone Mockup with 3D Rotation */}
              <div className="delivery-phone-overlapping-frame-3d">
                <div className="delivery-phone-glow-bg" />
                <div className="delivery-phone-screen-small">
                  <div className="delivery-phone-notch-small" />
                  
                  {/* Phone App Content */}
                  <div className="delivery-app-content-small">
                    <div className="delivery-app-header-small">
                      <span>Hello, Partner 👋</span>
                    </div>

                    <div className="delivery-app-stats-grid-small">
                      <div className="delivery-app-stat-box-small">
                        <span className="delivery-app-stat-label-small">Deliveries</span>
                        <strong className="delivery-app-stat-val-small">12</strong>
                      </div>
                      <div className="delivery-app-stat-box-small">
                        <span className="delivery-app-stat-label-small">Earnings</span>
                        <strong className="delivery-app-stat-val-small" style={{ color: '#10b981' }}>₹1,850</strong>
                      </div>
                    </div>

                    <div className="delivery-app-list-title-small">Recent Deliveries</div>

                    <div className="delivery-app-deliveries-list-small">
                      <div className="delivery-app-list-item-small">
                        <div style={{ textAlign: 'left' }}>
                          <div className="order-title">Order #SB1234</div>
                          <div className="order-status">Delivered</div>
                        </div>
                        <strong>₹160</strong>
                      </div>

                      <div className="delivery-app-list-item-small">
                        <div style={{ textAlign: 'left' }}>
                          <div className="order-title">Order #SB1235</div>
                          <div className="order-status">Delivered</div>
                        </div>
                        <strong>₹220</strong>
                      </div>

                      <div className="delivery-app-list-item-small">
                        <div style={{ textAlign: 'left' }}>
                          <div className="order-title">Order #SB1236</div>
                          <div className="order-status">Delivered</div>
                        </div>
                        <strong>₹150</strong>
                      </div>
                    </div>

                    <div style={{ width: '50px', height: '2px', background: '#cbd5e1', borderRadius: '1px', margin: 'auto auto 2px auto' }} />
                  </div>
                </div>

                {/* Floating Notifications */}
                <div className="floating-noti notification-earnings">
                  <div className="noti-icon-badge"><Zap size={10} /></div>
                  <div className="noti-text-block">
                    <span>Weekly Payout</span>
                    <strong>₹12,400 Received!</strong>
                  </div>
                </div>

                <div className="floating-noti notification-received">
                  <div className="noti-icon-badge noti-green"><CheckCircle size={10} /></div>
                  <div className="noti-text-block">
                    <span>Order Delivered</span>
                    <strong>Earned +₹220</strong>
                  </div>
                </div>

                <div className="floating-noti notification-wallet">
                  <div className="noti-icon-badge noti-blue"><Wallet size={10} /></div>
                  <div className="noti-text-block">
                    <span>Wallet Balance</span>
                    <strong>₹4,850.00</strong>
                  </div>
                </div>
              </div>

              {/* Glassmorphism CTA Signup Card */}
              <div className="delivery-glass-signup-card">
                <h3 className="delivery-signup-card-title-small">Your Journey Starts Here!</h3>
                <p className="delivery-signup-card-desc-small">Sign up in less than 2 minutes and start earning with every delivery.</p>
                
                <button className="delivery-signup-card-btn-gradient" onClick={onJoinClick}>
                  Join Now <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </button>

                <div className="delivery-signup-card-footer-small" style={{ textAlign: 'center', width: '100%', marginTop: '8px' }}>
                  <span className="delivery-signup-card-trust-text-small" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    ❤️ Loved by <strong>10,000+</strong> partners
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Premium Full-Width Glass Bottom Banner */}
          <div className="delivery-premium-glass-banner">
            <div className="banner-left-glow" />
            <div className="banner-content-wrapper">
              <div className="banner-icon-title-block">
                <div className="banner-gift-icon-box">
                  <Gift size={20} />
                </div>
                <span className="banner-text">
                  Complete your first 5 deliveries and unlock your <strong className="glow-accent-text">Welcome Bonus!</strong>
                </span>
              </div>
              <button className="banner-gradient-btn" onClick={onJoinClick}>
                Start Earning Today <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Earnings Potential */}
      <section id="delivery-earnings" className="earnings-calc-section-v3" style={{ 
        padding: '7rem 1.5rem', 
        background: 'rgba(255,255,255,0.01)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="calc-badge-top-centered">
              <Calculator size={12} /> Calculate Your Potential
            </div>
            <h2 className="calc-heading-v3">
              Your Time = <span className="highlight-pink-text">Your Income</span>
            </h2>
            <p className="calc-supporting-text-v3">
              See how much you can earn as a StitchBee delivery partner
            </p>
          </div>

          {/* Grid Layout */}
          <div className="earnings-calc-grid-v3">
            
            {/* Left Card: Interactive Calculator */}
            <div className="calc-card-v3 reveal-left">
              <div className="calc-card-header-v3">
                <div className="calc-header-icon-box">
                  <Calculator size={20} />
                </div>
                <h3 className="calc-card-title-v3">Estimate Your Monthly Earnings</h3>
              </div>

              {/* Slider 1: Deliveries Per Day */}
              <div className="calc-slider-block-v3">
                <div className="slider-header-v3">
                  <span className="slider-label-name">Deliveries Per Day</span>
                  <span className="slider-value-display pink-text">{calcDeliveries} Deliveries</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="30" 
                  value={calcDeliveries}
                  onChange={(e) => setCalcDeliveries(parseInt(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="slider-ticks-v3">
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                  <span>30+</span>
                </div>
              </div>

              {/* Slider 2: Hours Available Per Day */}
              <div className="calc-slider-block-v3">
                <div className="slider-header-v3">
                  <span className="slider-label-name">Hours Available Per Day</span>
                  <span className="slider-value-display pink-text">{calcHours} Hours</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="10" 
                  value={calcHours}
                  onChange={(e) => setCalcHours(parseInt(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="slider-ticks-v3">
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                  <span>8</span>
                  <span>10+</span>
                </div>
              </div>

              {/* Slider 3: Days Working Per Month */}
              <div className="calc-slider-block-v3">
                <div className="slider-header-v3">
                  <span className="slider-label-name">Days Working Per Month</span>
                  <span className="slider-value-display pink-text">{calcDays} Days</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="30" 
                  value={calcDays}
                  onChange={(e) => setCalcDays(parseInt(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="slider-ticks-v3">
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                  <span>26</span>
                  <span>30</span>
                </div>
              </div>

              {/* Output Gradient Box */}
              <div className="calc-estimated-box-v3">
                <div className="estimated-label-row">
                  <span>Estimated Monthly Earnings</span>
                  <div className="info-tooltip-v3" title="This calculation is based on average deliveries, flexible hour incentives, and base partner benefits.">ⓘ</div>
                </div>
                <div className="estimated-value-row">
                  <span className="estimated-amount-v3">₹{estimated}</span>
                  <span className="estimated-unit-v3">/ month</span>
                </div>
              </div>

              {/* Bottom Metadata Badges */}
              <div className="calc-meta-badges-row-v3">
                <span className="meta-badge-item-v3">Weekly Payouts</span>
                <span className="meta-badge-divider-v3">•</span>
                <span className="meta-badge-item-v3">No Joining Fee</span>
                <span className="meta-badge-divider-v3">•</span>
                <span className="meta-badge-item-v3">Insurance Coverage</span>
              </div>
            </div>

            {/* Right Card: How Your Earnings Grow */}
            <div className="grow-card-v3 reveal-right">
              <div className="grow-card-header-v3">
                <div className="grow-header-icon-box">
                  <TrendingUp size={20} />
                </div>
                <h3 className="grow-card-title-v3">How Your Earnings Grow</h3>
              </div>

              {/* Growth List Items */}
              <div className="grow-list-v3">
                <div className="grow-item-v3">
                  <div className="grow-icon-box-v3 rupee-circle">
                    <span className="rupee-char-v3">₹</span>
                  </div>
                  <div className="grow-item-content-v3">
                    <h4 className="grow-item-title-v3">Base Delivery Earnings</h4>
                    <p className="grow-item-desc-v3">Earn for every successful delivery</p>
                  </div>
                  <div className="grow-item-percentage-v3 text-pink">70-80% <span className="sub-perc">of earnings</span></div>
                  <ChevronRight size={14} className="grow-arrow-icon" />
                </div>

                <div className="grow-item-v3">
                  <div className="grow-icon-box-v3 gift-circle">
                    <Gift size={16} />
                  </div>
                  <div className="grow-item-content-v3">
                    <h4 className="grow-item-title-v3">Delivery Incentives</h4>
                    <p className="grow-item-desc-v3">Extra rewards for completing more deliveries</p>
                  </div>
                  <div className="grow-item-percentage-v3 text-purple">10-15% <span className="sub-perc">of earnings</span></div>
                  <ChevronRight size={14} className="grow-arrow-icon" />
                </div>

                <div className="grow-item-v3">
                  <div className="grow-icon-box-v3 star-circle">
                    <Star size={16} fill="#fff" color="#fff" />
                  </div>
                  <div className="grow-item-content-v3">
                    <h4 className="grow-item-title-v3">Performance Bonus</h4>
                    <p className="grow-item-desc-v3">High ratings & consistent performance unlock bonuses</p>
                  </div>
                  <div className="grow-item-percentage-v3 text-orange">5-10% <span className="sub-perc">of earnings</span></div>
                  <ChevronRight size={14} className="grow-arrow-icon" />
                </div>

                <div className="grow-item-v3">
                  <div className="grow-icon-box-v3 gas-circle">
                    <Zap size={16} />
                  </div>
                  <div className="grow-item-content-v3">
                    <h4 className="grow-item-title-v3">Peak Hour Bonus</h4>
                    <p className="grow-item-desc-v3">Earn more during busy hours and peak days</p>
                  </div>
                  <div className="grow-item-percentage-v3 text-green">Extra <span className="sub-perc font-bold">earnings</span></div>
                  <ChevronRight size={14} className="grow-arrow-icon" />
                </div>
              </div>

              {/* Bottom Megaphone Promo Box */}
              <div className="grow-promo-box-v3">
                <div className="grow-promo-icon-circle-v3">
                  <Zap size={18} fill="#f72585" color="#f72585" />
                </div>
                <div className="grow-promo-text-block-v3">
                  <h4 className="grow-promo-title-v3">More Deliveries. More Incentives. More Growth.</h4>
                  <p className="grow-promo-desc-v3">The more you deliver, the more you earn!</p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Full-Width Horizontal Ribbon */}
          <div className="earnings-ribbon-v3">
            <div className="ribbon-items-grid-v3">
              <div className="ribbon-item-v3">
                <div className="ribbon-icon-circle rupee-circle">
                  <span className="rupee-char-v3">₹</span>
                </div>
                <div className="ribbon-item-text">
                  <span className="ribbon-label">Average Earning Per Delivery</span>
                  <span className="ribbon-value">₹70 – ₹90</span>
                </div>
              </div>

              <div className="ribbon-item-v3">
                <div className="ribbon-icon-circle wallet-circle">
                  <Wallet size={16} />
                </div>
                <div className="ribbon-item-text">
                  <span className="ribbon-label">Weekly Payouts</span>
                  <span className="ribbon-value">Every Monday</span>
                </div>
              </div>

              <div className="ribbon-item-v3">
                <div className="ribbon-icon-circle shield-circle">
                  <Shield size={16} />
                </div>
                <div className="ribbon-item-text">
                  <span className="ribbon-label">Insurance Coverage</span>
                  <span className="ribbon-value">You're always protected</span>
                </div>
              </div>

              <div className="ribbon-item-v3">
                <div className="ribbon-icon-circle green-circle">
                  <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>%</span>
                </div>
                <div className="ribbon-item-text">
                  <span className="ribbon-label">No Commission</span>
                  <span className="ribbon-value">Keep 100% of your earnings</span>
                </div>
              </div>
            </div>

            <button className="ribbon-cta-btn-v3" onClick={onJoinClick}>
              Become a Delivery Partner <ArrowRight size={16} />
            </button>
          </div>

          {/* Bottom Disclaimer */}
          <p className="calc-disclaimer-text-v3">
            ⓘ Earnings are estimates and may vary based on location, time, and performance.
          </p>

        </div>
      </section>

      {/* 4. How It Works */}
      <section id="delivery-how-it-works" className="become-delivery-works-section" style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="delivery-container" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Column: Timeline Steps */}
          <div className="delivery-works-steps-col reveal-left" style={{ flex: 1.2 }}>
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
          <div className="delivery-works-carousel-col reveal-right" style={{ flex: 0.8, width: '100%' }}>
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



      {/* 7. Partner Success Stories */}
      <section className="success-stories-main-section-v3" style={{ padding: '7rem 0', borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Title block with centered header and illustrations */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', position: 'relative' }}>
            {/* Decorative Map Route Icon on Left */}
            <div style={{ position: 'absolute', left: '2%', top: '-20px', opacity: 0.85 }} className="hide-on-mobile">
              <svg viewBox="0 0 100 50" width="120" height="60" fill="none" stroke="#f72585" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5">
                <path d="M10,40 Q40,10 70,35 T110,15" />
                <circle cx="10" cy="40" r="5" fill="#f72585" />
                
                {/* Custom pin shape */}
                <path d="M70,35 L66,15 A3,3 0 0,1 74,15 L70,35 Z" fill="#f72585" />
                <circle cx="70" cy="15" r="9" fill="#f72585" opacity="0.25" />
                <circle cx="70" cy="15" r="4" fill="#f72585" />
              </svg>
            </div>
            
            {/* Scooter rider on Right */}
            <div style={{ position: 'absolute', right: '2%', top: '-40px', opacity: 0.95 }} className="hide-on-mobile">
              <img src="/rider_3d.jpg" alt="Scooter Rider" style={{ width: '135px', height: 'auto', borderRadius: '16px', boxShadow: '0 10px 25px rgba(247,37,133,0.1)' }} />
            </div>

            <div className="stories-badge-top-centered">
              ❤️ Loved by 10,000+ Delivery Partners
            </div>
            
            <h2 className="stories-heading-v3">
              Hear From People Earning with <span style={{ color: '#f72585' }}>StitchBee</span>
            </h2>
            
            <p className="stories-supporting-text-v3">
              Thousands of delivery partners are earning flexible income while working on their own schedule.
            </p>
          </div>

          {/* Stats ribbon */}
          <div className="success-stories-badges-ribbon">
            <div className="success-stats-item">
              <div className="success-stats-icon-box pink-bg">
                <Users size={16} />
              </div>
              <div className="success-stats-info">
                <span className="stat-num">10K+</span>
                <span className="stat-label">Active Partners</span>
              </div>
            </div>
            
            <div className="success-stats-divider" />

            <div className="success-stats-item">
              <div className="success-stats-icon-box purple-bg">
                <Wallet size={16} />
              </div>
              <div className="success-stats-info">
                <span className="stat-num">₹25K+</span>
                <span className="stat-label">Avg. Monthly Earnings</span>
              </div>
            </div>

            <div className="success-stats-divider" />

            <div className="success-stats-item">
              <div className="success-stats-icon-box orange-bg">
                <Star size={16} fill="#fff" color="#fff" />
              </div>
              <div className="success-stats-info">
                <span className="stat-num">4.9 ★</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </div>

            <div className="success-stats-divider" />

            <div className="success-stats-item">
              <div className="success-stats-icon-box green-bg">
                <ThumbsUp size={16} />
              </div>
              <div className="success-stats-info">
                <span className="stat-num">98%</span>
                <span className="stat-label">Partner Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Columns Stories Grid */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div className="delivery-stories-grid-v3">
            {[allTestimonials[0], allTestimonials[1], allTestimonials[2]].map((test, index) => {
              const isFeatured = index === 1;
              return (
                <div 
                  key={test.author} 
                  className={`partner-story-card-v3 ${isFeatured ? 'featured-story-card-v3' : ''} ${index === 0 ? 'reveal-left' : index === 2 ? 'reveal-right' : 'reveal'}`}
                >
                  {isFeatured && (
                    <div className="featured-story-badge">
                      <Star size={10} fill="#fff" color="#fff" /> Featured Story
                    </div>
                  )}

                  <div className="story-profile-block-v3">
                    <img src={test.avatar} alt={test.author} className="story-avatar-circle-v3" />
                    <div className="story-profile-info-v3">
                      <h4 className="profile-name">{test.author}</h4>
                      <span className="profile-role">{test.role}</span>
                    </div>
                  </div>

                  <div className="story-stars-row-v3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#f72585" color="#f72585" />
                    ))}
                  </div>

                  <p className="story-quote-text-v3">
                    {test.author === "Sanjay M." ? (
                      <>
                        "After joining StitchBee, I now earn <span className="highlight-pink-text">₹32,000</span> every month while studying."
                      </>
                    ) : test.author === "Vikram R." ? (
                      <>
                        "I earn <span className="highlight-pink-text">₹900–₹1200</span> every day after college. StitchBee gives me the freedom I always wanted."
                      </>
                    ) : (
                      `"${test.quote}"`
                    )}
                  </p>

                  <div className="story-badges-grid-v3">
                    <div className="story-badge-item-v3 badge-wallet-v3">
                      <Wallet size={12} /> {test.earnings}
                    </div>
                    <div className="story-badge-item-v3 badge-clock-v3">
                      <Clock size={12} /> {test.hours}
                    </div>
                    <div className="story-badge-item-v3">
                      <MapPin size={12} /> {test.location}
                    </div>
                  </div>

                  <div className="story-verified-footer-row">
                    <div className="verified-badge-pill-v3">
                      <CheckCircle size={12} /> Verified Partner
                    </div>
                    <span className="story-joined-text-v3">
                      <Calendar size={12} /> {test.joined}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Promo CTA Banner */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div className="success-stories-cta-banner-v3">
            <div className="success-cta-left-block">
              <div className="success-cta-gift-illustration">
                <Gift size={26} />
              </div>
              <div>
                <h4 className="success-cta-title-v3">Ready to Become Our Next Success Story?</h4>
                <p className="success-cta-desc-v3">Join thousands of delivery partners earning every week.</p>
              </div>
            </div>
            <div className="success-cta-right-block">
              <button className="success-cta-btn-v3" onClick={onJoinClick}>
                Become a Delivery Partner <ArrowRight size={16} />
              </button>
              <div className="success-cta-footer-users">
                <div className="success-cta-avatar-overlap">
                  <img src="/alt_al1.jpg" alt="User" className="success-cta-avatar-circle" />
                  <img src="/alt_al2.jpg" alt="User" className="success-cta-avatar-circle" />
                  <img src="/alt_al3.jpg" alt="User" className="success-cta-avatar-circle" />
                </div>
                <span className="success-cta-users-text">10,000+ partners already earning</span>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* 10. FAQ Section */}
      <section id="delivery-faqs" style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Got questions? We have answers.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="glass-card-no-hover reveal" 
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



    </div>
  );
}
