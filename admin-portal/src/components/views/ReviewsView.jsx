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
import { StatusBadge } from '../common/StatusBadge';
import { DetailsDrawer } from '../common/DetailsDrawer';

export const ReviewsView = ({ showToast }) => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Rating distribution stats
  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviews || 1)).toFixed(1);

  // Filtered reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tailor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="sb-card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)]">
            <Star className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-secondary)] font-medium">Platform Average</p>
            <p className="text-2xl font-bold text-[var(--color-text)]">{avgRating} / 5.0</p>
            <p className="text-[11px] text-[var(--color-success)] font-medium">96% Positive Sentiment</p>
          </div>
        </div>

        <div className="sb-card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] font-medium">Total Reviews</p>
          <p className="text-2xl font-bold text-[var(--color-text)] mt-1">{totalReviews}</p>
          <p className="text-[11px] text-[var(--color-primary)] mt-1">Across tailors & designers</p>
        </div>

        <div className="sb-card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] font-medium">Published Live</p>
          <p className="text-2xl font-bold text-[var(--color-success)] mt-1">
            {reviews.filter((r) => r.status === 'Published').length}
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)] mt-1">Visible to all users</p>
        </div>

        <div className="sb-card p-4">
          <p className="text-xs text-[var(--color-text-secondary)] font-medium">Needs Moderation</p>
          <p className="text-2xl font-bold text-[var(--color-accent)] mt-1">
            {reviews.filter((r) => r.status === 'Under Review').length}
          </p>
          <p className="text-[11px] text-[var(--color-accent)] mt-1">SLA: Review in &lt; 24h</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sb-card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search by customer, tailor, order ID, or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Rating Filter */}
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none"
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
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none"
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
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="sb-card p-8 text-center text-xs text-[var(--color-text-muted)]">
            No customer reviews found matching your search or filters.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="sb-card p-5 hover:border-[var(--color-primary)] transition-all cursor-pointer"
              onClick={() => setSelectedReview(rev)}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-[var(--color-text)]">{rev.customer}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">• {rev.date}</span>
                    <span className="text-xs font-mono text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2 py-0.5 rounded">
                      Order: {rev.orderId}
                    </span>
                    <StatusBadge status={rev.status} />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[var(--color-accent)]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-[var(--color-text)] ml-1">
                      {rev.rating}.0 / 5.0
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-[var(--color-text)] leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  {/* Partners Mentioned */}
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-[var(--color-text-secondary)] pt-1">
                    <span>
                      Tailor: <strong className="text-[var(--color-text)]">{rev.tailor}</strong>
                    </span>
                    {rev.designer && rev.designer !== '-' && (
                      <span>
                        Designer: <strong className="text-[var(--color-text)]">{rev.designer}</strong>
                      </span>
                    )}
                    {rev.deliveryPartner && (
                      <span>
                        Delivery: <strong className="text-[var(--color-text)]">{rev.deliveryPartner}</strong>
                      </span>
                    )}
                  </div>

                  {/* Admin Reply if present */}
                  {rev.adminReply && (
                    <div className="mt-2 p-2.5 rounded-lg bg-[var(--color-primary-light)] border border-[var(--color-primary)] text-xs text-[var(--color-text)]">
                      <p className="font-semibold text-[var(--color-primary)] flex items-center gap-1.5 mb-1">
                        <CornerDownRight className="w-3.5 h-3.5" />
                        StitchBee Official Response:
                      </p>
                      <p>{rev.adminReply}</p>
                    </div>
                  )}
                </div>

                {/* Quick Moderation Actions */}
                <div
                  className="flex flex-wrap md:flex-col items-end gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {rev.status !== 'Published' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'Published')}
                      className="sb-btn-primary text-xs py-1 px-2.5 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve & Publish
                    </button>
                  )}
                  {rev.status !== 'Hidden' && (
                    <button
                      onClick={() => handleUpdateStatus(rev.id, 'Hidden')}
                      className="sb-btn-secondary text-xs py-1 px-2.5 flex items-center gap-1 text-red-600 hover:text-red-700"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      Hide Review
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedReview(rev)}
                    className="sb-btn-secondary text-xs py-1 px-2.5"
                  >
                    Moderate & Reply
                  </button>
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
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdateStatus(selectedReview.id, 'Published')}
                className="sb-btn-primary text-xs"
              >
                Publish Live
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedReview.id, 'Hidden')}
                className="sb-btn-secondary text-xs text-red-600"
              >
                Hide
              </button>
            </div>
            <button onClick={() => setSelectedReview(null)} className="sb-btn-secondary text-xs">
              Close
            </button>
          </div>
        }
      >
        {selectedReview && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Rating</span>
                <div className="flex items-center gap-1 text-[var(--color-accent)]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= selectedReview.rating ? 'fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-bold text-[var(--color-text)] ml-1">
                    {selectedReview.rating}.0
                  </span>
                </div>
              </div>

              <p className="text-xs text-[var(--color-text)] italic pt-2">
                "{selectedReview.comment}"
              </p>
            </div>

            {/* Entity Associations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                Associated Stakeholders
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <p className="text-[11px] text-[var(--color-text-muted)]">Tailoring Atelier</p>
                  <p className="font-semibold text-[var(--color-text)]">{selectedReview.tailor}</p>
                </div>
                <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <p className="text-[11px] text-[var(--color-text-muted)]">Order ID</p>
                  <p className="font-semibold text-[var(--color-primary)]">{selectedReview.orderId}</p>
                </div>
                {selectedReview.designer && selectedReview.designer !== '-' && (
                  <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <p className="text-[11px] text-[var(--color-text-muted)]">Fashion Designer</p>
                    <p className="font-semibold text-[var(--color-text)]">{selectedReview.designer}</p>
                  </div>
                )}
                {selectedReview.deliveryPartner && (
                  <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <p className="text-[11px] text-[var(--color-text-muted)]">Delivery Hero</p>
                    <p className="font-semibold text-[var(--color-text)]">{selectedReview.deliveryPartner}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Official Reply Box */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                Public Admin Reply
              </h4>
              <p className="text-[11px] text-[var(--color-text-secondary)]">
                This message will be visible publicly on the tailor's profile and order review page.
              </p>
              <textarea
                rows={3}
                placeholder="Write an official StitchBee response (e.g., 'Thank you for your feedback! We are glad you enjoyed the fit...')"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-3 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              />
              <button
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                className="sb-btn-primary text-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
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
