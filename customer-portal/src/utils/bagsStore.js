// StitchBee Bags & Leather Central Store & Mock Persistence
// Supports localStorage keys: stitchbeez_cart, stitchbeez_wishlist, stitchbeez_custom_design, stitchbeez_orders

export const BAG_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'handbags', label: 'Handbags', singular: 'Handbags' },
  { id: 'luggage', label: 'Luggage & Travel', singular: 'Luggage & Travel' },
  { id: 'backpacks', label: 'Backpacks', singular: 'Backpacks' },
  { id: 'briefcases', label: 'Briefcases', singular: 'Briefcases' },
  { id: 'accessories', label: 'Accessories', singular: 'Accessories' }
];

export const ALL_BAG_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Classic Leather Handbag',
    category: 'handbags',
    price: 3999,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 42,
    stock: 14,
    customizable: true,
    img: '/featured_bags/prod_1.png',
    images: [
      '/featured_bags/prod_1.png',
      '/custom_category/Handbags.png',
      '/featured_bags/prod_5.png'
    ],
    colors: [
      { name: 'Nude Beige', hex: '#cbb59d', img: '/featured_bags/prod_1.png' },
      { name: 'Onyx Black', hex: '#111111', img: '/featured_bags/prod_1.png' },
      { name: 'Dusty Rose', hex: '#b85b6c', img: '/featured_bags/prod_1.png' }
    ],
    selectedColor: 'Nude Beige',
    material: 'Full-Grain Tuscan Quilted Leather',
    dimensions: '28cm x 20cm x 12cm',
    weight: '680g',
    features: [
      'Chevron precision quilting',
      'Dual zippered interior compartments',
      '24k gold-plated brass chain strap',
      'Protective metal base studs'
    ],
    description: 'Handcrafted with precision chevron quilting, structured silhouette, interior zip separator, and gold-plated chain strap. Built for effortless daily elegance from boardroom to evening dinner.'
  },
  {
    id: 'prod-2',
    name: 'Travel Luggage Suitcase',
    category: 'luggage',
    price: 6999,
    originalPrice: 8499,
    rating: 4.8,
    reviewCount: 36,
    stock: 9,
    customizable: true,
    img: '/featured_bags/prod_2.png',
    images: [
      '/featured_bags/prod_2.png',
      '/custom_category/Luguage and Travel.png',
      '/restore_cat_luggage.jpg'
    ],
    colors: [
      { name: 'Champagne Tan', hex: '#d4b996', img: '/featured_bags/prod_2.png' },
      { name: 'Jet Black', hex: '#1a1a1a', img: '/featured_bags/prod_2.png' },
      { name: 'Cognac Brown', hex: '#b08060', img: '/featured_bags/prod_2.png' }
    ],
    selectedColor: 'Champagne Tan',
    material: 'Reinforced Polycarbonate with Italian Leather Trim',
    dimensions: '55cm x 38cm x 23cm (Cabin compliant)',
    weight: '3.2kg',
    features: [
      'Whisper-quiet 360° Hinomoto Japanese spinner wheels',
      'Integrated TSA-accepted combination lock',
      'Aerospace grade telescopic aluminum handle',
      'Vegetable-tanned hand-stitched grab handles'
    ],
    description: 'Whisper-quiet 360° spinner wheels, TSA approved lock, telescopic aerospace aluminum handle, and vegetable-tanned leather handle straps. Engineered for global travelers who demand durability and refinement.'
  },
  {
    id: 'prod-3',
    name: 'Urban Leather Backpack',
    category: 'backpacks',
    price: 2999,
    originalPrice: 3799,
    rating: 4.9,
    reviewCount: 58,
    stock: 18,
    customizable: true,
    img: '/featured_bags/prod_3.png',
    images: [
      '/featured_bags/prod_3.png',
      '/custom_category/bockpocks.png',
      '/featured_bags/prod_4.png'
    ],
    colors: [
      { name: 'Camel Tan', hex: '#d2b48c', img: '/featured_bags/prod_3.png' },
      { name: 'Obsidian Black', hex: '#171717', img: '/featured_bags/prod_3.png' },
      { name: 'Terracotta Brown', hex: '#c48b71', img: '/featured_bags/prod_3.png' }
    ],
    selectedColor: 'Camel Tan',
    material: 'Pebble Grain Buffalo Leather',
    dimensions: '42cm x 30cm x 15cm',
    weight: '920g',
    features: [
      'Dedicated padded 16-inch laptop compartment',
      'Water-repellent nylon interior lining',
      'Ergonomic padded leather shoulder straps',
      'Hidden anti-theft passport rear pocket'
    ],
    description: 'Features a dedicated padded 16-inch laptop compartment, water-resistant interior lining, ergonomic shoulder straps, and quick-access passport pocket. Perfectly blends rugged utility with bespoke craftsmanship.'
  },
  {
    id: 'prod-4',
    name: 'Executive Briefcase',
    category: 'briefcases',
    price: 4499,
    originalPrice: 5699,
    rating: 5.0,
    reviewCount: 29,
    stock: 11,
    customizable: true,
    img: '/featured_bags/prod_4.png',
    images: [
      '/featured_bags/prod_4.png',
      '/custom_category/breif cases.png',
      '/featured_bags/prod_1.png'
    ],
    colors: [
      { name: 'Bone Beige', hex: '#e5d3b3', img: '/featured_bags/prod_4.png' },
      { name: 'Midnight Black', hex: '#171717', img: '/featured_bags/prod_4.png' },
      { name: 'Ivory Cream', hex: '#f5ede3', img: '/featured_bags/prod_4.png' }
    ],
    selectedColor: 'Bone Beige',
    material: 'Vegetable-Tanned Heritage Leather',
    dimensions: '40cm x 29cm x 9cm',
    weight: '1.1kg',
    features: [
      'Polished solid brass clasp with numbered key',
      'Triple accordion document dividers',
      'Removable cushioned shoulder strap',
      'Built-in pen holders and card sleeves'
    ],
    description: 'Polished brass clasp lock with key, structured accordion dividers for documents, reinforced top handle, and detachable padded leather shoulder strap. A timeless heirloom designed to age with a rich patina.'
  },
  {
    id: 'prod-5',
    name: 'Minimal Tote Bag',
    category: 'handbags',
    price: 3499,
    originalPrice: 4299,
    rating: 4.8,
    reviewCount: 34,
    stock: 20,
    customizable: true,
    img: '/featured_bags/prod_5.png',
    images: [
      '/featured_bags/prod_5.png',
      '/custom_category/Handbags.png',
      '/featured_bags/prod_1.png'
    ],
    colors: [
      { name: 'Almond Beige', hex: '#d8c2aa', img: '/featured_bags/prod_5.png' },
      { name: 'Dark Espresso', hex: '#38271d', img: '/featured_bags/prod_5.png' },
      { name: 'Pitch Black', hex: '#0d0d0d', img: '/featured_bags/prod_5.png' }
    ],
    selectedColor: 'Almond Beige',
    material: 'Soft Nappa Leather with Suede Lining',
    dimensions: '36cm x 31cm x 14cm',
    weight: '590g',
    features: [
      'Magnetic bridge closure',
      'Removable interior zippered clutch pouch',
      'Generous 25cm shoulder strap drop',
      'Ultralight seamless edge finish'
    ],
    description: 'Spacious everyday tote with magnetic snap bridge closure, interior zippered clutch pouch, and comfortable double-stitched shoulder drop handles. Unstructured luxury for all your everyday essentials.'
  },
  {
    id: 'prod-6',
    name: 'Artisan Leather Bifold Wallet',
    category: 'accessories',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 47,
    stock: 35,
    customizable: true,
    img: '/custom_category/Accessories.png',
    images: [
      '/custom_category/Accessories.png',
      '/materials/mat_full_grain.jpg'
    ],
    colors: [
      { name: 'Cognac Tan', hex: '#8c5835', img: '/custom_category/Accessories.png' },
      { name: 'Saddle Brown', hex: '#5c3a21', img: '/custom_category/Accessories.png' },
      { name: 'Charcoal Black', hex: '#222222', img: '/custom_category/Accessories.png' }
    ],
    selectedColor: 'Cognac Tan',
    material: 'Full-Grain Vegetable Tanned Cowhide',
    dimensions: '11cm x 9cm x 1.5cm',
    weight: '85g',
    features: [
      'RFID blocking internal protection',
      '8 dedicated card slots + 2 hidden currency sleeves',
      'Hand-burnished and waxed edges',
      'Personalized monogramming available'
    ],
    description: 'Handcrafted slim bifold wallet made from vegetable tanned cowhide. Features RFID blocking shielding, 8 precision cut card slots, and hand-waxed edges.'
  },
  {
    id: 'prod-7',
    name: 'Heritage Weekender Duffel',
    category: 'luggage',
    price: 5499,
    originalPrice: 6999,
    rating: 4.9,
    reviewCount: 22,
    stock: 8,
    customizable: true,
    img: '/custom_category/Luguage and Travel.png',
    images: [
      '/custom_category/Luguage and Travel.png',
      '/featured_bags/prod_2.png'
    ],
    colors: [
      { name: 'Vintage Chestnut', hex: '#6f432a', img: '/custom_category/Luguage and Travel.png' },
      { name: 'Espresso', hex: '#2b1d14', img: '/custom_category/Luguage and Travel.png' }
    ],
    selectedColor: 'Vintage Chestnut',
    material: 'Full Grain Waxed Pull-up Leather',
    dimensions: '52cm x 28cm x 26cm',
    weight: '1.8kg',
    features: [
      'Heavy-duty YKK antique brass dual zippers',
      'Side ventilated shoe compartment',
      'Thick padded detachable shoulder strap',
      'Cabin size approved for all airlines'
    ],
    description: 'The ultimate weekend companion. Cut from thick waxed pull-up leather that develops unique character with every flight and road trip.'
  },
  {
    id: 'prod-8',
    name: 'Slim Leather Cardholder',
    category: 'accessories',
    price: 899,
    originalPrice: 1299,
    rating: 4.7,
    reviewCount: 51,
    stock: 40,
    customizable: true,
    img: '/custom_category/Accessories.png',
    images: [
      '/custom_category/Accessories.png'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111', img: '/custom_category/Accessories.png' },
      { name: 'Cognac', hex: '#8c5835', img: '/custom_category/Accessories.png' },
      { name: 'Burgundy', hex: '#631d2f', img: '/custom_category/Accessories.png' }
    ],
    selectedColor: 'Onyx Black',
    material: 'Top Grain Italian Saffiano Leather',
    dimensions: '10cm x 7.5cm x 0.4cm',
    weight: '35g',
    features: [
      'Ultra-compact front pocket profile',
      '4 card slots + 1 center cash fold sleeve',
      'Scratch-resistant crosshatch grain'
    ],
    description: 'Minimalist cardholder crafted from scratch-resistant Saffiano leather. Designed for modern essentials with zero pocket bulk.'
  }
];

