import { useWorlds } from '../hooks/useWorlds'
import { WorldCard } from '../components/WorldCard'
import { NatureWorldEntrance } from '../components/NatureWorldEntrance'

export function WorldsPage() {
  const { availableWorlds, lockedWorlds } = useWorlds()

  return (
    <div className="page worlds-page">
      <section className="page-title">
        <div>
          <span className="kicker">KEŞİF HARİTASI</span>
          <h1>Dünyaları Keşfet</h1>
          <p>Yaşına uygun dünyaları keşfedip içerikleri tamamla.</p>
        </div>
      </section>

      {availableWorlds.some((world) => world.id === 'forest') && <NatureWorldEntrance />}

      {availableWorlds.length > 0 && (
        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="kicker">AÇIK</span>
              <h2>Keşfedilebilir Dünyalar</h2>
            </div>
          </div>
          <div className="worlds-map">
            {availableWorlds.map((world) => (
              <WorldCard key={world.id} world={world} />
            ))}
          </div>
        </section>
      )}

      {lockedWorlds.length > 0 && (
        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="kicker">YAKINDA</span>
              <h2>Kilitli Dünyalar</h2>
            </div>
          </div>
          <div className="worlds-map">
            {lockedWorlds.map((world) => (
              <WorldCard key={world.id} world={world} locked />
            ))}
          </div>
        </section>
      )}

      {availableWorlds.length === 0 && lockedWorlds.length === 0 && (
        <div className="empty-state">
          <span aria-hidden="true">🌍</span>
          <h2>Henüz uygun dünya bulunamadı</h2>
          <p>Çocuğunuzun yaşına uygun içerikler yakında eklenecek.</p>
        </div>
      )}
    </div>
  )
}
