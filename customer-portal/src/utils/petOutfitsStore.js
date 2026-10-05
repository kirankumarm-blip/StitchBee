// StitchBeez Pet Outfits Central Store & Mock Persistence API
// Synchronizes with localStorage keys: stitchbeez_cart, stitchbeez_wishlist, stitchbeez_orders
// and sessionStorage key: stitchbeez_pet_custom_draft

import { 
  getCart, 
  saveCart, 
  getWishlist, 
  saveWishlist, 
  toggleWishlist as globalToggleWishlist, 
  addOrder as globalAddOrder 
} from './bagsStore';

export const PET_CATEGORIES = [
  {
    id: "dog-outfits",
    name: "Dog Outfits",
    desc: "Stylish outfits for all breeds",
    img: "/assets/pets/cat_dog_outfits.png",
    action: "Explore →",
    heroText: "Hand-tailored comfortable outfits crafted specifically for dogs of all sizes and breeds."
  },
  {
    id: "cat-outfits",
    name: "Cat Outfits",
    desc: "Trendy & comfortable styles",
    img: "/assets/pets/cat_cat_outfits.png",
    action: "Explore →",
    heroText: "Ultra-gentle lightweight cat apparel with zero neck irritation and safety elastic."
  },
  {
    id: "shirts",
    name: "Shirts & T-Shirts",
    desc: "Everyday wear for playful days",
    img: "/assets/pets/cat_shirts.png",
    action: "Explore →",
    heroText: "Breathable daily cotton shirts, polo tees, and custom monogrammed playwear."
  },
  {
    id: "dresses",
    name: "Dresses & Frocks",
    desc: "Cute and fashionable dresses",
    img: "/assets/pets/cat_dresses.png",
    action: "Explore →",
    heroText: "Bespoke floral dresses, tutus, and ruffled frocks crafted with soft hypoallergenic fabrics."
  },
  {
    id: "hoodies",
    name: "Jackets & Hoodies",
    desc: "Warm & cozy for every season",
    img: "/assets/pets/cat_hoodies.png",
    action: "Explore →",
    heroText: "Double-brushed polar fleece hoodies and weather-shield jackets with leash portals."
  },
  {
    id: "traditional",
    name: "Festive & Traditional",
    desc: "For special occasions and celebrations",
    img: "/assets/pets/cat_festive.png",
    action: "Explore →",
    heroText: "Royal sherwanis, kurtas, and silk lehengas with child-safe zari and effortless velcro closures."
  },
  {
    id: "accessories",
    name: "Accessories",
    desc: "Collars, bows, bandanas & more",
    img: "/assets/pets/cat_accessories.png",
    action: "Explore →",
    heroText: "Handmade adjustable bowties, floral bandanas, and cushioned walking harness collars."
  },
  {
    id: "custom",
    name: "Custom Design",
    desc: "Your idea, our craft",
    img: "/assets/pets/cat_custom_design.png",
    action: "Start Designing →",
    isCustom: true,
    heroText: "Bring your dream pet outfit vision to life with certified master pet tailors."
  }
];

