import { cn } from '@/lib/utils'

import type { PackageBadge, PackageTier } from './types'

function Badge({ badge }: { badge: PackageBadge }) {
  const isAmber = badge.tone === 'amber'
  return (
    <span
      className={cn(
        'flex h-6 shrink-0 items-center justify-center rounded-[2px] px-2 text-[12px] font-medium',
        isAmber
          ? 'bg-[rgba(245,158,11,0.08)] text-[#f59e0b]'
          : 'bg-[rgba(0,83,253,0.08)] text-[#0053fd]'
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
    <div className="flex h-full flex-col gap-12 rounded-[3px] bg-white pb-5 pt-10 px-4" data-slot="package-card">
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-[20px] font-bold leading-[30px] tracking-[1px] text-[#0f172a]">
            {tier.name}
          </span>
          {tier.badges && tier.badges.length > 0 ? (
            <div className="flex gap-1">
              {tier.badges.map((badge, i) => (
                <Badge badge={badge} key={i} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <span className="text-[40px] font-bold leading-[normal] text-[#0f172a]">
            ¥ {tier.price}
          </span>
          <p className="truncate text-[14px] leading-[22px] text-[rgba(0,0,0,0.6)]">
            {tier.subtitle}
          </p>
          {tier.features && tier.features.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {tier.features.map((feature, i) => (
                <li className="flex items-center gap-1" key={i}>
                  <img
                    alt=""
                    className="size-[18px] shrink-0"
                    src="/billing-assets/package-check.svg"
                  />
                  <span className="truncate text-[14px] leading-[22px] text-[rgba(0,0,0,0.6)]">
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
 * Highlighted cards get a gradient border via the padding-wrapper trick.
 */
export function PackageCard({ tier, onBuy, className }: PackageCardProps) {
  if (tier.highlighted) {
    return (
      <div className={cn('rounded-[4px] bg-gradient-to-br from-[#0053fd] to-[#8b5cf6] p-px', className)}>
        <CardInner onBuy={onBuy} tier={tier} />
      </div>
    )
  }

  return (
    <div className={cn('rounded-[4px] border border-[rgba(184,199,229,0.6)]', className)}>
      <CardInner onBuy={onBuy} tier={tier} />
    </div>
  )
}
