// Centralized category-aware tracking workflows and real active order normalization

export const ORDER_CATEGORY_META = {
  mens: { id: 'mens', label: "Men's Stitching", fallbackImg: '/mens_tailoring.jpg' },
  womens: { id: 'womens', label: "Women's Stitching", fallbackImg: '/womens_tailoring_v2.jpg' },
  bridal: { id: 'bridal', label: 'Bridal', fallbackImg: '/bridal_wear.jpg' },
  kids: { id: 'kids', label: "Kids' Stitching", fallbackImg: '/kids_wear_v2.jpg' },
  uniforms: { id: 'uniforms', label: 'Uniform Stitching', fallbackImg: '/Uniform.png' },
  clothing: { id: 'clothing', label: 'Clothing & Uniforms', fallbackImg: '/mens_tailoring.jpg' },
  bags: { id: 'bags', label: 'Bags & Leather', fallbackImg: '/bags_leathers.jpg' },
  shoes: { id: 'shoes', label: 'Shoes & Slippers', fallbackImg: '/Shoes And Slippers.png' },
  sofas: { id: 'sofas', label: 'Sofas & Upholstery', fallbackImg: '/assets/sofas/HERO.png' },
  seats: { id: 'seats', label: 'Vehicle Seat Covers', fallbackImg: '/vehicle_seats.jpg' },
  pets: { id: 'pets', label: 'Pet Outfits', fallbackImg: '/Pets.png' },
  gifts: { id: 'gifts', label: 'Handmade Gifts', fallbackImg: '/handmade_gifts.jpg' },
  fabrics: { id: 'fabrics', label: 'Fabric Marketplace', fallbackImg: '/fabrics-showcase/silk-main.jpg' },
  designers: { id: 'designers', label: 'Designer Studio', fallbackImg: '/custom_design.jpg' },
  alterations: { id: 'alterations', label: 'Alterations', fallbackImg: '/alterations_fit_v2.jpg' },
};

const WORKFLOW_CONFIGS = {
  clothing_stitching: [
    'Order Placed',
    'Measurements',
    'Material Selection',
    'Stitching',
    'Quality Check',
    'Delivered',
  ],
  bags_restoration: [
    'Booked',
    'Collected',
    'Assessment',
    'Repair/Restoration',
    'Quality Check',
    'Delivered',
  ],
  bags_shopping: [
    'Order Placed',
    'Confirmed',
    'Artisan Crafting',
    'Quality Check',
    'Shipped',
    'Delivered',
  ],
  shoes_restoration: [
    'Booked',
    'Collected',
    'Assessment',
    'Restoration',
    'Quality Check',
    'Delivered',
  ],
  shoes_shopping: [
    'Order Placed',
    'Confirmed',
    'Artisan Crafting',
    'Quality Check',
    'Shipped',
    'Delivered',
  ],
  sofas: [
    'Booked',
    'Inspection',
    'Quote Approved',
    'Upholstery',
    'Quality Check',
    'Completed',
  ],
  seats: [
    'Booked',
    'Vehicle Inspection',
    'Material Selection',
    'Crafting',
    'Installation',
    'Completed',
  ],
  pets: [
    'Booked',
    'Measurements',
    'Design Approved',
    'Stitching',
    'Quality Check',
    'Delivered',
  ],
  gifts: [
    'Order Placed',
    'Design Approved',
    'Material Selection',
    'Crafting',
    'Packaging',
    'Delivered',
  ],
  fabrics: [
    'Order Placed',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Delivered',
  ],
  designers: [
    'Request Submitted',
    'Consultation',
    'Design in Progress',
    'Design Approval',
    'Final Design',
  ],
  alterations: [
    'Booked',
    'Collected',
    'Assessment',
    'Alteration',
    'Quality Check',
    'Delivered',
  ],
};

const TERMINAL_OR_INACTIVE_STATUSES = new Set([
  'closed',
  'completed',
  'cancelled',
  'canceled',
  'delivered',
  'final design',
]);

