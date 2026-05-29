import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import ParticleBackground from '../components/ParticleBackground'
import EarthGlobe from '../components/EarthGlobe'
import ServiceCard from '../components/ServiceCard'
import AnimatedCounter from '../components/AnimatedCounter'

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
  { target: 15, suffix: '+',  label: 'Years of EO Expertise',  decimals: 0 },
  { target: 50, suffix: '+',  label: 'Projects Delivered',     decimals: 0 },
  { target: 12, suffix: '',   label: 'European Partners',      decimals: 0 },
  { target: 3,  suffix: 'M+', label: 'Hectares Analysed',      decimals: 0 },
]

const FLOAT_LABELS = [
  { label: 'SAR Analysis',      top: '14%', right: '-6%',  delay: 1.1 },
  { label: 'Multispectral',     bottom: '26%', right: '-10%', delay: 1.4 },
  { label: 'Change Detection',  top: '38%', left: '-12%',  delay: 1.7 },
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
    accent: '#0DFFC4',
    svg: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <circle cx="100" cy="70" r="50" stroke="rgba(13,255,196,0.15)" strokeWidth="1" />
        <circle cx="100" cy="70" r="35" stroke="rgba(13,255,196,0.25)" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="100" cy="70" r="20" fill="rgba(13,255,196,0.06)" stroke="rgba(13,255,196,0.5)" strokeWidth="1.5" />
        <circle cx="100" cy="70" r="4"  fill="#0DFFC4" />
        {/* Scan lines */}
        {[40,55,70,85,100].map(y => (
          <line key={y} x1="50" y1={y} x2="150" y2={y} stroke="rgba(13,255,196,0.08)" strokeWidth="0.5" />
        ))}
        {/* Signal arcs */}
        <path d="M70 40 Q100 20 130 40" stroke="rgba(13,255,196,0.4)" strokeWidth="1" fill="none"/>
        <path d="M60 30 Q100 5 140 30"  stroke="rgba(13,255,196,0.2)" strokeWidth="1" fill="none"/>
        {/* Satellite */}
        <rect x="92" y="12" width="16" height="8" rx="1" fill="rgba(13,255,196,0.8)" />
        <rect x="82" y="14" width="8" height="4" rx="0.5" fill="rgba(13,255,196,0.4)" />
        <rect x="110" y="14" width="8" height="4" rx="0.5" fill="rgba(13,255,196,0.4)" />
        <line x1="100" y1="20" x2="100" y2="34" stroke="rgba(13,255,196,0.4)" strokeWidth="0.8" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    title: 'Communications',
    accent: '#00C49A',
    svg: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Network nodes */}
        {[[100,70],[40,35],[160,35],[40,105],[160,105],[100,18]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i===0?8:5} fill={i===0?"rgba(13,255,196,0.3)":"rgba(13,255,196,0.12)"} stroke="rgba(13,255,196,0.5)" strokeWidth="1"/>
        ))}
        {/* Lines */}
        {[[100,70,40,35],[100,70,160,35],[100,70,40,105],[100,70,160,105],[100,70,100,18],[40,35,160,35]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(13,255,196,0.18)" strokeWidth="0.8" strokeDasharray="3 5"/>
        ))}
        {/* Pulse rings on center */}
        <circle cx="100" cy="70" r="14" stroke="rgba(13,255,196,0.25)" strokeWidth="1" />
        <circle cx="100" cy="70" r="22" stroke="rgba(13,255,196,0.1)" strokeWidth="0.8" />
        <circle cx="100" cy="70" r="3" fill="#0DFFC4" />
      </svg>
    ),
  },
  {
    title: 'Trainings',
    accent: '#0DFFC4',
    svg: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Book layers */}
        <rect x="50" y="80" width="100" height="6" rx="2" fill="rgba(13,255,196,0.07)" stroke="rgba(13,255,196,0.2)" strokeWidth="0.8"/>
        <rect x="50" y="70" width="100" height="6" rx="2" fill="rgba(13,255,196,0.1)" stroke="rgba(13,255,196,0.3)" strokeWidth="0.8"/>
        <rect x="50" y="60" width="100" height="6" rx="2" fill="rgba(13,255,196,0.14)" stroke="rgba(13,255,196,0.4)" strokeWidth="0.8"/>
        {/* Main screen/board */}
        <rect x="55" y="28" width="90" height="28" rx="3" fill="rgba(13,255,196,0.06)" stroke="rgba(13,255,196,0.4)" strokeWidth="1"/>
        <line x1="65" y1="36" x2="95" y2="36" stroke="rgba(13,255,196,0.4)" strokeWidth="1"/>
        <line x1="65" y1="41" x2="125" y2="41" stroke="rgba(13,255,196,0.2)" strokeWidth="0.8"/>
        <line x1="65" y1="46" x2="110" y2="46" stroke="rgba(13,255,196,0.2)" strokeWidth="0.8"/>
        {/* Check mark */}
        <circle cx="138" cy="32" r="7" fill="rgba(13,255,196,0.15)" stroke="rgba(13,255,196,0.5)" strokeWidth="1"/>
        <path d="M134 32L137 35L142 29" stroke="#0DFFC4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Stand */}
        <line x1="100" y1="56" x2="100" y2="62" stroke="rgba(13,255,196,0.3)" strokeWidth="1"/>
        <line x1="80" y1="63" x2="120" y2="63" stroke="rgba(13,255,196,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    title: 'Project Management',
    accent: '#00C49A',
    svg: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Gantt bars */}
        {[
          [45, 35, 80, 'rgba(13,255,196,0.6)'],
          [45, 50, 50, 'rgba(13,255,196,0.4)'],
          [75, 65, 65, 'rgba(13,255,196,0.35)'],
          [45, 80, 40, 'rgba(13,255,196,0.25)'],
          [65, 95, 70, 'rgba(13,255,196,0.2)'],
        ].map(([x,y,w,color],i) => (
          <g key={i}>
            <rect x={x} y={y-4} width={w} height="8" rx="2" fill={color}/>
            <circle cx={x+w} cy={y} r="3" fill="#0DFFC4" opacity="0.7"/>
          </g>
        ))}
        {/* Timeline axis */}
        <line x1="40" y1="25" x2="40" y2="110" stroke="rgba(13,255,196,0.2)" strokeWidth="0.8"/>
        <line x1="40" y1="110" x2="165" y2="110" stroke="rgba(13,255,196,0.2)" strokeWidth="0.8"/>
        {/* Today line */}
        <line x1="110" y1="25" x2="110" y2="110" stroke="rgba(13,255,196,0.3)" strokeWidth="1" strokeDasharray="3 4"/>
        <text x="112" y="22" fill="rgba(13,255,196,0.5)" fontSize="7" fontFamily="monospace">NOW</text>
      </svg>
    ),
  },
]

