// ============================================================================
// STITCHBEEZ CENTRALIZED UNIVERSAL ORDERS STORE
// Manages real-time tracking, payment receipts, order progress, and history
// across ALL StitchBeez service categories:
// - Clothing & Uniforms
// - Bags & Leather
// - Shoes & Slippers
// - Vehicle Seat Covers
// - Pet Outfits
// - Handmade Gifts
// - Sofas & Living
// - Kids Wear & Custom Stitching
// ============================================================================

export const ORDER_SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Orders', icon: '✨' },
  { id: 'clothing', label: 'Clothing & Uniforms', icon: '👔' },
  { id: 'bags', label: 'Bags & Leather', icon: '👜' },
  { id: 'shoes', label: 'Shoes & Slippers', icon: '👞' },
  { id: 'seats', label: 'Vehicle Seat Covers', icon: '🚗' },
  { id: 'pets', label: 'Pet Outfits', icon: '🐾' },
  { id: 'gifts', label: 'Handmade Gifts', icon: '🎁' },
  { id: 'sofas', label: 'Sofas & Living', icon: '🛋️' },
  { id: 'kids', label: 'Kids Wear', icon: '👶' }
];

export const ORDER_STATUS_TABS = [
  { id: 'all', label: 'All Orders' },
  { id: 'active', label: 'Active & In-Transit' },
  { id: 'delivered', label: 'Completed & Delivered' },
  { id: 'custom', label: 'Custom Quotes' },
  { id: 'cancelled', label: 'Cancelled' }
];

export const REGULAR_ORDER_STEPS = [
  'Order Placed',
  'Confirmed',
  'Artisan Crafting',
  'Quality Check',
  'Dispatched / Shipped',
  'Out for Delivery',
  'Delivered'
];

export const CUSTOM_QUOTE_STEPS = [
  'Quote Requested',
  'Artisan Reviewed',
  'Quote Approved',
  'Bespoke Crafting',
  'Quality Inspection',
  'Dispatched',
  'Delivered'
];

// Helper to determine service category key from string or items
export function resolveServiceCategory(catOrName) {
  if (!catOrName) return 'bags';
  const val = String(catOrName).toLowerCase();
  if (val.includes('uniform') || val.includes('school') || val.includes('corporate') || val.includes('scrub') || val.includes('blazer') || val.includes('shirt') || val.includes('clothing')) {
    return 'clothing';
  }
  if (val.includes('bag') || val.includes('handbag') || val.includes('luggage') || val.includes('backpack') || val.includes('briefcase') || val.includes('wallet')) {
    return 'bags';
  }
  if (val.includes('shoe') || val.includes('footwear') || val.includes('slipper') || val.includes('boot') || val.includes('oxford') || val.includes('loafers')) {
    return 'shoes';
  }
  if (val.includes('seat') || val.includes('vehicle') || val.includes('car') || val.includes('bike') || val.includes('auto')) {
    return 'seats';
  }
  if (val.includes('pet') || val.includes('dog') || val.includes('cat') || val.includes('tuxedo')) {
    return 'pets';
  }
  if (val.includes('gift') || val.includes('teddy') || val.includes('monogram') || val.includes('handmade')) {
    return 'gifts';
  }
  if (val.includes('sofa') || val.includes('couch') || val.includes('living') || val.includes('cushion')) {
    return 'sofas';
  }
  if (val.includes('kid') || val.includes('frock') || val.includes('kurta') || val.includes('child')) {
    return 'kids';
  }
  return 'bags';
}

export function getCategoryLabel(serviceCategory) {
  const match = ORDER_SERVICE_CATEGORIES.find(c => c.id === serviceCategory);
  return match ? match.label : 'Artisan Craft';
}

