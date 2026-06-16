export interface Project {
  name: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
}

export const projects: Project[] = [
  {
    name: '电商后台管理系统',
    description:
      '基于 RBAC 的通用后台管理模板，支持用户、角色、权限管理以及商品、订单 CRUD',
    techStack: [
      'Spring Boot',
      'Spring Security',
      'MyBatis-Plus',
      'MySQL',
      'Redis',
      'React',
      'Ant Design',
    ],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    name: '接口开放平台',
    description:
      '提供 API 注册、调用、限流、计费功能，开发者可自助接入',
    techStack: [
      'Spring Boot',
      'Spring Cloud Gateway',
      'RabbitMQ',
      'Docker',
    ],
    githubUrl: '#',
  },
  {
    name: '个人博客系统',
    description:
      '支持 Markdown 编辑、标签分类、全文搜索的轻量博客',
    techStack: [
      'Spring Boot',
      'PostgreSQL',
      'Elasticsearch',
      'React',
      'Tailwind CSS',
    ],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    name: '实时数据看板',
    description: '企业内部数据可视化看板，多数据源聚合展示',
    techStack: ['React', 'ECharts', 'Spring Boot', 'WebSocket', 'Redis'],
    githubUrl: '#',
  },
]
