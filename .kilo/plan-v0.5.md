# Çocuğumla Büyüyorum v0.5 Mimari Dönüşüm Planı

## 1. MEVCUT MİMARİ ÖZETİ

### Dosya Yapısı
```
src/
├── App.tsx                          # Router tanımları
├── components/
│   ├── AppLayout.tsx                # Header, bottom nav, outlet
│   ├── ActivityCard.tsx             # Aktivite kartı
│   ├── ActivityInteractionPanel.tsx # Oyun mount noktası
│   ├── ActivityVisual.tsx           # Aktivite görseli
│   ├── HowToVisual.tsx              # Adım görseli
│   ├── Lightbox.tsx                 # Görsel büyütme
│   ├── ProtectedRoute.tsx           # Auth guard
│   └── games/                       # 30 oyun componenti + GameShell + index
├── data/
│   ├── activities.ts                # 20 temel aktivite
│   ├── activityLibrary.ts           # ~40 ek aktivite (yaş grupları)
│   ├── allActivities.ts             # Birleşik + expanded instructions
│   └── englishLessons.ts            # 4 İngilizce dersi
├── hooks/
│   ├── useApp.ts                    # Context accessor
│   └── useGameSession.ts            # Oyun session state machine
├── pages/
│   ├── WelcomePage.tsx              # onboarding
│   ├── HomePage.tsx                 # Ana sayfa (daily program)
│   ├── ActivitiesPage.tsx           # Aktivite listesi + filtreler
│   ├── ActivityDetailPage.tsx       # Aktivite detay + oyun
│   ├── EnglishPage.tsx              # İngilizce dersleri
│   ├── ProgressPage.tsx             # İlerleme istatistikleri
│   ├── ProfilePage.tsx              # Çocuk profilleri
│   └── CreateChildPage.tsx          # Yeni profil oluşturma
├── services/
│   └── storageService.ts            # localStorage CRUD
├── store/
│   ├── AppProvider.tsx              # Global state
│   └── app-context.ts               # Context type
├── types/
│   └── models.ts                    # Tüm domain modelleri
└── utils/
    ├── age.ts                       # Yaş hesaplama + gruplar
    ├── audio.ts                     # TTS + real sound + oscillator
    ├── dailyProgramEngine.ts        # Günlük aktivite seçimi
    ├── childName.ts, greeting.ts    # Yardımcılar
    ├── activityText.ts, activityScene.ts, howToSteps.ts
```

### Mevcut Veri Modeli
- **Activity**: Tek aktivite (id, title, description, category, ageMin/Max, interactionId, instructions, materials, parentTip, benefits...)
- **ChildProfile**: id, name, birthDate, interests, notes
- **AppData**: hasOnboarded, children[], activeChildId, completions[], favorites[], observations[]
- **EnglishLesson**: id, title, category, ageMin/Max, words[]

### Mevcut Routing
- `/` -> WelcomePage (onboarding)
- `/child/new` -> CreateChildPage
- `/home` -> HomePage (daily program + kategori strip)
- `/activities` -> ActivitiesPage (flat liste + filtreler)
- `/activities/:id` -> ActivityDetailPage (detay + oyun)
- `/english` -> EnglishPage (flat ders listesi)
- `/progress` -> ProgressPage (istatistikler)
- `/profile` -> ProfilePage (profil yönetimi)

### Mevcut Oyun Sistemi
- 30 oyun componenti `games/` klasöründe
- `games/index.ts` -> `gameRenderers` + `gameTitles` registry
- `ActivityInteractionPanel` -> activity.interactionId'e göre oyunu `GameShell` içinde render eder
- `GameShell` -> fullscreen wrapper

### Güçlü Yönler
- Temiz React + Vite + TypeScript stack
- Yaş hesaplama sistemi zaten çalışıyor
- Oyunlar çalışır durumda, bozulmayacak
- Audio sistemi (TTS + real sound) var
- localStorage persistence çalışıyor
- Responsive CSS tasarımı var

