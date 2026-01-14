import { Link } from 'react-router-dom'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

export default function Footer() {
  return (
    <footer className="w-full bg-black min-h-screen relative" style={{ padding: '80px 50px 40px 50px' }}>
      {/* Contenuto principale - flex tra titolo e colonne */}
      <div className="flex justify-between">
        {/* Colonna sinistra - Titolo ENORME */}
        <div className="flex flex-col" style={{ maxWidth: '65%' }}>
          <h2 className="text-white font-extralight tracking-tight leading-none" style={{ fontSize: 'clamp(60px, 8vw, 140px)' }}>
            HOW ABOUT
          </h2>
          <h2 className="text-white font-extralight tracking-tight leading-none" style={{ fontSize: 'clamp(60px, 8vw, 140px)' }}>
            WE DO A THING
          </h2>
          <div className="flex items-end gap-8" style={{ marginTop: '-10px' }}>
            <h2 className="text-white font-extralight tracking-tight leading-none" style={{ fontSize: 'clamp(60px, 8vw, 140px)' }}>
              OR TWO,
            </h2>
            <a
              href="#contatti"
              className="inline-flex items-center justify-center border border-white/30 hover:border-[#2EBAEB] hover:text-[#2EBAEB] text-white font-normal rounded-full transition-colors mb-4"
              style={{ padding: '18px 40px', fontSize: '15px', gap: '10px', whiteSpace: 'nowrap' }}
            >
              GET IN TOUCH <span>→</span>
            </a>
          </div>
          <h2 className="text-white font-extralight tracking-tight leading-none" style={{ fontSize: 'clamp(60px, 8vw, 140px)' }}>
            TO+GETHER
          </h2>
        </div>

        {/* Colonna destra - 3 colonne di link */}
        <div className="flex gap-16 pt-4">
          {/* SITEMAP */}
          <div className="flex flex-col gap-5">
            <span className="text-gray-500 text-xs font-medium tracking-wider mb-1">SITEMAP</span>
            <a href="#hero" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
              HOME
            </a>
            <a href="#servizi" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
              SERVIZI
            </a>
            <a href="#portfolio" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
              PORTFOLIO
            </a>
            <a href="#contatti" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
              CONTATTI
            </a>
          </div>

          {/* CONNECT */}
          <div className="flex flex-col gap-5">
            <span className="text-gray-500 text-xs font-medium tracking-wider mb-1">CONNECT</span>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
              INSTAGRAM
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
              FACEBOOK
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
              LINKEDIN
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
              TWITTER
            </a>
          </div>

          {/* OFFICES */}
          <div className="flex flex-col gap-5">
            <span className="text-gray-500 text-xs font-medium tracking-wider mb-1">SEDE</span>
            <span className="text-white text-sm">DARFO BOARIO TERME</span>
          </div>
        </div>
      </div>

      {/* Sezione inferiore - PRIVACY/CAREERS a sinistra, Logo grande a destra */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end" style={{ padding: '0 50px 40px 50px' }}>
        {/* PRIVACY e CAREERS */}
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#2EBAEB]"></div>
          <a href="#" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
            PRIVACY
          </a>
          <div className="w-16"></div>
          <Link to="/careers" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
            CAREERS
          </Link>
        </div>

        {/* Logo WEBWISE grande */}
        <div className="flex items-center gap-5">
          <img
            src={logoWebwise}
            alt="Webwise Logo"
            className="invert"
            style={{ width: '80px', height: '80px' }}
          />
          <span className="text-white font-bold" style={{ fontSize: '70px', letterSpacing: '-0.02em' }}>WEBWISE</span>
        </div>
      </div>
    </footer>
  )
}
