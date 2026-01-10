import { Link } from 'react-router-dom'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
// OrbitControls rimosso - ora l'icosaedro ruota automaticamente
import * as THREE from 'three'
import logoStud from '../assets/loghi scot/logo-stud.webp'
import logoOrdo from '../assets/loghi scot/logo-ordo.webp'
import logoTodo from '../assets/loghi scot/logo-todo.webp'
import logoCash from '../assets/loghi scot/logo-cash.webp'
import logoTool from '../assets/loghi scot/logo-tools.webp'
import scotModel from '../assets/new-scot-3d.glb'

function ScotModel() {
  const { scene } = useGLTF(scotModel)
  const icosahedronGroupRef = useRef<THREE.Object3D | null>(null)

  // Cerca il gruppo che contiene l'icosaedro (quello con molti figli - Node[6] con 42 figli)
  // L'icona centrale è Node[49]->Node[50] e resta ferma
  if (!icosahedronGroupRef.current) {
    scene.traverse((child) => {
      // Il gruppo dell'icosaedro ha >30 figli (i segmenti del wireframe)
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

  return <primitive object={scene} scale={1.7} position={[0, 0.15, 0]} />
}

interface Software {
  id: string
  slug: string
  name: string
  description: string
  logo: string
}

const softwares: Software[] = [
  {
    id: '/0.1',
    slug: 'stud',
    name: 'STUD',
    description: 'Crea siti web professionali con l\'intelligenza artificiale, senza scrivere codice.',
    logo: logoStud
  },
  {
    id: '/0.2',
    slug: 'ordo',
    name: 'ORDO',
    description: 'Analisi avanzata dei dati web con machine learning per insights strategici.',
    logo: logoOrdo
  },
  {
    id: '/0.3',
    slug: 'todo',
    name: 'TODO',
    description: 'Automazione dei processi aziendali con workflow intelligenti e integrati.',
    logo: logoTodo
  },
  {
    id: '/0.4',
    slug: 'cash',
    name: 'CASH',
    description: 'Sincronizzazione e gestione centralizzata di dati multi-piattaforma in tempo reale.',
    logo: logoCash
  },
  {
    id: '/0.5',
    slug: 'tool',
    name: 'TOOL',
    description: 'Deploy autonomo, monitoraggio e gestione software su qualsiasi ambiente.',
    logo: logoTool
  }
]

export default function SoftwareSection() {
  return (
    <section id="software" className="w-full">
      {/* Sezione con testo piccolo a destra e render 3D a sinistra */}
      <div className="w-full py-20">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Colonna sinistra - Render 3D */}
          <div className="h-[400px] lg:h-[500px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <ScotModel />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>

          {/* Colonna destra - Testo */}
          <div className="max-w-md ml-auto text-right">
            {/* Badge */}
            <span className="inline-block text-xs px-3 py-1 rounded-full border border-[#2EBAEB]/50 bg-[#2EBAEB]/10 text-[#2EBAEB] mb-6">
              COMING SOON
            </span>

            {/* Titolo */}
            <h3
              className="text-white font-semibold mb-3 w-full"
              style={{ fontFamily: 'Moderniz, sans-serif', fontSize: 'clamp(50px, 8vw, 90px)', lineHeight: '1' }}
            >
              SCOT
            </h3>

            {/* Descrizione */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Capire esattamente quello che ti serve è il nostro pane quotidiano.
              Sviluppiamo soluzioni software personalizzate che si allineano
              perfettamente ai tuoi obiettivi. Il nostro approccio è un mix ben
              rodato di metodo e creatività, garantendo prodotti di qualità superiore
              e senza compromessi.
            </p>

            {/* Bottoni */}
            <div className="flex justify-end gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 pl-4 pr-2 py-2 rounded-full text-white text-sm transition-all"
              >
                <span>Leggi di più</span>
                <span className="bg-black rounded-full p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 7v14" />
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                  </svg>
                </span>
              </a>
              <a
                href="#contatti"
                className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 pl-4 pr-2 py-2 rounded-full text-white text-sm transition-all"
              >
                <span>Contattaci</span>
                <span className="bg-black rounded-full p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione con software - Full Width */}
      <div className="w-full">
        {/* Header con callout text - con bordino superiore come i badge */}
        <div className="w-full border-t border-white/20">
          <div className="w-full px-10 lg:px-24 py-16 lg:py-20">
            <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-white font-semibold text-center">
              I nostri software alimentano decisioni in tempo reale,{' '}
              <span className="text-[#2EBAEB]">AI-driven</span> per aziende
              e imprese, dalla produzione alla distribuzione.
            </p>
          </div>
        </div>

        {/* Software List - Full Width */}
        <div className="w-full">
          {softwares.map((software) => (
            <Link
              key={software.id}
              to={`/software/${software.slug}`}
              className="group block border-t border-white/20 hover:bg-white/5 transition-all duration-300"
            >
              <div className="w-full px-10 lg:px-24 py-8 lg:py-10 grid grid-cols-12 items-center gap-4">
                {/* Left: Description + Number - con bordino verticale */}
                <div className="col-span-12 lg:col-span-2 border-l-2 border-white/30 pl-4">
                  <p className="text-white/60 text-sm leading-relaxed mb-3">
                    {software.description}
                  </p>
                  <span className="text-white/30 text-xs font-mono">{software.id}</span>
                </div>

                {/* Center: Logo */}
                <div className="col-span-2 lg:col-span-2 flex justify-center pr-4">
                  <img
                    src={software.logo}
                    alt={`Logo ${software.name}`}
                    className="w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] object-contain"
                  />
                </div>

                {/* Rettangolo azzurro che appare al hover - proporzioni 16:9 */}
                <div className="hidden lg:flex col-span-4 justify-start items-center pl-4 pr-12">
                  <div className="w-full aspect-video bg-[#2EBAEB] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
                </div>

                {/* Right: Name (large) */}
                <div className="col-span-10 lg:col-span-4 flex justify-end">
                  <h3
                    className="text-white text-5xl md:text-7xl lg:text-[120px] xl:text-[150px] leading-none tracking-tight group-hover:translate-x-2 transition-transform duration-300"
                    style={{ fontFamily: 'Moderniz, sans-serif' }}
                  >
                    {software.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white/20" />
        </div>
      </div>
    </section>
  )
}
