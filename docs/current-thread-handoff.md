# Hermes 官方客户端产品线：当前上下文与线程交接

更新时间：2026-06-23（Asia/Shanghai）

## 项目路径

```
~/Hermes Agent/Hermes/official-client/    ← 工作仓库
~/Hermes Agent/hermes-billing-delivery/   ← 交付件（同步最新）
```

## 仓库信息

- 上游：`https://github.com/NousResearch/hermes-agent.git`
- 分支：`main`
- 远程：`origin`
- 不要往上游直接 push；交付件独立于仓库

## Figma 设计源

- 文件：`https://www.figma.com/design/g245htzpkqolJakO6vubRU/Hermes`
- 架构入口：`39:694`
- 额度卡多次购买：`194:2315`
- 发现页：`118:11932`
- 套餐卡：`39:907`

## 代码入口

- `apps/desktop/src/app/index.tsx` — 主应用
- `apps/desktop/src/components/billing/` — 15 个产品组件
- `apps/desktop/src/demo/components-gallery.tsx` — 组件库 Gallery
- `apps/desktop/components-gallery.html` — Gallery 入口 HTML
- `apps/desktop/public/billing-assets/` — 图标图片资源

## 组件清单（15 个）

| 组件                     | 文件                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| ModelPanel               | 侧栏模型选择面板（含 Figma 图标、下拉箭头状态切换）                                            |
| ModelDropdown            | 模型下拉列表（gap-0.5 间距）                                                                   |
| HomeContent              | 首页场景预设                                                                                   |
| **PackageCard**          | 套餐卡（已按 Figma 39:907 同步：桌面 4 卡横排、窄屏自动换行、内容自动换行并撑高、选中态 1px 描边、卡内 20px/24px 间距、badge 24px/12px、check 图标 features） |
| PayCard                  | 支付卡（min-h-[560px]、关闭按钮 #94A3B8 hover 圆形底）                                         |
| QuotaCard                | 额度卡（多次购买 80px 行高、justify-center 对齐、单卡 104px 无回归）                           |
| **QuotaExhaustedBanner** | 额度用完状态条（780×44、独立 info/close 切图、支持打开充值套餐和关闭）                         |
| ConsumptionList          | 模型用量排行（自适应高度，默认模型图标，指标列顺序为费用 / Token）                             |
| OrderCard                | 历史订单列表行（Figma 115:5912，8px 列表间距、12px 字段标签、14px 字段值、88px 开票按钮槽位）  |
| ScenarioCard             | 发现场景卡（w-full min-w-0 max-w-[360px]）                                                     |
| GuideBubble              | 新手引导气泡                                                                                   |
| **DiscoverPanel**        | 发现页（8 Tab + 14 场景卡 Grid 布局）                                                          |
| types.ts                 | 共享类型（含 PackageBadge、QuotaPurchase 等）                                                  |
| data.ts                  | Gallery 演示数据（demoPackages 已更新为轻享版/标准版/专业版/旗舰版）                           |
| index.ts                 | 统一导出                                                                                       |

## 启动方式

```bash
cd ~/Hermes\ Agent/Hermes/official-client/apps/desktop
npm run dev:renderer
# 浏览器打开 http://127.0.0.1:5174/components-gallery.html
```

⚠️ 不能直接双击 HTML 文件，必须通过 Vite dev server。

## Gallery 布局要点

- 外层容器：无 max-w 限制，跟浏览器宽度自适应
- Section 使用 `flex flex-wrap` 布局子组件
- ScenarioCard 和 DiscoverPanel 内的场景卡使用 CSS Grid `repeat(auto-fill, minmax(224px, 1fr))` 保证等宽
- PackageCard 场景示例：外层 `pt-20`(80px)、`pb-[106px]`、`px-12`(48px)、标题组含 16px 副标题、标题组到卡片 `gap-[80px]`、卡片网格 `repeat(auto-fit,minmax(220px,1fr))`

## 交付件

`~/Hermes Agent/hermes-billing-delivery/` — 含 README 接入说明。每次修改组件后需同步并推送 GitHub。

## Git 状态

- `README.md` 有修改
- `apps/desktop/src/components/billing/`、`src/demo/`、`public/billing-assets/`、`docs/` 为未跟踪新文件
- `node_modules` 未跟踪
- 不要 `git reset --hard` 或 `git clean`

## 工作记忆

- `/Users/markun/.claude/projects/-Users-markun/memory/MEMORY.md`
- `/Users/markun/.claude/projects/-Users-markun/memory/token-hub-design-delivery.md`（Token Hub，非本项目）

## 新线程开场指令

> 继续 `~/Hermes Agent/Hermes/official-client`。先读取 `docs/current-thread-handoff.md`。保留所有未提交改动。启动 `npm run dev:renderer` 访问 `http://127.0.0.1:5174/components-gallery.html`。Figma 文件 `g245htzpkqolJakO6vubRU`。
