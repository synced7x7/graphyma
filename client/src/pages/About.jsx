import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './styles/About.css'

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
    link: '/services/remote-sensing',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
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
    link: '/services/communications',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
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
    link: '/services/trainings',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
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
    link: '/services/project-management',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
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

const pillarHover = {
  rest: { y: 0, boxShadow: 'none' },
  hover: { y: -6, boxShadow: '0 0 30px rgba(13,255,196,0.12)' },
}

const scanLine = {
  rest: { top: '-110%', opacity: 0 },
  hover: { top: '120%', opacity: 1, transition: { duration: 0.7, ease: 'linear' } },
}

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
    <svg viewBox="0 0 600 600" fill="none" className="about-orbit-bg" style={style}>
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
      <section className="about-hero">
        <OrbitalBg style={{ top: '-10%', right: '-15%', width: 600, height: 600, opacity: 0.7 }} />
        <div className="grid-bg" />

        <div className="container about-hero-container">
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
            className="about-hero-title"
          >
            Connecting{' '}
            <span className="gradient-text">Earth Observation</span>
            {' '}with the real world
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="about-hero-copy"
          >
            GRAPHYMA is not only a startup with technical expertise, but a growing platform for connecting Earth Observation with the challenges and opportunities of the real world.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STORY SECTIONS
      ══════════════════════════════════════ */}
      {STORY_PARAS.map(({ label, heading, text }, i) => (
        <section key={label} className={i % 2 === 1 ? 'about-story-section about-story-alt' : 'about-story-section'}>
          <div className="container">
            <div className={i % 2 === 1 ? 'about-story-grid about-story-grid-reverse' : 'about-story-grid'}>
              {i % 2 === 1 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75 }}
                  >
                    <span className="section-label">{label}</span>
                    <div className="about-story-number-card">
                      <span className="about-story-number-text">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                  >
                    <h2 className="about-story-heading">
                      <span className="gradient-text">{heading}</span>
                    </h2>
                    <p className="about-story-text">{text}</p>
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
                    <h2 className="about-story-heading">
                      <span className="gradient-text">{heading}</span>
                    </h2>
                    <p className="about-story-text">{text}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className="about-story-align-right"
                  >
                    <div>
                      <span className="section-label">{label}</span>
                      <div className="about-story-number-card">
                        <span className="about-story-number-text">{String(i + 1).padStart(2, '0')}</span>
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
      <section id="pillars" className="section about-pillars-section">
        <div className="glow-tl" />
        <div className="container">
          <div className="about-pillars-header">
            <motion.span className="section-label" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              Capabilities
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="about-pillars-title"
            >
              Four pillars of{' '}
              <span className="gradient-text">expertise</span>
            </motion.h2>
          </div>

          <div className="about-pillars-grid">
            {PILLARS.map(({ num, title, body, icon, link }, i) => (
              <Link key={num} to={link} className="about-pillars-link">
                <motion.div
                  className="glass about-pillar-card"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  variants={pillarHover}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="about-pillar-number">{num}</div>

                  <div className="about-pillar-icon">
                    {icon}
                  </div>

                  <h3 className="about-pillar-title">
                    {title}
                  </h3>
                  <p className="about-pillar-body">{body}</p>

                  <motion.div
                    variants={scanLine}
                    className="about-pillar-scan"
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VALUES
      ══════════════════════════════════════ */}
      <section className="about-values-section">
        <OrbitalBg style={{ bottom: '-20%', left: '-10%', width: 500, height: 500, opacity: 0.5 }} />
        <div className="container about-values-container">
          <div className="about-values-grid">

            {/* Left: quote / vision statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
            >
              <div className="about-mission-card">
                <div className="about-mission-bar" />
                <div className="about-mission-label">
                  Mission Statement
                </div>
                <blockquote className="about-mission-quote">
                  "Advanced technological knowledge should not remain confined to specialist circles, but should become{' '}
                  <span className="about-mission-highlight">accessible, useful, and actionable</span>{' '}
                  for everyone."
                </blockquote>
                <div className="about-mission-signature">
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
              <h2 className="about-values-title">
                What drives{' '}
                <span className="gradient-text">GRAPHYMA</span>
              </h2>

              <div className="about-values-list">
                {VALUES.map(({ label, desc }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6 }}
                    className="about-value-card"
                  >
                    <div className="about-value-icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.5 10.5L12 4" stroke="#0DFFC4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="about-value-label">{label}</div>
                      <p className="about-value-desc">{desc}</p>
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
      <section className="about-badges-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-badges-header"
          >
            <span className="section-label about-badges-label">Technology Stack</span>
            <h2 className="about-badges-title">
              Built on <span className="gradient-text">industry-leading</span> platforms
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-badges-grid"
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
                className="about-badge"
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
      <section className="about-cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-cta-card"
          >
            <div>
              <h2 className="about-cta-title">
                Ready to work with us?
              </h2>
              <p className="about-cta-copy">
                Whether you are an institution, company, or research body — GRAPHYMA can help you unlock the value of Earth Observation.
              </p>
            </div>
            <div className="about-cta-actions">
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
    </motion.main>
  )
}