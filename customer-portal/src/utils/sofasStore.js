// StitchBeez Sofas & Upholstery Central Store & Mock Persistence API
// Synchronizes with localStorage keys: stitchbeez_cart, stitchbeez_wishlist, stitchbeez_orders
// and sessionStorage key: stitchbeez_sofa_custom_draft

import { 
  getCart, 
  saveCart, 
  getWishlist, 
  saveWishlist, 
  toggleWishlist as globalToggleWishlist, 
  addOrder as globalAddOrder 
} from './bagsStore';

export const SOFA_CATEGORIES = [
  {
    id: "sofa-sets",
    name: "Sofa Sets",
    desc: "2 Seater, 3 Seater, L-Shape & Sectionals",
    img: "/assets/sofas/cat_sofa_sets.png",
    action: "Explore →",
    heroText: "Handcrafted modular and living room sofa sets built with seasoned hardwood frames and resilient comfort padding."
  },
  {
    id: "recliners",
    name: "Recliners",
    desc: "Manual & Motorized Recliners",
    img: "/assets/sofas/cat_recliners.png",
    action: "Explore →",
    heroText: "Ergonomic high-back recliner armchairs and loveseats with multi-angle footrests and lumbar support."
  },
  {
    id: "sofa-cum-beds",
    name: "Sofa Cum Beds",
    desc: "Stylish & space saving",
    img: "/assets/sofas/cat_sofa_cum_beds.png",
    action: "Explore →",
    heroText: "Effortless pull-out and click-clack convertible sofa beds engineered for compact modern living."
  },
  {
    id: "accent-chairs",
    name: "Accent Chairs",
    desc: "Trendy single chairs",
    img: "/assets/sofas/cat_accent_chairs.png",
    action: "Explore →",
    heroText: "Statement armchairs, wingbacks, and fluted cocktail chairs designed to bring personality to any corner."
  },
  {
    id: "poufs-ottomans",
    name: "Poufs & Ottomans",
    desc: "Footrests & movable seating",
    img: "/assets/sofas/cat_poufs_ottomans.png",
    action: "Explore →",
    heroText: "Versatile upholstered footstools, storage benches, and pleated cylindrical poufs."
  },
  {
    id: "dining-chairs",
    name: "Dining Chairs",
    desc: "Comfortable dining seating",
    img: "/assets/sofas/cat_dining_chairs.png",
    action: "Explore →",
    heroText: "Padded dining chairs with ergonomic lumbar contouring and stain-resistant fabric choices."
  },
  {
    id: "custom-design",
    name: "Custom Design",
    desc: "Your idea, our craft",
    img: "/assets/sofas/cat_custom_design.png",
    action: "Start Designing →",
    isCustom: true,
    heroText: "Work with our master upholsterers to build a bespoke sofa matched to your exact room blueprint."
  }
];

