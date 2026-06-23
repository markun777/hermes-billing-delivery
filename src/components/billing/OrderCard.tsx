import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import type { OrderRecord, OrderStatus } from './types'

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: '等待支付',
  success: '支付成功',
  failed: '支付失败'
}

const STATUS_TONE: Record<OrderStatus, string> = {
  pending: 'bg-[#f97316] text-[#f97316]',
  success: 'bg-[#22c55e] text-[#16a34a]',
  failed: 'bg-[#ef4444] text-[#dc2626]'
}

export interface OrderCardProps {
  order: OrderRecord
  onInvoice?: (id: string) => void
  className?: string
}

export function OrderCard({ order, onInvoice, className }: OrderCardProps) {
  const canInvoice = order.status === 'success' && !order.invoiced

  return (
    <article
      className={cn(
        'flex w-full flex-col gap-4 overflow-hidden rounded-[4px] border border-[rgba(188,205,232,0.56)] bg-white px-6 py-5',
        canInvoice ? 'h-[224px]' : 'h-[158px]',
        className
      )}
      data-slot="order-card"
    >
      <header className="flex w-full items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[16px] font-bold text-[#0f172a]">{order.id}</h3>
          <p className="text-[13px] text-[#64748b]">{order.time}</p>
        </div>
        <span
          className={cn('flex items-center gap-1.5 text-[14px] font-medium', STATUS_TONE[order.status].split(' ')[1])}
        >
          <span className={cn('size-2 rounded-full', STATUS_TONE[order.status].split(' ')[0])} />
          {STATUS_LABEL[order.status]}
        </span>
      </header>

      <div className="grid grid-cols-4 gap-0">
        {[
          ['付款方式', order.payMethod],
          ['订单金额', order.amount],
          ['实付金额', order.paid],
          ['开票状态', order.invoiced ? '已开票' : '未开票']
        ].map(([label, value]) => (
          <div className="flex flex-col gap-2" key={label}>
            <span className="text-[13px] text-[#64748b]">{label}</span>
            <span className="text-[15px] font-medium text-[#0f172a]">{value}</span>
          </div>
        ))}
      </div>

      {canInvoice ? (
        <div className="flex justify-end pt-4">
          <Button
            className="h-8 w-[88px] rounded-[4px] border border-[rgba(188,205,232,0.56)] bg-[#f8fafc] px-4 py-0 text-[14px] font-normal text-[#475569] hover:bg-[#f1f5f9]"
            onClick={() => onInvoice?.(order.id)}
            type="button"
            variant="outline"
          >
            申请开票
          </Button>
        </div>
      ) : null}
    </article>
  )
}
