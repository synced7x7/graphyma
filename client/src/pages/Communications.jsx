import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './styles/Communications.css'

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
  const networkRef = useRef(null)
  const [networkOffset, setNetworkOffset] = useState({ x: 0, y: 0 })
  const [networkHovered, setNetworkHovered] = useState(false)

  function handleNetworkMove(e) {
    const rect = networkRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 28
    setNetworkOffset({ x, y })
  }

  function handleNetworkLeave() {
    setNetworkOffset({ x: 0, y: 0 })
    setNetworkHovered(false)
  }

  const OUTER_NODES = [
    { id: 'tl', r: 12, cx: [60, 260, 240, 80, 60], cy: [60, 60, 190, 210, 60], duration: 14 },
    { id: 'tr', r: 12, cx: [260, 70, 60, 240, 260], cy: [60, 80, 200, 190, 60], duration: 13 },
    { id: 'bl', r: 12, cx: [60, 230, 260, 80, 60], cy: [200, 210, 70, 60, 200], duration: 15 },
    { id: 'br', r: 12, cx: [260, 90, 60, 230, 260], cy: [200, 190, 70, 80, 200], duration: 16 },
  ]

  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">
      <section className="section comms-hero">
        <div className="glow-br" />
        <div className="container comms-hero-container">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            Communications & User Uptake
          </motion.span>
          <div className="heritage-grid comms-hero-grid">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="comms-hero-title"
              >
                Adoption pathways
                <span className="gradient-text comms-title-break">for Earth data</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="comms-hero-copy"
              >
                We turn technical capability into measurable uptake. Our communication strategy connects EO outputs to real-world decisions, making the value obvious to every stakeholder.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="comms-hero-actions"
              >
                <Link to="/contact" className="btn-primary">Launch a Campaign</Link>
                <Link to="/about" className="btn-outline">See Our Approach</Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="comms-network-wrap"
            >
              <div
                ref={networkRef}
                onMouseEnter={() => setNetworkHovered(true)}
                onMouseMove={handleNetworkMove}
                onMouseLeave={handleNetworkLeave}
                className="comms-network-card"
              >
                <div className="grid-bg comms-network-grid" />
                <motion.div
                  className="comms-network-shift"
                  style={{
                    transform: `translate3d(${networkOffset.x}px, ${networkOffset.y}px, 0)`,
                  }}
                >
                  <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="comms-network-svg">
                    <circle
                      cx="160"
                      cy="130"
                      r="20"
                      className={networkHovered ? 'comms-node-core comms-node-glow' : 'comms-node-core'}
                    />
                    <motion.circle
                      cx="160"
                      cy="130"
                      r="30"
                      className="comms-ring"
                      animate={{ opacity: [0.15, 0.5, 0.15] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Rotating belt around the central node */}
                    <motion.g
            
                      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '160px 130px' }}
                    >
                      <ellipse
                        cx="160"
                        cy="130"
                        rx="50"
                        ry="12"
                        transform="rotate(-20 160 130)"
                        fill="rgba(var(--accent-rgb),0.06)"
                        stroke="rgba(var(--accent-rgb),0.22)"
                        strokeWidth="1.2"
                      />
                      <ellipse
                        cx="160"
                        cy="130"
                        rx="34"
                        ry="8"
                        transform="rotate(-20 160 130)"
                        fill="rgba(var(--accent-rgb),0.02)"
                        stroke="rgba(var(--accent-rgb),0.12)"
                        strokeWidth="0.8"
                      />
                    </motion.g>

                    {OUTER_NODES.map((node) => (
                      <g key={node.id}>
                        <motion.circle
                          r={node.r}
                          className={networkHovered ? 'comms-node-core comms-node-glow' : 'comms-node-core'}
                          animate={{ cx: node.cx, cy: node.cy }}
                          transition={{ duration: node.duration, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.circle
                          r={node.r + 10}
                          className={networkHovered ? 'comms-ring comms-node-glow-soft' : 'comms-ring'}
                          animate={{
                            cx: node.cx,
                            cy: node.cy,
                            opacity: [0.12, 0.5, 0.12],
                          }}
                          transition={{ duration: node.duration + 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.line
                          x1="160"
                          y1="130"
                          className="comms-line"
                          animate={{ x2: node.cx, y2: node.cy, strokeDashoffset: [0, -28] }}
                          transition={{ duration: node.duration, repeat: Infinity, ease: 'linear' }}
                        />
                      </g>
                    ))}
                  </svg>
                </motion.div>

                {[{ top: '16%', left: '52%' }, { top: '68%', left: '60%' }, { top: '46%', left: '16%' }].map((pos, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2.4 + i, repeat: Infinity, ease: 'easeInOut' }}
                    className="comms-orb"
                    style={pos}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="heritage-grid comms-section-grid">
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
                className="comms-section-title"
              >
                From awareness
                <span className="gradient-text comms-section-title-break">to adoption</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="comms-section-copy"
              >
                We design the communication flow as a system: every touchpoint drives momentum, every insight gets turned into accessible value for your users.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="comms-channel-list"
              >
                {CHANNELS.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="comms-channel-card"
                  >
                    <div className="comms-channel-title">{item.title}</div>
                    <div className="comms-channel-detail">{item.detail}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="comms-network-wrap"
            >
              <div className="comms-stage-card">
                <div className="comms-stage-list">
                  {['Awareness', 'Trial', 'Adoption', 'Advocacy'].map((stage, i) => (
                    <div key={stage} className="comms-stage-row">
                      <div className="comms-stage-pill">{stage}</div>
                      <div className="comms-stage-bar">
                        <motion.div
                          animate={{ x: ['-110%', '230%'] }}
                          transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'linear' }}
                          className="comms-stage-sweep"
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

