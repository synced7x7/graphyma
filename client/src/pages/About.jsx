import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ── Page transition ───────────────────────────── */
const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.35 } },
}

/* ── Data ──────────────────────────────────────── */
const PILLARS = [
  {
    num: '01',
    title: 'Satellite Data Analysis',
    body: 'Deep expertise in processing and interpreting multispectral, SAR, and hyperspectral imagery from Sentinel, Landsat, and commercial platforms for real-world decision support.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 28, height: 28 }}>
        <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        <path d="M20 3v4M20 33v4M3 20h4M33 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 5"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Digital Consultancy',
    body: 'Strategic guidance on digital transformation, EO platform adoption, and data infrastructure — bridging the gap between cutting-edge satellite capabilities and practical organisational use.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 28, height: 28 }}>
        <rect x="4" y="8" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="4" y1="14" x2="36" y2="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
        <circle cx="9" cy="11" r="1.5" fill="currentColor" fillOpacity="0.5"/>
        <circle cx="14" cy="11" r="1.5" fill="currentColor" fillOpacity="0.5"/>
        <line x1="14" y1="30" x2="26" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="20" y1="30" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="10" y1="19" x2="30" y2="19" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
        <line x1="10" y1="23" x2="24" y2="23" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Professional Training',
    body: 'Capacity-building programmes for institutions, businesses, and researchers — from foundational EO concepts to advanced remote sensing workflows and platform-specific skills.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 28, height: 28 }}>
        <path d="M20 5L38 14L20 23L2 14L20 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M38 14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 19V30C9 30 13 36 20 36C27 36 31 30 31 30V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="34" cy="33" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M32.5 33L33.5 34L35.5 32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Project Management',
    body: 'End-to-end coordination of EO and digital projects — from inception to delivery — across multi-stakeholder European and international contexts, with a focus on impact and efficiency.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{ width: 28, height: 28 }}>
        <rect x="3"  y="5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="22" y="5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="25" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10.5 15V20H29.5V15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
        <line x1="20" y1="20" x2="20" y2="25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
      </svg>
    ),
  },
]

const VALUES = [
  { label: 'Accessible', desc: 'Advanced knowledge made actionable for all organisations, not just specialists.' },
  { label: 'Ambitious',  desc: 'Startup drive combined with institutional-grade expertise and standards.' },
  { label: 'Collaborative', desc: 'Built on years of partnership with Europe\'s leading EO bodies and institutions.' },
]

const STORY_PARAS = [
  {
    label: 'Our Vision',
    heading: 'EO for everyone',
    text: 'GRAPHYMA reflects a modern vision of how Earth Observation can create value across both public and private sectors. The company was built with the idea that advanced technological knowledge should not remain confined to specialist circles, but should become accessible, useful, and actionable for businesses, institutions, researchers, and international partners.',
  },
  {
    label: 'What We Do',
    heading: 'Intelligence from orbit',
    text: 'At its core, GRAPHYMA offers specialised services in satellite data analysis, digital consultancy, professional training, and project management. Its Earth Observation expertise allows the company to develop tailored solutions for environmental challenges, while its broader technological perspective supports clients in digital transformation, operational efficiency, and data-informed planning.',
  },
  {
    label: 'Our Ambition',
    heading: 'A regional reference',
    text: 'GRAPHYMA\'s long-term ambition is to become a trusted regional reference in Earth Observation services, contributing to digital development, knowledge transfer, and international collaboration. Whether working with companies, institutions, universities, or global partners, the company aims to build solutions that are intelligent, relevant, and forward-looking.',
  },
]

/* ── Orbital SVG background element ───────────── */
function OrbitalBg({ style }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <circle cx="300" cy="300" r="280" stroke="rgba(13,255,196,0.04)" strokeWidth="1"/>
      <circle cx="300" cy="300" r="200" stroke="rgba(13,255,196,0.06)" strokeWidth="1" strokeDasharray="4 8"/>
      <circle cx="300" cy="300" r="120" stroke="rgba(13,255,196,0.08)" strokeWidth="1"/>
      <circle cx="300" cy="300" r="50"  fill="rgba(13,255,196,0.03)" stroke="rgba(13,255,196,0.15)" strokeWidth="1"/>
      <circle cx="300" cy="300" r="10"  fill="rgba(13,255,196,0.4)"/>
    </svg>
  )
}

