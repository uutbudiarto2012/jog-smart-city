'use client'

export default function Mountains() {
  return (
    <>
      <mesh position={[-200, 40, -300]}>
        <coneGeometry args={[120, 120, 32]} />
        <meshStandardMaterial color="#4b5d3a" />
      </mesh>
      
      <mesh position={[250, 50, -350]}>
        <coneGeometry args={[160, 160, 32]} />
        <meshStandardMaterial color="#556b2f" />
      </mesh>

      <mesh position={[0, 60, -500]}>
        <coneGeometry args={[300, 200, 32]} />
        <meshStandardMaterial color="#3f4f2f" />
      </mesh>
    </>
  )
}
