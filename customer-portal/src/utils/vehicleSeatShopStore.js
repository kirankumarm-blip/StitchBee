// ============================================================================
// STITCHBEEZ VEHICLE SEAT COVERS - SHOP & CREATE DATA STORE
// Exact UI reproduction data, catalog, and custom designer store
// ============================================================================

import { 
  getCart, 
  saveCart, 
  getWishlist, 
  saveWishlist, 
  toggleWishlist as globalToggleWishlist 
} from './bagsStore';

export const SEAT_SHOP_ASSETS = {
  hero: "/assets/shop-seat-cover/hero/hero.png",
  categories: {
    bikes: "/assets/shop-seat-cover/categories/bikes-scooters.png",
    cars: "/assets/shop-seat-cover/categories/cars.png",
    autos: "/assets/shop-seat-cover/categories/autos.png",
    buses: "/assets/shop-seat-cover/categories/buses.png",
    trucks: "/assets/shop-seat-cover/categories/trucks.png",
    vans: "/assets/shop-seat-cover/categories/vans-tempo.png",
    other: "/assets/shop-seat-cover/categories/other-vehicles.png"
  },
  products: {
    car: "/assets/shop-seat-cover/products/car-seat-cover.png",
    bike: "/assets/shop-seat-cover/products/bike-seat-cover.png",
    auto: "/assets/shop-seat-cover/products/auto-seat-cover.png",
    bus: "/assets/shop-seat-cover/products/bus-seat-cover.png",
    truck: "/assets/shop-seat-cover/products/truck-seat-cover.png",
    van: "/assets/shop-seat-cover/products/van-seat-cover.png"
  },
  customDesign: {
    sketchToSeat: "/assets/shop-seat-cover/custom-design/Custom Automotive Seat Design Infographic.png"
  },
  materials: {
    leatherette: "/assets/shop-seat-cover/materials/leatherette.jpg",
    genuineLeather: "/assets/shop-seat-cover/materials/genuine-leather.jpg",
    premiumFabric: "/assets/shop-seat-cover/materials/premium-fabric.jpg",
    suede: "/assets/shop-seat-cover/materials/suede.jpg",
    meshFabric: "/assets/shop-seat-cover/materials/mesh-fabric.jpg",
    waterResistant: "/assets/shop-seat-cover/materials/water-resistant.png",
    antiSlip: "/assets/shop-seat-cover/materials/anti-slip.jpg",
    uvResistant: "/assets/shop-seat-cover/materials/uv-resistant.jpg",
    easyClean: "/assets/shop-seat-cover/materials/easy-clean.jpg"
  },
  whyChooseUs: {
    bg: "/assets/shop-seat-cover/why-choose-us/why-choose-bg.png"
  },
  banners: {
    comfortRoadAhead: "/assets/shop-seat-cover/banners/comfort-road-ahead.png"
  },
  transformations: {
    car: {
      before: "/assets/shop-seat-cover/transformations/before-car.png",
      after: "/assets/shop-seat-cover/transformations/after-car.png"
    },
    bike: {
      before: "/assets/shop-seat-cover/transformations/before-bike.png",
      after: "/assets/shop-seat-cover/transformations/after-bike.png"
    },
    auto: {
      before: "/assets/shop-seat-cover/transformations/before-auto.png",
      after: "/assets/shop-seat-cover/transformations/after-auto.png"
    },
    bus: {
      before: "/assets/shop-seat-cover/transformations/before-bus.png",
      after: "/assets/shop-seat-cover/transformations/after-bus.png"
    },
    truck: {
      before: "/assets/shop-seat-cover/transformations/before-truck.png",
      after: "/assets/shop-seat-cover/transformations/after-truck.png"
    },
    van: {
      before: "/assets/shop-seat-cover/transformations/before-van.png",
      after: "/assets/shop-seat-cover/transformations/after-van.png"
    }
  },
  reviews: {
    arjun: "/assets/shop-seat-cover/reviews/arjun.jpg",
    ramesh: "/assets/shop-seat-cover/reviews/ramesh.jpg",
    suresh: "/assets/shop-seat-cover/reviews/suresh.jpg"
  }
};

// ============================================================================
// 7 VEHICLE CATEGORIES (EXACT SCREENSHOT MAPPING)
// ============================================================================
export const VEHICLE_CATEGORIES = [
  {
    id: "bikes-scooters",
    name: "Bikes & Scooters",
    desc: "Sporty, stylish and durable seat covers",
    img: SEAT_SHOP_ASSETS.categories.bikes,
    vehicleType: "bike"
  },
  {
    id: "cars",
    name: "Cars",
    desc: "Premium seat covers for all car models",
    img: SEAT_SHOP_ASSETS.categories.cars,
    vehicleType: "car"
  },
  {
    id: "autos",
    name: "Autos",
    desc: "Strong and comfortable seat covers",
    img: SEAT_SHOP_ASSETS.categories.autos,
    vehicleType: "auto"
  },
  {
    id: "buses",
    name: "Buses",
    desc: "Heavy-duty seat covers for long journeys",
    img: SEAT_SHOP_ASSETS.categories.buses,
    vehicleType: "bus"
  },
  {
    id: "trucks",
    name: "Trucks",
    desc: "Rugged and weather-resistant covers",
    img: SEAT_SHOP_ASSETS.categories.trucks,
    vehicleType: "truck"
  },
  {
    id: "vans-tempo",
    name: "Vans & Tempo",
    desc: "Custom seat covers for commercial use",
    img: SEAT_SHOP_ASSETS.categories.vans,
    vehicleType: "van"
  },
  {
    id: "other-vehicles",
    name: "Other Vehicles",
    desc: "Agriculture, construction and more",
    img: SEAT_SHOP_ASSETS.categories.other,
    vehicleType: "other"
  }
];

