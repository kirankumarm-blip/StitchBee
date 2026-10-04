// StitchBeez Handmade Gifts Central Store & Mock Persistence API
// Synchronizes with localStorage keys: stitchbeez_cart, stitchbeez_wishlist, stitchbeez_orders
// and sessionStorage key: stitchbeez_custom_gift_draft

import { 
  getCart, 
  saveCart, 
  getWishlist, 
  saveWishlist, 
  toggleWishlist as globalToggleWishlist, 
  addOrder as globalAddOrder 
} from './bagsStore';

export const GIFT_CATEGORIES = [
  {
    id: "teddy-bears",
    name: "Handmade Teddy Bears",
    desc: "Soft, cute & customizable",
    img: "/assets/handmade-gifts/handmade_teddy.png",
    action: "Explore →",
    heroText: "Heirloom handcrafted plush teddy bears with safe embroidered details."
  },
  {
    id: "cushion-covers",
    name: "Cushion Covers",
    desc: "Beautiful home décor cushions",
    img: "/assets/handmade-gifts/cushion_covers.png",
    action: "Explore →",
    heroText: "Artisanal hand-embroidered cushion covers on linen, velvet, and organic cotton."
  },
  {
    id: "tote-bags",
    name: "Tote Bags",
    desc: "Stylish stitched bags for everyday",
    img: "/assets/handmade-gifts/tote_bags.png",
    action: "Explore →",
    heroText: "Rugged 14oz canvas and denim everyday totes with personalized embroidery."
  },
  {
    id: "pouches-cosmetic-bags",
    name: "Pouches & Cosmetic Bags",
    desc: "Everyday essentials",
    img: "/assets/handmade-gifts/pouches.png",
    action: "Explore →",
    heroText: "Plush velvet and linen cosmetic pouches with waterproof interior lining."
  },
  {
    id: "personalized-gifts",
    name: "Personalized Gifts",
    desc: "Names, initials & more",
    img: "/assets/handmade-gifts/personalized_gifts.png",
    action: "Explore →",
    heroText: "Make every gift one-of-a-kind with custom stitched names, monograms, and dates."
  },
  {
    id: "baby-gifts",
    name: "Baby Gifts",
    desc: "Gentle stitched essentials",
    img: "/assets/handmade-gifts/baby_gifts.png",
    action: "Explore →",
    heroText: "Ultra-gentle GOTS certified organic muslin bibs, blankets, and keepsake booties."
  },
  {
    id: "kitchen-linen",
    name: "Kitchen Linen",
    desc: "Aprons, napkins & dining linen",
    img: "/assets/handmade-gifts/kitchen_linen.png",
    action: "Explore →",
    heroText: "Pure French flax linen aprons and embroidered dining napkins crafted for a lifetime."
  },
  {
    id: "custom",
    name: "Custom Design",
    desc: "Your design, our craft",
    img: "/assets/handmade-gifts/custom_designs.png",
    action: "Start Designing →",
    isCustom: true,
    heroText: "Bring your dream stitched gift idea to life with master artisan craftsmanship."
  }
];

