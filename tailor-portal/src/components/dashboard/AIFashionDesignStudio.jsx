import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Sparkles, RefreshCw, RotateCw, ZoomIn, ZoomOut, Maximize2, 
  Check, X, Eye, Download, Share2, Play, Sliders, ChevronDown, 
  Layers, Sun, Moon, Info, HelpCircle, ArrowLeft, ArrowRight, ShieldCheck,
  FileText, Box, Video, Plus, Trash2, Heart, MessageSquare, Send, Copy, 
  Minimize2, Undo, Redo, CheckCircle2, SlidersHorizontal, Image as ImageIcon,
  Camera, ChevronLeft, ChevronRight, Settings, Sliders as SlidersIcon,
  Circle, HelpCircle as HelpIcon, Edit3, CornerUpLeft, CornerUpRight,
  Hand, Sun as SunLight, Share, Folder, Grid, Scissors, Palette, Wrench
} from 'lucide-react';
import * as THREE from 'three';

export default function AIFashionDesignStudio({ theme = 'light', onNavigateTab }) {
  const isDark = theme === 'dark';

  // --------------------------------------------------------------------------
  // STITCHBEE BRAND COLOR TOKENS (EXACT PROMPT SPECIFICATION)
  // --------------------------------------------------------------------------
  const primaryPink = '#E50087';
  const darkPink = '#B8006B';
  const aiAccent = '#8B5CF6';
  const premiumGold = '#C9A227';
  
  const mainBg = isDark ? '#0D0A1A' : '#F7F7F9';
  const canvasBg = isDark ? '#121018' : '#F5F3EF';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const secondaryBg = isDark ? '#141124' : '#F9FAFB';
  const inputBg = isDark ? '#231D34' : '#FFFFFF';

  const textPrimary = isDark ? '#F9FAFB' : '#171717';
  const textSecondary = isDark ? '#9CA3AF' : '#6B7280';
  const textMuted = isDark ? '#6B7280' : '#9CA3AF';

  const borderDefault = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E5E7EB';
  const borderLight = isDark ? 'rgba(255, 255, 255, 0.08)' : '#F3F4F6';

  const pinkTint = isDark ? 'rgba(229,0,135,0.15)' : '#FFF0F7';
  const purpleTint = isDark ? 'rgba(139,92,246,0.15)' : '#F5F3FF';

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT (PERFECT PRESERVATION OF EXISTING FUNCTIONALITY)
  // --------------------------------------------------------------------------
  const [designTitle, setDesignTitle] = useState('Untitled Suit Design');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Auto-saved');

  // Left Tool Rail Selection
  const [activeToolRail, setActiveToolRail] = useState('generator'); // 'sketch' | 'generator' | 'variations' | 'layers' | 'materials' | 'details' | 'settings'

  // Canvas View Mode
  const [canvasViewMode, setCanvasViewMode] = useState('3d'); // 'sketch' | '3d'
  const [activeCanvasTool, setActiveCanvasTool] = useState('rotate'); // 'rotate' | 'pan' | 'zoom-in' | 'zoom-out' | 'light'

  // Sketch Upload State
  const [uploadedSketch, setUploadedSketch] = useState('/br_b1.jpg');
  const [sketchFileName, setSketchFileName] = useState('royal-suit-sketch.png');
  const [sketchFileSize, setSketchFileSize] = useState('2.4 MB');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // AI Generator Pipeline State
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(86);
  const [genStatusMsg, setGenStatusMsg] = useState('Generating final 3D model');
  const [aiSteps, setAiSteps] = useState([
    { label: 'Sketch analyzed', done: true },
    { label: 'Structure understood', done: true },
    { label: 'Pattern created', done: true },
    { label: 'Fabric applied', done: true },
    { label: 'Final rendering', done: false, active: true }
  ]);

  const [generatedImageUrl, setGeneratedImageUrl] = useState('/br_b1.jpg');
  const [selectedGarment, setSelectedGarment] = useState('gown'); // 'shirt' | 'jacket' | 'dress' | 'gown'

  // Right Property Panel Tab
  const [propertyTab, setPropertyTab] = useState('Appearance'); // 'Appearance' | 'Fabric' | 'Pattern' | 'Details'

  // Colors State
  const [colorRole, setColorRole] = useState('Primary'); // 'Primary' | 'Secondary' | 'Accent'
  const [colors, setColors] = useState({
    Primary: '#171717',
    Secondary: '#F5F3EE',
    Accent: '#C9A227'
  });

  const colorPresets = [
    { name: 'Classic Black', hex: '#171717' },
    { name: 'Ivory', hex: '#F5F3EE' },
    { name: 'Navy', hex: '#1B2A41' },
    { name: 'Burgundy', hex: '#7A1C27' },
    { name: 'Forest', hex: '#114B32' },
    { name: 'Champagne', hex: '#C9A227' },
    { name: 'StitchBee Pink', hex: '#E50087' },
    { name: 'AI Purple', hex: '#8B5CF6' }
  ];

  const recentColors = ['#171717', '#F5F3EE', '#C9A227', '#1B2A41', '#E50087', '#8B5CF6'];

  // Fabric State
  const [selectedFabric, setSelectedFabric] = useState('Silk');
  const fabricsList = [
    { name: 'Cotton', desc: 'Matte · breathable', roughness: 0.88, metalness: 0.02, img: '/fab3.jpg' },
    { name: 'Linen', desc: 'Textured · natural', roughness: 0.92, metalness: 0.0, img: '/fab4.jpg' },
    { name: 'Silk', desc: 'Lustrous · fluid', roughness: 0.18, metalness: 0.05, img: '/fab1.jpg' },
    { name: 'Denim', desc: 'Rugged · woven', roughness: 0.8, metalness: 0.0, img: '/fab5.jpg' },
    { name: 'Wool', desc: 'Warm · tailored', roughness: 0.95, metalness: 0.0, img: '/fab2.jpg' },
    { name: 'Velvet', desc: 'Deep pile · rich', roughness: 0.97, metalness: 0.0, img: '/fab2.jpg' },
    { name: 'Linen Blend', desc: 'Crisp · relaxed', roughness: 0.85, metalness: 0.0, img: '/fab4.jpg' },
    { name: 'Satin', desc: 'Glossy · smooth', roughness: 0.14, metalness: 0.08, img: '/fab5.jpg' }
  ];

  // Pattern State
  const [selectedPattern, setSelectedPattern] = useState('Solid');
  const patternsList = ['Solid', 'Stripes', 'Checks', 'Floral', 'Geometric', 'Herringbone', 'Paisley'];

  // Details State
  const [details, setDetails] = useState({
    collar: 'Notch',
    sleeves: 'Regular',
    cuffs: 'Button',
    buttons: 'Classic',
    pockets: 'Straight'
  });

  const detailCategories = {
    collar: ['Notch', 'Peak', 'Shawl', 'Mandarin'],
    sleeves: ['Regular', 'Slim', 'Wide', 'Rolled'],
    cuffs: ['Button', 'French', 'Rounded'],
    buttons: ['Classic', 'Metal', 'Wooden', 'Premium'],
    pockets: ['Straight', 'Flap', 'Welt', 'Patch']
  };

  // AI Assistant Chat State
  const [assistantInput, setAssistantInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Describe what you want to change on your garment design.' }
  ]);

  // Variations State
  const [selectedVariation, setSelectedVariation] = useState('original');
  const variationsList = [
    { id: 'original', name: 'Original', color: '#171717', img: '/br_b1.jpg' },
    { id: 'modern', name: 'Modern', color: '#475467', img: '/b5.jpg' },
    { id: 'luxury', name: 'Luxury', color: '#8B5CF6', img: '/b7.jpg' },
    { id: 'minimal', name: 'Minimal', color: '#F5F3EE', img: '/b3.jpg' }
  ];

  // Version History State
  const [versionList, setVersionList] = useState([
    { id: 'v8', name: 'Design v8', time: 'Current', isCurrent: true },
    { id: 'v7', name: 'Design v7', time: '2 hrs ago', isCurrent: false },
    { id: 'v6', name: 'Design v6', time: 'Yesterday', isCurrent: false },
    { id: 'v5', name: 'Design v5', time: '2 days ago', isCurrent: false }
  ]);

  // Modals & Feedback Toasts
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

  const addVersionRecord = (name) => {
    setVersionList(prev => [
      { id: `v${prev.length + 1}`, name: `Design v${prev.length + 1} (${name})`, time: 'Just now', isCurrent: true },
      ...prev.map(v => ({ ...v, isCurrent: false }))
    ]);
  };

  // --------------------------------------------------------------------------
  // UPLOAD & AI HANDLERS
  // --------------------------------------------------------------------------
  const handleSketchUpload = (file) => {
    setUploadError('');
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Please upload a valid PNG, JPG, or WEBP sketch file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedSketch(e.target.result);
      setSketchFileName(file.name);
      setSketchFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      showToast(`Uploaded sketch "${file.name}"`);
      triggerAIGeneration();
    };
    reader.readAsDataURL(file);
  };

  const triggerAIGeneration = () => {
    setIsGenerating(true);
    setGenProgress(15);
    setGenStatusMsg('Analyzing sketch structure...');

    const pipelineSteps = [
      { p: 35, msg: 'Understanding garment silhouette...' },
      { p: 60, msg: 'Creating pattern & applying fabric...' },
      { p: 86, msg: 'Generating final 3D model...' },
      { p: 100, msg: 'Rendering completed!' }
    ];

    const prompt = `Photorealistic fashion design, ${designTitle}, ${colors.Primary} primary color, ${selectedFabric} fabric, high detailed haute couture photography, studio lighting, clean background, 8k resolution`;
    const seed = Math.floor(Math.random() * 1000000);
    const aiApiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=768&height=1024&seed=${seed}&model=flux&nologo=true`;
    const fallbackImg = variationsList.find(v => v.id === selectedVariation)?.img || '/br_b1.jpg';

    let isHandled = false;
    const finishGen = (targetImg) => {
      if (isHandled) return;
      isHandled = true;
      setGeneratedImageUrl(targetImg);
      setIsGenerating(false);
      showToast('✓ Garment generated successfully!');
      addVersionRecord('AI Generation');
    };

    const timer = setTimeout(() => finishGen(fallbackImg), 3200);
    const testImg = new Image();
    testImg.onload = () => { clearTimeout(timer); finishGen(aiApiUrl); };
    testImg.onerror = () => { clearTimeout(timer); finishGen(fallbackImg); };
    testImg.src = aiApiUrl;

    pipelineSteps.forEach((s, idx) => {
      setTimeout(() => {
        setGenProgress(s.p);
        setGenStatusMsg(s.msg);
      }, (idx + 1) * 600);
    });
  };

  const handleAssistantSubmit = (cmdText) => {
    if (!cmdText.trim()) return;
    const lower = cmdText.toLowerCase();
    const newMsgs = [...chatMessages, { role: 'user', text: cmdText }];
    let reply = "Updated design configuration!";

    if (lower.includes('navy') || lower.includes('blue')) {
      setColors(prev => ({ ...prev, Primary: '#1B2A41' }));
      reply = "Changed primary color to Navy Blue.";
    } else if (lower.includes('velvet')) {
      setSelectedFabric('Velvet');
      reply = "Applied Velvet material texture.";
    } else if (lower.includes('mandarin')) {
      setDetails(prev => ({ ...prev, collar: 'Mandarin' }));
      reply = "Applied Mandarin Band Collar.";
    } else if (lower.includes('slim')) {
      setDetails(prev => ({ ...prev, sleeves: 'Slim' }));
      reply = "Adjusted sleeves to Slim fit.";
    } else if (lower.includes('pink')) {
      setColors(prev => ({ ...prev, Primary: '#E50087' }));
      reply = "Changed primary color to StitchBee Pink.";
    }

    newMsgs.push({ role: 'ai', text: reply });
    setChatMessages(newMsgs);
    setAssistantInput('');
    showToast(reply);
    addVersionRecord('AI Assistant Edit');
  };

  // --------------------------------------------------------------------------
  // THREE.JS 3D CANVAS & LATHE GARMENT ENGINE (PRE-DECLARED BEFORE USEEFFECT)
  // --------------------------------------------------------------------------
  const glCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const garmentMeshGroupRef = useRef(null);
  const autoRotateRef = useRef(false);
  const [is3DAutoRotate, setIs3DAutoRotate] = useState(false);
  const [zoomScale, setZoomScale] = useState(100);

  const rebuild3DGarmentMesh = () => {
    if (!garmentMeshGroupRef.current) return;
    const gGroup = garmentMeshGroupRef.current;
    gGroup.clear();

    const selectedF = fabricsList.find(f => f.name === selectedFabric) || fabricsList[0];
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.Primary),
      roughness: selectedF.roughness,
      metalness: selectedF.metalness,
      side: THREE.DoubleSide
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.Secondary),
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
    const sleeveLen = details.sleeves === 'Slim' ? 0.48 : 0.56;
    [-1, 1].forEach(side => {
      const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.068, sleeveLen, 18), mat);
      sleeve.position.set(side * 0.335, 1.34, 0);
      sleeve.rotation.z = side * (Math.PI / 2 - 0.32);
      sleeve.position.x = side * (0.335 + Math.cos(0.32) * sleeveLen / 2 * 0.9);
      sleeve.position.y = 1.34 - Math.sin(0.32) * sleeveLen / 2 * 0.9;
      sleeve.castShadow = true;
      gGroup.add(sleeve);
    });

    // Collar
    if (details.collar === 'Mandarin') {
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.098, 0.09, 0.055, 28, 1, true), trimMat);
      collar.position.set(0, 1.585, 0);
      gGroup.add(collar);
    } else {
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
    const height = canvas.parentElement?.clientHeight || 540;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 1.32, 3.4);
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

    const pinkRim = new THREE.DirectionalLight(0xE50087, 0.35);
    pinkRim.position.set(-3, 2, -2);
    scene.add(pinkRim);

    const floorGeo = new THREE.CircleGeometry(3.2, 64);
    const floorMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x141210 : 0xEFEAE1, roughness: 0.9 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const mannequinGroup = new THREE.Group();
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
  }, [colors, selectedFabric, selectedGarment, details]);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: mainBg, color: textPrimary, minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Feedback Toast */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#171717',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
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
      {/* 1. DESIGN WORKSPACE HEADER (58px HEIGHT)                              */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        height: '58px',
        padding: '0 24px',
        borderBottom: `1px solid ${borderDefault}`,
        background: cardBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        {/* Left: Back Link & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button style={{ border: 'none', background: 'transparent', color: textSecondary, fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={15} />
            <span>My Designs</span>
          </button>

          <span style={{ color: textMuted }}>/</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditingTitle ? (
              <input 
                type="text" 
                value={designTitle}
                onChange={(e) => setDesignTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                autoFocus
                style={{ fontSize: '15px', fontWeight: 600, color: textPrimary, border: `1px solid ${primaryPink}`, padding: '2px 8px', borderRadius: '4px', outline: 'none' }}
              />
            ) : (
              <strong onClick={() => setIsEditingTitle(true)} style={{ fontSize: '15px', fontWeight: 600, color: textPrimary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{designTitle}</span>
                <Edit3 size={13} color={textMuted} />
              </strong>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#16A34A', marginLeft: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }} />
              <span>{saveStatus}</span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setCanvasViewMode(m => m === '3d' ? 'sketch' : '3d')}
            style={{ height: '36px', padding: '0 14px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Eye size={15} color={textSecondary} />
            <span>Preview</span>
          </button>

          <button 
            onClick={() => setIsSaveModalOpen(true)}
            style={{ height: '36px', padding: '0 14px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <FileText size={15} color={textSecondary} />
            <span>Save</span>
          </button>

          <button 
            onClick={() => setIsExportModalOpen(true)}
            style={{ height: '36px', padding: '0 16px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(229,0,135,0.25)' }}
          >
            <Download size={15} color="#FFFFFF" />
            <span>Export ▼</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. MAIN 3-COLUMN WORKSPACE                                           */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '21% 57% 22%',
        gap: '16px',
        padding: '20px 24px 16px 24px',
        alignItems: 'start'
      }}>

        {/* ================================================================== */}
        {/* LEFT PANEL: TOOL RAIL + AI GARMENT GENERATOR PANEL                 */}
        {/* ================================================================== */}
        <div style={{ display: 'flex', gap: '12px' }}>
          
          {/* Vertical Tool Rail */}
          <div style={{
            background: cardBg,
            border: `1px solid ${borderDefault}`,
            borderRadius: '14px',
            padding: '12px 6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}>
            {[
              { id: 'generator', label: 'AI Generate', icon: Sparkles },
              { id: 'sketch', label: 'Sketch', icon: Upload },
              { id: 'variations', label: 'Variations', icon: Grid },
              { id: 'layers', label: 'Layers', icon: Layers },
              { id: 'materials', label: 'Materials', icon: Box },
              { id: 'details', label: 'Details', icon: Scissors },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(t => {
              const IconComp = t.icon;
              const isActive = activeToolRail === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveToolRail(t.id)}
                  title={t.label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive ? pinkTint : 'transparent',
                    color: isActive ? primaryPink : textSecondary,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <IconComp size={18} />
                </button>
              );
            })}
          </div>

          {/* AI Garment Generator Panel */}
          <div style={{
            flex: 1,
            background: cardBg,
            border: `1px solid ${borderDefault}`,
            borderRadius: '14px',
            padding: '18px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color={aiAccent} />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textPrimary }}>AI Garment Generator</h3>
              </div>
              <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: textSecondary, lineHeight: '17px' }}>
                Transform your sketch into a production-ready fashion concept.
              </p>
            </div>

            {/* Upload Area */}
            {!uploadedSketch ? (
              <div 
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  height: '180px',
                  border: `1.5px dashed ${primaryPink}`,
                  background: pinkTint,
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Plus size={24} color={primaryPink} />
                <strong style={{ fontSize: '13px', color: textPrimary }}>Upload Sketch</strong>
                <span style={{ fontSize: '11px', color: textMuted }}>PNG / JPG / WEBP · Max 10MB</span>
                <input type="file" ref={fileInputRef} onChange={(e) => e.target.files[0] && handleSketchUpload(e.target.files[0])} accept="image/*" style={{ display: 'none' }} />
              </div>
            ) : (
              <div style={{ border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '10px', background: secondaryBg, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ height: '170px', borderRadius: '8px', overflow: 'hidden', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${borderDefault}` }}>
                  <img src={uploadedSketch} alt="Uploaded Sketch" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600, color: textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{sketchFileName}</span>
                  <span style={{ color: textMuted }}>{sketchFileSize}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ flex: 1, height: '32px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Replace</button>
                  <button onClick={() => setUploadedSketch(null)} style={{ flex: 1, height: '32px', borderRadius: '8px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#EF4444', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Remove</button>
                </div>
                <input type="file" ref={fileInputRef} onChange={(e) => e.target.files[0] && handleSketchUpload(e.target.files[0])} accept="image/*" style={{ display: 'none' }} />
              </div>
            )}

            {/* AI Progress Box */}
            <div style={{ borderTop: `1px solid ${borderDefault}`, paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: textPrimary }}>{isGenerating ? genStatusMsg : 'Transforming your sketch'}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: primaryPink }}>{genProgress}%</span>
              </div>

              <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: '#E5E7EB', overflow: 'hidden' }}>
                <div style={{ width: `${genProgress}%`, height: '100%', background: primaryPink, transition: 'width 0.4s ease' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                {aiSteps.map(step => (
                  <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    {step.done ? (
                      <Check size={14} color="#16A34A" strokeWidth={2.5} />
                    ) : (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: step.active ? primaryPink : textMuted, marginLeft: '4px', marginRight: '4px' }} />
                    )}
                    <span style={{ color: step.done || step.active ? textPrimary : textMuted, fontWeight: step.done || step.active ? 500 : 400 }}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={triggerAIGeneration}
                disabled={isGenerating}
                style={{
                  width: '100%',
                  height: '38px',
                  marginTop: '6px',
                  borderRadius: '10px',
                  border: 'none',
                  background: primaryPink,
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(229,0,135,0.22)'
                }}
              >
                <span>[ Open 3D Studio → ]</span>
              </button>
            </div>

          </div>

        </div>

        {/* ================================================================== */}
        {/* CENTER PANEL: MAIN GARMENT CANVAS (VISUAL HERO)                     */}
        {/* ================================================================== */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderDefault}`,
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Top Canvas Toolbar */}
          <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', background: secondaryBg, padding: '3px', borderRadius: '8px', border: `1px solid ${borderDefault}`, gap: '4px' }}>
              <button onClick={() => setCanvasViewMode('sketch')} style={{ border: 'none', background: canvasViewMode === 'sketch' ? primaryPink : 'transparent', color: canvasViewMode === 'sketch' ? '#FFFFFF' : textSecondary, fontSize: '13px', fontWeight: 500, padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}>[ Sketch ]</button>
              <button onClick={() => setCanvasViewMode('3d')} style={{ border: 'none', background: canvasViewMode === '3d' ? primaryPink : 'transparent', color: canvasViewMode === '3d' ? '#FFFFFF' : textSecondary, fontSize: '13px', fontWeight: 500, padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}>[ 3D View ]</button>
            </div>
          </div>

          <button title="Fullscreen" style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 20, width: '34px', height: '34px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <Maximize2 size={15} color={textPrimary} />
          </button>

          {/* Large Hero Canvas Stage */}
          <div style={{ position: 'relative', height: '540px', borderRadius: '12px', overflow: 'hidden', background: canvasBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {canvasViewMode === 'sketch' ? (
              <img src={uploadedSketch} alt="Garment Sketch" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
            ) : (
              <canvas ref={glCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            )}

            {/* Right Floating Canvas Toolbar */}
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
              gap: '10px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              zIndex: 20
            }}>
              <button onClick={() => setActiveCanvasTool('rotate')} title="Rotate" style={{ border: 'none', background: activeCanvasTool === 'rotate' ? pinkTint : 'transparent', color: activeCanvasTool === 'rotate' ? primaryPink : textSecondary, width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <RotateCw size={16} />
              </button>
              <button onClick={() => setActiveCanvasTool('pan')} title="Pan" style={{ border: 'none', background: activeCanvasTool === 'pan' ? pinkTint : 'transparent', color: activeCanvasTool === 'pan' ? primaryPink : textSecondary, width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Hand size={16} />
              </button>
              <button onClick={() => setActiveCanvasTool('zoom-in')} title="Zoom In" style={{ border: 'none', background: activeCanvasTool === 'zoom-in' ? pinkTint : 'transparent', color: activeCanvasTool === 'zoom-in' ? primaryPink : textSecondary, width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ZoomIn size={16} />
              </button>
              <button onClick={() => setActiveCanvasTool('zoom-out')} title="Zoom Out" style={{ border: 'none', background: activeCanvasTool === 'zoom-out' ? pinkTint : 'transparent', color: activeCanvasTool === 'zoom-out' ? primaryPink : textSecondary, width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ZoomOut size={16} />
              </button>
              <button onClick={() => setActiveCanvasTool('light')} title="Lighting" style={{ border: 'none', background: activeCanvasTool === 'light' ? pinkTint : 'transparent', color: activeCanvasTool === 'light' ? primaryPink : textSecondary, width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <SunLight size={16} />
              </button>
            </div>

            {/* Bottom View Controls Dock */}
            <div style={{
              position: 'absolute',
              bottom: '18px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              background: '#FFFFFF',
              border: `1px solid ${borderDefault}`,
              padding: '6px 18px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
            }}>
              {['Front', 'Back', 'Side'].map(pos => (
                <button 
                  key={pos}
                  onClick={() => { garmentMeshGroupRef.current && (garmentMeshGroupRef.current.rotation.y = pos === 'Front' ? 0 : pos === 'Back' ? Math.PI : Math.PI / 2); }}
                  style={{ border: 'none', background: 'transparent', color: textPrimary, fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                >
                  {pos}
                </button>
              ))}

              <div style={{ width: '1px', height: '14px', background: borderDefault }} />

              <button 
                onClick={() => { autoRotateRef.current = !autoRotateRef.current; setIs3DAutoRotate(autoRotateRef.current); showToast(`360° Auto-Rotate ${autoRotateRef.current ? 'ON' : 'OFF'}`); }}
                style={{ border: 'none', background: is3DAutoRotate ? primaryPink : 'transparent', color: is3DAutoRotate ? '#FFFFFF' : textPrimary, fontSize: '13px', fontWeight: 500, padding: '3px 10px', borderRadius: '12px', cursor: 'pointer' }}
              >
                360°
              </button>

              <div style={{ width: '1px', height: '14px', background: borderDefault }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: textPrimary }}>
                <button onClick={() => setZoomScale(z => Math.max(z - 10, 50))} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>−</button>
                <span>{zoomScale}%</span>
                <button onClick={() => setZoomScale(z => Math.min(z + 10, 200))} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>+</button>
              </div>

              <button onClick={() => { garmentMeshGroupRef.current && (garmentMeshGroupRef.current.rotation.y = 0.35); setZoomScale(100); }} style={{ border: 'none', background: 'transparent', color: textPrimary, fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* RIGHT PANEL: FASHION PROPERTY EDITOR                              */}
        {/* ================================================================== */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderDefault}`,
          borderRadius: '14px',
          padding: '18px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Property Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', borderBottom: `1px solid ${borderDefault}`, paddingBottom: '8px' }}>
            {['Appearance', 'Fabric', 'Pattern', 'Details'].map(tab => (
              <button
                key={tab}
                onClick={() => setPropertyTab(tab)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: propertyTab === tab ? primaryPink : textSecondary,
                  fontSize: '12.5px',
                  fontWeight: propertyTab === tab ? 600 : 500,
                  padding: '4px 0',
                  cursor: 'pointer',
                  borderBottom: propertyTab === tab ? `2px solid ${primaryPink}` : '2px solid transparent'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 1. APPEARANCE TAB */}
          {propertyTab === 'Appearance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>COLOR</span>
                
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Primary', 'Secondary', 'Accent'].map(r => (
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
                      <span style={{ fontSize: '10px', color: textMuted, display: 'block' }}>{r}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors[r], border: '1px solid rgba(0,0,0,0.15)' }} />
                        <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 600, color: textPrimary }}>{colors[r]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: textPrimary, display: 'block', marginBottom: '6px' }}>Recent Colors</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {recentColors.map(hex => (
                    <div 
                      key={hex}
                      onClick={() => setColors(prev => ({ ...prev, [colorRole]: hex }))}
                      style={{ width: '24px', height: '24px', borderRadius: '50%', background: hex, border: colors[colorRole] === hex ? `2px solid ${primaryPink}` : '1px solid rgba(0,0,0,0.15)', cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: textPrimary, display: 'block', marginBottom: '6px' }}>Color Presets</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {colorPresets.map(preset => (
                    <div
                      key={preset.name}
                      onClick={() => { setColors(prev => ({ ...prev, [colorRole]: preset.hex })); showToast(`Set ${colorRole}: ${preset.name}`); }}
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        border: colors[colorRole] === preset.hex ? `1.5px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                        background: secondaryBg,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: preset.hex, border: '1px solid rgba(0,0,0,0.15)' }} />
                      <span style={{ fontSize: '11.5px', fontWeight: 500, color: textPrimary }}>{preset.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. FABRIC TAB */}
          {propertyTab === 'Fabric' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {fabricsList.map(f => {
                const isSelected = selectedFabric === f.name;
                return (
                  <div
                    key={f.name}
                    onClick={() => { setSelectedFabric(f.name); showToast(`Selected fabric: ${f.name}`); }}
                    style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: isSelected ? pinkTint : secondaryBg,
                      padding: '6px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <img src={f.img} alt={f.name} style={{ width: '100%', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
                    <strong style={{ fontSize: '12px', color: textPrimary, marginTop: '4px', display: 'block' }}>{f.name}</strong>
                    <span style={{ fontSize: '10px', color: textMuted }}>{f.desc}</span>
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '4px', right: '4px', width: '14px', height: '14px', borderRadius: '50%', background: primaryPink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={9} color="#FFFFFF" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 3. PATTERN TAB */}
          {propertyTab === 'Pattern' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {patternsList.map(p => {
                const isSelected = selectedPattern === p;
                return (
                  <button
                    key={p}
                    onClick={() => { setSelectedPattern(p); showToast(`Selected pattern: ${p}`); }}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: isSelected ? pinkTint : secondaryBg,
                      color: isSelected ? primaryPink : textPrimary,
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          )}

          {/* 4. DETAILS TAB */}
          {propertyTab === 'Details' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.keys(detailCategories).map(catKey => (
                <div key={catKey}>
                  <label style={{ fontSize: '11px', color: textMuted, display: 'block', textTransform: 'capitalize', marginBottom: '3px' }}>{catKey}</label>
                  <select 
                    value={details[catKey]} 
                    onChange={(e) => setDetails(prev => ({ ...prev, [catKey]: e.target.value }))}
                    style={{ width: '100%', height: '32px', padding: '0 8px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12px' }}
                  >
                    {detailCategories[catKey].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 3. AI ASSISTANT / AI COMMAND BAR                                     */}
      {/* -------------------------------------------------------------------- */}
      <div style={{ margin: '0 24px 16px 24px', background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '14px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles size={16} color={aiAccent} />
          <strong style={{ fontSize: '14px', color: textPrimary }}>AI Design Assistant</strong>
        </div>
        <span style={{ fontSize: '12px', color: textSecondary, display: 'block', marginBottom: '10px' }}>Describe what you want to change.</span>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {[
            'Make it more premium',
            'Change fabric to velvet',
            'Add a Mandarin collar',
            'Make sleeves slimmer',
            'Try a luxury version',
            'Make the lapel navy blue'
          ].map(actionPill => (
            <button
              key={actionPill}
              onClick={() => handleAssistantSubmit(actionPill)}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                border: `1px solid ${borderDefault}`,
                background: secondaryBg,
                color: textPrimary,
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {actionPill}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text"
            value={assistantInput}
            onChange={(e) => setAssistantInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAssistantSubmit(assistantInput)}
            placeholder="What would you like to change?"
            style={{ flex: 1, height: '40px', padding: '0 14px', borderRadius: '10px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '13px', outline: 'none' }}
          />
          <button 
            onClick={() => handleAssistantSubmit(assistantInput)}
            style={{ padding: '0 20px', height: '40px', borderRadius: '10px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={15} color="#FFFFFF" />
            <span>Generate</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 4. AI VARIATIONS / VERSIONS / EXPORT ROW                             */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 240px 240px',
        gap: '16px',
        padding: '0 24px 16px 24px',
        alignItems: 'start'
      }}>
        {/* AI Variations Carousel */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '14px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <strong style={{ fontSize: '14px', color: textPrimary }}>AI Variations</strong>
            <span style={{ fontSize: '12px', color: primaryPink, fontWeight: 500, cursor: 'pointer' }}>View all →</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {variationsList.map(v => {
              const isSelected = selectedVariation === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVariation(v.id);
                    setColors(prev => ({ ...prev, Primary: v.color }));
                    showToast(`Selected ${v.name} variation`);
                  }}
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                    cursor: 'pointer',
                    background: secondaryBg,
                    position: 'relative'
                  }}
                >
                  <img src={v.img} alt={v.name} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                  <span style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: textPrimary, padding: '6px', textAlign: 'center' }}>{v.name}</span>
                  {isSelected && (
                    <div style={{ position: 'absolute', top: '6px', right: '6px', width: '16px', height: '16px', borderRadius: '50%', background: primaryPink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={10} color="#FFFFFF" strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Version History */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '14px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <strong style={{ fontSize: '14px', color: textPrimary, display: 'block', marginBottom: '10px' }}>VERSION HISTORY</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {versionList.map(v => (
              <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderRadius: '6px', background: v.isCurrent ? pinkTint : secondaryBg }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: v.isCurrent ? primaryPink : textMuted }} />
                  <span style={{ fontSize: '12px', fontWeight: v.isCurrent ? 600 : 400, color: v.isCurrent ? primaryPink : textPrimary }}>{v.name}</span>
                </div>
                <span style={{ fontSize: '10.5px', color: textMuted }}>{v.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Design Card */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '14px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <strong style={{ fontSize: '14px', color: textPrimary, display: 'block', marginBottom: '10px' }}>EXPORT DESIGN</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button onClick={() => showToast('Exporting 3D Model (GLB)...')} style={{ padding: '8px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: secondaryBg, textAlign: 'left', cursor: 'pointer' }}>
              <strong style={{ fontSize: '12px', color: textPrimary, display: 'block' }}>Export 3D Model</strong>
              <span style={{ fontSize: '10px', color: textMuted }}>GLB / GLTF / OBJ</span>
            </button>
            <button onClick={() => showToast('Exporting PNG Images...')} style={{ padding: '8px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: secondaryBg, textAlign: 'left', cursor: 'pointer' }}>
              <strong style={{ fontSize: '12px', color: textPrimary, display: 'block' }}>Export Images</strong>
              <span style={{ fontSize: '10px', color: textMuted }}>PNG / JPG</span>
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 5. DESIGN INSIGHTS BAR                                               */}
      {/* -------------------------------------------------------------------- */}
      <div style={{ margin: '0 24px', background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '14px', padding: '14px 20px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color={primaryPink} />
          <strong style={{ fontSize: '13.5px', color: textPrimary }}>Design Insights</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '12.5px' }}>
          <div>
            <span style={{ color: textMuted, display: 'block', fontSize: '11px' }}>Fabric Required</span>
            <strong style={{ color: textPrimary }}>2.4 meters</strong>
          </div>
          <div>
            <span style={{ color: textMuted, display: 'block', fontSize: '11px' }}>Estimated Time</span>
            <strong style={{ color: textPrimary }}>4–5 hours</strong>
          </div>
          <div>
            <span style={{ color: textMuted, display: 'block', fontSize: '11px' }}>Complexity</span>
            <strong style={{ color: textPrimary }}>78%</strong>
          </div>
          <div>
            <span style={{ color: textMuted, display: 'block', fontSize: '11px' }}>AI Confidence</span>
            <strong style={{ color: primaryPink }}>92%</strong>
          </div>
        </div>

        <button onClick={() => showToast('Full atelier report generated.')} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
          View Full Report →
        </button>
      </div>

      {/* SAVE MODAL */}
      {isSaveModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '400px', background: cardBg, borderRadius: '14px', padding: '20px', border: `1px solid ${borderDefault}`, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: textPrimary }}>Save Design</h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: textSecondary }}>Save design to StitchBee Atelier Vault.</p>

            <div>
              <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '3px' }}>Design Title</label>
              <input type="text" value={designTitle} onChange={(e) => setDesignTitle(e.target.value)} style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '13px' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '18px' }}>
              <button onClick={() => setIsSaveModalOpen(false)} style={{ height: '34px', padding: '0 14px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setIsSaveModalOpen(false); showToast(`Saved "${designTitle}" to Vault.`); }} style={{ height: '34px', padding: '0 16px', borderRadius: '8px', border: 'none', background: primaryPink, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Save Design</button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {isExportModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '440px', background: cardBg, borderRadius: '14px', padding: '20px', border: `1px solid ${borderDefault}`, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: textPrimary }}>Export Package</h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: textSecondary }}>Export options for "{designTitle}".</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: 'Export 3D Model', desc: 'GLB / GLTF / OBJ', fmt: 'GLB' },
                { title: 'Export Images', desc: 'High-res PNG / JPG', fmt: 'PNG' },
                { title: 'Sketch + 3D', desc: 'Complete ZIP Archive', fmt: 'ZIP' },
                { title: 'Share Design', desc: 'Invite & Share link', fmt: 'LINK' }
              ].map(opt => (
                <div key={opt.title} style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${borderDefault}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: secondaryBg }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: textPrimary, display: 'block' }}>{opt.title}</strong>
                    <span style={{ fontSize: '10.5px', color: textMuted }}>{opt.desc}</span>
                  </div>
                  <button onClick={() => { setIsExportModalOpen(false); showToast(`Exporting ${opt.fmt}...`); }} style={{ height: '30px', padding: '0 12px', borderRadius: '6px', border: `1px solid ${primaryPink}`, background: pinkTint, color: primaryPink, fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>
                    {opt.fmt}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setIsExportModalOpen(false)} style={{ height: '34px', padding: '0 14px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
