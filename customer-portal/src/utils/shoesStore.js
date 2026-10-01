// StitchBee Shoes & Footwear Store & Mock Persistence
// Synchronizes with localStorage keys: stitchbeez_cart, stitchbeez_wishlist, stitchbeez_custom_design, stitchbeez_orders

export const SHOE_CATEGORIES = [
  { id: 'all', label: 'All Footwear', singular: 'Footwear' },
  { id: 'mens', label: "Men's Shoes", singular: 'Men\'s Shoes', sub: 'Formal, casual & leather shoes', img: '/prod_shoe_formal.jpg', action: 'Explore →' },
  { id: 'womens', label: "Women's Shoes", singular: 'Women\'s Shoes', sub: 'Heels, flats & leather footwear', img: '/prod_shoe_heels.jpg', action: 'Explore →' },
  { id: 'sneakers', label: 'Sneakers', singular: 'Sneakers', sub: 'Sports, casual & lifestyle sneakers', img: '/prod_shoe_urban_sneaker.jpg', action: 'Explore →' },
  { id: 'sandals', label: 'Sandals', singular: 'Sandals', sub: 'Leather sandals & everyday footwear', img: '/prod_shoe_sandals.jpg', action: 'Explore →' },
  { id: 'slippers', label: 'Slippers', singular: 'Slippers', sub: 'Comfort slippers & home footwear', img: '/shoef_c3.jpg', action: 'Explore →' },
  { id: 'boots', label: 'Boots', singular: 'Boots', sub: 'Ankle & premium boots', img: '/shoef_c10.jpg', action: 'Explore →' },
  { id: 'custom', label: 'Custom Design', singular: 'Custom Design', sub: 'Your design, our craft', img: '/footwear_concept_sketch.jpg', action: 'Start Designing →', isCustom: true }
];

