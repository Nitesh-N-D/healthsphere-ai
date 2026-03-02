import { Activity, Heart, Flame, Moon, TrendingUp, Award, BookOpen, Footprints } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useHealth } from '../../context/HealthContext'
import Chart from '../../components/ui/Chart'
import Disclaimer from '../../components/Disclaimer'

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  unit?: string
  change?: string
  positive?: boolean
  color: string
}

function MetricCard({ icon, label, value, unit, change, positive, color }: MetricCardProps) {
  return (
    <div className={`glass-card p-5 transition-all duration-300 hover:border-teal-500/30 hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-xl ${color}`}>{icon}</div>
        {change && (
          <span className={`text-xs font-medium ${positive ? 'text-green-400' : 'text-rose-400'}`}>
            {positive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <p className="text-xs text-obsidian-500 mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-display font-bold text-white">{value}</span>
        {unit && <span className="text-xs text-obsidian-400">{unit}</span>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const { entries, latestEntry } = useHealth()

  const weightData = entries.map(e => ({ date: e.date.split('-').slice(1).join('/'), weight: e.weight, bmi: e.bmi }))
  const activityData = entries.map(e => ({ date: e.date.split('-').slice(1).join('/'), steps: e.steps, sleep: e.sleep }))

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-obsidian-400 text-sm mt-1">Here's your health overview for this week</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-sm text-teal-400 font-mono">
            Level {user?.level} · {user?.points} pts
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Activity size={18} className="text-teal-400" />}
          label="Current BMI"
          value={latestEntry?.bmi || '–'}
          change="0.2"
          positive={false}
          color="bg-teal-500/15"
        />
        <MetricCard
          icon={<Heart size={18} className="text-rose-400" />}
          label="Heart Rate"
          value={latestEntry?.heartRate || '–'}
          unit="bpm"
          change="2"
          positive={true}
          color="bg-rose-500/15"
        />
        <MetricCard
          icon={<Flame size={18} className="text-amber-400" />}
          label="Daily Calories"
          value={latestEntry?.calories?.toLocaleString() || '–'}
          unit="kcal"
          color="bg-amber-500/15"
        />
        <MetricCard
          icon={<Moon size={18} className="text-purple-400" />}
          label="Sleep"
          value={latestEntry?.sleep || '–'}
          unit="hrs"
          change="0.5 hrs"
          positive={true}
          color="bg-purple-500/15"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Footprints size={18} className="text-blue-400" />}
          label="Daily Steps"
          value={latestEntry?.steps?.toLocaleString() || '–'}
          change="1.2K"
          positive={true}
          color="bg-blue-500/15"
        />
        <MetricCard
          icon={<TrendingUp size={18} className="text-green-400" />}
          label="Weight"
          value={latestEntry?.weight || '–'}
          unit="kg"
          change="0.2 kg"
          positive={false}
          color="bg-green-500/15"
        />
        <MetricCard
          icon={<Award size={18} className="text-amber-400" />}
          label="Level"
          value={user?.level || 1}
          color="bg-amber-500/15"
        />
        <MetricCard
          icon={<BookOpen size={18} className="text-teal-400" />}
          label="Points"
          value={user?.points || 0}
          unit="pts"
          color="bg-teal-500/15"
        />
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-white mb-1">Weight & BMI Trend</h3>
          <p className="text-xs text-obsidian-500 mb-5">8-week tracking history</p>
          <Chart
            data={weightData}
            type="area"
            dataKeys={[
              { key: 'weight', color: '#2dd4bf', name: 'Weight (kg)' },
              { key: 'bmi', color: '#f59e0b', name: 'BMI' },
            ]}
            xKey="date"
            height={220}
          />
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-white mb-1">Activity & Sleep</h3>
          <p className="text-xs text-obsidian-500 mb-5">Steps (hundreds) and sleep hours</p>
          <Chart
            data={activityData.map(d => ({ ...d, steps: Math.round((d.steps || 0) / 100) }))}
            type="bar"
            dataKeys={[
              { key: 'steps', color: '#3b82f6', name: 'Steps (×100)' },
              { key: 'sleep', color: '#8b5cf6', name: 'Sleep (hrs)' },
            ]}
            xKey="date"
            height={220}
          />
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-white mb-4">Weekly Health Summary</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Avg. Daily Steps', value: '10,114', trend: '↑ 8% vs last week', positive: true },
            { label: 'Avg. Sleep', value: '7.6 hrs', trend: '↑ 0.3 hrs vs last week', positive: true },
            { label: 'Weight Change', value: '-0.7 kg', trend: 'Consistent decline', positive: true },
          ].map(item => (
            <div key={item.label} className="p-4 rounded-xl bg-obsidian-900/40 border border-teal-500/8">
              <p className="text-xs text-obsidian-500 mb-2">{item.label}</p>
              <p className="text-xl font-display font-bold text-white mb-1">{item.value}</p>
              <p className={`text-xs ${item.positive ? 'text-green-400' : 'text-rose-400'}`}>{item.trend}</p>
            </div>
          ))}
        </div>
      </div>

      <Disclaimer compact />
    </div>
  )
}
