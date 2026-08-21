import { useEffect, useState } from 'react'
import './ForestDiscoveryGame.css'

type Props = { onNext: () => void }

export function ForestDiscoveryGame({ onNext }: Props) {
  const [step, setStep] = useState<'enter' | 'talk'>('enter')
  const [message, setMessage] = useState('Merhaba küçük kaşif! Ben Leo.')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStep('talk')
      setMessage('Burası Doğa Dünyası. Birlikte hayvanları, bitkileri ve doğanın güzel seslerini keşfedeceğiz!')
    }, 1700)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main className="forest-discovery landscape-world" aria-label="Doğa Dünyası giriş animasyonu">
      <div className="forest-scene">
        <div className="forest-illustrated-sky" />
        <div className="forest-layer forest-back" />
        <div className="forest-layer forest-mid" />
        <div className="forest-sun-art" />
        <div className="forest-cloud-art cloud-one" />
        <div className="forest-cloud-art cloud-two" />
        <div className="forest-hill hill-one" />
        <div className="forest-hill hill-two" />
        <div className="forest-waterfall" />
        <div className="forest-bridge-art" />
        <div className="forest-tree-art tree-left" />
        <div className="forest-tree-art tree-right" />
        <div className="forest-flower-bed" />
        <div className="forest-butterfly butterfly-one">🦋</div>
        <div className="forest-butterfly butterfly-two">🦋</div>
        <div className="forest-bird bird-one">🐦</div>
        <div className="forest-bunny bunny-one">🐰</div>
        <div className="forest-frog frog-one">🐸</div>

        <div className={`forest-main-character ${step === 'enter' ? 'is-entering' : 'is-talking'}`}>
          <img src="/illustrations/forest/leo-lion.svg" alt="Leo" />
          <div className="character-glow" />
        </div>

        <div className="forest-world-sign">🌿 DOĞA DÜNYASI</div>

        <div className={`forest-welcome-card ${step === 'talk' ? 'show' : ''}`}>
          <div className="story-avatar">
            <img src="/illustrations/forest/leo-lion.svg" alt="Leo" />
          </div>
          <div>
            <strong>{step === 'enter' ? 'Leo geliyor!' : 'Leo:'}</strong>
            <p>{message}</p>
          </div>
        </div>

        <div className="forest-intro-hint">Doğa Dünyası'na hoş geldin 🌱</div>

        <button className="forest-next-button" type="button" onClick={onNext}>
          İleri <span>→</span>
        </button>
      </div>
    </main>
  )
}
