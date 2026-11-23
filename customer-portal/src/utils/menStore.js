// ==========================================================================
// STITCHBEEZ MEN'S STITCHING & TAILORING DATA STORE
// Exact UI assets, category configs, styles, fabrics, inspiration slides & providers
// ==========================================================================

export const MEN_ASSETS = {
  hero: '/images/StitchBeezMen/HERO.png',
  twoOptions: {
    tailor: '/images/StitchBeezMen/Get it Stitched With a Near By Tailor Image.png',
    designer: '/images/StitchBeezMen/Create a Unique Design With Our Fashion Designer Image.png'
  },
  bottomBanner: '/images/StitchBeezMen/Every Occasion A Perfect Outfit.png',
  categories: {
    shirts: '/images/StitchBeezMen/Shirts.png',
    trousers: '/images/StitchBeezMen/Trousers.png',
    suitsBlazers: '/images/StitchBeezMen/Suits & Balzers.png',
    sherwanis: '/images/StitchBeezMen/Sherwanis.png',
    kurtasEthnic: '/images/StitchBeezMen/Kurta Set.png',
    jacketsCoats: '/images/StitchBeezMen/Jackets & Coats.png',
    indoWestern: '/images/StitchBeezMen/Inro-Western.png',
    uniforms: '/images/StitchBeezMen/Uniforms.png',
    partyWear: '/images/StitchBeezMen/Party Wear.png',
    customDesign: '/images/StitchBeezMen/Custom Design.png'
  },
  popularStyles: {
    formalShirt: '/images/StitchBeezMen/Formal Shirt.png',
    chinoTrousers: '/images/StitchBeezMen/Chino Trousers.png',
    businessSuit: '/images/StitchBeezMen/Business Suit.png',
    weddingSherwani: '/images/StitchBeezMen/Sherwanis.png',
    kurtaSet: '/images/StitchBeezMen/Kurta Set.png',
    nehruJacket: '/images/StitchBeezMen/Nehru Jacket.png',
    indoWestern: '/images/StitchBeezMen/Inro-Western.png',
    tuxedo: '/images/StitchBeezMen/Tuxedo.png'
  },
  fabrics: {
    cotton: '/images/StitchBeezMen/Cotton.png',
    linen: '/images/StitchBeezMen/Linen.png',
    raymond: '/images/StitchBeezMen/Raymond.png',
    woolBlend: '/images/StitchBeezMen/Wool Blend.png',
    silk: '/images/StitchBeezMen/Silk.png',
    tweed: '/images/StitchBeezMen/Tweed.png',
    denim: '/images/StitchBeezMen/Denim.png',
    corduroy: '/images/StitchBeezMen/Cordoroy.png',
    banarasi: '/images/StitchBeezMen/Banarasi.png',
    jacquard: '/images/StitchBeezMen/Jocquord.png'
  },
  inspiration: {
    everyday: {
      main: '/images/StitchBeezMen/Everyday Essentials.png',
      side: '/images/StitchBeezMen/Everyday Essentials Side Image.png'
    },
    business: {
      main: '/images/StitchBeezMen/Business Elegance.png',
      side: '/images/StitchBeezMen/Business Elegance Side Image.png'
    },
    wedding: {
      main: '/images/StitchBeezMen/Wedding Royalty.png',
      side: '/images/StitchBeezMen/Wedding Royalty Side Image.png'
    },
    festive: {
      main: '/images/StitchBeezMen/Festive Charm.png',
      side: '/images/StitchBeezMen/Festive Charm Side Image.png'
    },
    indoWestern: {
      main: '/images/StitchBeezMen/Indo-Western Fusion.png',
      side: '/images/StitchBeezMen/Indo-Western Fusion Side Image.png'
    },
    party: {
      main: '/images/StitchBeezMen/Party Perfection.png',
      side: '/images/StitchBeezMen/Party Perfection Side Image.png'
    },
    retro: {
      main: '/images/StitchBeezMen/Retro 1970s.png',
      side: '/images/StitchBeezMen/Retro 1970s Side Image.png'
    }
  }
};

