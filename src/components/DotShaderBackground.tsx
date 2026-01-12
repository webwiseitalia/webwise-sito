import { useMemo, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Numero di punti nella scia
const TRAIL_LENGTH = 12

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
    glowRadius: 0.06,
    glowIntensity: 0.9,
    // Trail positions (array di vec2)
    trailPositions: Array(TRAIL_LENGTH).fill(null).map(() => new THREE.Vector2(0.5, 0.5)),
    trailLength: TRAIL_LENGTH
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
    uniform vec2 trailPositions[${TRAIL_LENGTH}];
    uniform int trailLength;

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

    // Calcola la distanza da un segmento di linea (per la scia continua)
    float sdfLine(vec2 p, vec2 a, vec2 b) {
        vec2 pa = p - a;
        vec2 ba = b - a;
        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        return length(pa - ba * h);
    }

    // Restituisce anche la posizione lungo il segmento (0-1)
    float sdfLineWithT(vec2 p, vec2 a, vec2 b, out float t) {
        vec2 pa = p - a;
        vec2 ba = b - a;
        t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        return length(pa - ba * t);
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
      float originalDotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);
      float uniformDotSize = 0.15;
      float dotSize = mix(originalDotSize, uniformDotSize, fillAmount);

      float sdfDot = sdfCircle(gridUv, dotSize);
      float smoothDot = smoothstep(0.05, 0.0, sdfDot);

      // Calcola il glow combinato dalla posizione attuale e dalla scia continua
      float totalGlow = 0.0;
      float aspectRatio = resolution.x / resolution.y;

      // Prepara le coordinate con aspect ratio corretto
      vec2 adjustedScreenUv = screenUv;
      adjustedScreenUv.x *= aspectRatio;

      // Glow dalla posizione attuale del mouse (più forte)
      vec2 adjustedMousePos = vec2(mousePos.x * aspectRatio, 1.0 - mousePos.y);
      float mouseDistance = length(adjustedScreenUv - adjustedMousePos);

      // Effetto accensione uniforme - step più netto
      float mainGlow = smoothstep(glowRadius, glowRadius * 0.7, mouseDistance);
      totalGlow = mainGlow;

      // Scia continua: calcola la distanza da ogni segmento della scia
      for (int i = 0; i < ${TRAIL_LENGTH - 1}; i++) {
        // Punti del segmento corrente
        vec2 pointA = vec2(trailPositions[i].x * aspectRatio, 1.0 - trailPositions[i].y);
        vec2 pointB = vec2(trailPositions[i + 1].x * aspectRatio, 1.0 - trailPositions[i + 1].y);

        // Calcola distanza dal segmento e posizione lungo di esso
        float t;
        float segmentDist = sdfLineWithT(adjustedScreenUv, pointA, pointB, t);

        // Intensità decrescente lungo la scia
        // i=0 è il segmento più vicino al mouse, i=TRAIL_LENGTH-2 è il più lontano
        float segmentProgress = (float(i) + t) / float(${TRAIL_LENGTH});
        float trailIntensity = 1.0 - segmentProgress;
        trailIntensity = pow(trailIntensity, 1.2); // Curva morbida

        // Raggio che si assottiglia lungo la scia (effetto cometa)
        float trailRadius = glowRadius * (0.9 - segmentProgress * 0.5);

        // Glow del segmento
        float segmentGlow = smoothstep(trailRadius, trailRadius * 0.5, segmentDist) * trailIntensity * 0.6;

        totalGlow = max(totalGlow, segmentGlow);
      }

      // Opacità finale: base + glow combinato
      float finalOpacity = dotOpacity + (totalGlow * glowIntensity);

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
  const rawMouse = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  // Trail tracking - memorizza le ultime posizioni
  const trailPositions = useRef<Array<{ x: number; y: number }>>(
    Array(TRAIL_LENGTH).fill(null).map(() => ({ x: 0.5, y: 0.5 }))
  )
  const frameCounter = useRef(0)

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

    const parent = containerRef.current.parentElement
    if (!parent) return { scale: 1, flipped: false }

    const style = window.getComputedStyle(parent)
    const transform = style.transform

    if (!transform || transform === 'none') {
      return { scale: 1, flipped: false }
    }

    const matrixMatch = transform.match(/matrix\(([^)]+)\)/)
    if (!matrixMatch) return { scale: 1, flipped: false }

    const values = matrixMatch[1].split(',').map(v => parseFloat(v.trim()))
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

      const { scale, flipped } = getTransformFromParent()

      let relX = rawMouse.current.x - centerX
      let relY = rawMouse.current.y - centerY

      const compensatedX = centerX + (relX / scale)
      let compensatedY = centerY + (relY / scale)

      if (flipped) {
        compensatedY = centerY - (relY / scale)
      }

      targetMouse.current.x = compensatedX / viewportWidth
      targetMouse.current.y = compensatedY / viewportHeight

      // Smoothing per il movimento principale
      const smoothing = 0.15
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * smoothing
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * smoothing

      // Aggiorna la scia ogni 3 frame per un effetto più fluido
      frameCounter.current++
      if (frameCounter.current >= 3) {
        frameCounter.current = 0

        // Shifta le posizioni della scia
        for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
          trailPositions.current[i] = { ...trailPositions.current[i - 1] }
        }
        // Aggiungi la nuova posizione all'inizio
        trailPositions.current[0] = {
          x: currentMouse.current.x,
          y: currentMouse.current.y
        }
      }

      // Aggiorna uniforms
      if (materialRef.current && materialRef.current.uniforms) {
        materialRef.current.uniforms.mousePos.value.set(
          currentMouse.current.x,
          currentMouse.current.y
        )

        // Aggiorna le posizioni della scia nello shader
        for (let i = 0; i < TRAIL_LENGTH; i++) {
          materialRef.current.uniforms.trailPositions.value[i].set(
            trailPositions.current[i].x,
            trailPositions.current[i].y
          )
        }
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