// ============================================================================
// FEATURED PRODUCTS COLLECTION (6 EXACT SCREENSHOT PRODUCTS)
// ============================================================================
export const FEATURED_PRODUCTS = [
  {
    id: "prod-car-seat-cover",
    name: "Premium Car Seat Cover",
    price: 2999,
    formattedPrice: "₹2,999",
    originalPrice: 4499,
    rating: 4.9,
    reviewsCount: 142,
    category: "cars",
    vehicleType: "car",
    img: SEAT_SHOP_ASSETS.products.car,
    gallery: [
      SEAT_SHOP_ASSETS.products.car,
      SEAT_SHOP_ASSETS.hero,
      SEAT_SHOP_ASSETS.transformations.car.after
    ],
    swatches: [
      { id: "black", name: "Onyx Black", hex: "#1c1917" },
      { id: "red", name: "Crimson Red", hex: "#991b1b" },
      { id: "brown", name: "Saddle Brown", hex: "#78350f" },
      { id: "tan", name: "Cognac Tan", hex: "#d97706" }
    ],
    description: "Handcrafted high-density automotive leatherette seat covers with double diamond quilting, high-tensile piping, and memory foam padding. Compatible with front and rear car seats.",
    features: [
      "Custom molded to vehicle seat contour",
      "Airbag seam release certified",
      "Breathable perforated central bolster",
      "Spill & stain repellent topcoat",
      "Doorstep fitment available across Bengaluru"
    ],
    material: "Automotive Grade Leatherette",
    stitching: "Diamond Contrast Quilt",
    seatCoverage: "Full 360° Wrap",
    warranty: "2 Years Stitching & Color Warranty"
  },
  {
    id: "prod-bike-seat-cover",
    name: "Bike Seat Cover",
    price: 799,
    formattedPrice: "₹799",
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 236,
    category: "bikes-scooters",
    vehicleType: "bike",
    img: SEAT_SHOP_ASSETS.products.bike,
    gallery: [
      SEAT_SHOP_ASSETS.products.bike,
      SEAT_SHOP_ASSETS.transformations.bike.after,
      SEAT_SHOP_ASSETS.categories.bikes
    ],
    swatches: [
      { id: "black", name: "Matte Black", hex: "#18181b" },
      { id: "carbon", name: "Carbon Grey", hex: "#3f3f46" },
      { id: "navy", name: "Touring Navy", hex: "#1e3a8a" },
      { id: "grey", name: "Ash Grey", hex: "#71717a" }
    ],
    description: "Heavy-duty anti-slip bike saddle cover with waterproof laminated membrane and sporty contrast red piping. Engineered for ergonomic comfort on long daily commutes.",
    features: [
      "Anti-skid grip pattern for safety",
      "Waterproof heat-sealed seams",
      "UV-protected against tropical sunlight fading",
      "Elasticated hem with heavy-duty tension straps",
      "Direct slip-on fit for all major bike models"
    ],
    material: "Weatherproof Carbon Texture PU",
    stitching: "Reinforced Overlock Piping",
    seatCoverage: "Single Saddle / Split Rider & Pillion",
    warranty: "1 Year Waterproof Warranty"
  },
  {
    id: "prod-auto-seat-cover",
    name: "Auto Seat Cover",
    price: 1499,
    formattedPrice: "₹1,499",
    originalPrice: 2199,
    rating: 4.9,
    reviewsCount: 98,
    category: "autos",
    vehicleType: "auto",
    img: SEAT_SHOP_ASSETS.products.auto,
    gallery: [
      SEAT_SHOP_ASSETS.products.auto,
      SEAT_SHOP_ASSETS.transformations.auto.after,
      SEAT_SHOP_ASSETS.categories.autos
    ],
    swatches: [
      { id: "black", name: "Commercial Black", hex: "#171717" },
      { id: "red", name: "Racing Red", hex: "#b91c1c" },
      { id: "blue", name: "Royal Blue", hex: "#1d4ed8" },
      { id: "grey", name: "Steel Grey", hex: "#52525b" }
    ],
    description: "Rugged two-tone high-mileage auto rickshaw seat covers. Built with tear-proof reinforced vinyl and dense foam cushioning to withstand 12+ hours of rigorous daily driving.",
    features: [
      "Ultra-durable 1.4mm commercial grade vinyl",
      "Ergonomic lumbar support padding for driver",
      "Full passenger bench cover included",
      "Easy wash down with damp cloth or hose",
      "Rust-proof zinc-plated brass eyelets"
    ],
    material: "Heavy-Duty Vinyl & Leatherette",
    stitching: "Dual Flute Ribbed Seam",
    seatCoverage: "Driver Bucket + Rear Passenger Bench",
    warranty: "18 Months Heavy-Duty Wear Guarantee"
  },
  {
    id: "prod-bus-seat-cover",
    name: "Bus Seat Cover (Set)",
    price: 4999,
    formattedPrice: "₹4,999",
    originalPrice: 7499,
    rating: 4.9,
    reviewsCount: 64,
    category: "buses",
    vehicleType: "bus",
    img: SEAT_SHOP_ASSETS.products.bus,
    gallery: [
      SEAT_SHOP_ASSETS.products.bus,
      SEAT_SHOP_ASSETS.transformations.bus.after,
      SEAT_SHOP_ASSETS.categories.buses
    ],
    swatches: [
      { id: "blue", name: "Coach Blue", hex: "#1e40af" },
      { id: "navy", name: "Deep Navy", hex: "#0f172a" },
      { id: "red", name: "Crimson", hex: "#991b1b" },
      { id: "grey", name: "Granite Grey", hex: "#475569" }
    ],
    description: "Premium coach and commercial passenger bus seat cover set. Crafted with stain-resistant breathable fabric, plush foam backing, and heavy-duty hook-and-loop anchors.",
    features: [
      "Sets available for 12, 24, 32, 45, and 54 seater buses",
      "Flame-retardant automotive safety certified",
      "High-traffic anti-abrasion woven jacquard",
      "Integrated magazine pocket and headrest wrap",
      "Bulk institutional doorstep installation"
    ],
    material: "Commercial Jacquard Fabric & Vinyl",
    stitching: "High-Tensile Industrial Overlock",
    seatCoverage: "2x2 / 2x1 Passenger Recliner Sets",
    warranty: "2 Years Commercial Transport Warranty"
  },
  {
    id: "prod-truck-seat-cover",
    name: "Truck Seat Cover",
    price: 2499,
    formattedPrice: "₹2,499",
    originalPrice: 3499,
    rating: 4.8,
    reviewsCount: 82,
    category: "trucks",
    vehicleType: "truck",
    img: SEAT_SHOP_ASSETS.products.truck,
    gallery: [
      SEAT_SHOP_ASSETS.products.truck,
      SEAT_SHOP_ASSETS.transformations.truck.after,
      SEAT_SHOP_ASSETS.categories.trucks
    ],
    swatches: [
      { id: "black", name: "Tough Black", hex: "#0a0a0a" },
      { id: "tan", name: "Amber Tan", hex: "#b45309" },
      { id: "brown", name: "Mocha Brown", hex: "#451a03" },
      { id: "beige", name: "Desert Beige", hex: "#a16207" }
    ],
    description: "Heavy commercial long-haul truck driver seat covers with orthopedic lumbar support padding and tough ballistic canvas bolsters. Built for cross-country highway endurance.",
    features: [
      "Custom fit for Tata, Ashok Leyland, BharatBenz, Eicher",
      "Air-suspension seat compatible bellows fitment",
      "Heat-dissipating center mesh channel",
      "Heavy-duty double reinforced stress points",
      "Pocket organizer for toll slips and documents"
    ],
    material: "Ballistic Canvas & Diamond Leatherette",
    stitching: "Industrial Bonded Nylon Stitch",
    seatCoverage: "High-Back Driver + Co-Driver Seats",
    warranty: "2 Years Highway Durability Warranty"
  },
  {
    id: "prod-van-seat-cover",
    name: "Van Seat Cover",
    price: 2199,
    formattedPrice: "₹2,199",
    originalPrice: 3299,
    rating: 4.8,
    reviewsCount: 110,
    category: "vans-tempo",
    vehicleType: "van",
    img: SEAT_SHOP_ASSETS.products.van,
    gallery: [
      SEAT_SHOP_ASSETS.products.van,
      SEAT_SHOP_ASSETS.transformations.van.after,
      SEAT_SHOP_ASSETS.categories.vans
    ],
    swatches: [
      { id: "black", name: "Charcoal Black", hex: "#1f2937" },
      { id: "grey", name: "Executive Grey", hex: "#4b5563" },
      { id: "blue", name: "Deep Sea Blue", hex: "#1e3a8a" },
      { id: "white", name: "Oyster Silver", hex: "#94a3b8" }
    ],
    description: "Sophisticated diamond stitched seat covers for passenger vans, tempos, and multi-utility vehicles (Traveller, Carnival, Carens, Ertiga, Innova).",
    features: [
      "Individual captain chair and bench slipcover sizing",
      "Child-seat ISOFIX anchor access slits",
      "Easy wipe-clean surface for family and tour travel",
      "Plush 10mm high-density backing foam",
      "Quick slip-on hook installation"
    ],
    material: "Luxury Soft-Touch Leatherette",
    stitching: "Diamond Cross Stitch",
    seatCoverage: "Captain Chairs / 7-9 Seater Layouts",
    warranty: "2 Years Stitching Warranty"
  }
];

