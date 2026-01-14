import { Link } from 'react-router-dom'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

export default function Footer() {
  return (
    <footer className="w-full bg-black relative px-4 py-12 lg:px-[50px] lg:py-20 min-h-[60vh] lg:min-h-[90vh]">
      {/* Contenitore cerchi - nascosto su mobile */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          right: 0,
          top: '-50%',
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

      {/* Contenuto principale */}
      <div className="flex flex-col lg:flex-row lg:justify-between relative" style={{ zIndex: 2 }}>
        {/* Colonna sinistra - Titolo */}
        <div className="flex flex-col mb-12 lg:mb-0" style={{ maxWidth: '100%' }}>
          <h2 className="text-white font-extralight tracking-tight leading-none text-[32px] sm:text-[48px] lg:text-[clamp(60px,8vw,140px)]">
            HOW ABOUT
          </h2>
          <h2 className="text-white font-extralight tracking-tight leading-none text-[32px] sm:text-[48px] lg:text-[clamp(60px,8vw,140px)]">
            WE DO A THING
          </h2>
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-8" style={{ marginTop: '-5px' }}>
            <h2 className="text-white font-extralight tracking-tight leading-none text-[32px] sm:text-[48px] lg:text-[clamp(60px,8vw,140px)]">
              OR TWO,
            </h2>
            <a
              href="#contatti"
              className="inline-flex items-center justify-center border border-white/30 hover:border-[#2EBAEB] hover:text-[#2EBAEB] text-white font-normal rounded-full transition-colors w-fit px-6 py-3 lg:px-10 lg:py-[18px] text-sm lg:text-[15px] gap-2 lg:mb-4"
            >
              GET IN TOUCH <span>→</span>
            </a>
          </div>
          <h2 className="text-white font-extralight tracking-tight leading-none text-[32px] sm:text-[48px] lg:text-[clamp(60px,8vw,140px)]">
            TO+GETHER
          </h2>
        </div>

        {/* Colonna destra - Link - nascosta su mobile, mostrata sotto su tablet */}
        <div className="flex flex-wrap lg:flex-nowrap gap-8 lg:gap-16 pt-4">
          {/* SITEMAP */}
          <div className="flex flex-col gap-3 lg:gap-5">
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
          <div className="flex flex-col gap-3 lg:gap-5">
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
          <div className="flex flex-col gap-3 lg:gap-5">
            <span className="text-gray-500 text-xs font-medium tracking-wider mb-1">SEDE</span>
            <span className="text-white text-sm">DARFO BOARIO TERME</span>
          </div>
        </div>
      </div>

      {/* Sezione inferiore */}
      <div className="mt-12 lg:mt-0 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0 lg:px-[50px] lg:pb-10" style={{ zIndex: 2 }}>
        {/* PRIVACY e CAREERS */}
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#2EBAEB]"></div>
          <a href="#" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
            PRIVACY
          </a>
          <div className="w-8 lg:w-16"></div>
          <Link to="/careers" className="text-white text-sm hover:text-[#2EBAEB] transition-colors">
            CAREERS
          </Link>
        </div>

        {/* Logo WEBWISE */}
        <div className="flex items-center gap-3 lg:gap-5">
          <img
            src={logoWebwise}
            alt="Webwise Logo"
            className="invert w-12 h-12 lg:w-20 lg:h-20"
          />
          <span className="text-white font-bold text-3xl lg:text-[70px]" style={{ letterSpacing: '-0.02em' }}>WEBWISE</span>
        </div>
      </div>
    </footer>
  )
}
