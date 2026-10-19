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

/**
 * 视频与封面体积大，生产环境可放到对象存储 + CDN：
 * 构建时通过 VITE_MEDIA_BASE 配置（必须以 / 结尾，如 https://cdn.example.com/demos/）。
 * 未配置时回退到站点同源的 /me/demos/（本地开发与 e2e 走 public/demos）。
 * 用 || 而不是 ??：未设置该变量时 Vite 会静态替换为空字符串。
 */
const mediaBase: string =
  import.meta.env.VITE_MEDIA_BASE || `${import.meta.env.BASE_URL}demos/`
const asset = (path: string) => `${mediaBase}${path}`
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
  {
    slug: 'myinterviewquestion',
    name: '面试题速记',
    description:
      '把题库 PDF 变成手机上能一道一道背的卡片。上传 PDF 自动按版式切成题目入库，题答同屏翻卡，顺序 / 随机随时切换；进度存在服务端，换台设备登录也能接着背。复习模式把答案藏起来，对着题目开口讲并录音，讲完再点开答案对照，AI 还会顺手提炼每题的「回答重点」。',
    techStack: ['React 19', 'TypeScript', 'Vite', 'Express', 'SQLite', 'pdf.js', 'PWA'],
    githubUrl: 'https://github.com/tfcekyxh/myinterviewquestion',
    demoUrl: 'https://interview-flashcards-29811.app.workbuddy.host/',
    orientation: 'portrait',
    clips: [
      clip(
        'myinterviewquestion',
        '01-login-home',
        '登录与首页',
        '单账号登录后进首页，进度卡一眼看到「已背 18/60」，接着上次的位置继续往下背。',
      ),
      clip(
        'myinterviewquestion',
        '02-import',
        'PDF 导入题库',
        '上传题库 PDF，按版式自动切成题目并解析入库；先确认解析结果，再整批替换旧题库。',
      ),
      clip(
        'myinterviewquestion',
        '03-recite',
        '背诵：翻卡 · 自动阅读 · AI 重点',
        '题答同屏翻卡，顺序 / 随机随时切换；可开自动阅读朗读题干与答案，AI 顺手提炼「回答重点」，进度存服务端、刷新不丢。',
      ),
      clip(
        'myinterviewquestion',
        '04-review',
        '复习：开口讲 · 对照答案',
        '答案先不进 DOM，对着题目开口讲并录音；讲完点开答案对照、回放自己的录音，翻下一题答案重新藏起。',
      ),
      clip(
        'myinterviewquestion',
        '05-clips-bank',
        '我的录音与题库管理',
        '录音只存本机、无语音上传，可逐条回听并导出；题库管理里能把整库导出成 JSON，换设备导入即还原。',
      ),
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