// 10 Stitching Categories
export const MEN_CATEGORIES = [
  {
    id: 'shirts',
    title: 'Shirts',
    subtitle: 'Casual, Formal & More',
    image: MEN_ASSETS.categories.shirts,
    startingPrice: 899,
    description: 'Custom fitted formal dress shirts, button-downs, casual linens, and mandarin collar shirts tailored to your exact chest, collar, and sleeve lengths.'
  },
  {
    id: 'trousers',
    title: 'Trousers',
    subtitle: 'Formal, Casual & Chinos',
    image: MEN_ASSETS.categories.trousers,
    startingPrice: 969,
    description: 'Tailored flat-front dress trousers, stretch cotton chinos, pleated formal slacks, and custom waistbands with hidden elastic comfort tabs.'
  },
  {
    id: 'suits-blazers',
    title: 'Suits & Blazers',
    subtitle: 'Business & Formal',
    image: MEN_ASSETS.categories.suitsBlazers,
    startingPrice: 4999,
    description: 'Single and double-breasted 2-piece and 3-piece bespoke suits, sports blazers, tuxedo jackets, and executive boardroom attire.'
  },
  {
    id: 'sherwanis',
    title: 'Sherwanis',
    subtitle: 'Weddings & Festive',
    image: MEN_ASSETS.categories.sherwanis,
    startingPrice: 8999,
    description: 'Grand royal wedding sherwanis, achkans, and jodhpuri suits adorned with hand zardozi embroidery, pearl buttons, and matching stole.'
  },
  {
    id: 'kurtas-ethnic',
    title: 'Kurtas & Ethnic Wear',
    subtitle: 'Traditional & Modern',
    image: MEN_ASSETS.categories.kurtasEthnic,
    startingPrice: 2499,
    description: 'Silk blend festival kurtas, pathani suits, cowl-draped modern kurtas, and relaxed churidars hand-stitched for comfort and panache.'
  },
  {
    id: 'jackets-coats',
    title: 'Jackets & Coats',
    subtitle: 'All Seasons',
    image: MEN_ASSETS.categories.jacketsCoats,
    startingPrice: 3499,
    description: 'Nehru jackets, bandhgala waistcoats, wool overcoats, trench coats, and bomber jackets crafted with premium internal canvases.'
  },
  {
    id: 'indo-western',
    title: 'Indo-Western',
    subtitle: 'Modern Traditions',
    image: MEN_ASSETS.categories.indoWestern,
    startingPrice: 4599,
    description: 'Asymmetric fusion jackets, bandhgala tuxedos, draped kurtas with short blazers, and modern ceremonial silhouettes.'
  },
  {
    id: 'uniforms',
    title: 'Uniforms',
    subtitle: 'Corporate & Institutional',
    image: MEN_ASSETS.categories.uniforms,
    startingPrice: 1299,
    description: 'Corporate executive shirts, airline and security uniforms, medical scrubs, chef coats, and industrial workwear with custom badges.'
  },
  {
    id: 'party-wear',
    title: 'Party Wear',
    subtitle: 'Cocktails & Events',
    image: MEN_ASSETS.categories.partyWear,
    startingPrice: 3999,
    description: 'Dinner jackets, velvet blazers, sequin tuxedo lapels, statement party shirts, and clubwear designed to turn heads.'
  },
  {
    id: 'custom-design',
    title: 'Custom Design',
    subtitle: 'Your Idea, Our Craft',
    image: MEN_ASSETS.categories.customDesign,
    isCustom: true,
    startingPrice: 2999,
    description: 'Upload your own sketch, celebrity inspiration, or Pinterest pin. Our certified fashion designers and master tailors will bring it to life.'
  }
];

