// STITCHBEEZ KIDS SHOP & CREATE CENTRAL STORE
// Data models, local persistence, catalog products, fabrics, categories, and custom design workflow state.

import { 
  getCart, 
  saveCart, 
  getWishlist, 
  saveWishlist,
  addOrder as globalAddOrder
} from './bagsStore';

// 1. EXACT ASSETS (Matching Desktop/kidsShop folder copied to public/images/kidsShop)
export const KIDS_SHOP_ASSETS = {
  hero: "/images/kidsShop/HERO.png",
  customStudio: "/images/kidsShop/Design Your Childs Dream Outfit Image.png",
  howItWorks: "/images/kidsShop/From Idea To Perfect Outfit Image.png",
  bottomBanner: "/images/kidsShop/Every Occasiona Special Outfit Image.png",
  categories: {
    newborn: "/images/kidsShop/Newborn & Infant.png",
    frocks: "/images/kidsShop/Frocks & Dresses.png",
    shirts: "/images/kidsShop/Shirts & Tops.png",
    pants: "/images/kidsShop/Pants & Shorts.png",
    traditional: "/images/kidsShop/Traditional Wear.png",
    party: "/images/kidsShop/Party Wear.png",
    uniforms: "/images/kidsShop/School Uniforms.png",
    nightwear: "/images/kidsShop/Nightwear.png",
    winter: "/images/kidsShop/Winter Wear.png",
    custom: "/images/kidsShop/Custom Design.png",
  },
  products: {
    floralFrock: "/images/kidsShop/Floral Party Frock.png",
    ethnicKurta: "/images/kidsShop/Ethnic Kurta Set.png",
    casualDress: "/images/kidsShop/Casual Dress.png",
    formalSuit: "/images/kidsShop/Formal Suit.png",
    denimDungaree: "/images/kidsShop/Denim Dungaree Set.png",
    birthdayFrock: "/images/kidsShop/Birthday Frock.png",
  },
  fabrics: {
    cotton: "/images/kidsShop/Cotton Fabric.png",
    organicCotton: "/images/kidsShop/Organic Cotton.png",
    linen: "/images/kidsShop/Linen Fabric.png",
    muslin: "/images/kidsShop/Muslin.png",
    silk: "/images/kidsShop/Silk Fabric.png",
    georgette: "/images/kidsShop/Georgette Fabric.png",
    net: "/images/kidsShop/Net Fabric.png",
    velvet: "/images/kidsShop/Velvet Fabric.png",
    denim: "/images/kidsShop/Denim Fabric.png",
    knitted: "/images/kidsShop/Knitted Fabric.png",
  }
};

// 2. 10 CATEGORIES EXACTLY MATCHING SCREENSHOT
export const KIDS_SHOP_CATEGORIES = [
  {
    id: "newborn-infant",
    title: "Newborn & Infant",
    age: "(0 - 2 Years)",
    actionText: "Explore →",
    image: KIDS_SHOP_ASSETS.categories.newborn,
    desc: "Soft rompers, onesies, swaddle sets & baby wear"
  },
  {
    id: "frocks-dresses",
    title: "Frocks & Dresses",
    age: "(2 - 12 Years)",
    actionText: "Explore →",
    image: KIDS_SHOP_ASSETS.categories.frocks,
    desc: "A-line frocks, floral gowns, party dresses & twirl skirts"
  },
  {
    id: "shirts-tops",
    title: "Shirts & Tops",
    age: "(2 - 18 Years)",
    actionText: "Explore →",
    image: KIDS_SHOP_ASSETS.categories.shirts,
    desc: "Cotton shirts, polo tees, blouses & casual tops"
  },
  {
    id: "pants-shorts",
    title: "Pants & Shorts",
    age: "(2 - 18 Years)",
    actionText: "Explore →",
    image: KIDS_SHOP_ASSETS.categories.pants,
    desc: "Chinos, dungarees, denim shorts & cargo pants"
  },
  {
    id: "traditional-wear",
    title: "Traditional Wear",
    age: "(1 - 18 Years)",
    actionText: "Explore →",
    image: KIDS_SHOP_ASSETS.categories.traditional,
    desc: "Kurta pyjamas, lehenga cholis, dhotis & sherwanis"
  },
  {
    id: "party-wear",
    title: "Party Wear",
    age: "(1 - 18 Years)",
    actionText: "Explore →",
    image: KIDS_SHOP_ASSETS.categories.party,
    desc: "Birthday dresses, 3-piece suits, blazers & gowns"
  },
  {
    id: "school-uniforms",
    title: "School Uniforms",
    age: "(Any School)",
    actionText: "Explore →",
    image: KIDS_SHOP_ASSETS.categories.uniforms,
    desc: "Custom fitted school shirts, skirts, pinafores & ties"
  },
  {
    id: "nightwear",
    title: "Nightwear",
    age: "(2 - 18 Years)",
    actionText: "Explore →",
    image: KIDS_SHOP_ASSETS.categories.nightwear,
    desc: "Organic cotton pajama sets, sleepsuits & nighties"
  },
  {
    id: "winter-wear",
    title: "Winter Wear",
    age: "(2 - 18 Years)",
    actionText: "Explore →",
    image: KIDS_SHOP_ASSETS.categories.winter,
    desc: "Fleece hoodies, puffer jackets, cardigans & thermals"
  },
  {
    id: "custom-design",
    title: "Custom Design",
    age: "Your idea, our craft",
    actionText: "Start Now →",
    image: KIDS_SHOP_ASSETS.categories.custom,
    desc: "Bespoke custom outfits with designers & tailors",
    isCustom: true
  }
];

