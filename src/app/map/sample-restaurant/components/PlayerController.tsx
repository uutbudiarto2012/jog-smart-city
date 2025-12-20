'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SPEED = 6
const SPAWN_POSITION = new THREE.Vector3(-1, 2, 18)
const SPAWN_ROT_Y = Math.PI
const INTRO_POSITION = new THREE.Vector3(-1, 20, 180)

export default function PlayerController() {
  const introProgress = useRef(0) // 0 → 1
  const introDone = useRef(false)
  const { camera } = useThree()
  const direction = new THREE.Vector3()
  const keys = useRef<Record<string, boolean>>({})

  useEffect(() => {
    (window as any).respawnPlayer = () => {
      camera.position.copy(SPAWN_POSITION)
      camera.rotation.set(0, SPAWN_ROT_Y, 0)
    }
  }, [camera])

  useEffect(() => {
    camera.position.copy(INTRO_POSITION)
    camera.lookAt(SPAWN_POSITION)
  }, [camera])


  useEffect(() => {
    const down = (e: KeyboardEvent) => (keys.current[e.code] = true)
    const up = (e: KeyboardEvent) => (keys.current[e.code] = false)

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)

    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    const onWheel = (e: WheelEvent) => {
      cam.fov += e.deltaY * 0.5
      cam.fov = Math.min(Math.max(cam.fov, 30), 90) // clamp
      camera.updateProjectionMatrix()
    }

    window.addEventListener('wheel', onWheel)
    return () => window.removeEventListener('wheel', onWheel)
  }, [camera])

  useFrame((_, delta) => {
    direction.set(0, 0, 0)
    if (!introDone.current) {
      introProgress.current += delta / 2.5 // durasi 2.5 detik
      const t = Math.min(introProgress.current, 1)

      // smooth easing
      const ease = t * t * (3 - 2 * t)

      camera.position.lerpVectors(
        INTRO_POSITION,
        SPAWN_POSITION,
        ease
      )
      camera.lookAt(0, 0, 0)

      if (t >= 1) {
        introDone.current = true
        camera.rotation.set(0, 0, 0)
      }
      return
    }

    if (keys.current['KeyW']) direction.z -= 1
    if (keys.current['KeyS']) direction.z += 1
    if (keys.current['KeyA']) direction.x -= 1
    if (keys.current['KeyD']) direction.x += 1

    direction.normalize().multiplyScalar(SPEED * delta)

    camera.translateX(direction.x)
    camera.translateZ(direction.z)

    // lock tinggi kamera
    camera.position.y = 1.6


  })


  return null
}
