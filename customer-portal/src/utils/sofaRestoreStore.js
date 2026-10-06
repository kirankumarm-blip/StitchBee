// ============================================================================
// STITCHBEEZ SOFA REPAIR & RESTORE DATA STORE
// Centralized data models, asset mappings, and estimation engine
// ============================================================================

export const RESTORE_SOFA_ASSETS = {
  hero: {
    before: "/assets/restore-sofas/hero_before.png",
    after: "/assets/restore-sofas/hero_after.png"
  },
  services: {
    tearDamage: "/assets/restore-sofas/service_tear_damage.png",
    stitching: "/assets/restore-sofas/service_stitching.png",
    cushionFoam: "/assets/restore-sofas/service_cushion_foam.png",
    armrest: "/assets/restore-sofas/service_armrest.png",
    frame: "/assets/restore-sofas/service_frame.png",
    beltSpring: "/assets/restore-sofas/service_belt_spring.png",
    deepCleaning: "/assets/restore-sofas/service_deep_cleaning.png",
    reupholstery: "/assets/restore-sofas/service_reupholstery.png"
  },
  howItWorks: {
    artisan: "/assets/restore-sofas/how_it_works_artisan.png"
  },
  transformations: [
    {
      id: "trans-1",
      title: "Vintage Leather Armchair Rejuvenation",
      desc: "Deep foam replacement and Italian tan leather reupholstery.",
      before: "/assets/restore-sofas/transform_1_before.png",
      after: "/assets/restore-sofas/transform_1_after.png",
      services: ["Tear & Damage Repair", "Cushion / Foam Replacement", "Reupholstery"],
      fabric: "Full-Grain Tan Leatherette",
      duration: "4 Days",
      price: "₹4,899"
    },
    {
      id: "trans-2",
      title: "Classic 2-Seater Velvet Red Transformation",
      desc: "Spring re-tensioning, tear mending, and rich burgundy velvet.",
      before: "/assets/restore-sofas/transform_2_before.png",
      after: "/assets/restore-sofas/transform_2_after.png",
      services: ["Frame Repair", "Belt / Spring Replacement", "Reupholstery (Full)"],
      fabric: "Royal Burgundy Velvet",
      duration: "5 Days",
      price: "₹7,499"
    },
    {
      id: "trans-3",
      title: "Tufted Mid-Century Sofa Reupholstery",
      desc: "Complete floral fabric removal replaced with button-tufted peacock teal.",
      before: "/assets/restore-sofas/transform_3_before.png",
      after: "/assets/restore-sofas/transform_3_after.png",
      services: ["Stitching Repair", "Cushion / Foam Replacement", "Reupholstery (Full)"],
      fabric: "Water-Repellent Chenille",
      duration: "6 Days",
      price: "₹8,999"
    },
    {
      id: "trans-4",
      title: "Modern 3-Seater Neutral Linen Restoration",
      desc: "Sagging cushion core rebuilt with 45D foam and ivory textured linen.",
      before: "/assets/restore-sofas/transform_4_before.png",
      after: "/assets/restore-sofas/transform_4_after.png",
      services: ["Tear & Damage Repair", "Cushion / Foam Replacement", "Deep Cleaning"],
      fabric: "Belgian Textured Linen",
      duration: "4 Days",
      price: "₹5,899"
    }
  ],
  ctaBanner: "/assets/restore-sofas/cta_banner.png"
};

