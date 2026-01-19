import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/services'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

gsap.registerPlugin(ScrollTrigger)

export default function ServiziPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  const toggleService = (serviceId: string) => {
    setExpandedService(prev => prev === serviceId ? null : serviceId)
  }

  // Animazioni GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelector('.hero-text'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          }
        )
      }

      // Services animation on scroll
      if (servicesRef.current) {
        const serviceItems = servicesRef.current.querySelectorAll('.service-row')
        serviceItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: index * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
              }
            }
          )
        })
      }
    })

    return () => ctx.revert()
  }, [])

  // Icone SVG per ogni servizio
  const getServiceIcon = (serviceId: string) => {
    const icons: Record<string, JSX.Element> = {
      'seo': (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      ),
      'siti-web': (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M3 9h18"></path>
          <path d="M9 21V9"></path>
        </svg>
      ),
      'ecommerce': (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
      ),
      'social': (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
      'app': (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="12" x="2" y="6" rx="1"></rect>
          <rect width="7" height="12" x="15" y="6" rx="1"></rect>
          <path d="M9 6h6"></path>
          <path d="M9 18h6"></path>
          <path d="M9 12h6"></path>
        </svg>
      ),
      'automazioni': (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8"></path>
          <rect width="16" height="12" x="4" y="8" rx="2"></rect>
          <path d="M2 14h2"></path>
          <path d="M20 14h2"></path>
          <path d="M15 13v2"></path>
          <path d="M9 13v2"></path>
        </svg>
      ),
      'ads': (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      ),
      'reservly': (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
          <path d="M9 16h6"></path>
        </svg>
      )
    }
    return icons[serviceId] || icons['seo']
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Callout Text Grande */}
      <section ref={heroRef} className="w-full bg-black pt-32 lg:pt-40 border-b border-white/20">
        <div className="w-full px-10 lg:px-24 py-16 lg:py-24">
          <p className="hero-text text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-white font-semibold text-center">
            Progettiamo soluzioni digitali su misura,{' '}
            <span className="text-[#2EBAEB]">AI-driven</span> per aziende
            e professionisti che vogliono crescere online.
          </p>
        </div>
      </section>

      {/* Lista Servizi - Stile Software Section */}
      <section ref={servicesRef} className="w-full bg-black">
        {services.map((service, index) => (
          <div key={service.id}>
            {/* Riga principale cliccabile */}
            <div
              onClick={() => toggleService(service.id)}
              className="service-row group block border-t border-white/20 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-full px-6 lg:px-24 py-8 lg:py-10 grid grid-cols-12 items-center gap-4">
                {/* Colonna 1: Descrizione + Numero */}
                <div className="col-span-12 lg:col-span-3 border-l-2 border-white/30 pl-4">
                  <p className="text-white/60 text-sm leading-relaxed mb-3 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <span className="text-white/30 text-xs font-mono">/{index + 1}.0</span>
                </div>

                {/* Colonna 2: Icona */}
                <div className="hidden lg:flex col-span-2 justify-center">
                  <div className="w-16 h-16 bg-[#2EBAEB] rounded-lg flex items-center justify-center text-white">
                    {getServiceIcon(service.id)}
                  </div>
                </div>

                {/* Colonna 3: Area hover (rettangolo cyan) */}
                <div className="hidden lg:flex col-span-3 justify-start items-center pl-4 pr-12">
                  <div className="w-full aspect-video bg-[#2EBAEB] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
                </div>

                {/* Colonna 4: Nome Grande */}
                <div className="col-span-12 lg:col-span-4 flex justify-end items-center gap-4">
                  <h3
                    className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight group-hover:translate-x-2 group-hover:text-[#2EBAEB] transition-all duration-300"
                    style={{ fontFamily: 'Moderniz, sans-serif' }}
                  >
                    {service.name.toUpperCase()}
                  </h3>

                  {/* Freccia expand */}
                  <span className={`text-white/40 transition-transform duration-300 ${expandedService === service.id ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Contenuto espandibile */}
            <div
              className={`overflow-hidden transition-all duration-500 bg-white/[0.02] ${
                expandedService === service.id
                  ? 'max-h-[800px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="w-full px-6 lg:px-24 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  {/* Colonna sinistra - Descrizione lunga */}
                  <div>
                    <span className="text-white/40 text-xs tracking-wider block mb-4">DESCRIZIONE</span>
                    <p className="text-white text-lg lg:text-xl font-light leading-relaxed mb-8">
                      {service.longDescription}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {service.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-white text-sm border border-white/20 rounded-full px-4 py-1.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      to="/#contatti"
                      className="inline-flex items-center gap-3 border border-white/30 hover:border-[#2EBAEB] hover:text-[#2EBAEB] text-white rounded-full transition-colors px-6 py-3 text-sm"
                    >
                      RICHIEDI PREVENTIVO <span>→</span>
                    </Link>
                  </div>

                  {/* Colonna destra - Accordion */}
                  <div>
                    <span className="text-white/40 text-xs tracking-wider block mb-4">APPROFONDIMENTI</span>
                    <div className="border-t border-white/10">
                      {service.accordionItems.map((item, accordionIndex) => (
                        <div
                          key={accordionIndex}
                          className="border-b border-white/10 py-4"
                        >
                          <h4 className="text-white/80 font-light mb-2">{item.title}</h4>
                          <p className="text-white/50 text-sm leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bordo finale */}
        <div className="border-t border-white/20" />
      </section>

      {/* CTA Section - Stile grigio chiaro */}
      <div className="w-full relative py-24 lg:py-32 bg-gray-200 overflow-hidden z-10">
        {/* Cerchio sfumato cyan in alto a destra */}
        <div
          className="absolute -top-[300px] -right-[150px] w-[500px] h-[500px] rounded-full opacity-35 z-[1]"
          style={{
            background: '#2EBAEB',
            filter: 'blur(200px)'
          }}
        />

        {/* Cerchio sfumato cyan in basso a sinistra */}
        <div
          className="absolute -bottom-[150px] left-0 w-[500px] h-[500px] rounded-full opacity-25 z-[1]"
          style={{
            background: '#2EBAEB',
            filter: 'blur(200px)'
          }}
        />

        {/* Contenuto */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-4 max-w-2xl ml-auto text-right">
            <span className="inline-block text-xs px-3 py-1 rounded-full border border-[#2EBAEB]/50 bg-[#2EBAEB]/10 text-[#2EBAEB] w-fit ml-auto">
              SCRIVICI
            </span>

            <h4 className="text-3xl lg:text-4xl uppercase font-bold tracking-tight text-gray-900 leading-tight">
              Vuoi lavorare con noi?{' '}
              <span className="text-[#2EBAEB]">Raccontaci il tuo progetto</span>
            </h4>

            <p className="text-gray-600 leading-relaxed max-w-xl ml-auto">
              Ogni percorso inizia con una chiamata conoscitiva, in cui potrai raccontarci quali sono le tue esigenze e ricevere i primi consigli sulla loro realizzazione.
            </p>

            <Link
              to="/#contatti"
              className="mt-2 border border-gray-400/50 pl-4 pr-1.5 py-1.5 rounded-full bg-gray-100 flex items-center gap-3 group hover:-rotate-2 transition-all w-fit ml-auto"
            >
              <span className="text-gray-900 font-medium">Contattaci</span>
              <div className="relative flex p-2 overflow-hidden text-white bg-black rounded-full group-hover:bg-[#2EBAEB] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all translate-y-0 group-hover:-translate-y-[200%]"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute transition-all translate-y-[200%] group-hover:translate-y-0"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Asterisco rotante */}
        <svg
          className="absolute z-[1] -bottom-[100px] -left-[100px] lg:-bottom-[150px] lg:-left-[150px] w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] animate-spin-slow opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 72 72"
          fill="none"
          style={{ animationDuration: '20s' }}
        >
          <path
            d="M40 0H32V26.3432L13.3726 7.71573L7.71573 13.3726L26.3431 32H0V40H26.3432L7.71573 58.6274L13.3726 64.2843L32 45.6569V72H40V45.6569L58.6274 64.2843L64.2843 58.6274L45.6568 40H72V32H45.6569L64.2843 13.3726L58.6274 7.71573L40 26.3432V0Z"
            fill="#2EBAEB"
          />
        </svg>

        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}</style>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
