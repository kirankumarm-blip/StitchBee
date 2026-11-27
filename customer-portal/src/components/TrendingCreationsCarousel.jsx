import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RefreshCw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { TRENDING_CREATIONS } from '../data/trendingCreations';

const LOOPED_CREATIONS = [...TRENDING_CREATIONS, ...TRENDING_CREATIONS];

function formatMediaTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function TrendingCreationCard({
  item,
  index,
  cardKey,
  isSectionVisible,
  isHoveredPlay,
  canHoverPlay,
  onHoverStart,
  onHoverEnd,
  onOpenModal,
  onNavigateCategory,
  registerVideoRef,
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isActuallyPlaying, setIsActuallyPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);

  // Lazy-observe card proximity before loading video metadata & opening paused frame
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '180px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Register video element ref with parent so only one card plays at a time
  useEffect(() => {
    registerVideoRef(cardKey, videoRef.current);
    return () => registerVideoRef(cardKey, null);
  }, [cardKey, registerVideoRef]);

  // Trigger inline muted playback on hover; pause & reset to opening frame on leave
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHoveredPlay && isSectionVisible && !hasError) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          setIsActuallyPlaying(false);
        });
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
      if (video.readyState >= 1) {
        try {
          video.currentTime = 0.1;
        } catch {
          // Ignore seek errors while media is unloaded
        }
      }
      setIsActuallyPlaying(false);
    }
  }, [isHoveredPlay, isSectionVisible, hasError, retryNonce]);

  const handleMouseEnter = () => {
    if (!canHoverPlay) return;
    onHoverStart(cardKey);
  };

  const handleMouseLeave = () => {
    if (!canHoverPlay) return;
    onHoverEnd(cardKey);
  };

  const handleRetry = (e) => {
    e.stopPropagation();
    setHasError(false);
    setRetryNonce((n) => n + 1);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const handleCtaClick = (e) => {
    e.stopPropagation();
    onNavigateCategory(item);
  };

  const shouldAttachSource = (isNearViewport || isHoveredPlay) && !hasError;
  const previewSrc = shouldAttachSource ? `${item.videoUrl}#t=0.1` : undefined;

  return (
    <article
      ref={cardRef}
      className={`tc-card ${isActuallyPlaying ? 'is-playing' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(index % TRENDING_CREATIONS.length)}
      aria-label={`${item.title} - ${item.category}`}
    >
      {/* Top category label */}
      <span className="tc-category-pill">{item.category}</span>

      {/* Fallback image shown ONLY if the video fails to load */}
      {hasError ? (
        <img
          src={item.posterImg}
          alt={item.title}
          className="tc-poster-img"
          loading="lazy"
          draggable="false"
        />
      ) : (
        <video
          ref={videoRef}
          key={retryNonce}
          className="tc-video is-visible"
          src={previewSrc}
          muted
          loop
          playsInline
          preload={isHoveredPlay ? 'auto' : 'metadata'}
          onLoadedMetadata={(e) => {
            // Seek cleanly to 0.1s so the paused frame displays immediately
            if (!isHoveredPlay && e.currentTarget.currentTime === 0) {
              try {
                e.currentTarget.currentTime = 0.1;
              } catch {
                // Ignore if seek not yet allowed
              }
            }
          }}
          onPlaying={() => setIsActuallyPlaying(true)}
          onPause={() => setIsActuallyPlaying(false)}
          onEnded={() => setIsActuallyPlaying(false)}
          onError={() => {
            setHasError(true);
            setIsActuallyPlaying(false);
          }}
        />
      )}

      {/* Fallback retry badge only if external video fails */}
      {hasError && (
        <button
          type="button"
          className="tc-retry-pill"
          onClick={handleRetry}
          title="Retry video load"
        >
          <RefreshCw size={12} />
          <span>Retry</span>
        </button>
      )}

      {/* Minimal center circular play button */}
      <button
        type="button"
        className={`tc-play-btn ${isActuallyPlaying ? 'is-hidden' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal(index % TRENDING_CREATIONS.length);
        }}
        aria-label={`Play ${item.title}`}
      >
        <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />
      </button>

      {/* Subtle bottom-only gradient for title & CTA readability */}
      <div className="tc-bottom-overlay">
        <h3 className="tc-card-title">{item.title}</h3>
        <button
          type="button"
          className="tc-cta-btn"
          onClick={handleCtaClick}
        >
          {item.ctaLabel}
        </button>
      </div>
    </article>
  );
}

