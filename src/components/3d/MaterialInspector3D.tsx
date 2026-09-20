import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Sparkles, ShieldCheck, Flame, Scale, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Material3DData {
  id: string;
  name: string;
  hindi: string;
  rate: number;
  density: string;
  smeltingTemp: string;
  co2OffsetPerKg: string;
  color: number;
  roughness: number;
  metalness: number;
  wireframe?: boolean;
  geometryType: 'box' | 'cylinder' | 'torus' | 'octahedron';
  buyer: string;
}

const MATERIALS: Material3DData[] = [
  {
    id: 'rpet',
    name: 'rPET Flakes & Polymers',
    hindi: 'प्लास्टिक और बोतलें',
    rate: 24.0,
    density: '1.38 g/cm³',
    smeltingTemp: '260°C (Extrusion)',
    co2OffsetPerKg: '2.1 kg CO₂e',
    color: 0x10b981,
    roughness: 0.15,
    metalness: 0.2,
    geometryType: 'octahedron',
    buyer: 'E-Waste & Polymer Smelters',
  },
  {
    id: 'paper',
    name: 'OCC Cardboard & Pulp',
    hindi: 'गत्ता और अख़बार',
    rate: 15.5,
    density: '0.68 g/cm³',
    smeltingTemp: 'Hydropulping 45°C',
    co2OffsetPerKg: '1.4 kg CO₂e',
    color: 0xd97706,
    roughness: 0.8,
    metalness: 0.05,
    geometryType: 'box',
    buyer: 'Paper Mills (Ghaziabad)',
  },
  {
    id: 'copper',
    name: 'Millberry Pure Copper',
    hindi: 'शुद्ध तांबा',
    rate: 695.0,
    density: '8.96 g/cm³',
    smeltingTemp: '1,085°C Smelt',
    co2OffsetPerKg: '4.8 kg CO₂e',
    color: 0xb45309,
    roughness: 0.2,
    metalness: 0.95,
    geometryType: 'torus',
    buyer: 'Secondary Smelters (Alwar)',
  },
  {
    id: 'aluminium',
    name: 'Extruded Aluminium 6063',
    hindi: 'एल्युमीनियम स्क्रैप',
    rate: 142.0,
    density: '2.70 g/cm³',
    smeltingTemp: '660°C Smelt',
    co2OffsetPerKg: '9.2 kg CO₂e',
    color: 0x94a3b8,
    roughness: 0.3,
    metalness: 0.85,
    geometryType: 'cylinder',
    buyer: 'Foundry Units (Mayapuri)',
  },
];

export const MaterialInspector3D: React.FC = () => {
  const { setActiveTab } = useApp();
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [selectedMat, setSelectedMat] = useState<Material3DData>(MATERIALS[0]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(selectedMat.color, 1.8);
    fillLight.position.set(-4, -2, -2);
    scene.add(fillLight);

    // Create Initial Geometry
    const getGeometry = (type: string) => {
      switch (type) {
        case 'octahedron':
          return new THREE.OctahedronGeometry(1.25, 1);
        case 'box':
          return new THREE.BoxGeometry(1.5, 1.2, 1.2);
        case 'torus':
          return new THREE.TorusGeometry(1.0, 0.35, 24, 64);
        case 'cylinder':
          return new THREE.CylinderGeometry(0.85, 0.85, 1.7, 32);
        default:
          return new THREE.OctahedronGeometry(1.2, 0);
      }
    };

    const material = new THREE.MeshStandardMaterial({
      color: selectedMat.color,
      roughness: selectedMat.roughness,
      metalness: selectedMat.metalness,
    });

    const mesh = new THREE.Mesh(getGeometry(selectedMat.geometryType), material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Outer wireframe halo
    const haloGeom = new THREE.IcosahedronGeometry(1.8, 1);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const haloMesh = new THREE.Mesh(haloGeom, haloMat);
    scene.add(haloMesh);

    // Mouse Interaction Drag
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !meshRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (meshRef.current && !isDragging) {
        meshRef.current.rotation.y += 0.007;
        meshRef.current.rotation.x += 0.004;
      }
      haloMesh.rotation.y -= 0.003;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedMat]);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Material Lab</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Secondary Commodity Inspector
          </h3>
          <p className="text-xs text-slate-400">
            Rotate and inspect standardized scrap commodities with live physical & smelting parameters.
          </p>
        </div>

        {/* Material Selection Pills */}
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMat(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedMat.id === m.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {m.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: 3D Canvas Left, Specs & Payout Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* 3D Viewport (7 cols) */}
        <div className="lg:col-span-7 relative h-72 sm:h-80 rounded-2xl bg-slate-950/80 border border-slate-800/80 overflow-hidden flex items-center justify-center">
          <div ref={canvasMountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          
          <div className="absolute top-3 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/60 text-[10px] font-mono text-emerald-400 flex items-center space-x-1.5 pointer-events-none">
            <Rotate3d className="w-3 h-3" />
            <span>360° Drag Rotation</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pointer-events-none">
            <span>Model: {selectedMat.geometryType.toUpperCase()}</span>
            <span className="text-emerald-400">Purity Standard: ISCC Plus</span>
          </div>
        </div>

        {/* Physical Specs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <div className="flex items-baseline justify-between">
              <h4 className="text-lg font-bold text-white">{selectedMat.name}</h4>
              <span className="text-xs text-slate-400">{selectedMat.hindi}</span>
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-black font-mono text-emerald-400">
                ₹{selectedMat.rate.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">/ kilogram buy-rate</span>
            </div>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[10px] uppercase flex items-center space-x-1">
                <Scale className="w-3 h-3 text-slate-400" />
                <span>Density</span>
              </span>
              <div className="font-bold text-slate-200">{selectedMat.density}</div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[10px] uppercase flex items-center space-x-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Thermal Proc</span>
              </span>
              <div className="font-bold text-slate-200">{selectedMat.smeltingTemp}</div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[10px] uppercase">CO₂e Offset</span>
              <div className="font-bold text-emerald-400">{selectedMat.co2OffsetPerKg}</div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[10px] uppercase">Buyer Sector</span>
              <div className="font-bold text-slate-200 truncate">{selectedMat.buyer.split(' ')[0]}</div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('schedule')}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <span>Book Doorstep Pickup for {selectedMat.name.split(' ')[0]}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

