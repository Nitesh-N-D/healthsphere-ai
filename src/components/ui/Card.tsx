import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({ children, className, hover = false, glow = false }: CardProps) {
  return (
    <div
      className={clsx(
        'glass-card p-6',
        hover && 'transition-all duration-300 hover:border-teal-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 cursor-pointer',
        glow && 'shadow-lg shadow-teal-500/10',
        className
      )}
    >
      {children}
    </div>
  )
}
