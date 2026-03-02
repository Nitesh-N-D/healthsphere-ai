import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, BookOpen, Filter } from 'lucide-react'
import { diseases, diseaseCategories } from '../../data/diseases'
import { SeverityBadge } from '../../components/ui/Badge'
import Badge from '../../components/ui/Badge'

export default function Encyclopedia() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return diseases.filter(d => {
      const matchesQuery =
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.tags.some(t => t.includes(query.toLowerCase())) ||
        d.overview.toLowerCase().includes(query.toLowerCase())
      const matchesCat = category === 'All' || d.category === category
      return matchesQuery && matchesCat
    })
  }, [query, category])

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-teal-500/15 border border-teal-500/25">
            <BookOpen size={20} className="text-teal-400" />
          </div>
          <h1 className="section-header">Disease Encyclopedia</h1>
        </div>
        <p className="text-obsidian-400 ml-14">Comprehensive medical information sourced from WHO & CDC. Free for all users.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian-500" />
          <input
            type="text"
            placeholder="Search diseases, symptoms, tags..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-500" />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input-field pl-9 pr-8 appearance-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            {diseaseCategories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-obsidian-400">
        Showing <span className="text-teal-400 font-medium">{filtered.length}</span> of {diseases.length} conditions
      </p>

      {/* Disease Grid */}
      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="glass-card p-16 text-center text-obsidian-400">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p>No diseases match your search.</p>
          </div>
        ) : (
          filtered.map((disease, i) => (
            <Link
              key={disease.id}
              to={`/encyclopedia/${disease.id}`}
              className={`glass-card p-6 group hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-500/8 transition-all duration-300 hover:-translate-y-0.5 animate-slide-up stagger-${Math.min(i + 1, 6)}`}
            >
              <div className="flex items-start gap-5">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-display font-semibold text-white text-lg group-hover:text-teal-300 transition-colors">
                          {disease.name}
                        </h2>
                        <span className="font-mono text-[10px] text-obsidian-500 bg-obsidian-800/50 px-2 py-0.5 rounded">{disease.icd10}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="gray">{disease.category}</Badge>
                        <SeverityBadge severity={disease.severity} />
                        {disease.tags.map(t => (
                          <Badge key={t} variant="teal" className="opacity-60">{t}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-obsidian-500 mb-1">Global Prevalence</p>
                      <p className="text-xs font-medium text-obsidian-300">{disease.prevalence}</p>
                    </div>
                  </div>
                  <p className="text-sm text-obsidian-400 line-clamp-2 leading-relaxed">{disease.overview}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-obsidian-500">
                    <span>{disease.symptoms.length} symptoms</span>
                    <span>·</span>
                    <span>{disease.causes.length} causes</span>
                    <span>·</span>
                    <span>{disease.sources.length} sources</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-obsidian-500 group-hover:text-teal-400 transition-colors mt-2 shrink-0" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
