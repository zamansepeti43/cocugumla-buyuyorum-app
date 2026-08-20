# v0.5 UX Referans Analizi ve Geliştirme Planı

## 1. MEVCUT DURUM (v0.5 Altyapısı)

### Çalışan Sistemler
- ✅ World → Section → Content → Progress mimarisi
- ✅ 8 dünya, 25 bölüm, content mapping
- ✅ Yaş filtresi (`useWorlds`)
- ✅ Section kilitleme (`requiredStars`)
- ✅ Progress kaydı (`ProgressRecord`, `ChildProgress`, localStorage)
- ✅ Oyun componentleri registry (`games/index.ts`)
- ✅ ContentPlayerPage → gerçek oyun componentleri
- ✅ AppProvider mutation metotları
- ✅ useProgress hook
- ✅ Routing: `/home`, `/worlds`, `/worlds/:worldId`, `/worlds/:worldId/section/:sectionId`, `/worlds/content/:contentId`
- ✅ Ana navigasyon (bottom + desktop)
- ✅ Ebeveyn sayfası (`/parent`)
- ✅ İlerleme sayfası (`/progress`)
- ✅ ESLint + Build temiz

---

## 2. REFERANS GÖRSELİNE GÖRE EKSİKLER

### A) ANA EKRAN (`HomePage`)
**Referans:**
- "Bugünün Keşfi" — büyük görsel/karakter, "Keşfetmeye Başla" butonu
- "Bugünün Hikâyesi" — büyük hikâye görseli, "Hikâyeyi Başlat"
- "KALDIĞIN YERDEN DEVAM ET" — yarım bırakılan içerik, % ilerleme, "Devam Et"
- "DÜNYAYI KEŞFET" — büyük dikkat çekici kart

**Mevcut:**
- 2x2 grid keşif kartları (Keşif Haritası, İngilizce, İlerleme, Ebeveyn)
- "Bugün için" küçük aktivite kartları (4 adet)
- "Gelişim alanları" kategori strip

**DURUM: YANLIŞ TASARLANMIŞ**
- Ana ekranda "keşif vitrini" hissi yok
- "Bugünün Keşfi" / "Bugünün Hikâyesi" / "Kaldığın Yerden Devam Et" eksik
- Çok fazla kart/bağlantı var, odak yok

---

### B) KEŞİF HARİTASI (`WorldsPage`)
**Referans:**
- Düz kart grid'i olmamalı
- Renkli, illüstratif, karakterli, keşif hissi
- Dünyalar görsel olarak birbirinden ayrılmalı
- Kilitli dünyalarda "Gerekli yıldızlar: X"

**Mevcut:**
- 2x2 emoji kart grid'i
- Basit kartlar, çok az görsel ayrım
- Kilitli dünyalar "Yakında" başlığı altında

**DURUM: YANLIŞ TASARLANMIŞ**
- Keşif haritası hissi yok
- Görsel zenginlik eksik
- Dünyalar birbirinden yeterince ayrılmıyor

---

### C) DÜNYA EKRANI (`WorldDetailPage`)
**Referans:**
- Sadece düz kartlardan oluşmamalı
- "Bir dünya içinde geziyormuş" hissi vermeli
- Bölümler sırayla, yol hissi

**Mevcut:**
- Hero başlık + flat bölüm kartları listesi

**DURUM: EKSİK**
- Yol/ilerleme hissi yok
- Görsel derinlik eksik

---

### D) BÖLÜM EKRANI (`SectionPage`) — **EN ÖNEMLİ EKSİK**
**Referans:**
- Basit liste olmamalı
- "İLERLEME YOLU" hissi:
  - ✓ Tamamlanan
  - ↓ (bağlantı çizgisi)
  - ⭐ Mevcut/aktif
  - ↓
  - 🔒 Kilitli
  - "Gerekli yıldız: X"
- "Bir sonraki aşamaya geçebilirim" hissi

**Mevcut:**
- Flat content card listesi
- Hiçbir görsel ilerleme yolu yok

