import React, { useState } from 'react';
import {
  Star,
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  EyeOff,
  CornerDownRight,
  User,
  ShoppingBag,
  Scissors,
  Send,
  ThumbsUp
} from 'lucide-react';
import { MOCK_REVIEWS } from '../../data/adminMockData';
import StatusBadge from '../common/StatusBadge';
import DetailsDrawer from '../common/DetailsDrawer';

export const ReviewsView = ({ showToast }) => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Rating distribution stats
  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / (totalReviews || 1)).toFixed(1);

  // Filtered reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      (r.customer || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.tailor || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.orderId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.comment || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter === 'All' || r.rating === parseInt(ratingFilter, 10);
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesRating && matchesStatus;
  });

  const handleUpdateStatus = (id, newStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedReview && selectedReview.id === id) {
      setSelectedReview((prev) => ({ ...prev, status: newStatus }));
    }
    showToast && showToast(`Review ${id} status updated to ${newStatus}`, 'success');
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedReview) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id ? { ...r, adminReply: replyText } : r
      )
    );
    setSelectedReview((prev) => ({ ...prev, adminReply: replyText }));
    setReplyText('');
    showToast && showToast(`Official StitchBee response posted to ${selectedReview.id}`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner & Stats */}
      <div className="sb-grid-4">
        <div className="sb-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--sb-radius-md)', backgroundColor: 'var(--sb-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sb-accent)', flexShrink: 0 }}>
            <Star style={{ width: '22px', height: '22px', fill: 'currentColor' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', fontWeight: 600, margin: 0 }}>Platform Average</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--sb-text-title)', margin: '2px 0' }}>{avgRating} / 5.0</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--sb-status-success)', fontWeight: 600, margin: 0 }}>96% Positive Sentiment</p>
          </div>
        </div>

        <div className="sb-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', fontWeight: 600, margin: 0 }}>Total Reviews</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--sb-text-title)', margin: '4px 0 2px 0' }}>{totalReviews}</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--sb-primary)', margin: 0 }}>Across tailors & designers</p>
        </div>

        <div className="sb-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', fontWeight: 600, margin: 0 }}>Published Live</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--sb-status-success)', margin: '4px 0 2px 0' }}>
            {reviews.filter((r) => r.status === 'Published').length}
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)', margin: 0 }}>Visible to all users</p>
        </div>

        <div className="sb-card" style={{ padding: '16px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)', fontWeight: 600, margin: 0 }}>Needs Moderation</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--sb-accent)', margin: '4px 0 2px 0' }}>
            {reviews.filter((r) => r.status === 'Under Review').length}
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--sb-accent)', margin: 0 }}>SLA: Review in &lt; 24h</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sb-card" style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div className="sb-search-box" style={{ maxWidth: '420px', flex: 1 }}>
            <Search style={{ width: '16px', height: '16px' }} />
            <input
              type="text"
              placeholder="Search by customer, tailor, order ID, or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Rating Filter */}
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="sb-select-control"
            >
              <option value="All">All Star Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="sb-select-control"
            >
              <option value="All">All Moderation Statuses</option>
              <option value="Published">Published</option>
              <option value="Under Review">Under Review</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredReviews.length === 0 ? (
          <div className="sb-card" style={{ padding: '36px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--sb-text-muted)' }}>
            No customer reviews found matching your search or filters.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="sb-card"
              style={{
                padding: '20px',
                cursor: 'pointer',
                transition: 'border-color var(--sb-transition-fast), box-shadow var(--sb-transition-fast)'
              }}
              onClick={() => setSelectedReview(rev)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--sb-text-title)' }}>{rev.customer}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--sb-text-muted)' }}>• {rev.date}</span>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--sb-primary)', backgroundColor: 'var(--sb-primary-light)', padding: '2px 6px', borderRadius: 'var(--sb-radius-sm)' }}>
                        Order: {rev.orderId}
                      </span>
                      <StatusBadge status={rev.status} />
                    </div>

                    {/* Rating Stars */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--sb-accent)' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          style={{
                            width: '14px',
                            height: '14px',
                            fill: s <= rev.rating ? 'var(--sb-accent)' : 'none',
                            color: s <= rev.rating ? 'var(--sb-accent)' : 'var(--sb-border-strong)'
                          }}
                        />
                      ))}
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sb-text-title)', marginLeft: '4px' }}>
                        {rev.rating}.0 / 5.0
                      </span>
                    </div>

                    {/* Comment */}
                    <p style={{ fontSize: '0.8rem', color: 'var(--sb-text-body)', lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
                      "{rev.comment}"
                    </p>

                    {/* Partners Mentioned */}
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.72rem', color: 'var(--sb-text-muted)', paddingTop: '4px' }}>
                      <span>
                        Tailor: <strong style={{ color: 'var(--sb-text-title)' }}>{rev.tailor}</strong>
                      </span>
                      {rev.designer && rev.designer !== '-' && (
                        <span>
                          Designer: <strong style={{ color: 'var(--sb-text-title)' }}>{rev.designer}</strong>
                        </span>
                      )}
                      {rev.deliveryPartner && (
                        <span>
                          Delivery: <strong style={{ color: 'var(--sb-text-title)' }}>{rev.deliveryPartner}</strong>
                        </span>
                      )}
                    </div>

                    {/* Admin Reply if present */}
                    {rev.adminReply && (
                      <div style={{ marginTop: '8px', padding: '10px 14px', borderRadius: 'var(--sb-radius-md)', backgroundColor: 'var(--sb-primary-light)', border: '1px solid var(--sb-primary-border)', fontSize: '0.75rem', color: 'var(--sb-text-title)' }}>
                        <p style={{ fontWeight: 600, color: 'var(--sb-primary)', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 4px 0' }}>
                          <CornerDownRight style={{ width: '14px', height: '14px' }} />
                          StitchBee Official Response:
                        </p>
                        <p style={{ margin: 0 }}>{rev.adminReply}</p>
                      </div>
                    )}
                  </div>

                  {/* Quick Moderation Actions */}
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {rev.status !== 'Published' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(rev.id, 'Published')}
                        className="sb-btn sb-btn-primary"
                        style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                      >
                        <CheckCircle style={{ width: '13px', height: '13px' }} />
                        Approve
                      </button>
                    )}
                    {rev.status !== 'Hidden' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(rev.id, 'Hidden')}
                        className="sb-btn sb-btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.72rem', color: 'var(--sb-status-failed)' }}
                      >
                        <EyeOff style={{ width: '13px', height: '13px' }} />
                        Hide
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedReview(rev)}
                      className="sb-btn sb-btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                    >
                      Moderate & Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Inspection & Reply Drawer */}
      <DetailsDrawer
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        title={selectedReview ? `Review Moderation: ${selectedReview.id}` : ''}
        subtitle={selectedReview ? `Customer: ${selectedReview.customer} • Order: ${selectedReview.orderId}` : ''}
        footer={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedReview.id, 'Published')}
                className="sb-btn sb-btn-primary"
                style={{ fontSize: '0.78rem' }}
              >
                Publish Live
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedReview.id, 'Hidden')}
                className="sb-btn sb-btn-secondary"
                style={{ fontSize: '0.78rem', color: 'var(--sb-status-failed)' }}
              >
                Hide
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSelectedReview(null)}
              className="sb-btn sb-btn-secondary"
              style={{ fontSize: '0.78rem', marginLeft: 'auto' }}
            >
              Close
            </button>
          </div>
        }
      >
        {selectedReview && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.78rem' }}>
            <div style={{ padding: '16px', borderRadius: 'var(--sb-radius-lg)', backgroundColor: 'var(--sb-bg-surface-hover)', border: '1px solid var(--sb-border-default)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--sb-text-muted)' }}>Customer Rating</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--sb-accent)' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      style={{
                        width: '14px',
                        height: '14px',
                        fill: s <= selectedReview.rating ? 'currentColor' : 'none',
                        color: s <= selectedReview.rating ? 'currentColor' : 'var(--sb-border-strong)'
                      }}
                    />
                  ))}
                  <span style={{ fontWeight: 700, color: 'var(--sb-text-title)', marginLeft: '4px' }}>
                    {selectedReview.rating}.0
                  </span>
                </div>
              </div>

              <p style={{ fontStyle: 'italic', color: 'var(--sb-text-body)', margin: '8px 0 0 0', lineHeight: 1.5 }}>
                "{selectedReview.comment}"
              </p>
            </div>

            {/* Entity Associations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sb-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                Associated Stakeholders
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '10px', borderRadius: 'var(--sb-radius-md)', border: '1px solid var(--sb-border-default)', backgroundColor: 'var(--sb-bg-surface)' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)', margin: 0 }}>Tailoring Atelier</p>
                  <p style={{ fontWeight: 600, color: 'var(--sb-text-title)', margin: '2px 0 0 0' }}>{selectedReview.tailor}</p>
                </div>
                <div style={{ padding: '10px', borderRadius: 'var(--sb-radius-md)', border: '1px solid var(--sb-border-default)', backgroundColor: 'var(--sb-bg-surface)' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)', margin: 0 }}>Order ID</p>
                  <p style={{ fontWeight: 600, color: 'var(--sb-primary)', margin: '2px 0 0 0' }}>{selectedReview.orderId}</p>
                </div>
                {selectedReview.designer && selectedReview.designer !== '-' && (
                  <div style={{ padding: '10px', borderRadius: 'var(--sb-radius-md)', border: '1px solid var(--sb-border-default)', backgroundColor: 'var(--sb-bg-surface)' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)', margin: 0 }}>Fashion Designer</p>
                    <p style={{ fontWeight: 600, color: 'var(--sb-text-title)', margin: '2px 0 0 0' }}>{selectedReview.designer}</p>
                  </div>
                )}
                {selectedReview.deliveryPartner && (
                  <div style={{ padding: '10px', borderRadius: 'var(--sb-radius-md)', border: '1px solid var(--sb-border-default)', backgroundColor: 'var(--sb-bg-surface)' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--sb-text-muted)', margin: 0 }}>Delivery Hero</p>
                    <p style={{ fontWeight: 600, color: 'var(--sb-text-title)', margin: '2px 0 0 0' }}>{selectedReview.deliveryPartner}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Official Reply Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sb-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>
                Public Admin Reply
              </h4>
              <p style={{ fontSize: '0.72rem', color: 'var(--sb-text-muted)', margin: 0 }}>
                This message will be visible publicly on the tailor's profile and order review page.
              </p>
              <textarea
                rows={3}
                placeholder="Write an official StitchBee response (e.g., 'Thank you for your feedback! We are glad you enjoyed the fit...')"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="sb-input"
                style={{ resize: 'vertical' }}
              />
              <button
                type="button"
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                className="sb-btn sb-btn-primary"
                style={{ alignSelf: 'flex-start', fontSize: '0.75rem', marginTop: '4px' }}
              >
                <Send style={{ width: '13px', height: '13px' }} />
                Post Official Reply
              </button>
            </div>
          </div>
        )}
      </DetailsDrawer>
    </div>
  );
};

export default ReviewsView;
