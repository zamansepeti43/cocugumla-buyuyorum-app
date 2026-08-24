import { ChoiceGame } from './ChoiceGame'

export function PatternCompleteGame() {
  return (
    <ChoiceGame
      note="Örüntüyü incele ve sıradaki şekli seç."
      successMessage="Süper! Örüntüleri doğru tamamladın."
      rounds={[
        {
          prompt: '🔴 🔵 🔴 🔵 🔴 ? Sıradaki şekli seç.',
          correctId: 'blue',
          options: [
            { id: 'red', label: 'Kırmızı', emoji: '🔴' },
            { id: 'blue', label: 'Mavi', emoji: '🔵' },
            { id: 'green', label: 'Yeşil', emoji: '🟢' },
          ],
        },
        {
          prompt: '⭐ 🌙 ⭐ 🌙 ⭐ ? Sıradaki şekli seç.',
          correctId: 'moon',
          options: [
            { id: 'star', label: 'Yıldız', emoji: '⭐' },
            { id: 'moon', label: 'Ay', emoji: '🌙' },
            { id: 'sun', label: 'Güneş', emoji: '☀️' },
          ],
        },
        {
          prompt: '🍎 🍌 🍎 🍌 🍎 ? Sıradaki meyveyi seç.',
          correctId: 'banana',
          options: [
            { id: 'apple', label: 'Elma', emoji: '🍎' },
            { id: 'banana', label: 'Muz', emoji: '🍌' },
            { id: 'grape', label: 'Üzüm', emoji: '🍇' },
          ],
        },
      ]}
    />
  )
}