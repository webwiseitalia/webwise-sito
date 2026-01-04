import { useState, useEffect, useRef } from 'react'

interface Project {
  id: number
  title: string
  image?: string
  href: string
}

const projects: Project[] = [
  { id: 1, title: 'Progetto 1', href: '#' },
  { id: 2, title: 'Progetto 2', href: '#' },
  { id: 3, title: 'Progetto 3', href: '#' },
  { id: 4, title: 'Progetto 4', href: '#' },
  { id: 5, title: 'Progetto 5', href: '#' },
  { id: 6, title: 'Progetto 6', href: '#' },
  { id: 7, title: 'Progetto 7', href: '#' },
  { id: 8, title: 'Progetto 8', href: '#' },
]

export default function ProjectCards3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: -25 })
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

      // Applica rotazione basata sulla posizione del mouse
      // rotateX: leggera inclinazione verticale
      // rotateY: rotazione orizzontale per vedere le card
      const newRotateX = normalizedY * 10
      const newRotateY = -25 + normalizedX * 15

      setRotation({ x: newRotateX, y: newRotateY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    // Reset graduale alla posizione originale
    setRotation({ x: 0, y: -25 })
  }

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
          transform: `rotateX(${rotation.x - 15}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          width: '650px',
          height: '380px'
        }}
      >
        {projects.map((project, index) => {
          // Centra le card: metà vanno avanti, metà indietro
          const centerIndex = (projects.length - 1) / 2
          const baseOffset = (index - centerIndex) * 100
          const isCardHovered = hoveredCard === index
          // Quando in hover, la card si alza verso l'alto (translateY negativo)
          const translateY = isCardHovered ? -80 : 0
          return (
            <a
              key={project.id}
              href={project.href}
              className="block w-full h-full overflow-hidden absolute cursor-pointer group"
              style={{
                backgroundColor: '#2EBAEB',
                backgroundImage: project.image ? `url(${project.image})` : undefined,
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
              {!project.image && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-800" />
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                {project.title}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-50" />
            </a>
          )
        })}
      </div>
    </div>
  )
}
