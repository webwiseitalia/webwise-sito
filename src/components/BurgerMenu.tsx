import { useState, useCallback, useEffect } from 'react'
import logoWebwise from '../assets/logo+scritta-webwise-off.webp'

interface BurgerMenuProps {
  isVisible: boolean
}

export default function BurgerMenu({ isVisible }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Chiudi immediatamente il menu quando il burger sta per scomparire (scroll verso hero)
  useEffect(() => {
    if (!isVisible && isOpen) {
      // Chiusura istantanea senza animazione
      setIsOpen(false)
      setIsClosing(false)
    }
  }, [isVisible, isOpen])

  const toggleMenu = useCallback(() => {
    if (isOpen && !isClosing) {
      // Inizia l'animazione di chiusura
      setIsClosing(true)
      // Dopo che l'animazione è completata, chiudi effettivamente
      setTimeout(() => {
        setIsOpen(false)
        setIsClosing(false)
      }, 450) // Durata animazione chiusura
    } else if (!isOpen) {
      setIsOpen(true)
    }
  }, [isOpen, isClosing])

  // Stato visivo: aperto se isOpen e non sta chiudendo
  const showOpen = isOpen && !isClosing

  // Il burger resta in basso durante la chiusura (isOpen è ancora true)
  // Sale solo quando isOpen diventa false
  const burgerIsDown = isOpen

  // Funzione per ottenere lo stile di un elemento con delay
  // Durante la chiusura, i delay sono invertiti (l'ultimo elemento chiude per primo)
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
      {/* Burger Button - si sposta sotto la navbar quando aperto */}
      <button
        onClick={toggleMenu}
        className="fixed right-8 z-[70] w-10 h-10 flex flex-col items-center justify-center gap-1.5 border-0 outline-none bg-transparent focus:outline-none focus:ring-0"
        style={{
          top: burgerIsDown ? '60px' : '14px', // Resta in basso durante la chiusura, sale solo dopo
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          transition: burgerIsDown
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
            showOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            showOpen ? 'opacity-0 scale-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            showOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Overlay trasparente per chiudere cliccando fuori */}
      <div
        className={`fixed inset-0 z-[64] transition-opacity duration-300 ${
          isOpen && !isClosing ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Navbar con Glassmorphism - solo sulla barra */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[65] transition-all duration-400 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: isOpen ? 'blur(8px)' : 'blur(0px)',
          WebkitBackdropFilter: isOpen ? 'blur(8px)' : 'blur(0px)',
          opacity: isClosing ? 0 : (isOpen ? 1 : 0),
          transition: isClosing ? 'opacity 0.4s ease-in 0.05s, backdrop-filter 0.4s ease-in' : 'opacity 0.3s ease-out, backdrop-filter 0.3s ease-out',
        }}
      >
          <div className="w-full px-8 py-3 flex items-center justify-between">
            {/* Logo - delay apertura: 0.1s, delay chiusura: 0.35s (ultimo a chiudersi) */}
            <a
              href="/"
              className="flex-shrink-0"
              style={getElementStyle(0.1, 0.35)}
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
              {/* Home - delay apertura: 0.15s, delay chiusura: 0.3s */}
              <a
                href="#home"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={getElementStyle(0.15, 0.3)}
                onClick={toggleMenu}
              >
                Home
              </a>
              {/* Servizi - delay apertura: 0.2s, delay chiusura: 0.25s */}
              <a
                href="#servizi"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={getElementStyle(0.2, 0.25)}
                onClick={toggleMenu}
              >
                Servizi
              </a>
              {/* Progetti - delay apertura: 0.25s, delay chiusura: 0.2s */}
              <a
                href="#progetti"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={getElementStyle(0.25, 0.2)}
                onClick={toggleMenu}
              >
                Progetti
              </a>
              {/* Chi Siamo - delay apertura: 0.3s, delay chiusura: 0.15s */}
              <a
                href="#chi-siamo"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={getElementStyle(0.3, 0.15)}
                onClick={toggleMenu}
              >
                Chi Siamo
              </a>
              {/* Contatti - delay apertura: 0.35s, delay chiusura: 0.1s */}
              <a
                href="#contatti"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                style={getElementStyle(0.35, 0.1)}
                onClick={toggleMenu}
              >
                Contatti
              </a>
            </div>

            {/* Contattaci con freccia - delay apertura: 0.4s, delay chiusura: 0.05s (primo a chiudersi) */}
            <a
              href="#contattaci"
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
  )
}