/* ── Component ─────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const globeY      = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textY       = useTransform(scrollYProgress, [0, 1], [0, -55])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 80 }}>
        <ParticleBackground />
        <div className="grid-bg" />
        <div className="glow-tl" />

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem', minHeight: 'calc(100vh - 80px)', padding: '4rem 0' }} className="hero-grid">

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
                style={{ fontSize: 'clamp(3.8rem, 7.5vw, 7rem)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}
              >
                <span style={{ display: 'block', color: '#EBF7F5' }}>GRAPH</span>
                <span style={{
                  display: 'block',
                  background: 'linear-gradient(125deg, #0DFFC4 0%, #00C49A 55%, #007A60 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>YMA</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ fontSize: '1.1rem', color: '#6BBAB5', lineHeight: 1.75, maxWidth: 470, marginBottom: '2.5rem' }}
              >
                We help clients{' '}
                <span style={{ color: '#EBF7F5', fontWeight: 500 }}>understand, adopt, and apply</span>{' '}
                Earth Observation solutions in practice.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link to="/about" className="btn-primary">
                  Discover GRAPHYMA
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link to="/contact" className="btn-outline">Get in Touch</Link>
              </motion.div>

              {/* Scroll cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                style={{ position: 'absolute', bottom: '2.5rem', left: 0, display: 'flex', alignItems: 'center', gap: '0.85rem' }}
              >
                <motion.div
                  animate={{ scaleY: [1, 0.6, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, rgba(13,255,196,0.7), transparent)', transformOrigin: 'top' }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.22em', color: '#2E5F5C', textTransform: 'uppercase', writingMode: 'vertical-lr' }}>
                  Scroll
                </span>
              </motion.div>
            </motion.div>

            {/* ── Right globe ── */}
            <motion.div
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', y: globeY, opacity: heroOpacity }}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ position: 'relative', animation: 'float 9s ease-in-out infinite' }}>
                <EarthGlobe />
                {FLOAT_LABELS.map(({ label, delay, ...pos }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: pos.right ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute', ...pos,
                      padding: '0.38rem 0.9rem',
                      background: 'rgba(5,12,11,0.88)',
                      border: '1px solid rgba(13,255,196,0.22)',
                      borderRadius: 50,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem', letterSpacing: '0.12em', color: '#0DFFC4',
                      whiteSpace: 'nowrap', backdropFilter: 'blur(14px)',
                      boxShadow: '0 0 20px rgba(13,255,196,0.08)',
                    }}
                  >
                    <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#0DFFC4', marginRight: '0.45rem', verticalAlign: 'middle', animation: 'pulse-dot 2s ease-in-out infinite' }} />
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
      <section style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(13,255,196,0.06)', borderBottom: '1px solid rgba(13,255,196,0.06)', background: 'rgba(13,255,196,0.012)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }} className="stats-grid">
            {STATS.map(({ target, suffix, label, decimals }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.6 }}
                style={{ textAlign: 'center', padding: '1rem 0' }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#0DFFC4', lineHeight: 1, marginBottom: '0.4rem' }}>
                  <AnimatedCounter target={target} suffix={suffix} decimals={decimals} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#2E5F5C', textTransform: 'uppercase' }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section id="services" className="section" style={{ position: 'relative' }}>
        <div className="glow-br" />
        <div className="container">
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            Our Services
          </motion.span>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', marginTop: '0.75rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)' }}
            >
              Specialised services<br />
              <span className="gradient-text">built for impact</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{ maxWidth: 380, fontSize: '0.9rem', color: '#6BBAB5', lineHeight: 1.75 }}
            >
              We provide specialised services that combine technical expertise, communication, training, and strategic support.
            </motion.p>
          </div>

          {/* Service image cards (static visuals) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem', marginBottom: '1.5rem' }} className="svc-img-grid">
            {SERVICE_VISUALS.map(({ title, svg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                style={{
                  background: 'rgba(13,255,196,0.025)', border: '1px solid rgba(13,255,196,0.08)',
                  borderRadius: 14, overflow: 'hidden', aspectRatio: '16/10',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '1rem',
                  position: 'relative',
                }}
              >
                <div style={{ width: '100%', height: '100%', opacity: 0.9 }}>{svg}</div>
                <div style={{
                  position: 'absolute', bottom: 10, left: 12,
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em',
                  color: 'rgba(13,255,196,0.45)', textTransform: 'uppercase',
                }}>{String(i + 1).padStart(2, '0')}</div>
              </motion.div>
            ))}
          </div>

          {/* Service detail cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {SERVICES.map(s => <ServiceCard key={s.number} {...s} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HERITAGE / NETWORK
      ══════════════════════════════════════ */}
      <section className="section" style={{ position: 'relative', background: 'linear-gradient(180deg, transparent, rgba(13,255,196,0.018) 50%, transparent)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="heritage-grid">

            {/* SVG orbital diagram */}
            <motion.div
              initial={{ opacity: 0, x: -38 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              style={{ position: 'relative' }}
            >
              <div style={{ width: '100%', maxWidth: 460, margin: '0 auto', aspectRatio: '1', position: 'relative' }}>
                <svg viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                  {/* Concentric orbit rings */}
                  <circle cx="230" cy="230" r="196" stroke="rgba(13,255,196,0.05)" strokeWidth="1" strokeDasharray="4 10" />
                  <circle cx="230" cy="230" r="148" stroke="rgba(13,255,196,0.09)" strokeWidth="1" strokeDasharray="3 7" />
                  <circle cx="230" cy="230" r="100" stroke="rgba(13,255,196,0.15)" strokeWidth="1" />
                  <circle cx="230" cy="230" r="50"  stroke="rgba(13,255,196,0.32)" strokeWidth="1.5" />

                  {/* Center GRAPHYMA core */}
                  <circle cx="230" cy="230" r="26" fill="rgba(13,255,196,0.08)" stroke="rgba(13,255,196,0.55)" strokeWidth="1.5" />
                  <circle cx="230" cy="230" r="9"  fill="#0DFFC4" />
                  <circle cx="230" cy="230" r="18" stroke="rgba(13,255,196,0.25)" strokeWidth="0.8" />

                  {/* Orbit nodes */}
                  {ORBIT_NODES.map(({ label, cx, cy }) => (
                    <g key={label}>
                      <line x1="230" y1="230" x2={cx} y2={cy} stroke="rgba(13,255,196,0.1)" strokeWidth="0.8" strokeDasharray="4 7" />
                      <circle cx={cx} cy={cy} r="18" fill="rgba(13,255,196,0.07)" stroke="rgba(13,255,196,0.35)" strokeWidth="1" />
                      <circle cx={cx} cy={cy} r="6"  fill="rgba(13,255,196,0.75)" />
                    </g>
                  ))}

                  {/* Satellite dots on outer ring */}
                  <circle cx="230" cy="34"  r="5" fill="#0DFFC4" opacity="0.6" />
                  <circle cx="426" cy="230" r="4" fill="#0DFFC4" opacity="0.45" />
                  <circle cx="134" cy="395" r="5" fill="#0DFFC4" opacity="0.55" />
                </svg>

                {/* Node labels */}
                {[
                  { label: 'ESA',       top: '47%', left: '5%'  },
                  { label: 'Copernicus',top: '9%',  left: '62%' },
                  { label: 'EUMETSAT', top: '65%', left: '77%' },
                  { label: 'JRC',      top: '78%', left: '20%' },
                  { label: 'GRAPHYMA', top: '45%', left: '41%' },
                ].map(({ label, top, left }) => (
                  <div key={label} style={{
                    position: 'absolute', top, left,
                    fontFamily: 'var(--font-mono)', fontSize: label === 'GRAPHYMA' ? '0.55rem' : '0.6rem',
                    letterSpacing: '0.14em', color: label === 'GRAPHYMA' ? '#0DFFC4' : '#6BBAB5',
                    transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', pointerEvents: 'none',
                  }}>{label}</div>
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
              <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.7rem)', marginBottom: '1.5rem', lineHeight: 1.12, marginTop: '0.75rem' }}>
                A legacy shaped by<br />
                <span className="gradient-text">Europe's most trusted</span><br />
                EO entities
              </h2>
              <p style={{ color: '#6BBAB5', lineHeight: 1.82, marginBottom: '1.25rem', fontSize: '0.93rem' }}>
                We inherit a legacy of expertise, shaped by our team's years of collaboration with Europe's most trusted Earth Observation entities — from ESA and Copernicus to EUMETSAT and JRC.
              </p>
              <p style={{ color: '#6BBAB5', lineHeight: 1.82, marginBottom: '2.25rem', fontSize: '0.93rem' }}>
                This foundation gives us a unique vantage point: we understand both the technical depth of satellite systems and the practical needs of the organisations that depend on them.
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                {['Copernicus', 'Sentinel Data', 'GIS', 'ML/AI', 'EO Platforms', 'ESA Projects'].map(tag => (
                  <span key={tag} style={{
                    padding: '0.3rem 0.85rem',
                    background: 'rgba(13,255,196,0.05)',
                    border: '1px solid rgba(13,255,196,0.14)',
                    borderRadius: 50,
                    fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em',
                    color: '#6BBAB5',
                  }}>{tag}</span>
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
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            style={{
              textAlign: 'center', padding: '5rem 3rem',
              background: 'rgba(13,255,196,0.022)',
              border: '1px solid rgba(13,255,196,0.09)',
              borderRadius: 24, position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 640, height: 640,
              background: 'radial-gradient(circle, rgba(13,255,196,0.06) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />
            <div className="grid-bg" style={{ opacity: 0.5 }} />

            <motion.span className="section-label" style={{ justifyContent: 'center' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Start Today</motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.6rem)', marginBottom: '1.25rem', position: 'relative', marginTop: '0.5rem' }}
            >
              Ready to see Earth<br />
              <span className="gradient-text">from a new perspective?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{ fontSize: '1rem', color: '#6BBAB5', maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.75, position: 'relative' }}
            >
              Let's explore what Earth Observation can do for your organisation. Our team is ready to help.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}
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

      <style>{`
        @media (max-width: 900px) {
          .hero-grid     { grid-template-columns: 1fr !important; text-align: center; }
          .heritage-grid { grid-template-columns: 1fr !important; }
          .svc-img-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .stats-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .hero-grid > div:last-child { display: none; }
        }
        @media (max-width: 600px) {
          .svc-img-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </motion.main>
  )
}