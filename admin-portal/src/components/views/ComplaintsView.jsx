import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  User,
  ShoppingBag,
  Scissors
} from 'lucide-react';
import { MOCK_COMPLAINTS } from '../../data/adminMockData';
import StatusBadge from '../common/StatusBadge';
import ConfirmationModal from '../common/ConfirmationModal';
import DetailsDrawer from '../common/DetailsDrawer';

export const ComplaintsView = ({ showToast }) => {
  const [complaints, setComplaints] = useState(MOCK_COMPLAINTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [resolveModal, setResolveModal] = useState({ isOpen: false, ticket: null, actionType: '' });

  const filteredTickets = (complaints || []).filter((t) => {
    const matchesSearch =
      (t.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.customer || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.orderId || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleConfirmResolution = (reason) => {
    const { ticket, actionType } = resolveModal;
    setComplaints((prev) =>
      prev.map((t) =>
        t.id === ticket.id
          ? { ...t, status: 'Resolved', resolutionNotes: reason, resolutionType: actionType }
          : t
      )
    );
    if (selectedTicket && selectedTicket.id === ticket.id) {
      setSelectedTicket((prev) => ({
        ...prev,
        status: 'Resolved',
        resolutionNotes: reason,
        resolutionType: actionType
      }));
    }
    setResolveModal({ isOpen: false, ticket: null, actionType: '' });
    showToast &&
      showToast(
        `Ticket ${ticket.id} resolved successfully via ${actionType}.`,
        'success'
      );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner KPI strip */}
      <div className="sb-grid-4">
        <div className="sb-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', fontWeight: 600, margin: 0 }}>Active Tickets</p>
            <AlertTriangle style={{ width: '18px', height: '18px', color: 'var(--sb-accent)' }} />
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--sb-text-title)', margin: '4px 0 2px 0' }}>
            {complaints.filter((c) => c.status !== 'Resolved').length}
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--sb-accent)', margin: 0 }}>1 High Priority SLA</p>
        </div>

        <div className="sb-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', fontWeight: 600, margin: 0 }}>Avg Resolution Time</p>
            <Clock style={{ width: '18px', height: '18px', color: 'var(--sb-primary)' }} />
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--sb-text-title)', margin: '4px 0 2px 0' }}>4.6 Hours</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--sb-status-success)', margin: 0 }}>Well within 24h SLA target</p>
        </div>

        <div className="sb-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', fontWeight: 600, margin: 0 }}>SLA Compliance</p>
            <CheckCircle2 style={{ width: '18px', height: '18px', color: 'var(--sb-status-success)' }} />
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--sb-status-success)', margin: '4px 0 2px 0' }}>97.8%</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)', margin: 0 }}>Target: &gt; 95%</p>
        </div>

        <div className="sb-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', fontWeight: 600, margin: 0 }}>Total Resolved (Month)</p>
            <ShieldAlert style={{ width: '18px', height: '18px', color: 'var(--sb-primary)' }} />
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--sb-text-title)', margin: '4px 0 2px 0' }}>142</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)', margin: 0 }}>Customer satisfaction: 94%</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sb-card" style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div className="sb-search-box" style={{ maxWidth: '420px', flex: 1 }}>
            <Search style={{ width: '16px', height: '16px' }} />
            <input
              type="text"
              placeholder="Search by ticket ID, customer, order ID, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="sb-select-control"
            >
              <option value="All">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="sb-select-control"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="sb-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--sb-bg-surface-hover)', borderBottom: '1px solid var(--sb-border-default)', color: 'var(--sb-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Ticket</th>
                <th style={{ padding: '12px 16px' }}>Customer & Order</th>
                <th style={{ padding: '12px 16px' }}>Category & Subject</th>
                <th style={{ padding: '12px 16px' }}>Tailor / Partner</th>
                <th style={{ padding: '12px 16px' }}>Priority & SLA</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: 'var(--sb-text-muted)' }}>
                    No tickets found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    style={{ borderBottom: '1px solid var(--sb-border-default)', cursor: 'pointer', transition: 'background-color var(--sb-transition-fast)' }}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--sb-primary)' }}>
                      {ticket.id}
                    </td>

                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ fontWeight: 600, color: 'var(--sb-text-title)', margin: 0 }}>{ticket.customer}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>Order #{ticket.orderId}</p>
                    </td>

                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ fontWeight: 600, color: 'var(--sb-text-title)', margin: 0 }}>{ticket.subject}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: '2px 0 0 0' }}>{ticket.category}</p>
                    </td>

                    <td style={{ padding: '12px 16px', color: 'var(--sb-text-body)' }}>
                      {ticket.tailor}
                    </td>

                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: 'var(--sb-radius-sm)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor:
                            ticket.priority === 'High'
                              ? 'var(--sb-status-failed-bg)'
                              : ticket.priority === 'Medium'
                              ? 'var(--sb-status-pending-bg)'
                              : 'var(--sb-bg-surface-hover)',
                          color:
                            ticket.priority === 'High'
                              ? 'var(--sb-status-failed)'
                              : ticket.priority === 'Medium'
                              ? 'var(--sb-status-pending)'
                              : 'var(--sb-text-muted)'
                        }}
                      >
                        {ticket.priority} Priority
                      </span>
                    </td>

                    <td style={{ padding: '12px 16px' }}>
                      <StatusBadge status={ticket.status} />
                    </td>

                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicket(ticket);
                        }}
                        className="sb-btn sb-btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                      >
                        View & Resolve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details Inspection Drawer */}
      <DetailsDrawer
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        title={selectedTicket ? `Support Ticket: ${selectedTicket.id}` : ''}
        subtitle={selectedTicket ? `Customer: ${selectedTicket.customer}` : ''}
        footer={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '12px' }}>
            {selectedTicket && selectedTicket.status !== 'Resolved' && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() =>
                    setResolveModal({
                      isOpen: true,
                      ticket: selectedTicket,
                      actionType: 'Rework Authorized'
                    })
                  }
                  className="sb-btn sb-btn-primary"
                  style={{ fontSize: '0.78rem' }}
                >
                  Authorize Free Rework
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setResolveModal({
                      isOpen: true,
                      ticket: selectedTicket,
                      actionType: 'Full Refund'
                    })
                  }
                  className="sb-btn sb-btn-danger"
                  style={{ fontSize: '0.78rem' }}
                >
                  Issue Refund
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="sb-btn sb-btn-secondary"
              style={{ fontSize: '0.78rem', marginLeft: 'auto' }}
            >
              Close
            </button>
          </div>
        }
      >
        {selectedTicket && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.78rem' }}>
            <div style={{ padding: '16px', borderRadius: 'var(--sb-radius-lg)', backgroundColor: 'var(--sb-bg-surface-hover)', border: '1px solid var(--sb-border-default)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--sb-text-title)' }}>
                  {selectedTicket.subject}
                </span>
                <StatusBadge status={selectedTicket.status} />
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: 0 }}>
                Opened on {selectedTicket.createdAt} • Assigned to {selectedTicket.assignedTo}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: 'var(--sb-radius-md)', border: '1px solid var(--sb-border-default)', backgroundColor: 'var(--sb-bg-surface)' }}>
                <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: 0 }}>Related Order</p>
                <p style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--sb-primary)', margin: '4px 0 0 0' }}>
                  {selectedTicket.orderId}
                </p>
              </div>
              <div style={{ padding: '12px', borderRadius: 'var(--sb-radius-md)', border: '1px solid var(--sb-border-default)', backgroundColor: 'var(--sb-bg-surface)' }}>
                <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: 0 }}>Tailor Atelier</p>
                <p style={{ fontWeight: 700, color: 'var(--sb-text-title)', margin: '4px 0 0 0' }}>{selectedTicket.tailor}</p>
              </div>
            </div>

            {selectedTicket.resolutionNotes && (
              <div style={{ padding: '14px', borderRadius: 'var(--sb-radius-md)', backgroundColor: 'var(--sb-status-success-bg)', border: '1px solid var(--sb-status-success-border)' }}>
                <p style={{ fontWeight: 700, color: 'var(--sb-status-success)', margin: 0 }}>Resolution Details:</p>
                <p style={{ color: 'var(--sb-text-body)', margin: '6px 0 0 0' }}>
                  {selectedTicket.resolutionNotes}
                </p>
                <p style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)', margin: '6px 0 0 0' }}>
                  Type: {selectedTicket.resolutionType}
                </p>
              </div>
            )}
          </div>
        )}
      </DetailsDrawer>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={resolveModal.isOpen}
        title={`Resolve Dispute (${resolveModal.actionType})`}
        message={`You are taking action on ticket ${resolveModal.ticket?.id}. Please document the rationale for the customer and tailor records.`}
        confirmText="Confirm Resolution"
        confirmVariant="primary"
        requireReason={true}
        onConfirm={handleConfirmResolution}
        onCancel={() => setResolveModal({ isOpen: false, ticket: null, actionType: '' })}
      />
    </div>
  );
};

export default ComplaintsView;
