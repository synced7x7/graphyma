import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import ParticleBackground from '../components/Particlebackground'
import EarthGlobe from '../components/Earthglobe'
import ServiceCard from '../components/servicecard'
import AnimatedCounter from '../components/Animatedcounter'
import './styles/Home.css'

import {
  remoteSensingImgLight,
  remoteSensingImgDark,
  communicationsImgLight,
  communicationsImgDark,
  trainingsImgLight,
  trainingsImgDark,
  projectManagementImgLight,
  projectManagementImgDark,
} from '../assets/services/index.js'

/* ── Page variants ─────────────────────────────── */
const page = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -30, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}



/* ── Data ──────────────────────────────────────── */
const SERVICES = [
  {
    number: '01', icon: 'remote',
    title: 'Remote Sensing Consultancy',
    description: 'Expert guidance on satellite data acquisition, processing, and interpretation for environmental, agricultural, and urban decision-making.',
    link: '/services/remote-sensing',
    delay: 0,
  },
  {
    number: '02', icon: 'comms',
    title: 'Communications & User Uptake',
    description: 'Bridging the gap between complex Earth Observation capabilities and real-world users through strategic communication and targeted outreach.',
    link: '/services/communications',
    delay: 0.1,
  },
  {
    number: '03', icon: 'training',
    title: 'Trainings',
    description: 'Tailored training programmes designed to upskill professionals in satellite data analysis, GIS platforms, and EO data services.',
    link: '/services/trainings',
    delay: 0.2,
  },
  {
    number: '04', icon: 'pm',
    title: 'Project Management',
    description: 'Strategic oversight and coordination of Earth Observation projects across public, private, and international stakeholder environments.',
    link: '/services/project-management',
    delay: 0.3,
  },
]

const STATS = [
  { target: 16, suffix: 'TB',  label: 'FREE DATA every day',  decimals: 0 },
  { target: 3.5, suffix: 'B',  label: 'Market Today',     decimals: 1 },
  { target: 11.5, suffix: 'K+',   label: 'active satellites worldwide',      decimals: 1 },
  { target: 60,  suffix: '%', label: 'Climate Variables Convered',      decimals: 0 },
  { target: 1,  suffix: 'T$', label: 'USD market forcast by 2030',      decimals: 0 },
]

const FLOAT_LABELS = [
  { label: 'SAR Analysis',      top: '14%', right: '-6%',  delay: 1.1 },
  { label: 'Multispectral',     bottom: '26%', right: '-10%', delay: 1.4 },
  { label: 'Change Detection',  top: '38%', left: '-12%',  delay: 1.7 },
]

const MARKET_FACTS = [
  {
    value: '$46.8B',
    label: 'Projected global satellite market by 2031',
    sub: 'Driven by EO, geospatial intelligence & remote sensing',
  },
  {
    value: '25%',
    label: 'Of the global satellite industry',
    sub: 'Earth Observation is one of the largest segments',
  },
  {
    value: '50%+',
    label: 'Of EO applications',
    sub: 'Supporting agriculture, forestry, environmental monitoring & natural resource management',
  },
  {
    value: '60%',
    label: 'Of Essential Climate Variables',
    sub: 'Can be addressed by satellite data',
  },
]

const ORBIT_NODES = [
  { label: 'ESA',      cx: 80,  cy: 230 },
  { label: 'Copernicus', cx: 330, cy: 80  },
  { label: 'EUMETSAT', cx: 385, cy: 330 },
  { label: 'JRC',      cx: 145, cy: 385 },
]

/* ── Static service image cards ───────────────── */
const SERVICE_VISUALS = [
  {
    title: 'Remote Sensing',
    imgDark: remoteSensingImgDark,
    imgLight: remoteSensingImgLight,
  },
  {
    title: 'Communications',
    imgDark: communicationsImgDark,
    imgLight: communicationsImgLight,
  },
  {
    title: 'Trainings',
    imgDark: trainingsImgDark,
    imgLight: trainingsImgLight,
  },
  {
    title: 'Project Management',
    imgDark: projectManagementImgDark,
    imgLight: projectManagementImgLight,
  },
]


