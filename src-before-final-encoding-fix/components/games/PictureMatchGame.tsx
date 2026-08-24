import { ChoiceGame } from './ChoiceGame'

export function PictureMatchGame() {
  return (
    <ChoiceGame
      note="Üstteki örnek görsele bak ve aynısını seç."
      successMessage="Süper! Resimleri doğru eşleştirdin."
      rounds={[
        {
          prompt: 'Örnek: 🍎 Elma. Aynısını seç.',
          correctId: 'apple',
          options: [
            { id: 'apple', label: 'Elma', emoji: '🍎' },
            { id: 'orange', label: 'Portakal', emoji: '🍊' },
            { id: 'banana', label: 'Muz', emoji: '🍌' },
          ],
        },
        {
          prompt: 'Örnek: 🐶 Köpek. Aynısını seç.',
          correctId: 'dog',
          options: [
            { id: 'cat', label: 'Kedi', emoji: '🐱' },
            { id: 'dog', label: 'Köpek', emoji: '🐶' },
            { id: 'fish', label: 'Balık', emoji: '🐟' },
          ],
        },
        {
          prompt: 'Örnek: 🚗 Araba. Aynısını seç.',
          correctId: 'car',
          options: [
            { id: 'car', label: 'Araba', emoji: '🚗' },
            { id: 'bus', label: 'Otobüs', emoji: '🚌' },
            { id: 'plane', label: 'Uçak', emoji: '✈️' },
          ],
        },
      ]}
    />
  )
}