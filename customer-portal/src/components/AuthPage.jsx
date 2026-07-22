import React, { useState, useEffect } from 'react';
import { 
  Scissors, User, Lock, Mail, MapPin, Sparkles, Check, Truck, 
  Phone, Star, Eye, EyeOff, Sun, Moon, Headphones, ArrowRight, 
  Shield, ShieldAlert, CreditCard, Activity, Calendar, Award, 
  Layers, CheckCircle, Tag, ShoppingBag, Gift
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
    ? 'radial-gradient(circle at 10% 20%, rgba(114, 9, 183, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(247, 37, 133, 0.15) 0%, transparent 40%), #0b081e'
    : 'radial-gradient(circle at 10% 20%, rgba(114, 9, 183, 0.08) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(247, 37, 133, 0.08) 0%, transparent 45%), #FFFDFC';
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
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes spark {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(5px, -5px) rotate(1deg); }
          66% { transform: translate(-3px, 4px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        .animate-drift {
          animation: drift 10s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 5s ease-in-out infinite;
        }
        .animate-sparkle {
          animation: spark 3s ease-in-out infinite;
        }
        .input-glow-focus:focus-within {
          border-color: #f72585 !important;
          box-shadow: 0 0 0 4px rgba(247, 37, 133, 0.15) !important;
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

      {/* Background blobs */}
      <div className="animate-glow" style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'rgba(247, 37, 133, 0.05)',
        filter: 'blur(120px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      <div className="animate-glow" style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '350px',
        height: '350px',
        background: 'rgba(114, 9, 183, 0.05)',
        filter: 'blur(120px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Tiny Sparkles */}
      <div className="animate-sparkle" style={{
        position: 'absolute',
        top: '15%',
        right: '40%',
        color: '#f72585',
        opacity: 0.3,
        pointerEvents: 'none',
        zIndex: 1
      }}><Sparkles size={16} /></div>
      <div className="animate-sparkle" style={{
        position: 'absolute',
        bottom: '25%',
        left: '45%',
        color: '#7209b7',
        opacity: 0.3,
        pointerEvents: 'none',
        zIndex: 1
      }}><Sparkles size={20} /></div>

      {/* Abstract City Skyline SVG */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '180px',
        opacity: isDark ? 0.07 : 0.03,
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <svg viewBox="0 0 1440 180" style={{ width: '100%', height: '100%', verticalAlign: 'bottom' }}>
          <path d="M0,180 L0,140 L40,140 L40,110 L80,110 L80,150 L120,150 L120,90 L180,90 L180,130 L220,130 L220,70 L260,70 L260,150 L320,150 L320,120 L380,120 L380,160 L420,160 L420,100 L480,100 L480,140 L520,140 L520,80 L580,80 L580,130 L640,130 L640,95 L700,95 L700,150 L760,150 L760,110 L820,110 L820,160 L880,160 L880,85 L940,85 L940,125 L980,125 L980,75 L1040,75 L1040,140 L1100,140 L1100,105 L1160,105 L1160,150 L1220,150 L1220,90 L1280,90 L1280,130 L1320,130 L1320,60 L1380,60 L1380,140 L1440,140 L1440,180 Z" fill={isDark ? '#ffffff' : '#000000'} />
        </svg>
      </div>

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
          <Scissors size={24} style={{ color: '#f72585', transform: 'rotate(-45deg)' }} />
          <span style={{ fontSize: '22px', fontWeight: '800', color: colorTextPrimary, letterSpacing: '-0.5px' }}>
            StitchBee
          </span>
          <span style={{
            fontSize: '9px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, rgba(247, 37, 133, 0.1) 0%, rgba(114, 9, 183, 0.1) 100%)',
            color: '#f72585',
            padding: '3px 8px',
            borderRadius: '8px',
            border: '1px solid rgba(247, 37, 133, 0.2)',
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
                background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
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
                boxShadow: '0 4px 12px rgba(247, 37, 133, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(247, 37, 133, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(247, 37, 133, 0.2)';
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
        
        {/* LEFT COLUMN (HERO SECTION - 45% Width) */}
        <div style={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '24px',
          position: 'relative',
          paddingBottom: '40px'
        }} className="auth-left-column">
          
          {/* Subtle glowing light behind headline */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '-20px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(247, 37, 133, 0.15)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }} />

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
              <span style={{ color: '#f72585' }}>Designed</span>
              <span style={{ color: '#7209b7' }}>for You.</span>
            </h1>
            <div style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #f72585 0%, #7209b7 100%)',
              borderRadius: '2px',
              marginTop: '12px',
              marginBottom: '16px'
            }} />
            <p style={{
              fontSize: '15px',
              color: colorTextSecondary,
              lineHeight: '1.5',
              maxWidth: '440px',
              margin: 0,
              fontWeight: '500'
            }}>
              Book tailors, manage measurements, track orders and enjoy a premium stitching experience.
            </p>
          </div>

          {/* PREMIUM 3D ILLUSTRATION BOUTIQUE CANVAS */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '24px',
            background: isDark 
              ? 'radial-gradient(circle at 50% 50%, #16132D 0%, #0c091f 100%)' 
              : 'radial-gradient(circle at 50% 50%, #fbfafd 0%, #f1effb 100%)',
            border: `1.5px solid ${borderColor}`,
            overflow: 'hidden',
            boxShadow: 'inset 0 0 40px rgba(114, 9, 183, 0.05)'
          }}>
            {/* Grid dot layer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: isDark 
                ? 'radial-gradient(rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px)' 
                : 'radial-gradient(rgba(114, 9, 183, 0.12) 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
              opacity: 0.8
            }} />

            {/* Boutique store backdrop silhouettes (Luxury clothes rack and hanger displays) */}
            <svg viewBox="0 0 400 300" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, opacity: isDark ? 0.08 : 0.04, pointerEvents: 'none' }}>
              <line x1="40" y1="280" x2="360" y2="280" stroke="currentColor" strokeWidth="4" />
              <line x1="80" y1="280" x2="80" y2="100" stroke="currentColor" strokeWidth="3" />
              <line x1="320" y1="280" x2="320" y2="100" stroke="currentColor" strokeWidth="3" />
              <line x1="80" y1="110" x2="320" y2="110" stroke="currentColor" strokeWidth="3" />
              {/* Hanging clothes silhouettes */}
              <path d="M 110 110 L 110 240 L 140 240 L 140 110 Z" fill="currentColor" />
              <path d="M 160 110 L 160 220 L 195 220 L 195 110 Z" fill="currentColor" />
              <path d="M 210 110 L 210 250 L 240 250 L 240 110 Z" fill="currentColor" />
              <path d="M 260 110 L 260 210 L 290 210 L 290 110 Z" fill="currentColor" />
            </svg>

            {/* Interactive Vector Scene: Customer & Tailor */}
            <svg viewBox="0 0 400 480" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
              {/* Sewing Machine Outline on bottom left table */}
              <rect x="30" y="380" width="80" height="8" rx="2" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.05)'} />
              <path d="M 50 380 L 50 350 L 90 350 L 90 365 L 80 365 L 80 380" stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.1)'} strokeWidth="3" fill="none" />
              
              {/* Mannequin Stand on bottom right */}
              <line x1="330" y1="310" x2="330" y2="430" stroke={isDark ? 'rgba(255,255,255,0.18)' : 'rgba(15,23,42,0.12)'} strokeWidth="3" />
              <line x1="310" y1="430" x2="350" y2="430" stroke={isDark ? 'rgba(255,255,255,0.18)' : 'rgba(15,23,42,0.12)'} strokeWidth="3" />
              {/* Mannequin Body torso outline */}
              <path d="M 315 310 C 315 260, 345 260, 345 310 L 340 370 L 320 370 Z" fill={isDark ? 'rgba(114, 9, 183, 0.08)' : 'rgba(247, 37, 133, 0.04)'} stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.12)'} strokeWidth="1.5" />
            </svg>

            {/* Central Floating Smartphone Mockup */}
            <div className="animate-float" style={{
              width: '180px',
              height: '290px',
              background: isDark ? '#16132D' : '#FFFFFF',
              borderRadius: '28px',
              border: isDark ? '4px solid #2A254D' : '4px solid #131A34',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              zIndex: 10
            }}>
              {/* Speaker Notch */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '56px',
                height: '14px',
                background: isDark ? '#2A254D' : '#131A34',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                zIndex: 15
              }} />

              {/* Map/App UI inside phone screen */}
              <div style={{
                flex: 1,
                position: 'relative',
                backgroundImage: isDark
                  ? 'url("https://a.basemaps.cartocdn.com/dark_all/13/5862/3475.png")'
                  : 'url("https://a.basemaps.cartocdn.com/rastertiles/voyager/13/5862/3475.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: isDark ? 'rgba(15, 12, 36, 0.35)' : 'rgba(255, 255, 255, 0.1)',
                  pointerEvents: 'none'
                }} />

                {/* SVG path with active animation */}
                <svg viewBox="0 0 200 300" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
                  <path d="M 30 240 C 50 180, 130 160, 150 80" stroke="rgba(114, 9, 183, 0.15)" strokeWidth="6" fill="none" />
                  <path id="route-line" d="M 30 240 C 50 180, 130 160, 150 80" stroke="#f72585" strokeWidth="3" fill="none" strokeDasharray="5,3" />
                  <circle cx="150" cy="80" r="4" fill="#f72585" />
                  <circle r="5" fill="#7209b7" stroke="#ffffff" strokeWidth="1.5">
                    <animateMotion dur="5s" repeatCount="indefinite" path="M 30 240 C 50 180, 130 160, 150 80" />
                  </circle>
                </svg>

                {/* Smartphone HUD Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  right: '8px',
                  background: 'rgba(15, 12, 36, 0.9)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '10px',
                  padding: '6px 8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ffffff',
                  zIndex: 5
                }}>
                  <div style={{ background: '#f72585', borderRadius: '4px', padding: '3px', display: 'flex', alignItems: 'center' }}>
                    <Truck size={10} style={{ color: '#ffffff' }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '8px', opacity: 0.8, display: 'block', fontWeight: '700', color: '#ffffff' }}>Active Order</span>
                    <span style={{ fontSize: '9px', fontWeight: '800', color: '#ffffff' }}>Stitching In Progress</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 8 FLOATING GLASSMORPHIC BADGES (Apple/Stripe Style) */}
            
            {/* 1. AI Body Measurement (Top Right) */}
            <div className="animate-float" style={{
              position: 'absolute',
              top: '8%',
              right: '4%',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              zIndex: 20
            }}>
              <Activity size={12} style={{ color: '#f72585' }} />
              <span>AI Body Measurement</span>
            </div>

            {/* 2. Tailor Assigned (Mid Left) */}
            <div className="animate-float-delayed" style={{
              position: 'absolute',
              top: '30%',
              left: '4%',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              zIndex: 20
            }}>
              <Award size={12} style={{ color: '#7209b7' }} />
              <span>Tailor Assigned</span>
            </div>

            {/* 3. Fabric Selected (Top Left) */}
            <div className="animate-float" style={{
              position: 'absolute',
              top: '12%',
              left: '6%',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              zIndex: 20
            }}>
              <Layers size={12} style={{ color: '#f72585' }} />
              <span>Fabric Selected</span>
            </div>

            {/* 4. Stitch Design Selected (Mid Right) */}
            <div className="animate-float-delayed" style={{
              position: 'absolute',
              top: '35%',
              right: '2%',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              zIndex: 20
            }}>
              <Scissors size={12} style={{ color: '#7209b7' }} />
              <span>Design Selected</span>
            </div>

            {/* 5. Live Order Tracking (Center Overlay) */}
            <div className="animate-float" style={{
              position: 'absolute',
              top: '20%',
              right: '25%',
              background: '#f72585',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '11px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 10px 20px rgba(247, 37, 133, 0.35)',
              zIndex: 20
            }}>
              <MapPin size={12} style={{ color: '#ffffff' }} />
              <span style={{ color: '#ffffff' }}>Live Order Tracking</span>
            </div>

            {/* 6. Appointment Confirmed (Bottom Left) */}
            <div className="animate-float" style={{
              position: 'absolute',
              bottom: '22%',
              left: '5%',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              zIndex: 20
            }}>
              <Calendar size={12} style={{ color: '#f72585' }} />
              <span>Appointment Confirmed</span>
            </div>

            {/* 7. Order Ready (Bottom Right) */}
            <div className="animate-float-delayed" style={{
              position: 'absolute',
              bottom: '25%',
              right: '6%',
              background: '#7209b7',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '11px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 10px 20px rgba(114, 9, 183, 0.35)',
              zIndex: 20
            }}>
              <CheckCircle size={12} style={{ color: '#ffffff' }} />
              <span style={{ color: '#ffffff' }}>Order Ready</span>
            </div>

            {/* 8. Premium Customer Rating (Center Left) */}
            <div className="animate-float-delayed" style={{
              position: 'absolute',
              top: '55%',
              left: '8%',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: `1.5px solid ${borderColor}`,
              color: colorTextPrimary,
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              zIndex: 20
            }}>
              <Star size={12} fill="#fbbf24" style={{ color: '#fbbf24' }} />
              <span>4.9 Customer Rating</span>
            </div>

            {/* 10 FLOATING CLOTHING PREVIEW BADGES (Apple/Nike Style) */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              right: '10px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              justifyContent: 'center',
              zIndex: 20
            }}>
              {[
                { label: '🧥 Sherwani' },
                { label: '👔 Kurta' },
                { label: '🧥 Blazer' },
                { label: '👔 Suit' },
                { label: '👗 Lehenga' },
                { label: '✨ Saree Blouse' },
                { label: '👗 Anarkali' },
                { label: '👶 Kids Wear' },
                { label: '👗 Western Dress' },
                { label: '👑 Wedding Collection' }
              ].map((item, idx) => (
                <span 
                  key={idx} 
                  className="animate-drift"
                  style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    color: colorTextSecondary,
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${borderColor}`,
                    padding: '3px 8px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.01)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    animationDelay: `${idx * 0.8}s`
                  }}
                >
                  {item.label}
                </span>
              ))}
            </div>

            {/* Floating Luxury Sewing Elements in corners */}
            <div className="animate-float" style={{ position: 'absolute', left: '15%', bottom: '40%', opacity: 0.4, color: colorTextMuted }}><Scissors size={14} /></div>
            <div className="animate-float-delayed" style={{ position: 'absolute', right: '15%', top: '25%', opacity: 0.4, color: colorTextMuted }}><Sparkles size={14} /></div>

          </div>

          {/* Bottom floating statistics card */}
          <div className="animate-float-delayed" style={{
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(16px)',
            border: `1.5px solid ${borderColor}`,
            borderRadius: '20px',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
          }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '20px', fontWeight: '800', color: colorTextPrimary, display: 'block' }}>50K+</span>
              <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '600' }}>Happy Customers</span>
            </div>
            <div style={{ width: '1px', height: '30px', background: borderColor }} />
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '20px', fontWeight: '800', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px' }}>
                4.9 <Star size={16} fill="#fbbf24" style={{ color: '#fbbf24' }} />
              </span>
              <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '600' }}>Customer Rating</span>
            </div>
            <div style={{ width: '1px', height: '30px', background: borderColor }} />
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '20px', fontWeight: '800', color: '#10b981', display: 'block' }}>100K+</span>
              <span style={{ fontSize: '12px', color: colorTextMuted, fontWeight: '600' }}>Orders Delivered</span>
            </div>
          </div>

          {/* Grid features layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            width: '100%'
          }}>
            {[
              { title: "🧵 Personalized Stitching", desc: "Custom tailoring made for your style." },
              { title: "📏 AI Body Measurements", desc: "Fast and accurate measurements." },
              { title: "🚚 Live Order Tracking", desc: "Track your outfit in real time." },
              { title: "⭐ Trusted Tailors", desc: "Verified professionals with top ratings." }
            ].map((feat, idx) => (
              <div key={idx} style={{
                background: bgCard,
                backdropFilter: 'blur(10px)',
                border: `1.5px solid ${borderColor}`,
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'left',
                transition: 'transform 0.2s',
                boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <h4 style={{ fontSize: '14px', fontWeight: '800', margin: '0 0 4px 0', color: colorTextPrimary }}>{feat.title}</h4>
                <p style={{ fontSize: '11px', color: colorTextSecondary, margin: 0, lineHeight: '1.4' }}>{feat.desc}</p>
              </div>
            ))}
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
            background: 'rgba(106, 0, 244, 0.1)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }} />

          {/* Redesigned Floating Glass Form Card */}
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
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#f72585', display: 'block', marginBottom: '6px' }}>
                {tab === 'login' ? 'Welcome back! 👋' : 'Welcome to StitchBee! 🎉'}
              </span>
              <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: colorTextPrimary, letterSpacing: '-0.5px' }}>
                {tab === 'login' ? 'Login to your account' : 'Create your account'}
              </h2>
            </div>

            {/* Error box */}
            {error && (
              <div style={{ background: 'rgba(247, 37, 133, 0.08)', color: '#f72585', border: '1px solid rgba(247, 37, 133, 0.15)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
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
                            border: isSelected ? '1.5px solid #f72585' : `1.5px solid ${borderColor}`,
                            borderRadius: '12px',
                            padding: '10px 8px',
                            background: isSelected ? (isDark ? 'rgba(247, 37, 133, 0.08)' : '#FFF0F5') : (isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF'),
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
                            <div style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#f72585', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                              <Check size={8} strokeWidth={4} />
                            </div>
                          )}
                          <div style={{ color: isSelected ? '#f72585' : colorTextMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '8px', background: isSelected ? 'rgba(247, 37, 133, 0.1)' : (isDark ? 'rgba(255,255,255,0.05)' : '#F8FAFC'), marginBottom: '2px' }}>
                            {roleOpt.icon}
                          </div>
                          <span style={{ fontSize: '10px', fontWeight: '800', color: isSelected ? '#f72585' : colorTextPrimary, display: 'block', lineHeight: '1.2' }}>{roleOpt.name}</span>
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
                      style={{ accentColor: '#f72585', width: '16px', height: '16px', borderRadius: '4px' }} 
                    />
                    Remember me
                  </label>
                  <span 
                    onClick={() => alert("Password reset link sent to your email!")}
                    style={{ color: '#f72585', fontWeight: '700', cursor: 'pointer' }}
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
                    style={{ accentColor: '#f72585', width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0, marginTop: '1px' }} 
                    required
                  />
                  <span style={{ color: colorTextSecondary, lineHeight: '1.4' }}>
                    I agree to the <strong style={{ color: '#f72585', cursor: 'pointer' }} onClick={() => alert("Terms & Conditions")}>Terms & Conditions</strong> and <strong style={{ color: '#f72585', cursor: 'pointer' }} onClick={() => alert("Privacy Policy")}>Privacy Policy</strong>.
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
                  background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', 
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
                  boxShadow: '0 12px 28px rgba(247, 37, 133, 0.2)',
                  marginTop: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(247, 37, 133, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(247, 37, 133, 0.2)';
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
                  e.currentTarget.style.borderColor = '#f72585';
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
                  e.currentTarget.style.borderColor = '#7209b7';
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
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(114, 9, 183, 0.12)', color: '#7209b7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(247, 37, 133, 0.12)', color: '#f72585', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
