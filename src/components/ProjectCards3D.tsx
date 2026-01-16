import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function ProjectCards3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: -15, y: -25 })
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)
  const [swipeRotationY, setSwipeRotationY] = useState(-25) // Rotazione Y controllata dallo swipe

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calcola quale card è in primo piano basandosi sulla rotazione Y
  const getFrontCardIndex = (rotY: number, totalCards: number) => {
    // rotY va da circa -90 (tutte visibili di lato) a +50/-50 (vedi il mazzo da un'angolazione)
    // Mappiamo la rotazione all'indice della card
    // Rotazione negativa = card con indice alto in primo piano
    // Rotazione positiva = card con indice basso in primo piano
    const normalized = (rotY + 90) / 140 // Normalizza da 0 a 1 (circa)
    const index = Math.round((1 - normalized) * (totalCards - 1))
    return Math.max(0, Math.min(totalCards - 1, index))
  }

  // Funzione per calcolare la rotazione basata sulla posizione (desktop)
  const calculateRotation = (clientX: number, clientY: number) => {
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

    setRotation({ x: newRotateX, y: newRotateY })
  }

  // Mouse events (desktop)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered || isMobile) return
      calculateRotation(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered, isMobile])

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
    // Sensibilità: 0.3 gradi per pixel di movimento (più bassa = più fluido)
    const newRotY = Math.max(-90, Math.min(50, swipeRotationY + deltaX * 0.3))

    setSwipeRotationY(newRotY)
    setRotation({ x: -15, y: newRotY })
    setTouchStartX(touchX)
  }

  const handleTouchEnd = () => {
    if (!isMobile) return
    setIsTouching(false)
    // Non resettiamo - manteniamo la posizione raggiunta
  }

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true)
  }
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false)
      setRotation({ x: -15, y: -25 })
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
          transition: isTouching ? 'transform 0.05s linear' : (isHovered ? 'transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)'),
          width: cardWidth,
          height: cardHeight
        }}
      >
        {cardProjects.map((project, index) => {
          // Centra le card: metà vanno avanti, metà indietro
          const centerIndex = (cardProjects.length - 1) / 2
          // Distanza tra le card (responsive)
          const baseOffset = (index - centerIndex) * cardSpacing

          // Su mobile: la card in primo piano si alza automaticamente
          // Su desktop: la card in hover si alza
          const isCardHovered = isMobile ? (frontCardIndex === index) : (hoveredCard === index)
          // Quando in hover/primo piano, la card si alza verso l'alto
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
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
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
