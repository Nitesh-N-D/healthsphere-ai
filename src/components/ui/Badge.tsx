import { ReactNode } from 'react'
import clsx from 'clsx'

type BadgeVariant = 'teal' | 'amber' | 'rose' | 'blue' | 'purple' | 'gray' | 'green'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  teal: 'bg-teal-500/15 text-teal-400 border border-teal-500/30',
  amber: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  rose: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
  blue: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
  gray: 'bg-obsidian-700/50 text-obsidian-300 border border-obsidian-600/50',
  green: 'bg-green-500/15 text-green-400 border border-green-500/30',
}

const severityMap: Record<string, BadgeVariant> = {
  low: 'green',
  moderate: 'amber',
  high: 'rose',
  critical: 'rose',
}

export default function Badge({ children, variant = 'teal', className }: BadgeProps) {
  return (
    <span className={clsx('badge-tag', variants[variant], className)}>
      {children}
    </span>
  )
}

export function SeverityBadge({ severity }: { severity: string }) {
  const variant = severityMap[severity] || 'gray'
  return (
    <Badge variant={variant} className="capitalize">
      {severity}
    </Badge>
  )
}
