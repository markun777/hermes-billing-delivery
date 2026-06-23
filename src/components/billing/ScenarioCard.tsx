import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

import type { ScenarioItem } from './types'

export type ScenarioTone = 'green' | 'blue' | 'orange' | 'purple'

const ICON_TONE: Record<ScenarioTone, string> = {
  green: 'bg-(--ui-green)',
  blue: 'bg-(--ui-blue)',
  orange: 'bg-(--ui-orange)',
  purple: 'bg-(--ui-purple)'
}

export interface ScenarioCardProps {
  scenario: ScenarioItem
  icon?: ReactNode
  tone?: ScenarioTone
  onClick?: (id: string) => void
  className?: string
}

/** Discover preset-scenario card (发现场景卡). */
export function ScenarioCard({ scenario, icon, tone = 'green', onClick, className }: ScenarioCardProps) {
  return (
    <button
      className={cn(
        'flex h-[136px] w-full min-w-0 max-w-[360px] flex-col items-start gap-3 rounded-[4px] border border-[#c4d0f1] bg-white px-6 py-4 text-left transition-colors hover:bg-[#f7f9fd]',
        className
      )}
      data-slot="scenario-card"
      onClick={() => onClick?.(scenario.id)}
      type="button"
    >
      <span
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-full text-white [&_svg]:size-[15px]',
          ICON_TONE[tone]
        )}
      >
        {icon ?? <img alt="" className="size-[15px]" src="/billing-assets/scenario-pen.svg" />}
      </span>
      <span className="flex w-full flex-col gap-2">
        <span className="text-[16px] leading-6 text-[#333]">{scenario.title}</span>
        <span className="line-clamp-2 h-9 text-[13px] leading-[18px] text-(--ui-text-tertiary)">{scenario.desc}</span>
      </span>
    </button>
  )
}