export const ALL_MATERIALS = [
  {
    id: 'full-grain-leather',
    name: 'Full Grain Leather',
    tag: 'Heritage Grade',
    img: '/materials/mat_full_grain.jpg',
    desc: 'The highest grade hide with natural grain and enduring patina.',
    durability: '5 / 5 — Lifetime Longevity',
    texture: 'Natural surface with organic hide markings, tight fibers, breathable and supple.',
    recommendedBags: 'Briefcases, Travel Duffels, Structured Totes, Signature Belts',
    careInfo: 'Clean with damp cloth. Condition with natural beeswax cream every 6 months to preserve suppleness.'
  },
  {
    id: 'top-grain-leather',
    name: 'Top Grain Leather',
    tag: 'Everyday Luxury',
    img: '/materials/mat_top_grain.jpg',
    desc: 'Smooth, uniform surface treated for scratch and stain resistance.',
    durability: '4.5 / 5 — Heavy Daily Use',
    texture: 'Lightly buffed top layer with micro-embossed grain for consistent color and finish.',
    recommendedBags: 'Everyday Handbags, Urban Backpacks, Bifold Wallets, Laptop Sleeves',
    careInfo: 'Wipe clean with mild leather cleaner. Highly resistant to spills and light moisture.'
  },
  {
    id: 'suede-leather',
    name: 'Suede Leather',
    tag: 'Velvety Touch',
    img: '/materials/mat_suede.jpg',
    desc: 'Soft, napped finish offering exceptional luxury feel.',
    durability: '4 / 5 — Premium Occasional & Fashion',
    texture: 'Soft sanded split leather with velvety touch and rich color absorption.',
    recommendedBags: 'Slouchy Shoulder Bags, Evening Clutches, Bag Interior Linings',
    careInfo: 'Brush with a brass or crepe suede brush. Treat with waterproof suede protector spray.'
  },
  {
    id: 'nappa-leather',
    name: 'Nappa Leather',
    tag: 'Ultra Soft',
    img: '/materials/mat_nappa.jpg',
    desc: 'Full-grain calfskin renowned for buttery softness and flexibility.',
    durability: '4.5 / 5 — Luxury Ergonomic Wear',
    texture: 'Drum-dyed, buttery soft, lightweight, and incredibly pliable.',
    recommendedBags: 'Crossbody Bags, Pouch Bags, Luxury Handbag Lining, Gloves',
    careInfo: 'Use specialized delicate leather lotion. Keep away from prolonged intense direct sunlight.'
  },
  {
    id: 'canvas-fabric',
    name: 'Canvas Fabric',
    tag: 'Heavy Duty',
    img: '/materials/mat_canvas.jpg',
    desc: 'Rugged woven cotton canvas blended with water-resistant coating.',
    durability: '5 / 5 — Extreme Outdoor & Travel',
    texture: 'Tightly woven 18oz duck canvas, resistant to abrasions, scuffs, and tearing.',
    recommendedBags: 'Weekender Duffels, Commuter Backpacks, Utility Totes, Field Bags',
    careInfo: 'Spot clean with mild soap and cold water. Spot wax every year for water resistance.'
  },
  {
    id: 'vegan-leather',
    name: 'Vegan Leather',
    tag: 'Cruelty Free',
    img: '/materials/mat_vegan.jpg',
    desc: 'Premium bio-based leather alternative with low environmental impact.',
    durability: '4 / 5 — Eco-Friendly Everyday',
    texture: 'Smooth pebble finish derived from apple/polyurethane matrix, flexible and vegan-certified.',
    recommendedBags: 'Casual Handbags, Fashion Totes, Sustainable Wallets',
    careInfo: 'Wipe with damp microfiber cloth. No conditioning creams needed.'
  },
  {
    id: 'croc-texture',
    name: 'Croc Texture',
    tag: 'Exotic Elegance',
    img: '/materials/mat_croc.jpg',
    desc: 'Embossed cowhide recreating deep exotic reptilian scale depth.',
    durability: '4.5 / 5 — Statement Luxury',
    texture: 'High-pressure heat embossed scale pattern with high-gloss two-tone tipping.',
    recommendedBags: 'Executive Portfolios, Evening Clutches, Structured Satchels',
    careInfo: 'Buff gently with dry lint-free cloth. Avoid sharp metal abrasions on raised scales.'
  },
  {
    id: 'metallic-finish',
    name: 'Metallic Finish',
    tag: 'Statement Glow',
    img: '/materials/mat_metallic.jpg',
    desc: 'Foil-laminated leather for glamorous evening bags and clutches.',
    durability: '4 / 5 — Event & Glamour',
    texture: 'Smooth reflective metallic foil laminated over supple lambskin.',
    recommendedBags: 'Minaudières, Party Clutches, Festive Sling Bags',
    careInfo: 'Store in protective flannel dust bag when not in use. Avoid alcohol-based perfumes.'
  }
];

