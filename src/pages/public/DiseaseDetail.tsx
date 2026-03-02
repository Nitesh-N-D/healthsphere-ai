import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, AlertTriangle, CheckCircle, XCircle, User,
  BookOpen, ExternalLink, Thermometer, ShieldCheck, Stethoscope
} from 'lucide-react'
import { diseases } from '../../data/diseases'
import { SeverityBadge } from '../../components/ui/Badge'
import Badge from '../../components/ui/Badge'
import Disclaimer from '../../components/Disclaimer'

interface SectionProps {
  title: string
  icon: React.ReactNode
  items: string[]
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

function Section({ title, icon, items, variant = 'default' }: SectionProps) {
  const dotColors = {
    default: 'bg-teal-400',
    success: 'bg-green-400',
    warning: 'bg-amber-400',
    danger: 'bg-rose-400',
  }
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2 rounded-lg ${variant === 'danger' ? 'bg-rose-500/15' : variant === 'warning' ? 'bg-amber-500/15' : variant === 'success' ? 'bg-green-500/15' : 'bg-teal-500/15'}`}>
          {icon}
        </div>
        <h3 className="font-display font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-obsidian-300 leading-relaxed">
            <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function DiseaseDetail() {
  const { id } = useParams<{ id: string }>()
  const disease = diseases.find(d => d.id === id)

  if (!disease) {
    return (
      <div className="max-w-3xl mx-auto text-center py-32">
        <p className="text-obsidian-400 text-xl">Disease not found.</p>
        <Link to="/encyclopedia" className="btn-ghost mt-6 inline-flex">← Back to Encyclopedia</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Back */}
      <Link to="/encyclopedia" className="inline-flex items-center gap-2 text-sm text-obsidian-400 hover:text-teal-400 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Encyclopedia
      </Link>

      {/* Header */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="orb orb-teal w-64 h-64 absolute -top-16 -right-16 opacity-30" />
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <SeverityBadge severity={disease.severity} />
                <Badge variant="gray">{disease.category}</Badge>
                <span className="font-mono text-xs text-obsidian-500 bg-obsidian-800/50 px-2 py-0.5 rounded">{disease.icd10}</span>
              </div>
              <h1 className="text-4xl font-display font-black text-white mb-3">{disease.name}</h1>
              <p className="text-obsidian-400 text-sm">
                <span className="text-obsidian-300 font-medium">Global Prevalence:</span> {disease.prevalence}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {disease.tags.map(t => <Badge key={t} variant="teal">{t}</Badge>)}
          </div>
          <div className="p-5 rounded-xl bg-obsidian-900/50 border border-teal-500/10">
            <h3 className="text-xs uppercase tracking-widest text-obsidian-500 mb-3 flex items-center gap-2">
              <BookOpen size={12} /> Overview
            </h3>
            <p className="text-obsidian-300 leading-relaxed text-sm">{disease.overview}</p>
          </div>
        </div>
      </div>

      {/* Medical Info Sections */}
      <div className="grid md:grid-cols-2 gap-5">
        <Section
          title="Causes & Etiology"
          icon={<XCircle size={18} className="text-rose-400" />}
          items={disease.causes}
          variant="danger"
        />
        <Section
          title="Signs & Symptoms"
          icon={<Thermometer size={18} className="text-amber-400" />}
          items={disease.symptoms}
          variant="warning"
        />
        <Section
          title="Risk Factors"
          icon={<AlertTriangle size={18} className="text-amber-400" />}
          items={disease.riskFactors}
          variant="warning"
        />
        <Section
          title="Prevention Strategies"
          icon={<ShieldCheck size={18} className="text-green-400" />}
          items={disease.prevention}
          variant="success"
        />
      </div>

      {/* When to See Doctor */}
      <div className="glass-card p-6 border-rose-500/25">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-rose-500/15">
            <Stethoscope size={18} className="text-rose-400" />
          </div>
          <h3 className="font-display font-semibold text-white">When to See a Doctor</h3>
          <span className="px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/25">Important</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {disease.whenToSeeDoctor.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-rose-500/5 border border-rose-500/15 text-sm text-obsidian-300">
              <AlertTriangle size={14} className="text-rose-400 mt-0.5 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
          <ExternalLink size={16} className="text-teal-400" />
          Authoritative Sources & Citations
        </h3>
        <div className="space-y-3">
          {disease.sources.map((source, i) => (
            <a
              key={i}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-obsidian-900/50 border border-teal-500/10 hover:border-teal-500/30 transition-colors group"
            >
              <div className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
              <span className="text-sm text-obsidian-300 group-hover:text-teal-300 transition-colors flex-1">{source.name}</span>
              <ExternalLink size={12} className="text-obsidian-500 group-hover:text-teal-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      <Disclaimer />
    </div>
  )
}
