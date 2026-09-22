import React, { useState } from 'react';
import { Layers, CheckCircle2, Clock, IndianRupee, FileText, Plus } from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { MOCK_BULK_ORDERS } from '../../data/adminMockData';

export default function BulkOrdersView({ onShowToast }) {
  const [bulkOrders, setBulkOrders] = useState(MOCK_BULK_ORDERS);

  const stats = [
    { label: 'Total Bulk Contracts', count: '310', color: 'var(--sb-primary)' },
    { label: 'Active in Production', count: '48', color: 'var(--sb-accent)' },
    { label: 'Total Units in Pipeline', count: '14,200', color: 'var(--sb-blue-500)' },
    { label: 'Total Contract Value', count: '₹93.0L', color: 'var(--sb-status-success)' }
  ];

  const columns = [
    {
      header: 'Bulk Order ID',
      accessor: 'id',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-primary)' }}>{row.id}</span>
    },
    {
      header: 'Company / Organization',
      accessor: 'company',
      render: row => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{row.company}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>{row.contact}</div>
        </div>
      )
    },
    {
      header: 'Garment Category',
      accessor: 'category'
    },
    {
      header: 'Units',
      accessor: 'quantity',
      render: row => <strong>{row.quantity} units</strong>
    },
    {
      header: 'Estimated Value',
      accessor: 'estimatedValue',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-primary)' }}>₹{row.estimatedValue.toLocaleString()}</span>
    },
    {
      header: 'Assigned Atelier',
      accessor: 'assignedTailor'
    },
    {
      header: 'Delivery Deadline',
      accessor: 'deadline'
    },
    {
      header: 'Payment Terms',
      accessor: 'payment',
      render: row => (
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--sb-text-title)' }}>
          {row.payment}
        </span>
      )
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
              {st.label}
            </span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--sb-text-title)', marginTop: '4px' }}>
              {st.count}
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Orders Table */}
      <DataTable
        title="Institutional & Corporate Bulk Manufacturing"
        subtitle="Manage bulk school uniforms, hotel apparel, corporate blazers, and high-volume quotations"
        columns={columns}
        data={bulkOrders}
        searchPlaceholder="Search company, contract ID, tailor, or category..."
        filterField="status"
        filterOptions={['Quotation', 'Approved', 'Production', 'Quality Check', 'Ready', 'Delivered']}
        actions={order => (
          <button
            onClick={() => onShowToast({ title: 'Quotation Generated', message: `Quotation PDF exported for ${order.company}.`, type: 'info' })}
            className="sb-btn sb-btn-secondary sb-btn-sm"
            style={{ padding: '4px 8px' }}
          >
            <FileText size={14} />
            <span>Quote PDF</span>
          </button>
        )}
      />

    </div>
  );
}
