import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import ProjectCards3D from './components/ProjectCards3D'
import ProjectsTable from './components/ProjectsTable'
import ClientsMarquee from './components/ClientsMarquee'
import SoftwareSection from './components/SoftwareSection'
import CareersSection from './components/CareersSection'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import SoftwarePage from './pages/SoftwarePage'
import ReservlyPage from './pages/ReservlyPage'
import CareersPage from './pages/CareersPage'
import logoWebwiseCenter from './assets/logo-webwise-anduril-_1_.svg'

gsap.registerPlugin(ScrollTrigger)

// Componente per testo con effetto typewriter
function TypewriterText({
  text,
  className,
  style,
  isVisible,
  delay = 0,
  speed = 0.03,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
  isVisible: boolean
  delay?: number
  speed?: number
}) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isVisible || !containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.char')
    gsap.set(chars, { opacity: 0 })

    gsap.to(chars, {
      opacity: 1,
      duration: 0.05,
      stagger: speed,
      delay: delay,
      ease: 'none',
    })
  }, [isVisible, delay, speed])

  return (
    <span ref={containerRef} className={className} style={style}>
      {text.split('').map((char, i) => (
        <span key={i} className="char" style={{ opacity: 0 }}>
          {char}
        </span>
      ))}
    </span>
  )
}