// ============================================================================
// 8 CORE REPAIR SERVICES (MATCHING SCREENSHOT EXACTLY)
// ============================================================================
export const SOFA_REPAIR_SERVICES = [
  {
    id: "tear-damage",
    name: "Tear & Damage Repair",
    desc: "Fix cuts, tears, scratches and wear & tear.",
    basePrice: 499,
    formattedPrice: "₹499",
    img: RESTORE_SOFA_ASSETS.services.tearDamage
  },
  {
    id: "stitching",
    name: "Stitching Repair",
    desc: "Expert stitching for seams and joints.",
    basePrice: 399,
    formattedPrice: "₹399",
    img: RESTORE_SOFA_ASSETS.services.stitching
  },
  {
    id: "cushion-foam",
    name: "Cushion / Foam Replacement",
    desc: "High quality foam for better comfort.",
    basePrice: 799,
    formattedPrice: "₹799",
    img: RESTORE_SOFA_ASSETS.services.cushionFoam
  },
  {
    id: "armrest",
    name: "Armrest Repair",
    desc: "Restore or rebuild armrests.",
    basePrice: 699,
    formattedPrice: "₹699",
    img: RESTORE_SOFA_ASSETS.services.armrest
  },
  {
    id: "frame",
    name: "Frame Repair",
    desc: "Strengthen and fix wooden structure.",
    basePrice: 1499,
    formattedPrice: "₹1,499",
    img: RESTORE_SOFA_ASSETS.services.frame
  },
  {
    id: "belt-spring",
    name: "Belt / Spring Replacement",
    desc: "Restore support and comfort.",
    basePrice: 999,
    formattedPrice: "₹999",
    img: RESTORE_SOFA_ASSETS.services.beltSpring
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    desc: "Remove stains and refresh your sofa.",
    basePrice: 999,
    formattedPrice: "₹999",
    img: RESTORE_SOFA_ASSETS.services.deepCleaning
  },
  {
    id: "reupholstery",
    name: "Reupholstery",
    desc: "New look with premium fabric options.",
    basePrice: 2499,
    formattedPrice: "₹2,499",
    img: RESTORE_SOFA_ASSETS.services.reupholstery
  }
];

// Additional services available in the instant estimate list
export const ADDITIONAL_ESTIMATE_SERVICES = [
  {
    id: "reupholstery-full",
    name: "Reupholstery (Full)",
    desc: "Complete frame stripping, fresh padding and full upholstery wrapping.",
    basePrice: 4999,
    formattedPrice: "₹4,999"
  },
  {
    id: "polishing-leather",
    name: "Polishing (Leather)",
    desc: "Restores natural oils, removes scuffs, buffing & wax conditioning.",
    basePrice: 799,
    formattedPrice: "₹799"
  }
];

// All services combined for the Instant Estimate Checklist
export const ALL_ESTIMATE_SERVICES = [
  ...SOFA_REPAIR_SERVICES,
  ...ADDITIONAL_ESTIMATE_SERVICES
];

// ============================================================================
// SOFA TYPES (STEP 2 IN INSTANT ESTIMATE)
// ============================================================================
export const SOFA_TYPES = [
  { id: "1-seater", name: "1 Seater", multiplier: 1.0, icon: "armchair" },
  { id: "2-seater", name: "2 Seater", multiplier: 1.45, icon: "sofa-2" },
  { id: "3-seater", name: "3 Seater", multiplier: 1.85, icon: "sofa-3" }, // Default in screenshot
  { id: "l-shape", name: "L-Shape", multiplier: 2.45, icon: "sectional" },
  { id: "sofa-set", name: "Sofa Set", multiplier: 2.9, icon: "sofa-set" },
  { id: "other", name: "Other", multiplier: 1.6, icon: "furniture" }
];

// ============================================================================
// UPHOLSTERY PREFERENCES (STEP 3 IN INSTANT ESTIMATE)
// ============================================================================
export const UPHOLSTERY_PREFERENCES = [
  {
    id: "keep-existing",
    name: "Keep Existing Fabric",
    modifier: 0,
    thumb: "/assets/sofas/fabrics/linen.jpg"
  },
  {
    id: "new-fabric",
    name: "New Fabric",
    modifier: 2200,
    thumb: "/assets/sofas/fabrics/velvet.jpg" // Rich reddish fabric swatch like screenshot
  },
  {
    id: "leather",
    name: "Leather / Leatherette",
    modifier: 3100,
    thumb: "/assets/sofas/fabrics/leatherette.jpg"
  },
  {
    id: "not-sure",
    name: "Not Sure",
    modifier: 1200,
    thumb: "/assets/sofas/fabrics/tweed.jpg"
  }
];

