import { useEffect, useRef } from 'react'
import './styles/Earthglobe.css'

// European/Mediterranean data point coordinates
const DATA_POINTS = [
  { lat: 51.5, lon: 0,    label: 'ESA HQ' },
  { lat: 48.8, lon: 2.3,  label: 'Paris' },
  { lat: 52.5, lon: 13.4, label: 'Berlin' },
  { lat: 41.9, lon: 12.5, label: 'Rome' },
  { lat: 59.9, lon: 10.7, label: 'Oslo' },
]

function latlonTo3D(lat, lon, R) {
  const phi = (lat * Math.PI) / 180
  const lambda = (lon * Math.PI) / 180
  return {
    x: R * Math.cos(phi) * Math.cos(lambda),
    y: -R * Math.sin(phi),
    z: R * Math.cos(phi) * Math.sin(lambda),
  }
}

export default function EarthGlobe() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const DPR = window.devicePixelRatio || 1
    const SIZE = 520
    canvas.width = SIZE * DPR
    canvas.height = SIZE * DPR
    canvas.style.width = SIZE + 'px'
    canvas.style.height = SIZE + 'px'
    ctx.scale(DPR, DPR)

    const cx = SIZE / 2
    const cy = SIZE / 2
    const R = SIZE * 0.36
    let t = 0
    let rotation = 0

    function drawFrame() {
      ctx.clearRect(0, 0, SIZE, SIZE)

      // ── Outer atmospheric halo ────────────────────────────
      const halo = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.28)
      halo.addColorStop(0, 'rgba(13,255,196,0)')
      halo.addColorStop(0.5, 'rgba(13,255,196,0.06)')
      halo.addColorStop(1, 'rgba(13,255,196,0)')
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.28, 0, Math.PI * 2)
      ctx.fill()

      // ── Pulsing outer glow ────────────────────────────────
      const pulseAlpha = 0.04 + 0.02 * Math.sin(t * 0.02)
      const outerGlow = ctx.createRadialGradient(cx, cy, R, cx, cy, R * 1.8)
      outerGlow.addColorStop(0, `rgba(13,255,196,${pulseAlpha})`)
      outerGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = outerGlow
      ctx.fillRect(cx - R * 1.8, cy - R * 1.8, R * 3.6, R * 3.6)

      // ── Globe clip ────────────────────────────────────────
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()

      // Base sphere gradient
      const baseGrad = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.28, R * 0.05, cx + R * 0.1, cy + R * 0.15, R * 1.2)
      baseGrad.addColorStop(0, '#1B5244')
      baseGrad.addColorStop(0.3, '#0D2F26')
      baseGrad.addColorStop(0.65, '#061B15')
      baseGrad.addColorStop(1, '#020C09')
      ctx.fillStyle = baseGrad
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      // Ocean texture: subtle deep dark patches
      const oceanPatches = [
        { x: cx + R * 0.4, y: cy - R * 0.1, r: R * 0.55 },
        { x: cx - R * 0.35, y: cy + R * 0.3, r: R * 0.45 },
        { x: cx + R * 0.05, y: cy + R * 0.6, r: R * 0.4 },
        { x: cx - R * 0.6, y: cy - R * 0.25, r: R * 0.38 },
      ]
      oceanPatches.forEach(({ x, y, r }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, 'rgba(4,70,55,0.2)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2)
      })

      // ── Latitude lines ────────────────────────────────────
      for (let lat = -75; lat <= 75; lat += 15) {
        const phi = (lat * Math.PI) / 180
        const ry = R * Math.sin(phi)
        const rx = R * Math.cos(phi)
        const isEquator = lat === 0

        ctx.beginPath()
        ctx.ellipse(cx, cy + ry, rx, rx * 0.1, 0, 0, Math.PI * 2)
        ctx.strokeStyle = isEquator
          ? 'rgba(13,255,196,0.35)'
          : 'rgba(13,255,196,0.12)'
        ctx.lineWidth = isEquator ? 1 : 0.5
        ctx.stroke()
      }

      // ── Longitude lines (rotating) ────────────────────────
      const MERIDIANS = 24
      for (let i = 0; i < MERIDIANS; i++) {
        const lon = (i / MERIDIANS) * 360
        const eff = ((lon + rotation) % 360) * (Math.PI / 180)
        const cosEff = Math.cos(eff)
        const xR = Math.abs(cosEff) * R
        if (xR < 4) continue
        const alpha = 0.06 + 0.16 * Math.abs(cosEff)
        ctx.beginPath()
        ctx.ellipse(cx, cy, xR, R, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(13,255,196,${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Light reflection (highlight)
      const light = ctx.createRadialGradient(cx - R * 0.45, cy - R * 0.45, 0, cx, cy, R * 1.1)
      light.addColorStop(0, 'rgba(13,255,196,0.14)')
      light.addColorStop(0.45, 'rgba(4,180,140,0.05)')
      light.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = light
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      // Night shadow terminator
      const shadow = ctx.createLinearGradient(cx + R * 0.05, cy - R, cx + R, cy + R)
      shadow.addColorStop(0, 'rgba(0,0,0,0)')
      shadow.addColorStop(0.45, 'rgba(0,0,0,0)')
      shadow.addColorStop(1, 'rgba(0,0,0,0.72)')
      ctx.fillStyle = shadow
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      // Atmospheric glow at limb
      const limb = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R)
      limb.addColorStop(0, 'rgba(13,255,196,0)')
      limb.addColorStop(0.7, 'rgba(13,255,196,0)')
      limb.addColorStop(1, 'rgba(13,255,196,0.18)')
      ctx.fillStyle = limb
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      ctx.restore()

      // ── Globe outline ─────────────────────────────────────
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(13,255,196,0.55)'
      ctx.lineWidth = 1.2
      ctx.stroke()

      // ── Orbit ring ────────────────────────────────────────
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(Math.PI * 0.22)

      const orx = R * 1.62
      const ory = R * 0.4

      // Dashed ring
      ctx.beginPath()
      ctx.ellipse(0, 0, orx, ory, 0, 0, Math.PI * 2)
      ctx.setLineDash([5, 8])
      ctx.strokeStyle = 'rgba(13,255,196,0.22)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])

      // ── Satellite ─────────────────────────────────────────
      const satAngle = t * 0.022
      const satX = Math.cos(satAngle) * orx
      const satY = Math.sin(satAngle) * ory

      ctx.save()
      ctx.translate(satX, satY)
      ctx.rotate(satAngle + Math.PI * 0.25)

      // Solar panel glow
      const satGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 22)
      satGlow.addColorStop(0, 'rgba(13,255,196,0.4)')
      satGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = satGlow
      ctx.fillRect(-22, -22, 44, 44)

      // Body
      ctx.fillStyle = '#0DFFC4'
      ctx.fillRect(-5, -3.5, 10, 7)

      // Panel arms
      ctx.fillStyle = 'rgba(13,255,196,0.5)'
      ctx.fillRect(-20, -2, 13, 4)
      ctx.fillRect(7, -2, 13, 4)

      // Antenna
      ctx.strokeStyle = '#0DFFC4'
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(0, -3.5)
      ctx.lineTo(0, -9)
      ctx.stroke()

      ctx.restore()
      ctx.restore()

      // ── Data points on globe ──────────────────────────────
      DATA_POINTS.forEach(({ lat, lon }) => {
        const lonAdj = lon - rotation * 0.8
        const { x: dx, y: dy, z: dz } = latlonTo3D(lat, lonAdj, R)
        if (dz < -R * 0.1) return // behind globe

        const screenX = cx + dx
        const screenY = cy + dy
        const visibility = (dz / R + 0.1) * 1.2
        const pulse = (Math.sin(t * 0.04 + lat) + 1) / 2

        // Ripple ring
        ctx.beginPath()
        ctx.arc(screenX, screenY, 3 + pulse * 9, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(13,255,196,${0.35 * visibility * (1 - pulse * 0.8)})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Core dot
        ctx.beginPath()
        ctx.arc(screenX, screenY, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(13,255,196,${0.9 * visibility})`
        ctx.fill()

        // Inner bright dot
        ctx.beginPath()
        ctx.arc(screenX, screenY, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.8 * visibility})`
        ctx.fill()
      })

      // ── Connection lines between points ───────────────────
      const visible = DATA_POINTS.filter(({ lat, lon }) => {
        const { z } = latlonTo3D(lat, lon - rotation * 0.8, R)
        return z > 0
      })

      if (visible.length >= 2) {
        for (let i = 0; i < visible.length - 1; i++) {
          const a = visible[i], b = visible[i + 1]
          const { x: ax, y: ay } = latlonTo3D(a.lat, a.lon - rotation * 0.8, R)
          const { x: bx, y: by } = latlonTo3D(b.lat, b.lon - rotation * 0.8, R)
          const lineAlpha = 0.08 + 0.04 * Math.sin(t * 0.02 + i)
          ctx.beginPath()
          ctx.moveTo(cx + ax, cy + ay)
          ctx.lineTo(cx + bx, cy + by)
          ctx.strokeStyle = `rgba(13,255,196,${lineAlpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      t++
      rotation += 0.25
      rafRef.current = requestAnimationFrame(drawFrame)
    }

    drawFrame()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <canvas ref={canvasRef} className="earth-globe-canvas" />
  )
}