// Popular Styles for Every Occasion
export const MEN_POPULAR_STYLES = [
  {
    id: 'style-formal-shirt',
    name: 'Formal Shirt',
    startingPrice: 899,
    category: 'shirts',
    image: MEN_ASSETS.popularStyles.formalShirt,
    desc: 'Crisp corporate formal dress shirt with structured spread collar, French cuffs, and tailored slim fit.',
    leadTime: '3 - 4 Days',
    stitches: 'Single Needle Clean Stitching',
    recommendedFabric: 'Egyptian Cotton or Belgian Linen'
  },
  {
    id: 'style-chino-trousers',
    name: 'Chino Trousers',
    startingPrice: 969,
    category: 'trousers',
    image: MEN_ASSETS.popularStyles.chinoTrousers,
    desc: 'Clean flat-front custom chinos stitched with breathable stretch cotton for effortless everyday comfort.',
    leadTime: '3 - 5 Days',
    stitches: 'Heavy Duty Triple-Stitched Inseam',
    recommendedFabric: 'Stretch Twill Cotton or Corduroy'
  },
  {
    id: 'style-business-suit',
    name: 'Business Suit',
    startingPrice: 4999,
    category: 'suits-blazers',
    image: MEN_ASSETS.popularStyles.businessSuit,
    desc: 'Two-piece Italian cut bespoke business suit tailored with premium wool canvas and custom silk lining.',
    leadTime: '7 - 9 Days',
    stitches: 'Hand-Canvassed Lapels & Pick Stitching',
    recommendedFabric: 'Raymond Super 120s or Italian Merino Wool'
  },
  {
    id: 'style-wedding-sherwani',
    name: 'Wedding Sherwani',
    startingPrice: 8999,
    category: 'sherwanis',
    image: MEN_ASSETS.popularStyles.weddingSherwani,
    desc: 'Royal bridal sherwani adorned with handcrafted zardozi threadwork, mandarin collar, and matching churidar.',
    leadTime: '10 - 14 Days',
    stitches: 'Zardozi Hand Embroidery & Double Silk Lining',
    recommendedFabric: 'Banarasi Brocade or Pure Raw Silk'
  },
  {
    id: 'style-kurta-set',
    name: 'Kurta Set',
    startingPrice: 2499,
    category: 'kurtas-ethnic',
    image: MEN_ASSETS.popularStyles.kurtaSet,
    desc: 'Festive pure silk blend kurta with intricate placket embroidery and relaxed pyjama pants.',
    leadTime: '4 - 6 Days',
    stitches: 'Precision Embroidery & Soft Neck Binding',
    recommendedFabric: 'Silk Jacquard or Organic Chanderi'
  },
  {
    id: 'style-nehru-jacket',
    name: 'Nehru Jacket',
    startingPrice: 3499,
    category: 'jackets-coats',
    image: MEN_ASSETS.popularStyles.nehruJacket,
    desc: 'Structured sleeveless bandhgala waistcoat cut from premium jacquard fabric for wedding and festive layering.',
    leadTime: '5 - 7 Days',
    stitches: 'Structured Fused Canvas & Welt Pockets',
    recommendedFabric: 'Self-Embossed Jacquard or Tweed Wool'
  },
  {
    id: 'style-indo-western',
    name: 'Indo-Western',
    startingPrice: 4599,
    category: 'indo-western',
    image: MEN_ASSETS.popularStyles.indoWestern,
    desc: 'Asymmetric contemporary fusion bandhgala with metallic buttons and modern draped silhouette.',
    leadTime: '7 - 10 Days',
    stitches: 'Contemporary Slanted Cut & Metallic Hardware',
    recommendedFabric: 'Terry Wool or Silk Blend Brocade'
  },
  {
    id: 'style-tuxedo',
    name: 'Tuxedo',
    startingPrice: 6999,
    category: 'party-wear',
    image: MEN_ASSETS.popularStyles.tuxedo,
    desc: 'Black-tie luxury tuxedo featuring satin peak lapels, covered buttons, and bespoke satin-stripe trousers.',
    leadTime: '8 - 12 Days',
    stitches: 'Full Floating Canvas & Satin Silk Facing',
    recommendedFabric: 'Midnight Navy Raymond Wool & Satin'
  }
];

