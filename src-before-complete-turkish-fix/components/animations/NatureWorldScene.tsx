import { useState } from 'react'
import './nature-world-scene.css'

/**
 * First self-contained animated scene for Doğa Dünyası.
 *
 * This deliberately uses CSS/vector shapes rather than an unverified third-party
 * asset, so the scene can ship without an asset-license dependency. The Rive
 * layer remains available through InteractiveRiveAnimation for licensed assets.
 */
export function NatureWorldScene() {
  const [animal, setAnimal] = useState<'rabbit' | 'bird' | null>(null)

  return (
    <section className="nature-world-scene" aria-label="Doğa Dünyası animasyonlu sahnesi">
      <div className="nature-sun" aria-hidden="true" />
      <div className="nature-cloud nature-cloud-one" aria-hidden="true" />
      <div className="nature-cloud nature-cloud-two" aria-hidden="true" />
      <div className="nature-hills" aria-hidden="true" />
      <div className="nature-tree" aria-hidden="true">
        <span className="nature-tree-top" />
        <span className="nature-tree-trunk" />
      </div>

      <button
        className={`nature-animal nature-rabbit ${animal === 'rabbit' ? 'is-active' : ''}`}
        onClick={() => setAnimal('rabbit')}
        aria-label="Tavşanı hareket ettir"
      >
        🐰
      </button>
      <button
        className={`nature-animal nature-bird ${animal === 'bird' ? 'is-active' : ''}`}
        onClick={() => setAnimal('bird')}
        aria-label="Kuşu hareket ettir"
      >
        🐦
      </button>

      <div className="nature-guide" aria-live="polite">
        <span className="nature-guide-face" aria-hidden="true">🐻</span>
        <div>
          <strong>Merhaba minik kaşif!</strong>
          <p>
            {animal === 'rabbit'
              ? 'Tavşan zıplamayı çok seviyor!'
              : animal === 'bird'
                ? 'Kuş gökyüzünde özgürce uçuyor!'
                : 'Hayvanlara dokun ve ne yaptıklarını keşfet!'}
          </p>
        </div>
      </div>
    </section>
  )
}
