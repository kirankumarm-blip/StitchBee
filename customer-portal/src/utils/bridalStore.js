// ==========================================================================
// STITCHBEEZ BRIDAL STITCHING & TAILORING DATA STORE
// Exact UI assets, category configs, trending styles, fabrics, providers & testimonials
// ==========================================================================

export const BRIDAL_ASSETS = {
  hero: '/images/StitchBeezBridal/HERO.png',
  panels: {
    mens: '/images/StitchBeezBridal/Mens Bridal Stitching.png',
    designer: '/images/StitchBeezBridal/Design with Our Fashion Designers.png',
    womens: '/images/StitchBeezBridal/Womens Bridal Stitching.png'
  },
  bottomBanner: '/images/StitchBeezBridal/Your Dream Wedding Outfit Starts Here.png',
  categories: {
    bridalLehengas: '/images/StitchBeezBridal/Bridal Lehengas.png',
    bridalSarees: '/images/StitchBeezBridal/Bridal Sarees.png',
    engagementGowns: '/images/StitchBeezBridal/Engagement Gowns.png',
    receptionWear: '/images/StitchBeezBridal/Reception Saree.png',
    sherwanis: '/images/StitchBeezBridal/Sherwanis.png',
    indoWestern: '/images/StitchBeezBridal/Indo-Western.png',
    suitsTuxedos: '/images/StitchBeezBridal/Inits & Tuxedos.png',
    jodhpuriSuits: '/images/StitchBeezBridal/Jodhpuri Suites.png',
    coupleOutfits: '/images/StitchBeezBridal/Couple Outfits.png',
    customDesign: '/images/StitchBeezBridal/Custom Design.png'
  },
  trending: {
    embroideredLehenga: {
      main: '/images/StitchBeezBridal/Embroidered Lehenga.png',
      alt: '/images/StitchBeezBridal/Embroidered Lehenga Right Image.png'
    },
    pastelBridalSaree: {
      main: '/images/StitchBeezBridal/Pastel Bridal Saree.png',
      alt: '/images/StitchBeezBridal/Pastel Bridal Saree Right Image.png'
    },
    royalSherwani: {
      main: '/images/StitchBeezBridal/Royal Sherwani.png',
      alt: '/images/StitchBeezBridal/Royal Sherwani Right Image.png'
    },
    designerGown: {
      main: '/images/StitchBeezBridal/Designer Gown.png',
      alt: '/images/StitchBeezBridal/Designer Gown Right Image.png'
    },
    indoWesternSet: {
      main: '/images/StitchBeezBridal/Indo-Western Set.png',
      alt: '/images/StitchBeezBridal/Indo-Western Set Right Image.png'
    },
    receptionSaree: {
      main: '/images/StitchBeezBridal/Reception Saree.png',
      alt: '/images/StitchBeezBridal/Reception Saree Right Image.png'
    },
    jodhpuriSuit: {
      main: '/images/StitchBeezBridal/Jodhpuri Suit.png',
      alt: '/images/StitchBeezBridal/Jodhpuri Suit Right Image.png'
    },
    coupleOutfit: {
      main: '/images/StitchBeezBridal/Couple Outfit.png',
      alt: '/images/StitchBeezBridal/Couple Outfit Right Image.png'
    }
  },
  fabrics: {
    silk: '/images/StitchBeezBridal/Silk.png',
    banarasi: '/images/StitchBeezBridal/Banarasi.png',
    velvet: '/images/StitchBeezBridal/Velvet.png',
    net: '/images/StitchBeezBridal/Net.png',
    georgette: '/images/StitchBeezBridal/Georgette.png',
    organza: '/images/StitchBeezBridal/Organta.png',
    chiffon: '/images/StitchBeezBridal/Chiffon.png',
    tissue: '/images/StitchBeezBridal/Tissue.png',
    brocade: '/images/StitchBeezBridal/Brocade.png',
    rawSilk: '/images/StitchBeezBridal/Raw Silk.png'
  },
  providers: {
    aarav: '/images/StitchBeezBridal/Aarav Couture.png',
    meera: '/images/StitchBeezBridal/Meera Designs.png',
    royal: '/images/StitchBeezBridal/Royal Thread.png',
    sona: '/images/StitchBeezBridal/Sona Bridal Design.png',
    khan: '/images/StitchBeezBridal/Khan Tailors.png',
    elite: '/images/StitchBeezBridal/Elite Design House.png'
  }
};