### Zayıf Yönler / Dönüşüm Gerektirenler
- Merkez "Aktiviteler" flat listesi - keşif odaklı değil
- İlerleme sistemi basit "Tamamladım" butonu
- İngilizce ilerlemeli alan değil, flat ders listesi
- 0-2 yaş ayrı deneyim yok
- Ebeveyn alanı yok
- Dünya/bölüm/section konsepti yok
- Otomatik ilerleme kaydı yok

---

## 2. YENİ VERİ MODELİ

### Yeni Tipler (`types/models.ts`'ye eklenecek)

```typescript
// Yeni dünya sistemi
export type WorldId = 'forest' | 'space' | 'english' | 'math' | 'speech' | 'games' | 'stories' | 'fairy-tales'

export interface World {
  id: WorldId
  title: string
  description: string
  icon: string
  color: string
  minAge: number
  maxAge: number
  order: number
}

export interface Section {
  id: string
  worldId: WorldId
  title: string
  description: string
  order: number
  minAge: number
  maxAge: number
  requiredStars?: number
}

export interface ContentItem {
  id: string
  sectionId: string
  type: 'lesson' | 'game' | 'story' | 'interactive'
  title: string
  description: string
  order: number
  interactionId?: ActivityInteractionId
  isLocked: boolean
  minAge: number
  maxAge: number
  duration: number
  parentTip?: string
  benefits?: string[]
  materials?: string[]
  instructions?: string[]
}

export interface ProgressRecord {
  childId: string
  worldId: WorldId
  sectionId: string
  contentId: string
  completed: boolean
  completedAt?: string
  stars?: number
  attempts?: number
}

export interface ChildProgress {
  childId: string
  currentWorld: WorldId
  unlockedSections: string[]
  completedContent: string[]
  totalStars: number
  lastPlayedAt: string
}
```

### Veri Migrasyonu
- Mevcut `Activity` modeli korunur (geri uyumluluk)
- `allActivities` verisi `ContentItem`'lara map edilir
- Mevcut `completions` `ProgressRecord`'a migre edilir
- Eski aktivite detay sayfası yeni sisteme bağlanır

---

## 3. YENİ SAYFA YAPISI

### Routes
```
/                           -> WelcomePage (değişmez)
/child/new                  -> CreateChildPage (değişmez)
/profile                    -> ProfilePage (değişmez)

/home                       -> HomePage (yeni keşif odaklı)
/worlds/:worldId            -> WorldDetailPage (yeni)
/worlds/:worldId/section/:sectionId  -> SectionPage (yeni)
/english                    -> EnglishPage (ilerlemeli hale getir)
/progress                   -> ProgressPage (genişlet)
/parent                     -> ParentPage (yeni)
/activities                 -> ActivitiesPage (eski, korunur)
/activities/:id             -> ActivityDetailPage (eski, korunur)
```

### Ana Ekran (HomePage) - Yeni Yapı
```
┌─────────────────────────────┐
│ 👋 Merhaba Deniz!           │
│ 3 yaş 2 ay · 3-4 yaş       │
│ [Profil avatarı]            │
├─────────────────────────────┤
│ 🌟 Bugünün Keşfi            │
│ ┌─────────────────────────┐ │
│ │ Hayvanları Tanı          │ │
│ │ Orman · 10 dk           │ │
│ │ ████████░░  %70         │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ 📖 Bugünün Hikâyesi         │
│ "Küçük Ayı ve Balon"       │
│ [Hikâyeyi Dinle]            │
├─────────────────────────────┤
│ 🗺️ Keşfet                   │
│ ┌────┐ ┌────┐ ┌────┐       │
│ │🌳  │ │🚀  │ │🔢  │       │
│ │Or..│ │Uz..│ │Mat.│       │
│ └────┘ └────┘ └────┘       │
│ ┌────┐ ┌────┐ ┌────┐       │
│ │🇬🇧  │ │📖  │ │🧚  │       │
│ │İng.│ │Hik.│ │Mas.│       │
│ └────┘ └────┘ └────┘       │
├─────────────────────────────┤
│ 👨‍👩‍👧 Ebeveyn               │
│ [Ebeveyn özet kartı]        │
└─────────────────────────────┘
```

