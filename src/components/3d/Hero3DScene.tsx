import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d } from 'lucide-react';

interface NodeData {
  name: string;
  sub: string;
  color: string;
  position: [number, number, number];
  role: string;
}

const NODES: NodeData[] = [
  { name: 'Doorstep Node', sub: 'Citizen Booking', color: '#10b981', position: [-2.2, 0.8, 0.5], role: 'Household' },
  { name: 'E-Loader Partner', sub: 'IoT Calibrated Weighing', color: '#06b6d4', position: [1.8, 1.4, -0.6], role: 'Collector' },
  { name: 'Mayapuri Sorting Hub', sub: 'Purity & Optical Grading', color: '#f59e0b', position: [-1.4, -1.5, 0.8], role: 'MRF Depot' },
  { name: 'Polymer Smelter', sub: 'CPCB EPR Credit Vault', color: '#8b5cf6', position: [2.0, -1.0, 0.3], role: 'Industrial Recycler' },
];

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<NodeData | null>(NODES[0]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x34d399, 2.0);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.5);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    // 4. Central Circularity Wireframe Core (Icosahedron with glowing nodes)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const coreGeom = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeom = new THREE.SphereGeometry(1.1, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      emissive: 0x047857,
      emissiveIntensity: 0.6,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.7,
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerSphere);

    // 5. Floating Particle Lattice
    const particleCount = 280;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x34d399), // Emerald
      new THREE.Color(0x38bdf8), // Sky
      new THREE.Color(0xfbbf24), // Amber
      new THREE.Color(0xa78bfa), // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.4 + Math.random() * 1.6;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    coreGroup.add(particleSystem);

    // 6. Connecting Bezier Rings
    const ringGeom = new THREE.TorusGeometry(2.5, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ringGeom, ringMat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeom, ringMat.clone());
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // 7. Node Markers
    NODES.forEach((n) => {
      const nodeG = new THREE.SphereGeometry(0.18, 24, 24);
      const nodeM = new THREE.MeshStandardMaterial({
        color: new THREE.Color(n.color),
        emissive: new THREE.Color(n.color),
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(nodeG, nodeM);
      mesh.position.set(...n.position);
      coreGroup.add(mesh);
    });

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        targetRotationY = mouseX * 0.45;
        targetRotationX = -mouseY * 0.35;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damping rotation
      coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05 + 0.002;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

      // Pulse effects
      ring1.rotation.z = elapsed * 0.15;
      ring2.rotation.z = -elapsed * 0.12;
      particleSystem.rotation.y = -elapsed * 0.05;

      const scalePulse = 1 + Math.sin(elapsed * 1.5) * 0.02;
      innerSphere.scale.set(scalePulse, scalePulse, scalePulse);

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[440px] sm:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/80 border border-slate-800/90 shadow-2xl select-none">
      {/* 3D WebGL Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Modern HUD Header Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80 text-white text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
            3D Circular Topology
          </span>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 text-slate-300 text-[11px] font-mono">
          <Rotate3d className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interactive 3D View</span>
        </div>
      </div>

      {/* Floating Node Info Bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeNode?.color || '#10b981' }} />
            <h4 className="text-xs font-bold font-mono uppercase text-white tracking-wider">
              {activeNode?.role} • {activeNode?.name}
            </h4>
          </div>
          <p className="text-[11px] text-slate-400">
            {activeNode?.sub} — Real-time telemetry synchronized with SHA-256 state ledger.
          </p>
        </div>

        {/* Node switchers */}
        <div className="flex items-center space-x-1.5">
          {NODES.map((node, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveNode(node)}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono uppercase transition-all cursor-pointer ${
                activeNode?.name === node.name 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {node.role.slice(0, 7)}
            </button>
          ))}
        </div>
      </div>

      {/* Minimalist Telemetry Coordinates */}
      <div className="absolute top-16 right-4 text-[10px] font-mono text-slate-500 pointer-events-none text-right hidden sm:block">
        <div>LAT 28.6139° N</div>
        <div>LNG 77.2090° E</div>
        <div className="text-emerald-500/70">THREE.JS WEBGL</div>
      </div>
    </div>
  );
};

