// ============================================================================
// STITCHBEEZ VEHICLE SEAT COVER REPAIR & RESTORE DATA STORE
// Centralized asset mappings, vehicle pricing engine, materials & specialists
// ============================================================================

export const VEHICLE_SEAT_ASSETS = {
  hero: {
    main: "/assets/repair-vehicle-seats/hero.png",
    thumbnails: [
      { id: "bike", title: "Bike Seat", img: "/assets/repair-vehicle-seats/trans_bike_after.png" },
      { id: "auto", title: "Auto Seats", img: "/assets/repair-vehicle-seats/trans_auto_after.png" },
      { id: "bus", title: "Bus Seats", img: "/assets/repair-vehicle-seats/trans_bus_after.png" },
      { id: "car", title: "Car Seats", img: "/assets/repair-vehicle-seats/trans_car_after.png" }
    ]
  },
  vehicleTypes: {
    bike: "/assets/repair-vehicle-seats/vehicle_bikes.png",
    car: "/assets/repair-vehicle-seats/vehicle_cars.png",
    auto: "/assets/repair-vehicle-seats/vehicle_autos.png",
    bus: "/assets/repair-vehicle-seats/vehicle_buses.png",
    truck: "/assets/repair-vehicle-seats/vehicle_trucks.png",
    van: "/assets/repair-vehicle-seats/vehicle_vans.png",
    tractor: "/assets/repair-vehicle-seats/vehicle_tractors.png",
    other: "/assets/repair-vehicle-seats/vehicle_other.png"
  },
  services: {
    tearDamage: "/assets/repair-vehicle-seats/service_tear_damage.png",
    foam: "/assets/repair-vehicle-seats/service_foam.png",
    reupholstery: "/assets/repair-vehicle-seats/service_reupholstery.png",
    stitching: "/assets/repair-vehicle-seats/service_stitching.png",
    cleaning: "/assets/repair-vehicle-seats/service_cleaning.png",
    replacement: "/assets/repair-vehicle-seats/service_replacement.png"
  },
  estimateRight: "/assets/repair-vehicle-seats/estimate_right.png",
  restoreComfortBanner: "/assets/repair-vehicle-seats/restore_comfort_banner.png",
  whyStitchbeezHero: "/assets/repair-vehicle-seats/hero.png",
  transformations: [
    {
      id: "bike-seat",
      title: "Bike Seat",
      vehicleType: "bike-scooter",
      before: "/assets/repair-vehicle-seats/trans_bike_before.png",
      after: "/assets/repair-vehicle-seats/trans_bike_after.png",
      repairType: "Torn Outer Vinyl & Sunken Foam Rebuilding",
      materialUsed: "Anti-Slip Ribbed Hydrophobic PU",
      duration: "1 Day (Same Day)",
      price: "₹799"
    },
    {
      id: "car-seat",
      title: "Car Seat",
      vehicleType: "car",
      before: "/assets/repair-vehicle-seats/trans_car_before.png",
      after: "/assets/repair-vehicle-seats/trans_car_after.png",
      repairType: "Complete Front Bucket Reupholstery & Diamond Stitch",
      materialUsed: "Automotive Nappa Grade Leatherette (Black/Red)",
      duration: "2 Days",
      price: "₹2,499"
    },
    {
      id: "auto-seat",
      title: "Auto Seat",
      vehicleType: "auto",
      before: "/assets/repair-vehicle-seats/trans_auto_before.png",
      after: "/assets/repair-vehicle-seats/trans_auto_after.png",
      repairType: "Heavy-Duty Passenger Bench Foam & Restitching",
      materialUsed: "Waterproof High-Tensile Commercial Leatherette",
      duration: "1 Day",
      price: "₹1,299"
    },
    {
      id: "bus-seat",
      title: "Bus Seat",
      vehicleType: "bus",
      before: "/assets/repair-vehicle-seats/trans_bus_before.png",
      after: "/assets/repair-vehicle-seats/trans_bus_after.png",
      repairType: "Fleet High-Back Pushback Seat Fabric Renovation",
      materialUsed: "Flame-Retardant Jacquard Transit Fabric",
      duration: "3 Days (Fleet Batch)",
      price: "₹3,899"
    },
    {
      id: "truck-seat",
      title: "Truck Seat",
      vehicleType: "truck",
      before: "/assets/repair-vehicle-seats/trans_truck_before.png",
      after: "/assets/repair-vehicle-seats/trans_truck_after.png",
      repairType: "Heavy Truck Air-Suspension Driver Seat Re-Foaming",
      materialUsed: "Breathable Heavy-Gauge Mesh & Leatherette",
      duration: "2 Days",
      price: "₹1,899"
    },
    {
      id: "van-seat",
      title: "Van Seat",
      vehicleType: "van-tempo",
      before: "/assets/repair-vehicle-seats/trans_van_before.png",
      after: "/assets/repair-vehicle-seats/trans_van_after.png",
      repairType: "Passenger Captain Seats Bolster Alignment & Restitching",
      materialUsed: "Two-Tone Oyster Black Leatherette",
      duration: "2 Days",
      price: "₹2,199"
    }
  ]
};