export const SOFA_FABRICS = [
  {
    id: "linen",
    name: "Linen",
    desc: "Belgian natural textured flax linen offering relaxed, breathable luxury with tactile slub weave.",
    img: "/assets/sofas/fabrics/linen.jpg",
    softness: "4.5 / 5",
    breathability: "5.0 / 5",
    durability: "4.6 / 5",
    petFriendly: "3.5 / 5",
    stainResistance: "4.0 / 5",
    season: "All-Year Cool & Organic",
    bestFor: "Well-lit living rooms, Scandinavian & Bohemian aesthetics",
    care: "Spot clean with damp cloth and mild upholstery foam shampoo."
  },
  {
    id: "cotton",
    name: "Cotton",
    desc: "Heavyweight 100% natural cotton duck weave providing pure skin comfort and hypoallergenic breathability.",
    img: "/assets/sofas/fabrics/cotton.jpg",
    softness: "4.8 / 5",
    breathability: "5.0 / 5",
    durability: "4.5 / 5",
    petFriendly: "3.8 / 5",
    stainResistance: "3.9 / 5",
    season: "Daily Comfort & Family Friendly",
    bestFor: "Casual dens, apartments, and washable slipcover designs",
    care: "Machine washable in gentle cold cycle or professional steam cleaning."
  },
  {
    id: "velvet",
    name: "Velvet",
    desc: "High-density micro-velvet with an opulent matte sheen, deep rich saturation, and non-crush pile.",
    img: "/assets/sofas/fabrics/velvet.jpg",
    softness: "5.0 / 5",
    breathability: "3.8 / 5",
    durability: "4.9 / 5",
    petFriendly: "4.7 / 5",
    stainResistance: "4.5 / 5",
    season: "Heritage Luxury & Formal Elegance",
    bestFor: "Formal drawing rooms, tufted chesterfields & accent armchairs",
    care: "Gently brush with soft velvet brush in direction of pile. Dry clean recommended."
  },
  {
    id: "suede",
    name: "Suede",
    desc: "Soft brushed micro-suede delivering buttery tactile softness with reinforced anti-tear woven backing.",
    img: "/assets/sofas/fabrics/suede.jpg",
    softness: "4.9 / 5",
    breathability: "4.1 / 5",
    durability: "4.8 / 5",
    petFriendly: "4.5 / 5",
    stainResistance: "4.6 / 5",
    season: "Warm Modern Minimalist",
    bestFor: "Lounge sectionals, recliners, and cozy media rooms",
    care: "Wipe with specialized microfiber cloth. Liquid spills roll off if dabbed immediately."
  },
  {
    id: "leatherette",
    name: "Leatherette",
    desc: "Premium cruelty-free automotive-grade PU leatherette with realistic grain texture and zero peel guarantee.",
    img: "/assets/sofas/fabrics/leatherette.jpg",
    softness: "4.2 / 5",
    breathability: "3.5 / 5",
    durability: "5.0 / 5",
    petFriendly: "4.8 / 5",
    stainResistance: "5.0 / 5",
    season: "Modern Executive & High Traffic",
    bestFor: "Home offices, dining chairs, recliners, and homes with pets",
    care: "Wipe down with a damp cloth and leatherette conditioner once quarterly."
  },
  {
    id: "chenille",
    name: "Chenille",
    desc: "Tufted caterpillar-yarn woven fabric that produces inviting warmth, cloud-like softness, and subtle sheen.",
    img: "/assets/sofas/fabrics/chenille.jpg",
    softness: "5.0 / 5",
    breathability: "4.4 / 5",
    durability: "4.7 / 5",
    petFriendly: "4.0 / 5",
    stainResistance: "4.2 / 5",
    season: "Cozy Winter & Lounging",
    bestFor: "Deep 3-seater family couches and oversized reading nooks",
    care: "Vacuum with soft brush attachment; treat stains with water-based foam."
  },
  {
    id: "tweed",
    name: "Tweed",
    desc: "Multi-tone heathered wool-blend yarn woven in a tailored herringbone structure for mid-century appeal.",
    img: "/assets/sofas/fabrics/tweed.jpg",
    softness: "4.2 / 5",
    breathability: "4.6 / 5",
    durability: "5.0 / 5",
    petFriendly: "4.6 / 5",
    stainResistance: "4.4 / 5",
    season: "Mid-Century Modern Classic",
    bestFor: "Bespoke tuxedo sofas, tailored armchairs and studio lounges",
    care: "Professional upholstery dry clean; vacuum regularly to remove dust."
  },
  {
    id: "jute",
    name: "Jute",
    desc: "Earthy hand-spun natural jute blended with cotton yarn for rugged coastal texture and rustic warmth.",
    img: "/assets/sofas/fabrics/jute.jpg",
    softness: "3.8 / 5",
    breathability: "5.0 / 5",
    durability: "4.8 / 5",
    petFriendly: "3.2 / 5",
    stainResistance: "3.7 / 5",
    season: "Boho Coastal & Rustic Farmhouse",
    bestFor: "Covered patios, sunroom lounges, and accent ottoman poufs",
    care: "Dry brush gently. Keep away from excessive prolonged water soaking."
  },
  {
    id: "water-resistant",
    name: "Water Resistant",
    desc: "Hydrophobic coated performance fabric where liquids bead on contact for effortless 10-second cleanup.",
    img: "/assets/sofas/fabrics/water_resistant.png",
    softness: "4.5 / 5",
    breathability: "4.2 / 5",
    durability: "5.0 / 5",
    petFriendly: "5.0 / 5",
    stainResistance: "5.0 / 5",
    season: "Active Family & Pet Household",
    bestFor: "Sectionals, family sofas prone to snack and drink spills",
    care: "Dab spills with tissue or damp cloth. Coating lasts for 50+ wash cycles."
  },
  {
    id: "easy-clean",
    name: "Easy Clean",
    desc: "Advanced stain-guard molecular barrier that releases ballpoint ink, sauce, and muddy paws with simple water.",
    img: "/assets/sofas/fabrics/easy_clean.jpg",
    softness: "4.7 / 5",
    breathability: "4.5 / 5",
    durability: "5.0 / 5",
    petFriendly: "5.0 / 5",
    stainResistance: "5.0 / 5",
    season: "Zero-Stress Everyday Living",
    bestFor: "Homes with toddlers, creative artists, and energetic pets",
    care: "Spray lightly with water and wipe with clean microfiber cloth."
  }
];

