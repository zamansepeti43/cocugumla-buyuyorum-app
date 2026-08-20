import { NavLink } from 'react-router-dom'

export function TodayDiscoveryCard() {
  return (
    <NavLink
      to="/worlds"
      className="today-discovery-card"
      aria-label="Bugünün Keşfi"
    >
      <div className="card-content">
        <div className="card-icon">
          {/* Placeholder for icon */}
          🔍
        </div>
        <div className="card-text">
          <h3>Bugünün Keşfi</h3>
          <p>Keşfetmeye Başla</p>
        </div>
      </div>
    </NavLink>
  )
}