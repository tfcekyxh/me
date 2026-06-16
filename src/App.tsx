import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <Hero />
      <Skills />

      <section id="projects" className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">项目板块（阶段 5）</p>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">联系方式板块（阶段 6）</p>
      </section>
    </div>
  )
}

export default App
