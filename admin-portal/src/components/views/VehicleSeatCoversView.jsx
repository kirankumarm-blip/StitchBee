import React, { useState } from 'react';
import { Car, Bike, Truck, CheckCircle2, ShieldAlert, Eye } from 'lucide-react';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { MOCK_VEHICLE_SEAT_ORDERS } from '../../data/adminMockData';

export default function VehicleSeatCoversView({ onShowToast }) {
  const [orders, setOrders] = useState(MOCK_VEHICLE_SEAT_ORDERS);

  const stats = [
    { label: 'Total Seat Cover Orders', count: '1,420', color: 'var(--sb-primary)' },
    { label: 'Car Full Bucket Sets', count: '890', color: 'var(--sb-blue-500)' },
    { label: 'Custom Bike Saddles', count: '380', color: 'var(--sb-accent)' },
    { label: 'Total Category Revenue', count: '₹56.8L', color: 'var(--sb-status-success)' }
  ];

  const columns = [
    {
      header: 'Order Ref',
      accessor: 'id',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-primary)' }}>{row.id}</span>
    },
    {
      header: 'Customer',
      accessor: 'customer'
    },
    {
      header: 'Vehicle & Model',
      accessor: 'vehicleModel',
      render: row => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--sb-text-title)' }}>{row.vehicleModel}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>{row.vehicleType}</div>
        </div>
      )
    },
    {
      header: 'Seat Type & Material',
      accessor: 'material',
      render: row => (
        <div>
          <div style={{ fontSize: '0.82rem', color: 'var(--sb-text-title)', fontWeight: 500 }}>{row.seatType}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--sb-text-muted)' }}>{row.material}</div>
        </div>
      )
    },
    {
      header: 'Master Tailor',
      accessor: 'tailor'
    },
    {
      header: 'Location',
      accessor: 'location'
    },
    {
      header: 'Price',
      accessor: 'price',
      render: row => <span style={{ fontWeight: 700, color: 'var(--sb-text-title)' }}>₹{row.price.toLocaleString()}</span>
    },
    {
      header: 'Fitting & Delivery',
      accessor: 'delivery'
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

      {/* Seat Covers Table */}
      <DataTable
        title="Custom Vehicle & Upholstery Stitching"
        subtitle="Manage custom leatherette, Nappa, and heavy duty foam seat covers for cars, bikes, and vans"
        columns={columns}
        data={orders}
        searchPlaceholder="Search vehicle model, customer, material, or tailor..."
        filterField="status"
        filterOptions={['Quality Check', 'Delivered', 'Stitching', 'Measurement Pending']}
        actions={order => (
          <button
            onClick={() => onShowToast({ title: 'Fitting Scheduled', message: `Fitting team notified for ${order.vehicleModel}.`, type: 'info' })}
            className="sb-btn sb-btn-secondary sb-btn-sm"
            style={{ padding: '4px 8px' }}
          >
            <Eye size={14} />
            <span>Fitting Sheet</span>
          </button>
        )}
      />

    </div>
  );
}
