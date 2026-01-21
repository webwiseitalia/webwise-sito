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
      <section className="relative w-full bg-black overflow-hidden px-5 pt-28 pb-10 lg:px-12 lg:pt-44 lg:pb-20">
        <NoiseTexture />

        <div className="relative z-10">
          {/* Back link */}
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 lg:mb-20 text-sm"
          >
            <span>←</span>
            <span>HOME</span>
          </Link>

          {/* Layout a due colonne */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 mb-8 lg:mb-16">
            {/* Colonna sinistra - Titolo grande */}
            <div>
              <h1 className="text-white font-extralight tracking-tight leading-[0.9]" style={{ fontSize: 'clamp(48px, 12vw, 180px)' }}>
                PORTFOLIO
              </h1>
            </div>

            {/* Colonna destra - Descrizione e counter */}
            <div className="lg:max-w-md lg:text-right">
              <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-4 lg:mb-6">
                Ogni progetto è una storia di collaborazione. Soluzioni digitali
                costruite insieme ai nostri clienti.
              </p>
              <div className="flex items-baseline gap-2 lg:justify-end">
                <span className="text-[#2EBAEB] text-5xl lg:text-7xl font-extralight">{filteredProjects.length}</span>
                <span className="text-gray-500 text-sm tracking-wider">PROGETTI</span>
              </div>
            </div>
          </div>

          {/* Filtri */}
          <div className="flex flex-wrap gap-2 lg:gap-3 pt-6 lg:pt-8 border-t border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-sm transition-all ${
                  activeFilter === cat
                    ? 'bg-[#2EBAEB] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat === 'tutti' ? 'Tutti' : cat}
                <span className="ml-1.5 lg:ml-2 text-xs opacity-60">
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
        className="relative w-full bg-black px-5 pb-12 lg:px-12 lg:pb-24"
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

      {/* Sezione Contattaci */}
      <div className="w-full relative py-24 lg:py-32 bg-gray-200 overflow-hidden z-10">
        {/* Cerchio sfumato cyan in alto a destra */}
        <div
          className="absolute -top-[300px] -right-[150px] w-[500px] h-[500px] rounded-full opacity-35 z-[1]"
          style={{
            background: '#2EBAEB',
            filter: 'blur(200px)'
          }}
        />

        {/* Cerchio sfumato cyan in basso a sinistra */}
        <div
          className="absolute -bottom-[150px] left-0 w-[500px] h-[500px] rounded-full opacity-25 z-[1]"
          style={{
            background: '#2EBAEB',
            filter: 'blur(200px)'
          }}
        />

        {/* Contenuto */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
          {/* Contenuto principale - allineato a destra */}
          <div className="flex flex-col gap-4 max-w-2xl ml-auto text-right">
            {/* Badge */}
            <span className="inline-block text-xs px-3 py-1 rounded-full border border-[#2EBAEB]/50 bg-[#2EBAEB]/10 text-[#2EBAEB] w-fit ml-auto">
              SCRIVICI
            </span>

            <h4 className="text-3xl lg:text-4xl uppercase font-bold tracking-tight text-gray-900 leading-tight">
              Vuoi lavorare con noi?{' '}
              <span className="text-[#2EBAEB]">Raccontaci il tuo progetto</span>
            </h4>

            <p className="text-gray-600 leading-relaxed max-w-xl ml-auto">
              Ogni percorso inizia con una chiamata conoscitiva, in cui potrai raccontarci quali sono le tue esigenze e ricevere i primi consigli sulla loro realizzazione.
            </p>

            {/* Bottone Contattaci */}
            <a
              href="tel:+393472509688"
              className="mt-2 border border-gray-400/50 pl-4 pr-1.5 py-1.5 rounded-full bg-gray-100 flex items-center gap-3 group hover:-rotate-2 transition-all w-fit ml-auto"
            >
              <span className="text-gray-900 font-medium">Contattaci</span>
              <div className="relative flex p-2 overflow-hidden text-white bg-black rounded-full group-hover:bg-[#2EBAEB] transition-colors">
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
                  className="transition-all translate-y-0 group-hover:-translate-y-[200%]"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
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
                  className="absolute transition-all translate-y-[200%] group-hover:translate-y-0"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Icona stella/asterisco */}
        <svg
          className="absolute z-[1] -bottom-[100px] -left-[100px] lg:-bottom-[150px] lg:-left-[150px] w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] animate-spin-slow opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 72 72"
          fill="none"
          style={{ animationDuration: '20s' }}
        >
          <path
            d="M40 0H32V26.3432L13.3726 7.71573L7.71573 13.3726L26.3431 32H0V40H26.3432L7.71573 58.6274L13.3726 64.2843L32 45.6569V72H40V45.6569L58.6274 64.2843L64.2843 58.6274L45.6568 40H72V32H45.6569L64.2843 13.3726L58.6274 7.71573L40 26.3432V0Z"
            fill="#2EBAEB"
          />
        </svg>

        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}</style>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