// ============================================================================
// DYNAMIC ESTIMATION CALCULATION ENGINE
// ============================================================================
export function calculateSofaRepairEstimate({
  selectedServiceIds = [],
  sofaTypeId = "3-seater",
  upholsteryId = "new-fabric"
}) {
  if (!selectedServiceIds || selectedServiceIds.length === 0) {
    return {
      minPrice: 0,
      maxPrice: 0,
      formattedRange: "₹0 – ₹0",
      breakdown: []
    };
  }

  const selectedServices = ALL_ESTIMATE_SERVICES.filter(s =>
    selectedServiceIds.includes(s.id)
  );

  const sofaType = SOFA_TYPES.find(t => t.id === sofaTypeId) || SOFA_TYPES[2];
  const upholstery = UPHOLSTERY_PREFERENCES.find(u => u.id === upholsteryId) || UPHOLSTERY_PREFERENCES[1];

  let rawServicesBase = 0;
  const breakdown = [];

  selectedServices.forEach(srv => {
    rawServicesBase += srv.basePrice;
    breakdown.push({
      label: srv.name,
      amount: srv.basePrice
    });
  });

  // Calculate with sofa type multiplier
  const scaledServices = rawServicesBase * sofaType.multiplier;

  // Add upholstery material component
  const upholsteryAmount = upholstery.modifier * (sofaType.multiplier * 0.75);

  const minTotal = Math.round((scaledServices + upholsteryAmount) / 100) * 100;
  // Upper range represents structural reinforcement and heavy-duty wear buffers (~35-40% higher)
  const maxTotal = Math.round((minTotal * 1.38) / 100) * 100;

  return {
    minPrice: minTotal,
    maxPrice: maxTotal,
    formattedRange: `₹ ${minTotal.toLocaleString("en-IN")} – ₹ ${maxTotal.toLocaleString("en-IN")}`,
    breakdown,
    sofaType,
    upholstery
  };
}

// ============================================================================
// 10 PREMIUM FABRICS FOR EVERY STYLE
// ============================================================================
export const SOFA_REPAIR_FABRICS = [
  {
    id: "linen",
    name: "Linen",
    img: "/assets/sofas/fabrics/linen.jpg",
    desc: "100% natural, breathable weave with organic slub texture.",
    durability: "35,000 Martindale Rubs (High Residential)",
    comfort: "Crisp, airy & naturally cool against skin",
    maintenance: "Gentle dry-clean or vacuum with soft brush attachment",
    waterResistant: "Moderate (Natural absorption)",
    recommendedFor: "Sunlit living rooms, casual coastal & modern Scandinavian decors",
    priceRange: "₹950 – ₹1,450 / meter"
  },
  {
    id: "cotton",
    name: "Cotton",
    img: "/assets/sofas/fabrics/cotton.jpg",
    desc: "Hypoallergenic heavy twill weave with high color retention.",
    durability: "40,000 Martindale Rubs",
    comfort: "Soft, gentle and skin-friendly for all seasons",
    maintenance: "Machine washable slipcovers or mild detergent spot cleaning",
    waterResistant: "Light (Treated options available)",
    recommendedFor: "Family sofas, kids play areas and everyday apartment seating",
    priceRange: "₹750 – ₹1,100 / meter"
  },
  {
    id: "velvet",
    name: "Velvet",
    img: "/assets/sofas/fabrics/velvet.jpg",
    desc: "Opulent micro-cut pile with high-sheen jewel-tone luster.",
    durability: "50,000 Martindale Rubs (Commercial Grade)",
    comfort: "Ultra-plush luxury sink-in softness",
    maintenance: "Steam vacuum or velvet nap brush; wipe spills immediately",
    waterResistant: "Treated stain guard repellent finish",
    recommendedFor: "Formal lounges, Chesterfield tufting and statement focal sofas",
    priceRange: "₹1,400 – ₹2,200 / meter"
  },
  {
    id: "suede",
    name: "Suede",
    img: "/assets/sofas/fabrics/suede.jpg",
    desc: "Ultra-fine napped microfiber with velvety matte finish.",
    durability: "45,000 Martindale Rubs",
    comfort: "Silky smooth, warm and soothing texture",
    maintenance: "Suede eraser for dry marks; moisture repellent spray",
    waterResistant: "Water beads on surface for quick wipe",
    recommendedFor: "Recliner armchairs, reading nooks and cinema suites",
    priceRange: "₹1,250 – ₹1,800 / meter"
  },
  {
    id: "leatherette",
    name: "Leatherette",
    img: "/assets/sofas/fabrics/leatherette.jpg",
    desc: "Breathable polyurethane leather with realistic grain embossing.",
    durability: "60,000 Martindale Rubs",
    comfort: "Supple, spill-proof and tear-resistant",
    maintenance: "Instant damp cloth wipe down; zero conditioning needed",
    waterResistant: "100% Waterproof & fluid proof",
    recommendedFor: "Homes with pets, dining bench backs and high-traffic spaces",
    priceRange: "₹1,100 – ₹1,650 / meter"
  },
  {
    id: "chenille",
    name: "Chenille",
    img: "/assets/sofas/fabrics/chenille.jpg",
    desc: "Fuzzy caterpillar yarn woven for dimensional rich depth.",
    durability: "40,000 Martindale Rubs",
    comfort: "Cozy, plush and inviting warmth",
    maintenance: "Regular vacuuming; gentle foam upholstery shampoo",
    waterResistant: "Moderate water repellency",
    recommendedFor: "Deep sectional chaises, large family L-shapes",
    priceRange: "₹1,050 – ₹1,550 / meter"
  },
  {
    id: "tweed",
    name: "Tweed",
    img: "/assets/sofas/fabrics/tweed.jpg",
    desc: "Multi-tonal woven wool-blend with heritage cross-hatch fibers.",
    durability: "55,000 Martindale Rubs",
    comfort: "Substantial, tailored and holds piping edges crisply",
    maintenance: "Dry extraction or brush vacuuming",
    waterResistant: "Naturally soil resistant",
    recommendedFor: "Mid-century armchairs, study rooms and library benches",
    priceRange: "₹1,200 – ₹1,750 / meter"
  },
  {
    id: "jute",
    name: "Jute",
    img: "/assets/sofas/fabrics/jute.jpg",
    desc: "Eco-friendly natural plant fibers blended with soft cotton core.",
    durability: "35,000 Martindale Rubs",
    comfort: "Textured, rustic and earthy tactile feel",
    maintenance: "Dry brush and spot cleaning only",
    waterResistant: "Low (Keep dry)",
    recommendedFor: "Boho chic living rooms, accent benches and patio interiors",
    priceRange: "₹850 – ₹1,200 / meter"
  },
  {
    id: "water-resistant",
    name: "Water Resistant",
    img: "/assets/sofas/fabrics/water_resistant.png",
    desc: "Nano-coated technical fabric causing liquids to bead into droplets.",
    durability: "65,000 Martindale Rubs",
    comfort: "Smooth woven cotton-canvas feel without rubbery stiffness",
    maintenance: "Liquid rolls off; dab with dry paper towel",
    waterResistant: "Hydrophobic shield (Hydrostatic rating > 1200mm)",
    recommendedFor: "Balcony sunrooms, households with toddlers or active dogs",
    priceRange: "₹1,300 – ₹1,900 / meter"
  },
  {
    id: "easy-clean",
    name: "Easy Clean",
    img: "/assets/sofas/fabrics/easy_clean.jpg",
    desc: "Smart-clean fiber barrier preventing coffee, wine and ink penetration.",
    durability: "70,000 Martindale Rubs",
    comfort: "Soft textured weave with invisible stain guard",
    maintenance: "Wipe with water and a microfiber cloth; no harsh soaps needed",
    waterResistant: "Repels oils, stains and liquids",
    recommendedFor: "Heavy entertaining spaces, open kitchen living areas",
    priceRange: "₹1,450 – ₹2,100 / meter"
  }
];

