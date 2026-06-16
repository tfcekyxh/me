# 技术栈选型

## 核心依赖

| 层面 | 选择 | 理由 |
|------|------|------|
| **语言** | TypeScript | Java 开发者对静态类型更熟悉，减少低级 bug |
| **框架** | React 18 | 生态最成熟 |
| **包管理器** | Bun | 速度快、All-in-one（运行时 + 包管理 + 构建） |
| **构建** | Vite 5 | 冷启动快，开发体验好 |
| **样式** | Tailwind CSS 3 | 适合灰色系极简风格，原子化 CSS 效率高 |
| **图标** | Lucide React | 图标干净、轻量，和灰色极简风匹配 |
| **动画** | framer-motion | 仅使用 `whileInView` 做滚动进入动画，按需加载，体积可控 |
| **主题切换** | 自定义 hook + localStorage | 逻辑简单，dark class 切换 + Tailwind `dark:` 前缀即可，不需要额外依赖 |
| **SEO** | react-helmet-async | 管理 meta / OG tags，GitHub Pages 纯静态站 SEO 靠这个 |
| **部署** | GitHub Actions + gh-pages | push 即自动部署 |

## 不推荐引入

| 不推荐 | 原因 |
|------|------|
| React Router | 单页锚点跳转用 scrollIntoView 足够，不需要路由 |
| 状态管理库（Zustand/Redux） | 纯静态展示页，没有跨组件共享状态 |
| shadcn/ui / Ant Design 等组件库 | 太厚重，几个板块手写原生组件更快，也更好掌控灰色系风格 |
| next-themes | 功能单一，一个 20 行的自定义 hook 就能替代 |

## 包版本清单

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-helmet-async": "^2.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "gh-pages": "^6.0.0",
    "eslint": "^8.57.0",
    "prettier": "^3.3.0"
  }
}
```

## 后续扩展

| 场景 | 引入方案 |
|------|---------|
| 页面变多需路由 | React Router，现有板块组件原封不动作为首页内容，新增详情页当新路由 |
| 交互复杂需组件库 | shadcn/ui 或 Ant Design，均可与 Tailwind 共存 |

当前保持轻量，后续按需引入，不会产生技术债。