### Keşif Haritası (WorldsPage)
- 8 dünya kartı
- Her dünya yaş aralığına göre kilitli/açık
- Açık olanlara tıklayınca WorldDetailPage
- Kilitli olanlar "Yakında" badge'i

### Dünya Detay (WorldDetailPage)
```
🌳 ORMAN
Hayvanlar, doğa, sesler

Bölümler:
┌─────────────────────────────┐
│ ✅ Hayvanları Tanı           │
│    ████████████ 5/5         │
│    ⭐ 3 yıldız               │
├─────────────────────────────┤
│ 🔒 Hayvan Sesleri            │
│    3 yıldız topla            │
└─────────────────────────────┘
```

### Bölüm Sayfası (SectionPage)
- Section içindeki content'ler
- Her content kartında oyun/ders bilgisi
- Tamamlananlar ✓, kilitliler 🔒
- Tıklayınca oyun/ders açılır

---

## 4. İLERLEME SİSTEMİ

### Otomatik İlerleme
- Oyun/ders tamamlandığında otomatik kayıt
- "Tamamladık" butonu sadece:
  - Ebeveyn aktivitelerinde
  - Serbest etkinliklerde
  - İlerleme gerektirmeyen içeriklerde

### Yıldız Sistemi
- Her içerik 1-3 yıldız arası puan
- Yıldızlar doğruluk/tamamlama bazlı
- Bölümler belirli yıldız sayısına göre açılır

### İlerleme Kayıtları
```typescript
interface ProgressRecord {
  childId: string
  worldId: WorldId
  sectionId: string
  contentId: string
  completed: boolean
  completedAt?: string
  stars: number
  attempts: number
}
```

---

## 5. 0-2 YAŞ ÖZEL DENEYİM

### Özellikler
- Ayrı giriş ekranı / banner
- Büyük dokunmatik butonlar
- Az ama kaliteli içerik
- Sesli rehberlik
- Ebeveyn "Birlikte" modu vurgusu
- Kısa süreli aktiviteler (max 5 dk)

### İçerik Kategorileri
- Duyular (kontrast kartları, dokunma)
- Sesler (hayvan sesleri, müzik)
- Hareket (basit motor aktiviteleri)
- İlk Kelimeler (TTS ile kelime çiftleri)
- Ebeveynle Birlikte (guided activities)

---

## 6. EBEVEYN ALANI

### ParentPage
```
┌─────────────────────────────┐
│ 👨‍👩‍👧 Ebeveyn Paneli            │
├─────────────────────────────┤
│ 📊 Bugün Ne Yaptı?          │
│ - 3 aktivite tamamlandı     │
│ - 15 dk ekran süresi        │
│ - En çok: Hayvanlar          │
├─────────────────────────────┤
│ 💡 Gelişim Özeti            │
│ - Dil: Kelime sayısı artıyor │
│ - Motor: Denge gelişiyor    │
│ - Öneri: Şekil aktivitesi   │
├─────────────────────────────┤
│ 🎯 Bugün Ne Yapabilirim?    │
│ [Yaşa uygun aktivite öneri] │
├─────────────────────────────┤
│ 📚 Ebeveyn Dersleri         │
│ - "Erken çocuklukta oyun"   │
│ - "Ekran süresi ipuçları"   │
└─────────────────────────────┘
```

---

## 7. İNGİLİZCE İLERLEMELİ ALAN

### Yapı
```
English
 ├── Colors
 │   ├── Red Apple 🍎
 │   ├── Blue Sky 🦋
 │   └── Yellow Sun ☀️
 ├── Animals
 │   ├── Cat 🐱
 │   ├── Dog 🐶
 │   └── Bird 🐦
 ├── Numbers
 │   ├── One 1️⃣
 │   ├── Two 2️⃣
 │   └── Three 3️⃣
 └── Family
     ├── Mom 👩
     ├── Dad 👨
     └── Baby 👶
```

