import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Truck, Award, Camera, Check, Clock, ChevronRight, 
  ArrowRight, X, Star, Upload, Trash2, CheckCircle2, RotateCcw, 
  Wrench, Eye, Calendar, Sparkles, MapPin, ChevronLeft
} from 'lucide-react';
import './ShoesRepairRestore.css';

// ============================================================================
// DATA MODELS & ASSET MAPPING
// ============================================================================

export const FOOTWEAR_CATEGORIES = [
  {
    id: 'mens-shoes',
    name: "Men's Shoes",
    desc: "Formal shoes, loafers & leather shoes",
    img: "/shoerepair/MENS SHOE.png",
    shoeGraphic: "/shoerepair/TransparentShoe.png",
    issues: [
      { id: 'sole-worn', label: "Sole Worn / Detached", hotspot: 'sole' },
      { id: 'heel-damaged', label: "Heel Damaged", hotspot: 'heel' },
      { id: 'stitching-undone', label: "Stitching Came Undone", hotspot: 'stitching' },
      { id: 'leather-cracked', label: "Leather Scratched / Cracked", hotspot: 'upper' },
      { id: 'color-fading', label: "Colour Fading / Scuffing", hotspot: 'toe' },
      { id: 'insole-replace', label: "Insole Replacement", hotspot: 'insole' },
      { id: 'laces-hardware', label: "Laces / Hardware Damage", hotspot: 'laces' },
      { id: 'not-sure', label: "I'm Not Sure", hotspot: null }
    ]
  },
  {
    id: 'womens-shoes',
    name: "Women's Shoes",
    desc: "Heels, flats, pumps & designer footwear",
    img: "/shoerepair/WOMENS SHOE.png",
    shoeGraphic: "/shoerepair/TransparentShoe.png",
    issues: [
      { id: 'heel-damaged', label: "Heel Damaged", hotspot: 'heel' },
      { id: 'sole-worn', label: "Sole Worn / Detached", hotspot: 'sole' },
      { id: 'strap-buckle', label: "Strap / Buckle Damage", hotspot: 'laces' },
      { id: 'stitching-undone', label: "Stitching Came Undone", hotspot: 'stitching' },
      { id: 'leather-cracked', label: "Leather Scratched / Cracked", hotspot: 'upper' },
      { id: 'color-fading', label: "Colour Fading / Scuffing", hotspot: 'toe' },
      { id: 'insole-replace', label: "Insole Replacement", hotspot: 'insole' },
      { id: 'not-sure', label: "I'm Not Sure", hotspot: null }
    ]
  },
  {
    id: 'sneakers',
    name: "Sneakers",
    desc: "Casual, sports & lifestyle sneakers",
    img: "/shoerepair/SNEAKERS.png",
    shoeGraphic: "/shoerepair/TransparentShoe.png",
    issues: [
      { id: 'sole-worn', label: "Sole Worn / Detached", hotspot: 'sole' },
      { id: 'sneaker-clean', label: "Sneaker Cleaning", hotspot: 'upper' },
      { id: 'stitching-undone', label: "Stitching Came Undone", hotspot: 'stitching' },
      { id: 'upper-damage', label: "Upper Damage", hotspot: 'upper' },
      { id: 'color-fading', label: "Colour Fading / Scuffing", hotspot: 'toe' },
      { id: 'laces-hardware', label: "Laces / Hardware Damage", hotspot: 'laces' },
      { id: 'insole-replace', label: "Insole Replacement", hotspot: 'insole' },
      { id: 'not-sure', label: "I'm Not Sure", hotspot: null }
    ]
  },
  {
    id: 'sandals-slippers',
    name: "Sandals & Slippers",
    desc: "Leather sandals, slippers & everyday footwear",
    img: "/shoerepair/SANDALS.png",
    shoeGraphic: "/shoerepair/TransparentShoe.png",
    issues: [
      { id: 'broken-strap', label: "Broken Strap / Buckle", hotspot: 'laces' },
      { id: 'sole-worn', label: "Sole Worn / Detached", hotspot: 'sole' },
      { id: 'stitching-undone', label: "Stitching Came Undone", hotspot: 'stitching' },
      { id: 'footbed-damage', label: "Footbed / Insole Damage", hotspot: 'insole' },
      { id: 'color-fading', label: "Colour Fading", hotspot: 'toe' },
      { id: 'not-sure', label: "I'm Not Sure", hotspot: null }
    ]
  },
  {
    id: 'boots',
    name: "Boots",
    desc: "Leather, ankle & premium boots",
    img: "/shoerepair/BOOTS.png",
    shoeGraphic: "/shoerepair/TransparentShoe.png",
    issues: [
      { id: 'sole-worn', label: "Sole Worn / Detached", hotspot: 'sole' },
      { id: 'heel-damaged', label: "Heel Damaged", hotspot: 'heel' },
      { id: 'zip-hardware', label: "Zip / Hardware Damage", hotspot: 'laces' },
      { id: 'stitching-undone', label: "Stitching Came Undone", hotspot: 'stitching' },
      { id: 'leather-cracked', label: "Leather Scratched / Cracked", hotspot: 'upper' },
      { id: 'color-fading', label: "Colour Restoration", hotspot: 'toe' },
      { id: 'insole-replace', label: "Insole Replacement", hotspot: 'insole' },
      { id: 'not-sure', label: "I'm Not Sure", hotspot: null }
    ]
  },
  {
    id: 'other',
    name: "Something Else?",
    desc: "Get a custom footwear assessment",
    img: "/shoerepair/SOMETHING ELSE.png",
    shoeGraphic: "/shoerepair/TransparentShoe.png",
    issues: [
      { id: 'sole-damage', label: "Sole Damage", hotspot: 'sole' },
      { id: 'stitching-damage', label: "Stitching Damage", hotspot: 'stitching' },
      { id: 'strap-hardware', label: "Strap / Hardware Damage", hotspot: 'laces' },
      { id: 'leather-fabric', label: "Leather / Fabric Damage", hotspot: 'upper' },
      { id: 'color-fading', label: "Colour Restoration", hotspot: 'toe' },
      { id: 'general-inspection', label: "General Inspection", hotspot: null },
      { id: 'not-sure', label: "I'm Not Sure", hotspot: null }
    ]
  }
];

export const ISSUE_SERVICE_MAP = {
  "Sole Worn / Detached": "sole-replacement",
  "Sole Damage": "sole-replacement",
  "Heel Damaged": "heel-repair",
  "Stitching Came Undone": "seam-repair",
  "Stitching Damage": "seam-repair",
  "Leather Scratched / Cracked": "leather-restoration",
  "Leather / Fabric Damage": "leather-restoration",
  "Colour Fading / Scuffing": "colour-restoration",
  "Colour Fading": "colour-restoration",
  "Colour Restoration": "colour-restoration",
  "Insole Replacement": "insole-replacement",
  "Footbed / Insole Damage": "insole-replacement",
  "Laces / Hardware Damage": "strap-buckle",
  "Strap / Buckle Damage": "strap-buckle",
  "Broken Strap / Buckle": "strap-buckle",
  "Strap / Hardware Damage": "strap-buckle",
  "Zip / Hardware Damage": "strap-buckle",
  "Sneaker Cleaning": "sneaker-cleaning",
  "Upper Damage": "leather-restoration",
  "General Inspection": "leather-restoration"
};

export const REPAIR_SERVICES = [
  {
    id: 'sole-replacement',
    name: "Sole Replacement",
    desc: "Replace worn, cracked or detached soles while preserving the original footwear structure.",
    price: "₹399",
    duration: "2–4 days",
    img: "/shoerepair/SOLE REPLACEMENT.png",
    whatsIncluded: [
      "Removal of damaged outer sole",
      "Midsole sanitation and leveling",
      "High-durability rubber or leather replacement",
      "Pressure-bonded stitching & welt finishing",
      "Complimentary edge burnishing"
    ],
    suitableFor: "Oxford shoes, loafers, dress boots, sneakers"
  },
  {
    id: 'heel-repair',
    name: "Heel Repair & Replacement",
    desc: "Repair worn heels, heel blocks and damaged heel tips.",
    price: "₹299",
    duration: "2–4 days",
    img: "/shoerepair/HEEL REPAIR.png",
    whatsIncluded: [
      "Top-lift / rubber tip replacement",
      "Stacked leather block rebuild",
      "Nailing and seamless adhesive bonding",
      "Precision height & balance calibration",
      "Edge staining and wax polish"
    ],
    suitableFor: "Formal shoes, high heels, ankle boots, Cuban heels"
  },
  {
    id: 'leather-restoration',
    name: "Leather Restoration",
    desc: "Deep conditioning, scratch correction and leather colour restoration.",
    price: "₹499",
    duration: "3–5 days",
    img: "/shoerepair/LEATHER REST0RATION.png",
    whatsIncluded: [
      "Gentle stripping of old wax and buildup",
      "Deep moisture infusion & pH balancing",
      "Scratch, crack & crease smoothing",
      "Hand-pigmented colour blending",
      "Waterproofing protective seal"
    ],
    suitableFor: "Full-grain, top-grain, calfskin and veg-tan footwear"
  },
  {
    id: 'seam-repair',
    name: "Stitching & Seam Repair",
    desc: "Restore loose or damaged seams with reinforced professional stitching.",
    price: "₹249",
    duration: "2–3 days",
    img: "/shoerepair/SEAM REPAIR.png",
    whatsIncluded: [
      "High-tensile waxed cobbler thread",
      "Matching stitch holes to preserve leather",
      "Double-stitched stress point reinforcements",
      "Lining & counter repair",
      "Clean hand-trimming"
    ],
    suitableFor: "Loafers, boots, dress shoes, sandals"
  },
  {
    id: 'strap-buckle',
    name: "Strap & Buckle Repair",
    desc: "Repair broken straps, buckles and closures for sandals and slippers.",
    price: "₹249",
    duration: "2–4 days",
    img: "/shoerepair/BUCKLE REPAIR.png",
    whatsIncluded: [
      "Hardware replacement (brass/silver/nickel)",
      "Leather strap splicing & reinforcement",
      "Elastic gore replacement",
      "Toe-post anchoring for sandals",
      "Hand-burnished edges"
    ],
    suitableFor: "Leather sandals, slippers, monk straps, gladiators"
  },
  {
    id: 'insole-replacement',
    name: "Insole Replacement",
    desc: "Replace worn insoles with comfortable premium options.",
    price: "₹349",
    duration: "2–4 days",
    img: "/shoerepair/INSOLE REPLACEMENT.png",
    whatsIncluded: [
      "Anti-microbial memory foam or genuine leather bed",
      "Shock-absorbing arch cushion support",
      "Custom trimming to footwear internal shape",
      "Full internal cavity sanitization",
      "Seamless fit guarantee"
    ],
    suitableFor: "Daily work shoes, walking sneakers, loafers"
  },
  {
    id: 'sneaker-cleaning',
    name: "Sneaker Deep Cleaning",
    desc: "Professional cleaning, stain removal and whitening.",
    price: "₹299",
    duration: "2–5 days",
    img: "/shoerepair/SNEAKERS DEEP CLEANING.png",
    whatsIncluded: [
      "Multi-material upper washing (leather, canvas, knit)",
      "Sole degreasing & de-yellowing treatment",
      "Lace soaking and sanitization",
      "Internal deodorizing & UV treatment",
      "Hydrophobic dirt-repellent spray"
    ],
    suitableFor: "Sneakers, sports trainers, canvas shoes"
  },
  {
    id: 'colour-restoration',
    name: "Colour Restoration",
    desc: "Restore faded leather/suede footwear colour.",
    price: "₹499",
    duration: "2–5 days",
    img: "/shoerepair/COLOUR RESTORATION.png",
    whatsIncluded: [
      "Deep color rejuvenation matching original shade",
      "Suede nap lifting & conditioning",
      "Fade & sunspot eradication",
      "Two-tone patina options available",
      "Non-transfer protective top coat"
    ],
    suitableFor: "Suede boots, dress shoes, luxury designer footwear"
  }
];

