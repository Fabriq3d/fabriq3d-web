'use client'

import { useEffect, useRef } from 'react'
import { Mesh, MeshStandardMaterial } from 'three'
import { Text } from '@react-three/drei'

interface KeychainModelProps {
  design: {
    text: string
    color: string
    model: string
  }
}

export default function KeychainModel({ design }: KeychainModelProps) {
  const meshRef = useRef<Mesh>(null)

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as MeshStandardMaterial
      material.color.set(design.color)
    }
  }, [design.color])

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color={design.color} />
      </mesh>
      
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {design.text || 'Votre texte'}
      </Text>
    </group>
  )
}
