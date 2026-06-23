import { cn } from '@/lib/utils'

import type { ModelOption } from './types'

export interface ModelDropdownProps {
  options: ModelOption[]
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
}

export function ModelDropdown({ options, selectedId, onSelect, className }: ModelDropdownProps) {
  return (
    <div
      className={cn(
        'flex h-auto w-[198px] flex-col items-start gap-0.5 rounded-[4px] border border-[#c2d0f1] bg-[#fdfdfd] p-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.08)]',
        className
      )}
      data-slot="model-dropdown"
    >
      {options.map(option => (
        <button
          className={cn(
            'flex h-7 w-full items-center rounded-[2px] px-3 text-left text-[11px] leading-5 text-(--ui-text-secondary) hover:bg-[#e7edf9]',
            option.id === selectedId && 'bg-[#d6e0f5]'
          )}
          disabled={option.disabled}
          key={option.id}
          onClick={() => onSelect?.(option.id)}
          type="button"
        >
          <span className="truncate">{option.label}</span>
        </button>
      ))}
    </div>
  )
}
