# Repository Guidelines

## 项目结构与模块组织
`src/` 集中所有可维护模块：`core.js` 驱动自动投递、`ui.js` 渲染控制面板、`state.js` 管理本地存储、`utils.js` 提供 DOM/异步工具、`settings.js` 与 `config.js` 统一配置，各文件互相通过 ES Modules 导入，便于重用；`docs/` 承载流程文档与数据格式说明，`预览图/` 存放交互截图；根目录保留打包入口 `main.js`、成品脚本 `JOBPILOT.js`、构建脚本 `rollup.config.js`、以及 `README*.md`，提交前请确认目录结构未被破坏。

## 构建、测试与开发命令
- `npm install`：同步依赖，要求 Node 18+ 与 npm 10+。
- `npm run build`：使用 Rollup 打包并应用 Terser 压缩，输出供 Tampermonkey 导入的最终脚本，亦是 CI 必选步骤。
- `npm run dev`：开启 watch 模式，每次保存 `src/` 文件都会触发增量构建，结合浏览器脚本管理器热刷新验证界面交互。
- `npm run test`：目前故意返回非零，提醒尚未补齐自动化测试；在引入测试框架后请更新脚本内容。

## 架构与依赖
整体构建链路基于 Rollup incremental pipeline，`@rollup/plugin-node-resolve` 负责定位 ES Modules，`@rollup/plugin-commonjs` 处理第三方 CommonJS 依赖，`@rollup/plugin-terser` 则输出生产可用的压缩脚本；`rollup-plugin-string` 用于内联模版与 SVG，避免额外的网络请求；模块之间遵循自上而下的数据流：`core.js` 调用 `state.js` 与 `utils.js`，`ui.js` 订阅状态后刷新 DOM，而 `guide.js`、`letter.js` 等辅助文件提供富文本模板；新增依赖前请确认同类功能是否能通过已有工具实现，若必须引入，记得在 `package.json` 与 `rollup.config.js` 同步更新并验证 bundle 体积。

## 代码风格与命名约定
统一使用 2 空格缩进与 `;` 结尾，保持 `camelCase` 函数/变量、`PascalCase` 组件类、`UPPER_SNAKE` 常量；公共配置放在 `config.js`，不要在业务文件硬编码；若新增工具函数，优先扩展 `utils.js` 并编写注释说明调用场景；暂未引入 ESLint/Prettier，提交前请自检 import 顺序、可空值保护、Promise 错误处理，并运行 `npm run build` 作为风格与语法兜底检查。

## UI 样式规范
视觉语言详见 `docs/style.md`：标题/CTA 全部使用 Aeonik Mono 大写，正文沿用 Inter 16px/140%；页面背景以奶油色 `#F4EFEA` 搭配 2px 木炭色描边与透明网格纹理，卡片为白底 + 24/32px 间距，Hover 时按钮描边切换至 `#2BA5FF`；容器宽度遵循 `.kHNfYW` 断点（728→960→1302px），垂直节奏维持 4px 栅格（常见栈 40/60/90/120px）；颜色层级以 `ink #383838`、`cta-blue #6FC2FF`、`cta-yellow #FFDE00` 为核心，深色区块则反转为白字；新增 UI 时请沿用现有卡片、徽章、CTA 样式，避免引入阴影、渐变或自定义圆角，保持 MotherDuck 风格的一致性。


## 安全与配置提示
`config.js`、`settings.js` 中的选择器或 API Key 仅存占位符，真实密钥必须放在浏览器插件私有存储或环境变量，不可入库；在 `state.js` 更新字段时，请编写迁移逻辑，避免老用户数据格式错误；若要调用第三方接口，提前评估速率限制并在 README 中记录配置样例及失败回退策略，确保脚本运行稳定。

## Agent 协作提示
多位贡献者并行开发时，应在 Issue 中写明负责人、预计交付时间与被影响的模块，避免 `core.js`、`ui.js` 发生冲突；每日提交前执行 `git pull --rebase origin main`，保持 commit 历史紧凑且易读；遇到需求不明确时优先同步到讨论区，而不是凭猜测改动逻辑；交接给下一位 Agent 前，至少记录当前环境、可复现命令、浏览器脚本版本以及临时调试脚本位置，并在 PR 里附上 `Steps to verify` 清单，确保后续同伴可以直接复用这些信息完成验证；如需 QA 支持，请附带 script hash、浏览器版本与 Tampermonkey profile，便于比对差异。
