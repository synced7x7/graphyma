import { Link } from 'react-router-dom'
import './styles/footer.css'
/* import { motion } from 'framer-motion' */

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      {/* Background ambient glow */}
      <div className="footer-glow" />

      <div className="container footer-container">
        {/* Top grid */}
        <div className="footer-cols">

          {/* Brand */}
          <div>
            <Link to="/" className="footer-brand">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#0DFFC4" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="5" fill="#0DFFC4" />
                <ellipse cx="14" cy="14" rx="13" ry="5" stroke="#0DFFC4" strokeWidth="1" strokeOpacity="0.4" />
              </svg>
              <span className="brand-text">GRAPH<span className="brand-accent">YMA</span></span>
            </Link>
            <p className="footer-desc">
              We help clients understand, adopt, and apply Earth Observation solutions in practice.
            </p>
            <div className="footer-badge">
              <div className="badge-dot">
                <div className="dot" />
                <div className="ring" />
              </div>
              <span className="footer-mono">ACTIVE</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="footer-section-title">Navigate</p>
            <nav className="footer-nav">
              {[['/', 'Home'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
                <Link key={to} to={to} className="footer-link">{label}</Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <p className="footer-section-title">Services</p>
            <nav className="footer-nav">
              {['Remote Sensing', 'Communications', 'Trainings', 'Project Management'].map(s => (
                <Link key={s} to={`/services/${s.toLowerCase().replace(' ', '-')}`} className="footer-link">
                  {s}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="divider" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="mono">© {year} GRAPHYMA. All rights reserved.</span>
          <div className="footer-right-group">
            <span className="mono">Earth Observation Solutions</span>
            <div className="footer-divider-line" />
            <span className="mono">EST. 2024</span>
          </div>
        </div>
      </div>
      
    </footer>
  )
}