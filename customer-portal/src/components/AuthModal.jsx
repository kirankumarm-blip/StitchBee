import React, { useState, useEffect } from 'react';
import {
  X, Lock, Mail, User, MapPin, Sparkles, ShieldCheck, Truck, Phone,
  KeyRound, RefreshCw, CheckCircle2
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

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'customer',
  initialTab = 'login',
}) {
  const [tab, setTab] = useState(initialTab);
  const [role, setRole] = useState(initialRole);
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' (default) | 'email'

  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setRole(initialRole);
      setAuthMethod('phone');
      setError('');
      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setAddress('');
      setOtpSent(false);
      setOtpInput('');
      setGeneratedOtp('');
      setResendTimer(0);
    }
  }, [isOpen, initialRole, initialTab]);

  useEffect(() => {
    if (resendTimer <= 0) return undefined;
    const t = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  if (!isOpen) return null;

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
    }
    const code = generateOtpCode();
    setGeneratedOtp(code);
    setOtpSent(true);
    setOtpInput('');
    setResendTimer(30);
  };

  const handlePhoneOtpSubmit = (e) => {
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

    const userRole = tab === 'login' ? existing?.role || role : role;
    const resolvedAddress =
      userRole === 'customer'
        ? address.trim() || existing?.address || '123 Green Glen Road, HSR Layout, Bengaluru'
        : '';

    const userData = {
      name: displayName,
      email: resolvedEmail,
      phone: formattedPhone,
      role: userRole,
      address: resolvedAddress,
    };

    persistAuthenticatedUser(userData, tab === 'signup' || !existing);
    onLoginSuccess(userData);
    onClose();
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (tab === 'signup' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (tab === 'signup' && role === 'customer' && !address.trim()) {
      setError('Please enter your delivery address.');
      return;
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
      phone: phone ? formatPhoneDisplay(phone) : '',
      role: userRole,
      address:
        userRole === 'customer'
          ? address.trim() || '123 Green Glen Road, HSR Layout, Bengaluru'
          : '',
    };

    persistAuthenticatedUser(userData, tab === 'signup');
    onLoginSuccess(userData);
    onClose();
  };

  const handleQuickAdmin = () => {
    setAuthMethod('email');
    setOtpSent(false);
    setEmail('admin@stitchbee.com');
    setPassword('admin123');
    setTab('login');
  };

  return (
    <div className="modal-overlay auth-modal-overlay">
      <div className="modal-content auth-modal-content animate-fade-in">
        {/* Header */}
        <div className="modal-header auth-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>
              {tab === 'login' ? 'Welcome Back' : 'Join StitchBee'}
            </h3>
          </div>
          <button className="auth-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setTab('login');
              setError('');
              setOtpSent(false);
              setOtpInput('');
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${tab === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setTab('signup');
              setError('');
              setOtpSent(false);
              setOtpInput('');
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="auth-error-box">{error}</div>}

        {authMethod === 'phone' ? (
          <form onSubmit={handlePhoneOtpSubmit} className="auth-form">
            {!otpSent ? (
              <>
                {tab === 'signup' && (
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="auth-input-wrapper">
                      <User size={16} className="auth-input-icon" />
                      <input
                        type="text"
                        className="form-input auth-input"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Phone Number (+91)</label>
                  <div className="auth-input-wrapper">
                    <Phone size={16} className="auth-input-icon" />
                    <input
                      type="tel"
                      inputMode="numeric"
                      className="form-input auth-input"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {tab === 'signup' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Email Address (Optional)</label>
                      <div className="auth-input-wrapper">
                        <Mail size={16} className="auth-input-icon" />
                        <input
                          type="email"
                          className="form-input auth-input"
                          placeholder="john@example.com (Optional)"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Register As</label>
                      <div className="auth-role-select-grid">
                        <div className={`auth-role-card ${role === 'customer' ? 'active' : ''}`} onClick={() => setRole('customer')}>
                          <User size={20} />
                          <span>Customer</span>
                        </div>
                        <div className={`auth-role-card ${role === 'tailor' ? 'active' : ''}`} onClick={() => setRole('tailor')}>
                          <ShieldCheck size={20} />
                          <span>Tailor Partner</span>
                        </div>
                        <div className={`auth-role-card ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>
                          <Sparkles size={20} />
                          <span>Student Partner</span>
                        </div>
                        <div className={`auth-role-card ${role === 'delivery' ? 'active' : ''}`} onClick={() => setRole('delivery')}>
                          <Truck size={20} />
                          <span>Delivery Partner</span>
                        </div>
                      </div>
                    </div>

                    {role === 'customer' && (
                      <div className="form-group animate-fade-in">
                        <label className="form-label">Delivery &amp; Sizing Address</label>
                        <div className="auth-input-wrapper">
                          <MapPin size={16} className="auth-input-icon" />
                          <input
                            type="text"
                            className="form-input auth-input"
                            placeholder="123 Green Glen Road, HSR Layout, Bengaluru"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                <button type="button" onClick={handleSendOtp} className="btn btn-primary auth-submit-btn">
                  {tab === 'login' ? 'Send OTP' : 'Send OTP & Continue'}
                </button>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMethod('email');
                      setError('');
                      setOtpSent(false);
                    }}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--primary)', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Use Email
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.28)', fontSize: '0.82rem', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <CheckCircle2 size={14} /> OTP sent to {formatPhoneDisplay(phone)}
                    </span>
                    <button type="button" onClick={() => { setOtpSent(false); setOtpInput(''); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
                      Change
                    </button>
                  </div>
                  <div style={{ marginTop: '4px', color: 'var(--text-secondary)' }}>
                    Test Verification Code: <strong>{generatedOtp}</strong>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Enter 6-Digit OTP</label>
                  <div className="auth-input-wrapper">
                    <KeyRound size={16} className="auth-input-icon" />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      className="form-input auth-input"
                      placeholder="••••••"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                  <button
                    type="button"
                    disabled={resendTimer > 0}
                    onClick={handleSendOtp}
                    style={{ background: 'none', border: 'none', color: resendTimer > 0 ? 'var(--text-muted)' : 'var(--primary)', fontWeight: '700', fontSize: '0.8rem', cursor: resendTimer > 0 ? 'default' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RefreshCw size={12} />
                    <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}</span>
                  </button>
                </div>

                <button type="submit" className="btn btn-primary auth-submit-btn">
                  {tab === 'login' ? 'Verify & Sign In' : 'Verify & Create Account'}
                </button>
              </>
            )}
          </form>
        ) : (
          <form onSubmit={handleEmailSubmit} className="auth-form">
            {tab === 'signup' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="auth-input-wrapper">
                  <User size={16} className="auth-input-icon" />
                  <input
                    type="text"
                    className="form-input auth-input"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail size={16} className="auth-input-icon" />
                <input
                  type="email"
                  className="form-input auth-input"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input
                  type="password"
                  className="form-input auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {tab === 'signup' && (
              <>
                <div className="form-group">
                  <label className="form-label">Register As</label>
                  <div className="auth-role-select-grid">
                    <div className={`auth-role-card ${role === 'customer' ? 'active' : ''}`} onClick={() => setRole('customer')}>
                      <User size={20} />
                      <span>Customer</span>
                    </div>
                    <div className={`auth-role-card ${role === 'tailor' ? 'active' : ''}`} onClick={() => setRole('tailor')}>
                      <ShieldCheck size={20} />
                      <span>Tailor Partner</span>
                    </div>
                    <div className={`auth-role-card ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>
                      <Sparkles size={20} />
                      <span>Student Partner</span>
                    </div>
                    <div className={`auth-role-card ${role === 'delivery' ? 'active' : ''}`} onClick={() => setRole('delivery')}>
                      <Truck size={20} />
                      <span>Delivery Partner</span>
                    </div>
                  </div>
                </div>

                {role === 'customer' && (
                  <div className="form-group animate-fade-in">
                    <label className="form-label">Delivery &amp; Sizing Address</label>
                    <div className="auth-input-wrapper">
                      <MapPin size={16} className="auth-input-icon" />
                      <input
                        type="text"
                        className="form-input auth-input"
                        placeholder="123 Green Glen Road, HSR Layout, Bengaluru"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <button type="submit" className="btn btn-primary auth-submit-btn">
              {tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('phone');
                  setError('');
                  setOtpSent(false);
                }}
                style={{ background: 'none', border: 'none', padding: 0, color: 'var(--primary)', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Use Phone OTP
              </button>
            </div>
          </form>
        )}

        {/* Demo Helper (Email mode only) */}
        {tab === 'login' && authMethod === 'email' && (
          <div className="auth-demo-helper">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Testing Super Admin?
            </span>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ padding: '4px 8px', fontSize: '0.8rem', textDecoration: 'underline', color: 'var(--primary)' }}
              onClick={handleQuickAdmin}
            >
              Use Admin Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
