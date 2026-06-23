import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type BubbleArrow = 'left' | 'right' | 'top' | 'bottom' | 'none'

export interface GuideBubbleProps {
  title: string
  desc: string
  nextLabel?: string
  icon?: ReactNode
  arrow?: BubbleArrow
  onNext?: () => void
  onClose?: () => void
  className?: string
}

/** Onboarding tooltip bubble (新手引导气泡). */
export function GuideBubble({
  title,
  desc,
  nextLabel = '继续',
  icon,
  arrow = 'left',
  onNext,
  onClose,
  className
}: GuideBubbleProps) {
  const hasBottomArrow = arrow === 'bottom'
  const backgroundSrc = hasBottomArrow
    ? '/billing-assets/guide-bubble-bottom.png'
    : '/billing-assets/guide-bubble-left.png'

  return (
    <div
      className={cn('relative w-[466px]', hasBottomArrow ? 'h-[161px]' : 'h-[154px]', className)}
      data-slot="guide-bubble"
    >
      {arrow === 'none' ? (
        <div aria-hidden="true" className="absolute inset-y-0 left-8 z-0 w-[400px] overflow-hidden">
          <img alt="" className="absolute left-[-32px] top-0 h-full w-[466px] max-w-none" src={backgroundSrc} />
        </div>
      ) : (
        <img aria-hidden="true" alt="" className="absolute inset-0 z-0 h-full w-full" src={backgroundSrc} />
      )}

      <button
        aria-label="关闭"
        className="group absolute right-[46px] top-[38px] z-20 flex size-4 items-center justify-center"
        onClick={onClose}
        type="button"
      >
        <span
          aria-hidden="true"
          className="size-4 bg-[#6b799a] transition-colors group-hover:bg-[#0f172a]"
          style={{
            mask: 'url(/billing-assets/guide-close.svg) center / contain no-repeat',
            WebkitMask: 'url(/billing-assets/guide-close.svg) center / contain no-repeat'
          }}
        />
      </button>

      <div
        className={cn(
          'absolute top-[43px] z-10 flex h-[62px] items-end gap-2',
          arrow === 'bottom' ? 'left-[42px] w-[374px]' : 'left-12 w-[368px]'
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex h-8 items-center gap-1">
            <span className="flex size-8 shrink-0 items-center justify-center">
              {icon ?? <img alt="" className="size-10 max-w-none" src="/billing-assets/guide-mascot.png" />}
            </span>
            <p className="truncate text-[16px] font-bold leading-7 tracking-[0.1px] text-[#0f172a]">{title}</p>
          </div>
          <p className="truncate pl-9 text-[14px] leading-[22px] tracking-[0.1px] text-[#6b799a]">{desc}</p>
        </div>

        <Button
          className="h-7 w-16 rounded-[4px] border border-white/4 bg-[rgba(51,112,255,0.12)] px-0 py-0 text-[12px] font-normal tracking-[0.1px] text-[rgba(19,89,253,0.8)] hover:bg-[rgba(51,112,255,0.18)]"
          onClick={onNext}
          type="button"
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}
