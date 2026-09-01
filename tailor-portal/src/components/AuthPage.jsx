import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, User, Lock, Mail, MapPin, Sparkles, Check, Truck, 
  Phone, Star, Eye, EyeOff, Sun, Moon, ArrowRight, Shield, 
  CreditCard, Camera, Upload, CheckCircle2, ChevronRight, AlertCircle, 
  Building, Map, ShoppingBag, Palette, Ruler, FileText, CheckCircle, 
  RefreshCw, Smartphone, Award, Briefcase, Plus, X, Image as ImageIcon,
  Sparkle, DollarSign, Layers, ChevronLeft, Globe, HelpCircle, Navigation,
  Wallet, TrendingUp, Users, Headphones, Zap, Trash2
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* TAILOR & DESIGNER PARTNER AUTHENTICATION (3D ANIMATED DELIVERY THEME)     */
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
  const [previewMode, setPreviewMode] = useState('tailor'); // 'tailor' | 'designer'

  // Auto-switch between Tailor and Designer images every 10 seconds (10,000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewMode((prev) => (prev === 'tailor' ? 'designer' : 'tailor'));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // STEP 1: MOBILE OTP (6-DIGIT OTP)
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const otpRefs = useRef([]);

  // STEP 2: BASIC PROFILE
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1995-05-15');

  // Camera & File Upload states for Profile Photo
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Attach stream when videoRef is ready
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraActive]);

  // Start live webcam stream
  const startCamera = async () => {
    setCameraError('');
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access camera. Please check browser permissions or upload a photo from your device.');
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraError('');
  };

  // Capture photo from video feed
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 400;
      canvas.height = video.videoHeight || 400;
      const ctx = canvas.getContext('2d');
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setAvatarUrl(dataUrl);
      stopCamera();
    }
  };

  // Handle photo file upload from device
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle multiple stitching photos upload from device
  const handleMultiplePortfolioUploads = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    const newPhotos = [];
    let processedCount = 0;

    files.forEach((file, idx) => {
      if (file.size > 15 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 15MB size limit.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoObj = {
          id: Date.now() + idx + Math.random(),
          name: file.name.replace(/\.[^/.]+$/, ''),
          category: 'Stitching Sample',
          url: reader.result,
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        };
        newPhotos.push(photoObj);
        processedCount++;
        if (processedCount === files.length) {
          setPortfolioPhotos((prev) => [...prev, ...newPhotos]);
        }
      };
      reader.readAsDataURL(file);
    });
    // Reset file input so user can upload more
    e.target.value = '';
  };

  // Remove individual photo from portfolio
  const removePortfolioPhoto = (id) => {
    setPortfolioPhotos((prev) => prev.filter((p) => p.id !== id));
  };

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

  // Terms & Privacy checkboxes
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // General Error / Alert
  const [errorMsg, setErrorMsg] = useState('');

  // Countdown timer for 6-digit OTP
  useEffect(() => {
    let timer = null;
    if (timerActive && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    } else if (otpTimer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [timerActive, otpTimer]);

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
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    if (tab === 'signup' && (!agreeTerms || !agreePrivacy)) {
      setErrorMsg('You must agree to the Terms & Conditions and Privacy Policy to proceed.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setOtpTimer(300);
    setTimerActive(true);
    setOtpCode(['', '', '', '', '', '']);
    setTimeout(() => {
      if (otpRefs.current[0]) otpRefs.current[0].focus();
    }, 100);
  };

  // Verify Mobile OTP simulation & Next Step Transition
  const handleVerifyOtp = () => {
    const entered = otpCode.join('');
    if (entered.length < 6 && entered !== '123456') {
      setErrorMsg('Please enter the complete 6-digit OTP verification code.');
      return;
    }
    setErrorMsg('');
    setOtpVerified(true);

    if (tab === 'login') {
      const isDesigner = mobileNumber === '9876543211' || initialRole === 'designer';
      const partnerUser = {
        name: isDesigner ? 'Ananya Roy' : 'Master Rajesh',
        phone: mobileNumber || '9876543210',
        email: isDesigner ? 'ananya@stitchbee.com' : 'partner@stitchbee.com',
        role: isDesigner ? 'designer' : 'tailor',
        partnerSubRole: isDesigner ? 'designer' : 'tailor',
        businessName: isDesigner ? 'Ananya Roy Designer Studio' : 'Vogue Craft Tailors',
        isVerified: true
      };
      localStorage.setItem('stitchbee_user', JSON.stringify(partnerUser));
      if (onLoginSuccess) {
        onLoginSuccess(partnerUser);
      }
    } else {
      // Immediately proceed to Step 2 (Basic Profile) for signup onboarding
      setCurrentStep(2);
    }
  };

  // Quick OTP Auto-fill helper (6 Digits)
  const handleAutoFillOtp = () => {
    setOtpCode(['1', '2', '3', '4', '5', '6']);
    setErrorMsg('');
    setOtpVerified(true);
  };

  // Next Step validation & progress
  const handleNextStep = () => {
    setErrorMsg('');
    if (currentStep === 1 && !otpVerified) {
      handleVerifyOtp();
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

  // Delivery Portal Color Tokens & Background Gradients
  const bgPageGrad = isDark 
    ? 'radial-gradient(circle at 10% 20%, rgba(106, 0, 244, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(236, 11, 121, 0.15) 0%, transparent 40%), #0b081e'
    : 'radial-gradient(circle at 10% 20%, rgba(106, 0, 244, 0.08) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(236, 11, 121, 0.08) 0%, transparent 45%), #FFFDFC';
  const bgCard = isDark ? '#120f26' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#ECECF4';
  const colorTextPrimary = isDark ? '#f3f4f6' : '#131A34';
  const colorTextSecondary = isDark ? '#9ca3af' : '#5D647A';
  const colorTextMuted = isDark ? '#6b7280' : '#7D8597';
  const inputBg = isDark ? 'rgba(255, 255, 255, 0.02)' : '#FFFFFF';
  const inputBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : '#ECECF4';

  return (
    <div 
      style={{ 
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        background: bgPageGrad,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
      className="auth-page-root"
    >
      {/* -------------------------------------------------------------------- */}
      {/* 1. TOP NAVIGATION HEADER                                             */}
      {/* -------------------------------------------------------------------- */}
      <header
        className="auth-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 36px',
          zIndex: 50,
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        {/* Left: StitchBee logo */}
        <div 
          onClick={onClose} 
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          title="Return to Landing Page"
        >
          <img 
            src="/logo.png" 
            alt="StitchBee" 
            className="auth-header-logo"
            style={{ height: '60px', width: 'auto', maxWidth: '220px', objectFit: 'contain', display: 'block' }} 
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {tab === 'signup' && currentStep > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(247,37,133,0.12) 0%, rgba(114,9,183,0.12) 100%)',
                border: '1px solid rgba(247,37,133,0.25)',
                color: '#f72585',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              <Sparkles size={14} />
              <span>Step {currentStep} of {maxSteps}</span>
            </div>
          )}

          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
              border: `1px solid ${borderColor}`,
              color: colorTextPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------------------- */}
      {/* 2. MAIN SPLIT CONTAINER (45% LEFT 3D ILLUSTRATION + 55% RIGHT CARD)  */}
      {/* -------------------------------------------------------------------- */}
      <main
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '20px 36px 40px 36px',
          boxSizing: 'border-box',
          alignItems: 'center',
          gap: '40px',
          zIndex: 20,
          position: 'relative'
        }}
        className="auth-main-wrapper"
      >
        {/* ------------------------------------------------------------------ */}
        {/* LEFT COLUMN (45% WIDTH) - 3D FLOATING ANIMATED STUDIO MOCKUP       */}
        {/* ------------------------------------------------------------------ */}
        <div
          style={{
            width: '45%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '28px',
            position: 'relative',
            paddingBottom: '20px'
          }}
          className="auth-left-column"
        >
          {/* Subtle glowing ambient light behind headline */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              left: '-20px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'rgba(247, 37, 133, 0.15)',
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }}
          />

          {/* Headline & Subtitle */}
          <div>
            <h1
              className="auth-hero-headline"
              style={{
                fontSize: '52px',
                fontWeight: 800,
                lineHeight: '1.1',
                letterSpacing: '-2px',
                color: colorTextPrimary,
                margin: 0,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="headline-line-1">
                <span>Crafting</span>
                <span style={{ color: '#f72585' }}>Style.</span>
              </div>
              <div className="headline-line-2">
                <span style={{ color: '#7209b7' }}>Precision.</span>
                <span>Perfection.</span>
              </div>
            </h1>
            <div
              className="auth-hero-divider"
              style={{
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #f72585 0%, #7209b7 100%)',
                borderRadius: '2px',
                marginTop: '16px',
                marginBottom: '16px'
              }}
            />
            <p
              style={{
                fontSize: '15px',
                color: colorTextSecondary,
                lineHeight: '1.5',
                maxWidth: '440px',
                margin: 0,
                fontWeight: 400
              }}
            >
              Manage custom orders, doorstep measurement requests, atelier stitching workflows & earnings in one place.
            </p>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* 10-SECOND SEAMLESS HERO IMAGE SLIDESHOW (NO BOX, NO CORNER RADIUS) */}
          {/* ------------------------------------------------------------------ */}
          <div
            className="auth-hero-image-card"
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              borderRadius: '0px',
              border: 'none',
              boxShadow: 'none',
              background: 'transparent',
              overflow: 'hidden'
            }}
          >
            {/* TAILOR IMAGE (C:\Users\axxonet\Downloads\Tailor.png) */}
            <img
              src="/tailor_stitching_hero.png"
              alt="StitchBee Master Tailor"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '0px',
                opacity: previewMode === 'tailor' ? 1 : 0,
                transform: previewMode === 'tailor' ? 'scale(1)' : 'scale(1.02)',
                transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
                zIndex: 1,
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
              }}
            />

            {/* DESIGNER IMAGE (C:\Users\axxonet\Downloads\Designer.png) */}
            <img
              src="/designer_sketching_hero.png"
              alt="StitchBee Fashion Designer"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '0px',
                opacity: previewMode === 'designer' ? 1 : 0,
                transform: previewMode === 'designer' ? 'scale(1)' : 'scale(1.02)',
                transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
                zIndex: 1,
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>

          {/* 3 Premium Glass Feature Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px'
            }}
            className="auth-features-grid"
          >
            <div
              style={{
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${borderColor}`,
                borderRadius: '16px',
                padding: '14px 10px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ fontSize: '18px' }}>🔒</div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colorTextPrimary }}>Secure Access</span>
              <span style={{ fontSize: '10px', color: colorTextMuted, lineHeight: '1.3' }}>Encrypted partner data & payouts.</span>
            </div>

            <div
              style={{
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${borderColor}`,
                borderRadius: '16px',
                padding: '14px 10px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ fontSize: '18px' }}>⚡</div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colorTextPrimary }}>Lightning Fast</span>
              <span style={{ fontSize: '10px', color: colorTextMuted, lineHeight: '1.3' }}>Instant order assignments.</span>
            </div>

            <div
              style={{
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${borderColor}`,
                borderRadius: '16px',
                padding: '14px 10px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ fontSize: '18px' }}>🧵</div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colorTextPrimary }}>Verified Atelier</span>
              <span style={{ fontSize: '10px', color: colorTextMuted, lineHeight: '1.3' }}>5,000+ top tailors network.</span>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* RIGHT COLUMN (55% WIDTH) - FLOATING GLASS FORM CARD                */}
        {/* ------------------------------------------------------------------ */}
        <div
          style={{
            width: '55%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
          className="auth-right-column"
        >
          {/* Glow blob behind form card */}
          <div
            className="animate-glow"
            style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(106, 0, 244, 0.12) 0%, transparent 70%)',
              top: '10%',
              right: '10%',
              pointerEvents: 'none'
            }}
          />

          {/* FLOATING GLASS FORM CARD */}
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              background: bgCard,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`,
              borderTop: '4px solid #f72585',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: isDark ? '0 30px 60px rgba(0, 0, 0, 0.4)' : '0 20px 40px rgba(106, 0, 244, 0.05)',
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 30
            }}
          >
            {/* STEP PROGRESS BAR (If signup mode & step > 1) */}
            {tab === 'signup' && currentStep > 1 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#f72585', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    PARTNER ONBOARDING
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: colorTextSecondary }}>
                    Step {currentStep} of {maxSteps} ({Math.round((currentStep / maxSteps) * 100)}%)
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: isDark ? 'rgba(255,255,255,0.06)' : '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${(currentStep / maxSteps) * 100}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #f72585 0%, #7209b7 100%)', 
                      borderRadius: '3px', 
                      transition: 'width 0.4s ease' 
                    }} 
                  />
                </div>
              </div>
            )}

            {/* ERROR ALERT */}
            {errorMsg && (
              <div
                style={{
                  background: 'rgba(247, 37, 133, 0.08)',
                  color: '#f72585',
                  border: '1px solid rgba(247, 37, 133, 0.15)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  marginBottom: '20px'
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* STEP 1: MOBILE OTP AUTHENTICATION */}
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {!otpSent ? (
                  <>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#f72585', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {tab === 'login' ? 'PARTNER LOGIN' : 'BECOME A PARTNER'}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: colorTextPrimary, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                        {tab === 'login' ? 'Enter Phone Number' : 'Create Partner Account'}
                      </h3>
                      <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, marginTop: '6px', lineHeight: 1.5 }}>
                        We will send a 6-digit OTP to verify your number
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Phone Number</label>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <span 
                              onClick={() => setMobileNumber('9876543210')}
                              style={{ fontSize: '11px', color: '#f72585', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              Tailor (9876543210)
                            </span>
                            <span 
                              onClick={() => setMobileNumber('9876543211')}
                              style={{ fontSize: '11px', color: '#8B12C9', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              Designer (9876543211)
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: inputBg }}>
                          <Phone size={16} style={{ color: colorTextMuted, marginRight: '10px' }} />
                          <span style={{ fontSize: '14px', color: colorTextSecondary, marginRight: '6px', fontWeight: 500 }}>+91</span>
                          <input 
                            type="tel" 
                            placeholder="Enter 10-digit number"
                            value={mobileNumber} 
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val.length <= 10) setMobileNumber(val);
                            }} 
                            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: 500, fontFamily: 'inherit' }} 
                          />
                        </div>
                      </div>

                      {tab === 'signup' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '12px', color: colorTextSecondary, lineHeight: 1.4, fontWeight: 400 }}>
                            <input 
                              type="checkbox" 
                              checked={agreeTerms}
                              onChange={(e) => setAgreeTerms(e.target.checked)}
                              style={{ accentColor: '#f72585', marginTop: '2px', cursor: 'pointer' }}
                            />
                            <span>I agree to the <span style={{ color: '#f72585', fontWeight: 600 }} onClick={(e) => { e.stopPropagation(); alert('Terms of Service Agreement'); }}>Terms & Conditions</span> for StitchBee partners.</span>
                          </label>

                          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '12px', color: colorTextSecondary, lineHeight: 1.4, fontWeight: 400 }}>
                            <input 
                              type="checkbox" 
                              checked={agreePrivacy}
                              onChange={(e) => setAgreePrivacy(e.target.checked)}
                              style={{ accentColor: '#f72585', marginTop: '2px', cursor: 'pointer' }}
                            />
                            <span>I accept the <span style={{ color: '#f72585', fontWeight: 600 }} onClick={(e) => { e.stopPropagation(); alert('Privacy Policy Guidelines'); }}>Privacy Policy</span> on partner verification.</span>
                          </label>
                        </div>
                      )}

                      <button
                        onClick={handleSendOtp}
                        className="btn-primary"
                        style={{
                          width: '100%',
                          height: '52px',
                          background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '14px',
                          fontWeight: 600,
                          fontSize: '14px',
                          letterSpacing: '0.01em',
                          cursor: 'pointer',
                          marginTop: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <span style={{ color: '#ffffff' }}>Send OTP Verification</span>
                        <ArrowRight size={18} style={{ color: '#ffffff' }} />
                      </button>

                      <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <span style={{ fontSize: '13px', color: colorTextSecondary, fontWeight: 400 }}>
                          {tab === 'login' ? "New to StitchBee? " : "Already registered as a partner? "}
                          <button
                            type="button"
                            onClick={() => {
                              setTab(tab === 'login' ? 'signup' : 'login');
                              setErrorMsg('');
                            }}
                            style={{ background: 'transparent', border: 'none', padding: 0, color: '#f72585', fontWeight: 600, cursor: 'pointer', fontSize: '13px', textDecoration: 'underline', marginLeft: '4px', outline: 'none', fontFamily: 'inherit' }}
                          >
                            {tab === 'login' ? 'Register' : 'Login'}
                          </button>
                        </span>
                      </div>

                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#7209b7', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        OTP SENT
                      </span>
                      <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: colorTextPrimary, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                        Verify Mobile OTP
                      </h3>
                      <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, marginTop: '6px', lineHeight: 1.5 }}>
                        Enter the 6-digit verification code sent to <br />
                        <strong style={{ color: colorTextPrimary, fontWeight: 600 }}>+91 {mobileNumber}</strong>
                      </p>
                    </div>

                    {/* 6-DIGIT OTP TEXT BOXES */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '8px 0' }}>
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (otpRefs.current[idx] = el)}
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          maxLength={1}
                          disabled={otpTimer === 0}
                          value={otpCode[idx] || ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            const newDigits = [...otpCode];
                            newDigits[idx] = val;
                            setOtpCode(newDigits);
                            
                            if (val && idx < 5) {
                              otpRefs.current[idx + 1]?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !otpCode[idx] && idx > 0) {
                              const newDigits = [...otpCode];
                              newDigits[idx - 1] = '';
                              setOtpCode(newDigits);
                              otpRefs.current[idx - 1]?.focus();
                            }
                          }}
                          style={{
                            width: '44px',
                            height: '50px',
                            borderRadius: '12px',
                            border: `1.5px solid ${otpTimer === 0 ? borderColor : otpCode[idx] ? '#f72585' : borderColor}`,
                            background: isDark ? 'rgba(255,255,255,0.02)' : '#F8FAFC',
                            color: colorTextPrimary,
                            fontSize: '18px',
                            fontWeight: 600,
                            textAlign: 'center',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            fontFamily: 'inherit',
                            boxShadow: otpCode[idx] ? '0 0 0 3px rgba(247, 37, 133, 0.1)' : 'none'
                          }}
                        />
                      ))}
                    </div>

                    {/* Countdown timer */}
                    <div style={{ textAlign: 'center', margin: '2px 0' }}>
                      {otpTimer > 0 ? (
                        <span style={{ fontSize: '13px', color: colorTextSecondary, display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 400 }}>
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                          OTP expires in <strong style={{ color: colorTextPrimary, fontFamily: 'monospace', fontSize: '14px', fontWeight: 600 }}>{Math.floor(otpTimer / 60)}:{(otpTimer % 60) < 10 ? '0' : ''}{otpTimer % 60}</strong>
                        </span>
                      ) : (
                        <span style={{ fontSize: '13px', color: '#f72585', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#f72585' }} />
                          OTP expired. Please click resend below.
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: colorTextSecondary, marginTop: '2px' }}>
                      <span 
                        style={{ cursor: 'pointer', color: '#f72585', fontWeight: 600 }} 
                        onClick={() => setOtpSent(false)}
                      >
                        Change Number
                      </span>
                      <span 
                        style={{ cursor: 'pointer', color: '#7209b7', fontWeight: 600, opacity: otpTimer > 0 ? 0.6 : 1 }} 
                        onClick={() => {
                          setOtpCode(['', '', '', '', '', '']);
                          setOtpTimer(300);
                          setTimerActive(true);
                          setErrorMsg('');
                          alert('A new 6-digit OTP code has been resent to +91 ' + mobileNumber);
                          setTimeout(() => {
                            if (otpRefs.current[0]) otpRefs.current[0].focus();
                          }, 100);
                        }}
                      >
                        Resend OTP code
                      </span>
                    </div>

                    <button
                      disabled={otpTimer === 0}
                      onClick={handleVerifyOtp}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        height: '52px',
                        background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '14px',
                        fontWeight: 600,
                        fontSize: '14px',
                        letterSpacing: '0.01em',
                        cursor: 'pointer',
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <span style={{ color: '#ffffff' }}>Verify OTP Code</span>
                      <ArrowRight size={18} style={{ color: '#ffffff' }} />
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '6px' }}>
                      <span style={{ fontSize: '13px', color: colorTextSecondary, fontWeight: 400 }}>
                        {tab === 'login' ? "New to StitchBee? " : "Already registered as a partner? "}
                        <button
                          type="button"
                          onClick={() => {
                            setTab(tab === 'login' ? 'signup' : 'login');
                            setOtpSent(false);
                            setErrorMsg('');
                          }}
                          style={{ background: 'transparent', border: 'none', padding: 0, color: '#f72585', fontWeight: 600, cursor: 'pointer', fontSize: '13px', textDecoration: 'underline', marginLeft: '4px', outline: 'none', fontFamily: 'inherit' }}
                        >
                          {tab === 'login' ? 'Register' : 'Login'}
                        </button>
                      </span>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* STEP 2: BASIC PROFILE */}
            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    Basic Profile Details
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Enter your name and personal details for your partner badge.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em', lineHeight: 1.4 }}>First Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 14px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1.5px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em', lineHeight: 1.4 }}>Last Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Kumar"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 14px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1.5px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em', lineHeight: 1.4 }}>Gender</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                    {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          border: `1.5px solid ${gender === g ? '#f72585' : inputBorder}`,
                          background: gender === g ? 'rgba(247,37,133,0.08)' : inputBg,
                          color: gender === g ? '#f72585' : colorTextPrimary,
                          fontWeight: 500,
                          fontSize: '13px',
                          cursor: 'pointer',
                          fontFamily: 'inherit'
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em', lineHeight: 1.4 }}>Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 14px',
                      borderRadius: '12px',
                      background: inputBg,
                      border: `1.5px solid ${inputBorder}`,
                      color: colorTextPrimary,
                      fontSize: '14px',
                      fontWeight: 500,
                      fontFamily: 'inherit',
                      outline: 'none',
                      marginTop: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em', lineHeight: 1.4, display: 'block', marginBottom: '6px' }}>Profile Photo</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    {/* Avatar Preview */}
                    <div
                      style={{
                        position: 'relative',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '1.3rem',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(247, 37, 133, 0.25)',
                        border: '2.5px solid #ffffff',
                        flexShrink: 0
                      }}
                    >
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Profile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : firstName ? (
                        firstName.charAt(0).toUpperCase()
                      ) : (
                        <User size={26} />
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      {/* LIVE CAMERA CAPTURE BUTTON */}
                      <button
                        type="button"
                        onClick={startCamera}
                        style={{
                          padding: '9px 14px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                          color: '#ffffff',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(247, 37, 133, 0.2)',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Camera size={15} style={{ color: '#ffffff' }} />
                        <span style={{ color: '#ffffff' }}>Take Photo</span>
                      </button>

                      {/* UPLOAD FROM DEVICE BUTTON */}
                      <label
                        style={{
                          padding: '9px 14px',
                          borderRadius: '12px',
                          background: inputBg,
                          border: `1.5px solid ${inputBorder}`,
                          color: colorTextPrimary,
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Upload size={15} style={{ color: '#7209b7' }} />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleFileUpload}
                        />
                      </label>

                      {/* REMOVE PHOTO BUTTON */}
                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={() => setAvatarUrl('')}
                          style={{
                            padding: '9px 12px',
                            borderRadius: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontFamily: 'inherit'
                          }}
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CHOOSE YOUR ROLE */}
            {currentStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    What do you offer on StitchBee?
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Choose your partner role. You can select both!
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div
                    onClick={() => setIsTailorSelected(!isTailorSelected)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: `2px solid ${isTailorSelected ? '#f72585' : inputBorder}`,
                      background: isTailorSelected ? 'rgba(247,37,133,0.08)' : inputBg,
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #f72585 0%, #f43f5e 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}
                      >
                        <Scissors size={22} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: 600, color: colorTextPrimary, margin: 0 }}>
                          Tailoring & Stitching
                        </h4>
                        <p style={{ fontSize: '12px', fontWeight: 400, color: colorTextSecondary, margin: '2px 0 0 0' }}>
                          Custom stitching, alterations, bags & seat covers.
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: `2px solid ${isTailorSelected ? '#f72585' : inputBorder}`,
                        background: isTailorSelected ? '#f72585' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}
                    >
                      {isTailorSelected && <Check size={14} />}
                    </div>
                  </div>

                  <div
                    onClick={() => setIsDesignerSelected(!isDesignerSelected)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      border: `2px solid ${isDesignerSelected ? '#7209b7' : inputBorder}`,
                      background: isDesignerSelected ? 'rgba(114,9,183,0.08)' : inputBg,
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #7209b7 0%, #a855f7 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}
                      >
                        <Palette size={22} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: 600, color: colorTextPrimary, margin: 0 }}>
                          Fashion Designing
                        </h4>
                        <p style={{ fontSize: '12px', fontWeight: 400, color: colorTextSecondary, margin: '2px 0 0 0' }}>
                          Fashion sketching, bridal wear & styling.
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: `2px solid ${isDesignerSelected ? '#7209b7' : inputBorder}`,
                        background: isDesignerSelected ? '#7209b7' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}
                    >
                      {isDesignerSelected && <Check size={14} />}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(247,37,133,0.06)',
                    border: `1px solid ${inputBorder}`,
                    fontSize: '12px',
                    fontWeight: 400,
                    color: colorTextSecondary,
                    textAlign: 'center'
                  }}
                >
                  Selected Flow: {' '}
                  <strong style={{ color: '#f72585', fontWeight: 600 }}>
                    {isBoth ? 'Tailor + Designer Setup' : isDesignerOnly ? 'Designer Setup' : 'Tailor Setup'}
                  </strong>
                </div>
              </div>
            )}

            {/* STEP 4: BUSINESS / DESIGNER PROFILE */}
            {currentStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    {isDesignerOnly ? 'Designer Studio Profile' : 'Tailor Business Profile'}
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Enter your shop name, experience and workshop details.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>
                    {isDesignerOnly ? 'Studio / Brand Name *' : 'Tailor / Business Name *'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Fit Stitching & Boutique"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 14px',
                      borderRadius: '12px',
                      background: inputBg,
                      border: `1.5px solid ${inputBorder}`,
                      color: colorTextPrimary,
                      fontSize: '14px',
                      fontWeight: 500,
                      fontFamily: 'inherit',
                      outline: 'none',
                      marginTop: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Experience (Years)</label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 14px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1.5px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Team Size</label>
                    <select
                      value={workerCount}
                      onChange={(e) => setWorkerCount(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 14px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1.5px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
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
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>About your work</label>
                  <textarea
                    rows={2}
                    placeholder="Describe your stitching quality, specialization..."
                    value={aboutWork}
                    onChange={(e) => setAboutWork(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: inputBg,
                      border: `1.5px solid ${inputBorder}`,
                      color: colorTextPrimary,
                      fontSize: '14px',
                      fontWeight: 500,
                      outline: 'none',
                      marginTop: '4px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Shop / Studio Photo</label>
                  <div
                    style={{
                      marginTop: '4px',
                      border: `2px dashed ${inputBorder}`,
                      borderRadius: '14px',
                      padding: '18px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: inputBg
                    }}
                  >
                    <Upload size={22} style={{ color: '#f72585', marginBottom: '4px' }} />
                    <div style={{ fontSize: '13px', fontWeight: 500, color: colorTextPrimary }}>Click to upload shop photo</div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: WHAT DO YOU STITCH? / SPECIALIZATIONS */}
            {currentStep === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    {isDesignerOnly ? 'Design Specializations' : 'What Do You Stitch?'}
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Multiple selections allowed. Select all that apply to your workshop.
                  </p>
                </div>

                {!isDesignerOnly ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
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
                            padding: '12px 14px',
                            borderRadius: '14px',
                            border: `1.5px solid ${active ? '#f72585' : inputBorder}`,
                            background: active ? 'rgba(247,37,133,0.08)' : inputBg,
                            color: active ? '#f72585' : colorTextPrimary,
                            fontWeight: 500,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>{item.title}</span>
                          {active && <Check size={16} />}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
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
                            padding: '12px 14px',
                            borderRadius: '14px',
                            border: `1.5px solid ${active ? '#7209b7' : inputBorder}`,
                            background: active ? 'rgba(114,9,183,0.08)' : inputBg,
                            color: active ? '#7209b7' : colorTextPrimary,
                            fontWeight: 500,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>{spec}</span>
                          {active && <Check size={16} />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* STEP 6: SERVICE DETAILS & CATEGORIES */}
            {currentStep === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    {isDesignerOnly ? 'Design Categories' : 'Service Details & Sub-Categories'}
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Select specific items your workshop or boutique offers.
                  </p>
                </div>

                {!isDesignerOnly ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto' }}>
                    {[
                      { cat: 'Clothing', items: ['Shirts', 'Pants', 'Blazers', 'Suits', 'Bridal', 'Dresses', 'Blouses', 'Alterations'] },
                      { cat: 'Bags', items: ['Tote', 'Handbags', 'Laptop bags', 'Travel bags', 'Custom bags'] },
                      { cat: 'Vehicle & Home', items: ['Car seat covers', 'Bike seat covers', 'Sofa covers', 'Curtains'] },
                      { cat: 'Pets & Footwear', items: ['Dog clothing', 'Cat clothing', 'Shoes', 'Slippers'] }
                    ].map((grp) => (
                      <div key={grp.cat} style={{ background: inputBg, padding: '12px', borderRadius: '14px', border: `1px solid ${inputBorder}` }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#f72585', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{grp.cat}</div>
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
                                  padding: '6px 12px',
                                  borderRadius: '16px',
                                  border: `1px solid ${active ? '#f72585' : inputBorder}`,
                                  background: active ? '#f72585' : 'transparent',
                                  color: active ? '#ffffff' : colorTextPrimary,
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  fontFamily: 'inherit'
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
                            padding: '10px 16px',
                            borderRadius: '20px',
                            border: `1.5px solid ${active ? '#7209b7' : inputBorder}`,
                            background: active ? '#7209b7' : inputBg,
                            color: active ? '#ffffff' : colorTextPrimary,
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            fontFamily: 'inherit'
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

            {/* STEP 7: LOCATION & WORKSHOP MAP */}
            {currentStep === 7 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    Workshop Location & Radius
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Help local customers locate your shop or request doorstep pickups.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Workplace Type</label>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    {['Shop', 'Home', 'Both Shop & Home'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setPlaceType(t)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '10px',
                          border: `1.5px solid ${placeType === t ? '#f72585' : inputBorder}`,
                          background: placeType === t ? 'rgba(247,37,133,0.08)' : inputBg,
                          color: placeType === t ? '#f72585' : colorTextPrimary,
                          fontWeight: 500,
                          fontSize: '13px',
                          cursor: 'pointer',
                          fontFamily: 'inherit'
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Address *</label>
                    <input
                      type="text"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 12px',
                        borderRadius: '10px',
                        background: inputBg,
                        border: `1.5px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Area / Landmark</label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      style={{
                        width: '100%',
                        height: '42px',
                        padding: '0 12px',
                        borderRadius: '10px',
                        background: inputBg,
                        border: `1.5px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 10px',
                        borderRadius: '8px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setStateName(e.target.value)}
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 10px',
                        borderRadius: '8px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 10px',
                        borderRadius: '8px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: colorTextPrimary }}>
                    <span>Doorstep Service Radius</span>
                    <span style={{ color: '#f72585' }}>{serviceRadius} km</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={serviceRadius}
                    onChange={(e) => setServiceRadius(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '4px', accentColor: '#f72585' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 8: PRICING & RATES */}
            {currentStep === 8 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    Stitching Rates & Pricing Model
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Define starting prices for your custom services.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Pricing Model</label>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    {['Starting price', 'Fixed price', 'Custom quote'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setPricingModel(m)}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '10px',
                          border: `1.5px solid ${pricingModel === m ? '#f72585' : inputBorder}`,
                          background: pricingModel === m ? 'rgba(247,37,133,0.08)' : inputBg,
                          color: pricingModel === m ? '#f72585' : colorTextPrimary,
                          fontWeight: 500,
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontFamily: 'inherit'
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {Object.keys(tailorPrices).map((item) => (
                    <div key={item} style={{ background: inputBg, padding: '10px 12px', borderRadius: '12px', border: `1px solid ${inputBorder}` }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: colorTextMuted }}>{item}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <span style={{ fontWeight: 600, color: '#f72585', fontSize: '14px' }}>₹</span>
                        <input
                          type="number"
                          value={tailorPrices[item]}
                          onChange={(e) => setTailorPrices({ ...tailorPrices, [item]: e.target.value })}
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            color: colorTextPrimary,
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: 'inherit',
                            outline: 'none'
                          }}
                        />
                        <span style={{ fontSize: '12px', color: colorTextMuted }}>+</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 9: PORTFOLIO & WORK UPLOADS */}
            {currentStep === 9 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    Work Portfolio Uploads
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Showcase your finished garments, suits, or custom work photos to attract clients.
                  </p>
                </div>

                {/* INTERACTIVE MULTIPLE FILE UPLOAD DROPZONE */}
                <label
                  style={{
                    border: '2px dashed #f72585',
                    borderRadius: '18px',
                    padding: '24px 20px',
                    textAlign: 'center',
                    background: isDark ? 'rgba(247, 37, 133, 0.04)' : 'rgba(247, 37, 133, 0.03)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(247, 37, 133, 0.05)'
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleMultiplePortfolioUploads}
                  />

                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: '0 8px 18px rgba(247, 37, 133, 0.3)'
                    }}
                  >
                    <Upload size={24} style={{ color: '#ffffff' }} />
                  </div>

                  <div>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: colorTextPrimary, display: 'block' }}>
                      Upload Stitching Photos
                    </span>
                    <span style={{ fontSize: '12px', color: colorTextSecondary, marginTop: '4px', display: 'block', fontWeight: 400 }}>
                      Click to select <strong style={{ color: '#f72585' }}>multiple photos</strong> from your device (JPEG, PNG, WEBP)
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', background: 'rgba(114, 9, 183, 0.12)', color: '#7209b7', fontWeight: 600 }}>
                      📁 Select Multiple Files
                    </span>
                    <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', background: 'rgba(247, 37, 133, 0.12)', color: '#f72585', fontWeight: 600 }}>
                      ⚡ Max 15MB each
                    </span>
                  </div>
                </label>

                {/* CAMERA TAKE PHOTO BUTTON */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={startCamera}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      background: inputBg,
                      border: `1.5px solid ${inputBorder}`,
                      color: colorTextPrimary,
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'inherit'
                    }}
                  >
                    <Camera size={15} style={{ color: '#f72585' }} />
                    <span>Or Snap Photo using Camera</span>
                  </button>

                  <span style={{ fontSize: '12px', fontWeight: 700, color: colorTextPrimary }}>
                    Uploaded Samples ({portfolioPhotos.length})
                  </span>
                </div>

                {/* UPLOADED SAMPLES THUMBNAIL GRID */}
                {portfolioPhotos.length === 0 ? (
                  <div
                    style={{
                      padding: '20px',
                      textAlign: 'center',
                      borderRadius: '12px',
                      background: inputBg,
                      border: `1px solid ${inputBorder}`,
                      color: colorTextMuted,
                      fontSize: '12px'
                    }}
                  >
                    No stitching photos uploaded yet. Select photos above!
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                    {portfolioPhotos.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '12px',
                          background: inputBg,
                          border: `1px solid ${inputBorder}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                          {/* Image Preview Thumbnail */}
                          {p.url && (p.url.startsWith('data:') || p.url.startsWith('http') || p.url.startsWith('/')) ? (
                            <img
                              src={p.url}
                              alt={p.name}
                              style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                objectFit: 'cover',
                                flexShrink: 0,
                                border: '1px solid rgba(255,255,255,0.2)'
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                flexShrink: 0
                              }}
                            >
                              <ImageIcon size={20} style={{ color: '#ffffff' }} />
                            </div>
                          )}

                          <div style={{ minWidth: 0, overflow: 'hidden' }}>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {p.name}
                            </div>
                            <div style={{ fontSize: '10px', color: '#f72585', fontWeight: 600 }}>
                              {p.size || p.category}
                            </div>
                          </div>
                        </div>

                        {/* Remove Photo Button */}
                        <button
                          type="button"
                          onClick={() => removePortfolioPhoto(p.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: colorTextMuted,
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                          title="Remove photo"
                        >
                          <Trash2 size={15} style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 10: IDENTITY VERIFICATION */}
            {currentStep === 10 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    Identity Verification
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Government identity document check for Verified Partner badge.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Legal Name (Govt ID) *</label>
                  <input
                    type="text"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 12px',
                      borderRadius: '10px',
                      background: inputBg,
                      border: `1.5px solid ${inputBorder}`,
                      color: colorTextPrimary,
                      fontSize: '14px',
                      fontWeight: 500,
                      fontFamily: 'inherit',
                      outline: 'none',
                      marginTop: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>ID Type</label>
                    <select
                      value={idType}
                      onChange={(e) => setIdType(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 12px',
                        borderRadius: '10px',
                        background: inputBg,
                        border: `1.5px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
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
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Document ID Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 1234 5678 9012"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 12px',
                        borderRadius: '10px',
                        background: inputBg,
                        border: `1.5px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Upload Document Photo</label>
                  <div
                    style={{
                      marginTop: '4px',
                      border: `2px dashed ${inputBorder}`,
                      borderRadius: '14px',
                      padding: '16px',
                      textAlign: 'center',
                      background: inputBg,
                      cursor: 'pointer'
                    }}
                  >
                    <Shield size={24} style={{ color: '#10b981', marginBottom: '2px' }} />
                    <div style={{ fontSize: '13px', fontWeight: 500, color: colorTextPrimary }}>
                      Front & Back Govt ID Photo
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 11: BANK / UPI PAYMENT DETAILS */}
            {currentStep === 11 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    Payout Bank / UPI Details
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Receive customer payments directly into your account.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setPaymentMode('upi')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '12px',
                      border: `1.5px solid ${paymentMode === 'upi' ? '#f72585' : inputBorder}`,
                      background: paymentMode === 'upi' ? 'rgba(247,37,133,0.08)' : inputBg,
                      color: paymentMode === 'upi' ? '#f72585' : colorTextPrimary,
                      fontWeight: 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    Instant UPI ID
                  </button>
                  <button
                    onClick={() => setPaymentMode('bank')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '12px',
                      border: `1.5px solid ${paymentMode === 'bank' ? '#7209b7' : inputBorder}`,
                      background: paymentMode === 'bank' ? 'rgba(114,9,183,0.08)' : inputBg,
                      color: paymentMode === 'bank' ? '#7209b7' : colorTextPrimary,
                      fontWeight: 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    Bank Account
                  </button>
                </div>

                {paymentMode === 'upi' ? (
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>UPI ID *</label>
                    <input
                      type="text"
                      placeholder="e.g. stitchbee.partner@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 12px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1.5px solid ${inputBorder}`,
                        color: colorTextPrimary,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        outline: 'none',
                        marginTop: '4px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Account Holder</label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        style={{
                          width: '100%',
                          height: '44px',
                          padding: '0 12px',
                          borderRadius: '10px',
                          background: inputBg,
                          border: `1.5px solid ${inputBorder}`,
                          color: colorTextPrimary,
                          fontSize: '14px',
                          fontWeight: 500,
                          fontFamily: 'inherit',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>Account No</label>
                        <input
                          type="text"
                          value={bankAccount}
                          onChange={(e) => setBankAccount(e.target.value)}
                          style={{
                            width: '100%',
                            height: '40px',
                            padding: '0 10px',
                            borderRadius: '8px',
                            background: inputBg,
                            border: `1px solid ${inputBorder}`,
                            color: colorTextPrimary,
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: 'inherit',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: colorTextPrimary, letterSpacing: '0.01em' }}>IFSC Code</label>
                        <input
                          type="text"
                          value={ifscCode}
                          onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                          style={{
                            width: '100%',
                            height: '40px',
                            padding: '0 10px',
                            borderRadius: '8px',
                            background: inputBg,
                            border: `1px solid ${inputBorder}`,
                            color: colorTextPrimary,
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: 'inherit',
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

            {/* STEP 12: REVIEW SUMMARY BEFORE SUBMISSION */}
            {currentStep === 12 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    Review Partner Profile
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Double check your details before submitting for partner verification.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
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
                        padding: '10px 12px',
                        borderRadius: '12px',
                        background: inputBg,
                        border: `1px solid ${inputBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: colorTextMuted }}>{item.label}</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: colorTextPrimary }}>{item.val}</div>
                      </div>
                      <span style={{ color: '#10b981', fontWeight: 700, fontSize: '14px' }}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 13: APPROVAL PENDING STATUS SCREEN */}
            {currentStep === 13 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'center', padding: '10px 0' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
                  }}
                >
                  <CheckCircle size={44} />
                </div>

                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: colorTextPrimary, margin: '0 0 4px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    🎉 Profile Submitted!
                  </h2>
                  <p style={{ fontSize: '13px', fontWeight: 400, color: colorTextSecondary, margin: 0, lineHeight: 1.5 }}>
                    Your StitchBee Partner profile is under verification.
                  </p>
                </div>

                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '16px',
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    color: '#f59e0b',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>🟡 Verification Pending — We'll notify you upon approval.</span>
                </div>

                <div style={{ fontSize: '12px', fontWeight: 400, color: colorTextSecondary, lineHeight: 1.5 }}>
                  Estimated review time: 24-48 hours. You can already explore your partner dashboard preview.
                </div>

                <button
                  onClick={handleCompleteOnboarding}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '0.01em',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <span style={{ color: '#ffffff' }}>Go to Partner Dashboard Preview</span>
                </button>
              </div>
            )}

            {/* ACTION BUTTONS (BACK / CONTINUE) for steps > 1 */}
            {tab === 'signup' && currentStep > 1 && currentStep < 13 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '22px' }}>
                <button
                  onClick={handlePrevStep}
                  style={{
                    flex: 1,
                    height: '52px',
                    borderRadius: '14px',
                    background: inputBg,
                    border: `1.5px solid ${inputBorder}`,
                    color: colorTextPrimary,
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '0.01em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontFamily: 'inherit'
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleNextStep}
                  className="btn-primary"
                  style={{
                    flex: 2,
                    height: '52px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '0.01em',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 20px rgba(247,37,133,0.3)'
                  }}
                >
                  <span style={{ color: '#ffffff' }}>{currentStep === 12 ? 'Submit for Verification' : 'Continue'}</span>
                  <ChevronRight size={18} style={{ color: '#ffffff' }} />
                </button>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* -------------------------------------------------------------------- */}
      {/* 3. BOTTOM FOOTER FEATURE CARDS                                       */}
      {/* -------------------------------------------------------------------- */}
      <footer
        style={{
          padding: '30px 40px',
          width: '100%',
          boxSizing: 'border-box',
          zIndex: 50,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          background: isDark ? 'rgba(11, 8, 30, 0.4)' : 'rgba(255, 253, 252, 0.4)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1100px',
            width: '100%'
          }}
          className="auth-trust-row"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'left',
              padding: '16px',
              borderRadius: '16px',
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${borderColor}`,
              boxShadow: '0 10px 25px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(29, 185, 84, 0.12)', color: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={20} />
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>🛡 Verified Partners</span>
              <span style={{ fontSize: '11px', color: colorTextMuted, display: 'block', marginTop: '2px', fontWeight: 400 }}>Verified tailors & designers network</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'left',
              padding: '16px',
              borderRadius: '16px',
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${borderColor}`,
              boxShadow: '0 10px 25px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(114, 9, 183, 0.12)', color: '#7209b7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Headphones size={20} />
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>🎧 24/7 Support</span>
              <span style={{ fontSize: '11px', color: colorTextMuted, display: 'block', marginTop: '2px', fontWeight: 400 }}>Direct partner helpline support</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'left',
              padding: '16px',
              borderRadius: '16px',
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${borderColor}`,
              boxShadow: '0 10px 25px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(247, 37, 133, 0.12)', color: '#f72585', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CreditCard size={20} />
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: colorTextPrimary, display: 'block', lineHeight: '1.2' }}>💳 Direct Payouts</span>
              <span style={{ fontSize: '11px', color: colorTextMuted, display: 'block', marginTop: '2px', fontWeight: 400 }}>Instant payouts to bank/UPI accounts</span>
            </div>
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------------- */}
      {/* LIVE CAMERA CAPTURE MODAL OVERLAY                                    */}
      {/* -------------------------------------------------------------------- */}
      {isCameraActive && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 8, 25, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '440px',
              background: isDark ? '#1a1633' : '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              boxSizing: 'border-box',
              border: '1.5px solid rgba(247, 37, 133, 0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px'
            }}
          >
            {/* Modal Header */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(247,37,133,0.15)', color: '#f72585', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Camera size={20} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: colorTextPrimary }}>Take Profile Photo</h4>
                  <span style={{ fontSize: '11px', color: colorTextSecondary, fontWeight: 500 }}>Center your face inside the viewfinder</span>
                </div>
              </div>
              <button
                onClick={stopCamera}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: colorTextMuted,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Viewfinder Container */}
            <div
              style={{
                position: 'relative',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #f72585',
                boxShadow: '0 0 35px rgba(247, 37, 133, 0.4)',
                background: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {cameraError ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#ef4444', fontSize: '13px', fontWeight: 500, lineHeight: 1.5 }}>
                  {cameraError}
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scaleX(-1)' // Mirror preview for natural camera feel
                  }}
                />
              )}
              
              {/* Hidden canvas for capturing snapshot */}
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
              <button
                onClick={stopCamera}
                style={{
                  flex: 1,
                  height: '46px',
                  borderRadius: '12px',
                  border: `1.5px solid ${borderColor}`,
                  background: inputBg,
                  color: colorTextPrimary,
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                Cancel
              </button>
              {!cameraError && (
                <button
                  onClick={capturePhoto}
                  style={{
                    flex: 2,
                    height: '46px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(247, 37, 133, 0.4)',
                    fontFamily: 'inherit'
                  }}
                >
                  <Camera size={18} style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Capture Photo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