// Superior Fabrics for Men (10 Swatches)
export const MEN_FABRICS = [
  {
    id: 'fab-cotton',
    name: 'Cotton',
    pricePerMeter: 699,
    type: '100% Giza Cotton',
    image: MEN_ASSETS.fabrics.cotton,
    desc: 'Extra-long staple Egyptian cotton, ultra-breathable, silky smooth, and ideal for crisp all-season shirts and daily wear.',
    features: ['100% Breathable', 'Pre-Shrunk', 'Anti-Pilling', 'Skin Friendly'],
    colors: ['White', 'Sky Blue', 'Soft Pink', 'Charcoal', 'Navy'],
    bestFor: 'Formal Shirts, Kurta Pajamas'
  },
  {
    id: 'fab-linen',
    name: 'Linen',
    pricePerMeter: 1299,
    type: 'Pure European Flax',
    image: MEN_ASSETS.fabrics.linen,
    desc: 'Natural European flax linen with a rich airy weave. Cool, durable, and perfect for resort, destination weddings, and summer shirts.',
    features: ['Natural Flax', 'Cooling Thermal Flow', 'Textured Slub Weave', 'Biodegradable'],
    colors: ['Oatmeal', 'Beige', 'Olive Green', 'Classic White', 'Indigo'],
    bestFor: 'Summer Shirts, Casual Trousers, Nehru Jackets'
  },
  {
    id: 'fab-raymond',
    name: 'Raymond',
    pricePerMeter: 1499,
    type: 'Raymond Super 120s Suiting',
    image: MEN_ASSETS.fabrics.raymond,
    desc: 'Iconic Raymond Super 120s suiting blend offering exceptional drape, crease recovery, and executive boardroom polish.',
    features: ['High Crease Recovery', 'Natural Stretch', 'Matte Executive Luster', 'Durable Weave'],
    colors: ['Charcoal Grey', 'Navy Blue', 'Jet Black', 'Chocolate Brown'],
    bestFor: 'Two-Piece Suits, Formal Trousers, Executive Blazers'
  },
  {
    id: 'fab-wool-blend',
    name: 'Wool Blend',
    pricePerMeter: 1899,
    type: 'Merino Wool Blend',
    image: MEN_ASSETS.fabrics.woolBlend,
    desc: 'Fine Australian Merino wool blend with natural elasticity. Holds razor-sharp creases for bespoke jackets and trousers.',
    features: ['Thermal Regulating', 'Structured Fall', 'Wrinkle Resistant', 'Lightweight'],
    colors: ['Deep Navy', 'Steel Grey', 'Burgundy', 'Forest Green'],
    bestFor: 'Blazers, Tuxedos, Winter Trousers'
  },
  {
    id: 'fab-silk',
    name: 'Silk',
    pricePerMeter: 1799,
    type: 'Raw Matka Silk',
    image: MEN_ASSETS.fabrics.silk,
    desc: 'Richly textured organic raw silk with a regal sheen. Splendid for festive kurtas, royal sherwanis, and festival jackets.',
    features: ['Natural Luster', 'Rich Tactile Feel', 'Hypoallergenic', 'Festive Weight'],
    colors: ['Royal Gold', 'Ruby Maroon', 'Emerald Green', 'Pearl Ivory'],
    bestFor: 'Kurtas, Wedding Sherwanis, Dhotis'
  },
  {
    id: 'fab-tweed',
    name: 'Tweed',
    pricePerMeter: 2199,
    type: 'Herringbone Tweed',
    image: MEN_ASSETS.fabrics.tweed,
    desc: 'Heavyweight heritage herringbone weave. Warm, rugged, and handsome for winter blazers, trench coats, and waistcoats.',
    features: ['Heavyweight Insulation', 'Vintage Herringbone', 'Water-Repellent Fiber', 'Timeless Durability'],
    colors: ['Peat Brown', 'Charcoal Heather', 'Forest Olive'],
    bestFor: 'Winter Overcoats, Sports Jackets, Hunting Blazers'
  },
  {
    id: 'fab-denim',
    name: 'Denim',
    pricePerMeter: 899,
    type: 'Raw Selvedge Denim',
    image: MEN_ASSETS.fabrics.denim,
    desc: '13.5 oz indigo dyed raw selvedge cotton denim for tailored trucker jackets, custom fitted jeans, and casual overshirts.',
    features: ['Pure Indigo Dye', '13.5 oz Weight', 'Redline Selvedge Edge', 'Fades Uniquely'],
    colors: ['Raw Indigo', 'Washed Blue', 'Pitch Black'],
    bestFor: 'Tailored Jeans, Denim Overshirts, Casual Jackets'
  },
  {
    id: 'fab-corduroy',
    name: 'Corduroy',
    pricePerMeter: 1099,
    type: 'Wale Cotton Corduroy',
    image: MEN_ASSETS.fabrics.corduroy,
    desc: 'Plush ribbed cotton velvet corduroy in rich earth tones. Velvety warmth for casual fall jackets, trousers, and overshirts.',
    features: ['Soft Ribbed Texture', 'Warm Velvety Pile', 'Durable Cotton Base', 'Retro Style'],
    colors: ['Cognac Tan', 'Deep Forest', 'Navy', 'Mustard Gold'],
    bestFor: 'Chinos, Casual Blazers, Safari Jackets'
  },
  {
    id: 'fab-banarasi',
    name: 'Banarasi',
    pricePerMeter: 2499,
    type: 'Kadhwa Zari Brocade',
    image: MEN_ASSETS.fabrics.banarasi,
    desc: 'Exquisite Varanasi handloom brocade interwoven with real silver and gold zari threads for royal grooms and grand receptions.',
    features: ['Handcrafted Zari', 'Pure Silk Base', 'Imperial Motifs', 'Heritage Weave'],
    colors: ['Imperial Gold', 'Crimson Red', 'Royal Blue', 'Ivory Silver'],
    bestFor: 'Groom Sherwanis, Royal Nehru Jackets'
  },
  {
    id: 'fab-jacquard',
    name: 'Jacquard',
    pricePerMeter: 1599,
    type: 'Self-Embossed Jacquard',
    image: MEN_ASSETS.fabrics.jacquard,
    desc: 'Intricate woven self-pattern brocade that catches light subtly. Ideal for festival Nehru jackets, evening waistcoats, and sherwanis.',
    features: ['Self-Pattern Relief', 'Subtle Shimmer', 'Firm Structure', 'Non-Fading'],
    colors: ['Midnight Blue', 'Wine Purple', 'Champagne', 'Silver Grey'],
    bestFor: 'Nehru Jackets, Bandhgalas, Party Blazers'
  }
];

