// StitchBee Uniforms Catalog & Store
// Supports School, College, Corporate, Hospital, Hotel, Industrial, Security, Sports, Accessories

export const UNIFORM_CATEGORIES = [
  {
    id: 'school',
    name: 'School Uniforms',
    sub: 'Shirts, Skirts, Trousers',
    image: '/uniform_assets/School%20Uniforms.png',
    count: 12
  },
  {
    id: 'college',
    name: 'College Uniforms',
    sub: 'Formal & Smart',
    image: '/uniform_assets/Collage%20Uniforms.png',
    count: 8
  },
  {
    id: 'corporate',
    name: 'Corporate Uniforms',
    sub: 'Formal Shirts, Blazers',
    image: '/uniform_assets/Corporate%20Uniforms.png',
    count: 10
  },
  {
    id: 'hospital',
    name: 'Hospital & Medical',
    sub: 'Scrubs, Coats, Nursing',
    image: '/uniform_assets/Hospital%20&%20Medical.png',
    count: 7
  },
  {
    id: 'hotel',
    name: 'Hotel & Hospitality',
    sub: 'Chef, Housekeeping',
    image: '/uniform_assets/Hotel%20&%20Hospitality.png',
    count: 9
  },
  {
    id: 'industrial',
    name: 'Industrial Uniforms',
    sub: 'Workwear & Safety',
    image: '/uniform_assets/Industrial%20Uniforms.png',
    count: 6
  },
  {
    id: 'security',
    name: 'Security Uniforms',
    sub: 'Professional & Tough',
    image: '/uniform_assets/Security%20Uniforms.png',
    count: 5
  },
  {
    id: 'sports',
    name: 'Sports Uniforms',
    sub: 'Jerseys & Tracksuits',
    image: '/uniform_assets/Sports%20Uniforms.png',
    count: 8
  },
  {
    id: 'accessories',
    name: 'Accessories',
    sub: 'Belts, Ties, Caps',
    image: '/uniform_assets/Accessories.png',
    count: 14
  },
  {
    id: 'custom',
    name: 'Custom Orders',
    sub: 'Your Design, Our Craft',
    image: '/uniform_assets/Custom%20Orders.png',
    count: 24,
    isAction: true
  }
];

