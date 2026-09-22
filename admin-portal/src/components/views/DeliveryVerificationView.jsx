import React, { useState } from 'react';
import { Truck, ShieldCheck, Check, X, FileText } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import ConfirmationModal from '../common/ConfirmationModal';

export default function DeliveryVerificationView({ onShowToast }) {
  const [candidates, setCandidates] = useState([
    {
      id: 'DP-V01',
      name: 'Suresh Patil',
      phone: '+91 99160 55442',
      address: 'Near ITPL, Whitefield, Bengaluru',
      vehicle: 'Bajaj Pulsar 150',
      vehicleNo: 'KA-04-MM-9102',
      drivingLicense: 'KA042022001194 (Verified on Sarathi portal)',
      aadhaar: 'XXXX-XXXX-3381',
      bank: { bankName: 'State Bank of India', accNo: 'XXXXXX8821', ifsc: 'SBIN0004018' },
      applicationDate: '2026-09-21',
      trainingQuizScore: '100% on StitchBee Measurement & Doorstep Etiquette'
    },
    {
      id: 'DP-V02',
      name: 'Arjun Das',
      phone: '+91 98451 22910',
      address: 'BTM 2nd Stage, Bengaluru',
      vehicle: 'TVS iQube EV',
      vehicleNo: 'KA-05-AB-7719',
      drivingLicense: 'KA052023004910 (Verified)',
      aadhaar: 'XXXX-XXXX-4421',
      bank: { bankName: 'HDFC Bank', accNo: 'XXXXXX9912', ifsc: 'HDFC0001041' },
      applicationDate: '2026-09-20',
      trainingQuizScore: '95% on StitchBee Logistics Policy'
    }
  ]);

  const [modalConfig, setModalConfig] = useState({ isOpen: false, candidate: null, action: null });

  const handleOpenAction = (candidate, action) => {
    setModalConfig({ isOpen: true, candidate, action });
  };

  const handleConfirmAction = (reason) => {
    const { candidate, action } = modalConfig;
    if (!candidate || !action) return;

    if (action === 'approve') {
      setCandidates(prev => prev.filter(c => c.id !== candidate.id));
      onShowToast({
        title: 'Partner Approved!',
        message: `${candidate.name} is now approved for order pickups and home measurement visits.`,
        type: 'success'
      });
    } else if (action === 'reject') {
      setCandidates(prev => prev.filter(c => c.id !== candidate.id));
      onShowToast({
        title: 'Application Rejected',
        message: `${candidate.name} was rejected. Reason: "${reason}".`,
        type: 'error'
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div style={{
        padding: '20px 24px',
        borderRadius: 'var(--sb-radius-lg)',
        background: 'var(--sb-primary-light)',
        border: '1px solid var(--sb-primary-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--sb-radius-md)',
            background: 'var(--sb-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
              Delivery Partner & Gig Courier Verification
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-body)', margin: '2px 0 0 0' }}>
              Verify driver licenses, vehicle registration certificates, and training test certifications
            </p>
          </div>
        </div>

        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sb-primary)' }}>
          {candidates.length} Applications Pending
        </span>
      </div>

      {/* Candidate Cards */}
      {candidates.length === 0 ? (
        <div className="sb-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <Check size={32} color="var(--sb-status-success)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
            All Delivery Applications Cleared
          </h3>
        </div>
      ) : (
        candidates.map(cand => (
          <div key={cand.id} className="sb-card" style={{ padding: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--sb-border-default)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--sb-text-title)' }}>
                    {cand.name}
                  </h3>
                  <StatusBadge status="Under Review" />
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--sb-text-muted)', marginTop: '2px' }}>
                  {cand.phone} • {cand.address} • Applied on {cand.applicationDate}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => handleOpenAction(cand, 'reject')}
                  className="sb-btn sb-btn-danger sb-btn-sm"
                >
                  <X size={14} />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => handleOpenAction(cand, 'approve')}
                  className="sb-btn sb-btn-primary sb-btn-sm"
                >
                  <Check size={14} />
                  <span>Approve Partner</span>
                </button>
              </div>
            </div>

            <div className="sb-grid-3" style={{ gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'var(--sb-bg-surface-subtle)', padding: '14px', borderRadius: 'var(--sb-radius-md)' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-title)', marginBottom: '8px' }}>
                  Vehicle & License
                </div>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div><strong>Vehicle:</strong> {cand.vehicle}</div>
                  <div><strong>RC Number:</strong> {cand.vehicleNo}</div>
                  <div><strong>License:</strong> {cand.drivingLicense}</div>
                </div>
              </div>

              <div style={{ background: 'var(--sb-bg-surface-subtle)', padding: '14px', borderRadius: 'var(--sb-radius-md)' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-title)', marginBottom: '8px' }}>
                  Bank Account Info
                </div>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div><strong>Bank:</strong> {cand.bank.bankName}</div>
                  <div><strong>A/C:</strong> {cand.bank.accNo}</div>
                  <div><strong>IFSC:</strong> {cand.bank.ifsc}</div>
                </div>
              </div>

              <div style={{ background: 'var(--sb-bg-surface-subtle)', padding: '14px', borderRadius: 'var(--sb-radius-md)' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-title)', marginBottom: '8px' }}>
                  Training Status
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sb-status-success)', fontWeight: 600 }}>
                  ✓ {cand.trainingQuizScore}
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Rejection Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ isOpen: false, candidate: null, action: null })}
        onConfirm={handleConfirmAction}
        title={modalConfig.action === 'approve' ? 'Approve Delivery Partner' : 'Reject Partner Application'}
        description={
          modalConfig.action === 'approve'
            ? `Confirm approval for ${modalConfig.candidate?.name}? Partner will receive login access on the StitchBee Delivery app.`
            : `Please provide the reason for rejecting ${modalConfig.candidate?.name}.`
        }
        confirmText={modalConfig.action === 'approve' ? 'Approve' : 'Reject'}
        isDestructive={modalConfig.action === 'reject'}
        requireReason={modalConfig.action === 'reject'}
        reasonPlaceholder="e.g., Expired driving license or missing insurance papers..."
      />

    </div>
  );
}
