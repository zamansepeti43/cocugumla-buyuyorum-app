import type { Activity, ActivityCategory } from '../types/models'

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
): Activity => ({
  id, title, description, category, duration, materials, instructions, parentTip,
  benefits, ageMin, ageMax, difficulty: 'easy', completed: false, isPremium: false,
})

export const activities: Activity[] = [
  makeActivity('cog-color-hunt', 'Renk Avı', 'Evde seçtiğiniz renkte nesneleri birlikte bulun.', 'cognitive', 10, ['Renkli ev eşyaları'], ['Bir renk seçin.', 'O renkte üç nesne bulun.', 'Nesneleri yan yana koyup karşılaştırın.'], 'Çocuğunuzun hızından çok keşif sürecine odaklanın.', ['dikkat', 'sınıflandırma']),
  makeActivity('cog-memory-tray', 'Neyi Sakladım?', 'Tepsideki nesnelerden hangisinin kaybolduğunu bulun.', 'cognitive', 8, ['Tepsi', '3-5 küçük nesne', 'Örtü'], ['Nesneleri birlikte inceleyin.', 'Üstlerini örtüp birini alın.', 'Eksik nesneyi tahmin edin.'], 'Başlangıçta yalnızca üç nesne kullanın.', ['hafıza', 'dikkat']),
  makeActivity('cog-shape-sort', 'Şekil Dedektifi', 'Benzer şekilleri küçük gruplara ayırın.', 'cognitive', 12, ['Kapaklar', 'Bloklar', 'Küçük kutular'], ['Nesneleri ortaya koyun.', 'Yuvarlak ve köşeli olanları ayırın.', 'Her grubu birlikte sayın.'], 'Farklı cevaplarda çocuğun nasıl düşündüğünü sorun.', ['problem çözme', 'sınıflandırma']),
  makeActivity('cog-pattern', 'Sırayı Devam Ettir', 'Basit renk veya nesne örüntüsünü tamamlayın.', 'cognitive', 10, ['İki renk blok veya mandal'], ['Kırmızı-mavi sırası kurun.', 'Sıradaki parçayı sorun.', 'Çocuğun kendi sırasını kurmasını isteyin.'], 'İki parçalı örüntüyle başlayın.', ['örüntü kurma', 'mantık']),
  makeActivity('cog-count-steps', 'Adımlarımızı Sayalım', 'Bir odadan diğerine giderken adımları sayın.', 'cognitive', 5, ['Malzeme gerekmiyor'], ['Bir hedef seçin.', 'Her adımda birlikte sayı söyleyin.', 'Başka bir rotayla tekrar deneyin.'], 'Sayı atlanırsa düzeltmek yerine birlikte devam edin.', ['sayı farkındalığı', 'odaklanma']),

  makeActivity('lang-story-bag', 'Hikâye Torbası', 'Üç nesneden kısa bir hikâye oluşturun.', 'language', 12, ['Bez torba', '3 küçük oyuncak'], ['Oyuncakları sırayla çıkarın.', 'Her biri hakkında bir cümle kurun.', 'Hepsini aynı hikâyede buluşturun.'], 'Çocuğun eklediği her fikri hikâyeye dahil edin.', ['kelime kullanımı', 'anlatım']),
  makeActivity('lang-sound-walk', 'Ses Yürüyüşü', 'Evde ve dışarıda duyduğunuz sesleri adlandırın.', 'language', 10, ['Malzeme gerekmiyor'], ['Bir dakika sessizce dinleyin.', 'Duyduğunuz sesleri söyleyin.', 'Sesleri taklit etmeyi deneyin.'], 'Tek kelimelik cevapları açık uçlu soruyla genişletin.', ['dinleme', 'ses farkındalığı']),
  makeActivity('lang-picture-talk', 'Resimde Ne Oluyor?', 'Bir resimde gördüklerinizi birlikte anlatın.', 'language', 10, ['Resimli kitap veya fotoğraf'], ['Bir resim seçin.', 'Kim, nerede ve ne yapıyor sorularını sorun.', 'Resmin devamını hayal edin.'], 'Cevap için birkaç saniye bekleme payı bırakın.', ['ifade becerisi', 'hayal gücü']),
  makeActivity('lang-rhyme', 'Uyaklı Kelimeler', 'Benzer sesle biten eğlenceli kelimeler bulun.', 'language', 8, ['Malzeme gerekmiyor'], ['Kolay bir kelime söyleyin.', 'Benzer biten kelimeler deneyin.', 'Kelimelerle komik bir cümle kurun.'], 'Uydurma kelimeler de bu oyunda serbest.', ['ses farkındalığı', 'kelime üretimi'], 36),
  makeActivity('lang-daily-reporter', 'Günün Muhabiri', 'Çocuğunuz gününden sevdiği bir anı anlatsın.', 'language', 7, ['Oyuncak mikrofon (isteğe bağlı)'], ['Bugünün en güzel anını sorun.', 'Bir ayrıntı daha anlatmasını isteyin.', 'Siz de kendi cevabınızı paylaşın.'], 'Soru yağmuruna tutmadan dikkatle dinleyin.', ['sıralı anlatım', 'öz ifade']),

  makeActivity('motor-tape-line', 'Çizgide Yürü', 'Yere yapılan çizgide farklı biçimlerde ilerleyin.', 'motor', 10, ['Kâğıt bant'], ['Yere düz ve kıvrımlı çizgiler yapın.', 'Çizgide kollar açık yürüyün.', 'Geriye veya parmak ucunda deneyin.'], 'Kaymayan ve güvenli bir zemin seçin.', ['denge', 'koordinasyon']),
  makeActivity('motor-tongs', 'Mandal Aktarmaca', 'Yumuşak parçaları maşayla bir kaptan diğerine taşıyın.', 'motor', 12, ['Çocuk maşası', 'Ponpon', 'İki kap'], ['Parçaları bir kaba koyun.', 'Maşayla diğer kaba aktarın.', 'Renklerine göre ayırmayı deneyin.'], 'Küçük parçalarla çalışırken yanında kalın.', ['ince motor', 'el-göz koordinasyonu'], 36),
  makeActivity('motor-animal-moves', 'Hayvan Yürüyüşleri', 'Seçtiğiniz hayvanlar gibi hareket edin.', 'motor', 10, ['Hareket alanı'], ['Üç hayvan seçin.', 'Her hayvanın yürüyüşünü taklit edin.', 'Sırayla lider olun.'], 'Alanı hareket öncesi güvenli hale getirin.', ['kaba motor', 'beden farkındalığı']),
  makeActivity('motor-paper-balls', 'Kâğıt Top Basketi', 'Kâğıt topları farklı mesafelerden sepete atın.', 'motor', 10, ['Atık kâğıt', 'Sepet'], ['Kâğıtları buruşturun.', 'Yakından sepete atın.', 'Başardıkça bir adım uzaklaşın.'], 'Puan yerine farklı atış biçimlerini kutlayın.', ['hedefleme', 'koordinasyon']),
  makeActivity('motor-thread', 'Büyük Boncuk Dizme', 'Büyük parçaları ipe sırayla dizin.', 'motor', 15, ['Kalın ip', 'Büyük delikli boncuk veya makarna'], ['İpin ucunu sabitleyin.', 'Parçaları tek tek dizin.', 'Renk sırası oluşturun.'], 'Yaşa uygun büyük parçalar kullanın ve yanında kalın.', ['ince motor', 'iki el kullanımı'], 36),

  makeActivity('social-feeling-faces', 'Duygu Yüzleri', 'Farklı duyguları yüz ifadeleriyle canlandırın.', 'social', 10, ['Ayna'], ['Mutlu, şaşkın ve üzgün yüzler yapın.', 'Aynada ifadeleri inceleyin.', 'Bu duyguları ne zaman hissettiğinizi konuşun.'], 'Her duygunun kabul edilebilir olduğunu vurgulayın.', ['duygu tanıma', 'empati']),
  makeActivity('social-helping-hands', 'Yardımcı Eller', 'Evde birlikte küçük bir sorumluluk tamamlayın.', 'social', 10, ['Günlük ev eşyaları'], ['Yaşa uygun bir görev seçin.', 'Görevi birlikte tamamlayın.', 'Katkısının neyi kolaylaştırdığını anlatın.'], 'Sonuçtan çok katkısını fark edin.', ['sorumluluk', 'iş birliği']),
  makeActivity('social-turn-taking', 'Sıra Bende, Sıra Sende', 'Basit bir oyunda sırayla hareket edin.', 'social', 12, ['Top veya blok'], ['Sıra belirleyin.', 'Her turda sıra sahibini söyleyin.', 'Oyunu birlikte bitirin.'], 'Bekleme süresini başlangıçta kısa tutun.', ['sıra bekleme', 'öz düzenleme']),
  makeActivity('social-kind-notes', 'İyilik Notu', 'Sevdiğiniz biri için küçük bir resim veya not hazırlayın.', 'social', 15, ['Kâğıt', 'Boya kalemleri'], ['Bir kişi seçin.', 'Onun sevdiğiniz yönünü konuşun.', 'Resmi veya notu birlikte verin.'], 'Çocuğun kendi ifadesini değiştirmeden yazıya aktarın.', ['şefkat', 'duygu paylaşımı']),
  makeActivity('social-puppet-solve', 'Kuklalar Çözüm Arıyor', 'Kuklaların küçük anlaşmazlığına çözüm bulun.', 'social', 12, ['İki oyuncak'], ['Oyuncaklarla basit bir sorun canlandırın.', 'Olası çözümleri sorun.', 'Seçilen çözümü oynayın.'], 'Tek bir doğru çözüm aramak yerine seçenek üretin.', ['problem çözme', 'bakış açısı']),

  makeActivity('creative-nature-collage', 'Doğa Kolajı', 'Topladığınız doğa parçalarıyla bir kompozisyon yapın.', 'creativity', 20, ['Yapraklar', 'Kâğıt', 'Çocuk yapıştırıcısı'], ['Güvenli parçalar toplayın.', 'Kâğıtta farklı dizilimler deneyin.', 'Beğendiğiniz düzeni yapıştırın.'], 'Ortaya çıkan şekle çocuğun isim vermesini isteyin.', ['yaratıcılık', 'duyusal keşif']),
  makeActivity('creative-music-painter', 'Müziği Çiz', 'Müziğin hissettirdiklerini çizgilere dönüştürün.', 'creativity', 15, ['Kâğıt', 'Boya kalemleri', 'Müzik'], ['Bir müzik açın.', 'Ritme göre serbest çizgiler çizin.', 'Resminizi birbirinize anlatın.'], 'Resmi bir şeye benzetme zorunluluğu koymayın.', ['öz ifade', 'ritim']),
  makeActivity('creative-box-world', 'Kutudan Bir Dünya', 'Boş bir kutuyu hayali bir mekâna dönüştürün.', 'creativity', 25, ['Karton kutu', 'Kâğıt', 'Kalem'], ['Kutunun ne olacağına karar verin.', 'Pencere ve detaylar ekleyin.', 'İçinde kısa bir oyun kurun.'], 'Tasarım kararlarını mümkün olduğunca çocuğunuza bırakın.', ['hayal gücü', 'planlama']),
  makeActivity('creative-shadow-story', 'Gölge Hikâyesi', 'El veya oyuncak gölgeleriyle hikâye anlatın.', 'creativity', 15, ['El feneri', 'Oyuncaklar', 'Boş duvar'], ['Odayı hafifçe karartın.', 'Duvara gölgeler oluşturun.', 'Gölgelerle bir hikâye anlatın.'], 'Feneri göze tutmamaya dikkat edin.', ['hikâye kurma', 'neden-sonuç']),
  makeActivity('creative-kitchen-band', 'Mutfak Orkestrası', 'Güvenli mutfak eşyalarıyla ritim oluşturun.', 'creativity', 12, ['Tahta kaşık', 'Plastik kaplar'], ['Farklı kapların sesini dinleyin.', 'Kısa bir ritim çalın.', 'Çocuğun ritmini tekrar edin.'], 'Sesi rahat bir düzeyde tutun.', ['ritim', 'yaratıcı ifade']),
]

export const categoryMeta: Record<ActivityCategory, { label: string; icon: string; color: string }> = {
  cognitive: { label: 'Bilişsel', icon: '🧠', color: 'sun' },
  language: { label: 'Dil', icon: '🗣️', color: 'sky' },
  motor: { label: 'Motor', icon: '🤲', color: 'mint' },
  social: { label: 'Sosyal-Duygusal', icon: '❤️', color: 'coral' },
  creativity: { label: 'Yaratıcılık', icon: '🎨', color: 'lilac' },
}
