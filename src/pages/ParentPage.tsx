import { BookOpen, ChevronRight, HeartHandshake, ShieldAlert, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { useProgress } from '../hooks/useProgress'
import { calculateAge } from '../utils/age'
import { formatChildName } from '../utils/childName'
import './parent-premium.css'

const ageStages = [
  { range: '0–3 ay', icon: '👶', title: 'Bebeğimi anlamak', text: 'Ağlama, gaz, beslenme, uyku ve sakinleşme hakkında temel rehberler.' },
  { range: '4–6 ay', icon: '🌱', title: 'İlk gelişim adımları', text: 'Hareket, iletişim, oyun ve günlük rutinlerde neler değişebilir?' },
  { range: '7–12 ay', icon: '🧸', title: 'Keşfetme dönemi', text: 'Hareketlilik, sesler, etkileşim, oyun ve güvenli keşif.' },
  { range: '1–2 yaş', icon: '🚶', title: 'Bağımsızlık başlıyor', text: 'Dil, hareket, sınırlar, duygular ve günlük yaşam becerileri.' },
  { range: '2–3 yaş', icon: '🎨', title: 'Ben yapacağım!', text: 'Konuşma, oyun, duyguları düzenleme ve öğrenme alışkanlıkları.' },
  { range: '3+ yaş', icon: '🚀', title: 'Büyük keşifler', text: 'Merak, problem çözme, sosyal beceriler ve okul öncesi hazırlık.' },
]

export function ParentPage() {
  const { activeChild } = useApp()
  const { progressRecords } = useProgress()

  if (!activeChild) return null

  const age = calculateAge(activeChild.birthDate)
  const completedCount = progressRecords.filter((r) => r.completed).length
  const totalStars = progressRecords.reduce((sum, r) => sum + r.stars, 0)
  const currentStageIndex = age.totalMonths < 3 ? 0 : age.totalMonths < 7 ? 1 : age.totalMonths < 13 ? 2 : age.totalMonths < 25 ? 3 : age.totalMonths < 37 ? 4 : 5
  const currentStage = ageStages[currentStageIndex]

  return (
    <div className="page parent-page parent-premium-page">
      <section className="parent-hero">
        <div>
          <span className="parent-kicker"><HeartHandshake size={15} /> EBEVEYN REHBERİ</span>
          <h1>{formatChildName(activeChild.name)} ile büyüme yolculuğu</h1>
          <p>Çocuğunuzun yaşına göre günlük gelişim, davranış, oyun ve ebeveynlik rehberlerini tek yerde takip edin.</p>
        </div>
        <div className="parent-age-badge"><span>{currentStage.icon}</span><strong>{age.label}</strong><small>Şu anki dönem</small></div>
      </section>

      <section className="parent-stats">
        <div className="parent-stat-card"><span className="parent-stat-value">{completedCount}</span><span className="parent-stat-label">Tamamlanan içerik</span></div>
        <div className="parent-stat-card"><span className="parent-stat-value">{totalStars}</span><span className="parent-stat-label">Toplam yıldız</span></div>
        <div className="parent-stat-card"><span className="parent-stat-value">{age.label}</span><span className="parent-stat-label">Çocuğunuzun yaşı</span></div>
      </section>

      <section className="parent-current-guide">
        <div className="guide-icon">{currentStage.icon}</div>
        <div className="guide-copy">
          <span className="parent-kicker">ŞİMDİ BUNLARA BAKABİLİRSİNİZ</span>
          <h2>{currentStage.title}</h2>
          <p>{currentStage.text}</p>
        </div>
        <button type="button" className="guide-button">Rehberi aç <ChevronRight size={17} /></button>
      </section>

      <section className="parent-section">
        <div className="parent-section-heading">
          <div><span className="parent-kicker">YAŞA GÖRE REHBER</span><h2>Çocuğunuzun dönemini seçin</h2></div>
          <Sparkles size={20} />
        </div>
        <div className="age-stage-grid">
          {ageStages.map((stage, index) => (
            <button type="button" className={`age-stage-card ${index === currentStageIndex ? 'active' : ''}`} key={stage.range}>
              <span className="age-stage-icon">{stage.icon}</span>
              <div><strong>{stage.range}</strong><h3>{stage.title}</h3><p>{stage.text}</p></div>
            </button>
          ))}
        </div>
      </section>

      <section className="parent-guide-grid">
        <article className="parent-guide-card">
          <span className="guide-card-icon">💬</span>
          <div><span className="parent-kicker">GÜNLÜK REHBER</span><h3>Bugün çocuğumla ne yapabilirim?</h3><p>Yaşa uygun oyun, iletişim ve birlikte yapılabilecek kısa etkinlik önerileri.</p></div>
          <Link to="/activities">Etkinliklere git <ChevronRight size={16} /></Link>
        </article>
        <article className="parent-guide-card">
          <span className="guide-card-icon">📚</span>
          <div><span className="parent-kicker">ÖĞRENME</span><h3>Gelişim alanlarını keşfet</h3><p>Dil, dikkat, hareket, sosyal beceriler ve yaratıcılık için rehberler.</p></div>
          <Link to="/worlds">Keşfet <ChevronRight size={16} /></Link>
        </article>
        <article className="parent-guide-card warning">
          <span className="guide-card-icon"><ShieldAlert size={24} /></span>
          <div><span className="parent-kicker">GÜVENLİK</span><h3>Ne zaman destek almalıyım?</h3><p>Genel bilgi ile tıbbi değerlendirmeyi ayıran, ne zaman sağlık profesyoneline danışılması gerektiğini anlatan rehberler.</p></div>
          <span className="guide-note">Bilgilendirme amaçlı</span>
        </article>
      </section>

      <p className="parent-disclaimer"><BookOpen size={14} /> Ebeveyn rehberleri eğitim ve bilgilendirme amaçlıdır; tanı veya kişisel tıbbi öneri yerine geçmez.</p>
    </div>
  )
}
