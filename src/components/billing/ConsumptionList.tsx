import { cn } from '@/lib/utils'

import type { ModelUsage } from './types'

export interface ConsumptionListProps {
  packageName: string
  expiry: string
  models: ModelUsage[]
  className?: string
}

export function ConsumptionList({ packageName, expiry, models, className }: ConsumptionListProps) {
  return (
    <section
      className={cn(
        'flex w-full flex-col items-start gap-2 rounded-[4px] border border-[rgba(188,205,232,0.56)] bg-white px-3 py-5',
        className
      )}
      data-slot="consumption-list"
    >
      <header className="flex w-full flex-col gap-1 px-4">
        <h3 className="text-[14px] leading-[18px] text-[#0f172a]">{packageName}</h3>
        <p className="text-[11px] leading-[18px] text-(--ui-text-tertiary)">有效期至 {expiry}</p>
      </header>

      {models.map(model => (
        <div className="flex h-[38px] w-full items-center gap-6 rounded-[4px] px-4 py-2" key={model.id}>
          <div className="flex w-[220px] shrink-0 items-center gap-2">
            <img alt="" className="size-4" src="/billing-assets/model-default.svg" />
            <span className="truncate text-[12px] text-[rgba(0,0,0,0.88)]">{model.name}</span>
            {model.discount ? (
              <span className="flex h-4 shrink-0 items-center rounded-full bg-(--ui-blue)/8 px-1.5 text-[10px] leading-[15px] text-[#2563eb]">
                {model.discount}
              </span>
            ) : null}
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-10">
            <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-[3px] bg-[#e8eaed]">
              <div className="h-full rounded-[3px] bg-(--ui-blue)" style={{ width: `${model.pct}%` }} />
            </div>
            <div className="flex h-[22px] w-60 shrink-0 items-center justify-between text-[12px] text-[#64748b]">
              <span>{model.cost}</span>
              <span>{model.tokens}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
