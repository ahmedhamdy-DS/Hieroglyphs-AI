'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Loader } from '@react-three/drei'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

function TutMaskModel(props: any) {
  // استخدم الموديل المضغوط Draco
  const { scene } = useGLTF('/tutankhamun_mask_draco.glb')
  return <primitive object={scene} {...props} />
}

export default function Artifact3D() {
  return (
    <motion.section
      id="artifact"
      className="bg-pharaoh-dark py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-cinzel text-egyptian-gold mb-4 drop-shadow-lg">
          Interactive Artifact
        </h2>
        <p className="text-lg text-papyrus/80 font-inter mb-10">
          Explore the Mask of Tutankhamun in 3D. Drag to rotate, scroll to zoom.
        </p>

        <div className="w-full h-[550px] rounded-2xl p-2 border-2 border-egyptian-gold/30 bg-black/30 shadow-2xl shadow-egyptian-gold/10">
          <Canvas
            camera={{ position: [0, 0, 3.5], fov: 40 }}
            frameloop="demand"
            gl={{ antialias: false, powerPreference: 'low-power' }} // خفف الضغط على GPU
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 5, 5]} intensity={2.5} castShadow />

            <Suspense fallback={null}>
              <TutMaskModel scale={1.8} position={[0, -0.5, 0]} rotation-y={Math.PI / 6} />
              <Environment preset="sunset" />
            </Suspense>

            <OrbitControls
              enableZoom
              autoRotate
              autoRotateSpeed={0.75}
              minDistance={2.5}
              maxDistance={6}
              enablePan={false}
            />
          </Canvas>
          <Loader />
        </div>
      </div>
    </motion.section>
  )
}

// Preload الموديل المضغوط
useGLTF.preload('/tutankhamun_mask_draco.glb')