export const ALL_SHOE_PRODUCTS = [
  {
    id: 'shoe-1',
    name: 'Classic Leather Formal Shoes',
    category: 'mens',
    price: 3999,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 48,
    stock: 12,
    customizable: true,
    img: '/prod_shoe_formal.jpg',
    images: [
      '/prod_shoe_formal.jpg',
      '/footwear_hero.jpg',
      '/footwear_lifestyle_lineup.jpg'
    ],
    colors: [
      { name: 'Chestnut Cognac', hex: '#7a3e1d', img: '/prod_shoe_formal.jpg' },
      { name: 'Onyx Black', hex: '#111111', img: '/prod_shoe_formal.jpg' },
      { name: 'Deep Burgundy', hex: '#58111a', img: '/prod_shoe_formal.jpg' }
    ],
    selectedColor: 'Chestnut Cognac',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    selectedSize: 'UK 8',
    material: 'Hand-Burnished Italian Full-Grain Calfskin',
    soleType: 'Goodyear Welted Oak-Bark Leather Sole',
    weight: '490g (per shoe)',
    features: [
      'Genuine Goodyear welt construction with repairable sole',
      'Hand-punched brogue medallion toe detailing',
      'Dual-density high-rebound orthopedic foam insole',
      'Full glove-leather breathable lining'
    ],
    description: 'A timeless silhouette meticulously handcrafted from full-grain Italian calfskin. Hand-burnished by master cordwainers to achieve rich depth of color, with Goodyear welted leather outsoles engineered for a lifetime of distinguished wear.'
  },
  {
    id: 'shoe-2',
    name: 'Urban Sneakers',
    category: 'sneakers',
    price: 2499,
    originalPrice: 3199,
    rating: 4.8,
    reviewCount: 64,
    stock: 22,
    customizable: true,
    img: '/prod_shoe_urban_sneaker.jpg',
    images: [
      '/prod_shoe_urban_sneaker.jpg',
      '/footwear_lifestyle_lineup.jpg',
      '/shoe_c2.jpg'
    ],
    colors: [
      { name: 'Crisp White', hex: '#f8fafc', img: '/prod_shoe_urban_sneaker.jpg' },
      { name: 'Slate Grey', hex: '#64748b', img: '/prod_shoe_urban_sneaker.jpg' },
      { name: 'Jet Black', hex: '#111111', img: '/prod_shoe_urban_sneaker.jpg' }
    ],
    selectedColor: 'Crisp White',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    selectedSize: 'UK 8',
    material: 'Buttery Nappa Leather & Margom Cupsole',
    soleType: 'Shock-Absorbing Vulcanized Rubber Cupsole',
    weight: '380g (per shoe)',
    features: [
      'Full grain nappa leather with reinforced heel panelling',
      'Padded ankle collar and calfskin interior lining',
      'Waxed flat cotton lacing system',
      'Ultra-durable stitched Margom-style Italian rubber cupsole'
    ],
    description: 'Clean, architectural, and effortlessly versatile. Handcrafted from premium buttery nappa leather that breaks in naturally. Seamlessly bridges boardroom casual and weekend leisure with maximum support.'
  },
  {
    id: 'shoe-3',
    name: 'Leather Loafers',
    category: 'mens',
    price: 3499,
    originalPrice: 4299,
    rating: 4.9,
    reviewCount: 39,
    stock: 15,
    customizable: true,
    img: '/prod_shoe_loafer.jpg',
    images: [
      '/prod_shoe_loafer.jpg',
      '/footwear_lifestyle_lineup.jpg',
      '/prod_shoe_formal.jpg'
    ],
    colors: [
      { name: 'Caramel Tan', hex: '#b46d3b', img: '/prod_shoe_loafer.jpg' },
      { name: 'Deep Espresso', hex: '#2f1b0c', img: '/prod_shoe_loafer.jpg' },
      { name: 'Midnight Navy', hex: '#1e293b', img: '/prod_shoe_loafer.jpg' }
    ],
    selectedColor: 'Caramel Tan',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    selectedSize: 'UK 8',
    material: 'Full-Grain Pebble Cowhide with Hand-Sewn Apron',
    soleType: 'Leather Sole with Anti-Slip Rubber Pod Inserts',
    weight: '420g (per shoe)',
    features: [
      'Classic penny keeper saddle with hand-stitched beefrolls',
      'Flexible Blake-stitched construction for immediate broken-in comfort',
      'Breathable veg-tan leather footbed that molds to foot arch',
      'Brass nail-reinforced stacked heel'
    ],
    description: 'The epitome of Italian sprezzatura. Expertly shaped with a hand-stitched apron and penny saddle, crafted from supple pebble-grain leather that requires zero break-in period.'
  },
  {
    id: 'shoe-4',
    name: 'Sport Sneakers',
    category: 'sneakers',
    price: 2999,
    originalPrice: 3699,
    rating: 4.7,
    reviewCount: 52,
    stock: 18,
    customizable: true,
    img: '/shoe_c2.jpg',
    images: [
      '/shoe_c2.jpg',
      '/prod_shoe_urban_sneaker.jpg',
      '/footwear_lifestyle_lineup.jpg'
    ],
    colors: [
      { name: 'Cloud White', hex: '#f1f5f9', img: '/shoe_c2.jpg' },
      { name: 'Earth Olive', hex: '#4b5320', img: '/shoe_c2.jpg' },
      { name: 'Midnight Onyx', hex: '#18181b', img: '/shoe_c2.jpg' }
    ],
    selectedColor: 'Cloud White',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    selectedSize: 'UK 8',
    material: 'Engineered Breathable Mesh & Brushed Suede',
    soleType: 'Dual-Density EVA Foam Midsole + Vibram Tread',
    weight: '320g (per shoe)',
    features: [
      'Multi-directional flex grooves for ergonomic gait support',
      'Reinforced suede mudguard and TPU heel clip stability',
      'Removable antimicrobial molded memory foam orthotic insole',
      'Reflective pull tabs on tongue and collar'
    ],
    description: 'High-performance comfort meets artisanal design. Constructed with breathable technical sports mesh and plush split-suede paneling atop a responsive dual-density cushioning platform.'
  },
  {
    id: 'shoe-5',
    name: 'Leather Sandals',
    category: 'sandals',
    price: 2499,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 31,
    stock: 20,
    customizable: true,
    img: '/prod_shoe_sandals.jpg',
    images: [
      '/prod_shoe_sandals.jpg',
      '/footwear_lifestyle_lineup.jpg',
      '/shoef_c4.jpg'
    ],
    colors: [
      { name: 'Vintage Tan', hex: '#a45a2a', img: '/prod_shoe_sandals.jpg' },
      { name: 'Saddle Brown', hex: '#5c3a21', img: '/prod_shoe_sandals.jpg' },
      { name: 'Charcoal Black', hex: '#262626', img: '/prod_shoe_sandals.jpg' }
    ],
    selectedColor: 'Vintage Tan',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    selectedSize: 'UK 8',
    material: 'Vegetable Tanned Full-Grain Straps',
    soleType: 'High-Grip Natural Crepe Rubber Sole',
    weight: '290g (per shoe)',
    features: [
      'Solid antique brass buckle with adjustable ankle strap',
      'Anatomically contoured cork-latex footbed wrapped in calfskin',
      'Reinforced strap anchor points with heavy gauge wax thread',
      'Shock-absorbing textured crepe outsole'
    ],
    description: 'Handcrafted artisan gladiator and fisherman-inspired leather sandals. Built with full-grain vegetable tanned straps that soften and develop unique patina with sun and wear.'
  },
  {
    id: 'shoe-6',
    name: 'Elegant Women Heels',
    category: 'womens',
    price: 3999,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 45,
    stock: 14,
    customizable: true,
    img: '/prod_shoe_heels.jpg',
    images: [
      '/prod_shoe_heels.jpg',
      '/footwear_hero.jpg',
      '/shoef_c2.jpg'
    ],
    colors: [
      { name: 'Nude Blush', hex: '#dfc1a4', img: '/prod_shoe_heels.jpg' },
      { name: 'Patent Black', hex: '#111111', img: '/prod_shoe_heels.jpg' },
      { name: 'Ruby Crimson', hex: '#831843', img: '/prod_shoe_heels.jpg' }
    ],
    selectedColor: 'Nude Blush',
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9'],
    selectedSize: 'UK 6',
    material: 'Mirror Patent Leather with Cushioned Ball-of-Foot Pods',
    soleType: 'Slim Red-Tone Tunite Sole with Rubber Tip',
    weight: '260g (per shoe)',
    features: [
      'Architecturally balanced 3.5-inch stiletto heel with steel shank',
      'Targeted 6mm metatarsal high-density foam padding',
      'Soft lambskin interior lining preventing heel slippage and blisters',
      'Ultra-sharp pointed toe profile'
    ],
    description: 'Sculptural elegance engineered for real wearability. Features a precisely balanced center of gravity, targeted metatarsal padding, and radiant Italian mirror patent leather.'
  },
  {
    id: 'shoe-7',
    name: 'Velvet Comfort Slippers',
    category: 'slippers',
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 78,
    stock: 25,
    customizable: true,
    img: '/shoef_c3.jpg',
    images: [
      '/shoef_c3.jpg',
      '/footwear_lifestyle_lineup.jpg',
      '/prod_shoe_sandals.jpg'
    ],
    colors: [
      { name: 'Plush Caramel', hex: '#9a532a', img: '/shoef_c3.jpg' },
      { name: 'Royal Navy', hex: '#1e3a5f', img: '/shoef_c3.jpg' },
      { name: 'Charcoal Grey', hex: '#334155', img: '/shoef_c3.jpg' }
    ],
    selectedColor: 'Plush Caramel',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    selectedSize: 'UK 8',
    material: 'Split Suede Shell & Genuine Shearling Fleece',
    soleType: 'Non-Marking Anti-Slip Outdoor EVA Sole',
    weight: '240g (per shoe)',
    features: [
      '100% natural wool shearling collar and footbed lining',
      'Hand-stitched moccasin toe seam with reinforced thread',
      'Multi-layer memory foam cushioning that shapes to foot',
      'Durable textured sole suitable for quick outdoor steps'
    ],
    description: 'The pinnacle of home luxury. Lined with thick, cloud-soft shearling fleece and encased in supple suede, providing unparalleled warmth, breathability, and step-in bliss.'
  },
  {
    id: 'shoe-8',
    name: 'Chelsea Leather Boots',
    category: 'boots',
    price: 4499,
    originalPrice: 5499,
    rating: 4.9,
    reviewCount: 43,
    stock: 10,
    customizable: true,
    img: '/shoef_c10.jpg',
    images: [
      '/shoef_c10.jpg',
      '/footwear_hero.jpg',
      '/prod_shoe_formal.jpg'
    ],
    colors: [
      { name: 'Walnut Brown', hex: '#5a3d28', img: '/shoef_c10.jpg' },
      { name: 'Matte Black', hex: '#1c1917', img: '/shoef_c10.jpg' },
      { name: 'Distressed Tan', hex: '#8c5e39', img: '/shoef_c10.jpg' }
    ],
    selectedColor: 'Walnut Brown',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    selectedSize: 'UK 8',
    material: 'Oiled Weatherproof Pull-Up Leather',
    soleType: 'Rugged Commando Lug Rubber Sole with Storm Welt',
    weight: '560g (per boot)',
    features: [
      'Heavy-duty dual elastic side gussets for easy slip-on',
      'Waterproof pull-up leather that self-heals micro scuffs',
      '360° Goodyear storm welt sealing out moisture and rain',
      'Dual woven pull tabs on front and rear collar'
    ],
    description: 'Rugged elegance built for any weather and terrain. Crafted from thick pull-up leather rich in natural oils, grounded by deep-lugged commando soles for confident traction.'
  }
];

