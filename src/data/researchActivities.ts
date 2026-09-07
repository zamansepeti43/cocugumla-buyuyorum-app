import type { Activity, ActivityCategory, ActivityInteractionId, WorldId } from '../types/models'

type Row = readonly [string, number, number, number, string, string, number, number, ActivityInteractionId]

type AgeGroup = {
  label: string
  min: number
  max: number
}

const ageGroups: AgeGroup[] = [
  { label: '0-3 ay', min: 0, max: 3 },
  { label: '4-6 ay', min: 4, max: 6 },
  { label: '7-9 ay', min: 7, max: 9 },
  { label: '10-12 ay', min: 10, max: 12 },
  { label: '13-18 ay', min: 13, max: 18 },
  { label: '19-24 ay', min: 19, max: 24 },
  { label: '2-3 yaş', min: 24, max: 36 },
  { label: '3-4 yaş', min: 36, max: 48 },
  { label: '4-5 yaş', min: 48, max: 60 },
  { label: '5-6 yaş', min: 60, max: 72 },
  { label: '6-8 yaş', min: 72, max: 96 },
  { label: '8-10 yaş', min: 96, max: 120 },
]

const categoryOrder: ActivityCategory[] = ['cognitive', 'language', 'motor', 'social', 'creativity']
const worldByCategory: Record<ActivityCategory, WorldId> = {
  cognitive: 'games',
  language: 'speech',
  motor: 'forest',
  social: 'stories',
  creativity: 'fairy-tales',
}
const sectionByCategory: Record<ActivityCategory, string> = {
  cognitive: 'games-memory',
  language: 'speech-first-words',
  motor: 'forest-animals-intro',
  social: 'stories-adventure',
  creativity: 'fairy-tales-bedtime',
}
const worlds: WorldId[] = ['forest', 'space', 'english', 'math', 'speech', 'games', 'stories', 'fairy-tales']
const sections = ['games-quick', 'speech-sound-track', 'forest-animals-intro', 'forest-animal-sounds', 'stories-friendship', 'games-memory', 'speech-first-words', 'math-shapes', 'math-numbers-10', 'games-logic', 'stories-adventure', 'english-animals', 'english-colors', 'space-planets', 'math-begin-add', 'english-family', 'fairy-tales-bedtime', 'space-rockets', 'speech-practice']
const interactionIds: ActivityInteractionId[] = ['motion-track', 'sound-cue', 'touch-and-see', 'sorting-game', 'color-match-mini', 'missing-shape', 'animal-finder', 'size-picker', 'twin-match', 'sound-object', 'moving-shape', 'pattern-complete', 'memory-grid', 'shape-puzzle', 'word-pick', 'logic-grid', 'attention-spot', 'sequence-memory', 'box-opening', 'drag-sort', 'picture-match', 'reaction-target', 'strategy-plan', 'strategy-maze', 'complex-puzzle', 'advanced-memory', 'balloon-track', 'contrast-track', 'mini-tetris', 'candy-match']
const duration = (a: number) => (a < 12 ? 3 : a < 36 ? 4 : a < 48 ? 5 : a < 60 ? 6 : 7)

