import React, { useState, useEffect } from 'react';
import { 
  Scissors, User, Lock, Mail, MapPin, Sparkles, Check, Truck, 
  Phone, Star, Eye, EyeOff, Sun, Moon, Headphones, ArrowRight, 
  Shield, CreditCard, Activity, Calendar, Award, Layers, 
  CheckCircle, Tag, ShoppingBag, Gift, X
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
        backgroundImage: "url('/login_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', 
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

      {/* Top bar removed per user specification */}

      {/* MAIN CONTAINER */}
      <main style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '16px 60px 12px',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 10,
        position: 'relative'
      }} className="auth-main-wrapper">
        
        {/* Glassmorphic Form Card (Right Side) */}
        <div 
          style={{ 
            width: '100%', 
            maxWidth: '460px', 
            background: isDark ? 'rgba(18, 15, 38, 0.95)' : 'rgba(255, 255, 255, 0.96)', 
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1.5px solid ${borderColor}`, 
            borderRadius: '20px', 
            padding: '20px 28px 18px',
            boxShadow: isDark ? '0 24px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 46, 138, 0.12)' : '0 24px 50px rgba(0, 0, 0, 0.18), 0 0 30px rgba(255, 46, 138, 0.08)',
            boxSizing: 'border-box',
            zIndex: 20,
            position: 'relative'
          }}
          className="auth-card"
        >
          {/* Close (X) button on top-left of card */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
                border: isDark ? '1.5px solid rgba(255, 255, 255, 0.2)' : '1.5px solid #cbd5e1',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isDark ? '#e2e8f0' : '#475569',
                boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              title="Return to Home"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.color = '#FF2E8A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.color = isDark ? '#e2e8f0' : '#475569';
              }}
            >
              <X size={18} />
            </button>
          )}

          {/* Dark / Light Mode Corner Icon Button on top-right of card - clearly visible */}
          <button 
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              background: isDark ? 'rgba(255, 255, 255, 0.12)' : '#ffffff',
              border: isDark ? '1.5px solid rgba(251, 191, 36, 0.45)' : '1.5px solid #94a3b8',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isDark ? '#fbbf24' : '#0f172a',
              boxShadow: isDark ? '0 4px 12px rgba(251, 191, 36, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.12)',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isDark ? (
              <Sun size={20} style={{ filter: 'drop-shadow(0 0 5px rgba(251, 191, 36, 0.7))' }} />
            ) : (
              <Moon size={20} style={{ color: '#1e293b' }} />
            )}
          </button>

          {/* StitchBee Logo placed cleanly inside the card */}
          <div 
            onClick={onClose}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              marginTop: '2px',
              marginBottom: '8px'
            }}
            title="StitchBee Atelier"
          >
            <img 
              src="/logo.png" 
              alt="StitchBee" 
              style={{ height: '42px', maxWidth: '190px', objectFit: 'contain' }} 
            />
          </div>

          {/* Header Content */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#FF2E8A', display: 'block', marginBottom: '2px' }}>
              {tab === 'login' ? 'Welcome back! 👋' : 'Welcome to StitchBee! 🎉'}
            </span>
            <h2 style={{ margin: 0, fontSize: '23px', fontWeight: '800', color: colorTextPrimary, letterSpacing: '-0.5px' }}>
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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              
              {tab === 'signup' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="auth-name-phone-row">
                  {/* Full Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Full Name</label>
                    <div 
                      className="input-glow-focus"
                      style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', transition: 'all 0.2s' }}
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
                      style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', transition: 'all 0.2s' }}
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
                  style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', transition: 'all 0.2s' }}
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
                    style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', position: 'relative', transition: 'all 0.2s' }}
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
                      style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', position: 'relative', transition: 'all 0.2s' }}
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
                        style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', right: '16px', color: colorTextMuted, display: 'flex', alignItems: 'center' }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

              </div>



              {/* Customer Sizing Address */}
              {tab === 'signup' && role === 'customer' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} className="animate-fade-in">
                  <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Delivery & Sizing Address</label>
                  <div 
                    className="input-glow-focus"
                    style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', transition: 'all 0.2s' }}
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
                  height: '46px',
                  background: 'linear-gradient(135deg, #FF2E8A 0%, #7B2DFF 100%)', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '16px', 
                  fontWeight: '700', 
                  fontSize: '15px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  boxShadow: '0 12px 28px rgba(255, 46, 138, 0.2)',
                  marginTop: '4px',
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
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '8px', fontSize: '11px', color: colorTextMuted, fontWeight: '600' }}>
              <span>✓ Secure Login</span>
              <span>• Privacy Protected</span>
              <span>• Trusted by Thousands</span>
            </div>

            {/* Separator */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 8px 0' }}>
              <div style={{ flex: 1, height: '1px', background: borderColor }} />
              <span style={{ padding: '0 12px', fontSize: '11px', color: colorTextMuted, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: borderColor }} />
            </div>

            {/* Social Logins */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="auth-social-row">
              
              <button 
                type="button"
                onClick={() => handleQuickFill('customer@stitchbee.com', 'customer123')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', border: `1.5px solid ${borderColor}`, height: '38px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
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
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', border: `1.5px solid ${borderColor}`, height: '38px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
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
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', border: `1.5px solid ${borderColor}`, height: '38px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
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

            {/* Direct Switch Link */}
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: colorTextSecondary }}>
              {tab === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('signup')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FF2E8A',
                      fontWeight: '700',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline'
                    }}
                  >
                    Create Account
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FF2E8A',
                      fontWeight: '700',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline'
                    }}
                  >
                    Login
                  </button>
                </span>
              )}
            </div>

          </div>

      </main>

      {/* BOTTOM TRUST FEATURES FOOTER */}
      <footer style={{
        padding: '0 40px 16px 40px',
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
          gap: '18px',
          maxWidth: '1200px',
          width: '100%'
        }} className="auth-trust-row">
          
          {/* Card 1: Secure Orders */}
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            textAlign: 'left',
            padding: '12px 20px',
            borderRadius: '20px',
            background: isDark ? 'rgba(18, 14, 40, 0.94)' : 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: isDark ? '1.5px solid rgba(255, 255, 255, 0.18)' : '1.5px solid rgba(19, 26, 52, 0.16)',
            boxShadow: isDark 
              ? '0 16px 36px rgba(0, 0, 0, 0.7), 0 0 20px rgba(16, 185, 129, 0.12)' 
              : '0 16px 36px rgba(0, 0, 0, 0.16), 0 0 20px rgba(16, 185, 129, 0.08)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <div style={{ 
              width: '48px', 
              height: '42px', 
              borderRadius: '14px', 
              background: isDark ? 'rgba(16, 185, 129, 0.22)' : 'rgba(16, 185, 129, 0.15)', 
              border: '1.5px solid rgba(16, 185, 129, 0.5)', 
              color: isDark ? '#34d399' : '#059669', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0 
            }}>
              <Shield size={22} strokeWidth={2.4} />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: isDark ? '#ffffff' : '#0f172a', display: 'block', lineHeight: '1.2' }}>
                Secure Orders
              </span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: isDark ? '#cbd5e1' : '#334155', display: 'block', marginTop: '3px' }}>
                End-to-end protected
              </span>
            </div>
          </div>

          {/* Card 2: 24/7 Customer Support */}
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            textAlign: 'left',
            padding: '12px 20px',
            borderRadius: '20px',
            background: isDark ? 'rgba(18, 14, 40, 0.94)' : 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: isDark ? '1.5px solid rgba(255, 255, 255, 0.18)' : '1.5px solid rgba(19, 26, 52, 0.16)',
            boxShadow: isDark 
              ? '0 16px 36px rgba(0, 0, 0, 0.7), 0 0 20px rgba(123, 45, 255, 0.12)' 
              : '0 16px 36px rgba(0, 0, 0, 0.16), 0 0 20px rgba(123, 45, 255, 0.08)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <div style={{ 
              width: '48px', 
              height: '42px', 
              borderRadius: '14px', 
              background: isDark ? 'rgba(123, 45, 255, 0.22)' : 'rgba(123, 45, 255, 0.15)', 
              border: '1.5px solid rgba(123, 45, 255, 0.5)', 
              color: isDark ? '#a78bfa' : '#7c3aed', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0 
            }}>
              <Headphones size={22} strokeWidth={2.4} />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: isDark ? '#ffffff' : '#0f172a', display: 'block', lineHeight: '1.2' }}>
                24/7 Customer Support
              </span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: isDark ? '#cbd5e1' : '#334155', display: 'block', marginTop: '3px' }}>
                Always available
              </span>
            </div>
          </div>

          {/* Card 3: Secure Payments */}
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            textAlign: 'left',
            padding: '12px 20px',
            borderRadius: '20px',
            background: isDark ? 'rgba(18, 14, 40, 0.94)' : 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: isDark ? '1.5px solid rgba(255, 255, 255, 0.18)' : '1.5px solid rgba(19, 26, 52, 0.16)',
            boxShadow: isDark 
              ? '0 16px 36px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 46, 138, 0.12)' 
              : '0 16px 36px rgba(0, 0, 0, 0.16), 0 0 20px rgba(255, 46, 138, 0.08)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <div style={{ 
              width: '48px', 
              height: '42px', 
              borderRadius: '14px', 
              background: isDark ? 'rgba(255, 46, 138, 0.22)' : 'rgba(255, 46, 138, 0.15)', 
              border: '1.5px solid rgba(255, 46, 138, 0.5)', 
              color: isDark ? '#f472b6' : '#db2777', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0 
            }}>
              <CreditCard size={22} strokeWidth={2.4} />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: isDark ? '#ffffff' : '#0f172a', display: 'block', lineHeight: '1.2' }}>
                Secure Payments
              </span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: isDark ? '#cbd5e1' : '#334155', display: 'block', marginTop: '3px' }}>
                Multiple payment methods
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
