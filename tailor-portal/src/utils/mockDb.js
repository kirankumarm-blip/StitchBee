// StichBee Mock Database & State Management

export const INITIAL_TAILORS = [
  {
    id: 't1',
    name: 'Vogue Craft Tailors',
    owner: 'Master Rajesh Kumar',
    rating: 4.9,
    reviews: 142,
    distance: 0.8,
    specialty: 'Premium Suits, Blazers & Alterations',
    categories: ['mens', 'alterations', 'uniforms'],
    address: 'Sector 4, HSR Layout, Bengaluru',
    coordinates: { x: 30, y: 40 },
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&q=80',
    status: 'approved',
    credits: 150,
    documents: { aadhaar: '1234-5678-9012', pan: 'ABCDE1234F', license: 'LIC-HSR-8849', gst: '29ABCDE1234F1Z5' },
    inventory: { threads: 350, fabrics: 45, materials: 120 },
    services: [
      { id: 'ts1', name: 'Premium 2-Piece Suit', price: 4500, days: 7 },
      { id: 'ts2', name: 'Custom Blazer', price: 2800, days: 5 },
      { id: 'ts3', name: 'Formal Trousers Stitching', price: 800, days: 3 },
      { id: 'ts4', name: 'Shirt Alteration & Fitting', price: 250, days: 1 }
    ],
    reviewsList: [
      { name: 'Rohan Sharma', rating: 5, comment: 'Rajesh is a master craftsman. The suit fits like a glove!', date: '2026-05-28' },
      { name: 'Amit Patel', rating: 4, comment: 'Great blazer stitching. Took slightly longer than promised but worth it.', date: '2026-05-15' }
    ],
    portfolio: [
      { title: 'Classic Charcoal 3-Piece', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80' },
      { title: 'Tuxedo Blazer Custom Cut', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: 't2',
    name: 'Ananya Bridal & Boutique',
    owner: 'Ananya Sharma',
    rating: 4.8,
    reviews: 98,
    distance: 1.5,
    specialty: 'Lehengas, Sarees, Bridal Wear & Kutch Borders',
    categories: ['womens', 'bridal'],
    address: '12th Main, Indiranagar, Bengaluru',
    coordinates: { x: 75, y: 25 },
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
    status: 'approved',
    credits: 200,
    documents: { aadhaar: '9876-5432-1098', pan: 'XYZWR9876A', license: 'LIC-IND-4421', gst: '29XYZWR9876A1Z3' },
    inventory: { threads: 280, fabrics: 60, materials: 95 },
    services: [
      { id: 'as1', name: 'Bridal Lehenga Stitching', price: 7500, days: 12 },
      { id: 'as2', name: 'Designer Saree Blouse', price: 1200, days: 3 },
      { id: 'as3', name: 'Kutchi Border Design', price: 1500, days: 4 },
      { id: 'as4', name: 'Anarkali Salwar Kameez', price: 2500, days: 6 }
    ],
    reviewsList: [
      { name: 'Priya Sen', rating: 5, comment: 'Stunning embroidery and lining work! Exceeded my expectations for my wedding blouse.', date: '2026-06-02' },
      { name: 'Megha Rao', rating: 4, comment: 'Wonderful bridal lehenga design. Very detailed handwork.', date: '2026-05-20' }
    ],
    portfolio: [
      { title: 'Zardozi Bridal Lehenga', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80' },
      { title: 'Embroidered Silk Blouse', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: 't3',
    name: 'Urban Stitch & Kids Studio',
    owner: 'David D\'Souza',
    rating: 4.6,
    reviews: 74,
    distance: 2.3,
    specialty: 'Casual wear, Kids wear & Children Dress Specialties',
    categories: ['kids', 'alterations'],
    address: 'Koramangala 5th Block, Bengaluru',
    coordinates: { x: 45, y: 80 },
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80',
    status: 'approved',
    credits: 100,
    documents: { aadhaar: '5544-3322-1100', pan: 'JKLMN5544P', license: 'LIC-KOR-9921', gst: '29JKLMN5544P1Z4' },
    inventory: { threads: 150, fabrics: 10, materials: 40 },
    services: [
      { id: 'us1', name: 'Children Frock Stitching', price: 900, days: 4 },
      { id: 'us2', name: 'Kids Formal Suit', price: 2200, days: 6 },
      { id: 'us3', name: 'Slim Fit Cotton Shirt', price: 650, days: 3 },
      { id: 'us4', name: 'Uniform Alteration', price: 200, days: 1 }
    ],
    reviewsList: [
      { name: 'Kavitha M.', rating: 5, comment: 'David stitched a beautiful birthday dress for my 5-year-old daughter. Perfect fit!', date: '2026-06-05' }
    ],
    portfolio: [
      { title: 'Velvet Birthday Frock', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: 't4',
    name: 'Auto Leather Craft',
    owner: 'Guru Prasad',
    rating: 4.7,
    reviews: 86,
    distance: 1.2,
    specialty: 'Vehicle Seat Covers & Premium Leather Bags',
    categories: ['seats', 'bags'],
    address: 'HSR Ring Road, Sector 6, Bengaluru',
    coordinates: { x: 20, y: 65 },
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80',
    status: 'approved',
    credits: 150,
    documents: { aadhaar: '4455-6677-8899', pan: 'GPIND4455P', license: 'LIC-VEH-1049', gst: '29GPIND4455P1ZA' },
    inventory: { threads: 400, fabrics: 80, materials: 180 },
    services: [
      { id: 'vs1', name: 'Quilted Car Seat Covers (Full Set)', price: 12000, days: 5 },
      { id: 'vs2', name: 'Leather Bike Seat Cover', price: 1500, days: 2 },
      { id: 'vs3', name: 'Heavy Duty Leather Tote Bag', price: 3200, days: 4 }
    ],
    reviewsList: [
      { name: 'Rahul V.', rating: 5, comment: 'Incredible stitching quality for my SUV seat covers. Highly professional crew.', date: '2026-06-03' },
      { name: 'Nikhil K.', rating: 4, comment: 'Good quality leather bike cover. Fits perfectly.', date: '2026-05-27' }
    ],
    portfolio: [
      { title: 'Premium SUV Leather Seats', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80' },
      { title: 'Tough Leather Utility Tote', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: 't5',
    name: 'Bespoke Footwear & Slippers',
    owner: 'Imran Khan',
    rating: 4.8,
    reviews: 63,
    distance: 2.1,
    specialty: 'Handcrafted Leather Shoes, Slippers & Bags',
    categories: ['shoes', 'bags'],
    address: 'Commercial Street, Tasker Town, Bengaluru',
    coordinates: { x: 85, y: 70 },
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
    status: 'approved',
    credits: 100,
    documents: { aadhaar: '3322-1100-9988', pan: 'IKIND3322M', license: 'LIC-SHO-3342', gst: '29IKIND3322M1ZC' },
    inventory: { threads: 200, fabrics: 15, materials: 220 },
    services: [
      { id: 'fs1', name: 'Handmade Oxfords Stitching', price: 6500, days: 10 },
      { id: 'fs2', name: 'Premium Leather Slippers', price: 2500, days: 5 },
      { id: 'fs3', name: 'Designer Leather Laptop Bag', price: 4800, days: 7 }
    ],
    reviewsList: [
      { name: 'Vikram S.', rating: 5, comment: 'The custom Oxford shoes are incredibly comfortable. Imran is a genius.', date: '2026-06-01' }
    ],
    portfolio: [
      { title: 'Hand-sewn Tan Oxford Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80' }
    ]
  }
];

export const INITIAL_FABRICS = [
  { id: 'f1', name: 'Premium Egyptian Cotton', type: 'Cotton', price: 350, image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=300&q=80', stock: 120, desc: 'Breathable, ultra-soft, ideal for summer shirts.' },
  { id: 'f2', name: 'Pure Linen Weave', type: 'Linen', price: 480, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80', stock: 85, desc: 'Cool textured fabric, perfect for trousers and summer jackets.' },
  { id: 'f3', name: 'Banarasi Raw Silk', type: 'Silk', price: 950, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80', stock: 60, desc: 'Rich golden sheen, perfect for festive blouses and sherwanis.' },
  { id: 'f4', name: 'Organic Indigo Denim', type: 'Denim', price: 400, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80', stock: 150, desc: 'Heavy-duty 12oz denim, perfect for custom jackets.' },
  { id: 'f5', name: 'Handspun Khadi Cotton', type: 'Khadi', price: 250, image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=300&q=80', stock: 200, desc: 'Traditional handwoven texture, highly sustainable.' }
];

export const INITIAL_SAREES = [
  { id: 's1', name: 'Kanchipuram Pure Silk Saree', type: 'Silk Sarees', price: 8500, image: 'https://images.unsplash.com/photo-1610030470352-78d10b7b12d5?auto=format&fit=crop&w=300&q=80', stock: 15, desc: 'Classic gold zari borders, wedding special.' },
  { id: 's2', name: 'Chanderi Cotton-Silk Saree', type: 'Cotton Sarees', price: 3200, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80', stock: 24, desc: 'Lightweight sheer texture, comfortable office/casual wear.' },
  { id: 's3', name: 'Georgette Designer Ruffle Saree', type: 'Designer Sarees', price: 4500, image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&w=300&q=80', stock: 10, desc: 'Modern pre-draped style with sequin borders.' }
];

export const INITIAL_DESIGNERS = [
  { id: 'd1', name: 'Malini Iyer', type: 'Professional Designer', rating: 4.9, charge: 1500, specialty: 'Indo-Western Fusion', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', desc: 'NIFT Alumnus, 8+ years styling celebrities.' },
  { id: 'd2', name: 'Rahul Varma (Student)', type: 'Fashion Student', rating: 4.5, charge: 450, specialty: 'Minimalist Streetwear', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', desc: 'Pearl Academy Finalist, specializing in casual alterations.' },
  { id: 'd3', name: 'Sneha Reddy', type: 'Professional Designer', rating: 4.8, charge: 2000, specialty: 'Royal Bridal Lehengas', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', desc: 'Designer at HSR Bridal Studio, specializing in heavy embroidery.' }
];

export const INITIAL_BANNERS = [
  { id: 'b1', title: 'Monsoon Stitch Festival', subtitle: 'Flat 15% off on Bridal Lehenga Stitching', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80', category: 'Bridal Wear' },
  { id: 'b2', title: 'Student Measurement Network', subtitle: 'Book certified college students for at-home fittings', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', category: 'Alterations' }
];

export const INITIAL_ARTICLES = [
  { id: 'a1', title: '5 Festive Blouse Styles Trending This Season', category: 'Ethnic Style', author: 'Malini Iyer', reads: '1.2k', imageUrl: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&w=400&q=80', content: 'From retro sweetheart necklines to sheer glass-sleeves, this guide covers the most requested tailoring trends...' },
  { id: 'a2', title: 'Understanding Fabrics: Linen vs Cotton for Summer', category: 'Fabric Guide', author: 'David D\'Souza', reads: '890', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80', content: 'Linen offers high heat conductivity but wrinkles easily. Cotton is durable and soft. Let\'s review their stitching differences...' }
];

export const INITIAL_ORDERS = [
  {
    id: 'ord-101',
    customerName: 'Aarav Mehta',
    customerAddress: 'Apartment 204, Royal Palms, Koramangala',
    tailorId: 't1',
    tailorName: 'Vogue Craft Tailors',
    serviceName: 'Premium 2-Piece Suit',
    price: 4500,
    status: 'closed', // 12 steps: placed, tailor_assigned, pickup_scheduled, picked_up, measurement_completed, stitching_started, stitching_completed, quality_check, delivering, delivered, trial_period, closed
    date: '2026-05-24',
    timeSlot: '14:00 - 16:00',
    measurementType: 'student',
    deliveryType: 'student',
    measurements: { chest: 40, waist: 34, shoulder: 18, length: 30, collar: 15.5, sleeves: 25 },
    studentId: 'stud-active',
    paymentStatus: 'paid',
    notes: 'Matte black buttons requested.'
  },
  {
    id: 'ord-102',
    customerName: 'Priyanka Sen',
    customerAddress: 'Flat 5B, Green Glen Layout, Bellandur',
    tailorId: 't2',
    tailorName: 'Ananya Bridal & Boutique',
    serviceName: 'Designer Saree Blouse',
    price: 1200,
    status: 'stitching_started',
    date: '2026-06-07',
    timeSlot: '10:00 - 12:00',
    measurementType: 'student',
    deliveryType: 'student',
    measurements: { chest: 34, waist: 28, shoulder: 14.5, length: 15, collar: 0, sleeves: 10 },
    studentId: 'stud-active',
    paymentStatus: 'paid',
    notes: 'Deep back cut.'
  }
];

export const TRAINING_SLIDES = [
  {
    title: 'Welcome to StitchBee Student Program!',
    content: 'As a Student Partner, you represent StichBee. You earn money taking measurements and delivering stitched apparel to customers. Let\'s learn how to take standard measurements accurately.'
  },
  {
    title: '1. Chest/Bust Measurement',
    content: 'Wrap the tape measure under the arms around the fullest part of the chest. Ensure the tape is flat against the back, snug but not tight. Keep one finger space between tape and body.'
  },
  {
    title: '2. Waist Measurement',
    content: 'Measure around the natural waistline, which is located just above the belly button. Stand straight, breathe normally, and take the reading without pulling your stomach in.'
  },
  {
    title: '3. Shoulder Width',
    content: 'Measure across the back from the edge of one shoulder bone to the edge of the other. The tape should follow the natural curve of the shoulders.'
  },
  {
    title: '4. Sleeves & Neck (Collar)',
    content: 'Sleeve: Measure from shoulder tip down to wrist (or desired length). Neck: Wrap tape around base of neck, inserting two fingers for comfort allowance.'
  }
];

export const TRAINING_QUIZ = [
  {
    id: 1,
    question: 'How should the measuring tape be placed around the chest?',
    options: [
      'Very tight to ensure a skinny fit',
      'Loose and sagging down the back',
      'Flat against the back, snug but allowing one finger space for comfort',
      'Above the armpits around the neck'
    ],
    answer: 2
  },
  {
    id: 2,
    question: 'Where is the waist measured for standard tailoring?',
    options: [
      'Around the hips',
      'Just above the belly button (natural waistline)',
      'Around the lower rib cage',
      'Wherever the client wears their pants'
    ],
    answer: 1
  },
  {
    id: 3,
    question: 'Why do we add a two-finger allowance when measuring the neck (collar)?',
    options: [
      'So the collar isn\'t suffocating when buttoned',
      'To make the sewing process easier',
      'To allow room for wearing necklaces',
      'It is not recommended to add any allowance'
    ],
    answer: 0
  }
];

// LocalStorage helpers
export const loadFromStorage = (key, defaultValue) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    console.error('Error reading localStorage', e);
    return defaultValue;
  }
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error writing localStorage', e);
  }
};

// Seed database on launch
export const seedDatabase = () => {
  if (!localStorage.getItem('stichbee_tailors')) {
    saveToStorage('stichbee_tailors', INITIAL_TAILORS);
  }
  if (!localStorage.getItem('stichbee_orders')) {
    saveToStorage('stichbee_orders', INITIAL_ORDERS);
  }
  if (!localStorage.getItem('stichbee_fabrics')) {
    saveToStorage('stichbee_fabrics', INITIAL_FABRICS);
  }
  if (!localStorage.getItem('stichbee_sarees')) {
    saveToStorage('stichbee_sarees', INITIAL_SAREES);
  }
  if (!localStorage.getItem('stichbee_designers')) {
    saveToStorage('stichbee_designers', INITIAL_DESIGNERS);
  }
  if (!localStorage.getItem('stichbee_banners')) {
    saveToStorage('stichbee_banners', INITIAL_BANNERS);
  }
  if (!localStorage.getItem('stichbee_articles')) {
    saveToStorage('stichbee_articles', INITIAL_ARTICLES);
  }
  if (!localStorage.getItem('stichbee_ledger')) {
    saveToStorage('stichbee_ledger', {
      platformCommission: 650,
      fabricSales: 0,
      sareeSales: 0,
      designerSales: 0,
      registrationCredits: 100, // ₹50 * 2 tailors
      totalRevenue: 750 // commission + credits
    });
  }
  if (!localStorage.getItem('stichbee_student')) {
    saveToStorage('stichbee_student', {
      certified: false,
      quizPassed: false,
      wallet: { earnings: 150, completedGigs: 1 }
    });
  }
  if (!localStorage.getItem('stichbee_customers')) {
    saveToStorage('stichbee_customers', [
      { customer_id: 'cust-101', name: 'Aarav Mehta', email: 'aarav@gmail.com', phone: '9876543210', created_at: new Date().toISOString() },
      { customer_id: 'cust-102', name: 'Priyanka Sen', email: 'priyanka@gmail.com', phone: '9876543211', created_at: new Date().toISOString() }
    ]);
  }
  if (!localStorage.getItem('stichbee_body_profiles')) {
    saveToStorage('stichbee_body_profiles', []);
  }
  if (!localStorage.getItem('stichbee_measurements')) {
    saveToStorage('stichbee_measurements', []);
  }
  if (!localStorage.getItem('stichbee_measurement_history')) {
    saveToStorage('stichbee_measurement_history', []);
  }
  if (!localStorage.getItem('stichbee_sql_logs')) {
    saveToStorage('stichbee_sql_logs', []);
  }
};

// PostgreSQL Query Simulator for Frontend SQL console
export const executePgQuery = (sql, params = []) => {
  const cleanSql = sql.trim().replace(/\s+/g, ' ');
  const timestamp = new Date().toISOString();
  
  // Format query for readability by replacing $1, $2 with actual params
  let formattedSql = cleanSql;
  params.forEach((param, index) => {
    const val = typeof param === 'string' ? `'${param.replace(/'/g, "''")}'` : JSON.stringify(param);
    formattedSql = formattedSql.replace(new RegExp(`\\$${index + 1}(?=\\D|$)`, 'g'), val);
  });
  
  // Save to SQL Logs
  const logs = loadFromStorage('stichbee_sql_logs', []);
  logs.push({
    id: 'sql-' + Math.random().toString(36).substr(2, 9),
    timestamp,
    query: formattedSql
  });
  saveToStorage('stichbee_sql_logs', logs);

  const uSql = cleanSql.toUpperCase();

  if (uSql.startsWith('INSERT INTO BODY_PROFILES')) {
    const profiles = loadFromStorage('stichbee_body_profiles', []);
    const newProfile = {
      id: 'prof-' + Math.random().toString(36).substr(2, 9),
      customer_id: params[0],
      gender: params[1],
      age: params[2],
      weight: params[3],
      body_shape: params[4],
      recommended_fit: params[5],
      height: params[6],
      bmi_category: params[7] || 'Normal',
      created_at: timestamp
    };
    profiles.push(newProfile);
    saveToStorage('stichbee_body_profiles', profiles);
    return { rowCount: 1, rows: [newProfile] };
  }
  
  if (uSql.startsWith('INSERT INTO MEASUREMENTS')) {
    const measurements = loadFromStorage('stichbee_measurements', []);
    const newMeasurement = {
      id: 'meas-' + Math.random().toString(36).substr(2, 9),
      customer_id: params[0],
      category: params[1],
      measurements_json: params[2],
      confidence_score: params[3],
      created_at: timestamp
    };
    measurements.push(newMeasurement);
    saveToStorage('stichbee_measurements', measurements);
    return { rowCount: 1, rows: [newMeasurement] };
  }

  if (uSql.startsWith('INSERT INTO MEASUREMENT_HISTORY')) {
    const history = loadFromStorage('stichbee_measurement_history', []);
    const newHistory = {
      id: 'hist-' + Math.random().toString(36).substr(2, 9),
      customer_id: params[0],
      category: params[1],
      measurements_json: params[2],
      confidence_score: params[3],
      body_shape: params[4],
      created_at: timestamp
    };
    history.push(newHistory);
    saveToStorage('stichbee_measurement_history', history);
    return { rowCount: 1, rows: [newHistory] };
  }

  if (uSql.startsWith('INSERT INTO CUSTOMERS')) {
    const customers = loadFromStorage('stichbee_customers', []);
    const newCustomer = {
      customer_id: params[0],
      name: params[1],
      email: params[2],
      phone: params[3],
      created_at: timestamp
    };
    customers.push(newCustomer);
    saveToStorage('stichbee_customers', customers);
    return { rowCount: 1, rows: [newCustomer] };
  }
  
  if (uSql.startsWith('SELECT') && uSql.includes('FROM SQL_LOGS')) {
    return { rows: loadFromStorage('stichbee_sql_logs', []) };
  }

  if (uSql.startsWith('SELECT') && uSql.includes('FROM BODY_PROFILES')) {
    return { rows: loadFromStorage('stichbee_body_profiles', []) };
  }

  if (uSql.startsWith('SELECT') && uSql.includes('FROM MEASUREMENTS')) {
    return { rows: loadFromStorage('stichbee_measurements', []) };
  }

  if (uSql.startsWith('SELECT') && uSql.includes('FROM MEASUREMENT_HISTORY')) {
    return { rows: loadFromStorage('stichbee_measurement_history', []) };
  }

  if (uSql.startsWith('SELECT') && uSql.includes('FROM CUSTOMERS')) {
    return { rows: loadFromStorage('stichbee_customers', []) };
  }

  return { rowCount: 0, rows: [] };
};

export const FABRIC_MARKETPLACE_DATA = {
  categories: {
    men: {
      name: 'Men',
      image: './Mens Collection.jpg',
      subcategories: {
        formal: {
          name: 'Formal Wear',
          fabricTypes: {
            wool: {
              name: 'Wool',
              brands: {
                raymond: {
                  name: 'Raymond',
                  collections: {
                    super120s: {
                      name: 'Super 120s',
                      variants: [
                        { id: 'm-f-w-r-120-blk', color: 'Black', price: 2499, width: '58 inches', gsm: 280, texture: 'Smooth', stretch: 'Medium', shine: 'Premium', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' },
                        { id: 'm-f-w-r-120-navy', color: 'Navy Blue', price: 2499, width: '58 inches', gsm: 280, texture: 'Smooth', stretch: 'Medium', shine: 'Premium', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' },
                        { id: 'm-f-w-r-120-char', color: 'Charcoal Grey', price: 2499, width: '58 inches', gsm: 280, texture: 'Smooth', stretch: 'Medium', shine: 'Premium', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80' },
                        { id: 'm-f-w-r-120-royal', color: 'Royal Blue', price: 2499, width: '58 inches', gsm: 280, texture: 'Smooth', stretch: 'Medium', shine: 'Premium', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' },
                        { id: 'm-f-w-r-120-brn', color: 'Brown', price: 2499, width: '58 inches', gsm: 280, texture: 'Smooth', stretch: 'Medium', shine: 'Premium', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80' },
                        { id: 'm-f-w-r-120-mar', color: 'Maroon', price: 2499, width: '58 inches', gsm: 280, texture: 'Smooth', stretch: 'Medium', shine: 'Premium', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80' },
                        { id: 'm-f-w-r-120-beige', color: 'Beige', price: 2499, width: '58 inches', gsm: 280, texture: 'Smooth', stretch: 'Medium', shine: 'Premium', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' }
                      ]
                    },
                    super140s: {
                      name: 'Super 140s',
                      variants: [
                        { id: 'm-f-w-r-140-navy', color: 'Navy Blue', price: 3499, width: '58 inches', gsm: 260, texture: 'Ultra Smooth', stretch: 'Medium', shine: 'High', season: 'All Season', bestFor: 'Suit, Tuxedo', availability: 'In Stock', pattern: 'Striped', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' },
                        { id: 'm-f-w-r-140-char', color: 'Charcoal Grey', price: 3499, width: '58 inches', gsm: 260, texture: 'Ultra Smooth', stretch: 'Medium', shine: 'High', season: 'All Season', bestFor: 'Suit, Tuxedo', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80' }
                      ]
                    },
                    premiumWool: {
                      name: 'Premium Wool',
                      variants: [
                        { id: 'm-f-w-r-prem-blk', color: 'Black', price: 2999, width: '58 inches', gsm: 300, texture: 'Structured', stretch: 'Low', shine: 'Subtle', season: 'Winter', bestFor: 'Suit, Overcoat', availability: 'In Stock', pattern: 'Herringbone', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' }
                      ]
                    },
                    luxuryWool: {
                      name: 'Luxury Wool',
                      variants: [
                        { id: 'm-f-w-r-lux-navy', color: 'Navy Blue', price: 4499, width: '58 inches', gsm: 270, texture: 'Cashmere Feel', stretch: 'Low', shine: 'Premium', season: 'Winter', bestFor: 'Luxury Suit', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }
                      ]
                    }
                  }
                },
                siyarams: {
                  name: "Siyaram's",
                  collections: {
                    wedding: {
                      name: 'Wedding Collection',
                      variants: [
                        { id: 'm-f-w-s-wed-royal', color: 'Royal Blue', price: 1899, width: '58 inches', gsm: 290, texture: 'Soft Glossy', stretch: 'Low', shine: 'Premium', season: 'Festive', bestFor: 'Sherwani, Bandhgala', availability: 'In Stock', pattern: 'Self-Design', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }
                      ]
                    },
                    business: {
                      name: 'Business Collection',
                      variants: [
                        { id: 'm-f-w-s-bus-blk', color: 'Black', price: 1499, width: '58 inches', gsm: 280, texture: 'Matte Smooth', stretch: 'Medium', shine: 'Subtle', season: 'All Season', bestFor: 'Office Suit', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' }
                      ]
                    },
                    party: {
                      name: 'Party Collection',
                      variants: [
                        { id: 'm-f-w-s-prty-mar', color: 'Maroon', price: 1699, width: '58 inches', gsm: 275, texture: 'Structured', stretch: 'Medium', shine: 'Glossy', season: 'Party', bestFor: 'Party Blazer', availability: 'In Stock', pattern: 'Textured', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80' }
                      ]
                    }
                  }
                },
                donear: {
                  name: 'Donear',
                  collections: {
                    office: {
                      name: 'Office Wear',
                      variants: [
                        { id: 'm-f-w-d-off-char', color: 'Charcoal Grey', price: 1299, width: '58 inches', gsm: 295, texture: 'Durable Matte', stretch: 'Medium', shine: 'None', season: 'All Season', bestFor: 'Work Trouser', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80' }
                      ]
                    },
                    blend: {
                      name: 'Premium Blend',
                      variants: [
                        { id: 'm-f-w-d-blnd-navy', color: 'Navy Blue', price: 1199, width: '58 inches', gsm: 285, texture: 'Smooth', stretch: 'High', shine: 'Subtle', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }
                      ]
                    },
                    executive: {
                      name: 'Executive Wear',
                      variants: [
                        { id: 'm-f-w-d-exec-brn', color: 'Brown', price: 1399, width: '58 inches', gsm: 290, texture: 'Structured', stretch: 'Medium', shine: 'None', season: 'All Season', bestFor: 'Suit', availability: 'In Stock', pattern: 'Checks', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80' }
                      ]
                    }
                  }
                }
              }
            },
            terryWool: { name: 'Terry Wool', brands: { raymond: { name: 'Raymond', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-f-tw-r-blk', color: 'Black', price: 1899, width: '58 inches', gsm: 290, texture: 'Semi-matte', stretch: 'Medium', shine: 'Subtle', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' }] } } } } },
            tweed: { name: 'Tweed', brands: { raymond: { name: 'Raymond', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-f-twd-r-brn', color: 'Brown', price: 2199, width: '58 inches', gsm: 340, texture: 'Coarse Structured', stretch: 'Low', shine: 'None', season: 'Winter', bestFor: 'Winter Blazer', availability: 'In Stock', pattern: 'Herringbone', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80' }] } } } } },
            cashmere: { name: 'Cashmere', brands: { raymond: { name: 'Raymond', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-f-csh-r-blk', color: 'Black', price: 7999, width: '58 inches', gsm: 250, texture: 'Ultra Soft', stretch: 'Low', shine: 'Subtle', season: 'Winter', bestFor: 'Luxury Overcoat', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' }] } } } } },
            cotton: { name: 'Cotton', brands: { arvind: { name: 'Arvind Limited', collections: { office: { name: 'Office Collection', variants: [{ id: 'm-f-ctn-a-wht', color: 'White', price: 699, width: '58 inches', gsm: 160, texture: 'Smooth Breathable', stretch: 'Low', shine: 'None', season: 'All Season', bestFor: 'Shirt', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=400&q=80' }] } } } } },
            linen: { name: 'Linen', brands: { arvind: { name: 'Arvind Limited', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-f-lin-a-beige', color: 'Beige', price: 1199, width: '58 inches', gsm: 180, texture: 'Crisp Coarse', stretch: 'None', shine: 'None', season: 'Summer', bestFor: 'Shirt, Trousers', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' }] } } } } },
            poplin: { name: 'Poplin', brands: { arvind: { name: 'Arvind Limited', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-f-pop-a-wht', color: 'White', price: 599, width: '58 inches', gsm: 140, texture: 'Light Crisp', stretch: 'Medium', shine: 'None', season: 'Summer', bestFor: 'Formal Shirt', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=400&q=80' }] } } } } },
            twill: { name: 'Twill', brands: { arvind: { name: 'Arvind Limited', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-f-twl-a-navy', color: 'Navy Blue', price: 799, width: '58 inches', gsm: 170, texture: 'Soft Twill Weave', stretch: 'Medium', shine: 'Subtle', season: 'All Season', bestFor: 'Shirt', availability: 'In Stock', pattern: 'Diagonal', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }] } } } } }
          }
        },
        casual: { name: 'Casual Wear', fabricTypes: { linen: { name: 'Linen', brands: { arvind: { name: 'Arvind Limited', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-c-lin-a-wht', color: 'White', price: 1099, width: '58 inches', gsm: 180, texture: 'Coarse Breathable', stretch: 'None', shine: 'None', season: 'Summer', bestFor: 'Shirt', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        ethnic: { name: 'Ethnic Wear', fabricTypes: { silk: { name: 'Silk', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-e-slk-n-gold', color: 'Beige', price: 2499, width: '48 inches', gsm: 210, texture: 'Glossy Silk', stretch: 'None', shine: 'Premium', season: 'Festive', bestFor: 'Kurta', availability: 'In Stock', pattern: 'Self-Design', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        wedding: { name: 'Wedding Wear', fabricTypes: { velvet: { name: 'Velvet', brands: { raymond: { name: 'Raymond', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-w-vlt-r-mar', color: 'Maroon', price: 1999, width: '54 inches', gsm: 360, texture: 'Super Soft Plush', stretch: 'Low', shine: 'High', season: 'Festive', bestFor: 'Sherwani', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        party: { name: 'Party Wear', fabricTypes: { satin: { name: 'Satin', brands: { raymond: { name: 'Raymond', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'm-p-stn-r-blk', color: 'Black', price: 1299, width: '58 inches', gsm: 150, texture: 'Ultra Glossy', stretch: 'Medium', shine: 'High', season: 'Party', bestFor: 'Party Shirt', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' }] } } } } } } }
      }
    },
    women: {
      name: 'Women',
      image: './womensCollection.jpg',
      subcategories: {
        daily: { name: 'Daily Wear', fabricTypes: { cotton: { name: 'Cotton', brands: { fabindia: { name: 'Fabindia', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'w-d-ctn-f-beige', color: 'Beige', price: 499, width: '44 inches', gsm: 120, texture: 'Soft', stretch: 'None', shine: 'None', season: 'Summer', bestFor: 'Kurtis', availability: 'In Stock', pattern: 'Printed', image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        party: {
          name: 'Party Wear',
          fabricTypes: {
            satin: { name: 'Satin', brands: { kalanjali: { name: 'Kalanjali', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'w-p-stn-k-blk', color: 'Black', price: 799, width: '44 inches', gsm: 130, texture: 'Silky Glossy', stretch: 'Medium', shine: 'High', season: 'Party', bestFor: 'Gowns, Blouses', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' }] } } } } },
            georgette: { name: 'Georgette', brands: { biba: { name: 'Biba', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'w-p-geo-b-navy', color: 'Navy Blue', price: 899, width: '44 inches', gsm: 90, texture: 'Crepey Sheer', stretch: 'High', shine: 'None', season: 'All Season', bestFor: 'Kurtis, Sarees', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }] } } } } },
            chiffon: { name: 'Chiffon', brands: { fabindia: { name: 'Fabindia', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'w-p-chf-f-royal', color: 'Royal Blue', price: 699, width: '44 inches', gsm: 70, texture: 'Light Airy', stretch: 'High', shine: 'None', season: 'Summer', bestFor: 'Sarees, Scarves', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }] } } } } },
            organza: { name: 'Organza', brands: { kalanjali: { name: 'Kalanjali', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'w-p-org-k-beige', color: 'Beige', price: 1099, width: '44 inches', gsm: 60, texture: 'Stiff Transparent', stretch: 'None', shine: 'Subtle', season: 'Festive', bestFor: 'Sarees, Lehengas', availability: 'In Stock', pattern: 'Embroidered', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' }] } } } } },
            velvet: { name: 'Velvet', brands: { kalanjali: { name: 'Kalanjali', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'w-p-vlt-k-mar', color: 'Maroon', price: 1599, width: '44 inches', gsm: 350, texture: 'Plush Velvet', stretch: 'Low', shine: 'High', season: 'Winter', bestFor: 'Gowns, Blouses', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80' }] } } } } }
          }
        },
        designer: { name: 'Designer Wear', fabricTypes: { silk: { name: 'Silk', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'w-des-slk-n-royal', color: 'Royal Blue', price: 2999, width: '44 inches', gsm: 180, texture: 'Glossy Silk', stretch: 'None', shine: 'High', season: 'Festive', bestFor: 'Sarees', availability: 'In Stock', pattern: 'Zari Border', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        office: { name: 'Office Wear', fabricTypes: { cotton: { name: 'Cotton', brands: { biba: { name: 'Biba', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'w-off-ctn-b-navy', color: 'Navy Blue', price: 599, width: '44 inches', gsm: 140, texture: 'Smooth Breathable', stretch: 'Low', shine: 'None', season: 'All Season', bestFor: 'Kurtis, Salwars', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        bridal: { name: 'Bridal', fabricTypes: { silk: { name: 'Silk', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'w-br-slk-n-mar', color: 'Maroon', price: 4999, width: '44 inches', gsm: 220, texture: 'Heavy SilkMark', stretch: 'None', shine: 'High', season: 'Wedding', bestFor: 'Sarees, Lehengas', availability: 'In Stock', pattern: 'Zari work', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } } } }
      }
    },
    bridal: {
      name: 'Bridal',
      image: './bridalCollection.jpg',
      subcategories: {
        lehenga: {
          name: 'Lehenga',
          fabricTypes: {
            banarasiSilk: { name: 'Banarasi Silk', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'b-lh-bs-n-gold', color: 'Beige', price: 3999, width: '48 inches', gsm: 210, texture: 'Golden Silk', stretch: 'None', shine: 'Premium', season: 'Wedding', bestFor: 'Lehenga', availability: 'In Stock', pattern: 'Heavy Zari', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } },
            velvet: { name: 'Velvet', brands: { kalanjali: { name: 'Kalanjali', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'b-lh-vlt-k-mar', color: 'Maroon', price: 1999, width: '48 inches', gsm: 360, texture: 'Plush Soft', stretch: 'Low', shine: 'High', season: 'Wedding', bestFor: 'Lehenga', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80' }] } } } } },
            brocade: { name: 'Brocade', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'b-lh-brc-n-royal', color: 'Royal Blue', price: 2999, width: '48 inches', gsm: 230, texture: 'Embossed Silk', stretch: 'None', shine: 'High', season: 'Wedding', bestFor: 'Lehenga, Blouse', availability: 'In Stock', pattern: 'Brocade Zari', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } },
            rawSilk: { name: 'Raw Silk', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'b-lh-raw-n-mar', color: 'Maroon', price: 2499, width: '48 inches', gsm: 200, texture: 'Granular Structured', stretch: 'None', shine: 'Subtle', season: 'Wedding', bestFor: 'Lehenga', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } },
            organza: { name: 'Organza', brands: { kalanjali: { name: 'Kalanjali', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'b-lh-org-k-beige', color: 'Beige', price: 1299, width: '48 inches', gsm: 70, texture: 'Crisp Transparent', stretch: 'None', shine: 'Subtle', season: 'Wedding', bestFor: 'Lehenga Flare', availability: 'In Stock', pattern: 'Floral Embroidered', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' }] } } } } },
            net: { name: 'Net', brands: { kalanjali: { name: 'Kalanjali', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'b-lh-net-k-wht', color: 'White', price: 899, width: '54 inches', gsm: 50, texture: 'Mesh Soft', stretch: 'High', shine: 'Subtle', season: 'Wedding', bestFor: 'Lehenga Dupatta', availability: 'In Stock', pattern: 'Sequence Work', image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=400&q=80' }] } } } } }
          }
        },
        saree: { name: 'Saree', fabricTypes: { silk: { name: 'Silk', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'b-sr-slk-n-mar', color: 'Maroon', price: 4999, width: '44 inches', gsm: 210, texture: 'Kanchipuram SilkMark', stretch: 'None', shine: 'High', season: 'Wedding', bestFor: 'Saree', availability: 'In Stock', pattern: 'Gold Zari', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        suit: { name: 'Salwar Suit', fabricTypes: { cotton: { name: 'Cotton', brands: { fabindia: { name: 'Fabindia', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'b-st-ctn-f-beige', color: 'Beige', price: 999, width: '44 inches', gsm: 150, texture: 'Breathable Soft', stretch: 'Low', shine: 'None', season: 'All Season', bestFor: 'Suit', availability: 'In Stock', pattern: 'Chanderi block', image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        blouse: { name: 'Blouse', fabricTypes: { brocade: { name: 'Brocade', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'b-bl-brc-n-gold', color: 'Beige', price: 1499, width: '44 inches', gsm: 220, texture: 'Embossed Silk', stretch: 'None', shine: 'High', season: 'Wedding', bestFor: 'Blouse', availability: 'In Stock', pattern: 'Zari weave', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } } } }
      }
    },
    kids: {
      name: 'Kids',
      image: './kidsCollection.jpg',
      subcategories: {
        daily: { name: 'Daily Wear', fabricTypes: { cotton: { name: 'Cotton', brands: { fabindia: { name: 'Fabindia', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'k-d-ctn-f-wht', color: 'White', price: 399, width: '40 inches', gsm: 110, texture: 'Super Soft', stretch: 'Medium', shine: 'None', season: 'Summer', bestFor: 'Kids Frock, Shirt', availability: 'In Stock', pattern: 'Cartoon Print', image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        festive: {
          name: 'Festive Wear',
          fabricTypes: {
            cotton: { name: 'Cotton', brands: { fabindia: { name: 'Fabindia', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'k-f-ctn-f-beige', color: 'Beige', price: 599, width: '40 inches', gsm: 130, texture: 'Soft Cotton Silk', stretch: 'Low', shine: 'Subtle', season: 'Festive', bestFor: 'Kurta Pyjama', availability: 'In Stock', pattern: 'Ethnic motifs', image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=400&q=80' }] } } } } },
            silkBlend: { name: 'Silk Blend', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'k-f-slk-n-gold', color: 'Beige', price: 1199, width: '40 inches', gsm: 160, texture: 'Glossy Soft', stretch: 'None', shine: 'Premium', season: 'Festive', bestFor: 'Sherwani', availability: 'In Stock', pattern: 'Self-Design', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } },
            satin: { name: 'Satin', brands: { fabindia: { name: 'Fabindia', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'k-f-stn-f-royal', color: 'Royal Blue', price: 699, width: '40 inches', gsm: 120, texture: 'Silky smooth', stretch: 'Medium', shine: 'High', season: 'Festive', bestFor: 'Kids Dress', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }] } } } } },
            velvet: { name: 'Velvet', brands: { fabindia: { name: 'Fabindia', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'k-f-vlt-f-mar', color: 'Maroon', price: 1299, width: '40 inches', gsm: 320, texture: 'Soft Plush', stretch: 'Medium', shine: 'High', season: 'Winter', bestFor: 'Kids Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80' }] } } } } }
          }
        },
        party: { name: 'Party Wear', fabricTypes: { velvet: { name: 'Velvet', brands: { fabindia: { name: 'Fabindia', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'k-p-vlt-f-blk', color: 'Black', price: 1199, width: '40 inches', gsm: 320, texture: 'Plush velvet', stretch: 'Medium', shine: 'High', season: 'Party', bestFor: 'Kids Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80' }] } } } } } } }
      }
    },
    luxury: {
      name: 'Luxury',
      image: './luxuryCollection.jpg',
      subcategories: {
        exclusive: {
          name: 'Exclusive Collection',
          fabricTypes: {
            italianWool: { name: 'Italian Wool', brands: { raymond: { name: 'Raymond', collections: { super120s: { name: 'Super 120s', variants: [{ id: 'l-e-iw-r-navy', color: 'Navy Blue', price: 2499, width: '58 inches', gsm: 280, texture: 'Smooth', stretch: 'Medium', shine: 'Premium', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }] } } } } },
            egyptianCotton: { name: 'Egyptian Cotton', brands: { arvind: { name: 'Arvind Limited', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'l-e-ec-a-wht', color: 'White', price: 899, width: '58 inches', gsm: 150, texture: 'Super soft', stretch: 'Medium', shine: 'None', season: 'All Season', bestFor: 'Executive Shirt', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=400&q=80' }] } } } } },
            supimaCotton: { name: 'Supima Cotton', brands: { arvind: { name: 'Arvind Limited', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'l-e-sc-a-navy', color: 'Navy Blue', price: 1199, width: '58 inches', gsm: 160, texture: 'Extra long staple soft', stretch: 'High', shine: 'Subtle', season: 'All Season', bestFor: 'Shirt', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80' }] } } } } },
            cashmere: { name: 'Cashmere', brands: { raymond: { name: 'Raymond', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'l-e-csh-r-blk', color: 'Black', price: 8999, width: '58 inches', gsm: 250, texture: 'Cashmere cloud soft', stretch: 'Low', shine: 'Subtle', season: 'Winter', bestFor: 'Coat', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' }] } } } } },
            banarasiSilk: { name: 'Banarasi Silk', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'l-e-bs-n-gold', color: 'Beige', price: 3499, width: '48 inches', gsm: 210, texture: 'Gold zari weave', stretch: 'None', shine: 'High', season: 'Festive', bestFor: 'Saree, Lehenga', availability: 'In Stock', pattern: 'Heritage motifs', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } },
            kanchipuramSilk: { name: 'Kanchipuram Silk', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'l-e-ks-n-gold', color: 'Beige', price: 4999, width: '44 inches', gsm: 220, texture: 'Heavy SilkMark', stretch: 'None', shine: 'High', season: 'Wedding', bestFor: 'Saree', availability: 'In Stock', pattern: 'Traditional motifs', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } }
          }
        },
        imported: { name: 'Imported Collection', fabricTypes: { italianWool: { name: 'Italian Wool', brands: { raymond: { name: 'Raymond', collections: { super120s: { name: 'Super 120s', variants: [{ id: 'l-i-iw-r-blk', color: 'Black', price: 2999, width: '58 inches', gsm: 280, texture: 'Smooth velvet finish', stretch: 'Medium', shine: 'Premium', season: 'All Season', bestFor: 'Suit, Blazer', availability: 'In Stock', pattern: 'Solid', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80' }] } } } } } } },
        designer: { name: 'Designer Collection', fabricTypes: { banarasiSilk: { name: 'Banarasi Silk', brands: { nalli: { name: 'Nalli', collections: { classic: { name: 'Classic Collection', variants: [{ id: 'l-d-bs-n-gold', color: 'Beige', price: 3999, width: '48 inches', gsm: 210, texture: 'Gold zari thread', stretch: 'None', shine: 'High', season: 'Wedding', bestFor: 'Saree', availability: 'In Stock', pattern: 'Designer motifs', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' }] } } } } } } }
      }
    }
  }
};

