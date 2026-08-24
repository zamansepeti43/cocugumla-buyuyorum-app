import type { Activity, ActivityCategory } from '../types/models'

export type SceneId =
  | 'lid' | 'animal' | 'ball' | 'colors' | 'shapes' | 'paper'
  | 'music' | 'book' | 'face' | 'walk' | 'beads' | 'sort'
  | 'count' | 'memory' | 'match' | 'sensory' | 'water' | 'nature'
  | 'shadow' | 'puppet' | 'help' | 'craft' | 'blocks' | 'puzzle'
  | 'contrast' | 'talk' | 'track' | 'carry' | 'throw' | 'mirror'
  | 'turn' | 'peek'

const SCENE_META: Record<SceneId, { label: string }> = {
  lid: { label: 'Kapağı Açma' },
  animal: { label: 'Hayvanlar' },
  ball: { label: 'Top Oyunu' },
  colors: { label: 'Renkler' },
  shapes: { label: 'Şekiller' },
  paper: { label: 'Kâğıt İşleri' },
  music: { label: 'Müzik' },
  book: { label: 'Kitap' },
  face: { label: 'Yüz İfadeleri' },
  walk: { label: 'Hareket' },
  beads: { label: 'Dizme' },
  sort: { label: 'Sıralama' },
  count: { label: 'Sayma' },
  memory: { label: 'Hafıza' },
  match: { label: 'Eşleştirme' },
  sensory: { label: 'Dokunma' },
  water: { label: 'Su Oyunu' },
  nature: { label: 'Doğa' },
  shadow: { label: 'Gölge Oyunu' },
  puppet: { label: 'Kukla Oyunu' },
  help: { label: 'Yardımlaşma' },
  craft: { label: 'El İşi' },
  blocks: { label: 'Bloklar' },
  puzzle: { label: 'Bulmaca' },
  contrast: { label: 'Görsel Takip' },
  talk: { label: 'Konuşma' },
  track: { label: 'Takip' },
  carry: { label: 'Taşıma' },
  throw: { label: 'Atış' },
  mirror: { label: 'Ayna Oyunu' },
  turn: { label: 'Sıra Oyunu' },
  peek: { label: 'Saklambaç' },
}

type Rule = { scene: SceneId; keywords: string[] }

