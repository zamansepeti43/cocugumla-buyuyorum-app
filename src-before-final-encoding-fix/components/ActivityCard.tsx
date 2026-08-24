import { Check, Clock3, Baby, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryMeta } from '../data/activities'
import type { Activity } from '../types/models'
import { formatAgeRange } from '../utils/age'
import { activityShortDescription } from '../utils/activityText'
import { ActivityVisual } from './ActivityVisual'
import './activity-card.css'

export function ActivityCard({ activity, completed, ageSuitable }: { activity: Activity; completed: boolean; ageSuitable?: boolean }) {
  const category = categoryMeta[activity.category]

  return (
    <Link
      to={`/activities/${activity.id}`}
      className="activity-card"
      style={{ borderLeft: `4px solid ${category.color}` }}
    >
      <div className="activity-thumb" aria-hidden="true"><ActivityVisual activity={activity} /></div>
      <div className="activity-card-body">
        <div className="activity-card-topline">
          <span className="category-label">{category.label}</span>
          {ageSuitable && <span className="age-suitable-label">Yaşına uygun</span>}
          {completed && <span className="completed-label"><Check size={14} /> Tamamlandı</span>}
        </div>
        <h3>{activity.title}</h3>
        <p>{activityShortDescription(activity)}</p>
        <div className="activity-meta">
          <span><Clock3 size={15} /> {activity.duration} dk</span>
          <span><Baby size={15} /> {formatAgeRange(activity.ageMin, activity.ageMax)}</span>
          <span><Target size={15} /> {activity.skill}</span>
        </div>
      </div>
    </Link>
  )
}