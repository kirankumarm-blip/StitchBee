import React, { useState } from 'react';
import { IndianRupee, CreditCard, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Download } from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import ConfirmationModal from '../common/ConfirmationModal';
import { MOCK_PAYMENTS } from '../../data/adminMockData';

export default function PaymentsView({ onShowToast }) {
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [refundModal, setRefundModal] = useState({ isOpen: false, payment: null });

  const stats = [
    { label: 'Gross Platform Revenue', count: '₹48.6L', color: 'var(--sb-primary)' },
    { label: 'Successful Payments', count: '18,210', color: 'var(--sb-status-success)' },
    { label: 'Settled Refunds (0.3%)', count: '₹1.45L', color: 'var(--sb-status-failed)' },
    { label: 'Net Platform Take (15%)', count: '₹7.29L', color: 'var(--sb-accent)' }
  ];

  const columns = [
    {
      header: 'Transaction ID',
      accessor: 'id',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-primary)', fontFamily: 'var(--sb-font-mono)' }}>{row.id}</span>
    },
    {
      header: 'Order Reference',
      accessor: 'orderId',
      render: row => <span style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{row.orderId}</span>
    },
    {
      header: 'Customer',
      accessor: 'customer'
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: row => <strong>₹{row.amount.toLocaleString()}</strong>
    },
    {
      header: 'Payment Method',
      accessor: 'paymentMethod'
    },
    {
      header: 'Gateway',
      accessor: 'gateway',
      render: row => (
        <span style={{
          fontSize: '0.76rem',
          fontWeight: 600,
          background: 'var(--sb-bg-surface-subtle)',
          padding: '2px 8px',
          borderRadius: 'var(--sb-radius-sm)',
          border: '1px solid var(--sb-border-default)'
        }}>
          {row.gateway}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      isStatus: true
    },
    {
      header: 'Date & Time',
      accessor: 'date'
    },
    {
      header: 'Refund Status',
      accessor: 'refundStatus',
      render: row => (
        <span style={{ color: row.refundStatus !== '-' ? 'var(--sb-status-failed)' : 'var(--sb-text-muted)' }}>
          {row.refundStatus}
        </span>
      )
    }
  ];

  const handleTriggerRefund = (payment) => {
    setRefundModal({ isOpen: true, payment });
  };

  const handleConfirmRefund = (reason) => {
    if (!refundModal.payment) return;
    const pid = refundModal.payment.id;
    setPayments(prev => prev.map(p => p.id === pid ? { ...p, status: 'Refunded', refundStatus: `Full Refund ₹${p.amount.toLocaleString()}` } : p));

    onShowToast({
      title: 'Refund Executed',
      message: `Transaction ${pid}: ₹${refundModal.payment.amount.toLocaleString()} reversed via ${refundModal.payment.gateway}. Reason: "${reason}".`,
      type: 'success'
    });
  };

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

      {/* Gateway Status Indicators */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px'
      }}>
        <div className="sb-card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--sb-status-success)' }} />
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Razorpay (UPI / Cards)</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--sb-status-success)', fontWeight: 600 }}>Active (99.8%)</span>
        </div>

        <div className="sb-card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--sb-status-success)' }} />
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Cashfree (Auto Payouts)</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--sb-status-success)', fontWeight: 600 }}>Active (99.9%)</span>
        </div>

        <div className="sb-card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--sb-status-success)' }} />
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>PayU Gateway</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--sb-status-success)', fontWeight: 600 }}>Active (99.5%)</span>
        </div>
      </div>

      {/* Transactions Table */}
      <DataTable
        title="Payment Transactions & Settlement Logs"
        subtitle="Real-time webhooks, gateway reconciliation, and automated refund management"
        columns={columns}
        data={payments}
        searchPlaceholder="Search transaction ID, order ref, customer, or gateway..."
        filterField="status"
        filterOptions={['Successful', 'Refunded', 'Failed']}
        actions={payment => (
          payment.status === 'Successful' ? (
            <button
              onClick={() => handleTriggerRefund(payment)}
              className="sb-btn sb-btn-danger sb-btn-sm"
              style={{ padding: '4px 8px' }}
              title="Issue Refund"
            >
              <RefreshCw size={13} />
              <span>Refund</span>
            </button>
          ) : null
        )}
      />

      {/* Refund Confirmation Modal */}
      <ConfirmationModal
        isOpen={refundModal.isOpen}
        onClose={() => setRefundModal({ isOpen: false, payment: null })}
        onConfirm={handleConfirmRefund}
        title="Execute Payment Reversal"
        description={`Confirm refund of ₹${refundModal.payment?.amount.toLocaleString()} for Transaction ${refundModal.payment?.id}? Amount will be refunded back to original source (${refundModal.payment?.paymentMethod}).`}
        confirmText="Confirm Refund"
        isDestructive={true}
        requireReason={true}
        reasonPlaceholder="e.g., Unresolved stitching failure, customer cancellation within 12hr window..."
      />

    </div>
  );
}