export const BRIDAL_CATEGORIES = [
  {
    id: 'bridal-lehengas',
    title: 'Bridal Lehengas',
    tag: '(for Her)',
    gender: 'women',
    image: BRIDAL_ASSETS.categories.bridalLehengas,
    startingPrice: 5999,
    turnaround: '10 - 14 Days',
    description: 'Heavily embroidered royal lehengas, zardozi work, and designer flared skirts.'
  },
  {
    id: 'bridal-sarees',
    title: 'Bridal Sarees',
    tag: '(for Her)',
    gender: 'women',
    image: BRIDAL_ASSETS.categories.bridalSarees,
    startingPrice: 2499,
    turnaround: '5 - 7 Days',
    description: 'Designer blouse stitching, maggam embroidery, and pre-pleated bridal draping.'
  },
  {
    id: 'engagement-gowns',
    title: 'Engagement Gowns',
    tag: '(for Her)',
    gender: 'women',
    image: BRIDAL_ASSETS.categories.engagementGowns,
    startingPrice: 4499,
    turnaround: '8 - 12 Days',
    description: 'Contemporary trail gowns, corset silhouettes, and crystal-embellished evening wear.'
  },
  {
    id: 'reception-wear',
    title: 'Reception Wear',
    tag: '(for Her)',
    gender: 'women',
    image: BRIDAL_ASSETS.categories.receptionWear,
    startingPrice: 3999,
    turnaround: '7 - 10 Days',
    description: 'Glamorous cocktail sarees, shararas, and Indo-western evening attire.'
  },
  {
    id: 'sherwanis',
    title: 'Sherwanis',
    tag: '(for Him)',
    gender: 'men',
    image: BRIDAL_ASSETS.categories.sherwanis,
    startingPrice: 4999,
    turnaround: '8 - 12 Days',
    description: 'Bespoke royal sherwanis, embroidered anarkalis, and matching churidars.'
  },
  {
    id: 'indo-western',
    title: 'Indo-Western',
    tag: '(for Him)',
    gender: 'men',
    image: BRIDAL_ASSETS.categories.indoWestern,
    startingPrice: 3499,
    turnaround: '7 - 9 Days',
    description: 'Asymmetric cuts, modern overlap bandhgalas, and fusion jacket sets.'
  },
  {
    id: 'suits-tuxedos',
    title: 'Suits & Tuxedos',
    tag: '(for Him)',
    gender: 'men',
    image: BRIDAL_ASSETS.categories.suitsTuxedos,
    startingPrice: 5499,
    turnaround: '8 - 10 Days',
    description: 'Satin lapel black-tie tuxedos, 3-piece bespoke suiting, and double-breasted blazers.'
  },
  {
    id: 'jodhpuri-suits',
    title: 'Jodhpuri Suits',
    tag: '(for Him)',
    gender: 'men',
    image: BRIDAL_ASSETS.categories.jodhpuriSuits,
    startingPrice: 3999,
    turnaround: '6 - 8 Days',
    description: 'Structured bandhgala jackets with royal crest buttons and tailored trousers.'
  },
  {
    id: 'couple-outfits',
    title: 'Couple Outfits',
    tag: '(His & Hers)',
    gender: 'couple',
    image: BRIDAL_ASSETS.categories.coupleOutfits,
    startingPrice: 8999,
    turnaround: '12 - 16 Days',
    description: 'Perfect color-palette synchronization, matched embroidery motifs, and dual fitting.'
  },
  {
    id: 'custom-design',
    title: 'Custom Design',
    tag: '(Your Idea)',
    gender: 'custom',
    isCustom: true,
    image: BRIDAL_ASSETS.categories.customDesign,
    startingPrice: 6999,
    turnaround: '14 - 18 Days',
    description: 'Bring your Pinterest sketches or dream ideas to life with our master bridal couturiers.'
  }
];

