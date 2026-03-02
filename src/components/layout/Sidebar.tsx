import { NavLink, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquare,
  Calculator,
  LineChart,
  Shield,
  Trophy,
  BookOpen,
  Globe,
  AlertTriangle,
  LogOut,
  Activity,
  ChevronRight,
  PlusCircle,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const publicLinks = [
  { to: '/encyclopedia', icon: BookOpen, label: 'Encyclopedia' },
  { to: '/pandemic', icon: Globe, label: 'Pandemic Analytics' },
  { to: '/disclaimer', icon: AlertTriangle, label: 'Disclaimer' },
]

const protectedLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },

  // ✅ ADD ENTRY (NEW)
  { to: '/add-entry', icon: PlusCircle, label: 'Add Health Entry' },

  { to: '/assistant', icon: MessageSquare, label: 'AI Assistant' },
  { to: '/calculators', icon: Calculator, label: 'Calculators' },
  { to: '/charts', icon: LineChart, label: 'Health Charts' },
  { to: '/risk-score', icon: Shield, label: 'Risk Score' },
  { to: '/gamification', icon: Trophy, label: 'Achievements' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40"
      style={{
        background: 'rgba(10, 25, 41, 0.95)',
        borderRight: '1px solid rgba(45,212,191,0.12)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 px-6 py-5 border-b border-teal-500/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
          <Activity size={18} className="text-white" />
        </div>
        <div>
          <span className="font-display font-bold text-white text-sm tracking-wide">
            HealthSphere
          </span>
          <span className="block text-teal-400 text-[10px] font-mono tracking-widest uppercase">
            AI Platform
          </span>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {user && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-obsidian-500 px-3 mb-2 font-medium">
              Dashboard
            </p>
            <nav className="space-y-1">
              {protectedLinks.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `nav-link group ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon size={16} />
                  <span className="flex-1">{label}</span>
                  <ChevronRight
                    size={12}
                    className="opacity-0 group-hover:opacity-50 transition-opacity"
                  />
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        <div>
          <p className="text-[10px] uppercase tracking-widest text-obsidian-500 px-3 mb-2 font-medium">
            Public
          </p>
          <nav className="space-y-1">
            {publicLinks.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link group ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={16} />
                <span className="flex-1">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-teal-500/10">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-xs font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-obsidian-100 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-obsidian-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full nav-link text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link to="/login" className="block w-full btn-primary text-center text-sm py-2.5">
              Sign In
            </Link>
            <Link to="/register" className="block w-full btn-ghost text-center text-sm py-2.5">
              Register
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}