import { Check, Copy, LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { PaymentOrder } from './types'

export interface PayCardProps {
  order: PaymentOrder
  paid?: boolean
  onClose?: () => void
  onCopy?: (orderId: string) => void
  className?: string
}

export function PayCard({ order, paid = false, onClose, onCopy, className }: PayCardProps) {
  return (
    <article
      className={cn(
        'relative flex min-h-[560px] w-[480px] flex-col items-start gap-[14px] rounded-lg border border-[rgba(184,199,229,0.6)] bg-white p-6',
        className
      )}
      data-slot="pay-card"
    >
      <button
        aria-label="关闭"
        className="group absolute right-[19px] top-[19px] z-20 flex size-6 items-center justify-center rounded-full hover:bg-black/[0.06]"
        onClick={onClose}
        type="button"
      >
        <span
          aria-hidden="true"
          className="size-4 bg-[#94A3B8] transition-colors group-hover:bg-[#0F172A]"
          style={{
            mask: 'url(/billing-assets/guide-close.svg) center / contain no-repeat',
            WebkitMask: 'url(/billing-assets/guide-close.svg) center / contain no-repeat'
          }}
        />
      </button>

      <h3 className="text-[19px] font-bold text-[#0f172a]">{order.title}</h3>
      <p className="text-[13px] text-[#64748b]">{order.subtitle}</p>
      <div className="h-px w-full bg-[#e5ebf2]" />

      <div className="flex w-full items-center justify-between text-[14px]">
        <span className="text-[#64748b]">充值金额</span>
        <span className="text-[16px] font-bold text-[#0f172a]">{order.amount}</span>
      </div>
      <div className="flex w-full items-center justify-between text-[14px]">
        <span className="text-[#64748b]">您支付</span>
        <span className="text-[28px] font-bold text-[#0f172a]">{order.payable}</span>
      </div>
      <div className="h-px w-full bg-[#e5ebf2]" />

      <div className="flex w-full flex-col items-center gap-[10px]">
        <div className="size-[190px] overflow-hidden rounded-xl border border-[#e5ebf2] bg-white p-[11px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <img alt="支付二维码" className="size-[166px]" src={order.qrSrc} />
        </div>
        <span className="flex items-center gap-2 text-[13px] text-[#64748b]">
          {paid ? (
            <Check className="size-[13px] text-[#22c55e]" />
          ) : (
            <LoaderCircle className="size-[13px] animate-spin text-[#f97316]" />
          )}
          {paid ? '支付成功' : order.statusLabel}
        </span>
      </div>

      <div className="h-px w-full bg-[#e5ebf2]" />
      <div className="flex w-full flex-col gap-3 text-[13px]">
        <div className="flex items-center justify-between">
          <span className="text-[#64748b]">付款方式</span>
          <span className="text-[#0f172a]">{order.payMethod}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#64748b]">订单编号</span>
          <span className="flex items-center gap-1.5 text-[12px] text-[#0f172a]">
            {order.orderId}
            <button aria-label="复制订单编号" onClick={() => onCopy?.(order.orderId)} type="button">
              <Copy className="size-3.5 text-[#64748b]" />
            </button>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#64748b]">到期时间</span>
          <span className="text-[#0f172a]">{order.expiresAt}</span>
        </div>
      </div>
    </article>
  )
}