const TITLE_RULES: Rule[] = [
  { scene: 'lid', keywords: ['kapak', 'açma', 'kapağı', 'kutu', 'şişe', 'kavanoz', 'kapağın'] },
  { scene: 'contrast', keywords: ['kontrast', 'siyah-beyaz', 'ışık takip', 'renkli ışık', 'parlak', 'kart izleme', 'kart takip'] },
  { scene: 'face', keywords: ['yüz', 'mimik', 'ifade', 'duygu', 'selamlaşma', 'yüz takip', 'mimik eşleştirme', 'mimik tanıma', 'yüz ifadesi', 'yüz ve ses'] },
  { scene: 'peek', keywords: ['saklambaç', 'cee', 'gizlen', 'gizli nesne'] },
  { scene: 'sensory', keywords: ['dokun', 'duyu', 'yumuşak dokunuş', 'duyusal', 'hisset', 'yumuşak', 'dokunuş'] },
  { scene: 'track', keywords: ['takip', 'takip et', 'hareketli şekil', 'hareket eden', 'gözlerinle', 'göz takip', 'balonu göz', 'hedef nokta'] },
  { scene: 'animal', keywords: ['hayvan', 'kedi', 'köpek', 'kuş', 'inek', 'koyun', 'at', 'kurbağa', 'ördek', 'tavuk', 'aslan', 'fil', 'tavşan', 'ayı', 'hayvanı bul', 'hayvan sesi', 'hayvanları', 'hayvan yürüyüşleri'] },
  { scene: 'ball', keywords: ['top', 'yuvarla', 'topa vur', 'top atma', 'yumuşak top', 'büyük top'] },
  { scene: 'throw', keywords: ['atış', 'hedef', 'basket', 'sepete', 'atma ve hedef', 'fırlat'] },
  { scene: 'colors', keywords: ['renk', 'renkli', 'rengi', 'renkleri', 'renk avı', 'renk hafıza', 'renk sıralama', 'renk eşleştirme', 'renk düzeni', 'renkli şekil', 'parmak ve renk', 'parmakla renk', 'iki renk', 'renk ve şekil'] },
  { scene: 'shapes', keywords: ['şekil', 'şekli', 'şekiller', 'geometrik', 'şekle dokun', 'şekil dedektifi', 'şekil hafızası', 'şekil eşleştirme', 'şekil yerleştir'] },
  { scene: 'paper', keywords: ['kâğıt', 'kağıt', 'buruştur', 'katla', 'kâğıt top'] },
  { scene: 'music', keywords: ['müzik', 'ritim', 'şarkı', 'zil', 'çal', 'orkestra', 'çalkala', 'müziğe göre', 'müzik ve', 'ses çıkarma', 'kısa müzik'] },
  { scene: 'book', keywords: ['kitap', 'hikâye', 'hikaye', 'masal', 'oku', 'okuma', 'resimli', 'görsel kart'] },
  { scene: 'walk', keywords: ['yürü', 'çizgide', 'denge', 'parkur', 'adım', 'yürüyüş', 'çizgi', 'hareket', 'zıpla', 'koş', 'ip üzerinde'] },
  { scene: 'beads', keywords: ['boncuk', 'dizme', 'ip', 'kolye', 'boncuk dizme'] },
  { scene: 'sort', keywords: ['sırala', 'sınıflandır', 'ayır', 'grupla', 'sıralama', 'kutuları doldur', 'dokun ve sırala', 'iki adımda sırala', 'iki adımlı sıralama'] },
  { scene: 'count', keywords: ['say', 'sayı', 'adım', 'sayma', '1-5', 'beşe kadar', 'sayılar'] },
  { scene: 'memory', keywords: ['hafıza', 'hatırla', 'sakladım', 'anı', 'hafızası', 'gizli', 'hafta'] },
  { scene: 'match', keywords: ['eşleştir', 'eşleşme', 'aynısını', 'çift', 'aynı', 'farkı', 'eşleşme kartı', 'aynı ve farklı', 'eşleştirme'] },
  { scene: 'water', keywords: ['su', 'yıka', 'banyo', 'ıslak', 'balıkçı', 'havuz', 'dök'] },
  { scene: 'nature', keywords: ['doğa', 'yaprak', 'çiçek', 'kolaj', 'ağaç', 'dışarı', 'bahçe'] },
  { scene: 'shadow', keywords: ['gölge', 'fener'] },
  { scene: 'puppet', keywords: ['kukla', 'oyuncakla', 'kuklalar'] },
  { scene: 'help', keywords: ['yardım', 'görev', 'sorumluluk', 'birlikte', 'eki', 'yardımcı'] },
  { scene: 'blocks', keywords: ['blok', 'kule', 'inşa', 'yığ', 'bloklar'] },
  { scene: 'puzzle', keywords: ['bulmaca', 'parça', 'yapboz', 'kaybolan', 'problem', 'çözüm', 'bul', 'eksik'] },
  { scene: 'carry', keywords: ['taşı', 'taşıma', 'mandal', 'maşa', 'aktar', 'boncuk taşı', 'küçük taşıma'] },
  { scene: 'mirror', keywords: ['ayna', 'taklit', 'hareketleri', 'yürüyüşleri', 'hayvan hareket'] },
  { scene: 'talk', keywords: ['kelime', 'konuş', 'anlat', 'muhabir', 'uyak', 'sesli okuma', 'hikâye anlat', 'hikaye anlat', 'cümle', 'resim anlat', 'anlatım', 'sesleri dinle', 'sesli', 'sözcük'] },
  { scene: 'craft', keywords: ['boya', 'çiz', 'resim', 'parmak boyama', 'müziği çiz', 'yapıştır', 'çizgi', 'kalem'] },
]

const INTERACTION_SCENE: Partial<Record<string, SceneId>> = {
  'contrast-track': 'contrast',
  'balloon-track': 'track',
  'touch-and-see': 'sensory',
  'sorting-game': 'sort',
  'color-match-mini': 'colors',
  'missing-shape': 'shapes',
  'animal-finder': 'animal',
  'motion-track': 'track',
  'size-picker': 'sort',
  'twin-match': 'match',
  'sound-object': 'talk',
  'moving-shape': 'track',
  'sound-cue': 'animal',
  'drag-sort': 'carry',
  'picture-match': 'match',
  'pattern-complete': 'blocks',
  'memory-grid': 'memory',
  'shape-puzzle': 'shapes',
  'word-pick': 'talk',
  'logic-grid': 'puzzle',
  'attention-spot': 'track',
  'sequence-memory': 'memory',
  'mini-tetris': 'blocks',
  'candy-match': 'match',
  'reaction-target': 'track',
  'strategy-plan': 'puzzle',
  'strategy-maze': 'puzzle',
  'complex-puzzle': 'puzzle',
  'advanced-memory': 'memory',
}

const CATEGORY_FALLBACK: Record<ActivityCategory, SceneId> = {
  cognitive: 'puzzle',
  language: 'talk',
  motor: 'walk',
  social: 'face',
  creativity: 'craft',
}

function matchTitle(text: string): SceneId | null {
  const lower = text.toLocaleLowerCase('tr-TR')
  for (const rule of TITLE_RULES) {
    if (rule.keywords.some((keyword) => lower.includes(keyword))) return rule.scene
  }
  return null
}

export function sceneFor(activity: Activity): SceneId {
  const fromTitle = matchTitle(`${activity.title} ${activity.description}`)
  if (fromTitle) return fromTitle
  if (activity.interactionId) {
    const fromInteraction = INTERACTION_SCENE[activity.interactionId]
    if (fromInteraction) return fromInteraction
  }
  return CATEGORY_FALLBACK[activity.category]
}

export function sceneLabel(activity: Activity): string {
  return SCENE_META[sceneFor(activity)].label
}