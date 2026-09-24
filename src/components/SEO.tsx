import { Helmet } from 'react-helmet-async'

export function SEO() {
  return (
    <Helmet>
      <title>靠枕 - 全栈工程师</title>
      <meta name="description" content="偏后端的全栈程序员，技术栈以 Java / Spring Boot / React 为主。个人介绍与作品展示。" />

      <meta property="og:title" content="靠枕 - 全栈工程师" />
      <meta property="og:description" content="偏后端的全栈程序员，技术栈以 Java / Spring Boot / React 为主。" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="靠枕 - 全栈工程师" />
      <meta name="twitter:description" content="偏后端的全栈程序员，技术栈以 Java / Spring Boot / React 为主。" />
    </Helmet>
  )
}
