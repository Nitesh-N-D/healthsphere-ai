import { useState } from 'react'
import { LineChart as LineChartIcon, BarChart2, Activity, TrendingDown } from 'lucide-react'
import { useHealth } from '../../context/HealthContext'
import Chart from '../../components/ui/Chart'
import Disclaimer from '../../components/Disclaimer'

type Tab = 'weight' | 'activity' | 'vitals' | 'caloric'

export default function HealthCharts() {
  const { entries } = useHealth()
  const [tab, setTab] = useState<Tab>('weight')

  const labels = entries.map(e => {
    const [, m, d] = e.date.split('-')
    return `${m}/${d}`
  })

  const weightData = entries.map((e, i) => ({ date: labels[i], weight: e.weight, bmi: e.bmi }))
  const activityData = entries.map((e, i) => ({ date: labels[i], steps: e.steps, sleep: e.sleep }))
  const vitalsData = entries.map((e, i) => ({ date: labels[i], heartRate: e.heartRate }))
  const caloricData = entries.map((e, i) => ({ date: labels[i], calories: e.calories }))

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'weight', label: 'Weight & BMI', icon: <TrendingDown size={15} /> },
    { id: 'activity', label: 'Activity & Sleep', icon: <Activity size={15} /> },
    { id: 'vitals', label: 'Heart Rate', icon: <LineChartIcon size={15} /> },
    { id: 'caloric', label: 'Caloric Intake', icon: <BarChart2 size={15} /> },
  ]

  const chartConfig: Record<Tab, { data: any[]; keys: any[]; type: any; title: string; desc: string }> = {
    weight: {
      data: weightData,
      keys: [
        { key: 'weight', color: '#2dd4bf', name: 'Weight (kg)' },
        { key: 'bmi', color: '#f59e0b', name: 'BMI' },
      ],
      type: 'area',
      title: 'Weight & BMI Progression',
      desc: 'Track your weight and BMI over time. A sustained downward trend indicates progress.',
    },
    activity: {
      data: activityData.map(d => ({ ...d, steps: d.steps ? Math.round(d.steps / 100) : 0 })),
      keys: [
        { key: 'steps', color: '#3b82f6', name: 'Steps (×100)' },
        { key: 'sleep', color: '#8b5cf6', name: 'Sleep (hrs)' },
      ],
      type: 'bar',
      title: 'Activity & Sleep Patterns',
      desc: 'Daily step count (in hundreds) and sleep duration. WHO recommends 10,000+ steps and 7-9 hours of sleep.',
    },
    vitals: {
      data: vitalsData,
      keys: [{ key: 'heartRate', color: '#ef4444', name: 'Heart Rate (bpm)' }],
      type: 'line',
      title: 'Resting Heart Rate',
      desc: 'Normal resting heart rate: 60–100 bpm. Athletic individuals may be lower (40–60 bpm).',
    },
    caloric: {
      data: caloricData,
      keys: [{ key: 'calories', color: '#f97316', name: 'Calories (kcal)' }],
      type: 'area',
      title: 'Daily Caloric Intake',
      desc: 'Average adult needs 1,600–3,000 kcal/day depending on sex, age, weight, and activity level.',
    },
  }

  const config = chartConfig[tab]

  // Stats
  const avgWeight = (entries.reduce((s, e) => s + (e.weight || 0), 0) / entries.length).toFixed(1)
  const avgSteps = Math.round(entries.reduce((s, e) => s + (e.steps || 0), 0) / entries.length)
  const avgSleep = (entries.reduce((s, e) => s + (e.sleep || 0), 0) / entries.length).toFixed(1)
  const avgHR = Math.round(entries.reduce((s, e) => s + (e.heartRate || 0), 0) / entries.length)

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-teal-500/15 border border-teal-500/25">
            <LineChartIcon size={20} className="text-teal-400" />
          </div>
          <h1 className="section-header">Health Charts</h1>
        </div>
        <p className="text-obsidian-400 ml-14">Visualize your 8-week health data trends. Demo data shown for illustration.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Weight', value: `${avgWeight} kg`, color: 'text-teal-400' },
          { label: 'Avg Steps/day', value: avgSteps.toLocaleString(), color: 'text-blue-400' },
          { label: 'Avg Sleep', value: `${avgSleep} hrs`, color: 'text-purple-400' },
          { label: 'Avg Heart Rate', value: `${avgHR} bpm`, color: 'text-rose-400' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 text-center">
            <p className="text-xs text-obsidian-500 mb-1">{s.label}</p>
            <p className={`text-xl font-display font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-obsidian-600 mt-1">8-week avg</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${tab === t.id
              ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
              : 'text-obsidian-400 border border-teal-500/10 hover:bg-teal-500/10 hover:text-teal-400'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-white mb-1">{config.title}</h2>
        <p className="text-xs text-obsidian-500 mb-6">{config.desc}</p>
        <Chart
          data={config.data}
          type={config.type}
          dataKeys={config.keys}
          xKey="date"
          height={320}
        />
      </div>

      {/* Reference ranges */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-white mb-4">Clinical Reference Ranges</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { metric: 'BMI', normal: '18.5–24.9', source: 'WHO' },
            { metric: 'Resting Heart Rate', normal: '60–100 bpm', source: 'AHA' },
            { metric: 'Daily Steps', normal: '7,000–10,000+', source: 'CDC' },
            { metric: 'Sleep Duration (adults)', normal: '7–9 hours', source: 'NSF' },
            { metric: 'Daily Caloric Intake (women)', normal: '1,600–2,400 kcal', source: 'USDA' },
            { metric: 'Daily Caloric Intake (men)', normal: '2,000–3,000 kcal', source: 'USDA' },
          ].map(r => (
            <div key={r.metric} className="flex items-center justify-between p-3 rounded-xl bg-obsidian-900/40 border border-teal-500/8 text-sm">
              <span className="text-obsidian-300">{r.metric}</span>
              <div className="text-right">
                <span className="text-teal-400 font-medium">{r.normal}</span>
                <span className="text-obsidian-500 text-xs ml-2">({r.source})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Disclaimer compact />
    </div>
  )
}
