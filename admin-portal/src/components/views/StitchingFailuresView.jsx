import React, { useState } from 'react';
import { 
  AlertTriangle, RotateCcw, CheckCircle2, IndianRupee, ShieldAlert,
  Scissors, Filter, Check, X 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import ConfirmationModal from '../common/ConfirmationModal';
import { STITCHING_FAILURES, FAILURE_REASONS_BREAKDOWN } from '../../data/adminMockData';

export default function StitchingFailuresView({ onShowToast }) {
  const [failures, setFailures] = useState(STITCHING_FAILURES);
  const [actionModal, setActionModal] = useState({ isOpen: false, failure: null, action: null });

  const stats = [
    { label: 'Total Stitching Failures', count: '146', color: 'var(--sb-status-failed)' },
    { label: 'Active Rework Queue', count: '88', color: 'var(--sb-accent)' },
    { label: 'Customer Replacements', count: '24', color: 'var(--sb-primary)' },
    { label: 'Refunds Settled', count: '16', color: 'var(--sb-status-success)' }
  ];

  const columns = [
    {
      header: 'Incident ID',
      accessor: 'id',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-status-failed)' }}>{row.id}</span>
    },
    {
      header: 'Order Ref',
      accessor: 'orderId',
      render: row => <span style={{ fontWeight: 600, color: 'var(--sb-primary)' }}>{row.orderId}</span>
    },
    {
      header: 'Tailor Atelier',
      accessor: 'tailor'
    },
    {
      header: 'Category',
      accessor: 'category'
    },
    {
      header: 'Failure Reason',
      accessor: 'failureReason',
      render: row => (
        <span style={{
          fontSize: '0.78rem',
          fontWeight: 600,
          background: 'var(--sb-status-failed-bg)',
          color: 'var(--sb-status-failed)',
          border: '1px solid var(--sb-status-failed-border)',
          padding: '2px 8px',
          borderRadius: 'var(--sb-radius-full)'
        }}>
          {row.failureReason}
        </span>
      )
    },
    {
      header: 'Customer',
      accessor: 'customer'
    },
    {
      header: 'Order Value',
      accessor: 'orderValue',
      render: row => <strong>₹{row.orderValue.toLocaleString()}</strong>
    },
    {
      header: 'Resolution Status',
      accessor: 'resolution',
      render: row => (
        <span style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>
          {row.resolution}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      isStatus: true
    }
  ];

  const handleResolveAction = (failure, action) => {
    setActionModal({ isOpen: true, failure, action });
  };

  const handleConfirmAction = (notes) => {
    const { failure, action } = actionModal;
    if (!failure || !action) return;

    let resText = 'Rework Assigned';
    if (action === 'refund') resText = 'Refund Processed';
    else if (action === 'replace') resText = 'Replacement Order Created';

    setFailures(prev => prev.map(f => f.id === failure.id ? { ...f, resolution: resText, status: 'Resolved' } : f));

    onShowToast({
      title: 'Failure Resolution Logged',
      message: `Order #${failure.orderId}: ${resText} successfully. Tailor ledger adjusted.`,
      type: 'success'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Failure KPIs */}
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

      {/* Failure Reason Analysis Chart */}
      <div className="sb-card">
        <div className="sb-card-header">
          <div>
            <div className="sb-card-title">
              <AlertTriangle size={18} color="var(--sb-status-failed)" />
              <span>Stitching Failure Root Cause Distribution</span>
            </div>
            <div className="sb-card-subtitle">
              Breakdown of all 146 recorded fit and fabrication failure incidents
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={FAILURE_REASONS_BREAKDOWN} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sb-chart-grid)" vertical={false} />
              <XAxis 
                dataKey="reason" 
                stroke="var(--sb-text-muted)" 
                fontSize={10} 
                angle={-15} 
                textAnchor="end" 
                interval={0}
              />
              <YAxis stroke="var(--sb-text-muted)" fontSize={11} />
              <Tooltip 
                formatter={(val) => [`${val} incidents`, 'Count']}
                contentStyle={{
                  backgroundColor: 'var(--sb-bg-surface)',
                  border: '1px solid var(--sb-border-default)',
                  borderRadius: 'var(--sb-radius-md)',
                  color: 'var(--sb-text-title)',
                  fontSize: '0.8rem'
                }}
              />
              <Bar dataKey="count" fill="var(--sb-primary)" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stitching Failures Table */}
      <DataTable
        title="Failure Log & Rework Resolution"
        subtitle="Manage tailor liability, customer remakes, refunds, and alterations under 7-day guarantee"
        columns={columns}
        data={failures}
        searchPlaceholder="Search by incident ID, order ID, tailor, or customer..."
        filterField="status"
        filterOptions={['In Progress', 'Resolved', 'Closed']}
        actions={failure => (
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => handleResolveAction(failure, 'rework')}
              className="sb-btn sb-btn-primary sb-btn-sm"
              style={{ padding: '4px 8px' }}
              title="Assign Rework to Tailor"
            >
              <RotateCcw size={13} />
              <span>Rework</span>
            </button>
            <button
              onClick={() => handleResolveAction(failure, 'refund')}
              className="sb-btn sb-btn-secondary sb-btn-sm"
              style={{ padding: '4px 8px' }}
              title="Issue Full Refund"
            >
              <IndianRupee size={13} />
              <span>Refund</span>
            </button>
          </div>
        )}
      />

      <ConfirmationModal
        isOpen={actionModal.isOpen}
        onClose={() => setActionModal({ isOpen: false, failure: null, action: null })}
        onConfirm={handleConfirmAction}
        title={actionModal.action === 'refund' ? 'Process Refund' : 'Assign Rework'}
        description={
          actionModal.action === 'refund'
            ? `Process full refund of ₹${actionModal.failure?.orderValue.toLocaleString()} for Order #${actionModal.failure?.orderId}? Amount will be debited from ${actionModal.failure?.tailor}'s monthly payout ledger.`
            : `Assign mandatory rework to ${actionModal.failure?.tailor} for Order #${actionModal.failure?.orderId} under the 7-day StitchBee Fit Guarantee.`
        }
        confirmText={actionModal.action === 'refund' ? 'Issue Refund' : 'Assign Rework'}
        isDestructive={actionModal.action === 'refund'}
        requireReason={true}
        reasonPlaceholder="Enter resolution remarks and root cause corrective actions for the tailor..."
      />

    </div>
  );
}
