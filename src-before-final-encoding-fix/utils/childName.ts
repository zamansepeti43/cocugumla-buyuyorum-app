export function formatChildName(name: string | null | undefined): string {
  if (!name) return ''
  return name.toLocaleUpperCase('tr-TR')
}

export function childNameInitial(name: string | null | undefined): string {
  if (!name) return '★'
  return name.charAt(0).toLocaleUpperCase('tr-TR')
}