export const ALL_SEAT_PRODUCTS = [
  ...FEATURED_PRODUCTS,
  {
    id: "prod-car-nappa-luxury",
    name: "Executive Nappa 360° Car Seat Set",
    price: 4299,
    formattedPrice: "₹4,299",
    originalPrice: 5999,
    rating: 5.0,
    reviewsCount: 88,
    category: "cars",
    vehicleType: "car",
    img: SEAT_SHOP_ASSETS.hero,
    gallery: [
      SEAT_SHOP_ASSETS.hero,
      SEAT_SHOP_ASSETS.products.car,
      SEAT_SHOP_ASSETS.transformations.car.after
    ],
    swatches: [
      { id: "tan", name: "Cognac Tan", hex: "#b45309" },
      { id: "black", name: "Onyx Black", hex: "#1c1917" },
      { id: "brown", name: "Mocha Brown", hex: "#451a03" }
    ],
    description: "Ultra-luxurious Italian Nappa grain leatherette with full 360° wrap protection, memory foam orthopedic bolster inserts, and breathable perforations.",
    features: [
      "Custom laser-cut for Creta, Seltos, XUV700, Thar, Fortuner",
      "Airbag seam release certified",
      "Spill-proof and anti-scuff topcoat",
      "Doorstep fitment included"
    ],
    material: "Executive Nappa Leatherette",
    stitching: "Hexagon Sport Quilt",
    seatCoverage: "Full 5/7 Seater Rows",
    warranty: "3 Years Color & Tear Warranty"
  },
  {
    id: "prod-car-sport-suede",
    name: "Sport Alcantara Suede Bucket Seat Covers",
    price: 3499,
    formattedPrice: "₹3,499",
    originalPrice: 4899,
    rating: 4.9,
    reviewsCount: 76,
    category: "cars",
    vehicleType: "car",
    img: SEAT_SHOP_ASSETS.products.car,
    gallery: [
      SEAT_SHOP_ASSETS.products.car,
      SEAT_SHOP_ASSETS.transformations.car.after
    ],
    swatches: [
      { id: "black", name: "Anthracite Black", hex: "#18181b" },
      { id: "red", name: "Racing Red", hex: "#dc2626" },
      { id: "grey", name: "Slate Grey", hex: "#4b5563" }
    ],
    description: "High-friction sport micro-suede center inserts with leatherette outer bolsters preventing lateral slip during spirited driving.",
    features: [
      "Sport bucket seat contouring",
      "Hydrophobic spill resistance",
      "Cool touch in hot summers"
    ],
    material: "Alcantara Spec Suede & Leatherette",
    stitching: "Red Contrast Double Needle",
    seatCoverage: "Front Buckets / Full Set",
    warranty: "2 Years Stitching Warranty"
  },
  {
    id: "prod-bike-touring-gel",
    name: "Royal Tourer Orthopedic Gel Bike Saddle",
    price: 1299,
    formattedPrice: "₹1,299",
    originalPrice: 1799,
    rating: 4.9,
    reviewsCount: 164,
    category: "bikes-scooters",
    vehicleType: "bike",
    img: SEAT_SHOP_ASSETS.products.bike,
    gallery: [
      SEAT_SHOP_ASSETS.products.bike,
      SEAT_SHOP_ASSETS.transformations.bike.after
    ],
    swatches: [
      { id: "black", name: "Matte Black", hex: "#18181b" },
      { id: "brown", name: "Vintage Tan", hex: "#78350f" }
    ],
    description: "Built-in medical grade silicone gel pad with contoured tailbone groove. Eliminates saddle numbness on Royal Enfield and cruiser highway tours.",
    features: [
      "Integrated 15mm shock-absorbing gel layer",
      "Weatherproof heat-sealed seams",
      "Anti-slip pillion grip"
    ],
    material: "Heavy-Duty Vinyl & Gel Insert",
    stitching: "Diamond Touring Quilting",
    seatCoverage: "Split Rider + Pillion Set",
    warranty: "2 Years Comfort Warranty"
  },
  {
    id: "prod-auto-comfort-passenger",
    name: "Auto Rickshaw Commercial Heavy-Duty Set",
    price: 1899,
    formattedPrice: "₹1,899",
    originalPrice: 2699,
    rating: 4.8,
    reviewsCount: 52,
    category: "autos",
    vehicleType: "auto",
    img: SEAT_SHOP_ASSETS.products.auto,
    gallery: [
      SEAT_SHOP_ASSETS.products.auto,
      SEAT_SHOP_ASSETS.transformations.auto.after
    ],
    swatches: [
      { id: "black", name: "Black & Yellow", hex: "#1c1917" },
      { id: "red", name: "Red & Black", hex: "#991b1b" }
    ],
    description: "Complete cabin overhaul set including reinforced driver bucket cushion and full three-passenger bench with high-density foam backing.",
    features: [
      "1.4mm commercial vinyl",
      "Rain & mud washable",
      "Heavy brass eyelets with tension cords"
    ],
    material: "Commercial Heavy Vinyl",
    stitching: "Double Flute Seam",
    seatCoverage: "Driver Seat + Passenger Bench",
    warranty: "18 Months Guarantee"
  },
  {
    id: "prod-bus-coach-jacquard",
    name: "Luxury Coach 2x2 Recliner Covers (Set of 10)",
    price: 8999,
    formattedPrice: "₹8,999",
    originalPrice: 12999,
    rating: 4.9,
    reviewsCount: 39,
    category: "buses",
    vehicleType: "bus",
    img: SEAT_SHOP_ASSETS.products.bus,
    gallery: [
      SEAT_SHOP_ASSETS.products.bus,
      SEAT_SHOP_ASSETS.transformations.bus.after
    ],
    swatches: [
      { id: "blue", name: "Coach Royal Blue", hex: "#1d4ed8" },
      { id: "crimson", name: "Executive Crimson", hex: "#b91c1c" }
    ],
    description: "High-traffic commercial jacquard fabric seat covers with Velcro headrest wraps and integrated magazine netting for tourist buses.",
    features: [
      "Fire retardant standard certified",
      "Stain-shield fabric protection",
      "Bulk fleet discounts available"
    ],
    material: "Jacquard Fabric & Marine Vinyl",
    stitching: "Industrial Overlock Stitch",
    seatCoverage: "10-Seat Set (5 Pairs of 2x2 Recliners)",
    warranty: "2 Years Fleet Wear Warranty"
  },
  {
    id: "prod-truck-bellows-suspension",
    name: "Truck Driver Air-Suspension High-Back Cover",
    price: 2999,
    formattedPrice: "₹2,999",
    originalPrice: 4199,
    rating: 4.8,
    reviewsCount: 67,
    category: "trucks",
    vehicleType: "truck",
    img: SEAT_SHOP_ASSETS.products.truck,
    gallery: [
      SEAT_SHOP_ASSETS.products.truck,
      SEAT_SHOP_ASSETS.transformations.truck.after
    ],
    swatches: [
      { id: "black", name: "Highway Black", hex: "#0f172a" },
      { id: "brown", name: "Earth Brown", hex: "#451a03" }
    ],
    description: "Engineered specifically for driver air-suspension high-back seats in Tata Prima, BharatBenz, and Ashok Leyland heavy haulers.",
    features: [
      "Bellows-compatible flexible skirt",
      "Ballistic tear-proof canvas bolsters",
      "Lumbar support insert pocket"
    ],
    material: "Ballistic Canvas & Diamond PU",
    stitching: "Reinforced Triple Seam",
    seatCoverage: "Driver Seat with Armrest Sleeves",
    warranty: "2 Years Heavy Duty Warranty"
  },
  {
    id: "prod-other-tractor-seat",
    name: "Heavy-Duty Agricultural Tractor Weatherproof Seat",
    price: 1499,
    formattedPrice: "₹1,499",
    originalPrice: 2199,
    rating: 4.8,
    reviewsCount: 44,
    category: "other-vehicles",
    vehicleType: "other",
    img: SEAT_SHOP_ASSETS.categories.other,
    gallery: [
      SEAT_SHOP_ASSETS.categories.other
    ],
    swatches: [
      { id: "black", name: "Field Black", hex: "#18181b" },
      { id: "yellow", name: "Industrial Yellow", hex: "#eab308" }
    ],
    description: "UV-stabilized, waterproof pan seat cover for agricultural tractors (Mahindra, John Deere, Swaraj, Massey Ferguson) and construction forklifts.",
    features: [
      "100% monsoonal waterproof PVC",
      "UV-inhibitor formulation prevents cracking",
      "High-density drainage foam cushion"
    ],
    material: "Tear-Proof Agricultural Vinyl",
    stitching: "Waterproof Heat Welded Seams",
    seatCoverage: "Single Operator Pan / Suspension Seat",
    warranty: "2 Years Farm Weather Warranty"
  }
];

