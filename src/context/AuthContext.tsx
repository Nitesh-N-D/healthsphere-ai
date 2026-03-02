import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface UserProfile {
  id: string
  name: string
  email: string
  age?: number
  gender?: string
  height?: number
  weight?: number
  points: number
  level: number
  badges: string[]
  joinedAt: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: UserProfile | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<UserProfile>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('hs_auth')
    if (stored) {
      try {
        const { isAuthenticated, user } = JSON.parse(stored)
        setIsAuthenticated(isAuthenticated)
        setUser(user)
      } catch {}
    }
  }, [])

  const persist = (auth: boolean, profile: UserProfile | null) => {
    localStorage.setItem('hs_auth', JSON.stringify({ isAuthenticated: auth, user: profile }))
  }

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('hs_users') || '[]')
    const found = users.find((u: any) => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Invalid email or password' }
    const { password: _, ...profile } = found
    setIsAuthenticated(true)
    setUser(profile)
    persist(true, profile)
    return { success: true }
  }

  const register = async (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('hs_users') || '[]')
    if (users.find((u: any) => u.email === email)) {
      return { success: false, error: 'Email already registered' }
    }
    const newUser: UserProfile = {
      id: Date.now().toString(),
      name,
      email,
      points: 0,
      level: 1,
      badges: ['newcomer'],
      joinedAt: new Date().toISOString(),
    }
    users.push({ ...newUser, password })
    localStorage.setItem('hs_users', JSON.stringify(users))
    setIsAuthenticated(true)
    setUser(newUser)
    persist(true, newUser)
    return { success: true }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('hs_auth')
  }

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return
    const updated = { ...user, ...data }
    setUser(updated)
    persist(true, updated)
    // also update in users list
    const users = JSON.parse(localStorage.getItem('hs_users') || '[]')
    const idx = users.findIndex((u: any) => u.id === user.id)
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...data }
      localStorage.setItem('hs_users', JSON.stringify(users))
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