function HomePage() {
  const [animationPhase, setAnimationPhase] = useState<'loading' | 'typewriter' | 'complete'>('loading')
  const [showLoading, setShowLoading] = useState(true)
  const [showHeroLogo, setShowHeroLogo] = useState(false)
  const [showServiziLogo, setShowServiziLogo] = useState(false)
  const heroLogoRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<HTMLElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const parallaxLogoRef = useRef<HTMLImageElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)
  const logoSectionRef = useRef<HTMLElement>(null)
  const serviziSectionRef = useRef<HTMLElement>(null)
  const serviziBlockRef = useRef<HTMLDivElement>(null)

  // L'animazione parte sempre ad ogni caricamento
  // showLoading è già true e showHeroLogo è già false per default

  // Callback quando il logo del loading arriva nella posizione della hero
  const handleLogoArrived = useCallback(() => {
    setShowHeroLogo(true) // Mostra il logo della hero

    // Avvia subito il typewriter appena il logo si è rimpicciolito
    setAnimationPhase('typewriter')

    // Anima la navbar
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [])

  const handleLogoTransitionComplete = useCallback(() => {
    setShowLoading(false)

    // Riporta lo scroll in cima alla pagina (alla hero)
    window.scrollTo(0, 0)

    // Anima le colonne laterali dopo il testo principale (timing ridotto per animazione più veloce)
    setTimeout(() => {
      if (leftColumnRef.current) {
        gsap.fromTo(
          leftColumnRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
        )
      }
      if (rightColumnRef.current) {
        gsap.fromTo(
          rightColumnRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
        )
      }

      // Animazione completa
      setTimeout(() => {
        setAnimationPhase('complete')
      }, 600)
    }, 1200) // Ridotto da 2500ms per animazione più veloce
  }, [])

  const isTypewriterActive = animationPhase === 'typewriter' || animationPhase === 'complete'
  const showFullContent = animationPhase === 'complete'

  // Parallax del logo: Hero -> Midframe -> Servizi
  useEffect(() => {
    if (showLoading || !parallaxLogoRef.current || !heroSectionRef.current || !logoSectionRef.current || !serviziSectionRef.current || !serviziBlockRef.current) return

    const logo = parallaxLogoRef.current
    const heroSection = heroSectionRef.current
    const midframeSection = logoSectionRef.current
    const serviziSection = serviziSectionRef.current
    const serviziBlock = serviziBlockRef.current

    // Leggi le trasformazioni correnti del logo (impostate dal loading)
    const initialX = (gsap.getProperty(logo, 'x') as number) || 0
    const initialY = (gsap.getProperty(logo, 'y') as number) || 0

    // Scale values
    const baseSize = 350
    const heroScale = 125 / baseSize      // Logo nella hero (125px)
    const midframeScale = 546 / baseSize  // Logo grande nel midframe (546px)
    const serviziScale = 125 / baseSize   // Logo nei servizi (125px)

    // FASE 1: Hero -> Midframe (logo si ingrandisce e si centra)
    const trigger1 = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      endTrigger: midframeSection,
      end: 'center center',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress

        // Interpola scala da 125px a 546px
        const currentScale = heroScale + (midframeScale - heroScale) * progress

        // Interpola posizione da hero a centro (x=0, y=0)
        const currentX = initialX * (1 - progress)
        const currentY = initialY * (1 - progress)

        gsap.set(logo, {
          scale: currentScale,
          x: currentX,
          y: currentY,
          force3D: true,
        })
      }
    })

    // FASE 2: Midframe -> Servizi
    // Il logo si rimpicciolisce e va verso la posizione finale (sopra il badge)
    // La posizione finale è dove il logo statico apparirà

    // Calcolo della posizione finale: quando serviziSection.top = 0 (viewport top),
    // il logo deve essere allineato con il logo statico dentro serviziBlock
    // Il logo statico ha top=20% della viewport + padding della sezione

    const trigger2 = ScrollTrigger.create({
      trigger: midframeSection,
      start: 'center center',
      endTrigger: serviziSection,
      end: 'top top',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress

        // Scala: si rimpicciolisce linearmente
        const currentScale = midframeScale + (serviziScale - midframeScale) * progress

        // Calcola posizione finale in tempo reale basata sulla posizione del blocco servizi
        // quando la sezione servizi è al top della viewport
        const blockRect = serviziBlock.getBoundingClientRect()
        const serviziRect = serviziSection.getBoundingClientRect()

        // Offset del blocco rispetto alla sezione servizi (costante)
        const blockOffsetFromSection = blockRect.top - serviziRect.top

        // Quando progress=1, serviziSection.top = 0, quindi il logo statico sarà a:
        // Y = blockOffsetFromSection (dalla top della viewport)
        // X = blockRect.left (dalla sinistra della viewport)

        // Il logo fixed è centrato (50%, 50%), quindi devo calcolare l'offset dal centro
        const finalX = blockRect.left + 62.5 - (window.innerWidth / 2) // 62.5 = metà di 125px
        const finalY = blockOffsetFromSection + 62.5 - (window.innerHeight / 2)

        // Posizione: interpolazione lineare da centro (0,0) a posizione finale
        const currentX = finalX * progress
        const currentY = finalY * progress

        gsap.set(logo, {
          scale: currentScale,
          x: currentX,
          y: currentY,
          force3D: true,
        })

        // Transizione logo fixed -> logo statico
        if (progress >= 0.95) {
          gsap.set(logo, { opacity: 0, force3D: true })
          setShowServiziLogo(true)
        } else {
          gsap.set(logo, { opacity: 1, force3D: true })
          setShowServiziLogo(false)
        }
      }
    })

    return () => {
      trigger1.kill()
      trigger2.kill()
    }
  }, [showLoading])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Loading Screen - non viene mai rimosso, solo reso trasparente */}
      <LoadingScreen
        onLogoTransitionComplete={handleLogoTransitionComplete}
        heroLogoRef={heroLogoRef}
        onLogoArrived={handleLogoArrived}
        parallaxLogoRef={parallaxLogoRef}
      />

      {/* Navbar fixed */}
      <nav
        ref={navbarRef}
        style={{ opacity: showLoading ? 0 : 1 }}
      >
        <Navbar />
      </nav>

      {/* Hero Section - 1920x1080 con sfondo nero */}
      <section
        ref={heroSectionRef}
        className="w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
        style={{
          aspectRatio: '1920 / 1080'
        }}
      >
        <div className="flex flex-col items-center text-center px-4">
          {/* Titolo principale - Inter SemiBold 75px */}
          <div className="text-white font-semibold tracking-tight" style={{ fontSize: '75px', lineHeight: '1.1' }}>
            <p>
              <TypewriterText
                text="WEBWISE"
                isVisible={isTypewriterActive}
                delay={0}
                speed={0.035}
              />
            </p>
            <p>
              <TypewriterText
                text="TRANSFORMING DIGITAL PRESENCE"
                isVisible={isTypewriterActive}
                delay={0.25}
                speed={0.015}
              />
            </p>
            <p>
              <TypewriterText
                text="WITH AI-DRIVEN STRATEGIES AND"
                isVisible={isTypewriterActive}
                delay={0.7}
                speed={0.015}
              />
            </p>
            <p>
              <TypewriterText
                text="SCALABLE TECHNOLOGIES"
                isVisible={isTypewriterActive}
                delay={1.1}
                speed={0.015}
              />
            </p>
          </div>

          {/* Sezione inferiore con logo al centro */}
          <div className="flex items-center justify-center gap-8 mt-12" style={{ fontSize: '30px' }}>
            {/* Colonna sinistra */}
            <div
              ref={leftColumnRef}
              className="text-white font-semibold text-right tracking-wide"
              style={{ minWidth: '280px', opacity: showLoading ? 0 : (showFullContent ? 1 : 0) }}
            >
              <p style={{ whiteSpace: 'nowrap' }}>SMARTER SYSTEMS</p>
              <p style={{ whiteSpace: 'nowrap' }}>BETTER<span style={{ marginLeft: '100px' }}>WORK</span></p>
            </div>

            {/* Logo centrale - 125x125px */}
            <div ref={heroLogoRef} className="flex items-center justify-center flex-shrink-0">
              <img
                src={logoWebwiseCenter}
                alt="Webwise Logo"
                className="invert"
                style={{
                  width: '125px',
                  height: '125px',
                  opacity: 0,
                }}
              />
            </div>

            {/* Colonna destra */}
            <div
              ref={rightColumnRef}
              className="text-white font-semibold text-left tracking-wide"
              style={{ minWidth: '280px', opacity: showLoading ? 0 : (showFullContent ? 1 : 0) }}
            >
              <p>EST. 2022</p>
              <p style={{ paddingLeft: '60px', whiteSpace: 'nowrap' }}>→ EFFICENCY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Logo Centrale - 1920x1080 con sfondo nero */}
      {/* Il logo qui è animato dal parallax, non serve un'immagine statica */}
      <section
        ref={logoSectionRef}
        className="w-full bg-black flex items-center justify-center"
        style={{
          aspectRatio: '1920 / 1080'
        }}
      >
        {/* Placeholder invisibile per mantenere le proporzioni */}
        <div style={{ width: '437px', height: '437px' }} />
      </section>

      {/* Sezione Servizi - 1920x1400 con sfondo nero */}
      <section
        ref={serviziSectionRef}
        id="servizi"
        className="w-full bg-black relative py-20"
        style={{
          aspectRatio: '1920 / 1400'
        }}
      >
        <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Colonna sinistra - sticky */}
          <div ref={serviziBlockRef} className="flex flex-col gap-4 lg:sticky lg:top-[20%] h-fit relative">
            {/* Logo statico sopra il badge */}
            <img
              src={logoWebwiseCenter}
              alt="Webwise Logo"
              className="invert"
              style={{
                width: '125px',
                height: '125px',
                opacity: showServiziLogo ? 1 : 0,
                transition: 'opacity 0.15s ease-out',
                marginBottom: '20px',
              }}
            />
            {/* Badge */}
            <span className="text-xs px-3 py-1 rounded-full border border-[#2EBAEB]/50 bg-[#2EBAEB]/10 text-[#2EBAEB] w-fit">
              Come possiamo aiutarti
            </span>

            {/* Titolo */}
            <h2 className="text-white text-4xl font-semibold">Servizi</h2>

            {/* Descrizione */}
            <p className="text-gray-400 max-w-[450px] leading-relaxed">
              Capire esattamente quello che ti serve è il nostro pane quotidiano.
              Sviluppiamo soluzioni software personalizzate che si allineano
              perfettamente ai tuoi obiettivi. Il nostro approccio è un mix ben
              rodato di metodo e creatività, garantendo prodotti di qualità superiore
              e senza compromessi.
            </p>

            {/* Bottoni */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 pl-4 pr-2 py-2 rounded-full text-white text-sm transition-all hover:-rotate-2 group"
              >
                <span>Leggi di più</span>
                <span className="bg-black rounded-full p-1.5 group-hover:bg-[#2EBAEB] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 7v14"></path>
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                  </svg>
                </span>
              </a>
              <a
                href="#contatti"
                className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 pl-4 pr-2 py-2 rounded-full text-white text-sm transition-all hover:-rotate-2 group"
              >
                <span>Contattaci</span>
                <span className="bg-black rounded-full p-1.5 group-hover:bg-[#2EBAEB] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Colonna destra - card servizi */}
          <div className="flex flex-col gap-4">
            {/* Card Ecommerce */}
            <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-pointer group sticky top-20">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">Ecommerce</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Shopify</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Integrazione gestionale</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Gestiamo un numero potenzialmente illimitato di prodotti, mantenendo la massima
                flessibilità nel design. Sviluppiamo negozi online integrati e intelligenti, con la migliore
                piattaforma sul mercato.
              </p>
            </div>

            {/* Card Design */}
            <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-pointer group sticky top-28">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" x2="2" y1="6" y2="6"></line>
                    <line x1="22" x2="2" y1="18" y2="18"></line>
                    <line x1="6" x2="6" y1="2" y2="22"></line>
                    <line x1="18" x2="18" y1="2" y2="22"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">Design</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Vendita omnicanale</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Cloud</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Creiamo esperienze straordinarie per i tuoi utenti e interfacce moderne, belle e
                funzionali. Seguiamo un processo di UX/UI Design che rispetta i migliori standard e
                siamo creativi.
              </p>
            </div>

            {/* Card Custom Software */}
            <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-pointer group sticky top-36">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                    <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                    <line x1="6" x2="6.01" y1="6" y2="6"></line>
                    <line x1="6" x2="6.01" y1="18" y2="18"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">Custom Software</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Sicuro</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Personalizzato</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Con un metodo studiato nei dettagli, arriviamo al risultato progettando insieme e
                sviluppando il software in cloud di cui hai bisogno. Quasi tutto è possibile.
              </p>
            </div>

            {/* Card Blockchain & Web3 */}
            <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-pointer group sticky top-44">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m16 18 6-6-6-6"></path>
                    <path d="m8 6-6 6 6 6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">Blockchain & Web3</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Cryptovalute</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Tecnologie decentralizzate</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sviluppiamo progetti direttamente su Blockchain o implementiamo in software
                tradizionali funzionalità Web3.
              </p>
            </div>

            {/* Card AI & Machine Learning */}
            <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:-translate-y-1 transition-all hover:shadow-lg cursor-pointer group sticky top-52">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8V4H8"></path>
                    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                    <path d="M2 14h2"></path>
                    <path d="M20 14h2"></path>
                    <path d="M15 13v2"></path>
                    <path d="M9 13v2"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">AI & Machine Learning</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Multipiattaforma</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">UX Design</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Soluzioni avanzate per automatizzare processi, analizzare dati e prendere decisioni
                intelligenti, aiutando il tuo business a crescere con innovazione e precisione.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Portfolio - 1920x2580 */}
      <section
        id="portfolio"
        className="w-full bg-black relative"
        style={{
          aspectRatio: '1920 / 2580'
        }}
      >
        {/* Sottosezione 1: I Nostri Clienti - 1920x1260 */}
        <div
          className="w-full relative flex flex-col items-center pt-16"
          style={{
            aspectRatio: '1920 / 1260'
          }}
        >
          {/* Badge */}
          <span className="text-xs px-3 py-1 rounded-full border border-[#2EBAEB]/50 bg-[#2EBAEB]/10 text-[#2EBAEB] mb-4">
            Con chi abbiamo lavorato
          </span>

          {/* Titolo */}
          <h2 className="text-white text-4xl font-semibold mb-4">I nostri clienti</h2>

          {/* Descrizione */}
          <p className="text-gray-400 text-center max-w-2xl leading-relaxed px-4">
            Ci immedesimiamo nella visione dei nostri clienti, per comprendere e realizzare i loro
            obiettivi con la stessa cura e attenzione che dedicherebbero loro stessi. Questo
            approccio empatico ci permette di sviluppare soluzioni che rispecchiano non solo le
            esigenze, ma anche l'identità e le aspirazioni di chi ci sceglie come partner.
          </p>

          {/* Card 3D dei progetti - interattive */}
          <ProjectCards3D />
        </div>

        {/* Sottosezione 2: Slider - 1920x200 */}
        <div
          className="w-full relative bg-black"
          style={{
            aspectRatio: '1920 / 200'
          }}
        >
          <ClientsMarquee />
        </div>

        {/* Sottosezione 3: Progetti */}
        <div className="w-full relative py-16 lg:py-24">
          <ProjectsTable />
        </div>

        {/* Sottosezione 4: Lavora con noi */}
        <div className="w-full relative py-24 lg:py-32 bg-gray-200 overflow-hidden z-10">
          {/* Cerchio sfumato rosso in alto a sinistra */}
          <div
            className="absolute -top-[300px] -left-[150px] w-[500px] h-[500px] rounded-full opacity-25 z-[1]"
            style={{
              background: '#2EBAEB',
              filter: 'blur(200px)'
            }}
          />

          {/* Cerchio sfumato cyan in basso a destra */}
          <div
            className="absolute -bottom-[150px] right-0 w-[500px] h-[500px] rounded-full opacity-35 z-[1]"
            style={{
              background: '#2EBAEB',
              filter: 'blur(200px)'
            }}
          />

          {/* Contenuto */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
            {/* Colonna sinistra - Badge */}
            <div className="lg:w-1/3">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2EBAEB] text-white text-xs font-medium">
                Scrivici, è gratis!
              </span>
            </div>

            {/* Colonna destra - Contenuto */}
            <div className="flex flex-col gap-4 lg:w-2/3">
              <h4 className="text-3xl lg:text-4xl uppercase font-medium tracking-tight text-gray-900 leading-tight">
                Vuoi lavorare con noi?{' '}
                <span className="text-gray-500">Raccontaci il tuo progetto</span>
              </h4>

              <p className="text-gray-600 leading-relaxed max-w-xl">
                Ogni percorso inizia con una chiamata conoscitiva, in cui potrai raccontarci quali sono le tue esigenze e ricevere i primi consigli sulla loro realizzazione.
              </p>

              {/* Bottone Contattaci */}
              <a
                href="#contatti"
                className="mt-2 border border-gray-400/50 pl-4 pr-1.5 py-1.5 rounded-full bg-gray-100 flex items-center gap-3 group hover:-rotate-2 transition-all w-fit"
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
                    className="transition-all translate-y-0 group-hover:-translate-y-[105%]"
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
                    className="absolute transition-all translate-y-[130%] group-hover:translate-y-0"
                  >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                    <path d="m21.854 2.147-10.94 10.939" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Icona stella/asterisco */}
          <svg
            className="absolute z-[1] right-6 lg:right-auto bottom-6 lg:bottom-10 lg:left-12 w-[120px] h-[120px] lg:w-[200px] lg:h-[200px] animate-spin-slow opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 72 72"
            fill="none"
            style={{ animationDuration: '20s' }}
          >
            <path
              d="M40 0H32V26.3432L13.3726 7.71573L7.71573 13.3726L26.3431 32H0V40H26.3432L7.71573 58.6274L13.3726 64.2843L32 45.6569V72H40V45.6569L58.6274 64.2843L64.2843 58.6274L45.6568 40H72V32H45.6569L64.2843 13.3726L58.6274 7.71573L40 26.3432V0Z"
              fill="#d1d5db"
            />
          </svg>
        </div>
      </section>

      {/* Sezione Software */}
      <SoftwareSection />

      {/* Sezione Careers */}
      <CareersSection />

      {/* Sezione Reservly */}
      <section
        id="reservly"
        className="w-full bg-black relative"
        style={{
          aspectRatio: '1920 / 1080'
        }}
      >
        <div className="absolute inset-0 flex flex-col px-8 lg:px-24 py-16 lg:py-24">
          {/* Badge */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#2EBAEB] text-[#2EBAEB] text-sm w-fit mb-4">
            Come possiamo aiutarti
          </span>

          {/* Titolo grande */}
          <h2 className="text-white font-medium leading-[1.1] max-w-5xl" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>
            Hallo! Wir sind Clou, deine Agentur in Luzern mit Fokus auf Branding, Purpose und Websites mit Wirkung.
          </h2>

          {/* Contenitore per descrizione e bottone - posizionato a destra e più in basso */}
          <div className="mt-auto ml-auto max-w-lg flex flex-col gap-6 pb-16 lg:pb-24">
            {/* Descrizione */}
            <p className="text-white/90 text-lg lg:text-xl leading-relaxed">
              In deinem Sinn, für dich, für deine Kund:innen und nicht zuletzt für uns, tun wir alles dafür, dass unsere Arbeit Sinn macht.
            </p>

            {/* Bottone */}
            <Link
              to="/reservly"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#2a2a3a] hover:bg-[#3a3a4a] text-white text-sm font-medium rounded-full transition-colors w-fit"
            >
              Scopri Reservly
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/software/:softwareId" element={<SoftwarePage />} />
      <Route path="/reservly" element={<ReservlyPage />} />
      <Route path="/careers" element={<CareersPage />} />
    </Routes>
  )
}

export default App
