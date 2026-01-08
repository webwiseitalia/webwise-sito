import { Link } from 'react-router-dom'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

const roles = [
  { title: 'Frontend Developer', location: 'Remote / Milano', type: 'Full-time' },
  { title: 'Backend Engineer', location: 'Remote / Milano', type: 'Full-time' },
  { title: 'UX/UI Designer', location: 'Remote', type: 'Full-time' },
  { title: 'Product Manager', location: 'Milano', type: 'Full-time' },
  { title: 'DevOps Engineer', location: 'Remote', type: 'Full-time' },
]

const values = [
  {
    icon: '💭',
    title: 'Free Thinkers',
    description: 'Cerchiamo persone intellettualmente curiose e anticonformiste. Che tu abbia un PhD o sia autodidatta, ciò che conta è il pensiero critico.'
  },
  {
    icon: '🚀',
    title: 'Catalysts',
    description: 'I Webwiser prendono iniziativa. Non ci sono istruzioni dall\'alto che ti bloccano. Quando vedi una soluzione, la realizzi.'
  },
  {
    icon: '🎯',
    title: 'Independents',
    description: 'Non sei valutato da dirigenti distanti — sei giudicato dai risultati. Il tuo lavoro parla da sé.'
  },
  {
    icon: '⚡',
    title: 'Fast-movers',
    description: 'Prendiamo decisioni rapidamente. Ottimizziamo per l\'impatto, non per il consenso. Zero burocrazia tra identificare un problema e risolverlo.'
  }
]

