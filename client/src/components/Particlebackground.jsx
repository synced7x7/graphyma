import { useEffect, useRef } from 'react'

const NUM_PARTICLES = 140

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const particles = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H

    function resize() {
      const dpr = window.devicePixelRatio || 1
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
    }

    function initParticles() {
      particles.current = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
        x: randomBetween(0, W),
        y: randomBetween(0, H),
        size: randomBetween(0.4, i < 20 ? 2.2 : 1.2),
        opacity: randomBetween(0.1, i < 20 ? 0.7 : 0.4),
        speed: randomBetween(0.02, 0.12),
        parallax: randomBetween(0.01, 0.06),
        twinklePhase: randomBetween(0, Math.PI * 2),
        twinkleSpeed: randomBetween(0.003, 0.015),
      }))
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H)

      // Background nebula blobs
      const blobs = [
        { x: W * 0.1, y: H * 0.2, r: 280, color: 'rgba(13,255,196,0.025)' },
        { x: W * 0.85, y: H * 0.75, r: 240, color: 'rgba(0,100,80,0.03)' },
        { x: W * 0.5, y: H * 0.5, r: 200, color: 'rgba(13,255,196,0.012)' },
      ]

      blobs.forEach(({ x, y, r, color }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, color)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      })

      // Particles
      particles.current.forEach(p => {
        p.y -= p.speed
        if (p.y < -5) { p.y = H + 5; p.x = randomBetween(0, W) }

        const twinkle = (Math.sin(t * p.twinkleSpeed + p.twinklePhase) + 1) / 2
        const finalOpacity = p.opacity * (0.5 + twinkle * 0.5)

        // Parallax offset
        const mx = (mouse.current.x / W - 0.5) * p.parallax * W
        const my = (mouse.current.y / H - 0.5) * p.parallax * H
        const px = p.x + mx
        const py = p.y + my

        if (p.size > 1.5) {
          // Larger star with glow
          const glow = ctx.createRadialGradient(px, py, 0, px, py, p.size * 4)
          glow.addColorStop(0, `rgba(13,255,196,${finalOpacity * 0.8})`)
          glow.addColorStop(1, 'transparent')
          ctx.fillStyle = glow
          ctx.fillRect(px - p.size * 4, py - p.size * 4, p.size * 8, p.size * 8)
        }

        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 255, 248, ${finalOpacity})`
        ctx.fill()
      })
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }

    let t = 0
    function loop() {
      t++
      draw(t)
      rafRef.current = requestAnimationFrame(loop)
    }

    resize()
    initParticles()
    loop()

    window.addEventListener('resize', () => { resize(); initParticles() })
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