### Her Kelime/Ders
- Kelime + görsel + ses
- TTS telaffuz (EN + TR)
- Gerçek ses dosyası (hayvan sesi vb.)
- Mini oyun/quiz
- İlerleme takibi

---

## 8. MATEMATİK ALANI

### Yaş Aşamaları
- 2-3 yaş: Renkler, şekiller, az/çok, 1-3
- 3-4 yaş: 1-10, eşleştirme, sıralama
- 4-5 yaş: Toplama/çıkarma başlangıcı, sayılar
- 5+: İleri matematik

### İçerik Tipleri
- Ders (TTS + görsel)
- Oyun (mevcut game componentleri)
- Quiz
- İnteraktif

---

## 9. KORUNACAK SİSTEMLER

✅ **KESINLIKLE KORUNACAK**
- `src/utils/age.ts` - Yaş hesaplama
- `src/utils/audio.ts` - TTS + ses sistemi
- `src/components/games/` - Tüm oyun componentleri
- `src/components/games/index.ts` - Game registry
- `src/components/games/GameShell.tsx` - Fullscreen wrapper
- `src/services/storageService.ts` - localStorage
- `src/hooks/useApp.ts` - Context hook
- `src/utils/childName.ts`, `greeting.ts` - Yardımcılar
- Responsive CSS (`index.css`)
- Tüm mevcut veri (activities, activityLibrary, englishLessons)

⚠️ **AYRIŞTIRILACAK / GENİŞLETİLECEK**
- `src/types/models.ts` - Yeni tipler eklenecek
- `src/store/AppProvider.tsx` - Yeni state alanları
- `src/App.tsx` - Yeni route'lar eklenecek
- `src/pages/HomePage.tsx` - Yeni yapıya adapte edilecek
- `src/pages/ProgressPage.tsx` - Genişletilecek

❌ **KALDIRILACAK / DEĞİŞTİRİLECEK**
- `src/pages/ActivitiesPage.tsx` - Flat liste kalkacak, Keşif Haritası gelecek
- `src/pages/ActivityDetailPage.tsx` - Aktivite detay yeni sisteme bağlanacak
- `src/utils/dailyProgramEngine.ts` - Günlük program mantığı değişecek

---

## 10. UYGULAMA SIRASI

### AŞAMA 1: Altyapı (1-2 gün)
1. Yeni veri modellerini `types/models.ts`'ye ekle
2. `World`, `Section`, `ContentItem`, `ProgressRecord` tipleri
3. Yeni data dosyaları:
   - `src/data/worlds.ts` - 8 dünya tanımı
   - `src/data/sections.ts` - Bölümler
   - `src/data/content.ts` - İçerikler (mevcut aktivitelerden map)
4. Migrasyon fonksiyonu: eski Activity -> ContentItem
5. Storage service genişlet: progress kayıtları

### AŞAMA 2: Keşif Haritası (2-3 gün)
1. `WorldsPage` oluştur - 8 dünya kartı
2. `WorldDetailPage` oluştur - bölüm listesi
3. `SectionPage` oluştur - içerik listesi
4. Routing ekle
5. Kilit/acık sistemi (yaş + ilerleme bazlı)

### AŞAMA 3: Ana Ekran Yenileme (1-2 gün)
1. `HomePage`'i yeni keşif odaklı yapıya çevir
2. "Bugünün Keşfi" kartı
3. "Bugünün Hikâyesi" (ilk hikaye seçimi)
4. Keşif Haritası girişleri
5. Ebeveyn girişi

### AŞAMA 4: İlerleme Sistemi (1-2 gün)
1. `ProgressRecord` kayıt sistemi
2. Oyun/ders tamamlandığında otomatik kayıt
3. Yıldız sistemi
4. `ProgressPage` genişlet
5. Bölüm açılma mantığı

### AŞAMA 5: İngilizce Alanı (1-2 gün)
1. `EnglishPage`'i ilerlemeli yap
2. Kelime seviyeleri
3. Her kelime için mini oyun/quiz
4. İlerleme takibi

