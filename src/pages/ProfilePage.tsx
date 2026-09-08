import { Check, ChevronRight, Pencil, Plus, RotateCcw, ShieldCheck, Trash2, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { calculateAge } from '../utils/age'
import { childNameInitial, formatChildName } from '../utils/childName'

export function ProfilePage() {
  const { data, activeChild, setActiveChild, removeChild, resetData } = useApp()
  const navigate = useNavigate()

  function remove(childId: string, name: string) {
    if (window.confirm(`${name} profilini ve bu profile ait ilerlemeyi silmek istediğinizden emin misiniz?`)) removeChild(childId)
  }

  function reset() {
    if (window.confirm('Bu cihazdaki tüm profil ve ilerleme verileri silinecek. Devam edilsin mi?')) {
      resetData()
      navigate('/')
    }
  }

  return (
    <div className="page profile-page">
      <section className="page-title">
        <div>
          <span className="kicker">PROFİL VE AYARLAR</span>
          <h1>Ailenizin keşif alanı</h1>
          <p>Çocuk profillerini yönetin ve uygulama verilerinizi kontrol edin.</p>
        </div>
      </section>

      <div className="profile-layout">
        <section className="profile-card">
          <div className="section-heading profile-heading">
            <div>
              <h2>Çocuk profilleri</h2>
              <p>{data.children.length} {data.children.length === 1 ? 'profil' : 'profil'}</p>
            </div>
            <Link to="/child/new" className="icon-text-button"><Plus size={18} /> Yeni çocuk</Link>
          </div>

          {data.children.length > 0 ? (
            <div className="children-list">
              {data.children.map((child) => {
                const age = calculateAge(child.birthDate)
                const isActive = child.id === activeChild?.id
                return (
                  <div className={`child-row ${isActive ? 'active' : ''}`} key={child.id}>
                    <button className="child-select" onClick={() => setActiveChild(child.id)} aria-pressed={isActive}>
                      <span className="profile-avatar">{childNameInitial(child.name)}</span>
                      <span className="child-copy">
                        <strong>{formatChildName(child.name)}</strong>
                        <small>{age.label} · {age.ageGroup}</small>
                      </span>
                      {isActive ? <i><Check size={16} /> Aktif</i> : <ChevronRight size={19} />}
                    </button>
                    <div className="child-actions">
                      <Link to={`/child/${child.id}/edit`} className="profile-action edit" aria-label={`${formatChildName(child.name)} profilini düzenle`}>
                        <Pencil size={16} />
                      </Link>
                      <button className="delete-button" onClick={() => remove(child.id, child.name)} aria-label={`${formatChildName(child.name)} profilini sil`}>
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="profile-empty">
              <div className="settings-icon"><UserRound /></div>
              <strong>Henüz çocuk profili yok</strong>
              <span>İlk profili ekleyerek yaşa uygun keşifleri başlatın.</span>
              <Link to="/child/new" className="primary-button"><Plus size={18} /> Profil oluştur</Link>
            </div>
          )}
        </section>

        <aside className="settings-card">
          <div className="settings-icon"><UserRound /></div>
          <span className="settings-kicker">AYARLAR</span>
          <h2>Uygulama ayarları</h2>

          <div className="setting-row">
            <ShieldCheck />
            <div><strong>Yerel ve gizli</strong><span>Profil ve ilerleme verileri yalnızca bu tarayıcıda saklanır.</span></div>
          </div>

          <div className="setting-row">
            <UserRound />
            <div><strong>Aktif profil</strong><span>{activeChild ? formatChildName(activeChild.name) : 'Seçilmiş profil yok'}</span></div>
          </div>

          <div className="settings-divider" />
          <p className="settings-warning">Tüm verileri sıfırlamak, bu cihazdaki çocuk profillerini ve ilerlemeleri kalıcı olarak siler.</p>
          <button className="danger-button" onClick={reset}><RotateCcw size={17} /> Tüm verileri sıfırla</button>
        </aside>
      </div>

      <section className="safety-panel">
        <ShieldCheck />
        <div><h2>Çocuğunuzun mahremiyeti önemli</h2><p>Yalnızca kişiselleştirme için gereken ad ve doğum tarihini saklarız. Bu MVP hiçbir veriyi sunucuya göndermez.</p></div>
      </section>
    </div>
  )
}