const categoryMeta: Record<ActivityCategory, { focus: string; taskPool: string[]; materialPool: string[]; activityType: Activity['activityType'] }> = {
  cognitive: {
    focus: 'görsel dikkat ve odaklanma',
    taskPool: ['nesne eşleme', 'şekil sıralama', 'renk farkı bulma', 'örüntü tamamlama', 'görsel ipucu takip etme', 'kart seçimi', 'görsel eşleme', 'sıra tamamlama', 'mekâna göre bulma', 'küçük bulmaca çözme'],
    materialPool: ['görsel kartlar', 'sıralama blokları', 'kısa dikkat kartları', 'örnek nesneler', 'eşleme parçaları'],
    activityType: 'matching',
  },
  language: {
    focus: 'kelime, ses ve ifade',
    taskPool: ['hece tekrar etme', 'görsel kelime eşleme', 'sesli kart çağırma', 'kısa cümle kurulumu', 'kelime seçimi', 'ses farkı ayırt etme', 'ürün adını söyleme', 'hızlı soru cevaplama', 'resim adlandırma', 'ses ritmi takip etme'],
    materialPool: ['kelime kartları', 'resim figürleri', 'ses örnekleri', 'kısa cümle kartları', 'görsel işaretler'],
    activityType: 'guided',
  },
  motor: {
    focus: 'denge ve koordinasyon',
    taskPool: ['top yuvarlama', 'hedef vuruşu', 'çizgi takip', 'denge adımı', 'nesne taşıma', 'zıplama hedefi', 'hareket rotası', 'koordinasyon sıralaması', 'yaklaşma hedefi', 'yön kontrolü'],
    materialPool: ['yumuşak top', 'hedef kartları', 'denge minderi', 'temiz oyun alanı', 'kolay hareket seti'],
    activityType: 'game',
  },
  social: {
    focus: 'duygu, paylaşım ve iletişim',
    taskPool: ['duyguyu tanıma', 'rol paylaşımı', 'gülümseme takibi', 'yardım isteği', 'yaşanan olayı anlatma', 'başkasının hissini anlama', 'sıra alma', 'soruyu yanıtlayıp paylaşma', 'grup teması kurma', 'iş birliği öyküsü'],
    materialPool: ['rol kartları', 'duygu yüzleri', 'görsel hikâye figürleri', 'sakin konuşma alanı', 'paylaşım nesneleri'],
    activityType: 'guided',
  },
  creativity: {
    focus: 'öz ifade ve hayal gücü',
    taskPool: ['renk karışımı', 'şekil hikâyesi', 'üç boyutlu hayal kurma', 'desen yaratma', 'öykü taşıma', 'masal müdahalesi', 'kendi renk düzeni', 'müzikal ritim tasarımı', 'şekil anlatımı', 'sesli ifade kurma'],
    materialPool: ['boya seti', 'kâğıt', 'renkli kalemler', 'şekil blokları', 'yaratıcı araçlar'],
    activityType: 'creative',
  },
}

const titleParts = {
  cognitive: ['Dikkat', 'Göz', 'Harita', 'İz', 'Sıra', 'Eş', 'İpucu', 'Renk', 'Bulmaca', 'Örüntü'],
  language: ['Ses', 'Kelime', 'Hece', 'İfade', 'Cümle', 'Ritim', 'Yorum', 'Etiket', 'Konuşma', 'Tanıma'],
  motor: ['Koordinasyon', 'Denge', 'Atlama', 'Yürüyüş', 'Hız', 'Temas', 'Vuruş', 'Yön', 'İlerleme', 'Adım'],
  social: ['Paylaşım', 'Empati', 'Güven', 'Yardım', 'Gülümseme', 'İşbirliği', 'Duygu', 'Sıra', 'Hikâye', 'Anlatım'],
  creativity: ['Renk', 'Şekil', 'Masal', 'Yaratım', 'Rüya', 'Buluş', 'İfade', 'Tasarım', 'Müzik', 'Çizim'],
}

const nouns = ['Yaprak', 'Top', 'Ayna', 'Kart', 'Kutu', 'Dost', 'Ritim', 'Yol', 'Bulut', 'Resim', 'Köprü', 'Ses', 'Hava', 'Gülüş', 'Şekil', 'Orman', 'Gök', 'Müzik', 'Hayvan', 'Işık', 'Rüzgar', 'Çiçek', 'Duygu', 'Yolculuk', 'Köşe', 'Ada', 'Oyun', 'Merdiven', 'Vakit', 'İpucu', 'Masa']
const adjectives = ['Güneşli', 'Mavi', 'Sevecen', 'Minik', 'Renkli', 'Mutlu', 'Kıvrak', 'Narin', 'Şeker', 'Parlak', 'Sessiz', 'Duyarlı', 'Meraklı', 'Güvenli', 'Sıcak', 'İçten', 'Bilge', 'Zeki', 'Neşeli', 'Yumuşak', 'Uyanık', 'Pratik', 'Yaratıcı', 'Akıllı', 'Canlı', 'Sakin', 'Hızlı', 'Oyunsever', 'Becerikli', 'Esnek']
const seenTitles = new Set<string>()