// ============================================================================
// 8 VEHICLE TYPES (MATCHING SCREENSHOT EXACTLY)
// ============================================================================
export const VEHICLE_TYPES = [
  {
    id: "bike-scooter",
    name: "Bikes & Scooters",
    img: VEHICLE_SEAT_ASSETS.vehicleTypes.bike,
    multiplier: 1.0,
    baseStarting: 299,
    desc: "Single saddles, split seats & scooter benches"
  },
  {
    id: "car",
    name: "Cars",
    img: VEHICLE_SEAT_ASSETS.vehicleTypes.car,
    multiplier: 1.85,
    baseStarting: 799,
    desc: "Hatchbacks, Sedans, SUVs & 7-seaters"
  },
  {
    id: "auto",
    name: "Autos",
    img: VEHICLE_SEAT_ASSETS.vehicleTypes.auto,
    multiplier: 1.45,
    baseStarting: 499,
    desc: "3-wheeler passenger & cargo autos"
  },
  {
    id: "bus",
    name: "Buses",
    img: VEHICLE_SEAT_ASSETS.vehicleTypes.bus,
    multiplier: 3.5,
    baseStarting: 1899,
    desc: "Tourist coaches, mini-buses & school buses"
  },
  {
    id: "truck",
    name: "Trucks",
    img: VEHICLE_SEAT_ASSETS.vehicleTypes.truck,
    multiplier: 1.9,
    baseStarting: 899,
    desc: "Heavy commercial & interstate transport"
  },
  {
    id: "van-tempo",
    name: "Vans & Tempo",
    img: VEHICLE_SEAT_ASSETS.vehicleTypes.van,
    multiplier: 2.2,
    baseStarting: 1199,
    desc: "Commercial tempos, Travellers & passenger vans"
  },
  {
    id: "tractor",
    name: "Tractors",
    img: VEHICLE_SEAT_ASSETS.vehicleTypes.tractor,
    multiplier: 1.35,
    baseStarting: 499,
    desc: "Agricultural tractors & construction machinery"
  },
  {
    id: "other",
    name: "Other Vehicles",
    img: VEHICLE_SEAT_ASSETS.vehicleTypes.other,
    multiplier: 1.5,
    baseStarting: 599,
    desc: "Golf carts, vintage machinery & custom buggies"
  }
];

// ============================================================================
// 6 REPAIR SERVICES (MATCHING SCREENSHOT EXACTLY)
// ============================================================================
export const VEHICLE_SEAT_SERVICES = [
  {
    id: "tear-damage",
    name: "Tear & Damage Repair",
    desc: "Fix cuts, tears, worn-out stitching and surface damage.",
    basePrice: 299,
    formattedPrice: "₹299",
    img: VEHICLE_SEAT_ASSETS.services.tearDamage
  },
  {
    id: "foam-replacement",
    name: "Foam Replacement",
    desc: "Replace worn-out foam for better comfort.",
    basePrice: 499,
    formattedPrice: "₹499",
    img: VEHICLE_SEAT_ASSETS.services.foam
  },
  {
    id: "reupholstery",
    name: "Reupholstery",
    desc: "New look with premium fabric or leather.",
    basePrice: 699,
    formattedPrice: "₹699",
    img: VEHICLE_SEAT_ASSETS.services.reupholstery
  },
  {
    id: "stitching-repair",
    name: "Stitching Repair",
    desc: "Expert stitching for seams and joints.",
    basePrice: 199,
    formattedPrice: "₹199",
    img: VEHICLE_SEAT_ASSETS.services.stitching
  },
  {
    id: "seat-cleaning",
    name: "Seat Cleaning",
    desc: "Remove stains, dirt and odour. Refresh your seats.",
    basePrice: 399,
    formattedPrice: "₹399",
    img: VEHICLE_SEAT_ASSETS.services.cleaning
  },
  {
    id: "seat-cover-replacement",
    name: "Seat Cover Replacement",
    desc: "Complete new seat covers as per your choice.",
    basePrice: 799,
    formattedPrice: "₹799",
    img: VEHICLE_SEAT_ASSETS.services.replacement
  }
];

