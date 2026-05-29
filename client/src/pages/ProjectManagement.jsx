import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const page = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

const GOVERNANCE = [
  { title: 'Scope Control', detail: 'Clear milestones, structured risk tracking.' },
  { title: 'Stakeholder Alignment', detail: 'Multi-actor coordination and consensus.' },
  { title: 'Delivery Assurance', detail: 'Quality gates, documentation, handover.' },
  { title: 'Impact Reporting', detail: 'Performance metrics and ROI tracking.' },
]

export default function ProjectManagement() {
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
            Project Management
          </motion.span>
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '3.5rem', alignItems: 'center' }} className="heritage-grid">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{ fontSize: 'clamp(2.6rem, 4.6vw, 4rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}
              >
                Programmes delivered
                <span className="gradient-text" style={{ display: 'block' }}>with precision</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                style={{ color: '#6BBAB5', lineHeight: 1.9, maxWidth: 560, marginBottom: '2rem' }}
              >
                We guide EO initiatives from concept to completion across public and private stakeholders. Our management approach ensures clarity, governance, and on-time delivery.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link to="/contact" className="btn-primary">Plan a Programme</Link>
                <Link to="/about" className="btn-outline">Delivery Framework</Link>
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
                  <line x1="50" y1="210" x2="270" y2="210" stroke="rgba(13,255,196,0.2)" strokeWidth="1" />
                  {[[60, 70, 120], [60, 100, 160], [120, 130, 140], [80, 160, 110]].map(([x, y, w], i) => (
                    <g key={i}>
                      <rect x={x} y={y} width={w} height="16" rx="6" fill="rgba(13,255,196,0.2)" />
                      <circle cx={x + w} cy={y + 8} r="4" fill="#0DFFC4" opacity="0.6" />
                    </g>
                  ))}
                  <rect x="60" y="190" width="190" height="8" rx="4" fill="rgba(13,255,196,0.15)" />
                  <circle cx="170" cy="194" r="6" fill="#0DFFC4" />
                </svg>

                <motion.div
                  animate={{ x: ['-200%', '300%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', bottom: 58, left: 0, height: 8, width: 220, background: 'linear-gradient(90deg, transparent, rgba(13,255,196,0.5), transparent)' }}
                />
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
                Delivery System
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', marginBottom: '1.25rem' }}
              >
                Structured governance
                <span className="gradient-text" style={{ display: 'block' }}>with momentum</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                style={{ color: '#6BBAB5', lineHeight: 1.85, marginBottom: '2rem' }}
              >
                Our project management model blends agile execution with public-sector compliance, giving you full visibility while keeping delivery velocity high.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'grid', gap: '1rem' }}
              >
                {GOVERNANCE.map((item) => (
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
                <div style={{ display: 'grid', gap: '1.1rem' }}>
                  {['Discovery', 'Planning', 'Execution', 'Validation', 'Handover'].map((stage, i) => (
                    <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(13,255,196,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0DFFC4', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{String(i + 1).padStart(2, '0')}</div>
                      <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'rgba(13,255,196,0.08)', position: 'relative', overflow: 'hidden' }}>
                        <motion.div
                          animate={{ x: ['-110%', '230%'] }}
                          transition={{ duration: 3.1 + i * 0.2, repeat: Infinity, ease: 'linear' }}
                          style={{ position: 'absolute', inset: 0, width: '45%', background: 'linear-gradient(90deg, transparent, rgba(13,255,196,0.5), transparent)' }}
                        />
                      </div>
                      <div style={{ minWidth: 92, color: '#6BBAB5', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em' }}>{stage}</div>
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
