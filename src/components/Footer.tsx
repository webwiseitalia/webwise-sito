import { Link } from 'react-router-dom'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

export default function Footer() {
  return (
    <footer className="w-full bg-[#1c1c1c] min-h-screen relative" style={{ padding: '100px 60px 80px 60px' }}>
      {/* Contenuto principale */}
      <div className="flex justify-between">
        {/* Colonna sinistra - Titolo grande */}
        <div className="flex flex-col" style={{ gap: '0px' }}>
          <div className="text-white font-semibold tracking-tight" style={{ fontSize: '110px', lineHeight: '1.05' }}>
            READY TO
          </div>

          <div className="flex items-center" style={{ gap: '40px' }}>
            <span className="text-white font-semibold tracking-tight" style={{ fontSize: '110px', lineHeight: '1.05' }}>
              WORK
            </span>
            <a
              href="#contatti"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-black font-medium rounded-full transition-colors"
              style={{ padding: '24px 56px', fontSize: '18px' }}
            >
              GET IN TOUCH
            </a>
          </div>

          <div className="text-white font-semibold tracking-tight" style={{ fontSize: '110px', lineHeight: '1.05' }}>
            SMARTER
          </div>

          <div className="text-white font-semibold tracking-tight" style={{ fontSize: '110px', lineHeight: '1.05' }}>
            TOGETHER
          </div>
        </div>

        {/* Colonna destra - 3 colonne di link allineate in alto */}
        <div className="flex" style={{ gap: '80px', paddingTop: '20px' }}>
          {/* SITEMAP */}
          <div className="flex flex-col" style={{ gap: '24px' }}>
            <span className="text-gray-500 text-sm font-medium tracking-wider">SITEMAP</span>
            <nav className="flex flex-col" style={{ gap: '12px' }}>
              <a href="#" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                HOME <span>→</span>
              </a>
              <a href="#" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                ABOUT US <span>→</span>
              </a>
              <a href="#portfolio" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                WORK <span>→</span>
              </a>
              <a href="#servizi" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                SERVICES <span>→</span>
              </a>
              <a href="#contatti" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                CONTACT <span>→</span>
              </a>
            </nav>
          </div>

          {/* CONNECT */}
          <div className="flex flex-col" style={{ gap: '24px' }}>
            <span className="text-gray-500 text-sm font-medium tracking-wider">CONNECT</span>
            <nav className="flex flex-col" style={{ gap: '12px' }}>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                TWITTER <span>↗</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                AWWWARDS <span>↗</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                FWA <span>↗</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                INSTAGRAM <span>↗</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-gray-300 transition-colors flex items-center gap-2 underline underline-offset-4">
                LINKEDIN <span>↗</span>
              </a>
            </nav>
          </div>

          {/* OFFICES */}
          <div className="flex flex-col" style={{ gap: '24px' }}>
            <span className="text-gray-500 text-sm font-medium tracking-wider">OFFICES</span>
            <div className="flex flex-col" style={{ gap: '12px' }}>
              <span className="text-white text-sm">LONDON</span>
              <span className="text-white text-sm">GLASGOW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione inferiore - posizione assoluta */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end" style={{ padding: '0 60px 80px 60px' }}>
        {/* PRIVACY e CAREERS a sinistra */}
        <div className="flex" style={{ gap: '80px' }}>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2">
            PRIVACY <span>→</span>
          </a>
          <Link to="/careers" className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2">
            CAREERS <span>→</span>
          </Link>
        </div>

        {/* Logo WEBWISE a destra */}
        <div className="flex items-center" style={{ gap: '16px' }}>
          <img
            src={logoWebwise}
            alt="Webwise Logo"
            className="invert"
            style={{ width: '80px', height: '80px' }}
          />
          <span className="text-white font-bold" style={{ fontSize: '56px', letterSpacing: '-0.02em' }}>WEBWISE</span>
        </div>
      </div>
    </footer>
  )
}
