import { activities } from './activities'
import { additionalActivities } from './activityLibrary'
import type { Activity, ActivityDifficulty } from '../types/models'

const STEP_TEMPLATES: Record<string, string[]> = {
  guided: [
    'Çocuğunuzun hazır olduğundan emin olun ve kısa bir örnek gösterin.',
    'Adım adım ilerleyin; her aşamada geri bildirim verin.',
    'Tamamlandığında birlikte sonucu gözden geçirin ve kutlayın.',
  ],
  game: [
    'Oyunun kurallarını kısa bir cümleyle hatırlatın.',
    'İlk turda birlikte oynayıp örnek olun.',
    'Tur bittiğinde puanı ya da başarıyı birlikte değerlendirin.',
  ],
  quiz: [
    'Soruyu net ve yavaş biçimde okuyun.',
    'Cevap için çocuğunuza zaman tanıyın.',
    'Cevabı birlikte kontrol edip doğruyu tekrar edin.',
  ],
  matching: [
    'Kartları çocuğunuzun görebileceği şekilde düzenleyin.',
    'İlk eşleşmeyi birlikte bulup örnek olun.',
    'Eşleşmeleri birlikte sayarak oyunu tamamlayın.',
  ],
  memory: [
    'Kartları yüzü kapalı dizin ve süreyi kısa tutun.',
    'İlk açışta yerleri birlikte hatırlamaya çalışın.',
    'Tüm eşleşmeler bitince birlikte kutlayın.',
  ],
  sorting: [
    'Parçaları karışık şekilde ortaya koyun.',
    'İlk parçayı birlikte sınıflandırıp örnek olun.',
    'Tüm parçalar yerleşince birlikte kontrol edin.',
  ],
  creative: [
    'Malzemeleri güvenli ve düzenli bir alanda hazırlayın.',
    'Fikirlerini serbestçe denemesine izin verin.',
    'Ortaya çıkan ürünü birlikte inceleyip isim verin.',
  ],
  visual: [
    'Görseli ya da hareketi yavaş ve net gösterin.',
    'Çocuğunuzun takip etmesi için zaman tanıyın.',
    'Tepkisini gözlemleyip olumlu geri bildirim verin.',
  ],
}

function expandInstructions(activity: Activity): string[] {
  const instructions = [...activity.instructions]
  if (instructions.length >= 5) return instructions
  const templates = STEP_TEMPLATES[activity.activityType ?? 'guided'] ?? STEP_TEMPLATES.guided
  for (const template of templates) {
    if (instructions.length >= 5) break
    if (!instructions.some((step) => step === template)) instructions.push(template)
  }
  return instructions
}

function resolveDifficulty(activity: Activity): ActivityDifficulty {
  const complexity = activity.instructions.length >= 4 ? 1 : 0
  if (activity.ageMin >= 96) return 'medium'
  if (activity.ageMin >= 61 && complexity === 1) return 'medium'
  return 'easy'
}

const enrichedBase: Activity[] = activities.map((activity) => ({
  ...activity,
  instructions: activity.instructions.length >= 5 ? activity.instructions : expandInstructions(activity),
  difficulty: resolveDifficulty(activity),
}))

const enrichedAdditional: Activity[] = additionalActivities.map((activity) => ({
  ...activity,
  instructions: expandInstructions(activity),
  difficulty: resolveDifficulty(activity),
}))

export const allActivities: Activity[] = [...enrichedBase, ...enrichedAdditional]