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
import { StatusBadge } from '../common/StatusBadge';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { DetailsDrawer } from '../common/DetailsDrawer';

export const ComplaintsView = ({ showToast }) => {
  const [complaints, setComplaints] = useState(MOCK_COMPLAINTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [resolveModal, setResolveModal] = useState({ isOpen: false, ticket: null, actionType: '' });

  const filteredTickets = complaints.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderId.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div className="space-y-6">
      {/* Top Banner KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="sb-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[var(--color-text-secondary)] font-medium">Active Tickets</p>
            <AlertTriangle className="w-4 h-4 text-[var(--color-accent)]" />
          </div>
          <p className="text-2xl font-bold text-[var(--color-text)] mt-1">
            {complaints.filter((c) => c.status !== 'Resolved').length}
          </p>
          <p className="text-[11px] text-[var(--color-accent)] mt-1">1 High Priority SLA</p>
        </div>

        <div className="sb-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[var(--color-text-secondary)] font-medium">Avg Resolution Time</p>
            <Clock className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <p className="text-2xl font-bold text-[var(--color-text)] mt-1">4.6 Hours</p>
          <p className="text-[11px] text-[var(--color-success)] mt-1">Well within 24h SLA target</p>
        </div>

        <div className="sb-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[var(--color-text-secondary)] font-medium">SLA Compliance</p>
            <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
          </div>
          <p className="text-2xl font-bold text-[var(--color-success)] mt-1">97.8%</p>
          <p className="text-[11px] text-[var(--color-text-muted)] mt-1">Target: &gt; 95%</p>
        </div>

        <div className="sb-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[var(--color-text-secondary)] font-medium">Total Resolved (Month)</p>
            <ShieldAlert className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <p className="text-2xl font-bold text-[var(--color-text)] mt-1">142</p>
          <p className="text-[11px] text-[var(--color-text-muted)] mt-1">Customer satisfaction: 94%</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sb-card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search by ticket ID, customer, order ID, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none"
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
      <div className="sb-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Customer & Order</th>
                <th className="py-3 px-4">Category & Subject</th>
                <th className="py-3 px-4">Tailor / Partner</th>
                <th className="py-3 px-4">Priority & SLA</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[var(--color-text-muted)]">
                    No tickets found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[var(--color-primary)]">
                      {ticket.id}
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-[var(--color-text)]">{ticket.customer}</p>
                      <p className="text-[11px] font-mono text-[var(--color-text-muted)]">{ticket.orderId}</p>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                        {ticket.category}
                      </span>
                      <p className="font-medium text-[var(--color-text)] mt-1 truncate">
                        {ticket.subject}
                      </p>
                    </td>

                    <td className="py-3 px-4 text-[var(--color-text-secondary)] font-medium">
                      {ticket.tailor}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ticket.priority === 'High'
                            ? 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300'
                            : ticket.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300'
                        }`}
                      >
                        {ticket.priority}
                      </span>
                      <p className="text-[10px] text-[var(--color-text-muted)] mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ticket.slaDeadline}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={ticket.status} />
                    </td>

                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      {ticket.status !== 'Resolved' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              setResolveModal({
                                isOpen: true,
                                ticket,
                                actionType: 'Rework Authorized'
                              })
                            }
                            className="sb-btn-primary text-xs py-1 px-2"
                          >
                            Rework
                          </button>
                          <button
                            onClick={() =>
                              setResolveModal({
                                isOpen: true,
                                ticket,
                                actionType: 'Full Refund Issued'
                              })
                            }
                            className="sb-btn-secondary text-xs py-1 px-2 text-red-600"
                          >
                            Refund
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[var(--color-success)] font-medium">
                          ✓ Resolved
                        </span>
                      )}
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
          <div className="flex items-center justify-between w-full">
            {selectedTicket && selectedTicket.status !== 'Resolved' && (
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setResolveModal({
                      isOpen: true,
                      ticket: selectedTicket,
                      actionType: 'Rework Authorized'
                    })
                  }
                  className="sb-btn-primary text-xs"
                >
                  Authorize Free Rework
                </button>
                <button
                  onClick={() =>
                    setResolveModal({
                      isOpen: true,
                      ticket: selectedTicket,
                      actionType: 'Full Refund'
                    })
                  }
                  className="sb-btn-secondary text-xs text-red-600"
                >
                  Issue Refund
                </button>
              </div>
            )}
            <button onClick={() => setSelectedTicket(null)} className="sb-btn-secondary text-xs">
              Close
            </button>
          </div>
        }
      >
        {selectedTicket && (
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[var(--color-text)]">
                  {selectedTicket.subject}
                </span>
                <StatusBadge status={selectedTicket.status} />
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                Opened on {selectedTicket.createdAt} • Assigned to {selectedTicket.assignedTo}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                <p className="text-[11px] text-[var(--color-text-muted)]">Related Order</p>
                <p className="font-mono font-bold text-[var(--color-primary)] mt-0.5">
                  {selectedTicket.orderId}
                </p>
              </div>
              <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                <p className="text-[11px] text-[var(--color-text-muted)]">Tailor Atelier</p>
                <p className="font-bold text-[var(--color-text)] mt-0.5">{selectedTicket.tailor}</p>
              </div>
            </div>

            {selectedTicket.resolutionNotes && (
              <div className="p-3 rounded-lg bg-[var(--color-success-light)] border border-green-300 dark:border-green-800">
                <p className="font-bold text-green-900 dark:text-green-200">Resolution Details:</p>
                <p className="text-green-800 dark:text-green-300 mt-1">
                  {selectedTicket.resolutionNotes}
                </p>
                <p className="text-[10px] text-green-700 dark:text-green-400 mt-1">
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
