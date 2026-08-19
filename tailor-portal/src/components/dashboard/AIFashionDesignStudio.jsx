import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Sparkles, RefreshCw, RotateCw, ZoomIn, ZoomOut, Maximize2, 
  Check, X, Eye, Download, Share2, Play, Sliders, ChevronDown, 
  Layers, Sun, Moon, Info, HelpCircle, ArrowLeft, ArrowRight, ShieldCheck,
  FileText, Box, Video, Plus, Trash2, Heart, MessageSquare, Send, Copy, 
  Minimize2, Undo, Redo, CheckCircle2, SlidersHorizontal, Image as ImageIcon,
  Camera, ChevronLeft, ChevronRight, Settings, Sliders as SlidersIcon,
  Circle, HelpCircle as HelpIcon, Edit3, CornerUpLeft, CornerUpRight,
  Hand, Sun as SunLight, Share, Folder, Grid, Scissors
} from 'lucide-react';
import * as THREE from 'three';

export default function AIFashionDesignStudio({ theme = 'light', onNavigateTab }) {
  const isDark = theme === 'dark';

  // --------------------------------------------------------------------------
  // STITCHBEE BRAND THEME COLOR TOKENS
  // --------------------------------------------------------------------------
  const primaryPink = '#E9008C';
  const primaryPinkHover = '#D0007D';
  const secondaryPurple = '#9B1DDB';
  const purpleHover = '#8616C2';
  const primaryGradient = 'linear-gradient(135deg, #E9008C 0%, #9B1DDB 100%)';
  
  const textPrimary = isDark ? '#F9FAFB' : '#101828';
  const textSecondary = isDark ? '#9CA3AF' : '#475467';
  const textMuted = isDark ? '#6B7280' : '#667085';

  const appBg = isDark ? '#0D0A1A' : '#F8F9FA';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const secondaryBg = isDark ? '#141124' : '#F9FAFB';
  const inputBg = isDark ? '#231D34' : '#FFFFFF';
  const pinkTint = isDark ? 'rgba(233,0,140,0.15)' : '#FFF0F7';
  const purpleTint = isDark ? 'rgba(155,29,219,0.15)' : '#F8F0FF';

  const borderDefault = isDark ? 'rgba(255, 255, 255, 0.12)' : '#EAECF0';
  const borderLight = isDark ? 'rgba(255, 255, 255, 0.08)' : '#F2F4F7';

  // --------------------------------------------------------------------------
  // GLOBAL WORKSPACE STATE
  // --------------------------------------------------------------------------
  const [designTitle, setDesignTitle] = useState('Untitled Design');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [autosaveText, setAutosaveText] = useState('Auto-saved');

  // Mode & View States
  const [viewportMode, setViewportMode] = useState('3d'); // 'sketch' | '3d' | 'split'
  const [activeTool, setActiveTool] = useState('rotate'); // 'rotate' | 'pan' | 'zoom-in' | 'zoom-out' | 'light'
  
  // Sketch Upload State
  const [uploadedSketch, setUploadedSketch] = useState('/br_b1.jpg');
  const [sketchFileName, setSketchFileName] = useState('Shirt_Sketch.png');
  const [sketchFileSize, setSketchFileSize] = useState('2.4 MB');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // AI Pipeline Steps (Timeline Stepper)
  const [aiStepProgress, setAiStepProgress] = useState(4); // 0 to 4
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Garment Customization State
  const [selectedGarment, setSelectedGarment] = useState('shirt'); // 'shirt' | 'jacket' | 'dress' | 'gown'
  const [colorRole, setColorRole] = useState('primary'); // 'primary' | 'secondary' | 'accent'
  const [colors, setColors] = useState({
    primary: '#1A2A4D',
    secondary: '#F2F2F2',
    accent: '#D4AF37'
  });

  const [selectedFabric, setSelectedFabric] = useState('Silk');
  const [selectedPattern, setSelectedPattern] = useState('Solid');
  const [selectedDetailPart, setSelectedDetailPart] = useState('Collar');

  const [garmentDetails, setGarmentDetails] = useState({
    collar: 'Classic',
    sleeves: 'Long',
    cuffs: 'Button Cuff',
    buttons: 'Matching',
    pockets: 'Single Chest',
    fit: 'Regular'
  });

  // Variations & Version History
  const [selectedVariation, setSelectedVariation] = useState('original');
  const [versionList, setVersionList] = useState([
    { id: 'v3', label: 'Design v3', time: '2 hours ago', isCurrent: false },
    { id: 'v2', label: 'Design v2', time: 'Yesterday', isCurrent: false },
    { id: 'v1', label: 'Design v1', time: '2 days ago', isCurrent: false },
    { id: 'v_curr', label: 'Current Version', time: 'Just now', isCurrent: true }
  ]);

  // AI Assistant Chat State
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);
  const [assistantInput, setAssistantInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Welcome to StitchBee Studio AI! What would you like to change on your design?' }
  ]);

  // Modals & Toast State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // --------------------------------------------------------------------------
  // HELPER FUNCTIONS (PRE-DECLARED BEFORE USE)
  // --------------------------------------------------------------------------
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const addVersionRecord = (title) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVersionList(prev => [
      { id: `v_${Date.now()}`, label: `Design v${prev.length + 1}`, time: 'Just now', isCurrent: true },
      ...prev.map(v => ({ ...v, isCurrent: false }))
    ]);
  };

  // --------------------------------------------------------------------------
  // DATA DEFINITIONS (Fabrics, Patterns, Variations, Details)
  // --------------------------------------------------------------------------
  const fabricsList = [
    { name: 'Cotton', desc: 'Matte · breathable', roughness: 0.88, metalness: 0.02, img: '/fab3.jpg' },
    { name: 'Linen', desc: 'Textured · natural', roughness: 0.92, metalness: 0.0, img: '/fab4.jpg' },
    { name: 'Silk', desc: 'Lustrous · fluid', roughness: 0.18, metalness: 0.05, img: '/fab1.jpg' },
    { name: 'Denim', desc: 'Rugged · woven', roughness: 0.8, metalness: 0.0, img: '/fab5.jpg' },
    { name: 'Wool', desc: 'Warm · tailored', roughness: 0.95, metalness: 0.0, img: '/fab2.jpg' }
  ];

  const patternsList = [
    { name: 'Solid', desc: 'Clean uniform color' },
    { name: 'Stripes', desc: 'Pinstripe pattern' },
    { name: 'Checks', desc: 'Classic plaid check' },
    { name: 'Floral', desc: 'Botanical motif' },
    { name: 'Geometric', desc: 'Modern repeating' }
  ];

  const colorPresetsList = ['#1A2A4D', '#FFFFFF', '#101828', '#CBB994', '#7A3B3F', '#8C1F28', '#E9008C', '#9B1DDB', '#10B981'];

  const variationsList = [
    { id: 'original', name: 'Original', color: '#1A2A4D', img: '/br_b1.jpg' },
    { id: 'modern', name: 'Modern', color: '#475467', img: '/b5.jpg' },
    { id: 'luxury', name: 'Luxury', color: '#101828', img: '/b7.jpg' },
    { id: 'minimal', name: 'Minimal', color: '#EFEAE1', img: '/b3.jpg' },
    { id: 'experimental', name: 'Experimental', color: '#EAB308', img: '/b4.jpg' }
  ];

  const detailParts = [
    { id: 'Collar', label: 'Collar', icon: '👔' },
    { id: 'Sleeves', label: 'Sleeves', icon: '🧥' },
    { id: 'Cuffs', label: 'Cuffs', icon: '🧤' },
    { id: 'Buttons', label: 'Buttons', icon: '🔘' },
    { id: 'Pockets', label: 'Pockets', icon: '👝' }
  ];

  // --------------------------------------------------------------------------
  // SKETCH UPLOAD & AI PIPELINE HANDLERS
  // --------------------------------------------------------------------------
  const processSketchUpload = (file) => {
    setUploadError('');
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedSketch(e.target.result);
      setSketchFileName(file.name);
      setSketchFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      showToast(`Uploaded "${file.name}"`);
      runAiConversionPipeline();
    };
    reader.readAsDataURL(file);
  };

  const runAiConversionPipeline = () => {
    setIsAiProcessing(true);
    setAiStepProgress(0);

    const steps = [0, 1, 2, 3, 4];
    steps.forEach((stepIdx) => {
      setTimeout(() => {
        setAiStepProgress(stepIdx);
        if (stepIdx === 4) {
          setIsAiProcessing(false);
          showToast('3D Model successfully generated!');
          addVersionRecord('3D Model Generated');
        }
      }, (stepIdx + 1) * 600);
    });
  };

  // AI Assistant Natural Language Command Interpreter
  const handleAssistantPrompt = (promptText) => {
    if (!promptText.trim()) return;
    const lower = promptText.toLowerCase();
    const newMsgs = [...chatMessages, { role: 'user', text: promptText }];
    let reply = "Updated design settings!";

    if (lower.includes('blue') || lower.includes('navy')) {
      setColors(prev => ({ ...prev, primary: '#1A2A4D' }));
      reply = "Changed primary garment color to Navy Blue.";
    } else if (lower.includes('pink') || lower.includes('magenta')) {
      setColors(prev => ({ ...prev, primary: '#E9008C' }));
      reply = "Changed primary color to StitchBee Pink.";
    } else if (lower.includes('silk')) {
      setSelectedFabric('Silk');
      reply = "Applied Raw Silk material texture.";
    } else if (lower.includes('mandarin')) {
      setGarmentDetails(prev => ({ ...prev, collar: 'Mandarin' }));
      reply = "Applied Mandarin Band Collar.";
    } else if (lower.includes('short')) {
      setGarmentDetails(prev => ({ ...prev, sleeves: 'Short' }));
      reply = "Adjusted sleeves to Short length.";
    }

    newMsgs.push({ role: 'ai', text: reply });
    setChatMessages(newMsgs);
    setAssistantInput('');
    showToast(reply);
    addVersionRecord('AI Command Applied');
  };

  // --------------------------------------------------------------------------
  // THREE.JS 3D CANVAS & LATHE GARMENT ENGINE
  // --------------------------------------------------------------------------
  const glCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const garmentMeshGroupRef = useRef(null);
  const mannequinGroupRef = useRef(null);
  const autoRotateRef = useRef(false);
  const [is3DAutoRotate, setIs3DAutoRotate] = useState(false);
  const [zoomVal, setZoomVal] = useState(3.4);

  const rebuild3DGarmentMesh = () => {
    if (!garmentMeshGroupRef.current) return;
    const gGroup = garmentMeshGroupRef.current;
    gGroup.clear();

    const selectedF = fabricsList.find(f => f.name === selectedFabric) || fabricsList[0];
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.primary),
      roughness: selectedF.roughness,
      metalness: selectedF.metalness,
      side: THREE.DoubleSide
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.secondary),
      roughness: 0.4,
      metalness: 0.2
    });

    const isLongForm = selectedGarment === 'dress' || selectedGarment === 'gown';
    const hemY = selectedGarment === 'gown' ? 0.03 : 0.78;

    const pts = [];
    pts.push(new THREE.Vector2(isLongForm ? 0.36 : 0.30, hemY));
    if (isLongForm) {
      pts.push(new THREE.Vector2(0.30, 0.65));
      pts.push(new THREE.Vector2(0.255, 0.92));
    }
    pts.push(new THREE.Vector2(0.265, 1.00));
    pts.push(new THREE.Vector2(0.30, 1.20));
    pts.push(new THREE.Vector2(0.335, 1.34));
    pts.push(new THREE.Vector2(0.30, 1.46));
    pts.push(new THREE.Vector2(0.09, 1.545));

    const torsoGeo = new THREE.LatheGeometry(pts, 40);
    const torso = new THREE.Mesh(torsoGeo, mat);
    torso.castShadow = true;
    torso.receiveShadow = true;
    gGroup.add(torso);

    // Sleeves
    const sleeveLen = garmentDetails.sleeves === 'Short' ? 0.22 : 0.56;
    [-1, 1].forEach(side => {
      const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.072, sleeveLen, 18), mat);
      sleeve.position.set(side * 0.335, 1.34, 0);
      sleeve.rotation.z = side * (Math.PI / 2 - 0.32);
      sleeve.position.x = side * (0.335 + Math.cos(0.32) * sleeveLen / 2 * 0.9);
      sleeve.position.y = 1.34 - Math.sin(0.32) * sleeveLen / 2 * 0.9;
      sleeve.castShadow = true;
      gGroup.add(sleeve);
    });

    // Collars
    if (garmentDetails.collar === 'Mandarin') {
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.098, 0.09, 0.055, 28, 1, true), trimMat);
      collar.position.set(0, 1.585, 0);
      gGroup.add(collar);
    } else if (garmentDetails.collar === 'Classic') {
      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.02, 10, 28, Math.PI * 1.5), trimMat);
      collar.position.set(0, 1.55, 0.01);
      collar.rotation.x = Math.PI / 2 + 0.25;
      collar.rotation.z = Math.PI * 0.25;
      gGroup.add(collar);
    }
  };

  useEffect(() => {
    if (!glCanvasRef.current) return;
    const canvas = glCanvasRef.current;
    const width = canvas.parentElement?.clientWidth || 600;
    const height = canvas.parentElement?.clientHeight || 560;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 1.32, zoomVal);
    camera.lookAt(0, 1.15, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    const hemi = new THREE.HemisphereLight(0xF8F0DD, 0x151310, 0.65);
    scene.add(hemi);

    const dirKey = new THREE.DirectionalLight(0xffffff, 1.25);
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

    // Mannequin Head & Neck
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

    const gGroup = new THREE.Group();
    garmentMeshGroupRef.current = gGroup;
    scene.add(gGroup);

    rebuild3DGarmentMesh();

    let animId;
    let targetRotY = 0.35;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotateRef.current) {
        targetRotY += 0.006;
      }
      gGroup.rotation.y += (targetRotY - gGroup.rotation.y) * 0.1;
      mannequinGroup.rotation.y = gGroup.rotation.y;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [theme, isDark]);

  useEffect(() => {
    rebuild3DGarmentMesh();
  }, [colors, selectedFabric, selectedGarment, garmentDetails]);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: appBg, color: textPrimary, minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Toast Alert */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#101828',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: '0 4px 14px rgba(16, 24, 40, 0.15)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: `1px solid ${primaryPink}`
        }}>
          <CheckCircle2 size={16} color={primaryPink} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 1. TOP HEADER BAR (EXACT REFERENCE UI)                               */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        height: '60px',
        padding: '0 28px',
        borderBottom: `1px solid ${borderDefault}`,
        background: cardBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        {/* Left: StitchBee Brand Logo & App Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: primaryGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '15px' }}>
              S
            </div>
            <strong style={{ fontSize: '16px', fontWeight: 800, color: textPrimary, letterSpacing: '-0.02em' }}>StitchBee</strong>
          </div>
          <span style={{ color: textMuted, fontSize: '14px' }}>/</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: textSecondary }}>Designer Studio</span>
        </div>

        {/* Center: Title & Autosave & Undo/Redo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isEditingTitle ? (
              <input 
                type="text" 
                value={designTitle}
                onChange={(e) => setDesignTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                autoFocus
                style={{ fontSize: '14px', fontWeight: 600, color: textPrimary, border: `1px solid ${primaryPink}`, padding: '2px 8px', borderRadius: '4px', outline: 'none' }}
              />
            ) : (
              <strong onClick={() => setIsEditingTitle(true)} style={{ fontSize: '14px', fontWeight: 600, color: textPrimary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{designTitle}</span>
                <Edit3 size={13} color={textMuted} />
              </strong>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#12B76A', marginLeft: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#12B76A' }} />
              <span>{autosaveText}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', borderLeft: `1px solid ${borderDefault}`, paddingLeft: '12px' }}>
            <button title="Undo" style={{ border: 'none', background: 'transparent', color: textSecondary, padding: '5px', cursor: 'pointer' }}>
              <CornerUpLeft size={16} />
            </button>
            <button title="Redo" style={{ border: 'none', background: 'transparent', color: textSecondary, padding: '5px', cursor: 'pointer' }}>
              <CornerUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Right: Actions & User Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setViewportMode(m => m === '3d' ? 'sketch' : '3d')}
            style={{ height: '34px', padding: '0 14px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Eye size={14} color={textMuted} />
            <span>Preview</span>
          </button>

          <button 
            onClick={() => setIsSaveModalOpen(true)}
            style={{ height: '34px', padding: '0 14px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <FileText size={14} color={textMuted} />
            <span>Save Design</span>
          </button>

          <button 
            onClick={() => setIsExportModalOpen(true)}
            style={{ height: '34px', padding: '0 16px', borderRadius: '6px', border: 'none', background: primaryGradient, color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(233,0,140,0.22)' }}
          >
            <Download size={14} color="#FFFFFF" />
            <span>Export ˅</span>
          </button>

          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E0E7FF', border: `1.5px solid ${primaryPink}`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: primaryPink }}>AR</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. TOP MAIN 3-COLUMN STUDIO WORKSPACE (EXACT REFERENCE LAYOUT)        */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr 320px',
        gap: '16px',
        padding: '20px 28px 16px 28px',
        alignItems: 'start'
      }}>

        {/* ================================================================== */}
        {/* LEFT COLUMN: DESIGN SOURCE & AI CONVERSION TIMELINE                */}
        {/* ================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textPrimary }}>Design Source</h3>
            <span style={{ fontSize: '12px', color: textMuted, cursor: 'pointer' }}>‹</span>
          </div>

          {/* Step 1: Upload Sketch */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: primaryPink, color: '#FFFFFF', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
              <strong style={{ fontSize: '12.5px', color: textPrimary }}>Upload Sketch</strong>
            </div>

            {uploadedSketch ? (
              <div style={{ border: `1px dashed ${borderDefault}`, borderRadius: '10px', padding: '10px', background: secondaryBg, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ height: '160px', borderRadius: '8px', overflow: 'hidden', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${borderDefault}` }}>
                  <img src={uploadedSketch} alt="Sketch Source" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                  <span style={{ fontWeight: 600, color: textPrimary }}>{sketchFileName}</span>
                  <CheckCircle2 size={13} color="#12B76A" />
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ flex: 1, height: '30px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <RefreshCw size={11} /> Replace
                  </button>
                  <button onClick={() => { setUploadedSketch(null); showToast('Removed sketch'); }} style={{ flex: 1, height: '30px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#F04438', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <Trash2 size={11} /> Remove
                  </button>
                </div>
                <input type="file" ref={fileInputRef} onChange={(e) => e.target.files[0] && processSketchUpload(e.target.files[0])} accept="image/*" style={{ display: 'none' }} />
              </div>
            ) : (
              <div onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ height: '160px', border: `1.5px dashed ${primaryPink}`, borderRadius: '10px', background: pinkTint, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                <Upload size={20} color={primaryPink} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: primaryPink }}>Click to upload sketch</span>
                <input type="file" ref={fileInputRef} onChange={(e) => e.target.files[0] && processSketchUpload(e.target.files[0])} accept="image/*" style={{ display: 'none' }} />
              </div>
            )}
          </div>

          {/* Step 2: AI Fashion Conversion Vertical Timeline */}
          <div style={{ borderTop: `1px solid ${borderDefault}`, paddingTop: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: primaryPink, color: '#FFFFFF', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
              <strong style={{ fontSize: '12.5px', color: textPrimary }}>AI Fashion Conversion</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '4px' }}>
              {[
                'Analyzing sketch',
                'Understanding garment structure',
                'Creating 3D garment',
                'Applying materials',
                'Generating final model'
              ].map((stepLabel, idx) => {
                const isCompleted = aiStepProgress > idx;
                const isCurrent = aiStepProgress === idx;

                return (
                  <div key={stepLabel} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: isCompleted ? '#12B76A' : isCurrent ? primaryPink : secondaryBg,
                      border: `1px solid ${isCompleted ? '#12B76A' : isCurrent ? primaryPink : borderDefault}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isCompleted ? <Check size={10} color="#FFFFFF" strokeWidth={3} /> : <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: isCurrent ? '#FFFFFF' : textMuted }} />}
                    </div>
                    <span style={{ fontWeight: isCompleted || isCurrent ? 600 : 400, color: isCompleted || isCurrent ? textPrimary : textMuted }}>
                      {stepLabel}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* AI Hologram Widget */}
            <div style={{ marginTop: '14px', padding: '12px', borderRadius: '10px', background: secondaryBg, border: `1px solid ${borderDefault}`, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#12B76A', fontSize: '12px', fontWeight: 700 }}>
                <span>3D Model Generated</span>
                <CheckCircle2 size={14} color="#12B76A" />
              </div>

              <button 
                onClick={runAiConversionPipeline}
                style={{ width: '100%', height: '34px', marginTop: '4px', borderRadius: '8px', border: 'none', background: primaryGradient, color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <span>Open in Studio →</span>
              </button>
            </div>

          </div>

        </div>

        {/* ================================================================== */}
        {/* CENTER COLUMN: MAIN CYCLORAMA 3D VIEWPORT                          */}
        {/* ================================================================== */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderDefault}`,
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Top Mode Toggle */}
          <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', background: secondaryBg, padding: '3px', borderRadius: '8px', border: `1px solid ${borderDefault}`, gap: '4px' }}>
              <button onClick={() => setViewportMode('sketch')} style={{ border: 'none', background: viewportMode === 'sketch' ? primaryPink : 'transparent', color: viewportMode === 'sketch' ? '#FFFFFF' : textSecondary, fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}>Sketch</button>
              <button onClick={() => setViewportMode('3d')} style={{ border: 'none', background: viewportMode === '3d' ? primaryPink : 'transparent', color: viewportMode === '3d' ? '#FFFFFF' : textSecondary, fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}>3D View</button>
            </div>
            <button title="Fullscreen" style={{ width: '30px', height: '30px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Maximize2 size={13} color={textPrimary} />
            </button>
          </div>

          {/* 3D Viewport Stage */}
          <div style={{ position: 'relative', height: '560px', borderRadius: '10px', overflow: 'hidden', background: isDark ? '#100E0B' : '#F5F3EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {viewportMode === 'sketch' ? (
              <img src={uploadedSketch} alt="Sketch Stage" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
            ) : (
              <canvas ref={glCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            )}

            {/* Right Floating Tool Dock */}
            <div style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#FFFFFF',
              border: `1px solid ${borderDefault}`,
              borderRadius: '24px',
              padding: '8px 6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 4px 14px rgba(16, 24, 40, 0.1)',
              zIndex: 20
            }}>
              <button onClick={() => setActiveTool('rotate')} title="Orbit / Rotate" style={{ border: 'none', background: activeTool === 'rotate' ? pinkTint : 'transparent', color: activeTool === 'rotate' ? primaryPink : textSecondary, width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <RotateCw size={15} />
              </button>
              <button onClick={() => setActiveTool('pan')} title="Pan Mode" style={{ border: 'none', background: activeTool === 'pan' ? pinkTint : 'transparent', color: activeTool === 'pan' ? primaryPink : textSecondary, width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Hand size={15} />
              </button>
              <button onClick={() => setActiveTool('zoom-in')} title="Zoom In" style={{ border: 'none', background: activeTool === 'zoom-in' ? pinkTint : 'transparent', color: activeTool === 'zoom-in' ? primaryPink : textSecondary, width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ZoomIn size={15} />
              </button>
              <button onClick={() => setActiveTool('zoom-out')} title="Zoom Out" style={{ border: 'none', background: activeTool === 'zoom-out' ? pinkTint : 'transparent', color: activeTool === 'zoom-out' ? primaryPink : textSecondary, width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ZoomOut size={15} />
              </button>
              <button onClick={() => setActiveTool('light')} title="Studio Light" style={{ border: 'none', background: activeTool === 'light' ? pinkTint : 'transparent', color: activeTool === 'light' ? primaryPink : textSecondary, width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <SunLight size={15} />
              </button>
            </div>

            {/* Bottom Floating Control Dock */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              background: '#FFFFFF',
              border: `1px solid ${borderDefault}`,
              padding: '6px 16px',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 4px 14px rgba(16, 24, 40, 0.1)'
            }}>
              {['Front', 'Back', 'Side'].map(pos => (
                <button 
                  key={pos}
                  onClick={() => { garmentMeshGroupRef.current && (garmentMeshGroupRef.current.rotation.y = pos === 'Front' ? 0 : pos === 'Back' ? Math.PI : Math.PI / 2); }}
                  style={{ border: 'none', background: 'transparent', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>{pos}</span>
                </button>
              ))}

              <div style={{ width: '1px', height: '14px', background: borderDefault }} />

              <button 
                onClick={() => { autoRotateRef.current = !autoRotateRef.current; setIs3DAutoRotate(autoRotateRef.current); showToast(`360 Auto-Rotate ${autoRotateRef.current ? 'ON' : 'OFF'}`); }}
                style={{ border: 'none', background: is3DAutoRotate ? primaryPink : 'transparent', color: is3DAutoRotate ? '#FFFFFF' : textPrimary, fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RotateCw size={12} />
                <span>360°</span>
              </button>

              <button onClick={() => showToast('Zoom adjust')} style={{ border: 'none', background: 'transparent', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ZoomIn size={12} />
                <span>Zoom</span>
              </button>

              <button onClick={() => { garmentMeshGroupRef.current && (garmentMeshGroupRef.current.rotation.y = 0.35); }} style={{ border: 'none', background: 'transparent', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <RefreshCw size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* RIGHT COLUMN: CUSTOMIZE DESIGN (EXACT REFERENCE CARD)               */}
        {/* ================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color={primaryPink} />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textPrimary }}>Customize Design</h3>
          </div>

          {/* 1. COLOR SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>COLOR</span>
            
            <div style={{ display: 'flex', gap: '6px' }}>
              {['primary', 'secondary', 'accent'].map(r => (
                <div 
                  key={r}
                  onClick={() => setColorRole(r)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '8px',
                    border: colorRole === r ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                    background: colorRole === r ? pinkTint : secondaryBg,
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '10px', color: textMuted, display: 'block', textTransform: 'capitalize' }}>{r}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: colors[r], border: '1px solid rgba(0,0,0,0.15)' }} />
                    <span style={{ fontSize: '10.5px', fontFamily: 'monospace', fontWeight: 600, color: textPrimary }}>{colors[r]}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Circular Color Wheel & Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '4px' }}>
              <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                <input 
                  type="color" 
                  value={colors[colorRole]} 
                  onChange={(e) => setColors(prev => ({ ...prev, [colorRole]: e.target.value }))}
                  style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
                />
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)',
                  boxShadow: 'inset 0 0 0 4px #FFFFFF, 0 2px 8px rgba(0,0,0,0.15)'
                }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: textPrimary }}>Presets</span>
                  <span style={{ fontSize: '10px', color: textMuted }}>Recent ˅</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                  {colorPresetsList.slice(0, 5).map(hex => (
                    <div 
                      key={hex}
                      onClick={() => setColors(prev => ({ ...prev, [colorRole]: hex }))}
                      style={{ height: '22px', borderRadius: '6px', background: hex, border: colors[colorRole] === hex ? `2px solid ${primaryPink}` : '1px solid rgba(0,0,0,0.15)', cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. FABRIC SECTION */}
          <div style={{ borderTop: `1px solid ${borderDefault}`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>FABRIC</span>
              <span style={{ fontSize: '11px', color: primaryPink, fontWeight: 600, cursor: 'pointer' }}>View all &gt;</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
              {fabricsList.map(f => {
                const isSelected = selectedFabric === f.name;
                return (
                  <div
                    key={f.name}
                    onClick={() => { setSelectedFabric(f.name); showToast(`Selected fabric: ${f.name}`); }}
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: isSelected ? pinkTint : secondaryBg,
                      cursor: 'pointer',
                      textAlign: 'center',
                      padding: '4px'
                    }}
                  >
                    <img src={f.img} alt={f.name} style={{ width: '100%', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                    <span style={{ fontSize: '10px', fontWeight: 600, color: isSelected ? primaryPink : textPrimary, display: 'block', marginTop: '2px' }}>{f.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. PATTERN SECTION */}
          <div style={{ borderTop: `1px solid ${borderDefault}`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>PATTERN</span>
              <span style={{ fontSize: '11px', color: primaryPink, fontWeight: 600, cursor: 'pointer' }}>View all &gt;</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
              {patternsList.map(p => {
                const isSelected = selectedPattern === p.name;
                return (
                  <button
                    key={p.name}
                    onClick={() => { setSelectedPattern(p.name); showToast(`Selected pattern: ${p.name}`); }}
                    style={{
                      height: '34px',
                      borderRadius: '6px',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: isSelected ? pinkTint : secondaryBg,
                      color: isSelected ? primaryPink : textPrimary,
                      fontSize: '10.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. GARMENT DETAILS SECTION */}
          <div style={{ borderTop: `1px solid ${borderDefault}`, paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>GARMENT DETAILS</span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
              {detailParts.map(part => {
                const isSelected = selectedDetailPart === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => setSelectedDetailPart(part.id)}
                    style={{
                      height: '42px',
                      borderRadius: '8px',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: isSelected ? pinkTint : secondaryBg,
                      color: isSelected ? primaryPink : textPrimary,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '14px' }}>{part.icon}</span>
                    <span style={{ fontSize: '9.5px', fontWeight: 600 }}>{part.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 3. BOTTOM CAROUSELS & PANELS ROW (EXACT REFERENCE BOTTOM ROW)        */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr 220px 240px',
        gap: '16px',
        padding: '0 28px',
        alignItems: 'start'
      }}>

        {/* PANEL 1: AI DESIGN ASSISTANT DRAWER CARD */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={15} color={primaryPink} />
              <strong style={{ fontSize: '13.5px', color: textPrimary }}>AI Design Assistant</strong>
            </div>
            <X size={14} color={textMuted} style={{ cursor: 'pointer' }} onClick={() => setIsAssistantOpen(!isAssistantOpen)} />
          </div>

          <span style={{ fontSize: '11px', color: textMuted }}>What would you like to change?</span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              'Make this shirt navy blue',
              'Change fabric to silk',
              'Add a Mandarin collar',
              'Make the sleeves shorter'
            ].map(promptPill => (
              <button
                key={promptPill}
                onClick={() => handleAssistantPrompt(promptPill)}
                style={{
                  textAlign: 'left',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${borderDefault}`,
                  background: secondaryBg,
                  color: textPrimary,
                  fontSize: '11px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                {promptPill}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
            <input 
              type="text" 
              value={assistantInput}
              onChange={(e) => setAssistantInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAssistantPrompt(assistantInput)}
              placeholder="Ask AI assistant..."
              style={{ flex: 1, height: '32px', padding: '0 8px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '11.5px', outline: 'none' }}
            />
            <button onClick={() => handleAssistantPrompt(assistantInput)} style={{ padding: '0 10px', height: '32px', borderRadius: '6px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>
              Send
            </button>
          </div>
        </div>

        {/* PANEL 2: AI VARIATIONS THUMBNAIL CAROUSEL */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '13.5px', color: textPrimary }}>AI Variations</strong>
            <span style={{ fontSize: '11px', color: primaryPink, fontWeight: 600, cursor: 'pointer' }}>View all &gt;</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {variationsList.map(v => {
              const isSelected = selectedVariation === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVariation(v.id);
                    setColors(prev => ({ ...prev, primary: v.color }));
                    showToast(`Loaded ${v.name} variation`);
                  }}
                  style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                    cursor: 'pointer',
                    background: secondaryBg,
                    position: 'relative'
                  }}
                >
                  <img src={v.img} alt={v.name} style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
                  <span style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: textPrimary, padding: '4px', textAlign: 'center' }}>{v.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL 3: VERSIONS HISTORY PANEL */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <strong style={{ fontSize: '13.5px', color: textPrimary }}>Versions</strong>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {versionList.map(v => (
              <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', padding: '6px 8px', borderRadius: '6px', background: v.isCurrent ? pinkTint : secondaryBg }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {v.isCurrent ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#12B76A' }} /> : <FileText size={12} color={textMuted} />}
                  <span style={{ fontWeight: v.isCurrent ? 700 : 500, color: v.isCurrent ? primaryPink : textPrimary }}>{v.label}</span>
                </div>
                <span style={{ fontSize: '9.5px', color: textMuted }}>{v.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 4: EXPORT DESIGN PANEL */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color={primaryPink} />
            <strong style={{ fontSize: '13.5px', color: textPrimary }}>Export Design</strong>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <button onClick={() => showToast('Exporting 3D Model...')} style={{ padding: '8px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: secondaryBg, textAlign: 'left', cursor: 'pointer' }}>
              <strong style={{ fontSize: '11px', color: textPrimary, display: 'block' }}>Export 3D Model</strong>
              <span style={{ fontSize: '9.5px', color: textMuted }}>GLB, GLTF, OBJ</span>
            </button>

            <button onClick={() => showToast('Exporting Images...')} style={{ padding: '8px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: secondaryBg, textAlign: 'left', cursor: 'pointer' }}>
              <strong style={{ fontSize: '11px', color: textPrimary, display: 'block' }}>Export Images</strong>
              <span style={{ fontSize: '9.5px', color: textMuted }}>PNG, JPG</span>
            </button>

            <button onClick={() => showToast('Exporting Sketch + 3D...')} style={{ padding: '8px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: secondaryBg, textAlign: 'left', cursor: 'pointer' }}>
              <strong style={{ fontSize: '11px', color: textPrimary, display: 'block' }}>Sketch + 3D</strong>
              <span style={{ fontSize: '9.5px', color: textMuted }}>ZIP Archive</span>
            </button>

            <button onClick={() => showToast('Share link copied!')} style={{ padding: '8px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: secondaryBg, textAlign: 'left', cursor: 'pointer' }}>
              <strong style={{ fontSize: '11px', color: textPrimary, display: 'block' }}>Share Design</strong>
              <span style={{ fontSize: '9.5px', color: textMuted }}>Invite & Share</span>
            </button>
          </div>
        </div>

      </div>

      {/* SAVE MODAL */}
      {isSaveModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 24, 40, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '400px', background: cardBg, borderRadius: '12px', padding: '20px', border: `1px solid ${borderDefault}`, boxShadow: '0 4px 12px rgba(16, 24, 40, 0.15)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: textPrimary }}>Save Design</h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: textSecondary }}>Save design draft to StitchBee Vault.</p>

            <div>
              <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '3px' }}>Design Title</label>
              <input type="text" value={designTitle} onChange={(e) => setDesignTitle(e.target.value)} style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12.5px' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '18px' }}>
              <button onClick={() => setIsSaveModalOpen(false)} style={{ height: '34px', padding: '0 14px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setIsSaveModalOpen(false); showToast(`Saved "${designTitle}" to Vault.`); }} style={{ height: '34px', padding: '0 16px', borderRadius: '6px', border: 'none', background: primaryGradient, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Save Design</button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {isExportModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 24, 40, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '440px', background: cardBg, borderRadius: '12px', padding: '20px', border: `1px solid ${borderDefault}`, boxShadow: '0 4px 12px rgba(16, 24, 40, 0.15)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: textPrimary }}>Export Package</h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: textSecondary }}>Export options for "{designTitle}".</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: 'HD Image (PNG / JPG)', desc: 'High resolution render', fmt: 'PNG' },
                { title: '3D Model (GLB)', desc: '3D mesh geometry', fmt: 'GLB' },
                { title: 'Design Sheet (PDF)', desc: 'Atelier production sheet', fmt: 'PDF' },
                { title: '360° Video (MP4)', desc: 'Turntable video', fmt: 'MP4' }
              ].map(opt => (
                <div key={opt.title} style={{ padding: '10px', borderRadius: '6px', border: `1px solid ${borderDefault}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: secondaryBg }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: textPrimary, display: 'block' }}>{opt.title}</strong>
                    <span style={{ fontSize: '10.5px', color: textMuted }}>{opt.desc}</span>
                  </div>
                  <button onClick={() => { setIsExportModalOpen(false); showToast(`Exporting ${opt.fmt} package...`); }} style={{ height: '30px', padding: '0 12px', borderRadius: '6px', border: `1px solid ${primaryPink}`, background: pinkTint, color: primaryPink, fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>
                    {opt.fmt}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setIsExportModalOpen(false)} style={{ height: '34px', padding: '0 14px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
