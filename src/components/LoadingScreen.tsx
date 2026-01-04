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

  useEffect(() => {
    const logo = logoRef.current
    if (!logo) return

    const tl = gsap.timeline()

    // Stato iniziale: logo grande visibile
    gsap.set(logo, {
      scale: 1,
      opacity: 1,
    })

    // Fase 1: Attesa 2 secondi (logo fermo visibile)
    tl.to({}, { duration: 2 })

    // Fase 2: Bounce elastico (più lento)
    tl.to(logo, {
      scale: 1.15,
      duration: 0.3,
      ease: 'power2.out',
    })
    tl.to(logo, {
      scale: 0.95,
      duration: 0.25,
      ease: 'power2.inOut',
    })
    tl.to(logo, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.inOut',
    })
    tl.to(logo, {
      scale: 1,
      duration: 0.25,
      ease: 'power2.out',
    })

    // Fase 3: Piccola pausa
    tl.to({}, { duration: 0.3 })

    // Fase 4: Calcola posizione hero e anima verso di essa
    tl.add(() => {
      if (heroLogoRef.current && logo) {
        const heroRect = heroLogoRef.current.getBoundingClientRect()
        const loadingLogoRect = logo.getBoundingClientRect()

        // Calcola la differenza di posizione
        const deltaX = heroRect.left + heroRect.width / 2 - (loadingLogoRect.left + loadingLogoRect.width / 2)
        const deltaY = heroRect.top + heroRect.height / 2 - (loadingLogoRect.top + loadingLogoRect.height / 2)

        // Scala dal logo grande (250px) al logo piccolo (125px nella hero)
        const targetScale = 125 / 250

        // Anima il logo verso la posizione nella hero
        gsap.to(logo, {
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

    // Aspetta che il logo arrivi, poi fade out
    tl.to(
      logo,
      {
        opacity: 0,
        duration: 0.15,
      },
      '+=0.85'
    )

    // Fade out del container nero
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      '-=0.15'
    )

    // Callback finale
    tl.add(() => {
      onLogoTransitionComplete()
    })

    return () => {
      tl.kill()
    }
  }, [heroLogoRef, onLogoTransitionComplete, onLogoArrived])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-none"
    >
      {/* Logo Webwise - inizia completamente blurrato (invisibile) */}
      <img
        ref={logoRef}
        src={logoWebwise}
        alt="Webwise"
        className="invert"
        style={{
          width: '250px',
          height: '250px',
        }}
      />
    </div>
  )
}
