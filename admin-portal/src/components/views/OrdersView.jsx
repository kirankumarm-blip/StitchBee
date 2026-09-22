import React, { useState } from 'react';
import { 
  ShoppingBag, Eye, CheckCircle2, Clock, Truck, Scissors, 
  IndianRupee, Sparkles, AlertTriangle, Calendar, User, Phone, MapPin 
} from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import DetailsDrawer from '../common/DetailsDrawer';
import { MOCK_ORDERS } from '../../data/adminMockData';

export default function OrdersView({ onShowToast }) {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderStats = [
    { label: 'Total Orders', count: '18,642', color: 'var(--sb-primary)' },
    { label: 'New Orders', count: '485', color: 'var(--sb-blue-500)' },
    { label: 'In Progress / Stitching', count: '3,880', color: 'var(--sb-accent)' },
    { label: 'Completed & Delivered', count: '11,850', color: 'var(--sb-status-success)' },
    { label: 'Quality Rework', count: '292', color: 'var(--sb-status-failed)' },
    { label: 'Cancelled / Returned', count: '705', color: 'var(--sb-text-muted)' }
  ];

  const columns = [
    {
      header: 'Order ID',
      accessor: 'id',
      render: row => (
        <span style={{ fontWeight: 700, color: 'var(--sb-primary)', cursor: 'pointer' }}>
          {row.id}
        </span>
      )
    },
    {
      header: 'Customer',
      accessor: 'customer',
      render: row => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{row.customer}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>{row.phone}</div>
        </div>
      )
    },
    {
      header: 'Category & Service',
      accessor: 'service',
      render: row => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--sb-text-title)' }}>{row.service}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>{row.category}</div>
        </div>
      )
    },
    {
      header: 'Assigned Tailor',
      accessor: 'tailor',
      render: row => (
        <span style={{ color: 'var(--sb-text-body)' }}>{row.tailor || 'Unassigned'}</span>
      )
    },
    {
      header: 'Order Value',
      accessor: 'value',
      render: row => (
        <span style={{ fontWeight: 700, color: 'var(--sb-text-title)' }}>
          ₹{row.value.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Payment Status',
      accessor: 'paymentStatus',
      render: row => (
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: 'var(--sb-radius-full)',
          background: row.paymentStatus === 'Paid' ? 'var(--sb-status-success-bg)' : 'var(--sb-status-pending-bg)',
          color: row.paymentStatus === 'Paid' ? 'var(--sb-status-success)' : 'var(--sb-status-pending)',
          border: `1px solid ${row.paymentStatus === 'Paid' ? 'var(--sb-status-success-border)' : 'var(--sb-status-pending-border)'}`
        }}>
          {row.paymentStatus} ({row.paymentGateway})
        </span>
      )
    },
    {
      header: 'Order Status',
      accessor: 'orderStatus',
      isStatus: true
    },
    {
      header: 'Order Date',
      accessor: 'orderDate'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Order KPI Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px'
      }}>
        {orderStats.map((stat, idx) => (
          <div key={idx} className="sb-card" style={{ padding: '14px 18px', borderLeft: `3px solid ${stat.color}` }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--sb-text-muted)', fontWeight: 500 }}>
              {stat.label}
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--sb-text-title)', marginTop: '4px' }}>
              {stat.count}
            </div>
          </div>
        ))}
      </div>

      {/* Orders Data Table */}
      <DataTable
        title="Active Orders & Tracking"
        subtitle="Manage end-to-end tailoring lifecycle from placement to doorstep delivery"
        columns={columns}
        data={orders}
        searchPlaceholder="Search order ID, customer name, phone, or atelier..."
        filterField="orderStatus"
        filterOptions={['Delivered', 'Stitching', 'Quality Check', 'Rework', 'New', 'Cancelled']}
        onRowClick={order => setSelectedOrder(order)}
        actions={order => (
          <button
            onClick={() => setSelectedOrder(order)}
            className="sb-btn sb-btn-secondary sb-btn-sm"
            style={{ padding: '4px 8px' }}
            title="Inspect Order Details"
          >
            <Eye size={14} />
            <span>Inspect</span>
          </button>
        )}
      />

      {/* Slide-over Inspection Drawer for Order Details */}
      <DetailsDrawer
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order #${selectedOrder.id}` : ''}
        subtitle={selectedOrder ? `${selectedOrder.category} • Placed on ${selectedOrder.orderDate}` : ''}
        width="620px"
      >
        {selectedOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Quick Status Bar */}
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
                  <StatusBadge status={selectedOrder.orderStatus} />
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Order Amount</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--sb-primary)' }}>
                  ₹{selectedOrder.value.toLocaleString()}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>Payment</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sb-status-success)' }}>
                  {selectedOrder.paymentStatus} ({selectedOrder.paymentGateway})
                </div>
              </div>
            </div>

            {/* 10-Stage Interactive Timeline */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sb-text-title)', marginBottom: '14px' }}>
                10-Stage Stitching & Delivery Timeline
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '8px' }}>
                {selectedOrder.timeline.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative' }}>
                    {idx < selectedOrder.timeline.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        left: '11px',
                        top: '22px',
                        bottom: '-12px',
                        width: '2px',
                        background: step.done ? 'var(--sb-primary)' : 'var(--sb-border-default)'
                      }} />
                    )}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: step.done ? 'var(--sb-primary)' : 'var(--sb-bg-surface-subtle)',
                      color: step.done ? '#ffffff' : 'var(--sb-text-muted)',
                      border: `2px solid ${step.done ? 'var(--sb-primary)' : 'var(--sb-border-default)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      zIndex: 2
                    }}>
                      {step.done ? <CheckCircle2 size={14} /> : idx + 1}
                    </div>
                    <div style={{ flex: 1, paddingBottom: '4px' }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: step.done ? 600 : 500, color: step.done ? 'var(--sb-text-title)' : 'var(--sb-text-muted)' }}>
                        {step.step}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>
                        {step.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Tailor Details Grid */}
            <div className="sb-grid-2" style={{ gap: '14px' }}>
              <div className="sb-card" style={{ padding: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-muted)' }}>
                  Customer Details
                </span>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--sb-text-title)', marginTop: '6px' }}>
                  {selectedOrder.customer}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', marginTop: '2px' }}>
                  {selectedOrder.phone}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', marginTop: '2px' }}>
                  {selectedOrder.city}
                </div>
              </div>

              <div className="sb-card" style={{ padding: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--sb-text-muted)' }}>
                  Assigned Atelier & Logistics
                </span>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--sb-text-title)', marginTop: '6px' }}>
                  {selectedOrder.tailor}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', marginTop: '2px' }}>
                  Partner: {selectedOrder.deliveryPartner}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sb-text-muted)', marginTop: '2px' }}>
                  Designer: {selectedOrder.designer}
                </div>
              </div>
            </div>

            {/* Fabric & Measurements Specs */}
            <div className="sb-card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--sb-text-title)', marginBottom: '10px' }}>
                Fabric & Measurement Specifications
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div>
                  <strong style={{ color: 'var(--sb-text-title)' }}>Fabric Material: </strong>
                  <span style={{ color: 'var(--sb-text-body)' }}>{selectedOrder.fabric}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--sb-text-title)' }}>Digital Measurements Card: </strong>
                  <span style={{ color: 'var(--sb-text-body)' }}>{selectedOrder.measurements}</span>
                </div>
              </div>
            </div>

            {/* Admin Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', paddingTop: '10px' }}>
              <button 
                onClick={() => {
                  onShowToast({ title: 'Order Updated', message: `Order #${selectedOrder.id} marked as Quality Approved.`, type: 'success' });
                  setSelectedOrder(null);
                }} 
                className="sb-btn sb-btn-primary" 
                style={{ flex: 1 }}
              >
                Advance Order Stage
              </button>
              <button 
                onClick={() => {
                  onShowToast({ title: 'Rework Flagged', message: `Order #${selectedOrder.id} transferred to Rework Queue.`, type: 'warning' });
                  setSelectedOrder(null);
                }} 
                className="sb-btn sb-btn-secondary"
              >
                Flag for Rework
              </button>
            </div>

          </div>
        )}
      </DetailsDrawer>

    </div>
  );
}
