import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/services'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BurgerMenu from '../components/BurgerMenu'

// Immagini servizi
import servizioSeo from '../assets/servizi/servizio-seo.webp'
import servizioSitiweb from '../assets/servizi/servizio-sitiweb.webp'
import servizioEcommerce from '../assets/servizi/servizio-ecommerce.webp'
import servizioSocial from '../assets/servizi/servizio-gestionisocial.webp'
import servizioApp from '../assets/servizi/servizio-appwebapp.webp'
import servizioAutomazioni from '../assets/servizi/servizio-automazioneai.webp'
import servizioAds from '../assets/servizi/servizio-ads.webp'
import servizioReservly from '../assets/servizi/servizio-reservly.webp'

gsap.registerPlugin(ScrollTrigger)

export default function ServiziPage() {
  const [openAccordions, setOpenAccordions] = useState<Record<string, number | null>>({})
  const [showBurger, setShowBurger] = useState(false)
  const [navbarCompression, setNavbarCompression] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (serviceId: string, index: number) => {
    setOpenAccordions(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === index ? null : index
    }))
  }

  // Logica scroll per navbar/burger
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 100

      if (scrollY > threshold) {
        setShowBurger(true)
        setNavbarCompression(Math.min((scrollY - threshold) / 100, 1))
      } else {
        setShowBurger(false)
        setNavbarCompression(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animazioni GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-animate'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out'
          }
        )
      }

      // Services animation on scroll
      if (servicesRef.current) {
        const serviceItems = servicesRef.current.querySelectorAll('.service-item')
        serviceItems.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      ),
      'siti-web': (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M3 9h18"></path>
          <path d="M9 21V9"></path>
        </svg>
      ),
      'ecommerce': (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
      ),
      'social': (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
      'app': (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="12" x="2" y="6" rx="1"></rect>
          <rect width="7" height="12" x="15" y="6" rx="1"></rect>
          <path d="M9 6h6"></path>
          <path d="M9 18h6"></path>
          <path d="M9 12h6"></path>
        </svg>
      ),
      'automazioni': (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8"></path>
          <rect width="16" height="12" x="4" y="8" rx="2"></rect>
          <path d="M2 14h2"></path>
          <path d="M20 14h2"></path>
          <path d="M15 13v2"></path>
          <path d="M9 13v2"></path>
        </svg>
      ),
      'ads': (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      ),
      'reservly': (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <Navbar compressionProgress={navbarCompression} />
      <BurgerMenu isVisible={showBurger} />

      {/* Hero Section */}
      <section ref={heroRef} className="w-full bg-black pt-32 pb-20 lg:pt-40 lg:pb-24" style={{ padding: '160px 50px 80px 50px' }}>
        <div>
          {/* Back link */}
          <Link
            to="/"
            className="hero-animate inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-sm"
          >
            <span>←</span>
            <span>HOME</span>
          </Link>

          {/* Title */}
          <h1 className="hero-animate text-white font-extralight tracking-tight leading-none mb-8" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
            I NOSTRI SERVIZI
          </h1>

          {/* Description */}
          <p className="hero-animate text-white/70 text-xl lg:text-2xl font-light leading-relaxed max-w-3xl">
            Progettiamo e sviluppiamo soluzioni digitali su misura. Ogni servizio è pensato per generare risultati concreti e far crescere il tuo business.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section ref={servicesRef} className="w-full bg-black">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className="service-item group w-full border-t border-white/10 hover:bg-white/[0.02] transition-colors duration-300"
            style={{ padding: '80px 50px' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Colonna sinistra - Label, Icona, Nome, Tags, Bottone */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-500 text-xs tracking-wider">
                    SERVIZIO {index + 1}/{services.length}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#2EBAEB] rounded-lg w-12 h-12 flex items-center justify-center text-white flex-shrink-0">
                    {getServiceIcon(service.id)}
                  </div>
                  <h2 className="text-white text-3xl lg:text-4xl font-light group-hover:text-[#2EBAEB] transition-colors">
                    {service.name}
                  </h2>
                </div>

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
                  className="inline-flex items-center gap-3 border border-white/30 hover:border-[#2EBAEB] hover:text-[#2EBAEB] text-white rounded-full transition-colors"
                  style={{ padding: '14px 28px', fontSize: '14px' }}
                >
                  RICHIEDI INFO <span>→</span>
                </Link>
              </div>

              {/* Colonna centrale - Immagine servizio o rettangolo cyan hover (solo desktop) */}
              <div className="hidden lg:flex lg:col-span-5 items-start px-4">
                {(() => {
                  const serviceImages: Record<string, { src: string; alt: string }> = {
                    'seo': { src: servizioSeo, alt: 'SEO' },
                    'siti-web': { src: servizioSitiweb, alt: 'Siti Web' },
                    'ecommerce': { src: servizioEcommerce, alt: 'E-commerce' },
                    'social': { src: servizioSocial, alt: 'Gestione Social' },
                    'app': { src: servizioApp, alt: 'App e Web App' },
                    'automazioni': { src: servizioAutomazioni, alt: 'Automazioni AI' },
                    'ads': { src: servizioAds, alt: 'Advertising' },
                    'reservly': { src: servizioReservly, alt: 'Reservly' }
                  }
                  const imageData = serviceImages[service.id]

                  return imageData ? (
                    <img
                      src={imageData.src}
                      alt={imageData.alt}
                      className="w-full h-[300px] object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"
                    />
                  ) : (
                    <div className="w-full h-[300px] bg-[#2EBAEB] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
                  )
                })()}
              </div>

              {/* Colonna destra - Descrizione e Accordion */}
              <div className="lg:col-span-5">
                {/* Descrizione */}
                <p className="text-white text-lg lg:text-xl font-light leading-relaxed mb-10">
                  {service.longDescription}
                </p>

                {/* Accordion */}
                <div className="border-t border-white/10">
                  {service.accordionItems.map((item, accordionIndex) => (
                    <div
                      key={accordionIndex}
                      className="border-b border-white/10"
                    >
                      <button
                        onClick={() => toggleAccordion(service.id, accordionIndex)}
                        className="w-full flex items-center justify-between py-5 text-left"
                      >
                        <span className="text-white/80 font-light hover:text-[#2EBAEB] transition-colors">
                          {item.title}
                        </span>
                        <span className={`text-white/40 transition-transform duration-300 ${openAccordions[service.id] === accordionIndex ? 'rotate-45' : ''}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14"></path>
                            <path d="M5 12h14"></path>
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openAccordions[service.id] === accordionIndex
                            ? 'max-h-96 opacity-100 pb-5'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-white/60 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section - Stile grigio chiaro come ProjectPage */}
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
          {/* Contenuto principale - allineato a destra */}
          <div className="flex flex-col gap-4 max-w-2xl ml-auto text-right">
            {/* Badge */}
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

            {/* Bottone Contattaci */}
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

        {/* Icona stella/asterisco */}
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
