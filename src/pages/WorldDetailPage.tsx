import { useParams, Link } from 'react-router-dom'
import { useWorlds } from '../hooks/useWorlds'
import { useProgress } from '../hooks/useProgress'
import { SectionCard } from '../components/SectionCard'
import { ForestDiscoveryGame } from '../components/games/ForestDiscoveryGame'
import { ArrowLeft, Lock, Star } from 'lucide-react'
import './world-detail.css'
import './world-islands.css'
import './world-visuals.css'

const worldPresentation: Record<string, { title: string; description: string; islands: string[] }> = {
  forest: { title: 'Doğa Dünyası', description: 'Hayvanlar, doğa ve sesler', islands: ['Hayvanlar', 'Doğa', 'Sesler'] },
  space: { title: 'Keşif Dünyası', description: 'Uzay, deniz, bilim ve keşif', islands: ['Uzay', 'Deniz', 'Bilim'] },
  english: { title: 'Dil & Hikâye Dünyası', description: 'İngilizce, konuşma ve hikâyeler', islands: ['İngilizce', 'Hikâyeler', 'Konuşma'] },
  games: { title: 'Oyun Dünyası', description: 'Dikkat, hafıza ve eğlenceli oyunlar', islands: ['Dikkat', 'Hafıza', 'Mini Oyunlar'] },
  math: { title: 'Zihin Dünyası', description: 'Sayılar, şekiller ve mantık', islands: ['Sayılar', 'Şekiller', 'Mantık'] },
}

const islandArt = {
  forest: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=88'],
  space: ['https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=900&q=88'],
  english: ['https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=88'],
  games: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=88'],
  math: ['https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=88', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=88'],
}

export function WorldDetailPage() {
  const { worldId } = useParams()
  const { getWorld, getSections, isWorldUnlocked, isSectionUnlocked } = useWorlds()
  const { getTotalStars } = useProgress()

  if (!worldId) return null
  const world = getWorld(worldId)

  if (!world) {
    return (
      <div className="page world-detail-page">
        <div className="empty-state">
          <span aria-hidden="true">🌍</span>
          <h2>Dünya bulunamadı</h2>
          <p>Bu dünya harita verilerinde kayıtlı değil.</p>
          <Link to="/worlds">Keşif Haritası'na dön</Link>
        </div>
      </div>
    )
  }

  const presentation = worldPresentation[worldId] ?? { title: world.title, description: world.description, islands: [] }
  const unlocked = isWorldUnlocked(worldId)
  const sectionsList = getSections(worldId)
  const totalStars = getTotalStars()
  const art = islandArt[worldId as keyof typeof islandArt] ?? islandArt.forest

  return (
    <div className="page world-detail-page">
      <Link to="/worlds" className="back-link"><ArrowLeft size={18} />Keşif Haritası</Link>

      {worldId === 'forest' ? (
        <section className="forest-world-entry" aria-label="Doğa Dünyası giriş sahnesi">
          <ForestDiscoveryGame />
        </section>
      ) : (
        <section className="world-hero" style={{ ['--world-color' as string]: `var(--${world.color})` }}>
          <div className="world-hero-visual">
            <span className="world-hero-icon">{world.icon}</span>
            <div className="world-hero-deco" aria-hidden="true"><span>✨</span><span>⭐</span><span>✨</span></div>
          </div>
          <div>
            <span className="kicker">DÜNYA</span>
            <h1>{presentation.title}</h1>
            <p>{presentation.description}</p>
          </div>
          <div className="world-hero-stats"><span><Star size={16} />{totalStars} yıldız</span></div>
        </section>
      )}

      {!unlocked && (
        <div className="locked-notice"><Lock size={18} /><div><strong>Bu dünya şu anda kilitli.</strong><p>İçeriği görebilir, kilitli bölümleri ilerleme koşulları karşılandığında açabilirsin.</p></div></div>
      )}

      {presentation.islands.length > 0 && (
        <section className="world-islands-strip" aria-label="Dünyanın alt adaları">
          <div>
            <span className="kicker">KEŞFEDİLECEK ADACIKLAR</span>
            <strong>Bu dünyanın adalarına çık, keşfetmeye başla.</strong>
          </div>
          <div className="world-islands-list">
            {presentation.islands.map((island, index) => (
              <div className="world-island-chip" key={island} style={{ backgroundImage: `url(${art[index % art.length]})` }}>
                <span aria-hidden="true">🌴</span>{island}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section-block">
        <div className="section-heading">
          <div><span className="kicker">BÖLÜMLER</span><h2>Bu dünyada neler öğreneceğiz?</h2></div>
          <span className="section-count">{sectionsList.length} bölüm</span>
        </div>
        {sectionsList.length > 0 ? (
          <div className="sections-list">
            {sectionsList.map((section) => <SectionCard key={section.id} section={section} unlocked={isSectionUnlocked(section.id)} />)}
          </div>
        ) : (
          <div className="section-empty"><span>📚</span><strong>Bu dünyaya henüz bölüm eklenmemiş.</strong></div>
        )}
      </section>
    </div>
  )
}
