import type { SceneId } from './activityScene'

export type HowToStage =
  | 'boxClosed'
  | 'boxOpen'
  | 'parentShowBox'
  | 'childReach'
  | 'childOpen'
  | 'childFind'
  | 'parentShowCards'
  | 'childHear'
  | 'childLookCards'
  | 'childPick'
  | 'childHold'
  | 'childMove'
  | 'dropInBin'
  | 'childTouch'
  | 'musicNotes'
  | 'walkLine'
  | 'sortBoxes'
  | 'childDraw'
  | 'parentTalk'
  | 'bookTogether'
  | 'ballRoll'
  | 'childKick'
  | 'mirrorPose'
  | 'peekObject'
  | 'buildTower'
  | 'matchPair'
  | 'countFingers'
  | 'waterPlay'

export interface HowToStep {
  label: string
  stage: HowToStage
}

export const HOW_TO_STEPS: Record<SceneId, HowToStep[]> = {
  lid: [
    { label: 'Kapalı kutuyu önüne koy', stage: 'boxClosed' },
    { label: 'Kapağı göster ve salla', stage: 'parentShowBox' },
    { label: 'Çocuk kapağa uzanır', stage: 'childReach' },
    { label: 'Birlikte kapağı açın', stage: 'childOpen' },
    { label: 'İçindekini keşfeder', stage: 'childFind' },
  ],
  animal: [
    { label: 'Hayvan sesini çal', stage: 'childHear' },
    { label: 'Birlikte dinleyin', stage: 'parentShowCards' },
    { label: 'Hayvanlara bak', stage: 'childLookCards' },
    { label: 'Doğru hayvana dokun', stage: 'childPick' },
  ],
  ball: [
    { label: 'Topu çocuğa ver', stage: 'childHold' },
    { label: 'Topu birlikte yuvarlayın', stage: 'ballRoll' },
    { label: 'Sırayla topa vur', stage: 'childKick' },
  ],
  colors: [
    { label: 'İki rengi göster', stage: 'parentShowCards' },
    { label: 'Renkleri adlandırın', stage: 'parentTalk' },
    { label: 'İstenen renge dokun', stage: 'childPick' },
  ],
  shapes: [
    { label: 'Şekilleri ortaya koy', stage: 'parentShowCards' },
    { label: 'Şekli birlikte inceleyin', stage: 'childLookCards' },
    { label: 'Doğru şekle dokun', stage: 'childPick' },
  ],
  paper: [
    { label: 'Kâğıdı çocuğa ver', stage: 'childHold' },
    { label: 'Buruşturmayı göster', stage: 'parentShowBox' },
    { label: 'Birlikte buruşturun', stage: 'childTouch' },
  ],
  music: [
    { label: 'Müziği başlat', stage: 'musicNotes' },
    { label: 'Ritme birlikte eşlik edin', stage: 'parentTalk' },
    { label: 'Çocuk da çalsın', stage: 'childHold' },
  ],
  book: [
    { label: 'Kitabı birlikte açın', stage: 'bookTogether' },
    { label: 'Görselleri göster', stage: 'parentShowCards' },
    { label: 'Hikâyeyi birlikte anlatın', stage: 'parentTalk' },
  ],
  face: [
    { label: 'Bir mimik yap', stage: 'mirrorPose' },
    { label: 'Çocuğun bakmasını bekle', stage: 'childLookCards' },
    { label: 'Taklit etmesini teşvik et', stage: 'childPick' },
  ],
  walk: [
    { label: 'Çizgiyi yere yap', stage: 'walkLine' },
    { label: 'Örnek olarak yürü', stage: 'parentShowBox' },
    { label: 'Çocuk çizgide yürür', stage: 'childHold' },
  ],
  beads: [
    { label: 'İpi ve parçaları koy', stage: 'parentShowCards' },
    { label: 'Parçayı tut', stage: 'childHold' },
    { label: 'İpi delikten geçir', stage: 'childOpen' },
  ],
  sort: [
    { label: 'Parçaları karıştır', stage: 'sortBoxes' },
    { label: 'Kutuları hazırla', stage: 'boxOpen' },
    { label: 'Parçayı doğru kutuya koy', stage: 'dropInBin' },
  ],
  count: [
    { label: 'Saymaya birlikte başla', stage: 'countFingers' },
    { label: 'Her adımda say', stage: 'walkLine' },
    { label: 'Son sayıyı birlikte söyle', stage: 'parentTalk' },
  ],
  memory: [
    { label: 'Nesneleri göster', stage: 'parentShowCards' },
    { label: 'Gözlemlemesini sağla', stage: 'childLookCards' },
    { label: 'Gizle ve sor', stage: 'peekObject' },
    { label: 'Doğru olanı seç', stage: 'childPick' },
  ],
  match: [
    { label: 'Örnek kartı göster', stage: 'parentShowCards' },
    { label: 'Aynısını ara', stage: 'childLookCards' },
    { label: 'Eşini bul ve eşleştir', stage: 'matchPair' },
  ],
  sensory: [
    { label: 'Malzemeyi yumuşakça göster', stage: 'parentShowBox' },
    { label: 'Dokunmasına izin ver', stage: 'childTouch' },
    { label: 'Hissettiklerini anlatın', stage: 'parentTalk' },
  ],
  water: [
    { label: 'Kabı hazırla', stage: 'waterPlay' },
    { label: 'Suyla oynamasına izin ver', stage: 'childTouch' },
    { label: 'Dökmeyi birlikte deneyin', stage: 'dropInBin' },
  ],
  nature: [
    { label: 'Dışarıda bir şey bul', stage: 'peekObject' },
    { label: 'Birlikte inceleyin', stage: 'parentShowCards' },
    { label: 'Ne olduğunu anlatın', stage: 'parentTalk' },
  ],
  shadow: [
    { label: 'Feneri yak', stage: 'peekObject' },
    { label: 'Gölgeyi duvara yansıt', stage: 'mirrorPose' },
    { label: 'Birlikte hareket ettirin', stage: 'childMove' },
  ],
  puppet: [
    { label: 'Kuklayı eline al', stage: 'childHold' },
    { label: 'Kuklayla konuş', stage: 'parentTalk' },
    { label: 'Çocuk da denesin', stage: 'childPick' },
  ],
  help: [
    { label: 'Küçük bir görev seç', stage: 'sortBoxes' },
    { label: 'Birlikte yapın', stage: 'parentTalk' },
    { label: 'Tamamlamasını kutla', stage: 'childFind' },
  ],
  craft: [
    { label: 'Malzemeleri hazırla', stage: 'parentShowCards' },
    { label: 'Nasıl yapılacağını göster', stage: 'childDraw' },
    { label: 'Çocuk kendi yapsın', stage: 'childDraw' },
  ],
  blocks: [
    { label: 'Blokları koy', stage: 'sortBoxes' },
    { label: 'Kuleyi birlikte kurun', stage: 'buildTower' },
    { label: 'Kendi kulesini yapsın', stage: 'childOpen' },
  ],
  puzzle: [
    { label: 'Parçaları karıştır', stage: 'sortBoxes' },
    { label: 'Parçayı incele', stage: 'childLookCards' },
    { label: 'Doğru yere yerleştir', stage: 'dropInBin' },
  ],
  contrast: [
    { label: 'Kartı göz hizasında tut', stage: 'parentShowCards' },
    { label: 'Yavaşça hareket ettir', stage: 'childMove' },
    { label: 'Bakışını takip et', stage: 'childLookCards' },
  ],
  talk: [
    { label: 'Tek kelime söyle', stage: 'parentTalk' },
    { label: 'Göstere göstere anlat', stage: 'parentShowCards' },
    { label: 'Çocuğun tekrarını bekle', stage: 'childHear' },
  ],
  track: [
    { label: 'Nesneyi göster', stage: 'parentShowBox' },
    { label: 'Yavaşça hareket ettir', stage: 'childMove' },
    { label: 'Gözleriyle takip etsin', stage: 'childLookCards' },
  ],
  carry: [
    { label: 'Nesneyi seç', stage: 'childHold' },
    { label: 'Kavra ve tut', stage: 'childReach' },
    { label: 'Diğer kaba taşı', stage: 'childMove' },
    { label: 'Kutuya bırak', stage: 'dropInBin' },
  ],
  throw: [
    { label: 'Hedefi koy', stage: 'boxOpen' },
    { label: 'Topu tut', stage: 'childHold' },
    { label: 'Hedefe at', stage: 'childKick' },
    { label: 'Başarıyı kutla', stage: 'childFind' },
  ],
  mirror: [
    { label: 'Bir hareket yap', stage: 'mirrorPose' },
    { label: 'Çocuk izlesin', stage: 'childLookCards' },
    { label: 'Taklit etmesini iste', stage: 'childPick' },
  ],
  turn: [
    { label: 'Sırayla oynayın', stage: 'parentTalk' },
    { label: 'Sıranı bekle', stage: 'childLookCards' },
    { label: 'Sıra çocukta', stage: 'childPick' },
  ],
  peek: [
    { label: 'Nesneyi sakla', stage: 'peekObject' },
    { label: '"Cee" de', stage: 'parentShowBox' },
    { label: 'Çocuk bulsun', stage: 'childFind' },
  ],
}

export function getHowToSteps(scene: SceneId): HowToStep[] {
  return HOW_TO_STEPS[scene] ?? HOW_TO_STEPS.talk
}