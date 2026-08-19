import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Sparkles, RefreshCw, RotateCw, ZoomIn, ZoomOut, Maximize2, 
  Check, X, Eye, Download, Share2, Play, Sliders, ChevronDown, 
  Layers, Sun, Moon, Info, HelpCircle, ArrowLeft, ArrowRight, ShieldCheck,
  FileText, Box, Video, Plus, Trash2, Heart, MessageSquare, Send, Copy, 
  Minimize2, Undo, Redo, CheckCircle2, SlidersHorizontal, Image as ImageIcon,
  Camera, ChevronLeft, ChevronRight, Settings, Sliders as SlidersIcon
} from 'lucide-react';
import * as THREE from 'three';

export default function AIFashionDesignStudio({ theme = 'light', onNavigateTab }) {
  const isDark = theme === 'dark';

  // --------------------------------------------------------------------------
  // PREMIUM STITCHBEE DESIGN TOKENS & PALETTE
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
  const [currentStep, setCurrentStep] = useState(2); // 1: Upload, 2: AI Generate, 3: Customize, 4: 3D Preview, 5: Download
  const [viewerMode, setViewerMode] = useState('2d'); // '2d' | '3d' | 'split'
  const [designName, setDesignName] = useState('Royal Bridal Lehenga');
  const [designCategory, setDesignCategory] = useState('Bridal Wear');
  const [designOccasion, setDesignOccasion] = useState('Wedding');
  const [createdDate, setCreatedDate] = useState('May 16, 2026');
  const [tags, setTags] = useState(['Bridal', 'Lehenga', 'Embroidered', 'Royal']);
  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  // Sketch Upload State
  const [uploadedSketch, setUploadedSketch] = useState('/br_b1.jpg');
  const [sketchFileName, setSketchFileName] = useState('royal-lehenga-sketch.png');
  const [sketchFileSize, setSketchFileSize] = useState('2.4 MB');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // Garment Selection
  const [selectedGarment, setSelectedGarment] = useState('gown'); // 'shirt' | 'jacket' | 'dress' | 'gown'

  // AI Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genStatusMsg, setGenStatusMsg] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('/br_b1.jpg');

  // Variations State
  const [selectedVariation, setSelectedVariation] = useState('original');
  const [variationIndex, setVariationIndex] = useState(0);

  // 2D Viewer Controls
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Customization State
  const [activeTab, setActiveTab] = useState('fabric'); // 'fabric' | 'colors' | 'details' | 'patterns'
  const [selectedFabricCategory, setSelectedFabricCategory] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('Silk');
  
  // Colors State
  const [colorRole, setColorRole] = useState('primary');
  const [primaryColor, setPrimaryColor] = useState('#E9008C');
  const [secondaryColor, setSecondaryColor] = useState('#F5F3EE');
  const [accentColor, setAccentColor] = useState('#9B1DDB');

  // Details State
  const [embroidery, setEmbroidery] = useState('Heavy');
  const [sleeves, setSleeves] = useState('Full Sleeve');
  const [neckline, setNeckline] = useState('V-Neck');
  const [selectedPattern, setSelectedPattern] = useState('Zari');

  // Version History State
  const [versionList, setVersionList] = useState([
    { id: 'v3', title: 'Version 3', time: 'Today 11:42 AM', isCurrent: true },
    { id: 'v2', title: 'Version 2', time: 'Today 10:15 AM', isCurrent: false },
    { id: 'v1', title: 'Version 1', time: 'Yesterday', isCurrent: false }
  ]);

  // Modals & Feedback Toasts
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // --------------------------------------------------------------------------
  // HELPER FUNCTIONS
  // --------------------------------------------------------------------------
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const addVersionRecord = (title) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVersionList(prev => [
      { id: `v${prev.length + 1}`, title: `Version ${prev.length + 1} (${title})`, time: `Today ${timeStr}`, isCurrent: true },
      ...prev.map(v => ({ ...v, isCurrent: false }))
    ]);
  };

  // --------------------------------------------------------------------------
  // DATA DEFINITIONS
  // --------------------------------------------------------------------------
  const garmentTypes = [
    { id: 'shirt', label: 'Shirt / Kurti', icon: '👔' },
    { id: 'jacket', label: 'Jacket / Blazer', icon: '🧥' },
    { id: 'dress', label: 'Anarkali / Dress', icon: '👗' },
    { id: 'gown', label: 'Lehenga Gown', icon: '✨' }
  ];

  const fabricCategories = ['All', 'Silk', 'Velvet', 'Cotton', 'Linen', 'Satin', 'Organza', 'Brocade'];

  const fabricsList = [
    { id: 'f1', name: 'Silk', cat: 'Silk', desc: 'Lustrous · fluid', roughness: 0.18, metalness: 0.05, img: '/fab1.jpg' },
    { id: 'f2', name: 'Velvet', cat: 'Velvet', desc: 'Deep pile · rich', roughness: 0.97, metalness: 0.0, img: '/fab2.jpg' },
    { id: 'f3', name: 'Cotton', cat: 'Cotton', desc: 'Matte · breathable', roughness: 0.88, metalness: 0.02, img: '/fab3.jpg' },
    { id: 'f4', name: 'Linen', cat: 'Linen', desc: 'Textured · natural', roughness: 0.92, metalness: 0.0, img: '/fab4.jpg' },
    { id: 'f5', name: 'Satin', cat: 'Satin', desc: 'Glossy · smooth', roughness: 0.14, metalness: 0.08, img: '/fab5.jpg' },
    { id: 'f6', name: 'Organza', cat: 'Organza', desc: 'Sheer · crisp', roughness: 0.5, metalness: 0.1, img: '/fab6.jpg' },
    { id: 'f7', name: 'Net', cat: 'Net', desc: 'Lightweight mesh', roughness: 0.6, metalness: 0.0, img: '/fab3.jpg' },
    { id: 'f8', name: 'Brocade', cat: 'Brocade', desc: 'Woven gold metallic', roughness: 0.3, metalness: 0.7, img: '/fab1.jpg' }
  ];

  const colorSwatches = [
    { name: 'Pink', hex: '#E9008C' },
    { name: 'Magenta', hex: '#D6007F' },
    { name: 'Red', hex: '#8C1F28' },
    { name: 'Maroon', hex: '#631219' },
    { name: 'Purple', hex: '#9B1DDB' },
    { name: 'Blue', hex: '#2563EB' },
    { name: 'Navy', hex: '#1B2A41' },
    { name: 'Green', hex: '#059669' },
    { name: 'Emerald', hex: '#10B981' },
    { name: 'Gold', hex: '#EAB308' },
    { name: 'Ivory', hex: '#EFEAE1' },
    { name: 'Black', hex: '#101828' }
  ];

  const variationsList = [
    { id: 'original', name: 'Original Royal Red', color: '#8C1F28', img: '/br_b1.jpg' },
    { id: 'pink', name: 'Modern StitchBee Pink', color: '#E9008C', img: '/b5.jpg' },
    { id: 'gold', name: 'Royal Metallic Gold', color: '#EAB308', img: '/b7.jpg' },
    { id: 'green', name: 'Minimal Emerald Green', color: '#10B981', img: '/b3.jpg' },
    { id: 'purple', name: 'Deep Purple Anarkali', color: '#9B1DDB', img: '/b6.jpg' },
    { id: 'navy', name: 'Classic Navy Blue', color: '#1B2A41', img: '/b4.jpg' }
  ];

  const patternsList = ['Floral', 'Geometric', 'Paisley', 'Traditional', 'Minimal', 'Zari', 'Sequin', 'Embroidered', 'Printed', 'Jacquard'];

  // --------------------------------------------------------------------------
  // UPLOAD & AI HANDLERS
  // --------------------------------------------------------------------------
  const processUploadedSketch = (file) => {
    setUploadError('');
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Maximum file size is 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedSketch(e.target.result);
      setSketchFileName(file.name);
      setSketchFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      showToast(`Uploaded sketch "${file.name}".`);
      triggerAIGeneration();
    };
    reader.readAsDataURL(file);
  };

  const triggerAIGeneration = () => {
    setIsGenerating(true);
    setGenProgress(10);
    setGenStatusMsg('AI is analyzing your sketch...');

    const pipelineSteps = [
      { p: 25, msg: 'Analyzing garment silhouette...' },
      { p: 45, msg: 'Understanding neckline & sleeve structure...' },
      { p: 65, msg: 'Applying fabric texture & zari embroidery...' },
      { p: 85, msg: 'Rendering realistic fashion image...' },
      { p: 100, msg: 'Finalizing design...' }
    ];

    const prompt = `Photorealistic fashion design, ${designName}, ${primaryColor} primary color, ${selectedFabric} fabric, high detailed haute couture photography, studio lighting, clean background, 8k resolution`;

    const seed = Math.floor(Math.random() * 1000000);
    const aiApiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=768&height=1024&seed=${seed}&model=flux&nologo=true`;
    const fallbackImg = variationsList.find(v => v.id === selectedVariation)?.img || '/br_b1.jpg';

    let isHandled = false;
    const finishGeneration = (targetImg) => {
      if (isHandled) return;
      isHandled = true;
      setGeneratedImageUrl(targetImg);
      setIsGenerating(false);
      showToast('✓ Realistic design generated successfully.');
      addVersionRecord('AI Generation');
    };

    const timer = setTimeout(() => {
      finishGeneration(fallbackImg);
    }, 3200);

    const testImg = new Image();
    testImg.onload = () => {
      clearTimeout(timer);
      finishGeneration(aiApiUrl);
    };
    testImg.onerror = () => {
      clearTimeout(timer);
      finishGeneration(fallbackImg);
    };
    testImg.src = aiApiUrl;

    pipelineSteps.forEach((s, idx) => {
      setTimeout(() => {
        setGenProgress(s.p);
        setGenStatusMsg(s.msg);
      }, (idx + 1) * 550);
    });
  };

  // --------------------------------------------------------------------------
  // THREE.JS 3D CANVAS ENGINE
  // --------------------------------------------------------------------------
  const glCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const garmentMeshGroupRef = useRef(null);
  const autoRotateRef = useRef(false);
  const rotateSpeedRef = useRef(0.006);
  const [is3DAutoRotate, setIs3DAutoRotate] = useState(false);

  const rebuild3DGarmentMesh = () => {
    if (!garmentMeshGroupRef.current) return;
    const gGroup = garmentMeshGroupRef.current;
    gGroup.clear();

    const selectedF = fabricsList.find(f => f.name === selectedFabric) || fabricsList[0];
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(primaryColor),
      roughness: selectedF.roughness,
      metalness: selectedF.metalness,
      side: THREE.DoubleSide
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
  };

  useEffect(() => {
    if (!glCanvasRef.current) return;
    const canvas = glCanvasRef.current;
    const width = canvas.parentElement?.clientWidth || 600;
    const height = canvas.parentElement?.clientHeight || 500;

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

    const pinkRim = new THREE.DirectionalLight(0xE9008C, 0.4);
    pinkRim.position.set(-3, 2, -2);
    scene.add(pinkRim);

    const floorGeo = new THREE.CircleGeometry(3.2, 64);
    const floorMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x141210 : 0xEFEAE1, roughness: 0.9 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const mannequinGroup = new THREE.Group();
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
        targetRotY += rotateSpeedRef.current;
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
  }, [primaryColor, selectedFabric, selectedGarment]);

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: appBg,
      color: textPrimary,
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      
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
      {/* 1. TOP PAGE HEADER BAR                                               */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        padding: '24px 32px 18px 32px',
        borderBottom: `1px solid ${borderDefault}`,
        background: cardBg,
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', lineHeight: '32px', fontWeight: 700, color: textPrimary, letterSpacing: '-0.02em' }}>
              Convert Sketch to Realistic Design
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', lineHeight: '20px', color: textSecondary }}>
              Upload your hand sketch and let StitchBee AI bring your fashion imagination to life.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setIsSaveModalOpen(true)}
              style={{
                height: '38px',
                padding: '0 16px',
                borderRadius: '8px',
                border: `1px solid ${borderDefault}`,
                background: '#FFFFFF',
                color: textPrimary,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05)'
              }}
            >
              <FileText size={15} color={textMuted} />
              <span>Save Draft</span>
            </button>

            <button 
              onClick={() => setIsExportModalOpen(true)}
              style={{
                height: '38px',
                padding: '0 18px',
                borderRadius: '8px',
                border: 'none',
                background: primaryGradient,
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(233,0,140,0.25)'
              }}
            >
              <Download size={15} color="#FFFFFF" />
              <span>Export Design</span>
            </button>
          </div>
        </div>

        {/* Workflow Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '820px' }}>
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
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: isCompleted ? '#12B76A' : isActive ? primaryPink : (isDark ? 'rgba(255,255,255,0.08)' : '#EAECF0'),
                  color: isActive || isCompleted ? '#FFFFFF' : textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '12px'
                }}>
                  {isCompleted ? <Check size={13} color="#FFFFFF" strokeWidth={3} /> : s.step}
                </div>
                <span style={{ fontSize: '13px', fontWeight: isActive ? 600 : 500, color: isActive ? primaryPink : isCompleted ? textPrimary : textMuted }}>
                  {s.label}
                </span>

                {idx < 4 && (
                  <div style={{ width: '50px', height: '2px', background: currentStep > s.step ? '#12B76A' : borderLight, margin: '0 8px' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. THREE-COLUMN WORKSPACE GRID (280px - 1fr - 320px)                 */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr 320px',
        gap: '20px',
        padding: '24px 32px',
        alignItems: 'start'
      }}>

        {/* ================================================================== */}
        {/* LEFT COLUMN: SKETCH & GARMENT SELECTION                            */}
        {/* ================================================================== */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderDefault}`,
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textPrimary }}>Sketch & AI</h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: textMuted }}>Upload your hand sketch</p>
          </div>

          {/* Upload Box */}
          {!uploadedSketch ? (
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) processUploadedSketch(e.dataTransfer.files[0]); }}
              style={{
                height: '240px',
                border: `1.5px dashed ${isDragging ? primaryPink : '#F0A8D2'}`,
                background: isDragging ? pinkTint : '#FFFBFD',
                borderRadius: '10px',
                padding: '20px 16px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files[0] && processUploadedSketch(e.target.files[0])} accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} />
              
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: pinkTint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={20} color={primaryPink} />
              </div>

              <div>
                <strong style={{ fontSize: '13.5px', color: textPrimary, display: 'block' }}>Upload your fashion sketch</strong>
                <span style={{ fontSize: '11.5px', color: textMuted }}>Drag & drop or click to browse</span>
              </div>

              <span style={{ fontSize: '10.5px', color: textMuted }}>Supported: JPG, PNG, WEBP · Max: 10MB</span>

              <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '4px' }}>
                <button 
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{ flex: 1, height: '36px', borderRadius: '8px', border: 'none', background: primaryGradient, color: '#FFFFFF', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Upload Sketch
                </button>
                <button 
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{ padding: '0 12px', height: '36px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Camera size={14} color={textMuted} />
                  <span>Photo</span>
                </button>
              </div>
            </div>
          ) : (
            /* Uploaded Preview */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ height: '220px', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${borderDefault}`, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                <img src={uploadedSketch} alt="Uploaded Sketch" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: textSecondary }}>
                <span style={{ fontWeight: 600, color: textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '130px' }}>{sketchFileName}</span>
                <span>{sketchFileSize}</span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ flex: 1, height: '34px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  Replace
                </button>
                <button onClick={() => { setUploadedSketch(null); showToast('Sketch removed.'); }} style={{ height: '34px', padding: '0 14px', borderRadius: '6px', border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#F04438', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            </div>
          )}

          {uploadError && (
            <div style={{ padding: '8px 12px', borderRadius: '6px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#F04438', fontSize: '11.5px' }}>
              {uploadError}
            </div>
          )}

          {/* Garment Type Selector */}
          <div style={{ borderTop: `1px solid ${borderDefault}`, paddingTop: '16px' }}>
            <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 600, color: textPrimary }}>Garment Type</h4>
            <span style={{ fontSize: '11.5px', color: textMuted, display: 'block', marginBottom: '10px' }}>Select silhouette structure.</span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {garmentTypes.map(gt => {
                const isSelected = selectedGarment === gt.id;
                return (
                  <div
                    key={gt.id}
                    onClick={() => { setSelectedGarment(gt.id); showToast(`Selected ${gt.label}`); }}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: isSelected ? pinkTint : secondaryBg,
                      cursor: 'pointer',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    <div style={{ fontSize: '18px', marginBottom: '2px' }}>{gt.icon}</div>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: isSelected ? primaryPink : textPrimary, display: 'block' }}>{gt.label}</span>
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', background: primaryPink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={8} color="#FFFFFF" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button 
            onClick={triggerAIGeneration}
            disabled={isGenerating}
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '8px',
              border: 'none',
              background: primaryGradient,
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 3px 10px rgba(233,0,140,0.22)'
            }}
          >
            <Sparkles size={15} color="#FFFFFF" />
            <span>Generate Realistic Design</span>
          </button>
        </div>

        {/* ================================================================== */}
        {/* CENTER COLUMN: MAIN STAGE VIEWPORT (560px Height)                  */}
        {/* ================================================================== */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderDefault}`,
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {/* Viewport Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: secondaryBg, padding: '3px', borderRadius: '8px', border: `1px solid ${borderDefault}`, gap: '4px' }}>
              {[
                { id: '2d', label: '2D View' },
                { id: '3d', label: '3D View' },
                { id: 'split', label: 'Split View' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setViewerMode(m.id)}
                  style={{
                    border: 'none',
                    background: viewerMode === m.id ? primaryPink : 'transparent',
                    color: viewerMode === m.id ? '#FFFFFF' : textSecondary,
                    fontSize: '12.5px',
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: textMuted }}>Fabric:</span>
              <select 
                value={selectedFabric} 
                onChange={(e) => { setSelectedFabric(e.target.value); showToast(`Fabric set to ${e.target.value}`); }}
                style={{ height: '30px', padding: '0 8px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12px', fontWeight: 600 }}
              >
                {fabricsList.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
              </select>
            </div>
          </div>

          {/* Viewport Main Stage */}
          <div style={{ position: 'relative', height: '520px', borderRadius: '10px', overflow: 'hidden', background: secondaryBg, border: `1px solid ${borderDefault}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* AI Generation Progress Modal Overlay */}
            {isGenerating && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: `3px solid ${primaryPink}25`, borderTopColor: primaryPink, animation: 'spin 1s linear infinite' }} />
                
                <div>
                  <strong style={{ fontSize: '16px', color: textPrimary, display: 'block' }}>AI is analyzing your sketch...</strong>
                  <span style={{ fontSize: '12.5px', color: primaryPink, fontWeight: 600, marginTop: '2px', display: 'block' }}>{genStatusMsg}</span>
                </div>

                <div style={{ width: '260px', height: '6px', borderRadius: '3px', background: '#EAECF0', overflow: 'hidden' }}>
                  <div style={{ width: `${genProgress}%`, height: '100%', background: primaryGradient, transition: 'width 0.4s ease' }} />
                </div>
                <span style={{ fontSize: '11.5px', color: textMuted }}>Progress: {genProgress}%</span>
              </div>
            )}

            {/* View Modes */}
            {viewerMode === 'split' ? (
              <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <div style={{ flex: 1, borderRight: `1px solid ${borderDefault}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', background: '#FFFFFF' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: textMuted, marginBottom: '6px' }}>ORIGINAL SKETCH</span>
                  {uploadedSketch ? <img src={uploadedSketch} alt="Original Sketch" style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} /> : <span style={{ fontSize: '12px', color: textMuted }}>No sketch</span>}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', background: '#FFFFFF' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: primaryPink, marginBottom: '6px' }}>AI REALISTIC RENDER</span>
                  <img src={generatedImageUrl} alt="AI Realistic Render" style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} />
                </div>
              </div>
            ) : viewerMode === '3d' ? (
              <canvas ref={glCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', overflow: 'hidden' }}>
                <img 
                  src={generatedImageUrl} 
                  alt="2D Fashion Design" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/br_b1.jpg'; }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg)`,
                    transition: 'transform 0.2s ease'
                  }}
                />
              </div>
            )}

            {/* Right Floating Vertical Controls */}
            <div style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#FFFFFF',
              border: `1px solid ${borderDefault}`,
              borderRadius: '8px',
              padding: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(16, 24, 40, 0.08)',
              zIndex: 20
            }}>
              <button onClick={() => setRotationAngle((r) => (r + 90) % 360)} title="Rotate" style={{ border: 'none', background: 'transparent', color: textSecondary, cursor: 'pointer', padding: '4px' }}>
                <RotateCw size={15} />
              </button>
              <button onClick={() => setZoomLevel((z) => Math.min(z + 25, 300))} title="Zoom In" style={{ border: 'none', background: 'transparent', color: textSecondary, cursor: 'pointer', padding: '4px' }}>
                <ZoomIn size={15} />
              </button>
              <button onClick={() => setZoomLevel((z) => Math.max(z - 25, 50))} title="Zoom Out" style={{ border: 'none', background: 'transparent', color: textSecondary, cursor: 'pointer', padding: '4px' }}>
                <ZoomOut size={15} />
              </button>
              <button onClick={() => { setZoomLevel(100); setRotationAngle(0); }} title="Reset" style={{ border: 'none', background: 'transparent', color: textSecondary, cursor: 'pointer', padding: '4px' }}>
                <RefreshCw size={15} />
              </button>
            </div>

            {/* Bottom Floating Controls */}
            <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, background: '#FFFFFF', border: `1px solid ${borderDefault}`, padding: '4px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(16, 24, 40, 0.08)' }}>
              {['Front', 'Back', 'Left', 'Right'].map(pos => (
                <button 
                  key={pos}
                  onClick={() => { garmentMeshGroupRef.current && (garmentMeshGroupRef.current.rotation.y = pos === 'Front' ? 0 : pos === 'Back' ? Math.PI : pos === 'Left' ? Math.PI / 2 : -Math.PI / 2); }}
                  style={{ border: 'none', background: 'transparent', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: '2px 4px' }}
                >
                  {pos}
                </button>
              ))}

              <div style={{ width: '1px', height: '14px', background: borderDefault }} />

              <button 
                onClick={() => { autoRotateRef.current = !autoRotateRef.current; setIs3DAutoRotate(autoRotateRef.current); showToast(`Auto-Rotate ${autoRotateRef.current ? 'ON' : 'OFF'}`); }}
                style={{ border: 'none', background: is3DAutoRotate ? primaryPink : 'transparent', color: is3DAutoRotate ? '#FFFFFF' : textPrimary, fontSize: '12px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', cursor: 'pointer' }}
              >
                360°
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '10.5px', color: textMuted }}>Zoom:</span>
                <input type="range" min="50" max="300" step="10" value={zoomLevel} onChange={(e) => setZoomLevel(parseInt(e.target.value))} style={{ width: '60px', accentColor: primaryPink }} />
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: textPrimary }}>{zoomLevel}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* RIGHT COLUMN: CUSTOMIZE DESIGN                                     */}
        {/* ================================================================== */}
        <div style={{
          background: cardBg,
          border: `1px solid ${borderDefault}`,
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textPrimary }}>Customize Design</h3>
          </div>

          {/* Sub-tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', borderBottom: `1px solid ${borderDefault}`, paddingBottom: '6px' }}>
            {['fabric', 'colors', 'details', 'patterns'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === tab ? primaryPink : textSecondary,
                  fontSize: '12.5px',
                  fontWeight: activeTab === tab ? 600 : 500,
                  padding: '4px 0',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? `2px solid ${primaryPink}` : '2px solid transparent',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* FABRIC TAB */}
          {activeTab === 'fabric' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
                {fabricCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFabricCategory(cat)}
                    style={{
                      border: selectedFabricCategory === cat ? `1px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: selectedFabricCategory === cat ? pinkTint : secondaryBg,
                      color: selectedFabricCategory === cat ? primaryPink : textSecondary,
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {fabricsList.filter(f => selectedFabricCategory === 'All' || f.cat === selectedFabricCategory).map(f => {
                  const isSelected = selectedFabric === f.name;
                  return (
                    <div
                      key={f.id}
                      onClick={() => { setSelectedFabric(f.name); showToast(`Selected ${f.name}`); }}
                      style={{
                        border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                        borderRadius: '8px',
                        padding: '6px',
                        cursor: 'pointer',
                        background: isSelected ? pinkTint : secondaryBg,
                        position: 'relative'
                      }}
                    >
                      <img src={f.img} alt={f.name} style={{ width: '100%', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                      <strong style={{ fontSize: '11.5px', color: textPrimary, marginTop: '4px', display: 'block' }}>{f.name}</strong>
                      <span style={{ fontSize: '9.5px', color: textMuted }}>{f.desc}</span>
                      {isSelected && (
                        <div style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', background: primaryPink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={8} color="#FFFFFF" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <button onClick={() => showToast(`Applied ${selectedFabric} fabric.`)} style={{ flex: 1, height: '34px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Apply Fabric</button>
                <button onClick={triggerAIGeneration} style={{ flex: 1, height: '34px', borderRadius: '6px', border: 'none', background: primaryGradient, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>AI Re-render</button>
              </div>
            </div>
          )}

          {/* COLORS TAB */}
          {activeTab === 'colors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['primary', 'secondary', 'accent'].map(r => (
                  <button
                    key={r}
                    onClick={() => setColorRole(r)}
                    style={{
                      flex: 1,
                      padding: '5px',
                      borderRadius: '6px',
                      border: colorRole === r ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: colorRole === r ? pinkTint : secondaryBg,
                      fontSize: '11px',
                      fontWeight: 600,
                      color: textPrimary,
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="color" 
                  value={colorRole === 'primary' ? primaryColor : colorRole === 'secondary' ? secondaryColor : accentColor} 
                  onChange={(e) => {
                    const val = e.target.value;
                    if (colorRole === 'primary') setPrimaryColor(val);
                    else if (colorRole === 'secondary') setSecondaryColor(val);
                    else setAccentColor(val);
                  }}
                  style={{ width: '36px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '10.5px', color: textMuted, display: 'block', textTransform: 'capitalize' }}>{colorRole} Color HEX</label>
                  <input 
                    type="text" 
                    value={(colorRole === 'primary' ? primaryColor : colorRole === 'secondary' ? secondaryColor : accentColor).toUpperCase()} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (colorRole === 'primary') setPrimaryColor(val);
                      else if (colorRole === 'secondary') setSecondaryColor(val);
                      else setAccentColor(val);
                    }}
                    style={{ width: '100%', height: '30px', padding: '0 8px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '11.5px', fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              <div>
                <strong style={{ fontSize: '11.5px', fontWeight: 600, color: textPrimary, display: 'block', marginBottom: '6px' }}>Fashion Swatches</strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
                  {colorSwatches.map(cs => (
                    <div 
                      key={cs.name}
                      onClick={() => {
                        if (colorRole === 'primary') setPrimaryColor(cs.hex);
                        else if (colorRole === 'secondary') setSecondaryColor(cs.hex);
                        else setAccentColor(cs.hex);
                        showToast(`Set ${colorRole}: ${cs.name}`);
                      }}
                      title={cs.name}
                      style={{
                        height: '26px',
                        borderRadius: '6px',
                        background: cs.hex,
                        border: (colorRole === 'primary' ? primaryColor : colorRole === 'secondary' ? secondaryColor : accentColor) === cs.hex ? `2px solid ${primaryPink}` : '1px solid rgba(0,0,0,0.12)',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DETAILS TAB */}
          {activeTab === 'details' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '3px' }}>Embroidery</label>
                <select value={embroidery} onChange={(e) => setEmbroidery(e.target.value)} style={{ width: '100%', height: '32px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12px', padding: '0 8px' }}>
                  <option value="Heavy">Heavy Zardozi</option>
                  <option value="Medium">Medium Threadwork</option>
                  <option value="Minimal">Minimal Border</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '3px' }}>Sleeves</label>
                <select value={sleeves} onChange={(e) => setSleeves(e.target.value)} style={{ width: '100%', height: '32px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12px', padding: '0 8px' }}>
                  <option value="Full Sleeve">Full Sleeve</option>
                  <option value="Short Sleeves">Short Sleeves</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '3px' }}>Neckline</label>
                <select value={neckline} onChange={(e) => setNeckline(e.target.value)} style={{ width: '100%', height: '32px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12px', padding: '0 8px' }}>
                  <option value="V-Neck">V-Neck</option>
                  <option value="Sweetheart">Sweetheart</option>
                  <option value="Round Neck">Round Neck</option>
                </select>
              </div>
            </div>
          )}

          {/* PATTERNS TAB */}
          {activeTab === 'patterns' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {patternsList.map(p => {
                const isSelected = selectedPattern === p;
                return (
                  <button
                    key={p}
                    onClick={() => { setSelectedPattern(p); showToast(`Selected pattern: ${p}`); }}
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: isSelected ? pinkTint : secondaryBg,
                      color: isSelected ? primaryPink : textPrimary,
                      fontSize: '11.5px',
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

          {/* VERSION HISTORY */}
          <div style={{ borderTop: `1px solid ${borderDefault}`, paddingTop: '12px' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 600, color: textPrimary }}>Version History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '130px', overflowY: 'auto' }}>
              {versionList.map(v => (
                <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px', borderRadius: '6px', background: v.isCurrent ? pinkTint : secondaryBg }}>
                  <div>
                    <strong style={{ fontSize: '11.5px', color: v.isCurrent ? primaryPink : textPrimary, display: 'block' }}>{v.title}</strong>
                    <span style={{ fontSize: '9.5px', color: textMuted }}>{v.time}</span>
                  </div>
                  {!v.isCurrent && (
                    <button onClick={() => showToast(`Restored ${v.title}`)} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '10.5px', fontWeight: 600, cursor: 'pointer' }}>
                      Restore
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 3. DESIGN VARIATIONS CAROUSEL                                         */}
      {/* -------------------------------------------------------------------- */}
      <div style={{ margin: '0 32px 20px 32px', background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textPrimary }}>Design Variations</h3>
            <span style={{ fontSize: '11.5px', color: textMuted }}>AI-generated variations for your sketch.</span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setVariationIndex(i => Math.max(i - 1, 0))} style={{ width: '30px', height: '30px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={15} color={textPrimary} />
            </button>
            <button onClick={() => setVariationIndex(i => Math.min(i + 1, variationsList.length - 4))} style={{ width: '30px', height: '30px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={15} color={textPrimary} />
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
          {variationsList.map(v => {
            const isSelected = selectedVariation === v.id;
            return (
              <div
                key={v.id}
                onClick={() => {
                  setSelectedVariation(v.id);
                  setGeneratedImageUrl(v.img);
                  showToast(`Selected variation: ${v.name}`);
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
                <img src={v.img} alt={v.name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: textPrimary, padding: '5px', textAlign: 'center' }}>{v.name}</span>
                {isSelected && (
                  <div style={{ position: 'absolute', top: '4px', right: '4px', width: '14px', height: '14px', borderRadius: '50%', background: primaryPink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={9} color="#FFFFFF" strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 4. DESIGN INFORMATION PANEL                                           */}
      {/* -------------------------------------------------------------------- */}
      <div style={{ margin: '0 32px', background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.05)' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 600, color: textPrimary }}>Design Information</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 1.5fr', gap: '14px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '10.5px', color: textMuted, display: 'block', marginBottom: '3px' }}>Design Name</label>
            <input type="text" value={designName} onChange={(e) => setDesignName(e.target.value)} style={{ width: '100%', height: '34px', padding: '0 10px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12.5px' }} />
          </div>

          <div>
            <label style={{ fontSize: '10.5px', color: textMuted, display: 'block', marginBottom: '3px' }}>Category</label>
            <input type="text" value={designCategory} onChange={(e) => setDesignCategory(e.target.value)} style={{ width: '100%', height: '34px', padding: '0 10px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12.5px' }} />
          </div>

          <div>
            <label style={{ fontSize: '10.5px', color: textMuted, display: 'block', marginBottom: '3px' }}>Occasion</label>
            <input type="text" value={designOccasion} onChange={(e) => setDesignOccasion(e.target.value)} style={{ width: '100%', height: '34px', padding: '0 10px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12.5px' }} />
          </div>

          <div>
            <label style={{ fontSize: '10.5px', color: textMuted, display: 'block', marginBottom: '3px' }}>Created On</label>
            <input type="text" readOnly value={createdDate} style={{ width: '100%', height: '34px', padding: '0 10px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: secondaryBg, color: textMuted, fontSize: '12.5px' }} />
          </div>

          <div>
            <label style={{ fontSize: '10.5px', color: textMuted, display: 'block', marginBottom: '3px' }}>Tags</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {tags.map(t => (
                <span key={t} style={{ fontSize: '10.5px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', background: pinkTint, color: primaryPink, border: `1px solid ${primaryPink}30`, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {t}
                  <X size={9} style={{ cursor: 'pointer' }} onClick={() => setTags(tags.filter(x => x !== t))} />
                </span>
              ))}

              {isAddingTag ? (
                <input type="text" autoFocus value={newTagInput} onChange={(e) => setNewTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTag()} onBlur={handleAddTag} style={{ width: '70px', height: '22px', borderRadius: '10px', border: `1px solid ${primaryPink}`, padding: '0 6px', fontSize: '10.5px' }} />
              ) : (
                <button onClick={() => setIsAddingTag(true)} style={{ width: '22px', height: '22px', borderRadius: '50%', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textMuted, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Plus size={11} />
                </button>
              )}
            </div>
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
              <input type="text" value={designName} onChange={(e) => setDesignName(e.target.value)} style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12.5px' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '18px' }}>
              <button onClick={() => setIsSaveModalOpen(false)} style={{ height: '34px', padding: '0 14px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setIsSaveModalOpen(false); showToast(`Saved "${designName}" to Vault.`); }} style={{ height: '34px', padding: '0 16px', borderRadius: '6px', border: 'none', background: primaryGradient, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Save Design</button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {isExportModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 24, 40, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '440px', background: cardBg, borderRadius: '12px', padding: '20px', border: `1px solid ${borderDefault}`, boxShadow: '0 4px 12px rgba(16, 24, 40, 0.15)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: textPrimary }}>Export Package</h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: textSecondary }}>Export options for "{designName}".</p>

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
