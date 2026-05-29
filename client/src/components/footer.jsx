import { Link } from 'react-router-dom'
/* import { motion } from 'framer-motion' */

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(13,255,196,0.07)', padding: '4.5rem 0 2rem', overflow: 'hidden' }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 900, height: 260,
        background: 'radial-gradient(ellipse at center bottom, rgba(13,255,196,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3.5rem',
        }} className="footer-cols">

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.25rem', textDecoration: 'none' }}>
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#0DFFC4" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="5" fill="#0DFFC4" />
                <ellipse cx="14" cy="14" rx="13" ry="5" stroke="#0DFFC4" strokeWidth="1" strokeOpacity="0.4" />
              </svg>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.08em', color: '#EBF7F5' }}>
                GRAPH<span style={{ color: '#0DFFC4' }}>YMA</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.85rem', color: '#2E5F5C', lineHeight: 1.8, maxWidth: 340 }}>
              We help clients understand, adopt, and apply Earth Observation solutions in practice.
            </p>
            <div style={{
              marginTop: '1.75rem',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.45rem 1rem',
              background: 'rgba(13,255,196,0.04)',
              border: '1px solid rgba(13,255,196,0.12)',
              borderRadius: 50,
            }}>
              <div style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0DFFC4', animation: 'pulse-dot 2.5s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid #0DFFC4', animation: 'pulse-ring 2.5s ease-out infinite' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#0DFFC4' }}>ACTIVE</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0DFFC4', marginBottom: '1.4rem' }}>Navigate</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[['/', 'Home'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
                <Link
                  key={to} to={to}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#3D8A85', transition: 'color 0.28s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#0DFFC4' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#3D8A85' }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0DFFC4', marginBottom: '1.4rem' }}>Services</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {['Remote Sensing', 'Communications', 'Trainings', 'Project Management'].map(s => (
                <span key={s} style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#3D8A85' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* Bottom bar */}
        <div style={{
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: '#1A4040' }}>
            © {year} GRAPHYMA. All rights reserved.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', color: '#1A4040' }}>
              Earth Observation Solutions
            </span>
            <div style={{ width: 1, height: 12, background: 'rgba(13,255,196,0.12)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: '#1A4040' }}>
              EST. 2024
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}