// STITCHBEEZ KIDS STITCHING & TAILORING CENTRAL STORE
// Handles data models, Google Maps Discovery records (Verified Partners + Discovered Shops),
// fabric marketplace integration, appointments, designer consultations, and localStorage order persistence.

import { 
  getCart, 
  saveCart, 
  getWishlist, 
  saveWishlist,
  addOrder as globalAddOrder
} from './bagsStore';

// 1. ASSET PATHS (Matching Desktop/kidsStitching exactly)
export const KIDS_ASSETS = {
  hero: "/kids-assets/hero/hero.png",
  categories: {
    frocks: "/kids-assets/categories/frocks-dresses.png",
    shirts: "/kids-assets/categories/shirts-tops.png",
    pants: "/kids-assets/categories/pants-shorts.png",
    traditional: "/kids-assets/categories/traditional-wear.png",
    party: "/kids-assets/categories/party-wear.png",
    uniforms: "/kids-assets/categories/school-uniform.png",
    newborn: "/kids-assets/categories/newborn-infant.png",
    nightwear: "/kids-assets/categories/nightwear.png",
    winter: "/kids-assets/categories/winter-wear.png",
    custom: "/kids-assets/categories/custom-design.png",
  },
  services: {
    tailor: "/kids-assets/services/tailor-service.png",
    designer: "/kids-assets/services/designer-service.png",
  },
  fabrics: {
    cotton: "/kids-assets/fabrics/cotton.png",
    organicCotton: "/kids-assets/fabrics/organic-cotton.png",
    linen: "/kids-assets/fabrics/linen.png",
    muslin: "/kids-assets/fabrics/muslin.png",
    silk: "/kids-assets/fabrics/silk.png",
    georgette: "/kids-assets/fabrics/georgette.png",
    net: "/kids-assets/fabrics/net.png",
    velvet: "/kids-assets/fabrics/velvet.png",
    denim: "/kids-assets/fabrics/denim.png",
    knitted: "/kids-assets/fabrics/knitted.png",
  },
  ageGroups: {
    newborn: "/kids-assets/age-groups/newborn.png",
    infant: "/kids-assets/age-groups/infant.png",
    toddler: "/kids-assets/age-groups/toddler.png",
    littleKids: "/kids-assets/age-groups/little-kids.png",
    bigKids: "/kids-assets/age-groups/big-kids.png",
    teens: "/kids-assets/age-groups/teens.png",
  },
  banners: {
    left: "/kids-assets/banners/banner-left.png",
    right: "/kids-assets/banners/banner-right.png",
  }
};

// 2. 10 STITCHING CATEGORIES (EXACT MATCH TO REFERENCE SCREENSHOT)
export const KIDS_CATEGORIES = [
  {
    id: "frocks-dresses",
    name: "Frocks & Dresses",
    examples: "Casual, party, layered, designer frocks",
    desc: "Custom stitched twirl dresses, layered birthday gowns, A-line frocks & floral casuals with ultra-soft cotton lining.",
    img: KIDS_ASSETS.categories.frocks,
    startingPrice: 399,
    typicalFabricMeters: 1.5,
    gender: "Girls"
  },
  {
    id: "shirts-tops",
    name: "Shirts & Tops",
    examples: "Formal shirts, casual shirts, tops",
    desc: "Crisp Oxford collars, festive mandarin shirts, casual linen button-downs and party blouses for kids.",
    img: KIDS_ASSETS.categories.shirts,
    startingPrice: 349,
    typicalFabricMeters: 1.2,
    gender: "Boys / Girls"
  },
  {
    id: "pants-shorts",
    name: "Pants & Shorts",
    examples: "Trousers, shorts, leggings",
    desc: "Elasticated comfort waistbands, growth-allowance hems, cargo shorts, chinos and pleated trousers.",
    img: KIDS_ASSETS.categories.pants,
    startingPrice: 299,
    typicalFabricMeters: 1.0,
    gender: "Unisex"
  },
  {
    id: "traditional-wear",
    name: "Traditional Wear",
    examples: "Kurta, lehenga, dhoti, sherwani",
    desc: "Festive silk kurta pajamas, royal embroidered sherwanis, pattu pavadai and twirl lehengas with itch-free inner lining.",
    img: KIDS_ASSETS.categories.traditional,
    startingPrice: 599,
    typicalFabricMeters: 2.0,
    gender: "Boys / Girls"
  },
  {
    id: "party-wear",
    name: "Party Wear",
    examples: "Birthday, wedding and celebration outfits",
    desc: "Sparkling layered gowns, tuxedo vests, evening velvet frocks and celebration coordinates tailored with gentle seams.",
    img: KIDS_ASSETS.categories.party,
    startingPrice: 699,
    typicalFabricMeters: 2.2,
    gender: "Boys / Girls"
  },
  {
    id: "school-uniforms",
    name: "School Uniforms",
    examples: "Shirts, skirts, trousers, pinafores",
    desc: "Double-reinforced knees and elbows, breathable poly-cotton blends, precise school-code embroidery and extra growth margins.",
    img: KIDS_ASSETS.categories.uniforms,
    startingPrice: 249,
    typicalFabricMeters: 1.2,
    gender: "Unisex"
  },
  {
    id: "newborn-infant",
    name: "Newborn & Infant",
    examples: "Rompers, jablas, baby sets",
    desc: "Concealed seams, tagless necklines, organic muslin swaddles, snap button closures and hypoallergenic pre-washed fabrics.",
    img: KIDS_ASSETS.categories.newborn,
    startingPrice: 249,
    typicalFabricMeters: 0.8,
    gender: "Unisex"
  },
  {
    id: "nightwear",
    name: "Nightwear",
    examples: "Pajamas, night suits",
    desc: "Feather-light pure cotton and modal pajama sets with non-binding soft waistbands for comfortable baby and child sleep.",
    img: KIDS_ASSETS.categories.nightwear,
    startingPrice: 299,
    typicalFabricMeters: 1.4,
    gender: "Unisex"
  },
  {
    id: "winter-wear",
    name: "Winter Wear",
    examples: "Jackets, sweaters, coats",
    desc: "Fleece-lined trench coats, warm wool blazers, quilted vests and thermal casuals tailored for easy layering.",
    img: KIDS_ASSETS.categories.winter,
    startingPrice: 549,
    typicalFabricMeters: 1.8,
    gender: "Unisex"
  },
  {
    id: "custom-design",
    name: "Custom Design",
    examples: "Completely personalized outfits",
    desc: "Have a sketch or inspiration photo? Collaborate with our fashion designers or tailors to bring any unique dream outfit to reality.",
    img: KIDS_ASSETS.categories.custom,
    startingPrice: 699,
    typicalFabricMeters: 2.0,
    gender: "Bespoke"
  }
];

