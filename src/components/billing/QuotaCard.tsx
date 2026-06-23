import { cn } from '@/lib/utils'

import type { QuotaPackage, QuotaPurchase, QuotaTone } from './types'

const FILL_TONE: Record<QuotaTone, string> = {
  blue: 'bg-(--ui-blue)',
  orange: 'bg-(--ui-orange)'
}

function formatToken(n: number) {
  return n.toLocaleString('en-US')
}

function formatYuan(n: number) {
  return n.toFixed(2).replace(/\.00$/, '')
}

function getPurchases(quota: QuotaPackage): QuotaPurchase[] {
  if (quota.purchases?.length) return quota.purchases

  return [
    {
      id: quota.id,
      usedPct: quota.usedPct,
      remainingYuan: quota.remainingYuan,
      tokenUsed: quota.tokenUsed,
      expiry: quota.expiry,
      tone: quota.tone
    }
  ]
}

export interface QuotaCardProps {
  quota: QuotaPackage
  className?: string
}

/**
 * Quota / order summary card (额度卡). Horizontal layout:
 * [package + progress + expiry/used] | 剩余额度 | 累计 token 用量.
 */
export function QuotaCard({ quota, className }: QuotaCardProps) {
  const purchases = getPurchases(quota)

  if (purchases.length > 1) {
    return <MultiPurchaseQuotaCard className={className} purchases={purchases} quota={quota} />
  }

  const purchase = purchases[0]
  const tone = purchase.tone ?? quota.tone ?? 'blue'
  const pct = Math.min(100, Math.max(0, purchase.usedPct))

  return (
    <div
      className={cn(
        'flex h-[104px] w-full items-center rounded-[4px] border border-[#d9e3f2] bg-white py-1',
        className
      )}
      data-slot="quota-card"
    >
      <div className="flex h-24 w-full items-center gap-4 px-4 py-1">
        <div className="flex h-full w-[480px] shrink-0 flex-col gap-3 rounded-[4px] p-3">
          <span className="text-[14px] leading-[18px] text-[#0f172a]">{quota.name}</span>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] leading-[18px] text-(--ui-text-tertiary)">有效期至 {purchase.expiry}</span>
            <div className="flex items-center gap-3">
              <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-[5px] bg-[#e8eaed]">
                {pct > 0 ? (
                  <div className={cn('h-full rounded-[5px]', FILL_TONE[tone])} style={{ width: `${pct}%` }} />
                ) : null}
              </div>
              <span className="w-24 text-right text-[11px] leading-[18px] text-(--ui-text-tertiary)">
                已使用 {pct % 1 === 0 ? pct : pct.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <span className="h-14 w-px shrink-0 bg-black/4" />

        <div className="flex h-full min-w-0 flex-1 flex-col items-start justify-between rounded-[4px] px-3 pb-1 pt-3">
          <span className="text-[14px] leading-[18px] text-[#0f172a]">剩余额度</span>
          <span className="font-bold text-[#0f172a]">
            <span className="text-[16px]">¥</span>
            <span className="text-[24px]">{formatYuan(purchase.remainingYuan)}</span>
          </span>
        </div>

        <span className="h-14 w-px shrink-0 bg-black/4" />

        <div className="flex h-full min-w-0 flex-1 flex-col items-start justify-between rounded-[4px] px-3 pb-1 pt-3">
          <span className="text-[14px] leading-[18px] text-[#0f172a]">累计token用量</span>
          <span className="text-[24px] font-bold text-[#0f172a]">{formatToken(purchase.tokenUsed)}</span>
        </div>
      </div>
    </div>
  )
}

function MultiPurchaseQuotaCard({
  purchases,
  quota,
  className
}: {
  purchases: QuotaPurchase[]
  quota: QuotaPackage
  className?: string
}) {
  return (
    <div
      className={cn('w-full rounded-[4px] border border-[#d9e3f2] bg-white py-1', className)}
      data-purchase-count={purchases.length}
      data-slot="quota-card"
    >
      <div className="flex w-full items-stretch gap-4 px-4 py-1">
        <div className="flex w-[480px] shrink-0 flex-col rounded-[4px] p-3">
          <span className="shrink-0 text-[14px] leading-[18px] text-[#0f172a]">{quota.name}</span>
          <div className="mt-3 flex flex-1 flex-col divide-y divide-black/4">
            {purchases.map((purchase, index) => {
              const pct = Math.min(100, Math.max(0, purchase.usedPct))
              const tone = purchase.tone ?? quota.tone ?? 'blue'

              return (
                <div
                  className={cn('flex min-h-[80px] flex-col justify-center', index > 0 && 'pt-2')}
                  data-slot="quota-purchase-row"
                  key={purchase.id}
                >
                  <span className="text-[11px] leading-[18px] text-(--ui-text-tertiary)">
                    有效期至 {purchase.expiry}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-[5px] bg-[#e8eaed]">
                      {pct > 0 ? (
                        <div
                          className={cn('h-full rounded-[5px]', FILL_TONE[tone])}
                          style={{ width: `${pct}%` }}
                        />
                      ) : null}
                    </div>
                    <span className="w-24 text-right text-[11px] leading-[18px] text-(--ui-text-tertiary)">
                      已使用 {pct % 1 === 0 ? pct : pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <span className="my-5 w-px shrink-0 bg-black/4" />

        <QuotaPurchaseValueColumn label="剩余额度" purchases={purchases}>
          {purchase => (
            <span className="font-bold text-[#0f172a]">
              <span className="text-[16px]">¥</span>
              <span className="text-[24px]">{formatYuan(purchase.remainingYuan)}</span>
            </span>
          )}
        </QuotaPurchaseValueColumn>

        <span className="my-5 w-px shrink-0 bg-black/4" />

        <QuotaPurchaseValueColumn label="累计token用量" purchases={purchases}>
          {purchase => (
            <span className="text-[24px] font-bold text-[#0f172a]">{formatToken(purchase.tokenUsed)}</span>
          )}
        </QuotaPurchaseValueColumn>
      </div>
    </div>
  )
}

function QuotaPurchaseValueColumn({
  label,
  purchases,
  children
}: {
  label: string
  purchases: QuotaPurchase[]
  children: (purchase: QuotaPurchase) => React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-[4px] px-3 pb-1 pt-3">
      <span className="shrink-0 text-[14px] leading-[18px] text-[#0f172a]">{label}</span>
      <div className="mt-3 flex flex-1 flex-col divide-y divide-black/4">
        {purchases.map((purchase, index) => (
          <div
            className={cn('flex min-h-[80px] items-end', index > 0 ? 'pb-[14px] pt-2' : 'pb-4')}
            data-slot="quota-purchase-value"
            key={purchase.id}
          >
            {children(purchase)}
          </div>
        ))}
      </div>
    </div>
  )
}
