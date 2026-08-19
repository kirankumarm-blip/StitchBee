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
  // EXACT STITCHBEE COLOR & TYPOGRAPHY SYSTEM
  // --------------------------------------------------------------------------
  const primaryPink = '#E9008C';
  const primaryPinkHover = '#D6007F';
  const secondaryPurple = '#9B1DDB';
  const purpleHover = '#8616C2';
  const primaryGradient = 'linear-gradient(135deg, #E9008C 0%, #9B1DDB 100%)';
  
  const textPrimary = '#101828';
  const textSecondary = '#475467';
  const textMuted = '#667085';
  const textDisabled = '#98A2B3';

  const appBg = isDark ? '#0D0A1A' : '#F8F9FC';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const secondaryBg = isDark ? '#141124' : '#F9FAFB';
  const inputBg = isDark ? '#231D34' : '#FFFFFF';
  const hoverBg = isDark ? 'rgba(233,0,140,0.1)' : '#FFF1F8';
  const pinkTint = isDark ? 'rgba(233,0,140,0.15)' : '#FFF0F7';
  const purpleTint = isDark ? 'rgba(155,29,219,0.15)' : '#F8F0FF';

  const borderDefault = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E4E7EC';
  const borderLight = isDark ? 'rgba(255, 255, 255, 0.08)' : '#EAECF0';
  const borderSelected = '#E9008C';

  // --------------------------------------------------------------------------
  // GLOBAL WORKSPACE STATE
  // --------------------------------------------------------------------------
  const [currentStep, setCurrentStep] = useState(2); // 1: Upload Sketch, 2: AI Generate, 3: Customize, 4: 3D Preview, 5: Download
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
  const [zoomLevel, setZoomLevel] = useState(100); // 50% - 300%
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  // Right Customization Tabs & State
  const [activeTab, setActiveTab] = useState('fabric'); // 'fabric' | 'color' | 'details' | 'pattern'
  const [selectedFabricCategory, setSelectedFabricCategory] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('Silk');
  const [fabricApplyMode, setFabricApplyMode] = useState('local'); // 'local' | 'ai'
  
  // Colors State
  const [colorRole, setColorRole] = useState('primary'); // 'primary' | 'secondary' | 'accent'
  const [primaryColor, setPrimaryColor] = useState('#E9008C');
  const [secondaryColor, setSecondaryColor] = useState('#F5F3EE');
  const [accentColor, setAccentColor] = useState('#9B1DDB');

  // Detail Customization Dropdowns
  const [embroidery, setEmbroidery] = useState('Heavy');
  const [borderStyle, setBorderStyle] = useState('Traditional');
  const [sleeves, setSleeves] = useState('Full Sleeve');
  const [neckline, setNeckline] = useState('V-Neck');
  const [waist, setWaist] = useState('Fitted');
  const [garmentLength, setGarmentLength] = useState('Regular');
  const [dupatta, setDupatta] = useState('Embroidered');
  const [fit, setFit] = useState('Regular');
  const [buttons, setButtons] = useState('Gold Decorative');

  // Patterns State
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
  // DATA DEFINITIONS (Garment, Fabrics, Swatches, Variations)
  // --------------------------------------------------------------------------
  const garmentTypes = [
    { id: 'shirt', label: 'Shirt / Kurti', icon: '👔' },
    { id: 'jacket', label: 'Jacket / Blazer', icon: '🧥' },
    { id: 'dress', label: 'Anarkali / Dress', icon: '👗' },
    { id: 'gown', label: 'Lehenga Gown', icon: '✨' }
  ];

  const fabricCategories = ['All', 'Silk', 'Velvet', 'Cotton', 'Linen', 'Satin', 'Organza', 'Net', 'Brocade', 'Chiffon', 'Georgette'];

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
    { name: 'Black', hex: '#101828' },
    { name: 'Beige', hex: '#CBB994' },
    { name: 'White', hex: '#FFFFFF' }
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
  // SKETCH UPLOAD & VALIDATION HANDLERS
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
      showToast(`Sketch "${file.name}" uploaded successfully.`);
      triggerAIGeneration();
    };
    reader.readAsDataURL(file);
  };

  // --------------------------------------------------------------------------
  // AI GENERATION PIPELINE (WITH FREE FLUX API & RELIABLE FALLBACK)
  // --------------------------------------------------------------------------
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

    const selectedF = selectedFabric;
    const prompt = `Photorealistic fashion design, ${designName}, ${primaryColor} primary color, ${selectedF} fabric, high detailed haute couture photography, studio lighting, clean background, 8k resolution`;

    const seed = Math.floor(Math.random() * 1000000);
    const aiApiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=768&height=1024&seed=${seed}&model=flux&nologo=true`;
    const fallbackImg = variationsList.find(v => v.id === selectedVariation)?.img || '/br_b1.jpg';

    let isHandled = false;
    const finishGeneration = (targetImg) => {
      if (isHandled) return;
      isHandled = true;
      setGeneratedImageUrl(targetImg);
      setIsGenerating(false);
      showToast('✓ Design generated successfully');
      addVersionRecord('AI Generation');
    };

    // Preload AI image with 3.2s timeout fallback
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
  // THREE.JS 3D CANVAS & ORBITCONTROLS ENGINE
  // --------------------------------------------------------------------------
  const glCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const garmentMeshGroupRef = useRef(null);
  const autoRotateRef = useRef(false);
  const rotateSpeedRef = useRef(0.006);
  const [is3DAutoRotate, setIs3DAutoRotate] = useState(false);
  const [rotateSpeedMode, setRotateSpeedMode] = useState('Medium'); // 'Slow' | 'Medium' | 'Fast'

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
    const width = canvas.parentElement.clientWidth || 600;
    const height = canvas.parentElement.clientHeight || 500;

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

    // Floor Disk
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

    // Initial 3D Garment Mesh Build
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
  }, [primaryColor, selectedFabric, selectedGarment, details]);

  // Tag Handlers
  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
      setIsAddingTag(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: appBg, color: textPrimary, minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Toast Notification Alert */}
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
          boxShadow: '0 4px 12px rgba(16, 24, 40, 0.15)',
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
      {/* 1. PAGE HEADER & TOP ACTION BUTTONS                                   */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        padding: '24px 32px 16px 32px',
        borderBottom: `1px solid ${borderDefault}`,
        background: cardBg,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', lineHeight: '36px', fontWeight: 700, color: textPrimary }}>
              Convert Sketch to Realistic Design
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', lineHeight: '21px', color: textSecondary }}>
              Upload your sketch and let StitchBee AI bring your fashion design to life.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setIsSaveModalOpen(true)}
              style={{
                height: '40px',
                padding: '0 18px',
                borderRadius: '8px',
                border: `1px solid ${borderDefault}`,
                background: '#FFFFFF',
                color: textPrimary,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileText size={16} color={textMuted} />
              <span>Save Draft</span>
            </button>

            <button 
              onClick={() => setIsExportModalOpen(true)}
              style={{
                height: '40px',
                padding: '0 20px',
                borderRadius: '8px',
                border: 'none',
                background: primaryGradient,
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(233,0,140,0.25)'
              }}
            >
              <Download size={16} color="#FFFFFF" />
              <span>Export Design</span>
            </button>
          </div>
        </div>

        {/* 5-Step Stepper Bar (Exact Point 11 Requirements) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '860px', margin: '4px 0 0 0' }}>
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
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isCompleted ? '#12B76A' : isActive ? primaryPink : (isDark ? 'rgba(255,255,255,0.08)' : '#EAECF0'),
                  color: isActive || isCompleted ? '#FFFFFF' : textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '12px'
                }}>
                  {isCompleted ? <Check size={14} color="#FFFFFF" strokeWidth={3} /> : s.step}
                </div>
                <span style={{ fontSize: '14px', fontWeight: isActive ? 600 : 500, color: isActive ? primaryPink : isCompleted ? textPrimary : textMuted }}>
                  {s.label}
                </span>

                {idx < 4 && (
                  <div style={{ width: '60px', height: '2px', background: currentStep > s.step ? '#12B76A' : borderLight, margin: '0 10px' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. MAIN WORKSPACE — PERFECT Y-AXIS ALIGNED 3 COLUMNS (Point 12 & 59)   */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '24% 52% 24%',
        gap: '16px',
        padding: '24px 32px',
        alignItems: 'start'
      }}>

        {/* ================================================================== */}
        {/* LEFT PANEL: SKETCH & AI SOURCE (24% Width)                          */}
        {/* ================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.06)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', lineHeight: '22px', fontWeight: 600, color: textPrimary }}>
              Sketch & AI
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: textMuted }}>
              Upload your hand sketch
            </p>
          </div>

          {/* Upload Area (Point 13 & 14 Requirements) */}
          {!uploadedSketch ? (
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) processUploadedSketch(e.dataTransfer.files[0]); }}
              style={{
                height: '280px',
                border: `1.5px dashed ${isDragging ? primaryPink : '#F0A8D2'}`,
                background: isDragging ? hoverBg : '#FFFBFD',
                borderRadius: '12px',
                padding: '20px 16px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files[0] && processUploadedSketch(e.target.files[0])} accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} />
              
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: pinkTint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={22} color={primaryPink} />
              </div>

              <div>
                <strong style={{ fontSize: '14px', color: textPrimary, display: 'block' }}>Upload your fashion sketch</strong>
                <span style={{ fontSize: '12px', color: textMuted }}>Drag & drop or click to browse</span>
              </div>

              <span style={{ fontSize: '11px', color: textMuted }}>Supported: JPG, PNG, WEBP · Max: 10MB</span>

              <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '6px' }}>
                <button 
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{
                    flex: 1,
                    height: '38px',
                    borderRadius: '8px',
                    border: 'none',
                    background: primaryGradient,
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Upload Sketch
                </button>
                <button 
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{
                    padding: '0 12px',
                    height: '38px',
                    borderRadius: '8px',
                    border: `1px solid ${borderDefault}`,
                    background: '#FFFFFF',
                    color: textPrimary,
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Camera size={14} color={textMuted} />
                  <span>Photo</span>
                </button>
              </div>
            </div>
          ) : (
            /* Upload Preview Box (Point 15 Requirements) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                position: 'relative',
                height: '240px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: `1px solid ${borderDefault}`,
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px'
              }}>
                <img src={uploadedSketch} alt="Uploaded Sketch" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: textSecondary }}>
                <span style={{ fontWeight: 600, color: textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                  {sketchFileName}
                </span>
                <span>{sketchFileSize}</span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '8px',
                    border: `1px solid ${borderDefault}`,
                    background: '#FFFFFF',
                    color: textPrimary,
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Replace
                </button>
                <button 
                  onClick={() => { setUploadedSketch(null); showToast('Sketch removed.'); }}
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    borderRadius: '8px',
                    border: '1px solid #FCA5A5',
                    background: '#FEF2F2',
                    color: '#F04438',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Error Notice */}
          {uploadError && (
            <div style={{ padding: '10px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#F04438', fontSize: '12px' }}>
              {uploadError}
            </div>
          )}

          {/* Garment Type Selector (Point 16 Requirements) */}
          <div style={{ borderTop: `1px solid ${borderDefault}`, paddingTop: '16px' }}>
            <h4 style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: 600, color: textPrimary }}>Garment Type</h4>
            <span style={{ fontSize: '12px', color: textMuted, display: 'block', marginBottom: '12px' }}>Select or auto-detect silhouette from sketch.</span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {garmentTypes.map(gt => {
                const isSelected = selectedGarment === gt.id;
                return (
                  <div
                    key={gt.id}
                    onClick={() => { setSelectedGarment(gt.id); showToast(`Garment silhouette: ${gt.label}`); }}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                      background: isSelected ? pinkTint : secondaryBg,
                      cursor: 'pointer',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{gt.icon}</div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: isSelected ? primaryPink : textPrimary, display: 'block' }}>{gt.label}</span>
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

          {/* AI Generation Trigger CTA */}
          <button 
            onClick={triggerAIGeneration}
            disabled={isGenerating}
            style={{
              width: '100%',
              height: '42px',
              borderRadius: '8px',
              border: 'none',
              background: primaryGradient,
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(233,0,140,0.25)'
            }}
          >
            <Sparkles size={16} color="#FFFFFF" />
            <span>Generate Realistic Design</span>
          </button>

        </div>

        {/* ================================================================== */}
        {/* CENTER PANEL: LARGE DESIGN / 3D VIEWER (52% Width - Point 20-26)   */}
        {/* ================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.06)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Viewer Top Switcher Bar */}
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
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Top Right Fabric Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: textMuted }}>Fabric:</span>
              <select 
                value={selectedFabric} 
                onChange={(e) => { setSelectedFabric(e.target.value); showToast(`Switched fabric to ${e.target.value}`); }}
                style={{ height: '32px', padding: '0 10px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '13px', fontWeight: 600 }}
              >
                {fabricsList.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
              </select>
            </div>
          </div>

          {/* Center Main Stage Viewport (Point 62 Loading State) */}
          <div style={{ position: 'relative', height: '520px', borderRadius: '14px', overflow: 'hidden', background: secondaryBg, border: `1px solid ${borderDefault}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* AI Generation Loading Overlay Modal */}
            {isGenerating ? (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: `3px solid ${primaryPink}25`, borderTopColor: primaryPink, animation: 'spin 1s linear infinite' }} />
                
                <div>
                  <strong style={{ fontSize: '18px', color: textPrimary, display: 'block' }}>AI is analyzing your sketch...</strong>
                  <span style={{ fontSize: '13px', color: primaryPink, fontWeight: 600, marginTop: '4px', display: 'block' }}>{genStatusMsg}</span>
                </div>

                <div style={{ width: '280px', height: '6px', borderRadius: '3px', background: '#EAECF0', overflow: 'hidden' }}>
                  <div style={{ width: `${genProgress}%`, height: '100%', background: primaryGradient, transition: 'width 0.4s ease' }} />
                </div>
                <span style={{ fontSize: '12px', color: textMuted }}>Progress: {genProgress}%</span>
              </div>
            ) : null}

            {/* 2D & 3D Stage Modes */}
            {viewerMode === 'split' ? (
              <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <div style={{ flex: 1, borderRight: `1px solid ${borderDefault}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#FFFFFF' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: textMuted, marginBottom: '8px' }}>ORIGINAL SKETCH</span>
                  {uploadedSketch ? <img src={uploadedSketch} alt="Original Sketch" style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} /> : <span style={{ fontSize: '13px', color: textMuted }}>No sketch uploaded</span>}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#FFFFFF' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: primaryPink, marginBottom: '8px' }}>AI REALISTIC RENDER</span>
                  <img src={generatedImageUrl} alt="AI Realistic Render" style={{ maxWidth: '100%', maxHeight: '85%', objectFit: 'contain' }} />
                </div>
              </div>
            ) : viewerMode === '3d' ? (
              <canvas ref={glCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            ) : (
              /* 2D View Mode with Zoom & Rotate */
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflow: 'hidden' }}>
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

            {/* Vertical Floating Toolbar (Point 25 Requirements) */}
            <div style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#FFFFFF',
              border: `1px solid ${borderDefault}`,
              borderRadius: '8px',
              padding: '6px 4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: '0 4px 12px rgba(16, 24, 40, 0.08)',
              zIndex: 20
            }}>
              <button onClick={() => setRotationAngle((r) => (r + 90) % 360)} title="Rotate" style={{ border: 'none', background: 'transparent', color: textSecondary, cursor: 'pointer', padding: '4px' }}>
                <RotateCw size={16} />
              </button>
              <button onClick={() => setZoomLevel((z) => Math.min(z + 25, 300))} title="Zoom In" style={{ border: 'none', background: 'transparent', color: textSecondary, cursor: 'pointer', padding: '4px' }}>
                <ZoomIn size={16} />
              </button>
              <button onClick={() => setZoomLevel((z) => Math.max(z - 25, 50))} title="Zoom Out" style={{ border: 'none', background: 'transparent', color: textSecondary, cursor: 'pointer', padding: '4px' }}>
                <ZoomOut size={16} />
              </button>
              <button onClick={() => { setZoomLevel(100); setRotationAngle(0); }} title="Reset View" style={{ border: 'none', background: 'transparent', color: textSecondary, cursor: 'pointer', padding: '4px' }}>
                <RefreshCw size={16} />
              </button>
            </div>

            {/* Viewer Bottom Toolbar (Point 26 Requirements) */}
            <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, background: '#FFFFFF', border: `1px solid ${borderDefault}`, padding: '6px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 12px rgba(16, 24, 40, 0.08)' }}>
              {['Front', 'Back', 'Left', 'Right'].map(pos => (
                <button 
                  key={pos}
                  onClick={() => { garmentMeshGroupRef.current && (garmentMeshGroupRef.current.rotation.y = pos === 'Front' ? 0 : pos === 'Back' ? Math.PI : pos === 'Left' ? Math.PI / 2 : -Math.PI / 2); }}
                  style={{ border: 'none', background: 'transparent', color: textPrimary, fontSize: '13px', fontWeight: 600, cursor: 'pointer', padding: '2px 6px' }}
                >
                  {pos}
                </button>
              ))}

              <div style={{ width: '1px', height: '16px', background: borderDefault }} />

              <button 
                onClick={() => { autoRotateRef.current = !autoRotateRef.current; setIs3DAutoRotate(autoRotateRef.current); showToast(`Auto-Rotate ${autoRotateRef.current ? 'ON' : 'OFF'}`); }}
                style={{ border: 'none', background: is3DAutoRotate ? primaryPink : 'transparent', color: is3DAutoRotate ? '#FFFFFF' : textPrimary, fontSize: '13px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}
              >
                360°
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: textMuted }}>Zoom:</span>
                <input type="range" min="50" max="300" step="10" value={zoomLevel} onChange={(e) => setZoomLevel(parseInt(e.target.value))} style={{ width: '70px', accentColor: primaryPink }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: textPrimary }}>{zoomLevel}%</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================================================================== */}
        {/* RIGHT PANEL: CUSTOMIZE DESIGN (24% Width - Point 27-37)            */}
        {/* ================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.06)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', lineHeight: '22px', fontWeight: 600, color: textPrimary }}>
              Customize Design
            </h3>
          </div>

          {/* Tabs Navigation (Point 27 Requirements) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', borderBottom: `1px solid ${borderDefault}`, paddingBottom: '8px' }}>
            {['fabric', 'colors', 'details', 'patterns'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === tab ? primaryPink : textSecondary,
                  fontSize: '13px',
                  fontWeight: activeTab === tab ? 600 : 500,
                  padding: '6px 0',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? `2px solid ${primaryPink}` : '2px solid transparent',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* FABRIC TAB (Point 28-30 Requirements) */}
          {activeTab === 'fabric' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
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
                      padding: '4px 10px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Fabric 64x64 Swatches */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {fabricsList.filter(f => selectedFabricCategory === 'All' || f.cat === selectedFabricCategory).map(f => {
                  const isSelected = selectedFabric === f.name;
                  return (
                    <div
                      key={f.id}
                      onClick={() => { setSelectedFabric(f.name); showToast(`Selected fabric: ${f.name}`); }}
                      style={{
                        border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderDefault}`,
                        borderRadius: '8px',
                        padding: '6px',
                        cursor: 'pointer',
                        background: isSelected ? pinkTint : secondaryBg,
                        position: 'relative'
                      }}
                    >
                      <img src={f.img} alt={f.name} style={{ width: '100%', height: '54px', objectFit: 'cover', borderRadius: '6px' }} />
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

              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button onClick={() => showToast(`Applied ${selectedFabric} fabric.`)} style={{ flex: 1, height: '36px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Apply Fabric</button>
                <button onClick={triggerAIGeneration} style={{ flex: 1, height: '36px', borderRadius: '8px', border: 'none', background: primaryGradient, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>AI Re-render</button>
              </div>
            </div>
          )}

          {/* COLORS TAB (Point 31-34 Requirements) */}
          {activeTab === 'colors' && (
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="color" 
                  value={colorRole === 'primary' ? primaryColor : colorRole === 'secondary' ? secondaryColor : accentColor} 
                  onChange={(e) => {
                    const val = e.target.value;
                    if (colorRole === 'primary') setPrimaryColor(val);
                    else if (colorRole === 'secondary') setSecondaryColor(val);
                    else setAccentColor(val);
                  }}
                  style={{ width: '38px', height: '38px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: textMuted, display: 'block', textTransform: 'capitalize' }}>{colorRole} Color HEX</label>
                  <input 
                    type="text" 
                    value={(colorRole === 'primary' ? primaryColor : colorRole === 'secondary' ? secondaryColor : accentColor).toUpperCase()} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (colorRole === 'primary') setPrimaryColor(val);
                      else if (colorRole === 'secondary') setSecondaryColor(val);
                      else setAccentColor(val);
                    }}
                    style={{ width: '100%', height: '32px', padding: '0 8px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12px', fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              <div>
                <strong style={{ fontSize: '12px', fontWeight: 600, color: textPrimary, display: 'block', marginBottom: '8px' }}>Fashion Swatches</strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                  {colorSwatches.map(cs => (
                    <div 
                      key={cs.name}
                      onClick={() => {
                        if (colorRole === 'primary') setPrimaryColor(cs.hex);
                        else if (colorRole === 'secondary') setSecondaryColor(cs.hex);
                        else setAccentColor(cs.hex);
                        showToast(`Set ${colorRole} color: ${cs.name}`);
                      }}
                      title={cs.name}
                      style={{
                        height: '28px',
                        borderRadius: '6px',
                        background: cs.hex,
                        border: (colorRole === 'primary' ? primaryColor : colorRole === 'secondary' ? secondaryColor : accentColor) === cs.hex ? `2px solid ${primaryPink}` : '1px solid rgba(0,0,0,0.15)',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DETAILS TAB (Point 35 Requirements) */}
          {activeTab === 'details' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '3px' }}>Embroidery</label>
                <select value={embroidery} onChange={(e) => setEmbroidery(e.target.value)} style={{ width: '100%', height: '34px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12px', padding: '0 8px' }}>
                  <option value="Heavy">Heavy Zardozi</option>
                  <option value="Medium">Medium Threadwork</option>
                  <option value="Minimal">Minimal Border</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '3px' }}>Sleeves</label>
                <select value={sleeves} onChange={(e) => setSleeves(e.target.value)} style={{ width: '100%', height: '34px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12px', padding: '0 8px' }}>
                  <option value="Full Sleeve">Full Sleeve</option>
                  <option value="Short Sleeves">Short Sleeves</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '3px' }}>Neckline</label>
                <select value={neckline} onChange={(e) => setNeckline(e.target.value)} style={{ width: '100%', height: '34px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '12px', padding: '0 8px' }}>
                  <option value="V-Neck">V-Neck</option>
                  <option value="Sweetheart">Sweetheart</option>
                  <option value="Round Neck">Round Neck</option>
                </select>
              </div>
            </div>
          )}

          {/* PATTERNS TAB (Point 36 Requirements) */}
          {activeTab === 'patterns' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {patternsList.map(p => {
                const isSelected = selectedPattern === p;
                return (
                  <button
                    key={p}
                    onClick={() => { setSelectedPattern(p); showToast(`Selected pattern: ${p}`); }}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
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

          {/* VERSION HISTORY (Point 37 Requirements) */}
          <div style={{ borderTop: `1px solid ${borderDefault}`, paddingTop: '14px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: textPrimary }}>Version History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '140px', overflowY: 'auto' }}>
              {versionList.map(v => (
                <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderRadius: '6px', background: v.isCurrent ? pinkTint : secondaryBg }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: v.isCurrent ? primaryPink : textPrimary, display: 'block' }}>{v.title}</strong>
                    <span style={{ fontSize: '10px', color: textMuted }}>{v.time}</span>
                  </div>
                  {!v.isCurrent && (
                    <button onClick={() => showToast(`Restored ${v.title}`)} style={{ border: 'none', background: 'transparent', color: primaryPink, fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
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
      {/* 3. DESIGN VARIATIONS CAROUSEL (Point 38 Requirements)                 */}
      {/* -------------------------------------------------------------------- */}
      <div style={{ margin: '0 32px 24px 32px', background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: textPrimary }}>Design Variations</h3>
            <span style={{ fontSize: '12px', color: textMuted }}>AI-generated variations for your sketch.</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setVariationIndex(i => Math.max(i - 1, 0))} style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={16} color={textPrimary} />
            </button>
            <button onClick={() => setVariationIndex(i => Math.min(i + 1, variationsList.length - 4))} style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={16} color={textPrimary} />
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
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
                <img src={v.img} alt={v.name} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: textPrimary, padding: '6px', textAlign: 'center' }}>{v.name}</span>
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

      {/* -------------------------------------------------------------------- */}
      {/* 4. DESIGN INFORMATION PANEL (Point 39 Requirements)                   */}
      {/* -------------------------------------------------------------------- */}
      <div style={{ margin: '0 32px', background: cardBg, border: `1px solid ${borderDefault}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(16, 24, 40, 0.06)' }}>
        <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: 600, color: textPrimary }}>Design Information</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 1.5fr', gap: '16px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '4px' }}>Design Name</label>
            <input type="text" value={designName} onChange={(e) => setDesignName(e.target.value)} style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '13px' }} />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '4px' }}>Category</label>
            <input type="text" value={designCategory} onChange={(e) => setDesignCategory(e.target.value)} style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '13px' }} />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '4px' }}>Occasion</label>
            <input type="text" value={designOccasion} onChange={(e) => setDesignOccasion(e.target.value)} style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '13px' }} />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '4px' }}>Created On</label>
            <input type="text" readOnly value={createdDate} style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: secondaryBg, color: textMuted, fontSize: '13px' }} />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '4px' }}>Tags</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {tags.map(t => (
                <span key={t} style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '12px', background: pinkTint, color: primaryPink, border: `1px solid ${primaryPink}30`, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {t}
                  <X size={10} style={{ cursor: 'pointer' }} onClick={() => setTags(tags.filter(x => x !== t))} />
                </span>
              ))}

              {isAddingTag ? (
                <input type="text" autoFocus value={newTagInput} onChange={(e) => setNewTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTag()} onBlur={handleAddTag} style={{ width: '80px', height: '24px', borderRadius: '12px', border: `1px solid ${primaryPink}`, padding: '0 8px', fontSize: '11px' }} />
              ) : (
                <button onClick={() => setIsAddingTag(true)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textMuted, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Plus size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SAVE MODAL */}
      {isSaveModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 24, 40, 0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '420px', background: cardBg, borderRadius: '12px', padding: '24px', border: `1px solid ${borderDefault}`, boxShadow: '0 4px 12px rgba(16, 24, 40, 0.15)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600, color: textPrimary }}>Save Design</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: textSecondary }}>Persist your design state to StitchBee Vault.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: textMuted, display: 'block', marginBottom: '4px' }}>Design Title</label>
                <input type="text" value={designName} onChange={(e) => setDesignName(e.target.value)} style={{ width: '100%', height: '38px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: inputBg, color: textPrimary, fontSize: '13px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button onClick={() => setIsSaveModalOpen(false)} style={{ height: '38px', padding: '0 16px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setIsSaveModalOpen(false); showToast(`Saved "${designName}" to Vault.`); }} style={{ height: '38px', padding: '0 18px', borderRadius: '8px', border: 'none', background: primaryGradient, color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Save Design</button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {isExportModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(16, 24, 40, 0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '460px', background: cardBg, borderRadius: '12px', padding: '24px', border: `1px solid ${borderDefault}`, boxShadow: '0 4px 12px rgba(16, 24, 40, 0.15)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600, color: textPrimary }}>Export Package</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: textSecondary }}>Export options for "{designName}".</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'HD Image (PNG / JPG)', desc: 'High resolution studio render', fmt: 'PNG' },
                { title: '3D Model (GLB)', desc: 'Interactive 3D geometry mesh', fmt: 'GLB' },
                { title: 'Design Sheet (PDF)', desc: 'Full atelier production sheet', fmt: 'PDF' },
                { title: '360° Video (MP4)', desc: '360 degree turntable video', fmt: 'MP4' }
              ].map(opt => (
                <div key={opt.title} style={{ padding: '12px', borderRadius: '8px', border: `1px solid ${borderDefault}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: secondaryBg }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: textPrimary, display: 'block' }}>{opt.title}</strong>
                    <span style={{ fontSize: '11px', color: textMuted }}>{opt.desc}</span>
                  </div>
                  <button onClick={() => { setIsExportModalOpen(false); showToast(`Exporting ${opt.fmt} package...`); }} style={{ height: '32px', padding: '0 14px', borderRadius: '6px', border: `1px solid ${primaryPink}`, background: pinkTint, color: primaryPink, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                    {opt.fmt}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setIsExportModalOpen(false)} style={{ height: '38px', padding: '0 16px', borderRadius: '8px', border: `1px solid ${borderDefault}`, background: '#FFFFFF', color: textPrimary, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
