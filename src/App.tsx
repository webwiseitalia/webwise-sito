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
import ProjectPage from './pages/ProjectPage'
import ScrollToTop from './components/ScrollToTop'
import ParticleLogo from './components/ParticleLogo'
import DotShaderBackground, { DotShaderBackgroundRef } from './components/DotShaderBackground'
import NoiseTexture from './components/NoiseTexture'
import BurgerMenu from './components/BurgerMenu'
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
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Cleanup del context precedente
    if (ctxRef.current) {
      ctxRef.current.revert()
      ctxRef.current = null
    }

    const chars = containerRef.current.querySelectorAll('.char')

    if (isVisible) {
      // Crea un nuovo context GSAP per gestire meglio il cleanup
      ctxRef.current = gsap.context(() => {
        gsap.set(chars, { opacity: 0 })
        gsap.to(chars, {
          opacity: 1,
          duration: 0.05,
          stagger: speed,
          delay: delay,
          ease: 'none',
        })
      })
    } else {
      // Reset istantaneo - forza opacity 0 su tutti i caratteri
      gsap.killTweensOf(chars)
      chars.forEach(char => {
        (char as HTMLElement).style.opacity = '0'
      })
    }

    // Cleanup quando il componente si smonta
    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert()
        ctxRef.current = null
      }
    }
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
  // Controlla se l'animazione di loading è già stata mostrata in questa sessione
  const hasSeenLoading = sessionStorage.getItem('hasSeenLoading') === 'true'

  const [animationPhase, setAnimationPhase] = useState<'loading' | 'typewriter' | 'complete'>(
    hasSeenLoading ? 'complete' : 'loading'
  )
  const [showLoading, setShowLoading] = useState(!hasSeenLoading)
  const [, setShowHeroLogo] = useState(true)
  // Se abbiamo già visto il loading, mostra subito le particelle
  const [showParticleLogo, setShowParticleLogo] = useState(hasSeenLoading)
  const [showCustomProjectsLine, setShowCustomProjectsLine] = useState(false) // Scritta "progetti custom"
  const [showMidframeContent, setShowMidframeContent] = useState(false) // Contenuto midframe (descrizioni)
  const [showBurger, setShowBurger] = useState(false) // Burger menu visibile dopo scroll
  const [navbarCompression, setNavbarCompression] = useState(0) // 0 = normale, 1 = compressa
  const heroLogoRef = useRef<HTMLDivElement>(null)
  const customProjectsRef = useRef<HTMLDivElement>(null) // Ref per animare la scritta
  const lineRef = useRef<HTMLDivElement>(null) // Ref per animare la linea loading
  const midframeLineLeftRef1 = useRef<HTMLDivElement>(null) // Linea sinistra 1 (Webwise)
  const midframeLineLeftRef2 = useRef<HTMLDivElement>(null) // Linea sinistra 2 (centrale)
  const midframeLineLeftRef3 = useRef<HTMLDivElement>(null) // Linea sinistra 3 (Reservly)
  const midframeLineRightRef = useRef<HTMLDivElement>(null) // Linea destra (SCOT)
  const midframeObliqueLeftRef1 = useRef<HTMLDivElement>(null) // Linea obliqua sinistra 1
  const midframeObliqueLeftRef2 = useRef<HTMLDivElement>(null) // Linea obliqua sinistra 2 (centrale)
  const midframeObliqueLeftRef3 = useRef<HTMLDivElement>(null) // Linea obliqua sinistra 3
  const midframeObliqueRightRef = useRef<HTMLDivElement>(null) // Linea obliqua destra
  const navbarRef = useRef<HTMLElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)
  const logoSectionRef = useRef<HTMLElement>(null)
  const servizi1SectionRef = useRef<HTMLElement>(null) // Sezione sopra la linea verde - solo logo
  const serviziSectionRef = useRef<HTMLElement>(null) // Sezione sotto la linea verde - card e contenuto
  const serviziBlockRef = useRef<HTMLDivElement>(null)
  const serviziContentRef = useRef<HTMLDivElement>(null)
  const portfolioSectionRef = useRef<HTMLElement>(null)
  const softwareSectionRef = useRef<HTMLDivElement>(null)
  const heroShaderRef = useRef<HTMLDivElement>(null)
  const dotShaderRef = useRef<DotShaderBackgroundRef>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  // L'animazione parte solo la prima volta che si visita la homepage

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

    // Segna che l'animazione è stata vista in questa sessione
    sessionStorage.setItem('hasSeenLoading', 'true')

    // Riporta lo scroll in cima alla pagina (alla hero)
    window.scrollTo(0, 0)

    // Le colonne laterali ora usano TypewriterText, quindi completiamo subito l'animazione
    // Aspettiamo che il typewriter delle colonne finisca (~1s dopo l'inizio)
    setTimeout(() => {
      setAnimationPhase('complete')
    }, 1000)
  }, [])

  const isTypewriterActive = animationPhase === 'typewriter' || animationPhase === 'complete'
  const showFullContent = animationPhase === 'complete'

  // Callback quando il logo fa snap-in/out nella sezione servizi
  const handleLogoSnapComplete = useCallback((isSnapped: boolean) => {
    setShowCustomProjectsLine(isSnapped)
  }, [])

  // Animazione sincronizzata per scritta "progetti custom" e linea loading
  // Durata totale: 1 secondo - linea e typewriter finiscono insieme
  useEffect(() => {
    if (!lineRef.current) return

    // Cancella eventuali animazioni in corso per evitare conflitti
    gsap.killTweensOf(lineRef.current)

    if (showCustomProjectsLine) {
      // Animazione linea loading: da 0% a 100% in 1 secondo
      // Le scritte TypewriterText si animano automaticamente tramite isVisible
      gsap.fromTo(lineRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 1,
          ease: 'power2.out',
          overwrite: true
        }
      )
    } else {
      // Reset istantaneo - nessuna animazione per evitare bug
      gsap.set(lineRef.current, { width: '0%' })
    }
  }, [showCustomProjectsLine])

  // Animazione linee midframe - si espandono dal centro verso l'esterno
  useEffect(() => {
    const horizontalLines = [midframeLineLeftRef1.current, midframeLineLeftRef2.current, midframeLineLeftRef3.current, midframeLineRightRef.current]
    const obliqueLines = [midframeObliqueLeftRef1.current, midframeObliqueLeftRef2.current, midframeObliqueLeftRef3.current, midframeObliqueRightRef.current]
    const allLines = [...horizontalLines, ...obliqueLines]

    allLines.forEach(line => {
      if (line) gsap.killTweensOf(line)
    })

    if (showMidframeContent) {
      // Linee orizzontali sinistra: si espandono verso sinistra
      if (midframeLineLeftRef1.current) {
        gsap.fromTo(midframeLineLeftRef1.current,
          { width: '0%' },
          { width: '100%', duration: 1, ease: 'power2.out', overwrite: true }
        )
      }
      if (midframeLineLeftRef2.current) {
        gsap.fromTo(midframeLineLeftRef2.current,
          { width: '0%' },
          { width: '100%', duration: 1, ease: 'power2.out', overwrite: true, delay: 0.05 }
        )
      }
      if (midframeLineLeftRef3.current) {
        gsap.fromTo(midframeLineLeftRef3.current,
          { width: '0%' },
          { width: '100%', duration: 1, ease: 'power2.out', overwrite: true, delay: 0.1 }
        )
      }
      // Linea orizzontale destra: si espande verso destra
      if (midframeLineRightRef.current) {
        gsap.fromTo(midframeLineRightRef.current,
          { width: '0%' },
          { width: '100%', duration: 1, ease: 'power2.out', overwrite: true }
        )
      }

      // Linee oblique - partono con un piccolo delay dopo le orizzontali
      if (midframeObliqueLeftRef1.current) {
        gsap.fromTo(midframeObliqueLeftRef1.current,
          { width: '0px' },
          { width: '80px', duration: 0.6, ease: 'power2.out', overwrite: true, delay: 0.3 }
        )
      }
      if (midframeObliqueLeftRef2.current) {
        gsap.fromTo(midframeObliqueLeftRef2.current,
          { width: '0px' },
          { width: '80px', duration: 0.6, ease: 'power2.out', overwrite: true, delay: 0.35 }
        )
      }
      if (midframeObliqueLeftRef3.current) {
        gsap.fromTo(midframeObliqueLeftRef3.current,
          { width: '0px' },
          { width: '80px', duration: 0.6, ease: 'power2.out', overwrite: true, delay: 0.4 }
        )
      }
      if (midframeObliqueRightRef.current) {
        gsap.fromTo(midframeObliqueRightRef.current,
          { width: '0px' },
          { width: '80px', duration: 0.6, ease: 'power2.out', overwrite: true, delay: 0.3 }
        )
      }
    } else {
      // Reset istantaneo
      horizontalLines.forEach(line => {
        if (line) gsap.set(line, { width: '0%' })
      })
      obliqueLines.forEach(line => {
        if (line) gsap.set(line, { width: '0px' })
      })
    }
  }, [showMidframeContent])

  // Mostra il ParticleLogo quando il loading è completato o se lo saltiamo
  useEffect(() => {
    if (!showLoading) {
      // Piccolo delay per assicurarsi che il DOM sia pronto
      setTimeout(() => {
        setShowParticleLogo(true)
      }, 100)
    }
  }, [showLoading])

  // ScrollTrigger per effetto parallax con ZOOM IN/OUT
  // Sincronizzato con ParticleLogo usando gli stessi endpoint:
  // - Fase 1 (zoom in): da hero fino a top+=33% del midframe
  // - Zona statica: logo nitido, background fermo a 2x
  // - Fase 2 (zoom out): da bottom-=33% del midframe fino a servizi
  useEffect(() => {
    if (!heroSectionRef.current || !logoSectionRef.current || !serviziSectionRef.current || !servizi1SectionRef.current) return
    if (!heroShaderRef.current) return

    const shader = heroShaderRef.current
    const heroSection = heroSectionRef.current
    const logoSection = logoSectionRef.current
    const serviziSection = serviziSectionRef.current
    const servizi1Section = servizi1SectionRef.current

    // Stato iniziale
    shader.style.transform = 'scale(1)'

    // Trigger 1: Zoom IN (hero → logo nitido)
    // Stesso endpoint del ParticleLogo fase 1: 'top+=33% center'
    const zoomInTrigger = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      endTrigger: logoSection,
      end: 'top+=33% center',
      onUpdate: (self) => {
        const scale = 1 + self.progress // 1 → 2
        shader.style.transform = `scale(${scale})`

        // fillAmount cresce verso la fine dello zoom
        if (self.progress > 0.7 && dotShaderRef.current) {
          const fillProgress = (self.progress - 0.7) / 0.3
          const fillAmount = Math.sin(fillProgress * Math.PI / 2)
          dotShaderRef.current.setFillAmount(fillAmount)
        } else if (dotShaderRef.current) {
          dotShaderRef.current.setFillAmount(0)
        }

        // Mostra/nascondi burger in base allo scroll
        // Appare quando progress > 0.05 (appena inizia lo scroll)
        if (self.progress > 0.05) {
          setShowBurger(true)
        } else {
          setShowBurger(false)
        }

        // Compressione navbar: 0-1 basata sul progress dello scroll
        // La navbar si comprime mentre si scrolla
        setNavbarCompression(self.progress)
      },
      onLeave: () => {
        // Quando lo zoom finisce, assicura scala 2x
        shader.style.transform = `scale(2)`
        if (dotShaderRef.current) dotShaderRef.current.setFillAmount(1)
        setShowBurger(true) // Burger sempre visibile dopo la hero
        setNavbarCompression(1) // Navbar completamente compressa
      },
      onEnterBack: () => {
        // Quando si torna verso la hero, nascondi burger e decomprimi navbar
        setShowBurger(false)
        setNavbarCompression(0)
      }
    })

    // Trigger 2: Zona statica (logo nitido) - background fermo, gestisce solo il flip
    const staticTrigger = ScrollTrigger.create({
      trigger: logoSection,
      start: 'top+=33% center',
      end: 'bottom-=33% center',
      onUpdate: (self) => {
        // Background fermo a scala 2x, il flip avviene a metà
        if (self.progress < 0.5) {
          shader.style.transform = `scale(2)`
        } else {
          shader.style.transform = `scale(2) scaleY(-1)`
        }

        // fillAmount resta al massimo durante la zona statica
        if (dotShaderRef.current) {
          dotShaderRef.current.setFillAmount(1)
        }
      },
      onLeave: () => {
        shader.style.transform = `scale(2) scaleY(-1)`
      },
      onEnterBack: () => {
        shader.style.transform = `scale(2) scaleY(-1)`
      }
    })

    // NOTA: Il contenuto midframe (descrizioni) è ora controllato direttamente dal ParticleLogo
    // tramite il callback onMidframeNitido, così si sincronizza perfettamente con lo snap automatico

    // Trigger 3: Zoom OUT (dopo logo nitido → servizi)
    // Stesso startpoint del ParticleLogo fase 2: 'bottom-=33% center'
    const zoomOutTrigger = ScrollTrigger.create({
      trigger: logoSection,
      start: 'bottom-=33% center',
      endTrigger: serviziSection,
      end: 'top top',
      onUpdate: (self) => {
        const scale = 2 - self.progress // 2 → 1
        shader.style.transform = `scale(${scale}) scaleY(-1)`

        // fillAmount decresce all'inizio del de-zoom
        if (self.progress < 0.3 && dotShaderRef.current) {
          const fillProgress = 1 - (self.progress / 0.3)
          const fillAmount = Math.sin(fillProgress * Math.PI / 2)
          dotShaderRef.current.setFillAmount(fillAmount)
        } else if (dotShaderRef.current) {
          dotShaderRef.current.setFillAmount(0)
        }
      },
      onEnter: () => {
        // Quando inizia il de-zoom
        shader.style.transform = `scale(2) scaleY(-1)`
      }
    })

    // Trigger 4: Background FISSO durante animazione card (servizi1 → fine servizi2)
    // Il background resta bloccato a scale(1) mentre le card scorrono sopra
    const fixedBackgroundTrigger = ScrollTrigger.create({
      trigger: servizi1Section,
      start: 'top top',
      endTrigger: serviziSection,
      end: 'bottom bottom',
      onEnter: () => {
        // Blocca il background a scala 1 (flippato)
        shader.style.transform = `scale(1) scaleY(-1)`
        if (dotShaderRef.current) dotShaderRef.current.setFillAmount(0)
      },
      onLeaveBack: () => {
        // Tornando indietro, lascia che zoomOutTrigger gestisca l'animazione
      }
    })

    return () => {
      zoomInTrigger.kill()
      staticTrigger.kill()
      zoomOutTrigger.kill()
      fixedBackgroundTrigger.kill()
    }
  }, [hasSeenLoading])

  // Effetto parallax: la sezione Portfolio sale sopra la sezione Servizi
  // Pin sulla sezione servizi così che la sezione Portfolio la copra scrollando
  useEffect(() => {
    if (!portfolioSectionRef.current || !serviziSectionRef.current) return

    const serviziSection = serviziSectionRef.current

    // Pin la sezione servizi - resta ferma mentre la sezione Portfolio sale e la copre
    const pinTrigger = ScrollTrigger.create({
      trigger: serviziSection,
      start: 'bottom bottom', // Inizia quando il bottom della sezione servizi raggiunge il bottom della viewport
      end: '+=100%', // Dura per un'altezza viewport extra
      pin: true,
      pinSpacing: false, // Non aggiunge spazio - la sezione Portfolio riempie lo spazio
    })

    return () => {
      pinTrigger.kill()
    }
  }, [])

  // Animazione scala + fade per la sezione Software
  useEffect(() => {
    if (!softwareSectionRef.current) return

    const softwareSection = softwareSectionRef.current

    // Stato iniziale: più piccola e trasparente
    gsap.set(softwareSection, {
      scale: 0.8,
      opacity: 0.3,
      transformOrigin: 'center top'
    })

    // Animazione: cresce a scala 1 e opacity 1 mentre entra nella viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: softwareSection,
        start: 'top bottom', // Inizia quando il top della sezione entra dalla bottom della viewport
        end: 'top top', // Finisce quando il top raggiunge il top della viewport - animazione più lunga
        scrub: 1,
      }
    })

    tl.to(softwareSection, {
      scale: 1,
      opacity: 1,
      ease: 'none'
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Loading Screen - mostra solo la prima volta */}
      {!hasSeenLoading && (
        <LoadingScreen
          onLogoTransitionComplete={handleLogoTransitionComplete}
          heroLogoRef={heroLogoRef}
          onLogoArrived={handleLogoArrived}
        />
      )}

      {/* ParticleLogo - effetto dissolve/particelle durante lo scroll */}
      <ParticleLogo
        heroSectionRef={heroSectionRef}
        midframeSectionRef={logoSectionRef}
        servizi1SectionRef={servizi1SectionRef}
        serviziBlockRef={serviziBlockRef}
        heroLogoRef={heroLogoRef}
        isVisible={showParticleLogo}
        onSnapComplete={handleLogoSnapComplete}
        onMidframeNitido={setShowMidframeContent}
      />


      {/* Navbar fixed */}
      <nav
        ref={navbarRef}
        className="relative z-[100]"
        style={{ opacity: hasSeenLoading || !showLoading ? 1 : 0 }}
      >
        <Navbar compressionProgress={navbarCompression} />
      </nav>

      {/* Burger Menu - appare quando si scrolla dalla hero */}
      <BurgerMenu isVisible={showBurger} />

      {/* Hero Section - 1920x1080 con sfondo nero */}
      <section
        id="hero"
        ref={heroSectionRef}
        className="w-full min-h-screen bg-transparent flex items-center justify-center overflow-hidden relative"
        style={{
          aspectRatio: '1920 / 1080'
        }}
      >
        {/* Wrapper per contenere overflow durante lo zoom */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* Sfondo unico - zoom in/out con flip al centro */}
          <div
            ref={heroShaderRef}
            className="absolute inset-0"
            style={{
              mixBlendMode: 'screen',
              transformOrigin: 'center center',
            }}
          >
            <DotShaderBackground ref={dotShaderRef} />
          </div>
        </div>

        <div className="flex flex-col items-center text-center px-4 relative z-10">
          {/* Titolo principale - Inter SemiBold 75px */}
          <div className="text-white font-semibold tracking-tight" style={{ fontSize: '75px', lineHeight: '1.1' }}>
            <p>
              <TypewriterText
                text="WEBWISE"
                isVisible={isTypewriterActive}
                delay={0}
                speed={0.018}
              />
            </p>
            <p>
              <TypewriterText
                text="TRANSFORMING DIGITAL PRESENCE"
                isVisible={isTypewriterActive}
                delay={0.12}
                speed={0.008}
              />
            </p>
            <p>
              <TypewriterText
                text="WITH AI-DRIVEN STRATEGIES AND"
                isVisible={isTypewriterActive}
                delay={0.35}
                speed={0.008}
              />
            </p>
            <p>
              <TypewriterText
                text="SCALABLE TECHNOLOGIES"
                isVisible={isTypewriterActive}
                delay={0.55}
                speed={0.008}
              />
            </p>
          </div>

          {/* Sezione inferiore con logo al centro */}
          <div className="flex items-center justify-center gap-8 mt-12" style={{ fontSize: '30px' }}>
            {/* Colonna sinistra */}
            <div
              ref={leftColumnRef}
              className="text-white font-semibold text-right tracking-wide"
              style={{ minWidth: '280px' }}
            >
              <p style={{ whiteSpace: 'nowrap' }}>
                <TypewriterText
                  text="SMARTER SYSTEMS"
                  isVisible={isTypewriterActive}
                  delay={0.7}
                  speed={0.012}
                />
              </p>
              <p style={{ whiteSpace: 'nowrap' }}>
                <TypewriterText
                  text="BETTER"
                  isVisible={isTypewriterActive}
                  delay={0.85}
                  speed={0.012}
                />
                <span style={{ marginLeft: '100px' }}>
                  <TypewriterText
                    text="WORK"
                    isVisible={isTypewriterActive}
                    delay={0.92}
                    speed={0.012}
                  />
                </span>
              </p>
            </div>

            {/* Logo centrale - 125x125px con dimensioni fisse per evitare shift durante le animazioni */}
            <div ref={heroLogoRef} className="flex items-center justify-center flex-shrink-0" style={{ width: '125px', height: '125px' }}>
              <img
                src={logoWebwiseCenter}
                alt="Webwise Logo"
                className="invert"
                style={{
                  width: '125px',
                  height: '125px',
                  opacity: hasSeenLoading ? 1 : 0,
                }}
              />
            </div>

            {/* Colonna destra */}
            <div
              ref={rightColumnRef}
              className="text-white font-semibold text-left tracking-wide"
              style={{ minWidth: '280px' }}
            >
              <p>
                <TypewriterText
                  text="EST. 2022"
                  isVisible={isTypewriterActive}
                  delay={0.7}
                  speed={0.012}
                />
              </p>
              <p style={{ paddingLeft: '60px', whiteSpace: 'nowrap' }} className="flex items-center gap-2">
                <TypewriterText
                  text="EFFICENCY"
                  isVisible={isTypewriterActive}
                  delay={0.85}
                  speed={0.012}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: 'rotate(-45deg)',
                    opacity: isTypewriterActive ? 1 : 0,
                    transition: 'opacity 0.3s ease 0.96s'
                  }}
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Logo Centrale - estesa per mantenere il logo nitido visibile più a lungo */}
      <section
        ref={logoSectionRef}
        className="w-full bg-transparent flex items-center justify-center relative overflow-hidden"
        style={{
          aspectRatio: '1920 / 1080'  // Altezza originale (1x)
        }}
      >
        {/* Nessuno sfondo qui - lo zoom continua sugli sfondi hero/servizi */}
      </section>

      {/* Descrizioni midframe - FIXED, posizionate rispetto al logo 546px centrato */}
      {/* Appaiono/spariscono in sincronia con la zona "logo nitido" del ParticleLogo */}
      <div
        className="fixed inset-0 pointer-events-none flex items-center justify-center"
        style={{
          zIndex: 42, // Sopra il logo midframe (z-index 41)
          opacity: showMidframeContent ? 1 : 0,
          transition: 'opacity 0.15s ease'
        }}
      >
        <div className="flex items-center justify-center gap-16">
          {/* Colonna sinistra - 2 descrizioni: una in alto, una in basso */}
          <div className="flex flex-col justify-between items-end text-right" style={{ width: '450px', height: '546px' }}>
            {/* Descrizione 1: Webwise e servizi - in alto */}
            <div className="flex flex-col items-end">
              <p className="text-white/80 text-base font-semibold uppercase tracking-wide mb-2">
                <TypewriterText
                  text="SOLUZIONI DIGITALI SU MISURA"
                  isVisible={showMidframeContent}
                  delay={0}
                  speed={0.025}
                />
              </p>
              <p className="text-white/60 text-sm max-w-[380px] mb-4">
                <TypewriterText
                  text="Sviluppo web, app, automazioni e strategie digitali per far crescere il tuo business."
                  isVisible={showMidframeContent}
                  delay={0.3}
                  speed={0.015}
                />
              </p>
              {/* Contenitore linee - orizzontale + obliqua attaccate */}
              <div className="w-full flex justify-end items-center relative">
                {/* Linea orizzontale */}
                <div
                  ref={midframeLineLeftRef1}
                  style={{ width: '0%', height: '2px' }}
                  className="bg-white/60"
                />
                {/* Linea obliqua - punta verso il logo (in basso a destra) */}
                <div
                  ref={midframeObliqueLeftRef1}
                  className="bg-white/60 absolute"
                  style={{
                    width: '0px',
                    height: '2px',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(45deg)',
                    transformOrigin: 'left center'
                  }}
                />
              </div>
            </div>

            {/* Descrizione 2: Reservly - in basso */}
            <div className="flex flex-col items-end">
              <p className="text-white/80 text-base font-semibold uppercase tracking-wide mb-2">
                <TypewriterText
                  text="RESERVLY"
                  isVisible={showMidframeContent}
                  delay={0.1}
                  speed={0.04}
                />
              </p>
              <p className="text-white/60 text-sm max-w-[380px] mb-4">
                <TypewriterText
                  text="La piattaforma di prenotazione per il business moderno. Semplifica appuntamenti e automatizza i flussi."
                  isVisible={showMidframeContent}
                  delay={0.4}
                  speed={0.015}
                />
              </p>
              {/* Contenitore linee - orizzontale + obliqua attaccate */}
              <div className="w-full flex justify-end items-center relative">
                {/* Linea orizzontale */}
                <div
                  ref={midframeLineLeftRef2}
                  style={{ width: '0%', height: '2px' }}
                  className="bg-white/60"
                />
                {/* Linea obliqua - punta verso il logo (in alto a destra) */}
                <div
                  ref={midframeObliqueLeftRef2}
                  className="bg-white/60 absolute"
                  style={{
                    width: '0px',
                    height: '2px',
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(-45deg)',
                    transformOrigin: 'left center'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Spazio per il logo centrale - 546px come il logo nitido */}
          <div style={{ width: '546px', height: '546px' }} />

          {/* Colonna destra - 2 descrizioni: una centrata, una con linea verso l'alto */}
          <div className="flex flex-col justify-between items-start text-left" style={{ width: '450px', height: '546px' }}>
            {/* Descrizione 1: WEBWISE STUDIO - in alto con linea verso il basso */}
            <div className="flex flex-col items-start">
              <p className="text-white/80 text-base font-semibold uppercase tracking-wide mb-2">
                <TypewriterText
                  text="WEBWISE STUDIO"
                  isVisible={showMidframeContent}
                  delay={0}
                  speed={0.04}
                />
              </p>
              <p className="text-white/60 text-sm max-w-[380px] mb-4">
                <TypewriterText
                  text="Crea il tuo sito web con l'intelligenza artificiale. Semplice, veloce, professionale."
                  isVisible={showMidframeContent}
                  delay={0.3}
                  speed={0.015}
                />
              </p>
              {/* Contenitore linee - orizzontale + obliqua attaccate */}
              <div className="w-full flex justify-start items-center relative">
                {/* Linea obliqua - punta verso il logo (in basso a sinistra) */}
                <div
                  ref={midframeObliqueLeftRef3}
                  className="bg-white/60 absolute"
                  style={{
                    width: '0px',
                    height: '2px',
                    right: '100%',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(-45deg)',
                    transformOrigin: 'right center'
                  }}
                />
                {/* Linea orizzontale */}
                <div
                  ref={midframeLineLeftRef3}
                  style={{ width: '0%', height: '2px' }}
                  className="bg-white/60"
                />
              </div>
            </div>

            {/* Descrizione 2: SCOT - in basso con linea verso l'alto */}
            <div className="flex flex-col items-start">
              <p className="text-white/80 text-base font-semibold uppercase tracking-wide mb-2">
                <TypewriterText
                  text="SCOT"
                  isVisible={showMidframeContent}
                  delay={0.1}
                  speed={0.08}
                />
              </p>
              <p className="text-white/60 text-sm max-w-[380px] mb-4">
                <TypewriterText
                  text="Il gestionale intelligente per aziende moderne. Organizza, monitora e scala il tuo business con l'AI."
                  isVisible={showMidframeContent}
                  delay={0.4}
                  speed={0.015}
                />
              </p>
              {/* Contenitore linee - orizzontale + obliqua attaccate */}
              <div className="w-full flex justify-start items-center relative">
                {/* Linea obliqua - punta verso il logo (in alto a sinistra) */}
                <div
                  ref={midframeObliqueRightRef}
                  className="bg-white/60 absolute"
                  style={{
                    width: '0px',
                    height: '2px',
                    right: '100%',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(45deg)',
                    transformOrigin: 'right center'
                  }}
                />
                {/* Linea orizzontale */}
                <div
                  ref={midframeLineRightRef}
                  style={{ width: '0%', height: '2px' }}
                  className="bg-white/60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione Servizi 1 - SOPRA la linea verde (35vh) - contiene SOLO il logo */}
      {/* Il logo arriva qui con l'animazione da midframe e rimane fisso */}
      <section
        ref={servizi1SectionRef}
        className="w-full relative"
        style={{ height: '35vh', overflow: 'clip' }}
      >
        <div className="relative max-w-7xl mx-auto px-8 h-full">
          {/* Logo + Linea con scritta custom */}
          <div ref={serviziBlockRef} className="sticky flex items-center gap-8" style={{ top: '20vh', paddingTop: '20px' }}>
            {/* Logo */}
            <img
              src={logoWebwiseCenter}
              alt="Webwise Logo"
              className="invert flex-shrink-0"
              style={{
                width: '125px',
                height: '125px',
                opacity: 0, // Controllato da ParticleLogo
              }}
            />

            {/* Blocco destro: scritta + linea + CTA - con animazioni sincronizzate */}
            <div ref={customProjectsRef} className="flex-grow flex flex-col justify-center" style={{ opacity: 1 }}>
              {/* Riga con scritta e CTA */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-sm font-medium uppercase tracking-wide">
                  <TypewriterText
                    text="REALIZZIAMO ANCHE PROGETTI CUSTOM SU MISURA"
                    isVisible={showCustomProjectsLine}
                    delay={0}
                    speed={0.023}
                  />
                </p>
                <a
                  href="#contatti"
                  className="flex items-center gap-1.5 text-white text-sm font-medium uppercase tracking-wide hover:text-[#2EBAEB] transition-colors group"
                >
                  <span>
                    <TypewriterText
                      text="CONTATTACI"
                      isVisible={showCustomProjectsLine}
                      delay={0}
                      speed={0.1}
                    />
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ opacity: showCustomProjectsLine ? 1 : 0, transition: showCustomProjectsLine ? 'opacity 0.3s ease 0.9s' : 'none' }}>
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>

              {/* Linea orizzontale - animazione loading da 0% a 100% */}
              <div className="w-full h-px">
                <div
                  ref={lineRef}
                  className="h-full bg-white/50"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Servizi 2 - SOTTO la linea verde - contiene card e contenuto */}
      {/* L'altezza minima garantisce che le card sticky abbiano abbastanza spazio per restare in posizione */}
      <section
        ref={serviziSectionRef}
        id="servizi"
        className="w-full relative py-20"
        style={{ minHeight: '250vh' }}
      >
        <div ref={serviziContentRef} className="relative max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" style={{ transformOrigin: 'center top' }}>
          {/* Colonna sinistra - sticky */}
          <div className="flex flex-col gap-4 h-fit relative sticky" style={{ top: '20vh' }}>
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

          {/* Colonna destra - card servizi con sticky stacking */}
          <div ref={cardsContainerRef} className="flex flex-col pt-0">
            {/* Card SEO */}
            <div className="service-card bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 cursor-pointer group sticky mb-[200px]" style={{ top: '20vh', zIndex: 1 }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">SEO</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Google</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Posizionamento</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ottimizzazione per i motori di ricerca e miglioramento del posizionamento su Google.
              </p>
            </div>

            {/* Card Siti Web */}
            <div className="service-card bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 cursor-pointer group sticky mb-[200px]" style={{ top: 'calc(20vh + 20px)', zIndex: 2 }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M3 9h18"></path>
                    <path d="M9 21V9"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">Siti Web</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Responsive</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Performanti</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Progettazione e sviluppo di siti web personalizzati, responsive e performanti.
              </p>
            </div>

            {/* Card E-commerce */}
            <div className="service-card bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 cursor-pointer group sticky mb-[200px]" style={{ top: 'calc(20vh + 40px)', zIndex: 3 }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">E-commerce</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Pagamenti</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Gestione prodotti</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Realizzazione di negozi online completi, con sistemi di pagamento e gestione prodotti.
              </p>
            </div>

            {/* Card Gestione Social */}
            <div className="service-card bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 cursor-pointer group sticky mb-[200px]" style={{ top: 'calc(20vh + 60px)', zIndex: 4 }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">Gestione Social</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Contenuti</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Crescita</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Gestione professionale dei social media, creazione contenuti e crescita della presenza online.
              </p>
            </div>

            {/* Card App e Web App */}
            <div className="service-card bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 cursor-pointer group sticky mb-[200px]" style={{ top: 'calc(20vh + 80px)', zIndex: 5 }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="12" x="2" y="6" rx="1"></rect>
                    <rect width="7" height="12" x="15" y="6" rx="1"></rect>
                    <path d="M9 6h6"></path>
                    <path d="M9 18h6"></path>
                    <path d="M9 12h6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">App e Web App</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Mobile</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Su misura</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sviluppo di applicazioni mobile e web su misura per aziende e progetti digitali.
              </p>
            </div>

            {/* Card Automazioni e AI */}
            <div className="service-card bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 cursor-pointer group sticky mb-[200px]" style={{ top: 'calc(20vh + 100px)', zIndex: 6 }}>
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
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">Automazioni e AI</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Intelligenza Artificiale</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Processi</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Automazione dei processi aziendali e integrazione di soluzioni basate su AI.
              </p>
            </div>

            {/* Card ADS */}
            <div className="service-card bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 cursor-pointer group sticky mb-[200px]" style={{ top: 'calc(20vh + 120px)', zIndex: 7 }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">ADS</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Google Ads</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Social Ads</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Gestione di campagne pubblicitarie su Google Ads e piattaforme social.
              </p>
            </div>

            {/* Card Reservly */}
            <div className="service-card bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 cursor-pointer group sticky mb-[200px]" style={{ top: 'calc(20vh + 140px)', zIndex: 8 }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#2EBAEB] rounded-lg w-14 h-14 flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                    <path d="M9 16h6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#2EBAEB] transition-colors">Reservly</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Prenotazioni</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2EBAEB] text-white">Gestione appuntamenti</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Piattaforma di prenotazione per il business moderno: web app e app mobile per semplificare appuntamenti e automatizzare i flussi.
              </p>
            </div>

            {/* Spacer finale - permette all'ultima card di staccarsi e mantenere la posizione */}
            <div style={{ height: '65vh' }}></div>
          </div>
        </div>
      </section>

      {/* Sezione Portfolio - 1920x2580 */}
      {/* z-index alto per passare sopra alla sezione servizi, ombra per effetto profondità */}
      <section
        ref={portfolioSectionRef}
        id="portfolio"
        className="w-full bg-black relative"
        style={{
          aspectRatio: '1920 / 2580',
          zIndex: 20,
          boxShadow: '0 -20px 50px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Sottosezione 1: I Nostri Clienti - 1920x1260 */}
        <div
          className="w-full relative flex flex-col items-center pt-16"
          style={{
            aspectRatio: '1920 / 1260'
          }}
        >
          {/* Infinite Grid Background */}
          <NoiseTexture />
          {/* Badge */}
          <span className="relative z-10 text-xs px-3 py-1 rounded-full border border-[#2EBAEB]/50 bg-[#2EBAEB]/10 text-[#2EBAEB] mb-4">
            Con chi abbiamo lavorato
          </span>

          {/* Titolo */}
          <h2 className="relative z-10 text-white text-4xl font-semibold mb-4">I nostri clienti</h2>

          {/* Descrizione */}
          <p className="relative z-10 text-gray-400 text-center max-w-2xl leading-relaxed px-4">
            Ci immedesimiamo nella visione dei nostri clienti, per comprendere e realizzare i loro
            obiettivi con la stessa cura e attenzione che dedicherebbero loro stessi. Questo
            approccio empatico ci permette di sviluppare soluzioni che rispecchiano non solo le
            esigenze, ma anche l'identità e le aspirazioni di chi ci sceglie come partner.
          </p>

          {/* Card 3D dei progetti - interattive */}
          <div className="relative z-10">
            <ProjectCards3D />
          </div>
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

        {/* Sezione: Contattaci */}
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
              {/* Badge - stile come SCOT "Coming Soon" */}
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
              <a
                href="#contatti"
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
              </a>
            </div>
          </div>

          {/* Icona stella/asterisco - ingrandita, esce dallo schermo in basso a sinistra */}
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
        </div>
      </section>

      {/* Sezione Software - animazione scala + fade */}
      <div ref={softwareSectionRef}>
        <SoftwareSection />
      </div>

      {/* Sezione: Lavora con noi */}
      <CareersSection />

      {/*
        ╔════════════════════════════════════════════════════════════════════╗
        ║  SEZIONE RESERVLY - TEMPORANEAMENTE NASCOSTA                       ║
        ║  NON ELIMINARE - Verrà riattivata prossimamente.                   ║
        ║  Data disattivazione: 15 Gennaio 2025                              ║
        ║  Contiene: Preview Reservly con badge "Coming Soon"                ║
        ╚════════════════════════════════════════════════════════════════════╝
      <section
        id="reservly"
        className="w-full bg-black relative"
        style={{
          aspectRatio: '1920 / 1080'
        }}
      >
        <NoiseTexture />

        <div className="absolute inset-0 flex flex-col px-8 lg:px-24 py-16 lg:py-24 z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#2EBAEB] text-[#2EBAEB] text-sm w-fit mb-4">
            COMING SOON
          </span>

          <h2 className="text-white font-medium leading-[1.1] max-w-5xl" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>
            Reservly è la piattaforma di prenotazione pensata per il business moderno.
          </h2>

          <div className="mt-auto ml-auto max-w-lg flex flex-col gap-6 pb-16 lg:pb-24">
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed">
              Una web app veloce e scalabile, affiancata da app mobile Flutter, progettata per semplificare le prenotazioni, automatizzare i flussi e migliorare l'esperienza di clienti e staff.
            </p>
            <p className="text-[#2EBAEB] text-lg lg:text-xl font-medium">
              Meno gestione, più controllo. Tutto in un unico sistema.
            </p>

            <Link
              to="/reservly"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#2a2a3a] hover:bg-[#3a3a4a] text-white text-sm font-medium rounded-full transition-colors w-fit"
            >
              Scopri Reservly
            </Link>
          </div>
        </div>
      </section>
      */}

      {/* Footer */}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/software/:softwareId" element={<SoftwarePage />} />
        <Route path="/reservly" element={<ReservlyPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/progetti/:projectSlug" element={<ProjectPage />} />
      </Routes>
    </>
  )
}

export default App
