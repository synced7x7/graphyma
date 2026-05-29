import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const page = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

const MODULES = [
  { title: 'EO Fundamentals', detail: 'Satellite systems, sensors, and data types.' },
  { title: 'GIS Platforms', detail: 'QGIS, ArcGIS, and web-based mapping stacks.' },
  { title: 'Analytics', detail: 'Indices, ML pipelines, and evaluation.' },
  { title: 'Operational Delivery', detail: 'Dashboards, APIs, and deployment workflows.' },
]

export default function Trainings() {
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
            Trainings
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
                Skills built
                <span className="gradient-text" style={{ display: 'block' }}>for real-world EO</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                style={{ color: '#6BBAB5', lineHeight: 1.9, maxWidth: 560, marginBottom: '2rem' }}
              >
                Our training programmes are structured for professionals who need to apply EO data immediately. We blend theory, hands-on labs, and operational templates tailored to your sector.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link to="/contact" className="btn-primary">Request a Training</Link>
                <Link to="/about" className="btn-outline">Training Philosophy</Link>
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
                  <rect x="40" y="44" width="240" height="140" rx="16" fill="rgba(13,255,196,0.06)" stroke="rgba(13,255,196,0.25)" />
                  <rect x="60" y="64" width="200" height="10" rx="5" fill="rgba(13,255,196,0.2)" />
                  <rect x="60" y="84" width="140" height="10" rx="5" fill="rgba(13,255,196,0.12)" />
                  <rect x="60" y="104" width="180" height="10" rx="5" fill="rgba(13,255,196,0.18)" />
                  <rect x="60" y="124" width="120" height="10" rx="5" fill="rgba(13,255,196,0.1)" />
                  <circle cx="232" cy="124" r="16" fill="rgba(13,255,196,0.14)" stroke="rgba(13,255,196,0.4)" />
                  <path d="M226 124L230 128L238 118" stroke="#0DFFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="90" y="196" width="140" height="24" rx="12" fill="rgba(13,255,196,0.05)" stroke="rgba(13,255,196,0.2)" />
                </svg>

                <motion.div
                  animate={{ x: ['-200%', '300%'] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', top: 70, left: 0, height: 6, width: 170, background: 'linear-gradient(90deg, transparent, rgba(13,255,196,0.7), transparent)' }}
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
                Curriculum Map
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', marginBottom: '1.25rem' }}
              >
                Modular paths
                <span className="gradient-text" style={{ display: 'block' }}>that scale</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                style={{ color: '#6BBAB5', lineHeight: 1.85, marginBottom: '2rem' }}
              >
                Choose standalone modules or build a multi-week programme. Every module includes exercises, datasets, and applied deliverables that your team can use immediately.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'grid', gap: '1rem' }}
              >
                {MODULES.map((item) => (
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
                  {['Bootcamp', 'Applied Labs', 'Certification'].map((stage, i) => (
                    <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 46, height: 46, borderRadius: 12, border: '1px solid rgba(13,255,196,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0DFFC4', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>{String(i + 1).padStart(2, '0')}</div>
                      <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'rgba(13,255,196,0.08)', position: 'relative', overflow: 'hidden' }}>
                        <motion.div
                          animate={{ x: ['-110%', '230%'] }}
                          transition={{ duration: 2.9 + i * 0.2, repeat: Infinity, ease: 'linear' }}
                          style={{ position: 'absolute', inset: 0, width: '45%', background: 'linear-gradient(90deg, transparent, rgba(13,255,196,0.5), transparent)' }}
                        />
                      </div>
                      <div style={{ minWidth: 90, color: '#6BBAB5', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em' }}>{stage}</div>
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