export function getVehicleSeatCategoryById(categoryId) {
  if (!categoryId || categoryId === 'all') {
    return {
      id: 'all',
      name: 'All Vehicle Seat Covers',
      desc: 'Browse our complete catalog of precision-fit custom and ready-made seat covers for all vehicle types.',
      img: SEAT_SHOP_ASSETS.hero,
      vehicleType: 'all'
    };
  }
  return VEHICLE_CATEGORIES.find(c => c.id === categoryId || c.vehicleType === categoryId) || {
    id: categoryId,
    name: categoryId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    desc: 'Explore custom tailored vehicle seat covers.',
    img: SEAT_SHOP_ASSETS.hero,
    vehicleType: categoryId
  };
}

export function getVehicleSeatProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') {
    return ALL_SEAT_PRODUCTS;
  }
  return ALL_SEAT_PRODUCTS.filter(p => p.category === categoryId || p.vehicleType === categoryId);
}

// ============================================================================
// 9 PREMIUM MATERIAL OPTIONS (EXACT SCREENSHOT MAPPING)
// ============================================================================
export const PREMIUM_MATERIALS = [
  {
    id: "leatherette",
    name: "Leatherette",
    img: SEAT_SHOP_ASSETS.materials.leatherette,
    desc: "1.2mm automotive grade cast PVC with high-tensile backing. Resists tropical heat and daily scuffs.",
    durability: "4.9 / 5 (Fade & Tear Proof)",
    waterResistance: "100% Waterproof",
    comfort: "Supple, Smooth & Breathable",
    recommendedVehicles: "Cars, SUVs, Delivery Vans, Daily Commuter Bikes",
    priceTier: "Popular (₹999 – ₹3,500)",
    availableColors: ["Black", "Cognac Tan", "Crimson Red", "Mocha Brown", "Beige"],
    care: "Wipe with damp microfiber cloth and mild soap solution."
  },
  {
    id: "genuine-leather",
    name: "Genuine Leather",
    img: SEAT_SHOP_ASSETS.materials.genuineLeather,
    desc: "Top-grain automotive hide with natural pebble grain. Luxuriously supple, develops a rich patina over time.",
    durability: "5.0 / 5 (Heirloom Grade)",
    waterResistance: "Conditioned Water Beading",
    comfort: "Ultimate Luxury Body-Conforming Breathability",
    recommendedVehicles: "Luxury Sedans, Sports Cars, Premium Cruiser Bikes",
    priceTier: "Ultra Luxury (₹6,500 – ₹18,000)",
    availableColors: ["Espresso Brown", "Tan", "Obsidian Black", "Burgundy"],
    care: "Treat every 6 months with leather conditioner balm."
  },
  {
    id: "premium-fabric",
    name: "Premium Fabric",
    img: SEAT_SHOP_ASSETS.materials.premiumFabric,
    desc: "Intricately woven jacquard textured textile designed for all-season climate temperature regulation.",
    durability: "4.7 / 5 (High-Abrasion Martindale 50k)",
    waterResistance: "Stain Repellent Coated",
    comfort: "Cool In Summers, Warm In Winters",
    recommendedVehicles: "Family Cars, Tour Buses, Long Haul Tempo Travellers",
    priceTier: "Standard (₹899 – ₹2,800)",
    availableColors: ["Burgundy Jacquard", "Royal Blue", "Slate Grey", "Oatmeal"],
    care: "Vacuum regularly and spot clean with upholstery foam spray."
  },
  {
    id: "suede",
    name: "Suede",
    img: SEAT_SHOP_ASSETS.materials.suede,
    desc: "Velvety micro-suede (Alcantara style) for aggressive anti-slip driving grip and racing cockpit aesthetics.",
    durability: "4.8 / 5 (Reinforced Non-Pill Mesh)",
    waterResistance: "Hydrophobic Coated",
    comfort: "Ultra-High Grip & Sporty Velvety Feel",
    recommendedVehicles: "Sports Bikes, Modified Hot Hatches, Bucket Seats",
    priceTier: "Premium (₹1,800 – ₹4,200)",
    availableColors: ["Anthracite Grey", "Cognac Tan", "Crimson", "Midnight Black"],
    care: "Brush gently with soft bristle suede brush."
  },
  {
    id: "mesh-fabric",
    name: "Mesh Fabric",
    img: SEAT_SHOP_ASSETS.materials.meshFabric,
    desc: "3D honeycomb porous weave providing continuous airflow for sweaty summer rides.",
    durability: "4.7 / 5 (High-Tensile Nylon)",
    waterResistance: "Quick-Dry Drainage",
    comfort: "Active Cool Ventilation",
    recommendedVehicles: "Motorcycles, Daily Scooters, Auto Rickshaws, Trucks",
    priceTier: "Affordable (₹699 – ₹1,800)",
    availableColors: ["Stealth Black", "Carbon Grey", "Electric Blue"],
    care: "Rinse freely with water; air dries in minutes."
  },
  {
    id: "water-resistant",
    name: "Water Resistant",
    img: SEAT_SHOP_ASSETS.materials.waterResistant,
    desc: "Nano-laminated heavy technical canvas resisting monsoon rain and liquid spills effortlessly.",
    durability: "4.9 / 5 (Tear-Proof Ballistic Yarn)",
    waterResistance: "100% Monsoonal Waterproof",
    comfort: "Rugged & Weatherproof",
    recommendedVehicles: "All Bikes, Delivery Vans, Tractors, Autos",
    priceTier: "Popular (₹799 – ₹2,200)",
    availableColors: ["Matte Black", "Army Green", "Charcoal", "Navy"],
    care: "Hose down or wipe with moist sponge."
  },
  {
    id: "anti-slip",
    name: "Anti-Slip",
    img: SEAT_SHOP_ASSETS.materials.antiSlip,
    desc: "Embossed micro-tread surface preventing hard-braking rider forward slide during sudden stops.",
    durability: "4.8 / 5 (High Friction Abrasion)",
    waterResistance: "Waterproof Rubberized Backing",
    comfort: "Secure Locked Seating Posture",
    recommendedVehicles: "Bikes & Scooters, Commercial Cabs, Tractors",
    priceTier: "Standard (₹799 – ₹1,999)",
    availableColors: ["Grip Black", "Diamond Grip Red", "Tread Navy"],
    care: "Wipe with damp cloth."
  },
  {
    id: "uv-resistant",
    name: "UV Resistant",
    img: SEAT_SHOP_ASSETS.materials.uvResistant,
    desc: "Specially treated weave with UV-blocker pigments that do not bleach, crack, or fade under scorching sun.",
    durability: "4.9 / 5 (500+ Hours Direct Sun Tested)",
    waterResistance: "Weather Sealed",
    comfort: "Consistent Elasticity & Surface Softness",
    recommendedVehicles: "Open Jeeps, Open Tractors, Two-Wheelers, Buses",
    priceTier: "Popular (₹999 – ₹2,600)",
    availableColors: ["Cobalt Blue", "Desert Sand", "Graphite Grey"],
    care: "Clean with mild car wash soap and water."
  },
  {
    id: "easy-clean",
    name: "Easy Clean",
    img: SEAT_SHOP_ASSETS.materials.easyClean,
    desc: "Stain-repellent Teflon-coated barrier wiped clean with a simple damp cloth without absorbing stains.",
    durability: "5.0 / 5 (Scratch & Scuff Resistant)",
    waterResistance: "Repels Oils, Dust, Mud & Coffee",
    comfort: "Smooth & Low Maintenance",
    recommendedVehicles: "Commercial Taxis, Family Vans, Trucks, Autos",
    priceTier: "Popular (₹899 – ₹2,499)",
    availableColors: ["Beige", "Oyster White", "Grey", "Tan"],
    care: "Wipe spills instantly with tissue or damp cloth."
  }
];

