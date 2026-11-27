import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from 'lucide-react';

const CUSTOMER_REVIEWS = [
  {
    id: 'rev-priya',
    name: 'Priya Sharma',
    initials: 'P',
    city: 'Bengaluru',
    category: 'Bridal Couture',
    rating: 5,
    quote:
      "StitchBeez is a game-changer! I ordered a custom lehenga for my sister's wedding. The tailor came to my home for measurements, and the fit was absolutely flawless! Highly recommend.",
    avatarBg: 'linear-gradient(135deg, #f72585 0%, #db2777 100%)',
  },
  {
    id: 'rev-rahul',
    name: 'Rahul Verma',
    initials: 'R',
    city: 'Indiranagar',
    category: "Men's Bespoke",
    rating: 5,
    quote:
      'I was skeptical about manual measurements, but their smart sizing option is surprisingly accurate. The blazer fits like a glove, and the master tailor was very professional.',
    avatarBg: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  },
  {
    id: 'rev-ananya',
    name: 'Ananya Iyer',
    initials: 'A',
    city: 'Jayanagar',
    category: 'Fabric & Tailoring',
    rating: 5,
    quote:
      'Being able to buy premium fabrics directly on the platform and have them sent straight to a local boutique is so convenient. This is the future of custom tailoring.',
    avatarBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    id: 'rev-karthik',
    name: 'Karthik Nair',
    initials: 'K',
    city: 'Koramangala',
    category: 'Bags & Leather',
    rating: 5,
    quote:
      'Sent my vintage leather laptop bag for strap replacement and edge conditioning. The craftsmanship looked factory-new and matched the original saddle stitching.',
    avatarBg: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
  },
  {
    id: 'rev-meera',
    name: 'Meera Krishnan',
    initials: 'M',
    city: 'Malleshwaram',
    category: "Women's Stitching",
    rating: 5,
    quote:
      'Got three silk festive kurtas stitched with custom neckline detailing. Neat lining, crisp finishing, and zero back-and-forth fitting visits needed.',
    avatarBg: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
  },
  {
    id: 'rev-rohan',
    name: 'Rohan Deshmukh',
    initials: 'R',
    city: 'HSR Layout',
    category: 'Shoes & Slippers',
    rating: 5,
    quote:
      'Ordered custom-fitted wedding mojaris and resoled my everyday leather loafers through the platform. Comfortable fit right out of the box.',
    avatarBg: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
  },
  {
    id: 'rev-divya',
    name: 'Divya Menon',
    initials: 'D',
    city: 'Whitefield',
    category: 'Sofas & Upholstery',
    rating: 5,
    quote:
      'Our three-seater living room sofa was reupholstered in textured linen fabric. Clean piping work and neat cushion refitting completely refreshed the room.',
    avatarBg: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
  },
  {
    id: 'rev-arjun',
    name: 'Arjun Kulkarni',
    initials: 'A',
    city: 'JP Nagar',
    category: '24h Alterations',
    rating: 5,
    quote:
      'Needed urgent trouser hemming and jacket waist tapering before a business trip. Doorstep pickup and drop made it effortless, and the stitches are invisible.',
    avatarBg: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
  },
  {
    id: 'rev-sneha',
    name: 'Sneha Hegde',
    initials: 'S',
    city: 'BTM Layout',
    category: 'Uniform Stitching',
    rating: 5,
    quote:
      'Coordinated custom clinic coats and hospitality aprons for our staff. Sizing consistency across every piece and clean embroidered logos impressed the whole team.',
    avatarBg: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  },
  {
    id: 'rev-vikram',
    name: 'Vikramaditya Rao',
    initials: 'V',
    city: 'Electronic City',
    category: 'Vehicle Seat Covers',
    rating: 5,
    quote:
      'Had custom quilted leatherette seat covers stitched for my SUV. The snug fit around headrests and stitching contrast completely upgraded the cabin interior.',
    avatarBg: 'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)',
  },
  {
    id: 'rev-kavya',
    name: 'Kavya Bhat',
    initials: 'K',
    city: 'Jayanagar',
    category: "Kids' Stitching",
    rating: 5,
    quote:
      'Got a soft silk pattu pavadai stitched for my daughter’s birthday. Comfortable cotton lining, vibrant border placement, and adorable tailored detailing.',
    avatarBg: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
  },
  {
    id: 'rev-neha',
    name: 'Neha Joshi',
    initials: 'N',
    city: 'Lavelle Road',
    category: 'Handmade Gifts',
    rating: 5,
    quote:
      'Ordered personalized monogrammed linen robes and potli bags as wedding favors. Each piece was neatly finished and thoughtfully crafted.',
    avatarBg: 'linear-gradient(135deg, #ec4899 0%, #9d174d 100%)',
  },
];

