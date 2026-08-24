export function getGreeting(hour = new Date().getHours()): { text: string; emoji: string } {
  if (hour >= 5 && hour < 12) return { text: 'Günaydın', emoji: '☀️' }
  if (hour >= 12 && hour < 18) return { text: 'Merhaba', emoji: '👋' }
  if (hour >= 18 && hour < 22) return { text: 'İyi akşamlar', emoji: '🌆' }
  return { text: 'Hoş geldin', emoji: '🌙' }
}

export function formatGreeting(name: string, hour = new Date().getHours()): string {
  const { text, emoji } = getGreeting(hour)
  return `${text}, ${name}! ${emoji}`
}