export const ALL_SOFA_PRODUCTS = [
  {
    id: "prod-modern-3-seater",
    name: "Modern 3 Seater Sofa",
    price: 32999,
    originalPrice: 42999,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 128,
    category: "sofa-sets",
    categoryLabel: "Sofa Sets",
    image: "/assets/sofas/prod_modern_3_seater.png",
    gallery: [
      "/assets/sofas/prod_modern_3_seater.png",
      "/assets/sofas/cat_sofa_sets.png",
      "/assets/sofas/lifestyle_banner.png",
      "/assets/sofas/fabrics/linen.jpg"
    ],
    colors: [
      { name: "Charcoal Black", hex: "#2C2C2C" },
      { name: "Rich Espresso Brown", hex: "#4A3525" },
      { name: "Light Dove Grey", hex: "#B8B8B8" },
      { name: "Natural Ivory Cream", hex: "#E8E2D2" }
    ],
    defaultColor: "Natural Ivory Cream",
    defaultSize: "3 Seater (78 in)",
    availableSizes: [
      { name: "2 Seater Compact", dimensions: "58\" W × 34\" D × 32\" H", price: 26999 },
      { name: "3 Seater Standard", dimensions: "78\" W × 34\" D × 32\" H", price: 32999 },
      { name: "3.5 Seater Grand", dimensions: "88\" W × 36\" D × 33\" H", price: 37999 }
    ],
    frameMaterial: "Seasoned Solid Teakwood & Kiln-Dried Pinewood",
    foamDensity: "40D High-Resilience PU Foam with Pocket Spring Core",
    fabricType: "Belgian Natural Flax Linen (Grade A)",
    warranty: "5-Year Structural Frame & 2-Year Foam Sag Warranty",
    deliveryTime: "5 - 7 Business Days (White Glove Assembled)",
    description: "Architectural clean lines meet cloud-like seating depth. Features wide track armrests, reinforced mortise-and-tenon frame joints, and reversible zippered seat cushions.",
    highlights: [
      "Solid seasoned teakwood internal structural frame",
      "Triple-layer high resilience 40-density foam cushioning",
      "Removable washable cushion envelopes with YKK concealed zippers",
      "Reinforced pocket coils prevent sagging for 10+ years",
      "Doorstep fabric swatch verification available upon booking"
    ]
  },
  {
    id: "prod-lshape-sectional",
    name: "L-Shape Sectional Sofa",
    price: 44999,
    originalPrice: 58999,
    discount: "24% OFF",
    rating: 4.8,
    reviewsCount: 94,
    category: "sofa-sets",
    categoryLabel: "Sofa Sets",
    image: "/assets/sofas/prod_lshape_sectional.png",
    gallery: [
      "/assets/sofas/prod_lshape_sectional.png",
      "/assets/sofas/cat_sofa_sets.png",
      "/assets/sofas/lifestyle_banner.png",
      "/assets/sofas/fabrics/chenille.jpg"
    ],
    colors: [
      { name: "Forest Moss Green", hex: "#2D4739" },
      { name: "Tan Desert Camel", hex: "#B37D4E" },
      { name: "Olive Earth", hex: "#556B2F" },
      { name: "Midnight Navy", hex: "#1F2937" }
    ],
    defaultColor: "Forest Moss Green",
    defaultSize: "Right Chaise (102 in)",
    availableSizes: [
      { name: "Left Chaise Sectional", dimensions: "102\" W × 64\" D × 33\" H", price: 44999 },
      { name: "Right Chaise Sectional", dimensions: "102\" W × 64\" D × 33\" H", price: 44999 },
      { name: "Grand U-Shape Sectional", dimensions: "132\" W × 64\" D × 33\" H", price: 62999 }
    ],
    frameMaterial: "Termite-Treated Hardwood with Heavy-Duty Steel Interlocks",
    foamDensity: "45D Ergonomic High Resilient Comfort Foam",
    fabricType: "High-Durability Textured Chenille Jacquard",
    warranty: "7-Year Frame Warranty & 3-Year Suspension Guarantee",
    deliveryTime: "6 - 8 Business Days (Free In-Room Placement)",
    description: "Designed for expansive living spaces and relaxed family lounging. Deep chaise module allows full stretch-out posture with breathable heavy-weave upholstery.",
    highlights: [
      "Modular interlock clips keep chaise and 3-seater securely coupled",
      "Stain-resistant coated chenille weave repels daily tea & juice spills",
      "Ultra-wide 36-inch deep chaise cushion",
      "Includes 4 complimentary matching toss pillows with microfiber filling"
    ]
  },
  {
    id: "prod-recliner",
    name: "Recliner Sofa",
    price: 39999,
    originalPrice: 52000,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 156,
    category: "recliners",
    categoryLabel: "Recliners",
    image: "/assets/sofas/prod_recliner.png",
    gallery: [
      "/assets/sofas/prod_recliner.png",
      "/assets/sofas/cat_recliners.png",
      "/assets/sofas/fabrics/leatherette.jpg"
    ],
    colors: [
      { name: "Oxblood Burgundy", hex: "#4A0E17" },
      { name: "Dark Walnut Brown", hex: "#3E2723" },
      { name: "Deep Teal Ocean", hex: "#004D40" },
      { name: "Warm Almond Cream", hex: "#D7CCC8" }
    ],
    defaultColor: "Dark Walnut Brown",
    defaultSize: "Single Motorized Recliner",
    availableSizes: [
      { name: "Single Manual Recliner", dimensions: "38\" W × 38\" D × 41\" H", price: 29999 },
      { name: "Single Motorized Recliner", dimensions: "38\" W × 38\" D × 41\" H", price: 39999 },
      { name: "2-Seater Dual Recliner", dimensions: "68\" W × 38\" D × 41\" H", price: 59999 }
    ],
    frameMaterial: "German Okin Mechanism & Heavy-Duty Cold-Rolled Carbon Steel Frame",
    foamDensity: "Multi-Zone Body-Contour Memory Foam with Lumbar Padded Pillow",
    fabricType: "Supple Breathable Leatherette (Non-Sweat Micro-Perforated)",
    warranty: "5-Year Motor & Mechanism Warranty, 10-Year Steel Frame",
    deliveryTime: "4 - 6 Business Days",
    description: "Ultimate therapeutic relaxation. Features whisper-quiet motorized reclining with stepless 105° - 165° multi-position locking and built-in USB charging port.",
    highlights: [
      "Whisper-quiet German engineered electric actuator mechanism",
      "Integrated fast USB-A and Type-C charging port on outer arm bezel",
      "Segmented lumbar, neck, and calf contouring for zero-gravity posture",
      "Tested for over 25,000 smooth reclining cycles"
    ]
  },
  {
    id: "prod-sofa-cum-bed",
    name: "Sofa Cum Bed",
    price: 29999,
    originalPrice: 38500,
    discount: "22% OFF",
    rating: 4.7,
    reviewsCount: 88,
    category: "sofa-cum-beds",
    categoryLabel: "Sofa Cum Beds",
    image: "/assets/sofas/prod_sofa_cum_bed.png",
    gallery: [
      "/assets/sofas/prod_sofa_cum_bed.png",
      "/assets/sofas/cat_sofa_cum_beds.png",
      "/assets/sofas/fabrics/water_resistant.png"
    ],
    colors: [
      { name: "Royal Sapphire Blue", hex: "#1E3A8A" },
      { name: "Slate Charcoal", hex: "#374151" },
      { name: "Plum Berry", hex: "#581C87" },
      { name: "Oat Beige", hex: "#D1D5DB" }
    ],
    defaultColor: "Royal Sapphire Blue",
    defaultSize: "Queen Pull-Out (60x78 in)",
    availableSizes: [
      { name: "Single Convertible (36x75 in)", dimensions: "42\" W × 36\" D × 34\" H", price: 21999 },
      { name: "Queen Pull-Out (60x78 in)", dimensions: "66\" W × 38\" D × 34\" H", price: 29999 },
      { name: "King Sectional Bed (72x78 in)", dimensions: "86\" W × 62\" D × 34\" H", price: 39999 }
    ],
    frameMaterial: "Reinforced Anti-Rust Powder Coated Steel Pull-Out Rail System",
    foamDensity: "Dual-Density High Resilient Orthopedic Sleeping Mattress (5-inch)",
    fabricType: "Stain-Shield Woven Performance Linen",
    warranty: "5-Year Metal Mechanism & 3-Year Mattress Core Guarantee",
    deliveryTime: "5 - 7 Business Days",
    description: "Transitions smoothly from a plush daytime 3-seater sofa into a full supportive orthopedic queen mattress in under 5 seconds with zero floor friction.",
    highlights: [
      "Effortless one-hand slide-out track with silent rubberized caster wheels",
      "Hidden under-seat hydraulic storage compartment for pillows and blankets",
      "High resilience 5-inch foam core ensures no spinal sagging during sleep",
      "Breathable anti-dust mite fabric cover"
    ]
  },
  {
    id: "prod-premium-fabric-sofa",
    name: "Premium Fabric Sofa",
    price: 36999,
    originalPrice: 48000,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 112,
    category: "sofa-sets",
    categoryLabel: "Sofa Sets",
    image: "/assets/sofas/prod_premium_fabric_sofa.png",
    gallery: [
      "/assets/sofas/prod_premium_fabric_sofa.png",
      "/assets/sofas/lifestyle_banner.png",
      "/assets/sofas/fabrics/velvet.jpg"
    ],
    colors: [
      { name: "Dusty Rose Pink", hex: "#9E4856" },
      { name: "Desert Khaki", hex: "#BFA588" },
      { name: "Dark Mocha Espresso", hex: "#3A2923" },
      { name: "Pure Ivory White", hex: "#EDE8DF" }
    ],
    defaultColor: "Dusty Rose Pink",
    defaultSize: "3 Seater (82 in)",
    availableSizes: [
      { name: "2 Seater Loveseat", dimensions: "62\" W × 35\" D × 33\" H", price: 29999 },
      { name: "3 Seater Grand", dimensions: "82\" W × 35\" D × 33\" H", price: 36999 },
      { name: "4 Seater Statement", dimensions: "96\" W × 36\" D × 33\" H", price: 43999 }
    ],
    frameMaterial: "Kiln-Dried Hardwood with Natural Teak Fluted Legs",
    foamDensity: "Premium Micro-Velvet over High-Density 42D Resilience Foam",
    fabricType: "Plush High-Density Matte Micro-Velvet",
    warranty: "5-Year Full Coverage & Free 1st Year Restitching Tune-Up",
    deliveryTime: "5 - 7 Business Days",
    description: "An understated luxury showpiece. Features French corded piping, tailored rolled backrests, and custom-turned teakwood legs with brass ferrule shoes.",
    highlights: [
      "Corded piping borders hand-tailored by second-generation artisans",
      "Anti-pile matte velvet resists color fade under direct living room sunlight",
      "Down-alternative feather wrap layer around the foam core for sink-in plushness",
      "Solid brass foot caps protect wood floors and add elegant sparkle"
    ]
  },
  {
    id: "prod-accent-chair",
    name: "Accent Chair",
    price: 16999,
    originalPrice: 22500,
    discount: "24% OFF",
    rating: 4.8,
    reviewsCount: 75,
    category: "accent-chairs",
    categoryLabel: "Accent Chairs",
    image: "/assets/sofas/prod_accent_chair.png",
    gallery: [
      "/assets/sofas/prod_accent_chair.png",
      "/assets/sofas/cat_accent_chairs.png",
      "/assets/sofas/fabrics/velvet.jpg"
    ],
    colors: [
      { name: "Emerald Peacock Green", hex: "#1B4D3E" },
      { name: "Mustard Gold", hex: "#D4AF37" },
      { name: "Rich Royal Plum", hex: "#4A154B" },
      { name: "Terracotta Earth", hex: "#C05638" }
    ],
    defaultColor: "Emerald Peacock Green",
    defaultSize: "Standard Lounge Shell",
    availableSizes: [
      { name: "Standard Lounge Shell", dimensions: "32\" W × 31\" D × 34\" H", price: 16999 },
      { name: "Grand Wingback Lounge", dimensions: "35\" W × 33\" D × 38\" H", price: 19999 }
    ],
    frameMaterial: "Curved Steam-Bent Plywood with Reinforced Electroplated Gold Steel Legs",
    foamDensity: "Molded Ergonomic Cold-Cure Foam Core",
    fabricType: "Silky Fluted Micro-Velvet",
    warranty: "3-Year Structural Warranty",
    deliveryTime: "3 - 5 Business Days",
    description: "Scalloped shell-back design inspired by Art Deco glamour. Vertical channel fluting cradles the back for effortless reading and cocktail hour conversations.",
    highlights: [
      "Distinctive scalloped shell silhouette with handcrafted channel quilting",
      "Sleek tapered electroplated gold metallic legs with self-leveling feet",
      "Compact footprint ideal for bedroom vanity, reading nooks, or salon corners",
      "Arrives fully assembled out of the box"
    ]
  }
];

