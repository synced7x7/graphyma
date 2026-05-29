import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

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
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {[
        { w:180, h:180, t:'8%',  l:'5%',  d:0   },
        { w:120, h:120, t:'60%', l:'75%', d:1.2 },
        { w:90,  h:90,  t:'30%', l:'85%', d:0.6 },
        { w:60,  h:60,  t:'80%', l:'15%', d:1.8 },
      ].map(({ w, h, t, l, d }, i) => (
        <div key={i} style={{
          position: 'absolute', top: t, left: l,
          width: w, height: h,
          borderRadius: '50%',
          border: '1px solid rgba(13,255,196,0.06)',
          animation: `float ${7 + i}s ease-in-out ${d}s infinite`,
        }} />
      ))}
    </div>
  )
}

/* ── Input component ───────────────────────────── */
function Field({ label, type = 'text', name, value, onChange, required, as, options, placeholder }) {
  const [focused, setFocused] = useState(false)
  const base = {
    width: '100%',
    padding: '0.85rem 1.1rem',
    background: focused ? 'rgba(13,255,196,0.04)' : 'rgba(13,255,196,0.02)',
    border: `1px solid ${focused ? 'rgba(13,255,196,0.35)' : 'rgba(13,255,196,0.1)'}`,
    borderRadius: 10,
    color: '#EBF7F5',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused ? '0 0 0 3px rgba(13,255,196,0.06)' : 'none',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: focused ? '#0DFFC4' : '#3D8A85', transition: 'color 0.3s' }}>
        {label}{required && <span style={{ color: '#0DFFC4', marginLeft: 3 }}>*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          name={name} value={value} onChange={onChange} required={required}
          placeholder={placeholder}
          rows={5}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, resize: 'vertical', lineHeight: 1.65 }}
        />
      ) : as === 'select' ? (
        <select
          name={name} value={value} onChange={onChange} required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, cursor: 'pointer', appearance: 'none' }}
        >
          <option value="" disabled style={{ background: '#050C0B' }}>Select a service...</option>
          {options.map(o => <option key={o} value={o} style={{ background: '#050C0B' }}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange} required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
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
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden' }}>
        <FloatDots />
        <div className="grid-bg" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.span className="section-label" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', maxWidth: 700, marginTop: '0.75rem' }}
          >
            Let's build something{' '}
            <span className="gradient-text">remarkable</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ fontSize: '1.05rem', color: '#6BBAB5', lineHeight: 1.8, maxWidth: 520, marginTop: '1.5rem' }}
          >
            Whether you are exploring Earth Observation for the first time or looking to scale an existing capability — we're ready to listen and help.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INFO CARDS
      ══════════════════════════════════════ */}
      <section style={{ paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '4rem' }} className="info-grid">
            {INFO_CARDS.map(({ label, value, icon }, i) => (
              <motion.div
                key={label}
                className="glass"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.7 }}
                style={{ padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', gap: '1.25rem', borderRadius: 'var(--radius)' }}
              >
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  borderRadius: 11, background: 'rgba(13,255,196,0.07)',
                  border: '1px solid rgba(13,255,196,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0DFFC4',
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2E5F5C', marginBottom: '0.3rem' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#EBF7F5' }}>{value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Form + aside ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '3rem', alignItems: 'start' }} className="contact-grid">

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.85 }}
            >
              <div style={{
                padding: '3rem',
                background: 'rgba(13,255,196,0.022)',
                border: '1px solid rgba(13,255,196,0.09)',
                borderRadius: 20, position: 'relative', overflow: 'hidden',
              }}>
                {/* Top accent line */}
                <div style={{ position: 'absolute', top: 0, left: '2rem', right: '2rem', height: 1, background: 'linear-gradient(90deg, transparent, rgba(13,255,196,0.4), transparent)' }} />

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ textAlign: 'center', padding: '3rem 1rem' }}
                    >
                      <div style={{
                        width: 72, height: 72, borderRadius: '50%',
                        background: 'rgba(13,255,196,0.1)', border: '1.5px solid rgba(13,255,196,0.45)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.75rem',
                        animation: 'glow-pulse 2.5s ease-in-out infinite',
                      }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M6 14L11 19L22 9" stroke="#0DFFC4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#EBF7F5', marginBottom: '0.75rem' }}>Message Sent</h3>
                      <p style={{ color: '#6BBAB5', lineHeight: 1.75, fontSize: '0.93rem', maxWidth: 360, margin: '0 auto' }}>
                        Thank you for reaching out. Our team will get back to you within 48 hours.
                      </p>
                      <button
                        onClick={() => { setSent(false); setForm({ name: '', email: '', organisation: '', service: '', message: '' }) }}
                        className="btn-outline"
                        style={{ marginTop: '2rem', display: 'inline-flex' }}
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
                      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: '#EBF7F5', marginBottom: '0.35rem' }}>Send us a message</div>
                        <p style={{ color: '#3D8A85', fontSize: '0.85rem', lineHeight: 1.6 }}>Fill in the form and we'll be in touch.</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                        <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
                        <Field label="Email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                      </div>

                      <Field label="Organisation" name="organisation" value={form.organisation} onChange={handleChange} placeholder="Company / Institution (optional)" />

                      <Field label="Service Interest" name="service" value={form.service} onChange={handleChange} as="select" options={SERVICES_OPTIONS} />

                      <Field label="Message" name="message" value={form.message} onChange={handleChange} required as="textarea" placeholder="Tell us about your project or enquiry..." />

                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                          padding: '0.95rem 2.2rem',
                          background: loading ? 'rgba(13,255,196,0.6)' : '#0DFFC4',
                          color: '#040A09',
                          border: 'none', borderRadius: 50,
                          fontFamily: 'var(--font-display)', fontSize: '0.85rem',
                          fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                          cursor: loading ? 'wait' : 'pointer',
                          transition: 'all 0.4s var(--ease-smooth)',
                          alignSelf: 'flex-start',
                        }}
                        onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 0 40px rgba(13,255,196,0.5)' }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                      >
                        {loading ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'rotate-slow 0.9s linear infinite' }}>
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
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '6rem' }}
            >
              {/* Who we work with */}
              <div style={{ padding: '2rem', background: 'rgba(13,255,196,0.02)', border: '1px solid rgba(13,255,196,0.08)', borderRadius: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0DFFC4', marginBottom: '1.25rem' }}>
                  Who we work with
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {[
                    { icon: '🌍', label: 'Governments & Institutions' },
                    { icon: '🏢', label: 'Private Companies' },
                    { icon: '🎓', label: 'Universities & Researchers' },
                    { icon: '🤝', label: 'International Partners' },
                    { icon: '🌱', label: 'Environmental Organisations' },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1rem', lineHeight: 1 }}>{icon}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#6BBAB5' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process steps */}
              <div style={{ padding: '2rem', background: 'rgba(13,255,196,0.02)', border: '1px solid rgba(13,255,196,0.08)', borderRadius: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0DFFC4', marginBottom: '1.25rem' }}>
                  How it works
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { step: '01', label: 'Send your enquiry' },
                    { step: '02', label: 'We review & respond' },
                    { step: '03', label: 'Discovery call' },
                    { step: '04', label: 'Proposal & delivery' },
                  ].map(({ step, label }, i, arr) => (
                    <div key={step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: 'rgba(13,255,196,0.08)', border: '1px solid rgba(13,255,196,0.25)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#0DFFC4',
                        }}>{step}</div>
                        {i < arr.length - 1 && (
                          <div style={{ width: 1, height: 20, background: 'rgba(13,255,196,0.12)', margin: '4px 0' }} />
                        )}
                      </div>
                      <div style={{ paddingTop: '0.35rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#6BBAB5' }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back link */}
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: '#3D8A85', textTransform: 'uppercase', transition: 'color 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0DFFC4' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#3D8A85' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 6H2M2 6L5 3M2 6L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Home
              </Link>
            </motion.aside>
          </div>
        </div>
      </section>

      <style>{`
        .form-row { grid-template-columns: 1fr 1fr; }
        input::placeholder, textarea::placeholder { color: rgba(107,186,181,0.35); font-size: 0.88rem; }
        input:focus, textarea:focus, select:focus { outline: none; }
        select option { background: #050C0B; color: #EBF7F5; }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .info-grid    { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .form-row  { grid-template-columns: 1fr !important; }
          .info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.main>
  )
}