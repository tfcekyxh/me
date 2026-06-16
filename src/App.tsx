import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">联系方式板块（阶段 6）</p>
      </section>
    </div>
  )
}

export default App
