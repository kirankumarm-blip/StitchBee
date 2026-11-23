// ==========================================================================
// STITCHBEEZ WOMEN'S STITCHING & TAILORING DATA STORE
// Exact UI assets, category configs, styles, fabrics, inspiration slides & providers
// ==========================================================================

export const WOMEN_ASSETS = {
  hero: '/images/StitchBeezWomen/HERO.png',
  twoPanels: {
    tailor: '/images/StitchBeezWomen/Get it Stitched with a Verified Tailor Near You.png',
    designer: '/images/StitchBeezWomen/Design a Unique Outfit with Fashion Designer.png'
  },
  bottomBanner: '/images/StitchBeezWomen/Every Occasion A More Beatiful You.png',
  categories: {
    sarees: '/images/StitchBeezWomen/Designer Saree.png',
    salwarSuits: '/images/StitchBeezWomen/Salwar Suits.png',
    lehengaGowns: '/images/StitchBeezWomen/Lehenga & Gowns.png',
    kurtis: '/images/StitchBeezWomen/Kurtis & Kurtis Set.png',
    blouses: '/images/StitchBeezWomen/Blouses.png',
    westernWear: '/images/StitchBeezWomen/Western Wear.png',
    plusSize: '/images/StitchBeezWomen/Plus Size.png',
    maternityWear: '/images/StitchBeezWomen/Meternity Wear.png',
    ethnicWear: '/images/StitchBeezWomen/Ethnic Wear.png',
    customDesign: '/images/StitchBeezWomen/Custom Design.png'
  },
  mostLoved: {
    designerSaree: '/images/StitchBeezWomen/Designer Saree.png',
    anarkaliSuit: '/images/StitchBeezWomen/Anarkali Suit.png',
    lehengaSet: '/images/StitchBeezWomen/Lehenga Set.png',
    partyWearGown: '/images/StitchBeezWomen/Party Wear Gown.png',
    kurtiSet: '/images/StitchBeezWomen/Kurti Set.png',
    blouseDesign: '/images/StitchBeezWomen/Blouse Design.png',
    officeWear: '/images/StitchBeezWomen/Office Wear.png',
    indoWestern: '/images/StitchBeezWomen/Indo-Western.png'
  },
  fabrics: {
    silk: '/images/StitchBeezWomen/Silk.png',
    georgette: '/images/StitchBeezWomen/Georgette.png',
    chiffon: '/images/StitchBeezWomen/Chiffen.png',
    crepe: '/images/StitchBeezWomen/Crape.png',
    organza: '/images/StitchBeezWomen/Organza.png',
    net: '/images/StitchBeezWomen/Net.png',
    velvet: '/images/StitchBeezWomen/Velvet.png',
    linen: '/images/StitchBeezWomen/Linen.png',
    cotton: '/images/StitchBeezWomen/Cotton.png',
    banarasi: '/images/StitchBeezWomen/Banarasi.png'
  },
  inspiration: {
    everyday: {
      main: '/images/StitchBeezWomen/Everyday Essesntials.png',
      alt: '/images/StitchBeezWomen/Everyday Essesntials Right Image.png'
    },
    festive: {
      main: '/images/StitchBeezWomen/Elegant Lilac Festive Portrait.png',
      alt: '/images/StitchBeezWomen/Festive Charm Right Image.png'
    },
    wedding: {
      main: '/images/StitchBeezWomen/Wedding Royalty.png',
      alt: '/images/StitchBeezWomen/Wedding Royalty Right Image.png'
    },
    office: {
      main: '/images/StitchBeezWomen/Office Elegance.png',
      alt: '/images/StitchBeezWomen/Office Elegance Right Image.png'
    },
    casual: {
      main: '/images/StitchBeezWomen/Casual Chic.png',
      alt: '/images/StitchBeezWomen/Casual Chic Right Image.png'
    },
    maternity: {
      main: '/images/StitchBeezWomen/Meternity Comfort.png',
      alt: '/images/StitchBeezWomen/Meternity Comfort Right Image.png'
    },
    blouses: {
      main: '/images/StitchBeezWomen/Designer Blouses.png',
      alt: '/images/StitchBeezWomen/Designer Blouses Right Image.png'
    },
    indoWestern: {
      main: '/images/StitchBeezWomen/Indo Western Fusion.png',
      alt: '/images/StitchBeezWomen/Indo Western Fusion Right Image.png'
    }
  }
};

