import { NavLink } from 'react-router-dom'

export function ContinueCard() {
  return (
    <NavLink
      to="/activities"
      className="today-continue-card"
      aria-label="Kaldığın Yerden Devam Et"
    >
      <div className="card-content">
        <div className="card-icon">
          {/* Placeholder for icon */}
          ▶️
        </div>
        <div className="card-text">
          <h3>Kaldığın Yerden Devam Et</h3>
          <p>Devam Et</p>
        </div>
      </div>
    </NavLink>
  )
}