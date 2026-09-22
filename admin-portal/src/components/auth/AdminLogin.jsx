import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  CheckCircle2,
  Lock,
  Scissors,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { AUTHORIZED_ADMIN_USERS } from '../../data/adminMockData';

export default function AdminLogin({ onLoginSuccess, theme, setTheme }) {
  // Authentication Step: 'MOBILE' | 'OTP'
  const [step, setStep] = useState('MOBILE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [securityError, setSecurityError] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [matchedAdmin, setMatchedAdmin] = useState(null);

  const otpInputsRef = useRef([]);

  // Resend OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (step === 'OTP' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Focus first OTP input when transitioning to OTP step
  useEffect(() => {
    if (step === 'OTP' && otpInputsRef.current[0]) {
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
    localStorage.setItem('stitchbee_admin_theme', nextTheme);
  };

  // Clean phone input (digits only, max 10)
  const handlePhoneChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(rawVal);
    if (securityError) setSecurityError(null);
  };

  // Quick-fill authorized demo admin
  const handleQuickFill = (demoPhone) => {
    setPhone(demoPhone);
    setSecurityError(null);
  };

  // Step 1: Send OTP with Admin Security Validation (Requirement #67)
  const handleSendOtp = (e) => {
    e.preventDefault();
    setSecurityError(null);

    const cleanNumber = phone.trim();
    if (cleanNumber.length !== 10) {
      setSecurityError({
        title: 'Invalid Mobile Number',
        message: 'Please enter a valid 10-digit mobile number.'
      });
      return;
    }

    setIsLoading(true);

    // Validate if the number belongs to an authorized admin account
    setTimeout(() => {
      const authorizedUser = AUTHORIZED_ADMIN_USERS[cleanNumber];

      if (!authorizedUser) {
        setIsLoading(false);
        setSecurityError({
          title: 'Admin access not found',
          message: 'Please use an authorized StitchBee administrator mobile number.'
        });
        return;
      }

      // Valid admin found
      setMatchedAdmin(authorizedUser);
      setIsLoading(false);
      setStep('OTP');
      setResendTimer(30);
      setOtp(['', '', '', '', '', '']);
      setOtpError(null);
    }, 500);
  };

  // Step 2: Handle Individual OTP Box Change
  const handleOtpChange = (index, value) => {
    const sanitized = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = sanitized;
    setOtp(newOtp);
    if (otpError) setOtpError(null);

    // Auto-advance to next input if filled
    if (sanitized && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  // Handle Backspace Navigation in OTP Boxes
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Handle OTP Clipboard Paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasteData) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      const nextFocusIdx = Math.min(pasteData.length, 5);
      otpInputsRef.current[nextFocusIdx]?.focus();
    }
  };

  // Resend OTP Trigger
  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp(['', '', '', '', '', '']);
    setOtpError(null);
    otpInputsRef.current[0]?.focus();
  };

  // Step 3: Verify OTP & Sign In
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setOtpError('Please enter the complete 6-digit OTP code.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Default mock OTP verification ('123456' or '000000' for demo convenience)
      if (enteredOtp !== '123456' && enteredOtp !== '000000') {
        setIsLoading(false);
        setOtpError('Invalid verification code. Please check and try again.');
        return;
      }

      // Success: Authenticate session
      setIsLoading(false);
      if (onLoginSuccess && matchedAdmin) {
        onLoginSuccess(matchedAdmin);
      }
    }, 600);
  };

  return (
    <div className="sb-admin-login-wrapper">
      <div className="sb-admin-login-container">
        
        {/* ========================================================================= */}
        {/* LEFT / BRANDING SECTION (Requirement #65) */}
        {/* ========================================================================= */}
        <div className="sb-login-branding-panel">
          {/* Subtle decorative tailoring stitch background */}
          <div className="sb-login-bg-decor">
            <svg viewBox="0 0 400 400" className="sb-login-thread-svg" fill="none">
              <path
                d="M-50,200 C80,60 180,340 320,180 C400,80 480,240 550,150"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="6 8"
                opacity="0.3"
              />
              <path
                d="M-20,120 C100,270 220,90 350,250 C420,340 490,170 560,210"
                stroke="#60a5fa"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.25"
              />
            </svg>
          </div>

          <div className="sb-login-branding-content">
            {/* Logo & Brand Header */}
            <div>
              <div className="sb-login-logo-lockup">
                <div style={{
                  background: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '14px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <img
                    src="/logo.png"
                    alt="StitchBee"
                    style={{
                      height: '44px',
                      width: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
                <span className="sb-login-badge-enterprise">Central Admin Portal</span>
              </div>

              {/* Tagline & Supporting Copy */}
              <div className="sb-login-copy-block">
                <h2 className="sb-login-tagline">
                  "Where Every Stitch Matters"
                </h2>
                <p className="sb-login-supporting-text">
                  Manage StitchBee operations, partners, orders and business performance from one place.
                </p>
              </div>
            </div>

            {/* Subtle Tailoring Illustration & Metrics */}
            <div className="sb-login-middle-block">
              <div className="sb-tailoring-visual">
                <div className="sb-tailoring-badge">
                  <Scissors size={20} color="#fbbf24" />
                  <span className="text-xs font-semibold text-white">Bespoke Atelier Platform</span>
                </div>
              </div>

              {/* Platform Feature / Metric Highlights */}
              <div className="sb-login-metrics-grid">
                <div className="sb-login-metric-card">
                  <div className="sb-login-metric-val">1,248</div>
                  <div className="sb-login-metric-lbl">Master Ateliers</div>
                </div>

                <div className="sb-login-metric-card">
                  <div className="sb-login-metric-val">18.6K+</div>
                  <div className="sb-login-metric-lbl">Orders Fulfilled</div>
                </div>

                <div className="sb-login-metric-card">
                  <div className="sb-login-metric-val">98.2%</div>
                  <div className="sb-login-metric-lbl">First-Fit SLA</div>
                </div>
              </div>
            </div>

            {/* Footer Trust & Security Badge */}
            <div className="sb-login-branding-footer">
              <div className="flex items-center gap-2 text-[11px] text-blue-200/70">
                <Lock size={12} color="#fbbf24" />
                <span>Enterprise TLS 1.3 Encryption • Multi-Factor OTP Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT / LOGIN SECTION (Requirements #65, #66, #67, #68) */}
        {/* ========================================================================= */}
        <div className="sb-login-form-panel">
          
          {/* Top Bar: Theme Toggle */}
          <div className="sb-login-topbar">
            <button
              type="button"
              onClick={toggleTheme}
              className="sb-btn sb-btn-ghost sb-btn-sm"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              style={{
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                padding: 0,
                color: theme === 'dark' ? 'var(--sb-accent)' : 'var(--sb-text-title)'
              }}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>

          {/* Login / OTP Card Container */}
          <div className="sb-login-card">
            
            {/* STEP 1: MOBILE NUMBER INPUT */}
            {step === 'MOBILE' && (
              <div className="sb-login-step-view">
                <div className="sb-login-card-header">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <img
                      src="/logo.png"
                      alt="StitchBee"
                      style={{
                        height: '52px',
                        width: 'auto',
                        display: 'block'
                      }}
                    />
                  </div>
                  <h3 className="sb-login-card-title">Welcome Back</h3>
                  <p className="sb-login-card-subtitle">
                    Sign in to your StitchBee Admin Portal
                  </p>
                </div>

                {/* Security Error Alert (Requirement #67) */}
                {securityError && (
                  <div className="sb-admin-security-alert">
                    <ShieldAlert size={18} className="sb-security-alert-icon" />
                    <div className="sb-security-alert-content">
                      <div className="sb-security-alert-title">{securityError.title}</div>
                      <div className="sb-security-alert-desc">{securityError.message}</div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSendOtp} className="sb-login-form">
                  <div className="sb-form-group">
                    <label className="sb-input-label">Mobile Number</label>
                    <div className="sb-phone-input-group">
                      <div className="sb-phone-country-code">
                        <span>🇮🇳</span>
                        <span className="font-semibold">+91</span>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter mobile number"
                        autoFocus
                        className="sb-phone-input-field"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || phone.length !== 10}
                    className="sb-btn sb-btn-primary sb-btn-block sb-login-submit-btn"
                  >
                    {isLoading ? (
                      <span className="sb-btn-loading-state">
                        <span className="sb-spinner"></span>
                        Verifying Admin Access...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send OTP
                        <ArrowRight size={16} />
                      </span>
                    )}
                  </button>

                  <div className="sb-login-authorized-note">
                    <Lock size={12} />
                    <span>Authorized StitchBee administrators only</span>
                  </div>
                </form>

                {/* Authorized Demo Administrator Quick-Fill Chips */}
                <div className="sb-login-demo-helper">
                  <div className="sb-demo-helper-header">
                    <Info size={12} color="var(--sb-primary)" />
                    <span>Demo Authorized Admin Accounts:</span>
                  </div>
                  <div className="sb-demo-chips-grid">
                    <button
                      type="button"
                      onClick={() => handleQuickFill('9845012345')}
                      className={`sb-demo-chip ${phone === '9845012345' ? 'active' : ''}`}
                    >
                      <span className="font-semibold">Kiran Kumar</span>
                      <span className="sb-demo-chip-sub">Super Admin</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickFill('9845023456')}
                      className={`sb-demo-chip ${phone === '9845023456' ? 'active' : ''}`}
                    >
                      <span className="font-semibold">Sunil Rao</span>
                      <span className="sb-demo-chip-sub">Operations</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickFill('9876543210')}
                      className={`sb-demo-chip ${phone === '9876543210' ? 'active' : ''}`}
                    >
                      <span className="font-semibold">Demo Master</span>
                      <span className="sb-demo-chip-sub text-[var(--sb-accent)] font-bold">98765 43210</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 2: OTP VERIFICATION (Requirement #68) */}
            {step === 'OTP' && (
              <div className="sb-login-step-view sb-animate-fade">
                <button
                  type="button"
                  onClick={() => setStep('MOBILE')}
                  className="sb-btn-back-link"
                >
                  <ArrowLeft size={14} />
                  <span>Change mobile number</span>
                </button>

                <div className="sb-login-card-header">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
                    <img
                      src="/logo.png"
                      alt="StitchBee"
                      style={{
                        height: '44px',
                        width: 'auto',
                        display: 'block'
                      }}
                    />
                  </div>
                  <h3 className="sb-login-card-title">Verify Your Mobile Number</h3>
                  <p className="sb-login-card-subtitle">
                    We've sent a 6-digit verification code to{' '}
                    <strong className="text-[var(--sb-text-title)]">
                      +91 {phone.slice(0, 5)} {phone.slice(5)}
                    </strong>
                  </p>
                  {matchedAdmin && (
                    <div className="sb-login-admin-badge-preview">
                      Admin: <strong>{matchedAdmin.name}</strong> • {matchedAdmin.role}
                    </div>
                  )}
                </div>

                {/* OTP Error Message */}
                {otpError && (
                  <div className="sb-admin-security-alert">
                    <ShieldAlert size={18} className="sb-security-alert-icon" />
                    <div className="sb-security-alert-desc">{otpError}</div>
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="sb-login-form">
                  {/* 6 Digit Auto-Advancing Input Boxes */}
                  <div className="sb-otp-inputs-row" onPaste={handleOtpPaste}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputsRef.current[idx] = el)}
                        type="tel"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className={`sb-otp-input-box ${digit ? 'filled' : ''}`}
                      />
                    ))}
                  </div>

                  {/* Demo OTP Helper Notice */}
                  <div className="sb-otp-demo-hint">
                    <span>Default demo code: </span>
                    <strong className="font-mono text-[var(--sb-accent)] bg-[var(--sb-accent-light)] px-1.5 py-0.5 rounded">
                      123456
                    </strong>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || otp.join('').length !== 6}
                    className="sb-btn sb-btn-primary sb-btn-block sb-login-submit-btn"
                  >
                    {isLoading ? (
                      <span className="sb-btn-loading-state">
                        <span className="sb-spinner"></span>
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} />
                        Verify & Sign In
                      </span>
                    )}
                  </button>

                  {/* Resend Timer & Action */}
                  <div className="sb-otp-resend-row">
                    {resendTimer > 0 ? (
                      <span className="text-xs text-[var(--sb-text-muted)]">
                        Resend code in <strong className="text-[var(--sb-text-title)]">00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="sb-btn-resend-active"
                      >
                        Didn't receive code? Resend OTP
                      </button>
                    )}
                  </div>
                </form>

              </div>
            )}

          </div>

          {/* Security Notice Footer */}
          <div className="sb-login-card-footernote">
            <span>StitchBee Admin Console • Protected by Enterprise Access Control</span>
          </div>
        </div>

      </div>

      {/* Embedded CSS for Clean Responsive Login Flow */}
      <style>{`
        .sb-admin-login-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--sb-bg-app);
          padding: 24px;
          box-sizing: border-box;
        }

        .sb-admin-login-container {
          width: 100%;
          max-width: 980px;
          min-height: 560px;
          background: var(--sb-bg-surface);
          border: 1px solid var(--sb-border-default);
          border-radius: 20px;
          box-shadow: var(--sb-shadow-dropdown);
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          overflow: hidden;
          position: relative;
        }

        /* Branding Panel (Left) */
        .sb-login-branding-panel {
          background: linear-gradient(145deg, #1e3a8a 0%, #172554 100%);
          color: #ffffff;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .sb-login-bg-decor {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .sb-login-thread-svg {
          position: absolute;
          top: -30px;
          left: -40px;
          width: 140%;
          height: 140%;
        }

        .sb-login-branding-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          gap: 24px;
        }

        .sb-login-logo-lockup {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sb-login-badge-enterprise {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #fcd34d;
          background: rgba(251, 191, 36, 0.15);
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(251, 191, 36, 0.3);
          margin-top: 4px;
        }

        .sb-login-copy-block {
          margin-top: 24px;
        }

        .sb-login-tagline {
          font-size: 1.35rem;
          font-weight: 700;
          color: #fbbf24;
          letter-spacing: -0.01em;
          line-height: 1.3;
          margin: 0 0 10px 0;
        }

        .sb-login-supporting-text {
          font-size: 0.85rem;
          color: #bfdbfe;
          line-height: 1.5;
          margin: 0;
        }

        .sb-login-middle-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sb-tailoring-visual {
          display: flex;
          align-items: center;
        }

        .sb-tailoring-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 8px 14px;
          border-radius: 999px;
        }

        .sb-login-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .sb-login-metric-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(6px);
          border-radius: 10px;
          padding: 10px;
          text-align: center;
        }

        .sb-login-metric-val {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
        }

        .sb-login-metric-lbl {
          font-size: 0.65rem;
          color: #93c5fd;
          margin-top: 3px;
        }

        .sb-login-branding-footer {
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Form Panel (Right) */
        .sb-login-form-panel {
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .sb-login-topbar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 8px;
        }

        .sb-login-card {
          max-width: 380px;
          width: 100%;
          margin: 0 auto;
        }

        .sb-login-card-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .sb-login-otp-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--sb-primary-light);
          margin-bottom: 10px;
        }

        .sb-login-card-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--sb-text-title);
          margin: 0 0 4px 0;
          letter-spacing: -0.02em;
        }

        .sb-login-card-subtitle {
          font-size: 0.82rem;
          color: var(--sb-text-muted);
          margin: 0;
          line-height: 1.4;
        }

        .sb-login-admin-badge-preview {
          display: inline-block;
          margin-top: 8px;
          font-size: 0.74rem;
          color: var(--sb-primary);
          background: var(--sb-primary-light);
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid var(--sb-blue-200);
        }

        /* Security Alert Box */
        .sb-admin-security-alert {
          background: var(--sb-status-failed-bg);
          border: 1px solid var(--sb-status-failed-border);
          color: var(--sb-status-failed);
          border-radius: 10px;
          padding: 10px 12px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 0.78rem;
          animation: sbFadeIn 0.2s ease-out;
        }

        .sb-security-alert-title {
          font-weight: 700;
          color: var(--sb-status-failed);
          margin-bottom: 1px;
        }

        .sb-security-alert-desc {
          color: var(--sb-text-body);
          line-height: 1.3;
        }

        /* Phone Input Group */
        .sb-form-group {
          margin-bottom: 16px;
        }

        .sb-input-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--sb-text-title);
          margin-bottom: 6px;
        }

        .sb-phone-input-group {
          display: flex;
          align-items: center;
          border: 1px solid var(--sb-border-default);
          border-radius: 10px;
          background: var(--sb-bg-surface);
          overflow: hidden;
          transition: border-color var(--sb-transition-fast), box-shadow var(--sb-transition-fast);
        }

        .sb-phone-input-group:focus-within {
          border-color: var(--sb-primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .sb-phone-country-code {
          padding: 10px 12px;
          background: var(--sb-bg-surface-subtle);
          border-right: 1px solid var(--sb-border-default);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--sb-text-title);
          user-select: none;
        }

        .sb-phone-input-field {
          flex: 1;
          border: none;
          outline: none;
          padding: 10px 14px;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--sb-text-title);
          background: transparent;
        }

        .sb-phone-input-field::placeholder {
          font-weight: 400;
          letter-spacing: normal;
          color: var(--sb-text-muted);
        }

        /* OTP Row */
        .sb-otp-inputs-row {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 12px;
        }

        .sb-otp-input-box {
          width: 44px;
          height: 48px;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--sb-text-title);
          background: var(--sb-bg-surface);
          border: 1.5px solid var(--sb-border-default);
          border-radius: 10px;
          outline: none;
          transition: all var(--sb-transition-fast);
        }

        .sb-otp-input-box:focus {
          border-color: var(--sb-primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
          transform: translateY(-1px);
        }

        .sb-otp-input-box.filled {
          border-color: var(--sb-blue-400);
          background: var(--sb-bg-surface-subtle);
        }

        .sb-otp-demo-hint {
          text-align: center;
          font-size: 0.74rem;
          color: var(--sb-text-muted);
          margin-bottom: 16px;
        }

        .sb-login-submit-btn {
          height: 42px;
          font-size: 0.86rem;
          font-weight: 700;
          border-radius: 10px;
        }

        .sb-login-authorized-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--sb-text-muted);
          margin-top: 12px;
        }

        .sb-otp-resend-row {
          text-align: center;
          margin-top: 14px;
        }

        .sb-btn-resend-active {
          background: transparent;
          border: none;
          color: var(--sb-primary);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .sb-btn-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--sb-text-muted);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          margin-bottom: 14px;
          transition: color var(--sb-transition-fast);
        }

        .sb-btn-back-link:hover {
          color: var(--sb-primary);
        }

        /* Demo Helper Box */
        .sb-login-demo-helper {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px dashed var(--sb-border-default);
        }

        .sb-demo-helper-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--sb-text-title);
          margin-bottom: 8px;
        }

        .sb-demo-chips-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .sb-demo-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 7px 4px;
          background: var(--sb-bg-surface-subtle);
          border: 1px solid var(--sb-border-default);
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          font-size: 0.72rem;
          color: var(--sb-text-title);
          transition: all var(--sb-transition-fast);
        }

        .sb-demo-chip-sub {
          font-size: 0.65rem;
          color: var(--sb-text-muted);
          margin-top: 1px;
        }

        .sb-demo-chip:hover, .sb-demo-chip.active {
          border-color: var(--sb-primary);
          background: var(--sb-primary-light);
          color: var(--sb-primary);
        }

        .sb-login-card-footernote {
          text-align: center;
          font-size: 0.7rem;
          color: var(--sb-text-muted);
          padding-top: 14px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 860px) {
          .sb-admin-login-container {
            grid-template-columns: 1fr;
            max-width: 440px;
          }
          .sb-login-branding-panel {
            display: none;
          }
          .sb-login-form-panel {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}
