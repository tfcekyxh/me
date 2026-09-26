import { expect, test } from '@playwright/test'
import {
  expectVideoPaused,
  expectVideoPlaying,
  openHome,
  openShowcase,
  projects,
  readVideoState,
  scrollElementToCenter,
  scrollToTop,
  trackRequests,
} from './helpers'

/**
 * DemoVideo 懒加载与播放策略。
 * 用 mymenu 展示页（4 个视频）：首屏只够覆盖第一个，最后一个离屏足够远，
 * 便于稳定区分「在屏播放」与「离屏无 src」。
 */

const SLUG = 'mymenu' as const
const project = projects.find((item) => item.slug === SLUG)!
const firstClip = project.clips[0]!
const lastClip = project.clips.at(-1)!

test('离屏视频无 src；滚入后加载播放，首个视频离屏暂停、回视口续播且只下载一次', async ({
  page,
}) => {
  await openShowcase(page, SLUG)
  await expect(page.getByRole('heading', { name: project.name, level: 1 })).toBeVisible()

  const videos = page.locator('video')
  const firstVideo = videos.first()
  const lastVideo = videos.nth(project.clips.length - 1)

  // 从页面加载起统计首个视频 mp4 的请求次数（滚回续播不应重新下载）
  const firstMp4Url = new URL(firstClip.src, page.url()).href
  const requests = trackRequests(page, (url) => url === firstMp4Url)

  // 刚加载：最后一个视频远离视口，未懒加载，无 src 属性
  expect(await lastVideo.getAttribute('src')).toBeNull()

  // 首屏：第一个视频在视口内，静音自动播放
  await expectVideoPlaying(firstVideo)
  // 等它确实播过一小段，后面记录的暂停点才有意义
  await expect
    .poll(async () => (await readVideoState(firstVideo)).currentTime, {
      message: '首屏自动播放后 currentTime 应开始前进',
    })
    .toBeGreaterThan(0)

  // 瞬时滚到页面底部：最后一个视频获得 src 并自动播放，第一个视频离屏暂停
  await scrollElementToCenter(lastVideo)
  await expect(lastVideo).toHaveAttribute('src', lastClip.src)
  await expectVideoPlaying(lastVideo)
  await expectVideoPaused(firstVideo)
  const pausedTime = (await readVideoState(firstVideo)).currentTime
  expect(pausedTime).toBeGreaterThan(0)

  // 滚回顶部：第一个视频从暂停点继续（currentTime 超过暂停时记录的值）
  await scrollToTop(page)
  await expectVideoPlaying(firstVideo)
  await expect
    .poll(
      async () => {
        const state = await readVideoState(firstVideo)
        // 暂停态不应参与比较，返回 -1 让断言继续等
        return state.paused ? -1 : state.currentTime
      },
      { message: '滚回视口后应从暂停点继续播放' },
    )
    .toBeGreaterThan(pausedTime)

  // 整个过程首个视频的 mp4 只发起了一次网络请求（懒加载一次性，续播走缓存）
  expect(requests.urls()).toEqual([firstMp4Url])
})

test('首页第一个视频进入视口后静音自动播放', async ({ page }) => {
  await openHome(page)

  const video = page.locator('video').first()
  await scrollElementToCenter(video)

  // 静音是浏览器允许无交互自动播放的前提
  await expectVideoPlaying(video)
})

test('系统开启减少动态效果时：视频初始即有 src、带控件且不自动播放', async ({ page }) => {
  // 先 emulate 再打开页面，确保页面脚本首次读 matchMedia 就是 reduce
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openShowcase(page, SLUG)

  // 取离屏的最后一个视频：证明 reduced-motion 下不依赖滚动就直接给 src
  const lastVideo = page.locator('video').last()
  await expect(lastVideo).toHaveAttribute('src', lastClip.src)

  // 控件交给访客手动播放；组件不发起自动播放，保持暂停
  await expect
    .poll(() => readVideoState(lastVideo), {
      message: 'reduced-motion 下视频应带控件且保持暂停',
    })
    .toMatchObject({ controls: true, paused: true })
})
