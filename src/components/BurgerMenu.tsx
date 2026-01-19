import { useState, useCallback, useEffect } from 'react'
import logoWebwise from '../assets/logo+scritta-webwise-off.webp'

interface BurgerMenuProps {
  isVisible: boolean // Usato solo su desktop
}

export default function BurgerMenu({ isVisible }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })

  // Detect mobile on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Blocca scroll quando menu è aperto su mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, isMobile])

  const toggleMenu = useCallback(() => {
    if (isMobile) {
      // Mobile: toggle semplice
      setIsOpen(prev => !prev)
    } else {
      // Desktop: con animazione di chiusura
      if (isOpen && !isClosing) {
        setIsClosing(true)
        setTimeout(() => {
          setIsOpen(false)
          setIsClosing(false)
        }, 450)
      } else if (!isOpen) {
        setIsOpen(true)
      }
    }
  }, [isMobile, isOpen, isClosing])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Stati per desktop
  const showOpen = isOpen && !isClosing
  const burgerIsDown = isOpen

  // Funzione stile per animazioni desktop
  const getElementStyle = (openDelay: number, closeDelay: number) => {
    if (isClosing) {
      return {
        opacity: 0,
        transform: 'scale(0.5) translateX(100px)',
        transition: `all 0.4s ease-in ${closeDelay}s`,
      }
    }
    return {
      opacity: showOpen ? 1 : 0,
      transform: showOpen ? 'scale(1) translateX(0)' : 'scale(0.5) translateX(100px)',
      transition: `all 0.4s ease-out ${openDelay}s`,
    }
  }

  return (
    <>
      {/* Burger Button - sempre visibile su mobile, dipende da isVisible su desktop */}
      <button
        onClick={toggleMenu}
        className="fixed right-4 md:right-8 z-[70] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        style={{
          top: isMobile ? '12px' : (burgerIsDown ? '60px' : '14px'),
          opacity: isMobile ? 1 : (isVisible ? 1 : 0),
          pointerEvents: isMobile ? 'auto' : (isVisible ? 'auto' : 'none'),
          transition: 'top 0.3s ease-out, opacity 0.3s ease-out'
        }}
        aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            (isMobile ? isOpen : showOpen) ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            (isMobile ? isOpen : showOpen) ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            (isMobile ? isOpen : showOpen) ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* ==================== MOBILE: Menu Fullscreen ==================== */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-[60] bg-black transition-all duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <a
              href="/#hero"
              onClick={closeMenu}
              className="text-white text-3xl font-light hover:text-[#2EBAEB] transition-colors"
            >
              Home
            </a>
            <a
              href="/servizi"
              onClick={closeMenu}
              className="text-white text-3xl font-light hover:text-[#2EBAEB] transition-colors"
            >
              Servizi
            </a>
            <a
              href="/#portfolio"
              onClick={closeMenu}
              className="text-white text-3xl font-light hover:text-[#2EBAEB] transition-colors"
            >
              Progetti
            </a>
            <a
              href="/#software"
              onClick={closeMenu}
              className="text-white text-3xl font-light hover:text-[#2EBAEB] transition-colors"
            >
              Software
            </a>
            <a
              href="/#contatti"
              onClick={closeMenu}
              className="text-white text-3xl font-light hover:text-[#2EBAEB] transition-colors"
            >
              Contatti
            </a>

            {/* Bottone CTA */}
            <a
              href="/#contatti"
              onClick={closeMenu}
              className="mt-8 px-8 py-3 border border-white/30 rounded-full text-white text-lg font-medium hover:border-[#2EBAEB] hover:text-[#2EBAEB] transition-colors flex items-center gap-2"
            >
              Contattaci
              <svg
                className="w-5 h-5"
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
        </div>
      )}

      {/* ==================== DESKTOP: Overlay + Navbar ==================== */}
      {!isMobile && (
        <>
          {/* Overlay per chiudere */}
          <div
            className={`fixed inset-0 z-[64] transition-opacity duration-300 ${
              isOpen && !isClosing ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleMenu}
          />

          {/* Navbar Desktop con Glassmorphism */}
          <nav
            className={`fixed top-0 left-0 right-0 z-[65] transition-all duration-400 ${
              isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: isOpen ? 'blur(8px)' : 'blur(0px)',
              WebkitBackdropFilter: isOpen ? 'blur(8px)' : 'blur(0px)',
              opacity: isClosing ? 0 : (isOpen ? 1 : 0),
              transition: isClosing ? 'opacity 0.4s ease-in 0.05s' : 'opacity 0.3s ease-out',
            }}
          >
            <div className="w-full px-8 py-3 flex items-center justify-between">
              <a
                href="/"
                className="flex-shrink-0"
                style={getElementStyle(0.1, 0.35)}
                onClick={toggleMenu}
              >
                <img
                  src={logoWebwise}
                  alt="Webwise"
                  title="Webwise - Home"
                  width={120}
                  height={32}
                  loading="lazy"
                  className="h-8 w-auto"
                />
              </a>

              <div className="flex items-center gap-8">
                <a
                  href="/#hero"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                  style={getElementStyle(0.15, 0.3)}
                  onClick={toggleMenu}
                >
                  Home
                </a>
                <a
                  href="/servizi"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                  style={getElementStyle(0.2, 0.25)}
                  onClick={toggleMenu}
                >
                  Servizi
                </a>
                <a
                  href="/#portfolio"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                  style={getElementStyle(0.25, 0.2)}
                  onClick={toggleMenu}
                >
                  Progetti
                </a>
                <a
                  href="/#software"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                  style={getElementStyle(0.3, 0.15)}
                  onClick={toggleMenu}
                >
                  Software
                </a>
                <a
                  href="/#contatti"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                  style={getElementStyle(0.35, 0.1)}
                  onClick={toggleMenu}
                >
                  Contatti
                </a>
              </div>

              <a
                href="/#contatti"
                className="text-white flex items-center gap-1 text-sm font-medium hover:text-white/80 transition-colors"
                style={getElementStyle(0.4, 0.05)}
                onClick={toggleMenu}
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
        </>
      )}
    </>
  )
}