// ============================================================================
// 6 WHY CHOOSE STITCHBEEZ BENEFITS (EXACT SCREENSHOT MAPPING)
// ============================================================================
export const WHY_CHOOSE_BENEFITS = [
  {
    id: "benefit-fit",
    title: "Perfect Fit for All Vehicles",
    desc: "Precision CAD laser pattern cutting tailored to exact seat contours.",
    icon: "ShieldCheck"
  },
  {
    id: "benefit-materials",
    title: "Premium & Durable Materials",
    desc: "Top-tier automotive vinyls, genuine leathers, and heavy-duty textiles.",
    icon: "Gem"
  },
  {
    id: "benefit-custom",
    title: "Custom Designs & Personalization",
    desc: "Choose stitching patterns, contrast piping, initials and embroidered badges.",
    icon: "PenTool"
  },
  {
    id: "benefit-artisans",
    title: "Skilled & Verified Artisans",
    desc: "Experienced master automotive upholsterers with 10+ years of craftsmanship.",
    icon: "UserCheck"
  },
  {
    id: "benefit-pricing",
    title: "Affordable Pricing",
    desc: "Direct-from-atelier prices with zero middleman markups and transparent billing.",
    icon: "Tag"
  },
  {
    id: "benefit-delivery",
    title: "On-Time Delivery",
    desc: "Prompt order dispatch and doorstep fitting across Bengaluru neighborhoods.",
    icon: "Truck"
  }
];

