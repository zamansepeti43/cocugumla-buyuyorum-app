type SpeakOptions = {
  lang?: string
  rate?: number
  pitch?: number
  onStart?: () => void
  onEnd?: () => void
}

type ToneOptions = {
  frequency?: number
  duration?: number
  type?: OscillatorType
  volume?: number
}

let audioContext: AudioContext | null = null
let unlocked = false
let gesturesBound = false

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!audioContext) audioContext = new Ctor()
  return audioContext
}

function getVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return []
  return window.speechSynthesis.getVoices()
}

function findVoiceFor(lang: string): SpeechSynthesisVoice | null {
  const prefix = lang.toLowerCase().startsWith('tr') ? 'tr' : lang.toLowerCase().slice(0, 2)
  const voices = getVoices()
  return voices.find((voice) => voice.lang.toLowerCase().startsWith(prefix)) ?? null
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
}

export function unlockAudio(): void {
  if (unlocked) return
  unlocked = true

  // Web Audio context, ilk gerçek kullanıcı etkileşiminde (dokun/tıklama/temel)
  // resume() edilir; böylece programatik çalın (ör. tur başındaki otomatik ses)
  // gerçek ses dosyasını çalabilir.
  if (!gesturesBound && typeof window !== 'undefined') {
    gesturesBound = true
    const onGesture = () => {
      const context = getAudioContext()
      if (context) void context.resume()
      if (isSpeechSupported()) window.speechSynthesis.getVoices()
      window.removeEventListener('touchstart', onGesture)
      window.removeEventListener('mousedown', onGesture)
      window.removeEventListener('keydown', onGesture)
    }
    window.addEventListener('touchstart', onGesture, { once: true, passive: true })
    window.addEventListener('mousedown', onGesture, { once: true })
    window.addEventListener('keydown', onGesture, { once: true })
  }

  const context = getAudioContext()
  if (context && context.state === 'suspended') {
    void context.resume()
  }
  if (isSpeechSupported()) {
    window.speechSynthesis.getVoices()
  }
}

export function speak(text: string, options?: SpeakOptions): boolean {
  if (!isSpeechSupported()) return false

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = options?.lang ?? 'tr-TR'
  utterance.rate = options?.rate ?? 0.95
  utterance.pitch = options?.pitch ?? 1.02
  if (options?.onStart) utterance.onstart = options.onStart
  if (options?.onEnd) utterance.onend = options.onEnd

  const voice = findVoiceFor(utterance.lang)
  if (voice) utterance.voice = voice

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
  return true
}

/**
 * Sıralı (arka arkaya) söylemek için: her metin kendi dilinde, beklemeden
 * kuyruğa eklenir. Örn. İngilizce "cat" + Türkçe "kedi".
 * Araya cancel çağrılmaz, böylece iki parça kesintisiz çalınır.
 */
export function speakSequence(items: Array<{ text: string; lang?: string; rate?: number }>): void {
  if (!isSpeechSupported() || items.length === 0) return
  window.speechSynthesis.cancel()
  for (const item of items) {
    const utterance = new SpeechSynthesisUtterance(item.text)
    utterance.lang = item.lang ?? 'tr-TR'
    utterance.rate = item.rate ?? 0.95
    utterance.pitch = 1.02
    const voice = findVoiceFor(utterance.lang)
    if (voice) utterance.voice = voice
    window.speechSynthesis.speak(utterance)
  }
}

export function stopSpeaking(): void {
  if (!isSpeechSupported()) return
  window.speechSynthesis.cancel()
}