export const GIFT_FABRICS = [
  {
    id: "cotton",
    name: "Cotton",
    desc: "Soft, breathable natural woven cotton with subtle botanical prints",
    img: "/assets/handmade-gifts/fabrics/cotton.jpg",
    suitableFor: ["teddy-bears", "cushion-covers", "tote-bags", "baby-gifts", "kitchen-linen", "custom"],
    texture: "Soft natural breathable weave"
  },
  {
    id: "linen",
    name: "Linen",
    desc: "Airy texture & natural cooling French flax weave",
    img: "/assets/handmade-gifts/fabrics/linen.jpg",
    suitableFor: ["cushion-covers", "kitchen-linen", "pouches-cosmetic-bags", "custom"],
    texture: "Textured, crisp slub linen"
  },
  {
    id: "canvas",
    name: "Canvas",
    desc: "Heavy-duty 14oz durable duck structure for everyday utility",
    img: "/assets/handmade-gifts/fabrics/canvas.jpg",
    suitableFor: ["tote-bags", "cushion-covers", "pouches-cosmetic-bags", "custom"],
    texture: "Sturdy unwashed cotton duck"
  },
  {
    id: "velvet",
    name: "Velvet",
    desc: "Plush rich depth & ultra-soft tactile warmth",
    img: "/assets/handmade-gifts/fabrics/velvet.jpg",
    suitableFor: ["cushion-covers", "pouches-cosmetic-bags", "personalized-gifts", "custom"],
    texture: "Deep pile luxurious velvet"
  },
  {
    id: "felt",
    name: "Felt",
    desc: "Soft structured craft felt texture for keepsake gifts",
    img: "/assets/handmade-gifts/fabrics/felt.jpg",
    suitableFor: ["teddy-bears", "personalized-gifts", "baby-gifts", "custom"],
    texture: "Dense soft wool-blend felt"
  },
  {
    id: "jute",
    name: "Jute",
    desc: "Earthy organic golden tan rustic texture with eco-fiber strength",
    img: "/assets/handmade-gifts/fabrics/jute.jpg",
    suitableFor: ["tote-bags", "kitchen-linen", "custom"],
    texture: "Golden natural coarse jute"
  },
  {
    id: "denim",
    name: "Denim",
    desc: "Rich indigo cotton twill with contrast artisanal chain stitches",
    img: "/assets/handmade-gifts/fabrics/denim.jpg",
    suitableFor: ["tote-bags", "cushion-covers", "pouches-cosmetic-bags", "custom"],
    texture: "12oz washed indigo twill"
  },
  {
    id: "organic",
    name: "Organic Fabric",
    desc: "100% GOTS certified organic pure combed cotton",
    img: "/assets/handmade-gifts/fabrics/organic.jpg",
    suitableFor: ["baby-gifts", "teddy-bears", "kitchen-linen", "custom"],
    texture: "Hypoallergenic combed organic weave"
  },
  {
    id: "muslin",
    name: "Muslin",
    desc: "Ultra-soft triple-layered featherlight cotton touch",
    img: "/assets/handmade-gifts/fabrics/muslin.jpg",
    suitableFor: ["baby-gifts", "kitchen-linen", "custom"],
    texture: "Cloud-soft layered gauze"
  },
  {
    id: "suede",
    name: "Suede Fabric",
    desc: "Warm caramel faux micro-suede with rich velvety drape",
    img: "/assets/handmade-gifts/fabrics/suede.jpg",
    suitableFor: ["cushion-covers", "pouches-cosmetic-bags", "tote-bags", "custom"],
    texture: "Velvety supple micro-suede"
  }
];

export const THREAD_COLORS = [
  { id: 'gold', name: 'Golden Zari', hex: '#D4AF37' },
  { id: 'rosegold', name: 'Rose Gold Silk', hex: '#B76E79' },
  { id: 'emerald', name: 'Emerald Green', hex: '#1E6F40' },
  { id: 'pink', name: 'Blush Pink', hex: '#FF1678' },
  { id: 'burgundy', name: 'Rich Burgundy', hex: '#800020' },
  { id: 'navy', name: 'Navy Indigo', hex: '#1A2B4C' },
  { id: 'ivory', name: 'Pearl Ivory', hex: '#FDFBF7' },
  { id: 'ebony', name: 'Charcoal Black', hex: '#222222' }
];

export const EMBROIDERY_FONTS = [
  { id: 'cursive', name: 'Elegant Cursive Script', sample: 'Priya' },
  { id: 'sans', name: 'Modern Sans Serif', sample: 'PRIYA' },
  { id: 'heritage', name: 'Heritage Serif', sample: 'Priya' },
  { id: 'monogram', name: 'Artisan Monogram', sample: 'PK' }
];

