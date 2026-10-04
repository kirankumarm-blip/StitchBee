import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Check, ChevronRight, ArrowLeft, ArrowRight, Upload, X, 
  Sparkles, Heart, Scissors, Layers, Tag, Truck, Gift, 
  ShieldCheck, HelpCircle, AlertCircle, Eye, RefreshCw, Type, MapPin, Phone, User
} from 'lucide-react';
import './HandmadeGiftsPage.css';
import { 
  GIFT_FABRICS, 
  THREAD_COLORS, 
  EMBROIDERY_FONTS, 
  getGiftDraft, 
  saveGiftDraft, 
  clearGiftDraft,
  submitCustomGiftOrder 
} from '../../utils/handmadeGiftsStore';

const GIFT_TYPE_OPTIONS = [
  { id: 'teddy-bears', name: 'Handmade Teddy Bear', basePrice: 1299, desc: 'Heirloom plush keepsake with safe stitched details', img: '/assets/handmade-gifts/handmade_teddy.png' },
  { id: 'cushion-covers', name: 'Embroidered Cushion Cover', basePrice: 999, desc: 'Bespoke living & bedroom statement décor cushions', img: '/assets/handmade-gifts/cushion_covers.png' },
  { id: 'tote-bags', name: 'Custom Tote Bag', basePrice: 1299, desc: 'Durable 14oz canvas & denim everyday carryall', img: '/assets/handmade-gifts/tote_bags.png' },
  { id: 'pouches-cosmetic-bags', name: 'Velvet / Linen Pouch', basePrice: 799, desc: 'Waterproof lined beauty & cosmetic organizers', img: '/assets/handmade-gifts/pouches.png' },
  { id: 'personalized-gifts', name: 'Personalized Keepsake', basePrice: 1199, desc: 'Custom framed embroidery & memory quilts', img: '/assets/handmade-gifts/personalized_gifts.png' },
  { id: 'baby-gifts', name: 'Organic Baby Gift', basePrice: 699, desc: 'GOTS certified muslin bibs, booties & swaddles', img: '/assets/handmade-gifts/baby_gifts.png' },
  { id: 'kitchen-linen', name: 'Embroidered Kitchen Linen', basePrice: 1099, desc: 'French flax linen aprons, tea towels & napkins', img: '/assets/handmade-gifts/kitchen_linen.png' },
  { id: 'custom', name: 'Other Custom Stitched Gift', basePrice: 1499, desc: 'Unique one-of-a-kind idea from your imagination', img: '/assets/handmade-gifts/custom_designs.png' }
];

const PRIMARY_COLORS = [
  { name: 'Natural Cream', hex: '#FAF5EE' },
  { name: 'Warm Camel Tan', hex: '#D2B48C' },
  { name: 'Dusty Rose', hex: '#E8B4B8' },
  { name: 'Sage Green', hex: '#A8C3B1' },
  { name: 'Midnight Navy', hex: '#1E293B' },
  { name: 'Burgundy Wine', hex: '#6A1B29' },
  { name: 'Oatmeal Beige', hex: '#E2D7C5' },
  { name: 'Charcoal Grey', hex: '#4A4A4A' }
];

const STEPS = [
  { id: 1, label: 'Gift Type' },
  { id: 2, label: 'Design / Idea' },
  { id: 3, label: 'Fabric & Color' },
  { id: 4, label: 'Personalization' },
  { id: 5, label: 'Size & Qty' },
  { id: 6, label: 'Preview & Quote' },
  { id: 7, label: 'Delivery' },
  { id: 8, label: 'Review & Submit' }
];