// 10 Women's Stitching Categories (Section 6)
export const WOMEN_CATEGORIES = [
  {
    id: 'sarees',
    name: 'Sarees',
    subtitle: 'Blouse & Petticoat',
    image: WOMEN_ASSETS.categories.sarees,
    startingPrice: 1499,
    description: 'Custom fitted saree blouses, pre-pleated drape sarees, designer pallus, and matching satin or cotton petticoats tailored to your exact waist and height.'
  },
  {
    id: 'salwar-suits',
    name: 'Salwar Suits',
    subtitle: 'Dress Materials',
    image: WOMEN_ASSETS.categories.salwarSuits,
    startingPrice: 999,
    description: 'Anarkali, Punjabi patiala, straight cut suits, and palazzo sets stitched to your exact necklines and sleeve preferences.'
  },
  {
    id: 'lehenga-gowns',
    name: 'Lehenga & Gowns',
    subtitle: 'Bridal & Festive',
    image: WOMEN_ASSETS.categories.lehengaGowns,
    startingPrice: 3999,
    description: 'Flared lehengas, crop tops with skirts, festive evening gowns, and heavy border lehengas stitched with internal can-can.'
  },
  {
    id: 'kurtis',
    name: 'Kurtis & Kurti Sets',
    subtitle: 'Casual & Office',
    image: WOMEN_ASSETS.categories.kurtis,
    startingPrice: 499,
    description: 'Daily-wear A-line kurtis, office straight kurtas, flared tunic sets, and comfortable pant pairs in pure cotton and georgette.'
  },
  {
    id: 'blouses',
    name: 'Blouses',
    subtitle: 'Custom Designs',
    image: WOMEN_ASSETS.categories.blouses,
    startingPrice: 599,
    description: 'Padded designer blouses, backless dori patterns, princess cut, sweetheart necklines, boat necks, and maggam work custom blouses.'
  },
  {
    id: 'western-wear',
    name: 'Western Wear',
    subtitle: 'Dresses, Tops & More',
    image: WOMEN_ASSETS.categories.westernWear,
    startingPrice: 1299,
    description: 'Bespoke western dresses, formal office blazers, tailored trousers, wrap jumpsuits, and casual tops crafted to your silhouette.'
  },
  {
    id: 'plus-size',
    name: 'Plus Size',
    subtitle: 'All Styles',
    image: WOMEN_ASSETS.categories.plusSize,
    startingPrice: 799,
    description: 'Comfortable, flattering silhouettes specially tailored for curves with custom armhole allowances, bust cups, and waist ease.'
  },
  {
    id: 'maternity-wear',
    name: 'Maternity Wear',
    subtitle: 'Comfort & Style',
    image: WOMEN_ASSETS.categories.maternityWear,
    startingPrice: 699,
    description: 'Feeding-friendly zip kurtis, flexible empire-waist maternity gowns, breathable cotton dresses, and adjustable elastic pants.'
  },
  {
    id: 'ethnic-wear',
    name: 'Ethnic Wear',
    subtitle: 'Traditional Outfits',
    image: WOMEN_ASSETS.categories.ethnicWear,
    startingPrice: 1599,
    description: 'Traditional shararas, ghararas, floor-length ethnic coats, festive jackets, and authentic regional attire.'
  },
  {
    id: 'custom-design',
    name: 'Custom Design',
    subtitle: 'Your Idea, Our Craft',
    image: WOMEN_ASSETS.categories.customDesign,
    startingPrice: 1999,
    description: 'Bring your dream design to life. Upload reference photos, sketches, or ideas to collaborate directly with our fashion designers.'
  }
];

