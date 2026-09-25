export interface ProjectClip {
  /** 片段说明，用作视频 aria-label */
  title: string
  src: string
  poster: string
}

export interface Project {
  name: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  /** 演示视频的画幅，决定卡片内媒体区的摆放方式 */
  orientation: 'portrait' | 'landscape'
  clip: ProjectClip
}

/** 部署在 GitHub Pages 子路径 /me/ 下，静态资源要拼上 base */
const asset = (path: string) => `${import.meta.env.BASE_URL}demos/${path}`

export const projects: Project[] = [
  {
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
    clip: {
      title: '卡片学习演示：翻卡、行筛选与 AI 口诀',
      src: asset('jplearn/01-cards.mp4'),
      poster: asset('jplearn/01-cards.poster.jpg'),
    },
  },
  {
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
    clip: {
      title: '核心编辑流演示：模块化编辑、拖拽排序与草稿自动保存',
      src: asset('mymenu/01-editing.mp4'),
      poster: asset('mymenu/01-editing.poster.jpg'),
    },
  },
]
