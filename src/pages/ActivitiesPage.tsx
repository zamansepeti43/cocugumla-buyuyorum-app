import { Search, SlidersHorizontal } from 'lucide-react'
import { useDeferredValue, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ActivityCard } from '../components/ActivityCard'
import { categoryMeta } from '../data/activities'
import { allActivities } from '../data/allActivities'
import { useApp } from '../hooks/useApp'
import type { ActivityCategory } from '../types/models'
import { calculateAge, isAgeInRange } from '../utils/age'

export function ActivitiesPage() {
  const { activeChild, data } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const category = searchParams.get('category') as ActivityCategory | null
  const age = activeChild ? calculateAge(activeChild.birthDate) : null
  const completedIds = new Set(data.completions.filter((item) => item.childId === activeChild?.id).map((item) => item.activityId))
  const filtered = allActivities.filter((activity) => {
    const isSuitable = !age || isAgeInRange(age.totalMonths, activity.ageMin, activity.ageMax)
    const matchesCategory = !category || activity.category === category
    const matchesSearch = activity.title.toLocaleLowerCase('tr-TR').includes(deferredSearch.toLocaleLowerCase('tr-TR'))
    return isSuitable && matchesCategory && matchesSearch
  })

  return (
    <div className="page">
      <section className="page-title"><div><span className="kicker">BİRLİKTE KEŞFEDİN</span><h1>Aktiviteler</h1><p>{activeChild?.name} için yaşına uygun oyun ve öğrenme önerileri.</p></div><div className="result-count"><strong>{filtered.length}</strong><span>aktivite</span></div></section>
      <div className="filter-bar">
        <label className="search-box"><Search size={19} /><span className="sr-only">Aktivite ara</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Aktivite ara..." /></label>
        <div className="filter-icon" title="Kategori filtresi"><SlidersHorizontal size={19} /></div>
        <div className="filter-tabs">
          <button className={!category ? 'active' : ''} onClick={() => setSearchParams({})}>Tümü</button>
          {Object.entries(categoryMeta).map(([key, item]) => <button key={key} className={category === key ? 'active' : ''} onClick={() => setSearchParams({ category: key })}><span>{item.icon}</span>{item.label}</button>)}
        </div>
      </div>
      {filtered.length ? <div className="activity-grid listing-grid">{filtered.map((activity) => <ActivityCard key={activity.id} activity={activity} completed={completedIds.has(activity.id)} />)}</div> : <div className="empty-state"><span>🔎</span><h2>Uygun aktivite bulunamadı</h2><p>Arama veya kategori filtresini değiştirmeyi deneyin.</p></div>}
    </div>
  )
}
