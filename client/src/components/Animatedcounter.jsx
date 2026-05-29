import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2200, decimals = 0 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let startTime = null

          function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4)
          }

          function step(timestamp) {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = easeOutQuart(progress)
            const current = eased * target

            setValue(parseFloat(current.toFixed(decimals)))
            if (progress < 1) requestAnimationFrame(step)
          }

          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, decimals])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value)

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