const roleTypes = [
  {
    name: 'Deltas',
    description: 'Il loro compito è assicurare che le soluzioni che costruiamo funzionino davvero. In un mondo di demo e promesse, un Delta offre risultati tangibili.'
  },
  {
    name: 'Echos',
    description: 'Gli Echos sono il ponte tra tecnologia e business. Traducono le esigenze dei clienti in soluzioni concrete e scalabili.'
  },
  {
    name: 'Devs',
    description: 'I Devs costruiscono il futuro. Scrivono codice che scala, che performa, che fa la differenza per milioni di utenti.'
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoWebwise} alt="Webwise" className="w-8 h-8" />
          <span className="text-black font-semibold text-lg">WEBWISE</span>
          <span className="text-gray-400 text-lg ml-1">/ Careers</span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="#roles" className="text-gray-600 hover:text-black text-sm transition-colors">Open Positions</a>
          <a href="#values" className="text-gray-600 hover:text-black text-sm transition-colors">Who we are</a>
          <a href="#mission" className="text-gray-600 hover:text-black text-sm transition-colors">Our Mission</a>
          <Link to="/" className="text-gray-600 hover:text-black text-sm transition-colors">Back to Home</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl lg:text-3xl text-black leading-relaxed font-light">
            È arrivato un momento di svolta. La cultura tech è caduta in un consumismo superficiale, privo di uno scopo più grande. Troppo pochi nella Silicon Valley si sono chiesti cosa dovrebbe essere costruito — e perché. <span className="font-semibold">Noi sì.</span> Abbiamo costruito Webwise per plasmare il futuro del digitale, non per giocare ai margini. In sala riunioni. Sul campo. Costruiamo con conseguenza.
          </p>
        </div>
      </section>

      {/* Who we are Section */}
      <section id="values" className="py-24 px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-16">Who we are.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, index) => (
              <div key={index} className="border-t border-gray-200 pt-8">
                <div className="text-2xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-black mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Roles Section */}
      <section className="py-24 px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left side */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-light text-black mb-8">Types of Roles</h2>
              <p className="text-gray-600 leading-relaxed mb-12">
                Webwise è costruito attorno a tre ruoli unici: Echos, Deltas e Devs. Sebbene ogni ruolo sia distinto, sono intenzionalmente progettati per sovrapporsi, permettendo ai team di perseguire risultati da prospettive complementari — e spesso contrastanti.
              </p>

              {/* Role tabs */}
              <div className="space-y-4">
                {roleTypes.map((role, index) => (
                  <div
                    key={index}
                    className={`border-b border-gray-200 pb-4 cursor-pointer ${index === 0 ? 'border-black' : ''}`}
                  >
                    <span className={`text-lg ${index === 0 ? 'text-black font-medium' : 'text-gray-400'}`}>
                      {role.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Description */}
            <div className="lg:pt-32">
              <span className="text-gray-400 text-sm uppercase tracking-wider">QUELLO CHE FANNO</span>
              <h3 className="text-2xl font-semibold text-black mt-2 mb-4">Deltas build.</h3>
              <p className="text-gray-600 leading-relaxed">
                Il loro compito è assicurare che le soluzioni che costruiamo funzionino davvero. In un mondo di demo e grandi promesse, un Delta offre risultati tangibili. Non è limitato a: assicurare che stiamo costruendo le soluzioni giuste basate sui feedback dei partner, offrendo infrastrutture dati scalabili, e progettando sistemi che funzionano nella pratica (non solo in teoria), mentre espandono le piattaforme di Webwise per risolvere nuovi problemi quando emergono. I Deltas sono all'avanguardia, capaci e tecnici.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="roles" className="py-24 px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-4 text-center">Open Roles</h2>

          {/* Apply button */}
          <div className="flex justify-center mb-16">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Apply Now <span>→</span>
            </a>
          </div>

          {/* Roles list */}
          <div className="space-y-4">
            {roles.map((role, index) => (
              <a
                key={index}
                href="#apply"
                className="block border border-gray-200 bg-white p-6 hover:border-gray-400 transition-colors group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-black group-hover:text-[#2EBAEB] transition-colors">{role.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{role.location}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">{role.type}</span>
                    <span className="text-black group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="py-24 px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-16">Our Mission</h2>

          {/* Video cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Webwise per le Startup', subtitle: 'Watch Now' },
              { title: 'Webwise e Digital Transformation', subtitle: 'Watch Now' },
              { title: 'Webwise per E-commerce', subtitle: 'Watch Now' },
              { title: 'Case Study: AI Integration', subtitle: 'Watch Now' },
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-video bg-gray-100 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-300"></div>
                </div>
                <span className="text-gray-400 text-xs uppercase tracking-wider">WEBWISE STORIES</span>
                <h3 className="text-sm font-medium text-black mt-1">{item.title}</h3>
                <a href="#" className="text-gray-500 text-sm hover:text-black transition-colors flex items-center gap-1 mt-2">
                  ↳ {item.subtitle}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our People Section */}
      <section className="py-24 px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-16">Our People</h2>

          {/* People cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Storie dal Team', name: 'Team Webwise' },
              { title: 'Da Junior a Senior', name: 'Growth Stories' },
              { title: 'Remote Working', name: 'Work Culture' },
              { title: 'Tech Talks', name: 'Knowledge Sharing' },
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-video bg-gray-100 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300"></div>
                </div>
                <span className="text-gray-400 text-xs uppercase tracking-wider">{item.name}</span>
                <h3 className="text-sm font-medium text-black mt-1">{item.title}</h3>
                <a href="#" className="text-gray-500 text-sm hover:text-black transition-colors flex items-center gap-1 mt-2">
                  ↳ Watch Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currently Recruiting Section */}
      <section className="py-24 px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-16">Currently Recruiting</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider">EARLY CAREERS</span>
              <h3 className="text-lg font-medium text-black mt-2 mb-2">Meritocracy Fellowship</h3>
              <a href="#" className="text-gray-500 text-sm hover:text-black transition-colors">↳ Read More</a>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider">HIRING</span>
              <h3 className="text-lg font-medium text-black mt-2 mb-2">All Open Roles</h3>
              <a href="#roles" className="text-gray-500 text-sm hover:text-black transition-colors">↳ Learn More</a>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider">EARLY CAREERS</span>
              <h3 className="text-lg font-medium text-black mt-2 mb-2">Internships</h3>
              <a href="#" className="text-gray-500 text-sm hover:text-black transition-colors">↳ Learn More</a>
            </div>
            <div>
              <span className="text-gray-400 text-xs uppercase tracking-wider">EARLY CAREERS</span>
              <h3 className="text-lg font-medium text-black mt-2 mb-2">Tech Fellowship</h3>
              <a href="#" className="text-gray-500 text-sm hover:text-black transition-colors">↳ Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoWebwise} alt="Webwise" className="w-8 h-8" />
                <span className="text-black font-semibold">WEBWISE</span>
              </div>
              <p className="text-gray-500 text-sm">All rights reserved.</p>
            </div>

            {/* Links grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">Company</span>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">Mission</a>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">Newsroom</a>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">Leadership</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">Careers</span>
                <a href="#roles" className="text-gray-600 text-sm hover:text-black transition-colors">Open Roles</a>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">Internships</a>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">Fellowship</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">Social</span>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">Instagram</a>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">YouTube</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">Legal</span>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">Terms of Use</a>
                <a href="#" className="text-gray-600 text-sm hover:text-black transition-colors">Cookies</a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-400 text-xs">© 2024 Webwise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
