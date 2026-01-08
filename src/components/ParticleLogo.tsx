import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import gsap from 'gsap'
import logoSrc from '../assets/logo-webwise-anduril-_1_.svg'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

interface Particle {
  originX: number
  originY: number
  explosionOffsetX: number
  explosionOffsetY: number
  color: string
  size: number
  speed: number
}

interface ParticleLogoProps {
  heroSectionRef: React.RefObject<HTMLElement | null>
  midframeSectionRef: React.RefObject<HTMLElement | null>
  serviziSectionRef: React.RefObject<HTMLElement | null>
  serviziBlockRef: React.RefObject<HTMLDivElement | null>
  heroLogoRef: React.RefObject<HTMLDivElement | null>
  isVisible: boolean
}

export default function ParticleLogo({
  heroSectionRef,
  midframeSectionRef,
  serviziSectionRef,
  serviziBlockRef,
  heroLogoRef,
  isVisible,
}: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const progressRef = useRef({ phase1: 0, phase2: 0 })
  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Posizione hero cachata - calcolata una sola volta quando il ref è pronto
    let heroPosition: { x: number; y: number } | null = null

    const getPositions = () => {
      const viewportCenterX = window.innerWidth / 2
      const viewportCenterY = window.innerHeight / 2

      // Calcola la posizione hero dal ref solo se non è già cachata
      if (!heroPosition && heroLogoRef.current) {
        const rect = heroLogoRef.current.getBoundingClientRect()
        heroPosition = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      }

      const heroX = heroPosition?.x ?? viewportCenterX
      const heroY = heroPosition?.y ?? viewportCenterY

      const stickyTopPx = 0.20 * window.innerHeight
      const maxWidth = Math.min(1280, window.innerWidth)
      const sectionPaddingLeft = 32
      const sectionLeft = (window.innerWidth - maxWidth) / 2 + sectionPaddingLeft

      let logoOffsetInBlock = 0
      if (serviziBlockRef.current) {
        const logoStatico = serviziBlockRef.current.querySelector('img')
        if (logoStatico) {
          logoOffsetInBlock = logoStatico.offsetTop
        }
      }

      return {
        hero: { x: heroX, y: heroY, size: 125 },
        midframe: { x: viewportCenterX, y: viewportCenterY, size: 546 },
        servizi: { x: sectionLeft + 62.5, y: stickyTopPx + logoOffsetInBlock + 62.5, size: 125 },
      }
    }

    // Aggiorna la posizione hero dopo un breve delay per assicurarsi che il layout sia stabile
    const updateHeroPosition = () => {
      if (heroLogoRef.current) {
        const rect = heroLogoRef.current.getBoundingClientRect()
        heroPosition = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        }
      }
    }

    // Aspetta che il layout sia stabile prima di calcolare la posizione
    setTimeout(updateHeroPosition, 100)

    // Flag per lo snap - definiti qui perché usati sia nel render che in handleWheel
    let isSnappingToMidframe = false

    // Carica immagine e crea particelle
    const loadParticles = () => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          const tempCanvas = document.createElement('canvas')
          const tempCtx = tempCanvas.getContext('2d')
          if (!tempCtx) {
            resolve()
            return
          }

          const sampleSize = 80
          tempCanvas.width = sampleSize
          tempCanvas.height = sampleSize

          tempCtx.drawImage(img, 0, 0, sampleSize, sampleSize)
          const imageData = tempCtx.getImageData(0, 0, sampleSize, sampleSize)
          const pixels = imageData.data

          const particles: Particle[] = []
          const step = 2

          for (let y = 0; y < sampleSize; y += step) {
            for (let x = 0; x < sampleSize; x += step) {
              const i = (y * sampleSize + x) * 4
              const alpha = pixels[i + 3]

              if (alpha > 50) {
                // Inverti colori (logo è nero, vogliamo bianco)
                const r = 255 - pixels[i]
                const g = 255 - pixels[i + 1]
                const b = 255 - pixels[i + 2]

                particles.push({
                  originX: x / sampleSize,
                  originY: y / sampleSize,
                  explosionOffsetX: (Math.random() - 0.5) * 300,
                  explosionOffsetY: (Math.random() - 0.5) * 300,
                  color: `rgb(${r}, ${g}, ${b})`,
                  size: 1.5 + Math.random() * 1.5,
                  speed: 0.7 + Math.random() * 0.6,
                })
              }
            }
          }

          particlesRef.current = particles
          isInitializedRef.current = true
          resolve()
        }
        img.onerror = () => resolve()
        img.src = logoSrc
      })
    }

    // Render loop
    const render = () => {
      if (!isInitializedRef.current || !ctx || particlesRef.current.length === 0) {
        animationFrameRef.current = requestAnimationFrame(render)
        return
      }

      const particles = particlesRef.current
      const { phase1, phase2 } = progressRef.current
      const positions = getPositions()

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let currentX: number
      let currentY: number
      let currentSize: number
      let dissolveAmount: number

      // Mostra/nascondi logo statico nella sezione servizi
      const logoStatico = serviziBlockRef.current?.querySelector('img') as HTMLImageElement | null

      // Gestione logo hero (quello tra le due scritte)
      const heroLogoImg = heroLogoRef.current?.querySelector('img') as HTMLImageElement | null

      if (phase1 === 0 && phase2 === 0) {
        // Non si è ancora scrollato: mostra logo hero pulito, nascondi particelle
        if (heroLogoImg) heroLogoImg.style.opacity = '1'
        if (logoStatico) logoStatico.style.opacity = '0'
        // Non disegnare particelle
        animationFrameRef.current = requestAnimationFrame(render)
        return
      } else {
        // Si sta scrollando: nascondi logo hero, mostra particelle
        if (heroLogoImg) heroLogoImg.style.opacity = '0'
      }

      // Logo grande nel midframe (creato dinamicamente se non esiste)
      let midframeLogo = document.getElementById('midframe-static-logo') as HTMLImageElement | null
      if (!midframeLogo) {
        midframeLogo = document.createElement('img')
        midframeLogo.id = 'midframe-static-logo'
        midframeLogo.src = heroLogoImg?.src || ''
        midframeLogo.className = 'invert pointer-events-none'
        midframeLogo.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 546px;
          height: 546px;
          z-index: 41;
          opacity: 0;
        `
        document.body.appendChild(midframeLogo)
      }

      if (phase2 >= 0.98 || (isSnappingToMidframe && phase2 > 0.80)) {
        // Arrivato alla fine OPPURE snap verso midframe in corso (con phase2 ancora alto):
        // Mostra logo statico servizi, nascondi particelle
        // Questo "congela" il logo finché lo snap non è ben avviato
        if (logoStatico) logoStatico.style.opacity = '1'
        if (midframeLogo) midframeLogo.style.opacity = '0'
        animationFrameRef.current = requestAnimationFrame(render)
        return
      } else {
        // Non ancora arrivato alla fine: nascondi logo statico servizi
        if (logoStatico) logoStatico.style.opacity = '0'
      }

      // Il logo nitido appare SOLO quando le particelle sono completamente ferme (dissolveAmount = 0)
      // Zona centrale: phase1 = 1 e phase2 = 0 (o molto vicino)
      const inCenterZone = phase1 >= 0.98 && phase2 <= 0.02

      if (midframeLogo) {
        // Logo nitido visibile solo nella zona centrale, istantaneamente (no fade)
        midframeLogo.style.opacity = inCenterZone ? '1' : '0'
      }

      if (inCenterZone) {
        // Nella zona centrale: logo nitido visibile, NASCONDI le particelle
        // Non disegnare nulla - esci dal render
        animationFrameRef.current = requestAnimationFrame(render)
        return
      } else if (phase2 > 0) {
        // FASE 2: Midframe -> Servizi
        // Ricalcola progress per la dissoluzione
        const dissolveProgress = phase2 < 0.20
          ? phase2 / 0.20  // Dissolvi nei primi 20%
          : phase2 > 0.80
            ? (1 - phase2) / 0.20  // Ricomponi negli ultimi 20%
            : 1  // Completamente dissolto nel mezzo
        dissolveAmount = Math.sin(dissolveProgress * Math.PI / 2) * 0.95

        currentX = positions.midframe.x + (positions.servizi.x - positions.midframe.x) * phase2
        currentY = positions.midframe.y + (positions.servizi.y - positions.midframe.y) * phase2
        currentSize = positions.midframe.size + (positions.servizi.size - positions.midframe.size) * phase2
      } else if (phase1 > 0) {
        // FASE 1: Hero -> Midframe
        // Le particelle si ricompongono gradualmente fino a formare il logo nitido
        const dissolveProgress = phase1 < 0.15
          ? phase1 / 0.15  // Dissolvi nei primi 15%
          : phase1 > 0.75
            ? (1 - phase1) / 0.25  // Ricomponi gradualmente tra 75% e 100%
            : 1  // Completamente dissolto nel mezzo
        dissolveAmount = Math.sin(Math.max(0, dissolveProgress) * Math.PI / 2) * 0.95

        currentX = positions.hero.x + (positions.midframe.x - positions.hero.x) * phase1
        currentY = positions.hero.y + (positions.midframe.y - positions.hero.y) * phase1
        currentSize = positions.hero.size + (positions.midframe.size - positions.hero.size) * phase1
      } else {
        // Stato iniziale
        currentX = positions.hero.x
        currentY = positions.hero.y
        currentSize = positions.hero.size
        dissolveAmount = 0
      }

      // Disegna particelle
      particles.forEach((particle) => {
        const baseX = currentX - currentSize / 2 + particle.originX * currentSize
        const baseY = currentY - currentSize / 2 + particle.originY * currentSize

        const offsetX = particle.explosionOffsetX * dissolveAmount * particle.speed
        const offsetY = particle.explosionOffsetY * dissolveAmount * particle.speed

        const finalX = baseX + offsetX
        const finalY = baseY + offsetY

        const opacity = 1 - dissolveAmount * 0.2
        const size = particle.size * (1 + dissolveAmount * 0.8)

        ctx.beginPath()
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(render)
    }

    // Setup ScrollTriggers
    let trigger1: ScrollTrigger | null = null
    let trigger2: ScrollTrigger | null = null
    let isAnimating = false

    const handleWheel = (e: WheelEvent) => {
      // Se stiamo animando, BLOCCA TUTTI gli scroll (anche quelli fuori dalle zone snap)
      if (isAnimating) {
        e.preventDefault()
        return
      }

      const { phase1, phase2 } = progressRef.current
      const direction = e.deltaY > 0 ? 'down' : 'up'

      // Zona snap 1: hero ↔ midframe (phase1 tra 0 e 1, phase2 = 0)
      // - Scendendo: phase1 < 0.99 → vai a phase1 = 1
      // - Salendo: phase1 > 0.01 → vai a phase1 = 0
      const inSnapZone1 = phase2 === 0 && (
        (direction === 'down' && phase1 < 0.99) ||
        (direction === 'up' && phase1 > 0.01)
      )

      // Zona snap 2: midframe ↔ servizi
      // La "linea di taglio" è il bordo superiore della prima card (35vh dalla top della viewport)
      // - Scendendo dal midframe: snap verso servizi (phase2 basso)
      // - Salendo dalla sezione servizi: snap SOLO se siamo SOPRA la linea delle card
      const cardLineY = window.innerHeight * 0.35 // 35vh - linea verde dove si ferma la card Ecommerce

      // Trova la prima card per verificare se siamo sopra di essa
      const firstCard = document.querySelector('.service-card') as HTMLElement | null
      let isAboveCardLine = false

      if (firstCard && serviziSectionRef.current) {
        const cardRect = firstCard.getBoundingClientRect()
        // Se il top della card è sotto il 35vh della viewport, siamo sopra la linea
        // Cioè la card non ha ancora raggiunto la sua posizione sticky
        isAboveCardLine = cardRect.top > cardLineY
      }

      const inSnapZone2 = phase1 >= 0.99 && (
        // Scendendo: snap quando siamo al midframe
        (direction === 'down' && phase2 < 0.05) ||
        // Salendo: snap IMMEDIATAMENTE quando il logo statico servizi è visibile (phase2 >= 0.98)
        // Questo parte PRIMA che le particelle appaiano
        (direction === 'up' && phase2 >= 0.98)
      )

      const inAnySnapZone = inSnapZone1 || inSnapZone2

      // Se non siamo in zona snap, lascia scrollare
      if (!inAnySnapZone) return

      // Primo scroll in zona snap: BLOCCA e avvia animazione
      e.preventDefault()
      isAnimating = true

      // Se stiamo snappando da servizi verso midframe, setta il flag per congelare il logo
      if (inSnapZone2 && direction === 'up') {
        isSnappingToMidframe = true
      }

      const trigger = inSnapZone1 ? trigger1 : trigger2

      if (!trigger) {
        isAnimating = false
        isSnappingToMidframe = false
        return
      }

      const targetProgress = direction === 'down' ? 1 : 0
      const targetScroll = trigger.start + (trigger.end - trigger.start) * targetProgress

      gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimating = false
          isSnappingToMidframe = false
        }
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    const setupTriggers = () => {
      if (!heroSectionRef.current || !midframeSectionRef.current || !serviziSectionRef.current) return

      trigger1 = ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: 'top top',
        endTrigger: midframeSectionRef.current,
        end: 'top+=33% center',  // Arriva al logo nitido dopo 1/3 della sezione midframe
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current.phase1 = self.progress
        }
      })

      trigger2 = ScrollTrigger.create({
        trigger: midframeSectionRef.current,
        start: 'bottom-=33% center',  // Riparte quando manca 1/3 alla fine della sezione
        endTrigger: serviziSectionRef.current,
        end: 'top top',
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current.phase2 = self.progress
        }
      })
    }

    // Inizializza tutto
    loadParticles().then(() => {
      setupTriggers()
      animationFrameRef.current = requestAnimationFrame(render)
    })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('wheel', handleWheel)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (trigger1) trigger1.kill()
      if (trigger2) trigger2.kill()
      // Rimuovi il logo midframe creato dinamicamente
      const midframeLogo = document.getElementById('midframe-static-logo')
      if (midframeLogo) midframeLogo.remove()
    }
  }, [isVisible, heroSectionRef, midframeSectionRef, serviziSectionRef, serviziBlockRef, heroLogoRef])

  if (!isVisible) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 40 }}
    />
  )
}
