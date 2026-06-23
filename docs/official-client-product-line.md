# Hermes 官方客户端产品 Demo 线

## 背景

这一产品线从旧的自研 workbench demo 切换到 Hermes 官方客户端源码。旧方向已经在原 `hermes-workbench-demo` 仓库中打包归档，只作为历史参考，不再作为实现基线。

新的目标不是重新画一个 Hermes，也不是做一个独立 Web 壳，而是在官方 Hermes Agent 桌面客户端上增加产品化模型能力。

## 目标

在保持官方客户端信息架构和视觉规范的前提下，新增一层面向普通用户的模型产品入口：

- 模型激活
- 套餐选择
- 模型选择和切换
- 模型额度消耗展示
- 额度使用信息弹窗
- 充值弹窗

## Figma 结论

Figma 文件：

- `https://www.figma.com/design/g245htzpkqolJakO6vubRU/Hermes?node-id=39-694`

页面 `官方架构` 不是一张单独页面，而是一组 1220x800 的桌面客户端状态稿。它的核心含义是：复用官方 Hermes Agent 桌面客户端外壳，只在左侧栏新增模型产品化模块，并补充相关弹层。

当前关键状态：

- `模型未配置`：左栏出现 `模型选择` 标题和 `激活模型` 按钮。
- `模型已配置`：左栏展示 `套餐一`、`Deepseek V4.5 Pro`、`模型额度总消耗 27%`。
- `模型选择`：点击模型项后出现下拉列表。
- `额度使用信息`：点击额度信息后出现全屏级用量弹窗。
- `充值弹窗`：出现遮罩和全屏级充值占位页。

## 实现原则

- 以 Hermes 官方客户端为唯一代码基线。
- 保持 1220x800 桌面客户端 demo 尺寸，与 Figma 状态稿一致。
- 保留官方客户端窗口、侧栏、背景、中心欢迎区、输入框和底部状态栏。
- 复用官方客户端已有 React 组件、样式、图标、字体和主题变量。
- 不手绘一套平行 UI，不把旧 demo 的样式系统迁移进来。
- 旧 demo 中可复用的是产品意图、场景文案和少量交互假设，不直接迁移旧代码。
- 新增能力优先拆成官方客户端内的前端模块，例如 `ModelProductPanel`、`ModelSelector`、`QuotaUsageDialog`、`RechargeDialog`。

## 当前代码基线

- 上游仓库：`https://github.com/NousResearch/hermes-agent.git`
- 当前本地基线提交：`7cd71de1f45b060b1404b2f0c5bf4cb4305dd716`
- 截图中运行版本提交：`95715dcb03003eab086eb0494083e6dc1c65f3b3`
- 关系：截图提交是当前 `main` 的历史祖先；如需完全复刻截图版本，可切回 `95715dcb03003eab086eb0494083e6dc1c65f3b3`。

主要前端入口：

- 桌面客户端：`apps/desktop/src/`
- 桌面客户端入口：`apps/desktop/src/app/index.tsx`
- 当前 demo 预览入口：`apps/desktop/demo-preview.html`
- 当前 demo 预览源码：`apps/desktop/src/demo/`

## 当前方案修正

此前的静态 HTML 预览属于重绘方向，不能作为后续实现标准。当前已经改为基于官方客户端前端代码建立 demo 入口：

- 引入官方 `styles.css`、主题、i18n、按钮、搜索框、图标和输入框 chrome。
- 只用少量 demo CSS 固定 1220x800 画布和 Figma 状态布局。
- 后续继续把模型产品区收敛成官方客户端内可复用的组件，而不是扩大 demo-only 样式。

## 下一步

1. 将 Figma 中的左侧模型产品区拆成正式 React 组件。
2. 接入可切换的 mock state：未配置、已配置、下拉、额度弹窗、充值弹窗。
3. 对照官方客户端真实 Sidebar 组件，进一步减少 demo-only DOM。
4. 用浏览器截图校验 1220x800 状态是否贴近 Figma。