// Default multi-category sample orders showcasing full system capabilities
export const DEFAULT_CENTRAL_ORDERS = [
  {
    id: 'ORD-8821',
    date: '28 Oct 2026, 09:30 AM',
    timestamp: '2026-10-28T04:00:00.000Z',
    type: 'ready',
    serviceCategory: 'clothing',
    serviceCategoryLabel: 'Clothing & Uniforms',
    status: 'Dispatched / In Transit',
    statusCode: 'shipped',
    statusIndex: 4,
    estimatedDelivery: 'Tomorrow by 6:00 PM',
    courier: 'BlueDart Prime Logistics',
    trackingNumber: 'BLU-IN-8492019',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI (PhonePe)',
    transactionRef: 'TXN-9021849120',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98450 12345',
    address: 'Flat 402, Prestige Lakeside Habitat, Varthur, Bengaluru, 560087',
    subtotal: 3497,
    deliveryFee: 0,
    discount: 500,
    total: 2997,
    items: [
      {
        id: 'u-1',
        name: 'School Boy Shirt',
        price: 499,
        originalPrice: 799,
        color: 'Crisp White',
        size: 'M',
        qty: 2,
        img: '/uniform_assets/School%20Boy%20Shirt.png',
        material: 'Breathable Cotton Blend',
        category: 'School Uniforms'
      },
      {
        id: 'u-3',
        name: 'Corporate Blazer',
        price: 2499,
        originalPrice: 3999,
        color: 'Royal Navy',
        size: 'L',
        qty: 1,
        img: '/uniform_assets/Corporate%20Blazer.png',
        material: 'Wrinkle-Resistant Twill Poly-Viscose',
        category: 'Corporate Uniforms'
      }
    ],
    trackingMilestones: [
      { title: 'Order Placed & Verified', time: '28 Oct 2026, 09:30 AM', location: 'StitchBee Online', done: true },
      { title: 'Order Confirmed by Uniform Atelier', time: '28 Oct 2026, 10:15 AM', location: 'Bengaluru Central Atelier', done: true },
      { title: 'Tailoring & Stitching Completed', time: '28 Oct 2026, 01:45 PM', location: 'Atelier Unit 4', done: true },
      { title: '18-Point Quality Inspection Passed', time: '28 Oct 2026, 03:20 PM', location: 'Quality Assurance Hub', done: true },
      { title: 'Handed Over to BlueDart Express', time: '28 Oct 2026, 05:00 PM', location: 'Bengaluru Logistics Facility', done: true },
      { title: 'Out for Doorstep Delivery', time: 'Expected 29 Oct 2026, 10:00 AM', location: 'Varthur Delivery Hub', done: false },
      { title: 'Delivered', time: 'Expected 29 Oct 2026, 06:00 PM', location: 'Customer Doorstep', done: false }
    ]
  },
  {
    id: 'ORD-8942',
    date: '27 Oct 2026, 02:15 PM',
    timestamp: '2026-10-27T08:45:00.000Z',
    type: 'ready',
    serviceCategory: 'bags',
    serviceCategoryLabel: 'Bags & Leather',
    status: 'Quality Check',
    statusCode: 'crafting',
    statusIndex: 3,
    estimatedDelivery: '31 Oct 2026',
    courier: 'StitchBee White-Glove Logistics',
    trackingNumber: 'STB-IN-908214',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card (HDFC Visa)',
    transactionRef: 'TXN-773192014',
    customerName: 'Priya Sen',
    customerPhone: '+91 99001 88210',
    address: '42, Brigade Millennium, JP Nagar 7th Phase, Bengaluru, 560078',
    subtotal: 3999,
    deliveryFee: 0,
    discount: 0,
    total: 3999,
    items: [
      {
        id: 'prod-1',
        name: 'Classic Leather Handbag',
        price: 3999,
        originalPrice: 4999,
        color: 'Nude Beige',
        size: 'Medium (28cm x 20cm)',
        qty: 1,
        img: '/featured_bags/prod_1.png',
        material: 'Full-Grain Tuscan Quilted Leather',
        category: 'Handbags'
      }
    ],
    trackingMilestones: [
      { title: 'Order Placed & Verified', time: '27 Oct 2026, 02:15 PM', location: 'StitchBee Online', done: true },
      { title: 'Confirmed by Master Leather Artisan', time: '27 Oct 2026, 03:00 PM', location: 'JP Nagar Atelier', done: true },
      { title: 'Precision Hand-Cutting & Saddle Stitching', time: '28 Oct 2026, 11:30 AM', location: 'Artisan Workshop 2', done: true },
      { title: 'Hardware Edge Paint & Inspection', time: '28 Oct 2026, 04:00 PM', location: 'Finishing Bench', done: true },
      { title: 'Packed in Archival Dust Bag', time: 'In Progress', location: 'Packaging Station', done: false },
      { title: 'Dispatched for Courier Transit', time: 'Pending', location: 'Logistics Bay', done: false },
      { title: 'Delivered', time: 'Expected 31 Oct 2026', location: 'Customer Doorstep', done: false }
    ]
  },
  {
    id: 'ORD-7714',
    date: '26 Oct 2026, 11:00 AM',
    timestamp: '2026-10-26T05:30:00.000Z',
    type: 'ready',
    serviceCategory: 'seats',
    serviceCategoryLabel: 'Vehicle Seat Covers',
    status: 'Artisan Crafting',
    statusCode: 'crafting',
    statusIndex: 2,
    estimatedDelivery: '02 Nov 2026',
    courier: 'StitchBee Mobile Fitment Van',
    trackingNumber: 'VSC-FIT-20914',
    paymentStatus: 'Advance Paid (50%)',
    paymentMethod: 'UPI (Google Pay)',
    transactionRef: 'TXN-552194012',
    customerName: 'Karthik Raja',
    customerPhone: '+91 98860 33412',
    address: '15/A, 100ft Road, Indiranagar, Bengaluru, 560038',
    subtotal: 2999,
    deliveryFee: 0,
    discount: 0,
    total: 2999,
    items: [
      {
        id: 'prod-car-seat-cover',
        name: 'Premium Car Seat Cover',
        price: 2999,
        originalPrice: 4499,
        color: 'Onyx Black & Crimson Red',
        size: 'Full 5-Seater Set',
        qty: 1,
        img: '/assets/shop-seat-cover/products/car-seat-cover.png',
        material: 'Automotive Grade Leatherette',
        category: 'Car Seat Covers'
      }
    ],
    trackingMilestones: [
      { title: 'Seat Mold & Specifications Confirmed', time: '26 Oct 2026, 11:00 AM', location: 'Automotive Atelier', done: true },
      { title: 'CAD Contour Pattern Cutting', time: '27 Oct 2026, 10:30 AM', location: 'Precision Laser Station', done: true },
      { title: 'High-Density Foam Bonding & Quilting', time: '28 Oct 2026, 02:00 PM', location: 'Heavy Stitching Bay', done: true },
      { title: 'Airbag Seam Deployment Test', time: 'Scheduled 29 Oct', location: 'Safety Certification Lab', done: false },
      { title: 'Dispatched with Fitment Specialist', time: 'Scheduled 01 Nov', location: 'Mobile Service Van #3', done: false },
      { title: 'Doorstep Fitment & Handover Completed', time: 'Scheduled 02 Nov', location: 'Customer Location', done: false }
    ]
  },
  {
    id: 'ORD-6629',
    date: '24 Oct 2026, 04:30 PM',
    timestamp: '2026-10-24T11:00:00.000Z',
    type: 'ready',
    serviceCategory: 'shoes',
    serviceCategoryLabel: 'Shoes & Slippers',
    status: 'Delivered',
    statusCode: 'delivered',
    statusIndex: 6,
    estimatedDelivery: 'Delivered on 26 Oct 2026',
    courier: 'Delhivery Prime Air',
    trackingNumber: 'DLV-BLR-908129',
    paymentStatus: 'Paid',
    paymentMethod: 'NetBanking (ICICI)',
    transactionRef: 'TXN-331092817',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98450 12345',
    address: 'Flat 402, Prestige Lakeside Habitat, Varthur, Bengaluru, 560087',
    subtotal: 3999,
    deliveryFee: 0,
    discount: 0,
    total: 3999,
    items: [
      {
        id: 'shoe-1',
        name: 'Classic Leather Formal Shoes',
        price: 3999,
        originalPrice: 4999,
        color: 'Chestnut Tan',
        size: 'UK 8',
        qty: 1,
        img: '/premium_footwear/ClassicLeatherFormalShoe.png',
        material: 'Hand-Burnished Italian Calfskin',
        category: 'Mens Formal Footwear'
      }
    ],
    trackingMilestones: [
      { title: 'Order Placed', time: '24 Oct 2026, 04:30 PM', location: 'Online', done: true },
      { title: 'Goodyear Welt Handcrafting Confirmed', time: '24 Oct 2026, 06:00 PM', location: 'Shoe Atelier', done: true },
      { title: 'Oak Bark Soling & Lasting Done', time: '25 Oct 2026, 11:00 AM', location: 'Workshop', done: true },
      { title: 'Hand-Polished Finish & Inspected', time: '25 Oct 2026, 03:30 PM', location: 'Finishing Bench', done: true },
      { title: 'Dispatched via Delhivery', time: '25 Oct 2026, 07:00 PM', location: 'Central Hub', done: true },
      { title: 'Out for Delivery', time: '26 Oct 2026, 09:15 AM', location: 'Varthur Station', done: true },
      { title: 'Delivered with Signature Received', time: '26 Oct 2026, 02:40 PM', location: 'Customer Doorstep', done: true }
    ]
  },
  {
    id: 'ORD-5541',
    date: '23 Oct 2026, 01:20 PM',
    timestamp: '2026-10-23T07:50:00.000Z',
    type: 'ready',
    serviceCategory: 'pets',
    serviceCategoryLabel: 'Pet Outfits',
    status: 'Delivered',
    statusCode: 'delivered',
    statusIndex: 6,
    estimatedDelivery: 'Delivered on 25 Oct 2026',
    courier: 'Shadowfax Express',
    trackingNumber: 'SHD-BLR-40192',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI (Paytm)',
    transactionRef: 'TXN-11928374',
    customerName: 'Meera Rao',
    customerPhone: '+91 97400 55123',
    address: 'Villa 12, Palm Meadows, Whitefield, Bengaluru, 560066',
    subtotal: 899,
    deliveryFee: 0,
    discount: 0,
    total: 899,
    items: [
      {
        id: 'prod-casual-dog-shirt',
        name: 'Casual Dog Shirt',
        price: 899,
        originalPrice: 1199,
        color: 'Denim Blue',
        size: 'Medium (Chest 22", Back 16")',
        qty: 1,
        img: '/assets/pets/prod_casual_dog_shirt.png',
        material: '100% Breathable Washed Cotton Denim',
        category: 'Pet Outfits'
      }
    ],
    trackingMilestones: [
      { title: 'Order Confirmed & Pet Sizing Checked', time: '23 Oct 2026, 01:20 PM', location: 'Pet Studio', done: true },
      { title: 'Comfort Elastic Hem Tailoring', time: '23 Oct 2026, 04:30 PM', location: 'Pet Tailoring Bay', done: true },
      { title: 'Quality Snag & Stretch Test Passed', time: '24 Oct 2026, 10:00 AM', location: 'Inspection Station', done: true },
      { title: 'Shipped with Shadowfax', time: '24 Oct 2026, 01:30 PM', location: 'Whitefield Hub', done: true },
      { title: 'Delivered to Customer Doorstep', time: '25 Oct 2026, 11:45 AM', location: 'Palm Meadows', done: true }
    ]
  },
  {
    id: 'ORD-4418',
    date: '28 Oct 2026, 12:40 PM',
    timestamp: '2026-10-28T07:10:00.000Z',
    type: 'ready',
    serviceCategory: 'gifts',
    serviceCategoryLabel: 'Handmade Gifts',
    status: 'Confirmed',
    statusCode: 'processing',
    statusIndex: 1,
    estimatedDelivery: '01 Nov 2026',
    courier: 'StitchBee Courier',
    trackingNumber: 'GFT-IN-33219',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI (Google Pay)',
    transactionRef: 'TXN-88291039',
    customerName: 'Ananya Bose',
    customerPhone: '+91 96112 44321',
    address: '88, 5th Cross, Lavelle Road, Bengaluru, 560001',
    subtotal: 1299,
    deliveryFee: 0,
    discount: 0,
    total: 1299,
    items: [
      {
        id: 'prod-classic-teddy',
        name: 'Classic Teddy Bear',
        price: 1299,
        originalPrice: 1699,
        color: 'Camel Brown',
        size: '14 Inches',
        qty: 1,
        img: '/assets/handmade-gifts/classic_teddy_bear.png',
        material: 'Plush Organic Cotton with Monogram Embroidery "PK"',
        category: 'Handmade Gifts'
      }
    ],
    trackingMilestones: [
      { title: 'Gift Order Placed & Card Message Saved', time: '28 Oct 2026, 12:40 PM', location: 'Gifts Studio', done: true },
      { title: 'Confirmed for Artisan Embroidery', time: '28 Oct 2026, 01:30 PM', location: 'Embroidery Atelier', done: true },
      { title: 'Hand-Stitching & Organic Filling', time: 'Scheduled 29 Oct', location: 'Artisan Workshop', done: false },
      { title: 'Luxury Gift Box Packaging with Silk Ribbon', time: 'Scheduled 30 Oct', location: 'Packing Desk', done: false },
      { title: 'Dispatched with Personal Handover', time: 'Scheduled 31 Oct', location: 'Courier Bay', done: false },
      { title: 'Delivered', time: 'Expected 01 Nov', location: 'Customer Doorstep', done: false }
    ]
  },
  {
    id: 'ORD-3319',
    date: '25 Oct 2026, 03:00 PM',
    timestamp: '2026-10-25T09:30:00.000Z',
    type: 'ready',
    serviceCategory: 'sofas',
    serviceCategoryLabel: 'Sofas & Living',
    status: 'Dispatched / In Transit',
    statusCode: 'shipped',
    statusIndex: 4,
    estimatedDelivery: '03 Nov 2026',
    courier: 'Gati KWE Heavy Logistics',
    trackingNumber: 'GTI-BLR-77218',
    paymentStatus: 'Cash on Delivery',
    paymentMethod: 'Cash on Delivery',
    transactionRef: 'COD-PENDING-DELIVERY',
    customerName: 'Sanjay Deshmukh',
    customerPhone: '+91 94480 66219',
    address: 'B-604, Godrej Platinum, Hebbal, Bengaluru, 560024',
    subtotal: 32999,
    deliveryFee: 0,
    discount: 0,
    total: 32999,
    items: [
      {
        id: 'prod-modern-3-seater',
        name: 'Modern 3 Seater Sofa Cover Set',
        price: 32999,
        originalPrice: 42999,
        color: 'Natural Ivory Cream',
        size: '3 Seater (78" W x 34" D)',
        qty: 1,
        img: '/assets/sofas/prod_modern_3_seater.png',
        material: 'Heavyweight Anti-Stain Belgian Velvet',
        category: 'Living Room Covers'
      }
    ],
    trackingMilestones: [
      { title: 'Order Placed & Dimensions Checked', time: '25 Oct 2026, 03:00 PM', location: 'Sofas Studio', done: true },
      { title: 'Confirmed by Upholstery Master', time: '25 Oct 2026, 04:30 PM', location: 'Hebbal Workshop', done: true },
      { title: 'Triple-Layer Memory Quilt Stitching', time: '26 Oct 2026, 02:00 PM', location: 'Heavy Bays', done: true },
      { title: 'Piping Seam & Tension Inspection', time: '27 Oct 2026, 11:00 AM', location: 'Inspection Desk', done: true },
      { title: 'Dispatched with Heavy Transit Team', time: '27 Oct 2026, 05:00 PM', location: 'Logistics Center', done: true },
      { title: 'Doorstep Fitment & Handover', time: 'Expected 03 Nov 2026', location: 'Customer Living Room', done: false }
    ]
  },
  {
    id: 'CUST-3310',
    date: '24 Oct 2026, 11:30 AM',
    timestamp: '2026-10-24T06:00:00.000Z',
    type: 'custom',
    serviceCategory: 'bags',
    serviceCategoryLabel: 'Bags & Leather',
    status: 'Quote Approved',
    statusCode: 'crafting',
    statusIndex: 2,
    estimatedDelivery: '05 Nov 2026',
    courier: 'StitchBee Artisan Direct',
    trackingNumber: 'CUST-ART-88219',
    paymentStatus: 'Advance Paid',
    paymentMethod: 'UPI (PhonePe)',
    transactionRef: 'TXN-9918237',
    customerName: 'Priyanka Sen',
    customerPhone: '+91 99001 88210',
    address: 'Flat 5B, Green Glen Layout, Bellandur, Bengaluru, 560103',
    subtotal: 6500,
    deliveryFee: 0,
    discount: 0,
    total: 6500,
    customDetails: {
      bagType: 'Handcrafted Structured Tote',
      material: 'Vegetable-Tanned Heritage Full-Grain Leather',
      color: 'Cognac Tan with Contrast Linen Wax Thread',
      size: 'Medium / Everyday (34cm x 26cm x 14cm)',
      hardware: 'Solid 24k Gold-Plated Brass',
      initials: 'PS (Hot-Stamped Blind Deboss)',
      notes: 'Contrast white edge stitching with internal zippered separator and brass key leash.',
      artisanAssigned: 'Master Artisan Rajesh K. (22 yrs experience, Bengaluru Atelier)'
    },
    items: [
      {
        id: 'cust-bag-1',
        name: 'Custom Bespoke Heritage Leather Tote',
        price: 6500,
        qty: 1,
        img: '/featured_bags/prod_2.png',
        color: 'Cognac Tan',
        material: 'Tuscan Vegetable-Tanned Leather',
        category: 'Custom Leather Studio'
      }
    ],
    trackingMilestones: [
      { title: 'Bespoke Silhouette & Specs Submitted', time: '24 Oct 2026, 11:30 AM', location: 'Online Custom Studio', done: true },
      { title: 'Master Artisan Rajesh K. Reviewed Specs', time: '24 Oct 2026, 02:45 PM', location: 'JP Nagar Atelier', done: true },
      { title: 'Custom Estimate & Cad Approved by Customer', time: '25 Oct 2026, 10:00 AM', location: 'Verified by Customer', done: true },
      { title: 'Hand-Selected Hide & Saddle Stitching', time: 'In Active Crafting', location: 'Artisan Bench 1', done: true },
      { title: '24k Gold Hardware Installation & Edge Burnishing', time: 'Scheduled 30 Oct', location: 'Finishing Bench', done: false },
      { title: 'Delivered in Presentation Wood Box', time: 'Expected 05 Nov 2026', location: 'Customer Doorstep', done: false }
    ]
  }
];