// 3. 10 PREMIUM FABRICS FOR KIDS (EXACT MATCH TO REFERENCE SCREENSHOT)
export const KIDS_FABRICS = [
  {
    id: "cotton",
    name: "Cotton",
    tag: "Everyday Gentle",
    pricePerMetre: 199,
    desc: "100% natural pure cotton, breathable, ultra-soft and gentle on sensitive young skin.",
    img: KIDS_ASSETS.fabrics.cotton,
    colors: ["Blush Pink", "Sky Blue", "Snow White", "Mint Green", "Sunny Yellow", "Lavender"],
    softness: "5 / 5",
    breathability: "5 / 5",
    care: "Machine wash gentle. Mild baby detergent recommended.",
    recommendedAge: "All ages (Newborn to 18 Years)",
    bestFor: "Daily frocks, shirts, summer shorts, nightwear, baby jablas"
  },
  {
    id: "organic-cotton",
    name: "Organic Cotton",
    tag: "Chemical Free",
    pricePerMetre: 279,
    desc: "GOTS-certified 100% organic cotton, pesticide-free, dyed with non-toxic natural plant colors.",
    img: KIDS_ASSETS.fabrics.organicCotton,
    colors: ["Natural Ivory", "Powder Blue", "Pastel Peach", "Sage Green", "Soft Lilac"],
    softness: "5 / 5",
    breathability: "5 / 5",
    care: "Gentle cold cycle. Tumble dry low or line dry in shade.",
    recommendedAge: "Newborns & Toddlers (0 to 3 Years)",
    bestFor: "Newborn sets, sensitive skin rompers, baby sleepsuits"
  },
  {
    id: "linen",
    name: "Linen",
    tag: "Cool & Crisp",
    pricePerMetre: 349,
    desc: "Pure Belgian flax linen blend with a softened pre-wash finish, ideal for warm celebrations.",
    img: KIDS_ASSETS.fabrics.linen,
    colors: ["Beige Sand", "Crisp White", "Cornflower Blue", "Dusty Rose", "Olive"],
    softness: "4.5 / 5",
    breathability: "5 / 5",
    care: "Hand or machine wash cold. Warm iron while slightly damp.",
    recommendedAge: "Toddler to Teens (2 to 18 Years)",
    bestFor: "Boys mandarin shirts, summer pinafores, casual blazers, shorts"
  },
  {
    id: "muslin",
    name: "Muslin",
    tag: "Cloud Soft",
    pricePerMetre: 229,
    desc: "Double-gauze breathable muslin that gets softer with every wash. Lightweight & hypoallergenic.",
    img: KIDS_ASSETS.fabrics.muslin,
    colors: ["Cream", "Pale Pink", "Ocean Whisper", "Lemon Yellow", "Pistachio"],
    softness: "5 / 5",
    breathability: "5 / 5",
    care: "Gentle wash in cold water. Air dry naturally.",
    recommendedAge: "Newborn to 4 Years",
    bestFor: "Baby swaddles, summer frocks, breezy jablas, relaxed playwear"
  },
  {
    id: "silk",
    name: "Silk",
    tag: "Festive Lustre",
    pricePerMetre: 599,
    desc: "Mulberry raw silk blend with smooth cotton back lining to ensure zero skin itching.",
    img: KIDS_ASSETS.fabrics.silk,
    colors: ["Royal Crimson", "Golden Ochre", "Peacock Blue", "Rani Pink", "Emerald Green"],
    softness: "4.7 / 5",
    breathability: "4 / 5",
    care: "Dry clean only or delicate hand wash with silk shampoo.",
    recommendedAge: "1 Year to Teens",
    bestFor: "Festive lehengas, silk kurta dhotis, wedding sherwanis, pattu pavadai"
  },
  {
    id: "georgette",
    name: "Georgette",
    tag: "Fluid Twirl",
    pricePerMetre: 299,
    desc: "Flowy, crinkle-textured lightweight fabric paired with a soft cotton inner lining.",
    img: KIDS_ASSETS.fabrics.georgette,
    colors: ["Pastel Coral", "Lilac Breeze", "Mint Frost", "Aqua Cyan", "Baby Pink"],
    softness: "4.2 / 5",
    breathability: "4.3 / 5",
    care: "Hand wash cold. Do not wring forcefully. Steam iron low.",
    recommendedAge: "3 Years to Teens",
    bestFor: "Layered twirl gowns, birthday frocks, festive dupattas, party wear"
  },
  {
    id: "net",
    name: "Net",
    tag: "Fairy Tulle",
    pricePerMetre: 249,
    desc: "Micro-soft nylon tulle that holds shape for princess twirl skirts without scratching little legs.",
    img: KIDS_ASSETS.fabrics.net,
    colors: ["Candy Pink", "Sparkle Champagne", "Sky Blue", "Lavender Mist", "Snow White"],
    softness: "4.0 / 5",
    breathability: "4.5 / 5",
    care: "Hand wash gently. Hang to drip dry. Never apply direct iron.",
    recommendedAge: "1 Year to 12 Years",
    bestFor: "Princess gowns, tutu skirts, layered birthday dress overlays"
  },
  {
    id: "velvet",
    name: "Velvet",
    tag: "Royal Warmth",
    pricePerMetre: 449,
    desc: "Plush micro-velvet with a buttery soft finish, perfect for winter and grand formal events.",
    img: KIDS_ASSETS.fabrics.velvet,
    colors: ["Deep Maroon", "Midnight Navy", "Bottle Green", "Dusty Mauve", "Wine"],
    softness: "4.9 / 5",
    breathability: "3.8 / 5",
    care: "Dry clean recommended to preserve lush pile and depth.",
    recommendedAge: "2 Years to Teens",
    bestFor: "Winter party dresses, boys bandhgalas, tuxedos, festive jackets"
  },
  {
    id: "denim",
    name: "Denim",
    tag: "Durable Play",
    pricePerMetre: 289,
    desc: "Soft washed stretch denim (6.5 oz) engineered for playground tumbling and climbing.",
    img: KIDS_ASSETS.fabrics.denim,
    colors: ["Vintage Indigo", "Light Ice Blue", "Dark Raw Wash", "Charcoal Grey"],
    softness: "4.3 / 5",
    breathability: "4.2 / 5",
    care: "Machine wash cold inside out with like colors.",
    recommendedAge: "2 Years to Teens",
    bestFor: "Dungarees, denim jackets, comfort trousers, pinafores, cargo shorts"
  },
  {
    id: "knitted",
    name: "Knitted Fabric",
    tag: "Ultra Flexible",
    pricePerMetre: 259,
    desc: "High-recovery cotton-spandex jersey knit for active kids on the move.",
    img: KIDS_ASSETS.fabrics.knitted,
    colors: ["Heather Grey", "Navy Blue", "Bubblegum Pink", "Oatmeal Melange", "Cobalt"],
    softness: "4.9 / 5",
    breathability: "4.8 / 5",
    care: "Machine wash cold. Reshape and dry flat.",
    recommendedAge: "All ages (Newborn to Teens)",
    bestFor: "Pajamas, thermal sets, casual t-shirts, winter sweaters"
  }
];