export const SHOE_MATERIALS = [
  {
    id: 'full-grain-leather',
    name: 'Full Grain Leather',
    tag: 'Heritage Grade',
    img: '/materials/mat_full_grain.jpg',
    desc: 'The highest grade hide with natural grain and enduring patina.',
    durability: '5 / 5 — Lifetime Longevity',
    breathability: 'High — Micro-pore natural ventilation',
    texture: 'Natural surface with organic hide markings, tight fibers, breathable and supple.',
    recommendedFootwear: 'Oxford Brogues, Derbies, Chelsea Boots, Loafers',
    careInfo: 'Clean with damp cloth. Condition with natural beeswax shoe cream every 4–6 months.'
  },
  {
    id: 'suede-leather',
    name: 'Suede Leather',
    tag: 'Velvety Touch',
    img: '/materials/mat_suede.jpg',
    desc: 'Soft, napped finish offering exceptional luxury feel.',
    durability: '4 / 5 — Casual & Dress Luxury',
    breathability: 'Very High — Open fiber structure',
    texture: 'Soft sanded split leather with velvety touch and rich color absorption.',
    recommendedFootwear: 'Penny Loafers, Desert Boots, Casual Sneakers, House Slippers',
    careInfo: 'Brush with a brass or crepe suede brush. Treat with waterproof suede protector spray.'
  },
  {
    id: 'nappa-leather',
    name: 'Nappa Leather',
    tag: 'Ultra Soft',
    img: '/materials/mat_nappa.jpg',
    desc: 'Full-grain calfskin renowned for buttery softness and flexibility.',
    durability: '4.5 / 5 — Supreme Ergonomic Comfort',
    breathability: 'High — Pliable aniline finish',
    texture: 'Drum-dyed, buttery soft, lightweight, and zero break-in stiffness.',
    recommendedFootwear: 'Urban Sneakers, Ballet Flats, Soft Loafers, Driving Shoes',
    careInfo: 'Use specialized delicate leather lotion. Keep away from prolonged intense direct heat.'
  },
  {
    id: 'vintage-leather',
    name: 'Vintage Leather',
    tag: 'Weathered Richness',
    img: '/materials/mat_top_grain.jpg',
    desc: 'Pull-up wax infused leather developing rich two-tone marbling.',
    durability: '5 / 5 — Rugged Heavy Wear',
    breathability: 'Medium — Wax impregnated',
    texture: 'Rich oils and waxes that lighten when stretched or bent, creating a distressed look.',
    recommendedFootwear: 'Ankle Boots, Work Boots, Rugged Casual Shoes, Sandals',
    careInfo: 'Scratches buff out easily with finger friction or warm horsehair brush buffing.'
  },
  {
    id: 'canvas-fabric',
    name: 'Canvas Fabric',
    tag: 'Heavy Duty',
    img: '/materials/mat_canvas.jpg',
    desc: 'Rugged woven cotton canvas blended with water-resistant coating.',
    durability: '4.5 / 5 — High Abrasion Resistance',
    breathability: 'Very High — Natural cotton airflow',
    texture: 'Tightly woven 18oz duck canvas, resistant to abrasions, scuffs, and tearing.',
    recommendedFootwear: 'High-Top Sneakers, Deck Shoes, Espadrilles, Slip-ons',
    careInfo: 'Spot clean with mild soap and cold water. Spot wax every year for water resistance.'
  },
  {
    id: 'mesh-fabric',
    name: 'Mesh Fabric',
    tag: 'Sport Breathable',
    img: '/materials/mat_mesh_fabric.jpg',
    desc: 'Technical engineered breathable knit for athletic agility.',
    durability: '4 / 5 — Flexible & Lightweight',
    breathability: 'Maximum 5 / 5 — Continuous Air Cooling',
    texture: 'Honeycomb 3D technical mesh with moisture-wicking synthetic yarn.',
    recommendedFootwear: 'Sport Sneakers, Running Trainers, Summer Hybrid Shoes',
    careInfo: 'Hand wash gently with cool water and sneaker foam cleaner. Air dry in shade.'
  },
  {
    id: 'vegan-leather',
    name: 'Vegan Leather',
    tag: 'Cruelty Free',
    img: '/materials/mat_vegan.jpg',
    desc: 'Premium bio-based leather alternative with low environmental impact.',
    durability: '4 / 5 — Eco-Friendly Everyday',
    breathability: 'Medium — Breathable bio-membrane',
    texture: 'Smooth pebble finish derived from apple/polyurethane matrix, flexible and certified.',
    recommendedFootwear: 'Sneakers, Casual Loafers, Sustainable Sandals, Flats',
    careInfo: 'Wipe with damp microfiber cloth. No conditioning creams needed.'
  },
  {
    id: 'rubber-sole',
    name: 'Rubber Sole',
    tag: 'All-Terrain Grip',
    img: '/materials/mat_rubber_sole.jpg',
    desc: 'High-traction Vibram/crepe compound for dependable grip and shock absorption.',
    durability: '5 / 5 — Anti-Wear Durability',
    breathability: 'Shock-Absorbing Foundation',
    texture: 'Deep siped commando lug lugs with high-friction vulcanized rubber blend.',
    recommendedFootwear: 'Lug Boots, Trail Sneakers, Brogues, All-Weather Footwear',
    careInfo: 'Wash out dirt and mud with water and stiff nylon brush. Wipe clean.'
  }
];

