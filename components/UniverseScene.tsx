"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

/**
 * Cena 3D sutil de fundo usando React Three Fiber.
 * Mantemos simples e leve para não competir com as esferas 2D.
 */
function CosmicBackgroundObjects() {
  return (
    <>
      {/* Campo de estrelas suave */}
      <Stars
        radius={80}
        depth={50}
        count={4000}
        factor={3}
        saturation={0}
        fade
        speed={0.6}
      />

      {/* Névoa volumétrica leve */}
      <fog attach="fog" args={["#020617", 15, 120]} />
    </>
  );
}

export function UniverseScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 22], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 4]} intensity={1.1} />
        <CosmicBackgroundObjects />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.35}
        />
      </Canvas>
    </div>
  );
}
