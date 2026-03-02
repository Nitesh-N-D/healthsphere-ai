import { useState, useRef, useEffect, FormEvent } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import Disclaimer from '../../components/Disclaimer'

interface Message {
  id: string
  role: 'user' | 'ai'
  text: string
  timestamp: Date
}

const QUICK_QUESTIONS = [
  'What are the symptoms of Type 2 Diabetes?',
  'How can I lower my blood pressure naturally?',
  'What is a healthy BMI range?',
  'How many hours of sleep do adults need?',
  'What foods should I avoid for heart health?',
  'How can I improve my immune system?',
]

const AI_RESPONSES: Record<string, string> = {
  default: "I'm HealthSphere AI, your educational health assistant. I can share general health information from trusted sources like WHO and CDC, but I'm not a substitute for professional medical advice. Please consult a qualified healthcare provider for personal health concerns.",
  diabetes: "**Type 2 Diabetes** is characterized by insulin resistance and impaired insulin secretion.\n\n**Common symptoms include:**\n• Increased thirst and frequent urination\n• Unexplained fatigue and blurred vision\n• Slow-healing wounds\n• Frequent infections\n\nFasting blood glucose ≥ 126 mg/dL on two separate tests or HbA1c ≥ 6.5% may indicate diabetes. Please see your doctor for proper testing and diagnosis.\n\n*Source: American Diabetes Association Standards of Care 2024*",
  blood_pressure: "**Natural approaches to support blood pressure management:**\n\n• **DASH Diet**: Rich in fruits, vegetables, and low-fat dairy\n• **Sodium reduction**: Aim for < 2,300 mg/day\n• **Regular exercise**: 150 minutes moderate aerobic activity/week\n• **Weight management**: Even 5 kg loss can significantly reduce BP\n• **Limit alcohol**: ≤ 1 drink/day for women, ≤ 2 for men\n• **Stress management**: Meditation, deep breathing, yoga\n\nNote: These are lifestyle supports. Always follow your doctor's prescribed treatment plan.\n\n*Source: WHO Hypertension Guidelines, American Heart Association*",
  bmi: "**BMI Classification (WHO Standard):**\n\n• **Underweight**: BMI < 18.5\n• **Normal weight**: BMI 18.5–24.9 ✓\n• **Overweight**: BMI 25–29.9\n• **Obese Class I**: BMI 30–34.9\n• **Obese Class II**: BMI 35–39.9\n• **Obese Class III**: BMI ≥ 40\n\nBMI is a screening tool, not a diagnostic tool. It doesn't account for muscle mass, age, sex, or ethnicity. Use our BMI Calculator tab for your personal calculation.\n\n*Source: WHO BMI Classification, NIH*",
  sleep: "**Adult sleep recommendations (National Sleep Foundation):**\n\n• **Ages 18–64**: 7–9 hours per night\n• **Ages 65+**: 7–8 hours per night\n\n**Signs of poor sleep health:**\n• Difficulty concentrating or making decisions\n• Mood changes and irritability\n• Relying on caffeine to function\n• Falling asleep within minutes of lying down\n\n**Sleep hygiene tips:**\n• Consistent sleep/wake schedule\n• Dark, cool, quiet environment (65–68°F/18–20°C)\n• Avoid screens 1 hour before bed\n• Limit caffeine after 2pm\n\n*Source: National Sleep Foundation, CDC*",
  heart: "**Foods to limit for cardiovascular health (AHA guidelines):**\n\n❌ **Limit or avoid:**\n• Trans fats (partially hydrogenated oils)\n• Saturated fats (> 6% of daily calories)\n• Sodium (> 2,300 mg/day)\n• Added sugars and sugar-sweetened beverages\n• Processed and ultra-processed foods\n• Excessive alcohol\n\n✅ **Heart-healthy choices:**\n• Fatty fish (salmon, mackerel) – 2 servings/week\n• Leafy greens, berries, and colorful vegetables\n• Whole grains and legumes\n• Nuts and olive oil\n\n*Source: American Heart Association, Mediterranean Diet Evidence*",
  immune: "**Evidence-based strategies to support immune function:**\n\n• **Sleep**: 7–9 hours per night is critical for immune cell production\n• **Balanced nutrition**: Zinc (meat, legumes), Vitamin C (citrus, peppers), Vitamin D (sun/supplements)\n• **Regular exercise**: 150 min/week moderate activity has anti-inflammatory effects\n• **Manage stress**: Chronic stress raises cortisol, suppressing immune response\n• **Don't smoke**: Tobacco impairs immune defenses\n• **Vaccinations**: Stay up to date with recommended vaccines\n• **Gut health**: Probiotic-rich foods (yogurt, kefir) support gut-associated immunity\n\n*Source: Harvard Medical School, WHO Guidelines*",
}

