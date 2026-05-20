import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HeroSection from './components/HeroSection'
import FeaturedShowcase from './components/FeaturedShowcase'

const heroRoot = document.getElementById('hero-root')
if (heroRoot) {
  createRoot(heroRoot).render(
    <StrictMode>
      <HeroSection />
    </StrictMode>,
  )
}

const showcaseRoot = document.getElementById('featured-showcase-root')
if (showcaseRoot) {
  createRoot(showcaseRoot).render(
    <StrictMode>
      <FeaturedShowcase />
    </StrictMode>,
  )
}
