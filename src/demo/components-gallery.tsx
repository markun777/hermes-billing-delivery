import '../styles.css'
import '../store/translucency'

import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode, type ReactNode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { ErrorBoundary } from '@/components/error-boundary'
import { I18nProvider } from '@/i18n'
import { queryClient } from '@/lib/query-client'
import { ThemeProvider } from '@/themes/context'

import {
  ConsumptionList,
  DiscoverPanel,
  GuideBubble,
  HomeContent,
  ModelDropdown,
  ModelPanel,
  OrderCard,
  PackageCard,
  PayCard,
  QuotaCard,
  QuotaExhaustedBanner,
  ScenarioCard
} from '@/components/billing'
import {
  demoDiscoverScenarios,
  demoDiscoverTabs,
  demoHomePresets,
  demoModelOptions,
  demoModelPanel,
  demoModels,
  demoOrders,
  demoPackages,
  demoPaymentOrder,
  demoQuotas,
  demoScenarios
} from '@/components/billing/data'

const SCENARIO_TONES = ['green', 'blue', 'orange', 'purple'] as const

function Section({ title, count, children }: { title: string; count: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t border-[#dfe6f3] pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-2">
        <h2 className="text-sm font-bold text-(--ui-text-primary)">{title}</h2>
        <span className="text-xs text-(--ui-text-quaternary)">{count}</span>
      </div>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

function Gallery() {
  const [selectedModel, setSelectedModel] = useState(demoModelOptions[0].id)
  const [discoverTab, setDiscoverTab] = useState(demoDiscoverTabs[0].id)
  const [showQuotaBanner, setShowQuotaBanner] = useState(true)
  const selectedLabel = useMemo(
    () => demoModelOptions.find(option => option.id === selectedModel)?.label ?? demoModelPanel.modelName,
    [selectedModel]
  )

  return (
    <div className="h-screen overflow-auto bg-[#f7f9fd] px-10 py-9" data-testid="gallery-scroll">
      <header className="mb-8">
        <h1 className="text-xl font-bold text-(--ui-text-primary)">Hermes 产品线组件库</h1>
        <p className="mt-1 text-sm text-(--ui-text-tertiary)">
          Figma 组件母版 117:6366 · 官方 primitive 与主题 token · 真实交互状态
        </p>
      </header>

      <div className="flex max-w-[1320px] flex-col gap-10">
        <Section title="ModelPanel / ModelDropdown · 侧栏模型区" count="侧栏 / 模型选择">
          <div className="flex min-h-[220px] items-start gap-8 rounded-[4px] border border-[#dfe6f3] bg-white p-6">
            <ModelPanel state={{ ...demoModelPanel, modelName: selectedLabel }} />
            <ModelDropdown options={demoModelOptions} onSelect={setSelectedModel} selectedId={selectedModel} />
          </div>
        </Section>

        <Section title="HomeContent · 首页内容" count="首页 / 场景预设">
          <div className="overflow-auto rounded-[4px] border border-[#dfe6f3]">
            <HomeContent presets={demoHomePresets} />
          </div>
        </Section>

        <Section title="PackageCard · 套餐卡" count="充值 / 支付">
          <div className="flex w-full flex-col items-center gap-12 rounded-[4px] border border-[#c6d2f2] bg-[#f8fafe] p-12">
            <div className="flex items-center justify-center gap-5">
              <img alt="" className="size-6 shrink-0" src="/billing-assets/package-ornament.svg" />
              <span className="text-[28px] font-bold leading-[normal] text-[#111827]">热门套餐推荐</span>
              <img alt="" className="size-6 shrink-0" src="/billing-assets/package-ornament.svg" />
            </div>
            <div className="grid w-full grid-cols-4 gap-4 py-12">
              {demoPackages.map(tier => (
                <PackageCard key={tier.id} tier={tier} />
              ))}
            </div>
          </div>
        </Section>

        <Section title="PayCard · 支付卡" count="扫码 / 支付状态">
          <PayCard order={demoPaymentOrder} />
          <PayCard order={demoPaymentOrder} paid />
        </Section>

        <Section title="QuotaCard · 额度卡" count="额度 / 订单">
          <div className="flex w-full max-w-[1076px] flex-col gap-3">
            {demoQuotas.map(quota => (
              <QuotaCard key={quota.id} quota={quota} />
            ))}
          </div>
        </Section>

        <Section title="QuotaExhaustedBanner · 额度用完提示条" count="状态条 / 充值入口">
          <div className="flex w-full max-w-[1076px] flex-col gap-3 rounded-[4px] border border-[#dfe6f3] bg-[#f7f9fd] p-6">
            {showQuotaBanner ? (
              <QuotaExhaustedBanner
                onAction={() => console.log('open package recharge')}
                onClose={() => setShowQuotaBanner(false)}
              />
            ) : (
              <button
                className="h-8 w-fit rounded-sm border border-[#c2d0f1] bg-white px-3 text-xs font-medium text-[#1359fd]"
                onClick={() => setShowQuotaBanner(true)}
                type="button"
              >
                重新显示提示条
              </button>
            )}
          </div>
        </Section>

        <Section title="ConsumptionList · 模型消耗" count="用量 / 模型排行">
          <ConsumptionList className="max-w-[1076px]" expiry="2026-07-01" models={demoModels} packageName="套餐一" />
        </Section>

        <Section title="OrderCard · 订单卡" count="订单 / 开票">
          <div className="flex w-full max-w-[1076px] flex-col gap-4">
            {demoOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </Section>

        <Section title="ScenarioCard · 发现场景卡" count="发现">
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(224px,1fr))] gap-4">
            {demoScenarios.map((scenario, i) => (
              <ScenarioCard key={scenario.id} scenario={scenario} tone={SCENARIO_TONES[i % SCENARIO_TONES.length]} />
            ))}
          </div>
        </Section>

        <Section title="DiscoverPanel · 发现页" count="发现/Tab+场景网格">
          <div className="w-full overflow-hidden rounded-[4px] border border-[#dfe6f3]">
            <DiscoverPanel
              activeTab={discoverTab}
              onScenarioClick={id => console.log(id)}
              onTabChange={setDiscoverTab}
              scenarios={demoDiscoverScenarios}
              tabs={demoDiscoverTabs}
            />
          </div>
        </Section>

        <Section title="GuideBubble · 新手引导气泡" count="引导">
          <div className="flex flex-col gap-2">
            <GuideBubble
              arrow="left"
              desc="一个套餐，畅用多款大模型"
              icon={<img alt="" className="size-10 max-w-none shrink-0" src="/billing-assets/guide-switch-model.png" />}
              title="随心切换模型"
            />
            <GuideBubble
              arrow="left"
              desc="设好计划，智能体到点自动开工"
              icon={
                <img alt="" className="size-10 max-w-none shrink-0" src="/billing-assets/guide-scheduled-task.png" />
              }
              nextLabel="知道了"
              title="定时自动任务"
            />
            <GuideBubble
              arrow="bottom"
              desc="用量、订单和到期时间都在这里查看"
              icon={<img alt="" className="size-10 max-w-none shrink-0" src="/billing-assets/guide-model-orders.png" />}
              title="查看模型订单"
            />
          </div>
        </Section>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary label="components-gallery">
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <ThemeProvider>
            <Gallery />
          </ThemeProvider>
        </I18nProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
)
