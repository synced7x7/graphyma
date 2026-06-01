import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './styles/ProjectManagement.css'

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
  const ganttRef = useRef(null)
  const [ganttOffset, setGanttOffset] = useState({ x: 0, y: 0 })

  function handleGanttMove(e) {
    const rect = ganttRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30
    setGanttOffset({ x, y })
  }

  function handleGanttLeave() {
    setGanttOffset({ x: 0, y: 0 })
  }

  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">
      <section className="section pm-hero">
        <div className="glow-br" />
        <div className="container pm-hero-container">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            Project Management
          </motion.span>
          <div className="heritage-grid pm-hero-grid">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="pm-hero-title"
              >
                Programmes delivered
                <span className="gradient-text pm-title-break">with precision</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="pm-hero-copy"
              >
                We guide EO initiatives from concept to completion across public and private stakeholders. Our management approach ensures clarity, governance, and on-time delivery.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pm-hero-actions"
              >
                <Link to="/contact" className="btn-primary">Plan a Programme</Link>
                <Link to="/about" className="btn-outline">Delivery Framework</Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="pm-card-wrap"
            >
              <div
                ref={ganttRef}
                onMouseMove={handleGanttMove}
                onMouseLeave={handleGanttLeave}
                className="pm-card"
              >
                <div className="grid-bg pm-card-grid" />
                <motion.div
                  className="pm-card-shift"
                  style={{ transform: `translate3d(${ganttOffset.x}px, ${ganttOffset.y}px, 0)` }}
                >
                  <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="pm-card-svg">
                    <motion.g
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <circle cx="160" cy="86" r="18" fill="rgba(var(--accent-rgb),0.12)" stroke="rgba(var(--accent-rgb),0.5)" strokeWidth="1" />
                      <circle cx="160" cy="86" r="6" fill="var(--accent)" />
                      <rect x="130" y="110" width="60" height="70" rx="14" fill="rgba(var(--accent-rgb),0.08)" stroke="rgba(var(--accent-rgb),0.3)" />
                      <rect x="116" y="140" width="88" height="12" rx="6" fill="rgba(var(--accent-rgb),0.18)" />
                    </motion.g>

                    {[
                      { x: 40, y: 50, w: 90, h: 48, delay: 0 },
                      { x: 210, y: 44, w: 84, h: 46, delay: 0.2 },
                      { x: 32, y: 150, w: 100, h: 50, delay: 0.4 },
                      { x: 208, y: 150, w: 92, h: 50, delay: 0.6 },
                    ].map((card, i) => (
                      <motion.g
                        key={i}
                        animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
                        transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
                      >
                        <rect x={card.x} y={card.y} width={card.w} height={card.h} rx="12" fill="rgba(var(--accent-rgb),0.07)" stroke="rgba(var(--accent-rgb),0.25)" />
                        <motion.rect x={card.x + 10} y={card.y + 14} width={card.w - 20} height="6" rx="3" fill="rgba(var(--accent-rgb),0.22)" animate={{ width: [card.w - 28, card.w - 16, card.w - 24] }} transition={{ duration: 2.4 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }} />
                        <motion.rect x={card.x + 10} y={card.y + 28} width={card.w - 34} height="6" rx="3" fill="rgba(var(--accent-rgb),0.14)" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.6 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }} />
                        <motion.circle cx={card.x + card.w - 14} cy={card.y + card.h - 12} r="4" fill="var(--accent)" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.8 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }} />
                      </motion.g>
                    ))}

                    {[
                      { x1: 120, y1: 118, x2: 88, y2: 92 },
                      { x1: 200, y1: 118, x2: 232, y2: 92 },
                      { x1: 120, y1: 164, x2: 86, y2: 170 },
                      { x1: 200, y1: 164, x2: 232, y2: 172 },
                    ].map((line, i) => (
                      <motion.line
                        key={i}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgba(var(--accent-rgb),0.2)"
                        strokeWidth="1"
                        strokeDasharray="4 6"
                        animate={{ strokeDashoffset: [0, -26] }}
                        transition={{ duration: 2.4 + i * 0.25, repeat: Infinity, ease: 'linear' }}
                      />
                    ))}
                  </svg>
                </motion.div>

                <motion.div
                  animate={{ x: ['-200%', '300%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  className="pm-scan-line"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="heritage-grid pm-section-grid">
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
                className="pm-section-title"
              >
                Structured governance
                <span className="gradient-text pm-section-title-break">with momentum</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="pm-section-copy"
              >
                Our project management model blends agile execution with public-sector compliance, giving you full visibility while keeping delivery velocity high.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pm-governance-list"
              >
                {GOVERNANCE.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="pm-governance-card"
                  >
                    <div className="pm-governance-title">{item.title}</div>
                    <div className="pm-governance-detail">{item.detail}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pm-card-wrap"
            >
              <div className="pm-path-card">
                <div className="pm-path-list">
                  {['Discovery', 'Planning', 'Execution', 'Validation', 'Handover'].map((stage, i) => (
                    <div key={stage} className="pm-path-row">
                      <div className="pm-path-pill">{String(i + 1).padStart(2, '0')}</div>
                      <div className="pm-path-bar">
                        <motion.div
                          animate={{ x: ['-110%', '230%'] }}
                          transition={{ duration: 3.1 + i * 0.2, repeat: Infinity, ease: 'linear' }}
                          className="pm-path-sweep"
                        />
                      </div>
                      <div className="pm-path-label">{stage}</div>
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

