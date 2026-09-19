import React, { useState, useEffect } from 'react';
import { 
  MapPin, Star, ShieldCheck, CheckCircle2, Scissors, 
  Clock, Search, Navigation, RefreshCw, Eye, Award, 
  X, Layers, ExternalLink, Heart, Compass, Sparkles, ChevronRight
} from 'lucide-react';

const SPECIALTY_CATEGORIES = [
  { id: 'all', label: 'All Specialties', icon: '✨' },
  { id: 'mens', label: "Men's Bespoke", icon: '👔' },
  { id: 'womens', label: "Women's Couture", icon: '👗' },
  { id: 'bridal', label: 'Bridal & Lehengas', icon: '👑' },
  { id: 'kids', label: 'Kids Wear', icon: '👶' },
  { id: 'alterations', label: '24h Alterations', icon: '⚡' },
  { id: 'uniforms', label: 'Uniforms & Bulk', icon: '🏫' },
  { id: 'bags', label: 'Bags & Leather', icon: '👜' },
  { id: 'shoes', label: 'Shoes & Slippers', icon: '👞' },
  { id: 'seats', label: 'Vehicle Seats & Sofas', icon: '🚗' },
  { id: 'designers', label: 'Custom Design', icon: '✨' },
  { id: 'gifts', label: 'Hand Made Gifts', icon: '🎁' },
  { id: 'pets', label: 'Pet Outfits', icon: '🐾' }
];

const NEIGHBORHOODS = [
  "All Localities",
  "Koramangala",
  "Indiranagar",
  "Jayanagar",
  "HSR Layout",
  "Whitefield",
  "Malleshwaram",
  "Commercial Street",
  "Lavelle Road",
  "Rajajinagar"
];

