import { Link } from 'react-router-dom'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

export default function ReservlyPage() {
  return (
    <div className="min-h-screen bg-[#c8c4b8]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoWebwise} alt="Webwise" className="w-8 h-8 invert" />
          <span className="text-white font-semibold text-lg">WEBWISE</span>
        </Link>
        <div className="flex items-center gap-8">
          <a href="#features" className="text-white/70 hover:text-white text-sm transition-colors">Features</a>
          <a href="#workflow" className="text-white/70 hover:text-white text-sm transition-colors">Workflow</a>
          <a href="#resources" className="text-white/70 hover:text-white text-sm transition-colors">Resources</a>
          <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">Back to Home</Link>
        </div>
      </nav>

      {/* Hero Section - Black background */}
      <section className="bg-black pt-32 pb-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-16">
            {/* Left side - Title */}
            <div>
              <span className="text-white/50 text-sm tracking-wider uppercase">RESERVLY</span>
            </div>

            {/* Right side - Description */}
            <div className="max-w-xl">
              <p className="text-white text-lg leading-relaxed mb-6">
                Reservly è una piattaforma di gestione prenotazioni alimentata da AI, progettata per accelerare e semplificare i processi di booking.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                Reservly integra migliaia di fonti dati per trasformare le informazioni in decisioni rapide, con scalabilità e velocità superiori alle capacità umane.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section - Beige background */}
      <section id="workflow" className="bg-[#c8c4b8] py-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-black text-2xl font-medium mb-12">Workflow</h2>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#2a2a2a] rounded-lg overflow-hidden">
              <div className="p-6">
                <span className="text-white text-4xl font-light">01</span>
              </div>
              <div className="h-48 bg-[#1a1a1a] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] opacity-80"></div>
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl font-medium mb-3">Analizza</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Reservly crea una comprensione in tempo reale delle disponibilità. Analizza automaticamente i dati da migliaia di fonti, tutto in un'unica interfaccia intuitiva.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#2a2a2a] rounded-lg overflow-hidden">
              <div className="p-6">
                <span className="text-white text-4xl font-light">02</span>
              </div>
              <div className="h-48 bg-[#1a1a1a] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] opacity-80"></div>
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl font-medium mb-3">Decide</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Reservly semplifica la complessità del processo decisionale presentando opzioni ottimali. Utilizza AI e machine learning per supportare decisioni rapide.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#2a2a2a] rounded-lg overflow-hidden">
              <div className="p-6">
                <span className="text-white text-4xl font-light">03</span>
              </div>
              <div className="h-48 bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col gap-1 opacity-30">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="h-2 bg-white/20" style={{ width: `${Math.random() * 100}%` }}></div>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl font-medium mb-3">Agisci</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Reservly trasforma le decisioni in azioni in pochi secondi, gestendo prenotazioni su più piattaforme, aree geografiche e ambienti comunicativi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big Text Section */}
      <section className="bg-[#c8c4b8] py-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-black font-medium leading-tight" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>
            ACCELERATE<br />
            BOOKING<br />
            PROCESSES
          </h2>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#c8c4b8] py-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-black text-2xl font-medium mb-12">Features</h2>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-white text-lg font-medium mb-4">Built for Scale</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Reservly può gestire migliaia di prenotazioni simultanee su diversi canali e sistemi globalmente.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-white text-lg font-medium mb-4">Multi-Platform</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Si integra e opera su web, mobile e sistemi legacy per fornire una gestione completa delle prenotazioni.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-white text-lg font-medium mb-4">Open & Extensible</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Integra sistemi di terze parti e autonomi per lavorare insieme in un unico motore di gestione.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-white text-lg font-medium mb-4">Intelligent & Secure</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Networking mesh intelligente garantisce trasporto sicuro e resiliente dei dati critici.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="bg-[#c8c4b8] py-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-black text-2xl font-medium mb-12">Reservation Management Platform</h2>

          {/* Dark preview box */}
          <div className="bg-[#1a1a1a] rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <div className="w-full h-full flex items-center justify-center relative">
              {/* Simulated grid/wave pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 5}
                      x2="100"
                      y2={i * 5 + Math.sin(i) * 10}
                      stroke="white"
                      strokeWidth="0.2"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section - Gray background */}
      <section id="resources" className="bg-[#888880] py-24 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-black text-2xl font-medium mb-12">Hands-on Resources and Support</h2>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left */}
            <div>
              <span className="text-black font-medium">Join</span>
            </div>

            {/* Middle */}
            <div>
              <h3 className="text-black text-lg font-medium underline mb-2">Reservly Developer</h3>
              <h3 className="text-black text-lg font-medium underline">Experience</h3>
            </div>

            {/* Right */}
            <div className="max-w-md">
              <p className="text-black/70 text-sm leading-relaxed mb-6">
                Richiedi di unirti alla Reservly Developer Experience per iniziare a lavorare con i servizi Reservly e muovere i primi passi verso lo sviluppo di applicazioni e integrazioni.
              </p>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-black/70 text-sm hover:text-black transition-colors underline">
                  Join the Reservly Developer Experience →
                </a>
                <a href="#" className="text-black/70 text-sm hover:text-black transition-colors underline">
                  Explore Reservly Docs →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={logoWebwise} alt="Webwise" className="w-10 h-10 invert" />
              <span className="text-white font-bold text-xl">WEBWISE</span>
            </div>

            {/* Links */}
            <div className="flex gap-16">
              {/* Company */}
              <div className="flex flex-col gap-3">
                <span className="text-white/50 text-xs uppercase tracking-wider">Company</span>
                <a href="#" className="text-white text-sm hover:text-white/70 transition-colors">Mission</a>
                <a href="#" className="text-white text-sm hover:text-white/70 transition-colors">Newsroom</a>
                <a href="#" className="text-white text-sm hover:text-white/70 transition-colors">Leadership</a>
              </div>

              {/* Work with us */}
              <div className="flex flex-col gap-3">
                <span className="text-white/50 text-xs uppercase tracking-wider">Work with us</span>
                <a href="#" className="text-white text-sm hover:text-white/70 transition-colors">Careers</a>
                <a href="#" className="text-white text-sm hover:text-white/70 transition-colors">Open Roles</a>
              </div>

              {/* Social */}
              <div className="flex flex-col gap-3">
                <span className="text-white/50 text-xs uppercase tracking-wider">Social</span>
                <a href="#" className="text-white text-sm hover:text-white/70 transition-colors">LinkedIn</a>
                <a href="#" className="text-white text-sm hover:text-white/70 transition-colors">Instagram</a>
                <a href="#" className="text-white text-sm hover:text-white/70 transition-colors">YouTube</a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-8 border-t border-white/10 gap-4">
            <div className="flex flex-wrap gap-4 text-white/50 text-xs">
              <span>COPYRIGHT © 2024 WEBWISE</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
            <div className="text-white/50 text-xs">
              contact@webwise.com
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