function buildUniqueTitle(category: ActivityCategory, groupIndex: number, slot: number): string {
  const part = titleParts[category][(groupIndex + slot) % titleParts[category].length]
  const adjective = adjectives[(groupIndex * 5 + slot * 3 + category.length) % adjectives.length]
  const noun = nouns[(groupIndex * 7 + slot * 5 + category.length * 2) % nouns.length]
  const candidate = `${adjective} ${part} ${noun}`
  if (!seenTitles.has(candidate)) {
    seenTitles.add(candidate)
    return candidate
  }

  let attempt = 1
  let retry = `${adjectives[(groupIndex * 5 + slot * 3 + category.length + attempt) % adjectives.length]} ${part} ${nouns[(groupIndex * 7 + slot * 5 + category.length * 2 + attempt) % nouns.length]}`
  while (seenTitles.has(retry) && attempt < 200) {
    attempt += 1
    retry = `${adjectives[(groupIndex * 5 + slot * 3 + category.length + attempt) % adjectives.length]} ${part} ${nouns[(groupIndex * 7 + slot * 5 + category.length * 2 + attempt) % nouns.length]}`
  }
  seenTitles.add(retry)
  return retry
}

function buildActivityRow(groupIndex: number, category: ActivityCategory, slot: number): Row {
  const categoryIndex = categoryOrder.indexOf(category)
  const title = buildUniqueTitle(category, groupIndex, slot)
  const config = categoryMeta[category]
  const task = config.taskPool[(groupIndex + slot + categoryIndex) % config.taskPool.length]
  const purpose = `${title} ile ${task} ve ${config.focus} hedefi`
  const worldIndex = (groupIndex + categoryIndex + slot) % worlds.length
  const sectionIndex = sections.indexOf(sectionByCategory[category])
  const interactionId = interactionIds[(groupIndex * 3 + categoryIndex + slot) % interactionIds.length]
  const id = `a${String(groupIndex * 25 + categoryIndex * 5 + slot + 1).padStart(3, '0')}`
  return [id, ageGroups[groupIndex].min, ageGroups[groupIndex].max, categoryIndex, title, purpose, worldIndex, sectionIndex, interactionId] as const
}

const rows: Row[] = []
for (let groupIndex = 0; groupIndex < ageGroups.length; groupIndex += 1) {
  for (let categoryIndex = 0; categoryIndex < categoryOrder.length; categoryIndex += 1) {
    const category = categoryOrder[categoryIndex]
    for (let slot = 0; slot < 4; slot += 1) {
      rows.push(buildActivityRow(groupIndex, category, slot))
    }
  }
}

export type PlacedActivity = Activity & { worldId: WorldId; sectionId: string }