export const PET_FABRICS = [
  {
    id: "soft-cotton",
    name: "Soft Cotton",
    desc: "Ultra-soft natural breathable woven cotton with charming floral prints",
    img: "/assets/pets/fabrics/soft_cotton.png",
    softness: "5 / 5",
    breathability: "5 / 5",
    warmth: "2 / 5",
    durability: "4 / 5",
    season: "Spring / Summer / Daily Indoor",
    suitablePets: "Dogs & Cats with sensitive underbelly skin",
    care: "Machine wash cold gentle cycle. Air dry flat."
  },
  {
    id: "organic-cotton",
    name: "Organic Cotton",
    desc: "GOTS certified unbleached organic cotton with waffle weave texture",
    img: "/assets/pets/fabrics/organic_cotton.png",
    softness: "5 / 5",
    breathability: "5 / 5",
    warmth: "3 / 5",
    durability: "4.5 / 5",
    season: "All Seasons",
    suitablePets: "Hypoallergenic, ideal for allergy-prone breeds",
    care: "Machine wash lukewarm. Tumble dry low."
  },
  {
    id: "breathable-linen",
    name: "Breathable Linen",
    desc: "Pure natural cooling French flax weave for warm weather comfort",
    img: "/assets/pets/fabrics/breathable_linen.png",
    softness: "4 / 5",
    breathability: "5 / 5",
    warmth: "2 / 5",
    durability: "4 / 5",
    season: "Summer & Festive",
    suitablePets: "Medium to long-haired breeds",
    care: "Hand wash or gentle machine wash. Cool iron if desired."
  },
  {
    id: "fleece",
    name: "Fleece",
    desc: "Thermal anti-pill plush double-brushed knit fleece for chilly morning walks",
    img: "/assets/pets/fabrics/fleece.png",
    softness: "5 / 5",
    breathability: "3 / 5",
    warmth: "5 / 5",
    durability: "4.5 / 5",
    season: "Autumn / Winter / Air-conditioned indoors",
    suitablePets: "Short-haired dogs, puppies, and senior pets",
    care: "Machine wash cold. Dries quickly, no bleach."
  },
  {
    id: "denim",
    name: "Denim",
    desc: "Durable 10oz washed indigo stretch denim with contrast saddle stitching",
    img: "/assets/pets/fabrics/denim.png",
    softness: "3.5 / 5",
    breathability: "3.5 / 5",
    warmth: "3 / 5",
    durability: "5 / 5",
    season: "All Seasons",
    suitablePets: "Active outdoor dogs and playful pets",
    care: "Machine wash cold inside out with similar colors."
  },
  {
    id: "velvet",
    name: "Velvet",
    desc: "Plush micro-velvet with subtle luster and silky fur-friendly backing",
    img: "/assets/pets/fabrics/velvet.png",
    softness: "5 / 5",
    breathability: "3 / 5",
    warmth: "4 / 5",
    durability: "4 / 5",
    season: "Festive & Wedding Season",
    suitablePets: "Dogs & Cats attending family celebrations",
    care: "Spot clean or dry clean recommended for gold embroidery."
  },
  {
    id: "waterproof-fabric",
    name: "Waterproof Fabric",
    desc: "Hydrophobic ripstop nylon with sealed seams for rainy monsoon strolls",
    img: "/assets/pets/fabrics/waterproof_fabric.png",
    softness: "3 / 5",
    breathability: "4 / 5",
    warmth: "3 / 5",
    durability: "5 / 5",
    season: "Monsoon & Rainy Season",
    suitablePets: "All outdoor walking pets",
    care: "Wipe clean with damp cloth or hose down."
  },
  {
    id: "festive-fabric",
    name: "Festive Fabric",
    desc: "Artisanal brocade jacquard weave with playful gold paw print motifs",
    img: "/assets/pets/fabrics/festive_fabric.png",
    softness: "4 / 5",
    breathability: "3.5 / 5",
    warmth: "3 / 5",
    durability: "4.5 / 5",
    season: "Diwali, Weddings & Pet Birthdays",
    suitablePets: "Small to large dogs and celebration-loving cats",
    care: "Gentle hand wash in cold water. Lay flat to dry."
  }
];

