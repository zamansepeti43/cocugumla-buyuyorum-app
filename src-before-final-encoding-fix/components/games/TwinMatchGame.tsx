import { ChoiceGame } from './ChoiceGame'

export function TwinMatchGame() {
  return (
    <ChoiceGame
      note="Üstte söylenen örneğin aynısını seç."
      successMessage="Süper! Aynı kartları buldunuz."
      rounds={[
        {
          prompt: 'Örnek: Mavi balık. Aynısını seç.',
          correctId: 'blue-fish',
          options: [
            { id: 'blue-fish', label: 'Mavi Balık', emoji: '🐟' },
            { id: 'red-fish', label: 'Kırmızı Balık', emoji: '🐠' },
            { id: 'yellow-fish', label: 'Sarı Balık', emoji: '🐡' },
          ],
        },
        {
          prompt: 'Örnek: Yeşil yaprak. Aynısını seç.',
          correctId: 'green-leaf',
          options: [
            { id: 'green-leaf', label: 'Yeşil Yaprak', emoji: '🍃' },
            { id: 'red-leaf', label: 'Kırmızı Yaprak', emoji: '🍁' },
            { id: 'flower', label: 'Çiçek', emoji: '🌸' },
          ],
        },
        {
          prompt: 'Örnek: Kırmızı top. Aynısını seç.',
          correctId: 'red-ball',
          options: [
            { id: 'blue-ball', label: 'Mavi Top', emoji: '🔵' },
            { id: 'red-ball', label: 'Kırmızı Top', emoji: '🔴' },
            { id: 'green-ball', label: 'Yeşil Top', emoji: '🟢' },
          ],
        },
      ]}
    />
  )
}