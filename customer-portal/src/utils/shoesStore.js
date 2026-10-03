// StitchBee Shoes & Footwear Store & Mock Persistence API
// Synchronizes with localStorage keys: stitchbeez_cart, stitchbeez_wishlist, stitchbeez_custom_design, stitchbeez_shoe_reviews

export const SHOE_CATEGORIES = [
  { id: 'all', label: 'All Footwear', singular: 'Footwear' },
  { id: 'mens', label: "Men's Shoes", singular: "Men's Shoes", sub: 'Formal, casual & leather shoes', img: '/shoes_categories/MensShoe.png', action: 'Explore →' },
  { id: 'womens', label: "Women's Shoes", singular: "Women's Shoes", sub: 'Heels, flats & trendy footwear', img: '/shoes_categories/WomensShoes.png', action: 'Explore →' },
  { id: 'sneakers', label: 'Sneakers', singular: 'Sneakers', sub: 'Sports, casual & lifestyle sneakers', img: '/shoes_categories/Sneakers.png', action: 'Explore →' },
  { id: 'sandals', label: 'Sandals', singular: 'Sandals', sub: 'Leather sandals & everyday footwear', img: '/shoes_categories/Sandals.png', action: 'Explore →' },
  { id: 'slippers', label: 'Slippers', singular: 'Slippers', sub: 'Comfort slippers & home footwear', img: '/shoes_categories/Slippers.png', action: 'Explore →' },
  { id: 'boots', label: 'Boots', singular: 'Boots', sub: 'Ankle & premium boots', img: '/shoes_categories/Boots.png', action: 'Explore →' },
  { id: 'custom', label: 'Custom Design', singular: 'Custom Design', sub: 'Your design, our craft', img: '/shoes_categories/CustomDesigns.png', action: 'Start Designing →', isCustom: true }
];

