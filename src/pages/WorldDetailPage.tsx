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
import './world-unified.css'

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

const islandContent: Record<string, Record<string, { icon: string; text: string }>> = {
  forest: {
    Hayvanlar: { icon: '🦊', text: 'Ormandaki sevimli hayvanları tanı.' },
    Doğa: { icon: '🌿', text: 'Ağaçları, çiçekleri ve doğayı keşfet.' },
    Sesler: { icon: '🔊', text: 'Kuşları ve ormanın güzel seslerini dinle.' },
  },
  space: {
    Uzay: { icon: '🌍', text: 'Gezegenleri keşfet ve yıldızları tanı.' },
    Deniz: { icon: '🌊', text: 'Okyanusların derinliklerini ve canlıları keşfet.' },
    Bilim: { icon: '🧪', text: 'Deneyler yap, öğren ve merakını keşfe dönüştür.' },
    Keşif: { icon: '🚀', text: 'Yeni maceralara atıl ve dünyayı keşfet.' },
  },
  english: {
    İngilizce: { icon: '🔤', text: 'Yeni İngilizce kelimeler öğren ve eğlen.' },
    Hikâyeler: { icon: '📖', text: 'Kısa hikâyelerle dinleme ve anlatma becerini geliştir.' },
    Konuşma: { icon: '💬', text: 'Basit kelimeler ve cümlelerle konuşmayı dene.' },
  },
  games: {
    Dikkat: { icon: '🎯', text: 'Dikkatini topla ve eğlenceli görevleri tamamla.' },
    Hafıza: { icon: '🧠', text: 'Eşleştirme ve hafıza oyunlarıyla zihnini çalıştır.' },
    'Mini Oyunlar': { icon: '🎮', text: 'Kısa, eğlenceli oyunlarla öğrenmeye devam et.' },
  },
  math: {
    Sayılar: { icon: '🔢', text: 'Sayıları tanı, saymayı öğren ve eğlen.' },
    Şekiller: { icon: '🔷', text: 'Şekilleri keşfet, karşılaştır ve eşleştir.' },
  },
}

function UnifiedWorldDetailPage({ worldId, onBack }: { worldId: string; onBack?: () => void }) {
  const navigate = useNavigate()
  const { getWorld, getSections, isSectionUnlocked } = useWorlds()
  const { getTotalStars } = useProgress()
  const world = getWorld(worldId)
  const presentation = worldPresentation[worldId] ?? { title: world?.title ?? 'Dünya', description: world?.description ?? '', islands: [] }
  const sectionsList = world ? getSections(worldId) : []
  const totalStars = getTotalStars()
  const content = islandContent[worldId] ?? {}
  const art = islandArt[worldId as keyof typeof islandArt] ?? []

  if (!world) {
    return (
      <main className="world-unified-page world-unified-missing">
        <Link to="/worlds" className="world-unified-back"><ArrowLeft size={19} /> Geri</Link>
        <div className="world-unified-empty"><span>🌍</span><h1>Dünya bulunamadı</h1><p>Bu dünya harita verilerinde kayıtlı değil.</p></div>
      </main>
    )
  }

  const handleBack = onBack ?? (() => navigate('/worlds'))

  return (
    <main className={`world-unified-page world-unified-${worldId}`}>
      <button type="button" className="world-unified-back" onClick={handleBack} aria-label="Geri dön">
        <ArrowLeft size={20} />
        <span>Geri</span>
      </button>

      <div className="world-unified-inner">
        <section className="world-unified-hero">
          <span className="world-unified-kicker">{presentation.title.toUpperCase()}</span>
          <h1>Bu dünyanın adalarını keşfetmeye başla.</h1>
          <p>{presentation.description}</p>
        </section>

        <section className={`world-unified-islands world-unified-islands-${presentation.islands.length}`} aria-label={`${presentation.title} bölümleri`}>
          {presentation.islands.map((island, index) => {
            const item = content[island] ?? { icon: '✨', text: 'Yeni şeyler öğren ve keşfet.' }
            return (
              <button
                type="button"
                className="world-unified-card"
                key={island}
                style={art.length > 0 ? { backgroundImage: `linear-gradient(180deg, rgba(20,8,54,.72), rgba(5,7,31,.97)), url(${art[index % art.length]})` } : undefined}
              >
                <span className="world-unified-card-icon" aria-hidden="true">{item.icon}</span>
                <h2>{island}</h2>
                <p>{item.text}</p>
              </button>
            )
          })}
        </section>

        <section className="world-unified-sections">
          <div className="world-unified-section-heading">
            <div>
              <span>BÖLÜMLER</span>
              <h2>Bu dünyada neler öğreneceğiz?</h2>
            </div>
            <strong>{sectionsList.length} bölüm · {totalStars} yıldız</strong>
          </div>
          {sectionsList.length > 0 ? (
            <div className="world-unified-section-grid">
              {sectionsList.map((section) => (
                <SectionCard key={section.id} section={section} unlocked={isSectionUnlocked(section.id)} />
              ))}
            </div>
          ) : (
            <div className="world-unified-section-empty">Bu dünyaya henüz bölüm eklenmemiş.</div>
          )}
        </section>
      </div>
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
        <UnifiedWorldDetailPage worldId="forest" onBack={() => setNatureEntered(false)} />
      )}
    </div>
  )
}

export function WorldDetailPage() {
  const { worldId } = useParams()
  if (!worldId) return null
  return <UnifiedWorldDetailPage worldId={worldId} />
}
