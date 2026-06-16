import { ExternalLink, Link2 } from 'lucide-react'
import { projects } from '../data/projects'
import { AnimatedSection } from './AnimatedSection'

function ProjectCard({
  name,
  description,
  techStack,
  githubUrl,
  demoUrl,
}: (typeof projects)[number]) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {name}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {description}
      </p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {githubUrl && (
          <a
            href={githubUrl}
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <Link2 size={16} />
            源码
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <ExternalLink size={16} />
            演示
          </a>
        )}
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="px-4 sm:px-6 lg:px-8 py-24">
      <AnimatedSection className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          项目作品
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          以上为占位项目，真实项目信息待替换
        </p>
      </AnimatedSection>
    </section>
  )
}
