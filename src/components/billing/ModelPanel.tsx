import { useState } from 'react'
import { cn } from '@/lib/utils'

import type { ModelPanelState } from './types'

export interface ModelPanelProps {
  state: ModelPanelState
  onDiscover?: () => void
  onAutomations?: () => void
  onBuy?: () => void
  onTierClick?: () => void
  onModelClick?: () => void
  onOrdersClick?: () => void
  className?: string
}

function SectionMarker() {
  return (
    <span
      aria-hidden
      className="size-2 shrink-0 bg-[radial-gradient(circle,#1359fd_0.8px,transparent_0.9px)] [background-size:2px_2px]"
    />
  )
}

function QuickAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      className="flex h-7 w-full items-center rounded-[2px] px-[18px] text-[#505155] hover:bg-black/4"
      onClick={onClick}
      type="button"
    >
      <span className="mr-2 flex size-4 items-center justify-center [&_svg]:size-4">{icon}</span>
      <span className="text-[14px] leading-5">{label}</span>
    </button>
  )
}

function SelectorRow({ label, open, onToggle }: { label: string; open?: boolean; onToggle?: () => void }) {
  return (
    <button
      className="flex h-7 w-[198px] items-center justify-between border border-[#c2d0f1] bg-[#f6f7fa] pl-4 pr-2 text-[11px] leading-5 text-(--ui-text-secondary) hover:bg-[#edf1f8]"
      onClick={onToggle}
      type="button"
    >
      <span className="truncate">{label}</span>
      <img alt="" className={cn('size-[18px] shrink-0', !open && 'rotate-180')} src="/billing-assets/chevron-down-icon.svg" />
    </button>
  )
}

export function ModelPanel({
  state,
  onDiscover,
  onAutomations,
  onBuy,
  onTierClick,
  onModelClick,
  onOrdersClick,
  className
}: ModelPanelProps) {
  const [openTier, setOpenTier] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  return (
    <aside className={cn('flex w-[235px] flex-col items-center gap-4', className)} data-slot="model-panel">
      <div className="flex w-full flex-col">
        <QuickAction icon={<img alt="" className="size-4" src="/billing-assets/discover-icon.svg" />} label="发现" onClick={onDiscover} />
        <QuickAction icon={<img alt="" className="size-4" src="/billing-assets/auto-task-icon.svg" />} label="自动任务" onClick={onAutomations} />
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-center justify-between px-[18px]">
          <span className="flex items-center gap-2 text-[11px] font-semibold leading-5 text-[#1359fd]">
            <SectionMarker />
            模型选择
          </span>
          <button
            className="flex h-5 w-10 items-center justify-center rounded-[2px] bg-[rgba(0,77,255,0.12)] text-[11px] leading-5 text-[rgba(10,82,251,0.8)] hover:bg-[rgba(0,77,255,0.18)]"
            onClick={onBuy}
            type="button"
          >
            购买
          </button>
        </div>
        <SelectorRow label={state.tierName} open={openTier} onToggle={() => { setOpenTier(v => !v); onTierClick?.() }} />
        <SelectorRow label={state.modelName} open={openModel} onToggle={() => { setOpenModel(v => !v); onModelClick?.() }} />
      </div>

      <button className="group flex w-full items-center justify-between px-[18px]" onClick={onOrdersClick} type="button">
        <span className="flex items-center gap-2 text-[11px] font-semibold leading-5 text-[#1359fd]">
          <SectionMarker />
          模型订单
        </span>
        <span className="flex items-center text-[11px] leading-5 text-(--ui-text-quaternary) group-hover:text-(--ui-text-primary)">
          当前套餐消耗 {state.usedPct}%
          <img alt="" className="size-[18px] rotate-90" src="/billing-assets/chevron-right-icon.svg" />
        </span>
      </button>
    </aside>
  )
}