export const SHOE_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Priya S.',
    location: 'Bandra West, Mumbai',
    rating: 5,
    quote: 'Ordered bespoke Oxford brogues for my husband\'s 30th birthday. The custom monogram and calfskin finish blew us away. Fit is like a second skin!',
    itemImg: '/prod_shoe_formal.jpg',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    name: 'Rahul K.',
    location: 'Indiranagar, Bengaluru',
    rating: 5,
    quote: 'The urban sneakers in Italian nappa leather are more comfortable than my running shoes. Handcrafted quality that turns heads at work and on flights.',
    itemImg: '/prod_shoe_urban_sneaker.jpg',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    name: 'Meera R.',
    location: 'Greater Kailash, Delhi',
    rating: 5,
    quote: 'Created custom embroidered block heels for my reception. StitchBeez artisans sent sketches and 3D preview before crafting. Absolute perfection!',
    itemImg: '/prod_shoe_heels.jpg',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  }
];

// Helper to trigger header cart/wishlist sync
const notifyStoreUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('stitchbee-store-update'));
    window.dispatchEvent(new Event('storage'));
  }
};

export const getFootwearCart = () => {
  try {
    const raw = localStorage.getItem('stitchbeez_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const addFootwearToCart = (product, selectedColor, selectedSize, quantity = 1) => {
  try {
    const cart = getFootwearCart();
    const color = selectedColor || product.selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    const size = selectedSize || product.selectedSize || 'UK 8';
    const cartKey = `${product.id}-${color}-${size}`;

    const existingIdx = cart.findIndex(item => item.cartKey === cartKey || (item.id === product.id && item.selectedColor === color && item.selectedSize === size));
    if (existingIdx > -1) {
      cart[existingIdx].quantity = (cart[existingIdx].quantity || 1) + quantity;
    } else {
      cart.push({
        ...product,
        cartKey,
        selectedColor: color,
        selectedSize: size,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    localStorage.setItem('stitchbeez_cart', JSON.stringify(cart));
    notifyStoreUpdate();
    return cart;
  } catch (e) {
    console.error('Error adding footwear to cart:', e);
    return [];
  }
};

export const toggleFootwearWishlist = (productId) => {
  try {
    const raw = localStorage.getItem('stitchbeez_wishlist');
    let list = raw ? JSON.parse(raw) : [];
    if (list.includes(productId)) {
      list = list.filter(id => id !== productId);
    } else {
      list.push(productId);
    }
    localStorage.setItem('stitchbeez_wishlist', JSON.stringify(list));
    notifyStoreUpdate();
    return list;
  } catch (e) {
    console.error('Error toggling wishlist:', e);
    return [];
  }
};

export const getFootwearWishlist = () => {
  try {
    const raw = localStorage.getItem('stitchbeez_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveCustomFootwearDesign = (designData) => {
  try {
    const raw = localStorage.getItem('stitchbeez_custom_design');
    const existing = raw ? JSON.parse(raw) : [];
    const newDesign = {
      ...designData,
      id: `FTW-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      status: 'Under Review by Master Cordwainer'
    };
    existing.unshift(newDesign);
    localStorage.setItem('stitchbeez_custom_design', JSON.stringify(existing));
    notifyStoreUpdate();
    return newDesign;
  } catch (e) {
    console.error('Error saving custom footwear design:', e);
    return null;
  }
};
