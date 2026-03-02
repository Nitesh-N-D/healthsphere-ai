import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

/**
 * Single health log entry
 */
export interface HealthEntry {
  date: string
  weight?: number        // kg
  height?: number        // cm
  bmi?: number
  calories?: number     // kcal
  steps?: number
  heartRate?: number    // bpm
  sleep?: number        // hours
}

/**
 * Context shape
 */
interface HealthContextType {
  entries: HealthEntry[]
  latestEntry: HealthEntry | null
  addEntry: (entry: Omit<HealthEntry, 'bmi' | 'date'>) => void
}

/**
 * Context
 */
const HealthContext = createContext<HealthContextType | null>(null)

/**
 * Provider
 */
export function HealthProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<HealthEntry[]>([])

  // Load entries from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem('hs_health_entries')
    if (stored) {
      try {
        setEntries(JSON.parse(stored))
      } catch {
        setEntries([])
      }
    }
  }, [])

  // Persist entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hs_health_entries', JSON.stringify(entries))
  }, [entries])

  /**
   * Add new health entry
   * BMI is automatically calculated if height & weight are provided
   */
  const addEntry = (entry: Omit<HealthEntry, 'bmi' | 'date'>) => {
    const bmi =
      entry.weight && entry.height
        ? Number((entry.weight / Math.pow(entry.height / 100, 2)).toFixed(1))
        : undefined

    const newEntry: HealthEntry = {
      ...entry,
      bmi,
      date: new Date().toISOString().split('T')[0],
    }

    setEntries(prev => [...prev, newEntry])
  }

  return (
    <HealthContext.Provider
      value={{
        entries,
        latestEntry: entries.length > 0 ? entries[entries.length - 1] : null,
        addEntry,
      }}
    >
      {children}
    </HealthContext.Provider>
  )
}

/**
 * Hook
 */
export function useHealth() {
  const ctx = useContext(HealthContext)
  if (!ctx) {
    throw new Error('useHealth must be used within a HealthProvider')
  }
  return ctx
}