function TrendingVideoModal({
  activeIndex,
  onClose,
  onSelectIndex,
  onNavigateCategory,
}) {
  const modalContainerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);

  const item = TRENDING_CREATIONS[activeIndex];

  // Reset per-video state when changing active item inside the modal
  useEffect(() => {
    setHasError(false);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);

    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.volume = volume;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => setIsPlaying(false));
        }
      });
    }
  }, [activeIndex, retryNonce]);

  // Stop playback completely on unmount / close
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, []);

  // Keyboard shortcuts (Escape, Left, Right, Space) and tab pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + TRENDING_CREATIONS.length) % TRENDING_CREATIONS.length);
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % TRENDING_CREATIONS.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        if (videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      }
    };

    const handleVisibility = () => {
      if (document.hidden && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, onClose, onSelectIndex]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || hasError) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      video.volume = 0.7;
      setVolume(0.7);
    }
  };

  const handleVolumeChange = (e) => {
    const nextVol = parseFloat(e.target.value);
    setVolume(nextVol);
    if (videoRef.current) {
      videoRef.current.volume = nextVol;
      const shouldMute = nextVol === 0;
      videoRef.current.muted = shouldMute;
      setIsMuted(shouldMute);
    }
  };

  const handleSeek = (e) => {
    const nextTime = parseFloat(e.target.value);
    setCurrentTime(nextTime);
    if (videoRef.current) {
      videoRef.current.currentTime = nextTime;
    }
  };

  const toggleFullscreen = () => {
    const container = modalContainerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handlePrev = () => {
    onSelectIndex((activeIndex - 1 + TRENDING_CREATIONS.length) % TRENDING_CREATIONS.length);
  };

  const handleNext = () => {
    onSelectIndex((activeIndex + 1) % TRENDING_CREATIONS.length);
  };

  const handleClose = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      className="tc-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={handleClose}
    >
      <div
        ref={modalContainerRef}
        className="tc-modal-shell"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tc-modal-topbar">
          <div className="tc-modal-meta">
            <span className="tc-modal-cat-badge">{item.category}</span>
            <h3 className="tc-modal-title">{item.title}</h3>
          </div>
          <div className="tc-modal-top-actions">
            <button
              type="button"
              className="tc-modal-cta"
              onClick={() => {
                handleClose();
                onNavigateCategory(item);
              }}
            >
              {item.ctaLabel}
            </button>
            <button
              type="button"
              className="tc-modal-close-btn"
              onClick={handleClose}
              aria-label="Close video modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="tc-modal-stage">
          <button
            type="button"
            className="tc-modal-nav tc-modal-prev"
            onClick={handlePrev}
            aria-label="Previous video"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="tc-modal-video-wrap" onClick={togglePlay}>
            {hasError ? (
              <div className="tc-modal-fallback">
                <img src={item.posterImg} alt={item.title} className="tc-modal-fallback-img" />
                <div className="tc-modal-fallback-overlay">
                  <p>Unable to stream this video right now.</p>
                  <button
                    type="button"
                    className="tc-modal-retry-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHasError(false);
                      setRetryNonce((n) => n + 1);
                    }}
                  >
                    <RefreshCw size={15} />
                    <span>Retry Video</span>
                  </button>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                key={`${item.id}-${retryNonce}`}
                className="tc-modal-video"
                src={item.videoUrl}
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
                onError={() => setHasError(true)}
              />
            )}

            {!isPlaying && !hasError && (
              <div className="tc-modal-center-play" aria-hidden="true">
                <Play size={26} fill="currentColor" style={{ marginLeft: '3px' }} />
              </div>
            )}
          </div>

          <button
            type="button"
            className="tc-modal-nav tc-modal-next"
            onClick={handleNext}
            aria-label="Next video"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="tc-modal-controls">
          <div className="tc-modal-progress-row">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Video progress"
              className="tc-modal-range"
              style={{
                background: `linear-gradient(90deg, #f72585 ${progressPct}%, rgba(255,255,255,0.22) ${progressPct}%)`,
              }}
            />
          </div>

          <div className="tc-modal-controls-row">
            <div className="tc-modal-controls-left">
              <button
                type="button"
                className="tc-ctrl-icon-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                type="button"
                className="tc-ctrl-icon-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                className="tc-volume-slider"
              />

              <span className="tc-time-label">
                {formatMediaTime(currentTime)} / {formatMediaTime(duration)}
              </span>
            </div>

            <div className="tc-modal-controls-right">
              <span className="tc-modal-counter">
                {activeIndex + 1} / {TRENDING_CREATIONS.length}
              </span>
              <button
                type="button"
                className="tc-ctrl-icon-btn"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrendingCreationsCarousel({ theme, onNavigateCategory }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const videoRefsMap = useRef({});
  const scrollFloatRef = useRef(0);
  const isHoverPausedRef = useRef(false);
  const isModalOpenRef = useRef(false);
  const isSectionVisibleRef = useRef(true);
  const stepAnimRef = useRef(null);
  const lastDotIdxRef = useRef(0);

  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [hoveredCardKey, setHoveredCardKey] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const [canHoverPlay, setCanHoverPlay] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isLight = theme === 'light';

  const registerVideoRef = useCallback((key, node) => {
    if (node) {
      videoRefsMap.current[key] = node;
    } else {
      delete videoRefsMap.current[key];
    }
  }, []);

  const pauseAllCardVideos = useCallback(() => {
    Object.values(videoRefsMap.current).forEach((v) => {
      if (v && !v.paused) {
        v.pause();
      }
    });
    setHoveredCardKey(null);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setCanHoverPlay(hoverQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const onHoverChange = (e) => setCanHoverPlay(e.matches);
    const onMotionChange = (e) => setPrefersReducedMotion(e.matches);

    hoverQuery.addEventListener('change', onHoverChange);
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      hoverQuery.removeEventListener('change', onHoverChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        isSectionVisibleRef.current = visible;
        setIsSectionVisible(visible);
        if (!visible) {
          pauseAllCardVideos();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [pauseAllCardVideos]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        pauseAllCardVideos();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [pauseAllCardVideos]);

  useEffect(() => {
    isModalOpenRef.current = modalIndex !== null;
    if (modalIndex !== null) {
      pauseAllCardVideos();
    }
  }, [modalIndex, pauseAllCardVideos]);

  const updateActiveDot = useCallback((scrollPos) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector('.tc-card');
    if (!firstCard) return;
    const gap = parseFloat(window.getComputedStyle(track).columnGap || '18') || 18;
    const step = firstCard.offsetWidth + gap;
    if (step <= 0) return;

    const idx = Math.round(scrollPos / step) % TRENDING_CREATIONS.length;
    if (idx !== lastDotIdxRef.current) {
      lastDotIdxRef.current = idx;
      setActiveDot(idx);
    }
  }, []);

  useEffect(() => {
    let rafId = null;
    let lastTime = null;
    const speedPxPerMs = 0.036;

    const tick = (now) => {
      if (lastTime === null) lastTime = now;
      const dt = Math.min(now - lastTime, 64);
      lastTime = now;

      const track = trackRef.current;
      if (
        track &&
        !prefersReducedMotion &&
        !isHoverPausedRef.current &&
        !isModalOpenRef.current &&
        isSectionVisibleRef.current &&
        !stepAnimRef.current &&
        !document.hidden
      ) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          scrollFloatRef.current += speedPxPerMs * dt;
          if (scrollFloatRef.current >= halfWidth) {
            scrollFloatRef.current -= halfWidth;
          }
          track.scrollLeft = scrollFloatRef.current;
          updateActiveDot(scrollFloatRef.current);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (stepAnimRef.current) cancelAnimationFrame(stepAnimRef.current);
    };
  }, [prefersReducedMotion, updateActiveDot]);

  const animateToOffset = useCallback((delta) => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;

    if (stepAnimRef.current) {
      cancelAnimationFrame(stepAnimRef.current);
      stepAnimRef.current = null;
    }

    let startPos = track.scrollLeft;
    if (delta < 0 && startPos + delta < 0) {
      startPos += halfWidth;
      track.scrollLeft = startPos;
    }
    scrollFloatRef.current = startPos;

    const duration = 420;
    const startTime = performance.now();

    const stepFrame = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      let nextPos = startPos + delta * eased;

      if (nextPos >= halfWidth) nextPos -= halfWidth;
      if (nextPos < 0) nextPos += halfWidth;

      scrollFloatRef.current = nextPos;
      if (trackRef.current) {
        trackRef.current.scrollLeft = nextPos;
      }
      updateActiveDot(nextPos);

      if (t < 1) {
        stepAnimRef.current = requestAnimationFrame(stepFrame);
      } else {
        stepAnimRef.current = null;
      }
    };

    stepAnimRef.current = requestAnimationFrame(stepFrame);
  }, [updateActiveDot]);

  const handleArrowClick = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector('.tc-card');
    const gap = parseFloat(window.getComputedStyle(track).columnGap || '18') || 18;
    const step = firstCard ? firstCard.offsetWidth + gap : 260;
    animateToOffset(direction === 'right' ? step : -step);
  };

  const handleDotClick = (targetIdx) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector('.tc-card');
    const gap = parseFloat(window.getComputedStyle(track).columnGap || '18') || 18;
    const step = firstCard ? firstCard.offsetWidth + gap : 260;
    const targetPos = targetIdx * step;
    const currentPos = track.scrollLeft % (track.scrollWidth / 2 || 1);
    animateToOffset(targetPos - currentPos);
  };

  const handleNativeScroll = () => {
    const track = trackRef.current;
    if (!track || stepAnimRef.current) return;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth > 0 && track.scrollLeft >= halfWidth) {
      track.scrollLeft -= halfWidth;
    }
    scrollFloatRef.current = track.scrollLeft;
    updateActiveDot(scrollFloatRef.current);
  };

  const handleCardHoverStart = useCallback((cardKey) => {
    Object.entries(videoRefsMap.current).forEach(([key, vid]) => {
      if (key !== cardKey && vid && !vid.paused) {
        vid.pause();
      }
    });
    setHoveredCardKey(cardKey);
  }, []);

  const handleCardHoverEnd = useCallback((cardKey) => {
    setHoveredCardKey((prev) => (prev === cardKey ? null : prev));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trending-creations"
      className={`tc-section ${isLight ? 'is-light' : 'is-dark'}`}
      aria-label="Trending Creations and Transformations"
    >
      <div className="landing-container">
        <div className="tc-header">
          <h2 className="tc-heading">TRENDING <span className="landing-title-pink">CREATIONS</span> &amp; TRANSFORMATIONS</h2>
          <p className="tc-subheading">
            Discover inspiring designs, expert craftsmanship, and remarkable transformations across all our services.
          </p>
        </div>

        <div
          className="tc-carousel-shell"
          onMouseEnter={() => {
            isHoverPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isHoverPausedRef.current = false;
            setHoveredCardKey(null);
          }}
          onTouchStart={() => {
            isHoverPausedRef.current = true;
          }}
          onTouchEnd={() => {
            isHoverPausedRef.current = false;
          }}
        >
          <button
            type="button"
            className="tc-edge-arrow tc-edge-prev"
            onClick={() => handleArrowClick('left')}
            aria-label="Previous creations"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={trackRef}
            className="tc-carousel-track"
            onScroll={handleNativeScroll}
          >
            {LOOPED_CREATIONS.map((item, idx) => {
              const cardKey = `${item.id}-${idx}`;
              return (
                <TrendingCreationCard
                  key={cardKey}
                  item={item}
                  index={idx}
                  cardKey={cardKey}
                  isSectionVisible={isSectionVisible}
                  isHoveredPlay={hoveredCardKey === cardKey && modalIndex === null}
                  canHoverPlay={canHoverPlay}
                  onHoverStart={handleCardHoverStart}
                  onHoverEnd={handleCardHoverEnd}
                  onOpenModal={(targetIdx) => setModalIndex(targetIdx)}
                  onNavigateCategory={onNavigateCategory}
                  registerVideoRef={registerVideoRef}
                />
              );
            })}
          </div>

          <button
            type="button"
            className="tc-edge-arrow tc-edge-next"
            onClick={() => handleArrowClick('right')}
            aria-label="Next creations"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="tc-pagination-dots" role="tablist" aria-label="Video showcase slides">
          {TRENDING_CREATIONS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeDot === idx}
              aria-label={`View ${item.title}`}
              className={`tc-dot ${activeDot === idx ? 'is-active' : ''}`}
              onClick={() => handleDotClick(idx)}
            />
          ))}
        </div>
      </div>

      {modalIndex !== null && (
        <TrendingVideoModal
          activeIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onSelectIndex={(idx) => setModalIndex(idx)}
          onNavigateCategory={onNavigateCategory}
        />
      )}
    </section>
  );
}