const STORAGE_KEY = 'stitchbeez_orders';

// Notify store subscribers across the app
export function notifyStoreUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('stitchbee-store-update'));
  }
}

/**
 * Returns all orders from centralized store
 */
export function getOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Also check if any legacy orders exist under stichbee_orders and merge
    const legacyRaw = localStorage.getItem('stichbee_orders');
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      if (Array.isArray(legacy) && legacy.length > 0) {
        const merged = [...DEFAULT_CENTRAL_ORDERS];
        legacy.forEach(lo => {
          if (!merged.some(o => o.id === lo.id)) {
            merged.push({
              id: lo.id,
              date: lo.date || '2026',
              type: lo.type || 'ready',
              serviceCategory: resolveServiceCategory(lo.serviceName || lo.category || 'clothing'),
              serviceCategoryLabel: getCategoryLabel(resolveServiceCategory(lo.serviceName || lo.category || 'clothing')),
              status: lo.status === 'closed' ? 'Delivered' : 'Artisan Crafting',
              statusCode: lo.status === 'closed' ? 'delivered' : 'crafting',
              statusIndex: lo.status === 'closed' ? 6 : 2,
              total: lo.price || 1200,
              paymentStatus: lo.paymentStatus || 'Paid',
              address: lo.customerAddress || 'Bengaluru',
              items: [{
                name: lo.serviceName || 'Custom Stitching Order',
                price: lo.price || 1200,
                qty: 1,
                img: '/bridal2.jpg'
              }]
            });
          }
        });
        saveOrders(merged);
        return merged;
      }
    }
  } catch (e) {
    console.error('Error reading stitchbeez_orders:', e);
  }
  return [...DEFAULT_CENTRAL_ORDERS];
}