export function resolveOrderCategoryKey(rawOrder) {
  if (!rawOrder) return 'clothing';
  const rawCat = String(
    rawOrder.serviceCategory ||
      rawOrder.category ||
      rawOrder.items?.[0]?.category ||
      ''
  ).toLowerCase();
  const title = String(
    rawOrder.serviceName ||
      rawOrder.title ||
      rawOrder.items?.[0]?.name ||
      ''
  ).toLowerCase();
  const combined = `${rawCat} ${title}`;

  if (combined.includes('alter')) return 'alterations';
  if (combined.includes('bridal') || combined.includes('lehenga')) return 'bridal';
  if (combined.includes('kid') || combined.includes('pattu') || combined.includes('frock')) return 'kids';
  if (combined.includes('uniform') || combined.includes('scrub') || combined.includes('school') || combined.includes('corporate')) return 'uniforms';
  if (combined.includes('women') || combined.includes('blouse') || combined.includes('kurti') || combined.includes('saree')) return 'womens';
  if (combined.includes('men') || combined.includes('suit') || combined.includes('sherwani') || combined.includes('shirt') || combined.includes('trouser')) return 'mens';
  if (combined.includes('bag') || combined.includes('handbag') || combined.includes('luggage') || combined.includes('backpack') || combined.includes('briefcase') || combined.includes('leather')) return 'bags';
  if (combined.includes('shoe') || combined.includes('slipper') || combined.includes('footwear') || combined.includes('oxford') || combined.includes('loaf') || combined.includes('mojari')) return 'shoes';
  if (combined.includes('sofa') || combined.includes('couch') || combined.includes('upholster') || combined.includes('cushion')) return 'sofas';
  if (combined.includes('seat') || combined.includes('vehicle') || combined.includes('car') || combined.includes('bike')) return 'seats';
  if (combined.includes('pet') || combined.includes('dog') || combined.includes('cat')) return 'pets';
  if (combined.includes('gift') || combined.includes('hamper') || combined.includes('potli') || combined.includes('quilt')) return 'gifts';
  if (combined.includes('fabric') || combined.includes('silk') || combined.includes('linen') || combined.includes('cotton') || combined.includes('meter')) return 'fabrics';
  if (combined.includes('designer') || combined.includes('couture') || combined.includes('bespoke design') || rawOrder.hub === 'designers') return 'designers';
  return 'clothing';
}

export function getWorkflowStagesForOrder(rawOrder, categoryKey) {
  const typeStr = String(
    rawOrder?.type || rawOrder?.serviceType || rawOrder?.mode || ''
  ).toLowerCase();
  const titleStr = String(
    rawOrder?.serviceName || rawOrder?.title || rawOrder?.items?.[0]?.name || ''
  ).toLowerCase();
  const isRepairOrRestore =
    typeStr.includes('restor') ||
    typeStr.includes('repair') ||
    titleStr.includes('repair') ||
    titleStr.includes('restor') ||
    String(rawOrder?.id || '').toUpperCase().startsWith('RESTORE-');

  switch (categoryKey) {
    case 'bags':
      return isRepairOrRestore
        ? WORKFLOW_CONFIGS.bags_restoration
        : WORKFLOW_CONFIGS.bags_shopping;
    case 'shoes':
      return isRepairOrRestore
        ? WORKFLOW_CONFIGS.shoes_restoration
        : WORKFLOW_CONFIGS.shoes_shopping;
    case 'sofas':
      return WORKFLOW_CONFIGS.sofas;
    case 'seats':
      return WORKFLOW_CONFIGS.seats;
    case 'pets':
      return WORKFLOW_CONFIGS.pets;
    case 'gifts':
      return WORKFLOW_CONFIGS.gifts;
    case 'fabrics':
      return WORKFLOW_CONFIGS.fabrics;
    case 'designers':
      return WORKFLOW_CONFIGS.designers;
    case 'alterations':
      return WORKFLOW_CONFIGS.alterations;
    case 'mens':
    case 'womens':
    case 'bridal':
    case 'kids':
    case 'uniforms':
    case 'clothing':
    default:
      return WORKFLOW_CONFIGS.clothing_stitching;
  }
}