export const researchActivities: PlacedActivity[] = rows.map((row) => {
  const [id, ageMin, ageMax, categoryIndex, title, purpose, , , interactionId] = row
  const category = categoryOrder[categoryIndex] ?? 'cognitive'
  const config = categoryMeta[category]
  const task = config.taskPool[(ageMin + categoryIndex + title.length) % config.taskPool.length]
  const seed = (title.length * 7 + ageMin * 11 + categoryIndex * 13 + id.length * 5) % 100

  const materialSet = Array.from(new Set([
    ...config.materialPool,
    ageMin < 24 ? 'güvenli temas malzemesi' : ageMin < 60 ? 'görsel yardımcı kart' : 'rehber kartlar',
    `${title.split(' ')[0]} temalı küçük nesne`,
    `${task} için uygun ev malzemesi`,
    category === 'motor' ? 'yumuşak zemin ve güvenli oyun alanı' : category === 'language' ? 'sesli örnek kartı' : category === 'creativity' ? 'renkli çalışma yüzeyi' : 'görsel hedef kartı',
    ageMin < 36 ? 'hafif ve büyük boy nesne' : 'yakın gözlem için uygun küçük nesne',
    `${category === 'cognitive' ? 'görsel ayrım kartı' : category === 'language' ? 'hece ve kelime kartı' : category === 'motor' ? 'hareket hedefi' : category === 'social' ? 'duygu veya rol kartı' : 'renk ve şekil kartı'}`,
    `${ageMin < 48 ? 'sakin oyun köşesi' : 'çalışma masası'}`,
  ]))

  const titleWords = title.split(' ').filter(Boolean)
  const anchor = titleWords[(seed + categoryIndex) % titleWords.length] ?? title
  const anchorLow = anchor.toLowerCase()

  const scenePool = {
    cognitive: ['görsel kart masasında', 'örüntü bloklarıyla', 'resimli eşleme köşesinde', 'sıralama masasında', 'bulmaca köşesinde', 'gizli ipucu kutusunda'],
    language: ['hece kutusunda', 'kelime yolu üzerinde', 'ses kartı masasında', 'görsel çağrı köşesinde', 'resimli konuşma alanında', 'sesli oyun tezgâhında'],
    motor: ['denge hattında', 'hareket parkurunda', 'hedef alanında', 'top yuvarlama köşesinde', 'atlama bandında', 'taşıma yolu üzerinde'],
    social: ['paylaşım köşesinde', 'duygu kartlarıyla', 'rol oynama masasında', 'hikâye köşesinde', 'sıra oyununda', 'yardım etme alanında'],
    creativity: ['renk masasında', 'şekil atölyesinde', 'masal tezgâhında', 'şarkı köşesinde', 'yaratıcı çalışma yüzeyinde', 'resim düzeninde'],
  } as const

  const actionVerbPool = {
    cognitive: ['eşleştirir', 'sıralar', 'bulur', 'yerleştirir', 'karşılaştırır', 'tanımlar'],
    language: ['adlandırır', 'tekrar eder', 'seslendirir', 'bağlar', 'anlatır', 'seçer'],
    motor: ['hedefler', 'taşıtır', 'yönlendirir', 'denge kurar', 'hareketlendirir', 'koordine eder'],
    social: ['paylaşır', 'destekler', 'yanıtlar', 'anlar', 'yardım eder', 'gülümser'],
    creativity: ['yaratır', 'düzenler', 'boyar', 'kurgular', 'dönüştürür', 'tasarlar'],
  } as const

  const focusPhrasePool = {
    cognitive: ['görsel ayrım', 'şekil görsel hafızası', 'örnek okuma', 'sıra anlayışı', 'bulmaca mantığı', 'ipucu takip etme'],
    language: ['kelime farkı', 'ses ve ritim', 'hece üretimi', 'anlam kurma', 'resim adlandırma', 'soru yanıtı'],
    motor: ['hareket kontrolü', 'denge ve yön', 'koordinasyon', 'temas farkındalığı', 'hedef tutumu', 'vücut koordinasyonu'],
    social: ['paylaşım ve iletişim', 'duygu okuma', 'iş birliği', 'sıra alma', 'yardım ve destek', 'rol anlama'],
    creativity: ['öz ifade', 'renk ve biçim', 'hayal gücü', 'masal üretimi', 'sesli anlatım', 'yaratıcı tasarım'],
  } as const

  const sceneNarratives = [
    'sabahın sakin ışığında', 'gün içinde kısa bir oyun arasıyla', 'evin rahat bir köşesinde', 'çok kısa bir mola sırasında', 'öğrenme ritminin içinde', 'gülümseyen bir başlangıçla', 'eşlik eden bir sesle', 'net ve güvenli bir tempo ile'
  ]

  const ageAdjustments = ageMin < 12
    ? 'çok küçük adımlarla'
    : ageMin < 24
      ? 'kısa ve net yönlendirmeyle'
      : ageMin < 36
        ? 'sakin tekrarlarla'
        : ageMin < 60
          ? 'güvenli deneme ile'
          : ageMin < 96
            ? 'düzenli hedeflerle'
            : 'yapılandırılmış bir tempo ile'

  const uniqueInstruction = `${title} için ${task}ı ${scenePool[category][(seed + 1) % scenePool[category].length]} ${sceneNarratives[(seed + 2) % sceneNarratives.length]} başlatır; çocuk ${anchorLow} gibi bir yön göstergeyi izledikten sonra ${ageAdjustments} ${actionVerbPool[category][(seed + 3) % actionVerbPool[category].length]} ve aynı görevi ${ageMin < 24 ? '2-3 kez' : ageMin < 48 ? '3-4 kez' : '4-5 kez'} tekrarlar.`
  const uniquePrompt = `Gerekirse ${anchorLow} için tek bir net ipucu verin; ardından çocuğun kendi çözümünü bulmasına izin verin.`
  const uniquePraise = `Etkinlik sonunda ${title} için kısa bir övgü cümlesi kurup bir sonraki küçük hedefi birlikte söyleyin.`
  const instructions = [uniqueInstruction, uniquePrompt, uniquePraise]

  const parentTip = `${title} için ${task}ı ${scenePool[category][(seed + 4) % scenePool[category].length]} içinde çalıştırın. ${ageMin < 36 ? 'Yumuşak bir açıklama yapıp sonra sessizce izleyin.' : ageMin < 60 ? 'Bir cümleyle yön verin, ardından çocuğun kendi denemesini izleyin.' : 'Hedefi net söyleyin, ama bağımsız deneme fırsatını saklayın.'} ${anchor} isimli odak noktasını takip ederken çocuğun ilgisi azaldığında aynı kazanımı başka bir materyalle hızlı bir tekrar olarak destekleyin.`

  const benefitFrames = [
    `${title} sırasında ${task} davranışı ${category === 'cognitive' ? 'görsel dikkat ve hafızayı' : category === 'language' ? 'sözlü ifade ve dinlemeyi' : category === 'motor' ? 'koordinasyon ve dengeyi' : category === 'social' ? 'iletişim ve paylaşımı' : 'öz ifade ve hayal gücünü'} güçlendirir.`,
    `${config.focus} alanı için ${focusPhrasePool[category][(seed + 2) % focusPhrasePool[category].length]} becerisi bu çalışmada belirgin şekilde gelişir.`,
    `Aynı hedefi tekrar eden ${task} uygulaması, güven ve katılım hissini artırır.`,
    `${title} ile oluşan düzenli başarılar, günlük rutinde ${category === 'cognitive' ? 'karar verme ve çözümleme' : category === 'language' ? 'sözlü anlatım ve kelime seçimi' : category === 'motor' ? 'hareket kontrolü' : category === 'social' ? 'empati ve paylaşım' : 'yaratıcı üretim'} için sağlam bir temel oluşturur.`
  ]
  const benefits = Array.from(new Set(benefitFrames))

  const safetyText = [
    `${title} için geniş ve güvenli bir alan seçin.`,
    `${ageMin < 24 ? 'Küçük nesneleri kaldırın ve yakın gözetim sağlayın.' : 'Kullanılan küçük parçaları kontrol altında tutun ve erişimini sınırlayın.'}`,
    `${category === 'motor' ? 'Yürüyüş, atlama ya da yön değiştirme sırasında zemini boşaltın ve güvenli bir ya da geniş hareket alanı oluşturun.' : category === 'language' ? 'Ses seviyesi kontrollü kalsın; çocuğun nefes düzenini koruyun.' : category === 'creativity' ? 'Boyama ve kesme araçlarını yaşa uygun ve güvenli şekilde sunun.' : 'İletişim sırasında çocuğun alanını koruyun ve eşya düzenini temiz tutun.'}`,
    `Her turdan sonra materyalleri toplayıp güvenli şekilde yerleştirin.`
  ]
  const safetyNotes = Array.from(new Set(safetyText))

  const variationTexts = [
    `${title} için daha basit bir başlangıç yapıp ipuçlarını azaltın; sonra aynı hedefi biraz daha zorlayarak tekrar deneyin.`,
    `Aynı kazanımı ${scenePool[category][(seed + 5) % scenePool[category].length]} dışında başka bir ortamda, farklı bir materyalle yaşatın.`,
    `Bir sonraki günde ${task}ı farklı bir zaman diliminde ve daha kısa bir turla tekrar ederken aynı hedefe odaklanın.`,
    `${anchor} temasını ${task} için farklı bir hikâye veya ritimle birleştirip çocuğun dikkatini aynı anda hem hareket hem anlam üzerine yönlendirin.`
  ]
  const variations = Array.from(new Set(variationTexts))

  const descriptionTemplates = [
    `${title} etkinliği, ${ageGroups.find((group) => group.min === ageMin && group.max === ageMax)?.label ?? `${ageMin}-${ageMax} ay`} için ${task} odaklı ve ${config.focus} alanına yerleştirilmiş kısa bir öğrenme deneyimidir. Çocuk, ${scenePool[category][(seed + 2) % scenePool[category].length]} içinde ${anchorLow} temasını görür, kendi denemelerini başlatır ve güvenli bir destekle becerisini pekiştirir.`,
    `${title} çalışması ${task} hedefini merkez alır. Çocuk ${scenePool[category][(seed + 3) % scenePool[category].length]} ile birlikte ${category === 'cognitive' ? 'görsel ayrımı' : category === 'language' ? 'kelime ve ses farkını' : category === 'motor' ? 'hareket kontrolünü' : category === 'social' ? 'paylaşım ve iletişimi' : 'yaratıcılığı'} deneyimleme fırsatı bulur.`,
    `${title} ile çocuk ${task} için ${ageAdjustments} çalışma ritmi kurar. Etkinlik ${scenePool[category][(seed + 6) % scenePool[category].length]} biçiminde tasarlanmıştır ve kısa tekrarlarla öğrenme daha net hale gelir.`,
    `${title} hem eğlenceli hem de açıklayıcı bir etkinliktir: çocuk ${task} sırasında ${actionVerbPool[category][(seed + 5) % actionVerbPool[category].length]} ve ${anchorLow} temasını günlük şekilde yeniden kullanır.`,
    `${title} sırasında ${task} hedefi, ${scenePool[category][(seed + 1) % scenePool[category].length]} ortamında güvenli ve akıcı bir şekilde ilerler. Çocuk, kısa deneme ve destekli tekrarla ${anchorLow} fikrini daha rahat özümsüyor.`
  ]
  const description = descriptionTemplates[(seed + categoryIndex + ageMin) % descriptionTemplates.length]

  return {
    id,
    title,
    description,
    purpose,
    ageMin,
    ageMax,
    category,
    skill: purpose,
    duration: duration(ageMin),
    materials: materialSet,
    instructions,
    parentTip,
    benefits,
    difficulty: ageMin >= 48 ? 'medium' : 'easy',
    safetyNotes,
    variations,
    repeatCooldownDays: 2,
    activityType: config.activityType,
    interactionId,
    completed: false,
    isPremium: false,
    worldId: worldByCategory[category] ?? 'forest',
    sectionId: sectionByCategory[category] ?? 'games-memory',
  }
})
