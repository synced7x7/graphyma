import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './styles/navbar.css'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  return (
    <>
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <Link to="/" className="logo-link">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 400 }} className="logo-inner">
            {/* Logo mark */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#0DFFC4" strokeWidth="1.5" />
              <circle cx="14" cy="14" r="5" fill="#0DFFC4" />
              <ellipse cx="14" cy="14" rx="13" ry="5" stroke="#0DFFC4" strokeWidth="1" strokeOpacity="0.4" />
            </svg>
            <span className="brand-text">GRAPH<span className="brand-accent">YMA</span></span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {NAV_LINKS.map(({ path, label }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`nav-link ${active ? 'active' : ''}`}
              >
                {label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="nav-underline"
                  />
                )}
              </Link>
            )
          })}

          {/* Status Badge */}
          <div className="nav-status">
            <div className="status-dot">
              <div className="dot" />
              <div className="ring" />
            </div>
            <span className="status-label">ACTIVE</span>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={{
                rotate: mobileOpen && i === 0 ? 45 : mobileOpen && i === 2 ? -45 : 0,
                y: mobileOpen && i === 0 ? 9 : mobileOpen && i === 2 ? -9 : 0,
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
              className="hamburger-bar"
            />
          ))}
        </button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu"
          >
            {NAV_LINKS.map(({ path, label }, i) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`mobile-link ${location.pathname === path ? 'active' : ''}`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