// 6 Process Steps
export const MEN_HOW_IT_WORKS_STEPS = [
  {
    num: '1',
    title: 'Choose Outfit',
    desc: 'Select a style or share your idea.'
  },
  {
    num: '2',
    title: 'Select Fabric',
    desc: 'Choose from our fabrics or use your own.'
  },
  {
    num: '3',
    title: 'Measurements',
    desc: 'AI / Manual / Home measurement.'
  },
  {
    num: '4',
    title: 'Review Design & Price',
    desc: 'Approve the design and quotation.'
  },
  {
    num: '5',
    title: 'Expert Stitching',
    desc: 'By verified tailors or designers.'
  },
  {
    num: '6',
    title: 'Final Fitting & Delivery',
    desc: 'On-time delivery at your doorstep.'
  }
];

// 6 Inspiration Slides for "Look Your Best, Always" (Auto-sliding 10s showcase)
export const MEN_INSPIRATION_SLIDES = [
  {
    id: 'insp-everyday',
    title: 'Everyday Essentials',
    badge: 'ESSENTIALS',
    desc: 'Smart & Comfortable',
    detail: 'Lightweight linen shirts and tailored stretch chinos designed for relaxed everyday style and effortless weekend refinement.',
    mainImage: MEN_ASSETS.inspiration.everyday.main,
    sideImage: MEN_ASSETS.inspiration.everyday.side,
    startingPrice: 899,
    category: 'shirts'
  },
  {
    id: 'insp-business',
    title: 'Business Elegance',
    badge: 'EXECUTIVE',
    desc: 'Professional & Polished',
    detail: 'Sharp executive two-piece suits and structured formal blazers tailored with premium Italian wool canvas for boardroom authority.',
    mainImage: MEN_ASSETS.inspiration.business.main,
    sideImage: MEN_ASSETS.inspiration.business.side,
    startingPrice: 4999,
    category: 'suits-blazers'
  },
  {
    id: 'insp-wedding',
    title: 'Wedding Royalty',
    badge: 'WEDDING',
    desc: 'Traditional & Timeless',
    detail: 'Imperial bridal sherwanis and achkans embellished with opulent zardozi needlework, mandarin collars, and pure silk churidars.',
    mainImage: MEN_ASSETS.inspiration.wedding.main,
    sideImage: MEN_ASSETS.inspiration.wedding.side,
    startingPrice: 8999,
    category: 'sherwanis'
  },
  {
    id: 'insp-festive',
    title: 'Festive Charm',
    badge: 'FESTIVE',
    desc: 'Modern Traditions',
    detail: 'Vibrant silk blend kurtas paired with self-embossed jacquard Nehru jackets to bring celebratory grace to poojas and family festivities.',
    mainImage: MEN_ASSETS.inspiration.festive.main,
    sideImage: MEN_ASSETS.inspiration.festive.side,
    startingPrice: 2499,
    category: 'kurtas-ethnic'
  },
  {
    id: 'insp-indowestern',
    title: 'Indo-Western Fusion',
    badge: 'COUTURE',
    desc: 'Contemporary Style',
    detail: 'Asymmetric silhouette jackets with crossover metallic clasps and draped inner silhouettes that reinvent classic traditional wear.',
    mainImage: MEN_ASSETS.inspiration.indoWestern.main,
    sideImage: MEN_ASSETS.inspiration.indoWestern.side,
    startingPrice: 4599,
    category: 'indo-western'
  },
  {
    id: 'insp-party',
    title: 'Party Perfection',
    badge: 'BLACK-TIE',
    desc: 'Bold & Stylish',
    detail: 'Gilded peak-lapel tuxedos and midnight velvet dinner jackets crafted to make an unforgettable entrance at cocktails and galas.',
    mainImage: MEN_ASSETS.inspiration.party.main,
    sideImage: MEN_ASSETS.inspiration.party.side,
    startingPrice: 6999,
    category: 'party-wear'
  }
];

