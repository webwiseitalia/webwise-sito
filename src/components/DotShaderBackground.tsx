import { useMemo, useEffect, useRef } from 'react'
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
    dotOpacity: 0.05
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

      float combinedMask = screenMask * circleMaskFromCenter;

      // Static dot size based on position only
      float dotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);

      float sdfDot = sdfCircle(gridUv, dotSize);

      float smoothDot = smoothstep(0.05, 0.0, sdfDot);

      // Static composition - no animations
      vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity);

      gl_FragColor = vec4(composition, 1.0);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `
)

// Componente Scene che usa dimensioni fisse
function Scene({ fixedWidth, fixedHeight }: { fixedWidth: number; fixedHeight: number }) {
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

export default function DotShaderBackground() {
  // Cattura le dimensioni della finestra una sola volta al mount
  const dimensionsRef = useRef({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  })

  return (
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
      />
    </Canvas>
  )
}
