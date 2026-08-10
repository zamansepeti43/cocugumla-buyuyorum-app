import { ArrowLeft, ArrowRight, CalendarDays } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { calculateAge, getMaxBirthDate } from '../utils/age'

export function CreateChildPage() {
  const { addChild, data } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const age = birthDate ? calculateAge(birthDate) : null

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !birthDate) return
    addChild(name, birthDate)
    navigate('/home')
  }

  return (
    <main className="setup-page">
      <div className="setup-panel">
        <Link to={data.children.length ? '/profile' : '/'} className="back-link"><ArrowLeft size={18} /> Geri</Link>
        <div className="setup-step">{data.children.length ? 'YENİ PROFİL' : '1 / 1 · TANIŞALIM'}</div>
        <h1>Minik keşif arkadaşımızı tanıyalım.</h1>
        <p>Yaş bilgisi, çocuğunuza uygun aktiviteleri önermemize yardımcı olur.</p>

        <form onSubmit={submit} className="child-form">
          <label>Çocuğun adı
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Örn. Deniz" autoComplete="off" maxLength={40} required />
          </label>
          <label>Doğum tarihi
            <div className="input-with-icon">
              <CalendarDays size={19} aria-hidden="true" />
              <input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} max={getMaxBirthDate()} required />
            </div>
          </label>

          {age && (
            <div className="age-preview" aria-live="polite">
              <div className="avatar-preview">{name.trim().charAt(0).toLocaleUpperCase('tr-TR') || '★'}</div>
              <div><span>Şu an</span><strong>{age.label}</strong><small>{age.ageGroup}</small></div>
            </div>
          )}

          <button className="primary-button" type="submit" disabled={!name.trim() || !birthDate}>
            Profili oluştur <ArrowRight size={20} />
          </button>
        </form>
        <p className="form-footnote">Sağlık veya gelişim değerlendirmesi yapmayız. Bu bilgi yalnızca yaşa uygun oyun önerileri içindir.</p>
      </div>
      <div className="setup-aside" aria-hidden="true"><div className="orbit orbit-one">🧩</div><div className="orbit orbit-two">🎨</div><div className="orbit orbit-three">📚</div><span className="setup-figure">🌱</span></div>
    </main>
  )
}