export const ALL_HANDMADE_GIFTS = [
  {
    id: "prod-classic-teddy",
    slug: "classic-teddy-bear",
    name: "Classic Teddy Bear",
    catId: "teddy-bears",
    category: "Handmade Gifts",
    categorySlug: "teddy-bears",
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 42,
    stock: 15,
    customizable: true,
    personalizable: true,
    img: "/assets/handmade-gifts/classic_teddy_bear.png",
    images: [
      "/assets/handmade-gifts/classic_teddy_bear.png",
      "/assets/handmade-gifts/handmade_teddy.png",
      "/assets/handmade-gifts/create_gift_right_hero.png"
    ],
    colors: [
      { name: "Camel Brown", hex: "#D2B48C", img: "/assets/handmade-gifts/classic_teddy_bear.png" },
      { name: "Blush Pink", hex: "#E8B4B8", img: "/assets/handmade-gifts/classic_teddy_bear.png" },
      { name: "Soft Grey", hex: "#A0A0A0", img: "/assets/handmade-gifts/classic_teddy_bear.png" }
    ],
    selectedColor: "Camel Brown",
    fabric: "Plush Organic Cotton & Soft Wool Blend",
    material: "Plush Organic Cotton & Soft Wool Blend",
    dimensions: "35cm (14 inches) Standing Height",
    weight: "320g",
    features: [
      "100% hypoallergenic natural filling with reinforced lock-stitching",
      "Child-safe hand-embroidered facial features (no plastic beads)",
      "Artisan monogram or custom name embroidered on the left foot paw",
      "Complimentary keepsake cotton dust pouch included"
    ],
    description: "Handcrafted with hypoallergenic plush organic cotton, child-safe embroidered facial features, and reinforced safety stitching. Can be personalized with custom name or birth date embroidered on the left paw.",
    careInfo: "Spot clean with damp cotton cloth. Hand wash gently in lukewarm water with mild detergent if necessary. Air dry flat.",
    tags: ["teddy", "bear", "plush", "baby", "soft toy", "kids", "custom name", "gift"]
  },
  {
    id: "prod-floral-cushion",
    slug: "floral-cushion-cover",
    name: "Floral Cushion Cover",
    catId: "cushion-covers",
    category: "Handmade Gifts",
    categorySlug: "cushion-covers",
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviewCount: 38,
    stock: 24,
    customizable: true,
    personalizable: false,
    img: "/assets/handmade-gifts/floral_cushion_cover.png",
    images: [
      "/assets/handmade-gifts/floral_cushion_cover.png",
      "/assets/handmade-gifts/cushion_covers.png",
      "/assets/handmade-gifts/more_than_gift_lifestyle.png"
    ],
    colors: [
      { name: "Sage Green", hex: "#9CAF88", img: "/assets/handmade-gifts/floral_cushion_cover.png" },
      { name: "Dusty Rose", hex: "#DCAE96", img: "/assets/handmade-gifts/floral_cushion_cover.png" },
      { name: "Cream Floral", hex: "#E8DCC4", img: "/assets/handmade-gifts/floral_cushion_cover.png" }
    ],
    selectedColor: "Sage Green",
    fabric: "100% Pure Slub Linen & Cotton",
    material: "100% Pure Slub Linen & Cotton",
    dimensions: "40cm x 40cm (16 x 16 inches)",
    weight: "210g",
    features: [
      "Hand-embroidered wildflower botanical motifs using pure cotton floss",
      "Concealed Japanese YKK zipper on bottom seam for clean aesthetic",
      "Overlocked interior safety edges prevent fraying across years of washes",
      "Pre-washed natural slub linen ensures zero post-wash shrinkage"
    ],
    description: "Delicately embroidered with wildflowers and botanical motifs using pure cotton threads on natural unbleached slub linen. Concealed Japanese YKK zipper closure and overlocked interior seams.",
    careInfo: "Machine wash on gentle cycle inside out or dry clean. Iron while slightly damp on reverse side.",
    tags: ["cushion", "pillow", "home decor", "linen", "floral", "botanical", "living room"]
  },
  {
    id: "prod-personalized-cushion",
    slug: "personalized-name-cushion",
    name: "Personalized Name Cushion",
    catId: "personalized-gifts",
    category: "Handmade Gifts",
    categorySlug: "personalized-gifts",
    price: 999,
    originalPrice: 1399,
    rating: 5.0,
    reviewCount: 56,
    stock: 18,
    customizable: true,
    personalizable: true,
    img: "/assets/handmade-gifts/personalized_name_cushion.png",
    images: [
      "/assets/handmade-gifts/personalized_name_cushion.png",
      "/assets/handmade-gifts/personalized_gifts.png",
      "/assets/handmade-gifts/create_gift_left_hero.png"
    ],
    colors: [
      { name: "Blush Floral", hex: "#F2C4CE", img: "/assets/handmade-gifts/personalized_name_cushion.png" },
      { name: "Ivory Cream", hex: "#F5EBE6", img: "/assets/handmade-gifts/personalized_name_cushion.png" },
      { name: "Powder Blue", hex: "#B4C6D4", img: "/assets/handmade-gifts/personalized_name_cushion.png" }
    ],
    selectedColor: "Blush Floral",
    fabric: "Heavy Cotton Canvas with Silk Thread Embroidery",
    material: "Heavy Cotton Canvas with Silk Thread Embroidery",
    dimensions: "40cm x 40cm (16 x 16 inches)",
    weight: "240g",
    features: [
      "Custom name or anniversary date hand-stitched in radiant silk embroidery thread",
      "Encircled by a hand-embroidered botanical laurel wreath",
      "Hidden envelope or concealed zipper closure for effortless cushion insertion",
      "Ideal milestone gift for weddings, anniversaries, housewarmings, or newborns"
    ],
    description: "A timeless keepsake featuring your custom name or monogram embroidered in elegant script font with shimmering silk threads, surrounded by delicate hand-stitched floral sprigs.",
    careInfo: "Gentle hand wash recommended to protect delicate raised silk embroidery. Cool iron on reverse side.",
    tags: ["cushion", "personalized", "custom name", "monogram", "wedding gift", "anniversary"]
  },
  {
    id: "prod-embroidered-tote",
    slug: "embroidered-tote-bag",
    name: "Embroidered Tote Bag",
    catId: "tote-bags",
    category: "Handmade Gifts",
    categorySlug: "tote-bags",
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 47,
    stock: 20,
    customizable: true,
    personalizable: true,
    img: "/assets/handmade-gifts/embroidered_tote_bag.png",
    images: [
      "/assets/handmade-gifts/embroidered_tote_bag.png",
      "/assets/handmade-gifts/tote_bags.png",
      "/assets/handmade-gifts/more_than_gift_lifestyle.png"
    ],
    colors: [
      { name: "Natural Tan", hex: "#C49A6C", img: "/assets/handmade-gifts/embroidered_tote_bag.png" },
      { name: "Midnight Navy", hex: "#1E293B", img: "/assets/handmade-gifts/embroidered_tote_bag.png" },
      { name: "Olive Green", hex: "#556B2F", img: "/assets/handmade-gifts/embroidered_tote_bag.png" }
    ],
    selectedColor: "Natural Tan",
    fabric: "14oz Heavy Cotton Duck Canvas",
    material: "14oz Heavy Cotton Duck Canvas",
    dimensions: "38cm x 42cm x 10cm (Handles: 28cm drop)",
    weight: "360g",
    features: [
      "Artisan chain-stitch floral embroidery crafted by master tailors",
      "Reinforced box-x cross stitching at all stress and load points",
      "Interior zippered security pocket and brass swivel key hook",
      "Holds 15-inch laptop, water bottle, books, and everyday essentials comfortably"
    ],
    description: "Built from rugged 14oz unwashed natural canvas with artisanal floral chain-stitching. Features reinforced cross-stitched webbing handles, an interior brass key-clip, and slip pocket for your phone.",
    careInfo: "Spot clean with mild soapy water. Do not tumble dry. Canvas will naturally soften and gain character over time.",
    tags: ["tote", "bag", "canvas", "handbag", "embroidered", "cotton", "market tote", "college"]
  },
  {
    id: "prod-baby-bib",
    slug: "baby-bib-embroidered",
    name: "Baby Bib (Embroidered)",
    catId: "baby-gifts",
    category: "Handmade Gifts",
    categorySlug: "baby-gifts",
    price: 499,
    originalPrice: 699,
    rating: 4.9,
    reviewCount: 31,
    stock: 35,
    customizable: true,
    personalizable: true,
    img: "/assets/handmade-gifts/baby_gifts.png",
    images: [
      "/assets/handmade-gifts/baby_gifts.png",
      "/assets/handmade-gifts/hero_page.png"
    ],
    colors: [
      { name: "Mint Green", hex: "#A8C3B1", img: "/assets/handmade-gifts/baby_gifts.png" },
      { name: "Soft Butter", hex: "#F4E3B2", img: "/assets/handmade-gifts/baby_gifts.png" },
      { name: "Cloud White", hex: "#FAFAFA", img: "/assets/handmade-gifts/baby_gifts.png" }
    ],
    selectedColor: "Mint Green",
    fabric: "Triple-Layer GOTS Certified Organic Muslin",
    material: "Triple-Layer GOTS Certified Organic Muslin",
    dimensions: "Newborn to 24 Months (Dual adjustable snaps)",
    weight: "45g",
    features: [
      "Triple-layer absorbent organic muslin gauze with delicate scalloped edges",
      "Hypoallergenic nickel-free double snap neck closure for growing babies",
      "Gentle non-toxic vegetable dyes safe for infant teething and drool",
      "Optional hand-stitched baby initial monogram on the chest"
    ],
    description: "Super-absorbent, ultra-soft organic muslin that gets softer with every wash. Gentle against delicate infant skin, featuring delicate scalloped edge embroidery and custom monogram options.",
    careInfo: "Machine wash cold with baby-safe detergent. Hang dry or tumble dry low. No bleach.",
    tags: ["baby", "bib", "organic", "muslin", "infant", "newborn", "baby shower", "monogram"]
  },
  {
    id: "prod-cosmetic-pouch",
    slug: "cosmetic-pouch",
    name: "Cosmetic Pouch",
    catId: "pouches-cosmetic-bags",
    category: "Handmade Gifts",
    categorySlug: "pouches-cosmetic-bags",
    price: 799,
    originalPrice: 1099,
    rating: 4.8,
    reviewCount: 29,
    stock: 26,
    customizable: true,
    personalizable: true,
    img: "/assets/handmade-gifts/cosmetic_pouch.png",
    images: [
      "/assets/handmade-gifts/cosmetic_pouch.png",
      "/assets/handmade-gifts/pouches.png"
    ],
    colors: [
      { name: "Caramel Tan", hex: "#B37D4E", img: "/assets/handmade-gifts/cosmetic_pouch.png" },
      { name: "Deep Burgundy", hex: "#6A1B29", img: "/assets/handmade-gifts/cosmetic_pouch.png" },
      { name: "Teal Slate", hex: "#3B7A87", img: "/assets/handmade-gifts/cosmetic_pouch.png" }
    ],
    selectedColor: "Caramel Tan",
    fabric: "Quilted Velvet & Waterproof Lining",
    material: "Quilted Velvet & Waterproof Lining",
    dimensions: "22cm x 14cm x 8cm",
    weight: "140g",
    features: [
      "Luxurious plush chevron-quilted velvet shell with silky touch",
      "Waterproof wipe-clean interior lining protects against spills and leaks",
      "Smooth antique gold zipper with artisanal hand-tied silk thread tassel pull",
      "Structured flat bottom base stands upright on your vanity counter"
    ],
    description: "Luxurious plush quilted velvet exterior with water-resistant interior lining for effortless makeup cleanup. Features antique brass zipper hardware and hand-tied silk tassel.",
    careInfo: "Wipe interior clean with damp cloth. Spot clean velvet exterior with soft brush or dry cloth.",
    tags: ["pouch", "cosmetic", "makeup", "velvet", "travel pouch", "accessories", "quilted"]
  },
  {
    id: "prod-linen-apron",
    slug: "embroidered-kitchen-apron",
    name: "Embroidered Kitchen Apron",
    catId: "kitchen-linen",
    category: "Handmade Gifts",
    categorySlug: "kitchen-linen",
    price: 1199,
    originalPrice: 1499,
    rating: 5.0,
    reviewCount: 22,
    stock: 14,
    customizable: true,
    personalizable: true,
    img: "/assets/handmade-gifts/kitchen_linen.png",
    images: [
      "/assets/handmade-gifts/kitchen_linen.png",
      "/assets/handmade-gifts/bottom_craft.jpg"
    ],
    colors: [
      { name: "Natural Oatmeal", hex: "#D9CBB6", img: "/assets/handmade-gifts/kitchen_linen.png" },
      { name: "Charcoal Slate", hex: "#3E444B", img: "/assets/handmade-gifts/kitchen_linen.png" }
    ],
    selectedColor: "Natural Oatmeal",
    fabric: "100% French Flax Woven Linen",
    material: "100% French Flax Woven Linen",
    dimensions: "85cm length x 70cm width with adjustable cross-back ties",
    weight: "290g",
    features: [
      "Cross-back ergonomic strap design eliminates neck strain during cooking",
      "Deep split kangaroo front pockets hold cooking utensils and phone",
      "Delicate hand-embroidered herb sprigs (Rosemary, Thyme & Lavender)",
      "Heavyweight natural flax softens beautifully with every culinary wash"
    ],
    description: "Cross-back artisan linen apron with deep kangaroo front pockets, reinforced brass grommets, and bespoke floral embroidery along the hem.",
    careInfo: "Machine wash warm on gentle cycle. Tumble dry low or line dry in shade. Iron optional for relaxed rustic look.",
    tags: ["apron", "kitchen", "linen", "cooking", "chef", "dining", "embroidered", "baking"]
  }
];