// 4. 6 AGE GROUPS (EXACT MATCH TO REFERENCE SCREENSHOT)
export const KIDS_AGE_GROUPS = [
  {
    id: "newborn",
    label: "Newborn",
    range: "0 - 3 Months",
    desc: "Gentle seams, snap fasteners, soft necklines & hypoallergenic fabrics.",
    img: KIDS_ASSETS.ageGroups.newborn,
    standardChest: 16,
    standardWaist: 16,
    standardLength: 14
  },
  {
    id: "infant",
    label: "Infant",
    range: "3 - 12 Months",
    desc: "Crawling allowances, elastic waists, anti-rash soft cotton liners.",
    img: KIDS_ASSETS.ageGroups.infant,
    standardChest: 18,
    standardWaist: 18,
    standardLength: 16
  },
  {
    id: "toddler",
    label: "Toddler",
    range: "1 - 3 Years",
    desc: "Tumble-ready stitching, growth-allowance seams, easy toilet-friendly fits.",
    img: KIDS_ASSETS.ageGroups.toddler,
    standardChest: 21,
    standardWaist: 20,
    standardLength: 19
  },
  {
    id: "little-kids",
    label: "Little Kids",
    range: "4 - 7 Years",
    desc: "Vibrant styles, sturdy pockets, school & birthday party celebration designs.",
    img: KIDS_ASSETS.ageGroups.littleKids,
    standardChest: 24,
    standardWaist: 22,
    standardLength: 24
  },
  {
    id: "big-kids",
    label: "Big Kids",
    range: "8 - 12 Years",
    desc: "Sharp tailoring, formal suits, elegant gowns & personalized festive cuts.",
    img: KIDS_ASSETS.ageGroups.bigKids,
    standardChest: 28,
    standardWaist: 25,
    standardLength: 30
  },
  {
    id: "teens",
    label: "Teens",
    range: "13 - 18 Years",
    desc: "Modern boutique silhouettes, bespoke tailored blazers, party wear & lehengas.",
    img: KIDS_ASSETS.ageGroups.teens,
    standardChest: 32,
    standardWaist: 28,
    standardLength: 36
  }
];

// 5. 6 SHARED PROCESS STAGES (HOW IT WORKS)
export const KIDS_HOW_IT_WORKS = [
  {
    step: 1,
    title: "1. Choose Outfit",
    subtitle: "Select a design or upload your idea.",
    icon: "Scissors",
    tailorDetail: "Select child's age group, clothing category, and upload your inspiration photo or pick from our curated catalogue.",
    designerDetail: "Consult with a fashion designer, explain your theme or event, and upload reference photos or moodboards."
  },
  {
    step: 2,
    title: "2. Select Fabric",
    subtitle: "Choose from our fabrics or use your own.",
    icon: "Layers",
    tailorDetail: "Pick skin-friendly cotton, muslin or silk from StitchBeez, or choose 'I have my own fabric' for doorstep pickup.",
    designerDetail: "Review fabric swatches recommended by your designer, tailored specifically for kids' sensitive skin and ease of movement."
  },
  {
    step: 3,
    title: "3. Get Measured",
    subtitle: "Schedule measurement with a tailor (home/online).",
    icon: "Ruler",
    tailorDetail: "Choose doorstep measurement visit by a verified fit-helper, guided video measurement, or enter your child's saved sizes.",
    designerDetail: "Comprehensive sizing review including comfort room, growth allowances, and exact shoulder-to-toe dimensions."
  },
  {
    step: 4,
    title: "4. Review & Confirm",
    subtitle: "Check measurements, pricing and delivery time.",
    icon: "FileCheck",
    tailorDetail: "Transparent itemized pricing with stitching, fabric, and delivery broken down with estimated completion date.",
    designerDetail: "Review digital design mockup, approved color swatches, designer consultation summary, and confirm production."
  },
  {
    step: 5,
    title: "5. Stitching in Progress",
    subtitle: "Our skilled tailors stitch with care.",
    icon: "Sparkles",
    tailorDetail: "Hand-crafted by certified kids' tailoring specialists with anti-itch soft cotton lining and safety seam allowances.",
    designerDetail: "Master craftsmen execute the designer's approved pattern with precision embroidery, trims, and quality inspection."
  },
  {
    step: 6,
    title: "6. Delivered to You",
    subtitle: "Get your stitched outfit at your doorstep.",
    icon: "Truck",
    tailorDetail: "Steamed, boxed and delivered with doorstep trial guarantee. Free minor fit adjustments if needed.",
    designerDetail: "Delivered in premium luxury keepsake packaging, ready for your child's memorable celebration."
  }
];

