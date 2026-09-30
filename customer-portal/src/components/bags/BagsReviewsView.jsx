import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, Heart, MapPin, CheckCircle2, ChevronRight, ArrowLeft, 
  Plus, MessageSquare, Sparkles, Filter 
} from 'lucide-react';
import { ALL_REVIEWS } from '../../utils/bagsStore';

export default function BagsReviewsView({ showToast }) {
  const navigate = useNavigate();

  const [reviewsList, setReviewsList] = useState(ALL_REVIEWS);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('all');
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  // New review form state
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formQuote, setFormQuote] = useState('');

  const filteredReviews = reviewsList.filter(r => {
    if (selectedRatingFilter === 'all') return true;
    return r.rating === parseInt(selectedRatingFilter, 10);
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formQuote.trim()) {
      showToast('Please enter your name and review quote');
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      customerName: formName.trim(),
      location: formLocation.trim() || 'India',
      rating: formRating,
      date: 'Just now',
      verified: true,
      review: formQuote.trim(),
      productId: 'prod-1',
      productName: 'Classic Leather Handbag',
      productImage: '/featured_bags/prod_1.png',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
    };

    setReviewsList([newRev, ...reviewsList]);
    setWriteModalOpen(false);
    setFormName('');
    setFormLocation('');
    setFormQuote('');
    showToast('Thank you! Your verified review has been published ⭐');
  };

  return (
    <div className="bl-reviews-page">
      <div className="bl-container" style={{ padding: '24px 12px 60px' }}>
        
        {/* Breadcrumb Navigation */}
        <nav className="bl-breadcrumbs" aria-label="Breadcrumb">
          <span onClick={() => navigate('/')} className="bl-crumb-link">Home</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span onClick={() => navigate('/bags')} className="bl-crumb-link">Bags & Leather</span>
          <ChevronRight size={14} className="bl-crumb-sep" />
          <span className="bl-crumb-active">Customer Reviews</span>
        </nav>

        {/* Back Link */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            className="bl-back-btn" 
            onClick={() => navigate('/bags')}
          >
            <ArrowLeft size={16} /> Back to Bags Studio
          </button>
        </div>

        {/* Header Block */}
        <div className="bl-reviews-header-wrap">
          <div>
            <span className="bl-tag-label">LOVED BY OUR CUSTOMERS</span>
            <h1 className="bl-serif-title" style={{ fontSize: '2.4rem', margin: '4px 0 6px' }}>
              Real People. Real Bags.
            </h1>
            <p className="bl-section-subtext" style={{ margin: 0, maxWidth: '600px' }}>
              Read verified customer experiences from owners of StitchBee custom and ready-made handcrafted leather bags across India.
            </p>
          </div>

          <button 
            className="bl-btn-primary"
            onClick={() => setWriteModalOpen(true)}
          >
            <Plus size={16} /> Write a Review
          </button>
        </div>

        {/* Rating Breakdown Banner Card */}
        <div className="bl-reviews-summary-card">
          <div className="bl-rating-big-box">
            <span className="bl-rating-giant">4.9</span>
            <div className="bl-stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span className="bl-rating-total-count">Based on 180+ verified orders</span>
          </div>

          <div className="bl-rating-progress-list">
            <div className="bl-rating-bar-row">
              <span className="bl-bar-star-num">5 Stars</span>
              <div className="bl-bar-bg"><div className="bl-bar-fill" style={{ width: '92%' }} /></div>
              <span className="bl-bar-pct">92%</span>
            </div>
            <div className="bl-rating-bar-row">
              <span className="bl-bar-star-num">4 Stars</span>
              <div className="bl-bar-bg"><div className="bl-bar-fill" style={{ width: '7%' }} /></div>
              <span className="bl-bar-pct">7%</span>
            </div>
            <div className="bl-rating-bar-row">
              <span className="bl-bar-star-num">3 Stars</span>
              <div className="bl-bar-bg"><div className="bl-bar-fill" style={{ width: '1%' }} /></div>
              <span className="bl-bar-pct">1%</span>
            </div>
          </div>

          <div className="bl-rating-trust-box">
            <div className="bl-trust-tag"><CheckCircle2 size={16} className="bl-text-pink" /> 100% Genuine Hides</div>
            <div className="bl-trust-tag"><CheckCircle2 size={16} className="bl-text-pink" /> Hand-Inspected Craftsmanship</div>
            <div className="bl-trust-tag"><CheckCircle2 size={16} className="bl-text-pink" /> Free Alterations Guarantee</div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="bl-reviews-filter-bar">
          <div className="bl-filter-pills-row">
            <button 
              className={`bl-shop-cat-pill ${selectedRatingFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedRatingFilter('all')}
            >
              All Reviews ({reviewsList.length})
            </button>
            <button 
              className={`bl-shop-cat-pill ${selectedRatingFilter === '5' ? 'active' : ''}`}
              onClick={() => setSelectedRatingFilter('5')}
            >
              5 Stars Only ★★★★★
            </button>
            <button 
              className={`bl-shop-cat-pill ${selectedRatingFilter === '4' ? 'active' : ''}`}
              onClick={() => setSelectedRatingFilter('4')}
            >
              4 Stars Only ★★★★
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="bl-reviews-grid-3">
          {filteredReviews.map(rev => (
            <div key={rev.id} className="bl-testimonial-card bl-review-card-full">
              {/* Top Row: Avatar & Pin on Left, Stars & Quote on Right */}
              <div className="bl-testimonial-top">
                <div className="bl-t-avatar-box">
                  <img src={rev.avatar} alt={rev.customerName} className="bl-t-avatar" />
                  <div className="bl-t-pin-badge">
                    <MapPin size={13} />
                  </div>
                </div>

                <div className="bl-t-content">
                  <div className="bl-t-stars-row-wrap">
                    <div className="bl-t-stars">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="bl-verified-badge"><CheckCircle2 size={12} /> Verified Buyer</span>
                    )}
                  </div>
                  <p className="bl-t-quote">"{rev.review}"</p>
                </div>
              </div>

              {/* Bottom Row: Customer Name/City on Left, Purchased Bag Thumbnail on Right */}
              <div className="bl-t-footer">
                <div className="bl-t-author">
                  <span className="bl-t-name">{rev.customerName}</span>
                  <span className="bl-t-loc">{rev.location} • {rev.date}</span>
                  {rev.productName && (
                    <span className="bl-t-item-name">{rev.productName}</span>
                  )}
                </div>

                {rev.productImage && (
                  <div 
                    className="bl-t-product-box"
                    onClick={() => rev.productId && navigate(`/bags/product/${rev.productId}`)}
                    style={{ cursor: rev.productId ? 'pointer' : 'default' }}
                    title={rev.productName}
                  >
                    <img src={rev.productImage} alt={rev.productName || 'Purchased Bag'} className="bl-t-item-thumb" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {writeModalOpen && (
        <div className="bl-modal-backdrop" onClick={() => setWriteModalOpen(false)}>
          <div className="bl-modal-card bl-write-review-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="bl-serif-title" style={{ fontSize: '1.5rem', margin: 0 }}>
                Write a Verified Review
              </h3>
              <button onClick={() => setWriteModalOpen(false)} className="bl-modal-close-simple">✕</button>
            </div>

            <form onSubmit={handleAddReview} className="bl-write-review-form">
              <div className="bl-form-group">
                <label>Your Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Shalini Nair" 
                  value={formName} 
                  onChange={(e) => setFormName(e.target.value)} 
                  className="bl-form-input"
                />
              </div>

              <div className="bl-form-group">
                <label>Your City *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Bengaluru, Karnataka" 
                  value={formLocation} 
                  onChange={(e) => setFormLocation(e.target.value)} 
                  className="bl-form-input"
                />
              </div>

              <div className="bl-form-group">
                <label>Rating</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map(starNum => (
                    <button
                      key={starNum}
                      type="button"
                      onClick={() => setFormRating(starNum)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    >
                      <Star size={24} fill={starNum <= formRating ? '#f59e0b' : 'none'} color="#f59e0b" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bl-form-group">
                <label>Your Review & Experience *</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="Tell us about the leather quality, stitching, delivery, or custom experience..."
                  value={formQuote} 
                  onChange={(e) => setFormQuote(e.target.value)}
                  className="bl-form-textarea"
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button type="submit" className="bl-btn-primary" style={{ flex: 1 }}>
                  Submit Review ⭐
                </button>
                <button type="button" onClick={() => setWriteModalOpen(false)} className="bl-btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
