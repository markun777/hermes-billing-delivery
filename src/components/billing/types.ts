// Shared types for the Hermes billing / model-package component library.
// These are the product-line additions layered on top of the official client.

export type BadgeTone = 'hot' | 'popular'

export interface PackageBadge {
  label: string
  tone?: 'blue' | 'amber'
}

export interface PackageTier {
  id: string
  /** Display name, e.g. "轻享版" / "专业版". */
  name: string
  /** Price in yuan. */
  price: number
  /** Short subtitle, e.g. "适合新手入门". */
  subtitle: string
  /** Validity description, e.g. "有效期从购买起 1 个月". */
  validity?: string
  /** Discount / label badges (supports multiple). */
  badges?: PackageBadge[]
  /** Feature bullets (rendered with check icons). */
  features?: string[]
  /** Emphasized card (blue border instead of gray). */
  highlighted?: boolean
}

export type QuotaTone = 'blue' | 'orange'

export interface QuotaPurchase {
  id: string
  /** Used percentage for this purchase, 0–100. */
  usedPct: number
  /** Remaining budget for this purchase in yuan. */
  remainingYuan: number
  /** Cumulative token usage for this purchase. */
  tokenUsed: number
  /** Expiry display string, e.g. "2026-07-01". */
  expiry: string
  /** Optional per-purchase progress-bar tone. */
  tone?: QuotaTone
}

export interface QuotaPackage {
  id: string
  /** Package name, e.g. "套餐一" / "新人专享". */
  name: string
  /** Used percentage, 0–100. */
  usedPct: number
  /** Remaining budget in yuan (formatted by the caller is also fine). */
  remainingYuan: number
  /** Cumulative token usage (raw number). */
  tokenUsed: number
  /** Expiry display string, e.g. "2026-07-01". */
  expiry: string
  /** Progress-bar tone. */
  tone?: QuotaTone
  /**
   * Purchase batches for the same package. When present, QuotaCard keeps one
   * card shell and appends one aligned detail row for every purchase.
   */
  purchases?: QuotaPurchase[]
}

export interface ScenarioItem {
  id: string
  title: string
  desc: string
}

export interface HomePreset extends ScenarioItem {
  /** Public asset path for the Figma-owned preset icon. */
  iconSrc: string
}

export interface ModelOption {
  id: string
  label: string
  disabled?: boolean
}

export interface ModelPanelState {
  tierName: string
  modelName: string
  usedPct: number
}

export interface ModelUsage {
  id: string
  name: string
  /** Display token count, e.g. "1,240 万 Token". */
  tokens: string
  /** Display cost, e.g. "¥0.96". */
  cost: string
  /** Bar fill percentage relative to the top model, 0–100. */
  pct: number
  /** Optional discount tag, e.g. "6折". */
  discount?: string
}

export type OrderStatus = 'pending' | 'success' | 'failed'

export interface OrderRecord {
  id: string
  time: string
  status: OrderStatus
  payMethod: string
  amount: string
  paid: string
  invoiced: boolean
}

export interface PaymentOrder {
  title: string
  subtitle: string
  amount: string
  payable: string
  qrSrc: string
  statusLabel: string
  payMethod: string
  orderId: string
  expiresAt: string
}
