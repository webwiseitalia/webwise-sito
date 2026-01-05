import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

interface LoadingScreenProps {
  onLogoTransitionComplete: () => void
  heroLogoRef: React.RefObject<HTMLDivElement>
  onLogoArrived: () => void
  parallaxLogoRef?: React.RefObject<HTMLImageElement>
}

interface SnakePath {
  angle: number
  opacity: number
  pathData: string
  pathLength: number
}

// Genera un percorso sinuoso casuale per ogni serpente
function generateSnakePath(
  startX: number,
  startY: number,
  angle: number,
  maxDistance: number,
  centerX: number,
  centerY: number
): { pathData: string; pathLength: number } {
  const points: { x: number; y: number }[] = []
  const segments = 8 // Numero di segmenti della curva
  const segmentLength = maxDistance / segments

  let currentX = startX
  let currentY = startY
  let currentAngle = angle

  points.push({ x: currentX, y: currentY })

  for (let i = 0; i < segments; i++) {
    // Deviazione casuale dall'angolo (onde sinuose)
    const deviation = (Math.random() - 0.5) * 0.8 // ±0.4 radianti (~23 gradi)
    currentAngle += deviation

    // Calcola il prossimo punto
    currentX += Math.cos(currentAngle) * segmentLength
    currentY += Math.sin(currentAngle) * segmentLength

    points.push({ x: currentX, y: currentY })
  }

  // Costruisci il path SVG con curve di Bezier quadratiche per smoothness
  let pathData = `M ${points[0].x} ${points[0].y}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]

    // Punto di controllo per curva morbida
    const cpX = (prev.x + curr.x) / 2
    const cpY = (prev.y + curr.y) / 2

    if (i === 1) {
      pathData += ` Q ${prev.x} ${prev.y} ${cpX} ${cpY}`
    } else {
      pathData += ` T ${curr.x} ${curr.y}`
    }
  }

  // Calcola lunghezza approssimativa del path
  let pathLength = 0
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x
    const dy = points[i].y - points[i - 1].y
    pathLength += Math.sqrt(dx * dx + dy * dy)
  }

  return { pathData, pathLength }
}

// Genera i dati per tutti i serpenti
function generateSnakes(count: number, centerX: number, centerY: number, logoRadius: number, maxDistance: number): SnakePath[] {
  const snakes: SnakePath[] = []

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const opacity = 0.4 + Math.random() * 0.4 // 0.4-0.8

    // Punto di partenza sul bordo del logo
    const startX = centerX + Math.cos(angle) * logoRadius
    const startY = centerY + Math.sin(angle) * logoRadius

    const { pathData, pathLength } = generateSnakePath(
      startX,
      startY,
      angle,
      maxDistance * 1.1, // Oltre i bordi per assicurarsi che arrivino completamente
      centerX,
      centerY
    )

    snakes.push({ angle, opacity, pathData, pathLength })
  }

  return snakes
}

export default function LoadingScreen({ onLogoTransitionComplete, heroLogoRef, onLogoArrived, parallaxLogoRef }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const internalLogoRef = useRef<HTMLImageElement>(null)
  // Usa il ref esterno se fornito, altrimenti usa quello interno
  const logoRef = parallaxLogoRef || internalLogoRef
  const pathsRef = useRef<(SVGPathElement | null)[]>([])
  const percentageRef = useRef<HTMLDivElement>(null)

  // Genera i serpenti una sola volta con dimensioni dello schermo
  const snakes = useMemo(() => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 960
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 540
    const logoRadius = 175
    const maxDistance = Math.max(centerX, centerY)

    return generateSnakes(20, centerX, centerY, logoRadius, maxDistance)
  }, [])

  useEffect(() => {
    const logo = logoRef.current
    const paths = pathsRef.current.filter(Boolean) as SVGPathElement[]
    const percentageEl = percentageRef.current

    if (!logo || paths.length === 0 || !percentageEl) return

    const tl = gsap.timeline()

    // Stato iniziale: logo invisibile (per fade-in)
    gsap.set(logo, {
      scale: 1,
      opacity: 0,
    })

    // Stato iniziale: percentuale invisibile
    gsap.set(percentageEl, {
      opacity: 0,
    })

    // Durata del fade-in iniziale
    const fadeInDuration = 0.6

    // Fase 0: Fade-in del logo
    tl.to(logo, {
      opacity: 1,
      duration: fadeInDuration,
      ease: 'power2.out',
    }, 0)

    // Configura ogni serpente
    paths.forEach((path, i) => {
      const snake = snakes[i]
      if (!snake) return

      // Imposta il path
      path.setAttribute('d', snake.pathData)

      // Ottieni la lunghezza reale del path
      const realLength = path.getTotalLength()

      // Stato iniziale: serpente completamente nascosto (opacity 0)
      gsap.set(path, {
        strokeDasharray: realLength,
        strokeDashoffset: realLength,
        opacity: 0,
      })
    })

    // Fase 1: Serpenti si estendono gradualmente (dopo il fade-in) con partenza sfalsata
    paths.forEach((path, i) => {
      const snake = snakes[i]
      if (!snake) return

      const delay = fadeInDuration + Math.random() * 0.5 // Dopo fade-in + ritardo casuale 0-0.5s
      const duration = 1.5 + Math.random() * 0.5 // Durata variabile 1.5-2s

      // Fade-in del serpente insieme all'inizio dell'estensione
      tl.to(path, {
        opacity: snake.opacity,
        duration: 0.3,
        ease: 'power2.out',
      }, delay)

      tl.to(path, {
        strokeDashoffset: 0,
        duration: duration,
        ease: 'power1.out',
      }, delay)
    })

    // Fade-in e animazione percentuale sincronizzata con i serpenti (dopo il fade-in del logo)
    tl.to(percentageEl, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    }, fadeInDuration)

    const percentageObj = { value: 0 }
    tl.to(percentageObj, {
      value: 100,
      duration: 2.0,
      ease: 'power1.out',
      onUpdate: () => {
        percentageEl.textContent = `${Math.round(percentageObj.value)}%`
      }
    }, fadeInDuration)

    // Fase 2: Bounce del logo (inizia mentre i serpenti sono ancora estesi)
    // Il bounce "richiama" i serpenti
    const bounceStart = fadeInDuration + 2.0

    tl.to(logo, {
      scale: 1.15,
      duration: 0.25,
      ease: 'power2.out',
    }, bounceStart)

    // Al primo "atterraggio" del bounce, i serpenti vengono risucchiati
    // Usiamo offset negativo per far sparire dalla punta esterna verso il logo
    // Aggiungiamo anche opacity: 0 per nascondere eventuali pallini residui
    tl.to(paths, {
      strokeDashoffset: (i, target) => {
        return -target.getTotalLength()
      },
      opacity: 0,
      duration: 0.35,
      ease: 'power3.in',
    }, bounceStart + 0.25) // Inizia quando il logo inizia a scendere

    // Fade out della percentuale insieme ai serpenti
    tl.to(percentageEl, {
      opacity: 0,
      duration: 0.35,
      ease: 'power3.in',
    }, bounceStart + 0.25)

    tl.to(logo, {
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.inOut',
    }, bounceStart + 0.25)

    tl.to(logo, {
      scale: 1.05,
      duration: 0.15,
      ease: 'power2.inOut',
    }, bounceStart + 0.45)

    tl.to(logo, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    }, bounceStart + 0.6)

    // Fase 3: Piccola pausa
    tl.to({}, { duration: 0.2 }, bounceStart + 0.8)

    // Fase 4: Il logo si sposta verso la posizione nella hero (tra le colonne)
    tl.add(() => {
      if (heroLogoRef.current && logo) {
        const heroRect = heroLogoRef.current.getBoundingClientRect()
        const logoRect = logo.getBoundingClientRect()

        const deltaX = heroRect.left + heroRect.width / 2 - (logoRect.left + logoRect.width / 2)
        const deltaY = heroRect.top + heroRect.height / 2 - (logoRect.top + logoRect.height / 2)
        const targetScale = 125 / 350

        gsap.to(logo, {
          x: deltaX,
          y: deltaY,
          scale: targetScale,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            onLogoArrived()
          }
        })
      }
    }, bounceStart + 1.0)

    // Fade out del container nero (opacity), il logo resta visibile perché è fixed e fuori dal flusso
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      bounceStart + 1.85
    )

    // Callback finale
    tl.add(() => {
      onLogoTransitionComplete()
    }, bounceStart + 2.15)

    return () => {
      tl.kill()
    }
  }, [heroLogoRef, onLogoTransitionComplete, onLogoArrived, snakes])

  return (
    <>
      {/* Container dello sfondo nero e altri elementi */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-none"
      >
        {/* Serpenti SVG sinuosi */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {snakes.map((_, i) => (
            <path
              key={i}
              ref={(el) => { pathsRef.current[i] = el }}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </svg>

        {/* Percentuale di caricamento */}
        <div
          ref={percentageRef}
          className="absolute bottom-8 left-8 text-white font-bold"
          style={{
            fontSize: '120px',
            fontFamily: 'Moderniz, sans-serif',
            fontWeight: 700,
            letterSpacing: '-2px',
            opacity: 0,
          }}
        >
          0%
        </div>
      </div>

      {/* Logo Webwise - FUORI dal container per non essere influenzato dal fade out */}
      <img
        ref={logoRef}
        src={logoWebwise}
        alt="Webwise"
        className="invert pointer-events-none"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) translateZ(0)',
          width: '350px',
          height: '350px',
          opacity: 0,
          zIndex: 10000,
          backfaceVisibility: 'hidden',
        }}
      />
    </>
  )
}
