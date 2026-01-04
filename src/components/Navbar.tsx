import logoWebwise from '../assets/logo+scritta-webwise-off.webp'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent w-full">
      <div className="w-full px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src={logoWebwise}
            alt="Webwise"
            className="h-8 w-auto"
          />
        </a>

        {/* Menu centrale */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            Home
          </a>
          <a href="#servizi" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            Servizi
          </a>
          <a href="#progetti" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            Progetti
          </a>
          <a href="#chi-siamo" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            Chi Siamo
          </a>
          <a href="#contatti" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            Contatti
          </a>
        </div>

        {/* Contattaci con freccia */}
        <a
          href="#contattaci"
          className="text-white flex items-center gap-1 text-sm font-medium hover:text-white/80 transition-colors"
        >
          Contattaci
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </a>
      </div>
    </nav>
  )
}
