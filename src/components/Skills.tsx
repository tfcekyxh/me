import { skillCategories } from '../data/skills'
import { AnimatedSection } from './AnimatedSection'

export function Skills() {
  return (
    <section id="skills" className="px-4 sm:px-6 lg:px-8 py-24">
      <AnimatedSection className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          技能
        </h2>

        <div className="space-y-10">
          {skillCategories.map((cat) => (
            <div key={cat.category}>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      <Icon size={14} />
                      {skill.name}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}
