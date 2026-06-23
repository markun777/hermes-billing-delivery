import { cn } from '@/lib/utils'

export interface QuotaExhaustedBannerProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  onClose?: () => void
  className?: string
}

export function QuotaExhaustedBanner({
  title = '模型费用额度已用完',
  description = '充值后即可继续使用当前模型与自动任务。',
  actionLabel = '充值套餐',
  onAction,
  onClose,
  className
}: QuotaExhaustedBannerProps) {
  return (
    <div
      className={cn(
        'flex h-11 w-[780px] max-w-full items-center justify-between gap-3 rounded border border-[rgba(184,199,229,0.88)] bg-[#f8fbff]/95 py-2 pl-3.5 pr-2 shadow-[0_6px_18px_rgba(19,89,253,0.06),0_1px_2px_rgba(15,23,42,0.04)]',
        className
      )}
      data-slot="quota-exhausted-banner"
      role="status"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <img alt="" aria-hidden="true" className="size-4 shrink-0" src="/billing-assets/quota-exhausted-info.svg" />
        <div className="flex min-w-0 items-center gap-1 text-xs leading-5">
          <span className="shrink-0 font-semibold text-[#0f172a]">{title}</span>
          <span className="min-w-0 truncate font-semibold text-[#505155]/80">{description}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          className="flex h-6 items-center justify-center rounded-sm border border-[#0a52fb]/20 bg-[#1359fd] px-2 text-[11px] font-medium leading-5 text-white transition-colors hover:bg-[#0a52fb]"
          onClick={onAction}
          type="button"
        >
          {actionLabel}
        </button>
        <button
          aria-label="关闭额度提示"
          className="flex size-7 items-center justify-center rounded-md transition-colors hover:bg-black/[0.06]"
          onClick={onClose}
          type="button"
        >
          <img alt="" aria-hidden="true" className="size-4" src="/billing-assets/quota-exhausted-close.svg" />
        </button>
      </div>
    </div>
  )
}