export const RESTORATION_TABS = [
  {
    id: 'formal-shoes',
    label: "Formal Shoes",
    modelName: "Classic Leather Oxford",
    beforeImg: "/shoerepair/BEFORE SHOE IMAGE.png",
    afterImg: "/shoerepair/AFTER SHOE IMAGE.png",
    duration: "Completed in 4 days",
    price: "₹1,299",
    checklist: [
      "Sole replacement",
      "Toe restoration",
      "Colour restoration",
      "Edge finishing",
      "Premium polishing"
    ],
    thumbs: [
      "/shoerepair/AFTER SHOE IMAGE.png",
      "/shoerepair/BEFORE SHOE IMAGE.png",
      "/shoerepair/SEAM REPAIR.png",
      "/shoerepair/LEATHER REST0RATION.png"
    ]
  },
  {
    id: 'sneakers',
    label: "Sneakers",
    modelName: "Heritage Leather Runner",
    beforeImg: "/shoerepair/BEFORE SHOE IMAGE.png",
    afterImg: "/shoerepair/SNEAKERS DEEP CLEANING.png",
    duration: "Completed in 3 days",
    price: "₹799",
    checklist: [
      "Deep upper cleaning",
      "Sole de-yellowing",
      "Insole sanitization",
      "Crease reduction",
      "Fresh lace replacement"
    ],
    thumbs: [
      "/shoerepair/SNEAKERS DEEP CLEANING.png",
      "/shoerepair/SNEAKERS.png",
      "/shoerepair/INSOLE REPLACEMENT.png",
      "/shoerepair/SOLE REPLACEMENT.png"
    ]
  },
  {
    id: 'sandals',
    label: "Sandals",
    modelName: "Handcrafted Leather Sandal",
    beforeImg: "/shoerepair/BEFORE SHOE IMAGE.png",
    afterImg: "/shoerepair/SANDALS.png",
    duration: "Completed in 2 days",
    price: "₹649",
    checklist: [
      "Strap re-anchoring",
      "Buckle replacement",
      "Leather footbed conditioning",
      "Non-slip grip addition",
      "Edge waxing"
    ],
    thumbs: [
      "/shoerepair/SANDALS.png",
      "/shoerepair/BUCKLE REPAIR.png",
      "/shoerepair/SEAM REPAIR.png",
      "/shoerepair/AFTER SHOE IMAGE.png"
    ]
  },
  {
    id: 'boots',
    label: "Boots",
    modelName: "Rugged Chelsea Boot",
    beforeImg: "/shoerepair/BEFORE SHOE IMAGE.png",
    afterImg: "/shoerepair/BOOTS.png",
    duration: "Completed in 5 days",
    price: "₹1,499",
    checklist: [
      "Lugged sole replacement",
      "Elastic gusset repair",
      "Deep moisture treatment",
      "Welt re-stitching",
      "Weatherproof protection"
    ],
    thumbs: [
      "/shoerepair/BOOTS.png",
      "/shoerepair/HEEL REPAIR.png",
      "/shoerepair/LEATHER REST0RATION.png",
      "/shoerepair/AFTER SHOE IMAGE.png"
    ]
  }
];

export const CUSTOMER_STORIES = [
  {
    name: "Priya D.",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    shoeThumb: "/shoerepair/MENS SHOE.png",
    quote: "My favourite leather shoes looked completely worn out. They came back looking almost new."
  },
  {
    name: "Rahul K.",
    city: "Hyderabad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    shoeThumb: "/shoerepair/HEEL REPAIR.png",
    quote: "The sole had completely separated from my formal shoes. Excellent repair and pickup service."
  },
  {
    name: "Meera R.",
    city: "Chennai",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    shoeThumb: "/shoerepair/SANDALS.png",
    quote: "My old leather sandals had damaged straps and faded colour. Beautiful restoration."
  }
];

export const EXTENDED_CUSTOMER_STORIES = [
  ...CUSTOMER_STORIES,
  {
    name: "Vikram S.",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    shoeThumb: "/shoerepair/SEAM REPAIR.png",
    quote: "Saved my handcrafted Oxford brogues! The welt stitching and edge burnishing is world class cobbler work."
  },
  {
    name: "Ananya M.",
    city: "Pune",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    shoeThumb: "/shoerepair/SNEAKERS DEEP CLEANING.png",
    quote: "Sneaker deep cleaning and sole de-yellowing made my white designer trainers look fresh out of the box."
  },
  {
    name: "Rohan G.",
    city: "Delhi NCR",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80",
    shoeThumb: "/shoerepair/BOOTS.png",
    quote: "Chelsea boots sole replacement and deep hydration restored the supple leather texture completely."
  }
];

export const NEARBY_FOOTWEAR_SPECIALISTS = [
  {
    id: 'tailor-1',
    name: 'Master Rajesh Kumar',
    studio: 'Royal Footwear & Cobbler Atelier',
    neighborhood: 'Indiranagar 100ft Rd',
    distanceKm: 1.2,
    rating: 4.9,
    reviewsCount: 184,
    specialty: 'Master Cordwainer & Luxury Footwear Restorer',
    experienceYears: 16,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    lat: 12.9784,
    lng: 77.6408,
    phone: '+91 98450 12345',
    turnaround: '2-3 Business Days'
  },
  {
    id: 'tailor-2',
    name: 'Vikram Singh',
    studio: 'Heritage Cobbler Works',
    neighborhood: 'Koramangala 5th Block',
    distanceKm: 2.1,
    rating: 4.8,
    reviewsCount: 128,
    specialty: 'Sole Replacement & Goodyear Welt Specialist',
    experienceYears: 14,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    lat: 12.9352,
    lng: 77.6245,
    phone: '+91 98451 67890',
    turnaround: '3-4 Business Days'
  },
  {
    id: 'tailor-3',
    name: 'Ananya Sen',
    studio: 'Elite Sneaker & Boot Atelier',
    neighborhood: 'MG Road Atelier',
    distanceKm: 3.4,
    rating: 5.0,
    reviewsCount: 96,
    specialty: 'Sneaker De-yellowing & Suede Restoration',
    experienceYears: 9,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    lat: 12.9756,
    lng: 77.6067,
    phone: '+91 98452 11223',
    turnaround: '2-4 Business Days'
  }
];