// 8 Most Loved Designs (Section 9)
export const WOMEN_MOST_LOVED = [
  {
    id: 'des-saree',
    name: 'Designer Saree',
    image: WOMEN_ASSETS.mostLoved.designerSaree,
    price: 2499,
    category: 'sarees',
    tags: ['Bridal', 'Party', 'Trendy'],
    desc: 'Heavy embroidery with royal detailing and pre-pleated drape'
  },
  {
    id: 'des-anarkali',
    name: 'Anarkali Suit',
    image: WOMEN_ASSETS.mostLoved.anarkaliSuit,
    price: 2299,
    category: 'salwar-suits',
    tags: ['Festive', 'Elegant', 'Party'],
    desc: 'Royal flared silk anarkali with fine zari neckline work'
  },
  {
    id: 'des-lehenga',
    name: 'Lehenga Set',
    image: WOMEN_ASSETS.mostLoved.lehengaSet,
    price: 5999,
    category: 'lehenga-gowns',
    tags: ['Bridal', 'Designer', 'Custom'],
    desc: 'Grand multi-panel lehenga with matching embroidered choli'
  },
  {
    id: 'des-gown',
    name: 'Party Wear Gown',
    image: WOMEN_ASSETS.mostLoved.partyWearGown,
    price: 4499,
    category: 'western-wear',
    tags: ['Party', 'Modern', 'Stylish'],
    desc: 'Cowl-neck shimmering evening gown with structured boning'
  },
  {
    id: 'des-kurti',
    name: 'Kurti Set',
    image: WOMEN_ASSETS.mostLoved.kurtiSet,
    price: 1499,
    category: 'kurtis',
    tags: ['Casual', 'Office', 'Daily Wear'],
    desc: 'Comfortable cotton-georgette kurti with straight pants'
  },
  {
    id: 'des-blouse',
    name: 'Blouse Design',
    image: WOMEN_ASSETS.mostLoved.blouseDesign,
    price: 899,
    category: 'blouses',
    tags: ['Custom', 'Designer', 'Trendy'],
    desc: 'Princess-cut padded bridal blouse with latkan dori back'
  },
  {
    id: 'des-office',
    name: 'Office Wear',
    image: WOMEN_ASSETS.mostLoved.officeWear,
    price: 1299,
    category: 'western-wear',
    tags: ['Formal', 'Elegant', 'Daily'],
    desc: 'Crisp tailored formal shirts and flattering pencil trousers'
  },
  {
    id: 'des-indo-west',
    name: 'Indo-Western',
    image: WOMEN_ASSETS.mostLoved.indoWestern,
    price: 2499,
    category: 'ethnic-wear',
    tags: ['Fusion', 'Trendy', 'Party'],
    desc: 'Dhoti pants with asymmetrical embroidered cape jacket'
  }
];

