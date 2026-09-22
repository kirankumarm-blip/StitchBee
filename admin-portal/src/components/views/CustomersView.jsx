import React, { useState } from 'react';
import { Users, Eye, ShieldAlert, Award, Star, ShoppingBag, Ban, CheckCircle } from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import DetailsDrawer from '../common/DetailsDrawer';
import ConfirmationModal from '../common/ConfirmationModal';
import { MOCK_CUSTOMERS } from '../../data/adminMockData';

export default function CustomersView({ onShowToast }) {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [customerToBlock, setCustomerToBlock] = useState(null);

  const stats = [
    { label: 'Total Registered Customers', count: '24,850', color: 'var(--sb-primary)' },
    { label: 'Active in Last 30 Days', count: '18,410', color: 'var(--sb-status-success)' },
    { label: 'VIP Atelier Tier (₹50K+)', count: '2,840', color: 'var(--sb-accent)' },
    { label: 'Blocked / Fraud Accounts', count: '18', color: 'var(--sb-status-failed)' }
  ];

  const columns = [
    {
      header: 'Customer ID',
      accessor: 'id',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-primary)' }}>{row.id}</span>
    },
    {
      header: 'Name & Contact',
      accessor: 'name',
      render: row => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{row.name}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>{row.email} • {row.phone}</div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'location'
    },
    {
      header: 'Membership Tier',
      accessor: 'tier',
      render: row => (
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          background: row.tier.includes('VIP') ? 'var(--sb-accent-light)' : 'var(--sb-bg-surface-subtle)',
          color: row.tier.includes('VIP') ? 'var(--sb-accent)' : 'var(--sb-text-body)',
          border: `1px solid ${row.tier.includes('VIP') ? 'var(--sb-accent-border)' : 'var(--sb-border-default)'}`,
          padding: '2px 8px',
          borderRadius: 'var(--sb-radius-full)'
        }}>
          {row.tier}
        </span>
      )
    },
    {
      header: 'Orders',
      accessor: 'orders',
      render: row => <span>{row.orders} orders</span>
    },
    {
      header: 'Total Spent',
      accessor: 'totalSpent',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-text-title)' }}>₹{row.totalSpent.toLocaleString()}</span>
    },
    {
      header: 'Last Order',
      accessor: 'lastOrder'
    },
    {
      header: 'Account Status',
      accessor: 'status',
      isStatus: true
    }
  ];

  const handleToggleBlock = (cust) => {
    setCustomerToBlock(cust);
    setBlockModalOpen(true);
  };

  const handleConfirmBlock = () => {
    if (!customerToBlock) return;
    const isBlocking = customerToBlock.status === 'Active';
    const newStatus = isBlocking ? 'Blocked' : 'Active';

    setCustomers(prev => prev.map(c => c.id === customerToBlock.id ? { ...c, status: newStatus } : c));
    if (selectedCustomer && selectedCustomer.id === customerToBlock.id) {
      setSelectedCustomer(prev => ({ ...prev, status: newStatus }));
    }

    onShowToast({
      title: isBlocking ? 'Customer Blocked' : 'Customer Unblocked',
      message: `${customerToBlock.name}'s account has been marked as ${newStatus}.`,
      type: isBlocking ? 'error' : 'success'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Stat Cards */}
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

      {/* Main Customers Table */}
      <DataTable
        title="Customer Directory & Spending History"
        subtitle="Manage tailoring clientele, measurement archives, spending tiers, and account permissions"
        columns={columns}
        data={customers}
        searchPlaceholder="Search customer by name, email, phone, or tier..."
        filterField="status"
        filterOptions={['Active', 'Blocked']}
        onRowClick={cust => setSelectedCustomer(cust)}
        actions={cust => (
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setSelectedCustomer(cust)}
              className="sb-btn sb-btn-secondary sb-btn-sm"
              style={{ padding: '4px 8px' }}
            >
              <Eye size={14} />
              <span>Details</span>
            </button>
            <button
              onClick={() => handleToggleBlock(cust)}
              className={`sb-btn sb-btn-sm ${cust.status === 'Blocked' ? 'sb-btn-primary' : 'sb-btn-danger'}`}
              style={{ padding: '4px 8px' }}
            >
              <Ban size={14} />
              <span>{cust.status === 'Blocked' ? 'Unblock' : 'Block'}</span>
            </button>
          </div>
        )}
      />

      {/* Slide-over Inspection Drawer for Customer */}
      <DetailsDrawer
        isOpen={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
        title={selectedCustomer ? selectedCustomer.name : ''}
        subtitle={selectedCustomer ? `${selectedCustomer.id} • ${selectedCustomer.tier}` : ''}
        width="560px"
      >
        {selectedCustomer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Quick Metrics */}
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
                  <StatusBadge status={selectedCustomer.status} />
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Total Orders</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--sb-primary)' }}>
                  {selectedCustomer.orders}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Lifetime Spend</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--sb-text-title)' }}>
                  ₹{selectedCustomer.totalSpent.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="sb-card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sb-text-title)', marginBottom: '10px' }}>
                Contact & Address
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                <div><strong>Email:</strong> {selectedCustomer.email}</div>
                <div><strong>Phone:</strong> {selectedCustomer.phone}</div>
                <div><strong>Delivery Address:</strong> {selectedCustomer.location}</div>
                <div><strong>Joined On:</strong> {selectedCustomer.joinedDate}</div>
              </div>
            </div>

            {/* Loyalty & Reviews */}
            <div className="sb-card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sb-text-title)', marginBottom: '10px' }}>
                Atelier Engagement & Quality Feedback
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                <div><strong>Reviews Submitted:</strong> {selectedCustomer.reviewsGiven} Reviews</div>
                <div><strong>Customer Complaints:</strong> {selectedCustomer.complaintsCount} Reported</div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => handleToggleBlock(selectedCustomer)}
                className={`sb-btn ${selectedCustomer.status === 'Blocked' ? 'sb-btn-primary' : 'sb-btn-danger'}`}
                style={{ flex: 1 }}
              >
                {selectedCustomer.status === 'Blocked' ? 'Unblock Customer Account' : 'Suspend Customer Account'}
              </button>
            </div>

          </div>
        )}
      </DetailsDrawer>

      {/* Block Confirmation Modal */}
      <ConfirmationModal
        isOpen={blockModalOpen}
        onClose={() => setBlockModalOpen(false)}
        onConfirm={handleConfirmBlock}
        title={customerToBlock?.status === 'Blocked' ? 'Unblock Customer Account' : 'Block Customer Account'}
        description={`Are you sure you want to ${customerToBlock?.status === 'Blocked' ? 'unblock' : 'block'} ${customerToBlock?.name}? ${customerToBlock?.status === 'Blocked' ? 'They will regain ability to book home visits.' : 'They will not be able to place new orders on the platform.'}`}
        confirmText={customerToBlock?.status === 'Blocked' ? 'Unblock Account' : 'Confirm Block'}
        isDestructive={customerToBlock?.status !== 'Blocked'}
      />

    </div>
  );
}
