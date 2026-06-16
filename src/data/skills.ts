import {
  Code2,
  Atom,
  Leaf,
  Cloud,
  Database,
  MessageCircle,
  Container,
  Workflow,
  Ship,
  PenTool,
  type LucideIcon,
} from 'lucide-react'

export interface Skill {
  name: string
  icon: LucideIcon
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    category: '后端语言',
    skills: [{ name: 'Java', icon: Code2 }],
  },
  {
    category: '前端',
    skills: [{ name: 'React', icon: Atom }],
  },
  {
    category: '框架',
    skills: [
      { name: 'Spring Boot', icon: Leaf },
      { name: 'Spring Cloud', icon: Cloud },
    ],
  },
  {
    category: '中间件',
    skills: [
      { name: 'MySQL', icon: Database },
      { name: 'Redis', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'RabbitMQ', icon: MessageCircle },
    ],
  },
  {
    category: '运维',
    skills: [
      { name: 'Docker', icon: Container },
      { name: 'Jenkins', icon: Workflow },
      { name: 'Kubernetes', icon: Ship },
    ],
  },
  {
    category: '软技能',
    skills: [{ name: '画原型图', icon: PenTool }],
  },
]
