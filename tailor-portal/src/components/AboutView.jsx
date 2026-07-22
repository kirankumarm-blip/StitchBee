import React from 'react';
import { Sparkles } from 'lucide-react';
import kiranImg from '../assets/kiran.jpg';
import stanyImg from '../assets/stany.jpg';
import manojImg from '../assets/manoj.jpg';

export default function AboutView({ setRole }) {
  return (
    <div className="about-view-container animate-fade-in">
      {/* Hero Section */}
      <div className="about-hero">
        <span className="badge badge-primary" style={{ marginBottom: '16px' }}><Sparkles size={12} /> OUR MISSION</span>
        <h1 className="about-title">Bespoke Fit. Local Craftsmanship.</h1>
        <p className="about-desc">
          StitchBee was founded to solve off-the-rack sizing. We connect customers with local master tailors, providing tools like AI camera measurements and fashion design students to ensure fitting accuracy.
        </p>
      </div>

      {/* Stats Section */}
      <div className="about-stats">
        <div>
          <div className="about-stat-number">250+</div>
          <div className="about-stat-label">Master Tailors</div>
        </div>
        <div>
          <div className="about-stat-number">1,200+</div>
          <div className="about-stat-label">Bespoke Orders</div>
        </div>
        <div>
          <div className="about-stat-number">150+</div>
          <div className="about-stat-label">Design Students</div>
        </div>
        <div>
          <div className="about-stat-number">99.4%</div>
          <div className="about-stat-label">Fitting Success</div>
        </div>
      </div>

      {/* Meet the Co-Founders Team Section */}
      <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>Meet the Co-Founders</h2>
      <div className="team-grid">
        {/* Kiran Kumar */}
        <div className="team-card">
          <div className="team-img-wrapper">
            <img src={kiranImg} alt="Kiran kumar" className="team-img" />
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="team-linkedin-badge">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
          <h3 className="team-member-name">Kiran kumar</h3>
          <span className="team-member-title">Co-Founder & Engineering</span>
          <p className="team-member-desc">
            Building the core platform and engineering the smart digital architecture that powers StitchBee's custom tailoring infrastructure, AI camera measurements, and boutique management systems.
          </p>
        </div>

        {/* Stany Steeven */}
        <div className="team-card">
          <div className="team-img-wrapper">
            <img src={stanyImg} alt="Stany Steeven" className="team-img" />
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="team-linkedin-badge">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
          <h3 className="team-member-name">Stany Steeven</h3>
          <span className="team-member-title">Co-Founder & Business Head</span>
          <p className="team-member-desc">
            Onboarding boutique partners, expanding tailoring marketplace footprints, and establishing standard operating protocols for student-led home measurements.
          </p>
        </div>

        {/* Manoj Martis */}
        <div className="team-card">
          <div className="team-img-wrapper">
            <img src={manojImg} alt="Manoj martis" className="team-img" />
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="team-linkedin-badge">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
          <h3 className="team-member-name">Manoj martis</h3>
          <span className="team-member-title">Co-founder & Business Head</span>
          <p className="team-member-desc">
            Driving brand marketing, growth strategies, customer relationship cycles, and premium fabric partnerships to scale custom bespoke fitting worldwide.
          </p>
        </div>
      </div>

      {/* CTA section to get started */}
      <div className="glass-card-no-hover" style={{ padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(114,9,183,0.1) 0%, rgba(247,37,133,0.1) 100%)', border: '1px solid rgba(247, 37, 133, 0.2)', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Ready to experience perfect fit?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px auto' }}>
          Explore our fabric store or connect with a nearby boutique today. Your wardrobe will thank you.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => setRole('customer')}>
            Book Appointment
          </button>
          <button className="btn btn-secondary" onClick={() => setRole('landing')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
