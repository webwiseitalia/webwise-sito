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
      maxDistance * 0.75, // 3/4 della distanza massima
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

    if (!logo || paths.length === 0) return

    const tl = gsap.timeline()

    // Stato iniziale: logo grande visibile
    gsap.set(logo, {
      scale: 1,
      opacity: 1,
    })

    // Configura ogni serpente
    paths.forEach((path, i) => {
      const snake = snakes[i]
      if (!snake) return

      // Imposta il path
      path.setAttribute('d', snake.pathData)

      // Ottieni la lunghezza reale del path
      const realLength = path.getTotalLength()

      // Stato iniziale: serpente nascosto
      gsap.set(path, {
        strokeDasharray: realLength,
        strokeDashoffset: realLength,
        opacity: snake.opacity,
      })
    })

    // Fase 1: Serpenti si estendono gradualmente (1.8 secondi) con partenza sfalsata
    paths.forEach((path, i) => {
      const delay = Math.random() * 0.5 // Ritardo casuale 0-0.5s
      const duration = 1.5 + Math.random() * 0.5 // Durata variabile 1.5-2s

      tl.to(path, {
        strokeDashoffset: 0,
        duration: duration,
        ease: 'power1.out',
      }, delay)
    })

    // Fase 2: Bounce del logo (inizia mentre i serpenti sono ancora estesi)
    // Il bounce "richiama" i serpenti
    const bounceStart = 2.0

    tl.to(logo, {
      scale: 1.15,
      duration: 0.25,
      ease: 'power2.out',
    }, bounceStart)

    // Al primo "atterraggio" del bounce, i serpenti vengono risucchiati
    tl.to(paths, {
      strokeDashoffset: (i, target) => {
        return target.getTotalLength()
      },
      duration: 0.35,
      ease: 'power3.in',
    }, bounceStart + 0.25) // Inizia quando il logo inizia a scendere

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
        }}
      />
    </div>
  )
}