// Helper to trigger store updates across components
export const notifyStoreUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('stitchbee-store-update'));
    window.dispatchEvent(new Event('storage'));
  }
};

// =========================================================================
// QUERY API
// =========================================================================

export const getHandmadeGifts = () => {
  return ALL_HANDMADE_GIFTS;
};

export const getHandmadeGiftBySlug = (slugOrId) => {
  if (!slugOrId) return ALL_HANDMADE_GIFTS[0];
  return ALL_HANDMADE_GIFTS.find(p => p.slug === slugOrId || p.id === slugOrId) || null;
};

export const getHandmadeGiftsByCategory = (catSlugOrId) => {
  if (!catSlugOrId || catSlugOrId === 'all') return ALL_HANDMADE_GIFTS;
  return ALL_HANDMADE_GIFTS.filter(p => 
    p.catId === catSlugOrId || 
    p.categorySlug === catSlugOrId ||
    (catSlugOrId === 'cushion-covers' && (p.catId === 'cushion-covers' || p.catId === 'personalized-gifts')) ||
    (catSlugOrId === 'personalized-gifts' && p.personalizable)
  );
};

export const getHandmadeGiftCategory = (catSlugOrId) => {
  return GIFT_CATEGORIES.find(c => c.id === catSlugOrId) || {
    id: catSlugOrId,
    name: "Handmade Gifts Collection",
    desc: "Thoughtful gifts, beautifully stitched by master artisans."
  };
};

