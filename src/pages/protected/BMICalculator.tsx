import { useState } from 'react'
import { Calculator, Activity, Flame, Scale } from 'lucide-react'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import Disclaimer from '../../components/Disclaimer'

function getBMICategory(bmi: number): { label: string; color: string; desc: string } {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400', desc: 'Consider speaking with a healthcare provider about healthy weight gain strategies.' }
  if (bmi < 25) return { label: 'Normal Weight', color: 'text-green-400', desc: 'You are within the healthy weight range. Maintain through balanced diet and regular exercise.' }
  if (bmi < 30) return { label: 'Overweight', color: 'text-amber-400', desc: 'Modest weight loss through lifestyle changes may reduce health risks.' }
  return { label: 'Obese', color: 'text-rose-400', desc: 'Consult a healthcare provider. Weight management support is available and effective.' }
}

function getBMR(weight: number, height: number, age: number, gender: string): number {
  if (gender === 'male') return Math.round(10 * weight + 6.25 * height - 5 * age + 5)
  return Math.round(10 * weight + 6.25 * height - 5 * age - 161)
}

const activityMultipliers = [
  { label: 'Sedentary (desk job, little exercise)', value: 1.2 },
  { label: 'Lightly Active (1–3 days/week exercise)', value: 1.375 },
  { label: 'Moderately Active (3–5 days/week)', value: 1.55 },
  { label: 'Very Active (6–7 days/week)', value: 1.725 },
  { label: 'Extra Active (athlete / physical job)', value: 1.9 },
]

export default function BMICalculator() {
  const { updateProfile, user } = useAuth()
  const [form, setForm] = useState({
    weight: user?.weight?.toString() || '',
    height: user?.height?.toString() || '',
    age: user?.age?.toString() || '',
    gender: user?.gender || 'male',
    activity: 1.55,
  })
  const [results, setResults] = useState<{ bmi: number; bmr: number; tdee: number } | null>(null)

  const calculate = () => {
    const w = parseFloat(form.weight)
    const h = parseFloat(form.height)
    const a = parseInt(form.age)
    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) return
    const bmi = parseFloat((w / ((h / 100) ** 2)).toFixed(1))
    const bmr = getBMR(w, h, a, form.gender)
    const tdee = Math.round(bmr * form.activity)
    setResults({ bmi, bmr, tdee })
    updateProfile({ weight: w, height: h, age: a, gender: form.gender })
  }

  const category = results ? getBMICategory(results.bmi) : null

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/25">
            <Calculator size={20} className="text-blue-400" />
          </div>
          <h1 className="section-header">Health Calculators</h1>
        </div>
        <p className="text-obsidian-400 ml-14">BMI, BMR, and daily calorie needs. Based on validated clinical formulas (Mifflin-St Jeor).</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-display font-semibold text-white">Your Measurements</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-obsidian-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                min="20"
                max="300"
                placeholder="70"
                value={form.weight}
                onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-obsidian-300 mb-2">Height (cm)</label>
              <input
                type="number"
                min="100"
                max="250"
                placeholder="175"
                value={form.height}
                onChange={e => setForm(f => ({ ...f, height: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-obsidian-300 mb-2">Age (years)</label>
              <input
                type="number"
                min="1"
                max="120"
                placeholder="30"
                value={form.age}
                onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-obsidian-300 mb-2">Biological Sex</label>
              <select
                value={form.gender}
                onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                className="input-field appearance-none cursor-pointer"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-obsidian-300 mb-2">Activity Level</label>
            <select
              value={form.activity}
              onChange={e => setForm(f => ({ ...f, activity: parseFloat(e.target.value) }))}
              className="input-field appearance-none cursor-pointer"
            >
              {activityMultipliers.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <Button onClick={calculate} className="w-full">
            <Calculator size={16} />
            Calculate
          </Button>

          {/* BMI Reference Table */}
          <div className="pt-4 border-t border-teal-500/10">
            <p className="text-xs font-medium text-obsidian-400 mb-3">WHO BMI Classification:</p>
            <div className="space-y-2">
              {[
                { range: '< 18.5', label: 'Underweight', color: 'text-blue-400' },
                { range: '18.5–24.9', label: 'Normal Weight', color: 'text-green-400' },
                { range: '25–29.9', label: 'Overweight', color: 'text-amber-400' },
                { range: '≥ 30', label: 'Obese', color: 'text-rose-400' },
              ].map(row => (
                <div key={row.range} className="flex justify-between text-xs">
                  <span className="font-mono text-obsidian-400">{row.range}</span>
                  <span className={`font-medium ${row.color}`}>{row.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results ? (
            <>
              <div className="glass-card p-6 text-center">
                <div className="p-4 rounded-2xl bg-obsidian-900/50 border border-teal-500/10 mb-4">
                  <Scale size={28} className={`mx-auto mb-2 ${category?.color}`} />
                  <p className="text-5xl font-display font-black text-white mb-2">{results.bmi}</p>
                  <p className={`text-lg font-semibold ${category?.color}`}>{category?.label}</p>
                </div>
                <p className="text-sm text-obsidian-400 leading-relaxed">{category?.desc}</p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Activity size={18} className="text-teal-400" />
                  <h3 className="font-display font-semibold text-white">Basal Metabolic Rate</h3>
                </div>
                <p className="text-3xl font-display font-bold text-white">{results.bmr.toLocaleString()} <span className="text-sm text-obsidian-400">kcal/day</span></p>
                <p className="text-xs text-obsidian-500 mt-2">Calories burned at complete rest (Mifflin-St Jeor equation)</p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Flame size={18} className="text-amber-400" />
                  <h3 className="font-display font-semibold text-white">Daily Calorie Target</h3>
                </div>
                <p className="text-3xl font-display font-bold text-white">{results.tdee.toLocaleString()} <span className="text-sm text-obsidian-400">kcal/day</span></p>
                <p className="text-xs text-obsidian-500 mt-2">Total Daily Energy Expenditure at selected activity level</p>
                <div className="mt-4 pt-4 border-t border-teal-500/10 grid grid-cols-3 gap-3 text-xs text-center">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-blue-400 font-medium">{results.tdee - 500}</p>
                    <p className="text-obsidian-500 mt-1">Weight Loss</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-green-400 font-medium">{results.tdee}</p>
                    <p className="text-obsidian-500 mt-1">Maintenance</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-amber-400 font-medium">{results.tdee + 300}</p>
                    <p className="text-obsidian-500 mt-1">Muscle Gain</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card p-12 text-center text-obsidian-400">
              <Calculator size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-medium">Enter your measurements</p>
              <p className="text-sm mt-1 text-obsidian-500">Results will appear here</p>
            </div>
          )}
        </div>
      </div>

      <Disclaimer compact />
    </div>
  )
}