// ============================================================================
// BEFORE & AFTER TRANSFORMATIONS (EXACT SCREENSHOT MAPPING)
// ============================================================================
export const BEFORE_AFTER_TRANSFORMATIONS = [
  {
    id: "trans-car",
    title: "Car Seat Transformation",
    vehicleType: "Cars & SUVs",
    before: SEAT_SHOP_ASSETS.transformations.car.before,
    after: SEAT_SHOP_ASSETS.transformations.car.after,
    material: "Automotive Diamond Leatherette",
    stitching: "Red Contrast Double Diamond",
    duration: "1 Day Fitting",
    price: "₹2,999"
  },
  {
    id: "trans-bike",
    title: "Bike Seat Transformation",
    vehicleType: "Bikes & Scooters",
    before: SEAT_SHOP_ASSETS.transformations.bike.before,
    after: SEAT_SHOP_ASSETS.transformations.bike.after,
    material: "Weatherproof Carbon PU & Red Piping",
    stitching: "Ribbed Touring Grip",
    duration: "Same Day",
    price: "₹799"
  },
  {
    id: "trans-auto",
    title: "Auto Seat Transformation",
    vehicleType: "3-Wheeler Passenger Auto",
    before: SEAT_SHOP_ASSETS.transformations.auto.before,
    after: SEAT_SHOP_ASSETS.transformations.auto.after,
    material: "Two-Tone Cognac & Black Vinyl",
    stitching: "Dual Flute Lumbar Seam",
    duration: "4 Hours",
    price: "₹1,499"
  },
  {
    id: "trans-bus",
    title: "Bus Coach Seat Transformation",
    vehicleType: "Tourist Coach & Buses",
    before: SEAT_SHOP_ASSETS.transformations.bus.before,
    after: SEAT_SHOP_ASSETS.transformations.bus.after,
    material: "High-Traffic Jacquard & Marine Vinyl",
    stitching: "Industrial Overlock Reinforcement",
    duration: "2 Days (Full Coach)",
    price: "₹4,999 / Set"
  },
  {
    id: "trans-truck-van",
    title: "Truck & Van Seat Transformation",
    vehicleType: "Heavy Commercial Trucks & Vans",
    before: SEAT_SHOP_ASSETS.transformations.truck.before,
    after: SEAT_SHOP_ASSETS.transformations.truck.after,
    material: "Ballistic Canvas & Diamond Leatherette",
    stitching: "High-Tensile Quilted Pattern",
    duration: "1 Day",
    price: "₹2,499"
  }
];

// ============================================================================
// CUSTOMER REVIEWS (EXACT SCREENSHOT MAPPING)
// ============================================================================
export const CUSTOMER_REVIEWS = [
  {
    id: "rev-arjun",
    name: "Arjun S.",
    city: "Bengaluru",
    rating: 5,
    avatar: SEAT_SHOP_ASSETS.reviews.arjun,
    quote: "Amazing seat covers for my car. Perfect fit and premium quality. Totally worth it!",
    seatThumb: SEAT_SHOP_ASSETS.products.car,
    vehicleThumb: SEAT_SHOP_ASSETS.categories.cars,
    vehicle: "Mahindra XUV700"
  },
  {
    id: "rev-ramesh",
    name: "Ramesh K.",
    city: "Mysuru",
    rating: 5,
    avatar: SEAT_SHOP_ASSETS.reviews.ramesh,
    quote: "Our auto looks brand new! Very comfortable and durable covers. Great service.",
    seatThumb: SEAT_SHOP_ASSETS.products.auto,
    vehicleThumb: SEAT_SHOP_ASSETS.categories.autos,
    vehicle: "Bajaj RE Passenger Auto"
  },
  {
    id: "rev-suresh",
    name: "Suresh T.",
    city: "Hyderabad",
    rating: 5,
    avatar: SEAT_SHOP_ASSETS.reviews.suresh,
    quote: "Excellent quality for our bus seats. The team understood our needs and delivered on time.",
    seatThumb: SEAT_SHOP_ASSETS.products.bus,
    vehicleThumb: SEAT_SHOP_ASSETS.categories.buses,
    vehicle: "Ashok Leyland Tourist Coach"
  }
];

// ============================================================================
// 6 CUSTOM DESIGN STUDIO PROCESS CARDS (EXACT SCREENSHOT MAPPING)
// ============================================================================
export const DESIGN_STUDIO_STEPS = [
  {
    step: 1,
    title: "Upload Reference or Idea",
    desc: "Share your seat photo, Pinterest inspiration, or design sketch.",
    icon: "Upload"
  },
  {
    step: 2,
    title: "Choose Vehicle Type & Seat Size",
    desc: "Select brand, model, and seat configuration for laser precision fit.",
    icon: "Car"
  },
  {
    step: 3,
    title: "Select Material & Color",
    desc: "Explore leathers, suedes, fabrics, and custom color combinations.",
    icon: "Palette"
  },
  {
    step: 4,
    title: "Add Stitching & Features",
    desc: "Specify diamond quilting, piping, cooling perforations, or logos.",
    icon: "CheckCircle2"
  },
  {
    step: 5,
    title: "Get Preview & Quote",
    desc: "Instant upfront estimation and digital rendering before stitching starts.",
    icon: "FileText"
  },
  {
    step: 6,
    title: "Handcrafted & Delivered",
    desc: "Master artisans hand-stitch your covers and fit them at your doorstep.",
    icon: "Sparkles"
  }
];