// ============================================================================
// 9 PREMIUM MATERIAL OPTIONS (MATCHING SCREENSHOT)
// ============================================================================
export const VEHICLE_SEAT_MATERIALS = [
  {
    id: "genuine-leather",
    name: "Genuine Leather",
    img: "/assets/sofas/fabrics/leatherette.jpg",
    desc: "Full-grain top-layer hide offering supple luxury and natural cooling pores.",
    durability: "5 / 5 (10+ Years Lifespan)",
    waterResistance: "Treated Hydrophobic Shield",
    comfort: "Supreme Executive Comfort",
    recommendedVehicles: "Cars, Luxury SUVs, Touring Motorbikes",
    priceTier: "Premium (₹2,200 – ₹3,800)"
  },
  {
    id: "leatherette",
    name: "Leatherette",
    img: "/assets/sofas/fabrics/leatherette.jpg",
    desc: "Automotive grade cast vinyl with realistic embossed grain and UV resistance.",
    durability: "4.8 / 5 (Resists cracking in tropical sun)",
    waterResistance: "100% Fluid & Spill Proof",
    comfort: "Supple & Easy Maintenance",
    recommendedVehicles: "Cars, Bikes, Vans, Commercial Fleets",
    priceTier: "Popular (₹899 – ₹1,600)"
  },
  {
    id: "premium-fabric",
    name: "Premium Fabric",
    img: "/assets/sofas/fabrics/velvet.jpg",
    desc: "Rich woven micro-fiber with breathable thermal comfort across seasons.",
    durability: "4.5 / 5 (45,000 Martindale Rubs)",
    waterResistance: "Treated Stain Repellent Guard",
    comfort: "Airy, soft & zero heat retention",
    recommendedVehicles: "Family Cars, Commuter Sedans, Buses",
    priceTier: "Standard (₹799 – ₹1,400)"
  },
  {
    id: "mesh-fabric",
    name: "Mesh Fabric",
    img: "/assets/sofas/fabrics/tweed.jpg",
    desc: "3D honeycomb porous weave providing continuous airflow for sweaty summer rides.",
    durability: "4.7 / 5 (High-Tensile Nylon)",
    waterResistance: "Quick Dry Drainage",
    comfort: "Active Cool Ventilation",
    recommendedVehicles: "Motorcycles, Daily Commuter Scooters, Truck Driver Seats",
    priceTier: "Affordable (₹699 – ₹1,200)"
  },
  {
    id: "suede",
    name: "Suede",
    img: "/assets/sofas/fabrics/suede.jpg",
    desc: "Velvety micro-suede (Alcantara style) for aggressive anti-slip driving grip.",
    durability: "4.6 / 5 (Reinforced Backing)",
    waterResistance: "Moisture Beading Coated",
    comfort: "Ultra-High Grip & Sporty Feel",
    recommendedVehicles: "Sports Bikes, Performance Cars, Bucket Seats",
    priceTier: "Luxury (₹1,800 – ₹2,900)"
  },
  {
    id: "water-resistant",
    name: "Water Resistant",
    img: "/assets/sofas/fabrics/water_resistant.png",
    desc: "Nano-laminated heavy canvas resisting monsoon rain and liquid spills.",
    durability: "4.9 / 5 (Tear-Proof Ballistic Yarn)",
    waterResistance: "100% Monsoonal Waterproof",
    comfort: "Rugged & Weatherproof",
    recommendedVehicles: "All Bikes, Delivery Vans, Tractors, Autos",
    priceTier: "Popular (₹799 – ₹1,350)"
  },
  {
    id: "anti-slip",
    name: "Anti-Slip",
    img: "/assets/sofas/fabrics/chenille.jpg",
    desc: "Embossed micro-tread surface preventing hard-braking rider forward slide.",
    durability: "4.8 / 5 (High Friction Abrasion)",
    waterResistance: "Waterproof Rubberized Backing",
    comfort: "Secure Locked Seating Posture",
    recommendedVehicles: "Bikes & Scooters, Commercial Cabs, Tractors",
    priceTier: "Standard (₹699 – ₹1,199)"
  },
  {
    id: "easy-clean",
    name: "Easy Clean",
    img: "/assets/sofas/fabrics/easy_clean.jpg",
    desc: "Stain-repellent barrier wiped clean with a simple damp microfiber cloth.",
    durability: "5 / 5 (Scratch & Scuff Resistant)",
    waterResistance: "Repels Oils, Dust & Mud",
    comfort: "Smooth & Low Maintenance",
    recommendedVehicles: "Commercial Taxis, Family Vans, Trucks, Autos",
    priceTier: "Popular (₹899 – ₹1,499)"
  },
  {
    id: "custom-prints",
    name: "Custom Prints",
    img: "/assets/sofas/fabrics/cotton.jpg",
    desc: "Vibrant UV-cured graphics, custom racing stripes, dual-tone badges and logos.",
    durability: "4.5 / 5 (Non-Fading Inks)",
    waterResistance: "Weather-Sealed Overcoat",
    comfort: "Personalized Statement Style",
    recommendedVehicles: "Custom Motorcycles, Modified Cars, School Vans",
    priceTier: "Special (₹1,200 – ₹2,200)"
  }
];

