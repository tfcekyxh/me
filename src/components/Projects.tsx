import { ExternalLink, Link2 } from 'lucide-react'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { AnimatedSection } from './AnimatedSection'
import { DemoVideo } from './DemoVideo'

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex gap-3">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <Link2 size={16} />
          源码
        </a>
      )}
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <ExternalLink size={16} />
          在线体验
        </a>
      )}
    </div>
  )
}

function ProjectCard({ project, reverse }: { project: Project; reverse?: boolean }) {
  const isPortrait = project.orientation === 'portrait'

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
        {/* 媒体栏：移动端在上、桌面端与文字左右并排；第二张卡桌面端换到右侧 */}
        <figure
          className={`flex shrink-0 flex-col items-center gap-2 md:w-[42%] ${
            reverse ? 'md:order-2' : ''
          }`}
        >
          <DemoVideo
            src={project.clip.src}
            poster={project.clip.poster}
            ariaLabel={`${project.name} - ${project.clip.title}`}
            className={
              isPortrait
                ? 'h-72 w-auto rounded-lg border border-gray-200 object-cover dark:border-gray-700 sm:h-80 md:h-[380px]'
                : 'aspect-[3/2] w-full rounded-lg border border-gray-200 object-cover dark:border-gray-700'
            }
          />
          <figcaption className="text-xs text-gray-400 dark:text-gray-500">
            {project.clip.title}
          </figcaption>
        </figure>

        {/* 文案栏 */}
        <div className={`min-w-0 flex-1 ${reverse ? 'md:order-1' : ''}`}>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {project.name}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {project.description}
          </p>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>

          <ProjectLinks project={project} />
        </div>
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

        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} reverse={index % 2 === 1} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}
