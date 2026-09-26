import { expect, test } from '@playwright/test'
import { openHome, openShowcase, projectCard, projects, type ShowcaseSlug } from './helpers'

/** 项目卡与示例展示页：技术栈、站内外链接、片段视频渲染、返回首页、主题切换。 */

const slugs = projects.map((project) => project.slug) as ShowcaseSlug[]

test('两张项目卡展示各自的全部技术栈标签', async ({ page }) => {
  await openHome(page)

  for (const project of projects) {
    const card = projectCard(page, project.name)
    for (const tech of project.techStack) {
      await expect(card.getByText(tech, { exact: true })).toBeVisible()
    }
  }
})

test('两张项目卡的源码 / 在线体验链接地址与新标签属性正确', async ({ page }) => {
  await openHome(page)

  // 只断言链接属性，不实际打开站外地址
  for (const project of projects) {
    const card = projectCard(page, project.name)

    const source = card.getByRole('link', { name: '源码' })
    await expect(source).toHaveAttribute('href', project.githubUrl!)
    await expect(source).toHaveAttribute('target', '_blank')
    await expect(source).toHaveAttribute('rel', /noopener/)

    const demo = card.getByRole('link', { name: '在线体验' })
    await expect(demo).toHaveAttribute('href', project.demoUrl!)
    await expect(demo).toHaveAttribute('target', '_blank')
    await expect(demo).toHaveAttribute('rel', /noopener/)
  }
})

test('点击第一张卡的「示例展示」进入 jplearn 展示页', async ({ page }) => {
  await openHome(page)

  await projectCard(page, projects[0].name).getByRole('link', { name: '示例展示' }).click()

  await expect(page).toHaveURL(/\/me\/showcase\/jplearn\.html$/)
  await expect(page.getByRole('heading', { name: '五十音速成', level: 1 })).toBeVisible()
})

test('两个展示页渲染正确的 h1、片段小节标题、视频数量与 aria-label、title', async ({ page }) => {
  for (const slug of slugs) {
    const project = projects.find((item) => item.slug === slug)!

    await openShowcase(page, slug)

    await expect(page.getByRole('heading', { name: project.name, level: 1 })).toBeVisible()
    await expect(page).toHaveTitle(`${project.name} · 功能演示 - 靠枕`)

    const videos = page.locator('video')
    await expect(videos).toHaveCount(project.clips.length)

    for (const [index, clip] of project.clips.entries()) {
      // 每个片段一个 h2 小节，视频标签与之一一对应
      await expect(page.getByRole('heading', { name: clip.title, level: 2 })).toBeVisible()
      await expect(videos.nth(index)).toHaveAttribute(
        'aria-label',
        `${project.name} - ${clip.title}`,
      )
    }
  }
})

test('两个展示页的「返回首页」链接指向 /me/ 且能回到首页', async ({ page }) => {
  for (const slug of slugs) {
    await openShowcase(page, slug)

    const back = page.getByRole('link', { name: '返回首页' })
    await expect(back).toHaveAttribute('href', '/me/')

    await back.click()
    await expect(page).toHaveURL(/\/me\/?$/)
    await expect(page.getByRole('heading', { name: '项目作品', level: 2 })).toBeVisible()
  }
})

test('两个展示页的主题切换按钮可正常切换暗 / 亮色', async ({ page }) => {
  for (const slug of slugs) {
    await openShowcase(page, slug)

    const toggle = page.getByRole('button', { name: /切换到(暗|亮)色模式/ })
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/)

    await toggle.click()
    await expect(page.locator('html')).toHaveClass(/\bdark\b/)
    await expect(toggle).toHaveAttribute('aria-label', '切换到亮色模式')

    await toggle.click()
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/)
    await expect(toggle).toHaveAttribute('aria-label', '切换到暗色模式')
  }
})