// 10 Luxurious Fabrics for Every Style (Section 10)
export const WOMEN_FABRICS = [
  {
    id: 'fab-silk',
    name: 'Silk',
    material: 'Pure Mulberry Silk',
    price: 1499,
    rating: '5.0',
    tag: 'Pure Silk',
    image: WOMEN_ASSETS.fabrics.silk,
    desc: 'High lustre, naturally breathable pure silk fabric for sarees, bridal cholis, and royal festive ensembles.'
  },
  {
    id: 'fab-georgette',
    name: 'Georgette',
    material: 'Embellished Silk Georgette',
    price: 699,
    rating: '4.8',
    tag: 'Lightweight',
    image: WOMEN_ASSETS.fabrics.georgette,
    desc: 'Crinkly, bouncy drape ideal for anarkalis, flowing kurtis, and light summer festive outfits.'
  },
  {
    id: 'fab-chiffon',
    name: 'Chiffon',
    material: 'Pure Chiffon Blend',
    price: 599,
    rating: '4.7',
    tag: 'Flowy & Soft',
    image: WOMEN_ASSETS.fabrics.chiffon,
    desc: 'Extremely soft, sheer, and airy fabric that drapes effortlessly for dupattas, evening sarees, and overlay capes.'
  },
  {
    id: 'fab-crepe',
    name: 'Crepe',
    material: 'Heavy Silk Crepe',
    price: 799,
    rating: '4.9',
    tag: 'Wrinkle-Resistant',
    image: WOMEN_ASSETS.fabrics.crepe,
    desc: 'Crisp texture with rich body and matte shine, perfect for structured dresses, formal kurtis, and modern ethnic suits.'
  },
  {
    id: 'fab-organza',
    name: 'Organza',
    material: 'Airy Silk Organza',
    price: 899,
    rating: '4.8',
    tag: 'Crisp & Sheer',
    image: WOMEN_ASSETS.fabrics.organza,
    desc: 'Structured transparency with gentle sheen, ideal for floral printed lehengas, organza sarees, and statement sleeves.'
  },
  {
    id: 'fab-net',
    name: 'Net',
    material: 'Embroidered Tulle Net',
    price: 499,
    rating: '4.7',
    tag: 'Embellished',
    image: WOMEN_ASSETS.fabrics.net,
    desc: 'Delicate yet sturdy mesh fabric decorated with beads, sequins, and zari embroidery for dreamy wedding gowns.'
  },
  {
    id: 'fab-velvet',
    name: 'Velvet',
    material: 'Micro-Velvet 9000',
    price: 1899,
    rating: '5.0',
    tag: 'Royal Winter',
    image: WOMEN_ASSETS.fabrics.velvet,
    desc: 'Plush, dense pile with rich reflective highlights, unmatched for winter weddings, royal blouses, and heavy lehengas.'
  },
  {
    id: 'fab-linen',
    name: 'Linen',
    material: 'Pure European Flax',
    price: 999,
    rating: '4.9',
    tag: 'Eco Breathable',
    image: WOMEN_ASSETS.fabrics.linen,
    desc: 'Natural, thermoregulating linen weave for breathable formal workwear, summer tunics, and comfortable daily kurtis.'
  },
  {
    id: 'fab-cotton',
    name: 'Cotton',
    material: 'Super-Combed Pure Cotton',
    price: 449,
    rating: '4.9',
    tag: '100% Cotton',
    image: WOMEN_ASSETS.fabrics.cotton,
    desc: 'Hypoallergenic, ultra-soft pure cotton suitable for daily office wear, feeding-friendly maternity kurtis, and simple salwar sets.'
  },
  {
    id: 'fab-banarasi',
    name: 'Banarasi',
    material: 'Pure Banarasi Brocade',
    price: 2199,
    rating: '5.0',
    tag: 'Heritage Weave',
    image: WOMEN_ASSETS.fabrics.banarasi,
    desc: 'Opulent gold and silver metallic zari woven into pure silk, the hallmark of royal heritage sarees and bridal lehengas.'
  }
];

// 6 Step How It Works (Section 11)
export const WOMEN_HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Choose Outfit',
    desc: 'Select a style or share your idea.'
  },
  {
    step: 2,
    title: 'Select Fabric',
    desc: 'Choose from our fabrics or use your own.'
  },
  {
    step: 3,
    title: 'Measurements',
    desc: 'AI / Manual / Home measurement.'
  },
  {
    step: 4,
    title: 'Review Design & Price',
    desc: 'Approve the design and quotation.'
  },
  {
    step: 5,
    title: 'Expert Stitching',
    desc: 'By verified tailors or designers.'
  },
  {
    step: 6,
    title: 'Final Fitting & Delivery',
    desc: 'On-time delivery at your doorstep.'
  }
];

