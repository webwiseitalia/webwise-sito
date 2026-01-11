import { useState } from 'react'
import logoWebwise from '../assets/logo+scritta-webwise-off.webp'

interface BurgerMenuProps {
  isVisible: boolean
}

export default function BurgerMenu({ isVisible }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Burger Button - si sposta sotto la navbar quando aperto */}
      <button
        onClick={toggleMenu}
        className="fixed right-8 z-[70] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        style={{
          top: isOpen ? '72px' : '16px', // Si sposta sotto la navbar (56px navbar + 16px margine)
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          transition: isOpen
            ? 'top 0.3s ease-out, opacity 0.3s ease-out'
            : isVisible
              ? 'top 0.3s ease-out, opacity 0.3s ease-out'
              : 'top 0.3s ease-out, opacity 0.1s ease-in'
        }}
        aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
      >
        {/* Tre linee del burger che si trasformano in X */}
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'opacity-0 scale-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Overlay trasparente per chiudere cliccando fuori */}
      <div
        className={`fixed inset-0 z-[64] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Navbar con Glassmorphism - solo sulla barra */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[65] transition-all duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
          <div className="w-full px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="flex-shrink-0"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'scale(1) translateX(0)' : 'scale(0.5) translateX(100px)',
                transition: 'all 0.4s ease-out 0.1s',
              }}
              onClick={toggleMenu}
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
                href="#home"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'scale(1) translateX(0)' : 'scale(0.5) translateX(100px)',
                  transition: 'all 0.4s ease-out 0.15s',
                }}
                onClick={toggleMenu}
              >
                Home
              </a>
              <a
                href="#servizi"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'scale(1) translateX(0)' : 'scale(0.5) translateX(100px)',
                  transition: 'all 0.4s ease-out 0.2s',
                }}
                onClick={toggleMenu}
              >
                Servizi
              </a>
              <a
                href="#progetti"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'scale(1) translateX(0)' : 'scale(0.5) translateX(100px)',
                  transition: 'all 0.4s ease-out 0.25s',
                }}
                onClick={toggleMenu}
              >
                Progetti
              </a>
              <a
                href="#chi-siamo"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'scale(1) translateX(0)' : 'scale(0.5) translateX(100px)',
                  transition: 'all 0.4s ease-out 0.3s',
                }}
                onClick={toggleMenu}
              >
                Chi Siamo
              </a>
              <a
                href="#contatti"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'scale(1) translateX(0)' : 'scale(0.5) translateX(100px)',
                  transition: 'all 0.4s ease-out 0.35s',
                }}
                onClick={toggleMenu}
              >
                Contatti
              </a>
            </div>

            {/* Contattaci con freccia */}
            <a
              href="#contattaci"
              className="text-white flex items-center gap-1 text-sm font-medium hover:text-white/80 transition-colors"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'scale(1) translateX(0)' : 'scale(0.5) translateX(100px)',
                transition: 'all 0.4s ease-out 0.4s',
              }}
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
  )
}
