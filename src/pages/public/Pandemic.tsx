import { useState } from 'react'
import { Globe, Users, Skull, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { pandemics, pandemicTimeline } from '../../data/pandemics'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Chart from '../../components/ui/Chart'
import Disclaimer from '../../components/Disclaimer'

export default function Pandemic() {
  const [expanded, setExpanded] = useState<string | null>('covid19')

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/25">
            <Globe size={20} className="text-rose-400" />
          </div>
          <h1 className="section-header">Pandemic Analytics</h1>
        </div>
        <p className="text-obsidian-400 ml-14">Historical pandemic data visualized. Sources: WHO, CDC, historical archives.</p>
      </div>

      {/* Timeline Chart */}
      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-white mb-1">Historical Death Toll Comparison</h2>
        <p className="text-xs text-obsidian-500 mb-6">Estimated deaths in millions (official/conservative estimates)</p>
        <Chart
          data={pandemicTimeline}
          type="bar"
          dataKeys={[{ key: 'deaths', color: '#ef4444', name: 'Deaths (millions)' }]}
          xKey="name"
          height={280}
        />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 text-center">
          <Globe size={20} className="text-rose-400 mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-white">{pandemics.length}</p>
          <p className="text-xs text-obsidian-400 mt-1">Major Pandemics</p>
        </div>
        <div className="glass-card p-5 text-center">
          <Skull size={20} className="text-rose-400 mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-white">178M+</p>
          <p className="text-xs text-obsidian-400 mt-1">Total Deaths (Est.)</p>
        </div>
        <div className="glass-card p-5 text-center">
          <Users size={20} className="text-amber-400 mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-white">1B+</p>
          <p className="text-xs text-obsidian-400 mt-1">People Infected</p>
        </div>
        <div className="glass-card p-5 text-center">
          <Calendar size={20} className="text-teal-400 mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-white">700+</p>
          <p className="text-xs text-obsidian-400 mt-1">Years of History</p>
        </div>
      </div>

      {/* Pandemic Cards */}
      <div className="space-y-4">
        <h2 className="font-display font-semibold text-white text-xl">Major Pandemics in Detail</h2>
        {pandemics.map(pandemic => {
          const isOpen = expanded === pandemic.id
          return (
            <div key={pandemic.id} className="glass-card overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpanded(isOpen ? null : pandemic.id)}
                className="w-full p-6 flex items-start gap-5 text-left hover:bg-teal-500/3 transition-colors"
              >
                <div
                  className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: pandemic.color, boxShadow: `0 0 10px ${pandemic.color}60` }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-white">{pandemic.name}</h3>
                        <Badge variant="gray">{pandemic.pathogen}</Badge>
                      </div>
                      <p className="text-xs text-obsidian-400">
                        {pandemic.startYear}{pandemic.endYear ? `–${pandemic.endYear}` : '–present'} · {pandemic.origin}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-xs text-obsidian-500">Deaths</p>
                        <p className="text-sm font-medium text-rose-400">{pandemic.deaths}</p>
                      </div>
                      {isOpen ? <ChevronUp size={16} className="text-obsidian-400" /> : <ChevronDown size={16} className="text-obsidian-400" />}
                    </div>
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 border-t border-teal-500/10 pt-5 animate-fade-in">
                  <div className="grid md:grid-cols-3 gap-4 mb-5">
                    <div className="p-4 rounded-xl bg-obsidian-900/50 border border-teal-500/10">
                      <p className="text-[10px] uppercase tracking-widest text-obsidian-500 mb-1">Infected</p>
                      <p className="text-sm font-medium text-obsidian-200">{pandemic.infected}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900/50 border border-teal-500/10">
                      <p className="text-[10px] uppercase tracking-widest text-obsidian-500 mb-1">Deaths</p>
                      <p className="text-sm font-medium text-rose-300">{pandemic.deaths}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-obsidian-900/50 border border-teal-500/10">
                      <p className="text-[10px] uppercase tracking-widest text-obsidian-500 mb-1">Origin</p>
                      <p className="text-sm font-medium text-obsidian-200">{pandemic.origin}</p>
                    </div>
                  </div>

                  <p className="text-sm text-obsidian-300 leading-relaxed mb-5">{pandemic.description}</p>

                  <div className="mb-5">
                    <h4 className="text-xs uppercase tracking-widest text-obsidian-500 mb-3">Global Impact</h4>
                    <p className="text-sm text-obsidian-300 leading-relaxed p-4 rounded-xl bg-teal-500/5 border border-teal-500/10">
                      {pandemic.globalImpact}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-obsidian-500 mb-3">Key Milestones</h4>
                    <div className="space-y-2">
                      {pandemic.keyMilestones.map((m, i) => (
                        <div key={i} className="flex items-start gap-4 text-sm">
                          <span className="font-mono text-teal-400 shrink-0 w-12">{m.year}</span>
                          <span className="text-obsidian-300">{m.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Disclaimer />
    </div>
  )
}
