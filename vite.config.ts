import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import postcssPresetEnv from "postcss-preset-env"

// console.log(path.join(__dirname, 'src/assets'), 9090)
const isProduction = process.env.NODE_ENV === 'production';
// const CDN_URL = 'https://octoberluobin.com'

console.log(isProduction, 'isProduction')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: isProduction ? CDN_URL: '/',
  resolve: {
    // alias 与 @rollup/plugin-alias 配置项保持一致
    alias: [
      { find: "@assets", replacement: path.join(__dirname, "src/assets") },
      { find: "@src", replacement: path.join(__dirname, "src") },
    ],
  },
  // JSON 加载底层使用的是@rollup/pluginutils 的 dataToEsm 方法将 JSON 对象转换为一个包含各种具名导出的 ES 模块
  json: {
    // stringify: true
    namedExports: true,
  },
  build: {
    assetsInlineLimit: 8 * 1024
  },
  css: {
    // css 后处理器
    postcss: {
      plugins: [postcssPresetEnv()]
    }
  }
});