export const ALL_REVIEWS = [
  {
    id: 'rev-1',
    customerName: 'Priya S.',
    location: 'Bengaluru',
    rating: 5,
    date: '12 Sep 2026',
    verified: true,
    review: 'Absolutely loved my custom handbag. The quality and finish are excellent! The grain and stitching are better than luxury brands costing 3x as much.',
    productId: 'prod-1',
    productName: 'Classic Leather Handbag',
    productImage: '/featured_bags/prod_1.png',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    customerName: 'Rahul K.',
    location: 'Hyderabad',
    rating: 5,
    date: '28 Aug 2026',
    verified: true,
    review: 'Perfect travel bag for my Europe trip. Sturdy and stylish. Highly recommended! The telescopic handle and wheels survived 4 connecting flights without a scratch.',
    productId: 'prod-2',
    productName: 'Travel Luggage Suitcase',
    productImage: '/restore_cat_luggage.jpg',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    customerName: 'Arun M.',
    location: 'Chennai',
    rating: 5,
    date: '15 Aug 2026',
    verified: true,
    review: 'The custom briefcase looks premium and professional. Great craftsmanship. Stitching and edge finishing look factory-new. Highly recommend StitchBee!',
    productId: 'prod-4',
    productName: 'Executive Briefcase',
    productImage: '/featured_bags/prod_4.png',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'rev-4',
    customerName: 'Ananya D.',
    location: 'Mumbai',
    rating: 5,
    date: '02 Aug 2026',
    verified: true,
    review: 'Designed my dream laptop tote with my initials embossed on the strap. StitchBee artisans contacted me with leather swatches and it turned out even better than anticipated.',
    productId: 'prod-5',
    productName: 'Minimal Tote Bag',
    productImage: '/featured_bags/prod_5.png',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'rev-5',
    customerName: 'Vikram R.',
    location: 'Delhi NCR',
    rating: 5,
    date: '19 Jul 2026',
    verified: true,
    review: 'The Urban Leather Backpack has been my daily companion for over a month now. Fits my 16-inch Macbook Pro comfortably and the leather smell is authentic Tuscan hide.',
    productId: 'prod-3',
    productName: 'Urban Leather Backpack',
    productImage: '/featured_bags/prod_3.png',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop'
  }
];