/* ── Component ─────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const globeY      = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textY       = useTransform(scrollYProgress, [0, 1], [0, -55])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasHoveredSat, setHasHoveredSat] = useState(false)
  const [isDark, setIsDark] = useState(document.documentElement.dataset.theme !== 'light')

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.dataset.theme !== 'light')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value > 0.02) {
        setHasScrolled(true)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])


  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit" className="home-page">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="home-hero">
        <ParticleBackground />
        <div className="grid-bg" />
        <div className="glow-tl" />

        <div className="container home-hero-container">
          <div className="home-hero-grid">

            {/* ── Left text ── */}
            <motion.div style={{ y: textY, opacity: heroOpacity }}>
              <motion.div
                className="section-label"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
              >
                Earth Observation Solutions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="home-hero-title"
              >
                <span className="home-hero-title-line">GRAPH</span>
                <span className="home-hero-title-gradient">YMA</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="home-hero-copy"
              >
                We help clients{' '}
                <span className="home-hero-copy-strong">understand, adopt, and apply</span>{' '}
                Earth Observation solutions in practice.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="home-hero-actions"
              >
                <Link to="/about" className="btn-primary">
                  Discover GRAPHYMA
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link to="/contact" className="btn-outline">Get in Touch</Link>
              </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeInOut' }}
              className="home-scroll-cue"
            >
              
              <motion.div
                animate={{ opacity: hasScrolled ? 0 : 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
              >
                <div className="home-scroll-line-wrap">
                <motion.div
                  animate={{ scaleY: [1, 0.6, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="home-scroll-line"
                />
                </div>
                <span className="home-scroll-label">
                  Scroll
                </span>
              </motion.div>
              
            </motion.div>

            {/* ── Right globe ── */}
            <motion.div
              style={{ y: globeY, opacity: heroOpacity }}
              className="home-hero-right"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{  duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="home-globe-wrap">
                <EarthGlobe onSatelliteHover={() => setHasHoveredSat(true)} />
                <div className={`home-globe-hint${hasHoveredSat ? ' home-globe-hint--hidden' : ''}`}>
                  <svg width="13" height="13" viewBox="0 0 11 11" fill="none">
                    <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1" />
                    <path d="M5.5 4.5v3M5.5 3.5v.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  Hover or touch satellites
                </div>
                {FLOAT_LABELS.map(({ label, delay, ...pos }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: pos.right ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="home-float-label"
                    style={pos}
                  >
                    <span className="home-float-dot" />
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section className="home-stats">
        <div className="container">
          <div className="home-stats-grid">
            {STATS.map(({ target, suffix, label, decimals }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.6 }}
                className="home-stat-card"
              >
                <div className="home-stat-number">
                  <AnimatedCounter target={target} suffix={suffix} decimals={decimals} />
                </div>
                <div className="home-stat-label">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          MARKET FACTS
      ══════════════════════════════════════ */}
      <section className="home-facts-section">
        <div className="container">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Industry at a Glance
          </motion.span>

          <motion.h2
            className="home-facts-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            The scale of <span className="gradient-text">Earth Observation</span>
          </motion.h2>

          <div className="home-facts-grid">
            {MARKET_FACTS.map(({ value, label, sub }, i) => (
              <motion.div
                key={value}
                className="home-fact-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.65 }}
              >
                <div className="home-fact-accent-line" />
                <div className="home-fact-value">{value}</div>
                <div className="home-fact-label">{label}</div>
                <div className="home-fact-sub">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section id="services" className="section home-services-section">
        <div className="glow-br" />
        <div className="container">
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Our Services
          </motion.span>

          <div className="home-services-header">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="home-services-title"
            >
              Specialised services<br />
              <span className="gradient-text">built for impact</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="home-services-copy"
            >
              We provide specialised services that combine technical expertise, communication, training, and strategic support.
            </motion.p>
          </div>

          {/* Service image cards (static visuals) */}
          <div className="home-service-visual-grid">
            {SERVICE_VISUALS.map(({ title, imgDark, imgLight }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="home-service-visual-card"
              >
                <img
                  src={isDark ? imgDark : imgLight}
                  alt={title}
                  className="home-service-visual-img"
                />
                <div className="home-service-visual-number">{String(i + 1).padStart(2, '0')}</div>
              </motion.div>
            ))}
          </div>

          {/* Service detail cards */}
          <div className="home-service-grid">
            {SERVICES.map(s => <ServiceCard key={s.number} {...s} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HERITAGE / NETWORK
      ══════════════════════════════════════ */}
      <section className="section home-heritage-section">
        <div className="container">
          <div className="home-heritage-grid">

            {/* SVG orbital diagram */}
            <motion.div
              initial={{ opacity: 0, x: -38 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="home-heritage-orbit"
            >
              <div className="home-heritage-orbit-wrap">
                <svg viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="home-orbit-svg">
                  {/* Concentric orbit rings */}
                  <circle cx="230" cy="230" r="196" stroke="rgba(var(--accent-rgb),0.05)" strokeWidth="1" strokeDasharray="4 10" />
                  <circle cx="230" cy="230" r="148" stroke="rgba(var(--accent-rgb),0.09)" strokeWidth="1" strokeDasharray="3 7" />
                  <circle cx="230" cy="230" r="100" stroke="rgba(var(--accent-rgb),0.15)" strokeWidth="1" />
                  <circle cx="230" cy="230" r="50"  stroke="rgba(var(--accent-rgb),0.32)" strokeWidth="1.5" />

                  {/* Center GRAPHYMA core */}
                  <circle cx="230" cy="230" r="26" fill="rgba(var(--accent-rgb),0.08)" stroke="rgba(var(--accent-rgb),0.55)" strokeWidth="1.5" />
                  <circle cx="230" cy="230" r="9"  fill="var(--accent)" />
                  <circle cx="230" cy="230" r="18" stroke="rgba(var(--accent-rgb),0.25)" strokeWidth="0.8" />

                  {/* Orbit nodes */}
                  {ORBIT_NODES.map(({ label, cx, cy }) => (
                    <g key={label}>
                      <line x1="230" y1="230" x2={cx} y2={cy} stroke="rgba(var(--accent-rgb),0.1)" strokeWidth="0.8" strokeDasharray="4 7" />
                      <circle cx={cx} cy={cy} r="18" fill="rgba(var(--accent-rgb),0.07)" stroke="rgba(var(--accent-rgb),0.35)" strokeWidth="1" />
                      <circle cx={cx} cy={cy} r="6"  fill="rgba(var(--accent-rgb),0.75)" />
                    </g>
                  ))}

                  {/* Satellite dots on outer ring */}
                  <circle cx="230" cy="34"  r="5" fill="var(--accent)" opacity="0.6" />
                  <circle cx="426" cy="230" r="4" fill="var(--accent)" opacity="0.45" />
                  <circle cx="134" cy="395" r="5" fill="var(--accent)" opacity="0.55" />
                </svg>

                {/* Node labels */}
                {[
                  { label: 'ESA',       top: '47%', left: '5%'  },
                  { label: 'Copernicus',top: '9%',  left: '62%' },
                  { label: 'EUMETSAT', top: '65%', left: '77%' },
                  { label: 'JRC',      top: '78%', left: '20%' },
                  { label: 'GRAPHYMA', top: '45%', left: '41%' },
                ].map(({ label, top, left }) => (
                  <div
                    key={label}
                    className={label === 'GRAPHYMA' ? 'home-orbit-label home-orbit-label-core' : 'home-orbit-label'}
                    style={{ top, left }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Text block */}
            <motion.div
              initial={{ opacity: 0, x: 38 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <span className="section-label">Our Heritage</span>
              <h2 className="home-heritage-title">
                A legacy shaped by<br />
                <span className="gradient-text">Europe's most trusted</span><br />
                EO entities
              </h2>
              <p className="home-heritage-copy">
                We inherit a legacy of expertise, shaped by our team's years of collaboration with Europe's most trusted Earth Observation entities — from ESA and Copernicus to EUMETSAT and JRC.
              </p>
              <p className="home-heritage-copy">
                This foundation gives us a unique vantage point: we understand both the technical depth of satellite systems and the practical needs of the organisations that depend on them.
              </p>

              {/* Tags */}
              <div className="home-heritage-tags">
                {['Copernicus', 'Sentinel Data', 'GIS', 'ML/AI', 'EO Platforms', 'ESA Projects'].map(tag => (
                  <span key={tag} className="home-heritage-tag">{tag}</span>
                ))}
              </div>

              <Link to="/about" className="btn-outline">
                Our Full Story
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="home-cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="home-cta-card"
          >
            <div className="home-cta-glow" />
            <div className="grid-bg home-cta-grid" />

            <motion.span className="section-label home-cta-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Start Today</motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="home-cta-text"
            >
              Ready to see Earth<br />
              <span className="gradient-text">from a new perspective?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="home-cta-copy"
            >
              Let's explore what Earth Observation can do for your organisation. Our team is ready to help.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="home-cta-actions"
            >
              <Link to="/contact" className="btn-primary">
                Contact Us
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/about" className="btn-outline">About GRAPHYMA</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </motion.main>
  )
}
