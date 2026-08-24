import { ChoiceGame } from './ChoiceGame'

export function ColorMatchGame() {
  return (
    <ChoiceGame
      note="Hedef rengi bulup dokunun."
      successMessage="Harika! 3 turu tamamladınız."
      rounds={[
        {
          prompt: 'Kırmızı rengi bul.',
          correctId: 'red',
          options: [
            { id: 'red', label: 'Kırmızı', emoji: '🔴', color: '#fecaca' },
            { id: 'blue', label: 'Mavi', emoji: '🔵', color: '#bfdbfe' },
            { id: 'green', label: 'Yeşil', emoji: '🟢', color: '#bbf7d0' },
          ],
        },
        {
          prompt: 'Sarı rengi bul.',
          correctId: 'yellow',
          options: [
            { id: 'purple', label: 'Mor', emoji: '🟣', color: '#ddd6fe' },
            { id: 'yellow', label: 'Sarı', emoji: '🟡', color: '#fef08a' },
            { id: 'orange', label: 'Turuncu', emoji: '🟠', color: '#fed7aa' },
          ],
        },
        {
          prompt: 'Yeşil rengi bul.',
          correctId: 'green',
          options: [
            { id: 'pink', label: 'Pembe', emoji: '🩷', color: '#fbcfe8' },
            { id: 'green', label: 'Yeşil', emoji: '🟢', color: '#86efac' },
            { id: 'gray', label: 'Gri', emoji: '⚪', color: '#e5e7eb' },
          ],
        },
      ]}
    />
  )
}