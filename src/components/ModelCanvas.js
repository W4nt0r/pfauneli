// ModelCanvas.js (plain JS)
'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Bounds, Html, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelCanvas({ url = '/models/myModel.glb', controlsPlacement = 'top-right' }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [animPlaying, setAnimPlaying] = useState(true);
  const [bgColor, setBgColor] = useState('#ffffff');

  // map placement -> Tailwind classes
  const pos = {
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'top-center': 'top-3 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-3 left-1/2 -translate-x-1/2',
  }[controlsPlacement] || 'top-right';

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl">
      <Canvas
        dpr={[1,2]}
        camera={{ position: [1, 1.5, 3], fov: 45 }} // [Vzdalenost, Vyska, ]
        style={{ background: bgColor }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3,5,2]} intensity={1.1} />
        <Environment preset="city" />
        <Bounds fit clip observe margin={1}>
          <Suspense fallback={<Html center className="text-gray-600">Načítám…</Html>}>
            <Model url={url} />
          </Suspense>
        </Bounds>
        <OrbitControls enableDamping autoRotate={autoRotate} />
      </Canvas>

      {/* Overlay controls inside the wrapper, absolutely positioned */}
      <div
        className={`absolute ${pos} z-10 pointer-events-none`} // container ignores pointer events…
      >
        <div className="flex gap-2 pointer-events-auto"> {/* …buttons still clickable */}
          <button
            onClick={() => setAutoRotate(v => !v)}
            className="px-3 py-1 rounded-md bg-black/70 text-white text-sm"
          >
            {autoRotate ? 'Stop rotate' : 'Rotate'}
          </button>
          <button
            onClick={() => setBgColor(c => (c === '#ffffff' ? '#000000' : '#ffffff'))}
            className="px-3 py-1 rounded-md bg-black/70 text-white text-sm"
          >
            {bgColor === '#ffffff' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>
      </div>
    </div>
  );
}
