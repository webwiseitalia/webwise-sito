import logoWebwise from '../assets/logo+scritta-webwise-off.webp'

interface NavbarProps {
  compressionProgress?: number // 0 = normale, 1 = compresso nel burger
}

export default function Navbar({ compressionProgress = 0 }: NavbarProps) {
  // Posizione finale del burger (in alto a destra)
  // right-8 = 32px, top-4 = 16px, burger è 40x40px quindi centro a ~52px da destra
  const burgerCenterX = typeof window !== 'undefined' ? window.innerWidth - 52 : 1000
  const burgerCenterY = 36 // centro verticale del burger

  // Calcola lo stile per ogni elemento in base al progress
  const getElementStyle = (index: number, totalElements: number) => {
    if (compressionProgress === 0) return {}

    // Tutti gli elementi convergono verso il burger
    const progress = compressionProgress

    // Scale: da 1 a 0.2
    const scale = 1 - (progress * 0.8)

    // Opacity: da 1 a 0 (scompare prima di arrivare)
    const opacity = 1 - (progress * 1.5) // Scompare a ~66% del progress

    return {
      transform: `scale(${Math.max(scale, 0.2)})`,
      opacity: Math.max(opacity, 0),
      transition: 'none',
    }
  }

  // Stile per il container - si comprime verso destra
  const containerStyle = {
    transform: compressionProgress > 0
      ? `translateX(${compressionProgress * 30}%)`
      : 'none',
    opacity: compressionProgress > 0.8 ? 0 : 1,
    transition: 'none',
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent w-full">
      <div
        className="w-full px-8 py-3 flex items-center justify-between"
        style={containerStyle}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0"
          style={getElementStyle(0, 7)}
        >
          <img
            src={logoWebwise}
            alt="Webwise"
            className="h-8 w-auto"
          />
        </a>

        {/* Menu centrale */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/#hero"
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            style={getElementStyle(1, 7)}
          >
            Home
          </a>
          <a
            href="/#servizi"
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            style={getElementStyle(2, 7)}
          >
            Servizi
          </a>
          <a
            href="/#portfolio"
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            style={getElementStyle(3, 7)}
          >
            Progetti
          </a>
          <a
            href="/#software"
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            style={getElementStyle(4, 7)}
          >
            Software
          </a>
          <a
            href="/#contatti"
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            style={getElementStyle(5, 7)}
          >
            Contatti
          </a>
        </div>

        {/* Contattaci con freccia */}
        <a
          href="/#contatti"
          className="text-white flex items-center gap-1 text-sm font-medium hover:text-white/80 transition-colors"
          style={getElementStyle(6, 7)}
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
