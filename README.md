# Çocuğumla Büyüyorum

Ebeveynlerin çocuklarının yaşına uygun günlük oyun ve öğrenme aktivitelerini keşfetmesini, tamamlanan aktiviteleri kaydetmesini ve ilerlemeyi takip etmesini sağlayan mobil öncelikli MVP.

> Bu uygulama tıbbi tanı, tedavi veya gelişimsel değerlendirme sunmaz. İçerikler ebeveyn-çocuk oyun ve öğrenme önerileridir.

## Teknolojiler

- React 19 ve TypeScript
- Vite 8
- React Router
- Lucide React ikonları
- Saf CSS ile responsive tasarım
- Tarayıcı `localStorage` ile yerel veri saklama
- ESLint

Ücretli servis, backend veya AI API kullanılmaz. Çocuk verileri bu MVP'de cihazdan dışarı gönderilmez.

## Kurulum

Gereksinim: Güncel Node.js LTS ve npm.

```bash
npm install
npm run dev
```

Vite'ın terminalde gösterdiği yerel adresi tarayıcıda açın. Varsayılan adres genellikle `http://localhost:5173` olur.

Üretim derlemesi ve kalite kontrolü:

```bash
npm run lint
npm run build
npm run preview
```

## MVP Özellikleri

- Hoş geldin ve çocuk oluşturma akışı
- Doğum tarihinden yaş, ay ve yaş grubu hesaplama
- Birden fazla çocuk profili ve aktif çocuk seçimi
- Yaşa uygun günlük aktivite önerileri
- 5 kategoride toplam 25 örnek aktivite
- Arama ve kategori filtreli aktivite kataloğu
- Adım adım aktivite detayları, malzemeler ve ebeveyn ipuçları
- Çocuk bazında aktivite tamamlama ve geri alma
- Toplam, haftalık, kategori bazlı ilerleme ve günlük seri
- Örnek İngilizce Kulübü içerikleri ve genişletilebilir veri modeli
- Mobil alt navigasyon ve responsive masaüstü görünümü
- Tüm uygulama verileri için merkezi storage servisi

## Klasör Yapısı

```text
src/
├── components/  # Ortak kartlar, layout ve route koruması
├── data/        # Merkezi aktivite ve İngilizce içerikleri
├── hooks/       # Uygulama durumuna erişim hook'ları
├── pages/       # Route ekranları
├── services/    # LocalStorage repository/service katmanı
├── store/       # Uygulama durumu ve provider
├── types/       # Domain veri modelleri
├── utils/       # Yaş hesaplama gibi saf yardımcılar
├── App.tsx      # Route tanımları
└── index.css    # Tasarım sistemi ve responsive stiller
```

## Veri Mimarisi

UI bileşenleri `localStorage` ile doğrudan konuşmaz. Kalıcı veri erişimi `src/services/storageService.ts` üzerinden yapılır. Bu sınır, ileride Supabase veya bir API repository'si eklenirken ekranların ve domain tiplerinin korunmasını sağlar.

Aktivite tamamlanmaları çocuk kimliği, aktivite kimliği ve tarih ile saklanır. Aktivite modelinde gelecekteki üyelik kurgusu için `isPremium` alanı bulunur.

## Gelecek Özellikler

- Supabase tabanlı kimlik doğrulama ve bulut senkronizasyonu
- Gelişmiş İngilizce dersleri, sesler, oyunlar ve ilerleme takibi
- Ücretsiz/premium üyelik ve ödeme altyapısı
- Gelişmiş ilerleme raporları
- Backend üzerinden güvenli AI ebeveyn asistanı
- Tercih ve geçmişe dayalı kişiselleştirilmiş program

AI anahtarları hiçbir zaman frontend koduna veya Vite ortam değişkenlerine eklenmemelidir; gelecekteki AI çağrıları yalnızca güvenli bir backend üzerinden yapılmalıdır.