export const SOFA_REVIEWS = [
  {
    id: "rev-1",
    author: "Shalini Mehra",
    city: "Bengaluru, Indiranagar",
    rating: 5,
    date: "2 days ago",
    verified: true,
    product: "Modern 3 Seater Sofa",
    text: "The linen fabric quality is beyond comparison! StitchBeez sent an artisan home with swatches before crafting. Seating depth is super comfortable for tall family members.",
    photos: ["/assets/sofas/prod_modern_3_seater.png"]
  },
  {
    id: "rev-2",
    author: "Kavita & Ritesh Deshmukh",
    city: "Mumbai, Bandra West",
    rating: 5,
    date: "1 week ago",
    verified: true,
    product: "L-Shape Sectional Sofa",
    text: "We ordered the Forest Green sectional in textured chenille. It arrived in perfect white-glove packaging. Our living room feels like a 5-star boutique hotel lounge!",
    photos: ["/assets/sofas/prod_lshape_sectional.png"]
  },
  {
    id: "rev-3",
    author: "Arjun Nambiar",
    city: "Hyderabad, Jubilee Hills",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    product: "Recliner Sofa",
    text: "The motorized whisper recline is extraordinarily smooth. The leatherette looks and smells top-tier without sweating. The built-in USB port is extremely handy.",
    photos: ["/assets/sofas/prod_recliner.png"]
  }
];

