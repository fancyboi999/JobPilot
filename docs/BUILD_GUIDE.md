# 快速构建指南

## 🚀 一键开始

```bash
# 1. 安装依赖
npm install

# 2. 开发模式（自动监听文件变化）
npm run dev

# 3. 构建打包（生成 JOBPILOT.js）
npm run build
```

## 📁 文件结构

```
开发用（模块化）        构建产物（发布用）
   src/                    ↓
   ├── config.js
   ├── state.js           JOBPILOT.js
   ├── ui.js              (单个文件)
   ├── core.js
   └── ...
```

## 💡 开发技巧

### 修改代码
- ✅ **推荐**：编辑 `src/` 下的模块文件
- ❌ **不推荐**：直接修改 `JOBPILOT.js`（会被覆盖）

### 实时开发
```bash
# 终端1：监听模式
npm run dev

# 终端2：在浏览器测试
# 修改代码 → 自动重新打包 → 刷新页面
```

### 更新版本号
编辑 `main.js` 的第 4 行：
```javascript
// @version      1.2.3.9  ← 修改这里
```

然后重新构建：
```bash
npm run build
```

## 🎯 常用命令

| 命令 | 说明 |
|------|------|
| `npm install` | 安装依赖（首次运行） |
| `npm run dev` | 开发模式（监听文件变化） |
| `npm run build` | 构建打包（生成发布文件） |

## 🔧 故障排除

### 构建失败？
```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 油猴脚本不生效？
1. 确认已运行 `npm run build`
2. 检查 `JOBPILOT.js` 文件存在
3. 在 Tampermonkey 中重新加载脚本
4. 清除浏览器缓存并刷新

---

更多详细信息请查看 [DEVELOPMENT.md](DEVELOPMENT.md)
