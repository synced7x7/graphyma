import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import satellite from '../assets/satellite.svg'

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
      <section className="section" style={{ paddingTop: 120, position: 'relative' }}>
        <div className="glow-tl" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            Remote Sensing Consultancy
          </motion.span>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }} className="heritage-grid">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{ fontSize: 'clamp(2.6rem, 4.6vw, 4rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}
              >
                Precision EO strategies
                <span className="gradient-text" style={{ display: 'block' }}>from orbit to action</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                style={{ color: '#6BBAB5', lineHeight: 1.9, maxWidth: 560, marginBottom: '2rem' }}
              >
                We design end-to-end remote sensing workflows that translate complex satellite data into operational decisions. From sensor selection to advanced analytics, every step is tuned for your mission and timeframe.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link to="/contact" className="btn-primary">Start a Project</Link>
                <Link to="/about" className="btn-outline">Our Methodology</Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              <div
                ref={orbitRef}
                onMouseEnter={() => setOrbitHovered(true)}
                onMouseMove={handleOrbitMove}
                onMouseLeave={handleOrbitLeave}
                style={{ background: 'rgba(13,255,196,0.006)', border: '1px solid rgba(13,255,196,0.035)', borderRadius: 22, padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
              >
                <div className="grid-bg" style={{ opacity: 0.1 }} />
                <motion.div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1',
                    maxWidth: 320,
                    margin: '0 auto',
                    transform: `translate3d(${orbitOffset.x}px, ${orbitOffset.y}px, 0)`,
                    transition: 'transform 0.15s ease',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 10, border: '1px dashed rgba(13,255,196,0.18)', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', inset: 40, border: '1px dashed rgba(13,255,196,0.14)', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', inset: 70, border: '1px solid rgba(13,255,196,0.2)', borderRadius: '50%' }} />

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: orbitHovered ? 6 : 12, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', inset: 10 }}
                  >
                    <motion.div
                      variants={flareStrong}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      style={{
                        position: 'absolute',
                        top: -20,
                        left: '50%',
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        transform: 'translateX(-50%)',
                        background: 'radial-gradient(circle, rgba(13,255,196,0.5), rgba(13,255,196,0) 70%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <motion.img
                      src={satellite}
                      alt=""
                      variants={pulseStrong}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      style={{ position: 'absolute', top: -18, left: '50%', width: 36, height: 24, transform: 'translateX(-50%)', filter: orbitHovered ? 'drop-shadow(0 0 18px rgba(13,255,196,0.95))' : 'none', transition: 'filter 0.25s ease', pointerEvents: 'none' }}
                    />
                  </motion.div>

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: orbitHovered ? 9 : 18, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', inset: 40 }}
                  >
                    <motion.div
                      variants={flareMid}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      style={{
                        position: 'absolute',
                        left: -20,
                        top: '50%',
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        transform: 'translateY(-50%)',
                        background: 'radial-gradient(circle, rgba(13,255,196,0.45), rgba(13,255,196,0) 70%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <motion.img
                      src={satellite}
                      alt=""
                      variants={pulseMid}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      style={{ position: 'absolute', left: -18, top: '50%', width: 30, height: 20, transform: 'translateY(-50%)', filter: orbitHovered ? 'drop-shadow(0 0 14px rgba(13,255,196,0.85))' : 'none', transition: 'filter 0.25s ease', pointerEvents: 'none' }}
                    />
                  </motion.div>

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: orbitHovered ? 11 : 22, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', inset: 70 }}
                  >
                    <motion.div
                      variants={flareSoft}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      style={{
                        position: 'absolute',
                        right: -20,
                        top: '50%',
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        transform: 'translateY(-50%)',
                        background: 'radial-gradient(circle, rgba(13,255,196,0.35), rgba(13,255,196,0) 70%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <motion.img
                      src={satellite}
                      alt=""
                      variants={pulseSoft}
                      animate={orbitHovered ? 'hover' : 'rest'}
                      style={{ position: 'absolute', right: -18, top: '50%', width: 28, height: 18, transform: 'translateY(-50%)', filter: orbitHovered ? 'drop-shadow(0 0 12px rgba(13,255,196,0.8))' : 'none', transition: 'filter 0.25s ease', pointerEvents: 'none' }}
                    />
                  </motion.div>

                  <div style={{ position: 'absolute', inset: 110, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,255,196,0.22), rgba(13,255,196,0) 70%)' }} />
                  <div style={{ position: 'absolute', inset: 120, borderRadius: '50%', border: '1px solid rgba(13,255,196,0.35)' }} />
                  <div style={{ position: 'absolute', width: 10, height: 10, borderRadius: '50%', background: '#0DFFC4', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="heritage-grid">
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
                style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', marginBottom: '1.25rem' }}
              >
                An intelligence pipeline
                <span className="gradient-text" style={{ display: 'block' }}>built for clarity</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                style={{ color: '#6BBAB5', lineHeight: 1.85, marginBottom: '2rem' }}
              >
                Every project is built on a proven pipeline that compresses time-to-insight while preserving data quality. We align the pipeline to your operational decisions, not the other way around.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'grid', gap: '1rem' }}
              >
                {CAPABILITIES.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: '1rem 1.25rem', borderRadius: 16, border: '1px solid rgba(13,255,196,0.12)', background: 'rgba(13,255,196,0.02)' }}
                  >
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#EBF7F5', marginBottom: '0.4rem' }}>{item.title}</div>
                    <div style={{ color: '#6BBAB5', fontSize: '0.88rem', lineHeight: 1.6 }}>{item.detail}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              <div style={{ borderRadius: 22, border: '1px solid rgba(13,255,196,0.14)', background: 'rgba(13,255,196,0.025)', padding: '2rem' }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {['Ingest', 'Normalize', 'Analyze', 'Validate', 'Deploy'].map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(13,255,196,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0DFFC4', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{String(i + 1).padStart(2, '0')}</div>
                      <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'rgba(13,255,196,0.08)', position: 'relative', overflow: 'hidden' }}>
                        <motion.div
                          animate={{ x: ['-110%', '230%'] }}
                          transition={{ duration: 2.8 + i * 0.25, repeat: Infinity, ease: 'linear' }}
                          style={{ position: 'absolute', inset: 0, width: '45%', background: 'linear-gradient(90deg, transparent, rgba(13,255,196,0.5), transparent)' }}
                        />
                      </div>
                      <div style={{ minWidth: 90, color: '#6BBAB5', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em' }}>{step}</div>
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