// Seed sample orders if none exist
const DEFAULT_ORDERS = [
  {
    id: 'ORD-8942',
    date: '28 Sep 2026',
    type: 'ready',
    status: 'Crafting / Processing',
    statusCode: 'processing',
    statusIndex: 2,
    total: 3999,
    items: [
      {
        id: 'prod-1',
        name: 'Classic Leather Handbag',
        price: 3999,
        color: 'Nude Beige',
        qty: 1,
        img: '/featured_bags/prod_1.png'
      }
    ],
    address: '42, Brigade Millennium, JP Nagar 7th Phase, Bengaluru, 560078',
    deliveryMethod: 'Express Courier (2-3 Days)',
    trackingNumber: 'STB-IN-908214'
  },
  {
    id: 'CUST-3310',
    date: '24 Sep 2026',
    type: 'custom',
    status: 'Quote Requested',
    statusCode: 'quote_requested',
    statusIndex: 0,
    total: 'Pending Artisan Assessment',
    customDetails: {
      bagType: 'Handbag',
      material: 'Full Grain Leather',
      color: 'Cognac Tan',
      size: 'Medium / Everyday (32cm x 24cm)',
      hardware: 'Polished Gold',
      initials: 'PS',
      notes: 'Contrast white edge stitching with internal key leash',
      referenceImage: null
    },
    address: 'Flat 302, Green Glen Layout, Bellandur, Bengaluru, 560103',
    artisanAssigned: 'Master Artisan Rajesh K. (22 yrs experience)'
  }
];

