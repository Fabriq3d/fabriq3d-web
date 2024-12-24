'use client'

import { useState } from 'react'
import KeychainCustomizer from '@/components/KeychainCustomizer'
import OrderForm from '@/components/OrderForm'

export default function Home() {
  const [step, setStep] = useState<'customize' | 'order'>('customize')
  const [design, setDesign] = useState({
    text: '',
    color: '#000000',
    model: 'basic'
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Fabriq3D Solutions
        </h1>
        <p className="text-xl text-gray-600">
          Créez votre porte-clés personnalisé en 3D
        </p>
      </header>

      {step === 'customize' ? (
        <KeychainCustomizer
          design={design}
          onDesignUpdate={setDesign}
          onNext={() => setStep('order')}
        />
      ) : (
        <OrderForm
          design={design}
          onBack={() => setStep('customize')}
        />
      )}
    </div>
  )
}
