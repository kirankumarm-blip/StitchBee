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
        height: '100vh', 
        overflow: 'hidden', 
        background: bgPage, 
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        boxSizing: 'border-box',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(106, 0, 244, 0.08)'
      }} 
      className="auth-page-layout"
    >
      
      {/* LEFT SIDE COLUMN (40% Width) */}
      <div 
        style={{ 
          width: '40%',
          backgroundImage: 'url(/auth_banner.jpg)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
        className="auth-page-banner"
      />

      {/* RIGHT SIDE COLUMN (60% Width) */}
      <div 
        style={{ 
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 60px',
          boxSizing: 'border-box',
          position: 'relative',
          height: '100%',
          overflowY: 'auto'
        }}
        className="auth-page-content"
      >
        
        {/* TOP ROW HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} className="auth-header-top-row">
          
          {/* logo space placeholder / navigate home */}
          <div style={{ width: '40px' }} />

          {/* Right Action Trigger Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: bgCard, border: `1.5px solid ${borderColor}`, color: colorTextPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0 }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }} className="auth-tab-toggle-container">
              <span style={{ fontSize: '18px', fontWeight: '500', color: colorTextSecondary }}>
                {tab === 'login' ? "Don't have an account?" : "Already have an account?"}
              </span>
              <button 
                type="button"
                onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
                style={{ 
                  background: 'transparent', 
                  color: '#EC0B79', 
                  border: '1.5px solid #EC0B79', 
                  padding: '8px 20px', 
                  borderRadius: '14px', 
                  fontSize: '16px', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(236, 11, 121, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {tab === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </div>

        </div>

        {/* CENTERED LOGIN CARD */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, margin: '30px 0' }} className="auth-card-wrapper">
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '640px', 
              background: bgCard, 
              border: `1.5px solid ${borderColor}`, 
              borderRadius: '28px', 
              padding: '48px',
              boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(106,0,244,0.08)',
              boxSizing: 'border-box',
              textAlign: 'left'
            }}
            className="auth-card"
          >
            {/* Header Content */}
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#EC0B79', display: 'block', marginBottom: '6px' }}>
              {tab === 'login' ? 'Welcome back! 👋' : 'Welcome to StitchBee! 🎉'}
            </span>
            <h2 style={{ margin: 0, fontSize: '48px', fontWeight: '800', color: colorTextPrimary, letterSpacing: '-1px', lineHeight: '1.1' }}>
              {tab === 'login' ? 'Login to your account' : 'Create your account'}
            </h2>
            <span style={{ fontSize: '20px', color: colorTextSecondary, display: 'block', marginBottom: '32px', marginTop: '6px', fontWeight: '500' }}>
              {tab === 'login' ? 'Enter your details to continue' : 'Start your journey with us today'}
            </span>

            {/* Error box */}
            {error && (
              <div style={{ background: 'rgba(236, 11, 121, 0.08)', color: '#EC0B79', border: '1px solid rgba(236, 11, 121, 0.15)', padding: '14px 18px', borderRadius: '14px', fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {tab === 'signup' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="auth-name-phone-row">
                  {/* Full Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '18px', fontWeight: '600', color: colorTextSecondary }}>Full Name</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '14px', padding: '0 24px', height: '64px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
                      <User size={18} style={{ color: colorTextMuted, marginRight: '12px', flexShrink: 0 }} />
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '20px', color: colorTextPrimary, fontWeight: '500' }} 
                        required 
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '18px', fontWeight: '600', color: colorTextSecondary }}>Phone Number</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '14px', padding: '0 24px', height: '64px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
                      <Phone size={18} style={{ color: colorTextMuted, marginRight: '12px', flexShrink: 0 }} />
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '20px', color: colorTextPrimary, fontWeight: '500' }} 
                        required 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '18px', fontWeight: '600', color: colorTextSecondary }}>Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '14px', padding: '0 24px', height: '64px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
                  <Mail size={18} style={{ color: colorTextMuted, marginRight: '12px', flexShrink: 0 }} />
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '20px', color: colorTextPrimary, fontWeight: '500' }} 
                    required 
                  />
                </div>
              </div>

              {/* Passwords */}
              <div style={{ display: 'grid', gridTemplateColumns: tab === 'signup' ? '1fr 1fr' : '1fr', gap: '16px' }} className="auth-password-row">
                
                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '18px', fontWeight: '600', color: colorTextSecondary }}>Password</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '14px', padding: '0 24px', height: '64px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', position: 'relative' }}>
                    <Lock size={18} style={{ color: colorTextMuted, marginRight: '12px', flexShrink: 0 }} />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '20px', color: colorTextPrimary, fontWeight: '500', paddingRight: '24px' }} 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', right: '20px', color: colorTextMuted, display: 'flex', alignItems: 'center' }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                {tab === 'signup' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '18px', fontWeight: '600', color: colorTextSecondary }}>Confirm Password</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '14px', padding: '0 24px', height: '64px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', position: 'relative' }}>
                      <Lock size={18} style={{ color: colorTextMuted, marginRight: '12px', flexShrink: 0 }} />
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        placeholder="••••••••" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '20px', color: colorTextPrimary, fontWeight: '500', paddingRight: '24px' }} 
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', right: '20px', color: colorTextMuted, display: 'flex', alignItems: 'center' }}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Roles Cards Grid (Only Signup) */}
              {tab === 'signup' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '18px', fontWeight: '600', color: colorTextSecondary }}>Register as</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }} className="auth-roles-grid">
                    
                    {[
                      { id: 'customer', name: 'Customer', sub: 'Shop & order', icon: <User size={16} /> },
                      { id: 'tailor', name: 'Tailor Partner', sub: 'Manage orders', icon: <Scissors size={16} /> },
                      { id: 'delivery', name: 'Delivery Partner', sub: 'Deliver orders', icon: <Truck size={16} /> },
                      { id: 'student', name: 'Student Partner', sub: 'Earn & learn', icon: <Star size={16} /> }
                    ].map((roleOpt) => {
                      const isSelected = role === roleOpt.id;
                      return (
                        <div 
                          key={roleOpt.id}
                          onClick={() => setRole(roleOpt.id)}
                          style={{ 
                            border: isSelected ? '1.5px solid #EC0B79' : `1.5px solid ${borderColor}`,
                            borderRadius: '12px',
                            padding: '12px 10px',
                            background: isSelected ? (isDark ? 'rgba(236, 11, 121, 0.08)' : '#FFF0F5') : (isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF'),
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
                            <div style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#EC0B79', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                              <Check size={8} strokeWidth={4} />
                            </div>
                          )}
                          <div style={{ color: isSelected ? '#EC0B79' : colorTextMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '8px', background: isSelected ? 'rgba(236, 11, 121, 0.1)' : (isDark ? 'rgba(255,255,255,0.05)' : '#F8FAFC'), marginBottom: '2px' }}>
                            {roleOpt.icon}
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: '800', color: isSelected ? '#EC0B79' : colorTextPrimary, display: 'block', lineHeight: '1.2' }}>{roleOpt.name}</span>
                          <span style={{ fontSize: '8px', color: colorTextMuted, display: 'block', lineHeight: '1' }}>{roleOpt.sub}</span>
                        </div>
                      );
                    })}

                  </div>
                </div>
              )}

              {/* Customer Sizing Address */}
              {tab === 'signup' && role === 'customer' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} className="animate-fade-in">
                  <label style={{ fontSize: '18px', fontWeight: '600', color: colorTextSecondary }}>Delivery & Sizing Address</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '14px', padding: '0 24px', height: '64px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
                    <MapPin size={18} style={{ color: colorTextMuted, marginRight: '12px', flexShrink: 0 }} />
                    <input 
                      type="text" 
                      placeholder="123 Green Glen Road, HSR Layout, Bengaluru" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '20px', color: colorTextPrimary, fontWeight: '500' }} 
                      required 
                    />
                  </div>
                </div>
              )}

              {/* Remember Me / Forgot Password */}
              {tab === 'login' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '18px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: colorTextSecondary, fontWeight: '600' }}>
                    <input 
                      type="checkbox" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                      style={{ accentColor: '#EC0B79', width: '20px', height: '20px', borderRadius: '4px' }} 
                    />
                    Remember me
                  </label>
                  <span 
                    onClick={() => alert("Password reset link sent to your email!")}
                    style={{ color: '#EC0B79', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </span>
                </div>
              )}

              {/* Agree Terms */}
              {tab === 'signup' && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', textAlign: 'left' }}>
                  <input 
                    type="checkbox" 
                    checked={agreeTerms} 
                    onChange={(e) => setAgreeTerms(e.target.checked)} 
                    style={{ accentColor: '#EC0B79', width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0, marginTop: '1px' }} 
                    required
                  />
                  <span style={{ color: colorTextSecondary, lineHeight: '1.4' }}>
                    I agree to the <strong style={{ color: '#EC0B79', cursor: 'pointer' }} onClick={() => alert("Terms & Conditions")}>Terms & Conditions</strong> and <strong style={{ color: '#EC0B79', cursor: 'pointer' }} onClick={() => alert("Privacy Policy")}>Privacy Policy</strong>.
                  </span>
                </div>
              )}

              {/* Gradient Submit Button */}
              <button 
                type="submit"
                style={{ 
                  width: '100%', 
                  height: '64px',
                  background: 'linear-gradient(135deg, #EC0B79 0%, #6A00F4 100%)', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '16px', 
                  fontWeight: '700', 
                  fontSize: '24px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px',
                  boxShadow: '0 15px 35px rgba(106, 0, 244, 0.22)',
                  marginTop: '10px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <span>{tab === 'login' ? 'Login' : 'Create Account'}</span>
                <ArrowRight size={22} />
              </button>

            </form>

            {/* Separator */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '28px 0 20px 0' }}>
              <div style={{ flex: 1, height: '1px', background: borderColor }} />
              <span style={{ padding: '0 14px', fontSize: '14px', color: colorTextMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: borderColor }} />
            </div>

            {/* Social Logins */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="auth-social-row">
              
              <button 
                type="button"
                onClick={() => handleQuickFill('customer@stitchbee.com', 'customer123')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: bgCard, border: `1.5px solid ${borderColor}`, height: '64px', borderRadius: '16px', fontSize: '18px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
                title="Quick Fill Customer"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
                <span>Google</span>
              </button>

              <button 
                type="button"
                onClick={() => handleQuickFill('tailor@stitchbee.com', 'tailor123')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: bgCard, border: `1.5px solid ${borderColor}`, height: '64px', borderRadius: '16px', fontSize: '18px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
                title="Quick Fill Tailor"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" style={{ width: '20px', height: '20px' }} />
                <span>Facebook</span>
              </button>

              <button 
                type="button"
                onClick={() => handleQuickFill('delivery@stitchbee.com', 'delivery123')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: bgCard, border: `1.5px solid ${borderColor}`, height: '64px', borderRadius: '16px', fontSize: '18px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
                title="Quick Fill Delivery Partner"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style={{ width: '20px', height: '20px', filter: isDark ? 'invert(1)' : 'none' }} />
                <span>Apple</span>
              </button>

            </div>

          </div>
        </div>

        {/* BOTTOM FEATURES */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '32px', 
            borderTop: `1.5px solid ${borderColor}`, 
            paddingTop: '20px', 
            width: '100%', 
            boxSizing: 'border-box',
            marginTop: '12px'
          }}
          className="auth-trust-row"
        >
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(29, 185, 84, 0.12)', color: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={20} />
            </div>
            <div>
              <span style={{ fontSize: '16px', fontWeight: '800', color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>Verified Partners</span>
              <span style={{ fontSize: '12px', color: colorTextMuted }}>Background verified</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(106, 0, 244, 0.12)', color: '#6A00F4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Headphones size={20} />
            </div>
            <div>
              <span style={{ fontSize: '16px', fontWeight: '800', color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>24/7 Support</span>
              <span style={{ fontSize: '12px', color: colorTextMuted }}>We're here to help</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 46, 131, 0.12)', color: '#EC0B79', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CreditCard size={20} />
            </div>
            <div>
              <span style={{ fontSize: '16px', fontWeight: '800', color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>Secure Payments</span>
              <span style={{ fontSize: '12px', color: colorTextMuted }}>100% safe & secure</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
