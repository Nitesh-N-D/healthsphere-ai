import { useState } from 'react'
import { useHealth } from '../../context/HealthContext'
import Button from '../../components/ui/Button'
import Disclaimer from '../../components/Disclaimer'

export default function HealthEntryForm() {
  const { addEntry } = useHealth()

  const [form, setForm] = useState({
    weight: '',
    height: '',
    calories: '',
    steps: '',
    heartRate: '',
    sleep: '',
  })

  const submit = () => {
    addEntry({
      weight: +form.weight,
      height: +form.height,
      calories: +form.calories,
      steps: +form.steps,
      heartRate: +form.heartRate,
      sleep: +form.sleep,
    })
    setForm({ weight: '', height: '', calories: '', steps: '', heartRate: '', sleep: '' })
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <h1 className="section-header">Add Health Entry</h1>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(form).map(([k, v]) => (
          <input
            key={k}
            placeholder={k.toUpperCase()}
            value={v}
            onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
            className="glass-card px-4 py-3 text-sm text-white bg-transparent border border-teal-500/20 rounded-xl"
          />
        ))}
      </div>

      <Button size="lg" className="w-full" onClick={submit}>
        Save Entry
      </Button>

      <Disclaimer compact />
    </div>
  )
}