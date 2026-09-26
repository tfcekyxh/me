import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { ShowcasePage } from '../components/ShowcasePage'

// slug 由各 showcase/*.html 的 #root data-slug 指定；
// title / description 直接静态写在对应 HTML 中
const slug = document.getElementById('root')?.dataset.slug ?? ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShowcasePage slug={slug} />
  </StrictMode>,
)
