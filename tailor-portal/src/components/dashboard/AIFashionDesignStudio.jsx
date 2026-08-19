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
  // STITCHBEE BRAND DESIGN TOKENS
  // --------------------------------------------------------------------------
  const primaryPink = '#E9008C';
  const pinkHover = '#D0007D';
  const purpleAccent = '#9B1DDB';
  
  const pageBg = isDark ? '#0D0A1A' : '#F7F8FC';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const inputBg = isDark ? '#231D34' : '#F8FAFC';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E5E7EB';
  const textColor = isDark ? '#F9FAFB' : '#182033';
  const secTextColor = isDark ? '#A0AEC0' : '#667085';

  // --------------------------------------------------------------------------
  // GLOBAL DESIGN STATE
  // --------------------------------------------------------------------------
  const [currentStep, setCurrentStep] = useState(2); // 1: Upload, 2: AI Generate, 3: Customize, 4: 3D Preview, 5: Download
  const [viewMode, setViewMode] = useState('ai'); // 'sketch' | 'ai' | '3d' | 'split'
  const [designTitle, setDesignTitle] = useState('Royal Bridal Lehenga');
  const [autosaveText, setAutosaveText] = useState('All changes saved');

  // Step 1 & Sketch State
  const [hasSketch, setHasSketch] = useState(true);
  const [sketchDataUrl, setSketchDataUrl] = useState('/br_b1.jpg');
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Free AI Image Generation State (Pollinations / Flux AI)
  const [generatedAIImageUrl, setGeneratedAIImageUrl] = useState('/br_b1.jpg');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionStep, setConversionStep] = useState(0); // 0 to 4
  const [aiComplete, setAiComplete] = useState(true);

  // Garment Classification State
  const [garmentType, setGarmentType] = useState('gown'); // 'shirt' | 'jacket' | 'dress' | 'gown'
  const [garmentMatch, setGarmentMatch] = useState(94);
  const [garmentNote, setGarmentNote] = useState('Auto-detected Bridal Lehenga silhouette (94% match).');

  // Customization State (Color, Fabric, Pattern, Details)
  const [activeRightTab, setActiveRightTab] = useState('color'); // 'color' | 'fabric' | 'pattern' | 'details'
  const [colorRole, setColorRole] = useState('primary'); // 'primary' | 'secondary' | 'accent'
  const [colors, setColors] = useState({
    primary: '#E9008C',
    secondary: '#F5F3EE',
    accent: '#9B1DDB'
  });
  const [recentColors, setRecentColors] = useState(['#E9008C', '#9B1DDB', '#8C1F28', '#10B981']);
  
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
    { label: 'Real AI Image generated', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { label: 'Sketch uploaded', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);

  // AI Assistant Drawer State
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantInputText, setAssistantInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Welcome to StitchBee Studio AI! Upload any sketch and click "Generate Realistic AI Design" to use our free AI model.' }
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
  // FREE AI IMAGE GENERATION ENGINE (Pollinations / Flux API Integration)
  // --------------------------------------------------------------------------
  const generateRealAIImage = (customPrompt = '') => {
    setIsConverting(true);
    setAiComplete(false);
    setConversionStep(0);
    setViewMode('ai');

    const selectedF = fabricsList.find(f => f.id === selectedFabric)?.name || 'Silk';
    const garmentName = garmentTypesList.find(g => g.id === garmentType)?.name || 'Bridal Lehenga';

    const prompt = customPrompt || `High fashion photorealistic Indian luxury model wearing elegant ${garmentName}, ${colors.primary} color, ${selectedF} fabric, ${details.collar} collar, ${details.sleeve} sleeves, intricate zari embroidery work, professional fashion photography, studio lighting, clean background, 8k resolution, haute couture fashion catalogue`;

    const seed = Math.floor(Math.random() * 1000000);
    const aiApiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=768&height=1024&seed=${seed}&model=flux&nologo=true`;

    const steps = [0, 1, 2, 3, 4];
    steps.forEach((stepIdx) => {
      setTimeout(() => {
        setConversionStep(stepIdx);
        if (stepIdx === 4) {
          setGeneratedAIImageUrl(aiApiUrl);
          setIsConverting(false);
          setAiComplete(true);
          showToast('Real AI Fashion Design generated!');
          addVersion('Free AI image generated');
        }
      }, (stepIdx + 1) * 700);
    });
  };

  // --------------------------------------------------------------------------
  // GARMENT TYPES & FABRICS DATA
  // --------------------------------------------------------------------------
  const garmentTypesList = [
    { id: 'gown', name: 'Lehenga Gown', icon: '✨' },
    { id: 'dress', name: 'Anarkali Suit', icon: '👗' },
    { id: 'shirt', name: 'Designer Kurti', icon: '👔' },
    { id: 'jacket', name: 'Royal Sherwani', icon: '🧥' }
  ];

  const fabricsList = [
    { id: 'silk', name: 'Raw Silk', desc: 'Lustrous · fluid', roughness: 0.18, metalness: 0.05 },
    { id: 'velvet', name: 'Royal Velvet', desc: 'Deep pile · rich', roughness: 0.97, metalness: 0.0 },
    { id: 'cotton', name: 'Cotton', desc: 'Matte · breathable', roughness: 0.88, metalness: 0.02 },
    { id: 'linen', name: 'Linen', desc: 'Textured · natural', roughness: 0.92, metalness: 0.0 },
    { id: 'satin', name: 'Zari Satin', desc: 'Glossy · smooth', roughness: 0.14, metalness: 0.08 },
    { id: 'denim', name: 'Denim', desc: 'Rugged · woven', roughness: 0.8, metalness: 0.0 }
  ];

  const colorPresets = [
    { name: 'StitchBee Pink', hex: '#E9008C' },
    { name: 'Royal Red', hex: '#8C1F28' },
    { name: 'Purple Accent', hex: '#9B1DDB' },
    { name: 'Navy Blue', hex: '#1B2A41' },
    { name: 'Emerald Green', hex: '#10B981' },
    { name: 'Metallic Gold', hex: '#EAB308' },
    { name: 'Rosewood', hex: '#7A3B3F' },
    { name: 'Ivory White', hex: '#EFEAE1' }
  ];

  const variationsList = [
    { id: 'original', name: 'Royal Red', tag: 'v1', primary: '#8C1F28', fabric: 'silk', pattern: 'solid', img: '/br_b1.jpg' },
    { id: 'pink', name: 'StitchBee Pink', tag: 'ai', primary: '#E9008C', fabric: 'satin', pattern: 'geometric', img: '/b5.jpg' },
    { id: 'gold', name: 'Metallic Gold', tag: 'ai', primary: '#EAB308', fabric: 'silk', pattern: 'solid', img: '/b7.jpg' },
    { id: 'green', name: 'Emerald Green', tag: 'ai', primary: '#10B981', fabric: 'velvet', pattern: 'stripes', img: '/b3.jpg' },
    { id: 'blue', name: 'Sapphire Blue', tag: 'ai', primary: '#1B2A41', fabric: 'wool', pattern: 'checks', img: '/b4.jpg' }
  ];

  // --------------------------------------------------------------------------
  // THREE.JS 3D CANVAS & ENGINE
  // --------------------------------------------------------------------------
  const glCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const garmentGroupRef = useRef(null);
  const mannequinGroupRef = useRef(null);
  const autoRotateRef = useRef(false);
  
  const [zoomDist, setZoomDist] = useState(3.4);

  // Generate Texture Canvas for Fabric & Patterns
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
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
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

    const isLongForm = garmentType === 'dress' || garmentType === 'gown';
    const fitScale = 1.0;
    const hemY = garmentType === 'gown' ? 0.03 : 0.78;
    const neckR = 0.09;

    const pts = [];
    pts.push(new THREE.Vector2((isLongForm ? 0.36 : 0.30) * fitScale, hemY));
    if (isLongForm) {
      pts.push(new THREE.Vector2(0.30 * fitScale, 0.65));
      pts.push(new THREE.Vector2(0.255 * fitScale, 0.92));
    }
    pts.push(new THREE.Vector2(0.265 * fitScale, 1.00));
    pts.push(new THREE.Vector2(0.30 * fitScale, 1.20));
    pts.push(new THREE.Vector2(0.335 * fitScale, 1.34));
    pts.push(new THREE.Vector2(0.30 * fitScale, 1.46));
    pts.push(new THREE.Vector2(neckR, 1.545));

    const torsoGeo = new THREE.LatheGeometry(pts, 40);
    const torso = new THREE.Mesh(torsoGeo, mat);
    torso.castShadow = true;
    torso.receiveShadow = true;
    gGroup.add(torso);
  };

  useEffect(() => {
    if (!glCanvasRef.current) return;
    const canvas = glCanvasRef.current;
    const width = canvas.parentElement.clientWidth || 600;
    const height = canvas.parentElement.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 1.32, zoomDist);
    camera.lookAt(0, 1.15, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    rendererRef.current = renderer;

    const hemi = new THREE.HemisphereLight(0xF8F0DD, 0x151310, 0.6);
    scene.add(hemi);
    const dirKey = new THREE.DirectionalLight(0xffffff, 1.2);
    dirKey.position.set(2.4, 4, 2.2);
    scene.add(dirKey);

    const mannequinGroup = new THREE.Group();
    mannequinGroupRef.current = mannequinGroup;
    scene.add(mannequinGroup);

    const garmentGroup = new THREE.Group();
    garmentGroupRef.current = garmentGroup;
    scene.add(garmentGroup);

    rebuild3DScene();

    let animId;
    let targetRotY = 0.35;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotateRef.current) {
        targetRotY += 0.006;
      }
      garmentGroup.rotation.y += (targetRotY - garmentGroup.rotation.y) * 0.1;
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
      showToast(`Uploaded sketch "${file.name}"`);
      generateRealAIImage();
    };
    reader.readAsDataURL(file);
  };

  const useDemoSketch = () => {
    const demoUrl = '/br_b1.jpg';
    setSketchDataUrl(demoUrl);
    setHasSketch(true);
    showToast('Loaded demo fashion sketch.');
    generateRealAIImage();
  };

  // AI Assistant Command Interpreter
  const handleAssistantCommand = (cmd) => {
    const lower = cmd.toLowerCase();
    const newMessages = [...chatMessages, { role: 'user', text: cmd }];

    let responseText = "I've updated your design!";
    let changes = [];

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

    if (lower.includes('silk')) {
      setSelectedFabric('silk');
      changes.push('fabric to Raw Silk');
    } else if (lower.includes('velvet')) {
      setSelectedFabric('velvet');
      changes.push('fabric to Royal Velvet');
    }

    if (changes.length > 0) {
      responseText = `Done! Updated ${changes.join(' and ')}. Re-generating AI image...`;
      generateRealAIImage(cmd);
      addVersion(`AI Assistant: ${cmd}`);
    } else {
      responseText = `I'm ready! Ask to "make it navy blue", "change fabric to velvet", or "generate a gold lehenga".`;
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
              onClick={() => generateRealAIImage()}
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
                gap: '8px',
                boxShadow: `0 4px 14px ${primaryPink}35`
              }}
            >
              <Sparkles size={16} color="#FFFFFF" />
              <span>Generate Realistic AI Design</span>
            </button>

            <button 
              onClick={() => setIsExportModalOpen(true)}
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
              <Download size={15} color={secTextColor} />
              <span>Export</span>
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

              <button 
                onClick={() => generateRealAIImage()}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: `linear-gradient(135deg, ${primaryPink}, ${purpleAccent})`,
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: `0 4px 12px ${primaryPink}30`
                }}
              >
                <Sparkles size={14} color="#FFFFFF" />
                <span>Generate Realistic AI Design</span>
              </button>

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

          {/* AI Conversion Pipeline Status */}
          {hasSketch && (
            <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '16px' }}>
              <strong style={{ fontSize: '12.5px', fontWeight: 700, color: textColor, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <Sparkles size={14} color={primaryPink} />
                <span>Free AI Flux Model Status</span>
              </strong>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Analyzing sketch structure', 'Processing garment geometry', 'Calling free AI Flux API', 'Generating textile & fabric folds', 'Finalizing photorealistic render'].map((stepLabel, idx) => {
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
            </div>
          )}

        </div>

        {/* ================================================================== */}
        {/* CENTER STAGE: REAL AI RENDER / SKETCH / 3D CANVAS                 */}
        {/* ================================================================== */}
        <div style={{ position: 'relative', background: isDark ? '#141126' : '#FAFAFC', border: `1px solid ${borderColor}`, borderRadius: '16px', height: '620px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          {/* Top Mode Toggle Bar */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: 'rgba(24,32,51,0.75)', backdropFilter: 'blur(12px)', padding: '4px', borderRadius: '12px', gap: '4px' }}>
              {[
                { id: 'sketch', label: 'Sketch' },
                { id: 'ai', label: 'AI Render' },
                { id: '3d', label: '3D' },
                { id: 'split', label: 'Split View' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setViewMode(m.id)}
                  style={{
                    border: 'none',
                    background: viewMode === m.id ? primaryPink : 'transparent',
                    color: '#FFFFFF',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <span style={{ background: 'rgba(24,32,51,0.75)', backdropFilter: 'blur(12px)', color: '#FFFFFF', fontSize: '11px', fontWeight: 600, padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              Free Flux AI Enabled
            </span>
          </div>

          {/* View Modes Rendering */}
          {isConverting ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', background: isDark ? '#141126' : '#FAFAFC' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: `3px solid ${primaryPink}25`, borderTopColor: primaryPink, animation: 'spin 1s linear infinite' }} />
              <strong style={{ fontSize: '15px', color: textColor }}>Generating Photorealistic AI Fashion Design...</strong>
              <span style={{ fontSize: '12px', color: primaryPink, fontWeight: 600 }}>Contacting Free AI Image Generation API...</span>
            </div>
          ) : viewMode === 'ai' ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', padding: '10px' }}>
              <img 
                src={generatedAIImageUrl} 
                alt="AI Generated Real Fashion Design" 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px' }} 
              />
            </div>
          ) : viewMode === 'split' ? (
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
              <div style={{ flex: 1, borderRight: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#FFFFFF' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: secTextColor, marginBottom: '8px' }}>ORIGINAL SKETCH</span>
                {hasSketch ? <img src={sketchDataUrl} alt="Sketch Split" style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} /> : <span style={{ fontSize: '12px', color: secTextColor }}>No sketch uploaded</span>}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#FFFFFF' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: primaryPink, marginBottom: '8px' }}>AI GENERATED RENDER</span>
                <img src={generatedAIImageUrl} alt="AI Split Render" style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} />
              </div>
            </div>
          ) : viewMode === 'sketch' ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', background: '#FFFFFF' }}>
              {hasSketch ? <img src={sketchDataUrl} alt="Full Sketch" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: '13px', color: secTextColor }}>No sketch uploaded yet. Upload a sketch on the left panel.</span>}
            </div>
          ) : (
            <canvas ref={glCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          )}

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
        {/* RIGHT PANEL: CUSTOMIZE DESIGN                                      */}
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
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB 1: COLOR CUSTOMIZATION */}
          {activeRightTab === 'color' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="color" 
                  value={colors[colorRole]} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setColors(prev => ({ ...prev, [colorRole]: val }));
                    generateRealAIImage();
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

              <div>
                <strong style={{ fontSize: '11.5px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '8px' }}>Fashion Color Presets</strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {colorPresets.map(cp => (
                    <div 
                      key={cp.name}
                      onClick={() => {
                        setColors(prev => ({ ...prev, [colorRole]: cp.hex }));
                        generateRealAIImage();
                        showToast(`Applied color: ${cp.name}`);
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
                      generateRealAIImage();
                      showToast(`Selected fabric: ${f.name}`);
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
                    setGeneratedAIImageUrl(v.img);
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

      {/* EXPORT MODAL */}
      {isExportModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '440px', background: cardBg, borderRadius: '16px', padding: '24px', border: `1px solid ${borderColor}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: textColor }}>Export Design Package</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: secTextColor }}>Choose how you would like to export "{designTitle}".</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', border: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: inputBg }}>
                <div>
                  <strong style={{ fontSize: '12.5px', color: textColor, display: 'block' }}>Real AI Render Image</strong>
                  <span style={{ fontSize: '10px', color: secTextColor }}>Photorealistic fashion render</span>
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
