import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Check, Upload, Sparkles, Star, 
  MapPin, ShieldCheck, Ruler, Scissors, Award, Info, X, 
  Camera, Eye, Layers, Palette, Armchair, Sliders, Truck, FileText
} from 'lucide-react';
import './SofasShopPage.css';
import { 
  SOFA_FABRICS, 
  SOFA_SPECIALISTS, 
  getCustomSofaDraft, 
  saveCustomSofaDraft, 
  addSofaToCart 
} from '../../utils/sofasStore';

const WIZARD_STEPS = [
  { id: 1, name: 'Silhouette' },
  { id: 2, name: 'Dimensions' },
  { id: 3, name: 'Frame & Legs' },
  { id: 4, name: 'Fabric' },
  { id: 5, name: 'Color' },
  { id: 6, name: 'Cushions' },
  { id: 7, name: 'Detailing' },
  { id: 8, name: 'Add-Ons' },
  { id: 9, name: 'Specialist' },
  { id: 10, name: 'Quote' }
];

const SILHOUETTE_OPTIONS = [
  { id: '3-seater', name: '3-Seater Classic', desc: 'Versatile deep living room sofa', basePrice: 28999, img: '/assets/sofas/prod_modern_3_seater.png' },
  { id: 'sectional', name: 'L-Shape Sectional', desc: 'Spacious corner chaise configuration', basePrice: 42999, img: '/assets/sofas/prod_lshape_sectional.png' },
  { id: 'recliner', name: 'Recliner Armchair', desc: 'Therapeutic high-back recliner', basePrice: 34999, img: '/assets/sofas/prod_recliner.png' },
  { id: 'sofa-bed', name: 'Sofa-Cum-Bed', desc: 'Convertible smooth pull-out runner', basePrice: 27999, img: '/assets/sofas/prod_sofa_cum_bed.png' },
  { id: 'accent', name: 'Fluted Accent Chair', desc: 'Sculptural reading statement chair', basePrice: 15999, img: '/assets/sofas/prod_accent_chair.png' },
  { id: 'chesterfield', name: 'Chesterfield Tufted', desc: 'Heritage deep button roll-arm', basePrice: 38999, img: '/assets/sofas/cat_sofa_sets.png' }
];

const FRAME_OPTIONS = [
  { id: 'teak', name: 'Solid Seasoned Teakwood', desc: '100% termite proof, 10-year durability guarantee', price: 5000 },
  { id: 'salwood', name: 'Kiln-Dried Salwood & Pinewood', desc: 'High-tensile structural standard', price: 0 },
  { id: 'brass-metal', name: 'Hardwood with Brushed Brass Metal Legs', desc: 'Sleek luxury mid-century accent', price: 3200 },
  { id: 'black-steel', name: 'Hardwood with Matte Black Steel Runners', desc: 'Industrial minimalist profile', price: 2400 }
];

const COLOR_PALETTE = [
  { name: 'Sand Beige', hex: '#E6D7C3' },
  { name: 'Slate Charcoal', hex: '#374151' },
  { name: 'Olive Moss', hex: '#556B2F' },
  { name: 'Midnight Navy', hex: '#1E3A8A' },
  { name: 'Forest Green', hex: '#2D4739' },
  { name: 'Emerald Peacock', hex: '#1B4D3E' },
  { name: 'Oxblood Burgundy', hex: '#4A0E17' },
  { name: 'Dusty Rose', hex: '#9E4856' },
  { name: 'Ochre Mustard', hex: '#D4AF37' },
  { name: 'Terracotta Earth', hex: '#C05638' },
  { name: 'Ivory Cream', hex: '#FDFBF7' },
  { name: 'Espresso Mocha', hex: '#3E2723' }
];

const CUSHION_CORE_OPTIONS = [
  { id: 'firm-40d', name: '40D High-Resilience Firm', desc: 'Ideal for lumbar spinal support, resists sagging for 10+ years', price: 0 },
  { id: 'plush-45d', name: '45D Luxury Cloud Comfort', desc: 'Balanced medium bounce with plush surface sink-in feeling', price: 2500 },
  { id: 'memory-dual', name: 'Dual-Layer Memory Foam Core', desc: 'Conforms to body heat and pressure points', price: 4200 },
  { id: 'feather-wrap', name: 'Orthopedic Foam with Feather Wrap', desc: 'Ultra-luxurious hotel penthouse softness', price: 5800 }
];