// 8 Dual-Image Inspiration Cards (Section 12: Look Your Best, Always)
export const WOMEN_INSPIRATION_SLIDES = [
  {
    id: 'insp-everyday',
    title: 'Everyday Essentials',
    desc: 'Smart & Comfortable',
    category: 'kurtis',
    images: [
      WOMEN_ASSETS.inspiration.everyday.main,
      WOMEN_ASSETS.inspiration.everyday.alt
    ]
  },
  {
    id: 'insp-festive',
    title: 'Festive Charm',
    desc: 'Traditional & Trendy',
    category: 'salwar-suits',
    images: [
      WOMEN_ASSETS.inspiration.festive.main,
      WOMEN_ASSETS.inspiration.festive.alt
    ]
  },
  {
    id: 'insp-wedding',
    title: 'Wedding Royalty',
    desc: 'Elegant & Grand',
    category: 'lehenga-gowns',
    images: [
      WOMEN_ASSETS.inspiration.wedding.main,
      WOMEN_ASSETS.inspiration.wedding.alt
    ]
  },
  {
    id: 'insp-office',
    title: 'Office Elegance',
    desc: 'Professional & Polished',
    category: 'western-wear',
    images: [
      WOMEN_ASSETS.inspiration.office.main,
      WOMEN_ASSETS.inspiration.office.alt
    ]
  },
  {
    id: 'insp-casual',
    title: 'Casual Chic',
    desc: 'Easy & Stylish',
    category: 'kurtis',
    images: [
      WOMEN_ASSETS.inspiration.casual.main,
      WOMEN_ASSETS.inspiration.casual.alt
    ]
  },
  {
    id: 'insp-maternity',
    title: 'Maternity Comfort',
    desc: 'Style with Ease',
    category: 'maternity-wear',
    images: [
      WOMEN_ASSETS.inspiration.maternity.main,
      WOMEN_ASSETS.inspiration.maternity.alt
    ]
  },
  {
    id: 'insp-blouses',
    title: 'Designer Blouses',
    desc: 'Unique & Trendy',
    category: 'blouses',
    images: [
      WOMEN_ASSETS.inspiration.blouses.main,
      WOMEN_ASSETS.inspiration.blouses.alt
    ]
  },
  {
    id: 'insp-indo-west',
    title: 'Indo-Western Fusion',
    desc: 'Modern & Elegant',
    category: 'ethnic-wear',
    images: [
      WOMEN_ASSETS.inspiration.indoWestern.main,
      WOMEN_ASSETS.inspiration.indoWestern.alt
    ]
  }
];

// 3 Customer Testimonials (Section 13)
export const WOMEN_REVIEWS = [
  {
    id: 'rev-sneha',
    author: 'Sneha R.',
    location: 'Bengaluru',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    quote: 'Perfect fitting and excellent fabric quality. Loved the design and timely delivery!'
  },
  {
    id: 'rev-divya',
    author: 'Divya K.',
    location: 'Hyderabad',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    quote: 'The home measurement service was very convenient. Highly recommend!'
  },
  {
    id: 'rev-neha',
    author: 'Neha M.',
    location: 'Chennai',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    quote: 'Beautiful stitching and professional support. My saree blouse fit perfectly!'
  }
];