function getAIResponse(query: string): string {
  const q = query.toLowerCase()
  if (q.includes('diabetes') || q.includes('blood sugar') || q.includes('glucose')) return AI_RESPONSES.diabetes
  if (q.includes('blood pressure') || q.includes('hypertension') || q.includes('bp')) return AI_RESPONSES.blood_pressure
  if (q.includes('bmi') || q.includes('body mass') || q.includes('overweight') || q.includes('obese')) return AI_RESPONSES.bmi
  if (q.includes('sleep') || q.includes('insomnia') || q.includes('rest')) return AI_RESPONSES.sleep
  if (q.includes('heart') || q.includes('cardiovascular') || q.includes('cholesterol') || q.includes('food')) return AI_RESPONSES.heart
  if (q.includes('immune') || q.includes('immunity') || q.includes('cold') || q.includes('sick')) return AI_RESPONSES.immune
  return AI_RESPONSES.default
}

function formatMessage(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold text-white mb-1">{line.slice(2, -2)}</p>
    }
    if (line.startsWith('• ') || line.startsWith('❌ ') || line.startsWith('✅ ')) {
      return <li key={i} className="ml-2">{line.slice(2)}</li>
    }
    if (line.startsWith('*') && line.endsWith('*')) {
      return <p key={i} className="text-xs text-obsidian-500 mt-2 italic">{line.slice(1, -1)}</p>
    }
    if (line.trim() === '') return <br key={i} />
    return <p key={i}>{line}</p>
  })
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '0',
    role: 'ai',
    text: "Hello! I'm your HealthSphere AI assistant 👋\n\nI can provide educational health information from trusted sources like WHO, CDC, and NIH. Ask me about symptoms, prevention strategies, lifestyle tips, or general health topics.\n\n*Remember: I provide general information only — always consult a healthcare professional for personal medical advice.*",
    timestamp: new Date(),
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 800 + Math.random() * 600))

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: getAIResponse(text),
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, aiMsg])
    setLoading(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/25">
          <Sparkles size={20} className="text-purple-400" />
        </div>
        <div>
          <h1 className="font-display font-semibold text-white text-xl">AI Health Assistant</h1>
          <p className="text-xs text-obsidian-500">Powered by curated WHO & CDC knowledge base</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/25">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-medium">Online</span>
        </div>
      </div>

      <Disclaimer compact />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-5 space-y-4 mt-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-gradient-to-br from-teal-400 to-teal-600' : 'bg-gradient-to-br from-obsidian-600 to-obsidian-700 border border-teal-500/20'}`}>
              {msg.role === 'ai' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-obsidian-300" />}
            </div>
            <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
              <div className="space-y-1 text-sm leading-relaxed">
                {msg.role === 'ai' ? formatMessage(msg.text) : msg.text}
              </div>
              <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-white/50 text-right' : 'text-obsidian-600'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="chat-bubble-ai">
              <div className="flex gap-1 py-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="mb-3">
          <p className="text-xs text-obsidian-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.slice(0, 4).map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500/20 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about symptoms, prevention, nutrition, exercise..."
          className="input-field flex-1"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-teal-500/25 transition-all"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