export const ALL_SHOE_PRODUCTS = [
  {
    id: 'shoe-1',
    name: 'Classic Leather Formal Shoes',
    slug: 'classic-leather-formal-shoes',
    category: 'mens',
    gender: 'Men',
    price: 3999,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 48,
    stock: 12,
    customizable: true,
    img: '/premium_footwear/ClassicLeatherFormalShoe.png',
    images: [
      '/premium_footwear/ClassicLeatherFormalShoe.png',
      '/shoes_categories/MensShoe.png',
      '/shoes_categories/HeroSection.png'
    ],
    colors: [
      { name: 'Chestnut Tan', hex: '#8c6239', img: '/premium_footwear/ClassicLeatherFormalShoe.png' },
      { name: 'Onyx Black', hex: '#18181b', img: '/premium_footwear/ClassicLeatherFormalShoe.png' },
      { name: 'Deep Burgundy', hex: '#6b3b24', img: '/premium_footwear/ClassicLeatherFormalShoe.png' }
    ],
    selectedColor: 'Chestnut Tan',
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
    description: 'A timeless silhouette meticulously handcrafted from full-grain Italian calfskin. Hand-burnished by master cordwainers to achieve rich depth of color, with Goodyear welted leather outsoles engineered for a lifetime of distinguished wear.',
    tags: ['formal', 'shoes', 'leather', 'brown', 'oxford', 'brogue', 'derby', 'mens', 'handcrafted']
  },
  {
    id: 'shoe-2',
    name: 'Urban Sneakers',
    slug: 'urban-sneakers',
    category: 'sneakers',
    gender: 'Unisex',
    price: 2499,
    originalPrice: 3199,
    rating: 4.8,
    reviewCount: 64,
    stock: 22,
    customizable: true,
    img: '/premium_footwear/UrbanSneakers.png',
    images: [
      '/premium_footwear/UrbanSneakers.png',
      '/shoes_categories/Sneakers.png',
      '/shoes_categories/HeroSection.png'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#d8b898', img: '/premium_footwear/UrbanSneakers.png' },
      { name: 'Onyx Black', hex: '#18181b', img: '/premium_footwear/UrbanSneakers.png' },
      { name: 'Camel Tan', hex: '#c49a6c', img: '/premium_footwear/UrbanSneakers.png' }
    ],
    selectedColor: 'Warm Cream',
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
    description: 'Clean, architectural, and effortlessly versatile. Handcrafted from premium buttery nappa leather that breaks in naturally. Seamlessly bridges boardroom casual and weekend leisure with maximum support.',
    tags: ['sneakers', 'urban', 'casual', 'white', 'leather', 'cream', 'minimalist', 'sports']
  },
  {
    id: 'shoe-3',
    name: 'Leather Loafers',
    slug: 'leather-loafers',
    category: 'mens',
    gender: 'Men',
    price: 3499,
    originalPrice: 4299,
    rating: 4.9,
    reviewCount: 39,
    stock: 15,
    customizable: true,
    img: '/premium_footwear/LeatherLoafers.png',
    images: [
      '/premium_footwear/LeatherLoafers.png',
      '/shoes_categories/MensShoe.png',
      '/shoes_categories/HeroSection.png'
    ],
    colors: [
      { name: 'Caramel Tan', hex: '#9a724c', img: '/premium_footwear/LeatherLoafers.png' },
      { name: 'Espresso Black', hex: '#1c1917', img: '/premium_footwear/LeatherLoafers.png' },
      { name: 'Golden Honey', hex: '#cba382', img: '/premium_footwear/LeatherLoafers.png' }
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
    description: 'The epitome of Italian sprezzatura. Expertly shaped with a hand-stitched apron and penny saddle, crafted from supple pebble-grain leather that requires zero break-in period.',
    tags: ['loafers', 'mens', 'leather', 'slip-on', 'brown', 'caramel', 'casual', 'formal']
  },
  {
    id: 'shoe-4',
    name: 'Sport Sneakers',
    slug: 'sport-sneakers',
    category: 'sneakers',
    gender: 'Unisex',
    price: 2999,
    originalPrice: 3699,
    rating: 4.7,
    reviewCount: 52,
    stock: 18,
    customizable: true,
    img: '/premium_footwear/SportsSneakers.png',
    images: [
      '/premium_footwear/SportsSneakers.png',
      '/shoes_categories/Sneakers.png',
      '/shoes_categories/HeroSection.png'
    ],
    colors: [
      { name: 'Earth Olive', hex: '#78644f', img: '/premium_footwear/SportsSneakers.png' },
      { name: 'Midnight Black', hex: '#18181b', img: '/premium_footwear/SportsSneakers.png' },
      { name: 'Sand Nude', hex: '#ede3d4', img: '/premium_footwear/SportsSneakers.png' }
    ],
    selectedColor: 'Earth Olive',
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
    description: 'High-performance comfort meets artisanal design. Constructed with breathable technical sports mesh and plush split-suede paneling atop a responsive dual-density cushioning platform.',
    tags: ['sport', 'sneakers', 'running', 'trainer', 'breathable', 'mesh', 'olive', 'comfort']
  },
  {
    id: 'shoe-5',
    name: 'Leather Sandals',
    slug: 'leather-sandals',
    category: 'sandals',
    gender: 'Unisex',
    price: 2499,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 31,
    stock: 20,
    customizable: true,
    img: '/premium_footwear/LeatherSandals.png',
    images: [
      '/premium_footwear/LeatherSandals.png',
      '/shoes_categories/Sandals.png',
      '/shoes_categories/HeroSection.png'
    ],
    colors: [
      { name: 'Artisan Tan', hex: '#9c7350', img: '/premium_footwear/LeatherSandals.png' },
      { name: 'Charcoal Black', hex: '#1c1917', img: '/premium_footwear/LeatherSandals.png' },
      { name: 'Saddle Umber', hex: '#c69265', img: '/premium_footwear/LeatherSandals.png' }
    ],
    selectedColor: 'Artisan Tan',
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
    description: 'Handcrafted artisan gladiator and fisherman-inspired leather sandals. Built with full-grain vegetable tanned straps that soften and develop unique patina with sun and wear.',
    tags: ['sandals', 'leather', 'tan', 'summer', 'artisan', 'casual', 'gladiator', 'fisherman']
  },
  {
    id: 'shoe-6',
    name: 'Elegant Women Heels',
    slug: 'elegant-women-heels',
    category: 'womens',
    gender: 'Women',
    price: 3999,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 45,
    stock: 14,
    customizable: true,
    img: '/premium_footwear/WomenHeels.png',
    images: [
      '/premium_footwear/WomenHeels.png',
      '/shoes_categories/WomensShoes.png',
      '/shoes_categories/HeroSection.png'
    ],
    colors: [
      { name: 'Blush Nude', hex: '#bda087', img: '/premium_footwear/WomenHeels.png' },
      { name: 'Classic Black', hex: '#18181b', img: '/premium_footwear/WomenHeels.png' },
      { name: 'Champagne Cream', hex: '#f4ebd9', img: '/premium_footwear/WomenHeels.png' }
    ],
    selectedColor: 'Blush Nude',
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
    description: 'Sculptural elegance engineered for real wearability. Features a precisely balanced center of gravity, targeted metatarsal padding, and radiant Italian mirror patent leather.',
    tags: ['heels', 'womens', 'stiletto', 'party', 'formal', 'nude', 'black', 'patent', 'luxury']
  },
  {
    id: 'shoe-7',
    name: 'Luxury Shearling Slipper Mule',
    slug: 'luxury-shearling-slipper-mule',
    category: 'slippers',
    gender: 'Unisex',
    price: 2199,
    originalPrice: 2799,
    rating: 4.8,
    reviewCount: 38,
    stock: 25,
    customizable: true,
    img: '/shoes_categories/Slippers.png',
    images: [
      '/shoes_categories/Slippers.png',
      '/shoes_categories/HeroSection.png'
    ],
    colors: [
      { name: 'Almond Tan', hex: '#c59b6d', img: '/shoes_categories/Slippers.png' },
      { name: 'Charcoal Grey', hex: '#2d3748', img: '/shoes_categories/Slippers.png' },
      { name: 'Soft Cream', hex: '#f5efe6', img: '/shoes_categories/Slippers.png' }
    ],
    selectedColor: 'Almond Tan',
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    selectedSize: 'UK 8',
    material: 'Plush Australian Shearling & Velvety Suede',
    soleType: 'Flexible Indoor-Outdoor Anti-Skid Rubber Sole',
    weight: '240g (per shoe)',
    features: [
      'Genuine Australian shearling lining regulating natural foot temperature',
      'Memory foam pressure-relief footbed',
      'Water-repellent scotchgard treated outer suede',
      'Non-marking silent rubber outsole'
    ],
    description: 'Wrap your feet in cloud-like warmth and unmatched comfort. Handcrafted with genuine plush shearling and water-repellent suede upper on an indoor-outdoor sole.',
    tags: ['slippers', 'mules', 'comfort', 'shearling', 'warm', 'suede', 'home', 'casual']
  },
  {
    id: 'shoe-8',
    name: 'Heritage Chelsea Leather Boots',
    slug: 'heritage-chelsea-leather-boots',
    category: 'boots',
    gender: 'Unisex',
    price: 4499,
    originalPrice: 5699,
    rating: 4.9,
    reviewCount: 42,
    stock: 16,
    customizable: true,
    img: '/shoes_categories/Boots.png',
    images: [
      '/shoes_categories/Boots.png',
      '/shoes_categories/HeroSection.png'
    ],
    colors: [
      { name: 'Vintage Mahogany', hex: '#4a2511', img: '/shoes_categories/Boots.png' },
      { name: 'Midnight Black', hex: '#18181b', img: '/shoes_categories/Boots.png' },
      { name: 'Waxed Tan', hex: '#945b34', img: '/shoes_categories/Boots.png' }
    ],
    selectedColor: 'Vintage Mahogany',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    selectedSize: 'UK 8',
    material: 'Full-Grain Oil-Tanned Pull-Up Leather',
    soleType: 'Goodyear Commando Lugged Rubber Sole',
    weight: '560g (per shoe)',
    features: [
      'Heavy-duty storm welt water-resistant construction',
      'Reinforced woven elastic twin side gussets',
      'Dual woven pull loops for easy slip-on',
      'Deep-tread oil-resistant commando rubber sole'
    ],
    description: 'A rugged British icon redesigned for modern all-weather city expeditions. Cut from thick oil-tanned pull-up leather that develops rich vintage character with every mile.',
    tags: ['boots', 'chelsea', 'leather', 'brown', 'rugged', 'waterproof', 'goodyear', 'outdoor']
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
    careInfo: 'Clean with damp cloth. Condition with natural beeswax shoe cream every 4–6 months.',
    availableColors: ['Cognac Tan', 'Midnight Black', 'Rich Walnut', 'Deep Burgundy', 'Espresso']
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
    careInfo: 'Brush with a brass or crepe suede brush. Treat with waterproof suede protector spray.',
    availableColors: ['Warm Sand', 'Earth Olive', 'Charcoal Grey', 'Chocolate Brown', 'Navy Blue']
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
    careInfo: 'Use specialized delicate leather lotion. Keep away from prolonged intense direct heat.',
    availableColors: ['Warm Cream', 'Jet Black', 'Camel Tan', 'Powder White', 'Dusty Rose']
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
    careInfo: 'Scratches buff out easily with finger friction or warm horsehair brush buffing.',
    availableColors: ['Distressed Whiskey', 'Mahogany', 'Vintage Black', 'Dark Amber']
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
    careInfo: 'Spot clean with mild soap and cold water. Spot wax every year for water resistance.',
    availableColors: ['Off-White Ecru', 'Military Olive', 'Washed Indigo', 'Pitch Black', 'Khaki Sand']
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
    careInfo: 'Hand wash gently with cool water and sneaker foam cleaner. Air dry in shade.',
    availableColors: ['Triple Black', 'Glacier White', 'Neon Amber', 'Slate Grey']
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
    careInfo: 'Wipe with damp microfiber cloth. No conditioning creams needed.',
    availableColors: ['Pure White', 'Matte Black', 'Chestnut Brown', 'Sage Green']
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
    careInfo: 'Wash out dirt and mud with water and stiff nylon brush. Wipe clean.',
    availableColors: ['Raw Gum Crepe', 'Solid Black', 'Honey Amber', 'Translucent Ice']
  }
];

export const SHOE_REVIEWS = [
  {
    id: 'rev-1',
    productId: 'shoe-1',
    productName: 'Classic Leather Formal Shoes',
    name: 'Priya S.',
    location: 'Bandra West, Mumbai',
    rating: 5,
    date: '2 weeks ago',
    quote: "Ordered bespoke Oxford brogues for my husband's 30th birthday. The custom monogram and calfskin finish blew us away. Fit is like a second skin!",
    itemImg: '/premium_footwear/ClassicLeatherFormalShoe.png',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    productId: 'shoe-2',
    productName: 'Urban Sneakers',
    name: 'Rahul K.',
    location: 'Indiranagar, Bengaluru',
    rating: 5,
    date: '1 month ago',
    quote: 'The urban sneakers in Italian nappa leather are more comfortable than my running shoes. Handcrafted quality that turns heads at work and on flights.',
    itemImg: '/premium_footwear/UrbanSneakers.png',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    productId: 'shoe-6',
    productName: 'Elegant Women Heels',
    name: 'Meera R.',
    location: 'Greater Kailash, Delhi',
    rating: 5,
    date: '3 weeks ago',
    quote: 'Created custom blush nude stiletto heels for my wedding reception. StitchBeez artisans sent sketches and 3D preview before crafting. Absolute perfection!',
    itemImg: '/premium_footwear/WomenHeels.png',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-4',
    productId: 'shoe-3',
    productName: 'Leather Loafers',
    name: 'Arjun M.',
    location: 'Jubilee Hills, Hyderabad',
    rating: 5,
    date: '3 days ago',
    quote: 'The hand-stitched penny saddle and pebble grain cowhide are top tier. Wore them for 10 hours straight out of the box with zero blisters.',
    itemImg: '/premium_footwear/LeatherLoafers.png',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-5',
    productId: 'shoe-5',
    productName: 'Leather Sandals',
    name: 'Sneha P.',
    location: 'Koramangala, Bengaluru',
    rating: 5,
    date: 'Just now',
    quote: 'The vegetable-tanned straps have such a gorgeous patina and the contoured cork footbed provides exceptional arch support during long walks.',
    itemImg: '/premium_footwear/LeatherSandals.png',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  }
];

// Helper to trigger header cart/wishlist sync across all views
export const notifyStoreUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('stitchbee-store-update'));
    window.dispatchEvent(new Event('storage'));
  }
};

