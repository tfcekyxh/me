# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server
bun run build    # TypeScript check + Vite production build
bun run lint     # ESLint on all files
bun run preview  # Preview production build locally
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

## Implementation phases

按 `implementation-plan.md` 分 8 个阶段推进，每阶段完成后暂停等待确认。当前阶段 1 已完成。
