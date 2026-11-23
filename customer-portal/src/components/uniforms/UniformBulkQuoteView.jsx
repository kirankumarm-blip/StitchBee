import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Phone,
  Mail,
  User,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  FileText,
  Clock,
  Layers,
  ChevronRight,
  Award,
  Scissors
} from 'lucide-react';
import { addOrder } from '../../utils/ordersStore';

export default function UniformBulkQuoteView({ onBackToShop, showToast }) {
  const navigate = useNavigate();

  // Form State
  const [institutionType, setInstitutionType] = useState('School');
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [designation, setDesignation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [address, setAddress] = useState('');
  const [quantityTier, setQuantityTier] = useState('100 - 250 sets (10% Institutional Discount)');
  const [selectedGarments, setSelectedGarments] = useState(['Shirts', 'Trousers']);
  const [fabricPreference, setFabricPreference] = useState('Wrinkle-Resistant Poly-Viscose Twill (240 GSM)');
  const [brandingOption, setBrandingOption] = useState('Left Chest Crest Embroidery');
  const [doorstepMeasurement, setDoorstepMeasurement] = useState(true);
  const [deadline, setDeadline] = useState('Within 3-4 Weeks');
  const [specialNotes, setSpecialNotes] = useState('');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState('');

  const INSTITUTION_TYPES = [
    { id: 'School', label: 'School / K-12 Academy', icon: '🏫' },
    { id: 'College', label: 'College & University', icon: '🎓' },
    { id: 'Corporate Office', label: 'Corporate & Business', icon: '🏢' },
    { id: 'Hospital / Clinic', label: 'Hospital & Healthcare', icon: '🏥' },
    { id: 'Hotel & Resort', label: 'Hotel & Hospitality', icon: '🏨' },
    { id: 'Security / Industrial', label: 'Security & Industrial', icon: '🛡️' }
  ];

  const GARMENT_OPTIONS = [
    'Shirts & Blouses',
    'Trousers & Pants',
    'Pleated Skirts',
    'Blazers & Suits',
    'Medical Scrubs',
    'Doctor Lab Coats',
    'Chef Coats & Aprons',
    'Industrial High-Vis Jackets',
    'Security Officer Uniforms',
    'Sports Jersey Sets',
    'Ties, Belts & Accessories'
  ];

  const QUANTITY_TIERS = [
    '50 - 100 sets (Small Batch)',
    '100 - 250 sets (10% Institutional Discount)',
    '250 - 500 sets (18% Campus Scale Discount)',
    '500 - 1,000 sets (25% Enterprise Volume Discount)',
    '1,000+ sets (35% Master Institutional Contract)'
  ];

  const FABRIC_OPTIONS = [
    'Wrinkle-Resistant Poly-Viscose Twill (240 GSM - Premium Institutional)',
    '100% Breathable Giza Cotton Blend (200 GSM - Daily Comfort)',
    'Anti-Microbial Stretch Healthcare Twill (210 GSM - Hospital Grade)',
    'Heavy-Duty Industrial Poly-Cotton Drill (280 GSM - Rugged)',
    'All-Weather Micro-Poly Fleece (Winter Uniforms)'
  ];

  const BRANDING_OPTIONS = [
    'Left Chest Crest Embroidery',
    'Pocket Monogram & Student/Staff Name Tag',
    'High-Definition Screen / DTF Printing',
    'Woven Badge & Heat Transfer Patch',
    'Plain / No Branding'
  ];

  const toggleGarment = (g) => {
    if (selectedGarments.includes(g)) {
      setSelectedGarments(selectedGarments.filter((item) => item !== g));
    } else {
      setSelectedGarments([...selectedGarments, g]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orgName.trim() || !contactName.trim() || !phone.trim()) {
      alert('Please fill in Institution Name, Contact Person, and Phone Number.');
      return;
    }

    const newId = `ORD-BULK-${Math.floor(1000 + Math.random() * 9000)}`;

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
      customerName: contactName,
      customerPhone: phone,
      address: `${orgName}, ${address ? address + ', ' : ''}${city}`,
      total: 'Pending Formal Quote',
      paymentStatus: 'Quote Pending',
      paymentMethod: 'Institutional Invoice (Net 30)',
      courier: 'StitchBee Institutional Logistics',
      trackingNumber: `BULK-STB-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: 'Physical Samples in 48h • Bulk in 10-14 days',
      customDetails: {
        bagType: `Institutional Bulk Uniform: ${institutionType}`,
        material: fabricPreference,
        color: 'Selected Institutional Palette',
        size: `${quantityTier} • ${selectedGarments.join(', ')}`,
        initials: brandingOption,
        notes: `Institution: ${orgName} • Contact: ${contactName} (${designation || 'Representative'}) • Phone: ${phone} • Email: ${email || 'N/A'} • Doorstep Visit: ${doorstepMeasurement ? 'Yes, Requested' : 'No'} • Target Date: ${deadline} • Notes: ${specialNotes || 'None'}`,
        artisanAssigned: 'Institutional Tailoring Unit 4 (Lead Master Tailor R. Sharma)'
      },
      items: selectedGarments.map((g, idx) => ({
        id: `bulk-item-${idx + 1}`,
        name: `${g} (${institutionType})`,
        price: 'Included in Quote',
        qty: quantityTier.split(' ')[0],
        category: 'Uniforms Institutional Bulk',
        img: '/uniform_assets/Bulk%20Orders%20for%20Schools,%20Collages%20&%20Business%20%20Section%20Bg%20Image.png'
      })),
      trackingMilestones: [
        { title: 'Bulk Quote Inquiry Submitted', time: 'Just Now', location: 'StitchBee Institutional Hub', done: true },
        { title: 'Institutional Account Manager Assigned', time: 'Within 2 Hours', location: 'Bengaluru Central Atelier', done: false },
        { title: 'Complimentary Fabric Swatch Kit Dispatched', time: 'Within 24 Hours', location: 'Logistics Facility', done: false },
        { title: 'On-Campus Fitting & Sizing Trial', time: 'Scheduled on Call', location: `${orgName}, ${city}`, done: false },
        { title: 'Formal Institutional PO Approved', time: 'Pending Customer Approval', location: 'Finance Desk', done: false },
        { title: 'Mass Tailoring & Embroidery Production', time: 'Pending', location: 'Atelier Factory Unit', done: false },
        { title: 'Pan-India Institutional Delivery', time: 'Expected 10-14 Business Days', location: 'Customer Campus', done: false }
      ]
    };

    addOrder(newOrder);
    setSubmittedOrderId(newId);
    setIsSubmitted(true);

    if (typeof showToast === 'function') {
      showToast('Bulk inquiry submitted successfully! Quote reference: ' + newId);
    }
  };

  return (
    <div className="uniform-bulk-quote-page" style={{ background: '#f8fafc', minHeight: '100vh', padding: '24px 16px 80px' }}>
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
              Institutional Bulk Procurement
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
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={16} /> Back to Uniforms Shop
          </button>
        </div>

        {/* Page Hero Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #831843 100%)',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '36px 32px',
          marginBottom: '28px',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
            <Building2 size={14} /> Institutional B2B Procurement
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '4px 0 10px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Request an Institutional Bulk Uniform Quote
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.96rem', maxWidth: '780px', margin: 0, lineHeight: 1.6 }}>
            Enjoy wholesale volume pricing, custom institutional crest embroidery, complimentary sample sets, and dedicated key account management for schools, universities, medical hospitals, and corporate organizations across India.
          </p>

          {/* Quick Highlight Pills */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600 }}>
              <ShieldCheck size={16} color="#34d399" /> Volume Discounts (Up to 35% Off)
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600 }}>
              <Truck size={16} color="#60a5fa" /> Complimentary Sample Set in 48h
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600 }}>
              <Scissors size={16} color="#f472b6" /> Doorstep / On-Campus Fitment Drives
            </div>
          </div>
        </div>

        {/* SUBMISSION CONFIRMATION VIEW */}
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
              INQUIRY REGISTERED SUCCESSFULLY
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '12px 0 8px' }}>
              Thank You! Your Bulk Inquiry is Active
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.96rem', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              We have assigned your inquiry for <strong>{orgName}</strong> to our Institutional Procurement Lead. Your complimentary physical sample swatches will be dispatched shortly.
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
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>Quote Reference ID:</span>
                <strong style={{ fontSize: '0.96rem', color: '#E11D74' }}>{submittedOrderId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>Target Volume:</span>
                <strong style={{ fontSize: '0.84rem', color: '#0f172a' }}>{quantityTier}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>Assigned Specialist:</span>
                <strong style={{ fontSize: '0.84rem', color: '#059669' }}>Atelier Institutional Desk</strong>
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
                <FileText size={16} /> Track Quote in My Orders
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
          /* MAIN COMPREHENSIVE FORM */
          <form onSubmit={handleSubmit} style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>

            {/* SECTION 1: INSTITUTION TYPE */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#E11D74', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>1</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Select Institution / Organization Sector
                </h3>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 16px 32px' }}>
                Choose the sector that best matches your organization for tailored fabric & compliance specifications.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                {INSTITUTION_TYPES.map((t) => {
                  const isSelected = institutionType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setInstitutionType(t.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #E11D74' : '1.5px solid #e2e8f0',
                        background: isSelected ? 'rgba(225, 29, 116, 0.05)' : '#ffffff',
                        color: isSelected ? '#E11D74' : '#1e293b',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: isSelected ? 700 : 500
                      }}
                    >
                      <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
                      <span style={{ fontSize: '0.86rem' }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: INSTITUTION & CONTACT DETAILS */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#E11D74', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>2</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Institution & Contact Information
                </h3>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 16px 32px' }}>
                Where should we send physical fabric swatches and deliver the official formal proposal?
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Institution / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Greenwood International High School"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Principal Sharma / Purchase Lead"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Direct Phone Number *
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
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="purchase@institution.edu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Delivery City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Campus / Office Address
                  </label>
                  <input
                    type="text"
                    placeholder="Varthur Main Road, Whitefield"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', color: '#0f172a', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: GARMENTS & VOLUME */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#E11D74', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>3</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Garments Needed & Order Volume Scale
                </h3>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '0 0 16px 32px' }}>
                Select all uniform articles required for your institutional batch.
              </p>

              {/* Garments Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {GARMENT_OPTIONS.map((g) => {
                  const isChecked = selectedGarments.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGarment(g)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        border: isChecked ? '1.5px solid #E11D74' : '1px solid #cbd5e1',
                        background: isChecked ? '#E11D74' : '#ffffff',
                        color: isChecked ? '#ffffff' : '#334155',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {isChecked && <CheckCircle2 size={14} />}
                      <span>{g}</span>
                    </button>
                  );
                })}
              </div>

              {/* Volume Scale */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  Select Quantity Tier / Volume Scale:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {QUANTITY_TIERS.map((tier) => (
                    <label
                      key={tier}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: quantityTier === tier ? '2px solid #E11D74' : '1px solid #e2e8f0',
                        background: quantityTier === tier ? 'rgba(225, 29, 116, 0.04)' : '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="quantityTier"
                        checked={quantityTier === tier}
                        onChange={() => setQuantityTier(tier)}
                        style={{ accentColor: '#E11D74' }}
                      />
                      <span style={{ fontSize: '0.86rem', fontWeight: quantityTier === tier ? 700 : 500, color: quantityTier === tier ? '#E11D74' : '#1e293b' }}>
                        {tier}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 4: FABRIC GRADE & CUSTOM BRANDING */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#E11D74', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800 }}>4</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Fabric Grade & Custom Crest Branding
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Fabric Specification & GSM
                  </label>
                  <select
                    value={fabricPreference}
                    onChange={(e) => setFabricPreference(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none' }}
                  >
                    {FABRIC_OPTIONS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Institutional Crest / Logo Method
                  </label>
                  <select
                    value={brandingOption}
                    onChange={(e) => setBrandingOption(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none' }}
                  >
                    {BRANDING_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doorstep Measurement Option */}
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
                  id="doorstepVisit"
                  checked={doorstepMeasurement}
                  onChange={(e) => setDoorstepMeasurement(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#E11D74' }}
                />
                <label htmlFor="doorstepVisit" style={{ fontSize: '0.86rem', color: '#1e293b', cursor: 'pointer' }}>
                  <strong>Request On-Campus / Doorstep Fitment Session:</strong> StitchBeez master tailors and gig student partners visit your campus with sizing grids and digital measurement tools for zero fit error.
                </label>
              </div>
            </div>

            {/* SECTION 5: NOTES & SUBMISSION */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Specific Deadline & Additional Customization Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific pantone colors, delivery deadlines, or sample requirements..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', color: '#0f172a', outline: 'none', resize: 'vertical' }}
              />
            </div>

            {/* Form CTA Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                🔒 100% Confidential • Official Quote & Sample Dispatched Within 24-48 Hours
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
                  <CheckCircle2 size={18} color="#ffffff" />
                  <span>Submit Institutional Bulk Request</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}