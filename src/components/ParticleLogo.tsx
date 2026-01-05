import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import logoSrc from '../assets/logo-webwise-anduril-_1_.svg'

gsap.registerPlugin(ScrollTrigger)

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

    // Calcola posizioni
    const getPositions = () => {
      const viewportCenterX = window.innerWidth / 2
      const viewportCenterY = window.innerHeight / 2

      let heroX = viewportCenterX
      let heroY = viewportCenterY
      if (heroLogoRef.current) {
        const rect = heroLogoRef.current.getBoundingClientRect()
        heroX = rect.left + rect.width / 2
        heroY = rect.top + rect.height / 2
      }

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

      if (phase2 >= 0.98) {
        // Arrivato alla fine: nascondi particelle e midframe logo, mostra logo statico servizi
        if (logoStatico) logoStatico.style.opacity = '1'
        if (midframeLogo) midframeLogo.style.opacity = '0'
        animationFrameRef.current = requestAnimationFrame(render)
        return
      } else {
        // Non ancora arrivato alla fine: nascondi logo statico servizi
        if (logoStatico) logoStatico.style.opacity = '0'
      }

      // ZONA MIDFRAME: quando phase1 >= 0.90 e phase2 <= 0.10, mostra logo pulito
      // Questa è la "zona morta" dove il logo è completamente visibile
      const inMidframeZone = phase1 >= 0.90 && phase2 <= 0.10

      if (inMidframeZone) {
        // Siamo nella zona midframe: logo pulito al 100%, niente particelle
        if (midframeLogo) midframeLogo.style.opacity = '1'
        currentX = positions.midframe.x
        currentY = positions.midframe.y
        currentSize = positions.midframe.size
        dissolveAmount = 0
        // Non disegnare particelle, esci
        animationFrameRef.current = requestAnimationFrame(render)
        return
      }

      if (phase2 > 0.10) {
        // FASE 2: Midframe -> Servizi (dopo la zona morta)
        // Nascondi logo midframe
        if (midframeLogo) midframeLogo.style.opacity = '0'

        // Ricalcola progress per la dissoluzione (0.10-0.25 dissolvi, 0.85-1.0 ricomponi)
        const adjustedPhase2 = (phase2 - 0.10) / 0.90  // Normalizza 0.10-1.0 a 0-1
        const dissolveProgress = adjustedPhase2 < 0.17
          ? adjustedPhase2 / 0.17  // Dissolvi nei primi 17% (circa 15% del range originale)
          : adjustedPhase2 > 0.83
            ? (1 - adjustedPhase2) / 0.17  // Ricomponi negli ultimi 17%
            : 1  // Completamente dissolto nel mezzo
        dissolveAmount = Math.sin(dissolveProgress * Math.PI / 2) * 0.95

        currentX = positions.midframe.x + (positions.servizi.x - positions.midframe.x) * phase2
        currentY = positions.midframe.y + (positions.servizi.y - positions.midframe.y) * phase2
        currentSize = positions.midframe.size + (positions.servizi.size - positions.midframe.size) * phase2
      } else if (phase1 > 0 && phase1 < 0.90) {
        // FASE 1: Hero -> Midframe (prima della zona morta)
        if (midframeLogo) midframeLogo.style.opacity = '0'

        // Ricalcola progress per la dissoluzione (0-0.15 dissolvi, 0.75-0.90 ricomponi)
        const dissolveProgress = phase1 < 0.15
          ? phase1 / 0.15  // Dissolvi nei primi 15%
          : phase1 > 0.75
            ? (0.90 - phase1) / 0.15  // Ricomponi tra 75% e 90%
            : 1  // Completamente dissolto nel mezzo
        dissolveAmount = Math.sin(dissolveProgress * Math.PI / 2) * 0.95

        currentX = positions.hero.x + (positions.midframe.x - positions.hero.x) * phase1
        currentY = positions.hero.y + (positions.midframe.y - positions.hero.y) * phase1
        currentSize = positions.hero.size + (positions.midframe.size - positions.hero.size) * phase1
      } else {
        // Stato iniziale o transizione
        currentX = positions.hero.x
        currentY = positions.hero.y
        currentSize = positions.hero.size
        dissolveAmount = 0
        if (midframeLogo) midframeLogo.style.opacity = '0'
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

    const setupTriggers = () => {
      if (!heroSectionRef.current || !midframeSectionRef.current || !serviziSectionRef.current) return

      trigger1 = ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: 'top top',
        endTrigger: midframeSectionRef.current,
        end: 'center center',
        scrub: 1,
        onUpdate: (self) => {
          progressRef.current.phase1 = self.progress
        }
      })

      trigger2 = ScrollTrigger.create({
        trigger: midframeSectionRef.current,
        start: 'center center',
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
