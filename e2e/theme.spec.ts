import { expect, test, type Page } from '@playwright/test'
import { openHome } from './helpers'

/** 暗色模式：默认浅色、切换、刷新持久化、存储偏好与系统偏好的初始取值。 */

const html = (page: Page) => page.locator('html')
const toggle = (page: Page) => page.getByRole('button', { name: /切换到(暗|亮)色模式/ })

test('无存储时默认亮色，按钮提示可切到暗色', async ({ page }) => {
  await openHome(page)

  await expect(html(page)).not.toHaveClass(/\bdark\b/)
  await expect(toggle(page)).toHaveAttribute('aria-label', '切换到暗色模式')
})

test('点击切换后 html class、localStorage 与按钮 aria-label 同步更新', async ({ page }) => {
  await openHome(page)

  await toggle(page).click()
  await expect(html(page)).toHaveClass(/\bdark\b/)
  await expect(toggle(page)).toHaveAttribute('aria-label', '切换到亮色模式')
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark')
})

test('刷新后保持暗色主题', async ({ page }) => {
  await openHome(page)

  await toggle(page).click()
  await expect(html(page)).toHaveClass(/\bdark\b/)

  await page.reload()
  await expect(html(page)).toHaveClass(/\bdark\b/)
  await expect(toggle(page)).toHaveAttribute('aria-label', '切换到亮色模式')
})

test('预置 localStorage theme=light 时，打开与刷新都保持亮色', async ({ page }) => {
  // init script 先于页面防闪烁脚本执行，模拟老访客浏览器里已存的偏好
  await page.addInitScript(() => localStorage.setItem('theme', 'light'))

  await openHome(page)
  await expect(html(page)).not.toHaveClass(/\bdark\b/)

  await page.reload()
  await expect(html(page)).not.toHaveClass(/\bdark\b/)
  await expect(toggle(page)).toHaveAttribute('aria-label', '切换到暗色模式')
})

test('清空存储且系统偏好为暗色时，首次打开即为暗色', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  // init script 先于页面防闪烁脚本执行，坐实「无存储时跟随系统」这条路径
  await page.addInitScript(() => localStorage.clear())

  await openHome(page)

  await expect(html(page)).toHaveClass(/\bdark\b/)
  await expect(toggle(page)).toHaveAttribute('aria-label', '切换到亮色模式')
})