// =========================================================================
// CART API INTEGRATION (Reuses stitchbeez_cart)
// =========================================================================

export const addHandmadeGiftToCart = (product, selectedColor, personalization = null, quantity = 1) => {
  try {
    const cart = getCart();
    const color = selectedColor || product.selectedColor || product.colors?.[0]?.name || 'Standard';
    const colorObj = product.colors?.find(c => c.name === color);
    const itemImg = colorObj?.img || product.img;

    const cartKey = `${product.id}-${color}-${personalization?.name || 'standard'}`;
    const existingIndex = cart.findIndex(it => 
      (it.cartKey && it.cartKey === cartKey) || 
      (it.id === product.id && it.color === color && (!personalization || it.personalization === personalization?.name))
    );

    let updated;
    if (existingIndex > -1) {
      updated = cart.map((it, idx) => 
        idx === existingIndex ? { ...it, qty: (it.qty || it.quantity || 1) + quantity } : it
      );
    } else {
      updated = [
        ...cart,
        {
          id: product.id,
          productId: product.id,
          cartKey,
          productType: 'handmade-gift',
          category: 'Handmade Gifts',
          name: product.name,
          slug: product.slug,
          price: product.price,
          color,
          img: itemImg,
          image: itemImg,
          material: product.fabric || product.material || 'Artisan Fabric',
          fabric: product.fabric,
          personalization: personalization ? (typeof personalization === 'string' ? personalization : personalization.name || personalization.text || '') : null,
          personalizationDetails: personalization,
          qty: quantity,
          quantity
        }
      ];
    }

    saveCart(updated);
    notifyStoreUpdate();
    return updated;
  } catch (err) {
    console.error('Error adding handmade gift to cart:', err);
    return getCart();
  }
};

