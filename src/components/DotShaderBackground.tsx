import { useMemo, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    dotColor: new THREE.Color('#FFFFFF'),
    bgColor: new THREE.Color('#000000'),
    rotation: 0,
    gridSize: 50,
    dotOpacity: 0.05,
    fillAmount: 0.0,
    mousePos: new THREE.Vector2(0.5, 0.5),
    glowRadius: 0.08,
    glowIntensity: 0.8
  },
  /* glsl */ `
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl */ `
    uniform vec2 resolution;
    uniform vec3 dotColor;
    uniform vec3 bgColor;
    uniform float rotation;
    uniform float gridSize;
    uniform float dotOpacity;
    uniform float fillAmount;
    uniform vec2 mousePos;
    uniform float glowRadius;
    uniform float glowIntensity;

    vec2 rotate(vec2 uv, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        mat2 rotationMatrix = mat2(c, -s, s, c);
        return rotationMatrix * (uv - 0.5) + 0.5;
    }

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 rotatedUv = rotate(uv, rotation);

      // Create a grid
      vec2 gridUv = fract(rotatedUv * gridSize);

      // Screen mask
      float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y);
      vec2 centerDisplace = vec2(0.7, 1.1);
      float circleMaskCenter = length(uv - centerDisplace);
      float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);

      // Interpola tra la maschera originale (con zona vuota) e 1.0 (tutto pieno)
      float adjustedCircleMask = mix(circleMaskFromCenter, 1.0, fillAmount);
      float combinedMask = screenMask * adjustedCircleMask;

      // Static dot size based on position only
      // Anche la dimensione dei pallini deve essere uniforme quando fillAmount = 1
      float originalDotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);
      float uniformDotSize = 0.15; // Dimensione uniforme per i pallini
      float dotSize = mix(originalDotSize, uniformDotSize, fillAmount);

      float sdfDot = sdfCircle(gridUv, dotSize);

      float smoothDot = smoothstep(0.05, 0.0, sdfDot);

      // Mouse glow effect - illumina i puntini vicino al cursore
      vec2 adjustedMousePos = vec2(mousePos.x, 1.0 - mousePos.y);
      vec2 diff = screenUv - adjustedMousePos;
      diff.x *= resolution.x / resolution.y; // Correzione aspect ratio per cerchio perfetto
      float mouseDistance = length(diff);

      // Effetto sharp con bordi netti
      float rawGlow = smoothstep(glowRadius, glowRadius * 0.3, mouseDistance);
      float mouseGlow = pow(rawGlow, 0.25);

      // Opacità finale: base + glow del mouse
      float finalOpacity = dotOpacity + (mouseGlow * glowIntensity);

      // Static composition con mouse glow
      vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * finalOpacity);

      gl_FragColor = vec4(composition, 1.0);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
)

// Interfaccia per il ref esposto
export interface DotShaderBackgroundRef {
  setFillAmount: (value: number) => void
}

// Componente Scene che usa dimensioni fisse
interface SceneProps {
  fixedWidth: number
  fixedHeight: number
  materialRef: React.MutableRefObject<typeof DotMaterial | null>
}

