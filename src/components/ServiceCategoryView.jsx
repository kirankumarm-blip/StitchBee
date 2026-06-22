import React, { useState } from 'react';
import { 
  Sparkles, Scissors, Layers, Star, Info, FileText, ChevronRight, X, Heart, 
  ShoppingCart, Lock, ArrowRight, User, Award, ShieldCheck, MapPin, Phone, Check 
} from 'lucide-react';

const categoryTemplates = {
  mens: {
    badge: "ATELIER FOR GENTLEMEN",
    title: "Premium Men's Tailoring",
    subtext: "Custom stitching crafted for your style. From corporate power suits to elegant wedding sherwanis, get measured at home and hand-stitched by master craftsmen.",
    services: [
      { name: "Custom Stitching", desc: "Suits, shirts, blazers, and ethnic wear stitched to order.", icon: <Scissors size={20} /> },
      { name: "Professional Alterations", desc: "Resizing, custom fits, and repairs for all men's garments.", icon: <Sparkles size={20} /> },
      { name: "Premium Fabric Selection", desc: "Merino wool, Egyptian cotton, and Belgian linen collections.", icon: <Layers size={20} /> },
      { name: "Doorstep Measurements", desc: "Male student partners visit for physical measurements.", icon: <User size={20} /> },
      { name: "Wedding Wear", desc: "Sherwanis, bandhgalas, and bespoke suits for grooms.", icon: <Award size={20} /> },
      { name: "Office Wear", desc: "Crisp formal shirts and structured trousers.", icon: <ShieldCheck size={20} /> },
      { name: "Party Wear", desc: "Tuxedos and casual jackets for evening events.", icon: <Star size={20} /> }
    ],
    designs: [
      { id: "m-blazer", name: "Premium Slim-Fit Blazer", img: "./men1.jpg", desc: "Single-breasted structured blazer suitable for business-casual outings.", price: "₹2,499" },
      { id: "m-suit", name: "Executive Two-Piece Suit", img: "./men2.jpg", desc: "Classic corporate styling with custom pocket squares and trousers.", price: "₹2,999" },
      { id: "m-shirt", name: "Oxford Collared Dress Shirt", img: "./men3.jpg", desc: "Crisp Giza cotton shirt with custom collar and cuff monograms.", price: "₹499" },
      { id: "m-kurta", name: "Traditional Silk Kurta", img: "./m4.jpg", desc: "Fine silk blend kurta with elegant neckline embroidery details.", price: "₹799" },
      { id: "m-sherwani", name: "Royal Wedding Sherwani", img: "./m5.jpg", desc: "Intricate zardozi handcrafted sherwani with premium dupatta.", price: "₹4,999" },
      { id: "m-nehru", name: "Classic Nehru Jacket", img: "./m6.jpg", desc: "Premium textured sleeveless jacket, suitable for ethnic layered wear.", price: "₹999" }
    ],
    fabrics: [
      { id: "f-wool", name: "Italian Merino Wool", type: "Italian Wool", price: 2499, rating: "5.0", img: "./fab1.jpg" },
      { id: "f-cotton", name: "Egyptian Giza Cotton", type: "Egyptian Cotton", price: 899, rating: "4.9", img: "./fab2.jpg" },
      { id: "f-linen", name: "Belgian Flax Linen", type: "Belgian Linen", price: 1599, rating: "4.8", img: "./fab3.jpg" },
      { id: "f-tweed", name: "Harris Tweed Winter Wool", type: "Tweed Wool", price: 1999, rating: "4.7", img: "./fab4.jpg" },
      { id: "f-supima", name: "Supima Classic Cotton", type: "Supima Cotton", price: 999, rating: "4.9", img: "./fab5.jpg" },
      { id: "f-cashmere", name: "Cashmere Silk Blend", type: "Cashmere Silk", price: 2999, rating: "5.0", img: "./fab6.jpg" }
    ],
    pricing: [
      { item: "Basic Cotton Shirt Stitching", price: "₹499" },
      { item: "Premium Formal Shirt Stitching", price: "₹899" },
      { item: "Classic Trouser Stitching", price: "₹699" },
      { item: "Executive Two-Piece Suit", price: "₹2,999" },
      { item: "Double-Breasted Blazer", price: "₹2,499" },
      { item: "Royal Wedding Sherwani", price: "₹4,999" }
    ],
    reviews: [
      { author: "Rahul Verma", text: "The fit of the blazer is incredibly precise. The Touchless AI Camera scan saved me a trip to the boutique, and it looks like a million bucks.", rating: 5, initial: "R" },
      { author: "Vikram Malhotra", text: "Ordered a wedding sherwani. The master tailor called to confirm neck sizing, and the doorstep measurement visit by the student was very smooth.", rating: 5, initial: "V" }
    ]
  },
  womens: {
    badge: "BESPOKE WOMEN'S COUTURE",
    title: "Premium Women's Tailoring",
    subtext: "Elegant custom designs, stitched for your exact shape. Access certified designers, choose high-end fabrics, and get measured by professional female fit-helpers.",
    services: [
      { name: "Custom Stitching", desc: "Lehengas, designer sarees, blouses, and kurtis hand-stitched.", icon: <Scissors size={20} /> },
      { name: "Fit Alterations", desc: "Quick resizing, pattern modifications, and sleeve shifts.", icon: <Sparkles size={20} /> },
      { name: "Premium Fabric Selection", desc: "Royal satin, georgette, chiffon, velvet, and silks.", icon: <Layers size={20} /> },
      { name: "Doorstep Measurements", desc: "Female student gig partners ensure comfortable fitting visits.", icon: <User size={20} /> },
      { name: "Designer Consultation", desc: "Direct video consults with certified boutique designers.", icon: <Award size={20} /> },
      { name: "Office Wear", desc: "Tailored formal blazers, skirts, and custom collared shirts.", icon: <ShieldCheck size={20} /> },
      { name: "Party Wear", desc: "Embellished evening gowns and festive salwar suits.", icon: <Star size={20} /> }
    ],
    designs: [
      { id: "w-lehenga", name: "Handcrafted Festive Lehenga", img: "./w_women1.jpg", desc: "Elegant georgette base with heavy border sequins and matching choli.", price: "₹3,999" },
      { id: "w-blouse", name: "Padded Designer Saree Blouse", img: "./w_women2.jpg", desc: "Princess cut sweetheart blouse with backend lace tie customizations.", price: "₹599" },
      { id: "w-suit", name: "Anarkali Salwar Suit", img: "./w_womens3.jpg", desc: "Royal flair silk salwar suit with embroidered georgette dupatta.", price: "₹999" },
      { id: "w-gown", name: "Satin Evening Slip Gown", img: "./w_women4.jpg", desc: "Sleek cowl neck premium satin gown for corporate dinners.", price: "₹2,999" },
      { id: "w-kurti", name: "Floral Georgette Kurti", img: "./w_women5.jpg", desc: "Lightweight A-line summer kurti with delicate cuff loops.", price: "₹399" },
      { id: "w-blazer", name: "Tailored Women's Blazer", img: "./w_women6.jpg", desc: "Structured formal blazer for modern workplace style.", price: "₹2,199" },
      { id: "w-saree", name: "Designer Saree Custom Drape", img: "./w_women7.jpg", desc: "Bespoke custom saree stitching and pre-pleated drape service.", price: "₹1,499" }
    ],
    fabrics: [
      { id: "f-satin", name: "Royal Crepe Satin", type: "Premium Satin", price: 799, rating: "4.9", img: "./wf_b2.jpg" },
      { id: "f-georgette", name: "Embellished Georgette", type: "Georgette Silk", price: 699, rating: "4.8", img: "./wf_b3.jpg" },
      { id: "f-chiffon", name: "Fine Pure Chiffon", type: "Chiffon Blend", price: 599, rating: "4.7", img: "./wf_b4.jpg" },
      { id: "f-velvet", name: "Plush Maroon Velvet", type: "Luxury Velvet", price: 1899, rating: "5.0", img: "./wf_b5.jpg" },
      { id: "f-banarasi", name: "Premium Banarasi Brocade", type: "Banarasi Silk", price: 1299, rating: "4.9", img: "./wf_banarasi.jpg" },
      { id: "f-organza", name: "Organza Floral Silk", type: "Organza Silk", price: 899, rating: "4.8", img: "./wf_b6.jpg" }
    ],
    pricing: [
      { item: "Basic A-Line Kurti Stitching", price: "₹399" },
      { item: "Standard Salwar Suit Stitching", price: "₹899" },
      { item: "Designer Padded Blouse", price: "₹899" },
      { item: "Anarkali Suit With Lining", price: "₹1,499" },
      { item: "Premium Satin Evening Gown", price: "₹2,999" },
      { item: "Handcrafted Wedding Lehenga", price: "₹3,999" }
    ],
    reviews: [
      { author: "Priya Sharma", text: "Ordered 3 blouses. The fit around the armholes was absolutely perfect. The student came to my home, verified sizing, and picked up my fabric.", rating: 5, initial: "P" },
      { author: "Ananya Iyer", text: "Beautiful tailoring! The georgette kurti feels so lightweight, and the stitching is clean without any loose threads. Fast delivery too.", rating: 5, initial: "A" }
    ]
  },
  bridal: {
    badge: "EXQUISITE WEDDING LABS",
    title: "Bespoke Bridal Couture",
    subtext: "Your dream wedding dress, crafted to perfection. Work with master tailors and award-winning designers. Access luxury embroidery, custom zari patterns, and priority fittings.",
    services: [
      { name: "Bridal Lehengas", desc: "Custom designed lehengas with heavy hand embroidery & stonework.", icon: <Scissors size={20} /> },
      { name: "Designer Blouses", desc: "Zari, brocade, and velvet blouses matching custom sarees.", icon: <Sparkles size={20} /> },
      { name: "Wedding Gowns", desc: "Exquisite white lace, satin, and organza western wedding gowns.", icon: <Layers size={20} /> },
      { name: "Designer Consultation", desc: "1-on-1 sessions to map styling boards and custom borders.", icon: <User size={20} /> },
      { name: "Priority Fitting Slot", desc: "Guaranteed priority delivery within 12 days with dry cleaning.", icon: <Award size={20} /> },
      { name: "Home trials", desc: "Doorstep fit-trials with free designer alterations support.", icon: <ShieldCheck size={20} /> },
      { name: "Luxury Fabric Sourcing", desc: "Sourcing gold-certified SilkMark Banarasi and Kanchipuram silk.", icon: <Star size={20} /> }
    ],
    designs: [
      { id: "b-lehenga", name: "Royal Zardozi Bridal Lehenga", img: "./br_b1.jpg", desc: "Traditional dark red velvet lehenga with dual dupatta and gold metallic threads.", price: "₹7,999" },
      { id: "b-blouse", name: "Embroidered Silk Bridal Blouse", img: "./br_b2.jpg", desc: "Heavy hand-beaded blouse with elbow-length sleeves and back neckline keyhole.", price: "₹1,999" },
      { id: "b-gown", name: "Lace Overlay Wedding Gown", img: "./br_bridal2.jpg", desc: "Imported french lace bodice with layers of premium soft tulle trail.", price: "₹6,999" },
      { id: "b-anarkali", name: "Luxury Bridal Anarkali Suit", img: "./br_bridal3.jpg", desc: "Floor-length heavy embroidered silk Anarkali suit for wedding festivities.", price: "₹3,499" },
      { id: "b-saree", name: "Banarasi Bridal Saree Gown", img: "./br_bridal4.jpg", desc: "Stitched pre-draped bridal saree with heavy golden border details.", price: "₹4,499" },
      { id: "b-sherwani-bride", name: "Royal Indowestern Bridal Set", img: "./br_bridal 5.jpg", desc: "Contemporary high-fashion wedding wear with matching custom details.", price: "₹5,499" },
      { id: "b-reception-gown", name: "Glittering Reception Gown", img: "./br_bridal6.jpg", desc: "Glamorous off-shoulder gown with sparkling glass beads and trailing net skirt.", price: "₹8,999" },
      { id: "b-haldi", name: "Yellow Haldi Crop-Top Set", img: "./br_bridal7.jpg", desc: "Charming mustard-yellow crop top and flared skirt with mirror work details.", price: "₹2,799" }
    ],
    fabrics: [
      { id: "f-silk", name: "Pure Silk Banarasi", type: "Banarasi Silk", price: 2999, rating: "5.0", img: "./brf_fa2.jpg" },
      { id: "f-velvet-b", name: "Royal Wedding Velvet", type: "Luxury Velvet", price: 1899, rating: "5.0", img: "./brf_fa3.jpg" },
      { id: "f-raw-silk", name: "Certified Raw Silk", type: "Mulberry Raw Silk", price: 1499, rating: "4.9", img: "./brf_fa4.jpg" },
      { id: "f-brocade-b", name: "Premium Golden Brocade", type: "Golden Brocade", price: 2199, rating: "4.9", img: "./brf_fa5.jpg" },
      { id: "f-organza-b", name: "Sheer Organza Tissue", type: "Tissue Organza", price: 1299, rating: "4.8", img: "./brf_faa6.jpg" },
      { id: "f-net-b", name: "Heavy Sequins Net", type: "Embroidered Net", price: 1799, rating: "4.7", img: "./brf_fa7.jpg" }
    ],
    pricing: [
      { item: "Zardozi Saree Blouse Stitching", price: "₹1,999" },
      { item: "Designer Bridal Salwar Suit", price: "₹2,499" },
      { item: "Western Lace Reception Gown", price: "₹5,999" },
      { item: "Bespoke Royal Bridal Lehenga", price: "₹7,999" }
    ],
    reviews: [
      { author: "Sneha Reddy", text: "Stitched my bridal lehenga here. The handiwork is absolute poetry. The gold borders are aligned perfectly, and the fit did not need any alteration.", rating: 5, initial: "S" },
      { author: "Kritika Sen", text: "Excellent designer consultation. They helped me choose the exact shade of crimson velvet. The finished gown looked absolutely breathtaking.", rating: 5, initial: "K" }
    ]
  },
  kids: {
    badge: "COMFORTABLE FESTIVE CUDDLES",
    title: "Premium Kids Tailoring",
    subtext: "Comfortable, soft-lined, and premium custom wear for kids. Stitched with internal cotton lining sheets to prevent itching, designed for ease of movement.",
    services: [
      { name: "Festive wear", desc: "Kurta pyjamas, lehenga-cholis, and kids sherwanis.", icon: <Scissors size={20} /> },
      { name: "Party Wear Suits", desc: "Tuxedo suits, blazers, and custom birthday gowns.", icon: <Sparkles size={20} /> },
      { name: "Anti-Itch Soft Lining", desc: "All children's garments are layered with ultra-soft cotton linings.", icon: <Layers size={20} /> },
      { name: "Sizing Room Allowances", desc: "Stitched with hidden inside stitches to let out as the child grows.", icon: <User size={20} /> },
      { name: "Doorstep Trials", desc: "Quick fit checks at home, designed for zero stress for parents.", icon: <Award size={20} /> }
    ],
    designs: [
      { id: "k-suit", name: "Toddler Party Tuxedo Suit", img: "./k_k1.jpg", desc: "Three-piece tiny suit with micro bow-tie and elastic waistband trouser.", price: "₹1,199" },
      { id: "k-festive", name: "Kids Silk Kurta Pyjama", img: "./k_k2.jpg", desc: "Soft blend kurta with side buttons and comfortable cotton pajama.", price: "₹599" },
      { id: "k-daily", name: "Comfort Cotton Frock", img: "./k_k3.jpg", desc: "Anti-allergen organic cotton frock with back zip closure.", price: "₹249" },
      { id: "k-lehenga", name: "Kids Silk Lehenga Choli", img: "./k_k4.jpg", desc: "Cute mini silk lehenga with matching floral choli.", price: "₹899" },
      { id: "k-sherwani", name: "Junior Wedding Sherwani", img: "./k_k5.jpg", desc: "Micro zardozi work sherwani for boys, comes with cotton pajama.", price: "₹1,099" },
      { id: "k-frock", name: "Premium Tulle Birthday Frock", img: "./k_k6.jpg", desc: "Fluffy net frock with soft cotton lining layers and back ribbon tie.", price: "₹799" }
    ],
    fabrics: [
      { id: "f-supima", name: "Organic Supima Cotton", type: "Supima Cotton", price: 899, rating: "4.9", img: "./kf_fab1.jpg" },
      { id: "f-soft-satin", name: "Baby-Safe Soft Satin", type: "Soft Satin", price: 599, rating: "4.8", img: "./kf_fab2.jpg" },
      { id: "f-cotton-b", name: "Combed Cotton Blend", type: "Combed Cotton", price: 399, rating: "4.7", img: "./kf_fab3.jpg" },
      { id: "f-kids-linen", name: "Soft Organic Linen", type: "Organic Linen", price: 699, rating: "4.8", img: "./kf_fab4.jpg" },
      { id: "f-kids-silk", name: "Soft Mulberry Silk", type: "Mulberry Silk", price: 1199, rating: "4.9", img: "./kf_fab5.jpg" },
      { id: "f-kids-flannel", name: "Cozy Brushed Flannel", type: "Brushed Flannel", price: 499, rating: "4.7", img: "./kf_fab6.jpg" }
    ],
    pricing: [
      { item: "Kids Basic Cotton Wear", price: "₹249" },
      { item: "Kids Festive Kurta Pyjama", price: "₹599" },
      { item: "Kids Lehenga Choli Stitching", price: "₹899" },
      { item: "Toddler Three-Piece Party Suit", price: "₹1,199" }
    ],
    reviews: [
      { author: "Meera Patel", text: "Loved the soft cotton lining in my son's sherwani. He wore it all evening without complaining once about itching. Fantastic job!", rating: 5, initial: "M" },
      { author: "Karan Mehta", text: "The growth allowance stitch is a genius idea. Stitched a birthday suit for my 5-year old, it has space to adjust as he grows.", rating: 5, initial: "K" }
    ]
  },
  uniforms: {
    badge: "DURABLE SCHOOL & WORK WEAR",
    title: "Premium Uniform Stitching",
    subtext: "High-durability school, corporate, and healthcare uniforms stitched to perfection. Reinforced seams, quality brass buttons, and custom school/corporate logos.",
    services: [
      { name: "School Uniforms", desc: "Shirts, skirts, trousers, and pinafores for all school codes.", icon: <Scissors size={20} /> },
      { name: "Corporate Uniforms", desc: "Structured blazers, waistcoats, and formal pants.", icon: <Sparkles size={20} /> },
      { name: "Medical & Scrubs", desc: "Comfortable, sterile-wash safe healthcare scrubs and lab coats.", icon: <Layers size={20} /> },
      { name: "Bulk Measurements", desc: "Boutique master tailors visiting schools/offices for group fittings.", icon: <User size={20} /> },
      { name: "Logo Embroidery", desc: "High-density custom machine embroidery for badges and logos.", icon: <Award size={20} /> }
    ],
    designs: [
      { id: "uni-boy", name: "Classic Boy's School Set", img: "./uni_uni1.jpg", desc: "Short sleeve formal white shirt with matching grey shorts.", price: "₹299" },
      { id: "uni-girl", name: "Classic Girl's Pinafore", img: "./uni_uni2.jpg", desc: "Navy blue pinafore dress with short sleeve white collared shirt.", price: "₹349" },
      { id: "uni-blazer", name: "School Crest Blazer", img: "./uni_uni3.jpg", desc: "Structured dark navy blazer with custom pocket crest lining.", price: "₹899" },
      { id: "uni-shirt", name: "Premium Oxford School Shirt", img: "./uni_uni4.jpg", desc: "Durable cotton-poly blend collared shirt with reinforced elbows.", price: "₹199" },
      { id: "uni-scrub", name: "Medical Scrub Set", img: "./uni_uni5.jpg", desc: "V-neck lightweight teal scrubs with multi-pocket trousers.", price: "₹399" },
      { id: "uni-lab", name: "Classic Lab Coat", img: "./uni_uni6.jpg", desc: "Full-length white cotton lab coat with front button closure.", price: "₹299" }
    ],
    fabrics: [
      { id: "f-uni-cotton", name: "Twill School Cotton", type: "Cotton Poly", price: 290, rating: "4.8", img: "./unif_fab1.jpg" },
      { id: "f-uni-poly", name: "Durable Polyester Blend", type: "Durable Poly", price: 180, rating: "4.7", img: "./unif_fab2.jpg" },
      { id: "f-uni-suiting", name: "Premium Suiting Fabric", type: "Viscose Blend", price: 390, rating: "4.9", img: "./unif_fab3.jpg" },
      { id: "f-uni-anti", name: "Anti-Bacterial Medical Fabric", type: "Anti-Bacterial", price: 450, rating: "4.9", img: "./unif_fab4.jpg" },
      { id: "f-uni-drill", name: "Heavy Cotton Drill", type: "Cotton Drill", price: 320, rating: "4.8", img: "./unif_fab5.jpg" },
      { id: "f-uni-terry", name: "Terrycot Classic Uniform", type: "Terrycot Blend", price: 240, rating: "4.7", img: "./unif_fab6.jpg" }
    ],
    pricing: [
      { item: "School Shirt Stitching", price: "₹199" },
      { item: "School Skirt/Pinafore", price: "₹349" },
      { item: "School Blazer Stitching", price: "₹899" },
      { item: "Medical Scrubs Set", price: "₹399" }
    ],
    reviews: [
      { author: "Anita Rao", text: "Ordered uniforms for both my kids. The fabric is durable and doesn't shrink. Excellent fitting around the collar.", rating: 5, initial: "A" },
      { author: "Dr. Sandeep", text: "Stitched lab coats for our entire clinic staff. Clean stitching, correct sizes, and daily convenience.", rating: 5, initial: "S" }
    ]
  },
  alterations: {
    badge: "PRECISION FIT ADJUSTMENTS",
    title: "Expert Alterations & Fit",
    subtext: "Get the perfect fit with our professional alteration services. Resizing, hem modifications, zipper replacements, and repair services executed in 24 hours.",
    services: [
      { name: "Full Suit Resizing", desc: "Adjust shoulder width, waist profiles, and sleeve lengths of blazers.", icon: <Scissors size={20} /> },
      { name: "Jeans Hemming", desc: "Hemming, leg narrowing, and length shortening for trousers.", icon: <Sparkles size={20} /> },
      { name: "Zip & Button Repair", desc: "Heavy-duty zipper swaps and metal button replacements.", icon: <Layers size={20} /> },
      { name: "Quick 24h Express", desc: "Urgent turnaround for event fits and business suits.", icon: <User size={20} /> },
      { name: "doorstep trials", desc: "Student runner picks up reference garments and delivers alterations.", icon: <Award size={20} /> }
    ],
    designs: [
      { id: "a-suit", name: "Suit & Blazer Slimming", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80", desc: "Narrowing jacket seams and sleeves to match athletic measurements.", price: "₹799" },
      { id: "a-hem", name: "Trouser Leg Hemming", img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=400&q=80", desc: "Shortening denim or formal trousers with original-looking borders.", price: "₹149" },
      { id: "a-zip", name: "Heavy-Duty Zipper Swap", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80", desc: "Replacing broken zippers on jackets, lehengas, and denim trousers.", price: "₹99" }
    ],
    fabrics: [
      { id: "f-thread", name: "StitchBee Thread Spool Pack", type: "Polyester Thread", price: 99, rating: "4.9", img: "https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=300&q=80" },
      { id: "f-zipper", name: "Premium Brass Zipper", type: "Zipper Asset", price: 79, rating: "4.8", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80" },
      { id: "f-lining", name: "Soft Cotton Lining Fabric", type: "Cotton Lining", price: 199, rating: "4.7", img: "https://images.unsplash.com/photo-1545042679-41d22b2ca130?auto=format&fit=crop&w=300&q=80" }
    ],
    pricing: [
      { item: "Jeans Hemming / Shortening", price: "₹149" },
      { item: "Zipper Replacement", price: "₹99" },
      { item: "Dress / Kurti Waist Resizing", price: "₹299" },
      { item: "Suit Jacket / Blazer Alteration", price: "₹799" }
    ],
    reviews: [
      { author: "Sanjay Dutta", text: "Alteration was done in less than 24 hours. They picked up my wedding suit, slimmed the trousers, and returned it fitting perfectly.", rating: 5, initial: "S" },
      { author: "Rohan Das", text: "Replaced a broken zip on a leather jacket. Excellent work, looks identical to the original one.", rating: 4, initial: "R" }
    ]
  }
};

export default function ServiceCategoryView({ 
  categoryKey, currentUser, onLoginRequired, onExploreDesigns, onViewFabrics, onBookStitching, tailors = [] 
}) {
  const [pricingOpen, setPricingOpen] = useState(false);
  const data = categoryTemplates[categoryKey] || categoryTemplates.mens;

  // Filter tailors that specialize in this category
  const filteredTailors = tailors.filter(t => {
    if (categoryKey === 'mens') return t.orders > 90; // mock specialization
    if (categoryKey === 'womens') return t.rating >= 4.8;
    if (categoryKey === 'bridal') return t.name.includes('Elite') || t.name.includes('Royal');
    if (categoryKey === 'kids') return t.orders <= 94;
    return true; // alterations / default
  }).slice(0, 3);

  const handleDesignClick = (design) => {
    if (!currentUser) {
      onLoginRequired();
    } else {
      onBookStitching(design);
    }
  };

  return (
    <div className="service-category-container">
      {/* 1. Hero Banner */}
      <div className="category-landing-hero">
        <div className="category-hero-blur"></div>
        <div style={{ position: 'relative', zIndex: 2, padding: '40px' }}>
          <span className="badge badge-primary" style={{ width: 'fit-content', marginBottom: '12px' }}>
            {data.badge}
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '16px', lineHeight: '1.1' }}>
            {data.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', marginBottom: '30px', lineHeight: '1.6' }}>
            {data.subtext}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onExploreDesigns}>
              Explore Designs
            </button>
            <button className="btn btn-secondary" onClick={onViewFabrics} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
              View Fabrics
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                if (!currentUser) onLoginRequired();
                else onBookStitching();
              }}
              style={{ background: 'var(--grad-accent)', border: 'none' }}
            >
              Book Stitching
            </button>
          </div>
        </div>
      </div>

      {/* 2. Available Services */}
      <section style={{ margin: '4rem 0' }}>
        <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>Available Services</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Bespoke offerings matching your requirements</p>
        </div>
        <div className="services-mini-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {data.services.map((ser, idx) => (
            <div key={idx} className="service-card-mini glass-card-no-hover" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              <div style={{ color: 'var(--primary)', background: 'rgba(247,37,133,0.1)', padding: '10px', borderRadius: '8px', width: 'fit-content' }}>
                {ser.icon}
              </div>
              <h4 style={{ fontWeight: 'bold', color: '#fff', fontSize: '1rem' }}>{ser.name}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>{ser.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Popular Designs */}
      <section id="popular-designs-section" style={{ margin: '4rem 0' }}>
        <div className="section-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>Popular Outfits & Layouts</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Choose a reference silhouette and configure custom fits</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {data.designs.map((des, idx) => (
            <div key={idx} className="glass-card design-grid-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', padding: 0 }}>
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img src={des.img} alt={des.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="price-tag-floating" style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'var(--primary)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  Stitching from {des.price}
                </span>
              </div>
              <div style={{ padding: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.05rem', lineHeight: '1.2' }}>{des.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px', lineHeight: '1.4' }}>{des.desc}</p>
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '15px', padding: '10px' }}
                  onClick={() => handleDesignClick(des)}
                >
                  Configure Fitting
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Premium Fabric Marketplace */}
      <section style={{ margin: '4rem 0' }}>
        <div className="section-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>Recommended Fabrics</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Sourced luxury fabrics optimized for these styles</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {data.fabrics.map((fab, idx) => (
            <div key={idx} className="glass-card-no-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px', textAlign: 'left' }}>
              <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={fab.img} alt={fab.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="badge-mini" style={{ width: 'fit-content', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', fontSize: '0.65rem' }}>{fab.type}</span>
                <h4 style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem', lineHeight: '1.2' }}>{fab.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <strong style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>₹{fab.price}/m</strong>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', color: '#fbbf24' }}>
                    <Star size={10} fill="#fbbf24" /> {fab.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary" onClick={onViewFabrics} style={{ margin: '0 auto', display: 'block', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
          Explore All Fabrics <ArrowRight size={14} style={{ marginLeft: '6px' }} />
        </button>
      </section>

      {/* 5. How It Works */}
      <section style={{ margin: '4rem 0', background: 'rgba(255,255,255,0.01)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>How It Works</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Your custom outfit delivered in 6 simple steps</p>
        </div>
        <div className="how-it-works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
          {[
            { step: "01", title: "Choose Design", desc: "Select silhouette outline." },
            { step: "02", title: "Select Fabric", desc: "Provide yours or buy premium." },
            { step: "03", title: "Book Sizing", desc: "Use Touchless AI scan or home fit." },
            { step: "04", title: "Boutique Match", desc: "Matched with expert tailors near you." },
            { step: "05", title: "Track Progress", desc: "12-stage live dashboard tracker." },
            { step: "06", title: "Doorstep Delivery", desc: "Fitted, steamed & sent to your home." }
          ].map((item, idx) => (
            <div key={idx} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', opacity: '0.7' }}>{item.step}</span>
              <h4 style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.4' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Pricing Preview */}
      <section style={{ margin: '4rem 0' }}>
        <div className="glass-card-no-hover" style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>Transparent Pricing</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px', maxWidth: '400px' }}>No hidden charges. Standard tailoring rates designed to accommodate custom parameters.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {data.pricing.slice(0, 3).map((pr, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 20px', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>{pr.item}</span>
                <strong style={{ fontSize: '1.1rem', color: '#fff', display: 'block', marginTop: '4px' }}>{pr.price}</strong>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary" onClick={() => setPricingOpen(true)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
            View Full Pricing
          </button>
        </div>
      </section>

      {/* 7. Tailors Near You Preview */}
      <section style={{ margin: '4rem 0' }}>
        <div className="section-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>Verified Tailors Near You</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Expert partners located in your vicinity</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {filteredTailors.map((tailor, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              
              {/* Blur sensitive details for guest users */}
              {!currentUser ? (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(8,7,16,0.35)', backdropFilter: 'blur(3px)', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', textAlign: 'center' }}>
                  <div style={{ background: 'rgba(247,37,133,0.15)', color: 'var(--primary)', padding: '12px', borderRadius: '50%', marginBottom: '12px' }}>
                    <Lock size={24} />
                  </div>
                  <h4 style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem' }}>Tailor Details Locked</h4>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '180px', marginBottom: '12px' }}>Login to view ratings, coordinates, and contact details.</p>
                  <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.75rem' }} onClick={onLoginRequired}>
                    Login to Book
                  </button>
                </div>
              ) : null}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff' }}>{tailor.name}</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <MapPin size={12} /> {tailor.address}
                  </p>
                </div>
                <span style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24', fontSize: '0.72rem', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={10} fill="#fbbf24" style={{ color: '#fbbf24' }} /> {tailor.rating}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '20px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Orders Done</span>
                  <strong style={{ fontSize: '0.88rem', color: '#fff' }}>{tailor.orders} orders</strong>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Experience</span>
                  <strong style={{ fontSize: '0.88rem', color: '#fff' }}>{tailor.exp}</strong>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Speciality</span>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--primary)' }}>{categoryKey === 'alterations' ? 'Fits' : categoryKey === 'bridal' ? 'Zardozi' : 'Suits'}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={10} /> {tailor.phone || "+91 98765 43210"}
                </span>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                  onClick={() => onBookStitching()}
                >
                  Book Tailor
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Customer Reviews */}
      <section style={{ margin: '4rem 0' }}>
        <div className="section-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>What Our Customers Say</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Feedback from verified users who stitched these items</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {data.reviews.map((rev, idx) => (
            <div key={idx} className="glass-card-no-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#fbbf24' }}>
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" style={{ color: '#fbbf24' }} />)}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                "{rev.text}"
              </p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--grad-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  {rev.initial}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>{rev.author}</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CTA Section */}
      <section style={{ margin: '4rem 0 2rem 0' }}>
        <div className="category-landing-hero" style={{ padding: '50px 30px', textAlign: 'center', background: 'var(--grad-primary)' }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
              Ready to Stitch Your Perfect Outfit?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.5' }}>
              Join StitchBee today to access AI scanning, certified boutiques, and 100% fit guarantees.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {currentUser ? (
                <button className="btn btn-primary" onClick={() => onBookStitching()} style={{ background: '#fff', color: 'var(--primary)', fontWeight: 'bold' }}>
                  Book Stitching Now
                </button>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={onLoginRequired} style={{ background: '#fff', color: 'var(--primary)', fontWeight: 'bold' }}>
                    Sign Up to Book
                  </button>
                  <button className="btn btn-secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                    Continue as Guest
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Modal */}
      {pricingOpen && (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
          <div className="modal-content animate-fade-in" style={{ maxWidth: '500px', width: '90%', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>Full Category Pricing Sheet</h3>
              <button onClick={() => setPricingOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '60vh', overflowY: 'auto', textAlign: 'left' }}>
              {data.pricing.map((pr, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{pr.item}</span>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--primary)' }}>{pr.price}</strong>
                </div>
              ))}
              <div style={{ padding: '10px', background: 'rgba(247,37,133,0.05)', borderRadius: '6px', border: '1px dashed var(--primary)', marginTop: '10px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', lineHeight: '1.4' }}>
                  * All pricing previews represent basic stitching work. Heavy designer work, custom zardozi linings, or urgent 24h express deliveries may incur premium upcharges.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