const DETAILING_OPTIONS = [
  { id: 'smooth', name: 'Contemporary Smooth Minimal', desc: 'Clean knife-edge tailored borders', price: 0 },
  { id: 'piping', name: 'Corded French Seam Piping', desc: 'Classic welt cord along all edges and arms', price: 1500 },
  { id: 'tufted', name: 'Deep Diamond Button Tufting', desc: 'Hand-pulled artisanal buttons with diamond folds', price: 3500 },
  { id: 'channel', name: 'Vertical Channel Fluting', desc: 'Linear ribbed backrest cushioning', price: 2500 }
];

const ACCESSORY_ADDONS = [
  { id: 'ottoman', name: 'Matching Upholstered Ottoman', price: 5999, desc: 'Footrest & movable bench' },
  { id: 'arm-covers', name: 'Detachable Armrest Slip Covers (Pair)', price: 1499, desc: 'Protects from oil and tea stains' },
  { id: 'lumbar-pillows', name: 'Matching Lumbar Bolster Pillows (Set of 2)', price: 1899, desc: 'Tailored with YKK zippers' },
  { id: 'usb-charger', name: 'Integrated USB-A & Fast Type-C Port', price: 2499, desc: 'Flush mount on side armrest' }
];

export default function SofaCustomWizardPage({ currentUser, showToast, onAddToCart }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [sofaConfig, setSofaConfig] = useState(() => {
    const saved = getCustomSofaDraft();
    return saved || {
      silhouette: SILHOUETTE_OPTIONS[0],
      length: '82',
      depth: '35',
      height: '33',
      unit: 'inches',
      chaiseOrientation: 'Right Chaise Facing',
      frame: FRAME_OPTIONS[0],
      fabric: SOFA_FABRICS[0],
      color: COLOR_PALETTE[0],
      cushion: CUSHION_CORE_OPTIONS[0],
      detailing: DETAILING_OPTIONS[0],
      selectedAddons: ['ottoman'],
      specialist: SOFA_SPECIALISTS[0],
      doorstepSwatchVisit: true,
      sketchFile: null,
      sketchPreview: null,
      specialNotes: ''
    };
  });

  // Save to draft on changes
  useEffect(() => {
    saveCustomSofaDraft(sofaConfig);
  }, [sofaConfig]);

  // Pricing Calculation
  const basePrice = sofaConfig.silhouette.basePrice;
  const frameExtra = sofaConfig.frame.price;
  const fabricExtra = sofaConfig.fabric.id === 'velvet' ? 3000 : (sofaConfig.fabric.id === 'leatherette' ? 2500 : 0);
  const cushionExtra = sofaConfig.cushion.price;
  const detailingExtra = sofaConfig.detailing.price;
  const addonsTotal = sofaConfig.selectedAddons.reduce((sum, addonId) => {
    const item = ACCESSORY_ADDONS.find(a => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);
  const totalPrice = basePrice + frameExtra + fabricExtra + cushionExtra + detailingExtra + addonsTotal;

  const handleNext = () => {
    if (step < 10) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/sofas');
    }
  };

  const handleSketchUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSofaConfig({
        ...sofaConfig,
        sketchFile: file.name,
        sketchPreview: url
      });
      if (showToast) showToast('Blueprint sketch attached successfully!');
    }
  };

  const toggleAddon = (addonId) => {
    const exists = sofaConfig.selectedAddons.includes(addonId);
    const updated = exists 
      ? sofaConfig.selectedAddons.filter(id => id !== addonId)
      : [...sofaConfig.selectedAddons, addonId];
    setSofaConfig({ ...sofaConfig, selectedAddons: updated });
  };

  const handleAddToCartAndProceed = () => {
    const customItem = {
      id: `custom-sofa-${Date.now()}`,
      name: `Bespoke ${sofaConfig.silhouette.name} (${sofaConfig.fabric.name})`,
      price: totalPrice,
      image: sofaConfig.sketchPreview || sofaConfig.silhouette.img,
      selectedColor: sofaConfig.color.name,
      selectedSize: `${sofaConfig.length}"L × ${sofaConfig.depth}"D × ${sofaConfig.height}"H`,
      fabric: sofaConfig.fabric.name,
      frame: sofaConfig.frame.name,
      cushion: sofaConfig.cushion.name,
      detailing: sofaConfig.detailing.name,
      specialist: sofaConfig.specialist.name,
      itemType: 'custom',
      quantity: 1
    };

    addSofaToCart(customItem);
    if (onAddToCart) onAddToCart(customItem);
    if (showToast) showToast('Custom Sofa Added to Cart! Master artisan assigned.');
    navigate('/cart');
  };

  return (
    <div className="sofa-shop-page-root" style={{ paddingTop: '20px' }}>
      <div className="sofa-featured-section" style={{ maxWidth: '1280px', margin: '0 auto 60px auto' }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button 
            type="button" 
            onClick={handleBack}
            style={{ background: 'none', border: 'none', color: '#E11D74', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 700 }}
          >
            <ArrowLeft size={18} />
            <span>{step === 1 ? 'Back to Sofas' : 'Previous Step'}</span>
          </button>

          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#64748B' }}>
            Step {step} of 10: <strong style={{ color: '#14213D' }}>{WIZARD_STEPS[step - 1].name}</strong>
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Estimate:</span>
            <strong style={{ fontSize: '1.25rem', color: '#E11D74', fontWeight: 800 }}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '36px' }}>
          <div 
            style={{ 
              width: `${(step / 10) * 100}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #E11D74 0%, #FF1684 100%)', 
              transition: 'width 0.35s ease' 
            }} 
          />
        </div>

        {/* Wizard Main Container */}
        <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #E2E8F0', padding: '40px 36px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
          
          {/* STEP 1: SILHOUETTE */}
          {step === 1 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 1 OF 10</span>
              <h2 className="sofa-section-title">Select Sofa Silhouette & Base Model</h2>
              <p className="sofa-section-subtitle">Pick the foundational layout and seating shape for your room.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '28px' }}>
                {SILHOUETTE_OPTIONS.map(sil => (
                  <div
                    key={sil.id}
                    onClick={() => setSofaConfig({ ...sofaConfig, silhouette: sil })}
                    style={{
                      borderRadius: '16px',
                      border: sofaConfig.silhouette.id === sil.id ? '2px solid #E11D74' : '1px solid #E2E8F0',
                      background: sofaConfig.silhouette.id === sil.id ? '#FDF2F8' : '#FFFFFF',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                  >
                    <div style={{ height: '170px', borderRadius: '10px', overflow: 'hidden', background: '#F8FAFC', marginBottom: '12px' }}>
                      <img src={sil.img} alt={sil.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#14213D' }}>{sil.name}</h4>
                      <strong style={{ color: '#E11D74', fontSize: '0.95rem' }}>₹{sil.basePrice.toLocaleString('en-IN')}</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>{sil.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: DIMENSIONS */}
          {step === 2 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 2 OF 10</span>
              <h2 className="sofa-section-title">Configure Exact Room Dimensions</h2>
              <p className="sofa-section-subtitle">Provide your exact dimensions so the master carpenter shapes the wood frame without error.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '32px' }} className="pdp-responsive-grid">
                <div>
                  <div className="form-group">
                    <label>Total Length ({sofaConfig.unit})</label>
                    <input 
                      type="number" 
                      value={sofaConfig.length}
                      onChange={e => setSofaConfig({ ...sofaConfig, length: e.target.value })}
                    />
                    <small style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Standard 3-Seater is typically 78" - 84"</small>
                  </div>

                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label>Seating Depth ({sofaConfig.unit})</label>
                    <input 
                      type="number" 
                      value={sofaConfig.depth}
                      onChange={e => setSofaConfig({ ...sofaConfig, depth: e.target.value })}
                    />
                    <small style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Standard deep lounge seating is 34" - 38"</small>
                  </div>

                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label>Backrest Height ({sofaConfig.unit})</label>
                    <input 
                      type="number" 
                      value={sofaConfig.height}
                      onChange={e => setSofaConfig({ ...sofaConfig, height: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label>Chaise Corner Orientation</label>
                    <select
                      value={sofaConfig.chaiseOrientation}
                      onChange={e => setSofaConfig({ ...sofaConfig, chaiseOrientation: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    >
                      <option value="Straight / No Chaise">Straight / No Chaise</option>
                      <option value="Left Chaise Facing">Left Chaise Facing (When looking at sofa)</option>
                      <option value="Right Chaise Facing">Right Chaise Facing (When looking at sofa)</option>
                      <option value="U-Shape Dual Chaise">U-Shape Dual Chaise</option>
                    </select>
                  </div>
                </div>

                <div style={{ background: '#FAF6F0', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#C2410C', marginBottom: '12px' }}>
                    <Ruler size={24} />
                    <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Doorway & Staircase Clearance Check</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                    Concerned about whether your custom sofa will fit through narrow apartment elevators or stairwells?
                  </p>
                  <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.82rem', color: '#14213D' }}>
                    ✓ <strong>Modular Knock-Down Assembly:</strong> Our frames can be built in detachable modules that click together seamlessly in your living room.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: FRAME & LEGS */}
          {step === 3 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 3 OF 10</span>
              <h2 className="sofa-section-title">Wood Frame & Leg Architecture</h2>
              <p className="sofa-section-subtitle">The internal skeleton determines longevity and load bearing strength.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginTop: '28px' }}>
                {FRAME_OPTIONS.map(fr => (
                  <div
                    key={fr.id}
                    onClick={() => setSofaConfig({ ...sofaConfig, frame: fr })}
                    style={{
                      borderRadius: '16px',
                      border: sofaConfig.frame.id === fr.id ? '2px solid #E11D74' : '1px solid #E2E8F0',
                      background: sofaConfig.frame.id === fr.id ? '#FDF2F8' : '#FFFFFF',
                      padding: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: '#14213D' }}>{fr.name}</h4>
                      <strong style={{ color: '#E11D74', fontSize: '0.9rem' }}>
                        {fr.price === 0 ? 'Included' : `+₹${fr.price.toLocaleString('en-IN')}`}
                      </strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B', lineHeight: '1.4' }}>{fr.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: FABRIC */}
          {step === 4 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 4 OF 10</span>
              <h2 className="sofa-section-title">Select Upholstery Fabric Grade</h2>
              <p className="sofa-section-subtitle">Pick from our 10 curated upholstery textures.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '28px' }}>
                {SOFA_FABRICS.map(fab => (
                  <div
                    key={fab.id}
                    onClick={() => setSofaConfig({ ...sofaConfig, fabric: fab })}
                    style={{
                      borderRadius: '14px',
                      border: sofaConfig.fabric.id === fab.id ? '2px solid #E11D74' : '1px solid #E2E8F0',
                      background: sofaConfig.fabric.id === fab.id ? '#FDF2F8' : '#FFFFFF',
                      padding: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ height: '110px', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
                      <img src={fab.img} alt={fab.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h5 style={{ margin: '0 0 2px 0', fontSize: '0.92rem', color: '#14213D' }}>{fab.name}</h5>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>{fab.season}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: COLOR */}
          {step === 5 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 5 OF 10</span>
              <h2 className="sofa-section-title">Select Color Palette</h2>
              <p className="sofa-section-subtitle">Chosen Shade: <strong style={{ color: '#E11D74' }}>{sofaConfig.color.name}</strong></p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginTop: '28px' }}>
                {COLOR_PALETTE.map((col, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSofaConfig({ ...sofaConfig, color: col })}
                    style={{
                      padding: '16px 12px',
                      borderRadius: '14px',
                      border: sofaConfig.color.name === col.name ? '2px solid #E11D74' : '1px solid #E2E8F0',
                      background: sofaConfig.color.name === col.name ? '#FDF2F8' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <div 
                      style={{ 
                        width: '42px', 
                        height: '42px', 
                        borderRadius: '50%', 
                        background: col.hex, 
                        border: '2px solid #FFFFFF', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)' 
                      }} 
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#14213D', textAlign: 'center' }}>
                      {col.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: CUSHIONS */}
          {step === 6 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 6 OF 10</span>
              <h2 className="sofa-section-title">Cushion Core & Ergonomic Density</h2>
              <p className="sofa-section-subtitle">Select seating firmness for your daily lounging preferences.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginTop: '28px' }}>
                {CUSHION_CORE_OPTIONS.map(cush => (
                  <div
                    key={cush.id}
                    onClick={() => setSofaConfig({ ...sofaConfig, cushion: cush })}
                    style={{
                      borderRadius: '16px',
                      border: sofaConfig.cushion.id === cush.id ? '2px solid #E11D74' : '1px solid #E2E8F0',
                      background: sofaConfig.cushion.id === cush.id ? '#FDF2F8' : '#FFFFFF',
                      padding: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: '#14213D' }}>{cush.name}</h4>
                      <strong style={{ color: '#E11D74', fontSize: '0.9rem' }}>
                        {cush.price === 0 ? 'Included' : `+₹${cush.price.toLocaleString('en-IN')}`}
                      </strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B', lineHeight: '1.4' }}>{cush.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: DETAILING */}
          {step === 7 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 7 OF 10</span>
              <h2 className="sofa-section-title">Stitching Style & Backrest Detailing</h2>
              <p className="sofa-section-subtitle">Add tailored couture touches like French corded piping or button tufts.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginTop: '28px' }}>
                {DETAILING_OPTIONS.map(det => (
                  <div
                    key={det.id}
                    onClick={() => setSofaConfig({ ...sofaConfig, detailing: det })}
                    style={{
                      borderRadius: '16px',
                      border: sofaConfig.detailing.id === det.id ? '2px solid #E11D74' : '1px solid #E2E8F0',
                      background: sofaConfig.detailing.id === det.id ? '#FDF2F8' : '#FFFFFF',
                      padding: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: '#14213D' }}>{det.name}</h4>
                      <strong style={{ color: '#E11D74', fontSize: '0.9rem' }}>
                        {det.price === 0 ? 'Included' : `+₹${det.price.toLocaleString('en-IN')}`}
                      </strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B', lineHeight: '1.4' }}>{det.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 8: ADD-ONS */}
          {step === 8 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 8 OF 10</span>
              <h2 className="sofa-section-title">Add-On Living Room Accessories</h2>
              <p className="sofa-section-subtitle">Complement your bespoke sofa with coordinated artisanal items.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginTop: '28px' }}>
                {ACCESSORY_ADDONS.map(ad => {
                  const isChecked = sofaConfig.selectedAddons.includes(ad.id);
                  return (
                    <div
                      key={ad.id}
                      onClick={() => toggleAddon(ad.id)}
                      style={{
                        borderRadius: '16px',
                        border: isChecked ? '2px solid #E11D74' : '1px solid #E2E8F0',
                        background: isChecked ? '#FDF2F8' : '#FFFFFF',
                        padding: '20px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                        <h4 style={{ margin: 0, fontSize: '1rem', color: '#14213D' }}>{ad.name}</h4>
                        <strong style={{ color: '#E11D74', fontSize: '0.9rem' }}>+₹{ad.price.toLocaleString('en-IN')}</strong>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B', lineHeight: '1.4' }}>{ad.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 9: SPECIALIST SELECTION */}
          {step === 9 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 9 OF 10</span>
              <h2 className="sofa-section-title">Choose Your Doorstep Master Upholsterer</h2>
              <p className="sofa-section-subtitle">Our certified artisan visits your living room to verify dimensions and show physical fabric swatches.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '28px' }}>
                {SOFA_SPECIALISTS.map(spec => (
                  <div
                    key={spec.id}
                    onClick={() => setSofaConfig({ ...sofaConfig, specialist: spec })}
                    style={{
                      borderRadius: '16px',
                      border: sofaConfig.specialist.id === spec.id ? '2px solid #E11D74' : '1px solid #E2E8F0',
                      background: sofaConfig.specialist.id === spec.id ? '#FDF2F8' : '#FFFFFF',
                      padding: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', background: '#F1F5F9' }}>
                        <img src={spec.avatar} alt={spec.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#14213D' }}>{spec.name}</h4>
                        <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>{spec.badge}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 10px 0' }}>{spec.specialty}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94A3B8', borderTop: '1px solid #E2E8F0', paddingTop: '8px' }}>
                      <span>⭐ {spec.rating} ({spec.reviews} reviews)</span>
                      <span>📍 {spec.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 10: QUOTE & REVIEW */}
          {step === 10 && (
            <div>
              <span className="sofa-section-eyebrow">STEP 10 OF 10</span>
              <h2 className="sofa-section-title">Bespoke Design Review & Live Estimate</h2>
              <p className="sofa-section-subtitle">Review your custom configuration before confirming your artisan order.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '36px', marginTop: '32px' }} className="pdp-responsive-grid">
                
                {/* Configuration Specs List */}
                <div style={{ background: '#FAF6F0', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0' }}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#14213D' }}>Design Summary</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748B' }}>Silhouette:</span>
                      <strong style={{ color: '#14213D' }}>{sofaConfig.silhouette.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748B' }}>Dimensions:</span>
                      <strong style={{ color: '#14213D' }}>{sofaConfig.length}" L × {sofaConfig.depth}" D × {sofaConfig.height}" H ({sofaConfig.chaiseOrientation})</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748B' }}>Internal Frame:</span>
                      <strong style={{ color: '#14213D' }}>{sofaConfig.frame.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748B' }}>Fabric & Color:</span>
                      <strong style={{ color: '#14213D' }}>{sofaConfig.fabric.name} ({sofaConfig.color.name})</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748B' }}>Cushion Core:</span>
                      <strong style={{ color: '#14213D' }}>{sofaConfig.cushion.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748B' }}>Detailing:</span>
                      <strong style={{ color: '#14213D' }}>{sofaConfig.detailing.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748B' }}>Assigned Master:</span>
                      <strong style={{ color: '#14213D' }}>{sofaConfig.specialist.name}</strong>
                    </div>
                  </div>

                  {/* Upload Sketch / Blueprint */}
                  <div style={{ marginTop: '24px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#14213D', display: 'block', marginBottom: '8px' }}>
                      Attach Living Room Photo or Blueprint Sketch (Optional)
                    </label>
                    <input 
                      type="file" 
                      accept="image/*,.pdf" 
                      onChange={handleSketchUpload} 
                      style={{ fontSize: '0.82rem' }}
                    />
                    {sofaConfig.sketchPreview && (
                      <div style={{ marginTop: '10px', height: '100px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={sofaConfig.sketchPreview} alt="Uploaded sketch" style={{ height: '100%', objectFit: 'contain' }} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Price Breakdown & Confirmation */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#14213D' }}>Price Breakdown</h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Base Frame & Silhouette:</span>
                        <span>₹{basePrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Wood Architecture:</span>
                        <span>+₹{frameExtra.toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Fabric & Color:</span>
                        <span>+₹{fabricExtra.toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Cushion Core:</span>
                        <span>+₹{cushionExtra.toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Artisanal Detailing:</span>
                        <span>+₹{detailingExtra.toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Accessories & Add-ons:</span>
                        <span>+₹{addonsTotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 600 }}>
                        <span>Doorstep Swatch Inspection Visit:</span>
                        <span>FREE</span>
                      </div>
                    </div>

                    <div style={{ borderTop: '2px dashed #E2E8F0', marginTop: '16px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: '#14213D' }}>Total Cost:</span>
                      <strong style={{ fontSize: '1.8rem', fontWeight: 800, color: '#E11D74' }}>
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button 
                      type="button" 
                      className="sofa-btn-primary"
                      onClick={handleAddToCartAndProceed}
                      style={{ padding: '16px', fontSize: '1rem', width: '100%' }}
                    >
                      Book Bespoke Sofa & Doorstep Visit
                    </button>
                    <button 
                      type="button" 
                      className="sofa-btn-secondary"
                      onClick={() => {
                        if (showToast) showToast('Configuration saved to your drafts!');
                        navigate('/sofas');
                      }}
                      style={{ width: '100%', padding: '12px' }}
                    >
                      Save Draft & Exit
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {step < 10 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
              <button 
                type="button"
                onClick={handleBack}
                className="sofa-btn-secondary"
              >
                Back
              </button>

              <button 
                type="button"
                onClick={handleNext}
                className="sofa-btn-primary"
              >
                <span>Continue to {WIZARD_STEPS[step]?.name}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
