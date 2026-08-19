import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Sparkles, RefreshCw, RotateCw, ZoomIn, ZoomOut, Maximize2, 
  Check, X, Eye, Download, Share2, Play, Sliders, ChevronDown, 
  Layers, Sun, Moon, Info, HelpCircle, ArrowLeft, ArrowRight, ShieldCheck,
  FileText, Box, Video, Plus, Trash2, Heart
} from 'lucide-react';
import * as THREE from 'three';

export default function AIFashionDesignStudio({ theme = 'light', onNavigateTab }) {
  const isDark = theme === 'dark';

  // --------------------------------------------------------------------------
  // BRAND COLOR TOKENS (Match StitchBee Designer Theme Exactly)
  // --------------------------------------------------------------------------
  const primaryPink = '#E9008C';
  const pinkHover = '#D0007D';
  const purpleAccent = '#9B1DDB';
  const cardBg = isDark ? '#191528' : '#FFFFFF';
  const pageBg = isDark ? '#0D0A1A' : '#F7F8FC';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E5E7EB';
  const textColor = isDark ? '#F9FAFB' : '#182033';
  const secTextColor = isDark ? '#A0AEC0' : '#667085';
  const inputBg = isDark ? '#231D34' : '#FFFFFF';

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const [currentStep, setCurrentStep] = useState(2); // 1: Upload, 2: AI Generate, 3: Customize, 4: 3D Preview, 5: Download

  // Step 1: Sketch Upload & Validation State
  const [uploadedSketch, setUploadedSketch] = useState('/br_b1.jpg'); // Sample initial sketch preview
  const [sketchFileName, setSketchFileName] = useState('royal-lehenga-sketch.png');
  const [sketchFileSize, setSketchFileSize] = useState('2.4 MB');
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // AI Suggestions
  const aiSuggestionsList = [
    { id: 's1', title: 'Classic Bridal', img: '/br_b1.jpg', prompt: 'Classic Indian royal bridal lehenga with rich zari border' },
    { id: 's2', title: 'Modern Bridal', img: '/br_b2.jpg', prompt: 'Modern minimalist pastel pink bridal outfit' },
    { id: 's3', title: 'Royal Zari', img: '/bridal2.jpg', prompt: 'Heavy gold zardozi velvet bridal gown' },
    { id: 's4', title: 'Contemporary', img: '/bridal3.jpg', prompt: 'Contemporary indo-western fusion designer outfit' }
  ];

  // Step 2: AI Generation & Image Toolbar State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationMsg, setGenerationMsg] = useState('Analyzing sketch...');
  
  // Variations Render Database
  const variationsMap = {
    red: { name: 'Royal Red', img: '/br_b1.jpg', colorHex: '#EC167F' },
    green: { name: 'Emerald Green', img: '/b3.jpg', colorHex: '#10B981' },
    blue: { name: 'Sapphire Blue', img: '/b4.jpg', colorHex: '#3B82F6' },
    pink: { name: 'Rose Pink', img: '/b5.jpg', colorHex: '#F472B6' },
    purple: { name: 'Deep Purple', img: '/b6.jpg', colorHex: '#8B5CF6' },
    gold: { name: 'Metallic Gold', img: '/b7.jpg', colorHex: '#EAB308' }
  };
  
  const [selectedVariation, setSelectedVariation] = useState('red');
  const [activeGeneratedImg, setActiveGeneratedImg] = useState(variationsMap.red.img);
  
  // Image Viewer Toolbar Controls
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [lightMode, setLightMode] = useState('Studio Lighting');
  const [bgBackdrop, setBgBackdrop] = useState('Clean Studio');
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  // Step 3: Customization State (Fabric, Color & Details)
  const [selectedFabric, setSelectedFabric] = useState('Silk');
  const [fabricMode, setFabricMode] = useState('preview'); // 'preview' | 'ai_render'
  const [selectedColorHex, setSelectedColorHex] = useState('#EC167F');
  const [selectedColorName, setSelectedColorName] = useState('Royal Red');
  
  const [embroidery, setEmbroidery] = useState('Heavy');
  const [border, setBorder] = useState('Traditional');
  const [sleeves, setSleeves] = useState('Full Sleeve');
  const [neckline, setNeckline] = useState('V-Neck');
  const [dupatta, setDupatta] = useState('Embroidered');

  // Step 4: 3D Preview Controls
  const [anglePreset, setAnglePreset] = useState('360'); // '360' | 'front' | 'back' | 'left' | 'right'
  const [animationMode, setAnimationMode] = useState('turn'); // 'walk' | 'turn' | 'flow'
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  // Bottom Design Information & Tags State
  const [designTitle, setDesignTitle] = useState('Royal Bridal Lehenga');
  const [designCategory, setDesignCategory] = useState('Bridal Wear');
  const [designOccasion, setDesignOccasion] = useState('Wedding');
  const [createdDate, setCreatedDate] = useState('May 16, 2026');
  const [tags, setTags] = useState(['Bridal', 'Lehenga', 'Embroidered', 'Royal']);
  const [newTagText, setNewTagText] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  // UI Toast & Action Feedback
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // --------------------------------------------------------------------------
  // STEP 1 HANDLERS: SKETCH FILE UPLOAD & VALIDATION
  // --------------------------------------------------------------------------
  const processUploadedFile = (file) => {
    setUploadError('');
    if (!file) return;

    // Validate File Type (JPG, JPEG, PNG, WEBP, PDF)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a supported file format (JPG, PNG, WEBP, or PDF).');
      return;
    }

    // Validate File Size (Max 10 MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('Maximum allowed file size is 10 MB.');
      return;
    }

    // Read File into Data URL Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedSketch(e.target.result);
      setSketchFileName(file.name);
      setSketchFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setCurrentStep(1);
      showToast(`Sketch "${file.name}" uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  // --------------------------------------------------------------------------
  // STEP 2 HANDLERS: AI GENERATION PIPELINE & PROGRESS SIMULATION
  // --------------------------------------------------------------------------
  const triggerAIGeneration = () => {
    setIsGenerating(true);
    setGenerationStep(1);
    setCurrentStep(2);

    const steps = [
      { step: 1, msg: 'Analyzing sketch structure & line geometry...' },
      { step: 2, msg: 'Detecting garment silhouette, waistline & neckline...' },
      { step: 3, msg: 'Understanding sleeves, border & embroidery placement...' },
      { step: 4, msg: 'Applying photorealistic textile texture & fabric folds...' },
      { step: 5, msg: 'Rendering studio-quality lighting & realistic model preview...' }
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setGenerationStep(s.step);
        setGenerationMsg(s.msg);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsGenerating(false);
            showToast('AI Fashion Generation completed!');
          }, 800);
        }
      }, (idx + 1) * 700);
    });
  };

  // Handle Variation Switch
  const handleSelectVariation = (key) => {
    setSelectedVariation(key);
    setActiveGeneratedImg(variationsMap[key].img);
    setSelectedColorHex(variationsMap[key].colorHex);
    setSelectedColorName(variationsMap[key].name);
    showToast(`Switched design variation to ${variationsMap[key].name}`);
  };

  // --------------------------------------------------------------------------
  // STEP 4: THREE.JS 3D GARMENT MANNEQUIN CANVAS CONTROLS
  // --------------------------------------------------------------------------
  const threeCanvasRef = useRef(null);

  useEffect(() => {
    if (!threeCanvasRef.current) return;

    const width = threeCanvasRef.current.clientWidth || 320;
    const height = 340;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? 0x191528 : 0xffffff);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    // Clear previous children
    while (threeCanvasRef.current.firstChild) {
      threeCanvasRef.current.removeChild(threeCanvasRef.current.firstChild);
    }
    threeCanvasRef.current.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xe9008c, 0.6);
    pointLight.position.set(-5, 2, -2);
    scene.add(pointLight);

    // 3. Procedural 3D Fashion Garment Group (Mannequin + Lehenga Skirt + Blouse + Dupatta)
    const garmentGroup = new THREE.Group();

    // Convert hex color string to Three.js color
    const baseColor = new THREE.Color(selectedColorHex || '#EC167F');

    // Fabric Material PBR Specs
    let roughness = 0.4;
    let metalness = 0.1;
    if (selectedFabric === 'Velvet') { roughness = 0.8; metalness = 0.05; }
    if (selectedFabric === 'Satin') { roughness = 0.15; metalness = 0.3; }
    if (selectedFabric === 'Organza' || selectedFabric === 'Net') { roughness = 0.5; metalness = 0.1; }

    const fabricMaterial = new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness,
      metalness
    });

    const goldBorderMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xeab308),
      roughness: 0.2,
      metalness: 0.8
    });

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf5d0c5),
      roughness: 0.6
    });

    // Mannequin Torso
    const torsoGeo = new THREE.CylinderGeometry(0.45, 0.35, 1.2, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, skinMaterial);
    torsoMesh.position.y = 0.8;
    garmentGroup.add(torsoMesh);

    // Blouse Garment Top
    const blouseGeo = new THREE.CylinderGeometry(0.47, 0.37, 0.6, 32);
    const blouseMesh = new THREE.Mesh(blouseGeo, fabricMaterial);
    blouseMesh.position.y = 0.85;
    garmentGroup.add(blouseMesh);

    // Lehenga Skirt (Cone Volume)
    const skirtGeo = new THREE.ConeGeometry(1.25, 1.8, 32, 1, true);
    const skirtMesh = new THREE.Mesh(skirtGeo, fabricMaterial);
    skirtMesh.position.y = -0.4;
    garmentGroup.add(skirtMesh);

    // Skirt Gold Zardozi Border Ring
    const ringGeo = new THREE.TorusGeometry(1.23, 0.05, 16, 100);
    const ringMesh = new THREE.Mesh(ringGeo, goldBorderMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -1.28;
    garmentGroup.add(ringMesh);

    // Dupatta Drape (Tilted Torus / Curve)
    const dupattaGeo = new THREE.TorusGeometry(0.7, 0.08, 16, 50, Math.PI * 1.2);
    const dupattaMesh = new THREE.Mesh(dupattaGeo, fabricMaterial);
    dupattaMesh.rotation.z = Math.PI / 3;
    dupattaMesh.rotation.y = Math.PI / 4;
    dupattaMesh.position.set(0.1, 0.5, 0.1);
    garmentGroup.add(dupattaMesh);

    scene.add(garmentGroup);

    // 4. Animation Frame Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isAutoRotate) {
        garmentGroup.rotation.y += 0.01;
      }

      // Camera Position by Angle Preset
      if (anglePreset === 'front') { garmentGroup.rotation.y = 0; }
      else if (anglePreset === 'back') { garmentGroup.rotation.y = Math.PI; }
      else if (anglePreset === 'left') { garmentGroup.rotation.y = Math.PI / 2; }
      else if (anglePreset === 'right') { garmentGroup.rotation.y = -Math.PI / 2; }

      // Animation Motion
      if (animationMode === 'walk') {
        garmentGroup.position.y = Math.sin(Date.now() * 0.005) * 0.05;
      } else if (animationMode === 'flow') {
        garmentGroup.rotation.z = Math.sin(Date.now() * 0.003) * 0.06;
      } else {
        garmentGroup.position.y = 0;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [theme, selectedColorHex, selectedFabric, isAutoRotate, anglePreset, animationMode]);

  // Tag Management
  const handleAddTag = () => {
    if (newTagText.trim() && !tags.includes(newTagText.trim())) {
      setTags([...tags, newTagText.trim()]);
      setNewTagText('');
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: pageBg, color: textColor, width: '100%', minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Toast Alert Feedback */}
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
          border: '1px solid rgba(233,0,140,0.4)'
        }}>
          <Sparkles size={16} color={primaryPink} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* 1. MAIN PAGE HEADER & WORKFLOW STEPPER BAR                           */}
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
              onClick={() => showToast('Draft saved successfully to StitchBee Vault.')}
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
              onClick={() => showToast('Tutorials & AI Prompting Guide launched.')}
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
              <Play size={15} color={primaryPink} />
              <span>View Tutorials</span>
              <ChevronDown size={14} color={secTextColor} />
            </button>
          </div>
        </div>

        {/* 5-Step Stepper Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '840px',
          margin: '8px 0 0 0',
          position: 'relative'
        }}>
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
                  fontSize: '12px',
                  boxShadow: isActive ? `0 4px 12px ${primaryPink}40` : 'none'
                }}>
                  {isCompleted ? <Check size={14} color="#FFFFFF" strokeWidth={3} /> : s.step}
                </div>
                <span style={{
                  fontSize: '12.5px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? primaryPink : isCompleted ? textColor : secTextColor
                }}>
                  {s.label}
                </span>

                {idx < 4 && (
                  <div style={{
                    width: '60px',
                    height: '2px',
                    background: currentStep > s.step ? '#12B76A' : (isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'),
                    margin: '0 8px'
                  }} />
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. MAIN 5-COLUMN / 4-SECTION DESIGN WORKSPACE LAYOUT                 */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1.4fr 340px 320px',
        gap: '20px',
        padding: '24px 32px',
        alignItems: 'start'
      }}>

        {/* ================================================================== */}
        {/* COLUMN 1: STEP 1 — SKETCH UPLOAD & AI SUGGESTIONS                  */}
        {/* ================================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Upload Card */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>
                1. Upload Your Sketch
              </h3>
              <Info size={16} color={secTextColor} style={{ cursor: 'pointer' }} title="Upload hand-drawn or CAD sketch" />
            </div>

            {/* Drag & Drop Zone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${isDragging ? primaryPink : (isDark ? 'rgba(255,255,255,0.18)' : '#CBD5E1')}`,
                background: isDragging ? `${primaryPink}08` : (isDark ? 'rgba(255,255,255,0.02)' : '#FAFAFC'),
                borderRadius: '14px',
                padding: '20px 16px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileInputChange} 
                accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                style={{ display: 'none' }} 
              />

              {/* Uploaded Sketch Preview */}
              {uploadedSketch ? (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '100%',
                    height: '220px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                  }}>
                    <img 
                      src={uploadedSketch} 
                      alt="Uploaded Sketch Preview" 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                    />
                  </div>

                  <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: secTextColor }}>
                    <span style={{ fontWeight: 600, color: textColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                      {sketchFileName}
                    </span>
                    <span>{sketchFileSize}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <button 
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: `1px solid ${borderColor}`,
                        background: inputBg,
                        color: textColor,
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Replace
                    </button>
                    <button 
                      onClick={() => { setUploadedSketch(''); showToast('Sketch removed.'); }}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #FCA5A5',
                        background: '#FEF2F2',
                        color: '#EF4444',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: `${primaryPink}12`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Upload size={22} color={primaryPink} />
                  </div>

                  <div>
                    <strong style={{ fontSize: '13px', display: 'block', color: textColor }}>
                      Drag & drop your sketch here
                    </strong>
                    <span style={{ fontSize: '11px', color: secTextColor, marginTop: '2px', display: 'block' }}>
                      or browse from your device
                    </span>
                  </div>

                  <button 
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      background: `linear-gradient(135deg, ${primaryPink}, ${purpleAccent})`,
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: `0 4px 14px ${primaryPink}35`
                    }}
                  >
                    Upload Sketch
                  </button>

                  <span style={{ fontSize: '10.5px', color: secTextColor }}>
                    Supported formats: JPG, PNG, WEBP · Max size: 10MB
                  </span>
                </>
              )}
            </div>

            {/* Error Message Box */}
            {uploadError && (
              <div style={{ marginTop: '12px', padding: '10px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#EF4444', fontSize: '11.5px', fontWeight: 500 }}>
                {uploadError}
              </div>
            )}
          </div>

          {/* AI Suggestions Card */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 700, color: textColor }}>
              AI Suggestions
            </h4>
            <span style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '12px' }}>
              Get inspired by these styles
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {aiSuggestionsList.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => {
                    setUploadedSketch(item.img);
                    setSketchFileName(`${item.title.toLowerCase().replace(/\s+/g, '-')}.jpg`);
                    showToast(`Applied preset style "${item.title}"`);
                  }}
                  style={{
                    border: `1px solid ${borderColor}`,
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: inputBg,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '70px', objectFit: 'cover' }} />
                  <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: textColor, padding: '4px 6px', textAlign: 'center' }}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => showToast('More AI design suggestions loaded.')}
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '8px',
                borderRadius: '8px',
                border: `1px solid ${borderColor}`,
                background: inputBg,
                color: textColor,
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              More Suggestions
            </button>
          </div>

        </div>

        {/* ================================================================== */}
        {/* COLUMN 2: STEP 2 — AI GENERATED REALISTIC DESIGN & TOOLBAR        */}
        {/* ================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Card Top Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textColor }}>
                2. AI Generated Design
              </h3>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '12px',
                background: `${primaryPink}15`,
                color: primaryPink,
                border: `1px solid ${primaryPink}30`
              }}>
                AI Generated
              </span>
            </div>

            <button 
              onClick={triggerAIGeneration}
              disabled={isGenerating}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: `1px solid ${primaryPink}`,
                background: 'transparent',
                color: primaryPink,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RefreshCw size={14} className={isGenerating ? 'spin-icon' : ''} color={primaryPink} />
              <span>Regenerate</span>
            </button>
          </div>

          {/* AI Generation Loading Overlay Modal */}
          {isGenerating ? (
            <div style={{
              height: '480px',
              borderRadius: '14px',
              background: isDark ? '#141126' : '#FAFAFC',
              border: `1px solid ${borderColor}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              padding: '30px'
            }}>
              <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: `3px solid ${primaryPink}25`,
                  borderTopColor: primaryPink,
                  animation: 'spin 1s linear infinite'
                }} />
                <Sparkles size={24} color={primaryPink} style={{ position: 'absolute', top: '18px', left: '18px' }} />
              </div>

              <div style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '15px', color: textColor, display: 'block' }}>
                  AI is bringing your sketch to life
                </strong>
                <span style={{ fontSize: '12.5px', color: primaryPink, fontWeight: 600, marginTop: '4px', display: 'block' }}>
                  {generationMsg}
                </span>
              </div>

              <div style={{ width: '80%', height: '6px', borderRadius: '3px', background: isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0', overflow: 'hidden' }}>
                <div style={{ width: `${(generationStep / 5) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${primaryPink}, ${purpleAccent})`, transition: 'width 0.4s ease' }} />
              </div>
            </div>
          ) : (
            /* Main Realistic Render Viewport with Floating Toolbar */
            <div style={{
              position: 'relative',
              height: '480px',
              borderRadius: '14px',
              overflow: 'hidden',
              background: bgBackdrop === 'Clean Studio' ? '#FFFFFF' : bgBackdrop === 'Palace' ? '#FDFBF7' : '#F4F7F6',
              border: `1px solid ${borderColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              
              {/* Image Render */}
              <img 
                src={activeGeneratedImg} 
                alt="AI Generated Fashion Design"
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg)`,
                  filter: lightMode === 'Warm Lighting' ? 'sepia(0.15) contrast(1.05)' : lightMode === 'Daylight' ? 'brightness(1.08)' : 'none',
                  transition: 'transform 0.2s ease, filter 0.3s ease'
                }}
              />

              {/* Floating Vertical Right Toolbar */}
              <div style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: isDark ? 'rgba(25,21,40,0.85)' : 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${borderColor}`,
                borderRadius: '24px',
                padding: '8px 4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
              }}>
                <button 
                  onClick={() => setRotationAngle((r) => (r + 90) % 360)} 
                  title="Rotate 90°"
                  style={{ border: 'none', background: 'transparent', color: textColor, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '9px', gap: '2px' }}
                >
                  <RotateCw size={16} />
                  <span>Rotate</span>
                </button>

                <button 
                  onClick={() => setZoomLevel((z) => Math.min(z + 25, 300))} 
                  title="Zoom In"
                  style={{ border: 'none', background: 'transparent', color: textColor, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '9px', gap: '2px' }}
                >
                  <ZoomIn size={16} />
                  <span>Zoom</span>
                </button>

                <button 
                  onClick={() => { setZoomLevel(100); setRotationAngle(0); }} 
                  title="Reset Zoom & Rotate"
                  style={{ border: 'none', background: 'transparent', color: textColor, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '9px', gap: '2px' }}
                >
                  <RefreshCw size={16} />
                  <span>Reset</span>
                </button>

                <button 
                  onClick={() => setLightMode(lightMode === 'Studio Lighting' ? 'Warm Lighting' : 'Studio Lighting')} 
                  title="Toggle Studio Lighting"
                  style={{ border: 'none', background: 'transparent', color: textColor, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '9px', gap: '2px' }}
                >
                  <Sun size={16} color={lightMode === 'Warm Lighting' ? '#EAB308' : textColor} />
                  <span>Light</span>
                </button>

                <button 
                  onClick={() => setBgBackdrop(bgBackdrop === 'Clean Studio' ? 'Palace' : 'Clean Studio')} 
                  title="Change Background Backdrop"
                  style={{ border: 'none', background: 'transparent', color: textColor, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '9px', gap: '2px' }}
                >
                  <Layers size={16} />
                  <span>Bg</span>
                </button>
              </div>

            </div>
          )}

          {/* Color Variations Row */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: secTextColor, display: 'block', marginBottom: '8px' }}>
              Design Variations
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
              {Object.keys(variationsMap).map((key) => {
                const item = variationsMap[key];
                const isSelected = selectedVariation === key;

                return (
                  <div
                    key={key}
                    onClick={() => handleSelectVariation(key)}
                    style={{
                      height: '60px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: isSelected ? `2.5px solid ${primaryPink}` : `1px solid ${borderColor}`,
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', borderRadius: '50%', background: item.colorHex, border: '1px solid #FFFFFF' }} />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ================================================================== */}
        {/* COLUMN 3: STEP 3 — CUSTOMIZE DESIGN (FABRIC, COLOR & DETAILS)     */}
        {/* ================================================================== */}
        <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: textColor }}>
              3. Customize Design
            </h3>
            <X size={16} color={secTextColor} style={{ cursor: 'pointer' }} onClick={() => showToast('Customization reset')} />
          </div>

          {/* 1. Fabric Selection */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>Fabric Selection</strong>
              <span style={{ fontSize: '11px', color: primaryPink, cursor: 'pointer', fontWeight: 600 }} onClick={() => showToast('Fabric Library opened')}>View All</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { name: 'Silk', img: '/fab1.jpg' },
                { name: 'Velvet', img: '/fab2.jpg' },
                { name: 'Net', img: '/fab3.jpg' },
                { name: 'Organza', img: '/fab4.jpg' },
                { name: 'Satin', img: '/fab5.jpg' },
                { name: 'Georgette', img: '/fab6.jpg' }
              ].map((f) => {
                const isSelected = selectedFabric === f.name;
                return (
                  <div
                    key={f.name}
                    onClick={() => {
                      setSelectedFabric(f.name);
                      showToast(`Applied fabric: ${f.name}`);
                    }}
                    style={{
                      border: isSelected ? `2px solid ${primaryPink}` : `1px solid ${borderColor}`,
                      borderRadius: '10px',
                      padding: '6px',
                      cursor: 'pointer',
                      background: isSelected ? `${primaryPink}08` : inputBg,
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    <img src={f.img} alt={f.name} style={{ width: '100%', height: '42px', objectFit: 'cover', borderRadius: '6px' }} />
                    <span style={{ fontSize: '10.5px', fontWeight: 600, color: textColor, marginTop: '4px', display: 'block' }}>{f.name}</span>
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '4px', right: '4px', width: '14px', height: '14px', borderRadius: '50%', background: primaryPink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={9} color="#FFFFFF" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Color Customization */}
          <div>
            <strong style={{ fontSize: '12.5px', fontWeight: 600, color: textColor, display: 'block', marginBottom: '8px' }}>
              Color Customization
            </strong>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginBottom: '10px' }}>
              {[
                { hex: '#EC167F', name: 'Royal Red' },
                { hex: '#10B981', name: 'Emerald' },
                { hex: '#3B82F6', name: 'Sapphire' },
                { hex: '#F472B6', name: 'Hot Pink' },
                { hex: '#8B5CF6', name: 'Purple' },
                { hex: '#EAB308', name: 'Gold' },
                { hex: '#F8FAFC', name: 'Ivory' },
                { hex: '#182033', name: 'Black' }
              ].map((c) => {
                const isSelected = selectedColorHex === c.hex;
                return (
                  <div
                    key={c.hex}
                    onClick={() => {
                      setSelectedColorHex(c.hex);
                      setSelectedColorName(c.name);
                      showToast(`Selected color: ${c.name}`);
                    }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: c.hex,
                      border: isSelected ? `3px solid ${primaryPink}` : '2px solid #FFFFFF',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isSelected && <Check size={12} color={c.hex === '#F8FAFC' ? '#182033' : '#FFFFFF'} strokeWidth={3} />}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="color" 
                value={selectedColorHex} 
                onChange={(e) => setSelectedColorHex(e.target.value)} 
                style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer' }} 
              />
              <span style={{ fontSize: '11.5px', fontWeight: 600, color: textColor }}>Custom Color: {selectedColorHex}</span>
            </div>
          </div>

          {/* 3. Detail Customization Dropdowns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <strong style={{ fontSize: '12.5px', fontWeight: 600, color: textColor }}>Detail Customization</strong>

            <div>
              <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Embroidery</label>
              <select value={embroidery} onChange={(e) => setEmbroidery(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', padding: '0 10px' }}>
                <option value="Heavy">Heavy Zardozi</option>
                <option value="Medium">Medium Threadwork</option>
                <option value="Minimal">Minimal Border</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Border Style</label>
              <select value={border} onChange={(e) => setBorder(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', padding: '0 10px' }}>
                <option value="Traditional">Traditional Zari</option>
                <option value="Broad">Broad Gold Work</option>
                <option value="Scalloped">Scalloped Cut</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Sleeves</label>
              <select value={sleeves} onChange={(e) => setSleeves(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', padding: '0 10px' }}>
                <option value="Full Sleeve">Full Sleeve</option>
                <option value="Short Sleeves">Short Sleeves</option>
                <option value="Sleeveless">Sleeveless</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Neckline</label>
              <select value={neckline} onChange={(e) => setNeckline(e.target.value)} style={{ width: '100%', height: '36px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px', padding: '0 10px' }}>
                <option value="V-Neck">V-Neck</option>
                <option value="Sweetheart">Sweetheart</option>
                <option value="Round Neck">Round Neck</option>
              </select>
            </div>
          </div>

        </div>

        {/* ================================================================== */}
        {/* COLUMN 4: STEP 4 (3D PREVIEW) & STEP 5 (DOWNLOAD & SHARE)          */}
        {/* ================================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Step 4: 3D Preview Card */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>
                4. 3D Preview & Animation
              </h3>
              <span style={{ fontSize: '10.5px', color: secTextColor }}>360° View</span>
            </div>

            {/* Three.js Interactive WebGL 3D Canvas */}
            <div 
              ref={threeCanvasRef} 
              style={{
                width: '100%',
                height: '240px',
                borderRadius: '12px',
                overflow: 'hidden',
                background: isDark ? '#0D0A1A' : '#FAFAFC',
                border: `1px solid ${borderColor}`,
                position: 'relative'
              }} 
            />

            {/* Camera Angle Presets */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
              {['360', 'front', 'back', 'left', 'right'].map((ang) => (
                <button
                  key={ang}
                  onClick={() => setAnglePreset(ang)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: anglePreset === ang ? `1px solid ${primaryPink}` : `1px solid ${borderColor}`,
                    background: anglePreset === ang ? `${primaryPink}12` : inputBg,
                    color: anglePreset === ang ? primaryPink : secTextColor,
                    fontSize: '10.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {ang === '360' ? '360° View' : ang}
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Download & Share Card */}
          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>
              5. Download & Share
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '8px', textAlign: 'center', background: inputBg }}>
                <FileText size={16} color={primaryPink} style={{ margin: '0 auto 4px auto' }} />
                <strong style={{ fontSize: '11px', display: 'block', color: textColor }}>HD Image</strong>
                <span style={{ fontSize: '9.5px', color: secTextColor }}>PNG, JPG</span>
              </div>
              <div style={{ border: `1px solid ${borderColor}`, borderRadius: '10px', padding: '8px', textAlign: 'center', background: inputBg }}>
                <Box size={16} color={purpleAccent} style={{ margin: '0 auto 4px auto' }} />
                <strong style={{ fontSize: '11px', display: 'block', color: textColor }}>3D Model</strong>
                <span style={{ fontSize: '9.5px', color: secTextColor }}>GLB, USDZ</span>
              </div>
            </div>

            <button 
              onClick={() => showToast('High-definition fashion package downloading...')}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                background: `linear-gradient(135deg, ${primaryPink}, ${purpleAccent})`,
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${primaryPink}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Download size={16} color="#FFFFFF" />
              <span>Download Design</span>
            </button>

            <button 
              onClick={() => showToast('Client presentation link copied to clipboard.')}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                background: inputBg,
                color: textColor,
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Share2 size={15} color={secTextColor} />
              <span>Share with Client</span>
            </button>
          </div>

        </div>

      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 3. BOTTOM DESIGN INFORMATION PANEL                                   */}
      {/* -------------------------------------------------------------------- */}
      <div style={{
        margin: '0 32px',
        padding: '20px 24px',
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: textColor }}>
          Design Information
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 1.5fr', gap: '16px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Design Name</label>
            <input 
              type="text" 
              value={designTitle} 
              onChange={(e) => setDesignTitle(e.target.value)} 
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px' }} 
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Category</label>
            <input 
              type="text" 
              value={designCategory} 
              onChange={(e) => setDesignCategory(e.target.value)} 
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px' }} 
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Occasion</label>
            <input 
              type="text" 
              value={designOccasion} 
              onChange={(e) => setDesignOccasion(e.target.value)} 
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: '12px' }} 
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Created On</label>
            <input 
              type="text" 
              readOnly
              value={createdDate} 
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: `1px solid ${borderColor}`, background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', color: secTextColor, fontSize: '12px' }} 
            />
          </div>

          {/* Add Tags */}
          <div>
            <label style={{ fontSize: '11px', color: secTextColor, display: 'block', marginBottom: '3px' }}>Add Tags</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {tags.map((t) => (
                <span 
                  key={t}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '12px',
                    background: `${primaryPink}12`,
                    color: primaryPink,
                    border: `1px solid ${primaryPink}30`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {t}
                  <X size={10} style={{ cursor: 'pointer' }} onClick={() => handleRemoveTag(t)} />
                </span>
              ))}

              {isAddingTag ? (
                <input 
                  type="text" 
                  autoFocus 
                  value={newTagText} 
                  onChange={(e) => setNewTagText(e.target.value)} 
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddTag(); }}
                  onBlur={handleAddTag}
                  placeholder="New tag..." 
                  style={{ width: '80px', height: '24px', borderRadius: '12px', border: `1px solid ${primaryPink}`, padding: '0 8px', fontSize: '11px', outline: 'none' }}
                />
              ) : (
                <button 
                  onClick={() => setIsAddingTag(true)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: `1px solid ${borderColor}`,
                    background: inputBg,
                    color: secTextColor,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
