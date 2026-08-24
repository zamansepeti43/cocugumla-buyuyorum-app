import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useWorlds } from '../hooks/useWorlds'
import { useProgress } from '../hooks/useProgress'
import { SectionCard } from '../components/SectionCard'
import { ForestDiscoveryGame } from '../components/games/ForestDiscoveryGame'
import { ArrowLeft } from 'lucide-react'
import './world-detail.css'
import './world-islands.css'
import './world-visuals.css'
import './nature-world-screen.css'
import './space-world-clean.css'

const worldPresentation: Record<string, {
  title: string
  description: string
  islands: string[]
}> = {
  forest: {
    title: 'Doğa Dünyası',
    description: 'Hayvanlar, doğa ve sesler',
    islands: ['Hayvanlar', 'Doğa', 'Sesler'],
  },
  space: {
    title: 'Keşif Dünyası',
    description: 'Uzay, deniz, bilim ve keşif',
    islands: ['Uzay', 'Deniz', 'Bilim', 'Keşif'],
  },
  english: {
    title: 'Dil & Hikâye Dünyası',
    description: 'İngilizce, konuşma ve hikâyeler',
    islands: ['İngilizce', 'Hikâyeler', 'Konuşma'],
  },
  games: {
    title: 'Oyun Dünyası',
    description: 'Dikkat, hafıza ve eğlenceli oyunlar',
    islands: ['Dikkat', 'Hafıza', 'Mini Oyunlar'],
  },
  math: {
    title: 'Zihin Dünyası',
    description: 'Sayılar, şekiller ve mantık',
    islands: ['Sayılar', 'Şekiller'],
  },
}

const islandArt = {
  forest: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=88',
  ],
  space: [],
  english: [
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=88',
  ],
  games: [
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=88',
  ],
  math: [
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=88',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=88',
  ],
}

function SpaceWorldDetailPage() {
  const navigate = useNavigate()

  const cards = [
    { icon: '🌍', title: 'Uzay', text: 'Gezegenleri keşfet ve yıldızları tanı.' },
    { icon: '🌊', title: 'Deniz', text: 'Okyanusların derinliklerini keşfet ve canlıları tanı.' },
    { icon: '🧪', title: 'Bilim', text: 'Deneyler yap, öğren ve keşfet.' },
    { icon: '🚀', title: 'Keşif', text: 'Yeni maceralara atıl ve dünyayı keşfet.' },
  ]

  return (
    <div className="space-world-page">
      <button type="button" className="space-world-back" onClick={() => navigate('/worlds')} aria-label="Keşif Haritasına dön">
        <ArrowLeft size={18} />
      </button>

      <main className="space-world-content">
        <section className="space-world-heading">
          <span className="space-world-kicker">KEŞİF DÜNYASI</span>
          <h1>Bu dünyanın adalarını keşfetmeye başla.</h1>
          <p>Uzay, deniz, bilim ve keşif dünyalarını keşfet!</p>
        </section>

        <section className="space-world-cards" aria-label="Keşif Dünyası bölümleri">
          {cards.map((card) => (
            <button type="button" className="space-world-card" key={card.title}>
              <span className="space-world-card-icon" aria-hidden="true">{card.icon}</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </button>
          ))}
        </section>
      </main>
    </div>
  )
}

function NatureWorldMap({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)

  const islands = [
    { title: 'Hayvanlar', text: 'Ormandaki sevimli hayvanlarla tanış.' },
    { title: 'Doğa', text: 'Ağaçları, çiçekleri ve doğayı keşfet.' },
    { title: 'Sesler', text: 'Kuşları ve ormanın güzel seslerini dinle.' },
  ]

  return (
    <main className="nature-world-screen" aria-label="Doğa Dünyası haritası">
      <header className="nature-map-header">
        <button type="button" className="nature-map-back" onClick={onBack}>
          <ArrowLeft size={20} /> Geri
        </button>
        <div>
          <span>🌿 DOĞA DÜNYASI</span>
          <h1>Keşfetmeye hazır mısın?</h1>
        </div>
      </header>

      <div>
        {islands.map((island) => (
          <button type="button" key={island.title} onClick={() => setSelected(island.title)}>
            {island.title}
          </button>
        ))}
      </div>

      {selected && (
        <div role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <div onClick={(event) => event.stopPropagation()}>
            <h2>{selected}</h2>
            <p>{islands.find((item) => item.title === selected)?.text}</p>
            <button type="button" onClick={() => setSelected(null)}>Başlayalım!</button>
          </div>
        </div>
      )}
    </main>
  )
}

export function NatureWorldPage() {
  const [natureEntered, setNatureEntered] = useState(false)

  return (
    <div className="nature-world-route">
      {!natureEntered ? (
        <ForestDiscoveryGame onNext={() => setNatureEntered(true)} />
      ) : (
        <NatureWorldMap onBack={() => setNatureEntered(false)} />
      )}
    </div>
  )
}

export function WorldDetailPage() {
  const { worldId } = useParams()
  if (!worldId) return null
  if (worldId === 'space') return <SpaceWorldDetailPage />
  if (worldId === 'forest') return <NatureWorldPage />
  return <RegularWorldDetailPage worldId={worldId} />
}

function RegularWorldDetailPage({ worldId }: { worldId: string }) {
  const { getWorld, getSections, isSectionUnlocked } = useWorlds()
  const { getTotalStars } = useProgress()
  const world = getWorld(worldId)

  if (!world) {
    return (
      <div className="page world-detail-page">
        <div className="empty-state">
          <span aria-hidden="true">🌍</span>
          <h2>Dünya bulunamadı</h2>
          <p>Bu dünya harita verilerinde kayıtlı değil.</p>
          <Link to="/worlds">Keşif Haritasına dön</Link>
        </div>
      </div>
    )
  }

  const presentation = worldPresentation[worldId] ?? { title: world.title, description: world.description, islands: [] }
  const sectionsList = getSections(worldId)
  const totalStars = getTotalStars()
  const art = islandArt[worldId as keyof typeof islandArt] ?? islandArt.forest

  return (
    <div className={`page world-detail-page world-${worldId}`}>
      <Link to="/worlds" className="back-link">
        <ArrowLeft size={18} />
        Keşif Haritası
      </Link>

      <section className="world-hero" data-world={worldId} style={{ ['--world-color' as string]: `var(--${world.color})` }}>
        <div className="world-hero-visual">
          <span className="world-hero-icon">{world.icon}</span>
          <div className="world-hero-deco" aria-hidden="true">
            <span>✨</span>
            <span>GELECEK ADACIKLAR</span>
            <strong>Bu dünyanın adalarına çık, keşfetmeye başla.</strong>
          </div>
          <div className="world-islands-list">
            {presentation.islands.map((island, index) => (
              <div className="world-island-chip" key={island} style={{ backgroundImage: art.length > 0 ? `url(${art[index % art.length]})` : undefined }}>
                <span aria-hidden="true">🌿</span>
                {island}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="kicker">BÖLÜMLER</span>
            <h2>Bu dünyada neler öğreneceğiz?</h2>
          </div>
          <span className="section-count">{sectionsList.length} bölüm · {totalStars} yıldız</span>
        </div>

        {sectionsList.length > 0 ? (
          <div className="sections-list">
            {sectionsList.map((section) => (
              <SectionCard key={section.id} section={section} unlocked={isSectionUnlocked(section.id)} />
            ))}
          </div>
        ) : (
          <div className="section-empty">
            <span>📚</span>
            <strong>Bu dünyaya henüz bölüm eklenmemiş.</strong>
          </div>
        )}
      </section>
    </div>
  )
}
