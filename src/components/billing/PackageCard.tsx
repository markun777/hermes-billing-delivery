import { cn } from '@/lib/utils'

import type { PackageBadge, PackageTier } from './types'

function Badge({ badge }: { badge: PackageBadge }) {
  const isAmber = badge.tone === 'amber'
  return (
    <span
      className={cn(
        'flex h-6 shrink-0 items-center justify-center rounded-[2px] px-2 text-[12px] font-medium',
        isAmber ? 'bg-[rgba(245,158,11,0.08)] text-[#f59e0b]' : 'bg-[rgba(0,83,253,0.08)] text-[#0053fd]'
      )}
    >
      {badge.label}
    </span>
  )
}

export interface PackageCardProps {
  tier: PackageTier
  onBuy?: (id: string) => void
  className?: string
}

function CardInner({ tier, onBuy }: Omit<PackageCardProps, 'className'>) {
  return (
    <div className="flex h-full flex-col gap-12 rounded-[3px] bg-white px-5 pb-5 pt-6" data-slot="package-card">
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-[20px] font-bold leading-[30px] tracking-[1px] text-[#0f172a]">{tier.name}</span>
          {tier.badges && tier.badges.length > 0 ? (
            <div className="flex gap-1">
              {tier.badges.map((badge, i) => (
                <Badge badge={badge} key={i} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <span className="text-[40px] font-bold leading-[normal] text-[#0f172a]">¥ {tier.price}</span>
          <div className="flex flex-col gap-2">
            <p className="text-[14px] leading-[22px] break-words text-[rgba(0,0,0,0.6)]">{tier.subtitle}</p>
            {tier.validity ? (
              <p className="break-words text-[11px] leading-[normal] text-[rgba(0,0,0,0.28)]">{tier.validity}</p>
            ) : null}
          </div>
          {tier.features && tier.features.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {tier.features.map((feature, i) => (
                <li className="flex items-start gap-1" key={i}>
                  <img alt="" className="mt-0.5 size-[18px] shrink-0" src="/billing-assets/package-check.svg" />
                  <span className="min-w-0 flex-1 text-[14px] leading-[22px] break-words text-[rgba(0,0,0,0.6)]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <button
        className="flex h-10 w-full shrink-0 items-center justify-center rounded-[2px] bg-[#0053fd] px-5 py-[5px] text-[16px] font-bold text-white hover:bg-[#0044e0]"
        onClick={() => onBuy?.(tier.id)}
        type="button"
      >
        立即购买
      </button>
    </div>
  )
}

/**
 * Recharge package card (套餐卡). Updated to Figma 39:907 design.
 * Highlighted cards use the selected 1px border from the current Figma spec.
 */
export function PackageCard({ tier, onBuy, className }: PackageCardProps) {
  if (tier.highlighted) {
    return (
      <div
        className={cn(
          'h-full min-h-[360px] min-w-[220px] rounded-[4px] border border-[rgba(0,83,253,0.6)]',
          className
        )}
      >
        <CardInner onBuy={onBuy} tier={tier} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'h-full min-h-[360px] min-w-[220px] rounded-[4px] border border-[rgba(184,199,229,0.6)]',
        className
      )}
    >
      <CardInner onBuy={onBuy} tier={tier} />
    </div>
  )
}
