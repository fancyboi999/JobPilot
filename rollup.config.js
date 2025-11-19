import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { readFileSync } from 'fs';

// 自定义插件：提取油猴脚本元数据
function userscriptBanner() {
  return {
    name: 'userscript-banner',
    renderChunk(code) {
      // 从 main.js 读取油猴头部元数据
      const mainJs = readFileSync('./main.js', 'utf-8');
      const headerMatch = mainJs.match(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/);

      if (!headerMatch) {
        throw new Error('未找到油猴脚本元数据头部！');
      }

      // 移除所有 @require 行（除了 crypto-js,因为那是外部CDN依赖）
      const cleanedHeader = headerMatch[0]
        .split('\n')
        .filter(line => {
          // 保留 crypto-js 的 @require
          if (line.includes('@require') && line.includes('crypto-js')) {
            return true;
          }
          // 移除其他 @require 行
          if (line.includes('@require') && line.includes('gitee.com')) {
            return false;
          }
          return true;
        })
        .join('\n');

      return `${cleanedHeader}\n\n${code}`;
    }
  };
}

export default {
  input: 'src/index.js', // 入口文件
  output: {
    file: 'JOBPILOT.js',
    format: 'iife', // 立即执行函数表达式
    name: 'JobPilot',
    banner: '', // banner 由插件处理
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    userscriptBanner()
  ]
};
