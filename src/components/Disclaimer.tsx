import { AlertTriangle } from 'lucide-react'

interface DisclaimerProps {
  compact?: boolean
}

export default function Disclaimer({ compact = false }: DisclaimerProps) {
  if (compact) {
    return (
      <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
        <p>
          <span className="font-semibold">Medical Disclaimer:</span> This platform is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/25">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-500/20 shrink-0">
          <AlertTriangle size={20} className="text-amber-400" />
        </div>
        <div>
          <h4 className="font-semibold text-amber-300 mb-2">Important Medical Disclaimer</h4>
          <div className="text-sm text-obsidian-300 space-y-2">
            <p>
              HealthSphere AI is an <strong className="text-obsidian-200">educational platform only</strong>. All content is intended for general informational purposes and does not constitute, replace, or substitute professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              The AI Health Assistant provides <strong className="text-obsidian-200">general health information</strong>, not personalized medical advice. Never disregard professional medical advice or delay seeking it because of something you have read on this platform.
            </p>
            <p>
              If you have a medical emergency, call your local emergency services immediately. The information provided is sourced from reputable organizations (WHO, CDC, NIH) but may not reflect the most current research or guidelines.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-amber-500/20">
            <p className="text-xs text-obsidian-400">
              Sources: World Health Organization (WHO), Centers for Disease Control and Prevention (CDC), National Institutes of Health (NIH), American Medical Association (AMA)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