**DURUM: ÇOK EKSİK**
- Bu ekran referansın özüne en yakın olanı
- Progress path/road visualization tamamen eksik

---

### E) İÇERİK / DERS (`ContentPlayerPage`)
**Referans:**
- Kelime + görsel + ses + tekrar + mini oyun
- Otomatik tamamlama (ilerlemeli içerikler için)
- "Tamamladık" butonu SADECE ebeveyn/etkinliklerde

**Mevcut:**
- Oyun veya placeholder render
- Manuel "Tamamla" butonu (her içerik için)
- Oyunlarda otomatik completion yok

**DURUM: YANLIŞ TASARLANMIŞ**
- Manuel butonu her yerde kullanıyoruz
- Oyun otomatik tamamlanmıyor
- Ödül ekranı yok

---

### F) SONUÇ / ÖDÜL EKRANI — **TAMAMEN EKSİK**
**Referans:**
- 🎉 "HARİKA!"
- "Tüm hayvan seslerini buldun!"
- ⭐ +10
- "Yeni bölüm açıldı!"
- DEVAM ET →

**Mevcut:**
- Hiç yok

**DURUM: TAMAMEN EKSİK**
- En güçlü motivasyon unsuru eksik

---

### G) YAŞ GRUPLARI (0-2 yaş)
**Referans:**
- 0-2: "Birlikte Büyüyoruz" — ayrı deneyim
- 3+: "Keşfet & Öğren" — ana sistem
- 0-2'de klasik ders sistemi YOK
- Ses, görsel, hareket, duyular, ebeveyn rehberliği

**Mevcut:**
- Aynı sistem tüm yaşlar için
- 0-2 ayrı deneyimi yok

**DURUM: EKSİK**
- İleride aşama olarak eklenecek

---

### H) EBEVEYN (`ParentPage`)
**Referans:**
- Genel gelişim
- Alan bazlı ilerleme (İngilizce, Konuşma, Matematik)
- Öneriler
- Birlikte yapılabilecek etkinlikler

**Mevcut:**
- Temel istatistikler
- Yaş grubu önerileri
- Son çalışmalar listesi

**DURUM: KISMI EKSİK**
- Alan bazlı breakdown eksik
- Aktivite önerileri eksik

---

### I) İLERLEME SİSTEMİ
**Referans:**
- ÖĞREN → PEKİŞTİR → TAMAMLA → ÖDÜL KAZAN → YENİ BÖLGE AÇ
- Görsel ilerleme yolu

**Mevcut:**
- ProgressRecord + ChildProgress + localStorage ✅
- requiredStars kilidi ✅
- Ama görsel ilerleme yolu/road yok
- Ödül ekranı yok

**DURUM: TEKNİK TEMEL VAR, GÖRSEL/DENEYİM EKSİK**

---

## 3. HANGİ DOSYALARA DOKUNMALIYIZ

### Kod Değişecek
- `src/pages/HomePage.tsx` — Ana ekran hero bölümleri
- `src/pages/WorldsPage.tsx` — Keşif haritası görsel zenginleştirme
- `src/pages/WorldDetailPage.tsx` — Dünya ekranı iyileştirme
- `src/pages/SectionPage.tsx` — İlerleme yolu/road visualization
- `src/pages/ContentPlayerPage.tsx` — Ödül ekranı, auto-completion
- `src/pages/ProgressPage.tsx` — Yolculuk hissi
- `src/pages/ParentPage.tsx` — Alan bazlı breakdown
- `src/hooks/useProgress.ts` — Auto-completion, game callbacks
- `src/index.css` — Yeni stiller (progress path, reward, world visuals)

### Yeni Dosyalar
- `src/components/RewardScreen.tsx` — Ödül/başarı ekranı
- `src/components/ProgressPath.tsx` — Bölüm içi ilerleme yolu
- `src/components/ContinueCard.tsx` — "Kaldığın Yerden Devam Et"
- `src/components/WorldHero.tsx` — Dünya ekranı görsel hero
- `src/data/stories.ts` — Hikâye içerikleri (sonraki aşama)

