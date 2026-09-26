import { expect, test } from '@playwright/test'
import { openHome, openShowcase, projectCard, projects, type ShowcaseSlug } from './helpers'

// iPhone 12/13/14 逻辑分辨率：390x844，项目以 375-430px 为移动端设计目标
test.use({ viewport: { width: 390, height: 844 } })

test('手机视口下首页与两个示例展示页均无横向溢出', async ({ page }) => {
  // 每页等待一个用户可见的标志性元素，确认页面真正渲染完成再测量
  const pages: Array<{ slug: ShowcaseSlug | null; marker: string }> = [
    { slug: null, marker: '项目作品' },
    { slug: 'jplearn', marker: projects[0].name },
    { slug: 'mymenu', marker: projects[1].name },
  ]

  for (const item of pages) {
    if (item.slug === null) {
      await openHome(page)
    } else {
      await openShowcase(page, item.slug)
    }
    await expect(page.getByText(item.marker).first()).toBeVisible()

    const { clientWidth, scrollWidth } = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }))
    expect(
      scrollWidth <= clientWidth,
      `${item.slug ?? 'home'} 横向溢出：scrollWidth=${scrollWidth} clientWidth=${clientWidth}`,
    ).toBe(true)
  }
})

test('汉堡菜单：桌面导航收起，点开出现锚点，点联系后菜单关闭并滚动到联系区', async ({
  page,
}) => {
  await openHome(page)

  // 桌面导航内的按钮不可见，汉堡按钮可见
  await expect(page.getByRole('button', { name: '项目', exact: true })).toHaveCount(0)
  const menuButton = page.getByRole('button', { name: '打开菜单' })
  await expect(menuButton).toBeVisible()

  await menuButton.click()
  await expect(page.getByRole('button', { name: '项目', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '联系', exact: true })).toBeVisible()

  await page.getByRole('button', { name: '联系', exact: true }).click()

  // 点击锚点后菜单收起（按钮语义回到「打开菜单」），联系区滚进视口
  await expect(menuButton).toHaveAttribute('aria-label', '打开菜单')
  await expect(page.getByRole('button', { name: '联系', exact: true })).toHaveCount(0)
  await expect(page.locator('#contact')).toBeInViewport()
})

test('首页卡片单列布局：演示视频位于项目名文案上方', async ({ page }) => {
  await openHome(page)

  for (const project of projects) {
    const card = projectCard(page, project.name)

    // 等待 framer-motion 进入动画结束、卡片真正可见后再取几何位置
    await expect(card).toBeVisible()
    const videoBox = await card.locator('video').boundingBox()
    const titleBox = await card
      .getByRole('heading', { name: project.name, level: 3 })
      .boundingBox()

    expect(videoBox).not.toBeNull()
    expect(titleBox).not.toBeNull()
    expect(videoBox!.y).toBeLessThan(titleBox!.y)
  }
})