export function playTone(options?: ToneOptions): void {
  const context = getAudioContext()
  if (!context) return

  const frequency = options?.frequency ?? 660
  const duration = options?.duration ?? 0.18
  const type = options?.type ?? 'sine'
  const volume = options?.volume ?? 0.12

  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = type
  oscillator.frequency.value = frequency
  gain.gain.setValueAtTime(volume, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start()
  oscillator.stop(context.currentTime + duration)
}

/* ------------------------------------------------------------------ */
/* Gerçek ses (hayvan/araç/doğa) mimarisi                              */
/* TTS (speak) yalnızca insan yönergesi içindir. Gerçek hayvan sesleri */
/* TTS ile taklit EDİLMEZ; bunun yerine public/sounds/ altındaki gerçek*/
/* ses dosyaları oynatılır. Dosya yoksa / çözülemezse Web Audio osilatör*/
/* sentezi devreye girer; asla TTS ile "miyav/hav" söylenmez.          */
/* ------------------------------------------------------------------ */

export type RealSoundKind = 'animal' | 'vehicle' | 'nature'

export interface RealSoundDescriptor {
  key: string
  kind: RealSoundKind
  file: string
  label: string
}

const SOUND_BASE = '/sounds'

export const ANIMAL_SOUNDS: RealSoundDescriptor[] = [
  { key: 'cat', kind: 'animal', file: `${SOUND_BASE}/animals/cat.wav`, label: 'Kedi' },
  { key: 'dog', kind: 'animal', file: `${SOUND_BASE}/animals/dog.wav`, label: 'Köpek' },
  { key: 'bird', kind: 'animal', file: `${SOUND_BASE}/animals/bird.wav`, label: 'Kuş' },
  { key: 'cow', kind: 'animal', file: `${SOUND_BASE}/animals/cow.wav`, label: 'İnek' },
  { key: 'sheep', kind: 'animal', file: `${SOUND_BASE}/animals/sheep.mp3`, label: 'Koyun' },
  { key: 'horse', kind: 'animal', file: `${SOUND_BASE}/animals/horse.mp3`, label: 'At' },
  { key: 'frog', kind: 'animal', file: `${SOUND_BASE}/animals/frog.mp3`, label: 'Kurbağa' },
  { key: 'duck', kind: 'animal', file: `${SOUND_BASE}/animals/duck.mp3`, label: 'Ördek' },
  { key: 'chicken', kind: 'animal', file: `${SOUND_BASE}/animals/chicken.mp3`, label: 'Tavuk' },
  { key: 'lion', kind: 'animal', file: `${SOUND_BASE}/animals/lion.wav`, label: 'Aslan' },
  { key: 'elephant', kind: 'animal', file: `${SOUND_BASE}/animals/elephant.mp3`, label: 'Fil' },
  { key: 'rabbit', kind: 'animal', file: `${SOUND_BASE}/animals/rabbit.wav`, label: 'Tavşan' },
  { key: 'bear', kind: 'animal', file: `${SOUND_BASE}/animals/bear.mp3`, label: 'Ayı' },
]

export const VEHICLE_SOUNDS: RealSoundDescriptor[] = [
  { key: 'car', kind: 'vehicle', file: `${SOUND_BASE}/vehicles/car.wav`, label: 'Araba' },
  { key: 'train', kind: 'vehicle', file: `${SOUND_BASE}/vehicles/train.wav`, label: 'Tren' },
  { key: 'ambulance', kind: 'vehicle', file: `${SOUND_BASE}/vehicles/ambulance.wav`, label: 'Ambulans' },
  { key: 'firetruck', kind: 'vehicle', file: `${SOUND_BASE}/vehicles/firetruck.wav`, label: 'İtfaiye' },
]

export const NATURE_SOUNDS: RealSoundDescriptor[] = [
  { key: 'rain', kind: 'nature', file: `${SOUND_BASE}/nature/rain.mp3`, label: 'Yağmur' },
  { key: 'waves', kind: 'nature', file: `${SOUND_BASE}/nature/waves.mp3`, label: 'Deniz Dalgası' },
  { key: 'thunder', kind: 'nature', file: `${SOUND_BASE}/nature/thunder.mp3`, label: 'Gök Gürültüsü' },
]

export const ALL_REAL_SOUNDS: RealSoundDescriptor[] = [
  ...ANIMAL_SOUNDS,
  ...VEHICLE_SOUNDS,
  ...NATURE_SOUNDS,
]

/** Anahtara göre gerçek ses tanımlayıcısını bulur (yoksa null). */
export function findRealSoundByKey(key: string): RealSoundDescriptor | null {
  return ALL_REAL_SOUNDS.find((sound) => sound.key === key) ?? null
}

/* --------------------------------------------------------------- */
/* Web Audio tabanlı gerçek ses oynatımı                           */
/* HTMLAudioElement.play()'ın autoplay engellemesinden (programatik*/
/* ilk seslerin senk fall back'e düşmesine) kaçınmak için ses */
/* AudioBuffer olarak decode edilip AudioBufferSource.start() ile */
/* çalınır. Context, ilk kullanıcı dokunuşu/tuşlamayla unlockAudio*/
/* ile resume() edilir; ardından programatik çalın da çalınır.     */
/* --------------------------------------------------------------- */

const decodeCache = new Map<string, AudioBuffer>()
let currentBufferSource: AudioBufferSourceNode | null = null

/** Belirli bir gerçek ses dosyasının mevcut olup olmadığını bildirir (HEAD). */
export async function hasRealSoundFile(descriptor: RealSoundDescriptor): Promise<boolean> {
  if (typeof window === 'undefined') return false
  try {
    const response = await fetch(descriptor.file, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/** Dosyayı decode eder (başarısız olursa null). */
async function decodeSound(descriptor: RealSoundDescriptor): Promise<AudioBuffer | null> {
  const cached = decodeCache.get(descriptor.file)
  if (cached) return cached
  const context = getAudioContext()
  if (!context) return null
  try {
    const response = await fetch(descriptor.file)
    if (!response.ok) return null
    const arrayBuffer = await response.arrayBuffer()
    const buffer = await context.decodeAudioData(arrayBuffer)
    decodeCache.set(descriptor.file, buffer)
    return buffer
  } catch {
    return null
  }
}

export interface DecodedSoundInfo {
  sound: RealSoundDescriptor
  duration: number
  sampleRate: number
  channels: number
}

/** Hangi gerçek seslerin decode edilebildiğini topluca raporlar (asset denetimi). */
export async function decodeRealSounds(): Promise<{
  ok: DecodedSoundInfo[]
  bad: RealSoundDescriptor[]
}> {
  const results = await Promise.all(ALL_REAL_SOUNDS.map(async (sound) => {
    const buffer = await decodeSound(sound)
    return {
      sound,
      buffer,
      ok: buffer !== null,
      duration: buffer ? buffer.duration : 0,
      sampleRate: buffer ? buffer.sampleRate : 0,
      channels: buffer ? buffer.numberOfChannels : 0,
    }
  }))
  return {
    ok: results.filter((item) => item.ok).map((item) => ({
      sound: item.sound, duration: +item.duration.toFixed(2), sampleRate: item.sampleRate, channels: item.channels,
    })),
    bad: results.filter((item) => !item.ok).map((item) => item.sound),
  }
}

/** Halihazırda çalan gerçek sesi (ve TTS'i) durdur; üst üste binmeyi önler. */
export function stopRealSound(): void {
  if (currentBufferSource) {
    try {
      currentBufferSource.stop()
    } catch {
      /* zaten durdurulmuş; sessiz geç */
    }
    currentBufferSource = null
  }
  if (isSpeechSupported()) window.speechSynthesis.cancel()
}

/**
 * Gerçek ses dosyasını Web Audio buffer kaynağı olarak çalar.
 * Dosya mevcut ve decode edilebilirse `resolve(true)`, yoksa (sentez
 * fallback kullanıldığında) `resolve(false)` döner. Yeni bir ses
 * başlamadan önce önceki çalan ses ve TTS iptal edilir.
 */
export function playRealSound(descriptor: RealSoundDescriptor): Promise<boolean> {
  unlockAudio()
  stopRealSound()

  return new Promise((resolve) => {
    let settled = false
    const finish = (usedReal: boolean) => {
      if (settled) return
      settled = true
      resolve(usedReal)
    }

    void decodeSound(descriptor).then((buffer) => {
      const context = getAudioContext()
      if (!buffer || !context) {
        // Gerçek dosya yok / decode başarısız → osilatör sentez (TTS değil).
        synthesizeRealSound(descriptor)
        finish(false)
        return
      }
      try {
        const source = context.createBufferSource()
        source.buffer = buffer
        source.connect(context.destination)
        currentBufferSource = source
        source.start(0)
        finish(true)
      } catch {
        synthesizeRealSound(descriptor)
        finish(false)
      }
    })
  })
}

/** Hangi gerçek seslerin mevcut olduğunu topluca raporlar (asset denetimi). */
export async function checkAvailableRealSounds(): Promise<{
  available: RealSoundDescriptor[]
  missing: RealSoundDescriptor[]
}> {
  const results = await Promise.all(ALL_REAL_SOUNDS.map(async (sound) => ({
    sound,
    ok: await hasRealSoundFile(sound),
  })))
  return {
    available: results.filter((item) => item.ok).map((item) => item.sound),
    missing: results.filter((item) => !item.ok).map((item) => item.sound),
  }
}

/* ------------------------------------------------------------------ */
/* Web Audio osilatör sentez fallback'leri (gerçek ses yokken)       */
/* TTS değil; her hayvana özgü basit osilatör kalıpları üretir.        */
/* ------------------------------------------------------------------ */

type SynthPattern = Array<{ f: number; t: number; d: number; type?: OscillatorType; v?: number }>

function schedulePattern(pattern: SynthPattern): void {
  const context = getAudioContext()
  if (!context) return
  const start = context.currentTime + 0.02
  pattern.forEach((step) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = step.type ?? 'sine'
    oscillator.frequency.setValueAtTime(step.f, start + step.t)
    gain.gain.setValueAtTime(step.v ?? 0.12, start + step.t)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + step.t + step.d)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(start + step.t)
    oscillator.stop(start + step.t + step.d + 0.03)
  })
}

function synthesizeRealSound(descriptor: RealSoundDescriptor): void {
  if (descriptor.kind !== 'animal') {
    playTone({ frequency: 720, duration: 0.25, type: 'triangle', volume: 0.1 })
    return
  }

  switch (descriptor.key) {
    case 'cat':
      schedulePattern([{ f: 620, t: 0, d: 0.28 }, { f: 480, t: 0.34, d: 0.3 }, { f: 390, t: 0.7, d: 0.32 }])
      break
    case 'dog':
      schedulePattern([{ f: 190, t: 0, d: 0.14, type: 'square' }, { f: 170, t: 0.2, d: 0.16, type: 'square' }, { f: 200, t: 0.44, d: 0.14, type: 'square' }])
      break
    case 'bird':
      schedulePattern([{ f: 1900, t: 0, d: 0.08 }, { f: 2300, t: 0.16, d: 0.08 }, { f: 2050, t: 0.32, d: 0.09 }, { f: 2500, t: 0.5, d: 0.09 }])
      break
    case 'cow':
      schedulePattern([{ f: 150, t: 0, d: 0.4, type: 'sawtooth', v: 0.09 }, { f: 130, t: 0.5, d: 0.45, type: 'sawtooth', v: 0.09 }])
      break
    case 'sheep':
      schedulePattern([{ f: 430, t: 0, d: 0.18 }, { f: 410, t: 0.25, d: 0.2 }, { f: 440, t: 0.5, d: 0.18 }])
      break
    case 'horse':
      schedulePattern([{ f: 220, t: 0, d: 0.12, type: 'triangle' }, { f: 210, t: 0.18, d: 0.12 }, { f: 230, t: 0.36, d: 0.12 }])
      break
    case 'frog':
      schedulePattern([{ f: 300, t: 0, d: 0.09, type: 'square' }, { f: 310, t: 0.14, d: 0.09, type: 'square' }, { f: 290, t: 0.3, d: 0.1, type: 'square' }])
      break
    case 'duck':
      schedulePattern([{ f: 520, t: 0, d: 0.12, type: 'square' }, { f: 440, t: 0.2, d: 0.14, type: 'square' }, { f: 540, t: 0.42, d: 0.12, type: 'square' }])
      break
    case 'chicken':
      schedulePattern([{ f: 680, t: 0, d: 0.08, type: 'square' }, { f: 700, t: 0.12, d: 0.08 }, { f: 660, t: 0.28, d: 0.09 }, { f: 720, t: 0.42, d: 0.09 }])
      break
    case 'lion':
      schedulePattern([{ f: 140, t: 0, d: 0.5, type: 'sawtooth', v: 0.1 }, { f: 120, t: 0.55, d: 0.5, type: 'sawtooth', v: 0.1 }])
      break
    case 'elephant':
      schedulePattern([{ f: 100, t: 0, d: 0.6, type: 'sawtooth', v: 0.1 }, { f: 90, t: 0.7, d: 0.6, type: 'sawtooth', v: 0.1 }])
      break
    case 'rabbit':
      schedulePattern([{ f: 900, t: 0, d: 0.06, type: 'triangle' }, { f: 980, t: 0.1, d: 0.06 }, { f: 920, t: 0.2, d: 0.07 }])
      break
    case 'bear':
      schedulePattern([{ f: 110, t: 0, d: 0.55, type: 'sawtooth', v: 0.1 }])
      break
    default:
      playTone({ frequency: 600, duration: 0.3, type: 'triangle', volume: 0.1 })
  }
}

/* Geliştirme ortamında (localhost preview) tarayıcı tarafından gerçek ses
   denetimi yapılabilsin; prod'de bu blok devre dışı kalır. */
if (typeof window !== 'undefined' && typeof location !== 'undefined' && location.hostname === 'localhost') {
  const w = window as unknown as Record<string, unknown>
  w.__audioAudit = {
    ANIMAL_SOUNDS,
    findRealSoundByKey,
    hasRealSoundFile,
    checkAvailableRealSounds,
    decodeRealSounds,
    playRealSound,
    stopRealSound,
  }
}