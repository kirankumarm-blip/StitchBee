import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Smartphone,
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
    }, 600);
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
      // Default mock OTP verification ('123456' or any 6-digit code for demo convenience)
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
    }, 700);
  };

  return (
    <div className="sb-admin-login-wrapper">
      <div className="sb-admin-login-container">
        
        {/* ========================================================================= */}
        {/* LEFT / BRANDING SECTION (Requirement #65) */}
        {/* ========================================================================= */}
        <div className="sb-login-branding-panel">
          {/* Subtle decorative tailoring background pattern */}
          <div className="sb-login-bg-decor">
            <svg viewBox="0 0 400 400" className="sb-login-thread-svg" fill="none">
              <path
                d="M-50,200 C80,50 180,350 320,180 C400,80 480,240 550,150"
                stroke="var(--sb-accent)"
                strokeWidth="2"
                strokeDasharray="6 8"
                opacity="0.25"
              />
              <path
                d="M-20,120 C100,280 220,90 350,260 C420,350 490,180 560,220"
                stroke="var(--sb-primary-light)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.2"
              />
            </svg>
          </div>

          <div className="sb-login-branding-content">
            {/* Logo & Brand Name */}
            <div className="sb-login-logo-lockup">
              <div className="sb-login-logo-glow">
                <img src="/logo.png" alt="StitchBee Logo" className="sb-login-logo-img" />
              </div>
              <div>
                <h1 className="sb-login-brand-title">StitchBee</h1>
                <span className="sb-login-badge-enterprise">Central Admin Portal</span>
              </div>
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

            {/* Platform Feature / Metric Highlights */}
            <div className="sb-login-metrics-grid">
              <div className="sb-login-metric-card">
                <div className="sb-login-metric-icon">
                  <Scissors size={18} />
                </div>
                <div>
                  <div className="sb-login-metric-val">1,248</div>
                  <div className="sb-login-metric-lbl">Master Ateliers</div>
                </div>
              </div>

              <div className="sb-login-metric-card">
                <div className="sb-login-metric-icon">
                  <Layers size={18} />
                </div>
                <div>
                  <div className="sb-login-metric-val">18.6K+</div>
                  <div className="sb-login-metric-lbl">Orders Fulfilled</div>
                </div>
              </div>

              <div className="sb-login-metric-card">
                <div className="sb-login-metric-icon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="sb-login-metric-val">98.2%</div>
                  <div className="sb-login-metric-lbl">First-Fit SLA</div>
                </div>
              </div>
            </div>

            {/* Footer Trust & Security Badge */}
            <div className="sb-login-branding-footer">
              <div className="flex items-center gap-2 text-xs text-[var(--sb-text-muted)]">
                <Lock size={13} color="var(--sb-accent)" />
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
              style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
            >
              {theme === 'dark' ? <Sun size={17} color="var(--sb-accent)" /> : <Moon size={17} />}
            </button>
          </div>

          {/* Login / OTP Card Container */}
          <div className="sb-login-card">
            
            {/* STEP 1: MOBILE NUMBER INPUT */}
            {step === 'MOBILE' && (
              <div className="sb-login-step-view">
                <div className="sb-login-card-header">
                  <div className="sb-login-mobile-badge-logo">
                    <img src="/logo.png" alt="StitchBee" className="w-8 h-8 object-contain" />
                  </div>
                  <h3 className="sb-login-card-title">Welcome Back</h3>
                  <p className="sb-login-card-subtitle">
                    Sign in to your StitchBee Admin Portal
                  </p>
                </div>

                {/* Security Error Alert (Requirement #67) */}
                {securityError && (
                  <div className="sb-admin-security-alert">
                    <ShieldAlert size={20} className="sb-security-alert-icon" />
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
                    <Info size={13} color="var(--sb-primary)" />
                    <span>Quick Select Authorized Admin (Demo Testing):</span>
                  </div>
                  <div className="sb-demo-chips-grid">
                    <button
                      type="button"
                      onClick={() => handleQuickFill('9845012345')}
                      className={`sb-demo-chip ${phone === '9845012345' ? 'active' : ''}`}
                    >
                      <span className="font-semibold">Kiran Kumar</span>
                      <span className="text-[10px] text-[var(--sb-text-muted)]">Super Admin</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickFill('9845023456')}
                      className={`sb-demo-chip ${phone === '9845023456' ? 'active' : ''}`}
                    >
                      <span className="font-semibold">Sunil Rao</span>
                      <span className="text-[10px] text-[var(--sb-text-muted)]">Operations</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickFill('9876543210')}
                      className={`sb-demo-chip ${phone === '9876543210' ? 'active' : ''}`}
                    >
                      <span className="font-semibold">Demo Admin</span>
                      <span className="text-[10px] text-[var(--sb-accent)] font-bold">98765 43210</span>
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
                  <div className="sb-login-otp-icon-wrap">
                    <KeyRound size={24} color="var(--sb-primary)" />
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
                      Admin: <strong>{matchedAdmin.name}</strong> ({matchedAdmin.role})
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
                    <span>Default test code: </span>
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

      {/* Embedded CSS for Login Flow */}
      <style>{`
        .sb-admin-login-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--sb-bg-body);
          padding: 24px;
          box-sizing: border-box;
        }

        .sb-admin-login-container {
          width: 100%;
          max-width: 1060px;
          min-height: 600px;
          background: var(--sb-bg-surface);
          border: 1px solid var(--sb-border-default);
          border-radius: 24px;
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
          padding: 48px;
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
          top: -20px;
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
        }

        .sb-login-logo-lockup {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .sb-login-logo-glow {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #ffffff;
          padding: 6px;
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sb-login-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .sb-login-brand-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.1;
        }

        .sb-login-badge-enterprise {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #fcd34d;
        }

        .sb-login-copy-block {
          margin: 36px 0 28px 0;
        }

        .sb-login-tagline {
          font-size: 1.45rem;
          font-weight: 700;
          color: #fbbf24;
          letter-spacing: -0.01em;
          line-height: 1.3;
          margin: 0 0 12px 0;
        }

        .sb-login-supporting-text {
          font-size: 0.88rem;
          color: #93c5fd;
          line-height: 1.55;
          margin: 0;
        }

        .sb-login-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .sb-login-metric-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 12px;
        }

        .sb-login-metric-icon {
          color: #fbbf24;
          margin-bottom: 6px;
        }

        .sb-login-metric-val {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
        }

        .sb-login-metric-lbl {
          font-size: 0.68rem;
          color: #bfdbfe;
          margin-top: 2px;
        }

        .sb-login-branding-footer {
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Form Panel (Right) */
        .sb-login-form-panel {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .sb-login-topbar {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .sb-login-card {
          max-width: 400px;
          width: 100%;
          margin: 0 auto;
        }

        .sb-login-card-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .sb-login-mobile-badge-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: var(--sb-bg-surface-subtle);
          border-radius: 12px;
          border: 1px solid var(--sb-border-default);
          margin-bottom: 12px;
        }

        .sb-login-otp-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: var(--sb-primary-light);
          margin-bottom: 12px;
        }

        .sb-login-card-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--sb-text-title);
          margin: 0 0 6px 0;
          letter-spacing: -0.02em;
        }

        .sb-login-card-subtitle {
          font-size: 0.84rem;
          color: var(--sb-text-muted);
          margin: 0;
          line-height: 1.4;
        }

        .sb-login-admin-badge-preview {
          display: inline-block;
          margin-top: 8px;
          font-size: 0.76rem;
          color: var(--sb-primary);
          background: var(--sb-primary-light);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid var(--sb-blue-200);
        }

        /* Security Alert Box */
        .sb-admin-security-alert {
          background: var(--sb-status-failed-bg);
          border: 1px solid var(--sb-status-failed-border);
          color: var(--sb-status-failed);
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
          font-size: 0.8rem;
          animation: sbFadeIn 0.2s ease-out;
        }

        .sb-security-alert-title {
          font-weight: 700;
          color: var(--sb-status-failed);
          margin-bottom: 2px;
        }

        .sb-security-alert-desc {
          color: var(--sb-text-body);
          line-height: 1.35;
        }

        /* Phone Input Group */
        .sb-form-group {
          margin-bottom: 18px;
        }

        .sb-input-label {
          display: block;
          font-size: 0.8rem;
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
          font-size: 0.84rem;
          color: var(--sb-text-title);
          user-select: none;
        }

        .sb-phone-input-field {
          flex: 1;
          border: none;
          outline: none;
          padding: 10px 14px;
          font-size: 0.95rem;
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
          margin-bottom: 14px;
        }

        .sb-otp-input-box {
          width: 48px;
          height: 52px;
          text-align: center;
          font-size: 1.3rem;
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
          font-size: 0.76rem;
          color: var(--sb-text-muted);
          margin-bottom: 18px;
        }

        .sb-login-submit-btn {
          height: 44px;
          font-size: 0.88rem;
          font-weight: 700;
          border-radius: 10px;
        }

        .sb-login-authorized-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.74rem;
          color: var(--sb-text-muted);
          margin-top: 14px;
        }

        .sb-otp-resend-row {
          text-align: center;
          margin-top: 16px;
        }

        .sb-btn-resend-active {
          background: transparent;
          border: none;
          color: var(--sb-primary);
          font-size: 0.8rem;
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
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          margin-bottom: 16px;
          transition: color var(--sb-transition-fast);
        }

        .sb-btn-back-link:hover {
          color: var(--sb-primary);
        }

        /* Demo Helper Box */
        .sb-login-demo-helper {
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px dashed var(--sb-border-default);
        }

        .sb-demo-helper-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--sb-text-title);
          margin-bottom: 10px;
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
          padding: 8px 6px;
          background: var(--sb-bg-surface-subtle);
          border: 1px solid var(--sb-border-default);
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          font-size: 0.74rem;
          color: var(--sb-text-title);
          transition: all var(--sb-transition-fast);
        }

        .sb-demo-chip:hover, .sb-demo-chip.active {
          border-color: var(--sb-primary);
          background: var(--sb-primary-light);
          color: var(--sb-primary);
        }

        .sb-login-card-footernote {
          text-align: center;
          font-size: 0.72rem;
          color: var(--sb-text-muted);
          padding-top: 16px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .sb-admin-login-container {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
          .sb-login-branding-panel {
            display: none;
          }
          .sb-login-form-panel {
            padding: 32px 24px;
          }
        }
      `}</style>
    </div>
  );
}
