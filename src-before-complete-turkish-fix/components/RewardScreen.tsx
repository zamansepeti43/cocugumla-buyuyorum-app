import { Trophy, X } from 'lucide-react'

type RewardScreenProps = {
  open: boolean
  title: string
  message: string
  stars?: number
  unlockedSection?: string
  onContinue: () => void
}

export function RewardScreen({ open, title, message, stars = 1, unlockedSection, onContinue }: RewardScreenProps) {
  return (
    <div className={`reward-overlay ${open ? 'open' : ''}`}>
      <div className="reward-card">
        <button type="button" className="reward-close" onClick={onContinue} aria-label="Kapat">
          <X size={20} />
        </button>

        <div className="reward-emoji">🎉</div>
        <h2>{title}</h2>
        <p className="reward-message">{message}</p>

        <div className="reward-stars">
          {Array.from({ length: stars }).map((_, index) => (
            <span key={index} className="reward-star" style={{ animationDelay: `${index * 150}ms` }}>
              ⭐
            </span>
          ))}
        </div>

        {unlockedSection && (
          <div className="reward-unlock">
            <Trophy size={18} />
            <span>Yeni bölüm açıldı: {unlockedSection}</span>
          </div>
        )}

        <button type="button" className="primary-button reward-continue" onClick={onContinue}>
          Devam Et
        </button>
      </div>
    </div>
  )
}
