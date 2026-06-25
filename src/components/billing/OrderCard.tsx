import { cn } from '@/lib/utils'

import type { OrderRecord, OrderStatus } from './types'

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: '待支付',
  success: '成功',
  failed: '支付失败'
}

const STATUS_TONE: Record<OrderStatus, { dot: string; text: string }> = {
  pending: { dot: 'bg-[#f97316]', text: 'text-[#f97316]' },
  success: { dot: 'bg-[#22c55e]', text: 'text-[#16a34a]' },
  failed: { dot: 'bg-[#ef4444]', text: 'text-[#dc2626]' }
}

export interface OrderCardProps {
  order: OrderRecord
  onInvoice?: (id: string) => void
  className?: string
}

export function OrderCard({ order, onInvoice, className }: OrderCardProps) {
  const canInvoice = order.status === 'success' && !order.invoiced
  const fields = [
    ['支付方式', order.payMethod, 'font-medium'],
    ['充值额度', order.amount, 'font-bold'],
    ['实付金额', order.paid, 'font-bold'],
    ['开票状态', order.invoiced ? '已开票' : '未开票', order.invoiced ? 'font-medium text-[#64748b]' : 'font-medium']
  ] as const

  return (
    <article
      className={cn(
        'flex w-full flex-col gap-4 overflow-hidden rounded-[4px] border border-[rgba(188,205,232,0.56)] bg-white px-6 py-5',
        className
      )}
      data-slot="order-card"
    >
      <header className="flex w-full items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[16px] font-bold text-[#0f172a]">{order.id}</h3>
          <p className="text-[12px] text-[#64748b]">{order.time}</p>
        </div>
        <span className={cn('flex items-center gap-1.5 text-[14px] font-medium', STATUS_TONE[order.status].text)}>
          <span className={cn('size-2 rounded-full', STATUS_TONE[order.status].dot)} />
          {STATUS_LABEL[order.status]}
        </span>
      </header>

      <div className="flex w-full items-start overflow-hidden">
        {fields.map(([label, value, valueClassName]) => (
          <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-hidden" key={label}>
            <span className="truncate text-[12px] text-[#64748b]">{label}</span>
            <span className={cn('truncate text-[14px] text-[#0f172a]', valueClassName)}>{value}</span>
          </div>
        ))}
        <div className="flex w-[88px] shrink-0 items-end self-stretch">
          {canInvoice ? (
            <button
              className="flex h-7 w-full items-center justify-center rounded-[2px] border border-[rgba(188,205,232,0.56)] bg-[#f8fafc] px-4 text-[14px] font-normal whitespace-nowrap text-[#475569] hover:bg-[#f1f5f9]"
              onClick={() => onInvoice?.(order.id)}
              type="button"
            >
              申请开票
            </button>
          ) : null}
        </div>
      </div>
    </article>
  )
}
