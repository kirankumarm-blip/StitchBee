import React, { useState } from 'react';
import { Camera, Ruler, CheckCircle2, RefreshCw, Sparkles, User, Info, Calendar, X } from 'lucide-react';

export default function AIMeasurementModal({
  isOpen,
  onClose,
  type = 'apparel', // 'apparel' | 'pet' | 'shoes'
  onConfirmMeasurements
}) {
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' | 'manual' | 'visit'
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [photosUploaded, setPhotosUploaded] = useState(false);

  // Initial suggested measurements
  const [measurements, setMeasurements] = useState(
    type === 'pet' ? {
      neck: '14.5 in',
      chest: '24.0 in',
      backLength: '18.0 in',
      legLength: '9.0 in'
    } : {
      chest: '40.0 in',
      shoulder: '18.5 in',
      sleeve: '25.0 in',
      waist: '34.0 in',
      length: '29.0 in',
      neck: '16.0 in',
      armhole: '19.0 in'
    }
  );

  const [appointmentType, setAppointmentType] = useState('home'); // 'home' | 'shop'
  const [preferredDate, setPreferredDate] = useState('2026-09-25');
  const [preferredSlot, setPreferredSlot] = useState('11:00 AM - 01:00 PM');

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setPhotosUploaded(true);
    }, 1800);
  };

  const handleConfirm = () => {
    if (onConfirmMeasurements) {
      onConfirmMeasurements({
        method: activeTab,
        measurements: activeTab === 'visit' ? { appointment: appointmentType, date: preferredDate, slot: preferredSlot } : measurements
      });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={onClose}>
      <div
        className="modal-content animate-fade-in"
        style={{
          maxWidth: '560px',
          width: '92%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          background: 'var(--bg-dark)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              Precision Fit & Measurements
            </h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Choose AI Touchless Body Scan, Manual Input, or Book a Fitting Specialist
            </span>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '6px', color: '#fff' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.04)', padding: '4px', borderRadius: '12px', marginBottom: '20px' }}>
          {[
            { id: 'ai', label: 'AI Touchless Scan', icon: <Camera size={14} /> },
            { id: 'manual', label: 'Enter Manually', icon: <Ruler size={14} /> },
            { id: 'visit', label: 'Book Doorstep Visit', icon: <Calendar size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="btn"
              style={{
                flex: 1,
                padding: '8px 10px',
                fontSize: '0.78rem',
                borderRadius: '8px',
                background: activeTab === tab.id ? 'var(--grad-primary)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? 700 : 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: AI SCAN */}
        {activeTab === 'ai' && (
          <div>
            {!scanComplete ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div
                  style={{
                    width: '120px',
                    height: '140px',
                    borderRadius: '16px',
                    border: '2px dashed var(--primary)',
                    background: 'rgba(247,37,133,0.04)',
                    margin: '0 auto 16px auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Camera size={32} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Front & Side</span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                  Touchless 3D Vision Measurement
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', maxWidth: '380px', margin: '0 auto 20px auto', lineHeight: '1.4' }}>
                  Upload full-standing photos in fitted clothes. Our proprietary AI landmarks detect body geometry with 98.4% tailoring accuracy.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  style={{ width: '80%', padding: '12px' }}
                >
                  {isScanning ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <RefreshCw size={16} className="animate-spin" /> Detecting Landmarks & Contours...
                    </span>
                  ) : (
                    'Capture / Upload Photos for AI Scan'
                  )}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ background: 'rgba(16,185,129,0.08)', padding: '10px 14px', borderRadius: '10px', border: '1px solid #10b981', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                  <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
                    AI Scan Verified: 7 Key Biometric Measurement Points Extracted
                  </span>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  You can fine-tune any dimension below before final master tailor assignment:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                  {Object.entries(measurements).map(([key, val]) => (
                    <div key={key} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key}</span>
                      <input
                        type="text"
                        value={val}
                        onChange={e => setMeasurements({ ...measurements, [key]: e.target.value })}
                        style={{ width: '70px', padding: '4px', textAlign: 'right', background: 'transparent', border: 'none', color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANUAL MEASUREMENT */}
        {activeTab === 'manual' && (
          <div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <Info size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Use a flexible measuring tape. Keep tape snug against the body without pulling tight.
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {Object.entries(measurements).map(([key, val]) => (
                <div key={key} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key}</span>
                  <input
                    type="text"
                    value={val}
                    onChange={e => setMeasurements({ ...measurements, [key]: e.target.value })}
                    style={{ width: '70px', padding: '4px', textAlign: 'right', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BOOK DOORSTEP VISIT */}
        {activeTab === 'visit' && (
          <div>
            <div style={{ background: 'rgba(247,37,133,0.06)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(247,37,133,0.2)', marginBottom: '16px' }}>
              <h5 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary)', margin: '0 0 4px 0' }}>
                Professional Fit-Helper Visit (₹199 • Waived on orders over ₹3,000)
              </h5>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0 }}>
                A certified StitchBee tailoring assistant visits your residence with fabric swatches, sample silhouettes, and measuring tools.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => setAppointmentType('home')}
                className="btn"
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: appointmentType === 'home' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: appointmentType === 'home' ? 'rgba(247,37,133,0.08)' : 'rgba(255,255,255,0.02)',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                🏠 At My Home
              </button>

              <button
                type="button"
                onClick={() => setAppointmentType('shop')}
                className="btn"
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: appointmentType === 'shop' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: appointmentType === 'shop' ? 'rgba(247,37,133,0.08)' : 'rgba(255,255,255,0.02)',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                🏬 Visit Tailor Studio
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Preferred Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Time Slot</label>
                <select
                  className="form-control"
                  value={preferredSlot}
                  onChange={e => setPreferredSlot(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#111', color: '#fff', border: '1px solid var(--border-color)' }}
                >
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" style={{ flex: 1, padding: '10px' }} onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 2, padding: '10px', fontWeight: 700 }}
            onClick={handleConfirm}
          >
            {activeTab === 'visit' ? 'Confirm Appointment Slot' : 'Save & Confirm Measurements'}
          </button>
        </div>
      </div>
    </div>
  );
}
