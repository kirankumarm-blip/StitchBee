import React, { useState, useEffect } from 'react';
import { Scissors, User, Lock, Mail, MapPin, Sparkles, Check, Truck, Phone, Star, Eye, EyeOff, Sun, Moon, Headphones, ArrowRight, Shield, ShieldAlert, CreditCard } from 'lucide-react';

export default function AuthPage({ tab = 'login', setTab, onLoginSuccess, onClose, theme, setTheme, initialRole = 'customer' }) {
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
    ? 'radial-gradient(circle at 10% 20%, rgba(106, 0, 244, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(236, 11, 121, 0.15) 0%, transparent 40%), #0b081e'
    : 'radial-gradient(circle at 10% 20%, rgba(106, 0, 244, 0.08) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(236, 11, 121, 0.08) 0%, transparent 45%), #FFFDFC';
  const bgCard = isDark ? '#120f26' : '#FFFFFF';
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
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
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
          }}>RIDER PORTAL</span>
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
              {tab === 'login' ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
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
              {tab === 'login' ? 'Sign Up' : 'Login'}
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
        
        {/* LEFT COLUMN (45% Width) */}
        <div style={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '32px',
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
              fontSize: '56px',
              fontWeight: '800',
              lineHeight: '1.05',
              letterSpacing: '-2px',
              color: colorTextPrimary,
              margin: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <span>Delivering</span>
              <span style={{ color: '#f72585' }}>Style.</span>
              <span style={{ color: '#7209b7' }}>Precision.</span>
              <span>Perfection.</span>
            </h1>
            <div style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #f72585 0%, #7209b7 100%)',
              borderRadius: '2px',
              marginTop: '16px',
              marginBottom: '20px'
            }} />
            <p style={{
              fontSize: '16px',
              color: colorTextSecondary,
              lineHeight: '1.5',
              maxWidth: '440px',
              margin: 0,
              fontWeight: '500'
            }}>
              Manage deliveries, pickups, customer measurements and earnings in one place.
            </p>
          </div>

          {/* REDESIGNED ILLUSTRATION AREA: Floating Smartphone Map Mockup */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '340px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '24px',
            background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
            border: `1.5px solid ${borderColor}`,
            overflow: 'hidden'
          }}>
            {/* Grid visual inside area */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: isDark 
                ? 'radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)' 
                : 'radial-gradient(rgba(114, 9, 183, 0.15) 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              opacity: 0.9
            }} />

            {/* Glowing lights inside area */}
            <div className="animate-glow" style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(114, 9, 183, 0.15) 0%, transparent 70%)',
              top: '20%',
              left: '25%',
              pointerEvents: 'none'
            }} />
            
            {/* Smartphone mockup */}
            <div className="animate-float" style={{
              width: '190px',
              height: '310px',
              background: isDark ? '#16132D' : '#FFFFFF',
              borderRadius: '32px',
              border: isDark ? '4px solid #2A254D' : '4px solid #131A34',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}>
              {/* Phone Speaker Notch */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '16px',
                background: isDark ? '#2A254D' : '#131A34',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                zIndex: 10
              }} />

              {/* Map background screen visual */}
              <div style={{
                flex: 1,
                position: 'relative',
                backgroundImage: isDark
                  ? 'url("https://a.basemaps.cartocdn.com/dark_all/13/5862/3475.png")'
                  : 'url("https://a.basemaps.cartocdn.com/rastertiles/voyager/13/5862/3475.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                {/* Contrast overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: isDark ? 'rgba(15, 12, 36, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                  pointerEvents: 'none'
                }} />

                {/* SVG path with active animation */}
                <svg viewBox="0 0 200 300" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
                  {/* Decorative map street grid */}
                  <path d="M 0 60 L 200 80 M 0 160 L 200 130 M 0 240 L 200 250 M 60 0 L 80 300 M 140 0 L 120 300" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'} strokeWidth="1.5" fill="none" />
                  
                  {/* Active delivery path */}
                  <path d="M 40 250 C 60 180, 140 160, 160 80" stroke="rgba(114, 9, 183, 0.2)" strokeWidth="8" fill="none" strokeLinecap="round" />
                  <path id="delivery-route" d="M 40 250 C 60 180, 140 160, 160 80" stroke="#f72585" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="6,4" />

                  {/* Pulsing delivery target */}
                  <circle cx="160" cy="80" r="10" fill="rgba(247, 37, 133, 0.2)" className="animate-glow" />
                  <circle cx="160" cy="80" r="4" fill="#f72585" />

                  {/* Pulse driver position tracker dot */}
                  <circle r="6" fill="#7209b7" stroke="#ffffff" strokeWidth="2">
                    <animateMotion dur="6s" repeatCount="indefinite" path="M 40 250 C 60 180, 140 160, 160 80" />
                  </circle>
                </svg>

                {/* Simulated delivery HUD overlay inside phone */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  background: 'rgba(15, 12, 36, 0.9)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '12px',
                  padding: '8px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ffffff',
                  zIndex: 5
                }}>
                  <div style={{ background: '#f72585', borderRadius: '6px', padding: '4px', display: 'flex', alignItems: 'center' }}>
                    <Truck size={14} style={{ color: '#ffffff' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', opacity: 0.8, display: 'block', fontWeight: '700', color: '#ffffff' }}>Active Order</span>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#ffffff' }}>HSR Layout → 2.1km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating delivery pin (Absolute outside phone, top right) */}
            <div className="animate-float" style={{
              position: 'absolute',
              top: '15%',
              right: '15%',
              background: '#f72585',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '12px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 10px 20px rgba(247, 37, 133, 0.35)',
              zIndex: 20
            }}>
              <MapPin size={12} style={{ color: '#ffffff' }} />
              <span style={{ color: '#ffffff' }}>StitchBee #1408</span>
            </div>

            {/* Floating delivery pin (Absolute outside phone, bottom left) */}
            <div className="animate-float-delayed" style={{
              position: 'absolute',
              bottom: '15%',
              left: '10%',
              background: '#7209b7',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '30px',
              fontSize: '12px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 10px 20px rgba(114, 9, 183, 0.35)',
              zIndex: 20
            }}>
              <MapPin size={12} style={{ color: '#ffffff' }} />
              <span style={{ color: '#ffffff' }}>Earnings +₹185</span>
            </div>
            
            {/* Bottom floating statistics card */}
            <div className="animate-float" style={{
              position: 'absolute',
              bottom: '15px',
              right: '25px',
              background: isDark ? 'rgba(22, 19, 45, 0.85)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${borderColor}`,
              borderRadius: '16px',
              padding: '12px 16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 20
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: colorTextPrimary }}>10K+ Riders</span>
                <span style={{ fontSize: '10px', color: colorTextSecondary, fontWeight: '600' }}>★★★★★ 4.9 Rating</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: borderColor }} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#1DB954' }}>95%</span>
                <span style={{ fontSize: '10px', color: colorTextSecondary, fontWeight: '600', display: 'block' }}>On-Time</span>
              </div>
            </div>
          </div>

          {/* Premium Glass Cards replacing standard feature boxes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px'
          }} className="auth-features-grid">
            
            <div style={{
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${borderColor}`,
              borderRadius: '16px',
              padding: '16px 12px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ fontSize: '20px' }}>🔒</div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: colorTextPrimary }}>Secure Access</span>
              <span style={{ fontSize: '10px', color: colorTextMuted, lineHeight: '1.3' }}>Your data is encrypted and protected.</span>
            </div>

            <div style={{
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${borderColor}`,
              borderRadius: '16px',
              padding: '16px 12px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ fontSize: '20px' }}>⚡</div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: colorTextPrimary }}>Lightning Fast</span>
              <span style={{ fontSize: '10px', color: colorTextMuted, lineHeight: '1.3' }}>Login and view deliveries in seconds.</span>
            </div>

            <div style={{
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${borderColor}`,
              borderRadius: '16px',
              padding: '16px 12px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ fontSize: '20px' }}>🛵</div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: colorTextPrimary }}>Trusted Riders</span>
              <span style={{ fontSize: '10px', color: colorTextMuted, lineHeight: '1.3' }}>10,000+ verified partner riders.</span>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN (55% Width) */}
        <div style={{
          width: '55%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }} className="auth-right-column">
          
          {/* Glow blob behind form card */}
          <div className="animate-glow" style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(106, 0, 244, 0.12) 0%, transparent 70%)',
            top: '10%',
            right: '10%',
            pointerEvents: 'none'
          }} />

          {/* Redesigned Floating Glass Form Card */}
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '520px', 
              background: isDark ? 'rgba(18, 15, 38, 0.75)' : 'rgba(255, 255, 255, 0.75)', 
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

              {/* Password row */}
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
                      style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', right: '14px', color: colorTextMuted, display: 'flex', alignItems: 'center' }}
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
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '500', paddingRight: '24px' }} 
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', right: '14px', color: colorTextMuted, display: 'flex', alignItems: 'center' }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Sizing Address (Only Signup + customer, but we keep the logic intact) */}
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

              {/* Gradient Submit Button */}
              <button 
                type="submit"
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
              <span>• End-to-end encrypted</span>
              <span>• Background verified riders</span>
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
                onClick={() => handleQuickFill('delivery@stitchbee.com', 'delivery123')}
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
                onClick={() => handleQuickFill('delivery@stitchbee.com', 'delivery123')}
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

      {/* BOTTOM FOOTER / FEATURE CARDS */}
      <footer style={{
        padding: '40px',
        width: '100%',
        boxSizing: 'border-box',
        zIndex: 50,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        background: isDark ? 'rgba(11, 8, 30, 0.4)' : 'rgba(255, 253, 252, 0.4)'
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
              <span style={{ fontSize: '15px', fontWeight: '800', color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>🛡 Verified Riders</span>
              <span style={{ fontSize: '12px', color: colorTextMuted, display: 'block', marginTop: '2px' }}>Fully background checked partner network</span>
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
              <span style={{ fontSize: '15px', fontWeight: '800', color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>🎧 24/7 Support</span>
              <span style={{ fontSize: '12px', color: colorTextMuted, display: 'block', marginTop: '2px' }}>Direct hotline support for active deliveries</span>
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
              <span style={{ fontSize: '12px', color: colorTextMuted, display: 'block', marginTop: '2px' }}>Instant payouts to verified partner wallets</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