// ============================================================================
// BOTTOM BENEFITS STRIP (EXACT SCREENSHOT MAPPING)
// ============================================================================
export const BOTTOM_BENEFITS = [
  { label: "All Vehicle Types", icon: "Car" },
  { label: "Premium Materials", icon: "Gem" },
  { label: "Custom Designs", icon: "PenTool" },
  { label: "Skilled Artisans", icon: "Wrench" },
  { label: "Doorstep Service", icon: "Truck" }
];

// ============================================================================
// VERIFIED NEARBY ARTISANS / TAILORS FOR VEHICLE SEATS
// ============================================================================
export const VEHICLE_ARTISANS = [
  {
    id: "artisan-auto-1",
    name: "Master Saleem Automotive & Bike Upholstery",
    rating: 4.9,
    reviews: 218,
    experience: "18+ Years",
    location: "Shivajinagar, Bengaluru (2.8 km away)",
    specialization: "Custom Motorcycle Saddles, Royal Enfield Touring Foam & Diamond Car Covers",
    doorstepAvailable: true,
    badge: "Certified Master Atelier",
    avatar: SEAT_SHOP_ASSETS.reviews.arjun
  },
  {
    id: "artisan-auto-2",
    name: "LuxeDrive Car Interior Atelier",
    rating: 4.8,
    reviews: 174,
    experience: "12+ Years",
    location: "Koramangala 4th Block, Bengaluru (4.1 km away)",
    specialization: "Nappa Leatherette 360° Fitment, Perforated Suede Inserts, SUV 7-Seaters",
    doorstepAvailable: true,
    badge: "Premium Verified",
    avatar: SEAT_SHOP_ASSETS.reviews.ramesh
  },
  {
    id: "artisan-auto-3",
    name: "Karnataka Commercial Bus & Auto Upholsterers",
    rating: 4.9,
    reviews: 312,
    experience: "22+ Years",
    location: "Yeshwanthpur Industrial Area, Bengaluru (6.5 km away)",
    specialization: "Heavy Commercial Bus Coach Recliners, Tempo Travellers, Fleet Bulk Covers",
    doorstepAvailable: true,
    badge: "Commercial Fleet Specialist",
    avatar: SEAT_SHOP_ASSETS.reviews.suresh
  }
];

