import { Link } from 'react-router-dom'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import scotModel from '../assets/3d/scot-model.glb'
import NoiseTexture from '../components/NoiseTexture'

// Componente per il modello 3D di SCOT
function ScotModel() {
  const { scene } = useGLTF(scotModel)
  const icosahedronGroupRef = useRef<THREE.Object3D | null>(null)

  // Cerca il gruppo che contiene l'icosaedro (quello con molti figli)
  if (!icosahedronGroupRef.current) {
    scene.traverse((child) => {
      if (child.children && child.children.length > 30 && !icosahedronGroupRef.current) {
        icosahedronGroupRef.current = child
      }
    })
  }

  // Animazione rotazione solo per il gruppo icosaedro
  useFrame((_, delta) => {
    if (icosahedronGroupRef.current) {
      icosahedronGroupRef.current.rotation.y += delta * 0.5
    }
  })

  return <primitive object={scene} scale={1.65} position={[0, 0.15, 0]} />
}

export default function ScotPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      {/* Background griglia reattiva */}
      <NoiseTexture />

      {/* Back link - alto a sinistra */}
      <div className="relative z-10 p-6 lg:p-12">
        <Link
          to="/#software"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
        >
          <span>←</span>
          <span>HOME</span>
        </Link>
      </div>

      {/* Contenuto centrale */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {/* Modello 3D */}
        <div className="w-full max-w-lg h-[300px] lg:h-[400px] mb-8">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <ScotModel />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* Scritta */}
        <h1
          className="text-white text-center"
          style={{
            fontFamily: 'Moderniz, sans-serif',
            fontSize: 'clamp(32px, 10vw, 120px)',
            lineHeight: '1.1'
          }}
        >
          SCOT IS COMING SOON
          {/* Puntini animati */}
          <span className="inline-flex ml-1">
            <span className="dot-bounce" style={{ animationDelay: '0s' }}>.</span>
            <span className="dot-bounce" style={{ animationDelay: '0.15s' }}>.</span>
            <span className="dot-bounce" style={{ animationDelay: '0.3s' }}>.</span>
          </span>
        </h1>
      </div>

      {/* Stili per animazione puntini a onda */}
      <style>{`
        @keyframes dotBounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-20px);
          }
        }
        .dot-bounce {
          display: inline-block;
          animation: dotBounce 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
