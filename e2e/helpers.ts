import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { expect, type Locator, type Page } from '@playwright/test'
import type { Project } from '../src/data/projects'

/**
 * 纯静态个人站的 e2e 公共助手：
 * - 相对 base 路径的页面跳转封装（应用挂在 /me/ 下，多页：首页 + showcase/*.html）
 * - 项目数据直接复用 src/data/projects.ts，项目名 / slug / 链接 / 片段一律不手抄
 * - DemoVideo 播放状态读取与 expect.poll 播放 / 暂停等待
 * - 指定资源（mp4）的网络请求次数统计
 */

/** showcase 页 slug，只有这两个静态页面（路由事实，非业务展示数据） */
export type ShowcaseSlug = 'jplearn' | 'mymenu'

const BASE_PATH = '/me'

/**
 * 从业务源文件 src/data/projects.ts 加载 projects 数据。
 *
 * 不能直接 import：该文件用了 Vite 专有的 import.meta.env.*，
 * Playwright 用例跑在 Node 下 import.meta.env 为 undefined，取值即抛错。
 * 这里把源码中的 VITE_MEDIA_BASE 替换为 undefined（e2e 走本地 dev，
 * 资源必须回退到同源 /me/demos/），BASE_URL 按 vite.config.ts 的 base
 * 常量替换，再做一次 TS -> CJS 转译，放进 vm 求值。业务事实（项目名 /
 * 链接 / 片段等）仍然只有 src/data/projects.ts 这一个来源。
 */
function loadProjects(): Project[] {
  const sourcePath = fileURLToPath(new URL('../src/data/projects.ts', import.meta.url))
  const source = readFileSync(sourcePath, 'utf8')
    .replace('import.meta.env.VITE_MEDIA_BASE', 'undefined')
    .replace('import.meta.env.BASE_URL', '"/me/"')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  const moduleObject = { exports: {} as { projects?: Project[] } }
  vm.runInNewContext(outputText, { module: moduleObject, exports: moduleObject.exports })
  if (!moduleObject.exports.projects) {
    throw new Error('无法从 src/data/projects.ts 加载 projects')
  }
  return moduleObject.exports.projects
}

// 业务数据源原样透出，spec 里以它为唯一事实来源
export const projects = loadProjects()

/** 打开首页。 */
export async function openHome(page: Page) {
  await page.goto(`${BASE_PATH}/`)
}

/** 打开某个项目的示例展示页。 */
export async function openShowcase(page: Page, slug: ShowcaseSlug) {
  await page.goto(`${BASE_PATH}/showcase/${slug}.html`)
}

/** 按项目名定位首页的项目卡片（h3 在卡内，卡片本身是 div.rounded-xl）。 */
export function projectCard(page: Page, name: string): Locator {
  return page
    .locator('div.rounded-xl')
    .filter({ has: page.getByRole('heading', { name, level: 3 }) })
}

/** 视频元素的真实播放状态，全部直接读 DOM，不 mock 视频元素。 */
export interface VideoState {
  paused: boolean
  muted: boolean
  controls: boolean
  currentTime: number
  /**
   * src 必须读 HTML 属性：未设置 src 时 DOM property .src 会返回页面 URL，
   * 无法区分「懒加载未赋值」与「已赋值」。
   */
  src: string | null
}

/** 读取视频真实播放状态（paused / muted / controls / currentTime / src）。 */
export function readVideoState(video: Locator): Promise<VideoState> {
  return video.evaluate((node) => {
    const el = node as HTMLVideoElement
    return {
      paused: el.paused,
      muted: el.muted,
      controls: el.controls,
      currentTime: el.currentTime,
      src: el.getAttribute('src'),
    }
  })
}

/** 等待视频真正进入播放态（静音自动播放：paused=false 且 muted=true）。 */
export async function expectVideoPlaying(video: Locator) {
  await expect
    .poll(() => readVideoState(video), {
      message: '视频进入视口后应自动播放（muted，paused=false）',
    })
    .toMatchObject({ paused: false, muted: true })
}

/** 等待视频真正暂停（paused=true）。 */
export async function expectVideoPaused(video: Locator) {
  await expect
    .poll(() => readVideoState(video), {
      message: '视频离开视口后应暂停（paused=true）',
    })
    .toMatchObject({ paused: true })
}

/**
 * 统计页面生命周期内命中条件的网络请求次数。
 *
 * 必须在触发动作（滚动导致懒加载等）之前安装；mp4 懒加载只应发生一次，
 * 用它证明「滚回视口续播」走的是浏览器缓存而不是重新下载。
 */
export function trackRequests(page: Page, matches: (url: string) => boolean) {
  const urls: string[] = []
  page.on('request', (request) => {
    if (matches(request.url())) urls.push(request.url())
  })
  return {
    /** 截至调用时命中的请求次数。 */
    count: () => urls.length,
    /** 截至调用时命中的请求 URL（按发起顺序）。 */
    urls: () => [...urls],
  }
}

/** 把元素瞬时滚动到视口中央（不走平滑滚动，消除动画时长带来的竞态）。 */
export async function scrollElementToCenter(locator: Locator) {
  await locator.evaluate((el) => el.scrollIntoView({ block: 'center' }))
}

/** 回到页面顶部。 */
export async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 0))
}
