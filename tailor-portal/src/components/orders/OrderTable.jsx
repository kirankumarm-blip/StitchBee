import React from 'react';
import { MessageSquare, Edit } from 'lucide-react';
import OrderProgressBar from './OrderProgressBar';

export default function OrderTable({ orders, onEditStage, onSort, sortBy, sortAsc, onMessage, onCreateNewOrder, theme }) {
  return (
    <div style={{
      background: theme === 'dark' ? '#141126' : '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0 2px 8px rgba(16,24,40,0.04)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Orders ({orders.length})
        </h4>
        <button onClick={() => alert("Viewing full orders list...")} style={{ background: 'none', border: 'none', color: '#F72585', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
          View All →
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left', background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#F7F8FA' }}>
              <th onClick={() => onSort('customer')} style={{ padding: '12px 10px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                Customer {sortBy === 'customer' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th style={{ padding: '12px 10px', fontSize: '11px', fontWeight: 600 }}>Outfit & Fabric</th>
              <th onClick={() => onSort('date')} style={{ padding: '12px 10px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                Delivery Date {sortBy === 'date' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => onSort('progress')} style={{ padding: '12px 10px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                Progress {sortBy === 'progress' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => onSort('status')} style={{ padding: '12px 10px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                Status {sortBy === 'status' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => onSort('amount')} style={{ padding: '12px 10px', fontSize: '11px', fontWeight: 600, textAlign: 'right', cursor: 'pointer' }}>
                Amount {sortBy === 'amount' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th style={{ padding: '12px 10px', fontSize: '11px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  <div>No orders found</div>
                  <p style={{ margin: '4px 0 12px 0', fontSize: '12px' }}>Try changing your filters or create a new order.</p>
                  <button 
                    onClick={onCreateNewOrder}
                    style={{ padding: '6px 14px', background: '#F72585', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    + New Request
                  </button>
                </td>
              </tr>
            ) : (
              orders.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--border-color)', height: '62px', transition: 'background 0.15s ease' }}>
                  {/* Customer */}
                  <td style={{ padding: '10px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={row.image} alt={row.customer} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.customer}</div>
                        <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)' }}>#{row.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Outfit & Fabric */}
                  <td style={{ padding: '10px 10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.outfit}</div>
                    <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-muted)' }}>{row.fabric}</span>
                  </td>

                  {/* Delivery Date */}
                  <td style={{ padding: '10px 10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.date}</div>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: 400, 
                      color: row.daysLeft.includes('3 days') ? '#F79009' : row.daysLeft.includes('Completed') ? '#12B76A' : row.daysLeft.includes('Cancelled') ? 'var(--text-muted)' : '#F04438' 
                    }}>
                      {row.daysLeft}
                    </span>
                  </td>

                  {/* Progress Bar Component */}
                  <td style={{ padding: '10px 10px', minWidth: '130px' }}>
                    <OrderProgressBar progress={row.progress} />
                  </td>

                  {/* Status */}
                  <td style={{ padding: '10px 10px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: row.status === 'Completed' ? 'rgba(18,183,106,0.1)' : 
                                  row.status === 'Stitching' ? 'rgba(139,44,245,0.1)' : 
                                  row.status === 'Cutting' ? 'rgba(247,144,9,0.1)' : 
                                  row.status === 'Pending' ? (theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F7F8FA') : 
                                  row.status === 'Cancelled' ? 'rgba(240,68,56,0.1)' :
                                  'rgba(247,37,133,0.1)',
                      color: row.status === 'Completed' ? '#12B76A' : 
                             row.status === 'Stitching' ? '#8B2CF5' : 
                             row.status === 'Cutting' ? '#F79009' : 
                             row.status === 'Pending' ? 'var(--text-muted)' : 
                             row.status === 'Cancelled' ? '#F04438' :
                             '#F72585'
                    }}>{row.status}</span>
                  </td>

                  {/* Amount */}
                  <td style={{ padding: '10px 10px', textAlign: 'right', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    ₹{row.amount.toLocaleString()}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '10px 10px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button 
                        title="Message Client"
                        className="btn btn-secondary" 
                        style={{ padding: '0', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                        onClick={() => onMessage(row)}
                      >
                        <MessageSquare size={13} />
                      </button>
                      <button 
                        title="Update Production Stage"
                        className="btn btn-secondary" 
                        style={{ padding: '0', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(247,37,133,0.08)', color: '#F72585', border: '1px solid rgba(247,37,133,0.2)' }} 
                        onClick={() => onEditStage(row)}
                      >
                        <Edit size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