function formatReadableStatus(rawStatus) {
  if (!rawStatus) return 'Order Placed';
  return String(rawStatus)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export function resolveStageIndexFromOrder(rawOrder, stages) {
  const maxIdx = Math.max(stages.length - 1, 0);
  const rawStatus = String(rawOrder?.status || '').trim().toLowerCase();
  const statusCode = String(rawOrder?.statusCode || '').trim().toLowerCase();
  const token = `${statusCode} ${rawStatus}`.trim();

  // Direct stage name match first
  const exactStageMatch = stages.findIndex(
    (st) => st.toLowerCase() === rawStatus
  );
  if (exactStageMatch >= 0) return exactStageMatch;

  // Semantic backend status -> stage mapping without advancing artificially
  if (
    token.includes('delivered') ||
    token.includes('completed') ||
    token.includes('closed') ||
    token.includes('final')
  ) {
    return maxIdx;
  }
  if (
    token.includes('quality') ||
    token.includes('qc') ||
    token.includes('shipped') ||
    token.includes('transit') ||
    token.includes('dispatch') ||
    token.includes('delivery') ||
    token.includes('install') ||
    token.includes('pack') ||
    token.includes('approval') ||
    token.includes('trial') ||
    token.includes('stitching_completed')
  ) {
    return Math.min(4, maxIdx);
  }
  if (
    token.includes('stitching') ||
    token.includes('craft') ||
    token.includes('repair') ||
    token.includes('restor') ||
    token.includes('upholster') ||
    token.includes('alteration') ||
    token.includes('progress') ||
    token.includes('process')
  ) {
    return Math.min(3, maxIdx);
  }
  if (
    token.includes('material') ||
    token.includes('assess') ||
    token.includes('quote_approved') ||
    token.includes('quote approved') ||
    token.includes('design approved') ||
    token.includes('picked') ||
    token.includes('pickup') ||
    token.includes('tailor_assigned')
  ) {
    return Math.min(2, maxIdx);
  }
  if (
    token.includes('confirm') ||
    token.includes('measure') ||
    token.includes('collect') ||
    token.includes('inspect') ||
    token.includes('consult') ||
    token.includes('design approved') ||
    token.includes('artisan_reviewed')
  ) {
    return Math.min(1, maxIdx);
  }
  if (
    token.includes('placed') ||
    token.includes('book') ||
    token.includes('submit') ||
    token.includes('quote_requested')
  ) {
    return 0;
  }

  if (typeof rawOrder?.statusIndex === 'number' && !Number.isNaN(rawOrder.statusIndex)) {
    return Math.max(0, Math.min(rawOrder.statusIndex, maxIdx));
  }

  return 0;
}

export function isOrderActive(rawOrder) {
  if (!rawOrder || !rawOrder.id) return false;
  const s = String(rawOrder.status || '').trim().toLowerCase();
  const code = String(rawOrder.statusCode || '').trim().toLowerCase();
  if (TERMINAL_OR_INACTIVE_STATUSES.has(s) || TERMINAL_OR_INACTIVE_STATUSES.has(code)) {
    return false;
  }
  if (s.includes('cancel') || code.includes('cancel')) {
    return false;
  }
  return true;
}

export function normalizeActiveOrder(rawOrder) {
  if (!rawOrder || !rawOrder.id) return null;
  const categoryKey = resolveOrderCategoryKey(rawOrder);
  const meta = ORDER_CATEGORY_META[categoryKey] || ORDER_CATEGORY_META.clothing;
  const stages = getWorkflowStagesForOrder(rawOrder, categoryKey);
  const currentStageIndex = resolveStageIndexFromOrder(rawOrder, stages);

  const firstItem = Array.isArray(rawOrder.items) && rawOrder.items[0] ? rawOrder.items[0] : null;
  const itemTitle =
    rawOrder.serviceName ||
    rawOrder.title ||
    (firstItem?.name
      ? rawOrder.items.length > 1
        ? `${firstItem.name} + ${rawOrder.items.length - 1} more`
        : firstItem.name
      : meta.label);

  const thumbnail =
    rawOrder.img ||
    rawOrder.image ||
    firstItem?.img ||
    firstItem?.image ||
    meta.fallbackImg;

  const professionalName =
    rawOrder.tailorName ||
    rawOrder.artisanAssigned ||
    rawOrder.professionalName ||
    rawOrder.tailor ||
    null;

  const estimatedDate =
    rawOrder.estimatedDelivery ||
    rawOrder.deliveryDate ||
    null;

  const parsedTs = rawOrder.timestamp
    ? Date.parse(rawOrder.timestamp)
    : rawOrder.date
    ? Date.parse(rawOrder.date)
    : 0;

  return {
    id: String(rawOrder.id),
    categoryKey,
    categoryLabel: rawOrder.serviceCategoryLabel || meta.label,
    title: itemTitle,
    thumbnail,
    statusLabel: formatReadableStatus(rawOrder.status) || stages[currentStageIndex],
    professionalName: professionalName ? String(professionalName) : null,
    estimatedDate: estimatedDate ? String(estimatedDate) : null,
    stages,
    currentStageIndex,
    sortTimestamp: Number.isFinite(parsedTs) ? parsedTs : 0,
    raw: rawOrder,
  };
}

export function mergeAndNormalizeActiveOrders(propOrders = [], centralOrders = [], currentUser = null) {
  const map = new Map();
  const combined = [
    ...(Array.isArray(centralOrders) ? centralOrders : []),
    ...(Array.isArray(propOrders) ? propOrders : []),
  ];

  combined.forEach((raw) => {
    if (!raw || !raw.id) return;
    if (!map.has(raw.id)) {
      map.set(raw.id, raw);
    }
  });

  // Note: If customer orders carry customerEmail/customerPhone ownership matching currentUser, allow matching or platform-created orders
  const normalized = [];
  map.forEach((raw) => {
    if (!isOrderActive(raw)) return;
    const norm = normalizeActiveOrder(raw);
    if (norm) normalized.push(norm);
  });

  // Sort most recent active order first
  normalized.sort((a, b) => b.sortTimestamp - a.sortTimestamp);
  return normalized;
}
