export interface ProjectClip {
  /** 文件名（不含扩展名），同时用于推导 src / poster */
  id: string
  /** 片段标题，展示页中作为小节标题 */
  title: string
  /** 片段内容的一句话说明 */
  description: string
  src: string
  poster: string
}

export interface Project {
  /** 示例展示页的 URL slug，对应 showcase/{slug}.html */
  slug: string
  name: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  /** 演示视频的画幅，决定卡片 / 展示页中视频的摆放方式 */
  orientation: 'portrait' | 'landscape'
  /** 全部演示片段，首页使用第一条，展示页按顺序铺排 */
  clips: ProjectClip[]
}

/** 部署在 GitHub Pages 子路径 /me/ 下，静态资源要拼上 base */
const asset = (path: string) => `${import.meta.env.BASE_URL}demos/${path}`
const clip = (dir: string, id: string, title: string, description: string): ProjectClip => ({
  id,
  title,
  description,
  src: asset(`${dir}/${id}.mp4`),
  poster: asset(`${dir}/${id}.poster.jpg`),
})

export const projects: Project[] = [
  {
    slug: 'jplearn',
    name: '五十音速成',
    description:
      '移动端优先的日语五十音学习工具，纯前端、零后端、可离线。46 个假名卡片带发音与 AI 速记口诀，28 个基础单词认读，随机测验按已学范围出题并自动记录错题；学习进度存在浏览器本地，关掉再打开还在。',
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS 4',
      'IndexedDB',
      'Vercel AI SDK',
    ],
    githubUrl: 'https://github.com/tfcekyxh/jplearn',
    demoUrl: 'https://tfcekyxh.github.io/jplearn/',
    orientation: 'portrait',
    clips: [
      clip(
        'jplearn',
        '01-cards',
        '卡片学习',
        '假名正反卡，按行（あ / か / さ…）筛选，点一下听发音；记不住时一键生成 AI 速记口诀。',
      ),
      clip(
        'jplearn',
        '02-quiz',
        '假名测验',
        '看假名输入罗马音，自绘键盘答题；题目只从已学范围出，答错自动收入错题本。',
      ),
      clip(
        'jplearn',
        '03-reading',
        '拼读练习',
        '28 个基础单词逐个认读：假名、汉字、释义与发音，标记「会 / 不会」，进度留在本地。',
      ),
    ],
  },
  {
    slug: 'mymenu',
    name: '简历工作台',
    description:
      '填内容即出稿的在线简历编辑器，省掉反复调 Word 样式的功夫。模块化编辑 + 拖拽排序，草稿自动保存、可存档版本随时回滚；粘贴文本或上传 docx / PDF 交给大模型解析后自动回填，一键导出 docx 与 PDF。',
    techStack: [
      'React 19',
      'TypeScript',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Bun',
      'Railway',
    ],
    githubUrl: 'https://github.com/tfcekyxh/myresume',
    demoUrl: 'https://genresume.up.railway.app',
    orientation: 'landscape',
    clips: [
      clip(
        'mymenu',
        '01-editing',
        '核心编辑流',
        '信息拆成模块逐块填写，模块可拖拽排序；像填表单一样完成整份简历，不再和 Word 样式较劲。',
      ),
      clip(
        'mymenu',
        '02-autosave-photo',
        '自动保存与证件照',
        '每次修改自动存为草稿，刷新不丢；证件照在浏览器端压缩为 234×260 的 JPEG 后再上传。',
      ),
      clip(
        'mymenu',
        '03-import',
        'AI 导入简历',
        '粘贴文本或上传 docx / PDF，大模型解析结构后自动回填各模块，核对一遍即可继续编辑。',
      ),
      clip(
        'mymenu',
        '04-version-export',
        '版本存档与导出',
        '重要节点一键存档，归档版本可预览、恢复；定稿后直接导出 Word 与 PDF。',
      ),
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
