import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Scissors,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  Building2,
  Phone,
  Mail,
  User,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Clock,
  Layers,
  ChevronRight,
  Upload,
  Check
} from 'lucide-react';
import { addOrder } from '../../utils/ordersStore';

export default function UniformCustomOrderView({ onBackToShop, showToast }) {
  const navigate = useNavigate();

  // Custom Form State
  const [sector, setSector] = useState('School / Academy');
  const [silhouette, setSilhouette] = useState('Classic Structured Blazer');
  const [fabric, setFabric] = useState('Wrinkle-Resistant Poly-Viscose Twill (240 GSM)');
  const [color, setColor] = useState('Royal Navy');
  const [monogramInitials, setMonogramInitials] = useState('');
  const [brandingPlacement, setBrandingPlacement] = useState('Left Chest Pocket Crest');
  const [fitType, setFitType] = useState('Modern Slim Regular');
  const [estimatedQuantity, setEstimatedQuantity] = useState('25 - 50 sets');
  
  // Contact & Doorstep Visit State
  const [customerName, setCustomerName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [doorstepSession, setDoorstepSession] = useState(true);
  const [preferredDate, setPreferredDate] = useState('Tomorrow Afternoon');
  const [specialNotes, setSpecialNotes] = useState('');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState('');

  const SECTORS = [
    { id: 'School / Academy', label: 'School / Academy', icon: '🏫' },
    { id: 'Corporate', label: 'Corporate Office', icon: '🏢' },
    { id: 'Hospital & Lab', label: 'Hospital & Healthcare', icon: '🏥' },
    { id: 'Hotel & Hospitality', label: 'Hotel & Hospitality', icon: '🏨' },
    { id: 'Airlines / Aviation', label: 'Airlines & Aviation', icon: '✈️' },
    { id: 'Security & Guard', label: 'Security & Facilities', icon: '🛡️' }
  ];

  const SILHOUETTES = [
    'Classic Structured Blazer',
    'Executive Two-Piece Uniform Suit',
    'Oxford Button-Down Dress Shirt',
    'Pleated School / Academy Skirt',
    'Tailored Formal Trousers',
    'Stretch Medical Scrub Set',
    'Double-Breasted Chef Coat',
    'Industrial Reflective Safety Jacket'
  ];

  const FABRIC_CHOICES = [
    'Wrinkle-Resistant Poly-Viscose Twill (240 GSM - Premium Formal)',
    '100% Breathable Giza Cotton Blend (200 GSM - Daily Comfort)',
    'Antimicrobial Stretch Healthcare Twill (210 GSM - Hospital Grade)',
    'Flame-Retardant Industrial Heavy Drill (280 GSM - High Endurance)',
    'Linen-Cotton Breathable Blend (190 GSM - Hospitality Classic)'
  ];

  const COLOR_PALETTES = [
    { name: 'Royal Navy', hex: '#0B2545' },
    { name: 'Crisp White', hex: '#FFFFFF' },
    { name: 'Charcoal Slate', hex: '#2B2D42' },
    { name: 'Medical Sky Blue', hex: '#38A3A5' },
    { name: 'Forest Green', hex: '#1B4332' },
    { name: 'Burgundy Maroon', hex: '#5E0B15' },
    { name: 'Classic Khaki Tan', hex: '#C2A649' },
    { name: 'Corporate Black', hex: '#111827' }
  ];

  const BRANDING_PLACEMENTS = [
    'Left Chest Pocket Crest',
    'Right Sleeve Arm Patch',
    'Back Monogram / Name Print',
    'Collar Lapel Pin / Micro-Stitch',
    'No Branding (Plain Tailored)'
  ];

  const QUANTITY_OPTIONS = [
    '1 - 5 sets (Sample Trial Prototype)',
    '10 - 25 sets (Executive / Team Batch)',
    '25 - 50 sets (Standard Department)',
    '50 - 100 sets (Branch Rollout)',
    '100+ sets (Full Organization Rollout)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const newId = `CUST-UNI-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: newId,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().toISOString(),
      type: 'custom',
      serviceCategory: 'clothing',
      serviceCategoryLabel: 'Clothing & Uniforms',
      status: 'Quote Requested',
      statusCode: 'quote_requested',
      statusIndex: 0,
      customerName: customerName,
      customerPhone: phone,
      address: `${address ? address + ', ' : ''}${city}`,
      total: 'Estimate Under Review',
      paymentStatus: 'Advance on Fitting Approval',
      paymentMethod: 'UPI / Direct Bank Transfer',
      courier: 'StitchBee Mobile Atelier Service',
      trackingNumber: `UNI-ART-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: 'Atelier Sample in 4 days • Order in 10-12 days',
      customDetails: {
        bagType: `Bespoke Uniform: ${silhouette}`,
        baseSilhouette: sector,
        material: fabric,
        color: color,
        size: `${fitType} • Batch: ${estimatedQuantity}`,
        initials: monogramInitials || brandingPlacement,
        notes: `Organization: ${orgName || 'Private Client'} • Doorstep Fitting: ${doorstepSession ? 'Yes, Scheduled (' + preferredDate + ')' : 'No'} • Notes: ${specialNotes || 'None'}`,
        artisanAssigned: 'Master Uniform Patternmaker & Atelier Tailor S. Krishnan'
      },
      items: [
        {
          id: `cust-uni-1`,
          name: `Custom Handcrafted ${silhouette}`,
          price: 'Custom Estimate',
          qty: estimatedQuantity.split(' ')[0],
          category: 'Bespoke Uniform Tailoring',
          color: color,
          img: '/uniform_assets/Custom%20Uniform%20Design%20Section%20Bg%20Image.png'
        }
      ],
      trackingMilestones: [
        { title: 'Custom Uniform Brief Received', time: 'Just Now', location: 'StitchBee Atelier', done: true },
        { title: 'Master Patternmaker Assigned', time: 'Within 2 Hours', location: 'Central Bengaluru Atelier', done: false },
        { title: 'Fabric Swatch & Doorstep Trial Visit', time: preferredDate, location: `${address || city}`, done: false },
        { title: 'CAD Pattern & Prototype Approved', time: 'Pending Customer Approval', location: 'Design Studio', done: false },
        { title: 'Handcrafted Assembly & Saddle Seaming', time: 'In Progress', location: 'Atelier Workshop Unit 2', done: false },
        { title: '18-Point Quality & Stitching Passed', time: 'Pending', location: 'Quality Bay', done: false },
        { title: 'Doorstep Delivery & Final Fitting', time: 'Expected 10-12 Days', location: 'Customer Location', done: false }
      ]
    };

    addOrder(newOrder);
    setSubmittedOrderId(newId);
    setIsSubmitted(true);

    if (typeof showToast === 'function') {
      showToast('Custom uniform brief registered! Order ID: ' + newId);
    }
  };

  return (
    <div className="uniform-custom-order-page" style={{ background: '#f8fafc', minHeight: '100vh', padding: '24px 16px 80px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#64748b' }}>Home</span>
            <ChevronRight size={14} />
            <span onClick={() => onBackToShop ? onBackToShop() : navigate('/uniforms')} style={{ cursor: 'pointer', color: '#64748b' }}>
              Uniforms Shop
            </span>
            <ChevronRight size={14} />
            <span style={{ color: '#E11D74', fontWeight: 700 }}>
              Bespoke Uniform Atelier
            </span>
          </nav>

          <button
            onClick={() => onBackToShop ? onBackToShop() : navigate('/uniforms')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: '#1e293b',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Back to Uniforms Shop
          </button>
        </div>

        {/* Page Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4c0519 60%, #831843 100%)',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '36px 32px',
          marginBottom: '28px',
          boxShadow: '0 10px 30px rgba(30, 27, 75, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
            <Sparkles size={14} /> Bespoke Tailoring Atelier
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '4px 0 10px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Start a Custom Uniform Order
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.96rem', maxWidth: '780px', margin: 0, lineHeight: 1.6 }}>
            Design bespoke-patterned uniforms matched to your organization's exact aesthetic, brand guidelines, and employee comfort requirements. Benefit from physical doorstep trials and master tailor precision.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600 }}>
              <Scissors size={16} color="#f472b6" /> Custom Cut & Sizing Grids
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600 }}>
              <ShieldCheck size={16} color="#34d399" /> 1-Year Seam Guarantee
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600 }}>
              <Truck size={16} color="#60a5fa" /> Mobile Fitment Van Visit
            </div>
          </div>
        </div>

        {/* SUBMISSION CONFIRMATION */}
        {isSubmitted ? (
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '48px 32px',
            border: '2px solid #10b981',
            boxShadow: '0 12px 36px rgba(16, 185, 129, 0.12)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: '#10b981',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
            }}>
              <CheckCircle2 size={44} />
            </div>

            <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '4px 14px', borderRadius: '20px', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.04em' }}>
              CUSTOM DESIGN BRIEF RECEIVED
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '12px 0 8px' }}>
              Custom Order Initialized!
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.96rem', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Thank you, <strong>{customerName}</strong>! Your bespoke design brief has been assigned to Master Uniform Patternmaker S. Krishnan. Our concierge will call you shortly to confirm your fabric sample kit and fit session.
            </p>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '16px 24px',
              maxWidth: '460px',
              margin: '0 auto 28px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>Custom Order ID:</span>
                <strong style={{ fontSize: '0.96rem', color: '#E11D74' }}>{submittedOrderId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>Garment:</span>
                <strong style={{ fontSize: '0.84rem', color: '#0f172a' }}>{silhouette}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>Assigned Master Tailor:</span>
                <strong style={{ fontSize: '0.84rem', color: '#059669' }}>S. Krishnan (Atelier Unit 2)</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/orders')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: '#E11D74',
                  color: '#ffffff',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(225, 29, 116, 0.3)'
                }}
              >
                <FileText size={16} /> Track in My Orders
              </button>

              <button
                onClick={() => onBackToShop ? onBackToShop() : navigate('/uniforms')}
                style={{
                  padding: '12px 24px',
                  background: '#ffffff',
                  color: '#0f172a',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Return to Uniforms Shop
              </button>
            </div>
          </div>
        ) : (
          /* MAIN CUSTOM ORDER FORM */
          <form onSubmit={handleSubmit} style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>

            {/* SECTION 1: INDUSTRY SECTOR */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#E11D74', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>1</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Choose Your Sector / Industry
                </h3>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 16px 32px' }}>
                Select your industry to load tailored patterns and fabric compliance specs.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                {SECTORS.map((s) => {
                  const isSelected = sector === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSector(s.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #E11D74' : '1.5px solid #e2e8f0',
                        background: isSelected ? 'rgba(225, 29, 116, 0.05)' : '#ffffff',
                        color: isSelected ? '#E11D74' : '#1e293b',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: isSelected ? 700 : 500
                      }}
                    >
                      <span style={{ fontSize: '1.3rem' }}>{s.icon}</span>
                      <span style={{ fontSize: '0.84rem' }}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: SILHOUETTE & FIT */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#E11D74', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>2</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Uniform Silhouette & Fitment
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Garment / Uniform Concept *
                  </label>
                  <select
                    value={silhouette}
                    onChange={(e) => setSilhouette(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none' }}
                  >
                    {SILHOUETTES.map((sil) => (
                      <option key={sil} value={sil}>{sil}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Fit Cut Preference
                  </label>
                  <select
                    value={fitType}
                    onChange={(e) => setFitType(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none' }}
                  >
                    <option value="Modern Slim Regular">Modern Slim Regular (Structured)</option>
                    <option value="Classic Relaxed Fit">Classic Relaxed Fit (All-Day Movement)</option>
                    <option value="Athletic Stretch Fit">Athletic Stretch Fit (Active)</option>
                    <option value="Tailored Made-to-Measure">Individual Made-to-Measure</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Estimated Initial Batch Quantity
                  </label>
                  <select
                    value={estimatedQuantity}
                    onChange={(e) => setEstimatedQuantity(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none' }}
                  >
                    {QUANTITY_OPTIONS.map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: FABRICS & COLOR PALETTE */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#E11D74', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>3</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Fabric Specification & Color Customization
                </h3>
              </div>

              <div style={{ marginTop: '16px', marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Fabric Blend & Performance Grade
                </label>
                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none' }}
                >
                  {FABRIC_CHOICES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Color Swatch Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  Primary Color Code (Selected: <strong>{color}</strong>)
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {COLOR_PALETTES.map((c) => {
                    const isSelected = color === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setColor(c.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #E11D74' : '1px solid #cbd5e1',
                          background: isSelected ? 'rgba(225, 29, 116, 0.06)' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: c.hex, border: '1px solid rgba(0,0,0,0.15)', display: 'inline-block' }} />
                        <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? '#E11D74' : '#1e293b' }}>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 4: LOGO EMBROIDERY & MONOGRAM */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#E11D74', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>4</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Branding, Logo Placement & Monograms
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Branding / Crest Placement
                  </label>
                  <select
                    value={brandingPlacement}
                    onChange={(e) => setBrandingPlacement(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none' }}
                  >
                    {BRANDING_PLACEMENTS.map((bp) => (
                      <option key={bp} value={bp}>{bp}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Initials / Text Monogram (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SJB or Crest Monogram"
                    value={monogramInitials}
                    onChange={(e) => setMonogramInitials(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: CONTACT & DOORSTEP TRIAL */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#E11D74', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>5</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Contact Information & Doorstep Sizing Session
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Aarav Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Organization / Brand Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Global Academy"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    City & Area Address
                  </label>
                  <input
                    type="text"
                    placeholder="JP Nagar 7th Phase, Bengaluru"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Doorstep Session Box */}
              <div style={{
                marginTop: '18px',
                padding: '16px 20px',
                background: 'rgba(247, 37, 133, 0.05)',
                border: '1px solid rgba(247, 37, 133, 0.2)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <input
                  type="checkbox"
                  id="customDoorstep"
                  checked={doorstepSession}
                  onChange={(e) => setDoorstepSession(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#E11D74' }}
                />
                <label htmlFor="customDoorstep" style={{ fontSize: '0.86rem', color: '#1e293b', cursor: 'pointer' }}>
                  <strong>Book Free Doorstep Fitment & Swatch Trial:</strong> Our master tailor arrives with physical fabric books, collar cut samples, and digital laser measurement.
                </label>
              </div>

              {doorstepSession && (
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>Preferred Slot:</label>
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.84rem' }}
                  >
                    <option value="Tomorrow Morning (9:00 AM - 12:00 PM)">Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Tomorrow Afternoon (1:00 PM - 5:00 PM)">Tomorrow Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="This Weekend (Saturday)">This Weekend (Saturday)</option>
                    <option value="This Weekend (Sunday)">This Weekend (Sunday)</option>
                  </select>
                </div>
              )}
            </div>

            {/* SECTION 6: SPECIAL INSTRUCTIONS */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Design Concept Notes & Specific Branding Guidelines
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific collar shapes, contrast piping colors, pocket styles, or deadline requirements..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none', resize: 'vertical' }}
              />
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                ✨ 1-Year Seam & Hardware Guarantee • Prototype Delivered for Customer Approval
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => onBackToShop ? onBackToShop() : navigate('/uniforms')}
                  style={{ padding: '12px 20px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#ffffff', color: '#334155', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 32px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#E11D74',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.94rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(225, 29, 116, 0.35)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Sparkles size={18} color="#ffffff" />
                  <span>Request Custom Design Consultation</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}