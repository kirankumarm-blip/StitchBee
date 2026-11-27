import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Check,
  ChevronRight,
  Layers,
  Package,
  ShoppingBag,
  User,
} from 'lucide-react';
import { ORDER_CATEGORY_META } from '../data/orderWorkflows';
import PremiumSelect from './PremiumSelect';

export default function ActiveOrderTracker({
  activeOrders = [],
  isLoading = false,
  loadError = '',
  theme = 'light',
  onViewAllOrders,
  onTrackOrder,
  onChatWithExpert,
  onViewDetails,
  onExploreServices,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOrderId, setSelectedOrderId] = useState(
    () => (activeOrders[0] ? activeOrders[0].id : '')
  );

  const isLight = theme === 'light';

  const availableCategories = useMemo(() => {
    const seen = new Map();
    activeOrders.forEach((ord) => {
      if (!seen.has(ord.categoryKey)) {
        seen.set(ord.categoryKey, {
          id: ord.categoryKey,
          label: ORDER_CATEGORY_META[ord.categoryKey]?.label || ord.categoryLabel,
        });
      }
    });
    return Array.from(seen.values());
  }, [activeOrders]);

  useEffect(() => {
    if (
      selectedCategory !== 'all' &&
      !availableCategories.some((cat) => cat.id === selectedCategory)
    ) {
      setSelectedCategory('all');
    }
  }, [availableCategories, selectedCategory]);

  const filteredOrders = useMemo(() => {
    if (selectedCategory === 'all') return activeOrders;
    return activeOrders.filter((ord) => ord.categoryKey === selectedCategory);
  }, [activeOrders, selectedCategory]);

  useEffect(() => {
    if (filteredOrders.length === 0) {
      setSelectedOrderId('');
      return;
    }
    const stillExists = filteredOrders.some((ord) => ord.id === selectedOrderId);
    if (!stillExists) {
      setSelectedOrderId(filteredOrders[0].id);
    }
  }, [filteredOrders, selectedOrderId]);

  const selectedOrder = useMemo(
    () => filteredOrders.find((ord) => ord.id === selectedOrderId) || filteredOrders[0] || null,
    [filteredOrders, selectedOrderId]
  );

  const categoryOptions = useMemo(
    () => [
      { value: 'all', label: `All Active Categories (${activeOrders.length})` },
      ...availableCategories.map((cat) => ({
        value: cat.id,
        label: cat.label,
      })),
    ],
    [activeOrders.length, availableCategories]
  );

  const orderOptions = useMemo(
    () =>
      filteredOrders.map((ord) => ({
        value: ord.id,
        label: `#${ord.id} · ${ord.title}`,
        subLabel: `${ord.categoryLabel} • ${ord.statusLabel}`,
      })),
    [filteredOrders]
  );

  if (isLoading) {
    return (
      <div className={`aot-card ${isLight ? 'is-light' : 'is-dark'}`}>
        <div className="aot-header">
          <h3 className="aot-heading">My Active Orders</h3>
        </div>
        <div className="aot-empty-state">
          <Package size={26} className="aot-empty-icon" />
          <p className="aot-empty-title">Loading your active orders...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className={`aot-card ${isLight ? 'is-light' : 'is-dark'}`}>
        <div className="aot-header">
          <h3 className="aot-heading">My Active Orders</h3>
          {onViewAllOrders && (
            <button type="button" className="aot-view-all" onClick={onViewAllOrders}>
              <span>View All Orders</span>
              <ChevronRight size={14} />
            </button>
          )}
        </div>
        <div className="aot-empty-state">
          <Package size={26} className="aot-empty-icon" />
          <p className="aot-empty-title">Unable to load order updates</p>
          <p className="aot-empty-desc">{loadError}</p>
        </div>
      </div>
    );
  }

  if (!activeOrders || activeOrders.length === 0 || !selectedOrder) {
    return (
      <div className={`aot-card ${isLight ? 'is-light' : 'is-dark'}`}>
        <div className="aot-header">
          <h3 className="aot-heading">My Active Orders</h3>
          {onViewAllOrders && (
            <button type="button" className="aot-view-all" onClick={onViewAllOrders}>
              <span>View All Orders</span>
              <ChevronRight size={14} />
            </button>
          )}
        </div>

        <div className="aot-empty-state">
          <div className="aot-empty-badge">
            <ShoppingBag size={22} />
          </div>
          <p className="aot-empty-title">No active orders right now</p>
          <p className="aot-empty-desc">
            Start a stitching, repair, restoration, or custom creation request to track live progress here.
          </p>
          {onExploreServices && (
            <button
              type="button"
              className="aot-btn-primary aot-empty-cta"
              onClick={onExploreServices}
            >
              <span>Explore Services</span>
              <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>
    );
  }

  const stageCount = selectedOrder.stages.length;
  const fillPercent =
    stageCount > 1
      ? Math.min(100, Math.max(0, (selectedOrder.currentStageIndex / (stageCount - 1)) * 100))
      : 100;

  return (
    <div
      className={`aot-card ${isLight ? 'is-light' : 'is-dark'}`}
      aria-label="My Active Orders"
    >
      {/* Header + Premium Dropdown Selectors */}
      <div className="aot-header-block">
        <div className="aot-header">
          <h3 className="aot-heading">My Active Orders</h3>
          {onViewAllOrders && (
            <button
              type="button"
              className="aot-view-all"
              onClick={onViewAllOrders}
            >
              <span>View All Orders</span>
              <ChevronRight size={14} />
            </button>
          )}
        </div>

        <div className="aot-selectors-row">
          <PremiumSelect
            icon={Layers}
            value={selectedCategory}
            options={categoryOptions}
            onChange={setSelectedCategory}
            ariaLabel="Filter active orders by service category"
            theme={theme}
            compact
            className="aot-dropdown-wrap"
          />

          <PremiumSelect
            icon={Package}
            value={selectedOrder.id}
            options={orderOptions}
            onChange={setSelectedOrderId}
            ariaLabel="Select active order"
            theme={theme}
            compact
            className="aot-dropdown-wrap aot-dropdown-order"
          />
        </div>
      </div>

      {/* Selected Order Information */}
      <div key={selectedOrder.id} className="aot-order-summary">
        <img
          src={selectedOrder.thumbnail}
          alt={selectedOrder.title}
          className="aot-thumb"
        />

        <div className="aot-summary-body">
          <div className="aot-summary-top">
            <span className="aot-cat-badge">{selectedOrder.categoryLabel}</span>
            <span className="aot-status-pill">{selectedOrder.statusLabel}</span>
          </div>

          <h4 className="aot-order-title">{selectedOrder.title}</h4>

          <div className="aot-meta-line">
            <span>Order ID: #{selectedOrder.id}</span>
            {selectedOrder.professionalName && (
              <span className="aot-meta-chip">
                <User size={12} />
                <span>{selectedOrder.professionalName}</span>
              </span>
            )}
            {selectedOrder.estimatedDate && (
              <span className="aot-meta-chip">
                <Calendar size={12} />
                <span>Est. {selectedOrder.estimatedDate}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Service-Aware Progress Timeline */}
      <div className="aot-timeline-scroll">
        <div
          className="aot-timeline"
          style={{ '--aot-stage-count': stageCount }}
        >
          <div className="aot-track-rail" aria-hidden="true">
            <div
              className="aot-track-fill"
              style={{ width: `${fillPercent}%` }}
            />
          </div>

          {selectedOrder.stages.map((stageName, idx) => {
            const isCompleted = idx < selectedOrder.currentStageIndex;
            const isCurrent = idx === selectedOrder.currentStageIndex;

            return (
              <div
                key={stageName}
                className={`aot-stage ${
                  isCompleted ? 'is-completed' : isCurrent ? 'is-current' : 'is-upcoming'
                }`}
              >
                <div className="aot-node" aria-hidden="true">
                  {isCompleted ? (
                    <Check size={12} strokeWidth={3} />
                  ) : isCurrent ? (
                    <span className="aot-node-inner-dot" />
                  ) : (
                    <span className="aot-node-pending-dot" />
                  )}
                </div>
                <span className="aot-stage-label">{stageName}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Three Horizontally Aligned Action Buttons */}
      <div className="aot-actions-row">
        <button
          type="button"
          className="aot-btn-primary"
          onClick={() => onTrackOrder && onTrackOrder(selectedOrder)}
        >
          <span>Track Order</span>
        </button>

        <button
          type="button"
          className="aot-btn-outline"
          onClick={() => onChatWithExpert && onChatWithExpert(selectedOrder)}
        >
          <span>Chat with Expert</span>
        </button>

        <button
          type="button"
          className="aot-btn-outline"
          onClick={() => onViewDetails && onViewDetails(selectedOrder)}
        >
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}