// ============================================================================
// DYNAMIC ESTIMATION CALCULATION ENGINE
// ============================================================================
export function calculateVehicleSeatEstimate({
  vehicleTypeId = "bike-scooter",
  selectedServiceIds = ["tear-damage", "foam-replacement"],
  materialId = "leatherette",
  seatCount = 1
}) {
  const vehicle = VEHICLE_TYPES.find(v => v.id === vehicleTypeId) || VEHICLE_TYPES[0];
  const services = VEHICLE_SEAT_SERVICES.filter(s => selectedServiceIds.includes(s.id));

  let rawServicesBase = 0;
  services.forEach(srv => {
    rawServicesBase += srv.basePrice;
  });

  // Default fallback if no services selected
  if (rawServicesBase === 0) {
    rawServicesBase = vehicle.baseStarting;
  }

  // Base multiplied by vehicle scaling factor
  const scaledServices = rawServicesBase * vehicle.multiplier;

  // Additional seat count factor (for multi-seater vehicles)
  const seatMultiplier = Math.max(1, 1 + (seatCount - 1) * 0.25);

  const minTotal = Math.round((scaledServices * seatMultiplier) / 50) * 50;
  // Upper limit incorporates high-density cushioning and wear buffer (+45-60%)
  const maxTotal = Math.round((minTotal * 1.58) / 50) * 50;

  return {
    minPrice: minTotal,
    maxPrice: maxTotal,
    formattedRange: `₹${minTotal.toLocaleString("en-IN")} – ₹${maxTotal.toLocaleString("en-IN")}`,
    vehicle,
    servicesCount: services.length,
    services
  };
}

// ============================================================================
// 6 WHY CHOOSE STITCHBEEZ BENEFITS
// ============================================================================
export const WHY_STITCHBEEZ_BENEFITS = [
  {
    id: "perfect-fit",
    title: "Perfect Fit",
    desc: "Laser-measured patterns tailored specifically to your vehicle's frame and contours.",
    icon: "ruler"
  },
  {
    id: "durable-materials",
    title: "1-Year Warranty",
    desc: "Automotive-tested leatherettes and ballistic fabrics engineered for tropical heat and monsoons.",
    icon: "shield"
  },
  {
    id: "custom-designs",
    title: "50+ Materials",
    desc: "Diamond quilting, contrast piping, colored stitching threads, and custom foam contours.",
    icon: "palette"
  },
  {
    id: "skilled-artisans",
    title: "Master Artisans",
    desc: "15+ years experienced master automotive upholsterers with verified workshop certifications.",
    icon: "users"
  },
  {
    id: "affordable-pricing",
    title: "Save Up To 70%",
    desc: "Save up to 70% compared to buying brand new factory seats with zero quality compromises.",
    icon: "badge-percent"
  },
  {
    id: "doorstep-service",
    title: "Doorstep Fitting",
    desc: "Mobile fitment vans visit your apartment parking or home garage at your chosen time.",
    icon: "truck"
  }
];

// ============================================================================
// 3 VERIFIED CUSTOMER REVIEWS (MATCHING SCREENSHOT)
// ============================================================================
export const VEHICLE_SEAT_REVIEWS = [
  {
    id: "rev-1",
    name: "Arjun S.",
    location: "Bengaluru",
    rating: 5,
    comment: "My bike seat looks brand new! Great stitching and quality. Very comfortable.",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    seatThumb: "/assets/repair-vehicle-seats/vehicle_bikes.png",
    vehicleType: "Royal Enfield Classic 350",
    serviceUsed: "Foam Reshaping & Diamond Ribbed Cover"
  },
  {
    id: "rev-2",
    name: "Priya M.",
    location: "Chennai",
    rating: 5,
    comment: "Excellent car seat reupholstery. Nice fabric options and professional work.",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    seatThumb: "/assets/repair-vehicle-seats/trans_car_after.png",
    vehicleType: "Hyundai Creta SX",
    serviceUsed: "Nappa Leatherette & Red Piping"
  },
  {
    id: "rev-3",
    name: "Ramesh K.",
    location: "Mysuru",
    rating: 5,
    comment: "Our bus seats were completely restored. Great finish and delivered on time.",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    seatThumb: "/assets/repair-vehicle-seats/trans_bus_after.png",
    vehicleType: "Tata Starbus 32-Seater",
    serviceUsed: "Fleet Re-Foaming & Transit Cloth"
  }
];

