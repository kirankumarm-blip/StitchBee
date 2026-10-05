import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Check, Upload, Sparkles, Star, 
  MapPin, ShieldCheck, Ruler, Scissors, Award, Info, X, Camera, Eye
} from 'lucide-react';
import './PetOutfitsPage.css';
import { 
  PET_FABRICS, 
  VERIFIED_PET_TAILORS, 
  getPetOutfitsCustomDraft, 
  savePetOutfitsCustomDraft, 
  submitCustomPetOutfitOrder 
} from '../../utils/petOutfitsStore';

const WIZARD_STEPS = [
  { id: 1, name: 'Pet' },
  { id: 2, name: 'Outfit' },
  { id: 3, name: 'Measurements' },
  { id: 4, name: 'Fabric' },
  { id: 5, name: 'Color' },
  { id: 6, name: 'Personalize' },
  { id: 7, name: 'Preview' },
  { id: 8, name: 'Tailor' },
  { id: 9, name: 'Quote' }
];

const OUTFIT_OPTIONS = [
  { id: 'shirt', name: 'Shirt', icon: '👔', desc: 'Classic collared button-down', price: 799 },
  { id: 'tshirt', name: 'T-Shirt', icon: '👕', desc: 'Everyday comfortable playwear', price: 599 },
  { id: 'dress', name: 'Dress', icon: '👗', desc: 'Flouncy ruffled frock', price: 799 },
  { id: 'frock', name: 'Party Frock', icon: '✨', desc: 'Layered organza skirt', price: 899 },
  { id: 'hoodie', name: 'Hoodie', icon: '🧥', desc: 'Warm fleece with pouch', price: 999 },
  { id: 'jacket', name: 'Rain Jacket', icon: '🌧️', desc: 'Waterproof outdoor protection', price: 1099 },
  { id: 'kurta', name: 'Ethnic Kurta', icon: '👑', desc: 'Festive silk mandarin kurta', price: 1199 },
  { id: 'lehenga', name: 'Festive Lehenga', icon: '🌸', desc: 'Royal Benarasi brocade', price: 1399 },
  { id: 'traditional', name: 'Traditional Outfit', icon: '🪔', desc: 'Diwali & Wedding attire', price: 1299 },
  { id: 'festive', name: 'Festive Tuxedo', icon: '🎩', desc: 'Formal bow-tie gentleman suit', price: 1499 },
  { id: 'party', name: 'Party Outfit', icon: '🎉', desc: 'Sequined birthday outfit', price: 1099 },
  { id: 'custom', name: 'Custom Bespoke Design', icon: '✂️', desc: 'Bring your own exact sketch', price: 1599 }
];

const COLOR_OPTIONS = [
  { name: 'Crimson Red', hex: '#C82333' },
  { name: 'Royal Navy', hex: '#1C355E' },
  { name: 'Marigold Yellow', hex: '#E8A317' },
  { name: 'Blush Pink', hex: '#EFA1B1' },
  { name: 'Emerald Green', hex: '#1C6B45' },
  { name: 'Royal Cream', hex: '#F4ECD8' },
  { name: 'Heather Grey', hex: '#9E9E9E' },
  { name: 'Midnight Black', hex: '#1A1A1A' }
];

