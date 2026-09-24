import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SEO } from './components/SEO'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <SEO />
      <Navbar />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
