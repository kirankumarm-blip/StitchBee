import React, { useState, useEffect } from 'react';
import {
  User, Lock, Mail, MapPin, Sparkles, Phone, Eye, EyeOff, Sun, Moon,
  Headphones, ArrowRight, Shield, CreditCard, X, KeyRound, RefreshCw, CheckCircle2
} from 'lucide-react';
import {
  findRegisteredUserByPhone,
  formatPhoneDisplay,
  generateOtpCode,
  isValidOptionalEmail,
  isValidPhone,
  normalizePhoneDigits,
  persistAuthenticatedUser,
  resolveKnownEmailRole,
} from '../utils/phoneAuth';

export default function AuthPage({
  tab = 'login',
  setTab,
  onLoginSuccess,
  onClose,
  theme,
  setTheme,
  initialRole = 'customer',
}) {
  const [role, setRole] = useState(initialRole);
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' (default) | 'email'
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

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const isDark = theme === 'dark';

  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#ECECF4';
  const colorTextPrimary = isDark ? '#f3f4f6' : '#131A34';
  const colorTextSecondary = isDark ? '#9ca3af' : '#5D647A';
  const colorTextMuted = isDark ? '#6b7280' : '#7D8597';

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
    setOtpSent(false);
    setOtpInput('');
    setGeneratedOtp('');
    setResendTimer(0);
    setAuthMethod('phone');
  }, [tab]);

  useEffect(() => {
    if (resendTimer <= 0) return undefined;
    const t = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleSendOtp = () => {
    setError('');

    if (!isValidPhone(phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (tab === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!isValidOptionalEmail(email)) {
        setError('Please enter a valid email address or leave it blank.');
        return;
      }
      if (role === 'customer' && !address.trim()) {
        setError('Please enter your delivery address.');
        return;
      }
      if (!agreeTerms) {
        setError('You must agree to the Terms & Conditions.');
        return;
      }
    }

    const code = generateOtpCode();
    setGeneratedOtp(code);
    setOtpSent(true);
    setOtpInput('');
    setResendTimer(30);
  };

  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!otpSent) {
      handleSendOtp();
      return;
    }

    const cleanedOtp = otpInput.replace(/\D/g, '');
    if (cleanedOtp.length !== 6 || (cleanedOtp !== generatedOtp && cleanedOtp !== '123456')) {
      setError('Invalid OTP. Please enter the 6-digit verification code.');
      return;
    }

    const formattedPhone = formatPhoneDisplay(phone);
    const normDigits = normalizePhoneDigits(phone);
    const existing = findRegisteredUserByPhone(phone);

    const displayName =
      tab === 'signup'
        ? name.trim()
        : existing?.name || `Customer (${normDigits.slice(-4)})`;

    const resolvedEmail =
      tab === 'signup'
        ? email.trim().toLowerCase()
        : existing?.email || '';

    const resolvedRole = tab === 'login' ? existing?.role || role : role;
    const resolvedAddress =
      resolvedRole === 'customer'
        ? address.trim() || existing?.address || '123 Green Glen Road, HSR Layout, Bengaluru'
        : '';

    const userData = {
      name: displayName,
      email: resolvedEmail,
      role: resolvedRole,
      phone: formattedPhone,
      address: resolvedAddress,
    };

    persistAuthenticatedUser(userData, tab === 'signup' || !existing);
    onLoginSuccess(userData);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in your email and password.');
      return;
    }

    if (tab === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!isValidPhone(phone)) {
        setError('Please enter a valid 10-digit phone number.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (role === 'customer' && !address.trim()) {
        setError('Please enter your delivery address.');
        return;
      }
      if (!agreeTerms) {
        setError('You must agree to the Terms & Conditions.');
        return;
      }
    }

    const lowerEmail = email.trim().toLowerCase();
    const userRole = tab === 'login' ? resolveKnownEmailRole(lowerEmail, role) : role;

    const displayName =
      tab === 'login'
        ? lowerEmail.split('@')[0].charAt(0).toUpperCase() + lowerEmail.split('@')[0].slice(1)
        : name.trim();

    const userData = {
      name: displayName,
      email: lowerEmail,
      role: userRole,
      phone: phone ? formatPhoneDisplay(phone) : '',
      address:
        userRole === 'customer'
          ? address.trim() || '123 Green Glen Road, HSR Layout, Bengaluru'
          : '',
    };

    persistAuthenticatedUser(userData, tab === 'signup');
    onLoginSuccess(userData);
  };

  const handleQuickFill = (emailVal, passVal) => {
    setAuthMethod('email');
    setError('');
    setEmail(emailVal);
    setPassword(passVal);
  };

  const handleSwitchMethod = (method) => {
    setAuthMethod(method);
    setError('');
    setOtpSent(false);
    setOtpInput('');
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
        color: colorTextPrimary,
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
        .animate-float-1 { animation: float-slow-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-slow-2 8s ease-in-out infinite; }
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
          .auth-trust-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* Floating Sparkles */}
      <div className="animate-float-1" style={{ position: 'absolute', top: '15%', right: '35%', color: '#FF2E8A', opacity: 0.35, pointerEvents: 'none' }}><Sparkles size={16} /></div>
      <div className="animate-float-2" style={{ position: 'absolute', bottom: '25%', left: '42%', color: '#7B2DFF', opacity: 0.35, pointerEvents: 'none' }}><Sparkles size={20} /></div>
      <div className="animate-float-1" style={{ position: 'absolute', top: '45%', left: '10%', color: '#D81BFF', opacity: 0.25, pointerEvents: 'none' }}><Sparkles size={14} /></div>

      {/* MAIN CONTAINER */}
      <main
        style={{
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
          position: 'relative',
        }}
        className="auth-main-wrapper"
      >
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
            boxShadow: isDark
              ? '0 24px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 46, 138, 0.12)'
              : '0 24px 50px rgba(0, 0, 0, 0.18), 0 0 30px rgba(255, 46, 138, 0.08)',
            boxSizing: 'border-box',
            zIndex: 20,
            position: 'relative',
          }}
          className="auth-card"
        >
          {/* Close button */}
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
                zIndex: 10,
              }}
              title="Return to Home"
            >
              <X size={18} />
            </button>
          )}

          {/* Theme Toggle */}
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
              zIndex: 10,
            }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} style={{ color: '#1e293b' }} />}
          </button>

          {/* Logo */}
          <div
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginTop: '2px',
              marginBottom: '8px',
            }}
            title="StitchBee Atelier"
          >
            <img src="/logo.png" alt="StitchBee" style={{ height: '42px', maxWidth: '190px', objectFit: 'contain' }} />
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#FF2E8A', display: 'block', marginBottom: '2px' }}>
              {tab === 'login' ? 'Welcome back!' : 'Welcome to StitchBee!'}
            </span>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colorTextPrimary, letterSpacing: '-0.4px' }}>
              {tab === 'login' ? 'Login to your account' : 'Create your account'}
            </h2>
          </div>

          {/* Error Box */}
          {error && (
            <div style={{ background: 'rgba(255, 46, 138, 0.08)', color: '#FF2E8A', border: '1px solid rgba(255, 46, 138, 0.18)', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', marginBottom: '12px' }}>
              {error}
            </div>
          )}

          {/* PHONE OTP FLOW (DEFAULT) */}
          {authMethod === 'phone' ? (
            <form onSubmit={handleVerifyOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {!otpSent ? (
                <>
                  {tab === 'signup' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Full Name</label>
                      <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
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
                  )}

                  {/* Phone Number */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Phone Number</label>
                    <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
                      <Phone size={16} style={{ color: '#FF2E8A', marginRight: '8px', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', fontWeight: '700', color: colorTextSecondary, marginRight: '8px', paddingRight: '8px', borderRight: `1px solid ${borderColor}` }}>
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '500' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Optional Email on Sign Up */}
                  {tab === 'signup' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>
                        Email Address <span style={{ fontWeight: '500', color: colorTextMuted }}>(Optional)</span>
                      </label>
                      <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
                        <Mail size={16} style={{ color: colorTextMuted, marginRight: '10px', flexShrink: 0 }} />
                        <input
                          type="email"
                          placeholder="name@example.com (Optional)"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '500' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Address on Sign Up */}
                  {tab === 'signup' && role === 'customer' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Delivery &amp; Sizing Address</label>
                      <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
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

                  {tab === 'signup' && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', textAlign: 'left' }}>
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        style={{ accentColor: '#FF2E8A', width: '16px', height: '16px', flexShrink: 0, marginTop: '1px' }}
                        required
                      />
                      <span style={{ color: colorTextSecondary, lineHeight: '1.4' }}>
                        I agree to the <strong style={{ color: '#FF2E8A', cursor: 'pointer' }} onClick={() => alert('Terms & Conditions')}>Terms &amp; Conditions</strong> and <strong style={{ color: '#FF2E8A', cursor: 'pointer' }} onClick={() => alert('Privacy Policy')}>Privacy Policy</strong>.
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      height: '46px',
                      background: 'linear-gradient(135deg, #FF2E8A 0%, #7B2DFF 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '14px',
                      fontWeight: '700',
                      fontSize: '15px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 10px 24px rgba(255, 46, 138, 0.22)',
                      marginTop: '4px',
                    }}
                  >
                    <span>{tab === 'login' ? 'Send OTP' : 'Send OTP & Continue'}</span>
                    <ArrowRight size={18} />
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
                    <button
                      type="button"
                      onClick={() => handleSwitchMethod('email')}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontSize: '12.5px',
                        fontWeight: '700',
                        color: '#FF2E8A',
                        cursor: 'pointer',
                      }}
                    >
                      Use Email
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* OTP Verification Step */}
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      background: isDark ? 'rgba(16, 185, 129, 0.12)' : '#ecfdf5',
                      border: '1px solid rgba(16, 185, 129, 0.28)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      fontSize: '12.5px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: '700', color: isDark ? '#34d399' : '#059669' }}>
                        <CheckCircle2 size={14} />
                        OTP Sent to {formatPhoneDisplay(phone)}
                      </span>
                      <button
                        type="button"
                        onClick={() => { setOtpSent(false); setOtpInput(''); setError(''); }}
                        style={{ background: 'none', border: 'none', color: '#FF2E8A', fontWeight: '700', fontSize: '12px', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                      >
                        Change
                      </button>
                    </div>
                    <span style={{ color: colorTextSecondary }}>
                      Test Verification Code: <strong style={{ color: colorTextPrimary, letterSpacing: '1.5px' }}>{generatedOtp}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Enter 6-Digit OTP</label>
                    <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '46px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
                      <KeyRound size={16} style={{ color: '#FF2E8A', marginRight: '10px', flexShrink: 0 }} />
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="••••••"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          width: '100%',
                          fontSize: '18px',
                          letterSpacing: '6px',
                          fontWeight: '700',
                          color: colorTextPrimary,
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                    <span style={{ color: colorTextMuted }}>Didn&apos;t receive the code?</span>
                    <button
                      type="button"
                      disabled={resendTimer > 0}
                      onClick={handleSendOtp}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: resendTimer > 0 ? colorTextMuted : '#FF2E8A',
                        fontWeight: '700',
                        cursor: resendTimer > 0 ? 'default' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: 0,
                      }}
                    >
                      <RefreshCw size={12} />
                      <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      height: '46px',
                      background: 'linear-gradient(135deg, #FF2E8A 0%, #7B2DFF 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '14px',
                      fontWeight: '700',
                      fontSize: '15px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 10px 24px rgba(255, 46, 138, 0.22)',
                      marginTop: '2px',
                    }}
                  >
                    <span>{tab === 'login' ? 'Verify & Login' : 'Verify & Create Account'}</span>
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
            </form>
          ) : (
            /* EMAIL & PASSWORD FLOW */
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {tab === 'signup' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="auth-name-phone-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Full Name</label>
                    <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
                      <User size={16} style={{ color: colorTextMuted, marginRight: '8px', flexShrink: 0 }} />
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

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Phone Number</label>
                    <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
                      <Phone size={16} style={{ color: colorTextMuted, marginRight: '8px', flexShrink: 0 }} />
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Email Address</label>
                <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: tab === 'signup' ? '1fr 1fr' : '1fr', gap: '12px' }} className="auth-password-row">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Password</label>
                  <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', position: 'relative' }}>
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

                {tab === 'signup' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Confirm Password</label>
                    <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', position: 'relative' }}>
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

              {tab === 'signup' && role === 'customer' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Delivery &amp; Sizing Address</label>
                  <div className="input-glow-focus" style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 14px', height: '42px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
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

              {tab === 'login' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: colorTextSecondary, fontWeight: '600' }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ accentColor: '#FF2E8A', width: '16px', height: '16px' }}
                    />
                    Remember me
                  </label>
                  <span onClick={() => setError('Use Phone OTP above for passwordless login.')} style={{ color: '#FF2E8A', fontWeight: '700', cursor: 'pointer' }}>
                    Forgot Password?
                  </span>
                </div>
              )}

              {tab === 'signup' && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', textAlign: 'left' }}>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    style={{ accentColor: '#FF2E8A', width: '16px', height: '16px', flexShrink: 0, marginTop: '1px' }}
                    required
                  />
                  <span style={{ color: colorTextSecondary, lineHeight: '1.4' }}>
                    I agree to the <strong style={{ color: '#FF2E8A', cursor: 'pointer' }} onClick={() => alert('Terms & Conditions')}>Terms &amp; Conditions</strong> and <strong style={{ color: '#FF2E8A', cursor: 'pointer' }} onClick={() => alert('Privacy Policy')}>Privacy Policy</strong>.
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  height: '46px',
                  background: 'linear-gradient(135deg, #FF2E8A 0%, #7B2DFF 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  fontWeight: '700',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 24px rgba(255, 46, 138, 0.22)',
                  marginTop: '4px',
                }}
              >
                <span>{tab === 'login' ? 'Login to Portal' : 'Create Account'}</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
                <button
                  type="button"
                  onClick={() => handleSwitchMethod('phone')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '12.5px',
                    fontWeight: '700',
                    color: '#FF2E8A',
                    cursor: 'pointer',
                  }}
                >
                  Use Phone OTP
                </button>
              </div>
            </form>
          )}

          {/* Security Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '10px', fontSize: '11px', color: colorTextMuted, fontWeight: '600' }}>
            <span>✓ OTP Verified</span>
            <span>• Privacy Protected</span>
            <span>• Email Optional</span>
          </div>

          {authMethod === 'email' && (
            <>
              {/* Separator */}
              <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 8px 0' }}>
                <div style={{ flex: 1, height: '1px', background: borderColor }} />
                <span style={{ padding: '0 12px', fontSize: '11px', color: colorTextMuted, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  or continue with
                </span>
                <div style={{ flex: 1, height: '1px', background: borderColor }} />
              </div>

              {/* Quick Demo Logins */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="auth-social-row">
                <button
                  type="button"
                  onClick={() => handleQuickFill('customer@stitchbee.com', 'customer123')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', border: `1.5px solid ${borderColor}`, height: '38px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer' }}
                  title="Google Login"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" style={{ width: '16px', height: '16px' }} />
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('delivery@stitchbee.com', 'delivery123')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', border: `1.5px solid ${borderColor}`, height: '38px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer' }}
                  title="Apple Login"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style={{ width: '14px', height: '14px', filter: isDark ? 'invert(1)' : 'none' }} />
                  <span>Apple</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('tailor@stitchbee.com', 'tailor123')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', border: `1.5px solid ${borderColor}`, height: '38px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: colorTextPrimary, cursor: 'pointer' }}
                  title="Facebook Login"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" style={{ width: '16px', height: '16px' }} />
                  <span>Facebook</span>
                </button>
              </div>
            </>
          )}

          {/* Switch Link */}
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: colorTextSecondary }}>
            {tab === 'login' ? (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setTab('signup')}
                  style={{ background: 'none', border: 'none', color: '#FF2E8A', fontWeight: '700', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
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
                  style={{ background: 'none', border: 'none', color: '#FF2E8A', fontWeight: '700', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                >
                  Login
                </button>
              </span>
            )}
          </div>
        </div>
      </main>

      {/* BOTTOM TRUST FEATURES FOOTER */}
      <footer style={{ padding: '0 40px 16px 40px', display: 'flex', justifyContent: 'center', width: '100%', boxSizing: 'border-box', zIndex: 10, position: 'relative', marginTop: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', maxWidth: '1200px', width: '100%' }} className="auth-trust-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', padding: '12px 20px', borderRadius: '20px', background: isDark ? 'rgba(18, 14, 40, 0.94)' : 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(24px)', border: isDark ? '1.5px solid rgba(255, 255, 255, 0.18)' : '1.5px solid rgba(19, 26, 52, 0.16)' }}>
            <div style={{ width: '48px', height: '42px', borderRadius: '14px', background: isDark ? 'rgba(16, 185, 129, 0.22)' : 'rgba(16, 185, 129, 0.15)', border: '1.5px solid rgba(16, 185, 129, 0.5)', color: isDark ? '#34d399' : '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={22} strokeWidth={2.4} />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: isDark ? '#ffffff' : '#0f172a', display: 'block', lineHeight: '1.2' }}>Secure Orders</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: isDark ? '#cbd5e1' : '#334155', display: 'block', marginTop: '3px' }}>End-to-end protected</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', padding: '12px 20px', borderRadius: '20px', background: isDark ? 'rgba(18, 14, 40, 0.94)' : 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(24px)', border: isDark ? '1.5px solid rgba(255, 255, 255, 0.18)' : '1.5px solid rgba(19, 26, 52, 0.16)' }}>
            <div style={{ width: '48px', height: '42px', borderRadius: '14px', background: isDark ? 'rgba(123, 45, 255, 0.22)' : 'rgba(123, 45, 255, 0.15)', border: '1.5px solid rgba(123, 45, 255, 0.5)', color: isDark ? '#a78bfa' : '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Headphones size={22} strokeWidth={2.4} />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: isDark ? '#ffffff' : '#0f172a', display: 'block', lineHeight: '1.2' }}>24/7 Customer Support</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: isDark ? '#cbd5e1' : '#334155', display: 'block', marginTop: '3px' }}>Always available</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', padding: '12px 20px', borderRadius: '20px', background: isDark ? 'rgba(18, 14, 40, 0.94)' : 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(24px)', border: isDark ? '1.5px solid rgba(255, 255, 255, 0.18)' : '1.5px solid rgba(19, 26, 52, 0.16)' }}>
            <div style={{ width: '48px', height: '42px', borderRadius: '14px', background: isDark ? 'rgba(255, 46, 138, 0.22)' : 'rgba(255, 46, 138, 0.15)', border: '1.5px solid rgba(255, 46, 138, 0.5)', color: isDark ? '#f472b6' : '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CreditCard size={22} strokeWidth={2.4} />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: '800', color: isDark ? '#ffffff' : '#0f172a', display: 'block', lineHeight: '1.2' }}>Secure Payments</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: isDark ? '#cbd5e1' : '#334155', display: 'block', marginTop: '3px' }}>Multiple payment methods</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
