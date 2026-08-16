# Gerçek Ses Assetleri (Real Sound Assets)

Bu klasör, "Sesli Hayvan Bulma", "Sesli İpucu" ve "İngilizce" gibi özelliklerin
**gerçek** seslerini barındırır.

Uygulama gerçek sesi şu sırayla kullanır:

1. `public/sounds/...` altında gerçek ses dosyası varsa onu çalar.
2. Dosya yoksa **Web Audio sentezi** (osilatör tabanlı, TTS değil) devreye girer.
3. Hayvan sesi asla TTS ile taklit edilmez.
4. İngilizce kelime telaffuzu TTS ile (en-US), Türkçe karşılığı TTS ile (tr-TR)
   okunur; hayvan sesi ise kelime telaffuzundan AYRI, gerçek kayıttır.

## Mevcut dosyalar (kaynaklar: Wikimedia Commons, serbest lisanslar)

### animals/
| Anahtar (key) | Dosya                  | Hayvan   | Lisans   |
| -------------- | ---------------------- | -------- | -------- |
| cat            | animals/cat.wav        | Kedi     | CC0      |
| dog            | animals/dog.wav        | Köpek    | CC BY 4.0 |
| bird           | animals/bird.wav       | Kuş      | CC BY-SA 4.0 |
| cow            | animals/cow.wav        | İnek     | Public domain |
| sheep          | animals/sheep.mp3      | Koyun    | Public domain |
| horse          | animals/horse.mp3      | At       | Public domain |
| frog           | animals/frog.mp3       | Kurbağa  | CC BY-SA 4.0 |
| duck           | animals/duck.mp3       | Ördek    | CC BY-SA 3.0 |
| chicken        | animals/chicken.mp3    | Tavuk    | CC BY-SA 4.0 |
| lion           | animals/lion.wav       | Aslan    | CC BY 4.0 |
| rabbit         | animals/rabbit.wav     | Tavşan   | CC0      |
| bear           | animals/bear.mp3       | Ayı      | Public domain |

> **Eksik:** `elephant` (Fil) için Wikimedia Commons'ta temiz, gerçek bir fil
> sesi kaydı bulunamadı (yalnızca gramofon şarkıları/siyasi konuşmalar mevcut).
> Bu hayvan hâlâ sentez fallback kullanır ve kullanıcıya "gerçek ses dosyası
> bulunamadı" bilgisi gösterilir.

### vehicles/
| Anahtar (key) | Dosya                  | Araç     | Lisans   |
| -------------- | ---------------------- | -------- | -------- |
| car            | vehicles/car.wav       | Araba    | CC0      |
| train          | vehicles/train.wav     | Tren     | CC0      |
| ambulance      | vehicles/ambulance.wav | Ambulans | CC BY-SA 4.0 |
| firetruck      | vehicles/firetruck.wav | İtfaiye  | (eksik)  |

> **Eksik:** `firetruck` için Wikimedia Commons'ta uygun kayıt bulunamadı.

### nature/
Aşağıdaki doğa sesleri için dosya henüz eklenmemiştir (sentez fallback):
- rain, waves, thunder

## Nasıl tamamlanır?

1. Eksik hayvan (elephant) ve araç (firetruck) için lisanslı kayıtlar eklensin.
2. Dosya adları yukarıdaki tabloyla birebir eşleşmelidir (wav/mp3 desteklenir).
3. `npm run build` sonrası dosyalar `dist/sounds/...` altına kopyalanır.
4. Uygulama dosyaları otomatik algılar; ekstra kod değişikliği gerekmez.

Kod referansı: `src/utils/audio.ts` → `playRealSound()` / `hasRealSoundFile()` /
`checkAvailableRealSounds()` / `findRealSoundByKey()`.