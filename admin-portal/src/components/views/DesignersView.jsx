import React, { useState } from 'react';
import { Sparkles, Star, Award, ShieldCheck, CheckCircle } from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { MOCK_DESIGNERS } from '../../data/adminMockData';

export default function DesignersView({ onNavigateTab, onShowToast }) {
  const [designers, setDesigners] = useState(MOCK_DESIGNERS);

  const stats = [
    { label: 'Active Master Designers', count: '184', color: 'var(--sb-primary)' },
    { label: 'Approved Design Collections', count: '1,420', color: 'var(--sb-status-success)' },
    { label: 'Pending Portfolio Reviews', count: '16', color: 'var(--sb-accent)' },
    { label: 'Designer-Attributed Revenue', count: '₹28.4L', color: 'var(--sb-blue-500)' }
  ];

  const columns = [
    {
      header: 'Designer & Brand',
      accessor: 'name',
      render: row => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{row.brandName}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>{row.name} • {row.experience}</div>
        </div>
      )
    },
    {
      header: 'Location Hub',
      accessor: 'location'
    },
    {
      header: 'Design Specialization',
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
      header: 'Approved Designs',
      accessor: 'approvedDesigns',
      render: row => <span style={{ fontWeight: 600, color: 'var(--sb-status-success)' }}>{row.approvedDesigns} Live</span>
    },
    {
      header: 'Customer Orders',
      accessor: 'orders',
      render: row => <span>{row.orders} orders</span>
    },
    {
      header: 'Designer Revenue',
      accessor: 'revenue',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-primary)' }}>₹{(row.revenue / 100000).toFixed(2)}L</span>
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
      
      {/* Stats Strip */}
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

      {/* Action Banner */}
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
          <Sparkles size={20} color="var(--sb-accent)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--sb-text-title)', fontWeight: 500 }}>
            <strong>16 Designer Applications & Portfolios</strong> are awaiting review.
          </span>
        </div>
        <button
          onClick={() => onNavigateTab('designer-verification')}
          className="sb-btn sb-btn-accent sb-btn-sm"
        >
          <ShieldCheck size={14} />
          <span>Open Designer Reviews</span>
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        title="Fashion Designers & Atelier Creators"
        subtitle="Exclusive partner creators designing bespoke collections and 3D outfit customizer sketches"
        columns={columns}
        data={designers}
        searchPlaceholder="Search designer name, brand, specialization, or location..."
        filterField="status"
        filterOptions={['Active', 'Pending', 'Inactive']}
      />

    </div>
  );
}
