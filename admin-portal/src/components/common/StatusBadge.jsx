import React from 'react';

export function StatusBadge({ status, text }) {
  if (!status) return null;

  const normalized = String(status).toLowerCase().trim();
  let badgeClass = 'sb-badge-pending';

  if (['approved', 'active', 'delivered', 'completed', 'paid', 'successful', 'resolved', 'published'].includes(normalized)) {
    badgeClass = 'sb-badge-success';
  } else if (['pending', 'under review', 'measurement pending', 'fabric pending', 'quality check', 'quotation', 'advance 50%'].includes(normalized)) {
    badgeClass = 'sb-badge-pending';
  } else if (['failed', 'rejected', 'blocked', 'cancelled', 'returned'].includes(normalized)) {
    badgeClass = 'sb-badge-failed';
  } else if (['stitching', 'in progress', 'assigned to tailor', 'production', 'out for delivery', 'open'].includes(normalized)) {
    badgeClass = 'sb-badge-progress';
  } else if (['rework', 'escalated'].includes(normalized)) {
    badgeClass = 'sb-badge-accent';
  } else if (['suspended', 'inactive', 'closed'].includes(normalized)) {
    badgeClass = 'sb-badge-suspended';
  }

  return (
    <span className={`sb-badge ${badgeClass}`}>
      <span className="sb-badge-dot"></span>
      <span>{text || status}</span>
    </span>
  );
}

export default StatusBadge;
