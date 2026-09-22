import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Check, X, FileText, ExternalLink } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import ConfirmationModal from '../common/ConfirmationModal';

export default function DesignerVerificationView({ onShowToast }) {
  const [candidates, setCandidates] = useState([
    {
      id: 'DES-V01',
      name: 'Aakash Verma',
      brandName: 'AV Monogram',
      phone: '+91 99110 33441',
      location: 'Hauz Khas Village, New Delhi',
      experience: '4 Years in Men Sustainable Couture',
      designCategories: "Men's Ethnic, Sustainable Khadi Blazers, Fusion Bandhgalas",
      education: 'NID Ahmedabad Textile Design (2022)',
      portfolioUrl: 'https://behance.net/av_monogram',
      applicationDate: '2026-09-20',
      sketchesCount: 14,
      documents: {
        pan: 'ABCDE5544R (Verified)',
        aadhaar: 'XXXX-XXXX-9921 (Verified)',
        degreeCert: 'NID Degree Certificate Uploaded'
      }
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
        title: 'Designer Approved!',
        message: `${candidate.brandName} (${candidate.name}) can now publish design patterns and receive styling commissions.`,
        type: 'success'
      });
    } else if (action === 'reject') {
      setCandidates(prev => prev.filter(c => c.id !== candidate.id));
      onShowToast({
        title: 'Application Rejected',
        message: `${candidate.brandName} was rejected. Reason: "${reason}".`,
        type: 'error'
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{
        padding: '20px 24px',
        borderRadius: 'var(--sb-radius-lg)',
        background: 'var(--sb-accent-light)',
        border: '1px solid var(--sb-accent-border)',
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
            background: 'var(--sb-accent)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--sb-text-title)', margin: 0 }}>
              Fashion Designer Portfolio & Atelier Verification
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-body)', margin: '2px 0 0 0' }}>
              Evaluate design sketches, textile degrees, and brand credentials before onboarding creators
            </p>
          </div>
        </div>

        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sb-accent)' }}>
          {candidates.length} Portfolios Pending
        </span>
      </div>

      {candidates.length === 0 ? (
        <div className="sb-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <Check size={32} color="var(--sb-status-success)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
            All Designer Portfolios Verified
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
                    {cand.brandName}
                  </h3>
                  <StatusBadge status="Under Review" />
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--sb-text-muted)', marginTop: '2px' }}>
                  Creator: <strong>{cand.name}</strong> • {cand.location} • Applied on {cand.applicationDate}
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
                  <span>Approve Designer</span>
                </button>
              </div>
            </div>

            <div className="sb-grid-3" style={{ gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'var(--sb-bg-surface-subtle)', padding: '14px', borderRadius: 'var(--sb-radius-md)' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-title)', marginBottom: '8px' }}>
                  Education & Background
                </div>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>{cand.education}</div>
                  <div style={{ color: 'var(--sb-text-muted)' }}>{cand.experience}</div>
                </div>
              </div>

              <div style={{ background: 'var(--sb-bg-surface-subtle)', padding: '14px', borderRadius: 'var(--sb-radius-md)' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-title)', marginBottom: '8px' }}>
                  Design Categories
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sb-text-body)' }}>
                  {cand.designCategories}
                </div>
              </div>

              <div style={{ background: 'var(--sb-bg-surface-subtle)', padding: '14px', borderRadius: 'var(--sb-radius-md)' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-title)', marginBottom: '8px' }}>
                  Portfolio & Documents
                </div>
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div><strong>PAN:</strong> {cand.documents.pan}</div>
                  <div><strong>Uploads:</strong> {cand.sketchesCount} Sketches Submitted</div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ isOpen: false, candidate: null, action: null })}
        onConfirm={handleConfirmAction}
        title={modalConfig.action === 'approve' ? 'Approve Designer' : 'Reject Designer Application'}
        description={
          modalConfig.action === 'approve'
            ? `Confirm approval for ${modalConfig.candidate?.brandName}? Creator designs will be featured on the customer 3D customizer.`
            : `Please provide justification for rejecting ${modalConfig.candidate?.brandName}.`
        }
        confirmText={modalConfig.action === 'approve' ? 'Approve' : 'Reject'}
        isDestructive={modalConfig.action === 'reject'}
        requireReason={modalConfig.action === 'reject'}
        reasonPlaceholder="e.g., Portfolio does not meet StitchBee luxury tailoring aesthetic standards..."
      />

    </div>
  );
}
