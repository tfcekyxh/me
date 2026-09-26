import { defineConfig, devices } from '@playwright/test'

// 应用部署在 base 路径 /me/ 下（vite base），多页应用由 index.html 与
// showcase/*.html 组成；baseURL 必须带 base 路径，用例内统一跳 /me/xxx。
// 本机常同时开多个 Vite 项目（默认都抢 5173），固定本项目专用端口，
// 避免 Playwright 把别的项目的 dev server 当成本应用复用。
const PORT = Number(process.env.E2E_PORT ?? 5198)
const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}/me/`

export default defineConfig({
  testDir: './e2e',
  // 纯静态站点，串行执行更稳，也便于观察视频懒加载/播放状态
  workers: 1,
  reporter: 'list',

  timeout: 60_000,

  expect: {
    // 自动等待类断言（toBeVisible 等）超时，默认 5s，放宽到 15s
    timeout: 15_000,
  },

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // click / fill 等动作的自动等待超时
    actionTimeout: 15_000,
  },

  projects: [
    {
      name: 'chromium',
      // 复用系统已安装的 Chrome，避免额外下载 Playwright 自带浏览器
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  // 本地已启动 dev 时直接复用；否则用专用端口自动拉起
  webServer: {
    command: `bun run dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
