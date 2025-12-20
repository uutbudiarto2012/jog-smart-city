'use client'

import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function City() {
  const { scene } = useGLTF('/models/city_scene.glb')

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

useGLTF.preload('/models/city_scene.glb')