### Dokunulmayacak
- `src/types/models.ts` — Veri modelleri korunuyor
- `src/data/worlds.ts` — Dünya tanımları korunuyor
- `src/data/sections.ts` — Bölüm tanımları korunuyor
- `src/data/content.ts` — Content mapping korunuyor
- `src/components/games/` — Oyun componentleri DOĞRUDAN DEĞİŞTİRİLMEYECEK
- `src/utils/age.ts` — Yaş hesaplama korunuyor
- `src/utils/audio.ts` — Ses sistemi korunuyor
- `src/services/storageService.ts` — localStorage korunuyor

---

## 4. GELİŞTİRME SIRASI

### AŞAMA 1: ÖDÜL SİSTEMİ + OTOMATİK TAMAMLAMA
1. `RewardScreen.tsx` oluştur (🎉 + yıldız + yeni açılan içerik + DEVAM ET)
2. `ContentPlayerPage.tsx` → oyun tamamlandığında otomatik reward screen göster
3. Oyun componentlerine `onComplete` callback ekle (isteğe bağlı, mevcut oyunları değiştirmeden)
4. Manuel "Tamamla" butonunu sadece non-game içeriklerde göster

### AŞAMA 2: ANA EKRAN DÖNÜŞÜMÜ
1. `HomePage.tsx` yeniden tasarım:
   - "Bugünün Keşfi" hero kartı
   - "Bugünün Hikâyesi" hero kartı
   - "Kaldığın Yerden Devam Et" kartı (useProgress ile)
   - "Dünyayı Keşfet" büyük kart
2. `ContinueCard.tsx` oluştur

### AŞAMA 3: BÖLÜM İLERLEME YOLU
1. `ProgressPath.tsx` oluştur — section içinde visual road:
   - ✓ completed
   - ⭐ current/active
   - 🔒 locked + "X yıldız gerekiyor"
2. `SectionPage.tsx` → ProgressPath entegre et
3. ContentCard'ları yol üzerinde node'lara dönüştür

### AŞAMA 4: KEŞİF HARİTASI GÖRSEL GÜÇLENDİRME
1. `WorldCard.tsx` yeniden tasarım — daha görsel, daha az "form"
2. `WorldsPage.tsx` — dünya araları geçiş hissi
3. `WorldHero.tsx` oluştur — dünya detay görsel hero

### AŞAMA 5: DÜNYA EKRANI İYİLEŞTİRME
1. `WorldDetailPage.tsx` — section'ları yol/road olarak göster
2. Section progress gösterimi

### AŞAMA 6: İLERLEME SAYFASI YENİLENMESİ
1. `ProgressPage.tsx` — dashboard yerine "yolculuk" hissi
2. Son keşifler, yıldızlar, bölümler

### AŞAMA 7: EBEVEYN SAYFASI GENİŞLETME
1. `ParentPage.tsx` — alan bazlı ilerleme breakdown
2. İngilizce, Matematik, Konuşma ayrı kartlar
3. Aktivite önerileri

### AŞAMA 8: 0-2 YAŞ MODU (SONRASI)
1. Yaş grubu kontrolü
2. Ayrı layout/deneyim
3. "Birlikte Büyüyoruz" banner

---

## 5. RİSKLER

| Risk | Önlem |
|------|-------|
| Mevcut oyunları bozmak | Oyun componentlerine DOĞRUDAN DOKUNMA, wrapper/context kullan |
| Progress kaybı | Migration + fallback mekanizması |
| Build/Lint hatası | Her aşamada kontrol |
| Görsel tasarım çöküşü | Kademeli upgrade, CSS sınıfları ekle |

---

## 6. ÖNCELİKLER

1. **SectionPage → Progress Path** (en önemli UX eksikliği)
2. **Reward Screen** (en güçlü motivasyon unsuru)
3. **Ana Ekran Hero** (ilk izlenim)
4. **Otomatik Completion** (yanlış buton kullanımı)

Bu plan onaylandıktan sonra AŞAMA 1'e geçilecek.
