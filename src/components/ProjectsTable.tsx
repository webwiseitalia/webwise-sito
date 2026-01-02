import { useState, useRef } from 'react'

interface Project {
  id: number
  name: string
  industry: string
  tools: string
  category: string
  year: string
  image?: string
  href: string
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Consorzio Vadò',
    industry: 'Industry',
    tools: 'React',
    category: 'Website',
    year: '2025',
    href: '#'
  },
  {
    id: 2,
    name: 'Medusa',
    industry: 'Blockchain',
    tools: 'Nextjs',
    category: 'Software',
    year: '2024',
    href: '#'
  },
  {
    id: 3,
    name: 'Quercetti S.p.A.',
    industry: 'Toys',
    tools: 'Shopify',
    category: 'Ecommerce',
    year: '2021',
    href: '#'
  },
  {
    id: 4,
    name: 'Top Gear',
    industry: 'Automotive',
    tools: 'Drupal',
    category: 'Website',
    year: '2022',
    href: '#'
  },
]

export default function ProjectsTable() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-8 py-12"
      onMouseMove={handleMouseMove}
    >
      {/* Titolo */}
      <a href="#" className="inline-block mb-8">
        <h2 className="text-white text-3xl font-semibold hover:text-red-500 transition-colors">
          Progetti
        </h2>
      </a>

      {/* Preview immagine che segue il mouse (solo desktop) */}
      {hoveredProject !== null && (
        <div
          className="hidden lg:block absolute pointer-events-none z-50 rounded-lg overflow-hidden"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 125,
            transform: 'scale(1)',
            transition: 'transform 0.2s ease-out'
          }}
        >
          <div className="w-[250px] h-[250px] bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {projects.find(p => p.id === hoveredProject)?.name}
            </span>
          </div>
        </div>
      )}

      {/* Tabella progetti */}
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-4 text-gray-500 text-sm border-b border-gray-800">
          <div className="col-span-4 sm:col-span-3">
            <p>Progetto</p>
          </div>
          <div className="hidden md:block col-span-2">
            <p>Industria</p>
          </div>
          <div className="hidden lg:block col-span-2">
            <p>Strumenti</p>
          </div>
          <div className="hidden sm:block col-span-3 lg:col-span-3">
            <p>Categoria</p>
          </div>
          <div className="col-span-8 sm:col-span-4 md:col-span-2 text-right sm:text-left">
            <p>Anno</p>
          </div>
        </div>

        {/* Righe progetti */}
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.href}
            className="grid grid-cols-12 gap-4 px-4 py-6 border-b border-gray-800 group hover:bg-white/5 transition-colors"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Nome progetto */}
            <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
              {/* Thumbnail mobile */}
              <div className="lg:hidden w-[50px] h-[50px] rounded-md overflow-hidden flex-shrink-0 bg-gradient-to-br from-red-500 to-red-800">
              </div>
              <p className="text-white font-bold group-hover:text-red-500 group-hover:translate-x-1 transition-all">
                {project.name}
              </p>
            </div>

            {/* Industria */}
            <div className="hidden md:flex col-span-2 items-center">
              <p className="text-gray-400">{project.industry}</p>
            </div>

            {/* Strumenti */}
            <div className="hidden lg:flex col-span-2 items-center">
              <p className="text-gray-400">{project.tools}</p>
            </div>

            {/* Categoria */}
            <div className="hidden sm:flex col-span-3 lg:col-span-3 items-center">
              <p className="text-gray-400">{project.category}</p>
            </div>

            {/* Anno */}
            <div className="col-span-8 sm:col-span-4 md:col-span-2 flex items-center justify-end sm:justify-start">
              <p className="text-gray-400">{project.year}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
