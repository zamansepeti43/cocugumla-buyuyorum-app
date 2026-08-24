import { ChoiceGame } from './ChoiceGame'

export function SizePickerGame() {
  return (
    <ChoiceGame
      note="Yönergeye göre büyük veya küçük nesneyi seç."
      successMessage="3 tur tamamlandı! Büyük-küçük oyunu bitti."
      rounds={[
        {
          prompt: 'Büyük olanı seç.',
          correctId: 'big-ball',
          options: [
            { id: 'big-ball', label: 'Büyük Top', emoji: '⚽' },
            { id: 'small-ball', label: 'Küçük Top', emoji: '🏀' },
            { id: 'tiny-ball', label: 'Mini Top', emoji: '🎾' },
          ],
        },
        {
          prompt: 'Küçük olanı seç.',
          correctId: 'small-car',
          options: [
            { id: 'big-car', label: 'Büyük Araba', emoji: '🚚' },
            { id: 'small-car', label: 'Küçük Araba', emoji: '🚗' },
            { id: 'medium-car', label: 'Orta Araba', emoji: '🚙' },
          ],
        },
        {
          prompt: 'Yine büyük olanı seç.',
          correctId: 'big-star',
          options: [
            { id: 'small-star', label: 'Küçük Yıldız', emoji: '✨' },
            { id: 'big-star', label: 'Büyük Yıldız', emoji: '⭐' },
            { id: 'moon', label: 'Ay', emoji: '🌙' },
          ],
        },
      ]}
    />
  )
}