export const SOFA_SPECIALISTS = [
  {
    id: "spec-1",
    name: "Master Rafiq Ahmed",
    experience: "24 Years Experience",
    specialty: "Hardwood Frames, Tufting & Velvet Restoration",
    rating: 4.95,
    reviews: 218,
    location: "Koramangala Atelier, Bengaluru",
    distance: "2.4 km away",
    badge: "Master Upholsterer",
    avatar: "/assets/sofas/how_it_works.png"
  },
  {
    id: "spec-2",
    name: "Gurpreet Singh & Sons",
    experience: "19 Years Experience",
    specialty: "Sectionals, Orthopedic Foam & Scratch-Proof Fabrics",
    rating: 4.9,
    reviews: 184,
    location: "Indiranagar Craft Studio, Bengaluru",
    distance: "3.8 km away",
    badge: "Sectional Specialist",
    avatar: "/assets/sofas/how_it_works.png"
  },
  {
    id: "spec-3",
    name: "Lakshmi Upholstery Works",
    experience: "16 Years Experience",
    specialty: "Natural Flax Linen, Jute Slubs & Slipcover Tailoring",
    rating: 4.88,
    reviews: 142,
    location: "HSR Layout Studio, Bengaluru",
    distance: "4.5 km away",
    badge: "Linen & Slipcovers",
    avatar: "/assets/sofas/how_it_works.png"
  }
];

