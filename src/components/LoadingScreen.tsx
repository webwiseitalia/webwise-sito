import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

interface LoadingScreenProps {
  onLogoTransitionComplete: () => void
  heroLogoRef: React.RefObject<HTMLImageElement>
  onLogoArrived: () => void
}

export default function LoadingScreen({ onLogoTransitionComplete, heroLogoRef, onLogoArrived }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const circleRef = useRef<SVGCircleElement>(null)
  const progressCircleRef = useRef<SVGCircleElement>(null)

  const radius = 70
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const tl = gsap.timeline()

    // Animazione cerchio di caricamento - 2.5 secondi
    tl.fromTo(
      progressCircleRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power2.inOut',
      }
    )

    // Dopo il caricamento, fade out del cerchio
    tl.to([circleRef.current, progressCircleRef.current], {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Calcola la posizione del logo nella hero e anima
    tl.add(() => {
      if (heroLogoRef.current && logoRef.current) {
        const heroRect = heroLogoRef.current.getBoundingClientRect()
        const loadingLogoRect = logoRef.current.getBoundingClientRect()

        // Calcola la differenza di posizione
        const deltaX = heroRect.left + heroRect.width / 2 - (loadingLogoRect.left + loadingLogoRect.width / 2)
        const deltaY = heroRect.top + heroRect.height / 2 - (loadingLogoRect.top + loadingLogoRect.height / 2)

        // Scala dal logo grande (100px) al logo piccolo (125px nella hero)
        const targetScale = 125 / 100

        // Anima il logo verso la posizione nella hero
        gsap.to(logoRef.current, {
          x: deltaX,
          y: deltaY,
          scale: targetScale,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            // Quando il logo arriva, mostra quello della hero
            onLogoArrived()
          }
        })
      }
    })

    // Aspetta che il logo arrivi, poi fade out simultaneo del logo loading e del container
    tl.to(
      logoRef.current,
      {
        opacity: 0,
        duration: 0.15,
      },
      '+=0.85' // Aspetta la durata dell'animazione del logo (0.8s) + un piccolo margine
    )

    // Fade out del container nero INSIEME al logo
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      '-=0.15' // Inizia insieme al fade out del logo
    )

    // Callback finale
    tl.add(() => {
      onLogoTransitionComplete()
    })

    return () => {
      tl.kill()
    }
  }, [circumference, heroLogoRef, onLogoTransitionComplete, onLogoArrived])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Cerchio di caricamento SVG */}
        <svg
          className="absolute"
          width="180"
          height="180"
          viewBox="0 0 180 180"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Cerchio di sfondo */}
          <circle
            ref={circleRef}
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
          />
          {/* Cerchio di progresso */}
          <circle
            ref={progressCircleRef}
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#2EBAEB"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>

        {/* Logo Webwise */}
        <img
          ref={logoRef}
          src={logoWebwise}
          alt="Webwise"
          className="invert"
          style={{ width: '100px', height: '100px' }}
        />
      </div>
    </div>
  )
}