const DRAFT_STORAGE_KEY = 'stitchbeez_footwear_repair_draft';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ShoesRepairRestore({
  currentUser,
  theme,
  setTheme,
  onSwitchMode,
  onNavigateHome,
  onNavigateCategory,
  onOpenAuthModal
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Try to load initial draft safely from sessionStorage
  const initialDraft = useMemo(() => {
    try {
      const stored = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return (parsed && typeof parsed === 'object') ? parsed : null;
    } catch (e) {
      return null;
    }
  }, []);

  // 1. Central Category State
  const [selectedCatId, setSelectedCatId] = useState(
    initialDraft?.selectedCatId || 'mens-shoes'
  );
  const currentCategory = useMemo(() => {
    return FOOTWEAR_CATEGORIES.find(c => c.id === selectedCatId) || FOOTWEAR_CATEGORIES[0];
  }, [selectedCatId]);

  // 2. Active Hotspot & Selected Issue
  const [activeHotspot, setActiveHotspot] = useState(
    initialDraft?.activeHotspot || 'upper'
  );
  const [selectedIssueLabel, setSelectedIssueLabel] = useState(
    initialDraft?.selectedIssueLabel || "Leather Scratched / Cracked"
  );

  // 3. Selected Repair Services (multi-select)
  const [selectedServiceIds, setSelectedServiceIds] = useState(
    initialDraft?.selectedServiceIds || ['leather-restoration']
  );

  // 4. Modals State
  const [activeModalService, setActiveModalService] = useState(null);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  // 5. Before & After Comparison Slider State
  const [comparePos, setComparePos] = useState(50);
  const [activeRestorationTab, setActiveRestorationTab] = useState(
    initialDraft?.activeRestorationTab || 'formal-shoes'
  );
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const currentRestoration = useMemo(() => {
    return RESTORATION_TABS.find(t => t.id === activeRestorationTab) || RESTORATION_TABS[0];
  }, [activeRestorationTab]);
  const compareContainerRef = useRef(null);
  const isDraggingRef = useRef(false);

  // 6. Assessment Stepper State (1: Item -> 2: Damage -> 3: Photos -> 4: Nearby Tailor -> 5: Pickup)
  const [assessmentStep, setAssessmentStep] = useState(() => {
    const s = initialDraft?.assessmentStep;
    return (typeof s === 'number' && s >= 1 && s <= 5) ? s : 1;
  });
  const [assessmentItem, setAssessmentItem] = useState(
    initialDraft?.assessmentItem || "Men's Shoes"
  );
  const [assessmentDamages, setAssessmentDamages] = useState(
    initialDraft?.assessmentDamages || ["Leather Scratched / Cracked"]
  );
  const [assessmentPhotos, setAssessmentPhotos] = useState([]); // File previews
  const [photoError, setPhotoError] = useState('');

  // Step 4: Nearby Tailor & Live Radar State
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [tailorMatchingStatus, setTailorMatchingStatus] = useState('searching'); // 'searching' | 'accepted'
  const [countdownSeconds, setCountdownSeconds] = useState(3);
  const [assignedTailor, setAssignedTailor] = useState(NEARBY_FOOTWEAR_SPECIALISTS[0]);
  const activeSpecialist = assignedTailor || NEARBY_FOOTWEAR_SPECIALISTS[0];

  // 7. Pickup Form State (Step 5)
  const todayISO = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [pickupForm, setPickupForm] = useState(
    initialDraft?.pickupForm || {
      name: currentUser?.name || 'Aarav Mehta',
      phone: currentUser?.phone || '9845012345',
      address: currentUser?.address || 'Apartment 204, Royal Palms, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
      date: todayISO,
      timeSlot: '10:00 AM - 01:00 PM',
      notes: 'Please bring protective covers for delicate footwear.'
    }
  );
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [bookingRefNum, setBookingRefNum] = useState('');

  // Step 4: Tailor matching timer simulation
  useEffect(() => {
    if (assessmentStep === 4) {
      if (tailorMatchingStatus === 'searching') {
        setCountdownSeconds(3);
        const timerInterval = setInterval(() => {
          setCountdownSeconds(prev => {
            if (prev <= 1) {
              clearInterval(timerInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        const matchTimer = setTimeout(() => {
          setTailorMatchingStatus('accepted');
          setAssignedTailor(NEARBY_FOOTWEAR_SPECIALISTS[0]);
        }, 2800);

        return () => {
          clearInterval(timerInterval);
          clearTimeout(matchTimer);
        };
      }
    }
  }, [assessmentStep, tailorMatchingStatus]);

  // Step 4: Safe Leaflet Map initialization and cleanup
  useEffect(() => {
    if (assessmentStep !== 4) {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
      return;
    }

    let isMounted = true;
    const timer = setTimeout(() => {
      if (!isMounted || !mapContainerRef.current) return;
      try {
        if (typeof window !== 'undefined' && window.L) {
          const container = mapContainerRef.current;
          if (mapInstanceRef.current) {
            try {
              mapInstanceRef.current.remove();
            } catch (e) {}
            mapInstanceRef.current = null;
          }
          if (container._leaflet_id) {
            try {
              delete container._leaflet_id;
            } catch (e) {}
          }

          const map = window.L.map(container, {
            zoomControl: true,
            scrollWheelZoom: false
          }).setView([12.965, 77.625], 13);

          window.L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; Google Maps'
          }).addTo(map);

          // User GPS marker
          const userPin = window.L.divIcon({
            html: `
              <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
                <div style="position: absolute; width: 28px; height: 28px; border-radius: 50%; background: rgba(255, 22, 120, 0.4); animation: srPulse 1.8s infinite;"></div>
                <div style="position: relative; width: 14px; height: 14px; border-radius: 50%; background: #FF1678; border: 2.5px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>
              </div>
            `,
            className: 'user-repair-gps-pulse',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
          });

          window.L.marker([12.965, 77.625], { icon: userPin })
            .addTo(map)
            .bindPopup('<strong>📍 Your Location</strong><br><span style="font-size:11px;color:#667085;">Doorstep Pickup Origin</span>');

          // Nearby Specialists
          NEARBY_FOOTWEAR_SPECIALISTS.forEach(t => {
            const isSelected = t.id === 'tailor-1';
            const tailorIcon = window.L.divIcon({
              html: `
                <div style="cursor: pointer; display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
                  <div style="
                    width: 38px; 
                    height: 38px; 
                    border-radius: 50%; 
                    border: 2.5px solid ${isSelected ? '#FF1678' : '#10B981'}; 
                    background: #ffffff; 
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                  ">
                    <img src="${t.avatar}" style="width: 100%; height: 100%; object-fit: cover;" alt="${t.name}" />
                  </div>
                  <div style="
                    background: ${isSelected ? '#FF1678' : '#10B981'};
                    color: #ffffff;
                    font-size: 10px;
                    font-weight: bold;
                    padding: 2px 6px;
                    border-radius: 4px;
                    margin-top: -4px;
                    white-space: nowrap;
                  ">
                    ${t.name.split(' ')[1] || t.name} • ${t.distanceKm}km
                  </div>
                </div>
              `,
              className: `tailor-marker-${t.id}`,
              iconSize: [42, 48],
              iconAnchor: [21, 48]
            });

            const marker = window.L.marker([t.lat, t.lng], { icon: tailorIcon }).addTo(map);
            marker.bindPopup(`
              <div style="padding:4px;font-family:sans-serif;">
                <strong style="font-size:13px;color:#111827;">${t.name}</strong><br>
                <span style="font-size:11px;color:#667085;">${t.studio}</span><br>
                <span style="font-size:11px;color:#F59E0B;font-weight:700;">★ ${t.rating}</span>
                <span style="font-size:11px;color:#667085;">(${t.reviewsCount} reviews) • ${t.distanceKm} km away</span>
              </div>
            `);

            if (isSelected) {
              setTimeout(() => {
                if (isMounted) {
                  try { marker.openPopup(); } catch (e) {}
                }
              }, 400);
            }
          });

          mapInstanceRef.current = map;
        }
      } catch (err) {
        console.warn('Map initialization safely handled:', err);
      }
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, [assessmentStep]);

  // Synchronize URL query params if present (?category=... or ?service=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('category');
    if (catParam) {
      const match = FOOTWEAR_CATEGORIES.find(c => c.id === catParam);
      if (match) {
        setSelectedCatId(match.id);
        setAssessmentItem(match.name);
      }
    }
    const srvParam = params.get('service');
    if (srvParam) {
      if (!selectedServiceIds.includes(srvParam)) {
        setSelectedServiceIds(prev => [...prev, srvParam]);
      }
    }
  }, [location.search]);

  // Persist draft to sessionStorage on state changes
  useEffect(() => {
    if (!submissionComplete) {
      const draft = {
        selectedCatId,
        activeHotspot,
        selectedIssueLabel,
        selectedServiceIds,
        activeRestorationTab,
        assessmentStep,
        assessmentItem,
        assessmentDamages,
        pickupForm
      };
      try {
        sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      } catch (e) {
        // Ignore
      }
    }
  }, [
    selectedCatId,
    activeHotspot,
    selectedIssueLabel,
    selectedServiceIds,
    activeRestorationTab,
    assessmentStep,
    assessmentItem,
    assessmentDamages,
    pickupForm,
    submissionComplete
  ]);

  // Body scroll lock when modals are open
  useEffect(() => {
    if (activeModalService || isReviewsModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalService, isReviewsModalOpen]);

  // ESC key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalService(null);
        setIsReviewsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Primary recommended service ID derived from selected issue
  const primaryRecommendedServiceId = useMemo(() => {
    return ISSUE_SERVICE_MAP[selectedIssueLabel] || 'leather-restoration';
  }, [selectedIssueLabel]);

  // Ordered services with the recommended service sorted to the top
  const orderedServices = useMemo(() => {
    const primary = REPAIR_SERVICES.find(s => s.id === primaryRecommendedServiceId);
    const rest = REPAIR_SERVICES.filter(s => s.id !== primaryRecommendedServiceId);
    return primary ? [primary, ...rest] : REPAIR_SERVICES;
  }, [primaryRecommendedServiceId]);

  // Category Selection Handler
  const handleSelectCategory = (catId) => {
    setSelectedCatId(catId);
    const cat = FOOTWEAR_CATEGORIES.find(c => c.id === catId);
    if (cat) {
      setAssessmentItem(cat.name);
      if (cat.issues && cat.issues.length > 0) {
        const firstIssue = cat.issues[0];
        setSelectedIssueLabel(firstIssue.label);
        if (firstIssue.hotspot) {
          setActiveHotspot(firstIssue.hotspot);
        }
        setAssessmentDamages([firstIssue.label]);
      }
      // Sync restoration tab
      if (catId === 'sneakers') {
        setActiveRestorationTab('sneakers');
      } else if (catId === 'sandals-slippers') {
        setActiveRestorationTab('sandals');
      } else if (catId === 'boots') {
        setActiveRestorationTab('boots');
      } else {
        setActiveRestorationTab('formal-shoes');
      }
    }
    try {
      const url = new URL(window.location);
      url.searchParams.set('category', catId);
      window.history.replaceState({}, '', url);
    } catch (e) {
      // Ignore
    }
    scrollToSection('sr-attention-section');
  };

  // Hotspot Click Handler
  const handleHotspotClick = (hotspotKey) => {
    setActiveHotspot(hotspotKey);
    const matchedIssue = currentCategory.issues.find(i => i.hotspot === hotspotKey);
    if (matchedIssue) {
      setSelectedIssueLabel(matchedIssue.label);
      if (!assessmentDamages.includes(matchedIssue.label)) {
        setAssessmentDamages(prev => [...prev, matchedIssue.label]);
      }
    }
  };

  // Issue Row Click Handler
  const handleIssueClick = (issue) => {
    setSelectedIssueLabel(issue.label);
    if (issue.hotspot) {
      setActiveHotspot(issue.hotspot);
    }
    if (!assessmentDamages.includes(issue.label)) {
      setAssessmentDamages(prev => [...prev, issue.label]);
    }
  };

  // Service toggle selection
  const handleToggleService = (serviceId) => {
    const isAdding = !selectedServiceIds.includes(serviceId);
    setSelectedServiceIds(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });

    if (isAdding) {
      scrollToSection('sr-assessment-section');
    }
  };

  // Comparison slider mouse / touch drag handlers
  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !compareContainerRef.current) return;
    const rect = compareContainerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setComparePos(percent);
  };

  useEffect(() => {
    const onWindowMove = (e) => handleMouseMove(e);
    const onWindowUp = () => handleMouseUp();
    window.addEventListener('mousemove', onWindowMove);
    window.addEventListener('mouseup', onWindowUp);
    window.addEventListener('touchmove', onWindowMove);
    window.addEventListener('touchend', onWindowUp);
    return () => {
      window.removeEventListener('mousemove', onWindowMove);
      window.removeEventListener('mouseup', onWindowUp);
      window.removeEventListener('touchmove', onWindowMove);
      window.removeEventListener('touchend', onWindowUp);
    };
  }, []);

  // Keyboard navigation for comparison slider
  const handleSliderKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setComparePos(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setComparePos(prev => Math.min(100, prev + 5));
    }
  };

  // Photo Uploader handlers
  const handleFileDrop = (e) => {
    e.preventDefault();
    setPhotoError('');
    const files = Array.from(e.dataTransfer?.files || e.target?.files || []);
    if (files.length === 0) return;

    const validFiles = [];
    for (const f of files) {
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(f.type)) {
        setPhotoError('Please upload image files in JPG, PNG, or WEBP format.');
        continue;
      }
      if (f.size > 10 * 1024 * 1024) {
        setPhotoError('Each image must be under 10MB.');
        continue;
      }
      validFiles.push(f);
    }

    const availableSlots = 4 - assessmentPhotos.length;
    if (availableSlots <= 0) {
      setPhotoError('You can upload up to 4 photos maximum.');
      return;
    }

    const newPhotos = validFiles.slice(0, availableSlots).map(f => ({
      name: f.name,
      size: (f.size / 1024).toFixed(0) + ' KB',
      url: URL.createObjectURL(f)
    }));
    setAssessmentPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleRemovePhoto = (index) => {
    setAssessmentPhotos(prev => {
      const removed = prev[index];
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return prev.filter((_, idx) => idx !== index);
    });
  };

  // Pickup Form Validation
  const validatePickupForm = () => {
    const errors = {};
    if (!pickupForm.name.trim()) errors.name = 'Full name is required';
    
    // Indian Phone validation: 10 digits
    const cleanedPhone = pickupForm.phone.replace(/\D/g, '');
    if (!cleanedPhone) {
      errors.phone = 'Phone number is required';
    } else if (cleanedPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!pickupForm.address.trim()) errors.address = 'Doorstep pickup address is required';
    
    // 6-digit Pincode validation
    const cleanedPin = (pickupForm.pincode || '').replace(/\D/g, '');
    if (!cleanedPin) {
      errors.pincode = 'PIN code is required';
    } else if (!/^[1-9][0-9]{5}$/.test(cleanedPin)) {
      errors.pincode = 'Please enter a valid 6-digit Indian PIN code';
    }

    if (!pickupForm.date) errors.date = 'Preferred pickup date is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Assessment form submission
  const handleSubmitAssessment = (e) => {
    e.preventDefault();
    if (!validatePickupForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
      const generatedRef = `SBR-${randomCode}`;
      setBookingRefNum(generatedRef);
      setIsSubmitting(false);
      setSubmissionComplete(true);
      try {
        sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch (err) {
        // Ignore
      }
    }, 1200);
  };

  return (
    <div className={`sr-page ${theme === 'dark' ? 'dark' : ''}`}>

      {/* ====================================================================
          SECTION 1: HERO / FOOTWEAR ATELIER (Faded Panorama & Floating Assessment)
          ==================================================================== */}
      <section className="sr-hero-banner-section">
        <div className="sr-hero-banner-wrapper">

          {/* Right Photographic Image with Leftward Gradient Fade */}
          <div className="sr-hero-photo-layer">
            <img 
              src="/shoerepair/HERO.png" 
              alt="StitchBeez Footwear Repair Artisan" 
              className="sr-hero-photo-img"
              loading="eager"
            />
            <div className="sr-hero-fade-overlay" />
          </div>

          {/* Floating Assessment Card (over top-right photo) */}
          <div className="sr-hero-float-card">
            <div className="sr-float-icon-wrap">
              <Camera size={22} />
            </div>
            <h4 className="sr-float-title">Complimentary Assessment</h4>
            <p className="sr-float-desc">
              Upload 2–4 photos and receive a repair estimate.
            </p>
            <button 
              className="sr-float-btn"
              onClick={() => {
                scrollToSection('sr-assessment-section');
                if (assessmentItem && assessmentDamages.length > 0) {
                  setAssessmentStep(3);
                } else {
                  setAssessmentStep(1);
                }
              }}
            >
              Upload Photos →
            </button>
          </div>

          {/* Left Content */}
          <div className="sr-hero-content-left">
            <span className="sr-eyebrow">STITCHBEEZ FOOTWEAR ATELIER</span>
            <h1 className="sr-hero-title">
              Restore Every Step.<br />
              <span className="sr-hero-title-accent">Walk in Them Again.</span>
            </h1>
            <p className="sr-hero-desc">
              Expert repair and restoration for shoes, sandals, slippers, boots and premium leather footwear. 
              From worn soles and broken straps to complete leather restoration, StitchBeez connects you with verified footwear specialists.
            </p>

            {/* Feature Badges */}
            <div className="sr-hero-badges-row">
              <div className="sr-hero-badge-item">
                <div className="sr-hero-badge-circle">
                  <ShieldCheck size={16} />
                </div>
                <div className="sr-hero-badge-label">
                  <span>Verified</span>
                  <span>Footwear Specialists</span>
                </div>
              </div>
              <div className="sr-hero-badge-item">
                <div className="sr-hero-badge-circle">
                  <Truck size={16} />
                </div>
                <div className="sr-hero-badge-label">
                  <span>Doorstep</span>
                  <span>Pickup</span>
                </div>
              </div>
              <div className="sr-hero-badge-item">
                <div className="sr-hero-badge-circle">
                  <Award size={16} />
                </div>
                <div className="sr-hero-badge-label">
                  <span>Repair</span>
                  <span>Warranty</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sr-hero-actions">
              <button 
                className="sr-btn-primary"
                onClick={() => {
                  scrollToSection('sr-assessment-section');
                  setAssessmentStep(1);
                }}
              >
                Start a Repair →
              </button>
              <button 
                className="sr-btn-secondary sr-btn-explore"
                onClick={() => scrollToSection('sr-services-section')}
              >
                Explore Services
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 2: WHAT WOULD YOU LIKE US TO RESTORE? (6 Categories)
          ==================================================================== */}
      <section className="sr-category-section" id="sr-categories">
        <div className="sr-container">
          <span className="sr-eyebrow">OUR EXPERTISE</span>
          <h2 className="sr-heading">What would you like us to restore?</h2>
          <p className="sr-subtitle">Choose your footwear type to see available restoration services.</p>

          <div className="sr-category-grid">
            {FOOTWEAR_CATEGORIES.map(cat => {
              const isSelected = cat.id === selectedCatId;
              return (
                <div 
                  key={cat.id}
                  className={`sr-category-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectCategory(cat.id)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectCategory(cat.id);
                    }
                  }}
                >
                  <div className="sr-cat-img-box">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="sr-cat-img" 
                      loading="lazy" 
                    />
                  </div>
                  <h3 className="sr-cat-name">{cat.name}</h3>
                  <p className="sr-cat-desc">{cat.desc}</p>
                  <div className="sr-cat-footer">
                    <div className="sr-cat-circle-btn">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: WHAT NEEDS ATTENTION? (Transparent Footwear Anatomy)
          ==================================================================== */}
      <section className="sr-attention-section" id="sr-attention-section">
        <div className="sr-container">
          <div className="sr-attention-box">
            
            <div className="sr-attention-grid">
              {/* Left: Shoe Graphic with Hotspots */}
              <div className="sr-attention-left">
                <span className="sr-eyebrow">YOUR FOOTWEAR</span>
                <h2 className="sr-heading">What needs attention?</h2>
                <p className="sr-subtitle">
                  Tap an area on the shoe or select the issue for <strong>{currentCategory.name}</strong>.
                </p>

                <div className="sr-shoe-interactive-wrap">
                  <img 
                    src={currentCategory.shoeGraphic || "/shoerepair/TransparentShoe.png"} 
                    alt="Footwear Restoration Anatomy" 
                    className="sr-shoe-main-img"
                  />

                  {/* Hotspot: HEEL */}
                  <button 
                    type="button"
                    className={`sr-hotspot heel ${activeHotspot === 'heel' ? 'active' : ''}`}
                    onClick={() => handleHotspotClick('heel')}
                    title="Heel"
                  >
                    <span className="sr-hotspot-label">HEEL</span>
                    <div className="sr-hotspot-dot" />
                  </button>

                  {/* Hotspot: INSOLE */}
                  <button 
                    type="button"
                    className={`sr-hotspot insole-arch ${activeHotspot === 'insole' ? 'active' : ''}`}
                    onClick={() => handleHotspotClick('insole')}
                    title="Insole"
                  >
                    <div className="sr-hotspot-dot" />
                    <span className="sr-hotspot-label">INSOLE</span>
                  </button>

                  {/* Hotspot: STITCHING */}
                  <button 
                    type="button"
                    className={`sr-hotspot stitching ${activeHotspot === 'stitching' ? 'active' : ''}`}
                    onClick={() => handleHotspotClick('stitching')}
                    title="Welt Stitching"
                  >
                    <span className="sr-hotspot-label">STITCHING</span>
                    <div className="sr-hotspot-dot" />
                  </button>

                  {/* Hotspot: SOLE */}
                  <button 
                    type="button"
                    className={`sr-hotspot sole ${activeHotspot === 'sole' ? 'active' : ''}`}
                    onClick={() => handleHotspotClick('sole')}
                    title="Sole"
                  >
                    <div className="sr-hotspot-dot" />
                    <span className="sr-hotspot-label">SOLE</span>
                  </button>

                  {/* Hotspot: LACES / HARDWARE */}
                  <button 
                    type="button"
                    className={`sr-hotspot laces ${activeHotspot === 'laces' ? 'active' : ''}`}
                    onClick={() => handleHotspotClick('laces')}
                    title="Laces & Hardware"
                  >
                    <span className="sr-hotspot-label">LACES / HARDWARE</span>
                    <div className="sr-hotspot-dot" />
                  </button>

                  {/* Hotspot: UPPER */}
                  <button 
                    type="button"
                    className={`sr-hotspot upper ${activeHotspot === 'upper' ? 'active' : ''}`}
                    onClick={() => handleHotspotClick('upper')}
                    title="Upper Leather"
                  >
                    <div className="sr-hotspot-dot" />
                    <span className="sr-hotspot-label">UPPER</span>
                  </button>

                  {/* Hotspot: TOE */}
                  <button 
                    type="button"
                    className={`sr-hotspot toe ${activeHotspot === 'toe' ? 'active' : ''}`}
                    onClick={() => handleHotspotClick('toe')}
                    title="Toe Cap"
                  >
                    <div className="sr-hotspot-dot" />
                    <span className="sr-hotspot-label">TOE</span>
                  </button>
                </div>
              </div>

              {/* Right: Common Issues List (Updates with current category) */}
              <div className="sr-attention-right">
                <div className="sr-issues-panel">
                  <h4 className="sr-issues-title">Or choose from common issues:</h4>
                  <div className="sr-issues-list">
                    {currentCategory.issues.map(issue => {
                      const isActive = issue.label === selectedIssueLabel;
                      return (
                        <div 
                          key={issue.id}
                          className={`sr-issue-row ${isActive ? 'active' : ''}`}
                          onClick={() => handleIssueClick(issue)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleIssueClick(issue);
                            }
                          }}
                        >
                          <div className={`sr-issue-glyph ${isActive ? 'active' : ''}`}>
                            {isActive ? (
                              <div className="sr-glyph-dot-selected" />
                            ) : (
                              <div className="sr-glyph-dot-unselected" />
                            )}
                          </div>
                          <span className="sr-issue-label">{issue.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: RECOMMENDED SERVICES (Prioritized by Category & Issue)
          ==================================================================== */}
      <section className="sr-services-section" id="sr-services-section">
        <div className="sr-container">
          <span className="sr-eyebrow">POPULAR SERVICES</span>
          <h2 className="sr-heading">Recommended for Your Footwear</h2>
          <p className="sr-subtitle">
            Our most requested footwear restoration services with transparent starting prices.
          </p>

          <div className="sr-services-grid">
            {orderedServices.map(service => {
              const isSelected = selectedServiceIds.includes(service.id);
              const isRecommended = service.id === primaryRecommendedServiceId;
              return (
                <div 
                  key={service.id}
                  className={`sr-service-card ${isSelected ? 'selected' : ''}`}
                >
                  {isRecommended && (
                    <div className="sr-recommended-badge">
                      Recommended
                    </div>
                  )}

                  <div className="sr-service-img-box">
                    <img 
                      src={service.img} 
                      alt={service.name} 
                      className="sr-service-img"
                      loading="lazy" 
                    />
                  </div>

                  <h3 className="sr-service-name">{service.name}</h3>
                  <p className="sr-service-desc">{service.desc}</p>

                  <div className="sr-service-pricing-row">
                    <div className="sr-service-price-block">
                      <span className="sr-service-label">Starting from</span>
                      <span className="sr-service-price">{service.price}</span>
                    </div>
                    <div className="sr-service-duration">
                      <Clock size={13} /> {service.duration}
                    </div>
                  </div>

                  <div className="sr-service-actions">
                    <button 
                      className="sr-btn-details"
                      onClick={() => setActiveModalService(service)}
                    >
                      View Details
                    </button>
                    <button 
                      className={`sr-btn-select ${isSelected ? 'active' : ''}`}
                      onClick={() => handleToggleService(service.id)}
                    >
                      {isSelected ? "✓ Selected" : "Select Repair"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: REAL RESTORATIONS / CRAFTSMANSHIP YOU CAN SEE
          ==================================================================== */}
      <section className="sr-real-section" id="sr-real-section">
        <div className="sr-container">
          <span className="sr-eyebrow">REAL RESTORATIONS</span>
          <h2 className="sr-heading">Craftsmanship You Can See.</h2>
          <p className="sr-subtitle">
            Actual footwear restored by our verified StitchBeez specialists.
          </p>

          <div className="sr-real-grid">
            
            {/* Left: Comparison Slider + Category Tabs */}
            <div className="sr-real-left">
              <div 
                className="sr-compare-container"
                ref={compareContainerRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                tabIndex={0}
                role="slider"
                aria-valuenow={comparePos}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Before and after restoration image comparison slider"
                onKeyDown={handleSliderKeyDown}
              >
                {/* Before Image (Base Layer) */}
                <div className="sr-compare-img-layer">
                  <img 
                    src={currentRestoration.beforeImg} 
                    alt="Footwear before restoration" 
                  />
                  <div className="sr-badge-before">BEFORE</div>
                </div>

                {/* After Image (Clipped Overlay) */}
                <div 
                  className="sr-compare-after-layer"
                  style={{ clipPath: `inset(0 0 0 ${comparePos}%)` }}
                >
                  <img 
                    src={currentRestoration.thumbs[activeThumbIndex] || currentRestoration.afterImg} 
                    alt="Footwear after restoration" 
                  />
                  <div className="sr-badge-after">AFTER</div>
                </div>

                {/* Draggable Divider Handle */}
                <div 
                  className="sr-compare-divider"
                  style={{ left: `${comparePos}%` }}
                >
                  <div className="sr-compare-handle">
                    <ChevronLeft size={12} />
                    <ChevronRight size={12} />
                  </div>
                </div>
              </div>

              {/* Tabs below comparison */}
              <div className="sr-real-tabs">
                {RESTORATION_TABS.map(tab => (
                  <button 
                    key={tab.id}
                    className={`sr-real-tab ${tab.id === activeRestorationTab ? 'active' : ''}`}
                    onClick={() => {
                      setActiveRestorationTab(tab.id);
                      setActiveThumbIndex(0);
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Info Card & Vertical Thumbnail Strip */}
            <div className="sr-real-right">
              <div className="sr-real-card-wrap">
                
                {/* Details Card */}
                <div className="sr-real-card">
                  <h3 className="sr-real-model-name">{currentRestoration.modelName}</h3>
                  
                  <ul className="sr-real-checklist">
                    {currentRestoration.checklist.map((item, idx) => (
                      <li key={idx} className="sr-real-check-item">
                        <span className="sr-real-check-icon">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="sr-real-time-badge">
                    <Calendar size={14} /> {currentRestoration.duration}
                  </div>

                  <h2 className="sr-real-price">{currentRestoration.price}</h2>
                </div>

                {/* Vertical Thumbnails */}
                <div className="sr-real-thumbs">
                  {currentRestoration.thumbs.map((thumb, idx) => (
                    <div 
                      key={idx} 
                      className={`sr-real-thumb-box ${idx === activeThumbIndex ? 'active' : ''}`}
                      onClick={() => setActiveThumbIndex(idx)}
                      role="button"
                      tabIndex={0}
                      title="View stage"
                    >
                      <img 
                        src={thumb} 
                        alt="Stage view" 
                        className="sr-real-thumb-img" 
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 6 & 7: THE STITCHBEEZ STANDARD & HOW IT WORKS (Side-by-Side)
          ==================================================================== */}
      <section className="sr-standard-how-section">
        <div className="sr-container">
          <div className="sr-standard-how-grid">
            
            {/* Left: StitchBeez Standard */}
            <div className="sr-standard-box">
              <span className="sr-eyebrow">THE STITCHBEEZ STANDARD</span>
              <h2 className="sr-heading" style={{ fontSize: '1.95rem' }}>
                Restored by Specialists.<br />Protected by StitchBeez.
              </h2>

              <div className="sr-standard-benefits-grid">
                <div className="sr-benefit-item">
                  <div className="sr-benefit-icon-box">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4 className="sr-benefit-title">Specialist Matching</h4>
                    <p className="sr-benefit-desc">
                      Your footwear is matched with craftspeople experienced in the required repair.
                    </p>
                  </div>
                </div>

                <div className="sr-benefit-item">
                  <div className="sr-benefit-icon-box">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="sr-benefit-title">Transparent Assessment</h4>
                    <p className="sr-benefit-desc">
                      Receive the estimated repair scope and price before restoration begins.
                    </p>
                  </div>
                </div>

                <div className="sr-benefit-item">
                  <div className="sr-benefit-icon-box">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h4 className="sr-benefit-title">Doorstep Logistics</h4>
                    <p className="sr-benefit-desc">
                      Secure pickup and delivery without visiting a workshop.
                    </p>
                  </div>
                </div>

                <div className="sr-benefit-item">
                  <div className="sr-benefit-icon-box">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="sr-benefit-title">Repair Guarantee</h4>
                    <p className="sr-benefit-desc">
                      Eligible workmanship is covered under the StitchBeez repair warranty.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: How It Works */}
            <div className="sr-how-box">
              <span className="sr-eyebrow">HOW IT WORKS</span>
              <h2 className="sr-heading" style={{ fontSize: '1.95rem' }}>
                A Simple 4-Step Journey.
              </h2>

              <div className="sr-how-timeline">
                
                <div className="sr-how-step">
                  <div className="sr-how-icon-box">
                    <Camera size={18} />
                  </div>
                  <h4 className="sr-how-title">1. Upload Photos</h4>
                  <p className="sr-how-desc">Show us what needs attention.</p>
                </div>

                <div className="sr-how-step">
                  <div className="sr-how-icon-box">
                    <Award size={18} />
                  </div>
                  <h4 className="sr-how-title">2. Assessment & Quote</h4>
                  <p className="sr-how-desc">We inspect the damage and provide pricing.</p>
                </div>

                <div className="sr-how-step">
                  <div className="sr-how-icon-box">
                    <Wrench size={18} />
                  </div>
                  <h4 className="sr-how-title">3. Restored by Specialist</h4>
                  <p className="sr-how-desc">Your footwear is professionally repaired.</p>
                </div>

                <div className="sr-how-step">
                  <div className="sr-how-icon-box">
                    <Truck size={18} />
                  </div>
                  <h4 className="sr-how-title">4. Returned to You</h4>
                  <p className="sr-how-desc">Your restored pair arrives at your doorstep.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 8: GET YOUR FOOTWEAR ASSESSED (5-Step Wizard with Nearby Tailor)
          ==================================================================== */}
      <section className="sr-assessment-section" id="sr-assessment-section">
        <div className="sr-container">
          <div className="sr-assessment-card-wrapper">
            
            {/* Left Photo layer with smooth rightward fade */}
            <div className="sr-assessment-photo-layer">
              <img 
                src="/shoerepair/GET YOUR FOOTWEAR IMAGE.png" 
                alt="Artisan Cobbler Footwear Assessment" 
                className="sr-assessment-artisan-img"
                loading="lazy" 
              />
            </div>

            {/* Main Content Grid over the card */}
            <div className="sr-assessment-content-grid">
              
              {/* Left empty spacer letting the artisan photograph show through */}
              <div className="sr-assessment-photo-spacer" />

              {/* Right Form column */}
              <div className="sr-assessment-right-content">
                
                {/* Header Row: Eyebrow + Title on left, Stepper on right */}
                <div className="sr-assessment-top-bar">
                  <div className="sr-assessment-header-left">
                    <span className="sr-eyebrow">START YOUR RESTORATION</span>
                    <h2 className="sr-heading sr-assessment-title">
                      Get your footwear assessed<br />in a few simple steps.
                    </h2>
                  </div>

                  {/* Stepper Header (5 Steps) */}
                  <div className="sr-stepper-header">
                    <div 
                      className="sr-step-item"
                      onClick={() => setAssessmentStep(1)}
                      style={{ cursor: 'pointer' }}
                      title="Step 1: Item"
                    >
                      <div className={`sr-step-circle ${assessmentStep === 1 ? 'active' : assessmentStep > 1 ? 'completed' : ''}`}>
                        {assessmentStep > 1 ? '✓' : '1'}
                      </div>
                      <span className="sr-step-label">Item</span>
                    </div>
                    <div className={`sr-step-divider ${assessmentStep > 1 ? 'completed' : ''}`} />

                    <div 
                      className="sr-step-item"
                      onClick={() => {
                        if (assessmentItem) setAssessmentStep(2);
                      }}
                      style={{ cursor: assessmentItem ? 'pointer' : 'not-allowed' }}
                      title="Step 2: Damage"
                    >
                      <div className={`sr-step-circle ${assessmentStep === 2 ? 'active' : assessmentStep > 2 ? 'completed' : ''}`}>
                        {assessmentStep > 2 ? '✓' : '2'}
                      </div>
                      <span className="sr-step-label">Damage</span>
                    </div>
                    <div className={`sr-step-divider ${assessmentStep > 2 ? 'completed' : ''}`} />

                    <div 
                      className="sr-step-item"
                      onClick={() => {
                        if (assessmentItem && assessmentDamages.length > 0) setAssessmentStep(3);
                      }}
                      style={{ cursor: (assessmentItem && assessmentDamages.length > 0) ? 'pointer' : 'not-allowed' }}
                      title="Step 3: Photos"
                    >
                      <div className={`sr-step-circle ${assessmentStep === 3 ? 'active' : assessmentStep > 3 ? 'completed' : ''}`}>
                        {assessmentStep > 3 ? '✓' : '3'}
                      </div>
                      <span className="sr-step-label">Photos</span>
                    </div>
                    <div className={`sr-step-divider ${assessmentStep > 3 ? 'completed' : ''}`} />

                    <div 
                      className="sr-step-item"
                      onClick={() => {
                        if (assessmentPhotos.length > 0) setAssessmentStep(4);
                      }}
                      style={{ cursor: assessmentPhotos.length > 0 ? 'pointer' : 'not-allowed' }}
                      title="Step 4: Nearby Tailor"
                    >
                      <div className={`sr-step-circle ${assessmentStep === 4 ? 'active' : assessmentStep > 4 ? 'completed' : ''}`}>
                        {assessmentStep > 4 ? '✓' : '4'}
                      </div>
                      <span className="sr-step-label">Nearby Tailor</span>
                    </div>
                    <div className={`sr-step-divider ${assessmentStep > 4 ? 'completed' : ''}`} />

                    <div 
                      className="sr-step-item"
                      onClick={() => {
                        if (tailorMatchingStatus === 'accepted') setAssessmentStep(5);
                      }}
                      style={{ cursor: tailorMatchingStatus === 'accepted' ? 'pointer' : 'not-allowed' }}
                      title="Step 5: Pickup"
                    >
                      <div className={`sr-step-circle ${assessmentStep === 5 ? 'active' : ''}`}>
                        5
                      </div>
                      <span className="sr-step-label">Pickup</span>
                    </div>
                  </div>
                </div>

                {/* Form Step Bodies */}
                {submissionComplete ? (
                  <div className="sr-success-box">
                    <div className="sr-success-check-circle">✓</div>
                    <h3 className="sr-heading" style={{ fontSize: '1.6rem' }}>Assessment Request Confirmed!</h3>
                    <p className="sr-subtitle" style={{ margin: '0 auto 10px' }}>
                      Your footwear assessment has been safely submitted to our specialist workshop.
                    </p>
                    <div className="sr-ref-number">Reference ID: {bookingRefNum}</div>

                    <div style={{ textAlign: 'left', maxWidth: '440px', margin: '0 auto 24px', background: 'var(--sr-soft-pink)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--sr-soft-pink-border)' }}>
                      <div style={{ fontSize: '0.84rem', margin: '4px 0' }}><strong>Assigned Specialist:</strong> {activeSpecialist.name} ({activeSpecialist.studio})</div>
                      <div style={{ fontSize: '0.84rem', margin: '4px 0' }}><strong>Item:</strong> {assessmentItem}</div>
                      <div style={{ fontSize: '0.84rem', margin: '4px 0' }}><strong>Issues:</strong> {assessmentDamages.join(', ') || 'General Inspection'}</div>
                      <div style={{ fontSize: '0.84rem', margin: '4px 0' }}><strong>Photos:</strong> {assessmentPhotos.length} attached</div>
                      <div style={{ fontSize: '0.84rem', margin: '4px 0' }}><strong>Pickup:</strong> {pickupForm.date} ({pickupForm.timeSlot})</div>
                      <div style={{ fontSize: '0.84rem', margin: '4px 0' }}><strong>Address:</strong> {pickupForm.address}, {pickupForm.city} - {pickupForm.pincode}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      <button 
                        className="sr-btn-primary"
                        onClick={() => {
                          setSubmissionComplete(false);
                          setAssessmentStep(1);
                          setAssessmentPhotos([]);
                          setAssessmentDamages(["Leather Scratched / Cracked"]);
                          setTailorMatchingStatus('searching');
                        }}
                      >
                        Assess Another Pair →
                      </button>
                      <button 
                        className="sr-btn-secondary"
                        onClick={() => scrollToSection('sr-services-section')}
                      >
                        Explore Services
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* STEP 1: ITEM SELECTION */}
                    {assessmentStep === 1 && (
                      <div className="sr-step-container">
                        <div className="sr-step-sublabel">Step 1 of 5</div>
                        <h3 className="sr-step-instruction">What are we restoring?</h3>

                        <div className="sr-item-choices-grid">
                          {[
                            { id: 'mens-shoes', name: "Men's Shoes", img: "/shoerepair/MENS SHOE.png" },
                            { id: 'womens-shoes', name: "Women's Shoes", img: "/shoerepair/WOMENS SHOE.png" },
                            { id: 'sneakers', name: "Sneakers", img: "/shoerepair/SNEAKERS.png" },
                            { id: 'sandals-slippers', name: "Sandals / Slippers", img: "/shoerepair/SANDALS.png" },
                            { id: 'boots', name: "Boots", img: "/shoerepair/BOOTS.png" },
                            { id: 'other', name: "Other", img: "/shoerepair/SOMETHING ELSE.png" }
                          ].map(choice => {
                            const isSelected = assessmentItem === choice.name || selectedCatId === choice.id;
                            return (
                              <div 
                                key={choice.name}
                                className={`sr-item-choice-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                  setAssessmentItem(choice.name);
                                  setSelectedCatId(choice.id);
                                }}
                              >
                                {isSelected && (
                                  <div className="sr-choice-check-badge">
                                    <Check size={11} strokeWidth={3} />
                                  </div>
                                )}
                                <div className="sr-item-choice-thumb-wrap">
                                  <img src={choice.img} alt={choice.name} className="sr-item-choice-thumb" />
                                </div>
                                <div className="sr-item-choice-name">{choice.name}</div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="sr-form-footer">
                          <button 
                            className="sr-btn-primary sr-btn-full"
                            disabled={!assessmentItem}
                            onClick={() => setAssessmentStep(2)}
                          >
                            Continue →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: DAMAGE SELECTION */}
                    {assessmentStep === 2 && (
                      <div>
                        <div className="sr-step-sublabel">Step 2 of 5</div>
                        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--sr-text-secondary)', marginBottom: '14px' }}>
                          Select all issues that apply ({assessmentItem})
                        </p>

                        <div className="sr-damage-choices-grid">
                          {currentCategory.issues.map(issue => {
                            const isSelected = assessmentDamages.includes(issue.label);
                            return (
                              <div 
                                key={issue.id}
                                className={`sr-damage-choice-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                  setAssessmentDamages(prev => 
                                    isSelected ? prev.filter(d => d !== issue.label) : [...prev, issue.label]
                                  );
                                }}
                              >
                                <span>{issue.label}</span>
                                <span>{isSelected ? '✓' : '+'}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="sr-form-footer">
                          <button 
                            className="sr-btn-secondary"
                            onClick={() => setAssessmentStep(1)}
                          >
                            ← Back
                          </button>
                          <button 
                            className="sr-btn-full-pink"
                            disabled={assessmentDamages.length === 0}
                            style={{ width: 'auto', flexGrow: 1 }}
                            onClick={() => setAssessmentStep(3)}
                          >
                            Continue →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: PHOTO UPLOAD */}
                    {assessmentStep === 3 && (
                      <div>
                        <div className="sr-step-sublabel">Step 3 of 5</div>
                        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--sr-text-secondary)', marginBottom: '14px' }}>
                          Upload 1–4 photos of your footwear (JPG, PNG, WEBP)
                        </p>

                        <label 
                          className="sr-dropzone"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleFileDrop}
                        >
                          <input 
                            type="file" 
                            multiple 
                            accept="image/png, image/jpeg, image/jpg, image/webp" 
                            style={{ display: 'none' }}
                            onChange={handleFileDrop}
                          />
                          <Upload size={28} style={{ color: 'var(--sr-pink)', margin: '0 auto 8px', display: 'block' }} />
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sr-text-primary)' }}>
                            Click or drag photos here
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--sr-text-secondary)', marginTop: '4px' }}>
                            Upload close-ups of the damage and whole pair (up to 4 photos, 10MB max each)
                          </div>
                        </label>

                        {photoError && (
                          <div className="sr-form-error-msg" style={{ marginBottom: '12px' }}>
                            {photoError}
                          </div>
                        )}

                        {/* Photo Previews */}
                        {assessmentPhotos.length > 0 && (
                          <div className="sr-photo-previews">
                            {assessmentPhotos.map((photo, idx) => (
                              <div key={idx} className="sr-photo-preview-item">
                                <img src={photo.url} alt={photo.name} className="sr-photo-preview-img" />
                                <button 
                                  className="sr-photo-remove-btn"
                                  onClick={() => handleRemovePhoto(idx)}
                                  title="Remove photo"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {assessmentPhotos.length === 0 && (
                          <div style={{ fontSize: '0.78rem', color: 'var(--sr-text-muted)', marginBottom: '16px' }}>
                            * At least 1 photo is required to enable assessment quote generation.
                          </div>
                        )}

                        <div className="sr-form-footer">
                          <button 
                            className="sr-btn-secondary"
                            onClick={() => setAssessmentStep(2)}
                          >
                            ← Back
                          </button>
                          <button 
                            className="sr-btn-full-pink"
                            disabled={assessmentPhotos.length === 0}
                            style={{ width: 'auto', flexGrow: 1 }}
                            onClick={() => setAssessmentStep(4)}
                          >
                            Continue: Find Nearby Tailors ({assessmentPhotos.length}/4) →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: FIND NEARBY TAILORS & ARTISANS (RADAR & LIVE MATCHING) */}
                    {assessmentStep === 4 && (
                      <div>
                        <div className="sr-step-sublabel">Step 4 of 5</div>
                        <h4 className="sr-step-instruction" style={{ marginBottom: '4px' }}>
                          Find Nearby Footwear Specialists & Cobblers
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--sr-text-secondary)', margin: '0 0 16px 0' }}>
                          Broadcasting your footwear photos & restoration requirements to certified shoe ateliers within 5 km.
                        </p>

                        {/* Interactive Google Map with Radar Status */}
                        <div className="sr-map-radar-card">
                          <div className="sr-map-radar-header">
                            <div className="sr-map-radar-title">
                              <MapPin size={16} color="var(--sr-pink)" />
                              <span>Live Artisan Radar (Bangalore Central)</span>
                            </div>
                            <div className={`sr-radar-status-badge ${tailorMatchingStatus}`}>
                              {tailorMatchingStatus === 'searching' ? (
                                <>
                                  <span className="sr-radar-dot searching" />
                                  <span>Broadcasting... ({countdownSeconds}s)</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 size={13} color="#10B981" />
                                  <span>Request Accepted!</span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Map Container */}
                          <div 
                            ref={mapContainerRef} 
                            className="sr-map-radar-canvas"
                          />
                        </div>

                        {/* Status Box or Accepted Tailor Card */}
                        {tailorMatchingStatus === 'searching' ? (
                          <div className="sr-tailor-searching-box">
                            <div className="sr-radar-pulse-icon">
                              <span className="sr-spin">🔍</span>
                            </div>
                            <div className="sr-searching-text-wrap">
                              <div className="sr-searching-title">
                                Broadcasting to nearby verified footwear ateliers...
                              </div>
                              <div className="sr-searching-sub">
                                Specialists reviewing your {assessmentPhotos.length || 1} inspection photo(s) & repair scope
                              </div>
                            </div>
                            <div className="sr-searching-chip-pulse">
                              <span className="sr-radar-dot searching" />
                              <span>Live Matching</span>
                            </div>
                          </div>
                        ) : activeSpecialist ? (
                          <div className="sr-tailor-accepted-card">
                            {/* Premium Header Bar */}
                            <div className="sr-accepted-card-header">
                              <div className="sr-accepted-header-left">
                                <span className="sr-accepted-sparkle-pill">
                                  <Sparkles size={14} />
                                </span>
                                <div>
                                  <div className="sr-accepted-header-title">Request Accepted by Master Footwear Specialist</div>
                                  <div className="sr-accepted-header-sub">Ready to inspect & restore your pair</div>
                                </div>
                              </div>
                              <div className="sr-accepted-response-badge">
                                <CheckCircle2 size={13} color="#047857" />
                                <span>Accepted in 3s</span>
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="sr-accepted-card-body">
                              <div className="sr-artisan-profile-row">
                                <div className="sr-artisan-avatar-wrap">
                                  <img 
                                    src={activeSpecialist.avatar} 
                                    alt={activeSpecialist.name} 
                                    className="sr-artisan-avatar-img" 
                                  />
                                  <div className="sr-artisan-verified-badge" title="StitchBee Certified Footwear Artisan">
                                    <Check size={11} strokeWidth={3.5} />
                                  </div>
                                </div>

                                <div className="sr-artisan-info-col">
                                  <div className="sr-artisan-name-line">
                                    <h4 className="sr-artisan-name">{activeSpecialist.name}</h4>
                                    <span className="sr-artisan-badge-certified">
                                      <Award size={12} /> Certified Master
                                    </span>
                                  </div>

                                  <div className="sr-artisan-studio-line">
                                    <span className="sr-artisan-studio-name">{activeSpecialist.studio}</span>
                                    <span className="sr-meta-sep">•</span>
                                    <span>
                                      <MapPin size={12} style={{ display: 'inline', marginRight: '2px' }} />
                                      {activeSpecialist.distanceKm} km away ({activeSpecialist.neighborhood})
                                    </span>
                                  </div>

                                  <div className="sr-artisan-rating-line">
                                    <div className="sr-star-rating-pill">
                                      <Star size={13} fill="#F59E0B" color="#F59E0B" />
                                      <span>{activeSpecialist.rating}</span>
                                      <span style={{ color: 'var(--sr-text-muted)', fontWeight: 500 }}>({activeSpecialist.reviewsCount} reviews)</span>
                                    </div>
                                    <span className="sr-meta-sep">•</span>
                                    <span style={{ color: 'var(--sr-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                      <ShieldCheck size={12} color="#10B981" /> {activeSpecialist.experienceYears}+ yrs exp
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Highlight Badges Strip */}
                              <div className="sr-accepted-highlights-strip">
                                <div className="sr-highlight-item">
                                  <span className="sr-highlight-label">Specialty</span>
                                  <span className="sr-highlight-val">{activeSpecialist.specialty}</span>
                                </div>
                                <div className="sr-highlight-item">
                                  <span className="sr-highlight-label">Est. Turnaround</span>
                                  <span className="sr-highlight-val pink">⚡ {activeSpecialist.turnaround}</span>
                                </div>
                                <div className="sr-highlight-item">
                                  <span className="sr-highlight-label">Assessment</span>
                                  <span className="sr-highlight-val green">✓ Free Diagnostic</span>
                                </div>
                              </div>

                              {/* Assurance footer */}
                              <div className="sr-accepted-assurance-banner">
                                <ShieldCheck size={14} color="#10B981" />
                                <span>Free doorstep inspection. Exact quote and repair scope confirmed only upon physical diagnosis.</span>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <div className="sr-form-footer">
                          <button 
                            className="sr-btn-secondary" 
                            onClick={() => setAssessmentStep(3)}
                          >
                            ← Back
                          </button>
                          <button 
                            className="sr-btn-full-pink"
                            disabled={tailorMatchingStatus === 'searching'}
                            style={{ 
                              width: 'auto', 
                              flexGrow: 1,
                              opacity: tailorMatchingStatus === 'searching' ? 0.65 : 1,
                              cursor: tailorMatchingStatus === 'searching' ? 'not-allowed' : 'pointer'
                            }}
                            onClick={() => {
                              if (tailorMatchingStatus === 'accepted') {
                                setAssessmentStep(5);
                              }
                            }}
                          >
                            {tailorMatchingStatus === 'searching' ? 'Waiting for specialist acceptance...' : 'Continue: Enter Pickup Details →'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: PICKUP DETAILS */}
                    {assessmentStep === 5 && (
                      <form onSubmit={handleSubmitAssessment}>
                        <div className="sr-step-sublabel">Step 5 of 5</div>
                        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--sr-text-secondary)', marginBottom: '14px' }}>
                          Contact & Doorstep Pickup Details
                        </p>

                        {/* Assigned Specialist Banner */}
                        {activeSpecialist && (
                          <div className="sr-assigned-artisan-pill-banner">
                            <img src={activeSpecialist.avatar} alt={activeSpecialist.name} className="sr-assigned-mini-avatar" />
                            <div className="sr-assigned-info">
                              <span className="sr-assigned-name">Assigned Specialist: {activeSpecialist.name} ({activeSpecialist.studio})</span>
                              <span className="sr-assigned-spec">★ {activeSpecialist.rating} • {activeSpecialist.neighborhood} • Pickup inspection confirmed</span>
                            </div>
                            <span className="sr-accepted-tick-badge"><Check size={12} strokeWidth={3} /> Accepted</span>
                          </div>
                        )}

                        <div className="sr-form-grid-2">
                          <div className="sr-form-group">
                            <label className="sr-form-label">Full Name *</label>
                            <input 
                              type="text" 
                              className="sr-form-input"
                              required
                              value={pickupForm.name}
                              onChange={(e) => {
                                setPickupForm({ ...pickupForm, name: e.target.value });
                                if (validationErrors.name) setValidationErrors({ ...validationErrors, name: '' });
                              }}
                            />
                            {validationErrors.name && (
                              <span className="sr-form-error-msg">{validationErrors.name}</span>
                            )}
                          </div>
                          <div className="sr-form-group">
                            <label className="sr-form-label">Phone Number (10 Digits) *</label>
                            <input 
                              type="tel" 
                              className="sr-form-input"
                              required
                              placeholder="e.g. 9845012345"
                              value={pickupForm.phone}
                              onChange={(e) => {
                                setPickupForm({ ...pickupForm, phone: e.target.value });
                                if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: '' });
                              }}
                            />
                            {validationErrors.phone && (
                              <span className="sr-form-error-msg">{validationErrors.phone}</span>
                            )}
                          </div>
                        </div>

                        <div className="sr-form-group">
                          <label className="sr-form-label">Doorstep Pickup Address *</label>
                          <input 
                            type="text" 
                            className="sr-form-input"
                            required
                            placeholder="Street, apartment / building name"
                            value={pickupForm.address}
                            onChange={(e) => {
                              setPickupForm({ ...pickupForm, address: e.target.value });
                              if (validationErrors.address) setValidationErrors({ ...validationErrors, address: '' });
                            }}
                          />
                          {validationErrors.address && (
                            <span className="sr-form-error-msg">{validationErrors.address}</span>
                          )}
                        </div>

                        <div className="sr-form-grid-2">
                          <div className="sr-form-group">
                            <label className="sr-form-label">City *</label>
                            <input 
                              type="text" 
                              className="sr-form-input"
                              required
                              value={pickupForm.city}
                              onChange={(e) => setPickupForm({ ...pickupForm, city: e.target.value })}
                            />
                          </div>
                          <div className="sr-form-group">
                            <label className="sr-form-label">PIN Code (6 Digits) *</label>
                            <input 
                              type="text" 
                              className="sr-form-input"
                              required
                              placeholder="e.g. 560034"
                              maxLength={6}
                              value={pickupForm.pincode}
                              onChange={(e) => {
                                setPickupForm({ ...pickupForm, pincode: e.target.value });
                                if (validationErrors.pincode) setValidationErrors({ ...validationErrors, pincode: '' });
                              }}
                            />
                            {validationErrors.pincode && (
                              <span className="sr-form-error-msg">{validationErrors.pincode}</span>
                            )}
                          </div>
                        </div>

                        <div className="sr-form-grid-2">
                          <div className="sr-form-group">
                            <label className="sr-form-label">Preferred Date *</label>
                            <input 
                              type="date" 
                              className="sr-form-input"
                              required
                              min={todayISO}
                              value={pickupForm.date}
                              onChange={(e) => {
                                setPickupForm({ ...pickupForm, date: e.target.value });
                                if (validationErrors.date) setValidationErrors({ ...validationErrors, date: '' });
                              }}
                            />
                            {validationErrors.date && (
                              <span className="sr-form-error-msg">{validationErrors.date}</span>
                            )}
                          </div>
                          <div className="sr-form-group">
                            <label className="sr-form-label">Time Slot *</label>
                            <select 
                              className="sr-form-select"
                              value={pickupForm.timeSlot}
                              onChange={(e) => setPickupForm({ ...pickupForm, timeSlot: e.target.value })}
                            >
                              <option>10:00 AM - 01:00 PM</option>
                              <option>02:00 PM - 05:00 PM</option>
                              <option>06:00 PM - 08:30 PM</option>
                            </select>
                          </div>
                        </div>

                        <div className="sr-form-group">
                          <label className="sr-form-label">Special Notes (Optional)</label>
                          <input 
                            type="text" 
                            className="sr-form-input"
                            placeholder="Any special handling or instructions"
                            value={pickupForm.notes}
                            onChange={(e) => setPickupForm({ ...pickupForm, notes: e.target.value })}
                          />
                        </div>

                        <div className="sr-form-footer">
                          <button 
                            type="button"
                            className="sr-btn-secondary"
                            onClick={() => setAssessmentStep(4)}
                          >
                            ← Back
                          </button>
                          <button 
                            type="submit"
                            className="sr-btn-full-pink"
                            disabled={isSubmitting}
                            style={{ width: 'auto', flexGrow: 1 }}
                          >
                            {isSubmitting ? "Submitting Request..." : "Confirm Free Assessment Pickup →"}
                          </button>
                        </div>
                      </form>
                    )}

                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 9: CUSTOMER STORIES (Loved by Footwear Owners)
          ==================================================================== */}
      <section className="sr-reviews-section" id="sr-reviews">
        <div className="sr-container">
          <div className="sr-reviews-header">
            <div>
              <span className="sr-eyebrow">CUSTOMER STORIES</span>
              <h2 className="sr-heading">Loved by Footwear Owners</h2>
              <p className="sr-subtitle" style={{ marginBottom: 0 }}>
                Real experiences from customers who trusted StitchBeez with their favourite pairs.
              </p>
            </div>
            <a 
              href="#sr-reviews" 
              className="sr-reviews-link"
              onClick={(e) => {
                e.preventDefault();
                setIsReviewsModalOpen(true);
              }}
            >
              View More Reviews →
            </a>
          </div>

          <div className="sr-reviews-grid">
            {CUSTOMER_STORIES.map((review, idx) => (
              <div key={idx} className="sr-review-card">
                <div>
                  <div className="sr-review-stars">★★★★★</div>
                  <p className="sr-review-quote">"{review.quote}"</p>
                </div>

                <div className="sr-review-footer">
                  <div className="sr-review-user">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="sr-review-avatar" 
                    />
                    <div>
                      <h5 className="sr-review-name">{review.name}</h5>
                      <span className="sr-review-city">📍 {review.city}</span>
                    </div>
                  </div>

                  <img 
                    src={review.shoeThumb} 
                    alt="Restored pair" 
                    className="sr-review-shoe-thumb" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 10: FINAL CTA BANNER
          ==================================================================== */}
      <section className="sr-final-cta-section">
        <div className="sr-container">
          <div className="sr-final-cta-card">
            <img 
              src="/luxurious_brown_leather_shoe_texture.png" 
              alt="Rich Leather Texture" 
              className="sr-final-cta-bg" 
            />
            <div className="sr-final-cta-overlay" />

            <div className="sr-final-cta-text">
              <h2 className="sr-final-cta-heading">
                Ready to Give Your Favourite Pair Another Journey?
              </h2>
              <p className="sr-final-cta-sub">
                Get a complimentary assessment from our verified StitchBeez footwear specialists.
              </p>
            </div>

            <div className="sr-final-cta-btns">
              <button 
                className="sr-final-btn-pink"
                onClick={() => scrollToSection('sr-assessment-section')}
              >
                Start Free Assessment →
              </button>
              <button 
                className="sr-final-btn-glass"
                onClick={() => scrollToSection('sr-services-section')}
              >
                Explore Repair Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          VIEW DETAILS MODAL (Centered Modal)
          ==================================================================== */}
      {activeModalService && (
        <div 
          className="sr-modal-backdrop"
          onClick={() => setActiveModalService(null)}
        >
          <div 
            className="sr-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="sr-modal-close-btn"
              onClick={() => setActiveModalService(null)}
            >
              <X size={16} />
            </button>

            <div className="sr-modal-img-wrap">
              <img 
                src={activeModalService.img} 
                alt={activeModalService.name} 
                className="sr-modal-img" 
              />
            </div>

            <h3 className="sr-modal-title">{activeModalService.name}</h3>
            
            <div className="sr-modal-price-row">
              <span className="sr-modal-price">Starting from {activeModalService.price}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--sr-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> Estimated turnaround: {activeModalService.duration}
              </span>
            </div>

            <p className="sr-modal-desc">{activeModalService.desc}</p>

            <h5 className="sr-modal-section-title">What's Included:</h5>
            <ul className="sr-modal-list">
              {activeModalService.whatsIncluded.map((inc, i) => (
                <li key={i}>
                  <span className="check">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginBottom: '22px' }}>
              <h5 className="sr-modal-section-title">Suitable For:</h5>
              <div style={{ fontSize: '0.85rem', color: 'var(--sr-text-secondary)' }}>
                {activeModalService.suitableFor}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                className="sr-btn-secondary"
                onClick={() => setActiveModalService(null)}
              >
                Close
              </button>
              <button 
                className="sr-btn-primary"
                onClick={() => {
                  if (!selectedServiceIds.includes(activeModalService.id)) {
                    setSelectedServiceIds(prev => [...prev, activeModalService.id]);
                  }
                  setActiveModalService(null);
                  scrollToSection('sr-assessment-section');
                }}
              >
                Select This Repair →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          CUSTOMER REVIEWS MODAL
          ==================================================================== */}
      {isReviewsModalOpen && (
        <div 
          className="sr-modal-backdrop"
          onClick={() => setIsReviewsModalOpen(false)}
        >
          <div 
            className="sr-modal-content sr-reviews-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="sr-modal-close-btn"
              onClick={() => setIsReviewsModalOpen(false)}
            >
              <X size={16} />
            </button>

            <span className="sr-eyebrow">VERIFIED EXPERIENCES</span>
            <h3 className="sr-modal-title">Footwear Customer Stories</h3>
            <p className="sr-modal-desc" style={{ marginBottom: '16px' }}>
              Read verified testimonials from customers across India whose footwear was restored by StitchBeez artisans.
            </p>

            <div className="sr-reviews-modal-grid">
              {EXTENDED_CUSTOMER_STORIES.map((review, idx) => (
                <div key={idx} className="sr-review-card" style={{ padding: '16px' }}>
                  <div>
                    <div className="sr-review-stars">★★★★★</div>
                    <p className="sr-review-quote" style={{ fontSize: '0.84rem', marginBottom: '14px' }}>
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="sr-review-footer">
                    <div className="sr-review-user">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="sr-review-avatar" 
                        style={{ width: '34px', height: '34px' }}
                      />
                      <div>
                        <h5 className="sr-review-name" style={{ fontSize: '0.84rem' }}>{review.name}</h5>
                        <span className="sr-review-city">📍 {review.city}</span>
                      </div>
                    </div>

                    <img 
                      src={review.shoeThumb} 
                      alt="Restored pair" 
                      className="sr-review-shoe-thumb" 
                      style={{ width: '40px', height: '40px' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button 
                className="sr-btn-primary"
                onClick={() => setIsReviewsModalOpen(false)}
              >
                Close Reviews
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