export const ALL_PET_PRODUCTS = [
  {
    id: "prod-casual-dog-shirt",
    slug: "casual-dog-shirt",
    name: "Casual Dog Shirt",
    catId: "dog-outfits",
    category: "Pet Outfits",
    categorySlug: "dog-outfits",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 42,
    stock: 28,
    customizable: true,
    personalizable: true,
    img: "/assets/pets/prod_casual_dog_shirt.png",
    images: [
      "/assets/pets/prod_casual_dog_shirt.png",
      "/assets/pets/cat_dog_outfits.png",
      "/assets/pets/hero_page.png"
    ],
    colors: [
      { name: "Denim Blue", hex: "#4C7093", img: "/assets/pets/prod_casual_dog_shirt.png" },
      { name: "Mustard Gold", hex: "#D69F3D", img: "/assets/pets/prod_casual_dog_shirt.png" },
      { name: "Soft Sage", hex: "#8DA38B", img: "/assets/pets/prod_casual_dog_shirt.png" }
    ],
    selectedColor: "Denim Blue",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom Size"],
    fabric: "100% Breathable Washed Cotton Denim",
    material: "100% Breathable Washed Cotton Denim",
    petType: "Dog",
    description: "Classic collar dog shirt crafted with breathable washed denim. Features snap buttons down the front, elasticated belly for high mobility, and reinforced leash opening on back.",
    features: [
      "Ergonomic belly cut prevents soiling during potty breaks",
      "Stretchy chest ribbing accommodates broad-chested breeds",
      "Concealed leash loop portal under the collar",
      "Machine washable with reinforced dual-lock stitching"
    ],
    tags: ["dog", "shirt", "denim", "casual", "everyday", "playwear"]
  },
  {
    id: "prod-floral-pet-dress",
    slug: "floral-pet-dress",
    name: "Floral Pet Dress",
    catId: "dresses",
    category: "Pet Outfits",
    categorySlug: "dresses",
    price: 799,
    originalPrice: 1099,
    rating: 4.8,
    reviewCount: 36,
    stock: 22,
    customizable: true,
    personalizable: true,
    img: "/assets/pets/prod_floral_dress.png",
    images: [
      "/assets/pets/prod_floral_dress.png",
      "/assets/pets/cat_dresses.png",
      "/assets/pets/how_it_works.png"
    ],
    colors: [
      { name: "Blush Pink", hex: "#EFA1B1", img: "/assets/pets/prod_floral_dress.png" },
      { name: "Cream Floral", hex: "#F6F1E3", img: "/assets/pets/prod_floral_dress.png" },
      { name: "Lavender Mist", hex: "#C7B9E2", img: "/assets/pets/prod_floral_dress.png" }
    ],
    selectedColor: "Blush Pink",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom Size"],
    fabric: "Soft Hypoallergenic Floral Cotton with Organza Ruffles",
    material: "Soft Hypoallergenic Floral Cotton with Organza Ruffles",
    petType: "Cat & Dog",
    description: "Enchanting floral dress with delicate layered ruffles and soft cotton bodice. Crafted with sensitive fur-safe seams and adjustable velcro closure for instant dressing.",
    features: [
      "Ultra-soft lining eliminates chafing under armpits",
      "Quick 5-second velcro belly strap makes dressing effortless",
      "Delicate hand-finished scalloped hem with bow accent",
      "Suitable for both cats and small-to-medium dog breeds"
    ],
    tags: ["dress", "frock", "floral", "pink", "cat", "dog", "party"]
  },
  {
    id: "prod-pet-hoodie",
    slug: "pet-hoodie",
    name: "Pet Hoodie",
    catId: "hoodies",
    category: "Pet Outfits",
    categorySlug: "hoodies",
    price: 999,
    originalPrice: 1399,
    rating: 5.0,
    reviewCount: 58,
    stock: 35,
    customizable: true,
    personalizable: true,
    img: "/assets/pets/prod_pet_hoodie.png",
    images: [
      "/assets/pets/prod_pet_hoodie.png",
      "/assets/pets/cat_hoodies.png",
      "/assets/pets/lifestyle_banner.png"
    ],
    colors: [
      { name: "Crimson Red", hex: "#C82333", img: "/assets/pets/prod_pet_hoodie.png" },
      { name: "Heather Grey", hex: "#9E9E9E", img: "/assets/pets/prod_pet_hoodie.png" },
      { name: "Navy Blue", hex: "#1C355E", img: "/assets/pets/prod_pet_hoodie.png" }
    ],
    selectedColor: "Crimson Red",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom Size"],
    fabric: "Double-Brushed Anti-Pill Thermal Polar Fleece",
    material: "Double-Brushed Anti-Pill Thermal Polar Fleece",
    petType: "Dog & Cat",
    description: "Snuggly thermal polar fleece hoodie designed to keep pets warm during chilly mornings and air-conditioned naps. Includes drawstring hood and cozy kangaroo back pocket.",
    features: [
      "Heavyweight 320 GSM brushed fleece traps body warmth",
      "Reinforced harness slit for hassle-free outdoor leash attachment",
      "Functional mini kangaroo pocket to hold waste bags or treats",
      "Gentle ribbed cuffs prevent drafts without restricting paws"
    ],
    tags: ["hoodie", "jacket", "fleece", "warm", "winter", "dog", "cat"]
  },
  {
    id: "prod-pet-kurta",
    slug: "traditional-pet-kurta",
    name: "Traditional Pet Kurta",
    catId: "traditional",
    category: "Pet Outfits",
    categorySlug: "traditional",
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 31,
    stock: 19,
    customizable: true,
    personalizable: true,
    img: "/assets/pets/prod_pet_kurta.png",
    images: [
      "/assets/pets/prod_pet_kurta.png",
      "/assets/pets/cat_festive.png",
      "/assets/pets/hero_page.png"
    ],
    colors: [
      { name: "Marigold Yellow", hex: "#E8A317", img: "/assets/pets/prod_pet_kurta.png" },
      { name: "Royal Cream", hex: "#F4ECD8", img: "/assets/pets/prod_pet_kurta.png" },
      { name: "Ruby Maroon", hex: "#8A1828", img: "/assets/pets/prod_pet_kurta.png" }
    ],
    selectedColor: "Marigold Yellow",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom Size"],
    fabric: "Pure Chanderi Silk Blend with Gold Zari Border",
    material: "Pure Chanderi Silk Blend with Gold Zari Border",
    petType: "Dog & Cat",
    description: "Handcrafted festive kurta with authentic Indian ethnic motifs and delicate zari edging. Designed specifically for Indian celebrations, weddings, and Diwali pooja.",
    features: [
      "Breathable lightweight Chanderi blend keeps pets cool during long events",
      "Zero irritating tags or scratchy interior sequins",
      "Full velcro belly wrap designed for speedy, calm dressing",
      "Hand-embroidered festive mandarin collar"
    ],
    tags: ["kurta", "traditional", "festive", "diwali", "wedding", "ethnic", "dog", "cat"]
  },
  {
    id: "prod-pet-lehenga",
    slug: "festive-pet-lehenga",
    name: "Festive Pet Lehenga",
    catId: "traditional",
    category: "Pet Outfits",
    categorySlug: "traditional",
    price: 1499,
    originalPrice: 1999,
    rating: 5.0,
    reviewCount: 27,
    stock: 16,
    customizable: true,
    personalizable: true,
    img: "/assets/pets/prod_pet_lehenga.png",
    images: [
      "/assets/pets/prod_pet_lehenga.png",
      "/assets/pets/cat_festive.png",
      "/assets/pets/lifestyle_banner.png"
    ],
    colors: [
      { name: "Rani Pink & Gold", hex: "#D6226B", img: "/assets/pets/prod_pet_lehenga.png" },
      { name: "Emerald Brocade", hex: "#1C6B45", img: "/assets/pets/prod_pet_lehenga.png" },
      { name: "Royal Purple", hex: "#5C246E", img: "/assets/pets/prod_pet_lehenga.png" }
    ],
    selectedColor: "Rani Pink & Gold",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom Size"],
    fabric: "Artisanal Brocade Silk with Golden Gotta Patti Work",
    material: "Artisanal Brocade Silk with Golden Gotta Patti Work",
    petType: "Cat & Small/Medium Dog",
    description: "Opulent wedding and festival lehenga featuring genuine Benarasi brocade fabric, golden gotta patti border, and a matching festive hairbow attachment.",
    features: [
      "Lightweight skirt allows normal walking, sitting, and tail wagging",
      "Includes detachable festive hair bow clip / collar tie",
      "Lined with 100% natural soft cotton against the pet's coat",
      "Elasticated chest band ensures secure comfortable placement"
    ],
    tags: ["lehenga", "festive", "traditional", "brocade", "wedding", "cat", "dog"]
  },
  {
    id: "prod-personalized-tshirt",
    slug: "personalized-pet-shirt",
    name: "Personalized Pet T-Shirt",
    catId: "shirts",
    category: "Pet Outfits",
    categorySlug: "shirts",
    price: 699,
    originalPrice: 999,
    rating: 4.9,
    reviewCount: 64,
    stock: 45,
    customizable: true,
    personalizable: true,
    img: "/assets/pets/prod_personalized_tshirt.png",
    images: [
      "/assets/pets/prod_personalized_tshirt.png",
      "/assets/pets/cat_shirts.png",
      "/assets/pets/lifestyle_banner.png"
    ],
    colors: [
      { name: "Crisp White", hex: "#FFFFFF", img: "/assets/pets/prod_personalized_tshirt.png" },
      { name: "Sky Blue", hex: "#5EA3DE", img: "/assets/pets/prod_personalized_tshirt.png" },
      { name: "Sunshine Yellow", hex: "#F3C538", img: "/assets/pets/prod_personalized_tshirt.png" }
    ],
    selectedColor: "Crisp White",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom Size"],
    fabric: "100% Premium Combed Cotton Jersey",
    material: "100% Premium Combed Cotton Jersey",
    petType: "Dog & Cat",
    description: "Everyday ultra-soft cotton tee featuring your pet's name custom embroidered across the back. Perfect for walks, park meetups, and photo shoots.",
    features: [
      "Custom name embroidered in high-tensile silken thread (up to 12 characters)",
      "Breathable 100% combed cotton jersey prevents overheating",
      "Comfort-stretch neck opening slips on and off gently over ears",
      "Fade-proof thread withstands countless washes"
    ],
    tags: ["tshirt", "personalized", "custom name", "cotton", "dog", "cat", "daily"]
  }
];

