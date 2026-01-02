import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Layout principale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Colonna sinistra - Titolo con layout speciale */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Riga 1: READY TO */}
            <div className="text-white font-semibold tracking-tight" style={{ fontSize: 'clamp(42px, 6vw, 85px)', lineHeight: '1.05' }}>
              READY TO
            </div>

            {/* Riga 2: WORK + bottone */}
            <div className="flex items-center gap-6 lg:gap-8 flex-wrap">
              <span className="text-white font-semibold tracking-tight" style={{ fontSize: 'clamp(42px, 6vw, 85px)', lineHeight: '1.05' }}>
                WORK
              </span>
              <a
                href="#contatti"
                className="inline-flex items-center justify-center px-10 lg:px-12 py-4 lg:py-5 bg-white hover:bg-gray-100 text-black font-medium text-base lg:text-lg rounded-full transition-colors"
              >
                GET IN TOUCH
              </a>
            </div>

            {/* Riga 3: SMARTER */}
            <div className="text-white font-semibold tracking-tight" style={{ fontSize: 'clamp(42px, 6vw, 85px)', lineHeight: '1.05' }}>
              SMARTER
            </div>

            {/* Riga 4: TOGETHER */}
            <div className="text-white font-semibold tracking-tight" style={{ fontSize: 'clamp(42px, 6vw, 85px)', lineHeight: '1.05' }}>
              TOGETHER
            </div>
          </div>

          {/* Colonna destra - Link */}
          <div className="lg:col-span-5 flex flex-wrap gap-10 lg:gap-12 lg:justify-end lg:pt-4">
            {/* SITEMAP */}
            <div className="flex flex-col gap-4">
              <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">Sitemap</span>
              <nav className="flex flex-col gap-2.5">
                <a href="#" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  HOME <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="#" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  ABOUT US <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="#portfolio" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  WORK <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="#servizi" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  SERVICES <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="#contatti" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  CONTACT <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </nav>
            </div>

            {/* CONNECT */}
            <div className="flex flex-col gap-4">
              <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">Connect</span>
              <nav className="flex flex-col gap-2.5">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  TWITTER <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  AWWWARDS <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  FWA <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  INSTAGRAM <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-1.5 group">
                  LINKEDIN <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              </nav>
            </div>

            {/* OFFICES */}
            <div className="flex flex-col gap-4">
              <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">Offices</span>
              <div className="flex flex-col gap-2.5">
                <span className="text-white text-sm">LONDON</span>
                <span className="text-white text-sm">GLASGOW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sezione inferiore - Privacy, Careers e Logo */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mt-16 lg:mt-24 pt-8 border-t border-white/10 gap-8">
          {/* Link Privacy e Careers */}
          <div className="flex gap-8">
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
              PRIVACY <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
              CAREERS <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>
          </div>

          {/* Logo WEBWISE grande */}
          <div className="flex items-center gap-4">
            <img
              src={logoWebwise}
              alt="Webwise Logo"
              className="w-12 h-12 lg:w-14 lg:h-14 invert opacity-90"
            />
            <span className="text-white font-bold text-3xl lg:text-4xl tracking-tight">WEBWISE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
