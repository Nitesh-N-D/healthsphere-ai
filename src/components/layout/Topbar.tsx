import { Search, Bell, Cpu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

interface TopbarProps {
  title?: string
}

export default function Topbar({ title }: TopbarProps) {
  const { user } = useAuth()

  return (
    <header
      className="h-16 flex items-center justify-between px-8 sticky top-0 z-30"
      style={{
        background: 'rgba(10, 25, 41, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(45,212,191,0.08)',
      }}
    >
      <div className="flex items-center gap-4">
        {title && (
          <h1 className="font-display font-semibold text-white text-xl">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20">
              <Cpu size={12} className="text-teal-400" />
              <span className="text-xs font-mono text-teal-400">{user.points} pts</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-xs font-mono text-amber-400">LVL {user.level}</span>
            </div>
            <button className="p-2 rounded-lg text-obsidian-400 hover:text-teal-400 hover:bg-teal-500/10 transition-all relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400" />
            </button>
          </>
        )}
        {!user && (
          <div className="flex gap-2">
            <Link to="/login" className="btn-ghost py-2 px-4 text-sm">Sign In</Link>
            <Link to="/register" className="btn-primary py-2 px-4 text-sm">Get Started</Link>
          </div>
        )}
      </div>
    </header>
  )
}
