import { ArrowLeft, ExternalLink, Link2 } from 'lucide-react'
import { getProject, type ProjectClip } from '../data/projects'
import { DemoVideo } from './DemoVideo'
import { Footer } from './Footer'
import { ThemeToggle } from './ThemeToggle'

function ShowcaseHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href={import.meta.env.BASE_URL}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft size={16} />
          返回首页
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}

function ClipSection({
  clip,
  orientation,
  projectName,
}: {
  clip: ProjectClip
  orientation: 'portrait' | 'landscape'
  projectName: string
}) {
  return (
    <section className="py-12 first:pt-0 last:pb-0">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{clip.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {clip.description}
      </p>
      <div className="mt-6 flex justify-center">
        <DemoVideo
          src={clip.src}
          poster={clip.poster}
          ariaLabel={`${projectName} - ${clip.title}`}
          className={
            orientation === 'portrait'
              ? 'h-72 w-auto rounded-lg border border-gray-200 object-cover dark:border-gray-700 sm:h-96'
              : 'aspect-[3/2] w-full rounded-lg border border-gray-200 object-cover dark:border-gray-700'
          }
        />
      </div>
    </section>
  )
}

export function ShowcasePage({ slug }: { slug: string }) {
  const project = getProject(slug)

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <p className="text-sm text-gray-500 dark:text-gray-400">没有找到这个项目的示例展示。</p>
        <a
          href={import.meta.env.BASE_URL}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft size={16} />
          返回首页
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* title / description 静态写在各 showcase/*.html 中，避免 Helmet 在 React 19 下注入空 title */}
      <ShowcaseHeader />

      <main className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
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
                className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
              >
                <ExternalLink size={16} />
                在线体验
              </a>
            )}
          </div>

          <div className="mt-14 divide-y divide-gray-100 dark:divide-gray-800">
            {project.clips.map((clip) => (
              <ClipSection
                key={clip.id}
                clip={clip}
                orientation={project.orientation}
                projectName={project.name}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
