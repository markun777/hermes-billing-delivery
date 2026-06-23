# Hermes Billing 组件库交付件

基于 Nous Research Hermes Agent 官方客户端，新增的模型套餐、支付、额度、用量和订单组件。

## 交付内容

```
hermes-billing-delivery/
├── src/components/billing/   # 15 个 React 组件 + 类型 + 数据
├── src/demo/                 # Gallery 预览页面源码
├── public/billing-assets/    # Figma 导出的图标和图片资源
├── components-gallery.html   # 组件库预览入口（需 dev server）
├── docs/                     # 产品文档
└── README.md                 # 本文件（含接入步骤）
```

## 组件清单

| 组件                 | 文件                       | 说明                                 |
| -------------------- | -------------------------- | ------------------------------------ |
| ModelPanel           | `ModelPanel.tsx`           | 侧栏模型选择面板                     |
| ModelDropdown        | `ModelDropdown.tsx`        | 模型下拉列表                         |
| HomeContent          | `HomeContent.tsx`          | 首页场景预设                         |
| PackageCard          | `PackageCard.tsx`          | 套餐卡                               |
| PayCard              | `PayCard.tsx`              | 支付卡及支付状态                     |
| QuotaCard            | `QuotaCard.tsx`            | 额度卡（支持同行多次购买）           |
| QuotaExhaustedBanner | `QuotaExhaustedBanner.tsx` | 额度用完状态条（支持充值入口和关闭） |
| ConsumptionList      | `ConsumptionList.tsx`      | 模型用量排行                         |
| OrderCard            | `OrderCard.tsx`            | 订单与开票                           |
| ScenarioCard         | `ScenarioCard.tsx`         | 发现场景卡                           |
| GuideBubble          | `GuideBubble.tsx`          | 新手引导气泡                         |
| DiscoverPanel        | `DiscoverPanel.tsx`        | 发现页（Tab + 场景网格）             |
| types.ts             | `types.ts`                 | 共享类型定义                         |
| data.ts              | `data.ts`                  | Gallery 演示数据                     |
| index.ts             | `index.ts`                 | 统一导出                             |

## 接入步骤

### 1. 复制文件

将本交付件中的目录合并到 `apps/desktop/` 下：

```bash
cp -r src/components/billing/   apps/desktop/src/components/billing/
cp -r src/demo/                  apps/desktop/src/demo/
cp -r public/billing-assets/     apps/desktop/public/billing-assets/
cp    components-gallery.html    apps/desktop/
```

### 2. 依赖

组件使用以下已有依赖，不需要额外安装：

- React 18+
- Tailwind CSS v4（`@tailwindcss/vite`）
- `lucide-react`（仅 `PayCard.tsx` 使用 `Check`、`Copy`、`LoaderCircle`）
- `@/lib/utils` 中的 `cn()` 工具函数

### 3. 启动预览

> **⚠️ 不能直接双击 HTML 文件打开！** 组件源码是 TypeScript + Tailwind，依赖 Vite 编译和 `@/` 路径别名，必须通过开发服务器访问。

```bash
cd apps/desktop
npm run dev:renderer
```

浏览器打开以下地址查看：

| 页面           | 地址                                            |
| -------------- | ----------------------------------------------- |
| 组件库 Gallery | `http://127.0.0.1:5174/components-gallery.html` |

### 4. 组件使用

```tsx
import {
  QuotaCard,
  QuotaExhaustedBanner,
  PackageCard,
  PayCard /* ... */,
} from "@/components/billing";
import {
  demoQuotas,
  demoPackages,
  demoPaymentOrder,
} from "@/components/billing/data";
```

## Figma 设计源

- 文件：`https://www.figma.com/design/g245htzpkqolJakO6vubRU/Hermes`
- 架构入口节点：`39:694`
- 额度卡多次购买节点：`194:2315`
- 额度用完提示条节点：`371:2308`

## 注意事项

- 组件使用 `--ui-*` CSS 变量，依赖官方客户端的主题 token 体系
- 图标资源来自 Figma 导出，如需替换请从 Figma 重新下载
- `data.ts` 为演示数据，接入后替换为真实数据源
- 字体使用 `Noto Sans SC`（进度条百分比等），确保项目中已加载
