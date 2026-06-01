import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import './styles/Contact.css'

/* ── Page transition ───────────────────────────── */
const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.35 } },
}

/* ── Info cards data ───────────────────────────── */
const INFO_CARDS = [
  {
    label: 'Email',
    value: 'info@graphyma.eu',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 7L10 12L18 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Headquarters',
    value: 'Europe',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 2C10 2 6 5 6 10C6 15 10 18 10 18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
        <path d="M10 2C10 2 14 5 14 10C14 15 10 18 10 18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
        <path d="M2 10H18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/>
      </svg>
    ),
  },
  {
    label: 'Response Time',
    value: 'Within 48h',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const SERVICES_OPTIONS = [
  'Remote Sensing Consultancy',
  'Communications & User Uptake',
  'Trainings',
  'Project Management',
  'General Enquiry',
]

/* ── Floating animated dots ────────────────────── */
function FloatDots() {
  return (
    <div className="contact-float-dots">
      {[1, 2, 3, 4].map((dot) => (
        <div key={dot} className={`contact-float-dot contact-float-dot-${dot}`} />
      ))}
    </div>
  )
}

/* ── Input component ───────────────────────────── */
function Field({ label, type = 'text', name, value, onChange, required, as, options, placeholder }) {
  const [focused, setFocused] = useState(false)
  const fieldClass = focused ? 'contact-field is-focused' : 'contact-field'

  return (
    <div className={fieldClass}>
      <label className="contact-field-label">
        {label}{required && <span className="contact-required">*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          name={name} value={value} onChange={onChange} required={required}
          placeholder={placeholder}
          rows={5}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="contact-control contact-textarea"
        />
      ) : as === 'select' ? (
        <select
          name={name} value={value} onChange={onChange} required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="contact-control contact-select"
        >
          <option value="" disabled>Select a service...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange} required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="contact-control"
        />
      )}
    </div>
  )
}

/* ── Component ─────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', organisation: '', service: '', message: '' })
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1600)
  }

  return (
    <motion.main variants={page} initial="initial" animate="animate" exit="exit">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="contact-hero">
        <FloatDots />
        <div className="grid-bg" />

        <div className="container contact-hero-container">
          <motion.span className="section-label" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="contact-hero-title"
          >
            Let's build something{' '}
            <span className="gradient-text">remarkable</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="contact-hero-copy"
          >
            Whether you are exploring Earth Observation for the first time or looking to scale an existing capability — we're ready to listen and help.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INFO CARDS
      ══════════════════════════════════════ */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            {INFO_CARDS.map(({ label, value, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.7 }}
                className="glass contact-info-card"
              >
                <div className="contact-info-icon">
                  {icon}
                </div>
                <div>
                  <div className="contact-info-label">{label}</div>
                  <div className="contact-info-value">{value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Form + aside ── */}
          <div className="contact-grid">

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.85 }}
            >
              <div className="contact-form-card">
                {/* Top accent line */}
                <div className="contact-form-accent" />

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="contact-success"
                    >
                      <div className="contact-success-icon">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M6 14L11 19L22 9" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="contact-success-title">Message Sent</h3>
                      <p className="contact-success-copy">
                        Thank you for reaching out. Our team will get back to you within 48 hours.
                      </p>
                      <button
                        onClick={() => { setSent(false); setForm({ name: '', email: '', organisation: '', service: '', message: '' }) }}
                        className="btn-outline contact-success-action"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="contact-form"
                    >
                      <div>
                        <div className="contact-form-title">Send us a message</div>
                        <p className="contact-form-subtitle">Fill in the form and we'll be in touch.</p>
                      </div>

                      <div className="contact-form-row">
                        <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
                        <Field label="Email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                      </div>

                      <Field label="Organisation" name="organisation" value={form.organisation} onChange={handleChange} placeholder="Company / Institution (optional)" />

                      <Field label="Service Interest" name="service" value={form.service} onChange={handleChange} as="select" options={SERVICES_OPTIONS} />

                      <Field label="Message" name="message" value={form.message} onChange={handleChange} required as="textarea" placeholder="Tell us about your project or enquiry..." />

                      <button
                        type="submit"
                        disabled={loading}
                        className="contact-submit"
                        data-loading={loading ? 'true' : 'false'}
                      >
                        {loading ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="contact-spinner">
                              <circle cx="12" cy="12" r="10" stroke="rgba(4,10,9,0.3)" strokeWidth="3"/>
                              <path d="M12 2a10 10 0 0 1 10 10" stroke="#040A09" strokeWidth="3" strokeLinecap="round"/>
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ASIDE */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95, duration: 0.85 }}
              className="contact-aside"
            >
              {/* Who we work with */}
              <div className="contact-aside-card">
                <div className="contact-aside-label">
                  Who we work with
                </div>
                <div className="contact-aside-list">
                  {[
                    { icon: '🌍', label: 'Governments & Institutions' },
                    { icon: '🏢', label: 'Private Companies' },
                    { icon: '🎓', label: 'Universities & Researchers' },
                    { icon: '🤝', label: 'International Partners' },
                    { icon: '🌱', label: 'Environmental Organisations' },
                  ].map(({ icon, label }) => (
                    <div key={label} className="contact-aside-item">
                      <span className="contact-aside-emoji">{icon}</span>
                      <span className="contact-aside-text">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process steps */}
              <div className="contact-aside-card">
                <div className="contact-aside-label">
                  How it works
                </div>
                <div className="contact-step-list">
                  {[
                    { step: '01', label: 'Send your enquiry' },
                    { step: '02', label: 'We review & respond' },
                    { step: '03', label: 'Discovery call' },
                    { step: '04', label: 'Proposal & delivery' },
                  ].map(({ step, label }, i, arr) => (
                    <div key={step} className="contact-step">
                      <div className="contact-step-marker">
                        <div className="contact-step-circle">{step}</div>
                        {i < arr.length - 1 && (
                          <div className="contact-step-line" />
                        )}
                      </div>
                      <div className="contact-step-text">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back link */}
              <Link to="/" className="contact-back-link">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 6H2M2 6L5 3M2 6L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Home
              </Link>
            </motion.aside>
          </div>
        </div>
      </section>

    </motion.main>
  )
}
