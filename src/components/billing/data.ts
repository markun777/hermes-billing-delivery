// Demo data for the gallery — mirrors the Figma spec so the preview matches design.
import type {
  HomePreset,
  ModelOption,
  ModelPanelState,
  ModelUsage,
  OrderRecord,
  PackageTier,
  PaymentOrder,
  QuotaPackage,
  ScenarioItem
} from './types'

const PACKAGE_DESC = '8个主流模型\n推理速度快、延迟低，适合日常对话、内容创作、批量文案处理等普惠场景'

export const demoPackages: PackageTier[] = [
  {
    id: 'p0',
    name: '轻享版',
    price: 29,
    subtitle: '适合新手入门',
    validity: '有效期从购买起 1 个月',
    badges: [{ label: '8折', tone: 'blue' }],
    features: ['轻松入门AI', '日常问答，一键搞定', '看图识别，省时省力']
  },
  {
    id: 'p1',
    name: '标准版',
    price: 39,
    subtitle: '适合职场办公',
    validity: '有效期从购买起 1 个月',
    badges: [{ label: '7折', tone: 'blue' }],
    features: ['性价比之选', '文档处理，效率翻倍', '截图识别，一步到位']
  },
  {
    id: 'p2',
    name: '专业版',
    price: 59,
    subtitle: '适合内容生成',
    validity: '有效期从购买起 1 个月',
    badges: [{ label: '推荐', tone: 'amber' }, { label: '6折', tone: 'blue' }],
    highlighted: true,
    features: ['创作效率翻倍', '图片/视频/音频全模态生成', '开发者+创作者首选']
  },
  {
    id: 'p3',
    name: '旗舰版',
    price: 99,
    subtitle: '适合重度AI用户',
    validity: '有效期从购买起 1 个月',
    badges: [{ label: '5.5折', tone: 'blue' }],
    features: ['能力无上限', '图片/视频/音频全模态生成', '全模型5.5折省到底']
  }
]

export const demoQuotas: QuotaPackage[] = [
  {
    id: 'q0',
    name: '套餐一',
    usedPct: 27.7,
    remainingYuan: 21.69,
    tokenUsed: 2_768_000,
    expiry: '2026-07-01',
    tone: 'blue'
  },
  { id: 'q1', name: '新人专享', usedPct: 0, remainingYuan: 10, tokenUsed: 0, expiry: '2026-07-29', tone: 'orange' },
  {
    id: 'q2',
    name: '套餐二',
    usedPct: 86,
    remainingYuan: 2.74,
    tokenUsed: 21_300_000,
    expiry: '2026-06-21',
    tone: 'blue'
  },
  {
    id: 'q3',
    name: '套餐一',
    usedPct: 27.7,
    remainingYuan: 21.69,
    tokenUsed: 2_768_000,
    expiry: '2026-07-01',
    tone: 'blue',
    purchases: [
      {
        id: 'q3-order-1',
        usedPct: 27.7,
        remainingYuan: 21.69,
        tokenUsed: 2_768_000,
        expiry: '2026-07-01'
      },
      {
        id: 'q3-order-2',
        usedPct: 8,
        remainingYuan: 27.6,
        tokenUsed: 780_000,
        expiry: '2026-07-29'
      }
    ]
  }
]

export const demoScenarios: ScenarioItem[] = [
  { id: 's0', title: '一键生成 PPT', desc: '给个主题，自动搜资料、配图排版，直接出成稿' },
  { id: 's1', title: '长文 PDF 速读', desc: '丢进文档，自动梳理脉络、提取重点与引用' },
  { id: 's2', title: '旅行行程规划', desc: '说清目的地和天数，自动排路线、交通与预算' },
  { id: 's3', title: '会议纪要整理', desc: '上传录音或文字，自动提炼要点、待办与结论' }
]

export const demoHomePresets: HomePreset[] = [
  {
    id: 'home-presentation',
    title: '做个介绍你自己的PPT',
    desc: '自动搜集信息、设计内容、编辑排版，直接交付结果',
    iconSrc: '/billing-assets/preset-presentation.svg'
  },
  {
    id: 'home-files',
    title: '整理电脑文件',
    desc: '本地文件自动管理，文档自动编辑，让系统时刻整洁',
    iconSrc: '/billing-assets/preset-files.svg'
  },
  {
    id: 'home-calendar',
    title: '智能日程安排',
    desc: '自动规划行程、提醒待办事项，合理安排时间',
    iconSrc: '/billing-assets/preset-calendar.svg'
  }
]

