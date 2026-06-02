import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import RemoteSensing from './pages/RemoteSensing'
import Communications from './pages/Communications'
import Trainings from './pages/Trainings'
import ProjectManagement from './pages/ProjectManagement'

const THEME_COOKIE = 'graphyma-theme'

function readThemeCookie() {
  if (typeof document === 'undefined') return 'dark'

  const match = document.cookie.match(new RegExp(`(?:^|; )${THEME_COOKIE}=([^;]*)`))
  const value = match ? decodeURIComponent(match[1]) : ''
  return value === 'light' ? 'light' : 'dark'
}

function writeThemeCookie(theme) {
  if (typeof document === 'undefined') return

  document.cookie = `${THEME_COOKIE}=${encodeURIComponent(theme)}; path=/; max-age=31536000; samesite=lax`
}

function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const positions = useRef(new Map())
  const prevPath = useRef('')
  const pathKey = `${location.pathname}${location.search}`

  useEffect(() => {
    return () => {
      positions.current.set(pathKey, window.scrollY)
    }
  }, [pathKey])

  useEffect(() => {
    const prevRoute = prevPath.current
    prevPath.current = location.pathname
    const saved = positions.current.get(pathKey)
    if (navType === 'POP' && saved !== undefined) {
      const html = document.documentElement
      const prevBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      if (location.pathname === '/' && prevRoute.startsWith('/services/')) {
        requestAnimationFrame(() => {
          const target = document.getElementById('services')
          if (target) {
            target.scrollIntoView({ block: 'start' })
          } else {
            window.scrollTo({ top: saved, behavior: 'auto' })
          }
        })
      } else if (location.pathname === '/about' && prevRoute.startsWith('/services/')) {
        requestAnimationFrame(() => {
          const target = document.getElementById('pillars')
          if (target) {
            target.scrollIntoView({ block: 'start' })
          } else {
            window.scrollTo({ top: saved, behavior: 'auto' })
          }
        })
      } else {
        window.scrollTo({ top: saved, behavior: 'auto' })
      }
      html.style.scrollBehavior = prevBehavior
      return
    }
    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, behavior: 'auto' })
    html.style.scrollBehavior = prevBehavior
  }, [pathKey, navType])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/remote-sensing" element={<RemoteSensing />} />
        <Route path="/services/communications" element={<Communications />} />
        <Route path="/services/trainings" element={<Trainings />} />
        <Route path="/services/project-management" element={<ProjectManagement />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => readThemeCookie())

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    writeThemeCookie(theme)
  }, [theme])

  return (
    <BrowserRouter>
      <div className="noise-overlay" />
      <ScrollManager />
      <Navbar theme={theme} onThemeToggle={() => setTheme(current => (current === 'dark' ? 'light' : 'dark'))} />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