export const PET_REVIEWS = [
  {
    id: "rev-1",
    name: "Anjali S.",
    location: "Bengaluru",
    avatar: "/assets/pets/rev1_user.png",
    petImg: "/assets/pets/rev1_pet.png",
    rating: 5,
    text: "The outfit fits perfectly and looks so adorable! Amazing quality and super comfortable for my dog. The tailor verified the chest size before stitching."
  },
  {
    id: "rev-2",
    name: "Rohan Mehta",
    location: "Hyderabad",
    avatar: "/assets/pets/rev2_user.png",
    petImg: "/assets/pets/rev2_pet.png",
    rating: 5,
    text: "Ordered the custom hoodie for my cat. The fabric is soft and the stitching is excellent! He actually purrs and naps comfortably in it."
  },
  {
    id: "rev-3",
    name: "Neha K.",
    location: "Chennai",
    avatar: "/assets/pets/rev3_user.png",
    petImg: "/assets/pets/rev3_pet.png",
    rating: 5,
    text: "Beautiful festive outfit! Received so many compliments at our Diwali party. Highly recommended for any pet parent looking for genuine artisan craft."
  }
];

export const VERIFIED_PET_TAILORS = [
  {
    id: "tailor-pet-1",
    name: "Rajesh Kumar",
    avatar: "/assets/pets/rev2_user.png",
    rating: 4.9,
    reviewCount: 142,
    dist: "1.8 km",
    locality: "Indiranagar, Bengaluru",
    experience: "4+ years pet garment specialist",
    specialties: ["Custom Sherwanis", "Harness Reinforcement", "Velcro Fitting"],
    startingPrice: 399,
    turnaround: "2 - 3 Days",
    homePickup: true,
    homeDelivery: true,
    verified: true
  },
  {
    id: "tailor-pet-2",
    name: "Sunita Rao",
    avatar: "/assets/pets/rev1_user.png",
    rating: 4.8,
    reviewCount: 98,
    dist: "3.2 km",
    locality: "Koramangala, Bengaluru",
    experience: "5+ years pet couture & embroidery",
    specialties: ["Personalized Names", "Floral Frocks", "Cat Apparel"],
    startingPrice: 449,
    turnaround: "3 - 4 Days",
    homePickup: false,
    homeDelivery: true,
    verified: true
  },
  {
    id: "tailor-pet-3",
    name: "Anand Patel",
    avatar: "/assets/pets/rev2_user.png",
    rating: 4.9,
    reviewCount: 116,
    dist: "4.5 km",
    locality: "HSR Layout, Bengaluru",
    experience: "3+ years technical outdoor pet wear",
    specialties: ["Waterproof Raincoats", "Thermal Hoodies", "Large Breeds"],
    startingPrice: 499,
    turnaround: "2 - 4 Days",
    homePickup: true,
    homeDelivery: true,
    verified: true
  }
];

