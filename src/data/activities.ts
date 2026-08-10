import type { Activity, ActivityCategory, ActivityInteractionId, ActivitySkill } from '../types/models'

const makeActivity = (
  id: string,
  title: string,
  description: string,
  category: ActivityCategory,
  duration: number,
  materials: string[],
  instructions: string[],
  parentTip: string,
  benefits: string[],
  ageMin = 24,
  ageMax = 84,
  activityType: Activity['activityType'] = 'guided',
  interactionId?: ActivityInteractionId,
): Activity => ({
  id,
  title,
  description,
  category,
  skill: 'attention' as ActivitySkill,
  duration,
  materials,
  instructions,
  parentTip,
  benefits,
  ageMin,
  ageMax,
  difficulty: 'easy',
  safetyNotes: [],
  variations: [],
  repeatCooldownDays: 1,
  activityType,
  interactionId,
  completed: false,
  isPremium: false,
})

export const activities: Activity[] = [
  makeActivity('cog-color-hunt', 'Kontrast Kart Takibi', 'Bebeğinizle siyah-beyaz kontrast görselleri kısa süre takip edin.', 'cognitive', 4, ['Siyah-beyaz kartlar veya desenli bez'], ['Bebeği sırtüstü rahat bir pozisyona alın.', 'Kartı yüzünden 20-30 cm uzakta yavaşça sağa ve sola hareket ettirin.', 'Bebeğin bakışını takip etmesine kısa aralarla fırsat verin.'], 'Dikkati dağıldığında zorlamadan etkinliği bitirin.', ['görsel takip', 'odaklanma'], 0, 3),
  makeActivity('cog-memory-tray', 'Neyi Sakladım?', 'Tepsideki nesnelerden hangisinin kaybolduğunu birlikte bulun.', 'cognitive', 8, ['Tepsi', '3-4 güvenli nesne', 'Örtü'], ['Nesneleri birlikte inceleyin ve adlandırın.', 'Üzerlerini örtüp bir nesneyi sessizce çıkarın.', 'Hangi nesnenin eksik olduğunu birlikte bulun.'], 'Önce iki veya üç nesne ile başlayın.', ['hafıza', 'dikkat'], 37, 72),
  makeActivity('cog-shape-sort', 'Şekil Dedektifi', 'Büyük parçaları temel şekillerine göre ayırın.', 'cognitive', 10, ['Büyük bloklar veya kapaklar', 'İki kutu'], ['Nesneleri ortaya koyun.', 'Yuvarlak ve köşeli parçaları ayrı kutulara atın.', 'Ayırdığınız parçaları birlikte sayın.'], 'Tek seferde az sayıda parça vererek süreci sade tutun.', ['sınıflandırma', 'problem çözme'], 19, 36),
  makeActivity('cog-pattern', 'Sırayı Devam Ettir', 'Basit renk veya nesne örüntülerini tamamlayın.', 'cognitive', 10, ['İki renk blok veya mandal'], ['Kırmızı-mavi gibi iki parçalı bir sıra kurun.', 'Sıradaki parçayı çocuğunuza sorun.', 'Ardından çocuğun kendi örüntüsünü kurmasına fırsat verin.'], 'Önce iki öğeli örüntü ile başlayıp zamanla uzatın.', ['örüntü kurma', 'mantık'], 49, 96),
  makeActivity('cog-count-steps', 'Adımlarımızı Sayalım', 'Ev içinde kısa bir rotada adımları birlikte sayın.', 'cognitive', 6, ['Malzeme gerekmiyor'], ['Kısa bir hedef belirleyin.', 'Her adımda yüksek sesle sayı söyleyin.', 'Farklı rotalarda tekrar edin.'], 'Sayı sırası karışırsa oyunu bölmeden birlikte devam edin.', ['sayı farkındalığı', 'odaklanma'], 25, 60),

  makeActivity('lang-story-bag', 'Hikâye Torbası', 'Üç nesneden kısa bir hikâye üretin.', 'language', 12, ['Bez torba', '3 güvenli oyuncak'], ['Oyuncakları sırayla torbadan çıkarın.', 'Her oyuncak için bir cümle kurun.', 'Cümleleri birleştirip mini bir hikâye oluşturun.'], 'Çocuğun eklediği ayrıntıları kesmeden hikayeye dahil edin.', ['kelime kullanımı', 'anlatım'], 49, 120),
  makeActivity('lang-sound-walk', 'Sesleri Dinleyelim', 'Ne yapacağız: Evdeki yumuşak sesleri kısa süre dinleyip adlandıracağız.', 'language', 5, ['Ekstra malzeme gerekmiyor'], ['Çocuk ne yapacak: Duyduğu sese bakış veya sesle tepki verecek.', 'Ebeveyn ne yapacak: Kısa bekleme sonrası sesi adlandırıp tekrar edecek.', 'Süre ve malzeme: 5 dakika, sessiz bir köşe.'], 'Güvenlik notu: Ani ve yüksek seslerden kaçının.', ['dinleme', 'ses farkındalığı'], 4, 9, 'quiz', 'sound-object'),
  makeActivity('lang-picture-talk', 'Resimde Ne Görüyoruz?', 'Resimli kart veya kitapla kısa konuşmalar yapın.', 'language', 7, ['Resimli kitap veya büyük görsel kart'], ['Bir görsel seçin ve işaret ederek adını söyleyin.', 'Çocuğun işaretine veya sesine karşılık verin.', 'Aynı görselde bir ayrıntıyı daha birlikte bulun.'], 'Yanıt süresini bekleyin ve her denemeyi olumlu karşılayın.', ['alıcı dil', 'ortak dikkat'], 10, 24),
  makeActivity('lang-rhyme', 'Uyaklı Kelimeler', 'Benzer sesle biten eğlenceli kelimeler üretin.', 'language', 8, ['Malzeme gerekmiyor'], ['Kolay bir kelime söyleyin.', 'Aynı sesle biten başka kelimeler bulun.', 'Kelimelerle kısa ve komik bir cümle kurun.'], 'Gerçek kelime olmasa da ritim ve ses oyununu sürdürün.', ['ses farkındalığı', 'kelime üretimi'], 49, 96),
  makeActivity('lang-daily-reporter', 'Günün Muhabiri', 'Çocuğunuz gününden bir anı sırayla anlatsın.', 'language', 8, ['Oyuncak mikrofon (isteğe bağlı)'], ['Bugünden sevdiği bir anı seçmesini isteyin.', 'Ne oldu, kim vardı, sonra ne oldu sorularıyla destekleyin.', 'Siz de benzer bir kısa anlatım paylaşın.'], 'Soru sayısını sınırlayıp anlatımı bölmemeye çalışın.', ['sıralı anlatım', 'öz ifade'], 61, 120),

  makeActivity('motor-tape-line', 'Çizgide Yürü', 'Yerdeki çizgide farklı biçimlerde ilerleyin.', 'motor', 10, ['Kağıt bant'], ['Yere kısa bir düz çizgi yapın.', 'Çizgi boyunca normal adımlarla yürüyün.', 'Hazır olduğunda parmak ucunda veya geriye doğru deneyin.'], 'Kaymayan ve engellerden arındırılmış bir alan seçin.', ['denge', 'koordinasyon'], 25, 48),
  makeActivity('motor-tongs', 'Mandal Aktarmaca', 'Yumuşak parçaları maşa ile bir kaptan diğerine taşıyın.', 'motor', 12, ['Cocuk maşası', 'Büyük ponpon', 'Iki kap'], ['Parçaları bir kaba koyun.', 'Maşa ile diğer kaba taşımasını isteyin.', 'İsterse renklerine göre ayırın.'], 'Parçaların yutulamayacak kadar büyük olmasına dikkat edin.', ['ince motor', 'el-göz koordinasyonu'], 49, 96),
  makeActivity('motor-animal-moves', 'Hayvan Yürüyüşleri', 'Basit hayvan hareketlerini taklit ederek ilerleyin.', 'motor', 8, ['Hareket alanı'], ['Iki veya üç hayvan seçin.', 'Her hayvanın hareketini kısa turla deneyin.', 'Sırayla lider olup diğerini taklit edin.'], 'Yorulduğunda kısa mola verip oyunu sonlandırın.', ['kaba motor', 'beden farkındalığı'], 19, 48),
  makeActivity('motor-paper-balls', 'Kâğıt Top Basketi', 'Kâğıt topları hedefe farklı mesafelerden atın.', 'motor', 10, ['Atık kağıt', 'Sepet'], ['Kâğıtları birlikte buruşturun.', 'Yakın mesafeden hedefe atın.', 'Başardıkça bir adım uzaklaşın.'], 'Puan yerine deneme cesaretini öne çıkarın.', ['hedefleme', 'koordinasyon'], 37, 84),
  makeActivity('motor-thread', 'Büyük Boncuk Dizme', 'Büyük parçaları ipe sırayla dizin.', 'motor', 12, ['Kalın ip', 'Büyük delikli boncuklar'], ['İpin ucunu düğümleyin.', 'Parçaları tek tek ipten geçirin.', 'Renk veya boyuta göre sıra oluşturun.'], 'Küçük parça kullanmayın ve etkinlik boyunca yanında kalın.', ['ince motor', 'iki el kullanımı'], 37, 72),

  makeActivity('social-feeling-faces', 'Yüz ve Ses Takibi', 'Bebeğinizle yüz ifadesi ve ses takibi oyunu oynayın.', 'social', 4, ['Malzeme gerekmiyor'], ['Bebeğinizin yüzüne yakın, sakin bir mesafede konuşun.', 'Farklı yumuşak mimikler yapın ve kısa sesler çıkarın.', 'Bebeğin bakışını yakaladığınızda gülümseyerek karşılık verin.'], 'Kısa ve sakin etkileşimler bebek için daha uygundur.', ['sosyal etkileşim', 'ortak dikkat'], 0, 6),
  makeActivity('social-helping-hands', 'Yardımcı Eller', 'Evde küçük bir görevi birlikte tamamlayın.', 'social', 10, ['Günlük ev eşyaları'], ['Basit bir görev seçin (oyuncak toplama gibi).', 'Görevi adım adım birlikte yapın.', 'Katkısının işe nasıl yardımcı olduğunu söyleyin.'], 'Mükemmellik yerine birlikte yapma deneyimini öne çıkarın.', ['sorumluluk', 'iş birliği'], 25, 72),
  makeActivity('social-turn-taking', 'Sıra Bende, Sıra Sende', 'Basit bir top oyununda sırayla hareket edin.', 'social', 8, ['Yumuşak top'], ['Karşılıklı oturun ve topu yavaşça yuvarlayın.', 'Her turda sırayı sözle belirtin.', 'Kısa turlarla oyunu tamamlayın.'], 'Bekleme süresi uzarsa turu kısaltın.', ['sıra bekleme', 'öz düzenleme'], 13, 30),
  makeActivity('social-kind-notes', 'İyilik Notu', 'Sevdiğiniz biri için küçük bir not veya resim hazırlayın.', 'social', 15, ['Kağıt', 'Boya kalemleri'], ['Bir kişi seçin.', 'O kişiyle ilgili sevdiğiniz bir şeyi konuşun.', 'Kısa notu veya resmi birlikte verin.'], 'Çocuğun ifadesini olduğu gibi kabul edin.', ['şefkat', 'duygu paylaşımı'], 49, 120),
  makeActivity('social-puppet-solve', 'Kuklalar Çözüm Arıyor', 'Kuklaların küçük anlaşmazlığına çözüm önerin.', 'social', 12, ['Iki oyuncak veya kukla'], ['Oyuncaklarla kısa bir sorun canlandırın.', 'Olası çözümleri çocuğun önermesini isteyin.', 'Seçtiğiniz çözümü kısa oyunla deneyin.'], 'Tek doğru cevap aramak yerine seçenek üretimini destekleyin.', ['problem çözme', 'bakış açısı'], 61, 120),

  makeActivity('creative-nature-collage', 'Doğa Kolajı', 'Güvenli doğa parçalarıyla kolaj oluşturun.', 'creativity', 18, ['Yapraklar', 'Kağıt', 'Çocuk yapıştırıcısı'], ['Birkaç güvenli parça toplayın.', 'Parçaları kağıt üzerinde farklı şekillerde dizin.', 'Beğendiğiniz düzeni yapıştırın.'], 'Parçaların temiz ve keskin kenarsız olmasına dikkat edin.', ['yaratıcılık', 'duyusal keşif'], 25, 72),
  makeActivity('creative-music-painter', 'Müziği Çiz', 'Müziğin ritmine göre serbest çizimler yapın.', 'creativity', 12, ['Kağıt', 'Boya kalemleri', 'Müzik'], ['Kısa bir müzik açın.', 'Ritme göre serbest çizgiler çizin.', 'Çiziminizi birbirinize anlatın.'], 'Resmi bir nesneye benzetme baskısı kurmayın.', ['öz ifade', 'ritim'], 37, 72),
  makeActivity('creative-box-world', 'Kutudan Bir Dünya', 'Bir kutuyu hayali bir mekana dönüştürün.', 'creativity', 25, ['Karton kutu', 'Kağıt', 'Kalem'], ['Kutunun neye dönüşeceğine karar verin.', 'Pencere, kapı veya yol gibi detaylar ekleyin.', 'İçinde kısa bir oyun canlandırın.'], 'Tasarım kararlarını mümkün olduğunca çocuğa bırakın.', ['hayal gücü', 'planlama'], 49, 120),
  makeActivity('creative-shadow-story', 'Gölge Hikâyesi', 'El ve oyuncak gölgeleriyle mini hikâye oluşturun.', 'creativity', 15, ['El feneri', 'Oyuncaklar', 'Boş duvar'], ['Odayı hafifçe karartın.', 'Duvara gölgeler oluşturun.', 'Gölgelerle kısa bir hikâye anlatın.'], 'Fener ışığını doğrudan göze tutmayın.', ['hikaye kurma', 'neden-sonuç'], 49, 120),
  makeActivity('creative-kitchen-band', 'Mutfak Orkestrası', 'Güvenli kaplarla ritim sesleri keşfedin.', 'creativity', 6, ['Tahta kaşık', 'Plastik kaplar'], ['Iki farklı kap seçin.', 'Yavaş ritimlerle sesleri sırayla çıkarın.', 'Çocuğun çıkardığı ritmi tekrar edin.'], 'Ses düzeyini rahat seviyede tutun ve kısa oynayın.', ['ritim', 'işitsel dikkat'], 10, 24),
]

export const categoryMeta: Record<ActivityCategory, { label: string; icon: string; color: string }> = {
  cognitive: { label: 'Bilişsel', icon: '🧠', color: 'sun' },
  language: { label: 'Dil', icon: '🗣️', color: 'sky' },
  motor: { label: 'Motor', icon: '🤲', color: 'mint' },
  social: { label: 'Sosyal-Duygusal', icon: '❤️', color: 'coral' },
  creativity: { label: 'Yaratıcılık', icon: '🎨', color: 'lilac' },
}
