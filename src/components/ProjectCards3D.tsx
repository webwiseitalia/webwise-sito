import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

// Configurazione smoothness
const LERP_EASE = 0.08 // Più basso = più smooth (0.05-0.15)

export default function ProjectCards3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: -15, y: -25 })
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)
  const [swipeRotationY, setSwipeRotationY] = useState(-25)

  // Refs per il sistema LERP
  const targetRotationRef = useRef({ x: -15, y: -25 })
  const currentRotationRef = useRef({ x: -15, y: -25 })
  const animationFrameRef = useRef<number | null>(null)
  const hoveredCardRef = useRef<number | null>(null) // Per accedere a hoveredCard nel loop

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Loop LERP per movimento smooth
  useEffect(() => {
    const animate = () => {
      // LERP: current "insegue" target con easing
      const diffX = targetRotationRef.current.x - currentRotationRef.current.x
      const diffY = targetRotationRef.current.y - currentRotationRef.current.y

      currentRotationRef.current.x += diffX * LERP_EASE
      currentRotationRef.current.y += diffY * LERP_EASE

      // Aggiorna lo state solo se c'è un cambiamento significativo
      if (Math.abs(diffX) > 0.01 || Math.abs(diffY) > 0.01) {
        setRotation({
          x: currentRotationRef.current.x,
          y: currentRotationRef.current.y
        })
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Calcola quale card è in primo piano basandosi sulla rotazione Y
  const getFrontCardIndex = (rotY: number, totalCards: number) => {
    const normalized = (rotY + 90) / 140
    const index = Math.round((1 - normalized) * (totalCards - 1))
    return Math.max(0, Math.min(totalCards - 1, index))
  }

  // Funzione per aggiornare il TARGET (non direttamente la rotazione)
  const updateTargetRotation = useCallback((x: number, y: number) => {
    targetRotationRef.current = { x, y }
  }, [])

  // Funzione per calcolare la rotazione basata sulla posizione (desktop)
  const calculateRotation = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Posizione normalizzata (-1 a 1)
    const normalizedX = (clientX - centerX) / (rect.width / 2)
    const normalizedY = (clientY - centerY) / (rect.height / 2)

    // ROTAZIONE Y (orizzontale)
    const distFromCenterX = Math.abs(normalizedX)
    const sideViewAngle = -90
    const edgeAngle = -normalizedX * 50

    const centerInfluence = 1 - distFromCenterX
    const newRotateY = edgeAngle + (sideViewAngle - edgeAngle) * Math.pow(centerInfluence, 2)

    // ROTAZIONE X (verticale)
    const newRotateX = -10 + normalizedY * 10

    // Aggiorna il target, il LERP farà il resto
    updateTargetRotation(newRotateX, newRotateY)
  }, [updateTargetRotation])

  // Mouse events (desktop)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered || isMobile) return
      // Se c'è una card in hover, NON aggiornare la rotazione del mazzo
      // Questo permette all'alzata della carta di essere l'effetto principale
      if (hoveredCardRef.current !== null) return
      calculateRotation(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered, isMobile, calculateRotation])

  // Touch events (mobile) - Swipe orizzontale
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    setIsTouching(true)
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching || !isMobile) return

    const touchX = e.touches[0].clientX
    const deltaX = touchX - touchStartX

    // Calcola la nuova rotazione basata sullo swipe
    const newRotY = Math.max(-90, Math.min(50, swipeRotationY + deltaX * 0.3))

    setSwipeRotationY(newRotY)
    // Aggiorna il target per il LERP
    updateTargetRotation(-15, newRotY)
    setTouchStartX(touchX)
  }

  const handleTouchEnd = () => {
    if (!isMobile) return
    setIsTouching(false)
  }

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false)
      // Torna alla posizione di riposo
      updateTargetRotation(-15, -25)
    }
  }

  // Usa i primi 8 progetti (meno su mobile)
  const cardProjects = projects.slice(0, isMobile ? 5 : 8)

  // Calcola la card in primo piano per mobile
  const frontCardIndex = isMobile ? getFrontCardIndex(rotation.y, cardProjects.length) : null

  // Dimensioni responsive
  const containerHeight = isMobile ? '350px' : '700px'
  const cardWidth = isMobile ? '280px' : '650px'
  const cardHeight = isMobile ? '180px' : '380px'
  const cardSpacing = isMobile ? 50 : 150

  return (
    <div
      ref={containerRef}
      className="mt-8 lg:mt-20 w-full flex items-center justify-center touch-none"
      style={{
        perspective: '1500px',
        height: containerHeight
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          // Niente transition CSS - il LERP gestisce tutto
          width: cardWidth,
          height: cardHeight
        }}
      >
        {cardProjects.map((project, index) => {
          const centerIndex = (cardProjects.length - 1) / 2
          const baseOffset = (index - centerIndex) * cardSpacing

          const isCardHovered = isMobile ? (frontCardIndex === index) : (hoveredCard === index)
          const translateY = isCardHovered ? (isMobile ? -40 : -80) : 0

          return (
            <Link
              key={project.id}
              to={`/progetti/${project.slug}`}
              className="block w-full h-full overflow-hidden absolute cursor-pointer group"
              style={{
                backgroundColor: '#2EBAEB',
                backgroundImage: project.heroImage ? `url(${project.heroImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `translateZ(${baseOffset}px) translateY(${translateY}px)`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                zIndex: isCardHovered ? 100 : index,
                transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
              onMouseEnter={() => {
                if (!isMobile) {
                  setHoveredCard(index)
                  hoveredCardRef.current = index
                }
              }}
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredCard(null)
                  hoveredCardRef.current = null
                }
              }}
            >
              {!project.heroImage && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#2EBAEB] to-[#1a8fb8]" />
              )}
              <div className={`absolute inset-0 bg-black/30 transition-opacity ${isCardHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              <div
                className={`absolute top-0 left-0 right-0 p-4 text-white font-semibold text-lg transition-all transform ${isCardHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                {project.name}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-50" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