// ============================================================================
// 6 HOW IT WORKS STEPS (MATCHING SCREENSHOT)
// ============================================================================
export const RESTORE_PROCESS_STEPS = [
  {
    step: "1",
    title: "1. Select Service",
    desc: "Choose what your sofa needs.",
    icon: "service"
  },
  {
    step: "2",
    title: "2. Share Details",
    desc: "Sofa type, fabric preference & photos.",
    icon: "details"
  },
  {
    step: "3",
    title: "3. Get Estimate",
    desc: "See an estimated price range.",
    icon: "estimate"
  },
  {
    step: "4",
    title: "4. Expert Assessment",
    desc: "Our team inspects at your home.",
    icon: "assessment"
  },
  {
    step: "5",
    title: "5. Repair & Restore",
    desc: "Skilled artisans work with premium materials.",
    icon: "repair"
  },
  {
    step: "6",
    title: "6. Delivered to You",
    desc: "A refreshed and comfortable sofa.",
    icon: "delivery"
  }
];

// ============================================================================
// CUSTOMER REVIEWS (MATCHING SCREENSHOT)
// ============================================================================
export const SOFA_REPAIR_REVIEWS = [
  {
    id: "rev-1",
    name: "Priya S.",
    location: "Bengaluru",
    rating: 5,
    comment: "My old sofa looks brand new! Excellent workmanship and on-time delivery.",
    avatar: "/assets/restore-sofas/transform_1_after.png",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    sofaThumb: "/assets/restore-sofas/transform_1_after.png",
    verified: true,
    serviceUsed: "Leather Tear Repair & Foam Rejuvenation"
  },
  {
    id: "rev-2",
    name: "Rahul K.",
    location: "Hyderabad",
    rating: 5,
    comment: "Great fabric options and professional service. The team was very supportive.",
    avatar: "/assets/restore-sofas/transform_2_after.png",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    sofaThumb: "/assets/restore-sofas/transform_2_after.png",
    verified: true,
    serviceUsed: "Full 3-Seater Velvet Reupholstery"
  },
  {
    id: "rev-3",
    name: "Meera R.",
    location: "Chennai",
    rating: 5,
    comment: "Very happy with the sofa reupholstery. Quality work and reasonable pricing.",
    avatar: "/assets/restore-sofas/transform_3_after.png",
    userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    sofaThumb: "/assets/restore-sofas/transform_3_after.png",
    verified: true,
    serviceUsed: "Floral Couch Tufting & Reupholstery"
  }
];