export const BRIDAL_TRENDING_STYLES = [
  {
    id: 'emb-lehenga',
    name: 'Embroidered Lehenga',
    desc: 'Heavy embroidery with royal detailing',
    category: 'bridal-lehengas',
    filterTag: 'Lehenga',
    startingPrice: 7999,
    mainImage: BRIDAL_ASSETS.trending.embroideredLehenga.main,
    altImage: BRIDAL_ASSETS.trending.embroideredLehenga.alt,
    images: [
      BRIDAL_ASSETS.trending.embroideredLehenga.main,
      BRIDAL_ASSETS.trending.embroideredLehenga.alt
    ]
  },
  {
    id: 'pastel-saree',
    name: 'Pastel Bridal Saree',
    desc: 'Elegant and modern look',
    category: 'bridal-sarees',
    filterTag: 'Saree',
    startingPrice: 3299,
    mainImage: BRIDAL_ASSETS.trending.pastelBridalSaree.main,
    altImage: BRIDAL_ASSETS.trending.pastelBridalSaree.alt,
    images: [
      BRIDAL_ASSETS.trending.pastelBridalSaree.main,
      BRIDAL_ASSETS.trending.pastelBridalSaree.alt
    ]
  },
  {
    id: 'royal-sherwani',
    name: 'Royal Sherwani',
    desc: 'Timeless traditional design',
    category: 'sherwanis',
    filterTag: 'Sherwani',
    startingPrice: 5999,
    mainImage: BRIDAL_ASSETS.trending.royalSherwani.main,
    altImage: BRIDAL_ASSETS.trending.royalSherwani.alt,
    images: [
      BRIDAL_ASSETS.trending.royalSherwani.main,
      BRIDAL_ASSETS.trending.royalSherwani.alt
    ]
  },
  {
    id: 'designer-gown',
    name: 'Designer Gown',
    desc: 'Trendy & contemporary',
    category: 'engagement-gowns',
    filterTag: 'Gown',
    startingPrice: 4899,
    mainImage: BRIDAL_ASSETS.trending.designerGown.main,
    altImage: BRIDAL_ASSETS.trending.designerGown.alt,
    images: [
      BRIDAL_ASSETS.trending.designerGown.main,
      BRIDAL_ASSETS.trending.designerGown.alt
    ]
  },
  {
    id: 'indo-western-set',
    name: 'Indo-Western Set',
    desc: 'Modern with ethnic touch',
    category: 'indo-western',
    filterTag: 'Indo-Western',
    startingPrice: 3999,
    mainImage: BRIDAL_ASSETS.trending.indoWesternSet.main,
    altImage: BRIDAL_ASSETS.trending.indoWesternSet.alt,
    images: [
      BRIDAL_ASSETS.trending.indoWesternSet.main,
      BRIDAL_ASSETS.trending.indoWesternSet.alt
    ]
  },
  {
    id: 'reception-saree',
    name: 'Reception Saree',
    desc: 'Graceful for evening events',
    category: 'reception-wear',
    filterTag: 'Saree',
    startingPrice: 3699,
    mainImage: BRIDAL_ASSETS.trending.receptionSaree.main,
    altImage: BRIDAL_ASSETS.trending.receptionSaree.alt,
    images: [
      BRIDAL_ASSETS.trending.receptionSaree.main,
      BRIDAL_ASSETS.trending.receptionSaree.alt
    ]
  },
  {
    id: 'jodhpuri-suit',
    name: 'Jodhpuri Suit',
    desc: 'Elegant royal look',
    category: 'jodhpuri-suits',
    filterTag: 'Suits',
    startingPrice: 4499,
    mainImage: BRIDAL_ASSETS.trending.jodhpuriSuit.main,
    altImage: BRIDAL_ASSETS.trending.jodhpuriSuit.alt,
    images: [
      BRIDAL_ASSETS.trending.jodhpuriSuit.main,
      BRIDAL_ASSETS.trending.jodhpuriSuit.alt
    ]
  },
  {
    id: 'couple-outfit',
    name: 'Couple Outfit',
    desc: 'Perfectly coordinated',
    category: 'couple-outfits',
    filterTag: 'Couple Outfits',
    startingPrice: 9999,
    mainImage: BRIDAL_ASSETS.trending.coupleOutfit.main,
    altImage: BRIDAL_ASSETS.trending.coupleOutfit.alt,
    images: [
      BRIDAL_ASSETS.trending.coupleOutfit.main,
      BRIDAL_ASSETS.trending.coupleOutfit.alt
    ]
  }
];

