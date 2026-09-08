import { ArrowLeft, Check, CalendarDays } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { calculateAge, getMaxBirthDate } from '../utils/age'
import { childNameInitial } from '../utils/childName'

export function EditChildPage() {
  const { childId } = useParams<{ childId: string }>()
  const { data, updateChild } = useApp()
  const navigate = useNavigate()
  const child = data.children.find((item) => item.id === childId)
  const [name, setName] = useState(child?.name ?? '')
  const [birthDate, setBirthDate] = useState(child?.birthDate ?? '')

  useEffect(() => {
    if (!child) return
    setName(child.name)
    setBirthDate(child.birthDate)
  }, [child])

  if (!child) {
    return (
      <main className="setup-page">
        <div className="setup-panel">
          <Link to="/profile" className="back-link"><ArrowLeft size={18} /> Profil ve ayarlara dön</Link>
          <h1>Profil bulunamadı.</h1>
          <p>Bu çocuk profili artık mevcut değil.</p>
        </div>
      </main>
    )
  }

  const age = birthDate ? calculateAge(birthDate) : null

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !birthDate || !childId) return
    updateChild(childId, name, birthDate)
    navigate('/profile')
  }

  return (
    <main className="setup-page">
      <div className="setup-panel">
        <Link to="/profile" className="back-link"><ArrowLeft size={18} /> Profil ve ayarlara dön</Link>
        <div className="setup-step">PROFİLİ DÜZENLE</div>
        <h1>{child.name} profilini güncelleyelim.</h1>
        <p>İsim veya doğum tarihini değiştirdiğinde yaşa uygun öneriler yeni bilgilere göre güncellenir.</p>

        <form onSubmit={submit} className="child-form">
          <label>Çocuğun adı
            <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="off" maxLength={40} required />
          </label>
          <label>Doğum tarihi
            <div className="input-with-icon">
              <CalendarDays size={19} aria-hidden="true" />
              <input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} max={getMaxBirthDate()} required />
            </div>
          </label>

          {age && (
            <div className="age-preview" aria-live="polite">
              <div className="avatar-preview">{childNameInitial(name.trim())}</div>
              <div><span>Şu an</span><strong>{age.label}</strong><small>{age.ageGroup}</small></div>
            </div>
          )}

          <button className="primary-button" type="submit" disabled={!name.trim() || !birthDate}>
            <Check size={19} /> Değişiklikleri kaydet
          </button>
        </form>
      </div>
      <div className="setup-aside" aria-hidden="true"><div className="orbit orbit-one">✏️</div><div className="orbit orbit-two">🎨</div><div className="orbit orbit-three">📚</div><span className="setup-figure">🌱</span></div>
    </main>
  )
}