// =========================================================================
// API & SERVICE FUNCTIONS (Requirement 25)
// =========================================================================

export const getFootwearProducts = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...ALL_SHOE_PRODUCTS];
      if (filters.category && filters.category !== 'all') {
        results = results.filter(p => p.category === filters.category);
      }
      if (filters.gender && filters.gender !== 'all') {
        results = results.filter(p => p.gender.toLowerCase() === filters.gender.toLowerCase() || p.gender === 'Unisex');
      }
      if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        results = results.filter(p => 
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
          (p.colors && p.colors.some(c => c.name.toLowerCase().includes(q)))
        );
      }
      resolve(results);
    }, 150);
  });
};

export const getFootwearByCategory = (category) => {
  if (!category || category === 'all') return ALL_SHOE_PRODUCTS;
  return ALL_SHOE_PRODUCTS.filter(p => p.category === category);
};

export const getFootwearProduct = (idOrSlug) => {
  return ALL_SHOE_PRODUCTS.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
};

export const getFootwearProductBySlug = (slug) => {
  return ALL_SHOE_PRODUCTS.find(p => p.slug === slug || p.id === slug) || null;
};

export const searchFootwear = (query) => {
  if (!query || !query.trim()) return ALL_SHOE_PRODUCTS;
  const q = query.toLowerCase().trim();
  return ALL_SHOE_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.material.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
    (p.colors && p.colors.some(c => c.name.toLowerCase().includes(q)))
  );
};