const CURATED_TAILORS = [
  // BRIDAL
  {
    id: 't_bridal_1',
    name: "Royal Couturiers & Bridal Atelier",
    masterTailor: "Master Rameshwar Rao",
    experience: "18+ Yrs Master Cutter",
    specialty: "Bespoke Bridal Lehengas & Zardozi Gowns",
    category: "bridal",
    categoryLabel: "Bridal & Lehengas",
    neighborhood: "Koramangala",
    rating: 4.96,
    reviewsCount: 248,
    orders: 430,
    availability: "🟢 Doorstep Trial Available Today",
    turnaround: "⚡ 48h Express Available",
    phone: "+91 98450 12345",
    address: "80 Feet Road, 4th Block, Koramangala, Bengaluru",
    priceRange: "₹2,500 – ₹18,000",
    image: "/why_join_1.jpg",
    avatar: "/kiran.jpg",
    tags: ["Bridal Lehenga", "Heavy Zardozi", "Silk Blouse", "Designer Gown"],
    lat: 12.9345,
    lng: 77.6267,
    mapQuery: "Koramangala 4th Block Bengaluru",
    portfolio: [
      { img: "/bridal 5.jpg", title: "Velvet Bridal Lehenga", price: "₹14,500" },
      { img: "/bridal2.jpg", title: "Raw Silk Embroidered Blouse", price: "₹3,200" },
      { img: "/bridal3.jpg", title: "Handcrafted Anarkali Suit", price: "₹7,800" }
    ]
  },
  {
    id: 't_bridal_2',
    name: "Heritage Silks & Blouse Atelier",
    masterTailor: "Master Meenakshi Sundaram",
    experience: "22+ Yrs Silk Specialist",
    specialty: "Aari Work, Maggam & Designer Silk Blouses",
    category: "bridal",
    categoryLabel: "Bridal & Lehengas",
    neighborhood: "Jayanagar",
    rating: 4.98,
    reviewsCount: 312,
    orders: 620,
    availability: "🟢 Available Today (Home Visit)",
    turnaround: "⚡ 24h Express Available",
    phone: "+91 98451 55667",
    address: "11th Main, 4th Block, Jayanagar, Bengaluru",
    priceRange: "₹1,200 – ₹8,500",
    image: "/womens_tailoring_v2.jpg",
    avatar: "/stany.jpg",
    tags: ["Maggam Work", "Aari Embroidery", "Kanjeevaram Blouse", "Princess Cut"],
    lat: 12.9298,
    lng: 77.5833,
    mapQuery: "Jayanagar 4th Block Bengaluru",
    portfolio: [
      { img: "/bridal 5.jpg", title: "Bridal Maggam Blouse", price: "₹4,500" },
      { img: "/bridal2.jpg", title: "Zari Border Pattu Blouse", price: "₹2,800" },
      { img: "/womensCollection.jpg", title: "Corset Style Crop Top", price: "₹3,200" }
    ]
  },

  // MEN'S BESPOKE
  {
    id: 't_mens_1',
    name: "Savile Row Bespoke Studio",
    masterTailor: "Master Anthony Rozario",
    experience: "14+ Yrs Bespoke Suiting",
    specialty: "Luxury 3-Piece Suits, Tuxedos & Sherwanis",
    category: "mens",
    categoryLabel: "Men's Bespoke",
    neighborhood: "Indiranagar",
    rating: 4.92,
    reviewsCount: 195,
    orders: 380,
    availability: "🟢 Doorstep Measurement Slot Open",
    turnaround: "⚡ 3-Day Express",
    phone: "+91 98860 98765",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru",
    priceRange: "₹3,500 – ₹24,000",
    image: "/why_join_2.jpg",
    avatar: "/manoj.jpg",
    tags: ["3-Piece Suit", "Bandhgala", "Tuxedo", "Italian Fit"],
    lat: 12.9719,
    lng: 77.6412,
    mapQuery: "100 Feet Road Indiranagar Bengaluru",
    portfolio: [
      { img: "/men1.jpg", title: "Bespoke Royal Bandhgala", price: "₹12,000" },
      { img: "/men2.jpg", title: "Italian Cut Tuxedo", price: "₹16,500" },
      { img: "/Velvet Bandhgala.png", title: "Classic Wool Blend Suit", price: "₹8,900" }
    ]
  },
  {
    id: 't_mens_2',
    name: "Lord & Master Gentleman Tailors",
    masterTailor: "Master Vikram Singhania",
    experience: "19+ Yrs Master Pattern Cutter",
    specialty: "Safari Suits, Nehru Jackets & Linen Kurtas",
    category: "mens",
    categoryLabel: "Men's Bespoke",
    neighborhood: "Lavelle Road",
    rating: 4.94,
    reviewsCount: 180,
    orders: 340,
    availability: "🟢 Doorstep Trial Available Today",
    turnaround: "⚡ 48h Express",
    phone: "+91 98450 67890",
    address: "Lavelle Road, Shanthala Nagar, Bengaluru",
    priceRange: "₹2,200 – ₹16,000",
    image: "/mens_tailoring.jpg",
    avatar: "/kiran.jpg",
    tags: ["Nehru Jacket", "Linen Kurta", "Formal Trousers", "Blazer"],
    lat: 12.9702,
    lng: 77.5960,
    mapQuery: "Lavelle Road Bengaluru",
    portfolio: [
      { img: "/Linen Blend Kurta.png", title: "Pure Linen Kurta Pyjama", price: "₹2,800" },
      { img: "/Pastel Blue Suit.png", title: "Pastel Blue Summer Blazer", price: "₹6,500" },
      { img: "/men3.jpg", title: "Tailored Silk Bandhgala", price: "₹9,800" }
    ]
  },

  // WOMEN'S COUTURE
  {
    id: 't_womens_1',
    name: "Couture Belle Atelier",
    masterTailor: "Master Ananya Sharma",
    experience: "12+ Yrs Couture Designer",
    specialty: "Designer Anarkalis, Gowns & Indo-Western Sets",
    category: "womens",
    categoryLabel: "Women's Couture",
    neighborhood: "Indiranagar",
    rating: 4.95,
    reviewsCount: 210,
    orders: 410,
    availability: "🟢 Home Measurement Slot Available",
    turnaround: "⚡ 2-Day Express",
    phone: "+91 98454 11223",
    address: "12th Main, Indiranagar, Bengaluru",
    priceRange: "₹1,800 – ₹15,000",
    image: "/womensCollection.jpg",
    avatar: "/stany.jpg",
    tags: ["Anarkali", "Indo-Western", "Cocktail Gown", "Sharara"],
    lat: 12.9745,
    lng: 77.6432,
    mapQuery: "12th Main Indiranagar Bengaluru",
    portfolio: [
      { img: "/bridal3.jpg", title: "Floor-Length Silk Anarkali", price: "₹6,800" },
      { img: "/womens_tailoring_v2.jpg", title: "Peplum Top & Flared Pants", price: "₹4,200" },
      { img: "/bridal 5.jpg", title: "Embroidered Party Gown", price: "₹9,500" }
    ]
  },
  {
    id: 't_womens_2',
    name: "Luxe Thread & Co.",
    masterTailor: "Master Farooq Siddiqui",
    experience: "16+ Yrs Indo-Western Specialist",
    specialty: "Indo-Western Fusion, Shararas & Kurta Sets",
    category: "womens",
    categoryLabel: "Women's Couture",
    neighborhood: "Whitefield",
    rating: 4.91,
    reviewsCount: 165,
    orders: 290,
    availability: "🟢 Doorstep Trial Available Today",
    turnaround: "⚡ 3-Day Turnaround",
    phone: "+91 98453 99001",
    address: "ITPL Main Road, Prestige Ozone Junction, Whitefield",
    priceRange: "₹2,200 – ₹12,500",
    image: "/why_join_3.jpg",
    avatar: "/manoj.jpg",
    tags: ["Indo-Western", "Sharara Suit", "Draped Sarees", "Embroidered Kurta"],
    lat: 12.9698,
    lng: 77.7499,
    mapQuery: "Whitefield ITPL Main Road Bengaluru",
    portfolio: [
      { img: "/bridal 5.jpg", title: "Georgette Draped Sharara", price: "₹6,800" },
      { img: "/men1.jpg", title: "Asymmetric Silk Kurta", price: "₹4,200" },
      { img: "/bridal2.jpg", title: "Cape Style Fusion Gown", price: "₹9,500" }
    ]
  },

  // KIDS WEAR
  {
    id: 't_kids_1',
    name: "Little Monarchs Kids Couture",
    masterTailor: "Master Shalini Menon",
    experience: "11+ Yrs Kids Apparel Specialist",
    specialty: "Traditional Pattu Pavadai, Frocks & Kids Sherwanis",
    category: "kids",
    categoryLabel: "Kids Wear",
    neighborhood: "HSR Layout",
    rating: 4.93,
    reviewsCount: 185,
    orders: 370,
    availability: "🟢 Gentle Doorstep Measurement Service",
    turnaround: "⚡ 48h Express",
    phone: "+91 98455 33445",
    address: "19th Main, Sector 2, HSR Layout, Bengaluru",
    priceRange: "₹900 – ₹5,500",
    image: "/kids_wear.jpg",
    avatar: "/kiran.jpg",
    tags: ["Pattu Pavadai", "Kids Sherwani", "Birthday Frock", "Comfort Stitch"],
    lat: 12.9112,
    lng: 77.6398,
    mapQuery: "HSR Layout Sector 2 Bengaluru",
    portfolio: [
      { img: "/kidsCollection.jpg", title: "Silk Pattu Pavadai Set", price: "₹1,800" },
      { img: "/kids_wear_v2.jpg", title: "Royal Prince Velvet Sherwani", price: "₹2,900" },
      { img: "/Kids.png", title: "Princess Layered Birthday Gown", price: "₹3,200" }
    ]
  },

  // 24H ALTERATIONS
  {
    id: 't_alt_1',
    name: "StitchBee Express Studio",
    masterTailor: "Master Rajesh Kumar",
    experience: "11+ Yrs Master Tailor",
    specialty: "Same-Day Alterations, Upcycling & Perfect Fits",
    category: "alterations",
    categoryLabel: "24h Alterations",
    neighborhood: "HSR Layout",
    rating: 4.88,
    reviewsCount: 420,
    orders: 890,
    availability: "🟢 30-Min Doorstep Pickup",
    turnaround: "⚡ 24-Hour Delivery",
    phone: "+91 98452 77889",
    address: "27th Main, Sector 1, HSR Layout, Bengaluru",
    priceRange: "₹250 – ₹3,500",
    image: "/tailor_stitching_hero.png",
    avatar: "/kiran.jpg",
    tags: ["24h Alterations", "Waist Resizing", "Dress Tapering", "Suit Restyling"],
    lat: 12.9141,
    lng: 77.6329,
    mapQuery: "HSR Layout Sector 1 Bengaluru",
    portfolio: [
      { img: "/alterations_fit.jpg", title: "Designer Lehenga Waist & Flare Taper", price: "₹850" },
      { img: "/alt_al1.jpg", title: "Blazer Shoulder Restyling", price: "₹1,200" },
      { img: "/alt_al2.jpg", title: "Saree Fall & Pico Finishing", price: "₹250" }
    ]
  },
  {
    id: 't_alt_2',
    name: "QuickFit Rapid Alterations Studio",
    masterTailor: "Master Suresh Babu",
    experience: "15+ Yrs Alteration Specialist",
    specialty: "Express Jeans Tapering, Zip Repair & Resizing",
    category: "alterations",
    categoryLabel: "24h Alterations",
    neighborhood: "Koramangala",
    rating: 4.90,
    reviewsCount: 310,
    orders: 680,
    availability: "🟢 Same Day Pickup & Return",
    turnaround: "⚡ 12h Super Express",
    phone: "+91 98456 77112",
    address: "5th Block, Koramangala, Bengaluru",
    priceRange: "₹200 – ₹2,800",
    image: "/alt_12.jpg",
    avatar: "/stany.jpg",
    tags: ["Jeans Hemming", "Kurti Alteration", "Coat Fitting", "Invisible Mending"],
    lat: 12.9355,
    lng: 77.6189,
    mapQuery: "Koramangala 5th Block Bengaluru",
    portfolio: [
      { img: "/alt_al3.jpg", title: "Denim Waist Resizing & Hem", price: "₹350" },
      { img: "/alt_al4.jpg", title: "Invisible Tear Restitching", price: "₹450" },
      { img: "/alterations_fit_v2.jpg", title: "Designer Gown Length Adjustment", price: "₹650" }
    ]
  },

  // UNIFORMS & BULK
  {
    id: 't_uni_1',
    name: "Apex Uniforms & Corporate Tailors",
    masterTailor: "Master Govind Prasad",
    experience: "20+ Yrs Bulk Stitching Specialist",
    specialty: "School Uniforms, Hospital Scrubs & Hotel Attire",
    category: "uniforms",
    categoryLabel: "Uniforms & Bulk",
    neighborhood: "Rajajinagar",
    rating: 4.92,
    reviewsCount: 175,
    orders: 520,
    availability: "🟢 Bulk Sample Trials Available",
    turnaround: "⚡ Fast Bulk Delivery",
    phone: "+91 98457 88990",
    address: "Dr. Rajkumar Road, Rajajinagar, Bengaluru",
    priceRange: "₹600 – ₹3,800",
    image: "/Uniform.png",
    avatar: "/manoj.jpg",
    tags: ["School Uniform", "Hospital Scrubs", "Chef Coats", "Corporate Blazers"],
    lat: 12.9982,
    lng: 77.5530,
    mapQuery: "Dr Rajkumar Road Rajajinagar Bengaluru",
    portfolio: [
      { img: "/uniform_u1.jpg", title: "Custom School Blazer & Skirt Set", price: "₹1,450" },
      { img: "/uniform_u2.jpg", title: "Anti-Microbial Medical Scrubs", price: "₹850" },
      { img: "/uniform_u3.jpg", title: "Hospitality Executive Uniform", price: "₹1,900" }
    ]
  },

  // BAGS & LEATHERS
  {
    id: 't_bag_1',
    name: "Artisan Hide & Leather Guild",
    masterTailor: "Master Tariq Al-Mansoor",
    experience: "17+ Yrs Master Leather Craftsman",
    specialty: "Custom Handcrafted Leather Bags, Wallets & Restoration",
    category: "bags",
    categoryLabel: "Bags & Leather",
    neighborhood: "Commercial Street",
    rating: 4.97,
    reviewsCount: 230,
    orders: 390,
    availability: "🟢 Leather Swatch Consultation Available",
    turnaround: "⚡ Handcrafted in 5 Days",
    phone: "+91 98458 44556",
    address: "Commercial Street, Tasker Town, Bengaluru",
    priceRange: "₹1,500 – ₹14,000",
    image: "/bags_leathers.jpg",
    avatar: "/stany.jpg",
    tags: ["Leather Tote", "Laptop Messenger", "Handmade Wallet", "Bag Restoration"],
    lat: 12.9822,
    lng: 77.6083,
    mapQuery: "Commercial Street Bengaluru",
    portfolio: [
      { img: "/bag_b1.jpg", title: "Full Grain Leather Weekender Duffel", price: "₹6,800" },
      { img: "/bag_b2.jpg", title: "Hand-Stitched Luxury Tote Bag", price: "₹4,200" },
      { img: "/Bags And Leather.png", title: "Bespoke Laptop Messenger Case", price: "₹3,900" }
    ]
  },

  // SHOES & SLIPPERS
  {
    id: 't_shoe_1',
    name: "Cobbler & Craft Bespoke Footwear",
    masterTailor: "Master Devendra Rao",
    experience: "25+ Yrs Master Cordwainer",
    specialty: "Handmade Pure Leather Mojaris, Brogues & Custom Slippers",
    category: "shoes",
    categoryLabel: "Shoes & Slippers",
    neighborhood: "Commercial Street",
    rating: 4.95,
    reviewsCount: 190,
    orders: 320,
    availability: "🟢 Foot Impression & Sizing Kit Available",
    turnaround: "⚡ Handcrafted in 4 Days",
    phone: "+91 98459 33221",
    address: "Brigade Road & Commercial St Cross, Bengaluru",
    priceRange: "₹1,800 – ₹11,000",
    image: "/Shoes And Slippers.png",
    avatar: "/kiran.jpg",
    tags: ["Custom Brogues", "Wedding Mojari", "Orthopedic Slippers", "Pure Leather"],
    lat: 12.9733,
    lng: 77.6075,
    mapQuery: "Brigade Road Bengaluru",
    portfolio: [
      { img: "/shoe_c1.jpg", title: "Hand-Burnished Oxford Brogues", price: "₹5,400" },
      { img: "/shoe_c2.jpg", title: "Zari Embroidered Wedding Mojaris", price: "₹2,800" },
      { img: "/shoef_c2.jpg", title: "Orthopedic Memory Foam Leather Slides", price: "₹1,950" }
    ]
  },

  // VEHICLE SEATS & SOFAS
  {
    id: 't_seat_1',
    name: "AutoLuxe & Living Upholstery Atelier",
    masterTailor: "Master Balakrishna",
    experience: "18+ Yrs Master Upholsterer",
    specialty: "Custom Car Seat Leather Covers, Recliner & Sofa Re-Upholstery",
    category: "seats",
    categoryLabel: "Vehicle Seats & Sofas",
    neighborhood: "Koramangala",
    rating: 4.93,
    reviewsCount: 280,
    orders: 540,
    availability: "🟢 On-Site Vehicle & Living Room Inspection",
    turnaround: "⚡ 3-Day Complete Fitting",
    phone: "+91 98450 99887",
    address: "Koramangala 1st Block, Near Sarjapur Main Road, Bengaluru",
    priceRange: "₹3,500 – ₹28,000",
    image: "/vehicle_seat_covers.jpg",
    avatar: "/manoj.jpg",
    tags: ["Car Seat Covers", "Nappa Leather", "Sofa Re-Cushioning", "Diamond Quilting"],
    lat: 12.9260,
    lng: 77.6360,
    mapQuery: "Koramangala 1st Block Bengaluru",
    portfolio: [
      { img: "/Vehicle Seat Covers.png", title: "Nappa Leather Diamond Quilted Seat Covers", price: "₹12,500" },
      { img: "/seat_s1.jpg", title: "Luxury Chesterfield Sofa Re-Upholstery", price: "₹18,000" },
      { img: "/vehicle_seat_covers.jpg", title: "Waterproof Breathable Seat Protectors", price: "₹4,800" }
    ]
  },

  // CUSTOM DESIGN
  {
    id: 't_des_1',
    name: "Avant-Garde Design Studio by Sneha",
    masterTailor: "Lead Designer Sneha Roy (NIFT)",
    experience: "9+ Yrs Runway & Celebrity Fashion",
    specialty: "Runway Fashion, Red Carpet Gowns & Concept Silhouettes",
    category: "designers",
    categoryLabel: "Custom Design",
    neighborhood: "Indiranagar",
    rating: 4.98,
    reviewsCount: 160,
    orders: 260,
    availability: "🟢 1-on-1 Virtual / In-Person Sketching Session",
    turnaround: "⚡ 5-Day Bespoke Creation",
    phone: "+91 98451 22334",
    address: "Defence Colony, 100ft Road, Indiranagar, Bengaluru",
    priceRange: "₹4,500 – ₹35,000",
    image: "/custom_design.jpg",
    avatar: "/stany.jpg",
    tags: ["Celebrity Gowns", "NIFT Designer", "Concept Sketching", "Haute Couture"],
    lat: 12.9750,
    lng: 77.6400,
    mapQuery: "Defence Colony Indiranagar Bengaluru",
    portfolio: [
      { img: "/Custom Design.png", title: "Architectural Drape Evening Gown", price: "₹18,500" },
      { img: "/bridal 5.jpg", title: "Sculptural Indo-Western Corset Set", price: "₹14,000" },
      { img: "/custom_design.jpg", title: "Hand-Painted Silk Organza Ensemble", price: "₹16,500" }
    ]
  },

  // HAND MADE GIFTS
  {
    id: 't_gift_1',
    name: "KalaKriti Handcrafted Gift Studio",
    masterTailor: "Master Craftswoman Revathi",
    experience: "13+ Yrs Textile Artistry",
    specialty: "Embroidered Keepsakes, Festive Gift Hampers & Heirloom Quilts",
    category: "gifts",
    categoryLabel: "Hand Made Gifts",
    neighborhood: "Malleshwaram",
    rating: 4.96,
    reviewsCount: 220,
    orders: 450,
    availability: "🟢 Personalized Name / Monogram Embroidery",
    turnaround: "⚡ 48h Express Gifting",
    phone: "+91 98452 33441",
    address: "8th Cross, Sampige Road, Malleshwaram, Bengaluru",
    priceRange: "₹450 – ₹6,500",
    image: "/handmade_gifts.jpg",
    avatar: "/kiran.jpg",
    tags: ["Personalized Gifts", "Heirloom Quilt", "Silk Potli Bags", "Monogram Towels"],
    lat: 13.0031,
    lng: 77.5702,
    mapQuery: "Sampige Road Malleshwaram Bengaluru",
    portfolio: [
      { img: "/handmade_gifts.jpg", title: "Custom Monogrammed Silk Robe & Potli", price: "₹1,850" },
      { img: "/handmade_gift.png", title: "Hand-Quilted Baby Keepsake Blanket", price: "₹2,400" },
      { img: "/handmade gifts.png", title: "Embroidered Festive Table Runner Set", price: "₹1,450" }
    ]
  },

  // PET OUTFITS
  {
    id: 't_pet_1',
    name: "Paws & Pomp Canine Couture",
    masterTailor: "Master Designer Priya Natarajan",
    experience: "8+ Yrs Pet Apparel Specialist",
    specialty: "Dog Wedding Tuxedos, Festive Bandanas & Raincoats",
    category: "pets",
    categoryLabel: "Pet Outfits",
    neighborhood: "HSR Layout",
    rating: 4.94,
    reviewsCount: 140,
    orders: 310,
    availability: "🟢 Pet Sizing Guide & Home Fitting",
    turnaround: "⚡ 48h Express Delivery",
    phone: "+91 98453 66778",
    address: "Sector 3, HSR Layout, Bengaluru",
    priceRange: "₹650 – ₹4,200",
    image: "/pets_wear.jpg",
    avatar: "/manoj.jpg",
    tags: ["Pet Tuxedo", "Dog Sherwani", "Festive Bandana", "Waterproof Coat"],
    lat: 12.9100,
    lng: 77.6450,
    mapQuery: "HSR Layout Sector 3 Bengaluru",
    portfolio: [
      { img: "/pets_wear.jpg", title: "Royal Velvet Dog Wedding Tuxedo", price: "₹1,950" },
      { img: "/Pets.png", title: "Bespoke Silk Dog Sherwani Set", price: "₹2,200" },
      { img: "/pet1.jpg", title: "Reflective Winter Weather Pet Parka", price: "₹1,400" }
    ]
  }
];

