import type { AppData } from '../types/models'

const STORAGE_KEY = 'cocugumla-buyuyorum:v1'

const initialData: AppData = {
  hasOnboarded: false,
  children: [],
  activeChildId: null,
  completions: [],
}

function read(): AppData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...initialData, ...JSON.parse(saved) as AppData } : initialData
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