// Verified Tailors & Fashion Designers (Section 7, 8 & 15 Google Maps)
export const WOMEN_PROVIDERS = [
  {
    id: 'prov-priya',
    name: 'Priya Couture',
    type: 'Fashion Designer',
    role: 'designer',
    rating: 4.9,
    reviewsCount: 140,
    location: 'Indiranagar, Bengaluru',
    distance: '2.1 km',
    lat: 12.9784,
    lng: 77.6408,
    specialization: 'Custom Bridal & Festive Blouses',
    startingPrice: '₹1,499',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    portfolio: [
      WOMEN_ASSETS.mostLoved.designerSaree,
      WOMEN_ASSETS.mostLoved.lehengaSet,
      WOMEN_ASSETS.mostLoved.blouseDesign
    ],
    experience: '11+ Years in Couture',
    deliveryDays: '4-6 Days'
  },
  {
    id: 'prov-meera',
    name: 'Meera Boutique',
    type: 'Master Tailor & Designer',
    role: 'tailor',
    rating: 4.8,
    reviewsCount: 95,
    location: 'Koramangala, Bengaluru',
    distance: '3.4 km',
    lat: 12.9352,
    lng: 77.6245,
    specialization: 'Designer Salwar Suits & Anarkalis',
    startingPrice: '₹899',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    portfolio: [
      WOMEN_ASSETS.mostLoved.anarkaliSuit,
      WOMEN_ASSETS.mostLoved.kurtiSet,
      WOMEN_ASSETS.mostLoved.designerSaree
    ],
    experience: '14+ Years Tailoring',
    deliveryDays: '3-5 Days'
  },
  {
    id: 'prov-ananya',
    name: 'Ananya Stitch Studio',
    type: 'Ladies Tailor',
    role: 'tailor',
    rating: 4.7,
    reviewsCount: 110,
    location: 'Jayanagar, Bengaluru',
    distance: '4.2 km',
    lat: 12.9298,
    lng: 77.5828,
    specialization: 'Padded Blouses & Saree Fall Hemming',
    startingPrice: '₹599',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    portfolio: [
      WOMEN_ASSETS.mostLoved.blouseDesign,
      WOMEN_ASSETS.mostLoved.designerSaree
    ],
    experience: '8+ Years Tailoring',
    deliveryDays: '2-4 Days'
  },
  {
    id: 'prov-lavanya',
    name: 'Lavanya Designers',
    type: 'Fashion Designer',
    role: 'designer',
    rating: 4.9,
    reviewsCount: 180,
    location: 'HSR Layout, Bengaluru',
    distance: '5.1 km',
    lat: 12.9116,
    lng: 77.6389,
    specialization: 'Indo-Western & Evening Gowns',
    startingPrice: '₹1,899',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
    portfolio: [
      WOMEN_ASSETS.mostLoved.partyWearGown,
      WOMEN_ASSETS.mostLoved.indoWestern
    ],
    experience: '12+ Years Couture',
    deliveryDays: '4-7 Days'
  },
  {
    id: 'prov-kavita',
    name: 'Kavita Ladies Tailor',
    type: 'Master Tailor',
    role: 'tailor',
    rating: 4.8,
    reviewsCount: 85,
    location: 'Malleshwaram, Bengaluru',
    distance: '6.0 km',
    lat: 13.0031,
    lng: 77.5643,
    specialization: 'Traditional Kurtis & Plus Size Wear',
    startingPrice: '₹499',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    portfolio: [
      WOMEN_ASSETS.mostLoved.kurtiSet,
      WOMEN_ASSETS.mostLoved.officeWear
    ],
    experience: '15+ Years Tailoring',
    deliveryDays: '3-4 Days'
  },
  {
    id: 'prov-zari',
    name: 'Zari & Threads Studio',
    type: 'Couture Fashion Studio',
    role: 'designer',
    rating: 4.9,
    reviewsCount: 125,
    location: 'Whitefield, Bengaluru',
    distance: '9.2 km',
    lat: 12.9698,
    lng: 77.7500,
    specialization: 'Festive Lehengas & Maternity Wear',
    startingPrice: '₹2,199',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    portfolio: [
      WOMEN_ASSETS.mostLoved.lehengaSet,
      WOMEN_ASSETS.mostLoved.anarkaliSuit
    ],
    experience: '9+ Years Design',
    deliveryDays: '5-7 Days'
  }
];
