'use client'

import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function Resto() {
  const { scene } = useGLTF('/models/restaurant-1.glb')

  useEffect(() => {
    window.dispatchEvent(new Event('world-loaded'))
  }, [])
  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
    />
  )
}

useGLTF.preload('/models/restaurant-1.glb')
