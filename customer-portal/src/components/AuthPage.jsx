import React, { useState, useEffect } from 'react';
import { 
  Scissors, User, Lock, Mail, MapPin, Sparkles, Check, Truck, 
  Phone, Star, Eye, EyeOff, Sun, Moon, Headphones, ArrowRight, 
  Shield, CreditCard, Activity, Calendar, Award, Layers, 
  CheckCircle, Tag, ShoppingBag, Gift
} from 'lucide-react';

export default function AuthPage({ 
  tab = 'login', 
  setTab, 
  onLoginSuccess, 
  onClose, 
  theme, 
  setTheme, 
  initialRole = 'customer' 
}) {
  const [role, setRole] = useState(initialRole); // 'customer' | 'tailor' | 'student' | 'delivery'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const isDark = theme === 'dark';
  
  // Design system theme mapping
  const bgPage = isDark ? '#0b081e' : '#FFFDFC';
  const bgPageGrad = isDark 
    ? 'radial-gradient(circle at 20% 30%, rgba(216, 27, 255, 0.12) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(123, 45, 255, 0.12) 0%, transparent 45%), radial-gradient(circle at 50% 10%, rgba(255, 46, 138, 0.08) 0%, transparent 40%), #0b081e'
    : 'radial-gradient(circle at 20% 30%, rgba(216, 27, 255, 0.06) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(123, 45, 255, 0.06) 0%, transparent 45%), radial-gradient(circle at 50% 10%, rgba(255, 46, 138, 0.04) 0%, transparent 40%), #FFFDFC';
  const bgCard = isDark ? 'rgba(18, 15, 38, 0.75)' : 'rgba(255, 255, 255, 0.75)';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#ECECF4';
  const colorTextPrimary = isDark ? '#f3f4f6' : '#131A34';
  const colorTextSecondary = isDark ? '#9ca3af' : '#5D647A';
  const colorTextMuted = isDark ? '#6b7280' : '#7D8597';

  // Inject Google Font dynamically on component mount
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      try {
        document.head.removeChild(link);
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  useEffect(() => {
    setError('');
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAddress('');
  }, [tab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (tab === 'signup') {
      if (!name) {
        setError('Please enter your full name.');
        return;
      }
      if (!phone) {
        setError('Please enter your phone number.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (role === 'customer' && !address) {
        setError('Please enter your delivery address.');
        return;
      }
      if (!agreeTerms) {
        setError('You must agree to the Terms & Conditions.');
        return;
      }
    }

    // Standard login/signup simulation
    let userRole = role;
    if (tab === 'login') {
      const lowerEmail = email.toLowerCase();
      if (lowerEmail === 'admin@stitchbee.com') {
        userRole = 'admin';
      } else if (lowerEmail === 'tailor@stitchbee.com') {
        userRole = 'tailor';
      } else if (lowerEmail === 'student@stitchbee.com') {
        userRole = 'student';
      } else if (lowerEmail === 'delivery@stitchbee.com') {
        userRole = 'delivery';
      } else if (lowerEmail === 'customer@stitchbee.com') {
        userRole = 'customer';
      } else {
        // Try to look up from registered users list
        try {
          const registeredUsers = JSON.parse(localStorage.getItem('stitchbee_users') || '[]');
          const found = registeredUsers.find(u => u.email === lowerEmail);
          if (found) {
            userRole = found.role;
          }
        } catch (err) {
          console.error("Error reading registered users:", err);
        }
      }
    }

    const displayName = tab === 'login' 
      ? (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)) 
      : name;

    const userData = {
      name: displayName,
      email: email.toLowerCase(),
      role: userRole,
      phone: phone,
      address: userRole === 'customer' ? address || '123 Green Glen Road, HSR Layout, Bengaluru' : ''
    };

    // Store current session in localStorage
    localStorage.setItem('stitchbee_user', JSON.stringify(userData));

    // Save to list of registered users if sign up
    if (tab === 'signup') {
      try {
        const registeredUsers = JSON.parse(localStorage.getItem('stitchbee_users') || '[]');
        if (!registeredUsers.some(u => u.email === userData.email)) {
          registeredUsers.push({ email: userData.email, role: userData.role });
          localStorage.setItem('stitchbee_users', JSON.stringify(registeredUsers));
        }
      } catch (err) {
        console.error("Error saving registered user:", err);
      }
    }

    onLoginSuccess(userData);
  };

  const handleQuickFill = (emailVal, passVal) => {
    setEmail(emailVal);
    setPassword(passVal);
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh', 
        position: 'relative',
        background: bgPageGrad, 
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        color: colorTextPrimary
      }} 
      className="auth-page-layout-root"
    >
      <style>{`
        @keyframes float-slow-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
        }
        @keyframes float-slow-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-0.5deg); }
        }
        @keyframes pulse-glowing {
          0%, 100% { opacity: 0.25; stroke-width: 1.5px; }
          50% { opacity: 0.55; stroke-width: 2.2px; }
        }
        @keyframes flow-dash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes scale-podium {
          0%, 100% { transform: rotateX(60deg) scale(1); }
          50% { transform: rotateX(60deg) scale(1.02); }
        }
        .animate-podium {
          animation: scale-podium 8s ease-in-out infinite;
        }
        .animate-float-1 {
          animation: float-slow-1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-slow-2 8s ease-in-out infinite;
        }
        .animate-dash-flow {
          animation: flow-dash 2s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glowing 3s ease-in-out infinite;
        }
        .input-glow-focus:focus-within {
          border-color: #FF2E8A !important;
          box-shadow: 0 0 0 4px rgba(255, 46, 138, 0.15) !important;
        }
        @media (max-width: 1023px) {
          .auth-main-wrapper {
            flex-direction: column !important;
            padding: 40px 20px !important;
            gap: 40px !important;
          }
          .auth-left-column, .auth-right-column {
            width: 100% !important;
          }
          .auth-trust-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* Floating Sparkles & Light Particles */}
      <div className="animate-float-1" style={{ position: 'absolute', top: '15%', right: '35%', color: '#FF2E8A', opacity: 0.35, pointerEvents: 'none' }}><Sparkles size={16} /></div>
      <div className="animate-float-2" style={{ position: 'absolute', bottom: '25%', left: '42%', color: '#7B2DFF', opacity: 0.35, pointerEvents: 'none' }}><Sparkles size={20} /></div>
      <div className="animate-float-1" style={{ position: 'absolute', top: '45%', left: '10%', color: '#D81BFF', opacity: 0.25, pointerEvents: 'none' }}><Sparkles size={14} /></div>

      {/* TOP NAVIGATION */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        width: '100%',
        boxSizing: 'border-box',
        zIndex: 50,
        position: 'relative'
      }}>
        {/* Left: StitchBee logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Scissors size={24} style={{ color: '#FF2E8A', transform: 'rotate(-45deg)' }} />
          <span style={{ fontSize: '22px', fontWeight: '800', color: colorTextPrimary, letterSpacing: '-0.5px' }}>
            StitchBee
          </span>
          <span style={{
            fontSize: '9px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, rgba(255, 46, 138, 0.1) 0%, rgba(123, 45, 255, 0.1) 100%)',
            color: '#FF2E8A',
            padding: '3px 8px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 46, 138, 0.2)',
            textTransform: 'uppercase',
            letterSpacing: '0.8px'
          }}>CUSTOMER PORTAL</span>
        </div>

        {/* Right Nav Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Dark Mode Toggle */}
          <button 
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            style={{
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
              border: `1px solid ${borderColor}`,
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: colorTextPrimary,
              transition: 'all 0.2s ease'
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: colorTextSecondary, fontWeight: '500' }}>
              {tab === 'login' ? "Need an account?" : "Already have an account?"}
            </span>
            <button
              className="btn-primary"
              onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
              style={{
                background: 'linear-gradient(135deg, #FF2E8A 0%, #7B2DFF 100%)',
                border: 'none',
                color: '#ffffff',
                padding: '8px 20px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255, 46, 138, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 46, 138, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 46, 138, 0.2)';
              }}
            >
              {tab === 'login' ? 'Create Account' : 'Login'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 40px',
        boxSizing: 'border-box',
        alignItems: 'center',
        gap: '40px',
        zIndex: 10,
        position: 'relative'
      }} className="auth-main-wrapper">
        
        {/* LEFT COLUMN (PREMIUM MINI STUDIO HERO - 45% Width) */}
        <div style={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '24px',
          position: 'relative',
          paddingBottom: '40px'
        }} className="auth-left-column">
          
          {/* Headline and subtitle */}
          <div>
            <h1 style={{
              fontSize: '52px',
              fontWeight: '800',
              lineHeight: '1.05',
              letterSpacing: '-2px',
              color: colorTextPrimary,
              margin: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <span>Dress Better.</span>
              <span style={{ color: '#FF2E8A' }}>Designed</span>
              <span style={{ color: '#7B2DFF' }}>for You.</span>
            </h1>
            <div style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #FF2E8A 0%, #7B2DFF 100%)',
              borderRadius: '2px',
              marginTop: '12px',
              marginBottom: '16px'
            }} />
            <p style={{
              fontSize: '15px',
              color: colorTextSecondary,
              lineHeight: '1.5',
              maxWidth: '460px',
              margin: 0,
              fontWeight: '500'
            }}>
              Book expert tailors, choose premium fabrics, customize every stitch, and track your order from start to finish.
            </p>
          </div>

          {/* PREMIUM MINI TAILORING STUDIO ON circular podium DISPLAY */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '24px',
            background: 'transparent',
            overflow: 'hidden'
          }}>
            {/* Ambient Lighting: Warm glow center, pink/purple edge light */}
            <div style={{
              position: 'absolute',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(216, 27, 255, 0.08) 0%, transparent 70%)',
              bottom: '10%',
              left: '50%',
              marginLeft: '-140px',
              pointerEvents: 'none',
              zIndex: 1
            }} />

            {/* Glowing Connecting lines SVG (curving outward from podium to the 6 cards) */}
            <svg viewBox="0 0 500 480" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
              <defs>
                <linearGradient id="glow-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF2E8A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7B2DFF" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="glow-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D81BFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FF2E8A" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Connecting lines from circular display center (250, 320) to the 6 float cards */}
              {/* Left Column connections */}
              <path d="M 250 320 Q 140 290, 80 120" stroke="url(#glow-grad-1)" strokeWidth="1.5" strokeDasharray="4,4" className="animate-dash-flow animate-pulse-glow" fill="none" />
              <path d="M 250 320 Q 120 320, 80 230" stroke="url(#glow-grad-1)" strokeWidth="1.5" strokeDasharray="4,4" className="animate-dash-flow animate-pulse-glow" fill="none" />
              <path d="M 250 320 Q 130 350, 80 370" stroke="url(#glow-grad-1)" strokeWidth="1.5" strokeDasharray="4,4" className="animate-dash-flow animate-pulse-glow" fill="none" />
              {/* Right Column connections */}
              <path d="M 250 320 Q 360 290, 420 120" stroke="url(#glow-grad-2)" strokeWidth="1.5" strokeDasharray="4,4" className="animate-dash-flow animate-pulse-glow" fill="none" />
              <path d="M 250 320 Q 380 320, 420 230" stroke="url(#glow-grad-2)" strokeWidth="1.5" strokeDasharray="4,4" className="animate-dash-flow animate-pulse-glow" fill="none" />
              <path d="M 250 320 Q 370 350, 420 370" stroke="url(#glow-grad-2)" strokeWidth="1.5" strokeDasharray="4,4" className="animate-dash-flow animate-pulse-glow" fill="none" />
            </svg>

            {/* circular podium display platform (3D perspective) */}
            <div className="animate-podium" style={{
              position: 'absolute',
              bottom: '12%',
              left: '50%',
              marginLeft: '-150px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              transform: 'rotateX(60deg)',
              background: isDark 
                ? 'radial-gradient(circle, rgba(216,27,255,0.18) 0%, rgba(123,45,255,0.06) 60%, rgba(255,255,255,0.02) 100%)' 
                : 'radial-gradient(circle, rgba(216,27,255,0.08) 0%, rgba(123,45,255,0.02) 60%, rgba(0,0,0,0.01) 100%)',
              border: '2px solid rgba(255, 46, 138, 0.35)',
              boxShadow: '0 25px 70px rgba(123, 45, 255, 0.35), inset 0 0 40px rgba(255, 46, 138, 0.25)',
              zIndex: 3,
              transformStyle: 'preserve-3d'
            }}>
              {/* Internal glowing rim ring */}
              <div style={{
                position: 'absolute',
                inset: '12px',
                borderRadius: '50%',
                border: '1px solid rgba(216, 27, 255, 0.2)',
                background: 'transparent'
              }} />
            </div>

            {/* MINIATURE 3D BOUTIQUE SETUP ON circular podium DISPLAY */}
            <div style={{
              position: 'absolute',
              bottom: '15%',
              width: '280px',
              height: '240px',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}>
              <svg viewBox="0 0 280 240" style={{ width: '100%', height: '100%' }}>
                {/* 1. Mannequin Stand (Right Side of circular podium) */}
                <line x1="200" y1="90" x2="200" y2="200" stroke={isDark ? 'rgba(255,255,255,0.45)' : '#475569'} strokeWidth="2.5" />
                <line x1="185" y1="200" x2="215" y2="200" stroke={isDark ? 'rgba(255,255,255,0.45)' : '#475569'} strokeWidth="2.5" />
                {/* Mannequin torso body wearing premium magenta designer outfit */}
                <path d="M 185 90 C 185 55, 215 55, 215 90 L 210 145 L 190 145 Z" fill="url(#gown-grad)" stroke="#FF2E8A" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="gown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF2E8A" />
                    <stop offset="100%" stopColor="#D81BFF" />
                  </linearGradient>
                </defs>
                {/* Measuring tape draped around mannequin neck */}
                <path d="M 193 68 C 195 90, 205 90, 207 68" stroke="#fbbf24" strokeWidth="2.2" fill="none" />
                <path d="M 193 68 L 191 110" stroke="#fbbf24" strokeWidth="2.2" fill="none" />

                {/* 2. Luxury Sewing Machine (Left Side of circular podium) */}
                {/* Sewing Table base */}
                <rect x="50" y="170" width="70" height="6" rx="2" fill={isDark ? '#2A254D' : '#e2e8f0'} stroke={isDark ? 'rgba(255,255,255,0.1)' : '#94a3b8'} strokeWidth="1" />
                {/* Machine body */}
                <path d="M 60 170 L 60 135 L 105 135 L 105 152 L 95 152 L 95 170" stroke="#7B2DFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <circle cx="105" cy="142" r="3" fill="#fbbf24" />
                <line x1="60" y1="170" x2="110" y2="170" stroke={isDark ? 'rgba(255,255,255,0.4)' : '#64748b'} strokeWidth="2.5" />
                {/* Spool of thread on machine top */}
                <rect x="75" y="128" width="6" height="7" fill="#FF2E8A" rx="1" />

                {/* 3. Folded Premium Fabric Rolls (Center background) */}
                <g transform="translate(115, 155)">
                  {/* Roll 1: Pink */}
                  <rect x="5" y="10" width="40" height="12" rx="3" fill="#FF2E8A" opacity="0.9" />
                  <ellipse cx="45" cy="16" rx="2" ry="6" fill="#fbbf24" />
                  {/* Roll 2: Purple */}
                  <rect x="15" y="20" width="42" height="12" rx="3" fill="#7B2DFF" opacity="0.9" />
                  <ellipse cx="57" cy="26" rx="2" ry="6" fill="#fbbf24" />
                </g>

                {/* 4. Clothes Hanger Rack (Center-right background) */}
                <line x1="125" y1="80" x2="175" y2="80" stroke={isDark ? 'rgba(255,255,255,0.3)' : '#cbd5e1'} strokeWidth="2" />
                <line x1="125" y1="80" x2="125" y2="175" stroke={isDark ? 'rgba(255,255,255,0.3)' : '#cbd5e1'} strokeWidth="1.5" />
                {/* Hanging designer garments */}
                <path d="M 135 83 L 135 140 L 148 140 L 148 83 Z" fill="rgba(216, 27, 255, 0.4)" stroke="#D81BFF" strokeWidth="1" />
                <path d="M 155 83 L 155 145 L 168 145 L 168 83 Z" fill="rgba(123, 45, 255, 0.4)" stroke="#7B2DFF" strokeWidth="1" />

                {/* 5. Sewing Tools on circular podium floor */}
                {/* Thread reels */}
                <rect x="135" y="195" width="5" height="9" fill="#D81BFF" rx="1" transform="rotate(15, 135, 195)" />
                <rect x="145" y="193" width="5" height="9" fill="#FF2E8A" rx="1" transform="rotate(-30, 145, 193)" />
                {/* Scissors */}
                <path d="M 160 195 C 160 190, 168 190, 168 195 L 164 205 L 160 195 M 165 195 C 165 190, 173 190, 173 195 L 166 205 Z" fill="none" stroke={isDark ? 'rgba(255,255,255,0.6)' : '#475569'} strokeWidth="1" />
                {/* Buttons */}
                <circle cx="120" cy="201" r="2.2" fill="#fbbf24" />
                <circle cx="126" cy="203" r="1.8" fill="#FF2E8A" />
                <circle cx="116" cy="204" r="2.4" fill="#7B2DFF" />
              </svg>
            </div>

            {/* 6 FLOATING GLASSMORPHIC FEATURE CARDS (Circular Spacing layout) */}
            
            {/* 1. AI Body Measurements (Top Left) */}
            <div className="animate-float-1" style={{
              position: 'absolute',
              top: '6%',
              left: '4%',
              background: bgCard,
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '10px 16px',
              borderRadius: '16px',
              textAlign: 'left',
              width: '150px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.04)',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <Activity size={13} style={{ color: '#FF2E8A' }} />
                <span style={{ fontSize: '11px', fontWeight: '800' }}>AI Measurements</span>
              </div>
              <span style={{ fontSize: '9px', color: colorTextSecondary, display: 'block', fontWeight: '500' }}>Accurate. Fast. Easy.</span>
            </div>

            {/* 2. Premium Fabrics (Mid Left) */}
            <div className="animate-float-2" style={{
              position: 'absolute',
              top: '32%',
              left: '2%',
              background: bgCard,
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '10px 16px',
              borderRadius: '16px',
              textAlign: 'left',
              width: '150px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.04)',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <Layers size={13} style={{ color: '#D81BFF' }} />
                <span style={{ fontSize: '11px', fontWeight: '800' }}>Premium Fabrics</span>
              </div>
              <span style={{ fontSize: '9px', color: colorTextSecondary, display: 'block', fontWeight: '500' }}>1000+ Fabric Collections</span>
            </div>

            {/* 3. Custom Stitching (Bottom Left) */}
            <div className="animate-float-1" style={{
              position: 'absolute',
              bottom: '10%',
              left: '4%',
              background: bgCard,
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '10px 16px',
              borderRadius: '16px',
              textAlign: 'left',
              width: '150px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.04)',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <Scissors size={13} style={{ color: '#7B2DFF' }} />
                <span style={{ fontSize: '11px', fontWeight: '800' }}>Custom Stitching</span>
              </div>
              <span style={{ fontSize: '9px', color: colorTextSecondary, display: 'block', fontWeight: '500' }}>Design any outfit you love</span>
            </div>

            {/* 4. Expert Tailors (Top Right) */}
            <div className="animate-float-2" style={{
              position: 'absolute',
              top: '6%',
              right: '4%',
              background: bgCard,
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '10px 16px',
              borderRadius: '16px',
              textAlign: 'left',
              width: '150px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.04)',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <Award size={13} style={{ color: '#FF2E8A' }} />
                <span style={{ fontSize: '11px', fontWeight: '800' }}>Expert Tailors</span>
              </div>
              <span style={{ fontSize: '9px', color: colorTextSecondary, display: 'block', fontWeight: '500' }}>Verified & Experienced</span>
            </div>

            {/* 5. Live Order Tracking (Mid Right) */}
            <div className="animate-float-1" style={{
              position: 'absolute',
              top: '32%',
              right: '2%',
              background: bgCard,
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '10px 16px',
              borderRadius: '16px',
              textAlign: 'left',
              width: '150px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.04)',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <Truck size={13} style={{ color: '#D81BFF' }} />
                <span style={{ fontSize: '11px', fontWeight: '800' }}>Order Tracking</span>
              </div>
              <span style={{ fontSize: '9px', color: colorTextSecondary, display: 'block', fontWeight: '500' }}>Track every stitching stage</span>
            </div>

            {/* 6. Home Delivery (Bottom Right) */}
            <div className="animate-float-2" style={{
              position: 'absolute',
              bottom: '10%',
              right: '4%',
              background: bgCard,
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '10px 16px',
              borderRadius: '16px',
              textAlign: 'left',
              width: '150px',
              boxShadow: '0 12px 28px rgba(0,0,0,0.04)',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <Gift size={13} style={{ color: '#7B2DFF' }} />
                <span style={{ fontSize: '11px', fontWeight: '800' }}>Home Delivery</span>
              </div>
              <span style={{ fontSize: '9px', color: colorTextSecondary, display: 'block', fontWeight: '500' }}>Delivered to your doorstep</span>
            </div>

          </div>

          {/* Bottom Statistics Bar */}
          <div className="animate-float-delayed" style={{
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(16px)',
            border: `1.5px solid ${borderColor}`,
            borderRadius: '20px',
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            width: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
          }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '15px', fontWeight: '800', color: colorTextPrimary, display: 'block' }}>👥 50K+</span>
              <span style={{ fontSize: '10px', color: colorTextMuted, fontWeight: '600' }}>Happy Customers</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '2px' }}>
                ⭐ 4.9
              </span>
              <span style={{ fontSize: '10px', color: colorTextMuted, fontWeight: '600' }}>Rating</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#10b981', display: 'block' }}>👕 100K+</span>
              <span style={{ fontSize: '10px', color: colorTextMuted, fontWeight: '600' }}>Custom Outfits</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#D81BFF', display: 'block' }}>🛡 500+</span>
              <span style={{ fontSize: '10px', color: colorTextMuted, fontWeight: '600' }}>Verified Tailors</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (55% Width) */}
        <div style={{
          width: '55%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '40px'
        }} className="auth-right-column">
          
          {/* Subtle glowing light behind form */}
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            right: '-10px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(216, 27, 255, 0.08)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }} />

          {/* Glassmorphic Form Card */}
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '520px', 
              background: bgCard, 
              backdropFilter: 'blur(20px)',
              border: `1.5px solid ${borderColor}`, 
              borderRadius: '24px', 
              padding: '40px',
              boxShadow: isDark ? '0 30px 60px rgba(0, 0, 0, 0.4)' : '0 30px 60px rgba(106, 0, 244, 0.08)',
              boxSizing: 'border-box',
              zIndex: 20
            }}
            className="auth-card"
          >
            {/* Header Content */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#FF2E8A', display: 'block', marginBottom: '6px' }}>
                {tab === 'login' ? 'Welcome back! 👋' : 'Welcome to StitchBee! 🎉'}
              </span>
              <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: colorTextPrimary, letterSpacing: '-0.5px' }}>
                {tab === 'login' ? 'Login to your account' : 'Create your account'}
              </h2>
            </div>

            {/* Error box */}
            {error && (
              <div style={{ background: 'rgba(255, 46, 138, 0.08)', color: '#FF2E8A', border: '1px solid rgba(255, 46, 138, 0.15)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {tab === 'signup' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="auth-name-phone-row">
                  {/* Full Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Full Name</label>
                    <div 
                      className="input-glow-focus"
                      style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', transition: 'all 0.2s' }}
                    >
                      <User size={16} style={{ color: colorTextMuted, marginRight: '10px', flexShrink: 0 }} />
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '500' }} 
                        required 
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Phone Number</label>
                    <div 
                      className="input-glow-focus"
                      style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', transition: 'all 0.2s' }}
                    >
                      <Phone size={16} style={{ color: colorTextMuted, marginRight: '10px', flexShrink: 0 }} />
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '500' }} 
                        required 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Email Address</label>
                <div 
                  className="input-glow-focus"
                  style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', transition: 'all 0.2s' }}
                >
                  <Mail size={16} style={{ color: colorTextMuted, marginRight: '10px', flexShrink: 0 }} />
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '500' }} 
                    required 
                  />
                </div>
              </div>

              {/* Passwords */}
              <div style={{ display: 'grid', gridTemplateColumns: tab === 'signup' ? '1fr 1fr' : '1fr', gap: '16px' }} className="auth-password-row">
                
                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Password</label>
                  <div 
                    className="input-glow-focus"
                    style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', position: 'relative', transition: 'all 0.2s' }}
                  >
                    <Lock size={16} style={{ color: colorTextMuted, marginRight: '10px', flexShrink: 0 }} />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '500', paddingRight: '24px' }} 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', right: '16px', color: colorTextMuted, display: 'flex', alignItems: 'center' }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                {tab === 'signup' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Confirm Password</label>
                    <div 
                      className="input-glow-focus"
                      style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', position: 'relative', transition: 'all 0.2s' }}
                    >
                      <Lock size={16} style={{ color: colorTextMuted, marginRight: '10px', flexShrink: 0 }} />
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        placeholder="••••••••" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.checked)} 
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '500', paddingRight: '24px' }} 
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', right: '16px', color: colorTextMuted, display: 'flex', alignItems: 'center' }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Roles Cards Grid (Only Signup) */}
              {tab === 'signup' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Register as</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }} className="auth-roles-grid">
                    
                    {[
                      { id: 'customer', name: 'Customer', sub: 'Shop & order', icon: <User size={14} /> },
                      { id: 'tailor', name: 'Tailor Partner', sub: 'Manage orders', icon: <Scissors size={14} /> },
                      { id: 'delivery', name: 'Delivery Partner', sub: 'Deliver orders', icon: <Truck size={14} /> },
                      { id: 'student', name: 'Student Partner', sub: 'Earn & learn', icon: <Star size={14} /> }
                    ].map((roleOpt) => {
                      const isSelected = role === roleOpt.id;
                      return (
                        <div 
                          key={roleOpt.id}
                          onClick={() => setRole(roleOpt.id)}
                          style={{ 
                            border: isSelected ? '1.5px solid #FF2E8A' : `1.5px solid ${borderColor}`,
                            borderRadius: '12px',
                            padding: '10px 8px',
                            background: isSelected ? (isDark ? 'rgba(255, 46, 138, 0.08)' : '#FFF0F5') : (isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF'),
                            cursor: 'pointer',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            position: 'relative',
                            transition: 'all 0.2s ease'
                          }}
                          className="auth-role-card"
                        >
                          {isSelected && (
                            <div style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#FF2E8A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                              <Check size={8} strokeWidth={4} />
                            </div>
                          )}
                          <div style={{ color: isSelected ? '#FF2E8A' : colorTextMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '8px', background: isSelected ? 'rgba(255, 46, 138, 0.1)' : (isDark ? 'rgba(255,255,255,0.05)' : '#F8FAFC'), marginBottom: '2px' }}>
                            {roleOpt.icon}
                          </div>
                          <span style={{ fontSize: '10px', fontWeight: '800', color: isSelected ? '#FF2E8A' : colorTextPrimary, display: 'block', lineHeight: '1.2' }}>{roleOpt.name}</span>
                          <span style={{ fontSize: '8px', color: colorTextMuted, display: 'block', lineHeight: '1' }}>{roleOpt.sub}</span>
                        </div>
                      );
                    })}

                  </div>
                </div>
              )}

              {/* Customer Sizing Address */}
              {tab === 'signup' && role === 'customer' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} className="animate-fade-in">
                  <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Delivery & Sizing Address</label>
                  <div 
                    className="input-glow-focus"
                    style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', transition: 'all 0.2s' }}
                  >
                    <MapPin size={16} style={{ color: colorTextMuted, marginRight: '10px', flexShrink: 0 }} />
                    <input 
                      type="text" 
                      placeholder="123 Green Glen Road, HSR Layout, Bengaluru" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '500' }} 
                      required 
                    />
                  </div>
                </div>
              )}

              {/* Remember Me / Forgot Password */}
              {tab === 'login' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: colorTextSecondary, fontWeight: '600' }}>
                    <input 
                      type="checkbox" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                      style={{ accentColor: '#FF2E8A', width: '16px', height: '16px', borderRadius: '4px' }} 
                    />
                    Remember me
                  </label>
                  <span 
                    onClick={() => alert("Password reset link sent to your email!")}
                    style={{ color: '#FF2E8A', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </span>
                </div>
              )}

              {/* Agree Terms */}
              {tab === 'signup' && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', textAlign: 'left' }}>
                  <input 
                    type="checkbox" 
                    checked={agreeTerms} 
                    onChange={(e) => setAgreeTerms(e.target.checked)} 
                    style={{ accentColor: '#FF2E8A', width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0, marginTop: '1px' }} 
                    required
                  />
                  <span style={{ color: colorTextSecondary, lineHeight: '1.4' }}>
                    I agree to the <strong style={{ color: '#FF2E8A', cursor: 'pointer' }} onClick={() => alert("Terms & Conditions")}>Terms & Conditions</strong> and <strong style={{ color: '#FF2E8A', cursor: 'pointer' }} onClick={() => alert("Privacy Policy")}>Privacy Policy</strong>.
                  </span>
                </div>
              )}

              {/* Gradient Submit Button */}
              <button 
                type="submit"
                className="btn-primary"
                style={{ 
                  width: '100%', 
                  height: '56px',
                  background: 'linear-gradient(135deg, #FF2E8A 0%, #7B2DFF 100%)', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '16px', 
                  fontWeight: '700', 
                  fontSize: '16px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  boxShadow: '0 12px 28px rgba(255, 46, 138, 0.2)',
                  marginTop: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(255, 46, 138, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(255, 46, 138, 0.2)';
                }}
              >
                <span>{tab === 'login' ? 'Login to Portal' : 'Create Account'}</span>
                <ArrowRight size={18} />
              </button>

            </form>

            {/* Below Submit Indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '16px', fontSize: '11px', color: colorTextMuted, fontWeight: '600' }}>
              <span>✓ Secure Login</span>
              <span>• Privacy Protected</span>
              <span>• Trusted by Thousands</span>
            </div>

            {/* Separator */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0 16px 0' }}>
              <div style={{ flex: 1, height: '1px', background: borderColor }} />
              <span style={{ padding: '0 12px', fontSize: '11px', color: colorTextMuted, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: borderColor }} />
            </div>

            {/* Social Logins */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="auth-social-row">
              
              <button 
                type="button"
                onClick={() => handleQuickFill('customer@stitchbee.com', 'customer123')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', border: `1.5px solid ${borderColor}`, height: '48px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
                title="Google Login"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.borderColor = '#FF2E8A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = borderColor;
                }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{ width: '16px', height: '16px' }} />
                <span>Google</span>
              </button>

              <button 
                type="button"
                onClick={() => handleQuickFill('delivery@stitchbee.com', 'delivery123')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', border: `1.5px solid ${borderColor}`, height: '48px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
                title="Apple Login"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.borderColor = '#7B2DFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = borderColor;
                }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style={{ width: '14px', height: '14px', filter: isDark ? 'invert(1)' : 'none' }} />
                <span>Apple</span>
              </button>

              <button 
                type="button"
                onClick={() => handleQuickFill('tailor@stitchbee.com', 'tailor123')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', border: `1.5px solid ${borderColor}`, height: '48px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
                title="Facebook Login"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.borderColor = '#1877F2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = borderColor;
                }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" style={{ width: '16px', height: '16px' }} />
                <span>Facebook</span>
              </button>

            </div>

          </div>
        </div>

      </main>

      {/* BOTTOM TRUST FEATURES FOOTER */}
      <footer style={{
        padding: '0 40px 40px 40px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        boxSizing: 'border-box',
        zIndex: 10,
        position: 'relative',
        marginTop: 'auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          maxWidth: '1200px',
          width: '100%'
        }} className="auth-trust-row">
          
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            textAlign: 'left',
            padding: '20px',
            borderRadius: '20px',
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${borderColor}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(29, 185, 84, 0.12)', color: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={22} />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>🛡 Secure Orders</span>
              <span style={{ fontSize: '12px', color: colorTextMuted, display: 'block', marginTop: '2px' }}>End-to-end protected</span>
            </div>
          </div>

          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            textAlign: 'left',
            padding: '20px',
            borderRadius: '20px',
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${borderColor}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(114, 9, 183, 0.12)', color: '#7B2DFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Headphones size={22} />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>💬 24/7 Customer Support</span>
              <span style={{ fontSize: '12px', color: colorTextMuted, display: 'block', marginTop: '2px' }}>Always available</span>
            </div>
          </div>

          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            textAlign: 'left',
            padding: '20px',
            borderRadius: '20px',
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${borderColor}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 46, 138, 0.12)', color: '#FF2E8A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CreditCard size={22} />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>💳 Secure Payments</span>
              <span style={{ fontSize: '12px', color: colorTextMuted, display: 'block', marginTop: '2px' }}>Multiple payment methods</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