function getCardsPerView(width) {
  if (width <= 640) return 1;
  if (width <= 1024) return 2;
  return 4;
}

export default function CustomerReviewsCarousel({ theme = 'light' }) {
  const [cardsPerView, setCardsPerView] = useState(() =>
    typeof window !== 'undefined' ? getCardsPerView(window.innerWidth) : 4
  );
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartXRef = useRef(null);

  const isLight = theme === 'light';

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const pages = useMemo(() => {
    const grouped = [];
    for (let i = 0; i < CUSTOMER_REVIEWS.length; i += cardsPerView) {
      grouped.push(CUSTOMER_REVIEWS.slice(i, i + cardsPerView));
    }
    return grouped;
  }, [cardsPerView]);

  const totalPages = pages.length;

  useEffect(() => {
    setActivePage((prev) => (prev >= totalPages ? 0 : prev));
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setActivePage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goNext = useCallback(() => {
    setActivePage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  // Auto-advance every 4.5s unless paused or reduced motion enabled
  useEffect(() => {
    if (isPaused || prefersReducedMotion || totalPages <= 1) return undefined;
    const timer = setInterval(() => {
      setActivePage((prev) => (prev + 1) % totalPages);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, totalPages]);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      setIsPaused(true);
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current !== null && e.changedTouches && e.changedTouches.length) {
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      if (Math.abs(deltaX) > 45) {
        if (deltaX < 0) goNext();
        else goPrev();
      }
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id="customer-reviews"
      className={`cr-section ${isLight ? 'is-light' : 'is-dark'}`}
      aria-labelledby="cr-heading"
    >
      <div className="landing-container cr-container">
        <div className="cr-header">
          <h2 id="cr-heading" className="cr-title">
            Loved by <span className="landing-title-pink">10,000+</span> Fashion Enthusiasts
          </h2>
          <p className="cr-trust-summary">
            <span className="cr-summary-rating">
              <Star size={14} fill="#f59e0b" color="#f59e0b" />
              <strong>4.9 Average Rating</strong>
            </span>
            <span className="cr-summary-dot" aria-hidden="true">·</span>
            <span>10,000+ Happy Customers</span>
            <span className="cr-summary-dot" aria-hidden="true">·</span>
            <span>Clothing, Leather &amp; Custom Craft</span>
          </p>
        </div>

        <div
          className="cr-carousel-shell"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="cr-nav-btn cr-nav-prev"
            onClick={goPrev}
            aria-label="Previous customer reviews"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="cr-viewport">
            <div
              className="cr-track"
              style={{ transform: `translate3d(-${activePage * 100}%, 0, 0)` }}
            >
              {pages.map((group, pageIdx) => (
                <div
                  key={`page-${pageIdx}`}
                  className="cr-slide-page"
                  style={{
                    gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))`,
                  }}
                >
                  {group.map((review) => (
                    <article key={review.id} className="cr-card">
                      <div className="cr-card-top">
                        <div className="cr-stars" aria-label={`${review.rating} out of 5 stars`}>
                          {Array.from({ length: review.rating }).map((_, idx) => (
                            <Star
                              key={idx}
                              size={15}
                              fill="#f59e0b"
                              color="#f59e0b"
                            />
                          ))}
                        </div>
                        <span className="cr-category-pill">{review.category}</span>
                      </div>

                      <div className="cr-quote-wrap">
                        <Quote size={16} className="cr-quote-icon" aria-hidden="true" />
                        <p className="cr-quote">"{review.quote}"</p>
                      </div>

                      <div className="cr-author-row">
                        <div
                          className="cr-avatar"
                          style={{ background: review.avatarBg }}
                          aria-hidden="true"
                        >
                          {review.initials}
                        </div>
                        <div className="cr-author-meta">
                          <div className="cr-author-name-line">
                            <h3 className="cr-author-name">{review.name}</h3>
                            <CheckCircle2
                              size={14}
                              className="cr-verified-icon"
                              aria-label="Verified Customer"
                            />
                          </div>
                          <span className="cr-author-sub">
                            {review.city} · Verified Order
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="cr-nav-btn cr-nav-next"
            onClick={goNext}
            aria-label="Next customer reviews"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="cr-dots" role="tablist" aria-label="Review pages">
          {pages.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              role="tab"
              aria-selected={activePage === idx}
              aria-label={`Show reviews page ${idx + 1}`}
              className={`cr-dot ${activePage === idx ? 'is-active' : ''}`}
              onClick={() => setActivePage(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
