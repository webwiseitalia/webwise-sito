import { useMemo } from 'react'

interface DiagonalLinesProps {
  className?: string
  lineColor?: string
  lineOpacity?: number
  lineSpacing?: number
  animationDuration?: number
}

export default function DiagonalLines({
  className = '',
  lineColor = 'rgba(255, 255, 255, 0.08)',
  lineSpacing = 80,
  animationDuration = 20
}: DiagonalLinesProps) {
  // Genera le linee diagonali
  const lines = useMemo(() => {
    const count = 30 // Numero di linee
    return Array.from({ length: count }, (_, i) => i)
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Container delle linee animate */}
      <div
        className="absolute inset-0"
        style={{
          transform: 'rotate(-25deg) scale(1.5)',
          transformOrigin: 'center center'
        }}
      >
        {lines.map((index) => (
          <div
            key={index}
            className="absolute h-px"
            style={{
              left: '-50%',
              right: '-50%',
              top: `${index * lineSpacing - 200}px`,
              background: `linear-gradient(90deg, transparent 0%, ${lineColor} 20%, ${lineColor} 80%, transparent 100%)`,
              animation: `diagonalMove ${animationDuration}s linear infinite`,
              animationDelay: `${(index * 0.5) % animationDuration}s`
            }}
          />
        ))}
      </div>

      {/* Fade ai bordi per transizione morbida */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 15%, transparent 85%, rgba(0,0,0,1) 100%)'
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.8) 100%)'
        }}
      />

      {/* CSS per l'animazione */}
      <style>{`
        @keyframes diagonalMove {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