export default function VerifiedTailorsShowcase({ 
  openAuthModal, 
  currentUser, 
  setRole, 
  setCustomerHub,
  theme = 'dark'
}) {
  const isLight = theme === 'light';

  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All Localities");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTailor, setActiveTailor] = useState(CURATED_TAILORS[0]);
  const [previewPortfolioTailor, setPreviewPortfolioTailor] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("Bengaluru Central");
  const [savedTailors, setSavedTailors] = useState([]);
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' | 'satellite'

  // Calculate Distance in KM
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  // Handle GPS location request (triggers browser native permission prompt)
  const handleGetLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation({ lat, lng });
        setLocationName("Your Current Location");
        setIsLocating(false);

        // Sort tailors based on real distance to user's live coordinates
        const sorted = [...CURATED_TAILORS].map(t => {
          const d = calculateDistance(lat, lng, t.lat, t.lng);
          return { ...t, calculatedDist: `${d} km`, distVal: parseFloat(d) };
        }).sort((a, b) => a.distVal - b.distVal);

        if (sorted.length > 0) {
          setActiveTailor(sorted[0]);
        }
      },
      (error) => {
        console.warn("GPS error:", error);
        setIsLocating(false);
        if (error.code === 1) {
          alert("📍 Location permission was denied. Please allow location access in your browser settings to detect nearby tailors.");
        } else if (error.code === 2) {
          alert("📍 Location position is unavailable. Showing top curated studios in Bengaluru.");
        } else if (error.code === 3) {
          alert("📍 Location request timed out. Please try again.");
        } else {
          alert("📍 Unable to detect location. Showing curated studios in Bengaluru.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Filter tailors based on search, neighborhood, category
  const filteredTailors = CURATED_TAILORS.filter(t => {
    const matchesNeighborhood = selectedNeighborhood === "All Localities" || t.neighborhood.toLowerCase() === selectedNeighborhood.toLowerCase();
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === "" || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.masterTailor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.categoryLabel && t.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesNeighborhood && matchesCategory && matchesSearch;
  }).map(t => {
    const originLat = userLocation ? userLocation.lat : 12.9716;
    const originLng = userLocation ? userLocation.lng : 77.5946;
    const dist = calculateDistance(originLat, originLng, t.lat, t.lng);
    return { ...t, calculatedDist: `${dist} km`, distVal: parseFloat(dist) };
  }).sort((a, b) => {
    if (userLocation) {
      return a.distVal - b.distVal;
    }
    return 0;
  });

  // Keep activeTailor synced with filtered results
  useEffect(() => {
    if (filteredTailors.length > 0 && (!activeTailor || !filteredTailors.some(t => t.id === activeTailor.id))) {
      setActiveTailor(filteredTailors[0]);
    }
  }, [selectedNeighborhood, selectedCategory, searchQuery]);

  const handleBookTailor = (tailor) => {
    if (!currentUser) {
      openAuthModal('customer', 'login');
    } else {
      alert(`🎉 Doorstep measurement trial booking requested for ${tailor.name}! Our fashion specialist will confirm your time slot.`);
      if (setCustomerHub) setCustomerHub('tailors');
      if (setRole) setRole('customer');
    }
  };

  const toggleSaveTailor = (tailorId, e) => {
    e.stopPropagation();
    setSavedTailors(prev => 
      prev.includes(tailorId) ? prev.filter(id => id !== tailorId) : [...prev, tailorId]
    );
  };

  // Dynamic Map Target Determination:
  // 1. If user typed a search query, show that search location on Google Maps (e.g. "Bannerghatta, Bengaluru")
  // 2. Else if user clicked a tailor card (activeTailor), show that tailor's location
  // 3. Else if userLocation is active, show userLocation
  // 4. Default to Bangalore
  const getMapEmbedUrl = () => {
    const tParam = mapType === 'satellite' ? 'k' : 'm';
    if (searchQuery && searchQuery.trim().length > 1) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery.trim() + ', Bengaluru')}&hl=en&z=14&t=${tParam}&output=embed`;
    }
    if (activeTailor) {
      return `https://maps.google.com/maps?q=${activeTailor.lat},${activeTailor.lng}&hl=en&z=15&t=${tParam}&output=embed`;
    }
    if (userLocation) {
      return `https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&hl=en&z=15&t=${tParam}&output=embed`;
    }
    return `https://maps.google.com/maps?q=12.9716,77.5946&hl=en&z=13&t=${tParam}&output=embed`;
  };

  const getMapDirectionsUrl = () => {
    if (searchQuery && searchQuery.trim().length > 1) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery.trim() + ' Bengaluru')}`;
    }
    if (activeTailor) {
      return `https://www.google.com/maps/dir/?api=1&destination=${activeTailor.lat},${activeTailor.lng}`;
    }
    if (userLocation) {
      return `https://www.google.com/maps/search/?api=1&query=${userLocation.lat},${userLocation.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=Tailors+Bengaluru`;
  };

  const getMapHeaderText = () => {
    if (searchQuery && searchQuery.trim().length > 1) {
      return `Google Maps • Locating "${searchQuery.trim()}"`;
    }
    if (activeTailor) {
      return `Google Maps • ${activeTailor.neighborhood} Studio`;
    }
    if (userLocation) {
      return `Google Maps • Live GPS Location`;
    }
    return `Google Maps • Bengaluru Studio Locator`;
  };

  // Dynamic Theme Palette Values (Clean premium theming without harsh solid black buttons)
  const colors = {
    sectionTitle: isLight ? '#0f172a' : '#ffffff',
    sectionSubtitle: isLight ? '#475569' : 'rgba(255, 255, 255, 0.85)',
    filterCardBg: isLight ? '#ffffff' : 'rgba(20, 17, 38, 0.92)',
    filterBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.15)',
    filterShadow: isLight ? '0 10px 30px rgba(0,0,0,0.05)' : '0 12px 35px rgba(0,0,0,0.3)',
    searchBg: isLight ? '#f8fafc' : 'rgba(255, 255, 255, 0.06)',
    searchBorder: isLight ? '#cbd5e1' : 'rgba(255, 255, 255, 0.2)',
    searchText: isLight ? '#0f172a' : '#ffffff',
    searchPlaceholder: isLight ? '#64748b' : 'rgba(255, 255, 255, 0.6)',
    filterLabel: isLight ? '#0f172a' : '#ffffff',
    pillUnselectedBg: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.08)',
    pillUnselectedBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.2)',
    pillUnselectedText: isLight ? '#334155' : '#ffffff',
    tailorCardBg: isLight ? '#ffffff' : 'rgba(20, 17, 38, 0.92)',
    tailorCardSelectedBg: isLight ? '#fff5f8' : 'rgba(247, 37, 133, 0.12)',
    tailorCardBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.15)',
    tailorCardShadow: isLight ? '0 4px 18px rgba(0,0,0,0.05)' : '0 4px 16px rgba(0,0,0,0.2)',
    tailorTitle: isLight ? '#0f172a' : '#ffffff',
    tailorSpecialty: isLight ? '#475569' : 'rgba(255, 255, 255, 0.85)',
    metricStripBg: isLight ? '#f8fafc' : 'rgba(255, 255, 255, 0.05)',
    metricStripBorder: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.12)',
    metricLabel: isLight ? '#64748b' : 'rgba(255, 255, 255, 0.7)',
    metricValue: isLight ? '#0f172a' : '#ffffff',
    tagBg: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.08)',
    tagBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.14)',
    tagText: isLight ? '#475569' : '#ffffff',
    secondaryBtnBg: isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
    secondaryBtnBorder: isLight ? '#cbd5e1' : 'rgba(255, 255, 255, 0.2)',
    secondaryBtnText: isLight ? '#1e293b' : '#ffffff',
    mapHeaderBg: isLight ? '#ffffff' : '#111827',
    mapHeaderBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.1)',
    mapHeaderText: isLight ? '#0f172a' : '#ffffff',
    mapToggleBg: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.1)',
    mapToggleBorder: isLight ? '#cbd5e1' : 'rgba(255, 255, 255, 0.2)',
    mapToggleText: isLight ? '#334155' : '#ffffff',
    mapBottomBannerBg: isLight ? '#ffffff' : '#111827',
    trustCardBg: isLight ? '#ffffff' : 'rgba(20, 17, 38, 0.85)',
    trustCardBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.15)',
    trustCardTitle: isLight ? '#0f172a' : '#ffffff',
    trustCardSubtitle: isLight ? '#64748b' : 'rgba(255, 255, 255, 0.8)'
  };

  return (
    <section id="tailors-near-you" style={{ padding: '5rem 0 4rem 0', position: 'relative' }}>
      <div className="landing-container">
        
        {/* SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 2.5rem auto' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(247, 37, 133, 0.12)', 
            border: '1px solid rgba(247, 37, 133, 0.35)', 
            padding: '7px 18px', 
            borderRadius: '30px', 
            marginBottom: '14px' 
          }}>
            <ShieldCheck size={16} style={{ color: '#F72585' }} />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#F72585', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              100% Vetted & Verified Boutique Network
            </span>
          </div>

          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: colors.sectionTitle, 
            lineHeight: 1.15, 
            margin: '0 0 12px 0' 
          }}>
            Verified Tailors & Master Ateliers Near You
          </h2>

          <p style={{ fontSize: '15px', color: colors.sectionSubtitle, lineHeight: 1.6, margin: 0 }}>
            Connect with verified master craftsmen across <strong>Men's, Women's, Bridal, Kids, Alterations, Uniforms, Leather Bags, Custom Footwear, Seat Covers, Gifts & Pet Outfits</strong> with 
            <strong style={{ color: '#F72585' }}> doorstep measurement trials</strong> and <strong style={{ color: '#10B981' }}>100% perfect fit guarantee</strong>.
          </p>
        </div>

        {/* SEARCH & LOCALITY FILTER BAR */}
        <div style={{
          background: colors.filterCardBg,
          backdropFilter: 'blur(16px)',
          border: `1px solid ${colors.filterBorder}`,
          borderRadius: '20px',
          padding: '20px 24px',
          boxShadow: colors.filterShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          marginBottom: '2rem'
        }}>
          {/* Top Row: Search Input + GPS Button */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.searchPlaceholder }} />
              <input 
                type="text"
                placeholder="Search tailor studio, master cutter, specialty (e.g. Bridal, Leather, Mojari, Seats), or area..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 40px 13px 42px',
                  borderRadius: '12px',
                  border: `1px solid ${colors.searchBorder}`,
                  background: colors.searchBg,
                  color: colors.searchText,
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: colors.searchPlaceholder,
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* GPS Live Geolocation Button */}
            <button 
              onClick={handleGetLiveLocation}
              disabled={isLocating}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 22px',
                borderRadius: '12px',
                background: userLocation 
                  ? 'linear-gradient(135deg, #059669 0%, #10B981 100%)' 
                  : 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                border: 'none',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: userLocation ? '0 4px 16px rgba(16, 185, 129, 0.4)' : '0 4px 16px rgba(247, 37, 133, 0.4)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              {isLocating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Detecting Live Location...</span>
                </>
              ) : userLocation ? (
                <>
                  <CheckCircle2 size={16} style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>📍 GPS Active: {locationName}</span>
                </>
              ) : (
                <>
                  <Navigation size={16} style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Use My Live GPS Location</span>
                </>
              )}
            </button>
          </div>

          {/* Category Chips Bar: Beautiful full-width scrollable row with all 13 categories */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: colors.filterLabel, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Scissors size={13} style={{ color: '#F72585' }} />
                Specialty Categories ({SPECIALTY_CATEGORIES.length - 1} Departments)
              </span>
              <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 700 }}>
                {filteredTailors.length} Atelier{filteredTailors.length === 1 ? '' : 's'} Available
              </span>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              overflowX: 'auto', 
              paddingBottom: '8px', 
              alignItems: 'center',
              scrollbarWidth: 'thin',
              WebkitOverflowScrolling: 'touch'
            }}>
              {SPECIALTY_CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: isSelected ? 'none' : `1px solid ${colors.pillUnselectedBorder}`,
                      background: isSelected 
                        ? 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)' 
                        : colors.pillUnselectedBg,
                      color: isSelected ? '#ffffff' : colors.pillUnselectedText,
                      boxShadow: isSelected ? '0 4px 16px rgba(247, 37, 133, 0.35)' : 'none',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span style={{ color: isSelected ? '#ffffff' : colors.pillUnselectedText }}>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locality Filter Pills */}
          <div style={{ borderTop: `1px solid ${colors.filterBorder}`, paddingTop: '12px', display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%', WebkitOverflowScrolling: 'touch', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: colors.filterLabel, display: 'flex', alignItems: 'center', marginRight: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              📍 Locality:
            </span>
            {NEIGHBORHOODS.map(hood => {
              const isSelected = selectedNeighborhood === hood;
              return (
                <button
                  key={hood}
                  onClick={() => setSelectedNeighborhood(hood)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    border: isSelected ? '1px solid #F72585' : `1px solid ${colors.pillUnselectedBorder}`,
                    background: isSelected ? 'linear-gradient(135deg, #F72585 0%, #D81159 100%)' : colors.pillUnselectedBg,
                    color: isSelected ? '#ffffff' : colors.pillUnselectedText,
                    boxShadow: isSelected ? '0 4px 12px rgba(247, 37, 133, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <span style={{ color: isSelected ? '#ffffff' : colors.pillUnselectedText }}>{hood}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN SHOWCASE: GOOGLE MAPS LIVE ATELIER LOCATOR (LEFT) + BOUTIQUE CARDS (RIGHT) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          
          {/* LEFT: LIVE GOOGLE MAPS INTERACTIVE VIEWER */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            border: `1px solid ${colors.filterBorder}`,
            boxShadow: colors.filterShadow,
            minHeight: '580px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: colors.filterCardBg
          }}>
            
            {/* Top Google Maps Control Header Bar */}
            <div style={{
              padding: '12px 16px',
              background: colors.mapHeaderBg,
              borderBottom: `1px solid ${colors.mapHeaderBorder}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 10px #10B981' }}></span>
                <strong style={{ fontSize: '12.5px', color: colors.mapHeaderText, letterSpacing: '0.02em' }}>
                  {getMapHeaderText()}
                </strong>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Satellite / Standard Toggle */}
                <button
                  onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: colors.mapToggleBg,
                    border: `1px solid ${colors.mapToggleBorder}`,
                    color: colors.mapToggleText,
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Toggle Satellite View"
                >
                  <Layers size={13} style={{ color: colors.mapToggleText }} />
                  <span style={{ color: colors.mapToggleText }}>{mapType === 'roadmap' ? 'Satellite' : 'Roadmap'}</span>
                </button>

                {/* Direct Open in Google Maps */}
                <a
                  href={getMapDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                    color: '#ffffff',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Compass size={13} style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>Directions</span>
                </a>
              </div>
            </div>

            {/* Embedded Live Google Maps Iframe */}
            <div style={{ width: '100%', flex: 1, minHeight: '440px', position: 'relative' }}>
              <iframe
                title="Google Maps Studio Locator"
                src={getMapEmbedUrl()}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  minHeight: '440px',
                  display: 'block'
                }}
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Bottom Active Tailor Overlay Banner */}
            {activeTailor && (
              <div style={{
                background: colors.mapBottomBannerBg,
                borderTop: '1.5px solid rgba(247, 37, 133, 0.35)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <img 
                    src={activeTailor.image} 
                    alt={activeTailor.name} 
                    style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #F72585' }} 
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '13.5px', color: colors.tailorTitle, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {activeTailor.name}
                      </strong>
                      <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 800 }}>★ {activeTailor.rating}</span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: colors.tailorSpecialty, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                      📍 {activeTailor.address} ({activeTailor.calculatedDist})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookTailor(activeTailor)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    boxShadow: '0 4px 14px rgba(247, 37, 133, 0.35)'
                  }}
                >
                  <span style={{ color: '#ffffff' }}>Book Doorstep Trial</span>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: CURATED ATELIER CARDS LIST */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: '680px',
            overflowY: 'auto',
            paddingRight: '6px'
          }}>
            {filteredTailors.length === 0 ? (
              <div style={{
                padding: '48px 24px',
                textAlign: 'center',
                background: colors.filterCardBg,
                borderRadius: '18px',
                border: `1px dashed ${colors.filterBorder}`
              }}>
                <Scissors size={36} style={{ color: '#F72585', margin: '0 auto 12px auto', opacity: 0.7 }} />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: colors.tailorTitle, margin: '0 0 6px 0' }}>No Tailor Studios Found</h4>
                <p style={{ fontSize: '13px', color: colors.tailorSpecialty, margin: '0 0 16px 0' }}>Try clearing your search query or selecting "All Localities".</p>
                <button
                  onClick={() => { setSelectedNeighborhood("All Localities"); setSelectedCategory("all"); setSearchQuery(""); }}
                  style={{ padding: '8px 18px', borderRadius: '10px', background: '#F72585', color: '#ffffff', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                >
                  <span style={{ color: '#ffffff' }}>Clear All Filters</span>
                </button>
              </div>
            ) : (
              filteredTailors.map(tailor => {
                const isSelected = activeTailor && activeTailor.id === tailor.id;
                const isSaved = savedTailors.includes(tailor.id);

                return (
                  <div
                    key={tailor.id}
                    onClick={() => setActiveTailor(tailor)}
                    style={{
                      background: isSelected 
                        ? colors.tailorCardSelectedBg 
                        : colors.tailorCardBg,
                      border: isSelected 
                        ? '2px solid #F72585' 
                        : `1px solid ${colors.tailorCardBorder}`,
                      borderRadius: '18px',
                      padding: '18px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isSelected 
                        ? '0 12px 32px rgba(247, 37, 133, 0.2)' 
                        : colors.tailorCardShadow,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      position: 'relative'
                    }}
                  >
                    {/* Top Row: Thumbnail + Title + Rating */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img 
                          src={tailor.image} 
                          alt={tailor.name} 
                          style={{
                            width: '84px',
                            height: '84px',
                            borderRadius: '14px',
                            objectFit: 'cover',
                            border: `1.5px solid ${colors.tailorCardBorder}`
                          }} 
                        />
                        <span style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                          color: '#ffffff',
                          fontSize: '8.5px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '10px',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                        }}>
                          VERIFIED
                        </span>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                              <span style={{
                                fontSize: '10px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                background: 'rgba(247, 37, 133, 0.12)',
                                color: '#F72585',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                border: '1px solid rgba(247, 37, 133, 0.3)'
                              }}>
                                {tailor.categoryLabel || tailor.category}
                              </span>
                            </div>
                            <h3 style={{ 
                              fontSize: '15.5px', 
                              fontWeight: 800, 
                              color: colors.tailorTitle, 
                              margin: '0 0 2px 0',
                              lineHeight: 1.3
                            }}>
                              {tailor.name}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#F72585', fontWeight: 700 }}>
                              <Award size={13} />
                              <span>{tailor.masterTailor} • {tailor.experience}</span>
                            </div>
                          </div>

                          {/* Heart Bookmark */}
                          <button
                            onClick={(e) => toggleSaveTailor(tailor.id, e)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: isSaved ? '#F72585' : colors.metricLabel,
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                            title="Save atelier"
                          >
                            <Heart size={18} fill={isSaved ? '#F72585' : 'none'} />
                          </button>
                        </div>

                        <p style={{ 
                          fontSize: '12.5px', 
                          color: colors.tailorSpecialty, 
                          margin: '6px 0 0 0',
                          lineHeight: 1.4
                        }}>
                          {tailor.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Meta Metric Badges */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(3, 1fr)', 
                      gap: '8px', 
                      background: colors.metricStripBg, 
                      padding: '10px 12px', 
                      borderRadius: '12px', 
                      border: `1px solid ${colors.metricStripBorder}`,
                      fontSize: '11px',
                      textAlign: 'center'
                    }}>
                      <div>
                        <span style={{ display: 'block', color: colors.metricLabel, fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Distance</span>
                        <strong style={{ color: '#F72585', fontSize: '12.5px' }}>📍 {tailor.calculatedDist}</strong>
                      </div>
                      <div style={{ borderLeft: `1px solid ${colors.metricStripBorder}`, borderRight: `1px solid ${colors.metricStripBorder}` }}>
                        <span style={{ display: 'block', color: colors.metricLabel, fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Rating</span>
                        <strong style={{ color: '#F59E0B', fontSize: '12.5px' }}>★ {tailor.rating} ({tailor.reviewsCount})</strong>
                      </div>
                      <div>
                        <span style={{ display: 'block', color: colors.metricLabel, fontSize: '9.5px', textTransform: 'uppercase', fontWeight: 700 }}>Completed</span>
                        <strong style={{ color: '#10B981', fontSize: '12.5px' }}>{tailor.orders}+ orders</strong>
                      </div>
                    </div>

                    {/* Turnaround & Availability Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {tailor.availability}
                      </span>
                      <span style={{ color: colors.tailorSpecialty, fontWeight: 600 }}>
                        {tailor.turnaround}
                      </span>
                    </div>

                    {/* Specialty Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {tailor.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: colors.tagBg,
                            color: colors.tagText,
                            border: `1px solid ${colors.tagBorder}`
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action CTA Buttons */}
                    <div style={{ display: 'flex', gap: '10px', borderTop: `1px solid ${colors.metricStripBorder}`, paddingTop: '12px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewPortfolioTailor(tailor);
                        }}
                        style={{
                          flex: 1,
                          padding: '9px 12px',
                          borderRadius: '10px',
                          background: colors.secondaryBtnBg,
                          border: `1px solid ${colors.secondaryBtnBorder}`,
                          color: colors.secondaryBtnText,
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Eye size={13} style={{ color: colors.secondaryBtnText }} />
                        <span style={{ color: colors.secondaryBtnText }}>View Creations</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookTailor(tailor);
                        }}
                        style={{
                          flex: 1.2,
                          padding: '9px 14px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #F72585 0%, #7209B7 100%)',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 14px rgba(247, 37, 133, 0.35)'
                        }}
                      >
                        <Scissors size={13} style={{ color: '#ffffff' }} />
                        <span style={{ color: '#ffffff' }}>Book Doorstep Trial</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* TRUST & GUARANTEE STRIP */}
        <div style={{
          marginTop: '3.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          background: colors.trustCardBg,
          border: `1px solid ${colors.trustCardBorder}`,
          borderRadius: '18px',
          padding: '24px 28px',
          boxShadow: colors.filterShadow
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(247, 37, 133, 0.15)', color: '#F72585', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', color: colors.trustCardTitle, display: 'block' }}>Doorstep Measurement Trials</strong>
              <span style={{ fontSize: '11.5px', color: colors.trustCardSubtitle }}>Master fashion consultants visit your home</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(114, 9, 183, 0.15)', color: '#7209B7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Scissors size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', color: colors.trustCardTitle, display: 'block' }}>100% Perfect Fit Guarantee</strong>
              <span style={{ fontSize: '11.5px', color: colors.trustCardSubtitle }}>Free unlimited adjustments until it fits like a glove</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', color: colors.trustCardTitle, display: 'block' }}>Fast Turnaround & Insured</strong>
              <span style={{ fontSize: '11.5px', color: colors.trustCardSubtitle }}>Express 24h & 48h delivery in garment bags</span>
            </div>
          </div>
        </div>

      </div>

      {/* ATELIER CREATIONS / PORTFOLIO MODAL */}
      {previewPortfolioTailor && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: isLight ? '#ffffff' : '#141126',
            border: `1px solid ${colors.filterBorder}`,
            borderRadius: '24px',
            maxWidth: '640px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.25s ease'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.filterBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '10.5px', color: '#F72585', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Atelier Creations & Portfolio
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: colors.tailorTitle, margin: '2px 0 0 0' }}>
                  {previewPortfolioTailor.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewPortfolioTailor(null)}
                style={{ background: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.08)', border: 'none', color: colors.tailorTitle, width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body: Gallery Grid */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '65vh', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
                {previewPortfolioTailor.portfolio.map((item, pIdx) => (
                  <div key={pIdx} style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${colors.filterBorder}`, background: isLight ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      style={{ width: '100%', height: '170px', objectFit: 'cover' }} 
                    />
                    <div style={{ padding: '10px 12px' }}>
                      <strong style={{ fontSize: '12px', color: colors.tailorTitle, display: 'block' }}>{item.title}</strong>
                      <span style={{ fontSize: '11px', color: '#F72585', fontWeight: 700 }}>Custom Stitching from {item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: isLight ? '#fff0f6' : 'rgba(247, 37, 133, 0.12)', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(247, 37, 133, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <strong style={{ fontSize: '12.5px', color: colors.tailorTitle, display: 'block' }}>Ready to customize your design?</strong>
                  <span style={{ fontSize: '11px', color: colors.tailorSpecialty }}>Book a home visit or studio trial with {previewPortfolioTailor.masterTailor}</span>
                </div>
                <button
                  onClick={() => {
                    const t = previewPortfolioTailor;
                    setPreviewPortfolioTailor(null);
                    handleBookTailor(t);
                  }}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    background: '#F72585',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span style={{ color: '#ffffff' }}>Book Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
