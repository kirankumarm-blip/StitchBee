import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FABRIC_SHOWCASE_ITEMS = [
  {
    id: 'silk',
    name: 'Royal Silk',
    descriptor: 'Women · Bridal',
    categoryKey: 'women',
    mainImg: '/fabrics-showcase/silk-main.jpg',
    detailImg: '/fabrics-showcase/silk-detail.jpg',
    detailLabel: 'Silk Weave',
  },
  {
    id: 'linen',
    name: 'Natural Linen',
    descriptor: 'Men · Women · Kids',
    categoryKey: 'men',
    mainImg: '/fabrics-showcase/linen-main.jpg',
    detailImg: '/fabrics-showcase/linen-detail.jpg',
    detailLabel: 'Flax Slub Weave',
  },
  {
    id: 'cotton',
    name: 'Premium Cotton',
    descriptor: 'Kids · Uniforms · Men',
    categoryKey: 'all',
    mainImg: '/fabrics-showcase/cotton-main.jpg',
    detailImg: '/fabrics-showcase/cotton-detail.jpg',
    detailLabel: 'Crisp Cotton Weave',
  },
  {
    id: 'leather',
    name: 'Classic Leather',
    descriptor: 'Bags · Shoes · Accessories',
    categoryKey: 'all',
    mainImg: '/fabrics-showcase/leather-main.jpg',
    detailImg: '/fabrics-showcase/leather-detail.jpg',
    detailLabel: 'Full-Grain Pebble',
  },
  {
    id: 'satin',
    name: 'Lustrous Satin',
    descriptor: 'Gowns · Blouses · Evening',
    categoryKey: 'women',
    mainImg: '/fabrics-showcase/satin-main.jpg',
    detailImg: '/fabrics-showcase/satin-detail.jpg',
    detailLabel: 'Glossy Satin Sheen',
  },
  {
    id: 'velvet',
    name: 'Plush Velvet',
    descriptor: 'Bridal · Sherwanis · Blazers',
    categoryKey: 'bridal',
    mainImg: '/fabrics-showcase/velvet-main.jpg',
    detailImg: '/fabrics-showcase/velvet-detail.jpg',
    detailLabel: 'Dense Velvet Pile',
  },
  {
    id: 'denim',
    name: 'Selvedge Denim',
    descriptor: 'Jackets · Casuals · Jeans',
    categoryKey: 'men',
    mainImg: '/fabrics-showcase/denim-main.jpg',
    detailImg: '/fabrics-showcase/denim-detail.jpg',
    detailLabel: 'Indigo Twill Weave',
  },
  {
    id: 'chiffon',
    name: 'Airy Chiffon',
    descriptor: 'Sarees · Dupattas · Drapes',
    categoryKey: 'women',
    mainImg: '/fabrics-showcase/chiffon-main.jpg',
    detailImg: '/fabrics-showcase/chiffon-detail.jpg',
    detailLabel: 'Sheer Crepe Mesh',
  },
  {
    id: 'georgette',
    name: 'Flowing Georgette',
    descriptor: 'Kurtis · Anarkalis · Dresses',
    categoryKey: 'women',
    mainImg: '/fabrics-showcase/georgette-main.jpg',
    detailImg: '/fabrics-showcase/georgette-detail.jpg',
    detailLabel: 'Twisted Crepe Texture',
  },
  {
    id: 'net',
    name: 'Embroidered Net',
    descriptor: 'Bridal · Lehengas · Overlays',
    categoryKey: 'bridal',
    mainImg: '/fabrics-showcase/net-main.jpg',
    detailImg: '/fabrics-showcase/net-detail.jpg',
    detailLabel: 'Tulle & Threadwork',
  },
  {
    id: 'brocade',
    name: 'Zari Brocade',
    descriptor: 'Wedding · Sherwanis · Ethnic',
    categoryKey: 'bridal',
    mainImg: '/fabrics-showcase/brocade-main.jpg',
    detailImg: '/fabrics-showcase/brocade-detail.jpg',
    detailLabel: 'Metallic Zari Jacquard',
  },
  {
    id: 'wool-blends',
    name: 'Wool Blends',
    descriptor: 'Suits · Tuxedos · Blazers',
    categoryKey: 'men',
    mainImg: '/fabrics-showcase/wool-blends-main.jpg',
    detailImg: '/fabrics-showcase/wool-blends-detail.jpg',
    detailLabel: 'Worsted Twill Grain',
  },
  {
    id: 'suede',
    name: 'Brushed Suede',
    descriptor: 'Footwear · Bags · Trim',
    categoryKey: 'all',
    mainImg: '/fabrics-showcase/suede-main.jpg',
    detailImg: '/fabrics-showcase/suede-detail.jpg',
    detailLabel: 'Velvety Napped Fibers',
  },
  {
    id: 'faux-leather',
    name: 'Faux Leather',
    descriptor: 'Vegan Bags · Jackets · Covers',
    categoryKey: 'all',
    mainImg: '/fabrics-showcase/faux-leather-main.jpg',
    detailImg: '/fabrics-showcase/faux-leather-detail.jpg',
    detailLabel: 'Fine Vegan Grain',
  },
  {
    id: 'upholstery-leather',
    name: 'Upholstery Leather',
    descriptor: 'Vehicle Seats · Sofas · Interiors',
    categoryKey: 'all',
    mainImg: '/fabrics-showcase/upholstery-leather-main.jpg',
    detailImg: '/fabrics-showcase/upholstery-leather-detail.jpg',
    detailLabel: 'Stitched Heavy Grain',
  },
];