// 3. COMPLETE PRODUCTS CATALOG (Trending 6 + Category extensions)
export const KIDS_SHOP_PRODUCTS = [
  {
    id: "prod-floral-party-frock",
    name: "Floral Party Frock",
    category: "frocks-dresses",
    price: 1799,
    originalPrice: 2499,
    image: KIDS_SHOP_ASSETS.products.floralFrock,
    images: [
      KIDS_SHOP_ASSETS.products.floralFrock,
      KIDS_SHOP_ASSETS.categories.frocks,
      KIDS_SHOP_ASSETS.categories.party
    ],
    colors: [
      { name: "Midnight Navy", hex: "#1e293b" },
      { name: "Classic Black", hex: "#0f172a" },
      { name: "Blush Pink", hex: "#f472b6" }
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    fabric: "Premium Organza & Pure Cotton Inner Lining",
    rating: 4.9,
    reviewsCount: 128,
    stock: 14,
    isTrending: true,
    desc: "Delicate layered tulle frock with hand-embroidered floral motifs, soft anti-itch cotton inner lining, and elegant satin back bow. Engineered for comfort and magical spins.",
    highlights: ["100% Breathable Cotton Lining", "Hidden Seam Growth Allowance", "Zero Scratch Tags"]
  },
  {
    id: "prod-ethnic-kurta-set",
    name: "Ethnic Kurta Set",
    category: "traditional-wear",
    price: 1499,
    originalPrice: 1999,
    image: KIDS_SHOP_ASSETS.products.ethnicKurta,
    images: [
      KIDS_SHOP_ASSETS.products.ethnicKurta,
      KIDS_SHOP_ASSETS.categories.traditional
    ],
    colors: [
      { name: "Golden Cream", hex: "#fef08a" },
      { name: "Pastel Ivory", hex: "#fde047" },
      { name: "Warm Beige", hex: "#fef9c3" }
    ],
    sizes: ["1-2Y", "2-3Y", "4-5Y", "6-7Y", "8-10Y"],
    fabric: "Chanderi Silk Blend with Soft Cotton Pajama",
    rating: 4.8,
    reviewsCount: 95,
    stock: 18,
    isTrending: true,
    desc: "Festive pure silk blend kurta with intricate neckline threadwork and comfortable elasticized cotton churidar. Designed for hours of painless celebration.",
    highlights: ["Soft Anti-Itch Neck Facing", "Elasticized Comfort Waistband", "Premium Gold Button Trim"]
  },
  {
    id: "prod-casual-dress",
    name: "Casual Dress",
    category: "frocks-dresses",
    price: 1299,
    originalPrice: 1699,
    image: KIDS_SHOP_ASSETS.products.casualDress,
    images: [
      KIDS_SHOP_ASSETS.products.casualDress,
      KIDS_SHOP_ASSETS.categories.frocks
    ],
    colors: [
      { name: "Coral Rose", hex: "#f87171" },
      { name: "Terracotta", hex: "#b45309" },
      { name: "Peach Butter", hex: "#fed7aa" }
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    fabric: "100% Breathable Organic Cotton",
    rating: 4.9,
    reviewsCount: 112,
    stock: 22,
    isTrending: true,
    desc: "Airy, breathable summer cotton dress featuring vibrant botanical prints and a gentle gathering waistline for effortless everyday play and sunny outings.",
    highlights: ["Pre-shrunk Organic Cotton", "Deep Pockets for Treasures", "Gentle Coconut Shell Buttons"]
  },
  {
    id: "prod-formal-suit",
    name: "Formal Suit",
    category: "party-wear",
    price: 2999,
    originalPrice: 3999,
    image: KIDS_SHOP_ASSETS.products.formalSuit,
    images: [
      KIDS_SHOP_ASSETS.products.formalSuit,
      KIDS_SHOP_ASSETS.categories.party
    ],
    colors: [
      { name: "Royal Navy", hex: "#1e3a8a" },
      { name: "Charcoal Grey", hex: "#64748b" },
      { name: "Stone Tan", hex: "#d6d3d1" }
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-14Y"],
    fabric: "Fine Italian Wool Blend & Cotton Poplin Shirt",
    rating: 5.0,
    reviewsCount: 84,
    stock: 8,
    isTrending: true,
    desc: "Sharp tailored 3-piece formal suit featuring a single-breasted blazer, satin bowtie, crisp white inner shirt, and expandable waist trousers.",
    highlights: ["Adjustable Waistband", "Includes Matching Satin Bowtie", "Cotton Inner Lining"]
  },
  {
    id: "prod-denim-dungaree-set",
    name: "Denim Dungaree Set",
    category: "pants-shorts",
    price: 1199,
    originalPrice: 1599,
    image: KIDS_SHOP_ASSETS.products.denimDungaree,
    images: [
      KIDS_SHOP_ASSETS.products.denimDungaree,
      KIDS_SHOP_ASSETS.categories.pants
    ],
    colors: [
      { name: "Sky Denim", hex: "#2563eb" },
      { name: "Deep Indigo", hex: "#1e3a5f" }
    ],
    sizes: ["2-3Y", "3-4Y", "5-6Y", "7-8Y"],
    fabric: "Stretch Washed Denim & Combed Cotton Tee",
    rating: 4.7,
    reviewsCount: 76,
    stock: 15,
    isTrending: true,
    desc: "Classic washed denim dungaree with adjustable brass buckles, reinforced knee seams, and paired with a soft striped cotton inner t-shirt.",
    highlights: ["Durable Triple Stitching", "Adjustable Shoulder Straps", "Snap Buttons for Easy Change"]
  },
  {
    id: "prod-birthday-frock",
    name: "Birthday Frock",
    category: "party-wear",
    price: 1899,
    originalPrice: 2599,
    image: KIDS_SHOP_ASSETS.products.birthdayFrock,
    images: [
      KIDS_SHOP_ASSETS.products.birthdayFrock,
      KIDS_SHOP_ASSETS.categories.party
    ],
    colors: [
      { name: "Sunshine Gold", hex: "#facc15" },
      { name: "Pastel Butter", hex: "#fef08a" },
      { name: "Peach Glow", hex: "#ffedd5" }
    ],
    sizes: ["1-2Y", "2-3Y", "4-5Y", "6-7Y", "8-10Y"],
    fabric: "Glitter Tulle, Satin & Soft Mulmul Lining",
    rating: 4.9,
    reviewsCount: 142,
    stock: 11,
    isTrending: true,
    desc: "Showstopper birthday party frock adorned with micro-sequin sparkles, double puff sleeves, and ultra-fluffy tiered tulle skirt with soft cotton inner.",
    highlights: ["Multi-layer Tulle Volume", "Comfort Underlay Protection", "Includes Matching Hair Clip"]
  },
  // Extra products for categories
  {
    id: "prod-newborn-romper",
    name: "Organic Newborn Romper Set",
    category: "newborn-infant",
    price: 899,
    originalPrice: 1199,
    image: KIDS_SHOP_ASSETS.categories.newborn,
    images: [KIDS_SHOP_ASSETS.categories.newborn],
    colors: [
      { name: "Warm Cloud", hex: "#f1f5f9" },
      { name: "Soft Sage", hex: "#dcfce7" }
    ],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    fabric: "100% GOTS Certified Organic Cotton",
    rating: 4.9,
    reviewsCount: 64,
    stock: 25,
    isTrending: false,
    desc: "Ultra-gentle kimono style romper with scratch-free mittens and fold-over feet for newborn tranquility.",
    highlights: ["Hypoallergenic Fabric", "Lead-free Nickel Snaps", "Tagless Neckline"]
  },
  {
    id: "prod-oxford-shirt",
    name: "Classic Oxford Linen Shirt",
    category: "shirts-tops",
    price: 999,
    originalPrice: 1399,
    image: KIDS_SHOP_ASSETS.categories.shirts,
    images: [KIDS_SHOP_ASSETS.categories.shirts],
    colors: [
      { name: "Sky Blue", hex: "#38bdf8" },
      { name: "Crisp White", hex: "#ffffff" }
    ],
    sizes: ["2-4Y", "5-7Y", "8-10Y", "11-14Y", "15-18Y"],
    fabric: "Belgian Flax Linen Blend",
    rating: 4.8,
    reviewsCount: 89,
    stock: 20,
    isTrending: false,
    desc: "Sophisticated button-down shirt made from breathable Belgian linen. Perfect for family celebrations and Sunday outings.",
    highlights: ["Breathable Natural Fiber", "Reinforced Collar Stays", "Curved Hemline"]
  },
  {
    id: "prod-school-uniform",
    name: "Custom School Uniform Set",
    category: "school-uniforms",
    price: 1299,
    originalPrice: 1699,
    image: KIDS_SHOP_ASSETS.categories.uniforms,
    images: [KIDS_SHOP_ASSETS.categories.uniforms],
    colors: [
      { name: "Navy & White", hex: "#1e3a8a" },
      { name: "Grey & Blue", hex: "#475569" }
    ],
    sizes: ["4-6Y", "7-9Y", "10-12Y", "13-16Y"],
    fabric: "Anti-Stain Cotton Poly Blend",
    rating: 4.9,
    reviewsCount: 156,
    stock: 35,
    isTrending: false,
    desc: "Heavy-duty school uniform crafted to school specifications with spill-resistant weave and double knee reinforcement.",
    highlights: ["Stain-release Finish", "Iron-free Crisp Texture", "Extra Hem Allowance for Growth"]
  },
  {
    id: "prod-flannel-nightwear",
    name: "Cozy Flannel Pajama Set",
    category: "nightwear",
    price: 849,
    originalPrice: 1199,
    image: KIDS_SHOP_ASSETS.categories.nightwear,
    images: [KIDS_SHOP_ASSETS.categories.nightwear],
    colors: [
      { name: "Butter Yellow", hex: "#fde047" },
      { name: "Star Blue", hex: "#93c5fd" }
    ],
    sizes: ["2-4Y", "5-7Y", "8-10Y", "11-14Y"],
    fabric: "Brushed Organic Flannel",
    rating: 4.8,
    reviewsCount: 78,
    stock: 19,
    isTrending: false,
    desc: "Super snuggly buttoned sleepshirt and pajama set crafted from ultra-soft brushed flannel for restful slumber.",
    highlights: ["Pre-washed Softness", "Relaxed Sleeping Fit", "Elastic Comfort Band"]
  },
  {
    id: "prod-hooded-winter-jacket",
    name: "Puffer Hooded Winter Jacket",
    category: "winter-wear",
    price: 2199,
    originalPrice: 2899,
    image: KIDS_SHOP_ASSETS.categories.winter,
    images: [KIDS_SHOP_ASSETS.categories.winter],
    colors: [
      { name: "Rose Pink", hex: "#f43f5e" },
      { name: "Midnight Navy", hex: "#0f172a" }
    ],
    sizes: ["2-4Y", "5-7Y", "8-10Y", "11-14Y"],
    fabric: "Thermal Microfiber & Waterproof Shell",
    rating: 4.9,
    reviewsCount: 92,
    stock: 12,
    isTrending: false,
    desc: "Lightweight yet exceptionally warm winter jacket with plush faux-fur hood lining and water-resistant outer shell.",
    highlights: ["Wind & Water Repellent", "Fleece Lined Pockets", "Reflective Safety Trims"]
  }
];

// 4. 10 PREMIUM FABRICS MATCHING SCREENSHOT EXACTLY
export const KIDS_SHOP_FABRICS = [
  {
    id: "cotton",
    name: "Cotton",
    price: 399,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.cotton,
    desc: "Breathable natural pure cotton for gentle everyday comfort",
    composition: "100% Combed Cotton",
    weight: "140 GSM",
    colors: ["Pink", "Sky Blue", "White", "Pastel Yellow"],
    bestFor: "Dresses, Shirts, Everyday Casuals"
  },
  {
    id: "organic-cotton",
    name: "Organic Cotton",
    price: 549,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.organicCotton,
    desc: "GOTS-certified chemical-free organic weave for sensitive baby skin",
    composition: "100% GOTS Organic Cotton",
    weight: "160 GSM",
    colors: ["Natural Cream", "Sage Green", "Soft Peach"],
    bestFor: "Newborn Sets, Rompers, Nightwear"
  },
  {
    id: "linen",
    name: "Linen",
    price: 699,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.linen,
    desc: "Cool, airy European flax linen for smart summer elegance",
    composition: "100% European Flax Linen",
    weight: "175 GSM",
    colors: ["Oatmeal", "Powder Blue", "Crisp White"],
    bestFor: "Boys Shirts, Trousers, Summer Frocks"
  },
  {
    id: "muslin",
    name: "Muslin",
    price: 449,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.muslin,
    desc: "Featherlight, breathable mulmul cloth with zero stiffness",
    composition: "100% Double-Gauze Mulmul",
    weight: "120 GSM",
    colors: ["Ivory", "Baby Pink", "Butter Yellow"],
    bestFor: "Infant Wear, Swaddles, Summer Kurtas"
  },
  {
    id: "silk",
    name: "Silk",
    price: 1199,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.silk,
    desc: "Lustrous Mulberry & Chanderi silk with rich festive sheen",
    composition: "Pure Mulberry & Chanderi Silk",
    weight: "95 GSM",
    colors: ["Royal Magenta", "Gold", "Emerald", "Maroon"],
    bestFor: "Festive Lehengas, Kurtas, Sherwanis"
  },
  {
    id: "georgette",
    name: "Georgette",
    price: 599,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.georgette,
    desc: "Delicate flowing chiffon-georgette paired with cotton lining",
    composition: "Micro-Poly Georgette",
    weight: "110 GSM",
    colors: ["Lavender", "Blush Pink", "Mint Green"],
    bestFor: "Anarkalis, Gowns, Flowy Twirl Dresses"
  },
  {
    id: "net",
    name: "Net",
    price: 499,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.net,
    desc: "Soft micro-tulle net for magical bouncy birthday frocks",
    composition: "Ultra-Soft Nylon Mesh",
    weight: "70 GSM",
    colors: ["Candy Pink", "Glitter Gold", "Sky Blue"],
    bestFor: "Birthday Frocks, Ball Gowns, Tutus"
  },
  {
    id: "velvet",
    name: "Velvet",
    price: 1299,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.velvet,
    desc: "Plush, opulent velvet for cozy luxury & winter wedding wear",
    composition: "Silk Micro-Velvet",
    weight: "260 GSM",
    colors: ["Deep Maroon", "Midnight Navy", "Forest Green"],
    bestFor: "Winter Blazers, Sherwanis, Velvet Frocks"
  },
  {
    id: "denim",
    name: "Denim",
    price: 649,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.denim,
    desc: "Soft-washed stretch cotton denim engineered for active play",
    composition: "98% Cotton, 2% Spandex",
    weight: "240 GSM",
    colors: ["Classic Indigo", "Ice Blue", "Black Denim"],
    bestFor: "Dungarees, Jackets, Jeans, Pinafores"
  },
  {
    id: "knitted-fabric",
    name: "Knitted Fabric",
    price: 499,
    unit: "per meter",
    image: KIDS_SHOP_ASSETS.fabrics.knitted,
    desc: "Cozy stretch French terry & jersey knit for playtime ease",
    composition: "95% Cotton, 5% Elastane",
    weight: "220 GSM",
    colors: ["Heather Grey", "Coral", "Navy Stripe"],
    bestFor: "Sweatshirts, Joggers, Everyday Tees"
  }
];

// 5. 6 CUSTOM KIDS STUDIO PROCESS STEPS
export const KIDS_STUDIO_STEPS = [
  {
    step: 1,
    id: "upload",
    title: "Upload Design or Idea",
    short: "Upload reference photos, sketches or pick ideas",
    iconName: "Image"
  },
  {
    step: 2,
    id: "style-fabric",
    title: "Choose Style & Fabric",
    short: "Select neck, sleeves, fit and premium fabric",
    iconName: "Shirt"
  },
  {
    step: 3,
    id: "measurements",
    title: "Enter Measurements (Age / Size)",
    short: "Pick standard age size or provide custom sizing",
    iconName: "Ruler"
  },
  {
    step: 4,
    id: "personalization",
    title: "Add Personalization (Embroidery, Name)",
    short: "Custom initials, monogram & special patch motifs",
    iconName: "Type"
  },
  {
    step: 5,
    id: "quote",
    title: "Get Preview & Quote",
    short: "Instant transparent pricing with no hidden charges",
    iconName: "FileText"
  },
  {
    step: 6,
    id: "delivery",
    title: "Handcrafted & Delivered",
    short: "Stitched by master artisans & delivered to home",
    iconName: "Truck"
  }
];

// 6. HOW IT WORKS 5 STEPS
export const KIDS_HOW_IT_WORKS_STEPS = [
  {
    num: "1",
    title: "Choose",
    desc: "Select a design or upload your idea.",
    iconName: "Shirt"
  },
  {
    num: "2",
    title: "Select Fabric",
    desc: "Choose from our fabrics or use your own.",
    iconName: "Layers"
  },
  {
    num: "3",
    title: "Measurements",
    desc: "Enter your child's age/size or share measurements.",
    iconName: "Ruler"
  },
  {
    num: "4",
    title: "Expert Stitching",
    desc: "Our skilled tailors stitch with care.",
    iconName: "Scissors"
  },
  {
    num: "5",
    title: "Delivered",
    desc: "Get your stitched outfit at your doorstep.",
    iconName: "Truck"
  }
];

// 7. SIZE CHART GUIDANCE
export const KIDS_SIZE_CHART = [
  { size: "0-3M", age: "0-3 Months", chest: "16-17", waist: "16-17", height: "55-61 cm" },
  { size: "3-6M", age: "3-6 Months", chest: "17-18", waist: "17-18", height: "61-67 cm" },
  { size: "6-12M", age: "6-12 Months", chest: "18-19", waist: "18-19", height: "67-74 cm" },
  { size: "1-2Y", age: "1-2 Years", chest: "20-21", waist: "19-20", height: "80-86 cm" },
  { size: "2-3Y", age: "2-3 Years", chest: "21-22", waist: "20-21", height: "86-98 cm" },
  { size: "3-4Y", age: "3-4 Years", chest: "22-23", waist: "21-22", height: "98-104 cm" },
  { size: "4-5Y", age: "4-5 Years", chest: "23-24", waist: "21.5-22.5", height: "104-110 cm" },
  { size: "6-7Y", age: "6-7 Years", chest: "25-26", waist: "22.5-23.5", height: "116-122 cm" },
  { size: "8-9Y", age: "8-9 Years", chest: "27-28", waist: "24-25", height: "128-134 cm" },
  { size: "10-12Y", age: "10-12 Years", chest: "29-31", waist: "25-27", height: "140-152 cm" },
  { size: "13-16Y", age: "13-16 Years", chest: "32-34", waist: "27-29", height: "158-164 cm" }
];

// 8. STORAGE HELPERS
const KIDS_DRAFTS_KEY = "stitchbee_kids_shop_drafts";

export const getKidsDrafts = () => {
  try {
    const raw = localStorage.getItem(KIDS_DRAFTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveKidsDraft = (draft) => {
  try {
    const existing = getKidsDrafts().filter(d => d.id !== draft.id);
    const updated = [{ ...draft, updatedAt: new Date().toISOString() }, ...existing];
    localStorage.setItem(KIDS_DRAFTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save kids draft:", e);
    return [];
  }
};
