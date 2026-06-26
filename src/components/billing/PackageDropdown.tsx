import { cn } from '@/lib/utils'

import type { PackageOption } from './types'

export interface PackageDropdownProps {
  options: PackageOption[]
  selectedId?: string
  onSelect?: (id: string) => void
  onStatusClick?: (id: string) => void
  className?: string
}

export function PackageDropdown({ options, selectedId, onSelect, onStatusClick, className }: PackageDropdownProps) {
  return (
    <div
      className={cn(
        'flex w-[198px] flex-col items-start rounded-[4px] border border-[#c2d0f1] bg-[#fdfdfd] p-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.08)]',
        className
      )}
      data-slot="package-dropdown"
    >
      {options.map(option => {
        const isSelected = option.id === selectedId
        const hasStatus = Boolean(option.statusLabel)
        return (
          <button
            className={cn(
              'flex h-7 w-full items-center rounded-[2px] text-left text-[11px] leading-5 hover:bg-[#e7edf9]',
              hasStatus ? 'justify-between pl-3 pr-2' : 'px-3',
              isSelected && 'bg-[#d6e0f5]'
            )}
            disabled={option.disabled}
            key={option.id}
            onClick={() => (hasStatus ? onStatusClick?.(option.id) : onSelect?.(option.id))}
            type="button"
          >
            <span className={cn('truncate', hasStatus ? 'text-[rgba(0,0,0,0.45)]' : 'text-(--ui-text-secondary)')}>
              {option.label}
            </span>
            {option.statusLabel ? (
              <span className="shrink-0 text-[rgba(10,82,251,0.8)]">{option.statusLabel}</span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