export const UNIFORM_PRODUCTS = [
  {
    id: 'u-1',
    name: 'School Boy Shirt',
    categoryId: 'school',
    categoryName: 'School Uniforms',
    price: 499,
    mrp: 799,
    rating: 4.8,
    reviews: 320,
    gender: 'Boys',
    fabric: 'Cotton',
    brand: 'StitchBeez Classic',
    image: '/uniform_assets/School%20Boy%20Shirt.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Sky Blue', hex: '#38BDF8' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['bestsellers', 'school'],
    desc: 'Crisp cotton blend school shirt with reinforced collars, breathable weave, and anti-shrink fabric. Designed for active daily classroom wear.'
  },
  {
    id: 'u-2',
    name: 'School Girl Skirt',
    categoryId: 'school',
    categoryName: 'School Uniforms',
    price: 699,
    mrp: 999,
    rating: 4.7,
    reviews: 210,
    gender: 'Girls',
    fabric: 'Cotton Blend',
    brand: 'StitchBeez Classic',
    image: '/uniform_assets/School%20Girl%20Skirt.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy Blue', hex: '#002B7F' },
      { name: 'Steel Grey', hex: '#4B5563' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['bestsellers', 'school'],
    desc: 'Knife-pleated durable school skirt with comfortable adjustable inner elastic waistband and side zip closure.'
  },
  {
    id: 'u-3',
    name: 'Corporate Blazer',
    categoryId: 'corporate',
    categoryName: 'Corporate Uniforms',
    price: 2499,
    mrp: 3999,
    rating: 4.8,
    reviews: 185,
    gender: 'Unisex',
    fabric: 'Twill',
    brand: 'StitchBeez Pro',
    image: '/uniform_assets/Corporate%20Blazer.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Royal Navy', hex: '#002B7F' },
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Classic Black', hex: '#000000' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['bestsellers', 'corporate'],
    desc: 'Tailored executive corporate blazer featuring wrinkle-resistant poly-viscose blend, silky inside lining, and structured shoulders.'
  },
  {
    id: 'u-4',
    name: 'Medical Scrub Set',
    categoryId: 'hospital',
    categoryName: 'Hospital & Medical',
    price: 1299,
    mrp: 1899,
    rating: 4.8,
    reviews: 142,
    gender: 'Unisex',
    fabric: 'Cotton Blend',
    brand: 'Institutional Grade',
    image: '/uniform_assets/Medical%20Scrub%20Set.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Teal Green', hex: '#0D9488' },
      { name: 'Sky Blue', hex: '#38BDF8' },
      { name: 'Navy Blue', hex: '#002B7F' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['medical', 'new'],
    desc: 'Antimicrobial and fluid-resistant two-piece scrub set with 4 multi-functional pockets and 4-way comfort stretch fabric.'
  },
  {
    id: 'u-5',
    name: 'Chef Jacket',
    categoryId: 'hotel',
    categoryName: 'Hotel & Hospitality',
    price: 999,
    mrp: 1499,
    rating: 4.7,
    reviews: 98,
    gender: 'Unisex',
    fabric: 'Cotton',
    brand: 'StitchBeez Pro',
    image: '/uniform_assets/Chef%20Jacket.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Clean White', hex: '#FFFFFF' },
      { name: 'Pitch Black', hex: '#000000' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['new'],
    desc: 'Double-breasted professional culinary coat with heat-resistant buttons, underarm air vents, and thermometer sleeve pocket.'
  },
  {
    id: 'u-6',
    name: 'Industrial Workwear',
    categoryId: 'industrial',
    categoryName: 'Industrial Uniforms',
    price: 1499,
    mrp: 2199,
    rating: 4.6,
    reviews: 190,
    gender: 'Men',
    fabric: 'Drill',
    brand: 'Institutional Grade',
    image: '/uniform_assets/Industrial%20Workwear.png',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Navy Blue', hex: '#002B7F' },
      { name: 'High-Vis Orange', hex: '#EA580C' },
      { name: 'Heavy Charcoal', hex: '#374151' }
    ],
    inStock: true,
    fastDelivery: false,
    tabTags: ['industrial'],
    desc: 'Heavy-duty cotton drill boiler suit with reinforced knees, reflective high-visibility safety tape, and durable brass hardware.'
  },
  {
    id: 'u-7',
    name: 'Nurse Uniform',
    categoryId: 'hospital',
    categoryName: 'Hospital & Medical',
    price: 899,
    mrp: 1299,
    rating: 4.7,
    reviews: 118,
    gender: 'Women',
    fabric: 'Polyester',
    brand: 'StitchBeez Classic',
    image: '/uniform_assets/Nurse%20Uniform.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pearl White', hex: '#FFFFFF' },
      { name: 'Pastel Blue', hex: '#38BDF8' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['medical'],
    desc: 'Ergonomically cut nursing tunic and trouser combination with easy movement side vents and soil-release finish.'
  },
  {
    id: 'u-8',
    name: 'Security Uniform',
    categoryId: 'security',
    categoryName: 'Security Uniforms',
    price: 1299,
    mrp: 1899,
    rating: 4.6,
    reviews: 132,
    gender: 'Men',
    fabric: 'Twill',
    brand: 'Institutional Grade',
    image: '/uniform_assets/Security%20Uniform.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Standard Khaki', hex: '#D4A373' },
      { name: 'Navy Blue', hex: '#002B7F' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['bestsellers'],
    desc: 'Official security personnel uniform set with epaulets, pleated breast pockets, and durable crease-resistant weave.'
  },
  {
    id: 'u-9',
    name: 'Sports Jersey Set',
    categoryId: 'sports',
    categoryName: 'Sports Uniforms',
    price: 1099,
    mrp: 1599,
    rating: 4.7,
    reviews: 175,
    gender: 'Unisex',
    fabric: 'Mesh',
    brand: 'StitchBeez Classic',
    image: '/uniform_assets/Sports%20Jersey%20Set.png',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Athletic Red', hex: '#DC2626' },
      { name: 'Royal Blue', hex: '#002B7F' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['new'],
    desc: 'Breathable dry-fit honeycomb mesh sports jersey with moisture wicking technology and matching athletic shorts.'
  },
  {
    id: 'u-10',
    name: 'Housekeeping Uniform',
    categoryId: 'hotel',
    categoryName: 'Hotel & Hospitality',
    price: 799,
    mrp: 1199,
    rating: 4.6,
    reviews: 95,
    gender: 'Women',
    fabric: 'Cotton Blend',
    brand: 'StitchBeez Classic',
    image: '/uniform_assets/Housekeeping%20Uniform.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Earthy Brown', hex: '#78350F' },
      { name: 'Hospitality Navy', hex: '#002B7F' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['hotel'],
    desc: 'Comfort-stretch hospitality housekeeping set designed for freedom of movement with stain-resistant fabric treatment.'
  },
  {
    id: 'u-11',
    name: 'College Formal Shirt',
    categoryId: 'college',
    categoryName: 'College Uniforms',
    price: 699,
    mrp: 1099,
    rating: 4.6,
    reviews: 210,
    gender: 'Men',
    fabric: 'Cotton',
    brand: 'StitchBeez Pro',
    image: '/uniform_assets/Collage%20Formal%20Shirt.png',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Ice Blue', hex: '#38BDF8' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['college'],
    desc: 'Structured formal dress shirt tailored for degree colleges, technical institutes, and presentation ceremonies.'
  },
  {
    id: 'u-12',
    name: 'Tie & Belt Set',
    categoryId: 'accessories',
    categoryName: 'Accessories',
    price: 599,
    mrp: 899,
    rating: 4.8,
    reviews: 245,
    gender: 'Unisex',
    fabric: 'Polyester',
    brand: 'StitchBeez Classic',
    image: '/uniform_assets/Tie%20&%20Belt%20Set.png',
    sizes: ['Standard'],
    colors: [
      { name: 'Striped Navy', hex: '#002B7F' },
      { name: 'Black', hex: '#000000' }
    ],
    inStock: true,
    fastDelivery: true,
    tabTags: ['accessories'],
    desc: 'Matching jacquard woven school/college tie with adjustable buckle belt made from heavy-duty bonded webbing.'
  }
];

export const COLOR_FILTER_OPTIONS = [
  { name: 'Navy Blue', hex: '#002B7F' },
  { name: 'Crisp White', hex: '#FFFFFF' },
  { name: 'Sky Blue', hex: '#38BDF8' },
  { name: 'Charcoal Grey', hex: '#374151' },
  { name: 'Khaki', hex: '#D4A373' },
  { name: 'Pitch Black', hex: '#000000' },
  { name: 'Teal Green', hex: '#0D9488' },
  { name: 'Maroon', hex: '#7F1D1D' }
];