export const BRIDAL_FABRICS = [
  {
    id: 'fab-silk',
    name: 'Pure Mulberry Silk',
    type: 'Pure Silk',
    image: BRIDAL_ASSETS.fabrics.silk,
    pricePerMeter: 1850,
    suitableFor: 'Bridal Lehengas & Sherwanis',
    season: 'All-Season Royal',
    description: '100% genuine Mulberry silk with rich lustrous sheen and superior drape.'
  },
  {
    id: 'fab-banarasi',
    name: 'Heritage Banarasi Katan',
    type: 'Brocade / Zari',
    image: BRIDAL_ASSETS.fabrics.banarasi,
    pricePerMeter: 2400,
    suitableFor: 'Wedding Sarees & Kurtas',
    season: 'Bridal Grandeur',
    description: 'Intricately woven gold and silver zari motifs on fine katan silk warp.'
  },
  {
    id: 'fab-velvet',
    name: 'Royal Micro-Velvet 9000',
    type: 'Micro Velvet',
    image: BRIDAL_ASSETS.fabrics.velvet,
    pricePerMeter: 1650,
    suitableFor: 'Groom Sherwanis & Heavy Blouses',
    season: 'Winter & Evening Receptions',
    description: 'Ultra-plush deep-pile micro-velvet, ideal base for zardozi hand embroidery.'
  },
  {
    id: 'fab-net',
    name: 'Bridal Soft Net',
    type: 'Embroidered Net',
    image: BRIDAL_ASSETS.fabrics.net,
    pricePerMeter: 950,
    suitableFor: 'Flared Can-Can Skirts & Veils',
    season: 'Festive & Contemporary',
    description: 'Feather-light fine tulle net with subtle shimmer for multi-layered lehengas.'
  },
  {
    id: 'fab-georgette',
    name: 'Pure Viscose Georgette',
    type: 'Viscose Georgette',
    image: BRIDAL_ASSETS.fabrics.georgette,
    pricePerMeter: 1100,
    suitableFor: 'Gowns, Draped Sarees & Anarkalis',
    season: 'Spring / Summer Celebrations',
    description: 'Crêpe-textured fluid fabric offering majestic bounce and graceful movement.'
  },
  {
    id: 'fab-organza',
    name: 'Glass Tissue Organza',
    type: 'Pure Organza',
    image: BRIDAL_ASSETS.fabrics.organza,
    pricePerMeter: 1350,
    suitableFor: 'Pastel Bridal Dupattas & Sarees',
    season: 'Modern Pastel Weddings',
    description: 'Crisp, structured transparency with delicate metallic gold filament sheen.'
  },
  {
    id: 'fab-chiffon',
    name: 'Pure Silk Chiffon',
    type: 'Silk Chiffon',
    image: BRIDAL_ASSETS.fabrics.chiffon,
    pricePerMeter: 1250,
    suitableFor: 'Flowing Gowns & Sangeet Drapes',
    season: 'Destination & Beach Weddings',
    description: 'Whisper-soft breathable weave ensuring effortless grace and all-day comfort.'
  },
  {
    id: 'fab-tissue',
    name: 'Metallic Zari Tissue',
    type: 'Zari Tissue',
    image: BRIDAL_ASSETS.fabrics.tissue,
    pricePerMeter: 1750,
    suitableFor: 'Reception Sarees & Waistcoats',
    season: 'Evening Glamour',
    description: 'Gleaming dual-tone metallic warp woven with pure silk weft.'
  },
  {
    id: 'fab-brocade',
    name: 'Chanderi Gold Brocade',
    type: 'Jacquard Brocade',
    image: BRIDAL_ASSETS.fabrics.brocade,
    pricePerMeter: 1950,
    suitableFor: 'Jodhpuri Bandhgalas & Lehengas',
    season: 'Traditional & Royal',
    description: 'High-density embossed floral jaal with anti-crease structure.'
  },
  {
    id: 'fab-rawsilk',
    name: 'Textured Tussar Raw Silk',
    type: 'Raw Silk',
    image: BRIDAL_ASSETS.fabrics.rawSilk,
    pricePerMeter: 1450,
    suitableFor: 'Groom Indo-Western & Kurta Sets',
    season: 'Timeless Classic',
    description: 'Natural slub texture with rich body and crisp tailoring hold.'
  }
];

