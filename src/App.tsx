import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <Hero />

      <section id="skills" className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">技能板块（阶段 4）</p>
      </section>

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
