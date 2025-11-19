# 开发指南

## 项目结构

```
JobPilot/
├── src/                    # 源代码目录（模块化开发）
│   ├── index.js           # 主入口文件
│   ├── config.js          # 配置管理
│   ├── state.js           # 状态管理
│   ├── utils.js           # 工具函数
│   ├── ui.js              # UI 组件
│   ├── core.js            # 核心业务逻辑
│   ├── letter.js          # 欢迎信模块
│   ├── guide.js           # 引导模块
│   └── settings.js        # 设置模块
├── main.js                # 旧版主文件（包含油猴元数据）
├── JOBPILOT.js            # 构建产物（发布用单文件）
├── rollup.config.js       # Rollup 构建配置
├── package.json           # 项目配置
└── DEVELOPMENT.md         # 本文档
```

## 开发工作流

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

**推荐：使用模块化开发**

在 `src/` 目录下编辑你的代码，每个模块独立维护：

- `src/config.js` - 修改配置
- `src/ui.js` - 调整界面
- `src/core.js` - 核心逻辑
- 等等...

### 3. 构建打包

**一次性构建：**
```bash
npm run build
```

**监听模式（开发时自动重新构建）：**
```bash
npm run dev
```

这会自动将 `src/` 下的所有模块打包成单个 `JOBPILOT.js` 文件。

### 4. 测试油猴脚本

1. 运行 `npm run build` 打包
2. 在浏览器中安装 Tampermonkey 扩展
3. 导入生成的 `JOBPILOT.js`
4. 访问 BOSS 直聘测试功能

## 文件说明

### main.js

包含油猴脚本的元数据头部（`// ==UserScript==`），构建时会自动提取这些元数据并添加到 `JOBPILOT.js`。

**如需修改脚本元数据（版本号、描述等）：**
编辑 `main.js` 的头部，然后重新构建。

### rollup.config.js

Rollup 构建配置文件，负责：
- 将 `src/` 下的所有模块打包成单文件
- 自动提取 `main.js` 的油猴元数据
- 清理不需要的 `@require` 行（已打包的模块）

### src/ 目录

所有模块都通过 `window` 对象导出全局变量，兼容油猴脚本环境。

**添加新模块：**

1. 在 `src/` 下创建新文件，例如 `src/analytics.js`
2. 在文件末尾导出：
   ```javascript
   window.Analytics = Analytics;
   ```
3. 在 `src/index.js` 中导入：
   ```javascript
   import './analytics.js';
   ```
4. 运行 `npm run build` 重新打包

## 常见问题

### Q: 为什么要模块化？
A: 单个几千行的文件难以维护。模块化让代码结构清晰，职责分明，便于多人协作。

### Q: 构建后的 JOBPILOT.js 还需要提交到 Git 吗？
A: 看你的需求：
- **如果你只是开发**：不需要提交，`.gitignore` 已忽略
- **如果你要发布**：建议提交，方便用户直接下载使用

### Q: 如何调试？
A:
1. 使用 `npm run dev` 监听模式
2. 修改 `src/` 下的代码会自动重新打包
3. 在浏览器中刷新页面即可看到效果

### Q: 我想压缩代码怎么办？
A: 编辑 `rollup.config.js`，取消注释 `@rollup/plugin-terser` 插件：

```javascript
import { terser } from '@rollup/plugin-terser';

export default {
  // ...
  plugins: [
    nodeResolve(),
    commonjs(),
    userscriptBanner(),
    terser() // 添加压缩插件
  ]
};
```

## 发布流程

1. 修改 `main.js` 中的版本号
2. 运行 `npm run build` 打包
3. 测试 `JOBPILOT.js` 功能正常
4. 提交代码：`git add . && git commit -m "feat: 新功能描述"`
5. 发布到 Greasy Fork 或其他油猴脚本平台

## 技术栈

- **Rollup** - 模块打包工具
- **ES6 Modules** - 现代 JavaScript 模块系统
- **Tampermonkey** - 油猴脚本运行环境

---

Happy Coding! 🚢
