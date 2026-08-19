import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Sparkles, RefreshCw, RotateCw, ZoomIn, ZoomOut, Maximize2, 
  Check, X, Eye, Download, Share2, Play, Sliders, ChevronDown, 
  Layers, Sun, Moon, Info, HelpCircle, ArrowLeft, ArrowRight, ShieldCheck,
  FileText, Box, Video, Plus, Trash2, Heart, MessageSquare, Send, Copy, 
  Minimize2, Undo, Redo, CheckCircle2, SlidersHorizontal, Image as ImageIcon
} from 'lucide-react';
import * as THREE from 'three';

export default function AIFashionDesignStudio({ theme = 'light', onNavigateTab }) {
  const isDark = theme === 'dark';

  // --------------------------------------------------------------------------
  // STITCHBEE BRAND DESIGN TOKENS (Hot Pink & Purple Accent Theme)
  // --------------------------------------------------------------------------
  const primaryPink = '#E9008C';
  const pinkHover = '#D0007D';
  const purpleAccent = '#9B1DDB';
  const brassAccent = '#E9008C'; // Pink accent replacing brass for StitchBee branding
  
  const pageBg = isDark ? '#0D0A1A' : '#F7F8FC';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const inputBg = isDark ? '#231D34' : '#F8FAFC';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E5E7EB';
  const textColor = isDark ? '#F9FAFB' : '#182033';
  const secTextColor = isDark ? '#A0AEC0' : '#667085';

  // --------------------------------------------------------------------------
  // GLOBAL DESIGN STATE
  // --------------------------------------------------------------------------
  const [currentStep, setCurrentStep] = useState(3); // 1: Upload, 2: AI Generate, 3: Customize, 4: 3D Preview, 5: Download
  const [viewMode, setViewMode] = useState('3d'); // 'sketch' | '3d' | 'split'
  const [designTitle, setDesignTitle] = useState('Midnight Silk Outfit');
  const [autosaveText, setAutosaveText] = useState('All changes saved');

  // Step 1 & Sketch State
  const [hasSketch, setHasSketch] = useState(false);
  const [sketchDataUrl, setSketchDataUrl] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // AI Conversion Progress State
  const [isConverting, setIsConverting] = useState(false);
  const [conversionStep, setConversionStep] = useState(0); // 0 to 4
  const [aiComplete, setAiComplete] = useState(false);

  // Garment Classification State
  const [garmentType, setGarmentType] = useState('shirt'); // 'shirt' | 'jacket' | 'dress' | 'gown'
  const [garmentMatch, setGarmentMatch] = useState(null);
  const [garmentNote, setGarmentNote] = useState('Select or auto-detect silhouette from sketch.');

  // Customization State (Color, Fabric, Pattern, Details)
  const [activeRightTab, setActiveRightTab] = useState('color'); // 'color' | 'fabric' | 'pattern' | 'details'
  const [colorRole, setColorRole] = useState('primary'); // 'primary' | 'secondary' | 'accent'
  const [colors, setColors] = useState({
    primary: '#E9008C',
    secondary: '#F5F3EE',
    accent: '#9B1DDB'
  });
  const [recentColors, setRecentColors] = useState(['#E9008C', '#9B1DDB', '#182033', '#10B981']);
  
  const [selectedFabric, setSelectedFabric] = useState('silk');
  const [selectedPattern, setSelectedPattern] = useState('solid');
  
  const [details, setDetails] = useState({
    collar: 'classic', // 'classic' | 'mandarin' | 'none'
    sleeve: 'long',    // 'short' | 'long'
    length: 'regular', // 'crop' | 'regular' | 'long'
    fit: 'regular',    // 'slim' | 'regular' | 'relaxed'
    neckline: 'crew',  // 'crew' | 'v' | 'open'
    hem: 'straight',   // 'straight' | 'curved'
    cuffs: true,
    buttons: true,
    pockets: false,
    stitching: false
  });

  // History & Version Control State
  const [versions, setVersions] = useState([
    { label: 'Design created', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);

  // AI Assistant Drawer State
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantInputText, setAssistantInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Welcome to StitchBee Studio AI! What would you like to design today?' }
  ]);

  // Modals & Toast State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const flashAutosave = () => {
    setAutosaveText('Saving…');
    setTimeout(() => setAutosaveText('All changes saved'), 600);
  };

  const addVersion = (label) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVersions(prev => [{ label, time: timeStr }, ...prev.slice(0, 10)]);
    flashAutosave();
  };

  // --------------------------------------------------------------------------
  // GARMENT TYPES & FABRICS DATA
  // --------------------------------------------------------------------------
  const garmentTypesList = [
    { id: 'shirt', name: 'Shirt / Kurti', icon: '👔' },
    { id: 'jacket', name: 'Jacket / Blazer', icon: '🧥' },
    { id: 'dress', name: 'Anarkali / Dress', icon: '👗' },
    { id: 'gown', name: 'Lehenga Gown', icon: '✨' }
  ];

  const fabricsList = [
    { id: 'cotton', name: 'Cotton', desc: 'Matte · breathable', roughness: 0.88, metalness: 0.02 },
    { id: 'linen', name: 'Linen', desc: 'Textured · natural', roughness: 0.92, metalness: 0.0 },
    { id: 'silk', name: 'Raw Silk', desc: 'Lustrous · fluid', roughness: 0.18, metalness: 0.05 },
    { id: 'velvet', name: 'Royal Velvet', desc: 'Deep pile · rich', roughness: 0.97, metalness: 0.0 },
    { id: 'denim', name: 'Denim', desc: 'Rugged · woven', roughness: 0.8, metalness: 0.0 },
    { id: 'wool', name: 'Wool', desc: 'Soft · warm', roughness: 0.9, metalness: 0.0 },
    { id: 'satin', name: 'Zari Satin', desc: 'Glossy · smooth', roughness: 0.14, metalness: 0.08 },
    { id: 'leather', name: 'Leather', desc: 'Structured · sheen', roughness: 0.4, metalness: 0.06 }
  ];

  const colorPresets = [
    { name: 'StitchBee Pink', hex: '#E9008C' },
    { name: 'Purple Accent', hex: '#9B1DDB' },
    { name: 'Royal Red', hex: '#8C1F28' },
    { name: 'Navy Blue', hex: '#1B2A41' },
    { name: 'Emerald', hex: '#10B981' },
    { name: 'Metallic Gold', hex: '#EAB308' },
    { name: 'Rosewood', hex: '#7A3B3F' },
    { name: 'Ivory White', hex: '#EFEAE1' },
    { name: 'Charcoal Black', hex: '#15130F' },
    { name: 'Olive Green', hex: '#5B5A3D' },
    { name: 'Beige Silk', hex: '#CBB994' },
    { name: 'Pastel Blue', hex: '#DFE3E8' }
  ];

  const variationsList = [
    { id: 'original', name: 'Original', tag: 'v1', primary: '#E9008C', fabric: 'silk', pattern: 'solid' },
    { id: 'modern', name: 'Modern Pink', tag: 'ai', primary: '#FF2AA6', fabric: 'satin', pattern: 'geometric' },
    { id: 'luxury', name: 'Royal Gold', tag: 'ai', primary: '#EAB308', fabric: 'silk', pattern: 'solid' },
    { id: 'minimal', name: 'Minimal Ivory', tag: 'ai', primary: '#EFEAE1', fabric: 'cotton', pattern: 'solid' },
    { id: 'streetwear', name: 'Deep Purple', tag: 'ai', primary: '#9B1DDB', fabric: 'velvet', pattern: 'stripes' },
    { id: 'classic', name: 'Classic Navy', tag: 'ai', primary: '#1B2A41', fabric: 'wool', pattern: 'checks' }
  ];

  // --------------------------------------------------------------------------
  // THREE.JS 3D CANVAS & ENGINE (PROCEDURAL 3D GARMENT LATHE & TEXTURES)
  // --------------------------------------------------------------------------
  const glCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const garmentGroupRef = useRef(null);
  const mannequinGroupRef = useRef(null);
  const autoRotateRef = useRef(false);
  
  const [zoomDist, setZoomDist] = useState(3.4);
  const [activeAnglePreset, setActiveAnglePreset] = useState(null);

  // Generate Procedural Texture Canvas for Fabric & Patterns
  const createFabricTexture = () => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const primary = colors.primary || '#E9008C';
    const secondary = colors.secondary || '#F5F3EE';
    ctx.fillStyle = primary;
    ctx.fillRect(0, 0, size, size);

    if (selectedPattern === 'stripes') {
      ctx.fillStyle = secondary;
      const w = size / 8;
      for (let i = 0; i < 8; i += 2) ctx.fillRect(i * w, 0, w, size);
    } else if (selectedPattern === 'checks') {
      ctx.strokeStyle = secondary;
      ctx.lineWidth = 6;
      ctx.globalAlpha = 0.85;
      const step = size / 8;
      for (let i = 0; i <= size; i += step) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
      }
      ctx.globalAlpha = 1.0;
    } else if (selectedPattern === 'floral') {
      ctx.fillStyle = secondary;
      for (let y = 16; y < size; y += 42) {
        for (let x = 16; x < size; x += 42) {
          const ox = (Math.floor(y / 42) % 2 === 0) ? 0 : 21;
          for (let p = 0; p < 5; p++) {
            const ang = (p / 5) * Math.PI * 2;
            ctx.beginPath();
            ctx.ellipse(x + ox + Math.cos(ang) * 7, y + Math.sin(ang) * 7, 6, 4, ang, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.beginPath(); ctx.arc(x + ox, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = colors.accent; ctx.fill();
          ctx.fillStyle = secondary;
        }
      }
    } else if (selectedPattern === 'geometric') {
      ctx.fillStyle = secondary;
      const step = 32;
      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          if (((x / step) + (y / step)) % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(x + step / 2, y); ctx.lineTo(x + step, y + step / 2);
            ctx.lineTo(x + step / 2, y + step); ctx.lineTo(x, y + step / 2);
            ctx.closePath(); ctx.fill();
          }
        }
      }
    }

    // Weave Noise
    const imgData = ctx.getImageData(0, 0, size, size);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const n = (Math.random() - 0.5) * 10;
      imgData.data[i] += n;
      imgData.data[i + 1] += n;
      imgData.data[i + 2] += n;
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(selectedPattern === 'solid' ? 1 : 3, selectedPattern === 'solid' ? 1 : 3);
    return texture;
  };

  // Rebuild Three.js Procedural 3D Model Scene
  const rebuild3DScene = () => {
    if (!garmentGroupRef.current) return;
    const gGroup = garmentGroupRef.current;
    gGroup.clear();

    const selectedF = fabricsList.find(f => f.id === selectedFabric) || fabricsList[0];
    const mat = new THREE.MeshStandardMaterial({
      map: createFabricTexture(),
      roughness: selectedF.roughness,
      metalness: selectedF.metalness,
      side: THREE.DoubleSide
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.secondary),
      roughness: selectedF.roughness * 0.9,
      metalness: selectedF.metalness,
      side: THREE.DoubleSide
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.accent),
      roughness: 0.35,
      metalness: 0.55
    });

    const isLongForm = garmentType === 'dress' || garmentType === 'gown';
    const fitScale = (details.fit === 'slim' ? 0.9 : details.fit === 'relaxed' ? 1.14 : 1.0) * (garmentType === 'jacket' ? 1.08 : 1.0);
    const baseHemY = details.length === 'crop' ? 1.02 : details.length === 'long' ? 0.55 : 0.78;
    const hemY = garmentType === 'gown' ? 0.03 : garmentType === 'dress' ? 0.30 : baseHemY;
    const neckR = details.neckline === 'open' ? 0.14 : details.neckline === 'v' ? 0.1 : 0.085;

    // 1. Torso Mesh via Lathe Geometry
    const pts = [];
    pts.push(new THREE.Vector2((isLongForm ? 0.36 : 0.30) * fitScale, hemY));
    if (isLongForm) {
      pts.push(new THREE.Vector2(0.30 * fitScale, 0.65));
      pts.push(new THREE.Vector2(0.255 * fitScale, 0.92));
    } else {
      pts.push(new THREE.Vector2(0.29 * fitScale, hemY + 0.05));
    }
    pts.push(new THREE.Vector2(0.265 * fitScale, 1.00));
    pts.push(new THREE.Vector2(0.30 * fitScale, 1.20));
    pts.push(new THREE.Vector2(0.335 * fitScale, 1.34));
    pts.push(new THREE.Vector2(0.30 * fitScale, 1.46));
    pts.push(new THREE.Vector2(neckR, 1.545));
    pts.push(new THREE.Vector2(neckR * 0.9, 1.555));

    const torsoGeo = new THREE.LatheGeometry(pts, 40);
    const torso = new THREE.Mesh(torsoGeo, mat);
    torso.castShadow = true;
    torso.receiveShadow = true;
    gGroup.add(torso);

    // 2. Gown Flared Train
    if (garmentType === 'gown') {
      const trainGeo = new THREE.PlaneGeometry(0.5, 0.55, 12, 12);
      const pos = trainGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        pos.setZ(i, Math.pow((y + 0.275) / 0.55, 1.6) * -0.32);
      }
      trainGeo.computeVertexNormals();
      const train = new THREE.Mesh(trainGeo, mat);
      train.position.set(0, 0.30, -0.22);
      train.rotation.x = -0.25;
      train.castShadow = true;
      gGroup.add(train);
    }

    // 3. Sleeves & Cuffs
    const sleeveLen = details.sleeve === 'short' ? 0.22 : 0.56;
    [-1, 1].forEach(side => {
      const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.092 * fitScale, 0.072 * fitScale, sleeveLen, 18), mat);
      sleeve.position.set(side * 0.335 * fitScale, 1.34, 0);
      sleeve.rotation.z = side * (Math.PI / 2 - 0.32);
      sleeve.position.x = side * (0.335 * fitScale + Math.cos(0.32) * sleeveLen / 2 * 0.9);
      sleeve.position.y = 1.34 - Math.sin(0.32) * sleeveLen / 2 * 0.9;
      sleeve.castShadow = true;
      gGroup.add(sleeve);

      if (details.cuffs && details.sleeve === 'long') {
        const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.075 * fitScale, 0.075 * fitScale, 0.035, 18), trimMat);
        const dx = side * Math.cos(0.32) * sleeveLen / 2 * 0.98;
        const dy = -Math.sin(0.32) * sleeveLen / 2 * 0.98;
        cuff.position.set(side * 0.335 * fitScale + dx, 1.34 + dy, 0);
        cuff.rotation.z = side * (Math.PI / 2 - 0.32);
        cuff.castShadow = true;
        gGroup.add(cuff);
      }
    });

    // 4. Collars
    if (details.collar === 'classic') {
      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.02, 10, 28, Math.PI * 1.5), trimMat);
      collar.position.set(0, 1.55, 0.01);
      collar.rotation.x = Math.PI / 2 + 0.25;
      collar.rotation.z = Math.PI * 0.25;
      gGroup.add(collar);
    } else if (details.collar === 'mandarin') {
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.098, 0.09, 0.055, 28, 1, true), trimMat);
      collar.position.set(0, 1.585, 0);
      gGroup.add(collar);
    }

    // 5. Buttons
    if (details.buttons) {
      const count = 6;
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const y = 1.50 - t * (1.50 - hemY - 0.04);
        const btn = new THREE.Mesh(new THREE.SphereGeometry(0.013, 10, 10), accentMat);
        btn.position.set(0, y, 0.27 * fitScale + 0.02);
        gGroup.add(btn);
      }
    }

    // 6. Pockets
    if (details.pockets) {
      [-1, 1].forEach(side => {
        const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.1, 0.012), trimMat);
        pocket.position.set(side * 0.14, 1.16, 0.27 * fitScale);
        gGroup.add(pocket);
      });
    }

    // 7. Stitching Accent Ring
    if (details.stitching) {
      const stitch = new THREE.Mesh(new THREE.TorusGeometry(0.30 * fitScale, 0.006, 6, 40), accentMat);
      stitch.rotation.x = Math.PI / 2;
      stitch.position.set(0, hemY + 0.01, 0);
      gGroup.add(stitch);
    }
  };

  useEffect(() => {
    if (!glCanvasRef.current) return;
    const canvas = glCanvasRef.current;
    const width = canvas.parentElement.clientWidth || 600;
    const height = canvas.parentElement.clientHeight || 500;

    // Scene & Camera Init
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 1.32, zoomDist);
    camera.lookAt(0, 1.15, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // Lighting
    const hemi = new THREE.HemisphereLight(0xF8F0DD, 0x151310, 0.6);
    scene.add(hemi);

    const dirKey = new THREE.DirectionalLight(0xffffff, 1.2);
    dirKey.position.set(2.4, 4, 2.2);
    dirKey.castShadow = true;
    scene.add(dirKey);

    const pinkRim = new THREE.DirectionalLight(0xE9008C, 0.4);
    pinkRim.position.set(-3, 2, -2);
    scene.add(pinkRim);

    // Floor Base
    const floorGeo = new THREE.CircleGeometry(3.2, 64);
    const floorMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x141210 : 0xEFEAE1, roughness: 0.9 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.86, 0.88, 64),
      new THREE.MeshBasicMaterial({ color: 0xE9008C, transparent: true, opacity: 0.3, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.001;
    scene.add(ring);

    // Mannequin Head & Neck Group
    const mannequinGroup = new THREE.Group();
    mannequinGroupRef.current = mannequinGroup;
    const manMat = new THREE.MeshStandardMaterial({ color: 0xCAC4B8, roughness: 0.55 });
    
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 24, 24), manMat);
    head.scale.set(1, 1.12, 0.92);
    head.position.set(0, 1.72, 0);
    mannequinGroup.add(head);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.058, 0.14, 20), manMat);
    neck.position.set(0, 1.565, 0);
    mannequinGroup.add(neck);

    scene.add(mannequinGroup);

    // Garment Group
    const garmentGroup = new THREE.Group();
    garmentGroupRef.current = garmentGroup;
    scene.add(garmentGroup);

    rebuild3DScene();

    // Render Animation Loop
    let animId;
    let targetRotY = 0.35;
    let targetRotX = -0.05;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotateRef.current) {
        targetRotY += 0.006;
      }
      garmentGroup.rotation.y += (targetRotY - garmentGroup.rotation.y) * 0.1;
      garmentGroup.rotation.x += (targetRotX - garmentGroup.rotation.x) * 0.1;
      mannequinGroup.rotation.y = garmentGroup.rotation.y;
      mannequinGroup.rotation.x = garmentGroup.rotation.x;

      if (cameraRef.current) {
        cameraRef.current.position.z += (zoomDist - cameraRef.current.position.z) * 0.15;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [theme, isDark]);

  useEffect(() => {
    rebuild3DScene();
  }, [colors, selectedFabric, selectedPattern, garmentType, details]);

  // Handle Drag & Drop Sketch Upload
  const processSketchFile = (file) => {
    setUploadError('');
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type)) {
      setUploadError('Please upload a valid image (PNG, JPG, WEBP, or PDF).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSketchDataUrl(e.target.result);
      setHasSketch(true);
      showToast(`Uploaded "${file.name}"`);
      runAIConversionPipeline();
    };
    reader.readAsDataURL(file);
  };

  const useDemoSketch = () => {
    const demoUrl = '/br_b1.jpg';
    setSketchDataUrl(demoUrl);
    setHasSketch(true);
    showToast('Loaded demo fashion sketch.');
    runAIConversionPipeline();
  };

  const runAIConversionPipeline = () => {
    setIsConverting(true);
    setAiComplete(false);
    setConversionStep(0);

    const steps = [0, 1, 2, 3, 4];
    steps.forEach((stepIdx) => {
      setTimeout(() => {
        setConversionStep(stepIdx);
        if (stepIdx === 4) {
          setTimeout(() => {
            setIsConverting(false);
            setAiComplete(true);
            showToast('3D Garment successfully generated!');
            addVersion('AI 3D generation completed');
          }, 600);
        }
      }, (stepIdx + 1) * 600);
    });
  };

  // AI Assistant Command Interpreter
  const handleAssistantCommand = (cmd) => {
    const lower = cmd.toLowerCase();
    const newMessages = [...chatMessages, { role: 'user', text: cmd }];

    let responseText = "I've updated your design!";
    let changes = [];

    // Parse Colors
    if (lower.includes('navy') || lower.includes('blue')) {
      setColors(prev => ({ ...prev, primary: '#1B2A41' }));
      changes.push('primary color to Navy Blue');
    } else if (lower.includes('pink') || lower.includes('magenta')) {
      setColors(prev => ({ ...prev, primary: '#E9008C' }));
      changes.push('primary color to StitchBee Pink');
    } else if (lower.includes('gold') || lower.includes('yellow')) {
      setColors(prev => ({ ...prev, primary: '#EAB308' }));
      changes.push('primary color to Metallic Gold');
    } else if (lower.includes('red')) {
      setColors(prev => ({ ...prev, primary: '#8C1F28' }));
      changes.push('primary color to Royal Red');
    }

    // Parse Fabric
    if (lower.includes('silk')) {
      setSelectedFabric('silk');
      changes.push('fabric to Raw Silk');
    } else if (lower.includes('velvet')) {
      setSelectedFabric('velvet');
      changes.push('fabric to Royal Velvet');
    } else if (lower.includes('cotton')) {
      setSelectedFabric('cotton');
      changes.push('fabric to Cotton');
    }

    // Parse Details
    if (lower.includes('mandarin')) {
      setDetails(prev => ({ ...prev, collar: 'mandarin' }));
      changes.push('collar to Mandarin style');
    } else if (lower.includes('short') && lower.includes('sleeve')) {
      setDetails(prev => ({ ...prev, sleeve: 'short' }));
      changes.push('sleeves to Short');
    } else if (lower.includes('long') && lower.includes('sleeve')) {
      setDetails(prev => ({ ...prev, sleeve: 'long' }));
      changes.push('sleeves to Long');
    }

    // Parse Pattern
    if (lower.includes('floral')) {
      setSelectedPattern('floral');
      changes.push('pattern to Floral');
    } else if (lower.includes('stripe')) {
      setSelectedPattern('stripes');
      changes.push('pattern to Stripes');
    } else if (lower.includes('check')) {
      setSelectedPattern('checks');
      changes.push('pattern to Checks');
    }

    if (changes.length > 0) {
      responseText = `Done! Updated ${changes.join(' and ')}.`;
      addVersion(`AI Assistant: ${cmd}`);
    } else {
      responseText = `I'm ready! Try asking to "make it navy blue", "change fabric to velvet", or "add a mandarin collar".`;
    }

    newMessages.push({ role: 'ai', text: responseText });
    setChatMessages(newMessages);
    setAssistantInputText('');
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: pageBg, color: textColor, minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Toast Alert Notice */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #182033, #0D0A1A)',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: `1px solid ${primaryPink}`
        }}>
          <Sparkles size={16} color={primaryPink} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 1. TOP HEADER & STEPPER BAR (STITCHBEE THEME)                        */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        padding: '24px 32px 18px 32px',
        borderBottom: `1px solid ${borderColor}`,
        background: cardBg,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: textColor, letterSpacing: '-0.5px' }}>
              Convert Sketch to Realistic Design
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: secTextColor }}>
              Upload your hand-drawn sketch and let StitchBee AI bring your fashion imagination to life.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setIsSaveModalOpen(true)}
              style={{
                padding: '9px 18px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                background: inputBg,
                color: textColor,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FileText size={15} color={secTextColor} />
              <span>Save Draft</span>
            </button>

            <button 
              onClick={() => setIsExportModalOpen(true)}
              style={{
                padding: '9px 18px',
                borderRadius: '10px',
                border: 'none',
                background: `linear-gradient(135deg, ${primaryPink}, ${purpleAccent})`,
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: `0 4px 14px ${primaryPink}35`
              }}
            >
              <Download size={15} color="#FFFFFF" />
              <span>Export Design</span>
            </button>
          </div>
        </div>

        {/* 5-Step Stepper Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '840px', margin: '4px 0 0 0' }}>
          {[
            { step: 1, label: 'Upload Sketch' },
            { step: 2, label: 'AI Generate' },
            { step: 3, label: 'Customize' },
            { step: 4, label: '3D Preview' },
            { step: 5, label: 'Download' }
          ].map((s, idx) => {
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;

            return (
              <div 
                key={s.step} 
                onClick={() => setCurrentStep(s.step)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isActive ? primaryPink : isCompleted ? '#12B76A' : (isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9'),
                  color: isActive || isCompleted ? '#FFFFFF' : secTextColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '12px'
                }}>
                  {isCompleted ? <Check size={14} color="#FFFFFF" strokeWidth={3} /> : s.step}
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: isActive ? 700 : 500, color: isActive ? primaryPink : isCompleted ? textColor : secTextColor }}>
                  {s.label}
                </span>

                {idx < 4 && (
                  <div style={{ width: '50px', height: '2px', background: currentStep > s.step ? '#12B76A' : (isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'), margin: '0 8px' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. THREE-PANEL STUDIO WORKSPACE                                      */}
      {/* -------------------------------------------------------------------- */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 340px', gap: '20px', padding: '24px 32px', alignItems: 'start' }}>

        {/* ================================================================== */}
        {/* LEFT PANEL: SKETCH & AI CONVERSION SOURCE                          */}
        {/* ================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: secTextColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>DESIGN SOURCE</span>
            <h3 style={{ margin: '2px 0 0 0', fontSize: '17px', fontWeight: 700, color: textColor }}>Sketch & AI</h3>
          </div>

          {/* Upload Dropzone */}
          {!hasSketch ? (
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) processSketchFile(e.dataTransfer.files[0]); }}
              style={{
                border: `2px dashed ${isDragging ? primaryPink : borderColor}`,
                background: isDragging ? `${primaryPink}08` : inputBg,
                borderRadius: '14px',
                padding: '24px 16px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files[0] && processSketchFile(e.target.files[0])} accept="image/*,application/pdf" style={{ display: 'none' }} />
              
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `${primaryPink}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={20} color={primaryPink} />
              </div>
              <strong style={{ fontSize: '13px', color: textColor }}>Upload your fashion sketch</strong>
              <span style={{ fontSize: '11px', color: secTextColor }}>Drag & drop or browse files</span>
              <span style={{ fontSize: '10px', color: secTextColor }}>PNG · JPG · PDF — up to 20MB</span>

              <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '6px' }}>
                Upload Sketch
              </button>

              <button onClick={useDemoSketch} style={{ padding: '6px 12px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: 'transparent', color: textColor, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                Use Demo Sketch
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${borderColor}`, background: '#FFFFFF', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', color: '#FFFFFF', fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>SKETCH · 01</span>
                <img src={sketchDataUrl} alt="Fashion Sketch" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                  Replace
                </button>
                <button onClick={() => { setHasSketch(false); setSketchDataUrl(null); setAiComplete(false); }} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#EF4444', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* AI Fashion Conversion Progress */}
          {hasSketch && (
            <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
              <strong style={{ fontSize: '12.5px', fontWeight: 700, color: textColor, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <Sparkles size={14} color={primaryPink} />
                <span>AI Fashion Conversion</span>
              </strong>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Analyzing sketch', 'Understanding garment structure', 'Creating 3D garment', 'Applying materials', 'Generating final model'].map((stepLabel, idx) => {
                  const isDone = conversionStep > idx;
                  const isCurrent = conversionStep === idx && isConverting;

                  return (
                    <div key={stepLabel} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: isDone || isCurrent ? textColor : secTextColor }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: isDone ? '#12B76A' : isCurrent ? primaryPink : inputBg,
                        border: `1px solid ${isDone ? '#12B76A' : isCurrent ? primaryPink : borderColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {isDone ? <Check size={11} color="#FFFFFF" strokeWidth={3} /> : <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isCurrent ? '#FFFFFF' : secTextColor }} />}
                      </div>
                      <span style={{ fontWeight: isCurrent || isDone ? 600 : 400 }}>{stepLabel}</span>
                    </div>
                  );
                })}
              </div>

              {aiComplete && (
                <div style={{ marginTop: '14px', padding: '12px', borderRadius: '12px', background: `linear-gradient(135deg, ${primaryPink}15, ${purpleAccent}15)`, border: `1px solid ${primaryPink}30`, textAlign: 'center' }}>
                  <strong style={{ fontSize: '13px', color: textColor, display: 'block' }}>3D Model Generated</strong>
                  <span style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '8px' }}>Your garment is ready to customize</span>
                  <button onClick={() => { setViewMode('3d'); showToast('3D Garment loaded into Studio.'); }} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                    Open in Studio
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Garment Type Selection */}
          <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
            <strong style={{ fontSize: '12.5px', fontWeight: 700, color: textColor, display: 'block', marginBottom: '4px' }}>Garment Type</strong>
            <span style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '10px' }}>{garmentNote}</span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {garmentTypesList.map(gt => {
                const isSelected = garmentType === gt.id;
                return (
                  <div 
                    key={gt.id} 
                    onClick={() => { setGarmentType(gt.id); showToast(`Selected garment type: ${gt.name}`); }}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderColor}`,
                      background: isSelected ? `${primaryPink}08` : inputBg,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{gt.icon}</div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: textColor, display: 'block' }}>{gt.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ================================================================== */}
        {/* CENTER STAGE: THREE.JS 3D VIEWPORT & CAMERA CONTROLS               */}
        {/* ================================================================== */}
        <div style={{ position: 'relative', background: isDark ? '#141126' : '#FAFAFC', border: `1px solid ${borderColor}`, borderRadius: '16px', height: '620px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          {/* Top Mode Toggle Bar */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: 'rgba(24,32,51,0.7)', backdropFilter: 'blur(12px)', padding: '4px', borderRadius: '12px', gap: '4px' }}>
              {['sketch', '3d', 'split'].map(m => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  style={{
                    border: 'none',
                    background: viewMode === m ? primaryPink : 'transparent',
                    color: '#FFFFFF',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {m === 'split' ? 'Split View' : m.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: 'rgba(24,32,51,0.7)', backdropFilter: 'blur(12px)', color: '#FFFFFF', fontSize: '11px', fontWeight: 600, padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                Fabric: {fabricsList.find(f => f.id === selectedFabric)?.name}
              </span>
            </div>
          </div>

          {/* View Modes Rendering */}
          {viewMode === 'split' ? (
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
              <div style={{ flex: 1, borderRight: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#FFFFFF' }}>
                {hasSketch ? <img src={sketchDataUrl} alt="Sketch Split" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: '12px', color: secTextColor }}>No sketch uploaded</span>}
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <canvas ref={glCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
              </div>
            </div>
          ) : viewMode === 'sketch' ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', background: '#FFFFFF' }}>
              {hasSketch ? <img src={sketchDataUrl} alt="Full Sketch" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: '13px', color: secTextColor }}>No sketch uploaded yet. Upload a sketch on the left panel.</span>}
            </div>
          ) : (
            <canvas ref={glCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          )}

          {/* Bottom Floating View Controls Toolbar */}
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, background: 'rgba(24,32,51,0.75)', backdropFilter: 'blur(16px)', padding: '6px 12px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <button onClick={() => { cameraRef.current?.position.set(0, 1.32, zoomDist); garmentGroupRef.current && (garmentGroupRef.current.rotation.y = 0); }} style={{ border: 'none', background: 'transparent', color: '#FFFFFF', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', padding: '4px 8px' }}>
              Front
            </button>
            <button onClick={() => { garmentGroupRef.current && (garmentGroupRef.current.rotation.y = Math.PI); }} style={{ border: 'none', background: 'transparent', color: '#FFFFFF', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', padding: '4px 8px' }}>
              Back
            </button>
            <button onClick={() => { garmentGroupRef.current && (garmentGroupRef.current.rotation.y = Math.PI / 2); }} style={{ border: 'none', background: 'transparent', color: '#FFFFFF', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', padding: '4px 8px' }}>
              Side
            </button>
            <button onClick={() => { autoRotateRef.current = !autoRotateRef.current; showToast(`360° Auto-Rotate ${autoRotateRef.current ? 'ON' : 'OFF'}`); }} style={{ border: 'none', background: autoRotateRef.current ? primaryPink : 'transparent', color: '#FFFFFF', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', padding: '4px 10px', borderRadius: '8px' }}>
              360°
            </button>

            <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.2)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ZoomOut size={14} color="#FFFFFF" style={{ cursor: 'pointer' }} onClick={() => setZoomDist(z => Math.min(z + 0.5, 6))} />
              <input type="range" min="1.6" max="6" step="0.1" value={zoomDist} onChange={(e) => setZoomDist(parseFloat(e.target.value))} style={{ width: '70px', accentColor: primaryPink }} />
              <ZoomIn size={14} color="#FFFFFF" style={{ cursor: 'pointer' }} onClick={() => setZoomDist(z => Math.max(z - 0.5, 1.6))} />
            </div>
          </div>

          {/* AI Design Assistant Floating Action Button */}
          <button 
            onClick={() => setIsAssistantOpen(!isAssistantOpen)}
            style={{
              position: 'absolute',
              right: '20px',
              bottom: '20px',
              zIndex: 30,
              padding: '10px 18px',
              borderRadius: '30px',
              border: 'none',
              background: `linear-gradient(135deg, ${primaryPink}, ${purpleAccent})`,
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(233,0,140,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={16} color="#FFFFFF" />
            <span>AI Assistant</span>
          </button>

          {/* AI Design Assistant Drawer Panel */}
          {isAssistantOpen && (
            <div style={{
              position: 'absolute',
              right: '20px',
              bottom: '70px',
              width: '320px',
              height: '420px',
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '12px 16px', borderBottom: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '13.5px', fontWeight: 700, color: textColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={15} color={primaryPink} />
                  <span>StitchBee Studio AI</span>
                </strong>
                <X size={16} color={secTextColor} style={{ cursor: 'pointer' }} onClick={() => setIsAssistantOpen(false)} />
              </div>

              <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.role === 'user' ? primaryPink : inputBg,
                    color: msg.role === 'user' ? '#FFFFFF' : textColor,
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    maxWidth: '85%',
                    lineHeight: 1.4
                  }}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <div style={{ padding: '10px 14px', borderTop: `1px solid ${borderColor}`, display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  value={assistantInputText}
                  onChange={(e) => setAssistantInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && assistantInputText.trim() && handleAssistantCommand(assistantInputText.trim())}
                  placeholder="e.g. Make it navy blue..."
                  style={{ flex: 1, height: '34px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', outline: 'none' }}
                />
                <button 
                  onClick={() => assistantInputText.trim() && handleAssistantCommand(assistantInputText.trim())}
                  style={{ width: '34px', height: '34px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <Send size={14} color="#FFFFFF" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ================================================================== */}
        {/* RIGHT PANEL: CUSTOMIZE DESIGN (TABS FOR COLOR, FABRIC, PATTERN)     */}
        {/* ================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: secTextColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>LIVE PREVIEW</span>
            <h3 style={{ margin: '2px 0 0 0', fontSize: '17px', fontWeight: 700, color: textColor }}>Customize Design</h3>
          </div>

          {/* Tabs Navigation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', background: inputBg, padding: '4px', borderRadius: '10px' }}>
            {['color', 'fabric', 'pattern', 'details'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveRightTab(tab)}
                style={{
                  border: 'none',
                  background: activeRightTab === tab ? cardBg : 'transparent',
                  color: activeRightTab === tab ? primaryPink : secTextColor,
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '6px 0',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  boxShadow: activeRightTab === tab ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB 1: COLOR CUSTOMIZATION */}
          {activeRightTab === 'color' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Color Role Chips */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['primary', 'secondary', 'accent'].map(r => (
                  <button
                    key={r}
                    onClick={() => setColorRole(r)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: '8px',
                      border: colorRole === r ? `2px solid ${primaryPink}` : `1px solid ${borderColor}`,
                      background: colorRole === r ? `${primaryPink}08` : inputBg,
                      fontSize: '10.5px',
                      fontWeight: 600,
                      color: textColor,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors[r] }} />
                    <span>{r}</span>
                  </button>
                ))}
              </div>

              {/* Color Picker & Hex Input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="color" 
                  value={colors[colorRole]} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setColors(prev => ({ ...prev, [colorRole]: val }));
                    if (!recentColors.includes(val)) setRecentColors([val, ...recentColors.slice(0, 7)]);
                    addVersion(`Updated ${colorRole} color`);
                  }} 
                  style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }} 
                />
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: secTextColor, display: 'block', textTransform: 'capitalize' }}>{colorRole} Color</label>
                  <input 
                    type="text" 
                    value={colors[colorRole].toUpperCase()} 
                    onChange={(e) => setColors(prev => ({ ...prev, [colorRole]: e.target.value }))}
                    style={{ width: '100%', height: '32px', padding: '0 8px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', fontFamily: 'monospace' }} 
                  />
                </div>
              </div>

              {/* Fashion Color Presets */}
              <div>
                <strong style={{ fontSize: '11.5px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '8px' }}>Fashion Presets</strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
                  {colorPresets.map(cp => (
                    <div 
                      key={cp.name}
                      onClick={() => {
                        setColors(prev => ({ ...prev, [colorRole]: cp.hex }));
                        showToast(`Applied color: ${cp.name}`);
                        addVersion(`Applied ${cp.name}`);
                      }}
                      title={cp.name}
                      style={{
                        height: '32px',
                        borderRadius: '8px',
                        background: cp.hex,
                        border: colors[colorRole] === cp.hex ? `2.5px solid ${primaryPink}` : '1px solid rgba(0,0,0,0.1)',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FABRIC SELECTION */}
          {activeRightTab === 'fabric' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {fabricsList.map(f => {
                const isSelected = selectedFabric === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => {
                      setSelectedFabric(f.id);
                      showToast(`Selected fabric: ${f.name}`);
                      addVersion(`Changed fabric to ${f.name}`);
                    }}
                    style={{
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderColor}`,
                      borderRadius: '10px',
                      padding: '10px',
                      cursor: 'pointer',
                      background: isSelected ? `${primaryPink}08` : inputBg
                    }}
                  >
                    <strong style={{ fontSize: '12px', color: textColor, display: 'block' }}>{f.name}</strong>
                    <span style={{ fontSize: '10px', color: secTextColor }}>{f.desc}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: PATTERN SELECTION */}
          {activeRightTab === 'pattern' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {['solid', 'stripes', 'checks', 'floral', 'geometric'].map(p => {
                const isSelected = selectedPattern === p;
                return (
                  <div
                    key={p}
                    onClick={() => {
                      setSelectedPattern(p);
                      showToast(`Applied pattern: ${p}`);
                      addVersion(`Applied ${p} pattern`);
                    }}
                    style={{
                      padding: '10px 4px',
                      borderRadius: '8px',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderColor}`,
                      background: isSelected ? `${primaryPink}08` : inputBg,
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: textColor,
                      textTransform: 'capitalize'
                    }}
                  >
                    {p}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: DETAILS CUSTOMIZATION */}
          {activeRightTab === 'details' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Collar Style</label>
                <select value={details.collar} onChange={(e) => setDetails(prev => ({ ...prev, collar: e.target.value }))} style={{ width: '100%', height: '34px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', padding: '0 8px' }}>
                  <option value="classic">Classic Collar</option>
                  <option value="mandarin">Mandarin Collar</option>
                  <option value="none">No Collar</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Sleeves</label>
                <select value={details.sleeve} onChange={(e) => setDetails(prev => ({ ...prev, sleeve: e.target.value }))} style={{ width: '100%', height: '34px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', padding: '0 8px' }}>
                  <option value="long">Long Sleeves</option>
                  <option value="short">Short Sleeves</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Fit Profile</label>
                <select value={details.fit} onChange={(e) => setDetails(prev => ({ ...prev, fit: e.target.value }))} style={{ width: '100%', height: '34px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', padding: '0 8px' }}>
                  <option value="regular">Regular Fit</option>
                  <option value="slim">Slim Fit</option>
                  <option value="relaxed">Relaxed Fit</option>
                </select>
              </div>
            </div>
          )}

          {/* AI Variations Section */}
          <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '14px' }}>
            <strong style={{ fontSize: '12px', color: textColor, display: 'block', marginBottom: '8px' }}>AI Variations</strong>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {variationsList.map(v => (
                <button
                  key={v.id}
                  onClick={() => {
                    setColors(prev => ({ ...prev, primary: v.primary }));
                    setSelectedFabric(v.fabric);
                    setSelectedPattern(v.pattern);
                    showToast(`Applied variation: ${v.name}`);
                    addVersion(`Loaded ${v.name} variation`);
                  }}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    background: inputBg,
                    color: textColor,
                    fontSize: '10.5px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Version History List */}
          <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '14px' }}>
            <strong style={{ fontSize: '12px', color: textColor, display: 'block', marginBottom: '8px' }}>Version History</strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '120px', overflowY: 'auto' }}>
              {versions.map((ver, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                  <span style={{ color: idx === 0 ? primaryPink : textColor, fontWeight: idx === 0 ? 700 : 400 }}>{ver.label}</span>
                  <span style={{ color: secTextColor, fontSize: '9.5px', fontFamily: 'monospace' }}>{ver.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* -------------------------------------------------------------------- */}
      {/* SAVE MODAL                                                           */}
      {/* -------------------------------------------------------------------- */}
      {isSaveModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '420px', background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: textColor }}>Save Design</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: secTextColor }}>Add details so your atelier team can review this design.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Design Title</label>
                <input type="text" value={designTitle} onChange={(e) => setDesignTitle(e.target.value)} style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button onClick={() => setIsSaveModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setIsSaveModalOpen(false); showToast(`Saved "${designTitle}" to StitchBee Vault.`); }} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Save Design</button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* EXPORT MODAL                                                         */}
      {/* -------------------------------------------------------------------- */}
      {isExportModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '440px', background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: textColor }}>Export Design Package</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: secTextColor }}>Choose how you would like to export "{designTitle}".</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: inputBg }}>
                <div>
                  <strong style={{ fontSize: '12.5px', color: textColor, display: 'block' }}>3D Garment Mesh</strong>
                  <span style={{ fontSize: '10px', color: secTextColor }}>Full geometry with textures</span>
                </div>
                <button onClick={() => { setIsExportModalOpen(false); showToast('3D GLB model downloaded.'); }} style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${primaryPink}`, background: `${primaryPink}12`, color: primaryPink, fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                  GLB
                </button>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: inputBg }}>
                <div>
                  <strong style={{ fontSize: '12.5px', color: textColor, display: 'block' }}>HD Studio Render</strong>
                  <span style={{ fontSize: '10px', color: secTextColor }}>High resolution image</span>
                </div>
                <button onClick={() => { setIsExportModalOpen(false); showToast('HD PNG render downloaded.'); }} style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${primaryPink}`, background: `${primaryPink}12`, color: primaryPink, fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                  PNG
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setIsExportModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