export const BRIDAL_PROVIDERS = [
  {
    id: 'prov-aarav',
    name: 'Aarav Couture',
    type: 'Bridal • Designer',
    isDesigner: true,
    rating: 4.8,
    reviewsCount: 120,
    location: 'Indiranagar, Bengaluru',
    lat: 12.9784,
    lng: 77.6408,
    image: BRIDAL_ASSETS.providers.aarav,
    startingPrice: 6500,
    specialty: 'Royal Groom Sherwanis & Coordinated Couple Ensembles',
    experienceYears: 14,
    verified: true,
    portfolioCount: 64,
    availableSlots: ['Tomorrow, 11:30 AM', 'Tomorrow, 4:00 PM', 'Saturday, 2:30 PM']
  },
  {
    id: 'prov-meera',
    name: 'Meera Designs',
    type: 'Bridal • Designer',
    isDesigner: true,
    rating: 4.9,
    reviewsCount: 115,
    location: 'Koramangala, Bengaluru',
    lat: 12.9352,
    lng: 77.6245,
    image: BRIDAL_ASSETS.providers.meera,
    startingPrice: 5800,
    specialty: 'Intricate Zardozi Lehengas & Hand-Embroidered Blouses',
    experienceYears: 11,
    verified: true,
    portfolioCount: 78,
    availableSlots: ['Today, 5:30 PM', 'Tomorrow, 10:00 AM', 'Friday, 3:00 PM']
  },
  {
    id: 'prov-royal',
    name: 'Royal Threads',
    type: 'Bridal • Tailor',
    isDesigner: false,
    rating: 4.7,
    reviewsCount: 110,
    location: 'HSR Layout, Bengaluru',
    lat: 12.9121,
    lng: 77.6446,
    image: BRIDAL_ASSETS.providers.royal,
    startingPrice: 3800,
    specialty: 'Master Tailoring for Jodhpuris, Bandhgalas & Sherwanis',
    experienceYears: 18,
    verified: true,
    portfolioCount: 92,
    availableSlots: ['Today, 3:00 PM', 'Tomorrow, 11:00 AM', 'Sunday, 1:00 PM']
  },
  {
    id: 'prov-sona',
    name: 'Sana Bridal Studio',
    type: 'Bridal • Designer',
    isDesigner: true,
    rating: 4.8,
    reviewsCount: 110,
    location: 'Jayanagar, Bengaluru',
    lat: 12.9308,
    lng: 77.5838,
    image: BRIDAL_ASSETS.providers.sona,
    startingPrice: 6200,
    specialty: 'Contemporary Engagement Gowns & Trail Dupattas',
    experienceYears: 9,
    verified: true,
    portfolioCount: 55,
    availableSlots: ['Tomorrow, 1:00 PM', 'Tomorrow, 6:00 PM', 'Saturday, 11:00 AM']
  },
  {
    id: 'prov-khan',
    name: 'Khan Tailors',
    type: 'Bridal • Tailor',
    isDesigner: false,
    rating: 4.6,
    reviewsCount: 90,
    location: 'Commercial Street, Bengaluru',
    lat: 12.9822,
    lng: 77.6083,
    image: BRIDAL_ASSETS.providers.khan,
    startingPrice: 3200,
    specialty: 'Heritage Tailoring, Custom Fit Churidars & Tuxedos',
    experienceYears: 24,
    verified: true,
    portfolioCount: 110,
    availableSlots: ['Today, 4:00 PM', 'Tomorrow, 12:00 PM', 'Friday, 5:00 PM']
  },
  {
    id: 'prov-elite',
    name: 'Elite Designer House',
    type: 'Bridal • Designer',
    isDesigner: true,
    rating: 4.9,
    reviewsCount: 140,
    location: 'MG Road, Bengaluru',
    lat: 12.9756,
    lng: 77.6066,
    image: BRIDAL_ASSETS.providers.elite,
    startingPrice: 7500,
    specialty: 'Couture Wedding Wardrobes & Complete Bridal Packages',
    experienceYears: 15,
    verified: true,
    portfolioCount: 85,
    availableSlots: ['Tomorrow, 2:00 PM', 'Saturday, 10:30 AM', 'Saturday, 4:30 PM']
  }
];

