import { ChoiceGame } from './ChoiceGame'

export function ComplexPuzzleGame() {
  return (
    <ChoiceGame
      note="Soruyu oku ve doğru cevabı seç."
      successMessage="Süper! Zorlu bulmacaları çözdün."
      rounds={[
        {
          prompt: '3 + 4 işleminin sonucu kaçtır?',
          correctId: 'seven',
          options: [
            { id: 'six', label: '6', emoji: '6️⃣' },
            { id: 'seven', label: '7', emoji: '7️⃣' },
            { id: 'eight', label: '8', emoji: '8️⃣' },
          ],
        },
        {
          prompt: 'Sıradaki sayıyı bul: 5, 10, 15, ?',
          correctId: 'twenty',
          options: [
            { id: 'eighteen', label: '18', emoji: '1️⃣8️⃣' },
            { id: 'twenty', label: '20', emoji: '2️⃣0️⃣' },
            { id: 'twentyfive', label: '25', emoji: '2️⃣5️⃣' },
          ],
        },
        {
          prompt: 'Bir ağaçta 6 kuş var. 2 tanesi uçtu. Kaç kuş kaldı?',
          correctId: 'four',
          options: [
            { id: 'two', label: '2', emoji: '2️⃣' },
            { id: 'four', label: '4', emoji: '4️⃣' },
            { id: 'six', label: '6', emoji: '6️⃣' },
          ],
        },
      ]}
    />
  )
}