// Customer Reviews (Trusted by Thousands)
export const MEN_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Rahul S.',
    location: 'Bengaluru',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    text: 'Perfect fitting and excellent fabric quality. Very professional service.',
    orderType: 'Executive Two-Piece Suit',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Vikram K.',
    location: 'Hyderabad',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    text: 'The home measurement service was very convenient. Delivered on time.',
    orderType: 'Wedding Sherwani & Churidar',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Arjun M.',
    location: 'Chennai',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
    text: 'Great designs and perfect stitching. Highly recommended!',
    orderType: 'Indo-Western Bandhgala',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Karthik N.',
    location: 'Bengaluru',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    text: 'The master tailor called to confirm sleeve and chest preferences. Flawless stitch quality!',
    orderType: 'Custom Linen Shirts & Chinos',
    verified: true
  }
];

// Verified Tailors near customer (with Google Maps integration data)
export const MEN_VERIFIED_TAILORS = [
  {
    id: 'tailor-1',
    name: 'Master Rajesh Bespoke Studio',
    owner: 'Rajesh Kumar (Master Tailor)',
    experience: '22 Years of Craftsmanship',
    rating: 4.9,
    reviewsCount: 218,
    distanceKm: 1.2,
    locality: 'Gottigere, Bannerghatta Road, Bengaluru',
    lat: 12.8596,
    lng: 77.5888,
    badge: 'Master Craftsman',
    verified: true,
    specialties: ['Suits & Blazers', 'Formal Shirts', 'Trousers'],
    startingPrice: 899,
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&q=80',
    deliveryDays: '4 - 6 Days',
    phone: '+91 98450 12891',
    portfolioImages: [
      MEN_ASSETS.popularStyles.businessSuit,
      MEN_ASSETS.popularStyles.formalShirt,
      MEN_ASSETS.popularStyles.chinoTrousers
    ]
  },
  {
    id: 'tailor-2',
    name: 'Sovereign Men’s Atelier',
    owner: 'Syed Farhan (Senior Tailor)',
    experience: '16 Years of Tailoring',
    rating: 4.8,
    reviewsCount: 164,
    distanceKm: 2.5,
    locality: 'Koramangala 4th Block, Bengaluru',
    lat: 12.9352,
    lng: 77.6245,
    badge: 'Wedding Specialist',
    verified: true,
    specialties: ['Sherwanis', 'Kurtas & Ethnic', 'Indo-Western'],
    startingPrice: 2499,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    deliveryDays: '7 - 10 Days',
    phone: '+91 98452 44321',
    portfolioImages: [
      MEN_ASSETS.popularStyles.weddingSherwani,
      MEN_ASSETS.popularStyles.kurtaSet,
      MEN_ASSETS.popularStyles.indoWestern
    ]
  },
  {
    id: 'tailor-3',
    name: 'The Royal Stitch Co.',
    owner: 'Anand Vardhan',
    experience: '19 Years in Menswear',
    rating: 4.9,
    reviewsCount: 189,
    distanceKm: 3.8,
    locality: '100ft Road, Indiranagar, Bengaluru',
    lat: 12.9716,
    lng: 77.6412,
    badge: 'Tuxedo & Black-Tie',
    verified: true,
    specialties: ['Tuxedos', 'Party Wear', 'Nehru Jackets'],
    startingPrice: 3499,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80',
    deliveryDays: '5 - 7 Days',
    phone: '+91 98455 88990',
    portfolioImages: [
      MEN_ASSETS.popularStyles.tuxedo,
      MEN_ASSETS.popularStyles.nehruJacket,
      MEN_ASSETS.popularStyles.businessSuit
    ]
  },
  {
    id: 'tailor-4',
    name: 'Elite Uniform & Fitters',
    owner: 'Manohar Shenoy',
    experience: '14 Years in Corporate Wear',
    rating: 4.7,
    reviewsCount: 132,
    distanceKm: 4.1,
    locality: 'Jayanagar 4th Block, Bengaluru',
    lat: 12.9250,
    lng: 77.5938,
    badge: 'Corporate Specialist',
    verified: true,
    specialties: ['Uniforms', 'Shirts', 'Trousers'],
    startingPrice: 799,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80',
    deliveryDays: '3 - 5 Days',
    phone: '+91 98457 11223',
    portfolioImages: [
      MEN_ASSETS.categories.uniforms,
      MEN_ASSETS.popularStyles.formalShirt,
      MEN_ASSETS.popularStyles.chinoTrousers
    ]
  }
];

