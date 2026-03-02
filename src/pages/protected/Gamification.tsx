import { useState } from 'react'
import { Trophy, Star, Zap, Target, BookOpen, Shield, Calculator, Brain, Lock, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'

interface Badge {
  id: string
  name: string
  desc: string
  icon: React.ReactNode
  points: number
  condition: string
  earned: boolean
  color: string
}

interface Challenge {
  id: string
  title: string
  desc: string
  points: number
  icon: React.ReactNode
  completed: boolean
}

export default function Gamification() {
  const { user, updateProfile } = useAuth()
  const [claimed, setClaimed] = useState<string[]>([])

  const badges: Badge[] = [
    { id: 'newcomer', name: 'New Explorer', desc: 'Created your account', icon: <Star size={20} />, points: 10, condition: 'Sign up', earned: true, color: 'teal' },
    { id: 'first-calc', name: 'Number Cruncher', desc: 'Used the BMI calculator', icon: <Calculator size={20} />, points: 25, condition: 'Use any calculator', earned: user?.weight !== undefined, color: 'blue' },
    { id: 'ai-chat', name: 'AI Curious', desc: 'Had a conversation with AI Assistant', icon: <Brain size={20} />, points: 20, condition: 'Ask the AI assistant', earned: false, color: 'purple' },
    { id: 'encyclopedia', name: 'Medical Scholar', desc: 'Read 3 disease articles', icon: <BookOpen size={20} />, points: 30, condition: 'Read 3 disease articles', earned: false, color: 'amber' },
    { id: 'risk-score', name: 'Health Strategist', desc: 'Completed the risk assessment', icon: <Shield size={20} />, points: 50, condition: 'Complete risk score', earned: false, color: 'rose' },
    { id: 'streak-7', name: '7-Day Streak', desc: 'Logged in 7 days in a row', icon: <Zap size={20} />, points: 75, condition: 'Use the app 7 days in a row', earned: false, color: 'amber' },
    { id: 'complete', name: 'Health Champion', desc: 'Completed all sections', icon: <Trophy size={20} />, points: 200, condition: 'Complete all platform features', earned: false, color: 'teal' },
  ]

  const challenges: Challenge[] = [
    { id: 'c1', title: 'Learn About Diabetes', desc: 'Read the Type 2 Diabetes article in the encyclopedia', points: 15, icon: <BookOpen size={16} />, completed: false },
    { id: 'c2', title: 'Calculate Your BMI', desc: 'Use the BMI calculator and see your results', points: 20, icon: <Calculator size={16} />, completed: user?.weight !== undefined },
    { id: 'c3', title: 'Ask the AI 3 Questions', desc: 'Have a health conversation with the AI assistant', points: 25, icon: <Brain size={16} />, completed: false },
    { id: 'c4', title: 'Complete Risk Assessment', desc: 'Answer all questions in the Risk Score section', points: 50, icon: <Shield size={16} />, completed: false },
    { id: 'c5', title: 'Read a Pandemic Overview', desc: 'Explore the pandemic analytics page', points: 15, icon: <Target size={16} />, completed: false },
  ]

  const earnedBadges = badges.filter(b => b.earned || user?.badges?.includes(b.id))
  const xpToNextLevel = (user?.level || 1) * 100
  const currentXP = (user?.points || 0) % 100
  const xpPct = (currentXP / xpToNextLevel) * 100

  const colorMap: Record<string, string> = {
    teal: 'bg-teal-500/15 border-teal-500/30 text-teal-400',
    blue: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
    purple: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
    amber: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    rose: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
  }

  const claimChallenge = (challenge: Challenge) => {
    if (claimed.includes(challenge.id) || challenge.completed) return
    setClaimed(prev => [...prev, challenge.id])
    updateProfile({ points: (user?.points || 0) + challenge.points, level: Math.floor(((user?.points || 0) + challenge.points) / 100) + 1 })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/25">
            <Trophy size={20} className="text-amber-400" />
          </div>
          <h1 className="section-header">Achievements & Progress</h1>
        </div>
        <p className="text-obsidian-400 ml-14">Earn points and unlock badges as you explore and learn about health.</p>
      </div>

      {/* Level & XP */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl font-display font-black text-white shadow-lg shadow-amber-500/30">
              {user?.level || 1}
            </div>
            <div>
              <p className="text-xs text-obsidian-500 mb-0.5">Current Level</p>
              <p className="text-2xl font-display font-bold text-white">Level {user?.level || 1}</p>
              <p className="text-sm text-obsidian-400">{user?.points || 0} total points earned</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-obsidian-500 mb-1">Next level in</p>
            <p className="text-xl font-display font-bold text-amber-400">{xpToNextLevel - currentXP} pts</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-obsidian-500 mb-2">
            <span>Progress to Level {(user?.level || 1) + 1}</span>
            <span>{currentXP} / {xpToNextLevel} XP</span>
          </div>
          <div className="h-3 rounded-full bg-obsidian-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-1000"
              style={{ width: `${Math.min(xpPct, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <Target size={18} className="text-teal-400" />
          <h2 className="font-display font-semibold text-white">Daily Challenges</h2>
          <span className="ml-auto text-xs text-obsidian-500">{challenges.filter(c => c.completed || claimed.includes(c.id)).length}/{challenges.length} completed</span>
        </div>
        <div className="space-y-3">
          {challenges.map(ch => {
            const done = ch.completed || claimed.includes(ch.id)
            return (
              <div key={ch.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${done ? 'bg-teal-500/5 border-teal-500/20 opacity-70' : 'bg-obsidian-900/40 border-teal-500/8 hover:border-teal-500/25'}`}>
                <div className={`p-2 rounded-lg ${done ? 'bg-teal-500/20' : 'bg-obsidian-800/50'}`}>
                  <span className={done ? 'text-teal-400' : 'text-obsidian-500'}>{ch.icon}</span>
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${done ? 'text-teal-300 line-through opacity-70' : 'text-obsidian-200'}`}>{ch.title}</p>
                  <p className="text-xs text-obsidian-500 mt-0.5">{ch.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400">+{ch.points} pts</span>
                  {done ? (
                    <CheckCircle size={18} className="text-teal-400" />
                  ) : (
                    <Button size="sm" onClick={() => claimChallenge(ch)} variant="outline">
                      Claim
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="font-display font-semibold text-white mb-4">Badges Collection</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map(badge => {
            const earned = badge.earned || user?.badges?.includes(badge.id)
            return (
              <div
                key={badge.id}
                className={`glass-card p-5 text-center transition-all duration-300 ${earned ? 'hover:border-teal-500/40 hover:-translate-y-1' : 'opacity-50 grayscale'}`}
              >
                <div className={`w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center border ${earned ? colorMap[badge.color] : 'bg-obsidian-800/50 border-obsidian-700/50 text-obsidian-600'}`}>
                  {earned ? badge.icon : <Lock size={16} />}
                </div>
                <p className={`text-sm font-semibold mb-1 ${earned ? 'text-white' : 'text-obsidian-500'}`}>{badge.name}</p>
                <p className="text-xs text-obsidian-500 mb-2">{badge.desc}</p>
                <span className={`text-xs font-mono ${earned ? 'text-amber-400' : 'text-obsidian-600'}`}>
                  {earned ? `+${badge.points} pts ✓` : badge.condition}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
