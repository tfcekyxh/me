# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev             # Start dev server
bun run build       # TypeScript check + Vite production build
bun run lint        # ESLint on all files
bun run preview     # Preview production build locally
bun run test:e2e    # Playwright e2e（自动起 5198 端口的 dev）
bun run test:e2e:ui # Playwright 可视化 UI 模式
```

## Architecture

单页个人介绍网站（SPA），锚点跳转到各板块，无路由、无状态管理库。

```
src/
  App.tsx         # Root — 各 section 组件纵向排列
  index.css       # Tailwind import + @theme 灰阶 + @custom-variant dark
  hooks/          # useTheme (待创建：阶段 2)
  components/     # Navbar, Hero, Skills, Projects, Contact, Footer 等 (待创建)
```

- **主题**: 自定义 hook 在 `<html>` 上切换 `.dark` class，Tailwind `dark:` 前缀响应
- **样式**: Tailwind CSS 4，`@tailwindcss/vite` 插件，CSS-first 配置（无 `tailwind.config.js`）
- **动画**: framer-motion 仅用于 `whileInView` 滚动进入动画
- **SEO**: react-helmet-async 管理 meta/OG tags
- **图标**: lucide-react

## Design decisions

- 不引入 React Router — 单页锚点 `scrollIntoView` 足够
- 不引入组件库（shadcn/ui、Ant Design）— 手写原生组件更轻量
- 不引入状态管理 — 纯静态展示无跨组件状态
- 后续页面变多时再按需引入路由和组件库

## E2E 测试

- 框架：Playwright（`@playwright/test`，devDependency）。测试在 `e2e/`，配置在 `playwright.config.ts`。
- **测试编写与运行验证交给 `e2e-tester` agent**：功能新增或改动后，由 e2e-tester 子代理完成 spec 编写并跑通，不要自己手跑代替。
- **只写端到端**：真实浏览器（系统 Chrome）、真实 dev server，断言聚焦用户可见行为；不写单元/接口级测试。
- **一个用例只讲一件事，避免重复**：同一行为的多种路径（两个项目、两个展示页）用循环合进一个用例，不拆多个。
- **复用系统 Chrome**：配置用 `channel: 'chrome'`，不下载 Playwright 自带 Chromium。
- **专用端口 5198**（`E2E_PORT` / `E2E_BASE_URL` 可覆盖）：本机常同时开多个 Vite 项目（jplearn 占 5199），固定端口避免 webServer 健康检查把别的项目误当成本应用。baseURL 为 `http://localhost:5198/me/`，**必须带 base 路径**；用例内一律走 `e2e/helpers.ts` 的 `openHome` / `openShowcase`，不要裸 `goto`。`reuseExistingServer: true`，dev 已起则复用。
- **串行执行**：`workers: 1`，视频播放/滚动类用例共享页面时序语义，串行更稳。
- **业务事实不手抄**：spec 中的项目名、链接、clip 标题一律取自 `src/data/projects.ts`（经 `helpers.ts` 的 `projects` 透出）。该文件含 Vite 专有的 `import.meta.env.BASE_URL`，Node 下不能直接 import，helper 用 TS 转译 + vm 求值加载（替换为 `"/me/"`）；改数据源后 e2e 自动跟随。
- **DemoVideo 断言约定**：
  - 有无 `src` 必须读 HTML 属性 `getAttribute('src')`——无属性时 DOM property `.src` 会回退为页面 URL。
  - 播放/暂停/续播一律用 `expect.poll` 读真实 `paused` / `currentTime`，禁止固定 sleep；离屏视频用 `scrollElementToCenter`（瞬时滚动）驱动，不用平滑滚动。
  - 「只下载一次」用 `trackRequests` 统计该 mp4 全程请求数证明，不 mock 媒体元素。
  - reduce-motion 场景必须先 `page.emulateMedia({ reducedMotion: 'reduce' })` 再打开页面，断言初始即有 src、`controls=true`、保持暂停。
- **锚点滚动**：`#contact` 前内容不足一屏时浏览器把滚动位置钳制在最大滚动处，不要断言其 `top=0`，断言滚到页面底部极限且标题进入视口即可；`#projects` 可精确到 0。
- **framer-motion**：`whileInView` 入场动画期间元素 `opacity:0`，交互前先 `toBeVisible` 等动画收敛。
- **关键选择器**：导航按钮文案「项目」「联系」；主题按钮 aria-label「切换到暗色模式」/「切换到亮色模式」；移动菜单 aria-label「打开菜单」/「关闭菜单」；卡片链接文案「示例展示」「源码」「在线体验」；展示页「返回首页」；视频用 aria-label「{项目名} - {片段标题}」定位；邮箱链接 `a[href="mailto:..."]`；页脚走 `contentinfo` role。
- **不实际打开外链**：GitHub / 在线体验链接只断言 href、`target=_blank`、`rel` 含 `noopener`。
- eslint 中 `e2e/**/*.ts` 与 `playwright.config.ts` 单独挂 node globals 段；e2e 不参与 `tsc -b`（tsconfig 只 include `src`），由 Playwright 自行转译，无需新建 tsconfig。
- 新增/改动功能时按现有 spec 分工补用例：`home`（内容/锚点/导航栏）、`theme`（主题）、`projects`（卡片与展示页/链接）、`video`（懒加载与播放策略）、`mobile`（390×844 视口）。

## Implementation phases

按 `implementation-plan.md` 分 8 个阶段推进，每阶段完成后暂停等待确认。当前阶段 1 已完成。