// ============================================================================
// 6 BOTTOM BENEFITS STRIP
// ============================================================================
export const BOTTOM_BENEFITS_STRIP = [
  { id: "all-vehicles", label: "All Vehicle Types", icon: "car" },
  { id: "premium-materials", label: "Premium Materials", icon: "gem" },
  { id: "custom-designs", label: "Custom Designs", icon: "pen-tool" },
  { id: "skilled-artisans", label: "Skilled Artisans", icon: "wrench" },
  { id: "transparent-pricing", label: "Transparent Pricing", icon: "tag" },
  { id: "doorstep-service", label: "Doorstep Service", icon: "truck" }
];

// ============================================================================
// NEARBY VEHICLE SEAT SPECIALISTS (BENGALURU GPS FOR REAL GOOGLE MAPS)
// ============================================================================
export const NEARBY_VEHICLE_SPECIALISTS = [
  {
    id: "spec-veh-1",
    name: "Bengaluru Auto Leather & Saddles",
    badge: "Master Automotive Upholsterer",
    rating: 4.97,
    reviews: 210,
    distance: "1.6 km away",
    experience: "18+ Years Experience",
    address: "14th Main, HSR Layout Sector 1, Bengaluru",
    phone: "+91 98451 22910",
    coordinates: { lat: 12.9121, lng: 77.6446 },
    specialties: ["Bike Touring Saddles", "Car Nappa Upholstery", "Doorstep Mobile Fitment"],
    startingCharges: "₹299",
    doorstepAvailability: true,
    pickupAvailability: true,
    avatar: "/assets/repair-vehicle-seats/trans_car_after.png"
  },
  {
    id: "spec-veh-2",
    name: "Koramangala Foam & Seat Restorations",
    badge: "Foam & Ergonomics Specialist",
    rating: 4.94,
    reviews: 178,
    distance: "2.3 km away",
    experience: "15+ Years Experience",
    address: "80ft Road, 4th Block, Koramangala, Bengaluru",
    phone: "+91 98862 33418",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    specialties: ["Orthopedic Gel Inserts", "Tear Welding", "Bucket Seat Bolsters"],
    startingCharges: "₹399",
    doorstepAvailability: true,
    pickupAvailability: true,
    avatar: "/assets/repair-vehicle-seats/trans_bike_after.png"
  },
  {
    id: "spec-veh-3",
    name: "Royal Transit & Fleet Seat Works",
    badge: "Commercial Fleet Master",
    rating: 4.91,
    reviews: 145,
    distance: "3.5 km away",
    experience: "22+ Years Experience",
    address: "Near Metro Pillar 84, Indiranagar, Bengaluru",
    phone: "+91 97412 88712",
    coordinates: { lat: 12.9719, lng: 77.6412 },
    specialties: ["Bus & Tempo Fleets", "Auto Benches", "Truck Air-Ride Seats"],
    startingCharges: "₹499",
    doorstepAvailability: true,
    pickupAvailability: true,
    avatar: "/assets/repair-vehicle-seats/trans_bus_after.png"
  },
  {
    id: "spec-veh-4",
    name: "South End Custom Interiors & Trims",
    badge: "Certified Custom Interior Atelier",
    rating: 4.89,
    reviews: 96,
    distance: "4.2 km away",
    experience: "14+ Years Experience",
    address: "9th Block, Jayanagar, Bengaluru",
    phone: "+91 99003 44109",
    coordinates: { lat: 12.9250, lng: 77.5838 },
    specialties: ["Perforated Suede", "Custom Embroidery & Piping", "Waterproof Lining"],
    startingCharges: "₹449",
    doorstepAvailability: true,
    pickupAvailability: true,
    avatar: "/assets/repair-vehicle-seats/trans_truck_after.png"
  }
];

export const VEHICLE_ASSESSMENT_SLOTS = [
  "09:30 AM – 11:30 AM (Morning Slot)",
  "11:30 AM – 01:30 PM (Midday Slot)",
  "02:00 PM – 04:00 PM (Afternoon Slot)",
  "04:00 PM – 06:00 PM (Evening Slot)",
  "06:00 PM – 08:00 PM (Sunset Slot)"
];
