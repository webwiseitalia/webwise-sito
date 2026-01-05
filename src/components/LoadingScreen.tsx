import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

interface LoadingScreenProps {
  onLogoTransitionComplete: () => void
  heroLogoRef: React.RefObject<HTMLImageElement>
  onLogoArrived: () => void
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

export default function LoadingScreen({ onLogoTransitionComplete, heroLogoRef, onLogoArrived }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const pathsRef = useRef<(SVGPathElement | null)[]>([])
  const percentageRef = useRef<HTMLDivElement>(null)
  const percentageColorRef = useRef<HTMLDivElement>(null)

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
    const percentageColorEl = percentageColorRef.current

    if (!logo || paths.length === 0 || !percentageEl || !percentageColorEl) return

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

    // Configura ogni serpente e memorizza le lunghezze reali
    const pathLengths: number[] = []
    paths.forEach((path, i) => {
      const snake = snakes[i]
      if (!snake) return

      // Imposta il path
      path.setAttribute('d', snake.pathData)

      // Ottieni la lunghezza reale del path
      const realLength = path.getTotalLength()
      pathLengths[i] = realLength

      // Stato iniziale: serpente completamente nascosto (opacity 0, strokeDashoffset = lunghezza totale)
      gsap.set(path, {
        strokeDasharray: realLength,
        strokeDashoffset: realLength,
        opacity: 0, // Nascosto finché l'animazione non parte
      })
    })

    // Fade-in delle percentuali (dopo il fade-in del logo)
    tl.to([percentageEl, percentageColorEl], {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    }, fadeInDuration)

    // Animazione sincronizzata: percentuale, clip-path E vermicelli insieme (2 secondi, lineare)
    const percentageObj = { value: 0 }
    tl.to(percentageObj, {
      value: 100,
      duration: 2.0,
      ease: 'none',
      onUpdate: () => {
        const currentValue = Math.round(percentageObj.value)
        const progress = percentageObj.value / 100 // 0 -> 1

        // Aggiorna il testo di entrambe le percentuali
        percentageEl.textContent = `${currentValue}%`
        percentageColorEl.textContent = `${currentValue}%`

        // Aggiorna clip-path per rivelare il colore dal basso verso l'alto
        const clipTop = 100 - percentageObj.value
        percentageColorEl.style.clipPath = `inset(${clipTop}% 0 0 0)`

        // Aggiorna la lunghezza di tutti i vermicelli proporzionalmente alla percentuale
        paths.forEach((path, i) => {
          const realLength = pathLengths[i]
          const snake = snakes[i]
          if (realLength && snake) {
            // strokeDashoffset: da realLength (nascosto) a 0 (completamente visibile)
            const offset = realLength * (1 - progress)
            // Mostra il vermicello solo se ha iniziato a crescere (progress > 0)
            const opacity = progress > 0 ? snake.opacity : 0
            gsap.set(path, { strokeDashoffset: offset, opacity })
          }
        })
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

    // Fase 4: Calcola posizione hero e anima verso di essa
    tl.add(() => {
      if (heroLogoRef.current && logo) {
        const heroRect = heroLogoRef.current.getBoundingClientRect()
        const loadingLogoRect = logo.getBoundingClientRect()

        const deltaX = heroRect.left + heroRect.width / 2 - (loadingLogoRect.left + loadingLogoRect.width / 2)
        const deltaY = heroRect.top + heroRect.height / 2 - (loadingLogoRect.top + loadingLogoRect.height / 2)

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

    // Aspetta che il logo arrivi, poi fade out
    tl.to(
      logo,
      {
        opacity: 0,
        duration: 0.15,
      },
      bounceStart + 1.85
    )

    // Fade out del container nero
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

      {/* Logo Webwise */}
      <img
        ref={logoRef}
        src={logoWebwise}
        alt="Webwise"
        className="invert relative z-10"
        style={{
          width: '350px',
          height: '350px',
          opacity: 0,
        }}
      />

      {/* Percentuale di caricamento - due layer sovrapposti, in basso a sinistra */}
      {/* Testo bianco (sotto) */}
      <div
        ref={percentageRef}
        className="absolute bottom-8 left-8 font-bold"
        style={{
          fontSize: '120px',
          fontFamily: 'Moderniz, sans-serif',
          fontWeight: 700,
          letterSpacing: '-2px',
          opacity: 0,
          color: 'white',
        }}
      >
        0%
      </div>
      {/* Testo colorato (sopra) con clip-path */}
      <div
        ref={percentageColorRef}
        className="absolute bottom-8 left-8 font-bold"
        style={{
          fontSize: '120px',
          fontFamily: 'Moderniz, sans-serif',
          fontWeight: 700,
          letterSpacing: '-2px',
          color: '#2EBAEB',
          clipPath: 'inset(100% 0 0 0)',
        }}
      >
        0%
      </div>
    </div>
  )
}