// Helper functions for Cart, Wishlist, Orders

export const getSofaWishlist = () => {
  return getWishlist();
};

export const toggleSofaWishlist = (productId) => {
  return globalToggleWishlist(productId);
};

export const isSofaInWishlist = (productId) => {
  const list = getWishlist();
  return list.includes(productId);
};

export const addSofaToCart = (item) => {
  const cart = getCart();
  const existingIndex = cart.findIndex(c => 
    c.id === item.id && 
    c.selectedColor === item.selectedColor && 
    c.selectedSize === item.selectedSize
  );

  let updated;
  if (existingIndex > -1) {
    updated = [...cart];
    updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + (item.quantity || 1);
  } else {
    updated = [
      ...cart,
      {
        ...item,
        quantity: item.quantity || 1,
        addedAt: new Date().toISOString()
      }
    ];
  }
  saveCart(updated);
  return updated;
};

export const getCustomSofaDraft = () => {
  try {
    const raw = sessionStorage.getItem('stitchbeez_sofa_custom_draft');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const saveCustomSofaDraft = (draft) => {
  try {
    sessionStorage.setItem('stitchbeez_sofa_custom_draft', JSON.stringify(draft));
  } catch (e) {
    console.error(e);
  }
};

export const clearCustomSofaDraft = () => {
  try {
    sessionStorage.removeItem('stitchbeez_sofa_custom_draft');
  } catch (e) {
    console.error(e);
  }
};

export const getSofaProductById = (identifier) => {
  if (!identifier) return ALL_SOFA_PRODUCTS[0];
  const cleanId = String(identifier).toLowerCase();
  return ALL_SOFA_PRODUCTS.find(p => 
    p.id.toLowerCase() === cleanId || 
    p.name.toLowerCase().replace(/\s+/g, '-') === cleanId ||
    p.id.toLowerCase().replace('prod-', '') === cleanId
  ) || ALL_SOFA_PRODUCTS[0];
};

export const getSofaCategoryById = (identifier) => {
  if (!identifier) return SOFA_CATEGORIES[0];
  const cleanId = String(identifier).toLowerCase();
  return SOFA_CATEGORIES.find(c => 
    c.id.toLowerCase() === cleanId || 
    c.name.toLowerCase().replace(/\s+/g, '-') === cleanId
  ) || SOFA_CATEGORIES[0];
};

export const getSofaProductsByCategory = (identifier) => {
  if (!identifier || identifier === 'all') return ALL_SOFA_PRODUCTS;
  const cleanId = String(identifier).toLowerCase();
  const filtered = ALL_SOFA_PRODUCTS.filter(p => 
    p.category.toLowerCase() === cleanId ||
    p.categoryLabel.toLowerCase().replace(/\s+/g, '-') === cleanId
  );
  return filtered.length > 0 ? filtered : ALL_SOFA_PRODUCTS;
};


