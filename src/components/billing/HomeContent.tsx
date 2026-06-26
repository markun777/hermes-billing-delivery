import { cn } from '@/lib/utils'

import type { HomePreset } from './types'

export interface HomeContentProps {
  presets: HomePreset[]
  onPresetClick?: (id: string) => void
  className?: string
}

export function HomeContent({ presets, onPresetClick, className }: HomeContentProps) {
  return (
    <section
      className={cn(
        'flex h-[685px] w-full flex-col items-center justify-center gap-12 bg-[#f7f9fd] px-24 pt-10',
        className
      )}
      data-slot="home-content"
    >
      <img alt="HERMES AGENT" className="h-[65px] w-[458px]" src="/billing-assets/hermes-agent-logo.svg" />

      <div className="flex w-full items-start gap-3">
        {presets.map(preset => (
          <button
            className="flex min-w-0 flex-1 flex-col items-start gap-3 overflow-hidden rounded-[4px] border border-[#c4d0f1] bg-white px-6 py-4 text-left hover:bg-[#fbfcff]"
            key={preset.id}
            onClick={() => onPresetClick?.(preset.id)}
            type="button"
          >
            <img alt="" className="size-6" src={preset.iconSrc} />
            <span className="flex w-full flex-col gap-1">
              <span className="truncate text-[16px] font-semibold leading-6 text-[#18181b]">{preset.title}</span>
              <span className="line-clamp-2 text-[13px] leading-[18px] text-[#6b6f7a]">{preset.desc}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
