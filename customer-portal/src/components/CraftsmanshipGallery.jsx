import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
} from 'lucide-react';
import {
  CRAFTSMANSHIP_GALLERY_ITEMS,
  GALLERY_CATEGORIES,
} from '../data/craftsmanshipGallery';

function CraftsmanshipLightbox({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
  onExploreService,
}) {
  const touchStartXRef = useRef(null);

  const activeItem = items[activeIndex];

  const handlePrev = useCallback(() => {
    onChangeIndex((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onChangeIndex]);

  const handleNext = useCallback(() => {
    onChangeIndex((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onChangeIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handlePrev, handleNext]);

  if (!activeItem) return null;

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || !e.changedTouches || !e.changedTouches.length) {
      return;
    }
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div
      className="cg-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.categoryLabel} — ${activeItem.title}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="cg-lightbox-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cg-lightbox-topbar">
          <span className="cg-lightbox-counter">
            {activeIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            className="cg-lightbox-close"
            onClick={onClose}
            aria-label="Close gallery preview"
          >
            <X size={20} />
          </button>
        </div>

        <div className="cg-lightbox-stage">
          <button
            type="button"
            className="cg-lightbox-nav cg-lightbox-prev"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="cg-lightbox-media">
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="cg-lightbox-img"
            />
          </div>

          <button
            type="button"
            className="cg-lightbox-nav cg-lightbox-next"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="cg-lightbox-footer">
          <div className="cg-lightbox-meta">
            <span className="cg-lightbox-cat">{activeItem.categoryLabel}</span>
            <h3 className="cg-lightbox-title">{activeItem.title}</h3>
          </div>

          <button
            type="button"
            className="cg-lightbox-cta"
            onClick={() => {
              onClose();
              onExploreService && onExploreService(activeItem);
            }}
          >
            <span>Explore Service</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CraftsmanshipGallery({
  mode = 'landing', // 'landing' | 'full'
  theme = 'light',
  onExploreGallery,
  onExploreService,
  onBack,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeTouchId, setActiveTouchId] = useState(null);

  const isLight = theme === 'light';
  const isFullMode = mode === 'full';

  const displayedItems = useMemo(() => {
    if (!isFullMode) {
      return CRAFTSMANSHIP_GALLERY_ITEMS.filter((item) => item.featured);
    }
    if (selectedCategory === 'all') {
      return CRAFTSMANSHIP_GALLERY_ITEMS;
    }
    return CRAFTSMANSHIP_GALLERY_ITEMS.filter(
      (item) => item.categoryId === selectedCategory
    );
  }, [isFullMode, selectedCategory]);

  const handleTileAction = (item, idx) => {
    setLightboxIndex(idx);
  };

  return (
    <section
      id={isFullMode ? 'craftsmanship-full-gallery' : 'craftsmanship-gallery'}
      className={`cg-section ${isFullMode ? 'is-full' : 'is-landing'} ${
        isLight ? 'is-light' : 'is-dark'
      }`}
      aria-labelledby="cg-heading"
    >
      <div className="landing-container cg-container">
        {isFullMode && onBack && (
          <div className="cg-full-topbar">
            <button type="button" className="pro-back-link" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
            <span className="cg-full-count">
              {displayedItems.length}{' '}
              {displayedItems.length === 1 ? 'Creation' : 'Creations'}
              {selectedCategory === 'all' ? ' Across 14 Categories' : ''}
            </span>
          </div>
        )}

        <div className="cg-header">
          <h2 id="cg-heading" className="cg-title">
            Our <span className="landing-title-pink">Craft</span> in Every Detail
          </h2>
          <p className="cg-subtitle">
            Every stitch tells a story. Every creation reflects craftsmanship.
          </p>
        </div>

        {isFullMode && (
          <div
            className="cg-filter-row"
            role="tablist"
            aria-label="Filter craftsmanship gallery by category"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`cg-filter-chip ${isActive ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Asymmetric Four-Column Mosaic Grid */}
        <div
          className={`cg-mosaic-grid ${
            isFullMode && selectedCategory !== 'all' ? 'is-filtered' : ''
          }`}
        >
          {displayedItems.map((item, idx) => {
            const isWideTile =
              (selectedCategory === 'all' || !isFullMode) &&
              (idx % 6 === 0 || idx % 6 === 5);
            const isTouchRevealed = activeTouchId === item.id;

            return (
              <article
                key={item.id}
                className={`cg-tile ${isWideTile ? 'is-wide' : ''} ${
                  isTouchRevealed ? 'is-touch-open' : ''
                }`}
                onClick={() => handleTileAction(item, idx)}
                role="button"
                tabIndex={0}
                aria-label={`${item.categoryLabel}: ${item.title}. Open preview`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTileAction(item, idx);
                  }
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="cg-tile-img"
                  loading="lazy"
                  style={{ objectPosition: item.imagePosition || 'center center' }}
                />

                {/* Touch-device info toggle alternative to hover */}
                <button
                  type="button"
                  className="cg-touch-info-btn"
                  aria-label="Show craftsmanship details"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTouchId((prev) => (prev === item.id ? null : item.id));
                  }}
                >
                  <Info size={14} />
                </button>

                <div className="cg-tile-overlay">
                  <span className="cg-tile-category">{item.categoryLabel}</span>
                  <h3 className="cg-tile-title">{item.title}</h3>
                  <button
                    type="button"
                    className="cg-tile-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExploreService && onExploreService(item);
                    }}
                  >
                    <span>Explore Service</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {!isFullMode && (
          <div className="cg-bottom-cta-wrap">
            <button
              type="button"
              className="cg-explore-gallery-btn"
              onClick={() => onExploreGallery && onExploreGallery()}
            >
              <span>Explore Our Gallery</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null &&
        displayedItems.length > 0 &&
        typeof document !== 'undefined' &&
        createPortal(
          <CraftsmanshipLightbox
            items={displayedItems}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onChangeIndex={setLightboxIndex}
            onExploreService={onExploreService}
          />,
          document.body
        )}
    </section>
  );
}
