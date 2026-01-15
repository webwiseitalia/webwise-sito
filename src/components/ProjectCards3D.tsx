import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function ProjectCards3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: -15, y: -25 })
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calcola la distanza dal centro normalizzata (-1 a 1)
      const normalizedX = (e.clientX - centerX) / (rect.width / 2)
      const normalizedY = (e.clientY - centerY) / (rect.height / 2)

      // Calcola quanto siamo vicini al centro (0 = bordo, 1 = centro)
      const distanceFromCenter = 1 - Math.min(1, Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY))

      // ROTAZIONE Y (orizzontale):
      // - Ai bordi: inclinato (-35° a sinistra, -15° a destra)
      // - Al centro: quasi frontale (0°)
      const edgeRotateY = -25 + normalizedX * 15 // Range da -40 a -10 ai bordi
      const centerRotateY = normalizedX * 5 // Range da -5 a +5 al centro
      const newRotateY = edgeRotateY + (centerRotateY - edgeRotateY) * distanceFromCenter

      // ROTAZIONE X (verticale):
      // - Ai bordi: inclinato (-20° in alto, -10° in basso)
      // - Al centro: quasi piatto (-5°)
      const edgeRotateX = -15 + normalizedY * 8
      const centerRotateX = -5 + normalizedY * 3
      const newRotateX = edgeRotateX + (centerRotateX - edgeRotateX) * distanceFromCenter

      setRotation({ x: newRotateX, y: newRotateY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    // Reset graduale alla posizione originale (inclinato)
    setRotation({ x: -15, y: -25 })
  }

  // Usa i primi 8 progetti
  const cardProjects = projects.slice(0, 8)

  return (
    <div
      ref={containerRef}
      className="mt-20 w-full flex items-center justify-center"
      style={{
        perspective: '1500px',
        height: '700px'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          width: '650px',
          height: '380px'
        }}
      >
        {cardProjects.map((project, index) => {
          // Centra le card: metà vanno avanti, metà indietro
          const centerIndex = (cardProjects.length - 1) / 2
          // Distanza 150px tra le card
          const baseOffset = (index - centerIndex) * 150
          const isCardHovered = hoveredCard === index
          // Quando in hover, la card si alza verso l'alto
          const translateY = isCardHovered ? -80 : 0

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
                transition: 'transform 0.3s ease-out'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {!project.heroImage && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#2EBAEB] to-[#1a8fb8]" />
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div
                className="absolute top-0 left-0 right-0 p-4 text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-all transform -translate-y-4 group-hover:translate-y-0"
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
