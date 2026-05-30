import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './styles/Trainings.css'

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
  const trainingRef = useRef(null)
  const [trainingOffset, setTrainingOffset] = useState({ x: 0, y: 0 })

  function handleTrainingMove(e) {
    const rect = trainingRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30
    setTrainingOffset({ x, y })
  }

  function handleTrainingLeave() {
    setTrainingOffset({ x: 0, y: 0 })
  }

  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">
      <section className="section train-hero">
        <div className="glow-tl" />
        <div className="container train-hero-container">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            Trainings
          </motion.span>
          <div className="heritage-grid train-hero-grid">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="train-hero-title"
              >
                Skills built
                <span className="gradient-text train-title-break">for real-world EO</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="train-hero-copy"
              >
                Our training programmes are structured for professionals who need to apply EO data immediately. We blend theory, hands-on labs, and operational templates tailored to your sector.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="train-hero-actions"
              >
                <Link to="/contact" className="btn-primary">Request a Training</Link>
                <Link to="/about" className="btn-outline">Training Philosophy</Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="train-card-wrap"
            >
              <div
                ref={trainingRef}
                onMouseMove={handleTrainingMove}
                onMouseLeave={handleTrainingLeave}
                className="train-card"
              >
                <div className="grid-bg train-card-grid" />
                <motion.div
                  className="train-card-shift"
                  style={{ transform: `translate3d(${trainingOffset.x}px, ${trainingOffset.y}px, 0)` }}
                >
                  <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="train-card-svg">
                    <motion.rect
                      x="38"
                      y="40"
                      width="244"
                      height="148"
                      rx="18"
                      fill="rgba(13,255,196,0.05)"
                      stroke="rgba(13,255,196,0.2)"
                      animate={{ opacity: [0.8, 1, 0.85] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.rect x="58" y="62" width="160" height="10" rx="5" fill="rgba(13,255,196,0.2)" animate={{ width: [140, 170, 150] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.rect x="58" y="82" width="120" height="10" rx="5" fill="rgba(13,255,196,0.12)" animate={{ width: [110, 140, 120] }} transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.rect x="58" y="102" width="180" height="10" rx="5" fill="rgba(13,255,196,0.18)" animate={{ width: [160, 190, 170] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />

                    <motion.g
                      animate={{
                        transform: [
                          'translate(58px, 130px)',
                          'translate(58px, 126px)',
                          'translate(58px, 130px)',
                        ],
                      }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <rect x="0" y="0" width="86" height="50" rx="8" fill="rgba(13,255,196,0.08)" stroke="rgba(13,255,196,0.25)" />
                      <motion.line x1="10" y1="16" x2="74" y2="16" stroke="rgba(13,255,196,0.3)" strokeWidth="2" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
                      <motion.line x1="10" y1="28" x2="60" y2="28" stroke="rgba(13,255,196,0.2)" strokeWidth="2" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }} />
                      <motion.line x1="10" y1="40" x2="52" y2="40" stroke="rgba(13,255,196,0.2)" strokeWidth="2" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
                    </motion.g>

                    <motion.g
                      animate={{
                        transform: [
                          'translate(164px, 126px)',
                          'translate(164px, 130px)',
                          'translate(164px, 126px)',
                        ],
                      }}
                      transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <rect x="0" y="0" width="64" height="54" rx="12" fill="rgba(13,255,196,0.1)" stroke="rgba(13,255,196,0.3)" />
                      <motion.circle cx="32" cy="20" r="10" fill="rgba(13,255,196,0.2)" stroke="rgba(13,255,196,0.5)" animate={{ r: [9, 11, 9], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
                      <motion.path d="M26 20L30 24L38 16" stroke="#0DFFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
                      <motion.rect x="14" y="36" width="36" height="6" rx="3" fill="rgba(13,255,196,0.25)" animate={{ width: [28, 40, 32] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
                    </motion.g>

                    <motion.g
                      animate={{
                        transform: [
                          'translate(244px, 70px)',
                          'translate(244px, 66px)',
                          'translate(244px, 70px)',
                        ],
                      }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <rect x="0" y="0" width="46" height="34" rx="8" fill="rgba(13,255,196,0.08)" stroke="rgba(13,255,196,0.2)" />
                      <motion.path d="M10 24C16 18 20 22 26 16" stroke="rgba(13,255,196,0.4)" strokeWidth="2" fill="none" animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
                      <motion.circle cx="30" cy="12" r="3" fill="#0DFFC4" animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }} />
                    </motion.g>

                    <motion.rect x="90" y="200" width="140" height="24" rx="12" fill="rgba(13,255,196,0.05)" stroke="rgba(13,255,196,0.2)" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />
                  </svg>
                </motion.div>

                <motion.div
                  animate={{ x: ['-200%', '300%'] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
                  className="train-scan-line"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="heritage-grid train-section-grid">
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
                className="train-section-title"
              >
                Modular paths
                <span className="gradient-text train-section-title-break">that scale</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="train-section-copy"
              >
                Choose standalone modules or build a multi-week programme. Every module includes exercises, datasets, and applied deliverables that your team can use immediately.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="train-module-list"
              >
                {MODULES.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="train-module-card"
                  >
                    <div className="train-module-title">{item.title}</div>
                    <div className="train-module-detail">{item.detail}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="train-card-wrap"
            >
              <div className="train-path-card">
                <div className="train-path-list">
                  {['Bootcamp', 'Applied Labs', 'Certification'].map((stage, i) => (
                    <div key={stage} className="train-path-row">
                      <div className="train-path-pill">{String(i + 1).padStart(2, '0')}</div>
                      <div className="train-path-bar">
                        <motion.div
                          animate={{ x: ['-110%', '230%'] }}
                          transition={{ duration: 2.9 + i * 0.2, repeat: Infinity, ease: 'linear' }}
                          className="train-path-sweep"
                        />
                      </div>
                      <div className="train-path-label">{stage}</div>
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
