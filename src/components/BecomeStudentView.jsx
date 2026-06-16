import React, { useState, useEffect } from 'react';
import { 
  Award, BookOpen, ChevronRight, DollarSign, CheckCircle, 
  Truck, Wallet, Check, ChevronDown, HelpCircle, Star, 
  ShieldCheck, UserCheck, Smartphone, Target, GraduationCap, 
  Flame, ThumbsUp, Users, BookOpenCheck, Trophy, Sparkles, 
  MessageSquare, ChevronLeft, Scissors
} from 'lucide-react';

export default function BecomeStudentView({ onJoinClick }) {
  // State variables for interactivity
  const [activePathTab, setActivePathTab] = useState('delivery'); // 'delivery' | 'design' | 'tailor' | 'learn'
  const [activeAcademyLevel, setActiveAcademyLevel] = useState('beginner'); // 'beginner' | 'intermediate' | 'advanced'
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero carousel configuration
  const carouselImages = [
    { url: './student_hero_1.jpg', alt: "Fashion student reviewing color blocks and fabric catalog charts" },
    { url: './student_hero_2.jpg', alt: "Student tailoring assistant cutting fabric with tailoring scissors" },
    { url: './student_hero_3.jpg', alt: "Student logistics team coordinating packaging and routes on digital dashboard" },
    { url: './student_hero_4.jpg', alt: "Fashion design contributors discussing digital models in design studio" },
    { url: './student_hero_5.jpg', alt: "Tailoring assistant stitching garment on professional machine" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  // Paths detailed configuration
  const paths = {
    delivery: {
      title: "Student Delivery Partner",
      subtitle: "For students (18+) who want flexible income.",
      todo: ["Pick up beautifully stitched clothes from boutiques", "Deliver securely to customer doorsteps", "Work in your free study hours", "Choose your own delivery slots"],
      benefits: ["Daily gig earnings and bonuses", "100% flexible schedule", "Weekly direct payouts every Monday", "Logistics & customer service certifications"],
      quote: "“Use your free time to build your income.”",
      img: "./delivery_hero_3.jpg"
    },
    design: {
      title: "Fashion Design Contributor",
      subtitle: "For students enrolled in fashion design courses.",
      todo: ["Upload your creative outfits & styles", "Participate in monthly design contests", "Create trendy outfit ideas for customers", "Build a live digital portfolio"],
      benefits: ["Design royalties per customer select", "Cash rewards for winning contests", "Direct client profile views and bookings", "Premium designer profile badges"],
      quote: "“Your designs can become real fashion.”",
      img: "./why_join_1.jpg"
    },
    tailor: {
      title: "Tailoring Assistant",
      subtitle: "For students with basic stitching knowledge.",
      todo: ["Take on small custom stitching tasks", "Assist boutique tailors with alterations", "Work closely alongside master tailor partners", "Practice advanced tailoring on live projects"],
      benefits: ["Highly paid tailoring gigs", "Practical boutique studio learning", "Rapid hands-on sewing skill growth", "Unlock professional boutique placements"],
      quote: "“Learn from the masters while you earn.”",
      img: "./why_join_2.jpg"
    },
    learn: {
      title: "Learn Tailoring",
      subtitle: "For absolute beginners with zero stitching background.",
      todo: ["Learn precise body measurement techniques", "Understand fabric basics and structures", "Master sewing machine configurations", "Learn customer communication skills"],
      benefits: ["Certified training curriculum completion", "Guaranteed paid internship placement", "Direct job opportunities on graduation", "Earn a StitchBee skills passport"],
      quote: "“Start with zero experience.”",
      img: "./why_join_5.jpg"
    }
  };

  // Academy Syllabus Levels
  const academySyllabus = {
    beginner: {
      title: "Beginner Level Syllabus",
      desc: "Lay the groundwork of tailoring and fashion design basics. No prior experience required.",
      topics: ["Introduction to tailoring terminology", "Basic hand stitches & sewing machine guides", "Precise tape measuring methods", "Fabric understanding & thread counts", "Simple garment alteration guidelines"]
    },
    intermediate: {
      title: "Intermediate Level Syllabus",
      desc: "Start crafting complete garments and handle client-facing boutique tasks.",
      topics: ["Premium shirt stitching & folding techniques", "Custom trousers & pants pattern cutting", "Complex pocket placements & zipper fittings", "School and corporate uniform making", "Fitting tweaks and body structure adaptations"]
    },
    advanced: {
      title: "Advanced Level Syllabus",
      desc: "Master high-end custom fashion design and complex boutique stitching.",
      topics: ["Structured blazers & double-breasted suits", "Bespoke bridal wear & dress linings", "Premium custom drape designs & textures", "Advanced AI body scan measurements handling", "Boutique quality control and delivery packaging"]
    }
  };

  // FAQ List
  const faqs = [
    { q: "Can beginners join?", a: "Yes! The StitchBee Academy offers dedicated beginner courses to guide you with zero experience, leading to paid tailoring assistant gigs." },
    { q: "What is the minimum age?", a: "To participate in active delivery and custom measurement gigs, you must be at least 18 years old. Younger students can still join design contests and learn via the Academy." },
    { q: "Will I get certificates?", a: "Yes. Every level of training completed in the Academy and every certification path cleared comes with a verifiable digital certificate." },
    { q: "Can I switch roles?", a: "Yes. You have full freedom. You can study tailoring while making deliveries, or transition from a delivery partner to an assistant tailor." },
    { q: "Do I need experience?", a: "No. You don't need any prior experience. We train you, certify you, and give you micro-gigs to gain confidence." },
    { q: "Can I work part-time?", a: "Yes. All student gigs are completely part-time. You log in, accept requests, and perform work on your own flexible slots." }
  ];

  return (
    <div style={{ color: 'var(--text-color)', fontFamily: 'inherit' }}>
      
      {/* 1. Hero Section */}
      <section className="become-delivery-hero-section" style={{ background: 'radial-gradient(circle at top right, rgba(247,37,133,0.12) 0%, rgba(0,0,0,0) 65%)' }}>
        <div className="delivery-container">
          
          {/* Left Column */}
          <div className="become-delivery-hero-content">
            <span className="badge badge-primary" style={{ marginBottom: '1.5rem', display: 'inline-flex', gap: '6px', fontSize: '0.75rem', color: 'var(--primary)' }}>
              <GraduationCap size={12} /> StitchBee Student Gigs Program
            </span>
            <h1 className="become-delivery-hero-title">
              Learn. Earn. <span style={{ color: 'var(--primary)' }}>Build Your Future.</span>
            </h1>
            <p className="become-delivery-hero-subtitle">
              Turn your student life into a career opportunity with StitchBee. Earn through delivery gigs, tailoring, fashion design, and certified skill programs.
            </p>
            
            <div className="become-delivery-hero-ctas">
              <button className="btn btn-primary" onClick={onJoinClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}>
                Join Student Gigs <ChevronRight size={16} />
              </button>
              <button className="btn btn-secondary" onClick={onJoinClick} style={{ padding: '12px 28px' }}>
                Explore Opportunities
              </button>
              <button className="btn btn-secondary" onClick={onJoinClick} style={{ padding: '12px 28px', border: '1px solid var(--primary)', background: 'transparent' }}>
                Start Learning
              </button>
            </div>

            {/* Trust Badges */}
            <div className="become-delivery-hero-trust" style={{ gap: '16px' }}>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Flexible Work</span>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Skill-Based Earnings</span>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Certifications</span>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Real Industry Experience</span>
              <span className="trust-item"><Check size={14} style={{ color: 'var(--primary)' }} /> Career Growth</span>
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
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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

      {/* 2. Choose Your Path */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Find Your Best Opportunity</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Select a pathway that matches your interest and course study</p>
          </div>

          {/* Interactive Path Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {Object.keys(paths).map((key) => (
              <button
                key={key}
                onClick={() => setActivePathTab(key)}
                className={`btn ${activePathTab === key ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '8px', padding: '10px 20px', transition: 'all 0.2s' }}
              >
                {paths[key].title.split(' ')[1] || paths[key].title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass-card-no-hover student-grid-2-col" style={{ 
            padding: '36px', 
            borderRadius: '16px',
            alignItems: 'center'
          }}>
            {/* Left Col: Details */}
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {paths[activePathTab].title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1rem' }}>
                {paths[activePathTab].subtitle}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div>
                  <h4 style={{ color: 'var(--primary)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>What You Do</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {paths[activePathTab].todo.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--primary)' }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Perks & Benefits</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {paths[activePathTab].benefits.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <Check size={14} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <blockquote style={{ 
                borderLeft: '3px solid var(--primary)', 
                paddingLeft: '12px', 
                fontStyle: 'italic', 
                color: 'var(--text-secondary)',
                margin: 0
              }}>
                {paths[activePathTab].quote}
              </blockquote>
            </div>

            {/* Right Col: Image Wrapper */}
            <div style={{ 
              borderRadius: '12px', 
              overflow: 'hidden', 
              height: '320px', 
              border: '1px solid var(--border-color)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
            }}>
              <img 
                src={paths[activePathTab].img} 
                alt={paths[activePathTab].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. StitchBee Academy */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>StitchBee Academy</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Acquire career-grade fashion skills in structured learning levels</p>
          </div>

          <div className="student-grid-academy" style={{ alignItems: 'center' }}>
            {/* Left Col: Interactive Syllabus Tabs */}
            <div className="glass-card-no-hover" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveAcademyLevel(lvl)}
                    className={`btn ${activeAcademyLevel === lvl ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                  >
                    {lvl.charAt(0).toUpperCase() + lvl.slice(1)} Level
                  </button>
                ))}
              </div>

              <div>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '8px' }}>
                  {academySyllabus[activeAcademyLevel].title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                  {academySyllabus[activeAcademyLevel].desc}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {academySyllabus[activeAcademyLevel].topics.map((topic, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700' }}>
                        {idx + 1}
                      </div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Features */}
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '20px', fontWeight: '700' }}>Academy Core Features</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: "Video Lessons", desc: "Access bite-sized, premium video instructions from styling experts.", icon: <BookOpenCheck size={18} /> },
                  { title: "Live Classes", desc: "Attend interactive styling classes and clear doubts live.", icon: <Users size={18} /> },
                  { title: "Syllabus Assignments", desc: "Complete practical tasks to check your skill progression.", icon: <BookOpen size={18} /> },
                  { title: "Practical Projects", desc: "Work on live custom garment customizers and alteration requests.", icon: <Target size={18} /> },
                  { title: "Mentor Guidance", desc: "Get portfolio reviews and advice directly from master tailors.", icon: <Award size={18} /> }
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ color: 'var(--primary)', marginTop: '2px' }}>{feat.icon}</div>
                    <div>
                      <h5 style={{ color: 'var(--text-primary)', margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: '600' }}>{feat.title}</h5>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.75rem', lineHeight: '1.3' }}>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Certification Center */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Certification Center</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Test your skills, receive verification certificates, and unlock top payouts</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '3.5rem' }}>
            {/* Path 1 */}
            <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '8px', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', width: 'fit-content', borderRadius: '8px' }}>
                <Truck size={22} />
              </div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', margin: 0, fontWeight: '700' }}>Delivery Certification</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                Simple quiz evaluations covering packaging handling, communication rules, safety checklists, and delivery route efficiency.
              </p>
              <span className="badge badge-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '0.65rem' }}>Quiz Pass Required</span>
            </div>

            {/* Path 2 */}
            <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '8px', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', width: 'fit-content', borderRadius: '8px' }}>
                <Sparkles size={22} />
              </div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', margin: 0, fontWeight: '700' }}>Fashion Design Certification</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                Verifiable design reviews, styling trend analysis scores, digital catalog portfolio checks, and customer rating evaluations.
              </p>
              <span className="badge badge-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '0.65rem' }}>Portfolio Review Required</span>
            </div>

            {/* Path 3 */}
            <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '8px', background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', width: 'fit-content', borderRadius: '8px' }}>
                <Scissors size={22} />
              </div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', margin: 0, fontWeight: '700' }}>Tailoring Certification</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                Hands-on practical tests evaluating body sizing calculations, machine setups, sleeve lining trims, and final stitch quality audits.
              </p>
              <span className="badge badge-secondary" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: '0.65rem' }}>Practical Test Required</span>
            </div>
          </div>

          {/* Level Tiers */}
          <div style={{ background: 'rgba(247,37,133,0.04)', border: '1px dashed var(--primary)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <h5 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: '700', marginBottom: '12px' }}>Verify & Unlock Tier Levels</h5>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
              {[
                { name: "Bronze Tier", desc: "Entry level access" },
                { name: "Silver Tier", desc: "Unlock 5% higher payouts" },
                { name: "Gold Tier", desc: "Priority gig routing" },
                { name: "Master Tier", desc: "Assigned as elite mentor" }
              ].map((tier, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                    <Trophy size={14} /> {tier.name}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{tier.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Student Fashion Lab */}
      <section style={{ 
        padding: '5rem 1.5rem', 
        borderBottom: '1px solid var(--border-color)',
        background: 'radial-gradient(circle at center, rgba(247,37,133,0.05) 0%, rgba(0,0,0,0) 70%)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Student Fashion Lab</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Publish designs, enter contests, and get voted by customers to earn royalties</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div className="glass-card-no-hover" style={{ padding: '30px', border: '1px solid var(--primary)', borderRadius: '16px' }}>
              <span className="badge badge-primary" style={{ marginBottom: '12px', fontSize: '0.65rem' }}>Open Design Lab</span>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', marginBottom: '16px', fontWeight: '700' }}>Lab Features & Contests</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  "Upload personal designs to the public StitchBee gallery",
                  "Submit entries into theme-based monthly contest boards",
                  "Feature on weekly student design trending boards",
                  "Collect community likes & direct client votes",
                  "Earn premium verified student designer profiles"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CheckCircle size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '16px', fontWeight: '700' }}>Lab Rewards</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div className="glass-card-no-hover" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--primary)' }}><Trophy size={20} /></div>
                  <div>
                    <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>Cash Prizes</h5>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.75rem' }}>Up to ₹10,000 for top-voted monthly contest winners.</p>
                  </div>
                </div>
                <div className="glass-card-no-hover" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--primary)' }}><Wallet size={20} /></div>
                  <div>
                    <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>Continuous Royalties</h5>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.75rem' }}>Earn ongoing commissions whenever a user orders your custom design.</p>
                  </div>
                </div>
              </div>
              <blockquote style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px', fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                “Publish your sketches and watch them transform into custom outfits ordered by real clients.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Micro Gigs */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '950px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Micro Gigs Hub</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Quick, small earning opportunities perfect for tailoring beginners</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { title: "Button Stitching", desc: "Attach buttons securely onto crafted shirts and jackets." },
              { title: "Hemming & Trims", desc: "Finish sleeve lines and pant cuffs with tidy hand stitches." },
              { title: "Premium Packaging", desc: "Pack final outfits into premium hanger bags and scan dispatch codes." },
              { title: "Quality Audit check", desc: "Measure finished outfits against customer specifications checklist." },
              { title: "Garment Ironing", desc: "Steam iron clothes before packing to ensure pristine wrinkles-free handover." },
              { title: "Label Tagging", desc: "Attach StitchBee labels and custom price cards to finished orders." }
            ].map((gig, idx) => (
              <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="badge badge-primary" style={{ alignSelf: 'flex-start', fontSize: '0.6rem' }}>Quick Payout</span>
                <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '0.95rem', fontWeight: '700' }}>{gig.title}</h5>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.75rem', lineHeight: '1.4' }}>{gig.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Earnings Section */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Earn While You Learn</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Benchmark monthly student earnings across StitchBee partner roles</p>
          </div>

          <div className="glass-card-no-hover" style={{ padding: '30px', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 8px', color: 'var(--text-primary)' }}>Role Pathway</th>
                  <th style={{ padding: '12px 8px', color: 'var(--text-primary)', textAlign: 'right' }}>Est. Monthly Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 8px' }}>Delivery Partner</td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>₹8,000 – ₹20,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 8px' }}>Fashion Designer</td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>₹5,000 – ₹50,000+</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 8px' }}>Tailoring Assistant</td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>₹10,000 – ₹30,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: '600', color: 'var(--text-primary)' }}>Certified Tailor</td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--primary)', fontWeight: '700' }}>₹20,000 – ₹60,000+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <blockquote style={{ 
            borderLeft: '3px solid var(--primary)', 
            paddingLeft: '12px', 
            fontStyle: 'italic', 
            color: 'var(--text-secondary)',
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '600px'
          }}>
            “Your college years can build your future income.”
          </blockquote>
        </div>
      </section>

      {/* 8. Internship Program */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Internship Program</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Gain practical industry experience with our boutique network</p>
          </div>

          <div className="student-grid-2-col" style={{ gap: '32px', alignItems: 'center' }}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '16px', fontWeight: '700' }}>Who You Work With</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  "Premium local tailor shops and stitching studios",
                  "High-end fashion boutiques and design houses",
                  "Emerging local clothing brands and designer labels",
                  "StitchBee partner stores and central hubs"
                ].map((partner, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <CheckCircle size={14} style={{ color: 'var(--primary)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{partner}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '24px' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '16px', fontWeight: '700' }}>Internship Perks</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Check size={14} style={{ color: 'var(--primary)', marginTop: '3px' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><strong>Practical Exposure</strong>: Learn real studio management and client handling.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Check size={14} style={{ color: 'var(--primary)', marginTop: '3px' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><strong>Letters of Recommendation</strong>: Verifiable letters from boutique heads.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Check size={14} style={{ color: 'var(--primary)', marginTop: '3px' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><strong>Real Projects</strong>: Work directly on premium custom garment lines.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Campus Ambassador Program */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Campus Ambassador Program</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Lead the fashion revolution and promote StitchBee in your college</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {/* Box 1 */}
            <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'var(--primary)' }}><Users size={22} /></div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: '700', margin: 0 }}>How You Promote</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>
                Refer friends, register local student riders, and run campus events/competitions.
              </p>
            </div>

            {/* Box 2 */}
            <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'var(--primary)' }}><DollarSign size={22} /></div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: '700', margin: 0 }}>Earning Model</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>
                Earn commissions per successful tailor sign-up, user registration, and active delivery partner onboarded.
              </p>
            </div>

            {/* Box 3 */}
            <div className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'var(--primary)' }}><Award size={22} /></div>
              <h5 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: '700', margin: 0 }}>Rewards & Perks</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>
                Earn ambassador leadership certificates, custom bonuses, and free premium StitchBee course access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Rewards System */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="student-grid-2-col" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>StitchPoints Rewards</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>
                Accumulate loyalty points as you complete courses and gigs, and redeem them for sewing gear and priorities.
              </p>
              
              <h4 style={{ color: 'var(--primary)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>How You Earn Points</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {["Completing delivery/stitching gigs", "Passing certification quiz paths", "Winning monthly lab design contests", "Referring fellow students", "Finishing Academy courses"].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--primary)' }}>+</span> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card-no-hover" style={{ padding: '30px', border: '1px dashed var(--primary)' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '16px', fontWeight: '700' }}>Points Redemption</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  "Premium masterclass vouchers",
                  "Free tailoring scissors and tools kit",
                  "Exclusive partner discounts",
                  "Priority access to high-value gigs",
                  "Featured designer highlights"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={14} style={{ color: 'var(--primary)' }} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Job Board */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Student Job Board</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Available job opportunities unlocked automatically after certification</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { role: "Tailor Assistant", loc: "StitchBee Studio, Indiranagar", pay: "₹15,000/mo" },
              { role: "Junior Fashion Designer", loc: "Aurelia Boutique, Central", pay: "₹25,000/mo" },
              { role: "Delivery Partner Leader", loc: "StitchBee Logistics Hub", pay: "₹18,000/mo" },
              { role: "Boutique Helper", loc: "Vogue Creations, East", pay: "₹12,000/mo" },
              { role: "Bespoke Stitching Partner", loc: "StitchBee Central Workshop", pay: "₹30,000/mo" }
            ].map((job, idx) => (
              <div key={idx} className="glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span className="badge badge-primary" style={{ alignSelf: 'flex-start', fontSize: '0.65rem' }}>Certified Only</span>
                <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1rem', fontWeight: '700' }}>{job.role}</h5>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <div>📍 {job.loc}</div>
                  <div style={{ color: 'var(--primary)', fontWeight: '600', marginTop: '4px' }}>💰 {job.pay}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Portfolio Builder */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="student-grid-2-col" style={{ alignItems: 'center' }}>
            <div className="glass-card-no-hover" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>S</div>
                <div>
                  <h5 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '0.95rem', fontWeight: '700' }}>Student Profile Preview</h5>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Verifiable Portfolio Link</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div className="flex-row-between" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Profile Completeness</span>
                    <strong style={{ color: 'var(--primary)' }}>85%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '85%', height: '100%', background: 'var(--primary)' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>✓ 12 Designs Uploaded</span>
                  <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>✓ Silver Tailoring Certificate</span>
                  <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>✓ 25 Completed Gigs</span>
                  <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>★ 4.9 Average Rating</span>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Interactive Portfolio Builder</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '20px' }}>
                Build your verifiable portfolio directly as you work. Showcase your certified skills, design catalogs, and gig reviews.
              </p>
              <blockquote style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '12px', fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                “Perfect to present to top boutiques, fashion houses, or direct clients for your future career.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Student Community */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Student Community Hub</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Connect with peers, ask questions, share work, and discuss latest fashion trends</p>
          </div>

          <div className="glass-card-no-hover" style={{ padding: '30px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              {[
                { title: "Share Work", desc: "Upload and receive peers feedback on your stitching items and sketches.", icon: <Sparkles size={18} /> },
                { title: "Ask Doubts", desc: "Post queries regarding measurement calculations or machine settings.", icon: <MessageSquare size={18} /> },
                { title: "Mentor Support", desc: "Interact with senior tailors and designers during community Q&A hours.", icon: <Award size={18} /> },
                { title: "Discuss Trends", desc: "Stay updated on trending fabric patterns, colors, and local alterations.", icon: <Users size={18} /> }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                  <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                  <h5 style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: '700', margin: 0 }}>{item.title}</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14. Success Stories */}
      <section style={{ padding: '5rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Success Stories</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Real students. Real learning. Real earnings.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              {
                quote: "I started as a delivery partner in my first college semester. The flexible timings helped me earn pocket money, and now I've become a tailoring assistant.",
                author: "Vikram S.",
                role: "Assitant Tailor & Student Partner"
              },
              {
                quote: "My styling designs got selected by three boutique clients in my first month of uploading. I earned my first design royalties and built confidence.",
                author: "Anjali K.",
                role: "Fashion Design Student"
              },
              {
                quote: "StitchBee gave me both structured learning and flexible earnings. The certs I earned helped me land a boutique internship this summer.",
                author: "Rohan D.",
                role: "Tailoring Student Intern"
              }
            ].map((story, idx) => (
              <div key={idx} className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', color: 'var(--primary)' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="var(--primary)" color="var(--primary)" />
                    ))}
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontStyle: 'italic', fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 20px 0' }}>
                    "{story.quote}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <h5 style={{ color: 'var(--text-primary)', margin: '0 0 2px 0', fontSize: '0.85rem', fontWeight: '700' }}>{story.author}</h5>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>{story.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Future Growth */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Future Career Growth Paths</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Grow from student gigs into full-scale fashion business leaders</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              "Professional Tailor Partner",
              "Boutique Studio Designer",
              "Boutique Owner & Manager",
              "Logistics Team Leader",
              "StitchBee Central Partner",
              "Startup Fashion Founder"
            ].map((path, idx) => (
              <div key={idx} className="glass-card-no-hover" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ background: 'rgba(247,37,133,0.1)', color: 'var(--primary)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={14} />
                </div>
                <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '500' }}>{path}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. FAQ Section */}
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
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
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

      {/* 17. Final CTA Section */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        background: 'radial-gradient(circle, rgba(247,37,133,0.12) 0%, var(--bg-darker) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Start Your Journey With StitchBee Today
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.4' }}>
            Learn new skills, earn money, build your career, and grow with the future of fashion.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onJoinClick} style={{ padding: '14px 36px', fontSize: '1rem' }}>
              Join Student Gigs
            </button>
            <button className="btn btn-secondary" onClick={onJoinClick} style={{ padding: '14px 36px', fontSize: '1rem' }}>
              Start Learning
            </button>
            <button className="btn btn-secondary" onClick={onJoinClick} style={{ padding: '14px 36px', fontSize: '1rem', border: '1px solid var(--primary)', background: 'transparent' }}>
              Start Earning
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
