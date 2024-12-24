'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import KeychainModel from './KeychainModel'

interface KeychainCustomizerProps {
  design: {
    text: string
    color: string
    model: string
  }
  onDesignUpdate: (design: any) => void
  onNext: () => void
}

export default function KeychainCustomizer({
  design,
  onDesignUpdate,
  onNext
}: KeychainCustomizerProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Personnalisez votre porte-clés</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texte personnalisé
            </label>
            <input
              type="text"
              value={design.text}
              onChange={(e) => onDesignUpdate({ ...design, text: e.target.value })}
              className="w-full p-2 border rounded-md"
              maxLength={20}
              placeholder="Votre texte ici"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Couleur
            </label>
            <input
              type="color"
              value={design.color}
              onChange={(e) => onDesignUpdate({ ...design, color: e.target.value })}
              className="w-full h-10 p-1 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modèle
            </label>
            <select
              value={design.model}
              onChange={(e) => onDesignUpdate({ ...design, model: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="basic">Basique</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxe</option>
            </select>
          </div>

          <button
            onClick={onNext}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continuer vers la commande
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="h-[400px] bg-gray-100 rounded-lg">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <KeychainModel design={design} />
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  )
}
