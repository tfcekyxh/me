import { expect, test } from '@playwright/test'
import { openHome, projects } from './helpers'

/** 首页：首屏内容、title、锚点导航滚动、导航栏滚动阴影。 */

test.beforeEach(async ({ page }) => {
  await openHome(page)
})

test('首页展示品牌、两个项目、联系方式与当前年份页脚', async ({ page }) => {
  // 导航栏品牌
  await expect(page.locator('nav').getByText('靠枕', { exact: true })).toBeVisible()

  // 两个板块标题
  await expect(page.getByRole('heading', { name: '项目作品', level: 2 })).toBeVisible()
  await expect(page.getByRole('heading', { name: '联系方式', level: 2 })).toBeVisible()

  // 两张项目卡的 h3 项目名（名称取自业务数据，不手抄）
  for (const project of projects) {
    await expect(page.getByRole('heading', { name: project.name, level: 3 })).toBeVisible()
  }

  // 联系方式：mailto 链接
  await expect(page.locator('a[href="mailto:2073887899@qq.com"]')).toBeVisible()

  // 页脚含当前年份与品牌
  await expect(page.getByRole('contentinfo')).toContainText(
    `© ${new Date().getFullYear()} 靠枕`,
  )
})

test('首页 document.title 正确', async ({ page }) => {
  await expect(page).toHaveTitle('靠枕 - 全栈工程师')
})

test('桌面导航点击「联系」「项目」平滑滚动到对应板块', async ({ page }) => {
  const sectionTop = (id: string) =>
    page
      .locator(`#${id}`)
      .evaluate((el) => Math.round(el.getBoundingClientRect().top))
  const scrollY = () => page.evaluate(() => Math.round(window.scrollY))

  const beforeY = await scrollY()
  await page.getByRole('button', { name: '联系', exact: true }).click()

  // #contact 之前的内容不足一屏，浏览器只能滚到页面底部，板块会停在视口
  // 偏下而不是 top=0；轮询等滚动位置到达底部极限，联系标题此时进入视口
  const maxScrollY = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  )
  await expect
    .poll(scrollY, { message: '点击「联系」后平滑滚动到页面底部' })
    .toBe(maxScrollY)
  expect(await scrollY()).toBeGreaterThan(beforeY)
  await expect(page.getByRole('heading', { name: '联系方式', level: 2 })).toBeInViewport()

  // #projects 位于页面顶部，可以精确滚到 top=0
  await page.getByRole('button', { name: '项目', exact: true }).click()
  await expect
    .poll(() => sectionTop('projects'), { message: '点击「项目」后 #projects 顶部贴近视口顶部' })
    .toBe(0)
})

test('向下滚动后导航栏出现阴影，回到顶部后阴影消失', async ({ page }) => {
  const nav = page.locator('nav')
  await expect(nav).not.toHaveClass(/shadow-sm/)

  // 组件在 scrollY > 20 时加阴影
  await page.evaluate(() => window.scrollTo(0, 200))
  await expect(nav).toHaveClass(/shadow-sm/)

  await page.evaluate(() => window.scrollTo(0, 0))
  await expect(nav).not.toHaveClass(/shadow-sm/)
})