// =========================================================================
// DRAFT PERSISTENCE (sessionStorage: stitchbeez_custom_gift_draft)
// =========================================================================

export const DEFAULT_GIFT_DRAFT = {
  step: 1,
  giftType: "Handmade Teddy Bear",
  giftCategory: "teddy-bears",
  designIdea: "",
  referenceImages: [],
  fabric: "Cotton",
  fabricId: "cotton",
  primaryColor: "Camel Brown",
  secondaryColor: "Cream",
  threadColor: "Golden Zari",
  fontStyle: "cursive",
  recipientName: "",
  monogramInitials: "",
  personalizationMessage: "",
  specialDate: "",
  size: "Medium",
  customDimensions: "",
  quantity: 1,
  estimatedPrice: 1499,
  delivery: {
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    pincode: "560078",
    address: "Flat 402, Oakwood Residences, Bannerghatta Main Road",
    city: "Bengaluru",
    state: "Karnataka",
    giftWrap: true,
    giftNote: "Happy Birthday! Wishing you all the love and happiness in the world."
  }
};

export const getGiftDraft = () => {
  try {
    if (typeof window === 'undefined') return DEFAULT_GIFT_DRAFT;
    const raw = sessionStorage.getItem('stitchbeez_custom_gift_draft');
    if (raw) {
      return { ...DEFAULT_GIFT_DRAFT, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn('Error reading gift draft:', e);
  }
  return DEFAULT_GIFT_DRAFT;
};

export const saveGiftDraft = (draft) => {
  try {
    if (typeof window === 'undefined') return;
    // Strip non-serializable properties (e.g. raw File objects)
    const serializable = {
      ...draft,
      referenceImages: (draft.referenceImages || []).map(img => 
        typeof img === 'string' ? img : (img.url || img.preview || '/assets/handmade-gifts/customStudio/sketchRight')
      )
    };
    sessionStorage.setItem('stitchbeez_custom_gift_draft', JSON.stringify(serializable));
  } catch (e) {
    console.warn('Error saving gift draft:', e);
  }
};

export const clearGiftDraft = () => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('stitchbeez_custom_gift_draft');
    }
  } catch (e) {}
};