/* ── Component ─────────────────────────────────── */
export default function About() {
  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 120, paddingBottom: 100 }}>
        <OrbitalBg style={{ top: '-10%', right: '-15%', width: 600, height: 600, opacity: 0.7 }} />
        <div className="grid-bg" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            About GRAPHYMA
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', maxWidth: 800, marginTop: '0.75rem' }}
          >
            Connecting{' '}
            <span className="gradient-text">Earth Observation</span>
            {' '}with the real world
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ fontSize: '1.05rem', color: '#6BBAB5', lineHeight: 1.8, maxWidth: 560, marginTop: '1.75rem' }}
          >
            GRAPHYMA is not only a startup with technical expertise, but a growing platform for connecting Earth Observation with the challenges and opportunities of the real world.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STORY SECTIONS
      ══════════════════════════════════════ */}
      {STORY_PARAS.map(({ label, heading, text }, i) => (
        <section key={label} style={{
          padding: '80px 0',
          background: i % 2 === 1 ? 'rgba(13,255,196,0.015)' : 'transparent',
          borderTop: '1px solid rgba(13,255,196,0.05)',
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: i % 2 === 1 ? '1fr 2fr' : '2fr 1fr', gap: '4rem', alignItems: 'start' }} className="story-grid">
              {i % 2 === 1 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75 }}
                  >
                    <span className="section-label">{label}</span>
                    <div style={{
                      marginTop: '1rem',
                      width: 80, height: 80, borderRadius: 20,
                      background: 'rgba(13,255,196,0.06)', border: '1px solid rgba(13,255,196,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'rgba(13,255,196,0.3)', lineHeight: 1 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                  >
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '1.25rem' }}>
                      <span className="gradient-text">{heading}</span>
                    </h2>
                    <p style={{ color: '#6BBAB5', lineHeight: 1.85, fontSize: '0.95rem' }}>{text}</p>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75 }}
                  >
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '1.25rem' }}>
                      <span className="gradient-text">{heading}</span>
                    </h2>
                    <p style={{ color: '#6BBAB5', lineHeight: 1.85, fontSize: '0.95rem' }}>{text}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <div>
                      <span className="section-label">{label}</span>
                      <div style={{
                        marginTop: '1rem',
                        width: 80, height: 80, borderRadius: 20,
                        background: 'rgba(13,255,196,0.06)', border: '1px solid rgba(13,255,196,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'rgba(13,255,196,0.3)', lineHeight: 1 }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* ══════════════════════════════════════
          CAPABILITIES
      ══════════════════════════════════════ */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="glow-tl" />
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <motion.span className="section-label" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Capabilities
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginTop: '0.75rem' }}
            >
              Four pillars of{' '}
              <span className="gradient-text">expertise</span>
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {PILLARS.map(({ num, title, body, icon }, i) => (
              <motion.div
                key={num}
                className="glass"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ padding: '2rem', position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius)' }}
              >
                <div style={{
                  position: 'absolute', top: -8, right: 12,
                  fontFamily: 'var(--font-display)', fontSize: '5rem',
                  fontWeight: 800, color: 'rgba(13,255,196,0.04)',
                  lineHeight: 1, userSelect: 'none',
                }}>{num}</div>

                <div style={{
                  width: 54, height: 54, borderRadius: 13,
                  background: 'rgba(13,255,196,0.07)', border: '1px solid rgba(13,255,196,0.14)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0DFFC4', marginBottom: '1.4rem',
                }}>
                  {icon}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
                  color: '#EBF7F5', marginBottom: '0.75rem', letterSpacing: '0.01em', lineHeight: 1.3,
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.87rem', color: '#6BBAB5', lineHeight: 1.75 }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VALUES
      ══════════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(13,255,196,0.06)', position: 'relative', overflow: 'hidden' }}>
        <OrbitalBg style={{ bottom: '-20%', left: '-10%', width: 500, height: 500, opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="values-grid">

            {/* Left: quote / vision statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
            >
              <div style={{
                padding: '2.5rem',
                background: 'rgba(13,255,196,0.025)',
                border: '1px solid rgba(13,255,196,0.1)',
                borderRadius: 20,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: -1, left: '2rem',
                  width: 60, height: 2,
                  background: 'linear-gradient(90deg, #0DFFC4, transparent)',
                }} />
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  letterSpacing: '0.2em', color: '#0DFFC4',
                  marginBottom: '1.25rem', textTransform: 'uppercase',
                }}>
                  Mission Statement
                </div>
                <blockquote style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)',
                  fontWeight: 600, color: '#EBF7F5', lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                }}>
                  "Advanced technological knowledge should not remain confined to specialist circles, but should become{' '}
                  <span style={{ color: '#0DFFC4' }}>accessible, useful, and actionable</span>{' '}
                  for everyone."
                </blockquote>
                <div style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#2E5F5C' }}>
                  — GRAPHYMA VISION
                </div>
              </div>
            </motion.div>

            {/* Right: values list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15 }}
            >
              <span className="section-label">Core Values</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', marginBottom: '2rem', marginTop: '0.75rem' }}>
                What drives{' '}
                <span className="gradient-text">GRAPHYMA</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {VALUES.map(({ label, desc }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6 }}
                    style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}
                  >
                    <div style={{
                      flexShrink: 0, width: 34, height: 34, borderRadius: 9,
                      background: 'rgba(13,255,196,0.07)', border: '1px solid rgba(13,255,196,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: '0.1rem',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.5 10.5L12 4" stroke="#0DFFC4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#EBF7F5', marginBottom: '0.3rem' }}>{label}</div>
                      <p style={{ fontSize: '0.87rem', color: '#6BBAB5', lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EXPERTISE BADGES
      ══════════════════════════════════════ */}
      <section style={{ padding: '60px 0 80px', borderTop: '1px solid rgba(13,255,196,0.06)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          >
            <span className="section-label" style={{ justifyContent: 'center' }}>Technology Stack</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', marginTop: '0.75rem' }}>
              Built on <span className="gradient-text">industry-leading</span> platforms
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: 700, margin: '0 auto' }}
          >
            {[
              'Copernicus Services', 'Google Earth Engine', 'ESA SNAP', 'QGIS', 'Python / NumPy',
              'Sentinel Hub', 'ArcGIS', 'OpenEO', 'Jupyter', 'GDAL', 'ENVI', 'SNAP Toolbox',
              'Machine Learning', 'Time-Series Analysis', 'SAR Processing',
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                style={{
                  padding: '0.45rem 1.1rem',
                  background: 'rgba(13,255,196,0.04)',
                  border: '1px solid rgba(13,255,196,0.12)',
                  borderRadius: 50,
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  letterSpacing: '0.1em', color: '#6BBAB5',
                  whiteSpace: 'nowrap',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem',
              alignItems: 'center', flexWrap: 'wrap',
              padding: '3rem', background: 'rgba(13,255,196,0.022)',
              border: '1px solid rgba(13,255,196,0.09)', borderRadius: 20,
            }}
            className="about-cta-grid"
          >
            <div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', marginBottom: '0.75rem' }}>
                Ready to work with us?
              </h2>
              <p style={{ fontSize: '0.93rem', color: '#6BBAB5', lineHeight: 1.75, maxWidth: 480 }}>
                Whether you are an institution, company, or research body — GRAPHYMA can help you unlock the value of Earth Observation.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
              <Link to="/contact" className="btn-primary">
                Contact Us
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/" className="btn-outline">Back to Home</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .story-grid     { grid-template-columns: 1fr !important; }
          .values-grid    { grid-template-columns: 1fr !important; }
          .about-cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.main>
  )
}