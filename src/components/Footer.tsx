import { Link } from 'react-router-dom'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

export default function Footer() {
  return (
    <footer id="contatti" className="w-full bg-black relative overflow-hidden px-2 py-12 lg:py-0 lg:px-0 min-h-[auto] lg:min-h-[90vh]" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      {/* CSS responsive per padding */}
      <style>{`
        @media (min-width: 1024px) {
          #contatti { padding: 80px 50px 40px 50px !important; }
        }
      `}</style>
      {/* Contenitore cerchi - overflow-hidden (nascosto su mobile) */}
      <div
        className="hidden lg:block absolute pointer-events-none"
        style={{
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        {/* Cerchi concentrici animati */}
        <div
          className="absolute"
          style={{
            right: '-450px',
            top: '60%',
            transform: 'translateY(-50%)'
          }}
        >
          {/* Cerchio esterno - ruota in senso orario */}
          <div
            className="rounded-full"
            style={{
              width: '900px',
              height: '900px',
              border: '2px dashed rgba(255, 255, 255, 0.15)',
              animation: 'spin-clockwise 40s linear infinite'
            }}
          />
          {/* Cerchio interno - ruota in senso antiorario */}
          <div
            className="rounded-full"
            style={{
              width: '600px',
              height: '600px',
              border: '2px dashed rgba(255, 255, 255, 0.15)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'spin-counter 30s linear infinite'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
      {/* Contenuto principale - flex tra titolo e colonne */}
      {/* Su mobile: tutto centrato */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-row lg:justify-between relative" style={{ zIndex: 2 }}>
        {/* Colonna sinistra - Titolo ENORME */}
        <div className="flex flex-col items-center lg:items-start" style={{ maxWidth: '100%' }}>
          <h2 className="text-white font-extralight tracking-tight leading-none text-[32px] lg:text-[clamp(60px,8vw,140px)]">
            HOW ABOUT
          </h2>
          <h2 className="text-white font-extralight tracking-tight leading-none text-[32px] lg:text-[clamp(60px,8vw,140px)]">
            WE DO A THING
          </h2>
          {/* Su mobile: OR TWO, senza bottone inline */}
          <h2 className="text-white font-extralight tracking-tight leading-none text-[32px] lg:hidden">
            OR TWO,
          </h2>
          {/* Su desktop: OR TWO, con bottone inline */}
          <div className="hidden lg:flex lg:flex-row lg:items-end gap-8" style={{ marginTop: '-5px' }}>
            <h2 className="text-white font-extralight tracking-tight leading-none lg:text-[clamp(60px,8vw,140px)]">
              OR TWO,
            </h2>
            <a
              href="#contatti"
              className="inline-flex items-center justify-center border border-white/30 hover:border-[#2EBAEB] hover:text-[#2EBAEB] text-white font-normal rounded-full transition-colors lg:mb-4 w-fit text-[15px] px-10 py-[18px]"
              style={{ gap: '10px', whiteSpace: 'nowrap' }}
            >
              GET IN TOUCH <span>→</span>
            </a>
          </div>
          <h2 className="text-white font-extralight tracking-tight leading-none text-[32px] lg:text-[clamp(60px,8vw,140px)]">
            TO+GETHER
          </h2>
          {/* Su mobile: bottone sotto le scritte */}
          <a
            href="#contatti"
            className="lg:hidden inline-flex items-center justify-center border border-white/30 hover:border-[#2EBAEB] hover:text-[#2EBAEB] text-white font-normal rounded-full transition-colors w-fit text-xs px-4 py-2 mt-6"
            style={{ gap: '10px', whiteSpace: 'nowrap' }}
          >
            GET IN TOUCH <span>→</span>
          </a>
        </div>

        {/* Colonna destra - 3 colonne di link */}
        {/* Su mobile: SITEMAP e CONNECT affiancate con spazio, SEDE sotto centrata */}
        <div className="flex flex-col lg:flex-row lg:justify-start gap-8 lg:gap-16 pt-8 lg:pt-4 w-full lg:w-auto">
          {/* SITEMAP e CONNECT affiancate su mobile */}
          <div className="flex justify-between px-8 lg:px-0 lg:gap-16">
            {/* SITEMAP */}
            <div className="flex flex-col items-center lg:items-start gap-3 lg:gap-5">
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
            <div className="flex flex-col items-center lg:items-start gap-3 lg:gap-5">
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
          </div>

          {/* SEDE - centrata sotto su mobile */}
          <div className="flex flex-col items-center lg:items-start gap-3 lg:gap-5">
            <span className="text-gray-500 text-xs font-medium tracking-wider mb-1">SEDE</span>
            <span className="text-white text-sm">DARFO BOARIO TERME</span>
          </div>
        </div>
      </div>

      {/* Sezione inferiore - PRIVACY/CAREERS e Logo */}
      {/* Su mobile: tutto centrato in colonna */}
      <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 flex flex-col items-center lg:items-start lg:flex-row justify-between lg:items-end mt-12 lg:mt-0 px-0 lg:px-[50px] pb-0 lg:pb-[40px]" style={{ zIndex: 2 }}>
        {/* PRIVACY, COOKIE e CAREERS */}
        <div className="flex items-center justify-center gap-4 mb-6 lg:mb-0">
          <div className="w-2 h-2 rounded-full bg-[#2EBAEB]"></div>
          <Link to="/privacy-policy" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
            PRIVACY
          </Link>
          <div className="w-4 lg:w-8"></div>
          <Link to="/cookie-policy" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
            COOKIE
          </Link>
          <div className="w-4 lg:w-8"></div>
          <Link to="/careers" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
            CAREERS
          </Link>
        </div>

        {/* Logo WEBWISE grande */}
        <div className="flex items-center justify-center gap-3 lg:gap-5">
          <img
            src={logoWebwise}
            alt="Webwise Logo"
            title="Webwise"
            width={80}
            height={80}
            loading="lazy"
            className="invert w-[40px] h-[40px] lg:w-[80px] lg:h-[80px]"
          />
          <span className="text-white font-bold text-[32px] lg:text-[70px]" style={{ letterSpacing: '-0.02em' }}>WEBWISE</span>
        </div>
      </div>
    </footer>
  )
}
