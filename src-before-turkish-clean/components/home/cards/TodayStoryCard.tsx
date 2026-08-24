import { NavLink } from 'react-router-dom'

export function TodayStoryCard() {
  return (
    <NavLink
      to="/stories"
      className="today-story-card"
      aria-label="Bugünün Hikâyesi"
    >
      <div className="card-content">
        <div className="card-icon">
          {/* Bear emoji as placeholder; replace with actual bear image if available */}
          🐻
        </div>
        <div className="card-text">
          <div className="card-title">Bugünün Hikâyesi</div>
          <div className="card-subtitle">Minik Ayı'nın Büyük Macerası</div>
          <div className="card-button">
            Hikâyeyi Başlat
          </div>
        </div>
      </div>
    </NavLink>
  )
}