export default function PetCustomWizardPage({ currentUser, showToast }) {
  const navigate = useNavigate();

  // Load initial draft or default
  const [step, setStep] = useState(1);
  const [petData, setPetData] = useState(() => {
    const saved = getPetOutfitsCustomDraft();
    return saved || {
      petType: 'Dog',
      petName: 'Leo',
      breed: 'Golden Retriever',
      age: '2 Years',
      gender: 'Male',
      weight: '28',
      petPhoto: '/assets/pets/hero_page.png',
      outfit: 'Ethnic Kurta',
      outfitPrice: 1199,
      unit: 'cm',
      measurements: {
        neck: '42',
        chest: '68',
        backLength: '52',
        waist: '55',
        weight: '28'
      },
      needTailorAssistance: false,
      fabric: 'Soft Cotton',
      fabricUpgrade: 0,
      color: 'Marigold Yellow',
      personalization: {
        enabled: true,
        text: 'Leo',
        style: 'Monogram Script',
        threadColor: 'Gold Zari',
        placement: 'Back Collar'
      },
      selectedTailor: VERIFIED_PET_TAILORS[0]
    };
  });

  const [tailorFilter, setTailorFilter] = useState('all');
  const [tailorSort, setTailorSort] = useState('recommended');
  const [isMeasureGuideOpen, setIsMeasureGuideOpen] = useState(false);

  // Auto-save draft
  useEffect(() => {
    savePetOutfitsCustomDraft(petData);
  }, [petData]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        if (showToast) showToast('File size exceeds 8MB. Please choose a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setPetData(prev => ({ ...prev, petPhoto: event.target.result }));
        if (showToast) showToast('Pet photo uploaded successfully! 🐾');
      };
      reader.readAsDataURL(file);
    }
  };

  // Quote Calculation
  const basePrice = petData.outfitPrice || 1199;
  const fabricPrice = petData.fabricUpgrade || 0;
  const personalizationFee = petData.personalization?.enabled ? 150 : 0;
  const tailorFee = petData.selectedTailor ? 199 : 0;
  const pickupFee = petData.needTailorAssistance ? 99 : 0;
  const deliveryFee = 0; // Complimentary
  const taxes = Math.round((basePrice + fabricPrice + personalizationFee + tailorFee) * 0.05);
  const discount = 200; // Festive discount
  const totalPrice = Math.max(0, basePrice + fabricPrice + personalizationFee + tailorFee + pickupFee + taxes - discount);

  const quoteBreakdown = {
    basePrice,
    fabricPrice,
    personalizationFee,
    tailorFee,
    pickupFee,
    deliveryFee,
    taxes,
    discount,
    total: totalPrice
  };

  const handleNext = () => {
    if (step === 1) {
      if (!petData.petName.trim()) {
        if (showToast) showToast("Please enter your pet's name.");
        return;
      }
    }
    if (step < 9) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/pet-outfits');
    }
  };

  const handleSaveDesign = () => {
    savePetOutfitsCustomDraft({ ...petData, quote: quoteBreakdown });
    if (showToast) {
      showToast(`Custom design for ${petData.petName} saved! You can return anytime. 💾`);
    }
  };

  const handleProceedToCheckout = () => {
    submitCustomPetOutfitOrder({
      ...petData,
      quote: quoteBreakdown
    });
    if (showToast) {
      showToast(`Custom outfit for ${petData.petName} added to cart! 🛍️`);
    }
    navigate('/checkout');
  };

  const filteredTailors = VERIFIED_PET_TAILORS.filter(t => {
    if (tailorFilter === 'pickup') return t.homePickup;
    if (tailorFilter === 'delivery') return t.homeDelivery;
    return true;
  });

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--pet-bg)', paddingBottom: '90px' }}>
      
      {/* Top Wizard Navigation Bar */}
      <div style={{ background: 'var(--pet-card)', borderBottom: '1px solid var(--pet-border)', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 99 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <button
            type="button"
            onClick={handlePrev}
            style={{ background: 'none', border: 'none', color: 'var(--pet-text-heading)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div style={{ textAlign: 'center' }}>
            <span className="pet-eyebrow">CUSTOM PET OUTFIT STUDIO</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--pet-text-heading)' }}>
              Step {step} of 9: {WIZARD_STEPS[step - 1]?.name}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveDesign}
            style={{ background: 'var(--pet-pink-light)', color: 'var(--pet-pink)', border: '1px solid rgba(255,22,132,0.3)', borderRadius: '20px', padding: '6px 14px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Save Draft 💾
          </button>

        </div>

        {/* Progress Tracker Dots */}
        <div style={{ maxWidth: '1000px', margin: '14px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {WIZARD_STEPS.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div 
                onClick={() => setStep(s.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  opacity: s.id <= step ? 1 : 0.45
                }}
              >
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: s.id === step ? 'var(--pet-pink)' : (s.id < step ? '#14213D' : 'var(--pet-border)'),
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: s.id === step ? '0 0 0 3px rgba(255,22,132,0.25)' : 'none'
                }}>
                  {s.id < step ? <Check size={14} /> : s.id}
                </div>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, marginTop: '4px', color: s.id === step ? 'var(--pet-pink)' : 'var(--pet-text-heading)' }}>
                  {s.name}
                </span>
              </div>
              {idx < WIZARD_STEPS.length - 1 && (
                <div style={{ flex: 1, height: '2px', background: s.id < step ? 'var(--pet-pink)' : 'var(--pet-border)', margin: '0 6px', marginBottom: '14px' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Wizard Content Area */}
      <div style={{ maxWidth: '960px', margin: '36px auto 0', padding: '0 20px' }}>
        
        {/* STEP 1: PET DETAILS */}
        {step === 1 && (
          <div style={{ background: 'var(--pet-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--pet-border)', boxShadow: 'var(--pet-shadow-md)' }}>
            <span className="pet-eyebrow">STEP 1</span>
            <h2 className="pet-heading" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>Tell Us About Your Pet</h2>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Every pet is unique. Help our master tailors customize the ideal fit and design.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '6px' }}>Pet Type</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['Dog 🐕', 'Cat 🐈', 'Other 🐾'].map(pt => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setPetData({ ...petData, petType: pt.split(' ')[0] })}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: petData.petType === pt.split(' ')[0] ? '2px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                        background: petData.petType === pt.split(' ')[0] ? 'var(--pet-pink-light)' : 'var(--pet-surface)',
                        color: petData.petType === pt.split(' ')[0] ? 'var(--pet-pink)' : 'var(--pet-text-heading)'
                      }}
                    >
                      {pt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '6px' }}>Pet's Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Bruno, Simba, Bella"
                  value={petData.petName}
                  onChange={e => setPetData({ ...petData, petName: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--pet-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '6px' }}>Breed</label>
                <input
                  type="text"
                  placeholder="e.g. Beagle, Persian, Shih Tzu"
                  value={petData.breed}
                  onChange={e => setPetData({ ...petData, breed: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--pet-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '6px' }}>Approx. Weight (kg)</label>
                <input
                  type="number"
                  placeholder="e.g. 15"
                  value={petData.weight}
                  onChange={e => setPetData({ ...petData, weight: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--pet-border)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Photo Upload Box */}
            <div style={{
              border: '2px dashed var(--pet-border)',
              borderRadius: '16px',
              padding: '28px',
              textAlign: 'center',
              background: 'var(--pet-surface)'
            }}>
              {petData.petPhoto ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                  <img src={petData.petPhoto} alt="Pet Preview" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--pet-pink)' }} />
                  <div style={{ textAlign: 'left' }}>
                    <strong style={{ display: 'block', color: 'var(--pet-text-heading)', fontSize: '1rem' }}>Photo Uploaded!</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--pet-text-muted)' }}>Tailor will review photo to ensure perfect neck and armhole fit.</span>
                    <div style={{ marginTop: '8px' }}>
                      <label style={{ color: 'var(--pet-pink)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                        Change Photo
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Camera size={38} color="var(--pet-pink)" style={{ margin: '0 auto 10px' }} />
                  <h4 style={{ margin: '0 0 6px', color: 'var(--pet-text-heading)' }}>Upload Your Pet's Photo</h4>
                  <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.82rem', margin: '0 0 14px' }}>PNG, JPG or WEBP up to 8MB. Helps tailor visualize coat and posture.</p>
                  <label className="pet-btn-primary" style={{ padding: '8px 20px', fontSize: '0.84rem', cursor: 'pointer' }}>
                    <Upload size={14} /> Browse Photo
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: OUTFIT SELECTION */}
        {step === 2 && (
          <div style={{ background: 'var(--pet-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--pet-border)', boxShadow: 'var(--pet-shadow-md)' }}>
            <span className="pet-eyebrow">STEP 2</span>
            <h2 className="pet-heading" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>Choose Your Pet's Outfit</h2>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Select the garment silhouette you'd like our tailors to handcraft for {petData.petName}.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
              {OUTFIT_OPTIONS.map(opt => {
                const isSelected = petData.outfit === opt.name;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setPetData({ ...petData, outfit: opt.name, outfitPrice: opt.price })}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                      background: isSelected ? 'var(--pet-pink-light)' : 'var(--pet-surface)',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 14px rgba(255,22,132,0.18)' : 'none'
                    }}
                  >
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--pet-pink)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} />
                      </div>
                    )}
                    <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '6px' }}>{opt.icon}</span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--pet-text-heading)', display: 'block' }}>{opt.name}</strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--pet-text-muted)', display: 'block', margin: '3px 0 8px' }}>{opt.desc}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--pet-pink)' }}>From ₹{opt.price}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: MEASUREMENTS */}
        {step === 3 && (
          <div style={{ background: 'var(--pet-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--pet-border)', boxShadow: 'var(--pet-shadow-md)' }}>
            <span className="pet-eyebrow">STEP 3</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h2 className="pet-heading" style={{ fontSize: '1.9rem', margin: 0 }}>Perfect Fit Measurements</h2>
              <button
                type="button"
                onClick={() => setIsMeasureGuideOpen(true)}
                style={{ background: 'none', border: 'none', color: 'var(--pet-pink)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Ruler size={16} /> How to Measure?
              </button>
            </div>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Provide {petData.petName}'s measurements for an exact bespoke fit.</p>

            {/* Assistance Toggle */}
            <div style={{ background: 'var(--pet-surface)', border: '1px solid var(--pet-border)', padding: '14px 18px', borderRadius: '12px', marginBottom: '22px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem', color: 'var(--pet-text-heading)' }}>
                <input
                  type="checkbox"
                  checked={petData.needTailorAssistance}
                  onChange={e => setPetData({ ...petData, needTailorAssistance: e.target.checked })}
                  style={{ accentColor: 'var(--pet-pink)', width: '16px', height: '16px' }}
                />
                I Don't Know My Pet's Measurements (Request Doorstep Tailor Measurement Assistance +₹99)
              </label>
            </div>

            {!petData.needTailorAssistance && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '4px' }}>Neck Circumference ({petData.unit})</label>
                  <input
                    type="number"
                    placeholder="e.g. 38"
                    value={petData.measurements.neck}
                    onChange={e => setPetData({ ...petData, measurements: { ...petData.measurements, neck: e.target.value } })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--pet-border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '4px' }}>Chest Girth ({petData.unit})</label>
                  <input
                    type="number"
                    placeholder="e.g. 62"
                    value={petData.measurements.chest}
                    onChange={e => setPetData({ ...petData, measurements: { ...petData.measurements, chest: e.target.value } })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--pet-border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '4px' }}>Back Length ({petData.unit})</label>
                  <input
                    type="number"
                    placeholder="e.g. 48"
                    value={petData.measurements.backLength}
                    onChange={e => setPetData({ ...petData, measurements: { ...petData.measurements, backLength: e.target.value } })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--pet-border)' }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: FABRIC SELECTION */}
        {step === 4 && (
          <div style={{ background: 'var(--pet-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--pet-border)', boxShadow: 'var(--pet-shadow-md)' }}>
            <span className="pet-eyebrow">STEP 4</span>
            <h2 className="pet-heading" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>Select Premium Fabric</h2>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>All fabrics are veterinarian-approved, fur-safe, and breathable.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {PET_FABRICS.map(fab => {
                const isSelected = petData.fabric === fab.name;
                return (
                  <div
                    key={fab.id}
                    onClick={() => setPetData({ ...petData, fabric: fab.name, fabricUpgrade: fab.name.includes('Festive') || fab.name.includes('Velvet') ? 200 : 0 })}
                    style={{
                      border: isSelected ? '2px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: 'var(--pet-card)',
                      boxShadow: isSelected ? '0 4px 14px rgba(255,22,132,0.18)' : 'none'
                    }}
                  >
                    <img src={fab.img} alt={fab.name} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                    <div style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--pet-text-heading)' }}>{fab.name}</strong>
                        {isSelected && <Check size={16} color="var(--pet-pink)" />}
                      </div>
                      <p style={{ fontSize: '0.74rem', color: 'var(--pet-text-muted)', margin: '4px 0 8px' }}>{fab.desc}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--pet-text-heading)', fontWeight: 600 }}>
                        <span>Softness: {fab.softness}</span>
                        <span>Warmth: {fab.warmth}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: COLOR SELECTION */}
        {step === 5 && (
          <div style={{ background: 'var(--pet-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--pet-border)', boxShadow: 'var(--pet-shadow-md)' }}>
            <span className="pet-eyebrow">STEP 5</span>
            <h2 className="pet-heading" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>Select Primary Color</h2>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Chosen Color: <strong style={{ color: 'var(--pet-pink)' }}>{petData.color}</strong></p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px' }}>
              {COLOR_OPTIONS.map(col => {
                const isSelected = petData.color === col.name;
                return (
                  <div
                    key={col.name}
                    onClick={() => setPetData({ ...petData, color: col.name })}
                    style={{
                      border: isSelected ? '2px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                      borderRadius: '12px',
                      padding: '14px 10px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: 'var(--pet-surface)',
                      boxShadow: isSelected ? '0 4px 12px rgba(255,22,132,0.18)' : 'none'
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: col.hex,
                      margin: '0 auto 8px',
                      border: '2px solid #FFF',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF'
                    }}>
                      {isSelected && <Check size={16} />}
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pet-text-heading)' }}>
                      {col.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: PERSONALIZATION */}
        {step === 6 && (
          <div style={{ background: 'var(--pet-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--pet-border)', boxShadow: 'var(--pet-shadow-md)' }}>
            <span className="pet-eyebrow">STEP 6</span>
            <h2 className="pet-heading" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>Add Pet Name / Embroidery</h2>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Make {petData.petName}'s outfit truly one-of-a-kind with artisan needlework.</p>

            <div style={{ background: 'var(--pet-surface)', padding: '20px', borderRadius: '14px', border: '1px solid var(--pet-border)', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', color: 'var(--pet-text-heading)' }}>
                <input
                  type="checkbox"
                  checked={petData.personalization?.enabled}
                  onChange={e => setPetData({ ...petData, personalization: { ...petData.personalization, enabled: e.target.checked } })}
                  style={{ accentColor: 'var(--pet-pink)', width: '18px', height: '18px' }}
                />
                Include Custom Embroidery (+₹150)
              </label>

              {petData.personalization?.enabled && (
                <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '4px' }}>Name / Initials</label>
                    <input
                      type="text"
                      placeholder="e.g. Leo, Prince Leo"
                      value={petData.personalization.text}
                      onChange={e => setPetData({ ...petData, personalization: { ...petData.personalization, text: e.target.value } })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--pet-border)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pet-text-heading)', marginBottom: '4px' }}>Embroidery Thread Color</label>
                    <select
                      value={petData.personalization.threadColor}
                      onChange={e => setPetData({ ...petData, personalization: { ...petData.personalization, threadColor: e.target.value } })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--pet-border)' }}
                    >
                      <option value="Gold Zari">Gold Zari Thread</option>
                      <option value="Silken Silver">Silken Silver</option>
                      <option value="Rani Pink">Rani Pink</option>
                      <option value="Ivory White">Ivory White</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 7: PREVIEW */}
        {step === 7 && (
          <div style={{ background: 'var(--pet-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--pet-border)', boxShadow: 'var(--pet-shadow-md)' }}>
            <span className="pet-eyebrow">STEP 7</span>
            <h2 className="pet-heading" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>Review Your Pet Outfit</h2>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Check all details before choosing your dedicated artisan tailor.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '28px', alignItems: 'start' }}>
              <div style={{ textAlign: 'center' }}>
                <img src={petData.petPhoto} alt="pet" style={{ width: '180px', height: '180px', borderRadius: '20px', objectFit: 'cover', border: '3px solid var(--pet-pink)', margin: '0 auto 12px' }} />
                <h4 style={{ margin: 0, color: 'var(--pet-text-heading)' }}>{petData.petName} ({petData.breed})</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--pet-text-muted)' }}>{petData.petType} • {petData.weight}kg</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--pet-surface)', borderRadius: '10px' }}>
                  <span><strong>Outfit Style:</strong> {petData.outfit}</span>
                  <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: 'var(--pet-pink)', fontWeight: 700, cursor: 'pointer' }}>Edit →</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--pet-surface)', borderRadius: '10px' }}>
                  <span><strong>Fabric & Color:</strong> {petData.fabric} ({petData.color})</span>
                  <button onClick={() => setStep(4)} style={{ background: 'none', border: 'none', color: 'var(--pet-pink)', fontWeight: 700, cursor: 'pointer' }}>Edit →</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--pet-surface)', borderRadius: '10px' }}>
                  <span><strong>Measurements:</strong> Neck {petData.measurements.neck || 'Standard'}cm, Chest {petData.measurements.chest || 'Standard'}cm</span>
                  <button onClick={() => setStep(3)} style={{ background: 'none', border: 'none', color: 'var(--pet-pink)', fontWeight: 700, cursor: 'pointer' }}>Edit →</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--pet-surface)', borderRadius: '10px' }}>
                  <span><strong>Personalization:</strong> {petData.personalization?.enabled ? `${petData.personalization.text} (${petData.personalization.threadColor})` : 'None'}</span>
                  <button onClick={() => setStep(6)} style={{ background: 'none', border: 'none', color: 'var(--pet-pink)', fontWeight: 700, cursor: 'pointer' }}>Edit →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: CHOOSE NEARBY TAILOR */}
        {step === 8 && (
          <div style={{ background: 'var(--pet-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--pet-border)', boxShadow: 'var(--pet-shadow-md)' }}>
            <span className="pet-eyebrow">STEP 8</span>
            <h2 className="pet-heading" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>Choose a Tailor Near You</h2>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>Select from verified certified pet couturiers in your locality.</p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setTailorFilter('all')}
                style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', border: tailorFilter === 'all' ? '1px solid var(--pet-pink)' : '1px solid var(--pet-border)', background: tailorFilter === 'all' ? 'var(--pet-pink-light)' : 'var(--pet-surface)', color: tailorFilter === 'all' ? 'var(--pet-pink)' : 'var(--pet-text-heading)' }}
              >
                All Verified Tailors
              </button>
              <button
                type="button"
                onClick={() => setTailorFilter('pickup')}
                style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', border: tailorFilter === 'pickup' ? '1px solid var(--pet-pink)' : '1px solid var(--pet-border)', background: tailorFilter === 'pickup' ? 'var(--pet-pink-light)' : 'var(--pet-surface)', color: tailorFilter === 'pickup' ? 'var(--pet-pink)' : 'var(--pet-text-heading)' }}
              >
                Home Pickup Available
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredTailors.map(tailor => {
                const isSelected = petData.selectedTailor?.id === tailor.id;
                return (
                  <div
                    key={tailor.id}
                    onClick={() => setPetData({ ...petData, selectedTailor: tailor })}
                    style={{
                      border: isSelected ? '2px solid var(--pet-pink)' : '1px solid var(--pet-border)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isSelected ? 'var(--pet-pink-light)' : 'var(--pet-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img src={tailor.avatar} alt={tailor.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '1.05rem', color: 'var(--pet-text-heading)' }}>{tailor.name}</strong>
                          <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#15803D', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>VERIFIED</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--pet-text-muted)' }}>📍 {tailor.locality} • {tailor.dist} away</span>
                        <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                          {tailor.specialties.map(sp => (
                            <span key={sp} style={{ fontSize: '0.7rem', background: '#FFF', padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--pet-border)' }}>{sp}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', color: '#F59E0B', fontWeight: 800 }}>
                        <Star size={14} fill="#F59E0B" /> {tailor.rating} ({tailor.reviewCount})
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--pet-text-muted)', display: 'block', margin: '4px 0' }}>Est: {tailor.turnaround}</span>
                      <button
                        type="button"
                        className="pet-btn-primary"
                        style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                      >
                        {isSelected ? '✓ Selected' : 'Select Tailor'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 9: QUOTE */}
        {step === 9 && (
          <div style={{ background: 'var(--pet-card)', padding: '32px', borderRadius: '20px', border: '1px solid var(--pet-border)', boxShadow: 'var(--pet-shadow-md)' }}>
            <span className="pet-eyebrow">STEP 9</span>
            <h2 className="pet-heading" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>Your Custom Outfit Quote</h2>
            <p style={{ color: 'var(--pet-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Transparent pricing with zero hidden charges. Handcrafted by {petData.selectedTailor?.name}.</p>

            <div style={{ background: 'var(--pet-surface)', borderRadius: '16px', padding: '24px', border: '1px solid var(--pet-border)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--pet-border)', fontSize: '0.9rem' }}>
                <span>Base Handcrafted Outfit ({petData.outfit})</span>
                <strong>₹{basePrice}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--pet-border)', fontSize: '0.9rem' }}>
                <span>Fabric Selection ({petData.fabric})</span>
                <strong>{fabricPrice > 0 ? `+₹${fabricPrice}` : 'Included'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--pet-border)', fontSize: '0.9rem' }}>
                <span>Artisan Name Embroidery</span>
                <strong>{personalizationFee > 0 ? `+₹${personalizationFee}` : 'Free'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--pet-border)', fontSize: '0.9rem' }}>
                <span>Certified Pet Tailor Bench Fee ({petData.selectedTailor?.name})</span>
                <strong>+₹{tailorFee}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--pet-border)', fontSize: '0.9rem' }}>
                <span>Doorstep Insured Delivery</span>
                <strong style={{ color: '#15803D' }}>FREE</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--pet-border)', fontSize: '0.9rem' }}>
                <span>GST (5%)</span>
                <strong>+₹{taxes}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--pet-border)', fontSize: '0.9rem', color: 'var(--pet-pink)' }}>
                <span>Special Festive Discount</span>
                <strong>-₹{discount}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', fontSize: '1.35rem', fontWeight: 800, color: 'var(--pet-text-heading)' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--pet-pink)' }}>₹{totalPrice}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                type="button"
                className="pet-btn-secondary"
                onClick={handleSaveDesign}
                style={{ flex: 1, padding: '14px' }}
              >
                Save Design 💾
              </button>

              <button
                type="button"
                className="pet-btn-primary"
                onClick={handleProceedToCheckout}
                style={{ flex: 2, padding: '14px', fontSize: '1.05rem' }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <button
            type="button"
            className="pet-btn-secondary"
            onClick={handlePrev}
            style={{ padding: '10px 22px' }}
          >
            ← Back
          </button>

          {step < 9 && (
            <button
              type="button"
              className="pet-btn-primary"
              onClick={handleNext}
              style={{ padding: '10px 28px' }}
            >
              Continue to {WIZARD_STEPS[step]?.name} →
            </button>
          )}
        </div>

      </div>

      {/* MEASUREMENT GUIDE MODAL */}
      {isMeasureGuideOpen && (
        <div className="pet-modal-overlay" onClick={() => setIsMeasureGuideOpen(false)}>
          <div className="pet-modal-card" onClick={e => e.stopPropagation()}>
            <button 
              type="button"
              className="pet-modal-close-btn"
              onClick={() => setIsMeasureGuideOpen(false)}
            >
              <X size={18} />
            </button>

            <span className="pet-eyebrow">FIT ASSURANCE GUIDE</span>
            <h2 className="pet-heading" style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
              Measuring Your Pet
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <div style={{ background: 'var(--pet-surface)', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: 'var(--pet-pink)' }}>Neck:</strong> Measure where collar sits loosely.
              </div>
              <div style={{ background: 'var(--pet-surface)', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: 'var(--pet-pink)' }}>Chest:</strong> Measure widest circumference behind front legs.
              </div>
              <div style={{ background: 'var(--pet-surface)', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: 'var(--pet-pink)' }}>Back:</strong> From base of neck to base of tail.
              </div>
            </div>

            <button
              type="button"
              className="pet-btn-primary"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={() => setIsMeasureGuideOpen(false)}
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