export const BRIDAL_HOW_IT_WORKS_STEPS = [
  {
    num: 1,
    title: 'Choose Style',
    desc: 'Select from our styles or share your idea.'
  },
  {
    num: 2,
    title: 'Find Designer/Tailor',
    desc: 'Choose a verified designer or tailor near you.'
  },
  {
    num: 3,
    title: 'Select Fabric',
    desc: 'Choose from our fabrics or use your own.'
  },
  {
    num: 4,
    title: 'Measurements',
    desc: 'AI / Manual / Home measurement.'
  },
  {
    num: 5,
    title: 'Design & Approval',
    desc: 'Get sketches and finalize the design.'
  },
  {
    num: 6,
    title: 'Expert Stitching',
    desc: 'By verified designers or tailors.'
  },
  {
    num: 7,
    title: 'Final Fitting & Delivery',
    desc: 'On-time delivery for your special day.'
  }
];

export const BRIDAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Rohit & Sneha',
    location: 'Bengaluru',
    rating: 5,
    orderType: 'Coordinated Couple Ensembles',
    avatar: BRIDAL_ASSETS.trending.coupleOutfit.main,
    text: 'Our wedding outfits were beyond perfect. The fitting, fabric and detailing were exceptional!'
  },
  {
    id: 'rev-2',
    author: 'Ananya',
    location: 'Hyderabad',
    rating: 5,
    orderType: 'Royal Bridal Lehenga',
    avatar: BRIDAL_ASSETS.trending.embroideredLehenga.main,
    text: 'The designer understood my vision perfectly. My bridal lehenga was a dream come true.'
  },
  {
    id: 'rev-3',
    author: 'Vikram & Priya',
    location: 'Chennai',
    rating: 5,
    orderType: 'Complete Wedding Wardrobe',
    avatar: BRIDAL_ASSETS.trending.pastelBridalSaree.main,
    text: 'Complete bridal solutions under one roof. Highly professional and timely delivery.'
  }
];
