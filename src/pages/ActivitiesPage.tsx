import { Search } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ActivityCard } from '../components/ActivityCard'
import { categoryMeta } from '../data/activities'
import { allActivities } from '../data/allActivities'
import { useApp } from '../hooks/useApp'
import type { Activity, ActivityCategory } from '../types/models'
import { calculateAge, getAgeGroups } from '../utils/age'
import { formatChildName } from '../utils/childName'
import './activities.css'

type FilterMode = 'all' | 'sound' | 'visual' | 'game' | 'home' | 'sensory'

const SOUND_INTERACTIONS = new Set(['sound-cue', 'sound-object', 'animal-finder'])
const VISUAL_INTERACTIONS = new Set([
  'contrast-track',
  'balloon-track',
  'touch-and-see',
  'motion-track',
  'moving-shape',
  'picture-match',
  'missing-shape',
])

const FILTERS: Array<{ key: FilterMode | ActivityCategory; label: string; icon: string }> = [
  { key: 'all', label: 'Tümü', icon: '✨' },
  { key: 'sound', label: 'Sesli', icon: '🔊' },
  { key: 'visual', label: 'Görsel', icon: '👀' },
  { key: 'game', label: 'Oyun', icon: '🎮' },
  { key: 'home', label: 'Evde Yap', icon: '🏠' },
  { key: 'cognitive', label: 'Bilişsel', icon: '🧠' },
  { key: 'language', label: 'Dil', icon: '🗣️' },
  { key: 'motor', label: 'Motor', icon: '🤲' },
  { key: 'social', label: 'Sosyal-Duygusal', icon: '❤️' },
  { key: 'creativity', label: 'Yaratıcılık', icon: '🎨' },
  { key: 'sensory', label: 'Duyusal', icon: '🖐️' },
]

function getActivityModes(activity: Activity): Set<FilterMode> {
  const modes = new Set<FilterMode>()
  if (activity.interactionId) {
    if (SOUND_INTERACTIONS.has(activity.interactionId)) modes.add('sound')
    if (VISUAL_INTERACTIONS.has(activity.interactionId)) modes.add('visual')
    if (
      !SOUND_INTERACTIONS.has(activity.interactionId) &&
      !VISUAL_INTERACTIONS.has(activity.interactionId)
    ) {
      modes.add('game')
    }
    if (activity.interactionId === 'touch-and-see') modes.add('sensory')
  } else {
    modes.add('home')
    const sensoryText = `${activity.description} ${activity.benefits.join(' ')}`
    if (sensoryText.includes('duzusal')) modes.add('sensory')
  }
  return modes
}

export function ActivitiesPage() {
  const { activeChild, data } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const filter = searchParams.get('filter') as FilterMode | ActivityCategory | null
  const ageGroupIndex = searchParams.get('age')
  const ageGroups = useMemo(() => getAgeGroups(), [])
  const activeAgeGroup =
    ageGroupIndex === null
      ? null
      : ageGroups[Math.min(Math.max(Number(ageGroupIndex) || 0, 0), ageGroups.length - 1)]
  const age = activeChild ? calculateAge(activeChild.birthDate) : null
  const completedIds = new Set(
    data.completions.filter((item) => item.childId === activeChild?.id).map((item) => item.activityId)
  )

  const filtered = useMemo(() => {
    const searchText = deferredSearch.toLocaleLowerCase('tr-TR')
    return allActivities.filter((activity) => {
      const matchesFilter =
        !filter ||
        filter === 'all' ||
        (Object.prototype.hasOwnProperty.call(categoryMeta, filter)
          ? activity.category === (filter as ActivityCategory)
          : getActivityModes(activity).has(filter as FilterMode))
      const matchesSearch =
        !searchText ||
        activity.title.toLocaleLowerCase('tr-TR').includes(searchText) ||
        activity.skill.toLocaleLowerCase('tr-TR').includes(searchText)
      const matchesAge =
        !activeAgeGroup ||
        (activity.ageMin <= activeAgeGroup.max && activity.ageMax >= activeAgeGroup.min)
      return matchesFilter && matchesSearch && matchesAge
    })
  }, [filter, deferredSearch, activeAgeGroup])

  const isAgeSuitable = (activity: Activity): boolean =>
    !age || (age.totalMonths >= activity.ageMin && activity.ageMax <= age.totalMonths)

  return (
    <div className="activities-page">
      <section className="page-title">
        <div>
          <span className="kicker">BİRLİKTE KEŞFEDİN</span>
          <h1>Aktiviteler</h1>
          <p>{formatChildName(activeChild?.name)} için oyun ve öğrenme önerileri.</p>
        </div>
        <div className="result-count">
          <strong>{filtered.length}</strong>
          <span>aktivite</span>
        </div>
      </section>

      <div className="filter-bar">
        <label className="search-box">
          <Search size={20} />
          <span className="sr-only">Aktivite ara</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Aktivite ara..."
          />
        </label>

        <div className="filter-tabs" role="tablist" aria-label="Yaş grubu filtresi">
          <button
            className={!activeAgeGroup ? 'active' : ''}
            onClick={() =>
              setSearchParams((params) => {
                const next = new URLSearchParams(params)
                next.delete('age')
                return next
              })
            }
          >
            Tüm Yaşlar
          </button>
          {ageGroups.map((group, index) => (
            <button
              key={group.label}
              className={activeAgeGroup?.label === group.label ? 'active' : ''}
              onClick={() =>
                setSearchParams((params) => {
                  const next = new URLSearchParams(params)
                  next.set('age', String(index))
                  return next
                })
              }
            >
              {group.label}
            </button>
          ))}
        </div>

        <div className="filter-tabs" role="tablist" aria-label="Kategori filtresi">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              className={filter === item.key ? 'active' : ''}
              onClick={() =>
                setSearchParams((params) => {
                  const next = new URLSearchParams(params)
                  if (item.key === 'all') next.delete('filter')
                  else next.set('filter', item.key)
                  return next
                })
              }
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="activity-grid listing-grid">
          {filtered.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              completed={completedIds.has(activity.id)}
              ageSuitable={isAgeSuitable(activity)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">🔎</span>
          <h2>Uygun aktivite bulunamadı</h2>
          <p>Arama, yaş veya kategori filtresini değiştirmeyi deneyin.</p>
        </div>
      )}
    </div>
  )
}