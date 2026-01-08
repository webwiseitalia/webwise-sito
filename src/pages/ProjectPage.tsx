import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, getRelatedProjects } from '../data/projects'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ProjectPage() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined
  const relatedProjects = projectSlug ? getRelatedProjects(projectSlug, 3) : []

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

      {/* Hero Section */}
      <section className="relative w-full bg-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Hero Image / Mockup */}
          <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden mb-12 flex items-center justify-center">
            {project.heroImage ? (
              <img
                src={project.heroImage}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-[#2EBAEB]/20 flex items-center justify-center">
                  <span className="text-6xl">💻</span>
                </div>
                <h2 className="text-white text-3xl font-bold">{project.name}</h2>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Colonna Sinistra - Dettagli */}
            <div className="flex flex-col gap-6">
              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Cliente</span>
                  <p className="text-white font-semibold mt-1">{project.client}</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Anno</span>
                  <p className="text-white font-semibold mt-1">{project.year}</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Servizio</span>
                  <p className="text-white font-semibold mt-1">{project.service}</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Settore</span>
                  <p className="text-white font-semibold mt-1">{project.industry}</p>
                </div>
              </div>

              {/* Link al sito */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#2EBAEB] hover:bg-[#2EBAEB]/80 text-white font-medium px-6 py-3 rounded-full transition-all hover:-rotate-1 w-fit group"
                >
                  <span>Visita il sito</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
              )}
            </div>

            {/* Colonna Destra - Titolo e Descrizione */}
            <div>
              <h1 className="text-white text-4xl lg:text-5xl font-bold mb-6">{project.name}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{project.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Informazioni Cliente - Sfondo Nero */}
      <section className="w-full bg-black py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Titolo sezione */}
          <div className="mb-12">
            <span className="text-[#2EBAEB] text-sm uppercase tracking-wider">Informazioni cliente</span>
            <p className="text-white text-xl lg:text-2xl leading-relaxed mt-4 max-w-4xl">
              {project.fullDescription}
            </p>
          </div>

          {/* Gallery Images */}
          {project.galleryImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {project.galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden ${index === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}
                >
                  <img src={img} alt={`${project.name} screenshot ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Placeholder Gallery se non ci sono immagini */}
          {project.galleryImages.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="md:col-span-2 aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-gray-600 text-lg">Preview del progetto</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-gray-600">Screenshot 1</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-gray-600">Screenshot 2</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sezione Tecnologie - Sfondo Grigio Scuro */}
      <section className="w-full bg-[#1a1a1a] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="text-[#2EBAEB] text-sm uppercase tracking-wider">Tecnologie utilizzate</span>
          <p className="text-gray-400 mt-4 mb-10 max-w-2xl">
            Il sito è stato sviluppato con un frontend moderno utilizzando le seguenti tecnologie
            selezionate per garantire performance, scalabilità e manutenibilità.
          </p>

          {/* Grid Tecnologie */}
          <div className="flex flex-wrap gap-4">
            {project.technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-black/50 border border-gray-800 rounded-xl px-5 py-3 hover:border-[#2EBAEB]/50 transition-colors"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-white font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gray-200 py-20 lg:py-28 relative overflow-hidden">
        {/* Cerchi sfumati decorativi */}
        <div
          className="absolute -top-[200px] -left-[100px] w-[400px] h-[400px] rounded-full opacity-25"
          style={{ background: '#2EBAEB', filter: 'blur(150px)' }}
        />
        <div
          className="absolute -bottom-[100px] right-0 w-[400px] h-[400px] rounded-full opacity-30"
          style={{ background: '#2EBAEB', filter: 'blur(150px)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2EBAEB] text-white text-xs font-medium mb-6">
            Vuoi lavorare con noi?
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Mandaci un messaggio
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Raccontaci il tuo progetto e scopri come possiamo aiutarti a realizzarlo.
            Ogni grande idea merita di essere ascoltata.
          </p>
          <a
            href="#contatti"
            className="inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white font-medium px-8 py-4 rounded-full transition-all hover:-rotate-1 group"
          >
            <span>Contattaci</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Related Projects */}
      <section className="w-full bg-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[#2EBAEB] text-sm uppercase tracking-wider">Scopri altri</span>
              <h2 className="text-white text-3xl lg:text-4xl font-bold mt-2">Progetti simili</h2>
            </div>
            <Link
              to="/#portfolio"
              className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <span>Vedi tutti</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Grid Progetti Correlati */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject.id}
                to={`/progetti/${relatedProject.slug}`}
                className="group relative aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden"
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[#2EBAEB] text-sm mb-2">{relatedProject.category}</span>
                  <h3 className="text-white text-xl font-bold group-hover:text-[#2EBAEB] transition-colors">
                    {relatedProject.name}
                  </h3>
                </div>

                {/* Arrow */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
