import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          padding: '1.1rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none',
          background: scrolled
            ? 'rgba(5, 12, 11, 0.82)'
            : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(13,255,196,0.06)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {/* Logo mark */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#0DFFC4" strokeWidth="1.5" />
              <circle cx="14" cy="14" r="5" fill="#0DFFC4" />
              <ellipse cx="14" cy="14" rx="13" ry="5" stroke="#0DFFC4" strokeWidth="1" strokeOpacity="0.4" />
            </svg>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#EBF7F5',
            }}>
              GRAPH<span style={{ color: '#0DFFC4' }}>YMA</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
        }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(({ path, label }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: active ? '#0DFFC4' : '#6BBAB5',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
              >
                {label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: '#0DFFC4',
                      boxShadow: '0 0 8px rgba(13,255,196,0.8)',
                    }}
                  />
                )}
              </Link>
            )
          })}

          {/* Status Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.1rem',
            background: 'rgba(13,255,196,0.06)',
            border: '1px solid rgba(13,255,196,0.18)',
            borderRadius: '50px',
          }}>
            <div style={{ position: 'relative', width: 7, height: 7 }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#0DFFC4',
                animation: 'pulse-dot 2.5s ease-in-out infinite',
              }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px solid #0DFFC4',
                animation: 'pulse-ring 2.5s ease-out infinite',
              }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: '#0DFFC4',
            }}>
              ACTIVE
            </span>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
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
              style={{
                display: 'block',
                width: 22,
                height: 1.5,
                background: '#0DFFC4',
                borderRadius: 2,
                transformOrigin: 'center',
              }}
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
            style={{
              position: 'fixed',
              top: 70,
              left: 0,
              right: 0,
              zIndex: 850,
              background: 'rgba(5, 12, 11, 0.96)',
              backdropFilter: 'blur(30px)',
              borderBottom: '1px solid rgba(13,255,196,0.1)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
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
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: location.pathname === path ? '#0DFFC4' : '#EBF7F5',
                    letterSpacing: '0.05em',
                  }}
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