### AŞAMA 6: 0-2 Yaş Deneyimi (1-2 gün)
1. Yaş bazlı layout seçimi
2. Büyük butonlar, az içerik
3. Sesli rehberlik
4. Ebeveyn modu vurgusu

### AŞAMA 7: Ebeveyn Alanı (1-2 gün)
1. `ParentPage` oluştur
2. Günlük özet
3. Gelişim ipuçları
4. Yaşa göre öneriler

### AŞAMA 8: Matematik Alanı (1-2 gün)
1. Yaş aşamalarına göre içerik
2. Mevcut oyunları bağla
3. İlerleme takibi

### AŞAMA 9: Animasyon & Görsel Güçlendirme (2-3 gün)
1. Dünya görselleri
2. Bölüm geçiş animasyonları
3. Oyun ödüllendirme ekranları
4. Karakter/avatar sistemi

### AŞAMA 10: Test & Polise (1-2 gün)
1. Build test
2. Yaş grubu testleri
3. Oyun testleri
4. Regresyon testi
5. Performans

---

## 11. RİSKLİ ALANLAR

| Risk | Seviye | Önlem |
|------|--------|-------|
| Mevcut oyunları bozmak | Yüksek | Oyun componentlerini DOĞRUDAN DEĞİŞTİRME, sadece yeni sayfalardan çağır |
| Veri kaybı | Yüksek | Migrasyon fonksiyonu + fallback |
| TypeScript hataları | Orta | Her aşamada `tsc --noEmit` |
| Performans düşüşü | Orta | 30 oyunu lazy load et |
| Yaş hesaplama hatası | Düşük | Mevcut `age.ts` korunuyor |
| localStorage quota | Düşük | Sadece progress kaydı, az veri |

---

## 12. KORUNACAK DOSYALAR (DOKUNMA)

```
src/utils/age.ts
src/utils/audio.ts
src/components/games/           (tümü)
src/components/games/index.ts
src/components/games/GameShell.tsx
src/services/storageService.ts
src/hooks/useApp.ts
src/utils/childName.ts
src/utils/greeting.ts
src/data/activities.ts
src/data/activityLibrary.ts
src/data/englishLessons.ts
src/index.css
```

---

## 13. YENİ DOSYALAR (OLUŞTURULACAK)

```
src/types/models.ts             (genişletilecek)
src/data/worlds.ts              (yeni)
src/data/sections.ts            (yeni)
src/data/content.ts             (yeni - mevcut aktivitelerden map)
src/data/stories.ts             (yeni - hikaye verileri)
src/hooks/useProgress.ts        (yeni)
src/hooks/useWorlds.ts          (yeni)
src/pages/WorldsPage.tsx        (yeni)
src/pages/WorldDetailPage.tsx   (yeni)
src/pages/SectionPage.tsx       (yeni)
src/pages/HomePage.tsx          (yeniden yazılacak)
src/pages/ProgressPage.tsx      (genişletilecek)
src/pages/EnglishPage.tsx       (yeniden yazılacak)
src/pages/ParentPage.tsx        (yeni)
src/components/DiscoveryMap.tsx (yeni)
src/components/WorldCard.tsx    (yeni)
src/components/SectionCard.tsx  (yeni)
src/components/ContentCard.tsx  (yeni)
src/components/ParentDashboard.tsx (yeni)
src/components/StoryPlayer.tsx  (yeni)
```

---

## 14. ONAY BEKLENEN KARARLAR

1. **Dünya listesi**: 8 dünya doğru mu? Eksik/çok mu?
2. **İsimlendirme**: "Keşif Haritası" vs "Dünyalar" vs başka?
3. **0-2 yaş**: Ayrı giriş mi, yoksa ana ekranda filtre mi?
4. **İlerleme**: Yıldız sistemi 1-3 mü, 1-5 mi?
5. **Ebeveyn**: Ana ekranda mı, ayrı sekmede mi?
6. **Hikayeler**: Mevcut veriden mi, yeni içerik mi?
7. **Animasyon**: Basit CSS mi, Framer Motion mu?

---

Bu plan onaylandıktan sonra AŞAMA 1'e geçilecek.
