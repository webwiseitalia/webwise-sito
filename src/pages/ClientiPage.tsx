import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BurgerMenu from '../components/BurgerMenu'
import NoiseTexture from '../components/NoiseTexture'

export default function ClientiPage() {
  const [showBurger, setShowBurger] = useState(false)
  const [navbarCompression, setNavbarCompression] = useState(0)
  const [activeFilter, setActiveFilter] = useState<string>('tutti')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [visibleCount, setVisibleCount] = useState(10)
  const containerRef = useRef<HTMLDivElement>(null)

  // Categorie uniche per i filtri
  const categories = ['tutti', ...new Set(projects.map(p => p.category))]

  // Progetti filtrati
  const filteredProjects = activeFilter === 'tutti'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  // Progetti visibili (con load more)
  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProjects.length

  // Reset visibleCount quando cambia filtro
  useEffect(() => {
    setVisibleCount(10)
  }, [activeFilter])

  // Logica scroll per navbar/burger
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 100

      if (scrollY > threshold) {
        setShowBurger(true)
        setNavbarCompression(Math.min((scrollY - threshold) / 100, 1))
      } else {
        setShowBurger(false)
        setNavbarCompression(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar compressionProgress={navbarCompression} />
      <BurgerMenu isVisible={showBurger} />

      {/* Hero Section */}
      <section className="relative w-full bg-black overflow-hidden" style={{ padding: '180px 50px 100px 50px' }}>
        <NoiseTexture />

        <div className="relative z-10">
          {/* Back link */}
          <Link
            to="/#clienti"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-20 text-sm"
          >
            <span>←</span>
            <span>HOME</span>
          </Link>

          {/* Layout a due colonne */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
            {/* Colonna sinistra - Titolo grande */}
            <div>
              <h1 className="text-white font-extralight tracking-tight leading-[0.9]" style={{ fontSize: 'clamp(70px, 14vw, 180px)' }}>
                PORTFOLIO
              </h1>
            </div>

            {/* Colonna destra - Descrizione e counter */}
            <div className="lg:max-w-md lg:text-right">
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Ogni progetto è una storia di collaborazione. Soluzioni digitali
                costruite insieme ai nostri clienti.
              </p>
              <div className="flex items-baseline gap-2 lg:justify-end">
                <span className="text-[#2EBAEB] text-6xl lg:text-7xl font-extralight">{filteredProjects.length}</span>
                <span className="text-gray-500 text-sm tracking-wider">PROGETTI</span>
              </div>
            </div>
          </div>

          {/* Filtri */}
          <div className="flex flex-wrap gap-3 pt-8 border-t border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeFilter === cat
                    ? 'bg-[#2EBAEB] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat === 'tutti' ? 'Tutti' : cat}
                <span className="ml-2 text-xs opacity-60">
                  ({cat === 'tutti' ? projects.length : projects.filter(p => p.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tabella Progetti */}
      <section
        ref={containerRef}
        className="relative w-full bg-black"
        style={{ padding: '0 50px 100px 50px' }}
        onMouseMove={handleMouseMove}
      >
        {/* Preview immagine che segue il mouse (solo desktop) */}
        {hoveredProject !== null && (
          <div
            className="hidden lg:block fixed pointer-events-none z-50 rounded-lg overflow-hidden shadow-2xl"
            style={{
              left: mousePos.x + (containerRef.current?.getBoundingClientRect().left || 0) + 30,
              top: mousePos.y + (containerRef.current?.getBoundingClientRect().top || 0) - 100,
            }}
          >
            {projects.find(p => p.id === hoveredProject)?.heroImage ? (
              <img
                src={projects.find(p => p.id === hoveredProject)?.heroImage}
                alt={projects.find(p => p.id === hoveredProject)?.name || 'Progetto'}
                title={projects.find(p => p.id === hoveredProject)?.name || 'Progetto'}
                width={320}
                height={200}
                loading="lazy"
                className="w-[320px] h-[200px] object-cover object-top"
              />
            ) : (
              <div className="w-[320px] h-[200px] bg-gradient-to-br from-[#2EBAEB]/30 to-[#2EBAEB]/10 flex items-center justify-center">
                <span className="text-white font-medium">
                  {projects.find(p => p.id === hoveredProject)?.name}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Header tabella */}
        <div className="grid grid-cols-12 gap-4 px-4 py-5 text-gray-500 text-xs tracking-wider border-b border-white/10">
          <div className="col-span-1 hidden lg:block">#</div>
          <div className="col-span-5 lg:col-span-3">PROGETTO</div>
          <div className="col-span-3 lg:col-span-2 hidden sm:block">SETTORE</div>
          <div className="col-span-3 hidden lg:block">SERVIZIO</div>
          <div className="col-span-2 hidden md:block">CATEGORIA</div>
          <div className="col-span-7 sm:col-span-4 lg:col-span-1 text-right lg:text-left">ANNO</div>
        </div>

        {/* Righe progetti */}
        {visibleProjects.map((project, index) => (
          <Link
            key={project.id}
            to={`/progetti/${project.slug}`}
            className="grid grid-cols-12 gap-4 px-4 py-6 lg:py-8 border-b border-white/5 group hover:bg-white/[0.02] transition-all"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Numero */}
            <div className="col-span-1 hidden lg:flex items-center">
              <span className="text-white/20 text-sm font-mono group-hover:text-[#2EBAEB] transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Nome progetto */}
            <div className="col-span-5 lg:col-span-3 flex items-center gap-4">
              {/* Thumbnail mobile/tablet */}
              <div className="lg:hidden w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#111]">
                {project.heroImage && (
                  <img
                    src={project.heroImage}
                    alt={project.name}
                    title={project.name}
                    width={48}
                    height={48}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <span className="text-white text-base lg:text-lg font-medium group-hover:text-[#2EBAEB] transition-colors">
                {project.name}
              </span>
            </div>

            {/* Settore */}
            <div className="col-span-3 lg:col-span-2 hidden sm:flex items-center">
              <span className="text-gray-500 text-sm">{project.industry}</span>
            </div>

            {/* Servizio */}
            <div className="col-span-3 hidden lg:flex items-center">
              <span className="text-gray-500 text-sm truncate">{project.service}</span>
            </div>

            {/* Categoria */}
            <div className="col-span-2 hidden md:flex items-center">
              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                {project.category}
              </span>
            </div>

            {/* Anno */}
            <div className="col-span-7 sm:col-span-4 lg:col-span-1 flex items-center justify-end lg:justify-start">
              <span className="text-gray-500 text-sm">{project.year}</span>
            </div>
          </Link>
        ))}

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center pt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all group"
            >
              <span>Mostra altri</span>
              <span className="text-xs text-gray-500">
                ({filteredProjects.length - visibleCount} rimanenti)
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-y-1 transition-transform"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>
        )}

        {/* Messaggio se nessun progetto */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">Nessun progetto in questa categoria.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#0a0a0a] relative overflow-hidden" style={{ padding: '100px 50px' }}>
        {/* Glow effect */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #2EBAEB 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-white text-3xl lg:text-5xl font-extralight mb-6">
            Vuoi essere il prossimo?
          </h2>

          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
            Raccontaci la tua idea e costruiamo insieme qualcosa di straordinario.
          </p>

          {/* Bottone CTA */}
          <a
            href="tel:+393472509688"
            className="inline-flex items-center gap-3 bg-[#2EBAEB] hover:bg-[#26a8d6] text-white px-8 py-4 rounded-full transition-all hover:scale-105 group"
          >
            <span className="font-medium">Parliamone</span>
            <div className="relative flex overflow-hidden w-5 h-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute transition-all duration-300 translate-x-0 group-hover:translate-x-[150%]"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute transition-all duration-300 -translate-x-[150%] group-hover:translate-x-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
