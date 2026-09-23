import React, { useState } from 'react';
import { 
  ShieldCheck, Upload, AlertCircle, FileText, CheckCircle2, 
  HelpCircle, ArrowRight, X, Sparkles, Wrench 
} from 'lucide-react';

export default function TrolleyWarrantyModal({
  isOpen,
  onClose,
  onSubmitClaim,
  onSwitchToPaidRepair
}) {
  const [underWarranty, setUnderWarranty] = useState(null); // null | true | false
  const [brand, setBrand] = useState('American Tourister');
  const [model, setModel] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [issueType, setIssueType] = useState('Broken Telescopic Trolley Handle');
  const [invoiceUploaded, setInvoiceUploaded] = useState(false);
  const [warrantyCardUploaded, setWarrantyCardUploaded] = useState(false);
  const [photosUploaded, setPhotosUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const brands = [
    'American Tourister', 'VIP', 'Samsonite', 'Safari', 
    'Delsey Paris', 'Carlton', 'Mocobara', 'Tommy Hilfiger', 'Other'
  ];

  const issues = [
    'Broken Telescopic Trolley Handle',
    'Damaged / Stuck 360° Spinner Wheels',
    'Cracked Polycarbonate Corner Shell',
    'Burst Main Coil Zipper / Slider',
    'TSA Combination Lock Jammed',
    'Side Grab Handle Snapped'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitClaim) {
      onSubmitClaim({
        type: 'warranty-claim',
        category: 'trolley',
        brand,
        model,
        purchaseDate,
        issueType,
        hasInvoice: invoiceUploaded,
        hasWarrantyCard: warrantyCardUploaded
      });
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{
          maxWidth: '580px',
          width: '92%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '30px',
          background: 'var(--bg-dark)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.7)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(247,37,133,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                Luggage & Trolley Warranty Assistant
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Official OEM Brand Claim Coordination & Repair Portal
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px', color: '#fff' }}>
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              Warranty Claim Dossier Submitted!
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', maxWidth: '440px', margin: '0 auto 20px auto' }}>
              Our luggage support concierge will review your proof of purchase with <strong>{brand}</strong> and contact you within 4 business hours regarding authorized parts or warranty replacement.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '24px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              * StitchBee acts as your logistics and inspection partner. Final approval rests with the brand manufacturer according to their warranty terms.
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: '12px' }} onClick={onClose}>
              Done & Return to Leather Studio
            </button>
          </div>
        ) : underWarranty === null ? (
          /* STEP 1: Ask if under warranty */
          <div>
            <div style={{ textAlign: 'center', margin: '20px 0 30px 0' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Is your luggage / trolley bag currently under active brand warranty?
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                Most brands provide 1 to 5 years warranty on manufacturing and mechanical parts like handles and wheels.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <button
                className="btn glass-card"
                style={{
                  padding: '24px 16px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1.5px solid var(--primary)',
                  background: 'rgba(247,37,133,0.06)'
                }}
                onClick={() => setUnderWarranty(true)}
              >
                <ShieldCheck size={28} style={{ color: 'var(--primary)' }} />
                <strong style={{ fontSize: '1rem', color: '#fff' }}>Yes, Under Warranty</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  I have bill, invoice, or registered warranty card
                </span>
              </button>

              <button
                className="btn glass-card"
                style={{
                  padding: '24px 16px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(255,255,255,0.02)'
                }}
                onClick={() => setUnderWarranty(false)}
              >
                <Wrench size={28} style={{ color: 'var(--accent)' }} />
                <strong style={{ fontSize: '1rem', color: '#fff' }}>No / Not Sure</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  Expired warranty or purchase receipt lost
                </span>
              </button>
            </div>
          </div>
        ) : underWarranty === true ? (
          /* STEP 2A: Full Warranty Coordination Form */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(76,201,240,0.08)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(76,201,240,0.25)', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Sparkles size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                <strong>Warranty Assistance Guarantee:</strong> StitchBee coordinates with OEM service hubs on your behalf to obtain genuine parts and replacement eligibility.
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Trolley Brand</label>
                <select
                  className="form-control"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)' }}
                >
                  {brands.map(b => <option key={b} value={b} style={{ background: '#111', color: '#fff' }}>{b}</option>)}
                </select>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Model / Serial</label>
                <input
                  type="text"
                  placeholder="e.g. Curio Spinner 75cm"
                  className="form-control"
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Approx Purchase Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={purchaseDate}
                  onChange={e => setPurchaseDate(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Component Issue</label>
                <select
                  className="form-control"
                  value={issueType}
                  onChange={e => setIssueType(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)' }}
                >
                  {issues.map(iss => <option key={iss} value={iss} style={{ background: '#111', color: '#fff' }}>{iss}</option>)}
                </select>
              </div>
            </div>

            {/* Document Upload Buttons */}
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Required Proof Uploads</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div
                  onClick={() => setInvoiceUploaded(!invoiceUploaded)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '10px',
                    border: invoiceUploaded ? '1.5px solid #10b981' : '1px dashed var(--border-color)',
                    background: invoiceUploaded ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '0.72rem'
                  }}
                >
                  <FileText size={18} style={{ color: invoiceUploaded ? '#10b981' : 'var(--text-muted)', margin: '0 auto 4px auto' }} />
                  <div style={{ color: '#fff', fontWeight: 600 }}>Invoice Bill</div>
                  <div style={{ color: invoiceUploaded ? '#10b981' : 'var(--text-muted)' }}>{invoiceUploaded ? '✓ Uploaded' : 'Upload PDF/JPG'}</div>
                </div>

                <div
                  onClick={() => setWarrantyCardUploaded(!warrantyCardUploaded)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '10px',
                    border: warrantyCardUploaded ? '1.5px solid #10b981' : '1px dashed var(--border-color)',
                    background: warrantyCardUploaded ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '0.72rem'
                  }}
                >
                  <ShieldCheck size={18} style={{ color: warrantyCardUploaded ? '#10b981' : 'var(--text-muted)', margin: '0 auto 4px auto' }} />
                  <div style={{ color: '#fff', fontWeight: 600 }}>Warranty Card</div>
                  <div style={{ color: warrantyCardUploaded ? '#10b981' : 'var(--text-muted)' }}>{warrantyCardUploaded ? '✓ Uploaded' : 'Upload Card'}</div>
                </div>

                <div
                  onClick={() => setPhotosUploaded(!photosUploaded)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '10px',
                    border: photosUploaded ? '1.5px solid #10b981' : '1px dashed var(--border-color)',
                    background: photosUploaded ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '0.72rem'
                  }}
                >
                  <Upload size={18} style={{ color: photosUploaded ? '#10b981' : 'var(--text-muted)', margin: '0 auto 4px auto' }} />
                  <div style={{ color: '#fff', fontWeight: 600 }}>Damage Photos</div>
                  <div style={{ color: photosUploaded ? '#10b981' : 'var(--text-muted)' }}>{photosUploaded ? '✓ 2 Photos' : 'Add Photos'}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1, padding: '10px' }}
                onClick={() => setUnderWarranty(null)}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 2, padding: '10px', fontWeight: 700 }}
              >
                Submit Warranty Request
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2B: Warranty Expired - Seamless Paid Repair Options */
          <div>
            <div style={{ background: 'rgba(247,37,133,0.06)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(247,37,133,0.2)', marginBottom: '18px' }}>
              <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 4px 0' }}>
                No Active Warranty? Fast Affordable StitchBee Repair
              </h5>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                Our local luggage specialists carry OEM-compatible telescopic handles, 360° spinner wheels, and heavy-duty zippers with a 6-month fit guarantee.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {[
                { title: 'Trolley Handle Replacement', price: '₹499', desc: 'Heavy-duty aluminum alloy pull-rod assembly.' },
                { title: '360° Spinner Wheel Set (Pair)', price: '₹399', desc: 'Silent bearing rubberized replacement wheels.' },
                { title: 'Heavy-Duty Coil Zipper Repair', price: '₹249', desc: 'Runner swap & reinforced teeth realignment.' },
                { title: 'Corner Crack Patch & Reinforcement', price: '₹349', desc: 'Internal fiberglass composite bonding.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px 0', color: '#fff' }}>{item.title}</h5>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                  </div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>{item.price}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '10px' }} onClick={() => setUnderWarranty(null)}>
                Back
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 2, padding: '10px', fontWeight: 700 }}
                onClick={() => {
                  onClose();
                  if (onSwitchToPaidRepair) onSwitchToPaidRepair();
                }}
              >
                Book Paid Trolley Repair
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
