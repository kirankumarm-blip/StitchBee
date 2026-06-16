import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDBackground({ theme }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Centered on the girl doll)
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 1.8); // Starts close up

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const isLight = theme === 'light';

    // 4. Lighting System (Premium Dual-Tone Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 0.8 : 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, isLight ? 1.4 : 1.1);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd5e6ff, isLight ? 0.8 : 0.6);
    fillLight.position.set(-6, 4, 3);
    scene.add(fillLight);

    // Rim light for the glowing lace edge
    const rimLight = new THREE.DirectionalLight(0xf72585, isLight ? 1.0 : 1.6);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    const studioSpotlight = new THREE.SpotLight(0xffffff, 0);
    studioSpotlight.position.set(4, 7, 4);
    studioSpotlight.angle = Math.PI / 6;
    studioSpotlight.penumbra = 0.8;
    studioSpotlight.castShadow = true;
    scene.add(studioSpotlight);

    const orbitalLight = new THREE.PointLight(0x7209b7, isLight ? 1.2 : 2.5, 8);
    scene.add(orbitalLight);

    const seamGlowLight = new THREE.PointLight(0xf72585, 0, 8);
    seamGlowLight.position.set(0, 2.0, 0.6);
    scene.add(seamGlowLight);

    // 5. Materials (White Satin, Translucent Lace, and Gold/Obsidian)
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0xdfb040 : 0xe5ba53,
      metalness: isLight ? 0.8 : 0.95,
      roughness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      name: 'gold'
    });

    const obsidianMaterial = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0x2b2535 : 0x120e18, // Glossy dark obsidian mannequin
      metalness: 0.2,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      name: 'obsidian'
    });

    const satinMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfafafa,
      metalness: 0.05,
      roughness: 0.35,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
      side: THREE.DoubleSide,
      name: 'satin'
    });

    const laceMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.6,
      transparent: true,
      opacity: 0.78,
      transmission: 0.45, // Translucent lace look
      thickness: 0.1,
      sheen: 1.0,
      sheenColor: 0xffffff,
      sheenRoughness: 0.5,
      side: THREE.DoubleSide,
      name: 'lace'
    });

    // 6. Build Girl Doll (Female Mannequin)
    const mannequinGroup = new THREE.Group();
    scene.add(mannequinGroup);

    // Torso Core Center Height (Vertically centered in the viewport)
    const bodyGroup = new THREE.Group();
    bodyGroup.position.y = 1.8; // Centered
    mannequinGroup.add(bodyGroup);

    // Female Mannequin Torso Geometry
    const chestGeo = new THREE.CylinderGeometry(0.44, 0.26, 1.4, 24, 4);
    const pos = chestGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      
      // Hips flare
      if (y < -0.3) {
        pos.setX(i, x * 1.25);
        pos.setZ(i, z * 1.15);
      }
      // Waist pinch
      else if (y > -0.3 && y < 0.2) {
        pos.setX(i, x * 0.85);
        pos.setZ(i, z * 0.85);
      }
      // Chest shoulders
      else if (y >= 0.2) {
        pos.setX(i, x * 1.15);
        if (z > 0) {
          pos.setZ(i, z * 1.35); // Bust curve
        }
      }
    }
    chestGeo.computeVertexNormals();

    const chestMesh = new THREE.Mesh(chestGeo, obsidianMaterial);
    chestMesh.castShadow = true;
    chestMesh.receiveShadow = true;
    bodyGroup.add(chestMesh);

    // Neck & Cap
    const neckGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.35, 16);
    const neckMesh = new THREE.Mesh(neckGeo, obsidianMaterial);
    neckMesh.position.y = 0.85;
    bodyGroup.add(neckMesh);

    const neckCapGeo = new THREE.SphereGeometry(0.16, 16, 12);
    const neckCapMesh = new THREE.Mesh(neckCapGeo, goldMaterial);
    neckCapMesh.position.y = 1.02;
    bodyGroup.add(neckCapMesh);

    // Helper to deform panel geometries to fit female mannequin bodyGroup curves
    const deformPanel = (geo) => {
      const posAttr = geo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = posAttr.getZ(i);
        
        let scaleX = 1.15;
        if (y < -0.3) {
          scaleX = 1.25;
        } else if (y > -0.3 && y < 0.2) {
          scaleX = 0.85;
        }
        posAttr.setX(i, x * scaleX);
        
        if (z > 0 && y >= 0.2) {
          posAttr.setZ(i, z * 1.35);
        }
      }
      geo.computeVertexNormals();
    };

    // Helper to deform skirt to simulate wavy fabric folds
    const deformSkirt = (geo) => {
      const posAttr = geo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = posAttr.getZ(i);
        
        const angle = Math.atan2(z, x);
        const wave = Math.sin(angle * 8) * 0.08 * (0.5 - y); // larger waves at bottom
        
        posAttr.setX(i, x + Math.cos(angle) * wave);
        posAttr.setZ(i, z + Math.sin(angle) * wave);
      }
      geo.computeVertexNormals();
    };

    // Helper to deform sleeves to flare like bell sleeves
    const deformSleeve = (geo) => {
      const posAttr = geo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const z = posAttr.getZ(i);
        
        const flare = (0.5 - y) * 0.25;
        const angle = Math.atan2(z, x);
        const ripple = Math.sin(angle * 6) * 0.02 * (0.5 - y);
        
        posAttr.setX(i, x + Math.cos(angle) * (flare + ripple));
        posAttr.setZ(i, z + Math.sin(angle) * (flare + ripple));
      }
      geo.computeVertexNormals();
    };

    // 7. Flowing Gown Base & Overlay Layers (Assembling white gown components)
    
    // Solid Satin Inner Skirt
    const innerSkirtGeo = new THREE.CylinderGeometry(0.3, 1.1, 1.8, 32, 10, true);
    deformSkirt(innerSkirtGeo);
    const innerSkirt = new THREE.Mesh(innerSkirtGeo, satinMaterial);
    innerSkirt.position.y = -1.2;
    bodyGroup.add(innerSkirt);

    // Lace Bodice Overlay
    const bodiceGeo = new THREE.CylinderGeometry(0.46, 0.28, 1.4, 24, 4, true);
    deformPanel(bodiceGeo);
    const bodice = new THREE.Mesh(bodiceGeo, laceMaterial);
    bodyGroup.add(bodice);

    // Lace Train (Resting and extending on the ground)
    const trainGeo = new THREE.CylinderGeometry(0.35, 1.8, 2.2, 32, 10, true, Math.PI / 2, Math.PI);
    const trainPos = trainGeo.attributes.position;
    for (let i = 0; i < trainPos.count; i++) {
      const x = trainPos.getX(i);
      const y = trainPos.getY(i);
      const z = trainPos.getZ(i);
      
      const pull = (1.1 - y) * 0.9;
      trainPos.setZ(i, z - pull);
      
      const angle = Math.atan2(z, x);
      const ripple = Math.sin(angle * 6) * 0.1 * (1.1 - y);
      trainPos.setX(i, x + Math.cos(angle) * ripple);
      trainPos.setZ(i, z - pull + Math.sin(angle) * ripple);
    }
    trainGeo.computeVertexNormals();
    const train = new THREE.Mesh(trainGeo, laceMaterial);
    train.position.set(0, -1.3, -0.05);
    bodyGroup.add(train);

    // Flowing parts that fly in during assembly animation
    const panelGroup = new THREE.Group();
    bodyGroup.add(panelGroup);

    // Bell Sleeve Left
    const leftSleeveGeo = new THREE.CylinderGeometry(0.12, 0.3, 1.0, 24, 8, true);
    deformSleeve(leftSleeveGeo);
    const leftSleeve = new THREE.Mesh(leftSleeveGeo, laceMaterial);

    // Bell Sleeve Right
    const rightSleeveGeo = leftSleeveGeo.clone();
    const rightSleeve = new THREE.Mesh(rightSleeveGeo, laceMaterial);

    // Flowing Outer Skirt (Lace Overlay)
    const outerSkirtGeo = new THREE.CylinderGeometry(0.32, 1.25, 1.85, 32, 10, true);
    deformSkirt(outerSkirtGeo);
    const outerSkirt = new THREE.Mesh(outerSkirtGeo, laceMaterial);

    // Lace Veil / Hood
    const hoodGeo = new THREE.SphereGeometry(0.28, 24, 24, 0, Math.PI * 2, 0, Math.PI / 1.4);
    const hoodPos = hoodGeo.attributes.position;
    for (let i = 0; i < hoodPos.count; i++) {
      const x = hoodPos.getX(i);
      const y = hoodPos.getY(i);
      const z = hoodPos.getZ(i);
      
      if (z < 0) {
        hoodPos.setZ(i, z * 1.4);
        hoodPos.setY(i, y - 0.1);
      }
      if (z > 0) {
        hoodPos.setX(i, x * 1.15);
      }
    }
    hoodGeo.computeVertexNormals();
    const hood = new THREE.Mesh(hoodGeo, laceMaterial);

    const panels = [
      { mesh: leftSleeve, targetPos: new THREE.Vector3(-0.5, 0.2, 0), targetRot: new THREE.Euler(0, -0.2, 0.5), startPos: new THREE.Vector3(-6, 4, 3), startRot: new THREE.Euler(1, -2, 1.5) },
      { mesh: rightSleeve, targetPos: new THREE.Vector3(0.5, 0.2, 0), targetRot: new THREE.Euler(0, 0.2, -0.5), startPos: new THREE.Vector3(6, 3, -2), startRot: new THREE.Euler(-1.5, 2, -1) },
      { mesh: outerSkirt, targetPos: new THREE.Vector3(0, -1.2, 0), targetRot: new THREE.Euler(0, 0, 0), startPos: new THREE.Vector3(0, -5, -6), startRot: new THREE.Euler(3, 0.5, -2) },
      { mesh: hood, targetPos: new THREE.Vector3(0, 1.05, -0.05), targetRot: new THREE.Euler(0, 0, 0), startPos: new THREE.Vector3(-2, 7, 5), startRot: new THREE.Euler(2, -1, 3) }
    ];

    panels.forEach(p => {
      p.mesh.castShadow = true;
      p.mesh.receiveShadow = true;
      panelGroup.add(p.mesh);
    });

    // 8. Glowing Seam Lines (Stitch glow embroidery details)
    const seamMaterial = new THREE.MeshBasicMaterial({
      color: 0xffa500, // Golden glow
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    
    const seamLGeo = new THREE.CylinderGeometry(0.465, 0.285, 1.41, 24, 1, true, -Math.PI / 6, 0.03);
    deformPanel(seamLGeo);
    const seamL = new THREE.Mesh(seamLGeo, seamMaterial);
    seamL.position.set(0, 0, 0);
    panelGroup.add(seamL);

    const seamRGeo = new THREE.CylinderGeometry(0.465, 0.285, 1.41, 24, 1, true, Math.PI / 6, 0.03);
    deformPanel(seamRGeo);
    const seamR = new THREE.Mesh(seamRGeo, seamMaterial);
    seamR.position.set(0, 0, 0);
    panelGroup.add(seamR);

    const seamCGeo = new THREE.CylinderGeometry(0.47, 0.47, 0.04, 24, 1, true, -Math.PI / 3, Math.PI * 2 / 3);
    deformPanel(seamCGeo);
    const seamC = new THREE.Mesh(seamCGeo, seamMaterial);
    seamC.position.set(0, 0.35, 0);
    panelGroup.add(seamC);

    // 9. Mouse Drag & Page Scroll Rotation Interactivity
    let isDragging = false;
    let previousMouseX = 0;
    let targetRotationY = 0;
    let scrollY = window.scrollY;

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX || (e.touches && e.touches[0].clientX);
    };

    const handleMouseMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      if (isDragging && clientX !== undefined) {
        const deltaX = clientX - previousMouseX;
        targetRotationY += deltaX * 0.008;
        previousMouseX = clientX;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });

    container.addEventListener('touchstart', handleMouseDown, { passive: true });
    container.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // 10. Resize Handling
    const handleResize = () => {
      if (!containerRef.current) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 11. Animation timeline loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const timelineTime = Math.min(elapsedTime, 5.0);

      // --- STAGE 1 (0.0s — 1.0s): Parallax zoom & panels inflow ---
      if (timelineTime >= 0 && timelineTime <= 1.0) {
        const t = timelineTime;
        
        camera.position.x = 0;
        camera.position.y = 1.4 + t * 0.4; // rise to 1.8
        camera.position.z = 1.8 + t * 2.0; // move back to 3.8
        camera.lookAt(0, 1.7, 0);

        // Animate sleeves, outer skirt, and hood flying in
        panels.forEach((p, idx) => {
          const ripple = Math.sin(t * 10 + idx) * 0.15;
          p.mesh.position.copy(p.startPos).lerp(p.targetPos, t * 0.3);
          p.mesh.position.y += ripple;
          p.mesh.rotation.x = p.startRot.x + (p.targetRot.x - p.startRot.x) * t * 0.3;
          p.mesh.rotation.y = p.startRot.y + (p.targetRot.y - p.startRot.y) * t * 0.3;
          p.mesh.rotation.z = p.startRot.z + (p.targetRot.z - p.startRot.z) * t * 0.3;
        });
      }

      // --- STAGE 2 (1.0s — 3.0s): Assembly onto torso base ---
      else if (timelineTime > 1.0 && timelineTime <= 3.0) {
        const t = (timelineTime - 1.0) / 2.0;
        const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic

        camera.position.set(0, 1.8, 3.8);
        camera.lookAt(0, 1.7, 0);

        panels.forEach(p => {
          p.mesh.position.lerpVectors(p.startPos, p.targetPos, ease);
          p.mesh.rotation.x = p.startRot.x + (p.targetRot.x - p.startRot.x) * ease;
          p.mesh.rotation.y = p.startRot.y + (p.targetRot.y - p.startRot.y) * ease;
          p.mesh.rotation.z = p.startRot.z + (p.targetRot.z - p.startRot.z) * ease;
        });
      }

      // --- STAGE 3 (3.0s — 4.0s): Seam Embroidery Glow ---
      else if (timelineTime > 3.0 && timelineTime <= 4.0) {
        const t = timelineTime - 3.0;

        camera.position.set(0, 1.8, 3.8);
        camera.lookAt(0, 1.7, 0);

        panels.forEach(p => {
          p.mesh.position.copy(p.targetPos);
          p.mesh.rotation.copy(p.targetRot);
        });

        // Golden embroidery flash
        const glowIntensity = Math.max(0.1, 1.0 - t) * 5.0;
        seamMaterial.opacity = Math.max(0.1, 1.0 - t);
        seamGlowLight.intensity = glowIntensity;
        
        const scaleVal = 1.0 + Math.sin(t * Math.PI) * 0.03;
        seamL.scale.set(1.0, scaleVal, scaleVal);
        seamR.scale.set(1.0, scaleVal, scaleVal);
        seamC.scale.set(scaleVal, 1.0, scaleVal);

        studioSpotlight.intensity = t * 3.0;
      }

      // --- STAGE 4 (4.0s — 5.0s+): Idle state & Mouse/Scroll Interaction ---
      else {
        camera.position.set(0, 1.8, 3.8);
        camera.lookAt(0, 1.7, 0);

        studioSpotlight.intensity = 3.0;
        seamMaterial.opacity = 0.25;
        seamGlowLight.intensity = 0.4;

        panels.forEach(p => {
          p.mesh.position.copy(p.targetPos);
          p.mesh.rotation.copy(p.targetRot);
        });

        if (!isDragging) {
          targetRotationY += 0.004; // slow perpetual Y spin
        }
      }

      // Orbital point light position
      orbitalLight.position.set(
        Math.cos(elapsedTime) * 3.2,
        1.8 + Math.sin(elapsedTime * 0.5) * 0.8,
        Math.sin(elapsedTime) * 3.2
      );

      // Scroll-based rotation calculation (1 full spin per 800px scrolled)
      const scrollRotationY = (scrollY / 800) * Math.PI * 2;
      const finalTargetRotY = targetRotationY + scrollRotationY;

      // Interpolate rotation towards final calculated target
      mannequinGroup.rotation.y += (finalTargetRotY - mannequinGroup.rotation.y) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleMouseDown);
      container.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      resizeObserver.disconnect();

      // Dispose geometries
      chestGeo.dispose();
      neckGeo.dispose();
      neckCapGeo.dispose();
      bodiceGeo.dispose();
      innerSkirtGeo.dispose();
      leftSleeveGeo.dispose();
      rightSleeveGeo.dispose();
      outerSkirtGeo.dispose();
      hoodGeo.dispose();
      trainGeo.dispose();
      seamLGeo.dispose();
      seamRGeo.dispose();
      seamCGeo.dispose();

      // Dispose materials
      goldMaterial.dispose();
      obsidianMaterial.dispose();
      satinMaterial.dispose();
      laceMaterial.dispose();
      seamMaterial.dispose();

      renderer.dispose();
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="three-canvas-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 6,
        cursor: 'grab'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