// Helper to notify storage changes
export const notifyStoreUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('stitchbee-store-update'));
    window.dispatchEvent(new Event('storage'));
  }
};

// =========================================================================
// QUERY API
// =========================================================================

export const getPetProducts = () => {
  return ALL_PET_PRODUCTS;
};

export const getPetProductBySlug = (slugOrId) => {
  if (!slugOrId) return ALL_PET_PRODUCTS[0];
  return ALL_PET_PRODUCTS.find(p => p.slug === slugOrId || p.id === slugOrId) || null;
};

export const getPetProductsByCategory = (catSlugOrId) => {
  if (!catSlugOrId || catSlugOrId === 'all') return ALL_PET_PRODUCTS;
  
  return ALL_PET_PRODUCTS.filter(p => {
    if (p.catId === catSlugOrId || p.categorySlug === catSlugOrId) return true;
    if (catSlugOrId === 'dog-outfits' && (p.catId === 'dog-outfits' || p.petType.includes('Dog'))) return true;
    if (catSlugOrId === 'cat-outfits' && (p.catId === 'dresses' || p.petType.includes('Cat'))) return true;
    if (catSlugOrId === 'shirts' && (p.catId === 'shirts' || p.id === 'prod-casual-dog-shirt')) return true;
    if (catSlugOrId === 'dresses' && p.catId === 'dresses') return true;
    if (catSlugOrId === 'hoodies' && p.catId === 'hoodies') return true;
    if (catSlugOrId === 'traditional' && p.catId === 'traditional') return true;
    if (catSlugOrId === 'accessories' && (p.id === 'prod-floral-pet-dress' || p.id === 'prod-pet-kurta')) return true;
    return false;
  });
};

