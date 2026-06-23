import { cn } from '@/lib/utils'

export interface DiscoverTab {
  id: string
  label: string
}

export interface DiscoverScenario {
  id: string
  title: string
  desc: string
}

export interface DiscoverPanelProps {
  tabs: DiscoverTab[]
  activeTab: string
  scenarios: DiscoverScenario[]
  onTabChange?: (tabId: string) => void
  onScenarioClick?: (id: string) => void
  className?: string
}

function TabBar({
  tabs,
  activeTab,
  onTabChange
}: {
  tabs: DiscoverTab[]
  activeTab: string
  onTabChange?: (tabId: string) => void
}) {
  return (
    <div className="flex h-5 gap-4 overflow-hidden" data-slot="discover-tabs">
      {tabs.map(tab => (
        <button
          className="flex shrink-0 flex-col items-center"
          key={tab.id}
          onClick={() => onTabChange?.(tab.id)}
          type="button"
        >
          <span
            className={cn(
              'text-[13px] leading-[normal] whitespace-nowrap',
              tab.id === activeTab ? 'font-semibold text-[#333]' : 'font-normal text-[#7e7f83]'
            )}
            style={{ fontFeatureSettings: '"ss01" 1, "cv01" 1, "cv11" 1' }}
          >
            {tab.label}
          </span>
          <div className={cn('h-px w-6', tab.id === activeTab ? 'bg-[#c3c5c8]' : 'bg-transparent')} />
        </button>
      ))}
    </div>
  )
}

function ScenarioItem({
  scenario,
  onClick
}: {
  scenario: DiscoverScenario
  onClick?: (id: string) => void
}) {
  return (
    <button
      className="flex min-w-[224px] flex-1 flex-col items-start gap-3 rounded-[4px] border border-[#c4d0f1] bg-white px-6 py-4 text-left hover:bg-[#f7f9fd]"
      data-slot="discover-scenario-card"
      onClick={() => onClick?.(scenario.id)}
      type="button"
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#0053fd]">
        <img alt="" className="size-[15px]" src="/billing-assets/discover-scenario-icon.svg" />
      </span>
      <span className="flex w-full flex-col gap-2">
        <span className="text-[16px] font-medium leading-6 text-[#333]">{scenario.title}</span>
        <span className="line-clamp-2 h-9 text-[13px] leading-[normal] text-[rgba(0,0,0,0.45)]">{scenario.desc}</span>
      </span>
    </button>
  )
}

export function DiscoverPanel({
  tabs,
  activeTab,
  scenarios,
  onTabChange,
  onScenarioClick,
  className
}: DiscoverPanelProps) {
  return (
    <div
      className={cn('flex flex-col items-center bg-[#f7f9fd] px-4', className)}
      data-slot="discover-panel"
    >
      <div className="flex w-full max-w-[1184px] flex-col gap-12 px-8">
        <TabBar activeTab={activeTab} onTabChange={onTabChange} tabs={tabs} />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(224px,1fr))] gap-2">
          {scenarios.map(scenario => (
            <ScenarioItem key={scenario.id} onClick={onScenarioClick} scenario={scenario} />
          ))}
        </div>
      </div>
    </div>
  )
}
