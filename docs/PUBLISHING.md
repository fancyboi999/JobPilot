# 📦 发布到 Greasy Fork 指南

本指南将指导你如何将 **JOBPILOT 投递助手** 发布到 [Greasy Fork](https://greasyfork.org/) 脚本市场。

## ✅ 发布前检查

在发布之前，请确保：

1.  **代码已构建**：确保你已经运行了 `npm run build`，并且 `JOBPILOT.js` 是最新的。
2.  **版本号更新**：检查 `main.js` 中的 `// @version` 是否是你想要发布的版本号。
3.  **代码已推送**：确保所有的更改（包括 `JOBPILOT.js`）都已经 Push 到 GitHub 仓库。

## 🚀 发布步骤

Greasy Fork 支持从 GitHub 自动同步，这是最推荐的方式，因为这样后续更新只需 Push 代码即可自动更新到市场。

### 方法一：从 GitHub 导入（推荐）

1.  **注册/登录**：访问 [Greasy Fork](https://greasyfork.org/zh-CN) 并登录账号。
2.  **发布脚本**：点击右上角的用户名，选择“控制台”，然后点击“发布新脚本”。
3.  **选择导入**：
    *   在“从 URL 导入”一栏中。
    *   输入你的 `JOBPILOT.js` 的 **GitHub Raw 链接**。
    *   链接格式通常为：`https://raw.githubusercontent.com/fancyboi999/JobPilot/main/JOBPILOT.js` (请确认分支名是 `main` 还是 `Boss` 或其他)。
4.  **确认信息**：
    *   Greasy Fork 会自动读取脚本中的元数据（名称、描述、版本等）。
    *   确认无误后点击“发布脚本”。
5.  **设置自动同步**（可选但推荐）：
    *   发布成功后，在脚本管理页面找到“管理/设置”。
    *   勾选“自动更新”，这样当你向 GitHub 推送新代码时，Greasy Fork 会自动抓取更新。

### 方法二：手动复制粘贴

1.  打开本地的 `JOBPILOT.js` 文件，全选并复制所有代码。
2.  在 Greasy Fork 点击“发布新脚本”。
3.  将代码粘贴到编辑器文本框中。
4.  点击“发布脚本”。

## ⚠️ 注意事项

*   **外部依赖**：Greasy Fork 对 `@require` 和 `@resource` 有严格限制。
    *   我们的构建脚本 (`rollup.config.js`) 已经处理了这一点，它将源码打包到了一个文件中，只保留了允许的 CDN (crypto-js)。
    *   **不要**在发布版中包含指向 GitHub Raw 的 `@require` 链接（构建脚本会自动移除开发用的这些链接，所以直接用 `JOBPILOT.js` 没问题）。
*   **代码压缩**：Greasy Fork 要求代码可读。我们的构建配置没有使用混淆压缩（Minify），所以生成的代码是可读的，符合要求。
*   **版权协议**：确保 `// @license` 字段正确（当前为 AGPL-3.0）。

## 🔄 如何更新

如果你配置了 GitHub 同步：
1.  修改代码。
2.  更新 `main.js` 中的版本号 (`// @version`)。
3.  运行 `npm run build`。
4.  提交并 Push 到 GitHub。
5.  Greasy Fork 会在几小时内自动更新，或者你可以去脚本页面手动点击“强制更新”。
