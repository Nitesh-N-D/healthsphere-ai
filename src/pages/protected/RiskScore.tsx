import { useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import Button from '../../components/ui/Button'
import Disclaimer from '../../components/Disclaimer'

interface RiskFactor {
  id: string
  question: string
  category: string
  weight: number
  options: { label: string; value: number }[]
}

const riskFactors: RiskFactor[] = [
  {
    id: 'age',
    category: 'Demographics',
    question: 'What is your age range?',
    weight: 1,
    options: [
      { label: 'Under 35', value: 0 },
      { label: '35–44', value: 1 },
      { label: '45–54', value: 2 },
      { label: '55–64', value: 3 },
      { label: '65 or older', value: 4 },
    ],
  },
  {
    id: 'smoking',
    category: 'Lifestyle',
    question: 'What is your smoking status?',
    weight: 2,
    options: [
      { label: 'Never smoked', value: 0 },
      { label: 'Former smoker (quit > 5 years ago)', value: 1 },
      { label: 'Former smoker (quit < 5 years ago)', value: 2 },
      { label: 'Current smoker', value: 4 },
    ],
  },
  {
    id: 'bmi',
    category: 'Anthropometrics',
    question: 'What is your approximate BMI?',
    weight: 2,
    options: [
      { label: 'Normal (18.5–24.9)', value: 0 },
      { label: 'Underweight (< 18.5)', value: 1 },
      { label: 'Overweight (25–29.9)', value: 2 },
      { label: 'Obese (30–34.9)', value: 3 },
      { label: 'Severely obese (≥ 35)', value: 5 },
    ],
  },
  {
    id: 'activity',
    category: 'Lifestyle',
    question: 'How would you describe your physical activity level?',
    weight: 2,
    options: [
      { label: 'Very active (≥ 5 days/week vigorous exercise)', value: 0 },
      { label: 'Moderately active (3–4 days/week)', value: 1 },
      { label: 'Lightly active (1–2 days/week)', value: 2 },
      { label: 'Sedentary (little to no exercise)', value: 4 },
    ],
  },
  {
    id: 'bp',
    category: 'Cardiovascular',
    question: 'Have you been diagnosed with high blood pressure?',
    weight: 2,
    options: [
      { label: 'No, blood pressure is normal', value: 0 },
      { label: 'Pre-hypertension (130–139/80–89)', value: 2 },
      { label: 'Yes, controlled with medication', value: 3 },
      { label: 'Yes, uncontrolled', value: 5 },
    ],
  },
  {
    id: 'diabetes',
    category: 'Metabolic',
    question: 'Do you have diabetes or prediabetes?',
    weight: 2,
    options: [
      { label: 'No diabetes', value: 0 },
      { label: 'Prediabetes', value: 2 },
      { label: 'Type 2 Diabetes (controlled)', value: 3 },
      { label: 'Type 2 Diabetes (uncontrolled)', value: 5 },
    ],
  },
  {
    id: 'family',
    category: 'Family History',
    question: 'Family history of heart disease, diabetes, or cancer?',
    weight: 1,
    options: [
      { label: 'No significant family history', value: 0 },
      { label: 'One first-degree relative affected', value: 2 },
      { label: 'Two or more first-degree relatives', value: 4 },
    ],
  },
  {
    id: 'diet',
    category: 'Nutrition',
    question: 'How would you describe your diet?',
    weight: 1,
    options: [
      { label: 'Excellent (mostly whole foods, fruits, vegetables)', value: 0 },
      { label: 'Good (balanced, occasional processed foods)', value: 1 },
      { label: 'Average (regular processed/fast food)', value: 2 },
      { label: 'Poor (primarily processed foods, sugary beverages)', value: 4 },
    ],
  },
]

function getRiskLevel(score: number, maxScore: number) {
  const pct = (score / maxScore) * 100
  if (pct < 20) return { label: 'Low Risk', color: 'text-green-400', bg: 'bg-green-500', desc: 'Your lifestyle factors suggest relatively low health risk. Continue current healthy habits.', icon: CheckCircle }
  if (pct < 40) return { label: 'Moderate Risk', color: 'text-amber-400', bg: 'bg-amber-500', desc: 'Some risk factors present. Focus on modifiable factors like diet, exercise, and smoking.', icon: Info }
  if (pct < 60) return { label: 'Elevated Risk', color: 'text-orange-400', bg: 'bg-orange-500', desc: 'Multiple risk factors identified. Consider discussing lifestyle modifications with a healthcare provider.', icon: AlertTriangle }
  return { label: 'High Risk', color: 'text-rose-400', bg: 'bg-rose-500', desc: 'Significant risk factors present. We strongly recommend consulting a healthcare professional for comprehensive evaluation.', icon: AlertTriangle }
}

export default function RiskScore() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<{ score: number; max: number } | null>(null)

  const allAnswered = riskFactors.every(f => answers[f.id] !== undefined)
  const maxScore = riskFactors.reduce((s, f) => s + Math.max(...f.options.map(o => o.value)) * f.weight, 0)

  const calculate = () => {
    const score = riskFactors.reduce((s, f) => s + (answers[f.id] || 0) * f.weight, 0)
    setResult({ score, max: maxScore })
  }

  const risk = result ? getRiskLevel(result.score, result.max) : null
  const pct = result ? Math.round((result.score / result.max) * 100) : 0

  const categories = [...new Set(riskFactors.map(f => f.category))]

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/25">
            <Shield size={20} className="text-rose-400" />
          </div>
          <h1 className="section-header">Health Risk Score</h1>
        </div>
        <p className="text-obsidian-400 ml-14">Evidence-based risk stratification for common lifestyle-related conditions. Educational purposes only.</p>
      </div>

      <Disclaimer compact />

      {/* Result Banner */}
      {result && risk && (
        <div className={`glass-card p-6 border-2 ${risk.color.replace('text-', 'border-')}/30 animate-slide-up`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${risk.bg}/15 border ${risk.bg.replace('bg-', 'border-')}/30`}>
              <risk.icon size={24} className={risk.color} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-obsidian-500 mb-1">Overall Risk Assessment</p>
                  <p className={`text-2xl font-display font-bold ${risk.color}`}>{risk.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-display font-black text-white">{pct}<span className="text-lg text-obsidian-400">%</span></p>
                  <p className="text-xs text-obsidian-500">Risk Index</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-2 rounded-full bg-obsidian-800 overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full ${risk.bg} transition-all duration-1000`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-sm text-obsidian-300 leading-relaxed">{risk.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {categories.map(cat => (
          <div key={cat}>
            <p className="text-xs uppercase tracking-widest text-obsidian-500 mb-3 font-medium">{cat}</p>
            <div className="space-y-3">
              {riskFactors.filter(f => f.category === cat).map(factor => (
                <div key={factor.id} className="glass-card p-5">
                  <p className="text-sm font-medium text-obsidian-200 mb-4">{factor.question}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {factor.options.map(option => (
                      <button
                        key={option.label}
                        onClick={() => setAnswers(a => ({ ...a, [factor.id]: option.value }))}
                        className={`px-4 py-3 rounded-xl text-sm text-left transition-all duration-200 border ${answers[factor.id] === option.value
                          ? 'bg-teal-500/20 border-teal-500/50 text-teal-300'
                          : 'bg-obsidian-900/40 border-teal-500/10 text-obsidian-400 hover:border-teal-500/30 hover:text-obsidian-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={calculate}
        disabled={!allAnswered}
        size="lg"
        className="w-full"
      >
        <Shield size={18} />
        {allAnswered ? 'Calculate My Risk Score' : `Answer all questions to continue (${Object.keys(answers).length}/${riskFactors.length})`}
      </Button>

      <p className="text-xs text-obsidian-600 text-center">
        This assessment is for educational purposes only. It does not provide a medical diagnosis. Consult a healthcare professional for clinical risk evaluation.
      </p>
    </div>
  )
}
