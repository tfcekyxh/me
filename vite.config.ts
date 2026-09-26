import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/me/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // 多页应用：首页 + 每个项目一个独立的示例展示页（静态文件直达，兼容 GitHub Pages）
      input: {
        main: new URL('./index.html', import.meta.url).pathname,
        jplearn: new URL('./showcase/jplearn.html', import.meta.url).pathname,
        mymenu: new URL('./showcase/mymenu.html', import.meta.url).pathname,
      },
    },
  },
})