export const demoModelOptions: ModelOption[] = [
  { id: 'deepseek-v45-pro', label: 'Deepseek V4.5 Pro' },
  { id: 'qwen3-max', label: 'Qwen3 Max' },
  { id: 'claude-sonnet-46', label: 'Claude Sonnet 4.6' },
  { id: 'kimi-k2', label: 'Kimi K2' },
  { id: 'glm-46', label: 'GLM-4.6' },
  { id: 'gpt-41', label: 'GPT-4.1' }
]

export const demoModelPanel: ModelPanelState = {
  tierName: '套餐一',
  modelName: 'Deepseek V4.5 Pro',
  usedPct: 27.7
}

export const demoModels: ModelUsage[] = [
  { id: 'm0', name: 'DeepSeek V4.5 Pro', tokens: '1,240 万 Token', cost: '¥6.96', pct: 94, discount: '6折' },
  { id: 'm4', name: 'GLM-4.6', tokens: '540 万 Token', cost: '¥0.28', pct: 27 }
]

export const demoOrders: OrderRecord[] = [
  {
    id: 'hermes_e886f97053240cb9_7',
    time: '2026/5/29 20:27:33',
    status: 'pending',
    payMethod: '微信/支付宝',
    amount: '¥10.00',
    paid: '¥10.00',
    invoiced: false
  },
  {
    id: 'hermes_34f40ea4a0f04fd6_7',
    time: '2026/5/29 19:11:27',
    status: 'success',
    payMethod: '微信/支付宝',
    amount: '¥20.00',
    paid: '¥20.00',
    invoiced: false
  },
  {
    id: 'hermes_e35dd851da9062e4_7',
    time: '2026/5/29 19:02:32',
    status: 'success',
    payMethod: '微信/支付宝',
    amount: '¥30.00',
    paid: '¥30.00',
    invoiced: true
  }
]

export const demoPaymentOrder: PaymentOrder = {
  title: 'Hermes 套餐扫码支付',
  subtitle: '请使用手机扫码完成支付',
  amount: '¥30',
  payable: '¥30',
  qrSrc: '/billing-assets/payment-qr.svg',
  statusLabel: '等待支付...',
  payMethod: '微信/支付宝',
  orderId: 'hermes_7FA043A4B4662E75_1717',
  expiresAt: '2026/6/18 18:49:31'
}

// Discover panel demo data
export interface DiscoverTab {
  id: string
  label: string
}

export const demoDiscoverTabs: DiscoverTab[] = [
  { id: 'recommend', label: '推荐' },
  { id: 'content', label: '内容创作' },
  { id: 'office', label: '办公协同' },
  { id: 'education', label: '学习提升' },
  { id: 'info', label: '信息处理' },
  { id: 'decision', label: '决策分析' },
  { id: 'lifestyle', label: '生活娱乐' },
  { id: 'automation', label: '自动任务' }
]

export const demoDiscoverScenarios: ScenarioItem[] = [
  { id: 'ds0', title: '一键生成 PPT', desc: '给个主题，自动搜资料、配图排版，直接出成稿' },
  { id: 'ds1', title: '长文 PDF 速读', desc: '丢进文档，自动梳理脉络、提取重点与引用' },
  { id: 'ds2', title: '旅行行程规划', desc: '说清目的地和天数，自动排路线、交通与预算' },
  { id: 'ds3', title: '会议纪要整理', desc: '上传录音或文字，自动提炼要点、待办与结论' },
  { id: 'ds4', title: '知识点讲解', desc: '不懂就问，拆成大白话加例子，一步步教会你' },
  { id: 'ds5', title: '菜谱与采购单', desc: '报一下人数口味，自动配菜谱、列采购清单' },
  { id: 'ds6', title: '数据报表分析', desc: '导入表格自动清洗汇总，生成图表和结论' },
  { id: 'ds7', title: '错题归纳复习', desc: '拍照上传错题，自动讲解并生成同类练习' },
  { id: 'ds8', title: '图文文案创作', desc: '给张图或一句话，自动配多版风格文案' },
  { id: 'ds9', title: '文件批量整理', desc: '本地文件自动归类重命名，让系统时刻整洁' },
  { id: 'ds10', title: '外语陪练翻译', desc: '实时翻译对话、纠正语法，陪你练口语' },
  { id: 'ds11', title: '健身计划定制', desc: '说明目标与时间，定制每周训练和饮食安排' },
  { id: 'ds12', title: '周报邮件代写', desc: '说清要点，自动写好周报或邮件，语气随心调' },
  { id: 'ds13', title: '智能日程安排', desc: '自动规划行程、提醒待办，合理安排每一天' }
]
