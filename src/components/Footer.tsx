export function Footer() {
  return (
    <footer className="border-t border-gray-100 px-4 py-8 dark:border-gray-800">
      <div className="mx-auto max-w-4xl text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} 六件套 &mdash; 基于 React + Vite + Tailwind CSS
          构建
        </p>
      </div>
    </footer>
  )
}
