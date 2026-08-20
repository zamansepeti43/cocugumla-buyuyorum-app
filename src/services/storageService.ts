import type { AppData } from '../types/models'

const STORAGE_KEY = 'cocugumla-buyuyorum:v1'

const initialData: AppData = {
  hasOnboarded: false,
  children: [],
  activeChildId: null,
  completions: [],
  favorites: [],
  observations: [],
  progressRecords: [],
  childProgress: [],
}

function read(): AppData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return initialData
    const parsed = JSON.parse(saved) as Partial<AppData>
    return {
      ...initialData,
      ...parsed,
      progressRecords: Array.isArray(parsed.progressRecords) ? parsed.progressRecords : [],
      childProgress: Array.isArray(parsed.childProgress) ? parsed.childProgress : [],
    }
  } catch {
    return initialData
  }
}

function write(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const storageService = {
  getData: read,
  saveData: write,
  clearData(): void {
    localStorage.removeItem(STORAGE_KEY)
  },
}
