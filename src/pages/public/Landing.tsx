import { Link } from 'react-router-dom'
import {
  Activity, BookOpen, Brain, Shield, BarChart2, Trophy,
  Globe, ArrowRight, Star, ChevronRight, Zap, Heart, Users
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const features = [
  {
    icon: BookOpen,
    title: 'Disease Encyclopedia',
    desc: 'Comprehensive medical database with 8+ diseases covering symptoms, causes, prevention, and WHO/CDC citations.',
    badge: 'Public',
    to: '/encyclopedia',
    color: 'teal',
  },
  {
    icon: Globe,
    title: 'Pandemic Analytics',
    desc: 'Interactive visualizations and timelines of major historical pandemics with global impact data.',
    badge: 'Public',
    to: '/pandemic',
    color: 'blue',
  },
  {
    icon: Brain,
    title: 'AI Health Assistant',
    desc: 'Intelligent health Q&A powered by curated medical knowledge. Ask anything, get evidence-based answers.',
    badge: 'Premium',
    to: '/assistant',
    color: 'purple',
  },
  {
    icon: BarChart2,
    title: 'Health Dashboard',
    desc: 'Track your wellness metrics, visualize BMI trends, and monitor weekly health progress.',
    badge: 'Premium',
    to: '/dashboard',
    color: 'amber',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    desc: 'Science-based health risk scoring for cardiovascular, metabolic, and lifestyle risk factors.',
    badge: 'Premium',
    to: '/risk-score',
    color: 'rose',
  },
  {
    icon: Trophy,
    title: 'Gamification',
    desc: 'Earn points, unlock badges, and level up as you build healthier habits and engage with content.',
    badge: 'Premium',
    to: '/gamification',
    color: 'green',
  },
]

const stats = [
  { icon: BookOpen, label: 'Diseases Catalogued', value: '8+' },
  { icon: Globe, label: 'Pandemics Tracked', value: '5' },
  { icon: Users, label: 'Health Metrics', value: '12+' },
  { icon: Heart, label: 'Sources (WHO/CDC)', value: '20+' },
]

const colorMap: Record<string, string> = {
  teal: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
  blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  rose: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  green: 'text-green-400 bg-green-400/10 border-green-400/20',
}

export default function Landing() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen noise-bg relative">
      {/* Background orbs */}
      <div className="orb orb-teal w-96 h-96 top-0 right-0 -translate-y-1/2 translate-x-1/4" />
      <div className="orb orb-blue w-80 h-80 bottom-1/3 left-0 -translate-x-1/2" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-teal-500/10"
        style={{ background: 'rgba(10, 25, 41, 0.7)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-white">HealthSphere</span>
            <span className="text-teal-400 ml-1 text-xs font-mono">AI</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/encyclopedia" className="text-sm text-obsidian-300 hover:text-teal-400 transition-colors">Encyclopedia</Link>
          <Link to="/pandemic" className="text-sm text-obsidian-300 hover:text-teal-400 transition-colors">Pandemics</Link>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary text-sm py-2">Dashboard →</Link>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm py-2">Sign In</Link>
              <Link to="/register" className="btn-primary text-sm py-2">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 pt-28 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-medium mb-8 animate-fade-in">
          <Zap size={12} />
          Intelligent Health Education Platform
        </div>

        <h1 className="text-6xl md:text-7xl font-display font-black text-white mb-6 leading-tight animate-slide-up">
          Know Your Health.
          <br />
          <span className="gradient-text">Before It's Urgent.</span>
        </h1>

        <p className="text-obsidian-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in stagger-2">
          Evidence-based health education, AI-powered insights, and personalized wellness tracking — all in one platform. Powered by WHO & CDC data.
        </p>

        <div className="flex items-center justify-center gap-4 animate-fade-in stagger-3">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary text-base py-4 px-8 shadow-2xl shadow-teal-500/30">
              Open Dashboard <ArrowRight size={18} />
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary text-base py-4 px-8 shadow-2xl shadow-teal-500/30">
                Start Free <ArrowRight size={18} />
              </Link>
              <Link to="/encyclopedia" className="btn-ghost text-base py-4 px-8">
                Explore Diseases
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value }, i) => (
            <div key={label} className={`glass-card p-5 text-center animate-slide-up stagger-${i + 1}`}>
              <Icon size={20} className="text-teal-400 mx-auto mb-2" />
              <p className="text-2xl font-display font-bold text-white">{value}</p>
              <p className="text-xs text-obsidian-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-obsidian-300 text-lg max-w-xl mx-auto">From disease encyclopedias to personalized risk assessments. Built on peer-reviewed science.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, badge, to, color }, i) => (
            <Link
              key={to}
              to={to}
              className={`glass-card p-6 group transition-all duration-300 hover:border-teal-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 animate-slide-up stagger-${i + 1}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl border ${colorMap[color]}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full border ${badge === 'Premium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/25' : 'bg-teal-500/10 text-teal-400 border-teal-500/25'}`}>
                  {badge}
                </span>
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-obsidian-400 leading-relaxed">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ChevronRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section className="relative z-10 max-w-3xl mx-auto px-8 pb-24 text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="orb orb-teal w-64 h-64 absolute -top-16 -right-16 opacity-50" />
            <Star size={32} className="text-teal-400 mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold text-white mb-4">Take Control of Your Health</h2>
            <p className="text-obsidian-300 mb-8 max-w-md mx-auto">Join thousands using HealthSphere AI to understand, monitor, and improve their wellbeing with trusted medical data.</p>
            <Link to="/register" className="btn-primary text-base py-4 px-10 shadow-2xl shadow-teal-500/30">
              Create Free Account <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-teal-500/10 px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-obsidian-500">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-teal-500" />
            <span>HealthSphere AI — Educational purposes only</span>
          </div>
          <div className="flex gap-6">
            <Link to="/disclaimer" className="hover:text-teal-400 transition-colors">Disclaimer</Link>
            <Link to="/encyclopedia" className="hover:text-teal-400 transition-colors">Encyclopedia</Link>
            <Link to="/pandemic" className="hover:text-teal-400 transition-colors">Pandemics</Link>
          </div>
          <p>© 2024 HealthSphere AI. Not a medical device.</p>
        </div>
      </footer>
    </div>
  )
}
