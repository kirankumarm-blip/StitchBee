import React, { useState } from 'react';
import { Truck, Star, CheckCircle, ShieldAlert, Award, Eye, ShieldCheck } from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { MOCK_DELIVERY_PARTNERS } from '../../data/adminMockData';

export default function DeliveryPartnersView({ onNavigateTab, onShowToast }) {
  const [partners, setPartners] = useState(MOCK_DELIVERY_PARTNERS);

  const stats = [
    { label: 'Active Delivery Partners', count: '326', color: 'var(--sb-primary)' },
    { label: 'Pending Verification', count: '32', color: 'var(--sb-accent)' },
    { label: 'On-Time Completion Rate', count: '98.6%', color: 'var(--sb-status-success)' },
    { label: 'Total Completed Deliveries', count: '24,190', color: 'var(--sb-blue-500)' }
  ];

  const columns = [
    {
      header: 'Partner Name',
      accessor: 'name',
      render: row => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{row.name}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>{row.phone}</div>
        </div>
      )
    },
    {
      header: 'Vehicle Details',
      accessor: 'vehicle',
      render: row => (
        <div>
          <div style={{ color: 'var(--sb-text-title)' }}>{row.vehicle}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)', fontFamily: 'var(--sb-font-mono)' }}>{row.vehicleNo}</div>
        </div>
      )
    },
    {
      header: 'Location Hub',
      accessor: 'location'
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
      header: 'Deliveries',
      accessor: 'deliveries',
      render: row => <span>{row.deliveries} done</span>
    },
    {
      header: 'Total Earnings',
      accessor: 'earnings',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-primary)' }}>₹{row.earnings.toLocaleString()}</span>
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
      
      {/* Top Stats */}
      <div className="sb-grid-4">
        {stats.map((st, idx) => (
          <div key={idx} className="sb-card" style={{ padding: '16px 20px', borderLeft: `4px solid ${st.color}` }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--sb-text-muted)', fontWeight: 500 }}>
              {statLabel(st.label)}
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
        background: 'var(--sb-primary-light)',
        border: '1px solid var(--sb-primary-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Truck size={20} color="var(--sb-primary)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--sb-text-title)', fontWeight: 500 }}>
            <strong>32 Delivery Partner Candidates</strong> have submitted vehicle RC and driving licenses.
          </span>
        </div>
        <button
          onClick={() => onNavigateTab('delivery-verification')}
          className="sb-btn sb-btn-primary sb-btn-sm"
        >
          <ShieldCheck size={14} />
          <span>Open Verification Desk</span>
        </button>
      </div>

      {/* Table */}
      <DataTable
        title="Delivery & Doorstep Logistics Fleet"
        subtitle="Manage student gig partners and delivery logistics across active city zones"
        columns={columns}
        data={partners}
        searchPlaceholder="Search partner name, phone, vehicle number, or hub..."
        filterField="status"
        filterOptions={['Active', 'Pending', 'Suspended']}
      />

    </div>
  );
}

function statLabel(l) { return l; }