function Scene({ fixedWidth, fixedHeight, materialRef }: SceneProps) {
  const { viewport } = useThree()

  const rotation = 0
  const gridSize = 100

  // Colori fissi per tema dark
  const themeColors = {
    dotColor: '#FFFFFF',
    bgColor: '#000000',
    dotOpacity: 0.025
  }

  const dotMaterial = useMemo(() => {
    return new DotMaterial()
  }, [])

  // Salva il riferimento al materiale
  useEffect(() => {
    materialRef.current = dotMaterial
  }, [dotMaterial, materialRef])

  useEffect(() => {
    dotMaterial.uniforms.dotColor.value.setHex(parseInt(themeColors.dotColor.replace('#', ''), 16))
    dotMaterial.uniforms.bgColor.value.setHex(parseInt(themeColors.bgColor.replace('#', ''), 16))
    dotMaterial.uniforms.dotOpacity.value = themeColors.dotOpacity
  }, [dotMaterial, themeColors])

  // Usa dimensioni fisse invece di quelle dinamiche
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1
  const scale = Math.max(viewport.width, viewport.height) / 2

  return (
    <mesh scale={[scale, scale, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        resolution={[fixedWidth * dpr, fixedHeight * dpr]}
        rotation={rotation}
        gridSize={gridSize}
      />
    </mesh>
  )
}

const DotShaderBackground = forwardRef<DotShaderBackgroundRef>((_, ref) => {
  // Cattura le dimensioni della finestra una sola volta al mount
  const dimensionsRef = useRef({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  })

  const materialRef = useRef<typeof DotMaterial | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking con smoothing
  const targetMouse = useRef({ x: 0.5, y: 0.5 })
  const currentMouse = useRef({ x: 0.5, y: 0.5 })
  const rawMouse = useRef({ x: 0, y: 0 }) // Posizione raw del mouse in pixel
  const animationFrameRef = useRef<number>()

  // Esponi il metodo setFillAmount
  useImperativeHandle(ref, () => ({
    setFillAmount: (value: number) => {
      if (materialRef.current && materialRef.current.uniforms) {
        materialRef.current.uniforms.fillAmount.value = value
      }
    }
  }))

  // Funzione per estrarre scala e flip dalla matrice CSS
  const getTransformFromParent = (): { scale: number; flipped: boolean } => {
    if (!containerRef.current) return { scale: 1, flipped: false }

    // Risali al parent che ha la trasformazione (heroShaderRef)
    const parent = containerRef.current.parentElement
    if (!parent) return { scale: 1, flipped: false }

    const style = window.getComputedStyle(parent)
    const transform = style.transform

    if (!transform || transform === 'none') {
      return { scale: 1, flipped: false }
    }

    // Parse della matrice CSS: matrix(a, b, c, d, tx, ty)
    const matrixMatch = transform.match(/matrix\(([^)]+)\)/)
    if (!matrixMatch) return { scale: 1, flipped: false }

    const values = matrixMatch[1].split(',').map(v => parseFloat(v.trim()))
    // a = values[0], d = values[3]
    // scale = |a|, flipped = d < 0
    const scaleX = Math.abs(values[0])
    const scaleY = values[3]
    const flipped = scaleY < 0

    return { scale: scaleX, flipped }
  }

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawMouse.current.x = e.clientX
      rawMouse.current.y = e.clientY
    }

    // Animation loop per smooth mouse movement
    const animate = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const centerX = viewportWidth / 2
      const centerY = viewportHeight / 2

      // Ottieni trasformazioni correnti dal parent CSS
      const { scale, flipped } = getTransformFromParent()

      // Calcola posizione relativa al centro
      let relX = rawMouse.current.x - centerX
      let relY = rawMouse.current.y - centerY

      // Compensa per la scala: quando il bg è scalato 2x, il mouse deve muoversi "di più"
      const compensatedX = centerX + (relX / scale)
      let compensatedY = centerY + (relY / scale)

      // Compensa per il flip: quando flippato, inverti Y rispetto al centro
      if (flipped) {
        compensatedY = centerY - (relY / scale)
      }

      // Normalizza a 0-1
      targetMouse.current.x = compensatedX / viewportWidth
      targetMouse.current.y = compensatedY / viewportHeight

      // Smoothing
      const smoothing = 0.15
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * smoothing
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * smoothing

      // Aggiorna uniform del mouse
      if (materialRef.current && materialRef.current.uniforms) {
        materialRef.current.uniforms.mousePos.value.set(
          currentMouse.current.x,
          currentMouse.current.y
        )
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        // Disabilita il resize automatico del canvas durante lo scroll
        resize={{ scroll: false }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene
          fixedWidth={dimensionsRef.current.width}
          fixedHeight={dimensionsRef.current.height}
          materialRef={materialRef}
        />
      </Canvas>
    </div>
  )
})

DotShaderBackground.displayName = 'DotShaderBackground'

export default DotShaderBackground