// Helper: Dispatch global update event
function notifyStoreUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('stitchbee-store-update'));
  }
}

// -------------------------------------------------------------
// CART MANAGEMENT (stitchbeez_cart)
// -------------------------------------------------------------
export function getCart() {
  try {
    const raw = localStorage.getItem('stitchbeez_cart');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading stitchbeez_cart:', e);
  }
  return [
    {
      id: 'prod-1',
      name: 'Classic Leather Handbag',
      price: 3999,
      color: 'Nude Beige',
      img: '/featured_bags/prod_1.png',
      material: 'Full-Grain Tuscan Quilted Leather',
      qty: 1
    }
  ];
}

export function saveCart(cart) {
  try {
    localStorage.setItem('stitchbeez_cart', JSON.stringify(cart));
    notifyStoreUpdate();
  } catch (e) {
    console.error('Error saving stitchbeez_cart:', e);
  }
}

export function addToCart(product, qty = 1, selectedColor = null) {
  const current = getCart();
  const colorName = selectedColor || product.selectedColor || product.colors?.[0]?.name || 'Standard';
  const existingIndex = current.findIndex(item => item.id === product.id && item.color === colorName);
  
  let updated;
  if (existingIndex > -1) {
    updated = current.map((item, idx) => 
      idx === existingIndex ? { ...item, qty: item.qty + qty } : item
    );
  } else {
    updated = [
      ...current,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        color: colorName,
        img: product.img,
        material: product.material || 'Premium Tuscan Leather',
        qty
      }
    ];
  }
  saveCart(updated);
  return updated;
}