// 6. ALL NEARBY PROFESSIONALS DATABASE (GOOGLE MAPS DISCOVERY + STITCHBEEZ PARTNERS)
// Every entry is geospatially geocoded with coordinates, Google Places IDs, and distinct partner status.
export const NEARBY_PROFESSIONALS_DATABASE = [
  // --- TAILORS (StitchBeez Verified Partners) ---
  {
    id: "tailor-k1",
    name: "Meenakshi Kids Atelier",
    type: "tailor",
    isPartner: true,
    googlePlaceId: "ChIJ_z1b_4AUrjsRa-mZ9s7K10w",
    coords: [12.9719, 77.6412],
    locality: "Indiranagar",
    city: "Bengaluru",
    pincode: "560038",
    address: "42, 100ft Road, 2nd Stage, Indiranagar, Bengaluru, Karnataka",
    phone: "+91 98450 12345",
    businessHours: "Mon - Sat: 10:00 AM - 8:30 PM",
    googleRating: 4.8,
    googleReviewsCount: 96,
    stitchbeezRating: 4.9,
    stitchbeezOrdersCount: 142,
    masterTailor: "Meenakshi Sundaram",
    experienceYears: 18,
    specializations: ["Frocks & Gowns", "Kids Traditional Silk", "Baby Anti-Itch Linings", "Twirl Lehengas"],
    startingPrice: 399,
    turnAroundDays: "3-4 Days",
    homeVisitAvailable: true,
    doorstepPickup: true,
    photo: "/tailor_hero_1.jpg",
    portfolioSamples: [
      { name: "Pink Layered Party Gown", category: "Frocks", image: KIDS_ASSETS.categories.frocks, desc: "Double organic cotton lining with invisible back zip." },
      { name: "Pattu Pavadai with Golden Border", category: "Traditional", image: KIDS_ASSETS.categories.traditional, desc: "Traditional South silk skirt and top with soft waistband." }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Indiranagar+Bengaluru+Tailors",
    appointmentSlots: ["10:30 AM", "12:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"]
  },
  {
    id: "tailor-k2",
    name: "Junior Couture & Stitches",
    type: "tailor",
    isPartner: true,
    googlePlaceId: "ChIJx29L3f4UrjsRs-k8827A91s",
    coords: [12.9348, 77.6189],
    locality: "Koramangala",
    city: "Bengaluru",
    pincode: "560034",
    address: "88, 5th Block, Jyoti Nivas College Road, Koramangala, Bengaluru",
    phone: "+91 98451 98765",
    businessHours: "Mon - Sun: 10:30 AM - 9:00 PM",
    googleRating: 4.7,
    googleReviewsCount: 112,
    stitchbeezRating: 4.8,
    stitchbeezOrdersCount: 98,
    masterTailor: "Anand Verma",
    experienceYears: 14,
    specializations: ["Boys Mini Tuxedos", "School Uniforms", "Party Suits", "Formal Shirts"],
    startingPrice: 349,
    turnAroundDays: "2-3 Days",
    homeVisitAvailable: true,
    doorstepPickup: true,
    photo: "/tailor_hero_2.jpg",
    portfolioSamples: [
      { name: "Miniature 3-Piece Tuxedo", category: "Party Wear", image: KIDS_ASSETS.categories.party, desc: "Comfort stretch fabric with satin collar." },
      { name: "Reinforced School Blazer", category: "Uniforms", image: KIDS_ASSETS.categories.uniforms, desc: "Double reinforced elbow patches for long durability." }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Koramangala+Bengaluru+Tailors",
    appointmentSlots: ["11:00 AM", "01:30 PM", "04:00 PM", "06:00 PM"]
  },
  {
    id: "tailor-k3",
    name: "Tiny Threads & Baby Crafts",
    type: "tailor",
    isPartner: true,
    googlePlaceId: "ChIJz01A9f8UrjsRu-92147Aa2s",
    coords: [12.9307, 77.5840],
    locality: "Jayanagar",
    city: "Bengaluru",
    pincode: "560011",
    address: "14, 4th Block, 11th Main, Jayanagar, Bengaluru",
    phone: "+91 98452 34567",
    businessHours: "Tue - Sun: 10:00 AM - 8:00 PM",
    googleRating: 4.9,
    googleReviewsCount: 148,
    stitchbeezRating: 4.9,
    stitchbeezOrdersCount: 186,
    masterTailor: "Zainab Sheikh",
    experienceYears: 20,
    specializations: ["Newborn & Infant Wear", "Organic Muslin", "Festive Lehengas", "Anti-Rash Seams"],
    startingPrice: 299,
    turnAroundDays: "3-5 Days",
    homeVisitAvailable: true,
    doorstepPickup: true,
    photo: "/tailor_hero_3.jpg",
    portfolioSamples: [
      { name: "Organic Muslin Jabla Set", category: "Newborn", image: KIDS_ASSETS.categories.newborn, desc: "Concealed seams and nickel-free snap buttons." },
      { name: "Pure Cotton Comfort Romper", category: "Infant", image: KIDS_ASSETS.fabrics.muslin, desc: "Breathable natural fabric for sensitive skin." }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Jayanagar+Bengaluru+Baby+Tailor",
    appointmentSlots: ["10:00 AM", "11:30 AM", "03:00 PM", "05:30 PM"]
  },
  {
    id: "tailor-k4",
    name: "Royal Heritage Kids Stitches",
    type: "tailor",
    isPartner: true,
    googlePlaceId: "ChIJc12K7f8UrjsRw-44127Aa3s",
    coords: [12.9141, 77.6413],
    locality: "HSR Layout",
    city: "Bengaluru",
    pincode: "560102",
    address: "512, 27th Main, Sector 1, HSR Layout, Bengaluru",
    phone: "+91 98453 78901",
    businessHours: "Mon - Sat: 10:00 AM - 8:30 PM",
    googleRating: 4.7,
    googleReviewsCount: 84,
    stitchbeezRating: 4.8,
    stitchbeezOrdersCount: 79,
    masterTailor: "Kavitha Raman",
    experienceYears: 12,
    specializations: ["Silk Pattu Pavadai", "Sherwanis & Dhotis", "Girls Party Dresses"],
    startingPrice: 449,
    turnAroundDays: "4-6 Days",
    homeVisitAvailable: true,
    doorstepPickup: true,
    photo: "/tailor_hero_4.jpg",
    portfolioSamples: [
      { name: "Traditional Silk Dhoti Kurta", category: "Traditional", image: KIDS_ASSETS.categories.traditional, desc: "Elasticated ready-to-wear dhoti with soft zari." }
    ],
    googleMapsUrl: "https://maps.google.com/?q=HSR+Layout+Tailor",
    appointmentSlots: ["11:30 AM", "02:30 PM", "04:30 PM", "07:00 PM"]
  },

  // --- TAILORS (Google Maps Discovered - Non-Partners) ---
  {
    id: "gmap-tailor-1",
    name: "Little Stars Boutique & Tailoring",
    type: "tailor",
    isPartner: false,
    googlePlaceId: "ChIJg11K8eAUrjsRv-51978Za1b",
    coords: [12.9698, 77.7500],
    locality: "Whitefield",
    city: "Bengaluru",
    pincode: "560066",
    address: "Near ITPL Main Road, Whitefield, Bengaluru",
    phone: "+91 80 2845 1199",
    businessHours: "Mon - Sat: 10:30 AM - 8:00 PM",
    googleRating: 4.6,
    googleReviewsCount: 68,
    googleMapsUrl: "https://maps.google.com/?q=Little+Stars+Tailor+Whitefield",
    photo: "/tailor_hero_5.jpg",
    startingPrice: 450,
    turnAroundDays: "5-7 Days"
  },
  {
    id: "gmap-tailor-2",
    name: "Classic Ladies & Children Tailors",
    type: "tailor",
    isPartner: false,
    googlePlaceId: "ChIJg22K9eAUrjsRv-77778Za2c",
    coords: [13.0031, 77.5643],
    locality: "Malleshwaram",
    city: "Bengaluru",
    pincode: "560003",
    address: "8th Cross, Sampige Road, Malleshwaram, Bengaluru",
    phone: "+91 80 2334 5678",
    businessHours: "Mon - Sat: 11:00 AM - 9:00 PM",
    googleRating: 4.5,
    googleReviewsCount: 134,
    googleMapsUrl: "https://maps.google.com/?q=Malleshwaram+Children+Tailors",
    photo: "/tailor_hero_1.jpg",
    startingPrice: 380,
    turnAroundDays: "4-5 Days"
  },
  {
    id: "gmap-tailor-3",
    name: "City Uniforms & Kids Tailoring Shop",
    type: "tailor",
    isPartner: false,
    googlePlaceId: "ChIJg33K0eAUrjsRv-88888Za3d",
    coords: [12.9822, 77.6083],
    locality: "Commercial Street",
    city: "Bengaluru",
    pincode: "560001",
    address: "Commercial Street, Tasker Town, Shivajinagar, Bengaluru",
    phone: "+91 80 2558 9012",
    businessHours: "Mon - Sun: 10:30 AM - 9:30 PM",
    googleRating: 4.4,
    googleReviewsCount: 210,
    googleMapsUrl: "https://maps.google.com/?q=Commercial+Street+Tailor+Bengaluru",
    photo: "/tailor_hero_2.jpg",
    startingPrice: 350,
    turnAroundDays: "3-4 Days"
  },

  // --- FASHION DESIGNERS (StitchBeez Verified Partners) ---
  {
    id: "designer-d1",
    name: "Ananya Sharma",
    type: "designer",
    isPartner: true,
    googlePlaceId: "ChIJ_d11_9AUrjsRa-mZ9s7K99d",
    coords: [12.9719, 77.6412],
    locality: "Indiranagar",
    city: "Bengaluru",
    pincode: "560038",
    address: "Atelier Suite 4, 12th Main Road, Indiranagar, Bengaluru",
    phone: "+91 98450 99887",
    businessHours: "Mon - Sat: 10:00 AM - 7:00 PM",
    googleRating: 4.9,
    googleReviewsCount: 74,
    stitchbeezRating: 4.9,
    stitchbeezOrdersCount: 118,
    title: "Senior Kids Couture Designer",
    experienceYears: 9,
    consultationFee: 299,
    startingDesignFee: 799,
    turnAroundDays: "5-7 Days",
    avatar: "/des1.jpg",
    photo: "/des1.jpg",
    bio: "NIFT graduate specializing in enchanting children's couture combining fairytale aesthetics with irritation-free, breathable comfort.",
    specializations: ["Birthday Theme Gowns", "Fairytale Party Frocks", "Milestone Outfits", "Floral Appliques"],
    portfolioSamples: [
      { name: "Pink Layered Tulle Gown", category: "Party Wear", image: KIDS_ASSETS.categories.frocks, desc: "Hand-embellished pearl floral waist sash." },
      { name: "Sparkle Butterfly Frock", category: "Birthday Special", image: KIDS_ASSETS.categories.party, desc: "Lightweight glitter tulle over soft organic cotton." }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Ananya+Sharma+Indiranagar+Designer",
    appointmentSlots: ["10:30 AM", "02:00 PM", "04:30 PM", "06:30 PM"]
  },
  {
    id: "designer-d2",
    name: "Devika Rao",
    type: "designer",
    isPartner: true,
    googlePlaceId: "ChIJ_d22_9AUrjsRa-mZ9s7K98e",
    coords: [12.9307, 77.5840],
    locality: "Jayanagar",
    city: "Bengaluru",
    pincode: "560011",
    address: "Studio 18, 33rd Cross, 7th Main, 4th Block, Jayanagar, Bengaluru",
    phone: "+91 98451 88776",
    businessHours: "Tue - Sun: 10:30 AM - 7:30 PM",
    googleRating: 4.8,
    googleReviewsCount: 62,
    stitchbeezRating: 4.8,
    stitchbeezOrdersCount: 87,
    title: "Festive & Traditional Kids Specialist",
    experienceYears: 11,
    consultationFee: 349,
    startingDesignFee: 899,
    turnAroundDays: "6-8 Days",
    avatar: "/des2.jpg",
    photo: "/des2.jpg",
    bio: "Passionate about preserving Indian heritage textiles for little ones. Every piece features double cotton linings and soft elastic trims.",
    specializations: ["Royal Silk Lehengas", "Zardozi Sherwanis", "Sibling Twin Sets", "Banarasi Brocades"],
    portfolioSamples: [
      { name: "Royal Marigold Silk Lehenga", category: "Traditional", image: KIDS_ASSETS.categories.traditional, desc: "Zari embroidery with concealed protective seams." },
      { name: "Micro Zari Kurta Set", category: "Festive", image: KIDS_ASSETS.categories.traditional, desc: "Pure silk kurta with breathable cotton mulmul inner." }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Devika+Rao+Jayanagar+Designer",
    appointmentSlots: ["11:00 AM", "02:30 PM", "04:00 PM", "05:30 PM"]
  },
  {
    id: "designer-d3",
    name: "Rohan Kapoor",
    type: "designer",
    isPartner: true,
    googlePlaceId: "ChIJ_d33_9AUrjsRa-mZ9s7K97f",
    coords: [12.9348, 77.6189],
    locality: "Koramangala",
    city: "Bengaluru",
    pincode: "560034",
    address: "Atelier 104, 80ft Road, 4th Block, Koramangala, Bengaluru",
    phone: "+91 98452 77665",
    businessHours: "Mon - Sat: 11:00 AM - 8:00 PM",
    googleRating: 4.9,
    googleReviewsCount: 88,
    stitchbeezRating: 4.9,
    stitchbeezOrdersCount: 94,
    title: "Bespoke Boys Tailoring & Western Wear",
    experienceYears: 8,
    consultationFee: 249,
    startingDesignFee: 699,
    turnAroundDays: "4-6 Days",
    avatar: "/des3.jpg",
    photo: "/des3.jpg",
    bio: "Specialist in sharp, comfortable gentlemen cuts for boys. Designed with growth-friendly seams that can be let out as your child grows.",
    specializations: ["Miniature Tuxedos", "Structured Blazers", "Casual Linen Sets", "Summer Waistcoats"],
    portfolioSamples: [
      { name: "Navy 3-Piece Tuxedo Set", category: "Western", image: KIDS_ASSETS.categories.party, desc: "Stretch Italian wool blend with cotton sateen lining." },
      { name: "Belgian Linen Casual Suit", category: "Summer", image: KIDS_ASSETS.categories.pants, desc: "Relaxed resort wear cut with elastic waist." }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Rohan+Kapoor+Koramangala+Designer",
    appointmentSlots: ["10:30 AM", "01:00 PM", "03:30 PM", "06:00 PM"]
  },

  // --- FASHION DESIGNERS (Google Maps Discovered - Non-Partners) ---
  {
    id: "gmap-designer-1",
    name: "Petals Kids Couture Studio",
    type: "designer",
    isPartner: false,
    googlePlaceId: "ChIJg44K1eAUrjsRv-99999Za4e",
    coords: [12.9077, 77.5855],
    locality: "JP Nagar",
    city: "Bengaluru",
    pincode: "560078",
    address: "24th Main, 2nd Phase, JP Nagar, Bengaluru",
    phone: "+91 80 4156 7890",
    businessHours: "Mon - Sat: 11:00 AM - 8:00 PM",
    googleRating: 4.6,
    googleReviewsCount: 42,
    googleMapsUrl: "https://maps.google.com/?q=Petals+Kids+Couture+JP+Nagar",
    avatar: "/des1.jpg",
    photo: "/des1.jpg",
    startingDesignFee: 850,
    turnAroundDays: "7-9 Days"
  },
  {
    id: "gmap-designer-2",
    name: "Little Diva Designer Boutique",
    type: "designer",
    isPartner: false,
    googlePlaceId: "ChIJg55K2eAUrjsRv-00000Za5f",
    coords: [12.9166, 77.6101],
    locality: "BTM Layout",
    city: "Bengaluru",
    pincode: "560076",
    address: "Outer Ring Road, BTM 2nd Stage, Bengaluru",
    phone: "+91 80 4112 3344",
    businessHours: "Mon - Sat: 10:30 AM - 8:30 PM",
    googleRating: 4.5,
    googleReviewsCount: 57,
    googleMapsUrl: "https://maps.google.com/?q=Little+Diva+Boutique+BTM+Layout",
    avatar: "/des2.jpg",
    photo: "/des2.jpg",
    startingDesignFee: 750,
    turnAroundDays: "6-8 Days"
  }
];

// Helper to filter verified tailors (retains existing compatibility)
export const VERIFIED_KIDS_TAILORS = NEARBY_PROFESSIONALS_DATABASE.filter(p => p.type === 'tailor' && p.isPartner);

// Helper to filter verified designers (retains existing compatibility)
export const KIDS_FASHION_DESIGNERS = NEARBY_PROFESSIONALS_DATABASE.filter(p => p.type === 'designer' && p.isPartner);

// 7. GENUINE CUSTOMER REVIEWS (CATEGORIZED & FILTERABLE)
export const KIDS_REVIEWS = [
  {
    id: "rev-1",
    author: "Priya S.",
    city: "Bengaluru",
    category: "frocks",
    categoryName: "Frocks & Dresses",
    rating: 5,
    text: "Beautiful stitching and perfect fit for my daughter. Loved the fabric options and service! The inner cotton lining is so soft that my 5-year-old wore it all evening without complaining once.",
    childInfo: "Daughter (Age 5) • Pink Layered Party Frock",
    avatar: KIDS_ASSETS.ageGroups.littleKids,
    outfitImg: KIDS_ASSETS.categories.frocks,
    verifiedOrder: true,
    date: "3 days ago",
    tailorName: "Meenakshi Kids Atelier"
  },
  {
    id: "rev-2",
    author: "Rahul K.",
    city: "Hyderabad",
    category: "traditional",
    categoryName: "Traditional Wear",
    rating: 5,
    text: "Very professional and timely delivery. Our son's ethnic wear was stitched perfectly. The growth allowance in the dhoti pants means he can wear it for upcoming festivals as well.",
    childInfo: "Son (Age 7) • Royal Silk Kurta Pajama",
    avatar: KIDS_ASSETS.ageGroups.toddler,
    outfitImg: KIDS_ASSETS.categories.traditional,
    verifiedOrder: true,
    date: "1 week ago",
    tailorName: "Royal Heritage Kids Stitches"
  },
  {
    id: "rev-3",
    author: "Sneha M.",
    city: "Chennai",
    category: "designer",
    categoryName: "Custom Design",
    rating: 5,
    text: "Great designs and high-quality stitching. My daughter loved her party dress! Ananya, the fashion designer, drew 2 mockups over video call and incorporated every detail.",
    childInfo: "Daughter (Age 9) • Lavender Birthday Gown",
    avatar: KIDS_ASSETS.ageGroups.bigKids,
    outfitImg: KIDS_ASSETS.categories.party,
    verifiedOrder: true,
    date: "2 weeks ago",
    tailorName: "Ananya Sharma (Couture)"
  },
  {
    id: "rev-4",
    author: "Kavita Nair",
    city: "Bengaluru",
    category: "baby",
    categoryName: "Newborn & Infant",
    rating: 5,
    text: "Ordered organic muslin jablas for my 2-month-old nephew. Not a single rough thread or scratchy tag anywhere. Exactly what babies need.",
    childInfo: "Nephew (Age 2M) • Muslin Newborn Set",
    avatar: KIDS_ASSETS.ageGroups.newborn,
    outfitImg: KIDS_ASSETS.categories.newborn,
    verifiedOrder: true,
    date: "3 weeks ago",
    tailorName: "Tiny Threads & Baby Crafts"
  },
  {
    id: "rev-5",
    author: "Vikram Mehta",
    city: "Mumbai",
    category: "uniforms",
    categoryName: "School Uniforms",
    rating: 5,
    text: "Tailored uniforms for both my children. The reinforced seams have survived a whole term of soccer and running with zero tears. Exceptional craftsmanship.",
    childInfo: "Twin Boys (Age 10) • School Crest Blazers & Trousers",
    avatar: KIDS_ASSETS.ageGroups.bigKids,
    outfitImg: KIDS_ASSETS.categories.uniforms,
    verifiedOrder: true,
    date: "1 month ago",
    tailorName: "Junior Couture & Stitches"
  },
  {
    id: "rev-6",
    author: "Deepika R.",
    city: "Bengaluru",
    category: "traditional",
    categoryName: "Traditional Wear",
    rating: 5,
    text: "Stitched a matching sibling set for Diwali. The tailor came home, measured both children in 15 minutes, and picked up our family silk fabric. Delivered right on time!",
    childInfo: "Daughter (Age 4) & Son (Age 2) • Sibling Silk Festives",
    avatar: KIDS_ASSETS.ageGroups.littleKids,
    outfitImg: KIDS_ASSETS.categories.traditional,
    verifiedOrder: true,
    date: "1 month ago",
    tailorName: "Meenakshi Kids Atelier"
  }
];

// 8. 6 BOTTOM FEATURE STRIP ITEMS
export const KIDS_BOTTOM_BENEFITS = [
  { id: "benefit-age", label: "All Age Groups", icon: "Smile" },
  { id: "benefit-fabrics", label: "Premium Fabrics", icon: "Gem" },
  { id: "benefit-designs", label: "Custom Designs", icon: "Palette" },
  { id: "benefit-artisans", label: "Verified Tailors & Designers", icon: "Scissors" },
  { id: "benefit-pricing", label: "Transparent Pricing", icon: "Tag" },
  { id: "benefit-delivery", label: "Doorstep Delivery", icon: "Truck" }
];

// 9. LOCAL STORAGE KEYS
const KIDS_ORDERS_KEY = "stitchbeez_kids_orders";
const KIDS_SAVED_MEASUREMENTS_KEY = "stitchbeez_kids_measurements";
const KIDS_APPOINTMENTS_KEY = "stitchbeez_kids_appointments";

// 10. GOOGLE MAPS DISCOVERY SERVICE API
export function searchNearbyProfessionals({
  type = 'tailor', // 'tailor' | 'designer'
  locality = '',
  radiusKm = 10,
  userCoords = [12.9719, 77.6412], // Default Indiranagar, Bengaluru
  onlyPartners = false,
  minRating = 0
}) {
  let list = NEARBY_PROFESSIONALS_DATABASE.filter(p => p.type === type);

  if (onlyPartners) {
    list = list.filter(p => p.isPartner);
  }

  if (minRating > 0) {
    list = list.filter(p => (p.stitchbeezRating || p.googleRating) >= minRating);
  }

  // Calculate distance from userCoords using Haversine formula
  list = list.map(p => {
    const lat1 = userCoords[0];
    const lon1 = userCoords[1];
    const lat2 = p.coords[0];
    const lon2 = p.coords[1];
    
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distanceKm = Math.round((R * c) * 10) / 10;

    return {
      ...p,
      distanceKm: distanceKm || p.distanceKm || 1.5
    };
  });

  // Filter by locality if provided
  if (locality && locality.trim() !== '') {
    const q = locality.toLowerCase().trim();
    const matchedLocality = list.filter(p => 
      p.locality.toLowerCase().includes(q) || 
      p.city.toLowerCase().includes(q) || 
      p.address.toLowerCase().includes(q) ||
      p.pincode.includes(q) ||
      p.name.toLowerCase().includes(q)
    );
    if (matchedLocality.length > 0) {
      list = matchedLocality;
    }
  }

  // Filter by radius
  list = list.filter(p => p.distanceKm <= radiusKm);

  // Sort: Partners first, then by distance
  list.sort((a, b) => {
    if (a.isPartner && !b.isPartner) return -1;
    if (!a.isPartner && b.isPartner) return 1;
    return a.distanceKm - b.distanceKm;
  });

  return list;
}

export function getProviderById(id) {
  return NEARBY_PROFESSIONALS_DATABASE.find(p => p.id === id) || NEARBY_PROFESSIONALS_DATABASE[0];
}

// 11. LOCAL STORAGE HELPERS FOR ORDERS & WORKFLOW DRAFTS
export function getKidsOrders() {
  try {
    const raw = localStorage.getItem(KIDS_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveKidsOrder(orderData) {
  try {
    const orders = getKidsOrders();
    const newOrder = {
      id: "KIDS-" + Date.now().toString().slice(-6),
      createdAt: new Date().toISOString(),
      status: "Request Submitted",
      timeline: [
        { status: "Request Submitted", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
        { status: "Measurements Scheduled", time: "Pending", done: false },
        { status: "Measurements Confirmed", time: "Pending", done: false },
        { status: "Fabric Received", time: "Pending", done: false },
        { status: "Stitching Started", time: "Pending", done: false },
        { status: "Quality Check", time: "Pending", done: false },
        { status: "Ready for Dispatch", time: "Pending", done: false },
        { status: "Delivered", time: "Pending", done: false }
      ],
      ...orderData
    };
    orders.unshift(newOrder);
    localStorage.setItem(KIDS_ORDERS_KEY, JSON.stringify(orders));

    // Also push to global StitchBeez order tracker
    try {
      globalAddOrder({
        id: newOrder.id,
        items: [{
          id: newOrder.id,
          name: `Kids Stitching - ${orderData.categoryName || 'Custom Outfit'}`,
          price: orderData.totalAmount || 899,
          quantity: 1,
          image: orderData.categoryImg || KIDS_ASSETS.categories.frocks,
          serviceType: orderData.serviceType === 'designer' ? 'Fashion Designer Kids Stitching' : 'Verified Tailor Kids Stitching'
        }],
        total: orderData.totalAmount || 899,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Stitching in Progress'
      });
    } catch (err) {
      console.warn("Global order sync fallback", err);
    }

    return newOrder;
  } catch (e) {
    console.error("Failed to save kids order", e);
    return null;
  }
}

export function getSavedChildMeasurements() {
  try {
    const raw = localStorage.getItem(KIDS_SAVED_MEASUREMENTS_KEY);
    return raw ? JSON.parse(raw) : [
      { id: "cm-1", childName: "Aarav (Son)", ageGroup: "Toddler (1-3Y)", chest: 21, waist: 20, shoulder: 9.5, length: 19, sleeves: 11, unit: "in" },
      { id: "cm-2", childName: "Ananya (Daughter)", ageGroup: "Little Kids (4-7Y)", chest: 24, waist: 22, shoulder: 11, length: 24, sleeves: 14, unit: "in" }
    ];
  } catch (e) {
    return [];
  }
}

export function saveChildMeasurements(profile) {
  try {
    const list = getSavedChildMeasurements();
    const updated = list.filter(p => p.id !== profile.id);
    updated.unshift({ ...profile, id: profile.id || "cm-" + Date.now() });
    localStorage.setItem(KIDS_SAVED_MEASUREMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

// 12. APPOINTMENTS MANAGEMENT
export function getSavedAppointments() {
  try {
    const raw = localStorage.getItem(KIDS_APPOINTMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function bookAppointment(appointment) {
  try {
    const list = getSavedAppointments();
    const newApt = {
      id: "APT-" + Date.now().toString().slice(-5),
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      ...appointment
    };
    list.unshift(newApt);
    localStorage.setItem(KIDS_APPOINTMENTS_KEY, JSON.stringify(list));
    return newApt;
  } catch (e) {
    return null;
  }
}

export function calculateStitchingEstimate({
  category,
  fabricSource, // 'own' | 'stitchbeez'
  selectedFabricId,
  fabricMeters = 1.5,
  measurementType = 'home-visit', // 'home-visit' | 'online' | 'saved' | 'manual'
  serviceType = 'tailor', // 'tailor' | 'designer'
  selectedDesignerId
}) {
  const cat = KIDS_CATEGORIES.find(c => c.id === category) || KIDS_CATEGORIES[0];
  const stitchingCharge = cat.startingPrice || 399;
  
  let fabricCost = 0;
  if (fabricSource === 'stitchbeez' && selectedFabricId) {
    const fab = KIDS_FABRICS.find(f => f.id === selectedFabricId) || KIDS_FABRICS[0];
    fabricCost = Math.round(fab.pricePerMetre * fabricMeters);
  }

  let measurementFee = 0;
  if (measurementType === 'home-visit') {
    measurementFee = 99; // Nominal verified visit fee
  }

  let designFee = 0;
  let consultationFee = 0;
  if (serviceType === 'designer') {
    const des = KIDS_FASHION_DESIGNERS.find(d => d.id === selectedDesignerId) || KIDS_FASHION_DESIGNERS[0];
    consultationFee = des.consultationFee || 299;
    designFee = des.startingDesignFee || 699;
  }

  const pickupFee = fabricSource === 'own' ? 49 : 0;
  const deliveryFee = 0; // Free doorstep delivery for StitchBeez Kids
  const subtotal = stitchingCharge + fabricCost + measurementFee + designFee + consultationFee + pickupFee + deliveryFee;
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const totalAmount = subtotal + taxes;

  return {
    stitchingCharge,
    fabricCost,
    measurementFee,
    designFee,
    consultationFee,
    pickupFee,
    deliveryFee,
    subtotal,
    taxes,
    totalAmount
  };
}