// ============================================================================
// VEHICLE MODEL DIRECTORY FOR CUSTOM DESIGNER WIZARD
// ============================================================================
export const VEHICLE_BRANDS_MODELS = {
  car: {
    brands: ["Mahindra", "Tata Motors", "Hyundai", "Maruti Suzuki", "Toyota", "Kia", "Honda", "Volkswagen", "Skoda", "MG Motor"],
    models: {
      "Mahindra": ["Thar / Thar Roxx", "Scorpio-N", "XUV700", "XUV 3XO", "Bolero Neo"],
      "Tata Motors": ["Nexon", "Punch", "Harrier", "Safari", "Curvv", "Altroz"],
      "Hyundai": ["Creta", "Venue", "Verna", "Exter", "Alcazar", "Tucson"],
      "Maruti Suzuki": ["Brezza", "Grand Vitara", "Fronx", "Swift", "Baleno", "Ertiga", "Jimny"],
      "Toyota": ["Fortuner", "Innova Hycross", "Innova Crysta", "Urban Cruiser Taisor", "Glanza"],
      "Kia": ["Seltos", "Sonet", "Carens", "EV6"],
      "Honda": ["Elevate", "City 5th Gen", "Amaze"],
      "Volkswagen": ["Taigun", "Virtus"],
      "Skoda": ["Kushaq", "Slavia"],
      "MG Motor": ["Hector", "Astor", "ZS EV", "Gloster"]
    },
    configurations: ["Front Bucket Seats (2 Seats)", "Standard 4/5 Seater (2 Rows)", "7-Seater / 8-Seater (3 Rows)", "Captain Seat Layout"]
  },
  bike: {
    brands: ["Royal Enfield", "Honda", "Yamaha", "TVS", "Bajaj", "KTM", "Suzuki", "Hero MotoCorp", "Jawa / Yezdi"],
    models: {
      "Royal Enfield": ["Classic 350", "Hunter 350", "Meteor 350", "Himalayan 450", "Continental GT 650", "Interceptor 650"],
      "Honda": ["Activa 6G / 125", "Hness CB350", "Hornet 2.0", "Shine 125", "CB300R"],
      "Yamaha": ["R15 V4", "MT-15", "FZ-S Fi", "Aerox 155", "RayZR"],
      "TVS": ["Apache RTR 160/200", "Ronin 225", "Jupiter 110/125", "Ntorq 125"],
      "Bajaj": ["Pulsar N250", "Pulsar NS200", "Dominar 400", "Avenger Cruise 220"],
      "KTM": ["Duke 250", "Duke 390", "RC 390", "Adventure 390"],
      "Suzuki": ["Access 125", "Burgman Street", "Gixxer SF 250"],
      "Hero MotoCorp": ["Splendor Plus", "Xpulse 200 4V", "Mavrick 440", "Destini 125"],
      "Jawa / Yezdi": ["Jawa 350", "Yezdi Adventure", "Yezdi Scrambler"]
    },
    configurations: ["Single Continuous Bench", "Split Rider + Pillion Saddle", "Scooter Wide Ergonomic Bench", "Cafe Racer / Touring Sculpted"]
  },
  auto: {
    brands: ["Bajaj Auto", "Piaggio", "Mahindra", "TVS King", "Atul Auto"],
    models: {
      "Bajaj Auto": ["Bajaj RE Compact", "Bajaj Maxima Z", "Bajaj RE E-TEC 9.0"],
      "Piaggio": ["Ape City Plus", "Ape Auto DX", "Ape E-City"],
      "Mahindra": ["Alfa Passenger", "Treo EV"],
      "TVS King": ["TVS King Duramax", "TVS King Kargo"],
      "Atul Auto": ["Atul Gem Paxx", "Atul Elite"]
    },
    configurations: ["Driver Ergonomic Bucket + Rear Passenger Bench", "Driver Bench + Extended Passenger", "Cargo Front Cabin Only"]
  },
  bus: {
    brands: ["Ashok Leyland", "Tata Motors", "BharatBenz", "Volvo Buses", "Eicher Motors"],
    models: {
      "Ashok Leyland": ["Viking 2x2 Coach", "Oyster Tourist Bus", "MiTR Staff Bus"],
      "Tata Motors": ["Starbus Ultra", "Magna Luxury Coach", "CityRide Coach"],
      "BharatBenz": ["1624 Tourist Coach", "1017 High-Deck Bus"],
      "Volvo Buses": ["9600 Multi-Axle Intercity", "8400 Low Floor"],
      "Eicher Motors": ["Starline 24-Seater", "Skyline Pro Executive"]
    },
    configurations: ["12-Seater Executive Coach", "24-Seater Mini Bus", "32-Seater Tourist Coach", "45-54 Seater Intercity"]
  },
  truck: {
    brands: ["Tata Motors", "Ashok Leyland", "BharatBenz", "Eicher", "Mahindra Truck"],
    models: {
      "Tata Motors": ["Prima Commercial", "Signa 4825", "LPT 1918 Cowl"],
      "Ashok Leyland": ["AVTR 4220", "Captain Heavy Truck", "Boss 1415"],
      "BharatBenz": ["2823R Rigid Truck", "3528C Heavy Tipper"],
      "Eicher": ["Pro 3019", "Pro 6028 Tipper"],
      "Mahindra Truck": ["Blazo X 49", "Furio 16"]
    },
    configurations: ["Driver Air-Suspension High-Back Seat Only", "Driver + Co-Driver Cabin Set", "Driver + Sleeper Berth Mat"]
  },
  van: {
    brands: ["Force Motors", "Maruti Suzuki", "Tata Motors", "Mahindra", "Toyota"],
    models: {
      "Force Motors": ["Traveller 3050", "Traveller Royale", "Urbania 10/13/17 Seater"],
      "Maruti Suzuki": ["Eeco 5-Seater", "Eeco 7-Seater"],
      "Tata Motors": ["Winger Platinum", "Magic Express"],
      "Mahindra": ["Supro Maxi Truck / Passenger", "Bolero Camper"],
      "Toyota": ["HiAce Commuter", "Vellfire VIP Captains"]
    },
    configurations: ["Front 2 Captain Seats Only", "Full 7-Seater Passenger Layout", "12-17 Seater Traveller Van"]
  },
  other: {
    brands: ["Mahindra Tractor", "John Deere", "Swaraj", "Tafe", "JCB Heavy Machinery"],
    models: {
      "Mahindra Tractor": ["Yuvo Tech+ 585", "Arjun Novo 605"],
      "John Deere": ["5050 D 4WD", "5310 GearPro"],
      "Swaraj": ["744 XT", "855 FE"],
      "JCB Heavy Machinery": ["3DX Super Backhoe Loader", "4DX EcoXcellence"],
      "Tafe": ["Massey Ferguson 241 DI", "Dynatrack 246"]
    },
    configurations: ["Single Operator Shock-Absorbing Seat", "Heavy-Duty Weather-Proof Tractor Pan Seat", "Custom Industrial Vehicle"]
  }
};

// ============================================================================
// DYNAMIC PRICING CALCULATION FOR CUSTOM DESIGN QUOTE
// ============================================================================
export function calculateCustomDesignQuote({
  vehicleType = "car",
  materialId = "leatherette",
  stitchingStyle = "diamond",
  hasPerforation = false,
  hasLogoEmbroidery = false,
  seatConfiguration = "Standard 4/5 Seater (2 Rows)"
}) {
  let basePrice = 2499;

  // Vehicle type factor
  if (vehicleType === "bike") basePrice = 799;
  else if (vehicleType === "auto") basePrice = 1499;
  else if (vehicleType === "car") {
    if (seatConfiguration.includes("7") || seatConfiguration.includes("8")) basePrice = 4499;
    else if (seatConfiguration.includes("Front")) basePrice = 1899;
    else basePrice = 2999;
  } else if (vehicleType === "van") basePrice = 2799;
  else if (vehicleType === "truck") basePrice = 2499;
  else if (vehicleType === "bus") basePrice = 4999;
  else basePrice = 1299;

  // Material upgrades
  const materialAddons = {
    "leatherette": 0,
    "genuine-leather": 4500,
    "premium-fabric": 400,
    "suede": 1200,
    "mesh-fabric": 200,
    "water-resistant": 350,
    "anti-slip": 250,
    "uv-resistant": 450,
    "easy-clean": 300
  };
  const matAddon = materialAddons[materialId] || 0;

  // Stitching style addons
  const stitchingAddons = {
    "diamond": 300,
    "horizontal": 150,
    "vertical": 150,
    "plain": 0,
    "perforated": 350,
    "contrast": 200
  };
  const stitchAddon = stitchingAddons[stitchingStyle] || 0;

  const perfAddon = hasPerforation ? 250 : 0;
  const logoAddon = hasLogoEmbroidery ? 350 : 0;

  const totalEstimate = basePrice + matAddon + stitchAddon + perfAddon + logoAddon;
  const originalEstimate = Math.round(totalEstimate * 1.35);

  return {
    totalEstimate,
    originalEstimate,
    breakdown: {
      basePrice,
      materialAddon: matAddon,
      stitchingAddon: stitchAddon,
      extraFeaturesAddon: perfAddon + logoAddon
    }
  };
}

// ============================================================================
// CART & WISHLIST STORAGE HELPERS
// ============================================================================
export const getVehicleSeatWishlist = () => {
  return getWishlist();
};

export const toggleVehicleSeatWishlist = (productId) => {
  return globalToggleWishlist(productId);
};

export const isVehicleSeatInWishlist = (productId) => {
  const list = getWishlist();
  return list.includes(productId);
};

export const addVehicleSeatToCart = (item) => {
  const cart = getCart();
  const existingIndex = cart.findIndex(c => 
    c.id === item.id && 
    c.selectedColor === item.selectedColor
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