// ============================================================================
// NEARBY SOFA REPAIR SPECIALISTS (WITH BENGALURU GPS FOR REAL GOOGLE MAPS)
// ============================================================================
export const NEARBY_SOFA_SPECIALISTS = [
  {
    id: "spec-1",
    name: "Farhan Upholstery & Sofa Works",
    badge: "Master Upholsterer",
    rating: 4.98,
    reviews: 184,
    distance: "1.8 km away",
    experience: "16+ Years Experience",
    address: "24th Main, HSR Layout Sector 2, Bengaluru",
    phone: "+91 98452 31204",
    coordinates: { lat: 12.9116, lng: 77.6389 },
    specializations: ["Tear Repair", "Reupholstery", "Leather Buffing", "Foam Rebuilding"],
    startingPrice: "₹499",
    doorstepVisit: true,
    workshopPickup: true,
    avatar: "/assets/restore-sofas/how_it_works_artisan.png"
  },
  {
    id: "spec-2",
    name: "Bengaluru Royal Couch Restorations",
    badge: "Heritage Furniture Specialist",
    rating: 4.95,
    reviews: 215,
    distance: "2.4 km away",
    experience: "22+ Years Experience",
    address: "100ft Road, Indiranagar, Bengaluru",
    phone: "+91 98860 45192",
    coordinates: { lat: 12.9719, lng: 77.6412 },
    specializations: ["Wooden Frame Repair", "Full Reupholstery", "Velvet Tufting", "Spring Tensioning"],
    startingPrice: "₹699",
    doorstepVisit: true,
    workshopPickup: true,
    avatar: "/assets/restore-sofas/how_it_works_artisan.png"
  },
  {
    id: "spec-3",
    name: "Classic Cushion & Leather Studio",
    badge: "Certified Upholstery Guild",
    rating: 4.92,
    reviews: 142,
    distance: "3.2 km away",
    experience: "14+ Years Experience",
    address: "5th Block, Koramangala, Bengaluru",
    phone: "+91 97411 88301",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    specializations: ["Deep Cleaning", "Cushion Foam Replacement", "Italian Leather Conditioning"],
    startingPrice: "₹399",
    doorstepVisit: true,
    workshopPickup: true,
    avatar: "/assets/restore-sofas/how_it_works_artisan.png"
  },
  {
    id: "spec-4",
    name: "Karnataka Foam & Frame Atelier",
    badge: "Structural Frame Master",
    rating: 4.90,
    reviews: 98,
    distance: "4.1 km away",
    experience: "18+ Years Experience",
    address: "4th Block, Jayanagar, Bengaluru",
    phone: "+91 99002 67451",
    coordinates: { lat: 12.9250, lng: 77.5838 },
    specializations: ["Teakwood Framing", "Webbing & Belt Replacement", "Armrest Reconstruction"],
    startingPrice: "₹699",
    doorstepVisit: true,
    workshopPickup: true,
    avatar: "/assets/restore-sofas/how_it_works_artisan.png"
  }
];

// Available Inspection Slots
export const ASSESSMENT_TIME_SLOTS = [
  "10:00 AM – 12:00 PM (Morning)",
  "12:00 PM – 02:00 PM (Afternoon)",
  "02:00 PM – 04:00 PM (Afternoon)",
  "04:00 PM – 06:00 PM (Evening)",
  "06:00 PM – 08:00 PM (Late Evening)"
];