export function updateCartQty(productId, color, delta) {
  const current = getCart();
  const updated = current
    .map(item => {
      if (item.id === productId && item.color === color) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : null;
      }
      return item;
    })
    .filter(Boolean);
  saveCart(updated);
  return updated;
}

export function removeFromCart(productId, color) {
  const current = getCart();
  const updated = current.filter(item => !(item.id === productId && item.color === color));
  saveCart(updated);
  return updated;
}

// -------------------------------------------------------------
// WISHLIST MANAGEMENT (stitchbeez_wishlist)
// -------------------------------------------------------------
export function getWishlist() {
  try {
    const raw = localStorage.getItem('stitchbeez_wishlist');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading stitchbeez_wishlist:', e);
  }
  return ['prod-1', 'prod-4'];
}

export function saveWishlist(ids) {
  try {
    localStorage.setItem('stitchbeez_wishlist', JSON.stringify(ids));
    notifyStoreUpdate();
  } catch (e) {
    console.error('Error saving stitchbeez_wishlist:', e);
  }
}

export function toggleWishlist(productId) {
  const current = getWishlist();
  const exists = current.includes(productId);
  const updated = exists ? current.filter(id => id !== productId) : [...current, productId];
  saveWishlist(updated);
  return { updated, added: !exists };
}

// -------------------------------------------------------------
// ORDERS MANAGEMENT (stitchbeez_orders)
// -------------------------------------------------------------
export function getOrders() {
  try {
    const raw = localStorage.getItem('stitchbeez_orders');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading stitchbeez_orders:', e);
  }
  return DEFAULT_ORDERS;
}

export function saveOrders(orders) {
  try {
    localStorage.setItem('stitchbeez_orders', JSON.stringify(orders));
    notifyStoreUpdate();
  } catch (e) {
    console.error('Error saving stitchbeez_orders:', e);
  }
}

export function addOrder(orderData) {
  const current = getOrders();
  const newOrder = {
    id: orderData.type === 'custom' ? `CUST-${Math.floor(1000 + Math.random() * 9000)}` : `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    ...orderData
  };
  const updated = [newOrder, ...current];
  saveOrders(updated);
  return newOrder;
}

// -------------------------------------------------------------
// CUSTOM DESIGN STORAGE (stitchbeez_custom_design)
// -------------------------------------------------------------
export function getCustomDesignDraft() {
  try {
    const raw = localStorage.getItem('stitchbeez_custom_design');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading stitchbeez_custom_design:', e);
  }
  return null;
}

export function saveCustomDesignDraft(draft) {
  try {
    localStorage.setItem('stitchbeez_custom_design', JSON.stringify(draft));
    notifyStoreUpdate();
  } catch (e) {
    console.error('Error saving stitchbeez_custom_design:', e);
  }
}
