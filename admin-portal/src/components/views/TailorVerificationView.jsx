import React, { useState } from 'react';
import { 
  UserCheck, ShieldCheck, Check, X, AlertTriangle, FileText, 
  ExternalLink, Eye, AlertCircle, Building, Image as ImageIcon 
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import ConfirmationModal from '../common/ConfirmationModal';

export default function TailorVerificationView({ onShowToast }) {
  const [pendingTailors, setPendingTailors] = useState([
    {
      id: 'V-101',
      name: 'Mohd. Zeeshan',
      shopName: 'Zeeshan Needle Crafts',
      phone: '+91 96112 33445',
      address: '22/4, Dispensary Road, Shivajinagar, Bengaluru',
      experience: '9 Years in Ethnic Master Tailoring',
      specialization: 'Sherwanis, Kurta Sets, Bandhgalas & Nehru Jackets',
      applicationDate: '2026-09-21',
      documents: {
        aadhaar: 'XXXX-XXXX-6712 (Verified)',
        pan: 'PQRST7788C (Verified)',
        workshopElectricityBill: 'BESCOM-BLR-8841 (Verified)'
      },
      bank: {
        bankName: 'Axis Bank',
        accNo: 'XXXXXX3319',
        ifsc: 'UTIB0001092',
        accountHolder: 'Mohd Zeeshan'
      },
      skills: ['Hand Zari Embroidery', 'Bandhgala Interlining', 'Pattern Grading', 'Alterations'],
      workSamples: [
        { title: 'Velvet Groom Sherwani with Zari', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80' },
        { title: 'Raw Silk Kurta Set (Placket Stitch)', image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=300&q=80' }
      ],
      tradeScore: '94/100 (Passed StitchBee Trade Assessment)'
    },
    {
      id: 'V-102',
      name: 'Savitri Devi',
      shopName: 'Savitri Ladies Boutique',
      phone: '+91 98455 77123',
      address: 'Shop 12, Gandhi Bazaar, Basavanagudi, Bengaluru',
      experience: '14 Years in Women Couture',
      specialization: 'Designer Blouses, Kanjeevaram Saree Finishing, Kurtis',
      applicationDate: '2026-09-21',
      documents: {
        aadhaar: 'XXXX-XXXX-9912 (Verified)',
        pan: 'ABCDE9922K (Verified)',
        workshopElectricityBill: 'BESCOM-BAS-1142 (Verified)'
      },
      bank: {
        bankName: 'State Bank of India',
        accNo: 'XXXXXX8812',
        ifsc: 'SBIN0001842',
        accountHolder: 'Savitri Devi'
      },
      skills: ['Maggam Handwork', 'Padded Blouse Cut', 'Princess Line Cut'],
      workSamples: [
        { title: 'Traditional Silk Blouse Maggam Cut', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' }
      ],
      tradeScore: '96/100 (Passed StitchBee Trade Assessment)'
    }
  ]);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    tailor: null,
    action: null
  });

  const handleOpenAction = (tailor, action) => {
    setModalConfig({
      isOpen: true,
      tailor,
      action
    });
  };

  const handleConfirmAction = (reason) => {
    const { tailor, action } = modalConfig;
    if (!tailor || !action) return;

    if (action === 'approve') {
      setPendingTailors(prev => prev.filter(t => t.id !== tailor.id));
      onShowToast({
        title: 'Tailor Approved!',
        message: `${tailor.shopName} has been verified and granted active order-taking rights.`,
        type: 'success'
      });
    } else if (action === 'reject') {
      setPendingTailors(prev => prev.filter(t => t.id !== tailor.id));
      onShowToast({
        title: 'Application Rejected',
        message: `${tailor.shopName} was rejected with reason: "${reason}". Notification sent.`,
        type: 'error'
      });
    } else if (action === 'request-changes') {
      onShowToast({
        title: 'Changes Requested',
        message: `Information update request sent to ${tailor.name}: "${reason}".`,
        type: 'warning'
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Verification Header Banner */}
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
              Tailor Verification & Credentialing Queue
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-body)', margin: '2px 0 0 0' }}>
              Review government IDs, workshop credentials, bank details, and trade test samples before onboarding
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sb-primary)' }}>
            {pendingTailors.length} Applications Awaiting Review
          </span>
        </div>
      </div>

      {/* List of Applications */}
      {pendingTailors.length === 0 ? (
        <div className="sb-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <Check size={32} color="var(--sb-status-success)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
            All Tailor Applications Verified!
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--sb-text-muted)' }}>
            There are currently no outstanding applications in the queue.
          </p>
        </div>
      ) : (
        pendingTailors.map(tailor => (
          <div key={tailor.id} className="sb-card" style={{ padding: '24px' }}>
            
            {/* Top Shop Info & Actions */}
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
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--sb-text-title)' }}>
                    {tailor.shopName}
                  </h3>
                  <StatusBadge status="Under Review" />
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--sb-text-muted)', marginTop: '3px' }}>
                  Applicant: <strong>{tailor.name}</strong> • Applied on {tailor.applicationDate}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', marginTop: '2px' }}>
                  {tailor.address} • {tailor.phone}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => handleOpenAction(tailor, 'request-changes')}
                  className="sb-btn sb-btn-secondary sb-btn-sm"
                >
                  <FileText size={14} />
                  <span>Request Info</span>
                </button>
                <button
                  onClick={() => handleOpenAction(tailor, 'reject')}
                  className="sb-btn sb-btn-danger sb-btn-sm"
                >
                  <X size={14} />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => handleOpenAction(tailor, 'approve')}
                  className="sb-btn sb-btn-primary sb-btn-sm"
                >
                  <Check size={14} />
                  <span>Approve Tailor</span>
                </button>
              </div>
            </div>

            {/* Verification Breakdown Grid */}
            <div className="sb-grid-3" style={{ gap: '16px', marginTop: '18px' }}>
              
              {/* Credentials Card */}
              <div style={{ background: 'var(--sb-bg-surface-subtle)', padding: '14px', borderRadius: 'var(--sb-radius-md)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--sb-text-title)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Identity & Licenses
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                  <div><strong>Aadhaar:</strong> {tailor.documents.aadhaar}</div>
                  <div><strong>PAN:</strong> {tailor.documents.pan}</div>
                  <div><strong>Electricity Bill:</strong> {tailor.documents.workshopElectricityBill}</div>
                  <div style={{ color: 'var(--sb-status-success)', fontWeight: 600, marginTop: '4px' }}>
                    ✓ {tailor.tradeScore}
                  </div>
                </div>
              </div>

              {/* Bank Card */}
              <div style={{ background: 'var(--sb-bg-surface-subtle)', padding: '14px', borderRadius: 'var(--sb-radius-md)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--sb-text-title)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Payout Bank Details
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                  <div><strong>Bank:</strong> {tailor.bank.bankName}</div>
                  <div><strong>A/C No:</strong> {tailor.bank.accNo}</div>
                  <div><strong>IFSC:</strong> {tailor.bank.ifsc}</div>
                  <div><strong>Holder:</strong> {tailor.bank.accountHolder}</div>
                </div>
              </div>

              {/* Craft & Specialization */}
              <div style={{ background: 'var(--sb-bg-surface-subtle)', padding: '14px', borderRadius: 'var(--sb-radius-md)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--sb-text-title)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Experience & Specialization
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sb-text-body)', lineHeight: 1.4 }}>
                  <div>{tailor.experience}</div>
                  <div style={{ color: 'var(--sb-text-muted)', marginTop: '4px' }}>{tailor.specialization}</div>
                </div>
              </div>

            </div>

            {/* Work Samples Portfolio */}
            {tailor.workSamples && tailor.workSamples.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--sb-text-title)', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Submitted Stitching Samples (Trade Assessment)
                </div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  {tailor.workSamples.map((sample, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--sb-bg-surface-subtle)', padding: '8px 12px', borderRadius: 'var(--sb-radius-md)' }}>
                      <img src={sample.image} alt={sample.title} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--sb-text-title)' }}>{sample.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ))
      )}

      {/* Confirmation & Rejection Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ isOpen: false, tailor: null, action: null })}
        onConfirm={handleConfirmAction}
        title={
          modalConfig.action === 'approve' 
            ? 'Approve Master Tailor' 
            : modalConfig.action === 'reject' 
              ? 'Reject Tailor Application' 
              : 'Request Additional Trade Documents'
        }
        description={
          modalConfig.action === 'approve'
            ? `Are you sure you want to approve ${modalConfig.tailor?.shopName}? This tailor will immediately begin receiving stitching orders in their territory.`
            : modalConfig.action === 'reject'
              ? `Please specify why ${modalConfig.tailor?.shopName} is being rejected. The applicant will receive this justification.`
              : `Specify what documents or details ${modalConfig.tailor?.name} must resubmit for evaluation.`
        }
        confirmText={
          modalConfig.action === 'approve' 
            ? 'Approve & Activate' 
            : modalConfig.action === 'reject' 
              ? 'Reject Application' 
              : 'Send Request'
        }
        isDestructive={modalConfig.action === 'reject'}
        requireReason={modalConfig.action === 'reject' || modalConfig.action === 'request-changes'}
        reasonPlaceholder={
          modalConfig.action === 'reject'
            ? 'e.g., Incomplete trade assessment test, blurred electricity bill, or mismatched GST records...'
            : 'e.g., Please upload a clearer photograph of the workshop license and high-resolution seam sample...'
        }
      />

    </div>
  );
}
