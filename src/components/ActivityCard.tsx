import { Check, ChevronRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryMeta } from '../data/activities'
import type { Activity } from '../types/models'

export function ActivityCard({ activity, completed }: { activity: Activity; completed: boolean }) {
  const category = categoryMeta[activity.category]

  return (
    <Link to={`/activities/${activity.id}`} className={`activity-card ${category.color}`}>
      <div className="activity-icon" aria-hidden="true">{category.icon}</div>
      <div className="activity-card-body">
        <div className="activity-card-topline">
          <span>{category.label}</span>
          {completed && <span className="completed-label"><Check size={14} /> Tamamlandı</span>}
        </div>
        <h3>{activity.title}</h3>
        <p>{activity.description}</p>
        <div className="activity-meta">
          <span><Clock3 size={15} /> {activity.duration} dk</span>
          <span>{activity.materials[0]}</span>
        </div>
      </div>
      <ChevronRight className="card-arrow" size={20} aria-hidden="true" />
    </Link>
  )
}
