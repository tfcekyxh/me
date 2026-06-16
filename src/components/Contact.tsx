import { Mail } from 'lucide-react'

const SOCIAL_LINKS = [
  { label: '邮箱', href: 'mailto:2073887899@qq.com', icon: Mail, value: '2073887899@qq.com' },
]

export function Contact() {
  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          联系方式
        </h2>

        <div className="flex flex-col items-center gap-4">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200"
              >
                <Icon size={18} />
                <span className="text-sm">{link.value}</span>
              </a>
            )
          })}
        </div>

        <p className="mt-10 text-sm text-gray-400">
          GitHub / LinkedIn 待补充
        </p>
      </div>
    </section>
  )
}
