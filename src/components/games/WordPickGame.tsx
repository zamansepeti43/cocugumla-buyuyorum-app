import { ChoiceGame } from './ChoiceGame'

export function WordPickGame() {
  return (
    <ChoiceGame
      note="Kelimeyi dinle ve doğru görsele dokun."
      successMessage="Süper! Kelimeleri doğru buldun."
      rounds={[
        {
          prompt: 'Elma kelimesini duydun. Hangi görsel?',
          cue: 'Elma',
          correctId: 'apple',
          options: [
            { id: 'apple', label: 'Elma', emoji: '🍎' },
            { id: 'banana', label: 'Muz', emoji: '🍌' },
            { id: 'grapes', label: 'Üzüm', emoji: '🍇' },
          ],
        },
        {
          prompt: 'Köpek kelimesini duydun. Hangi görsel?',
          cue: 'Köpek',
          correctId: 'dog',
          options: [
            { id: 'cat', label: 'Kedi', emoji: '🐱' },
            { id: 'dog', label: 'Köpek', emoji: '🐶' },
            { id: 'rabbit', label: 'Tavşan', emoji: '🐰' },
          ],
        },
        {
          prompt: 'Güneş kelimesini duydun. Hangi görsel?',
          cue: 'Güneş',
          correctId: 'sun',
          options: [
            { id: 'moon', label: 'Ay', emoji: '🌙' },
            { id: 'star', label: 'Yıldız', emoji: '⭐' },
            { id: 'sun', label: 'Güneş', emoji: '☀️' },
          ],
        },
      ]}
    />
  )
}