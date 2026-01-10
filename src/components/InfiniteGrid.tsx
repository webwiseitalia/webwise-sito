import { useMemo, useId } from 'react'
import { motion } from 'framer-motion'

interface InfiniteGridProps {
  className?: string
}

interface GridLineProps {
  direction: 'horizontal' | 'vertical'
  position: number
}

function GridLine({ direction, position }: GridLineProps) {
  const style =
    direction === 'horizontal'
      ? {
          top: `${position}%`,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
        }
      : {
          left: `${position}%`,
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
        }

  return (
    <div
      className="absolute"
      style={style}
    />
  )
}

interface BlurredSphereProps {
  size: number
  color: string
  position: { x: number; y: number }
  duration: number
  delay: number
}

function BlurredSphere({ size, color, position, duration, delay }: BlurredSphereProps) {
  return (
    <motion.div
      className="absolute rounded-full opacity-40"
      style={{
        width: `${size}%`,
        height: `${size}%`,
        background: color,
        filter: 'blur(70px)',
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      animate={{
        y: [0, -15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function InfiniteGrid({ className = '' }: InfiniteGridProps) {
  const instanceId = useId()

  const gridLines = useMemo(() => {
    const horizontal = Array.from({ length: 12 }, (_, i) => (i + 1) * 8)
    const vertical = Array.from({ length: 12 }, (_, i) => (i + 1) * 8)
    return { horizontal, vertical }
  }, [])

  const highlightColor = '#2EBAEB'

  const spheres = useMemo(
    () => [
      // Lato sinistro - in alto
      {
        size: 30,
        color: highlightColor,
        position: { x: -10, y: 10 },
        duration: 12,
        delay: 0,
      },
      // Lato destro - in basso (sfalsata)
      {
        size: 30,
        color: highlightColor,
        position: { x: 85, y: 55 },
        duration: 13,
        delay: 1,
      },
    ],
    []
  )

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Grid Container */}
      <div className="absolute inset-0">
        {/* Grid Lines */}
        {gridLines.horizontal.map((position, index) => (
          <GridLine
            key={`${instanceId}-h-${index}`}
            direction="horizontal"
            position={position}
          />
        ))}
        {gridLines.vertical.map((position, index) => (
          <GridLine
            key={`${instanceId}-v-${index}`}
            direction="vertical"
            position={position}
          />
        ))}

        {/* Blurred Spheres - posizionate ai lati */}
        {spheres.map((sphere, index) => (
          <BlurredSphere key={`${instanceId}-sphere-${index}`} {...sphere} />
        ))}

        {/* Edge fade overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.9) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.9) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.9) 100%)',
          }}
        />
      </div>
    </div>
  )
}
