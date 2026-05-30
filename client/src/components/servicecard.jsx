import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './styles/servicecard.css'

const ICONS = {
  remote: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-icon-svg">
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M24 4C24 4 12 10 12 24C12 38 24 44 24 44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M24 4C24 4 36 10 36 24C36 38 24 44 24 44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M4 24H44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M7 14H41M7 34H41" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  comms: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-icon-svg">
      <circle cx="8" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11.5" y1="22" x2="20.5" y2="22" stroke="currentColor" strokeWidth="1" />
      <line x1="11.5" y1="26" x2="20.5" y2="26" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="27.5" y1="22.5" x2="36.5" y2="11" stroke="currentColor" strokeWidth="1" />
      <line x1="27.5" y1="25.5" x2="36.5" y2="37" stroke="currentColor" strokeWidth="1" />
      <circle cx="8" cy="24" r="8" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      <circle cx="40" cy="8" r="8" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
    </svg>
  ),
  training: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-icon-svg">
      <path d="M24 6L44 16L24 26L4 16L24 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M44 16V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 21V34C12 34 16 40 24 40C32 40 36 34 36 34V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="40" cy="38" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M38.5 38L39.5 39L41.5 37" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pm: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-icon-svg">
      <rect x="4" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="26" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15" y="30" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 18V24H35V18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="24" y1="24" x2="24" y2="30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="13" cy="12" r="2" fill="currentColor" fillOpacity="0.5" />
      <circle cx="35" cy="12" r="2" fill="currentColor" fillOpacity="0.5" />
      <circle cx="24" cy="36" r="2" fill="currentColor" fillOpacity="0.5" />
    </svg>
  ),
}

export default function ServiceCard({ number, icon, title, description, link, delay = 0 }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14
    setTilt({ x, y })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`service-card ${hovered ? 'hovered' : ''}`}
      style={{ transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
    >
      <Link
        to={link}
        className="service-link"
      >
        <div className={`service-card-inner ${hovered ? 'hovered' : ''}`}>
          {/* Background number */}
          <div className={`service-number ${hovered ? 'hovered' : ''}`}>
            {number}
          </div>

          {/* Scan line on hover */}
          {hovered && (
            <motion.div initial={{ top: '-100%' }} animate={{ top: '120%' }} transition={{ duration: 0.7, ease: 'linear' }} className="scan-line" />
          )}

          {/* Icon */}
          <div className={`service-icon ${hovered ? 'hovered' : ''}`}>{ICONS[icon]}</div>

          {/* Title */}
          <h3 className="service-title">
            {title}
          </h3>

          {/* Description */}
          <p className="service-desc">
            {description}
          </p>

          {/* Link */}
          <div className={`service-link-row ${hovered ? 'hovered' : ''}`}>
            <span>Open</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H5M11 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