export default function CustomGiftWizardPage({ currentUser, showToast }) {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Initialize draft from sessionStorage or default
  const [draft, setDraft] = useState(() => getGiftDraft());
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Read URL query params (?step=idea, ?fabric=denim, ?category=cushion, ?base=classic-teddy-bear)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stepParam = params.get('step');
    const fabricParam = params.get('fabric');
    const categoryParam = params.get('category') || params.get('giftType');
    const baseParam = params.get('base');

    setDraft(prev => {
      let updated = { ...prev };
      if (fabricParam) {
        const matched = GIFT_FABRICS.find(f => f.id.toLowerCase() === fabricParam.toLowerCase());
        if (matched) {
          updated.fabric = matched.name;
          updated.fabricId = matched.id;
        }
      }
      if (categoryParam) {
        const matched = GIFT_TYPE_OPTIONS.find(g => g.id.includes(categoryParam.toLowerCase()) || categoryParam.toLowerCase().includes(g.id));
        if (matched) {
          updated.giftType = matched.name;
          updated.giftCategory = matched.id;
          updated.estimatedPrice = matched.basePrice;
        }
      } else if (baseParam) {
        if (baseParam.includes('teddy')) {
          updated.giftType = 'Handmade Teddy Bear';
          updated.giftCategory = 'teddy-bears';
        } else if (baseParam.includes('cushion')) {
          updated.giftType = 'Embroidered Cushion Cover';
          updated.giftCategory = 'cushion-covers';
        } else if (baseParam.includes('tote')) {
          updated.giftType = 'Custom Tote Bag';
          updated.giftCategory = 'tote-bags';
        } else if (baseParam.includes('bib') || baseParam.includes('baby')) {
          updated.giftType = 'Organic Baby Gift';
          updated.giftCategory = 'baby-gifts';
        } else if (baseParam.includes('pouch')) {
          updated.giftType = 'Velvet / Linen Pouch';
          updated.giftCategory = 'pouches-cosmetic-bags';
        }
      }
      return updated;
    });

    if (stepParam) {
      if (stepParam === 'idea' || stepParam === 'design') setCurrentStep(2);
      else if (stepParam === 'fabric') setCurrentStep(3);
      else if (stepParam === 'personalization' || stepParam === 'personalize') setCurrentStep(4);
      else if (stepParam === 'size') setCurrentStep(5);
      else if (stepParam === 'preview' || stepParam === 'quote') setCurrentStep(6);
    }
  }, [location.search]);

  // Persist draft to sessionStorage whenever it changes
  useEffect(() => {
    saveGiftDraft(draft);
  }, [draft]);

  const updateDraft = (key, value) => {
    setDraft(prev => ({ ...prev, [key]: value }));
  };

  const updateDelivery = (key, value) => {
    setDraft(prev => ({
      ...prev,
      delivery: { ...prev.delivery, [key]: value }
    }));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach(file => {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMsg('Image size should be under 8MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setDraft(prev => ({
          ...prev,
          referenceImages: [...(prev.referenceImages || []).slice(0, 4), event.target.result]
        }));
        if (showToast) showToast('Reference image attached ✨');
      };
      reader.readAsDataURL(file);
    });
  };

  const removeReferenceImage = (index) => {
    setDraft(prev => ({
      ...prev,
      referenceImages: (prev.referenceImages || []).filter((_, idx) => idx !== index)
    }));
  };

  // Navigation handlers
  const nextStep = () => {
    setErrorMsg('');
    if (currentStep === 1 && !draft.giftType) {
      setErrorMsg('Please select a gift item to customize');
      return;
    }
    if (currentStep === 7) {
      if (!draft.delivery?.name?.trim() || !draft.delivery?.address?.trim() || !draft.delivery?.pincode?.trim()) {
        setErrorMsg('Please complete all required delivery address fields');
        return;
      }
    }
    setCurrentStep(prev => Math.min(STEPS.length, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submission handler
  const handleSubmitCustomRequest = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const created = submitCustomGiftOrder(draft);
      setSubmittedOrder(created);
      setIsSubmitting(false);
      if (showToast) {
        showToast('🎉 Custom stitched gift request submitted successfully!');
      }
    } catch (err) {
      console.error('Error submitting custom gift order:', err);
      setErrorMsg('There was an issue submitting your request. Please try again.');
      setIsSubmitting(false);
    }
  };

  // If order was successfully submitted, show final confirmation view
  if (submittedOrder) {
    return (
      <div className="hm-custom-wizard-page" style={{ width: '100%', minHeight: '100vh', background: '#FAF5F2', padding: '40px 16px 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', background: '#FFFFFF', borderRadius: '20px', padding: '40px 32px', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', textAlign: 'center' }}>
          
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF1678 0%, #D81159 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(255, 22, 120, 0.3)'
          }}>
            <Sparkles size={36} color="#FFFFFF" />
          </div>

          <span className="hm-eyebrow" style={{ color: '#FF1678', fontWeight: 700 }}>
            BESPOKE REQUEST CONFIRMED
          </span>
          <h1 className="hm-heading" style={{ fontSize: '2rem', margin: '8px 0 12px' }}>
            Your Custom Gift is in Good Hands!
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 24px' }}>
            We’ve assigned your custom design to our Master Textile Atelier. An artisan will review your design, verify fabric cuts, and prepare your initial draft stitch within 24 hours.
          </p>

          <div style={{
            background: '#FFF5F8',
            border: '1.5px dashed #FF1678',
            borderRadius: '14px',
            padding: '20px',
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #FFE4ED', paddingBottom: '10px', marginBottom: '10px' }}>
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Request Number:</span>
              <strong style={{ color: '#FF1678', fontSize: '0.95rem' }}>{submittedOrder.id}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #FFE4ED', paddingBottom: '10px', marginBottom: '10px' }}>
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Custom Creation:</span>
              <strong style={{ fontSize: '0.9rem' }}>{draft.giftType}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #FFE4ED', paddingBottom: '10px', marginBottom: '10px' }}>
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Selected Fabric & Color:</span>
              <strong style={{ fontSize: '0.9rem' }}>{draft.fabric} ({draft.primaryColor})</strong>
            </div>
            {draft.recipientName && (
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #FFE4ED', paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Personalized With:</span>
                <strong style={{ fontSize: '0.9rem', color: '#B8860B' }}>"{draft.recipientName}"</strong>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Estimated Craft Time:</span>
              <strong style={{ fontSize: '0.9rem' }}>3–5 Business Days</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="hm-btn-primary"
              onClick={() => navigate('/orders')}
              style={{ padding: '14px 28px', cursor: 'pointer' }}
            >
              Track in My Orders →
            </button>
            <button
              type="button"
              className="hm-btn-secondary"
              onClick={() => navigate('/handmade-gifts')}
              style={{ padding: '14px 28px', cursor: 'pointer' }}
            >
              Back to Handmade Gifts
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="hm-custom-wizard-page" style={{ width: '100%', minHeight: '100vh', background: '#FAF5F2', paddingBottom: '80px' }}>
      
      {/* Top Header / Breadcrumbs */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
            <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
            <ChevronRight size={14} className="bl-crumb-sep" />
            <span onClick={() => navigate('/handmade-gifts')} className="bl-crumb-link">Handmade Gifts</span>
            <ChevronRight size={14} className="bl-crumb-sep" />
            <span className="bl-crumb-active">Custom Stitched Gift Studio</span>
          </nav>

          <button
            type="button"
            onClick={() => navigate('/handmade-gifts')}
            style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <ArrowLeft size={14} /> Exit Customizer
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1080px', margin: '28px auto 0', padding: '0 16px' }}>

        {/* Studio Title Banner */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span className="hm-eyebrow">CUSTOM STITCHED GIFT STUDIO</span>
          <h1 className="hm-heading" style={{ fontSize: '2.4rem', margin: '6px 0 8px' }}>
            Design Your Custom Keepsake
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto' }}>
            Choose the item, fabric, colors, and bespoke personalization. Our certified master artisans will handcraft your vision stitch by stitch.
          </p>
        </div>

        {/* 8-Step Visual Progress Bar */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '16px 20px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          marginBottom: '32px',
          overflowX: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '780px' }}>
            {STEPS.map((s, idx) => {
              const isPassed = currentStep > s.id;
              const isCurrent = currentStep === s.id;
              return (
                <React.Fragment key={s.id}>
                  <div 
                    onClick={() => {
                      if (isPassed) setCurrentStep(s.id);
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: isPassed ? 'pointer' : 'default',
                      opacity: isPassed || isCurrent ? 1 : 0.5
                    }}
                  >
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: isPassed ? '#10B981' : (isCurrent ? '#FF1678' : '#F1F5F9'),
                      color: isPassed || isCurrent ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      marginBottom: '6px',
                      transition: 'all 0.2s ease',
                      boxShadow: isCurrent ? '0 4px 12px rgba(255, 22, 120, 0.3)' : 'none'
                    }}>
                      {isPassed ? <Check size={16} /> : s.id}
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? '#FF1678' : '#475569',
                      whiteSpace: 'nowrap'
                    }}>
                      {s.label}
                    </span>
                  </div>

                  {idx < STEPS.length - 1 && (
                    <div style={{
                      flex: 1,
                      height: '2px',
                      background: currentStep > idx + 1 ? '#10B981' : '#E2E8F0',
                      margin: '0 8px 18px',
                      transition: 'background 0.3s ease'
                    }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Error Alert if any */}
        {errorMsg && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            padding: '12px 18px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.88rem'
          }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Wizard Main Card Container */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '36px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          minHeight: '440px'
        }}>

          {/* ================================================================
              STEP 1: GIFT TYPE
              ================================================================ */}
          {currentStep === 1 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="hm-eyebrow">STEP 1 OF 8</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px', color: '#1E293B' }}>
                  Choose Your Stitched Gift Type
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Select the foundation for your custom creation. Every item is hand-cut and tailored to your specifications.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '16px' }}>
                {GIFT_TYPE_OPTIONS.map(opt => {
                  const isSelected = draft.giftType === opt.name;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        updateDraft('giftType', opt.name);
                        updateDraft('giftCategory', opt.id);
                        updateDraft('estimatedPrice', opt.basePrice);
                      }}
                      style={{
                        borderRadius: '14px',
                        border: isSelected ? '2px solid #FF1678' : '1px solid #E2E8F0',
                        background: isSelected ? '#FFF5F8' : '#FFFFFF',
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                      }}
                    >
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: '#FF1678',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check size={14} />
                        </div>
                      )}

                      <img 
                        src={opt.img} 
                        alt={opt.name} 
                        style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '12px' }} 
                      />
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px', color: '#1E293B' }}>
                        {opt.name}
                      </h3>
                      <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '0 0 10px', lineHeight: 1.4 }}>
                        {opt.desc}
                      </p>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FF1678', marginTop: 'auto' }}>
                        From ₹{opt.basePrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================
              STEP 2: DESIGN / IDEA
              ================================================================ */}
          {currentStep === 2 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="hm-eyebrow">STEP 2 OF 8</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px', color: '#1E293B' }}>
                  Share Your Design & Inspiration
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Upload reference sketches, Pinterest photos, or describe your unique vision in your own words.
                </p>
              </div>

              {/* Idea Textarea */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px', color: '#334155' }}>
                  Tell us how you want your gift to look:
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. A honey-colored teddy bear with floral daisy embroidery on the ears, pastel pink scarf, and initials 'SB' stitched in gold silk on the paw..."
                  value={draft.designIdea || ''}
                  onChange={e => updateDraft('designIdea', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    lineHeight: 1.5
                  }}
                />
              </div>

              {/* Reference Image Drag & Drop / File Uploader */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px', color: '#334155' }}>
                  Upload Inspiration Photos or Sketches (Max 4 images):
                </label>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed #CBD5E1',
                    borderRadius: '14px',
                    padding: '32px 20px',
                    textAlign: 'center',
                    background: '#F8FAFC',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                    marginBottom: '16px'
                  }}
                >
                  <Upload size={32} color="#FF1678" style={{ margin: '0 auto 10px' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: '0 0 4px', color: '#1E293B' }}>
                    Click or drag & drop reference images here
                  </p>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    Supports PNG, JPG, JPEG, WEBP up to 8MB
                  </span>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageUpload}
                    style={{ display: 'none' }} 
                  />
                </div>

                {/* Uploaded Images Preview Thumbnails */}
                {draft.referenceImages && draft.referenceImages.length > 0 && (
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {draft.referenceImages.map((imgSrc, idx) => (
                      <div key={idx} style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                        <img src={imgSrc} alt="Reference preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => removeReferenceImage(idx)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: 'rgba(0,0,0,0.6)',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================
              STEP 3: FABRIC & COLOR
              ================================================================ */}
          {currentStep === 3 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="hm-eyebrow">STEP 3 OF 8</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px', color: '#1E293B' }}>
                  Select Premium Fabric & Colors
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Each material is handpicked for tactile luxury, breathability, and long-lasting heirloom quality.
                </p>
              </div>

              {/* 10 Fabric Selection Grid */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '10px', color: '#334155' }}>
                  Choose Stitched Fabric Material:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '12px' }}>
                  {GIFT_FABRICS.map(f => {
                    const isSelected = draft.fabric === f.name;
                    return (
                      <div
                        key={f.id}
                        onClick={() => {
                          updateDraft('fabric', f.name);
                          updateDraft('fabricId', f.id);
                        }}
                        style={{
                          borderRadius: '12px',
                          border: isSelected ? '2px solid #FF1678' : '1px solid #E2E8F0',
                          background: isSelected ? '#FFF5F8' : '#FFFFFF',
                          padding: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                      >
                        <img 
                          src={f.img} 
                          alt={f.name} 
                          style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} 
                        />
                        <div>
                          <h4 style={{ margin: '0 0 2px', fontSize: '0.9rem', fontWeight: 700, color: '#1E293B' }}>
                            {f.name}
                          </h4>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                            {f.texture}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Primary Material Color Swatches */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: '#334155' }}>
                  Primary Fabric Color: <strong style={{ color: '#FF1678', marginLeft: '6px' }}>{draft.primaryColor}</strong>
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {PRIMARY_COLORS.map(c => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => updateDraft('primaryColor', c.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 14px',
                        borderRadius: '20px',
                        border: draft.primaryColor === c.name ? '2px solid #FF1678' : '1px solid #CBD5E1',
                        background: draft.primaryColor === c.name ? '#FFF5F8' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: c.hex, border: '1px solid rgba(0,0,0,0.15)' }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Thread / Accent Color */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: '#334155' }}>
                  Embroidery Thread Color: <strong style={{ color: '#FF1678', marginLeft: '6px' }}>{draft.threadColor}</strong>
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {THREAD_COLORS.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => updateDraft('threadColor', t.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 14px',
                        borderRadius: '20px',
                        border: draft.threadColor === t.name ? '2px solid #FF1678' : '1px solid #CBD5E1',
                        background: draft.threadColor === t.name ? '#FFF5F8' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: t.hex, border: '1px solid rgba(0,0,0,0.15)' }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              STEP 4: PERSONALIZATION (With Live Preview)
              ================================================================ */}
          {currentStep === 4 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="hm-eyebrow">STEP 4 OF 8</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px', color: '#1E293B' }}>
                  Add Personalized Monogram & Message
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Stitch special names, initials, wedding dates, or a heartfelt quote directly into the fabric.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px', color: '#334155' }}>
                    Recipient Name (Max 15 chars):
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="e.g. Priya"
                    value={draft.recipientName || ''}
                    onChange={e => updateDraft('recipientName', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px', color: '#334155' }}>
                    Initials / Monogram (Max 4 chars):
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. PK"
                    value={draft.monogramInitials || ''}
                    onChange={e => updateDraft('monogramInitials', e.target.value.toUpperCase())}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px', color: '#334155' }}>
                    Custom Message / Quote (Max 40 chars):
                  </label>
                  <input
                    type="text"
                    maxLength={40}
                    placeholder="e.g. Best Friends Forever, Always"
                    value={draft.personalizationMessage || ''}
                    onChange={e => updateDraft('personalizationMessage', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px', color: '#334155' }}>
                    Special Date (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 14.02.2026 or Est. 2026"
                    value={draft.specialDate || ''}
                    onChange={e => updateDraft('specialDate', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

              </div>

              {/* Embroidery Font / Style */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '8px', color: '#334155' }}>
                  Select Stitched Font Style:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {EMBROIDERY_FONTS.map(f => (
                    <div
                      key={f.id}
                      onClick={() => updateDraft('fontStyle', f.id)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: draft.fontStyle === f.id ? '2px solid #FF1678' : '1px solid #E2E8F0',
                        background: draft.fontStyle === f.id ? '#FFF5F8' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        fontFamily: f.id === 'cursive' ? 'cursive, serif' : (f.id === 'heritage' ? 'serif' : 'sans-serif'),
                        color: draft.fontStyle === f.id ? '#FF1678' : '#1E293B',
                        marginBottom: '4px'
                      }}>
                        {draft.recipientName || f.sample}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LIVE EMBROIDERY PREVIEW CARD (Requirement 29) */}
              <div style={{
                background: 'linear-gradient(135deg, #FFF5F8 0%, #FAF5F2 100%)',
                border: '2px dashed #FF1678',
                borderRadius: '16px',
                padding: '28px 24px',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(255, 22, 120, 0.06)'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FF1678', color: '#FFFFFF', padding: '3px 12px', borderRadius: '14px', fontSize: '0.72rem', fontWeight: 700, marginBottom: '12px' }}>
                  <Eye size={12} /> LIVE STITCH PREVIEW
                </div>
                
                <div style={{
                  maxWidth: '380px',
                  margin: '0 auto',
                  padding: '24px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid #F1F5F9'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {draft.fabric} Fabric • {draft.primaryColor}
                  </span>
                  
                  <div style={{
                    marginTop: '10px',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    fontStyle: draft.fontStyle === 'cursive' ? 'italic' : 'normal',
                    fontFamily: draft.fontStyle === 'cursive' ? 'cursive, Georgia, serif' : (draft.fontStyle === 'heritage' ? 'Georgia, serif' : 'sans-serif'),
                    color: draft.threadColor === 'Golden Zari' ? '#B8860B' : (draft.threadColor === 'Emerald Green' ? '#1E6F40' : '#FF1678'),
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    {draft.recipientName || draft.monogramInitials || 'Your Name'}
                  </div>

                  {draft.personalizationMessage && (
                    <div style={{
                      marginTop: '6px',
                      fontSize: '0.88rem',
                      fontStyle: 'italic',
                      color: '#64748B'
                    }}>
                      "{draft.personalizationMessage}"
                    </div>
                  )}

                  {draft.specialDate && (
                    <div style={{ marginTop: '6px', fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>
                      {draft.specialDate}
                    </div>
                  )}
                </div>

                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '12px', marginBottom: 0 }}>
                  * Preview shows approximate placement & thread tone. Final embroidery is meticulously hand-guided by master artisans.
                </p>
              </div>

            </div>
          )}

          {/* ================================================================
              STEP 5: SIZE & QUANTITY
              ================================================================ */}
          {currentStep === 5 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="hm-eyebrow">STEP 5 OF 8</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px', color: '#1E293B' }}>
                  Choose Size & Order Quantity
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Configure the dimensions and quantity for your custom gift.
                </p>
              </div>

              {/* Size Options */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '10px', color: '#334155' }}>
                  Select Item Size:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  {[
                    { id: 'Small', label: 'Small / Compact', desc: 'Ideal for gifts & everyday carry' },
                    { id: 'Medium', label: 'Medium / Standard', desc: 'Most popular classic heirloom size' },
                    { id: 'Large', label: 'Large / Statement', desc: 'Extra spacious & prominent display' },
                    { id: 'Custom', label: 'Custom Dimensions', desc: 'Specify your exact length & width' }
                  ].map(s => (
                    <div
                      key={s.id}
                      onClick={() => updateDraft('size', s.id)}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: draft.size === s.id ? '2px solid #FF1678' : '1px solid #CBD5E1',
                        background: draft.size === s.id ? '#FFF5F8' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: 700, color: '#1E293B' }}>
                        {s.label}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {draft.size === 'Custom' && (
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', marginBottom: '6px', color: '#334155' }}>
                    Specify Custom Dimensions (in cm or inches):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 45cm x 45cm or 18 x 18 inches"
                    value={draft.customDimensions || ''}
                    onChange={e => updateDraft('customDimensions', e.target.value)}
                    style={{ width: '100%', maxWidth: '360px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              )}

              {/* Quantity Stepper */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', color: '#334155' }}>
                  Quantity:
                </label>
                <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '10px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => updateDraft('quantity', Math.max(1, (draft.quantity || 1) - 1))}
                    disabled={(draft.quantity || 1) <= 1}
                    style={{ padding: '8px 18px', background: '#F8FAFC', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700 }}
                  >
                    −
                  </button>
                  <span style={{ padding: '8px 24px', fontWeight: 800, fontSize: '1rem', minWidth: '40px', textAlign: 'center' }}>
                    {draft.quantity || 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateDraft('quantity', (draft.quantity || 1) + 1)}
                    style={{ padding: '8px 18px', background: '#F8FAFC', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>

                {(draft.quantity || 1) >= 5 && (
                  <p style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginTop: '8px' }}>
                    ✨ Bulk handcrafted discount automatically applied for orders of 5+ pieces!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ================================================================
              STEP 6: PREVIEW & QUOTE
              ================================================================ */}
          {currentStep === 6 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="hm-eyebrow">STEP 6 OF 8</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px', color: '#1E293B' }}>
                  Review Design Specification & Estimated Quote
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Verify your custom creation details. Master artisans will review every single detail before starting work.
                </p>
              </div>

              {/* Summary Card */}
              <div style={{
                background: '#FAF5F2',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E2E8F0',
                marginBottom: '28px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Gift Item</span>
                    <h4 style={{ margin: '2px 0 0', fontSize: '1rem', fontWeight: 700 }}>{draft.giftType}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Fabric & Material</span>
                    <h4 style={{ margin: '2px 0 0', fontSize: '1rem', fontWeight: 700 }}>{draft.fabric}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Fabric Color</span>
                    <h4 style={{ margin: '2px 0 0', fontSize: '1rem', fontWeight: 700 }}>{draft.primaryColor}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Thread Color</span>
                    <h4 style={{ margin: '2px 0 0', fontSize: '1rem', fontWeight: 700 }}>{draft.threadColor}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Personalization</span>
                    <h4 style={{ margin: '2px 0 0', fontSize: '1rem', fontWeight: 700, color: '#FF1678' }}>
                      {draft.recipientName ? `"${draft.recipientName}"` : 'None specified'}
                    </h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Size & Quantity</span>
                    <h4 style={{ margin: '2px 0 0', fontSize: '1rem', fontWeight: 700 }}>
                      {draft.size} • {draft.quantity || 1} unit(s)
                    </h4>
                  </div>
                </div>

                {draft.designIdea && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Design Instructions</span>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#334155' }}>{draft.designIdea}</p>
                  </div>
                )}
              </div>

              {/* Price Calculation Box */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '2px solid #FF1678',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Estimated Bespoke Price</span>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FF1678' }}>
                    ₹{((draft.estimatedPrice || 1499) * (draft.quantity || 1)).toLocaleString('en-IN')}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                    Includes artisan hand-embroidery, premium fabrics & complimentary delivery
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B', marginBottom: '4px' }}>
                    ⏳ Handcrafting Timeline:
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                    3–5 Business Days to Complete & Dispatch
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              STEP 7: DELIVERY DETAILS
              ================================================================ */}
          {currentStep === 7 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="hm-eyebrow">STEP 7 OF 8</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px', color: '#1E293B' }}>
                  Delivery & Gift Packaging Details
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Tell us where to send your handcrafted gift. You can send it directly to your recipient with custom gift wrapping!
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', color: '#334155' }}>
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    value={draft.delivery?.name || ''}
                    onChange={e => updateDelivery('name', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', color: '#334155' }}>
                    Contact Phone Number *
                  </label>
                  <input
                    type="text"
                    value={draft.delivery?.phone || ''}
                    onChange={e => updateDelivery('phone', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', color: '#334155' }}>
                  Complete Street Address *
                </label>
                <input
                  type="text"
                  placeholder="House/Flat number, building name, street, landmark..."
                  value={draft.delivery?.address || ''}
                  onChange={e => updateDelivery('address', e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', color: '#334155' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    value={draft.delivery?.city || 'Bengaluru'}
                    onChange={e => updateDelivery('city', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', color: '#334155' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    value={draft.delivery?.state || 'Karnataka'}
                    onChange={e => updateDelivery('state', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', color: '#334155' }}>
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={draft.delivery?.pincode || '560078'}
                    onChange={e => updateDelivery('pincode', e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Gift Packaging Checkbox */}
              <div style={{ background: '#FFF5F8', borderRadius: '12px', padding: '16px', border: '1px solid #FFE4ED' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>
                  <input
                    type="checkbox"
                    checked={draft.delivery?.giftWrap || false}
                    onChange={e => updateDelivery('giftWrap', e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#FF1678' }}
                  />
                  <span>Include Luxury Gift Box with Handwritten Calligraphy Note (Free)</span>
                </label>

                {draft.delivery?.giftWrap && (
                  <div style={{ marginTop: '12px', paddingLeft: '28px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                      Gift Card Message:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Write your personal message to be handwritten on luxury parchment..."
                      value={draft.delivery?.giftNote || ''}
                      onChange={e => updateDelivery('giftNote', e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================
              STEP 8: REVIEW & SUBMIT
              ================================================================ */}
          {currentStep === 8 && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="hm-eyebrow">STEP 8 OF 8</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 6px', color: '#1E293B' }}>
                  Final Review & Submit Custom Request
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Everything look good? Submit your bespoke order request. You will receive live artisan status updates in My Orders.
                </p>
              </div>

              {/* Full Review Grid */}
              <div style={{
                background: '#FAF5F2',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E2E8F0',
                marginBottom: '28px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px', color: '#FF1678' }}>
                      Gift Specifications:
                    </h4>
                    <p style={{ margin: '3px 0', fontSize: '0.85rem' }}><strong>Item:</strong> {draft.giftType}</p>
                    <p style={{ margin: '3px 0', fontSize: '0.85rem' }}><strong>Fabric:</strong> {draft.fabric}</p>
                    <p style={{ margin: '3px 0', fontSize: '0.85rem' }}><strong>Color:</strong> {draft.primaryColor}</p>
                    <p style={{ margin: '3px 0', fontSize: '0.85rem' }}><strong>Thread:</strong> {draft.threadColor}</p>
                    <p style={{ margin: '3px 0', fontSize: '0.85rem' }}><strong>Size:</strong> {draft.size}</p>
                    <p style={{ margin: '3px 0', fontSize: '0.85rem' }}><strong>Quantity:</strong> {draft.quantity || 1}</p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px', color: '#FF1678' }}>
                      Personalization & Delivery:
                    </h4>
                    <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>
                      <strong>Embroidered Name:</strong> {draft.recipientName || 'None'}
                    </p>
                    {draft.personalizationMessage && (
                      <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>
                        <strong>Custom Message:</strong> "{draft.personalizationMessage}"
                      </p>
                    )}
                    <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>
                      <strong>Delivery To:</strong> {draft.delivery?.name}, {draft.delivery?.city} - {draft.delivery?.pincode}
                    </p>
                    <p style={{ margin: '3px 0', fontSize: '0.85rem' }}>
                      <strong>Luxury Gift Box:</strong> {draft.delivery?.giftWrap ? 'Yes (Included)' : 'Standard packaging'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div style={{
                background: '#FFF5F8',
                borderRadius: '16px',
                border: '1.5px solid #FF1678',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Total Estimated Price</span>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FF1678' }}>
                    ₹{((draft.estimatedPrice || 1499) * (draft.quantity || 1)).toLocaleString('en-IN')}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    No payment required now. Artisan reviews and finalizes quote upon submission.
                  </span>
                </div>

                <button
                  type="button"
                  className="hm-btn-primary"
                  onClick={handleSubmitCustomRequest}
                  disabled={isSubmitting}
                  style={{
                    padding: '16px 36px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      <span>Submitting to Atelier...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Submit Custom Gift Request →</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Wizard Bottom Navigation Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid #E2E8F0'
          }}>
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: currentStep === 1 ? '#F8FAFC' : '#FFFFFF',
                color: currentStep === 1 ? '#94A3B8' : '#334155',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '0.88rem'
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>

            {currentStep < 8 && (
              <button
                type="button"
                className="hm-btn-primary"
                onClick={nextStep}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  cursor: 'pointer'
                }}
              >
                <span>Continue to {STEPS[currentStep]?.label || 'Next'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
