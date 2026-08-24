import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export function WelcomePage() {
  const navigate = useNavigate()
  const { data, completeOnboarding } = useApp()

  if (data.children.length > 0) return <Navigate to="/home" replace />

  function start() {
    completeOnboarding()
    navigate('/child/new')
  }

  return (
    <main className="welcome-page">
      <section className="welcome-copy">
        <div className="welcome-brand"><img src="/logo.png" alt="Çocuğumla Büyüyorum logo" className="brand-logo" /></div>
        <div className="eyebrow"><Sparkles size={16} /> Her güne küçük bir keşif</div>
        <h1>Birlikte büyüyen <em>güzel anlar.</em></h1>
        <p>Çocuğunuzla her gün küçük bir adım, yarın büyük bir gelişim.</p>
        <button className="primary-button welcome-button" onClick={start}>
          Başlayalım <ArrowRight size={20} />
        </button>
        <div className="privacy-note"><Heart size={16} /> Verileriniz yalnızca bu cihazda saklanır.</div>
      </section>
      <section className="welcome-visual" aria-label="Birlikte oyun oynayan ebeveyn ve çocuk">
        <img src="https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&w=1200&q=85" alt="Evde birlikte oyun oynayan ebeveyn ve çocuk" />
        <div className="floating-note note-one"><span>10 dk</span><strong>Birlikte kaliteli zaman</strong></div>
        <div className="floating-note note-two"><span>Bugün</span><strong>4 küçük keşif</strong></div>
      </section>
    </main>
  )
}