// Verified Fashion Designers (with Google Maps integration & portfolio)
export const MEN_FASHION_DESIGNERS = [
  {
    id: 'designer-1',
    name: 'Karan Mehra Couture',
    designer: 'Karan Mehra (NIFT Gold Medalist)',
    experience: '12 Years Fashion Experience',
    rating: 4.95,
    reviewsCount: 142,
    distanceKm: 1.8,
    locality: 'HSR Layout Sector 1, Bengaluru',
    lat: 12.9121,
    lng: 77.6446,
    badge: 'Celebrity Menswear Stylist',
    verified: true,
    consultationFee: 1499,
    specialties: ['Modern Indo-Western', 'Royal Wedding Wear', 'Custom Tuxedos'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    portfolio: [
      { title: 'Asymmetric Wedding Achkan', image: MEN_ASSETS.popularStyles.weddingSherwani },
      { title: 'Black-Tie Midnight Tuxedo', image: MEN_ASSETS.popularStyles.tuxedo },
      { title: 'Draped Fusion Kurta', image: MEN_ASSETS.popularStyles.indoWestern }
    ]
  },
  {
    id: 'designer-2',
    name: 'Aditya Sen Bespoke Lab',
    designer: 'Aditya Sen (Milan Fashion Institute)',
    experience: '15 Years Luxury Suiting',
    rating: 4.9,
    reviewsCount: 118,
    distanceKm: 3.2,
    locality: 'Lavelle Road, Bengaluru',
    lat: 12.9719,
    lng: 77.5996,
    badge: 'Luxury Suiting Expert',
    verified: true,
    consultationFee: 1999,
    specialties: ['Bespoke Italian Suits', 'Executive Overcoats', 'Fine Shirting'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    portfolio: [
      { title: 'Super 150s Merino Wool Suit', image: MEN_ASSETS.popularStyles.businessSuit },
      { title: 'Double Breasted Cashmere Blazer', image: MEN_ASSETS.popularStyles.nehruJacket },
      { title: 'Custom Monogrammed Cotton Shirt', image: MEN_ASSETS.popularStyles.formalShirt }
    ]
  }
];

// Helper to save confirmed men's stitching order to dashboard
export const saveMenStitchingOrder = (orderData) => {
  const existingOrders = JSON.parse(localStorage.getItem('stichbee_orders') || '[]');
  const newOrder = {
    id: 'ORD-MEN-' + Math.floor(100000 + Math.random() * 900000),
    type: 'men-stitching',
    category: 'mens',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }),
    trackingStages: [
      { name: 'Order Confirmed', completed: true, timestamp: 'Today' },
      { name: 'Fabric Inspection & Cut', completed: false, timestamp: 'Pending' },
      { name: 'Expert Stitching by Partner', completed: false, timestamp: 'Pending' },
      { name: 'Quality & Fitting Check', completed: false, timestamp: 'Pending' },
      { name: 'Dispatched to Doorstep', completed: false, timestamp: 'Pending' }
    ],
    ...orderData
  };

  const updatedOrders = [newOrder, ...existingOrders];
  localStorage.setItem('stichbee_orders', JSON.stringify(updatedOrders));
  return newOrder;
};
