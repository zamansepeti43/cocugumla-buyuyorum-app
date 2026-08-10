import { Check, ChevronRight, Plus, RotateCcw, ShieldCheck, Trash2, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { calculateAge } from '../utils/age'

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
      <section className="page-title"><div><span className="kicker">PROFİL VE AYARLAR</span><h1>Ailenizin keşif alanı</h1><p>Aktif çocuk profilini seçin veya yeni bir profil ekleyin.</p></div></section>
      <div className="profile-layout">
        <section className="profile-card"><div className="section-heading"><div><h2>Çocuk profilleri</h2><p>{data.children.length} profil</p></div><Link to="/child/new" className="icon-text-button"><Plus size={18} /> Yeni çocuk</Link></div><div className="children-list">{data.children.map((child) => { const age = calculateAge(child.birthDate); const isActive = child.id === activeChild?.id; return <div className={`child-row ${isActive ? 'active' : ''}`} key={child.id}><button className="child-select" onClick={() => setActiveChild(child.id)}><span className="profile-avatar">{child.name.charAt(0).toLocaleUpperCase('tr-TR')}</span><span><strong>{child.name}</strong><small>{age.label} · {age.ageGroup}</small></span>{isActive ? <i><Check size={16} /> Aktif</i> : <ChevronRight size={19} />}</button><button className="delete-button" onClick={() => remove(child.id, child.name)} aria-label={`${child.name} profilini sil`}><Trash2 size={17} /></button></div> })}</div></section>
        <aside className="settings-card"><div className="settings-icon"><UserRound /></div><h2>Uygulama ayarları</h2><div className="setting-row"><ShieldCheck /><div><strong>Yerel ve gizli</strong><span>Veriler yalnızca bu tarayıcıda saklanır.</span></div></div><button className="danger-button" onClick={reset}><RotateCcw size={17} /> Tüm verileri sıfırla</button></aside>
      </div>
      <section className="safety-panel"><ShieldCheck /><div><h2>Çocuğunuzun mahremiyeti önemli</h2><p>Yalnızca kişiselleştirme için gereken ad ve doğum tarihini saklarız. Bu MVP hiçbir veriyi sunucuya göndermez.</p></div></section>
    </div>
  )
}
