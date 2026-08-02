import React, { useState, useEffect, useRef } from 'react';
import { Scissors, User, Lock, Mail, MapPin, Sparkles, Check, Truck, Phone, Star, Eye, EyeOff, Sun, Moon, Headphones, ArrowRight, Shield, ShieldAlert, CreditCard } from 'lucide-react';

const INDIAN_LOCATIONS = {
  "Karnataka": ["Bengaluru", "Mysore", "Hubli-Dharwad", "Mangaluru", "Belagavi", "Davangere"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur"],
  "Delhi (NCR)": ["New Delhi", "Noida", "Gurugram", "Ghaziabad", "Faridabad"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol", "Durgapur"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly"]
};

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

  // Delivery Onboarding Flow States
  const [deliveryStep, setDeliveryStep] = useState(0); // 0: Enter Phone, 0.5: OTP Verify, 1: Welcome, 2: Personal, 3: Location, 4: Vehicle, 5: Documents, 6: Bank, 7: Selfie, 8: Review, 9: Verification, 10: Approved
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryOtp, setDeliveryOtp] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef([]);
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTermsDelivery, setAgreeTermsDelivery] = useState(false);
  const [simulatedDocProgress, setSimulatedDocProgress] = useState({});

  // Form details collected step-by-step
  const [onboardingData, setOnboardingData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    state: '',
    city: '',
    area: '',
    vehicleType: '',
    vehicleNumber: '',
    aadhaarNumber: '',
    aadhaarFile: null,
    panNumber: '',
    panFile: null,
    dlNumber: '',
    dlFile: null,
    rcNumber: '',
    rcFile: null,
    insuranceNumber: '',
    insuranceFile: null,
    bankHolder: '',
    bankAccount: '',
    bankIfsc: '',
    upiId: '',
    profilePhoto: null,
  });

  const [capturingSelfie, setCapturingSelfie] = useState(false);

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setSimulatedDocProgress(prev => ({ ...prev, [fieldName]: 'uploading' }));
      let prg = 0;
      const interval = setInterval(() => {
        prg += 25;
        if (prg >= 100) {
          clearInterval(interval);
          setSimulatedDocProgress(prev => ({ ...prev, [fieldName]: 'done' }));
          setOnboardingData(prev => ({ ...prev, [fieldName + 'File']: file.name }));
        }
      }, 250);
    }
  };

  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const startCamera = async () => {
    try {
      setOtpError('');
      setCapturingSelfie(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 300, height: 300, facingMode: 'user' }
      });
      setCameraStream(stream);
      setCameraActive(true);
      setCapturingSelfie(false);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 150);
    } catch (err) {
      console.error("Camera access error:", err);
      setCapturingSelfie(false);
      setOtpError("Unable to access camera. Please ensure camera permissions are granted.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      ctx.translate(300, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, 300, 300);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setOnboardingData(prev => ({ ...prev, profilePhoto: dataUrl }));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

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

  // 5-minute Countdown Timer Effect
  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  // Reset timer whenever step changes to 0.5 (OTP Verify)
  useEffect(() => {
    if (deliveryStep === 0.5) {
      setTimerSeconds(300);
      setTimerActive(true);
      setOtpDigits(['', '', '', '', '', '']);
      setDeliveryOtp('');
      setTimeout(() => {
        if (otpRefs.current[0]) otpRefs.current[0].focus();
      }, 100);
    } else {
      setTimerActive(false);
    }
  }, [deliveryStep]);

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

  const renderDeliveryWizard = () => {
    const renderProgressHeader = () => {
      if (deliveryStep < 1 || deliveryStep > 8) return null;
      const percent = Math.round(((deliveryStep - 1) / 7) * 100);
      return (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#f72585', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Onboarding Progress
            </span>
            <span style={{ fontSize: '11px', fontWeight: '700', color: colorTextSecondary }}>
              Step {deliveryStep} of 8 ({percent}%)
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', background: isDark ? 'rgba(255,255,255,0.06)' : '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #f72585 0%, #7209b7 100%)', borderRadius: '3px', transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          </div>
        </div>
      );
    };

    // Step 0: Enter Phone
    if (deliveryStep === 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#f72585', display: 'block', marginBottom: '6px' }}>
              {tab === 'login' ? 'RIDER LOGIN' : 'BECOME A PARTNER'}
            </span>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: colorTextPrimary }}>
              {tab === 'login' ? 'Enter Phone Number' : 'Create Rider Account'}
            </h3>
            <p style={{ fontSize: '13px', color: colorTextSecondary, marginTop: '6px' }}>
              We will send a 6-digit OTP to verify your number
            </p>
          </div>

          {otpError && (
            <div style={{ background: 'rgba(247, 37, 133, 0.08)', color: '#f72585', border: '1px solid rgba(247, 37, 133, 0.15)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600' }}>
              {otpError}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Phone Number</label>
              <span 
                onClick={() => setDeliveryPhone('9876543210')}
                style={{ fontSize: '11px', color: '#f72585', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Quick Fill Test Number
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF' }}>
              <Phone size={16} style={{ color: colorTextMuted, marginRight: '10px' }} />
              <span style={{ fontSize: '14px', color: colorTextSecondary, marginRight: '6px', fontWeight: '600' }}>+91</span>
              <input 
                type="tel" 
                placeholder="Enter 10-digit number"
                value={deliveryPhone} 
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ''); // no letters, only digits
                  if (val.length <= 10) setDeliveryPhone(val);
                }} 
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', color: colorTextPrimary, fontWeight: '600' }} 
              />
            </div>
          </div>

          {tab === 'signup' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '13px', color: colorTextSecondary, lineHeight: '1.4' }}>
                <input 
                  type="checkbox" 
                  checked={agreeTermsDelivery}
                  onChange={(e) => setAgreeTermsDelivery(e.target.checked)}
                  style={{ accentColor: '#f72585', marginTop: '3px', cursor: 'pointer' }}
                />
                <span>I agree to the <span style={{ color: '#f72585', fontWeight: '700' }} onClick={(e) => { e.stopPropagation(); alert('Terms of Service Agreement'); }}>Terms & Conditions</span> for delivery partners.</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '13px', color: colorTextSecondary, lineHeight: '1.4' }}>
                <input 
                  type="checkbox" 
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  style={{ accentColor: '#f72585', marginTop: '3px', cursor: 'pointer' }}
                />
                <span>I accept the <span style={{ color: '#f72585', fontWeight: '700' }} onClick={(e) => { e.stopPropagation(); alert('Privacy Policy Guidelines'); }}>Privacy Policy</span> on document storage.</span>
              </label>
            </div>
          )}

          <button
            onClick={() => {
              setOtpError('');
              if (deliveryPhone.length !== 10) {
                setOtpError('Please enter a valid 10-digit phone number.');
                return;
              }
              if (tab === 'signup' && (!agreeTermsDelivery || !agreePrivacy)) {
                setOtpError('You must agree to the Privacy Policy and Terms & Conditions to proceed.');
                return;
              }
              setOtpSent(true);
              setDeliveryStep(0.5);
            }}
            className="btn-primary"
            style={{ width: '100%', height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <span>Send OTP Verification</span>
            <ArrowRight size={18} />
          </button>

          {/* Switch tab option inside the card */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '14px', color: colorTextSecondary, fontWeight: '500' }}>
              {tab === 'login' ? "New to StitchBee Logistics? " : "Already registered as a partner? "}
              <button
                type="button"
                onClick={() => {
                  setTab(tab === 'login' ? 'signup' : 'login');
                  setDeliveryPhone('');
                  setDeliveryOtp('');
                  setOtpError('');
                }}
                style={{ background: 'transparent', border: 'none', padding: 0, color: '#f72585', fontWeight: '700', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline', marginLeft: '4px', outline: 'none' }}
              >
                {tab === 'login' ? 'Register' : 'Login'}
              </button>
            </span>
          </div>
        </div>
      );
    }

    // Step 0.5: OTP Verify
    if (deliveryStep === 0.5) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#7209b7', display: 'block', marginBottom: '6px' }}>
              OTP SENT
            </span>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: colorTextPrimary }}>
              Verify Mobile OTP
            </h3>
            <p style={{ fontSize: '13px', color: colorTextSecondary, marginTop: '6px', lineHeight: '1.4' }}>
              Enter the 6-digit verification code sent to <br />
              <strong style={{ color: colorTextPrimary }}>+91 {deliveryPhone}</strong>
            </p>
          </div>

          {otpError && (
            <div style={{ background: 'rgba(247, 37, 133, 0.08)', color: '#f72585', border: '1px solid rgba(247, 37, 133, 0.15)', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600' }}>
              {otpError}
            </div>
          )}

          {/* 6-Digit OTP Text Boxes */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '8px 0' }}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <input
                key={idx}
                ref={(el) => (otpRefs.current[idx] = el)}
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={1}
                disabled={timerSeconds === 0}
                value={otpDigits[idx]}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ''); // digits only
                  const newDigits = [...otpDigits];
                  newDigits[idx] = val;
                  setOtpDigits(newDigits);
                  setDeliveryOtp(newDigits.join(''));
                  
                  // Auto-advance focus to the next field
                  if (val && idx < 5) {
                    otpRefs.current[idx + 1].focus();
                  }
                }}
                onKeyDown={(e) => {
                  // Backspace regression logic
                  if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
                    const newDigits = [...otpDigits];
                    newDigits[idx - 1] = '';
                    setOtpDigits(newDigits);
                    setDeliveryOtp(newDigits.join(''));
                    otpRefs.current[idx - 1].focus();
                  }
                }}
                style={{
                  width: '44px',
                  height: '50px',
                  borderRadius: '12px',
                  border: `1.5px solid ${timerSeconds === 0 ? borderColor : otpDigits[idx] ? '#f72585' : borderColor}`,
                  background: isDark ? 'rgba(255,255,255,0.02)' : '#F8FAFC',
                  color: colorTextPrimary,
                  fontSize: '18px',
                  fontWeight: '700',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: otpDigits[idx] ? '0 0 0 3px rgba(247, 37, 133, 0.1)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Countdown timer */}
          <div style={{ textAlign: 'center', margin: '2px 0' }}>
            {timerSeconds > 0 ? (
              <span style={{ fontSize: '13px', color: colorTextSecondary, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                OTP expires in <strong style={{ color: colorTextPrimary, fontFamily: 'monospace', fontSize: '14px' }}>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60) < 10 ? '0' : ''}{timerSeconds % 60}</strong>
              </span>
            ) : (
              <span style={{ fontSize: '13px', color: '#f72585', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#f72585' }} />
                OTP expired. Please click resend below.
              </span>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: colorTextSecondary, marginTop: '2px' }}>
            <span style={{ cursor: 'pointer', color: '#f72585', fontWeight: '700' }} onClick={() => { setDeliveryStep(0); }}>
              Change Number
            </span>
            <span 
              style={{ cursor: 'pointer', color: '#7209b7', fontWeight: '700', opacity: timerSeconds > 0 ? 0.6 : 1 }} 
              onClick={() => {
                setOtpDigits(['', '', '', '', '', '']);
                setDeliveryOtp('');
                setTimerSeconds(300);
                setTimerActive(true);
                setOtpError('');
                alert('A new 6-digit OTP code has been resent to +91 ' + deliveryPhone);
                setTimeout(() => {
                  if (otpRefs.current[0]) otpRefs.current[0].focus();
                }, 100);
              }}
            >
              Resend OTP code
            </span>
          </div>

          <button
            disabled={timerSeconds === 0}
            onClick={() => {
              setOtpError('');
              if (deliveryOtp.length !== 6) {
                setOtpError('Please enter the complete 6-digit OTP verification code.');
                return;
              }
              
              if (tab === 'login') {
                if (deliveryPhone === '9876543210') {
                  const finalUserData = {
                    name: 'Kiran Kumar',
                    email: 'kiran@stitchbee.com',
                    role: 'delivery',
                    phone: '9876543210',
                    address: 'HSR Layout, Bengaluru, Karnataka',
                    onboardingCompleted: true
                  };
                  localStorage.setItem('stitchbee_user', JSON.stringify(finalUserData));
                  onLoginSuccess(finalUserData);
                  return;
                }

                const existingUser = localStorage.getItem('stitchbee_user');
                let userObj = null;
                if (existingUser) {
                  try {
                    const parsed = JSON.parse(existingUser);
                    if (parsed.phone === deliveryPhone && parsed.role === 'delivery') {
                      userObj = parsed;
                    }
                  } catch (e) {}
                }
                
                if (userObj && userObj.onboardingCompleted) {
                  onLoginSuccess(userObj);
                  return;
                }
              }
              
              setDeliveryStep(1);
            }}
            className="btn-primary"
            style={{ width: '100%', height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Verify & Proceed
          </button>
        </div>
      );
    }

    // Step 1: Welcome
    if (deliveryStep === 1) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {renderProgressHeader()}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '50px' }}>🎉</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colorTextPrimary }}>
                Welcome, {onboardingData.firstName || 'Kiran'}!
              </h3>
              <p style={{ fontSize: '15px', color: colorTextSecondary, marginTop: '12px', lineHeight: '1.6' }}>
                Let's complete your profile to start delivering orders and earning payouts.
              </p>
            </div>

            <div style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(106, 0, 244, 0.03)', border: `1px dashed ${borderColor}`, borderRadius: '16px', padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: colorTextPrimary }}>📄 Onboarding Checklist:</span>
              <span style={{ fontSize: '12px', color: colorTextSecondary }}>• Personal Details & Vehicle Information</span>
              <span style={{ fontSize: '12px', color: colorTextSecondary }}>• ID Verification Documents (Aadhaar & PAN)</span>
              <span style={{ fontSize: '12px', color: colorTextSecondary }}>• Bank Account details for instant payout transfers</span>
            </div>

            <button
              onClick={() => setDeliveryStep(2)}
              className="btn-primary"
              style={{ width: '100%', height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
            >
              Continue Profile Setup
            </button>
          </div>
        </div>
      );
    }

    // Step 2: Personal Details
    if (deliveryStep === 2) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {renderProgressHeader()}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colorTextPrimary }}>
              Personal Details
            </h3>
          </div>

          {otpError && (
            <div style={{ background: 'rgba(247, 37, 133, 0.08)', color: '#f72585', border: '1px solid rgba(247, 37, 133, 0.15)', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
              {otpError}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>First Name</label>
              <input 
                type="text" 
                placeholder="Kiran"
                value={onboardingData.firstName}
                onChange={(e) => setOnboardingData({ ...onboardingData, firstName: e.target.value })}
                style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Last Name</label>
              <input 
                type="text" 
                placeholder="Kumar"
                value={onboardingData.lastName}
                onChange={(e) => setOnboardingData({ ...onboardingData, lastName: e.target.value })}
                style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Gender</label>
            <select
              value={onboardingData.gender}
              onChange={(e) => setOnboardingData({ ...onboardingData, gender: e.target.value })}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? '#120f26' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary, cursor: 'pointer' }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Date of Birth</label>
            <input 
              type="date"
              value={onboardingData.dob}
              onChange={(e) => setOnboardingData({ ...onboardingData, dob: e.target.value })}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
            />
          </div>

          <button
            onClick={() => {
              setOtpError('');
              if (!onboardingData.firstName || !onboardingData.lastName || !onboardingData.gender || !onboardingData.dob) {
                setOtpError('Please fill in all personal details fields.');
                return;
              }
              setDeliveryStep(3);
            }}
            className="btn-primary"
            style={{ width: '100%', height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}
          >
            Continue
          </button>
        </div>
      );
    }

    // Step 3: Select Location
    if (deliveryStep === 3) {
      const stateOptions = Object.keys(INDIAN_LOCATIONS);
      const citiesList = onboardingData.state ? INDIAN_LOCATIONS[onboardingData.state] : [];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {renderProgressHeader()}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colorTextPrimary }}>
              Select Location
            </h3>
          </div>

          {otpError && (
            <div style={{ background: 'rgba(247, 37, 133, 0.08)', color: '#f72585', border: '1px solid rgba(247, 37, 133, 0.15)', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
              {otpError}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>State</label>
            <select
              value={onboardingData.state}
              onChange={(e) => setOnboardingData({ ...onboardingData, state: e.target.value, city: '' })}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? '#120f26' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary, cursor: 'pointer' }}
            >
              <option value="">Select State</option>
              {stateOptions.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>City</label>
            <select
              value={onboardingData.city}
              onChange={(e) => setOnboardingData({ ...onboardingData, city: e.target.value })}
              disabled={!onboardingData.state}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? '#120f26' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary, cursor: onboardingData.state ? 'pointer' : 'not-allowed', opacity: onboardingData.state ? 1 : 0.6 }}
            >
              <option value="">Select City</option>
              {citiesList.map(ct => <option key={ct} value={ct}>{ct}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Preferred Delivery Area</label>
            <input 
              type="text" 
              placeholder="e.g. HSR Layout Sector 3"
              value={onboardingData.area}
              onChange={(e) => setOnboardingData({ ...onboardingData, area: e.target.value })}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginTop: '10px' }}>
            <button
              onClick={() => setDeliveryStep(2)}
              className="btn-secondary"
              style={{ height: '52px', border: `1.5px solid ${borderColor}`, borderRadius: '14px', fontWeight: '700', fontSize: '15px', color: colorTextSecondary, cursor: 'pointer', background: 'transparent' }}
            >
              Back
            </button>
            <button
              onClick={() => {
                setOtpError('');
                if (!onboardingData.state || !onboardingData.city || !onboardingData.area) {
                  setOtpError('Please select state, city and preferred area.');
                  return;
                }
                setDeliveryStep(4);
              }}
              className="btn-primary"
              style={{ height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    // Step 4: Vehicle Details
    if (deliveryStep === 4) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {renderProgressHeader()}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colorTextPrimary }}>
              Vehicle Details
            </h3>
          </div>

          {otpError && (
            <div style={{ background: 'rgba(247, 37, 133, 0.08)', color: '#f72585', border: '1px solid rgba(247, 37, 133, 0.15)', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
              {otpError}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Vehicle Type</label>
            <select
              value={onboardingData.vehicleType}
              onChange={(e) => setOnboardingData({ ...onboardingData, vehicleType: e.target.value, vehicleNumber: e.target.value === 'Bicycle' ? 'N/A' : '' })}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? '#120f26' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary, cursor: 'pointer' }}
            >
              <option value="">Select Vehicle Type</option>
              <option value="Bicycle">Bicycle (Non-Motorized)</option>
              <option value="Electric Scooter">Electric Scooter (EV)</option>
              <option value="Motorcycle">Motorcycle / Scooty</option>
              <option value="Car">Car</option>
            </select>
          </div>

          {onboardingData.vehicleType && onboardingData.vehicleType !== 'Bicycle' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} className="animate-fade-in">
              <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Vehicle Registration Number</label>
              <input 
                type="text" 
                placeholder="e.g. KA-01-HE-1234"
                value={onboardingData.vehicleNumber === 'N/A' ? '' : onboardingData.vehicleNumber}
                onChange={(e) => setOnboardingData({ ...onboardingData, vehicleNumber: e.target.value })}
                style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginTop: '10px' }}>
            <button
              onClick={() => setDeliveryStep(3)}
              className="btn-secondary"
              style={{ height: '52px', border: `1.5px solid ${borderColor}`, borderRadius: '14px', fontWeight: '700', fontSize: '15px', color: colorTextSecondary, cursor: 'pointer', background: 'transparent' }}
            >
              Back
            </button>
            <button
              onClick={() => {
                setOtpError('');
                if (!onboardingData.vehicleType) {
                  setOtpError('Please select a vehicle type.');
                  return;
                }
                if (onboardingData.vehicleType !== 'Bicycle' && !onboardingData.vehicleNumber) {
                  setOtpError('Please enter your vehicle registration number.');
                  return;
                }
                setDeliveryStep(5);
              }}
              className="btn-primary"
              style={{ height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    // Step 5: Upload Documents
    if (deliveryStep === 5) {
      const isMotorized = onboardingData.vehicleType && onboardingData.vehicleType !== 'Bicycle';

      const renderDocUploader = (fieldName, labelName) => {
        const progress = simulatedDocProgress[fieldName];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: `1px solid ${borderColor}`, paddingBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>{labelName}</span>
              {progress === 'done' && <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>✓ Uploaded</span>}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input 
                type="file" 
                id={`file-upload-${fieldName}`} 
                onChange={(e) => handleFileChange(e, fieldName)} 
                style={{ display: 'none' }} 
              />
              <button
                type="button"
                disabled={progress === 'uploading'}
                onClick={() => {
                  const inputEl = document.getElementById(`file-upload-${fieldName}`);
                  if (inputEl) inputEl.click();
                }}
                style={{
                  background: progress === 'done' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(106, 0, 244, 0.05)',
                  border: progress === 'done' ? '1px solid #10b981' : `1px dashed ${borderColor}`,
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: progress === 'done' ? '#10b981' : '#7209b7',
                  cursor: progress === 'uploading' ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {progress === 'uploading' ? 'Uploading...' : progress === 'done' ? 'Change File' : 'Choose File'}
              </button>
              <span style={{ fontSize: '12px', color: colorTextMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                {onboardingData[fieldName + 'File'] || 'No file chosen'}
              </span>
            </div>
          </div>
        );
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '550px', overflowY: 'auto', paddingRight: '6px' }}>
          {renderProgressHeader()}
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colorTextPrimary }}>
              Upload Documents
            </h3>
          </div>

          {otpError && (
            <div style={{ background: 'rgba(247, 37, 133, 0.08)', color: '#f72585', border: '1px solid rgba(247, 37, 133, 0.15)', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
              {otpError}
            </div>
          )}

          {/* Aadhaar Number */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Aadhaar Number (12 digits)</label>
            <input 
              type="text" 
              placeholder="e.g. 1234 5678 9012"
              value={onboardingData.aadhaarNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ''); // numbers only
                if (val.length <= 12) setOnboardingData({ ...onboardingData, aadhaarNumber: val });
              }}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '44px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
            />
          </div>
          {renderDocUploader('aadhaar', 'Aadhaar Document Card')}

          {/* PAN Number */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>PAN Card Number</label>
            <input 
              type="text" 
              placeholder="e.g. ABCDE1234F"
              value={onboardingData.panNumber}
              onChange={(e) => setOnboardingData({ ...onboardingData, panNumber: e.target.value.toUpperCase() })}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '44px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
            />
          </div>
          {renderDocUploader('pan', 'PAN Document Card')}

          {/* DL Number if motorized */}
          {isMotorized && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} className="animate-fade-in">
                <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Driving License Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. DL-1420110012345"
                  value={onboardingData.dlNumber}
                  onChange={(e) => setOnboardingData({ ...onboardingData, dlNumber: e.target.value })}
                  style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '44px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
                />
              </div>
              {renderDocUploader('dl', 'Driving License Document')}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} className="animate-fade-in">
                <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>RC Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. RC-KA011234"
                  value={onboardingData.rcNumber}
                  onChange={(e) => setOnboardingData({ ...onboardingData, rcNumber: e.target.value })}
                  style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '44px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
                />
              </div>
              {renderDocUploader('rc', 'RC Certificate File')}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} className="animate-fade-in">
                <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Insurance Policy Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. INS-987654321"
                  value={onboardingData.insuranceNumber}
                  onChange={(e) => setOnboardingData({ ...onboardingData, insuranceNumber: e.target.value })}
                  style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '44px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
                />
              </div>
              {renderDocUploader('insurance', 'Insurance Document Policy')}
            </>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginTop: '10px' }}>
            <button
              onClick={() => setDeliveryStep(4)}
              className="btn-secondary"
              style={{ height: '52px', border: `1.5px solid ${borderColor}`, borderRadius: '14px', fontWeight: '700', fontSize: '15px', color: colorTextSecondary, cursor: 'pointer', background: 'transparent' }}
            >
              Back
            </button>
            <button
              onClick={() => {
                setOtpError('');
                if (onboardingData.aadhaarNumber.length !== 12) {
                  setOtpError('Please enter a valid 12-digit Aadhaar number.');
                  return;
                }
                if (!onboardingData.aadhaarFile) {
                  setOtpError('Please upload your Aadhaar document card.');
                  return;
                }
                if (!onboardingData.panNumber) {
                  setOtpError('Please enter your PAN Card number.');
                  return;
                }
                if (!onboardingData.panFile) {
                  setOtpError('Please upload your PAN document card.');
                  return;
                }
                if (isMotorized) {
                  if (!onboardingData.dlNumber || !onboardingData.dlFile) {
                    setOtpError('Please enter Driving License details.');
                    return;
                  }
                  if (!onboardingData.rcNumber || !onboardingData.rcFile) {
                    setOtpError('Please upload your RC Certificate.');
                    return;
                  }
                  if (!onboardingData.insuranceNumber || !onboardingData.insuranceFile) {
                    setOtpError('Please upload your Insurance Document.');
                    return;
                  }
                }
                setDeliveryStep(6);
              }}
              className="btn-primary"
              style={{ height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    // Step 6: Bank Details
    if (deliveryStep === 6) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {renderProgressHeader()}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colorTextPrimary }}>
              Bank Details
            </h3>
          </div>

          {otpError && (
            <div style={{ background: 'rgba(247, 37, 133, 0.08)', color: '#f72585', border: '1px solid rgba(247, 37, 133, 0.15)', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
              {otpError}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Account Holder Name</label>
            <input 
              type="text" 
              placeholder="Kiran Kumar"
              value={onboardingData.bankHolder}
              onChange={(e) => setOnboardingData({ ...onboardingData, bankHolder: e.target.value })}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Account Number</label>
              <input 
                type="text" 
                placeholder="123456789012"
                value={onboardingData.bankAccount}
                onChange={(e) => setOnboardingData({ ...onboardingData, bankAccount: e.target.value.replace(/\D/g, '') })}
                style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>Bank IFSC Code</label>
              <input 
                type="text" 
                placeholder="SBIN0001234"
                value={onboardingData.bankIfsc}
                onChange={(e) => setOnboardingData({ ...onboardingData, bankIfsc: e.target.value.toUpperCase() })}
                style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
            <div style={{ flex: 1, height: '1px', background: borderColor }} />
            <span style={{ padding: '0 12px', fontSize: '11px', color: colorTextMuted, fontWeight: '800' }}>OR UPI ID</span>
            <div style={{ flex: 1, height: '1px', background: borderColor }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: colorTextSecondary }}>UPI ID (e.g. kiran@okaxis)</label>
            <input 
              type="text" 
              placeholder="e.g. kiran@upi"
              value={onboardingData.upiId}
              onChange={(e) => setOnboardingData({ ...onboardingData, upiId: e.target.value })}
              style={{ border: `1.5px solid ${borderColor}`, borderRadius: '12px', padding: '0 16px', height: '48px', background: isDark ? 'rgba(255,255,255,0.02)' : '#FFFFFF', outline: 'none', fontSize: '14px', color: colorTextPrimary }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginTop: '10px' }}>
            <button
              onClick={() => setDeliveryStep(5)}
              className="btn-secondary"
              style={{ height: '52px', border: `1.5px solid ${borderColor}`, borderRadius: '14px', fontWeight: '700', fontSize: '15px', color: colorTextSecondary, cursor: 'pointer', background: 'transparent' }}
            >
              Back
            </button>
            <button
              onClick={() => {
                setOtpError('');
                if (!onboardingData.bankHolder) {
                  setOtpError('Please enter Account Holder name.');
                  return;
                }
                const hasAccount = onboardingData.bankAccount && onboardingData.bankIfsc;
                const hasUpi = onboardingData.upiId;
                if (!hasAccount && !hasUpi) {
                  setOtpError('Please provide either bank account + IFSC details, or a UPI ID.');
                  return;
                }
                setDeliveryStep(7);
              }}
              className="btn-primary"
              style={{ height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    // Step 7: Selfie Verification
    if (deliveryStep === 7) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%' }}>
          {renderProgressHeader()}
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colorTextPrimary }}>
              Selfie Verification
            </h3>
          </div>

          {otpError && (
            <div style={{ background: 'rgba(247, 37, 133, 0.08)', color: '#f72585', border: '1px solid rgba(247, 37, 133, 0.15)', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
              {otpError}
            </div>
          )}

          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: onboardingData.profilePhoto ? '4px solid #10b981' : cameraActive ? '4px solid #7209b7' : '4px dashed #7209b7',
            background: isDark ? 'rgba(0,0,0,0.4)' : '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
          }}>
            {capturingSelfie ? (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '3px solid #7209b7', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} className="spinner-camera" />
                <span style={{ fontSize: '11px', color: '#7209b7', fontWeight: '700' }}>Initializing Camera...</span>
              </div>
            ) : onboardingData.profilePhoto ? (
              <img 
                src={onboardingData.profilePhoto} 
                alt="Selfie Preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : cameraActive ? (
              <video 
                ref={videoRef}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
                playsInline
                muted
              />
            ) : (
              <div style={{ textAlign: 'center', color: colorTextMuted }}>
                <div style={{ fontSize: '32px', marginBottom: '4px' }}>📸</div>
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Camera Offline</span>
              </div>
            )}
          </div>

          {/* Action buttons based on camera state */}
          {onboardingData.profilePhoto ? (
            <button
              type="button"
              onClick={() => {
                setOnboardingData(prev => ({ ...prev, profilePhoto: null }));
                startCamera();
              }}
              style={{
                background: 'rgba(247, 37, 133, 0.08)',
                border: '1.5px solid #f72585',
                borderRadius: '12px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#f72585',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Retake Profile Photo</span>
            </button>
          ) : cameraActive ? (
            <button
              type="button"
              onClick={capturePhoto}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 24px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
              }}
            >
              <span>Capture Photo</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={startCamera}
              style={{
                background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 24px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(247, 37, 133, 0.2)'
              }}
            >
              <span>Start Camera</span>
            </button>
          )}

          {/* Description & guidelines */}
          <div style={{
            background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(106, 0, 244, 0.02)',
            border: `1.5px solid ${borderColor}`,
            borderRadius: '12px',
            padding: '12px 16px',
            width: '100%',
            boxSizing: 'border-box',
            marginTop: '4px'
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '16px' }}>💡</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <strong style={{ fontSize: '12px', color: colorTextPrimary, fontWeight: '700' }}>Selfie Guidelines</strong>
                <span style={{ fontSize: '11px', color: colorTextSecondary, lineHeight: '1.4', textAlign: 'left' }}>
                  • Stand in direct front light brightness (avoid backlighting).<br />
                  • Remove sunglasses, hats, masks, or any face coverings.<br />
                  • Look directly into the camera lens with a neutral expression.
                </span>
              </div>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: colorTextSecondary, marginTop: '8px' }}>
            <input 
              type="checkbox" 
              checked={onboardingData.liveSelfie} 
              onChange={(e) => setOnboardingData({ ...onboardingData, liveSelfie: e.target.checked })}
              style={{ accentColor: '#7209b7' }} 
            />
            <span>Perform Live Selfie verification (optional)</span>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginTop: '10px', width: '100%' }}>
            <button
              onClick={() => setDeliveryStep(6)}
              className="btn-secondary"
              style={{ height: '52px', border: `1.5px solid ${borderColor}`, borderRadius: '14px', fontWeight: '700', fontSize: '15px', color: colorTextSecondary, cursor: 'pointer', background: 'transparent' }}
            >
              Back
            </button>
            <button
              onClick={() => {
                setOtpError('');
                if (!onboardingData.profilePhoto) {
                  setOtpError('Please take a profile photo first to verify.');
                  return;
                }
                setDeliveryStep(8);
              }}
              className="btn-primary"
              style={{ height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    // Step 8: Review & Submit
    if (deliveryStep === 8) {
      const renderReviewItem = (label, value) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}` }}>
          <span style={{ color: colorTextSecondary, fontWeight: '500' }}>{label}</span>
          <span style={{ color: colorTextPrimary, fontWeight: '600', textAlign: 'right' }}>{value || 'N/A'}</span>
        </div>
      );

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '550px', overflowY: 'auto', paddingRight: '6px' }}>
          {renderProgressHeader()}
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colorTextPrimary }}>
              Review & Submit
            </h3>
            <p style={{ fontSize: '12px', color: colorTextMuted, marginTop: '4px' }}>
              Double check details before final application submission
            </p>
          </div>

          <div style={{ background: isDark ? 'rgba(255,255,255,0.01)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#f72585' }}>Personal Details</strong>
              <span style={{ fontSize: '11px', color: '#7209b7', fontWeight: '700', cursor: 'pointer' }} onClick={() => setDeliveryStep(2)}>Edit</span>
            </div>
            {renderReviewItem('Full Name', `${onboardingData.firstName} ${onboardingData.lastName}`)}
            {renderReviewItem('Gender', onboardingData.gender)}
            {renderReviewItem('Date of Birth', onboardingData.dob)}
          </div>

          <div style={{ background: isDark ? 'rgba(255,255,255,0.01)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#f72585' }}>Preferred Location</strong>
              <span style={{ fontSize: '11px', color: '#7209b7', fontWeight: '700', cursor: 'pointer' }} onClick={() => setDeliveryStep(3)}>Edit</span>
            </div>
            {renderReviewItem('State', onboardingData.state)}
            {renderReviewItem('City', onboardingData.city)}
            {renderReviewItem('Area', onboardingData.area)}
          </div>

          <div style={{ background: isDark ? 'rgba(255,255,255,0.01)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#f72585' }}>Vehicle Details</strong>
              <span style={{ fontSize: '11px', color: '#7209b7', fontWeight: '700', cursor: 'pointer' }} onClick={() => setDeliveryStep(4)}>Edit</span>
            </div>
            {renderReviewItem('Vehicle Type', onboardingData.vehicleType)}
            {renderReviewItem('Vehicle Number', onboardingData.vehicleNumber)}
          </div>

          <div style={{ background: isDark ? 'rgba(255,255,255,0.01)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#f72585' }}>Verification IDs</strong>
              <span style={{ fontSize: '11px', color: '#7209b7', fontWeight: '700', cursor: 'pointer' }} onClick={() => setDeliveryStep(5)}>Edit</span>
            </div>
            {renderReviewItem('Aadhaar Number', onboardingData.aadhaarNumber)}
            {renderReviewItem('PAN Card', onboardingData.panNumber)}
            {onboardingData.vehicleType !== 'Bicycle' && (
              <>
                {renderReviewItem('DL Number', onboardingData.dlNumber)}
                {renderReviewItem('RC Certificate', onboardingData.rcNumber)}
              </>
            )}
          </div>

          <div style={{ background: isDark ? 'rgba(255,255,255,0.01)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '13px', color: '#f72585' }}>Payout Accounts</strong>
              <span style={{ fontSize: '11px', color: '#7209b7', fontWeight: '700', cursor: 'pointer' }} onClick={() => setDeliveryStep(6)}>Edit</span>
            </div>
            {renderReviewItem('Holder Name', onboardingData.bankHolder)}
            {onboardingData.upiId ? renderReviewItem('UPI ID', onboardingData.upiId) : (
              <>
                {renderReviewItem('Account No.', onboardingData.bankAccount)}
                {renderReviewItem('IFSC Code', onboardingData.bankIfsc)}
              </>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginTop: '10px' }}>
            <button
              onClick={() => setDeliveryStep(7)}
              className="btn-secondary"
              style={{ height: '52px', border: `1.5px solid ${borderColor}`, borderRadius: '14px', fontWeight: '700', fontSize: '15px', color: colorTextSecondary, cursor: 'pointer', background: 'transparent' }}
            >
              Back
            </button>
            <button
              onClick={() => setDeliveryStep(9)}
              className="btn-primary"
              style={{ height: '52px', background: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
            >
              Submit Application
            </button>
          </div>
        </div>
      );
    }

    // Step 9: Verification (Simulated Approval)
    if (deliveryStep === 9) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center', alignItems: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '50px', animation: 'spin 3s linear infinite' }} className="spinner-logo">⏳</div>
          
          <div>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: colorTextPrimary }}>
              Application Submitted ✅
            </h3>
            <p style={{ fontSize: '14px', color: colorTextSecondary, marginTop: '12px', lineHeight: '1.6' }}>
              We're verifying your Aadhaar, PAN, and Bank details on the logistics partner network.
            </p>
            <p style={{ fontSize: '13px', color: colorTextMuted, marginTop: '6px' }}>
              This usually takes a few hours. Please stand by.
            </p>
          </div>

          <div style={{ width: '100%', height: '6px', background: borderColor, borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              height: '100%',
              background: 'linear-gradient(90deg, #f72585 0%, #7209b7 100%)',
              width: '100%',
              animation: 'progressAnim 3.8s linear forwards'
            }} />
          </div>

          <button
            onClick={() => setDeliveryStep(10)}
            className="btn-secondary animate-fade-in"
            style={{ border: 'none', padding: '8px 16px', fontSize: '13px', fontWeight: '800', color: '#7209b7', background: 'transparent', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Simulate Instant Admin Approval →
          </button>
        </div>
      );
    }

    // Step 10: Approved Success
    if (deliveryStep === 10) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '50px' }}>🎉</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colorTextPrimary }}>
              Congratulations!
            </h3>
            <p style={{ fontSize: '15px', color: colorTextSecondary, marginTop: '12px', lineHeight: '1.6' }}>
              Your StitchBee Logistics Rider Account is now active. You have been background verified.
            </p>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10b981', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', width: '100%' }}>
            <span style={{ fontSize: '24px' }}>🛡️</span>
            <div>
              <strong style={{ fontSize: '13px', color: '#10b981', display: 'block' }}>Rider Account Approved</strong>
              <span style={{ fontSize: '11px', color: colorTextSecondary }}>Active in {onboardingData.city || 'Bengaluru'}, {onboardingData.state || 'Karnataka'}</span>
            </div>
          </div>

          <button
            onClick={() => {
              const finalUserData = {
                name: `${onboardingData.firstName || 'Kiran'} ${onboardingData.lastName || 'Kumar'}`,
                email: `${(onboardingData.firstName || 'kiran').toLowerCase()}@stitchbee.com`,
                role: 'delivery',
                phone: deliveryPhone || '9876543210',
                address: `${onboardingData.area || 'HSR Layout'}, ${onboardingData.city || 'Bengaluru'}, ${onboardingData.state || 'Karnataka'}`,
                onboardingCompleted: true
              };
              
              localStorage.setItem('stitchbee_user', JSON.stringify(finalUserData));
              onLoginSuccess(finalUserData);
            }}
            className="btn-primary"
            style={{ width: '100%', height: '52px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)' }}
          >
            <span>Go to Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </div>
      );
    }
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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes progressAnim {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
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
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .spinner-camera, .spinner-logo {
          animation: spin 1s linear infinite;
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
        <div 
          onClick={onClose} 
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          title="Go to Home"
        >
          <img src="/logo.png" alt="StitchBee" style={{ height: '100px', width: '300px', objectFit: 'contain', display: 'block', marginLeft: '-60px' }} />
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

          {/* Login and Signup top buttons removed - redesigned directly inside the card */}
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
              background: isDark ? 'rgba(18, 15, 38, 0.85)' : '#FFFFFF', 
              backdropFilter: 'blur(20px)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`, 
              borderTop: '4px solid #f72585',
              borderRadius: '24px', 
              padding: '40px',
              boxShadow: isDark ? '0 30px 60px rgba(0, 0, 0, 0.4)' : '0 20px 40px rgba(106, 0, 244, 0.05)',
              boxSizing: 'border-box',
              zIndex: 20,
              transition: 'all 0.3s ease'
            }}
            className="auth-card"
          >
            {role === 'delivery' ? (
              renderDeliveryWizard()
            ) : (
              <>
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

                {/* Redesigned Switch tab option inside the card */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <span style={{ fontSize: '14px', color: colorTextSecondary, fontWeight: '500' }}>
                    {tab === 'login' ? "New to StitchBee? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
                      style={{ background: 'transparent', border: 'none', padding: 0, color: '#f72585', fontWeight: '700', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline', marginLeft: '4px', outline: 'none' }}
                    >
                      {tab === 'login' ? 'Create Account' : 'Login'}
                    </button>
                  </span>
                </div>
              </>
            )}

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