// Duplicate list for seamless infinite horizontal carousel looping
const CAROUSEL_TRACK_ITEMS = [...FABRIC_SHOWCASE_ITEMS, ...FABRIC_SHOWCASE_ITEMS];

export default function FabricMarketplace({ onCategorySelect, theme }) {
  const trackRef = useRef(null);
  const scrollFloatRef = useRef(0);
  const isPausedRef = useRef(false);
  const stepAnimRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const isLight = theme === 'light';

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = null;
    let lastTime = null;
    const speedPxPerMs = 0.042; // Smooth luxury glide (~42px/sec)

    const tick = (now) => {
      if (lastTime === null) lastTime = now;
      const dt = Math.min(now - lastTime, 64);
      lastTime = now;

      if (!prefersReducedMotion && !isPausedRef.current && !stepAnimRef.current && trackRef.current) {
        const track = trackRef.current;
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          scrollFloatRef.current += speedPxPerMs * dt;
          if (scrollFloatRef.current >= halfWidth) {
            scrollFloatRef.current -= halfWidth;
          }
          track.scrollLeft = scrollFloatRef.current;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (stepAnimRef.current) cancelAnimationFrame(stepAnimRef.current);
    };
  }, []);

  const handleStepScroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector('.fabric-showcase-card');
    const computedStyle = window.getComputedStyle(track);
    const gap = parseFloat(computedStyle.columnGap || computedStyle.gap || '24') || 24;
    const stepSize = firstCard ? firstCard.offsetWidth + gap : 320;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;

    if (stepAnimRef.current) {
      cancelAnimationFrame(stepAnimRef.current);
      stepAnimRef.current = null;
    }

    let startPos = scrollFloatRef.current;
    if (direction === 'left' && startPos - stepSize < 0) {
      startPos += halfWidth;
      scrollFloatRef.current = startPos;
      track.scrollLeft = startPos;
    }

    const delta = direction === 'right' ? stepSize : -stepSize;
    const targetPos = startPos + delta;
    const duration = 420;
    const startTime = performance.now();

    const animateStep = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      let nextPos = startPos + delta * eased;

      if (nextPos >= halfWidth) nextPos -= halfWidth;
      if (nextPos < 0) nextPos += halfWidth;

      scrollFloatRef.current = nextPos;
      if (trackRef.current) {
        trackRef.current.scrollLeft = nextPos;
      }

      if (t < 1) {
        stepAnimRef.current = requestAnimationFrame(animateStep);
      } else {
        stepAnimRef.current = null;
      }
    };

    stepAnimRef.current = requestAnimationFrame(animateStep);
  };

  const handlePause = () => {
    isPausedRef.current = true;
  };

  const handleResume = () => {
    isPausedRef.current = false;
    setHoveredId(null);
  };

  return (
    <section
      id="fabric-marketplace"
      className={`fabrics-creation-section ${isLight ? 'is-light' : 'is-dark'}`}
      aria-label="Fabrics for every creation"
    >
      <div className="landing-container">
        <div className="fabrics-creation-header">
          <h2 className="fabrics-creation-title"><span className="landing-title-pink">FABRICS</span> FOR EVERY CREATION</h2>
          <p className="fabrics-creation-subtitle">
            From everyday essentials to extraordinary creations.
          </p>
        </div>

        <div
          className="fabrics-carousel-shell"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
          onFocus={handlePause}
          onBlur={handleResume}
        >
          <button
            type="button"
            className="fabrics-nav-arrow fabrics-nav-prev"
            onClick={() => handleStepScroll('left')}
            aria-label="Previous fabrics"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>

          <div className="fabrics-carousel-track" ref={trackRef}>
            {CAROUSEL_TRACK_ITEMS.map((fabric, idx) => {
              const cardKey = `${fabric.id}-${idx}`;
              const isHovered = hoveredId === cardKey;
              return (
                <article
                  key={cardKey}
                  className={`fabric-showcase-card ${isHovered ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredId(cardKey)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onCategorySelect && onCategorySelect(fabric.categoryKey)}
                >
                  <div className="fabric-showcase-media">
                    <img
                      src={fabric.mainImg}
                      alt={fabric.name}
                      className="fabric-img-main"
                      loading={idx < 6 ? 'eager' : 'lazy'}
                      draggable="false"
                    />
                    <img
                      src={fabric.detailImg}
                      alt={`${fabric.name} close-up texture`}
                      className="fabric-img-detail"
                      loading="lazy"
                      draggable="false"
                    />
                    <div className="fabric-media-sheen" />
                    <span className="fabric-detail-pill">{fabric.detailLabel}</span>
                  </div>

                  <div className="fabric-showcase-meta">
                    <h3 className="fabric-showcase-name">{fabric.name}</h3>
                    <p className="fabric-showcase-desc">{fabric.descriptor}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="fabrics-nav-arrow fabrics-nav-next"
            onClick={() => handleStepScroll('right')}
            aria-label="Next fabrics"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
