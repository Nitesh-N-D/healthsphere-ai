import { AlertTriangle, ExternalLink, BookOpen, Shield } from 'lucide-react'
import { references } from '../../data/references'
import Disclaimer from '../../components/Disclaimer'
import Badge from '../../components/ui/Badge'

export default function DisclaimerPage() {
  const typeColors: Record<string, 'teal' | 'amber' | 'blue' | 'purple'> = {
    guideline: 'amber',
    report: 'teal',
    database: 'blue',
    tool: 'purple',
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/25">
            <AlertTriangle size={20} className="text-amber-400" />
          </div>
          <h1 className="section-header">Disclaimer & References</h1>
        </div>
        <p className="text-obsidian-400 ml-14">Legal information and authoritative source attribution for all content on this platform.</p>
      </div>

      <Disclaimer />

      {/* Platform Limitations */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={18} className="text-teal-400" />
          <h2 className="font-display font-semibold text-white">Platform Scope & Limitations</h2>
        </div>
        {[
          { title: 'Not a Medical Device', desc: 'HealthSphere AI is not a licensed medical device and is not intended for clinical use, diagnosis, treatment, cure, or prevention of any disease.' },
          { title: 'Educational Information Only', desc: 'All content, including disease information, risk scores, and AI responses, is provided strictly for educational and informational purposes.' },
          { title: 'No Doctor-Patient Relationship', desc: 'Use of this platform does not establish a doctor-patient or any other health care provider-patient relationship.' },
          { title: 'AI Limitations', desc: 'The AI Health Assistant provides general health information based on pre-defined responses. It cannot diagnose conditions, interpret test results, or provide personalized medical advice.' },
          { title: 'Data Accuracy', desc: 'While we source information from reputable organizations (WHO, CDC, NIH), health information can change. Always verify with current clinical guidelines.' },
        ].map(item => (
          <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-obsidian-900/40 border border-teal-500/8">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
            <div>
              <p className="text-sm font-medium text-obsidian-200 mb-1">{item.title}</p>
              <p className="text-sm text-obsidian-400 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* References */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={18} className="text-teal-400" />
          <h2 className="font-display font-semibold text-white">Authoritative References & Sources</h2>
        </div>
        <div className="grid gap-4">
          {references.map(ref => (
            <a
              key={ref.id}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl bg-obsidian-900/40 border border-teal-500/10 hover:border-teal-500/30 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center shrink-0">
                <ExternalLink size={14} className="text-teal-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-obsidian-200 group-hover:text-teal-300 transition-colors">{ref.title}</p>
                    <p className="text-xs text-obsidian-500 mt-0.5">{ref.organization}</p>
                  </div>
                  <Badge variant={typeColors[ref.type] || 'gray'}>{ref.type}</Badge>
                </div>
                <p className="text-xs text-obsidian-400 mt-2 leading-relaxed">{ref.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-obsidian-500 pb-4">
        <p>Last reviewed: January 2024 · HealthSphere AI · Not a medical device</p>
        <p className="mt-1">If you are experiencing a medical emergency, call 911 or your local emergency number immediately.</p>
      </div>
    </div>
  )
}
