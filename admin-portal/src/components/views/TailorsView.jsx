import React, { useState } from 'react';
import { Scissors, Star, CheckCircle, ShieldAlert, Award, Eye, UserCheck, IndianRupee } from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import DetailsDrawer from '../common/DetailsDrawer';
import { MOCK_TAILORS } from '../../data/adminMockData';

export default function TailorsView({ onNavigateTab, onShowToast }) {
  const [tailors, setTailors] = useState(MOCK_TAILORS);
  const [selectedTailor, setSelectedTailor] = useState(null);

  const stats = [
    { label: 'Total Registered Tailors', count: '1,248', color: 'var(--sb-primary)' },
    { label: 'Verified & Active', count: '1,180', color: 'var(--sb-status-success)' },
    { label: 'Pending Verification', count: '24', color: 'var(--sb-accent)' },
    { label: 'Under Review / Suspended', count: '44', color: 'var(--sb-status-failed)' }
  ];

  const columns = [
    {
      header: 'Tailor & Atelier',
      accessor: 'name',
      render: row => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{row.shopName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>{row.name} • {row.experience}</div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'location'
    },
    {
      header: 'Specialization',
      accessor: 'specialization',
      render: row => (
        <span style={{ fontSize: '0.8rem', color: 'var(--sb-text-body)' }}>{row.specialization}</span>
      )
    },
    {
      header: 'Rating',
      accessor: 'rating',
      render: row => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--sb-accent)', fontWeight: 700 }}>
          <Star size={13} fill="currentColor" />
          <span>{row.rating || 'New'}</span>
        </div>
      )
    },
    {
      header: 'Completed Orders',
      accessor: 'completed',
      render: row => (
        <span style={{ fontWeight: 600 }}>{row.completed} orders</span>
      )
    },
    {
      header: 'Gross Revenue',
      accessor: 'revenue',
      render: row => (
        <span style={{ fontWeight: 600, color: 'var(--sb-primary)' }}>
          ₹{(row.revenue / 100000).toFixed(2)}L
        </span>
      )
    },
    {
      header: 'Verification',
      accessor: 'verification',
      isStatus: true
    },
    {
      header: 'Status',
      accessor: 'status',
      isStatus: true
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Cards */}
      <div className="sb-grid-4">
        {stats.map((st, idx) => (
          <div key={idx} className="sb-card" style={{ padding: '16px 20px', borderLeft: `4px solid ${st.color}` }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--sb-text-muted)', fontWeight: 500 }}>
              {st.label}
            </span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--sb-text-title)', marginTop: '4px' }}>
              {st.count}
            </div>
          </div>
        ))}
      </div>

      {/* Action Banner for Pending Verifications */}
      <div style={{
        padding: '14px 20px',
        borderRadius: 'var(--sb-radius-md)',
        background: 'var(--sb-accent-light)',
        border: '1px solid var(--sb-accent-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert size={20} color="var(--sb-accent)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--sb-text-title)', fontWeight: 500 }}>
            <strong>24 Tailors</strong> have submitted trade tests and identity documents awaiting admin approval.
          </span>
        </div>
        <button
          onClick={() => onNavigateTab('tailor-verification')}
          className="sb-btn sb-btn-accent sb-btn-sm"
        >
          <UserCheck size={14} />
          <span>Open Verification Queue</span>
        </button>
      </div>

      {/* Main Tailors Table */}
      <DataTable
        title="Master Tailors & Certified Ateliers"
        subtitle="Full network of verified artisans, performance scores, and order capacity"
        columns={columns}
        data={tailors}
        searchPlaceholder="Search tailor name, atelier, specialization, or location..."
        filterField="status"
        filterOptions={['Active', 'Pending', 'Suspended']}
        onRowClick={tailor => setSelectedTailor(tailor)}
        actions={tailor => (
          <button
            onClick={() => setSelectedTailor(tailor)}
            className="sb-btn sb-btn-secondary sb-btn-sm"
            style={{ padding: '4px 8px' }}
          >
            <Eye size={14} />
            <span>Profile</span>
          </button>
        )}
      />

      {/* Tailor Details Inspection Drawer */}
      <DetailsDrawer
        isOpen={Boolean(selectedTailor)}
        onClose={() => setSelectedTailor(null)}
        title={selectedTailor ? selectedTailor.shopName : ''}
        subtitle={selectedTailor ? `Led by ${selectedTailor.name} • ${selectedTailor.experience} Experience` : ''}
        width="580px"
      >
        {selectedTailor && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 'var(--sb-radius-md)',
              background: 'var(--sb-bg-surface-subtle)',
              border: '1px solid var(--sb-border-default)'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Status</span>
                <div style={{ marginTop: '2px' }}>
                  <StatusBadge status={selectedTailor.status} />
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Rating</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '1rem', fontWeight: 700, color: 'var(--sb-accent)' }}>
                  <Star size={14} fill="currentColor" />
                  <span>{selectedTailor.rating}</span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Total Earnings</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--sb-primary)' }}>
                  ₹{(selectedTailor.revenue / 100000).toFixed(2)}L
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="sb-grid-3">
              <div className="sb-card" style={{ padding: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Completed</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--sb-status-success)' }}>
                  {selectedTailor.completed}
                </div>
              </div>
              <div className="sb-card" style={{ padding: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>In Progress</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--sb-accent)' }}>
                  {selectedTailor.inProgress}
                </div>
              </div>
              <div className="sb-card" style={{ padding: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Reworks / Failed</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--sb-status-failed)' }}>
                  {selectedTailor.rework + selectedTailor.failed}
                </div>
              </div>
            </div>

            {/* Verification Documents */}
            <div className="sb-card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sb-text-title)', marginBottom: '10px' }}>
                Trade Credentials & Bank
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div><strong>Aadhaar Card: </strong><span>{selectedTailor.aadhaar}</span></div>
                <div><strong>PAN Card: </strong><span>{selectedTailor.pan}</span></div>
                <div><strong>GST Number: </strong><span>{selectedTailor.gst}</span></div>
                <div><strong>Bank: </strong><span>{selectedTailor.bank.bankName} (A/C {selectedTailor.bank.accNo})</span></div>
              </div>
            </div>

            {/* Skills & Specialties */}
            <div className="sb-card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sb-text-title)', marginBottom: '10px' }}>
                Craft Specializations
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedTailor.skills.map((skill, i) => (
                  <span key={i} style={{
                    fontSize: '0.78rem',
                    background: 'var(--sb-primary-light)',
                    color: 'var(--sb-primary)',
                    border: '1px solid var(--sb-primary-border)',
                    padding: '3px 9px',
                    borderRadius: 'var(--sb-radius-full)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}
      </DetailsDrawer>

    </div>
  );
}