export const getMaterials = () => {
  return SHOE_MATERIALS;
};

// =========================================================================
// CART API (stitchbeez_cart)
// =========================================================================

export const getFootwearCart = () => {
  try {
    const raw = localStorage.getItem('stitchbeez_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
  try {
    const cart = getFootwearCart();
    const color = selectedColor || product.selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    const size = selectedSize || product.selectedSize || 'UK 8';
    const cartKey = `${product.id}-${color}-${size}`;
    const colorObj = product.colors?.find(c => c.name === color);
    const itemImg = colorObj?.img || product.img;

    const existingIdx = cart.findIndex(item => item.cartKey === cartKey || (item.productId === product.id && item.color === color && item.size === size));
    if (existingIdx > -1) {
      const newQty = (cart[existingIdx].quantity || cart[existingIdx].qty || 1) + quantity;
      cart[existingIdx].quantity = newQty;
      cart[existingIdx].qty = newQty;
    } else {
      cart.push({
        productId: product.id,
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: itemImg,
        img: itemImg,
        category: product.category,
        size: size,
        color: color,
        quantity: quantity,
        qty: quantity,
        price: product.price,
        originalPrice: product.originalPrice,
        material: product.material,
        cartKey: cartKey,
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

export const addFootwearToCart = addToCart;

export const removeFromCart = (cartKeyOrId) => {
  try {
    const cart = getFootwearCart();
    const updated = cart.filter(item => item.cartKey !== cartKeyOrId && item.id !== cartKeyOrId && item.productId !== cartKeyOrId);
    localStorage.setItem('stitchbeez_cart', JSON.stringify(updated));
    notifyStoreUpdate();
    return updated;
  } catch (e) {
    console.error('Error removing from cart:', e);
    return [];
  }
};

export const updateCartQuantity = (cartKeyOrId, quantity) => {
  try {
    const cart = getFootwearCart();
    const idx = cart.findIndex(item => item.cartKey === cartKeyOrId || item.id === cartKeyOrId || item.productId === cartKeyOrId);
    if (idx > -1) {
      if (quantity <= 0) {
        cart.splice(idx, 1);
      } else {
        cart[idx].quantity = quantity;
        cart[idx].qty = quantity;
      }
      localStorage.setItem('stitchbeez_cart', JSON.stringify(cart));
      notifyStoreUpdate();
    }
    return cart;
  } catch (e) {
    console.error('Error updating cart quantity:', e);
    return [];
  }
};

export const getCartTotals = (cartItems) => {
  const items = cartItems || getFootwearCart();
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryCharge = subtotal > 1999 || subtotal === 0 ? 0 : 99;
  const discount = 0;
  const total = subtotal + deliveryCharge - discount;
  return { subtotal, deliveryCharge, discount, total };
};

// =========================================================================
// WISHLIST API (stitchbeez_wishlist)
// =========================================================================

export const getWishlist = () => {
  try {
    const raw = localStorage.getItem('stitchbeez_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const getFootwearWishlist = getWishlist;

export const toggleWishlist = (productId) => {
  try {
    const raw = localStorage.getItem('stitchbeez_wishlist');
    let list = raw ? JSON.parse(raw) : [];
    const isAdded = !list.includes(productId);
    if (list.includes(productId)) {
      list = list.filter(id => id !== productId);
    } else {
      list.push(productId);
    }
    localStorage.setItem('stitchbeez_wishlist', JSON.stringify(list));
    notifyStoreUpdate();
    return { list, isAdded };
  } catch (e) {
    console.error('Error toggling wishlist:', e);
    return { list: [], isAdded: false };
  }
};

export const toggleFootwearWishlist = (productId) => {
  const res = toggleWishlist(productId);
  return res.list;
};

// =========================================================================
// CUSTOM DESIGN REQUEST API (stitchbeez_custom_design)
// =========================================================================

export const createCustomFootwearRequest = (requestData) => {
  try {
    const raw = localStorage.getItem('stitchbeez_custom_design');
    const existing = raw ? JSON.parse(raw) : [];
    const newRequest = {
      requestId: `FTW-REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      id: `FTW-REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerId: requestData.customerId || 'guest',
      footwearType: requestData.footwearType || 'Custom Footwear',
      referenceImages: requestData.referenceImages || [],
      material: requestData.material || 'Full Grain Leather',
      colors: requestData.colors || { main: 'Cognac Tan' },
      size: requestData.size || 'UK 8',
      customization: requestData.customization || {},
      notes: requestData.notes || '',
      status: 'Quote Requested',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    existing.unshift(newRequest);
    localStorage.setItem('stitchbeez_custom_design', JSON.stringify(existing));
    notifyStoreUpdate();
    return newRequest;
  } catch (e) {
    console.error('Error creating custom footwear request:', e);
    return null;
  }
};

export const saveCustomFootwearDesign = createCustomFootwearRequest;

export const getCustomFootwearRequest = (id) => {
  try {
    const raw = localStorage.getItem('stitchbeez_custom_design');
    const existing = raw ? JSON.parse(raw) : [];
    return existing.find(r => r.requestId === id || r.id === id) || null;
  } catch (e) {
    return null;
  }
};

export const getCustomFootwearRequests = () => {
  try {
    const raw = localStorage.getItem('stitchbeez_custom_design');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

// =========================================================================
// REVIEWS API (stitchbeez_shoe_reviews)
// =========================================================================

export const getProductReviews = (productId) => {
  try {
    const raw = localStorage.getItem('stitchbeez_shoe_reviews');
    const userReviews = raw ? JSON.parse(raw) : [];
    const all = [...userReviews, ...SHOE_REVIEWS];
    if (productId && productId !== 'all') {
      return all.filter(r => r.productId === productId);
    }
    return all;
  } catch (e) {
    return SHOE_REVIEWS;
  }
};

export const submitReview = (productId, reviewData) => {
  try {
    const raw = localStorage.getItem('stitchbeez_shoe_reviews');
    const existing = raw ? JSON.parse(raw) : [];
    const newRev = {
      id: `rev-user-${Date.now()}`,
      productId: productId || 'shoe-1',
      productName: reviewData.productName || 'Bespoke Footwear',
      name: reviewData.name || 'Verified Buyer',
      location: reviewData.location || 'India',
      rating: reviewData.rating || 5,
      date: 'Just now',
      quote: reviewData.quote || '',
      itemImg: reviewData.itemImg || '/premium_footwear/ClassicLeatherFormalShoe.png',
      verified: true,
      avatar: reviewData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      createdAt: new Date().toISOString()
    };
    existing.unshift(newRev);
    localStorage.setItem('stitchbeez_shoe_reviews', JSON.stringify(existing));
    notifyStoreUpdate();
    return newRev;
  } catch (e) {
    console.error('Error submitting review:', e);
    return null;
  }
};
