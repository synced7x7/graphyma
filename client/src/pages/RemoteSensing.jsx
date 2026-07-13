import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './styles/RemoteSensing.css'

const page = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

const CAPABILITIES = [
  {
    step: 'Acquisition',
    title: 'Acquisition Strategy',
    detail: 'Choose the right sensors, providers and datasets for your specific use case and budget.',
    duration: 2.8,
  },
  {
    step: 'Identify',
    title: 'Identify the Right EO Data',
    detail: 'Prepare and organise Earth Observation data from the most relevant platforms and archives.',
    duration: 3.05,
  },
  {
    step: 'Analyse',
    title: 'Analyse & Interpret',
    detail: 'Extract meaningful insights using advanced processing techniques and domain expertise.',
    duration: 3.3,
  },
  {
    step: 'Deliver',
    title: 'Deliver Actionable Insights',
    detail: 'Verify results, ensure quality and produce decision-ready outputs for your team.',
    duration: 3.55,
  },
  {
    step: 'Support',
    title: 'Support & Capacity Building',
    detail: 'Train and upskill your team for confident, long-term Earth Observation adoption.',
    duration: 3.8,
  },
]

function SatelliteGraphic() {
  return (
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" fill="none" className="rs-satellite-graphic">
      <rect x="48" y="34" width="24" height="12" rx="3" fill="currentColor" opacity="0.9" />
      <rect x="52" y="20" width="16" height="10" rx="2" fill="currentColor" opacity="0.55" />
      <rect x="12" y="28" width="30" height="20" rx="2" fill="currentColor" opacity="0.25" stroke="currentColor" strokeOpacity="0.45" />
      <rect x="78" y="28" width="30" height="20" rx="2" fill="currentColor" opacity="0.25" stroke="currentColor" strokeOpacity="0.45" />
      <circle cx="60" cy="40" r="3" fill="currentColor" />
      <line x1="42" y1="38" x2="48" y2="38" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" />
      <line x1="72" y1="38" x2="78" y2="38" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" />
    </svg>
  )
}

