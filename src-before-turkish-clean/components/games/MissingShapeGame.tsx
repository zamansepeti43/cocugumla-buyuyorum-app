import { ChoiceGame } from './ChoiceGame'

export function MissingShapeGame() {
  return (
    <ChoiceGame
      note="Görünen şekli aklında tut ve kaybolunca doğru olanı seç."
      successMessage="Süper! Kaybolan şekilleri doğru buldunuz."
      rounds={[
        {
          prompt: 'Kaybolan şekil: Üçgen',
          correctId: 'triangle',
          options: [
            { id: 'circle', label: 'Daire', emoji: '⚪' },
            { id: 'triangle', label: 'Üçgen', emoji: '🔺' },
            { id: 'square', label: 'Kare', emoji: '🟦' },
          ],
        },
        {
          prompt: 'Kaybolan şekil: Kare',
          correctId: 'square',
          options: [
            { id: 'square', label: 'Kare', emoji: '🟦' },
            { id: 'star', label: 'Yıldız', emoji: '⭐' },
            { id: 'circle', label: 'Daire', emoji: '⚪' },
          ],
        },
        {
          prompt: 'Kaybolan şekil: Daire',
          correctId: 'circle',
          options: [
            { id: 'heart', label: 'Kalp', emoji: '❤️' },
            { id: 'triangle', label: 'Üçgen', emoji: '🔺' },
            { id: 'circle', label: 'Daire', emoji: '⚪' },
          ],
        },
      ]}
    />
  )
}