/**
 * Writes array of orders to localStorage and dispatches sync event
 */
export function saveOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    notifyStoreUpdate();
  } catch (e) {
    console.error('Error saving stitchbeez_orders:', e);
  }
}

/**
 * Adds a new order across any category
 */
export function addOrder(orderData) {
  const current = getOrders();
  const serviceCat = resolveServiceCategory(
    orderData.serviceCategory || 
    orderData.category || 
    orderData.items?.[0]?.category || 
    orderData.items?.[0]?.name || 
    orderData.title || 
    'bags'
  );

  const orderType = orderData.type || 'ready';
  const newId = orderData.id || (
    orderType === 'custom' 
      ? `CUST-${Math.floor(1000 + Math.random() * 9000)}` 
      : (orderType === 'restoration' 
          ? `RESTORE-${Math.floor(1000 + Math.random() * 9000)}` 
          : `ORD-${Math.floor(1000 + Math.random() * 9000)}`)
  );

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + 
    ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const trackingNum = orderData.trackingNumber || `STB-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
  const courierPartner = orderData.courier || (serviceCat === 'clothing' ? 'BlueDart Prime' : (serviceCat === 'seats' ? 'StitchBee Mobile Fitment' : 'StitchBee Express Courier'));

  const newOrder = {
    id: newId,
    date: dateFormatted,
    timestamp: now.toISOString(),
    type: orderType,
    serviceCategory: serviceCat,
    serviceCategoryLabel: getCategoryLabel(serviceCat),
    status: orderData.status || (orderType === 'custom' ? 'Quote Requested' : 'Confirmed'),
    statusCode: orderData.statusCode || (orderType === 'custom' ? 'quote_requested' : 'processing'),
    statusIndex: typeof orderData.statusIndex === 'number' ? orderData.statusIndex : (orderType === 'custom' ? 0 : 1),
    estimatedDelivery: orderData.estimatedDelivery || 'In 2-4 business days',
    courier: courierPartner,
    trackingNumber: trackingNum,
    paymentStatus: orderData.paymentStatus || (orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid'),
    paymentMethod: orderData.paymentMethod || 'UPI (Google Pay)',
    transactionRef: orderData.transactionRef || `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
    address: orderData.address || '42, Brigade Millennium, JP Nagar 7th Phase, Bengaluru, 560078',
    customerName: orderData.customerName || 'Valued Customer',
    customerPhone: orderData.customerPhone || '+91 98450 12345',
    subtotal: orderData.subtotal || orderData.total || (typeof orderData.price === 'number' ? orderData.price : 1999),
    deliveryFee: orderData.deliveryFee || 0,
    discount: orderData.discount || 0,
    total: orderData.total || (typeof orderData.price === 'number' ? orderData.price : 1999),
    items: orderData.items || [
      {
        id: `item-${Math.random().toString(36).substr(2, 6)}`,
        name: orderData.title || orderData.name || 'Artisan Custom Order',
        price: orderData.price || orderData.total || 1999,
        qty: orderData.quantity || 1,
        color: orderData.selectedColor || 'Standard',
        size: orderData.size || 'Standard Fit',
        img: orderData.img || orderData.image || '/logo.png',
        material: orderData.material || 'Artisan Grade Material',
        category: getCategoryLabel(serviceCat)
      }
    ],
    customDetails: orderData.customDetails || null,
    trackingMilestones: orderData.trackingMilestones || [
      { title: 'Order Placed & Verified', time: dateFormatted, location: 'StitchBee Online Platform', done: true },
      { title: 'Order Confirmed by Master Artisan', time: 'Shortly after placement', location: 'Central Bengaluru Atelier', done: true },
      { title: 'Handcrafted Assembly & Tailoring', time: 'In Progress', location: 'Artisan Workshop Bay', done: false },
      { title: '18-Point Quality Inspection', time: 'Pending', location: 'Inspection Station', done: false },
      { title: `Dispatched with ${courierPartner}`, time: 'Pending', location: 'Logistics Facility', done: false },
      { title: 'Delivered to Customer Doorstep', time: 'Pending', location: 'Customer Address', done: false }
    ],
    ...orderData
  };

  const updated = [newOrder, ...current];
  saveOrders(updated);
  return newOrder;
}

export const createOrder = addOrder;

/**
 * Cancel an active order
 */
export function cancelOrder(orderId, reason = 'Cancelled by Customer') {
  const current = getOrders();
  const updated = current.map(o => {
    if (o.id === orderId) {
      return {
        ...o,
        status: 'Cancelled',
        statusCode: 'cancelled',
        cancelReason: reason,
        cancelledAt: new Date().toISOString()
      };
    }
    return o;
  });
  saveOrders(updated);
  return updated;
}