export const getPetCategory = (catSlugOrId) => {
  return PET_CATEGORIES.find(c => c.id === catSlugOrId) || {
    id: catSlugOrId,
    name: "Pet Outfits Collection",
    desc: "Adorable, comfortable and custom-made outfits for your furry friends."
  };
};

// =========================================================================
// CART API INTEGRATION (Reuses stitchbeez_cart from bagsStore)
// =========================================================================

export const addPetOutfitToCart = (
  product, 
  options = {}
) => {
  try {
    const cart = getCart();
    const color = options.color || product.selectedColor || product.colors?.[0]?.name || 'Standard';
    const size = options.size || 'M';
    const petName = options.petName || '';
    const petType = options.petType || product.petType || 'Dog';
    const measurements = options.measurements || null;
    const fabric = options.fabric || product.fabric || 'Cotton';
    const quantity = options.quantity || 1;
    const colorObj = product.colors?.find(c => c.name === color);
    const itemImg = colorObj?.img || product.img;

    const cartKey = `pet-${product.id}-${color}-${size}-${petName || 'standard'}`;
    const existingIndex = cart.findIndex(it => 
      (it.cartKey && it.cartKey === cartKey) || 
      (it.id === product.id && it.color === color && it.size === size && it.petName === petName)
    );

    let updated;
    if (existingIndex > -1) {
      updated = cart.map((it, idx) => 
        idx === existingIndex ? { ...it, quantity: it.quantity + quantity } : it
      );
    } else {
      const newItem = {
        cartKey,
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || (product.price + 300),
        color,
        size,
        petType,
        petName,
        measurements,
        fabric,
        personalization: petName ? `Pet: ${petName}` : null,
        image: itemImg,
        category: 'Pet Outfits',
        quantity,
        addedAt: new Date().toISOString()
      };
      updated = [newItem, ...cart];
    }

    saveCart(updated);
    notifyStoreUpdate();
    return updated;
  } catch (err) {
    console.error("Failed to add pet outfit to cart:", err);
    return [];
  }
};

// =========================================================================
// CUSTOM WIZARD DRAFT PERSISTENCE
// =========================================================================

const PET_CUSTOM_DRAFT_KEY = 'stitchbeez_pet_custom_draft';

export const getPetOutfitsCustomDraft = () => {
  try {
    const raw = sessionStorage.getItem(PET_CUSTOM_DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const savePetOutfitsCustomDraft = (data) => {
  try {
    sessionStorage.setItem(PET_CUSTOM_DRAFT_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save pet custom draft:", e);
  }
};

export const clearPetOutfitsCustomDraft = () => {
  try {
    sessionStorage.removeItem(PET_CUSTOM_DRAFT_KEY);
  } catch (e) {
    // ignore
  }
};

export const submitCustomPetOutfitOrder = (customData) => {
  const customId = `pet-custom-${Date.now()}`;
  const customItem = {
    cartKey: customId,
    id: customId,
    name: `Custom ${customData.petType || 'Pet'} ${customData.outfit || 'Outfit'} (${customData.petName || 'Special'})`,
    price: customData.quote?.total || 1499,
    originalPrice: (customData.quote?.total || 1499) + 400,
    color: customData.color || 'Custom Color',
    size: customData.size || 'Custom Fit',
    petType: customData.petType || 'Dog',
    petName: customData.petName || '',
    breed: customData.breed || '',
    measurements: customData.measurements || {},
    fabric: customData.fabric || 'Soft Cotton',
    personalization: customData.personalization?.text ? `Name: ${customData.personalization.text}` : null,
    tailor: customData.tailor || null,
    image: customData.petPhoto || "/assets/pets/hero_page.png",
    category: 'Pet Outfits Custom',
    quantity: 1,
    isCustom: true,
    addedAt: new Date().toISOString()
  };

  const cart = getCart();
  const updated = [customItem, ...cart];
  saveCart(updated);
  notifyStoreUpdate();
  clearPetOutfitsCustomDraft();
  return customItem;
};
