import React, { useState, useEffect } from 'react';
import { 
  Scissors, User, Lock, Mail, MapPin, Sparkles, Check, Truck, 
  Phone, Star, Eye, EyeOff, Sun, Moon, ArrowRight, Shield, 
  CreditCard, Camera, Upload, CheckCircle2, ChevronRight, AlertCircle, 
  Building, Map, ShoppingBag, Palette, Ruler, FileText, CheckCircle, 
  RefreshCw, Smartphone, Award, Briefcase, Plus, X, Image as ImageIcon,
  Sparkle, DollarSign, Layers, ChevronLeft, Globe, HelpCircle, Navigation,
  Wallet, TrendingUp, Users
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* MAIN AUTH & PARTNER ONBOARDING COMPONENT (DELIVERY PARTNER THEME)         */
/* -------------------------------------------------------------------------- */
export default function AuthPage({ 
  tab = 'login', 
  setTab, 
  onLoginSuccess, 
  onClose, 
  theme, 
  setTheme, 
  initialRole = 'tailor' 
}) {
  const isDark = theme === 'dark';
  const [currentStep, setCurrentStep] = useState(1);

  // STEP 1: MOBILE OTP
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);

  // STEP 2: BASIC PROFILE
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/logo.png');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1995-05-15');

  // STEP 3: CHOOSE ROLE
  const [isTailorSelected, setIsTailorSelected] = useState(true);
  const [isDesignerSelected, setIsDesignerSelected] = useState(false);

  // STEP 4 (TAILOR & DESIGNER PROFILES)
  const [businessName, setBusinessName] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [workerCount, setWorkerCount] = useState('2-5 workers');
  const [aboutWork, setAboutWork] = useState('');

  // Designer profile specific
  const [designerName, setDesignerName] = useState('');

  // STEP 5: WHAT DO YOU STITCH? (TAILOR) & DESIGN SPECIALIZATIONS (DESIGNER)
  const [stitchingTypes, setStitchingTypes] = useState(['Dress & Clothing', 'Handmade / Fabric Bags']);
  const [specializations, setSpecializations] = useState(["Women's Fashion", "Bridal Wear", "Custom Designs"]);

  // STEP 6: SERVICE DETAILS (TAILOR) & DESIGN CATEGORIES (DESIGNER)
  const [selectedServiceItems, setSelectedServiceItems] = useState(['Shirts', 'Pants', 'Bridal', 'Alterations', 'Tote']);
  const [selectedDesignCategories, setSelectedDesignCategories] = useState(['Dresses', 'Lehengas', 'Gowns', 'Bridal Wear']);

  // STEP 7: TAILOR LOCATION
  const [placeType, setPlaceType] = useState('Shop');
  const [addressLine, setAddressLine] = useState('Shop 12, Fashion Hub, Commercial Street');
  const [area, setArea] = useState('Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [state, setStateName] = useState('Karnataka');
  const [pincode, setPincode] = useState('560038');
  const [serviceRadius, setServiceRadius] = useState(15);

  // STEP 8: TAILOR PRICING
  const [tailorPrices, setTailorPrices] = useState({
    'Shirt': '500',
    'Pant': '600',
    'Leather Bag': '1500',
    'Car Seat Cover': '3500',
    'Pet Dress': '500',
    'Sofa Cover': '2000'
  });
  const [pricingModel, setPricingModel] = useState('Starting price');

  // STEP 9: TAILOR PORTFOLIO
  const [portfolioPhotos, setPortfolioPhotos] = useState([
    { id: 1, name: 'Bridal Stitching 1', category: 'Clothing', url: '/sample_portfolio1.jpg' },
    { id: 2, name: 'Handmade Tote Bag', category: 'Bags', url: '/sample_portfolio2.jpg' }
  ]);

  // STEP 10: IDENTITY VERIFICATION
  const [legalName, setLegalName] = useState('');
  const [idType, setIdType] = useState('Aadhaar Card');
  const [idNumber, setIdNumber] = useState('');

  // STEP 11: BANK / UPI
  const [paymentMode, setPaymentMode] = useState('upi');
  const [bankAccount, setBankAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [upiId, setUpiId] = useState('');

  // General Error / Alert
  const [errorMsg, setErrorMsg] = useState('');

  // Countdown timer for OTP
  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  // Sync state names on initial load
  useEffect(() => {
    if (firstName && !businessName) {
      setBusinessName(`${firstName}'s Stitching Studio`);
      setDesignerName(`${firstName} Couture`);
      setLegalName(`${firstName} ${lastName}`);
      setAccountHolder(`${firstName} ${lastName}`);
    }
  }, [firstName, lastName]);

  const isBoth = isTailorSelected && isDesignerSelected;
  const isDesignerOnly = !isTailorSelected && isDesignerSelected;
  const maxSteps = 13;

  // Send Mobile OTP simulation
  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setOtpTimer(30);
  };

  // Verify Mobile OTP simulation
  const handleVerifyOtp = () => {
    const entered = otpCode.join('');
    if (entered.length < 4 && entered !== '1234') {
      setErrorMsg('Please enter the 4-digit OTP sent to your phone (or enter 1234).');
      return;
    }
    setErrorMsg('');
    setOtpVerified(true);
  };

  // Quick OTP Auto-fill helper
  const handleAutoFillOtp = () => {
    setOtpCode(['1', '2', '3', '4']);
    setErrorMsg('');
    setOtpVerified(true);
  };

  // Next Step validation & progress
  const handleNextStep = () => {
    setErrorMsg('');
    if (currentStep === 1 && !otpVerified) {
      setErrorMsg('Please verify your mobile OTP to proceed.');
      return;
    }
    if (currentStep === 2 && (!firstName || !lastName)) {
      setErrorMsg('Please enter your First Name and Last Name.');
      return;
    }
    if (currentStep === 3 && !isTailorSelected && !isDesignerSelected) {
      setErrorMsg('Please select at least one role: Tailoring & Stitching or Fashion Designing.');
      return;
    }

    if (currentStep < maxSteps) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  // Finish Onboarding & Login
  const handleCompleteOnboarding = () => {
    const partnerRole = isBoth ? 'tailor_designer' : isDesignerOnly ? 'designer' : 'tailor';
    const partnerUser = {
      name: `${firstName} ${lastName}`.trim() || 'StitchBee Partner',
      phone: mobileNumber || '9876543210',
      email: `${firstName.toLowerCase() || 'partner'}@stitchbee.com`,
      role: 'tailor',
      partnerSubRole: partnerRole,
      businessName: businessName || designerName || 'StitchBee Studio',
      isVerified: false,
      status: 'pending_verification'
    };

    localStorage.setItem('stitchbee_user', JSON.stringify(partnerUser));
    if (onLoginSuccess) {
      onLoginSuccess(partnerUser);
    }
  };

  // Colors & Theme Tokens
  const pageBg = isDark ? '#080516' : '#f8fafc';
  const rightBg = isDark ? '#0f0a24' : '#ffffff';
  const textHead = isDark ? '#ffffff' : '#0f172a';
  const textSub = isDark ? '#a78bfa' : '#64748b';
  const inputBg = isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc';
  const inputBorder = isDark ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0';

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: pageBg,
        display: 'flex',
        fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* -------------------------------------------------------------------- */}
      {/* LEFT COLUMN: HERO DELIVERY/PARTNER VIDEO & BRANDING BANNER (45%)    */}
      {/* -------------------------------------------------------------------- */}
      <div 
        style={{ 
          width: '45%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          background: '#0a0518'
        }}
      >
        {/* Background Video */}
        <video
          src="/TailorCutting.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45,
            zIndex: 1
          }}
        />

        {/* Gradient Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(10,5,24,0.7) 0%, rgba(10,5,24,0.92) 100%)',
            zIndex: 2
          }}
        />

        {/* Top Header Logo */}
        <div style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.png" alt="StitchBee" style={{ height: '42px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
            Stitch<span style={{ color: '#f72585' }}>Bee</span> Partner
          </span>
        </div>

        {/* Middle Hero Headline & Stats */}
        <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(247, 37, 133, 0.2)',
              border: '1px solid rgba(247, 37, 133, 0.4)',
              color: '#f72585',
              fontSize: '0.85rem',
              fontWeight: 800,
              width: 'fit-content'
            }}
          >
            <Scissors size={14} />
            <span>StitchBee Partner Network</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, margin: 0 }}>
            Stitch More. <br />
            <span style={{ color: '#f72585' }}>Earn More.</span> <br />
            Work Freely.
          </h1>

          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
            Join India's premier network of custom tailors & fashion designers. Receive instant local orders, doorstep pick-ups, and weekly payouts.
          </p>

          {/* Stats Ribbon */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr', 
              gap: '12px', 
              marginTop: '10px',
              padding: '16px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#f72585' }}>10K+</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Active Partners</div>
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#4cc9f0' }}>₹35K+</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Avg Monthly</div>
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10b981' }}>98%</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Features */}
        <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} style={{ color: '#10b981' }} /> Flexible Schedule</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} style={{ color: '#10b981' }} /> Instant Phone OTP</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={14} style={{ color: '#10b981' }} /> Weekly Bank/UPI Payouts</span>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* RIGHT COLUMN: STEP-BY-STEP FORM PANEL (55%)                          */}
      {/* -------------------------------------------------------------------- */}
      <div 
        style={{ 
          width: '55%',
          height: '100%',
          background: rightBg,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {/* RIGHT TOP NAVBAR */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '20px 36px',
            borderBottom: `1px solid ${inputBorder}`
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(247,37,133,0.12) 0%, rgba(114,9,183,0.12) 100%)',
              border: '1px solid rgba(247,37,133,0.25)',
              color: '#f72585',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}
          >
            <Sparkles size={14} />
            <span>Step {currentStep} of {maxSteps}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: inputBg,
                border: `1px solid ${inputBorder}`,
                color: textHead,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {onClose && (
              <button
                onClick={onClose}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: textHead,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ width: '100%', height: '4px', background: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${(currentStep / maxSteps) * 100}%`,
              background: 'linear-gradient(90deg, #f72585 0%, #7209b7 100%)',
              transition: 'width 300ms ease'
            }} 
          />
        </div>

        {/* FORM CONTAINER (SCROLLABLE) */}
        <div 
          style={{ 
            flex: 1, 
            padding: '36px 48px', 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* ERROR ALERT */}
            {errorMsg && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 1: MOBILE OTP AUTHENTICATION                                  */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: textHead, margin: '0 0 6px 0' }}>
                    Partner Mobile Signup & Login
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: textSub, margin: 0 }}>
                    Enter your 10-digit mobile number. No password required!
                  </p>
                </div>

                {!otpSent ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: textHead }}>
                      Mobile Phone Number
                    </label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div
                        style={{
                          padding: '14px 16px',
                          borderRadius: '14px',
                          background: inputBg,
                          border: `1px solid ${inputBorder}`,
                          color: textHead,
                          fontWeight: 700,
                          fontSize: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        🇮🇳 +91
                      </div>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        style={{
                          flex: 1,
                          padding: '14px 18px',
                          borderRadius: '14px',
                          background: inputBg,
                          border: `1px solid ${inputBorder}`,
                          color: textHead,
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button
                      onClick={handleSendOtp}
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 8px 20px rgba(247, 37, 133, 0.35)',
                        marginTop: '10px'
                      }}
                    >
                      <span>Send OTP Code</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div
                      style={{
                        padding: '14px',
                        borderRadius: '14px',
                        background: 'rgba(114, 9, 183, 0.12)',
                        border: '1px solid rgba(114, 9, 183, 0.25)',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        color: textHead
                      }}
                    >
                      OTP code sent to <span style={{ fontWeight: 800, color: '#f72585' }}>+91 {mobileNumber}</span>
                    </div>

                    {/* 4-digit OTP Box */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
                      {[0, 1, 2, 3].map((idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={otpCode[idx] || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            const next = [...otpCode];
                            next[idx] = val;
                            setOtpCode(next);
                            if (val && idx < 3) {
                              document.getElementById(`otp-${idx + 1}`)?.focus();
                            }
                          }}
                          style={{
                            width: '60px',
                            height: '64px',
                            borderRadius: '16px',
                            background: inputBg,
                            border: `2px solid ${otpCode[idx] ? '#f72585' : inputBorder}`,
                            textAlign: 'center',
                            fontSize: '1.6rem',
                            fontWeight: 800,
                            color: textHead,
                            outline: 'none'
                          }}
                        />
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        onClick={handleAutoFillOtp}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#f72585',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Sparkle size={14} />
                        <span>Use Quick Test OTP (1234)</span>
                      </button>

                      <button
                        disabled={otpTimer > 0}
                        onClick={() => setOtpTimer(30)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: otpTimer > 0 ? textSub : '#7209b7',
                          fontSize: '0.88rem',
                          cursor: otpTimer > 0 ? 'default' : 'pointer'
                        }}
                      >
                        {otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Resend OTP'}
                      </button>
                    </div>

                    {!otpVerified ? (
                      <button
                        onClick={handleVerifyOtp}
                        style={{
                          padding: '16px',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '1rem',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <span>Verify OTP Code</span>
                        <CheckCircle2 size={18} />
                      </button>
                    ) : (
                      <div
                        style={{
                          padding: '16px',
                          borderRadius: '16px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid #10b981',
                          color: '#10b981',
                          fontWeight: 800,
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <CheckCircle size={20} />
                        <span>OTP Verified! Partner Mobile Account Created.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 2: BASIC PROFILE                                              */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    Basic Profile Details
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Enter your name and personal details for your partner badge.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>First Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.95rem',
                        outline: 'none',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Last Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Kumar"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.95rem',
                        outline: 'none',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Gender</label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                    {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '10px',
                          border: `1.5px solid ${gender === g ? '#f72585' : inputBorder}`,
                          background: gender === g ? 'rgba(247,37,133,0.12)' : inputBg,
                          color: gender === g ? '#f72585' : textHead,
                          fontWeight: gender === g ? 800 : 600,
                          fontSize: '0.82rem',
                          cursor: 'pointer'
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      color: textHead,
                      fontSize: '0.95rem',
                      outline: 'none',
                      marginTop: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Profile Photo Selector */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Profile Photo</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '1.5rem'
                      }}
                    >
                      {firstName ? firstName.charAt(0).toUpperCase() : <User size={30} />}
                    </div>
                    <label
                      style={{
                        padding: '10px 18px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Camera size={16} />
                      <span>Upload Profile Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 3: CHOOSE YOUR ROLE                                           */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: textHead, margin: '0 0 6px 0' }}>
                    What do you offer on StitchBee?
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Choose your partner role. You can select both!
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Option 1: Tailoring & Stitching */}
                  <div
                    onClick={() => setIsTailorSelected(!isTailorSelected)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 24px',
                      borderRadius: '20px',
                      border: `2px solid ${isTailorSelected ? '#f72585' : inputBorder}`,
                      background: isTailorSelected ? 'rgba(247,37,133,0.12)' : inputBg,
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, #f72585 0%, #f43f5e 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}
                      >
                        <Scissors size={26} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: textHead, margin: 0 }}>
                          Tailoring & Stitching
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: textSub, margin: '2px 0 0 0' }}>
                          Custom stitching, clothing alterations, fabric bags, vehicle seats & pet wear.
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '8px',
                        border: `2px solid ${isTailorSelected ? '#f72585' : inputBorder}`,
                        background: isTailorSelected ? '#f72585' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}
                    >
                      {isTailorSelected && <Check size={16} />}
                    </div>
                  </div>

                  {/* Option 2: Fashion Designing */}
                  <div
                    onClick={() => setIsDesignerSelected(!isDesignerSelected)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 24px',
                      borderRadius: '20px',
                      border: `2px solid ${isDesignerSelected ? '#7209b7' : inputBorder}`,
                      background: isDesignerSelected ? 'rgba(114,9,183,0.12)' : inputBg,
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, #7209b7 0%, #a855f7 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}
                      >
                        <Palette size={26} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: textHead, margin: 0 }}>
                          Fashion Designing
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: textSub, margin: '2px 0 0 0' }}>
                          Fashion sketching, bridal collections, custom design consultations & styling.
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '8px',
                        border: `2px solid ${isDesignerSelected ? '#7209b7' : inputBorder}`,
                        background: isDesignerSelected ? '#7209b7' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}
                    >
                      {isDesignerSelected && <Check size={16} />}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '14px',
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(247,37,133,0.06)',
                    border: `1px solid ${inputBorder}`,
                    fontSize: '0.85rem',
                    color: textSub,
                    textAlign: 'center'
                  }}
                >
                  Selected Flow: {' '}
                  <strong style={{ color: '#f72585' }}>
                    {isBoth ? 'Tailor + Designer Onboarding' : isDesignerOnly ? 'Designer Onboarding' : 'Tailor Onboarding'}
                  </strong>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 4: BUSINESS / DESIGNER PROFILE                                */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    {isDesignerOnly ? 'Designer Studio Profile' : 'Tailor Business Profile'}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Enter your shop name, experience and workshop details.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>
                    {isDesignerOnly ? 'Studio / Brand Name *' : 'Tailor / Business Name *'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Fit Stitching & Boutique"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      color: textHead,
                      fontSize: '0.95rem',
                      outline: 'none',
                      marginTop: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Experience (Years)</label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.95rem',
                        outline: 'none',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Team / Workers</label>
                    <select
                      value={workerCount}
                      onChange={(e) => setWorkerCount(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.95rem',
                        outline: 'none',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="Solo tailor / designer">Solo tailor / designer</option>
                      <option value="2-5 workers">2-5 workers</option>
                      <option value="5-10 workers">5-10 workers</option>
                      <option value="10+ workers">10+ workers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>About your work</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your stitching quality, specialization, fabrics handled..."
                    value={aboutWork}
                    onChange={(e) => setAboutWork(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      color: textHead,
                      fontSize: '0.9rem',
                      outline: 'none',
                      marginTop: '4px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Shop / Studio Photo</label>
                  <div
                    style={{
                      marginTop: '6px',
                      border: `2px dashed ${inputBorder}`,
                      borderRadius: '16px',
                      padding: '24px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: inputBg
                    }}
                  >
                    <Upload size={28} style={{ color: '#f72585', marginBottom: '6px' }} />
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: textHead }}>Click to upload workshop photo</div>
                    <div style={{ fontSize: '0.78rem', color: textSub }}>JPG, PNG up to 5MB</div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 5: WHAT DO YOU STITCH? / SPECIALIZATIONS                      */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    {isDesignerOnly ? 'Design Specializations' : 'What Do You Stitch?'}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Multiple selections allowed. Select all that apply to your workshop.
                  </p>
                </div>

                {!isDesignerOnly ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { title: '👔 Dress & Clothing', id: 'Dress & Clothing' },
                      { title: '👜 Handmade Bags', id: 'Handmade / Fabric Bags' },
                      { title: '💼 Leather Bags', id: 'Leather Bags' },
                      { title: '🚗 Seat Covers', id: 'Vehicle Seat Covers' },
                      { title: '👞 Shoes & Slippers', id: 'Shoes & Slippers' },
                      { title: '🛋️ Sofa & Home', id: 'Sofa & Home' },
                      { title: '🐕 Pet Clothing', id: 'Pet Clothing & Accessories' }
                    ].map((item) => {
                      const active = stitchingTypes.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setStitchingTypes(
                              active ? stitchingTypes.filter((t) => t !== item.id) : [...stitchingTypes, item.id]
                            );
                          }}
                          style={{
                            padding: '14px 16px',
                            borderRadius: '16px',
                            border: `1.5px solid ${active ? '#f72585' : inputBorder}`,
                            background: active ? 'rgba(247,37,133,0.12)' : inputBg,
                            color: active ? '#f72585' : textHead,
                            fontWeight: active ? 800 : 600,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>{item.title}</span>
                          {active && <Check size={18} />}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      "Women's Fashion", "Men's Fashion", "Kids Fashion",
                      "Bridal Wear", "Party Wear", "Traditional Wear",
                      "Casual Wear", "Corporate Wear", "Custom Designs"
                    ].map((spec) => {
                      const active = specializations.includes(spec);
                      return (
                        <div
                          key={spec}
                          onClick={() => {
                            setSpecializations(
                              active ? specializations.filter((s) => s !== spec) : [...specializations, spec]
                            );
                          }}
                          style={{
                            padding: '14px 16px',
                            borderRadius: '16px',
                            border: `1.5px solid ${active ? '#7209b7' : inputBorder}`,
                            background: active ? 'rgba(114,9,183,0.12)' : inputBg,
                            color: active ? '#7209b7' : textHead,
                            fontWeight: active ? 800 : 600,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>{spec}</span>
                          {active && <Check size={18} />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 6: SERVICE DETAILS & CATEGORIES                               */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    {isDesignerOnly ? 'Design Categories' : 'Service Details & Sub-Categories'}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Select specific items your workshop or boutique offers.
                  </p>
                </div>

                {!isDesignerOnly ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '340px', overflowY: 'auto' }}>
                    {[
                      { cat: 'Clothing', items: ['Shirts', 'Pants', 'Blazers', 'Suits', 'Bridal', 'Dresses', 'Blouses', 'Kids wear', 'Alterations', 'Custom clothing'] },
                      { cat: 'Handmade Bags', items: ['Tote', 'Shopping bags', 'School bags', 'Custom bags'] },
                      { cat: 'Leather Bags', items: ['Handbags', 'Laptop bags', 'Travel bags', 'Wallets', 'Custom leather'] },
                      { cat: 'Vehicle', items: ['Car seat covers', 'Bike seat covers', 'Auto seats', 'Commercial vehicle'] },
                      { cat: 'Footwear', items: ['Shoes', 'Slippers', 'Sandals', 'Custom footwear', 'Repair'] },
                      { cat: 'Sofa/Home', items: ['Sofa covers', 'Cushion covers', 'Chair covers', 'Curtains', 'Beds'] },
                      { cat: 'Pets', items: ['Dog clothing', 'Cat clothing', 'Jackets', 'Dresses', 'Pet beds'] }
                    ].map((grp) => (
                      <div key={grp.cat} style={{ background: inputBg, padding: '14px', borderRadius: '16px', border: `1px solid ${inputBorder}` }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f72585', marginBottom: '8px' }}>{grp.cat}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {grp.items.map((sub) => {
                            const active = selectedServiceItems.includes(sub);
                            return (
                              <button
                                key={sub}
                                onClick={() => {
                                  setSelectedServiceItems(
                                    active ? selectedServiceItems.filter((i) => i !== sub) : [...selectedServiceItems, sub]
                                  );
                                }}
                                style={{
                                  padding: '8px 14px',
                                  borderRadius: '20px',
                                  border: `1px solid ${active ? '#f72585' : inputBorder}`,
                                  background: active ? '#f72585' : 'transparent',
                                  color: active ? '#ffffff' : textHead,
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                {sub}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {[
                      'Dresses', 'Saree Blouses', 'Lehengas', 'Gowns', 'Suits',
                      'Shirts', 'Pants', 'Kids Wear', 'Bridal Wear', 'Accessories', 'Custom Designs'
                    ].map((cat) => {
                      const active = selectedDesignCategories.includes(cat);
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedDesignCategories(
                              active ? selectedDesignCategories.filter((c) => c !== cat) : [...selectedDesignCategories, cat]
                            );
                          }}
                          style={{
                            padding: '12px 20px',
                            borderRadius: '24px',
                            border: `1.5px solid ${active ? '#7209b7' : inputBorder}`,
                            background: active ? '#7209b7' : inputBg,
                            color: active ? '#ffffff' : textHead,
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 7: LOCATION & WORKSHOP MAP                                   */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 7 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    Workshop Location & Service Area
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Help local customers locate your shop or request doorstep pickups.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Workplace Type</label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                    {['Shop', 'Home', 'Both Shop & Home'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setPlaceType(t)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          borderRadius: '12px',
                          border: `1.5px solid ${placeType === t ? '#f72585' : inputBorder}`,
                          background: placeType === t ? 'rgba(247,37,133,0.15)' : inputBg,
                          color: placeType === t ? '#f72585' : textHead,
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: textHead }}>Address Line *</label>
                    <input
                      type="text"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: textHead }}>Area / Landmark</label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: textHead }}>City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.85rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: textHead }}>State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setStateName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.85rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: textHead }}>Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.85rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Service Radius Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: textHead }}>
                    <span>Doorstep Service Radius</span>
                    <span style={{ color: '#f72585' }}>{serviceRadius} km</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={serviceRadius}
                    onChange={(e) => setServiceRadius(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '6px', accentColor: '#f72585' }}
                  />
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 8: PRICING & RATES                                            */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 8 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    Stitching Rates & Pricing Model
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Define starting prices for your custom services.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Pricing Model</label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                    {['Starting price', 'Fixed price', 'Custom quote'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setPricingModel(m)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '12px',
                          border: `1.5px solid ${pricingModel === m ? '#f72585' : inputBorder}`,
                          background: pricingModel === m ? 'rgba(247,37,133,0.15)' : inputBg,
                          color: pricingModel === m ? '#f72585' : textHead,
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer'
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {Object.keys(tailorPrices).map((item) => (
                    <div key={item} style={{ background: inputBg, padding: '12px 16px', borderRadius: '14px', border: `1px solid ${inputBorder}` }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: textSub }}>{item}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <span style={{ fontWeight: 800, color: '#f72585', fontSize: '1rem' }}>₹</span>
                        <input
                          type="number"
                          value={tailorPrices[item]}
                          onChange={(e) => setTailorPrices({ ...tailorPrices, [item]: e.target.value })}
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: textHead,
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            outline: 'none'
                          }}
                        />
                        <span style={{ fontSize: '0.8rem', color: textSub }}>+</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 9: PORTFOLIO & WORK UPLOADS                                  */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 9 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    Work Portfolio Uploads
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Showcase your finished garments, suits, or custom work photos.
                  </p>
                </div>

                <div
                  style={{
                    border: `2px dashed ${inputBorder}`,
                    borderRadius: '20px',
                    padding: '32px',
                    textAlign: 'center',
                    background: inputBg,
                    cursor: 'pointer'
                  }}
                >
                  <ImageIcon size={36} style={{ color: '#7209b7', marginBottom: '8px' }} />
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: textHead }}>
                    Upload Stitching Photos & Before/After Work
                  </div>
                  <div style={{ fontSize: '0.8rem', color: textSub, marginTop: '4px' }}>
                    Add clear photos of your finished suits, dresses, bags, seat covers
                  </div>
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: textHead }}>Uploaded Samples</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {portfolioPhotos.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        padding: '14px',
                        borderRadius: '16px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}
                      >
                        <ImageIcon size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: textHead }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#f72585', fontWeight: 600 }}>{p.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 10: IDENTITY VERIFICATION                                     */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 10 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    Identity Verification
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Government identity document check for StitchBee Verified Partner badge.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Legal Name (as per Govt ID) *</label>
                  <input
                    type="text"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      color: textHead,
                      fontSize: '0.95rem',
                      outline: 'none',
                      marginTop: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: textHead }}>ID Type</label>
                    <select
                      value={idType}
                      onChange={(e) => setIdType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="Aadhaar Card">Aadhaar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="GSTIN Registration">GSTIN Registration</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: textHead }}>Document ID Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 1234 5678 9012"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>Upload Document Photo</label>
                  <div
                    style={{
                      marginTop: '6px',
                      border: `2px dashed ${inputBorder}`,
                      borderRadius: '16px',
                      padding: '20px',
                      textAlign: 'center',
                      background: inputBg,
                      cursor: 'pointer'
                    }}
                  >
                    <Shield size={28} style={{ color: '#10b981', marginBottom: '4px' }} />
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: textHead }}>
                      Front & Back Govt ID Photo
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 11: BANK / UPI PAYMENT DETAILS                                */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 11 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    Payout Bank / UPI Details
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Receive customer payments directly into your account.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setPaymentMode('upi')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '14px',
                      border: `1.5px solid ${paymentMode === 'upi' ? '#f72585' : inputBorder}`,
                      background: paymentMode === 'upi' ? 'rgba(247,37,133,0.15)' : inputBg,
                      color: paymentMode === 'upi' ? '#f72585' : textHead,
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    Instant UPI ID
                  </button>
                  <button
                    onClick={() => setPaymentMode('bank')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '14px',
                      border: `1.5px solid ${paymentMode === 'bank' ? '#7209b7' : inputBorder}`,
                      background: paymentMode === 'bank' ? 'rgba(114,9,183,0.15)' : inputBg,
                      color: paymentMode === 'bank' ? '#7209b7' : textHead,
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    Bank Account
                  </button>
                </div>

                {paymentMode === 'upi' ? (
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: textHead }}>UPI ID *</label>
                    <input
                      type="text"
                      placeholder="e.g. stitchbee.partner@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: textHead,
                        fontSize: '0.95rem',
                        outline: 'none',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: textHead }}>Account Holder Name</label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: inputBg,
                          border: `1px solid ${inputBorder}`,
                          color: textHead,
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: textHead }}>Bank Account No</label>
                        <input
                          type="text"
                          value={bankAccount}
                          onChange={(e) => setBankAccount(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '10px',
                            background: inputBg,
                            border: `1px solid ${inputBorder}`,
                            color: textHead,
                            fontSize: '0.88rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: textHead }}>IFSC Code</label>
                        <input
                          type="text"
                          value={ifscCode}
                          onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '10px',
                            background: inputBg,
                            border: `1px solid ${inputBorder}`,
                            color: textHead,
                            fontSize: '0.88rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 12: REVIEW SUMMARY BEFORE SUBMISSION                          */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 12 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: textHead, margin: '0 0 4px 0' }}>
                    Review Partner Profile
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: textSub, margin: 0 }}>
                    Double check your details before submitting for partner verification.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { label: 'Personal Information', status: '✓', val: `${firstName} ${lastName}` },
                    { label: 'Business Information', status: '✓', val: businessName || 'StitchBee Studio' },
                    { label: 'Selected Services', status: '✓', val: `${stitchingTypes.length} service types` },
                    { label: 'Workplace Location', status: '✓', val: `${area}, ${city}` },
                    { label: 'Starting Rates', status: '✓', val: `Configured (${pricingModel})` },
                    { label: 'Sample Portfolio', status: '✓', val: `${portfolioPhotos.length} photos` },
                    { label: 'Govt Identity ID', status: '✓', val: `${idType} Submitted` },
                    { label: 'Payment Payout', status: '✓', val: paymentMode === 'upi' ? 'UPI Enabled' : 'Bank Account' }
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '14px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: textSub }}>{item.label}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: textHead }}>{item.val}</div>
                      </div>
                      <span style={{ color: '#10b981', fontWeight: 900, fontSize: '1.1rem' }}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* STEP 13: APPROVAL PENDING STATUS SCREEN                            */}
            {/* ------------------------------------------------------------------ */}
            {currentStep === 13 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', textAlign: 'center', padding: '20px 0' }}>
                <div
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0 10px 25px rgba(16,185,129,0.35)'
                  }}
                >
                  <CheckCircle size={52} />
                </div>

                <div>
                  <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: textHead, margin: '0 0 6px 0' }}>
                    🎉 Profile Submitted!
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: textSub, margin: 0 }}>
                    Your StitchBee Partner profile is under verification.
                  </p>
                </div>

                <div
                  style={{
                    padding: '18px 24px',
                    borderRadius: '20px',
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: '#f59e0b',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  <span>🟡 Verification Pending — We'll notify you once your account is approved.</span>
                </div>

                <div style={{ fontSize: '0.85rem', color: textSub, lineHeight: 1.6 }}>
                  Estimated review time: 24-48 hours. You can already explore your partner dashboard preview in read-only mode.
                </div>

                <button
                  onClick={handleCompleteOnboarding}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  Go to Partner Dashboard Preview
                </button>
              </div>
            )}

          </div>

          {/* FOOTER ACTION BUTTONS (PREV / NEXT) */}
          {currentStep < 13 && (
            <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '16px',
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    color: textHead,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <ChevronLeft size={18} />
                  <span>Back</span>
                </button>
              )}

              <button
                onClick={handleNextStep}
                style={{
                  flex: 2,
                  padding: '16px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(247,37,133,0.35)'
                }}
              >
                <span>{currentStep === 12 ? 'Submit for Verification' : 'Continue'}</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