export default function RemoteSensing() {
  const orbitRef = useRef(null)
  const [orbitOffset, setOrbitOffset] = useState({ x: 0, y: 0 })
  const [orbitHovered, setOrbitHovered] = useState(false)

  function handleOrbitMove(e) {
    const rect = orbitRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 42
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 42
    setOrbitOffset({ x, y })
  }

  function handleOrbitLeave() {
    setOrbitOffset({ x: 0, y: 0 })
    setOrbitHovered(false)
  }

  const pulseStrong = {
    rest: { opacity: 0.9, scale: 1 },
    hover: { opacity: [0.85, 1, 0.85], scale: [1, 1.16, 1], transition: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } },
  }

  const pulseMid = {
    rest: { opacity: 0.75, scale: 1 },
    hover: { opacity: [0.7, 0.98, 0.7], scale: [1, 1.14, 1], transition: { duration: 1.25, repeat: Infinity, ease: 'easeInOut' } },
  }

  const pulseSoft = {
    rest: { opacity: 0.6, scale: 1 },
    hover: { opacity: [0.55, 0.9, 0.55], scale: [1, 1.12, 1], transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } },
  }

  const flareStrong = {
    rest: { opacity: 0, scale: 0.6 },
    hover: { opacity: [0, 0.55, 0], scale: [0.6, 1.5, 0.6], transition: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } },
  }

  const flareMid = {
    rest: { opacity: 0, scale: 0.6 },
    hover: { opacity: [0, 0.45, 0], scale: [0.6, 1.4, 0.6], transition: { duration: 1.25, repeat: Infinity, ease: 'easeInOut' } },
  }

  const flareSoft = {
    rest: { opacity: 0, scale: 0.6 },
    hover: { opacity: [0, 0.35, 0], scale: [0.6, 1.35, 0.6], transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } },
  }

  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">
      <section className="section rs-hero">
        <div className="glow-tl" />
        <div className="container rs-hero-container">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            Remote Sensing Consultancy
          </motion.span>
          <div className="heritage-grid rs-hero-grid">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="rs-hero-title"
              >
                Precision EO strategies
                <span className="gradient-text rs-title-break">from orbit to action</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="rs-hero-copy"
              >
                We design remote sensing consultancy strategies that integrate directly into our clients' workflows
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rs-hero-actions"
              >
                <Link to="/contact" className="btn-primary">Start a Project</Link>
                <Link to="/about" className="btn-outline">Our Methodology</Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="rs-orbit-wrap"
            >
              <div
                ref={orbitRef}
                onMouseEnter={() => setOrbitHovered(true)}
                onMouseMove={handleOrbitMove}
                onMouseLeave={handleOrbitLeave}
                className="rs-orbit-card"
              >
                <div className="grid-bg rs-orbit-grid" />
                <motion.div
                  className="rs-orbit-scene"
                  style={{
                    transform: `translate3d(${orbitOffset.x}px, ${orbitOffset.y}px, 0)`,
                  }}
                >
                  <div className="rs-orbit-ring rs-orbit-ring-1" />
                  <div className="rs-orbit-ring rs-orbit-ring-2" />
                  <div className="rs-orbit-ring rs-orbit-ring-3" />

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: orbitHovered ? 6 : 12, repeat: Infinity, ease: 'linear' }}
                    className="rs-orbit-track"
                  >
                    <motion.div
                      variants={flareStrong}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      className="rs-flare rs-flare-strong"
                    />
                    <motion.div
                      variants={pulseStrong}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      className={orbitHovered ? 'rs-satellite rs-satellite-strong is-hovered' : 'rs-satellite rs-satellite-strong'}
                    >
                      <SatelliteGraphic />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: orbitHovered ? 9 : 18, repeat: Infinity, ease: 'linear' }}
                    className="rs-orbit-track rs-orbit-track-mid"
                  >
                    <motion.div
                      variants={flareMid}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      className="rs-flare rs-flare-mid"
                    />
                    <motion.div
                      variants={pulseMid}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      className={orbitHovered ? 'rs-satellite rs-satellite-mid is-hovered' : 'rs-satellite rs-satellite-mid'}
                    >
                      <SatelliteGraphic />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: orbitHovered ? 11 : 22, repeat: Infinity, ease: 'linear' }}
                    className="rs-orbit-track rs-orbit-track-soft"
                  >
                    <motion.div
                      variants={flareSoft}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      className="rs-flare rs-flare-soft"
                    />
                    <motion.div
                      variants={pulseSoft}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      className={orbitHovered ? 'rs-satellite rs-satellite-soft is-hovered' : 'rs-satellite rs-satellite-soft'}
                    >
                      <SatelliteGraphic />
                    </motion.div>
                  </motion.div>

                  <div className="rs-core-glow" />
                  <div className="rs-core-ring" />
                  <div className="rs-core-dot" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section rs-section">
        <div className="container">
          <div className="rs-pipeline-header">
            <div>
              <motion.span
                className="section-label"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
              >
                Workflow Stack
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="rs-section-title"
              >
                An intelligence pipeline
                <span className="gradient-text rs-section-title-break">built for clarity</span>
              </motion.h2>
            </div>
            {/* <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="rs-pipeline-copy"
            >
              We deliver fast, high-quality insights using a proven process — adapted to fit your decisions, not the other way around.
            </motion.p> */}
          </div>

          <div className="rs-pipeline-list">
            {CAPABILITIES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.09, duration: 0.65 }}
                whileHover={{ y: -3 }}
                className="rs-pipeline-card"
              >
                <div className="rs-pipeline-left">
                  <div className="rs-pipeline-number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="rs-pipeline-connector" />
                </div>

                <div className="rs-pipeline-body">
                  <div className="rs-pipeline-top">
                    <div className="rs-pipeline-step">{item.step}</div>
                    <div className="rs-pipeline-bar">
                      <motion.div
                        animate={{ x: ['-110%', '230%'] }}
                        transition={{ duration: item.duration, repeat: Infinity, ease: 'linear' }}
                        className="rs-pipeline-sweep"
                      />
                    </div>
                  </div>
                  <div className="rs-pipeline-title">{item.title}</div>
                  <div className="rs-pipeline-detail">{item.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}

