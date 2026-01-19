import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function ProjectsTable() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
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
      className="relative w-full px-6 lg:px-12"
      onMouseMove={handleMouseMove}
    >
      {/* Titolo */}
      <Link to="/#portfolio" className="inline-block mb-10 lg:mb-12">
        <h2 className="text-white text-4xl lg:text-5xl font-semibold hover:text-[#2EBAEB] transition-colors">
          Progetti
        </h2>
      </Link>

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
          {projects.find(p => p.id === hoveredProject)?.heroImage ? (
            <img
              src={projects.find(p => p.id === hoveredProject)?.heroImage}
              alt={projects.find(p => p.id === hoveredProject)?.name || 'Progetto'}
              title={projects.find(p => p.id === hoveredProject)?.name || 'Progetto'}
              width={300}
              height={200}
              loading="lazy"
              className="w-[300px] h-[200px] object-cover object-top"
            />
          ) : (
            <div className="w-[300px] h-[200px] bg-gradient-to-br from-[#2EBAEB]/30 to-[#2EBAEB]/10 flex items-center justify-center border border-[#2EBAEB]/20">
              <span className="text-white font-bold text-sm">
                {projects.find(p => p.id === hoveredProject)?.name}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tabella progetti */}
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-5 text-gray-500 text-sm border-b border-gray-700">
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
          <Link
            key={project.id}
            to={`/progetti/${project.slug}`}
            className="grid grid-cols-12 gap-4 px-4 py-8 lg:py-10 border-b border-gray-800 group hover:bg-white/5 transition-colors"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Nome progetto */}
            <div className="col-span-4 sm:col-span-3 flex items-center gap-4">
              {/* Thumbnail mobile */}
              <div className="lg:hidden w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#2EBAEB]/30 to-[#2EBAEB]/10">
                {project.heroImage && (
                  <img
                    src={project.heroImage}
                    alt={project.name}
                    title={project.name}
                    width={60}
                    height={60}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                )}
              </div>
              <p className="text-white text-lg lg:text-xl font-bold group-hover:text-[#2EBAEB] group-hover:translate-x-2 transition-all">
                {project.name}
              </p>
            </div>

            {/* Industria */}
            <div className="hidden md:flex col-span-2 items-center">
              <p className="text-gray-400 text-base">{project.industry}</p>
            </div>

            {/* Strumenti */}
            <div className="hidden lg:flex col-span-2 items-center">
              <p className="text-gray-400 text-base">{project.tools[0]}</p>
            </div>

            {/* Categoria */}
            <div className="hidden sm:flex col-span-3 lg:col-span-3 items-center">
              <p className="text-gray-400 text-base">{project.category}</p>
            </div>

            {/* Anno */}
            <div className="col-span-8 sm:col-span-4 md:col-span-2 flex items-center justify-end sm:justify-start">
              <p className="text-gray-400 text-base">{project.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
