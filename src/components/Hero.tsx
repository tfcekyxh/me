export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl">
        {/* avatar placeholder */}
        <div className="mb-8 flex justify-center md:justify-start">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-4xl font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400 md:h-32 md:w-32">
            六
          </div>
        </div>

        {/* name + title */}
        <h1 className="mb-4 text-center text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 md:text-left md:text-5xl">
          六件套
        </h1>
        <div className="mb-10 flex justify-center md:justify-start">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            全栈工程师
          </span>
        </div>

        {/* intro paragraphs */}
        <div className="space-y-5 text-base leading-relaxed text-gray-500 dark:text-gray-400 md:text-lg">
          <p>
            偏后端的全栈程序员，一年工作经验。目前正处于职业迷茫期，在不断尝试和探索中找到自己真正热爱的技术方向。
          </p>
          <p>
            技术栈以 Java 后端为主，熟悉 Spring Boot / Spring Cloud
            微服务生态，同时具备 React
            前端开发能力，能够独立完成全栈项目开发。
          </p>
          <p>
            相信技术是为了解决实际问题而存在的，不喜欢为了炫技而引入不必要的复杂度。业余时间偶尔画产品原型图，对产品设计也有一定兴趣。
          </p>
        </div>
      </div>
    </section>
  )
}
