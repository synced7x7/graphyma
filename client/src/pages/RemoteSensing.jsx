import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import satellite from '../assets/satellite.svg'
import './styles/RemoteSensing.css'

const page = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

const CAPABILITIES = [
  { title: 'Acquisition Strategy', detail: 'Right sensors, right revisit, right data.' },
  { title: 'Pre-processing', detail: 'Radiometric, geometric, and atmospheric corrections.' },
  { title: 'Analytics & Models', detail: 'Indices, ML pipelines, and change detection.' },
  { title: 'Decision Layers', detail: 'Actionable maps and executive-ready outputs.' },
]

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
                We design end-to-end remote sensing workflows that translate complex satellite data into operational decisions. From sensor selection to advanced analytics, every step is tuned for your mission and timeframe.
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
                    <motion.img
                      src={satellite}
                      alt=""
                      variants={pulseStrong}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      className={orbitHovered ? 'rs-satellite rs-satellite-strong is-hovered' : 'rs-satellite rs-satellite-strong'}
                    />
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
                    <motion.img
                      src={satellite}
                      alt=""
                      variants={pulseMid}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      className={orbitHovered ? 'rs-satellite rs-satellite-mid is-hovered' : 'rs-satellite rs-satellite-mid'}
                    />
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
                    <motion.img
                      src={satellite}
                      alt=""
                      variants={pulseSoft}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      className={orbitHovered ? 'rs-satellite rs-satellite-soft is-hovered' : 'rs-satellite rs-satellite-soft'}
                    />
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
          <div className="heritage-grid rs-section-grid">
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
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="rs-section-copy"
              >
                Every project is built on a proven pipeline that compresses time-to-insight while preserving data quality. We align the pipeline to your operational decisions, not the other way around.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rs-capability-list"
              >
                {CAPABILITIES.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="rs-capability-card"
                  >
                    <div className="rs-capability-title">{item.title}</div>
                    <div className="rs-capability-detail">{item.detail}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rs-orbit-wrap"
            >
              <div className="rs-stage-card">
                <div className="rs-stage-list">
                  {['Ingest', 'Normalize', 'Analyze', 'Validate', 'Deploy'].map((step, i) => (
                    <div key={step} className="rs-stage-row">
                      <div className="rs-stage-number">{String(i + 1).padStart(2, '0')}</div>
                      <div className="rs-stage-bar">
                        <motion.div
                          animate={{ x: ['-110%', '230%'] }}
                          transition={{ duration: 2.8 + i * 0.25, repeat: Infinity, ease: 'linear' }}
                          className="rs-stage-sweep"
                        />
                      </div>
                      <div className="rs-stage-label">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