// =========================================================================
// CUSTOM GIFT ORDER SUBMISSION (Integrates with stitchbeez_orders)
// =========================================================================

export const submitCustomGiftOrder = (draftData) => {
  const customOrderId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const deliveryAddr = draftData.delivery
    ? `${draftData.delivery.name || 'Customer'}, ${draftData.delivery.address || ''}, ${draftData.delivery.city || 'Bengaluru'}, ${draftData.delivery.state || 'Karnataka'} - ${draftData.delivery.pincode || '560078'} (Ph: ${draftData.delivery.phone || ''})`
    : 'Standard Delivery Address';

  const newOrder = {
    id: customOrderId,
    orderId: customOrderId,
    date: dateStr,
    type: 'custom',
    productType: 'handmade-gift',
    category: 'Handmade Gifts',
    title: `Custom ${draftData.giftType || 'Stitched Gift'}`,
    status: 'Quote Requested',
    statusCode: 'quote_requested',
    statusIndex: 0,
    total: draftData.estimatedPrice ? `₹${draftData.estimatedPrice.toLocaleString('en-IN')} (Estimated)` : 'Pending Artisan Assessment',
    price: draftData.estimatedPrice || 1499,
    address: deliveryAddr,
    deliveryMethod: 'Artisan Bespoke Courier (Insured)',
    trackingNumber: `STB-GIFT-${Math.floor(100000 + Math.random() * 900000)}`,
    artisanAssigned: 'Senior Textile Artisan Lakshmi Devi (18 yrs experience)',
    customDetails: {
      giftType: draftData.giftType,
      fabric: draftData.fabric,
      primaryColor: draftData.primaryColor,
      threadColor: draftData.threadColor,
      fontStyle: draftData.fontStyle,
      recipientName: draftData.recipientName,
      monogramInitials: draftData.monogramInitials,
      message: draftData.personalizationMessage,
      specialDate: draftData.specialDate,
      size: draftData.size,
      quantity: draftData.quantity || 1,
      designIdea: draftData.designIdea,
      giftWrap: draftData.delivery?.giftWrap,
      giftNote: draftData.delivery?.giftNote
    },
    items: [
      {
        id: customOrderId,
        name: `Custom ${draftData.giftType}`,
        price: draftData.estimatedPrice || 1499,
        color: draftData.primaryColor || 'Bespoke',
        fabric: draftData.fabric,
        qty: draftData.quantity || 1,
        quantity: draftData.quantity || 1,
        img: draftData.referenceImages?.[0] || '/assets/handmade-gifts/custom_designs.png',
        personalization: draftData.recipientName || draftData.personalizationMessage
      }
    ]
  };

  const created = globalAddOrder(newOrder);
  notifyStoreUpdate();
  clearGiftDraft();
  return created;
};
