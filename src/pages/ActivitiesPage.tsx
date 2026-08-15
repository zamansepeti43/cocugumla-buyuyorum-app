import { Search, SlidersHorizontal } from 'lucide-react'
import { useDeferredValue, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ActivityCard } from '../components/ActivityCard'
import { activities, categoryMeta } from '../data/activities'
import { useApp } from '../hooks/useApp'
import type { ActivityCategory } from '../types/models'
import { calculateAge } from '../utils/age'

export function ActivitiesPage() {
  const { activeChild, data } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const category = searchParams.get('category') as ActivityCategory | null
  const age = activeChild ? calculateAge(activeChild.birthDate) : null
  const completedIds = new Set(
    data.completions.filter((item) => item.childId === activeChild?.id).map((item) => item.activityId)
  )

  const filtered = activities.filter((activity) => {
    const isSuitable = !age || (age.totalMonths >= activity.ageMin && age.totalMonths <= activity.ageMax)
    const matchesCategory = !category || activity.category === category
    const matchesSearch = activity.title
      .toLocaleLowerCase('tr-TR')
      .includes(deferredSearch.toLocaleLowerCase('tr-TR'))
    return isSuitable && matchesCategory && matchesSearch
  })

  const allActivities = activities.filter((activity) => {
    const isSuitable = !age || (age.totalMonths >= activity.ageMin && age.totalMonths <= activity.ageMax)
    const matchesCategory = !category || activity.category === category
    const matchesSearch = activity.title
      .toLocaleLowerCase('tr-TR')
      .includes(deferredSearch.toLocaleLowerCase('tr-TR'))
    return isSuitable && matchesCategory && matchesSearch
  })

  return (
    <div className="page">
      <section className="page-title" style={{ background: 'linear-gradient(135deg, #1e1e2f 0%, #0d0d14 100%)', padding: '32px 20px', borderRadius: '24px 24px 0 0', marginBottom: '32px' }}>
        <div>
          <span className="kicker" style={{ color: '#fbbc33', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>BİRLİKTE KEŞFEDİN</span>
          <h1 style={{ color: '#f5f0eb', fontSize: '32px', fontWeight: '600' }}>Aktiviteler</h1>
          <p style={{ color: '#a8a79c' }}>{activeChild?.name} için oyun ve öğrenme önerileri.</p>
        </div>
        <div className="result-count" style={{ marginTop: '16px', color: '#6b6b80' }}>
          <strong>{filtered.length}</strong>
          <span>aktivite</span>
        </div>
      </section>

      <div className="filter-bar" style={{ background: 'linear-gradient(135deg, #1e1e2f 0%, #0f0f1a 100%)', padding: '24px 20px', borderRadius: '16px', marginBottom: '24px' }}>
        <label className="search-box">
          <Search size={20} />
          <span className="sr-only">Aktivite ara</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Aktivite ara..."
            style={{ width: '100%', padding: '12px 48px 12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '24px', color: '#f5f0eb', fontSize: '14px' }}
          />
        </label>

        <div className="filter-icon" title="Kategori filtresi" style={{ marginLeft: '16px' }}>
          <SlidersHorizontal size={20} />
        </div>

        <div className="filter-tabs" style={{ display: 'flex', gap: '12px', marginTop: '16px', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '20px' }}>
          <button
            style={{ background: 'rgba(251, 189, 51, 0.1)', color: '#fbbc33', padding: '8px 16px', borderRadius: '20px', fontWeight: '500', border: '1px solid #fbbc33' }}
            className={!category ? 'active' : ''}
            onClick={() => setSearchParams({})
          }
          >
            Tümü
          </button>

          {Object.entries(categoryMeta).map(([key, item]) => (
            <button
              key={key}
              style={{ background: 'rgba(251, 189, 51, 0.1)', color: '#fbbc33', padding: '8px 16px', borderRadius: '20px', fontWeight: '500', margin: '4px', border: '1px solid #fbbc33' }}
              className={category === key ? 'active' : ''}
              onClick={() => setSearchParams({ category: key })}
            >
              <span style={{ color: '#fbbc33' }}>{item.icon}</span>
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
            />
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <span style={{ fontSize: '48px', color: '#333' }}>🔎</span>
          <h2 style={{ color: '#6b6b80', margin: '16px 0' }}>Uygun aktivite bulunamadı</h2>
          <p style={{ color: '#a8a79c', fontSize: '14px' }}>Arama veya kategori filtresini değiştirmeyi deneyin.</p>
        </div>
      )}

      {/* Tüm Etkinlikler Bölümü */}
      <section className="section-block" style={{ marginTop: '24px' }}>
        <div className="page-title" style={{ background: 'linear-gradient(135deg, #1e1e2f 0%, #0f0f1a 100%)', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px' }}>
          <div>
            <span className="kicker" style={{ color: '#fbbc33', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TÜM ETKİNLİKLER</span>
            <h1>Tüm Aktiviteler</h1>
          </div>
        </div>

        <div className="filter-bar" style={{ background: 'linear-gradient(135deg, #1e1e2f 0%, #0f0f1a 100%)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <label className="search-box">
            <Search size={16} />
            <span className="sr-only">Aktivite ara</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Aktivite ara..."
              style={{ width: '100%', padding: '12px 48px 12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '24px', color: '#f5f0eb', fontSize: '14px' }}
            />
          </label>
        </div>

        <div className="activity-grid listing-grid">
          {allActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              completed={completedIds.has(activity.id)}
            />
          ))}
        </div>

        <div className="empty-state" style={{ textAlign: 'center', padding: '20px', color: '#6b6b80' }}>
          <span>🔍</span>
          <h2>Filtre uygulayarak daha fazlaaktivite bulun</h2>
          <p>Yaş, kategori veya arama ile filtreleyebilirsiniz.</p>
        </div>
      </section>
    </div>
  )
}