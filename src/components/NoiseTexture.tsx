import { useRef, useEffect, useState } from 'react'

interface NoiseTextureProps {
  className?: string
  opacity?: number
}

export default function NoiseTexture({ className = '', opacity = 0.15 }: NoiseTextureProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Infinite Grid con effetto hover */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(46, 186, 235, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(46, 186, 235, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Glow che segue il cursore - illumina la griglia */}
      {isHovering && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            width: 400,
            height: 400,
            background: `radial-gradient(circle, rgba(46, 186, 235, 0.15) 0%, rgba(46, 186, 235, 0.05) 30%, transparent 70%)`,
            mixBlendMode: 'screen'
          }}
        />
      )}

      {/* Griglia più visibile solo nell'area del cursore */}
      {isHovering && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: mousePos.x - 250,
            top: mousePos.y - 250,
            width: 500,
            height: 500,
            backgroundImage: `
              linear-gradient(to right, rgba(46, 186, 235, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(46, 186, 235, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: `${-mousePos.x + 250}px ${-mousePos.y + 250}px`,
            maskImage: 'radial-gradient(circle, black 0%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(circle, black 0%, transparent 60%)'
          }}
        />
      )}

      {/* Noise texture usando SVG filter */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
        <defs>
          <filter id="noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="mono"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Gradiente radiale per profondità - più intenso */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.95) 100%)'
        }}
      />

      {/* Fade verticale ai bordi - più ampio e deciso */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 5%, transparent 20%, transparent 80%, rgba(0,0,0,0.8) 95%, rgba(0,0,0,1) 100%)'
        }}
      />

      {/* Fade laterale per fusione con i bordi */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.6) 100%)'
        }}
      />
    </div>
  )
}
