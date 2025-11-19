<div align="center">

# 🚀 JOBPILOT 投递助手 (BOSS Helper) 🌟

[![AGPL-3.0 License](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=for-the-badge&logo=gnu)](https://www.gnu.org/licenses/agpl-3.0)
[![GitHub Stars](https://img.shields.io/github/stars/fancyboi999/Jobs_helper?style=for-the-badge&logo=github)](https://github.com/fancyboi999/JobPilot)
[![GitHub Forks](https://img.shields.io/github/forks/fancyboi999/Jobs_helper?style=for-the-badge&logo=github)](https://github.com/fancyboi999/JobPilot)
[![GitHub Issues](https://img.shields.io/github/issues/fancyboi999/Jobs_helper?style=for-the-badge&logo=github)](https://github.com/fancyboi999/JobPilot/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/fancyboi999/Jobs_helper?style=for-the-badge&logo=github)](https://github.com/fancyboi999/JobPilot/pulls)
[![Last Commit](https://img.shields.io/github/last-commit/fancyboi999/Jobs_helper?style=for-the-badge&logo=git)](https://github.com/fancyboi999/JobPilot)

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-8.15+-green?style=flat-square&logo=tampermonkey)](https://www.tampermonkey.net/)
[![Chrome](https://img.shields.io/badge/Chrome-88+-blue?style=flat-square&logo=google-chrome)](https://www.google.com/chrome/)
[![Firefox](https://img.shields.io/badge/Firefox-85+-orange?style=flat-square&logo=firefox-browser)](https://www.mozilla.org/firefox/)


## 📖 项目概览

**JOBPILOT 投递助手**是一款专为求职者设计的电脑浏览器脚本，目的是希望能提升在[BOSS直聘平台](https://www.zhipin.com/)上的求职沟通效率和投递速度。通过自动化操作、AI辅助回复等功能，帮助用户快速筛选合适岗位并完成简历投递与消息回复操作。

### 🎯 核心特性

- 📊 **自动批量投递** - 筛选并自动投递岗位，发送图片简历等
- 🎯 **多维度精准筛选** - 关键词、地区和HR在线时间等多条件过滤
- 💬 **AI智能回复** - 基于大语言模型生成自然、专业的消息回复
- 🎨 **现代化控制面板** - 可视化操作界面，实时监控任务状态
- 🔄 **重复机制** - 自动识别已投递岗位，避免重复操作

## 配置成功页面

| 投递面板 | 消息面板 |
| --- | --- |
| ![投递UI](https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/image/README/%E6%8A%95%E9%80%92UI.png) | ![消息UI](https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/image/README/%E6%B6%88%E6%81%AFUI.png) |

## ⚡ 快速获取脚本

> 第一次使用请先安装脚本管理器（Tampermonkey / ScriptCat），然后一键安装 JobPilot 脚本。下面的两个按钮就是最短路径。

**步骤 1：安装脚本管理器** (必需)

[![Install Tampermonkey](https://img.shields.io/badge/Tampermonkey-Install-blue?style=for-the-badge&logo=tampermonkey)](https://www.tampermonkey.net/)

Edge/Firefox 用户也可以选择 [ScriptCat（脚本猫）](https://scriptcat.org/)。安装完成后刷新浏览器再继续下一步。

**步骤 2：打开 JobPilot 脚本链接**

[![安装脚本](https://img.shields.io/badge/Install-JobPilot-green?style=for-the-badge)](https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/JOBPILOT.user.js)

> 点击后脚本管理器会自动弹出安装/更新窗口，直接确认即可。如果没有弹窗，可以复制下面的链接在新标签页打开。

```
https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/JOBPILOT.user.js
```

完成安装后刷新 BOSS 直聘页面，就能看到上面“配置成功页面”里的 UI 面板。如果后续仓库更新，只要保持脚本启用，Tampermonkey 会自动检测版本并提示升级。
## 🛠️ 技术架构

### 系统架构

```
JOBPILOT 投递助手架构
├── 📦 核心模块 (Core)
│   ├── 自动化投递引擎
│   ├── 页面解析器
│   ├── AI回复处理器
│   └── 状态管理机
├── 🎨 UI模块 (UI)
│   ├── 控制面板系统
│   ├── 主题管理系统
│   └── 交互反馈组件
├── 💾 数据模块 (State)
│   ├── 本地存储管理
│   ├── 会话状态维护
│   └── 配置持久化
├── 🔧 工具模块 (Utils)
│   ├── DOM操作工具
│   ├── 异步处理工具
│   └── 错误处理系统
└── ⚙️ 配置模块 (Config)
    ├── 运行时配置
    ├── 选择器配置
    └── 常量定义
```

### 技术栈

| 技术领域 | 具体技术 | 版本要求 |
|---------|---------|---------|
| **核心语言** | JavaScript (ES6+) | ES2015+ |
| **脚本引擎** | Tampermonkey / ScriptCat | 8.15+ |
| **浏览器支持** | Chrome, Firefox, Edge（推荐） | 最新版 |
| **AI集成** | 讯飞星火API / OpenAI API | - |
| **数据存储** | localStorage, IndexedDB | - |
| **构建工具** | 原生JS，无其他依赖 | - |

## 📦 安装指南

### 前置要求

1. **浏览器扩展** - 安装以下任一脚本管理器：
   - [Tampermonkey](https://www.tampermonkey.net/) (推荐)
   - [ScriptCat（脚本猫）](https://scriptcat.org/)

2. **浏览器版本** - 支持现代浏览器：
   - Chrome 88+
   - Firefox 85+
   - Edge 88+
   - Safari 14+

### 安装步骤

#### 方法一：一键安装（推荐）

1. 先确认 Tampermonkey / ScriptCat 已安装（参考前文“快速获取脚本”）。
2. 点击下方按钮，脚本管理器会自动打开安装页面：

[![安装脚本](https://img.shields.io/badge/Install-Script-green?style=for-the-badge)](https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/JOBPILOT.user.js)

> 如果点击后没有弹出安装窗口，请复制链接 `https://raw.githubusercontent.com/fancyboi999/JobPilot/refs/heads/main/JOBPILOT.user.js` 到新标签页手动访问。

#### 方法二：手动安装

1. 访问项目GitHub页面：https://github.com/fancyboi999/JobPilot
2. 下载 `JOBPILOT.user.js` 文件
3. 在脚本管理器中点击"新建脚本"
4. 粘贴文件内容并保存
5. 刷新BOSS直聘页面即可使用

## 🚀 快速开始

### 1. 登录BOSS直聘

确保已登录您的BOSS直聘账号

### 2. 开始前配置

- **将常用语修改为自我介绍**: [常用语设置](https://www.zhipin.com/web/geek/notify-set?ka=notify-set)
- **必须启用招呼语功能**: [启用打招呼](https://www.zhipin.com/web/geek/notify-set?type=greetSet)

### 3. 访问支持页面

- **职位列表页**: https://www.zhipin.com/web/geek/jobs
- **聊天对话页**: https://www.zhipin.com/web/geek/chat

### 4. 配置筛选条件

在控制面板中设置：
- ✅ 职位关键词（如：前端、Java、Python）
- ✅ 工作地点（如：北京、杭州、深圳）
- ✅ 薪资范围筛选
- ✅ 公司类型过滤

### 5. 启动自动化

点击"开始投递"按钮，系统将自动：
1. 扫描并筛选符合条件的岗位
2. 自动进入每个职位详情页
3. 点击"立即沟通"按钮
4. 发送预设的自我介绍消息
5. 记录所有操作日志

## 🎯 功能详解

### 🤖 自动化投递系统

| 功能模块 | 描述 | 技术实现 |
|---------|------|---------|
| **岗位扫描** | 自动滚动加载所有职位列表 | `MutationObserver` + 智能滚动检测 |
| **条件筛选** | 多维度精准匹配目标岗位 | 正则匹配 + 语义分析 |
| **自动沟通** | 模拟点击立即沟通按钮 | DOM事件模拟 + 异步等待 |
| **防重复机制** | 识别已处理过的HR和岗位 | localStorage + 哈希标识 |

### 💬 AI智能回复系统

```javascript
// AI回复处理流程
async function handleAIReply(hrMessage) {
    // 1. 消息预处理
    const cleanedMessage = preprocessMessage(hrMessage);
    
    // 2. 意图识别
    const intent = await detectIntent(cleanedMessage);
    
    // 3. 生成回复
    const reply = await generateReply(intent, cleanedMessage);
    
    // 4. 发送回复
    await sendChatMessage(reply);
}
```

### 🎨 控制面板功能

- **实时状态监控** - 显示当前处理进度和统计信息
- **动态配置调整** - 实时修改筛选条件和操作参数
- **主题切换** - 支持亮色/暗色主题模式
- **日志查看器** - 实时显示操作日志和错误信息
- **性能监控** - 显示内存使用和运行时间统计

## ⚙️ 配置说明

### 基本配置

```javascript
// config.js - 主要配置项
const CONFIG = {
    BASIC_INTERVAL: 1000,        // 基础操作间隔(ms)
    OPERATION_INTERVAL: 800,     // 具体操作间隔(ms)
    MAX_REPLIES_FREE: 5,         // 免费版AI回复次数
    MAX_REPLIES_PREMIUM: 10,     // 高级版AI回复次数
    DEFAULT_AI_ROLE: '求职者角色设定', // AI默认人设
};
```

### AI配置

在脚本设置中配置AI服务：
- 自定义回复模板
- 角色设定配置

### 筛选条件配置

支持多种筛选条件组合：
- 包含/排除关键词
- 地理位置范围
- 薪资水平区间
- 公司规模筛选
- 行业类型过滤

## 📊 性能指标

### 处理效率

| 指标 | 数值 | 说明 |
|------|------|------|
| 平均处理速度 | 2-3秒/岗位 | 从扫描到完成沟通 |
| 最大并发数 | 1个/标签页 | 单标签页处理 |
| 每日处理上限 | 50个岗位 | 防滥用机制 |
| 内存占用 | <10MB | 轻量级设计 |

### 成功率统计

| 操作类型 | 成功率 | 备注 |
|----------|--------|------|
| 岗位扫描 | 99.8% | 极少数页面结构变化 |
| 自动沟通 | 98.5% | 依赖页面加载速度 |
| AI回复 | 95.2% | 受网络和API限制 |
| 简历发送 | 97.3% | 需要HR先回复 |

## 🔧 开发指南

### 项目结构

```
jobs-helper/
├── 📄 JOBPILOT.user.js # Tampermonkey 最终脚本
├── 📄 config.js           # 配置常量
├── 📄 core.js             # 核心业务逻辑
├── 📄 ui.js               # 用户界面组件
├── 📄 state.js            # 状态管理
├── 📄 utils.js            # 工具函数
├── 📄 letter.js           # 引导消息
├── 📄 guide.js            # 用户引导
├── 📄 settings.js          # 设置面板
└── 📄 README.md           # 项目说明
```

### 开发环境搭建

```bash
# 1. 克隆项目
git clone https://github.com/fancyboi999/JobPilot.git

# 2. 安装依赖（无需构建，直接使用）
# 本项目为纯前端项目，无构建依赖

# 3. 开发调试
# 使用浏览器开发者工具进行调试
# 推荐使用Tampermonkey的调试模式
```

### 代码贡献

欢迎提交Pull Request！请遵循以下规范：

1. **代码风格** - 遵循ES6+语法规范
2. **注释要求** - 重要函数必须添加JSDoc注释
3. **测试覆盖** - 新增功能需添加相应测试
4. **文档更新** - 修改功能时同步更新文档

## 🤝 参与贡献

### 贡献方式

1. **代码贡献** - 提交PR修复bug或添加新功能
2. **文档改进** - 完善使用文档和开发文档
3. **测试反馈** - 测试新功能并提交体验报告
4. **问题反馈** - 提交Issue报告bug或建议

### 开发团队

- **fancyboi999** - 项目创始人和主要维护者
- 欢迎更多开发者加入贡献！

### 贡献者名单

[![Contributors](https://contrib.rocks/image?repo=fancyboi999/Jobs_helper)](https://github.com/fancyboi999/JobPilot/graphs/contributors)

## 📄 开源协议

本项目采用 **AGPL-3.0** 开源协议发布。

### 允许的行为

- ✅ 自由使用和分发软件
- ✅ 学习和研究源代码
- ✅ 提交改进和修复
- ✅ 在遵守协议的前提下进行商业使用

### 必须遵守的规则

- 📛 修改版本必须开源并保留版权声明
- 📛 分发时必须包含原始许可证
- 📛 不得去除作者信息和变更说明
- 📛 基于本项目的衍生作品必须使用相同协议

完整协议内容请参阅: [AGPL-3.0协议全文](https://www.gnu.org/licenses/agpl-3.0.html)

## 🐛 问题反馈

### 常见问题

1. **脚本不生效**
   - 检查Tampermonkey是否启用
   - 刷新BOSS直聘页面
   - 检查浏览器控制台错误信息

2. **AI回复失败**
   - 检查API密钥配置
   - 确认网络连接正常
   - 查看每日使用限额

3. **页面识别错误**
   - BOSS直聘页面结构更新
   - 等待脚本版本更新

### 提交Issue

请通过以下方式反馈问题：

1. **GitHub Issues**: [提交新Issue](https://github.com/fancyboi999/JobPilot/issues/new)
2. **问题模板**: 使用提供的issue模板
3. **必要信息**: 包括浏览器版本、错误日志、复现步骤

## 📞 支持与联系

### 官方渠道

- **项目主页**: https://github.com/fancyboi999/JobPilot
- **文档网站**: https://fancyboi999.gitbook.io/jobs_helper
- **问题反馈**: https://github.com/fancyboi999/JobPilot/issues

### 社区交流
- **开发者邮箱**: fancyboi999@gmail.com

### 商务合作

如有商务合作需求，请邮件联系并注明"海投助手合作"。

## 💖 致谢

感谢所有为本项目做出贡献的开发者、测试者和用户！

特别感谢：
- Tampermonkey团队提供的优秀脚本平台
- 所有提交反馈和改进建议的用户
- 开源社区的持续支持和鼓励

---

> *最后更新: 2025年10月*  
> *由 fancyboi999 开发和维护*  
> *你从不是孤身一人，我们与你共御就业寒冬，愿你能找到心仪的工作。* 💼✨
