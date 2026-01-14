import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getRelatedProjects } from '../data/projects'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ProjectPage() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined
  const relatedProjects = projectSlug ? getRelatedProjects(projectSlug, 2) : []

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-4">Progetto non trovato</h1>
          <Link to="/" className="text-[#2EBAEB] hover:underline">
            Torna alla home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section - Full Width Image */}
      <section className="relative w-full h-[70vh] bg-black">
        {project.heroImage ? (
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#111]" />
        )}
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </section>

      {/* Project Title Section */}
      <section className="w-full bg-black" style={{ padding: '80px 50px' }}>
        <div>
          {/* Back link */}
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-sm"
          >
            <span>←</span>
            <span>TUTTI I PROGETTI</span>
          </Link>

          {/* Title and Meta */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <h1 className="text-white font-extralight tracking-tight leading-none" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>
              {project.name.toUpperCase()}
            </h1>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/30 hover:border-[#2EBAEB] hover:text-[#2EBAEB] text-white rounded-full transition-colors shrink-0"
                style={{ padding: '18px 40px', fontSize: '14px' }}
              >
                VISITA IL SITO <span>↗</span>
              </a>
            )}
          </div>

          {/* Info Row */}
          <div className="flex flex-wrap gap-x-16 gap-y-6 border-t border-white/10 pt-8">
            <div>
              <span className="text-gray-500 text-xs tracking-wider block mb-2">CLIENTE</span>
              <span className="text-white text-sm">{project.client}</span>
            </div>
            {project.location && (
              <div>
                <span className="text-gray-500 text-xs tracking-wider block mb-2">LUOGO</span>
                <span className="text-white text-sm">{project.location}</span>
              </div>
            )}
            <div>
              <span className="text-gray-500 text-xs tracking-wider block mb-2">ANNO</span>
              <span className="text-white text-sm">{project.year}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs tracking-wider block mb-2">SERVIZIO</span>
              <span className="text-white text-sm">{project.service}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs tracking-wider block mb-2">SETTORE</span>
              <span className="text-white text-sm">{project.industry}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="w-full bg-black" style={{ padding: '0 50px 100px 50px' }}>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-gray-500 text-xs tracking-wider">IL PROGETTO</span>
            </div>
            <div>
              <p className="text-white text-xl lg:text-2xl font-light leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full bg-black" style={{ padding: '0 50px 100px 50px' }}>
        <div>
          {project.galleryImages.length > 0 ? (
            <div className="space-y-6">
              {project.galleryImages.map((img, index) => (
                <div key={index} className="w-full">
                  <img
                    src={img}
                    alt={`${project.name} - ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full aspect-[16/9] bg-[#111] flex items-center justify-center">
              <span className="text-gray-600 text-sm tracking-wider">IMMAGINI IN ARRIVO</span>
            </div>
          )}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="w-full bg-black border-t border-white/10" style={{ padding: '80px 50px' }}>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-gray-500 text-xs tracking-wider">TECNOLOGIE</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="text-white text-sm border border-white/20 rounded-full px-5 py-2"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {project.results && (
        <section className="w-full bg-black border-t border-white/10" style={{ padding: '80px 50px' }}>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="text-gray-500 text-xs tracking-wider">RISULTATI</span>
              </div>
              <div>
                <p className="text-white text-xl lg:text-2xl font-light leading-relaxed">
                  {project.results}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="w-full bg-black border-t border-white/10" style={{ padding: '80px 50px' }}>
          <div>
            <div className="flex items-center justify-between mb-16">
              <span className="text-gray-500 text-xs tracking-wider">ALTRI PROGETTI</span>
              <Link
                to="/#portfolio"
                className="text-gray-500 hover:text-white text-xs tracking-wider transition-colors"
              >
                VEDI TUTTI →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  to={`/progetti/${relatedProject.slug}`}
                  className="group block"
                >
                  <div className="aspect-[16/10] bg-[#111] mb-6 overflow-hidden">
                    {relatedProject.heroImage ? (
                      <img
                        src={relatedProject.heroImage}
                        alt={relatedProject.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm">{relatedProject.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-2xl font-light group-hover:text-[#2EBAEB] transition-colors">
                      {relatedProject.name}
                    </h3>
                    <span className="text-gray-500 text-sm">{relatedProject.year}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
              href="/#contatti"
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

      <Footer />
    </div>
  )
}
