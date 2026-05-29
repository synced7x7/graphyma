import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const page = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

const CHANNELS = [
  { title: 'Stakeholder Mapping', detail: 'Prioritize audiences, incentives, and adoption blockers.' },
  { title: 'Narrative Design', detail: 'Translate EO complexity into human-ready stories.' },
  { title: 'Campaign Orchestration', detail: 'Multi-channel delivery and feedback loops.' },
  { title: 'Impact Measurement', detail: 'Usage analytics and adoption KPIs.' },
]

export default function Communications() {
  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">
      <section className="section" style={{ paddingTop: 120, position: 'relative' }}>
        <div className="glow-br" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            Communications & User Uptake
          </motion.span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }} className="heritage-grid">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{ fontSize: 'clamp(2.6rem, 4.6vw, 4rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}
              >
                Adoption pathways
                <span className="gradient-text" style={{ display: 'block' }}>for Earth data</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                style={{ color: '#6BBAB5', lineHeight: 1.9, maxWidth: 560, marginBottom: '2rem' }}
              >
                We turn technical capability into measurable uptake. Our communication strategy connects EO outputs to real-world decisions, making the value obvious to every stakeholder.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link to="/contact" className="btn-primary">Launch a Campaign</Link>
                <Link to="/about" className="btn-outline">See Our Approach</Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              <div style={{ padding: '2.5rem', borderRadius: 22, border: '1px solid rgba(13,255,196,0.12)', background: 'rgba(13,255,196,0.02)', position: 'relative', overflow: 'hidden' }}>
                <div className="grid-bg" style={{ opacity: 0.35 }} />
                <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                  {[{ x: 160, y: 130, r: 20 }, { x: 60, y: 60, r: 12 }, { x: 260, y: 60, r: 12 }, { x: 60, y: 200, r: 12 }, { x: 260, y: 200, r: 12 }].map((node, i) => (
                    <g key={i}>
                      <circle cx={node.x} cy={node.y} r={node.r} fill="rgba(13,255,196,0.12)" stroke="rgba(13,255,196,0.5)" strokeWidth="1" />
                      <circle cx={node.x} cy={node.y} r={node.r + 10} fill="none" stroke="rgba(13,255,196,0.12)" strokeWidth="1" />
                    </g>
                  ))}
                  {[[160, 130, 60, 60], [160, 130, 260, 60], [160, 130, 60, 200], [160, 130, 260, 200]].map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(13,255,196,0.2)" strokeWidth="1" strokeDasharray="4 6" />
                  ))}
                </svg>

                {[{ top: '16%', left: '52%' }, { top: '68%', left: '60%' }, { top: '46%', left: '16%' }].map((pos, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2.4 + i, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', width: 20, height: 20, borderRadius: '50%', border: '1px solid rgba(13,255,196,0.5)', ...pos }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
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
                Uptake Engine
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', marginBottom: '1.25rem' }}
              >
                From awareness
                <span className="gradient-text" style={{ display: 'block' }}>to adoption</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                style={{ color: '#6BBAB5', lineHeight: 1.85, marginBottom: '2rem' }}
              >
                We design the communication flow as a system: every touchpoint drives momentum, every insight gets turned into accessible value for your users.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'grid', gap: '1rem' }}
              >
                {CHANNELS.map((item) => (
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
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {['Awareness', 'Trial', 'Adoption', 'Advocacy'].map((stage, i) => (
                    <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 56, height: 56, borderRadius: 14, border: '1px solid rgba(13,255,196,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0DFFC4', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>{stage}</div>
                      <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'rgba(13,255,196,0.08)', position: 'relative', overflow: 'hidden' }}>
                        <motion.div
                          animate={{ x: ['-110%', '230%'] }}
                          transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'linear' }}
                          style={{ position: 'absolute', inset: 0, width: '45%', background: 'linear-gradient(90deg, rgba(13,255,196,0.1), rgba(13,255,196,0.6), rgba(13,255,196,0.1))' }}
                        />
                      </div>
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
