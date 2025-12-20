'use client'
import { PointerLockControls, Sky } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import City from './City'
import PlayerController from './PlayerController'
import { Suspense } from 'react'
import WorldLoader from './WorldLoader'
import Mountains from './Mountains'

export default function WorldCanvas() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 65,
          position: [0, 1.60, 53.61],
        }}
      >
        <Sky
          distance={450000}
          sunPosition={[5, 1, 8]}
          inclination={0.6}
          azimuth={0.25}
        />
        <fog attach="fog" args={['#cfd8dc', 200, 900]} />
        {/* <Environment preset="night" /> */}
        {/* LIGHT */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[2000, 2000]} />
          <meshStandardMaterial color="#3a7d3a" />
        </mesh>
        {/* MAP */}
        <GrassGround />
        <Suspense fallback={null}>
          <Mountains />
          <City />
        </Suspense>
        {/* PLAYER */}
        <PlayerController />

        {/* MOUSE LOOK */}
        <PointerLockControls />
      </Canvas>
      <Suspense fallback={null}>
        <WorldLoader />
      </Suspense>
    </>
  )
}

function GrassGround() {
  const colorMap = useLoader(
    THREE.TextureLoader,
    '/textures/rumput.png'
  )
  const normalMap = useLoader(
    THREE.TextureLoader,
    '/textures/rumput.png'
  )
  const roughnessMap = useLoader(
    THREE.TextureLoader,
    '/textures/rumput.png'
  )

  // repeat biar nggak blur
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping

  colorMap.repeat.set(100, 100)
  normalMap.repeat.set(100, 100)
  roughnessMap.repeat.set(100, 100)

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
    >
      <planeGeometry args={[2000, 2000]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}

